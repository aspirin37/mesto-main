const charactersReplace = function (el, binding) {
  if (el.value) {
    let newVal = `${el.value.replace(/[^a-zA-Z\d\s]+|\d/g, '')}`

    el.value = newVal
  }
}

export default charactersReplace
