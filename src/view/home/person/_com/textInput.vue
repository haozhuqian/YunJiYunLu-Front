<style scoped lang="scss">
@import '@/style/tool';

.textInput {
  width: 200px;
  height: 28px;
  flex: 0 1 auto;

  .input {
    width: auto;
    height: 100%;
    border-radius: 5px;

    @include flex(row, space-between);

    .name {
      width: 60px;
      height: 100%;
      text-align: center;
      color: var(--color-primary);
      background-color: var(--color-showy);
      border-radius: 4px 0 0 4px;
      font-weight: 500;
      line-height: 28px;
    }

    .name:hover {
      background-color: var(--color-medium);
    }

    input {
      padding: 8px;
      width: calc(100% - 60px);
      min-width: 60px;
      height: 100%;
      color: var(--color-showy);
      background-color: var(--color-primary);
      border: 0;
      border: var(--color-showy) solid 1px;
      border-radius: 0 4px 4px 0;
      outline: 0;
      flex: 1 1 auto;
      caret-color: var(--color-showy);
    }

    input:hover {
      border: var(--color-medium) solid 1px;
    }

    input::placeholder {
      color: var(--color-showy);
    }
  }

  .err {
    overflow: hidden;
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
    <div class="input">
      <div class="name">{{ props.name }}:</div>
      <input
        type="text"
        v-model="value"
        placeholder="不筛选"
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
const emit = defineEmits(['update']);
const value = ref('');
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
