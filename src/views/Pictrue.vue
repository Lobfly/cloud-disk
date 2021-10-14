<template>
  <div>
    <v-btn @click="test">test</v-btn>
    <v-data-table :headers="headers" :items="pictrues" class="elevation-1">
      <template v-slot:item.pic=""></template>
    </v-data-table>
  </div>
</template>

<script>
import _axios from '../utils/axios'
export default {
    name:'Pictrue',
    data(){
      return{
        headers:[{text:'图片',value:'pic',sortable:false},{text:'大小',value:'file_size'},{text:'日期',value:'file_time'}],
        pictrues:[]
      }
    },
    methods:{
      test(){
        //方便测试用，记得删掉
        _axios.defaults.headers.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNjM0MjEwOTIxMjAwLCJ0aW1lb3V0Ijo4NjQwMDAwMCwidWlkIjoiMTYzNDEyNDI2Mjg3NSIsImlhdCI6MTYzNDIxMDkyMX0.2IY-MzVvDT7NU579JeBq1JtwMOQ9M2xTEbDQzO13czM'
        _axios.get('/data/getImageData')
        .then(res=>{
          console.log(res.data)
        })
      },
    },
    mounted(){
        _axios.defaults.headers.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNjM0MjEwOTIxMjAwLCJ0aW1lb3V0Ijo4NjQwMDAwMCwidWlkIjoiMTYzNDEyNDI2Mjg3NSIsImlhdCI6MTYzNDIxMDkyMX0.2IY-MzVvDT7NU579JeBq1JtwMOQ9M2xTEbDQzO13czM'
        _axios.get('/data/getImageData')
        .then(res=>{
          this.pictrues = [...res.data.data]
          console.log(this.pictrues)
        })
    }
}
</script>

<style>

</style>