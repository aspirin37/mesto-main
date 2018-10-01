import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

const MAPS_KEY = 'AIzaSyAY2rfNMOeJkOQw8s33VzbL7_UBaSoaIes'

Vue.use(VueGoogleMaps, {
    load: {
        key: MAPS_KEY,
        libraries: 'places'
    }
})

export default VueGoogleMaps
