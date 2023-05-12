<script setup lang="ts">

</script>

<template>
  <div class="loading-wrap">
    <div class="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-wrap {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 3000;
  background-color: rgba(#fff, 0.6);
  transition: all 0.3s ease-in-out;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  .dot {
    position: absolute;
    width: 38px;
    height: 38px;
    opacity: 0;
    transform: rotate(225deg);
    animation-iteration-count: infinite;
    animation-name: orbit;
    animation-duration: 6s;

    &:after {
      content: '';
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 5px;
      background: rgba(0, 153, 255, 1);
      box-shadow: 0 0 9px rgba(255, 255, 255, .7);
    }

    &:nth-child(2) {
      animation-delay: 240ms;
    }

    &:nth-child(3) {
      animation-delay: 480ms;
    }

    &:nth-child(4) {
      animation-delay: 720ms;
    }

    &:nth-child(5) {
      animation-delay: 960ms;
    }

    &:nth-child(6) {
      animation-delay: 1200ms;
    }

  }
}

@keyframes orbit {
  0% {
    transform: rotate(225deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }

  7% {
    transform: rotate(345deg);
    animation-timing-function: linear;
  }

  30% {
    transform: rotate(455deg);
    animation-timing-function: ease-in-out;
  }

  39% {
    transform: rotate(690deg);
    animation-timing-function: linear;
  }

  70% {
    transform: rotate(815deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }

  75% {
    transform: rotate(945deg);
    animation-timing-function: ease-out;
  }

  76% {
    transform: rotate(945deg);
    opacity: 0;
  }

  100% {
    transform: rotate(945deg);
    opacity: 0;
  }
}
</style>
