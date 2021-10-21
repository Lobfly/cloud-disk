<template>
  <v-app>
      <TopTip></TopTip>
      <router-view></router-view>
  </v-app>
</template>

<script>
import TopTip from "./components/TopTip.vue"
export default {
  name: 'App',
  components:{TopTip}
};
</script>

<style>
</style>
