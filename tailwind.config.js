module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "footer-texture":
          "url('https://cdn.shopify.com/s/files/1/0564/0830/9941/files/moe8359_1_1024x.jpg?v=1647641830')",
      },
    },
    fontFamily: {
      myfont: ["Arimo", "sans-serif"],
      featured: ["Bodoni Moda", "sans-serif"],
      secondaryfont: ["Poppins", "sans-serif"],
      lastfont: ["Fugaz One", "cursive"], // Ensure fonts with spaces have " " surrounding it.
    },
  },
  plugins: [
    require("tailwindcss-scrollbar"),
    require("tailwind-scrollbar-hide"),
  ],
};
