<template>
  <section class="post-list">
    <ProductPreview
      v-for="product in products"
      :id="product.productId"
      :key="product.productId"
      :name="product.name"
      :desc-short="product.descShort"
      :visible="product.visible"
      :price="product.price"
      :image="product.image"
    />
  </section>
</template>

<script>
import ProductPreview from '@/components/Products/ProductPreview'

export default {
  components: {
    ProductPreview
  },
  props: {
    isLinkReady: {
      type: Boolean,
      default: false
    },
    products: {
      type: Array,
      default: null
    }
  }
}
</script>

<style scoped>

.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
