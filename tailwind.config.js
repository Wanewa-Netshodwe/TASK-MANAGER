/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    // screens: {
    //   'sm': '340px',
          // 'md': '660px',
    //   'lg': '1024px',
    //   'xl': '1280px',
    //   '2xl': '1536px',
    // }
    
    extend: {
      colors:{
        formbg:'#1c1c1c',
        background:'#212121',
        btncolor:'#733dd9'

      }
    },
  },
  plugins: [],
}

