// railwayTypes.js
import {
  hexToPixel,
  // pixelToHex,
  getHexVertices,
  getNeighbor,
} from "./hexUtils.js";

export const TRACK_TYPES = {
  BASIC_TRACK: {
    id: "basic_track",
    name: "Basic Track",
    emoji: "🛤️",
    allowedTerrain: ["GRASS", "SAND", "FOREST"],
    unlocked: true,
    cost: { ore: 1 },
  },
  //More here later
  //   REINFORCED_TRACK: {
  //     id: 'reinforced_track',
  //     name: 'Reinforced Track',
  //     emoji: '🛤️',
  //     allowedTerrain: ['GRASS', 'SAND', 'FOREST', 'MOUNTAIN'],
  //     unlocked: false,
  //     cost: { metal: 3, stone: 2 },
  //   },
};

export const TRAIN_TYPES = {
  BASIC_TRAIN: {
    id: "basic_train",
    name: "Wooden Turtle",
    emoji: "🛞",
    cargoCapacity: 10,
    speed: 0.01,
    unlocked: true,
    cost: { wood: 10 },
    description:
      "These guys are slow and don't carry much, but they will get you started.",
  },
  TRAIN_2: {
    id: "train_2",
    name: "Sputtering Pack Dog",
    emoji: "🚂",
    cargoCapacity: 10,
    speed: 0.03,
    unlocked: true,
    cost: { iron: 10 },
    description: "Pretty fast, but still don't carry much",
  },
  TRAIN_3: {
    id: "train_3",
    name: "Steam Dragon",
    emoji: "🚆",
    cargoCapacity: 150,
    speed: 0.03,
    unlocked: true,
    cost: { steel: 10 },
    description: "Carry much more, but still not crazy fast!",
  },
  TRAIN_4: {
    id: "train_4",
    name: "Electric Elephant",
    emoji: "🚅",
    cargoCapacity: 200,
    speed: 0.05,
    unlocked: true,
    cost: { steel: 20 },
    powerDemand:3,
    description: "Carries a lot, and fast, but requires power.",
  },
  TRAIN_5: {
    id: "train_5",
    name: "Supercharged Caffeinated Megahauler",
    emoji: "🚅",
    cargoCapacity: 10000000000,
    speed: 0.2,
    unlocked: true,
    cost: { gold: 50000 },
    lifeExpectancy: 30,
    description: "Has matter warping cargo hold making it larger inside than outside. Really good for moving lots of gold.",
  },

  // more here later
};

// Helper function to get track type by id
export function getTrackType(id) {
  return Object.values(TRACK_TYPES).find((type) => type.id === id);
}

// Helper function to get train type by id
export function getTrainType(id) {
  return Object.values(TRAIN_TYPES).find((type) => type.id === id);
}

export const TRAIN_DRAW_FUNCTIONS = {
  default: drawTrain,
  basic_train: drawTrainWood,
  train_2: drawTrainDiesel,
  train_3: drawTrainSteam,
  train_4: drawTrainElectric,
  train_5: drawTrainMega,
};

function drawTrain(ctx, camera, size, zoom, train) {
  const atMaxCargo = train.atMaxCargo;
  const hex1 = train.hex1;
  const hex2 = train.hex2;
  const progress = train.progress;
  const cargo = train.cargo;
  const pos1 = hexToPixel(hex1.col, hex1.row, size);

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

  const trainX = v1.x + (v2.x - v1.x) * progress;
  const trainY = v1.y + (v2.y - v1.y) * progress;

  const dx = v2.x - v1.x;
  const dy = v2.y - v1.y;
  const angle = Math.atan2(dy, dx);

  const trainLength = size * 0.3;
  const trainWidth = size * 0.15;

  ctx.save();
  ctx.translate(trainX, trainY);
  ctx.rotate(angle);

  ctx.fillStyle = "#c41e3a";
  ctx.fillRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);
  ctx.strokeStyle = "#8b0000";
  ctx.lineWidth = 1.5 * zoom;
  ctx.strokeRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

  ctx.fillStyle = "#ffeb3b";
  const windowWidth = trainLength * 0.25;
  const windowHeight = trainWidth * 0.5;
  const windowSpacing = trainLength * 0.15;

  ctx.fillRect(
    -windowSpacing - windowWidth / 2,
    -windowHeight / 2,
    windowWidth,
    windowHeight
  );
  ctx.fillRect(
    windowSpacing - windowWidth / 2,
    -windowHeight / 2,
    windowWidth,
    windowHeight
  );

  ctx.restore();
  return { trainX, trainY };
}

