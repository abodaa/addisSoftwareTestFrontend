/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "780px",
      lg: "1024px",
      xl: "1440px",
      xxl: "1600px",
    },
    extend: {
      colors: {
        darkTransparent: "#000000ab",
      },
      fontFamily: {
        AlfaSlabOne: ["Alfa Slab One"],
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        md: "0.9rem",
        xl: "1.25rem",
        "2xl": "1.4rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
        "6xl": "4rem",
        "7xl": "6rem",
        "8xl": "8rem",
        "9xl": "11rem",
      },
    },
  },
  plugins: [],
};
