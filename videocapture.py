
import cv2
import math
import os
from PIL import Image
import numpy as np
import pymysql

def groupimg(src):
    IMG_Width=160
    IMG_Height=90
    #newimg为大图背景图
    newimg=Image.new("RGB",(4*IMG_Width,5*IMG_Height))
    #截取视频帧
    cap = cv2.VideoCapture(src)
    num=math.floor(cap.get(cv2.CAP_PROP_FRAME_COUNT)/20-1)
    for i in range(1,21):
        print(i)
        cap.set(cv2.CAP_PROP_POS_FRAMES,i*num)
        ret,frame=cap.read()
        res=cv2.resize(frame,(IMG_Width,IMG_Height))
        if i%4==0:
            col=4
            row=int(i/4)
        else:
            col=i%4
            row=math.floor(i/4)+1
 #注意cv2和PIL打开图片的颜色格式不同，不能直接互用，所以要把cv2截取的视频帧转为RGB图片
        picture=Image.fromarray(cv2.cvtColor(res,cv2.COLOR_BGR2RGB))
        #将视频帧组合成新图片
        newimg.paste(picture,((col-1)*IMG_Width,(row-1)*IMG_Height))
    #此时用相对路径改变工作目录是相对上一个工作目录
    os.chdir("E:\\www\\resource\\img")
    basename=os.path.basename(src)
    name=os.path.splitext(basename)
    imgname=os.getcwd()+"\\"+name[0]+".jpg"
    newimg.save(imgname)
    cap.release()
    #如果数据里有一些特殊字符最好用pymysql的escape_string方法处理下数据
    imgname=pymysql.escape_string(imgname)
    src=pymysql.escape_string(src)
    sql="insert into filemap (videoname,imgurl,videourl) values ('%s','%s','%s')"%(name[0],imgname,src)
    cursor.execute(sql)
#os.chdir最好用绝对路径 pymysql设置连接时要把autocommit设为ture，否则执行sql语句后不会自动提交数据库
con=pymysql.Connect(host="localhost",user="root",password="liulu789",port=3306,charset='utf8',db="test_two",autocommit=True)
cursor=con.cursor()
videos=os.listdir("E:\\www\\resource\\video")
for fe in videos:
    os.chdir("E:\\www\\resource\\video")
    groupimg(os.path.abspath(fe))
con.close()