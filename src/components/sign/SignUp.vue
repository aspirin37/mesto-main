<template>
  <div class="container py-5">
    <h1 class="text-center mb-4">{{$t('signup')}}</h1>
    <signup-block
      class="text-center"
      :routeTo="'profile'"
      v-on:toggleSign="$router.push({path: '/signin'})"
    ></signup-block>
  </div>
</template>

<script>
import SignupBlock from './SignupBlock'

export default {
  name: 'signup',
  data () {
    return {
    }
  },
  components: {
    SignupBlock
  },
  methods: {
  }
}
</script>
