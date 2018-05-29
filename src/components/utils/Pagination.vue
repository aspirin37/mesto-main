<template>
  <nav v-if="count >= itemsPerPage" class="">

    <span class="page-item text-center" v-bind:class="{'disabled' : defaultPage === pages - 1}" v-if="moreBtn">
      <span class="page-link rounded mb-2" v-on:click.prevent="toPage(defaultPage + 1, true)">Показать еще</span>
    </span>

    <div class="d-flex w-100 justify-content-between">

      <span class="page-item" v-bind:class="{'disabled' : defaultPage === 0}">
        <span class="page-link rounded px-3" v-on:click.prevent="toPage(defaultPage - 1)">‹<span class="d-none d-md-inline-block ml-1">Назад</span></span>
      </span>

      <ul class="pagination mb-0 align-middle">
        <li class="page-item text-dark" v-bind:class="[{'active' : defaultPage === 0}]" v-if="pages > 1">
          <a href="#" class="page-link" v-on:click.prevent="toPage(0)">1</a>
        </li>
        <!-- <li class="hidden-xs page-item" v-if="(defaultPage - 3) > 1"><a href="#" class="page-link" v-on:click.prevent="toPage(2)">..</a></li> -->
        <li class="page-item pr-1" v-if="(defaultPage - 1) > 1"></li>
        <li class="page-item" v-for="(page, index) in pages"
          :key="index"
          v-bind:class="[{'active' : page === defaultPage + 1}]"
          v-if="(Math.abs(page - defaultPage) < 1 || Math.abs(defaultPage - page + 1) < 2 || page == 1) && page !== pages && page !== 1"
        ><a href="#" class="page-link" v-on:click.prevent="toPage(index)">{{page}}</a></li>
        <li class="page-item pl-1" v-if="(defaultPage + 3) < pages"></li>
        <!-- <li class="hidden-xs page-item" v-if="(defaultPage + 4) < pages"><a href="#" class="page-link" v-on:click.prevent="toPage(pages - 3)">..</a></li> -->
        <li class="page-item" v-bind:class="[{'active' : pages === defaultPage + 1}]" v-if="pages > 1">
          <a href="#" class="page-link" v-on:click.prevent="toPage(pages - 1)">{{pages}}</a>
        </li>
      </ul>

      <span class="page-item" v-bind:class="{'disabled' : defaultPage === pages - 1}">
        <span class="page-link rounded px-3" v-on:click.prevent="toPage(defaultPage + 1)"><span class="d-none d-md-inline-block mr-2">Вперед</span>›</span>
      </span>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    count: {
      type: Number,
      default: 1
    },
    itemsPerPage: {
      type: Number,
      default: 7
    },
    pushQuery: {
      type: Boolean,
      default: false
    },
    moreBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultPage: 0,
      defaultPerPage: this.$route.query.per || this.itemsPerPage,
      perPageValues: [7, 15, 30]
    }
  },
  computed: {
    // defaultPerPage () {
    //   if (this.pages > this.defaultPage) {
    //     return this.pages
    //   }
    //   return this.$route.query.per || this.itemsPerPage
    // },
    pages () {
      let pagesNumber = Math.ceil(this.count / this.itemsPerPage)
      if (pagesNumber < this.defaultPage) {
        this.toPage(0)
      }
      return pagesNumber
    }
  },
  watch: {
    // $route (to, from) {
    //   if ((+from.query.page !== +to.query.page) && this.$route.query.page !== undefined) {
    //     this.toPage(+this.$route.query.page - 1 || 0)
    //   }
    // }
  },
  mounted () {
    if (this.pushQuery) {
      this.toPage(+this.$route.query.page - 1 || 0, null, false)
    } else {
      this.toPage(0, null, false)
    }
  },
  methods: {
    toPage (index, push, scrollTop = true) {
      if (this.pushQuery && +index > 0) {
        this.setQuery({page: +index + 1})
      } else if (this.pushQuery) {
        this.setQuery({page: null})
      }
      this.defaultPage = index
      if (push) {
        this.emitPushPage(index)
      } else {
        this.emitChangePage(index)
        if (scrollTop) {
          window.scrollTo(0, 0)
        }
      }
    },
    setQuery (val) {
      let options = Object.assign({}, this.$route.query, val)
      let newopts = val => {
        let newObj = {}
        Object.keys(val).forEach(prop => {
          if (val[prop]) newObj[prop] = val[prop]
        })
        return newObj
      }

      this.$router.push({query: newopts(options)})
    },
    // setItemsNumber (value) {
    //   let oldPerPage = this.defaultPerPage
    //   let newDefaultPage = Math.floor((oldPerPage / value) * this.defaultPage)

    //   this.defaultPerPage = value
    //   this.defaultPage = newDefaultPage
    //   this.setQuery({page: newDefaultPage + 1})
    //   this.emitChangePage(this.$route.query.page - 1)
    // },
    getOffset (offs) {
      return offs * (this.defaultPerPage || this.itemsPerPage)
    },
    emitChangePage (offs) {
      this.$emit('pageChanged', this.getOffset(offs), this.defaultPerPage)
    },
    emitPushPage (offs) {
      this.$emit('showMore', this.getOffset(offs), this.defaultPerPage)
    }
  }
}
</script>
