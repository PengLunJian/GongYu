panel_tab5($('.btn-propertyadd,.btn-repairadd,.btn-checktableadd,.btn-contractadd,.btn-roomedit,.btn-propertyedit'), $('.modal-mask,.btn-cancel'), $('.alert-modal-wraper'));
var pageSize = 10;
var pageSize_Reocrd = 3;


/**
 * 构造函数
 * @constructor
 */
function PropertyPage() {
    arguments = arguments.length != 0 ? arguments[0] : arguments;
    // 楼层添加
    this.FLOORLIORDERFOO = arguments['FLOORLIORDERFOO'] ? arguments['FLOORLIORDERFOO'] : 'FLOORLIORDERFOO';
    // 房间
    this.ROOMS = arguments['ROOMS'] ? arguments['ROOMS'] : 'ROOMS';
    // 物业列表
    this.BUILDINGS = arguments['BUILDINGS'] ? arguments['BUILDINGS'] : 'BUILDINGS';
    // 楼层列表
    this.FLOORS = arguments['FLOORS'] ? arguments['FLOORS'] : 'FLOORS';
    //物业新增基础信息
    this.BUILDINGADDBIND = arguments['BUILDINGADDBIND'] ? arguments['BUILDINGADDBIND'] : 'BUILDINGADDBIND';
    // 城市基础信息
    this.CITYBIND = arguments['CITYBIND'] ? arguments['CITYBIND'] : 'CITYBIND';
    // 区域基础信息
    this.DISTRICTBIND = arguments['DISTRICTBIND'] ? arguments['DISTRICTBIND'] : 'DISTRICTBIND';
    // 城市信息编辑
    this.CITYUPTBIND = arguments['CITYUPTBIND'] ? arguments['CITYUPTBIND'] : 'CITYUPTBIND';
    // 区域信息编辑
    this.DISTRICTUPTBIND = arguments['DISTRICTUPTBIND'] ? arguments['DISTRICTUPTBIND'] : 'DISTRICTUPTBIND';
    // 物业新增（保存）
    this.BUILDINGADDSAVE = arguments['BUILDINGADDSAVE'] ? arguments['BUILDINGADDSAVE'] : 'BUILDINGADDSAVE';
    // 物业编辑（保存）
    this.BUILDINGUPDATEBIND = arguments['BUILDINGUPDATEBIND'] ? arguments['BUILDINGUPDATEBIND'] : 'BUILDINGUPDATEBIND';
    // 物业编辑保存
    this.BUILDINGUPDATESAVE = arguments['BUILDINGUPDATESAVE'] ? arguments['BUILDINGUPDATESAVE'] : 'BUILDINGUPDATESAVE';
    // 物业明细
    this.BUILDINGDETAIL = arguments['BUILDINGDETAIL'] ? arguments['BUILDINGDETAIL'] : 'BUILDINGDETAIL';
    // 物业删除
    this.BUILDINGDELETE = arguments['BUILDINGDELETE'] ? arguments['BUILDINGDELETE'] : 'BUILDINGDELETE';
    // 楼层编辑（保存）
    this.FLOOR_UPDATE = arguments['FLOOR_UPDATE'] ? arguments['FLOOR_UPDATE'] : 'FLOOR_UPDATE';
    //楼层删除
    this.FLOOR_DELETE = arguments['FLOOR_DELETE'] ? arguments['FLOOR_DELETE'] : 'FLOOR_DELETE';
    // 房间详情
    this.ROOM_DETAIL = arguments['ROOM_DETAIL'] ? arguments['ROOM_DETAIL'] : 'ROOM_DETAIL';
    // 房间新增
    this.ROOM_ADD = arguments['ROOM_ADD'] ? arguments['ROOM_ADD'] : 'ROOM_ADD';
    //房间编辑页面获取
    this.ROOM_UPDATE_DETAIL = arguments['ROOM_UPDATE_DETAIL'] ? arguments['ROOM_UPDATE_DETAIL'] : 'ROOM_UPDATE_DETAIL';
    //房间信息保存
    this.ROOM_UPDATE = arguments['ROOM_UPDATE'] ? arguments['ROOM_UPDATE'] : 'ROOM_UPDATE';
    // 房间删除
    this.ROOM_DELETE = arguments['ROOM_DELETE'] ? arguments['ROOM_DELETE'] : 'ROOM_DELETE';
    //房间签约基础信息获取
    this.CONTRACT_ADD_BIND = arguments['CONTRACT_ADD_BIND'] ? arguments['CONTRACT_ADD_BIND'] : 'CONTRACT_ADD_BIND';
    //房间签约(合同新增[保存])
    this.CONTRACT_ADD = arguments['CONTRACT_ADD'] ? arguments['CONTRACT_ADD'] : 'CONTRACT_ADD';
    //维修分页初始化
    this.SERVICE_PAGE_INIT = arguments['SERVICE_PAGE_INIT'] ? arguments['SERVICE_PAGE_INIT'] : 'SERVICE_PAGE_INIT';
    //维修记录列表
    this.SERVICE_RECORDS = arguments['SERVICE_RECORDS'] ? arguments['SERVICE_RECORDS'] : 'SERVICE_RECORDS';
    // 维修新增基础信息获取
    this.SERVICE_ADD_BIND = arguments['SERVICE_ADD_BIND'] ? arguments['SERVICE_ADD_BIND'] : 'SERVICE_ADD_BIND';
    //维修新增[保存]SERVICE_ADD
    this.SERVICE_ADD = arguments['SERVICE_ADD'] ? arguments['SERVICE_ADD'] : 'SERVICE_ADD';
    //维修删除
    this.SERVICE_DELETE = arguments['SERVICE_DELETE'] ? arguments['SERVICE_DELETE'] : 'SERVICE_DELETE';
    //合同详情
    this.CONTRACT = arguments['CONTRACT'] ? arguments['CONTRACT'] : 'CONTRACT';
    //历史合同列表分页初始化
    this.HISTORY_CONTRACT_INIT = arguments['HISTORY_CONTRACT_INIT'] ? arguments['HISTORY_CONTRACT_INIT'] : 'HISTORY_CONTRACT_INIT';
    //历史合同列表
    this.HISTORY_CONTRACT_RECORDS = arguments['HISTORY_CONTRACT_RECORDS'] ? arguments['HISTORY_CONTRACT_RECORDS'] : 'HISTORY_CONTRACT_RECORDS';
    //水抄表记录分页初始化
    this.WATER_PAGE_INIT = arguments['WATER_PAGE_INIT'] ? arguments['WATER_PAGE_INIT'] : 'WATER_PAGE_INIT';
    //水抄表记录列表
    this.WATER_RECORDS = arguments['WATER_RECORDS'] ? arguments['WATER_RECORDS'] : 'WATER_RECORDS';
    //电抄表记录分页初始化
    this.ELEC_PAGE_INIT = arguments['ELEC_PAGE_INIT'] ? arguments['ELEC_PAGE_INIT'] : 'ELEC_PAGE_INIT';
    //电抄表记录列表
    this.ELEC_RECORDS = arguments['ELEC_RECORDS'] ? arguments['ELEC_RECORDS'] : 'ELEC_RECORDS';
    //抄表记录新增基础信息获取
    this.READ_ADD_ITEM = arguments['READ_ADD_ITEM'] ? arguments['READ_ADD_ITEM'] : 'READ_ADD_ITEM';
    //抄表新增[保存]
    this.READ_ADD = arguments['READ_ADD'] ? arguments['READ_ADD'] : 'READ_ADD';
    //抄表删除
    this.READ_DELETE = arguments['READ_DELETE'] ? arguments['READ_DELETE'] : 'READ_DELETE';
    //绑定员工下拉列表
    this.EMPLOYEE_BIND = arguments['EMPLOYEE_BIND'] ? arguments['EMPLOYEE_BIND'] : 'EMPLOYEE_BIND';
    // 物业初始化
    this.init();
}

// 参数列表
/**
 *
 * @param params参数
 * @returns {PropertyPage}
 */
