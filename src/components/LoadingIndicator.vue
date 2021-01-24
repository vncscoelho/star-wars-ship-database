<template>
  <transition name="fade">
    <div
      v-if="props.show"
      class="loading-indicator"
    >
      <div class="loading-indicator__text">
        <span>LOADING___LOADING___</span>
        <span>LOADING___LOADING___</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  show: false
});
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loading-indicator {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: #eee;

  &__text {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    font-family: 'Black Ops One', 'Impact';
    font-size: 3em;
    color: orangered;
    max-width: 400px;
    overflow: hidden;

    @keyframes slide {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(100%);
      }
    }

    span {
      transform: translateX(0);
      position: relative;
      animation: slide 1000ms infinite;
    }

    &::before, &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      display: flex;
      height: 100%;
      width: 20px;
      background: linear-gradient(to right, #eee, transparent);
    }

    &::after {
      left: auto;
      right: -2px;
       background: linear-gradient(to left, #eee, transparent);
    }
  }
}
</style>