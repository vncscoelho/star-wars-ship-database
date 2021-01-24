<template>
  <main>
    <h2>Starship Distance Calculator</h2>
    <input
      v-model="formattedDistance"
      type="text"
      minlength="10"
    >
    <button>GO</button>
    <starship-card
      v-for="(item, index) in data.starships"
      :key="`starship-${index}`"
      :data="item"
      :target-distance="data.targetDistance"
    />
  </main>
</template>

<script setup>
import { reactive, computed, inject } from 'vue';
import StarshipCard from '../components/StarshipCard.vue';

const swapi = inject('swapi');

const data = reactive({
  targetDistance: 1000,
  starships: []
});

const formattedDistance = computed({
  get() {
    return `${data.targetDistance} MGLT`;
  },
  set(value) {
    let newValue = value.match(/\d/g) || [];
    data.targetDistance = +newValue.join``;
  }
});


const getAllStarships = (page = 1) => swapi(`/starships/?page=${page}`)
  .then(response => {
    const { results, next } = response.data;
    data.starships.push(...results);
    if (next) {
      getAllStarships(++page);
    }
  });

  getAllStarships();
</script>

<style>

</style>