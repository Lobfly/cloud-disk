<template>
  
  <v-app>
      <v-snackbar v-model="snackbar" top color="primary" timeout="2000">{{snackbarText}}</v-snackbar>
      <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed:{
    snackbar:{
      get(){
        return this.$store.state.snackbar
      },
      set(){
        this.$store.commit('SetSnackbar',false)
        return this.$store.state.snackbar
      }
      
    },
    snackbarText(){
      return this.$store.state.snackbarText
    },
    snackbarColor(){
      return this.$store.state.snackColor
    }
  }
};
</script>

<style>
</style>
