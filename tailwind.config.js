/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    colors: {
      primary: "#343a40",
      highlight: "#007bff",
      background: "#f8f9fa",
      "text-primary": "#212529",
      subtle: "#6c757d",
      accent: "#28a745",
      white: "#ffffff",
    },
    extend: {},
  },
  plugins: [],
};
