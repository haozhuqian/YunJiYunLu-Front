<style scoped lang="scss">
@import '@/style/tool';

.info-list {
  position: relative;
  top: 10%;
  overflow: hidden;
  padding: 10px;
  padding-right: 10%;
  margin: auto;
  width: 60%;
  // height: 60%;
  font-size: 16px;

  @include flex(column, space-around, start);

  .info {
    margin-bottom: 20px;
    width: 80%;
    height: 8%;

    @include flex(row, space-between, center);

    label {
      text-align: right;
    }

    input {
      padding: 0 10px;
      width: 80%;
      height: 1.5em;
      font-size: 18px;
      border: 0;
      border-radius: 5px;
      outline: none;
    }

    input:read-only {
      background: transparent;
      border: 0;
    }

    input:focus {
      border: 0;
    }
  }

  .avatar {
    position: absolute;
    top: 3%;
    right: 10%;
    width: 20%;
    height: 20%;

    img {
      border-radius: 50%;

      &:hover {
        transform: rotate(1024turn);
        transition: all 59s cubic-bezier(0.34, 0, 0.84, 1) 1s;
      }
    }
  }

  .controler {
    width: 100%;

    @include flex(row, space-around, center);

    button {
      width: 30%;
      height: 36px;
      font-size: 16px;
      color: var(--color-least);
      background-color: var(--color-main);
      border: 0;
      border-radius: 5px;
      outline: none;
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div class="info-list">
    <label class="info" v-for="(info, key) in user.info" :key="key">
      {{ infoName[key].name }}:
      <p v-if="false">{{ info }}</p>
      <input
        type="text"
        v-model="user.info[key]"
        :readonly="!isChangeing || Boolean(infoName[key]?.readonly)"
        :name="key"
      />
    </label>
    <div class="avatar">
      <img src="../../../assets/imgs/logo/avatar.jpg" alt="" />
    </div>
    <div class="controler">
      <!-- 正常状态下显示修改按钮，isChangeing为真时不显示修改按钮，显示确定与取消按钮 -->
      <button @click="isChangeing = !isChangeing" v-if="!isChangeing">
        修改
      </button>
      <button @click="changeInfo" v-if="isChangeing">确定</button>
      <button @click="unChangeInfo" v-if="isChangeing">取消</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
const user = reactive(useUserStore());
const infoName: {
  [key: string]: {
    name: string;
    readonly?: boolean;
    formatCheck?: boolean;
  };
} = {
  name: { name: '姓名', readonly: true },
  email: { name: '邮箱', formatCheck: true },
  phone: { name: '电话', formatCheck: true },
  class: { name: '班级' },
  grade: { name: '期数', readonly: true },
  direction: { name: '方向', readonly: true },
  gender: { name: '性别', formatCheck: true },
  major: { name: '专业' },
  number: { name: '学号', readonly: true, formatCheck: true },
  birthday: { name: '生日' },
  age: { name: '年龄', formatCheck: true },
};
let oldInfo = {};
const isChangeing = ref(false);
const changeInfo = () => {
  oldInfo = { ...user.info };
  formatCheck();
  isChangeing.value = !isChangeing.value;
};
const unChangeInfo = () => {
  isChangeing.value = !isChangeing.value;
  user.$patch({
    info: oldInfo,
  });
};
//格式检验函数
const formatCheck = () => {
  for (const key in user.info) {
    if (infoName[key].formatCheck) {
      const value = (user.info as any)[key];
      let isValid = false;
      let errorMessage = '';
      // 进行格式检验
      if (key === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
        errorMessage = '邮箱格式不正确';
      } else if (key === 'phone') {
        const phoneRegex = /^\d{11}$/;
        isValid = phoneRegex.test(value);
        errorMessage = '手机号格式不正确!';
      } else if (key === 'gender') {
        if (value != '男' && value != '女') {
          isValid = false;
          errorMessage = '请输入正确的性别!';
        }
      } else if (key === 'age') {
        if (value < 0 || value > 25) {
          isValid = false;
          errorMessage = '请输入正确的年龄!';
        }
      }
      if (!isValid && isChangeing.value == true) {
        // 格式不正确时进行处理
        (user.info as any)[key] = (oldInfo as any)[key]; // 恢复原始值
        if (errorMessage) {
          alert(errorMessage);
        } // 或者使用其他方式提示用户
      }
    }
  }
};
</script>
