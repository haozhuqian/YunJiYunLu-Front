<style scoped lang="scss">
@import '@/style/tool';

.contentHead,
.content {
  padding: 2px;
  width: 100%;
  height: 100%;
  border: 1px solid var(--color-main);
}

.contentHead {
  @include flex(row, center, center);
}

.leftHead {
  max-width: 150px;
}

.content {
  overflow-y: scroll;
  font-size: 8px;
  flex: auto;
  font-weight: 100;
  text-align: center;

  &::-webkit-scrollbar {
    width: 0;
  }

  .user {
    display: inline-block;
    margin: 6px 2px;
    width: 20%;
    min-width: 50px;
    max-width: 100px;
    height: 26px;
    text-align: center;
    border-radius: 4px;
    line-height: 26px;
  }

  .unsign {
    background-color: var(--color-main);
  }

  .signIn {
    background-color: var(--color-minor);
  }

  .leave {
    color: var(--color-main);
    background-color: var(--color-showy);
  }

  .signOut {
    color: var(--color-primary);
    background-color: var(--color-least);
  }

  .checked {
    outline: 2px var(--color-least) solid;
  }
}
</style>

<template>
  <div
    v-if="name"
    class="contentHead"
    :class="{ leftHead: content[0].value.x === 0 }"
    :x="content[0].value.x"
    :y="content[0].value.y"
  >
    {{ name }}
  </div>
  <div v-else class="content">
    <div
      class="user"
      v-for="user in content"
      :class="{
        [status[user.value.status]]: true,
        checked: user.value.isCheck,
      }"
      :key="user.value.z"
      :x="user.value.x"
      :y="user.value.y"
      :z="user.value.z"
    >
      {{ user.value.name }}{{ user.value.status }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { status, contentType } from '../_type/status';

defineProps<{
  name: string;
  content: Ref<contentType>[];
}>();
</script>
