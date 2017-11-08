$(()=>{

$(function(){
    $("#foot-content").load("footer.html");
    var address=sessionStorage.getItem("address");
    if(address!=null){
        $(".modal").css("display","none");
        var html=`送货至:${address}
      <i class=myi></i>
    `;
        $(".ad-list>a").html(html);
    }
});

var uname=sessionStorage.getItem("uname");
if(uname!=null){
    var html=`欢迎回来 ${uname}
       <a href="#">退出</a> <b></b>
    `;
    $("#welcome").html(html);
    var html1=`
        <p>你好，${uname}</p>
        <button>普通会员</button>
    `;
    $(".my-sub .ulogin").html(html1);

    $("#welcome").on("click","a",function(e){
        e.preventDefault();
        sessionStorage.clear("uname");
        location.href = "index.html";
    });
}
//1.创建函数
//2.为函数指定参数pageno
//pageno 当前页数  获取数据库中的产品列表
function plist(pageno){
    $.ajax({
        type:"GET",
        url:"/productlist",
        data:{pageno:pageno},
        success:function(data){
            var html="";
            for(var i=0;i<data.length;i++){
                var obj=data[i];
                html+=`
                 <li>
                    <a href="#">
                        <img src="${obj.pic}" alt=""/>
                    </a>
                    <div>
                        <p class="price">￥${obj.price}</p>
                        <div class="pname"><a href="#">${obj.pname}</a></div>
                        <div class="discount">
                            <i></i>
                           <a href="#">满39元减5元</a>
                        </div>
                        <div class="add-box">
                            <div class="count">
                                <span>1</span>
                                <p>
                                   <i class="up"></i>
                                    <i class="down"></i>
                                </p>
                            </div>
                            <div class="addCart"><a  href="${obj.pid}">加入购物车</a></div>
                        </div>
                        <div class="column">好评95% <span>评价55条</span></div>
                        <p class="method">飞牛自营</p>
                    </div>
                </li>
                `;
            }
            $(".plist>ul").html(html);
        }
    })
}
plist(1);
//获取总页码
$.ajax({
    url:"/product_page",
    success:function(data){
        var html="";
        for(var i=1;i<=data.page;i++){
            if(i==1){
                html+=`<li class="active">${i}</li>`;
            }
            else{
            html+=`<li>${i}</li>`;
            }
        }
      $("#pagelist ol").html(html);
    }
});
 $("#pagelist ol").on("click","li",function(){
     var $tar=$(this);
     $(this).addClass("active").siblings().removeClass("active");
     var pno=parseInt($tar.html());
     plist(pno);
 });

//产品列表数量加
$(".plist>ul").on("click",".add-box .up",function(){
    $tar=$(this);
    var count=$tar.parent().prev();
    //var conunt=parseInt($tar.parent().prev().html());
     count.html(parseInt(count.html())+1);
    $tar.next().css("background-position","-20px -74px");
});
//产品列表数量减
$(".plist>ul").on("click",".add-box .down",function(){
    $tar=$(this);
    var count=$tar.parent().prev();
    if(count.html()>=2){
        count.html(count.html()-1);
        if(count.html()==1){
            $tar.css("background-position","-48px -18px");
        }
    }
       else{
        $tar.css("background-position","-48px -18px");
    }

});

//加入购物车
$(".plist>ul").on("click",".addCart a",function(e){
    e.preventDefault();
        var pid=$(e.target).attr("href");
    var count=$(e.target).parent().prev().children("span").html();
      console.log(count);
    while(count>1){
       add(pid);
        count--
    }
    add(pid);
});
//添加至购物车函数
function add(pid){
    $.ajax({
        type:"get",
        url:"/add_cart",
        data:{uid:sessionStorage.getItem("uid"),pid:pid},
        success:function(data){
            if(data.code>0){
                alert("添加成功");
                update();
                addp();
            }
        }
    })
}


//上下翻页效果  上一页效果
$("#pagelist .prepage").click(function(){
    var $tar=$(this);
     var page=$tar.next().children(".active").html();
    if(page>1){
        page--;
        plist(page);
        $tar.next().children(".active").prev().addClass("active").siblings().removeClass("active");
        if(page>1){
            $tar.addClass("active");
        }
        else{
            $tar.removeClass("active");
            $(".nextpage").addClass("active");
        }
    }
    else{
        $tar.removeClass("active");
    }
});
//下一页效果
$("#pagelist .nextpage").click(function(){
    var $tar=$(this);
    var page=$tar.prev().children(".active").html();
    var num=$tar.prev().children(":last-child").html();
    if(page<num){
        page++;
        plist(page);
        $tar.prev().children(".active").next().addClass("active").siblings().removeClass("active");
        if(page<num){
            $tar.addClass("active");
        }
        else{
            $tar.removeClass("active");
            $(".prepage").addClass("active");
        }
    }
    else{
        $tar.removeClass("active");

    }
});
  function cart(){
      location.href="shoppingcart.html";
  }
//点击我的购物车，跳转至购物车页面
$(".my_cart").click(function(){
  cart();
});
    $(".cart-foot").click(function(){
        cart();
    });
//更新购物车数量
function update(){
$.ajax({
    type:"GET",
    url:"/cartcount",
    data:{uid:sessionStorage.getItem("uid")},
    success:function(data){
      var count=data[0].c;
        $(".count b").html("("+count+")");
    }
});
}
update();

//页面加载后访问数据库，更新已购买商品列表
    function addp(){
        $.ajax({
            type:"get",
            url:"/getcart",
            data:{uid:sessionStorage.getItem("uid")},
            success:function(data){
                var html="";
                for(var i=0;i<data.length;i++){
                    var o=data[i];
                    html+=`
                 <li>
                       <p class="lf">
                           <a href="#">
                               <img src="${o.pic}" alt="" />
                           </a>
                       </p>
                       <div class="lf">
                           <p><a href="#">${o.pname}</a></p>
                           <p>
                               <button>${o.count}</button>
                               <span>￥${o.price}</span>
                           </p>
                       </div>
                   </li>
            `;
                }
                $("#cart-list").html(html);
            }
        });
    }

addp();
//右侧购物车模块滚动后变绝对定位事件监听

$(window).scroll(function(){
    var scrollTop=$("body").scrollTop();
    if(scrollTop>350){
        $("#cart-currant").addClass("active");
    }
    else{
        $("#cart-currant").removeClass("active");
    }
})


});
