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
                    Quantity: <b>{{ item.product.quantity }} </b>
                  </v-list-item-title>
                  <v-list-item-title class="text-h6 text">
                    Price per item: $<b>{{ item.product.price }} </b>
                  </v-list-item-title>
                  <span class="line" />
                  <v-list-item-title class="text-h6 text">
                    Total Price: $<b>{{ item.product.calcPrice }} </b>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-btn
                class="editBtn"
                elevation="2"
              >
                Edit Order
              </v-btn>
              <v-btn
                class="removeBtn"
                elevation="2"
                @click="removeProduct(item.product.productId)"
              >
                Remove Item
              </v-btn>
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
      // later down the line we will change this to a successful payment/ or an acknowledgement "please work on other window"
      this.$router.push('/store/' + this.$store.state.storeData[0].storeID + '/products')
    },
    editProduct () {

    },
    removeProduct (product) {
      console.log(product)
      this.$store.dispatch('removeOrderByID', product)
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
.editBtn {
  color: white;
  background-color: #dead10 !important;
}
.removeBtn {
  color: white;
  background-color: darkred !important;
}
.line {
  border-bottom: 1px solid #a5a5a5;
  font-size: 1px;
  display: block;
  height: 1px;
  margin-top: 10px; }

</style>
