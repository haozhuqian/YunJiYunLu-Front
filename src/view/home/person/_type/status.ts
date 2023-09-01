export type detailInfoDescriptions = {
  name: string;
  gender: string;
  age: string;
  birthday: string;
  number: string;
  phone: string;
  grade: string;
  direction: string;
  major: string;
  class: string;
  email: string;
};
export type searchInputPropsType = textInputPropsType | selectInputPropsType;
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
