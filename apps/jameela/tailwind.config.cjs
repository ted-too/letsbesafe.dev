/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    colors: {
      white: "#FFFFFF",
      "w-overlay": {
        DEFAULT: "rgba(255,255,255,0.1)",
        100: "rgba(255,255,255,0.1)",
        200: "rgba(255,255,255,0.2)",
        300: "rgba(255,255,255,0.3)",
        400: "rgba(255,255,255,0.4)",
        500: "rgba(255,255,255,0.5)",
        600: "rgba(255,255,255,0.6)",
        700: "rgba(255,255,255,0.7)",
        800: "rgba(255,255,255,0.8)",
        900: "rgba(255,255,255,0.9)",
      },
      dark: {
        DEFAULT: "#030303",
        50: "#B8B8B8",
        100: "#AEAEAE",
        200: "#999999",
        300: "#858585",
        400: "#717171",
        500: "#5C5C5C",
        600: "#484848",
        700: "#333333",
        800: "#1F1F1F",
        900: "#030303",
      },
      pink: {
        DEFAULT: "#EA526F",
        50: "#FEF6F7",
        100: "#FCE4E8",
        200: "#F7BFCA",
        300: "#F39BAC",
        400: "#EE768D",
        500: "#EA526F",
      },
      blue: {
        DEFAULT: "#449DD1",
        50: "#D7EAF5",
        100: "#C7E2F1",
        200: "#A6D0E9",
        300: "#85BFE1",
        400: "#65AED9",
        500: "#449DD1",
      },
    },
    extend: {
      screens: {
        "1.5xl": "1366px",
      },
    },
  },
  plugins: [],
};
