<template>
  <div>
    <div id="main-cropper"></div>
    <label class="upload-crop-image text-center relative" v-if="!crop">
      <p class="upload-crop-image__text">Выберите изображение</p>
      <input type="file" value="Choose Image" v-on:change="setImage" class="upload-crop-image__input">
    </label>
    <span class="progress-line progress-line--ac" v-if="progress > 0 && progress !== 100">
      <span class="progress-line__inner" v-bind:style="{width: progress + '%'}"></span>
    </span>
    <div class="text-right">
      <button v-on:click="getCrop" class="btn btn-theme" :disabled="!crop">Сохранить</button>
    </div>
  </div>
</template>

<script>
import Croppie from 'croppie'

export default {
  props: {
    opts: {
      type: Object,
      default: () => {
        return {
          viewport: { width: 250, height: 250 },
          boundary: { width: 300, height: 300 },
          showZoomer: true
        }
      }
    },
    progress: 0
  },
  data () {
    return {
      crop: null,
      photo: ''
    }
  },
  methods: {
    initCrop () {
      this.crop = new Croppie(document.getElementById('main-cropper'), Object.assign(this.opts))
    },
    setImage (e) {
      let input = e.target.files[0] || e.dataTransfer.files[0]

      if (input) {
        this.initCrop()
        let reader = new window.FileReader()

        reader.onload = (e) => {
          this.photo = e.target.result
          this.crop.bind({
            url: this.photo
          })
        }
        reader.readAsDataURL(input)
      }
    },
    getCrop () {
      this.crop.result({
        type: 'blob',
        format: 'jpeg',
        size: {width: 600, height: 600}
      }).then((res) => {
        this.$emit('cropImg', res)
      })
    }
  }
}
</script>
