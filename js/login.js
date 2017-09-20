/**
 * Created by 萤火虫 on 2017/9/20.
 */
$(document).ready(function(){
    var login = {
        init:function(){
            var t = this;
            t.checkLogin();
        },
        loginTemplate:'<div class="recharge-login" style="display:block;">'+
        '    <div class="recharge-login-container">'+
        '        <header class="recharge-login-header">请登录账号</header>'+
        '        <div class="login-operate">'+
        '            <p class="login-opreate-bar">'+
        '                <label for="login-user-id" class="login-user-id-des"></label>'+
        '                <input type="text" class="user-id" id="login-user-id" placeholder="请输入登录账号">'+
        '            </p>'+
        '            <p class="login-opreate-bar">'+
        '                <label for="login-user-password" class="login-user-password-des"></label>'+
        '                <input type="text" class="user-password" id="login-user-password" placeholder="请输入密码">'+
        '            </p>'+
        '            <p class="login-opreate-bar">'+
        '                <button class="recharge-login-btn">登录</button>'+
        '            </p>'+
        '        </div>'+
        '    </div>'+
        '</div>',
        checkLogin:function(){
            var t = this;
            if(!t.loginOnOff){
                $("body").append(t.loginTemplate);
                t.loginBegin();
            }
        },
        loginBegin:function(){
            $("#login-user-id")
        },
        loginOnOff:localStorage.getItem("login")?true:false
    }
    login.init();
});