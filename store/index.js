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
  mem: Math.floor(Math.random() * 100),
  storeData: [],
  invalidLink: false,
  filterObj: {}
})
export const mutations = {
  setProducts (state, productsArray) {
    state.loadedProducts = productsArray
  },
  addCart (state, product) {
    state.loadedCart.push(product)
  },
  purgeCart (state) {
    state.loadedCart = []
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
  updateFilter (state, payload) {
    console.log('did we get the right payload here?')
    console.log(payload)
    state.filterObj = payload
  }
}

export const actions = {
  async nuxtServerInit (vuexContext, context) {
    if (context.route.params.store) {
      vuexContext.dispatch('getStoreInfo', context)
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
      }
    }
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
  async removeOrderHistory (vuexContext, userID) {
    this.$axios.$post('http://192.168.1.215:5000/order/delete/' + userID)
    return await vuexContext.commit('purgeCart')
  },
  filterProducts (vuexContext, filterObj) {
    console.log(`filter object is ${filterObj}`)
    console.log(filterObj)
    vuexContext.commit('updateFilter', filterObj)
  }
}

export const getters = {
  loadedProductsNew: (state) => {
    return state.loadedProducts
  },
  loadedProducts: (state) => {
    switch (state.filterObj.filterCount) {
      // no filters are passed
      case 0:
      case undefined:
        console.log('this should run before we get an error')
        console.log(state.loadedProducts)
        return state.loadedProducts
      // one filter is passed
      case 1:
        return state.loadedProducts.filter((product) => {
          for (const key in state.filterObj) {
            const caseOneFilter = state.storeData[0].filters[0]
            const caseTwoFilter = state.storeData[0].filters[1]
            const caseThreeFilter = state.storeData[0].filters[2]
            console.log(key, product[caseOneFilter], caseOneFilter, state.filterObj[key])
            console.log(key, product[caseTwoFilter], caseTwoFilter, state.filterObj[key])
            console.log(key, product[caseThreeFilter], caseThreeFilter, state.filterObj[key])

            if (product[caseOneFilter]) {
              if (product[caseOneFilter].includes(state.filterObj[key])) { return true }
            }
            if (product[caseTwoFilter]) {
              if (product[caseTwoFilter].includes(state.filterObj[key])) {
                console.log('u there babe')
                return true
              }
            } if (product[caseThreeFilter]) {
              if (product[caseThreeFilter].includes(state.filterObj[key])) { return true }
            }
          }
          return false
        })
        // two filters are based
      case 2:
        return state.loadedProducts.filter((product) => {
          for (const key in state.filterObj) {
            if (product[key]) {
              if (!product[key].includes(state.filterObj[key])) { return false }
            }
          }
          return true
        })
    }
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
