/**
 *构造函数
 * @constructor
 */
function PersonalPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.PWDCHANGE = arguments['PWDCHANGE'] ? arguments['PWDCHANGE'] : 'PWDCHANGE';
    this.VALID = arguments['VALID'] ? arguments['VALID'] : 'VALID';

    this.GET_CODE = arguments['GET_CODE'] ? arguments['GET_CODE'] : "GET_CODE";
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        GET_CHECKCODE: "/identity/phonevalidcode",
        PWD_CHANGE: "/identity/pwdresetuser",
        VALID: "/identity/phonevalid"
    };
    this.init();
}

/**
 *页面初始化
 * @returns {PersonalPage}
 */
PersonalPage.prototype.init = function () {
    $('.nav2-ownercenter ul li').on('click', function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        var ownercenter_dvindex = $('.nav2-ownercenter ul li').index($(this));
        $('.fq-contain-dv>div').hide();
        $('.fq-contain-dv>div').eq(ownercenter_dvindex).show();
        $("#validYzm").val("");
    });
    $("#empPhone").text(localStorage.getItem("phone"));

    $(function () {
        personal.validBind();
    });

    this.exeGetCheckCode();
    return this;
}

/**
 *参数
 * @param name
 * @returns {*}
 */
PersonalPage.prototype.getParams = function (name) {
    var _this = this;
    var params = null;
    switch (name) {
        case _this.GET_CODE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                phone: $("#empPhone").html().trim()
            }
            break;
        // 密码修改
        case this.PWDCHANGE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                employeeCharId: localStorage.getItem("employeeCharId"),
                oldPwd: $("#OldPwd").val(),
                newPwd1: $("#NewPwd1").val(),
                newPwd2: $("#NewPwd2").val()
            };
            break;
        // 手机验证
        case this.VALID:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                phone: $("#empPhone").text(),
                code: $('#validYzm').val()
            };
            break;
    }
    return params;

}


/**
 *认证基础数据绑定
 * @returns {PersonalPage}
 */
PersonalPage.prototype.validBind = function () {
    var _this = this;
    var txt = "";
    if (localStorage.getItem("isValid") != 1) {
        txt = "（未认证）";
    }
    else {
        txt = "（已认证）";
        _this.certified();
    }
    $("#IsValid").text(txt);
    $(".hidden-xs").text(txt);
    return this;
}
/**
 * Author:liyong
 * Date:2017-8-15
 * 已认证
 * @returns {PersonalPage}
 */
PersonalPage.prototype.certified = function () {
    $('.fq-btn-yzm1').hide();
    $('.rz-table tr').eq(0).show().siblings('tr').hide();
    return this;
}


/**
 * 手机认证
 * @returns {PersonalPage}
 */
PersonalPage.prototype.valid = function () {
    var _this = this;
    if (localStorage.getItem('code') == $('#validYzm').val()) {//zhrong0303判断验证码是否正确
        _this.ajaxRequestValid(_this.getParams(_this.VALID));
    }
    else {
        messageBox.show("错误", "验证码不正确 ！", MessageBoxButtons.OK, MessageBoxIcons.error);
    }
    return this;
}

/**
 * 密码修改
 * @returns {PersonalPage}
 */
PersonalPage.prototype.pwdChange = function () {
    var params = {
        oldPassword: $("#OldPwd").val(),
        newPassword: $("#NewPwd1").val().trim()
    }
    var _this = this;
    if (params.oldPassword == '') {
        messageBox.show("警告", "请输入旧密码！", MessageBoxButtons.OK, MessageBoxIcons.warning);
    } else if (regular.check(regular.PWD_REG_EXP, params.newPassword)) {
        messageBox.show("警告", "请输入8-16位新密码！", MessageBoxButtons.OK, MessageBoxIcons.warning);
    } else if (params.oldPassword == params.newPassword) {
        messageBox.show("提示", "新密码不能与当前密码相同！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
    } else {
        _this.ajaxRequestPwdChange(_this.getParams(_this.PWDCHANGE))
    }
    return this;
}

/**
 * 密码修改ajax
 * @param params
 * @returns {PersonalPage}
 */
PersonalPage.prototype.ajaxRequestPwdChange = function (params) {
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['PWD_CHANGE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var msg = data['msg'] + ",请重新登录!";
                messageBox.show("提示", msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                messageBox.confirm(function () {
                    params['oldPwd'] = '';
                    params = webApp.getParams(webApp.LOGIN_OUT);
                    webApp.ajaxRequestWebAppExit(params);
                });
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

/**
 * 手机认证ajax
 * @param params
 * @returns {PersonalPage}
 */
PersonalPage.prototype.ajaxRequestValid = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['VALID'],
        type: "POST",
        data: params,
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
//                        liyong认证成功后刷新页面
                localStorage.setItem("isValid", 1);
                _this.validBind();
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (e) {
            if (e.readyState > 0) {
                messageBox.show("错误", e, MessageBoxButtons.OK, MessageBoxIcons.error);
            } else {
                messageBox.show("错误", "网络异常，请检查网络 ！", MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        }
    });
    return this;
}



/**
 *触发获取验证码按钮
 * @returns {PersonalPage}
 */
PersonalPage.prototype.exeGetCheckCode = function () {
    var _this = this;
    $(document).on("click", ".form-btn.code", function () {
        new TimerComponent({
            element: ".form-btn.code",
            initTime: 60,
            complete: function () {
                console.log('complete');
            }
        });
        var params = _this.getParams(_this.GET_CODE);
        _this.ajaxRequestCodeCheck(params);
    });
    return this;
}


/**
 * Author:liyong
 * Date:2017-8-15
 * 获取验证码
 * @param params
 * @returns {PersonalPage}
 */
PersonalPage.prototype.ajaxRequestCodeCheck = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['GET_CHECKCODE'],
        type: "POST",
        data: params,
        success: function (data) {
            if (data['succ']) {
                localStorage.setItem("code", data['data']['code']);
                messageBox.show("提示", "验证码获取成功 ! 请查看您的手机 ! ", MessageBoxButtons.OK, MessageBoxIcons.infomation);
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (e) {
            if (e.readyState > 0) {
                messageBox.show("错误", e, MessageBoxButtons.OK, MessageBoxIcons.error);
            } else {
                messageBox.show("错误", "网络异常，请检查网络 ！", MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        }
    });
    return this;
}

var personal = new PersonalPage();


