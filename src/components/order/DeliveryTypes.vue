<template>
  <div>
    <label class="check-tabs__label" v-for="(type, index) in types" :key="index">
      <input type="radio" class="check-tabs__input" :value="type.idt_delivery_type" name="delivery-type" :checked="+selectedType === +type.idt_delivery_type" v-on:change="setDeliveryType(type.idt_delivery_type)">
      <span class="check-tabs__outer rounded mr-2 mb-2 px-2">
        <b class="d-block">{{type.alias}}</b>
      </span>
    </label>
  </div>
  <!-- <v-select tag="a" :linkClass="['form-control']" :outerClass="['form-group']" :options="types" v-on:selected="setDeliveryType($event.idt_delivery_type)" optionValue="alias" :selectedItem="selectedType" v-if="types"></v-select> -->
</template>

<script>
import api from '../../store/api'
import vSelect from '../utils/Select'

export default {
  name: 'delivery-types',
  data () {
    return {
      types: [],
      selectedType: null
    }
  },
  props: {
    moveType: {
      type: Number,
      default: 1
    }
  },
  components: {
    vSelect
  },
  watch: {
    moveType (val) {
      this.getDeliveryTypes()
    }
  },
  mounted () {
    this.getDeliveryTypes()
  },
  methods: {
    getDeliveryTypes () {
      let options = {
        idc_courier_transport: this.moveType
      }
      return this.$http.get(api.API_REST_LINK2 + 'webclient/deliveryTypes', {params: options}).then((response) => {
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
