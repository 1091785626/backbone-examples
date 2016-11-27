;(function($) {
	var obj = {
		validNum: {
			regex: /^\d+(\.\d+)?$/,
			error: "请输入正确数字"
		},
		validEmail: {
			regex: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
			error: "邮箱格式不正确"
		},
		validDate: {
			regex: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
			error: "日期格式不正确"
		},
		validTime: {
			regex: /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/,
			error: "时间格式不正确"
		},
		validId: {
			regex: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
			error: "身份证格式不正确"
		},
		validPrice: {
			regex: /^([+-]?[1-9][\d]{0,3}|0)([.]?[\d]{1,2})?$/,
			error: "请输入正确金额"
		},
		validMobile:{
			regex:  /^(13[0-9]|14[5|7]|15[^4]|17[0|3|6|7|8]|18[0-9])\d{8}$/,
			//regex: /^\d+(\.\d+)?$/,
			error: "请填写正确的手机号码"
		},
		validPhone:{
			regex: /^(\(\d{3,4}\)|\d{3,4}(-|\s)?)?\d{7,8}(-\d{1,4})?$/,
			error: "请填写正确的手机号码"
		},
		validPostalCode:{
			regex: /^\d{4}$/,
			error: "请输入4位短信验证码"
		},
		validZipCode:{
			regex: /^\d{6}$/,
			error: "请输入6位邮政编码"
		},
		validWeChat: {
			regex: /^[a-zA-Z\d_]{5,}$/,
			error: "请输入正确的微信号"
		}
	};
	function dataValidity(rule) {
		return rule.required ?
			obj[rule.type].test.test(rule.value) :
			rule.value == "" || obj[rule.type].test.test(rule.value);
	}
	$.validity = function(rules) {
		var state = {
			status: !0
		};
		for (var i in rules) {
			var type = rules[i].type;
			if (typeof obj[type] == "undefined") {
				if (rules[i].required && rules[i].value == "") {
					state = {
						status: !1,
						error: rules[i].name + "必填",
						index: i
					};
					break;
				}
			} else if (!dataValidity(rules[i])) {
				state = {
					status: !1,
					error: obj[type].error,
					index: i
				};
				break;
			}
		}
		return state;
	};
})(jQuery);