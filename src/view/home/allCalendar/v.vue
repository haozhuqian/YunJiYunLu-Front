<style scoped lang="scss">
@import '@/style/tool';

.all {
  width: 100%;
  height: 100%;

  @include flex();

  .table {
    width: 100%;
    height: 80%;

    @include flex(column);

    .column {
      flex: 1 1 0px;

      @include flex();
    }
  }
}
</style>

<template>
  <div class="all">
    <div class="table" @click="check($event)">
      <div class="column" v-for="(column, x) in table" :key="x">
        <content
          :name="row.name"
          :content="row.content"
          v-for="(row, y) in column"
          :key="y"
        ></content>
      </div>
    </div>
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
import content from './_com/content.vue';
import { status, contentType } from './_type/status';
import getTable from './hooks/getTable';
import { checkedList, eventName, eventControllers } from './hooks/mockStates';
const table = getTable<contentType>({
  name: {
    row: ['java', 'ai', 'fullstack', 'cpu'],
    column: ['1', '2', '3', '1', '1'],
  },
  state: {
    enumObj: status,
  },
});

const check = (e: MouseEvent) => {
  const Element = e.target as HTMLElement;
  if (!Element.classList.contains('user')) {
    return;
  }
  const x = Number(Element.getAttribute('x'));
  const y = Number(Element.getAttribute('y'));
  if (!(x * y)) return;
  const z = Number(Element.getAttribute('z'));
  checkedList[table[x][y].content[z].value.status].push(table[x][y].content[z]);
};
</script>
