<template>
  <section>
    <div class="page-header-block">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-8 text-center text-md-left">
            <h1 class="text-white">Тарифы</h1>
            <span>Стоимость доставки расчитывается автоматически при совершении заказа на сайте и является окончательной.</span>
            <p>Скрытые платежи и абонентская плата отсутствуют.</p>
          </div>
          <div class="col-12 col-lg-4">
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="page-content p-2 p-md-4 rounded bg-white mb-4">
        <div class="row">
          <div class="col-12 col-lg-4">
            <p class="my-0 tariffs-title-mrg">Базовая стоимость</p>
            <h2 class="my-0 tariffs-title-mrg"><b>250 ₽</b></h2>
            <p class="text-muted status status--color tariffs-title-mrg" v-on:mouseenter="showFirstZone = true" v-on:mouseleave="showFirstZone = false">Точки забора и выдачи посылки в радиусе 500 м от метро</p>
            <table class="tariffs-info-table">
              <tr class="tariffs-info-table__tr">
                <td valign="top" class="tariffs-info-table__icon"><i class="material-icons">place</i></td>
                <td valign="top" class="tariffs-info-table__text"><a href="#" class="link-reset"><span v-on:mouseenter="showSecondZone = true" v-on:mouseleave="showSecondZone = false">Точки за пределами 500 м. от метро</span><p>За каждую точку</p></a></td>
                <td valign="top" class="tariffs-info-table__text--price"><b class="text-nowrap">+ 50 ₽</b></td>
              </tr>
              <tr class="tariffs-info-table__tr">
                <td valign="top" class="tariffs-info-table__icon"><i class="material-icons">account_box</i></td>
                <td valign="top" class="tariffs-info-table__text"><p>Курьер с паспортом</p></td>
                <td valign="top" class="tariffs-info-table__text--price"><b class="text-nowrap">+ 0 ₽</b></td>
              </tr>
              <tr class="tariffs-info-table__tr">
                <td valign="top" class="tariffs-info-table__icon"><i class="material-icons">directions_car</i></td>
                <td valign="top" class="tariffs-info-table__text"><p>Курьер на автомобиле</p></td>
                <td valign="top" class="tariffs-info-table__text--price"><b class="text-nowrap">+ 200 ₽</b></td>
              </tr>
              <tr class="tariffs-info-table__tr">
                <td valign="top" class="tariffs-info-table__icon"><i class="material-icons">timelapse</i></td>
                <td valign="top" class="tariffs-info-table__text"><p>Ожидание, за каждые 15 мин</p></td>
                <td valign="top" class="tariffs-info-table__text--price"><b class="text-nowrap">+ 50 ₽</b></td>
              </tr>
              <tr class="tariffs-info-table__tr">
                <td valign="top" class="tariffs-info-table__icon"><i class="material-icons">insert_drive_file</i></td>
                <td valign="top" class="tariffs-info-table__text"><p>Упаковка в сейф-пакет</p></td>
                <td valign="top" class="tariffs-info-table__text--price"><b class="text-nowrap">+ 20 ₽</b></td>
              </tr>
              <tr class="tariffs-info-table__tr">
                <td valign="top" class="tariffs-info-table__icon"><i class="material-icons">fitness_center</i></td>
                <td valign="top" class="tariffs-info-table__text tariffs-info-table__text--sm">
                  <div>Вес до 1 кг</div>
                  <div>1 – 5 кг</div>
                  <div>5 – 10 кг</div>
                  <p>10 – 15 кг</p>
                </td>
                <td valign="top" class="tariffs-info-table__text--price">
                  <div><b class="text-nowrap">+ 0 ₽</b></div>
                  <div><b class="text-nowrap">+ 100 ₽</b></div>
                  <div><b class="text-nowrap">+ 200 ₽</b></div>
                  <div><b class="text-nowrap">+ 300 ₽</b></div>
                </td>
              </tr>
              <tr class="tariffs-info-table__tr">
                <td valign="top" class="tariffs-info-table__icon"><i class="material-icons">beach_access</i></td>
                <td valign="top" class="tariffs-info-table__text tariffs-info-table__text--sm"><span>Страхование посылки</span><p><small>до 50 000 ₽</small></p></td>
                <td valign="top" class="tariffs-info-table__text--price"><b class="text-nowrap">+ 1%</b></td>
              </tr>
            </table>
          </div>
          <div class="col-12 col-lg-8">
            <div class="profile-order-map relative h-100">
              <gmap-map
                class="h-100"
                :center="center"
                :zoom="11"
                ref="mmap"
                :options="{
                  styles: mapStyles
                }"
              >
                <gmap-circle
                  v-for="(m, index) in subway"
                  :key="index"
                  :options="{
                    fillColor: '#5E39BA',
                    strokeColor: '#5E39BA',
                    strokeOpacity: showFirstZone ? '1' : '0.8',
                    strokeWeight: '1',
                    fillOpacity: showFirstZone ? '1' : '0.8',
                    zIndex: '9'
                  }"
                  :center="{lat: +m.lat, lng: +m.lng}"
                  :radius="m.radius"
                ></gmap-circle>
                <gmap-polygon
                  :paths="cityBoundaries"
                  :editable="false"
                  :options="{
                    fillColor: '#5E39BA',
                    strokeColor: '#5E39BA',
                    strokeOpacity: showSecondZone ? '0.5' : '0.3',
                    strokeWeight: '1',
                    fillOpacity: showSecondZone ? '0.5' : '0.3'
                  }"
                >
                </gmap-polygon>
              </gmap-map>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/store/api'
