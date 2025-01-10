



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {

      colors:{

        primary: "#3b28cc",
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
    require('flowbite/plugin'),
    require('tailwind-scrollbar')
  ],
}