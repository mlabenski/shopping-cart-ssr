import Vue from 'vue'
import Storage from 'vue-ls'
import * as Filters from '~/helpers/filters'
const options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'memory' // storage name session, local, memory
}

Vue.use(Storage, options)
export const state = () => ({
  loadedProducts: [],
  filteredProducts: [],
  loadedCart: [],
  cart: 0,
  mem: Math.floor(Math.random() * 100),
  storeData: [],
  invalidLink: false,
  filter: {
    search: '',
    status: 'all',
    value: '',
    order: 'createdAt'
  }
})
export const mutations = {
  setProducts (state, productsArray) {
    state.loadedProducts = productsArray
  },
  setFilteredProducts (state, productsArray) {
    state.filteredProducts = productsArray
  },
  addCart (state, product) {
    state.loadedCart.push(product)
  },
  purgeCart (state) {
    state.loadedCart = []
  },
  removeOrderByID (state, productID) {
    const filtered = state.loadedCart.filter(function (product) {
      return product.product.productId !== productID
    })
    state.loadedCart = filtered
  },
  setOrder: (state, productId) => {
    state.cart.push(productId)
  },
  setStoreInfo (state, storeData) {
    state.storeData = storeData
  },
  invalidLink (state, bool) {
    state.invalidLink = bool
  },
  setFilterStatus (state, status) {
    state.filter.status = status
  },
  setFilterValue (state, statusValue) {
    state.filter.value = statusValue
  },
  filterProducts (state) {
    const products = [...state.loadedProducts]
    state.filteredProducts = products
    state.filteredProducts = Filters.filterProducts(state.filter, products)
  }
}

export const actions = {
  async nuxtServerInit (vuexContext, context) {
    if (context.route.params.store) {
      await vuexContext.dispatch('getStoreInfo', context)
      return await vuexContext.dispatch('getProductInfo', context)
    } else {
      return vuexContext.commit('invalidLink', true)
    }
  },
  async getProductInfo (vuexContext, context) {
    const productData = []
    const data = await context.app.$axios.$get('http://192.168.1.215:5000/store/' + context.route.params.store + '/products')
    for (const key in data) {
      productData.push({ ...data[key], id: key })
      if (productData[key].options !== null) {
        productData[key].options = JSON.parse(productData[key].options)
        productData[key].options.unshift('')
      }
    }
    await vuexContext.commit('setFilteredProducts', productData)
    vuexContext.commit('setProducts', productData)
  },
  async getStoreInfo (vuexContext, context) {
    const data = await context.app.$axios.$get('http://192.168.1.215:5000/store/' + context.route.params.store)
    for (const key in data) {
      if (data[key].filters !== null) {
        data[key].filters = JSON.parse(data[key].filters)
      }
    }
    vuexContext.commit('setStoreInfo', data)
  },
  addCart (vuexContext, product) {
    const ogProduct = {
      product,
      updatedDate: new Date()
    }
    return this.$axios
      // .$post("http://localhost:5000/orders", createdOrder
      .$post(
        `http://192.168.1.215:5000/order/add?userID=${product.userID}&productID=${product.productId}&quantity=${product.quantity}&price=${product.price}`
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
  async buildLink (vuexContext, userID) {
    // ommitting hpp header for github const l
    const linkHeader = vuexContext.state.storeData[0].hpp
    let generatedLink = []
    const cartItems = vuexContext.state.loadedCart
    console.log(cartItems)
    cartItems.forEach(function (listing) {
      const price = listing.product.quantity * listing.product.price
      generatedLink += listing.product.name + '%7C' + listing.product.quantity + '%7C' + price + '<>'
    })
    // removing the last <> from the URL because it'd be invalid if not..
    console.log(linkHeader + generatedLink.slice(0, -2))
    vuexContext.dispatch('removeOrderHistory', userID)
    return await linkHeader + generatedLink.slice(0, -2)
  },
  async removeOrderByID (vuexContext, id) {
    await this.$axios.$post('http://192.168.1.215:5000/order/remove/' + id)
    return vuexContext.commit('removeOrderByID', id)
  },
  async removeOrderHistory (vuexContext, userID) {
    await this.$axios.$post('http://192.168.1.215:5000/order/delete/' + userID)
    return vuexContext.commit('purgeCart')
  },
  async filterStatus (vuexContext, { status, value }) {
    await vuexContext.commit('setFilterStatus', status)
    await vuexContext.commit('setFilterValue', value)
    vuexContext.dispatch('filterProducts')
  },
  async filterProducts (vuexContext) {
    await vuexContext.commit('filterProducts')
  }
}

export const getters = {
  getFilteredProducts: (state) => {
    return state.filteredProducts
  },
  loadedProducts: (state) => {
    return state.loadedProducts
  },
  loadedCart: (state) => {
    return state.loadedCart
  },
  getCart: (state) => {
    return state.cart
  },
  loadedProductsByStore: (state, storeID) => {
    return state.loadedProducts.find(products => products.storeID === storeID)
  },
  getCategories: (state) => {
    const resArr = []
    state.loadedProducts.filter(function (item) {
      const i = resArr.findIndex(x => x === item.categories)
      if (i <= -1) {
        resArr.push(item.categories)
      }
      return null
    })
    return resArr
  },
  getStore: (state) => {
    return state.storeData
  },
  getFilters: (state) => {
    const length = state.storeData[0].filters.length
    console.log('length is ' + length)
    const filters = []
    if (length > 0) {
      const filter0 = state.storeData[0].filters[0]
      const result = [...new Set(state.loadedProducts.map((obj) => {
        return obj[`${filter0}`]
      })
      )]
      result.unshift('')
      filters.push({ filterName: filter0, choices: result })
    }
    if (length > 1) {
      const filter1 = state.storeData[0].filters[1]
      const result = [...new Set(state.loadedProducts.map((obj) => {
        return obj[`${filter1}`]
      })
      )]
      result.unshift('')
      filters.push({ filterName: filter1, choices: result })
    }
    if (length > 2) {
      const filter2 = state.storeData[0].filters[2]
      const result = [...new Set(state.loadedProducts.map((obj) => {
        return obj[`${filter2}`]
      })
      )]
      result.unshift('')
      filters.push({ filterName: filter2, choices: result })
    }
    if (length > 0) {
      console.log(filters)
      return filters
    } else {
      return null
    }
  }
}
