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

.outside {
  color: var(--color-least);
  background-color: var(--color-main);
}

.nothing {
  background-color: var(--color-primary);
}

.study {
  color: var(--color-main);
  background-color: var(--color-showy);
}

.checked {
  z-index: 1;
  outline: var(--color-least) solid 2px;
}

.leave {
  background-color: var(--color-minor);
}
</style>

<template>
  <div
    class="content"
    :class="{
      [time === times.now ? 'now' : status[props.state]]: true,
      checked: checked,
    }"
    :x="props.x"
    :y="props.y"
  >
    {{ props.name || statusNames[props.state] }}
  </div>
</template>

<script lang="ts" setup>
import { status, times, contentType } from '../_type/status';
const props = defineProps<contentType>();

const statusNames: { [key in status]: string } = {
  [status.leave]: '请假',
  [status.nothing]: '',
  [status.study]: '研学',
  [status.outside]: props.name,
};
</script>
