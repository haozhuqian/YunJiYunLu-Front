<style scoped lang="scss">
@import '@/style/tool';
</style>

<template>
  <div class="dateInput">
    <text-input
      value="2023"
      name="年"
      :verifys="yearVerifys"
      @update="(value) => (yearNum = parseInt(value))"
    ></text-input>
    <text-input
      value="1"
      name="月"
      :verifys="monthVerifys"
      @update="(value) => (monthNum = parseInt(value))"
    ></text-input>
    <text-input
      value="1"
      name="日"
      :verifys="dayVerifys"
      @update="(value) => (dayNum = parseInt(value))"
    ></text-input>
  </div>
</template>

<script lang="ts" setup>
import verifyString from '@/utils/verifyString';
import textInput from './textInput.vue';
import { verifysType } from '@/components/prompt/_type';

const props = defineProps<{
  year?: string;
  month?: string;
  day?: string;
}>();

const ifLeap = ref(0);
const isLeap = (year: number) =>
  Number((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
const yearNum = ref(2023);
let defaultYear = '2023';
ifLeap.value = isLeap(yearNum.value);
const yearVerifys: verifysType[] = [
  (value: string) =>
    isNaN(parseInt(value))
      ? { reasult: true, value: defaultYear }
      : { reasult: true, value },
  (value: string) => {
    ifLeap.value = isLeap(yearNum.value);
    return { reasult: true, value };
  },
  (value: string) =>
    value ? { reasult: true, value } : { reasult: true, value: defaultYear },
  (value: string) =>
    /^\d+$/.test(value)
      ? { reasult: true, value }
      : { reasult: true, value: defaultYear },
];
if (props.year) {
  const yearReasult = verifyString(props.year, yearVerifys);
  defaultYear = yearReasult.reasult ? yearReasult.value : defaultYear;
}

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthNum = ref(1);
let defaultMonth = '1';
const monthVerifys: verifysType[] = [
  (value: string) =>
    isNaN(parseInt(value))
      ? { reasult: true, value: defaultMonth }
      : { reasult: true, value },
  (value: string) =>
    value ? { reasult: true, value } : { reasult: true, value: defaultMonth },
  (value: string) =>
    parseInt(value) < 13
      ? { reasult: true, value }
      : { reasult: true, value: '12' },
  (value: string) =>
    parseInt(value) > 0
      ? { reasult: true, value }
      : { reasult: true, value: '1' },
];
if (props.month) {
  const monthReasult = verifyString(props.month, monthVerifys);
  defaultMonth = monthReasult.reasult ? monthReasult.value : defaultMonth;
}

const dayNum = ref(1);
let defaultDay = '1';
const dayVerifys: verifysType[] = [
  (value: string) =>
    isNaN(parseInt(value))
      ? { reasult: true, value: defaultDay }
      : { reasult: true, value },
  (value: string) =>
    value ? { reasult: true, value } : { reasult: true, value: defaultDay },
  (value: string) => {
    let day = parseInt(value);
    if (day === 2) {
      return day <= months[1] + ifLeap.value
        ? { reasult: true, value }
        : { reasult: true, value: (months[1] + ifLeap.value).toString() };
    }
    return parseInt(value) <= months[monthNum.value - 1]
      ? { reasult: true, value }
      : {
          reasult: true,
          value: months[monthNum.value - 1].toString(),
        };
  },
  (value: string) =>
    parseInt(value) > 0
      ? { reasult: true, value }
      : { reasult: true, value: '1' },
];
if (props.day) {
  const dayReasult = verifyString(props.day, dayVerifys);
  defaultDay = dayReasult.reasult ? dayReasult.value : defaultDay;
}
</script>
