<style scoped lang="scss">
@import '@/style/tool';

.info-list {
  position: absolute;
  inset: 10%;
  margin: auto;
  width: 60%;
  min-width: 300px;
  max-width: 500px;
  font-size: 16px;

  @include flex(column, space-around, center);

  .info {
    width: 100%;
    height: 28px;
    line-height: 28px;

    @include flex(row);
  }

  .avatar {
    position: absolute;
    top: 0%;
    right: 40%;
    width: 20%;
    height: 20%;

    img {
      border-radius: 50%;
      transition: transform 0.3s ease-in-out;

      &:hover {
        transform: rotate(1turn);
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
    <!-- 用户信息 -->
    <div class="info" v-for="infoName in userInfo" :key="infoName">
      <div class="name">{{ infoList[infoName].name }}:</div>
      <div class="readonly" v-if="'readonly' in infoList[infoName]">
        {{ user.info[infoName] }}
      </div>
      <component
        v-else
        :is="'option' in infoList[infoName] ? selectInput : textInput"
        v-bind="props[infoName]"
        :isChanged="isChangeing"
        @update="(newValue) => (newInfo[infoName] = newValue)"
      />
    </div>
    <!-- 头像 -->
    <div class="avatar">
      <img src="../../../assets/imgs/logo/avatar.jpg" alt="头像" />
    </div>
    <!-- 修改按钮 -->
    <div class="controler">
      <button @click="changeInfo">{{ isChangeing ? '确定' : '修改' }}</button>
      <button @click="unChangeInfo" v-if="isChangeing">取消</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userInfo } from '@/types/userInfo';
import { useUserStore } from '@/store/user';
import infoList from './_store/infoList';
import selectInput from './_com/selectInput.vue';
import textInput from './_com/textInput.vue';

const user = useUserStore();
const isChangeing = ref(false);
const props: any = {};
for (const info of userInfo) {
  props[info] = {};
  props[info].default = user.info[info];
  props[info].option = (infoList[info] as { option: string[] }).option;
  props[info].verifys = (
    infoList[info] as {
      verifys: ((value: string) => {
        reasult: boolean;
        value: string;
      })[];
    }
  ).verifys;
}
let oldInfo: any = {};
let newInfo: any = {};
//修改信息
const changeInfo = () => {
  isChangeing.value = !isChangeing.value;
  if (!isChangeing.value) {
    user.$patch({
      info: newInfo,
    });
  } else {
    oldInfo = { ...user.info };
  }
};
//取消修改
const unChangeInfo = () => {
  isChangeing.value = !isChangeing.value;
  user.$patch({
    info: oldInfo,
  });
};
</script>
