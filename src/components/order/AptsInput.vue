<template>
  <form v-on:submit.prevent="setApt">
    <a href="#" class="apt-link text-nowrap"
      v-on:click.prevent="showApt = true"
      v-if="!showApt"
    >{{value ? `Офис/кв: ${value}` : 'Офис или квартира'}}</a>

    <input
      type="text"
      name="apt"
      class="form-control form-control-sm apt-link__input"
      placeholder="Офис / кв"
      v-model="value"
      v-else
      v-on:blur="setApt"
    >
  </form>
</template>

<script>
  export default {
    name: 'apt-input',
    data () {
      return {
        showApt: false,
        value: ''
      }
    },
    methods: {
      setApt () {
        this.showApt = false
        this.$emit('setApt', this.value)
      }
    }
  }
</script>
