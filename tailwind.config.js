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
        secondary:'#383838',
        primary:'#333333',
        tertiary:'#2824f2'

      }
    },
  },
  plugins: [
    function ({ addBase }) 
    { addBase({ '*': { margin: '0', padding: '0', } }); 
  }
  ],
}

