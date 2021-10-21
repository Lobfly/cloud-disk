<template>
  <div class="login_page">
      <!-- 登录页面 -->
     <v-card elevation="1" width="600px" v-show="!isRegister&&!isReset">
        <v-card-text class="inputItem">
            <span>用户名:</span>
            <v-text-field placeholder="请输入用户名" class="inputText" v-model="loginInfo.username"></v-text-field>
        </v-card-text>
        <v-card-text class="inputItem">
            <span>密码:</span>
            <v-text-field placeholder="请输入密码" class="inputText" v-model="loginInfo.password" @keydown.enter="login" type="password"></v-text-field>
        </v-card-text>
        <div class="btn_div">
            <v-btn elevation="1" color="primary" large @click="login">登录</v-btn>
        </div>
        <div class="btn_div">
             <span @click="isRegister=!isRegister">注册账号</span>
        </div>
        <div class="btn_div">
             <span @click="isReset=!isReset">重置密码</span>
        </div>
     </v-card>
        <!-- 注册页面 -->
        <v-card elevation="1" width="600px" v-show="isRegister">
            <v-card-text class="inputItem">
            <span>用户名:</span>
            <v-text-field placeholder="请输入用户名" class="inputText" v-model="registerInfo.username" @input="checkName"></v-text-field>
            <span id="checkname_tip">{{checkNameTip}}</span>
        </v-card-text>
        <v-card-text class="inputItem">
            <span>密码:</span>
            <v-text-field placeholder="请输入密码" class="inputText" v-model="registerInfo.password" type="password"></v-text-field>
        </v-card-text>
        <v-card-text class="inputItem">
            <span>密保问题:</span>
                <v-select :items="questions" label="问题" v-model="registerInfo.question" class="inputText"></v-select>
        </v-card-text>
        <v-card-text class="inputItem">
            <span>密保答案:</span>
            <v-text-field class="inputText" v-model="registerInfo.answer"></v-text-field>
        </v-card-text>
        <div class="btn_div">
            <v-btn elevation="1" color="primary" large @click="register">注册</v-btn>
        </div>
        <div class="btn_div">
            <span @click="isRegister=!isRegister">返回</span>
        </div>
        </v-card>
        <!-- 重置密码页面 -->
    <v-card elevation="1" width="600px" v-show="isReset">
        <v-card-text class="inputItem">
            <span>用户名:</span>
            <v-text-field placeholder="请输入用户名" class="inputText" v-model="resetInfo.username" @input="getQuestion"></v-text-field>
        </v-card-text>
        <v-card-text class="inputItem reset_question">
            <span>密保问题:</span>
            <span>{{resetInfo.question}}</span>
        </v-card-text>
        <v-card-text class="inputItem">
            <span>密保答案:</span>
            <v-text-field placeholder="请输入答案" class="inputText" v-model="resetInfo.inputAnswer"></v-text-field>
        </v-card-text>
        <v-card-text class="inputItem">
            <span>密码:</span>
            <v-text-field placeholder="请输入新密码" class="inputText" v-model="resetInfo.password" type="password"></v-text-field>
        </v-card-text>
        <div class="btn_div">
            <v-btn elevation="1" color="primary" large @click="reset">重置</v-btn>
        </div>
        <div class="btn_div">
             <span @click="isReset=!isReset">返回</span>
        </div>
     </v-card>
  </div>
</template>