PropertyPage.prototype.getParams = function (name) {
    var _this = this;
    var params = null;
    switch (name) {
        // 楼层添加参数
        case this.FLOORLIORDERFOO:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingCharId: $("#Buildings dd[class='cur'] span").attr("data-value")
                    ? $("#Buildings dd[class='cur'] span").attr("data-value") : ''
            };
            break;

        // 房间列表参数
        case this.ROOMS:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                state: $("#RoomState li[class='cur']").attr("data-value"),
                key: $("#Key").val(),
                buildingCharId: $("#Buildings dd[class='cur'] span").attr("data-value")
                    ? $("#Buildings dd[class='cur'] span").attr("data-value") : ''

            };
            break;

        // 物业列表参数
        case this.BUILDINGS:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;

        // 楼层列表参数
        case this.FLOORS:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingCharId: $("#Buildings dd[class='cur'] span").attr("data-value")
                    ? $("#Buildings dd[class='cur'] span").attr("data-value") : ''
            };
            break;

        //物业新增基础信息参数（省份信息和标签信息）
        case this.BUILDINGADDBIND:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingCharId: $("#Buildings dd[class='cur'] span").attr("data-value")
                    ? $("#Buildings dd[class='cur'] span").attr("data-value") : ''
            };
            break;

        // 城市信息参数
        case this.CITYBIND:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                provinceCharId: $("#Province_Add li[class='cur']").attr("data-value")
            };
            break;

        // 区域信息参数
        case this.DISTRICTBIND:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                cityCharId: $("#City_Add li[class='cur']").attr("data-value")
            };
            break;

        // 城市信息编辑参数
        case this.CITYUPTBIND:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                provinceCharId: $("#Province_Edit li[class='cur']").attr("data-value")
            };
            break;

        // 区域信息编辑
        case this.DISTRICTUPTBIND:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                cityCharId: $("#City_Edit li[class='cur']").attr("data-value")
            };
            break;

        // 物业新增（保存）
        case this.BUILDINGADDSAVE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                name: $("#BuildingName_Add1").val().trim(),
                cityCharId: $("#City_Add li[class='cur']").attr("data-value"),
                districtCharId: $("#District_Add li[class='cur']").attr("data-value"),
                provinceCharId: $("#Province_Add li[class='cur']").attr("data-value"),
                address: $("#BuildingAddr_Add").val().trim(),
                floorCount: parseInt($("#FloorNum").val().trim()),
                roomCount: parseInt($("#HouseNum").val().trim()),
                alloc: _this.BUILDINGADDSAVEALLOCS,
                tag: _this.BUILDINGADDSAVETAGS,
                waterUnitPrice: parseFloat($("#water_price").val().trim()),
                eleUnitPrice: parseFloat($("#ele_price").val().trim())
            };
            break;

        // 物业编辑基础数据
        case this.BUILDINGUPDATEBIND:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingCharId: $("#BuildingCharId").val()
            };
            break;

        // 物业编辑保存
        case this.BUILDINGUPDATESAVE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#BuildingCharId").val(),
                name: $("#BuildingName_Edit").val().trim(),
                cityCharId: $("#City_Edit li[class='cur']").attr("data-value"),
                districtCharId: $("#District_Edit li[class='cur']").attr("data-value"),
                provinceCharId: $("#Province_Edit li[class='cur']").attr("data-value"),
                address: $("#BuildingAddr_Edit").val().trim(),
                waterUnitPrice: parseFloat($("#water_price_edit").val().trim()),
                eleUnitPrice: parseFloat($("#ele_price_edit").val().trim()),
                alloc: _this.BUILDINGUPDATEALLOC,
                tag: _this.BUILDINGUPDATETAGS
            };
            break;

        // 物业明细
        case this.BUILDINGDETAIL:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingCharId: _this.PROPERTYDETAIL_CHARID
            };
            break;

        // 物业删除
        case this.BUILDINGDELETE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#BuildingCharId").val()
            };
            break;

        //     楼层编辑保存
        case this.FLOOR_UPDATE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#CurFloorCharId").val(),
                name: $("#CurFloorName").val()
            };
            break;

        // 楼层删除
        case this.FLOOR_DELETE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#CurFloorCharId").val()
            };
            break;

        // 房间详情
        case this.ROOM_DETAIL:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: _this.RoomDetail_CHARID
            };
            break;

        // 房间新增
        case this.ROOM_ADD:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingFloorCharId: _this.RoomAdd_CHARID
            };
            break;

        //房间编辑页面获取
        case this.ROOM_UPDATE_DETAIL:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val()
            };
            break;

        // 房间信息保存
        case this.ROOM_UPDATE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#CurRoomCharId").val(),
                name: $("#RoomName_Update").val(),
                price: parseFloat($("#Price_Update").val()),
                square: parseFloat($("#Square_Update").val()),
                div1: parseInt($("#Div1").val()),
                div2: parseInt($("#Div2").val()),
                div3: parseInt($("#Div3").val()),
                alloc: _this.ROOM_UPDATE_ALLOCS,
                tag: _this.ROOM_UPDATE_TAGS
            };
            break;

        //房间签约基础信息获取
        case this.CONTRACT_ADD_BIND:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val()
            };
            break;

        //房间签约(合同新增[保存])
        case this.CONTRACT_ADD:
            params = {
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
            break;

        // 房间删除
        case this.ROOM_DELETE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#CurRoomCharId").val()
            };
            break;

        //维修分页初始化
        case this.SERVICE_PAGE_INIT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val(),
                pageIndex: 1,
                pageSize: pageSize
            };
            break;

        //维修记录列表
        case this.SERVICE_RECORDS:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val(),
                pageIndex: _this.ServiceRecord_arugments,
                pageSize: pageSize
            };
            break;

        //维修新增基础信息获取
        case this.SERVICE_ADD_BIND:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;

        //维修新增[保存]
        case this.SERVICE_ADD:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val(),
                serviceParameterCharId: $("#ServiceItem li[class='cur']").attr("data-value"),
                obj: parseInt($("#ServiceObject li[class='cur']").attr("data-value")),
                price: $("#ServicePrice").val(),
                description: $("#ServiceDescription").val()
            };
            break;

        // 维修删除
        case this.SERVICE_DELETE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: _this.ServiceDelete_CHARID
            };
            break;

        //合同详情
        case this.CONTRACT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                roomCharId: $("#CurRoomCharId").val()
            };
            break;

        // 历史合同列表分页初始化
        case this.HISTORY_CONTRACT_INIT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val(),
                pageIndex: 1,
                pageSize: 1
            };
            break;

        // 历史合同列表
        case this.HISTORY_CONTRACT_RECORDS:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val(),
                pageIndex: _this.HistoryContractRecords_arguments,
                // pageIndex:1,
                pageSize: 5
            };

            break;

        //水抄表记录分页初始化
        case this.WATER_PAGE_INIT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val(),
                pageIndex: 1,
                pageSize: 1,
                Source: 1
            };
            break;

        //水抄表记录列表
        case this.WATER_RECORDS:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val(),
                pageIndex: _this.WaterRecords_arguments,
                pageSize: pageSize_Reocrd,
                Source: 1
            };
            break;

        //电抄表记录分页初始化
        case this.ELEC_PAGE_INIT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val(),
                pageIndex: 1,
                pageSize: 1,
                Source: 2
            };
            break;

        // 电抄表记录列表
        case this.ELEC_RECORDS:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val(),
                pageIndex: _this.ElecRecords_arguments,
                pageSize: pageSize_Reocrd,
                Source: 2
            };
            break;

        // 抄表记录新增基础信息获取
        case this.READ_ADD:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                buildingRoomCharId: $("#CurRoomCharId").val(),
                source: $("#ReadItem li[class='cur']").attr("data-value"),
                mark: $("#Mark").val(),
                recordDate: $("#RecordDate").val(),
                description: $("#RecordDescription").val()
            };
            break;

        //抄表新增[保存]
        case this.READ_ADD_ITEM:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;

        // 抄表删除
        case this.READ_DELETE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: _this.ReadDelete_CHARID
            };
            break;

        //绑定员工下拉列表
        case this.EMPLOYEE_BIND:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                departmentCharId: $("#Dpts_Add li.cur").attr("data-value")
            };
            break;
    }
    return params;
}

/**
 *构造函数的原型方法
 * @returns {PropertyPage}
 */
// 物业初始化
PropertyPage.prototype.init = function () {
    // 选中物业
    this.propertySelected();
    // 物业新增
    this.propertyAdds();
    // 选中预定
    this.propertyOptions();
    // 物业编辑
    this.buildingUpdates();
    //部门(签约）下拉切换员工列表
    this.employeeBinds();
    // 配置添加
    this.allocation();
    // 客户选中
    this.customerSelected();
    // 选择客户
    this.customerSel();
    // 房间新增
    this.roomAdds();
    // 物业初始化
    $(function () {
        propertyPage.propertyDrawing();
    });
    // 暂无权限
    if (!webApp.grantControl($(".fq-contain-dv"), "building_select")) {
        webApp.noGrant();
    }
    ;
    webApp.grantControl($(".btn-propertyadd"), "building_add");
}

// 物业渲染
PropertyPage.prototype.propertyDrawing = function () {
    App.init();
    ComponentsPickers.init();
    // 物业列表初始化渲染
    propertyPage.ajaxRequestBuildings(propertyPage.getParams(propertyPage.BUILDINGS));
    // 绑定用户名称,是否认证信息
}


