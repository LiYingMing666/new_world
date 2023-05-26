const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cwdje496',
    database: 'myapp'
});

// 处理POST请求中的body数据
app.use(express.urlencoded({extended: true}));

// 设置静态文件目录
app.use(express.static(__dirname + '/public'));

// 页面路由
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/home1.html');
});

// 处理注册和登录的请求
app.post('/register', (req, res) => {
    const {username, email, password} = req.body;
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], (error, results) => {
        if (error) throw error;
        console.log(`User ${username} registered`);
        res.send('Registration successful');
    });
});

app.post('/login', (req, res) => {
    const {username, password,isAdmin} = req.body;
    if (isAdmin==="0")
    {
        const query = 'SELECT * FROM users WHERE username=? AND password=?';
        connection.query(query, [username, password], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                console.log(`User ${username} logged in`);
                res.send('user successful');
            } else {
                res.send('Invalid username or password');
            }
        });
    }
    else if (isAdmin==="1"){
        const query = 'SELECT * FROM users WHERE username=? AND password=? AND isAdmin=?';
        connection.query(query, [username, password, isAdmin], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                console.log(`admin ${username} logged in`);
                res.send('admin successful');
            } else {
                res.send('Invalid username or password');
            }
        });
    }
    else
    {
        res.send('invalid isAdmin');
    }
});

// 处理退出登录的请求
app.get('/logout', (req, res) => {
    console.log('User logged out');
    res.send('Logout successful');
});

// 监听端口
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));