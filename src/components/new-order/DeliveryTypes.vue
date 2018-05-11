<template>
  <div>
    <label class="check-tabs__label" v-for="(type, index) in types" :key="index">
      <input type="radio" class="check-tabs__input" :value="type.idt_delivery_type" name="delivery-type" :checked="+selectedType === +type.idt_delivery_type" v-on:change="setDeliveryType(type.idt_delivery_type)">
      <span class="check-tabs__outer rounded mr-2 mb-2 px-2">
        <b class="d-block">{{type.alias}}</b>
      </span>
    </label>
  </div>
</template>

<script>
import api from '../../store/api'

export default {
  name: 'delivery-types',
  data () {
    return {
      types: [],
      selectedType: null,
      storeValue: null
    }
  },
  props: {
    moveType: {
      type: Number,
      default: 1
    }
  },
  watch: {
    moveType (val) {
      this.getDeliveryTypes()
    }
  },
  beforeMount () {
    this.storeValue = this.$store.state.orderPackets.idt_delivery_type
  },
  mounted () {
    this.getDeliveryTypes().then(() => {
      if (this.storeValue) {
        this.selectedType = this.storeValue
      }
    })
  },
  methods: {
    getDeliveryTypes () {
      let options = {
        idc_courier_transport: this.moveType
      }
      return this.$http.get(api.API_REST_LINK2 + 'webclient/deliveryTypes', {params: options}).then(response => {
        this.types = response.data.deliveryTypes
        this.selectedType = this.types[0].idt_delivery_type
        this.setDeliveryType()
      })
    },
    setDeliveryType (val) {
      this.$emit('selected', val || this.selectedType)
    }
  }
}
</script>