// 物业新增
PropertyPage.prototype.buildingAddParams = function () {
    var params = {
        BN_VAL: $("#BuildingName_Add1").val().trim(),
        PA_VAL: $("#Province_Add li[class='cur']"),
        CA_VAL: $("#City_Add li[class='cur']"),
        DA_VAL: $("#District_Add li[class='cur']"),
        BR_VAL: $("#BuildingAddr_Add").val().trim(),
        FN_VAL: $("#FloorNum").val().trim(),
        HN_VAL: $("#HouseNum").val().trim(),
        WP_VAL: $("#water_price").val().trim(),
        EP_VAL: $("#ele_price").val().trim()
    }
    return params;
}
PropertyPage.prototype.buildingAdd = function () {
    var _this = this;
    var propertyMessage = "";
    var result = false;
    var propertyStr = $("#Buildings>dd>span").text();
    var params = _this.buildingAddParams();
    if (params['BN_VAL'] == "") {
        propertyMessage = "物业名称不能为空！";
    } else if (propertyStr.indexOf(params['BN_VAL']) != -1) {
        propertyMessage = "物业名称不能重复！";
    } else if (params['PA_VAL'].length == 0) {
        propertyMessage = "请选择省份！";
    } else if (params['CA_VAL'].length == 0) {
        propertyMessage = "请选择城市！";
    } else if (params['DA_VAL'].length == 0) {
        propertyMessage = "请选择区域！";
    } else if (params['BR_VAL'] == "") {
        propertyMessage = "地址不能为空！";
    } else if (regular.check(regular.FLOORCOUNT_REG_EXP, params['FN_VAL'])) {
        propertyMessage = "请输入正确层数！";
    } else if (regular.check(regular.ROOMCOUNT_REG_EXP, params['HN_VAL'])) {
        propertyMessage = "请输入正确层户数！";
    } else if (regular.check(regular.MONEY_REG_EXP, params['WP_VAL'])) {
        propertyMessage = "请输入正确水费价格！";
    } else if (regular.check(regular.MONEY_REG_EXP, params['EP_VAL'])) {
        propertyMessage = "请输入正确电费价格！";
    } else {
        result = true;
    }
    if (result) {
        var allocs = new Array();
        $("#BuildingAlloc_Add li").each(function () {
            if ($(this).hasClass("tagli-sel")) {
                allocs.push($(this).attr("data-value"));
            }
        });
        _this.BUILDINGADDSAVEALLOCS = allocs.join("|");
        var tags = new Array();
        $("#BuildingTag_Add li").each(function () {
            if ($(this).hasClass("tagli-sel")) {
                tags.push($(this).attr("data-value"));
            }
        });
        _this.BUILDINGADDSAVETAGS = tags.join("|");
        _this.ajaxRequestBuildingAddSave(_this.getParams(_this.BUILDINGADDSAVE));
    } else {
        messageBox.show('提示', propertyMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return this;
}

// 物业编辑保存
PropertyPage.prototype.buildingUpdateAdd = function () {
    var _this = this;
    var params = {
        buildName: $("#BuildingName_Edit").val().trim(),
        provinceEdit: $("#Province_Edit li[class='cur']"),
        cityEdit: $("#City_Edit li[class='cur']"),
        districtEdit: $("#District_Edit li[class='cur']"),
        buildingAddrEdit: $("#BuildingAddr_Edit").val().trim(),
        waterUnitPrice: parseFloat($("#water_price_edit").val().trim()),
        eleUnitPrice: parseFloat($("#ele_price_edit").val().trim())
    }
    if (params.buildName == "") {
        messageBox.show("警告", "物业名称不能为空！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    //选择区域
    if (params.provinceEdit.length == 0 || params.cityEdit.length == 0 || params.districtEdit.length == 0) {
        messageBox.show("警告", "请选择物业区域！", MessageBoxButtons.OK, MessageBoxIcons.warning);
    } else if (params.buildingAddrEdit == "") {
        messageBox.show("警告", "地址不能为空！", MessageBoxButtons.OK, MessageBoxIcons.warning);
    } else if (regular.check(regular.MONEY_REG_EXP, params['waterUnitPrice'])) {
        messageBox.show("警告", "请输入正确水费价格！", MessageBoxButtons.OK, MessageBoxIcons.warning);
    } else if (regular.check(regular.MONEY_REG_EXP, params['eleUnitPrice'])) {
        messageBox.show("警告", "请输入正确电费价格！", MessageBoxButtons.OK, MessageBoxIcons.warning);
    }
    else {
        var allocs = new Array();
        $("#BuildingAlloc_Update li").each(function () {
            if ($(this).hasClass("tagli-sel")) {
                allocs.push($(this).attr("data-value"));
            }
        });
        _this.BUILDINGUPDATEALLOC = allocs.join("|");

        var tags = new Array();
        $("#BuildingTag_Update li").each(function () {
            if ($(this).hasClass("tagli-sel")) {
                tags.push($(this).attr("data-value"));
            }
        });
        _this.BUILDINGUPDATETAGS = tags.join("|");
        _this.ajaxRequestBuildingUpdateSave(_this.getParams(_this.BUILDINGUPDATESAVE));
    }
}

// 物业删除
PropertyPage.prototype.buildingDelete = function () {
    var _this = this;
    var params = this.getParams(this.BUILDINGDELETE);
    // mp.hideSmPanel();
    messageBox.show("确认", "确定删除物业？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        _this.ajaxRequestBuildingDel(params);
    })
    return this;
}

//楼层编辑基础信息获取
PropertyPage.prototype.floorBinds = function () {
    var _this = this;
    $("#Rooms").on("click", ".btn-flooredit", function () {
        _this.FLOOR_NAME = $(this).attr("data-floorName").trim();
        _this.FLOOR_CHARID = $(this).attr("data-floorCharId").trim();
        $("#CurFloorName").val(_this.FLOOR_NAME);
        $("#CurFloorCharId").val(_this.FLOOR_CHARID);
    })
}

//绑定楼层和房间
PropertyPage.prototype.floorRoomBind = function () {
    this.ajaxRequestFloors(this.getParams(this.FLOORS));
}

//楼层编辑
PropertyPage.prototype.floorUpdate = function () {
    var _this = this;
    if ($("#CurFloorName").val() == 0) {
        messageBox.show("提示", "请输入正确的楼层", MessageBoxButtons.OK, MessageBoxIcons.infomation);
    } else {
        _this.ajaxRequestFloorUpdate(_this.getParams(_this.FLOOR_UPDATE));
    }
}

// 点击添加楼层
PropertyPage.prototype.floorAdd = function () {
    this.ajaxRequestFloorliorderfoo(this.getParams(this.FLOORLIORDERFOO));
}

// 修改楼层锚点
PropertyPage.prototype.floorCheck = function () {
    $('#property-floor-ul-id li').not('.floorword,.btn-flooradd').unbind('click').bind('click', function () {
        // 获取索引值
        var index = $('#property-floor-ul-id li').not('.floorword,.btn-flooradd').index($(this));
        var animateTop = $('.property-floor-message').eq(index).offset().top - 115;
        // $(".property-floor-wrap").animate({top: '-=' + animateTop + "px"}, 300, function () {
        $(".property-floor-wrap .mCSB_container").animate({top: '-=' + animateTop + "px"}, 300, function () {
        });
    });
}

// 楼层删除
PropertyPage.prototype.floorDelete = function () {
    var _this = this;
    var params = this.getParams(this.FLOOR_DELETE);
    messageBox.show("确认", "确定删除楼层？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        _this.ajaxRequestFloorDelete(params);
    })
    return this;
}
PropertyPage.prototype.roomUpdateAddParams = function () {
    var params = {
        PU_VAL: $("#Price_Update").val(),
        SU_VAL: $("#Square_Update").val(),
        DV_VAL: $("#Div1").val(),
        DT_VAL: $("#Div2").val(),
        DS_VAL: $("#Div3").val()
    }
    return params;
}
// 房间信息保存
PropertyPage.prototype.roomUpdateAdd = function () {
    var _this = this;
    var customerMessage = "";
    var result = false;
    var params = _this.roomUpdateAddParams();
    if (regular.moneyRegExpCheck(params.PU_VAL)) {
        customerMessage = "租金输入有误！";
    } else if (regular.areaRegExpCheck(params.SU_VAL)) {
        customerMessage = "面积输入有误！";
    } else if (regular.roomLayoutRegExpCheck(params.DV_VAL) || regular.roomLayoutRegExpCheck(params.DT_VAL) || regular.roomLayoutRegExpCheck(params.DS_VAL)) {
        customerMessage = "房型输入有误！";
    } else {
        result = true;
    }
    if (result) {
        var allocs = new Array();
        $("#RoomAlloc_Update li").each(function () {
            if ($(this).hasClass("tagli-sel")) {
                allocs.push($(this).attr("data-value"));
            }
        });
        _this.ROOM_UPDATE_ALLOCS = allocs.join("|");
        var tags = new Array();
        $("#RoomTag_Update li").each(function () {
            if ($(this).hasClass("tagli-sel")) {
                tags.push($(this).attr("data-value"));
            }
        });
        _this.ROOM_UPDATE_TAGS = tags.join("|");
        _this.ajaxRequestRoomUpdate(_this.getParams(_this.ROOM_UPDATE));
    } else {
        messageBox.show('提示', customerMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }

}

// 房间删除
PropertyPage.prototype.roomDelete = function () {
    var _this = this;
    var params = this.getParams(this.ROOM_DELETE);
    messageBox.show("确认", "确定删除房间？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        _this.ajaxRequestRoomDelete(params);
    })
    return this;
}

PropertyPage.prototype.contractAddParams = function () {
    var params = {
        CCD_VAL: $("#CustomerCharId").val().trim(),
        CP_VAL: $("#ContractPhone_Add").val().trim(),
        CD_VAL: $("#CardID_Add").val().trim(),
        PAD_VAL: $("#Price_Add").val().trim(),
        DT_VAL: $("#Deposit_Add").val().trim(),
        ID_VAL: $("#InDate").val(),
        OD_VAL: $("#OutDate").val(),
        PE_VAL: ($("#People_Add").val()),
        DS_VAL: $("#Dpts_Add li[class='cur']").attr("data-value"),
        ES_VAL: $("#Emps_Add li[class='cur']").attr("data-value"),
        BD_VAL: $("#BargainDate").val()
    }
    return params;
}

// 房间签约(合同新增[保存])
PropertyPage.prototype.contractAdd = function () {
    var _this = this;
    var propertMessage = "";
    var result = false;
    var params = _this.contractAddParams();
    if (params['CCD_VAL'] == "") {
        propertMessage = "请选择签约客户！";
    } else if (regular.check(regular.PHONE_REG_EXP, params['CP_VAL'])) {
        propertMessage = "手机号码不正确！";
    } else if (params['CD_VAL'] == "") {
        propertMessage = "证件信息不能为空！";
    } else if (regular.check(regular.MONEY_REG_EXP, params['PAD_VAL'])) {
        propertMessage = "租金输入不正确！";
    } else if (regular.check(regular.MONEY_REG_EXP, params['DT_VAL'])) {
        propertMessage = "押金输入不正确！";
    } else if (params['ID_VAL'] == "") {
        propertMessage = "请填写起租日期！";
    } else if (params['OD_VAL'] == "") {
        propertMessage = "请填写退租日期！";
    } else if (regular.check(regular.CUSTOMER_REG_EXP, params['PE_VAL'])) {
        propertMessage = "入住人数输入有误！";
    } else if (params['DS_VAL'] == "" || params['ES_VAL'] == "") {
        propertMessage = "请选择所属员工！";
    } else if (params['BD_VAL'] == "") {
        propertMessage = "请填写签约日期！";
    } else {
        result = true;
    }
    if (result) {
        _this.ajaxRequestContractAdd(_this.getParams(_this.CONTRACT_ADD));
    } else {
        messageBox.show('提示', propertMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
}

//维修列表页面初始化
PropertyPage.prototype.serviceInit = function () {
    this.ajaxRequestServicePageInit(this.getParams(this.SERVICE_PAGE_INIT));
    this.serviceRecords();
}
// 维修记录分页
PropertyPage.prototype.serviceRecords = function () {
    this.ServiceRecord_arugments = arguments.length != 0 ? arguments[0] : 1;
    this.ajaxRequestServiceRecords(this.getParams(this.SERVICE_RECORDS));
}

//维修新增[保存]
PropertyPage.prototype.serviceAdd = function () {
    var _this = this;
    var params = {
        servicePrice: $("#ServicePrice").val()
    }
    if (regular.check(regular.MONEY_REG_EXP, params.servicePrice)) {
        messageBox.show("警告", "维修金额输入错误！", MessageBoxButtons.OK, MessageBoxIcons.warning);
    } else {
        _this.ajaxRequestServiceAdd(_this.getParams(_this.SERVICE_ADD));
    }
}

// 维修删除
PropertyPage.prototype.serviceDelete = function () {
    var _this = this;
    $("#ServiceRecords").on("click", ".serviceDelete", function () {
        _this.ServiceDelete_CHARID = $(this).attr("data-ServiceDelete").trim();
        var params = _this.getParams(_this.SERVICE_DELETE);
        messageBox.show("确认", "确定删除维修？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            _this.ajaxRequestServiceDelete(params);
        })
    });
    return this;
}

//初始化抄表记录页面
PropertyPage.prototype.readInit = function () {
    this.waterInit();
    this.elecInit();
    return this;
}

//抄表记录初始化:水
PropertyPage.prototype.waterInit = function () {
    this.ajaxRequestWaterPageInit(this.getParams(this.WATER_PAGE_INIT));
    this.waterRecords();
    return this;
}

// 水抄表记录分页
PropertyPage.prototype.waterRecords = function () {
    this.WaterRecords_arguments = arguments.length != 0 ? arguments[0] : 1;
    this.ajaxRequestWaterRecords(this.getParams(this.WATER_RECORDS));
    return this;
}

//抄表记录初始化:电
PropertyPage.prototype.elecInit = function () {
    this.ajaxRequestElecPageInit(this.getParams(this.ELEC_PAGE_INIT));
    this.elecRecords();
    return this;
}

// 电水抄表记录分页
PropertyPage.prototype.elecRecords = function () {
    this.ElecRecords_arguments = arguments.length != 0 ? arguments[0] : 1;
    this.ajaxRequestElecRecords(this.getParams(this.ELEC_RECORDS));
    return this;
}

//抄表新增[保存]
PropertyPage.prototype.readAdd = function () {
    var _this = this;
    var params = {
        mark: $("#Mark").val()
    }
    if (regular.check(regular.DEGREE_REG_EXP, params.mark)) {
        messageBox.show("警告", "请输入正确的度数！", MessageBoxButtons.OK, MessageBoxIcons.warning);
    } else {
        _this.ajaxRequestReadAdd(_this.getParams(_this.READ_ADD));
    }
    return this;
}

// 抄表删除
PropertyPage.prototype.readDelete = function () {
    var _this = this;
    $("#WaterRecords,#ElecRecords").on("click", ".readDelete", function () {
        _this.ReadDelete_CHARID = $(this).attr("data-read-delete").trim();
        var params = _this.getParams(_this.READ_DELETE);
        messageBox.show("确认", "确定删除记录？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            _this.ajaxRequestReadDelete(params);
        })
    });
    return this;
}

//绑定员工下拉列表
PropertyPage.prototype.employeeBind = function () {
    var _this = this;
    if ($("#Dpts_Add li.cur").attr("data-value") != "") {
        _this.ajaxRequestEmployeeBind(_this.getParams(_this.EMPLOYEE_BIND));
    }
    else {
        var html = "";
        html += "<li data-value=\"\" class=\"cur\">不选</li>";
        $("#Emps_Add > ul").html(html);
        $("#Emps_Add > span").text("不选");
        DropdownInit();
    }
}

//初始化历史合同列表
PropertyPage.prototype.historyContractPageInit = function () {
    this.ajaxRequestHistoryContractInit(this.getParams(this.HISTORY_CONTRACT_INIT));
    this.historyContractRecords();
}

// 历史合同记录
PropertyPage.prototype.historyContractRecords = function () {
    this.HistoryContractRecords_arguments = arguments.length != 0 ? arguments[0] : 1;
    this.ajaxRequestHistoryContractRecords(this.getParams(this.HISTORY_CONTRACT_RECORDS));
}

// 点击物业选中
PropertyPage.prototype.propertySelected = function () {
    $('.property-nav2-dl').on('click', 'dd', function (e) {
        $(this).addClass('cur').siblings('dd').removeClass('cur');
        propertyPage.floorRoomBind();
    });
}

// 点击物业新增
PropertyPage.prototype.propertyAdds = function () {
    $('.btn-propertyadd').click(function () {
        // 物业新增基础信息获取
        propertyPage.ajaxRequestBuildingAddBind(propertyPage.getParams(propertyPage.BUILDINGADDBIND));
    })
}

// 物业编辑
PropertyPage.prototype.buildingUpdates = function () {
    $(".buildingUpdateBind").click(function () {
        propertyPage.ajaxRequestBuildingUpdateBind(propertyPage.getParams(propertyPage.BUILDINGUPDATEBIND));
    })
}

//部门(签约）下拉切换员工列表
PropertyPage.prototype.employeeBinds = function () {
    $("#Dpts_Add").on("click", "li", function () {
        propertyPage.employeeBind();
    });
}

// 配置选择
PropertyPage.prototype.allocation = function () {
    $('.tag-ul').on('click', 'li', function () {
        if ($(this).hasClass('tagli-sel') == true) {
            $(this).removeClass('tagli-sel');
        } else {
            $(this).addClass('tagli-sel');
        }
    })
}

// 客户选中
PropertyPage.prototype.customerSelected = function () {
    $('.btn-customerselect').click(function () {
        var obj = $(this).attr('type');
        $('.single-modal').show().animate({top: '0'}, 300);
    });
}

// 选择客户
PropertyPage.prototype.customerSel = function () {
    $('.customer-select .btn-keep2').click(function () {
        $('.single-modal').animate({top: '-200%'}, 300, function () {
            $(this).hide();
        });
    })
}

// 房间新增
PropertyPage.prototype.roomAdds = function () {
    $("#Rooms").on("click", ".roomAdd", function () {
        propertyPage.RoomAdd_CHARID = $(this).attr("data-RoomAdd").trim();
        propertyPage.ajaxRequestRoomAdd(propertyPage.getParams(propertyPage.ROOM_ADD));
    });
}

// 从客户中选取
PropertyPage.prototype.customerSele = function () {
    window.open("customersel.html", '', 'width=500,height=600,top=50,left=300, scrollbars=no, status=no,toolbar=no,menubar=no,location=no,resizable=no,titlebar=no');
}

// 历史合同新增
PropertyPage.prototype.historyAdd = function () {
    window.open("historyAdd.html?curRoomCharId=" + $("#CurRoomCharId").val(), '', 'width=500,height=600,top=50,left=300, scrollbars=no, status=no,toolbar=no,menubar=no,location=no,resizable=no,titlebar=no');
}

// 历史合同查看
PropertyPage.prototype.historyLooks = function () {
    var _this = this;
    $('#HistoryContractRecords').on('click', '.historyLook', function () {
        _this.HISTORY_CHARID = $(this).attr("data-history").trim();
        window.open("historyLook.html?contractCharId=" + _this.HISTORY_CHARID, '', 'width=500,height=600,top=50,left=300, scrollbars=no, status=no,toolbar=no,menubar=no,location=no,resizable=no,titlebar=no');
    })
}

// 全部，预定选中
PropertyPage.prototype.propertyOptions = function () {
    $('.property-search-section ul li').click(function () {
        $(this).addClass('cur').siblings('li').removeClass('cur');
        propertyPage.floorRoomBind();
    });
}

/**
 * @ajax
 * @returns {PropertyPage}
 */
// 楼层添加
PropertyPage.prototype.ajaxRequestFloorliorderfoo = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/floor/add",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var floornum = parseInt($(".btn-flooradd").prev().html()) + 1;
                var liorderstr = '<li>' + floornum + '</li>';
                $(".btn-flooradd").before(liorderstr);//楼层呈现添加
                //房间列表数据重新绑定
                _this.ajaxRequestRooms(_this.getParams(_this.ROOMS));
                _this.floorCheck();
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

// 房间列表
PropertyPage.prototype.ajaxRequestRooms = function (params) {
    var _this = this;
    $("#Rooms").on("click", ".roomDetail", function () {
        _this.RoomDetail_CHARID = $(this).attr("data-RoomDetail").trim();
        _this.ajaxRequestRoomDetail(_this.getParams(_this.ROOM_DETAIL));
    });
    $.ajax({
        type: "GET",
        url: host + "/building/rooms",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_DATA = data['exted'];
                var JSON_DATA = data['data'];
                var TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<div class=\"property-floor-message property-floor" + (i + 1) + "\">";
                    TEMP_HTML += "	<div class=\"property-floor-title\">";
                    if (webApp.grantControl($(".btn-flooredit"), "floor_update")) {
                        TEMP_HTML += "		<p>" + TEMP_DATA.BuildingName + " .<font>" + JSON_DATA[i].floorName + "</font>楼</p><span type=\"floor-edit\" dir=\"top\" class=\"btn-flooredit\" data-floorName='" + JSON_DATA[i].floorName + "'  data-floorCharId='" + JSON_DATA[i].floorCharId + "' onclick='propertyPage.floorBinds()'>编辑</span>";
                    } else {
                        TEMP_HTML += "		<p>" + TEMP_DATA.BuildingName + " .<font>" + JSON_DATA[i].floorName + "</font>楼</p>";
                    }
                    TEMP_HTML += "	</div>";
                    TEMP_HTML += "	<div class=\"property-floor-room\">";
                    TEMP_HTML += "	<ul>";
                    for (var j = 0; j < JSON_DATA[i].rooms.length; j++) {
                        var style = "";
                        if (JSON_DATA[i].rooms[j].State == 3) {
                            style = "room-let";
                        }
                        else if (JSON_DATA[i].rooms[j].State == 2) {
                            style = "room-advance";
                        }
                        TEMP_HTML += "		<li class='roomDetail' data-RoomDetail='" + JSON_DATA[i].rooms[j].CharId + "'><p>" + JSON_DATA[i].rooms[j].Name + "室</p><div type=\"room-message\" dir=\"right\" class=\"property-room-status " + style + "\"><i></i><span>" + JSON_DATA[i].rooms[j].Text + "</span></div></li>";

                    }
                    if (webApp.grantControl($(".btn-flooredit"), "room_add")) {
                        TEMP_HTML += "		<li  id=\"roomli_" + JSON_DATA[i].floorCharId + "\"><p>添加房间</p><div type=\"room-add\" dir=\"top\" class=\"property-room-status1 roomAdd\" data-RoomAdd='" + JSON_DATA[i].floorCharId + "'>+</div></li><div class=\"clear\"></div>";
                    } else {
                        TEMP_HTML += "		<li id=\"roomli_" + JSON_DATA[i].floorCharId + "\"><p></p></li><div class=\"clear\"></div>";
                    }
                    TEMP_HTML += "	</ul>";
                    TEMP_HTML += "</div>";
                    TEMP_HTML += "</div>";
                }
                $("#Rooms").find('>div').find('>div').eq(0).html("");
                $("#Rooms").find('>div').find('>div').eq(0).append(TEMP_HTML);

                $("#CurBuildingName").text(TEMP_DATA.BuildingName);
                $("#AllCount").text(TEMP_DATA.AllCount);
                $("#VacancyCount").text(TEMP_DATA.VacancyCount);
                $("#OrderCount").text(TEMP_DATA.OrderCount);
                $("#LetCount").text(TEMP_DATA.LetCount);

                panel_tab5($('.btn-flooredit,.property-room-status'), $('.modal-mask,.btn-cancel'), $('.alert-modal-wraper'));
            }
            else {
                messageBox.show("警告", JSON_DATA.msg, MessageBoxButtons.OK, MessageBoxIcons.warning);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });

}

//物业列表
PropertyPage.prototype.ajaxRequestBuildings = function (params) {
    var _this = this;
    $("#Buildings").on("click", ".btn-propertydetail", function (event) {
        _this.PROPERTYDETAIL_CHARID = $(this).attr("data-click").trim();
        _this.ajaxRequestBuildingDetail(_this.getParams(_this.BUILDINGDETAIL));
        event.stopPropagation();
    });
    $.ajax({
        type: "GET",
        url: host + "/building/buildings",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = "";
                var TEMP_DATA = null;
                var JSON_DATA = data['data'];
                for (var i = 0; i < JSON_DATA['Buildings'].length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    TEMP_HTML += "<dd class=\"" + style + "\" >";
                    TEMP_HTML += " <span data-value=\"" + JSON_DATA['Buildings'][i].CharId + "\">" + JSON_DATA['Buildings'][i]['Name'] + "（<font>" + JSON_DATA['Buildings'][i].Number + "</font>）</span>";
                    // 楼盘（物业）编辑
                    if (webApp.grantControl($(".btn-propertydetail"), "building_update")) {
                        TEMP_DATA = JSON_DATA['Buildings'][i];
                        TEMP_HTML += "<i type=\"property-detail\" dir=\"right\" class=\"icon-Param btn-propertydetail\" data-click='" + TEMP_DATA.CharId + "')></i>";
                    }
                    TEMP_HTML += "</dd>";
                }
                $("#Buildings dd").remove();
                $("#Buildings").append(TEMP_HTML);//绑定物业列表

                if ($("#Buildings dd").length != 0) {
                    TEMP_HTML = "";
                    for (var i = 0; i < JSON_DATA['Floors'].length; i++) {
                        TEMP_HTML += "<li data-value='" + JSON_DATA['Floors'][i].CharId + "' index='" + JSON_DATA['Floors'][i].SystemIndex + "'>" + JSON_DATA['Floors'][i].Name + "</li>";
                    }
                    if (webApp.grantControl($(".btn-flooradd"), "floor_add")) {
                        TEMP_HTML += "<li class=\"btn-flooradd\" onclick='propertyPage.floorAdd()'>+</li>";
                    }
                    $("#Floors").nextAll().remove();
                    $("#Floors").after(TEMP_HTML);//绑定楼层信息
                    if (webApp.grantControl($(".fq-contain-dv"), "building_select")) _this.ajaxRequestRooms(_this.getParams(_this.ROOMS));//绑定房间信息
                }


                propertyPage.floorCheck();//绑定楼层锚点切换事件
                panel_tab5($('.btn-propertydetail'), $('.modal-mask,.btn-cancel'), $('.alert-modal-wraper'));
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
    return this;
}

// 楼层
PropertyPage.prototype.ajaxRequestFloors = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + "/building/floors",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = "";
                var JSON_DATA = data['data'];
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<li data-value='" + JSON_DATA[i].CharId + "' index='" + JSON_DATA[i].SystemIndex + "'>" + JSON_DATA[i].Name + "</li>";
                }
                TEMP_HTML += "<li class=\"btn-flooradd\" onclick='propertyPage.floorAdd()'>+</li>";
                $("#Floors").nextAll().remove();
                $("#Floors").after(TEMP_HTML);//绑定楼层信息
                // Rooms(0);//绑定房间信息
                _this.ajaxRequestRooms(_this.getParams(_this.ROOMS));
                propertyPage.floorCheck();//绑定楼层锚点切换事件
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

//物业新增基础信息获取（省份信息和标签信息）
PropertyPage.prototype.ajaxRequestBuildingAddBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/building/province",
        data: params,
        dataType: "JSON",
        success: function (data) {
            //绑定省份信息
            var TEMP_HTML = "";
            var JSON_DATA = data['data'];
            for (var i = 0; i < JSON_DATA.length; i++) {
                TEMP_HTML += "<li data-value=\"" + JSON_DATA[i].Key + "\">" + JSON_DATA[i].Name + "</li>";
            }
            $("#Province_Add ul").html(TEMP_HTML);
            $("#Province_Add span").text("选择省份");
            DropdownInit();
            //绑定配置、标签
            var JSON_EXTED = data['exted'];
            for (var i = 0; i < JSON_EXTED.length; i++)//绑定配置、标签信息
            {
                var TEMP_HTML = "";
                for (var j = 0; j < JSON_EXTED[i].Value.length; j++) {
                    TEMP_HTML += "<li data-value=\"" + JSON_EXTED[i].Value[j].Key + "\">" + JSON_EXTED[i].Value[j].Value + "</li>";
                }
                TEMP_HTML += "<div class=\"clear\"></div>";
                $("#" + JSON_EXTED[i].Key + "_Add>ul").html(TEMP_HTML);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

//绑定城市信息
PropertyPage.prototype.ajaxRequestCityBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/building/city",
        data: params,
        dataType: "JSON",
        success: function (data) {
            var TEMP_HTML = "";
            var JSON_DATA = data['data'];
            for (var i = 0; i < JSON_DATA.length; i++) {
                TEMP_HTML += "<li data-value=\"" + JSON_DATA[i]['Key'] + "\" >" + JSON_DATA[i]['Name'] + "</li>";
            }
            $("#City_Add ul").html(TEMP_HTML);
            $("#City_Add span").text("选择城市");

            $("#District_Add ul").html("");
            $("#District_Add span").text("选择区域");
            DropdownInit();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

//绑定区域信息
PropertyPage.prototype.ajaxRequestDistrictBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/building/district",
        data: params,
        dataType: "JSON",
        success: function (data) {
            var TEMP_HTML = "";
            var JSON_DATA = data['data'];
            for (var i = 0; i < JSON_DATA.length; i++) {
                TEMP_HTML += "<li data-value=\"" + JSON_DATA[i].Key + "\">" + JSON_DATA[i].Name + "</li>";
            }
            $("#District_Add ul").html(TEMP_HTML);
            $("#District_Add span").text("选择区域");
            DropdownInit();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

// 编辑城市信息
PropertyPage.prototype.ajaxRequestUptCityBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/building/city",
        data: params,
        dataType: "JSON",
        success: function (data) {
            var TEMP_HTML = "";
            var JSON_DATA = data['data'];
            for (var i = 0; i < JSON_DATA.length; i++) {
                TEMP_HTML += "<li data-value=\"" + JSON_DATA[i].Key + "\" >" + JSON_DATA[i].Name + "</li>";
            }
            $("#City_Edit ul").html(TEMP_HTML);
            $("#City_Edit span").text("选择城市");

            $("#District_Edit ul").html("");
            $("#District_Edit span").text("选择区域");
            DropdownInit();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

// 编辑区域信息
PropertyPage.prototype.ajaxRequestDistrictUptBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/building/district",
        data: params,
        dataType: "JSON",
        success: function (data) {
            var TEMP_HTML = "";
            var JSON_DATA = data['data'];
            for (var i = 0; i < JSON_DATA.length; i++) {
                TEMP_HTML += "<li data-value=\"" + JSON_DATA[i]['Key'] + "\">" + JSON_DATA[i]['Name'] + "</li>";
            }
            $("#District_Edit ul").html(TEMP_HTML);
            $("#District_Edit span").text("选择区域");
            DropdownInit();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

// 物业新增保存
PropertyPage.prototype.ajaxRequestBuildingAddSave = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/add",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                _this.ajaxRequestBuildings(_this.getParams(_this.BUILDINGS));
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                baocun();
                // 物业新增初始化
                $("#BuildingName_Add1").val("");
                $("#Province_Add>span").html("选择省份");
                $("#City_Add>span").html("选择城市");
                $("#District_Add>span").html("选择区域");
                $("#BuildingAddr_Add").val("");
                $("#FloorNum").val("");
                $("#HouseNum").val("");
                $("#water_price").val("");
                $("#ele_price").val("");
                $(".tag-ul>li").removeClass("tagli-sel");


            } else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }

        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

//物业编辑基础页面获取
PropertyPage.prototype.ajaxRequestBuildingUpdateBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/building/Update",
        data: params,
        dataType: "JSON",
        success: function (data) {
            //绑定基础信息
            var TEMP_HTML = "";
            var TEMP_DATA = data['exted'];
            var JSON_DATA = data['data'];
            $("#BuildingName_Edit").val(JSON_DATA['building']['Name']);
            $("#BuildingAddr_Edit").val(JSON_DATA['building']['Address']);
            $("#water_price_edit").val(JSON_DATA['building']['WaterUnitPrice']);
            $("#ele_price_edit").val(JSON_DATA['building']['EleUnitPrice']);
            //绑定标签

            //绑定配置、标签
            // var JSON_EXTED = data['exted'];
            // for (var i = 0; i < JSON_EXTED.length; i++)//绑定配置、标签信息
            // {
            //     var TEMP_HTML = "";
            //     for (var j = 0; j < JSON_EXTED[i].Value.length; j++) {
            //         TEMP_HTML += "<li data-value=\"" + JSON_EXTED[i].Value[j].Key + "\">" + JSON_EXTED[i].Value[j].Value + "</li>";
            //     }
            //     TEMP_HTML += "<div class=\"clear\"></div>";
            //     $("#" + JSON_EXTED[i].Key + "_Add>ul").html(TEMP_HTML);
            // }
            for (var i = 0; i < TEMP_DATA.length; i++)//绑定配置、标签信息
            {
                var TEMP_HTML = "";
                for (var j = 0; j < TEMP_DATA[i]['Value'].length; j++) {
                    TEMP_HTML += "<li data-value=\"" + TEMP_DATA[i]['Value'][j]['Key'] + "\">" + TEMP_DATA[i]['Value'][j]['Value'] + "</li>";
                }
                TEMP_HTML += "<div class=\"clear\"></div>";
                $("#" + TEMP_DATA[i]['Key'] + "_Update>ul").html(TEMP_HTML);
            }

            var allocs = JSON_DATA['building']['Alloc'] ? JSON_DATA['building']['Alloc'].split('|') : "";
            for (var i = 0; i < allocs.length; i++) {
                $("#BuildingAlloc_Update li[data-value='" + allocs[i] + "']").addClass("tagli-sel");
            }


            var tags = JSON_DATA['building']['Tag'] ? JSON_DATA['building']['Tag'].split('|') : "";
            for (var i = 0; i < tags.length; i++) {
                $("#BuildingTag_Update li[data-value='" + tags[i] + "']").addClass("tagli-sel");
            }
            //绑定下拉信息
            var TEMP_HTML = "";
            for (var i = 0; i < JSON_DATA['provinces'].length; i++) {
                TEMP_HTML += "<li data-value=\"" + JSON_DATA['provinces'][i]['Key'] + "\" >" + JSON_DATA['provinces'][i]['Name'] + "</li>";
            }
            $("#Province_Edit ul").html(TEMP_HTML);
            $("#Province_Edit li[data-value='" + JSON_DATA['building']['ProvinceCharId'] + "']").addClass("cur");
            $("#Province_Edit span").text($("#Province_Edit li[class='cur']").text());

            TEMP_HTML = "";
            for (var i = 0; i < JSON_DATA['citys'].length; i++) {
                TEMP_HTML += "<li data-value=\"" + JSON_DATA['citys'][i]['Key'] + "\" >" + JSON_DATA['citys'][i]['Name'] + "</li>";
            }
            $("#City_Edit ul").html(TEMP_HTML);
            $("#City_Edit li[data-value='" + JSON_DATA['building']['CityCharId'] + "']").addClass("cur");
            $("#City_Edit span").text($("#City_Edit li[class='cur']").text());

            TEMP_HTML = "";
            for (var i = 0; i < JSON_DATA['districts'].length; i++) {
                TEMP_HTML += "<li data-value=\"" + JSON_DATA['districts'][i]['Key'] + "\" >" + JSON_DATA['districts'][i]['Name'] + "</li>";
            }
            $("#District_Edit ul").html(TEMP_HTML);
            $("#District_Edit li[data-value='" + JSON_DATA['building']['DistrictCharId'] + "']").addClass("cur");
            $("#District_Edit span").text($("#District_Edit li[class='cur']").text());

            DropdownInit();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

//物业编辑保存
PropertyPage.prototype.ajaxRequestBuildingUpdateSave = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/update",
        data: params,
        dataType: "JSON",
        success: function (data) {
            $("#Buildings dd[class='cur']>span").html($("#BuildingName_Edit").val() + "（<font>" + $("#Buildings dd[class='cur']>span>font").text() + "</font>）");
            // Rooms();
            _this.ajaxRequestRooms(_this.getParams(_this.ROOMS));
            messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            baocun();
            _this.ajaxRequestBuildingDetail(_this.getParams(_this.BUILDINGDETAIL));
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}

// 物业明细
PropertyPage.prototype.ajaxRequestBuildingDetail = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + "/building",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data.data;
                var TEMP_DATA=data.exted;
                $("#Name_Detail").text(JSON_DATA['Name']);
                $("#BuildingAddr_Detail").text(JSON_DATA['Address']);
                $("#FloorNum_Detail").text(TEMP_DATA['RoomNum'] + "间（共" + TEMP_DATA['FloorNum'] + "层）");
                $("#Alloc_Detail").text(JSON_DATA['Alloc']);
                $("#Tag_Detail").text(JSON_DATA['Tag']);
                $("#water_price_Detail").text(JSON_DATA['WaterUnitPrice']);
                $("#ele_price_Detail").text(JSON_DATA['EleUnitPrice']);
                $("#BuildingCharId").val(_this.PROPERTYDETAIL_CHARID);
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

// 物业删除
PropertyPage.prototype.ajaxRequestBuildingDel = function (params) {
    $.ajax({
        type: "POST",
        url: host + "/building/delete",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                location.reload();
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

// 楼层编辑保存
PropertyPage.prototype.ajaxRequestFloorUpdate = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/floor/update",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                // Floors();
                _this.ajaxRequestFloors(_this.getParams(_this.FLOORS));
                // Rooms();
                _this.ajaxRequestRooms(_this.getParams(_this.ROOMS));
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                baocun();
            }
            else {
                messageBox.show("警告", data.msg, MessageBoxButtons.OK, MessageBoxIcons.warning);
            }

        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

// 楼层删除
PropertyPage.prototype.ajaxRequestFloorDelete = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/floor/delete",
        data: params,
        dataType: "JSON",
        success: function (data) {
            _this.ajaxRequestFloors(_this.getParams(_this.FLOORS));
            _this.ajaxRequestRooms(_this.getParams(_this.ROOMS));
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            baocun();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

// 房间详情
PropertyPage.prototype.ajaxRequestRoomDetail = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + "/building/room",
        data: params,
        dataType: "JSON",
        success: function (data) {
            var JSON_DATA = data.data;
            if (JSON_DATA['State'] != "已租") {
                $("#btn-let").show();
                $("#RoomState_Detail").text(JSON_DATA.State + "（" + JSON_DATA.DateDiff + "天）");
            }
            else {
                $("#btn-order").hide();
                $("#btn-let").hide();
                $("#RoomState_Detail").text(JSON_DATA.State);
            }
            //绑定基础信息
            $("#RoomTitle").text(JSON_DATA.BuildingName + "    " + JSON_DATA.FloorName + "  楼  " + JSON_DATA.RoomName + "  室");
            $("#Price_Detail").text(JSON_DATA.Price + "元/月");
            $("#Square_Detail").text(JSON_DATA.Square + "㎡");
            $("#Layout_Detail").text(JSON_DATA.Div1 + "室" + JSON_DATA.Div2 + "厅" + JSON_DATA.Div3 + "卫" + JSON_DATA.Div4 + "阳台");
            $("#RoomAlloc_Detail").text(JSON_DATA.Alloc);
            $("#RoomTag_Detail").text(JSON_DATA.Tag);
            $("#CurRoomCharId").val(_this.RoomDetail_CHARID);
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

// 房间新增
PropertyPage.prototype.ajaxRequestRoomAdd = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/room/add",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                // _this.ajaxRequestRooms(_this.getParams(_this.ROOMS));
                propertyPage.ajaxRequestRooms(propertyPage.getParams(propertyPage.ROOMS));
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

//房间编辑页面获取
PropertyPage.prototype.ajaxRequestRoomUpdateDetail = function (params) {
    $(this).css("opcity", 0);
    $.ajax({
        type: "GET",
        url: host + "/building/room/update",
        data: params,
        dataType: "JSON",
        success: function (data) {
            var TEMP_HTML = "";
            var TEMP_DATA = data['exted'];
            for (var i = 0; i < TEMP_DATA.length; i++)//绑定配置、标签信息
            {
                TEMP_HTML = ""
                for (var j = 0; j < TEMP_DATA[i].Value.length; j++) {
                    TEMP_HTML += "<li data-value=\"" + TEMP_DATA[i].Value[j].Key + "\">" + TEMP_DATA[i].Value[j].Value + "</li>";
                }
                TEMP_HTML += "<div class=\"clear\"></div>";
                $("#" + TEMP_DATA[i].Key + "_Update>ul").html(TEMP_HTML);
            }
            var JSON_DATA = data['data'];
            $("#RoomName_Update").val(JSON_DATA.RoomName);
            $("#Price_Update").val(JSON_DATA.Price);
            $("#Square_Update").val(JSON_DATA.Square);
            $("#Div1").val(JSON_DATA.Div1);
            $("#Div2").val(JSON_DATA.Div2);
            $("#Div3").val(JSON_DATA.Div3);
            $("#AtFloor").text(JSON_DATA.BuildingName + "  " + JSON_DATA.FloorName + "层");

            var allocs = JSON_DATA.Alloc.split('|');
            for (var i = 0; i < allocs.length; i++) {
                $("#RoomAlloc_Update li[data-value='" + allocs[i] + "']").addClass("tagli-sel");
            }

            var tags = JSON_DATA.Tag.split('|');
            for (var i = 0; i < tags.length; i++) {
                $("#RoomTag_Update li[data-value='" + tags[i] + "']").addClass("tagli-sel");
            }

        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

// 房间信息保存
PropertyPage.prototype.ajaxRequestRoomUpdate = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/room/update",
        data: params,
        dataType: "JSON",
        success: function (data) {
            // RoomDetail($("#CurRoomCharId").val());
            _this.ajaxRequestRoomDetail(_this.getParams(_this.ROOM_DETAIL));
            // Rooms();
            _this.ajaxRequestRooms(_this.getParams(_this.ROOMS));
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            baocun();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//房间签约基础信息获取
PropertyPage.prototype.ajaxRequestContractAddBind = function (params) {
    $('#CustomerName_Add').html('');
    $('#ContractPhone_Add').val('');
    $('#CardID_Add').val('');
    $.ajax({
        type: "GET",
        url: host + "/contract/add",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = "";
                var JSON_DATA = data['data'];
                $("#BuildingName_Add").text(JSON_DATA.Room.BuildingName + JSON_DATA.Room.FloorName + " 楼 " + JSON_DATA.Room.RoomName + "室");
                $("#Square_Add").text(JSON_DATA.Room.Square + "㎡");
                $("#Layout_Add").text(JSON_DATA.Room.Div1 + "室" + JSON_DATA.Room.Div2 + "厅" + JSON_DATA.Room.Div3 + "卫");
                $("#ContractNumber_Add").val(JSON_DATA.ContractNum);
                for (var i = 0; i < JSON_DATA.PayType.length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    TEMP_HTML += "<li data-value=\"" + JSON_DATA.PayType[i].Key + "\" class='" + style + "'>" + JSON_DATA.PayType[i].Value + "</li>";
                }
                $("#PayType ul").html(TEMP_HTML);
                $("#PayType span").text($("#PayType li[class='cur']").text());

                TEMP_HTML = "";
                TEMP_HTML += "<li data-value=\"\" class=\"cur\">不选</li>";
                for (var j = 0; j < JSON_DATA.Dpts.length; j++) {
                    TEMP_HTML += "<li  data-value=\"" + JSON_DATA.Dpts[j].CharId + "\"  class=\"fq-menu\"><b class=\"icon icon-right-triangle\"></b><span>" + JSON_DATA.Dpts[j].Name + "</span>";
                    for (var k = 0; k < JSON_DATA.Dpts[j].ChildDpts.length; k++) {
                        if (k == 0) {
                            TEMP_HTML += "<ul>";
                        }
                        TEMP_HTML += "<li id=\"" + JSON_DATA.Dpts[j].ChildDpts[k].CharId + "\"   data-value=\"" + JSON_DATA.Dpts[j].ChildDpts[k].CharId + "\" class='menuChildren'><span>" + JSON_DATA.Dpts[j].ChildDpts[k].Name + "</span></li>";
                        if (k == JSON_DATA.Dpts[j].ChildDpts.length - 1) {
                            TEMP_HTML += "</ul>";
                        }
                    }
                    TEMP_HTML += "</li>";
                }
                $("#Dpts_Add>ul").html(TEMP_HTML);
                $("#Dpts_Add>span").text($("#Dpts_Add>ul>li[class=\"cur\"]").text());
                DropdownInit();
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }

    });
}

// 房间签约(合同新增[保存])
PropertyPage.prototype.ajaxRequestContractAdd = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/contract/add",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                // Rooms();
                _this.ajaxRequestRooms(_this.getParams(_this.ROOMS));
                // RoomDetail($("#CurRoomCharId").val());
                _this.ajaxRequestRoomDetail(_this.getParams(_this.ROOM_DETAIL));
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
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

// 房间删除
PropertyPage.prototype.ajaxRequestRoomDelete = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/room/delete",
        data: params,
        dataType: "JSON",
        success: function (data) {
            // Rooms();
            _this.ajaxRequestRooms(_this.getParams(_this.ROOMS));
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            baocun();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

// 维修分页初始化
PropertyPage.prototype.ajaxRequestServicePageInit = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + "/building/servicerecords",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                //清空分页控件
                $(".fy-wrap-service").html("");
                //绑定分页控件
                var pageinit = new fyfoo2(pageSize, data.exted.totalNum, function (num) {
                    _this.serviceRecords(num);
                }, $(".fy-wrap-service"));
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

//维修记录列表
PropertyPage.prototype.ajaxRequestServiceRecords = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/building/servicerecords",
        data: params,
        dataType: "JSON",
        success: function (data) {
            //绑定列表
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<tr>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].ServiceValue + "</td>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].Price + "</td>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].Object + "</td>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].CreateTime + "</td>";
                    if (webApp.grantControl($(".servicerecord_del"), "servicerecord_delete")) {
                        // TEMP_HTML += "<td><span onclick=\"ServiceDelete('" + JSON_DATA[i].CharId + "')\" class='servicerecord_del'>删除</span></td>";
                        TEMP_HTML += "<td><span data-ServiceDelete='" + JSON_DATA[i].CharId + "'  class='servicerecord_del serviceDelete' onclick='propertyPage.serviceDelete()'>删除</span></td>";
                    }
                    TEMP_HTML += "</tr>";
                }
                $("#ServiceRecords tr:first").nextAll().remove();
                $("#ServiceRecords").append(TEMP_HTML);
            }
            else {
                messageBox.show("提示", JSON_DATA['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//维修新增基础信息获取
PropertyPage.prototype.ajaxRequestServiceAddBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/building/servicerecord/add",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                //1、维修类别下拉列表
                var TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA.ServiceItem.length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    TEMP_HTML += "<li data-value=\"" + JSON_DATA.ServiceItem[i].Key + "\" class='" + style + "'>" + JSON_DATA.ServiceItem[i].Value + "</li>";
                }
                $("#ServiceItem ul").html(TEMP_HTML);
                $("#ServiceItem span").text($("#ServiceItem li[class='cur']").text());
                //2、承担对象下拉列表
                TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA.ServiceObject.length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    TEMP_HTML += "<li data-value=\"" + JSON_DATA.ServiceObject[i].Key + "\" class='" + style + "'>" + JSON_DATA.ServiceObject[i].Value + "</li>";
                }
                $("#ServiceObject ul").html(TEMP_HTML);
                $("#ServiceObject span").text($("#ServiceObject li[class='cur']").text());
                DropdownInit();

                // 维修列表初始化
                $("#ServicePrice").val("");
                $("#ServiceDescription").val("");
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

//维修新增[保存]
PropertyPage.prototype.ajaxRequestServiceAdd = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/servicerecord/add",
        data: params,
        dataType: "JSON",
        success: function (data) {
            _this.serviceInit();
            baocun();
            messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

// 维修删除
PropertyPage.prototype.ajaxRequestServiceDelete = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/servicerecord/delete",
        data: params,
        dataType: "JSON",
        success: function (data) {
            _this.serviceInit();
            messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//合同详情
PropertyPage.prototype.ajaxRequestContract = function (params) {
    this.historyContractPageInit();
    $("#hascontract").hide();
    $.ajax({
        type: "GET",
        url: host + "/building/room/state",
        data: params,
        dataType: "JSON",
        success: function (data) {
            //绑定明细页面
            if (data['succ']) {
                var JSON_DATA = data['data'];
                if (JSON_DATA.RoomState != 3) {
                    $("#nocontract").show();
                    $("#hascontract").hide();
                }
                else {
                    $("#CustomerName_Detail").text(JSON_DATA.CustomerName);
                    $("#Phone_Detail").text(JSON_DATA.Phone);
                    $("#CardId_Detail").text(JSON_DATA.CardID);
                    $("#BuildingName_Detail").text(JSON_DATA.BuildingName + JSON_DATA.FloorName + "层");
                    $("#RoomName_Detail").text(JSON_DATA.RoomName + "室");
                    $("#Number_Detail").text(JSON_DATA.Number);
                    $("#State_Detail1").text(JSON_DATA.ContractState);
                    $("#Price_Detail1").text(JSON_DATA.Price + "元/月");
                    $("#Deposit_Detail").text(JSON_DATA.Deposit + "元/月");
                    $("#RentDate_Detail").text(JSON_DATA.InDate + "~" + JSON_DATA.OutDate);
                    $("#PayType_Detail").text(JSON_DATA.PayType1);
                    $("#ReceiveDate").text();
                    $("#EmpName_Detail").text(JSON_DATA.DepartmentName + "." + JSON_DATA.EmployeeName);
                    $("#BargainDate_Detail").text(JSON_DATA.BargainDate);
                    $("#Description_Detail").text(JSON_DATA.Description);
                    $("#CreateEmpName_Detail").text(JSON_DATA.CreateTime);
                    $("#CurContractCharId").val($("#CurRoomCharId").val());
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

// 历史合同列表分页初始化
PropertyPage.prototype.ajaxRequestHistoryContractInit = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + "/contract/historycontracts",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                //清空分页控件history-fy-wrap
                $(".history-fy-wrap").html("");
                //绑定分页控件
                var pageinit = new fyfoo2(5, data.exted.totalNum, function (num) {
                    _this.historyContractRecords(num);
                }, $(".history-fy-wrap"));
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

// 历史合同列表分页
PropertyPage.prototype.ajaxRequestHistoryContractRecords = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/contract/historycontracts",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<tr>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].CustomerName + "</td>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].InDate + "-" + JSON_DATA[i].OutDate + "</td>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].Price + "</td>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].EndDate + "</td>";
                    // TEMP_HTML += "<td><span onclick=\"HistoryLook('" + JSON_DATA[i].CharId + "')\">查看</span></td>";
                    TEMP_HTML += "<td><span data-history='" + JSON_DATA[i].CharId + "' class='historyLook' onclick='propertyPage.historyLooks()'>查看</span></td>";
                    TEMP_HTML += "</tr>";
                }
                $("#HistoryContractRecords tr:first").nextAll().remove();
                $("#HistoryContractRecords").append(TEMP_HTML);
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

//水抄表记录分页初始化
PropertyPage.prototype.ajaxRequestWaterPageInit = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + "/building/readrecords",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                //清空分页控件
                $(".fy-wrap-water").html("");
                //绑定分页控件
                var pageinit = new fyfoo2(pageSize_Reocrd, data.exted.totalNum, function (num) {
                    _this.waterRecords(num);
                }, $(".fy-wrap-water"));
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

//水抄表记录列表
PropertyPage.prototype.ajaxRequestWaterRecords = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/building/readrecords",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<tr>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].RecordDate + "</td>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].Mark + "</td>";
                    if (webApp.grantControl($(".readDelete_del"), "readrecord_delete")) {
                        TEMP_HTML += "<td><span data-read-delete='" + JSON_DATA[i].CharId + "' class='readDelete_del readDelete'  onclick='propertyPage.readDelete()'>删除</span></td>";
                    }
                    TEMP_HTML += "</tr>";
                }
                $("#WaterRecords tr:first").nextAll().remove();
                $("#WaterRecords").append(TEMP_HTML);
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

//电抄表记录分页初始化
PropertyPage.prototype.ajaxRequestElecPageInit = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + "/building/readrecords",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                //清空分页控件
                $(".fy-wrap-elec").html("");
                //绑定分页控件
                var pageinit = new fyfoo2(pageSize_Reocrd, data.exted.totalNum, function (num) {
                    _this.elecRecords(num);
                }, $(".fy-wrap-elec"));
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

// 电抄表记录列表
PropertyPage.prototype.ajaxRequestElecRecords = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/building/readrecords",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<tr>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].RecordDate + "</td>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].Mark + "</td>";
                    TEMP_HTML += "<td><span data-read-delete='" + JSON_DATA[i].CharId + "' class='readDelete_del readDelete'  onclick='propertyPage.readDelete()'>删除</span></td>";
                    TEMP_HTML += "</tr>";
                }
                $("#ElecRecords tr:first").nextAll().remove();
                $("#ElecRecords").append(TEMP_HTML);
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

// 抄表记录新增基础信息获取
PropertyPage.prototype.ajaxRequestReadAddItem = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/building/readrecord/add",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var TEMP_HTML = "";
                var JSON_DATA = data['data'];
                for (var i = 0; i < JSON_DATA.length; i++) {
                    var style = i == 0 ? "cur" : "";
                    TEMP_HTML += "<li class=\"" + style + "\" data-value=\"" + JSON_DATA[i].Key + "\">" + JSON_DATA[i].Value + "<li>";
                }
                $("#ReadItem ul").html(TEMP_HTML);
                $("#ReadItem span").text($("#ReadItem li[class='cur']").text());
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

//抄表新增[保存]
PropertyPage.prototype.ajaxRequestReadAdd = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/readrecord/add",
        data: params,
        dataType: "JSON",
        success: function (data) {
            _this.readInit();
            messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            baocun();
            // 初始化
            $("#RecordDate").val("");
            $("#Mark").val("");
            $("#RecordDescription").val("");
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

// 抄表删除
PropertyPage.prototype.ajaxRequestReadDelete = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + "/building/readrecord/delete",
        data: params,
        dataType: "JSON",
        success: function (data) {
            _this.readInit();
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}

//绑定员工下拉列表
PropertyPage.prototype.ajaxRequestEmployeeBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + "/employee/employees",
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_HTML = "";
                TEMP_HTML += "<li value=\"\" class=\"cur\">不选</li>";
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<li data-value=\"" + JSON_DATA[i].CharId + "\" >" + JSON_DATA[i].Name + "</li>";
                }
                $("#Emps_Add > ul").html(TEMP_HTML);
                $("#Emps_Add > span").text($("#Emps_Add>ul>li[class='cur']").text());
                DropdownInit();
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

var propertyPage = new PropertyPage();
