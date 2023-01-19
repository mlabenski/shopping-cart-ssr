<template>
  <div class="single-post-page">
    <TheHeader :title="loadedProduct.name" @sidenavToggle="displaySidenav = !displaySidenav" />
    <section class="post">
      <h1 class="post-title" :style="cssProps">
        {{ loadedProduct.name }}
      </h1>
      <div class="post-details" :style="cssProps">
        <div class="post-detail" :style="cssProps">
          {{ loadedProduct.categories }}
        </div>
        <div class="post-detail" :style="cssProps">
          $ {{ loadedProduct.price }}
        </div>
        <div class="post-detail" :style="cssProps">
          {{ loadedProduct.descShort }}
        </div>
      </div>
      <div v-if="selected===''" class="post-image" :style="{backgroundImage: 'url(' + loadedProduct.image + ')'}" />
      <div v-if="selected!==''" class="post-image" :style="{backgroundImage: 'url(' + selected.image + ')'}" />
      <div class="text-center" style="position:relative; margin-top: 15px">
        <h3>Total Cost: ${{ quantity * loadedProduct.price }}.00</h3>
      </div>
      <v-container fluid>
        <v-row>
        <v-col>
          <h2>Options: </h2>
          <v-select v-if="loadedProduct.options !== null" v-model="selected" @change="checkOption(selected)">
            <option :key="''" :value="''">
              {{ loadedProduct.name }}
            </option>
            <option v-for="product in loadedProduct.options" :key="product.value" :value="product">
              {{ product.value }}
            </option>
          </v-select>
        </v-col>
        <v-col>
          <h2>Quantity: </h2>
          <input v-model="quantity" style="max-width: 75%" placeholder="Edit Quantity" value="1" type="number">
        </v-col>
        </v-row>
      </v-container>

      <v-row>
        <v-col>
          <v-btn
            rounded
            color="primary"
            dark
            style=""
            @click="onSubmitted(loadedProduct, quantity)"
          >
            Add to Cart
          </v-btn>
        </v-col>
      </v-row>
    </section>
    <section class="post-feedback">
      <p>Let me know what you think about the post, send a mail to <a href="mailto:geeboff@geeboff.com">geeboff@geeboff.com</a>.</p>
    </section>
  </div>
</template>

<script>
import VueIcons from '~/components/Filters/VueIcons.vue'
import TheHeader from '@/components/Navigation/TheHeader'

export default {
  components: {
    TheHeader
  },
  asyncData (context) {
    if (context.payload) {
      return {
        loadedProduct: context.payload
      }
    }
    // we are making this api call every view, might as well find a way to cache it. like SSR..
    // but for now, we still want to obtain the shop data which is pretty difficult. [menu (header)] -> [titles]
    return context.app.$axios.$get('https://usewrapper.herokuapp.com/store/' + context.params.store + '/products/' + context.params.id)
      .then((data) => {
        if (data.options) {
          data.options = JSON.parse(data.options)
          return {
            loadedProduct: data
          }
        } else {
          return {
            loadedProduct: data
          }
        }
      }).catch(e => context.error(e))
  },
  props: ['store'],
  data () {
    return {
      quantity: 1,
      selected: '',
      displaySidenav: false,
    }
  },
  head: {
    title: 'Product Details'
  },
  computed: {
    cssProps () {
        return {
            '--secondary-color': this.$vuetify.theme.themes.dark.tertiary
        }
  },
  methods: {
    onSubmitted (product, quantity) {
      const storeID = this.$route.params.store
      const numberStore = Number(storeID)
      const userID = this.$cookies.get('userID')
      //  its not safe to do the calculation in here
      // high risk as $store.dispatch('addCart', data)
      // data is the product information, generated through the cart. 
      // addCart method [POST]  /order/add
      // api `https://usewrapper.herokuapp.com/order/add?storeid=${product.storeID}&userID=${product.userID}&productID=${product.productID}&quantity=${product.quantity}&price=${product.price}`
      // also runs the command*
      // state.loadedCart.push(product)
      const calcPrice = quantity * product.price
      const data = { storeID: numberStore, userID, name: product.name, productID: product.productId, quantity, calcPrice, price: product.price, image: product.image }
      this.$store.dispatch('addCart', data).then(() => {
        this.$router.push('/store/' + this.$route.params.store)
      })
    }
  }
}
}
</script>

<style scoped>
.single-post-page {
  text-align: center;
  box-sizing: border-box;
}

.post-detail {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--secondary-color);
  margin: 0 10px;
}
.post {
  width: 100%;
  padding-top: 20px;
}

.post-image {
  width: 100%;
  height: 300px;
  background-position: center;
  background-size: cover;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}



.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-feedback {
  padding-top: 250px
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
