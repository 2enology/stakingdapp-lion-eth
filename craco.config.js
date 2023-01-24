module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  theme: {
    minHeight: {
      300: "300px",
    },
  },
};
