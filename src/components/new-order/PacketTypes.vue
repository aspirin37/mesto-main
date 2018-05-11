<template>
  <div>
    <label class="check-tabs__label" v-for="(type, index) in types" :key="index">
      <input type="radio" class="check-tabs__input"
        :value="type.idc_packet_type"
        :checked="+selectedType === type.idc_packet_type"
        name="packet-type"
        v-on:change="setPacketType(selectedType = type.idc_packet_type)"
      >
      <span class="check-tabs__outer rounded mr-2 mb-2">
        <b class="d-block">{{type.alias}}</b>
        <span class="text-muted small">{{type.description}}</span>
      </span>
    </label>
  </div>
</template>

<script>
import api from '@/store/api'

export default {
  name: 'packet-types',
  data () {
    return {
      types: [],
      selectedType: null,
      storeValue: null
    }
  },
  watch: {
    orderTransport () {
      this.getPacketTypes()
    }
  },
  beforeMount () {
    this.storeValue = this.$store.state.orderPackets.idc_packet_type
  },
  mounted () {
    this.getPacketTypes().then(() => {
      if (this.storeValue) {
        this.selectedType = this.storeValue
      }
    })
  },
  computed: {
    orderTransport () {
      return this.$store.state.orderTransport
    }
  },
  methods: {
    getPacketTypes () {
      let options = {
        idc_courier_transport: this.orderTransport
      }
      return this.$http.get(api.API_REST_LINK2 + 'webclient/packetTypes', {params: options}).then(response => {
        this.types = response.data.packetTypes
        this.selectedType = this.types[0].idc_packet_type
        this.setPacketType()
      })
    },
    setPacketType (val) {
      this.$emit('selected', val || this.selectedType)
    }
  }
}
</script>
