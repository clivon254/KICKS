

const flowbite = require("flowbite-react/tailwind")

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {

      colors:{

        primary: "#3239fa",
        secondary:"#e6f9fc"

      },

      fontFamily:{
        
        logo:["Faster One", "serif"],
        
        text:["Poppins", "serif"],

        title: ["Roboto", "serif"]

      }
    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar')
  ],
}