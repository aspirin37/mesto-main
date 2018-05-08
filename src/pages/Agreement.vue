<template>
  <div v-html="agreement" class="rules-pre"></div>
</template>

<script>
import api from '../store/api'

export default {
  name: 'agreement',
  data () {
    return {
      agreement: ''
    }
  },
  mounted () {
    this.getAreement()
  },
  methods: {
    getAreement () {
      this.$http.get('https://mesto.a3technology.ru/terms/confidential/').then(response => {
        console.log(response)
      })
      this.$http.get(api.API_LINK + '/webview/terms/actual/agreement-client.php').then(response => {
        this.agreement = response.body
      })
    }
  }
}
</script>
