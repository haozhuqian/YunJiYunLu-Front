import { affairInfo } from '@/types/affair';

const info = reactive([
  {
    student_name: '郝祝乾',
    student_id: '2021005381',
    type: '请假',
    semester: '2022 spring',
    reason: '生病',
    week_num: '1',
    day_of_week: '周三',
    class_num: '上午第一节',
    study_date: '2023-9-12',
  },
]) as { [key in (typeof affairInfo)[number]]: string }[];
export default info;
