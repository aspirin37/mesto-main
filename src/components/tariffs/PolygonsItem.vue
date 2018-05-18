<template>
  <gmap-polygon
    :editable="false"
    :path="polygon.points"
    :options="{
      fillColor: color,
      strokeColor: color,
      strokeOpacity:'1',
      strokeWeight: `${selected ? 4 : 2}`,
      fillOpacity: `${0.2}`,
      zIndex: polygon.level
    }"
  >
  ></gmap-polygon>
</template>

<script>
import api from '@/store/api'

export default {
  data () {
    return {
      polygon: []
    }
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    color: {
      type: String,
      default: '#f6f6f6'
    },
    selected: false
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
        if (this.polygon.is_city_main) {
          this.$emit('select', this.polygon.idt_tariff)
        }
      })
    }
  }
}
</script>
