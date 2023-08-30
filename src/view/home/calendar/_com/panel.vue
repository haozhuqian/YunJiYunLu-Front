<style scoped lang="scss">
@import '@/style/tool';

.panelPC {
  position: fixed;
  top: v-bind(mouseY);
  left: v-bind(mouseX);
  z-index: 2;
  width: 10%;
  height: 150px;
  background-color: var(--color-least);
  border-radius: 5px;

  @include flex(column, space-around);

  .name {
    font-size: 12px;
    text-align: center;
    color: var(--color-main);
    font-weight: 600;
  }
}

.panelMobi {
  position: absolute;
  bottom: -60%;
  z-index: 2;
  width: 100%;
  height: 60%;
  background-color: var(--color-least);
  transition: bottom 0.5s ease-in-out;

  @include flex(column, space-around);

  .name {
    font-size: 14px;
    text-align: center;
    color: var(--color-main);
    font-weight: 600;
  }
}

.openP {
  bottom: 0%;
}

.rightSideTransition {
  left: calc(v-bind(mouseX) - 10%);
}
</style>

<template>
  <div
    v-if="isShowMenu"
    :class="{
      openP: isShowMenu,
      [width < 600 ? 'panelMobi' : 'panelPC']: true,
      rightSideTransition: x > width / 2 && !(width < 600),
    }"
  >
    <div class="name" v-for="thing in menu" @click="thing[1]" :key="thing[0]">
      {{ thing[0] }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import useSize from '@/hooks/useSize';
import useMouse from '@/hooks/useMouse';
import { isShowMenu, menu } from '../_hooks/useStatusControl';

const { width } = useSize();
const { x, y } = useMouse();
const mouseX = ref('0px');
const mouseY = ref('0px');
watchEffect(() => {
  mouseX.value = x.value + 'px';
});
watchEffect(() => {
  mouseY.value = y.value + 'px';
});
</script>
