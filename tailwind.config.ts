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
        'viu-gold': '#FFBF00',
        'viu-bg': '#1E1B16',
        'viu-bg-dark': '#000000',
        'viu-text': '#E9E1D8',
      },
    },
  },
  plugins: [],
};
export default config;
