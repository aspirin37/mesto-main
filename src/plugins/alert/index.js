import VueAlert from './alert.vue'

const vueAlertWrapper = {
  install (Vue) {
    if (this.installed) return
    this.installed = true
    Vue.component('vue-alert', VueAlert)
    Object.defineProperties(Vue.prototype, {
      $alert: {
        get () {
          let el = this
          while (el) {
            for (let i = 0; i < el.$children.length; i++) {
              const child = el.$children[i]
              /* istanbul ignore else */
              if (child.$options._componentTag === 'vue-alert') {
                return child
              }
            }
            el = el.$parent
          }
          if (process.env.NODE_ENV !== 'production') {
            console.warn('VueAlert component must be part of this component scope or any of the parents scope.')
          }
          return null
        }
      }
    })
  }
}

export default vueAlertWrapper

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueAlertWrapper)
}
