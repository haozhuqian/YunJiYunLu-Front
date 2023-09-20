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

      <button class="login-btn" @click="loginAction">确认</button>
      <button class="login-btn" @click="goHome(role.Normal)">学员</button>
      <button class="login-btn" @click="goHome(role.Admin)">管理</button>
      <button class="login-btn" @click="goHome(role.Dapartment)">部门</button>
      <button class="login-btn" @click="goHome(role.Total)">总号</button>
      <!-- <button class="login-btn" @click="test">测试</button> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { role } from '@/types/route';
import changeTheme from '@/components/changeTheme.vue';
import { useUserStore } from '@/store/user';
import textInput from '@/components/textInput/textInput.vue';
import loginInputConfig from './_store/loginConfig';

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
  for (let reasult of loginInputConfig) {
    if (!account[reasult.realName].reasult) {
      console.log(account[reasult.realName].value);
      return;
    }
  }
  //在这里发送请求
};
</script>
