import { default as daisyui } from 'daisyui';

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    keyframes: {
      typing: {
        'from': { width: '0%' },
        'to': { width: '100%' },
      },
      blink: {
        '50%': { borderColor: 'transparent' },
      },
    },
    animation: {
      typing: 'typing 3s steps(30, end), blink 0.5s step-end infinite',
    },
  },
  daisyui: {
    themes: ["light"],
  },
};
export const plugins = [
  daisyui,
];
