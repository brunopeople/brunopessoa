import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#727474',
        secondary: '#2196f3',
        accent: '#cddc39',
        error: '#f44336',
        warning: '#ff5722',
        info: '#00bcd4',
        success: '#8bc34a',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
})
