/**
 * BEGIN 编写员工页面构造函数
 * Author:PengLunJian
 * Date:2017-08-01
 * @constructor 构造函数
 */
function Employee() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.PAGE_SIZE = arguments['PAGE_SIZE'] ? arguments['PAGE_SIZE'] : 10;
    this.PAGE_INDEX = arguments['PAGE_INDEX'] ? arguments['PAGE_INDEX'] : 1;
    this.PAGINATION = arguments['PAGINATION'] ? arguments['PAGINATION'] : null;
    this.FILTER_BTN = arguments['FILTER_BTN'] ? arguments['FILTER_BTN'] : ".ft-bar";
    this.SEARCH_BTN = arguments['SEARCH_BTN'] ? arguments['SEARCH_BTN'] : ".btn.search";
    this.DETAIL_BTN = arguments['DETAIL_BTN'] ? arguments['DETAIL_BTN'] : ".btn-detail";
    this.DATA_CHARID = arguments['DATA_CHARID'] ? arguments['DATA_CHARID'] : "DATA_CHARID";
    this.PASSWORD_BTN = arguments['PASSWORD_BTN'] ? arguments['PASSWORD_BTN'] : ".btn-password";
    this.FILTER_MODAL = arguments['FILTER_MODAL'] ? arguments['FILTER_MODAL'] : ".right-header";
    this.BIND_PASSWORD = arguments['BIND_PASSWORD'] ? arguments['BIND_PASSWORD'] : "BIND_PASSWORD";
    this.BIND_EMPLOYEE = arguments['BIND_EMPLOYEE'] ? arguments['BIND_EMPLOYEE'] : "BIND_EMPLOYEE";
    this.ADD_DEPARTMENT = arguments['ADD_DEPARTMENT'] ? arguments['ADD_DEPARTMENT'] : "ADD_DEPARTMENT";
    this.EDIT_DEPARTMENT = arguments['EDIT_DEPARTMENT'] ? arguments['EDIT_DEPARTMENT'] : "EDIT_DEPARTMENT";
    this.BIND_DROPSEARCH = arguments['BIND_DROPSEARCH'] ? arguments['BIND_DROPSEARCH'] : "BIND_DROPSEARCH";
    this.BIND_DEPARTMENT = arguments['BIND_DEPARTMENT'] ? arguments['BIND_DEPARTMENT'] : "BIND_DEPARTMENT";
    this.DETAIL_EMPLOYEE = arguments['DETAIL_EMPLOYEE'] ? arguments['DETAIL_EMPLOYEE'] : "DETAIL_EMPLOYEE";
    this.DELETE_EMPLOYEE = arguments['DELETE_EMPLOYEE'] ? arguments['DELETE_EMPLOYEE'] : "DELETE_EMPLOYEE";
    this.UPDATE_EMPLOYEE = arguments['UPDATE_EMPLOYEE'] ? arguments['UPDATE_EMPLOYEE'] : "UPDATE_EMPLOYEE";
    this.BIND_ADDEMPLOYEE = arguments['BIND_ADDEMPLOYEE'] ? arguments['BIND_ADDEMPLOYEE'] : "BIND_ADDEMPLOYEE";
    this.DELETE_DEPARTMENT = arguments['DELETE_DEPARTMENT'] ? arguments['DELETE_DEPARTMENT'] : "DELETE_DEPARTMENT";
    this.UPDATE_DEPARTMENT = arguments['UPDATE_DEPARTMENT'] ? arguments['UPDATE_DEPARTMENT'] : "UPDATE_DEPARTMENT";
    this.BIND_UPDATEEMPLOYEE = arguments['BIND_UPDATEEMPLOYEE'] ? arguments['BIND_UPDATEEMPLOYEE'] : "BIND_UPDATEEMPLOYEE";


    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        DETAIL_EMPLOYEE: "/employee",
        GET_DEPARTMENT: "/department/update",
        ADD_EMPLOYEE: "/employee/add",
        ADD_DEPARTMENT: "/department/add",
        EDIT_DEPARTMENT: "/department/update",
        BIND_PASSWORD: "/employee/password",
        BIND_EMPLOYEE: "/employee/employees",
        BIND_DEPARTMENT: "/department/departments",
        BIND_DROPSEARCH: "/employee/condition",
        UPDATE_EMPLOYEE: "/employee/update",
        DELETE_EMPLOYEE: "/employee/delete",
        DELETE_DEPARTMENT: "/department/delete",
    }

    this.init();
}
/**
 * BEGIN 加载初始化方法
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.init = function () {
    var _this = this;
    ComponentsPickers.init();
    App.init();

    this.btnBindPassword();
    this.showFilterModal();
    this.btnSearchEmployee();
    this.btnDetailEmployee();
    this.exeBindEmployee();
    this.exeBindDepartment();

    tm.clickTreeItem(function () {
        _this.exeBindEmployee();
    });
    webApp.selectDropOption(function () {
        var TEMP_ID = $(arguments).parents("ul").eq(0).attr("id").trim();
        if ("Bind-Enable" == TEMP_ID) {
            _this.exeBindDepartment();
        }
    });

    var params = this.getParams(this.BIND_DROPSEARCH);
    this.ajaxRequestBindDropSearch(params);

    params = this.getParams(this.BIND_ADDEMPLOYEE);
    this.ajaxRequestBindAddEmployee(params);
    return this;
}
/**
 * BEGIN 获取相同访问结果
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {*} 返回结果
 */
