/**
 *
 * @constructor
 */
function ReportPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.MRT = arguments['MRT'] ? arguments['MRT'] : 'MRT';
    this.QRT = arguments['QRT'] ? arguments['QRT'] : 'QRT';
    this.HRT = arguments['HRT'] ? arguments['HRT'] : 'HRT';
    this.YRT = arguments['YRT'] ? arguments['YRT'] : 'YRT';
    this.DMR = arguments['DMR'] ? arguments['DMR'] : '#month-lists  ul';
    this.DQR = arguments['DQR'] ? arguments['DQR'] : '#quarter-lists ul';
    this.DHY = arguments['DHY'] ? arguments['DHY'] : '#half-lists ul';
    this.DYR = arguments['DYR'] ? arguments['DYR'] : '#year-lists .selected-date li ul';
    this.INDEX = arguments['INDEX'] ? arguments['INDEX'] : 0;
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] :
        {
            MONTH: '/statistic/report',
            QUARTER: '/statistic/reportbyquarter',
            HALF: '/statistic/reportbyhalfyear',
            YEAR: '/statistic/reportbyyear'
        }
    this.init();
}
/**
 *
 * @returns {ReportPage}
 */
ReportPage.prototype.init = function () {
    this.listCheck();
    this.dateSelect();
    this.dateSelects();
    DropdownInit();
    return this;
}
/**
 *参数
 * @param name
 * @returns {*}
 */
ReportPage.prototype.getParams = function (name) {
    var params = null;
    switch (name) {
        case this.MRT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                year: parseInt($(".year .active").html()),
                month: parseInt($(".month #month-lists .active").html())
            };
            break;
        case this.QRT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                year: parseInt($(".year .active").html()),
                quarter: $("#quarter-lists .active").attr("data-quarter")
            };
            break;
        case this.HRT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                year: parseInt($(".year .active").html()),
                halfyear: $("#half-lists .active").attr("data-half")
            };
            break;
        case this.YRT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                year: parseInt($(".year .active").html())
            };
            break;
    }
    return params;
}

/**
 * 选择切换
 * @returns {ReportPage}
 */
ReportPage.prototype.dateSelects = function () {
    var _this = this;
    var params;
    if (_this.INDEX == 0) {
        params = _this.getParams(_this.MRT);
        _this.API_CONFIG['url'] = _this.API_CONFIG['MONTH'];
        _this.ajaxRequestReport(params);
    } else if (_this.INDEX == 1) {
        params = _this.getParams(_this.QRT);
        _this.API_CONFIG['url'] = _this.API_CONFIG['QUARTER'];
        _this.ajaxRequestReport(params);
    } else if (_this.INDEX == 2) {
        params = _this.getParams(_this.HRT);
        _this.API_CONFIG['url'] = _this.API_CONFIG['HALF'];
        _this.ajaxRequestReport(params);
    } else if (_this.INDEX == 3) {
        params = _this.getParams(_this.YRT);
        _this.API_CONFIG['url'] = _this.API_CONFIG['YEAR'];
        _this.ajaxRequestReport(params);
    }
    return this;
};

ReportPage.prototype.dateSelect = function () {
    var _this = this;
    webApp.selectDropOption(function () {
        _this.dateSelects();
    });
    return this;
}
/**
 *数据填充
 * @returns {ReportPage}
 */
ReportPage.prototype.fillData = function () {
    var _this = this;
    var JSON_DATA = this.INIT_DATA.data;
    var TEMP_DATA = Object.keys(JSON_DATA);
    for (var i = 0; i < TEMP_DATA.length; i++) {
        var OBJECT_DATA = JSON_DATA[TEMP_DATA[i]];
        var ARRAY_DATA = Object.keys(OBJECT_DATA);
        for (var j = 0; j < ARRAY_DATA.length; j++) {
            // $("#" + _this.INIT_DATA.id + " ." + ARRAY_DATA[j] + " span").html(OBJECT_DATA[ARRAY_DATA[j]]);
            $(".right-body" + " ." + ARRAY_DATA[j] + " span").html(OBJECT_DATA[ARRAY_DATA[j]]);
        }
    }

    // 账务流水
    $(".right-body" + " .real-income span").html($(".right-body" + " .HasReceive span").html());
    $(".right-body" + " .real-spending span").html($(".right-body" + " .HasPay span").html());
    $(".right-body" + " .costAll span").html($(".right-body" + " .real-income span").html() - $(".right-body" + " .real-spending span").html());
    // $("#" + _this.INIT_DATA.id +" .real-income span").html($("#" + _this.INIT_DATA.id +" .HasReceive span").html());
    // $("#" + _this.INIT_DATA.id +" .real-spending span").html($("#" + _this.INIT_DATA.id +" .HasPay span").html());
    // $("#" + _this.INIT_DATA.id + " .costAll span").html($("#" + _this.INIT_DATA.id +" .real-income span").html() - $("#" + _this.INIT_DATA.id +" .real-spending span").html());
    return this;
}

/**
 * 报表切换
 * Author:liyong
 * Date:2017-7-25
 * @returns {ReportPage}
 */
ReportPage.prototype.listCheck = function () {
    var _this = this;
    $(".selected-date").find(".select-month").eq(_this.INDEX).show().siblings(".select-month").hide();
    $(".report-list li").click(function () {
        _this.INDEX = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".selected-date").find(".select-month").eq(_this.INDEX).show().siblings(".select-month").hide();
        _this.dateSelects();
    })
    return this;
}
/**
 *获取数据
 * @param params
 * @returns {ReportPage}
 */

ReportPage.prototype.ajaxRequestReport = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['url'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                _this.INIT_DATA = data;
                _this.fillData();
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

var report = new ReportPage();