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
          "button-color":"#FF4800",
          "input-color":"#E5E5E5",
          "bg-color":"#F5F5F5",
       },
       fontFamily:{
        'font': 'Rubik, sans-serif'
       }
    },
  
  },
  plugins: [],
}
