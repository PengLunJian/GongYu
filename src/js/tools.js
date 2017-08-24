var HOST_CONFIG = {
    ON_LINE: "http://apt.xpchina.net",//线上
    ON_TEST: "http://apttest.xpchina.net",//测试
    ON_DEVELOP: "http://aptdevelop.xpchina.net",//开发
}

window.host = HOST_CONFIG.ON_DEVELOP;

var LOGIN_DATA = JSON.parse(localStorage.getItem('loginData'));
/**
 * BEGIN 权限控制功能
 * Author:LiYong
 * Date:2017-06-20
 * @constructor 权限构造函数
 */
function Grant() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.result = arguments['result'] ? arguments['result'] : false;
    this.config = arguments['config'] ? arguments['config'] : null;
    this.errorHTML = arguments['errorHTML'] ? arguments['errorHTML'] : "error.html";
    this.grantCheck();
}
/**
 * BEGIN 获取客户端请求的HTML文件名
 * Author:LiYong
 * Date:2017-06-20
 * @returns {string} 返回URI
 */
Grant.prototype.getRequestHtml = function () {
    const CONST_EXNAME = '.html';
    var url = window.location.href;
    var BEGIN_INDEX = url.lastIndexOf('/') + 1;
    var END_INDEX = url.lastIndexOf(CONST_EXNAME) + CONST_EXNAME.length;
    var URI = url.substring(BEGIN_INDEX, END_INDEX);
    return URI;
}
/**
 * BEGIN 匹配访问的HTML是否存在权限配置文件中
 * Author:LiYong
 * Date:2017-06-20
 * @returns {boolean|*} 返回布尔类型
 */
Grant.prototype.getResult = function () {
    var URI = this.getRequestHtml();
    var regExp = new RegExp(URI, 'g');
    if (regExp.test(this.config)) {
        this.result = true;
    }
    return this.result;
}
/**
 * BEGIN 根据匹配结果实现相应操作
 * Author:LiYong
 * Date:2017-06-20
 * @returns {Grant} 返回权限对象实现连缀调用
 */
Grant.prototype.grantCheck = function () {
    var TEMP_OBJ = LOGIN_DATA['Menus'];
    var RESULT = this.getResult();
    var URI = this.getRequestHtml();
    if (RESULT) {
        var FLAG = false;
        for (var i = 0; i < TEMP_OBJ.length; i++) {
            if (URI == TEMP_OBJ[i]['Url'].trim()) {
                FLAG = true;
            }
        }
        if (!FLAG) {
            window.location.href = this.errorHTML;
        }
    }
    return this;
}
/**
 * BEGIN 匹配访问的HTML是否存在权限配置文件中
 * Author:LiYong
 * Date:2017-06-20
 */
if (LOGIN_DATA) {
    new Grant({
        result: false,
        config: "desktop.html,property.html," +
        "customer.html,contract.html,bill.html," +
        "count.html,grant.html,employee.html," +
        "system.html,log.html"
    });
}
/**
 * BEGIN 编写计时器插件
 * Author:PengLunJian
 * Date:2017-05-10
 * @constructor 计时器构造函数
 */
function TimerComponent() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.timer = arguments['timer'] ? arguments['timer'] : null;
    this.element = arguments['element'] ? arguments['element'] : "";
    this.initTime = arguments['initTime'] ? arguments['initTime'] : 60;
    this.flagTime = arguments['initTime'] ? arguments['initTime'] : 60;
    this.complete = arguments['complete'] ? arguments['complete'] : null;

    this.init();
}
/**
 * BEGIN 计时器初始化方法
 * Author:PengLunJian
 * Date:2017-05-10
 * @returns {TimerComponent}
 */
TimerComponent.prototype.init = function () {
    this.startTimer();
    return this;
}
/**
 * BEGIN 启动计时器
 * Author:PengLunJian
 * Date:2017-05-10
 * @returns {TimerComponent}
 */
TimerComponent.prototype.startTimer = function () {
    var _this = this;
    $(_this.element).addClass("disabled");
    $(_this.element).attr("disabled", "disabled");
    _this.timer = setTimeout(function () {
        _this.initTime--;
        $(_this.element).html(_this.initTime + " 秒");
        _this.startTimer();
        if (_this.initTime <= 0) _this.stopTimer();
    }, 1000);
    return this;
}
/**
 * BEGIN 关闭计时器
 * Author:PengLunJian
 * Date:2017-05-10
 * @returns {TimerComponent}
 */
TimerComponent.prototype.stopTimer = function () {
    clearInterval(this.timer);
    this.initTime = this.flagTime;
    $(this.element).html("重新获取");
    $(this.element).removeClass("disabled");
    $(this.element).removeAttr("disabled");
    if ('function' == typeof this.complete) this.complete();
    return this;
}
/**
 *
 * @constructor
 */
function TabComponent() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.active = arguments['active'] ? arguments['active'] : 'active';
    this.element = arguments['element'] ? arguments['element'] : '.tab';
    this.changeEnd = arguments['changeEnd'] ? arguments['changeEnd'] : function () {

    }

    this.init();
}
/**
 *
 * @returns {TabComponent}
 */
TabComponent.prototype.init = function () {
    this.tabClick();
    return this;
}
/**
 *
 * @returns {TabComponent}
 */
TabComponent.prototype.tabClick = function () {
    var _this = this;
    $(document).on('click', this.element, function () {
        $(this).parent().find(_this.element).removeClass(_this.active);
        $(this).addClass(_this.active);
        if ('function' == typeof _this.changeEnd) {
            _this.changeEnd(this);
        }
    });
    return this;
}
/**
 *
 * @constructor
 */
