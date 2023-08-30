<style scoped lang="scss">
@import '@/style/tool';

.person {
  position: relative;
  top: 3%;
  left: 3%;
  width: 95%;
  height: 80%;
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
</style>

<template>
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
    <div class="table">
      <el-table :data="user.info" stripe border style="width: 100%">
        <el-table-column
          v-for="(value, key) in info"
          :prop="key"
          :label="value"
          :key="value"
        />
        <el-table-column label="操作" class="operations">
          <template #default="scope">
            <el-button size="small" @click.prevent="showRow(scope.$index)"
              >详情</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click.prevent="deleteRow(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { ElInput } from 'element-plus';

const user = useUserStore();

const direction = {
  秘书处: 1,
  设计: 2,
  数据科学: 3,
  'CPU&OS': 4,
  JAVA: 5,
  全栈: 6,
};
const info = {
  number: '学号',
  name: '姓名',
  gender: '性别',
  grade: '期数',
  direction: '方向',
  major: '专业',
  class: '班级',
};
const grade = ['八期', '七期', '六期', '五期'];

let deleteInfo = [];
let studentID: Ref<number>;
let studentName: Ref<string>;
const selectGender: Ref<string> = ref('性别');
const selectGrade: Ref<string> = ref('期数');
const selectDirection: Ref<string> = ref('方向');

const deleteRow = (index: number) => {
  deleteInfo[index] = user.info.splice(index, 1);
};
const showRow = (index: number) => {
  console.log(user.info[index]);
};
let inputUpdate = function (this: typeof ElInput): void {
  this.$forceUpdate();
};
</script>
