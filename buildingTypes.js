export const BUILDING_TYPES = {
  // Special buildings
  HUB: {
    description:
      "Resources get spent from your hubs to allow you to build other things. Deliver resources to hubs with trains",
    id: "hub",
    name: "Hub",
    emoji: "🏛️",
    category: "special",
    allowedTerrain: ["GRASS", "SAND"],
    produces: null,
    consumes: [],
    productionSpeed: 0,
    unlocked: true,
    isHub: true,
    cost: { ore: 50, wood: 200, flour: 30 },
    capacity: { ore: 1000, wood: 1000, grain: 1000, iron: 1000 },
  },

  FARM: {
    id: "farm",
    description:
      "produces grain (as with all other buildings that produce things, use trains to pick up)",
    name: "Farm",
    emoji: "🌾",
    category: "tier1",
    allowedTerrain: ["GRASS"],
    produces: { type: "grain", amount: 1 },
    consumes: [],
    productionSpeed: 0.0015,
    unlocked: true,
    cost: { wood: 5 },
    capacity: { grain: 5 },
  },

  LUMBERYARD: {
    id: "lumberyard",
    name: "Lumberyard",
    emoji: "🪵",
    category: "tier1",
    allowedTerrain: ["FOREST"],
    produces: { type: "wood", amount: 1 },
    consumes: [],
    productionSpeed: 0.0015,
    unlocked: true,
    cost: { grain: 10 },
    capacity: { wood: 10 },
  },

  MINE: {
    id: "mine",
    name: "Ore Mine",
    emoji: "⛏️",
    category: "tier1",
    allowedTerrain: ["MOUNTAIN"],
    produces: { type: "ore", amount: 1 },
    consumes: [],
    productionSpeed: 0.001,
    cost: { grain: 20, wood: 20 },
    unlocked: true,
    capacity: { ore: 10 },
  },

  QUARRY: {
    id: "quarry",
    name: "Quarry",
    emoji: "🪨",
    category: "tier1",
    allowedTerrain: ["MOUNTAIN"],
    produces: { type: "stone", amount: 1 },
    consumes: [],
    productionSpeed: 0.001,
    unlocked: true,
    cost: { wood: 30 },
    capacity: { stone: 10 },
  },

  SAWMILL: {
    id: "sawmill",
    name: "Sawmill",
    emoji: "🏭",
    category: "tier2",
    allowedTerrain: ["GRASS", "SAND", "FOREST"],
    produces: { type: "planks", amount: 1 },
    consumes: [{ type: "wood", amount: 2 }],
    productionSpeed: 0.002,
    cost: { wood: 30 },
    unlocked: true,
    capacity: { planks: 10, wood: 10 },
  },

  COALMINE: {
    id: "coalmine",
    name: "Coal Mine",
    emoji: "🔥",
    category: "tier1",
    allowedTerrain: ["MOUNTAIN"],
    produces: { type: "coal", amount: 1 },
    consumes: [],
    productionSpeed: 0.0015,
    cost: { grain: 20, wood: 20, stone: 30 },
    unlocked: true,
    capacity: { coal: 10 },
  },

  SMELTER: {
    id: "smelter",
    name: "Smelter",
    emoji: "🔥",
    category: "tier2",
    allowedTerrain: ["GRASS", "SAND", "MOUNTAIN"],
    produces: { type: "iron", amount: 1 },
    consumes: [{ type: "ore", amount: 5 }],
    productionSpeed: 0.0015,
    cost: { grain: 20, wood: 20, ore: 15, stone: 10 },
    unlocked: true,
    capacity: { iron: 10, ore: 10 },
  },

  WINDMILL: {
    id: "windmill",
    name: "Windmill",
    emoji: "💨",
    category: "tier2",
    allowedTerrain: ["GRASS", "SAND", "MOUNTAIN"],
    produces: { type: "flour", amount: 1 },
    consumes: [{ type: "grain", amount: 1 }],
    capacity: { grain: 10, flour: 10 },
    cost: { wood: 30, stone: 25, grain: 10 },
    productionSpeed: 0.0015,
    unlocked: true,
    capacity: { flour: 5, grain: 10 },
  },

  WIND_TURBINE: {
    id: "wind_turbine",
    name: "Wind Turbine",
    emoji: "💨",
    category: "tier3",
    allowedTerrain: ["GRASS", "SAND", "MOUNTAIN"],
    // produces: { type: "flour", amount: 1 },
    // consumes: [{ type: "grain", amount: 2 }],
    powerOutput: 1,
    cost: { steel: 35 },
    productionSpeed: 0.0015,
    unlocked: true,
  },

  STEEL_MILL: {
    id: "steel_mill",
    name: "Steel Mill",
    emoji: "🔩",
    category: "tier2",
    allowedTerrain: ["GRASS", "SAND", "MOUNTAIN"],
    produces: { type: "steel", amount: 1 },
    consumes: [
      { type: "iron", amount: 5 },
      { type: "coal", amount: 5 },
    ],
    productionSpeed: 0.003,
    cost: { stone: 40, iron: 30, planks: 30},
    unlocked: true,
  },

  TRAIN_DEPOT: {
    description: "Use this building for managing trains.",
    id: "train_depot",
    name: "Train Depot",
    emoji: "🚉",
    category: "special",
    allowedTerrain: ["GRASS", "SAND", "MOUNTAIN"],
    // produces: { type: "steel", amount: 1 },
    // consumes: [
    //   { type: "iron", amount: 5 },
    //   { type: "coal", amount: 5 },
    // ],
    // productionSpeed: 0.003,
    cost: { stone: 100, iron: 30, planks: 10},
    unlocked: true,
  },

  COMMODITY_EXCHANGE: {
    id: "commodity_exchange",
    name: "Commodity Exchange",
    emoji: "💰",
    powerDemand: 200,
    category: "special",
    allowedTerrain: ["GRASS", "SAND", "MOUNTAIN"],
    cost: { steel: 1000, stone: 100, flour: 100 },
    unlocked: true,
    description: "Sell resources for gold.",
  },

  INVESTMENT_RESEARCH_INSTITUTE: {
    id: "investment_research_institute",
    name: "Investment Research Institute",
    emoji: "🏦",
    category: "special",
    allowedTerrain: ["GRASS", "SAND", "MOUNTAIN"],
    cost: { steel: 200, stone: 150, gold: 10000 },
    produces: {
      type: "gold",
      amount: (totalGold) => Math.round(totalGold * 0.05),
    },
    unlocked: false,
    productionSpeed: 0.001,
    description:
      "Research new investment strategies. Compounds your gold reserves.",
  },

  ADVANCED_ORE_MINE: {
    id: "advanced_ore_mine",
    name: "Advanced Ore Mine",
    emoji: "⛏️",
    category: "tier3",
    allowedTerrain: ["MOUNTAIN"],
    produces: { type: "ore", amount: 10 },
    consumes: [],
    productionSpeed: 0.01,
    powerDemand: 2,
    cost: { steel: 150, stone: 100 },
    capacity: { ore: 100 },
    unlocked: false,
    description: "Automated mining operations. Requires power.",
  },

  ADVANCED_COAL_MINE: {
    id: "advanced_coal_mine",
    name: "Advanced Coal Mine",
    emoji: "🔥",
    category: "tier3",
    allowedTerrain: ["MOUNTAIN"],
    produces: { type: "coal", amount: 10 },
    consumes: [],
    productionSpeed: 0.015,
    powerDemand: 2,
    cost: { steel: 150, stone: 100 },
    capacity: { coal: 100 },
    unlocked: false,
    description: "Industrial coal extraction. Requires power.",
  },

  ADVANCED_STEEL_MILL: {
    id: "advanced_steel_mill",
    description: "Creates steel directly from ore.",
    name: "Advanced Steel Mill",
    emoji: "🔩",
    category: "tier3",
    allowedTerrain: ["GRASS", "SAND", "MOUNTAIN"],
    produces: { type: "steel", amount: 5 },
    consumes: [{ type: "ore", amount: 10 }],
    productionSpeed: 0.005,
    powerDemand: 3,
    cost: { steel: 150, stone: 200 },
    capacity: { steel: 50, ore: 100 },
    unlocked: false,
    description:
      "Cutting-edge smelting technology. Processes ore directly into steel. Requires power.",
  },

  ADVANCED_HUB: {
    id: "advanced_hub",
    name: "Advanced Hub",
    emoji: "🏛️",
    isHub: true,

    category: "special",
    allowedTerrain: ["GRASS"],
    produces: null,
    consumes: [],
    cost: { steel: 500, stone: 300, planks: 50, flour:20 },
    capacity: {
      ore: 50000,
      wood: 50000,
      grain: 50000,
      iron: 50000,
      coal: 50000,
      steel: 50000,
      stone: 50000,
      flour: 50000,
      planks: 50000,
    },
    unlocked: false,
    description: "Massive storage facility. 50x capacity of standard hub.",
  },

  COAL_POWER_PLANT: {
    id: "coal_power_plant",
    name: "Coal Power Plant",
    emoji: "⚡",
    category: "tier3",
    allowedTerrain: ["GRASS", "SAND", "MOUNTAIN"],
    consumes: [{ type: "coal", amount: 1 }],
    powerOutput: 10,
    productionSpeed: 0.1,
    cost: { steel: 200, stone: 150 },
    capacity: { coal: 100 },
    unlocked: false,
    description:
      "Burns coal to generate massive power. 10x more efficient than wind.",
  },

  NUCLEAR_REACTOR: {
    id: "nuclear_reactor",
    name: "Nuclear Reactor",
    emoji: "☢️",
    category: "tier3",
    allowedTerrain: ["GRASS", "MOUNTAIN"],
    consumes: [],
    powerOutput: 100,
    cost: { steel: 2000, stone: 500 },
    unlocked: false,
    description: "The ultimate power source. Generates tremendous energy.",
  },
  LEGACY_VAULT: {
    id: "legacy_vault",
    name: "Legacy Vault",
    emoji: "🏛️",
    category: "special",
    allowedTerrain: ["GRASS"],
    cost: { gold: 500000000000 },
    unlocked: false,
    isVictoryBuilding: true,
    description: "The ultimate achievement. Preserve your legacy for eternity.",
  },
  //
};

// Helper function to get building type by id
export function getBuildingType(id) {
  return Object.values(BUILDING_TYPES).find((type) => type.id === id);
}

// Helper function to check if building can be placed on terrain
export function canPlaceBuilding(buildingTypeId, terrainType) {
  const buildingType = getBuildingType(buildingTypeId);
  if (!buildingType) return false;
  return buildingType.allowedTerrain.includes(terrainType);
}

import {
  hexToPixel,
  // pixelToHex,
  // getHexVertices,
  // getNeighbor,
} from "./hexUtils.js";

export const BUILDING_DRAW_FUNCTIONS = {
  lumberyard: drawLumberyard,
  farm: drawFarm,
  hub: drawHub,
  windmill: drawWindmill,
  wind_turbine: drawWindTurbine,
  smelter: drawSmelter,
  sawmill: drawSawmill,
  mine: drawMine,
  quarry: drawQuarry,
  coalmine: drawCoalMine,
  steel_mill: drawSteelMill,
  train_depot: drawTrainDepot,
  legacy_vault: drawLegacyVault,
  commodity_exchange: drawCommodityExchange,
  investment_research_institute: drawInvestmentResearchInstitute,
  advanced_ore_mine: drawAdvancedOreMine,
  advanced_coal_mine: drawAdvancedCoalMine,
  advanced_steel_mill: drawAdvancedSteelMill,
  coal_power_plant: drawCoalPowerPlant,
  advanced_hub: drawAdvancedHub,
  nuclear_reactor: drawNuclearReactor,
};

