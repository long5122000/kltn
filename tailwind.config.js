module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        roboto: "'Roboto', sans-serif",
      },
      colors: {
        primary: "#F62682",
        secondary: "#6F5CF1",
        "rgba-border": "rgba(255,255,255,.15);",
      },
      flex: {
        3: "0 0 30%",
      },
    },
  },
  plugins: [],
};
