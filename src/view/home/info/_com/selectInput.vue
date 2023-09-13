<style scoped lang="scss">
@import '@/style/tool';

.selectInput {
  position: relative;
  height: 28px;
  text-align: right;
  flex-grow: 1;

  .text {
    width: 30%;
    min-width: 160px;
    max-width: 200px;
    height: 100%;
    font-size: 16px;
    text-align: right;
    background-color: transparent;
    border-radius: 4px 0 0 4px;
    outline: 0;
    line-height: 16px;
    flex: 1 1 auto;

    &:read-only {
      border: 0;
      user-select: none;
    }
  }

  .selectText {
    &:read-only {
      border: var(--color-showy) solid 1px;
    }
  }

  .options {
    @include flex(column);

    position: absolute;
    right: 0;
    z-index: 1000;
    overflow: hidden;
    width: 30%;
    min-width: 160px;
    max-width: 200px;
    height: 100%;
    height: 0;
    background-color: var(--color-showy);
    border-radius: 4px;
    transition: height 0.3s ease-in-out;

    .option {
      height: 18px;
      line-height: 18px;
      text-align: center;
      color: var(--color-primary);

      &:hover {
        background-color: var(--color-medium);
      }
    }
  }

  .showOptions {
    height: v-bind('(props.option.length + 1) * 18 + "px"');
  }
}
</style>

<template>
  <div class="selectInput" tabindex="1" @blur="showOption = false">
    <input
      class="text"
      :class="{ selectText: props.isChanged }"
      type="text"
      readonly
      v-model="value"
      @blur="showOption = false"
      @click="showOption = props.isChanged ? !showOption : false"
    />
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
