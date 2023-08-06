<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: #a3dcff;
}
</style>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
<!--
<route lang="ts">
{
  meta: {
    role: ['common', 'admin'],
  },
  routes: [
    {
      path: '',
      redirect: 'start',
    },
  ],
}
</route> -->

<script setup></script>
