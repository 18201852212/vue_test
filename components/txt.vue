<template>
    <div class="txt">
      <canvas id='cvs' ref="cvs" width="400px" height="300px" @mousemove="cod"></canvas>
      <!-- <div id="right"><canvas height="100px" width="200px" class="test"></canvas><canvas id='cvss' ref='cvss' height="200px" width="200px" style='background-color:white' @mousemove="cod2"></canvas></div> -->
        <!-- canvas跟其他标签一样，也可以通过css来定义样式。但这里需要注意的是：canvas的默认宽高为300px * 150px,在css中为canvas定义宽高，
        实际上把宽高为300px * 150px的画布进行了拉伸，如果在这样的情况下进行canvas绘图，你得到的图形可能就是变形的效果。
        所以，在canvas绘图时，应该在canvas标签里直接定义宽高。 -->
        <!-- canvas是内联元素，
        内联元素之间的间隙是由换行或者回车导致的。只要把标签写成一行或者标签直接没有空格，就不会出现间隙。
        但是这种方式是不太可靠，存在太多不可控的因素导致失效，例如：代码生成工具、代码格式化、或者其他人修改了代码等等。 -->
    </div>
</template>
<script>
export default {
  mounted(){
//     canvas 绘制可以通过 JS 代码来控制（其实应该说 HTML 5  只是提供了个容器，绘制只能在 JS 里完成），而 JS 提
// 供了两个函数，beginPath() 和 closePath() ，这两
// 个函数可以起到类似 <div> 的作用，用它来把每个圆圈包围，就可以绘制不同颜色的图形了。
    this.drawtest()
    
  },
  methods:{
    cod(event){
     
    },
    drawtest(){
      var mystep=null
      var c=this.$refs.cvs
      var ctx=c.getContext('2d')
      var x,y
      ctx.beginPath()
      ctx.moveTo(20,60)
      for(x=20;x<=220;x+=0.1){
          var midval=Math.pow(50,2)*(1-Math.pow(x-120,2)/Math.pow(100,2))
          y=60+Math.sqrt(midval)
          ctx.lineTo(x,y)
      }
      ctx.moveTo(20,60)
      for(x=20;x<=220;x+=0.1){
          var midval=Math.pow(50,2)*(1-Math.pow(x-120,2)/Math.pow(100,2))
          y=60-Math.sqrt(midval)
          ctx.lineTo(x,y)
      }
      ctx.stroke()
      ctx.fillStyle='red'
      ctx.fill()
      ctx.beginPath()
      ctx.arc(200,200,20,0,Math.PI*2)
      ctx.fillStyle='blue'
      ctx.fill()
    }
    
  }
}
</script>
<style  scoped>
.txt{
  font-size: 0;
  /* 将父元素的font-size设为0也可以消除内联元素之间的间隙 */
  width: 1000px;
}
#cvs{
  background-color:white;
}
.test{
  display: block;
  background-color: white;
}
#cvss{
  display: block;
}
#right{
  display: inline-block;
  width: 200px;
  height: 300px;
}
</style>