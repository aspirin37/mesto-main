import api from './api'
import auth from '../auth'
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

const state = {
  locations: {
    1: {id: 1, city: 'Санкт-Петербург', center: {lat: 59.939160, lng: 30.316164}},
    2: {id: 2, city: 'Москва', center: {lat: 55.753215, lng: 37.622504}}
  },

  currentLocation: 1,
  isCityGetted: false,
  currentCountry: 'ru',
  profile: {},
  phoneMasks: {
    'ru': ['+7 (999) 999-9999', '+9 (999) 999-9999'],
    'ua': '+380 (99) 999-9999'
  },
  language: 'ru',
  addressTimes: {},
  ticketTypes: {
    '1': 'Общий вопрос',
    '2': 'Пропала посылка',
    '3': 'Отмена заказа',
    '4': 'Посылка испорчена'
  },
  companyData: {
    phone: '8 800 350-16-46',
    legalAddress: '197198, Санкт-Петербург, Большой пр. П.С. 29а'
  },
  orderTransport: 1,
  orderAddresses: {},
  orderPackets: [],
  orderPrice: null,
  orderPhotos: [],
  orderOptions: [],
  orderComment: '',
  orderCostDeclare: '',
  paymentAddress: null,
  groupedPayMethods: {},
  orders: {},
  addedOrderData: {}
}

var resource = Vue.resource(`${api.API_REST_LINK2}webclient/history`)

const actions = {
  fetchData ({commit}, opts) {
    return resource.get(opts.options).then(response => {
      let options = { key: opts.path, value: response.data }
      commit('SET_STATE_VALUE', {options})
    })
  },
  LOAD_PROFILE ({commit}) {
    var setCityGetted = () => {
      let options = { key: 'isCityGetted', value: true }

      commit('SET_STATE_VALUE', {options})
    }
    Vue.http.get(api.API_REST_LINK2 + 'webclient/profile').then(response => {
      let data = response.data
      let city = data.profile.idt_city

      commit('SET_PROFILE_DATA', { profileData: data.profile })
      if (city) {
        let options = { key: 'currentLocation', value: city }

        commit('SET_STATE_VALUE', {options})
      }
      setCityGetted()
    }).catch(error => {
      if (error.status === 403) {
        auth.resetCookie()
      }
      setCityGetted()
    })
  },
  GET_CURRENT_CITY ({commit}, cords) {
    let options = cords || {lat: 59.939160, lng: 30.316164}

    Vue.http.get(api.API_REST_LINK4 + 'common/city', {params: options}).then(response => {
      let data = response.data
      let city = data.city.idt_city
      let options = { key: 'currentLocation', value: city || 1 }

      commit('SET_STATE_VALUE', { options })
    }).catch(error => {
      if (error.status === 403) {
        auth.resetCookie()
      }
    })
  },
  CALC_ORDER_PRICE ({commit, state}) {
    let options = {
      idc_courier_transport: state.orderTransport
    }
    let formattedAddresses = Object.values(state.orderAddresses).reduce((acc, item) => {
      if (item.lat) {
        acc.push(item)
      }
      return acc
    }, [])

    if (formattedAddresses.length < 1) {
      formattedAddresses.push(state.locations[state.currentLocation].center)
    }
    options.addresses = formattedAddresses
    if (state.orderPackets[0] && state.orderPackets[0].hasOwnProperty('idt_delivery_type')) {
      options['idt_delivery_type'] = state.orderPackets[0]['idt_delivery_type']
    }
    if (state.orderPackets[0] && state.orderPackets[0].hasOwnProperty('idc_packet_type')) {
      options['idc_packet_type'] = state.orderPackets[0]['idc_packet_type']
    }
    if (state.orderCostDeclare) {
      options['cost_declare'] = state.orderCostDeclare
    }
    if (state.orderOptions.length) {
      options['options'] = state.orderOptions
    }

    return Vue.http.post(api.API_REST_LINK4 + 'common/cost', options).then(response => {
      let price = response.data.cost
      commit('SET_ORDER_PRICE', price)
    })
  }
}

const mutations = {
  CHANGE_LOCATION (state, newLocation) {
    state.currentLocation = newLocation
  },
  CHANGE_PROFILE (state, newData) {
    state.profile = newData
  },
  SET_PROFILE_DATA: (state, { profileData }) => {
    state.profile = profileData
  },
  RESET_PROFILE: (state) => {
    state.profile = {}
  },
  SET_ADDRESS_TIME: (state, options) => {
    if (+options.value > +state.addressTimes[+options.key + 1]) {
      Vue.delete(state.addressTimes, (+options.key + 1))
    } else {
      Vue.set(state.addressTimes, options.key, options.value)
    }
  },
  REMOVE_ADDRESS_TIME: (state, { options }) => {
    Vue.delete(state.orderAddresses[options.step], options.key)
  },
  REMOVE_ORDER_ADDRESS: (state, key) => {
    Vue.delete(state.orderAddresses, key)

    // Rename keys
    for (let i = +key + 1; i <= Object.keys(state.orderAddresses).length + 1; i++) {
      Vue.set(state.orderAddresses, (i - 1).toString(), state.orderAddresses[i.toString()])
      Vue.delete(state.orderAddresses, i.toString())
    }
  },
  SET_ORDER_ADDRESS: (state, { options }) => {
    Vue.set(state.orderAddresses, options.key, options.value)
  },
  REORDER_ADDRESSES: (state, options) => {
    let sortedAddresses = {}
    for (let i = 0; i < options.length; i++) {
      sortedAddresses[i + 1] = state.orderAddresses[options[i]]
    }
    Vue.set(state, 'orderAddresses', sortedAddresses)
  },
  SET_ORDER_ADDRESS_CORDS: (state, { options }) => {
    // For saving other data when change marker
    if (!state.orderAddresses.hasOwnProperty(options.key)) {
      Vue.set(state.orderAddresses, options.key, {})
    }
    let opts = options.value
    for (let item in opts) {
      Vue.set(state.orderAddresses[options.key], item, opts[item])
    }
  },
  SET_ORDER_PRICE: (state, value) => {
    state.orderPrice = value
  },
  SET_ORDER_PHOTOS: (state, value) => {
    state.orderPhotos = value
  },
  SET_ORDER_INSURANCE: (state, value) => {
    state.orderCostDeclare = value
  },
  SET_PAYMENT_ADDRESS: (state, value) => {
    state.paymentAddress = value
  },
  SET_GROUPED_PAY_METHODS: (state, options) => {
    state.groupedPayMethods = options
  },
  CLEAR_ORDER_DATA: (state) => {
    state.orderAddresses = {}
    state.orderPackets = []
    state.orderPhotos = []
    state.orderOptions = []
    state.orderComment = ''
    state.orderCostDeclare = ''
    state.paymentAddress = null
    state.orderPrice = null
  },
  SET_STATE_VALUE: (state, { options }) => {
    state[options.key] = options.value
  },
  SET_STATE_OBJECT_VALUE: (state, { options }) => {
    if (options.value) {
      Vue.set(state[options.vari], options.key, options.value)
    } else {
      Vue.delete(state[options.vari], (options.key))
    }
  }
}

const getters = {
  currentLocation (state) {
    return state.currentLocation
  },
  userProfile (state) {
    return state.profile
  },
  orderAddresses (state) {
    return state.orderAddresses
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
