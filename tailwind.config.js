/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "840px", 
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        'linear-bg': "linear-gradient(to right, rgba(205, 150, 200, 0.9), rgba(194, 186, 194, 0.1))",
        'main-bg': "url('./lib/Images/signup.jpg')",
        // 'main-bg': "linear-gradient(to right, rgba(213, 161, 220, 0.9), rgba(225, 198, 224, 0.1)), url('./lib/Images/bg.png')",
      },
      colors: {
        "headding-color": "#636363",
        menuSubHeadingColor: "#4F4F4F",
        cardTitle: "#949494",
        cardValue: "#212121",
        textHeading: "#2B2B2B",
        whiteColor: "#FFFFFF",
        progressBar: "#C084FC",
        paragraph: "#9C9AA5",
        paragraphBlack: "#26203B",
        reloadBorder: "#C2C2C2",
        verifyOtp:"#333333",
        purpleColor: "#7C43DF",
        validationSucColor:"#575757",

      },
      backgroundColor: {
        "background-grey": "#F5F5F5",
        "store-card": "#FCFCFC",
        reloadBackground: "#DBDBDB",
        backgroundWhite: "#FFF",
        bgButton: "#7C43DF",
        subMenus: "#F2F2F2"
      },
      borderColor: {
        "grey-border": "#DBDBDB",
        "reloadBorder": "#C2C2C2",
         "btnBorder":"#5D32A7",
         "bgButton": "#7C43DF",
        "cardTitle": "#949494",
        "menuSubHeadingColor": "#4F4F4F",


      },
      borderRadius: {
        custom: "6px",
        custom4x: "4px",
        custom8px: "8px",
        custom20px: "20px",
        custom100px: "100px",
      },
    },
    fontFamily: {
      inter: "Inter",
      krona: "Krona One",
      roboto: "Roboto",
    },

    
    fontWeight: {
      400: "400",
      550: "550",
      500: "500",

      600: "600",
      500: "500",
      700: "700",
    },
    // lineHeight: {
    //    lh: '33px',
    // },

    fontSize: {
      "11px": "11px", 
      sm: "0.75rem", // 12px
      "14px": "0.875rem", // 14px
      base: "1rem", // 16px
      xl: "1.25rem", // 20px
      "2xl": "1.563rem", // 25px
      "3xl": "1.75rem", // 28px
      "4xl": "2.441rem", // 39px
      "5xl": "3.052rem", // 49px

      "22px": "22px",
    },
  },
  plugins: [],
};
