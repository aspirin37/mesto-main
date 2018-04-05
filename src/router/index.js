import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../pages/Main'
import NewOrder from '../pages/NewOrder'
import Support from '../pages/Support'
import Settings from '../pages/Settings'
import Profile from '../pages/Profile'
import About from '../pages/About'
import TicketsClose from '../components/support/TicketsClose'
import TicketsOpen from '../components/support/TicketsOpen'
import ForCuriers from '../components/ForCuriers'
import ForBusiness from '../pages/ForBusiness'
import SignUp from '../components/sign/SignUp'
import SignIn from '../components/sign/SignIn'
import OrderHistory from '../pages/OrderHistory'
import Payment from '../components/profile/Payment'
import Order from '../components/profile/Order'
import Fave from '../components/profile/Fave'
import Ticket from '../components/profile/Ticket'
import AddTicket from '../components/profile/AddTicket'
import Faq from '../components/faq/Faq'
import Legal from '../pages/Legal'
import Agreement from '../components/Agreement'
import Requisites from '../components/Requisites'
import Confidential from '../components/Confidential'
import AgencyContract from '../pages/AgencyContract'
import Feedback from '../components/Feedback'
import Contacts from '../components/Contacts'
import Privacy from '../components/Privacy'
import Tariffs from '../components/Tariffs'
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
          path: '/agreement',
          name: 'agreement',
          component: Agreement
        },
        {
          path: '/requisites',
          name: 'requisites',
          component: Requisites
        },
        {
          path: '/confidential',
          name: 'confidential',
          component: Confidential
        },
        {
          path: '/dogovor',
          name: 'agency-contract',
          component: AgencyContract
        }
      ]
    },
    { path: '/contacts', name: 'contacts', component: Contacts },
    { path: '/feedback', name: 'feedback', component: Feedback },
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
