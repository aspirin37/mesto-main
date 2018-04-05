export default {
  data () {
    return {
      repeatSec: 30
    }
  },
  methods: {
    setSubstr () {
      let subtraction = () => {
        this.repeatSec--
      }

      let interval = setInterval(subtraction, 1000)

      setTimeout(() => {
        clearInterval(interval)
        this.repeatSec = 30
      }, this.repeatSec * 1000)
    }
  }
}
