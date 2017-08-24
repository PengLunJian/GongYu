//    统计图

/**
 *
 * @constructor
 */
function Statisti() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.CHART = arguments['CHART'] ? arguments['CHART'] : 'CHART';
    this.API_CONFIG = arguments['API_CONFIG'] ? arguments['API_CONFIG'] : {
        CHART: '/statistic/business',
    }
    this.init();
}

/**
 *
 * @returns {Statisti}
 */
Statisti.prototype.init = function () {
    App.init();
    ComponentsPickers.init();
    var params = this.getParams(this.CHART)
    this.ajaxRequestChart(params);
    return this;
}

/**
 *
 * @param name
 * @returns {*}
 */
Statisti.prototype.getParams = function (name) {
    var params = null;
    switch (name) {
        case this.CHART:
            params = {
                requestKey: localStorage.getItem("requestKey")
            };
            break;

    }
    return params;
}

/**
 *
 * @param params
 * @returns {Statisti}
 */
Statisti.prototype.ajaxRequestChart = function (params) {
    $.ajax({
        type: "GET",
        url: host + this.API_CONFIG['CHART'],
        data: params,
        dataType: "JSON",
        success: function (data) {
            //绑定费用信息
            if (data['succ']) {
                var jdata = data.data;
                var bargainAndBillStats = jdata['BargainAndBillStats'];
                var bargainByDateStats = jdata['BargainByDateStats'];
                var customerStats = jdata['CustomerStats'];
                var endContractStats = jdata['EndContractStats'];
                var roomStats = jdata['RoomStats'];
                $("#bargainCount").html(bargainAndBillStats['BargainCount']);
                $("#ReletCou").html(bargainAndBillStats['ReletCount']);
                $("#progre").html(bargainAndBillStats['Progress']);
                $("#mustPri").html(bargainAndBillStats['MustPrice']);
                $("#endContractCo").html(bargainAndBillStats['EndContractCount']);
//                    退租数量
                $("#hire").html(endContractStats[0].value / 1 + endContractStats[1].value / 1);
//                    到期退租
                $("#dueHire").html(endContractStats[0].value);
//                    中途退租
                $("#middleHire").html(endContractStats[1].value);
//                    退租率
//                 $("#hireRate").html(0);

//                    折线图
                (function () {
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('stayIn'));
                    var Date = [];
                    var Occupancy = [];
                    var StayIn = bargainByDateStats;
                    var add = 0;
                    for (var i = 0; i < StayIn.length; i++) {
                        Date.push(StayIn[i].Date);
                        Occupancy.push(StayIn[i]['Count']);
                        add += StayIn[i]['Count'];
                    }
                    ;
                    // 指定图表的配置项和数据
                    var Max;
                    if (add == 0) {
                        Max = 5;
                    }
                    var colors = ['#59acff'];
                    option = {
                        color: colors,
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: [{
                                name: '入住人数',
                                textStyle: {
                                    fontSize: '14',
                                    color: '#3c3c3c'
                                }
                            }],
                            textStyle: {
                                color: '#646464',
                                fontSize: '14'
                            }
                        },
                        toolbox: {
                            show: false,
                        },
                        xAxis: {
                            inside: "true",
                            axisLabel: {
                                interval: 0,
                                rotate: -30,
                            },
                            axisTick: 'false',
                            type: 'category',
                            boundaryGap: false,
                            data: Date,
                            // axisLabel: {
                            //     textStyle: {
                            //         fontSize: '14'
                            //     }
                            // }
                        },
                        yAxis: {
                            min: 0,
                            max: Max,
                            inside: "true",
                            axisTick: 'false',
                            type: 'value',
                            axisLabel: {
                                textStyle: {
                                    fontSize: '14'
                                }
                            },
                        },

                        series: [
                            {
                                name: '入住人数',
                                type: 'line',
                                data: Occupancy
                            }
                        ]
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                    $(window).resize(function () {
                        myChart.resize();
                    });
                })();
                //环形图
                (function () {
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('ring'));
                    // 指定图表的配置项和数据
                    var Name = [];
                    var Ring = endContractStats;
                    for (var i = 0; i < Ring.length; i++) {
                        Name.push(Ring[i]['name']);
                    }
                    var colors = ['#54ce8f', '#f97b7b'];
                    option = {
                        color: colors,
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            x: 'center',
                            data: Name,
                            textStyle: {
                                color: "#646464",
                                fontSize: '14'
                            }
                        },
                        series: [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius: ['40%', '30%'],
                                avoidLabelOverlap: false,
                                center: ['40%', '50%'],
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '20',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: Ring
                            }
                        ]
                    };


                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                    $(window).resize(function () {
                        myChart.resize();
                    });
                })();
                //    柱状图
                (function () {
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('columnar'));
                    // 指定图表的配置项和数据
                    var roomTitle = [];
                    var Month = [];
                    var TakeRoomNumber = [];
                    var DelRoomNumber = [];
                    var Columnar = roomStats;
                    roomTitle.push(Columnar['AddCount']);
                    roomTitle.push(Columnar['DelCount']);
                    for (var i = 0; i < Columnar['Content'].length; i++) {
                        Month.push(Columnar['Content'][i]['Month']);
                        TakeRoomNumber.push(Columnar['Content'][i]['AddCount']);
                        DelRoomNumber.push(Columnar['Content'][i]['DelCount']);
                    }
                    var colors = ['#54ce8f', '#f97b7b'];
                    option = {
                        color: colors,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross'
                            }
                        },
                        grid: {
                            left: '5%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        legend: {
                            data: roomTitle,
                            textStyle: {
                                color: '#646464',
                                fontSize: '14'
                            }
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisLabel: {
                                    textStyle: {
                                        fontSize: '14'
                                    }
                                },
                                axisTick: {
                                    alignWithLabel: true,
                                    show: false
                                },
                                data: Month
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisTick: {
                                    alignWithLabel: true,
                                    show: false
                                },
                                axisLabel: {
                                    formatter: '{value}',
                                    textStyle: {
                                        fontSize: '14'
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name: Columnar['AddCount'],
                                type: 'bar',
                                data: TakeRoomNumber
                            },
                            {
                                name: Columnar['DelCount'],
                                type: 'bar',
                                data: DelRoomNumber
                            }
                        ]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                    $(window).resize(function () {
                        myChart.resize();
                    });
                })();
                //    饼图
                (function () {
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('pie'));
                    // 指定图表的配置项和数据
                    var CustomerStatus = [];
                    var Pie = customerStats;
                    for (var i = 0; i < Pie.length; i++) {
                        CustomerStatus.push(Pie[i].name);
                    }
                    var colors = ['#54ce8f', '#f97b7b', '#f7c163'];
                    option = {
                        color: colors,
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'right',
                            top: 'top',
                            data: CustomerStatus,
                            textStyle: {
                                color: '#646464',
                                fontSize: '14'
                            }
                        },
                        series: [
                            {
                                name: '客户',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '50%'],
                                label: {
                                    normal: {
                                        textStyle: {
                                            fontSize: '14'
                                        }
                                    }
                                },
                                data: Pie,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                    $(window).resize(function () {
                        myChart.resize();
                    });
                })();

            }
            else {
                messageBox.show("提示", data['msg'], MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error)
        }
    });
    return this;
}
var statisti = new Statisti();


//选项卡
// (function ($, element) {
//     $(element).click(function () {
//         var INDEX = $(this).index();
//         var PANEL = ".chart-block";
//         var PANEL_ITEM = ".chart-block:eq(" + INDEX + ")";
//         var SELECTOR = ".chart-tab span";
//         $(SELECTOR).removeClass("active");
//         $(this).addClass("active");
//         $(PANEL).removeClass("show");
//         $(PANEL_ITEM).addClass("show");
//     })
// })(jQuery, ".chart-tab span");

// if(webApp.grantControl($(".statistic"),"statistic_select")){
//     var TEMP_HTML = '<div class="imgs">'
//         + '<img src="images/withoutPower.png" alt=""/>'
//         + '<p>抱歉，您暂时没有相关权限，请联系管理员！</p></div>';
//     $(".statistic").html(TEMP_HTML);
// }