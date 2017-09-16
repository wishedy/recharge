/**
 * Created by 萤火虫 on 2017/9/16.
 */
var recharge = {
    init: function (i) {
        var t = this;
        t.data.postType = i;
        if (i === 1) {
            t.data.des = "钻石";
        } else {
            t.data.des = "金币";
        }
        t.idInput().amountInput().add().minus().submit();
    },
    data: {
        postType: null,
        des: ""
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
    add: function () {
        var t = this;
        t.el.addBtn.off("click").on("click", function () {
            console.log(JSON.parse(t.el.amount.attr("data-testOnOff")))
            if (JSON.parse(t.el.amount.attr("data-testOnOff"))) {
                var num = Number(t.el.amount.val());
                num++;
                console.log(num)
                t.el.amount.val(num);
                t.el.amount.attr({"data-testOnOff": "true"});
            } else {
                t.el.amount.val(1);
                t.el.amount.attr({"data-testOnOff": "true"});
            }
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
                var dataJson = {
                    id: t.el.idInput.val(),
                    amount: t.el.amount.val(),
                    postType: t.data.postType
                };
                $.ajax({
                    type: "GET",  //提交方式
                    url: "..//submit.json",//路径
                    data: JSON.stringify(dataJson),//数据，这里使用的是Json格式进行传输
                    success: function (result) {//返回数据根据结果进行相应的处理
                        console.log(result)
                        if (result.onOff) {
                            t.dialogShow({
                                title: "恭喜您充值成功！",
                                text: t.el.amount.val() + "个" + t.data.des + "充值成功"
                            });
                        } else {
                            t.dialogShow({
                                title: "请您检查充值ID是否正确！",
                                text: "该用户ID不存在"
                            });
                        }
                    }
                });
            }
        });
        return t;
    },
    minus: function () {
        var t = this;
        t.el.minusBtn.off("click").on("click", function () {
            if (JSON.parse(t.el.amount.attr("data-testOnOff"))) {
                var num = Number(t.el.amount.val());
                num--;
                if (num < 1) {
                    t.el.amount.val("");
                    t.el.amount.attr({"data-testOnOff": "false"});
                } else {
                    t.el.amount.val(num);
                    t.el.amount.attr({"data-testOnOff": "true"});

                }
            } else {
                t.el.amount.val(1);
                t.el.amount.attr({"data-testOnOff": "true"});
            }
        });
        return t;
    },
    amountInput: function () {
        var t = this;
        t.inputListen(t.el.amount);
        return t;
    },
    idInput: function () {
        var t = this;
        t.inputListen(t.el.idInput);
        return t;
    },
    inputListen: function (obj) {
        var t = this;
        obj.off("input propertychange").on("input propertychange", function () {
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
    el: {
        submitBtn: $("#qqwallet_toShowPassPay"),
        idInput: $("#target_uin_input"),
        amount: $("#amount_input"),
        addBtn: $(".add-right"),
        minusBtn: $(".add-left")
    }
};
