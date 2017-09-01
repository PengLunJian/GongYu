//移除本地缓存
localStorage.removeItem("isAlert");

/**
 * 构造函数
 * Author:liyong
 * Date:2017-7-26
 * @constructor
 */
function BillPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.QUERY_CONDITION = arguments['QUERY_CONDITION'] ? arguments['QUERY_CONDITION'] : 'QUERY_CONDITION';
    this.PAGE_SIZE= arguments['PAGE_SIZE'] ? arguments['PAGE_SIZE'] :10;
    this.BILL_PAGE = arguments['BILL_PAGE'] ? arguments['BILL_PAGE'] : 'BILL_PAGE';
    this.BILL_LIST = arguments['BILL_LIST'] ? arguments['BILL_LIST'] : 'BILL_LIST';
    this.BILL_DETAIL = arguments['BILL_DETAIL'] ? arguments['BILL_DETAIL'] : 'BILL_DETAIL';
    this.BILL_RECORD_DEL = arguments['BILL_RECORD_DEL'] ? arguments['BILL_RECORD_DEL'] : 'BILL_RECORD_DEL';
    this.BILL_LOOK = arguments['BILL_LOOK'] ? arguments['BILL_LOOK'] : '.btn-detail';
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        QUERY: "/bill/billrecords/condition",
        BILL_LIST: "/bill/billrecords",
        BILL_DETAIL: "/bill/billrecord",
        BILL_RECORD_DEL: "/bill/billrecord/delete"
    };
    this.init();
}

/**
 * 页面初始化
 * Author:liyong
 * Date:2017-7-26
 * @returns {BillPage}
 */
BillPage.prototype.init = function () {
    App.init();
    ComponentsPickers.init();
    var params = this.getParams(this.QUERY_CONDITION);
    this.ajaxRequestQueryCondition(params);
    this.billList();
    this.billDetail();
    return this;
}


/**
 * 参数列表
 * Author:liyong
 * Date:2017-7-26
 * @param name
 * @returns {*}
 */
BillPage.prototype.getParams = function (name) {
    var params = null;
    switch (name) {
        case this.QUERY_CONDITION:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.BILL_PAGE:
            params = {
                url: "/bill/billrecords",
                requestKey: localStorage.getItem("requestKey"),
                pageIndex: 1,
                pageSize:this.PAGE_SIZE,
                buildingCharId: $("#Buildings li[class='cur']").length > 0 ? $("#Buildings li[class='cur']").attr("data-value") : "",
                billSate: $("#BillState li[class='cur']").length > 0 ? parseInt($("#BillState li[class='cur']").attr("data-value")) : 0,
                billType: $("#BillType li[class='cur']").length > 0 ? parseInt($("#BillType li[class='cur']").attr("data-value")) : 0,
                costCharId: $("#BillType li[class='cur']").length > 0 ? $("#CostItem li[class='cur']").attr("data-value") : "",
                dateType: $("#BillDateType li[class='cur']").length > 0 ? parseInt($("#BillDateType li[class='cur']").attr("data-value")) : 0,
                startDate: $("#StartDate").val(),
                endDate: $("#EndDate").val(),
                key: $("#Key").val()
            };
            break;
        case this.BILL_LIST:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                pageIndex: this.pageIndex,
                pageSize: this.PAGE_SIZE,
                buildingCharId: $("#Buildings li.active").length > 0 ? $("#Buildings li.active").attr("data-value") : "",
                billSate: $("#BillState li.active").length > 0 ? parseInt($("#BillState li.active").attr("data-value")) : 0,
                billType: $("#BillType li.active").length > 0 ? parseInt($("#BillType li.active").attr("data-value")) : 0,
                costCharId: $("#CostItem li.active").length > 0 ? $("#CostItem li.active").attr("data-value") : "",
                dateType: $("#BillDateType li.active").length > 0 ? parseInt($("#BillDateType li.active").attr("data-value")) : 0,
                startDate: $("#StartDate").val(),
                endDate: $("#EndDate").val(),
                key: $("#Key").val()
            };
            break;
        case this.BILL_DETAIL:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                billRecordCharId: this.DETAIL_CHARID
            };
            break;
        case this.BILL_RECORD_DEL:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                billRecordCharId: $("#CurBillRecordCharId").val()
            };
            break;
    }
    return params;
}

