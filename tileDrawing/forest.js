export function drawForestTerrain(ctx, size, terrain, zoom) {
  // Get current time for animation
  const time = Date.now() / 1000; // Convert to seconds
  
  // Generate trees for this specific forest hex (using size as seed for consistency)
  const trees = [];
  const treeCount = 30;
  const minDistance = 0.12;
  const maxAttempts = 100;
  
  // Use size as a seed for consistent tree placement for same-sized hexes
  const seedBase = 5
  
  for (let t = 0; t < treeCount; t++) {
    let placed = false;
    let attempts = 0;
    
    while (!placed && attempts < maxAttempts) {
      // Seeded random for consistent placement
      const seed1 = seedBase + t * 2;
      const seed2 = seedBase + t * 2 + 1;
      const newX = (seededRandom(seed1) - 0.5) * 1.5;
      const newY = (seededRandom(seed2) - 0.5) * 1.5;
      
      // Check distance from all existing trees
      let tooClose = false;
      for (let existing of trees) {
        const dx = newX - existing.x;
        const dy = newY - existing.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < minDistance) {
          tooClose = true;
          break;
        }
      }
      
      if (!tooClose) {
        trees.push({
          x: newX,
          y: newY,
          size: 6 + seededRandom(seedBase + t * 3) * 12
        });
        placed = true;
      }
      
      attempts++;
    }
  }
  
  // Draw the forest hex
  const hexPath = createHexPath(size);
  
  ctx.fillStyle = terrain.color;
  ctx.fill(hexPath);
  
  // Add gradient shading
  const shadeGradient = ctx.createLinearGradient(-size, -size, size, size);
  shadeGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  shadeGradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
  ctx.fillStyle = shadeGradient;
  ctx.fill(hexPath);
  
  // Clip to hex and draw trees
  ctx.clip(hexPath);
  
  // Filter and sort trees
  const validTrees = trees.filter(tree => {
    const treeX = tree.x * size;
    const treeY = tree.y * size;
    const treeSize = tree.size * (size / 60);
    return isTreeInBounds(treeX, treeY, treeSize, size);
  });
  
  validTrees.sort((a, b) => a.y - b.y);
  
  // Draw trunks with sway
  validTrees.forEach(tree => {
    const treeX = tree.x * size;
    const treeY = tree.y * size;
    const treeSize = tree.size * (size / 60);
    const treePhase = tree.x * 3 + tree.y * 2;
    const swayOffset = Math.sin(time * 2 + treePhase) * 1;
    
    drawPineTree(ctx, treeX, treeY, treeSize, true, swayOffset);
  });
  
  // Draw foliage with sway
  validTrees.forEach(tree => {
    const treeX = tree.x * size;
    const treeY = tree.y * size;
    const treeSize = tree.size * (size / 60);
    const treePhase = tree.x * 3 + tree.y * 2;
    const swayOffset = Math.sin(time * 2 + treePhase) * 1;
    
    drawPineTree(ctx, treeX, treeY, treeSize, false, swayOffset);
  });
  
  // Draw hex border
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1 * zoom;
  ctx.stroke(hexPath);
}

// Helper function for seeded random (deterministic)
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Helper to check if tree bounds stay within hex
function isTreeInBounds(treeX, treeY, treeSize, hexSize) {
  const treeHeight = treeSize * 1.5;
  const treeWidth = treeSize * 0.7;
  
  const checkPoints = [
    { x: treeX, y: treeY - treeHeight },
    { x: treeX - treeWidth, y: treeY - treeHeight * 0.5 },
    { x: treeX + treeWidth, y: treeY - treeHeight * 0.5 },
    { x: treeX - treeWidth, y: treeY },
    { x: treeX + treeWidth, y: treeY },
  ];
  
  for (const point of checkPoints) {
    if (!isPointInHex(point.x, point.y, hexSize)) {
      return false;
    }
  }
  
  return true;
}

