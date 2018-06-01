// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import wordEnding from 'word-ending'
import VueAlert from './plugins/alert'
import VeeValidate from 'vee-validate'
import uSelect from 'u-select'
import App from './App'
import router from './router'
import store from './store'
import language from './store/language'
import auth from './auth'
import thousands from './directives/thousands'
import MaskedInput from './directives/maskedInput'
import uThumbnail from 'u-thumbnail'
import { directive as onClickOutside } from 'vue-on-click-outside'
auth.checkAuth()

Vue.use(uThumbnail)
Vue.use(uSelect)
Vue.use(VueAlert)
Vue.use(VeeValidate)
Vue.directive('on-click-outside', onClickOutside)
Vue.directive('thousands', thousands)
Vue.directive('masked-input', MaskedInput)
Vue.use(wordEnding)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  language,
  template: '<App/>',
  components: { App }
})
