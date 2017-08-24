//移除本地缓存
localStorage.removeItem("isAlert");
var pageSize = 10;

//延迟加载
setTimeout(function () {
    panel_tab5($('.btn-contractcheck,.btn-backrental,.btn-billadd,.btn-contractedit'), $('.modal-mask,.btn-cancel'), $('.alert-modal-wraper'));
}, 3000)
/**
 * 构造函数
 * Author:LiYong
 * Date:2017-07-20
 * @constructor
 */
function ContractPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.CTN = arguments['CTN'] ? arguments['CTN'] : 'CTN';
    this.CPI = arguments['CPI'] ? arguments['CPI'] : 'CPI';
    this.CIT = arguments['CIT'] ? arguments['CIT'] : 'CIT';
    this.CTT = arguments['CTT'] ? arguments['CTT'] : 'CTT';
    this.CUB = arguments['CUB'] ? arguments['CUB'] : 'CUB';
    this.CSE = arguments['CSE'] ? arguments['CSE'] : 'CSE';
    this.CAN = arguments['CAN'] ? arguments['CAN'] : 'CAN';
    this.EBD = arguments['EBD'] ? arguments['EBD'] : 'EBD';
    this.ESE = arguments['ESE'] ? arguments['ESE'] : 'ESE';
    this.BPI = arguments['BPI'] ? arguments['BPI'] : 'BPI';
    this.BLS = arguments['BLS'] ? arguments['BLS'] : 'BLS';
    this.BDE = arguments['BDE'] ? arguments['BDE'] : 'BDE';
    this.BBD = arguments['BBD'] ? arguments['BBD'] : 'BBD';
    this.BAD = arguments['BAD'] ? arguments['BAD'] : 'BAD';
    this.ELB = arguments['ELB'] ? arguments['ELB'] : 'ELB';
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        QUERY: '/contract/condition',
        PAGE_INIT: '/contract/contracts',
        CONTRACTS_LIST: '/contract/contracts',
        CONTRACT: '/contract',
        CONTRACT_BIND: '/contract/update',
        CONTRACT_SAVE: '/contract/update',
        CONTRACT_ABANDON: '/contract/abandon',
        END_BIND: '/contract/end',
        END_SAVE: '/contract/end',
        BILL_INIT: '/bill/bills/contract',
        BILL_LIST: '/bill/bills/contract',
        BILL_DEL: '/bill/delete',
        BILL_BIND: '/bill/add',
        BILL_ADD_SAVE: '/bill/add',
        EMPLOYEE_BIND:'/employee/employees'


    }
    this.init();
}

/**
 *初始化函数
 * Author:LiYong
 * Date:2017-07-20
 * @returns {ContractPage}
 */
ContractPage.prototype.init = function () {
    this.contractList();
    // this.contractEdit();
    this.contractSave();
    this.openDialog();
    this.employeeCheck();
    this.billDelete();
    this.sundrySwitch();
    this.sum();


    App.init();
    ComponentsPickers.init();

    var params = this.getParams(this.CTN);
    this.ajaxRequestCondition(params);

    params = this.getParams(this.CPI);
    this.ajaxRequestContractPageInit(params);
    return this;
}


/**
 * 参数
 * Author:LiYong
 * Date:2017-07-20
 * @param name
 * @returns {*}
 */
