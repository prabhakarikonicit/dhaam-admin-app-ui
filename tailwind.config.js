/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "headding-color": "#636363",
      },
      backgroundColor: {
        "background-grey": "#F5F5F5",
        "store-card": "#FCFCFC",
      },
      borderColor: {
        "grey-border": "#DBDBDB",
      },
    },
    fontSize: {
      sm: "0.75rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.75rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [],
};
