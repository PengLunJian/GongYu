/**
 * 构造函数
 * Author:liyong
 * Date:2017-8-16
 * @constructor
 */
function LogPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.LOG_LIST = arguments['LOG_LIST'] ? arguments['LOG_LIST'] : 'LOG_LIST';
    this.CONDITION = arguments['CONDITION'] ? arguments['CONDITION'] : 'CONDITION';
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        LOG_LIST: '/log/logs',
        CONDITION: '/log/condition',
    }
    this.init();
}

/**
 * Author:liyong
 * Date:2017-8-17
 * 初始化
 * @returns {LogPage}
 */
LogPage.prototype.init = function () {
    App.init();
    ComponentsPickers.init();
    var params = this.getParams(this.CONDITION);
    this.ajaxRequestLogCondition(params);

    this.logList();
    return this;
}

/**
 * Author:liyong
 * Date:2107-8-17
 * 参数列表
 * @param name
 * @returns {*}
 */
LogPage.prototype.getParams = function (name) {
    var params = null;
    switch (name) {
        case this.LOG_LIST:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                logType: $("#OperationType .active").length > 0 ? $("#OperationType .active").attr("data-value") : 0,
                menu: $("#LogMenu .active").length > 0 ? $("#LogMenu .active").attr("data-value") : "",
                status: $("#LogStatus .active").length > 0 ? $("#LogStatus .active").attr("data-value") : 0,
                startDate: $("#StartDate").val(),
                endDate: $("#EndDate").val(),
                pageIndex: this.pageIndex,
                pageSize: 10,
            };
            break;
        case this.CONDITION:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
    }
    return params;
}


/**
 * Author:liyong
 * Date:2017-8-17
 * 日志列表
 * @returns {LogPage}
 */
LogPage.prototype.logList = function () {
    var _this = this;
    _this.pageIndex = arguments.length != 0 ? arguments[0] : "1";
    var params = _this.getParams(_this.LOG_LIST);
    _this.ajaxRequestLogList(params);
    return this;
}
/**
 * Author:liyong
 * Date:2017-8-17
 * 日志列表ajax
 * @param params
 * @returns {LogPage}
 */
LogPage.prototype.ajaxRequestLogList = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + this.API_CONFIG['LOG_LIST'],
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = webApp['NO_RESULT'];
                var JSON_DATA = data['data'];
                _this.PAGINATION = new Pagination({
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.LOG_LIST);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestLogLists(params);
                    }
                });
                TEMP_HTML = JSON_DATA.length != 0 ? _this.getTemplate(JSON_DATA) : TEMP_HTML;
                if (webApp.grantControl($(".pagination"), "log_select")) {
                    $(".table-body").html(TEMP_HTML);
                } else {
                    // 无权限查看
                    webApp.noneGrant();
                }

            }
            else {
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
 * Author:liyong
 * Date:2017-8-17
 * 日志列表ajaxs
 * @param params
 * @returns {LogPage}
 */
LogPage.prototype.ajaxRequestLogLists = function (params) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: host + this.API_CONFIG['LOG_LIST'],
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $(".table-body").html(_this.getTemplate(JSON_DATA));
            }
            else {
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
 *  Author:liyong
 *  Date:2017-8-17
 *  查询条件
 * @param params
 */
LogPage.prototype.ajaxRequestLogCondition = function (params) {
    $.ajax({
        type: 'GET',
        data: params,
        url: host + this.API_CONFIG['CONDITION'],
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                if (data['succ']) {
                    var TEMP_HTML;
                    var JSON_DATA = data.data;
                    var TEMP_DATA = Object.keys(JSON_DATA);
                    for (var i = 0; i < TEMP_DATA.length; i++) {
                        var OBJECT_DATA = JSON_DATA[TEMP_DATA[i]];
                        TEMP_HTML = "";
                        for (var j = 0; j < OBJECT_DATA.length; j++) {
                            TEMP_HTML += "<li data-value='" + OBJECT_DATA[j]['Key'] + "' class='drop-option'>" + OBJECT_DATA[j]['Value'] + "</li>";
                        }

                        $("#" + TEMP_DATA[i] + " li").remove();
                        $("#" + TEMP_DATA[i]).html(TEMP_HTML);
                    }

                }
            } else {
                messageBox.show('提示', data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }

        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show('错误', txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }

    })
}

/**
 * Author:liyong
 * Date:2017-8-17
 * 模板
 * @param params
 * @returns {string}
 */
LogPage.prototype.getTemplate = function (params) {
    var TEMP_HTML = '';
    for (var i = 0; i < params.length; i++) {
        var JSON_DATA = params[i];
        var className = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-3 col-md-12"><div class="row-title' + className + ' row">'
            + '<div class="column col-xs-12 col-md-1">模块</div><div class="column col-xs-12 col-md-1">类型</div><div class="column col-xs-12 col-md-1">状态</div>'
            + '<div class="column col-xs-12 col-md-3">日志内容</div><div class="column col-xs-12 col-md-2">IP</div>'
            + '<div class="column col-xs-12 col-md-1">操作人</div><div class="column col-xs-12 col-md-3">操作时间</div>'
            + '</div></div>'
            + '<div class="row-body col-xs-9 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Menu'] + '</div><div class="column col-xs-12 col-md-1">'
            + JSON_DATA['LogType'] + '</div><div class="column col-xs-12 col-md-1">' + JSON_DATA['Status'] + '</div>'
        if(JSON_DATA['Description'].length>=40){
            TEMP_HTML += '<div class="column col-xs-12 col-md-3 log-describe"><p class="log-contents">'+ JSON_DATA['Description'] + '</p>'
                +'<div class="hover">'+ JSON_DATA['Description'] + '</div></div>'
        }else{
            TEMP_HTML += '<div class="column col-xs-12 col-md-3 log-content">'+ JSON_DATA['Description'] + '</div>'
        }
        TEMP_HTML +='<div class="column col-xs-12 col-md-2">' + JSON_DATA['IPAddress'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['CreateEmpName'] + '</div><div class="column col-xs-12 col-md-3">' + JSON_DATA['CreateTime'] + '</div>'
            + '</div></div></div></div>'

    }
    return TEMP_HTML;
}



var lp = new LogPage();