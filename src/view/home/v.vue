<style lang="scss" scoped>
@import '@/style/tool';

.home {
  @include flex(column);

  width: 100%;
  height: 100%;
  flex-direction: column;

  .head {
    @include flex(row, space-between);

    width: 100%;
    height: 40px;
    background-color: var(--color-primary);
    border-bottom: var(--color-showy) 2px solid;

    .button {
      padding: 0 10px;
      height: 40px;
      font-size: 14px;
      background-color: transparent;
      border: 0;
      font-weight: 600;
    }

    .time {
      padding: 0 10px;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      font-weight: 900;
    }

    // img {
    //   padding: 4px;
    //   width: 40px;
    //   height: 40px;
    //   border-right: 2px var(--color-least) solid;
    //   border-left: 2px var(--color-least) solid;
    // }
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
      background-color: var(--color-primary);
      border-right: 2px var(--color-showy) solid;
      transition: left 0.5s ease-in-out;
      flex-direction: column;

      a {
        overflow: hidden;
        height: 32px;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        text-decoration: none;
        color: var(--color-primary);
        border-bottom: 2px var(--color-primary) solid;
        background: var(--color-medium);
        line-height: 32px;
      }

      a:hover {
        color: var(--color-least);
        background: var(--color-minor);
      }

      .selected {
        color: var(--color-primary);
        background: var(--color-showy);
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

    .home-content {
      position: relative;
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
      <cTheme></cTheme>
      <button v-if="isNarrow" @click="isOpen = !isOpen" class="button">
        菜单
      </button>
      <div class="time">{{ nowTime }}</div>
      <!-- <img class="logo" :src="logo" alt="云顶书院" /> -->
      <button @click="goOut" class="button">退出</button>
    </div>
    <div class="main" :class="{ narrowMain: isNarrow }">
      <nav
        :class="{ narrowNav: isNarrow, openNav: isOpen && isNarrow }"
        @click="isOpen = false"
      >
        <router-link
          :to="{ name: nav.path }"
          v-for="nav in navs"
          :key="nav.path"
          active-class="selected"
          >{{ nav.name }}</router-link
        >
      </nav>
      <div class="home-content" @click="isOpen = false">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import logo from '@/assets/imgs/logo/云顶-黑.png';
import cTheme from '@/components/changeTheme.vue';
import useNowTime from '@/hooks/useNowTime';
import { role } from '@/types/route';
import { useUserStore } from '@/store/user';
import routes from '@/router/autoImport';
import { RouteRecordRaw } from 'vue-router';
import useSize from '@/hooks/useSize';

const nowTime = useNowTime();
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
const { width } = useSize();
watchEffect(() => {
  isNarrow.value = width.value < 1000;
});

//退出登录，初始化用户信息
const router = useRouter();
const goOut = () => {
  const user = useUserStore();
  user.$reset();
  router.push({ name: 'start' });
};
</script>
