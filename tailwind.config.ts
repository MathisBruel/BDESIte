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
          rouge: "#ff0200",
          or: "#ffc700",
          noir: "#150000",
          craie: "#f1f1f1",
          blanc: "#ffffff",
          // legacy aliases — retire progressivement
          red: "#ff0200",
          yellow: "#ffc700",
          pale: "#ffc700",
          black: "#150000",
          white: "#ffffff",
        },
      },
      backgroundImage: {
        // Texture peinture/spray extraite de la charte : rouge → orange → or
        "grad-spray": "linear-gradient(105deg, #ff0200 0%, #ff6b00 45%, #ffc700 100%)",
        // Garde pour rétrocompat admin
        "grad-primary": "linear-gradient(90deg, #ffc700 0%, #ffffff 100%)",
        "grad-secondary": "linear-gradient(105deg, #ff0200 0%, #ff6b00 45%, #ffc700 100%)",
      },
      fontFamily: {
        spartan: ["var(--font-league-spartan)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
        dancing: ["var(--font-dancing-script)", "cursive"],
        // legacy — retire progressivement
        merriweather: ["var(--font-lato)", "sans-serif"],
        chunk: ["var(--font-league-spartan)", "Impact", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        // Ombre dure façon sticker (offset net, pas de blur)
        sticker: "4px 5px 0px #150000",
        "sticker-or": "4px 5px 0px #ffc700",
      },
    },
  },
  plugins: [],
};

export default config;

