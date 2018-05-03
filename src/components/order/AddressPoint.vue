<template>
  <div class="d-flex pb-4 relative">
    <div class="mr-3" v-on:click="toggleActive">
      <span class="address-marker d-inline-block cursor-pointer"
        v-bind:class="{'address-marker--first': index === 0, 'address-marker--last': (index + 1) === length}"
      >{{$t('letters')[index]}}</span>
    </div>
    <div>
      <div class="mr-3 cursor-pointer" v-on:click="toggleActive" v-bind:class="{'text-muted' : isClicked}">
        <b class="pre-wrap mr-1">{{address.address}}</b>
        <b v-if="address.room" class="mr-1">({{address.room}})</b>
        <span class="small text-nowrap" v-if="address.is_payment_address && !payed">(Оплата здесь)</span>
      </div>
      <a :href="'tel:+' + address.contact_phone" class="phone-link">{{address.contact_phone_format}}</a>
      <span v-if="address.contact_name">, {{address.contact_name}}</span>
      <span class="d-block" v-if="address.contact_time_format">
        {{address.contact_time_format || ''}}
      </span>
      <span class="d-block px-2 mt-2 border-left border-success small" v-if="address.description">«{{address.description}}»</span>

      <div v-if="address.photosClient && address.photosClient.length" class="mt-2">
        <thumbnails-outer class="d-inline-block mr-2">
          <thumbnail
            v-for="(pic, index) in address.photosClient"
            :key="index"
            :img="pic.thumbnail"
            :thumb="pic.url"
            :thumbClasses="['d-inline-block']"
            :linkClasses="['order-photos__item', 'mr-1']"
            :index="index"
            title="Фото клиента"
          ></thumbnail>
        </thumbnails-outer>
      </div>
      <div v-if="address.photosCourier && address.photosCourier.length" class="mt-2">
        <thumbnails-outer class="d-inline-block mr-2">
          <thumbnail
            v-for="(pic, index) in address.photosCourier"
            :key="index"
            :img="pic.thumbnail"
            :thumb="pic.url"
            :thumbClasses="['d-inline-block']"
            :linkClasses="['order-photos__item', 'mr-1']"
            :index="index"
            title="Фото курьера"
          ></thumbnail>
        </thumbnails-outer>
      </div>
    </div>
  </div>
</template>

<script>
import Thumbnail from '../utils/Thumbnail'
import ThumbnailsOuter from '../utils/ThumbnailsOuter'

export default {
  name: 'address-point',
  data () {
    return {
      isClicked: false
    }
  },
  props: {
    address: {
      type: Object,
      default: () => {}
    },
    index: null,
    length: null,
    payed: false
  },
  components: {
    Thumbnail,
    ThumbnailsOuter
  },
  methods: {
    toggleActive () {
      this.isClicked = !this.isClicked
      this.$emit('clicked', this.index)
    }
  }
}
</script>
