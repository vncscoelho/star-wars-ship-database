<template>
  <div class="starship-card">
    <template v-if="data.name">
      <h3 class="starship-card__title">
        {{ data.name }}
      </h3>
      <ul class="starship-card__features">
        <li
          class="starship-card__item starship-card__item--main"
          :class="{ 
            'starship-card__item--animating': state.animate,
            'starship-card__item--no-mglt-info': !defaultedMglt
          }"
        >
          <span class="starship-card__label">Stops until {{ props.targetDistance }} MGLT</span>
          <span
            v-if="defaultedMglt"
            class="starship-card__data"
          >{{ stopsBeforeReachingTarget }} stops</span>
          <span v-else>-</span>
        </li>
        <li class="starship-card__item">
          <span class="starship-card__label">Speed</span>
          <span
            v-if="defaultedMglt"
            class="starship-card__data"
          >{{ defaultedMglt }} MGLT/h</span>
          <span v-else>-</span>
        </li>
        <li class="starship-card__item">
          <span class="starship-card__label">Supplies for</span>
          <span
            v-if="defaultedConsumables"
            class="starship-card__data"
          >{{ defaultedConsumables }}</span>
          <span v-else>-</span>
        </li>
        <li class="starship-card__item">
          <span class="starship-card__label">MGLT before resupply</span>
          <span
            v-if="defaultedMglt"
            class="starship-card__data"
          >{{ mgltBeforeRestock }} MGLT</span>
          <span v-else>-</span>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup>
import { defineProps, computed, watch, reactive } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({ 
  data: {
    type: Object,
    default: () => {}
  },
  targetDistance: {
    type: Number,
    default: null
  }
});

let state = reactive({
  animate: false,
});

const defaultedMglt = computed(() => {
  if (props.data.MGLT === 'unknown') {
    return null;
  }

  return props.data.MGLT;
});

const defaultedConsumables = computed(() => {
  if (props.data.consumables === 'unknown') {
    return null;
  }

  return props.data.consumables;
});

const consumableInHours = computed(() => {
  const [time, unit] = props.data.consumables.split` `;
  const dateForward = dayjs().add(time, unit);
  const dateNow = dayjs();

  if (!defaultedConsumables.value) {
    return null;    
  }

  // Milliseconds -> Seconds -> Minutes -> Hours
  return Math.floor(((dateForward.diff(dateNow) / 1000) / 60) / 60);
});

const mgltBeforeRestock = computed(() => {
  if (!defaultedMglt.value) {
    return null;
  }
  return Math.floor(consumableInHours.value / defaultedMglt.value);
});

const stopsBeforeReachingTarget = computed(() => {
  return Math.floor(props.targetDistance / mgltBeforeRestock.value);
});

const changeTargetDistance = watch(props, () => {
  state.animate = true;
  setTimeout(() => {
    state.animate = false;
  }, 1000);
});

</script>

<style lang="scss">
.starship-card {
 padding: 1em;
 background: #fdfdfd;
 border-radius: .5em;
 box-shadow: 0 0 1em rgba(0,0,0,.1);
 transform: skewY(-2deg);

  &__title {
    color: orangered;
    font-weight: normal;
    font-family: 'Black Ops One';
    font-size: 2em;
    line-height: 1;
    text-transform: uppercase;
    text-align: center;
  }

  &__label {
    display: block;
    font-size: .7em;
    text-transform: uppercase;
  }

  &__data {
    display: block;
    font-weight: bold;
  }

  &__features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    list-style: none;
  }

  &__item {
    color: #666;

    &:first-of-type, &:last-of-type {
      grid-column: span 2;
    }

    &--main {
      padding: 1em;
      color: #333;
      background: linear-gradient(to left, #ffbba2, #FFF);
      border-radius: 1em;
      transform: translateX(-5%);

      span {
        font-weight: bold;
      }
    }

      &--animating {
      @keyframes scale {
        0% {
          transform: translateX(-20px);
        }
        25% {
          transform: translateX(10px);
        }
        50% {
          transform: translateX(-10px);
        }
        100% {
          transform: translateX(-5%);
        }
      }
      animation: scale .3s ease-in-out;
    }

    &--no-mglt-info {
      background: linear-gradient(to left, #eee, #FFF);
    }
  }
}
</style>