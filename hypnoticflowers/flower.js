class Flower {
  /**
   * Represents a single concentric layer of the hypnotic flower.
   * @param {number} index - The layer index.
   * @param {number} baseRadius - The base radius of this layer.
   * @param {number} petals - The number of lobes/petals.
   * @param {number} amplitude - The depth/amplitude of the petals.
   * @param {number} rotationSpeed - The direction and velocity of spin.
   */
  constructor(index, baseRadius, petals, amplitude, rotationSpeed) {
    this.index = index;
    this.baseRadius = baseRadius;
    this.petals = petals;
    this.amplitude = amplitude;
    this.rotation = 0;
    this.rotationSpeed = rotationSpeed;
    this.pulsePhase = index * 40; // Unique breathing offset for each layer
  }

  /**
   * Automatically draws and animates the flower layer.
   * @param {number} time - Elapsed time frame counter.
   */
  display(time) {
    // 1. Alternating complementary hues (180 degrees apart) with soft analogous offsets
    let hueOffset = (this.index % 2 === 0) ? 0 : 180;
    let layerHue = (baseHue + hueOffset + this.index * 4) % 360;
    
    // Saturation and lightness for highly vibrant complementary matching colors
    stroke(layerHue, 92, 58);
    strokeWeight(1.8 + (8 - this.index) * 0.15); // Outer rings are bolder
    noFill();

    // 2. High-performance canvas glowing vectors
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = `hsla(${Math.floor(layerHue)}, 95%, 60%, 0.45)`;

    // 3. Automatic organic breathing scale (using sine wave modulation)
    let breathe = sin(time * 1.6 + this.pulsePhase) * 22;
    let r = max(5, this.baseRadius + breathe);

    // 4. Trace the flower shape using parametric angles
    beginShape();
    let pts = 360;
    for (let i = 0; i < pts; i++) {
      let angle = i;
      
      // Dynamic multi-harmonic petal wave for elegant organic complexity
      let f_radius = this.amplitude * cos(angle * this.petals);
      let secondaryHarmonic = (this.amplitude * 0.25) * sin(angle * this.petals * 2);
      let totalRadius = max(5, r + f_radius + secondaryHarmonic);

      // Polar to Cartesian coordinate mapping
      let x = totalRadius * cos(angle + this.rotation);
      let y = totalRadius * sin(angle + this.rotation);
      vertex(x, y);
    }
    endShape(CLOSE);

    // 5. Update rotation
    this.rotation += this.rotationSpeed;
  }
}
