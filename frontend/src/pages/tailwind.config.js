/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tell Tailwind to scan your component files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#023047",
        secondary: "#219ebc",
        accent: "#8ecae6",
        warning: "#fb8500",
        highlight: "#ffd60a",
      },
    },
  },
  plugins: [],
};
