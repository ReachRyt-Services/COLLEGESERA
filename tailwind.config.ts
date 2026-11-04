import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    require("daisyui"),
    require("@tailwindcss/typography"),
  ],

  daisyui: {
    themes: [
      {
        collegesera: {
          "primary": "#1A73E8",
          "primary-focus": "#1665c7",
          "primary-content": "#ffffff",

          "secondary": "#FF6F00",
          "secondary-focus": "#e66000",
          "secondary-content": "#ffffff",

          "accent": "#0059B2",
          "neutral": "#2A2E37",
          "base-100": "#ffffff",
          "base-200": "#f8f8f8",
          "base-300": "#e3e3e3",

          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "0.25rem",
        },
      },
      "light",
      "dark",
    ],
  },
} satisfies Config;
