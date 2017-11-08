<?php
require("01_init.php");
@$u=$_REQUEST["uname"] or die('{"code":-1,"msg":"名称是必须的"}');
@$p=$_REQUEST["upwd"] or die('{"code":-2,"msg":"密码是必须的"}');
$sql="SELECT*FROM jd_user WHERE uname='$u' AND upwd='$p'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row!==NULL){
  $rs=["code"=>1,"msg"=>"登录成功","uid"=>$row['uid']];
  echo json_encode($rs);
}
else {
 echo '{"code":-3,"msg":"用户名或密码有误"}';
}
?>