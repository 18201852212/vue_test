<template>
    <div>
        <button @click="push">infor</button>
        <ul class="manageul">
            <router-link v-for="item in routelink"  tag='li' class="routeli" :to='{name:item.link}' >{{item.name}}</router-link>
            <!-- 给routerlink绑定事件要使用.native修饰符，因为routerlink是自定义标签，直接绑定事件无法触发 -->
        </ul>
        <router-view></router-view>
        <div id='test'><router-view name="a"></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            routelink:[{name:'信息',link:'information'},{name:'费用',link:'cost'},{name:'假期',link:"holiday"},{name:"任务",link:"task"}],
            post:null,
        }
    },
    methods:{
        push(){
            this.$router.push({name:"information",params:{id:'information'}})
        }
    }
}
</script>
<style scoped>
.routeli{
    list-style: none;
}
</style>