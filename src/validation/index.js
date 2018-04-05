import Vue from 'vue'
import VeeValidate from 'vee-validate'

const validateConfig = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields',
  delay: 0.3,
  locale: 'en',
  dictionary: null,
  strict: true
}

Vue.use(VeeValidate, validateConfig)
