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
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    require("tailwindcss-scrollbar"),
    require("tailwind-scrollbar-hide"),
  ],
};