export function drawDefaultBuilding(
  ctx,
  col,
  row,
  camera,
  size,
  zoom,
  buildingName
) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;

  ctx.save();
  ctx.fillStyle = "#333";
  ctx.font = `${12 * zoom}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Split on spaces and draw each word on a new line
  const words = buildingName.split(" ");
  const lineHeight = 14 * zoom;
  const startY = screenY - ((words.length - 1) * lineHeight) / 2;

  words.forEach((word, i) => {
    ctx.fillText(word, screenX, startY + i * lineHeight);
  });

  ctx.restore();
}

function drawLumberyard(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.6;

  ctx.save();

  const roofHeight = buildingSize * 0.4;

  ctx.fillStyle = "#888888";
  ctx.fillRect(
    screenX - buildingSize / 2,
    screenY + buildingSize / 4,
    buildingSize,
    buildingSize * 0.15
  );

  ctx.fillStyle = "#a0826d";
  ctx.fillRect(
    screenX - buildingSize / 2,
    screenY - buildingSize / 4,
    buildingSize,
    buildingSize / 2
  );

  ctx.strokeStyle = "#8b6f47";
  ctx.lineWidth = 2 * zoom;
  for (let i = 0; i <= 6; i++) {
    const x = screenX - buildingSize / 2 + (buildingSize / 6) * i;
    ctx.beginPath();
    ctx.moveTo(x, screenY - buildingSize / 4);
    ctx.lineTo(x, screenY + buildingSize / 4);
    ctx.stroke();
  }

  ctx.fillStyle = "#704214";
  ctx.beginPath();
  ctx.moveTo(screenX - buildingSize / 2 - 5, screenY - buildingSize / 4);
  ctx.lineTo(screenX, screenY - buildingSize / 4 - roofHeight);
  ctx.lineTo(screenX + buildingSize / 2 + 5, screenY - buildingSize / 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#a0522d";
  ctx.fillRect(
    screenX + buildingSize / 4,
    screenY - buildingSize / 4 - roofHeight + 5,
    buildingSize * 0.12,
    roofHeight * 0.6
  );

  ctx.fillStyle = "#87ceeb";
  ctx.fillRect(
    screenX - buildingSize / 3,
    screenY - buildingSize / 8,
    buildingSize * 0.15,
    buildingSize * 0.15
  );
  ctx.fillRect(
    screenX + buildingSize / 6,
    screenY - buildingSize / 8,
    buildingSize * 0.15,
    buildingSize * 0.15
  );

  ctx.restore();
}

function drawFarm(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.7;

  ctx.save();

  // Barn
  ctx.fillStyle = "#8b0000";
  ctx.fillRect(
    screenX - buildingSize / 3,
    screenY - buildingSize / 4,
    buildingSize * 0.4,
    buildingSize * 0.35
  );

  // Barn roof
  ctx.fillStyle = "#654321";
  ctx.beginPath();
  ctx.moveTo(screenX - buildingSize / 3 - 5, screenY - buildingSize / 4);
  ctx.lineTo(
    screenX - buildingSize / 3 + buildingSize * 0.2,
    screenY - buildingSize / 4 - buildingSize * 0.2
  );
  ctx.lineTo(
    screenX - buildingSize / 3 + buildingSize * 0.4 + 5,
    screenY - buildingSize / 4
  );
  ctx.closePath();
  ctx.fill();

  // Barn door
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(
    screenX - buildingSize / 6,
    screenY,
    buildingSize * 0.12,
    buildingSize * 0.11
  );

  // Fence
  ctx.strokeStyle = "#8b4513";
  ctx.lineWidth = 2 * zoom;
  for (let i = 0; i < 5; i++) {
    const x = screenX + buildingSize / 6 + i * (buildingSize * 0.12);
    ctx.beginPath();
    ctx.moveTo(x, screenY - buildingSize / 8);
    ctx.lineTo(x, screenY + buildingSize / 8);
    ctx.stroke();
  }

  // Horizontal fence rails
  ctx.beginPath();
  ctx.moveTo(screenX + buildingSize / 6, screenY - buildingSize / 16);
  ctx.lineTo(
    screenX + buildingSize / 6 + buildingSize * 0.48,
    screenY - buildingSize / 16
  );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(screenX + buildingSize / 6, screenY + buildingSize / 16);
  ctx.lineTo(
    screenX + buildingSize / 6 + buildingSize * 0.48,
    screenY + buildingSize / 16
  );
  ctx.stroke();

  // Hay bales
  ctx.fillStyle = "#daa520";
  ctx.fillRect(
    screenX - buildingSize / 2.5,
    screenY + buildingSize / 8,
    buildingSize * 0.15,
    buildingSize * 0.12
  );
  ctx.fillRect(
    screenX - buildingSize / 6,
    screenY + buildingSize / 6,
    buildingSize * 0.15,
    buildingSize * 0.12
  );

  // Hay texture
  ctx.strokeStyle = "#b8860b";
  ctx.lineWidth = 1 * zoom;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(
      screenX - buildingSize / 2.5,
      screenY + buildingSize / 8 + i * 5
    );
    ctx.lineTo(
      screenX - buildingSize / 2.5 + buildingSize * 0.15,
      screenY + buildingSize / 8 + i * 5
    );
    ctx.stroke();
  }

  ctx.restore();
}

function drawHub(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.8;

  ctx.save();

  const mainSize = buildingSize * 0.5;

  ctx.fillStyle = "#8b9dc3";
  ctx.fillRect(
    screenX - mainSize / 2,
    screenY - mainSize / 2,
    mainSize,
    mainSize
  );

  ctx.fillStyle = "#6a7ba3";
  ctx.fillRect(screenX - mainSize / 2, screenY - mainSize / 2 - 8, mainSize, 8);

  ctx.fillStyle = "#9fafc9";
  ctx.fillRect(
    screenX - mainSize / 2 - mainSize * 0.3,
    screenY - mainSize / 4,
    mainSize * 0.3,
    mainSize / 2
  );
  ctx.fillRect(
    screenX + mainSize / 2,
    screenY - mainSize / 4,
    mainSize * 0.3,
    mainSize / 2
  );

  ctx.fillStyle = "#ffeb99";
  const windowSize = mainSize * 0.12;
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      ctx.fillRect(
        screenX - mainSize / 3 + col * mainSize * 0.4,
        screenY - mainSize / 4 + row * mainSize * 0.35,
        windowSize,
        windowSize
      );
    }
  }

  ctx.fillStyle = "#4a5568";
  ctx.fillRect(
    screenX - mainSize / 6,
    screenY + mainSize / 4,
    mainSize / 3,
    mainSize / 4
  );

  ctx.fillStyle = "#ffd700";
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = ((Math.PI * 2) / 5) * i - Math.PI / 2;
    const x = screenX + Math.cos(angle) * mainSize * 0.15;
    const y = screenY - mainSize / 2 - 15 + Math.sin(angle) * mainSize * 0.15;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawWindmill(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.8;

  ctx.save();

  const s = buildingSize;

  // Draw windmill tower (trapezoid)
  ctx.fillStyle = "#d4d4aa";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.2, screenY + s * 0.3);
  ctx.lineTo(screenX - s * 0.15, screenY - s * 0.3);
  ctx.lineTo(screenX + s * 0.15, screenY - s * 0.3);
  ctx.lineTo(screenX + s * 0.2, screenY + s * 0.3);
  ctx.closePath();
  ctx.fill();

  // Draw door
  ctx.fillStyle = "#654321";
  ctx.fillRect(screenX - s * 0.08, screenY + s * 0.15, s * 0.16, s * 0.15);

  // Animate blades based on current time
  const angle = (Date.now() / 50) % 360;
  ctx.save();
  ctx.translate(screenX, screenY - s * 0.3);
  ctx.rotate((angle * Math.PI) / 180);

  // Draw 4 blades
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 2);
    ctx.fillStyle = "#f4f4e8";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-s * 0.08, s * 0.35);
    ctx.lineTo(s * 0.08, s * 0.35);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Draw center hub
  ctx.fillStyle = "#654321";
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}
function drawWindTurbine(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.8;

  ctx.save();

  const s = buildingSize * 1.2;

  // Draw tall cylindrical tower
  ctx.fillStyle = "#e8e8e8";
  ctx.fillRect(screenX - s * 0.06, screenY - s * 0.6, s * 0.12, s * 0.9);

  // Tower shading for depth
  ctx.fillStyle = "#d0d0d0";
  ctx.fillRect(screenX - s * 0.06, screenY - s * 0.6, s * 0.04, s * 0.9);

  // Draw nacelle (housing at top)
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(screenX - s * 0.12, screenY - s * 0.65, s * 0.24, s * 0.1);

  // Nacelle shadow
  ctx.fillStyle = "#c0c0c0";
  ctx.fillRect(screenX - s * 0.12, screenY - s * 0.58, s * 0.24, s * 0.03);

  // Animate blades based on current time (faster rotation)
  const angle = (Date.now() / 10) % 360;
  ctx.save();
  ctx.translate(screenX, screenY - s * 0.6);
  ctx.rotate((angle * Math.PI) / 180);

  // Draw 3 blades
  for (let i = 0; i < 3; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 3);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-s * 0.05, s * 0.45);
    ctx.lineTo(s * 0.05, s * 0.45);
    ctx.closePath();
    ctx.fill();

    // Blade shading
    ctx.fillStyle = "#e0e0e0";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-s * 0.05, s * 0.45);
    ctx.lineTo(0, s * 0.43);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Draw center hub
  ctx.fillStyle = "#b0b0b0";
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.07, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

function drawSmelter(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.8;

  ctx.save();

  const s = buildingSize;

  // Main building body
  ctx.fillStyle = "#5a5a5a";
  ctx.fillRect(screenX - s * 0.3, screenY - s * 0.2, s * 0.6, s * 0.5);

  // Building highlight/edge
  ctx.fillStyle = "#6a6a6a";
  ctx.fillRect(screenX - s * 0.3, screenY - s * 0.2, s * 0.08, s * 0.5);

  // Furnace opening (bright orange/red glow)
  ctx.fillStyle = "#ff4500";
  ctx.fillRect(screenX - s * 0.15, screenY, s * 0.3, s * 0.25);

  // Inner furnace glow (pulsing yellow)
  const glowIntensity = 0.7 + Math.sin(Date.now() / 300) * 0.3;
  ctx.fillStyle = `rgba(255, 255, 0, ${glowIntensity})`;
  ctx.fillRect(screenX - s * 0.1, screenY + s * 0.05, s * 0.2, s * 0.15);

  // Furnace details - metal frame
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 2;
  ctx.strokeRect(screenX - s * 0.15, screenY, s * 0.3, s * 0.25);

  // Side pipes/vents
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX - s * 0.35, screenY - s * 0.05, s * 0.1, s * 0.2);
  ctx.fillRect(screenX + s * 0.25, screenY - s * 0.05, s * 0.1, s * 0.2);

  // Smokestack
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX + s * 0.15, screenY - s * 0.6, s * 0.15, s * 0.4);

  // Smokestack rim
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX + s * 0.13, screenY - s * 0.62, s * 0.19, s * 0.04);

  // Animated smoke puffs
  const time = Date.now() / 1000;
  for (let i = 0; i < 4; i++) {
    const offset = (time * 0.5 + i * 0.3) % 2;
    const opacity = Math.max(0, 0.6 - offset * 0.3);
    const smokeSize = s * (0.08 + offset * 0.08);

    ctx.fillStyle = `rgba(100, 100, 100, ${opacity})`;
    ctx.beginPath();
    ctx.arc(
      screenX + s * 0.22 + Math.sin(offset * 2) * s * 0.08,
      screenY - s * 0.65 - offset * s * 0.25,
      smokeSize,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Heat shimmer effect at furnace opening
  if (Math.random() > 0.7) {
    ctx.fillStyle = "rgba(255, 200, 0, 0.3)";
    ctx.fillRect(
      screenX - s * 0.15 + Math.random() * s * 0.3,
      screenY + s * 0.05,
      s * 0.05,
      s * 0.1
    );
  }

  ctx.restore();
}

function drawSawmill(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.8;

  ctx.save();

  const s = buildingSize;

  // Main building structure
  ctx.fillStyle = "#8b6f47";
  ctx.fillRect(screenX - s * 0.35, screenY - s * 0.3, s * 0.7, s * 0.6);

  // Roof
  ctx.fillStyle = "#654321";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.4, screenY - s * 0.3);
  ctx.lineTo(screenX, screenY - s * 0.5);
  ctx.lineTo(screenX + s * 0.4, screenY - s * 0.3);
  ctx.closePath();
  ctx.fill();

  // Roof highlight
  ctx.fillStyle = "#7d5a3a";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.4, screenY - s * 0.3);
  ctx.lineTo(screenX, screenY - s * 0.5);
  ctx.lineTo(screenX, screenY - s * 0.3);
  ctx.closePath();
  ctx.fill();

  // Open front section showing internals
  ctx.fillStyle = "#3a2f1f";
  ctx.fillRect(screenX - s * 0.28, screenY - s * 0.22, s * 0.56, s * 0.5);

  // Animated circular saw blade
  const bladeAngle = (Date.now() / 30) % 360;
  ctx.save();
  ctx.translate(screenX, screenY - s * 0.05);
  ctx.rotate((bladeAngle * Math.PI) / 180);

  // Saw blade disc
  ctx.fillStyle = "#c0c0c0";
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.18, 0, Math.PI * 2);
  ctx.fill();

  // Saw teeth
  ctx.fillStyle = "#a0a0a0";
  for (let i = 0; i < 24; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 24);
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.18);
    ctx.lineTo(-s * 0.02, -s * 0.21);
    ctx.lineTo(s * 0.02, -s * 0.21);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Center hub
  ctx.fillStyle = "#606060";
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.06, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Conveyor belt
  ctx.fillStyle = "#2c2c2c";
  ctx.fillRect(screenX - s * 0.35, screenY + s * 0.15, s * 0.7, s * 0.06);

  // Conveyor rollers
  const rollerTime = (Date.now() / 100) % 1;
  ctx.fillStyle = "#4a4a4a";
  for (let i = 0; i < 5; i++) {
    const rollerX =
      screenX - s * 0.3 + ((i * s * 0.15 + rollerTime * s * 0.15) % (s * 0.6));
    ctx.beginPath();
    ctx.arc(rollerX, screenY + s * 0.18, s * 0.025, 0, Math.PI * 2);
    ctx.fill();
  }

  // Support posts
  ctx.fillStyle = "#5a4a3a";
  ctx.fillRect(screenX - s * 0.35, screenY + s * 0.21, s * 0.08, s * 0.09);
  ctx.fillRect(screenX + s * 0.27, screenY + s * 0.21, s * 0.08, s * 0.09);

  // Sawdust particles falling
  const time = Date.now() / 1000;
  ctx.fillStyle = "rgba(210, 180, 140, 0.6)";
  for (let i = 0; i < 6; i++) {
    const fallOffset = (time * 0.3 + i * 0.2) % 1;
    const particleX = screenX + Math.sin(i * 2) * s * 0.1;
    const particleY = screenY + fallOffset * s * 0.3;
    const particleSize = s * 0.015 * (1 - fallOffset * 0.5);

    ctx.beginPath();
    ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cut planks stacked on side
  ctx.fillStyle = "#deb887";
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(
      screenX + s * 0.25,
      screenY + s * 0.05 - i * s * 0.04,
      s * 0.15,
      s * 0.03
    );
  }

  // Plank edges
  ctx.strokeStyle = "#8b7355";
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    ctx.strokeRect(
      screenX + s * 0.25,
      screenY + s * 0.05 - i * s * 0.04,
      s * 0.15,
      s * 0.03
    );
  }

  ctx.restore();
}

function drawMine(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.8;

  ctx.save();

  const s = buildingSize * 1.3;

  // Mine entrance (dark cave opening)
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.arc(screenX, screenY + s * 0.1, s * 0.25, 0, Math.PI, true);
  ctx.rect(screenX - s * 0.25, screenY + s * 0.1, s * 0.5, s * 0.2);
  ctx.fill();

  // Wooden support beams
  ctx.fillStyle = "#654321";
  ctx.fillRect(screenX - s * 0.28, screenY - s * 0.15, s * 0.08, s * 0.35);
  ctx.fillRect(screenX + s * 0.2, screenY - s * 0.15, s * 0.08, s * 0.35);

  // Horizontal beam
  ctx.fillRect(screenX - s * 0.28, screenY - s * 0.15, s * 0.56, s * 0.08);

  // Mine cart tracks
  ctx.strokeStyle = "#8b7355";
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
    const trackX = screenX - s * 0.2 + i * s * 0.1;
    ctx.beginPath();
    ctx.moveTo(trackX, screenY + s * 0.15);
    ctx.lineTo(trackX, screenY + s * 0.3);
    ctx.stroke();
  }

  // Rails
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.18, screenY + s * 0.2);
  ctx.lineTo(screenX + s * 0.35, screenY + s * 0.2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.18, screenY + s * 0.25);
  ctx.lineTo(screenX + s * 0.35, screenY + s * 0.25);
  ctx.stroke();

  // Animated mine cart
  const cartTime = (Date.now() / 2000) % 1;
  const cartX = screenX - s * 0.15 + cartTime * s * 0.45;

  ctx.fillStyle = "#505050";
  ctx.fillRect(cartX - s * 0.08, screenY + s * 0.12, s * 0.16, s * 0.08);

  // Cart wheels
  ctx.fillStyle = "#2a2a2a";
  ctx.beginPath();
  ctx.arc(cartX - s * 0.05, screenY + s * 0.2, s * 0.03, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cartX + s * 0.05, screenY + s * 0.2, s * 0.03, 0, Math.PI * 2);
  ctx.fill();

  // Ore in cart
  ctx.fillStyle = "#8b8b8b";
  ctx.fillRect(cartX - s * 0.06, screenY + s * 0.08, s * 0.04, s * 0.04);
  ctx.fillRect(cartX, screenY + s * 0.09, s * 0.04, s * 0.03);
  ctx.fillRect(cartX - s * 0.02, screenY + s * 0.06, s * 0.03, s * 0.04);

  // Lantern with flickering light
  const flicker = 0.8 + Math.sin(Date.now() / 150) * 0.2;
  ctx.fillStyle = `rgba(255, 200, 100, ${flicker})`;
  ctx.beginPath();
  ctx.arc(screenX - s * 0.32, screenY - s * 0.2, s * 0.06, 0, Math.PI * 2);
  ctx.fill();

  // Lantern glow
  ctx.fillStyle = `rgba(255, 200, 100, ${flicker * 0.3})`;
  ctx.beginPath();
  ctx.arc(screenX - s * 0.32, screenY - s * 0.2, s * 0.12, 0, Math.PI * 2);
  ctx.fill();

  // Rock pile
  ctx.fillStyle = "#696969";
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(
      screenX + s * 0.22 + i * s * 0.05,
      screenY + s * 0.28 - i * s * 0.05,
      s * 0.08,
      s * 0.08
    );
  }

  // Pickaxe leaning against entrance
  ctx.strokeStyle = "#654321";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.15, screenY + s * 0.05);
  ctx.lineTo(screenX + s * 0.25, screenY + s * 0.25);
  ctx.stroke();

  ctx.fillStyle = "#505050";
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.15, screenY + s * 0.05);
  ctx.lineTo(screenX + s * 0.12, screenY + s * 0.02);
  ctx.lineTo(screenX + s * 0.18, screenY - s * 0.02);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawQuarry(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.8;

  ctx.save();

  const s = buildingSize * 1.5;

  // Quarry pit (terraced layers)
  ctx.fillStyle = "#8b7355";
  ctx.fillRect(screenX - s * 0.35, screenY - s * 0.1, s * 0.7, s * 0.15);

  ctx.fillStyle = "#a0826d";
  ctx.fillRect(screenX - s * 0.3, screenY + s * 0.05, s * 0.6, s * 0.15);

  ctx.fillStyle = "#b8956f";
  ctx.fillRect(screenX - s * 0.25, screenY + s * 0.2, s * 0.5, s * 0.12);

  // Stone blocks being extracted
  ctx.fillStyle = "#9e9e9e";
  ctx.strokeStyle = "#707070";
  ctx.lineWidth = 2;

  for (let i = 0; i < 3; i++) {
    ctx.fillRect(
      screenX - s * 0.2 + i * s * 0.12,
      screenY - s * 0.08,
      s * 0.1,
      s * 0.1
    );
    ctx.strokeRect(
      screenX - s * 0.2 + i * s * 0.12,
      screenY - s * 0.08,
      s * 0.1,
      s * 0.1
    );
  }

  // Crane structure
  ctx.fillStyle = "#d4a574";
  ctx.fillRect(screenX + s * 0.2, screenY - s * 0.05, s * 0.08, s * 0.4);

  // Crane arm
  ctx.fillStyle = "#c9963d";
  ctx.fillRect(screenX - s * 0.1, screenY - s * 0.05, s * 0.35, s * 0.06);

  // Crane pulley and rope
  const pulleySwing = Math.sin(Date.now() / 800) * 0.05;
  const ropeX = screenX + pulleySwing * s;

  ctx.strokeStyle = "#654321";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.05, screenY - s * 0.05);
  ctx.lineTo(ropeX, screenY + s * 0.15);
  ctx.stroke();

  // Stone block being lifted
  const liftHeight = (Date.now() / 2000) % 1;
  const blockY = screenY + s * 0.3 - liftHeight * s * 0.2;

  ctx.fillStyle = "#a8a8a8";
  ctx.fillRect(ropeX - s * 0.06, blockY - s * 0.06, s * 0.12, s * 0.12);
  ctx.strokeStyle = "#808080";
  ctx.strokeRect(ropeX - s * 0.06, blockY - s * 0.06, s * 0.12, s * 0.12);

  // Hook
  ctx.strokeStyle = "#505050";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(ropeX, blockY - s * 0.08, s * 0.03, 0, Math.PI);
  ctx.stroke();

  // Wheelbarrow
  ctx.fillStyle = "#7a5c3e";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.32, screenY + s * 0.25);
  ctx.lineTo(screenX - s * 0.25, screenY + s * 0.18);
  ctx.lineTo(screenX - s * 0.15, screenY + s * 0.18);
  ctx.lineTo(screenX - s * 0.12, screenY + s * 0.25);
  ctx.closePath();
  ctx.fill();

  // Wheelbarrow wheel
  ctx.fillStyle = "#3a3a3a";
  ctx.beginPath();
  ctx.arc(screenX - s * 0.32, screenY + s * 0.25, s * 0.04, 0, Math.PI * 2);
  ctx.fill();

  // Rubble in wheelbarrow
  ctx.fillStyle = "#8b8b8b";
  ctx.fillRect(screenX - s * 0.22, screenY + s * 0.18, s * 0.04, s * 0.04);
  ctx.fillRect(screenX - s * 0.17, screenY + s * 0.19, s * 0.03, s * 0.03);

  // Dust clouds
  const time = Date.now() / 1000;
  ctx.fillStyle = "rgba(180, 160, 140, 0.4)";
  for (let i = 0; i < 3; i++) {
    const dustOffset = (time * 0.2 + i * 0.4) % 1;
    const dustX = screenX - s * 0.1 + i * s * 0.1;
    const dustY = screenY + s * 0.1 - dustOffset * s * 0.15;
    const dustSize = s * 0.06 * (1 + dustOffset * 0.5);

    ctx.beginPath();
    ctx.arc(dustX, dustY, dustSize, 0, Math.PI * 2);
    ctx.fill();
  }

  // Tools leaning on rocks
  ctx.strokeStyle = "#654321";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.3, screenY + s * 0.1);
  ctx.lineTo(screenX + s * 0.35, screenY + s * 0.3);
  ctx.stroke();

  ctx.fillStyle = "#808080";
  ctx.fillRect(screenX + s * 0.28, screenY + s * 0.08, s * 0.06, s * 0.05);

  ctx.restore();
}

function drawCoalMine(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.8;

  ctx.save();

  const s = buildingSize * 1.3;

  // Helper function to draw irregular 5-sided polygon
  function drawIrregularPentagon(
    ctx,
    centerX,
    centerY,
    baseRadius,
    fill = true
  ) {
    const angles = [0, 1.2, 2.5, 3.9, 5.1]; // Irregular spacing
    const radiusVariations = [1.0, 0.85, 1.1, 0.9, 1.05]; // Irregular distances

    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = angles[i];
      const radius = baseRadius * radiusVariations[i];
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius * 0.75; // Compressed vertically

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();

    if (fill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }

  // Outer rim of pit (lightest earth)
  ctx.fillStyle = "#8b7355";
  drawIrregularPentagon(ctx, screenX, screenY, s * 0.5);

  // Second terrace (darker)
  ctx.fillStyle = "#6b5d47";
  drawIrregularPentagon(ctx, screenX, screenY, s * 0.42);

  // Third terrace
  ctx.fillStyle = "#4a4035";
  drawIrregularPentagon(ctx, screenX, screenY, s * 0.34);

  // Coal seam visible (very dark)
  ctx.fillStyle = "#1a1a1a";
  drawIrregularPentagon(ctx, screenX, screenY, s * 0.26);

  // Bottom of pit with water pooling
  ctx.fillStyle = "#0a0a0a";
  drawIrregularPentagon(ctx, screenX + s * 0.02, screenY + s * 0.02, s * 0.18);

  // Water reflection
  ctx.fillStyle = "rgba(100, 120, 140, 0.3)";
  drawIrregularPentagon(ctx, screenX + s * 0.02, screenY + s * 0.02, s * 0.15);

  // Terrace lines for depth
  ctx.strokeStyle = "#3a3025";
  ctx.lineWidth = 2;
  drawIrregularPentagon(ctx, screenX, screenY, s * 0.42, false);
  drawIrregularPentagon(ctx, screenX, screenY, s * 0.34, false);

  // Red vehicle following polygon edges
  const vehicleTime = Date.now() / 2400; // 50% speed (was 1200)

  // Generate pentagon vertices for outer edge
  const angles = [0, 1.2, 2.5, 3.9, 5.1];
  const radiusVariations = [1.0, 0.85, 1.1, 0.9, 1.05];
  const baseRadius = s * 0.5;

  // Calculate actual vertex positions
  const vertices = [];
  for (let i = 0; i < 5; i++) {
    const angle = angles[i];
    const radius = baseRadius * radiusVariations[i];
    vertices.push({
      x: screenX + Math.cos(angle) * radius,
      y: screenY + Math.sin(angle) * radius * 0.75,
    });
  }

  // Calculate total perimeter
  let totalPerimeter = 0;
  const edgeLengths = [];
  for (let i = 0; i < 5; i++) {
    const v1 = vertices[i];
    const v2 = vertices[(i + 1) % 5];
    const length = Math.sqrt(
      Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2)
    );
    edgeLengths.push(length);
    totalPerimeter += length;
  }

  // Position along entire perimeter
  const progress = ((vehicleTime * totalPerimeter) / 5) % totalPerimeter;

  // Find which edge we're on
  let accumulatedLength = 0;
  let edgeIndex = 0;
  let edgeProgress = 0;

  for (let j = 0; j < 5; j++) {
    if (progress < accumulatedLength + edgeLengths[j]) {
      edgeIndex = j;
      edgeProgress = (progress - accumulatedLength) / edgeLengths[j];
      break;
    }
    accumulatedLength += edgeLengths[j];
  }

  // Interpolate position along edge
  const v1 = vertices[edgeIndex];
  const v2 = vertices[(edgeIndex + 1) % 5];

  const vehicleX = v1.x + (v2.x - v1.x) * edgeProgress;
  const vehicleY = v1.y + (v2.y - v1.y) * edgeProgress;

  // Draw red vehicle
  ctx.fillStyle = "#cc0000";
  ctx.fillRect(vehicleX - s * 0.03, vehicleY - s * 0.02, s * 0.06, s * 0.04);

  // Vehicle cab
  ctx.fillStyle = "#990000";
  ctx.fillRect(vehicleX - s * 0.025, vehicleY - s * 0.03, s * 0.03, s * 0.02);

  // Wheels
  ctx.fillStyle = "#222222";
  ctx.beginPath();
  ctx.arc(vehicleX - s * 0.015, vehicleY + s * 0.01, s * 0.01, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(vehicleX + s * 0.015, vehicleY + s * 0.01, s * 0.01, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawSteelMill(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.7;

  ctx.save();

  const s = buildingSize;

  // Main building
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX - s * 0.6, screenY - s * 0.4, s, s * 1.2);

  // Industrial steel roof
  ctx.fillStyle = "#4a5568";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.65, screenY - s * 0.4);
  ctx.lineTo(screenX - s * 0.1, screenY - s * 0.6);
  ctx.lineTo(screenX + s * 0.45, screenY - s * 0.4);
  ctx.closePath();
  ctx.fill();

  // Roof panels/ridges
  ctx.strokeStyle = "#5a6578";
  ctx.lineWidth = 2 * zoom;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(
      screenX - s * 0.55 + i * s * 0.2,
      screenY - s * 0.43 - i * s * 0.033
    );
    ctx.lineTo(screenX - s * 0.55 + i * s * 0.2, screenY - s * 0.4);
    ctx.stroke();
  }

  // Cinder block texture
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 1 * zoom;
  const blockWidth = s * 0.2;
  const blockHeight = s * 0.12;

  for (let row = 0; row < 10; row++) {
    const offsetX = (row % 2) * (blockWidth / 2);
    for (let col = 0; col < 6; col++) {
      const x = screenX - s * 0.6 + col * blockWidth + offsetX;
      const y = screenY - s * 0.4 + row * blockHeight;
      if (x >= screenX - s * 0.6 && x + blockWidth <= screenX + s * 0.4) {
        ctx.strokeRect(x, y, blockWidth, blockHeight);
      }
    }
  }

  // Windows - 6 total, dark blue glass, equally spaced
  ctx.fillStyle = "#1a2a4a";

  // Top row - 3 windows with equal spacing
  ctx.fillRect(screenX - s * 0.43, screenY - s * 0.25, s * 0.16, s * 0.18);
  ctx.fillRect(screenX - s * 0.18, screenY - s * 0.25, s * 0.16, s * 0.18);
  ctx.fillRect(screenX + s * 0.07, screenY - s * 0.25, s * 0.16, s * 0.18);

  // Bottom row - 3 windows with equal spacing
  ctx.fillRect(screenX - s * 0.43, screenY + s * 0.08, s * 0.16, s * 0.18);
  ctx.fillRect(screenX - s * 0.18, screenY + s * 0.08, s * 0.16, s * 0.18);
  ctx.fillRect(screenX + s * 0.07, screenY + s * 0.08, s * 0.16, s * 0.18);

  // Window shutters (subtle dark frames)
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 2 * zoom;

  // Top row shutters
  ctx.strokeRect(screenX - s * 0.43, screenY - s * 0.25, s * 0.16, s * 0.18);
  ctx.strokeRect(screenX - s * 0.18, screenY - s * 0.25, s * 0.16, s * 0.18);
  ctx.strokeRect(screenX + s * 0.07, screenY - s * 0.25, s * 0.16, s * 0.18);

  // Bottom row shutters
  ctx.strokeRect(screenX - s * 0.43, screenY + s * 0.08, s * 0.16, s * 0.18);
  ctx.strokeRect(screenX - s * 0.18, screenY + s * 0.08, s * 0.16, s * 0.18);
  ctx.strokeRect(screenX + s * 0.07, screenY + s * 0.08, s * 0.16, s * 0.18);

  // Open loading door - dark interior
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(screenX - s * 0.3, screenY + s * 0.5, s * 0.4, s * 0.3);

  // Furnace glow inside
  const furnaceGlow = 0.6 + Math.sin(Date.now() / 200) * 0.4;
  ctx.fillStyle = `rgba(255, 100, 0, ${furnaceGlow})`;
  ctx.fillRect(screenX - s * 0.2, screenY + s * 0.55, s * 0.2, s * 0.15);

  // Pouring molten metal
  const pourProgress = (Date.now() / 1000) % 2;
  if (pourProgress < 1.5) {
    // Molten stream
    ctx.fillStyle = "#ffaa00";
    ctx.fillRect(
      screenX - s * 0.05,
      screenY + s * 0.6,
      s * 0.03,
      s * 0.1 + pourProgress * s * 0.08
    );

    // Bright hot tip
    ctx.fillStyle = "#ffff88";
    ctx.fillRect(screenX - s * 0.04, screenY + s * 0.6, s * 0.02, s * 0.04);
  }

  // Connecting structure between building and stack
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX + s * 0.35, screenY + s * 0.1, s * 0.1, s * 0.15);

  // Pipe connector
  ctx.fillStyle = "#555";
  ctx.fillRect(screenX + s * 0.3, screenY + s * 0.15, s * 0.2, s * 0.05);

  // Smokestack right next to building
  ctx.fillStyle = "#555";
  ctx.fillRect(screenX + s * 0.4, screenY - s * 1.2, s * 0.3, s * 2);

  // Stack bands
  ctx.fillStyle = "#666";
  ctx.fillRect(screenX + s * 0.4, screenY - s, s * 0.3, s * 0.06);
  ctx.fillRect(screenX + s * 0.4, screenY - s * 0.4, s * 0.3, s * 0.06);
  ctx.fillRect(screenX + s * 0.4, screenY + s * 0.2, s * 0.3, s * 0.06);

  // Stack cap
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX + s * 0.37, screenY - s * 1.25, s * 0.36, s * 0.08);

  // Animated smoke puffs
  const time = Date.now() / 1000;
  for (let i = 0; i < 3; i++) {
    const offset = (time * 0.5 + i * 0.4) % 1.2;
    const opacity = Math.max(0, 0.6 - offset * 0.5);
    if (opacity > 0.05) {
      ctx.fillStyle = `rgba(80, 80, 80, ${opacity})`;
      ctx.beginPath();
      ctx.arc(
        screenX + s * 0.55 + Math.sin(offset * 3) * s * 0.08,
        screenY - s * 1.3 - offset * s * 0.35,
        s * (0.12 + offset * 0.06),
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawTrainDepot(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 1;

  ctx.save();

  const s = buildingSize;

  // Main depot building with arched roof style
  ctx.fillStyle = "#8b4513";
  ctx.fillRect(screenX - s * 0.35, screenY - s * 0.15, s * 0.7, s * 0.45);

  // Roof (curved warehouse style)
  ctx.fillStyle = "#654321";
  ctx.beginPath();
  ctx.ellipse(
    screenX,
    screenY - s * 0.15,
    s * 0.38,
    s * 0.15,
    0,
    Math.PI,
    0,
    true
  );
  ctx.fill();

  // Roof highlight
  ctx.fillStyle = "#7a5230";
  ctx.beginPath();
  ctx.ellipse(
    screenX - s * 0.1,
    screenY - s * 0.2,
    s * 0.15,
    s * 0.08,
    0,
    Math.PI,
    0,
    true
  );
  ctx.fill();

  // Large depot doors (wooden sliding doors)
  ctx.fillStyle = "#5d3a1a";
  ctx.fillRect(screenX - s * 0.25, screenY - s * 0.05, s * 0.22, s * 0.35);
  ctx.fillRect(screenX + s * 0.03, screenY - s * 0.05, s * 0.22, s * 0.35);

  // Door panels detail
  ctx.strokeStyle = "#4a2c14";
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i++) {
    const yOffset = screenY + s * 0.05 + i * s * 0.1;
    ctx.beginPath();
    ctx.moveTo(screenX - s * 0.25, yOffset);
    ctx.lineTo(screenX - s * 0.03, yOffset);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(screenX + s * 0.03, yOffset);
    ctx.lineTo(screenX + s * 0.25, yOffset);
    ctx.stroke();
  }

  // Door handles
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(screenX - s * 0.05, screenY + s * 0.1, s * 0.03, s * 0.06);
  ctx.fillRect(screenX + s * 0.02, screenY + s * 0.1, s * 0.03, s * 0.06);

  // Side windows
  ctx.fillStyle = "#87ceeb";
  ctx.fillRect(screenX - s * 0.32, screenY - s * 0.08, s * 0.06, s * 0.08);
  ctx.fillRect(screenX + s * 0.26, screenY - s * 0.08, s * 0.06, s * 0.08);

  // Window frames
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 1;
  ctx.strokeRect(screenX - s * 0.32, screenY - s * 0.08, s * 0.06, s * 0.08);
  ctx.strokeRect(screenX + s * 0.26, screenY - s * 0.08, s * 0.06, s * 0.08);

  // Platform/loading dock
  ctx.fillStyle = "#a0a0a0";
  ctx.fillRect(screenX - s * 0.4, screenY + s * 0.3, s * 0.8, s * 0.08);

  // Platform edge
  ctx.fillStyle = "#808080";
  ctx.fillRect(screenX - s * 0.4, screenY + s * 0.3, s * 0.8, s * 0.02);

  // Railroad tracks
  const trackY = screenY + s * 0.38;

  // Rails
  ctx.strokeStyle = "#4a4a4a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.5, trackY);
  ctx.lineTo(screenX + s * 0.5, trackY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.5, trackY + s * 0.08);
  ctx.lineTo(screenX + s * 0.5, trackY + s * 0.08);
  ctx.stroke();

  // Railroad ties
  ctx.fillStyle = "#3a2a1a";
  for (let i = -3; i <= 3; i++) {
    ctx.fillRect(screenX + i * s * 0.15, trackY - s * 0.02, s * 0.08, s * 0.12);
  }

  // Animated signal light
  const time = Date.now() / 1000;
  const signalOn = Math.floor(time * 2) % 2 === 0;

  // Signal post
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(screenX + s * 0.32, screenY - s * 0.25, s * 0.03, s * 0.3);

  // Signal light
  ctx.fillStyle = signalOn ? "#00ff00" : "#004400";
  ctx.beginPath();
  ctx.arc(screenX + s * 0.335, screenY - s * 0.27, s * 0.04, 0, Math.PI * 2);
  ctx.fill();

  // Signal glow when on
  if (signalOn) {
    ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
    ctx.beginPath();
    ctx.arc(screenX + s * 0.335, screenY - s * 0.27, s * 0.06, 0, Math.PI * 2);
    ctx.fill();
  }

  // Steam/smoke from service area (optional detail)
  const smokeTime = Date.now() / 1000;
  for (let i = 0; i < 2; i++) {
    const offset = (smokeTime * 0.3 + i * 0.5) % 1.5;
    const opacity = Math.max(0, 0.4 - offset * 0.3);
    const smokeSize = s * (0.05 + offset * 0.05);

    ctx.fillStyle = `rgba(200, 200, 200, ${opacity})`;
    ctx.beginPath();
    ctx.arc(
      screenX - s * 0.3 + Math.sin(offset * 3) * s * 0.05,
      screenY - s * 0.2 - offset * s * 0.15,
      smokeSize,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  ctx.restore();
}

function drawLegacyVault(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 1.8;

  ctx.save();

  const s = buildingSize;

  // Draw base platform
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(screenX - s * 0.35, screenY + s * 0.25, s * 0.7, s * 0.08);

  // Main tower structure (modernist rectangular form)
  const towerWidth = s * 0.5;
  const towerHeight = s * 0.85;

  // Tower body - dark glass/steel
  const gradient = ctx.createLinearGradient(
    screenX - towerWidth / 2,
    0,
    screenX + towerWidth / 2,
    0
  );
  gradient.addColorStop(0, "#1a1a2e");
  gradient.addColorStop(0.5, "#2d2d44");
  gradient.addColorStop(1, "#1a1a2e");
  ctx.fillStyle = gradient;
  ctx.fillRect(
    screenX - towerWidth / 2,
    screenY + s * 0.25 - towerHeight,
    towerWidth,
    towerHeight
  );

  // Glass facade grid pattern
  ctx.strokeStyle = "#3a3a5a";
  ctx.lineWidth = 1 * zoom;

  // Vertical lines
  for (let i = 0; i <= 6; i++) {
    const x = screenX - towerWidth / 2 + (towerWidth / 6) * i;
    ctx.beginPath();
    ctx.moveTo(x, screenY + s * 0.25 - towerHeight);
    ctx.lineTo(x, screenY + s * 0.25);
    ctx.stroke();
  }

  // Horizontal lines (floors)
  for (let i = 0; i <= 10; i++) {
    const y = screenY + s * 0.25 - (towerHeight / 10) * i;
    ctx.beginPath();
    ctx.moveTo(screenX - towerWidth / 2, y);
    ctx.lineTo(screenX + towerWidth / 2, y);
    ctx.stroke();
  }

  // Illuminated windows - representing bits of Unix timestamp
  // Get current Unix timestamp (32-bit)
  const unixTime = Math.floor(Date.now() / 1000);

  // We'll use 32 windows to represent each bit of the 32-bit timestamp
  // Least significant bit at top-right (floor 4, col 5)
  // Reading right-to-left, top-to-bottom
  let bitIndex = 0; // Start from least significant bit
  let windowCount = 0;

  for (let floor = 4; floor <= 9 && windowCount < 32; floor++) {
    for (let col = 5; col >= 0 && windowCount < 32; col--) {
      // Check if this bit is set in the Unix timestamp
      const bitIsSet = (unixTime >> bitIndex) & 1;

      const wx = screenX - towerWidth / 2 + (towerWidth / 6) * col + s * 0.02;
      const wy = screenY + s * 0.25 - (towerHeight / 10) * floor - s * 0.07;

      if (bitIsSet) {
        ctx.fillStyle = "rgba(255, 235, 153, 0.8)";
      } else {
        ctx.fillStyle = "rgba(50, 50, 70, 0.3)";
      }

      ctx.fillRect(wx, wy, s * 0.06, s * 0.06);

      bitIndex++;
      windowCount++;
    }
  }

  // Top crown section (set back slightly)
  ctx.fillStyle = "#4a4a6a";
  ctx.fillRect(
    screenX - towerWidth / 2 + s * 0.05,
    screenY + s * 0.25 - towerHeight - s * 0.12,
    towerWidth - s * 0.1,
    s * 0.12
  );

  // Golden accent band at top
  ctx.fillStyle = "#a89968";
  ctx.fillRect(
    screenX - towerWidth / 2,
    screenY + s * 0.25 - towerHeight - s * 0.02,
    towerWidth,
    s * 0.02
  );

  // Rooftop beacon platform
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(
    screenX - s * 0.15,
    screenY + s * 0.25 - towerHeight - s * 0.18,
    s * 0.3,
    s * 0.06
  );

  // Modern beacon light (not flame-like)
  const time = Date.now() / 1000;
  const pulseGlow = Math.sin(time * 2) * 0.3 + 0.7;

  // Beacon housing
  ctx.fillStyle = "#5a5a5a";
  ctx.fillRect(
    screenX - s * 0.08,
    screenY + s * 0.25 - towerHeight - s * 0.28,
    s * 0.16,
    s * 0.1
  );

  // Glass dome on beacon
  ctx.fillStyle = "rgba(100, 150, 255, 0.3)";
  ctx.beginPath();
  ctx.arc(
    screenX,
    screenY + s * 0.25 - towerHeight - s * 0.23,
    s * 0.08,
    Math.PI,
    0,
    false
  );
  ctx.fill();

  // Radial light beams (rotating once every 4 seconds)
  const beamRotation = (time / 4) * Math.PI * 2; // Full rotation in 4 seconds
  ctx.save();
  ctx.translate(screenX, screenY + s * 0.25 - towerHeight - s * 0.23);

  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + beamRotation; // Add rotation to each beam
    const beamGradient = ctx.createLinearGradient(
      0,
      0,
      Math.cos(angle) * s * 0.5,
      Math.sin(angle) * s * 0.5
    );
    beamGradient.addColorStop(0, `rgba(100, 180, 255, ${0.6 * pulseGlow})`);
    beamGradient.addColorStop(1, "rgba(100, 180, 255, 0)");

    ctx.fillStyle = beamGradient;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
      Math.cos(angle - 0.15) * s * 0.5,
      Math.sin(angle - 0.15) * s * 0.5
    );
    ctx.lineTo(
      Math.cos(angle + 0.15) * s * 0.5,
      Math.sin(angle + 0.15) * s * 0.5
    );
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Central light orb
  const orbGradient = ctx.createRadialGradient(
    screenX,
    screenY + s * 0.25 - towerHeight - s * 0.23,
    0,
    screenX,
    screenY + s * 0.25 - towerHeight - s * 0.23,
    s * 0.12 * pulseGlow
  );
  orbGradient.addColorStop(0, `rgba(150, 200, 255, ${0.9 * pulseGlow})`);
  orbGradient.addColorStop(0.5, `rgba(100, 150, 255, ${0.4 * pulseGlow})`);
  orbGradient.addColorStop(1, "rgba(100, 150, 255, 0)");
  ctx.fillStyle = orbGradient;
  ctx.beginPath();
  ctx.arc(
    screenX,
    screenY + s * 0.25 - towerHeight - s * 0.23,
    s * 0.12 * pulseGlow,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Bright core
  ctx.fillStyle = `rgba(200, 230, 255, ${0.9 * pulseGlow})`;
  ctx.beginPath();
  ctx.arc(
    screenX,
    screenY + s * 0.25 - towerHeight - s * 0.23,
    s * 0.04,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Main entrance at base
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(screenX - s * 0.12, screenY + s * 0.15, s * 0.24, s * 0.1);

  // Entrance frame (modern)
  ctx.strokeStyle = "#a89968";
  ctx.lineWidth = 2 * zoom;
  ctx.strokeRect(screenX - s * 0.12, screenY + s * 0.15, s * 0.24, s * 0.1);

  // Revolving door suggestion
  ctx.fillStyle = "rgba(100, 100, 120, 0.5)";
  ctx.beginPath();
  ctx.arc(screenX, screenY + s * 0.2, s * 0.08, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#666";
  ctx.lineWidth = 1 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX, screenY + s * 0.2);
  ctx.lineTo(screenX + s * 0.08, screenY + s * 0.2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(screenX, screenY + s * 0.2);
  ctx.lineTo(screenX, screenY + s * 0.2 - s * 0.08);
  ctx.stroke();

  ctx.restore();
}

function drawCommodityExchange(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.9;

  ctx.save();

  const s = buildingSize;

  // Main building - classical architecture style
  ctx.fillStyle = "#e8d4b0";
  ctx.fillRect(screenX - s * 0.4, screenY - s * 0.25, s * 0.8, s * 0.55);

  // Building highlights/shadows for depth
  ctx.fillStyle = "#d4c09a";
  ctx.fillRect(screenX - s * 0.4, screenY - s * 0.25, s * 0.1, s * 0.55);

  // Classical columns (4 columns across front)
  ctx.fillStyle = "#f5e6d3";
  for (let i = 0; i < 4; i++) {
    const colX = screenX - s * 0.3 + i * s * 0.2;

    // Column base
    ctx.fillRect(colX - s * 0.03, screenY + s * 0.25, s * 0.06, s * 0.05);

    // Column shaft
    ctx.fillRect(colX - s * 0.025, screenY - s * 0.15, s * 0.05, s * 0.4);

    // Column capital (top)
    ctx.fillRect(colX - s * 0.035, screenY - s * 0.18, s * 0.07, s * 0.03);
  }

  // Pediment (triangular top)
  ctx.fillStyle = "#d4c09a";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.45, screenY - s * 0.25);
  ctx.lineTo(screenX, screenY - s * 0.45);
  ctx.lineTo(screenX + s * 0.45, screenY - s * 0.25);
  ctx.closePath();
  ctx.fill();

  // Pediment decoration line
  ctx.strokeStyle = "#b8a682";
  ctx.lineWidth = 2 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.45, screenY - s * 0.25);
  ctx.lineTo(screenX, screenY - s * 0.45);
  ctx.lineTo(screenX + s * 0.45, screenY - s * 0.25);
  ctx.stroke();

  // Golden dollar sign in pediment
  ctx.fillStyle = "#ffd700";
  ctx.font = `bold ${s * 0.15}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("$", screenX, screenY - s * 0.32);

  // Main entrance
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(screenX - s * 0.15, screenY + s * 0.05, s * 0.3, s * 0.25);

  // Entrance frame
  ctx.strokeStyle = "#b8a682";
  ctx.lineWidth = 3 * zoom;
  ctx.strokeRect(screenX - s * 0.15, screenY + s * 0.05, s * 0.3, s * 0.25);

  // Double doors
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 2 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX, screenY + s * 0.05);
  ctx.lineTo(screenX, screenY + s * 0.3);
  ctx.stroke();

  // Door handles
  ctx.fillStyle = "#ffd700";
  ctx.beginPath();
  ctx.arc(screenX - s * 0.04, screenY + s * 0.17, s * 0.015, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(screenX + s * 0.04, screenY + s * 0.17, s * 0.015, 0, Math.PI * 2);
  ctx.fill();

  // Windows on either side of entrance
  ctx.fillStyle = "#87ceeb";

  // Left windows
  ctx.fillRect(screenX - s * 0.35, screenY - s * 0.08, s * 0.12, s * 0.15);
  ctx.fillRect(screenX - s * 0.35, screenY + s * 0.12, s * 0.12, s * 0.15);

  // Right windows
  ctx.fillRect(screenX + s * 0.23, screenY - s * 0.08, s * 0.12, s * 0.15);
  ctx.fillRect(screenX + s * 0.23, screenY + s * 0.12, s * 0.12, s * 0.15);

  // Window frames
  ctx.strokeStyle = "#b8a682";
  ctx.lineWidth = 2 * zoom;

  ctx.strokeRect(screenX - s * 0.35, screenY - s * 0.08, s * 0.12, s * 0.15);
  ctx.strokeRect(screenX - s * 0.35, screenY + s * 0.12, s * 0.12, s * 0.15);
  ctx.strokeRect(screenX + s * 0.23, screenY - s * 0.08, s * 0.12, s * 0.15);
  ctx.strokeRect(screenX + s * 0.23, screenY + s * 0.12, s * 0.12, s * 0.15);

  // Window panes (cross divisions)
  ctx.lineWidth = 1 * zoom;
  // Left windows
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.29, screenY - s * 0.08);
  ctx.lineTo(screenX - s * 0.29, screenY + s * 0.07);
  ctx.moveTo(screenX - s * 0.35, screenY);
  ctx.lineTo(screenX - s * 0.23, screenY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.29, screenY + s * 0.12);
  ctx.lineTo(screenX - s * 0.29, screenY + s * 0.27);
  ctx.moveTo(screenX - s * 0.35, screenY + s * 0.195);
  ctx.lineTo(screenX - s * 0.23, screenY + s * 0.195);
  ctx.stroke();

  // Right windows
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.29, screenY - s * 0.08);
  ctx.lineTo(screenX + s * 0.29, screenY + s * 0.07);
  ctx.moveTo(screenX + s * 0.23, screenY);
  ctx.lineTo(screenX + s * 0.35, screenY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.29, screenY + s * 0.12);
  ctx.lineTo(screenX + s * 0.29, screenY + s * 0.27);
  ctx.moveTo(screenX + s * 0.23, screenY + s * 0.195);
  ctx.lineTo(screenX + s * 0.35, screenY + s * 0.195);
  ctx.stroke();

  // Animated ticker display above entrance
  const time = Date.now() / 1000;
  const tickerScroll = (time * 20) % 100;

  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(screenX - s * 0.35, screenY - s * 0.18, s * 0.7, s * 0.06);

  // Ticker text
  ctx.fillStyle = "#00ff00";
  ctx.font = `${s * 0.035}px monospace`;
  ctx.textAlign = "left";
  const tickerText =
    "GOLD ↑15.2  IRON ↓3.8  COAL ↑8.5  STEEL ↑12.1  ORE ↓2.3  ";
  const textWidth = ctx.measureText(tickerText).width;

  ctx.save();
  ctx.beginPath();
  ctx.rect(screenX - s * 0.35, screenY - s * 0.18, s * 0.7, s * 0.06);
  ctx.clip();

  ctx.fillText(
    tickerText,
    screenX - s * 0.33 - (tickerScroll % textWidth),
    screenY - s * 0.145
  );
  ctx.fillText(
    tickerText,
    screenX - s * 0.33 - (tickerScroll % textWidth) + textWidth,
    screenY - s * 0.145
  );

  ctx.restore();

  // Steps leading to entrance
  ctx.fillStyle = "#c8b89a";
  ctx.fillRect(screenX - s * 0.42, screenY + s * 0.3, s * 0.84, s * 0.04);
  ctx.fillRect(screenX - s * 0.44, screenY + s * 0.34, s * 0.88, s * 0.04);

  // Animated coins/money symbols floating
  for (let i = 0; i < 3; i++) {
    const floatTime = time + i * 1.3;
    const floatY = ((floatTime * 15) % 40) - 20;
    const opacity = Math.sin(floatTime * 2) * 0.3 + 0.5;
    const coinX = screenX - s * 0.25 + i * s * 0.25;

    ctx.fillStyle = `rgba(255, 215, 0, ${opacity * 0.6})`;
    ctx.beginPath();
    ctx.arc(coinX, screenY - s * 0.5 + floatY, s * 0.04, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(184, 134, 11, ${opacity})`;
    ctx.font = `bold ${s * 0.045}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("$", coinX, screenY - s * 0.5 + floatY);
  }

  ctx.restore();
}

