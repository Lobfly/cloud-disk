<template>
  <div class="preview" v-if="$store.state.isPreview">
      <v-img :src="$store.state.previewFile.file_src" contain height="720" width="1280" v-if="$store.state.previewType=='pictrue'"></v-img>
      <video :src="$store.state.previewFile.file_src" v-if="$store.state.previewType=='video'" height="720px" width="1280px" autoplay controls></video>
      <v-btn class="quit" fab x-small @click="quit" color="red"> <v-icon>mdi-close-thick</v-icon></v-btn>
  </div>
</template>

<script>
export default {
    name:'Preview',
    methods:{
        quit(){
            this.$store.commit('SetIsPreview',false)
        }
    },
    updated(){
        console.log(this.$store.state.previewType)
    }
}
</script>

<style scoped>
    .preview{
        /* 为了美观加点padding */
        /* padding-left: 20px; */
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(107, 107, 107, 0.5);
        z-index: 999;
    }
    .quit{
        position: absolute;
        top: 16px;
        left: 1264px;
        transform: translate(-50%,-50%);
    }
</style>