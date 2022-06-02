<template>
  <div>
    <span class="line" />
    <h6 class="nav-item">
      <a>{{ name }} </a><span class="btn-section"> - </span>
    </h6>
    <div v-for="choice in choices" :key="choice" :value="choice" class="checkbox">
      <label>
        <input type="checkbox"><span class="checkbox-material"><span class="check" /></span> {{ choice }}
      </label>
    </div>
  </div>
</template>
5
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
    }
  },
  computed: {
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
