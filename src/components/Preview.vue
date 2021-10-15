<template>
  <v-card elevation="2" class="d-flex align-center justify-center preview" v-if="$store.state.isPreview">
      <v-img :src="$store.state.previewFile.file_src" contain height="700" width="1200"></v-img>
      <v-card-actions>
          <v-btn class="quit" fab x-small @click="quit" color="red"> <v-icon>mdi-close-thick</v-icon></v-btn>
      </v-card-actions>
  </v-card>

</template>

<script>
export default {
    name:'Preview',
    methods:{
        quit(){
            this.$store.commit('SetIsPreview',false)
        }
    }
}
</script>

<style scoped>
    .preview{
        /* 为了美观加点padding */
        padding-left: 20px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: rgba(107, 107, 107, 0.5);
        z-index: 999;
    }
    .quit{
        position: absolute;
        top: 18px;
        left: 1220px;
        transform: translate(-50%,-50%);
    }
</style>