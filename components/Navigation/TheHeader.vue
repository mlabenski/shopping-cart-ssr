<template>
  <div>
    <v-system-bar window dark height="24">
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
        <v-flex xs8 md4 lg4>
          <v-toolbar-title @click.prevent="$router.push('/checkout')">
            <span class="ml-2">{{ title }}</span>
          </v-toolbar-title>
        </v-flex>
        <v-spacer>
        </v-spacer>
        <v-menu v-if="smallScreen">
        <template v-slot:activator="{ on }" class="div-for-small-screen">
          <v-btn icon v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-container>
            <v-row style="margin-top:1.5%;">
              <v-col cols="12" >
                <v-list-item @click.prevent="onFilter">
                  <v-list-item-title>Filters</v-list-item-title>
                </v-list-item>
                <v-list-item @click.prevent="onCategories" style="border-width: thin; border-radius: 0 0 2px 0; border-bottom-color: grey;">
                  <v-list-item-title>Categories</v-list-item-title>
                </v-list-item>
                <v-list-item @click.prevent="$router.push('/checkout')" :disabled="savedCart == 0">
                  <v-list-item-title>Check Out</v-list-item-title>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-menu>

      <v-flex xs4 md4 lg4 v-else>
        <v-btn class="header_btn_text" text small @click="onFilter">Categories</v-btn>
        <v-btn class="header_btn_text" text small @click="onCategories">Filters</v-btn>
        <v-badge color="primary" right><v-btn class="header_btn_text" text @click="$router.push('/checkout')" :disabled="savedCart == 0">Checkout {{ savedCart }}</v-btn></v-badge>
      </v-flex>
      <v-flex md1 lg1>
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
      scrollPosition: 1
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
.v-btn.v-size--default {
font-size: .8rem;
}
.header-container {
  height: 60px;
}
.scrollDown {
  width: 100%;
  height: 64px;
  z-index: 100;
  background-color: black;
}
@media (min-width: 1080px) {
    .scrollDown {
      height: 88px;
    }
}
.scrolled {
  width: 100%;
  position: fixed;
  height:64px;
  top: 0px;
  background-color: black;
  z-index: 100;
}
@media (min-width: 1080px) {
    .scrolled {
      height: 70px;
    }
}
.header_btn_text {
  font-size: .78rem;
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
  color: white;
  font-size: 22px;
  overflow: hidden;
  text-overflow: clip;
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
