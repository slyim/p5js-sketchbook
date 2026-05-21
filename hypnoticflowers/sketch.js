// Active list of nested concentric flower layers
let flowers = [];
let timeFrame = 0;
let isPlaying = true;

// --- Global parameters synced with dashboard UI ---
let globalSpeed = 1.0;
let baseHue = 225; // ambient shifting starting hue
let colorSpread = 15;
let breathingDepth = 30;
let enableGlow = true;
let enableTrails = true;
let enableMouseInteractive = false;

// --- Preset Configuration definitions ---
const PRESETS = {
  cosmic: {
    speed: 0.8,
    layers: 6,
    petals: 8,
    breathing: 35,
    spread: 18,
    glow: true,
    trails: true,
    mouse: false
  },
  vortex: {
    speed: 1.6,
    layers: 9,
    petals: 5,
    breathing: 50,
    spread: 28,
    glow: true,
    trails: true,
    mouse: false
  },
  zen: {
    speed: 0.3,
    layers: 4,
    petals: 12,
    breathing: 20,
    spread: 8,
    glow: true,
    trails: false,
    mouse: false
  },
  cyber: {
    speed: 1.3,
    layers: 10,
    petals: 7,
    breathing: 12,
    spread: 24,
    glow: false,
    trails: false,
    mouse: true
  }
};

function setup() {
  // Create responsive full-screen canvas
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.body);
  
  // HSL color space enables stunning saturation and simple hue shifts
  colorMode(HSL, 360, 100, 100, 1.0);
  angleMode(DEGREES);
  
  // Set up event listeners for the dashboard overlay
  initializeUI();
  
  // Load default Cosmic preset to start
  loadPreset("cosmic");
}

function draw() {
  // 1. Motion Trail control: semi-transparent background preserves past frames
  if (enableTrails) {
    background(240, 45, 6, 0.11); 
  } else {
    background(240, 45, 6, 1.0); // Opaque background, no trails
  }

  // 2. Center coordinates for sacred geometry rendering
  translate(width / 2, height / 2);

  // 3. Render all layered flower nodes
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].display(timeFrame);
  }

  // 4. Update the time clock and shift base ambient color
  if (isPlaying) {
    timeFrame += 1;
    baseHue = (baseHue + 0.15) % 360;
  }
}

/**
 * Recreate the array of Flower layers using current UI settings.
 * Dimensions are automatically calculated to scale with the canvas viewport.
 */
function recreateFlowers() {
  flowers = [];
  
  let layerCount = int(document.getElementById('layers-slider').value);
  let baseSymmetry = int(document.getElementById('petals-slider').value);
  
  // Scale flower bounds relative to screen size (fitting within screen nicely)
  let maxDimension = min(width, height);
  let outerBound = maxDimension * 0.40;
  let innerBound = maxDimension * 0.08;
  
  // Space layers out evenly
  let spacing = (outerBound - innerBound) / max(1, layerCount - 1);

  for (let i = 0; i < layerCount; i++) {
    let radius = innerBound + i * spacing;
    
    // Rotate alternating layers in opposite directions to generate moiré patterns
    let dir = (i % 2 === 0) ? 1 : -1;
    
    // Outer layers rotate slightly slower for mathematical harmony
    let layerSpeed = dir * (1.2 - i * (0.6 / max(1, layerCount)));
    
    // Petal amplitude scales relative to the layer's size
    let amp = radius * 0.28;
    
    // Multipliers for varying petal counts could be introduced, but uniform symmetry yields optimal geometry
    flowers.push(new Flower(i, radius, baseSymmetry, amp, layerSpeed));
  }
}

/**
 * Binds all HTML sidebar elements to global parameters and event actions.
 */
function initializeUI() {
  // Sliders binding
  const sliders = [
    { id: 'speed-slider', varName: 'globalSpeed', suffix: 'x' },
    { id: 'layers-slider', action: recreateFlowers, suffix: '' },
    { id: 'petals-slider', action: recreateFlowers, suffix: '' },
    { id: 'breathing-slider', varName: 'breathingDepth', suffix: 'px' },
    { id: 'color-slider', varName: 'colorSpread', suffix: '°' }
  ];

  sliders.forEach(sliderDef => {
    const el = document.getElementById(sliderDef.id);
    if (!el) return;

    el.addEventListener('input', () => {
      const val = parseFloat(el.value);
      
      // Update bound global variable
      if (sliderDef.varName) {
        window[sliderDef.varName] = val;
      }
      
      // Update visual text display
      const displayEl = document.getElementById(sliderDef.id.replace('-slider', '-value'));
      if (displayEl) {
        displayEl.textContent = val + sliderDef.suffix;
      }
      
      // Execute trigger action (e.g. recreate flowers)
      if (sliderDef.action) {
        sliderDef.action();
      }
    });
  });

  // Toggles binding
  const toggles = [
    { id: 'glow-toggle', varName: 'enableGlow' },
    { id: 'trails-toggle', varName: 'enableTrails' },
    { id: 'mouse-toggle', varName: 'enableMouseInteractive' }
  ];

  toggles.forEach(toggleDef => {
    const el = document.getElementById(toggleDef.id);
    if (!el) return;
    el.addEventListener('change', () => {
      window[toggleDef.varName] = el.checked;
    });
  });

  // Preset Buttons binding
  const presetButtons = document.querySelectorAll('.preset-btn');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Manage CSS active state
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Load selected preset properties
      loadPreset(btn.getAttribute('data-preset'));
    });
  });

  // Actions buttons binding
  document.getElementById('play-pause-btn')?.addEventListener('click', togglePlayPause);
  document.getElementById('randomize-btn')?.addEventListener('click', triggerRandomize);
  document.getElementById('save-btn')?.addEventListener('click', saveArtwork);
  document.getElementById('fullscreen-btn')?.addEventListener('click', toggleFullscreenState);
}

