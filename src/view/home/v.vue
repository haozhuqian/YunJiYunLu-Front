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
      border-left: 2px black solid;
    }

    img {
      padding: 4px;
      width: 40px;
      height: 40px;
      border-right: 2px black solid;
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

      a:hover {
        background: #115ba0;
      }

      .selected {
        background: #4c99d8;
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
      <button v-if="isNarrow" @click="openMenu">菜单</button>
      <img class="logo" :src="logo" alt="云顶书院" />
      <button @click="goOut">退出</button>
    </div>
    <div class="main" :class="{ narrowMain: isNarrow }">
      <nav :class="{ narrowNav: isNarrow, openNav: isOpen && isNarrow }">
        <router-link
          :to="{ name: nav.path }"
          v-for="nav in navs"
          :key="nav.path"
          active-class="selected"
          >{{ nav.name }}</router-link
        >
      </nav>
      <div class="content"><router-view></router-view></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/imgs/logo/云顶-黑.png';
import { role } from '@/router/type';
import { useUserStore } from '@/store/user';
import debounce from '@/utils/debounce';
import routes from '@/router/autoImport';
import { RouteRecordRaw } from 'vue-router';

const home = (routes[0].children as RouteRecordRaw[]).find(
  (item) => item.name === 'home',
)?.children as RouteRecordRaw[];
const user = useUserStore();
const navs = home
  .filter((item) => user.accessable(item.meta?.role as role))
  .map((item) => ({ path: item.name, name: item.meta?.intro }));

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

const router = useRouter();
const goOut = () => {
  const user = useUserStore();
  user.$reset();
  router.push({ name: 'start' });
};
</script>
