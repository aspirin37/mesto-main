<template>
  <div class="mt-3 relative" v-on:dragover="onDragged = true" v-on:drop="onDragged = false">
    <div class="overflow-x">
      <packet-types class="mb-3" v-on:selected="setPacketData(packetType = $event)"></packet-types>
    </div>
    <delivery-types v-on:selected="setPacketData(deliveryType = $event)" class="mb-4"></delivery-types>
    <order-comment></order-comment>
    <order-photos :outerOnDragged="onDragged" v-on:end="onDragged = false"></order-photos>
    <order-insurance></order-insurance>
    <order-options></order-options>
  </div>
</template>

<script>
import PacketTypes from './PacketTypes'
import OrderOptions from './OrderOptions'
import OrderPhotos from './OrderPhotos'
import OrderComment from './OrderComment'
import OrderInsurance from './OrderInsurance'
import DeliveryTypes from './DeliveryTypes'

export default {
  name: 'order-packet',
  data () {
    return {
      packetType: null,
      deliveryType: null,
      onDragged: false
    }
  },
  components: {
    PacketTypes,
    DeliveryTypes,
    OrderOptions,
    OrderComment,
    OrderInsurance,
    OrderPhotos
  },
  methods: {
    setPacketData () {
      let packetData = {
        weight: 1
      }

      if (this.packetType) {
        packetData.idc_packet_type = this.packetType
      }

      if (this.deliveryType) {
        packetData.idt_delivery_type = this.deliveryType
      }

      let options = {
        key: 'orderPackets',
        value: [packetData]
      }

      this.$store.commit('SET_STATE_VALUE', {options})
      this.$store.dispatch('CALC_ORDER_PRICE')
    }
  }
}
</script>
