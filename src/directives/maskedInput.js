import Inputmask from 'inputmask'
// inputmask-core

const maskedInput = function (el, binding) {
  var im = new Inputmask({
    mask: binding.value,
    showMaskOnHover: false,
    onBeforePaste: (pastedValue) => {
      return '+' + pastedValue
    }
  })
  im.mask(el)
}

export default maskedInput
