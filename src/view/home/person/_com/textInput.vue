<style scoped lang="scss">
@import '@/style/tool';

.textInput {
  width: 200px;
  height: 28px;

  .input {
    width: auto;
    height: 100%;
    border-radius: 5px;

    @include flex(row, space-between);

    .name {
      width: 60px;
      height: 100%;
      text-align: center;
      color: var(--color-showy);
      background-color: var(--color-main);
      border-radius: 4px 0 0 4px;
      font-weight: 500;
      line-height: 28px;
    }

    .name:hover {
      background-color: var(--color-minor);
    }

    input {
      padding: 8px;
      min-width: 0;
      height: 100%;
      color: var(--color-showy);
      background-color: var(--color-primary);
      border: 0;
      border: var(--color-main) solid 1px;
      border-radius: 0 4px 4px 0;
      outline: 0;
      flex: 1 1 auto;
      caret-color: var(--color-showy);
    }

    input:hover {
      border: var(--color-minor) solid 1px;
    }

    input::placeholder {
      color: var(--color-minor);
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
import { textInputPropsType } from '../_type/status';
const props = defineProps<textInputPropsType>();
const value = ref('');
const reason = ref('');
const verifyValue = () => {
  for (let verify of props.verifys) {
    const verifyResult = verify(value.value);
    if (verifyResult.reasult) {
      reason.value = '';
      value.value = verifyResult.value;
    } else {
      reason.value = verifyResult.value;
      break;
    }
  }
};
</script>
