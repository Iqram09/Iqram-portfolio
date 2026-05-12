/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#00C9B1",
        secondary: "#0A0F1C",
        accent:    "#00E5CC",
        surface:   "#0F1629",
        card:      "#131D35",
        border:    "#1E2D4A",
        muted:     "#5A6A85",
        bright:    "#E2E8F0",
      },
      fontFamily: {
        sans:    ["var(--font-outfit)", "sans-serif"],
        display: ["var(--font-syne)",   "sans-serif"],
      },
      animation: {
        "fade-up":     "fadeUp 0.6s ease both",
        "fade-in":     "fadeIn 0.5s ease both",
        "pulse-slow":  "pulse 3s ease-in-out infinite",
        "float":       "float 4s ease-in-out infinite",
        "spin-slow":   "spin 12s linear infinite",
        "gradient":    "gradientShift 5s ease infinite",
        "typing":      "typing 3.5s steps(30,end) 0.5s both, blink 0.7s step-end infinite",
        "bar-fill":    "barFill 1.2s ease both",
      },
      keyframes: {
        fadeUp:    { from: { opacity: 0, transform: "translateY(24px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%":     { backgroundPosition: "100% 50%" },
        },
        barFill:   { from: { width: "0%" }, to: { width: "var(--bar-width)" } },
      },
      backgroundSize: { "200%": "200% 200%" },
    },
  },
  plugins: [],
};
