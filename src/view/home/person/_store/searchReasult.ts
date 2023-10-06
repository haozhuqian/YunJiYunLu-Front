import { showStudent } from '@/service/http/modules/allSign';
import { userInfo } from '@/types/userInfo';

const info = reactive([]) as { [key in (typeof userInfo)[number]]: string }[];

for (let i = 0; i < 13; i++) {
  showStudent(i).then((res) => {
    const data = res.data.data;
    console.log(res.data.data);
    data.forEach((item: any) => {
      info.push({
        user_name: item.studentName,
        user_email: '',
        user_phone: '15034281331',
        user_class: '软件2110',
        user_period: '6期',
        user_group: '全栈',
        user_gender: '男',
        user_major: '软件工程',
        user_id: item.studentId,
        user_academy: '软件学院',
        user_introduction: '',
        study_num: '0',
        late_num: '0',
        early_num: '0',
        absent_num: '0',
        leave_num: '0',
      });
    });
  });
}

export default info;
