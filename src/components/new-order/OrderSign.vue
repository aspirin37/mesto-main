<template>
  <div class="bg-white rounded relative current-shadow p-3 py-md-4 px-lg-4 px-xl-5 mb-3 order-sign-block d-flex align-items-center">
    <div v-if="!showSignIn">
      <signup-block v-on:toggleSign="showSignIn = true"
        signText="Для подтверждения заказа ведите номер телефона и мы пришлём вам СМС с проверочным кодом"
        pinText="Для подтверждения заказа введите этот код"
      ></signup-block>
    </div>
    <div v-else>
      <signin-block v-on:toggleSign="showSignIn = false"></signin-block>
    </div>
  </div>
</template>

<script>
import SignupBlock from '../sign/SignupBlock'
import SigninBlock from '../sign/SigninBlock'

export default {
  name: 'order-sign',
  data () {
    return {
      step: 1,
      showSignIn: false,
      errorMessage: ''
    }
  },
  components: {
    SignupBlock,
    SigninBlock
  },
  methods: {
    // getPayType () {
    //   // SET ISAUTH TO TRUE
    //   if (this.payType === 1) {
    //     this.addOrder()
    //   }
    // }
  }
}
</script>
