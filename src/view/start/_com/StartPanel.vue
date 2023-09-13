<style scoped lang="scss">
.login-panel {
  display: flex;
  width: calc(350px + 5%);
  flex-direction: column;

  .title {
    margin-bottom: 12px;
    font-size: 40px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-align: center;
    color: #fff;
    text-shadow: 2px 2px #005cb3;
    font-weight: 900;
  }

  .tabs {
    padding: 6px;
    padding-bottom: 0;
    background-color: rgba($color: #fff, $alpha: 80%);
    border-radius: 6px;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>

<template>
  <div class="login-panel">
    <h1 class="title">云冀云麓</h1>
    <div class="tabs">
      <el-tabs v-model="activeTab" class="el-tabs" stretch>
        <el-tab-pane label="login" name="login">
          <template #label>
            <div class="label">
              <el-icon size="16">
                <InfoFilled />
              </el-icon>
              <span>账号登录</span>
            </div>
          </template>
          <login ref="loginRef"></login>
        </el-tab-pane>
        <el-tab-pane label="register" name="register">
          <template #label>
            <div class="label">
              <el-icon size="16">
                <CirclePlusFilled />
              </el-icon>
              账号注册
            </div>
          </template>
          <register ref="registerRef"></register>
        </el-tab-pane>
        <el-tab-pane label="forget" name="forget">
          <template #label>
            <div class="label">
              <el-icon size="16">
                <QuestionFilled />
              </el-icon>
              忘记密码
            </div>
          </template>
          <forget ref="forgetRef"></forget>
        </el-tab-pane>
      </el-tabs>
    </div>
    <br /><el-button
      type="primary"
      class="login-btn"
      size="large"
      @click="makeSure"
      >确认</el-button
    >
    <br /><el-button
      type="primary"
      class="login-btn"
      size="large"
      @click="goHome(role.visitor)"
      >游客</el-button
    >
    <br /><el-button
      type="primary"
      class="login-btn"
      size="large"
      @click="goHome(role.Normal)"
      >学员</el-button
    >
    <br /><el-button
      type="primary"
      class="login-btn"
      size="large"
      @click="goHome(role.Admin)"
      >管理</el-button
    >
    <br /><el-button
      type="primary"
      class="login-btn"
      size="large"
      @click="goHome(role.Dapartment)"
      >部门</el-button
    >
    <br /><el-button
      type="primary"
      class="login-btn"
      size="large"
      @click="goHome(role.Total)"
      >总号</el-button
    >
    <br /><el-button
      type="primary"
      class="login-btn"
      size="large"
      @click="http.login.login('yd2022').then((res: any) => console.log(res))"
      >测试</el-button
    >
  </div>
</template>

<script setup lang="ts">
import login from './Login.vue';
import register from './Register.vue';
import forget from './Forget.vue';
import http from '@/service/http';
import { role } from '@/types/route';
import { useUserStore } from '@/store/user';

const loginRef = ref<InstanceType<typeof login>>();
const registerRef = ref<InstanceType<typeof register>>();
const forgetRef = ref<InstanceType<typeof forget>>();

enum tabNames {
  login = 'login',
  register = 'register',
  forget = 'forget',
}
const activeTab = ref(tabNames.login);

const makeSure = () => {
  if (activeTab.value === 'login') {
    loginRef.value?.loginAction();
  } else if (activeTab.value === 'register') {
    console.log(registerRef.value);
  } else {
    console.log(forgetRef.value);
  }
};
const router = useRouter();
const goHome = (goRole: role) => {
  const user = useUserStore();
  user.role = goRole;
  if (goRole !== role.visitor) {
    user.token = 'token';
  }
  router.push({ name: 'home' });
};
</script>
