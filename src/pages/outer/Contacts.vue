<template>
  <div class="container py-5 text-center">
    <h1 class="mb-5">Контакты</h1>
    <div class="d-inline-flex mx-3 text-left align-items-center mb-3">
      <img class="d-flex mr-3 contact-icon" src="../../assets/icons/call-answer.svg" alt="Marker">
      <div>
        <span class="text-muted d-block">По вопросам сотрудничества</span>
        <h4 class="mb-0"><a href="tel:88003501646" class="text-dark">8 800 350-16-46</a></h4>
      </div>
    </div>
    <div class="d-inline-flex mx-3 text-left align-items-center mb-3">
      <img class="d-flex mr-3 contact-icon" src="../../assets/icons/arroba-sign.svg" alt="Marker">
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
