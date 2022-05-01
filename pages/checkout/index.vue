<template>
  <div class="checkout-page">
    <v-btn rounded @click="buildLink()">
      Buy Now
    </v-btn>
    <h1>This is where you should edit your cart or purchase above ^ </h1>
    <ul id="example-1">
      <li v-for="item in loadedCart" :key="item.product.productId">
        <v-card
          class="mx-auto"
          max-width="434"
          tile
        >
          <v-row
            align="end"
            class="fill-height"
          >
            <v-col
              align-self="start"
              class="pa-0"
              cols="12"
            >
              <v-avatar
                class="profile"
                color="grey"
                size="164"
                tile
              >
                <v-img
                  :style="{backgroundImage: 'url(' + item.product.image + ')'}"
                />
              </v-avatar>
            </v-col>
            <v-col class="py-0">
              <v-list-item
                color="rgba(0, 0, 0, .4)"
                dark
              >
                <v-list-item-content>
                  <v-list-item-title class="text-h6 text">
                    {{ item.product.name }}
                  </v-list-item-title>
                  <v-list-item-title class="text-h6 text">
                    $ {{ item.product.price }}
                  </v-list-item-title>
                  <v-list-item-title class="text-h6 text">
                    $ {{ item.product.quantity }}
                  </v-list-item-title>
                  <v-list-item-title class="text-h6 text">
                    $ {{ item.product.calcPrice }}
                  </v-list-item-title>
                  <v-list-item-subtitle>REMOVE/EDIT</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CheckoutPage',
  computed: {
    loadedCart () {
      return this.$store.getters.loadedCart
    }
  },
  methods: {
    buildLink () {
      const userID = this.$cookies.get('userID')
      this.$store.dispatch('buildLink', userID).then((data) => {
        window.open(data, '_blank')
      })
    }
  }
}
</script>

<style scoped>
.checkout-page {
  text-align: center;
  padding: 30px;
  background-color: #696969;
}
.text {
  color: black
}
</style>
