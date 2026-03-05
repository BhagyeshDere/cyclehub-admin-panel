import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2b6cee",
        accent: "#ccff00",
        "background-dark": "#0a0c10",
        "surface-dark": "#161b22",
        "border-dark": "#30363d",
      },
    },
  },
  plugins: [],
};

export default config;