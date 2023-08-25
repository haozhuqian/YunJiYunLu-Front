<style scoped lang="scss">
@import '@/style/tool';

.info-list {
  overflow: hidden;
  padding: 10px;
  margin: auto;
  width: 60%;
  height: 100%;
  font-size: 16px;

  @include flex(column, space-around, start);

  .info {
    margin-bottom: 20px;
    width: 100%;
    height: 8%;

    @include flex(row, space-between, center);

    label {
      text-align: right;
    }

    input {
      padding: 0 10px;
      width: 80%;
      font-size: 16px;
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

  .controler {
    width: 100%;

    @include flex(row, space-around, center);

    button {
      width: 30%;
      height: 24px;
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
      <input
        type="text"
        v-model="user.info[key]"
        :readonly="!isChangeing || Boolean(infoName[key]?.readonly)"
        :name="key"
      />
    </label>

    <div class="controler">
      <button @click="changeInfo">{{ isChangeing ? '确定' : '修改' }}</button>
      <button @click="unChangeInfo">取消</button>
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
  };
} = {
  name: { name: '姓名', readonly: true },
  email: { name: '邮箱' },
  phone: { name: '电话' },
  class: { name: '班级' },
  grade: { name: '期数', readonly: true },
  gender: { name: '性别' },
  major: { name: '专业' },
  number: { name: '学号', readonly: true },
  birthday: { name: '生日' },
  age: { name: '年龄' },
};
let oldInfo = {};
const isChangeing = ref(false);
const changeInfo = () => {
  isChangeing.value = !isChangeing.value;
  oldInfo = { ...user.info };
};
const unChangeInfo = () => {
  isChangeing.value = !isChangeing.value;
  user.$patch({
    info: oldInfo,
  });
};
</script>
