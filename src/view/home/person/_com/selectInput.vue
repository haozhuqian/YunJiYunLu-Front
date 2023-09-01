<style scoped lang="scss">
@import '@/style/tool';

.selectInput {
  width: 140px;
  height: 28px;

  .input {
    width: auto;
    height: 100%;
    border-radius: 5px;

    @include flex(row, space-between, center);

    input {
      padding: 8px;
      min-width: 0;
      height: 100%;
      color: var(--color-showy);
      background-color: var(--color-primary);
      border: 0;
      border: var(--color-main) solid 1px;
      border-radius: 4px 0 0 4px;
      outline: 0;
      flex: 1 1 auto;
      caret-color: var(--color-showy);
    }

    input::placeholder {
      color: var(--color-minor);
    }

    .optionButton {
      width: 28px;
      height: 28px;
      background-color: var(--color-main);
      border-radius: 0 4px 4px 0;

      .arrows {
        margin: 4px;
        width: 20px;
        height: 20px;
        transition: transform 0.3s ease-in-out;

        path {
          color: var(--color-showy);
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
    transition: height 0.3s ease-in-out;

    .option {
      text-align: center;
    }
  }

  .showOptions {
    height: v-bind('props.option.length*16+"px"');
  }
}
</style>

<template>
  <div class="selectInput">
    <div class="input" @click="showOption = !showOption">
      <input type="text" readonly v-model="value" />
      <div class="optionButton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          class="arrows"
          :class="{ topArrows: showOption }"
        >
          <path
            d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="options" :class="{ showOptions: showOption }">
      <div
        class="option"
        v-for="option in props.option"
        @click="
          value = option;
          showOption = false;
        "
        :key="option"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { selectInputPropsType } from '../_type/status';
const props = defineProps<selectInputPropsType>();
const value = ref(props.name);
const showOption = ref(false);
</script>
