import { status, times, contentType, eventMeun } from '../_type/status';
import { row, column, table } from './getTable';

//不同时间段的名字
const timeWord: { [key in times]: string } = {
  [times.past]: '已结束',
  [times.now]: '正在进行',
  [times.future]: '未开始',
};
//不同日程选中后的操作
const menuController: eventMeun = {
  [status.nothing]: [],
  [status.outside]: [],
  [status.study]: [
    [
      '请假',
      () => {
        console.log(prompt('请输入请假原因'));
        selecteds[0].value.state = status.leave;
        event.showMenu();
      },
    ],
    [
      '调整',
      () => {
        selecteds[0].value.name = '取消';
        selecteds[0].value.state = status.outside;
        isShowMenu.value = false;
        event.select = event.exchange;
      },
    ],
  ],
  [status.leave]: [
    [
      '取消请假',
      () => {
        selecteds[0].value.state = status.study;
        event.showMenu();
      },
    ],
  ],
};

const event = reactive({
  select(x: number, y: number) {
    selecteds[0] = table[x][y];
    event.showMenu();
  },
  unSelect() {
    isShowMenu.value = false;
    menu.splice(1, Infinity);
  },
  normalSelect(x: number, y: number) {
    selecteds[0] = table[x][y];
    event.showMenu();
  },
  showMenu() {
    menu.splice(1, Infinity);
    isShowMenu.value = true;
    menu.push(
      [timeWord[selecteds[0].value.time], () => {}],
      [row[selecteds[0].value.x], () => {}],
      [column[selecteds[0].value.y - 1], () => {}],
    );
    if (selecteds[0].value.time === times.future) {
      menu.push(...menuController[selecteds[0].value.state]);
    }
  },
  exchange(x: number, y: number) {
    selecteds[1] = table[x][y];
    //如果尝试调整到原来的位置，取消调整
    if (
      selecteds[0].value.x === selecteds[1].value.x &&
      selecteds[0].value.y === selecteds[1].value.y
    ) {
      selecteds[0].value.name = '';
      selecteds[0].value.state = status.study;
      event.select = event.normalSelect;
      return;
    }
    //如果尝试调整到已经开始或结束的日程，或者尝试调整到非空闲时间，提示错误
    if (
      selecteds[1].value.time !== times.future ||
      selecteds[1].value.state !== status.nothing
    ) {
      alert('只能调整到未开始的空闲时间');
      return;
    }
    selecteds[0].value.state = status.nothing;
    selecteds[0].value.name = '';
    selecteds[1].value.state = status.study;
    event.select = event.normalSelect;
  },
});

//被选中的日程信息
const selecteds: Ref<contentType>[] = [
  ref({ name: '', state: status.outside, x: 0, y: 0, time: times.future }),
];
//是否展示菜单
const isShowMenu = ref(false);
//菜单列表
const menu = reactive<[string, () => void][]>([
  [
    '关闭',
    () => {
      isShowMenu.value = false;
    },
  ],
]);

export { event, menu, isShowMenu };
