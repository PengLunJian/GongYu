var pageSize = 10;
var pageSize_Reocrd = 3;

//绑定楼层和房间
function FloorRoomBind() {
    Floors();
    Rooms();
}

//物业列表
function Buildings() {
    var data = {
        requestKey: localStorage.getItem("requestKey")
    };
    $.ajax({
        type: "GET",
        url: host + "/building/buildings",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                var data = jdata.data;
                var html = "";
                for (var i = 0; i < data.Buildings.length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    html += "<dd class=\"" + style + "\" >";
                    html += " <span data-value=\"" + data.Buildings[i].CharId + "\">" + data.Buildings[i].Name + "（<font>" + data.Buildings[i].Number + "</font>）</span>";
                    // 楼盘（物业）编辑
                    if (powerControl($(".btn-propertydetail"), "building_update")) {
                        html += "<i type=\"property-detail\" dir=\"right\" class=\"icon iconfont icon-Set_up btn-propertydetail\" onclick=\"BuildingDetail('" + data.Buildings[i].CharId + "')\"></i>";
                    }
                    html += "</dd>";
                }
                $("#Buildings dd").remove();
                $("#Buildings").append(html);//绑定物业列表

                html = "";
                for (var i = 0; i < data.Floors.length; i++) {
                    html += "<li data-value='" + data.Floors[i].CharId + "' index='" + data.Floors[i].SystemIndex + "'>" + data.Floors[i].Name + "</li>";
                }
                if (powerControl($(".btn-flooradd"), "floor_add")) {
                    html += "<li class=\"btn-flooradd\">+</li>";
                }
                $("#Floors").nextAll().remove();
                $("#Floors").after(html);//绑定楼层信息

                if(powerControl($(".fq-contain-dv"), "building_select"))Rooms(0);//绑定房间信息
                floorcheck();//绑定楼层锚点切换事件
                panel_tab5($('.btn-propertydetail'), $('.modal-mask,.btn-cancel'), $('.alert-modal-wraper'));
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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

function Floors() {
    var buildingCharId = $("#Buildings dd[class='cur'] span").attr("data-value");
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingCharId: buildingCharId
    };
    $.ajax({
        type: "GET",
        url: host + "/building/floors",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                var data = jdata.data;
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += "<li data-value='" + data[i].CharId + "' index='" + data[i].SystemIndex + "'>" + data[i].Name + "</li>";
                }
                html += "<li class=\"btn-flooradd\">+</li>";
                $("#Floors").nextAll().remove();
                $("#Floors").after(html);//绑定楼层信息

                Rooms(0);//绑定房间信息
                floorcheck();//绑定楼层锚点切换事件
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });

}

//物业新增基础信息获取（省份信息和标签信息）
function BuildingAddBind() {
    var data = {
        requestKey: localStorage.getItem("requestKey")
    };
    $.ajax({
        type: "GET",
        url: host + "/building/province",
        data: data,
        dataType: "json",
        success: function (jdata) {
            //绑定省份信息
            var data = jdata.data;
            var html = "";
            for (var i = 0; i < data.length; i++) {
                html += "<li data-value=\"" + data[i].Key + "\">" + data[i].Name + "</li>";
            }
            $("#Province_Add ul").html(html);
            $("#Province_Add span").text("选择省份");
            DropdownInit();

            //绑定配置、标签
            var exted = jdata.exted;
            for (var i = 0; i < exted.length; i++)//绑定配置、标签信息
            {
                var html = "";
                for (var j = 0; j < exted[i].Value.length; j++) {
                    html += "<li data-value=\"" + exted[i].Value[j].Key + "\">" + exted[i].Value[j].Value + "</li>";
                }
                html += "<div class=\"clear\"></div>";
                $("#" + exted[i].Key + "_Add>ul").html(html);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//绑定城市信息
function CityBind(provinceCharId) {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        provinceCharId: provinceCharId
    };
    $.ajax({
        type: "GET",
        url: host + "/building/city",
        data: data,
        dataType: "json",
        success: function (jdata) {
            var data = jdata.data;
            var html = "";
            for (var i = 0; i < data.length; i++) {
                html += "<li data-value=\"" + data[i].Key + "\" >" + data[i].Name + "</li>";
            }
            $("#City_Add ul").html(html);
            $("#City_Add span").text("选择城市");

            $("#District_Add ul").html("");
            $("#District_Add span").text("选择区域");
            DropdownInit();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//绑定区域信息
function DistrictBind(cityCharId) {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        cityCharId: cityCharId
    };
    $.ajax({
        type: "GET",
        url: host + "/building/district",
        data: data,
        dataType: "json",
        success: function (jdata) {
            var data = jdata.data;
            var html = "";
            for (var i = 0; i < data.length; i++) {
                html += "<li data-value=\"" + data[i].Key + "\">" + data[i].Name + "</li>";
            }
            $("#District_Add ul").html(html);
            $("#District_Add span").text("选择区域");
            DropdownInit();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//绑定城市信息
function CityUptBind(provinceCharId) {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        provinceCharId: provinceCharId
    };
    $.ajax({
        type: "GET",
        url: host + "/building/city",
        data: data,
        dataType: "json",
        success: function (jdata) {
            var data = jdata.data;
            var html = "";
            for (var i = 0; i < data.length; i++) {
                html += "<li data-value=\"" + data[i].Key + "\" >" + data[i].Name + "</li>";
            }
            $("#City_Edit ul").html(html);
            $("#City_Edit span").text("选择城市");

            $("#District_Edit ul").html("");
            $("#District_Edit span").text("选择区域");
            DropdownInit();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);

        }
    });
}

//绑定区域信息
function DistrictUptBind(cityCharId) {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        cityCharId: cityCharId
    };
    $.ajax({
        type: "GET",
        url: host + "/building/district",
        data: data,
        dataType: "json",
        success: function (jdata) {
            var data = jdata.data;
            var html = "";
            for (var i = 0; i < data.length; i++) {
                html += "<li data-value=\"" + data[i].Key + "\">" + data[i].Name + "</li>";
            }
            $("#District_Edit ul").html(html);
            $("#District_Edit span").text("选择区域");
            DropdownInit();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//物业新增

function BuildingAdd() {
    var floorCountReg = /^[1-9]\d*|0$/;
    // 判断必填项
    var msg;
    if ($("#BuildingName_Add1").val().trim() == "") {
        msg = "物业名称不能为空！";
        messageBox.show("警告", msg, MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    //选择区域
    if ($("#Province_Add li[class='cur']").length == 0 || $("#City_Add li[class='cur']").length == 0 || $("#District_Add li[class='cur']").length == 0) {
        messageBox.show("警告", "请选择物业区域！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    //楼层输入验证
    if (!floorCountReg.test($("#FloorNum").val().trim())) {
        messageBox.show("警告", "请输入正确层数！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    //房间数输入验证
    if (!floorCountReg.test($("#HouseNum").val().trim())) {
        messageBox.show("警告", "请输入正确房间数！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    if ($("#BuildingAddr_Add").val().trim() == "") {
        messageBox.show("警告", "地址不能为空！", MessageBoxButtons.OK, MessageBoxIcons.warning);
    }
    var allocs = new Array();
    $("#BuildingAlloc_Add li").each(function () {
        if ($(this).hasClass("tagli-sel")) {
            allocs.push($(this).attr("data-value"));
        }
    });
    var tags = new Array();
    $("#BuildingTag_Add li").each(function () {
        if ($(this).hasClass("tagli-sel")) {
            tags.push($(this).attr("data-value"));
        }
    });
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        name: $("#BuildingName_Add1").val().trim(),
        cityCharId: $("#City_Add li[class='cur']").attr("data-value"),
        districtCharId: $("#District_Add li[class='cur']").attr("data-value"),
        provinceCharId: $("#Province_Add li[class='cur']").attr("data-value"),
        address: $("#BuildingAddr_Add").val().trim(),
        floorCount: parseInt($("#FloorNum").val().trim()),
        roomCount: parseInt($("#HouseNum").val().trim()),
        alloc: allocs.join("|"),
        tag: tags.join("|")
    };
    $.ajax({
        type: "POST",
        url: host + "/building/add",
        data: data,
        dataType: "json",
        success: function (jdata) {
            Buildings();
            messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            baocun();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}
//物业编辑基础页面获取
function BuildingUpdateBind() {
    var charId = $("#BuildingCharId").val();
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingCharId: charId
    };
    $.ajax({
        type: "GET",
        url: host + "/building/Update",
        data: data,
        dataType: "json",
        success: function (jdata) {
            //绑定基础信息
            var data = jdata.data;
            $("#BuildingName_Edit").val(data.building.Name);
            $("#BuildingAddr_Edit").val(data.building.Address);
            //绑定标签
            var exted = jdata.exted;
            for (var i = 0; i < exted.length; i++)//绑定配置、标签信息
            {
                var html = "";
                for (var j = 0; j < exted[i].Value.length; j++) {
                    html += "<li data-value=\"" + exted[i].Value[j].Key + "\">" + exted[i].Value[j].Value + "</li>";
                }
                html += "<div class=\"clear\"></div>";
                $("#" + exted[i].Key + "_Update>ul").html(html);
            }

            var allocs = data.building.Alloc.split('|');
            for (var i = 0; i < allocs.length; i++) {
                $("#BuildingAlloc_Update li[data-value='" + allocs[i] + "']").addClass("tagli-sel");
            }

            var tags = data.building.Tag.split('|');
            for (var i = 0; i < tags.length; i++) {
                $("#BuildingTag_Update li[data-value='" + tags[i] + "']").addClass("tagli-sel");
            }

            //绑定下拉信息
            var html = "";
            for (var i = 0; i < data.provinces.length; i++) {
                html += "<li data-value=\"" + data.provinces[i].Key + "\" >" + data.provinces[i].Name + "</li>";
            }
            $("#Province_Edit ul").html(html);
            $("#Province_Edit li[data-value='" + data.building.ProvinceCharId + "']").addClass("cur");
            $("#Province_Edit span").text($("#Province_Edit li[class='cur']").text());

            html = "";
            for (var i = 0; i < data.citys.length; i++) {
                html += "<li data-value=\"" + data.citys[i].Key + "\" >" + data.citys[i].Name + "</li>";
            }
            $("#City_Edit ul").html(html);
            $("#City_Edit li[data-value='" + data.building.CityCharId + "']").addClass("cur");
            $("#City_Edit span").text($("#City_Edit li[class='cur']").text());

            html = "";
            for (var i = 0; i < data.districts.length; i++) {
                html += "<li data-value=\"" + data.districts[i].Key + "\" >" + data.districts[i].Name + "</li>";
            }
            $("#District_Edit ul").html(html);
            $("#District_Edit li[data-value='" + data.building.DistrictCharId + "']").addClass("cur");
            $("#District_Edit span").text($("#District_Edit li[class='cur']").text());

            DropdownInit();


        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//物业编辑保存
function BuildingUpdate() {
    // 判断必填项
    if ($("#BuildingName_Edit").val().trim() == "") {
        messageBox.show("警告", "物业名称不能为空！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    //选择区域
    if ($("#Province_Edit li[class='cur']").length == 0 || $("#City_Edit li[class='cur']").length == 0 || $("#District_Edit li[class='cur']").length == 0) {
        messageBox.show("警告", "请选择物业区域！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    if ($("#BuildingAddr_Edit").val().trim() == "") {
        messageBox.show("警告", "地址不能为空！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    var allocs = new Array();
    $("#BuildingAlloc_Update li").each(function () {
        if ($(this).hasClass("tagli-sel")) {
            allocs.push($(this).attr("data-value"));
        }
    });
    var tags = new Array();
    $("#BuildingTag_Update li").each(function () {
        if ($(this).hasClass("tagli-sel")) {
            tags.push($(this).attr("data-value"));
        }
    });
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        charId: $("#BuildingCharId").val(),
        name: $("#BuildingName_Edit").val().trim(),
        cityCharId: $("#City_Edit li[class='cur']").attr("data-value"),
        districtCharId: $("#District_Edit li[class='cur']").attr("data-value"),
        provinceCharId: $("#Province_Edit li[class='cur']").attr("data-value"),
        address: $("#BuildingAddr_Edit").val().trim(),
        alloc: allocs.join("|"),
        tag: tags.join("|")
    };
    $.ajax({
        type: "POST",
        url: host + "/building/update",
        data: data,
        dataType: "json",
        success: function (jdata) {
            $("#Buildings dd[class='cur']>span").html($("#BuildingName_Edit").val() + "（<font>" + $("#Buildings dd[class='cur']>span>font").text() + "</font>）");
            Rooms();
            messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            baocun();
            BuildingDetail($(".fq-nav2 .cur span").attr("data-value"));
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//物业明细
function BuildingDetail(charId) {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingCharId: charId
    };
    $.ajax({
        type: "GET",
        url: host + "/building",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                $("#Name_Detail").text(jdata.data.Name);
                $("#BuildingAddr_Detail").text(jdata.data.CityName + jdata.data.DistrictName + jdata.data.Address);
                $("#FloorNum_Detail").text(jdata.exted.RoomNum + "间（共" + jdata.exted.FloorNum + "层）");
                $("#Alloc_Detail").text(jdata.data.Alloc);
                $("#Tag_Detail").text(jdata.data.Tag);
                $("#BuildingCharId").val(charId);
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//物业删除
function BuildingDelete() {
    var r;
    messageBox.show("确认", "确定删除该物业？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    $(".btn-confirm").click(function () {
        r = true;
        buildingDel();
    })
    $(".close span").click(function () {
        r = false;
    })
    function buildingDel() {
        if (r == true) {
            var data = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#BuildingCharId").val()
            };
            $.ajax({
                type: "POST",
                url: host + "/building/delete",
                data: data,
                dataType: "json",
                success: function (jdata) {
                    if (jdata.succ) {
                        messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                        location.reload();
                    }
                    else {
                        messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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

//楼层添加（property_js中处理）

//楼层编辑基础信息获取
function FloorBind(floorName, floorCharId) {
    $("#CurFloorName").val(floorName);
    $("#CurFloorCharId").val(floorCharId);
}

//楼层保存
function FloorUpdate() {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        charId: $("#CurFloorCharId").val(),
        name: $("#CurFloorName").val()
    };
    // 判断楼层
    if ($("#CurFloorName").val() == 0) {
        messageBox.show("提示", "请输入正确的楼层", MessageBoxButtons.OK, MessageBoxIcons.infomation);
    } else {

        $.ajax({
            type: "POST",
            url: host + "/building/floor/update",
            data: data,
            dataType: "json",
            success: function (jdata) {
                if (jdata.succ) {
                    Floors();
                    Rooms();
                    messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    baocun();
                }
                else {
                    messageBox.show("警告", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.warning);
                }

            },
            error: function (XMLHttpRequest, txtStatus, errorThrown) {
                messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        });

    }
}

//楼层删除
function FloorDelete() {
    var r;
    messageBox.show("确认", "确认删除该楼层？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    $(".btn-confirm").click(function () {
        r = true;
        floorDel();
    })
    $(".close span").click(function () {
        r = false;
    })
    function floorDel() {

        if (r == true) {
            var data = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#CurFloorCharId").val()
            }

            $.ajax({
                type: "POST",
                url: host + "/building/floor/delete",
                data: data,
                dataType: "json",
                success: function (jdata) {
                    Floors();
                    Rooms();
                    messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    baocun();
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

//房间列表获取
function Rooms() {
    var state = $("#RoomState li[class='cur']").attr("data-value");
    var buildingCharId = $("#Buildings dd[class='cur'] span").attr("data-value");
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        state: state,
        key: $("#Key").val(),
        buildingCharId: buildingCharId
    };
    $.ajax({
        type: "GET",
        url: host + "/building/rooms",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                var data = jdata.data;
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += "<div class=\"property-floor-message property-floor" + (i + 1) + "\">";
                    html += "	<div class=\"property-floor-title\">";
                    // 调用公用的权限控制函数 得到一个返回值true or false
                    if (powerControl($(".btn-flooredit"), "floor_update")) {
                        html += "		<p>" + jdata.exted.BuildingName + " .<font>" + data[i].floorName + "</font>楼</p><span type=\"floor-edit\" dir=\"top\" class=\"btn-flooredit\" onclick=\"FloorBind('" + data[i].floorName + "','" + data[i].floorCharId + "')\">编辑</span>";
                    } else {
                        html += "		<p>" + jdata.exted.BuildingName + " .<font>" + data[i].floorName + "</font>楼</p>";
                    }
                    html += "	</div>";
                    html += "	<div class=\"property-floor-room\">";
                    html += "	<ul>";
                    for (var j = 0; j < data[i].rooms.length; j++) {
                        var style = "";
                        if (data[i].rooms[j].State == 3) {
                            style = "room-let";
                        }
                        else if (data[i].rooms[j].State == 2) {
                            style = "room-advance";
                        }
                        html += "		<li onclick=\"RoomDetail('" + data[i].rooms[j].CharId + "')\"><p>" + data[i].rooms[j].Name + "室</p><div type=\"room-message\" dir=\"right\" class=\"property-room-status " + style + "\"><i></i><span>" + data[i].rooms[j].Text + "</span></div></li>";

                    }
                    if (powerControl($(".btn-flooredit"), "floor_update")) {
                        html += "		<li id=\"roomli_" + data[i].floorCharId + "\"><p>添加房间</p><div type=\"room-add\" dir=\"top\" class=\"property-room-status1\"  onclick=\"RoomAdd('" + data[i].floorCharId + "')\">+</div></li><div class=\"clear\"></div>";
                    } else {
                        html += "		<li id=\"roomli_" + data[i].floorCharId + "\"><p></p></li><div class=\"clear\"></div>";
                    }
                    html += "	</ul>";
                    html += "</div>";
                    html += "</div>";
                }
                $("#Rooms").find('>div').find('>div').eq(0).html("");
                $("#Rooms").find('>div').find('>div').eq(0).append(html);

                $("#CurBuildingName").text(jdata.exted.BuildingName);
                $("#AllCount").text(jdata.exted.AllCount);
                $("#VacancyCount").text(jdata.exted.VacancyCount);
                $("#OrderCount").text(jdata.exted.OrderCount);
                $("#LetCount").text(jdata.exted.LetCount);

                panel_tab5($('.btn-flooredit,.property-room-status'), $('.modal-mask,.btn-cancel'), $('.alert-modal-wraper'));
            }
            else {
                messageBox.show("警告", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.warning);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            // messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//房间详情
function RoomDetail(charId) {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingRoomCharId: charId
    }
    $.ajax({
        type: "GET",
        url: host + "/building/room",
        data: data,
        dataType: "json",
        success: function (jdata) {
            var data = jdata.data;
            if (data.State != "已租") {
                //$("#btn-order").show();
                $("#btn-let").show();
                $("#RoomState_Detail").text(data.State + "（" + data.DateDiff + "天）");
            }
            else {
                $("#btn-order").hide();
                $("#btn-let").hide();
                $("#RoomState_Detail").text(data.State);
            }
            //绑定基础信息
            $("#RoomTitle").text(data.BuildingName + "    " + data.FloorName + "  楼  " + data.RoomName + "  室");
            $("#Price_Detail").text(data.Price + "元/月");
            $("#Square_Detail").text(data.Square + "㎡");
            $("#Layout_Detail").text(data.Div1 + "室" + data.Div2 + "厅" + data.Div3 + "卫" + data.Div4 + "阳台");
            $("#RoomAlloc_Detail").text(data.Alloc);
            $("#RoomTag_Detail").text(data.Tag);
            $("#CurRoomCharId").val(charId);
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//房间新增
function RoomAdd(charId) {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingFloorCharId: charId
    };
    $.ajax({
        type: "POST",
        url: host + "/building/room/add",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                Rooms();
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });

}

//房间编辑页面获取
function RoomUpdateDetail() {
    $(this).css("opcity", 0);
    var charId = $("#CurRoomCharId").val();
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingRoomCharId: charId
    };
    $.ajax({
        type: "GET",
        url: host + "/building/room/update",
        data: data,
        dataType: "json",
        success: function (jdata) {
            var exted = jdata.exted;
            for (var i = 0; i < exted.length; i++)//绑定配置、标签信息
            {
                var html = "";
                for (var j = 0; j < exted[i].Value.length; j++) {
                    html += "<li data-value=\"" + exted[i].Value[j].Key + "\">" + exted[i].Value[j].Value + "</li>";
                }
                html += "<div class=\"clear\"></div>";
                $("#" + exted[i].Key + "_Update>ul").html(html);
            }

            var data = jdata.data;
            $("#RoomName_Update").val(data.RoomName);
            $("#Price_Update").val(data.Price);
            $("#Square_Update").val(data.Square);
            $("#Div1").val(data.Div1);
            $("#Div2").val(data.Div2);
            $("#Div3").val(data.Div3);
            $("#AtFloor").text(data.BuildingName + "  " + data.FloorName + "层");

            var allocs = data.Alloc.split('|');
            for (var i = 0; i < allocs.length; i++) {
                $("#RoomAlloc_Update li[data-value='" + allocs[i] + "']").addClass("tagli-sel");
            }

            var tags = data.Tag.split('|');
            for (var i = 0; i < tags.length; i++) {
                $("#RoomTag_Update li[data-value='" + tags[i] + "']").addClass("tagli-sel");
            }

        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//房间信息保存
function RoomUpdate() {
    var fReg = /^\d{1,18}(.\d{1,18})?$/;
    var divReg = /[0-9]{1}/;
    if (!fReg.test($("#Price_Update").val())) {
        messageBox.show("警告", "租金格式不正确！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    if (!fReg.test($("#Square_Update").val())) {
        messageBox.show("警告", "面积格式不正确！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    if (!divReg.test($("#Div1").val()) || !divReg.test($("#Div2").val()) || !divReg.test($("#Div3").val())) {
        messageBox.show("警告", "房型输入有误！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    var allocs = new Array();
    $("#RoomAlloc_Update li").each(function () {
        if ($(this).hasClass("tagli-sel")) {
            allocs.push($(this).attr("data-value"));
        }
    });
    var tags = new Array();
    $("#RoomTag_Update li").each(function () {
        if ($(this).hasClass("tagli-sel")) {
            tags.push($(this).attr("data-value"));
        }
    });
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        charId: $("#CurRoomCharId").val(),
        name: $("#RoomName_Update").val(),
        price: parseFloat($("#Price_Update").val()),
        square: parseFloat($("#Square_Update").val()),
        div1: parseInt($("#Div1").val()),
        div2: parseInt($("#Div2").val()),
        div3: parseInt($("#Div3").val()),
        alloc: allocs.join("|"),
        tag: tags.join("|")
    };
    $.ajax({
        type: "POST",
        url: host + "/building/room/update",
        data: data,
        dataType: "json",
        success: function (jdata) {
            RoomDetail($("#CurRoomCharId").val());
            Rooms();
            messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            baocun();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//房间删除
function RoomDelete() {
    var r;
    messageBox.show("确认", "确定删除该房间？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    $(".btn-confirm").click(function () {
        r = true;
        roomDel();
    })
    $(".close span").click(function () {
        r = false;
    })
    function roomDel() {
        if (r == true) {
            var data = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#CurRoomCharId").val()
            };
            $.ajax({
                type: "POST",
                url: host + "/building/room/delete",
                data: data,
                dataType: "json",
                success: function (jdata) {
                    Rooms();
                    messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    baocun();
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
//房间签约基础信息获取
function ContractAddBind() {
    var roomCharId = $("#CurRoomCharId").val();
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingRoomCharId: roomCharId
    };
    $.ajax({
        type: "GET",
        url: host + "/contract/add",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                var data = jdata.data;
                $("#BuildingName_Add").text(data.Room.BuildingName + data.Room.FloorName + " 楼 " + data.Room.RoomName + "室");
                $("#Square_Add").text(data.Room.Square + "㎡");
                $("#Layout_Add").text(data.Room.Div1 + "室" + data.Room.Div2 + "厅" + data.Room.Div3 + "卫");
                $("#ContractNumber_Add").val(data.ContractNum);

                var html = "";
                for (var i = 0; i < data.PayType.length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    html += "<li data-value=\"" + data.PayType[i].Key + "\" class='" + style + "'>" + data.PayType[i].Value + "</li>";
                }
                $("#PayType ul").html(html);
                $("#PayType span").text($("#PayType li[class='cur']").text());

                html = "";
                html += "<li data-value=\"\" class=\"cur\">不选</li>";
                for (var j = 0; j < data.Dpts.length; j++) {
                    html += "<li  data-value=\"" + data.Dpts[j].CharId + "\"  class=\"fq-menu\"><b class=\"icon iconfont icon-iconfontsanjiao01\"></b><span>" + data.Dpts[j].Name + "</span>";
                    for (var k = 0; k < data.Dpts[j].ChildDpts.length; k++) {
                        if (k == 0) {
                            html += "<ul>";
                        }
                        html += "<li id=\"" + data.Dpts[j].ChildDpts[k].CharId + "\"   data-value=\"" + data.Dpts[j].ChildDpts[k].CharId + "\" class='menuChildren'><span>" + data.Dpts[j].ChildDpts[k].Name + "</span></li>";
                        if (k == data.Dpts[j].ChildDpts.length - 1) {
                            html += "</ul>";
                        }
                    }
                    html += "</li>";
                }
                $("#Dpts_Add>ul").html(html);
                $("#Dpts_Add>span").text($("#Dpts_Add>ul>li[class=\"cur\"]").text());
                DropdownInit();
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {

            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }

    });
}

//房间签约
var priceReg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
var peopleReg = /^[1-9]\d*$/;
var phoneReg = /^[\d]{11}|[\d]{10}$/;
//合同新增
function ContractAdd() {
    if ($("#CustomerCharId").val().trim() == "") {
        messageBox.show("提示", "请选择签约客户！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
        return false;
    }
    //手机号码验证
    if (!phoneReg.test($("#ContractPhone_Add").val().trim())) {
        messageBox.show("警告", "手机号码不正确！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    if ($("#CardID_Add").val().trim() == "") {
        messageBox.show("警告", "证件信息不能为空！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    if ($("#ContractNumber_Add").val().trim() == "") {
        messageBox.show("警告", "合同编号不能为空！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    if (!priceReg.test($("#Price_Add").val().trim())) {
        messageBox.show("警告", "租金输入有误！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;

    }
    if (!priceReg.test($("#Deposit_Add").val().trim())) {
        messageBox.show("警告", "押金输入有误！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    if ($("#InDate").val() == "") {
        messageBox.show("警告", "请填写起租日期！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    if ($("#OutDate").val() == "") {
        messageBox.show("警告", "请填写退租日期！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    if (!peopleReg.test(parseFloat($("#People_Add").val()))) {
        messageBox.show("警告", "入住人数输入有误！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;

    }
    if ($("#Dpts_Add li[class='cur']").attr("data-value") == "" || $("#Emps_Add li[class='cur']").attr("data-value") == "") {
        messageBox.show("警告", "请选择所属员工！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    if ($("#BargainDate").val() == "") {
        messageBox.show("警告", "请填写签约日期！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }

    var data = {
        requestKey: localStorage.getItem("requestKey"),
        number: $("#ContractNumber_Add").val().trim(),
        phone: $("#ContractPhone_Add").val().trim(),
        cardID: $("#CardID_Add").val().trim(),
        buildingRoomCharId: $("#CurRoomCharId").val().trim(),
        customerCharId: $("#CustomerCharId").val().trim(),
        price: parseFloat($("#Price_Add").val().trim()),
        deposit: parseFloat($("#Deposit_Add").val().trim()),
        payType: parseInt($("#PayType li[class='cur']").attr("data-value")),
        inDate: $("#InDate").val().trim(),
        outDate: $("#OutDate").val().trim(),
        total: parseInt($("#People_Add").val().trim()),
        bargainDate: $("#BargainDate").val().trim(),
        ownerDepartmentCharId: $("#Dpts_Add li.cur").attr("data-value"),
        ownerEmployeeCharId: $("#Emps_Add li.cur").attr("data-value"),
        description: $("#ContractDescription").val().trim()
    };
    $.ajax({
        type: "POST",
        url: host + "/contract/add",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                Rooms();
                RoomDetail($("#CurRoomCharId").val());
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                baocun();
                //表单清空
                $("#ContractNumber_Add").val("");
                $("#ContractPhone_Add").val("");
                $("#CardID_Add").val("");
                $("#CustomerCharId").val("");
                $("#CustomerName_Add").text("");
                $("#Price_Add").val("");
                $("#Deposit_Add").val("");
                // $("#InDate").val("");
                $("#OutDate").val("");
                $("#People_Add").val("");
                $("#BargainDate").val("");
                $("#ContractDescription").val("");
                // ly5.27
                $("#Emps_Add>span").text("不选");
                $("#Emps_Add li").remove();
                $("#Emps_Add ul").html("<li class=\"cur\">不选</li>");
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}


//维修列表页面初始化
function ServiceInit() {
    ServicePageInit();
    ServiceRecords(1);
}

//维修分页初始化
function ServicePageInit() {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingRoomCharId: $("#CurRoomCharId").val(),
        pageIndex: 1,
        pageSize: pageSize
    };
    $.ajax({
        type: "GET",
        url: host + "/building/servicerecords",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                //清空分页控件
                $(".fy-wrap-service").html("");
                //绑定分页控件
                var pageinit = new fyfoo2(pageSize, jdata.exted.totalNum, function (num) {
                    ServiceRecords(num);
                }, $(".fy-wrap-service"));
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//维修记录列表
function ServiceRecords(pageIndex) {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingRoomCharId: $("#CurRoomCharId").val(),
        pageIndex: pageIndex,
        pageSize: pageSize
    };
    $.ajax({
        type: "GET",
        url: host + "/building/servicerecords",
        data: data,
        dataType: "json",
        success: function (jdata) {
            //绑定列表
            if (jdata.succ) {
                var data = jdata.data;
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += "<tr>";
                    html += "<td>" + data[i].ServiceValue + "</td>";
                    html += "<td>" + data[i].Price + "</td>";
                    html += "<td>" + data[i].Object + "</td>";
                    html += "<td>" + data[i].CreateTime + "</td>";
                    if (powerControl($(".servicerecord_del"), "servicerecord_delete")) {
                        html += "<td><span onclick=\"ServiceDelete('" + data[i].CharId + "')\" class='servicerecord_del'>删除</span></td>";
                    }
                    html += "</tr>";
                }
                $("#ServiceRecords tr:first").nextAll().remove();
                $("#ServiceRecords").append(html);
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//维修新增基础信息获取
function ServiceAddBind() {
    var data = {
        requestKey: localStorage.getItem("requestKey")
    };
    $.ajax({
        type: "GET",
        url: host + "/building/servicerecord/add",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                var data = jdata.data;
                //1、维修类别下拉列表
                var html = "";
                for (var i = 0; i < data.ServiceItem.length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    html += "<li data-value=\"" + data.ServiceItem[i].Key + "\" class='" + style + "'>" + data.ServiceItem[i].Value + "</li>";
                }
                $("#ServiceItem ul").html(html);
                $("#ServiceItem span").text($("#ServiceItem li[class='cur']").text());
                //2、承担对象下拉列表
                var html = "";
                for (var i = 0; i < data.ServiceObject.length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    html += "<li data-value=\"" + data.ServiceObject[i].Key + "\" class='" + style + "'>" + data.ServiceObject[i].Value + "</li>";
                }
                $("#ServiceObject ul").html(html);
                $("#ServiceObject span").text($("#ServiceObject li[class='cur']").text());

                DropdownInit();
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//维修新增
var patrnReg = /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
function ServiceAdd() {
    var data =
        {
            requestKey: localStorage.getItem("requestKey"),
            buildingRoomCharId: $("#CurRoomCharId").val(),
            serviceParameterCharId: $("#ServiceItem li[class='cur']").attr("data-value"),
            obj: parseInt($("#ServiceObject li[class='cur']").attr("data-value")),
            price: $("#ServicePrice").val(),
            description: $("#ServiceDescription").val()
        };
    if (!patrnReg.test(data.price)) {
        messageBox.show("警告", "维修金额输入错误！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }

    $.ajax({
        type: "POST",
        url: host + "/building/servicerecord/add",
        data: data,
        dataType: "json",
        success: function (jdata) {
            ServiceInit();
            baocun();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//维修删除
function ServiceDelete(charId) {
    var r;
    messageBox.show("确认", "是否删除该条记录？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    $(".btn-confirm").click(function () {
        r = true;
        serviceDel();
    })
    $(".close span").click(function () {
        r = false;
    })
    function serviceDel() {

        if (r) {
            var data = {
                requestKey: localStorage.getItem("requestKey"),
                charId: charId
            };
            $.ajax({
                type: "POST",
                url: host + "/building/servicerecord/delete",
                data: data,
                dataType: "json",
                success: function (jdata) {
                    ServiceInit();
                    messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                },
                error: function (XMLHttpRequest, txtStatus, errorThrown) {
                    messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
                }
            });
        }
    }
}

//合同详情
function Contract() {
    HistoryContractPageInit();
    var charId = $("#CurRoomCharId").val();
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        roomCharId: charId
    };
    $.ajax({
        type: "GET",
        url: host + "/building/room/state",
        data: data,
        dataType: "json",
        success: function (jdata) {
            //绑定明细页面
            if (jdata.succ) {
                var data = jdata.data;
                if (data.RoomState != 3) {
                    $("#nocontract").show();
                    $("#hascontract").hide();
                }
                else {
                    $("#CustomerName_Detail").text(data.CustomerName);
                    $("#Phone_Detail").text(data.Phone);
                    $("#CardId_Detail").text(data.CardID);
                    $("#BuildingName_Detail").text(data.BuildingName + data.FloorName + "层");
                    $("#RoomName_Detail").text(data.RoomName + "室");
                    $("#Number_Detail").text(data.Number);
                    $("#State_Detail1").text(data.ContractState);
                    $("#Price_Detail1").text(data.Price + "元/月");
                    $("#Deposit_Detail").text(data.Deposit + "元/月");
                    $("#RentDate_Detail").text(data.InDate + "~" + data.OutDate);
                    $("#PayType_Detail").text(data.PayType1);
                    $("#ReceiveDate").text();
                    $("#EmpName_Detail").text(data.DepartmentName + "." + data.EmployeeName);
                    $("#BargainDate_Detail").text(data.BargainDate);
                    $("#Description_Detail").text(data.Description);
                    $("#CreateEmpName_Detail").text(data.CreateTime);
                    $("#CurContractCharId").val(charId);
                    $("#hascontract").show();
                    $("#nocontract").hide();
                }
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//初始化历史合同列表
function HistoryContractPageInit() {
    HistoryContractInit();
    HistoryContractRecords(1);
}

//历史合同列表分页初始化
function HistoryContractInit() {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingRoomCharId: $("#CurRoomCharId").val(),
        pageIndex: 1,
        pageSize: 1
    };
    $.ajax({
        type: "GET",
        url: host + "/contract/historycontracts",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                //清空分页控件history-fy-wrap
                $(".history-fy-wrap").html("");
                //绑定分页控件
                var pageinit = new fyfoo2(5, jdata.exted.totalNum, function (num) {
                    HistoryContractRecords(num);
                }, $(".history-fy-wrap"));
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//历史合同列表列表
function HistoryContractRecords(pageIndex) {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingRoomCharId: $("#CurRoomCharId").val(),
        pageIndex: pageIndex,
        pageSize: 5
    };
    $.ajax({
        type: "GET",
        url: host + "/contract/historycontracts",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                var data = jdata.data;
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += "<tr>";
                    html += "<td>" + data[i].CustomerName + "</td>";
                    html += "<td>" + data[i].InDate + "-" + data[i].OutDate + "</td>";
                    html += "<td>" + data[i].Price + "</td>";
                    html += "<td>" + data[i].EndDate + "</td>";
                    html += "<td><span onclick=\"HistoryLook('" + data[i].CharId + "')\">查看</span></td>";
                    html += "</tr>";
                }
                $("#HistoryContractRecords tr:first").nextAll().remove();
                $("#HistoryContractRecords").append(html);
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//------------------------------------------------------------------------------------------
//初始化抄表记录页面
function ReadInit() {
    WaterInit();
    ElecInit();
}

//抄表记录初始化:水
function WaterInit() {
    WaterPageInit();
    WaterRecords(1);
}

//水抄表记录分页初始化
function WaterPageInit() {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingRoomCharId: $("#CurRoomCharId").val(),
        pageIndex: 1,
        pageSize: 1,
        Source: 1
    };
    $.ajax({
        type: "GET",
        url: host + "/building/readrecords",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                //清空分页控件
                $(".fy-wrap-water").html("");
                //绑定分页控件
                var pageinit = new fyfoo2(pageSize_Reocrd, jdata.exted.totalNum, function (num) {
                    WaterRecords(num);
                }, $(".fy-wrap-water"));
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//水抄表记录列表
function WaterRecords(pageIndex) {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingRoomCharId: $("#CurRoomCharId").val(),
        pageIndex: pageIndex,
        pageSize: pageSize_Reocrd,
        Source: 1
    };
    $.ajax({
        type: "GET",
        url: host + "/building/readrecords",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                var data = jdata.data;
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += "<tr>";
                    html += "<td>" + data[i].RecordDate + "</td>";
                    html += "<td>" + data[i].Mark + "</td>";
                    if (powerControl($(".readDelete_del"), "readrecord_delete")) {
                        html += "<td><span onclick=\"ReadDelete('" + data[i].CharId + "')\" class='readDelete_del'>删除</span></td>";
                    }
                    html += "</tr>";
                }
                $("#WaterRecords tr:first").nextAll().remove();
                $("#WaterRecords").append(html);
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//抄表记录初始化:电
function ElecInit() {
    ElecPageInit();
    ElecRecords(1);
}

//电抄表记录分页初始化
function ElecPageInit() {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingRoomCharId: $("#CurRoomCharId").val(),
        pageIndex: 1,
        pageSize: 1,
        Source: 2
    };
    $.ajax({
        type: "GET",
        url: host + "/building/readrecords",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                //清空分页控件
                $(".fy-wrap-elec").html("");
                //绑定分页控件
                var pageinit = new fyfoo2(pageSize_Reocrd, jdata.exted.totalNum, function (num) {
                    ElecRecords(num);
                }, $(".fy-wrap-elec"));
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//电抄表信息获取
function ElecRecords(pageIndex) {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        buildingRoomCharId: $("#CurRoomCharId").val(),
        pageIndex: pageIndex,
        pageSize: pageSize_Reocrd,
        Source: 2
    };
    $.ajax({
        type: "GET",
        url: host + "/building/readrecords",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                var data = jdata.data;
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += "<tr>";
                    html += "<td>" + data[i].RecordDate + "</td>";
                    html += "<td>" + data[i].Mark + "</td>";
                    html += "<td><span onclick=\"ReadDelete('" + data[i].CharId + "')\">删除</span></td>";
                    html += "</tr>";
                }
                $("#ElecRecords tr:first").nextAll().remove();
                $("#ElecRecords").append(html);
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//抄表记录新增基础信息获取
function ReadAddItem() {
    var data = {
        requestKey: localStorage.getItem("requestKey")
    };
    $.ajax({
        type: "GET",
        url: host + "/building/readrecord/add",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                var data = jdata.data;
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    var style = i == 0 ? "cur" : "";
                    html += "<li class=\"" + style + "\" data-value=\"" + data[i].Key + "\">" + data[i].Value + "<li>";
                }
                $("#ReadItem ul").html(html);
                $("#ReadItem span").text($("#ReadItem li[class='cur']").text());
                DropdownInit();
            }
            else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//抄表新增
var electricReg = /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/;
function ReadAdd() {
    var data =
        {
            requestKey: localStorage.getItem("requestKey"),
            buildingRoomCharId: $("#CurRoomCharId").val(),
            source: $("#ReadItem li[class='cur']").attr("data-value"),
            mark: $("#Mark").val(),
            recordDate: $("#RecordDate").val(),
            description: $("#RecordDescription").val()
        };
    if (!electricReg.test($("#Mark").val())) {
        messageBox.show("警告", "请输入正确的度数！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    $.ajax({
        type: "POST",
        url: host + "/building/readrecord/add",
        data: data,
        dataType: "json",
        success: function (jdata) {
            ReadInit();
            messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            baocun();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//抄表删除
function ReadDelete(charId) {
    var r;
    messageBox.show("确认", "是否删除该条记录？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    $(".btn-confirm").click(function () {
        r = true;
        readDel();
    })
    $(".close span").click(function () {
        r = false;
    })
    function readDel() {

        if (r) {
            var data = {
                requestKey: localStorage.getItem("requestKey"),
                charId: charId
            };
            $.ajax({
                type: "POST",
                url: host + "/building/readrecord/delete",
                data: data,
                dataType: "json",
                success: function (jdata) {
                    ReadInit();
                    messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                },
                error: function (XMLHttpRequest, txtStatus, errorThrown) {
                    messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
                }
            });
        }
    }
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
                    html += "<li value=\"\" class=\"cur\">不选</li>";
                    for (var i = 0; i < data.length; i++) {
                        html += "<li data-value=\"" + data[i].CharId + "\" >" + data[i].Name + "</li>";
                    }
                    $("#Emps_Add > ul").html(html);
                    $("#Emps_Add > span").text($("#Emps_Add>ul>li[class='cur']").text());
                    DropdownInit();
                }
                else {
                    messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
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


//部门下拉切换员工列表
function Dpts_Add_click() {
    $("#Dpts_Add").on("click", "li", function () {
        EmployeeBind($(this).attr("data-value"));
    });
}
Dpts_Add_click();


function CustomerSel() {
    window.open("customersel.html", '', 'width=500,height=600,top=50,left=300, scrollbars=no, status=no,toolbar=no,menubar=no,location=no,resizable=no,titlebar=no');
}

function historyAdd() {
    window.open("historyAdd.html?curRoomCharId=" + $("#CurRoomCharId").val(), '', 'width=500,height=600,top=50,left=300, scrollbars=no, status=no,toolbar=no,menubar=no,location=no,resizable=no,titlebar=no');
}

function HistoryLook(charId) {
    window.open("historyLook.html?contractCharId=" + charId, '', 'width=500,height=600,top=50,left=300, scrollbars=no, status=no,toolbar=no,menubar=no,location=no,resizable=no,titlebar=no');
}


// panel_tab5($('.btn-propertyadd,.btn-repairadd,.btn-checktableadd,.btn-contractadd,.btn-roomedit,.btn-propertyedit'), $('.modal-mask,.btn-cancel'), $('.alert-modal-wraper'));