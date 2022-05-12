<template>
  <div class="products-page">
    <HeaderFilter v-if="filterOpen" :categories="loadedCategory" />
    <ProductList :products="loadedProducts" />
    <v-card
      color="grey lighten-4"
      flat
      height="35px"
      tile
      class="filter-icons"
    >
      <v-toolbar collapse>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon @click="closeFilter()">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>
import HeaderFilter from '~/components/Filters/HeaderFilter.vue'
export default {
  components: { HeaderFilter },
  middleware: 'log',
  data () {
    return {
      filterOpen: false
    }
  },
  computed: {
    loadedProducts () {
      return this.$store.getters.loadedProducts
    },
    loadedCategory () {
      return this.$store.getters.getCategories
    }
  },
  created () {
    this.$nuxt.$on('filter', $event => this.filter($event))
  },
  methods: {
    filter (e) {
      // work in progress/
      // We are capturing the category, but what's the best way to update the vuex store?
      // if i change the loadedProducts getter, then it's going to mess up the page once i remove the category?
      console.log('chose to filter the category: ', e)
      console.log(this.loadedProducts.filter(product => product.categories === e.category))
    },
    closeFilter () {
      this.filterOpen = !this.filterOpen
    }
  }
}
</script>

<style scoped>
.products-page {
    display: flex;
    justify-content: center;
    align-items: center;
}

.filter-icons {
  position: fixed;
  bottom: 8%;
  height: 35px;
  right: 5%;
  z-index: 100;
}
</style>
