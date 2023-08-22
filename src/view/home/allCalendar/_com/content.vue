<style scoped lang="scss">
@import '@/style/tool';

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
  <div
    class="content"
    :class="{ now: isNow, [states[props.state]]: true }"
    :type="props.state"
  >
    {{ props.name ?? names[props.state] }}
  </div>
</template>

<script lang="ts" setup>
import { states } from '../_type/states';

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

const names = ['请假', '', '研学', '会议'];
</script>
./type.js ../_type/type ../_type/states