<script>
import _axios from '../utils/axios'
export default {
    name:'Login',
    data(){
        return{
            loginInfo:{
                username:'',
                password:'',
            },
            registerInfo:{
                username:'',
                password:'',
                questions:'',
                answer:'',
            },
            resetInfo:{
                username:'',
                question:'输入用户名获取密保问题',
                inputAnswer:'',
                trueAnswer:'',
                password:''
            },
            questions:["你的星座是什么","你的高中学校是什么","你的爱好是什么"],
            
            isRegister:false,
            timer:null,  //防抖
            checkNameTip:'',

            isReset:false
        }
    },
    methods:{
        login(){
            _axios.post('/login/login',{
                user_name:this.loginInfo.username,
                user_password:this.loginInfo.password,
            })
            .then((res)=>{
                this.$bus.$emit('tip',res.data.message)
                if(res.data.code == 802){
                    //跳转
                    //token储存到localStorage
                    //为了安全加个退出清除localStorage的功能
                    this.$router.push({
                        path:'/home'
                    })
                    localStorage.setItem('Authorization',res.data.data.token)
                    console.log(res.data.data.token)
                }
            })
            .then((error)=>{
                if(error){
                    console.log(error)
                }
            })
        },
        register(){
            _axios.post('/login/signin',{
                user_name:this.registerInfo.username,
                user_password:this.registerInfo.password,
                user_question:this.registerInfo.question,
                user_answer:this.registerInfo.answer,
                mock:'mock'
            }).then((res)=>{
                
                if(res.data.code == 820){
                    this.$bus.$emit('tip',`${res.data.message}正在为您跳转至登录页面...`)
                    setTimeout(()=>{
                        this.isRegister = false
                    },2000)
                }else{
                    this.$bus.$emit('tip',res.data.message)
                }
                console.log(res)
            }).then((error)=>{
                if(error){
                    console.log(error)
                }
            })
        },
        checkName(){
            //防抖
            clearTimeout(this.timer)
            this.timer = setTimeout(()=>{
                _axios.post('/login/checkname',{
                    user_name: this.registerInfo.username
                }).then((res)=>{
                    this.checkNameTip = res.data.message
                    console.log(res.data.message)
                })
            },1000)
        },
        getQuestion(){
            clearTimeout(this.timer)
            this.timer = setTimeout(()=>{
                _axios.get('/login/getuserquestion',{
                    params:{
                        user_name: this.resetInfo.username
                    }
                }).then((res)=>{
                    if(res.data.code == 800) {
                        this.resetInfo.question = res.data.data.user_question
                        this.resetInfo.trueAnswer = res.data.data.user_answer
                    }else{
                        this.resetInfo.question = "查询失败，请检查用户名"
                    }
                })
            },500)
        },
        reset(){
            if(this.resetInfo.inputAnswer == this.resetInfo.trueAnswer) {
                _axios.post('/login/resetpassword',{
                    user_name: this.resetInfo.username,
                    user_password: this.resetInfo.password
                }).then((res)=>{
                    console.log(res.data)
                    if(res.data.code == 808){
                        this.$bus.$emit('tip','重置成功，正在为您跳转至登录页面...')
                        setTimeout(()=>{
                            this.isReset = false
                        },2000)
                    }

                })
            }
        }
        //失败，原因是v-on不能绑定高阶函数
        // throttle(fn){
        //     let timer = null
        //     return function(){
        //         console.log("running")
        //         if(timer){
        //             return
        //         }
        //         timer = setTimeout(()=>{
        //             fn()
        //             console.log("result")
        //             timer = null
        //         },200)
        //     }
        // }
    }
}
</script>

<style scoped>
    .login_page{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 600px;
    }
    .inputItem {
        display: flex;
        line-height: 100%;
    }
    .inputItem span{
        display: flex;
        align-items: center;
        font-size: 20px;
        width: 90px;
    }
    .inputText{
        font-size: 20px;
    }
    .btn_div{
        display: flex;
        justify-content: center;
        padding: 10px;
    }
    .btn_div span{
        cursor: pointer;
    }
    .btn_div span:hover{
        color: rgb(25,118,210);
    }
    /* 权重问题，使用id选择器 */
    #checkname_tip{             
        position: absolute;
        font-size: 14px;
        color: rgb(207, 10, 10);
        top: 76px;
        left: 105px;
        width: 200px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
    }
    .reset_question{
        /* 和其他text-field一样高 */
        height:102px 
    }
    .reset_question span:nth-child(2){
        /* 之前设置了span宽度为90px，这里覆盖掉之前的宽度 */
        width:300px;
    }
</style>