export default {
  data () {
    return {
    }
  },
  methods: {
    setCookieObject (data, del = false) {
      // let expire = new Date()
      // expire.setMinutes(expire.getMinutes() + 10)
      // expire.toUTCString()

      let expire = 0

      if (del) {
        expire = new Date(0)
      }

      for (let prop in data) {
        if (data[prop]) {
          let cookie = [prop, '=', JSON.stringify(data[prop]) + ';', 'expires=', expire + ';'].join('')
          document.cookie = cookie
        }
      }
    },
    getCookieValues (names) {
      if (!names) {
        return
      }
      for (let name in names) {
        let nameItem = names[name]
        let cookieVal = document.cookie.match(new RegExp(nameItem + '=([^;]+)'))

        if (cookieVal !== null) {
          this[nameItem] = (this[nameItem] ? this[nameItem] : JSON.parse(cookieVal[1]))
        }
      }
    }
  }
}
