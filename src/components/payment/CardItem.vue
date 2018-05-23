<template>
  <li class="cards-list__item d-inline-block">
    <div class="small-card text-left" v-bind:class="{'small-card--animate' : animate}">
      <div class="small-card__type card-type" v-bind:class="['card-type--' + ((pan && pan.length >= 1) ? cardType : '')]"></div>
      <div class="small-card__pan text-right">{{pan}}</div>
      <a href="#" class="small-card__delete" v-on:click.prevent="deleteCard"></a>
    </div>
    <span class="text-muted small d-block text-center" v-if="info.is_default">По умолчанию</span>
  </li>
</template>

<script>
import checkCard from '@/mixins/checkCard'

export default {
  data () {
    return {
    }
  },
  mixins: [checkCard],
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    animate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pan () {
      return this.info.pan
    }
  },
  mounted () {
    this.checkCardType(this.pan)
  },
  methods: {
    deleteCard () {
      this.$emit('deleteCard')
    }
  }
}
</script>
