<template>
  <div>
    <v-data-table :headers="headers" :items="files" class="elevation-1" show-select :items-per-page="6" hide-default-footer :page.sync="page" @page-count="pageCount = $event">
      <!-- 图片 -->
      <template v-slot:[`item.file_mini`]="{ item }">
         <div class="img_containner" @click="display(item)" v-if="!item.file_memo">
          <img :src="item.file_mini">
          <!-- 怎么实现懒加载 -->
        </div>
      </template>

      <template v-slot:[`item.file_name`]="{ item }" widths="20px">
        <div v-show="!item.isEdit">{{item.file_name}}</div>
        <v-text-field solo dense autofocus height="16px" v-show="item.isEdit" v-model="item.file_name" class="input" @keydown.enter="editName(item)"></v-text-field>
      </template>

      <template v-slot:[`item.file_size`]="{ item }">
          {{(item.file_size/1048576).toFixed(2)+"Mb"}}
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
                <v-btn fab normal depressed color="green darken-1" v-on="on" v-bind="attrs" @click="edit(item)"><v-icon>mdi-pencil</v-icon></v-btn>
            </template>
            <span>重命名</span>
          </v-tooltip>
        </div>

      </template>

    </v-data-table>
      <v-pagination
        v-model="page"
        :length="pageCount"
        light
      ></v-pagination>
  </div>
</template>

<script>
import _axios from '../utils/axios'
export default {
    name:'FileTable',
    data(){
      return{
        files:[],
        page:null,
        pageCount:0
      }
    },
    props:['type'],
    computed:{
        headers(){
            let header
            if(this.type == 'pictrue') {
                header = [{text:'图片',value:'file_mini',sortable:false},
                         {text:'名称',value:'file_name'},
                         {text:'大小',value:'file_size'},
                         {text:'日期',value:'file_time'},
                         {text:'操作',sortable:false,value:'operations'}
                ]
            }else if(this.type == 'video'){
                header = [{text:'视频',value:'file_mini',sortable:false},
                         {text:'名称',value:'file_name'},
                         {text:'大小',value:'file_size'},
                         {text:'日期',value:'file_time'},
                         {text:'操作',sortable:false,value:'operations'}
                ]
            }
            return header
        }
    },
    methods:{
      display(item){
        this.$store.commit('SetPreviewType',this.type)
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
        }).then(()=>{
          this.getData()    //这里必须放在异步执行之后
          this.$store.dispatch('setSnackbarText','删除成功')
          this.$store.commit('SetSnackbar',true)
        })
      },
      getData(){
        _axios.defaults.headers.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNjM0Mzg1NTYwNTAyLCJ0aW1lb3V0Ijo4NjQwMDAwMCwidWlkIjoiMTYzNDEyNDI2Mjg3NSIsImlhdCI6MTYzNDM4NTU2MH0.xqrOo68KTY--4jTWsb8dRjrttP8VnCfp7YJvX0hDUN8'
        if(this.type == 'pictrue'){
            _axios.get('/data/getImageData')
            .then(res=>{
            // console.log(res.data)
            if(res.data.code!=800){
                this.$store.dispatch('setSnackbarText','登录失效')
                this.$store.commit('SetSnackbar',true)    
            }else{
                this.files = [...res.data.data]
            }
            })
        }else if(this.type == 'video'){
            _axios.get('/data/getvideoData')
            .then(res=>{
            this.files = [...res.data.data]
            })            
        }
      },
      edit(item){
        if(!item.isEdit){
          this.$set(item,'isEdit',true)
        }else{
          this.$set(item,'isEdit',false)
          this.editName(item)
        }
        
      },
      editName(item){
        _axios.put('/data/renameFile',{
          file_id:item.file_id,
          file_name:item.file_name
        }).then(()=>{
          this.getData()
        })
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
 .input{
   width: 80px;
 }
</style>