
$(function(){
    $("#pdetail-header").load("header.html");
    $("#pdetail-footer").load("footer.html");
});
/*放大镜*/
/*底部小图片的左右移动*/
var LIWIDTH=62;
var OFFSET=20;
var moved=0;
var ulList=
    document.getElementById("icon_list");
var aForward=
    document.querySelector(".forward");
var aBackward=
    document.querySelector(".backward");

//如果ulList下的li个数<=5
if(ulList.children.length<=5)
//为class为forward的a添加disabled class
    aForward.className+=" disabled";
//为class为forward的a绑定单击事件
aForward.onclick=function(){
    if(this.className.indexOf("disabled")==-1){
        moved++;
        ulList.style.left=
            -moved*LIWIDTH+OFFSET+"px";
        checkA();
    }
};
//为class为backward的a绑定单击事件
aBackward.onclick=function(){
    if(this.className.indexOf("disabled")==-1){
        moved--;//将moved-1
        ulList.style.left=//重新计算ulList的left
            -moved*LIWIDTH+OFFSET+"px";
        checkA();
    }
}
//专门负责检查并修改两个a的状态
function checkA(){
    if(moved==0)
        aBackward.className="backward disabled";
    else if(ulList.children.length-moved==5)
        aForward.className="forward disabled";
    else{
        aForward.className="forward";
        aBackward.className="backward";
    }
}
/*鼠标进入小图片，切换显示中图片*/
var mImg=document.getElementById("mImg");
//利用冒泡，为ulList统一绑定一次鼠标进入事件
ulList.onmouseover=function(e){
    if(e.target.nodeName=="IMG"){
        //获得当前图片的src
        var src=e.target.src;
        //查找最后一个.的位置
        var i=src.lastIndexOf(".");
        //设置mImg的src为:
        mImg.src=src.slice(0,i)+"-m"+src.slice(i);
        //选取src中0~i之前的子字符串
        //+ -m
        //+ src中i到结尾的剩余子字符串
    }
};
/*让mask跟随鼠标移动*/
var mask=document.getElementById("mask");
var sMask=document.getElementById("superMask");
var MSIZE=175;
var largeDiv=document.getElementById("largeDiv");
//为sMask绑定鼠标进入和鼠标移出事件
sMask.onmouseover=function(){
    mask.style.display="block";
    largeDiv.style.display="block";
    //根据mImg的src，修改largeDiv的背景图片
    var src=mImg.src;
    var i=src.lastIndexOf(".");
    src=src.slice(0,i-1)+"l"+src.slice(i);
    largeDiv.style.backgroundImage=
        "url("+src+")";
};
sMask.onmouseout=function(){
    mask.style.display="none";
    largeDiv.style.display="none";
};
//为sMask绑定鼠标移动事件
sMask.onmousemove=function(e){
    var top= e.offsetY-MSIZE/2;
    var left= e.offsetX-MSIZE/2;
    if(top<0) top=0;
    else if(top>175) top=175;
    if(left<0) left=0;
    else if(left>175) left=175;
    mask.style.top=top+"px";
    mask.style.left=left+"px";
    largeDiv.style.backgroundPosition=
        -16/7*left+"px "+ -16/7*top+"px";
};

