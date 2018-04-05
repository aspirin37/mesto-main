<template>
  <div class="relative">

    <!-- Paying cap -->
    <div class="over-cap p-3" v-if="showLoader">
      <loader></loader>
      <div class="over-cap__text text-center">
        <h4>{{creatingText}}</h4>
        <span class="progress-line mx-auto mw-400" v-if="progress > 0 && progress !== 100">
          <span class="progress-line__inner" v-bind:style="{width: progress + '%'}"></span>
        </span>
      </div>
    </div>
    <!-- /Paying cap -->

    <div class="bg-white rounded relative current-shadow p-3 py-md-4 px-lg-4 px-xl-5 mb-3">
      <h2 class="mb-3">Стоимость и оплата</h2>
      <h1 class="mb-3" v-if="price">{{price}} руб.</h1>

      <!-- Pay types -->
      <div class="mb-4 font-size-null">
        <label class="check-tabs__label h-100 mr-2 mb-2" v-for="(method, index) in Object.keys(groupedPayMethods)" :key="index">
          <input type="radio" class="check-tabs__input" :value="method" name="pay-method" :checked="payType === method" v-model="payType" v-on:change="setMethodIfOne">
          <span class="check-tabs__outer rounded py-3">
            <payment-method :type="method" class="mb-2"></payment-method>
            <b class="d-block">{{groupedPayMethods[method][0].type_name}}</b>
          </span>
        </label>
        <label class="check-tabs__label h-100 mr-2 mb-2" v-if="!groupedPayMethods[2]">
          <input type="radio" class="check-tabs__input" value="2" name="pay-method" :checked="payType === 2" v-model="payType" v-on:change="emitPayType">
          <span class="check-tabs__outer rounded py-3">
            <img src="../../assets/icons/fin-card-gray.svg" alt="" class="mb-2">
            <b class="d-block">Банковская карта</b>
          </span>
        </label>
        <label class="check-tabs__label h-100 mr-2 mb-2" v-if="Object.keys(groupedPayMethods).indexOf('4', '5') === -1 && !isCompany">
          <input type="radio" class="check-tabs__input" value="0" name="pay-method" :checked="payType === 0" v-model="payType" v-on:change="emitPayType">
          <span class="check-tabs__outer rounded py-3">
            <img src="../../assets/icons/file-doc.svg" alt="" class="mb-2">
            <b class="d-block">Безналичная оплата</b>
          </span>
        </label>
      </div>
      <!-- /Pay types -->

      <!-- Pay methods -->
      <div class="overflow-hidden d-flex">

        <!-- Addresses -->
        <transition name="side-slide" mode="out-in">
          <div v-show="+payType === 1" class="w-100">
            <p class="mb-2" v-if="Object.keys(orderAddresses).length"><b>На каком адресе будет оплата</b></p>
            <payment-address></payment-address>
            <div class="mt-3 pb-1">
              <label class="custom-check">
                <input type="checkbox" class="custom-check__input" v-model="isChange">
                <span class="custom-check__outer"><span class="custom-check__inner"></span></span>
                <span class="align-middle" v-if="isChange">Понадобится сдача c</span>
                <span class="align-middle" v-else>Понадобится сдача</span>
              </label>
              <input type="text" class="form-control form-control-sm d-inline-block mx-1 align-middle change-mx" v-if="isChange" v-model="change">
              <span v-if="isChange" class="align-middle">руб.</span>
            </div>
          </div>
        </transition>
        <!-- /Addresses -->

        <!-- Cards -->
        <transition name="side-slide" mode="out-in">
          <div v-show="+payType === 2" class="mw-400 w-100">
            <p class="text-danger" v-if="cardError"><b>Пожалуйста, выберите карту:</b></p>
            <div v-if="!groupedPayMethods[2] || showAddingCard" class="mb-3">
              <add-card v-on:cardAdded="showCards" :showCancel="groupedPayMethods[2] && groupedPayMethods[2].length > 0" v-on:cancelAdd="showAddingCard = false"></add-card>
            </div>
            <div v-else class="mb-3">
              <ul class="list-unstyled mb-3">
                <card-item
                  v-for="(card, index) in groupedPayMethods[2]"
                  :pan="card.alias || ''"
                  :cardDescr="card.type_name"
                  :checked="card.is_default"
                  :key="index"
                  v-on:onChange="payMethod = card.idt_pay_method"
                ></card-item>
              </ul>
              <div class="card-list-item relative text-center" v-on:click.prevent="showAddingCard = true">
                <span class="card-list-item__info">
                  <b>Новая карта</b>
                </span>
              </div>
            </div>
            <p class="text-center text-muted small mw-400 mx-auto">Оплата работает через «Альфа-Банк», защищена сертификатом SSL и соответствует стандартам безопасности PCI DSS</p>
            <div class="text-center">
              <img src="../../assets/icons/visa-verified.svg" alt="" class="mx-3 payment-window-logos">
              <img src="../../assets/icons/mastercard-securecode.svg" alt="" class="mx-3 payment-window-logos">
              <img src="../../assets/icons/logo-alfabank.svg" alt="" class="mx-3 payment-window-logos">
            </div>
          </div>
        </transition>
        <!-- /Cards -->

        <!-- Balance -->
        <transition name="side-slide" mode="out-in">
          <p v-show="+payType === 6 && isCompany">
            <b class="d-block">{{userProfile.company.company_name}}</b>
            <span class="mr-2 d-md-block">Баланс: <b v-thousands="userProfile.company.balance"></b> руб.</span>
            <span class="mr-2 d-md-block">Лимит: <b v-thousands="userProfile.company.balance_limit"></b> руб.</span>
          </p>
        </transition>
        <!-- /Balance -->

        <!-- Info -->
        <transition name="side-slide" mode="out-in">
          <p v-show="+payType === 0">Автоматическое получение счета станет доступно в ближайшее время. <br>
            Оплачивать по безналичному рассчету можно уже сейчас, звоните: <a href="tel:88003501646" class="link-reset text-dark"><b class="text-nowrap">8 800 350-16-46</b></a>
          </p>
        </transition>
        <!-- /Info -->

      </div>
      <!-- /Pay methods -->

      <p class="text-danger" v-if="errorMessage">{{errorMessage}}</p>
    </div>
  </div>
