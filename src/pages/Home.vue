<template>
  <v-app class="home_page">
    <!-- 侧边导航栏 -->
    <v-navigation-drawer app>
      <v-list nav>
        <v-list-item v-for="item in menus" :key="item.title" link :to="item.link">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{item.title}}
            </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- 右边内容区 -->
    <v-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
export default {
    name:'Home',
    data(){
      return{
        menus:[
          {title:'照片管理',link:'/home/pictrue',icon:'mdi-image'},
          {title:'视频管理',link:'/home/video',icon:'mdi-video'},
          {title:'时间轴',link:'/home/timeline',icon:'mdi-timeline-text'},
          {title:'收藏夹',link:'/home/folder',icon:'mdi-folder'},
          {title:'个人中心',link:'/home/profile',icon:'mdi-account-cog'}
        ]
      }
    }
}
</script>

<style scoped>
</style>