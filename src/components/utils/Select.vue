<template>
  <li :class="[outerClass, {'open': show}]" v-on-click-outside="clicked" class="relative" v-if="tag == 'li'">
    <a href="#"
      :class="['arrow-down', linkClass, {'arrow-down--up' : show}]"
      v-on:click.prevent="toggle($event)"
      :disabled="disabled"
      @keyup.esc="show = false"
    >
      {{selectedOption || placeholder}}
    </a>
    <transition name="drop">
      <ul :class="['dropdown-menu show', dropdownClass]" v-if="show">
        <li v-for="(option, index) in options" :key="index">
          <slot name="dropdown-option" v-on:click.prevent="show = false"><a href="#" v-on:click.prevent="selectOption(option, true)" class="dropdown-item">{{option[optionValue] || option}}</a></slot>
        </li>
      </ul>
    </transition>
  </li>
  <div :class="[outerClass, {'open': show}]" v-on-click-outside="clicked" v-else class="relative">
    <a href="#"
      :class="['arrow-down', linkClass, {'arrow-down--up' : show}]"
      v-on:click.prevent="toggle($event)"
      :disabled="disabled"
      @keyup.esc="show = false"
    >
      {{selectedOption || placeholder}}
    </a>
    <transition name="drop">
      <ul :class="['dropdown-menu show', dropdownClass]" v-if="show">
        <li v-for="(option, index) in options" :key="index">
          <slot name="dropdown-option" v-on:click.prevent="show = false"><a href="#" v-on:click.prevent="selectOption(option, true)" class="dropdown-item">{{option[optionValue] || option}}</a></slot>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      selectedOption: ''
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
      default: 'li'
    },
    optionValue: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    linkClass: {
      type: Array,
      default: () => {
        return []
      }
    },
    outerClass: {
      type: Array,
      default: () => {
        return []
      }
    },
    dropdownClass: {
      type: Array,
      default: () => {
        return []
      }
    },
    placeholder: {
      type: String,
      default: 'Выбрать'
    },
    selectedItem: null
  },
  watch: {
    options: {
      handler: function (oldVal, val) {
        if (JSON.stringify(oldVal) !== JSON.stringify(val)) {
          this.initSelect()
        }
      },
      deep: true
    },
    selectedItem (val, oldVal) {
      if (val !== oldVal) {
        this.initSelect()
      }
    }
  },
  beforeMount () {
    if (this.options.length) {
      this.initSelect()
    }
  },
  methods: {
    initSelect () {
      this.selectedOption = this.options
        ? (this.selectedItem !== undefined && this.selectedItem !== null)
          ? this.optionValue
            ? this.selectedOption = this.options[this.selectedItem][this.optionValue]
            : this.selectedOption = this.options[this.selectedItem]
          : ''
        : ''
      if (this.selectedItem) {
        this.selectOption(this.options[this.selectedItem])
      }
    },
    toggle (e) {
      this.show = !this.show
    },
    clicked () {
      this.show = false
    },
    selectOption (option, emit) {
      this.selectedOption = this.optionValue ? option[this.optionValue] : option
      this.show = false
      if (emit) {
        this.$emit('selected', option)
      }
    },
    clearSelected () {
      this.selectedOption = ''
    }
  }
}
</script>
