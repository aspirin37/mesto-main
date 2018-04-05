<template>
  <input
    type="text"
    :class="classNames"
    :placeholder="placehldr"
    v-on:click="clicked = true"
    v-on:focus="onFocus"
    v-on:blur="onBlur"
    v-on:keydown.enter.prevent
    ref="autocomplete"
    :value="value"
  >
</template>

<script>
export default {
  name: 'autocomplete',
  props: {
    placehldr: String,
    classNames: Array,
    windowMaps: Object,
    value: String
  },
  data () {
    return {
      autocomplete: null,
      clicked: false
    }
  },
  mounted () {
    this.initAutocomplete()
  },
  computed: {
    geolocation () {
      return this.$store.state.locations[this.$store.state.currentLocation].center
    }
  },
  watch: {
    geolocation () {
      this.initAutocomplete()
    }
  },
  methods: {
    onFocus (e) {
      this.$emit('onFocus', e.target.value)
    },
    initAutocomplete () {
      let circle = new this.windowMaps.Circle({
        center: this.geolocation,
        radius: 40000
      })
      let options = {
        bounds: circle.getBounds(),
        strictBounds: false
      }
      this.autocomplete = new this.windowMaps.places.Autocomplete(this.$refs.autocomplete, options)
      this.autocomplete.addListener('place_changed', () => {
        this.$emit('placeChanged', this.autocomplete.getPlace())
        this.$refs.autocomplete.blur()
      })
    },
    onBlur () {
      this.$refs.autocomplete.value = this.value
    }
  }
}
</script>
