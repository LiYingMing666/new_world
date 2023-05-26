const express = require('express');
const mysql = require('mysql');
const app = express();

//引用ejs
let ejs=require('ejs');
app.set('views','public/view');	//设置视图的对应目录
app.set("view engine","ejs");		//设置默认的模板引擎
app.engine('ejs', ejs.__express);		//定义模板引擎

// 创建MySQL连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cwdje496',
    database: 'myapp'
});
connection.connect();
var db=connection;

//查询全部数据
app.get("/",function(req,res){
    if(req.path==="/"){
        //发送请求(查询)
        connection.query("SELECT * FROM users",function(err,data){
            if(err){
                res.status(500).send('database error').end();
            }else{
                console.log(data);
                res.render("index.ejs",{data,path:req.originalUrl});
            }
        });
    }else{
        res.send("页面出错").end();
    }
});

//添加
app.get("/add",function(req,res){
    if(req.path==="/add"){
        console.log(req.query.id);
        //发送请求(添加)
        db.query(`INSERT INTO users (id,username,email,password) VALUES('${req.query.id}','${req.query.username}','${req.query.email}','${req.query.password}')`,function(err,data){
            if(err){
                res.status(500).send('database error').end();
            }else{
                //重定向路由路径
                res.redirect("/");
            }
        });
    }else{
        res.send("页面出错").end();
    }
});

//删除
app.get("/del",function(req,res){
    if(req.path==="/del"){
        //发送请求(删除)
        db.query(`DELETE FROM users where id='${req.query.id}'`,function(err,data){
            if(err){
                res.status(500).send('database error').end();
            }else{
                res.redirect("/?del-view");
            }
        });
    }else{
        res.send("页面出错").end();
    }
});

//修改
app.get("/up",function(req,res){
    //判断没有值时
    if(req.path==="/up"){
        console.log(req.query.id,req.query.username,req.query.password);
        if(req.query.id===""){
            res.status(500).send('请输入id号').end();
        }else if(req.query.username===""){
            db.query("SELECT * FROM users",function(err,data){
                for(var i=0;i<data.length;i++){
                    if(data[i].id===req.query.id){
                        req.query.username=data[i].username;
                        modify();
                    }
                }
            });
        }else if(req.query.password===""){
            db.query("SELECT * FROM users",function(err,data){
                for(var i=0;i<data.length;i++){
                    if(data[i].id===req.query.id){
                        req.query.password=data[i].password;
                        modify();
                    }
                }
            });
        }else if(req.query.username==="" && req.query.password===""){
            console.log("都没写呀");
            db.query("SELECT * FROM users",function(err,data){
                for(var i=0;i<data.length;i++){
                    if(data[i].id===req.query.id){
                        req.query.username=data[i].username;
                        req.query.password=data[i].password;
                        modify();
                    }
                }
            });
        }else{
            modify();
        }

        //发送请求(修改)
        function modify(){
            db.query(`UPDATE users SET username='${req.query.username}',password='${req.query.password}' where id='${req.query.id}'`,function(err,data){
                if(err){
                    res.status(500).send('database error',err).end();
                }else{
                    res.redirect("/?up-view");
                }
            });
        }
    }else{
        res.send("页面出错").end();
    }
});

// 设置静态文件目录
app.use(express.static(__dirname + '/public'));

app.listen(8080,()=>{
    console.log("express server running at http://127.0.0.1:8080/")
});

