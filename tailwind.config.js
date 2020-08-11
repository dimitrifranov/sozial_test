/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    fontFamily: {
      display: ['Rubik', 'sans-serif'],
      body: ['Montserrat', 'sans-serif']
    },
    extend: {
      colors: {
        grey: '#121212',
        grey1: '#1d1d1d',
        grey2: '#212121',
        grey3: '#242424',
        grey4: '#272727',
        white: '#ffffff',
        white1: '#b3ffff',
        white2: '#80ffff',
        white3: '#1fffff',
        error: '#cf6679'
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
        '10xl': '8rem',
        '11xl': '9rem'
      }
    },
    textColor: {
      error: '#cf6679',
      white: '#ffffff',
      grey: '#121212'
    }
  },
  variants: {},
  plugins: []
}