function ModalPanel() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.panelSm = arguments['panelSm'] ? arguments['panelSm'] : ".panel-sm";
    this.panelLg = arguments['panelLg'] ? arguments['panelLg'] : ".panel-lg";
    this.panelBg = arguments['panelBg'] ? arguments['panelBg'] : ".panel-bg";
    this.btnCancel = arguments['btnCancel'] ? arguments['btnCancel'] : ".panel .btn.cancel";

    this.init();
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.init = function () {
    this.autoShowPanel();
    this.panelBgClick();
    this.btnCancelClick();
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.autoShowPanel = function () {
    var _this = this;
    $(document).on("click", "[data-panel='panel-sm']", function () {
        var PANEL_INDEX = parseInt($(this).attr("data-index").trim());
        _this.manualShowPanel({
            index: PANEL_INDEX,
            element: ".panel-sm"
        });
    });
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.manualShowPanel = function () {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    var SELECTOR = arguments['element'] + " .panel-modal:eq(" + arguments['index'] + ")";
    $(arguments['element'] + " .panel-modal").removeClass("show");
    $(SELECTOR).addClass("show");
    $(arguments['element']).removeClass("hide");
    if ("function" == typeof arguments['complete']) arguments['complete']();
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.hideSmPanel = function () {
    $(this.panelSm).addClass("hide");
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.hideLgPanel = function () {
    $(this.panelLg).addClass("hide");
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.btnCancelClick = function () {
    var _this = this;
    $(document).on("click", this.btnCancel, function () {
        if ($(this).parents(".panel").hasClass("panel-sm")) {
            _this.hideSmPanel();
        } else if ($(this).parents(".panel").hasClass("panel-lg")) {
            _this.hideLgPanel();
        }
    });
    return this;
}
/**
 *
 * @returns {ModalPanel}
 */
ModalPanel.prototype.panelBgClick = function () {
    var _this = this;
    $(document).on("click", this.panelBg, function () {
        if ($(this).parents(".panel").hasClass(_this.panelLg.substring(1))) {
            _this.hideLgPanel();
        } else {
            _this.hideSmPanel();
        }
    });
    return this;
}
/**
 *
 * @type {ModalPanel}
 */
var mp = new ModalPanel();
/**
 *
 * @constructor
 */
function TreeMenu() {
    this.ACTIVE = arguments['ACTIVE'] ? arguments['ACTIVE'] : "active";
    this.TREE_ITEM = arguments['TREE_ITEM'] ? arguments['TREE_ITEM'] : ".tree-item";
    this.TREE_MENU = arguments['TREE_MENU'] ? arguments['TREE_MENU'] : ".tree-menu";
    this.TREE_TEXT = arguments['TREE_TEXT'] ? arguments['TREE_TEXT'] : ".tree-text";
    this.FORM_SELECT = arguments['FORM_SELECT'] ? arguments['FORM_SELECT'] : ".form-select";
    this.SELECT_OPTION = arguments['SELECT_OPTION'] ? arguments['SELECT_OPTION'] : ".select-option";
    this.SELECT_RESULT = arguments['SELECT_RESULT'] ? arguments['SELECT_RESULT'] : ".select-result";
    this.TREE_CONTAINER = arguments['TREE_CONTAINER'] ? arguments['TREE_CONTAINER'] : ".tree-container";

    this.init();
}
/**
 *
 * @returns {TreeMenu}
 */
TreeMenu.prototype.init = function () {
    this.showFormSelect();
    this.formSelectBlur();
    return this;
}
/**
 *
 * @returns {TreeMenu}
 */
TreeMenu.prototype.clickTreeItem = function (fn) {
    var _this = this;
    $(document).on("click", this.TREE_ITEM, function (ev) {
        ev = ev || window.event;
        if ($(this).hasClass("show")) {
            $(this).removeClass("show");
        } else {
            $(this).addClass("show");
        }
        var $_parent = $(this).parents(_this.TREE_CONTAINER).eq(0);
        $_parent.find(_this.TREE_ITEM).removeClass(_this.ACTIVE);
        $(this).addClass(_this.ACTIVE);
        var $_select = $(this).parents(_this.SELECT_OPTION).prev().eq(0);
        if (undefined != $_select[0]) {
            $_select.text($(this).find(_this.TREE_TEXT).eq(0).text().trim());
        } else {
            if ('function' == typeof fn) fn();
        }
        ev.stopPropagation();
    });
    return this;
}
/**
 *
 * @returns {TreeMenu}
 */
TreeMenu.prototype.showFormSelect = function () {
    $(this.SELECT_RESULT).on("click", function () {
        var $_parent = $(this).parent();
        if ($_parent.hasClass("hide")) {
            $_parent.removeClass("hide");
        } else {
            $_parent.addClass("hide");
        }
    });
    return this;
}
/**
 *
 * @returns {TreeMenu}
 */
TreeMenu.prototype.formSelectBlur = function () {
    $(this.FORM_SELECT).on("blur", function () {
        $(this).addClass("hide");
    });
    return this;
}
/**
 *
 * @param params
 * @returns {string}
 */
TreeMenu.prototype.getTemplate = function (params) {
    var TEMP_HTML = '<ul class="tree-block show">';
    $(params).each(function () {
        var JSON_LEVEL_ONE = this;
        TEMP_HTML += '<li data-value="' + JSON_LEVEL_ONE['CharId'] + '" data-level="' + JSON_LEVEL_ONE['LevelIn'] + '" class="tree-item">' +
            '<i class="tree-icon icon-right-triangle"></i><span class="tree-text">' + JSON_LEVEL_ONE['Name'] + '</span>' +
            '<div class="tree-menu"><ul class="tree-block">';
        for (var j = 0; j < JSON_LEVEL_ONE['ChildDpts'].length; j++) {
            var JSON_LEVEL_TWO = params['ChildDpts'][j];
            TEMP_HTML += '<li data-value="' + JSON_LEVEL_TWO['CharId'] + '" data-level="' + JSON_LEVEL_TWO['LevelIn'] + '" class="tree-item">' +
                '<i class="tree-icon icon-right-triangle"></i><span class="tree-text">' + JSON_LEVEL_TWO['Name'] + '</span>' +
                '<div class="tree-menu"><ul class="tree-block">';
            for (var k = 0; k < JSON_LEVEL_TWO['ChildDpts'].length; k++) {
                var JSON_LEVEL_THREE = JSON_LEVEL_TWO['ChildDpts'][k];
                TEMP_HTML += '<li data-value="' + JSON_LEVEL_THREE['CharId'] + '" data-level="' + JSON_LEVEL_THREE['LevelIn'] + '" class="tree-item">' +
                    '<i class="tree-icon icon-organize"></i><span class="tree-text">' + JSON_LEVEL_THREE['Name'] + '</span></li>';
            }
            TEMP_HTML += '</ul></div></li>';
        }
        TEMP_HTML += '</ul></div></li>';
    });
    TEMP_HTML += '</ul>';
    return TEMP_HTML;
}
/**
 *
 * @type {TreeMenu}
 */
var tm = new TreeMenu();
/**
 *
 * @constructor
 */
function Tools() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.flag = arguments['flag'] ? arguments['flag'] : false;
    this.context = arguments['context'] ? arguments['context'] : "收起日历";
    this.element = arguments['element'] ? arguments['element'] : ".btn-drop";
    this.targetElement = arguments['targetElement'] ? arguments['targetElement'] : ".group-drop";

    this.init();
}
/**
 *
 * @returns {Tools}
 */
Tools.prototype.init = function () {
    var _this = this;
    $(this.element).on("click", function () {
        if (_this.flag) {
            _this.flag = false;
            _this.context = "收起日历";
            $(_this.targetElement).removeClass("hide");
        } else {
            _this.flag = true;
            _this.context = "打开日历";
            $(_this.targetElement).addClass("hide");
        }
        $(this).text(_this.context);
    });
    return this;
}
/**
 *
 * @constructor
 */
function WebApp() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.APP_BG = arguments['APP_BG'] ? arguments['APP_BG'] : ".app-bg";
    this.LOGIN_OUT = arguments['LOGIN_OUT'] ? arguments['LOGIN_OUT'] : "LOGIN_OUT";
    this.LG_NAV_BAR = arguments['LG_NAV_BAR'] ? arguments['LG_NAV_BAR'] : ".lg-nav";
    this.SM_NAV_BAR = arguments['SM_NAV_BAR'] ? arguments['SM_NAV_BAR'] : ".sm-nav";
    this.DROP_BODY = arguments['DROP_BODY'] ? arguments['DROP_BODY'] : ".drop-body";
    this.DROP_RESULT = arguments['DROP_RESULT'] ? arguments['DROP_RESULT'] : ".drop-result";
    this.DROP_OPTION = arguments['DROP_OPTION'] ? arguments['DROP_OPTION'] : ".drop-option";
    this.COMPANY_NAME = arguments['COMPANY_NAME'] ? arguments['COMPANY_NAME'] : ".header h1";
    this.BTN_EXIT = arguments['BTN_EXIT'] ? arguments['BTN_EXIT'] : ".right-oprea>li:eq(1)>a";
    this.BIND_COMPANY = arguments['BIND_COMPANY'] ? arguments['BIND_COMPANY'] : "BIND_COMPANY";
    this.TEMPLATE = arguments['TEMPLATE'] ? arguments['TEMPLATE'] : "<div class='app-bg'></div>";
    this.DROP_CONTAINER = arguments['DROP_CONTAINER'] ? arguments['DROP_CONTAINER'] : ".drop-container";
    this.NO_RESULT = arguments['NO_RESULT'] ? arguments['NO_RESULT'] :
        "<div class='no-result'><img src='images/no_result.png' /><p>抱歉~，暂无数据</p></div>";

    this.API_CONFOG = arguments['API_CONFOG'] ? arguments['API_CONFOG'] : {
        LOGIN_OUT: "/identity/logout",
        BIND_COMPANY: "/param/company"
    };

    this.init();
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.init = function () {
    this.showLgNavMenu();
    this.hideLgNavMenu();
    this.bindAccount()
    this.webAppExit();
    this.bindCompany();
    this.showSmNavMenu();
    this.showDropOption();
    this.dropMenuBlur();
    this.selectDropOption();
    this.propertyGrantControl();
    this.customerGrantControl();
    this.employeeGrantControl();
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.showLgNavMenu = function () {
    var _this = this;
    $(this.LG_NAV_BAR).on("click", function () {
        var $_WEB_APP = $('#webApp', parent.document);
        $(_this.APP_BG).remove();
        $_WEB_APP.append(_this.TEMPLATE);
        setTimeout(function () {
            $_WEB_APP.addClass("show");
        }, 100);
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.showSmNavMenu = function () {
    $(this.SM_NAV_BAR).on("click", function () {
        var $_main = $(".main .pull-left");
        if ($_main.hasClass("show")) {
            $_main.removeClass("show");
        } else {
            $_main.addClass("show");
        }
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.showDropOption = function () {
    $(document).on("click", this.DROP_CONTAINER, function () {
        if ($(this).hasClass("hide")) {
            $(this).removeClass("hide");
        } else {
            $(this).addClass("hide");
        }
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.dropMenuBlur = function () {
    $(document).on("blur", this.DROP_CONTAINER, function () {
        $(this).addClass("hide");
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.selectDropOption = function (fn) {
    var _this = this;
    $(_this.DROP_CONTAINER).off().on("click", this.DROP_OPTION, function () {
        var TEXT = $(this).text().trim();
        $(this).parents(_this.DROP_CONTAINER).find(_this.DROP_OPTION).removeClass("active");
        $(this).addClass("active");
        $(this).parents(_this.DROP_CONTAINER).find(_this.DROP_RESULT).text(TEXT);
        if ('function' == typeof fn) fn(this);
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.defaultSelectOption = function () {
    var _this = this;
    $(this.DROP_RESULT).each(function () {
        var _This_Container = $(this).parents(_this.DROP_CONTAINER);
        var _Temp_Text = _This_Container.find(_this.DROP_OPTION).eq(0).text();
        $(this).text(_Temp_Text);
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.hideLgNavMenu = function () {
    var _this = this;
    $(document).on("click", this.APP_BG, function () {
        var $_WEB_APP = $("#webApp");
        $_WEB_APP.removeClass("show");
        setTimeout(function () {
            $(_this.APP_BG).remove();
        }, 300);
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.webAppExit = function () {
    var _this = this;
    $(this.BTN_EXIT).on("click", function () {
        var params = _this.getParams(_this.LOGIN_OUT);
        _this.ajaxRequestWebAppExit(params);
    });
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.removeLocalStorage = function () {
    localStorage.setItem('isLogin', false);
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("employeeCharId");
    localStorage.removeItem("requestKey");
    window.parent.location.href = 'login.html';
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.bindAccount = function () {
    var SELECTOR = ".header .right>li:eq(0)";
    var ACCOUNT = localStorage.getItem("account");
    var ISVALID = localStorage.getItem("isValid");
    var TEMP_HTML = "<p class='right-valid'>手机未认证</p>";
    if (ACCOUNT) $('.right-phone').html(ACCOUNT);
    if (ISVALID != 1) $(SELECTOR).html(TEMP_HTML);
    return this;
}
/**
 *
 * @returns {WebApp}
 */
WebApp.prototype.bindCompany = function () {
    var result = sessionStorage.getItem('status');
    if ('true' != result) {
        var params = this.getParams(this.BIND_COMPANY);
        this.ajaxRequestCompany(params);
    }
    return this;
}

/**
 *
 * @param params
 * @returns {WebApp}
 */
WebApp.prototype.ajaxRequestWebAppExit = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFOG['LOGIN_OUT'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data != null) {
                try {
                    if (data['succ']) {
                        _this.removeLocalStorage();
                        return true;
                    } else {
                        messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    }
                } catch (e) {

                }
            }
        },
        error: function (e) {
            if (e.readyState > 0) {
                messageBox.show("错误", e, MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        }
    });
    return this;
}
/**
 *
 * @param params
 * @returns {WebApp}
 */
WebApp.prototype.ajaxRequestCompany = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFOG['BIND_COMPANY'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $(_this.COMPANY_NAME).text(JSON_DATA['FullName']);
            } else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (e) {
            if (e.readyState > 0) {
                messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        }
    });
    return this;
}
/**
 *
 * @param name
 * @returns {*}
 */
WebApp.prototype.getParams = function (name) {
    var params = null;
    switch (name) {
        case this.LOGIN_OUT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                employeeCharId: localStorage.getItem("employeeCharId")
            }
            break;
        case this.BIND_COMPANY:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
    }
    return params;
}


/**
 *
 * @param e
 * @param data
 * @returns {boolean}
 */
WebApp.prototype.grantControl = function (e, data) {
    var result = false;
    if (LOGIN_DATA) {
        var str = LOGIN_DATA['Operations'];
        if (str.indexOf(data) != -1) {
            e.show();
            result = true;
        }
    }
    return result;
}
/**
 * 物业固定按钮权限
 * @returns {WebApp}
 */
WebApp.prototype.propertyGrantControl = function () {
    // 物业查看
    this.grantControl($("#Buildings"), "building_select");
    // 物业新增
    this.grantControl($(".fq-nav2-bottom"), "building_add");
    // 物业删除
    this.grantControl($(".property-room-ul1"), "building_delete");
    // 楼层删除
    this.grantControl($(".sp11"), "floor_delete");
    // 房间编辑
    this.grantControl($(".but-roomEdit"), "room_update");
    // 房间删除
    this.grantControl($(".btn-roomdel"), "room_delete");
    //维修记录查看
    this.grantControl($(".serviceInit"), "servicerecord_select");
    //维修记录新增
    this.grantControl($(".btn-repairadd"), "servicerecord_add");
    //抄表记录查看
    this.grantControl($(".readInit"), "readrecord_select");
    //抄表记录新增
    this.grantControl($(".btn-checktableadd"), "readrecord_add");
    // 部门新增
    this.grantControl($(".department_add"), "department_add");
    // 部门编辑
    this.grantControl($(".department_update"), "department_update");
    // 部门删除
    this.grantControl($(".department_delete"), "department_delete");
    // 员工新增
    this.grantControl($(".employee-add"), "employee_add");
    // 员工编辑
    this.grantControl($(".employee_update"), "employee_update");
    // 员工删除
    this.grantControl($(".employee_delete"), "employee_delete");
    // 账务删除
    this.grantControl($(".billrecord_delete"), "billrecord_delete");

    return this;
}


/**
 * 客户固定按钮权限
 * @returns {WebApp}
 */
WebApp.prototype.customerGrantControl = function () {
    // 客户新增
    this.grantControl($(".fq-nav2-customer-bottom"), "customer_add");
    // 客户编辑
    this.grantControl($(".btn-edit button"), "customer_update");
    // 放弃
    this.grantControl($(".btn-giveup"), "customer_abandon");
    // 跟进记录
    this.grantControl($(".followInit"), "follow_select");
    //跟进新增
    this.grantControl($(".submitFollow"), "follow_add");
    return this;

}

/**
 * 员工固定按钮权限
 * @returns {WebApp}
 */
WebApp.prototype.employeeGrantControl = function () {
    // 部门新增
    this.grantControl($(".btn-departmentadd"), "department_add");
// 部门编辑
    this.grantControl($(".btn-departmentedit"), "department_update");
// 部门删除
    this.grantControl($(".fq-btn-ul1"), "department_delete");
// 部门编辑 部门新增的父级
    if (this.grantControl($(".fq-nav2-bottom"), "department_add") || this.grantControl($(".fq-nav2-bottom"), "department_update")) {
        $(".fq-nav2-bottom").show();
    }
// 员工新增
    this.grantControl($(".fq-employee-add-dv"), "employee_add");
    return this;
}
/**
 * 无权限
 * @returns {WebApp}
 */
WebApp.prototype.noGrant = function () {
    var TEMP_HTML = '<div class="fq-contain-dv"><div class="imgs">'
        + '<img src="images/withoutPower.png" alt=""/>'
        + '<p>抱歉，您暂时没有相关权限，请联系管理员！</p></div></div>';
    $(".fq-contain-in").html(TEMP_HTML);
    $(".fq-contain-dv").show();
    return this;
}

/**
 * 没有查看权限
 * @returns {WebApp}
 */
WebApp.prototype.noneGrant = function () {
    var TEMP_HTML = '<div class="imgs">'
        + '<img src="images/withoutPower.png" alt=""/>'
        + '<p>抱歉，您暂时没有相关权限，请联系管理员！</p></div>';
    $(".table-body").html(TEMP_HTML);
    return this;
}

/**
 *
 * @type {WebApp}
 */
var webApp = new WebApp();


/**
 * BEGIN
 * 3个月 6个月 1年按钮功能实现
 * Author:liyong
 * Data:2017-05-15
 */
//开始日期
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    $(".modal-property-data-contract-dv .group-date1").val(currentdate);
    $(".panel .form-date").val(currentdate);
    return currentdate;
}
getNowFormatDate();

function getNextMonth(date, b) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + b;
    if (month2 >= 13) {
        year2 = parseInt(year2) + 1;
        month2 = month2 - 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();

    if (day2 > days2) {
        day2 = days2;
    }
    day2 -= 1;
    if (day2 == 0) {
        month2 -= 1;
        day = new Date(year2, month2, 0);
        day2 = day.getDate();
    }
    if (day2 < 10) {
        day2 = '0' + day2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    $(".modal-property-data-contract-dv .group-date2").val(t2);
    $(".group-date2").keyup();
    return t2;
}
//3个月
$(".modal-property-data-contract-dv span:eq(0)").click(function () {
    var leftDate = $(".modal-property-data-contract-dv .group-date1").val();
    getNextMonth(leftDate, 3);
})
//    6个月
$(".modal-property-data-contract-dv span:eq(1)").click(function () {
    var leftDate = $(".modal-property-data-contract-dv .group-date1").val();
    getNextMonth(leftDate, 6);
});
//       1年
$(".modal-property-data-contract-dv span:eq(2)").click(function () {
    var leftDate = $(".modal-property-data-contract-dv .group-date1").val();
    getNextMonth(leftDate, 12);
});

/**
 * BEGIN
 * 自定义MessageBox弹窗
 * Author:PengLunJian
 * Data:2017-05-09
 * @constructor MessageBox
 */
function MessageBox() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.iSwitch = arguments['iSwitch'] ? arguments['iSwitch'] : true;
    this.element = arguments['element'] ? arguments['element'] : '#msgModal';
    this.backDrop = arguments['backDrop'] ? arguments['backDrop'] : '.modal-backdrop';
    this.btnConfirm = arguments['btnConfirm'] ? arguments['btnConfirm'] : '.btn-confirm';
}
/**
 *
 * @type {{OK: string, CANCEL: string, OKCANCEL: string}}
 */
var MessageBoxButtons = {
    OK: '<button class="btn-confirm" data-dismiss="modal">确认</button>',
    CANCEL: '<button class="btn-cancel" data-dismiss="modal">取消</button>',
    OKCANCEL: '<button class="btn-confirm" data-dismiss="modal">确认</button>'
    + '<button class="btn-cancel" data-dismiss="modal">取消</button>',
}
/**
 *
 * @type {{infomation: string, warning: string, question: string, error: string}}
 */
var MessageBoxIcons = {
    infomation: "info_icon.png",
    warning: "warn_icon.png",
    question: "question_icon.png",
    error: "error_icon.png",
}
/**
 *
 * @param title
 * @param message
 * @param MessageBoxButtons
 * @param MessageBoxIcons
 * @returns {MessageBox}
 */
MessageBox.prototype.show = function (title, message, MessageBoxButtons, MessageBoxIcons) {
    $(this.element).remove();
    $(this.backDrop).remove();
    var TEMP_HTML = '<div class="modal fade" id="msgModal">'
        + '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">'
        + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        + '<h4 class="modal-title">' + title + '</h4></div><div class="modal-body">'
        + '<div class="pull-left"><img src="images/messageBox/' + MessageBoxIcons + '"/></div><div class="pull-left">'
        + '<p class="modal-info">' + message + '</p></div><div class="clearfix"></div></div><div class="modal-footer">' + MessageBoxButtons + '</div></div></div></div>';

    $('body').prepend(TEMP_HTML);
    $(this.element).modal('toggle');
    return this;
}
/**
 *
 * @param fn
 * @returns {MessageBox}
 */
MessageBox.prototype.confirm = function (fn) {
    $(this.btnConfirm).on("click", function () {
        fn();
    });
    return this;
}
/**
 *
 * @type {MessageBox}
 */
var messageBox = new MessageBox();

//zhrong初始化下拉
function DropdownInit() {
    var xiala;
    xiala = new fq.xiala(null, $('.fq-xiala'));
    xiala.init();
}

//下拉初始
window.fq = {};
//param
//数据 类型
fq.xiala = function (data, obj) {
    o = this;
    this.type = obj.attr('type');
    this.clickflag = false;
    this.xialaclickflag = false;
    this.init = function () {
        obj.not(".secondary-menu").hover(function () {
            // 展开
            if ($(this).attr('type') == 'hov') {
                obj.find('ul:eq(0)').hide();
                //小三角
                $(this).find('i').removeClass('icon-xiala').addClass('icon-zhankai');
                //下拉框样式
                $(this).addClass('xiala-cur').find('.fq-xiala-sel').css({
                    'border-bottom': '0px',
                    'border-radius': '4px 4px 0px 0px'
                });
                //下拉
                $(this).find('ul:eq(0)').slideDown(100);
            }
            // 隐藏
        }, function () {
            obj.removeClass('xiala-cur').find('ul:eq(0)').slideUp(100, function () {
                $(this).parent().find('.fq-xiala-sel').css({
                    'border-bottom': '1px solid #e6e6e6',
                    'border-radius': '4px'
                });
            });
            obj.find('i').removeClass('icon-zhankai').addClass('icon-xiala');
            // delete o.xiala;
        });
        // li悬停和点击添加到span  .fq-xiala是  div
        $('.fq-xiala ul li').not(".fq-menu").hover(function () {
            $(this).addClass('hov');
        }, function () {
            $(this).removeClass('hov');
            // unbind清除选中元素
        }).unbind().click(function () {
            if ($(this).parent("ul").children(".menuChildren")[0] == undefined) {
                $(this).parent("ul").find(".cur").removeClass("cur");
            } else {
                $(this).parents("ul").find(".cur").removeClass("cur");
            }
            $(this).addClass('cur').parents('.fq-xiala').find('.fq-xiala-sel').html($(this).html());
            obj.removeClass('xiala-cur').find('ul:eq(0)').slideUp(100, function () {
                $(this).parent().find('.fq-xiala-sel').css({
                    'border-bottom': '1px solid #e6e6e6',
                    'border-radius': '4px'
                });
            });
            obj.find('i').removeClass('icon-zhankai').addClass('icon-xiala');
            //部门启用、关闭切换事件
            if ($(this).parent().parent().attr('id') == "DptEnable") {
                DptBind($(this).attr("data-value"));
            }
            //省份、城市、区域三级联动新增页面
            if ($(this).parent().parent().attr('id') == "Province_Add") {
                // CityBind($(this).attr("data-value"));
                var params = propertyPage.getParams(propertyPage.CITYBIND);
                propertyPage.ajaxRequestCityBind(params);
            }

            if ($(this).parent().parent().attr('id') == "City_Add") {
                // DistrictBind($(this).attr("data-value"));
                var params = propertyPage.getParams(propertyPage.DISTRICTBIND);
                propertyPage.ajaxRequestDistrictBind(params);
            }
            //省份、城市、区域三级联动编辑页面
            if ($(this).parent().parent().attr('id') == "Province_Edit") {
                // CityUptBind($(this).attr("data-value"));
                var params = propertyPage.getParams(propertyPage.CITYUPTBIND);
                propertyPage.ajaxRequestUptCityBind(params);
            }
            if ($(this).parent().parent().attr('id') == "City_Edit") {
                // DistrictUptBind($(this).attr("data-value"));
                var params = propertyPage.getParams(propertyPage.DISTRICTUPTBIND);
                propertyPage.ajaxRequestDistrictUptBind(params);
            }
        });


        // 点击二级菜单
        $('.fq-menu>span').click(function () {
            $(this).parents("ul").find('.cur').removeClass('cur');
            $(this).parent().addClass('cur').parents('.fq-xiala').find('.fq-xiala-sel').html($(this).html());
            obj.removeClass('xiala-cur').find('ul:eq(0)').slideUp(100, function () {
                $(this).parents().find('.fq-xiala-sel').css({
                    'border-bottom': '1px solid #e6e6e6',
                    'border-radius': '4px'
                });
            });
            obj.find('i').removeClass('icon-zhankai').addClass('icon-xiala');
        });
        //点击span 出现下拉框fq-xiala-sel
        obj.find('span.fq-xiala-sel').unbind().click(function () {
            if ($(this).parent().attr('type') == 'click') {
                o.clickflag = !o.clickflag;
                o.xiala = $(this).parent();
                o.xiala.find('i').removeClass('icon-xiala').addClass('icon-zhankai');
                o.xiala.addClass('xiala-cur').find('.fq-xiala-sel').css({
                    'border-bottom': '0px',
                    'border-radius': '4px 4px 0px 0px'
                });
                o.xiala.find('ul:eq(0)').slideDown(100);
            }
        });
        addListener(document.body, "click", function () {
        });


    }

}

// ly二级菜单下拉
$(".fq-xiala").click(function () {
    var li = $(this).children("ul").find("li");
    li.each(function () {
        if ($(this).children("ul")[0] == undefined) {
            $(this).children("b").hide();
        }
    })
})

$('.fq-xiala').on('click', 'b', function (event) {
    if ($(this).parent('li').children("ul")[0]) {
        $(this).parent('li').siblings('li').children('b').removeClass('icon-shangsanjiaoxing-copy');
        $(this).parent('li').siblings('li').children('ul').slideUp();
        $(this).parent().children('ul').slideToggle();
        $(this).toggleClass('icon-shangsanjiaoxing-copy');
        event.stopPropagation();
    }
})
function addListener(element, e, fn) {
    element.addEventListener ? element.addEventListener(e, fn, false) : element.attachEvent("on" + e, fn)
};
function removeListener(element, e, fn) {
    element.removeEventListener ? element.removeEventListener(e, fn, false) : element.detachEvent("on" + e, fn)
};

function alert_yz(mes) {
    mes = mes;
    var str = '<div class="fq-yz-wraper"><div class="fq-yz-mask"></div><div class="fq-yzkuang"><h2>消息</h2><div class="fq-yz-message"><p>' + mes + '</p><button class="fq-btn fq-yz-btn">确定</button></div></div></div>';
    $('body').append(str);
    $('.fq-yz-btn,.fq-yz-mask').on('click', function () {
        $('.fq-yz-wraper').remove();
    });
    return false;
}

var requestKey;
//面板切换函数初始1
//panel_tab($('.btn-propertydetail'),
// $('.modal-mask,.btn-cancel,.btn-keep'),
// $('.alert-modal-wraper'));
//btnobj：显示面板的按钮样式,maskobj_：隐藏面板的按钮样式,wrap:主面板
//注意：按钮的type要和弹窗div的样式一致
//操作日志
// panel_tab2($('.btn-propertyedit'), $('.modal-mask,.btn-cancel,.btn-keep'), $('.alert-modal-wraper'));
// panel_tab($('.btn-propertyadd,.btn-repairadd,.btn-checktableadd,.btn-contractadd,.property-room-status,.btn-roomedit'),
//  $('.modal-mask,.btn-cancel,.btn-keep'), $('.alert-modal-wraper'));
var panel_tab = function (btnobj, maskobj_, wrap) {
    var animatenum = 0;
    var dir;

    func = function () {
        // 按下按钮
        panelshow = function () {
            btnobj.click(function () {
                //部门编辑判断
                if ($(this).attr('type') == "department-edit") {
                    if ($(".employee-tree-ul li[class='active']").length > 0) {
                        var charId = $(".employee-tree-ul li[class='active']:last").attr("id");
                        DptEditBind(charId);
                    }
                    else {
                        messageBox.show("提示", "请先选择部门 ！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
                        return false;
                    }
                }
                wrap.show();
                animatenum++;
                dir = $(this).attr('dir');
                if (dir == 'right') {
                    // wrap.find('>div').eq(1).find('>div').hide();
                    //4.6修改
                    // wrap.find('>div').eq(1).show();
                    wrap.find('>div').eq(2).hide();
                    $('.' + $(this).attr('type')).show();
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').removeClass('cur').eq(0).addClass('cur');
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').eq(0).show();
                    //wrap.find('div').eq(1).find('div').eq(0).show();
                    wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                    });
                } else if (dir == 'top') {

                    //4.6号修改
                    // wrap.find('>div').eq(1).hide();
                    wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                    });
                    wrap.find('>div').eq(2).find('>div').hide();
                    $('.' + $(this).attr('type')).show();
                    wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                    });

                    if (animatenum == 1) {//直接打开中间面板
                        // wrap.find('>div').eq(1).hide();
                        $('.' + $(this).attr('type')).show();
                        wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                            getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                        });
                    } else if (animatenum == 2) {//在右面板中打开中间面板
                        $('.' + $(this).attr('type')).show();
                        wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                            wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                                getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                            });
                        });
                    }
                }
                ;
            });
        };
        panelshow();
// 取消按钮
        panelhide = function () {
            maskobj_.unbind('click').click(function () {
                if (dir == 'top') {
                    if (animatenum == 1) {
                        wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                            wrap.hide();
                            $(this).hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                    } else if (animatenum == 2) {
                        wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                            $(this).hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                        wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                            getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                        });
                    }
                    wrap.show();
                    dir == 'right';
                } else if (dir == 'right') {
                    wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);

                    });
                    //ly4-20由0改成-770px
                    wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                        wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        $(this).show();
                        //ly4-20添加代码
                        wrap.hide();
                    });
                }
                animatenum--;
            });
        };
        panelhide();

        panelmenu = function () {
            wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').click(function () {
                wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li.cur').removeClass('cur');
                $(this).addClass('cur');
                wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').hide().eq($(this).index()).show();
            });
        };
        panelmenu();
    };
    func();
    //ly添加代码
    $("#quxiao,.quxiao").on("click", function () {
        wrap.hide();
        $(".alert-modal-wraper").hide();
        $(".modal-con").hide();
    });
    // ly4.7添加代码
    $(".quxiao1").on("click", function () {
        $(".top-modal").hide();
        $(".right-modal").show().css("right", "0");
    });
    $(".modal-mask").on("click", function () {
        wrap.hide();
    });

    //滚动条高度设置
    getheightfoo = function (obj, dir) {
        var topHeight;
        var bottomHeight;
        var mCustomScrollbarHeight;
        var mCustomScrollbarComwrap;
        if (dir == 'top') {
            topHeight = 52;
            bottomHeight = 50;
            mCustomScrollbarComwrap = obj.parent();
            mCustomScrollbarComwrapHeight = (mCustomScrollbarComwrap.height() >= 600 ? 600 : mCustomScrollbarComwrap.height());
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        if (dir == 'right') {
            mCustomScrollbarComwrap = obj.parent().parent().parent().parent();
            if (mCustomScrollbarComwrap.find('>div').length == 2) {
                topHeight = 52;
            } else {
                topHeight = 110;
            }
            if (obj.next().length > 0) {
                bottomHeight = obj.next().height();
            }
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        obj.addClass('mCustomScrollbarCur').height(mCustomScrollbarHeight);

    };
    window.onresize = function () {
        getheightfoo(wrap.find('.mCustomScrollbarCur'), dir);
        // getheightfoo($(".fq-contain-in"), "top");
    }
};

//只针对物业中物业编辑（暂时未处理）
//面板切换函数初始1,
//panel_tab($('.btn-propertydetail'), $('.modal-mask,.btn-cancel,.btn-keep'), $('.alert-modal-wraper'));
//btnobj：显示面板的按钮样式,maskobj_：隐藏面板的按钮样式,wrap:主面板
//注意：按钮的type要和弹窗div的样式一致
//操作日志
// panel_tab2($('.btn-propertyedit'), $('.modal-mask,.btn-cancel,.btn-keep'), $('.alert-modal-wraper'));

// panel_tab($('.btn-propertyadd,.btn-repairadd,.btn-checktableadd,.btn-contractadd,.property-room-status,.btn-roomedit'),
//  $('.modal-mask,.btn-cancel,.btn-keep'), $('.alert-modal-wraper'));
var panel_tab2 = function (btnobj, maskobj_, wrap) {
    var dir;
    func = function () {
        panelshow = function () {
            btnobj.click(function () {
                wrap.show();
                dir = $(this).attr('dir');
                if (dir == 'right') {
                    wrap.find('>div').eq(1).find('>div').hide();
                    $('.' + $(this).attr('type')).show();
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').removeClass('cur').eq(0).addClass('cur');
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').eq(0).show();
                    wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                    });
                } else {
                    $('.' + $(this).attr('type')).show();
                    wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                        wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                            getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                        });
                    });
                }
                ;
            });
        };
        panelshow();
        panelhide = function () {
            maskobj_.unbind('click').click(function () {
                // if (dir == 'top') {
                //    wrap.find('>div').eq(2).show().animate({ 'top': '-200%' }, 300, function () {
                //        $(this).hide();
                //        wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                //        wrap.find('>div').eq(1).animate({ 'right': '0' }, 300, function () {
                //            getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                //        });
                //    });
                // } else if (dir == 'right') {
                //    wrap.find('>div').eq(1).animate({ 'right': '-770px' }, 300, function () {
                //        wrap.hide();
                //        wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                //    });
                // }
            });
        };
        panelhide();
        panelmenu = function () {
            wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').click(function () {
                wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li.cur').removeClass('cur');
                $(this).addClass('cur');
                wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').hide().eq($(this).index()).show();
            });
        };
        panelmenu();
    };
    func();
    //滚动条高度设置
    getheightfoo = function (obj, dir) {
        var topHeight;
        var bottomHeight;
        var mCustomScrollbarHeight;
        var mCustomScrollbarComwrap;
        if (dir == 'top') {
            topHeight = 52;
            bottomHeight = 50;
            mCustomScrollbarComwrap = obj.parent();
            mCustomScrollbarComwrapHeight = (mCustomScrollbarComwrap.height() >= 600 ? 600 : mCustomScrollbarComwrap.height());
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        if (dir == 'right') {
            mCustomScrollbarComwrap = obj.parent().parent().parent().parent();
            if (mCustomScrollbarComwrap.find('>div').length == 2) {
                topHeight = 52;
            } else {
                topHeight = 110;
            }
            if (obj.next().length > 0) {
                bottomHeight = obj.next().height();
            }
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        obj.addClass('mCustomScrollbarCur').height(mCustomScrollbarHeight);

    };
    window.onresize = function () {
        getheightfoo(wrap.find('.mCustomScrollbarCur'), dir);
        getheightfoo($(".fq-contain-src"), dir);
    }
};

//面板切换函数初始
var panel_tab_3 = function (btnobj, maskobj_, wrap) {
    var animatenum = {
        right: 0,
        top: 0
    };
    var mobj = {};
    var type, dir;
    func = function () {
        panelshow = function () {
            btnobj.click(function () {
                wrap.show();
                dir = $(this).attr('dir');
                type = $(this).attr('type');
                mobj[type] = 1;
                if (dir == 'right') {
                    animatenum.right++;
                    wrap.find('>div').eq(1).find('>div').hide();
                    if (animatenum.right == 1) {
                        wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').removeClass('cur').eq(0).addClass('cur');
                        wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').eq(0).show();
                        wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                            getheightfoo($('.' + type).find('.mCustomScrollbar'), dir);
                        });
                    } else if (animatenum.right == 2) {
                        //$('.' + type).find('div[show=true]').show();
                        wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                            wrap.find('>div').eq(1).find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                            wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                                getheightfoo($('.' + type).find('.mCustomScrollbar'), dir);
                            });
                        });
                    }
                    $('.' + dir + '-modal').show();
                } else if (dir == 'top') {
                    animatenum.top++;
                    wrap.find('>div').eq(2).find('>div').hide();
                    $('.' + type).show();
                    if (animatenum.top == 1) {
                        wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                            getheightfoo($('.' + type).find('.mCustomScrollbar'), dir);
                        });

                    } else if (animatenum.top == 2) {
                        wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                            wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                                getheightfoo($('.' + type).find('.mCustomScrollbar'), dir);
                            });
                        });
                    }
                }
                ;
            });
        };
        panelshow();
        panelhide = function () {
            maskobj_.unbind('click').click(function () {
                if (dir == 'top') {
                    if (animatenum.top == 1) {
                        wrap.find('>div').eq(2).animate({'top': '-200%'}, 300, function () {
                            wrap.hide();
                            $(this).hide();
                            $('.' + type).find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                    } else if (animatenum.top == 2) {
                        dir = 'right';
                        wrap.find('>div').eq(2).animate({'top': '-200%'}, 300, function () {
                            $(this).hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                            wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                                getheightfoo($('.' + type).find('.mCustomScrollbar'), dir);

                            });
                        });
                    }
                    dir = 'right';
                } else if (dir == 'right') {
                    if (animatenum.right == 1) {
                        wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                            wrap.hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                    } else if (animatenum.right == 2) {
                        wrap.find('>div:eq(1)').animate({'right': '-770px'}, 300, function () {
                            // $(this).attr('show','0');
                            $('.' + type).find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                            wrap.find('>div:eq(1)').animate({'right': '0'}, 300, function () {
                                $('.' + type).find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                            });
                        });
                    }
                }
                animatenum--;
            });
        };
        panelhide();

        panelmenu = function () {
            wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').click(function () {
                wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li.cur').removeClass('cur');
                $(this).addClass('cur');
                wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').hide().eq($(this).index()).show();
            });
        };
        panelmenu();
    };
    func();

    //滚动条高度设置
    getheightfoo = function (obj, dir, type) {
        var topHeight;
        var bottomHeight;
        var mCustomScrollbarHeight;
        var mCustomScrollbarComwrap;
        if (dir == 'top') {
            topHeight = 52;
            bottomHeight = 50;
            mCustomScrollbarComwrap = obj.parent();
            mCustomScrollbarComwrapHeight = (mCustomScrollbarComwrap.height() >= 600 ? 600 : mCustomScrollbarComwrap.height());
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        if (dir == 'right') {
            mCustomScrollbarComwrap = obj.parent().parent().parent().parent();
            if (mCustomScrollbarComwrap.find('>div').length == 2) {
                topHeight = 52;
            } else {
                topHeight = 110;
            }
            if (obj.next().length > 0) {
                bottomHeight = obj.next().height();
            }
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        obj.addClass('mCustomScrollbarCur').height(mCustomScrollbarHeight);//alert(mCustomScrollbarHeight);
    };
    window.onresize = function () {
        getheightfoo(wrap.find('.mCustomScrollbarCur'), dir, auto);
    }
};
/**
 * BEGIN 自定义分页插件
 * Author:PengLunJian
 * Date:2017-07-18
 * @constructor 分页插件构造函数
 */
function Pagination() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.ACTIVE = arguments['ACTIVE'] ? arguments['ACTIVE'] : ".active";
    this.PAGE_CODE = arguments['PAGE_CODE'] ? arguments['PAGE_CODE'] : 1;
    this.PAGE_SIZE = arguments['PAGE_SIZE'] ? arguments['PAGE_SIZE'] : 10;
    this.DATA_NUMS = arguments['DATA_NUMS'] ? arguments['DATA_NUMS'] : 100;
    this.PAGINATION = arguments['PAGINATION'] ? arguments['PAGINATION'] : ".pagination";
    this.TOTAL_PAGES = parseInt((parseInt(this.DATA_NUMS) + this.PAGE_SIZE - 1) / this.PAGE_SIZE);
    this.PAGINATION_PREV = arguments['PAGINATION_PREV'] ? arguments['PAGINATION_PREV'] : ".pagination-prev";
    this.PAGINATION_CODE = arguments['PAGINATION_CODE'] ? arguments['PAGINATION_CODE'] : ".pagination-code";
    this.PAGINATION_NEXT = arguments['PAGINATION_NEXT'] ? arguments['PAGINATION_NEXT'] : ".pagination-next";
    this.CHANGE_PAGE = arguments['CHANGE_PAGE'] ? arguments['CHANGE_PAGE'] : null;

    this.init();
}
/**
 * BEGIN 初始化分页插件
 * Author:PengLunJian
 * Date:2017-07-18
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.init = function () {
    this.loadPagination();
    this.codeButtonPress();
    this.prevButtonPress();
    this.nextButtonPress();
    return this;
}
/**
 * BEGIN 加载分页插件方法
 * Author:PengLunJian
 * Date:2017-07-18
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.loadPagination = function () {
    $(this.PAGINATION).html("");
    var TEMP_NUMS = this.TOTAL_PAGES >= 5 ? 5 : this.TOTAL_PAGES;
    if (this.TOTAL_PAGES > 0) {

        var TEMP_HTML = '<div class="pagination-box"><div class="pagination-prev">'
            + '<i class="icon-prev"></i></div><div class="pagination-item">';

        for (var i = 0; i < TEMP_NUMS; i++) {
            var TEMP_ACTIVE = i == 0 ? " active" : "";
            TEMP_HTML += '<div class="pagination-code' + TEMP_ACTIVE + '">' + (i + 1) + '</div>';
        }
        TEMP_HTML += '</div><div class="pagination-next">'
            + '<i class="icon-next"></i> </div><div class="pagination-total">共 ' + this.DATA_NUMS + ' 条</div></div>';

        $(".pagination").html(TEMP_HTML);
    }
    return this;
}
/**
 * BEGIN 点击分页插件页码功能
 * Author:PengLunJian
 * Date:2017-07-18
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.codeButtonPress = function () {
    var _this = this;
    $(this.PAGINATION_CODE).off().on("click", function () {
        var ACTIVE_STR = _this.ACTIVE.substring(1);

        $(_this.PAGINATION_CODE).removeClass(ACTIVE_STR);
        $(this).addClass(ACTIVE_STR);

        _this.PAGE_CODE = parseInt($(this).text());
        if ("function" == typeof _this.CHANGE_PAGE) _this.CHANGE_PAGE(_this.PAGE_CODE);
    });
    return this;
}
/**
 * BEGIN 点击分页插件上一页功能
 * Author:PengLunJian
 * Date:2017-07-18
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.prevButtonPress = function () {
    var _this = this;
    $(this.PAGINATION_PREV).off().on("click", function () {
        _this.PAGE_CODE--;
        _this.PAGE_CODE = _this.PAGE_CODE <= 1 ? 1 : _this.PAGE_CODE;
        var FIRST_TEXT = parseInt($(_this.PAGINATION_CODE).eq(0).text().trim());
        if (FIRST_TEXT != 1) {
            $(_this.PAGINATION_CODE).each(function () {
                $(this).text(parseInt($(this).text()) - 1);
            });
        }
        _this.bindStatus(this);
        if ("function" == typeof _this.CHANGE_PAGE) _this.CHANGE_PAGE(_this.PAGE_CODE);
    });
    return this;
}
/**
 * BEGIN 点击分页插件下一页功能
 * Author:PengLunJian
 * Date:2017-07-18
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.nextButtonPress = function () {
    var _this = this;
    $(this.PAGINATION_NEXT).off().on("click", function () {
        _this.PAGE_CODE++;
        _this.PAGE_CODE = _this.PAGE_CODE >= _this.TOTAL_PAGES ? _this.TOTAL_PAGES : _this.PAGE_CODE;
        var FIRST_TEXT = parseInt($(_this.PAGINATION_CODE).eq(0).text().trim());
        var PARAMS_VALUE = _this.TOTAL_PAGES - $(_this.PAGINATION_CODE).length + 1;
        if (_this.PAGE_CODE > Math.ceil($(_this.PAGINATION_CODE).length / 2) && FIRST_TEXT < PARAMS_VALUE) {
            $(_this.PAGINATION_CODE).each(function () {
                $(this).text(parseInt($(this).text()) + 1);
            });
        }
        _this.bindStatus(this);
        if ("function" == typeof _this.CHANGE_PAGE) _this.CHANGE_PAGE(_this.PAGE_CODE);
    });
    return this;
}
/**
 * BEGIN 绑定当前页码状态
 * Author:PengLunJian
 * Date:2017-07-18
 * @param obj 对象形参
 * @returns {Pagination} 返回当前对象实现连缀调用
 */
