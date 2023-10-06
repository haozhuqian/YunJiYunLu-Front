<style scoped lang="scss">
@import '@/style/tool';

.contentHead,
.content {
  width: 100%;
  height: 20%;
  outline: 1px solid var(--color-showy);
}

.contentHead {
  font-size: 24px;
  text-align: center;

  @include flex(row, center, center);
}

.leftHead {
  max-width: 150px;
}

.content {
  overflow-y: scroll;
  padding: 2px;
  height: 0;
  font-size: 8px;
  text-align: center;
  flex: auto;
  font-weight: 100;

  &::-webkit-scrollbar {
    width: 0;
  }

  .user {
    display: inline-block;
    margin: 4px 2px;
    width: 30%;
    min-width: 50px;
    max-width: 150px;
    font-weight: 900;
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
      {{ user.value.name }}
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
