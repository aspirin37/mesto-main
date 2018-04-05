export default {
  data () {
    return {
      cardType: '',
      cards: [
        ['4', 'visa'],
        ['411', 'visa'],
        ['2221', 'master-card'],
        ['2222', 'master-card'],
        ['2223', 'master-card'],
        ['2224', 'master-card'],
        ['2225', 'master-card'],
        ['2226', 'master-card'],
        ['2225', 'master-card'],
        ['2226', 'master-card'],
        ['23', 'master-card'],
        ['24', 'master-card'],
        ['25', 'master-card'],
        ['26', 'master-card'],
        ['270', 'master-card'],
        ['271', 'master-card'],
        ['2720', 'master-card'],
        ['51', 'master-card'],
        ['52', 'master-card'],
        ['53', 'master-card'],
        ['54', 'master-card'],
        ['55', 'master-card'],
        ['34', 'american-express'],
        ['37', 'american-express'],
        ['341', 'american-express'],
        ['30', 'diners-club'],
        ['300', 'diners-club'],
        ['36', 'diners-club'],
        ['38', 'diners-club'],
        ['39', 'diners-club'],
        ['6011', 'discover'],
        ['644', 'discover'],
        ['65', 'discover'],
        ['644', 'discover'],
        ['645', 'discover'],
        ['646', 'discover'],
        ['647', 'discover'],
        ['648', 'discover'],
        ['649', 'discover'],
        ['62', 'unionpay'],
        ['627', 'unionpay'],
        ['50', 'maestro'],
        ['56', 'maestro'],
        ['57', 'maestro'],
        ['58', 'maestro'],
        ['59', 'maestro'],
        ['63', 'maestro'],
        ['67', 'maestro'],
        ['3528', 'jcb'],
        ['3529', 'jcb'],
        ['353', 'jcb'],
        ['354', 'jcb'],
        ['355', 'jcb'],
        ['356', 'jcb'],
        ['357', 'jcb'],
        ['358', 'jcb'],
        ['2200', 'mir'],
        ['2201', 'mir'],
        ['2202', 'mir'],
        ['2203', 'mir'],
        ['2204', 'mir']
      ]
    }
  },
  methods: {
    checkCardType (pan) {
      let strPath = `${pan ? pan.slice(0, 4) : ''}`
      let item

      // for (item in this.cards) {
      //   if (strPath === this.cards[item][0]) {
      //     this.cardType = this.cards[item][1]
      //     return
      //   }
      // }

      if (strPath) {
        for (item in this.cards) {
          if (strPath.indexOf(this.cards[item][0]) === 0) {
            this.cardType = this.cards[item][1]
            return
          }
        }
      }
    }
  }
}
