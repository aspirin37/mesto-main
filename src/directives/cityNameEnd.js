const cityNameEnd = function (el, binding) {
  if (binding.value) {
    let word = binding.value
    let wordEnd = word.substr(-1, 1)
    let newValue = ''
    if (['а', 'г', 'д', 'к', 'н', 'я', 'в', 'р', 'м'].indexOf(wordEnd) !== -1) {
      newValue = `${word.substr(0, word.length - 1)}е`
    } else {
      newValue = word
    }
    el.innerHTML = newValue
  }
}

export default cityNameEnd
