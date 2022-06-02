<template>
  <div class="sidenav-container">
    <v-card
      color="grey lighten-4"
      flat
      height="35px"
      tile
      class="filter-icons"
    >
      <v-toolbar collapse>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </div>
</template>

<script>

export default {
  props: {
    loadedProduct: {
      type: Array,
      default: null
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: false
    }
  },
  method: {
  }
}
</script>

<style scoped>

</style>
