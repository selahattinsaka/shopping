<template>
  <div id="app">
    <navbar/>
    <router-view/>
    <vue-snotify/>
  </div>
</template>

<script>

import Navbar from './components/navbar.vue';

export default {
  name: 'shell-default',
  components: { Navbar },
};
</script>

<style lang="scss">
@import "./sass/base.scss";
@import "~vue-snotify/styles/dark.scss";
</style>
