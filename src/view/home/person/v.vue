<style scoped lang="scss">
@import '@/style/tool';

.person {
  position: relative;
  top: 3%;
  left: 3%;
  z-index: 0;
  width: 95%;
  height: 10em;
  background-color: var(--color-primary);
}

.searchBar {
  position: absolute;
  display: flex;
  justify-content: space-between;
  margin-right: 5%;
  margin-left: 5%;
  width: 90%;
}

.inputStudentID {
  width: 15em;
  color: var(--color-least);
}

.inputStudentName {
  width: 13em;
  color: var(--color-least);
}

.table {
  position: absolute;
  margin-top: 5%;
  margin-right: 5%;
  margin-left: 5%;
  width: 90%;
}

.operations {
  display: flex;
}

.isDetailShow {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 10%;
  transform: translate(-50%, -50%);
}

.messageShowBox {
  position: relative;
  z-index: 10;
  padding: 10px;
  margin-left: 30%;
  width: 40%;
  background-color: var(--color-minor);
  border-radius: 5px;
}

.closeBtn {
  position: absolute;
  right: 10px;
}
</style>

<template>
  <!-- 人员管理页面 -->
  <div class="person">
    <div class="searchBar">
      <el-input
        v-model="studentID"
        placeholder="请输入学号"
        class="inputStudentID"
        maxlength="10"
        @input="inputUpdate"
      >
        <template #prepend>
          <p>学号：</p>
        </template>
      </el-input>
      <el-input
        v-model="studentName"
        placeholder="请输入姓名"
        class="inputStudentName"
        maxlength="4"
        @input="inputUpdate"
      >
        <template #prepend>
          <p>姓名：</p>
        </template>
      </el-input>
      <el-select
        v-model="selectGender"
        placeholder="Select"
        style="width: 115px"
      >
        <el-option label="男" value="1" />
        <el-option label="女" value="2" />
      </el-select>
      <el-select
        v-model="selectGrade"
        placeholder="Select"
        style="width: 115px"
      >
        <el-option
          v-for="(value, index) in grade"
          :label="value"
          :value="index"
          :key="value"
        ></el-option>
      </el-select>
      <el-select
        v-model="selectDirection"
        placeholder="Select"
        style="width: 115px"
      >
        <el-option
          v-for="(value, key) in direction"
          :label="key"
          :value="value"
          :key="key"
        ></el-option>
      </el-select>
      <el-button>
        <el-icon><Search /></el-icon>
        <p>&nbsp; 搜索</p>
      </el-button>
    </div>
    <!-- 信息展示 -->
    <div class="table">
      <el-table :data="userInfo" stripe border style="width: 100%">
        <el-table-column
          v-for="(value, key) in info"
          :prop="key"
          :label="value"
          :key="value"
        />
        <!-- 对用户进行操作 -->
        <el-table-column label="操作" class="operations">
          <template #default="scope">
            <el-button size="small" @click.prevent="showDetails(scope.$index)"
              >详情</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click.prevent="deletePeople(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 详情页 -->
  <div class="messageShowBox" v-show="isDetailShow">
    <el-button
      size="small"
      type="danger"
      class="closeBtn"
      @click="isDetailShow = false"
      >关闭</el-button
    >
    <el-descriptions title="详情" :column="4" border>
      <el-descriptions-item
        v-for="(value, key) in detailInfoDescriptions"
        :label="value"
        label-align="right"
        align="center"
        :key="value"
        ><p>{{ detailInfo[key] }}</p></el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import userInfo from './_store/searchReasult';
import { ElInput } from 'element-plus';

//以下是一些储存数据的数据对象

//储存方向的对象
const direction = {
  秘书处: 1,
  设计: 2,
  数据科学: 3,
  'CPU&OS': 4,
  JAVA: 5,
  全栈: 6,
};
//储存信息类型的对象
const info = {
  number: '学号',
  name: '姓名',
  gender: '性别',
  grade: '期数',
  direction: '方向',
  major: '专业',
  class: '班级',
};
//储存期数
const grade = ['八期', '七期', '六期', '五期'];
//储存详情页展示信息的信息类型
const detailInfoDescriptions = {
  name: '姓名',
  gender: '性别',
  age: '年龄',
  birthday: '生日',
  number: '学号',
  phone: '电话',
  grade: '期数',
  direction: '方向',
  major: '专业',
  class: '班级',
  email: '邮箱',
};

//一些储存信息的变量

//被删除的信息暂时储存在这里
let deleteInfo = [];
//以下是搜索条中要获取的信息，包括学号、姓名、性别、期数、方向
let studentID: Ref<number>;
let studentName: Ref<string>;
const selectGender: Ref<string> = ref('性别');
const selectGrade: Ref<string> = ref('期数');
const selectDirection: Ref<string> = ref('方向');

//是否展示详情页
const isDetailShow: Ref<boolean> = ref(false);

//删除某人信息时将对应数据删除，并临时储存被删除的信息
const deletePeople = (index: number) => {
  const deletedItem = userInfo.splice(index, 1);
  deleteInfo.push(deletedItem[0]);
};
//详细信息页展示的信息对象
const detailInfo = ref(userInfo[0]);
//展示
const showDetails = (index: number) => {
  isDetailShow.value = true;
  detailInfo.value = userInfo[index];
};

//强制刷新input输入框绑定的数据
let inputUpdate = function (this: typeof ElInput): void {
  this.$forceUpdate();
};
</script>
