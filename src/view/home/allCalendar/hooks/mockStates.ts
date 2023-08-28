import { status, eventType } from '../_type/status';
import getEnum from '@/utils/getEnum';
// 控制参数 的类型
type baseControllers = {
  err(event: eventType, type: status): string; // 操作匹配到错误的类型时运行的函数
  right(type: status, other?: (type: status) => void): void; // 操作匹配到错误的类型时运行的函数
};
type eventControllers = {
  [key in eventType]?: () => void;
};

//不同状态名
const statusName: { [name in status]: string } = {
  [status.unsign]: '未签到',
  [status.signIn]: '已签到',
  [status.leave]: '已请假',
  [status.signOut]: '已签退',
};
//不同事件名
const eventName: { [event in eventType]: string } = {
  [eventType.signIn]: '签到',
  [eventType.leave]: '请假',
  [eventType.signOut]: '签退',
};
//事件匹配的正确状态与目标状态
const rightMap: {
  [key in eventType]: {
    from: status;
    to: status;
    other?: (type: status) => void;
  };
} = {
  [eventType.signIn]: { from: status.unsign, to: status.signIn },
  [eventType.leave]: { from: status.unsign, to: status.leave },
  [eventType.signOut]: { from: status.unsign, to: status.signOut },
};

//选中的用户数组
const checkedList: {
  [key in status]: ToRefs<{
    x: number;
    y: number;
    z: number;
    name: string;
    status: status;
  }>[];
} = reactive({
  [status.leave]: [],
  [status.signIn]: [],
  [status.signOut]: [],
  [status.unsign]: [],
});

//事件匹配到正确和错误选项后的行为
const baseControllerMap: baseControllers = {
  err(event: eventType, type: status) {
    if (checkedList[type].length === 0) return '';
    let errString = checkedList[type]
      .map((checked) => checked.value.name + checked.value.x + checked.value.y)
      .join('、');
    errString += `${statusName[type]}不能${eventName[event]}`;
    return errString;
  },
  right(type, other) {
    checkedList[type].forEach((checked) => {
      checked.value.status = type;
      if (other) return other(type);
    });
  },
};
const eventControllers: eventControllers = {};
//遍历枚举类型，根据事件匹配的正确状态与目标状态，配置正确和错误行为
getEnum<eventType>(eventType).forEach((event) => {
  eventControllers[event] = () => {
    if (
      getEnum<status>(status).every((statu) => checkedList[statu].length === 0)
    ) {
      alert('你没有选中任何东西');
      return;
    }
    baseControllerMap.right(rightMap[event].to, rightMap[event].other);
    let unqualified: string[] = [];
    getEnum<status>(status)
      .filter((status) => status !== rightMap[event].from)
      .forEach((type) => {
        unqualified.push(baseControllerMap.err(event, type));
      });
    getEnum<status>(status).forEach((type) => {
      checkedList[type].splice(0, Infinity);
    });
    unqualified = unqualified.filter((str) => str);
    if (unqualified.length === 0) return;
    alert(unqualified.join(', '));
  };
});

export { checkedList, eventName, eventControllers };
