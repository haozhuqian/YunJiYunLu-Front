<style scoped lang="scss">
@import '@/style/tool';

.start {
  @include flex(column, center, center);

  margin: auto;
  width: calc(350px + 5%);
  height: 100%;

  .tabs {
    padding: 24px;
    margin: 24px 0 0;
    width: 100%;
    background-color: var(--color-minor);
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
    <div class="tabs">
      <h1 class="title">云冀云麓</h1>

      <text-input
        v-for="(prop, key) in loginInputConfig"
        :key="prop.name"
        v-bind="prop"
        @update="
          (reasult) => {
            account[realName[key]] = reasult;
          }
        "
      ></text-input>

      <button class="login-btn" @click="loginAction">确认</button>
      <button class="login-btn" @click="goHome(role.visitor)">游客</button>
      <button class="login-btn" @click="goHome(role.Normal)">学员</button>
      <button class="login-btn" @click="goHome(role.Admin)">管理</button>
      <button class="login-btn" @click="goHome(role.Dapartment)">部门</button>
      <button class="login-btn" @click="goHome(role.Total)">总号</button>
      <button class="login-btn" @click="test">测试</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import http from '@/service/http';
import showMessageBox from '@/components/prompt';
import { role } from '@/types/route';
import { textInputPropsType } from './_type/comProps';
import changeTheme from '@/components/changeTheme.vue';
import { useUserStore } from '@/store/user';
import textInput from './_com/textInput.vue';
const test = () => {
  showMessageBox({
    title: '随便什么文本',
  })
    ?.then((value) => {
      console.log(value);
    })
    .catch((err) => {
      console.log(err);
    });
};

const loginInputConfig: textInputPropsType[] = [
  {
    name: '账号',
    verifys: [
      (value: string) =>
        value
          ? { reasult: true, value }
          : { reasult: false, value: '账号不能为空' },
    ],
  },
  {
    name: '密码',
    verifys: [
      (value: string) =>
        value
          ? { reasult: true, value }
          : { reasult: false, value: '密码不能为空' },
    ],
  },
];
const realName = ['id', 'password'];
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
  for (let reasult of realName) {
    if (!account[reasult].reasult) {
      console.log(account[reasult].value);
      return;
    }
  }
  //在这里发送请求
};
</script>
