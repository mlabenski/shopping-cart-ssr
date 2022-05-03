import Vue from 'vue'
import Storage from 'vue-ls'

const options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'memory' // storage name session, local, memory
}

Vue.use(Storage, options)
export const state = () => ({
  loadedProducts: [],
  loadedCart: [],
  cart: 0,
  mem: Math.floor(Math.random() * 100)
})
export const mutations = {
  setProducts (state, productsArray) {
    state.loadedProducts = productsArray
  },
  addCart (state, product) {
    state.loadedCart.push(product)
  },
  setOrder: (state, productId) => {
    state.cart.push(productId)
  }
}

export const actions = {
  nuxtServerInit (vuexContext, context) {
    return context.app.$axios
      .$get('http://localhost:5000/products')
      .then((data) => {
        const productsArray = []
        for (const key in data) {
          productsArray.push({ ...data[key], id: key })
        }
        context.app.$cookies.set('userID', Math.floor(Math.random() * 100))
        vuexContext.commit('setProducts', productsArray)
      })
      .catch(e => context.error(e))
  },
  addCart (vuexContext, product) {
    const ogProduct = {
      product,
      updatedDate: new Date()
    }
    return this.$axios
      // .$post("http://localhost:5000/orders", createdOrder
      .$post(
        `http://localhost:5000/order/add?userID=${product.userID}&productID=${product.productId}&quantity=${product.quantity}&price=${product.price}`
      )
      .then((data) => {
        // vuexContext.commit("addCart", {...createdOrder, id: data.productId})
        vuexContext.commit('addCart', { userID: data.userID, ...ogProduct })
        // vuexContext.commit('addCart', { userID: data.userID, productID: data.productID, quantity: data.quantity, price: data.price })
      })
      .catch(e => console.log(e))
  },
  setProducts (vuexContext, product) {
    vuexContext.commit('setProducts', product)
  },
  buildLink (vuexContext, userID) {
    // ommitting hpp header for github const l
    const linkHeader = 'https://cardpointedemoaj.securepayments.cardpointe.com/pay?details='
    let generatedLink = []
    const cartItems = vuexContext.state.loadedCart
    console.log(cartItems)
    cartItems.forEach(function (listing) {
      const price = listing.product.quantity * listing.product.price
      generatedLink += listing.product.name + '%7C' + listing.product.quantity + '%7C' + price + '<>'
    })
    console.log(linkHeader + generatedLink.slice(0, -2))
    return linkHeader + generatedLink.slice(0, -2)
  }
}

export const getters = {
  loadedProducts: (state) => {
    return state.loadedProducts
  },
  loadedCart: (state) => {
    return state.loadedCart
  },
  getCart: (state) => {
    return state.cart
  }
}
