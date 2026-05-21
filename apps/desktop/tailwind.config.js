const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "../../packages/ui/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-interface)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono]
      },
      colors: {
        luza: {
          black: "#030507",
          panel: "#0a1016",
          cyan: "#22d3ee",
          blue: "#38bdf8",
          mint: "#5eead4",
          violet: "#a78bfa",
          amber: "#facc15"
        }
      },
      boxShadow: {
        neon: "0 0 32px rgba(34, 211, 238, 0.22)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.42)"
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      },
      animation: {
        scan: "scan 7s linear infinite",
        orbit: "orbit 18s linear infinite"
      }
    }
  },
  plugins: []
};
