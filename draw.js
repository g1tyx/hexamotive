import {
  hexToPixel,
  pixelToHex,
  getHexVertices,
  getNeighbor,
} from "./hexUtils.js";

import {
  BUILDING_DRAW_FUNCTIONS,
  drawDefaultBuilding,
  getBuildingType,
} from "./buildingTypes.js";

import {
  drawForestTerrain,
  drawWaterTerrain,
  drawMountainTerrain,
  drawSandTerrain,
  drawGrassTerrain,
} from "./tileDrawing/forest.js";

import { formatNumber } from "./utilities/numberFormatting.js";

import { TRAIN_DRAW_FUNCTIONS } from "./railwayTypes.js";

// Terrain stamp cache - stores pre-rendered hex canvases

function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// Create a reusable hex path
function createHexPath(size) {
  const path = new Path2D();
  const angles = [0, 60, 120, 180, 240, 300];

  for (let i = 0; i < 6; i++) {
    const angleRad = (Math.PI / 180) * angles[i];
    const x = size * Math.cos(angleRad);
    const y = size * Math.sin(angleRad);

    if (i === 0) {
      path.moveTo(x, y);
    } else {
      path.lineTo(x, y);
    }
  }
  path.closePath();
  return path;
}

function getTerrainStamp(terrain, size, zoom, terrainStamps) {
  const key = `${terrain.name}_${Math.round(size * 10)}`; // Round size to reduce cache variations

  if (terrainStamps[key]) {
    return terrainStamps[key];
  }

  // Create a canvas to hold the pre-rendered hex
  const stampSize = Math.ceil(size * 2.5); // Extra space for any effects
  const canvas = document.createElement("canvas");
  canvas.width = stampSize;
  canvas.height = stampSize;
  const ctx = canvas.getContext("2d");

  // Center the hex in the stamp canvas
  const centerX = stampSize / 2;
  const centerY = stampSize / 2;

  ctx.save();
  ctx.translate(centerX, centerY);

  // Draw the fancy hex here - for now just basic, but you can add textures/gradients
  const hexPath = createHexPath(size);

  if (terrain.name === "Forest") {
    drawForestTerrain(ctx, size, terrain, zoom);
  } else if (terrain.name == "Water") {
    drawWaterTerrain(ctx, size, terrain, zoom);
  } else if (terrain.name == "Mountain") {
    drawMountainTerrain(ctx, size, terrain, zoom);
  } else if (terrain.name == "Sand") {
    drawSandTerrain(ctx, size, terrain, zoom);
  } else if (terrain.name == "Grass") {
    drawGrassTerrain(ctx, size, terrain, zoom);
  } else {
    // Original basic rendering for other terrains
    ctx.fillStyle = terrain.color;
    ctx.fill(hexPath);

    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1 * zoom;
    ctx.stroke(hexPath);
  }

  ctx.restore();

  // console.log({newTerranStamp:key})
  terrainStamps[key] = canvas;
  return canvas;
}

/**
 * Clear the terrain stamp cache (call when zoom changes significantly or terrain regenerates)
 */
export function clearTerrainStamps() {
  for (let key in terrainStamps) {
    delete terrainStamps[key];
  }
}

// Batch draw hexes using pre-rendered stamps
function drawHexBatch(
  ctx,
  hexes,
  terrain,
  size,
  zoom,
  showLabels,
  canPlaceHere,
  terrainStamps
) {
  if (hexes.length === 0) return;

  // Get the pre-rendered stamp for this terrain
  const stamp = getTerrainStamp(terrain, size, zoom, terrainStamps);
  const stampHalfSize = stamp.width / 2;

  // Draw all hexes using the stamp - this is FAST!
  hexes.forEach(({ screenX, screenY }) => {
    ctx.drawImage(stamp, screenX - stampHalfSize, screenY - stampHalfSize);
  });

  // Draw green outline for valid placement only - with smaller inset hex
  if (canPlaceHere === true && showLabels) {
    const insetSize = size * 0.92; // 8% smaller to stay inside the border
    const insetHexPath = createHexPath(insetSize);

    // Use darker green on light terrains, brighter green on dark terrains
    const isLightTerrain = terrain.name === "Grass" || terrain.name === "Sand";
    ctx.lineWidth = 2 * zoom;
    ctx.strokeStyle = isLightTerrain
      ? "rgba(0, 150, 50, 0.9)" // Darker green for light tiles
      : "rgba(0, 200, 80, 0.8)"; // Original for dark tiles

    hexes.forEach(({ screenX, screenY }) => {
      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.stroke(insetHexPath);
      ctx.restore();
    });
  }

  // Draw labels only if zoomed in enough
  if (showLabels) {
    ctx.fillStyle = "#000";
    ctx.font = `${12 * zoom}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    hexes.forEach(({ screenX, screenY, col, row }) => {
      // ctx.fillText(`${col},${row}`, screenX, screenY);
    });
  }
}

// Draw hovered hex separately
function drawHoveredHex(
  ctx,
  centerX,
  centerY,
  terrain,
  col,
  row,
  size,
  zoom,
  showLabels
) {
  const hexPath = createHexPath(size);

  ctx.save();
  ctx.translate(centerX, centerY);

  ctx.fillStyle = lightenColor(terrain.color, 30);
  ctx.fill(hexPath);

  ctx.strokeStyle = "#ffcc00";
  ctx.lineWidth = 2 * zoom;
  ctx.stroke(hexPath);

  ctx.restore();

  // Draw label
  if (showLabels) {
    ctx.fillStyle = "#000";
    ctx.font = `${12 * zoom}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // ctx.fillText(`${col},${row}`, centerX, centerY);
  }
}

