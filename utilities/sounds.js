/**
 * Plays a two-click building place sound
 * @param {Object} options - Sound configuration
 * @param {number} options.freq1 - First click frequency in Hz (default: 800)
 * @param {number} options.vol1 - First click volume 0-1 (default: 0.25)
 * @param {number} options.freq2 - Second click frequency in Hz (default: 1000)
 * @param {number} options.vol2 - Second click volume 0-1 (default: 0.20)
 * @param {number} options.delay - Delay between clicks in seconds (default: 0.08)
 * @param {number} options.duration - Click duration in seconds (default: 0.06)
 */
export function playBuildingSound(options = {}) {
  const config = {
    freq1: options.freq1 || 800,
    vol1: options.vol1 || 0.25,
    freq2: options.freq2 || 1000,
    vol2: options.vol2 || 0.20,
    delay: options.delay || 0.08,
    duration: options.duration || 0.06
  };

  const layers = [
    {
      type: 'sine',
      frequency: config.freq1,
      volume: config.vol1,
      duration: config.duration,
      attack: 0.005
    },
    {
      type: 'sine',
      frequency: config.freq2,
      volume: config.vol2,
      duration: config.duration,
      attack: 0.005,
      delay: config.delay
    }
  ];

  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const now = ctx.currentTime;

  layers.forEach(layer => {
    // Create noise for click
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter the noise to create click sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = layer.frequency;
    filter.Q.value = 2;

    const gain = ctx.createGain();

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    const startTime = now + (layer.delay || 0);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(layer.volume, startTime + layer.attack);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + layer.duration);

    noise.start(startTime);
    noise.stop(startTime + layer.duration + 0.1);
  });
}

export function playRemovalSound(options = {}) {
  const config = {
    freq1: options.freq1 || 600,
    vol1: options.vol1 || 0.30,
    freq2: options.freq2 || 400,
    vol2: options.vol2 || 0.25,
    delay: options.delay || 0.06,
    duration: options.duration || 0.08
  };

  const layers = [
    {
      type: 'sine',
      frequency: config.freq1,
      volume: config.vol1,
      duration: config.duration,
      attack: 0.005
    },
    {
      type: 'sine',
      frequency: config.freq2,
      volume: config.vol2,
      duration: config.duration,
      attack: 0.005,
      delay: config.delay
    }
  ];

  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const now = ctx.currentTime;

  layers.forEach(layer => {
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = layer.frequency;
    filter.Q.value = 2;

    const gain = ctx.createGain();

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    const startTime = now + (layer.delay || 0);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(layer.volume, startTime + layer.attack);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + layer.duration);

    noise.start(startTime);
    noise.stop(startTime + layer.duration + 0.1);
  });
}