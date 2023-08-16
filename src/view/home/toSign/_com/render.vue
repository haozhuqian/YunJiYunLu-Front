<style scoped lang="scss"></style>

<template>
  <div class="render">
    <input type="text" v-model="value" />
    <qrcode-vue
      :value="value"
      :level="level"
      :render-as="renderAs"
      :margin="1"
    />
  </div>
</template>

<script lang="ts" setup>
import QrcodeVue, { Level, RenderAs } from 'qrcode.vue';

const value = ref('qrcode');
const level = ref<Level>('M');
const renderAs = ref<RenderAs>('svg');
</script>
