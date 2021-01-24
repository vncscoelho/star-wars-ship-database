<template>
  <div class="starship-card">
    <template v-if="data.name">
      {{ data.name }}
    </template>
    <template v-else>
      ...
    </template>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({ 
  data: {
    type: Object,
    default: () => {}
  } 
});
</script>

<style>

</style>