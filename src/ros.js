import Vue from 'vue'
import bar from '../components/managebar.vue'
import VueRouter from "vue-router"
import information from "../components/information.vue"
import cost from "../components/cost.vue"
import holiday from "../components/holiday.vue"
import task from "../components/task.vue"
Vue.use(VueRouter)
var router=new VueRouter({
    routes:[
        {path:"/information",name:'information',components:{a:information}},
        {path:"/cost",name:'cost',component:cost},
        {path:"/holiday",name:'holiday',component:holiday},
        {path:"/task",name:'task',component:task},
    ]
})
var vuebar=new Vue({
    el:"#navbar",
    router:router,
    render(h){
        return h(bar)
    }
})
