
         'use strict'

      if (process.env.NODE_ENV === 'production') {
        module.exports = require('./better-react-swiper.cjs.production.js')
      } else {
        module.exports = require('./better-react-swiper.cjs.development.js')
      }