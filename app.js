/**
 * Created by bjwsl-001 on 2017/7/24.
 */
const http=require("http");
const express=require("express");
const qs=require("qs");
const mysql=require("mysql");

var pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"fn",
    port:3306,
    connectionLimit:10
});

var app=express();
var server=http.createServer(app);
server.listen(8082);

app.use(express.static("public"));

//用户登录功能
app.post("/login.do",(req,res)=>{
    req.on("data",(data)=>{
        var str=data.toString();
        var obj=qs.parse(str);
        var u=obj.uname;
        var p=obj.upwd;
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            var sql="SELECT*FROM fn_user WHERE uname=? AND upwd=?";
            conn.query(sql,[u,p],(err,result)=>{
                if(result.length<1) {
                    res.json({code:-1,msg:"用户名或密码错误"});
                }
                else {
                    res.json({code:1,msg:"欢迎回来"+result[0].uname,uid:result[0].uid});
                }
                conn.release();
            })
        });

    })
});

//用户注册功能
app.post("/reg.do",(req,res)=>{
    req.on("data",(data)=>{
        var str=data.toString();
        var obj=qs.parse(str);
        var u=obj.uphone;
        var p=obj.upwd;
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            var sql="INSERT INTO fn_user VALUES(null,?,?)";
            conn.query(sql,[u,p],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.json({code:1,msg:"注册成功"});
                }
                else{
                    res.json({code:-1,msg:"注册失败"});
                }
                conn.release();
            })
        })
    })
});

//验证用户是否存在
app.get("/existuphone",(req,res)=>{
    var u=req.query.uphone;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql="SELECT*FROM fn_user WHERE uname=?";
        conn.query(sql,[u],(err,result)=>{
              if(err) throw err;
            if(result.length<1){
                res.json({code:1,msg:"欢迎使用"});
            }
            else{
                res.json({code:-1,msg:"该手机号码已经注册过"});
            }
            conn.release();
        })
    })
});

//产品列表,每页显示8个产品，默认第一页
app.get("/productlist",(req,res)=>{
    var pageno=req.query.pageno;
    var page=(pageno-1)*8;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql="SELECT*FROM fn_product LIMIT ?,8";
        conn.query(sql,[page],(err,result)=>{
            if(err) throw err;
              res.json(result);
            conn.release();
        })
    })
});
//获取产品总页数
app.get("/product_page",(req,res)=>{
pool.getConnection((err,conn)=>{
    if(err) throw err;
    var sql="SELECT count(*) as c FROM fn_product";
    conn.query(sql,(err,result)=>{
        if(err) throw err;
       var p=(Math.ceil(result[0].c/8));
        res.json({page:p});
        conn.release();
    })
})
});

//加入购物车
app.get("/add_cart",(req,res)=>{
    var uid=req.query.uid;
    var pid=req.query.pid;
  pool.getConnection((err,conn)=>{
      if(err) throw err;
      var sql="SELECT*FROM fn_cart WHERE pid=? AND uid=?";
      conn.query(sql,[pid,uid],(err,result)=>{
          if(err) throw(err);
          if(result.length<1){
              var sql="INSERT INTO fn_cart VALUES(null,?,?,1)";
              conn.query(sql,[pid,uid],(err,result)=>{
                  if(err) throw err;
                  res.json({code:1,msg:"添加成功数量1"});
                  conn.release();
              })
          }
          else{
              var c = parseInt(result[0].count)+1;
              var sql="UPDATE fn_cart SET count=count+1 WHERE uid=? AND pid=?";
              conn.query(sql,[uid,pid],(err,result)=>{
                  if(err) throw(err);
                  res.json({code:1,msg:"添加成功"+c});
                  conn.release();
              })
          }
      })
  })
});
//FROM fn_cart c,fn_product p WHERE c.pid=p.pid
//点击去购物车结算，跳转至购物车页面
app.get("/getcart",(req,res)=>{
  var uid=req.query.uid;
    pool.getConnection((err,conn)=>{
        if(err) throw(err);
        var sql="SELECT p.pic,p.pname,p.price,c.count,c.cid FROM fn_cart c,fn_product p WHERE c.pid=p.pid AND uid=?";
        conn.query(sql,[uid],(err,result)=>{
            if(err) throw(err);
            res.json(result);
            conn.release();
        })
    })
});

//点击删除购物车商品
app.get("/delcar",(req,res)=>{
    var cid=req.query.cid;
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql="DELETE FROM fn_cart WHERE cid=?";
        conn.query(sql,[cid],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.json({code:1,msg:"删除成功"});
            }
            else{
                res.json({code:-1,msg:"删除失败"});
            }
            conn.release();
        })
    })
});
app.get("/subcount",(req,res)=>{
    var cid=req.query.cid;
    pool.getConnection((err,conn)=>{
        if(err) throw(err);
        var sql="UPDATE fn_cart SET count=count-1 WHERE cid=?";
        conn.query(sql,[cid],(err,result)=>{
           if(err) throw err;
            if(result.affectedRows>0){
                res.json({code:1,msg:"减1成功"});
            }
            else{
                res.json({code:-1,msg:"减1失败"});
            }
            conn.release();
        })
    })
});
app.get("/addcount",(req,res)=>{
    var cid=req.query.cid;
    pool.getConnection((err,conn)=>{
        if(err) throw(err);
        var sql="UPDATE fn_cart SET count=count+1 WHERE cid=?";
        conn.query(sql,[cid],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.json({code:1,msg:"加1成功"});
            }
            else{
                res.json({code:-1,msg:"加1失败"});
            }
            conn.release();
        })
    })
});

//查询用户购物车数量
app.get("/cartcount",(req,res)=>{
    var uid=req.query.uid;
    pool.getConnection((err,$conn)=>{
        if(err) throw err;
        var sql="SELECT  sum(count) as c FROM fn_cart WHERE uid=?";
        $conn.query(sql,[uid],(err,result)=>{
            if(err) throw err;
            res.json(result);
            $conn.release();
        })
    })
});