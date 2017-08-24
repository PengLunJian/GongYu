/**
 * BEGIN 编写重置密码构造函数
 * Author:PengLunJian
 * Date:2017-08-02
 * @constructor 构造函数
 */
function ResetPassword() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.GET_CODE = arguments['GET_CODE'] ? arguments['GET_CODE'] : "GET_CODE";
    this.BTN_CODE = arguments['BTN_CODE'] ? arguments['BTN_CODE'] : ".form-btn.code";
    this.UPDATE_PWD = arguments['UPDATE_PWD'] ? arguments['UPDATE_PWD'] : "UPDATE_PWD";
    this.BTN_SUBMIT = arguments['BTN_SUBMIT'] ? arguments['BTN_SUBMIT'] : ".form-btn.submit";

    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        GET_CHECKCODE: "/identity/pwdresetcode",
        UPDATE_PASSWORD: "/identity/pwdreset",
    }
    sessionStorage.setItem('status',true);
    this.init();
}
/**
 * BEGIN 初始化方法
 * Author:PengLunJian
 * Date:2017-08-02
 * @returns {ResetPassword} 返回当前对象实现连缀调用
 */
ResetPassword.prototype.init = function () {
    this.exeGetCheckCode();
    this.exeUpdatePassword();
    return this;
}
/**
 * BEGIN 手机验证码校验
 * Author:PengLunJian
 * Date:2017-08-02
 * @param params 对象形参
 * @returns {boolean} 返回布尔类型
 */
ResetPassword.prototype.phoneCodeCheck = function (params) {
    var message = "";
    var result = false;
    var regExp = /^(\d{4})$/;
    if (!params) {
        message = "请输入手机验证码 ！";
    } else if (!regExp.test(params)) {
        message = "手机验证码格式不正确 ！";
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show("提示", message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 * BEGIN 新密码校验
 * Author:PengLunJian
 * Date:2017-08-02
 * @param params 对象形参
 * @returns {boolean} 返回布尔类型
 */
ResetPassword.prototype.newPasswordCheck = function (params) {
    var message = "";
    var result = false;
    var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if (!params) {
        message = "请输入新密码 ！";
    } else if (!regExp.test(params)) {
        message = "请输入8~16位包含数字和英文字母 ！";
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show("提示", message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 * BEGIN 手机号校验
 * Author:PengLunJian
 * Date:2017-08-02
 * @param params 对象形参
 * @returns {boolean} 返回布尔类型
 */
ResetPassword.prototype.phoneNumberCheck = function (params) {
    var message = "";
    var result = false;
    var regExp = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!params) {
        message = "请输入已认证手机号码 ！";
    } else if (!regExp.test(params)) {
        message = "手机号码格式不正确 ！";
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show("提示", message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 * BEGIN AJAX异步修改新密码
 * Author:PengLunJian
 * Date:2017-08-02
 * @param params 对象形参
 * @returns {ResetPassword} 返回当前对象实现连缀调用
 */
ResetPassword.prototype.ajaxRequestUpdatePwd = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['UPDATE_PASSWORD'],
        type: "POST",
        data: params,
        success: function (data) {
            if (data['succ']) {
                try {
                    var message = "重置成功！<font class='time'>3 秒</font>后自动返回登录页！";
                    messageBox.show("提示", message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    localStorage.removeItem("code");
                    localStorage.setItem('fq-password', params['password']);
                    new TimerComponent({
                        element: ".time",
                        initTime: 3,
                        complete: function () {
                            window.location.href = "login.html";
                        }
                    });
                } catch (e) {
                    messageBox.show("警告", e, MessageBoxButtons.OK, MessageBoxIcons.warning);
                }
            }
            else {
                if (localStorage.getItem("code")) {
                    messageBox.show("提示", "手机验证码输入错误 ！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
                } else {
                    messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                }
            }
        },
        error: function (e) {
            if (e.readyState > 0) {
                messageBox.show("提示", e, MessageBoxButtons.OK, MessageBoxIcons.error);
            } else {
                messageBox.show("错误", "网络异常，请检查网络 ！", MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        }
    });
    return this;
}
/**
 * BEGIN AJAX异步校对验证码
 * Author:PengLunJian
 * Date:2017-08-02
 * @param params 对象形参
 * @returns {ResetPassword} 返回当前对象实现连缀调用
 */
ResetPassword.prototype.ajaxRequestCodeCheck = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['GET_CHECKCODE'],
        type: "POST",
        data: params,
        success: function (data) {
            if (data != null) {
                try {
                    if (data['succ']) {
                        localStorage.setItem("code", data['data']['code']);
                        messageBox.show("提示", "验证码获取成功 ! 请查看您的手机 ! ", MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    } else {
                        messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    }
                } catch (e) {
                    messageBox.show("警告", e, MessageBoxButtons.OK, MessageBoxIcons.warning);
                }
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
 * BEGIN 执行验证码获取
 * Author:PengLunJian
 * Date:2017-08-02
 * @returns {ResetPassword} 返回当前对象实现连缀调用
 */
ResetPassword.prototype.exeGetCheckCode = function () {
    var _this = this;
    $(document).on("click", ".form-btn.code", function () {

        var params = _this.getParams(_this.GET_CODE);
        if (_this.phoneNumberCheck(params['phone'])) {
            new TimerComponent({
                element: ".form-btn.code",
                initTime: 60,
                complete: function () {
                    console.log(this);
                }
            });
                _this.ajaxRequestCodeCheck(params);
        }
    });
    return this;
}
/**
 * BEGIN 执行密码修改
 * Author:PengLunJian
 * Date:2017-08-02
 * @returns {ResetPassword} 返回当前对象实现连缀调用
 */
ResetPassword.prototype.exeUpdatePassword = function () {
    var _this = this;
    $(document).on("click", ".form-btn.submit", function () {
        var params = _this.getParams(_this.UPDATE_PWD);
        if (_this.phoneNumberCheck(params['phone'])) {
            if (_this.phoneCodeCheck(params['code'])) {
                if (_this.newPasswordCheck(params['password'])) {
                    _this.ajaxRequestUpdatePwd(params);
                }
            }
        }
    });
    return this;
}
/**
 * BEGIN 执行密码修改
 * Author:PengLunJian
 * Date:2017-08-02
 * @param name 名称
 * @returns {*} 返回对象形参
 */
ResetPassword.prototype.getParams = function (name) {
    var _this = this;
    var params = null;
    switch (name) {
        case _this.GET_CODE:
            params = {
                phone: $("#username").val().trim()
            }
            break;
        case _this.UPDATE_PWD:
            params = {
                code: $("#checkcode").val().trim(),
                phone: $("#username").val().trim(),
                password: $("#password").val().trim()
            }
            break;
    }
    return params;
}
/**
 * BEGIN 执行密码修改
 * Author:PengLunJian
 * Date:2017-08-02
 * @type {ResetPassword} 重置密码对象
 */
var resetPwd = new ResetPassword();

