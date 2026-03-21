export default {
  darkMode: "class", // ADD THIS LINE
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F7B0F",
          foreground: "#ffffff",
        },
        accent: "#22c55e",
        glass: "rgba(255,255,255,0.05)",
        border: "hsl(var(--border))",
      },
    },
  },
  plugins: [],
};
