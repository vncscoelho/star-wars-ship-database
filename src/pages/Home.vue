<template>
  <main class="home">
    <loading-indicator :show="state.isLoading" />
    <header class="home__header">
      <h2 class="home__title">
        Starship Distance Calculator
      </h2>
      <input
        v-model="formattedDistance"
        class="home__search"
        type="text"
        minlength="10"
      >
      <button
        class="home__submit"
        @click="handleCalculate"
      >
        Calculate
      </button>
    </header>
    <section class="home__grid">
      <starship-card
        v-for="(item, index) in state.starships"
        :key="`starship-${index}`"
        :data="item"
        :target-distance="state.targetDistance"
      />
    </section>
  </main>
</template>

<script setup>
import { reactive, computed, inject } from 'vue';
import StarshipCard from '../components/StarshipCard.vue';
import LoadingIndicator from '../components/LoadingIndicator.vue';

const swapi = inject('swapi');

const state = reactive({
  targetDistance: 1000,
  inputValue: 1000,
  starships: [],
  isLoading: true,
});

const formattedDistance = computed({
  get() {
    return `${state.inputValue} MGLT`;
  },
  set(value) {
    let newValue = value.match(/\d/g) || [];
    state.inputValue = +newValue.join``;
  }
});

const handleCalculate = () => {
  state.targetDistance = state.inputValue;
};

const getAllStarships = (page = 1) => swapi(`/starships/?page=${page}`)
  .then(async response => {
    const { results, next } = response.data;
    state.starships.push(...results);
    if (next) {
      await getAllStarships(++page);
    }
  }).finally(() => state.isLoading = false);

  getAllStarships();
</script>

<style lang="scss">
.home {
  &__header {
    position: sticky;
    top: 0;
    z-index: 2;
    padding: 2em;
    text-align: left;
    background: linear-gradient(to bottom, #fefefe 60%, transparent);

    h2 {
      color: #666;
      font-family: 'Black Ops One', 'Impact';
      font-size: 1em;
      font-weight: normal;
      font-style: italic;
      text-transform: uppercase;
    }
  }

  &__search {
    padding: .75em 1.5em;
    border: 0px;
    background-color: #fff;
    box-shadow: inset 0 0 .3em rgba(0,0,0,.1);
    border-top-left-radius: .5em;
    border-bottom-left-radius: .5em;
  }

  &__submit {
    padding: .75em 1.5em;
    border: 0;
    color: #FFF;
    text-transform: uppercase;
    background-color: orangered;
    border-bottom-right-radius: .5em;
    border-top-right-radius: .5em;
  }

  &__grid {
    padding: 2em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2em;
  }
}
</style>