/**
 * Created by Administrator on 2017/7/30.
 */
$(function(){
    $("#foot-content").load("footer.html");
});
$.ajax({
    type:"GET",
    url:"/getcart",
    data:{uid:sessionStorage.getItem("uid")},
    success:function(data){
        var html="";
        for(var i=0;i<data.length;i++){
            var obj=data[i];
            html+=`
            <tr>
                      <td>
                          <input type="checkbox" class="listc"/>
                          <div class="lf"><img src="${obj.pic}" alt=""/></div>
                      </td>
                      <td><a href="#">${obj.pname}</a></td>
                      <td class="price">￥<span>${obj.price}</span></td>
                      <td>
                          <button class="${obj.cid}">-</button>
                          <input type="text" value="${obj.count}"/>
                          <button class="${obj.cid}">+</button>
                      </td>
                      <td class="to">￥<span class="subcount">${obj.price*obj.count}</span></td>
                      <td><a href="${obj.cid}" class="btn-del">删除</a></td>
                  </tr>

            `;
        }
        $("#cart-image").html(html);
    }
});

//点击删除，异步删除购物车
$("#cart-image").on("click","a.btn-del",(e)=>{
    e.preventDefault();
   $tar=$(e.target);
    var cid=$tar.attr("href");
    var tr=$tar.parent().parent();
    var rs=confirm("确定要删除该商品吗？");
    if(!rs){
        return;
    }
    $.ajax({
        type:"GET",
        url:"/delcar",
        data:{cid:cid},
        success:function(data){
             console.log(data);
            if(data.code>0){
                alert(data.msg);
                tr.remove();
            }
           else{
                alert(data.msg);
            }
        }
    });
});
//点击加减添加购物车表
//减1
$("#cart-image").on("click","button:contains('-')",function(e){
  var cid=$(this).attr("class");
    var count=$(this).next();
    var tcount=$(this).parent().next().children("span");
    var price=$(this).parent().prev().children("span");
    if(count.val()>=2){
    $.ajax({
        type:"GET",
        url:"/subcount",
        data:{cid:cid},
        success:function(data){
            if(data.code>0){
                alert(data.msg);
                //修改数量
               count.val(count.val()-1);
                //修改小计
                var t=count.val()*price.html();
                tcount.html(t);
            }
        }
     })
    }
});
//加1
$("#cart-image").on("click","button:contains('+')",function(e){
    var cid=$(this).attr("class");
    var count=$(this).prev();
    var tcount=$(this).parent().next().children("span");
    var price=$(this).parent().prev().children("span");
        $.ajax({
            type:"GET",
            url:"/addcount",
            data:{cid:cid},
            success:function(data){
                if(data.code>0){
                    alert(data.msg);
                    //修改数量
                    count.val(parseInt(count.val())+1);
                    //修改小计
                    var t=count.val()*price.html();
                    tcount.html(t);
                }
            }
        })

});

//购物车总计,全选按钮
$("#selectAll").change(function(){
    var lists=$("#cart-image input.listc");
    if(($(this)).prop("checked")){
        lists.prop("checked",true);
        var sum=0;
        var subcount=$(".subcount");
        for(var i=0;i<lists.length;i++){
            sum+=parseFloat(subcount[i].innerHTML);
        }
        sum=sum.toFixed(2);
        $(".count-details").html(sum);
    }
    else{
        lists.prop("checked",false);
        $(".count-details").html(0.00);
    }
});
//购物车总计,不全选
$("#cart-image ").on("change",".listc",function(){
    var sum=parseFloat($(".count-details").html()).toFixed(2);
     var subc=parseFloat($(this).parent().siblings(".to").children("span").text()).toFixed(2);
    if($(this).prop("checked")){
        sum+= subc;
        $(".count-details").html(sum);
    }
    else{
        sum= parseFloat(sum-subc).toFixed(2);
        $(".count-details").html(sum);
    }
    var list=$(this).parent("tr").children(".listc");
    var lists=$("#cart-image input.listc");
    var b=0;
    for(var i=0;i<lists.length;i++){
      var c=$(lists[i]).prop("checked");
        b+=Number(c);
        if(b==lists.length){
         $("#selectAll").prop("checked",true);
        }
        else{
            $("#selectAll").prop("checked",false);
        }
    }
       });
var uname=sessionStorage.getItem("uname");
if(uname!=null){
    user.innerHTML="Hi, "+uname;
}