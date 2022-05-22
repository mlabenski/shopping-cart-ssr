<template>
  <div>
    <span v-if="index===0" class="line" />
    <h6 class="nav-item">
      <a>{{ name }} </a><span class="btn-section"> - </span>
    </h6>
    <select v-if="index===0" v-model="filterValueColor" class="nav-item" style="background-color: aquamarine;" @change="handleStatusFilter('color', filterValueColor)">
      <option v-for="choice in choices" :key="choice" :value="choice" class="checkbox">
        {{ choice }}
      </option>
    </select>
    <select v-if="index===1" v-model="filterValueSize" class="nav-item" style="background-color: aquamarine;" @change="handleStatusFilter('size', filterValueSize)">
      <option v-for="choice in choices" :key="choice" :value="choice" class="checkbox">
        {{ choice }}
      </option>
    </select>
    <select v-if="index===2" v-model="filterValueGender" class="nav-item" style="background-color: aquamarine;" @change="handleStatusFilter('gender', filterValueGender)">
      <option v-for="choice in choices" :key="choice" :value="choice" class="checkbox">
        {{ choice }}
      </option>
    </select>
  </div>
</template>

<script>
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
      colors: ['', 'green', 'red'],
      sizes: ['', 'm', 'l'],
      genders: ['', 'm', 'w'],
      filterValueColor: '',
      filterValueGender: '',
      filterValueSize: ''
    }
  },
  methods: {
    handleStatusFilter (status, value) {
      this.$store.dispatch('filterStatus', { status, value })
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
