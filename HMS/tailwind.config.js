/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { 
      fontFamily: {
        body: 'Poppins, Roboto',
        sans:'Poppins, Roboto',
        heading:'Merriweather,serif',
      },
      colors: {
        'dark':"#212529",
        'light':"#F0F3FB",
        primary: {
          '50': '#eefffc',
          '100': '#c6fff8',
          '200': '#8dfff2',
          '300': '#4cfceb',
          '400': '#18e9dc',
          '500': '#00cdc3',
          '600': '#00a5a0',
          '700': '#028b89',
          '800': '#076868',
          '900': '#0b5655',
          '950': '#003234',
        },
        'neutral':{
           '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '000000',
        }
      } 
    },
  },
  plugins: [],
}