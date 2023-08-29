//这个hook用于对用户状态管理的封装，导出了
//选中用户列表 对象(checkedList)
//用户状态操作名称 对象(eventName)
//用户状态操作事件 对象(eventControllers)

import { Ref } from 'vue';
import { status, eventType, contentType } from '../_type/status';
import getEnum from '@/utils/getEnum';
// 控制参数 的类型
type baseControllers = {
  err(event: eventType, type: status): string; // 操作匹配到错误的类型时运行的函数
  right(
    from: status,
    to: status,
    other?: (checked: Ref<contentType>, from: status) => void,
  ): void; // 操作匹配到正确的类型时运行的函数
};
type eventControllers = {
  [key in eventType]?: () => void;
};

//不同用户状态名
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
    from: status; //可以操作的用户的状态
    to: status; //应当切换到什么状态
    other?: (checked: Ref<contentType>, from: status) => void; //可以额外调用的函数（比如向后端发起请求）
  };
} = {
  [eventType.signIn]: { from: status.unsign, to: status.signIn },
  [eventType.leave]: { from: status.unsign, to: status.leave },
  [eventType.signOut]: { from: status.signIn, to: status.signOut },
};

//选中的用户数组，根据选中的用户不同，插入不同数组
const checkedList: {
  [key in status]: Ref<contentType>[];
} = reactive({
  [status.leave]: [],
  [status.signIn]: [],
  [status.signOut]: [],
  [status.unsign]: [],
});
//事件匹配到正确和错误选项后的行为
const baseControllerMap: baseControllers = {
  //如果选择的用户类型不是当前操作应当操作的（比如登录操作不能对已请假，已签退，已登录这三种状态的用户操作）
  //第一个参数为事件的类型，第二个参数为匹配到的错误用户状态
  err(event: eventType, type: status) {
    //如果这个状态的没有选中任何人，直接返回空字符串
    if (checkedList[type].length === 0) return '';
    //否则遍历选中的所有这种状态用户，将名字用、隔开拼接成字符串
    const errString = checkedList[type]
      .map((checked) => checked.value.name + checked.value.x + checked.value.y)
      .join('、');
    //将名字字符串拼接后缀，并返回。大致格式为（谁谁谁、谁谁、谁谁谁已签退不能签到）之类的
    return errString + `${statusName[type]}不能${eventName[event]}`;
  },
  //如果选择的用户类型是当前操作应当操作的（比如登录操作只能对未登录状态的用户操作）
  //第一个参数为匹配的用户状态，第二个参数为要切换到的用户状态，第三个参数为选中的用户对象本身，以便于进行自定义操作
  right(from, to, other) {
    //遍历对应状态的选中的用户，将状态切换为目标状态，如果有自定义操作，执行它
    checkedList[from].forEach((checked) => {
      checked.value.status = to;
      if (other) return other(checked, from);
    });
  },
};
//声明事件控制对象，后续对应操作只需调用对象中的对应方法
const eventControllers: eventControllers = {};
//为事件控制对象添加对应的方法，因为很多都是重复操作，所以使用循环插入
getEnum<eventType>(eventType).forEach((event) => {
  eventControllers[event] = () => {
    //如果没有选中任何用户，进行提示
    if (
      getEnum<status>(status).every((statu) => checkedList[statu].length === 0)
    ) {
      alert('你没有选中任何东西');
      return;
    }
    //遍历选中的正确操作状态用户（比如登录操作时，此处应该遍历选中的所有未登录用户）
    baseControllerMap.right(
      rightMap[event].from,
      rightMap[event].to,
      rightMap[event].other,
    );
    //存储可能出现的选择错误提示词（比如谁谁谁、谁谁、谁谁谁已签退不能签到）
    let unqualified: string[] = [];
    //遍历选中的错误操作状态用户（比如登录操作时，此处应该遍历选中的所有已登录、已请假、已签退用户）
    getEnum<status>(status)
      .filter((status) => status !== rightMap[event].from) //过滤正确状态
      .forEach((type) => {
        //将生成的错误提示词插入错误提示词数组
        unqualified.push(baseControllerMap.err(event, type));
      });
    //清空选中的用户
    getEnum<status>(status).forEach((type) => {
      checkedList[type].splice(0, Infinity);
    });
    //清空错误提示词数组中的空字符串
    unqualified = unqualified.filter((str) => str);
    //如果此时没有错误提示词了，直接返回不做提示
    if (unqualified.length === 0) return;
    //否则进行错误提示
    alert(unqualified.join(', '));
  };
});

export { checkedList, eventName, eventControllers };
