/**
 * Created by bjwsl-001 on 2017/7/26.
 */
$(()=>{
   $(".tab ul li a").click((e)=>{
       e.preventDefault();
       var $tar=$(e.target);
       $tar.parent().addClass("active").siblings().removeClass("active");
   });
    //验证手机格式 失去焦点时：判断手机格式是否正确，如果正确，判断是否重复
$("#uphone").blur((e)=>{
  var u=$("#uphone").val();
    var ureg=/^1[35678]\d{9}$/;
    if(!u){
        $(e.target).attr("placeholder","请输入手机号码");
        $(".phone .b1").css("display","inline-block").text("手机号码不能为空");
        $(".phone i").css("display","none");
         return;
    }
    else if(!ureg.test(u)){
      $(".phone .b1").css("display","inline-block").text("手机号码格式不正确，请重新输入");
        $(".phone i").css("display","none");
         return;
    }
    else{
        $(".phone i").css("display","block").next().css("display","none");
    }
    $.ajax({
        type:"get",
        url:"/existuphone",
        data:{uphone:u},
        success:function(data){
            if(data.code>0){
                $(".btn1").addClass("  btn1-abled").attr("disabled",false);
            }
            else{
                $(".phone i").css("display","none");
                $(".phone .b1").css("display","inline-block").text("手机号已注册，请点击登录");
            }
        }
    })

});

});

//生成随机验证码
function code(){
    var str="ABCDEFGHIJKLMNOPQRSTUVWSYZ0123456789";
    var i=Math.floor(Math.random()*36);
    var a=str[i];
   return a;
}
code();
function color(){
    var r=String(parseInt(Math.random()*255));
    var g=String(parseInt(Math.random()*255));
    var b=String(parseInt(Math.random()*255));
    var color=r+","+g+","+b;
    return color;

}
color();
function ss(){
    $(" .icheck .i1").html(code()+code()+code()+code()+code()+code()).css("color","rgb("+color()+")");
}
ss();
$(" .icheck .i2 a").click(()=>{
    ss();
});
 //图形验证码事件
$(".icheck input").blur(function(e){
    var $tar=$(e.target);
    var code=$("#icheck").val();
    var codecheck=$tar.siblings(".i1").text();
    if(!code){
        $("#reg-box div>b.checkb").css("display","inline-block").text("图形验证码不能为空");
        $("#reg-box div.icheck .i3").css("display","none");
        return;
    }
    else
    if(code.toLowerCase()!==codecheck.toLowerCase()){
        $("#reg-box div>b.checkb").css("display","inline-block").text("图形验证码不正确，请重新输入");
        $("#reg-box div.icheck .i3").css("display","none");
           return;
    }
    else{
        $("#reg-box div.icheck .i3").css("display","block");
        $("#reg-box div>b.checkb").css("display","none");
    }
});
//获取验证码
$(".icode .btn1").click((e)=>{
    e.preventDefault();
    $(e.target).prev().attr("disabled",false).css("background","#fff");
    s=60;
    var timer=setInterval(()=>{
        s--;
        $(".icode .btn1").text("重新发送"+s+"s").addClass("  btn1-active");
        if(s<=0){
            clearInterval(timer);
            timer=null;
            $(".icode .btn1").text("获取验证码").removeClass("btn1-active");
        }
    },1000);
});
//验证码
$("#icode").blur(function(){
    var icode=$("#icode").val();
    var regicode=/^\d{4}$/;
    console.log(!regicode.test(icode));
    if(!icode){
        $("#reg-box div .codeb").css("display","inline-block").text("验证码不能为空");
        $(".codepass").css("display","none");
        return;
    }
    else if(!regicode.test(icode)){
        console.log(2);
        $("#reg-box div .codeb").css("display","inline-block").text("验证码有误");
        $(".codepass").css("display","none");
        return;
    }
    else{
        $(".codepass").css("display","block");
    }
});

