const cardMask = function (el, binding) {
  if (el.value) {
    let newVal = `${el.value.replace(/\s/g, '')}`

    let cardMask = (card) => {
      let cardSubs = card.substr(0, 19)
      return cardSubs.replace(/\D/g, '').replace(/(.{4})/g, '$1 ')
    }
    el.value = cardMask(newVal)
  }
}

export default cardMask
