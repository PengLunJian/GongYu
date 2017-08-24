/**
 * BEGIN 定义桌面页面构造函数
 * Author:PengLunJian
 * Date:2017-06-29
 * @constructor 构造函数
 */
function DesktopPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.ADD_TAG = arguments['ADD_TAG'] ? arguments['ADD_TAG'] : "ADD_TAG";
    this.ADD_NOTE = arguments['ADD_NOTE'] ? arguments['ADD_NOTE'] : "ADD_NOTE";
    this.EDIT_NOTE = arguments['EDIT_NOTE'] ? arguments['EDIT_NOTE'] : "EDIT_NOTE";
    this.LOAD_NOTE = arguments['LOAD_NOTE'] ? arguments['LOAD_NOTE'] : "LOAD_NOTE";
    this.NOT_EMPTY = arguments['NOT_EMPTY'] ? arguments['NOT_EMPTY'] : "NOT_EMPTY";
    this.PAGE_INIT = arguments['PAGE_INIT'] ? arguments['PAGE_INIT'] : "PAGE_INIT";
    this.DELETE_NOTE = arguments['DELETE_NOTE'] ? arguments['DELETE_NOTE'] : "DELETE_NOTE";
    this.UPDATE_NOTE = arguments['UPDATE_NOTE'] ? arguments['UPDATE_NOTE'] : "UPDATE_NOTE";
this.API_CONFIG=arguments['API_CONFIG']?arguments['API_CONFIG']:{
    UPDATE_NOTE: '/note/state',
    LOAD_NOTE:  "/note/notes",
    ADD_NOTE: "/note/add",
    ADD_TAG:"/note/dates",
    DEL_NOTE: "/note/delete"
}
    this.init(this.getParams(this.PAGE_INIT));
}
/**
 * BEGIN 初始化桌面页面方法
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.init = function (params) {
    this.initDate(params).dateComponentLoad(this.getDateTime());
    this.ajaxRequestLoadNote(this.getParams(this.LOAD_NOTE));
    this.ajaxRequestAddTag(this.getParams(this.ADD_TAG)).openEditModal();
    this.tabSelect(params).dateComponentItem(params).backToToday(params);
    this.dateComponentNext(params).dateComponentPrev(params);
        ComponentsPickers.init();
    App.init();

    new Tools({
        element: ".btn-drop",
        targetElement: ".group-drop"
    });
    return this;
}
/**
 * BEGIN 初始化桌面页面方法
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.tabSelect = function (params) {
    var _this = this;
    $(params['tabSelector']).on("click", function () {
        $(params['tabSelector']).removeClass('active');
        $(this).addClass('active');
        _this.ajaxRequestLoadNote(_this.getParams(_this.LOAD_NOTE));
    });
    return this;
}
/**
 * BEGIN 添加提醒内容非空验证
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {boolean} 返回布尔类型
 */
