<template>
  <div>
    <h3>{{tariffData.alias || tariffData.name}}</h3>
    <p class="mb-1" v-for="(tariffCase, index) in tariffData.tariffCases" :key="`case-${index}`">{{tariffParams[tariffCase.idc_tariff_param]}} - {{tariffCase.cost}} руб.</p>
  </div>
</template>

<script>
import api from '../../store/api'

export default {
  data () {
    return {
      tariffData: {},
      tariffParams: {
        6: '[Пешком] Прибытие на первый адрес',
        7: '[Пешком] Прибытие на каждый следующий адрес',
        8: '[Пешком] Адрес вне зоны метро',
        9: '[Пешком] Посылка до 2 кг',
        10: '[Пешком] Посылка до 5 кг',
        11: '[Пешком] Посылка до 10 кг',
        12: '[Авто] Прибытие на первый адрес',
        13: '[Авто] Прибытие на каждый следующий адрес',
        14: '[Авто] Посылка до 10 кг',
        15: '[Авто] Груз до 50 кг',
        16: '[Авто] Груз до 100 кг',
        17: '[Авто] Груз до 150 кг',
        18: '[Авто] Погрузка, разгрузка, подъем на лифте до 50 кг',
        19: '[Авто] Погрузка, разгрузка, подъем на лифте до 100 кг',
        20: '[Авто] Погрузка, разгрузка, подъем на лифте до 150 кг'
      }
    }
  },
  props: {
    id: null
  },
  components: {
  },
  mounted () {
    this.getTariffData()
  },
  methods: {
    getTariffData () {
      let options = {
        idt_tariff: this.id
      }
      this.$http.get(api.API_REST_LINK4 + 'common/tariff', {params: options}).then(response => {
        this.tariffData = response.data.tariff
      })
    }
  }
}
</script>
