<template>
  <div v-html="confidential" class="rules-pre"></div>
</template>

<script>
// import api from '../store/api'

export default {
  name: 'confidential',
  data () {
    return {
      confidential: ''
    }
  },
  mounted () {
    this.getAreement()
  },
  methods: {
    getAreement () {
      let url = `${window.location.origin}/terms/confidential/`

      this.$http.get(url).then(response => {
        this.confidential = response.body
      })
      // this.$http.get(api.API_LINK + '/webview/terms/actual/confidential.php').then(response => {
      //   this.confidential = response.body
      // })
    }
  }
}
</script>
