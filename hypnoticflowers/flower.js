class Flower {
  /**
   * Represents a single concentric mathematical layer of the hypnotic flower.
   * @param {number} index - The layer index (used for scaling and phase calculation).
   * @param {number} baseRadius - The base radius of the layer.
   * @param {number} petals - The number of lobes/petals.
   * @param {number} amplitude - The depth/amplitude of the petals.
   * @param {number} rotationSpeed - The speed and direction of spin.
   */
  constructor(index, baseRadius, petals, amplitude, rotationSpeed) {
    this.index = index;
    this.baseRadius = baseRadius;
    this.petals = petals;
    this.amplitude = amplitude;
    this.rotation = 0;
    this.rotationSpeed = rotationSpeed;
    // Introduce a unique phase shift for the breathing/pulsing animation
    this.pulsePhase = index * (360 / 8); 
  }

  /**
   * Renders the flower layer to the canvas.
   * @param {number} timeFrame - Elapsed time/frame counter for calculations.
   */
  display(timeFrame) {
    // 1. Calculate color using HSL interpolation
    // baseHue, colorSpread, globalSpeed, enableGlow, and breathingDepth are global sketch variables.
    let layerHue = (baseHue + this.index * colorSpread) % 360;
    
    // Bright neon styling with high saturation
    stroke(layerHue, 85, 60);
    noFill();
    strokeWeight(1.8 + (12 - this.index) * 0.15); // Outer lines are slightly bolder for balance

    // 2. High-performance canvas vector glow
    if (enableGlow) {
      drawingContext.shadowBlur = 12 + this.index * 1.5;
      drawingContext.shadowColor = `hsla(${Math.floor(layerHue)}, 90%, 60%, 0.45)`;
    } else {
      drawingContext.shadowBlur = 0;
    }

    // 3. Dynamic breathing calculations
    // Modulate the size of this layer over time using sine breathing
    let breathe = sin(timeFrame * 0.8 + this.pulsePhase) * breathingDepth;
    let currentBaseRadius = max(5, this.baseRadius + breathe);

    // 4. Trace the flower shape using parametric coordinates
    beginShape();
    let pts = 360; // One vertex per degree for perfect curvature
    for (let i = 0; i < pts; i++) {
      let angle = i;
      
      // Parametric radial wave offset to create the lobes (petals)
      let radOffset = this.amplitude * cos(angle * this.petals);
      let totalRadius = currentBaseRadius + radOffset;

      // Handle interactive mouse magnetic distortions (if enabled)
      if (enableMouseInteractive) {
        let mouseDist = dist(mouseX - width / 2, mouseY - height / 2, 0, 0);
        let pullFactor = map(mouseDist, 0, width / 2, 0.4, 0, true);
        totalRadius *= (1 + pullFactor * cos(angle * 2 + timeFrame * 2) * 0.15);
      }

      // Convert polar coordinates to Cartesian coordinates
      let x = totalRadius * cos(angle + this.rotation);
      let y = totalRadius * sin(angle + this.rotation);
      vertex(x, y);
    }
    endShape(CLOSE);

    // 5. Update rotation based on direction and speed
    // globalSpeed acts as a multiplier from the control panel
    this.rotation += this.rotationSpeed * globalSpeed;
  }
}
