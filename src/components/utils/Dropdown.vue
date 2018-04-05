<template>
  <li :class="{'open': show}" v-on-click-outside="clicked" v-if="tag == 'li'">
    <a href="#"
      class="dropdown-button arrow-down"
      v-bind:class="{'arrow-down--up' : show}"
      v-on:click.prevent="toggle($event)"
      :disabled="disabled"
      @keyup.esc="show = false"
    >
      {{text}}
    </a>
    <slot name="dropdown-menu" v-if="show" v-on:click.prevent="show = false"></slot>
  </li>
  <div :class="{'open': show}" v-on-click-outside="clicked" v-else>
    <a href="#"
      class="dropdown-button arrow-down"
      v-bind:class="{'arrow-down--up' : show}"
      v-on:click.prevent="toggle($event)"
      :disabled="disabled"
      @keyup.esc="show = false"
      v-html="text"
    >
      {{text}}
    </a>
    <slot name="dropdown-menu" v-if="show" v-on:click.prevent="show = false"></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  components: {
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: ''
    }
  },
  methods: {
    toggle (e) {
      this.show = !this.show
    },
    clicked () {
      this.show = false
    }
  },
  events: {
    'd-none::dropdown' () {
      this.show = false
    }
  }
}
</script>
