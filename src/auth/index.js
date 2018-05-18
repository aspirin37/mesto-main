import Vue from 'vue'
import VueResource from 'vue-resource'
import router from '../router'
import store from '../store'

Vue.use(VueResource)

const API_REST_LINK = process.env.API_URL + 'rest/v2/'
const VERIFY_URL = API_REST_LINK + 'webclient/verifyCode'
const SESSION_URL = API_REST_LINK + 'webclient/session'
const PASSWORD_URL = API_REST_LINK + 'webclient/password'

Vue.http.options.credentials = true

window.addEventListener('storage', event => {
  if (event.key === 'logout-event') {
    window.location.reload()
  }
})

export default {
  user: {
    authenticated: false,
    token: '',
    cookieName: 'clientsid'
  },
  getCookie (name) {
    let value = '; ' + document.cookie
    let parts = value.split('; ' + name + '=')

    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    }
  },
  signup (context, creds, redirect) {
    context.$http.post(VERIFY_URL, creds).then(success => {
      context.smsSended = true
      context.errorMessage = ''
      this.user.authenticated = true
      store.dispatch('LOAD_PROFILE')
      if (redirect) {
        router.push(redirect)
      }
    }).catch(error => (context.errorMessage = error.data.message))
  },
  login (context, creds, redirect) {
    context.$http.post(SESSION_URL, creds).then(success => {
      if (this.getCookie(this.user.cookieName)) {
        context.errorMessage = ''
        context.errorCode = ''
        this.user.authenticated = true
        store.dispatch('LOAD_PROFILE')
        if (redirect) router.push(redirect)
      }
    }).catch(error => (context.errorMessage = error.data.message))
  },
  sendSms (context, creds) {
    return context.$http.get(VERIFY_URL, {params: creds}).then(() => {
      context.smsSended = true
      context.errorMessage = ''
    }).catch(error => (context.errorMessage = error.data.message))
  },
  setPassword (context, creds, redirect) {
    return context.$http.put(PASSWORD_URL, creds).then(success => {
      if (this.getCookie(this.user.cookieName) && success.data.success) {
        context.errorMessage = ''
        this.user.authenticated = true
        context.paswSetted = true
        store.dispatch('LOAD_PROFILE')
        if (redirect) {
          router.push({path: redirect})
        }
        return true
      } else {
        return false
      }
    })
  },
  checkAuth () {
    let jwt = this.getCookie(this.user.cookieName)

    if (jwt && +jwt !== 0) {
      this.user.authenticated = true
      this.user.token = jwt
      store.dispatch('LOAD_PROFILE')
    } else {
      this.user.authenticated = false
      store.dispatch('GET_CURRENT_CITY')
    }
  },
  resetCookie () {
    let domainName = document.domain.replace(/^(www\.)/, '').split('.')

    if (domainName.length > 2) {
      domainName.shift()
    }

    document.cookie = this.user.cookieName + '=0;path=/;domain=' + domainName.join('.') + ';'
    this.user.authenticated = false
    // window.location.reload()
  },
  logout (context, redirect) {
    window.localStorage.setItem('logout-event', 'logout' + Math.random())
    context.$http.delete(SESSION_URL).then(success => {
      context.errorMessage = ''
      this.checkAuth()
      store.commit('RESET_PROFILE')
      if (redirect) {
        router.push(redirect)
      }
    }).catch(error => (context.errorMessage = error.data.message))
  }
}
