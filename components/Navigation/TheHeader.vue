<template>
  <div class="header-container">
    <header class="the-header">
      <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
      <div class="logo" v-if="isLinkReady">
        <nuxt-link :to="postLink">
          {{title}}
        </nuxt-link>
        <nuxt-link :to="postLink">
          Home Page
        </nuxt-link>
      </div>
      <div class="logo" v-else>
        <nuxt-link :to="`/`">
          No Title ATM
        </nuxt-link>
        <nuxt-link :to="`/`">
          Home Page
        </nuxt-link>
      </div>
      <div class="spacer" />
      <div class="navigation-items">
        <ul class="nav-list">
          <li class="nav-item">
            <nuxt-link to="/products">
              Shop
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/about">
              About
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link :to="{name: 'checkout'}">
              Check Out
              <v-badge color="primary" right>
                {{ savedCart }}
              </v-badge>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
import TheSideNavToggle from '@/components/Navigation/TheSideNavToggle'
export default {
  name: 'TheHeader',
  components: {
    TheSideNavToggle
  },
  props: {
    title: {
      type: String,
      default: 'Home Page'
    },
    isLinkReady: {
      type: Boolean,
      default: false
    },
    storeid: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      store: null,
      storeID: null,
      displayLink: false
    }
  },
  async fetch () {
  },
  computed: {
    savedCart () {
      return this.$store.getters.loadedCart.length
    },
    goBack () {
      return '/store/' + this.storeid
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
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  z-index: 100;
  box-sizing: border-box;
  padding: 0 20px;
}
.logo {
  margin: 0 10px;
  font-size: 1.3rem;
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
</style>
