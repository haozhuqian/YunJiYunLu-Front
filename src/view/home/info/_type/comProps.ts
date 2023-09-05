export type textInputPropsType = {
  isChanged: boolean;
  default: string;
  verifys: ((value: string) => {
    reasult: boolean;
    value: string;
  })[];
};
export type selectInputPropsType = {
  isChanged: boolean;
  default: string;
  option: string[];
};