/**
 * Loads values from a predefined preset structure and updates the visual UI.
 * @param {string} presetName 
 */
function loadPreset(presetName) {
  const settings = PRESETS[presetName];
  if (!settings) return;

  // 1. Sync global variables
  globalSpeed = settings.speed;
  breathingDepth = settings.breathing;
  colorSpread = settings.spread;
  enableGlow = settings.glow;
  enableTrails = settings.trails;
  enableMouseInteractive = settings.mouse;

  // 2. Update Slider values and display text
  updateSliderUI('speed-slider', settings.speed, 'x');
  updateSliderUI('layers-slider', settings.layers, '');
  updateSliderUI('petals-slider', settings.petals, '');
  updateSliderUI('breathing-slider', settings.breathing, 'px');
  updateSliderUI('color-slider', settings.spread, '°');

  // 3. Update Toggle states
  updateToggleUI('glow-toggle', settings.glow);
  updateToggleUI('trails-toggle', settings.trails);
  updateToggleUI('mouse-toggle', settings.mouse);

  // 4. Regenerate concentric layer list
  recreateFlowers();
}

/** Helper to update a slider element and its visual value text */
function updateSliderUI(id, val, suffix) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = val;
  const displayEl = document.getElementById(id.replace('-slider', '-value'));
  if (displayEl) {
    displayEl.textContent = val + suffix;
  }
}

/** Helper to update a toggle checkbox state */
function updateToggleUI(id, checked) {
  const el = document.getElementById(id);
  if (el) el.checked = checked;
}

/** Play / Pause simulation controller */
function togglePlayPause() {
  const btn = document.getElementById('play-pause-btn');
  if (isPlaying) {
    isPlaying = false;
    btn.textContent = "Play";
    btn.classList.remove('primary');
    btn.classList.add('secondary');
  } else {
    isPlaying = true;
    btn.textContent = "Pause";
    btn.classList.remove('secondary');
    btn.classList.add('primary');
  }
}

/** Save/Export screenshot trigger */
function saveArtwork() {
  saveCanvas('hypnotic_flower', 'png');
}

/** Toggle full-screen mode on the viewport */
function toggleFullscreenState() {
  let fs = fullscreen();
  fullscreen(!fs);
  const btn = document.getElementById('fullscreen-btn');
  if (btn) {
    btn.textContent = fs ? "Fullscreen" : "Exit Fullscreen";
  }
}

/**
 * Procedurally generates random visual values to construct a brand new geometry.
 */
function triggerRandomize() {
  // Clear any active preset highlights
  document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));

  // Generate random settings matching aesthetically pleasant ranges
  const randSpeed = parseFloat((random(0.1, 2.5)).toFixed(1));
  const randLayers = int(random(3, 12));
  const randPetals = int(random(2, 20));
  const randBreathing = int(random(5, 75));
  const randSpread = int(random(4, 45));
  const randGlow = random() > 0.3;     // 70% chance of glow
  const randTrails = random() > 0.2;   // 80% chance of trails
  const randMouse = random() > 0.7;    // 30% chance of mouse interaction

  // Sync variables
  globalSpeed = randSpeed;
  breathingDepth = randBreathing;
  colorSpread = randSpread;
  enableGlow = randGlow;
  enableTrails = randTrails;
  enableMouseInteractive = randMouse;

  // Sync UI controls
  updateSliderUI('speed-slider', randSpeed, 'x');
  updateSliderUI('layers-slider', randLayers, '');
  updateSliderUI('petals-slider', randPetals, '');
  updateSliderUI('breathing-slider', randBreathing, 'px');
  updateSliderUI('color-slider', randSpread, '°');
  updateToggleUI('glow-toggle', randGlow);
  updateToggleUI('trails-toggle', randTrails);
  updateToggleUI('mouse-toggle', randMouse);

  // Set randomized starting hue
  baseHue = int(random(0, 360));

  // Re-render
  recreateFlowers();
}

/**
 * Ensures responsive canvas behavior when the browser layout changes.
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  recreateFlowers();
}
