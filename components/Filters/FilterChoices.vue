<template>
  <div>
    <span class="line" />
    <h6 class="nav-item">
      <a>{{ name }} </a><span class="btn-section"> - </span>
    </h6>
    <select v-if="index===0" v-model="filterObj.filter1" class="nav-item" style="background-color:red" @change="filterProducts">
      <option v-for="choice in choices" :key="choice" :value="choice" class="checkbox">
        {{ choice }}
      </option>
    </select>
    <select v-if="index===1" v-model="filterObj.filter2" class="nav-item" style="background-color:red" @change="filterProducts">
      <option v-for="choice in choices" :key="choice" :value="choice" class="checkbox">
        {{ choice }}
      </option>
    </select>
    <select v-if="index===2" v-model="filterObj.filter3" class="nav-item" style="background-color:red" @change="filterProducts">
      <option v-for="choice in choices" :key="choice" :value="choice" class="checkbox">
        {{ choice }}
      </option>
    </select>
  </div>
</template>

<script>
import filterObj from '~/utils/filterObj'

export default {
  name: 'FilterChoices',
  props: {
    name: {
      type: String,
      default: 'Hi'
    },
    choices: {
      type: Array,
      default: null
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      filterObj
    }
  },
  computed: {
  },
  methods: {
    filterProducts () {
      this.$store.dispatch('filterProducts', this.filterObj)
    },
    checkLog (log) {
      console.log(log)
    }
  }
}
</script>

<style scoped>
.nav-item {
  margin: 20px 0;
}

.nav-item a {
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
  text-transform: capitalize;
}
.text {
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
  text-transform: capitalize;
}

.nav-item a:hover,
.nav-item a:active {
  color: red;
}
.checkbox {
  text-transform: capitalize; }

.line {
  border-bottom: 1px solid #a5a5a5;
  font-size: 1px;
  display: block;
  height: 1px;
  margin-top: 30px; }
</style>
