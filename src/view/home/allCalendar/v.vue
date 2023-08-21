<style scoped lang="scss">
@import url('@/style/tool');

.calendar {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 2px var(--color-least) solid;

  @include flex();

  .row {
    flex: 1 1 0px;

    @include flex(column);

    .course {
      overflow: hidden;
      margin: 2px;
      font-size: 12px;
      background-color: var(--color-main);
      border-radius: 10px;
      flex: 1 1 0px;
      font-weight: 900;

      @include flex(row, center, center);
    }
  }

  .panel {
    position: absolute;
    bottom: -90%;
    width: 100%;
    height: 90%;
    background-color: var(--color-main);
  }
}
</style>

<template>
  <div class="calendar">
    <div
      v-for="(day, dayIndex) in week"
      class="row"
      @click="openPanel"
      :key="dayIndex"
    >
      <div class="course">{{ days[dayIndex] }}</div>
      <div v-for="(course, timeIndex) in day" class="course" :key="timeIndex">
        <content v-bind="course" :x="dayIndex" :y="timeIndex"></content>
      </div>
    </div>
    <div class="panel">aa</div>
  </div>
</template>

<script lang="ts" setup>
import content from './_com/content.vue';
import { states } from './_com/type';

const days = ['八月', '一24', '二', '三', '四', '五', '六', '日'];
const week = reactive<{ name?: string; isNow?: boolean; state?: states }[][]>([
  [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
    { name: '6' },
  ],
  [{}, {}, { state: states.meeting }, {}, {}, {}],
  [{}, { state: states.study }, {}, {}, {}, {}],
  [{}, { state: states.leave }, {}, {}, {}, {}],
  [{}, { state: states.leave }, {}, {}, {}, {}],
  [{}, { state: states.leave }, {}, {}, {}, {}],
  [{}, { state: states.leave }, {}, {}, {}, {}],
  [{}, { state: states.leave }, {}, {}, {}, {}],
]);

const openPanel = () => {};
</script>
