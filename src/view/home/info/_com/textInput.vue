<style scoped lang="scss">
@import '@/style/tool';

.textInput {
  position: relative;
  flex-grow: 1;
  height: 28px;
  text-align: right;

  .text {
    width: 30%;
    min-width: 160px;
    max-width: 200px;
    height: 100%;
    font-size: 16px;
    text-align: right;
    background-color: transparent;
    border: 0;
    border-radius: 4px;
    outline: var(--color-showy) solid 1px;
    flex: 1 1 auto;
    caret-color: var(--color-showy);

    &:hover {
      border: var(--color-medium) solid 1px;
    }

    &:read-only {
      outline: 0;

      &:hover {
        border: 0;
      }
    }
  }

  .err {
    position: absolute;
    right: 0;
    overflow: hidden;
    width: 30%;
    min-width: 160px;
    max-width: 200px;
    height: 0;
    text-align: center;
    color: var(--color-showy);
    transition: height 0.3s ease-in-out;
  }

  .showErr {
    height: 18px;
    line-height: 16px;
    border: 1px solid var(--color-showy);
    border-radius: 0 0 4px 4px;
  }
}
</style>

<template>
  <div class="textInput">
    <input
      class="text"
      type="text"
      :readonly="!props.isChanged"
      v-model="value"
      placeholder="不筛选"
      @blur="verifyValue"
      @keyup.enter="verifyValue"
    />
    <div class="err" :class="{ showErr: reason }">{{ reason }}</div>
  </div>
</template>

<script lang="ts" setup>
import verifyString from '@/utils/verifyString';
import { textInputPropsType } from '../_type/comProps';
const props = defineProps<textInputPropsType>();
const emit = defineEmits(['update']);
const value = ref(props.default);
const reason = ref('');
const verifyValue = () => {
  const reasult = verifyString(value.value, props.verifys);
  if (reasult.reasult) {
    reason.value = '';
    emit('update', reasult.value);
  } else {
    reason.value = reasult.value;
  }
};
</script>
