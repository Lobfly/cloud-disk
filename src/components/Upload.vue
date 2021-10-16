<template>
  <div class="Upload">
      <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab color="pink" depressed v-on="on" v-bind="attrs" large>
                <v-icon>mdi-cloud-upload</v-icon>
            </v-btn>
          </template>
          <span>上传</span>
      </v-tooltip>
  </div>
</template>

<script>
export default {
    name:'Upload',
    methods:{
        upload(){

        }
    }
}
</script>

<style scoped>
    .Upload{
        position: fixed;
        z-index: 999;
        left: 95%;
        top: 90%
    }

</style>