/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
      },
      colors: {
        gold: "#FFD204",
        crimson: "#f1356d",
        darkBlue: "#32445A",
        littleDarkBlue: "#7189BF",
        orange: "#F37878",
      },
      boxShadow: {
        item: "1px 0px 10px 3px rgba(0, 0, 0, 0.1)",
        item2: "0px 0px 2px 0.2px rgba(0,0,0,0.37)",
      },
      backgroundImage: {
        "home-bg": "url('/src/assets/home-background.png')",
      },
      transitionDuration: {
        25: "25ms",
      },
    },
  },
  plugins: [],
};
