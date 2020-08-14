const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports={entry:{
                        index:"./src/main.js",
                        route:"./src/ros.js"
                        },
                output:{filename:"[name].js",
                        path:__dirname+"/dict"
                        },
                plugins:[new VueLoaderPlugin()],
                module:{
                        rules:[
                                {test:/\.css$/,use:['style-loader','css-loader']},
                                {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
                                {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
                                {test:/\.(jpg|png|bmp|gif|jpeg)$/,use:'url-loader?limit=1024'},
                                {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
                                {test:/\.vue$/,use:'vue-loader'},
                                {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
                                {test:/\.(ogg|mp4)$/,use:'url-loader?limit=5120'},
                                {test:/\.(html|php)$/,use:'html-loader'}
                                ]
                        },
                resolve:{
                        alias:{
                                'vue$':'vue/dist/vue.js'
                                }
                        }
                 }