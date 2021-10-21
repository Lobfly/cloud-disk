<template>
    <v-snackbar v-model="snackbar" top color="primary" timeout="2000">{{snackbarText}}</v-snackbar>
</template>

<script>
export default {
    name:"TopTip",
    data(){
        return{
            snackbar:false,
            snackbarText:''
        }
    },
    methods:{
        tip(text){
            this.snackbar = true
            this.snackbarText = text
        }
    },
    mounted(){
        this.$bus.$on('tip',(value)=>{
            this.tip(value)
        })
    }
}
</script>

<style>

</style>