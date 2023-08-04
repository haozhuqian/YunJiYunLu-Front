<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<template>
  <div class="login">
    <el-form
      ref="ElFormRef"
      :model="account"
      label-position="right"
      style="min-width: 90%"
      size="large"
      :rules="accountRules"
    >
      <el-form-item label="账号" prop="name">
        <el-input
          placeholder="账号由8~20位大小写字母或数字组成"
          clearable
          v-model="account.name"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="密码由8~20位大小写字母或数字组成"
          show-password
          v-model="account.password"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { type FormRules, type ElForm, ElMessage } from 'element-plus';

const ElFormRef = ref<typeof ElForm>();
const account = reactive({
  name: '',
  password: '',
});
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '账号是必选项！', trigger: ['blur'] },
    {
      pattern: /^[a-zA-Z0-9]{8,20}$/,
      message: '账号应当由8~20位大小写字母或数字组成',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    { required: true, message: '密码是必填项！', trigger: ['blur'] },
    {
      pattern: /^[a-zA-Z0-9]{8,20}$/,
      message: '密码应当由8~20位大小写字母或数字组成',
      trigger: ['blur', 'change'],
    },
  ],
});

const loginAction = () => {
  if (ElFormRef.value) {
    ElFormRef.value.validate((valid, failed) => {
      if (valid) {
        console.log('验证成功');
      } else {
        console.log(failed);
        ElMessage.error('账号或密码格式不正确');
      }
    });
  }
};

defineExpose({
  loginAction,
});
</script>
