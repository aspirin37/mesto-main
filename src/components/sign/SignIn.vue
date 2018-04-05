<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">{{$t('signin')}}</h1>
    <signin-block
      class="text-center"
      :routeTo="'profile'"
      v-on:toggleSign="$router.push({path: '/signup'})"
    ></signin-block>
  </div>
</template>

<script>
import SigninBlock from './SigninBlock'

export default {
  name: 'signin',
  data () {
    return {
      passForm: false
    }
  },
  components: {
    SigninBlock
  }
}
</script>
