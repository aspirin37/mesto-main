<template>
  <div class="accordion-item" v-bind:class="{'accordion-item--active' : showContent}">
    <div class="accordion-item__title" v-on:click="showContent = !showContent">
      <slot name="acc-header"></slot>
    </div>
    <div class="accordion-item__body" v-if="showContent">
      <slot name="acc-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accordion',
  props: {
    isShowContent: {
      type: Boolean,
      default: true
    }
  },
  beforeMount () {
    this.showContent = this.isShowContent
  },
  data () {
    return {
      showContent: false
    }
  }
}
</script>
