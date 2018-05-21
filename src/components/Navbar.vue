<template>
  <header class="fixed-top" v-on-click-outside="clickedOutside">
    <nav class="navbar navbar-expand-lg navbar-dark bg-theme">
      <div class="container">

        <!-- Logo -->
        <router-link to="/" class="navbar-brand mr-4">
          <img src="@/assets/logo.svg" alt="logo" class="navbar-logo" v-if="locale === 'ru'">
          <img src="@/assets/logo-en.svg" alt="logo" class="navbar-logo" v-else>
        </router-link>
        <!-- /Logo -->

        <!-- Mobile avatar -->
        <router-link :to="{ name: 'profile'}" class="navbar-user-logo d-lg-none ml-auto" v-if="isAuth">
          <span class="navbar-user-logo__img">
            <img v-bind:src="profile.avatar_path" alt="user logo">
          </span>
        </router-link>
        <!-- /Mobile avatar -->

        <!-- Menu icon -->
        <a href="#" class="nav-trigger d-lg-none" data-toggle="collapse" v-on:click.prevent="showNavbar = !showNavbar" v-bind:class="{'nav-trigger--opened' : showNavbar}">
          <span></span>
        </a>
        <!-- /Menu icon -->

        <div class="navbar-collapse pt-3 pt-sm-0" v-bind:class="{'collapse': !showNavbar}">

          <!-- Navbar links -->
          <ul class="navbar-nav align-items-center">
            <li class="pr-1">
              <router-link tag="a" :to="{name: 'new-order'}" class="btn btn-light btn-sm">
                <img src="@/assets/icons/plus-sm-icon.svg" class="mr-1 align-top btn-icon" alt="add">
                <span>Заказать курьера</span>
              </router-link>
            </li>  <!-- v-if="!($route.path === '/')" -->
            <router-link tag="li" to="/about" active-class="active rounded" class="nav-item relative text-center text-lg-left"><a class="nav-link px-3">{{$t('navbar.about')}}</a></router-link>
            <router-link tag="li" to="/for-business" active-class="active rounded" class="nav-item relative text-center text-lg-left"><a class="nav-link px-3">{{$t('navbar.corporate')}}</a></router-link>
            <router-link tag="li" to="/for-couriers" active-class="active rounded" class="nav-item relative text-center text-lg-left"><a class="nav-link px-3">{{$t('navbar.couriers')}}</a></router-link>
            <router-link tag="li" to="/faq" active-class="active rounded" class="nav-item relative text-center text-lg-left"><a class="nav-link px-3">{{$t('navbar.faq')}}</a></router-link>
            <router-link tag="li" to="/tariffs" active-class="active rounded" class="nav-item relative text-center text-lg-left"><a class="nav-link px-3">{{$t('navbar.tariffs')}}</a></router-link>
            <!-- <li class="nav-item relative text-center text-lg-left">
              <a href="tel:+78123697798" class="navbar-phone nav-link px-3">+7 (812) <strong>369-77-98</strong></a>
            </li> -->
            <li class="nav-item text-center text-lg-left"><a href="#" class="nav-link top-nav__link d-md-none px-3" v-on:click.prevent="logout" v-if="isAuth">{{$t('signout')}}</a></li>
            <li class="nav-item relative text-center text-lg-left" v-if="false">
              <a href="#" v-on:click.prevent="isLocaleShow = !isLocaleShow" class="nav-link px-3">
                <span :class="['inline-block locale-block__item', 'locale-block__item--' + $t('alias')]"></span>
                <!-- <b>{{$t('lang')}}</b> -->
              </a>
            </li>
            <v-select
              tag="li"
              class="nav-item relative text-center text-lg-left"
              v-on:selected="setNewLocation"
              optionValue="city"
              v-if="false"
              :linkClass="['nav-link px-3']"
              :selectedItem="+currentLocation.id - 1"
              :options="cities"
            ></v-select>
          </ul>
          <!-- /Navbar links -->

          <ul class="navbar-nav ml-auto">
            <router-link tag="li" to="/signup" v-if="!isAuth" class="nav-item text-center text-lg-left"><a class="nav-link">{{$t('signup')}}</a></router-link>
            <router-link tag="li" to="/signin" v-if="!isAuth" class="nav-item text-center text-lg-left"><a class="nav-link">{{$t('signin')}}</a></router-link>

            <!-- Nav profile -->
            <li class="nav-item dropdown d-none d-lg-block navbar-hover-menu" v-if="isAuth">
              <a href="#" class="nav-link dropdown-toggle navbar-user-logo pr-0">
                <span class="d-none d-xl-inline-block align-middle navbar-company text-right line-height-one">
                  <span class="d-block text-overflow navbar-company__name">{{profile.first_name || profile.phone_format}}</span>
                  <span class="d-block text-overflow small navbar-company__name" v-if="profile.is_company && profile.company">{{profile.company.company_name}}</span>
                </span>
                <span class="navbar-user-logo__img" v-if="profile.avatar_path">
                  <img v-bind:src="profile.avatar_path" alt="user">
                </span>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <span class="dropdown-header" v-if="isCompany">Баланс: <span v-thousands="profile.company.balance"></span> руб.</span>
                <router-link
                  v-for="(item, index) in menuLinks"
                  :key="index"
                  :to="{ name: item.name}"
                  active-class="active"
                  class="dropdown-item text-center text-lg-left"
                >{{$t('sidebar.' + item.title)}}</router-link>
                <a href="#" class="dropdown-item" v-on:click.prevent="logout">Выход</a>
              </div>
            </li>
            <!-- /Nav profile -->

          </ul>
        </div>
      </div>
    </nav>

    <!-- Languages -->
    <transition name="locale">
      <div class="locale-block" v-if="isLocaleShow">
        <div class="container text-center">
          <ul class="list-inline list-unstyled locale-block__list">
            <li><a href="#" class="locale-block__item locale-block__item--ru" v-bind:class="{'locale-block__item--active' : locale === 'ru'}" v-on:click="changeLang('ru')"><span class="d-none d-md-block">Русский</span></a></li>
            <li><a href="#" class="locale-block__item locale-block__item--en" v-bind:class="{'locale-block__item--active' : locale === 'en'}" v-on:click="changeLang('en')"><span class="d-none d-md-block">English</span></a></li>
            <li><a href="#" class="locale-block__item locale-block__item--de" v-bind:class="{'locale-block__item--active' : locale === 'de'}" v-on:click="changeLang('de')"><span class="d-none d-md-block">German</span></a></li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- /Languages -->

  </header>
