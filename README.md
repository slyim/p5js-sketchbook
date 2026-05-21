# p5.js Sketchbook

Welcome to my personal playground for generative art, visual mathematics, and interactive canvas sketches built using [p5.js](https://p5js.org/). 

This repository is modeled similarly to my `processing-sketchbook` repository, but is tailored specifically for **p5.js** and JavaScript-based web animations instead of Java/Processing.

---

## 📂 Repository Structure

Each sketch is self-contained in its own directory, featuring:
- `index.html` - The webpage container hosting the sketch and the p5.js library CDN.
- `style.css` - Basic styling to render the canvas cleanly on screen.
- `sketch.js` - The main p5.js loop managing canvas setup, time states, coordinate systems, and drawing loops.
- `flower.js` (or other script modules) - Self-contained classes or helper modules encapsulating rendering logic.

To view any sketch, simply clone this repository and open the corresponding `index.html` file in any modern web browser.

---

## 🎨 Featured Sketches

### 🌀 1. Hypnotic Flowers (`/hypnoticflowers`)
An elegant, self-running sacred geometry visualizer featuring concentric layered flowers that bloom, rotate, and cycle colors automatically.

- **Moiré Geometric Interference**: 8 concentric rings spin in alternating clockwise/counter-clockwise directions at varying speeds. The rings alternate symmetries (6 and 9 petals respectively) to generate complex geometric interference patterns.
- **Parametric Multi-Harmonics**: Traces coordinates using multi-harmonic sine/cosine perturbations to render delicate organic contours:
  $$r = \text{baseRadius} + A_1 \cdot \cos(\theta \cdot \text{petals}) + A_2 \cdot \sin(\theta \cdot \text{petals} \cdot 2)$$
- **Complementary HSL Cycles**: Adjacent layers alternate by a complementary offset ($180^\circ$ apart on the color wheel) combined with analogous HSL color drifting over time, producing beautiful interlacing color pairs.
- **Neon Glow & Trails**: Integrates native canvas vector shadow blur and soft-erasing frame trails to yield fluid, glowing motion blurs.
