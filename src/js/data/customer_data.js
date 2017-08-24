//移除本地缓存
localStorage.removeItem("isAlert");
var pageSize = 10;

$(function () {
    ConditionBind();
    DoSearch();//页面初始化
    App.init();
    ComponentsPickers.init();
    AddConditionBind();
});

//客户列表页面查询条件绑定
function ConditionBind() {
    var data = {
        requestKey: localStorage.getItem("requestKey")
    };
    $.ajax({
        type: "GET",
        url: host + "/customer/search/condition",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.succ) {
                var jdata = data.data;
                for (var i = 0; i < jdata.length; i++) {
                    var html = "";
                    for (var j = 0; j < jdata[i].Value.length; j++) {
                        html += "<li data-value=\"" + jdata[i].Value[j].Key + "\">" + jdata[i].Value[j].Value + "</li>";
                    }
                    //$("#" + jdata[i].Key + "_Get ul").append(html);
                    //ly5.9
                    $("#" + jdata[i].Key + "_Get ul li:first").nextAll().remove();
                    $("#" + jdata[i].Key + "_Get ul li:first").after(html);
                }
                DropdownInit();
            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
}

//绑定人员列表页面
function CustomersBind() {
    var arguments = arguments.length != 0 ? arguments[0] : 1;
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        pageIndex: arguments,
        // pageIndex: pageIndex,
        pageSize: pageSize,
        type: $("#CustomerType_Get li[class='cur']").length > 0 ? $("#CustomerType_Get li[class='cur']").attr("data-value") : "",
        levelInCharId: $("#CustomerLevel_Get li[class='cur']").length > 0 ? $("#CustomerLevel_Get li[class='cur']").attr("data-value") : "",
        sourceCharId: $("#CustomerSource_Get li[class='cur']").length > 0 ? $("#CustomerSource_Get li[class='cur']").attr("data-value") : "",
        dateType: $("#CustomerDateType_Get li[class='cur']").length > 0 ? parseInt($("#CustomerDateType_Get li[class='cur']").attr("data-value")) : 0,
        startDate: $("#StartDate").val(),
        endDate: $("#EndDate").val(),
        key: $("#Key").val()
    };
    $.ajax({
        type: "GET",
        url: host + "/customer/customers",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data['succ']) {
                var jdata = data.data;
                var html = "";
                for (var i = 0; i < jdata.length; i++) {
                    html += "<tr>";
                    html += "<td>" + jdata[i].Type + "</td>";
                    html += "<td>" + jdata[i].LevelInValue + "</td>";
                    html += "<td>" + jdata[i].Name + "</td>";
                    html += "<td>" + jdata[i].Phone + "</td>";
                    html += "<td>" + jdata[i].SourceValue + "</td>";
                    html += "<td>" + jdata[i].RentalMin + "--" + jdata[i].RentalMax + "</td>";
                    html += "<td>" + jdata[i].Month + "</td>";
                    html += "<td>" + jdata[i].CreateTime + "</td>";
                    html += "<td>" + jdata[i].SeeTime + "</td>";
                    html += "<td>" + jdata[i].InTime + "</td>";
                    html += "<td>" + jdata[i].EmployeeName + "</td>";
                    html += "<td><span dir=\"right\" type=\"customer-check\" class=\"btn-customercheck\" onclick=\"Customer('" + jdata[i].CharId + "')\">查看</span></td>";
                    html += "</tr>";
                }
                $("#Customers tr:first").nextAll().remove();
                if (webApp.grantControl($(".fq-contain-dv"), "customer_select")) {
                    $("#Customers").append(html);
                } else {
                    // 无权限查看
                    webApp.noGrant();
                }

                //注册按钮事件
                panel_tab5($('.btn-customercheck,.btn-propertyadd,.btn-edit'), $('.modal-mask,.btn-cancel'), $('.alert-modal-wraper'));
            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
}

//查询
function DoSearch() {
    PageInit1();
    CustomersBind();
}

//初始化分页控件
function PageInit1() {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        pageIndex: 1,
        pageSize: pageSize,
        type: $("#CustomerType_Get li[class='cur']").length > 0 ? $("#CustomerType_Get li[class='cur']").attr("data-value") : "",
        levelInCharId: $("#CustomerLevel_Get li[class='cur']").length > 0 ? $("#CustomerLevel_Get li[class='cur']").attr("data-value") : "",
        sourceCharId: $("#CustomerSource_Get li[class='cur']").length > 0 ? $("#CustomerSource_Get li[class='cur']").attr("data-value") : "",
        dateType: $("#CustomerDateType_Get li[class='cur']").length > 0 ? parseInt($("#CustomerDateType_Get li[class='cur']").attr("data-value")) : 0,
        startDate: $("#StartDate").val(),
        endDate: $("#EndDate").val(),
        key: $("#Key").val()
    };
    $.ajax({
        type: "GET",
        url: host + "/customer/customers",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.succ) {
                //清空分页控件
                $(".fy-wrap").html("");
                //绑定分页控件
                var pageinit = new fyfoo(pageSize, data.exted.totalNum, function (num) {
                    CustomersBind(num);
                });
            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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
}

//绑定客户新增页面基础条件
function AddConditionBind() {
    var data = {
        requestKey: localStorage.getItem("requestKey")
    };
    $(".customer-edit-add").html("客户新增");
    $.ajax({
        type: "GET",
        url: host + "/customer/add",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.succ) {
                var jdata = data.data;
                for (var i = 0; i < jdata.length; i++) {
                    if (jdata[i].Key == "Dpts") {//绑定部门
                        var html = "";
                        html += "<li data-value=\"\" class=\"cur\">不选</li>";
                        for (var j = 0; j < jdata[i].Value.length; j++) {
                            html += "<li  data-value=\"" + jdata[i].Value[j].CharId + "\"  class=\"fq-menu\"><b class=\"icon iconfont icon-iconfontsanjiao01\"></b><span>" + jdata[i].Value[j].Name + "</span>";
                            for (var k = 0; k < jdata[i].Value[j].ChildDpts.length; k++) {
                                if (k == 0) {
                                    html += "<ul>";
                                }
                                html += "<li id=\"" + jdata[i].Value[j].ChildDpts[k].CharId + "\"   data-value=\"" + jdata[i].Value[j].ChildDpts[k].CharId + "\"  class='menuChildren'><span>" + jdata[i].Value[j].ChildDpts[k].Name + "</span></li>";
                                if (k == jdata[i].Value[j].ChildDpts.length - 1) {
                                    html += "</ul>";
                                }
                            }
                            html += "</li>";
                        }
                        $("#" + jdata[i].Key + "_Add>ul").html(html);
                        $("#" + jdata[i].Key + "_Add>span").text($("#" + jdata[i].Key + "_Add>ul>li[class='cur']").text());
                    }
                    else if (jdata[i].Key == "HouseType")//单独绑定户型
                    {
                        var html = "";
                        for (var j = 0; j < jdata[i].Value.length; j++) {
                            html += "<li data-value=\"" + jdata[i].Value[j].Key + "\">" + jdata[i].Value[j].Value + "</li>";
                        }
                        html += "<div class=\"clear\"></div>";
                        $("#" + jdata[i].Key + "_Add>ul").html(html);
                    }
                    else {
                        var html = "";
                        for (var j = 0; j < jdata[i].Value.length; j++) {
                            var style = "";
                            if (j == 0) {
                                style = "cur";
                            }
                            html += "<li data-value=\"" + jdata[i].Value[j].Key + "\" class='" + style + "'>" + jdata[i].Value[j].Value + "</li>";
                        }
                        $("#" + jdata[i].Key + "_Add>ul").html(html);
                        $("#" + jdata[i].Key + "_Add>span").text($("#" + jdata[i].Key + "_Add>ul>li[class='cur']").text());
                    }
                }
                DropdownInit();
                $("#btnType").val("add");

                //新增和编辑公用页面,初始化表单
                $("#Name_Add").val("");
                $("#CardID_Add").val("");
                $("#Address_Add").val("");
                $("#Phone_Add").val("");
                $("#Month_Add").val("");
                $("#RentalMin_Add").val("");
                $("#RentalMax_Add").val("");
                $("#People_Add").val("");
                $("#SeeTime_Add").val("");
                $("#InTime_Add").val("");
                $("#Description_Add").val("");
                $("#Emps_Add>span").text("不选");
                $("#Emps_Add li").remove();
                $("#Emps_Add ul").html("<li class=\"cur\">不选</li>");
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

//绑定员工下拉列表
function EmployeeBind() {
    if ($("#Dpts_Add li.cur").attr("data-value") != "") {
        var charId = $("#Dpts_Add li.cur").attr("data-value");
        var data = {
            requestKey: localStorage.getItem("requestKey"),
            departmentCharId: charId
        };
        $.ajax({
            type: "GET",
            url: host + "/employee/employees",
            data: data,
            dataType: "json",
            success: function (jdata) {
                if (jdata.succ) {
                    var data = jdata.data;
                    var html = "";
                    html += "<li data-value=\"\" class=\"cur\">不选</li>";
                    for (var i = 0; i < data.length; i++) {
                        html += "<li data-value=\"" + data[i].CharId + "\" >" + data[i].Name + "</li>";
                    }
                    $("#Emps_Add > ul").html(html);
                    $("#Emps_Add > span").text($("#Emps_Add>ul>li[class='cur']").text());
                    DropdownInit();
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
    else {
        var html = "";
        html += "<li data-value=\"\" class=\"cur\">不选</li>";
        $("#Emps_Add > ul").html(html);
        $("#Emps_Add > span").text("不选");
        DropdownInit();
    }
}

function CustomerSavePamas(){
    var params={
        NA_VAL:$("#Name_Add").val().trim(),
        PA_VAL:$("#Phone_Add").val().trim(),
        MA_VAL:parseInt($("#Month_Add").val().trim()),
        RM_VAL:parseFloat($("#RentalMin_Add").val().trim()),
        RA_VAL:parseFloat($("#RentalMax_Add").val().trim()),
        PD_VAL:$("#People_Add").val().trim(),
        DA_VAL:$("#Dpts_Add li[class='cur']").attr("data-value"),
        EA_VAL:$("#Emps_Add li[class='cur']").attr("data-value"),
        BT_VAL:$("#btnType").val()
    };
    return params;
}
//新增页面点击事件
function CustomerSave() {
    var customerMessage = "";
    var result = false;
    var params=CustomerSavePamas();
    if (regular.check(regular.NAME_REG_EXP,params['NA_VAL'])) {
        customerMessage = "客户姓名输入有误！";
    } else if (regular.check(regular.PHONE_REG_EXP,params['PA_VAL'])) {
        customerMessage = "手机号码不正确！";
    } else if (regular.check(regular.MONTH_REG_EXP,params['MA_VAL'])) {
        customerMessage = "租期输入有误！";
    } else if (regular.check(regular.MONEY_REG_EXP,params['RM_VAL']) ||regular.check(regular.MONEY_REG_EXP,params['RA_VAL'])) {
        customerMessage = "租金输入不正确！";
    } else if (regular.customerRegExpCheck(params['PD_VAL'])) {
        customerMessage = "租客人数不正确！";
    } else if (params['DA_VAL'] == "" || params['EA_VAL'] == "") {
        customerMessage = "请选择所属员工！";
    } else {
        result = true;
    }
    if (result) {
        if (params['BT_VAL'] == "add") {
            CustomerAdd();
        }
        else {
            CustomerUpdate();
        }
    } else {
        messageBox.show('提示', customerMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
}

//新增客户信息
function CustomerAdd() {
    var houseType = new Array();
    $("#HouseType_Add li").each(function () {
        if ($(this).hasClass("tagli-sel")) {
            houseType.push($(this).attr("data-value"));
        }
    });
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        name: $("#Name_Add").val().trim(),
        phone: $("#Phone_Add").val().trim(),
        cardID: $("#CardID_Add").val().trim(),
        address: $("#Address_Add").val().trim(),
        title: $("#Genders_Add>span").text(),
        month: parseInt($("#Month_Add").val().trim()),
        rentalMin: parseFloat($("#RentalMin_Add").val().trim()),
        rentalMax: parseFloat($("#RentalMax_Add").val().trim()),
        layout: houseType.join("|"),
        people: $("#People_Add").val().trim(),
        seeTime: $("#SeeTime_Add").val().trim(),
        inTime: $("#InTime_Add").val().trim(),
        description: $("#Description_Add").val().trim(),
        levelInCharId: $("#CustomerLevel_Add li[class='cur']").attr("data-value"),
        sourceCharId: $("#CustomerSource_Add li[class='cur']").attr("data-value"),
        ownerDepartmentCharId: $("#Dpts_Add li.cur").attr("data-value"),
        ownerEmployeeCharId: $("#Emps_Add li.cur").attr("data-value")
    };
    $.ajax({
        type: "POST",
        url: host + "/customer/add",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.succ) {
                DoSearch();
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                baocun();
                //清空表单信息
                $("#Name_Add").val("");
                $("#Address_Add").val("");
                $("#CardID_Add").val("");
                $("#Phone_Add").val("");
                $("#Month_Add").val("");
                $("#RentalMin_Add").val("");
                $("#RentalMax_Add").val("");
                $("#People_Add").val("");
                $("#SeeTime_Add").val("");
                $("#InTime_Add").val("");
                $("#Description_Add").val("");
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

//客户详细信息
function Customer(charId) {
    // 客户删除
    webApp.grantControl($(".customerDel"), "customer_delete");
    $("#CustomerCharId").val(charId);//保存客户charId
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        charId: charId
    };
    $.ajax({
        type: "GET",
        url: host + "/customer",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.succ) {
                var jdata = data.data;
                //绑定客户基础数据
                $("#Type_Detail").text(jdata.Type);
                $("#CustomerName_Detail").text(jdata.CustomerName + "（" + jdata.Title + "）");
                $("#Phone_Detail").text(jdata.Phone);
                $("#CardID_Detail").text(jdata.CardID);
                $("#Address_Detail").text(jdata.Address);
                $("#SourceValue_Detail").text(jdata.SourceValue);
                $("#LevelValue_Detail").text(jdata.LevelValue);
                $("#Month_Detail").text(jdata.Month);
                $("#Rental_Detail").text(jdata.RentalMin + "--" + jdata.RentalMax + " 元/月");
                $("#Layout_Detail").text(jdata.Layout);
                $("#People_Detail").text(jdata.People);
                $("#SeeTime_Detail").text(jdata.SeeTime);
                $("#InTime_Detail").text(jdata.InTime);
                $("#EmployeeName_Detail").text(jdata.DepartmentName + "." + jdata.EmployeeName);
                $("#Description_Detail").text(jdata.Description);
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

//删除客户
function CustomerDelete() {
    var r;
    messageBox.show("确认", "确定删除该客户？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    $(".btn-confirm").click(function () {
        r = true;
        customerDel();
    })
    $(".close span").click(function () {
        r = false;
    })
    function customerDel() {

        if (r == true) {
            var charId = $("#CustomerCharId").val();//选中的客户id
            var data = {
                requestKey: localStorage.getItem("requestKey"),
                charId: charId
            };
            $.ajax({
                type: "POST",
                url: host + "/customer/delete",
                data: data,
                dataType: "json",
                success: function (data) {
                    DoSearch();
                    messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    if (data.succ) {
                        baocun();
                    }
                },
                error: function (XMLHttpRequest, txtStatus, errorThrown) {
                    messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
                }
            });
        }
        else {
            return false;
        }
    }
}

//放弃客户
function CustomerAbandon() {
    var r;
    messageBox.show("确认", "确定放弃该客户？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    $(".btn-confirm").click(function () {
        r = true;
        abandonDel();
    })
    $(".close span").click(function () {
        r = false;
    })
    function abandonDel() {
        if (r == true) {
            var charId = $("#CustomerCharId").val();//选中的客户id
            var data = {
                requestKey: localStorage.getItem("requestKey"),
                charId: charId
            };
            $.ajax({
                type: "POST",
                url: host + "/customer/abandon",
                data: data,
                dataType: "json",
                success: function (jdata) {
                    DoSearch();
                    messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    if (jdata.succ) {
                        baocun();
                        $(".fq-alert-modal-dv").hide();
                    }
                    $(".fy-wrap2").hide();
                },
                error: function (XMLHttpRequest, txtStatus, errorThrown) {
                    messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
                }
            });
        }
    }
}

//客户编辑基础数据绑定
function CustomerUpdateDetail(charId) {
    var charId = $("#CustomerCharId").val();//客户charId
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        charId: charId
    };
    $(".customer-edit-add").html("客户编辑");
    $.ajax({
        type: "GET",
        url: host + "/customer/Update",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.succ) {
                var jdata = data.data;
                //绑定客户基础数据
                $("#Name_Add").val(jdata.Name);
                $("#Phone_Add").val(jdata.Phone);
                $("#CardID_Add").val(jdata.CardID);
                $("#Address_Add").val(jdata.Address);
                $("#Month_Add").val(jdata.Month);
                $("#RentalMin_Add").val(jdata.RentalMin);
                $("#RentalMax_Add").val(jdata.RentalMax);
                $("#People_Add").val(jdata.People);
                $("#SeeTime_Add").val(jdata.SeeTime);
                $("#InTime_Add").val(jdata.InTime);
                $("#Description_Add").val(jdata.Description);

                var exted = data.exted;
                //绑定部门和人员
                if (jdata['OwnerEmployeeCharId']) {
                    var html = "";
                    html += "<li data-value=\"\" >不选</li>";
                    for (var j = 0; j < exted.Dpts.length; j++) {
                        // html += "<li value=\"" + exted.Dpts[j].CharId + "\">" + exted.Dpts[j].Name + "</li>";
                        html += "<li  data-value=\"" + exted.Dpts[j].CharId + "\"  class=\"fq-menu\"><b class=\"icon iconfont icon-iconfontsanjiao01\"></b><span>" + exted.Dpts[j].Name + "</span>";
                        for (var k = 0; k < exted.Dpts[j].ChildDpts.length; k++) {
                            if (k == 0) {
                                html += "<ul>";
                            }
                            html += "<li id=\"" + exted.Dpts[j].ChildDpts[k].CharId + "\"   data-value=\"" + exted.Dpts[j].ChildDpts[k].CharId + "\"  class='menuChildren'><span>" + exted.Dpts[j].ChildDpts[k].Name + "</span></li>";
                            if (k == exted.Dpts[j].ChildDpts.length - 1) {
                                html += "</ul>";
                            }
                        }

                        html += "</li>";
                    }
                    $("#Dpts_Add > ul").html(html);
                    $("#Dpts_Add>ul li[data-value='" + jdata.OwnerDepartmentCharId + "']").addClass("cur");
                    // $("#Dpts_Add > span").text($("#Dpts_Add>ul>li[value='" + jdata.OwnerDepartmentCharId + "']").children("span").text());
                    // ly5.30
                    jdata.DepartmentName = ($("#EmployeeName_Detail").text().toString() + "").split(".")[0];
                    $("#Dpts_Add> span").text(jdata.DepartmentName);
                    html = "";
                    html += "<li data-value=\"\" >不选</li>";
                    for (var j = 0; j < exted.Emps.length; j++) {
                        html += "<li data-value=\"" + exted.Emps[j].CharId + "\">" + exted.Emps[j].Name + "</li>";
                    }
                    $("#Emps_Add > ul").html(html);
                    $("#Emps_Add>ul>li[data-value='" + jdata.OwnerEmployeeCharId + "']").addClass("cur");
                    $("#Emps_Add > span").text($("#Emps_Add>ul>li[data-value='" + jdata.OwnerEmployeeCharId + "']").text());
                }
                else {
                    var html = "";
                    html += "<li data-value=\"\" class=\"cur\">不选</li>";
                    for (var j = 0; j < exted.Dpts.length; j++) {
                        html += "<li data-value=\"" + exted.Dpts[j].CharId + "\">" + exted.Dpts[j].Name + "</li>";
                    }
                    $("#Dpts_Add > ul").html(html);
                    $("#Dpts_Add>ul>li[data-value='" + jdata.OwnerDepartmentCharId + "']").addClass("cur");
                    $("#Dpts_Add > span").text($("#Dpts_Add>ul>li[data-value='" + jdata.OwnerDepartmentCharId + "']").text());

                    html = "";
                    html += "<li value=\"\" class=\"cur\">不选</li>";
                    $("#Emps_Add > ul").html(html);
                    $("#Emps_Add > span").text("不选");
                }

                $("#Genders_Add>span").text(jdata.Title); //客户称呼
                $("#Genders_Add li").each(function () {
                    if ($(this).text() == jdata.Title) {
                        $(this).addClass("cur");
                    }
                    else {
                        $(this).removeClass("cur");
                    }
                });

                $("#CustomerLevel_Add li").removeClass("cur");
                $("#CustomerLevel_Add li[data-value='" + jdata.LevelParameterCharId + "']").addClass("cur");//客户等级
                $("#CustomerLevel_Add>span").text($("#CustomerLevel_Add li[class='cur']").text());

                $("#CustomerSource_Add li").removeClass("cur");
                $("#CustomerSource_Add li[data-value='" + jdata.SourceParameterCharId + "']").addClass("cur");//客户来源
                $("#CustomerSource_Add>span").text($("#CustomerSource_Add li[class='cur']").text());

                var layouts = jdata.Layout.split('|');
                for (var i = 0; i < layouts.length; i++) {
                    $("#HouseType_Add li[data-value='" + layouts[i] + "']").addClass("tagli-sel");
                }

                $("#btnType").val("update");//修改保存按钮点击事件

                DropdownInit();
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

//修改客户信息
function CustomerUpdate() {
    var houseType = new Array();
    $("#HouseType_Add li").each(function () {
        if ($(this).hasClass("tagli-sel")) {
            houseType.push($(this).attr("data-value"));
        }
    });
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        charId: $("#CustomerCharId").val(),
        name: $("#Name_Add").val().trim(),
        phone: $("#Phone_Add").val().trim(),
        cardID: $("#CardID_Add").val().trim(),
        address: $("#Address_Add").val().trim(),
        title: $("#Genders_Add>span").text(),
        month: parseInt($("#Month_Add").val().trim()),
        rentalMin: parseFloat($("#RentalMin_Add").val().trim()),
        rentalMax: parseFloat($("#RentalMax_Add").val().trim()),
        layout: houseType.join("|"),
        people: $("#People_Add").val().trim(),
        seeTime: $("#SeeTime_Add").val().trim(),
        inTime: $("#InTime_Add").val().trim(),
        description: $("#Description_Add").val().trim(),
        levelInCharId: $("#CustomerLevel_Add li[class='cur']").attr("data-value"),
        sourceCharId: $("#CustomerSource_Add li[class='cur']").attr("data-value"),
        ownerDepartmentCharId: $("#Dpts_Add li.cur").attr("data-value"),
        ownerEmployeeCharId: $("#Emps_Add li.cur").attr("data-value")
    };
    $.ajax({
        type: "POST",
        url: host + "/customer/update",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.succ) {
                DoSearch();
                Customer($("#CustomerCharId").val());
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                baocun();
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

//跟进页面初始化
function FollowInit() {
    PageInit2();
    FollowsBind(1);
}

//初始化跟进分页控件
function PageInit2() {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        pageIndex: 1,
        pageSize: pageSize,
        customerCharId: $("#CustomerCharId").val()
    };
    $.ajax({
        type: "GET",
        url: host + "/customer/follows",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.succ) {
                //清空分页控件
                $(".fy-wrap2").html("");
                //绑定分页控件
                var pageinit = new fyfoo2(pageSize, data.exted.totalNum, function (num) {
                    FollowsBind(num);
                }, $(".fy-wrap2"));

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

//跟进记录
function FollowsBind(pageIndex) {
    var data =
        {
            requestKey: localStorage.getItem("requestKey"),
            pageIndex: pageIndex,
            pageSize: pageSize,
            customerCharId: $("#CustomerCharId").val(),
        };
    $.ajax({
        type: "GET",
        url: host + "/customer/follows",
        data: data,
        dataType: "json",
        success: function (data) {
            var jdata = data.data;
            if (data.succ) {
                //绑定跟进列表
                var jdata = data.data;
                var html = "";
                for (var i = 0; i < jdata.length; i++) {
                    html += "<tr>";
                    html += "<td>" + jdata[i].CreateTime + "</td>";
                    html += "<td>" + jdata[i].Value + "</td>";
                    html += "<td>" + jdata[i].Description + "</td>";
                    if (webApp.grantControl($(".followDelete"), "follow_delete")) {
                        html += "<td><span onclick=\"FollowDelete('" + jdata[i].CharId + "')\" class='followDelete'>删除</span></td>";
                    }
                    html += "</tr>";
                }
                $("#Follows").html(html);

                //绑定跟进类别下拉列表
                var exted = data.exted;
                var html1 = "";
                for (var i = 0; i < exted.paramKey.length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    html1 += "<li data-value=\"" + exted.paramKey[i].Key + "\" class='" + style + "'>" + exted.paramKey[i].Value + "</li>";
                }
                $("#FollowType ul").html(html1);
                $("#FollowType span").text($("#FollowType li[class='cur']").text());
                DropdownInit();
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

//新增跟进
function FollowAdd() {
    var data =
        {
            requestKey: localStorage.getItem("requestKey"),
            customerCharId: $("#CustomerCharId").val(),
            followParameterCharId: $("#FollowType li[class='cur']").attr("data-value"),
            description: $("#FollowDescription").val(),
            createDepartmentCharId: localStorage.getItem("departmentCharId"),
            createEmployeeCharId: localStorage.getItem("employeeCharId")
        };
    $.ajax({
        type: "POST",
        url: host + "/customer/follow/Add",
        data: data,
        dataType: "json",
        success: function (data) {
            messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            FollowInit();//绑定跟进信息
            $("#FollowDescription").val("")//清空表单数据
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//删除跟进
function FollowDelete(charId) {
    var r;
    messageBox.show("确认", "确定删除该跟进？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    $(".btn-confirm").click(function () {
        r = true;
        followDel();
    })
    $(".close span").click(function () {
        r = false;
    })
    function followDel() {
        if (r) {
            var data =
                {
                    requestKey: localStorage.getItem("requestKey"),
                    charId: charId
                };
            $.ajax({
                type: "POST",
                url: host + "/customer/follow/delete",
                data: data,
                dataType: "json",
                success: function (jdata) {
                    FollowInit();
                    messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                },
                error: function (XMLHttpRequest, txtStatus, errorThrown) {
                    messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
                }
            });
        }
    }
}

//绑定合同
function ContractBind() {
    var charId = $("#CustomerCharId").val();
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        customerCharId: charId
    };
    $.ajax({
        type: "GET",
        url: host + "/customer/contract",
        data: data,
        dataType: "json",
        success: function (jdata) {
            //绑定明细页面
            if (jdata.succ) {
                var data = jdata.data;
                if (data.ContractState != 1) {
                    $(".fq-contract-content>div").eq(0).show();
                    $(".fq-contract-content>div").eq(1).hide();
                }
                else {
                    $("#CustomerName_Detail2").text(data.CustomerName);
                    $("#Phone_Detail2").text(data.Phone);
                    $("#CardId_number").text(data.CardID);
                    $("#BuildingName_Detail").text(data.BuildingName + data.FloorName + "层");
                    $("#RoomName_Detail").text(data.RoomName + "室");
                    $("#Number_Detail").text(data.Number);
                    $("#State_Detail").text(data.State);
                    $("#Price_Detail").text(data.Price + "元/月");
                    $("#Deposit_Detail").text(data.Deposit + "元/月");
                    $("#RentDate_Detail").text(data.InDate + "~" + data.OutDate);
                    $("#PayType_Detail").text(data.PayType1);
                    $("#ReceiveDate").text();
                    $("#EmpName_Detail").text(data.DepartmentName + "." + data.EmployeeName);
                    $("#BargainDate_Detail").text(data.BargainDate);
                    $("#Description_Detail").text(data.Description);
                    $("#CreateEmpName_Detail").text(data.CreateTime);
                    $("#CurContractCharId").val(charId);
                    $(".fq-contract-content>div").eq(1).show();
                    $(".fq-contract-content>div").eq(0).hide();
                }
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//部门下拉切换员工列表
$("#Dpts_Add").on("click", "ul li span", function () {
    EmployeeBind($(this).parent("li").attr("data-value"));
});