Pagination.prototype.bindStatus = function (obj) {
    var _this = this;
    var ACTIVE_STR = this.ACTIVE.substring(1);
    $(this.PAGINATION_CODE).removeClass(ACTIVE_STR);
    $(this.PAGINATION_CODE).each(function () {
        if (parseInt($(this).text()) == _this.PAGE_CODE) {
            $(this).addClass(ACTIVE_STR);
        }
    });
    return this;
}
/**
 * BEGIN 绑定当前页码状态
 * Author:PengLunJian
 * Date:2017-07-18
 * @type {Pagination} 分页插件类型
 */
// var pagination = new Pagination();

//分页组件
/*pagerow:一页显示条数;total:总数*/
function fyfoo(pagerow, total, foo) {
    var fqthis = this;
    fqthis.total = total;
    // 计算有多少页
    var pages = (total % pagerow == 0) ? total / pagerow : parseInt(total / pagerow) + 1;
    fqthis.pages = pages;
    // 初始化页数
    var pagenum = 1;

    var activenum;
    fqthis.curpage = 1;

    var listr = '<ul><li class="fy-page-dir previous"><i class="icon iconfont icon-prev"></i></li><li><a>1</a></li><li class="fy-page-dir next"><i class="icon iconfont icon-next"></i></li><li class="page-total">共<font>32</font>条</li></ul>';
    if (total > 0) {
        // prepend() 插入
        $('.fy-wrap').prepend(listr);
    } else {
        return false;
    }
    // pages 页数
    // 插入12345页
    var imax = pages > 5 ? 5 : pages;
    for (var i = 2; i <= imax; i++) {
        var listrpage = '<li><a>' + i + '</a></li>';
        $('.next').before(listrpage);
    }
    $('.page-total font').html(total);
    fqthis.fybtnreload = function () {
        if (fqthis.pages != pages) {
            if (pages == 0) {
                $('.fy-wrap').remove();
            }
            if (pages > 0 && pages < 5) {
                $('.fy-wrap').prepend(listr);
                for (var i = 2; i <= pages; i++) {
                    var listrpage = '<li><a>' + i + '</a></li>';
                    $('.next').before(listrpage);
                }
            }
            // 改变当前页样式 变蓝色
            fybtn.eq(pagenum).addClass('active');
            // 显示总条数
            $('.page-total font').html(fqthis.total);
        }
    }
    // 向前翻页按钮
    btnpre = $('.previous');
    // 向后翻页按钮
    btnnext = $('.next');
    // not（） 从匹配元素中删除元素
    fybtn = $('.fy-wrap ul li').not('.previous,.next,.page-total');
    fybtn.eq(0).addClass('active');
    btnpre.on('click', function () {
        /*pagerow:一页显示条数;total:总数*/
        if (fqthis.total != total) {
            // 页数
            pages = (fqthis.total % pagerow == 0) ? fqthis.total / pagerow : parseInt(fqthis.total / pagerow) + 1;
        }
        if (fybtn.eq(activenum).find('a').html() == '1') {
            return false;
        }
        activenum = fybtn.index($('.active'));
        if (fybtn.eq(0).find('a').html() == '1' || activenum >= 3) {
            activenum--;
            fybtn.removeClass('active');
            fybtn.eq(activenum).addClass('active');
        } else {
            if (pages > 5) {
                fybtn.each(function (index, element) {
                    var num = parseInt($(element).find('a').html()) - 1;
                    $(element).find('a').html(num);
                })
            }
        }
        pagenum = parseInt(fybtn.eq(activenum).find('a').html());
        foo(pagenum);
    });
    // 下一页
    btnnext.on('click', function () {
        if (fqthis.total != total) {
            pages = (fqthis.total % pagerow == 0) ? fqthis.total / pagerow : parseInt(fqthis.total / pagerow) + 1;
        }
        if (fybtn.eq(activenum).find('a').html() == pages) {
            return false;
        }
        activenum = fybtn.index($('.active'));
        if (fybtn.last().find('a').html() == pages || activenum <= 1) {
            activenum++;
            fybtn.removeClass('active');
            fybtn.eq(activenum).addClass('active');
        } else {
            if (pages > 5) {
                fybtn.each(function (index, element) {
                    var num = parseInt($(element).find('a').html()) + 1;
                    $(element).find('a').html(num);
                });
            }
        }
        pagenum = parseInt(fybtn.eq(activenum).find('a').html());
        foo(pagenum);
    });
    // 点击12345
    fybtn.click(function () {
        fybtn.removeClass('active');
        $(this).addClass('active');
        activenum = fybtn.index($(this));
        pagenum = parseInt($(this).find('a').html());
        foo(pagenum);
    });
}
//分页组件2
/*pagerow:一页显示条数;total:总数;foo:点击页码调用函数;fywrap:分页容器*/
function fyfoo2(pagerow, total, foo, fywrap) {
    var fqthis = this;
    fqthis.total = total;
    var pages = (total % pagerow == 0) ? total / pagerow : parseInt(total / pagerow) + 1;
    fqthis.pages = pages;
    var pagenum = 1;
    var activenum;
    fqthis.curpage = 1;
    var listr = '<ul><li class="fy-page-dir previous"><i class="icon iconfont icon-prev"></i></li><li><a>1</a></li><li class="fy-page-dir next"><i class="icon iconfont icon-next"></i></li><li class="page-total">共<font>32</font>条</li></ul>';
    if (total > 0) {
        fywrap.prepend(listr);
    } else {
        return false;
    }
    var imax = pages > 5 ? 5 : pages;
    for (var i = 2; i <= imax; i++) {
        var listrpage = '<li><a>' + i + '</a></li>';
        fywrap.find('.next').before(listrpage);
    }
    fywrap.find('.page-total font').html(total);
    fqthis.fybtnreload = function () {
        if (fqthis.pages != pages) {
            if (pages == 0) {
                fywrap.remove();
            }
            if (pages > 0 && pages < 5) {
                fywrap.prepend(listr);
                for (var i = 2; i <= pages; i++) {
                    var listrpage = '<li><a>' + i + '</a></li>';
                    fywrap.find('.next').before(listrpage);
                }
            }
            fybtn.eq(pagenum).addClass('active');
            fywrap.find('.page-total font').html(fqthis.total);
        }
    }
    btnpre = fywrap.find('.previous');
    btnnext = fywrap.find('.next');
    fybtn = fywrap.find('ul li').not('.previous,.next,.page-total');
    fybtn.eq(0).addClass('active');
    btnpre.on('click', function () {
        if (fqthis.total != total) {
            pages = (fqthis.total % pagerow == 0) ? fqthis.total / pagerow : parseInt(fqthis.total / pagerow) + 1;

        }
        if (fybtn.eq(activenum).find('a').html() == '1') {
            return false;
        }
        activenum = fybtn.index($('.active'));
        if (fybtn.eq(0).find('a').html() == '1' || activenum >= 3) {
            activenum--;
            fybtn.removeClass('active');
            fybtn.eq(activenum).addClass('active');
        } else {
            if (pages > 5) {
                fybtn.each(function (index, element) {
                    var num = parseInt($(element).find('a').html()) - 1;
                    $(element).find('a').html(num);
                })
            }
        }
        pagenum = parseInt(fybtn.eq(activenum).find('a').html());
        foo(pagenum);
    });
    btnnext.on('click', function () {
        if (fqthis.total != total) {
            pages = (fqthis.total % pagerow == 0) ? fqthis.total / pagerow : parseInt(fqthis.total / pagerow) + 1;
        }
        if (fybtn.eq(activenum).find('a').html() == pages) {
            return false;
        }
        activenum = fybtn.index($('.active'));
        if (fybtn.last().find('a').html() == pages || activenum <= 1) {
            activenum++;
            fybtn.removeClass('active');
            fybtn.eq(activenum).addClass('active');
        } else {
            if (pages > 5) {
                fybtn.each(function (index, element) {
                    var num = parseInt($(element).find('a').html()) + 1;
                    $(element).find('a').html(num);
                });
            }
        }
        pagenum = parseInt(fybtn.eq(activenum).find('a').html());
        foo(pagenum);
    });
    fybtn.click(function () {
        fybtn.removeClass('active');
        $(this).addClass('active');
        activenum = fybtn.index($(this));
        pagenum = parseInt($(this).find('a').html());
        foo(pagenum);
    });
}
//原生class样式类方法
function _classobj() {
    var getclassthis = this;
    this._hasClass = function (obj, cls) {
        if (!obj.className) {
            return true;
        } else {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }
    }
    this._addClass = function (obj, cls) {
        // alert('cc')
        if (!getclassthis._hasClass(obj, cls)) obj.className += " " + cls;
    }
    this._removeClass = function (obj, cls) {
        if (getclassthis._hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            if (!obj.className) {
                return false;
            }
            obj.className = obj.className.replace(reg, ' ');
        }
    }
    this._toggleClass = function (obj, cls) {
        if (getclassthis._hasClass(obj, cls)) {
            getclassthis._removeClass(obj, cls);
        } else {
            getclassthis._addClass(obj, cls);
        }
    }
    return this;
};
_classobj();
//原生click方法待改
function _clickinit() {
    var clickthis = this;
    clickthis._click = function (targetobj, wrapobj, foo) {
        var index;
        $(wrapobj).find(targetobj).click(function () {
            index = $(wrapobj).find(targetobj).index($(this));
            var thisobj = this;
            foo.apply(this, thisobj);
            foo();
        });
        $(wrapobj).find(targetobj).eq(index).click();
    }
    return clickthis;
};
_clickinit();

