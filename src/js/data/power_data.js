//角色列表基础数据
function DptBind() {
    // 角色查看
    webApp.grantControl($("#roles"), "role_select");
    // 角色新增
    webApp.grantControl($(".btn-roleadd"), "role_add");
    // 权限编辑
    webApp.grantControl($(".contain-power-top"), "auth_update");
    var data = {
        requestKey: localStorage.getItem("requestKey")
    };
    $.ajax({
        type: "GET",
        url: host + "/role/roles",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data['succ']) {
                var jdata = data.data;
                var html = "";
                for (var i = 0; i < jdata.length; i++) {
                    if ( webApp.grantControl($(".btn-roledetail"), "role_update")) {
                        html += " <li data-value=\"" + jdata[i].CharId + "\" data-system=\"" + jdata[i].IsSystem + "\"><i></i><span>" + jdata[i].Name + "</span><b type=\"role-detail\" dir=\"top\" onclick=\"roleEdit()\" class=\"icon iconfont icon-Param btn-roledetail\"></b></li>";
                    } else {
                        html += " <li data-value=\"" + jdata[i].CharId + "\" data-system=\"" + jdata[i].IsSystem + "\"><i></i><span>" + jdata[i].Name + "</span></li>";
                    }
                }
                html += "</li>";
                $("#roles").html(html);
                $("#roles li:eq(0)").addClass("sel");
                powerBind();
                rolePowerBind();
                // powerSave();
                panel_tab5($('.btn-roledetail'), $('.modal-mask,.btn-cancel'), $('.alert-modal-wraper'));
            }
            else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}
DptBind();
// 角色新增保存 按钮
function roleAdd() {
    var result=true;
    var params={
        RA_VAL:$("#roleName_Add").val()
    }
    $("#roles>li>span").each(function () {
        if($(this).text()===$("#roleName_Add").val().trim()){
            console.log(2);
            result=false;
            return;
        }
    })
    if (!regular.check(regular.ROLE_REG_EXP,params['RA_VAL']) && params["RA_VAL"]!== ""&&result) {
        var data = {
            requestKey: localStorage.getItem("requestKey"),
            name: $("#roleName_Add").val()//名称
        };
        $.ajax({
            type: "POST",
            url: host + "/role/add",
            data: data,
            dataType: "json",
            success: function (data) {
                if (data['succ']) {
                    baocun();
                    DptBind();
                    messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    $("#roleName_Add").val("");//清空表单信息
                }
            },
            error: function (XMLHttpRequest, txtStatus, errorThrown) {
                messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        });
    }
    else {
        messageBox.show("警告", "输入正确的角色名称", MessageBoxButtons.OK, MessageBoxIcons.warning);
    }
}
//绑定角色编辑页面基础数据
function roleEdit() {
// 角色删除
    webApp.grantControl($(".top-modal-bottom>span"), "role_delete");
}
// 角色编辑 保存按钮
function roleEditSave() {
    var charId = $("#roles li[class='sel']").attr("data-value");
    var IsSystem = $("#roles li[class='sel']").attr("data-system");
    if (IsSystem == 1) {
        messageBox.show("提示", "角色不能编辑", MessageBoxButtons.OK, MessageBoxIcons.infomation);
        return false;
    }
    if (!regular.check(regular.ROLE_REG_EXP,$("#roleName_Edit").val())&&$("#roleName_Edit").val()!== "") {
        var data = {
            requestKey: localStorage.getItem("requestKey"),
            name: $("#roleName_Edit").val(),
            charId: charId
        };
        $.ajax({
            type: "POST",
            url: host + "/role/update",
            data: data,
            dataType: "json",
            success: function (data) {
                if (data['succ']) {
                    baocun();
                    DptBind();
                    messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    $("#roleName_Add").val("");//清空表单信息
                }
            },
            error: function (XMLHttpRequest, txtStatus, errorThrown) {
                messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        });
    }
    else {
        messageBox.show("警告", "请输入正确的角色", MessageBoxButtons.OK, MessageBoxIcons.warning);
    }
}


// 删除按钮
function roleDptDel() {
    var IsSystem = $("#roles li[class='sel']").attr("data-system");
    if (IsSystem == 1) {
        messageBox.show("提示", "角色不能删除", MessageBoxButtons.OK, MessageBoxIcons.infomation);
        return false;
    }
    var r;
    messageBox.show("确认", "确定删除该角色？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    $(".btn-confirm").click(function () {
        r = true;
        dptDel();
    })
    $(".close span").click(function () {
        r = false;
    })
    function dptDel() {
        if (r == true) {
            var charId = $("#roles li[class='sel']").attr("data-value");//选中的部门id
            var data = {
                requestKey: localStorage.getItem("requestKey"),
                charId: charId
            };
            $.ajax({
                type: "POST",
                url: host + "/role/delete",
                data: data,
                dataType: "json",
                success: function (data) {
                    if (data.succ) {
                        baocun();
                        DptBind();
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
        }
    }
}

//绑定权限页面基础数据
function powerBind() {
    var data = {
        requestKey: localStorage.getItem("requestKey")
    };
    $.ajax({
        type: "GET",
        url: host + "/auth/auths",
        data: data,
        dataType: "json",
        success: function (data) {
            var jdata = data.data.Operations;
            if (data.succ) {
                // 菜单权限列表
                var data = data.data.Menus;
                var html1 = "";
                html1 += "<ul>";
                for (var v = 0; v < data.length; v++) {
                    html1 += "<li data-system='" + data[v].SystemKey + "'><i></i><span><b></b>" + data[v].Name + "</span></li>";
                }
                ;
                html1 += "</ul>";
                $("#menu-content").html(html1);

                // 物业权限列表
                var html = "";
                for (var i = 0; i < jdata.length; i++) {
                    html += "<div class=\"power-desk\">";
                    html += "<div class=\"desk-left\" data-system='" + jdata[i].SystemKey + "'><i class=\"icon iconfont icon-" + jdata[i].SystemKey + "\"></i><span>" + jdata[i].Name + "</span></div> ";
                    html += " <div class=\"desk-right\">";
                    for (var j = 0; j < jdata[i].Functions.length; j++) {
                        html += "<div class=\"power-right-bill\">";
                        html += "<span class=\"uncollectedBill\" data-system='" + jdata[i].Functions[j].SystemKey + "'>" + jdata[i].Functions[j].Name + "</span>";
                        html += "<ul>"
                        for (var k = 0; k < jdata[i].Functions[j].Operations.length; k++) {
                            html += "<li data-system='" + jdata[i].Functions[j].Operations[k].SystemKey + "'><i></i><span><b></b>" + jdata[i].Functions[j].Operations[k].Name + "</span></li>";
                        }
                        html += "</ul>";
                        html += "<br/>";
                        html += "</div>";
                    }
                    html += "</div>"

                    html += "</div>";
                    html += " <div class=\"clear\"></div>";
                }
                $("#power-content").html(html);
                rolePowerBind();
            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
};


//绑定某个角色权限页面基础数据
function rolePowerBind() {
    var roleCharId = $("#roles li.sel").attr("data-value");
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        roleCharId: roleCharId
    };
    $.ajax({
        type: "GET",
        url: host + "/auth",
        data: data,
        dataType: "json",
        success: function (data) {
            var vdata = data.data.Menus;
            var jdata = data.data.Operations;
            if (data.succ) {
                // 权限查看
                if (webApp.grantControl($(".fq-contain-dv"), "auth_select")) {
                    // 角色查看
                    if (webApp.grantControl($("#roles"), "role_select")) {
                        // 菜单权限的显隐
                        var dataSystem = $("#menu-content li");
                        for (var i = 0; i < dataSystem.length; i++) {
                            for (var j = 0; j < vdata.length; j++) {
                                if ($(dataSystem[i]).attr("data-system") == vdata[j]) {
                                    $(dataSystem[i]).children("span").addClass("zd-blue");
                                }
                            }
                        }
                        // 详细权限的显隐
                        var dataGray = $("#power-content .power-right-bill li");
                        for (var x = 0; x < dataGray.length; x++) {
                            for (var y = 0; y < jdata.length; y++) {
                                if ($(dataGray[x]).attr("data-system") == jdata[y]) {
                                    $(dataGray[x]).children("span").addClass("zd-blue");
                                }
                            }
                        }
                    }
                } else {
                    var TEMP_HTML = '<div class="imgs"><img src="images/withoutPower.png" alt="">' +
                        '<p>暂时无此权限，请联系管理员</p></div>';
                    $(".fq-contain-src").css("position", "relative");
                    $(".fq-contain-src").css("background-color", "#f5f5f5");
                    $(".fq-contain-src").html(TEMP_HTML);
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
};


// 角色权限更新参数
var roleUpdateMenus = new Array();
var roleUpdateOperations = new Array();
(function () {
    // 权限菜单修改
    $("#menu-content").on("click", "li", function () {
        // 创建一个对象
        var detail = new Object();
        // 给对象的MenuSystemKey属性赋值
        detail.MenuSystemKey = $(this).attr("data-system");
        // 给对象的IsEnable属性赋值
        if ($(this).children("span").hasClass("zd-blue")) {
            detail.IsEnable = 1;
        } else {
            detail.IsEnable = 0;
        }
        // 当数组为空，添加第一个对象
        if (roleUpdateMenus.length == 0) {
            roleUpdateMenus.push(detail);
        }
        ;
// 遍历数组，判断权限是否已经在数组中了
        var flag = false;
        for (var i = 0; i < roleUpdateMenus.length; i++) {
            if (roleUpdateMenus[i].MenuSystemKey == detail.MenuSystemKey) {
                // 该权限已经在数组中，只修改数组中的IsEnable
                if ($(this).children("span").hasClass("zd-blue")) {
                    roleUpdateMenus[i].IsEnable = 1;
                } else {
                    roleUpdateMenus[i].IsEnable = 0;
                }
                flag = true;
            }
        }
        if (!flag) {
            // 该权限不在数组中，将该权限添加进数组
            roleUpdateMenus.push(detail);
        }
    });

    // 菜单（物业）详细权限修改
    $("#power-content").on("click", "li", function () {
        var detail2 = new Object();
        // 给对象的OperationSystemKey属性赋值
        detail2.OperationSystemKey = $(this).attr("data-system");
        // 给对象的IsEnable属性赋值
        if ($(this).children("span").hasClass("zd-blue")) {
            detail2.IsEnable = 1;
        } else {
            detail2.IsEnable = 0;
        }
        if (roleUpdateOperations.length == 0) {
            roleUpdateOperations.push(detail2);
        }
        ;
// 遍历数组
        var flag1 = false;
        for (var i = 0; i < roleUpdateOperations.length; i++) {
            if (roleUpdateOperations[i].OperationSystemKey == detail2.OperationSystemKey) {
                if ($(this).children("span").hasClass("zd-blue")) {
                    roleUpdateOperations[i].IsEnable = 1;
                } else {
                    roleUpdateOperations[i].IsEnable = 0;
                }
                flag1 = true;
            }
        }
        if (!flag1) {
            roleUpdateOperations.push(detail2);
        }
    });
})(jQuery)

// 角色权限更新
function powerSave() {
    var menus = roleUpdateMenus;
    var operations = roleUpdateOperations;
    var roleCharId = $("#roles li.sel").attr("data-value");
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        roleCharId: roleCharId,
        menusStr: JSON.stringify(menus),
        operationsStr: JSON.stringify(operations)
    };
    $.ajax({
        type: "POST",
        url: host + "/auth/update",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.succ) {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                //清空自定义数组
                roleUpdateMenus = [];
                roleUpdateOperations = [];
            } else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });


}