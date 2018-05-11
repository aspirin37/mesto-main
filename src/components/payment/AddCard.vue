<template>
  <div class="relative pb-2">
    <form v-on:submit.prevent="validateBeforeSubmit">
      <div class="card-outer relative">
        <div class="card relative">
          <div class="card__type card-type" v-bind:class="['card-type--' + (cardPan.length >= 1 ? cardType : '')]"></div>
          <div class="card__title">
            <b>{{$t('card.adding')}}</b>
          </div>
          <div class="card__body">
            <div class="form-group" v-bind:class="{'has-error' : errors.has('pan'), 'has-success' : !errors.has('pan') && cardPan.length > 18}">
              <input type="text" class="form-control text-uppercase bg-white"
                name="pan"
                :placeholder="$t('card.number')"
                v-card-mask v-model="cardPan"
                v-on:keyup="checkCardType(cardPan)"
                v-validate="'required'"
                data-vv-validate-on="keyup"
              >
            </div>
            <!-- <div class="form-group" v-bind:class="{'has-success' : cardName.length > 4}">
              <input type="text" class="form-control text-uppercase"
                name="name"
                v-characters-replace
                :placeholder="$t('card.name')"
                v-model="cardName"
              >
            </div> -->
            <div class="row justify-content-center">
              <div class="col-12 col-md-8">
                <div class="d-flex align-items-center">
                  <div class="form-group w-50" v-bind:class="{'has-error' : errors.has('cc-exp-month'), 'has-success' : cardMm.length >= 2}">
                    <input type="number" class="form-control input-number-reset text-center bg-white"
                      name="cc-exp-month"
                      placeholder="ММ"
                      v-model="cardMm"
                      ref="step-1"
                      v-on:keyup="setNextFocus($event, 2, 2)"
                      v-validate="'required|min:2'"
                      data-vv-validate-on="keyup"
                      maxlength="2"
                    >
                  </div>
                  <div class="form-group px-2">
                    <span class="h4">/</span>
                  </div>
                  <div class="form-group w-50" v-bind:class="{'has-error' : errors.has('cc-exp-year'), 'has-success' : cardYyyy.length >= 2}">
                    <input type="text" class="form-control input-number-reset text-center bg-white"
                      name="cc-exp-year"
                      placeholder="YY"
                      v-model="cardYyyy"
                      ref="step-2"
                      v-on:keyup="setNextFocus($event, 3, 2)"
                      v-validate="'required|min:2'"
                      data-vv-validate-on="keyup"
                      maxlength="2"
                    >
                  </div>
                </div>
              </div>
              <div class="col-6 d-md-none">
                <div class="form-group">
                  <input type="password" class="form-control text-center bg-white" placeholder="CVC" v-model="cardCvc" v-validate="'required|min:3'" data-vv-validate-on="keyup">
                </div>
              </div>
              <div class="col-6 d-md-none">
                <div class="small">{{$t('card.cvv-text')}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card__back d-none d-md-block" v-bind:class="{'cvc-done': cardCvc.length === 3}">
          <div class="card__back-cvc">
            <input type="password" class="form-control text-center bg-white"
              placeholder="CVC"
              v-model="cardCvc"
              ref="step-3"
              v-on:keyup="setNextFocus($event, 4, 3)"
              v-validate="'required|min:3'"
              data-vv-validate-on="keyup"
            >
          </div>
          <p class="card__back-cvc-code">{{$t('card.cvv-text')}}</p>
        </div>
      </div>
      <div class="form-group card__buttons">
        <button type="button" class="btn btn-default btn-sm" v-if="showCancel" v-on:click="cancelAdding">{{$t('cancel')}}</button>
        <button type="submit" class="btn btn-theme btn-sm" ref="step-4">{{$t('card.add-this')}}</button>
        <div class="relative d-inline-block left-space mr-3 text-center">
          <span class="help-circle add-card-popup__outer">
            ?
          </span>
          <span class="add-card-popup">
            Вы будете перенаправлены на страницу банка для подтверждения привзяки карты. <br>
            С карты будет списан 1 рубль и тут же возвращен обратно.
          </span>
        </div>
      </div>
    </form>
    <p class="text-danger text-center">{{errorMessage}}</p>
    <div class="over-cap" v-if="showAddingCap">
      <loader></loader>
      <div class="over-cap__text text-center">
        <h4>Подтвердите добавленную карту в открывшемся окне.</h4>
        <p><a href="#" v-on:click.prevent="openBankWindow">Не вижу окно</a></p>
        <a href="#" v-on:click.prevent="showAddingCap = false">Отмена</a>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/store/api'
import checkCard from '@/mixins/checkCard'
import cardMask from '@/directives/cardMask'
import charactersReplace from '@/directives/charactersReplace'
import Loader from '@/components/utils/Loader'

export default {
  name: 'add-card',
  props: {
    showCancel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cardPan: '',
      cardCvc: '',
      cardYyyy: '',
      cardMm: '',
      cardName: '',
      errorMessage: '',
      currentStep: null,
      finishCardInterval: null,
      showAddingCap: false,
      bankWindowLink: ''
    }
  },
  beforeDestroy () {
    clearInterval(this.finishCardInterval)
  },
  components: {
    charactersReplace,
    Loader
  },
  directives: {
    cardMask
  },
  mixins: [checkCard],
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then(success => {
        if (!success) {
          return
        }
        this.addCard()
      })
    },
    addCard () {
      var wi = window.open('about:blank', '_blank', 'width=600,height=' + window.screen.height * 0.8 + ',toolbar=false,location=false,left=10%,top=10%')

      let year = (+this.cardYyyy.length > 2) ? +this.cardYyyy : `20${+this.cardYyyy}`
      let options = {
        target: 'client',
        pan: this.cardPan.replace(/\+|-|\(|\)|\s/g, ''),
        cvc: +this.cardCvc,
        yyyy: +year,
        mm: +this.cardMm,
        platform: 'web'
      }
      this.errorMessage = ''
      this.$http.post(api.API_REST_LINK2 + 'web/bankCards/', options).then(response => {
        let data = response.data

        if (data.url) {
          this.bankWindowLink = data.url
          wi.location.href = this.bankWindowLink
          this.checkFinishCard(data.id)
        }
      }).catch(error => {
        this.errorMessage = error.data.message
        wi.close()
      })
    },
    openBankWindow () {
      window.open(this.bankWindowLink)
    },
    cancelAdding () {
      this.$emit('cancelAdd', '_blank', 'width=400,height=400,toolbar=false,location=false,left=10%,top=10%')
    },
    checkFinishCard (cardId) {
      var options = {
        id: cardId,
        target: 'client'
      }
      this.showAddingCap = true
      this.finishCardInterval = setInterval(() => {
        this.$http.get(api.API_REST_LINK2 + 'web/finish3DS', {params: options}).then(response => {
          let data = response.data

          if (data.success) {
            clearInterval(this.finishCardInterval)
            this.$emit('cardAdded')
            this.showAddingCap = false
            this.cardPan = ''
            this.cardCvc = ''
            this.cardYyyy = ''
            this.cardMm = ''
            this.cardName = ''
            this.errorMessage = ''
          }
        }).catch(error => {
          this.errorMessage = error.data.message
        })
      }, 3000)
    },
    setNextFocus (event, step, length) {
      let targetVal = event.target.value

      if (targetVal.length >= length) {
        this.$refs[`step-${step}`].focus()
      }
    }
  }
}
</script>
