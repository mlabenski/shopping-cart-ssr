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
        vuexContext.commit('setProducts', productsArray)
      })
      .catch(e => context.error(e))
  },
  addCart (vuexContext, product) {
    const createdOrder = {
      product,
      updatedDate: new Date(),
      key: vuexContext.state.mem
    }
    return this.$axios
      // .$post("http://localhost:5000/orders", createdOrder
      .$post(`http://localhost:5000/order/add?data=${product}`
      )
      .then((data) => {
        // vuexContext.commit("addCart", {...createdOrder, id: data.productId})
        vuexContext.commit('addCart', { ...createdOrder, id: data.product })
      })
      .catch(e => console.log(e))
  },
  setProducts (vuexContext, product) {
    vuexContext.commit('setProducts', product)
  },
  setOrders (vuexContext, productId) {
    return this.$axios
      .$get(`http://localhost:5000/order/add/?data=${productId}` + vuexContext.state.cart, productId)
      .then((res) => {
        vuexContext.commit('setOrder', productId)
      })
      .catch(e => alert(e))
  },
  fetchOrders (vuexContext, context) {
    return context.app.$axios
      .$get('/orders')
      .then((data) => {
        const json = data.json()
        vuexContext.commit('setOrder', json.id)
      })
      .catch(e => context.error(e))
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
