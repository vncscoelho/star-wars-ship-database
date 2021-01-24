<template>
  <main>
    <h2>Starship Distance Calculator</h2>
    <input
      v-model="formattedDistance"
      type="text"
      minlength="10"
    >
    <button>GO</button>
  </main>
</template>

<script setup>
import { reactive, computed } from 'vue'

const data = reactive({
  targetDistance: 1000
});
const formattedDistance = computed({
  get() {
    return `${data.targetDistance} MGLT`;
  },
  set(value) {
    let newValue = value.match(/\d/g) || [];
    data.targetDistance = +newValue.join``;
  }
})
</script>

<style>

</style>