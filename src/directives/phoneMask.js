import Vue from 'vue'
Vue.directive('phone', function (el, binding) {
  if (binding.value) {
    let newVal = `+${binding.value.replace(/\+|-|\(|\)|=|\.|,|\?|\\|\/|[a-zA-Z]/g, '')}`
    let phoneMask = phone => phone.replace(/\D/g, '').replace(/^(\d{1})(\d{3})(\d{3})(\d{0,4}).*/, '+$1' + ' (' + '$2' + ') ' + '$3' + '-' + '$4')

    el.value = phoneMask(newVal)
    el.innerHTML = phoneMask(newVal)
  } else {
    return
  }
})
