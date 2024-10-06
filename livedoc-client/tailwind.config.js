import { default as daisyui } from 'daisyui';

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {},
  daisyui: {
    themes: ["light"],
  },
};
export const plugins = [
  daisyui,
];
