/** @type {import('tailwindcss').Config} */
export default {
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#00a7ff",
        secondary: "#00eeff",
        accent: "#f31800",
        neutral: "#2d1b09",
        "base-100": "#fff8ff",
        info: "#007cff",
        success: "#6acf00",
        warning: "#b98b00",
        error: "#ff5086",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
