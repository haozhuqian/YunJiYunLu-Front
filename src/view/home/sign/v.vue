<style scoped lang="scss">
@import '@/style/tool';

.sign {
  @include flex(column, center, center);
}
</style>

<template>
  <div class="sign">
    <identify></identify>
  </div>
</template>

<script lang="ts" setup>
import identify from './_com/identify.vue';
</script>
