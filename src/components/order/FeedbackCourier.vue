<template>
  <div class="bg-white rounded current-shadow px-3">
    <div class="row align-items-center">
      <div class="col-12 col-md-12 col-lg-5 my-3">
        <div class="row align-items-center">
          <div class="col-5 col-sm-4 col-md-5 col-lg-4">
            <img v-bind:src="courier.avatar_path" alt="" class="mw-100">
          </div>
          <div class="col-7 col-sm-8 col-md-7 col-lg-8 pl-0">
            <p class="mb-2"><b>{{$t('order.courier-data')}}:</b></p>
            <p class="mb-1">{{courier.name}}</p>
            <p class="mb-2" v-if="courier.phone"><a :href="'tel:+' + courier.phone" class="phone-link">{{courier.phone_format}}</a></p>
            <ul class="list-unstyled text-nowrap rating-stars mb-0">
              <li class="rating-stars__star d-inline-block align-middle rating-stars__star--active">
                <svg version="1.1" id="Слой_1" class="align-middle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                   width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                  <path class="st0" d="M23.4,8.7L15.6,8l-3.1-7.6h0C12.5,0.1,12.2,0,12,0v19.7l0,0l6.7,4.2c0.5,0.3,1-0.1,0.9-0.7l-1.8-8l5.9-5.4
                    C24.2,9.4,24,8.7,23.4,8.7z" fill="#F6F6F6"/>
                  <path class="st1" d="M12,0c-0.2,0-0.5,0.1-0.6,0.4L8.4,8L0.6,8.7C0,8.7-0.2,9.4,0.2,9.8l5.9,5.4l-1.8,8c-0.1,0.6,0.5,1,0.9,0.7
                  l6.7-4.2V0z" fill="#F6F6F6"/>
                </svg>
              </li>
            </ul>
            <span v-if="courier.rate" class="text-muted small">({{courier.rate.toFixed(1)}})</span>
            <button class="btn btn-default btn-sm d-none">Оставить отзыв</button>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-12 col-lg-7 mt-3">
        <span v-if="!isDone" class="mw-400 d-block">После того как заказ будет выполнен, вы сможете оценить курьера и оставить отзыв.</span>
        <form v-on:submit.prevent="sendFeedback" v-if="isDone && !rate.idt_rate">
          <p>Ваш заказ доставлен, теперь вы можете оценить курьера и оставить отзыв:</p>
          <div class="row">
            <div class="col-12 col-md-8 mb-3">
              <textarea rows="2" class="form-control h-100" v-model="reviewText" placeholder="Текст отзыва"></textarea>
            </div>
            <div class="col-12 col-md-4 mb-3">
              <div class="d-flex align-items-stretch set-rating-stars mb-2">
                <div v-for="(item, index) in [1, 2, 3, 4, 5]" class="set-rating-stars__item" :key="index">
                  <span class="set-rating-stars__star"
                    v-on:click="setRate(item)"
                    v-bind:class="{'set-rating-stars__star--active' : item <= reviewRate}">
                    <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                       width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
                    <g>
                      <g>
                        <path fill="#CCCCCC" d="M19,23.2c-0.1,0-0.1,0-0.2-0.1L12,19l-6.8,4.1c-0.1,0-0.1,0.1-0.2,0.1c-0.1,0-0.2-0.1-0.3-0.1
                          c-0.1-0.1-0.1-0.2-0.1-0.3L6.4,15l-6-5.2C0.3,9.6,0.2,9.5,0.3,9.3c0-0.1,0.2-0.2,0.3-0.3l8-0.7L11.7,1c0.1-0.1,0.2-0.2,0.3-0.2
                          c0.2,0,0.3,0.1,0.3,0.2l3.1,7.4l8,0.7c0.2,0,0.3,0.1,0.3,0.3c0,0.1,0,0.3-0.1,0.4l-6,5.2l1.8,7.8c0,0.1,0,0.2-0.1,0.3
                          C19.2,23.1,19.1,23.2,19,23.2z"/>
                        <path fill="#CCCCCC" d="M12,1.1c0.1,0,0.1,0,0.1,0.1l3.1,7.2l0.1,0.3l0.3,0l7.8,0.7c0.1,0,0.1,0,0.1,0.1c0,0,0,0.1,0,0.1l-5.9,5.1
                          l-0.2,0.2l0.1,0.3l1.8,7.6c0,0,0,0.1,0,0.1c0,0-0.1,0-0.1,0c0,0,0,0-0.1,0l-6.7-4L12,18.7l-0.3,0.2l-6.7,4c0,0,0,0-0.1,0
                          c0,0-0.1,0-0.1,0c0,0,0-0.1,0-0.1l1.8-7.6l0.1-0.3l-0.2-0.2L0.5,9.5c0,0,0-0.1,0-0.1c0,0,0-0.1,0.1-0.1l7.8-0.7l0.3,0l0.1-0.3
                          l3.1-7.2C11.9,1.1,11.9,1.1,12,1.1 M12,0.6c-0.2,0-0.5,0.1-0.6,0.4L8.4,8.2L0.6,8.8C0,8.9-0.2,9.6,0.2,9.9L6.1,15l-1.8,7.6
                          c-0.1,0.4,0.2,0.8,0.6,0.8c0.1,0,0.2,0,0.3-0.1l6.7-4l6.7,4c0.1,0.1,0.2,0.1,0.3,0.1c0.4,0,0.7-0.3,0.6-0.8L17.9,15l5.9-5.1
                          c0.4-0.4,0.2-1-0.4-1.1l-7.8-0.7l-3.1-7.2C12.5,0.7,12.2,0.6,12,0.6L12,0.6z"/>
                      </g>
                    </g>
                    </svg>
                  </span>
                </div>
              </div>
              <button type="submit" class="btn btn-success btn-block" :disabled="!reviewRate">Оценить</button>
            </div>
          </div>
          <p class="text-danger float-right" v-if="errorMessage">{{errorMessage}}</p>
        </form>
        <div v-else>
          <span class="text-muted mr-2">Ваш отзыв:</span>
          <p class="mb-2" v-if="rate && rate.feedback">«{{rate.feedback}}»</p>
          <ul class="list-unstyled text-nowrap rating-stars mb-3">
            <li v-for="(item, index) in rate.rate" class="rating-stars__star rating-stars__star--active d-inline-block" :key="index">
              <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
                <path class="st0" d="M23.4,8.7L15.6,8l-3.1-7.6h0C12.5,0.1,12.2,0,12,0v19.7l0,0l6.7,4.2c0.5,0.3,1-0.1,0.9-0.7l-1.8-8l5.9-5.4
                  C24.2,9.4,24,8.7,23.4,8.7z" fill="#F6F6F6"/>
                <path class="st1" d="M12,0c-0.2,0-0.5,0.1-0.6,0.4L8.4,8L0.6,8.7C0,8.7-0.2,9.4,0.2,9.8l5.9,5.4l-1.8,8c-0.1,0.6,0.5,1,0.9,0.7
                l6.7-4.2V0z" fill="#F6F6F6"/>
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../store/api'

export default {
  name: 'feedback-courier',
  data () {
    return {
      errorMessage: '',
      reviewRate: 0,
      reviewText: ''
    }
  },
  props: {
    courier: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rate: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isDone: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: String,
      default: ''
    }
  },
  methods: {
    setRate (item) {
      this.reviewRate = item
    },
    sendFeedback () {
      let options = {
        idt_order: this.orderId,
        rate: this.reviewRate,
        target: 'client'
      }
      if (this.reviewText) { options.feedback = this.reviewText }

      this.$http.post(api.API_REST_LINK2 + 'web/rate', options).then(response => {
        this.$emit('added')
      })
    }
  }
}
</script>
