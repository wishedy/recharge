/**
 * Created by 萤火虫 on 2017/9/16.
 */
$(document).ready(function () {
    var setDotNum = {
        templateDot: function (obj) {
            var t = this;
            var demoList = $("<div class='set-num-box'><ul class='set-num-list'></ul></div>");
            var str = "";
            for (var i = 1; i < 7; i++) {
                str += "<li class='set-num-item'>" + i + "</li>";
            }
            var dotList = $(str);
            dotList.each(function () {
                $(this).off("click").on("click", function (e) {
                    e.stopPropagation();
                    var isThis = $(this);
                    obj.addClass("hide-dot-list").find("em").html(isThis.text());
                });
            });
            demoList.find(".set-num-list").append(dotList);
            return demoList;
        },
        inputNum: function () {
            var t = this;
            t.el.inputNum.off("input propertychange").on("input propertychange", function () {
                var isThis = $(this);
                var reg = new RegExp("^[0-9]*$");
                var str = isThis.val();
                if (!reg.test(isThis.val())) {
                    isThis.val(str.substring(0, str.length - 1));
                }
                if (isThis.val().length) {
                    isThis.attr({"data-testOnOff": 'true'});
                } else {
                    isThis.attr({"data-testOnOff": 'false'});
                }
            });
            return t;
        },
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
        setDot: function () {
            var t = this;
            t.el.dotBox.off("click").on("click", function () {
                var isThis = $(this);
                isThis.removeClass("hide-dot-list");
                $(".set-num-box").remove();
                $(this).append(t.templateDot(isThis));
            });
            return t;
        },
        submit: function () {
            var t = this;
            t.el.submitBtn.off("click").on("click", function () {
                var rightObOff = true;
                $("[data-testOnOff]").each(function () {
                    if (!JSON.parse($(this).attr("data-testOnOff"))) {
                        t.dialogShow({
                            title: $(this).attr("data-warn"),
                            text: $(this).attr("placeholder")
                        });
                        rightObOff = false;
                        return false;
                    }
                });
                if (rightObOff) {
                    var numList = [];
                    $(".set-dice-num").each(function () {
                        numList.push($(this).find("em").text());
                    });
                    var dataJson = {
                        numList: numList,
                        roomId: t.el.inputNum.val()
                    };
                    $.ajax({
                        type: "GET",  //提交方式
                        url: "submit.json",//路径
                        data: JSON.stringify(dataJson),//数据，这里使用的是Json格式进行传输
                        success: function (result) {//返回数据根据结果进行相应的处理
                            if (result.onOff) {
                                t.dialogShow({
                                    title: "恭喜您设置成功！",
                                    text: $(this).find("em").text() + "房间设置成功"
                                });
                            } else {
                                t.dialogShow({
                                    title: "请您检查房间是否存在！",
                                    text: "该房间不存在"
                                });
                            }
                        }
                    });
                }
            });
        },
        init: function () {
            var t = this;
            t.setDot().inputNum().submit();
        },
        el: {
            inputNum: $("#target_uin_input"),
            dotBox: $(".set-dice-num"),
            submitBtn: $("#qqwallet_toShowPassPay")
        }
    };
    setDotNum.init();
});