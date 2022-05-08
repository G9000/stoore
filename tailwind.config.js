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
        primaryGreen800: "var(--primaryGreen800)",
        primaryGreen400: "var(--primaryGreen400)",
        primaryGreen200: "var(--primaryGreen200)",
      },
    },
  },
  plugins: [],
};
