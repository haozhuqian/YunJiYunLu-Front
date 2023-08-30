export enum status {
  outside,
  leave,
  nothing,
  study,
}
export enum times {
  past,
  now,
  future,
}
export type contentType = {
  name: string;
  time: times;
  state: status;
  x: number;
  y: number;
};
export type eventMeun = { [key in status]: [string, () => void][] };
