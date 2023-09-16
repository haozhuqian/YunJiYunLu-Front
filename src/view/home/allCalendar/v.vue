<style scoped lang="scss">
@import '@/style/tool';

.all {
  width: 100%;
  height: 100%;

  @include flex();

  .table {
    width: 100%;
    height: 80%;

    @include flex();

    .column {
      flex: 1 1 0px;

      @include flex(column);
    }

    .firstColumn {
      flex: 0 0 150px;
    }
  }
}
</style>

<template>
  <div class="all">
    <!-- 用户对象表格 -->
    <div class="table" @click="check($event)">
      <div
        class="column"
        v-for="(column, x) in userTable"
        :key="x"
        :class="{ firstColumn: x === 0 }"
      >
        <content
          :name="row.name"
          :content="row.content"
          v-for="(row, y) in column"
          :key="y"
        ></content>
      </div>
    </div>
    <!-- 用户状态操作事件组 -->
    <div class="controller">
      <button
        @click="eventControllers[key]"
        v-for="(event, key) in eventName"
        :key="event"
      >
        {{ event }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
//导入用户信息组件
import content from './_com/content.vue';
//导入用于生成对应格式的表格数据的函数
import { table } from './_hooks/getTable';
import {
  checkedList, //导入选中用户列表 对象
  eventName, //导入用户状态操作名称 对象
  eventControllers, //导入用户状态操作事件 对象
} from './_hooks/userStatusControl';
const openColumn = ref(0); //当前打开的列
const userTable = computed(() =>
  openColumn.value !== 0
    ? table.filter(
        (_column, index) => index === 0 || index === openColumn.value,
      )
    : table,
);
//获取对应格式的表格数据
//选中用户的操作
const check = (e: MouseEvent) => {
  const Element = e.target as HTMLElement;
  if (Element.classList.contains('contentHead')) {
    const x = Number(Element.getAttribute('x'));
    const y = Number(Element.getAttribute('y'));
    console.log(openColumn.value);
    if (y === 0) {
      openColumn.value = x === openColumn.value ? 0 : x;
    }
    return;
  }
  //如果选中的不是用户对象，不做操作
  if (!Element.classList.contains('user')) {
    return;
  }
  const x = Number(Element.getAttribute('x'));
  const y = Number(Element.getAttribute('y'));
  const z = Number(Element.getAttribute('z'));
  //将对应的响应式用户对象加入对应选中用户列表
  table[x][y].content[z].value.isCheck = !table[x][y].content[z].value.isCheck;
  if (table[x][y].content[z].value.isCheck) {
    checkedList[table[x][y].content[z].value.status].add(
      table[x][y].content[z],
    );
  } else {
    checkedList[table[x][y].content[z].value.status].delete(
      table[x][y].content[z],
    );
  }
};
</script>
