module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryWhite: "var(--primaryWhite)",
        primaryBlack: "var(--primaryBlack)",
        primaryBrandRed: "var(--primaryBrandRed)",
      },
    },
  },
  plugins: [],
};
