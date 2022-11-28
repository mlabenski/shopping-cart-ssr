<template>
  <div class="home-page">
    <section class="intro">
      <h1>Buy NFTs from Nicolas Cage</h1>
      <h1>Categories {{ loadedStore }}</h1>
      <CartDisplay :cart="loadedCart" />
    </section>
    <ProductList v-if="newLoadedProducts" :products="newLoadedProducts" />
  </div>
</template>

<script>
import ProductList from '~/components/Products/ProductList.vue'
import CartDisplay from '~/components/Cart/CartDisplay.vue'
export default {
  name: 'StoreHome',
  components: { CartDisplay, ProductList },
  asyncData (context) {
    const lProducts = []
    if (context.payload) {
      for (const i in context.payload) {
        if (context.payload[i].storeID === this.$route.params.store) {
          lProducts.push({ ...context.payload[i], id: i })
        }
      }
    } else {
      return context.app.$axios.$get('https://usewrapper.herokuapp.com/store/' + context.params.store)
        .then((data) => {
        console.log(data.products)
          for (const i in data.products) {
            lProducts.push({ data.products[i], id: i })
          }
          return {
            newLoadedProducts: lProducts
          }
        }).catch(e => context.error(e))
    }
  },
  data () {
    return {
      newLoadedProducts: []
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
  padding: 30px;
  box-sizing: border-box;
  background-image: url("~assets/images/main-page-background.png");
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