function drawTrainWood(ctx, camera, size, zoom, train) {
  const hex1 = train.hex1;
  const hex2 = train.hex2;
  const progress = train.progress;
  const pos1 = hexToPixel(hex1.col, hex1.row, size);

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

  const trainX = v1.x + (v2.x - v1.x) * progress;
  const trainY = v1.y + (v2.y - v1.y) * progress;

  const dx = v2.x - v1.x;
  const dy = v2.y - v1.y;
  const angle = Math.atan2(dy, dx);

  const trainLength = size * 0.35;
  const trainWidth = size * 0.16;

  ctx.save();
  ctx.translate(trainX, trainY);
  ctx.rotate(angle);

  // Main cart body (light wood with redwood hint)
  ctx.fillStyle = "#b8856d";
  ctx.fillRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

  // Cart outline
  ctx.strokeStyle = "#7a5544";
  ctx.lineWidth = 1.5 * zoom;
  ctx.strokeRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

  // Simple wheels
  const wheelSize = size * 0.08;
  const wheelOffset = trainLength * 0.35;

  ctx.fillStyle = "#5d4037";
  ctx.fillRect(wheelOffset - wheelSize / 2, -trainWidth / 2 - wheelSize / 2, wheelSize, wheelSize);
  ctx.fillRect(wheelOffset - wheelSize / 2, trainWidth / 2 - wheelSize / 2, wheelSize, wheelSize);
  ctx.fillRect(-wheelOffset - wheelSize / 2, -trainWidth / 2 - wheelSize / 2, wheelSize, wheelSize);
  ctx.fillRect(-wheelOffset - wheelSize / 2, trainWidth / 2 - wheelSize / 2, wheelSize, wheelSize);

  ctx.restore();
  return { trainX, trainY };
}

function drawTrainDiesel(ctx, camera, size, zoom, train) {
  const hex1 = train.hex1;
  const hex2 = train.hex2;
  const progress = train.progress;
  const pos1 = hexToPixel(hex1.col, hex1.row, size);

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

  const trainX = v1.x + (v2.x - v1.x) * progress;
  const trainY = v1.y + (v2.y - v1.y) * progress;

  const dx = v2.x - v1.x;
  const dy = v2.y - v1.y;
  const angle = Math.atan2(dy, dx);

  const trainLength = size * 0.32;
  const trainWidth = size * 0.17;

  ctx.save();
  ctx.translate(trainX, trainY);
  ctx.rotate(angle);

  // Main body (diesel orange/yellow)
  ctx.fillStyle = "#ff9800";
  ctx.fillRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

  // Stripe detail
  ctx.fillStyle = "#212121";
  ctx.fillRect(-trainLength / 2, -trainWidth * 0.15, trainLength, trainWidth * 0.3);

  // Outline
  ctx.strokeStyle = "#e65100";
  ctx.lineWidth = 1.5 * zoom;
  ctx.strokeRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

  ctx.restore();
  return { trainX, trainY };
}

