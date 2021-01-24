<template>
  <div class="starship-card">
    <template v-if="data.name">
      <h3>
        {{ data.name }}
      </h3>
      <p>{{ data.MGLT }} MGLT/h</p>
      <p>supplies for {{ data.consumables }} ({{ consumableInHours }} hours)</p>
      <p>{{ mgltBeforeRestock }} MGLT before resupply</p>
      <strong>{{ stopsBeforeReachingTarget }} stops until {{ props.targetDistance }} MGLT is reached</strong>
    </template>
    <template v-else>
      ...
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

<style>

</style>