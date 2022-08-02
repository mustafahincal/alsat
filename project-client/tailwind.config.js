/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
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
      },
    },
  },
  plugins: [],
};
