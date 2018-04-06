<template>
  <div>
    <div class="py-2 px-5 border border-left-0 border-right-0 border-bottom-0">
      <label class="custom-check custom-check--disabled w-100 my-2">
        <input type="checkbox" class="custom-check__input" disabled>
        <span class="custom-check__outer"><span class="custom-check__inner"></span></span>
        <span class="align-middle">Отдать посылку</span>
      </label>
    </div>
    <div class="py-2 px-5 border border-left-0 border-right-0 border-bottom-0">
      <label class="custom-check w-100 my-2">
        <input type="checkbox" class="custom-check__input">
        <span class="custom-check__outer"><span class="custom-check__inner"></span></span>
        <span class="align-middle">Получить доверенность</span>
      </label>
    </div>
    <div class="py-2 px-5 border border-left-0 border-right-0 border-bottom-0">
      <label class="custom-check w-100 my-2">
        <input type="checkbox" class="custom-check__input">
        <span class="custom-check__outer"><span class="custom-check__inner"></span></span>
        <span class="align-middle">Выполнить поручение</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'address-actions',
  props: {
    step: null
  },
  data () {
    return {
    }
  }
}
</script>
