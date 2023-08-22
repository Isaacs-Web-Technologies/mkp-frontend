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
        "gray": "rgba(0, 0, 0, 0.5)",
        "black": "#000",
        "primary": "#39161a",
        "inactive": "#808080",
        "gainsboro": "rgba(217, 217, 217, 0)",
        "sec-color": "#fff"
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
