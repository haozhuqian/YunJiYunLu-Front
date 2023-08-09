<style lang="scss" scoped></style>
<template>
  <div>home</div>
  <nav>
    <router-link :to="{ name: 'sign' }">sign</router-link>
    <router-link :to="{ name: 'info' }">info</router-link>
    <router-link :to="{ name: 'calendar' }">calendar</router-link>
  </nav>
  <router-view></router-view>
</template>
<script lang="ts" setup></script>
