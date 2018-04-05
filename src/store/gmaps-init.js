import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

const MAPS_KEY = 'AIzaSyBiUfkzIUxYQk9gF7ml5q5HEA-FGU7xqHE'

Vue.use(VueGoogleMaps, {
  load: {
    key: MAPS_KEY,
    libraries: 'places'
  }
})

export default VueGoogleMaps
