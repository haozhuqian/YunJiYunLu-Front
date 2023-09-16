<style scoped lang="scss">
@import '@/style/tool';

.person {
  @include flex(column, start, center);

  width: 100%;
  height: 100%;
  background-color: var(--color-primary);

  .searchBar {
    @include flex(row, space-between);

    z-index: 10;
    margin-top: 20px;
    width: 90%;
    min-width: 920px;

    button {
      height: 100%;
      color: var(--color-primary);
      background-color: var(--color-showy);
      border: none;
      border-radius: 6px;
      transition: background-color 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: var(--color-minor);
      }
    }
  }
}
</style>

<template>
  <div class="person">
    <div class="searchBar">
      <button @click="console.log(searchCondition)">搜索</button>
      <component
        v-for="props in chouse"
        :is="'option' in props[1] ? selectInput : textInput"
        :key="props[0]"
        v-bind="props[1]"
        @update="(newValue) => (searchCondition[props[0]] = newValue)"
      />
      <button
        @click="getExcel('搜索结果人员名单', userInfo, infoName, searchReasult)"
      >
        导出查询结果
      </button>
    </div>
    <!-- 信息展示 -->
    <user-info-table></user-info-table>
  </div>
</template>

<script lang="ts" setup>
import chouse from './_store/chouse';
import { chouseInfo } from './_store/infoName';
import userInfoTable from './_com/userInfoTable.vue';
import searchReasult from './_store/searchReasult';
import { userInfo } from '@/types/userInfo';
import { infoName } from './_store/infoName';
import getExcel from '@/utils/getExcel';
import selectInput from './_com/selectInput.vue';
import textInput from './_com/textInput.vue';

const searchCondition = reactive(
  {} as { [key in (typeof chouseInfo)[number]]: string },
);
for (const key of chouse) {
  searchCondition[key[0]] = '';
}
</script>
