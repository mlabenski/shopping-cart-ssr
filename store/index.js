/* eslint-disable no-console */
import { Store } from 'vuex'

const createStore = () => {
  return new Store({
    state: {
      loadedProducts: [],
      token: null,
      cart: null
    },
    mutations: {
      setProducts (state, products) {
        state.loadedProducts = products
      },
      addOrder (state, product) {
        state.loadedProducts.push(product)
      },
      setToken (state, token) {
        state.token = token
      },
      setCart (state, orderId) {
        state.cart.push(orderId)
      },
      clearToken (state) {
        state.token = null
      }
    },
    actions: {
      nuxtServerInit (vuexContext, context) {
        return context.app.$axios
          .$get('http://localhost:5000/products')
          .then(data => {
            const productsArray = []
            for (const key in data) {
              productsArray.push({ ...data[key], productId: key })
            }
            vuexContext.commit('setProducts', productsArray)
          })
          .catch(e => context.error(e))
      },
      addCart (vuexContext, product) {
        const updatedCart = {
          ...product,
          updatedDate: new Date()
        }
        return this.$axios
          .$post(
            '127.0.0.1/order.json?agent=' +
            vuexContext.state.token,
            updatedCart
          )
          .then((data) => {
            vuexContext.commit('addCart', { ...updatedCart, id: data.productId })
          })
          .catch(e => console.log(e))
      },
      setProducts (vuexContext, products) {
        vuexContext.commit('setProducts', products)
      }
    },
    getters: {
      loadedProducts (state) {
        return state.loadedProducts
      },
      tokenGenerated (state) {
        return state.token != null
      }
    }
  })
}

export default createStore
