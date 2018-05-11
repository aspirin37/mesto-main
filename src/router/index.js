import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/Main'
import SignUp from '@/pages/SignUp'
import SignIn from '@/pages/SignIn'

import NewOrder from '@/pages/order/NewOrder'
import Order from '@/pages/order/Order'
import OrderHistory from '@/pages/order/OrderHistory'

import Support from '@/pages/support/Support'
import TicketsClose from '@/pages/support/TicketsClose'
import TicketsOpen from '@/pages/support/TicketsOpen'
import AddTicket from '@/pages/support/AddTicket'
import Ticket from '@/pages/support/Ticket'

import Settings from '@/pages/personal/Settings'
import Profile from '@/pages/personal/Profile'
import Payment from '@/pages/personal/Payment'
import Fave from '@/pages/personal/Fave'

import About from '@/pages/outer/About'
import Faq from '@/pages/outer/Faq'
import Contacts from '@/pages/outer/Contacts'
import Tariffs from '@/pages/outer/Tariffs'
import ForCuriers from '@/pages/outer/ForCouriers'
import ForBusiness from '@/pages/outer/ForBusiness'

import Requisites from '@/pages/legal/Requisites'
import Agreement from '@/pages/legal/Agreement'
import Confidential from '@/pages/legal/Confidential'
import Legal from '@/pages/legal/Legal'
import AgencyContract from '@/pages/legal/AgencyContract'

import OrderDone from '../components/new-order/OrderDone'
import Privacy from '../components/Privacy'
import auth from '../auth'
import analytics from '../store/analytics.js'

Vue.use(Router)

analytics.initGoogle()
analytics.initYandex()

var router = new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else if (to.name !== from.name) {
      return { y: 0 }
    }
  },
  history: true,
  routes: [
    { path: '/', name: 'main-page', component: MainPage },
    { path: '/new-order', name: 'new-order', component: NewOrder },
    { path: '/about', name: 'About', component: About },
    { path: '/tariffs', name: 'Tariffs', component: Tariffs },
    { path: '/for-couriers', name: 'for-couriers', component: ForCuriers },
    { path: '/for-business', name: 'for-business', component: ForBusiness },
    { path: '/signup', name: 'signup', component: SignUp },
    { path: '/signin', name: 'signin', component: SignIn },
    { path: '/faq', name: 'faq', component: Faq },
    { path: '/legal',
      name: 'legal',
      component: Legal,
      children: [
        {
          path: '/legal/agreement',
          name: 'agreement',
          component: Agreement
        },
        {
          path: '/legal/requisites',
          name: 'requisites',
          component: Requisites
        },
        {
          path: '/legal/confidential',
          name: 'confidential',
          component: Confidential
        },
        {
          path: '/legal/dogovor',
          name: 'agency-contract',
          component: AgencyContract
        }
      ]
    },
    { path: '/contacts', name: 'contacts', component: Contacts },
    { path: '/privacy', name: 'privacy', component: Privacy },
    { path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true },
      redirect: {name: 'order-history'},
      children: [
        {
          path: '/settings',
          name: 'profile-settings',
          component: Settings
        },
        {
          path: '/orders',
          name: 'order-history',
          component: OrderHistory
        },
        {
          path: '/orders/order',
          props: ({query: ':id'}),
          name: 'profile-order',
          component: Order
        },
        {
          path: '/payment',
          name: 'profile-payment',
          component: Payment
        },
        {
          path: '/fave',
          name: 'profile-fave',
          component: Fave
        },
        {
          path: '/support',
          name: 'profile-support',
          component: Support,
          redirect: '/support/open',
          children: [
            {
              path: '/support/open',
              name: 'tickets-open',
              component: TicketsOpen
            },
            {
              path: '/support/close',
              name: 'tickets-close',
              component: TicketsClose
            }
          ]
        },
        {
          path: '/support/ticket',
          props: ({query: ':id'}),
          name: 'profile-ticket',
          component: Ticket
        },
        {
          path: '/support/add-ticket',
          name: 'profile-add-ticket',
          component: AddTicket
        }
      ]
    },
    { path: '/order-done', name: 'order-done', component: OrderDone },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  if (process.env.NODE_ENV === 'production') {
    window.ga('send', {
      hitType: 'pageview',
      page: to.path,
      location: window.location.origin + to.path,
      title: to.name
    })
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.user.authenticated) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
