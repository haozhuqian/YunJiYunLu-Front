<style scoped lang="scss"></style>

<template>
  <div class="searchInput">
    {{ props }}
  </div>
</template>

<script lang="ts" setup>
import { searchInputPropsType } from '../_type/status';
const props = defineProps<searchInputPropsType>();
</script>
