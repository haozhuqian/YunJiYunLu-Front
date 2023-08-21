<style scoped>
.root {
  background-color: var(--color-primary);
}
</style>

<template>
  <router-view class="root"></router-view>
</template>

<script lang="ts" setup>
import { useSetStore } from '@/store/setting';
import { theme } from '@/types/setting';

const setting = useSetStore();
if (setting.theme === theme.day) {
  document.body.className = 'day';
} else {
  document.body.className = 'night';
}
</script>
