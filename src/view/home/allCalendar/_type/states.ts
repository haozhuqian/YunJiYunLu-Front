export enum states {
  leave,
  nothing,
  study,
}
export enum times {
  past,
  now,
  future,
}
export type statesType = {
  name?: string;
  time?: times;
  state?: states | -1;
  x: number;
  y: number;
};
