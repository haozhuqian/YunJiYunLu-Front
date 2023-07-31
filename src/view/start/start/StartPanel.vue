<style scoped lang="scss">
.login-panel {
  display: flex;
  width: 350px;
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
        <el-tab-pane label="login" name="login"><login></login></el-tab-pane>
        <el-tab-pane label="register" name="register"
          ><register></register
        ></el-tab-pane>
        <el-tab-pane label="forget" name="forget"
          ><forget></forget
        ></el-tab-pane>
      </el-tabs>
    </div>
    <br />
    <el-button type="primary" class="login-btn">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import forget from './Forget.vue';
import login from './Login.vue';
import register from './Register.vue';
enum tabNames {
  login = 'login',
  register = 'register',
  forget = 'forget',
}
const activeTab = ref(tabNames.login);
</script>
