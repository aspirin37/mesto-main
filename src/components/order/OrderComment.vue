<template>
  <div>
    <p class="d-block mb-2">
      <img src="../../assets/icons/comment.svg" alt="" class="inline-img mr-1 align-middle">
      <b>Комментарий к заказу</b>
      <a href="#" class="ml-3" v-if="orderComment" v-on:click.prevent="removeOrderComment" title="Очистить">
        <img src="../../assets/icons/close-del.svg" alt="X">
      </a>
    </p>
    <div class="mb-4 pl-md-4">
      <textarea
        rows="1"
        class="form-control"
        ref="comment"
        placeholder="Комментарий, необязательно"
        v-on:keyup="setInputHeight"
        v-model="orderComment"
        v-on:blur="setOrderComment"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-comment',
  data () {
    return {
      orderComment: ''
    }
  },
  mounted () {
    this.orderComment = this.$store.state.orderComment
  },
  methods: {
    setOrderComment () {
      this.$store.commit('SET_ORDER_COMMENT', this.orderComment)
    },
    removeOrderComment () {
      this.orderComment = ''
      this.setOrderComment()
    },
    setInputHeight () {
      let ref = this.$refs.comment
      ref.style.height = 'auto'
      let scrollHeight = ref.scrollHeight

      if (scrollHeight > 42) {
        ref.style.height = scrollHeight + 2 + 'px'
      }
    }
  }
}
</script>
