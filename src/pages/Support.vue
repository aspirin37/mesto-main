<template>
  <div class="pb-4">
    <div class="d-flex justify-content-between align-items-center">
      <ul class="nav nav-tabs widget__tabs">
        <li class="nav-item">
          <router-link :to="{name: 'tickets-open'}" class="nav-link" active-class="active current-shadow">Открытые</router-link>
        <li class="nav-item">
          <router-link :to="{name: 'tickets-close'}" class="nav-link" active-class="active current-shadow">Архивные</router-link>
        </li>
      </ul>
      <router-link :to="{ name: 'profile-add-ticket'}" class="btn btn-success btn-sm fixed-sm-btn">
        <span class="visible-xs">+</span><span class="d-none d-md-inline-block pl-1">{{$t('support.create')}}</span>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'profile-support',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
