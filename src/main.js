// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAlert from './plugins/alert'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
import store from './store'
import language from './store/language'
import auth from './auth'
import thousands from './directives/thousands'
import MaskedInput from './directives/maskedInput'
import { directive as onClickOutside } from 'vue-on-click-outside'
auth.checkAuth()

Vue.use(VueAlert)
Vue.use(VeeValidate)
Vue.directive('on-click-outside', onClickOutside)
Vue.directive('thousands', thousands)
Vue.directive('masked-input', MaskedInput)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  language,
  template: '<App/>',
  components: { App }
})
