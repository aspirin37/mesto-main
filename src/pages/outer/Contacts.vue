<template>
  <section>
    <div class="container">
      <h1 class="my-3 h3 mr-3">Контакты</h1>
    </div>
    <hr class="my-0">
    <div class="container py-5 text-center">
      <div class="d-inline-flex mx-3 text-left align-items-center mb-3">
        <div class="advant-circle-sm mr-3 relative">
          <img src="@/assets/icons/phone-color.svg" alt="advantage">
        </div>
        <div>
          <span class="text-muted d-block">По вопросам сотрудничества</span>
          <h4 class="mb-0"><a href="tel:88003501646" class="text-dark">8 800 350-16-46</a></h4>
        </div>
      </div>
      <div class="d-inline-flex mx-3 text-left align-items-center mb-3">
        <div class="advant-circle-sm mr-3 relative">
          <img src="@/assets/icons/mail-color.svg" alt="advantage">
        </div>
        <div>
          <span class="text-muted d-block">По любым вопросам</span>
          <h4 class="mb-0"><a href="mailto:hi@mesto.delivery" class="text-dark">hi@mesto.delivery</a></h4>
        </div>
      </div>
      <h3 class="mt-5 mb-3">Задать вопрос</h3>
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 col-lg-4">
          <back-call-form></back-call-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BackCallForm from '@/components/support/BackCallForm'

export default {
  name: 'about',
  data () {
    return {
    }
  },
  components: {
    BackCallForm
  }
}
</script>
