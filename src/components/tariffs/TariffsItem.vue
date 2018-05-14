<template>
  <div class="cursor-pointer rounded current-shadow mt-3 py-2 px-4 tariff-title-block" :style="`border-color:${color}`" v-on:click="showTariffinfo">
    <h3 class="mb-1">{{tariffData.alias || tariffData.name}}</h3>
    <span class="text-muted">Базовая стоимость</span>
    <h5>{{basePrice}} руб.</h5>
    <transition name="fade">
      <div v-if="selected">
        <div class="mt-3 d-flex" v-for="(caseGroup, index) in Object.entries(groupedTariffCases)" :key="`transp-${index}`">
          <span class="mr-3 tariff-icon" :class="`tariff-icon--${caseGroup[0]}`"></span>
          <div class="w-100">
            <p class="mb-2">{{titles[caseGroup[0]]}}</p>
            <p class="mb-1 d-flex justify-content-between w-100" v-for="(caseItem, index) in caseGroup[1]" :key="`case-${index}`">
              <span class="pr-3">{{tariffParams[caseItem.idc_tariff_param]}}</span>
              <span class="text-nowrap">+ <b>{{caseItem.cost}}</b> руб.</span>
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '../../store/api'

export default {
  data () {
    return {
      tariffData: {},
      tariffParams: {
        // Walk
        6: 'Прибытие на первый адрес',
        7: 'За каждую точку',
        8: 'Адрес вне зоны метро',
        9: 'до 2 кг',
        10: '2 – 5 кг',
        11: '5 – 10 кг',
        // Auto
        12: 'Прибытие на первый адрес',
        13: 'За каждую точку',
        14: 'Вес до 10 кг',
        15: '10 – 50 кг',
        16: '50 – 100 кг',
        17: '100 – 150 кг',
        18: 'до 50 кг',
        19: '50 – 100 кг',
        20: '100 – 150 кг'
      },
      isTariffSelected: false,
      transportParamsGroups: {
        1: {base: [6], prices: [7, 8], weight: [9, 10, 11]},
        4: {base: [12], prices: [13], weight: [14, 15, 16, 17], workWeight: [18, 19, 20]}
      },
      titles: {
        prices: 'Точки за пределами 500 м. от метро',
        weight: 'Вес',
        workWeight: 'Погрузка, разгрузка, подъем на лифте'
      }
    }
  },
  props: {
    id: null,
    color: {
      type: String,
      default: '#f6f6f6'
    },
    selected: false
  },
  computed: {
    tariffCases () {
      return this.tariffData.tariffCases
    },
    orderTransport () {
      return this.$store.state.orderTransport || 1
    },
    currentTransportGroup () {
      return this.transportParamsGroups[this.orderTransport]
    },
    groupedAllTariffCases () {
      let groups = this.currentTransportGroup || {}
      let cases = this.tariffCases || []
      let newGrouped = {}

      for (let item in groups) {
        let thisGroup = groups[item]
        let mathedCase = cases.filter(item => thisGroup.indexOf(item.idc_tariff_param) !== -1) || []

        if (mathedCase.length) {
          newGrouped[item] = mathedCase
        }
      }

      return newGrouped
    },
    groupedTariffCases () {
      let allCases = this.groupedAllTariffCases

      delete allCases.base
      return allCases
    },
    basePrice () {
      let result = this.groupedAllTariffCases.base

      return (result && result.length) ? result[0].cost : 0
    }
  },
  mounted () {
    this.getTariffData()
  },
  methods: {
    getBasePrice () {
      let result = this.tariffCases.filter(item => {
        return item.idc_tariff_param === 6
      })
      this.basePrice = result ? result[0].cost : 0
    },
    getTariffData () {
      let options = {
        idt_tariff: this.id
      }
      this.$http.get(api.API_REST_LINK4 + 'common/tariff', {params: options}).then(response => {
        this.tariffData = response.data.tariff
      })
    },
    showTariffinfo () {
      this.$emit('select', this.selected ? null : this.id)
    }
  }
}
</script>
