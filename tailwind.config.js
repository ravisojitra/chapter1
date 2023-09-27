module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media'
  theme: {
    extend: {
      colors: {
        "0d1321": "#0d1321",
        "1d2d44": "#1d2d44",
        "3e5c76": "#3e5c76",
        "748cab": "#748cab",
        f0ebd8: "#f0ebd8",
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#3490dc",
        secondary: "#ffed4a",
        danger: "#e3342f",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["responsive", "hover", "focus", "active"], // hover effect
    },
  },
  plugins: [],
};
