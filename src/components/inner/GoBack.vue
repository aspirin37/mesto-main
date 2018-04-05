<template>
  <a href="#" class="back-btn base-line-height" v-on:click.prevent="goBack">{{$t('order.order-list')}}</a>
</template>

<script>
export default {
  name: 'go-back',
  data () {
    return {
    }
  },
  props: {
    link: {
      type: String,
      default: ''
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>
