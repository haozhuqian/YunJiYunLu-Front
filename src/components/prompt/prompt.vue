<style lang="scss" scoped>
@import '@/style/tool';

.message-bg {
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: var(--color-purdah);

  @include flex(column, center, center);

  .message-box {
    width: clamp(300px, 45%, 600px);
    height: clamp(200px, 25%, 300px);
    background-color: var(--color-minor);
    border-radius: 6px;

    @include flex(column, space-around, center);

    .title {
      font-size: 20px;
      font-weight: 900;
    }

    .controller {
      width: clamp(200px, 80%, 600px);
      height: 36px;

      @include flex(row, space-around, center);

      button {
        width: clamp(50px, 30%, 200px);
        height: 100%;
        font-size: 16px;
        color: var(--color-primary);
        background-color: var(--color-showy);
        border: none;
        border-radius: 6px;
        transition: background-color 0.3s ease-in-out;
        cursor: pointer;

        &:hover {
          background-color: var(--color-minor);
        }
      }
    }
  }
}
</style>

<template>
  <div class="message-bg" @click.stop>
    <div class="message-box">
      <div class="title">{{ props.title }}</div>
      <text-input
        ref="inputRef"
        @update="(newValue) => (value = newValue)"
        :verifys="props.verifys"
      ></text-input>
      <div class="controller">
        <button
          @click="
            tryClose(() => {
              emits('close', value, true);
            })
          "
        >
          确定
        </button>
        <button @click="emits('close', '', false)">取消</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import textInput from './textInput.vue';
import message from '../message/index';
import { verifysType } from './_type';
// 配置外部传来的事件
const emits = defineEmits<{
  (e: 'close', message: string, isSure: boolean): void;
}>();
const inputRef = ref<InstanceType<typeof textInput>>();
let value = '';
const props = withDefaults(
  defineProps<{
    title: string;
    verifys?: verifysType[];
  }>(),
  {
    title: '提示',
    verifys: () => [],
  },
);
const tryClose = (Fn: () => void): void => {
  const verify = inputRef.value!.verifyValue()!;
  if (verify.reasult) {
    Fn();
  } else {
    message(verify.value);
  }
};
</script>