// X._click('dd','.property-nav2-dl',function(){
//     alert('X');
//     _removeClass(this,'cur')
//     _addClass(this,'cur');
// })
// function headinit(){
//     var str = '<div id="header"><p></p><ul><li id="isValid"></li><li><img src="images/yg_icon_05.png"><span id="username"></span><div class="xiala-account"><ul><li><i></i><span>个人中心</span></li><li id="loginOut"><i></i><span>安全退出</span></li></ul></div></li><li><img src="images/yg_icon_07.png"><span>8</span></li></ul></div>';
//     $('body>div:eq(0)').html(str);
//     $('.xiala-account ul li:eq(0)').on('click', function () {
//         $('.fq-nav-wrap ul li').removeClass('sel');
//         window.location.href = "ownercenter.html";
//     });
// }
// headinit();
$('.xiala-account ul li:eq(0)').on('click', function () {
    $('#iFrmMain', parent.document).attr('src', "ownercenter.html");
});

$(".calendar-container table td").on("click", function () {
    if ($(this).children().text() == "") {
        return;
    } else {
        $("table td").removeClass('cur');
        $(this).addClass('cur');
    }

});
//3.31修改代码
// message 页面的代码
$(".contain-dailyrecord-right").click(function () {
    $(".contain-dailyrecord-wang").removeClass("contain-dailyrecord-center").addClass("contain-dailyrecord-weidu");
    $(".contain-dailyrecord-center .right").css("color", "#818181");

});
$(".contain-dailyrecord-center .right").click(function () {
    $(this).parent().parent().removeClass("contain-dailyrecord-center").addClass("contain-dailyrecord-weidu");
    $(this).css("color", "#818181");
});
// 合同页面的默认日期月初和月末
function getFirst(year, month) {
    var firstdate = year + '-' + month + '-01';
    return firstdate;
}
function lastMonthDay(year, month) {
    var day = new Date(year, month, 0);
    var lastdate = year + '-' + month + '-' + day.getDate();
    return lastdate;
}

