/**
 * BEGIN 编写登录页面构造函数
 * Author:PengLunJian
 * Date:2017-08-01
 * @constructor 构造函数
 */
function LoginPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.NOT_EMPTY = arguments['NOT_EMPTY'] ? arguments['NOT_EMPTY'] : "NOT_EMPTY";
    this.AJAX_CHECK = arguments['AJAX_CHECK'] ? arguments['AJAX_CHECK'] : "AJAX_CHECK";
    this.SAVE_ACCOUNT = arguments['SAVE_ACCOUNT'] ? arguments['SAVE_ACCOUNT'] : "#checkbox";
    this.SUBMIT_BUTTON = arguments['SUBMIT_BUTTON'] ? arguments['SUBMIT_BUTTON'] : ".submit";
    
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        IDENTITY_LOGIN: "/identity/login"
    };



    this.init();
}
/**
 * BEGIN 初始化当前页面方法
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {LoginPage} 返回当前对象实现连缀调用
 */
LoginPage.prototype.init = function () {
    sessionStorage.setItem('status',true);
    this.bindAccount();
    this.submit();
    this.keyPressEnter();
    this.exeSaveLoginAccount();
    return this;

}
/**
 * BEGIN 表单非空验证
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {boolean} 返回布尔类型
 */
LoginPage.prototype.notEmptyCheck = function (params) {
    var result = false;
    var message = "";
    var phoneRegExp = /^[\d]{11}|[\d]{10}$/;
    var passwordRegExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if (!params['loginId']) {
        message = "请输入用户名 ！";
    } else if (!phoneRegExp.test(params['loginId'])) {
        message = "手机号码不正确！";
    } else if (!params['password']) {
        message = "请输入密码 ！";
    } else if (!passwordRegExp.test(params['password'])) {
        message = "请输入8~16位包含数字和英文字母 ！";
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show('提示', message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 * BEGIN 异步请求登录验证
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {LoginPage} 返回当前对象实现连缀调用
 */
LoginPage.prototype.ajaxRequestCheck = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['IDENTITY_LOGIN'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data != null) {
                try {
                    if (data['succ']) {
                        _this.saveLoginAccount(params);
                        _this.localStorageSaveData(data, params);
                    } else {
                        messageBox.show("错误", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.error);
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
 * BEGIN 使用本地存储保存登录用户信息
 * Author:PengLunJian
 * Date:2017-08-01
 * @param data 本地存储data数据
 * @param params 对象形参
 * @returns {LoginPage} 返回当前对象实现连缀调用
 */
LoginPage.prototype.localStorageSaveData = function (data, params) {
    var EXTED_DATA = data['exted'];
    var JSON_DATA = JSON.stringify(EXTED_DATA['auths']);
    localStorage.setItem('loginData', JSON_DATA);
    localStorage.setItem('isLogin', true);
    localStorage.setItem('account', params['loginId']);
    localStorage.setItem('requestKey', EXTED_DATA['requestKey']);
    localStorage.setItem('employeeCharId', EXTED_DATA['employeeCharId']);
    localStorage.setItem('departmentCharId', EXTED_DATA['departmentCharId']);
    localStorage.setItem('isValid', EXTED_DATA['isValid']);
    localStorage.setItem('phone', EXTED_DATA['phone']);
    window.location.href = 'app.html?v=' + new Date().getTime();

    return this;
}
/**
 * BEGIN 获取形参
 * Author:PengLunJian
 * Date:2017-08-01
 * @param name
 * @returns {*} 返回形参
 */
LoginPage.prototype.getParams = function (name) {
    var params = null;
    switch (name) {
        case this.NOT_EMPTY:
            params = {
                loginId: $("#username").val().trim(),
                password: $("#password").val().trim()
            }
            break;
        case this.AJAX_CHECK:
            params = {
                loginId: $("#username").val().trim(),
                password: $("#password").val().trim()
            }
            break;
    }
    return params;
}
/**
 * BEGIN 点击登录按钮
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {LoginPage} 返回当前对象实现连缀调用
 */
LoginPage.prototype.submit = function () {
    var _this = this;
    var params = null;
    $(this.SUBMIT_BUTTON).on("click", function () {
        params = _this.getParams(_this.NOT_EMPTY);
        if (_this.notEmptyCheck(params)) {
            params = _this.getParams(_this.AJAX_CHECK);
            _this.ajaxRequestCheck(params);
        }
    });
    return this;
}
/**
 * BEGIN 使用键盘触发登录按钮
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {LoginPage} 返回当前对象实现连缀调用
 */
LoginPage.prototype.keyPressEnter = function () {
    var _this = this;
    var params = null;
    $(document).on("keydown", function (e) {
        if (e.keyCode == 13) {
            params = _this.getParams(_this.NOT_EMPTY);
            if (_this.notEmptyCheck(params)) {
                params = _this.getParams(_this.AJAX_CHECK);
                _this.ajaxRequestCheck(params);
            }
        }
    })
    return this;
}
/**
 * BEGIN 保存登录账户信息
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {LoginPage} 返回当前对象实现连缀调用
 */
LoginPage.prototype.saveLoginAccount = function (params) {
    var result = $(this.SAVE_ACCOUNT).prop("checked");
    if (result) {
        localStorage.setItem("username", params['loginId']);
        localStorage.setItem("password", params['password']);
    } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }
    return this;
}
/**
 * BEGIN 点击复选框执行保存登录账户信息
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {LoginPage} 返回当前对象实现连缀调用
 */
LoginPage.prototype.exeSaveLoginAccount = function () {
    var _this = this;
    $(this.SAVE_ACCOUNT).on("click", function () {
        var params = _this.getParams(_this.NOT_EMPTY);
        _this.saveLoginAccount(params);
    });
    return this;
}
/**
 * BEGIN 绑定账户信息
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {LoginPage} 返回当前对象实现连缀调用
 */
LoginPage.prototype.bindAccount = function () {
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    if (username && password) {
        $('#username').val(username);
        $('#password').val(password);
        $("#checkbox").prop("checked", "checked");
    }
    return this;
}
/**
 *
 * @type {LoginPage} 返回当前对象实现连缀调用
 */
var loginPage = new LoginPage();

