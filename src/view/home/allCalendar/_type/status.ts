export enum status {
  unsign,
  signIn,
  leave,
  signOut,
}

export enum eventType {
  signIn,
  leave,
  signOut,
}

export type contentType = {
  x: number;
  y: number;
  z: number;
  name: string;
  status: status;
};
