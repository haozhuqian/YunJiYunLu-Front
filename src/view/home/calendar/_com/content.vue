<style scoped lang="scss">
@import '@/style/tool';

.content {
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: var(--color-least);
  background-color: var(--color-main);
  border: 4px solid var(--color-primary);
  border-radius: 10px;
  flex: 1 1 0px;
  font-weight: 900;

  @include flex(row, center, center);
}

.now {
  color: var(--color-primary);
  background-color: var(--color-least);
}

.nothing {
  background-color: var(--color-primary);
}

.study {
  color: var(--color-main);
  background-color: var(--color-showy);
}

.leave {
  background-color: var(--color-minor);
}
</style>

<template>
  <div
    class="content"
    :class="{
      [states[props.state] ?? '']: time !== times.now,
      now: time === times.now,
    }"
    :type="props.state"
    :time="props.time"
  >
    {{ props.name || (props.state === -1 ? '' : names[props.state]) }}
  </div>
</template>

<script lang="ts" setup>
import { states, times } from '../_type/states';

const props = withDefaults(
  defineProps<{
    time?: times;
    state?: states | -1;
    name?: string;
  }>(),
  {
    time: times.future,
    state: -1,
  },
);

const names = ['请假', '', '研学'];
</script>
