<template>
  <v-app light>
    <v-main>
      <v-container id="main_contain">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader'
import TheSidenav from '@/components/Navigation/TheSidenav'

export default {
  // middleware: 'log',
  components: {
    TheHeader,
    TheSidenav
  },
  data () {
    return {
      displaySidenav: false
    }
  },
  fetch (context) {
    return context.store.dispatch('clientServerInit')
  },
  created () {
    this.$cookies.set('userID', Math.floor(Math.random() * 100))
  }
}
</script>
<style>
html {
  font-family: 'Open Sans', sans-serif;
}
body {
  margin: 0;
}
#main_contain{
  padding: 0;
  max-width: 100%;
}
</style>
