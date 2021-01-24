<template>
  <div class="starship-card">
    <template v-if="data.name">
      <h3 class="starship-card__title">
        {{ data.name }}
      </h3>
      <ul class="starship-card__features">
        <li>
          <span class="starship-card__label">Stops until target</span>
          <span class="starship-card__data">{{ stopsBeforeReachingTarget }} stops</span>
        </li>
        <li>
          <span class="starship-card__label">Speed</span>
          <span class="starship-card__data">{{ data.MGLT }} MGLT/h</span>
        </li>
        <li>
          <span class="starship-card__label">Supplies for</span>
          <span class="starship-card__data">{{ data.consumables }}</span>
        </li>
        <li>
          <span class="starship-card__label">MGLT before resupply</span>
          <span class="starship-card__data">{{ mgltBeforeRestock }} MGLT</span>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
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

const consumableInHours = computed(() => {
  const [time, unit] = props.data.consumables.split` `;
  const dateForward = dayjs().add(time, unit);
  const dateNow = dayjs();
  // Milliseconds -> Seconds -> Minutes -> Hours
  return Math.floor(((dateForward.diff(dateNow) / 1000) / 60) / 60);
});

const mgltBeforeRestock = computed(() => {
  return Math.floor(consumableInHours.value / props.data.MGLT);
});

const stopsBeforeReachingTarget = computed(() => {
  return Math.floor(props.targetDistance / mgltBeforeRestock.value);
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

   li {
     color: #666;
   }

   li:first-of-type, li:last-of-type {
     grid-column: span 2;
   }

   li:first-of-type {
     padding: 1em;
     color: #333;
     background: linear-gradient(to left, #ffbba2, #FFF);
     border-radius: 1em;
     transform: translateX(-5%);

     span {
       font-weight: bold;
     }
   }
 }
}
</style>