export type textInputPropsType = {
  name: string;
  verifys: ((value: string) => {
    reasult: boolean;
    value: string;
  })[];
};
export type selectInputPropsType = {
  name: string;
  option: string[];
};
