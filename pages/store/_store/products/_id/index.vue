<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">
        {{ loadedProduct.name }}
      </h1>
      <div class="post-details">
        <div class="post-detail">
          {{ loadedProduct.categories }}
        </div>
        <div class="post-detail">
          $ {{ loadedProduct.price }}
        </div>
        <div class="post-detail">
          {{ loadedProduct.descShort }}
        </div>
      </div>
      <div class="post-image" :style="{backgroundImage: 'url(' + loadedProduct.image + ')'}" />
      <div class="text-center" style="position:relative; margin-top: 15px">
        <h3>Total Cost: ${{ quantity * loadedProduct.price }}.00</h3>
      </div>
      <v-row>
        <v-col>
          <h2>Options: </h2>
          <select v-if="loadedProduct.options !== null" v-model="selected">
            <option v-for="product in loadedProduct.options" :key="product.value" :value="product">
              {{ product.value }}
            </option>
          </select>
        </v-col>
        <v-col>
          <h2>Quantity: </h2>
          <input v-model="quantity" style="max-width: 75%" placeholder="Edit Quantity" value="1" type="number">
        </v-col>
        <v-col>
          <v-btn
            rounded
            color="primary"
            dark
            style=""
            @click="onSubmitted(loadedProduct.productId, loadedProduct.price, quantity)"
          >
            Add to Shop
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
export default {
  asyncData (context) {
    if (context.payload) {
      return {
        loadedProduct: context.payload.productData
      }
    }
    return context.app.$axios.$get('http://192.168.1.215:5000/store/' + context.params.store + '/products/' + context.params.id)
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
  data () {
    return {
      quantity: 1,
      selected: ''
    }
  },
  head: {
    title: 'Product Details'
  },
  methods: {
    onSubmitted (id, price, quantity) {
      const userID = this.$cookies.get('userID')
      const calcPrice = quantity * price
      const data = { userID, ...this.loadedProduct, quantity, calcPrice, price }
      console.log(data)
      this.$store.dispatch('addCart', data).then(() => {
        this.$router.push('/store/' + this.$store.state.storeData[0].storeID + '/products')
      })
    }
  }
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
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

.post-title {
  margin: 0;
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

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
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
