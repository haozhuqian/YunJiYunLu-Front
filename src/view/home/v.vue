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
    border-bottom: 2px var(--color-least) solid;

    button {
      height: 40px;
      background-color: transparent;
      border: 0;
      border-right: 2px var(--color-least) solid;
      border-left: 2px var(--color-least) solid;
    }

    img {
      padding: 4px;
      width: 40px;
      height: 40px;
      border-right: 2px var(--color-least) solid;
      border-left: 2px var(--color-least) solid;
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
      background-color: var(--color-showy);
      transition: left 0.5s ease-in-out;
      flex-direction: column;

      a {
        overflow: hidden;
        height: 32px;
        font-size: 16px;
        text-align: center;
        text-decoration: none;
        color: var(--color-primary);
        border-bottom: 2px var(--color-primary) solid;
        line-height: 32px;
      }

      a:hover {
        background: var(--color-minor);
      }

      .selected {
        background: var(--color-main);
      }
    }

    .narrowNav {
      position: absolute;
      left: -200px;
      z-index: 100;
      width: 200px;
    }

    .openNav {
      left: 0;
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
      <button v-if="isNarrow" @click="isOpen = !isOpen">菜单</button>
      <button @click="changeTheme">主题</button>
      <!-- <img class="logo" :src="logo" alt="云顶书院" /> -->
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
      <div class="content" @click="isOpen = false">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import logo from '@/assets/imgs/logo/云顶-黑.png';
import { role } from '@/types/route';
import { useUserStore } from '@/store/user';
import debounce from '@/utils/debounce';
import routes from '@/router/autoImport';
import { RouteRecordRaw } from 'vue-router';

//根据有访问权限的路由加载菜单，
const home = (routes[0].children as RouteRecordRaw[]).find(
  (item) => item.name === 'home',
)?.children as RouteRecordRaw[];
const user = useUserStore();
const navs = home
  .filter((item) => user.accessable(item.meta?.role as role))
  .map((item) => ({ path: item.name, name: item.meta?.intro }));

//实现菜单在过窄的窗口中收起菜单，并出现展开菜单按钮
const isNarrow = ref(false);
const isOpen = ref(false);
isNarrow.value = window.innerWidth < 600 ? true : false;
const fitWidth = debounce(() => {
  isNarrow.value = window.innerWidth < 600 ? true : false;
}, 500);
addEventListener('resize', fitWidth);
onUnmounted(() => {
  window.removeEventListener('resize', fitWidth);
});

//退出登录，初始化用户信息
const router = useRouter();
const goOut = () => {
  const user = useUserStore();
  user.$reset();
  router.push({ name: 'start' });
};

//切换主题
const changeTheme = () => {
  document.body.className =
    document.body.className === 'night' ? 'day' : 'night';
};
</script>
