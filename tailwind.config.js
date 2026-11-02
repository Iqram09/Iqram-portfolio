/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      /*
       * "Distant Glass". Token names are kept from the previous system so the
       * case study and résumé pages inherit the new palette unchanged.
       * Text tokens clear WCAG AA on bg and night:
       *   fg #D9CFC9 13.9:1 · muted #9E9FB3 7.9:1 · dim #7A7B8F 5.0:1
       */
      colors: {
        // Warm black ground and three lifted surfaces.
        bg: {
          DEFAULT: "#050200",
          1: "#0A0807",
          2: "#100D0C",
          3: "#171312",
        },
        // Navy-black ground for the "system" sections.
        night: {
          DEFAULT: "#020309",
          1: "#060914",
          2: "#0B1020",
        },
        // Glass tint — always used with alpha.
        glass: "#26324D",
        line: {
          DEFAULT: "#221E20",
          strong: "#35303A",
        },
        fg: {
          DEFAULT: "#D9CFC9",
          muted: "#9E9FB3",
          dim: "#7A7B8F",
        },
        // Glacier blue — the light inside the glass.
        accent: {
          DEFAULT: "#9CC3F0",
          soft: "#C6DCF7",
          deep: "#6F9BD6",
        },
        // Warm accent — hairlines and fills; `soft` for text (5.6:1).
        warm: {
          DEFAULT: "#845C40",
          soft: "#C49A76",
        },
        mint: "#BDE7D9",
        lavender: "#C9B8FF",
        violet: "#B8A9F0",
        ok: "#8ED9BE",
        warn: "#E3B873",
        err: "#E8907F",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        site: "1320px",
        prose: "720px",
      },
      letterSpacing: {
        tightest: "-0.045em",
        hud: "0.22em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
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
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.8s ease-out both",
        flow: "flow 1.6s linear infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        caret: "caret 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};
