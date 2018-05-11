<template>
  <div>
    <div class="upload-image rounded mb-3 mw-400 mx-auto">
      <img v-bind:src="userProfile.avatar_path" class="mw-100 ml-auto mr-auto">
      <label class="upload-image__input" v-on:click.prevent="toggleModal('crop-modal')">
        <span>Загрузить</span>
        <!-- <input type="file" v-on:change="uploadAvatar"> -->
      </label>
    </div>
    <modal
      modalSize="modal-md"
      modalTitle="Загрузка аватара"
      ref="crop-modal"
    >
      <div slot="modalBody">
        <crop v-on:cropImg="uploadCroppedAvatar" :progress="uploadProgress"></crop>
      </div>
    </modal>
  </div>
</template>

<script>
import api from '../../store/api'
import Modal from '../utils/Modal'
import Crop from '../utils/Crop'

export default {
  name: 'user-avatar',
  data () {
    return {
      uploadProgress: null
    }
  },
  components: {
    Modal,
    Crop
  },
  computed: {
    userProfile () {
      return this.$store.state.profile
    }
  },
  methods: {
    toggleModal (id) {
      this.$refs[id].newIsOpen = !this.$refs[id].newIsOpen
    },
    uploadCroppedAvatar (file) {
      let options = new window.FormData()

      options.append('avatar', file, 'imageFilename.jpg')
      options.append('target', 'client')

      var _this = this

      this.$http.post(api.API_REST_LINK2 + 'web/avatar', options, {
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // }
        progress (e) {
          if (e.lengthComputable) {
            _this.uploadProgress = (e.loaded / e.total * 100)
          }
        }
      }).then(response => {
        this.toggleModal('crop-modal')
        this.$store.dispatch('LOAD_PROFILE')
      }).catch(error => {
        this.errorMessage = error.data.message
      })
    }
  }
}
</script>
