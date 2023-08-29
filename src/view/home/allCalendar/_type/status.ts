//标识用户的状态
export enum status {
  unsign,
  signIn,
  leave,
  signOut,
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
  name: string;
  status: status;
};