import gMapsInit from '@/store/gmaps-init'
import mapStyles from '@/mixins/mapStyles'

export default {
  name: 'tariffs',
  data () {
    return {
      center: {lat: 59.936, lng: 30.352},
      errorMessage: '',
      windowMaps: {},
      subway: [],
      showFirstZone: false,
      showSecondZone: false,
      cityBoundaries: [
        {lng: 30.045601999999999, lat: 59.765537999999999},
        {lng: 30.084562999999999, lat: 59.775748999999998},
        {lng: 30.097950999999998, lat: 59.783926999999998},
        {lng: 30.098783999999998, lat: 59.795499},
        {lng: 30.105604999999997, lat: 59.797359},
        {lng: 30.104897999999999, lat: 59.802861},
        {lng: 30.123415999999999, lat: 59.804455999999995},
        {lng: 30.127685999999997, lat: 59.809064999999997},
        {lng: 30.104616999999998, lat: 59.817332},
        {lng: 30.075288999999998, lat: 59.815233999999997},
        {lng: 30.069735999999999, lat: 59.838422999999999},
        {lng: 30.091549999999998, lat: 59.835927999999996},
        {lng: 30.090391, lat: 59.852854000000001},
        {lng: 30.100572999999997, lat: 59.853406},
        {lng: 30.098519999999997, lat: 59.863529999999997},
        {lng: 30.116257999999998, lat: 59.862791999999999},
        {lng: 30.117193, lat: 59.858694},
        {lng: 30.118141999999999, lat: 59.862736999999996},
        {lng: 30.139982, lat: 59.862547999999997},
        {lng: 30.155597999999998, lat: 59.872005999999999},
        {lng: 30.175625, lat: 59.870352999999994},
        {lng: 30.161479999999997, lat: 59.874247999999994},
        {lng: 30.172315999999999, lat: 59.884180000000001},
        {lng: 30.168983999999998, lat: 59.888311999999999},
        {lng: 30.194848, lat: 59.889074000000001},
        {lng: 30.216104999999999, lat: 59.903966999999994},
        {lng: 30.207180999999999, lat: 59.908590999999994},
        {lng: 30.213773, lat: 59.916069999999998},
        {lng: 30.258932999999999, lat: 59.915613},
        {lng: 30.230784, lat: 59.926717999999994},
        {lng: 30.234940999999999, lat: 59.927644000000001},
        {lng: 30.230153999999999, lat: 59.929973999999994},
        {lng: 30.231960999999998, lat: 59.933208},
        {lng: 30.227397, lat: 59.928658999999996},
        {lng: 30.202656999999999, lat: 59.928729999999995},
        {lng: 30.191084, lat: 59.932348999999995},
        {lng: 30.177899999999998, lat: 59.944032999999997},
        {lng: 30.190445999999998, lat: 59.943550999999999},
        {lng: 30.194606, lat: 59.950514999999996},
        {lng: 30.183177999999998, lat: 59.953344999999999},
        {lng: 30.190709999999999, lat: 59.961154000000001},
        {lng: 30.236096999999997, lat: 59.963974},
        {lng: 30.213578999999999, lat: 59.972190999999995},
        {lng: 30.217272999999999, lat: 59.977331},
        {lng: 30.226552999999999, lat: 59.977818999999997},
        {lng: 30.223208999999997, lat: 59.982807999999999},
        {lng: 30.204065999999997, lat: 59.979078999999999},
        {lng: 30.190227999999998, lat: 59.982285999999995},
        {lng: 30.184189, lat: 59.989672999999996},
        {lng: 30.178687, lat: 59.988989999999994},
        {lng: 30.183221999999997, lat: 59.988612999999994},
        {lng: 30.182023999999998, lat: 59.985505999999994},
        {lng: 30.162977999999999, lat: 59.983984999999997},
        {lng: 30.159177, lat: 59.987744999999997},
        {lng: 30.097175999999997, lat: 59.990470999999999},
        {lng: 30.06401, lat: 59.996862},
        {lng: 30.079628, lat: 60.004761999999999},
        {lng: 30.079103999999997, lat: 60.027173999999995},
        {lng: 30.146186999999998, lat: 60.034714999999998},
        {lng: 30.138168999999998, lat: 60.042043},
        {lng: 30.142097999999997, lat: 60.045153999999997},
        {lng: 30.134124999999997, lat: 60.048736999999996},
        {lng: 30.193317999999998, lat: 60.063899999999997},
        {lng: 30.195864, lat: 60.060472999999995},
        {lng: 30.214112999999998, lat: 60.061273},
        {lng: 30.222778999999999, lat: 60.051344},
        {lng: 30.274327, lat: 60.068716999999999},
        {lng: 30.341062999999998, lat: 60.060820999999997},
        {lng: 30.366979999999998, lat: 60.090736999999997},
        {lng: 30.388112, lat: 60.057077},
        {lng: 30.418560999999997, lat: 60.049681999999997},
        {lng: 30.415648999999998, lat: 60.046709},
        {lng: 30.437611999999998, lat: 60.039133},
        {lng: 30.468230999999999, lat: 60.033555999999997},
        {lng: 30.462163, lat: 60.028611999999995},
        {lng: 30.468398999999998, lat: 60.027364999999996},
        {lng: 30.464105999999997, lat: 60.025835999999998},
        {lng: 30.467320999999998, lat: 60.022908999999999},
        {lng: 30.488766999999999, lat: 60.023206999999999},
        {lng: 30.485793999999999, lat: 60.014702999999997},
        {lng: 30.489314999999998, lat: 60.008324999999999},
        {lng: 30.503990999999999, lat: 60.006430999999999},
        {lng: 30.499341999999999, lat: 60.000488999999995},
        {lng: 30.508091, lat: 59.987130999999998},
        {lng: 30.517322, lat: 59.985317999999999},
        {lng: 30.534659999999999, lat: 59.992602999999995},
        {lng: 30.537778999999997, lat: 59.988105999999995},
        {lng: 30.528064999999998, lat: 59.982105999999995},
        {lng: 30.552291, lat: 59.981093999999999},
        {lng: 30.548434, lat: 59.978707999999997},
        {lng: 30.566029, lat: 59.970965},
        {lng: 30.552492999999998, lat: 59.968989999999998},
        {lng: 30.544484999999998, lat: 59.976282999999995},
        {lng: 30.513100999999999, lat: 59.970558999999994},
        {lng: 30.495418999999998, lat: 59.891478999999997},
        {lng: 30.519998999999999, lat: 59.863228999999997},
        {lng: 30.493492, lat: 59.858201999999999},
        {lng: 30.492441999999997, lat: 59.848545999999999},
        {lng: 30.532696999999999, lat: 59.834061999999996},
        {lng: 30.561475999999999, lat: 59.835449999999994},
        {lng: 30.561254999999999, lat: 59.82761},
        {lng: 30.567166, lat: 59.823924999999996},
        {lng: 30.554278, lat: 59.821234999999994},
        {lng: 30.548497999999999, lat: 59.813128999999996},
        {lng: 30.520213999999999, lat: 59.823929999999997},
        {lng: 30.520128999999997, lat: 59.819230999999995},
        {lng: 30.508285999999998, lat: 59.812642999999994},
        {lng: 30.511551999999998, lat: 59.807772},
        {lng: 30.475197999999999, lat: 59.833988999999995},
        {lng: 30.406219999999998, lat: 59.819215},
        {lng: 30.348049, lat: 59.812899999999999},
        {lng: 30.324658999999997, lat: 59.803742999999997},
        {lng: 30.326332999999998, lat: 59.776260000000001},
        {lng: 30.337792999999998, lat: 59.770372999999999},
        {lng: 30.309998, lat: 59.744147999999996},
        {lng: 30.258558999999998, lat: 59.762678999999999},
        {lng: 30.271155999999998, lat: 59.778596999999998},
        {lng: 30.289849999999998, lat: 59.790402},
        {lng: 30.283842, lat: 59.795238999999995},
        {lng: 30.270108999999998, lat: 59.794460999999998},
        {lng: 30.270495999999998, lat: 59.789790999999994},
        {lng: 30.211316, lat: 59.797691},
        {lng: 30.179615999999999, lat: 59.790783999999995},
        {lng: 30.176562999999998, lat: 59.796049999999994},
        {lng: 30.149932, lat: 59.800925999999997},
        {lng: 30.129505999999999, lat: 59.782501999999994},
        {lng: 30.154015999999999, lat: 59.796878},
        {lng: 30.162813999999997, lat: 59.796268999999995},
        {lng: 30.147434999999998, lat: 59.777979999999999},
        {lng: 30.145989999999998, lat: 59.774383999999998},
        {lng: 30.152775999999999, lat: 59.771753999999994},
        {lng: 30.141686, lat: 59.76117},
        {lng: 30.110151999999999, lat: 59.762634999999996},
        {lng: 30.076138999999998, lat: 59.747921999999996},
        {lng: 30.062885999999999, lat: 59.751061999999997},
        {lng: 30.071860999999998, lat: 59.756031999999998},
        {lng: 30.062078, lat: 59.756982000000001},
        {lng: 30.055963999999999, lat: 59.763281999999997},
        {lng: 30.043823999999997, lat: 59.762387999999994},
        {lng: 30.045601999999999, lat: 59.765537999999999}
      ]
    }
  },
  components: {
    'GmapMap': gMapsInit.Map
  },
  mixins: [mapStyles],
  beforeMount () {
    this.getSubway()
    gMapsInit.loaded.then(() => {
      this.windowMaps = window.google.maps
      this.center = this.currentLocation.center
    })
  },
  computed: {
    currentLocation () {
      return this.$store.state.locations[this.$store.state.currentLocation]
    }
  },
  watch: {
    currentLocation () {
      this.center = this.currentLocation.center
    }
  },
  methods: {
    getSubway () {
      let options = {
        idt_city: 1
      }
      this.$http.get(api.API_REST_LINK2 + 'web/subway', {params: options}).then(response => {
        this.subway = response.data.stations
      }).catch(error => {
        this.errorMessage = error.data.message
      })
    }
  }
}
</script>
