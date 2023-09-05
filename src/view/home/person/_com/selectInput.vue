<style scoped lang="scss">
@import '@/style/tool';

.selectInput {
  max-width: 140px;
  height: 28px;
  flex: 0 1 auto;

  .input {
    width: auto;
    height: 100%;
    border-radius: 5px;

    @include flex(row, space-between, center);

    input {
      padding: 8px;
      width: calc(100% - 28px);
      min-width: 40px;
      height: 100%;
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

    .optionButton {
      width: 28px;
      height: 28px;
      background-color: var(--color-showy);
      border-radius: 0 4px 4px 0;

      .arrows {
        margin: 4px;
        width: 20px;
        height: 20px;
        transition: transform 0.3s ease-in-out;

        path {
          stroke: var(--color-main);
          color: var(--color-main);
          stroke-width: 20px;
        }
      }

      .topArrows {
        transform: rotate(180deg);
      }
    }
  }

  .options {
    @include flex(column);

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
    <div class="input" @click="showOption = !showOption">
      <input type="text" readonly v-model="value" @blur="showOption = false" />
      <div class="optionButton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          class="arrows"
          :class="{ topArrows: showOption }"
        >
          <path
            fill="currentColor"
            d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="options" :class="{ showOptions: showOption }">
      <div class="option" @click="check(props.name)">不筛选</div>
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

const value = ref(props.name);
const showOption = ref(false);
const check = (option: string) => {
  value.value = option;
  showOption.value = false;
  emit('update', option);
};
</script>
