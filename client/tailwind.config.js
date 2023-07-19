/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(255,185,31,1)",
        "text-color": "rgb(32,32,32)",
        "sale-color": "rgb(212,56,17)",
        "gray-color": "rgb(134,134,134)",
        "price-color": "rgb(35,63,146)",
        "btn-bg": "#f0f0f0",
        "sold-out-background": "rgb(209,207,207)",
        "border-color-product": "rgb(235,235,235)",
        "tool-product-bg": "rgb(240,240,240)",
        "text-footer-color": "rgb(170,170,170)",
        "border-footer-color": "rgb(24,24,24)",
      },
    },
  },
  plugins: [],
};