Employee.prototype.getResult = function (params) {
    var _this = this;
    var result = null;
    var selector = null;
    switch (params) {
        case "SEARCH_INPUT":
            result = $("#search-input").val().trim()
            break;
        case "ROLE_CHARID":
            selector = $("#roleList .active");
            result = selector.attr("data-value") != undefined ? selector.attr("data-value") : ""
            break;
        case "STATE_CHARID":
            selector = $("#stateList .active");
            result = selector.attr("data-value") != undefined ? selector.attr("data-value") : ""
            break;
        case "TITLE_CHARID":
            selector = $("#titleList .active");
            result = selector.attr("data-value") != undefined ? selector.attr("data-value") : ""
            break;
        case "DEPARTMENT_CHARID":
            selector = $("#Bind_Dpts .active");
            result = selector.attr("data-value") != undefined ? selector.attr("data-value") : ""
            break;
        case "Add":
        case "Edit":
            result = {
                phone: $("#Phone_Emp" + params).val(),
                name: $("#Name_Emp" + params).val(),
                account: $("#Account_Emp" + params).val(),
                contact: $("#Contact_Emp" + params).val(),
                cardID: $("#CardID_Emp" + params).val(),
                inDate: $("#InDate_Emp" + params).val(),
                password: $("#Password_Emp" + params).val(),
                outDate: $("#OutDate_Emp" + params).val(),
                address: $("#Address_Emp" + params).val(),
                contact: $("#Contact_" + params).val(),
                contactPhone: $("#ContactPhone_" + params).val(),
                requestKey: localStorage.getItem("requestKey"),
                gender: $("#Genders_Emp" + params + " .active").attr("data-value"),
                isMarry: $("#IsMarry_Emp" + params + " .active").attr("data-value"),
                roleCharId: $("#Roles_Emp" + params + " .active").attr("data-value"),
                titleCharId: $("#Titles_Emp" + params + " .active").attr("data-value"),
                cardIDIsCopy: $("#IsCopy_Emp" + params + " .active").attr("data-value"),
                education: $("#Educations_Emp" + params + " .active").attr("data-value"),
                departmentCharId: $("#Dpts_Emp" + params + " .active").attr("data-value"),
                contact_Emp: $("#Contact_Emp" + params).val(),
                contactPhone_Emp: $("#ContactPhone_Emp" + params).val()
            }
            if (params = "Edit") {
                result['charId'] = _this.DATA_CHARID;
                result['state'] = $("#States_Emp" + params + " .active").attr("data-value");
            }
            break;
    }
    return result;
}
/**
 * BEGIN 获取列表模板
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {string} 返回页面列表模板
 */
