<template>
  <section>
    <div class="container d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
      <h1 class="my-3 h3 mr-3">Часто задаваемые вопросы</h1>
      <div>
        <input type="text"
          class="form-control ml-auto my-2"
          v-bind:class="{'page-header-block__input--visible' : keyword.length > 0}"
          v-model="keyword"
          placeholder="Поиск">
      </div>
    </div>
    <hr class="my-0">
    <div class="container py-5">
      <faq-info v-bind:keyword="keyword"></faq-info>
    </div>
  </section>
</template>

<script>
import FaqInfo from '@/components/faq/FaqInfo'

export default {
  name: 'faq',
  data () {
    return {
      keyword: ''
    }
  },
  components: {
    FaqInfo
  }
}
</script>