ContractPage.prototype.getParams = function (name) {
    var params = null;
    switch (name) {
        case this.CTN:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.CPI:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                // 当前页码
                pageIndex: 1,
                // 一页显示条数
                pageSize: 1,
                // 物业
                buildingCharId: $("#Buildings li[class='cur']").length > 0 ? $("#Buildings li[class='cur']").attr("data-value") : "",
                buildingRoomCharId: "",
                // 状态
                state: $("#ContractState li[class='cur']").length > 0 ? parseInt($("#ContractState li[class='cur']").attr("data-value")) : 3,
                // 日期类型
                dateType: $("#DateType li[class='cur']").length > 0 ? parseInt($("#DateType li[class='cur']").attr("data-value")) : -1,
                // 开始时间
                startDate: $("#StartDate").val(),
                // 结束时间
                endDate: $("#EndDate").val(),
                // 关键字
                key: $("#Key").val()
            };
            break;
        case this.CIT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                //页目录  当前页码
                pageIndex: this.CLP,
                // 页尺寸
                pageSize: pageSize,
                // 物业
                buildingCharId: $("#Buildings li[class='cur']").length > 0 ? $("#Buildings li[class='cur']").attr("data-value") : "",
                buildingRoomCharId: "",//物业模块合同列表用到该参数,此处不需要传
                // 状态
                state: $("#ContractState li[class='cur']").length > 0 ? parseInt($("#ContractState li[class='cur']").attr("data-value")) : 3,
                // 日期
                dateType: $("#DateType li[class='cur']").length > 0 ? parseInt($("#DateType li[class='cur']").attr("data-value")) : -1,
                // 开始日期
                startDate: $("#StartDate").val(),
                // 结束日期
                endDate: $("#EndDate").val(),
                // 关键字
                key: $("#Key").val()
            };
            break;
        case this.CTT:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: this.CDC
            };
            break;
        case this.CUB:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#CurContractCharId").val()
            }
            break;
        case this.CSE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#CurContractCharId").val(),
                customerCharId: '0BAA95CC-F221-4707-B561-80AD7065ABA6',//不作修改
                price: parseFloat($("#Price_Update").val()),
                deposit: parseFloat($("#Deposit_Update").val()),
                payType: parseInt($("#PayType li[class='cur']").val()),
                inDate: $("#InDate_Update").val(),
                outDate: $("#OutDate_Update").val(),
                total: parseInt($("#Total_Update").val()),
                bargainDate: $("#BargainDate_Update").val(),
                ownerDepartmentCharId: $("#Dpts li.cur").attr("data-value"),
                ownerEmployeeCharId: $("#Emps li.cur").attr("data-value"),
                description: $("#Description_Update").val()
            };
            break;
        case this.CAN:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                charId: $("#CurContractCharId").val()
            };
            break;
        case this.EBD:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                contractCharId: $("#CurContractCharId").val()
            }
            break;
        case this.ESE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                contractCharId: $("#CurContractCharId").val(),
                contractType: $("#EndContractType li[class='cur']").attr("data-value"),
                costItems: JSON.stringify(this.EAR),
                costPrice: $("#CostPrice").text(),
                description: $("#Description_End").val(),
                endDate: $("#ContractEndDate").val()
            };
            break;
        case this.BPI:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                pageIndex: 1,
                pageSize: pageSize,
                contractCharId: $("#CurContractCharId").val()
            }
            break;
        case this.BLS:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                pageIndex: this.BLT,
                pageSize: pageSize,
                contractCharId: $("#CurContractCharId").val()
            };
            break;
        case this.BDE:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                billCharId: this.BDC
            }
            break;
        case this.BBD:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;
        case this.BAD:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                contractCharId: $("#CurContractCharId").val(),
                costCharId: $("#CostItems li[class='cur']").attr("data-value"),
                type: $("#BillTypes li[class='cur']").attr("data-value"),
                payDate1: $("#PayDate1_Add").val(),
                payDate2: $("#PayDate2_Add").val(),
                payDate3: $("#PayDate3_Add").val(),
                costPrice: $("#CostPrice_Add").val(),
                description: $("#Description_Add").val()
            };
            break;
        case this.ELB:
            params = {
                requestKey: localStorage.getItem("requestKey"),
                departmentCharId: $("#Dpts li.cur").attr("data-value")
            };
            break;
    }
    ;
    return params;
}

/**
 * 合同列表
 * Author:LiYong
 * Date:2017-07-20
 * @returns {ContractPage}
 */
ContractPage.prototype.contractList = function () {
    this.CLP = arguments.length != 0 ? arguments[0] : 1;
    var params = this.getParams(this.CIT);
    this.ajaxRequestContractsList(params);
    return this;
}

/**
 * 合同编辑
 * Author:LiYong
 * Date:2017-07-20
 * @returns {ContractPage}
 */
// ContractPage.prototype.contractEdit = function () {
//     var _this = this;
//     $(".btn-contractedit").on("click", function () {
//         var params = _this.getParams(_this.CUB);
//         _this.ajaxRequestContractBind(params);
//     })
//     return this;
// }

/**
 * 合同保存
 * Author:LiYong
 * Date:2017-07-20
 * @returns {ContractPage}
 */
ContractPage.prototype.contractSave = function () {
    var _this = this;
    $(".contractSave").click(function () {
        var params = _this.getParams(_this.CSE);
        _this.ajaxRequestContractSave(params);
    });
    return this;
}


/**
 *  合同作废
 *  Author:LiYong
 * Date:2017-07-20
 * @returns {ContractPage}
 */
