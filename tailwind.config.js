/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/src/keep-preset.js";

export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  presets: [keepPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};
