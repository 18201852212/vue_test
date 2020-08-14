import mid from '../components/app.vue'
import top from "../components/top.vue"
import VueRouter from 'vue-router'
import Vue from 'vue'
import hello from '../components/hello.vue'
Vue.use(VueRouter)
var router=new VueRouter({routes:[{
    path:'/hello',
    component:hello
    }]
    })
var vmid=new Vue({
    el:'#app',
    router:router,
    render(h) {
        return h(mid)
    },
})
var vtop=new Vue({
    el:'#top',
    router:router,
    render(h) {
        return h(top)
    },
})
