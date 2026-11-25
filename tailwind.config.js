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
       * "Letterform" — a light editorial system: neutral paper, near-black
       * bands, a condensed display serif, and colour that comes from the work
       * itself (the jersey, Kong's blue, Proximo's camel wall, Stans' dusk).
       * Text tokens clear WCAG AA on paper, white, mist and stone:
       *   fg #161616 15:1 · muted #54544F 6.3:1 · dim #696965 4.6:1
       */
      colors: {
        // Grounds, light.
        bg: {
          DEFAULT: "#F1F1F0",
          1: "#FFFFFF",
          2: "#F7F7F6",
          3: "#E4E4E1",
        },
        stone: "#EBEAE4",
        // Grounds, dark bands.
        night: {
          DEFAULT: "#0E0E0E",
          1: "#181818",
          2: "#262626",
        },
        line: {
          DEFAULT: "#DCDCD8",
          strong: "#B9B9B4",
        },
        // Text on light.
        fg: {
          DEFAULT: "#161616",
          muted: "#54544F",
          dim: "#696965",
        },
        // Text on dark.
        inv: {
          DEFAULT: "#F5F5F3",
          muted: "#B4B4B0",
          dim: "#8C8C88",
        },
        // Maroon, from the jersey — the one interface accent.
        accent: {
          DEFAULT: "#7F1330",
          soft: "#F2C9C4",
        },
        // Panel grounds, sampled from the projects.
        cobalt: "#1F3FBF",
        camel: "#C69A66",
        leaf: "#1F6B4A",
        sky: "#BFD5EE",
        dusk: "#2D3E53",
        // Status + syntax on light.
        violet: "#5238A8",
        ok: "#1B6B49",
        warn: "#855300",
        err: "#B02A1C",
        // Terminal windows stay dark on the light page.
        term: {
          DEFAULT: "#141416",
          fg: "#ECEAE6",
          muted: "#B0AEA9",
          dim: "#8A8883",
          accent: "#9DBBFF",
          ok: "#86D8AE",
          warn: "#EBC074",
          violet: "#C0B0FA",
          err: "#F29C8B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Didot", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        site: "1280px",
        prose: "720px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        snug: "-0.015em",
        caps: "0.04em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        progress: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};
