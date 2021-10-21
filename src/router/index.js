import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../pages/Login"
import Home from "../pages/Home"
import Picture from "../views/Pictrue"
import Video from "../views/Video"
import Timeline from "../views/Timeline"
import Folder from "../views/Folder"
import Profile from "../views/Profile"
Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {
            path:'/login',
            component:Login
        },
        {
            path:'/home',
            component:Home,
            children:[
                {
                    path:'pictrue',
                    component:Picture
                },
                {
                    path:'video',
                    component:Video
                },
                {
                    path:'timeline',
                    component:Timeline
                },
                {
                    path:'Folder',
                    component:Folder
                },
                {
                    path:'Profile',
                    component:Profile
                }
            ]
            
        }
    ]
})
export default router