ContractPage.prototype.contractAbandon = function () {
    var _this = this;
    var params = this.getParams(this.CAN);
    messageBox.show("确认", "确定作废合同？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
    messageBox.confirm(function () {
        _this.ajaxRequestContractAbandon(params);
    })
    return this;
}

/**
 *  退租保存
 *  Author:LiYong
 * Date:2017-07-20
 * @returns {ContractPage}
 */
ContractPage.prototype.endSave = function () {
    var _this = this;
    var arr = new Array();
    $(".ul-y1-v>li").each(function () {
        if ($(this).css("display") != "none") {
            var obj = {
                costCharId: $(this).children("p").attr("data-value"),
                costItemPrice: $(this).find("input:first").val(),
                type: $(this).find("li[class='cur']").attr("data-value")
            };
            arr.push(obj);
        }
    });

    $("#CostItemText").on("blur", "input", function () {
        if (regular.MONEY_REG_EXP.test($(this).val())) {
            flag = false;
        } else {
            flag = true;
        }
        if (flag == true) {
            messageBox.show("提示", "请输入正确金额！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
        }
    });
    _this.EAR = arr;
    var params = _this.getParams(_this.ESE);
    _this.ajaxRequestEndSave(params);
    return this;
}

/**
 *  账单列表
 *  Author:LiYong
 * Date:2017-07-21
 * @returns {ContractPage}
 */
ContractPage.prototype.billList = function () {
    this.BLT = arguments.length != 0 ? arguments[0] : 1;
    var params = this.getParams(this.BLS);
    this.ajaxRequestBillList(params);
    return this;
}
/**
 *  账单删除
 *  Author:LiYong
 * Date:2017-07-21
 * @returns {ContractPage}
 */

ContractPage.prototype.billDelete = function () {
    var _this = this;
    $("#Bills").on("click", ".billDel", function () {
        _this.BDC = $(this).attr("data-value").trim();
        var params = _this.getParams(_this.BDE);
        messageBox.show("确认", "确定删除账单？", MessageBoxButtons.OKCANCEL, MessageBoxIcons.question);
        messageBox.confirm(function () {
            _this.ajaxRequestBillDelete(params);
        });
    });
    return this;
}

/**
 * BEGIN 账单列表初始化
 * Author:LiYong
 * Date:2017-07-21
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.billInit = function () {
    // 账单单笔新增
    webApp.grantControl($(".modal-needdv"), "bill_add");
    var params = this.getParams(this.BPI);
    this.ajaxRequestBillPageInit(params);
    this.billList();
    return this;
}


/**
 * BEGIN 账单新增参数
 * Author:LiYong
 * Date:2017-07-21
 * @returns {params}
 */
ContractPage.prototype.billAddParams = function () {
    var params = {
        PO_VAL: $("#PayDate1_Add").val().trim(),
        PT_VAL: $("#PayDate2_Add").val().trim(),
        PS_VAL: $("#PayDate3_Add").val().trim(),
        CP_VAL: $("#CostPrice_Add").val().trim()
    };
    return params;
}


/**
 * 账单新增保存
 * Author:LiYong
 * Date:2017-07-21
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.billAdd = function () {
    var _this = this;
    var contractMessage = "";
    var result = false;
    var params = cp.billAddParams();
    if (params['PO_VAL'] == "" || params['PT_VAL'] == "") {
        contractMessage = "请输入账单周期";
    } else if (regular.check(regular.MONEY_REG_EXP, params['CP_VAL'])) {
        contractMessage = "金额输入不正确";
    } else if (params['PS_VAL'] == "") {
        contractMessage = "请输入应支付日";
    } else {
        result = true;
    }
    if (result) {
        var params = _this.getParams(_this.BAD);
        _this.ajaxRequestBillAdd(params);
    } else {
        messageBox.show('提示', contractMessage, MessageBoxButtons.OK, MessageBoxIcons.infomation);
    }
    return this;
}


/**
 * 杂费切换
 * Author:liyong
 * Date:2017-7-24
 * @returns {ContractPage}
 */
ContractPage.prototype.sundrySwitch = function () {
    $('.ul-y1').on('click', 'li', function () {
        $(this).toggleClass('sel');
        var index = $(this).index();
        $(this).parents('.dv-sec').find('.ul-y1-v>li').eq(index).toggle();
    });

    $('.btn-more').click(function () {
        _toggleHtml(this, ['更多', '收起']);
        $('.ul-y1').slideToggle();
    });

    function _toggleHtml(obj, arr) {
        var arr = ['更多', '收起'];
        if (obj.innerHTML == arr[0]) {
            obj.innerHTML = arr[1];
        } else {
            obj.innerHTML = arr[0];
        }
    }

    return this;
}


/**
 * 求和
 * Author:liyong
 * Date:2017-7-24
 * @returns {ContractPage}
 */
ContractPage.prototype.sum = function () {
    $("#CostItemText").on("change", function () {
        var total, val1, val2, val3;
        if ($("#CostItemText span:eq(0)").html() == "应收") {
            val1 = $("#CostItemText input:eq(0)").val() - 0;
        } else {
            val1 = 0 - $("#CostItemText input:eq(0)").val();

        }
        if ($("#CostItemText span:eq(2)").html() == "应收") {
            val2 = $("#CostItemText input:eq(1)").val() - 0;
        } else {
            val2 = 0 - $("#CostItemText input:eq(1)").val();
        }
        if ($("#CostItemText span:eq(4)").html() == "应收") {
            val3 = $("#CostItemText input:eq(2)").val() - 0;
        } else {
            val3 = 0 - $("#CostItemText input:eq(2)").val();
        }
        var total = val1 + val2 + val3 - 0;
        $("#CostPrice").text(total);
    })
    return this;
}
/**AJAX
 *查询绑定
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestCondition = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['QUERY'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                //绑定日期类别
                var TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA.dateType.length; i++) {
                    TEMP_HTML += "<li data-value='" + JSON_DATA.dateType[i]['Key'] + "'>" + JSON_DATA.dateType[i]['Value'] + "</li>";
                }
                $("#DateType li:first").nextAll().remove();
                $("#DateType li:first").after(TEMP_HTML);


                //绑定合同状态列表
                TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA['contractState'].length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    TEMP_HTML += "<li data-value='" + JSON_DATA.contractState[i]['Key'] + "' class='" + style + "'>" + JSON_DATA['contractState'][i]['Value'] + "</li>";
                }
                $("#ContractState ul").html(TEMP_HTML);
                //$("#ContractState ul #mCSB_2_container").html(html);
                //绑定物业状态
                TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA['building'].length; i++) {
                    TEMP_HTML += "<li data-value='" + JSON_DATA['building'][i].CharId + "'>" + JSON_DATA['building'][i]['Name'] + "</li>";
                }
                $("#Buildings li:first").nextAll().remove();
                $("#Buildings li:first").after(TEMP_HTML);
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
 * 分页绑定ajax
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestContractPageInit = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['PAGE_INIT'],
        // 发送到服务器的数据
        data: params,
        dataType: "JSON",
        success: function (data) {
            //初始化分页控件
            if (data['succ']) {
                //清空分页控件
                $(".fy-wrap-contract").html("");
                //绑定分页控件/*pagerow:一页显示条数;total:总数;foo:点击页码调用函数;fywrap:分页容器*/
                //fyfoo2(pagerow, total, foo, fywrap)
                var pageinit = new fyfoo2(pageSize, data.exted.totalNum, function (num) {
                    _this.contractList(num);
                }, $(".fy-wrap-contract"));
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
 * table渲染
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestContractsList = function (params) {
    var _this = this;
    $("#Contracts").on("click", ".btn-contractcheck", function () {
        var end = $(this).parent("td").prev().prev().html();
        if (end == "") {
            webApp.grantControl($(".btn-backrental"), "contract_end");
        } else {
            $(".btn-backrental").hide();
        }
        _this.CDC = $(this).attr("data-contractChart").trim();
        _this.ajaxRequestContractDetail(_this.getParams(_this.CTT));
    });
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['CONTRACTS_LIST'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            //绑定合同信息
            if (data['succ']) {
                var JSON_DATA = data.data;
                var TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<tr>";
                    TEMP_HTML += "<td>" + JSON_DATA[i].Number + "</td>" +
                        "<td>" + JSON_DATA[i].State + "</td>" +
                        "<td>" + JSON_DATA[i].CustomerName + "</td>" +
                        "<td>" + JSON_DATA[i].Phone + "</td>" +
                        "<td>" + JSON_DATA[i].RoomName + "</td>" +
                        "<td>" + JSON_DATA[i].Price + "</td>" +
                        "<td>" + JSON_DATA[i].BargainDate + "</td>" +
                        "<td>" + JSON_DATA[i].EndDate + "</td>" +
                        "<td>" + JSON_DATA[i].CreateTime + "</td>" +
                        "<td><span type=\"contract-check\" dir=\"right\" class=\"btn-contractcheck\" data-contractChart='" + JSON_DATA[i].CharId + "'>查看</span></td>";
                    TEMP_HTML += "</tr>";
                }
                $("#Contracts tr:first").nextAll().remove();
                if (webApp.grantControl($(".fq-contain-dv"), "contract_select")) {
                    $("#Contracts").append(TEMP_HTML);
                    $("#Contracts").show();
                    $(".fy-wrap-contract").show();
                } else {
                    // 无权限查看
                    webApp.noGrant();
                }
                panel_tab5($('.btn-contractcheck,.btn-edit'), $('.modal-mask,.btn-cancel'), $('.alert-modal-wraper'));
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
 * 合同明细
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestContractDetail = function (params) {
    var _this = this;
    $.ajax({
        type: "GET",
        url: host + _this.API_CONFIG['CONTRACT'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            //绑定明细页面
            if (data['succ']) {
                var JSON_DATA = data.data;
                // 账单（列表）查看
                webApp.grantControl($(".billInit"), "bill_select");
                // 合同编辑
                webApp.grantControl($(".contractUpdateBind>button"), "contract_update");
                // 退租
                // webApp.grantControl($(".btn-backrental"), "contract_end");
                // 作废
                webApp.grantControl($("#btn-abandon"), "contract_abandon");
                //续约
                webApp.grantControl($(".btn-contractadd"), "contract_add");

                $("#CustomerName_Detail").text(JSON_DATA['CustomerName']);
                $("#Phone_Detail").text(JSON_DATA['Phone']);
                $("#CardId_Detail").text(JSON_DATA['CardID']);
                $("#BuildingName_Detail").text(JSON_DATA['BuildingName'] + JSON_DATA['FloorName'] + "层");
                $("#RoomName_Detail").text(JSON_DATA['RoomName'] + "室");
                $("#Number_Detail").text(JSON_DATA['Number']);
                $("#State_Detail").text(JSON_DATA['State']);
                $("#Price_Detail").text(JSON_DATA['Price'] + "元/月");
                $("#Deposit_Detail").text(JSON_DATA['Deposit'] + "元/月");
                $("#RentDate_Detail").text(JSON_DATA['InDate'] + "~" + JSON_DATA['OutDate']);
                $("#PayType_Detail").text(JSON_DATA['PayType1']);
                $("#ReceiveDate").text();
                $("#EmpName_Detail").text(JSON_DATA['DepartmentName'] + "." + JSON_DATA['EmployeeName']);
                $("#BargainDate_Detail").text(JSON_DATA['BargainDate']);
                $("#Description_Detail").text(JSON_DATA['Description']);
                $("#CreateEmpName_Detail").text(JSON_DATA['CreateTime']);
                $("#CurContractCharId").val(_this.CDC);
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
 * 合同编辑基础数据
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestContractBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['CONTRACT_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_DATA = data['exted'];
                //绑定支付方式下拉列表
                var TEMP_HTML = "";
                for (var i = 0; i < TEMP_DATA['PayType'].length; i++) {
                    TEMP_HTML += "<li value='" + TEMP_DATA['PayType'][i].Key + "'>" + TEMP_DATA['PayType'][i].Value + "</li>";
                }
                $("#PayType ul").html(TEMP_HTML);

                //绑定合同信息
                $("#Phone_Update").text(JSON_DATA['Phone']);
                $("#CustomerName_Update").text(JSON_DATA['CustomerName']);
                $("#CardId_Update").text(JSON_DATA['CardID']);
                $("#Number_Update").text(JSON_DATA['Number']);
                $("#Price_Update").val(JSON_DATA['Price']);
                $("#Deposit_Update").val(JSON_DATA['Deposit']);
                $("#Total_Update").val(JSON_DATA['Total']);
                $("#InDate_Update").val(JSON_DATA['InDate']);
                $("#OutDate_Update").val(JSON_DATA['OutDate']);
                $("#BargainDate_Update").val(JSON_DATA['BargainDate']);
                $("#BuildingName_Update").text(JSON_DATA['BuildingName'] + JSON_DATA['FloorName'] + "层");
                $("#RoomName_Update").text(JSON_DATA['RoomName'] + "室");
                $("#Description_Update").val(JSON_DATA['Description']);

                //绑定部门和人员信息
                // var exted = jdata.exted;
                $("#PayType li[value='" + TEMP_DATA['PayTypeSel'] + "']").addClass("cur");
                $("#PayType span").text($("#PayType li.cur").text());

                //绑定部门和人员
                if (JSON_DATA['OwnerEmployeeCharId']) {
                    var TEMP_HTML = "";
                    TEMP_HTML += "<li data-value=\"\" >不选</li>";
                    for (var j = 0; j < TEMP_DATA['Dpts'].length; j++) {
                        // html += "<li value=\"" + exted.Dpts[j].CharId + "\">" + exted.Dpts[j].Name + "</li>";
                        TEMP_HTML += "<li  data-value=\"" + TEMP_DATA.Dpts[j].CharId + "\"  class=\"fq-menu\"><b class=\"icon iconfont icon-iconfontsanjiao01\"></b><span>" + TEMP_DATA.Dpts[j].Name + "</span>";
                        for (var k = 0; k < TEMP_DATA['Dpts'][j].ChildDpts.length; k++) {
                            if (k == 0) {
                                TEMP_HTML += "<ul>";
                            }
                            TEMP_HTML += "<li id=\"" + TEMP_DATA.Dpts[j].ChildDpts[k].CharId + "\"   data-value=\"" + TEMP_DATA.Dpts[j].ChildDpts[k].CharId + "\" class='menuChildren'><span>" + TEMP_DATA.Dpts[j].ChildDpts[k].Name + "</span></li>";
                            if (k == TEMP_DATA.Dpts[j].ChildDpts.length - 1) {
                                TEMP_HTML += "</ul>";
                            }
                        }

                        TEMP_HTML += "</li>";
                    }
                    $("#Dpts > ul").html(TEMP_HTML);
                    $("#Dpts>ul li[data-value='" + JSON_DATA['OwnerDepartmentCharId'] + "']").addClass("cur");
                    // $("#Dpts > span").text($("#Dpts>ul>li[value='" + data.OwnerDepartmentCharId + "']").children("span").text());
                    // 5.27ly
                    $("#Dpts > span").text(JSON_DATA.DepartmentName);
                    TEMP_HTML = "";
                    TEMP_HTML += "<li data-value=\"\" >不选</li>";
                    for (var j = 0; j < TEMP_DATA.Emps.length; j++) {
                        TEMP_HTML += "<li data-value=\"" + TEMP_DATA.Emps[j].CharId + "\">" + TEMP_DATA.Emps[j].Name + "</li>";
                    }
                    $("#Emps > ul").html(TEMP_HTML);
                    $("#Emps>ul>li[data-value='" + JSON_DATA['OwnerEmployeeCharId'] + "']").addClass("cur");
                    $("#Emps > span").text($("#Emps>ul>li[data-value='" + JSON_DATA['OwnerEmployeeCharId'] + "']").text());
                }
                else {
                    var TEMP_HTML = "";
                    TEMP_HTML += "<li data-value=\"\" class=\"cur\">不选</li>";
                    for (var j = 0; j < TEMP_DATA.Dpts.length; j++) {
                        TEMP_HTML += "<li data-value=\"" + TEMP_DATA.Dpts[j].CharId + "\">" + TEMP_DATA.Dpts[j].Name + "</li>";
                    }
                    $("#Dpts > ul").html(TEMP_HTML);
                    $("#Dpts>ul>li[data-value='" + JSON_DATA['OwnerDepartmentCharId'] + "']").addClass("cur");
                    $("#Dpts > span").text($("#Dpts>ul>li[data-value='" + JSON_DATA['OwnerDepartmentCharId'] + "']").text());

                    TEMP_HTML = "";
                    TEMP_HTML += "<li data-value=\"\" class=\"cur\">不选</li>";
                    $("#Emps > ul").html(TEMP_HTML);
                    $("#Emps > span").text("不选");
                }

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
    return this;
}

/**
 * 合同保存
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestContractSave = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['CONTRACT_SAVE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                _this.ajaxRequestContractDetail(_this.getParams(_this.CTT));
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                baocun();
                _this.contractList();
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
 * 合同作废
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestContractAbandon = function (params) {
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['CONTRACT_ABANDON'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                cp.contractList();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                baocun();
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
 * BEGIN 退租数据绑定
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestEndBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['END_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            //绑定明细页面
            if (data['succ']) {
                var JSON_DATA = data['data'];
                var TEMP_DATA = data['exted'];
                $("#CustomerName_End").text(JSON_DATA['CustomerName']);
                $("#Phone_End").text(JSON_DATA['Phone']);
                $("#BuildingName_End").text(JSON_DATA['BuildingName'] + JSON_DATA['FloorName'] + "层" + JSON_DATA['RoomName'] + "室");
                $("#Price_End").text(JSON_DATA['Price'] + "元/月");
                $("#Deposit_End").text(JSON_DATA['Deposit'] + "元/月");
                $("#RentsDate_End").text(JSON_DATA['InDate'] + "~" + JSON_DATA['OutDate']);
                var TEMP_HTML = "";
                for (var i = 0; i < TEMP_DATA['CostItem'].length; i++) {
                    var style = i < 2 ? "sel" : "";
                    TEMP_HTML += "<li class=\"" + style + "\" value=\"" + TEMP_DATA['CostItem'][i]['Key'] + "\">" + TEMP_DATA['CostItem'][i]['Value'] + "</li>";
                }
                TEMP_HTML += "<div class=\"clear\"></div>";
                $("#CostItem").html(TEMP_HTML);//绑定收费项标签列表

                TEMP_HTML = "";
                for (var i = 0; i < TEMP_DATA['CostItem'].length; i++) {
                    TEMP_HTML += "<li>";
                    TEMP_HTML += "	<p data-value=\"" + TEMP_DATA['CostItem'][i]['Key'] + "\">" + TEMP_DATA['CostItem'][i]['Value'] + "</p>";
                    TEMP_HTML += "	<div class=\"modal-dv-row\">";
                    TEMP_HTML += "		<div type=\"click\" class=\"fq-xiala\">";
                    TEMP_HTML += "			<span class=\"fq-xiala-sel\">" + TEMP_DATA['BillAddType'][0]['Value'] + "</span><i class=\"icon iconfont icon-xiala\"></i>";
                    TEMP_HTML += "			<ul>";

                    for (var j = 0; j < TEMP_DATA['BillAddType'].length; j++) {
                        var style = j == 0 ? "cur" : "";
                        TEMP_HTML += "	<li class=\"" + style + "\" data-value=\"" + TEMP_DATA['BillAddType'][j]['Key'] + "\">" + TEMP_DATA['BillAddType'][j]['Value'] + "</li>";
                    }
                    TEMP_HTML += "			</ul>";
                    TEMP_HTML += "		</div><div class=\"ip-wrap\"><input type=\"text\" value=\"0\"><span>元</span></div>";
                    TEMP_HTML += "	</div>";
                    TEMP_HTML += "</li>";
                }
                TEMP_HTML += "<div class=\"clear\"></div>";
                $("#CostItemText").html(TEMP_HTML);//绑定收费项-输入金额 列表

                //html = "";
                //for (var j = 0; j < jdata.exted.BillAddType.length; j++) {
                //    var style = j == 0 ? "cur" : "";
                //    html += "				<li class=\"" + style + "\" value=\"" + jdata.exted.BillAddType[j].Key + "\">" + jdata.exted.BillAddType[j].Value + "</li>";
                //}
                //$(".billaddtype span").text(jdata.exted.BillAddType[0].Value);
                ////绑定租金、押金下拉
                //$(".billaddtype ul").html(html);

                TEMP_HTML = "";
                for (var j = 0; j < TEMP_DATA['EndContractType'].length; j++) {
                    var style = j == 0 ? "cur" : "";
                    TEMP_HTML += "				<li class=\"" + style + "\" data-value=\"" + TEMP_DATA['EndContractType'][j]['Key'] + "\">" + TEMP_DATA['EndContractType'][j]['Value'] + "</li>";
                }
                $("#EndContractType span").text(TEMP_DATA['EndContractType'][0]['Value']);
                //绑定租金、押金下拉
                $("#EndContractType ul").html(TEMP_HTML);
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
    return this;
}

/**
 * 打开账单收款窗口
 * Author:LiYong
 * Date:2017-07-21
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.openDialog = function () {
    var _this = this;
    $("#Bills").on("click", ".collection", function () {
        _this.CLC = $(this).attr("data-value").trim();
        _this.openDialog();
    })
    var url = 'billdetail.html?billCharId=' + _this.CLC;
    var name = '';
    var iWidth = 550;
    var iHeight = 600;
    //获得窗口的垂直位置
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
    //获得窗口的水平位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=yes,titlebar=no');
    return this;
}
/**
 * 绑定员工下拉列表
 * author:liyong
 * date:2017-7-21
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.employeeBind = function () {
    var _this = this;
    if ($("#Dpts li.cur").attr("data-value") != "") {
        var params = _this.getParams(_this.ELB);
        _this.ajaxRequestEmployeeBind(params);
    } else {
        var TEMP_HTML = "";
        TEMP_HTML += "<li value=\"\" class=\"cur\">不选</li>";
        $("#Emps > ul").html(TEMP_HTML);
        $("#Emps > span").text("不选");
        DropdownInit();
    }
    return this;
}


/**
 * 部门选择
 * author：liyong
 * date:2017-07-21
 * @returns {ContractPage}
 */
ContractPage.prototype.employeeCheck = function () {
    var _this = this;
    $("#Dpts").on("click", "ul li span ", function () {
        _this.employeeBind();
    });
    return this;
}

/**
 * BEGIN 退租保存ajax
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestEndSave = function (params) {
    var _this = this;
    $.ajax({
        type: "POST",
        url: host + _this.API_CONFIG['END_SAVE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                $('#btn-end').hide();
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
                baocun();
                _this.contractList();
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
 * BEGIN 账单分页初始化ajax
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestBillPageInit = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['BILL_INIT'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            //初始化分页控件
            if (data['succ']) {
                //清空分页控件
                $(".fy-wrap-bill").html("");
                //绑定分页控件
                var pageinit = new fyfoo2(pageSize, data.exted.totalNum, function (num) {
                    cp.billList(num);
                }, $(".fy-wrap-bill"));
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
 * BEGIN 账单列表ajax
 * Author:LiYong
 * Date:2017-07-20
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestBillList = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['BILL_LIST'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            //绑定合同信息
            if (data['succ']) {
                var JSON_DATA = data.data;
                var TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<tr>" +
                        "<td>" + JSON_DATA[i]['State'] + "</td>" +
                        "<td>" + JSON_DATA[i]['Type'] + "</td>" +
                        "<td>" + JSON_DATA[i]['PayDate1'] + "~" + JSON_DATA[i]['PayDate2'] + "</td>" +
                        "<td>" + JSON_DATA[i]['Price'] + "</td>" +
                        "<td>" + JSON_DATA[i]['Progress'] + "</td>" +
                        "<td>" + JSON_DATA[i]['PayDate3'] + "</td>";
                    if (webApp.grantControl($(".billDel"), "bill_delete")) {
                        // TEMP_HTML += "<td><button color=\"lan\" onclick=\"OpenDialog('" + JSON_DATA[i].CharId + "')\">收款</button><button color=\"lan\"  onclick=\"BillDel('" + JSON_DATA[i].CharId + "')\" class='billDel'>删除</button></td>";
                        // TEMP_HTML += "<td><button color=\"lan\" onclick=\"OpenDialog('" + JSON_DATA[i].CharId + "')\">收款</button><button color=\"lan\" data-value='" + JSON_DATA[i].CharId + "' onclick=\"BillDel('" + JSON_DATA[i].CharId + "')\" class='billDel'>删除</button></td>";
                        TEMP_HTML += "<td><button color=\"lan\" data-value='" + JSON_DATA[i].CharId + "' class=\"collection\" >收款</button><button color=\"lan\" data-value='" + JSON_DATA[i].CharId + "' class='billDel' onclick='cp.billDelete()'>删除</button></td>";
                    } else {
                        // TEMP_HTML += "<td><button color=\"lan\" onclick=\"OpenDialog('" + JSON_DATA[i].CharId + "')\">收款</button></td>";
                        TEMP_HTML += "<td><button color=\"lan\"  data-value='" + JSON_DATA[i].CharId + "' class=\"collection\">收款</button></td>";
                    }
                    TEMP_HTML += "</tr>";
                }
                $("#Bills tr:first").nextAll().remove();
                $("#Bills").append(TEMP_HTML);
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
 * BEGIN 账单删除ajax
 * Author:LiYong
 * Date:2017-07-21
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestBillDelete = function (params) {
    $.ajax({
        type: "POST",
        url: host + this.API_CONFIG['BILL_DEL'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            cp.billInit();
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            // baocun();
            $(".fq-modal-menul3 li:eq(1)").click();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}
/**
 * BEGIN 账单新增绑定ajax
 * Author:LiYong
 * Date:2017-07-21
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestBillBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['BILL_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data.data;
                //绑定账单费用类别列表
                var TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA['CostItems'].length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    TEMP_HTML += "<li data-value='" + JSON_DATA['CostItems'][i]['Key'] + "' class='" + style + "'>" + JSON_DATA['CostItems'][i]['Value'] + "</li>";
                }
                $("#CostItems ul").html(TEMP_HTML);
                $("#CostItems span").text($("#CostItems li[class='cur']").text());
                //绑定账单类别列表
                TEMP_HTML = "";
                for (var i = 0; i < JSON_DATA['BillTypes'].length; i++) {
                    var style = "";
                    if (i == 0) {
                        style = "cur";
                    }
                    TEMP_HTML += "<li data-value='" + JSON_DATA['BillTypes'][i]['Key'] + "' class='" + style + "'>" + JSON_DATA['BillTypes'][i]['Value'] + "</li>";
                }
                $("#BillTypes ul").html(TEMP_HTML);
                $("#BillTypes span").text($("#BillTypes li[class='cur']").text());
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
    return this;
}


/**
 * 账单新增保存ajax
 * Author:LiYong
 * Date:2017-07-21
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestBillAdd = function (params) {
    $.ajax({
        type: "POST",
        url: host+this.API_CONFIG['BILL_ADD_SAVE'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            $(".fq-modal-menul3 li:eq(1)").click();
            baocun();
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
    return this;
}


/**
 * 绑定员工下拉列表ajax
 * author:liyong
 * date:2017-7-21
 * @param params
 * @returns {ContractPage}
 */
ContractPage.prototype.ajaxRequestEmployeeBind = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['EMPLOYEE_BIND'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            if (data['succ']) {
                var JSON_DATA = data.data;
                var TEMP_HTML = "";
                TEMP_HTML += "<li data-value=\"\" class=\"cur\">不选</li>";
                for (var i = 0; i < JSON_DATA.length; i++) {
                    TEMP_HTML += "<li data-value=\"" + JSON_DATA[i]['CharId'] + "\" >" + JSON_DATA[i]['Name'] + "</li>";
                }
                $("#Emps > ul").html(TEMP_HTML);
                $("#Emps> span").text($("#Emps>ul>li.cur").text());
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
    return this;
}


var cp = new ContractPage();

