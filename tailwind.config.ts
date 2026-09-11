import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /**
         * Navy is the surface colour (heroes, footer, dark bands, headings);
         * red is retained as the accent and call-to-action colour so the
         * existing red Symprotek logo still sits correctly on the page.
         *
         * `dark` doubles as the heading colour on light backgrounds, so it is
         * a deep navy rather than a mid blue — it needs to carry body-copy
         * contrast, not just work as a background.
         */
        brand: {
          red: "#e2231a",
          "red-dark": "#b91b13",
          dark: "#0b2044",
          gray: "#5b6879",
          light: "#f1f5fa",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        heading: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgb(0 0 0 / 0.08)",
        lift: "0 12px 28px -6px rgb(0 0 0 / 0.18)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out",
        slideDown: "slideDown 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
