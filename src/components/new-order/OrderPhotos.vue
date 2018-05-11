<template>
  <div>
    <p class="d-block mb-2">
      <img src="../../assets/icons/photo.svg" alt="" class="inline-img mr-2 align-middle">
      <b>Фото посылки</b>
    </p>
    <div class="pl-md-4">
      <label class="mb-4 p-2 rounded relative upload-pic w-100 d-flex flex-wrap align-items-center">
        <input type="file" accept="image/*" class="upload-pic__input" v-on:change="uploadPhoto">
        <button class="btn btn-outline-dark mr-2 btn-sm">Выбрать</button>
        <span class="text-muted d-none d-md-inline-block">или перетащите фото в эту область</span>
      </label>
      <label class="mb-4 bg-white rounded upload-pic w-100 d-flex flex-wrap align-items-center upload-pic__big"
        v-on:drop="setDragEnd"
        v-on:dragover="onDragged = true"
        v-on:dragleave="setDragEnd"
        v-bind:class="{'upload-pic--active upload-pic__big': outerOnDragged}"
        v-if="outerOnDragged || onDragged"
      >
        <input type="file" accept="image/*" class="upload-pic__input" v-on:change="uploadPhoto">
      </label>
      <thumbnails-outer>
        <thumbnail
          v-if="previews[index]"
          v-for="(pic, index) in previews"
          :key="index"
          :img="pic"
          :thumb="pic"
          :thumbClasses="['d-inline-block', 'relative', 'mr-3']"
          :linkClasses="['order-photos__item order-photos__item--md']"
          :index="index"
        ><a href="#" class="pic-delete" v-on:click.prevent="removeImage(index)"><img src="../../assets/icons/close-del.svg" alt="X"></a>
        </thumbnail>
      </thumbnails-outer>
    </div>
  </div>
</template>

<script>
import Thumbnail from '@/components/utils/Thumbnail'
import ThumbnailsOuter from '@/components/utils/ThumbnailsOuter'

export default {
  name: 'order-photos',
  data () {
    return {
      files: [],
      previews: [],
      onDragged: false
    }
  },
  props: {
    outerOnDragged: false
  },
  components: {
    Thumbnail,
    ThumbnailsOuter
  },
  methods: {
    setDragEnd () {
      this.onDragged = false
      this.$emit('end')
    },
    uploadPhoto (e) {
      e.stopPropagation()
      e.preventDefault()
      let file = e.target.files[0] || e.dataTransfer.files[0]

      this.files.push(file)
      this.getPreviews()
      this.setOrderPhotos()
    },
    getPreviews () {
      this.previews = []
      let pushPreview = (index) => {
        let reader = new window.FileReader()

        reader.readAsDataURL(this.files[index])

        reader.onload = (e) => {
          this.previews.push(e.target.result)
        }
      }
      if (this.files.length) {
        for (let i = 0; i < this.files.length; i++) {
          pushPreview(i)
        }
      }
    },
    removeImage (index) {
      this.files.splice(index, 1)
      this.getPreviews()
      this.setOrderPhotos()
    },
    setOrderPhotos () {
      this.$store.commit('SET_ORDER_PHOTOS', this.files)
    }
  }
}
</script>
