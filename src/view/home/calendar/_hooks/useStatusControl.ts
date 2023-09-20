//这个hook用于对日程状态管理的封装，导出了
//控制是否打开菜单变量 (isShowMenu)
//菜单列表 (menu)
//状态切换事件 (event)
import { status, times, contentType, eventMeun } from '../_type/status';
import { row, column, table } from './getTable';
import prompt from '@/components/prompt';

//不同时间段的名字
const timeWord: { [key in times]: string } = {
  [times.past]: '已结束',
  [times.now]: '正在进行',
  [times.future]: '未开始',
};

//被选中的日程信息
const selecteds: Ref<contentType>[] = [
  ref({
    name: '',
    state: status.outside,
    x: 0,
    y: 0,
    time: times.future,
    checked: false,
  }),
];
//是否展示菜单
const isShowMenu = ref(false);
//菜单列表
const menu = reactive<[string, () => void][]>([
  ['关闭', () => (isShowMenu.value = false)],
]);

//不同日程选中后的操作，不同选项表示选中的不同状态日程后出现的选项
const menuController: eventMeun = {
  [status.nothing]: [],
  [status.outside]: [],
  [status.study]: [
    [
      '请假',
      () => {
        //获取请假原因
        prompt({
          title: '请输入请假原因',
          verifys: [
            (value) =>
              value
                ? { value, reasult: true }
                : { value: '不能为空', reasult: false },
          ],
        })?.then(
          () => {
            //将选中的日程状态切换为请假
            selecteds[0].value.state = status.leave;
            //刷新选项列表
            event.showMenu();
          },
          () => {},
        );
      },
    ],
    [
      '调整',
      () => {
        //将日程字段改为取消，表示重复点击可以取消调整
        selecteds[0].value.name = '取消';
        //将日程状态改为表头，这里仅仅用于改变样式使其显眼
        selecteds[0].value.state = status.outside;
        //关闭选项菜单
        isShowMenu.value = false;
        //将选中事件切换为调整日程事件
        event.select = event.exchange;
      },
    ],
  ],
  [status.leave]: [
    [
      '取消请假',
      () => {
        //将日程状态修改为研学
        selecteds[0].value.state = status.study;
        //刷新选项列表
        event.showMenu();
      },
    ],
  ],
};
//事件对象
const event = reactive({
  //选中日程事件
  select(x: number, y: number) {
    //将之前选中的日程取消选中
    selecteds[0].value.checked = false;
    //将点击的日程对象加入选中日程列表
    selecteds[0] = table[x][y];
    //展示选中样式
    selecteds[0].value.checked = true;
    //展示选项列表
    event.showMenu();
  },
  //清空选中日程列表
  unSelect() {
    //将选项列表收起
    isShowMenu.value = false;
    //将选中日程的选中演示取消
    selecteds[0].value.checked = false;
    //清空选项列表
    menu.splice(1, Infinity);
  },
  //选中日程事件的备份，与select一模一样。为了在调整研学后能恢复正常的选中日程功能
  normalSelect(x: number, y: number) {
    selecteds[0] = table[x][y];
    selecteds[0].value.checked = true;
    event.showMenu();
  },
  //展示选项列表
  showMenu() {
    //清空选项列表（仅仅保留关闭菜单按钮）
    menu.splice(1, Infinity);
    //向菜单中填入基础展示信息
    menu.push(
      //填入时间提示词（未开始，进行中，已结束）
      [timeWord[selecteds[0].value.time], () => {}],
      //填入日期
      [row[selecteds[0].value.x], () => {}],
      //填入时间段
      [column[selecteds[0].value.y - 1], () => {}],
    );
    //如果徐那种的时间段尚未到来，则向菜单填入其他选项
    if (selecteds[0].value.time === times.future) {
      menu.push(...menuController[selecteds[0].value.state]);
    }
    //展开菜单
    isShowMenu.value = true;
  },
  //调整研学时，收起菜单后选择要调整到的目标日程
  exchange(x: number, y: number) {
    //清空选项列表（仅仅保留关闭菜单按钮）
    selecteds[1] = table[x][y];
    //如果尝试调整到原来的位置，取消调整
    if (
      selecteds[0].value.x === selecteds[1].value.x &&
      selecteds[0].value.y === selecteds[1].value.y
    ) {
      selecteds[0].value.name = '';
      selecteds[0].value.state = status.study;
      //恢复选中日程功能
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
    //转换状态
    selecteds[0].value.state = status.nothing;
    selecteds[0].value.name = '';
    selecteds[0].value.checked = false;
    selecteds[1].value.state = status.study;
    event.select = event.normalSelect;
  },
});

export { event, menu, isShowMenu };
