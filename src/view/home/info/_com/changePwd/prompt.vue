<style lang="scss" scoped>
@import '@/style/tool';

.message-bg {
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: var(--color-purdah);

  @include flex(column, center, center);

  .message-box {
    padding: 24px;
    width: clamp(300px, 45%, 600px);
    height: clamp(200px, 35%, 350px);
    background-color: var(--color-minor);
    border-radius: 6px;

    @include flex(column, space-around, center);

    .title {
      font-size: 20px;
      font-weight: 900;
    }

    .controller {
      margin-top: 24px;
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
        v-for="prop in props.verifys"
        @update="(newValue) => reasults.set(prop.realName, newValue)"
        v-bind="prop"
        :key="prop.realName"
      ></text-input>
      <div class="controller">
        <button @click="tryClose()">确定</button>
        <button @click="emits('close', {}, false)">取消</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import textInput from '@/components/textInput/textInput.vue';
import message from '@/components/message/index';
import { textInputPropsType } from '@/components/textInput/_type';
// 配置外部传来的事件
const emits = defineEmits<{
  (e: 'close', message: Record<string, string>, isSure: boolean): void;
}>();
let reasults = new Map<string, { reasult: boolean; value: string }>();
const props = withDefaults(
  defineProps<{
    title: string;
    verifys: (textInputPropsType & { realName: string })[];
  }>(),
  {
    title: '提示',
    verifys: () => [],
  },
);
const tryClose = (): void => {
  const value: Record<string, string> = {};
  for (const reasult of reasults) {
    if (!reasult[1].reasult) {
      message(reasult[1].value);
      return;
    } else {
      value[reasult[0]] = reasult[1].value;
    }
  }
  if (value.newPassword !== value.reNewPassword) {
    message('新密码两次输入不一致');
    return;
  }
  emits('close', value, true);
};
</script>
