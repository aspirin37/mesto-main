<template>
  <div>
    <div class="tabs form-group">
      <ul :class="tabsClass">
        <li v-for="(tab, index) in tabs" class="nav-item" :class="[itemClass]" :key="index">
          <a href="#" v-on:click.prevent="selectTab(tab, index)" class="nav-link" :class="[linkClass, { 'active': tab.isActive }]">{{ tab.name }}</a>
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: []
    }
  },
  created () {
    this.tabs = this.$children
  },
  props: {
    tabsClass: {
      type: Array,
      default: () => {
        return []
      }
    },
    itemClass: {
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
    }
  },
  methods: {
    selectTab (selectedTab, index) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name === selectedTab.name)
        this.$emit('onSelect', index)
      })
    }
  }
}
</script>

<!-- example -->
<!-- <tabs>
  <tab name="Services" :selected="true">
    <ul>
      <li>Cool services we offer</li>
      <li>And another cool service we offer</li>
    </ul>
  </tab>
  <tab name="About">
    <p>Here is info about us.</p>
  </tab>
  <tab name="Contact">
    <p>Conact us if you want.</p>
  </tab>
</tabs> -->
