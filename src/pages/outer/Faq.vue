<template>
  <section>
    <div class="page-header-block">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-md-8 text-center text-md-left">
            <h1 class="text-white">Часто задаваемые вопросы</h1>
          </div>
          <div class="col-12 col-md-4">
            <input type="text"
              class="form-control page-header-block__input ml-auto mr-auto"
              v-bind:class="{'page-header-block__input--visible' : keyword.length > 0}"
              v-model="keyword"
              placeholder="Поиск">
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="page-content rounded bg-white p-3 p-md-5 mb-3">
        <faq-info v-bind:keyword="keyword"></faq-info>
      </div>
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
