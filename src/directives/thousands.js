const thousands = function (el, binding) {
  let val = '' + binding.value
  if (val) {
    let regex = /(\d)(?=(\d\d\d)+(?!\d))/g
    el.innerHTML = val.replace(regex, '$1 ')
  }
}

export default thousands
