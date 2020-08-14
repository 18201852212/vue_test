<template>
<div>
    <form class="mui-input-group">
    <div class="mui-input-row">
        <label>用户名</label>
    <input type="text" class="mui-input-clear" placeholder="请输入用户名">
    </div>
    <div class="mui-input-row">
        <label>密码</label>
        <input type="password" class="mui-input-password" placeholder="请输入密码">
    </div>
    <div class="mui-button-row">
        <button type="button" class="mui-btn mui-btn-primary" >确认</button>
        <button type="button" class="mui-btn mui-btn-danger" >取消</button>
    </div>
    </form>
    <div class="mui-card">
				<div class="mui-card-header mui-card-media">
					<img src="../img/logo.png">
					<div class="mui-media-body">
						小M
						<p>发表于 2016-06-30 15:30</p>
					</div>
					<!--<img class="mui-pull-left" src="../images/logo.png" width="34px" height="34px" />
					<h2>小M</h2>
					<p>发表于 2016-06-30 15:30</p>-->
				</div>
				<div class="mui-card-content">
					<img src="../img/yuantiao.jpg" alt="" width="100%">
				</div>
				<div class="mui-card-footer">
					<a class="mui-card-link">Like</a>
					<a class="mui-card-link">Comment</a>
					<a class="mui-card-link">Read more</a>
				</div>
			</div>
			<div id="A1plot" style="width: 1000px;height:600px;"></div>
            <input type="button" value="副图表" @click="show">
            <div id="A2plot" style="width: 600px;height:400px;" ></div>
</div>
</template>
<script>
import '../src/mui/mui-master/dist/css/mui.css'
import $ from '../lib/jquery-3.3.1.min.js'
import echart from 'echarts'
export default {
    data(){
        return {
            option : {
                title:{
                    text:'美军飞机单位小时飞行成本'
                },
                tooltip: {},
                legend: {
                    show:true,
                    data:['柱状图','折线图','饼图'],
                    selected:{
                        '柱状图':true,
                        '折线图':false,
                        '饼图':false
                    }
                },
                xAxis:{
                    data:[]
                },
                yAxis:{},
                series:[{
                    name:'柱状图',
                    type:'bar',
                    data:[]
                },
                {
                    name:'折线图',
                    type:'line',
                    data:[]
                },
                 {
                    name:'饼图',
                    type:'pie',
                    data:[],
                }]
            },
            option2:{
                title:{text:"2019年上半年世界主要经济体GDP"},
                tooltip:{},
                 grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                legend:{top:20,
                        data:[]},
                xAxis:{data:[]},
                yAxis:{},
                series:[]
            },
            flag:true
		}
	},
	mounted() {
        var myChart = echart.init(document.getElementById('A1plot'))
        var that =this
        //下面操作涉及新对象要想使用vue的data要先把vue对象保存
        var xhr=new XMLHttpRequest()
        xhr.onreadystatechange=function(){
                if(xhr.readyState==4&&xhr.status==200){
               var result=xhr.responseXML
                var nav=result.getElementsByTagName('nav')[0]
                var cell=nav.getElementsByTagName('cell')
                var dslist=[]
                var fclist=[]
                var pie=[]
                for(let i=0;i<cell.length;i++){
                    var piece={}
                    var ds=cell[i].getElementsByTagName('designation')[0].innerHTML
                    var fc=parseInt(cell[i].getElementsByTagName('fcph')[0].innerHTML)
                    dslist.push(ds)
                    fclist.push(fc)
                    piece.name=ds
                    piece.value=fc
                    pie.push(piece)
                }
                that.option.xAxis.data=dslist
                that.option.series[0].data=fclist
                that.option.series[1].data=fclist
                that.option.series[2].data=pie
                myChart.setOption(that.option)
               
            }
        }
       xhr.open('get','http://localhost:3000/test.xml')
       xhr.send()
       myChart.on('legendselectchanged',function(param){
                if( param.name=='饼图'){
//{     type: 'legendselected',
//     // 选中的图例名称
//     name: string
//     // 所有图例的选中状态表
//     selected: Object
// }
                    that.option.xAxis.show=false
                    that.option.yAxis.show=false
                    that.option.legend.selected={'柱状图':false,'折线图':false,'饼图':true}
                }else{
                    that.option.xAxis.show=true
                    that.option.yAxis.show=true
                    param.selected['饼图']=false
                    that.option.legend.selected=param.selected
                }
                 myChart.setOption(that.option)
                }) 
    },
    // 要操作dom元素应该在网页已经渲染完毕后即组件已经挂载上去了
    //注意axios会生成promise对象是异步的对返回数据后续的处理函数要写在回调函数内
    methods:{
        show(){
            if($("#A2plot").css('display')=='none'){
                $("#A2plot").css('display','block')
            }else{
                $("#A2plot").css('display','none')
            }
            if(this.flag==true){
                this.flag=false
                var that=this
                var myChart = echart.init(document.getElementById('A2plot'))
                $.ajax({url:'http://localhost:3000/output.xml',
                        type:'GET',
                        dataType:'xml',
                        timeout:2000,
                        cache:false,
                        error:function(err){console.log(err)},
                        success:function(xml){
                                var cell=$(xml).find("cell")
                                var series=[]
                                var ldata=[]
                                var xdata=[]
                                for(let i=0;i<cell.length;i++){
                                    let text=$(cell[i]).find('group').text()
                                    let number=$(cell[i]).find('number').text()
                                    let country=$(cell[i]).find('country').text()
                                    xdata.push(country)
                                      if(ldata.indexOf(text)==-1) {
                                          ldata.push(text)
                                          let group={}
                                          group.name=text
                                          group.type='bar'
                                          group.stack='总量'
                                          group.data=[]
                                          series.push(group)
                                      } 
                                }
                                //填充模型
                                 for(let i=0;i<cell.length;i++){
                                    let text=$(cell[i]).find('group').text()
                                    let number=$(cell[i]).find('number').text()
                                    for(let j=0;j<series.length;j++){
                                          if(text==series[j].name){
                                              series[j].data.push(number)
                                          }
                                          else{series[j].data.push('-')}
                                        }
                                    }
                                //填充数据，如果和上一过程整合容易产生错误
                                that.option2.xAxis.data=xdata
                                that.option2.legend.data=ldata
                                that.option2.series=series
                                myChart.setOption(that.option2)
                            }
                        })
            }
         }
    }
}
</script>
<style  scoped>
#A2plot{
    display: none
}
</style>