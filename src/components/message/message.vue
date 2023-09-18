<style lang="scss" scoped>
@import '@/style/tool';

.message-bg {
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: var(--color-purdah);

  @include flex(column, center, center);

  .message-box {
    width: clamp(100px, 15%, 600px);
    height: clamp(40px, 5%, 200px);
    background-color: var(--color-primary);
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
  <div class="message-bg" @click.stop>
    <div class="message-box">
      <div class="title">{{ props.title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title: string;
  }>(),
  {
    title: '提示',
  },
);
</script>
