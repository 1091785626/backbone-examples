;(function(e) {
    function n(e) {
        return e.required ? t[e.type].test.test(e.value) : e.value == "" || t[e.type].test.test(e.value);
    }
    var t = {
        num: {
            test: /^\d+(\.\d+)?$/,
            error: "请输入正确数字"
        },
        email: {
            test: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            error: "邮箱格式不正确"
        },
        date: {
            test: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
            error: "日期格式不正确"
        },
        time: {
            test: /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/,
            error: "时间格式不正确"
        },
        id_no: {
            test: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
            error: "身份证格式不正确"
        },
        mobile: {
            test: /^\d+(\.\d+)?$/,
            error: "手机号码只能为数字"
        },
        price: {
            test: /^([+-]?[1-9][\d]{0,3}|0)([.]?[\d]{1,2})?$/,
            error: "请输入正确金额"
        },
        validMobile:{
            test:  /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|6|7|8]|18[0-9])\d{8}$/,
            //test: /^\d+(\.\d+)?$/,
            error: "请填写正确的手机号码"
        },
        validPhone:{
            test: /^(\(\d{3,4}\)|\d{3,4}(-|\s)?)?\d{7,8}(-\d{1,4})?$/,
            error: "请填写正确的手机号码"
        },
        validPostalCode:{
            test: /^\d{4}$/,
            error: "请输入4位短信验证码"
        }
    };
    e.validity = function(e) {
        var r = {
            status: !0
        };
        for (var i in e) {
            var s = e[i].type;
            if (typeof t[s] == "undefined") {
                if (e[i].required && e[i].value == "") {
                    r = {
                        status: !1,
                        error: e[i].name + "必填",
                        index: i
                    };
                    break;
                }
            } else if (!n(e[i])) {
                r = {
                    status: !1,
                    error: t[s].error,
                    index: i
                };
                break;
            }
        }
        return r;
    };
})(jQuery);