// buildingProduction.js

import { getBuildingType } from "./buildingTypes.js";

/**
 * Update all buildings' production progress and handle resource generation/consumption
 * @param {Object} gameState - The game state object containing placed_buildings
 * @param {number} deltaTime - Time elapsed since last update (in milliseconds)
 */
export function updateBuildings(gameState, powerUsageFromTrains) {
  // Initialize hub resource totals tracker
  const hubResourceTotals = {};
  let newPowerDemand = powerUsageFromTrains;
  let newPowerSupply = 0;

  //powerEfficiency used directly in this function to modify the production speed of buildings that use power.
  const powerEfficiency =
    gameState.powerDemand === 0 ||
    gameState.powerSupply >= gameState.powerDemand
      ? 1
      : gameState.powerSupply / gameState.powerDemand;

  // Iterate through all placed buildings
  for (let tileKey in gameState.placed_buildings) {
    const building = gameState.placed_buildings[tileKey];
    const buildingType = getBuildingType(building.type);

    if (!buildingType) continue;

    // Track hub inventories
    if (building.type === "hub" || building.type === "advanced_hub") {
      if (building.inventory && building.inventory.outputs) {
        for (let resourceType in building.inventory.outputs) {
          if (!hubResourceTotals[resourceType]) {
            hubResourceTotals[resourceType] = 0;
          }
          hubResourceTotals[resourceType] +=
            building.inventory.outputs[resourceType];
        }
      }
      // Also check inputs if hubs store resources there
      if (building.inventory && building.inventory.inputs) {
        for (let resourceType in building.inventory.inputs) {
          if (!hubResourceTotals[resourceType]) {
            hubResourceTotals[resourceType] = 0;
          }
          hubResourceTotals[resourceType] +=
            building.inventory.inputs[resourceType];
        }
      }
    }

    // Skip production for buildings with no production speed
    if (buildingType.powerDemand) {
      newPowerDemand += buildingType.powerDemand;
    }
    if (buildingType.productionSpeed === 0) continue;

    // Initialize inventory if it doesn't exist
    if (!building.inventory) {
      building.inventory = {};
    }

    // Initialize production progress if it doesn't exist
    if (building.productionProgress === undefined) {
      building.productionProgress = 0;
    }

    // Check if building can produce (has required inputs)
    const canProduce = checkProductionRequirements(building, buildingType);

    if (canProduce) {
      // Increment production progress
      if (buildingType.powerOutput) {
        newPowerSupply += buildingType.powerOutput;
      }

      if (buildingType.powerDemand) {
        building.productionProgress +=
          buildingType.productionSpeed * powerEfficiency;
      } else {
        building.productionProgress += buildingType.productionSpeed; // only slow down buildings tha need power
      }

      // Check if production cycle is complete
      if (building.productionProgress >= 1.0) {
        completeProductionCycle(
          building,
          buildingType,
          gameState.hubResourceTotals.gold
        );
        building.productionProgress = 0; // Reset progress
      }
    } else {
      // Optionally slow down or pause progress if missing inputs
      // building.productionProgress = Math.max(0, building.productionProgress - 0.001);
    }
  }

  // Store hub totals in game state
  gameState.hubResourceTotals = hubResourceTotals;
  gameState.powerSupply = newPowerSupply;
  gameState.powerDemand = newPowerDemand;
}

/**
 * Check if building has required inputs to produce
 * @param {Object} building - The building instance
 * @param {Object} buildingType - The building type definition
 * @returns {boolean} - Whether building can produce
 */
function checkProductionRequirements(building, buildingType) {
  // Buildings with no consumption requirements can always produce
  if (!buildingType.consumes || buildingType.consumes.length === 0) {
    return true;
  }

  // Check if all required resources are available in inventory
  for (let requirement of buildingType.consumes) {
    const available = building.inventory.inputs[requirement.type] || 0;
    if (available < requirement.amount) {
      return false;
    }
  }

  return true;
}

/**
 * Complete a production cycle - consume inputs and generate outputs
 * @param {Object} building - The building instance
 * @param {Object} buildingType - The building type definition
 */