function drawVertexHighlight(ctx, x, y, zoom) {
  ctx.beginPath();
  ctx.arc(x, y, 6 * zoom, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 204, 0, 0.5)";
  ctx.fill();
  ctx.strokeStyle = "#ffcc00";
  ctx.lineWidth = 2 * zoom;
  ctx.stroke();
}

function drawEdgeHighlight(ctx, centerX, centerY, edgeIndex, size, zoom) {
  const vertices = getHexVertices(centerX, centerY, size);
  const v1 = vertices[edgeIndex];
  const v2 = vertices[(edgeIndex + 1) % 6];

  ctx.beginPath();
  ctx.moveTo(v1.x, v1.y);
  ctx.lineTo(v2.x, v2.y);
  ctx.strokeStyle = "#ffcc00";
  ctx.lineWidth = 6 * zoom;
  ctx.stroke();

  const midX = (v1.x + v2.x) / 2;
  const midY = (v1.y + v2.y) / 2;
  ctx.beginPath();
  ctx.arc(midX, midY, 5 * zoom, 0, Math.PI * 2);
  ctx.fillStyle = "#ffcc00";
  ctx.fill();
}

function drawBuilding(ctx, col, row, camera, size, zoom, building) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;
  const functionForThisBuilding = BUILDING_DRAW_FUNCTIONS[building.type];
  if (functionForThisBuilding) {
    functionForThisBuilding(ctx, col, row, camera, size, zoom);
  } else {
    drawDefaultBuilding(ctx, col, row, camera, size, zoom, building.type);
  }

  drawInventoryStacks(ctx, screenX, screenY, building.inventory, size, zoom);
}

/**
 * Draw inventory stacks around a building
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} centerX - Building center X position (screen space)
 * @param {number} centerY - Building center Y position (screen space)
 * @param {Object} inventory - Inventory object with inputs/outputs
 * @param {number} size - Hex size
 * @param {number} zoom - Current zoom level
 */
