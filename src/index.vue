<style scoped lang="scss">
.app {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
const media = window.matchMedia('(prefers-color-scheme:dark)');
document.body.className = media.matches ? 'night' : 'day';
let callback = (e: MediaQueryListEvent) => {
  document.body.className = e.matches ? 'night' : 'day';
};
media.addEventListener('change', callback);
onUnmounted(() => media.removeEventListener('change', callback));
</script>
