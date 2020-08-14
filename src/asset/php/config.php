<?php
$datalocal="localhost:3306";
$database='test';
$dataname='root';
$datapswd='liulu789';
$con=mysqli_connect($datalocal,$dataname,$datapswd,$database);
if(!$con){echo '数据库连接失败'};
mysqli_query($con,'set names utf-8');
?>