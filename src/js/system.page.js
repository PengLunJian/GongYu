/**
 * BEGIN 定义系统页面构造函数
 * Author:PengLunJian
 * Date:2017-07-14
 * @constructor 构造函数
 */
function SystemPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.ACTIVE = arguments['ACTIVE'] ? arguments['ACTIVE'] : "active";
    this.BTN_PLUS = arguments['BTN_PLUS'] ? arguments['BTN_PLUS'] : ".btn.plus";
    this.SET_ITEM = arguments['SET_ITEM'] ? arguments['SET_ITEM'] : ".set-item";
    this.BIND_BILL = arguments['BIND_BILL'] ? arguments['BIND_BILL'] : "BIND_BILL";
    this.ADD_LABEL = arguments['ADD_LABEL'] ? arguments['ADD_LABEL'] : "ADD_LABEL";
    this.RIGHT_ITEM = arguments['RIGHT_ITEM'] ? arguments['RIGHT_ITEM'] : ".right-item";
    this.UPDATE_BILL = arguments['UPDATE_BILL'] ? arguments['UPDATE_BILL'] : "UPDATE_BILL";
    this.BIND_PREFER = arguments['BIND_PREFER'] ? arguments['BIND_PREFER'] : "BIND_PREFER";
    this.BIND_WECHAT = arguments['BIND_WECHAT'] ? arguments['BIND_WECHAT'] : "BIND_WECHAT";
    this.RIGHT_BLOCK = arguments['RIGHT_BLOCK'] ? arguments['RIGHT_BLOCK'] : ".right-block";
    this.SET_CONTENT = arguments['SET_CONTENT'] ? arguments['SET_CONTENT'] : ".set-content";
    this.DELETE_LABEL = arguments['DELETE_LABEL'] ? arguments['DELETE_LABEL'] : "DELETE_LABEL";
    this.BIND_COMPANY = arguments['BIND_COMPANY'] ? arguments['BIND_COMPANY'] : "BIND_COMPANY";
    this.BIND_CONTRACT = arguments['BIND_CONTRACT'] ? arguments['BIND_CONTRACT'] : "BIND_CONTRACT";
    this.BIND_PROPERTY = arguments['BIND_PROPERTY'] ? arguments['BIND_PROPERTY'] : "BIND_PROPERTY";
    this.BIND_CUSTOMER = arguments['BIND_CUSTOMER'] ? arguments['BIND_CUSTOMER'] : "BIND_CUSTOMER";
    this.BIND_EMPLOYEE = arguments['BIND_EMPLOYEE'] ? arguments['BIND_EMPLOYEE'] : "BIND_EMPLOYEE";
    this.UPDATE_WECHAT = arguments['UPDATE_WECHAT'] ? arguments['UPDATE_WECHAT'] : "UPDATE_WECHAT";
    this.UPDATE_PREFER = arguments['UPDATE_PREFER'] ? arguments['UPDATE_PREFER'] : "UPDATE_PREFER";
    this.UPDATE_COMPANY = arguments['UPDATE_COMPANY'] ? arguments['UPDATE_COMPANY'] : "UPDATE_COMPANY";
    this.UPDATE_CONTRACT = arguments['UPDATE_CONTRACT'] ? arguments['UPDATE_CONTRACT'] : "UPDATE_CONTRACT";
    this.API_CONFIG=arguments['API_CONFIG']?arguments['API_CONFIG']:{
        BIND_BILL: "/param/bill",
        BIND_WECHAT: "/param/wx",
        BIND_PREFER: "/param/prefer",
        BIND_CONTRACT: "/param/contract",
        BIND_COMPANY: "/param/company",
        BIND_PROPERTY: "/param/building",
        BIND_CUSTOMER: "/param/customer",
        BIND_EMPLOYEE: "/param/employee",
        UPDATE_BILL: "/param/update/bill ",
        UPDATE_PREFER: "/param/update/prefer ",
        UPDATE_WECHAT: "/param/update/wx",
        UPDATE_COMPANY: "/param/update/company",
        UPDATE_CONTRACT: "/param/update/contract",
        DELETE_LABEL: "/param/delete/tag",
        ADD_LABEL: "/param/add/tag"
    }
    this.init();
}
/**
 * BEGIN 初始化系统页面方法
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.init = function () {
    this.tabSelect();
    this.plusBtnClick();
    this.exeDeleteLabel();
    this.lookGrant();

    var params = this.getParams(this.BIND_COMPANY);
    this.ajaxRequestBindCompany(params);

    params = this.getParams(this.BIND_WECHAT);
    this.ajaxRequestBindWeChat(params);

    params = this.getParams(this.BIND_PREFER);
    this.ajaxRequestBindPrefer(params);

    params = this.getParams(this.BIND_PROPERTY);
    this.ajaxRequestBindProperty(params);

    params = this.getParams(this.BIND_CUSTOMER);
    this.ajaxRequestBindCustomer(params);

    params = this.getParams(this.BIND_EMPLOYEE);
    this.ajaxRequestBindEmployee(params);

    params = this.getParams(this.BIND_BILL);
    this.ajaxRequestBindBill(params);

    params = this.getParams(this.BIND_CONTRACT);
    this.ajaxRequestBindContract(params);

    return this;
}

/**
 * 查看权限
 * @returns {SystemPage}
 */
