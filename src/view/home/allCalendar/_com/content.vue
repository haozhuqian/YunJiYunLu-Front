<style scoped lang="scss">
@import url('@/style/tool');

.content {
  width: 100%;
  height: 100%;

  @include flex(row, center, center);
}

.now {
  border: 2px solid var(--color-least);
}

.nothing {
  background-color: var(--color-main);
}

.study {
  color: var(--color-main);
  background-color: var(--color-least);
}

.meeting {
  color: var(--color-primary);
  background-color: var(--color-showy);
}

.leave {
  background-color: var(--color-minor);
}
</style>

<template>
  <div class="content" :class="{ now: isNow, [props.state]: true }">
    {{ props.name ?? names[props.state] }}
  </div>
</template>

<script lang="ts" setup>
import { states } from './type';

const props = withDefaults(
  defineProps<{
    isNow?: boolean;
    state?: states;
    name?: string;
  }>(),
  {
    isNow: false,
    state: states.nothing,
  },
);

const names = {
  leave: '请假',
  nothing: '',
  study: '研学',
  meeting: '会议',
};
</script>
./type.js
