<style scoped lang="scss">
@import '@/style/tool';

.textInput {
  margin: 24px 0 0;
  width: 100%;
  height: 36px;

  .input {
    width: auto;
    height: 100%;
    border-radius: 5px;

    @include flex(row, space-between);

    .name {
      width: 46px;
      height: 100%;
      font-size: 16px;
      text-align: right;
      background-color: var(--color-primary);
      border-radius: 4px 0 0 4px;
      font-weight: 400;
      line-height: 36px;
    }

    input {
      padding: 8px;
      width: calc(100% - 60px);
      min-width: 60px;
      height: 100%;
      font-size: 16px;
      background-color: var(--color-primary);
      border: 0;
      border-radius: 0 4px 4px 0;
      outline: 0;
      flex: 1 1 auto;
      caret-color: var(--color-showy);
    }

    &:hover {
      outline: var(--color-medium) solid 2px;
    }
  }

  .err {
    overflow: hidden;
    height: 0;
    text-align: center;
    color: var(--color-primary);
    background-color: var(--color-showy);
    border-radius: 0 0 4px 4px;
    transition: height 0.3s ease-in-out;
    line-height: 18px;
  }

  .showErr {
    height: 18px;
  }
}
</style>

<template>
  <div class="textInput">
    <div class="input">
      <div class="name">{{ props.name }}:</div>
      <input
        type="text"
        v-model="value"
        @blur="verifyValue"
        @keyup.enter="verifyValue"
      />
    </div>
    <div class="err" :class="{ showErr: reason }">{{ reason }}</div>
  </div>
</template>

<script lang="ts" setup>
import verifyString from '@/utils/verifyString';
import { textInputPropsType } from '../_type/comProps';
const props = defineProps<textInputPropsType>();
const emit = defineEmits<{
  (e: 'update', value: { reasult: boolean; value: string }): void;
}>();
emit('update', { reasult: false, value: '您尚未填写' });
const value = ref('');
const reason = ref('');
let reasult = { reasult: false, value: value.value };
const verifyValue = () => {
  reasult = verifyString(value.value, props.verifys);
  reason.value = reasult.reasult ? '' : reasult.value;
  emit('update', reasult);
};
</script>