SystemPage.prototype.lookGrant = function () {
    if (!webApp.grantControl($(".confir"), "param_select")) {
        var TEMP_HTML = '<div class="imgs">'
            + '<img src="images/withoutPower.png" alt=""/>'
            + '<p>抱歉，您暂时没有相关权限，请联系管理员！</p></div>';
        $(".right-block").html(TEMP_HTML);
    }
    $('.right-content ul:first').addClass('active');
    return this;
}

/**
 * BEGIN 侧边选项卡切换功能
 * Author:PengLunJian
 * Date:2017-07-14
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.tabSelect = function () {
    var _this = this;
    $(document).on("click", this.SET_ITEM, function () {
        var CHILD_INDEX = $(this).index();
        var PARENT_INDEX = $(this).parents(_this.SET_CONTENT).index();
        $(_this.SET_ITEM).removeClass(_this.ACTIVE);
        $(this).addClass(_this.ACTIVE);
        $(_this.RIGHT_ITEM).removeClass(_this.ACTIVE);
        $(_this.RIGHT_BLOCK).removeClass(_this.ACTIVE);
        $(_this.RIGHT_BLOCK).eq(PARENT_INDEX).addClass(_this.ACTIVE);
        $(_this.RIGHT_BLOCK).eq(PARENT_INDEX).find(_this.RIGHT_ITEM).eq(CHILD_INDEX).addClass(_this.ACTIVE);
    });
    return this;
}
/**
 * BEGIN 异步绑定账单参数
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestBindBill = function (params) {
    var _this = this;
    $.ajax({
        url: host +_this.API_CONFIG['BIND_BILL'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA_FIRST = data['data']['data1'];
                var JSON_DATA_SECOND = data['data']['data2'];

                $("#" + JSON_DATA_FIRST[0]['name']).val(JSON_DATA_FIRST[0]['value']);
                var TEMP_HTML = _this.getTemplate(JSON_DATA_SECOND);
                $("#BillParam .item-header").after(TEMP_HTML);
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
 * BEGIN 异步绑定商户信息
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestBindCompany = function (params) {
    $.ajax({
        url: host + this.API_CONFIG['BIND_COMPANY'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $("#FullName").val(JSON_DATA['FullName']);
                $("#Description").val(JSON_DATA['Description']);
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
 * BEGIN 异步绑定公众号对接
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestBindWeChat = function (params) {
    $.ajax({
        url: host + this.API_CONFIG['BIND_WECHAT'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $("#title").val(JSON_DATA['Title'].trim());
                $("#appId").val(JSON_DATA['AppId'].trim());
                $("#mpFile").val(JSON_DATA['MPFile'].trim());
                $("#ableUrl").val(JSON_DATA['AbleUrl'].trim());
                $("#appSecret").val(JSON_DATA['AppSecret'].trim());
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
 * BEGIN 异步绑定偏好设置
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestBindPrefer = function (params) {
    $.ajax({
        url: host +this.API_CONFIG['BIND_PREFER'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data']['dataList'];
                for (var i = 0; i < params['dropItems'].length; i++) {
                    var TEMP_HTML = "";
                    var TEMP_ATTR = params['dropItems'][i];
                    var TEMP_OBJ = JSON_DATA[TEMP_ATTR];
                    for (var j = 0; j < TEMP_OBJ.length; j++) {
                        var ACTIVE = j == 0 ? " active" : "";
                        TEMP_HTML += '<li class="drop-option' + ACTIVE + '">' + TEMP_OBJ[j]['Value'] + '</li>';
                    }
                    $("#" + TEMP_ATTR).html(TEMP_HTML);
                }
                webApp.defaultSelectOption();
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
 * BEGIN 异步绑定物业参数
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestBindProperty = function (params) {
    var _this = this;
    $.ajax({
        url: host +_this.API_CONFIG['BIND_PROPERTY'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_HTML = _this.getTemplate(JSON_DATA);
                $("#BuildingParam").append(TEMP_HTML);
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
 * BEGIN 异步绑定客户参数
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestBindCustomer = function (params) {
    var _this = this;
    $.ajax({
        url: host + this.API_CONFIG['BIND_CUSTOMER'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_HTML = _this.getTemplate(JSON_DATA);
                $("#CustomerParam").append(TEMP_HTML);
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
 * BEGIN 异步绑定员工参数
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestBindEmployee = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_EMPLOYEE'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_HTML = _this.getTemplate(JSON_DATA);
                $("#EmployeeParam").append(TEMP_HTML);
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
 * BEGIN 异步绑定合同参数
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestBindContract = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_CONTRACT'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA_FIRST = data['data']['data1'];
                for (var i = 0; i < JSON_DATA_FIRST.length; i++) {
                    $("#" + JSON_DATA_FIRST[i]['name']).val(JSON_DATA_FIRST[i]['value']);
                }
                var JSON_DATA_SECOND = data['data']['data2'];
                var TEMP_HTML = _this.getTemplate(JSON_DATA_SECOND);
                $("#ContractParam .item-content:eq(0)").after(TEMP_HTML);
            }
            else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 异步更新账单参数
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestUpdatePrefer = function (params) {
    $.ajax({
        url: host + this.API_CONFIG['UPDATE_PREFER'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 异步更新商户信息
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestUpdateCompany = function (params) {
    $.ajax({
        url: host + this.API_CONFIG['UPDATE_COMPANY'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 异步更新公众号信息
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestUpdateWeChat = function (params) {
    $.ajax({
        url: host + this.API_CONFIG['UPDATE_WECHAT'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 异步更新账单参数
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestUpdateBill = function (params) {
    $.ajax({
        url: host + this.API_CONFIG['UPDATE_BILL'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 异步更新合同参数
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestUpdateContract = function (params) {
    $.ajax({
        url: host + this.API_CONFIG['UPDATE_CONTRACT'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 异步添加标签
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestAddLabel = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['ADD_LABEL'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            _this.DATA_CHARID = data['data']['charId'];
            var TEMP_HTML = '<li class="list-option"><span class="list-span">' + params['value'] + '</span>'
                + '<i id="' + _this.DATA_CHARID + '" class="list-icon icon-close"></i></li>';
            $("#" + _this.TAG_KEY).prev().append(TEMP_HTML);

            $("#tag-name").val("");
            mp.hideSmPanel();
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 异步删除标签
 * Author:PengLunJian
 * Date:2017-07-14
 * @param params 对象形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.ajaxRequestDeleteLabel = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['DELETE_LABEL'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                $("#" + _this.DATA_CHARID).parent().remove();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * BEGIN 执行偏好设置更新
 * Author:PengLunJian
 * Date:2017-07-14
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.exeUpdatePrefer = function () {
    var params = this.getParams(this.UPDATE_PREFER);
    this.ajaxRequestUpdatePrefer(params);
    return this;
}
/**
 * BEGIN 执行商户信息更新
 * Author:PengLunJian
 * Date:2017-07-14
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.exeUpdateCompany = function () {
    var params = this.getParams(this.UPDATE_COMPANY);
    this.ajaxRequestUpdateCompany(params);
    return this;
}
/**
 * BEGIN 执行公众号信息更新
 * Author:PengLunJian
 * Date:2017-07-14
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.exeUpdateWeChat = function () {
    var params = this.getParams(this.UPDATE_WECHAT);
    this.ajaxRequestUpdateWeChat(params);
    return this;
}
/**
 * BEGIN 执行账单参数更新
 * Author:PengLunJian
 * Date:2017-07-14
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.exeUpdateBill = function () {
    var params = this.getParams(this.UPDATE_BILL);
    this.ajaxRequestUpdateBill(params);
    return this;
}
/**
 * BEGIN 执行合同参数更新
 * Author:PengLunJian
 * Date:2017-07-14
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.exeUpdateContract = function () {
    var params = this.getParams(this.UPDATE_CONTRACT);
    this.ajaxRequestUpdateContract(params);
    return this;
}
/**
 * BEGIN 执行标签删除操作
 * Author:PengLunJian
 * Date:2017-07-14
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.exeDeleteLabel = function () {
    var _this = this;
    $(document).on("click", ".list-icon", function () {
        _this.DATA_CHARID = $(this).attr("id").trim();
        messageBox.show("确认", "确认删除该标签吗？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            var params = _this.getParams(_this.DELETE_LABEL);
            _this.ajaxRequestDeleteLabel(params);
        });
    });
    return this;
}
/**
 * BEGIN 执行标签添加操作
 * Author:PengLunJian
 * Date:2017-07-14
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.exeAddLabel = function () {
    if (this.notEmptyCheck()) {
        var params = this.getParams(this.ADD_LABEL);
        this.ajaxRequestAddLabel(params);
    }
    return this;
}
/**
 * BEGIN 点击添加标签按钮
 * Author:PengLunJian
 * Date:2017-07-14
 * @param name 分类形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.plusBtnClick = function () {
    var _this = this;
    $(document).on("click", this.BTN_PLUS, function () {
        _this.TAG_KEY = $(this).attr("id").trim();
        $('.label-name').html($(this).parent().find('.item-label').html());
        mp.manualShowPanel({
            index: 0,
            element: ".panel-sm"
        });
    });
    return this;
}
/**
 * BEGIN 标签添加非空验证
 * Author:PengLunJian
 * Date:2017-07-14
 * @param name 分类形参
 * @returns {boolean}
 */

