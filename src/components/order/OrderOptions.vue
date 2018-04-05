<template>
  <div>
    <p class="d-block mb-3 text-dark">
      <img src="../../assets/icons/plus-sm-icon.svg" alt="" class="inline-img mr-1 align-middle">
      <b>Дополнительные опции</b>
    </p>
    <div class="pl-md-4 mw-400">
      <label v-for="(option, index) in options" class="custom-check d-flex flex-row mb-3 justify-content-between flex-wrap flex-md-nowrap" :key="index">
        <span>
          <input type="checkbox" class="custom-check__input" :value="option.idt_order_options" v-model="checkedOptions" v-on:change="setOrderOptions">
          <span class="custom-check__outer"><span class="custom-check__inner"></span></span>
          <p class="mb-0 mr-1">{{option.name}}</p>
        </span>
        <span>{{option.cost_format}}</span>
      </label>
    </div>
    <!-- <table>
      <tr v-for="option in options" v-if="orderOptions.indexOf(option.idt_order_options) !== -1">
        <td class="pr-3">{{option.name}}</td>
        <td>{{option.cost_format}}</td>
        <td><a href="#" class="ml-3" v-on:click.prevent="removeOrderOption(option.idt_order_options)"><img src="../../assets/icons/close-del.svg" alt="X"></a></td>
      </tr>
    </table> -->
    <!-- <modal
      modalSize="modal-md"
      modalTitle="Добавить опции"
      :clickedBack="true"
      ref="order-options"
    >
      <div slot="modalBody">
        <div class="modal-scroll-body">
          <label v-for="(option, index) in options" class="custom-check d-flex mb-3 justify-content-between">
            <input type="checkbox" class="custom-check__input" :value="option.idt_order_options" v-model="checkedOptions">
            <span class="custom-check__outer"><span class="custom-check__inner"></span></span>
            <p class="mb-0 mr-3">{{option.name}}</p>
            <div>{{option.cost_format}}</div>
          </label>
        </div>
        <div class="pt-3">
          <button class="btn btn-theme mr-2" v-on:click="saveOrderOptions">Сохранить</button>
          <button class="btn btn-outline-secondary mr-2" v-on:click="toggleModal('order-options')">Отменить</button>
        </div>
      </div>
    </modal> -->
  </div>
</template>

<script>
import api from '../../store/api'
// import Modal from '../utils/Modal'

export default {
  name: 'order-packet',
  data () {
    return {
      options: {},
      checkedOptions: []
    }
  },
  components: {
    // Modal
  },
  computed: {
    orderOptions () {
      return this.$store.state.orderOptions
    },
    optionsLength () {
      return Object.keys(this.options).length
    }
  },
  mounted () {
    this.getOrderOptions()
    console.log('tyweuitywet')
  },
  methods: {
    // toggleModal (id) {
    //   this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    // },
    getOrderOptions () {
      this.$http.get(api.API_REST_LINK3 + 'webclient/deliveryOptions').then((response) => {
        this.options = response.data.options
        this.checkedOptions = this.orderOptions
        // this.toggleModal('order-options')
      })
    },
    // saveOrderOptions () {
    //   this.setOrderOptions()
    //   this.toggleModal('order-options')
    // },
    removeOrderOption (val) {
      let index = this.checkedOptions.indexOf(val)

      this.checkedOptions.splice(index, 1)
      this.setOrderOptions()
    },
    setOrderOptions () {
      this.$store.commit('SET_ORDER_OPTIONS', this.checkedOptions)
      this.$store.dispatch('CALC_ORDER_PRICE')
    }
  }
}
</script>