var myDate = new Date();
// 本月月份
var fMonth;
if (myDate.getMonth() + 1 <= 9) {
    fMonth = "0" + (myDate.getMonth() + 1);
} else {
    fMonth = (myDate.Month() + 1);
}
$("#StartDate").val(getFirst(myDate.getFullYear(), fMonth));
$("#EndDate").val(lastMonthDay(myDate.getFullYear(), fMonth));

// 日历默认值
var myRili = new Date();
var aMonth, aDay;
if (myRili.getMonth() + 1 <= 9) {
    aMonth = "0" + (myRili.getMonth() + 1);
} else {
    aMonth = (myRili.Month() + 1);
}
if (myRili.getDate() <= 9) {
    aDay = "0" + myRili.getDate();
} else {
    aDay = myRili.getDate();
}
$("#StartDate-day").val(myRili.getFullYear() + "-" + aMonth + "-" + aDay);


//ly5.9
var dir;
var animatenum = 0;
var panel_tab5 = function (btnobj, maskobj_, wrap) {
    func = function () {
        // 按下按钮
        panelshow = function () {
            btnobj.unbind('click').click(function () {
                /**
                 * BEGIN 员工明细 显示
                 * Author:liyong
                 * Date:2017-05-12
                 */
                //$(".fq-alert-modal-look").show();
                //部门编辑判断
                if ($(this).attr('type') == "department-edit") {
                    if ($(".employee-tree-ul li[class='active']").length > 0) {
                        var charId = $(".employee-tree-ul li[class='active']:last").attr("id");
                        DptEditBind(charId);
                    }
                    else {
                        return messageBox.show("提示", "请先选择部门 ！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    }
                }
                wrap.show();
                animatenum++;
                dir = $(this).attr('dir');
                if (dir == 'right') {
                    wrap.find('>div').eq(1).find('>div').hide();
                    //ly4.6修改
                    // wrap.find('>div').eq(1).show();
                    wrap.find('>div').eq(2).hide();
                    $('.' + $(this).attr('type')).show();
                    //ly5.9
                    $(".fq-alert-modal-yg").show();
                    $(".fy-wrap3").hide();
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').removeClass('cur').eq(0).addClass('cur');
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').eq(0).show();
                    //wrap.find('div').eq(1).find('div').eq(0).show();
                    wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                    });
                } else if (dir == 'top') {
                    //ly4.6号修改
                    // wrap.find('>div').eq(1).hide();
                    wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                    });
                    wrap.find('>div').eq(2).find('>div').hide();
                    $('.' + $(this).attr('type')).show();
                    wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                    });

                    if (animatenum == 1) {//直接打开中间面板
                        // wrap.find('>div').eq(1).hide();
                        $('.' + $(this).attr('type')).show();
                        wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                            getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                        });
                    } else if (animatenum == 2) {//在右面板中打开中间面板
                        $('.' + $(this).attr('type')).show();
                        wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                            wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                                getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                            });
                        });
                    }
                }
                ;
            });
        };
        panelshow();