/**
 * 查询条件绑定
 * Author：liyong
 * Date:2017-7-26
 * @returns {BillPage}
 */
BillPage.prototype.ajaxRequestQueryCondition = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['QUERY'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML;
                var JSON_DATA = data.data;
                var TEMP_DATA = Object.keys(JSON_DATA);
                for (var i = 0; i < TEMP_DATA.length; i++) {
                    var OBJECT_DATA = JSON_DATA[TEMP_DATA[i]];
                    TEMP_HTML = "";
                    for (var j = 0; j < OBJECT_DATA.length; j++) {
                        if (i == 0) {
                            TEMP_HTML += "<li data-value='" + OBJECT_DATA[j]['CharId'] + "' class='drop-option'>" + OBJECT_DATA[j]['Name'] + "</li>";
                        } else {
                            TEMP_HTML += "<li data-value='" + OBJECT_DATA[j]['Key'] + "' class='drop-option'>" + OBJECT_DATA[j]['Value'] + "</li>";
                        }
                    }
                    $("#" + TEMP_DATA[i] + " li:first").nextAll().remove();
                    $("#" + TEMP_DATA[i] + " li:first").after(TEMP_HTML);
                }

                DropdownInit();
            }
            else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            // 添加本地缓存
            $("#iFrmMain").load(function () {
                if (localStorage.getItem("isAlert")) {
                } else {
                    messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
                    // 添加本地缓存
                    localStorage.setItem("isAlert", true);
                }
            });
        }
    });
    return this;
}


/**
 * 账务列表
 * Author：liyong
 * Date:2017-7-26
 * @returns {BillPage}
 */
BillPage.prototype.billList = function () {
    var _this = this;
    _this.pageIndex = arguments.length != 0 ? arguments[0] : "1";
    var params = _this.getParams(_this.BILL_LIST);
    _this.ajaxRequestBillList(params);
    return this;
}

/**
 * 模板
 * Author：liyong
 * Date:2017-7-28
 * @returns {BillPage}
 */
