/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors:{
          "main-color":"#4E4E91",
          "button-color":"#FF4800"
       },
       fontFamily:{
        'font': 'Rubik, sans-serif'
       }
    },
  
  },
  plugins: [],
}