// 取消按钮
        panelhide = function () {
            maskobj_.unbind('click').click(function () {
                /**
                 * BEGIN 面板关闭后租金下的提示隐藏
                 * Author:liyong
                 * Date:2017-05-10
                 * @param null
                 */
                $("#RentalMax_Add").tooltip('hide');
                if (dir == 'top') {
                    if (animatenum == 1) {
                        wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                            wrap.hide();
                            $(this).hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                    } else if (animatenum >= 2) {
                        wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                            $(this).hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                        wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                            getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                        });
                    }
                    wrap.show();
                    dir = 'right';
                } else if (dir == 'right') {
                    wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                    });
                    //ly4-20由0改成-770px
                    wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                        wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        $(this).show();
                        //ly4-20添加代码
                        wrap.hide();
                        // 面板切换重合解决
                        $('.fq-alert-modal-dv').hide();

                    });

                }
                //关闭提示
                $(".tixing").tooltip('hide');
                animatenum--;
            });


        };
        panelhide();

        panelmenu = function () {
            wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').click(function () {
                wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li.cur').removeClass('cur');
                $(this).addClass('cur');
                wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').hide().eq($(this).index()).show();
            });
        };
        panelmenu();
    };
    func();
    //滚动条高度设置
    getheightfoo = function (obj, dir) {
        var topHeight;
        var bottomHeight;
        var mCustomScrollbarHeight;
        var mCustomScrollbarComwrap;
        if (dir == 'top') {
            topHeight = 52;
            bottomHeight = 50;
            mCustomScrollbarComwrap = obj.parent();
            mCustomScrollbarComwrapHeight = (mCustomScrollbarComwrap.height() >= 600 ? 600 : mCustomScrollbarComwrap.height());
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        if (dir == 'right') {
            mCustomScrollbarComwrap = obj.parent().parent().parent().parent();
            if (mCustomScrollbarComwrap.find('>div').length == 2) {
                topHeight = 52;
            } else {
                topHeight = 110;
            }
            if (obj.next().length > 0) {
                bottomHeight = obj.next().height();
            }
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        obj.addClass('mCustomScrollbarCur').height(mCustomScrollbarHeight);
    };
    window.onresize = function () {
        getheightfoo(wrap.find('.mCustomScrollbarCur'), dir);
    }
};
// 保存按钮
var baocun = function () {
    // 保存6.7 liyong修改
    if (dir == 'top') {
        if (animatenum == 1) {
            $(".alert-modal-wraper").find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                $(".alert-modal-wraper").hide();
                $(this).hide();
                $(".alert-modal-wraper").find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
            });
        } else if (animatenum >= 2) {
            $(".alert-modal-wraper").find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                $(this).hide();
                $(".alert-modal-wraper").find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
            });
            $(".alert-modal-wraper").find('>div').eq(1).animate({'right': '0'}, 300, function () {
                getheightfoo($(".alert-modal-wraper").find('>div').eq(1).find('.mCustomScrollbar'), dir);
            });
        }
        $(".alert-modal-wraper").show();
        dir = 'right';
    } else if (dir == 'right') {
        $(".alert-modal-wraper").find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
            getheightfoo($(".alert-modal-wraper").find('>div').eq(2).find('.mCustomScrollbar'), dir);
        });
        //ly4-20由0改成-770px
        $(".alert-modal-wraper").find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
            $(".alert-modal-wraper").find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
            $(this).show();
            //ly4-20添加代码
            $(".alert-modal-wraper").hide();
            // 面板切换重合解决
            $('.fq-alert-modal-dv').hide();

        });

    }
    animatenum--;
};


