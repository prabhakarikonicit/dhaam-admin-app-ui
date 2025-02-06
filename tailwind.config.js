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
        "menuSubHeadingColor": "#4F4F4F",
        "cardTitle": "#949494",
        "cardValue": "#212121",
        "textHeading": "#2B2B2B",
        "whiteColor": "#FFFFFF"
      },
      backgroundColor: {
        "background-grey": "#F5F5F5",
        "store-card": "#FCFCFC",
        "reloadBackground": "#DBDBDB",
        "backgroundWhite": "#FFF"
      },
      borderColor: {
        "grey-border": "#DBDBDB",
        "reloadBorder": "#C2C2C2",
     
      },
      borderRadius: {
        'custom': '6px',
      },
    },
    fontFamily: {
      inter: "Inter", 
      krona: "Krona One",
     
    },
    fontWeight: {
      '550': '550',
      '600': '600',
      '500': '500',
    },
    // lineHeight: {
    //    lh: '33px', 
    // },
    
    fontSize: {
      sm: "0.75rem",   // 12px
      "14px": "0.875rem", // 14px
      base: "1rem",    // 16px
      xl: "1.25rem",   // 20px
      "2xl": "1.563rem", // 25px
      "3xl": "1.75rem",  // 28px
      "4xl": "2.441rem", // 39px
      "5xl": "3.052rem", // 49px
      

      '22px': '22px',
    }
    
  },
  plugins: [],
};