Employee.prototype.getTemplate = function (params) {
    var TEMP_HTML = '';
    for (var i = 0; i < params.length; i++) {
        var JSON_DATA = params[i];
        var className = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + className + ' row">'
            + '<div class="column col-xs-12 col-md-2">工号</div><div class="column col-xs-12 col-md-2">姓名</div>'
            + '<div class="column col-xs-12 col-md-1">性别</div><div class="column col-xs-12 col-md-1">权限</div>'
            + '<div class="column col-xs-12 col-md-1">职称</div><div class="column col-xs-12 col-md-3">手机号码</div>'
            + '<div class="column col-xs-12 col-md-1">状态</div><div class="column col-xs-12 col-md-1">操作</div></div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['Account'] + '</div><div class="column col-xs-12 col-md-2">' + JSON_DATA['Name'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Gender'] + '</div><div class="column col-xs-12 col-md-1">' + JSON_DATA['RoleName'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Title'] + '</div><div class="column col-xs-12 col-md-3">' + JSON_DATA['Phone'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['State'] + '</div><div class="column col-xs-12 col-md-1">'
            + '<a data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">查看</a></div></div></div></div></div>'
    }
    return TEMP_HTML;
}
/**
 * BEGIN 显示筛选弹窗
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.showFilterModal = function () {
    var _this = this;
    $(this.FILTER_BTN).on("click", function () {
        if ($(_this.FILTER_MODAL).hasClass("hide")) {
            $(_this.FILTER_MODAL).removeClass("hide");
        } else {
            $(_this.FILTER_MODAL).addClass("hide");
        }
    });
    return this;
}
/**
 * BEGIN 显示部门编辑弹窗
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.showDptEditModal = function () {
    var _this = this;
    var params = null;
    var TEMP_CHILD = $("#Bind_Dpts .active");
    var TEMP_LEVEL = TEMP_CHILD.attr("data-level");
    this.DATA_CHARID = TEMP_CHILD.attr("data-value");
    if (this.DATA_CHARID == undefined || "1" == TEMP_LEVEL) {
        messageBox.show("提示", "请先选择部门！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
    } else {
        mp.manualShowPanel({
            index: 1,
            element: '.panel-sm',
            complete: function () {
                params = _this.getParams(_this.UPDATE_DEPARTMENT);
                _this.ajaxRequestGetDepartment(params);
            }
        })
    }
    return this;
}
/**
 * BEGIN AJAX异步请求获取员工详情
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestDetailEmployee = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['DETAIL_EMPLOYEE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                JSON_DATA['Password'] = "******";
                for (var JSON_KEY in JSON_DATA) {
                    JSON_DATA[JSON_KEY] = JSON_DATA[JSON_KEY] ? JSON_DATA[JSON_KEY] : "";
                    $("#" + JSON_KEY + "_EmpDetail").text(JSON_DATA[JSON_KEY]);
                }
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
 * BEGIN AJAX异步请求绑定密码
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestBindPassword = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['BIND_PASSWORD'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $("#Password_EmpDetail").text(JSON_DATA['password']);
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
 * BEGIN AJAX异步请求绑定员工列表
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestBindEmployee = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['BIND_EMPLOYEE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.PAGINATION = new Pagination({
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.BIND_EMPLOYEE);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestChangePageEmployee(params);
                    }
                });
                if (webApp.grantControl($(".pagination"), "employee_select")) {
                    var TEMP_HTML = JSON_DATA.length != 0 ? _this.getTemplate(JSON_DATA) : webApp['NO_RESULT'];
                    $(".table-body").html(TEMP_HTML);
                } else {
                    webApp.noneGrant();
                }
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
 * BEGIN AJAX异步请求切换页面绑定员工列表
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestChangePageEmployee = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['BIND_EMPLOYEE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $(".table-body").html(_this.getTemplate(JSON_DATA));
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
 * BEGIN AJAX异步请求绑定部门
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestBindDepartment = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['BIND_DEPARTMENT'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            localStorage.removeItem("isAlert");
            if (data['succ']) {
                var JSON_DATA = data['data'];
                if (webApp.grantControl($(".tree-menu"), "department_select")) {
                    var TEMP_HTML = tm.getTemplate(JSON_DATA);
                    $(".tree-menu").html(TEMP_HTML);
                }
                $(".select-result").text("请选择部门");
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
 * BEGIN AJAX异步请求绑定下拉组件
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestBindDropSearch = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['BIND_DROPSEARCH'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                for (var key in JSON_DATA) {
                    var TEMP_HTML = "";
                    JSON_DATA[key].unshift({
                        Key: "",
                        Value: "不限"
                    })
                    for (var i = 0; i < JSON_DATA[key].length; i++) {
                        var TEMP_OBJ = JSON_DATA[key][i];
                        var TEMP_KEY = TEMP_OBJ['CharId'] ? TEMP_OBJ['CharId'] : TEMP_OBJ['Key'];
                        var TEMP_VALUE = TEMP_OBJ['Name'] ? TEMP_OBJ['Name'] : TEMP_OBJ['Value'];
                        TEMP_HTML += '<li data-value="' + TEMP_KEY + '" class="drop-option">' + TEMP_VALUE + '</li>'
                    }
                    $("#" + key).html(TEMP_HTML);
                }
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
 * BEGIN AJAX异步请求删除员工
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestDeleteEmployee = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['DELETE_EMPLOYEE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                var params = _this.getParams(_this.BIND_EMPLOYEE);
                _this.ajaxRequestBindEmployee(params);
                mp.hideLgPanel();
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
 * BEGIN AJAX异步请求添加部门
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestAddDepartment = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['ADD_DEPARTMENT'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                _this.exeBindDepartment();
                $("#Dpts_Add_Name").val("");
                mp.hideSmPanel();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN AJAX异步请求编辑部门
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestEditDepartment = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['EDIT_DEPARTMENT'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeBindDepartment();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            } else {
                messageBox.show("错误", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}
/**
 * BEGIN AJAX异步请求删除部门
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestDeleteDepartment = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['DELETE_DEPARTMENT'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                params = _this.getParams(_this.BIND_DEPARTMENT);
                _this.ajaxRequestBindDepartment(params);
                mp.hideSmPanel();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN AJAX异步请求获取部门
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestGetDepartment = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['GET_DEPARTMENT'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = "";
                var JSON_DATA = data['data'];
                var JSON_DATA_EXTED = data['exted'];
                var JSON_DATA_DPTSTATE = JSON_DATA_EXTED['DptState'];
                for (var i = 0; i < JSON_DATA_DPTSTATE.length; i++) {
                    TEMP_HTML += '<li data-value="' + JSON_DATA_DPTSTATE[i]['Key']
                        + '" class="drop-option">' + JSON_DATA_DPTSTATE[i]['Value'] + '</li>';
                }
                $("#Dpts_Edit_Enable").html(TEMP_HTML);
                $("#Dpts_Edit_Name").val(JSON_DATA['Name']);
                $("#Dpts_Edit li").removeClass("active");
                $("#Dpts_Edit li[data-value='" + JSON_DATA['ParentCharId'] + "']").addClass("active");
                $("#Dpts_Edit_Result").text($("#Dpts_Edit li[data-value='" + JSON_DATA['ParentCharId'] + "']>.tree-text").text());
                $("#Dpts_Edit_Enable li[data-value='" + JSON_DATA['IsEnabled'] + "']").addClass("active");
                $("#Dpts_Edit_Enable").parents(".drop-container").find(".drop-result").text($("#Dpts_Edit_Enable .active").text());
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
 * BEGIN AJAX异步请求添加员工
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestAddEmployee = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['ADD_EMPLOYEE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeBindEmployee();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN AJAX异步请求绑定添加员工
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestBindAddEmployee = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['ADD_EMPLOYEE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_JSON = {
                    roles: "Roles_EmpAdd",
                    titles: "Titles_EmpAdd",
                    genders: "Genders_EmpAdd",
                    educations: "Educations_EmpAdd"
                }
                for (var KEY in TEMP_JSON) {
                    var TEMP_HTML = "";
                    for (var i = 0; i < JSON_DATA[KEY].length; i++) {
                        var TEMP_KEY = JSON_DATA[KEY][i]["Key"] ? JSON_DATA[KEY][i]["Key"] : JSON_DATA[KEY][i]["CharId"];
                        var TEMP_VALUE = JSON_DATA[KEY][i]["Value"] ? JSON_DATA[KEY][i]["Value"] : JSON_DATA[KEY][i]["Name"];
                        TEMP_HTML += '<li data-value="' + TEMP_KEY + '" class="drop-option">' + TEMP_VALUE + '</li>';
                    }
                    $("#" + TEMP_JSON[KEY]).html(TEMP_HTML);
                    $("#" + TEMP_JSON[KEY].substring(0, TEMP_JSON[KEY].lastIndexOf("Add")) + "Edit").html(TEMP_HTML);
                }
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
 * BEGIN AJAX异步请求绑更新员工
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestBindUpdateEmployee = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['UPDATE_EMPLOYEE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_JSON = {
                    State: "#States_EmpEdit", Gender: "#Genders_EmpEdit", IsMarry: "#IsMarry_EmpEdit",
                    RoleCharId: "#Roles_EmpEdit", CardIDIsCopy: "#IsCopy_EmpEdit",
                    Education: "#Educations_EmpEdit", TitleParameterCharId: "#Titles_EmpEdit"
                };
                for (var KEY in JSON_DATA) {
                    var TEMP_VALUE = "string" == typeof JSON_DATA[KEY] ? JSON_DATA[KEY].trim() : JSON_DATA[KEY];
                    $("#" + KEY + "_EmpEdit").val(TEMP_VALUE);
                }
                for (var KEY in TEMP_JSON) {
                    var $_TEMP_SELECTOR = $(TEMP_JSON[KEY] + " li[data-value='" + JSON_DATA[KEY] + "']");
                    var $_DROP_RESULT = $(TEMP_JSON[KEY]).parents(".drop-container").eq(0).find(".drop-result");
                    if (undefined != $_TEMP_SELECTOR[0]) {
                        $(TEMP_JSON[KEY] + " li").removeClass("active");
                        $_TEMP_SELECTOR.addClass("active");
                        $_DROP_RESULT.text($_TEMP_SELECTOR.text());
                    }
                }
                var $_TEMP_DEPARTMENT = $("#Dpts_EmpEdit li[data-value='" + JSON_DATA['DepartmentCharId'] + "']");
                if (undefined != $_TEMP_DEPARTMENT[0]) {
                    var TEMP_TEXT = $_TEMP_DEPARTMENT.find(".tree-text").eq(0).text();
                    $("#Dpts_EmpEdit li").removeClass("active");
                    $_TEMP_DEPARTMENT.addClass("active");
                    $("#Dpts_EmpEdit").parents(".select-option").prev().text(TEMP_TEXT);
                }
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
 * BEGIN AJAX异步请求更新员工
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.ajaxRequestUpdateEmployee = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['UPDATE_EMPLOYEE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.exeBindEmployee();
                var params = _this.getParams(_this.DETAIL_EMPLOYEE);
                _this.ajaxRequestDetailEmployee(params);
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 点击查询员工按钮
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.btnSearchEmployee = function () {
    var _this = this;
    $(this.SEARCH_BTN).on("click", function () {
        var params = _this.getParams(_this.BIND_EMPLOYEE);
        _this.ajaxRequestBindEmployee(params);
    });
    return this;
}
/**
 * BEGIN 点击查看员工详情
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.btnDetailEmployee = function () {
    var _this = this;
    $(document).on("click", this.DETAIL_BTN, function () {
        _this.DATA_CHARID = $(this).attr("data-value").trim();
        mp.manualShowPanel({
            index: 0,
            element: ".panel-lg",
            complete: function () {
                var params = _this.getParams(_this.DETAIL_EMPLOYEE);
                _this.ajaxRequestDetailEmployee(params);
            }
        });
    });
    return this;
}
/**
 * BEGIN 点击查看密码按钮
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.btnBindPassword = function () {
    var _this = this;
    $(document).on("click", this.PASSWORD_BTN, function () {
        if ("显示密码" == $(this).text()) {
            $(this).text("隐藏密码");
            var params = _this.getParams(_this.BIND_PASSWORD);
            _this.ajaxRequestBindPassword(params);
        } else {
            $(this).text("显示密码");
            $("#Password_EmpDetail").text("******");
        }
    });
    return this;
}
/**
 * BEGIN 执行员工删除
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.exeDeleteEmployee = function () {
    var _this = this;
    messageBox.show("确认", "确定删除该员工吗 ?", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = _this.getParams(_this.DELETE_EMPLOYEE);
        _this.ajaxRequestDeleteEmployee(params);
    });
    return this;
}
/**
 * BEGIN 执行部门删除
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.exeDeleteDepartment = function () {
    var _this = this;
    messageBox.show("确认", "确定删除该部门吗 ?", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = _this.getParams(_this.DELETE_DEPARTMENT);
        _this.ajaxRequestDeleteDepartment(params);
    });
    return this;
}
/**
 * BEGIN 部门添加非空验证
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {boolean} 返回布尔类型
 */
