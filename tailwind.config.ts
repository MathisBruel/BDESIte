import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#CC3533",
          yellow: "#f8cf0e",
          pale: "#ffe492",
          black: "#000000",
          white: "#ffffff",
        },
      },
      backgroundImage: {
        "grad-primary": "linear-gradient(135deg, #6b6969 0%, #ffffff 100%)",
        "grad-secondary": "linear-gradient(90deg, #bd443d 0%, #f2d02b 100%)",
      },
      fontFamily: {
        spartan: ["var(--font-league-spartan)", "sans-serif"],
        merriweather: ["var(--font-merriweather)", "serif"],
        chunk: [
          "var(--font-chunk-five)",
          "Impact",
          "Bebas Neue",
          "Arial Black",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;

