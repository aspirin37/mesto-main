<template>
  <section>
    <div class="container">
      <h1 class="my-3 h3">Юридическая информация</h1>
    </div>
    <hr>
    <div class="container d-flex py-4 flex-wrap flex-lg-nowrap">
      <aside class="pr-3 pr-lg-5">
        <nav class="mb-4">
          <router-link
            :to="{name: 'agreement'}"
            active-class="text-dark"
            class="my-2 d-block text-nowrap"
          ><img src="../assets/icons/doc.svg" class="mr-2" alt="doc">{{$t('agreement')}}</router-link>
          <router-link
            :to="{name: 'confidential'}"
            active-class="text-dark"
            class="my-2 d-block text-nowrap"
          ><img src="../assets/icons/doc.svg" class="mr-2" alt="doc">{{$t('confidential')}}</router-link>
          <router-link
            :to="{name: 'requisites'}"
            active-class="text-dark"
            class="my-2 d-block text-nowrap"
          ><img src="../assets/icons/doc.svg" class="mr-2" alt="doc">{{$t('requisites')}}</router-link>
          <router-link
            :to="{name: 'agency-contract'}"
            active-class="text-dark"
            class="my-2 d-block text-nowrap"
          ><img src="../assets/icons/doc.svg" class="mr-2" alt="doc">Агентский договор</router-link>
        </nav>
      </aside>
      <article class="mw-100">
        <router-view></router-view>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'legal',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