function drawTrainSteam(ctx, camera, size, zoom, train) {
  const hex1 = train.hex1;
  const hex2 = train.hex2;
  const progress = train.progress;
  const pos1 = hexToPixel(hex1.col, hex1.row, size);

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

  const trainX = v1.x + (v2.x - v1.x) * progress;
  const trainY = v1.y + (v2.y - v1.y) * progress;

  const dx = v2.x - v1.x;
  const dy = v2.y - v1.y;
  const angle = Math.atan2(dy, dx);

  const trainLength = size * 0.4;
  const trainWidth = size * 0.2;

  ctx.save();
  ctx.translate(trainX, trainY);
  ctx.rotate(angle);

  // Main body (dark metal)
  ctx.fillStyle = "#37474f";
  ctx.fillRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

  // Boiler detail
  ctx.fillStyle = "#546e7a";
  ctx.fillRect(-trainLength * 0.3, -trainWidth * 0.35, trainLength * 0.6, trainWidth * 0.7);

  // Outline
  ctx.strokeStyle = "#263238";
  ctx.lineWidth = 1.8 * zoom;
  ctx.strokeRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

  // Smokestack
  ctx.fillStyle = "#263238";
  ctx.fillRect(trainLength * 0.25, -trainWidth * 0.6, trainLength * 0.12, trainWidth * 0.3);

  ctx.restore();
  return { trainX, trainY };
}

function drawTrainElectric(ctx, camera, size, zoom, train) {
  const hex1 = train.hex1;
  const hex2 = train.hex2;
  const progress = train.progress;
  const pos1 = hexToPixel(hex1.col, hex1.row, size);

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

  const trainX = v1.x + (v2.x - v1.x) * progress;
  const trainY = v1.y + (v2.y - v1.y) * progress;

  const dx = v2.x - v1.x;
  const dy = v2.y - v1.y;
  const angle = Math.atan2(dy, dx);

  const trainLength = size * 0.42;
  const trainWidth = size * 0.22;

  ctx.save();
  ctx.translate(trainX, trainY);
  ctx.rotate(angle);

  // Main body (sleek silver/white)
  ctx.fillStyle = "#eceff1";
  ctx.fillRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

  // Blue accent stripe
  ctx.fillStyle = "#2196f3";
  ctx.fillRect(-trainLength / 2, -trainWidth * 0.1, trainLength, trainWidth * 0.2);

  // Outline
  ctx.strokeStyle = "#90a4ae";
  ctx.lineWidth = 1.8 * zoom;
  ctx.strokeRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

  // Pantograph (electric connector)
  ctx.strokeStyle = "#455a64";
  ctx.lineWidth = 2 * zoom;
  ctx.beginPath();
  ctx.moveTo(0, -trainWidth / 2);
  ctx.lineTo(0, -trainWidth * 0.8);
  ctx.stroke();

  ctx.restore();
  return { trainX, trainY };
}

function drawTrainMega(ctx, camera, size, zoom, train) {
  const hex1 = train.hex1;
  const hex2 = train.hex2;
  const progress = train.progress;
  const pos1 = hexToPixel(hex1.col, hex1.row, size);

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

  const trainX = v1.x + (v2.x - v1.x) * progress;
  const trainY = v1.y + (v2.y - v1.y) * progress;

  const dx = v2.x - v1.x;
  const dy = v2.y - v1.y;
  const angle = Math.atan2(dy, dx);

  const trainLength = size * 0.5;
  const trainWidth = size * 0.25;

  ctx.save();
  ctx.translate(trainX, trainY);
  ctx.rotate(angle);

  // Main body (aggressive red/black)
  ctx.fillStyle = "#d32f2f";
  ctx.fillRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

  // Racing stripes
  ctx.fillStyle = "#ffeb3b";
  ctx.fillRect(-trainLength / 2, -trainWidth * 0.35, trainLength, trainWidth * 0.15);
  ctx.fillRect(-trainLength / 2, trainWidth * 0.2, trainLength, trainWidth * 0.15);

  // Hazard markings
  ctx.fillStyle = "#212121";
  for (let i = 0; i < 4; i++) {
    const x = -trainLength / 2 + (i * trainLength / 3);
    ctx.fillRect(x, -trainWidth / 2, trainLength / 8, trainWidth);
  }

  // Heavy outline
  ctx.strokeStyle = "#b71c1c";
  ctx.lineWidth = 2.5 * zoom;
  ctx.strokeRect(-trainLength / 2, -trainWidth / 2, trainLength, trainWidth);

  ctx.restore();
  return { trainX, trainY };
}