/**
 * Author:liyong
 * Date:2017-8-22
 * 构造函数
 * @constructor
 */
function GrantPage() {
    var arguments = arguments.length > 0 ? arguments[0] : 'arguments';

    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        ROLE_LIST: '/role/roles',
        ROLE_ADD: '/role/add',
        ROLE_EDIT: '/role/update',
        ROLE_DEL: '/role/delete',
        GRANT_MENU: '/auth/auths',
        ROLE_GRANT: '/auth',
        GRANT_SAVE: '/auth/update',

    };
    this.init();

}

/**
 * Author:liyong
 * Date:2017-8-22
 *初始化
 * @returns {GrantPage}
 */
GrantPage.prototype.init = function () {
    this.roleList();
    this.showEditRoleDetail();
    this.selectRole();
    this.grantMenuBind();
    this.dutyEdit();
    this.grantEdit();
    return this;
}


/**
 * Author:liyong
 * Date:2017-8-22
 * 参数列表
 * @param name
 * @returns {*}
 */
GrantPage.prototype.getParams = function (name) {
    var params = null;
    switch (name) {
        case this.API_CONFIG['ROLE_LIST']:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };

        case this.API_CONFIG['ROLE_ADD']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                name: $("#role-name").val().trim()
            };
            break;
        case this.API_CONFIG['ROLE_EDIT_SAVE']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                name: $("#edit-name").val().trim(),
                charId: $("#roles li[class='active']").attr("data-value")
            };
            break;
        case this.API_CONFIG['ROLE_DEL']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#roles li[class='active']").attr("data-value")
            };
            break;
        case this.API_CONFIG['GRANT_MENU']:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.API_CONFIG['ROLE_GRANT']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                roleCharId: $("#roles li[class='active']").attr("data-value")
            };
            break;
        case this.API_CONFIG['GRANT_SAVE']:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                roleCharId: $("#roles .active").attr("data-value"),
                menusStr: JSON.stringify(this.roleUpdateMenus),
                operationsStr: JSON.stringify(this.roleUpdateOperations)
            };
            break;

    }
    return params;
}


/**
 * Author:liyong
 * Date:2017-8-23
 * 选中角色
 * @returns {GrantPage}
 */
GrantPage.prototype.selectRole = function () {
    var _this = this;
    $("#roles").on("click", "li", function () {
        $(".post-edit .form-label").show();
        $(".post-edit .form-content").hide();
        $(".form-content b").hide();
        $(this).addClass("active").siblings("li").removeClass("active");
        _this.roleGrant();
    })
    return this;
}
/**
 * Author:liyong
 * Date:2017-8-22
 * 角色列表
 * @param params
 * @returns {GrantPage}
 */
GrantPage.prototype.ajaxRequestroleList = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['ROLE_LIST'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_DATA = null;
                var JSON_DATA = data['data'];
                var TEMP_HTML = '', TEMP_NAME = '';
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_DATA = JSON_DATA[i];
                    TEMP_NAME = i == 0 ? ' class="active"' : '';
                    TEMP_HTML += '<li' + TEMP_NAME + ' data-value="' + TEMP_DATA['CharId'] + '" data-system="' + TEMP_DATA['IsSystem'] + '"><i></i><span>' + TEMP_DATA['Name'] + '</span>';
                    TEMP_HTML = webApp.grantControl($(".btn-roledetail"), "role_update") ? TEMP_HTML + '<b class="icon-Param"></b></li>' : TEMP_HTML + '</li>';
                }
                TEMP_DATA = null;
                $("#roles").html(TEMP_HTML);

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
 * Date:2017-8-22
 * 角色列表接口调用
 * @param params
 * @returns {GrantPage}
 */
