<style scoped lang="scss">
@import '@/style/tool';

.userInfoTable {
  position: relative;
  overflow: hidden;
  margin: 20px 0;
  width: 90%;
  min-width: 920px;
  height: 90%;
  border: var(--color-showy) 1px solid;
  border-radius: 4px;

  .userInfoNames {
    position: absolute;
    right: 0;
    left: 0;

    @include flex(row);

    border-bottom: var(--color-showy) 1px solid;
    background-color: var(--color-showy);

    .infoName,
    .controllerName {
      flex: 1 1 10%;
      line-height: 28px;
      text-align: center;
      color: var(--color-primary);
    }

    .infoName {
      border-right: var(--color-primary) 1px solid;
    }
  }

  .userInfoList {
    position: absolute;
    overflow-x: hidden;
    overflow-y: overlay;
    inset: 28px 0 0;

    .userInfos {
      @include flex(column, space-between);

      .baseInfo {
        @include flex(row, space-between);

        .userInfo,
        .controller {
          flex: 1 1 10%;
          line-height: 28px;
          text-align: center;
        }

        .userInfo {
          border-right: var(--color-showy) 1px solid;
          border-bottom: var(--color-showy) 1px solid;
        }

        .controller {
          @include flex(row, center, center);

          border-bottom: var(--color-showy) 1px solid;
        }
      }

      .detailsInfo {
        @include flex(row, start);

        display: none;
        background-color: var(--color-main);
        flex-wrap: wrap;

        .details {
          margin: 5px 0;
          width: 25%;
          height: 24px;
          text-align: center;
          transition: height 0.3s ease-in-out;

          @include flex(row, start);

          .name {
            padding: 0 5px;
            line-height: 24px;
            border-right: var(--color-least) 1px solid;
          }

          .info {
            padding: 0 5px;
            line-height: 24px;
          }
        }
      }

      .showDetailsInfo {
        display: flex;
        height: auto;
        border-bottom: var(--color-showy) 1px solid;
      }
    }
  }

  .userInfoList::-webkit-scrollbar {
    width: 0;
  }
}
</style>

<template>
  <div class="userInfoTable">
    <!-- 表头 -->
    <div class="userInfoNames">
      <div class="infoName" v-for="name in baseInfo" :key="name">
        {{ infoName[name] }}
      </div>
      <div class="controllerName">操作</div>
    </div>
    <!-- 内容 -->
    <div class="userInfoList">
      <div
        class="userInfos"
        v-for="(userInfo, index) in searchReasult"
        :key="index"
      >
        <!-- 基础信息 -->
        <div class="baseInfo">
          <div class="userInfo" v-for="name in baseInfo" :key="name">
            {{ userInfo[name] }}
          </div>
          <div class="controller">
            <button @click="showDetails(index)">
              {{ index === detailInfoIndex && isDetailShow ? '关闭' : '详情' }}
            </button>
            <button @click="deleteUser(index)">删除</button>
          </div>
        </div>
        <!-- 详细信息 -->
        <div
          class="detailsInfo"
          :class="{
            showDetailsInfo: index === detailInfoIndex && isDetailShow,
          }"
        >
          <div class="details" v-for="(name, key) in infoName" :key="name">
            <div class="name">{{ name }}:</div>
            <div class="info">{{ userInfo[key] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import searchReasult from '../_store/searchReasult';
import { infoName, baseInfo } from '../_store/infoName';

const showDetails = (index: number) => {
  detailInfoIndex.value = index;
  isDetailShow.value = !isDetailShow.value;
};

let deleteInfo = [];

//是否展示详情页
const isDetailShow: Ref<boolean> = ref(false);

//删除某人信息时将对应数据删除，并临时储存被删除的信息
const deleteUser = (index: number) => {
  const deletedItem = searchReasult.splice(index, 1);
  deleteInfo.push(deletedItem[0]);
};
//详细信息页展示的信息对象
const detailInfoIndex = ref(0);
</script>
