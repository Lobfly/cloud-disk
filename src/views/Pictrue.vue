<template>
  <div>
    <v-data-table :headers="headers" :items="pictrues" class="elevation-1" show-select :items-per-page="5">
      <!-- 图片 -->
      <template v-slot:[`item.file_mini`]="{ item }">
        <!-- 有备忘时渲染带tooltip的 -->
        <v-tooltip right  v-if="item.file_memo">
        <template v-slot:activator="{ on, attrs }">
        <div class="img_containner" @click="display(item)" v-on="on" v-bind="attrs">
          <img :src="item.file_mini">
        </div>
        </template>
        <span>{{item.file_memo}}</span>
        </v-tooltip>
        <!-- 无备忘时直接渲染图片 -->
         <div class="img_containner" @click="display(item)" v-if="!item.file_memo">
          <img :src="item.file_mini">
          <!-- 怎么实现懒加载 -->
        </div>
      </template>

      <!-- 按钮 -->
      <template v-slot:[`item.operations`]="{ item }">
        <div class="btns">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab normal depressed color="blue lighten-1" v-on="on" v-bind="attrs" @click="download(item)"><v-icon>mdi-arrow-collapse-down</v-icon></v-btn>
            </template>
            <span>下载</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab normal depressed color="red lighten-1" v-on="on" v-bind="attrs" @click="deleteItem(item)"><v-icon>mdi-delete</v-icon></v-btn>
            </template>
            <span>删除</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab normal depressed color="yellow darken-2" v-on="on" v-bind="attrs"><v-icon>mdi-star</v-icon></v-btn>
            </template>
            <span>收藏</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab normal depressed color="blue-grey lighten-1" v-on="on" v-bind="attrs"><v-icon>mdi-rename-box</v-icon></v-btn>
            </template>
            <span>重命名</span>
          </v-tooltip>
          
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn fab normal depressed color="green darken-1" v-on="on" v-bind="attrs"><v-icon>mdi-pencil</v-icon></v-btn>
            </template>
            <span>编辑备忘</span>
          </v-tooltip>
        </div>

      </template>
    </v-data-table>

  </div>
</template>

<script>
import _axios from '../utils/axios'
export default {
    name:'Pictrue',
    data(){
      return{
        headers:[{text:'图片',value:'file_mini',sortable:false},{text:'名称',value:'file_name'},{text:'大小',value:'file_size'},{text:'日期',value:'file_time'},{text:'操作',sortable:false,value:'operations'}],
        pictrues:[],
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
      display(item){
        this.$store.dispatch('setPreviewFile',item)
        this.$store.commit('SetIsPreview',true)
      },
      download(item){
        console.log(item)
        const a = document.createElement("a");
        a.setAttribute("href", item.file_src);
        a.click(); 
      },
      deleteItem(item){
        _axios.delete('/data/deleteFile',{
          data:{
            file_id:item.file_id
          }
        }).then(res=>{
          this.getData()    //这里必须放在异步执行之后
        })
      },
      getData(){
        _axios.defaults.headers.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNjM0MjEwOTIxMjAwLCJ0aW1lb3V0Ijo4NjQwMDAwMCwidWlkIjoiMTYzNDEyNDI2Mjg3NSIsImlhdCI6MTYzNDIxMDkyMX0.2IY-MzVvDT7NU579JeBq1JtwMOQ9M2xTEbDQzO13czM'
        _axios.get('/data/getImageData')
        .then(res=>{
          this.pictrues = [...res.data.data]
          console.log(res.data)
        })
      },
      editMemo(){
        _axios.po
      }
    },
    mounted(){
      this.getData()
    }

}
</script>

<style scoped>
 .img_containner{
   width: 150px;
   height: 150px;
   overflow: hidden;
   position: relative;
   cursor: pointer;
 }
 .img_containner img{
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);
 }

</style>