/**
 *ly 正则验证
 * @constructor
 */
function RegularExpress() {
    arguments = arguments.length != 0 ? arguments[0] : arguments;
    // 姓名正则
    this.NAME_REG_EXP = arguments['NAME_REG_EXP'] ? arguments['NAME_REG_EXP'] : /^(([\u4e00-\u9fa5]{1,5})|([a-zA-Z]{1,10}))$/;
    // 密码正则
    this.PWD_REG_EXP = arguments['PWD_REG_EXP'] ? arguments['PWD_REG_EXP'] : /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{8,16}$/;
    // 手机正则
    this.PHONE_REG_EXP = arguments['PHONE_REG_EXP'] ? arguments['PHONE_REG_EXP'] : /^([\d]{11}|[\d]{10})$/;
    // 月份正则
    this.MONTH_REG_EXP = arguments['MONTH_REG_EXP'] ? arguments['MONTH_REG_EXP'] : /^[1-9]\d*$/;
    // 金额正则
    this.MONEY_REG_EXP = arguments['MONEY_REG_EXP'] ? arguments['MONEY_REG_EXP'] : /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
    // 租客数正则
    this.CUSTOMER_REG_EXP = arguments['CUSTOMER_REG_EXP'] ? arguments['CUSTOMER_REG_EXP'] : /^[1-9]\d*$/;
    // 楼层数正则
    this.FLOORCOUNT_REG_EXP = arguments['FLOORCOUNT_REG_EXP'] ? arguments['FLOORCOUNT_REG_EXP'] : /^[1-9]\d*|0$/;
    // 层户数正则
    this.ROOMCOUNT_REG_EXP = arguments['ROOMCOUNT_REG_EXP'] ? arguments['ROOMCOUNT_REG_EXP'] : /^[1-9]\d*|0$/;
    // 面积正则
    this.AREA_REG_EXP = arguments['AREA_REG_EXP'] ? arguments['AREA_REG_EXP'] : /^\d{1,18}(.\d{1,18})?$/;
    // 房型正则
    this.ROOMLAYOUT_REG_EXP = arguments['AREA_REG_EXP'] ? arguments['AREA_REG_EXP'] : /^\d{1,18}(.\d{1,18})?$/;
    //度数正则
    this.DEGREE_REG_EXP = arguments['DEGREE_REG_EXP'] ? arguments['DEGREE_REG_EXP'] : /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/;
    //工号正则
    this.WORKNUMBER_REG_EXP = arguments['WORKNUMBER_REG_EXP'] ? arguments['WORKNUMBER_REG_EXP'] : /^[A-Za-z0-9]{1,10}$/;
    // 费用正则
    this.COST_REG_EXP = arguments['COST_REG_EXP'] ? arguments['COST_REG_EXP'] : /^\d{1,18}(.\d{1,18})?$/;
    // 日期正则
    this.ADVANCE_REG_EXP = arguments['ADVANCE_REG_EXP'] ? arguments['ADVANCE_REG_EXP'] : /^\+?[1-9][0-9]*$/;
    // 角色名称正则
    this.ROLE_REG_EXP = arguments['ROLE_REG_EXP'] ? arguments['ROLE_REG_EXP'] : /^([\u4e00-\u9fa5]||[A-Za-z0-9]){1,6}$/;
    // 验证码正则
    this.CODE_REG_EXP = arguments['CODE_REG_EXP'] ? arguments['CODE_REG_EXP'] : /^(\d{4})$/;
    //标签名正则
    this.LABEL_REG_EXP = arguments['LABEL_REG_EXP'] ? arguments['LABEL_REG_EXP'] : /^[\w\u4E00-\u9FA5\uF900-\uFA2D]{1,10}$/g;
// 部门名
    this.DPT_NAME_REG_EXP = arguments['DPT_NAME_REG_EXP'] ? arguments['DPT_NAME_REG_EXP'] : /^(([\u4e00-\u9fa5]{1,10})|([a-zA-Z0-9]{1,20}))$/;
}


