<template>
  <div class="home-page" v-if="headers">
  <TheHeader :title=headers @sidenavToggle="displaySidenav = !displaySidenav" />
    <section class="intro" v-bind:style="{ 'background-image': 'url(' + headersImg + ')' }">
    </section>
    <ProductList v-if="newLoadedProducts" :products="newLoadedProducts" :storeid="storeid" />
  </div>
</template>

<script>
import ProductList from '~/components/Products/ProductList.vue'
import CartDisplay from '~/components/Cart/CartDisplay.vue'
import TheHeader from '@/components/Navigation/TheHeader'

export default {
  name: 'StoreHome',
  components: { CartDisplay, ProductList, TheHeader },
  asyncData (context) {
    const lProducts = []
    var storeID = ''
    var header = ''
    var headerImg = ''
    var storeID = 0
    if (context.payload) {
      storeID = context.payload[i].storeID
      for (const i in context.payload) {
        if (context.payload[i].storeID === this.$route.params.store) {
          lProducts.push({ ...context.payload[i], id: i })
        }
      }
    } else {
      return context.app.$axios.$get('https://usewrapper.herokuapp.com/store/' + context.params.store)
        .then((data) => {
          // this is resolved - we need  to fix header for db and normalize this as a title
        header = data[0].header
        headerImg = data[0].image
        storeID = data[0].storeID
          for (const i in data[0].products) {
            lProducts.push({ ...data[0].products[i], id: i })
          }
          return {
            newLoadedProducts: lProducts,
            headers: header,
            headersImg: headerImg,
            storeid: storeID,
            loaded: true
          }
        }).catch(e => context.error(e))
    }
  },
  data () {
    return {
      newLoadedProducts: [],
      displaySidenav: false,
      headers: '',
      headersImg: '',
      storeid: null,
      loaded: false
    }
  },
  computed: {
    loadedProducts () {
      return this.$store.getters.loadedProducts
    },
    loadedCart () {
      return this.$store.getters.loadedCart
    },
    loadedCategory () {
      return this.$store.getters.getCategories
    },
    loadedStore () {
      return this.$store.getters.getStore
    }
  }
}
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding-bottom: 30px;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
}
.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}
@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>