function isPointInHex(x, y, size) {
  const angles = [0, 60, 120, 180, 240, 300];
  const hexPoints = angles.map(angle => {
    const rad = (Math.PI / 180) * angle;
    return {
      x: size * Math.cos(rad),
      y: size * Math.sin(rad)
    };
  });
  
  let winding = 0;
  for (let i = 0; i < hexPoints.length; i++) {
    const p1 = hexPoints[i];
    const p2 = hexPoints[(i + 1) % hexPoints.length];
    
    if (p1.y <= y) {
      if (p2.y > y) {
        if (isLeft(p1, p2, {x, y}) > 0) {
          winding++;
        }
      }
    } else {
      if (p2.y <= y) {
        if (isLeft(p1, p2, {x, y}) < 0) {
          winding--;
        }
      }
    }
  }
  
  return winding !== 0;
}

function isLeft(p0, p1, p2) {
  return ((p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y));
}

function drawPineTree(ctx, x, y, treeSize, drawTrunkOnly = false, swayOffset = 0) {
  const trunkWidth = treeSize * 0.15;
  const trunkHeight = treeSize * 0.4;
  
  ctx.save();
  
  if (!drawTrunkOnly) {
    ctx.translate(x, y);
    ctx.rotate(swayOffset * 0.05);
    ctx.translate(-x, -y);
  }
  
  ctx.fillStyle = '#3d2817';
  ctx.fillRect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight);
  
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(x - trunkWidth / 2, y - trunkHeight * (i / 3));
    ctx.lineTo(x + trunkWidth / 2, y - trunkHeight * (i / 3));
    ctx.stroke();
  }
  
  if (!drawTrunkOnly) {
    const layers = 3;
    const greenColor = '#3a6b2e';
    
    for (let i = 0; i < layers; i++) {
      const layerY = y - trunkHeight - (i * treeSize * 0.25);
      const layerWidth = treeSize * (0.7 - i * 0.15);
      const layerHeight = treeSize * 0.35;
      const layerSwayMultiplier = 1 + i * 0.3;
      const layerSway = swayOffset * layerSwayMultiplier;
      
      ctx.fillStyle = greenColor;
      ctx.beginPath();
      ctx.moveTo(x + layerSway, layerY - layerHeight);
      ctx.lineTo(x - layerWidth + layerSway, layerY);
      ctx.lineTo(x + layerWidth + layerSway, layerY);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.moveTo(x + layerSway, layerY - layerHeight);
      ctx.lineTo(x - layerWidth * 0.3 + layerSway, layerY - layerHeight * 0.5);
      ctx.lineTo(x - layerWidth * 0.5 + layerSway, layerY);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.beginPath();
      ctx.moveTo(x + layerSway, layerY - layerHeight);
      ctx.lineTo(x + layerWidth * 0.3 + layerSway, layerY - layerHeight * 0.5);
      ctx.lineTo(x + layerWidth * 0.5 + layerSway, layerY);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.beginPath();
      ctx.moveTo(x - layerWidth * 0.6 + layerSway, layerY);
      ctx.lineTo(x + layerSway, layerY - layerHeight * 0.3);
      ctx.lineTo(x + layerWidth * 0.6 + layerSway, layerY);
      ctx.closePath();
      ctx.fill();
    }
  }
  
  ctx.restore();
}

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

export function drawWaterTerrain(ctx, size, terrain, zoom) {
  const time = Date.now() / 1000;
  
  const hexPath = createHexPath(size);
  
  // Base water color
  ctx.fillStyle = terrain.color;
  ctx.fill(hexPath);
  
  // Clip to hex
  ctx.save();
  ctx.clip(hexPath);
  
  // Draw animated wave layers
  const waveCount = 8;
  for (let i = 0; i < waveCount; i++) {
    const waveY = -size * 1.2 + (i * size * 0.3);
    const waveSpeed = 0.3 + i * 0.05;
    const wavePhase = time * waveSpeed + i * 0.5;
    const waveAmplitude = 8 + i * 2;
    const waveFrequency = 0.015 + i * 0.002;
    
    drawWave(ctx, waveY, wavePhase, waveAmplitude, waveFrequency, size, i);
  }
  
  // Add depth gradient
  const depthGradient = ctx.createLinearGradient(0, -size, 0, size);
  depthGradient.addColorStop(0, 'rgba(43, 95, 143, 0)');
  depthGradient.addColorStop(0.5, 'rgba(25, 55, 85, 0.1)');
  depthGradient.addColorStop(1, 'rgba(15, 35, 55, 0.3)');
  ctx.fillStyle = depthGradient;
  ctx.fill(hexPath);
  
  ctx.restore();
  
  // Draw hex border
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1 * zoom;
  ctx.stroke(hexPath);
}

