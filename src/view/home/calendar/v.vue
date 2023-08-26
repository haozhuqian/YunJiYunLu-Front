<style scoped lang="scss">
@import '@/style/tool';

.calendar {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);

  .table {
    margin-top: 5%;
    width: 100%;
    height: 80%;

    @include flex();

    .row {
      flex: 1 1 0px;

      @include flex(column);
    }
  }

  .panelPC {
    position: fixed;
    top: v-bind(contextMenuTop);
    left: v-bind(contextMenuLeft);
    width: 10%;
    height: 20%;
    background-color: var(--color-least);
    border-radius: 5%;
    transition: bottom 0.5s ease-in-out;

    @include flex(column, start, center);

    .close,
    .name {
      margin: 4px;
      font-size: 14px;
      color: var(--color-main);
      font-weight: 600;
    }
  }

  .panelMobi {
    position: absolute;
    bottom: -60%;
    width: 100%;
    height: 60%;
    background-color: var(--color-least);
    transition: bottom 0.5s ease-in-out;

    @include flex(column, start, center);

    .close,
    .name {
      margin: 4px;
      font-size: 14px;
      color: var(--color-main);
      font-weight: 600;
    }
  }

  .openP {
    bottom: 0;
  }

  .rightSideTransition {
    transform: translateX(-100%);
  }
}
</style>

<template>
  <div class="calendar">
    <div class="table">
      <!-- 添加@contextmenu.prevent禁用右键点击事件 -->
      <div
        v-for="(day, dayIndex) in week"
        class="row"
        :key="dayIndex"
        @contextmenu.prevent
        @mousedown="openContextMenu($event)"
      >
        <content
          v-for="(course, timeIndex) in day"
          :key="timeIndex"
          v-bind="course"
        >
        </content>
      </div>
    </div>

    <!-- 添加@contextmenu.prevent禁用右键点击事件 -->
    <div
      :class="{
        openP: isOpenP,
        panelPC: isPC,
        panelMobi: !isPC,
        rightSideTransition: isRightSide,
      }"
      @contextmenu.prevent
    >
      <div class="close" @click="unShowContextMenu">关闭</div>
      <div class="name">{{ ListName + ' ' + timeWord[select.time] }}</div>
      <div class="name">{{ row[select.x] + ' ' + column[select.y - 1] }}</div>
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
import { states, times, statesType } from './_type/states';
import mockStates from './_utils/mockStates';

//日程表第一行的内容
const row = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
//日程表第一列的内容
const column = [
  '8:00-10:00',
  '10:00-12:00',
  '14:00-16:00',
  '16:00-18:00',
  '18:00-20:00',
  '20:00-22:00',
];
//不同时间段的提示词
const timeWord = ['已结束', '正在进行', '未开始'];
//生成日程表的内容
const week = mockStates<statesType>({
  name: { key: 'name', row, column },
  state: { key: 'state', enumObj: states },
  time: { key: 'time', now: times.now, old: times.past },
});
//不同日程选中后的操作
const menu: any = {
  nothing: {
    name: '空闲',
    slist: [],
  },
  study: {
    name: '研学',
    slist: [
      {
        name: '请假',
        reason: '默认请假原因',
        behavor: () => {
          prompt('请输入请假原因');
          from.value.state = states.leave;
          select.type = states.leave;
          showList();
          unShowContextMenu();
        },
      },
      {
        name: '调整',
        behavor: () => {
          from.value.name = '取消';
          from.value.state = -1;
          isTo.value = true;
          unShowContextMenu();
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
          from.value.state = states.study;
          select.type = states.study;
          showList();
          unShowContextMenu();
        },
      },
    ],
  },
};
//被选中的日程信息
const select = { x: 0, y: 0, time: times.future, type: states.nothing };
//被调整的日程位置(响应式)
const from = ref<statesType>({ x: 0, y: 0 });
//是否打开日程选项
const isOpenP = ref(false);
//是否是PC端
const isPC = ref(false);
isPC.value = window.innerWidth > 600 ? true : false;
//是否正在调整日程
const isTo = ref(false);
//判断是否是PC端并进行一些打开日程选项的准备工作
const openContextMenu = (e: MouseEvent) => {
  if (isOpenP) {
    unShowContextMenu();
  }
  openPanel(e);
};
//定位PC端选项菜单的坐标
let contextMenuTop: Ref<string> = ref('100vh');
let contextMenuLeft: Ref<string> = ref('100vw');
//判断菜单是否过于靠右
let isRightSide: Ref<boolean> = ref(false);
//获取页面宽高帮助定位
const windowWidth = document.documentElement.clientWidth;
const windowHeight = document.documentElement.clientHeight;
//PC端显示选项菜单
const showContextMenu = (x: number, y: number) => {
  // 在指定的位置显示选项菜单
  if (isPC.value) {
    contextMenuLeft.value = (x / windowWidth) * 100 + 'vw';
    contextMenuTop.value = (y / windowHeight) * 100 + 'vh';
    //如果过于靠右则向左打开，即添加想左平移的class
    isRightSide.value = (x / windowWidth) * 100 > 80 ? true : false;
  }
  //不是PC端则按照原本的程序进行
  else {
    isOpenP.value = true;
  }
};
//关闭时取消显示选项菜单，将选项菜单直接定位到可视区域下方
const unShowContextMenu = () => {
  isOpenP.value = false;
  if (isPC.value) {
    contextMenuLeft.value = '100vw';
    contextMenuTop.value = '100vh';
  }
};

//打开日程选项
const openPanel = (e: MouseEvent) => {
  isOpenP.value = false;
  const Element = e.target as HTMLElement;
  //如果点击的不是日程表的内容，直接返回
  //并关闭选项菜单
  if (!Element.classList.contains('content')) {
    unShowContextMenu();
    return;
  }
  select.x = Number(Element.getAttribute('x'));
  select.y = Number(Element.getAttribute('y'));
  //如果点击的是最左侧或者最上侧一栏，直接返回
  //并关闭选项菜单
  if (!(select.x * select.y)) {
    unShowContextMenu();
    return;
  }
  select.time = Number(Element.getAttribute('time'));
  select.type = Number(Element.getAttribute('type'));
  //如果正在调整日程
  if (isTo.value) {
    exchangeTo();
    return;
  }
  //如果选中的是已经结束的日程，不展示选项，仅展示基础信息
  if (select.time != times.future) {
    if (isPC.value && e.button == 2) {
      showContextMenu(e.x, e.y);
    }
    showBase();
    return;
  }
  from.value = week[select.x][select.y];
  //如果选中的是未开始日程，显示选项
  if (isPC.value && e.button == 2) {
    showContextMenu(e.x, e.y);
  }
  showList();
};
const exchangeTo = () => {
  //如果尝试调整到原来的位置，取消调整
  if (select.x === from.value.x && select.y === from.value.y) {
    isTo.value = false;
    from.value.name = '';
    from.value.state = states.study;
    return;
  }
  //如果尝试调整到已经开始或结束的日程，或者尝试调整到非空闲时间，提示错误
  if (select.time !== times.future || select.type !== states.nothing) {
    console.log(select.time, select.type);
    alert('只能调整到未开始的空闲时间');
    return;
  }
  from.value.state = states.nothing;
  from.value.name = '';
  week[select.x][select.y].state = states.study;
  isTo.value = false;
};

const ListName = ref('');
const List = reactive<any>([]);
const showBase = () => {
  ListName.value = menu[states[select.type]].name;
  List.splice(0, List.length);
  isOpenP.value = true;
};
const showList = () => {
  showBase();
  List.push(...menu[states[select.type]].slist);
};
</script>
