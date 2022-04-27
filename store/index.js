export const state = () => ({
  loadedProducts: [],
  token: null,
  loadedCart: null
})
export const mutations = {
  setProducts (state, productsArray) {
    state.loadedProducts = productsArray
  },
  addCart (state, product) {
    state.loadedCart.push(product)
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
      ...product,
      updatedDate: new Date()
    };
    return this.$axios
      //.$post("http://localhost:5000/orders", createdOrder
      .$post("http://localhost:5000/order/add", createdOrder.productId
      )
      .then(data => {
        //vuexContext.commit("addCart", {...createdOrder, id: data.productId})
        vuexContext.commit("addCart", {...createdOrder, id: data.productId})
      })
      .catch(e => console.log(e));
  },
  setProducts(vuexContext, product) {
    vuexContext.commit("setProducts", product);
  }
}

export const getters = {
  loadedProducts: (state) => {
    return state.loadedProducts
  },
  loadedCart: (state) => {
    return state.loadedCart
  },
  tokenGenerated: (state) => {
    return state.token != null
  }
}
