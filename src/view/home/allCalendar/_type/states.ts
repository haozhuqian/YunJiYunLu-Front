export enum states {
  leave,
  nothing,
  study,
  meeting,
}
export type statesType = { name?: string; isNow?: boolean; state?: states };
