//子菜单功能
$(function() {
    $("#list3").hide(); // 先将子菜单隐藏
    $("li:eq(2)").hover(function() { // 鼠标移动到标签时显示子菜单
        $("#list3").show();
    }, function() { // 鼠标移开标签时隐藏子菜单
        $("#list3").hide();
    });
});
// 轮播图功能
$(function() {
    var index = 0, // 当前显示的图片索引
        timer = null, // 定时器
        len = $(".img-container a").length; // 图片数量

    // 切换图片的函数
    function changeImg() {
        $('.img-container a.active').fadeOut(500, function() {
            $(this).removeClass('active');
        });
        // 将当前显示的图片元素逐渐淡出，过渡时间为 500 毫秒，淡出完成后执行回调函数。
        // 移除 ‘active’ 类样式
        $('.img-container a').eq(index).fadeIn(500, function() {
            $(this).addClass('active');
        });
        // 将目标图片元素逐渐淡入显示，过渡时间为 500 毫秒，淡入完成后执行回调函数。
        // 表示给目标图片元素添加 ‘active’ 类样式，标识该图片为当前显示图片。
        $('.dot.active').removeClass('active');
        // 将当前选中的导航圆点元素移除 ‘active’ 类样式，标识该圆点不再是当前选中的圆点。
        $('.dot').eq(index).addClass('active');
        // 给目标圆点元素添加 ‘active’ 类样式，标识该圆点为当前选中的圆点。
        // index 表示目标图片和圆点的索引位置，用来标示需要切换到哪张图片和对应的圆点。
    }
    // 启动定时器，自动切换图片
    function startTimer() {
        timer = setInterval(function() {
            index++;
            if (index == len) {
                index = 0;
            }
            changeImg();
        }, 2000);
    }
    // 停止定时器，停止自动切换图片
    function stopTimer() {
        clearInterval(timer);
    }
    // 鼠标进入轮播容器事件，停止自动播放，显示上一张下一张按钮和小圆点容器，透明度设置为100%
    $(".lunbo").mouseenter(function() {
        stopTimer();
        $(".prev,.next,.dots-container").css("opacity", "1")
            // .fadeIn();
    });
    // 鼠标离开轮播容器事件，恢复自动播放，隐藏上一张下一张按钮，透明度设置为0%，显示小圆点容器
    $(".lunbo").mouseleave(function() {
        startTimer();
        $(".prev,.next").css("opacity", "0")
            // .fadeOut();
        $(".dots-container").css("opacity", "1")
            // .fadeIn();
    });
    // 上一张按钮点击事件
    $(".prev").click(function() {
        index--;
        if (index == -1) {
            index = len - 1;
        }
        changeImg();
    });
    // 下一张按钮点击事件
    $(".next").click(function() {
        index++;
        if (index == len) {
            index = 0;
        }
        changeImg();
    });
    // 动态添加小圆点
    for (var i = 0; i < len; i++) {
        $("<span></span>").addClass("dot").appendTo(".dots-container");
        // 绑定每个小圆点的点击事件
        $(".dot").eq(i).click(function() {
            index = $(this).index();
            changeImg();
        });
    }
    // 默认选中第一张图片和第一个小圆点
    $(".img-container a:first").addClass("active");
    $(".dot:first").addClass("active");
    // 启动自动切换图片的定时器并设置导航点样式
    startTimer();
});

//退出页面跳转
$(".nav>ul li:last").click(function(){
    window.location.href='http://localhost:3000';
});


// 登录，注册
$(document).ready(function() {
    // 显示登录表单，隐藏注册表单
    $('#login-form').show();
    $('#register-form').hide();

    // 切换到登录表单
    $('#to-login').click(function() {
        $('#login-form').show();
        $('#register-form').hide();
    });

    // 切换到注册表单
    $('#to-register').click(function() {
        $('#login-form').hide();
        $('#register-form').show();
    });

// 提交登录表单
    $('#login-form').submit(function(event) {
        event.preventDefault();
        const username = $('#username-input').val();
        const password = $('#password-input').val();
        const isAdmin = $('#isAdmin-input option:selected').val(); // 增加 option:selected 来获取选中选项的值
        $.post('/login', {username,password,isAdmin},function(response) {
            if (response === 'user successful') {
                $('#login-nav').hide();
                $('#username').text(username);
                alert('你好，亲爱的' + username + '用户，欢迎来到new world！');
                window.location.href = '/home';
            } else if(response === 'admin successful')
            {
                alert('你好，尊敬的' + username + '管理员，欢迎来到管理员界面！');
                window.location.href='http://localhost:8080';
            }
            else {
                alert(response);
            }
        });
    });
// 提交注册表单
    $('#register-form').submit(function(event) {
        event.preventDefault();
        const username = $('#new-username-input').val();
        const email = $('#email-input').val();
        const password = $('#new-password-input').val();
        $.post('/register', {username, email, password}, function(response) {
            alert(response);
        });
    });
});
