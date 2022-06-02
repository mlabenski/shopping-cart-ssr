<template>
  <v-row
    justify="space-around"
    align="center"
    class="the-header"
  >
    <v-chip
      v-for="(category, index) in categories"
      :key="category"
      class="ma-2"
      :input-value="active"
      filter
      @click="$nuxt.$emit('filter', {category, index})"
    >
      {{ category }} {{ index }}
    </v-chip>
  </v-row>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      active: false
    }
  }
}
</script>

<style scoped>
.header-container {
  height: 60px;
}

.the-header {
  width: 100%;
  position: fixed;
  top: 6%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  box-sizing: border-box;
  padding: 0 20px;
}
</style>