function drawInventoryStacks(
  ctx,
  centerX,
  centerY,
  inventory,
  size,
  zoom,
  building = null
) {
  // Helper function to draw wood (log)
  function drawWood(ctx, x, y, size) {
    const width = size * 1.2;
    const height = size * 0.6;
    
    ctx.fillStyle = "#8B4513";
    ctx.strokeStyle = "#654321";
    ctx.lineWidth = 1.5;
    
    // Main log body
    ctx.beginPath();
    ctx.ellipse(x, y, width / 2, height / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Wood grain lines
    ctx.strokeStyle = "#654321";
    ctx.lineWidth = 1;
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(x + (i * width) / 5, y - height / 2);
      ctx.lineTo(x + (i * width) / 5, y + height / 2);
      ctx.stroke();
    }
  }

  // Helper function to draw ore (rocky chunk)
  function drawOre(ctx, x, y, size) {
    ctx.fillStyle = "#696969";
    ctx.strokeStyle = "#404040";
    ctx.lineWidth = 1.5;
    
    // Irregular rock shape
    ctx.beginPath();
    ctx.moveTo(x, y - size * 0.6);
    ctx.lineTo(x + size * 0.5, y - size * 0.3);
    ctx.lineTo(x + size * 0.6, y + size * 0.2);
    ctx.lineTo(x + size * 0.2, y + size * 0.6);
    ctx.lineTo(x - size * 0.3, y + size * 0.5);
    ctx.lineTo(x - size * 0.6, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Highlight facets
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    ctx.moveTo(x, y - size * 0.6);
    ctx.lineTo(x + size * 0.3, y - size * 0.1);
    ctx.lineTo(x, y + size * 0.1);
    ctx.closePath();
    ctx.fill();
  }

  // Helper function to draw coal (dark chunk)
  function drawCoal(ctx, x, y, size) {
    ctx.fillStyle = "#1a1a1a";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1.5;
    
    // Angular coal shape
    ctx.beginPath();
    ctx.moveTo(x - size * 0.5, y - size * 0.4);
    ctx.lineTo(x + size * 0.4, y - size * 0.5);
    ctx.lineTo(x + size * 0.6, y + size * 0.1);
    ctx.lineTo(x + size * 0.2, y + size * 0.6);
    ctx.lineTo(x - size * 0.4, y + size * 0.4);
    ctx.lineTo(x - size * 0.6, y - size * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Slight highlight
    ctx.fillStyle = "#333333";
    ctx.beginPath();
    ctx.moveTo(x - size * 0.2, y - size * 0.3);
    ctx.lineTo(x + size * 0.2, y - size * 0.2);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
  }

  // Helper function to draw iron ingot
  function drawIron(ctx, x, y, size) {
    const width = size * 1.2;
    const height = size * 0.5;
    
    ctx.fillStyle = "#B0C4DE";
    ctx.strokeStyle = "#708090";
    ctx.lineWidth = 1.5;
    
    // Main ingot shape
    ctx.beginPath();
    ctx.rect(x - width / 2, y - height / 2, width, height);
    ctx.fill();
    ctx.stroke();
    
    // Top bevel
    ctx.fillStyle = "#D3D3D3";
    ctx.beginPath();
    ctx.moveTo(x - width / 2, y - height / 2);
    ctx.lineTo(x - width / 2 + width * 0.15, y - height / 2 - height * 0.2);
    ctx.lineTo(x + width / 2 - width * 0.15, y - height / 2 - height * 0.2);
    ctx.lineTo(x + width / 2, y - height / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Helper function to draw steel bar
  function drawSteel(ctx, x, y, size) {
    const width = size * 1.2;
    const height = size * 0.5;
    
    ctx.fillStyle = "#4682B4";
    ctx.strokeStyle = "#36648B";
    ctx.lineWidth = 1.5;
    
    // Main bar
    ctx.beginPath();
    ctx.rect(x - width / 2, y - height / 2, width, height);
    ctx.fill();
    ctx.stroke();
    
    // Metallic shine
    ctx.fillStyle = "#87CEEB";
    ctx.beginPath();
    ctx.rect(x - width / 2 + 2, y - height / 2 + 2, width * 0.3, height * 0.3);
    ctx.fill();
  }

  // Helper function to draw grain (wheat bundle)
  function drawGrain(ctx, x, y, size) {
    ctx.strokeStyle = "#DAA520";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    
    // Wheat stalks
    for (let i = -2; i <= 2; i++) {
      const offset = (i * size) / 4;
      ctx.beginPath();
      ctx.moveTo(x + offset, y + size * 0.5);
      ctx.lineTo(x + offset, y - size * 0.5);
      ctx.stroke();
      
      // Wheat head
      ctx.fillStyle = "#F0E68C";
      ctx.beginPath();
      ctx.ellipse(
        x + offset,
        y - size * 0.4,
        size * 0.15,
        size * 0.25,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }

  // Helper function to draw stone block
  function drawStone(ctx, x, y, size) {
    ctx.fillStyle = "#A9A9A9";
    ctx.strokeStyle = "#696969";
    ctx.lineWidth = 1.5;
    
    // Main stone block
    ctx.beginPath();
    ctx.rect(x - size * 0.6, y - size * 0.6, size * 1.2, size * 1.2);
    ctx.fill();
    ctx.stroke();
    
    // Texture lines
    ctx.strokeStyle = "#808080";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.6, y);
    ctx.lineTo(x + size * 0.6, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y - size * 0.6);
    ctx.lineTo(x, y + size * 0.6);
    ctx.stroke();
  }

  // Helper function to draw planks
  function drawPlanks(ctx, x, y, size) {
    const plankWidth = size * 0.3;
    const plankHeight = size * 1.2;
    
    for (let i = -1; i <= 1; i++) {
      const offset = i * size * 0.35;
      ctx.fillStyle = "#DEB887";
      ctx.strokeStyle = "#8B7355";
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      ctx.rect(
        x + offset - plankWidth / 2,
        y - plankHeight / 2,
        plankWidth,
        plankHeight
      );
      ctx.fill();
      ctx.stroke();
      
      // Wood grain
      ctx.strokeStyle = "#8B7355";
      ctx.lineWidth = 0.5;
      for (let j = -2; j <= 2; j++) {
        ctx.beginPath();
        ctx.moveTo(
          x + offset - plankWidth / 2,
          y + (j * plankHeight) / 5
        );
        ctx.lineTo(
          x + offset + plankWidth / 2,
          y + (j * plankHeight) / 5
        );
        ctx.stroke();
      }
    }
  }

  // Helper function to draw flour sack
  function drawFlour(ctx, x, y, size) {
    ctx.fillStyle = "#F5F5DC";
    ctx.strokeStyle = "#8B8B83";
    ctx.lineWidth = 1.5;
    
    // Sack body
    ctx.beginPath();
    ctx.moveTo(x - size * 0.5, y - size * 0.3);
    ctx.lineTo(x - size * 0.6, y + size * 0.5);
    ctx.quadraticCurveTo(x, y + size * 0.6, x + size * 0.6, y + size * 0.5);
    ctx.lineTo(x + size * 0.5, y - size * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Tied top
    ctx.fillStyle = "#D2B48C";
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.3, size * 0.5, size * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // Helper function to draw gold bars
  function drawGold(ctx, x, y, size) {
    const width = size * 1.1;
    const height = size * 0.4;
    
    // Bottom bar
    ctx.fillStyle = "#B8860B";
    ctx.strokeStyle = "#8B6914";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(x - width / 2, y, width, height);
    ctx.fill();
    ctx.stroke();
    
    // Top bar
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.rect(x - width / 2, y - height, width, height);
    ctx.fill();
    ctx.stroke();
    
    // Shine effect
    ctx.fillStyle = "#FFEC8B";
    ctx.beginPath();
    ctx.rect(x - width / 2 + 2, y - height + 2, width * 0.4, height * 0.4);
    ctx.fill();
  }

  // Resource visual configurations
  const resourceDrawFunctions = {
    wood: drawWood,
    ore: drawOre,
    coal: drawCoal,
    iron: drawIron,
    iron_ingot: drawIron,
    steel: drawSteel,
    grain: drawGrain,
    stone: drawStone,
    planks: drawPlanks,
    flour: drawFlour,
    gold: drawGold,
  };

  // Collect all resources from inputs and outputs
  const allResources = [];

  if (inventory.inputs) {
    for (const [type, amount] of Object.entries(inventory.inputs)) {
      if (amount > 0) {
        allResources.push({ type, amount, category: "input" });
      }
    }
  }

  if (inventory.outputs) {
    for (const [type, amount] of Object.entries(inventory.outputs)) {
      if (amount > 0) {
        allResources.push({ type, amount, category: "output" });
      }
    }
  }

  if (allResources.length === 0) return;

  // Get capacity info - either building type capacity or train's atMaxCargo flag
  let buildingTypeCapacity = null;
  let isTrainFull = false;

  if (building) {
    if (building.type) {
      // It's a building
      const buildingType = getBuildingType(building.type);
      buildingTypeCapacity = buildingType?.capacity;
    } else if (building.atMaxCargo !== undefined) {
      // It's a train
      isTrainFull = building.atMaxCargo;
    }
  }

  // Calculate positions around the building
  const iconDistance = size * 0.4; // Distance from building center
  const iconSize = size * 0.15; // Size of each resource icon

  // Distribute resources around the building
  allResources.forEach((resource, index) => {
    const angle = (index / allResources.length) * Math.PI * 2 - Math.PI / 2;
    const iconX = centerX + Math.cos(angle) * iconDistance;
    const iconY = centerY + Math.sin(angle) * iconDistance;

    const drawFunction = resourceDrawFunctions[resource.type];

    ctx.save();

    // Draw the resource icon
    if (drawFunction) {
      drawFunction(ctx, iconX, iconY, iconSize);
    } else {
      // Fallback generic resource
      ctx.fillStyle = "#888888";
      ctx.strokeStyle = "#666666";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(iconX, iconY, iconSize * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Draw amount label if zoomed in
    if (zoom > 0.6) {
      // Check if at capacity
      // For buildings: check if THIS resource is at its capacity
      // For trains: check if the ENTIRE train is full
      const isAtCapacity =
        isTrainFull ||
        (buildingTypeCapacity &&
          buildingTypeCapacity[resource.type] &&
          resource.amount >= buildingTypeCapacity[resource.type]);

      // Use red for at-capacity, white otherwise
      ctx.fillStyle = isAtCapacity ? "#FF0000" : "#FFFFFF";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.font = `bold ${10 * zoom}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const labelY = iconY - iconSize * 1.5;
      const formattedNumber = formatNumber(resource.amount);
      ctx.strokeText(formattedNumber, iconX, labelY);
      ctx.fillText(formattedNumber, iconX, labelY);
    }

    ctx.restore();
  });
}

/**
 * Draw stacked logs
 */
function drawLogStack(ctx, x, y, count, baseSize, style, zoom) {
  const logWidth = baseSize * 1.5;
  const logHeight = baseSize * 0.4;

  for (let i = 0; i < count; i++) {
    const offsetY = y + baseSize - i * logHeight * 0.7;

    // Main log body
    ctx.fillStyle = style.color;
    ctx.fillRect(
      x - logWidth / 2,
      offsetY - logHeight / 2,
      logWidth,
      logHeight
    );

    // Wood grain lines
    ctx.strokeStyle = style.highlightColor;
    ctx.lineWidth = 1 * zoom;
    for (let j = 0; j < 3; j++) {
      const lineX = x - logWidth / 2 + (logWidth / 4) * (j + 0.5);
      ctx.beginPath();
      ctx.moveTo(lineX, offsetY - logHeight / 2);
      ctx.lineTo(lineX, offsetY + logHeight / 2);
      ctx.stroke();
    }

    // End caps (circular)
    ctx.fillStyle = style.highlightColor;
    ctx.beginPath();
    ctx.arc(x - logWidth / 2, offsetY, logHeight / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + logWidth / 2, offsetY, logHeight / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Draw metal bars
 */
function drawBarStack(ctx, x, y, count, baseSize, style, zoom) {
  const barWidth = baseSize * 0.3;
  const barLength = baseSize * 1.8;

  for (let i = 0; i < count; i++) {
    const offsetX = x + (i - count / 2) * barWidth * 0.8;

    // Main bar
    ctx.fillStyle = style.color;
    ctx.fillRect(
      offsetX - barWidth / 2,
      y - barLength / 2,
      barWidth,
      barLength
    );

    // Highlight edge
    ctx.fillStyle = style.highlightColor;
    ctx.fillRect(
      offsetX - barWidth / 2,
      y - barLength / 2,
      barWidth * 0.3,
      barLength
    );

    // Border
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 0.5 * zoom;
    ctx.strokeRect(
      offsetX - barWidth / 2,
      y - barLength / 2,
      barWidth,
      barLength
    );
  }
}

/**
 * Draw pile of resources (ore, coal, etc)
 */
function drawPileStack(ctx, x, y, count, baseSize, style, zoom) {
  const pileWidth = baseSize * 1.2;
  const pileHeight = baseSize * 0.8;

  for (let i = 0; i < count; i++) {
    const offsetY = y + baseSize * 0.5 - i * pileHeight * 0.5;
    const width = pileWidth * (1 - i * 0.1); // Taper as stacks go up

    // Draw pile as irregular mound
    ctx.fillStyle = style.color;
    ctx.beginPath();
    ctx.ellipse(x, offsetY, width / 2, pileHeight / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Add some texture with smaller chunks
    ctx.fillStyle = style.highlightColor;
    for (let j = 0; j < 4; j++) {
      const chunkX = x + 0.5 * width * 0.6;
      const chunkY = offsetY + 0.5 * pileHeight * 0.4;
      const chunkSize = baseSize * 0.15;

      ctx.beginPath();
      ctx.arc(chunkX, chunkY, chunkSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outline
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 0.5 * zoom;
    ctx.beginPath();
    ctx.ellipse(x, offsetY, width / 2, pileHeight / 2, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawTrackBetweenHexes(ctx, hex1, hex2, camera, size, zoom) {
  const pos1 = hexToPixel(hex1.col, hex1.row, size);
  const pos2 = hexToPixel(hex2.col, hex2.row, size);

  let edgeIndex = -1;
  for (let i = 0; i < 6; i++) {
    const neighbor = getNeighbor(hex1.col, hex1.row, i);
    if (neighbor.col === hex2.col && neighbor.row === hex2.row) {
      edgeIndex = i;
      break;
    }
  }

  if (edgeIndex === -1) return;

  const screenX = pos1.x + camera.x;
  const screenY = pos1.y + camera.y;
  const vertices = getHexVertices(screenX, screenY, size);
  const v1 = vertices[edgeIndex];
  const v2 = vertices[(edgeIndex + 1) % 6];

  const numTies = 5;
  const tieWidth = size * 0.15;
  const tieThickness = 1.5 * zoom;

  ctx.strokeStyle = "#4a3a2a";
  ctx.lineWidth = tieThickness;

  for (let i = 0; i <= numTies; i++) {
    const t = i / numTies;
    const mx = v1.x + (v2.x - v1.x) * t;
    const my = v1.y + (v2.y - v1.y) * t;

    const dx = v2.x - v1.x;
    const dy = v2.y - v1.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const perpX = (-dy / len) * tieWidth;
    const perpY = (dx / len) * tieWidth;

    ctx.beginPath();
    ctx.moveTo(mx - perpX, my - perpY);
    ctx.lineTo(mx + perpX, my + perpY);
    ctx.stroke();
  }

  const railOffset = size * 0.08;
  const railThickness = 2 * zoom;

  ctx.strokeStyle = "#708090";
  ctx.lineWidth = railThickness;

  const dx = v2.x - v1.x;
  const dy = v2.y - v1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const perpX = (-dy / len) * railOffset;
  const perpY = (dx / len) * railOffset;

  ctx.beginPath();
  ctx.moveTo(v1.x - perpX, v1.y - perpY);
  ctx.lineTo(v2.x - perpX, v2.y - perpY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(v1.x + perpX, v1.y + perpY);
  ctx.lineTo(v2.x + perpX, v2.y + perpY);
  ctx.stroke();
}

function trainDrawingDispatcher(ctx, camera, size, zoom, train) {
  let functionForThisTrain = TRAIN_DRAW_FUNCTIONS[train.type];
  if (functionForThisTrain) {
  } else {
    functionForThisTrain = TRAIN_DRAW_FUNCTIONS.default;
  }
  const trainXY = functionForThisTrain(ctx, camera, size, zoom, train);
  drawInventoryStacks(
    ctx,
    trainXY.trainX,
    trainXY.trainY,
    { inputs: train.cargo },
    size,
    zoom,
    {
      atMaxCargo: train.atMaxCargo,
    }
  );
}
// function drawTrain(ctx, camera, size, zoom, train) {
//   const atMaxCargo = train.atMaxCargo;
//   const hex1 = train.hex1;
//   const hex2 = train.hex2;
//   const progress = train.progress;
//   const cargo = train.cargo;
//   const pos1 = hexToPixel(hex1.col, hex1.row, size);

//   let edgeIndex = -1;
//   for (let i = 0; i < 6; i++) {
//     const neighbor = getNeighbor(hex1.col, hex1.row, i);
//     if (neighbor.col === hex2.col && neighbor.row === hex2.row) {
//       edgeIndex = i;
//       break;
//     }
//   }

//   if (edgeIndex === -1) return;

//   const screenX = pos1.x + camera.x;
//   const screenY = pos1.y + camera.y;
//   const vertices = getHexVertices(screenX, screenY, size);
//   const v1 = vertices[edgeIndex];
//   const v2 = vertices[(edgeIndex + 1) % 6];

//   const trainX = v1.x + (v2.x - v1.x) * progress;
//   const trainY = v1.y + (v2.y - v1.y) * progress;

//   const dx = v2.x - v1.x;
//   const dy = v2.y - v1.y;
//   const angle = Math.atan2(dy, dx);

//   const trainLength = size * 0.3;
//   const trainWidth = size * 0.15;

//   ctx.save();
//   ctx.translate(trainX, trainY);
//   ctx.rotate(angle);

//   ctx.fillStyle = "#c41e3a";
//   ctx.fillRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);
//   ctx.strokeStyle = "#8b0000";
//   ctx.lineWidth = 1.5 * zoom;
//   ctx.strokeRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

//   ctx.fillStyle = "#ffeb3b";
//   const windowWidth = trainLength * 0.25;
//   const windowHeight = trainWidth * 0.5;
//   const windowSpacing = trainLength * 0.15;

//   ctx.fillRect(
//     -windowSpacing - windowWidth / 2,
//     -windowHeight / 2,
//     windowWidth,
//     windowHeight
//   );
//   ctx.fillRect(
//     windowSpacing - windowWidth / 2,
//     -windowHeight / 2,
//     windowWidth,
//     windowHeight
//   );

//   ctx.restore();
//   drawInventoryStacks(ctx, trainX, trainY, { inputs: cargo }, size, zoom, {
//     atMaxCargo,
//   });
// }

function getVisibleHexRange(canvas, camera, size) {
  const width = size * 2;
  const height = Math.sqrt(3) * size;
  const margin = 2; // Reduced margin

  const topLeft = pixelToHex(
    -camera.x - width * margin,
    -camera.y - height * margin,
    size
  );
  const bottomRight = pixelToHex(
    -camera.x + canvas.width + width * margin,
    -camera.y + canvas.height + height * margin,
    size
  );

  return {
    minCol: topLeft.col - margin,
    maxCol: bottomRight.col + margin,
    minRow: topLeft.row - margin,
    maxRow: bottomRight.row + margin,
  };
}

/**
 * Main optimized draw function
 */

export function draw(ctx, params) {
  const {
    canvas,
    map,
    placed_tracks,
    placed_buildings,
    trains,
    camera,
    hoveredElement,
    size,
    zoom,
    TERRAIN,
    OBJECT_TYPES,
    uiManager,
    canPlaceBuilding,
  } = params;
  const terrainStamps = {};

  clearBuildingStamps();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const range = getVisibleHexRange(canvas, camera, size);

  // Only show labels when zoomed in (zoom > 1)
  const showLabels = zoom > 1;

  // Group hexes by terrain type for batch rendering
  const hexesByTerrain = {};
  let hoveredHex = null;

  for (let col = range.minCol; col <= range.maxCol; col++) {
    for (let row = range.minRow; row <= range.maxRow; row++) {
      const hexKey = `${col},${row}`;
      const hex = map[hexKey];

      if (!hex) continue;

      const pos = hexToPixel(col, row, size);
      const screenX = pos.x + camera.x;
      const screenY = pos.y + camera.y;

      const isHovered =
        hoveredElement &&
        hoveredElement.type === "tile" &&
        hoveredElement.col === col &&
        hoveredElement.row === row;

      if (isHovered) {
        hoveredHex = { screenX, screenY, terrain: hex.terrain, col, row };
      } else {
        const terrainKey = hex.terrain.name;
        if (!hexesByTerrain[terrainKey]) {
          hexesByTerrain[terrainKey] = {
            terrain: hex.terrain,
            hexes: [],
          };
        }
        hexesByTerrain[terrainKey].hexes.push({ screenX, screenY, col, row });
      }
    }
  }

  // Batch draw hexes by terrain type using stamps
  for (const terrainKey in hexesByTerrain) {
    const { terrain, hexes } = hexesByTerrain[terrainKey];

    const selectedBuilding = uiManager.getSelectedBuilding();
    const mode = uiManager.getMode();
    const showPlacementOverlay = mode === "building" && selectedBuilding;
    const canPlaceOnThisTerrain = showPlacementOverlay
      ? canPlaceBuilding(selectedBuilding, terrain.name.toUpperCase())
      : null;
    drawHexBatch(
      ctx,
      hexes,
      terrain,
      size,
      zoom,
      showLabels,
      canPlaceOnThisTerrain,
      terrainStamps
    );
  }

  // Draw hovered hex on top
  if (hoveredHex) {
    drawHoveredHex(
      ctx,
      hoveredHex.screenX,
      hoveredHex.screenY,
      hoveredHex.terrain,
      hoveredHex.col,
      hoveredHex.row,
      size,
      zoom,
      showLabels
    );
  }

  // Draw tracks
  let trackCount = 0;
  for (const key in placed_tracks) {
    const obj = placed_tracks[key];

    if (obj.type === OBJECT_TYPES.TRACK) {
      trackCount++;

      const hex1 = obj.hex1;
      const hex2 = obj.hex2;

      const inRange =
        (hex1.col >= range.minCol &&
          hex1.col <= range.maxCol &&
          hex1.row >= range.minRow &&
          hex1.row <= range.maxRow) ||
        (hex2.col >= range.minCol &&
          hex2.col <= range.maxCol &&
          hex2.row >= range.minRow &&
          hex2.row <= range.maxRow);

      if (inRange) {
        drawTrackBetweenHexes(ctx, hex1, hex2, camera, size, zoom);
      }
    }
  }

  // Draw buildings
  drawBuildingsBatched(
    ctx,
    placed_buildings,
    camera,
    size,
    zoom,
    range,
    performance.now()
  );

  // Draw trains
  if (trains) {
    trains.forEach((train) => {
      const hex1 = train.hex1;
      const hex2 = train.hex2;

      const inRange =
        (hex1.col >= range.minCol &&
          hex1.col <= range.maxCol &&
          hex1.row >= range.minRow &&
          hex1.row <= range.maxRow) ||
        (hex2.col >= range.minCol &&
          hex2.col <= range.maxCol &&
          hex2.row >= range.minRow &&
          hex2.row <= range.maxRow);

      if (inRange) {
        trainDrawingDispatcher(ctx, camera, size, zoom, train);
      }
    });
  }

  // Draw hover highlights
  if (hoveredElement) {
    const pos = hexToPixel(hoveredElement.col, hoveredElement.row, size);
    const screenX = pos.x + camera.x;
    const screenY = pos.y + camera.y;

    if (hoveredElement.type === "vertex") {
      const vertices = getHexVertices(screenX, screenY, size);
      const v = vertices[hoveredElement.vertexIndex];
      drawVertexHighlight(ctx, v.x, v.y, zoom);
    } else if (hoveredElement.type === "edge") {
      drawEdgeHighlight(
        ctx,
        screenX,
        screenY,
        hoveredElement.edgeIndex,
        size,
        zoom
      );
    }
  }
}

/////////////

/**
 * Building stamp cache - regenerated every frame for animations
 * Key difference from terrain: these are NOT persistent between frames
 */
const buildingStamps = {};

/**
 * Clear all building stamps (call at start of each draw frame)
 */
function clearBuildingStamps() {
  for (let key in buildingStamps) {
    delete buildingStamps[key];
  }
}

/**
 * Create a building stamp for a specific building type
 * This renders the building once to an offscreen canvas
 */
function createBuildingStamp(buildingType, size, zoom, timestamp) {
  const key = `${buildingType}_${Math.round(size * 10)}`;

  if (buildingStamps[key]) {
    return buildingStamps[key];
  }

  // Create stamp canvas - make it big enough for the building + inventory
  const stampSize = Math.ceil(size * 3); // Extra space for inventory around building
  const canvas = document.createElement("canvas");
  canvas.width = stampSize;
  canvas.height = stampSize;
  const ctx = canvas.getContext("2d");

  // Center position in stamp
  const centerX = stampSize / 2;
  const centerY = stampSize / 2;

  // Draw the building at center of stamp
  const functionForThisBuilding = BUILDING_DRAW_FUNCTIONS[buildingType];
  if (functionForThisBuilding) {
    // Custom draw function - needs camera offset of 0
    const fakeCamera = { x: centerX, y: centerY };
    // We need to adjust since these functions expect hexToPixel + camera
    // They'll calculate position, so we pass col=0, row=0 and adjust camera
    ctx.save();
    ctx.translate(centerX, centerY);

    // Call the function with adjusted parameters
    // Note: This is a bit hacky - the draw functions expect screen coordinates
    // We're creating a fake scenario where hex (0,0) draws at stamp center
    functionForThisBuilding(ctx, 0, 0, { x: 0, y: 0 }, size, zoom);

    ctx.restore();
  } else {
    // Default building drawing
    ctx.save();
    ctx.translate(centerX, centerY);
    drawDefaultBuildingToStamp(ctx, size, zoom, buildingType);
    ctx.restore();
  }

  buildingStamps[key] = canvas;
  return canvas;
}

/**
 * Helper function to draw default building directly to stamp context
 * (avoids the position calculation issues)
 */
function drawDefaultBuildingToStamp(ctx, size, zoom, buildingType) {
  const buildingSize = size * 0.6;

  // Draw building base
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(
    -buildingSize / 2,
    -buildingSize / 2,
    buildingSize,
    buildingSize
  );

  ctx.strokeStyle = "#654321";
  ctx.lineWidth = 2 * zoom;
  ctx.strokeRect(
    -buildingSize / 2,
    -buildingSize / 2,
    buildingSize,
    buildingSize
  );

  // Draw building emoji/icon centered
  ctx.font = `${size * 0.5}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";

  // Get emoji for building type (you'll need to map this properly)
  const emoji = getBuildingEmoji(buildingType);
  ctx.fillText(emoji, 0, 0);
}

/**
 * Get emoji for building type
 */
function getBuildingEmoji(buildingType) {
  const emojiMap = {
    hub: "🏪",
    mine: "⛏️",
    smelter: "🔥",
    farm: "🌾",
    lumberyard: "🪓",
    sawmill: "🪚",
  };
  return emojiMap[buildingType] || "🏢";
}

/**
 * Modified drawBuilding function using stamps
 */
function drawBuildingWithStamp(
  ctx,
  col,
  row,
  camera,
  size,
  zoom,
  building,
  timestamp
) {
  const pos = hexToPixel(col, row, size);
  const screenX = pos.x + camera.x;
  const screenY = pos.y + camera.y;

  // Get or create the stamp for this building type
  const stamp = createBuildingStamp(building.type, size, zoom, timestamp);
  const stampHalfSize = stamp.width / 2;

  // Draw the stamp at the building position
  ctx.drawImage(stamp, screenX - stampHalfSize, screenY - stampHalfSize);

  // Draw inventory stacks separately (these vary per building instance)
  //drawInventoryStacks(ctx, screenX, screenY, building.inventory, size, zoom);
}

/**
 * Batch draw buildings of the same type
 * Even better optimization: group buildings by type and draw all stamps at once
 */
function drawBuildingsBatched(
  ctx,
  buildings,
  camera,
  size,
  zoom,
  range,
  timestamp
) {
  // Group buildings by type
  const buildingsByType = {};

  for (const tileKey in buildings) {
    const building = buildings[tileKey];

    // Check if in range
    const inRange =
      building.col >= range.minCol &&
      building.col <= range.maxCol &&
      building.row >= range.minRow &&
      building.row <= range.maxRow;

    if (!inRange) continue;

    if (!buildingsByType[building.type]) {
      buildingsByType[building.type] = [];
    }

    buildingsByType[building.type].push(building);
  }

  // Draw each type as a batch
  for (const buildingType in buildingsByType) {
    const stamp = createBuildingStamp(buildingType, size, zoom, timestamp);
    const stampHalfSize = stamp.width / 2;
    const buildingsOfThisType = buildingsByType[buildingType];

    // Draw all buildings of this type using the same stamp
    buildingsOfThisType.forEach((building) => {
      const pos = hexToPixel(building.col, building.row, size);
      const screenX = pos.x + camera.x;
      const screenY = pos.y + camera.y;

      // Blit the stamp
      ctx.drawImage(stamp, screenX - stampHalfSize, screenY - stampHalfSize);

      // Draw inventory (unique per building)
      if (buildingsOfThisType.length < 100) {
        drawInventoryStacks(
          ctx,
          screenX,
          screenY,
          building.inventory,
          size,
          zoom,
          building
        );
      }
    });
  }
}
