<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="login">
    <start-panel></start-panel>
  </div>
</template>

<script lang="ts" setup>
import startPanel from './start/StartPanel.vue';
</script>
