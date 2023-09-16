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

    .infoName {
      flex: 1 1 10%;
      line-height: 28px;
      text-align: center;
      color: var(--color-primary);
      border-right: var(--color-primary) 1px solid;

      &:last-of-type {
        border-right: 0;
      }
    }
  }

  .userInfoList {
    position: absolute;
    overflow-x: hidden;
    overflow-y: overlay;
    inset: 28px 0 0;

    .userInfos {
      @include flex(row, space-between);

      border-bottom: var(--color-showy) 1px solid;

      .userInfo {
        flex: 1 1 10%;
        line-height: 28px;
        text-align: center;
        border-right: var(--color-showy) 1px solid;

        &:last-of-type {
          border-right: 0;
        }
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
    </div>
    <!-- 内容 -->
    <div class="userInfoList">
      <div
        class="userInfos"
        v-for="(userInfo, index) in searchReasult"
        :key="index"
      >
        <!-- 基础信息 -->
        <div class="userInfo" v-for="name in baseInfo" :key="name">
          {{ userInfo[name] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import searchReasult from '../_store/searchReasult';
import { infoName, baseInfo } from '../_store/infoName';
</script>