</template>

<script>
import auth from '@/auth'
import Dropdown from '@/components/utils/Dropdown'
import vSelect from '@/components/utils/Select'

export default {
  name: 'navbar',
  data () {
    return {
      showNavbar: false,
      isLocaleShow: false,
      user: auth.user,
      menuLinks: [
        {title: 'history', name: 'order-history'},
        {title: 'cards', name: 'profile-payment'},
        {title: 'fave', name: 'profile-fave'},
        {title: 'support', name: 'profile-support'},
        {title: 'profile', name: 'profile-settings'}
      ]
    }
  },
  computed: {
    currentLocation () {
      return this.$store.state.locations[this.$store.state.currentLocation]
    },
    profile () {
      return this.$store.state.profile
    },
    isAuth () {
      return this.user.authenticated && this.profile
    },
    locale () {
      return this.$i18n.locale()
    },
    cities () {
      return Object.values(this.$store.state.locations)
    },
    isCompany () {
      return this.profile.is_company
    }
  },
  watch: {
    '$route' () {
      this.showNavbar = false
    }
  },
  components: {
    Dropdown,
    vSelect
  },
  methods: {
    logout () {
      auth.logout(this, '/')
    },
    setNewLocation (loc) {
      this.$store.commit('CHANGE_LOCATION', loc.id)
    },
    changeLang (lang) {
      this.isLocaleShow = false
      this.$i18n.set(lang)
    },
    clickedOutside () {
      this.isLocaleShow = false
    }
  }
}
</script>
