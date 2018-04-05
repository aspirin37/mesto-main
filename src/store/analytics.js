export default {
  initGoogle () {
    if (process.env.NODE_ENV === 'production') {
      (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r
        i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
        }
        i[r].l = 1 * new Date()
        a = s.createElement(o)
        m = s.getElementsByTagName(o)[0]
        a.async = 1
        a.src = g
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

      window.ga('create', 'UA-102919463-1', 'auto')
      window.ga('send', 'pageview')
    }
  },
  initYandex () {
    if (process.env.NODE_ENV === 'production') {
      (function (d, w, c) {
        (w[c] = w[c] || []).push(function () {
          try {
            w.yaCounter45368022 = new window.Ya.Metrika(
              { id: 45368022, clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true, trackHash: true }
            )
          } catch (e) { }
        })
        var n = d.getElementsByTagName('script')[0]
        var s = d.createElement('script')
        var f = function () {
          n.parentNode.insertBefore(s, n)
        }
        s.type = 'text/javascript'
        s.async = true
        s.src = 'https://mc.yandex.ru/metrika/watch.js'

        if (w.opera === '[object Opera]') { d.addEventListener('DOMContentLoaded', f, false) } else { f() }
      })(document, window, 'yandex_metrika_callbacks')
    }
  }
}
