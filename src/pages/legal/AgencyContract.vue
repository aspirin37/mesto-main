<template>
  <div v-html="contract" class="rules-pre"></div>
</template>

<script>
export default {
  name: 'agency-contract',
  data () {
    return {
      contract: ''
    }
  },
  mounted () {
    this.getContract()
  },
  methods: {
    getContract () {
      let url = `${window.location.origin}/terms/contract/`

      this.$http.get(url).then(response => {
        this.contract = response.body
      })
      // this.$http.get(api.API_LINK + '/webview/terms/actual/agreement-client.php').then(response => {
      //   this.agreement = response.body
      // })
    }
  }
}
</script>