SystemPage.prototype.notEmptyCheck = function () {
    var message = "";
    var result = false;
    var tagName = $("#tag-name").val().trim();
    var regExp = /^[\w\u4E00-\u9FA5\uF900-\uFA2D]{1,10}$/g;
    if (!tagName) {
        message = "标签值不能为空！";
    } else if (!regExp.test(tagName)) {
        message = "标签名称为1~10个字符！";
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show("提示", message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 * BEGIN 获取异步操作参数
 * Author:PengLunJian
 * Date:2017-07-14
 * @param name 分类形参
 * @returns {SystemPage} 返回当前对象实现连缀调用
 */
SystemPage.prototype.getParams = function (name) {
    var _this = this;
    var params = null;
    switch (name) {
        case this.BIND_BILL:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.BIND_WECHAT:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.BIND_PREFER:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                dropItems: ['BuildingView', 'DesktopDate', 'SystemStyle']
            }
            break;
        case this.BIND_CONTRACT:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.BIND_COMPANY:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.BIND_PROPERTY:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.BIND_CUSTOMER:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.BIND_EMPLOYEE:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.UPDATE_BILL:
            params = {
                billExpire: $("#BillExpire").val(),
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.UPDATE_PREFER:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                desktopDate: $("#DesktopDate>li.active").index() + 1,
                systemStyle: $("#SystemStyle>li.active").index() + 1,
                buildingView: $("#BuildingView>li.active").index() + 1
            }
            break;
        case this.UPDATE_WECHAT:
            params = {
                Title: $("#title").val().trim(),
                AppId: $("#appId").val().trim(),
                MPFile: $("#mpFile").val().trim(),
                AbleUrl: $("#ableUrl").val().trim(),
                AppSecret: $("#appSecret").val().trim(),
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.UPDATE_COMPANY:
            params = {
                fullName: $("#FullName").val(),
                description: $("#Description").val(),
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.UPDATE_CONTRACT:
            params = {
                unitPriceT: $("#UnitPriceT").val(),
                unitPriceD: $("#UnitPriceD").val(),
                unitPriceC: $("#UnitPriceC").val(),
                contractExpire: $("#ContractExpire").val(),
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.DELETE_LABEL:
            params = {
                charId: _this.DATA_CHARID,
                requestKey: localStorage.getItem("requestKey"),
            };
            break;
        case this.ADD_LABEL:
            params = {
                key: _this.TAG_KEY,
                value: $('#tag-name').val(),
                requestKey: localStorage.getItem("requestKey")
            };
            break;
    }
    return params;
}

/**
 * 模板
 * @param params
 * @returns {string}
 */
SystemPage.prototype.getTemplate = function (params) {
    var TEMP_HTML = '';
    for (var i = 0; i < params.length; i++) {
        TEMP_HTML += '<div class="item-content row"><label class="item-label">'
            + params[i]['Name'] + '</label><ul class="item-list">';
        var TEMP_JSON_DATA = params[i]['Value'];
        for (var j = 0; j < TEMP_JSON_DATA.length; j++) {
            var TEMP_DATA = TEMP_JSON_DATA[j];
            TEMP_HTML += webApp.grantControl($(".confirm"), "param_update") ?
                '<li class="list-option"><span class="list-span">' + TEMP_DATA['Value'] + '</span>'
                + '<i id="' + TEMP_DATA['CharId'] + '" class="list-icon icon-close"></i></li>' :
                '<li class="list-option"><span class="list-span">' + TEMP_DATA['Value'] + '</span></li>';
        }
        TEMP_HTML += webApp.grantControl($(".confirm"), "param_update") ?
            '</ul><button class="btn plus icon-plus" id="' + params[i]['Key'] + '"></button></div>' : '</ul></div>';
    }


    return TEMP_HTML;
}

/**
 * BEGIN 初始化系统页面
 * Author:PengLunJian
 * Date:2017-07-14
 * @type {SystemPage} 系统页面类型
 */
var sp = new SystemPage();



