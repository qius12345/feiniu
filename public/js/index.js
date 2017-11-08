$(()=>{
    var address=sessionStorage.getItem("address");
    if(address!=null){
        $(".modal").css("display","none");
        var html=`送货至:${address}
      <i class=myi></i>
    `;
        $(".ad-list>a").html(html);
    }

  var imgs=[
         "images/banner1.jpg",
         "images/banner2.jpg",
         "images/banner3.jpg",
         "images/banner4.jpg",
         "images/banner5.jpg",
         "images/banner6.jpg",
         "images/banner7.jpg"
  ];
    var $uImgs=$("#img-list"),$uIndex=$("#indexs"),$bar=$("#banner"),
        $afor=$("#slider>a.forward"),
        $abac=$("#slider>a.backward");
    var str="",strdx="", LIWIDTH=800,WAIT=3500,moved=0,timer=null;
    for(var i=0;i<imgs.length;i++){
        str+=`<li><img src="${imgs[i]}" /></li>`;
        strdx+=`<li></li>`;
    }
     str+=`<li><img src="${imgs[0]}" /></li>`;
     $uImgs.append(str).css("width",(imgs.length+1)*LIWIDTH);
     $bar.addClass("barbg-0");
     $uIndex.append(strdx).children().first().addClass("hover");
      function play(){
          timer=setInterval(()=>{
              $bar.removeClass();
               moved++;
              $bar.addClass("barbg-"+moved);
              $uImgs.animate({
                  left:-moved*LIWIDTH
              },50,()=>{
                  if(moved>=7){
                      moved=0;
                      $uImgs.css("left",0);
                  }
                  $uIndex.children(":eq("+moved+")").addClass("hover").siblings().removeClass("hover");
              })
          },WAIT)
      }
 play();
    //鼠标进入slider时，停止定时器
    $("#slider").hover(()=>{
        clearInterval(timer);
        timer=null;
},()=>play());
    //为$ulIndexs绑定单击事件
    //$uIndex.on("click","li",(e)=>{
    //    $tar=$(e.target);
    //    moved=$tar.index();
    //    $uImgs.stop(true).animate({
    //        left:-moved*LIWIDTH
    //    },50,()=>{
    //    $tar.addClass("hover").siblings().removeClass("hover");
    //})
    //})
    //为$ulIndexs绑定hover事件
    $uIndex.on("mouseenter","li",(e)=>{
        $bar.removeClass();
        $tar=$(e.target);
        moved=$tar.index();
        $bar.addClass("barbg-"+moved);
        $uImgs.stop(true).animate({
            left:-moved*LIWIDTH
        },50,()=>{
            $tar.addClass("hover").siblings().removeClass("hover");
        })
    });
    //为向前向后两个按钮绑定单击事件
    $afor.click((e)=>{
        $bar.removeClass("barbg-"+moved);
        $tar=$(e.target);
       moved=$("#indexs li.hover").index();
        moved++;
        $bar.addClass("barbg-"+moved);
        $uImgs.stop(true).animate({
            left:-LIWIDTH*moved
        },50,()=>{
            if(moved==7) {
                $bar.removeClass("barbg-"+moved);
                moved = 0;
                $uImgs.css("left", 0);
                $bar.addClass("barbg-"+moved);
            }
            $uIndex.children(":eq("+moved+")").addClass("hover").siblings().removeClass("hover");
    })
    });
    $abac.click((e)=>{
        $bar.removeClass("barbg-"+moved);
        $tar=$(e.target);
        moved=$("#indexs li.hover").index();
        moved--;
       $bar.addClass("barbg-"+moved);
        $uImgs.stop(true).animate({
            left:-LIWIDTH*moved
        },50,()=>{
            if(moved==-1){
                $bar.removeClass("barbg-"+moved);
                moved = 6;
                $uImgs.css("left", -moved*LIWIDTH);
                $bar.addClass("barbg-"+moved);
            }
            $uIndex.children(":eq("+moved+")").addClass("hover").siblings().removeClass("hover");
        })
    });
    //话费充值input按钮点击弹出选项列表，绑定单击事件
  $("#add-c .money").click((e)=>{
     var $tar=$(e.target);
      $tar.siblings("ul.money-list").toggle();
  });
    // 话费流量input按钮点击弹出选项列表，绑定单击事件
    $("#tab-liu .money").click((e)=>{
        var $tar=$(e.target);
        $tar.siblings("ul.money-list").toggle();
    });
    //充值实现按钮切换
$("#bar-rt .bar-add a").click(e=>{
    e.preventDefault();
    var $tar=$(e.target);
    var i=$tar.parent().index();
    if(i==1) {
        $("#add-c input.m2").val("500M");
    }
    else if(i==0){$("#tab-liu input.m1").val("50元");}
    $tar.parent().addClass("active").siblings().removeClass("active");
    $(".tab-container").children(":eq("+i+")").css("z-index",10).css("opacity",1).css("display","block")
        .siblings().css("z-index",0).css("opacity",0).css("display","none");
});
    //为充值中心绑定单击事件，选定指定充值，填入input中
$("#bar-rt .m1-list li").on("click",(e)=>{
    e.preventDefault();
    var $tar=$(e.target);
    console.log($tar);
    var x=$tar.index();
    var arr=["￥10元","￥19.95元-20元","￥29.92元-29.98元",
        "￥49.9元-49.95元","￥99.85元-99.9元","￥199.7元-199.8元","￥299.5元-299.7元","￥499.2元-499.5元"];
     $("#bar-rt p.p1>span").text(arr[x]);
     $("#bar-rt .m1").val($tar.text());
     $tar.parent().hide();
});

    $("#bar-rt .m2-list li").on("click",(e)=>{
        e.preventDefault();
        var $tar=$(e.target);
        var j=$tar.index();
        var arr2=["￥0.84元-1元","￥1.68元-2.86元","￥2.94元-3元",
            "￥4.2元-5元","￥5.88元-7元","￥9.5元","￥8.4元-10元","￥19元","￥12.6元-15元", "￥28.2元-30元","￥42元-48元","￥66.5元-67.2元","￥95.5元","￥123.5元"
        ];
        $("#bar-rt p.p2>span").text(arr2[j]);
        $("#bar-rt .m2").val($tar.text());
        $tar.parent().hide();

    });




    //楼层标签栏绑定事件
    var TABWIDTH=120;
$("ul.f-tabs a").mouseover(e=>{
    var i=$("ul.f-tabs a").index(e.target);
    $(e.target).parent().addClass("active").siblings().removeClass("active");
    $("div.box").css("left",i*TABWIDTH+470);
    var $uls=$(".cmain>ul");
    console.log($uls[i]);
    $($uls[i]).css("display","block").siblings().css("display","none");
});
    $("ul.f2-tabs a").mouseover(e=>{
        var i2=$("ul.f2-tabs a").index(e.target);
        $(e.target).parent().addClass("active").siblings().removeClass("active");
        $("div.box2").css("left",i2*TABWIDTH+470);
    });
    //3楼
    $("ul.f3-tabs a").mouseover(e=>{
        var z=$("ul.f3-tabs a").index(e.target);
        $(e.target).parent().addClass("active").siblings().removeClass("active");
        $("div.box3").css("left",z*TABWIDTH+470);
    });
    //4楼
    $("ul.f4-tabs a").mouseover(e=>{
        var z=$("ul.f4-tabs a").index(e.target);
        $(e.target).parent().addClass("active").siblings().removeClass("active");
        $("div.box4").css("left",z*TABWIDTH+470);
    });
    //5楼
    $("ul.f5-tabs a").mouseover(e=>{
        var i5=$("ul.f5-tabs a").index(e.target);
        $(e.target).parent().addClass("active").siblings().removeClass("active");
        $("div.box5").css("left",i5*TABWIDTH+470);
    });

//楼层轮播1F
    var F1WIDTH=399,$fimg=$("#f1-imgs"),$fidx=$("#f1-index"),j=0,timer1=null;
    $fimg.css("width",F1WIDTH*5);
    $fidx.children().first().addClass("active");
    function play1(){
      timer1=setInterval(()=>{
           j++;
            $fimg.animate({left:-j*F1WIDTH},500,()=>{
                if(j==4){
                    j=0;
                    $fimg.css("left",0);
                }
                $fidx.children(":eq("+j+")").addClass("active").siblings().removeClass("active");
            })
        },WAIT);
    }
        play1();
        //鼠标进入停止动画
     $("#f1-slider").hover(()=>{
         clearInterval(timer1);
         timer1=null;
     },()=>play1());
        //序号悬停状态
        $fidx.on("mouseenter","li",(e)=>{
            var $tar=$(e.target);
              moved=$tar.index();
            $fimg.stop(true).animate({left:-moved*F1WIDTH},
                500,()=>{
                    $tar.addClass("active").siblings().removeClass("active");
                })
        });

    //3f 个护美妆
    var $fimg2=$("#f2-imgs"),$fidx2=$("#f2-index"),j2=0,timer2=null;
    $fimg2.css("width",F1WIDTH*5);
    $fidx2.children().first().addClass("active");
    function play2(){
        timer2=setInterval(()=>{
            j2++;
            $fimg2.animate({left:-j*F1WIDTH},500,()=>{
                if(j2==4){
                    j2=0;
                    $fimg2.css("left",0);
                }
                $fidx2.children(":eq("+j+")").addClass("active").siblings().removeClass("active");
            })
        },WAIT);
    }
    play2();
    //鼠标进入停止动画
    $("#f2-slider").hover(()=>{
        clearInterval(timer2);
        timer2=null;
    },()=>play2());
    //序号悬停状态
    $fidx2.on("mouseenter","li",(e)=>{
        var $tar=$(e.target);
        moved=$tar.index();
        $fimg2.stop(true).animate({left:-moved*F1WIDTH},
            500,()=>{
                $tar.addClass("active").siblings().removeClass("active");
            })
    });

    //搜索框监听事件
    $(window).scroll(()=>{
        var scrollTop=$("body").scrollTop();
        var a=918-innerHeight/2;
        if(scrollTop>a){
            $(".t-search").show();
            $(".aside-nav").show();
        }
        else {
            $(".t-search").hide();
            $(".aside-nav").hide();
        }
    });
    //模态框点击关闭按钮
$(".modal .close").click((e)=>{
    $(".modal").hide();
});



    //图书音像右侧按钮点击跳转
    $(".r-tab li a").click((e)=>{
        e.preventDefault();
          $(e.target).parent().addClass("active").siblings().removeClass("active");
    });
    //图书音像右侧鼠标移入移出
$(".r-list>ul>li").mouseover((e)=>{
    e.preventDefault();
    var $tar=$(e.target);
   //$tar.children(".in").css("display","none").siblings().css("display","block");
    $tar.addClass("r-select").siblings().removeClass("r-select");
});

    //楼层
    var $spans=$(".floor>header>span"),
         $elevator=$("#elevator"),
         $lis=$("#elevator>ul>li"),
          curri=-1;
    $(window).scroll(()=>{
        $spans.removeClass("hover");
        $lis.removeClass("active");
        var scrollTop=$("body").scrollTop();
        for(var i=$spans.length-1;i>=0;i--){
            var $span=$($spans.get(i));
            var offsetTop=$span.offset().top;
            if((innerHeight/2+scrollTop)>=offsetTop){
                  $span.addClass("hover");
                $($lis.get(i)).addClass("active");
                break;
            }
        }
        curri=i;
        if($spans.is(".hover"))
        $elevator.show();
        else $elevator.hide();
    });
    $lis.hover((e)=>{
        $(e.target).addClass("active")},(e)=>{
            var $tar=$(e.target);
            if($tar.index()!=curri)
            $tar.removeClass("active");
    })
     .click(function(){
            var $li=$(this);
            var $span=$($spans.get($li.index()));
            var scrollTop=$span.offset().top;
            console.log(scrollTop);
            $("body").animate({
                scrollTop:scrollTop-50
            },1000)
        });

    //返回顶部
    $(".a-tab .retop").click((e)=>{
        e.preventDefault();
        $("body").animate({
            scrollTop:0
        },1000)
    });
    //$(".a-tab .retop").click(()=>{
    //    $("body").animate({
    //        scrollTop:0
    //    },1000)
    //});


var uname=sessionStorage.getItem("uname");
if(uname!=null){
    var html=`欢迎回来 ${uname}
       <a href="#">退出</a> <b></b>
    `;
    $("#welcome").html(html);
    //更新飞牛用户名
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
    update();
}

function update(){
    $.ajax({
        type:"GET",
        url:"/cartcount",
        data:{uid:sessionStorage.getItem("uid")},
        success:function(data){
            var count=data[0].c;
            //更新购物车数量
            //更新头部购物车数量
            $(".count b").html("("+count+")");
            //更新侧面固定定位购物车
            // 数量
            $(".shop-cart .count").html(count);

        }
    });
}
//模态框收货地址显示
$(".modal-contant ul").on("click","li>a",function(e){
    e.preventDefault();
    var $tar=$(this)[0].innerHTML;
    sessionStorage.setItem("address",$tar);
   $(".modal").css("display","none");
    var html=`送货至:${$tar}
      <i class=myi></i>
    `;
    $(".ad-list>a").html(html);
});

});



