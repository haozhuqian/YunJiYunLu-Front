<style scoped lang="scss">
@import '@/style/tool';

.selectInput {
  flex-grow: 1;
  height: 28px;

  .input {
    width: auto;
    height: 100%;
    border-radius: 5px;

    @include flex(row, space-between, center);

    input {
      padding: 8px;
      max-width: 120px;
      height: 100%;
      text-align: right;
      color: var(--color-showy);
      background-color: var(--color-primary);
      border: 0;
      border: var(--color-showy) solid 1px;
      border-radius: 4px 0 0 4px;
      outline: 0;
      flex: 1 1 auto;
    }

    input::placeholder {
      color: var(--color-minor);
    }
  }

  .options {
    @include flex(column);

    position: relative;
    z-index: 1000;
    overflow: hidden;
    height: 0;
    background-color: var(--color-showy);
    border-radius: 4px;
    transition: height 0.3s ease-in-out;

    .option {
      height: 18px;
      text-align: center;
      color: var(--color-primary);
      line-height: 18px;
    }

    .option:hover {
      color: var(--color-primary);
      background-color: var(--color-showy);
    }
  }

  .showOptions {
    height: v-bind('(props.option.length+1) * 18 + "px"');
  }
}
</style>

<template>
  <div class="selectInput" tabindex="1" @blur="showOption = false">
    <div
      class="input"
      @click="showOption = props.isChanged ? !showOption : false"
    >
      <input type="text" readonly v-model="value" @blur="showOption = false" />
    </div>
    <div class="options" :class="{ showOptions: showOption }">
      <div class="option" @click="check(props.default)">不更改</div>
      <div
        class="option"
        v-for="option in props.option"
        @click="check(option)"
        :key="option"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { selectInputPropsType } from '../_type/comProps';
const props = defineProps<selectInputPropsType>();
const emit = defineEmits(['update']);

const value = ref(props.default);
const showOption = ref(false);
const check = (option: string) => {
  value.value = option;
  showOption.value = false;
  emit('update', option);
};
</script>
