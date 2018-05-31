<template>
  <li>
    <label class="card-list-item relative mb-2">
      <div class="card-list-item__type card-type" v-bind:class="['card-type--' + (pan.length > 1 ? cardType : '')]"></div>
      <input type="radio" name="card-item" class="card-list-item__input" v-on:change="onChange" :checked="isChecked">
      <span class="card-list-item__info">
        {{pan || cardDescr}}
      </span>
    </label>
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
    pan: {
      type: String,
      default: ''
    },
    cardDescr: {
      type: String,
      default: ''
    },
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.checkCardType(this.pan)
    console.log(this.isChecked)
    if (this.isChecked) {
      this.onChange()
    }
  },
  methods: {
    onChange () {
      this.$emit('onChange')
    }
  }
}
</script>
