<template>
    <div class='main'>
        <button type="button" class="mui-btn" @click="change" >Badge button <span class="mui-badge">1</span></button>
			<p v-for='item in userlist' :id='item.id' >{{item.name}}</p>
		<transition mode="out-in">
			<h1 v-show='flag'>hello</h1>
		 </transition>
         <div class="videobox">
             <div class="videocontent">
            <video id='appvideo'  height='360px' width="640px" controls='controls' autoplay='autoplay' poster="../img/timg.gif" data-id=''></video>
            </div>
            <div class="videonav">
                <div  v-for="item in videolist">
                        <div class='videonavitem' :id='item.id'>
                            <img :src="item.navimgsrc" :data-site='item.url' :data-id='item.id' @click="videoselect">
                            <div class='videomsg'>
                                <a :data-site='item.url' :data-id='item.id' @click="videoselect">{{item.txt}}</a>
                                <span>{{item.play}} &nbsp;&nbsp; {{item.time}}</span>
                            </div>
                        </div> 
                </div>
            </div>
	    </div>
        <txt></txt>
         <router-view></router-view>
         <div class="smallwin"  @dragstart="movestart" @dragend="moveend" draggable="true">
             <div class="swleft"></div>
             <div class="swright"></div>
             <div id="closemin" @click="close"></div>
         </div>
    </div>
</template>
<script>
import Vue from 'vue'
import txt from './txt.vue'
import videojson from '../src/json/video.json'
import {Toast} from 'mint-ui'
import 'mint-ui/lib/style.css'
export default {
    data(){
        return {node:null,
        sign:false,
        point:{x:0,y:0},
        userlist:[{id:'1',name:'max'},{id:'2',name:'clever'},{id:'3',name:'single'},{id:'4',name:'seven'},{id:'5',name:'qq'}],
        videolist:videojson,
        flag:true
        };
    },
    mounted(){
        var body=document.body
		body.onscroll=this.listener
    },
    methods:{
        change(){
            this.flag=!this.flag;Toast('你好')
        },
        //  videoselect(event){
        //     var target=event.target
        //     var oldtitle=document.getElementById('videonavtitle')
        //     var url=target.getAttribute('data-site')
        //     var id=target.getAttribute('data-id')
        //     // 可以通过事件对象的target属性获得元素标签，然后通过getAttrbute方法获得自定义属性
        //     var video=document.getElementById('appvideo')
        //     if(id!=video.getAttribute('data-id')){
        //         if(oldtitle){oldtitle.remove()}
        //         var newtitle=document.createElement('div')
        //         var gdparent=target.parentNode.parentNode
        //         newtitle.id='videonavtitle'
        //         //注意是className这种写法浏览器支持度高
        //         newtitle.innerHTML='正在播放'
        //         gdparent.before(newtitle)
        //         video.src=url
        //         video.setAttribute('data-id',id)
        //         }
        // },
        videoselect(event){
            var target=event.target
            var url=target.getAttribute('data-site')
            var id=target.getAttribute('data-id')
            var parent=document.getElementById(id)
            var video=document.getElementById('appvideo')
            var oldmask=document.getElementById('videonavmask')
            if(oldmask){oldmask.remove()}
            var newmask=document.createElement('div')
            newmask.id='videonavmask'
            newmask.innerHTML='<h3>播放视频</h3>'
            this.node=parent.childNodes[2]
            parent.insertBefore(newmask,parent.childNodes[0])
            video.src=url
            //以上是播放视频相关脚本，下面是修改小窗信息代码
            var smw=document.getElementsByClassName('smallwin')[0]
            if(this.node){smw.childNodes[2].innerHTML=this.node.outerHTML}
            //注意这种写法，outerHTML:除了包含innerHTML的全部内容外, 还包含对象标签本身。
        },
        listener(){
            var node=this.node
            var scroll=document.documentElement.scrollTop
            var vdbox=document.getElementsByClassName("videobox")[0]
            var standline=vdbox.offsetTop+vdbox.offsetHeight
            var smw=document.getElementsByClassName('smallwin')[0]
            var video=document.getElementById('appvideo')
            if(scroll<=standline){this.sign=true}
            if(scroll>standline&&!video.paused&&this.sign){
               smw.style.display='block'
               video.classList.add('minvideo')
                }
            else{
                video.classList.remove('minvideo')
                smw.style.display='none'
                }
        },
        movestart(event){
            var point=this.point
            point.x=event.offsetX
            point.y=event.offsetY
        },
        moveend(event){
            var smw=document.getElementsByClassName('smallwin')[0]
            var video=document.getElementById('appvideo')
            var point=this.point
            var x=event.clientX-point.x
            var y=event.clientY-point.y
            var width=window.innerWidth
            var height=window.innerHeight
            //window.innerHeight和window.innerWidth是浏览器可视窗口的宽和高
            //document.body.clientHeight几乎是固定不变的
            if(x>0&&x<width-500){
                smw.style.left=x+'px'
                video.style.left=smw.style.left
            }else {if(x<=0){
                smw.style.left=0
                video.style.left=0
            }else{
                smw.style.left=width-500+'px'
                video.style.left=width-500+'px'
            }}
            if(y>0&&y<height-200){
                smw.style.top=y+'px'
                video.style.top=y+10+'px'
            }else {if(y<=0){
                smw.style.top=0
                video.style.top='10px'
            }else{
                smw.style.top=height-200+'px'
                video.style.top=height-190+'px'
            }}

        },
        close(){
            var smw=document.getElementsByClassName('smallwin')[0]
            var video=document.getElementById('appvideo')
            this.sign=false
            video.classList.remove('minvideo')
            smw.style.display='none'
        }
    },
    components:{txt}
   
    }
</script>
<style scoped>
.main{
    margin:0 10px;
    overflow: hidden;
    min-height: 200px;
    /* width: 100%; */
    background-color: blanchedalmond;
}
p{
    margin: 20px 0;
    background-color: brown;
}

.v-enter,
.v-leave-to
{opacity: 0.5;}
.v-enter-active,
.v-leave-to{
    transition:all ease 0.4s;
}
.videocontent{
    margin-top:5px;
    margin-left: 5px;
    padding-top:5px;
    padding-left:5px;
    display:inline-block;
    height: 370px;
    width: 650px;
    background-color: black
}
.videobox{
    position: relative;
    background-color: rgb(189, 183, 183);
    width: 1070px;
    margin: 0 auto;
    padding-bottom: 5px ;
}
.videonav{
    overflow-y:scroll;
    display: inline-block;
    height: 360px;
    width: 400px;
}
.videonavitem {
    position: relative;
    display: flex;
    flex-direction: row;
    align-content: space-between;
    overflow: hidden;
    margin-bottom:10px; 
    background-color:rgb(185, 129, 119);
}

.videomsg{
   display: flex;
   flex-direction: column;
   justify-content:space-between;
}
.smallwin{
    position: fixed;
    z-index: 100;
    display: none;
    width: 500px;
    height: 200px;
    bottom:10px;
    right: 10px;
    background-color: aquamarine
}
.swleft{
    width: 320px;
    height: 200px;
    background-color: aqua
}
.swright{
    position:absolute;
    display: flex;
    left:330px;
    top:20px;
    height: 160px;
    width: 150px;
}
.minvideo{
    position:fixed;
    z-index:1000;
    bottom:20px;
    right:190px;
    height:180px;
    width:320px;
}
#closemin{
    position: absolute;
    left: 0;
    top:-50px;
    height: 50px;
    width: 50px;
    background-color:black ;
    opacity: 0.5;
}
</style>

