import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/Main'
import NewOrder from '@/pages/NewOrder'
import Support from '@/pages/Support'
import Settings from '@/pages/Settings'
import Profile from '@/pages/Profile'
import About from '@/pages/About'
import Faq from '@/pages/Faq'
import Order from '@/pages/Order'
import SignUp from '@/pages/SignUp'
import SignIn from '@/pages/SignIn'
import Requisites from '@/pages/Requisites'
import Agreement from '@/pages/Agreement'
import Confidential from '@/pages/Confidential'
import AgreementView from '@/components/terms/AgreementView'
import ConfidentialView from '@/components/terms/ConfidentialView'
import Contacts from '@/pages/Contacts'
import Tariffs from '@/pages/Tariffs'
import ForCuriers from '@/pages/ForCouriers'
import Payment from '@/pages/Payment'
import ForBusiness from '@/pages/ForBusiness'
import OrderHistory from '@/pages/OrderHistory'
import Legal from '@/pages/Legal'
import AgencyContract from '@/pages/AgencyContract'
import Fave from '@/pages/Fave'
import TicketsClose from '../components/support/TicketsClose'
import TicketsOpen from '../components/support/TicketsOpen'
import Ticket from '../components/profile/Ticket'
import AddTicket from '../components/profile/AddTicket'
import Feedback from '../components/Feedback'
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
    {
      path: '/terms/agreement',
      name: 'agreement-view',
      component: AgreementView
    },
    {
      path: '/terms/confidential',
      name: 'confidential-view',
      component: ConfidentialView
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
