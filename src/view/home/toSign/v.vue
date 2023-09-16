<style scoped lang="scss">
@import '@/style/tool';

.sign {
  width: 100%;
  height: 100%;

  @include flex(column, center, center);

  button {
    padding: 6px;
    margin: 0 5px;
    height: 48px;
    font-size: 24px;
    color: var(--color-primary);
    background-color: var(--color-showy);
    border: none;
    border-radius: 6px;
    transition: background-color 0.3s ease-in-out;
    line-height: 24px;
    cursor: pointer;

    &:hover {
      background-color: var(--color-minor);
    }
  }

  .qrcode {
    margin: 0 auto;
    width: 80vh;
    height: 80vh;
  }
}
</style>

<template>
  <div class="sign">
    <button v-if="!showQr" @click="showQr = true">
      非常规时间段签到签退请按此处
    </button>
    <qrcode-vue
      v-else
      class="qrcode"
      :value="value"
      :level="level"
      :render-as="renderAs"
      :margin="1"
      @click="showQr = false"
    />
  </div>
</template>

<script lang="ts" setup>
import QrcodeVue, { Level, RenderAs } from 'qrcode.vue';

const value = ref('qrcode');
const timeId = setInterval(() => {
  value.value = new Date().getTime().toString();
}, 1000);
const showQr = ref(true);
const level = ref<Level>('M');
const renderAs = ref<RenderAs>('svg');
onUnmounted(() => {
  clearInterval(timeId);
});
</script>