BillPage.prototype.getTemplate = function (params) {
    var TEMP_HTML = '';
    for (var i = 0; i < params.length; i++) {
        var JSON_DATA = params[i];
        var className = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-3 col-md-12"><div class="row-title' + className + ' row">'
            + '<div class="col-xs-12 col-md-4"><div class="row"><div class="column col-xs-12 col-md-3"><span>状态</span></div><div class="column col-xs-12 col-md-2"><span>类型</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>类别</span></div><div class="column col-xs-12 col-md-2"><span>物业房号</span></div>'
            + '<div class="column col-xs-12 col-md-3"><span>姓名</span></div></div></div><div class="col-xs-12 col-md-5"><div class="row"><div class="column col-xs-12 col-md-7"><span>合同编号</span></div>'
            + '<div class="column col-xs-12 col-md-5"><span>周期</span></div></div></div><div class="col-xs-12 col-md-3"><div class="row"><div class="column col-xs-12 col-md-3"><span>收付日期</span></div>'
            + '<div class="column col-xs-12 col-md-3"><span>计划收付</span></div><div class="column col-xs-12 col-md-3"><span>实际收付</span></div>'
            + '<div class="column col-xs-12 col-md-3"><span>操作</span></div></div></div></div></div>'
            + '<div class="row-body col-xs-9 col-md-12"><div class="row-item row">'
            + '<div class="col-xs-12 col-md-4"><div class="row"><div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['State'] + '</span></div><div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['Type'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['ItemName'] + '</span></div><div class="column col-xs-12 col-md-2"><span>' + JSON_DATA['RoomName'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['CustomerName'] + '</span></div></div></div><div class="col-xs-12 col-md-5"><div class="row">'
            + '<div class="column col-xs-12 col-md-7"><span>' + JSON_DATA['ContractNumber'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-5"><span>' + JSON_DATA['PayDate1'] + '~' + JSON_DATA['PayDate2'] + '</span></div></div></div><div class="col-xs-12 col-md-3"><div class="row"><div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['PayDate'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['Price'] + '</span></div><div class="column col-xs-12 col-md-3"><span>' + JSON_DATA['Progress'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-3"><span>'
            + '<a data-id="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">查看</a></span></div></div></div></div></div></div></div>'
    }
    return TEMP_HTML;
}

/**
 * 账务列表ajax
 * Author：liyong
 * Date:2017-7-26
 * @returns {BillPage}
 */
BillPage.prototype.ajaxRequestBillList = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['BILL_LIST'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = webApp['NO_RESULT'];
                var JSON_DATA = data['data'];
                _this.PAGINATION = new Pagination({
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.BILL_LIST);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestBillLists(params);
                    }
                });
                TEMP_HTML = JSON_DATA.length != 0 ? _this.getTemplate(JSON_DATA) : TEMP_HTML;
                if (webApp.grantControl($(".pagination"), "billrecord_select")) {
                    $(".table-body").html(TEMP_HTML);
                } else {
                    // 无权限查看
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
 * 账务列表ajax BillLists
 * Author：liyong
 * Date:2017-7-31
 * @returns {BillPage}
 */
BillPage.prototype.ajaxRequestBillLists = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['BILL_LIST'],
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
 * 账务明细ajax
 * Author：liyong
 * Date:2017-7-26
 * @returns {BillPage}
 */
BillPage.prototype.billDetail = function () {
    var _this = this;
    $(document).on("click", this.BILL_LOOK, function () {
        _this.DETAIL_CHARID = $(this).attr("data-id");
        mp.manualShowPanel({
            index: 0,
            element: ".panel-lg",
            complete: function () {
                var params = _this.getParams(_this.BILL_DETAIL);
                _this.ajaxRequestBillDetail(params);
            }
        });
    });
    return this;
}
/**
 * 账务明细
 * Author：liyong
 * Date:2017-7-26
 * @returns {BillPage}
 */
BillPage.prototype.ajaxRequestBillDetail = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['BILL_DETAIL'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            //绑定费用信息
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $("#BuildingName").text(JSON_DATA['BuildingName'] + JSON_DATA['FloorName'] + "层" + JSON_DATA['RoomName'] + "室");
                $("#SerialNumber").text(JSON_DATA['SerialNumber']);
                $("#PayType").text(JSON_DATA['PayType']);
                $("#ItemName").text(JSON_DATA['ItemName']);
                $("#Type").text(JSON_DATA['Type']);
                $("#CustomerName").text(JSON_DATA['CustomerName']);
                $("#BillDate").text(JSON_DATA['PayDate1'] + "~" + JSON_DATA['PayDate2']);
                $("#PayDate").text(JSON_DATA['PayDate']);
                $("#Description").text(JSON_DATA['Description']);
                $("#Price").text(JSON_DATA['Price']);
                $("#CurBillRecordCharId").val(_this.DETAIL_CHARID);
                // 账务删除
                webApp.grantControl($(".billRecordDel"), "billrecord_delete");
            }
            else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            // 添加本地缓存
            $("#iFrmMain").load(function () {
                if (localStorage.getItem("isAlert")) {
                } else {
                    messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
                    // 添加本地缓存
                    localStorage.setItem("isAlert", true);
                }
            });
        }
    });
    return this;
}

/**
 * 账务删除
 * Author：liyong
 * Date:2017-7-26
 * @returns {BillPage}
 */
BillPage.prototype.billRecordDel = function () {
    var _this = this;
    var params = this.getParams(this.BILL_RECORD_DEL);
    messageBox.show("确认", "确认删除该流水记录？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        _this.ajaxRequestBillRecordDel(params);
    })
    return this;
}


/**
 * 账务删除ajax
 * Author：liyong
 * Date:2017-7-26
 * @returns {BillPage}
 */
BillPage.prototype.ajaxRequestBillRecordDel = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['BILL_RECORD_DEL'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                // var params = _this.getParams(_this.BILL_PAGE);
                _this.billList();
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


var bp = new BillPage();