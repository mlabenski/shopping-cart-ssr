<template>
  <div>
    <v-system-bar window dark>
      <v-flex xs6>
        <v-btn text @click="handleContact">Custom Message</v-btn>
      </v-flex>
      <v-spacer></v-spacer>
      <v-icon
      large
      color="white"
    >
      mdi-email
    </v-icon>
    <v-icon
      large
      color="white"
      style="padding-left: 9px;"
    >
      mdi-phone
    </v-icon>
    </v-system-bar>
    <v-toolbar :class="{scrollDown: scrollPosition < 35, scrolled: scrollPosition > 35}">
      <v-layout row wrap>
        <v-flex xs1>

        </v-flex>
        <v-flex xs10>
          <nuxt-link to="/"><v-toolbar-title>{{ title }}</v-toolbar-title></nuxt-link>
        </v-flex>
    </v-layout>
      <v-layout row wrap>
      <v-flex xs6>
      </v-flex>
        <v-menu v-if="smallScreen">
        <template v-slot:activator="{ on }" class="div-for-small-screen">
          <v-btn icon v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list style="margin-top:1.5%;">
          <v-list-item @click.prevent="onFilter">
            <v-list-item-title>Filters</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="onCategories" style="border-width: thin; border-radius: 0 0 2px 0; border-bottom-color: grey;">
            <v-list-item-title>Categories</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="$router.push('/checkout')" :disabled="savedCart == 0">
            <v-list-item-title>Check Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-flex xs6 v-else>
        <v-spacer></v-spacer>
        <v-btn text @click="onFilter">Categories</v-btn>
        <v-btn text @click="onCategories">Filters</v-btn>
        <v-badge color="primary" right><v-btn text @click="$router.push('/checkout')" :disabled="savedCart == 0">Checkout {{ savedCart }}</v-btn></v-badge>
      </v-flex>
    </v-layout>
    </v-toolbar>
    </div>
</template>

<script>
import TheSideNavToggle from '@/components/Navigation/TheSideNavToggle'

export default {
  name: 'TheHeader',
  components: {
    TheSideNavToggle
  },
  props: ['title'],
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  data () {
    return {
      store: null,
      scrollPosition: null
    }
  },
  async fetch () {
  },
  computed: {
    savedCart () {
      return this.$store.getters.loadedCart.length
    },
    smallScreen() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    handleSearch() {
      console.log('This feature has not been implemented yet')
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    }
  },
  destroy() {
  window.removeEventListener('scroll', this.updateScroll)
  }
}
</script>

<style scoped>
.header-container {
  height: 60px;
}
.scrollDown {
  width: 100%;
  height: 58px;
  z-index: 100;
}
.scrolled {
  width: 100%;
  position: fixed;
  top: 0px;
  background-color: black;
  z-index: 100;
}
.logo a {
  text-decoration: none;
  color: white;
}
.spacer {
  flex: 1;
}
.navigation-items {
  display: none;
}
@media (min-width: 768px) {
  .navigation-items {
    display: block;
  }
}
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}
.nav-item {
  margin: 0 10px;
}
.nav-item a {
  text-decoration: none;
  color: white;
}
.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: red;
}
.logo {
  max-width: 50px;
  margin-left: 10px;
}

.v-toolbar {
  background-color: #3f51b5;
}

.v-toolbar__title {
  color: black;
  font-size: 26px;
}

.v-text-field {
  background-color: #fff;
  color: #000;
}

.v-text-field input::placeholder {
  color: #bdbdbd;
}

.v-btn {
  background-color: transparent;
  color: #fff;
  font-size: 21px;
  text-decoration: solid;
}
.div-for-small-screen {
  display: block;
}
.div-for-large-screen {
  display: none;
}
@media (min-width: 768px) {
  .div-for-small-screen {
    display: none;
  }
  .div-for-large-screen {
    display: block;
  }
}

</style>
