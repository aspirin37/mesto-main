<template>
  <li class="cards-list__item d-inline-block">
    <div class="small-card text-left" v-bind:class="{'small-card--animate' : animate}">
      <div class="small-card__type card-type" v-bind:class="['card-type--' + ((cardPan && cardPan.length >= 1) ? cardType : '')]"></div>
      <div class="small-card__pan text-right">{{pan}}</div>
      <a href="#" class="small-card__delete" v-on:click.prevent="deleteCard"></a>
    </div>
  </li>
</template>

<script>
import checkCard from '../../mixins/checkCard'

export default {
  data () {
    return {
      cardPan: this.pan
    }
  },
  mixins: [checkCard],
  props: {
    pan: String,
    animate: {
      type: Boolean,
      default: false
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
