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
      "3xl": "2000px", // Custom breakpoint for ultra-wide screens
      "4xl": "2560px",
    },
    extend: {
      backgroundImage: {
        "linear-bg":
          "linear-gradient(to right, rgba(205, 150, 200, 0.9), rgba(194, 186, 194, 0.1))",
        "main-bg": "url('./lib/Images/signup.jpg')",
        // 'main-bg': "linear-gradient(to right, rgba(213, 161, 220, 0.9), rgba(225, 198, 224, 0.1)), url('./lib/Images/bg.png')",
      },
      letterSpacing: {
        extraWide: "1px", // custom value for extra wide letter spacing
      },
      colors: {
        "headding-color": "#636363",
        menuSubHeadingColor: "#4F4F4F",
        cardTitle: "#949494",
        cardValue: "#212121",
        crossIcon: "#F09E9E",

        textHeading: "#2B2B2B",
        whiteColor: "#FFFFFF",
        progressBar: "#C084FC",
        paragraph: "#9C9AA5",
        paragraphBlack: "#26203B",
        reloadBorder: "#C2C2C2",
        bgButton: "#7C43DF",

        verifyOtp: "#333333",
        purpleColor: "#7C43DF",
        validationSucColor: "#575757",
        cancelPlanText: "#BB1B1",
        primary: "#2242B4",
        customWhiteColor: "#EAFBEC",
        yellow: "#735C17",
        customWhite: "#FBE9E9",
        billingNumber: "#1D3796",
        green: "#125E1B",
        textGreen: "#177822",
        headingBlack: "000B33",
      },
      backgroundColor: {
        "background-grey": "#F5F5F5",
        "store-card": "#FCFCFC",
        reloadBackground: "#DBDBDB",
        customBackgroundColor: "#EAFBEC",
        bgActive: "#1D962B",
        bgCrossIcon: "#FBE9E9",
        reloadBorder: "#C2C2C2",
        backgroundWhite: "#FFF",
        bgButton: "#7C43DF",
        subMenus: "#F2F2F2",
        primary: "#EAEDFB",
        green: "#2C6333",
        yellow: "#FFD557",
        maroon: "#9C1616",
      },
      borderColor: {
        "grey-border": "#DBDBDB",
        reloadBorder: "#C2C2C2",
        btnBorder: "#5D32A7",
        borderCrossIcon: "#F09E9E",
       borderGreeen:  "#788C7A",
        bgButton: "#7C43DF",
        cardTitle: "#949494",
        menuSubHeadingColor: "#4F4F4F",
      },
      boxShadow: {
        custom: "0px 1px 4px 0px rgba(12, 12, 13, 0.05)",
      },
      borderRadius: {
        custom4px: "4px",
        custom: "6px",
        custom4x: "4px",
        custom7px: "7px",
        custom8px: "8px",
        custom12px: "12px",
        custom16px: "16px",
        custom18px: "18px",
        custom28px: "28px",
        custom20px: "20px",
        custom44px: "44px",
        custom80px: "80px",
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
