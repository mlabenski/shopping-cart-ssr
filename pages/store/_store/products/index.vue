<template>
  <div class="products-page">
    <HeaderFilter v-if="filterOpen" :categories="loadedCategory" />
    <SidebarFilter
      v-if="displaySidenav"
      :loaded-filters="loadedFilters"
      :show="displaySidenav"
      @close="displaySidenav = false"
    />
    <ProductList v-if="!loadedFilteredProducts.length" :products="loadedProducts" />
    <ProductList v-if="loadedFilteredProducts.length>0" :products="loadedFilteredProducts" />
    <v-card
      color="grey lighten-4"
      flat
      height="35px"
      tile
      class="filter-icons"
    >
      <v-toolbar collapse>
        <v-btn icon @click="closeSidebarFilter()">
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
import SidebarFilter from '~/components/Filters/SidebarFilter.vue'
import ProductList from '~/components/Products/ProductList.vue'
export default {
  name: 'storeID',
  components: { HeaderFilter, SidebarFilter, ProductList },
  middleware: 'log',
  data () {
    return {
      filterOpen: false,
      displaySidenav: false
    }
  },
  computed: {
    loadedProducts () {
      return this.$store.getters.loadedProducts
    },
    loadedFilteredProducts () {
      return this.$store.getters.getFilteredProducts
    },
    loadedCategory () {
      return this.$store.getters.getCategories
    },
    loadedFilters () {
      return this.$store.getters.getFilters
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
    },
    closeSidebarFilter () {
      this.displaySidenav = !this.displaySidenav
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
