<style scoped lang="scss"></style>

<template>
  <div class="toExcel">
    <button @click="downloadExcel">导出查询结果</button>
  </div>
</template>

<script lang="ts" setup>
import * as ExcelJS from 'exceljs';
import searchReasult from '../_store/searchReasult';
import { userInfo } from '@/types/userInfo';
import { infoName } from '../_store/infoName';
import { Column } from 'exceljs';

const downloadExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = '云冀云麓';
  workbook.lastModifiedBy = '云冀云麓';
  const now = new Date();
  workbook.created = now;
  workbook.modified = now;
  workbook.lastPrinted = now;
  const sheet = workbook.addWorksheet('人员统计表');
  const tHead: Array<Partial<Column>> = [];
  for (const key of userInfo) {
    tHead.push({ header: infoName[key], key });
  }
  sheet.columns = tHead;
  sheet.addRows(searchReasult);
  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    // type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    type: 'application/vnd.ms-excel; charset=uft-8', // 前后端一定要统一utf-8编码，否则会是乱码
  });
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = '人员统计表.xlsx'; // 如果不加后缀。保存的文件就会异常或者乱码。一定要写文件后缀类型, 具体文件类型根据自己的业务需要
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
};
</script>
