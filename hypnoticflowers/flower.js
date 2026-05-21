class Flower {
  constructor() {
    this.x = [];
    this.y = [];
  }

  display() {
    stroke(0);
    noFill();
    beginShape();

    for (let i = 0; i < pts; i++) {
      let angle = (i / pts) * 360;
      f_radius = f_amp * cos(angle * period);
      this.x[i] = (r + f_radius) * cos(angle + rotate);
      this.y[i] = (r + f_radius) * sin(angle + rotate);
      vertex(this.x[i], this.y[i]);
    }
    endShape(CLOSE);

    rotate++;
  }
}
