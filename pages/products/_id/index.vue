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
      </div>
      <p class="post-content">
        {{ loadedProduct.descShort }}
      </p>
    </section>
    <section class="post-feedback">
      <p>Let me know what you think about the post, send a mail to <a href="mailto:geeboff@geeboff.com">geeboff@geeboff.com</a>.</p>
    </section>
    <div class="text-center" style="position:relative">
      <v-btn
        rounded
        color="primary"
        dark
        style="position: absolute; right: 50px; top: 30px"
        @click="onSubmitted(loadedProduct.name)"
      >
        Add to Shop
      </v-btn>
    </div>
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
    return context.app.$axios.$get('http://localhost:5000/products/' + context.params.id)
      .then((data) => {
        return {
          loadedProduct: data
        }
      })
      .catch(e => context.error(e))
  },
  head: {
    title: 'Product Details'
  },
  methods: {
    onSubmitted (id) {
      console.log(id)
      this.$store.dispatch('addCart', id).then(() => {
        this.$router.push('/')
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

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
