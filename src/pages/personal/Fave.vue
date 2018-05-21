<template>
  <div class="bg-white rounded current-shadow p-3 widget--min-height relative p-3 p-md-4">
    <div class="form-group">
      <h3>{{$t('fave')}}</h3>
      <p class="text-muted">
        {{$t('favorite.fave-subtext')}}
      </p>
    </div>
    <fave-addresses></fave-addresses>
  </div>
</template>

<script>
import FaveAddresses from '@/components/fave/FaveAddresses'

export default {
  name: 'profile-fave',
  data () {
    return {
    }
  },
  components: {
    FaveAddresses
  },
  methods: {
  }
}
</script>
