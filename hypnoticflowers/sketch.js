let flowers = [];
let baseHue = 190; // Starts in beautiful cyan-blue spectrum
let timeFrame = 0;

function setup() {
  // Create responsive full-screen canvas
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.body);
  
  // Set up rendering context parameters
  colorMode(HSL, 360, 100, 100, 1.0);
  angleMode(DEGREES);
  
  initializeFlowers();
}

function draw() {
  // Draw transparent dark background to preserve previous frames (motion trails)
  background(240, 50, 4, 0.08); 
  
  // Translate coordinate origin to screen center for radial symmetry
  translate(width / 2, height / 2);
  
  // Render and animate all layers
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].display(timeFrame);
  }
  
  // Increment animation state and slowly shift color palette over time
  timeFrame += 0.8;
  baseHue = (baseHue + 0.18) % 360;
}

/**
 * Initializes the collection of Concentric Flower Layers.
 * Layer spacing, shapes, and speeds are dynamically scaled with the viewport.
 */
function initializeFlowers() {
  flowers = [];
  let layerCount = 8;
  let baseSymmetry = 6; // Starting symmetry (petals)
  
  // Max size calculations
  let maxDimension = min(width, height);
  let outerBound = maxDimension * 0.42;
  let innerBound = maxDimension * 0.08;
  let spacing = (outerBound - innerBound) / (layerCount - 1);
  
  for (let i = 0; i < layerCount; i++) {
    let radius = innerBound + i * spacing;
    
    // Alternate direction: even layers spin clockwise, odd spin counter-clockwise
    let dir = (i % 2 === 0) ? 1 : -1;
    
    // Rotate speed: outer rings spin slightly slower for organic motion
    let speed = dir * (1.1 - i * 0.07);
    
    // Alternate symmetries between rings (e.g. 6 and 9 petals) to construct
    // beautiful overlapping moiré/hypnotic geometric interference patterns
    let petals = (i % 2 === 0) ? baseSymmetry : baseSymmetry + 3;
    
    // Petal depth scales harmoniously with layer size
    let amp = radius * 0.22;
    
    flowers.push(new Flower(i, radius, petals, amp, speed));
  }
}

/**
 * Automatically adjusts canvas bounds and recalculates geometric scaling
 * when the browser window is resized.
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeFlowers();
}
