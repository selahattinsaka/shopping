<template>
  <div id="app">
    <navbar @rerender-page="rerender"/>
    <router-view/>
    <vue-snotify/>
  </div>
</template>

<script>

import Navbar from './components/navbar.vue';

export default {
  name: 'shell-default',
  components: { Navbar },
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    rerender() {
      this.componentKey += 1;
    },
  },
};
</script>

<style lang="scss">
@import "./sass/base.scss";
@import "~vue-snotify/styles/dark.scss";
@import "~vue-snotify/styles/dark.scss";
</style>