function drawWave(ctx, baseY, phase, amplitude, frequency, size, layerIndex) {
  ctx.beginPath();
  
  const startX = -size * 1.5;
  const endX = size * 1.5;
  const points = 100;
  
  for (let i = 0; i <= points; i++) {
    const x = startX + (endX - startX) * (i / points);
    const y = baseY + Math.sin(x * frequency + phase) * amplitude;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  // Close the wave shape
  ctx.lineTo(endX, size * 2);
  ctx.lineTo(startX, size * 2);
  ctx.closePath();
  
  // More distinct waves with higher opacity and more contrast
  const opacity = 0.15 - layerIndex * 0.012;
  const lightness = layerIndex % 2 === 0 ? 255 : 180;
  ctx.fillStyle = `rgba(${lightness}, ${lightness}, 255, ${opacity})`;
  ctx.fill();
  
  // Add wave crest highlights
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const x = startX + (endX - startX) * (i / points);
    const y = baseY + Math.sin(x * frequency + phase) * amplitude;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

export function drawMountainTerrain(ctx, size, terrain, zoom) {
  // Default parameters - can be customized via terrain object
  // Scale factors relative to a reference size of 60
  const scale = size / (60 * 2) ;
  
  const params = {
    baseColor: terrain.baseColor || '#8B7969',
    shadowColor: terrain.shadowColor || '#4A4139',
    highlightColor: terrain.highlightColor || '#A89280',
    ridgeCount: terrain.ridgeCount || 20,
    ridgeSpacing: terrain.ridgeSpacing || 0.1,
    amplitudeBase: (terrain.amplitudeBase || 20) * scale,
    amplitudeVariance: terrain.amplitudeVariance || 0.5,
    frequencyBase: (terrain.frequencyBase || 0.025) / scale,
    frequencyVariance: terrain.frequencyVariance || 0.3,
    perspective: terrain.perspective || 0.8,
    jaggedness: (terrain.jaggedness || 7) * scale,
    stepSize: (terrain.stepSize || 20) * scale,
    roughness: terrain.roughness || 0.8,
    seed: terrain.seed || 45
  };

  const hexPath = createHexPath(size);
  
  // Base mountain color
  ctx.fillStyle = params.baseColor;
  ctx.fill(hexPath);
  
  // Clip to hex
  ctx.save();
  ctx.clip(hexPath);
  
  // Draw mountain ridges from back to front
  for (let i = 0; i < params.ridgeCount; i++) {
    const progress = i / (params.ridgeCount - 1);
    const ridgeY = -size + (i * size * params.ridgeSpacing);
    
    // Use seeded random for consistent but varied ridges
    const ridgeSeed = params.seed + i * 137;
    const amplitude = params.amplitudeBase * (1 + seededRandom(ridgeSeed) * params.amplitudeVariance);
    const frequency = params.frequencyBase * (1 + seededRandom(ridgeSeed + 1) * params.frequencyVariance);
    const phase = seededRandom(ridgeSeed + 2) * Math.PI * 2;
    
    // Perspective scaling
    const perspectiveScale = 1 - (1 - progress) * (1 - params.perspective);
    const scaledAmplitude = amplitude * perspectiveScale;
    const scaledJaggedness = params.jaggedness * perspectiveScale;
    
    // Color gradient from back to front
    const lightness = 0.25 + progress * 0.5;
    
    drawJaggedMountainRidge(
      ctx, 
      ridgeY, 
      phase, 
      scaledAmplitude, 
      frequency, 
      size, 
      i, 
      progress, 
      lightness,
      params.baseColor,
      params.shadowColor,
      params.highlightColor,
      scaledJaggedness,
      params.stepSize,
      params.roughness,
      ridgeSeed
    );
  }
  
  ctx.restore();
  
  // Draw hex border
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1 * zoom;
  ctx.stroke(hexPath);
}

function drawJaggedMountainRidge(ctx, baseY, phase, amplitude, frequency, size, layerIndex, progress, lightness, baseColor, shadowColor, highlightColor, jaggedness, stepSize, roughness, seed) {
  const startX = -size * 1.5;
  const endX = size * 1.5;
  
  // Calculate jagged ridge points with irregularity
  const ridgePoints = [];
  
  let currentX = startX;
  let stepIndex = 0;
  
  while (currentX < endX) {
    // Vary the step size randomly
    const stepSizeVariation = stepSize * (0.3 + seededRandom(seed + stepIndex * 23) * 1.4);
    
    // Calculate smooth curve position
    const smoothY1 = Math.sin(currentX * frequency + phase) * amplitude;
    const smoothY2 = Math.sin(currentX * frequency * 2.3 + phase * 1.5) * amplitude * 0.4;
    const smoothY3 = Math.sin(currentX * frequency * 0.7 + phase * 0.8) * amplitude * 0.6;
    const smoothY4 = Math.sin(currentX * frequency * 5.1 + phase * 2.1) * amplitude * 0.2;
    const smoothY = baseY + smoothY1 + smoothY2 + smoothY3 + smoothY4 - amplitude * 0.5;
    
    // Add irregular jagged stepping
    const rand1 = seededRandom(seed + stepIndex * 13);
    const rand2 = seededRandom(seed + stepIndex * 17);
    const rand3 = seededRandom(seed + stepIndex * 19);
    
    // Variable step pattern
    const stepPattern = rand1 > 0.3 ? 1 : rand1 > 0.1 ? 0.5 : 0;
    const stepOffset = stepPattern * jaggedness * (0.5 + rand2);
    
    // Multi-octave noise
    const randomOffset1 = (seededRandom(seed + stepIndex * 13) - 0.5) * jaggedness * roughness * 2;
    const randomOffset2 = (seededRandom(seed + stepIndex * 31) - 0.5) * jaggedness * roughness * 0.5;
    const randomOffset3 = (seededRandom(seed + stepIndex * 53) - 0.5) * jaggedness * roughness * 0.25;
    const totalRandomOffset = randomOffset1 + randomOffset2 + randomOffset3;
    
    const y = smoothY - stepOffset + totalRandomOffset;
    
    ridgePoints.push({x: currentX, y});
    
    // Add intermediate irregular points
    if (currentX + stepSizeVariation < endX) {
      const intermediateCount = rand3 > 0.7 ? 2 : 1;
      for (let j = 0; j < intermediateCount; j++) {
        const intermediateX = currentX + stepSizeVariation * ((j + 1) / (intermediateCount + 1));
        const intermediateRand = seededRandom(seed + stepIndex * 29 + j * 7);
        
        const intSmoothY1 = Math.sin(intermediateX * frequency + phase) * amplitude;
        const intSmoothY2 = Math.sin(intermediateX * frequency * 2.3 + phase * 1.5) * amplitude * 0.4;
        const intSmoothY3 = Math.sin(intermediateX * frequency * 0.7 + phase * 0.8) * amplitude * 0.6;
        const intSmoothY = baseY + intSmoothY1 + intSmoothY2 + intSmoothY3 - amplitude * 0.5;
        
        const intermediateY = intSmoothY + (intermediateRand - 0.5) * jaggedness * 1.5;
        
        ridgePoints.push({
          x: intermediateX,
          y: intermediateY
        });
      }
    }
    
    currentX += stepSizeVariation;
    stepIndex++;
  }
  
  // Ensure we reach the end
  if (ridgePoints[ridgePoints.length - 1].x < endX) {
    const finalY1 = Math.sin(endX * frequency + phase) * amplitude;
    const finalY2 = Math.sin(endX * frequency * 2.3 + phase * 1.5) * amplitude * 0.4;
    const finalY3 = Math.sin(endX * frequency * 0.7 + phase * 0.8) * amplitude * 0.6;
    const finalY = baseY + finalY1 + finalY2 + finalY3 - amplitude * 0.5;
    ridgePoints.push({x: endX, y: finalY});
  }
  
  // Draw the mountain ridge fill
  ctx.beginPath();
  ridgePoints.forEach((point, i) => {
    if (i === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.lineTo(endX, size * 2);
  ctx.lineTo(startX, size * 2);
  ctx.closePath();
  
  // Ridge color with depth-based shading
  const ridgeColor = interpolateColor(shadowColor, baseColor, lightness);
  ctx.fillStyle = ridgeColor;
  ctx.fill();
  
  // Add highlights on upper edges
  ctx.beginPath();
  for (let i = 0; i < ridgePoints.length - 1; i++) {
    const point = ridgePoints[i];
    const nextPoint = ridgePoints[i + 1];
    
    if (nextPoint.y < point.y) {
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(nextPoint.x, nextPoint.y);
      ctx.lineTo(nextPoint.x, nextPoint.y + 2);
      ctx.lineTo(point.x, point.y + 2);
    }
  }
  const highlightAlpha = 0.3 - progress * 0.25;
  ctx.fillStyle = `rgba(255, 248, 220, ${highlightAlpha})`;
  ctx.fill();
  
  // Add shadows on lower edges
  ctx.beginPath();
  for (let i = 0; i < ridgePoints.length - 1; i++) {
    const point = ridgePoints[i];
    const nextPoint = ridgePoints[i + 1];
    
    if (nextPoint.y > point.y) {
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(nextPoint.x, nextPoint.y);
      ctx.lineTo(nextPoint.x, nextPoint.y + amplitude * 0.2);
      ctx.lineTo(point.x, point.y + amplitude * 0.2);
    }
  }
  const shadowAlpha = 0.25 - progress * 0.2;
  ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
  ctx.fill();
  
  // Draw the ridge edge line
  ctx.beginPath();
  ridgePoints.forEach((point, i) => {
    if (i === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.strokeStyle = `rgba(0, 0, 0, ${0.15 - progress * 0.1})`;
  ctx.lineWidth = 1.5 - progress * 0.5;
  ctx.stroke();
}

function interpolateColor(color1, color2, factor) {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);
  
  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;
  
  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  return `rgb(${r}, ${g}, ${b})`;
}

export function drawGrassTerrain(ctx, size, terrain, zoom) {
  const hexPath = createHexPath(size);
  
  // Base grass color
  ctx.fillStyle = terrain.color;
  ctx.fill(hexPath);
  
  // Clip to hex
  ctx.save();
  ctx.clip(hexPath);
  
  const scale = size / 60;
  const seed = terrain.seed || 42;
  
  // Draw rolling hills using the mountain ridge technique
  const hillParams = {
    ridgeCount: 14,
    ridgeSpacing: 0.14,
    amplitudeBase: 5 * scale,
    amplitudeVariance: 0.35,
    frequencyBase: 0.050 / scale,
    frequencyVariance: 0.35,
    perspective: 0.80,
    jaggedness: 1.0 * scale,
    stepSize: 10 * scale,
    roughness: 0.00,
    seed: seed + 57,
    // Grass colors instead of mountain colors
    baseColor: terrain.color,
    shadowColor: darkenColor(terrain.color, 15),
    highlightColor: lightenColor(terrain.color, 15)
  };
  
  for (let i = 0; i < hillParams.ridgeCount; i++) {
    const progress = i / (hillParams.ridgeCount - 1);
    const ridgeY = -size + (i * size * hillParams.ridgeSpacing);
    
    const ridgeSeed = hillParams.seed + i * 137;
    const amplitude = hillParams.amplitudeBase * (1 + seededRandom(ridgeSeed) * hillParams.amplitudeVariance);
    const frequency = hillParams.frequencyBase * (1 + seededRandom(ridgeSeed + 1) * hillParams.frequencyVariance);
    const phase = seededRandom(ridgeSeed + 2) * Math.PI * 2;
    
    const perspectiveScale = 1 - (1 - progress) * (1 - hillParams.perspective);
    const scaledAmplitude = amplitude * perspectiveScale;
    const scaledJaggedness = hillParams.jaggedness * perspectiveScale;
    
    const lightness = 0.25 + progress * 0.5;
    
    drawJaggedMountainRidge(
      ctx, 
      ridgeY, 
      phase, 
      scaledAmplitude, 
      frequency, 
      size, 
      i, 
      progress, 
      lightness,
      hillParams.baseColor,
      hillParams.shadowColor,
      hillParams.highlightColor,
      scaledJaggedness,
      hillParams.stepSize,
      hillParams.roughness,
      ridgeSeed
    );
  }
  
  // Add organic patches for variation
  // const patchCount = 8;
  // for (let i = 0; i < patchCount; i++) {
  //   const patchX = (seededRandom(seed + i * 2) - 0.5) * size * 1.2;
  //   const patchY = (seededRandom(seed + i * 2 + 1) - 0.5) * size * 1.2;
  //   const patchRadius = (15 + seededRandom(seed + i * 3) * 25) * scale;
    
  //   const gradient = ctx.createRadialGradient(patchX, patchY, 0, patchX, patchY, patchRadius);
  //   const isDark = seededRandom(seed + i * 4) > 0.5;
  //   const opacity = 0.06 + seededRandom(seed + i * 5) * 0.06;
    
  //   if (isDark) {
  //     gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity})`);
  //     gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  //   } else {
  //     gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
  //     gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  //   }
    
  //   ctx.fillStyle = gradient;
  //   ctx.fill(hexPath);
  // }
  
  // // Add subtle shading gradient
  // const shadeGradient = ctx.createLinearGradient(-size, -size, size, size);
  // shadeGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
  // shadeGradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
  // ctx.fillStyle = shadeGradient;
  // ctx.fill(hexPath);
  
  ctx.restore();
  
  // Draw hex border
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1 * zoom;
  ctx.stroke(hexPath);
}

// Helper functions for grass colors
function darkenColor(color, percent) {
  // Simple darkening - you might want to make this more sophisticated
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);
  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}



export function drawSandTerrain(ctx, size, terrain, zoom) {
  const hexPath = createHexPath(size);
  
  // Base sand color
  ctx.fillStyle = terrain.color;
  ctx.fill(hexPath);
  
  // Clip to hex
  ctx.save();
  ctx.clip(hexPath);
  
  const scale = size / 60;
  const seed = terrain.seed || 4;
  
  // Draw sand dunes/ripples
  const duneCount = 6;
  for (let i = 0; i < duneCount; i++) {
    const duneY = -size + (i * size * 0.3) + seededRandom(seed + 500 + i) * size * 0.1;
    const amplitude = (8 + seededRandom(seed + 600 + i) * 12) * scale;
    const frequency = (0.01 + seededRandom(seed + 700 + i) * 0.015) / scale;
    const phase = seededRandom(seed + 800 + i) * Math.PI * 2;
    
    drawSandDune(ctx, duneY, phase, amplitude, frequency, size, i);
  }
  
  // Add overall shading for depth
  const shadeGradient = ctx.createLinearGradient(-size * 0.5, -size * 0.5, size * 0.5, size * 0.5);
  shadeGradient.addColorStop(0, 'rgba(255, 255, 200, 0.08)');
  shadeGradient.addColorStop(1, 'rgba(139, 119, 101, 0.12)');
  ctx.fillStyle = shadeGradient;
  ctx.fill(hexPath);
  
  ctx.restore();
  
  // Draw hex border
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1 * zoom;
  ctx.stroke(hexPath);
}

function drawSandDune(ctx, baseY, phase, amplitude, frequency, size) {
  const startX = -size * 1.5;
  const endX = size * 1.5;
  const points = 50;
  
  // Draw dune shadow
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const x = startX + (endX - startX) * (i / points);
    const y = baseY + Math.sin(x * frequency + phase) * amplitude;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.lineTo(endX, baseY + amplitude * 2);
  ctx.lineTo(startX, baseY + amplitude * 2);
  ctx.closePath();
  
  ctx.fillStyle = `rgba(139, 119, 101, 0.06)`;
  ctx.fill();
  
  // Draw dune highlight
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const x = startX + (endX - startX) * (i / points);
    const y = baseY + Math.sin(x * frequency + phase) * amplitude;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.strokeStyle = `rgba(255, 248, 220, 0.04)`;
  ctx.lineWidth = 2;
  ctx.stroke();
}