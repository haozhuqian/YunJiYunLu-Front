<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 2px black solid;

    button {
      height: 40px;
      background-color: transparent;
      border: 0;
      border-right: 2px black solid;
    }

    img {
      padding: 4px;
      width: 40px;
      height: 40px;
      border-left: 2px black solid;
    }
  }

  .main {
    flex-grow: 1;
    display: flex;

    nav {
      display: flex;
      justify-content: flex-start;
      overflow: hidden;
      width: 20%;
      max-width: 200px;
      height: 100%;
      background-color: #0c2158;
      transition: width 0.5s ease-in-out;
      flex-direction: column;

      a {
        height: 32px;
        font-size: 16px;
        text-align: center;
        text-decoration: none;
        color: white;
        border-bottom: 2px white solid;
        line-height: 32px;
      }
    }

    .narrowNav {
      position: absolute;
      width: 0;
    }

    .openNav {
      width: 200px;
    }

    .content {
      flex-grow: 1;
    }
  }

  .narrowMain {
    position: relative;
  }
}
</style>
<template>
  <div class="home">
    <div class="head">
      <button v-show="isNarrow" @click="openMenu">菜单</button>
      <img class="logo" :src="logo" alt="云顶书院" />
    </div>
    <div class="main" :class="{ narrowMain: isNarrow }">
      <nav :class="{ narrowNav: isNarrow, openNav: isOpen && isNarrow }">
        <router-link :to="{ name: 'sign' }">打卡</router-link>
        <router-link :to="{ name: 'info' }">个人信息</router-link>
        <router-link :to="{ name: 'calendar' }">日程</router-link>
      </nav>
      <div class="content"><router-view></router-view></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/imgs/logo/云顶-黑.png';
import debounce from '@/utils/debounce';

const isNarrow = ref(false);
const isOpen = ref(false);
isNarrow.value = window.innerWidth < 600 ? true : false;
const fitWidth = debounce(() => {
  const width = window.innerWidth;
  isNarrow.value = width < 600 ? true : false;
}, 500);
addEventListener('resize', fitWidth);
onUnmounted(() => {
  window.removeEventListener('resize', fitWidth);
});

const openMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>
