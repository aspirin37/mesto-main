<template>
  <section class="py-4 gray-bg">
    <div class="container">
      <div class="row flex-md-nowrap">
        <div class="col-12 col-md-auto profile-sidebar">

          <!-- Company -->
          <div class="mb-3" v-if="isCompany">
            <b class="d-block">{{userProfile.company.company_name}}</b>
            <span class="mr-2 d-md-block">Баланс: <b v-thousands="userProfile.company.balance"></b> руб.</span>
            <span class="mr-2 d-md-block">Лимит: <b v-thousands="userProfile.company.balance_limit"></b> руб.</span>
          </div>
          <!-- /Company -->

          <!-- Mobile path -->
          <div class="form-group d-md-none d-flex justify-content-between text-overflow w-100" v-if="userProfile.first_name">
            <p class="nomargin text-overflow"><b>{{paths[route]}}</b></p>
            <div class="text-right">
              <p class="nomargin">
                {{userProfile.first_name}} <span v-if="userProfile.last_name">{{userProfile.last_name.charAt(0) + '.'}}</span>
              </p>
            </div>
          </div>
          <!-- /Mobile path -->

          <!-- Nav -->
          <div class="profile-nav rounded mb-3 relative clearfix">
            <ul class="nav flex-md-column nav-pills small-center py-md-3 justify-content-center">
              <router-link tag="li" :to="{ name: 'order-history'}" active-class="active" class="nav-item relative">
                <a class="nav-link"><span class="tab-icon tab-icon--list"></span><span class="d-none d-md-inline-block">{{$t('sidebar.history')}}</span></a>
              </router-link>
              <router-link tag="li" :to="{ name: 'profile-payment'}" active-class="active" class="nav-item relative">
                <a class="nav-link"><span class="tab-icon tab-icon--cards"></span><span class="d-none d-md-inline-block">{{$t('sidebar.cards')}}</span></a>
              </router-link>
              <router-link tag="li" :to="{ name: 'profile-fave'}" active-class="active" class="nav-item relative" v-if="false">
                <a class="nav-link"><span class="tab-icon tab-icon--fave"></span><span class="d-none d-md-inline-block">{{$t('sidebar.fave')}}</span></a>
              </router-link>
              <router-link tag="li" :to="{ name: 'profile-support'}" active-class="active" class="nav-item relative">
                <a class="nav-link"><span class="tab-icon tab-icon--support"></span><span class="d-none d-md-inline-block">{{$t('sidebar.support')}}</span></a>
              </router-link>
              <router-link tag="li" :to="{ name: 'profile-settings'}" active-class="active" class="nav-item relative">
                <a class="nav-link"><span class="tab-icon tab-icon--settings"></span><span class="d-none d-md-inline-block">{{$t('sidebar.profile')}}</span></a>
              </router-link>
            </ul>
          </div>
          <!-- /Nav -->

        </div>
        <div class="col-12 col-md">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      paths: {
        '/settings': 'Настроки',
        '/new-order': 'Новый заказ',
        '/orders': 'Заказы',
        '/payment': 'Платежные карты',
        '/fave': 'Избранное',
        '/support': 'Поддержка'
      }
    }
  },
  computed: {
    route () {
      return this.$route.matched[1].path
    },
    userProfile () {
      return this.$store.state.profile
    },
    isCompany () {
      return this.userProfile.company && this.userProfile.company.balance
    }
  }
}
</script>
