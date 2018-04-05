const dtFormat = function (el, binding) {
  let gmt = 0
  if (binding.modifiers.gmt) {
    gmt = new Date().getTimezoneOffset() * 60
  }
  let date = new Date((binding.value + gmt) * 1000)

  el.innerHTML =
  `${date.getDate()}.${date.getMonth() < 9 ? '0' : ''}${(date.getMonth() + 1)}.${date.getFullYear()} 
    ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
}

export default dtFormat
