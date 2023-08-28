<style scoped lang="scss">
@import '@/style/tool';

.content {
  display: grid;
  overflow: hidden;
  width: 100%;
  height: 100%;
  font-size: 8px;
  color: var(--color-least);
  background-color: var(--color-primary);
  border: 1px solid var(--color-main);
  flex: auto;
  font-weight: 100;
  grid-template-columns: 1fr 1fr 1fr;

  .user {
    height: 26px;
    text-align: center;
    border-radius: 4px;
    line-height: 26px;
  }

  .unsign {
    color: var(--color-primary);
    background-color: var(--color-main);
  }

  .signIn {
    background-color: var(--color-main);
  }

  .leave {
    color: var(--color-main);
    background-color: var(--color-showy);
  }

  .signOut {
    background-color: var(--color-minor);
  }
}
</style>

<template>
  <div class="content">
    <div v-if="name">{{ props.name }}</div>
    <div
      v-else
      class="user"
      :class="[status[user.status]]"
      v-for="user in props.content"
      :key="user.z"
      :x="user.x"
      :y="user.y"
      :z="user.z"
    >
      {{ user.name }}{{ user.status }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { status, contentType } from '../_type/status';

const props = defineProps<{
  name: string;
  content: contentType[];
}>();
</script>
