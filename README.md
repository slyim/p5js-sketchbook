<div align="center">

# ✨ p5.js Sketchbook ✨

Welcome to my personal, interactive playground for **generative art**, **visual mathematics**, and **creative computing** built with [p5.js](https://p5js.org/).

🎨 **[Explore the Live Gallery Portfolio](https://slyim.github.io/p5js-sketchbook/)** 🎨

[![p5.js](https://img.shields.io/badge/Library-p5.js-ED225D?style=for-the-badge&logo=p5dotjs&logoColor=white)](https://p5js.org/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/Hosted_With-GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://slyim.github.io/p5js-sketchbook/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blueviolet.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br>

<a href="https://slyim.github.io/p5js-sketchbook/" target="_blank">
  <img src="https://img.shields.io/badge/🚀__LAUNCH__GALLERY-Click__to__Explore__Sketches-00f2fe?style=for-the-badge&logo=github&logoColor=white&labelColor=0d111c" alt="Launch Live Portal" height="42" />
</a>

<br>
<br>

A premium, glassmorphic landing portal built with vanilla HTML, HSL neon-mesh CSS gradients, and custom iframe preview logic. Load, run, and play with sketches in-place or launch them full-screen!

</div>

---

## 🔮 Interactive Features

*   **⚡ In-Place Quick Preview**: Play with any canvas sketch directly within a glowing glassmorphic modal window.
*   **🔋 Performance Optimized**: Modal automatically unloads running canvases upon closing (`about:blank`) to preserve local CPU/RAM.
*   **🕹️ Seamless Controls**: Automatically focuses the iframe environment so key listeners and mouse triggers capture instant interactivity.
*   **🎨 Neo-Mesh Aesthetics**: Custom animated radial gradients slowly drifting in the background for a state-of-the-art visual experience.

---

## 📂 Repository Structure

Each generative sketch is completely self-contained in its own subdirectory:
```bash
/ (root)
├── index.html          # Portal Landing Page
├── styles.css          # Dark-Neon Glassmorphic Stylesheet
├── app.js              # Portal Interactive Logic
└── hypnoticflowers/    # Sketch Directory
    ├── index.html      # Canvas Container Page
    ├── style.css       # Clean canvas layout styles
    ├── sketch.js       # Main p5.js animation loop & states
    └── flower.js       # Encapsulated flower rendering module
```

---

## 🎨 Featured Sketches

### 🌀 1. Hypnotic Flowers (`/hypnoticflowers`)
An elegant, self-running sacred geometry visualizer featuring concentric layered flowers that bloom, rotate, and cycle HSL spectrums automatically.

*   **Moiré Geometric Interference**: 8 concentric rings spin in alternating directions at micro-adjusted speeds. Symmetries alternate (6 and 9 petals) to generate intricate interference patterns.
*   **Parametric Multi-Harmonics**: Delicate organic contours mapped mathematically:
    $$r = \text{baseRadius} + A_1 \cdot \cos(\theta \cdot \text{petals}) + A_2 \cdot \sin(\theta \cdot \text{petals} \cdot 2)$$
*   **Complementary HSL Cycles**: Adjacent layers spin offset by $180^\circ$ on the HSL spectrum, paired with analogous time-based color drifting.
*   **Neon Glowing Trails**: Native vector shadow blurs combined with soft-erasing frame trails produce floating, fluid motion blurs.

---

## 🛠️ Local Setup & Play

To run and experiment with these sketches locally:

1. Clone this repository to your machine:
   ```bash
   git clone https://github.com/slyim/p5js-sketchbook.git
   cd p5js-sketchbook
   ```
2. Spin up the lightweight local dev server using Bun:
   ```bash
   bun run server.js
   ```
3. Open `http://localhost:3000` in your favorite web browser and explore!

---

<div align="center">

✨ Created with love, mathematics, and creative code. ✨

</div>
