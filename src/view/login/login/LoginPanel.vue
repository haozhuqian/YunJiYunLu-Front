<style scoped>
.login-panel {
  width: 350px;
}
.controls {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>

<template>
 <div class="login-panel">
  <h1 class="title">云冀云麓</h1>
  <div class="tabs"></div><br>
  <div class="controls">
    <el-checkbox v-model="isKeepPwd" label="记住密码"/>
    <el-link href="" type="primary">忘记密码</el-link>
  </div>
  <el-button type="primary" class="login-btn">登录</el-button>
 </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';


let isKeepPwd = ref(false)


</script>
