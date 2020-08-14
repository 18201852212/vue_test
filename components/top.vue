<template>
    <div class="top">
      <router-link to='/hello'>欢迎页</router-link>
      <mt-swipe :auto="4000">
  <mt-swipe-item style="background-color:red">1</mt-swipe-item>
  <mt-swipe-item style="background-color:yellow">2</mt-swipe-item>
  <mt-swipe-item style="background-color:blue">3</mt-swipe-item>
</mt-swipe>
    </div>
</template>
<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  
}
</script>
<style  scoped>
.top{
    height: 100px;
    width :100%;
    margin-bottom: 30px;
    background-color:blueviolet;
}
</style>