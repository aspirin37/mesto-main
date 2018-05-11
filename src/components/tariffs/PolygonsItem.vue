<template>
  <gmap-polygon
    :editable="false"
    :path="polygon.points"
    :options="{
      fillColor: colors[polygon.level],
      strokeColor: colors[polygon.level],
      strokeOpacity:'1',
      strokeWeight: '4',
      fillOpacity: '0.2',
      zIndex: polygon.level
    }"
  >
  ></gmap-polygon>
</template>

<script>
import api from '../../store/api'

export default {
  data () {
    return {
      polygon: [],
      colors: {
        1: '#417928',
        2: '#287969',
        3: '#2d828a',
        4: '#2d358a',
        5: '#512d8a'
      }
    }
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  components: {
  },
  mounted () {
    this.getPolygon()
  },
  methods: {
    getPolygon () {
      let options = {
        idt_poly: this.id
      }
      this.$http.get(api.API_REST_LINK4 + 'common/poly', {params: options}).then(response => {
        this.polygon = response.data.poly
      })
    }
  }
}
</script>
