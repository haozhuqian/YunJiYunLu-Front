<style scoped lang="scss"></style>

<template>
  <div class="searchBar">
    <button class="searchBtn" @click="console.log(searchCondition)">
      搜索
    </button>
    <component
      v-for="props in chouseInfo"
      :is="'option' in chouse[props] ? selectInput : textInput"
      :key="props"
      v-bind="chouse[props]"
      @update="(newValue: string) => (searchCondition[props] = newValue)"
    />
    <button
      class="exportBtn"
      @click="getExcel('搜索结果人员名单', userInfo, infoName, searchReasult)"
    >
      导出查询结果
    </button>
  </div>
</template>

<script lang="ts" setup>
import chouse from '../_store/chouse';
import { chouseInfo } from '../_store/infoName';
import searchReasult from '../_store/searchReasult';
import { userInfo } from '@/types/userInfo';
import { infoName } from '../_store/infoName';
import getExcel from '@/utils/getExcel';
import selectInput from './_com/selectInput.vue';
import textInput from './_com/textInput.vue';

const searchCondition = reactive(
  {} as { [key in (typeof chouseInfo)[number]]: string },
);
for (const key of chouseInfo) {
  searchCondition[key] = '';
}
</script>
