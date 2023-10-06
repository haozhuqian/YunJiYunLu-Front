<style scoped lang="scss">
@import '@/style/tool';

.start {
  @include flex(column, center, center);

  margin: auto;
  width: 80%;
  max-width: calc(350px + 5%);
  height: 100%;

  .column {
    width: 0;
    height: 24px;
    border-left: 1px solid var(--color-least);
    border-right: 1px solid var(--color-least);
  }

  .tabs {
    padding: 24px;
    width: 100%;
    background-color: var(--color-minor);
    border: 2px solid var(--color-least);
    border-radius: 6px;

    @include flex(column, center, center);

    .title {
      font-size: 40px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      text-align: center;
      color: var(--color-primary);
      text-shadow: 2px 1px var(--color-least);
      font-weight: 900;
    }

    .login-btn {
      margin: 24px 0 0;
      width: 80%;
      height: 36px;
      font-size: 16px;
      background-color: var(--color-primary);
      border: 0;
      border-radius: 6px;
    }
  }
}
</style>

<template>
  <div class="start">
    <changeTheme></changeTheme>
    <div class="column"></div>
    <div class="tabs">
      <h1 class="title">云冀云麓</h1>

      <text-input
        v-for="(prop, key) in loginInputConfig"
        :key="prop.name"
        v-bind="prop"
        @update="
          (reasult) => {
            account[prop.realName[key]] = reasult;
          }
        "
      ></text-input>

      <button class="login-btn" @click="loginAction">登录</button>
      <button class="login-btn" @click="test">测试</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { role } from '@/types/route';
import changeTheme from '@/components/changeTheme.vue';
import { useUserStore } from '@/store/user';
import textInput from '@/components/textInput/textInput.vue';
import loginInputConfig from './_store/loginConfig';
import { login } from '@/service/http/modules/user';

const test = () => {};

test();

const router = useRouter();
const goHome = (goRole: role) => {
  const user = useUserStore();
  user.role = goRole;
  if (goRole !== role.visitor) {
    user.token = 'token';
  }
  router.push({ name: 'home' });
};

const account: { [key: string]: { reasult: boolean; value: string } } = {};
const loginAction = () => {
  console.log('account.i.value', account.i.value);
  console.log('account.a.value', account.a.value);
  //在这里发送请求
  login({
    // userIdOrPhone: account.i.value,
    // password: account.a.value,
    // userIdOrPhone: '2022006330',
    // password: 'yd2022006330',
    userIdOrPhone: 'yundingshuyuan',
    password: 'ydsyyyds',
  }).then((res) => {
    console.log(res.data, res.data.data.token);
    if (res.data.code == 4005) {
      alert(res.data.message);
    }
    const userIdentify = res.data.data.userDTO.userIdentity;
    const token = res.data.data.token;
    localStorage.setItem('token', token);
    navigateByUserIdentify(userIdentify);
  });
};

const routeStrategies = {
  0: () => goHome(role.Total),
  1: () => goHome(role.Department),
  2: () => goHome(role.Admin),
  3: () => goHome(role.Normal),
};

function navigateByUserIdentify(userIdentify: number) {
  const routeStrategy = routeStrategies[userIdentify];
  if (routeStrategy) {
    // 如果找到了匹配的策略，则执行它并传递 role 参数
    return routeStrategy(userIdentify);
  } else {
    // 如果没有匹配的策略，可以选择默认的跳转或者抛出错误
    throw new Error('Unsupported userIdentify');
  }
}
</script>
