//标识用户的状态
export enum status {
  unsign = 0,
  leave = 1,
  signIn = 2,
  signOut = 3,
}
//标识事件的种类
export enum eventType {
  signIn,
  leave,
  signOut,
}
//标识用户的属性
export type contentType = {
  x: number;
  y: number;
  z: number;
  isCheck: boolean;
  name: string;
  status: status;
  studentId?: number;
  classNum?: number;
};

// 控制参数 的类型
export type baseControllers = {
  err(event: eventType, type: status): string; // 操作匹配到错误的类型时运行的函数
  right(
    from: status,
    to: status,
    other?: (checked: Ref<contentType>, from: status) => void,
  ): void; // 操作匹配到正确的类型时运行的函数
};
export type eventControllers = {
  [key in eventType]?: () => void;
};
