<style scoped lang="scss">
@import '@/style/tool';

.calendar {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);

  .table {
    margin-top: 5%;
    width: 100%;
    height: 80%;

    @include flex();

    .row {
      flex: 1 1 0px;

      @include flex(column);
    }
  }
}
</style>

<template>
  <!-- 如果本组件失去焦点，则触发关闭选项列表事件 -->
  <div class="calendar" @blur="event.unSelect" tabindex="0">
    <div class="table" @click="check($event)">
      <div v-for="(day, dayIndex) in table" class="row" :key="dayIndex">
        <content
          v-for="(course, timeIndex) in day"
          :key="timeIndex"
          v-bind="course.value"
        >
        </content>
      </div>
    </div>
    <div></div>
    <panel></panel>
  </div>
</template>

<script lang="ts" setup>
import content from './_com/content.vue';
import panel from './_com/panel.vue';
import { table } from './_hooks/getTable';
import { event } from './_hooks/useStatusControl';

const check = (e: MouseEvent) => {
  event.unSelect();
  const Element = e.target as HTMLElement;
  //如果点击的不是日程表的内容，直接返回
  if (!Element.classList.contains('content')) return;
  const x = Number(Element.getAttribute('x'));
  const y = Number(Element.getAttribute('y'));
  //如果点击的是最左侧或者最上侧一栏，直接返回
  if (!(x * y)) return;
  //校验通过，选中它
  event.select(x, y);
};
</script>
