/**
 *
 * @constructor
 */
function Management() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.ACTIVE = arguments['ACTIVE'] ? arguments['ACTIVE'] : 'active';
    this.PAGE_SIZE = arguments['PAGE_SIZE'] ? arguments['PAGE_SIZE'] : 10;
    this.PAGE_INDEX = arguments['PAGE_INDEX'] ? arguments['PAGE_INDEX'] : 1;
    this.TAB_BTN = arguments['TAB_BTN'] ? arguments['TAB_BTN'] : '.tab-bar li';
    this.PAGINATION = arguments['PAGINATION'] ? arguments['PAGINATION'] : null;
    this.BTN_DETAIL = arguments['BTN_DETAIL'] ? arguments['BTN_DETAIL'] : '.btn-detail';

    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        BIND_LOAD: '/device/base',
        BIND_DEVICES: '/devices',
        ADD_DEVICES: '/device/add',
        BIND_FLOOR: '/building/floors',
        BIND_ROOMS: '/building/roomsbyfloor'
    };
    this.init();
}
/**
 *
 * @returns {Management}
 */
Management.prototype.init = function () {
    ComponentsPickers.init();

    this.exeBindLoad();
    this.tabChange();
    this.btnSearch();
    this.dropChange();
    this.btnDetailClick();

    new TabComponent({
        changeEnd: function (obj) {

        }
    });

    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.tabChange = function () {
    var _this = this;
    $(document).on('click', this.TAB_BTN, function () {
        $(_this.TAB_BTN).removeClass(_this.ACTIVE);
        $(this).addClass(_this.ACTIVE);
        _this.exeBindDevices();
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.dropChange = function () {
    var _this = this;
    webApp.selectDropOption(function (obj) {
        var _obj = $(obj);
        var DROP_ID = _obj.parent().attr('id');
        switch (DROP_ID) {
            case 'EquBuilding':
                _this.exeBindFloor();
                break;
            case 'EquNumber':
                _this.exeBindRooms();
                break;
            case 'EquRoom':
                break;
        }
    });
    return this;
}
/**
 *
 * @returns {boolean}
 */
Management.prototype.addDevicesNotEmpty = function () {
    var message = '';
    var result = false;
    if (!$('#Add_Type .active').attr('data-value')) {
        message = '请选择设备类型！';
    } else if (!$('#Add_Name').val().trim()) {
        message = '请输入设备名称！';
    } else if (!$('#Add_Number').val().trim()) {
        message = '请输入设备序列号！';
    } else if (!$('#Add_UUID').val().trim()) {
        message = '请输入设备UUID编号！';
    } else {
        result = true;
    }
    if (!result) {
        messageBox.show('提示', message, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return result;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.btnDetailClick = function () {
    var _this = this;
    $(document).on('click', this.BTN_DETAIL, function () {
        var TEMP_INDEX = parseInt($('.tab-bar .active').index());
        mp.manualShowPanel({
            index: TEMP_INDEX,
            element: '.panel-lg',
            complete: function () {

            }
        });
    });
    return this;
}
/**
 *
 * @param params
 * @returns {string}
 */
Management.prototype.getTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_CLASS = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        TEMP_CLASS = i >= 1 ? " visible-xs visible-sm" : "";
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_CLASS + ' row">'
            + '<div class="column col-xs-12 col-md-3">设备名称</div><div class="column col-xs-12 col-md-3">设备类型</div>'
            + '<div class="column col-xs-12 col-md-3">房间号</div><div class="column col-xs-12 col-md-3">操作</div>'
            + '</div></div><div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Name'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Type'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['Bind'] + '</div><div class="column col-xs-12 col-md-3">'
            + '<a data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">查看</a>'
            + '</div></div></div></div></div>';
    }
    return TEMP_HTML;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestBindFloor = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_FLOOR'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = '';
                var TEMP_DATA = null;
                var JSON_DATA = data['data'];
                JSON_DATA.unshift({CharId: '', Name: '不限'});
                for (var i = 0; i < JSON_DATA.length; i++) {
                    var TEMP_NAME = i == 0 ? ' active' : '';
                    TEMP_DATA = JSON_DATA[i];
                    TEMP_HTML += '<li class="drop-option' + TEMP_NAME + '" data-value="' + TEMP_DATA['CharId'] + '">' + TEMP_DATA['Name'] + '</li>';
                }
                TEMP_DATA = null;
                $('#EquNumber').html(TEMP_HTML);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestBindRooms = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_ROOMS'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = '';
                var TEMP_DATA = null;
                var JSON_DATA = data['data'];
                JSON_DATA.unshift({Key: '', Value: '不限'});
                for (var i = 0; i < JSON_DATA.length; i++) {
                    var TEMP_NAME = i == 0 ? ' active' : '';
                    TEMP_DATA = JSON_DATA[i];
                    TEMP_HTML += '<li class="drop-option' + TEMP_NAME + '" data-value="' + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
                }
                TEMP_DATA = null;
                $('#EquRoom').html(TEMP_HTML);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestBindDevices = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_DEVICES'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.PAGINATION = new Pagination({
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG.BIND_DEVICES);
                        params['pageIndex'] = pageCode;
                        _this.ajaxRequestChangePageDevices(params);
                    }
                });
                var TEMP_HTML = JSON_DATA.length != 0 ? _this.getTemplate(JSON_DATA) : webApp['NO_RESULT'];
                $(".main .table-body").html(TEMP_HTML);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestChangePageDevices = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_DEVICES'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                $(".main .table-body").html(_this.getTemplate(JSON_DATA));
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestAddDevices = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['ADD_DEVICES'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                _this.exeBindDevices();
                messageBox.show("提示", '设备新增成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestBindLoad = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['BIND_LOAD'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var TEMP_DATA = null;
                var JSON_DATA = data['data'];
                var TEMP_HTML = '', TYPE_HTML = '';

                JSON_DATA['Bind'].unshift({Key: '0', Value: '不限'});
                JSON_DATA['Building'].unshift({CharId: '', Name: '不限'});
                for (var i = 0; i < JSON_DATA['Type'].length; i++) {
                    var TEMP_NAME = i == 0 ? ' class="active"' : '';
                    TEMP_DATA = JSON_DATA['Type'][i];
                    TEMP_HTML += '<li' + TEMP_NAME + ' data-value="' + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
                    TYPE_HTML += '<li class="drop-option" data-value="' + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
                }
                $('#EquType').html(TEMP_HTML);
                $('#AddType').html(TYPE_HTML);

                TEMP_HTML = '';
                for (var i = 0; i < JSON_DATA['Bind'].length; i++) {
                    var TEMP_NAME = i == 0 ? ' active' : '';
                    TEMP_DATA = JSON_DATA['Bind'][i];
                    TEMP_HTML += '<li class="drop-option' + TEMP_NAME + '" data-value="' + TEMP_DATA['Key'] + '">' + TEMP_DATA['Value'] + '</li>';
                }
                $('#EquBind').html(TEMP_HTML);

                TEMP_HTML = '';
                for (var i = 0; i < JSON_DATA['Building'].length; i++) {
                    var TEMP_NAME = i == 0 ? ' active' : '';
                    TEMP_DATA = JSON_DATA['Building'][i];
                    TEMP_HTML += '<li class="drop-option' + TEMP_NAME + '" data-value="' + TEMP_DATA['CharId'] + '">' + TEMP_DATA['Name'] + '</li>';
                }
                $('#EquBuilding').html(TEMP_HTML);

                _this.exeBindDevices();
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
 *
 * @returns {Management}
 */
Management.prototype.exeBindDevices = function () {
    var params = this.getParams(this.API_CONFIG.BIND_DEVICES);
    this.ajaxRequestBindDevices(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeBindFloor = function () {
    var params = this.getParams(this.API_CONFIG.BIND_FLOOR);
    this.ajaxRequestBindFloor(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeBindRooms = function () {
    var params = this.getParams(this.API_CONFIG.BIND_ROOMS);
    this.ajaxRequestBindRooms(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeAddDevices = function () {
    if (this.addDevicesNotEmpty()) {
        var params = this.getParams(this.API_CONFIG.ADD_DEVICES);
        this.ajaxRequestAddDevices(params);
        mp.hideSmPanel();
    }
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeBindLoad = function () {
    var params = this.getParams(this.API_CONFIG.BIND_LOAD);
    this.ajaxRequestBindLoad(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.btnSearch = function () {
    var _this = this;
    $(document).on('click', '.btn.search', function () {
        _this.exeBindDevices();
    });
    return this;
}
/**
 *
 * @param name
 * @returns {*}
 */
Management.prototype.getParams = function (name) {
    var _this = this;
    var params = null;
    switch (name) {
        case this.API_CONFIG.BIND_LOAD:
            params = {
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.BIND_FLOOR:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingCharId: $('#EquBuilding .active').attr('data-value')
            }
            break;
        case this.API_CONFIG.BIND_ROOMS:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingFloorCharId: $('#EquNumber .active').attr('data-value')
            }
            break;
        case this.API_CONFIG.ADD_DEVICES:
            params = {
                uuid: $('#Add_UUID').val().trim(),
                deviceName: $('#Add_Name').val().trim(),
                serialNumber: $('#Add_Number').val().trim(),
                requestKey: localStorage.getItem("requestKey"),
                deviceType: parseInt($('#Add_Type .active').attr('data-value').trim())
            }
            break;
        case this.API_CONFIG.BIND_DEVICES:
            params = {
                type: parseInt($(_this.TAB_BTN + '.active').attr('data-value')),
                isBind: parseInt($('#EquBind .active').attr('data-value')),
                pageSize: _this.PAGE_SIZE,
                pageIndex: _this.PAGE_INDEX,
                requestKey: localStorage.getItem("requestKey"),
                buildingCharId: $('#EquBuilding .active').attr('data-value'),
                buildingRoomCharId: $('#EquRoom .active').attr('data-value'),
                buildingFloorCharId: $('#EquNumber .active').attr('data-value')
            }
            break;
    }
    return params;
}
/**
 *
 * @type {Management}
 */
var mg = new Management();


