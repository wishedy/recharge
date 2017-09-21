/**
 * Created by 萤火虫 on 2017/9/20.
 */
$(document).ready(function(){
    var login = {
        init:function(){
            var t = this;
            t.checkLogin();
        },
        loginWord: [
            {
                id:20170921,
                passWord:20170921
            },
            {
                id:20170921,
                passWord:20170921
            },{
                id:20170921,
                passWord:20170921
            }
        ],
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
        dialogShow: function (obj) {
            var t = this;
            var maskObj = $(".mask-modal");
            var popupContainer = $(".popupCont");
            var titleBar = popupContainer.find('.title');
            var contentBar = popupContainer.find(".content");
            titleBar.html(obj.title);
            contentBar.html(obj.text);
            maskObj.show();
            $(".closePopup").off("click").on("click", function () {
                maskObj.hide();
            });
            $('.btnEnter').off("click").on("click", function () {
                maskObj.hide();
            });

        },
        checkLogin:function(){
            var t = this;
            // console.log(localStorage.getItem("login","true"))
            if(!t.loginOnOff){
                $(".recharge-login").remove();
                $("body").append(t.loginTemplate);
                t.loginBegin();
            }else{
                return false;
            }
        },
        loginBegin:function(){
            var t = this;
            $(".recharge-login-btn").off("click").on("click",function(){
                console.log("开始");
                var loginId = parseInt($("#login-user-id").val(),10);
                var loginPassword =parseInt($("#login-user-password").val(),10);
                $.each(t.loginWord,function(i,v){
                    if((v.id===loginId)){
                        if(v.passWord===loginPassword){
                            $(".recharge-login").remove();
                            localStorage.setItem("login","true");
                            t.dialogShow({
                                title: "恭喜您登录成功！",
                                text: "登录成功"
                            });
                            return false;
                        }
                    }
                });
            });
        },
        loginOnOff:localStorage.getItem("login")?true:false
    };
    login.init();
});