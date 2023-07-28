<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
}
</style>

<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts" setup>
import loginPanel from "./login/LoginPanel.vue";
</script>
