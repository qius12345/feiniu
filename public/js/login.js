
//绑定登录单击事件
$("#btn").click((e)=>{
    e.preventDefault();
    var u=$("#uname").val();
    var p=$("#upwd").val();
//正则验证用户名--手机号
    var ureg=/^1[3578]\d{9}$/;
    if(!ureg.test(u)){
        //alert("用户名格式不正确，请重新输入");
        $("#err").css("opacity","1").html("用户名格式不正确，请重新输入");
        return;
    }
    var preg=/^[a-z0-9]{6,12}$/i;
    if(!preg.test(p)){
        $("#err").css("opacity","1").html("密码格式不正确，请重新输入");
        return;
    }
  $.ajax({
      type:"POST",
      url:"/login.do",
      data:{uname:u,upwd:p},
      success:function(data){
          if(data.code>0){
              $("#err").css("opacity","0");
              location.href="index.html";
              sessionStorage.setItem("uname",u);
              sessionStorage.setItem("uid",data.uid );
          }
          else {
              $("#err").css("opacity","1");
          }
      }
  })
});
$("#btn").blur(function(){
    $("#err").css("opacity","0");
});