import Vue from 'vue'
Vue.directive('phone-code', function (el, binding, vnode) {
  el.onfocus = () => {
    setTimeout(() => {
      if (el.value.length === 0) {
        el.value = '+' + binding.value + ' ' + '__________'
      }
    }, 10)
  }
})
