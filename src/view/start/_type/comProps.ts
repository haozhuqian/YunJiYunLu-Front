export type textInputPropsType = {
  name: string;
  verifys: ((value: string) => {
    reasult: boolean;
    value: string;
  })[];
};
