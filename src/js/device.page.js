/**
 *
 * @constructor
 */
function Management() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.ACTIVE = arguments['ACTIVE'] ? arguments['ACTIVE'] : 'active';
    this.PAGE_SIZE = arguments['PAGE_SIZE'] ? arguments['PAGE_SIZE'] : 10;
    this.PAGE_INDEX = arguments['PAGE_INDEX'] ? arguments['PAGE_INDEX'] : 1;
    this.DATA_VALUE = arguments['DATA_VALUE'] ? arguments['DATA_VALUE'] : '';
    this.TAB_BTN = arguments['TAB_BTN'] ? arguments['TAB_BTN'] : '.tab-bar li';
    this.PAGINATION = arguments['PAGINATION'] ? arguments['PAGINATION'] : null;
    this.BTN_DETAIL = arguments['BTN_DETAIL'] ? arguments['BTN_DETAIL'] : '.btn-detail';
    this.BTN_UPDATE = arguments['BTN_UPDATE'] ? arguments['BTN_UPDATE'] : '.btn-update';
    this.PASSWORD_ID = arguments['PASSWORD_ID'] ? arguments['PASSWORD_ID'] : 'PASSWORD_ID';

    this.ADD_PWD_END = arguments['ADD_PWD_END'] ? arguments['ADD_PWD_END'] : 'ADD_PWD_END';
    this.ADD_PWD_START = arguments['ADD_PWD_START'] ? arguments['ADD_PWD_START'] : 'ADD_PWD_START';
    this.UPDATE_PWD_END = arguments['UPDATE_PWD_END'] ? arguments['UPDATE_PWD_END'] : 'UPDATE_PWD_END';
    this.UPDATE_PWD_START = arguments['UPDATE_PWD_START'] ? arguments['UPDATE_PWD_START'] : 'UPDATE_PWD_START';
    this.LOCK_OPEN_END = arguments['LOCK_OPEN_END'] ? arguments['LOCK_OPEN_END'] : 'LOCK_OPEN_END';
    this.LOCK_OPER_END = arguments['LOCK_OPER_END'] ? arguments['LOCK_OPER_END'] : 'LOCK_OPER_END';
    this.LOCK_OPEN_START = arguments['LOCK_OPEN_START'] ? arguments['LOCK_OPEN_START'] : 'LOCK_OPEN_START';
    this.LOCK_OPER_START = arguments['LOCK_OPER_START'] ? arguments['LOCK_OPER_START'] : 'LOCK_OPER_START';

    this.GRANT_CONFIG = arguments['GRANT_CONFIG'] ? arguments['GRANT_CONFIG'] : {
        selectmanage: {
            value: '查看',
            class: 'select'
        },
        delete: {
            value: '删除',
            class: 'delete',
        },
        update: {
            value: '修改',
            class: 'update',
        },
        frozen: {
            value: '冻结',
            class: 'frozen',
        },
        unfrozen: {
            value: '解冻',
            class: 'unfrozen',
        }
    };

    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        BIND_LOAD: '/device/base',
        BIND_DEVICES: '/devices',
        ADD_DEVICES: '/device/add',
        BIND_FLOOR: '/building/floors',
        BIND_ROOMS: '/building/roomsbyfloor',
        LOCK_DETAIL: '/lock/get-lock-info',
        LOCK_PASSWORD: '/lock/fetch-passwords',
        LOCK_OPEN_REC: '/lock/get-lock-events',
        LOCK_OPER_REC: '/search-device-op-log',
        KEY_DETAIL: '/elemeter/get-elemeter-info',
        KEY_OPE_REC: '/search-device-op-log',
        KEY_BUY_REC: '/elemeter/elemeter-fetch-charge-history',
        KEY_SEA_REC: '/elemeter/elemeter-fetch-power-consumption',
        ADD_PASSWORD: '/lock/add-password',
        DELETE_PASSWORD: '/lock/delete-password',
        UPDATE_PASSWORD: '/lock/update-password',
        SELECT_PASSWORD: '/lock/get-default-password-plaintext',
        FROZEN_PASSWORD: '/lock/frozen-password',
        UNFROZEN_PASSWORD: '/lock/unfrozen-password',
        DEVICE_BIND: '/device/bind',
        DEVICE_UNBIND: '/device/unbind',
        DYNAMIC_PASSWORD: '/lock/get-dynamic-password-plaintext'
    }

    this.init();
}
/**
 *
 * @returns {Management}
 */