function drawInvestmentResearchInstitute(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 1.1;

  ctx.save();

  const s = buildingSize;

  // Grand staircase base
  ctx.fillStyle = "#9a8a7a";
  for (let i = 0; i < 4; i++) {
    const stepWidth = s * 0.9 + i * s * 0.08;
    ctx.fillRect(
      screenX - stepWidth / 2,
      screenY + s * 0.35 - i * s * 0.03,
      stepWidth,
      s * 0.03
    );
  }

  // Main building body - prestigious white marble
  ctx.fillStyle = "#f5f5f0";
  ctx.fillRect(screenX - s * 0.45, screenY - s * 0.35, s * 0.9, s * 0.7);

  // Building side shading for depth
  ctx.fillStyle = "#e5e5dc";
  ctx.fillRect(screenX - s * 0.45, screenY - s * 0.35, s * 0.08, s * 0.7);

  // Grand portico roof
  ctx.fillStyle = "#d4c4b4";
  ctx.fillRect(screenX - s * 0.5, screenY - s * 0.38, s, s * 0.06);

  // Roof shadow underneath
  ctx.fillStyle = "#b4a494";
  ctx.fillRect(screenX - s * 0.5, screenY - s * 0.35, s, s * 0.03);

  // Decorative pediment above columns
  ctx.fillStyle = "#e8d8c8";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.52, screenY - s * 0.38);
  ctx.lineTo(screenX, screenY - s * 0.55);
  ctx.lineTo(screenX + s * 0.52, screenY - s * 0.38);
  ctx.closePath();
  ctx.fill();

  // Pediment outline
  ctx.strokeStyle = "#c4b4a4";
  ctx.lineWidth = 2 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.52, screenY - s * 0.38);
  ctx.lineTo(screenX, screenY - s * 0.55);
  ctx.lineTo(screenX + s * 0.52, screenY - s * 0.38);
  ctx.stroke();

  // Pediment relief sculpture suggestion (abstract brain/knowledge symbol)
  ctx.fillStyle = "#c8b8a8";
  ctx.beginPath();
  ctx.arc(screenX, screenY - s * 0.45, s * 0.08, 0, Math.PI * 2);
  ctx.fill();

  // Brain-like pattern in pediment
  ctx.strokeStyle = "#b4a494";
  ctx.lineWidth = 1.5 * zoom;
  ctx.beginPath();
  ctx.arc(screenX - s * 0.03, screenY - s * 0.45, s * 0.05, 0, Math.PI * 1.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(
    screenX + s * 0.03,
    screenY - s * 0.45,
    s * 0.05,
    Math.PI * 0.5,
    Math.PI * 2
  );
  ctx.stroke();

  // Six grand Ionic columns
  ctx.fillStyle = "#fafaf5";
  for (let i = 0; i < 6; i++) {
    const colX = screenX - s * 0.4 + i * s * 0.16;

    // Column base (wider)
    ctx.fillStyle = "#e8e8e0";
    ctx.fillRect(colX - s * 0.035, screenY + s * 0.32, s * 0.07, s * 0.03);

    // Column shaft with fluting effect
    ctx.fillStyle = "#fafaf5";
    ctx.fillRect(colX - s * 0.03, screenY - s * 0.32, s * 0.06, s * 0.64);

    // Fluting lines (vertical grooves)
    ctx.strokeStyle = "#e8e8e0";
    ctx.lineWidth = 1 * zoom;
    for (let f = 0; f < 3; f++) {
      const flutingX = colX - s * 0.02 + f * s * 0.02;
      ctx.beginPath();
      ctx.moveTo(flutingX, screenY - s * 0.29);
      ctx.lineTo(flutingX, screenY + s * 0.29);
      ctx.stroke();
    }

    // Ionic capital (distinctive scrolls)
    ctx.fillStyle = "#f0f0e8";
    ctx.fillRect(colX - s * 0.04, screenY - s * 0.35, s * 0.08, s * 0.04);

    // Scrolls on capital
    ctx.strokeStyle = "#d4c4b4";
    ctx.lineWidth = 1.5 * zoom;
    ctx.beginPath();
    ctx.arc(colX - s * 0.035, screenY - s * 0.33, s * 0.015, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(colX + s * 0.035, screenY - s * 0.33, s * 0.015, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Main entrance door (between middle columns)
  ctx.fillStyle = "#3a2f25";
  ctx.fillRect(screenX - s * 0.15, screenY + s * 0.08, s * 0.3, s * 0.27);

  // Door panels (classical design)
  ctx.strokeStyle = "#5a4f45";
  ctx.lineWidth = 2 * zoom;
  ctx.strokeRect(screenX - s * 0.13, screenY + s * 0.11, s * 0.11, s * 0.1);
  ctx.strokeRect(screenX + s * 0.02, screenY + s * 0.11, s * 0.11, s * 0.1);
  ctx.strokeRect(screenX - s * 0.13, screenY + s * 0.23, s * 0.11, s * 0.1);
  ctx.strokeRect(screenX + s * 0.02, screenY + s * 0.23, s * 0.11, s * 0.1);

  // Brass door handles
  ctx.fillStyle = "#b8860b";
  ctx.beginPath();
  ctx.arc(screenX - s * 0.05, screenY + s * 0.2, s * 0.012, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(screenX + s * 0.05, screenY + s * 0.2, s * 0.012, 0, Math.PI * 2);
  ctx.fill();

  // Transom window above door
  ctx.fillStyle = "#87ceeb";
  ctx.fillRect(screenX - s * 0.14, screenY + s * 0.02, s * 0.28, s * 0.05);

  // Transom divisions
  ctx.strokeStyle = "#5a4f45";
  ctx.lineWidth = 1 * zoom;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX - s * 0.14 + i * s * 0.07, screenY + s * 0.02);
    ctx.lineTo(screenX - s * 0.14 + i * s * 0.07, screenY + s * 0.07);
    ctx.stroke();
  }

  // Tall windows on upper floors (behind columns)
  ctx.fillStyle = "#b8d4e8";

  // Left side windows
  ctx.fillRect(screenX - s * 0.38, screenY - s * 0.25, s * 0.12, s * 0.18);
  ctx.fillRect(screenX - s * 0.22, screenY - s * 0.25, s * 0.12, s * 0.18);

  // Right side windows
  ctx.fillRect(screenX + s * 0.1, screenY - s * 0.25, s * 0.12, s * 0.18);
  ctx.fillRect(screenX + s * 0.26, screenY - s * 0.25, s * 0.12, s * 0.18);

  // Window frames
  ctx.strokeStyle = "#d4c4b4";
  ctx.lineWidth = 2 * zoom;
  ctx.strokeRect(screenX - s * 0.38, screenY - s * 0.25, s * 0.12, s * 0.18);
  ctx.strokeRect(screenX - s * 0.22, screenY - s * 0.25, s * 0.12, s * 0.18);
  ctx.strokeRect(screenX + s * 0.1, screenY - s * 0.25, s * 0.12, s * 0.18);
  ctx.strokeRect(screenX + s * 0.26, screenY - s * 0.25, s * 0.12, s * 0.18);

  // Window panes
  ctx.lineWidth = 1 * zoom;
  ctx.strokeStyle = "#c4b4a4";

  // Left windows
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.32, screenY - s * 0.25);
  ctx.lineTo(screenX - s * 0.32, screenY - s * 0.07);
  ctx.moveTo(screenX - s * 0.38, screenY - s * 0.16);
  ctx.lineTo(screenX - s * 0.26, screenY - s * 0.16);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.16, screenY - s * 0.25);
  ctx.lineTo(screenX - s * 0.16, screenY - s * 0.07);
  ctx.moveTo(screenX - s * 0.22, screenY - s * 0.16);
  ctx.lineTo(screenX - s * 0.1, screenY - s * 0.16);
  ctx.stroke();

  // Right windows
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.16, screenY - s * 0.25);
  ctx.lineTo(screenX + s * 0.16, screenY - s * 0.07);
  ctx.moveTo(screenX + s * 0.1, screenY - s * 0.16);
  ctx.lineTo(screenX + s * 0.22, screenY - s * 0.16);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.32, screenY - s * 0.25);
  ctx.lineTo(screenX + s * 0.32, screenY - s * 0.07);
  ctx.moveTo(screenX + s * 0.26, screenY - s * 0.16);
  ctx.lineTo(screenX + s * 0.38, screenY - s * 0.16);
  ctx.stroke();

  // Institute nameplate
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(screenX - s * 0.35, screenY + s * 0.4, s * 0.7, s * 0.05);

  ctx.fillStyle = "#d4af37";
  ctx.font = `${s * 0.03}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("INVESTMENT RESEARCH INSTITUTE", screenX, screenY + s * 0.425);

  // Animated glowing charts/graphs visible through windows (research activity)
  const time = Date.now() / 1000;

  // Left window - line chart
  const chartGlow = Math.sin(time * 2) * 0.2 + 0.6;
  ctx.strokeStyle = `rgba(50, 200, 50, ${chartGlow})`;
  ctx.lineWidth = 2 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.36, screenY - s * 0.18);
  ctx.lineTo(screenX - s * 0.33, screenY - s * 0.14);
  ctx.lineTo(screenX - s * 0.31, screenY - s * 0.16);
  ctx.lineTo(screenX - s * 0.28, screenY - s * 0.12);
  ctx.stroke();

  // Right window - bar chart suggestion
  ctx.fillStyle = `rgba(50, 150, 255, ${chartGlow})`;
  ctx.fillRect(screenX + s * 0.12, screenY - s * 0.16, s * 0.02, s * 0.06);
  ctx.fillRect(screenX + s * 0.16, screenY - s * 0.18, s * 0.02, s * 0.08);
  ctx.fillRect(screenX + s * 0.2, screenY - s * 0.15, s * 0.02, s * 0.05);

  // Floating percentage symbols (representing compound growth)
  for (let i = 0; i < 2; i++) {
    const floatTime = time * 0.8 + i * 2;
    const floatY = ((floatTime * 12) % 35) - 18;
    const opacity = Math.sin(floatTime * 1.5) * 0.25 + 0.45;
    const symbolX = screenX - s * 0.45 + i * s * 0.9;

    ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
    ctx.font = `bold ${s * 0.06}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText("%", symbolX, screenY - s * 0.6 + floatY);
  }

  // Ornamental urns on either side of entrance
  ctx.fillStyle = "#8a7a6a";

  // Left urn
  ctx.fillRect(screenX - s * 0.48, screenY + s * 0.28, s * 0.06, s * 0.08);
  ctx.fillRect(screenX - s * 0.49, screenY + s * 0.26, s * 0.08, s * 0.02);

  // Right urn
  ctx.fillRect(screenX + s * 0.42, screenY + s * 0.28, s * 0.06, s * 0.08);
  ctx.fillRect(screenX + s * 0.41, screenY + s * 0.26, s * 0.08, s * 0.02);

  // Plants in urns
  ctx.fillStyle = "#2d5016";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.45, screenY + s * 0.28);
  ctx.lineTo(screenX - s * 0.47, screenY + s * 0.22);
  ctx.lineTo(screenX - s * 0.43, screenY + s * 0.23);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.45, screenY + s * 0.28);
  ctx.lineTo(screenX + s * 0.47, screenY + s * 0.22);
  ctx.lineTo(screenX + s * 0.43, screenY + s * 0.23);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawAdvancedOreMine(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 1.2;

  ctx.save();

  const s = buildingSize;

  // Large modern mining facility building
  ctx.fillStyle = "#4a5568";
  ctx.fillRect(screenX - s * 0.4, screenY - s * 0.2, s * 0.8, s * 0.5);

  // Building panels/sections
  ctx.fillStyle = "#5a6578";
  ctx.fillRect(screenX - s * 0.4, screenY - s * 0.2, s * 0.15, s * 0.5);
  ctx.fillRect(screenX + s * 0.25, screenY - s * 0.2, s * 0.15, s * 0.5);

  // Industrial roof
  ctx.fillStyle = "#3a4555";
  ctx.fillRect(screenX - s * 0.42, screenY - s * 0.23, s * 0.84, s * 0.05);

  // Roof vents
  ctx.fillStyle = "#2a3545";
  ctx.fillRect(screenX - s * 0.25, screenY - s * 0.28, s * 0.12, s * 0.05);
  ctx.fillRect(screenX + s * 0.13, screenY - s * 0.28, s * 0.12, s * 0.05);

  // Large automated drill tower
  ctx.fillStyle = "#6a7a8a";
  ctx.fillRect(screenX + s * 0.3, screenY - s * 0.7, s * 0.25, s * 0.95);

  // Tower structural beams
  ctx.strokeStyle = "#5a6a7a";
  ctx.lineWidth = 2 * zoom;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX + s * 0.35 + i * s * 0.05, screenY - s * 0.7);
    ctx.lineTo(screenX + s * 0.35 + i * s * 0.05, screenY + s * 0.25);
    ctx.stroke();
  }

  // Horizontal support beams
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX + s * 0.3, screenY - s * 0.6 + i * s * 0.25);
    ctx.lineTo(screenX + s * 0.55, screenY - s * 0.6 + i * s * 0.25);
    ctx.stroke();
  }

  // Tower platform at top
  ctx.fillStyle = "#7a8a9a";
  ctx.fillRect(screenX + s * 0.28, screenY - s * 0.72, s * 0.29, s * 0.06);

  // Pulley system at top of tower
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX + s * 0.4, screenY - s * 0.75, s * 0.08, s * 0.03);

  // Pulley wheels
  ctx.strokeStyle = "#3a3a3a";
  ctx.lineWidth = 2 * zoom;
  ctx.beginPath();
  ctx.arc(screenX + s * 0.42, screenY - s * 0.735, s * 0.025, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(screenX + s * 0.46, screenY - s * 0.735, s * 0.025, 0, Math.PI * 2);
  ctx.stroke();

  // Animated drill cables going down
  const drillTime = (Date.now() / 2000) % 1;
  const drillDepth = drillTime * s * 0.8;

  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 3 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.42, screenY - s * 0.71);
  ctx.lineTo(screenX + s * 0.42, screenY - s * 0.71 + drillDepth);
  ctx.stroke();

  // Drill head
  ctx.fillStyle = "#8a8a8a";
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.42, screenY - s * 0.71 + drillDepth);
  ctx.lineTo(screenX + s * 0.38, screenY - s * 0.71 + drillDepth + s * 0.08);
  ctx.lineTo(screenX + s * 0.46, screenY - s * 0.71 + drillDepth + s * 0.08);
  ctx.closePath();
  ctx.fill();

  // Drill bit (rotating)
  const rotationAngle = (Date.now() / 50) % 360;
  ctx.save();
  ctx.translate(screenX + s * 0.42, screenY - s * 0.71 + drillDepth + s * 0.08);
  ctx.rotate((rotationAngle * Math.PI) / 180);

  ctx.fillStyle = "#606060";
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 6);
    ctx.fillRect(-s * 0.01, 0, s * 0.02, s * 0.06);
    ctx.restore();
  }
  ctx.restore();

  // Control room with large windows
  ctx.fillStyle = "#5a6a7a";
  ctx.fillRect(screenX - s * 0.35, screenY - s * 0.35, s * 0.3, s * 0.15);

  // Control room windows
  ctx.fillStyle = "#87ceeb";
  ctx.fillRect(screenX - s * 0.33, screenY - s * 0.32, s * 0.26, s * 0.09);

  // Window reflections
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fillRect(screenX - s * 0.33, screenY - s * 0.32, s * 0.12, s * 0.04);

  // Control panels visible inside
  const screenGlow = Math.sin(Date.now() / 300) * 0.3 + 0.6;
  ctx.fillStyle = `rgba(50, 255, 50, ${screenGlow * 0.4})`;
  ctx.fillRect(screenX - s * 0.3, screenY - s * 0.29, s * 0.05, s * 0.04);
  ctx.fillRect(screenX - s * 0.23, screenY - s * 0.29, s * 0.05, s * 0.04);
  ctx.fillRect(screenX - s * 0.16, screenY - s * 0.29, s * 0.05, s * 0.04);

  // Power transmission lines/cables
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 4 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.5, screenY - s * 0.15);
  ctx.lineTo(screenX - s * 0.4, screenY - s * 0.12);
  ctx.lineTo(screenX - s * 0.4, screenY - s * 0.2);
  ctx.stroke();

  // Power poles
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX - s * 0.52, screenY - s * 0.25, s * 0.04, s * 0.15);

  // Insulators
  ctx.fillStyle = "#6a6a6a";
  ctx.beginPath();
  ctx.arc(screenX - s * 0.5, screenY - s * 0.15, s * 0.02, 0, Math.PI * 2);
  ctx.fill();

  // Electric warning sign
  ctx.fillStyle = "#ffeb3b";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.48, screenY - s * 0.08);
  ctx.lineTo(screenX - s * 0.52, screenY - s * 0.02);
  ctx.lineTo(screenX - s * 0.44, screenY - s * 0.02);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#000000";
  ctx.font = `bold ${s * 0.04}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("⚡", screenX - s * 0.48, screenY - s * 0.05);

  // Conveyor belt system
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX - s * 0.1, screenY + s * 0.15, s * 0.5, s * 0.08);

  // Conveyor rollers (animated)
  const conveyorTime = (Date.now() / 150) % 1;
  ctx.fillStyle = "#5a5a5a";
  for (let i = 0; i < 8; i++) {
    const rollerX =
      screenX -
      s * 0.08 +
      ((i * s * 0.06 + conveyorTime * s * 0.06) % (s * 0.48));
    ctx.beginPath();
    ctx.arc(rollerX, screenY + s * 0.19, s * 0.02, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ore chunks on conveyor
  ctx.fillStyle = "#7a7a7a";
  for (let i = 0; i < 5; i++) {
    const oreX =
      screenX -
      s * 0.05 +
      ((i * s * 0.1 + conveyorTime * s * 0.5) % (s * 0.45));
    ctx.fillRect(oreX, screenY + s * 0.16, s * 0.04, s * 0.04);
  }

  // Ore with metallic shine
  ctx.fillStyle = "#9a9a9a";
  for (let i = 0; i < 5; i++) {
    const oreX =
      screenX -
      s * 0.05 +
      ((i * s * 0.1 + conveyorTime * s * 0.5) % (s * 0.45));
    ctx.fillRect(oreX, screenY + s * 0.16, s * 0.015, s * 0.015);
  }

  // Storage silos
  ctx.fillStyle = "#5a6a7a";
  ctx.fillRect(screenX - s * 0.38, screenY + s * 0.05, s * 0.15, s * 0.25);
  ctx.fillRect(screenX - s * 0.2, screenY + s * 0.05, s * 0.15, s * 0.25);

  // Silo tops (conical)
  ctx.fillStyle = "#4a5a6a";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.4, screenY + s * 0.05);
  ctx.lineTo(screenX - s * 0.305, screenY - s * 0.05);
  ctx.lineTo(screenX - s * 0.23, screenY + s * 0.05);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.22, screenY + s * 0.05);
  ctx.lineTo(screenX - s * 0.125, screenY - s * 0.05);
  ctx.lineTo(screenX - s * 0.05, screenY + s * 0.05);
  ctx.closePath();
  ctx.fill();

  // Silo access ladders
  ctx.strokeStyle = "#3a4a5a";
  ctx.lineWidth = 2 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.24, screenY + s * 0.08);
  ctx.lineTo(screenX - s * 0.24, screenY + s * 0.28);
  ctx.stroke();

  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX - s * 0.26, screenY + s * 0.1 + i * s * 0.04);
    ctx.lineTo(screenX - s * 0.22, screenY + s * 0.1 + i * s * 0.04);
    ctx.stroke();
  }

  // Floodlights (industrial lighting)
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(screenX + s * 0.52, screenY - s * 0.65, s * 0.04, s * 0.08);

  // Light beam effect
  const lightPulse = Math.sin(Date.now() / 400) * 0.2 + 0.6;
  const lightGradient = ctx.createRadialGradient(
    screenX + s * 0.54,
    screenY - s * 0.65,
    0,
    screenX + s * 0.54,
    screenY - s * 0.65,
    s * 0.3
  );
  lightGradient.addColorStop(0, `rgba(255, 255, 200, ${lightPulse * 0.4})`);
  lightGradient.addColorStop(1, "rgba(255, 255, 200, 0)");
  ctx.fillStyle = lightGradient;
  ctx.fillRect(screenX + s * 0.3, screenY - s * 0.7, s * 0.4, s * 0.4);

  // Dust particles in the air
  const dustTime = Date.now() / 1000;
  ctx.fillStyle = "rgba(180, 180, 180, 0.3)";
  for (let i = 0; i < 8; i++) {
    const dustX =
      screenX - s * 0.3 + (i % 4) * s * 0.2 + Math.sin(dustTime + i) * s * 0.05;
    const dustY =
      screenY -
      s * 0.4 +
      Math.floor(i / 4) * s * 0.3 +
      Math.cos(dustTime * 0.5 + i) * s * 0.05;
    ctx.beginPath();
    ctx.arc(dustX, dustY, s * 0.01, 0, Math.PI * 2);
    ctx.fill();
  }

  // Generator/power unit
  ctx.fillStyle = "#4a4a5a";
  ctx.fillRect(screenX + s * 0.35, screenY + s * 0.25, s * 0.15, s * 0.12);

  // Generator exhaust
  ctx.strokeStyle = "rgba(100, 100, 100, 0.4)";
  ctx.lineWidth = 3 * zoom;
  const exhaustOffset = (Date.now() / 1000) % 1;
  for (let i = 0; i < 3; i++) {
    const offset = (exhaustOffset + i * 0.3) % 1;
    const opacity = 0.4 - offset * 0.4;
    ctx.strokeStyle = `rgba(100, 100, 100, ${opacity})`;
    ctx.beginPath();
    ctx.moveTo(screenX + s * 0.51, screenY + s * 0.27);
    ctx.lineTo(
      screenX + s * 0.53 + offset * s * 0.05,
      screenY + s * 0.27 - offset * s * 0.1
    );
    ctx.stroke();
  }

  ctx.restore();
}

function drawAdvancedCoalMine(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 1.2;

  ctx.save();

  const s = buildingSize;

  // Main processing facility
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX - s * 0.35, screenY - s * 0.15, s * 0.7, s * 0.45);

  // Building sections with coal dust weathering
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(screenX - s * 0.35, screenY - s * 0.15, s * 0.12, s * 0.45);
  ctx.fillRect(screenX + s * 0.23, screenY - s * 0.15, s * 0.12, s * 0.45);

  // Weathered roof
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(screenX - s * 0.37, screenY - s * 0.18, s * 0.74, s * 0.05);

  // Roof ventilation
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(screenX - s * 0.2, screenY - s * 0.23, s * 0.1, s * 0.05);
  ctx.fillRect(screenX + s * 0.1, screenY - s * 0.23, s * 0.1, s * 0.05);

  // Large mine shaft headframe/tower
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX + s * 0.25, screenY - s * 0.65, s * 0.3, s * 0.95);

  // Headframe structural details
  ctx.strokeStyle = "#3a3a3a";
  ctx.lineWidth = 3 * zoom;

  // Vertical supports
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.28, screenY - s * 0.65);
  ctx.lineTo(screenX + s * 0.28, screenY + s * 0.3);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.52, screenY - s * 0.65);
  ctx.lineTo(screenX + s * 0.52, screenY + s * 0.3);
  ctx.stroke();

  // Cross beams
  ctx.lineWidth = 2 * zoom;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX + s * 0.28, screenY - s * 0.55 + i * s * 0.18);
    ctx.lineTo(screenX + s * 0.52, screenY - s * 0.55 + i * s * 0.18);
    ctx.stroke();
  }

  // Diagonal bracing
  ctx.strokeStyle = "#5a5a5a";
  ctx.lineWidth = 1.5 * zoom;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX + s * 0.28, screenY - s * 0.55 + i * s * 0.18);
    ctx.lineTo(screenX + s * 0.52, screenY - s * 0.55 + (i + 1) * s * 0.18);
    ctx.stroke();
  }

  // Sheave wheel housing at top
  ctx.fillStyle = "#5a5a5a";
  ctx.fillRect(screenX + s * 0.35, screenY - s * 0.7, s * 0.15, s * 0.08);

  // Large sheave wheels
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 3 * zoom;
  ctx.fillStyle = "#4a4a4a";

  ctx.beginPath();
  ctx.arc(screenX + s * 0.39, screenY - s * 0.66, s * 0.04, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(screenX + s * 0.46, screenY - s * 0.66, s * 0.04, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Spokes on wheels
  ctx.strokeStyle = "#3a3a3a";
  ctx.lineWidth = 1 * zoom;
  const wheelRotation = (Date.now() / 100) % 360;
  for (let w = 0; w < 2; w++) {
    const wheelX = screenX + s * 0.39 + w * s * 0.07;
    ctx.save();
    ctx.translate(wheelX, screenY - s * 0.66);
    ctx.rotate((wheelRotation * Math.PI) / 180);
    for (let i = 0; i < 8; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI * 2) / 8);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, s * 0.035);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }

  // Mine cage cables (animated going up/down)
  const cageTime = (Date.now() / 3000) % 1;
  const cageDirection = Math.floor((Date.now() / 3000) % 2);
  const cageY =
    cageDirection === 0
      ? screenY - s * 0.6 + cageTime * s * 0.8
      : screenY + s * 0.2 - cageTime * s * 0.8;

  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 2 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.39, screenY - s * 0.62);
  ctx.lineTo(screenX + s * 0.39, cageY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.46, screenY - s * 0.62);
  ctx.lineTo(screenX + s * 0.46, cageY);
  ctx.stroke();

  // Mine cage
  ctx.fillStyle = "#5a5a5a";
  ctx.fillRect(screenX + s * 0.36, cageY, s * 0.13, s * 0.12);

  // Cage bars
  ctx.strokeStyle = "#3a3a3a";
  ctx.lineWidth = 1 * zoom;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX + s * 0.38 + i * s * 0.03, cageY);
    ctx.lineTo(screenX + s * 0.38 + i * s * 0.03, cageY + s * 0.12);
    ctx.stroke();
  }

  // Coal chunks in cage (when descending)
  if (cageDirection === 1) {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(screenX + s * 0.38, cageY + s * 0.02, s * 0.03, s * 0.03);
    ctx.fillRect(screenX + s * 0.42, cageY + s * 0.03, s * 0.04, s * 0.04);
    ctx.fillRect(screenX + s * 0.39, cageY + s * 0.06, s * 0.03, s * 0.03);
  }

  // Control house with operator visible
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX - s * 0.3, screenY - s * 0.32, s * 0.25, s * 0.17);

  // Control house windows
  ctx.fillStyle = "#ffeb99";
  ctx.fillRect(screenX - s * 0.28, screenY - s * 0.29, s * 0.21, s * 0.11);

  // Window frame divisions
  ctx.strokeStyle = "#3a3a3a";
  ctx.lineWidth = 1 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.175, screenY - s * 0.29);
  ctx.lineTo(screenX - s * 0.175, screenY - s * 0.18);
  ctx.stroke();

  // Operator silhouette
  ctx.fillStyle = "#2a2a2a";
  ctx.beginPath();
  ctx.arc(screenX - s * 0.2, screenY - s * 0.25, s * 0.025, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(screenX - s * 0.22, screenY - s * 0.22, s * 0.04, s * 0.05);

  // Control panels with lights
  const controlGlow = Math.sin(Date.now() / 400) * 0.3 + 0.6;
  ctx.fillStyle = `rgba(255, 50, 50, ${controlGlow})`;
  ctx.fillRect(screenX - s * 0.26, screenY - s * 0.21, s * 0.02, s * 0.02);

  ctx.fillStyle = `rgba(50, 255, 50, ${controlGlow})`;
  ctx.fillRect(screenX - s * 0.23, screenY - s * 0.21, s * 0.02, s * 0.02);

  // Power lines to facility
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 4 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.55, screenY - s * 0.12);
  ctx.lineTo(screenX - s * 0.35, screenY - s * 0.08);
  ctx.stroke();

  // Power pole
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(screenX - s * 0.57, screenY - s * 0.22, s * 0.04, s * 0.15);

  // Insulators
  ctx.fillStyle = "#5a5a5a";
  ctx.beginPath();
  ctx.arc(screenX - s * 0.55, screenY - s * 0.12, s * 0.015, 0, Math.PI * 2);
  ctx.fill();

  // Warning lights on headframe
  const warningBlink = Math.floor((Date.now() / 500) % 2);
  ctx.fillStyle = warningBlink ? "#ff0000" : "#660000";
  ctx.beginPath();
  ctx.arc(screenX + s * 0.27, screenY - s * 0.68, s * 0.015, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(screenX + s * 0.54, screenY - s * 0.68, s * 0.015, 0, Math.PI * 2);
  ctx.fill();

  // Red light glow when on
  if (warningBlink) {
    ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.arc(screenX + s * 0.27, screenY - s * 0.68, s * 0.03, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(screenX + s * 0.54, screenY - s * 0.68, s * 0.03, 0, Math.PI * 2);
    ctx.fill();
  }

  // Conveyor system from mine to processing
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(screenX - s * 0.05, screenY + s * 0.18, s * 0.35, s * 0.08);

  // Conveyor belt supports
  ctx.fillStyle = "#3a3a3a";
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(screenX + i * s * 0.1, screenY + s * 0.26, s * 0.02, s * 0.08);
  }

  // Animated conveyor belt with coal
  const beltTime = (Date.now() / 120) % 1;
  ctx.fillStyle = "#1a1a1a";
  for (let i = 0; i < 6; i++) {
    const beltX =
      screenX - s * 0.03 + ((i * s * 0.06 + beltTime * s * 0.36) % (s * 0.33));
    ctx.beginPath();
    ctx.arc(beltX, screenY + s * 0.22, s * 0.015, 0, Math.PI * 2);
    ctx.fill();
  }

  // Coal chunks on belt (black chunks)
  ctx.fillStyle = "#0a0a0a";
  for (let i = 0; i < 4; i++) {
    const coalX = screenX + ((i * s * 0.08 + beltTime * s * 0.35) % (s * 0.32));
    ctx.fillRect(coalX, screenY + s * 0.19, s * 0.035, s * 0.035);

    // Coal shine/reflection
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(coalX, screenY + s * 0.19, s * 0.012, s * 0.012);
    ctx.fillStyle = "#0a0a0a";
  }

  // Coal storage bunkers
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX - s * 0.35, screenY + s * 0.08, s * 0.15, s * 0.22);
  ctx.fillRect(screenX - s * 0.17, screenY + s * 0.08, s * 0.15, s * 0.22);

  // Bunker tops with chutes
  ctx.fillStyle = "#2a2a2a";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.37, screenY + s * 0.08);
  ctx.lineTo(screenX - s * 0.275, screenY - s * 0.02);
  ctx.lineTo(screenX - s * 0.2, screenY + s * 0.08);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.19, screenY + s * 0.08);
  ctx.lineTo(screenX - s * 0.095, screenY - s * 0.02);
  ctx.lineTo(screenX - s * 0.02, screenY + s * 0.08);
  ctx.closePath();
  ctx.fill();

  // Coal visible at top of bunkers
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(screenX - s * 0.32, screenY + s * 0.1, s * 0.08, s * 0.04);
  ctx.fillRect(screenX - s * 0.14, screenY + s * 0.1, s * 0.08, s * 0.04);

  // Ventilation shaft with steam/exhaust
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(screenX + s * 0.05, screenY - s * 0.4, s * 0.12, s * 0.5);

  // Steam/exhaust coming from vent
  const steamTime = Date.now() / 1000;
  for (let i = 0; i < 4; i++) {
    const offset = (steamTime * 0.4 + i * 0.3) % 1.5;
    const opacity = Math.max(0, 0.5 - offset * 0.35);
    const steamSize = s * (0.06 + offset * 0.08);

    ctx.fillStyle = `rgba(80, 80, 80, ${opacity})`;
    ctx.beginPath();
    ctx.arc(
      screenX + s * 0.11 + Math.sin(offset * 3) * s * 0.06,
      screenY - s * 0.42 - offset * s * 0.25,
      steamSize,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Coal dust in air
  const dustTime = Date.now() / 1000;
  ctx.fillStyle = "rgba(50, 50, 50, 0.25)";
  for (let i = 0; i < 10; i++) {
    const dustX =
      screenX -
      s * 0.4 +
      (i % 5) * s * 0.2 +
      Math.sin(dustTime * 0.5 + i) * s * 0.08;
    const dustY =
      screenY -
      s * 0.3 +
      Math.floor(i / 5) * s * 0.3 +
      Math.cos(dustTime * 0.3 + i) * s * 0.08;
    ctx.beginPath();
    ctx.arc(dustX, dustY, s * 0.008, 0, Math.PI * 2);
    ctx.fill();
  }

  // Mining cart on tracks near entrance
  ctx.strokeStyle = "#5a4a3a";
  ctx.lineWidth = 2 * zoom;

  // Track rails
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.25, screenY + s * 0.32);
  ctx.lineTo(screenX + s * 0.5, screenY + s * 0.32);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.25, screenY + s * 0.36);
  ctx.lineTo(screenX + s * 0.5, screenY + s * 0.36);
  ctx.stroke();

  // Rail ties
  ctx.strokeStyle = "#4a3a2a";
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX + s * 0.27 + i * s * 0.04, screenY + s * 0.3);
    ctx.lineTo(screenX + s * 0.27 + i * s * 0.04, screenY + s * 0.38);
    ctx.stroke();
  }

  // Mining cart filled with coal
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX + s * 0.35, screenY + s * 0.26, s * 0.12, s * 0.06);

  // Coal in cart
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(screenX + s * 0.36, screenY + s * 0.24, s * 0.03, s * 0.03);
  ctx.fillRect(screenX + s * 0.4, screenY + s * 0.23, s * 0.04, s * 0.04);
  ctx.fillRect(screenX + s * 0.42, screenY + s * 0.25, s * 0.03, s * 0.03);

  // Cart wheels
  ctx.fillStyle = "#2a2a2a";
  ctx.beginPath();
  ctx.arc(screenX + s * 0.38, screenY + s * 0.32, s * 0.02, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(screenX + s * 0.44, screenY + s * 0.32, s * 0.02, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawAdvancedSteelMill(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 1;

  ctx.save();

  const s = buildingSize;

  // Massive main furnace building
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX - s * 0.5, screenY - s * 0.3, s, s * 0.7);

  // Building sections with heat weathering
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX - s * 0.5, screenY - s * 0.3, s * 0.15, s * 0.7);
  ctx.fillRect(screenX + s * 0.35, screenY - s * 0.3, s * 0.15, s * 0.7);

  // Reinforced roof structure
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(screenX - s * 0.52, screenY - s * 0.33, s * 1.04, s * 0.06);

  // Roof vents
  ctx.fillStyle = "#1a1a1a";
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(
      screenX - s * 0.35 + i * s * 0.3,
      screenY - s * 0.38,
      s * 0.12,
      s * 0.05
    );
  }

  // Giant blast furnace (cylindrical)
  const furnaceGradient = ctx.createLinearGradient(
    screenX - s * 0.2,
    0,
    screenX + s * 0.2,
    0
  );
  furnaceGradient.addColorStop(0, "#5a5a5a");
  furnaceGradient.addColorStop(0.5, "#6a6a6a");
  furnaceGradient.addColorStop(1, "#4a4a4a");

  ctx.fillStyle = furnaceGradient;
  ctx.fillRect(screenX - s * 0.2, screenY - s * 0.65, s * 0.4, s * 0.9);

  // Furnace bands/reinforcement rings
  ctx.fillStyle = "#3a3a3a";
  for (let i = 0; i < 6; i++) {
    ctx.fillRect(
      screenX - s * 0.21,
      screenY - s * 0.6 + i * s * 0.15,
      s * 0.42,
      s * 0.04
    );
  }

  // Furnace top structure
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX - s * 0.25, screenY - s * 0.7, s * 0.5, s * 0.08);

  // Charging mechanism at top
  ctx.fillStyle = "#5a5a5a";
  ctx.fillRect(screenX - s * 0.15, screenY - s * 0.78, s * 0.3, s * 0.08);

  // Hot blast stoves (two tall cylinders)
  ctx.fillStyle = "#6a5a4a";
  ctx.fillRect(screenX - s * 0.55, screenY - s * 0.5, s * 0.18, s * 0.8);
  ctx.fillRect(screenX + s * 0.37, screenY - s * 0.5, s * 0.18, s * 0.8);

  // Stove bands
  ctx.fillStyle = "#5a4a3a";
  for (let side = 0; side < 2; side++) {
    const stoveX = side === 0 ? screenX - s * 0.55 : screenX + s * 0.37;
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(
        stoveX,
        screenY - s * 0.45 + i * s * 0.16,
        s * 0.18,
        s * 0.03
      );
    }
  }

  // Stove tops (domed)
  ctx.fillStyle = "#7a6a5a";
  ctx.beginPath();
  ctx.ellipse(
    screenX - s * 0.46,
    screenY - s * 0.5,
    s * 0.09,
    s * 0.06,
    0,
    Math.PI,
    0,
    true
  );
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(
    screenX + s * 0.46,
    screenY - s * 0.5,
    s * 0.09,
    s * 0.06,
    0,
    Math.PI,
    0,
    true
  );
  ctx.fill();

  // Hot air pipes connecting stoves to furnace
  ctx.fillStyle = "#5a5a5a";
  ctx.fillRect(screenX - s * 0.37, screenY - s * 0.35, s * 0.17, s * 0.08);
  ctx.fillRect(screenX + s * 0.2, screenY - s * 0.35, s * 0.17, s * 0.08);

  // Pipe insulation bands
  ctx.strokeStyle = "#4a4a4a";
  ctx.lineWidth = 2 * zoom;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX - s * 0.37 + i * s * 0.04, screenY - s * 0.35);
    ctx.lineTo(screenX - s * 0.37 + i * s * 0.04, screenY - s * 0.27);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(screenX + s * 0.2 + i * s * 0.04, screenY - s * 0.35);
    ctx.lineTo(screenX + s * 0.2 + i * s * 0.04, screenY - s * 0.27);
    ctx.stroke();
  }

  // Tapping spout with intense glow
  const glowIntensity = Math.sin(Date.now() / 150) * 0.3 + 0.7;

  // Spout structure
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(screenX - s * 0.22, screenY + s * 0.15, s * 0.06, s * 0.08);

  // Molten steel pouring
  const pourCycle = (Date.now() / 3000) % 1;
  if (pourCycle < 0.7) {
    // Stream of molten steel
    const streamGradient = ctx.createLinearGradient(
      screenX - s * 0.19,
      screenY + s * 0.23,
      screenX - s * 0.19,
      screenY + s * 0.45
    );
    streamGradient.addColorStop(0, `rgba(255, 255, 200, ${glowIntensity})`);
    streamGradient.addColorStop(0.3, `rgba(255, 200, 100, ${glowIntensity})`);
    streamGradient.addColorStop(1, `rgba(255, 100, 0, ${glowIntensity * 0.8})`);

    ctx.fillStyle = streamGradient;
    ctx.fillRect(screenX - s * 0.21, screenY + s * 0.23, s * 0.04, s * 0.22);

    // Bright white-hot core
    ctx.fillStyle = `rgba(255, 255, 255, ${glowIntensity})`;
    ctx.fillRect(screenX - s * 0.205, screenY + s * 0.23, s * 0.02, s * 0.15);

    // Sparks and spatter
    for (let i = 0; i < 8; i++) {
      const sparkX = screenX - s * 0.19 + (Math.random() - 0.5) * s * 0.15;
      const sparkY = screenY + s * 0.35 + Math.random() * s * 0.1;
      const sparkSize = Math.random() * s * 0.01 + s * 0.005;

      ctx.fillStyle = `rgba(255, ${150 + Math.random() * 100}, 50, ${
        Math.random() * 0.8
      })`;
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, sparkSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Ladle for catching molten steel
  ctx.fillStyle = "#4a4a4a";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.28, screenY + s * 0.4);
  ctx.lineTo(screenX - s * 0.25, screenY + s * 0.45);
  ctx.lineTo(screenX - s * 0.1, screenY + s * 0.45);
  ctx.lineTo(screenX - s * 0.07, screenY + s * 0.4);
  ctx.closePath();
  ctx.fill();

  // Glowing molten steel in ladle
  if (pourCycle < 0.7) {
    const ladleGlow = ctx.createRadialGradient(
      screenX - s * 0.175,
      screenY + s * 0.425,
      0,
      screenX - s * 0.175,
      screenY + s * 0.425,
      s * 0.1
    );
    ladleGlow.addColorStop(0, `rgba(255, 255, 150, ${glowIntensity * 0.9})`);
    ladleGlow.addColorStop(0.5, `rgba(255, 150, 50, ${glowIntensity * 0.7})`);
    ladleGlow.addColorStop(1, `rgba(200, 50, 0, ${glowIntensity * 0.3})`);

    ctx.fillStyle = ladleGlow;
    ctx.fillRect(screenX - s * 0.26, screenY + s * 0.4, s * 0.17, s * 0.05);
  }

  // Crane system above
  ctx.fillStyle = "#5a5a5a";
  ctx.fillRect(screenX - s * 0.6, screenY - s * 0.85, s * 1.2, s * 0.06);

  // Crane support pillars
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX - s * 0.62, screenY - s * 0.85, s * 0.05, s * 1.15);
  ctx.fillRect(screenX + s * 0.57, screenY - s * 0.85, s * 0.05, s * 1.15);

  // Crane trolley (moves back and forth)
  const trolleyPos = Math.sin(Date.now() / 2000) * s * 0.4;
  ctx.fillStyle = "#6a6a6a";
  ctx.fillRect(
    screenX + trolleyPos - s * 0.08,
    screenY - s * 0.82,
    s * 0.16,
    s * 0.05
  );

  // Crane hook and cable
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 2 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX + trolleyPos, screenY - s * 0.77);
  ctx.lineTo(screenX + trolleyPos, screenY - s * 0.6);
  ctx.stroke();

  ctx.fillStyle = "#3a3a3a";
  ctx.beginPath();
  ctx.arc(screenX + trolleyPos, screenY - s * 0.6, s * 0.02, 0, Math.PI);
  ctx.fill();

  // Control room with heat-resistant glass
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX - s * 0.45, screenY - s * 0.15, s * 0.2, s * 0.15);

  // Control room windows (tinted)
  ctx.fillStyle = "#2a4a4a";
  ctx.fillRect(screenX - s * 0.43, screenY - s * 0.12, s * 0.16, s * 0.09);

  // Monitor glow inside control room
  const monitorGlow = Math.sin(Date.now() / 250) * 0.2 + 0.7;
  ctx.fillStyle = `rgba(50, 200, 255, ${monitorGlow * 0.4})`;
  ctx.fillRect(screenX - s * 0.4, screenY - s * 0.1, s * 0.04, s * 0.03);
  ctx.fillRect(screenX - s * 0.35, screenY - s * 0.1, s * 0.04, s * 0.03);
  ctx.fillRect(screenX - s * 0.3, screenY - s * 0.1, s * 0.04, s * 0.03);

  // Heavy power cables
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 5 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.7, screenY - s * 0.2);
  ctx.lineTo(screenX - s * 0.5, screenY - s * 0.25);
  ctx.stroke();

  // Power transformer
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX - s * 0.75, screenY - s * 0.25, s * 0.1, s * 0.15);

  // Transformer cooling fins
  ctx.strokeStyle = "#3a3a3a";
  ctx.lineWidth = 1 * zoom;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX - s * 0.75, screenY - s * 0.23 + i * s * 0.02);
    ctx.lineTo(screenX - s * 0.65, screenY - s * 0.23 + i * s * 0.02);
    ctx.stroke();
  }

  // High voltage warning
  ctx.fillStyle = "#ffeb3b";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.7, screenY - s * 0.08);
  ctx.lineTo(screenX - s * 0.74, screenY - s * 0.02);
  ctx.lineTo(screenX - s * 0.66, screenY - s * 0.02);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#000000";
  ctx.font = `bold ${s * 0.04}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("⚡", screenX - s * 0.7, screenY - s * 0.05);

  // Multiple smokestacks with heavy emissions
  for (let i = 0; i < 3; i++) {
    const stackX = screenX - s * 0.3 + i * s * 0.3;

    // Stack
    ctx.fillStyle = "#3a3a3a";
    ctx.fillRect(stackX - s * 0.06, screenY - s * 1.1, s * 0.12, s * 0.8);

    // Stack bands
    ctx.fillStyle = "#4a4a4a";
    ctx.fillRect(stackX - s * 0.06, screenY - s, s * 0.12, s * 0.04);
    ctx.fillRect(stackX - s * 0.06, screenY - s * 0.7, s * 0.12, s * 0.04);
    ctx.fillRect(stackX - s * 0.06, screenY - s * 0.4, s * 0.12, s * 0.04);

    // Stack cap
    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(stackX - s * 0.07, screenY - s * 1.15, s * 0.14, s * 0.05);

    // Heavy smoke emissions
    const time = Date.now() / 1000;
    for (let j = 0; j < 5; j++) {
      const offset = (time * 0.3 + i * 0.2 + j * 0.25) % 2;
      const opacity = Math.max(0, 0.6 - offset * 0.3);
      const smokeSize = s * (0.1 + offset * 0.12);

      if (opacity > 0.05) {
        ctx.fillStyle = `rgba(60, 60, 60, ${opacity})`;
        ctx.beginPath();
        ctx.arc(
          stackX + Math.sin((offset + i) * 2) * s * 0.15,
          screenY - s * 1.2 - offset * s * 0.4,
          smokeSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  }

  // Cooling water system
  ctx.fillStyle = "#5a6a7a";
  ctx.fillRect(screenX + s * 0.3, screenY + s * 0.3, s * 0.2, s * 0.12);

  // Water pipes
  ctx.fillStyle = "#4a5a6a";
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(
      screenX + s * 0.32 + i * s * 0.05,
      screenY + s * 0.25,
      s * 0.03,
      s * 0.05
    );
  }

  // Steam from cooling
  const steamTime = Date.now() / 1000;
  for (let i = 0; i < 3; i++) {
    const offset = (steamTime * 0.5 + i * 0.4) % 1.2;
    const opacity = Math.max(0, 0.5 - offset * 0.4);

    ctx.fillStyle = `rgba(200, 200, 220, ${opacity})`;
    ctx.beginPath();
    ctx.arc(
      screenX + s * 0.4 + i * s * 0.05 + Math.sin(offset * 4) * s * 0.05,
      screenY + s * 0.23 - offset * s * 0.2,
      s * (0.05 + offset * 0.06),
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Intense heat shimmer effect near furnace
  if (Math.random() > 0.5) {
    ctx.fillStyle = "rgba(255, 100, 0, 0.1)";
    ctx.fillRect(
      screenX - s * 0.25 + Math.random() * s * 0.5,
      screenY - s * 0.5 + Math.random() * s * 0.6,
      s * 0.1,
      s * 0.15
    );
  }

  // Ambient orange glow from intense heat
  const ambientGlow = ctx.createRadialGradient(
    screenX,
    screenY,
    0,
    screenX,
    screenY,
    s * 0.8
  );
  ambientGlow.addColorStop(0, "rgba(255, 100, 0, 0.15)");
  ambientGlow.addColorStop(1, "rgba(255, 100, 0, 0)");
  ctx.fillStyle = ambientGlow;
  ctx.fillRect(screenX - s * 0.8, screenY - s * 0.8, s * 1.6, s * 1.6);

  ctx.restore();
}

function drawCoalPowerPlant(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 0.7;

  ctx.save();

  const s = buildingSize;

  // Main turbine hall (large rectangular building)
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX - s * 0.45, screenY - s * 0.2, s * 0.9, s * 0.5);

  // Building sections
  ctx.fillStyle = "#5a5a5a";
  ctx.fillRect(screenX - s * 0.45, screenY - s * 0.2, s * 0.15, s * 0.5);

  // Roof
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX - s * 0.47, screenY - s * 0.23, s * 0.94, s * 0.05);

  // Roof vents
  ctx.fillStyle = "#2a2a2a";
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(
      screenX - s * 0.35 + i * s * 0.22,
      screenY - s * 0.28,
      s * 0.1,
      s * 0.05
    );
  }

  // Massive boiler structure (tall cylindrical section)
  const boilerGradient = ctx.createLinearGradient(
    screenX - s * 0.15,
    0,
    screenX + s * 0.15,
    0
  );
  boilerGradient.addColorStop(0, "#5a5a5a");
  boilerGradient.addColorStop(0.5, "#6a6a6a");
  boilerGradient.addColorStop(1, "#4a4a4a");

  ctx.fillStyle = boilerGradient;
  ctx.fillRect(screenX - s * 0.15, screenY - s * 0.6, s * 0.3, s * 0.8);

  // Boiler reinforcement bands
  ctx.fillStyle = "#4a4a4a";
  for (let i = 0; i < 7; i++) {
    ctx.fillRect(
      screenX - s * 0.16,
      screenY - s * 0.55 + i * s * 0.11,
      s * 0.32,
      s * 0.03
    );
  }

  // Boiler inspection doors
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX - s * 0.1, screenY - s * 0.3, s * 0.08, s * 0.12);
  ctx.fillRect(screenX + s * 0.02, screenY - s * 0.3, s * 0.08, s * 0.12);

  // Door handles
  ctx.fillStyle = "#6a6a6a";
  ctx.fillRect(screenX - s * 0.08, screenY - s * 0.25, s * 0.02, s * 0.02);
  ctx.fillRect(screenX + s * 0.04, screenY - s * 0.25, s * 0.02, s * 0.02);

  // Furnace glow at bottom of boiler
  const furnaceGlow = Math.sin(Date.now() / 200) * 0.2 + 0.8;
  const glowGradient = ctx.createRadialGradient(
    screenX,
    screenY + s * 0.15,
    0,
    screenX,
    screenY + s * 0.15,
    s * 0.2
  );
  glowGradient.addColorStop(0, `rgba(255, 150, 50, ${furnaceGlow * 0.7})`);
  glowGradient.addColorStop(0.5, `rgba(255, 100, 30, ${furnaceGlow * 0.4})`);
  glowGradient.addColorStop(1, "rgba(200, 50, 0, 0)");

  ctx.fillStyle = glowGradient;
  ctx.fillRect(screenX - s * 0.2, screenY + s * 0.05, s * 0.4, s * 0.2);

  // Furnace opening
  ctx.fillStyle = "#ff6600";
  ctx.fillRect(screenX - s * 0.12, screenY + s * 0.12, s * 0.24, s * 0.08);

  // Bright inner glow
  ctx.fillStyle = `rgba(255, 255, 150, ${furnaceGlow})`;
  ctx.fillRect(screenX - s * 0.1, screenY + s * 0.13, s * 0.2, s * 0.06);

  // FOUR massive cooling towers (iconic feature)
  const towerPositions = [
    { x: screenX - s * 0.7, y: screenY - s * 0.4 },
    { x: screenX - s * 0.5, y: screenY + s * 0.15 },
    { x: screenX + s * 0.4, y: screenY + s * 0.15 },
    { x: screenX + s * 0.6, y: screenY - s * 0.4 },
  ];

  towerPositions.forEach((tower, idx) => {
    // Tower base (wider)
    ctx.fillStyle = "#8a8a8a";
    ctx.fillRect(tower.x - s * 0.12, tower.y + s * 0.35, s * 0.24, s * 0.1);

    // Tower body (hyperboloid shape - wider at bottom and top, narrow in middle)
    ctx.fillStyle = "#9a9a9a";
    ctx.beginPath();
    ctx.moveTo(tower.x - s * 0.11, tower.y + s * 0.35);
    // Curve inward
    ctx.quadraticCurveTo(
      tower.x - s * 0.08,
      tower.y + s * 0.1,
      tower.x - s * 0.09,
      tower.y - s * 0.15
    );
    // Curve back out at top
    ctx.quadraticCurveTo(
      tower.x - s * 0.09,
      tower.y - s * 0.3,
      tower.x - s * 0.13,
      tower.y - s * 0.4
    );
    // Top edge
    ctx.lineTo(tower.x + s * 0.13, tower.y - s * 0.4);
    // Back down on right side
    ctx.quadraticCurveTo(
      tower.x + s * 0.09,
      tower.y - s * 0.3,
      tower.x + s * 0.09,
      tower.y - s * 0.15
    );
    ctx.quadraticCurveTo(
      tower.x + s * 0.08,
      tower.y + s * 0.1,
      tower.x + s * 0.11,
      tower.y + s * 0.35
    );
    ctx.closePath();
    ctx.fill();

    // Tower shading (left side darker)
    ctx.fillStyle = "#7a7a7a";
    ctx.beginPath();
    ctx.moveTo(tower.x - s * 0.11, tower.y + s * 0.35);
    ctx.quadraticCurveTo(
      tower.x - s * 0.08,
      tower.y + s * 0.1,
      tower.x - s * 0.09,
      tower.y - s * 0.15
    );
    ctx.quadraticCurveTo(
      tower.x - s * 0.09,
      tower.y - s * 0.3,
      tower.x - s * 0.13,
      tower.y - s * 0.4
    );
    ctx.lineTo(tower.x - s * 0.11, tower.y - s * 0.4);
    ctx.quadraticCurveTo(
      tower.x - s * 0.08,
      tower.y - s * 0.3,
      tower.x - s * 0.08,
      tower.y - s * 0.15
    );
    ctx.quadraticCurveTo(
      tower.x - s * 0.07,
      tower.y + s * 0.1,
      tower.x - s * 0.1,
      tower.y + s * 0.35
    );
    ctx.closePath();
    ctx.fill();

    // Horizontal bands for structure
    ctx.strokeStyle = "#6a6a6a";
    ctx.lineWidth = 2 * zoom;
    for (let i = 0; i < 6; i++) {
      const bandY = tower.y + s * 0.3 - i * s * 0.12;
      const bandWidth = s * 0.1 - Math.abs(i - 3) * s * 0.01; // Narrower in middle

      ctx.beginPath();
      ctx.moveTo(tower.x - bandWidth, bandY);
      ctx.lineTo(tower.x + bandWidth, bandY);
      ctx.stroke();
    }

    // MASSIVE steam clouds from each tower
    const time = Date.now() / 1000;
    for (let j = 0; j < 6; j++) {
      const offset = (time * 0.25 + idx * 0.15 + j * 0.2) % 2.5;
      const opacity = Math.max(0, 0.85 - offset * 0.35);
      const steamSize = s * (0.15 + offset * 0.15);

      if (opacity > 0.05) {
        // Thicker, more voluminous steam
        ctx.fillStyle = `rgba(220, 220, 230, ${opacity})`;
        ctx.beginPath();
        ctx.arc(
          tower.x + Math.sin((offset + idx + j) * 1.5) * s * 0.2,
          tower.y - s * 0.45 - offset * s * 0.5,
          steamSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  });

  // Main smokestack (tallest structure)
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX + s * 0.15, screenY - s * 1.3, s * 0.18, s * 1.5);

  // Smokestack bands
  ctx.fillStyle = "#5a5a5a";
  for (let i = 0; i < 8; i++) {
    ctx.fillRect(
      screenX + s * 0.15,
      screenY - s * 1.2 + i * s * 0.18,
      s * 0.18,
      s * 0.04
    );
  }

  // Smokestack cap
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX + s * 0.13, screenY - s * 1.35, s * 0.22, s * 0.05);

  // Aviation warning lights (blinking)
  const warningBlink = Math.floor((Date.now() / 600) % 2);
  ctx.fillStyle = warningBlink ? "#ff0000" : "#660000";
  ctx.beginPath();
  ctx.arc(screenX + s * 0.24, screenY - s * 1.33, s * 0.015, 0, Math.PI * 2);
  ctx.fill();

  if (warningBlink) {
    ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
    ctx.beginPath();
    ctx.arc(screenX + s * 0.24, screenY - s * 1.33, s * 0.03, 0, Math.PI * 2);
    ctx.fill();
  }

  // MASSIVE dark smoke from main stack
  const smokeTime = Date.now() / 1000;
  for (let i = 0; i < 8; i++) {
    const offset = (smokeTime * 0.2 + i * 0.15) % 3;
    const opacity = Math.max(0, 0.75 - offset * 0.25);
    const smokeSize = s * (0.18 + offset * 0.18);

    if (opacity > 0.05) {
      // Very dark smoke
      ctx.fillStyle = `rgba(40, 40, 40, ${opacity})`;
      ctx.beginPath();
      ctx.arc(
        screenX + s * 0.24 + Math.sin(offset * 1.8) * s * 0.25,
        screenY - s * 1.4 - offset * s * 0.6,
        smokeSize,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  // Control building
  ctx.fillStyle = "#5a5a5a";
  ctx.fillRect(screenX - s * 0.42, screenY - s * 0.38, s * 0.22, s * 0.18);

  // Control room windows
  ctx.fillStyle = "#8ac4d0";
  ctx.fillRect(screenX - s * 0.4, screenY - s * 0.35, s * 0.18, s * 0.12);

  // Window divisions
  ctx.strokeStyle = "#4a4a4a";
  ctx.lineWidth = 1 * zoom;
  for (let i = 1; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX - s * 0.4 + i * s * 0.06, screenY - s * 0.35);
    ctx.lineTo(screenX - s * 0.4 + i * s * 0.06, screenY - s * 0.23);
    ctx.stroke();
  }

  // Control panels visible inside
  const panelGlow = Math.sin(Date.now() / 300) * 0.2 + 0.7;
  ctx.fillStyle = `rgba(100, 255, 100, ${panelGlow * 0.5})`;
  ctx.fillRect(screenX - s * 0.38, screenY - s * 0.32, s * 0.04, s * 0.03);
  ctx.fillRect(screenX - s * 0.32, screenY - s * 0.32, s * 0.04, s * 0.03);
  ctx.fillRect(screenX - s * 0.26, screenY - s * 0.32, s * 0.04, s * 0.03);

  // Coal conveyor system
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX - s * 0.38, screenY + s * 0.22, s * 0.4, s * 0.08);

  // Conveyor supports
  ctx.fillStyle = "#4a4a4a";
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(
      screenX - s * 0.36 + i * s * 0.08,
      screenY + s * 0.3,
      s * 0.02,
      s * 0.06
    );
  }

  // Animated coal on conveyor
  const conveyorTime = (Date.now() / 150) % 1;
  ctx.fillStyle = "#0a0a0a";
  for (let i = 0; i < 6; i++) {
    const coalX =
      screenX -
      s * 0.36 +
      ((i * s * 0.07 + conveyorTime * s * 0.4) % (s * 0.38));
    ctx.fillRect(coalX, screenY + s * 0.23, s * 0.03, s * 0.03);
  }

  // Coal pile/bunker
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.42, screenY + s * 0.36);
  ctx.lineTo(screenX - s * 0.38, screenY + s * 0.28);
  ctx.lineTo(screenX - s * 0.3, screenY + s * 0.28);
  ctx.lineTo(screenX - s * 0.28, screenY + s * 0.36);
  ctx.closePath();
  ctx.fill();

  // Coal texture
  ctx.fillStyle = "#0a0a0a";
  for (let i = 0; i < 8; i++) {
    ctx.fillRect(
      screenX - s * 0.4 + Math.random() * s * 0.1,
      screenY + s * 0.29 + Math.random() * s * 0.06,
      s * 0.015,
      s * 0.015
    );
  }

  // Transformer yard
  ctx.fillStyle = "#4a5a6a";
  ctx.fillRect(screenX + s * 0.38, screenY + s * 0.25, s * 0.15, s * 0.12);

  // Transformers
  ctx.fillStyle = "#5a6a7a";
  for (let i = 0; i < 2; i++) {
    ctx.fillRect(
      screenX + s * 0.4 + i * s * 0.07,
      screenY + s * 0.26,
      s * 0.05,
      s * 0.1
    );
  }

  // High voltage insulators
  ctx.fillStyle = "#8a8a8a";
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(
      screenX + s * 0.42 + i * s * 0.05,
      screenY + s * 0.24,
      s * 0.01,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Power lines leaving plant
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 3 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.5, screenY + s * 0.24);
  ctx.lineTo(screenX + s * 0.7, screenY + s * 0.2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.5, screenY + s * 0.27);
  ctx.lineTo(screenX + s * 0.7, screenY + s * 0.23);
  ctx.stroke();

  // Electrical discharge effects (sparks)
  if (Math.random() > 0.85) {
    ctx.strokeStyle = `rgba(150, 200, 255, ${Math.random() * 0.8 + 0.2})`;
    ctx.lineWidth = 2 * zoom;
    ctx.beginPath();
    ctx.moveTo(screenX + s * 0.42, screenY + s * 0.24);
    ctx.lineTo(
      screenX + s * 0.42 + (Math.random() - 0.5) * s * 0.03,
      screenY + s * 0.24 - Math.random() * s * 0.03
    );
    ctx.stroke();
  }

  // Heat shimmer from furnace
  if (Math.random() > 0.6) {
    ctx.fillStyle = "rgba(255, 150, 50, 0.1)";
    ctx.fillRect(
      screenX - s * 0.2 + Math.random() * s * 0.4,
      screenY - s * 0.2 + Math.random() * s * 0.3,
      s * 0.08,
      s * 0.12
    );
  }

  // Ambient industrial lighting
  ctx.fillStyle = "rgba(255, 200, 100, 0.1)";
  ctx.fillRect(screenX - s * 0.5, screenY - s * 0.3, s * 0.3, s * 0.5);

  ctx.restore();
}