// 验证
RegularExpress.prototype.check = function (reg, params) {
    var result = true;
    // 验证通过返回false,不通过返回true执行messageBOX
    if (reg.test(params)) {
        result = false;
    }
    return result;
}
// 姓名验证
RegularExpress.prototype.nameRegExpCheck = function (params) {
    var result = true;
    // 验证通过返回false,不通过返回true执行messageBOX
    if (this.NAME_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 密码验证
RegularExpress.prototype.passwordRegExpCheck = function (params) {
    var result = true;
    // 验证通过返回false,不通过返回true执行messageBOX
    if (this.PWD_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 手机验证
RegularExpress.prototype.phoneRegExpCheck = function (params) {
    var result = true;
    if (this.PHONE_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 月份验证
RegularExpress.prototype.monthRegExpCheck = function (params) {
    var result = true;
    if (this.MONTH_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 金额验证
RegularExpress.prototype.moneyRegExpCheck = function (params) {
    var result = true;
    if (this.MONEY_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 租客数验证
RegularExpress.prototype.customerRegExpCheck = function (params) {
    var result = true;
    if (this.CUSTOMER_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 楼层数验证
RegularExpress.prototype.floorCountRegExpCheck = function (params) {
    var result = true;
    if (this.FLOORCOUNT_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 层户数验证
RegularExpress.prototype.roomCountRegExpCheck = function (params) {
    var result = true;
    if (this.ROOMCOUNT_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 面积验证
RegularExpress.prototype.areaRegExpCheck = function (params) {
    var result = true;
    if (this.AREA_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 房型验证
RegularExpress.prototype.roomLayoutRegExpCheck = function (params) {
    var result = true;
    if (this.ROOMLAYOUT_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 度数验证
RegularExpress.prototype.degreeRegExpCheck = function (params) {
    var result = true;
    if (this.DEGREE_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 工号验证
RegularExpress.prototype.worknumberRegExpCheck = function (params) {
    var result = true;
    if (this.WORKNUMBER_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 费用验证
RegularExpress.prototype.costRegExpCheck = function (params) {
    var result = true;
    if (this.COST_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 日期验证
RegularExpress.prototype.advanceRegExpCheck = function (params) {
    var result = true;
    if (this.ADVANCE_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
//角色名称验证
RegularExpress.prototype.roleRegExpCheck = function (params) {
    var result = true;
    if (this.ROLE_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
//验证码验证
RegularExpress.prototype.codeRegExpCheck = function (params) {
    var result = true;
    if (this.CODE_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
//标签名验证
RegularExpress.prototype.labelRegExpCheck = function (params) {
    var result = true;
    if (this.LABEL_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
var regular = new RegularExpress();