Management.prototype.init = function () {
    ComponentsPickers.init();

    this.exeBindLoad();
    this.navChange();
    this.btnSearch();
    this.dropChange();
    this.btnDetailClick();
    this.tabChange();
    this.btnUpdateClick();
    this.exeDeletePassword();
    this.exeSelectPassword();
    this.exeFrozenPassword();
    this.exeUnfrozenPassword();

    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.navChange = function () {
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
 * @returns {boolean}
 */
Management.prototype.addPasswordNotEmpty = function () {
    var message = '';
    var result = false;
    if (!$('#Pwd_Name').val().trim()) {
        message = '请输入密码名称！';
    } else if (!$('#Pwd_Pwd').val().trim()) {
        message = '请输入密码明文！';
    } else if (!$('#Pwd_Begin').val().trim()) {
        message = '请输入密码开始时间！';
    } else if (!$('#Pwd_End').val().trim()) {
        message = '请输入密码结束时间！';
    } else if (!$('#Pwd_Phone').val().trim()) {
        message = '请输入手机号码！';
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
Management.prototype.tabChange = function () {
    var _this = this;
    /**
     *
     * @type {TabComponent}
     */
    var tabComponent = new TabComponent({
        changeEnd: function (obj) {
            var NAV_INDEX = parseInt($('.tab-bar .active').index());
            var TEMP_SELECTOR = '.panel-lg .panel-modal:eq(' + NAV_INDEX + ') .tab.active';
            var TAB_INDEX = parseInt($(TEMP_SELECTOR).index());
            var $_BLOCK_CONTENT = $('.panel-lg .panel-modal').eq(NAV_INDEX).find('.block-content');
            $_BLOCK_CONTENT.addClass('hide');
            $_BLOCK_CONTENT.eq(TAB_INDEX).removeClass('hide');
            switch (NAV_INDEX) {
                case 0:
                    switch (TAB_INDEX) {
                        case 0:
                            _this.exeLockDetail();
                            break;
                        case 1:
                            _this.exeLockPassword();
                            break;
                        case 2:
                            _this.exeLockOpenRecord();
                            break;
                        case 3:
                            _this.exeLockOperRecord();
                            break;
                    }
                    break;
                case 1:
                    switch (TAB_INDEX) {
                        case 0:
                            _this.exeKeyDetail();
                            break;
                        case 1:

                            break;
                        case 2:
                            _this.exeKeyBuyRecord();
                            break;
                        case 3:
                            _this.exeKeySearchRecord();
                            break;
                        case 4:
                            _this.exeKeyOperRecord();
                            break;
                    }
                    break;
                case 2:
                    break;
            }
        }
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
            case 'KeyEquBuilding':
                _this.exeBindFloor();
                break;
            case 'EquNumber':
                _this.exeBindRooms();
                break;
            case 'KeyEquNumber':
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
        var that = this;
        var SELECTOR = _this.TAB_BTN + '.' + _this.ACTIVE;
        var TEMP_INDEX = parseInt($(SELECTOR).index());
        _this.DATA_VALUE = $(this).attr('data-value').trim();
        mp.manualShowPanel({
            index: TEMP_INDEX,
            element: '.panel-lg',
            complete: function () {
                _this.switchShowDetail({
                    that: that,
                    index: TEMP_INDEX
                });
            }
        });
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.btnUpdateClick = function () {
    var _this = this;
    $(document).on('click', this.BTN_UPDATE, function () {
        _this.PASSWORD_ID = $(this).attr('data-value').trim();
        mp.manualShowPanel({
            index: 3,
            element: '.panel-sm',
            complete: function () {

            }
        });
    });
    return this;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.switchShowDetail = function (params) {
    this['DATA_UUID'] = $(params['that']).attr('data-uuid').trim();
    switch (params['index']) {
        case 0:
            this.exeLockDetail();
            break;
        case 1:
            this.exeKeyDetail();
            break;
        case 2:
            break;
    }
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
            + '<a data-uuid="' + JSON_DATA['UUID'] + '" data-value="' + JSON_DATA['CharId'] + '" href="javascript:void(0)" class="btn-detail">查看</a>'
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
                    PAGINATION: '#Main',
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
                $('#Add_Type').html(TYPE_HTML);

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
                $('#KeyEquBuilding').html(TEMP_HTML);
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
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestLockDetail = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_DETAIL'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var TEMP_BUTTONS = '<button class="btn cancel">取消</button>';
                var BIND_BUTTON = '<button class="btn confirm" data-panel="panel-sm" data-index="2">绑定</button>';
                var UNBIND_BUTTON = '<button class="btn confirm" onclick="mg.exeDeviceUnbind();">解绑</button>';
                var JSON_DATA = data['data'];
                TEMP_BUTTONS = 1 == JSON_DATA['IsBind'] ? TEMP_BUTTONS + UNBIND_BUTTON : TEMP_BUTTONS + BIND_BUTTON;
                $('#Lock_Bind_Btn').html(TEMP_BUTTONS);
                JSON_DATA['IsBind'] = 1 == JSON_DATA['IsBind'] ? '是' : '否';
                for (var KEY in JSON_DATA) {
                    $('#Lock_' + KEY).text(JSON_DATA[KEY]);
                }
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
Management.prototype.ajaxRequestKeyDetail = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['KEY_DETAIL'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                console.log(JSON_DATA);
                for (var KEY in JSON_DATA) {
                    $('#Key_' + KEY).text(JSON_DATA[KEY]);
                }
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
Management.prototype.ajaxRequestLockPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_PASSWORD'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.ajaxRequestChangePageLockPassword(webApp.pageGetDataSet({
                    pageData: JSON_DATA,
                    pageSize: _this.PAGE_SIZE,
                    pageCode: _this.PAGE_INDEX
                }));
                new Pagination({
                    PAGINATION: '#PagPassword',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: JSON_DATA.length,
                    CHANGE_PAGE: function (pageCode) {
                        _this.ajaxRequestChangePageLockPassword(webApp.pageGetDataSet({
                            pageCode: pageCode,
                            pageData: JSON_DATA,
                            pageSize: _this.PAGE_SIZE
                        }));
                    }
                });
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
Management.prototype.ajaxRequestKeyBuyRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['KEY_BUY_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                console.log(data);
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
Management.prototype.ajaxRequestKeySearchRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['KEY_SEA_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                console.log(data);
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
Management.prototype.ajaxRequestKeyOperRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['KEY_OPE_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                console.log(data);
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
Management.prototype.ajaxRequestChangePageLockPassword = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        var TEMP_GRANT = JSON_DATA['Operation'].split('|');
        var TEMP_ISMANAGE = 1 == JSON_DATA['IsManage'] ? '管理密码' : '租客';
        var TEMP_END = webApp.parseDate(JSON_DATA['PasswordEndTime'] * 1000);
        var TEMP_BEGIN = webApp.parseDate(JSON_DATA['PasswordBeginTime'] * 1000);
        var TEMP_TIME = 1 == JSON_DATA['IsManage'] ? '永久有效' : TEMP_BEGIN + '至' + TEMP_END;
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12">'
            + '<div class="row-content row"><div class="row-header col-xs-6 col-md-12">'
            + '<div class="row-title' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-1">编号</div>'
            + '<div class="column col-xs-12 col-md-1">密码类型</div>'
            + '<div class="column col-xs-12 col-md-1">状态</div>'
            + '<div class="column col-xs-12 col-md-2">最近操作</div>'
            + '<div class="column col-xs-12 col-md-2">密码有效期</div>'
            + '<div class="column col-xs-12 col-md-1">姓名</div>'
            + '<div class="column col-xs-12 col-md-2">发送给（电话）</div>'
            + '<div class="column col-xs-12 col-md-2">操作</div></div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['Id'] + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + TEMP_ISMANAGE + '</div>'
            + '<div class="column col-xs-12 col-md-1">' + JSON_DATA['StateText'] + '</div>'
            + '<div class="column col-xs-12 col-md-2 cleanfont">'
            + '<span class="vertical">' + JSON_DATA['Description'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2 cleanfont">'
            + '<span class="vertical">' + TEMP_TIME + '</span></div>'
            + '<div class="column col-xs-12 col-md-1 cleanfont">'
            + '<span class="vertical">' + JSON_DATA['SendToName'] + '</span></div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['SendToPhone'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">';
        for (var j = 0; j < TEMP_GRANT.length; j++) {
            var TEMP_SPLIT = j > 0 ? '/' : '';
            if ('' != TEMP_GRANT[j].trim()) {
                var TEMP_VALUE = this.GRANT_CONFIG[TEMP_GRANT[j]]['value'];
                var TEMP_CLASS = this.GRANT_CONFIG[TEMP_GRANT[j]]['class'];
                TEMP_HTML += TEMP_SPLIT + '<a href="javascript:void(0)" class="btn-' +
                    TEMP_CLASS + '" data-value="' + JSON_DATA['Id'] + '">' + TEMP_VALUE + '</a>';
            }
        }
        TEMP_HTML += '</div></div></div></div></div>';
    }
    JSON_DATA = null;
    $('#Passwords').html(TEMP_HTML);
    return this;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestLockOpenRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_OPEN_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                new Pagination({
                    PAGINATION: '#PageOpenLock',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG.LOCK_OPEN_REC);
                        params['offset'] = _this.PAGE_SIZE * (pageCode - 1);
                        _this.ajaxRequestChangePageLockOpenRecord(params);
                    }
                });
                _this.appendLockOpenRecordTemplate(JSON_DATA);
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
Management.prototype.ajaxRequestChangePageLockOpenRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_OPEN_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendLockOpenRecordTemplate(JSON_DATA);
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
Management.prototype.appendLockOpenRecordTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < params.length; i++) {
        JSON_DATA = params[i];
        JSON_DATA['Time'] = webApp.parseDate(JSON_DATA['Time']);
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12">'
            + '<div class="row-content row"><div class="row-header col-xs-6 col-md-12">'
            + '<div class="row-title ' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-4">密码编号</div>'
            + '<div class="column col-xs-12 col-md-4">开锁时间</div>'
            + '<div class="column col-xs-12 col-md-4">开门人</div></div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['PasswordId'] + '</div>'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['Time'] + '</div>'
            + '<div class="column col-xs-12 col-md-4">' + JSON_DATA['PasswordName'] + '</div>'
            + '</div></div></div></div>';
    }
    JSON_DATA = null;
    $('#LockOpenRecord').html(TEMP_HTML);
    return this;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestLockOperRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_OPER_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                console.log(data);
                var JSON_DATA = data['data'];
                new Pagination({
                    PAGINATION: '#PageOperLock',
                    PAGE_SIZE: _this.PAGE_SIZE,
                    DATA_NUMS: data['exted']['totalNum'],
                    CHANGE_PAGE: function (pageCode) {
                        params = _this.getParams(_this.API_CONFIG.LOCK_OPER_REC);
                        params['offset'] = _this.PAGE_SIZE * (pageCode - 1);
                        _this.ajaxRequestChangePageLockOperRecord(params);
                    }
                });
                _this.appendLockOperRecordTemplate(JSON_DATA);
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
Management.prototype.ajaxRequestChangePageLockOperRecord = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['LOCK_OPER_REC'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                _this.appendLockOperRecordTemplate(JSON_DATA);
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
Management.prototype.appendLockOperRecordTemplate = function (params) {
    var JSON_DATA = null;
    var TEMP_HTML = '', TEMP_NAME = '';
    for (var i = 0; i < params['op_list'].length; i++) {
        JSON_DATA = params['op_list'][i];
        JSON_DATA['timestamp'] = webApp.parseDate(JSON_DATA['timestamp']);
        TEMP_NAME = i > 0 ? ' visible-xs visible-sm' : '';
        TEMP_HTML += '<div class="table-item col-xs-12 col-sm-6 col-md-12"><div class="row-content row">'
            + '<div class="row-header col-xs-6 col-md-12"><div class="row-title' + TEMP_NAME + ' row">'
            + '<div class="column col-xs-12 col-md-3">操作时间</div>'
            + '<div class="column col-xs-12 col-md-2">操作人</div>'
            + '<div class="column col-xs-12 col-md-2">操作人账号</div>'
            + '<div class="column col-xs-12 col-md-2">操作类型</div>'
            + '<div class="column col-xs-12 col-md-3">操作事件</div></div></div>'
            + '<div class="row-body col-xs-6 col-md-12"><div class="row-item row">'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['timestamp'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['operator']['name'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['operator']['id'] + '</div>'
            + '<div class="column col-xs-12 col-md-2">' + JSON_DATA['op_id'] + '</div>'
            + '<div class="column col-xs-12 col-md-3">' + JSON_DATA['description'] + '</div></div></div></div></div>';
    }
    JSON_DATA = null;
    $('#LockOperRecord').html(TEMP_HTML);
    return this;
}
/**
 *
 * @param params
 * @returns {Management}
 */
Management.prototype.ajaxRequestAddPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['ADD_PASSWORD'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                console.log(data);
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
Management.prototype.ajaxRequestDeletePassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['DELETE_PASSWORD'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", '密码删除成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
                _this.exeLockPassword();
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
Management.prototype.ajaxRequestUpdatePassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['UPDATE_PASSWORD'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", '密码修改成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
                _this.exeLockPassword();
                mp.hideSmPanel();
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
Management.prototype.ajaxRequestSelectPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['SELECT_PASSWORD'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_INFO = '密码:' + data['data'] + '(若管理密码在本地被修改，此密码值将无效，可通过重置设置新密码!)';
                messageBox.show("提示", JSON_INFO, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
Management.prototype.ajaxRequestFrozenPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['FROZEN_PASSWORD'],
        type: "POST",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", '密码冻结成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
                _this.exeLockPassword();
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
Management.prototype.ajaxRequestUnfrozenPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['UNFROZEN_PASSWORD'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", '密码解冻成功！', MessageBoxButtons.OK, MessageBoxIcons.infomation);
                _this.exeLockPassword();
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
Management.prototype.ajaxRequestDeviceBind = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['DEVICE_BIND'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                console.log(data);
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
Management.prototype.ajaxRequestDeviceUnbind = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['DEVICE_UNBIND'],
        type: "POST",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                console.log(data);
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
Management.prototype.ajaxRequestGetDynamicPassword = function (params) {
    var _this = this;
    $.ajax({
        url: host + _this.API_CONFIG['DYNAMIC_PASSWORD'],
        type: "GET",
        dataType: "JSON",
        data: params,
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_DATE = webApp.parseDate(JSON_DATA['invalid_time'] * 1000);
                var TEMP_INFO = '动态密码为：' + JSON_DATA['password'] + ',有效期至' + TEMP_DATE;
                messageBox.show('提示', TEMP_INFO, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
Management.prototype.exeGetDynamicPassword = function () {
    var params = this.getParams(this.API_CONFIG.DYNAMIC_PASSWORD);
    this.ajaxRequestGetDynamicPassword(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeKeyOperRecord = function () {
    var params = this.getParams(this.API_CONFIG.KEY_OPE_REC);
    this.ajaxRequestKeyOperRecord(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeLockOpenRecord = function () {
    var params = this.getParams(this.API_CONFIG.LOCK_OPEN_REC);
    this.ajaxRequestLockOpenRecord(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeLockOperRecord = function () {
    var params = this.getParams(this.API_CONFIG.LOCK_OPER_REC);
    this.ajaxRequestLockOperRecord(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeLockPassword = function () {
    var params = this.getParams(this.API_CONFIG.LOCK_PASSWORD);
    this.ajaxRequestLockPassword(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeLockDetail = function () {
    var params = this.getParams(this.API_CONFIG.LOCK_DETAIL);
    this.ajaxRequestLockDetail(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeKeyDetail = function () {
    var params = this.getParams(this.API_CONFIG.KEY_DETAIL);
    this.ajaxRequestKeyDetail(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeKeyBuyRecord = function () {
    var params = this.getParams(this.API_CONFIG.KEY_BUY_REC);
    this.ajaxRequestKeyBuyRecord(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeKeySearchRecord = function () {
    var params = this.getParams(this.API_CONFIG.KEY_SEA_REC);
    this.ajaxRequestKeySearchRecord(params);
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
Management.prototype.exeAddPassword = function () {
    if (this.addPasswordNotEmpty()) {
        var params = this.getParams(this.API_CONFIG.ADD_PASSWORD);
        this.ajaxRequestAddPassword(params);
    }
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeDeletePassword = function () {
    var _this = this;
    $(document).on('click', '.btn-delete', function () {
        _this.PASSWORD_ID = $(this).attr('data-value').trim();
        messageBox.show('确认', '确认删除该密码吗？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            var params = _this.getParams(_this.API_CONFIG.DELETE_PASSWORD);
            _this.ajaxRequestDeletePassword(params);
        });
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeUpdatePassword = function () {
    var params = this.getParams(this.API_CONFIG.UPDATE_PASSWORD);
    this.ajaxRequestUpdatePassword(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeSelectPassword = function () {
    var _this = this;
    $(document).on('click', '.btn-select', function () {
        var params = _this.getParams(_this.API_CONFIG.SELECT_PASSWORD);
        _this.ajaxRequestSelectPassword(params);
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeFrozenPassword = function () {
    var _this = this;
    $(document).on('click', '.btn-frozen', function () {
        _this.PASSWORD_ID = $(this).attr('data-value').trim();
        messageBox.show('确认', '确认冻结该密码吗？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            var params = _this.getParams(_this.API_CONFIG.FROZEN_PASSWORD);
            _this.ajaxRequestFrozenPassword(params);
        });
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeUnfrozenPassword = function () {
    var _this = this;
    $(document).on('click', '.btn-unfrozen', function () {
        _this.PASSWORD_ID = $(this).attr('data-value').trim();
        messageBox.show('确认', '确认解冻该密码吗？', MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            var params = _this.getParams(_this.API_CONFIG.UNFROZEN_PASSWORD);
            _this.ajaxRequestUnfrozenPassword(params);
        });
    });
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeDeviceBind = function () {
    var params = this.getParams(this.API_CONFIG.DEVICE_BIND);
    this.ajaxRequestDeviceBind(params);
    return this;
}
/**
 *
 * @returns {Management}
 */
Management.prototype.exeDeviceUnbind = function () {
    var _this = this;
    messageBox.show("确认", "确认解除绑定吗？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = _this.getParams(_this.API_CONFIG.DEVICE_UNBIND);
        _this.ajaxRequestDeviceUnbind(params);
    });
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
 * @returns {number}
 */
Management.prototype.getResult = function (name) {
    var TEMP_RESULT = 0;
    switch (name) {
        case this.ADD_PWD_START:
            TEMP_RESULT = $('#Pwd_Begin').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.ADD_PWD_END:
            TEMP_RESULT = $('#Pwd_End').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.UPDATE_PWD_START:
            TEMP_RESULT = $('#Update_Pwd_Begin').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.UPDATE_PWD_END:
            TEMP_RESULT = $('#Update_Pwd_End').val().trim();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.LOCK_OPEN_START:
            TEMP_RESULT = $('#Lock_Open_Start').val();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.LOCK_OPEN_END:
            TEMP_RESULT = $('#Lock_Open_End').val();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.LOCK_OPER_START:
            TEMP_RESULT = $('#Lock_Oper_Start').val();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
        case this.LOCK_OPER_END:
            TEMP_RESULT = $('#Lock_Oper_End').val();
            TEMP_RESULT = TEMP_RESULT ? webApp.parseTime(TEMP_RESULT) : 0;
            break;
    }
    return TEMP_RESULT;
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
        case this.API_CONFIG.LOCK_DETAIL:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.LOCK_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.LOCK_OPEN_REC:
            params = {
                uuid: _this.DATA_UUID,
                count: _this.PAGE_SIZE,
                requestKey: localStorage.getItem("requestKey"),
                offset: _this.PAGE_SIZE * (_this.PAGE_INDEX - 1),
                end_time: _this.getResult(_this.LOCK_OPEN_END),
                start_time: _this.getResult(_this.LOCK_OPEN_START)
            }
            break;
        case this.API_CONFIG.LOCK_OPER_REC:
            params = {
                uuid: _this.DATA_UUID,
                count: _this.PAGE_SIZE,
                requestKey: localStorage.getItem("requestKey"),
                offset: _this.PAGE_SIZE * (_this.PAGE_INDEX - 1),
                end_time: _this.getResult(_this.LOCK_OPER_END),
                start_time: _this.getResult(_this.LOCK_OPER_START)
            }
            break;
        case this.API_CONFIG.KEY_DETAIL:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.KEY_BUY_REC:
            params = {
                offset: 0,
                end_time: 1503305700,
                uuid: _this.DATA_UUID,
                start_time: 1502178900,
                count: _this.PAGE_SIZE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.KEY_SEA_REC:
            params = {
                end_time: 1502150400,
                uuid: _this.DATA_UUID,
                start_time: 1501977600,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.KEY_OPE_REC:
            params = {
                offset: 0,
                end_time: 1502150400,
                uuid: _this.DATA_UUID,
                start_time: 1501977600,
                count: _this.PAGE_SIZE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.ADD_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                name: $('#Pwd_Name').val().trim(),
                password: $('#Pwd_Pwd').val().trim(),
                phonenumber: $('#Pwd_Phone').val().trim(),
                requestKey: localStorage.getItem("requestKey"),
                permission_end: _this.getResult(_this.ADD_PWD_END),
                permission_begin: _this.getResult(_this.ADD_PWD_START)
            }
            break;
        case this.API_CONFIG.UPDATE_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                password_id: _this.PASSWORD_ID,
                name: $('#Update_Pwd_Name').val().trim(),
                password: $('#Update_Pwd_Pwd').val().trim(),
                phonenumber: $('#Update_Pwd_Phone').val().trim(),
                permission_end: _this.getResult(_this.UPDATE_PWD_END),
                permission_begin: _this.getResult(_this.UPDATE_PWD_START),
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.DELETE_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                password_id: _this.PASSWORD_ID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.SELECT_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.FROZEN_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                password_id: _this.PASSWORD_ID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.UNFROZEN_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                password_id: _this.PASSWORD_ID,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.DEVICE_BIND:
            params = {
                buildingRoomCharId: '',
                deviceCharId: '',
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.DEVICE_UNBIND:
            params = {
                deviceCharId: _this.DATA_VALUE,
                requestKey: localStorage.getItem("requestKey")
            }
            break;
        case this.API_CONFIG.DYNAMIC_PASSWORD:
            params = {
                uuid: _this.DATA_UUID,
                requestKey: localStorage.getItem("requestKey")
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