function completeProductionCycle(building, buildingType, totalGold) {
  // Handle power generation buildings that consume but don't produce
  if (
    buildingType.powerOutput &&
    buildingType.consumes &&
    !buildingType.produces
  ) {
    for (let requirement of buildingType.consumes) {
      building.inventory.inputs[requirement.type] -= requirement.amount;

      if (building.inventory.inputs[requirement.type] < 0) {
        building.inventory.inputs[requirement.type] = 0;
      }
    }
    return; // Exit early since there's no output to produce
  }
  // Produce outputs (check capacity first)
  if (buildingType.produces) {
    const outputType = buildingType.produces.type;
    let outputAmount;
    if (typeof buildingType.produces.amount === "function") {
      outputAmount = buildingType.produces.amount(totalGold);
    } else {
      outputAmount = buildingType.produces.amount;
    }

    // Check capacity
    const capacity = buildingType.capacity?.[outputType] || Infinity;
    const currentAmount = building.inventory.outputs?.[outputType] || 0;
    const spaceLeft = capacity - currentAmount;

    // Only proceed if there's space for the output
    if (spaceLeft < outputAmount) {
      // Not enough space - don't consume inputs or produce
      return;
    }

    // Now consume inputs (only after confirming we can produce)
    if (buildingType.consumes && buildingType.consumes.length > 0) {
      for (let requirement of buildingType.consumes) {
        // Should consume from inputs
        building.inventory.inputs[requirement.type] -= requirement.amount;

        // Ensure inventory doesn't go negative (safety check)
        if (building.inventory.inputs[requirement.type] < 0) {
          building.inventory.inputs[requirement.type] = 0;
        }
      }
    }

    // Produce the output
    if (!building.inventory.outputs) {
      building.inventory.outputs = {};
    }

    if (!building.inventory.outputs[outputType]) {
      building.inventory.outputs[outputType] = 0;
    }

    building.inventory.outputs[outputType] += outputAmount;

    // console.log(` ${buildingType.name} produced ${outputAmount}x ${outputType}`, {
    //   tileKey: `${building.col},${building.row}`,
    //   inventory: building.inventory
    // });
  }
}

/**
 * Start the building production loop
 * @param {Object} gameState - The game state object
 * @param {number} updateRate - Update rate in milliseconds (default 60 FPS)
 * @returns {number} - Interval ID for stopping the loop
 */
export function startBuildingProductionLoop(gameState, updateRate = 100) {
  const intervalId = setInterval(() => {
    updateBuildings(gameState, updateRate);
  }, updateRate);

  console.log("🏗️ Building production system started");

  return intervalId;
}

export function stopBuildingProductionLoop(intervalId) {
  clearInterval(intervalId);
  console.log("🛑 Building production system stopped");
}

/**
 * Manually add resources to a building's inventory (for testing or train deliveries)
 * @param {Object} building - The building instance
 * @param {string} resourceType - Type of resource
 * @param {number} amount - Amount to add
 */
export function addResourceToBuilding(building, resourceType, amount) {
  if (!building.inventory) {
    building.inventory = {};
  }

  if (!building.inventory[resourceType]) {
    building.inventory[resourceType] = 0;
  }

  building.inventory[resourceType] += amount;

  console.log(`📦 Added ${amount}x ${resourceType} to building`, {
    col: building.col,
    row: building.row,
    newAmount: building.inventory[resourceType],
  });
}

export function removeResourceFromBuilding(building, resourceType, amount) {
  if (!building.inventory || !building.inventory.outputs) {
    return 0;
  }

  const available = building.inventory.outputs[resourceType] || 0;
  const actualAmount = Math.min(amount, available);

  if (actualAmount > 0) {
    building.inventory.outputs[resourceType] -= actualAmount;

    // Clean up if empty
    if (building.inventory.outputs[resourceType] <= 0) {
      delete building.inventory.outputs[resourceType];
    }

    // console.log(`📤 Removed ${actualAmount}x ${resourceType} from building`, {
    //   col: building.col,
    //   row: building.row,
    //   remaining: building.inventory.outputs[resourceType] || 0
    // });
  }

  return actualAmount;
}

/**
 * Get building's current inventory
 * @param {Object} building - The building instance
 * @returns {Object} - Inventory object
 */
export function getBuildingInventory(building) {
  return building.inventory || {};
}

/**
 * Check if building needs specific resources
 * @param {Object} building - The building instance
 * @param {Object} buildingType - The building type definition
 * @returns {Array} - Array of needed resources with amounts
 */
export function getBuildingNeeds(building, buildingType) {
  if (!buildingType.consumes || buildingType.consumes.length === 0) {
    return [];
  }

  const needs = [];

  for (let requirement of buildingType.consumes) {
    const available = building.inventory.inputs[requirement.type] || 0;
    const needed = requirement.amount - available;

    if (needed > 0) {
      needs.push({
        type: requirement.type,
        amount: needed,
        total: requirement.amount,
        available: available,
      });
    }
  }

  return needs;
}

/**
 * Spend resources from all hubs, distributing the cost evenly to keep hub inventories balanced
 * @param {Object} gameState - The game state object containing placed_buildings
 * @param {Object} costs - Object with resource types and amounts to spend, e.g., {food: 6, wood: 7}
 * @returns {boolean} - true if successful, false if insufficient resources
 */
