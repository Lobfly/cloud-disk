<template>
  <div class="Upload">
      <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab color="pink" depressed v-on="on" v-bind="attrs" large  @click="btnClick">
                <v-icon>mdi-cloud-upload</v-icon>
            </v-btn>
          </template>
          <span>上传</span>
      </v-tooltip>
  </div>
</template>

<script>
import _axios from '../utils/axios'
import SparkMD5 from 'spark-md5'
import {mkMini} from '../utils/mini'
export default {
    name:'Upload',
    data(){
        return{
        }
    },
    methods:{
        async upload(file,piece=1024*1024*2){
            let startByte = 0
            let endByte = piece
            let chunks = []
            const hash = SparkMD5.hash(file.name+file.size+file.lastModified+file.type)
            //对文件进行切片
            while(startByte<file.size){
                    let filePiece = file.slice(startByte,endByte)
                    chunks.push(filePiece)
                    startByte = endByte
                    endByte = startByte + piece
                }
            console.log(chunks)
            //上传切片文件
            // chunks.forEach()//不能用forEach
            for(let [index,chunk] of chunks.entries()){        //es6新方法
                await new Promise(((resolve)=>{
                    let data = new FormData()
                    data.append('chunk',chunk)
                    data.append('hash',hash)
                    data.append('index',index)
                    _axios.post('/upload/upload',data).then((res)=>{
                        //添加进度条功能
                        console.log(res)
                        resolve()
                    })
                }))
            }
            //合并文件
            let miniFile = await mkMini(file)
            const datas={
                    hash:hash,
                    chunkNum:chunks.length,
                    file_name:file.name,
                    file_size:file.size,
                    file_type:file.type,
                    file_mini:miniFile
                }
            await new Promise((resolve)=>{
                _axios.post('/upload/completed',datas).then((res)=>{
                    console.log(res)
                    resolve()
                    this.$bus.$emit("getData")
                    this.$bus.$emit('tip','上传成功')
                })
            })

        },
        btnClick(){
            const handleFile = (e)=>{
                this.upload(e.target.files[0],1024*1024*2)
                e.target.removeEventListener('input',handleFile)
            }
            const input = document.createElement('input')
            input.setAttribute("type","file")
            input.addEventListener('input',handleFile)
            input.click()
        },
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