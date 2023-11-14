/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "gray": "rgba(30, 30, 30, 1)", 
        "black": "#000",
        "primary": "#f3ebe7",
        "secondary": '#6e3515',
        "tetiary": '#39161a',
        "red": '#9d4f4a',
        "gainsboro": "rgba(217, 217, 217, 0)",
      },
      fontFamily:{
        "poppins": "Poppins",
        "galada": "Galada"
      }
    },
    fontSize: {
      "5xl": "1.5rem",
      "inherit": "inherit"
    }
  },
  corePlugins: {
    "preflight": false
  }
}