GrantPage.prototype.roleList = function () {
    var params = this.getParams(this.API_CONFIG['ROLE_LIST']);
    this.ajaxRequestroleList(params);
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-23
 * 角色编辑
 * @param params
 * @returns {GrantPage}
 */
GrantPage.prototype.showEditRoleDetail = function (params) {
    $(document).on('click', '.icon-Param', function () {
        var TEMP_HTML = $(this).siblings('span').html();
        $("#edit-name").val(TEMP_HTML);
        mp.manualShowPanel({
            index: 1,
            element: ".panel-sm",
            complete: function () {
                console.log("OPEN");
            }
        })
    });
    $(".role_add").click(function () {
        $("#role-name").val("");
    });
    return this;
}


/**
 * Author:liyong
 * Date:2017-8-23
 * 角色编辑保存
 * @returns {*}
 */
GrantPage.prototype.roleEditSave = function () {
    var _this = this, TEMP_NAME = null, IsSystem = null;
    IsSystem = $("#roles li[class='active']").attr("data-system");
    TEMP_NAME = $("#edit-name").val() == "" ? "" : $("#edit-name").val().trim();
    if (IsSystem == 1) {
        messageBox.show("提示", "角色不能编辑", MessageBoxButtons.OK, MessageBoxIcons.infomation);
        return false;
    }



    var result = true;
    $("#roles>li>span").each(function () {
        if ($(this).text() == TEMP_NAME) {
            result = false;
            return;
        }
    })

    if (!regular.check(regular.ROLE_REG_EXP, TEMP_NAME) & TEMP_NAME != ""&result) {
        var params = _this.getParams(_this.API_CONFIG['ROLE_EDIT_SAVE']);
        _this.ajaxRequestroleEditSave(params);
    }else if(!result){
        messageBox.show("警告", "角色名称不能重复", MessageBoxButtons.OK, MessageBoxIcons.warning);
    } else {
        messageBox.show("警告", "请输入正确的角色", MessageBoxButtons.OK, MessageBoxIcons.warning);
    }
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-23
 * 角色编辑保存ajax
 * @returns {*}
 */
GrantPage.prototype.ajaxRequestroleEditSave = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['ROLE_EDIT'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                $("#roles .active span").html($("#edit-name").val());
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * Date:2017-8-23
 * 角色删除
 * @returns {GrantPage}
 */
GrantPage.prototype.roleDel = function () {
    var _this = this, IsSystem = null;
    // 删除按钮
    IsSystem = $("#roles li[class='active']").attr("data-system");
    if (IsSystem == 1) {
        messageBox.show("提示", "角色不能删除", MessageBoxButtons.OK, MessageBoxIcons.infomation);
        return false;
    }
    messageBox.show("确认", "确定删除该角色吗 ?", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        var params = _this.getParams(_this.API_CONFIG['ROLE_DEL']);
        _this.ajaxRequestroleDel(params);
    });

    return this;
}

/**
 * Author:liyong
 * Date:2017-8-23
 * 角色删除ajax
 * @returns {GrantPage}
 */
GrantPage.prototype.ajaxRequestroleDel = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['ROLE_DEL'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.roleList();
                _this.grantMenuBind();
                $(".post-edit .form-label").show();
                $(".post-edit .form-content").hide();
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * Date:2017-8-23
 * 角色新增
 * @returns {GrantPage}
 */
GrantPage.prototype.ajaxRequestroleAdd = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['ROLE_ADD'],
        data: params,
        dataType: 'JSON',
        success: function (data) {
            if (data['succ']) {
                mp.hideSmPanel();
                _this.roleList();
                _this.grantMenuBind();
                $(".post-edit .form-label").show();
                $(".post-edit .form-content").hide();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                $("#role-name").val("");//清空表单信息
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
 * Date:2017-8-23
 * 角色新增调用
 * @returns {GrantPage}
 */
GrantPage.prototype.roleAdd = function () {
    var _this = this, TEMP_NAME = null;
    TEMP_NAME = $("#role-name").val() == "" ? "" : $("#role-name").val().trim();
    var result = true;
    $("#roles>li>span").each(function () {
        if ($(this).text() == TEMP_NAME) {
            result = false;
            return;
        }
    });

    if (!regular.check(regular.ROLE_REG_EXP, TEMP_NAME) & TEMP_NAME != ""& result) {
        var params = _this.getParams(_this.API_CONFIG['ROLE_ADD']);
        _this.ajaxRequestroleAdd(params);
    } else if(!result){
        messageBox.show("警告", "角色名称不能重复", MessageBoxButtons.OK, MessageBoxIcons.warning);
    } else {
        messageBox.show("警告", "请输入正确的角色", MessageBoxButtons.OK, MessageBoxIcons.warning);
    }

    return this;
}

/**
 * Author:liyong
 * Date:2017-8-23
 * 权限基础数据
 * @returns {GrantPage}
 */
GrantPage.prototype.grantMenuBind = function () {
    var params = this.getParams(this.API_CONFIG['GRANT_MENU']);
    if (webApp.grantControl($(".right-content"), "auth_select")) {
        this.ajaxRequestGrantMenuBind(params);
    } else {
        var TEMP_HTML = '<div class="imgs">'
            + '<img src="images/withoutPower.png" alt=""/>'
            + '<p>抱歉，您暂时没有相关权限，请联系管理员！</p></div>';
        $(".right-content").html(TEMP_HTML);
    }

    return this;
}
/**
 * Author:liyong
 * Date:2017-8-23
 * 权限基础数据ajax
 * @returns {GrantPage}
 */
GrantPage.prototype.ajaxRequestGrantMenuBind = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['GRANT_MENU'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            var JSON_DATA = null,
                TEMP_HTML = "",
                MENU_DATA = null,
                OPERAT_DATA = null,
                TEMP_ID = null,
                FUNC_DATA = null,
                OPERATION_DATA = null;

            JSON_DATA = data['data']
            if (data['succ']) {
                // 菜单权限列表
                MENU_DATA = JSON_DATA['Menus'];
                OPERAT_DATA = JSON_DATA['Operations'];
                TEMP_HTML += '<ul class="form-handle">';
                for (var i = 0; i < MENU_DATA.length; i++) {
                    TEMP_HTML += "<li data-system='" + MENU_DATA[i]['SystemKey'] + "'><b></b><i data-system='" + MENU_DATA[i]['SystemKey'] + "'></i><span>" + MENU_DATA[i]['Name'] + "</span></li>";
                }
                TEMP_HTML += "</ul>";
                $("#menu-grant").html(TEMP_HTML);


                // 物业权限列表
                TEMP_HTML = '';
                for (var i = 0; i < OPERAT_DATA.length; i++) {
                    TEMP_ID = OPERAT_DATA[i]['SystemKey'].split('M')[0];
                    TEMP_HTML += '<div class="form-group post-menu list-item" id="grant-' + TEMP_ID + '">'
                        + ' <div class="form-label">'
                        + '<i class="icon-' + TEMP_ID + '"></i>'
                        + '<span>' + OPERAT_DATA[i]['Name'] + '</span>'
                        + '</div><div class="form-content"><ul>'
                    FUNC_DATA = OPERAT_DATA[i]['Functions'];
                    for (var j = 0; j < FUNC_DATA.length; j++) {
                        TEMP_HTML += '<li><ul class="form-handle">'
                        TEMP_HTML += '<li class="form-lists" data-system="' + FUNC_DATA[j]['SystemKey'] + '">' + FUNC_DATA[j]['Name'] + '</li>'
                        OPERATION_DATA = FUNC_DATA[j]['Operations'];
                        for (var k = 0; k < OPERATION_DATA.length; k++) {
                            TEMP_HTML += "<li data-system='" + OPERATION_DATA[k]['SystemKey'] + "'><b></b><i data-system='" + OPERATION_DATA[k]['SystemKey'] + "'></i><span>" + OPERATION_DATA[k]['Name'] + "</span></li>";
                        }
                        TEMP_HTML += '</ul></li>'
                    }
                    TEMP_HTML += '</ul></div>'
                        + '<div class="form-footer"></div>'
                        + '<div class="clear"></div></div>'
                }
                $('#form-body').html(TEMP_HTML);
                _this.roleGrant();

            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * Date:2017-8-23
 * 绑定某个角色权限页面基础数据
 * @returns {GrantPage}
 */
GrantPage.prototype.roleGrant = function () {
    var params = this.getParams(this.API_CONFIG['ROLE_GRANT']);
    this.ajaxRequestRoleGrant(params);
    return this;
}


/**
 * Author:liyong
 * Date:2017-8-23
 * 绑定某个角色权限页面基础数据AJAX
 * @returns {GrantPage}
 */
GrantPage.prototype.ajaxRequestRoleGrant = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['ROLE_GRANT'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            var JSON_DATA = data['data'];
            var MENUS_DATA = JSON_DATA['Menus'];
            var OPERAT_DATA = JSON_DATA['Operations'];
            $(".form-content li i").hide();
            $(".form-content li span").removeClass("blue");
            if (data.succ) {
                var MENU_LI = $("#menu-grant li");
                for (var i = 0; i < MENU_LI.length; i++) {
                    for (var j = 0; j < MENUS_DATA.length; j++) {
                        if ($(MENU_LI[i]).attr("data-system") == MENUS_DATA[j]) {
                            $(MENU_LI[i]).children("i").show();
                            $(MENU_LI[i]).children("span").addClass("blue");
                        }
                    }
                }

                // 详细权限的显隐
                var HANDLE_LI = $("#form-body .form-handle li");
                for (var i = 0; i < HANDLE_LI.length; i++) {
                    for (var j = 0; j < OPERAT_DATA.length; j++) {
                        if ($(HANDLE_LI[i]).attr("data-system") == OPERAT_DATA[j]) {
                            $(HANDLE_LI[i]).children("i").show();
                            $(HANDLE_LI[i]).children("span").addClass("blue");
                        }
                    }
                }

            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
 * Date:2017-8-23
 * 职务编辑
 * @returns {GrantPage}
 */
GrantPage.prototype.dutyEdit = function () {
    var _this = this;
    $(".post-edit .form-label").click(function () {
        $(this).toggle();
        $(".post-edit .form-content").toggle();
        $(".form-content b").toggle();
        $(".form-handle li").addClass("cursor");
    });
    $(".post-edit .form-content button").click(function () {
        $(".post-edit .form-label").toggle();
        $(".post-edit .form-content").toggle();
        $(".form-content b").toggle();
        $(".form-handle li").removeClass("cursor");
        _this.roleGrant();
    })
    return this;
}

/**
 * Author:liyong
 * Date:2017-8-24
 * 权限编辑
 * @returns {GrantPage}
 */
GrantPage.prototype.grantEdit = function () {
    var _this = this,
        OBJ_DATA = {},
        OBJ_DATA2 = {};
    _this.roleUpdateMenus = [];
    _this.roleUpdateOperations = [];
    // 权限菜单修改
    $("#menu-grant").on("click", ".form-handle .cursor", function () {
        $(this).find("i").toggle();
        $(this).find("span").toggleClass("blue");
        // 给对象的MenuSystemKey属性赋值
        OBJ_DATA = {
            MenuSystemKey: $(this).attr("data-system"),
            IsEnable: $(this).find("span").hasClass("blue") ? 1 : 0
        }
        // 当数组为空，添加第一个对象
        if (_this.roleUpdateMenus.length == 0) {
            _this.roleUpdateMenus.push(OBJ_DATA);
        }
        ;
        // 遍历数组，判断权限是否已经在数组中了
        var flag = true;
        for (var i = 0; i < _this.roleUpdateMenus.length; i++) {
            if (_this.roleUpdateMenus[i]['MenuSystemKey'] == OBJ_DATA['MenuSystemKey']) {
                // 该权限已经在数组中，只修改数组中的IsEnable
                _this.roleUpdateMenus[i]['IsEnable'] = $(this).find("span").hasClass("blue") ? 1 : 0;
                flag = false;
            }
        }
        if (flag) {
            // 该权限不在数组中，将该权限添加进数组
            _this.roleUpdateMenus.push(OBJ_DATA);
        }
    });


    // 菜单（物业）详细权限修改
    $("#form-body").on("click", ".form-handle .cursor", function () {
        $(this).find("i").toggle();
        $(this).find("span").toggleClass("blue");
        // 给对象的OperationSystemKey属性赋值
        OBJ_DATA2 = {
            OperationSystemKey: $(this).attr("data-system"),
            IsEnable: $(this).find("span").hasClass("blue") ? 1 : 0
        }

        if (_this.roleUpdateOperations.length == 0) {
            _this.roleUpdateOperations.push(OBJ_DATA2);
        }
        ;
// 遍历数组
        flag = true;
        for (var i = 0; i < _this.roleUpdateOperations.length; i++) {
            if (_this.roleUpdateOperations[i].OperationSystemKey == OBJ_DATA2.OperationSystemKey) {
                _this.roleUpdateOperations[i]['IsEnable'] = $(this).find("span").hasClass("blue") ? 1 : 0;
                flag = false;
            }
        }
        if (flag) {
            _this.roleUpdateOperations.push(OBJ_DATA2);
        }
    });
    return this;
}


/**
 * Author:liyong
 * Date:2017-8-24
 * 权限保存调用
 * @returns {GrantPage}
 */
GrantPage.prototype.grantSave = function () {
    var params = this.getParams(this.API_CONFIG['GRANT_SAVE']);
    this.ajaxRequestGrantSave(params);
    return this;
}
/**
 * Author:liyong
 * Date:2017-8-24
 * 权限保存ajax
 * @returns {GrantPage}
 */
GrantPage.prototype.ajaxRequestGrantSave = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['GRANT_SAVE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                //清空自定义数组
                _this.roleUpdateMenus = [];
                _this.roleUpdateOperations = [];
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
var gp = new GrantPage();



