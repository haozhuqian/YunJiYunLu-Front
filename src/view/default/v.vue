<style scoped lang="scss">
@import '@/style/tool';

.default {
  width: 100%;
  height: 100%;

  @include flex(column, center, center);

  .content {
    font-size: 24px;
  }
}
</style>

<template>
  <div class="default">
    <div class="content">您的路径出错了<br />这儿什么都没有</div>
  </div>
</template>

<script lang="ts" setup></script>