function drawAdvancedHub(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 1;

  ctx.save();

  const s = buildingSize;

  // Massive warehouse base
  ctx.fillStyle = "#6a7a8a";
  ctx.fillRect(screenX - s * 0.55, screenY - s * 0.15, s * 1.1, s * 0.55);

  // Building depth/shading
  ctx.fillStyle = "#5a6a7a";
  ctx.fillRect(screenX - s * 0.55, screenY - s * 0.15, s * 0.12, s * 0.55);
  ctx.fillRect(screenX + s * 0.43, screenY - s * 0.15, s * 0.12, s * 0.55);

  // Reinforced industrial roof
  ctx.fillStyle = "#4a5a6a";
  ctx.fillRect(screenX - s * 0.57, screenY - s * 0.18, s * 1.14, s * 0.06);

  // Roof support beams
  ctx.fillStyle = "#3a4a5a";
  for (let i = 0; i < 6; i++) {
    ctx.fillRect(
      screenX - s * 0.5 + i * s * 0.2,
      screenY - s * 0.21,
      s * 0.04,
      s * 0.03
    );
  }

  // Skylights on roof
  ctx.fillStyle = "rgba(135, 206, 235, 0.4)";
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(
      screenX - s * 0.45 + i * s * 0.25,
      screenY - s * 0.165,
      s * 0.15,
      s * 0.03
    );
  }

  // Central tower/office section (elevated)
  ctx.fillStyle = "#7a8a9a";
  ctx.fillRect(screenX - s * 0.25, screenY - s * 0.45, s * 0.5, s * 0.3);

  // Tower windows (multiple floors)
  ctx.fillStyle = "#d4e4f4";

  // Floor 1
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(
      screenX - s * 0.22 + i * s * 0.11,
      screenY - s * 0.42,
      s * 0.08,
      s * 0.08
    );
  }

  // Floor 2
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(
      screenX - s * 0.22 + i * s * 0.11,
      screenY - s * 0.32,
      s * 0.08,
      s * 0.08
    );
  }

  // Floor 3
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(
      screenX - s * 0.22 + i * s * 0.11,
      screenY - s * 0.22,
      s * 0.08,
      s * 0.08
    );
  }

  // Window frames
  ctx.strokeStyle = "#5a6a7a";
  ctx.lineWidth = 1 * zoom;
  for (let floor = 0; floor < 3; floor++) {
    for (let i = 0; i < 4; i++) {
      ctx.strokeRect(
        screenX - s * 0.22 + i * s * 0.11,
        screenY - s * 0.42 + floor * s * 0.1,
        s * 0.08,
        s * 0.08
      );
    }
  }

  // Tower roof (flat modern style)
  ctx.fillStyle = "#3a4a5a";
  ctx.fillRect(screenX - s * 0.27, screenY - s * 0.48, s * 0.54, s * 0.05);

  // Rooftop communications equipment
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX - s * 0.15, screenY - s * 0.55, s * 0.04, s * 0.07);
  ctx.fillRect(screenX + s * 0.11, screenY - s * 0.55, s * 0.04, s * 0.07);

  // Antenna on roof
  ctx.strokeStyle = "#3a3a3a";
  ctx.lineWidth = 2 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX, screenY - s * 0.55);
  ctx.lineTo(screenX, screenY - s * 0.68);
  ctx.stroke();

  // Antenna light (blinking)
  const antennaLight = Math.floor((Date.now() / 800) % 2);
  ctx.fillStyle = antennaLight ? "#ff0000" : "#660000";
  ctx.beginPath();
  ctx.arc(screenX, screenY - s * 0.69, s * 0.012, 0, Math.PI * 2);
  ctx.fill();

  if (antennaLight) {
    ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
    ctx.beginPath();
    ctx.arc(screenX, screenY - s * 0.69, s * 0.025, 0, Math.PI * 2);
    ctx.fill();
  }

  // Company logo/emblem on tower
  ctx.fillStyle = "#2a5a8a";
  ctx.beginPath();
  ctx.arc(screenX, screenY - s * 0.35, s * 0.06, 0, Math.PI * 2);
  ctx.fill();

  // Golden star in logo
  ctx.fillStyle = "#ffd700";
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = ((Math.PI * 2) / 5) * i - Math.PI / 2;
    const x = screenX + Math.cos(angle) * s * 0.04;
    const y = screenY - s * 0.35 + Math.sin(angle) * s * 0.04;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();

  // Multiple loading docks with rollup doors
  ctx.fillStyle = "#5a6a7a";

  // Left side docks
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(
      screenX - s * 0.5 + i * s * 0.15,
      screenY - s * 0.08,
      s * 0.12,
      s * 0.18
    );
  }

  // Right side docks
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(
      screenX + s * 0.08 + i * s * 0.15,
      screenY - s * 0.08,
      s * 0.12,
      s * 0.18
    );
  }

  // Dock door details (horizontal slats)
  ctx.strokeStyle = "#4a5a6a";
  ctx.lineWidth = 1 * zoom;
  for (let dock = 0; dock < 3; dock++) {
    // Left docks
    for (let slat = 0; slat < 8; slat++) {
      ctx.beginPath();
      ctx.moveTo(
        screenX - s * 0.5 + dock * s * 0.15,
        screenY - s * 0.06 + slat * s * 0.02
      );
      ctx.lineTo(
        screenX - s * 0.38 + dock * s * 0.15,
        screenY - s * 0.06 + slat * s * 0.02
      );
      ctx.stroke();
    }

    // Right docks
    for (let slat = 0; slat < 8; slat++) {
      ctx.beginPath();
      ctx.moveTo(
        screenX + s * 0.08 + dock * s * 0.15,
        screenY - s * 0.06 + slat * s * 0.02
      );
      ctx.lineTo(
        screenX + s * 0.2 + dock * s * 0.15,
        screenY - s * 0.06 + slat * s * 0.02
      );
      ctx.stroke();
    }
  }

  // Loading platforms
  ctx.fillStyle = "#8a8a8a";
  ctx.fillRect(screenX - s * 0.52, screenY + s * 0.1, s * 0.5, s * 0.05);
  ctx.fillRect(screenX + s * 0.02, screenY + s * 0.1, s * 0.5, s * 0.05);

  // Platform edge
  ctx.fillStyle = "#6a6a6a";
  ctx.fillRect(screenX - s * 0.52, screenY + s * 0.1, s * 0.5, s * 0.01);
  ctx.fillRect(screenX + s * 0.02, screenY + s * 0.1, s * 0.5, s * 0.01);

  // Animated delivery trucks at docks
  const truckTime = (Date.now() / 4000) % 1;
  const truckDock = Math.floor((Date.now() / 4000) % 6);

  if (truckTime < 0.8) {
    // Truck present 80% of cycle
    const truckX =
      truckDock < 3
        ? screenX - s * 0.44 + truckDock * s * 0.15
        : screenX + s * 0.14 + (truckDock - 3) * s * 0.15;
    const truckY = screenY + s * 0.2;

    // Truck body
    ctx.fillStyle = "#3a7a3a";
    ctx.fillRect(truckX - s * 0.06, truckY, s * 0.12, s * 0.08);

    // Truck cab
    ctx.fillStyle = "#2a6a2a";
    ctx.fillRect(truckX - s * 0.065, truckY + s * 0.08, s * 0.05, s * 0.05);

    // Wheels
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.arc(truckX - s * 0.04, truckY + s * 0.13, s * 0.015, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(truckX + s * 0.04, truckY + s * 0.13, s * 0.015, 0, Math.PI * 2);
    ctx.fill();
  }

  // Storage silos/tanks at corners
  ctx.fillStyle = "#7a8a9a";

  // Left silos
  ctx.fillRect(screenX - s * 0.58, screenY - s * 0.05, s * 0.1, s * 0.25);
  ctx.fillRect(screenX - s * 0.58, screenY + s * 0.22, s * 0.1, s * 0.18);

  // Right silos
  ctx.fillRect(screenX + s * 0.48, screenY - s * 0.05, s * 0.1, s * 0.25);
  ctx.fillRect(screenX + s * 0.48, screenY + s * 0.22, s * 0.1, s * 0.18);

  // Silo tops (conical)
  ctx.fillStyle = "#6a7a8a";

  // Left
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.6, screenY - s * 0.05);
  ctx.lineTo(screenX - s * 0.53, screenY - s * 0.12);
  ctx.lineTo(screenX - s * 0.48, screenY - s * 0.05);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.6, screenY + s * 0.22);
  ctx.lineTo(screenX - s * 0.53, screenY + s * 0.15);
  ctx.lineTo(screenX - s * 0.48, screenY + s * 0.22);
  ctx.closePath();
  ctx.fill();

  // Right
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.48, screenY - s * 0.05);
  ctx.lineTo(screenX + s * 0.53, screenY - s * 0.12);
  ctx.lineTo(screenX + s * 0.58, screenY - s * 0.05);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.48, screenY + s * 0.22);
  ctx.lineTo(screenX + s * 0.53, screenY + s * 0.15);
  ctx.lineTo(screenX + s * 0.58, screenY + s * 0.22);
  ctx.closePath();
  ctx.fill();

  // Silo fill levels (different resources)
  const fillHeight1 = s * 0.15;
  const fillHeight2 = s * 0.12;

  // Ore (gray)
  ctx.fillStyle = "#8a8a8a";
  ctx.fillRect(
    screenX - s * 0.58,
    screenY + s * 0.2 - fillHeight1,
    s * 0.1,
    fillHeight1
  );

  // Coal (black)
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(
    screenX - s * 0.58,
    screenY + s * 0.4 - fillHeight2,
    s * 0.1,
    fillHeight2
  );

  // Iron (brown)
  ctx.fillStyle = "#8a6a4a";
  ctx.fillRect(
    screenX + s * 0.48,
    screenY + s * 0.2 - fillHeight1,
    s * 0.1,
    fillHeight1
  );

  // Steel (silver)
  ctx.fillStyle = "#b0b0b0";
  ctx.fillRect(
    screenX + s * 0.48,
    screenY + s * 0.4 - fillHeight2,
    s * 0.1,
    fillHeight2
  );

  // Security fence
  ctx.strokeStyle = "#5a5a5a";
  ctx.lineWidth = 2 * zoom;

  // Fence posts
  for (let i = 0; i < 8; i++) {
    const postX = screenX - s * 0.6 + i * s * 0.17;
    ctx.beginPath();
    ctx.moveTo(postX, screenY + s * 0.42);
    ctx.lineTo(postX, screenY + s * 0.48);
    ctx.stroke();
  }

  // Horizontal fence wires
  ctx.lineWidth = 1 * zoom;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX - s * 0.6, screenY + s * 0.43 + i * s * 0.015);
    ctx.lineTo(screenX + s * 0.6, screenY + s * 0.43 + i * s * 0.015);
    ctx.stroke();
  }

  // Security gate (center)
  ctx.fillStyle = "#6a6a6a";
  ctx.fillRect(screenX - s * 0.08, screenY + s * 0.42, s * 0.16, s * 0.06);

  // Gate bars
  ctx.strokeStyle = "#5a5a5a";
  ctx.lineWidth = 2 * zoom;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX - s * 0.06 + i * s * 0.03, screenY + s * 0.42);
    ctx.lineTo(screenX - s * 0.06 + i * s * 0.03, screenY + s * 0.48);
    ctx.stroke();
  }

  // Floodlights
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(screenX - s * 0.55, screenY - s * 0.22, s * 0.04, s * 0.08);
  ctx.fillRect(screenX + s * 0.51, screenY - s * 0.22, s * 0.04, s * 0.08);

  // Light beams (at night/dusk effect)
  const lightPulse = Math.sin(Date.now() / 500) * 0.15 + 0.5;

  const leftBeam = ctx.createRadialGradient(
    screenX - s * 0.53,
    screenY - s * 0.14,
    0,
    screenX - s * 0.53,
    screenY - s * 0.14,
    s * 0.3
  );
  leftBeam.addColorStop(0, `rgba(255, 255, 200, ${lightPulse * 0.3})`);
  leftBeam.addColorStop(1, "rgba(255, 255, 200, 0)");
  ctx.fillStyle = leftBeam;
  ctx.fillRect(screenX - s * 0.7, screenY - s * 0.3, s * 0.4, s * 0.4);

  const rightBeam = ctx.createRadialGradient(
    screenX + s * 0.53,
    screenY - s * 0.14,
    0,
    screenX + s * 0.53,
    screenY - s * 0.14,
    s * 0.3
  );
  rightBeam.addColorStop(0, `rgba(255, 255, 200, ${lightPulse * 0.3})`);
  rightBeam.addColorStop(1, "rgba(255, 255, 200, 0)");
  ctx.fillStyle = rightBeam;
  ctx.fillRect(screenX + s * 0.3, screenY - s * 0.3, s * 0.4, s * 0.4);

  // Parking lot markings
  ctx.strokeStyle = "#d4d4d4";
  ctx.lineWidth = 1 * zoom;
  for (let i = 0; i < 4; i++) {
    // Dashed lines
    for (let j = 0; j < 3; j++) {
      ctx.beginPath();
      ctx.moveTo(
        screenX - s * 0.3 + i * s * 0.2,
        screenY + s * 0.32 + j * s * 0.03
      );
      ctx.lineTo(
        screenX - s * 0.3 + i * s * 0.2,
        screenY + s * 0.34 + j * s * 0.03
      );
      ctx.stroke();
    }
  }

  // Activity indicators (loading in progress)
  const activityGlow = Math.sin(Date.now() / 400) * 0.3 + 0.6;
  ctx.fillStyle = `rgba(50, 255, 50, ${activityGlow * 0.6})`;
  ctx.beginPath();
  ctx.arc(screenX - s * 0.24, screenY - s * 0.46, s * 0.015, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawNuclearReactor(ctx, col, row, camera, size, zoom) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const buildingSize = size * 1;

  ctx.save();

  const s = buildingSize;

  // Massive containment dome (the iconic feature)
  const domeGradient = ctx.createRadialGradient(
    screenX,
    screenY - s * 0.3,
    0,
    screenX,
    screenY - s * 0.3,
    s * 0.45
  );
  domeGradient.addColorStop(0, "#d4d4d4");
  domeGradient.addColorStop(0.5, "#c4c4c4");
  domeGradient.addColorStop(1, "#a4a4a4");

  ctx.fillStyle = domeGradient;
  ctx.beginPath();
  ctx.arc(screenX, screenY - s * 0.05, s * 0.45, Math.PI, 0, true);
  ctx.closePath();
  ctx.fill();

  // Dome shading (left side darker)
  ctx.fillStyle = "rgba(100, 100, 100, 0.2)";
  ctx.beginPath();
  ctx.arc(screenX, screenY - s * 0.05, s * 0.45, Math.PI, 0, true);
  ctx.closePath();
  ctx.clip();
  ctx.fillRect(screenX - s * 0.45, screenY - s * 0.5, s * 0.3, s * 0.5);
  ctx.restore();
  ctx.save();

  // Dome highlight (right side)
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.beginPath();
  ctx.arc(screenX, screenY - s * 0.05, s * 0.45, Math.PI, 0, true);
  ctx.closePath();
  ctx.clip();
  ctx.fillRect(screenX + s * 0.15, screenY - s * 0.5, s * 0.3, s * 0.5);
  ctx.restore();
  ctx.save();

  // Dome base ring
  ctx.fillStyle = "#b4b4b4";
  ctx.fillRect(screenX - s * 0.47, screenY - s * 0.05, s * 0.94, s * 0.08);

  // Dome reinforcement rings
  ctx.strokeStyle = "#a4a4a4";
  ctx.lineWidth = 3 * zoom;
  for (let i = 1; i <= 4; i++) {
    ctx.beginPath();
    ctx.arc(
      screenX,
      screenY - s * 0.05,
      s * 0.45 - i * s * 0.08,
      Math.PI,
      0,
      true
    );
    ctx.stroke();
  }

  // Reactor building base
  ctx.fillStyle = "#8a8a8a";
  ctx.fillRect(screenX - s * 0.5, screenY - s * 0.05, s, s * 0.35);

  // Building sections
  ctx.fillStyle = "#9a9a9a";
  ctx.fillRect(screenX - s * 0.5, screenY - s * 0.05, s * 0.15, s * 0.35);
  ctx.fillRect(screenX + s * 0.35, screenY - s * 0.05, s * 0.15, s * 0.35);

  // Turbine hall (adjacent building)
  ctx.fillStyle = "#7a7a7a";
  ctx.fillRect(screenX - s * 0.7, screenY + s * 0.05, s * 0.4, s * 0.25);

  // Turbine hall roof
  ctx.fillStyle = "#6a6a6a";
  ctx.fillRect(screenX - s * 0.72, screenY + s * 0.03, s * 0.44, s * 0.04);

  // Control building (separate structure)
  ctx.fillStyle = "#8a8a9a";
  ctx.fillRect(screenX + s * 0.45, screenY + s * 0.1, s * 0.3, s * 0.2);

  // Control building windows
  ctx.fillStyle = "#6a9ab4";
  for (let floor = 0; floor < 2; floor++) {
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(
        screenX + s * 0.48 + i * s * 0.08,
        screenY + s * 0.13 + floor * s * 0.09,
        s * 0.06,
        s * 0.06
      );
    }
  }

  // Window frames
  ctx.strokeStyle = "#5a5a6a";
  ctx.lineWidth = 1 * zoom;
  for (let floor = 0; floor < 2; floor++) {
    for (let i = 0; i < 3; i++) {
      ctx.strokeRect(
        screenX + s * 0.48 + i * s * 0.08,
        screenY + s * 0.13 + floor * s * 0.09,
        s * 0.06,
        s * 0.06
      );
    }
  }

  // Main reactor entrance
  ctx.fillStyle = "#5a5a5a";
  ctx.fillRect(screenX - s * 0.15, screenY + s * 0.15, s * 0.3, s * 0.15);

  // Security door (heavy blast door)
  ctx.fillStyle = "#4a4a4a";
  ctx.fillRect(screenX - s * 0.12, screenY + s * 0.17, s * 0.24, s * 0.11);

  // Door reinforcement
  ctx.strokeStyle = "#3a3a3a";
  ctx.lineWidth = 2 * zoom;
  ctx.strokeRect(screenX - s * 0.12, screenY + s * 0.17, s * 0.24, s * 0.11);
  ctx.strokeRect(screenX - s * 0.1, screenY + s * 0.19, s * 0.2, s * 0.07);

  // Cooling towers (two smaller ones beside main dome)
  const towerPositions = [
    { x: screenX - s * 0.65, y: screenY - s * 0.15 },
    { x: screenX + s * 0.65, y: screenY - s * 0.15 },
  ];

  towerPositions.forEach((tower, idx) => {
    // Tower body (hyperboloid)
    ctx.fillStyle = "#b4b4b4";
    ctx.beginPath();
    ctx.moveTo(tower.x - s * 0.1, tower.y + s * 0.35);
    ctx.quadraticCurveTo(
      tower.x - s * 0.07,
      tower.y + s * 0.15,
      tower.x - s * 0.08,
      tower.y
    );
    ctx.quadraticCurveTo(
      tower.x - s * 0.08,
      tower.y - s * 0.15,
      tower.x - s * 0.12,
      tower.y - s * 0.25
    );
    ctx.lineTo(tower.x + s * 0.12, tower.y - s * 0.25);
    ctx.quadraticCurveTo(
      tower.x + s * 0.08,
      tower.y - s * 0.15,
      tower.x + s * 0.08,
      tower.y
    );
    ctx.quadraticCurveTo(
      tower.x + s * 0.07,
      tower.y + s * 0.15,
      tower.x + s * 0.1,
      tower.y + s * 0.35
    );
    ctx.closePath();
    ctx.fill();

    // Tower shading
    ctx.fillStyle = "#9a9a9a";
    ctx.beginPath();
    ctx.moveTo(tower.x - s * 0.1, tower.y + s * 0.35);
    ctx.quadraticCurveTo(
      tower.x - s * 0.07,
      tower.y + s * 0.15,
      tower.x - s * 0.08,
      tower.y
    );
    ctx.quadraticCurveTo(
      tower.x - s * 0.08,
      tower.y - s * 0.15,
      tower.x - s * 0.12,
      tower.y - s * 0.25
    );
    ctx.lineTo(tower.x - s * 0.1, tower.y - s * 0.25);
    ctx.quadraticCurveTo(
      tower.x - s * 0.07,
      tower.y - s * 0.15,
      tower.x - s * 0.07,
      tower.y
    );
    ctx.quadraticCurveTo(
      tower.x - s * 0.06,
      tower.y + s * 0.15,
      tower.x - s * 0.09,
      tower.y + s * 0.35
    );
    ctx.closePath();
    ctx.fill();

    // Steam from cooling tower
    const time = Date.now() / 1000;
    for (let j = 0; j < 5; j++) {
      const offset = (time * 0.3 + idx * 0.2 + j * 0.25) % 2;
      const opacity = Math.max(0, 0.7 - offset * 0.35);
      const steamSize = s * (0.12 + offset * 0.12);

      if (opacity > 0.05) {
        ctx.fillStyle = `rgba(230, 230, 240, ${opacity})`;
        ctx.beginPath();
        ctx.arc(
          tower.x + Math.sin((offset + idx + j) * 1.8) * s * 0.15,
          tower.y - s * 0.3 - offset * s * 0.4,
          steamSize,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  });

  // Radioactive warning symbols
  ctx.fillStyle = "#ffeb3b";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2 * zoom;

  // Left warning sign
  ctx.beginPath();
  ctx.arc(screenX - s * 0.4, screenY + s * 0.05, s * 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Radiation symbol
  ctx.fillStyle = "#000000";
  for (let i = 0; i < 3; i++) {
    ctx.save();
    ctx.translate(screenX - s * 0.4, screenY + s * 0.05);
    ctx.rotate((i * Math.PI * 2) / 3);
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.01);
    ctx.lineTo(-s * 0.015, -s * 0.04);
    ctx.lineTo(s * 0.015, -s * 0.04);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Center circle
  ctx.beginPath();
  ctx.arc(screenX - s * 0.4, screenY + s * 0.05, s * 0.01, 0, Math.PI * 2);
  ctx.fill();

  // Right warning sign
  ctx.fillStyle = "#ffeb3b";
  ctx.beginPath();
  ctx.arc(screenX + s * 0.4, screenY + s * 0.05, s * 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#000000";
  for (let i = 0; i < 3; i++) {
    ctx.save();
    ctx.translate(screenX + s * 0.4, screenY + s * 0.05);
    ctx.rotate((i * Math.PI * 2) / 3);
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.01);
    ctx.lineTo(-s * 0.015, -s * 0.04);
    ctx.lineTo(s * 0.015, -s * 0.04);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(screenX + s * 0.4, screenY + s * 0.05, s * 0.01, 0, Math.PI * 2);
  ctx.fill();

  // Perimeter security fence
  ctx.strokeStyle = "#4a4a4a";
  ctx.lineWidth = 2 * zoom;

  for (let i = 0; i < 10; i++) {
    const postX = screenX - s * 0.75 + i * s * 0.17;
    ctx.beginPath();
    ctx.moveTo(postX, screenY + s * 0.35);
    ctx.lineTo(postX, screenY + s * 0.42);
    ctx.stroke();
  }

  // Barbed wire effect
  ctx.strokeStyle = "#3a3a3a";
  ctx.lineWidth = 1 * zoom;
  ctx.beginPath();
  ctx.moveTo(screenX - s * 0.75, screenY + s * 0.35);
  ctx.lineTo(screenX + s * 0.75, screenY + s * 0.35);
  ctx.stroke();

  // Spent fuel pool building
  ctx.fillStyle = "#6a7a8a";
  ctx.fillRect(screenX - s * 0.28, screenY + s * 0.08, s * 0.2, s * 0.22);

  // Pool access hatch
  ctx.fillStyle = "#5a6a7a";
  ctx.fillRect(screenX - s * 0.23, screenY + s * 0.12, s * 0.1, s * 0.08);

  // Emergency cooling system pipes
  ctx.fillStyle = "#5a6a7a";
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(
      screenX - s * 0.48 + i * s * 0.08,
      screenY - s * 0.02,
      s * 0.06,
      s * 0.35
    );
  }

  // Pipe connectors
  ctx.fillStyle = "#4a5a6a";
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(
      screenX - s * 0.49 + i * s * 0.08,
      screenY + s * 0.08,
      s * 0.08,
      s * 0.04
    );
    ctx.fillRect(
      screenX - s * 0.49 + i * s * 0.08,
      screenY + s * 0.18,
      s * 0.08,
      s * 0.04
    );
  }

  // Power transmission lines
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 4 * zoom;

  // Multiple lines leaving the plant
  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.5, screenY + s * 0.08);
  ctx.lineTo(screenX + s * 0.8, screenY + s * 0.05);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.5, screenY + s * 0.12);
  ctx.lineTo(screenX + s * 0.8, screenY + s * 0.09);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screenX + s * 0.5, screenY + s * 0.16);
  ctx.lineTo(screenX + s * 0.8, screenY + s * 0.13);
  ctx.stroke();

  // Power substation
  ctx.fillStyle = "#5a5a6a";
  ctx.fillRect(screenX + s * 0.5, screenY + s * 0.2, s * 0.2, s * 0.1);

  // Transformers in substation
  ctx.fillStyle = "#6a6a7a";
  ctx.fillRect(screenX + s * 0.52, screenY + s * 0.21, s * 0.06, s * 0.08);
  ctx.fillRect(screenX + s * 0.6, screenY + s * 0.21, s * 0.06, s * 0.08);

  // Emergency lights (blinking)
  const emergencyBlink = Math.floor((Date.now() / 500) % 2);
  ctx.fillStyle = emergencyBlink ? "#00ff00" : "#004400";

  // Status lights on dome
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(
      screenX - s * 0.3 + i * s * 0.2,
      screenY - s * 0.42,
      s * 0.012,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Pulsing blue Cherenkov glow effect from reactor core
  const glowPulse = Math.sin(Date.now() / 800) * 0.2 + 0.5;
  const cherenkovGlow = ctx.createRadialGradient(
    screenX,
    screenY,
    0,
    screenX,
    screenY,
    s * 0.6
  );
  cherenkovGlow.addColorStop(0, `rgba(100, 150, 255, ${glowPulse * 0.3})`);
  cherenkovGlow.addColorStop(0.5, `rgba(100, 150, 255, ${glowPulse * 0.15})`);
  cherenkovGlow.addColorStop(1, "rgba(100, 150, 255, 0)");

  ctx.fillStyle = cherenkovGlow;
  ctx.fillRect(screenX - s * 0.6, screenY - s * 0.6, s * 1.2, s * 1.2);

  // Ventilation system on dome
  ctx.fillStyle = "#9a9a9a";
  ctx.fillRect(screenX - s * 0.08, screenY - s * 0.48, s * 0.16, s * 0.04);

  // Vent grilles
  ctx.strokeStyle = "#7a7a7a";
  ctx.lineWidth = 1 * zoom;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(screenX - s * 0.06 + i * s * 0.025, screenY - s * 0.48);
    ctx.lineTo(screenX - s * 0.06 + i * s * 0.025, screenY - s * 0.44);
    ctx.stroke();
  }

  // Helipad on top of control building
  ctx.strokeStyle = "#ffeb3b";
  ctx.lineWidth = 2 * zoom;
  ctx.beginPath();
  ctx.arc(screenX + s * 0.6, screenY + s * 0.08, s * 0.08, 0, Math.PI * 2);
  ctx.stroke();

  // "H" marking
  ctx.fillStyle = "#ffeb3b";
  ctx.font = `bold ${s * 0.08}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("H", screenX + s * 0.6, screenY + s * 0.08);

  ctx.restore();
}
