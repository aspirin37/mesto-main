<template>
  <div id="app">
    <navbar></navbar>
    <main class="main-content">
      <vue-alert></vue-alert>
      <router-view></router-view>
      <!-- <transition name="fade">
        <router-view></router-view>
      </transition> -->
    </main>
    <main-footer></main-footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import MainFooter from './components/Footer'

export default {
  name: 'app',
  components: {
    Navbar,
    MainFooter
  }
}
</script>

<style lang="scss">
  @import './styles/app.scss';
</style>
