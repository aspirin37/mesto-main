export default {
  data () {
    return {
    }
  },
  methods: {
    showAreaAlertError (error) {
      if (error.data.message) {
        this.$alert.show({
          message: error.data.message,
          classes: 'border-danger',
          link: {
            to: {name: 'faq', query: {question: 8}},
            text: 'В каких регионах вы работаете?'
          }
        })
      }
    }
  }
}
