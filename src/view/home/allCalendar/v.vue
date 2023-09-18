<style scoped lang="scss">
@import '@/style/tool';

.all {
  height: 100%;

  @include flex(column, center, center);

  .table {
    overflow: hidden;
    width: 90%;
    height: 80%;
    border-radius: 6px;
    outline: 2px solid var(--color-showy);

    @include flex();

    .column {
      flex: 1 0 0px;

      @include flex(column);
    }

    .firstColumn {
      flex: 0 1 150px;
    }
  }

  .controller {
    overflow: hidden;
    margin-top: 24px;
    width: 90%;
    height: 26px;

    @include flex(row, space-between);

    .legengs {
      @include flex(row, space-around, center);

      .unsign,
      .signIn,
      .leave,
      .signOut {
        width: 100px;
        height: 100%;
        border-radius: 6px;
        font-weight: 900;

        @include flex(row, center, center);
      }

      .unsign {
        background-color: var(--color-main);
      }

      .signIn {
        background-color: var(--color-minor);
      }

      .leave {
        color: var(--color-main);
        background-color: var(--color-showy);
      }

      .signOut {
        color: var(--color-main);
        background-color: var(--color-least);
      }
    }

    .btns {
      .signIn,
      .signOut,
      .leave {
        width: 100px;
        border: none;
        border: 2px solid var(--color-least);
        border-radius: 6px;
        cursor: pointer;
        font-weight: 900;
      }

      .signIn {
        background-color: var(--color-main);
      }

      .leave {
        background-color: var(--color-main);
      }

      .signOut {
        background-color: var(--color-minor);
      }
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
      <div class="legengs">
        <div
          v-for="(state, key) in statusName"
          :key="state"
          :class="status[key]"
        >
          {{ state }}
        </div>
      </div>
      <div class="btns">
        <button
          @click="eventControllers[key]"
          v-for="(event, key) in eventName"
          :key="event"
          :class="eventType[key]"
        >
          {{ event }}
        </button>
      </div>
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
  statusName, //导入用户状态名称 对象
  eventName, //导入用户状态操作名称 对象
  eventControllers, //导入用户状态操作事件 对象
} from './_hooks/userStatusControl';
import { eventType, status } from './_type/status';
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