export function spendFromHubs(gameState, costs) {
  // First, collect all hubs and their current resource totals
  const hubs = [];
  const totalAvailable = {};

  for (let tileKey in gameState.placed_buildings) {
    const building = gameState.placed_buildings[tileKey];

    if (building.type === "hub" || building.type === "advanced_hub") {
      const hubResources = {};

      // Count resources in outputs
      if (building.inventory && building.inventory.outputs) {
        for (let resourceType in building.inventory.outputs) {
          hubResources[resourceType] =
            (hubResources[resourceType] || 0) +
            building.inventory.outputs[resourceType];
        }
      }

      // Count resources in inputs
      if (building.inventory && building.inventory.inputs) {
        for (let resourceType in building.inventory.inputs) {
          hubResources[resourceType] =
            (hubResources[resourceType] || 0) +
            building.inventory.inputs[resourceType];
        }
      }

      hubs.push({ building, resources: hubResources });

      // Add to total available
      for (let resourceType in hubResources) {
        totalAvailable[resourceType] =
          (totalAvailable[resourceType] || 0) + hubResources[resourceType];
      }
    }
  }

  // Check if we have enough resources
  for (let resourceType in costs) {
    const available = totalAvailable[resourceType] || 0;
    if (available < costs[resourceType]) {
      return false; // Insufficient resources
    }
  }

  // Now spend resources proportionally from each hub
  for (let resourceType in costs) {
    let remaining = costs[resourceType];
    const totalOfThisResource = totalAvailable[resourceType];

    // Spend proportionally from each hub
    for (let i = 0; i < hubs.length; i++) {
      const hub = hubs[i];
      const hubAmount = hub.resources[resourceType] || 0;

      if (hubAmount === 0) continue;

      // Calculate proportional share (with rounding for last hub)
      let toSpend;
      if (i === hubs.length - 1) {
        // Last hub takes whatever is remaining to avoid rounding errors
        toSpend = remaining;
      } else {
        toSpend = Math.floor(
          (hubAmount / totalOfThisResource) * costs[resourceType]
        );
      }

      toSpend = Math.min(toSpend, hubAmount, remaining);

      if (toSpend > 0) {
        // Spend from outputs first, then inputs
        let amountToSpend = toSpend;

        if (
          hub.building.inventory.outputs &&
          hub.building.inventory.outputs[resourceType]
        ) {
          const fromOutputs = Math.min(
            amountToSpend,
            hub.building.inventory.outputs[resourceType]
          );
          hub.building.inventory.outputs[resourceType] -= fromOutputs;

          if (hub.building.inventory.outputs[resourceType] <= 0) {
            delete hub.building.inventory.outputs[resourceType];
          }

          amountToSpend -= fromOutputs;
        }

        if (
          amountToSpend > 0 &&
          hub.building.inventory.inputs &&
          hub.building.inventory.inputs[resourceType]
        ) {
          const fromInputs = Math.min(
            amountToSpend,
            hub.building.inventory.inputs[resourceType]
          );
          hub.building.inventory.inputs[resourceType] -= fromInputs;

          if (hub.building.inventory.inputs[resourceType] <= 0) {
            delete hub.building.inventory.inputs[resourceType];
          }

          amountToSpend -= fromInputs;
        }

        remaining -= toSpend;
      }
    }
  }

  return true;
}

/**
 * Refund resources to hubs, prioritizing hubs with the lowest amounts of each resource
 * @param {Object} gameState - The game state object containing placed_buildings
 * @param {Object} refunds - Object with resource types and amounts to refund, e.g., {food: 6, wood: 7}
 */
export function refundToHubs(gameState, refunds) {
  // Collect all hubs
  const hubs = [];

  for (let tileKey in gameState.placed_buildings) {
    const building = gameState.placed_buildings[tileKey];

    if (building.type === "hub" || building.type === "advanced_hub") {
      hubs.push(building);
    }
  }

  // If no hubs exist, we can't refund
  if (hubs.length === 0) {
    console.warn("⚠️ No hubs available to receive refund");
    return;
  }

  // Process each resource type
  for (let resourceType in refunds) {
    const totalAmount = refunds[resourceType];
    
    // Distribute evenly across hubs
    const amountPerHub = Math.floor(totalAmount / hubs.length);
    const leftover = totalAmount % hubs.length;

    for (let i = 0; i < hubs.length; i++) {
      const hub = hubs[i];
      const amount = amountPerHub + (i < leftover ? 1 : 0);
      
      // Initialize inventory if needed
      if (!hub.inventory) {
        hub.inventory = {};
      }
      if (!hub.inventory.inputs) {
        hub.inventory.inputs = {};
      }
      if (!hub.inventory.inputs[resourceType]) {
        hub.inventory.inputs[resourceType] = 0;
      }
      
      hub.inventory.inputs[resourceType] += amount;
    }
  }

  console.log(`💰 Refunded resources to hubs:`, refunds);
}
