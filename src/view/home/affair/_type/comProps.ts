export type verifyType = (value: string) => {
  reasult: boolean;
  value: string;
};
export type textInputPropsType = {
  name: string;
  value?: string;
  verifys: verifyType[];
};
export type selectInputPropsType = {
  name: string;
  option: string[];
};

export type multipleInputPropsType = {
  name: string;
  option: string[];
};
