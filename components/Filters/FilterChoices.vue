<template>
  <div>
    <label>{{ filterName }}</label>
    <select class="input">
      <option v-for="choice in choices" :key="choice" :value="choice">
        {{ choice }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FilterChoices',
  props: {
    filterName: {
      type: String,
      default: null
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
</style>
