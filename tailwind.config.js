/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — near-black to graphite, one step apart.
        bg: {
          DEFAULT: "#050507",
          1: "#0A0A0E",
          2: "#101015",
          3: "#15151C",
        },
        // Fine borders.
        line: {
          DEFAULT: "#1E1E27",
          strong: "#2B2B37",
        },
        // Text.
        fg: {
          DEFAULT: "#F4F4F5",
          muted: "#A1A1AA",
          dim: "#6B6B76",
        },
        // One accent family: electric blue/cyan with a violet relation.
        accent: {
          DEFAULT: "#38BDF8",
          soft: "#7DD3FC",
          deep: "#0EA5E9",
        },
        violet: "#818CF8",
        ok: "#34D399",
        warn: "#FBBF24",
        err: "#F87171",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        site: "1240px",
        prose: "720px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        flow: {
          to: { strokeDashoffset: "-24" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        travel: {
          "0%": { offsetDistance: "0%", opacity: "0" },
          "8%": { opacity: "1" },
          "92%": { opacity: "1" },
          "100%": { offsetDistance: "100%", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        flow: "flow 1.6s linear infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        caret: "caret 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};