DesktopPage.prototype.addNoteNotEmpty = function (params) {
    var message = "";
    var result = false;
    if (params.addFormDateLen == 0) {
        message = "请选择添加日期 ！";
    } else if (params.addTextAreaLen == 0) {
        message = "请输入提醒内容 ！";
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show("提示", message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 * BEGIN 添加提醒事项
 * Author:PengLunJian
 * Date:2017-06-29
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.addNote = function () {
    var params = this.getParams(this.NOT_EMPTY);
    if (this.addNoteNotEmpty(params)) {
        params = this.getParams(this.ADD_NOTE);
        this.ajaxRequestAddNote(params);
    }
    return this;
}
/**
 * BEGIN 编辑提醒事项
 * Author:PengLunJian
 * Date:2017-06-29
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.openEditModal = function () {
    var _this = this;
    $(document).on("click", ".note-edit", function () {
        var context = $(this).text();
        var active = $('.tab-bar .active').index();
        $(".panel-edit textarea").val(context);
        _this.DATA_CHARID = $(this).attr("data-cid").trim();
        mp.manualShowPanel({
            index: 1,
            element: '.panel-sm',
            complete: function () {
                if (1 == active) $('.panel-edit .confirm').hide()
                else $('.panel-edit .confirm').show();
            }
        });
    });
    return this;
}
/**
 * BEGIN 删除提醒事项
 * Author:PengLunJian
 * Date:2017-06-29
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.deleteNote = function () {
    var _this = this;
    var params = this.getParams(this.DELETE_NOTE);
    messageBox.show("确认", "确定删除备忘？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        _this.ajaxRequestDeleteNote(params);
    })
    return this;
}
/**
 * BEGIN 处理提醒事项
 * Author:PengLunJian
 * Date:2017-06-29
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.disposeNote = function () {
    var params = this.getParams(this.UPDATE_NOTE);
    this.ajaxRequestDisposeNote(params);
    return this;
}
/**
 *
 * @returns {DesktopPage}
 */
DesktopPage.prototype.editNote = function () {
    var params = this.getParams(this.EDIT_NOTE);
    this.ajaxRequestEditNote(params);
    return this;
}
/**
 * BEGIN 获取调用方法的参数
 * Author:PengLunJian
 * Date:2017-06-29
 * @param name
 * @returns {*} 对象实参
 */
DesktopPage.prototype.getParams = function (name) {
    var _this = this;
    var params = null;
    switch (name) {
        case this.ADD_TAG:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                employeeCharId: localStorage.getItem("employeeCharId"),
                dateSelector: ".date-list li",
                dateTime: _this.getDateTime()
            };
            break;
        case this.ADD_NOTE:
            params = {
                body: $(".panel-add textarea").val().trim(),
                remindDate: $(".panel-add .group-date1").val().trim(),
                requestKey: localStorage.getItem("requestKey"),
                employeeCharId: localStorage.getItem("employeeCharId")
            };
            break;
        case this.EDIT_NOTE:
            params = {
                body: $(".panel-edit textarea").val().trim(),
                remindDate: $(".panel-edit .group-date1").val().trim(),
                requestKey: localStorage.getItem("requestKey"),
                charId: _this.DATA_CHARID
            };
            break;
        case this.LOAD_NOTE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                employeeCharId: localStorage.getItem("employeeCharId"),
                remindDate: _this.getDateTime(),
                solvedNotes: ".tab-bar li:eq(1)>span",
                suspendingNotes: ".tab-bar li:eq(0)>span"
            };
            break;
        case this.NOT_EMPTY:
            params = {
                addFormDateLen: $(".panel-add .group-date1").val().trim().length,
                addTextAreaLen: $(".panel-add textarea").val().trim().length
            }
            break;
        case this.DELETE_NOTE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: _this.DATA_CHARID
            };
            break;
        case this.UPDATE_NOTE:
            params = {
                charId: _this.DATA_CHARID,
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.PAGE_INIT:
            params = {
                dateTime: ".date-time",
                tabSelector: ".tab-bar li",
                dateSelector: ".date-list li:gt(6)"
            }
            break;
    }
    return params;
}
/**
 * BEGIN 返回日历字符串
 * Author:PengLunJian
 * Date:2017-06-29
 * @returns {string} 字符串
 */
DesktopPage.prototype.getDateTime = function () {
    var DATE_TIME = "";
    for (var i = 0; i < 3; i++) {
        var SELECTOR = ".date-time font:eq(" + i + ")";
        DATE_TIME += $(SELECTOR).text();
        DATE_TIME = i < 2 ? DATE_TIME + "-" : DATE_TIME;
    }
    return DATE_TIME;
}
/**
 * BEGIN 初始化日历组件
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.initDate = function (params) {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    day = parseInt(day) <= 9 ? "0" + day : day;
    month = parseInt(month + 1) <= 9 ? "0" + (month + 1) : month;
    var TEMP_HTML = '<font>' + year + '</font>.<font>'
        + month + '</font>.<font>' + day + '</font>';
    $(params['dateTime']).html(TEMP_HTML);
    date = null;
    return this;
}
/**
 * BEGIN 加载提醒事项
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.ajaxRequestLoadNote = function (params) {
    $.ajax({
        type: "GET",
        url: host +this.API_CONFIG['LOAD_NOTE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = "";
                var TEMP_DATA = null;
                var JSON_DATA = data['data'];
                var INDEX = $(".tab-bar .active").index();
                var TEMP_JSON_DATA = INDEX == 0 ? JSON_DATA['SuspendingNotes'] : JSON_DATA['SolvedNotes'];
                for (var i = 0; i < TEMP_JSON_DATA.length; i++) {
                    TEMP_DATA = TEMP_JSON_DATA[i];
                    TEMP_HTML += '<li class="note-edit" data-cid="'
                        + TEMP_DATA['CharId'] + '">' + TEMP_DATA['Body'] + '</li>';
                }
                $(".suspend").html(TEMP_HTML);
                TEMP_DATA = data['exted'];
                $(params['solvedNotes']).text(TEMP_DATA['SolvedNotesCount']);
                $(params['suspendingNotes']).text(TEMP_DATA['SuspendingNotesCount']);
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
 * BEGIN 添加提醒事项
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.ajaxRequestAddNote = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['ADD_NOTE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            _this.ajaxRequestAddTag(_this.getParams(_this.ADD_TAG));
            _this.ajaxRequestLoadNote(_this.getParams(_this.LOAD_NOTE));
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            mp.hideSmPanel();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}
/**
 * BEGIN 提醒事项添加标记
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.ajaxRequestAddTag = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['ADD_TAG'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $(params['dateSelector']).each(function () {
                    for (var i = 0; i < JSON_DATA.length; i++) {
                        if ($(this).text() == JSON_DATA[i]) {
                            $(this).addClass("tag");
                        }
                    }
                });
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
 * BEGIN 删除提醒事项
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.ajaxRequestDeleteNote = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['DEL_NOTE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            _this.ajaxRequestLoadNote(_this.getParams(_this.LOAD_NOTE));
            _this.ajaxRequestAddTag(_this.getParams(_this.ADD_TAG));
            _this.dateComponentLoad(_this.getDateTime());
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            mp.hideSmPanel();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}
/**
 * BEGIN 处理提醒事项
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.ajaxRequestDisposeNote = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host +_this.API_CONFIG['UPDATE_NOTE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                _this.ajaxRequestLoadNote(_this.getParams(_this.LOAD_NOTE));
                _this.ajaxRequestAddTag(_this.getParams(_this.ADD_TAG));
                mp.hideSmPanel();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            } else {
                messageBox.show("警告", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.warning);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}
/**
 *
 * @param params
 * @returns {DesktopPage}
 */
DesktopPage.prototype.ajaxRequestEditNote = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/note/update",
        data: params,
        dataType: "JSON",
        success: function (data) {
            _this.ajaxRequestLoadNote(_this.getParams(_this.LOAD_NOTE));
            _this.ajaxRequestAddTag(_this.getParams(_this.ADD_TAG));
            mp.hideSmPanel();
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            alert(txtStatus);
        }
    });
    return this;
}
/**
 * BEGIN 初始化加载日历组件
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.dateComponentLoad = function (params) {
    var array = params.split('-');
    var year = parseInt(array[0]);
    var month = parseInt(array[1]);
    var day = parseInt(array[2]);

    var end = -1;
    var result = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    switch (month) {
        case 2:
            end = result ? 29 : 28;
            break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            end = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            end = 30;
            break;
    }
    month = month > 9 ? month : "0" + month;
    var date = new Date(year + "-" + month + "-01");
    var week = date.getDay();
    var TEMP_HTML = '<ul><li>日</li><li>一</li><li>二</li>'
        + '<li>三</li><li>四</li><li>五</li><li>六</li></ul><ul>';
    for (var i = 0; i < week; i++) {
        TEMP_HTML += '<li><span></span></li>';
    }
    var className = "";
    for (var i = 1; i <= end; i++) {
        className = day == i ? ' class="cur"' : '';
        TEMP_HTML += '<li' + className + '><span>' + i + '</span></li>';
        if ((i + week) % 7 == 0) {
            TEMP_HTML += '</ul><ul>';
        }
    }
    TEMP_HTML += '</ul>';
    $(".date-list").html(TEMP_HTML);
    date = null;
    return this;
}
/**
 * BEGIN 日历上一月功能
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.dateComponentPrev = function (params) {
    var _this = this;
    $(document).on("click", ".icon-prev", function (ev) {
        var array = _this.getDateTime().split('-');
        var year = parseInt(array[0]);
        var month = parseInt(array[1]);
        var day = parseInt(array[2]);
        if (--month <= 0) {
            month = 12;
            year--;
        }
        day = day <= 9 ? "0" + day : day;
        month = month <= 9 ? "0" + month : month;
        var TEMP_HTML = '<font>' + year + '</font>.<font>'
            + month + '</font>.<font>' + day + '</font>';
        $(params['dateTime']).html(TEMP_HTML);
        _this.dateComponentLoad(_this.getDateTime());
        _this.ajaxRequestAddTag(_this.getParams(_this.ADD_TAG));
        _this.ajaxRequestLoadNote(_this.getParams(_this.LOAD_NOTE));
        ev.preventDefault();
    });
    return this;
}
/**
 * BEGIN 日历下一月功能
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.dateComponentNext = function (params) {
    var _this = this;
    $(document).on("click", ".icon-next", function (ev) {
        var array = _this.getDateTime().split('-');
        var year = parseInt(array[0]);
        var month = parseInt(array[1]);
        var day = parseInt(array[2]);
        if (++month > 12) {
            month = 1;
            year++;
        }
        day = day <= 9 ? "0" + day : day;
        month = month <= 9 ? "0" + month : month;
        var TEMP_HTML = '<font>' + year + '</font>.<font>'
            + month + '</font>.<font>' + day + '</font>';
        $(params['dateTime']).html(TEMP_HTML);
        _this.dateComponentLoad(_this.getDateTime());
        _this.ajaxRequestAddTag(_this.getParams(_this.ADD_TAG));
        _this.ajaxRequestLoadNote(_this.getParams(_this.LOAD_NOTE));
        ev.preventDefault();
    });
    return this;
}
/**
 * BEGIN 选择日历项功能
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.dateComponentItem = function (params) {
    var _this = this;
    $(document).on("click", params['dateSelector'], function () {
        var TEMP_TEXT = $(this).text();
        var TEMP_OBJ = $(params['dateTime']).children().eq(2);
        if ("" != TEMP_TEXT) {
            if (TEMP_TEXT <= 9) {
                TEMP_OBJ.text("0" + (TEMP_TEXT));
            } else {
                TEMP_OBJ.text(TEMP_TEXT);
            }
            _this.ajaxRequestLoadNote(_this.getParams(_this.LOAD_NOTE));
            $(params['dateSelector']).removeClass("cur");
            $(this).addClass("cur");
        }
    });
    return this;
}
/**
 * BEGIN 函数回到今天
 * Author:PengLunJian
 * Date:2017-06-29
 * @param params 对象形参
 * @returns {DesktopPage} 返回当前对象实现连缀调用
 */
DesktopPage.prototype.backToToday = function (params) {
    var _this = this;
    $(document).on("click", ".back-today", function () {
        _this.initDate(params);
        _this.dateComponentLoad(_this.getDateTime());
        _this.ajaxRequestAddTag(_this.getParams(_this.ADD_TAG));
        _this.ajaxRequestLoadNote(_this.getParams(_this.LOAD_NOTE));
    });
    return this;
}
/**
 * BEGIN 实例化对象
 * Author:PengLunJian
 * Date:2017-06-29
 * @type {DesktopPage}
 */
var dp = new DesktopPage();

