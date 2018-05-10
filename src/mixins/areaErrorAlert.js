export default {
  data () {
    return {
    }
  },
  methods: {
    showAreaAlertError (error) {
      let messages = error.data.messages

      if (messages) {
        this.$alert.show({
          message: messages.join(', '),
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
