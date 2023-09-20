<style lang="scss" scoped>
@import '@/style/tool';

.message-bg {
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: var(--color-purdah);

  @include flex(column, center, center);

  .message-box {
    padding: 6px 20px;
    background-color: var(--color-minor);
    border-radius: 6px;

    @include flex(column, center, center);

    .title {
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>

<template>
  <div class="message-bg" @click.stop="emits('close')">
    <div class="message-box">
      <div class="title" v-html="props.title"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits<{
  (e: 'close'): void;
}>();
const props = withDefaults(
  defineProps<{
    title: string;
  }>(),
  {
    title: '提示',
  },
);
</script>
