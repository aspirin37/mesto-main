<template>
  <a href="#" title="Повторить заказ" v-on:click.prevent="repeatOrder"><img src="../../assets/icons/repeat-refresh.svg" alt="repeat"></a>
</template>

<script>
export default {
  name: 'profile-order',
  data () {
    return {
    }
  },
  props: {
    orderData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    repeatOrder () {
      this.setAddresses()
      this.setTransport()
      this.setPacketData()
      this.setOrderOptions()
      this.$router.push({name: 'new-order'})
    },
    setAddresses () {
      let addresses = {}
      this._.forEach(this.orderData.addresses, (address, index) => {
        delete address.a_time
        delete address.a_time_format
        delete address.contact_time
        delete address.contact_time_format

        addresses[index + 1] = address
      })
      let options = {
        key: 'orderAddresses',
        value: addresses
      }

      this.$store.commit('SET_STATE_VALUE', {options})
    },
    setTransport () {
      let options = {
        key: 'orderTransport',
        value: +this.orderData.idc_courier_transport
      }

      this.$store.commit('SET_STATE_VALUE', {options})
    },
    setPacketData () {
      let packetData = {
        weight: 1,
        idc_packet_type: this.orderData.packets[0].idc_packet_type,
        idt_delivery_type: this.orderData.packets[0].idt_delivery_type
      }
      let options = {
        key: 1,
        value: packetData
      }

      this.$store.commit('SET_ORDER_PACKET', {options})
    },
    setOrderOptions () {
      let orderOptions = this._.map(this.orderData.options, (option) => {
        return option.idt_order_options
      })
      let options = {
        key: 'orderOptions',
        value: orderOptions
      }

      this.$store.commit('SET_STATE_VALUE', {options})
    }
  }
}
</script>
