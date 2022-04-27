<template>
  <div>
    <v-alert
      v-model="alert"
      dismissible
      type="error"
    >
      <v-row align="center">
        <v-col class="grow">
          Nunc nonummy metus. Nunc interdum lacus sit amet orci. Nullam dictum felis eu pede mollis pretium. Cras id dui.
        </v-col>
        <v-col class="shrink">
          <v-btn v-if="alert" @click="alert = false">
            Take action
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>

export default {
  props: {
    cart: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      alert: true
    }
  }
}
</script>

<style scoped>

</style>
