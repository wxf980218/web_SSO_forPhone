<?php
/**
 * Created by PhpStorm.
 * User: wujun
 * Date: 2018/8/14
 * Time: 14:51
 */
//创建数据库连接

$con = new mysqli("localhost","root","","oss");

//检测连接
if($con->connect_errno){
    die("连接失败:".$con->connect_errno);
}
//设置编码
$con->set_charset("utf8");

header("Content-type:text/html;charset=utf-8");

//保存键传来的值
$id = isset($_POST['id']) ? htmlspecialchars($_POST['id']) :'#';
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) :'#';
$year = isset($_POST['year']) ? htmlspecialchars($_POST['year']):'#';
$month = isset($_POST['month']) ? htmlspecialchars($_POST['month']):'#';

//SQL语句
$tableDate = $year.'.'.$month;
$sql = "DELETE FROM appraisal WHERE id = $id AND name = '$name' AND yearMonth = $tableDate";
$con->query($sql);