Employee.prototype.dptAddEmptyCheck = function (params) {
    var CHECK_MESSAGE = "";
    var CHECK_RESULT = false;
    if ("请选择部门" == params['dptsAddResult']) {
        CHECK_MESSAGE = "请选择上级部门！";
    } else if (regular.check(regular.DPT_NAME_REG_EXP, params['name'])) {
        CHECK_MESSAGE = "部门名称输入有误！";
    }
    else {
        CHECK_RESULT = true;
    }
    if (!CHECK_RESULT) {
        messageBox.show("提示", CHECK_MESSAGE, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return CHECK_RESULT;
}
/**
 * BEGIN 员工添加非空验证
 * Author:PengLunJian
 * Date:2017-08-01
 * @param params 对象形参
 * @returns {boolean} 返回布尔类型
 */
Employee.prototype.empAddEmptyCheck = function (params) {
    var CHECK_MESSAGE = "";
    var CHECK_RESULT = false;
    if (undefined == params['departmentCharId']) {
        CHECK_MESSAGE = "请选择部门！";
    } else if (undefined == params['roleCharId']) {
        CHECK_MESSAGE = "请选择角色！";
    } else if (undefined == params['titleCharId']) {
        CHECK_MESSAGE = "请选择职称！";
    } else if (regular.check(regular.WORKNUMBER_REG_EXP, params['account'])) {
        CHECK_MESSAGE = "工号输入有误！";
    } else if (regular.check(regular.PWD_REG_EXP, params['password'])) {
        CHECK_MESSAGE = "密码输入有误！";
    } else if (regular.check(regular.NAME_REG_EXP, params['name'])) {
        CHECK_MESSAGE = "姓名输入有误！";
    } else if (undefined == params['gender']) {
        CHECK_MESSAGE = "请选择性别！";
    } else if (regular.check(regular.PHONE_REG_EXP, params['phone'])) {
        CHECK_MESSAGE = "手机号码输入有误！";
    } else if (undefined == params['education']) {
        CHECK_MESSAGE = "请选择学历！";
    } else if (regular.check(regular.NAME_REG_EXP, params['contact']) & params['contact'] != "") {
        CHECK_MESSAGE = "紧急联系人输入有误！";
    } else if (regular.check(regular.PHONE_REG_EXP, params['contactPhone']) & params['contactPhone'] != "") {
        CHECK_MESSAGE = "紧急联系人号码输入有误！";
    } else {
        CHECK_RESULT = true;
    }


    if (!CHECK_RESULT) {
        messageBox.show("提示", CHECK_MESSAGE, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return CHECK_RESULT;
}
/**
 * BEGIN 显示员工编辑弹窗
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.showEditEmployee = function () {
    var _this = this;
    mp.manualShowPanel({
        index: 3,
        element: ".panel-sm",
        complete: function () {
            var params = _this.getParams(_this.BIND_UPDATEEMPLOYEE);
            _this.ajaxRequestBindUpdateEmployee(params);
        }
    });
    return this;
}
/**
 * BEGIN 执行部门添加
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.exeDepartmentAdd = function () {
    var params = this.getParams(this.ADD_DEPARTMENT);
    if (this.dptAddEmptyCheck(params)) {
        this.ajaxRequestAddDepartment(params);
    }
    return this;
}
/**
 * BEGIN 执行部门编辑
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.exeDepartmentEdit = function () {
    var employeeMessage = "";
    var result = false;
    var params = this.getParams(this.EDIT_DEPARTMENT);
    if (regular.check(regular.DPT_NAME_REG_EXP, params['name'])) {
        employeeMessage = "部门名称输入有误！";
    } else {
        result = true;
    }
    if (result) {
        this.ajaxRequestEditDepartment(params);
    } else {
        messageBox.show('提示', employeeMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return this;
}
/**
 * BEGIN 执行员工添加
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.exeEmployeeAdd = function () {
    var params = this.getParams(this.ADD_EMPLOYEE);
    if (this.empAddEmptyCheck(params)) {
        this.ajaxRequestAddEmployee(params);
    }
    return this;
}
/**
 * BEGIN 执行员工绑定
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.exeBindEmployee = function () {
    var params = this.getParams(this.BIND_EMPLOYEE);
    this.ajaxRequestBindEmployee(params);
    return this;
}
/**
 * BEGIN 执行部门绑定
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.exeBindDepartment = function () {
    var params = this.getParams(this.BIND_DEPARTMENT);
    this.ajaxRequestBindDepartment(params);
    return this;
}
/**
 * BEGIN 执行员工更新
 * Author:PengLunJian
 * Date:2017-08-01
 * @returns {Employee} 返回当前对象实现连缀调用
 */
Employee.prototype.exeUpdateEmployee = function () {
    var employeeMessage = "";
    var result = false;
    var params = this.getParams(this.UPDATE_EMPLOYEE);
    if (regular.check(regular.WORKNUMBER_REG_EXP, params['account'])) {
        employeeMessage = "工号输入有误！";
    } else if (regular.check(regular.PWD_REG_EXP, params['password'])) {
        employeeMessage = "密码输入有误！";
    } else if (regular.check(regular.NAME_REG_EXP, params['name'])) {
        employeeMessage = "姓名输入有误！";
    } else if (regular.check(regular.PHONE_REG_EXP, params['phone'])) {
        employeeMessage = "手机号码输入有误！";
    } else if (regular.check(regular.NAME_REG_EXP, params['contact_Emp']) & params['contact_Emp'] != "") {
        employeeMessage = "紧急联系人输入有误！";
    } else if (regular.check(regular.PHONE_REG_EXP, params['contactPhone_Emp']) & params['contactPhone_Emp'] != "") {
        employeeMessage = "紧急联系人号码输入有误！";
    } else {
        result = true;
    }
    if (result) {
        this.ajaxRequestUpdateEmployee(params);
    } else {
        messageBox.show('提示', employeeMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return this;
}
/**
 * BEGIN 获取访问服务器的对象形参
 * Author:PengLunJian
 * Date:2017-08-01
 * @param name
 * @returns {*} 返回对象形参
 */
Employee.prototype.getParams = function (name) {
    var _this = this;
    var params = null;
    switch (name) {
        case this.ADD_EMPLOYEE:
            params = _this.getResult("Add");
            break;
        case this.ADD_DEPARTMENT:
            params = {
                sort: "1",
                name: $("#Dpts_Add_Name").val().trim(),
                dptsAddResult: $("#Dpts_Add_Result").html().trim(),
                requestKey: localStorage.getItem("requestKey"),
                parentCharId: $("#Dpts_Add .active").attr("data-value"),
                levelIn: parseInt($("#Dpts_Add .active").attr("data-level")) + 1,
            }
            break;
        case this.EDIT_DEPARTMENT:
            params = {
                charId: _this.DATA_CHARID,
                name: $("#Dpts_Edit_Name").val().trim(),
                requestKey: localStorage.getItem("requestKey"),
                parentCharId: $("#Dpts_Edit .active").attr("data-value"),
                levelIn: parseInt($("#Dpts_Edit .active").attr("data-level")) + 1,
                isEnabled: parseInt($("#Dpts_Edit_Enable .active").attr("data-value"))
            }
            break;
        case this.DELETE_DEPARTMENT:
            params = {
                charId: _this.DATA_CHARID,
                requestKey: localStorage.getItem("requestKey"),
            };
            break;
        case this.BIND_PASSWORD:
            params = {
                employeeCharId: _this.DATA_CHARID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.BIND_EMPLOYEE:
            params = {
                pageIndex: _this.PAGE_INDEX,
                pageSize: _this.PAGE_SIZE,
                key: _this.getResult("SEARCH_INPUT"),
                state: _this.getResult("STATE_CHARID"),
                roleCharId: _this.getResult("ROLE_CHARID"),
                titleCharId: _this.getResult("TITLE_CHARID"),
                requestKey: localStorage.getItem("requestKey"),
                departmentCharId: _this.getResult("DEPARTMENT_CHARID")
            }
            break;
        case this.BIND_DEPARTMENT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                isEnabled: $("#Bind-Enable .active").attr("data-value").trim()
            }
            break;
        case this.BIND_DROPSEARCH:
            params = {
                requestKey: localStorage.getItem("requestKey"),
            }
            break;
        case this.BIND_ADDEMPLOYEE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
            }
            break;
        case this.BIND_UPDATEEMPLOYEE:
            params = {
                employeeCharId: _this.DATA_CHARID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.UPDATE_EMPLOYEE:
            params = _this.getResult("Edit");
            break;
        case this.DETAIL_EMPLOYEE:
            params = {
                employeeCharId: _this.DATA_CHARID,
                requestKey: localStorage.getItem("requestKey"),
            }
            break;
        case this.DELETE_EMPLOYEE:
            params = {
                charId: _this.DATA_CHARID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.UPDATE_DEPARTMENT:
            params = {
                charId: _this.DATA_CHARID,
                requestKey: localStorage.getItem("requestKey")
            };
            break;
    }
    return params;
}
/**
 * BEGIN 初始化员工页面实例
 * Author:PengLunJian
 * Date:2017-08-01
 * @type {Employee} 员工类型
 */
var emp = new Employee();



