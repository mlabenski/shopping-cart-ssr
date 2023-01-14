<template>
  <div>
    <v-system-bar window dark>
      <v-flex xs6>
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn text @click="handleContact">Contact shop</v-btn>
    </v-system-bar>
    <v-toolbar :class="{scrollDown: scrollPosition < 45, scrolled: scrollPosition > 45}">
        <v-layout row wrap>
          <v-flex xs6>
            <v-img :src="logo" class="logo"></v-img>
          </v-flex>
        <v-flex xs6>
          <v-toolbar-title><nuxt-link to="/">{{ title }}</nuxt-link></v-toolbar-title>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
      <v-flex xs6>
      </v-flex>
      <v-flex xs6>
        <v-spacer></v-spacer>
        <v-btn text @click="handleContact">Contact shop</v-btn>
        <v-btn text @click="$router.push('/checkout')">Checkout <v-badge color="primary" right>>{{ savedCart }}</v-badge></v-btn>
      </v-flex>
    </v-layout>
    </v-toolbar>
              <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
    </div>
</template>

<script>
import TheSideNavToggle from '@/components/Navigation/TheSideNavToggle'
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
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
    }
  },
  methods: {
    handleSearch() {
      console.log('This feature has not been implemented yet')
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    }
  }
}
</script>

<style scoped>
.header-container {
  height: 60px;
}
.scrollDown {
  width: 100%;
  position: fixed;
  height: 58px;
  background-color: transparent;
  z-index: 100;
}
.scrolled {
  width: 100%;
  position: fixed;
  top: 0px;
  border: 3px solid green;
  height: 38px;
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
  color: #fff;
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
}
</style>