//密码格式验证
$("#upwd").keyup(function(e){
    var upwd=$("#upwd").val();
    var u=String(upwd);
    $(".upwd b").css("display","inline-block").text("6-16位字符，建议由字母、数字和符号两种以上组合");
    $(".upwd .upwdpass").css("display","none");
    if(u.length>=5&&u.length<=15){
       var regn=/\d/g;
        var reglow=/[a-z]/g;
        var regup=/[A-Z]/g;
        var v1=upwd.match(regn);
        var v2=upwd.match(reglow);
        var v3=upwd.match(regup);
        var a= Number(v1!=null);
        var b= Number(v2!=null);
        var c= Number(v3!=null);
        var sum=a+b+c;
        if(sum==3) {
            $(".safe-step span").css("background", "#DA3A4C");
        }
        else if(sum==2){
          $(".safe-step .span1").css("background","#DA3A4C").next().css("background","#DA3A4C").next().css("background","#d5d5d5");
        }
        else if(sum==1){
            $(".safe-step .span1").css("background","#DA3A4C").siblings().css("background","#d5d5d5");
        }

      }
    else{
        $(".safe-step span").css("background", "#d5d5d5");
    }
});

$("#upwd").blur(function(e){
    var upwd=$("#upwd").val();
    var preg=/^[0-9A-Za-z]{6,16}$/;
    if(!upwd){
        $(this).attr("placeholder","6-16位大小写英文字母、数字或字母的组合");//失去焦点时，没有输入内容，默认给出placeholder
        $(".upwd b").css("display","inline-block").text("密码不能为空");
        $(".upwd .upwdpass").css("display","none");
        return;
    }
    else if(!preg.test(upwd)){
        $(".upwd b").css("display","inline-block").text("密码长度只能在6-16位字符之间");
        $(".upwd .upwdpass").css("display","none");
        return;
    }
  else{

        $(".upwd .upwdpass").css("display","block");
        $(".upwd b").css("display","none");
    }
});
//确认密码验证
$("#upwd1").blur(function(e){
    var upwd=$("#upwd").val();
     var p1=$("#upwd1").val();
    if(!p1){
        $(this).attr("placeholder","请再次输入密码");
        $(".upwd1 b").css("display","inline-block").text("确认密码不能为空");
        $(".upwd1 .upwdpass").css("display","none");
        return;
    }
    else if(upwd!==p1){
        $(".upwd1 b").css("display","inline-block").text("两次密码不一致，请重新输入");
        $(".upwd1 .upwdpass").css("display","none");
        return;
    }
    else{
        $(".upwd1 .upwdpass").css("display","block");
        $(".upwd1 b").css("display","none");
    }
});
//input获取焦点时，placeholder内容为空
$("#reg-box input").focus(function(){
    $(this).attr("placeholder","");
});

//验证表单
$("#btn").click(function(e){
    e.preventDefault();
    var u=$("#uphone").val();
    var p=$("#upwd").val();
    var icode=$("#icode").val();
    var code=$("#icheck").val();
    if(!u){
        $(".phone .b1").css("display","inline-block").text("手机号码不能为空");
        return;
    }
  if(!code){
      $("#reg-box div>b.checkb").css("display","inline-block").text("图形验证码不能为空");
      return;
  }
    if(!code){
        $("#reg-box div .codeb").css("display","inline-block").text("验证码不能为空");
        return;
    }
    if(!p){
        $(".upwd b").css("display","inline-block").text("密码不能为空");
        return;
    }

 if($(".protol input:checked").length==0){
  $(".protol b").css("display","inline-block");
     return;
 }
 $.ajax({
   type:"POST",
     url:"/reg.do",
     data:{uphone:u,upwd:p},
     success:function(data){
          if(data.code>0){
              alert(data.msg);
              location.href="login.html";
          }
     },
     error:function(){
         alert("网络出现故障请稍后");
     }
});

});
