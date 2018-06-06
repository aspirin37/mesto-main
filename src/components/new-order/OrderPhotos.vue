<template>
  <div>
    <p class="d-block mb-2">
      <img src="@/assets/icons/photo.svg" alt="" class="inline-img mr-2 align-middle">
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
      <thumbnail-outer>
        <thumbnail
          v-for="(pic, index) in previews"
          :key="index"
          :img="pic"
          :thumb="pic"
          :thumbClasses="['d-inline-block', 'relative', 'mr-3']"
          :linkClasses="['order-photos__item order-photos__item--md']"
          :index="index"
        ><a href="#" class="pic-delete" v-on:click.prevent="removeImage(index)"><img src="@/assets/icons/close-del.svg" alt="X"></a>
        </thumbnail>
      </thumbnail-outer>
    </div>
  </div>
</template>

<script>
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
  methods: {
    setDragEnd () {
      this.onDragged = false
      this.$emit('end')
    },
    uploadPhoto (e) {
      e.stopPropagation()
      e.preventDefault()
      let file = e.target.files[0] || e.dataTransfer.files[0]

      this.resizeImage(file).then(response => {
        this.files.push(response)
        this.setOrderPhotos()
      })
    },
    removeImage (index) {
      this.files.splice(index, 1)
      this.previews.splice(index, 1)
      this.setOrderPhotos()
    },
    setOrderPhotos () {
      this.$store.commit('SET_ORDER_PHOTOS', this.files)
    },
    resizeImage (file) {
      return new Promise((resolve, reject) => {
        let reader = new window.FileReader()

        reader.readAsDataURL(file)

        reader.onload = (e) => {
          let img = new Image()
          let getRatio = (width, height) => {
            let requiredSize = 1000
            let largeSide = width > height ? width : height
            let ratio = largeSide / requiredSize

            return ratio < 1 ? 1 : ratio
          }

          img.src = e.target.result
          img.onload = () => {
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
            let ratio = getRatio(img.width, img.height)

            canvas.width = img.width / ratio
            canvas.height = img.height / ratio
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)

            // get previews
            let dataurl = canvas.toDataURL(file.type)
            this.previews.push(dataurl)

            canvas.toBlob((blob) => {
              resolve(blob)
            })
          }
        }
      })
    }
  }
}
</script>
