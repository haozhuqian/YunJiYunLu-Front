<style scoped lang="scss">
@import '@/style/tool';

.calendar {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 2px var(--color-least) solid;

  .table {
    margin-top: 10%;
    width: 100%;
    height: 80%;

    @include flex();

    .row {
      flex: 1 1 0px;

      @include flex(column);

      .course {
        overflow: hidden;
        margin: 2px;
        font-size: 12px;
        background-color: var(--color-main);
        border-radius: 10px;
        flex: 1 1 0px;
        font-weight: 900;

        @include flex(row, center, center);
      }
    }
  }

  .panel {
    position: absolute;
    bottom: -60%;
    width: 100%;
    height: 60%;
    background-color: var(--color-least);
    transition: bottom 0.5s ease-in-out;

    .close,
    .name {
      color: var(--color-main);
    }
  }

  .openP {
    bottom: 0;
  }
}
</style>

<template>
  <div class="calendar">
    <div class="table" @click="openPanel($event)">
      <div v-for="(day, dayIndex) in week" class="row" :key="dayIndex">
        <div v-for="(course, timeIndex) in day" class="course" :key="timeIndex">
          <content v-bind="course" :x="dayIndex" :y="timeIndex"></content>
        </div>
      </div>
    </div>

    <div class="panel" :class="{ openP: isOpenP }">
      <div class="close" @click="isOpenP = false">关闭</div>
      <div class="name">{{ ListName }}</div>
      <div
        class="name"
        v-for="thing in List"
        @click="thing.behavor"
        :key="thing.name"
      >
        {{ thing.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import content from './_com/content.vue';
import { states, statesType } from './_type/states';
import mockStates from './_utils/mockStates';

const days: string[] = ['八月', '一24', '二', '三', '四', '五', '六', '日'];
const classes: string[] = ['一', '二', '三', '四', '五', '六'];
const week = mockStates<statesType>(
  days,
  classes,
  states,
  'name',
  'state',
  states.nothing,
);

const menu: any = {
  nothing: {
    name: '空闲',
    slist: [
      {
        name: '请假',
        behavor: () => {
          from.value.state = states.leave;
          showList(states.leave);
        },
      },
      {
        name: '调整',
        behavor: () => {
          from.value.state = states.nothing;
          showList(states.nothing);
        },
      },
    ],
  },
  study: {
    name: '研学',
    slist: [
      {
        name: '请假',
        behavor: () => {
          from.value.state = states.leave;
          showList(states.leave);
        },
      },
      {
        name: '调整',
        behavor: () => {
          from.value.state = states.nothing;
          showList(states.nothing);
        },
      },
    ],
  },
  meeting: {
    name: '会议',
    slist: [
      {
        name: '请假',
        behavor: () => {
          from.value.state = states.leave;
          showList(states.leave);
        },
      },
    ],
  },
  leave: {
    name: '请假',
    slist: [
      {
        name: '取消',
        behavor: () => {
          from.value.state = states.leave;
          showList(states.leave);
        },
      },
    ],
  },
};
const from = ref<statesType>({});
// const to = ref<statesType>({})
const isOpenP = ref(false);
const openPanel = (e: MouseEvent) => {
  isOpenP.value = false;
  const Element = e.target as HTMLElement;
  if (!Element.classList.contains('content')) return;
  const x = Number(Element.getAttribute('x'));
  const y = Number(Element.getAttribute('y'));
  if (!(x * y)) return;
  from.value = week[x][y];
  showList(Number(Element.getAttribute('type')));
};

const ListName = ref('');
const List = reactive<any>([]);

const showList = (stateType: states) => {
  ListName.value = menu[states[stateType]].name;
  List.splice(0, List.length);
  List.push(...menu[states[stateType]].slist);

  isOpenP.value = true;
};
</script>
