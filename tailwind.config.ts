import type { Config } from "tailwindcss";

const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    "./src/b4g/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ['"Jost"', ...defaultTheme.fontFamily.sans],
        modak: ['"Modak"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          light: '#7791F0',
          DEFAULT: '#4165E7'
        }
      }
    },
  },
  plugins: [],
};
export default config;