</template>

<script>
import api from '../../store/api'
import auth from '../../auth'
import CardItem from './CardItem'
import AddCard from '../order/AddCard'
import Loader from '../utils/Loader'
import PaymentAddress from './PaymentAddress'
import PaymentMethod from '../inner/PaymentMethod'

export default {
  name: 'payment-type',
  props: {
    price: ''
  },
  data () {
    return {
      payType: 1,
      isChange: false,
      payMethod: null,
      payMethods: [],
      showAddingCard: false,
      errorMessage: '',
      showLoader: false,
      cardError: false,
      creatingText: 'Создание заказа',
      progress: 0,
      change: null
    }
  },
  computed: {
    isAuth () {
      return auth.user.authenticated
    },
    orderPackets () {
      return Object.values(this.$store.state.orderPackets)
    },
    orderPhotos () {
      return this.$store.state.orderPhotos
    },
    orderTransport () {
      return this.$store.state.orderTransport
    },
    orderComment () {
      return this.$store.state.orderComment
    },
    orderAddresses () {
      return this.$store.state.orderAddresses
    },
    orderOptions () {
      return Object.values(this.$store.state.orderOptions)
    },
    groupedPayMethods () {
      return this.$store.state.groupedPayMethods
    },
    paymentAddress () {
      return this.$store.state.paymentAddress
    },
    userProfile () {
      return this.$store.state.profile
    },
    isCompany () {
      return this.userProfile.company && this.userProfile.company.balance
    }
  },
  watch: {
    payMethod (val) {
      this.$emit('methodsSetted', val)
      this.validatePayMethod()
    }
  },
  components: {
    CardItem,
    AddCard,
    Loader,
    PaymentAddress,
    PaymentMethod
  },
  mounted () {
    this.getPayMethods().then(() => {
      this.setMethodIfOne()
    })
  },
  methods: {
    getPayMethods () {
      return this.$http.get(api.API_REST_LINK2 + 'webclient/payMethods').then((response) => {
        this.payMethods = response.data.payMethods
        this.groupPayMethods()
      }).catch((error) => {
        this.errorMessage = error.data.message
      })
    },
    showCards () {
      this.getPayMethods()
      this.showAddingCard = false
    },
    groupPayMethods () {
      let methods = this.payMethods

      let createGroups = (items, key) => items.reduce((result, item, index) => {
        if (item.is_default) {
          this.payType = item.idc_pay_method_type
        }
        return {
          ...result,
          [item[key]]: [
            ...(result[item[key]] || []),
            item
          ]
        }
      }, {})
      let groupedMethods = createGroups(methods, 'idc_pay_method_type')
      this.$store.commit('SET_GROUPED_PAY_METHODS', groupedMethods)
    },
    validatePayMethod () {
      let thisTypeMethods = this.groupedPayMethods[this.payType]
      for (let i in thisTypeMethods) {
        if (thisTypeMethods[i]['idt_pay_method'] === this.payMethod) {
          this.cardError = false
          return true
        }
      }
      this.cardError = true
      return false
    },
    addOrder () {
      if (!this.validatePayMethod()) {
        return
      }
      this.cardError = false
      this.showLoader = true

      let changeNeeded = ''

      let options = {
        idt_city: 1,
        idt_pay_method: this.payMethod,
        idc_courier_transport: this.orderTransport,
        addresses: Object.values(this.orderAddresses)
      }
      if (this.orderPackets.length) { options.packets = this.orderPackets }
      if (this.payType === 1) {
        options.addresses[this.paymentAddress - 1].is_payment_address = true
        if (this.change) {
          changeNeeded = 'Понадобится сдача с ' + this.change + ' руб.\n'
        }
      }
      if (this.orderComment.length || changeNeeded.length) { options.description = changeNeeded + this.orderComment }
      if (this.orderOptions.length) { options.order_options = this.orderOptions.join() }

      this.$emit('adding', true)

      this.$http.post(api.API_REST_LINK4 + 'webclient/order', options).then((response) => {
        this.errorMessage = ''
        let data = response.data.order
        let responseDone = () => {
          this.showLoader = false
          this.$emit('added', data)
        }

        if (this.orderPhotos.length) {
          this.creatingText = 'Загрузка фото посылки'
          this.addPhotos(data.idt_order).then((response) => {
            responseDone()
          }).catch((error) => {
            this.errorMessage = error.data.message
            this.showLoader = false
          })
        } else {
          responseDone()
        }
        this.$emit('adding', false)
      }).catch((error) => {
        if (error.status === 402) {
          this.$emit('error', error.data)
        }
        this.$emit('adding', false)
        this.errorMessage = error.data.message
        this.showLoader = false
      })
      this.setCurrentPayMethod()
    },
    addPhotos (id) {
      let options = new window.FormData()
      let _this = this

      options.append('target', 'client')
      options.append('idt_order', id)

      for (let i in this.orderPhotos) {
        let file = this.orderPhotos[i]
        let extention = file.name.split('.').pop()

        options.append('photo[]', file, `imageFilename${i}.${extention || '.jpg'}`)
      }

      return this.$http.post(api.API_REST_LINK2 + 'web/photo', options, {
        progress (e) {
          if (e.lengthComputable) {
            _this.progress = (e.loaded / e.total * 100)
          }
        }
      })
    },
    setCurrentPayMethod () {
      let options = {
        idt_pay_method: this.payMethod
      }
      this.$http.put(api.API_REST_LINK4 + 'webclient/payMethods', options)
    },
    emitPayType () {
      this.$emit('typeSetted', this.payType)
    },
    setMethodIfOne () {
      this.emitPayType()
      if (this.groupedPayMethods[this.payType].length === 1) {
        this.payMethod = this.groupedPayMethods[this.payType][0].idt_pay_method
      }
    }
  }
}
</script>
