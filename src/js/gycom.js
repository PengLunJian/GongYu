// ly权限编辑控制 参数e是要控制显隐的对象 data是data-system 比如："floor_update"
// 写到对应的每一个ajax内部调用这个函数  aja渲染数据和写死的都先隐藏，找得到就显示出来
var objData = JSON.parse(localStorage.getItem('loginData'));

/**
 *
 * @param obj
 * @constructor
 */
function Grant(obj) {
    if (arguments.length != 0) {
        this.result = obj.result ? obj.result : false;
        this.config = obj.config ? obj.config : null;
        this.errorHTML = obj.errorHTML ? obj.errorHTML : "error.html"
        this.grantCheck();
    }
}

/**
 *
 * @returns {string}
 */
Grant.prototype.getRequestHtml = function () {
    const CONST_EXNAME = '.html';
    var url = window.location.href;
    var BEGIN_INDEX = url.lastIndexOf('/') + 1;
    var END_INDEX = url.lastIndexOf(CONST_EXNAME) + CONST_EXNAME.length;
    var URI = url.substring(BEGIN_INDEX, END_INDEX);
    return URI;
}
/**
 *
 * @returns {boolean|*}
 */
Grant.prototype.getResult = function () {
    var URI = this.getRequestHtml();
    var regExp = new RegExp(URI, 'g');
    if (regExp.test(this.config)) {
        this.result = true;
    }
    return this.result;
}
/**
 *
 * @returns {Grant}
 */
Grant.prototype.grantCheck = function () {
    var TEMP_OBJ = objData['Menus'];
    var RESULT = this.getResult();
    var URI = this.getRequestHtml();
    if (RESULT) {
        var FLAG = false;
        for (var i = 0; i < TEMP_OBJ.length; i++) {
            if (URI == TEMP_OBJ[i]['Url'].trim()) {
                FLAG = true;
            }
        }
        if (!FLAG) {
            window.location.href = this.errorHTML;
        }
    }
    return this;
}
/**
 *
 */
if (objData) {
    new Grant({
        result: false,
        config: "desktop.html,property.html," +
        "customer.html,contract.html,bill.html," +
        "count.html,power.html,employee.html," +
        "setup.html,dailyrecord.html"
    });
}


function powerControl(e, data) {
    var str = objData['Operations'];
    // 可以找到
    if (str.indexOf(data) != -1) {
        e.show();
        return true;
    } else {
        return false;
    }
}
// 无查看权限
function withoutLookPower() {
    var html1 = "<div class='fq-contain-dv'>";
    html1 += "<div class='imgs'>";
    html1 += "<img src='images/withoutPower.png' alt=\"\">";
    html1 += "<p>抱歉，您暂时没有相关权限，请联系管理员！</p>";
    html1 += "</div>"
    html1 += "</div>";
    $(".fq-contain-in").html(html1);
    $(".fq-contain-dv").show();
}

/**
 * BEGIN
 * 3个月 6个月 1年按钮功能实现
 * Author:liyong
 * Data:2017-05-15
 */
//开始日期
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    $(".modal-property-data-contract-dv .group-date1").val(currentdate);
    return currentdate;
}
getNowFormatDate();

function getNextMonth(date, b) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + b;
    if (month2 >= 13) {
        year2 = parseInt(year2) + 1;
        month2 = month2 - 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();

    if (day2 > days2) {
        day2 = days2;
    }
    day2 -= 1;
    if (day2 == 0) {
        month2 -= 1;
        day = new Date(year2, month2, 0);
        day2 = day.getDate();
    }
    if (day2 < 10) {
        day2 = '0' + day2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    $(".modal-property-data-contract-dv .group-date2").val(t2);
    $(".group-date2").keyup();
    return t2;
}
//3个月
$(".modal-property-data-contract-dv span:eq(0)").click(function () {
    var leftDate = $(".modal-property-data-contract-dv .group-date1").val();
    getNextMonth(leftDate, 3);
})
//    6个月
$(".modal-property-data-contract-dv span:eq(1)").click(function () {
    var leftDate = $(".modal-property-data-contract-dv .group-date1").val();
    getNextMonth(leftDate, 6);
});
//       1年
$(".modal-property-data-contract-dv span:eq(2)").click(function () {
    var leftDate = $(".modal-property-data-contract-dv .group-date1").val();
    getNextMonth(leftDate, 12);
});

/**
 * BEGIN
 * 自定义MessageBox弹窗
 * Author:PengLunJian
 * Data:2017-05-09
 * @constructor MessageBox
 */
function MessageBox() {
    this.title = "";
    this.message = "";
    this.template = "";
    this.result = false;
}

var MessageBoxButtons = {
    OK: '<button class="fq-btn btn-confirm" data-dismiss="modal">确认</button>',
    CANCEL: '<button class="btn-cancel" data-dismiss="modal">取消</button>',
    OKCANCEL: '<button class="fq-btn btn-confirm" data-dismiss="modal">确认</button>'
    + '<button class="btn-cancel" data-dismiss="modal">取消</button>',
}

var MessageBoxIcons = {
    infomation: "info_icon.png",
    warning: "warn_icon.png",
    question: "question_icon.png",
    error: "error_icon.png",
}
MessageBox.prototype.show = function (title, message, MessageBoxButtons, MessageBoxIcons) {
    this.title = title;
    this.message = message;
    this.template = '<div class="modal fade modal-message-box" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'
        + '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">'
        + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        + '<h4 class="modal-title" id="mySmallModalLabel">' + this.title + '</h4></div><div class="modal-body clearfix">'
        + '<div class="modal-clear col-xs-1"><img src="images/messageBox/' + MessageBoxIcons + '"/></div><div class="modal-clear col-xs-11">'
        + '<p class="modal-info">' + this.message + '</p></div></div><div class="modal-footer">' + MessageBoxButtons + '</div></div></div></div>';

    if ($(".modal-message-box")[0] != undefined) $(".modal-message-box").remove();
    //ly5.17 添加 关闭第二层遮罩
    if ($(".modal-backdrop")[0] != undefined) $(".modal-backdrop").remove();
    $("body").prepend(this.template);
    $('.modal-message-box').modal('toggle');
}

/**
 *
 * @param fn
 * @returns {MessageBox}
 */
MessageBox.prototype.confirm = function (fn) {
    $(".btn-confirm").on("click", function () {
        fn();
    });
    return this;
}
var messageBox = new MessageBox();
//自定义MessageBox弹窗 END


var thispageinit = function () {
}
//绑定用户名称,是否认证信息
var bindUser = function () {
    if (localStorage.getItem("username")) {
        $('#username').html(localStorage.getItem("username"));
    }
    if (localStorage.getItem("isValid") != 1) {//zhrong0302未认证的提示“手机未认证”
        $("#isValid").html("手机未认证<font class=\"phone-dot\"></font><font style=\"margin-left:20px;position:relative;top:6px;width:1px;height:26px;display:inline-block;background-color:#e7e7e7;\"></font>");
    }

    $('#loginOut').click(function () {
        var lgOut_data = {
            requestKey: localStorage.getItem("requestKey"),
            employeeCharId: localStorage.getItem("employeeCharId")
        };
        $.ajax({
            url: host + "/identity/logout",
            type: "POST",
            dataType: "json",
            data: lgOut_data,
            success: function (data) {
                if (data != null) {
                    try {
                        if (data.succ) {
                            localStorage.setItem('isLogin', false);
                            localStorage.removeItem("username");
                            localStorage.removeItem("employeeCharId");
                            localStorage.removeItem("requestKey");
                            window.parent.location.href = 'login.html';
                            return true;
                        }
                        else {
                            messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                        }
                    } catch (e) {
                    }
                    ;
                }
                ;
            },
            error: function (e) {
                if (e.readyState > 0) {
                    messageBox.show("错误", e, MessageBoxButtons.OK, MessageBoxIcons.error);
                }
            }
        });
    });

    //绑定品牌名称
    var wx_data = {
        requestKey: localStorage.getItem("requestKey")
    };
    $.ajax({
        url: host + "/param/company",
        type: "GET",
        dataType: "json",
        data: wx_data,
        success: function (data) {
            if (data.succ) {
                var jdata = data.data;
                $("#header>p:eq(0)").text(jdata.FullName);
                return true;
            }
            else {
                messageBox.show("提示", data.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }
        },
        error: function (e) {
            if (e.readyState > 0) {
                messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
            }
        }
    });
}

//zhrong初始化下拉
function DropdownInit() {
    var xiala;
    xiala = new fq.xiala(null, $('.fq-xiala'));
    xiala.init();
}

//下拉初始
window.fq = {};
//param
//数据 类型
fq.xiala = function (data, obj) {
    o = this;
    this.type = obj.attr('type');
    this.clickflag = false;
    this.xialaclickflag = false;
    this.init = function () {
        obj.not(".secondary-menu").hover(function () {
            // 展开
            if ($(this).attr('type') == 'hov') {
                obj.find('ul:eq(0)').hide();
                //小三角
                $(this).find('i').removeClass('icon-xiala').addClass('icon-zhankai');
                //下拉框样式
                $(this).addClass('xiala-cur').find('.fq-xiala-sel').css({
                    'border-bottom': '0px',
                    'border-radius': '4px 4px 0px 0px'
                });
                //下拉
                $(this).find('ul:eq(0)').slideDown(100);
            }
            // 隐藏
        }, function () {
            obj.removeClass('xiala-cur').find('ul:eq(0)').slideUp(100, function () {
                $(this).parent().find('.fq-xiala-sel').css({
                    'border-bottom': '1px solid #e6e6e6',
                    'border-radius': '4px'
                });
            });
            obj.find('i').removeClass('icon-zhankai').addClass('icon-xiala');
            // delete o.xiala;
        });
        // li悬停和点击添加到span  .fq-xiala是  div
        $('.fq-xiala ul li').not(".fq-menu").hover(function () {
            $(this).addClass('hov');
        }, function () {
            $(this).removeClass('hov');
            // unbind清除选中元素
        }).unbind().click(function () {
            if ($(this).parent("ul").children(".menuChildren")[0] == undefined) {
                $(this).parent("ul").find(".cur").removeClass("cur");
            } else {
                $(this).parents("ul").find(".cur").removeClass("cur");
            }
            $(this).addClass('cur').parents('.fq-xiala').find('.fq-xiala-sel').html($(this).html());
            obj.removeClass('xiala-cur').find('ul:eq(0)').slideUp(100, function () {
                $(this).parent().find('.fq-xiala-sel').css({
                    'border-bottom': '1px solid #e6e6e6',
                    'border-radius': '4px'
                });
            });
            obj.find('i').removeClass('icon-zhankai').addClass('icon-xiala');
            //部门启用、关闭切换事件
            if ($(this).parent().parent().attr('id') == "DptEnable") {
                DptBind($(this).attr("data-value"));
            }
            //省份、城市、区域三级联动新增页面
            if ($(this).parent().parent().attr('id') == "Province_Add") {
                // 绑定城市信息
                propertyPage.ajaxRequestCityBind(propertyPage.getParams(propertyPage.CITYBIND));
            }
            if ($(this).parent().parent().attr('id') == "City_Add") {
                // 绑定城市信息
                propertyPage.ajaxRequestDistrictBind(propertyPage.getParams(propertyPage.DISTRICTBIND));
            }
            //省份、城市、区域三级联动编辑页面
            if ($(this).parent().parent().attr('id') == "Province_Edit") {
                // 编辑城市信息
                propertyPage.ajaxRequestUptCityBind(propertyPage.getParams(propertyPage.CITYUPTBIND));
            }
            if ($(this).parent().parent().attr('id') == "City_Edit") {
                // 编辑区域信息
                propertyPage.ajaxRequestDistrictUptBind(propertyPage.getParams(propertyPage.DISTRICTUPTBIND));
            }
        });


        // 点击二级菜单
        $('.fq-menu>span').click(function () {
            $(this).parents("ul").find('.cur').removeClass('cur');
            $(this).parent().addClass('cur').parents('.fq-xiala').find('.fq-xiala-sel').html($(this).html());
            obj.removeClass('xiala-cur').find('ul:eq(0)').slideUp(100, function () {
                $(this).parents().find('.fq-xiala-sel').css({
                    'border-bottom': '1px solid #e6e6e6',
                    'border-radius': '4px'
                });
            });
            obj.find('i').removeClass('icon-zhankai').addClass('icon-xiala');
        });
        //点击span 出现下拉框fq-xiala-sel
        obj.find('span.fq-xiala-sel').unbind().click(function () {
            if ($(this).parent().attr('type') == 'click') {
                o.clickflag = !o.clickflag;
                o.xiala = $(this).parent();
                o.xiala.find('i').removeClass('icon-xiala').addClass('icon-zhankai');
                o.xiala.addClass('xiala-cur').find('.fq-xiala-sel').css({
                    'border-bottom': '0px',
                    'border-radius': '4px 4px 0px 0px'
                });
                o.xiala.find('ul:eq(0)').slideDown(100);
            }
        });
        addListener(document.body, "click", function () {
        });


    }

}

// ly二级菜单下拉
$(".fq-xiala").click(function () {
    var li = $(this).children("ul").find("li");
    li.each(function () {
        if ($(this).children("ul")[0] == undefined) {
            $(this).children("b").hide();
        }
    })
})

$('.fq-xiala').on('click', 'b', function () {
    if ($(this).parent('li').children("ul")[0]) {
        $(this).parent('li').siblings('li').children('b').removeClass('icon-shangsanjiaoxing-copy');
        $(this).parent('li').siblings('li').children('ul').slideUp();
        $(this).parent().children('ul').slideToggle();
        $(this).toggleClass('icon-shangsanjiaoxing-copy');
    }
})
function addListener(element, e, fn) {
    element.addEventListener ? element.addEventListener(e, fn, false) : element.attachEvent("on" + e, fn)
};
function removeListener(element, e, fn) {
    element.removeEventListener ? element.removeEventListener(e, fn, false) : element.detachEvent("on" + e, fn)
};

function alert_yz(mes) {
    mes = mes;
    var str = '<div class="fq-yz-wraper"><div class="fq-yz-mask"></div><div class="fq-yzkuang"><h2>消息</h2><div class="fq-yz-message"><p>' + mes + '</p><button class="fq-btn fq-yz-btn">确定</button></div></div></div>';
    $('body').append(str);
    $('.fq-yz-btn,.fq-yz-mask').on('click', function () {
        $('.fq-yz-wraper').remove();
    });
    return false;
}
// function password_yz(str) {
//     if (str == '') {
//         // alert_yz('请输入密码！');
//         return messageBox.show('提示', "请输入密码 ！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
//         // return false;
//     }
//     var myreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
//     if (!myreg.test(str)) {
//         // return alert_yz('请输入8~16位包含数字和英文字母！');//密码组合
//         return messageBox.show('提示', "请输入8~16位包含数字和英文字母！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
//     }
//     return str;
// }


var requestKey;
//面板切换函数初始1
//panel_tab($('.btn-propertydetail'),
// $('.modal-mask,.btn-cancel,.btn-keep'),
// $('.alert-modal-wraper'));
//btnobj：显示面板的按钮样式,maskobj_：隐藏面板的按钮样式,wrap:主面板
//注意：按钮的type要和弹窗div的样式一致
//操作日志
// panel_tab2($('.btn-propertyedit'), $('.modal-mask,.btn-cancel,.btn-keep'), $('.alert-modal-wraper'));
// panel_tab($('.btn-propertyadd,.btn-repairadd,.btn-checktableadd,.btn-contractadd,.property-room-status,.btn-roomedit'),
//  $('.modal-mask,.btn-cancel,.btn-keep'), $('.alert-modal-wraper'));
var panel_tab = function (btnobj, maskobj_, wrap) {
    var animatenum = 0;
    var dir;

    func = function () {
        // 按下按钮
        panelshow = function () {
            btnobj.click(function () {
                //部门编辑判断
                if ($(this).attr('type') == "department-edit") {
                    if ($(".employee-tree-ul li[class='active']").length > 0) {
                        var charId = $(".employee-tree-ul li[class='active']:last").attr("id");
                        DptEditBind(charId);
                    }
                    else {
                        messageBox.show("提示", "请先选择部门 ！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
                        return false;
                    }
                }
                wrap.show();
                animatenum++;
                dir = $(this).attr('dir');
                if (dir == 'right') {
                    // wrap.find('>div').eq(1).find('>div').hide();
                    //4.6修改
                    // wrap.find('>div').eq(1).show();
                    wrap.find('>div').eq(2).hide();
                    $('.' + $(this).attr('type')).show();
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').removeClass('cur').eq(0).addClass('cur');
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').eq(0).show();
                    //wrap.find('div').eq(1).find('div').eq(0).show();
                    wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                    });
                } else if (dir == 'top') {

                    //4.6号修改
                    // wrap.find('>div').eq(1).hide();
                    wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                    });
                    wrap.find('>div').eq(2).find('>div').hide();
                    $('.' + $(this).attr('type')).show();
                    wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                    });

                    if (animatenum == 1) {//直接打开中间面板
                        // wrap.find('>div').eq(1).hide();
                        $('.' + $(this).attr('type')).show();
                        wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                            getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                        });
                    } else if (animatenum == 2) {//在右面板中打开中间面板
                        $('.' + $(this).attr('type')).show();
                        wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                            wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                                getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                            });
                        });
                    }
                }
                ;
            });
        };
        panelshow();
// 取消按钮
        panelhide = function () {
            maskobj_.unbind('click').click(function () {
                if (dir == 'top') {
                    if (animatenum == 1) {
                        wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                            wrap.hide();
                            $(this).hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                    } else if (animatenum == 2) {
                        wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                            $(this).hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                        wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                            getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                        });
                    }
                    wrap.show();
                    dir == 'right';
                } else if (dir == 'right') {
                    wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);

                    });
                    //ly4-20由0改成-770px
                    wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                        wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        $(this).show();
                        //ly4-20添加代码
                        wrap.hide();
                    });
                }
                animatenum--;
            });
        };
        panelhide();

        panelmenu = function () {
            wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').click(function () {
                wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li.cur').removeClass('cur');
                $(this).addClass('cur');
                wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').hide().eq($(this).index()).show();
            });
        };
        panelmenu();
    };
    func();
    //ly添加代码
    $("#quxiao,.quxiao").on("click", function () {
        wrap.hide();
        $(".alert-modal-wraper").hide();
        $(".modal-con").hide();
    });
    // ly4.7添加代码
    $(".quxiao1").on("click", function () {
        $(".top-modal").hide();
        $(".right-modal").show().css("right", "0");
    });
    $(".modal-mask").on("click", function () {
        wrap.hide();
    });

    //滚动条高度设置
    getheightfoo = function (obj, dir) {
        var topHeight;
        var bottomHeight;
        var mCustomScrollbarHeight;
        var mCustomScrollbarComwrap;
        if (dir == 'top') {
            topHeight = 52;
            bottomHeight = 50;
            mCustomScrollbarComwrap = obj.parent();
            mCustomScrollbarComwrapHeight = (mCustomScrollbarComwrap.height() >= 600 ? 600 : mCustomScrollbarComwrap.height());
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        if (dir == 'right') {
            mCustomScrollbarComwrap = obj.parent().parent().parent().parent();
            if (mCustomScrollbarComwrap.find('>div').length == 2) {
                topHeight = 52;
            } else {
                topHeight = 110;
            }
            if (obj.next().length > 0) {
                bottomHeight = obj.next().height();
            }
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        obj.addClass('mCustomScrollbarCur').height(mCustomScrollbarHeight);

    };
    window.onresize = function () {
        getheightfoo(wrap.find('.mCustomScrollbarCur'), dir);
        // getheightfoo($(".fq-contain-in"), "top");
    }
};

//只针对物业中物业编辑（暂时未处理）
//面板切换函数初始1,
//panel_tab($('.btn-propertydetail'), $('.modal-mask,.btn-cancel,.btn-keep'), $('.alert-modal-wraper'));
//btnobj：显示面板的按钮样式,maskobj_：隐藏面板的按钮样式,wrap:主面板
//注意：按钮的type要和弹窗div的样式一致
//操作日志
// panel_tab2($('.btn-propertyedit'), $('.modal-mask,.btn-cancel,.btn-keep'), $('.alert-modal-wraper'));

// panel_tab($('.btn-propertyadd,.btn-repairadd,.btn-checktableadd,.btn-contractadd,.property-room-status,.btn-roomedit'),
//  $('.modal-mask,.btn-cancel,.btn-keep'), $('.alert-modal-wraper'));
var panel_tab2 = function (btnobj, maskobj_, wrap) {
    var dir;
    func = function () {
        panelshow = function () {
            btnobj.click(function () {
                wrap.show();
                dir = $(this).attr('dir');
                if (dir == 'right') {
                    wrap.find('>div').eq(1).find('>div').hide();
                    $('.' + $(this).attr('type')).show();
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').removeClass('cur').eq(0).addClass('cur');
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').eq(0).show();
                    wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                    });
                } else {
                    $('.' + $(this).attr('type')).show();
                    wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                        wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                            getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                        });
                    });
                }
                ;
            });
        };
        panelshow();
        panelhide = function () {
            maskobj_.unbind('click').click(function () {
                // if (dir == 'top') {
                //    wrap.find('>div').eq(2).show().animate({ 'top': '-200%' }, 300, function () {
                //        $(this).hide();
                //        wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                //        wrap.find('>div').eq(1).animate({ 'right': '0' }, 300, function () {
                //            getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                //        });
                //    });
                // } else if (dir == 'right') {
                //    wrap.find('>div').eq(1).animate({ 'right': '-770px' }, 300, function () {
                //        wrap.hide();
                //        wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                //    });
                // }
            });
        };
        panelhide();
        panelmenu = function () {
            wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').click(function () {
                wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li.cur').removeClass('cur');
                $(this).addClass('cur');
                wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').hide().eq($(this).index()).show();
            });
        };
        panelmenu();
    };
    func();
    //滚动条高度设置
    getheightfoo = function (obj, dir) {
        var topHeight;
        var bottomHeight;
        var mCustomScrollbarHeight;
        var mCustomScrollbarComwrap;
        if (dir == 'top') {
            topHeight = 52;
            bottomHeight = 50;
            mCustomScrollbarComwrap = obj.parent();
            mCustomScrollbarComwrapHeight = (mCustomScrollbarComwrap.height() >= 600 ? 600 : mCustomScrollbarComwrap.height());
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        if (dir == 'right') {
            mCustomScrollbarComwrap = obj.parent().parent().parent().parent();
            if (mCustomScrollbarComwrap.find('>div').length == 2) {
                topHeight = 52;
            } else {
                topHeight = 110;
            }
            if (obj.next().length > 0) {
                bottomHeight = obj.next().height();
            }
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        obj.addClass('mCustomScrollbarCur').height(mCustomScrollbarHeight);

    };
    window.onresize = function () {
        getheightfoo(wrap.find('.mCustomScrollbarCur'), dir);
        getheightfoo($(".fq-contain-src"), dir);
    }
};

//面板切换函数初始
var panel_tab_3 = function (btnobj, maskobj_, wrap) {
    var animatenum = {
        right: 0,
        top: 0
    };
    var mobj = {};
    var type, dir;
    func = function () {
        panelshow = function () {
            btnobj.click(function () {
                wrap.show();
                dir = $(this).attr('dir');
                type = $(this).attr('type');
                mobj[type] = 1;
                if (dir == 'right') {
                    animatenum.right++;
                    wrap.find('>div').eq(1).find('>div').hide();
                    if (animatenum.right == 1) {
                        wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').removeClass('cur').eq(0).addClass('cur');
                        wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').eq(0).show();
                        wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                            getheightfoo($('.' + type).find('.mCustomScrollbar'), dir);
                        });
                    } else if (animatenum.right == 2) {
                        //$('.' + type).find('div[show=true]').show();
                        wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                            wrap.find('>div').eq(1).find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                            wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                                getheightfoo($('.' + type).find('.mCustomScrollbar'), dir);
                            });
                        });
                    }
                    $('.' + dir + '-modal').show();
                } else if (dir == 'top') {
                    animatenum.top++;
                    wrap.find('>div').eq(2).find('>div').hide();
                    $('.' + type).show();
                    if (animatenum.top == 1) {
                        wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                            getheightfoo($('.' + type).find('.mCustomScrollbar'), dir);
                        });

                    } else if (animatenum.top == 2) {
                        wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                            wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                                getheightfoo($('.' + type).find('.mCustomScrollbar'), dir);
                            });
                        });
                    }
                }
                ;
            });
        };
        panelshow();
        panelhide = function () {
            maskobj_.unbind('click').click(function () {
                if (dir == 'top') {
                    if (animatenum.top == 1) {
                        wrap.find('>div').eq(2).animate({'top': '-200%'}, 300, function () {
                            wrap.hide();
                            $(this).hide();
                            $('.' + type).find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                    } else if (animatenum.top == 2) {
                        dir = 'right';
                        wrap.find('>div').eq(2).animate({'top': '-200%'}, 300, function () {
                            $(this).hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                            wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                                getheightfoo($('.' + type).find('.mCustomScrollbar'), dir);

                            });
                        });
                    }
                    dir = 'right';
                } else if (dir == 'right') {
                    if (animatenum.right == 1) {
                        wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                            wrap.hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                    } else if (animatenum.right == 2) {
                        wrap.find('>div:eq(1)').animate({'right': '-770px'}, 300, function () {
                            // $(this).attr('show','0');
                            $('.' + type).find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                            wrap.find('>div:eq(1)').animate({'right': '0'}, 300, function () {
                                $('.' + type).find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                            });
                        });
                    }
                }
                animatenum--;
            });
        };
        panelhide();

        panelmenu = function () {
            wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').click(function () {
                wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li.cur').removeClass('cur');
                $(this).addClass('cur');
                wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').hide().eq($(this).index()).show();
            });
        };
        panelmenu();
    };
    func();

    //滚动条高度设置
    getheightfoo = function (obj, dir, type) {
        var topHeight;
        var bottomHeight;
        var mCustomScrollbarHeight;
        var mCustomScrollbarComwrap;
        if (dir == 'top') {
            topHeight = 52;
            bottomHeight = 50;
            mCustomScrollbarComwrap = obj.parent();
            mCustomScrollbarComwrapHeight = (mCustomScrollbarComwrap.height() >= 600 ? 600 : mCustomScrollbarComwrap.height());
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        if (dir == 'right') {
            mCustomScrollbarComwrap = obj.parent().parent().parent().parent();
            if (mCustomScrollbarComwrap.find('>div').length == 2) {
                topHeight = 52;
            } else {
                topHeight = 110;
            }
            if (obj.next().length > 0) {
                bottomHeight = obj.next().height();
            }
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        obj.addClass('mCustomScrollbarCur').height(mCustomScrollbarHeight);//alert(mCustomScrollbarHeight);
    };
    window.onresize = function () {
        getheightfoo(wrap.find('.mCustomScrollbarCur'), dir, auto);
    }
};

//分页组件
/*pagerow:一页显示条数;total:总数*/
function fyfoo(pagerow, total, foo) {
    var fqthis = this;
    fqthis.total = total;
    // 计算有多少页
    var pages = (total % pagerow == 0) ? total / pagerow : parseInt(total / pagerow) + 1;
    fqthis.pages = pages;
    // 初始化页数
    var pagenum = 1;

    var activenum;
    fqthis.curpage = 1;

    var listr = '<ul><li class="fy-page-dir previous"><i class="icon iconfont icon-xiangqingyedatuzuofanye"></i></li><li><a>1</a></li><li class="fy-page-dir next"><i class="icon iconfont icon-xiangqingyedatuyoufanye"></i></li><li class="page-total">共<font>32</font>条</li></ul>';
    if (total > 0) {
        // prepend() 插入
        $('.fy-wrap').prepend(listr);
    } else {
        return false;
    }
    // pages 页数
    // 插入12345页
    var imax = pages > 5 ? 5 : pages;
    for (var i = 2; i <= imax; i++) {
        var listrpage = '<li><a>' + i + '</a></li>';
        $('.next').before(listrpage);
    }
    $('.page-total font').html(total);
    fqthis.fybtnreload = function () {
        if (fqthis.pages != pages) {
            if (pages == 0) {
                $('.fy-wrap').remove();
            }
            if (pages > 0 && pages < 5) {
                $('.fy-wrap').prepend(listr);
                for (var i = 2; i <= pages; i++) {
                    var listrpage = '<li><a>' + i + '</a></li>';
                    $('.next').before(listrpage);
                }
            }
            // 改变当前页样式 变蓝色
            fybtn.eq(pagenum).addClass('active');
            // 显示总条数
            $('.page-total font').html(fqthis.total);
        }
    }
    // 向前翻页按钮
    btnpre = $('.previous');
    // 向后翻页按钮
    btnnext = $('.next');
    // not（） 从匹配元素中删除元素
    fybtn = $('.fy-wrap ul li').not('.previous,.next,.page-total');
    fybtn.eq(0).addClass('active');
    // 上一页
    btnpre.on('click', function () {
        /*pagerow:一页显示条数;total:总数*/
        if (fqthis.total != total) {
            // 页数
            pages = (fqthis.total % pagerow == 0) ? fqthis.total / pagerow : parseInt(fqthis.total / pagerow) + 1;

        }
        if (fybtn.eq(activenum).find('a').html() == '1') {
            return false;
        }
        activenum = fybtn.index($('.active'));
        if (fybtn.eq(0).find('a').html() == '1' || activenum >= 3) {
            activenum--;
            fybtn.removeClass('active');
            fybtn.eq(activenum).addClass('active');
        } else {
            if (pages > 5) {
                fybtn.each(function (index, element) {
                    var num = parseInt($(element).find('a').html()) - 1;
                    $(element).find('a').html(num);
                })
            }
        }
        pagenum = parseInt(fybtn.eq(activenum).find('a').html());
        foo(pagenum);
    });
    // 下一页
    btnnext.on('click', function () {
        if (fqthis.total != total) {
            pages = (fqthis.total % pagerow == 0) ? fqthis.total / pagerow : parseInt(fqthis.total / pagerow) + 1;
        }
        if (fybtn.eq(activenum).find('a').html() == pages) {
            return false;
        }
        activenum = fybtn.index($('.active'));
        if (fybtn.last().find('a').html() == pages || activenum <= 1) {
            activenum++;
            fybtn.removeClass('active');
            fybtn.eq(activenum).addClass('active');
        } else {
            if (pages > 5) {
                fybtn.each(function (index, element) {
                    var num = parseInt($(element).find('a').html()) + 1;
                    $(element).find('a').html(num);
                });
            }
        }
        pagenum = parseInt(fybtn.eq(activenum).find('a').html());
        foo(pagenum);
    });
    // 点击12345
    fybtn.click(function () {
        fybtn.removeClass('active');
        $(this).addClass('active');
        activenum = fybtn.index($(this));
        pagenum = parseInt($(this).find('a').html());
        foo(pagenum);
    });
}
//分页组件2
/*pagerow:一页显示条数;total:总数;foo:点击页码调用函数;fywrap:分页容器*/
function fyfoo2(pagerow, total, foo, fywrap) {
    var fqthis = this;
    fqthis.total = total;
    var pages = (total % pagerow == 0) ? total / pagerow : parseInt(total / pagerow) + 1;
    fqthis.pages = pages;
    var pagenum = 1;
    var activenum;
    /**
     * ly
     */
    // var btnpre = fywrap.find('.previous');
    // var btnnext = fywrap.find('.next');
    // var fybtn = fywrap.find('ul li').not('.previous,.next,.page-total');

    // fybtn = fywrap.find('ul li').not('.previous,.next,.page-total');
    fqthis.curpage = 1;
    var listr = '<ul><li class="fy-page-dir previous"><i class="icon iconfont icon-xiangqingyedatuzuofanye"></i></li><li><a>1</a></li><li class="fy-page-dir next"><i class="icon iconfont icon-xiangqingyedatuyoufanye"></i></li><li class="page-total">共<font>32</font>条</li></ul>';
    if (total > 0) {
        fywrap.prepend(listr);
    } else {
        return false;
    }
    var imax = pages > 5 ? 5 : pages;
    for (var i = 2; i <= imax; i++) {
        var listrpage = '<li><a>' + i + '</a></li>';
        fywrap.find('.next').before(listrpage);
    }
    fywrap.find('.page-total font').html(total);
    fqthis.fybtnreload = function () {
        if (fqthis.pages != pages) {
            if (pages == 0) {
                fywrap.remove();
            }
            if (pages > 0 && pages < 5) {
                fywrap.prepend(listr);
                for (var i = 2; i <= pages; i++) {
                    var listrpage = '<li><a>' + i + '</a></li>';
                    fywrap.find('.next').before(listrpage);
                }
            }
            fybtn.eq(pagenum).addClass('active');
            // fybtn.eq(pagenum).addClass('active').siblings("li").removeClass('active');
            fywrap.find('.page-total font').html(fqthis.total);
        }
    }
    btnpre = fywrap.find('.previous');
    btnnext = fywrap.find('.next');
    fybtn = fywrap.find('ul li').not('.previous,.next,.page-total');
    fybtn.eq(0).addClass('active');
    btnpre.on('click', function () {
        var fybtn= $(this).parents('ul').find('li').not('.previous,.next,.page-total');
        if (fqthis.total != total) {
            pages = (fqthis.total % pagerow == 0) ? fqthis.total / pagerow : parseInt(fqthis.total / pagerow) + 1;
        }
        activenum = $(this).parents('ul').find('li.active').index()-1;
        if (fybtn.eq(activenum).find('a').html() == '1') {
            return false;
        }
        if (fybtn.eq(0).find('a').html() == '1' || activenum >= 3) {
            activenum--;
            fybtn.removeClass('active');
            fybtn.eq(activenum).addClass('active');
        } else {
            if (pages > 5) {
                fybtn.each(function (index, element) {
                    var num = parseInt($(element).find('a').html()) - 1;
                    $(element).find('a').html(num);
                })
            }
        }
        pagenum = parseInt(fybtn.eq(activenum).find('a').html());
        foo(pagenum);
    });
    btnnext.on('click', function () {
        var fybtn= $(this).parent('ul').find('li').not('.previous,.next,.page-total');
        if (fqthis.total != total) {
            pages = (fqthis.total % pagerow == 0) ? fqthis.total / pagerow : parseInt(fqthis.total / pagerow) + 1;
        }
        if (fybtn.eq(activenum).find('a').html() == pages) {
            return false;
        }
        // activenum = fybtn.index($('.active'));
        activenum = $(this).parents('ul').find('li.active').index()-1;
        if (fybtn.last().find('a').html() == pages || activenum <= 1) {
            activenum++;
            fybtn.removeClass('active');
            fybtn.eq(activenum).addClass('active');
        } else {
            if (pages > 5) {
                fybtn.each(function (index, element) {
                    var num = parseInt($(element).find('a').html()) + 1;
                    $(element).find('a').html(num);
                });
            }
        }
        pagenum = parseInt(fybtn.eq(activenum).find('a').html());
        foo(pagenum);
    });
    fybtn.click(function () {
        // fybtn.removeClass('active');
        var fybtn=$(this).parent('ul').find('li').not('.previous,.next,.page-total');
        $(this).addClass('active').siblings('li').removeClass('active');
        activenum = fybtn.index($(this));
        // console.log(activenum);
        pagenum = parseInt($(this).find('a').html());
        foo(pagenum);
    });
}

//原生class样式类方法
function _classobj() {
    var getclassthis = this;
    this._hasClass = function (obj, cls) {
        if (!obj.className) {
            return true;
        } else {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }
    }
    this._addClass = function (obj, cls) {
        // alert('cc')
        if (!getclassthis._hasClass(obj, cls)) obj.className += " " + cls;
    }
    this._removeClass = function (obj, cls) {
        if (getclassthis._hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            if (!obj.className) {
                return false;
            }
            obj.className = obj.className.replace(reg, ' ');
        }
    }
    this._toggleClass = function (obj, cls) {
        if (getclassthis._hasClass(obj, cls)) {
            getclassthis._removeClass(obj, cls);
        } else {
            getclassthis._addClass(obj, cls);
        }
    }
    return this;
};

_classobj();
//原生click方法待改
function _clickinit() {
    var clickthis = this;
    clickthis._click = function (targetobj, wrapobj, foo) {
        var index;
        $(wrapobj).find(targetobj).click(function () {
            index = $(wrapobj).find(targetobj).index($(this));
            var thisobj = this;
            foo.apply(this, thisobj);
            foo();
        });
        $(wrapobj).find(targetobj).eq(index).click();
    }
    return clickthis;
};
_clickinit();

// X._click('dd','.property-nav2-dl',function(){
//     alert('X');
//     _removeClass(this,'cur')
//     _addClass(this,'cur');
// })
// function headinit(){
//     var str = '<div id="header"><p></p><ul><li id="isValid"></li><li><img src="images/yg_icon_05.png"><span id="username"></span><div class="xiala-account"><ul><li><i></i><span>个人中心</span></li><li id="loginOut"><i></i><span>安全退出</span></li></ul></div></li><li><img src="images/yg_icon_07.png"><span>8</span></li></ul></div>';
//     $('body>div:eq(0)').html(str);
//     $('.xiala-account ul li:eq(0)').on('click', function () {
//         $('.fq-nav-wrap ul li').removeClass('sel');
//         window.location.href = "ownercenter.html";
//     });
// }
// headinit();
$('.xiala-account ul li:eq(0)').on('click', function () {
    $('#iFrmMain', parent.document).attr('src', "ownercenter.html");
});

$(".calendar-container table td").on("click", function () {
    if ($(this).children().text() == "") {
        return;
    } else {
        $("table td").removeClass('cur');
        $(this).addClass('cur');
    }

});
//3.31修改代码
// message 页面的代码
$(".contain-dailyrecord-right").click(function () {
    $(".contain-dailyrecord-wang").removeClass("contain-dailyrecord-center").addClass("contain-dailyrecord-weidu");
    $(".contain-dailyrecord-center .right").css("color", "#818181");

});
$(".contain-dailyrecord-center .right").click(function () {
    $(this).parent().parent().removeClass("contain-dailyrecord-center").addClass("contain-dailyrecord-weidu");
    $(this).css("color", "#818181");
});
// 合同页面的默认日期月初和月末
function getFirst(year, month) {
    var firstdate = year + '-' + month + '-01';
    return firstdate;
}
function lastMonthDay(year, month) {
    var day = new Date(year, month, 0);
    var lastdate = year + '-' + month + '-' + day.getDate();
    return lastdate;
}

var myDate = new Date();
// 本月月份
var fMonth;
if (myDate.getMonth() + 1 <= 9) {
    fMonth = "0" + (myDate.getMonth() + 1);
} else {
    fMonth = (myDate.Month() + 1);
}
$("#StartDate").val(getFirst(myDate.getFullYear(), fMonth));
$("#EndDate").val(lastMonthDay(myDate.getFullYear(), fMonth));

// 日历默认值
var myRili = new Date();
var aMonth, aDay;
if (myRili.getMonth() + 1 <= 9) {
    aMonth = "0" + (myRili.getMonth() + 1);
} else {
    aMonth = (myRili.Month() + 1);
}
if (myRili.getDate() <= 9) {
    aDay = "0" + myRili.getDate();
} else {
    aDay = myRili.getDate();
}
$("#StartDate-day").val(myRili.getFullYear() + "-" + aMonth + "-" + aDay);


//ly5.9
var dir;
var animatenum = 0;
var panel_tab5 = function (btnobj, maskobj_, wrap) {
    func = function () {
        // 按下按钮
        panelshow = function () {
            btnobj.unbind('click').click(function () {
                /**
                 * BEGIN 员工明细 显示
                 * Author:liyong
                 * Date:2017-05-12
                 */
                //$(".fq-alert-modal-look").show();
                //部门编辑判断
                if ($(this).attr('type') == "department-edit") {
                    if ($(".employee-tree-ul li[class='active']").length > 0) {
                        var charId = $(".employee-tree-ul li[class='active']:last").attr("id");
                        DptEditBind(charId);
                    }
                    else {
                        return messageBox.show("提示", "请先选择部门 ！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
                    }
                }
                wrap.show();
                animatenum++;
                dir = $(this).attr('dir');
                if (dir == 'right') {
                    wrap.find('>div').eq(1).find('>div').hide();
                    //ly4.6修改
                    // wrap.find('>div').eq(1).show();
                    wrap.find('>div').eq(2).hide();
                    $('.' + $(this).attr('type')).show();
                    //ly5.9
                    $(".fq-alert-modal-yg").show();
                    $(".fy-wrap3").hide();
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').removeClass('cur').eq(0).addClass('cur');
                    wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').eq(0).show();
                    //wrap.find('div').eq(1).find('div').eq(0).show();
                    wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                    });
                } else if (dir == 'top') {
                    //ly4.6号修改
                    // wrap.find('>div').eq(1).hide();
                    wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                    });
                    wrap.find('>div').eq(2).find('>div').hide();
                    $('.' + $(this).attr('type')).show();
                    wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                    });

                    if (animatenum == 1) {//直接打开中间面板
                        // wrap.find('>div').eq(1).hide();
                        $('.' + $(this).attr('type')).show();
                        wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                            getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                        });
                    } else if (animatenum == 2) {//在右面板中打开中间面板
                        $('.' + $(this).attr('type')).show();
                        wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                            wrap.find('>div').eq(2).show().animate({'top': '0'}, 300, function () {
                                getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                            });
                        });
                    }
                }
                ;
            });
        };
        panelshow();
// 取消按钮
        panelhide = function () {
            maskobj_.unbind('click').click(function () {
                /**
                 * BEGIN 面板关闭后租金下的提示隐藏
                 * Author:liyong
                 * Date:2017-05-10
                 * @param null
                 */
                $("#RentalMax_Add").tooltip('hide');
                if (dir == 'top') {
                    if (animatenum == 1) {
                        wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                            wrap.hide();
                            $(this).hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                    } else if (animatenum >= 2) {
                        wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                            $(this).hide();
                            wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        });
                        wrap.find('>div').eq(1).animate({'right': '0'}, 300, function () {
                            getheightfoo(wrap.find('>div').eq(1).find('.mCustomScrollbar'), dir);
                        });
                    }
                    wrap.show();
                    dir = 'right';
                } else if (dir == 'right') {
                    wrap.find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                        getheightfoo(wrap.find('>div').eq(2).find('.mCustomScrollbar'), dir);
                    });
                    //ly4-20由0改成-770px
                    wrap.find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
                        wrap.find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
                        $(this).show();
                        //ly4-20添加代码
                        wrap.hide();
                        // 面板切换重合解决
                        $('.fq-alert-modal-dv').hide();

                    });

                }
                //关闭提示
                $(".tixing").tooltip('hide');
                animatenum--;
            });


        };
        panelhide();

        panelmenu = function () {
            wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li').click(function () {
                wrap.find('>div').eq(1).find('>div').find('>div').eq(1).find('ul li.cur').removeClass('cur');
                $(this).addClass('cur');
                wrap.find('>div').eq(1).find('>div').find('>div').eq(2).find('>div').hide().eq($(this).index()).show();
            });
        };
        panelmenu();
    };
    func();
    //滚动条高度设置
    getheightfoo = function (obj, dir) {
        var topHeight;
        var bottomHeight;
        var mCustomScrollbarHeight;
        var mCustomScrollbarComwrap;
        if (dir == 'top') {
            topHeight = 52;
            bottomHeight = 50;
            mCustomScrollbarComwrap = obj.parent();
            mCustomScrollbarComwrapHeight = (mCustomScrollbarComwrap.height() >= 600 ? 600 : mCustomScrollbarComwrap.height());
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        if (dir == 'right') {
            mCustomScrollbarComwrap = obj.parent().parent().parent().parent();
            if (mCustomScrollbarComwrap.find('>div').length == 2) {
                topHeight = 52;
            } else {
                topHeight = 110;
            }
            if (obj.next().length > 0) {
                bottomHeight = obj.next().height();
            }
            mCustomScrollbarHeight = mCustomScrollbarComwrap.height() - topHeight - bottomHeight;
        }
        obj.addClass('mCustomScrollbarCur').height(mCustomScrollbarHeight);
    };
    window.onresize = function () {
        getheightfoo(wrap.find('.mCustomScrollbarCur'), dir);
    }
};
// 保存按钮
var baocun = function () {
    // 保存6.7 liyong修改
    if (dir == 'top') {
        if (animatenum == 1) {
            $(".alert-modal-wraper").find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                $(".alert-modal-wraper").hide();
                $(this).hide();
                $(".alert-modal-wraper").find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
            });
        } else if (animatenum >= 2) {
            $(".alert-modal-wraper").find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
                $(this).hide();
                $(".alert-modal-wraper").find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
            });
            $(".alert-modal-wraper").find('>div').eq(1).animate({'right': '0'}, 300, function () {
                getheightfoo($(".alert-modal-wraper").find('>div').eq(1).find('.mCustomScrollbar'), dir);
            });
        }
        $(".alert-modal-wraper").show();
        dir = 'right';
    } else if (dir == 'right') {
        $(".alert-modal-wraper").find('>div').eq(2).show().animate({'top': '-200%'}, 300, function () {
            getheightfoo($(".alert-modal-wraper").find('>div').eq(2).find('.mCustomScrollbar'), dir);
        });
        //ly4-20由0改成-770px
        $(".alert-modal-wraper").find('>div').eq(1).animate({'right': '-770px'}, 300, function () {
            $(".alert-modal-wraper").find('.mCustomScrollbarCur').removeClass('.mCustomScrollbarCur');
            $(this).show();
            //ly4-20添加代码
            $(".alert-modal-wraper").hide();
            // 面板切换重合解决
            $('.fq-alert-modal-dv').hide();

        });

    }
    animatenum--;
};


/**
 *ly 正则验证
 * @constructor
 */
function RegularExpress() {
    arguments = arguments.length != 0 ? arguments[0] : arguments;
    // 姓名正则
    this.NAME_REG_EXP = arguments['NAME_REG_EXP'] ? arguments['NAME_REG_EXP'] : /^[\u4e00-\u9fa5]{1,6}$/;
    // 密码正则
    this.PWD_REG_EXP = arguments['PWD_REG_EXP'] ? arguments['PWD_REG_EXP'] : /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{8,16}$/;
    // 手机正则
    this.PHONE_REG_EXP = arguments['PHONE_REG_EXP'] ? arguments['PHONE_REG_EXP'] : /^([\d]{11}|[\d]{10})$/;
    // 月份正则
    this.MONTH_REG_EXP = arguments['MONTH_REG_EXP'] ? arguments['MONTH_REG_EXP'] : /^[1-9]\d*$/;
    // 金额正则
    this.MONEY_REG_EXP = arguments['MONEY_REG_EXP'] ? arguments['MONEY_REG_EXP'] : /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
    // 租客数正则
    this.CUSTOMER_REG_EXP = arguments['CUSTOMER_REG_EXP'] ? arguments['CUSTOMER_REG_EXP'] : /^[1-9]\d*$/;
    // 楼层数正则
    this.FLOORCOUNT_REG_EXP = arguments['FLOORCOUNT_REG_EXP'] ? arguments['FLOORCOUNT_REG_EXP'] : /^[1-9]\d*|0$/;
    // 层户数正则
    this.ROOMCOUNT_REG_EXP = arguments['ROOMCOUNT_REG_EXP'] ? arguments['ROOMCOUNT_REG_EXP'] : /^[1-9]\d*|0$/;
    // 面积正则
    this.AREA_REG_EXP = arguments['AREA_REG_EXP'] ? arguments['AREA_REG_EXP'] : /^\d{1,18}(.\d{1,18})?$/;
    // 房型正则
    this.ROOMLAYOUT_REG_EXP = arguments['AREA_REG_EXP'] ? arguments['AREA_REG_EXP'] : /^\d{1,18}(.\d{1,18})?$/;
    //度数正则
    this.DEGREE_REG_EXP = arguments['DEGREE_REG_EXP'] ? arguments['DEGREE_REG_EXP'] : /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/;
    //工号正则
    this.WORKNUMBER_REG_EXP = arguments['WORKNUMBER_REG_EXP'] ? arguments['WORKNUMBER_REG_EXP'] : /^[A-Za-z0-9]{1,10}$/;
    // 费用正则
    this.COST_REG_EXP = arguments['COST_REG_EXP'] ? arguments['COST_REG_EXP'] : /^\d{1,18}(.\d{1,18})?$/;
    // 日期正则
    this.ADVANCE_REG_EXP = arguments['ADVANCE_REG_EXP'] ? arguments['ADVANCE_REG_EXP'] : /^\+?[1-9][0-9]*$/;
    // 角色名称正则
    this.ROLE_REG_EXP = arguments['ROLE_REG_EXP'] ? arguments['ROLE_REG_EXP'] : /^([\u4e00-\u9fa5]||[A-Za-z0-9]){1,6}$/;
    // 验证码正则
    this.CODE_REG_EXP = arguments['CODE_REG_EXP'] ? arguments['CODE_REG_EXP'] : /^(\d{4})$/;
    //标签名正则
    this.LABEL_REG_EXP = arguments['LABEL_REG_EXP'] ? arguments['LABEL_REG_EXP'] : /^[\w\u4E00-\u9FA5\uF900-\uFA2D]{1,10}$/g;
}
// 姓名验证
RegularExpress.prototype.nameRegExpCheck = function (params) {
    var result = true;
    // 验证通过返回false,不通过返回true执行messageBOX
    if (this.NAME_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 密码验证
RegularExpress.prototype.passwordRegExpCheck = function (params) {
    var result = true;
    // 验证通过返回false,不通过返回true执行messageBOX
    if (this.PWD_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 手机验证
RegularExpress.prototype.phoneRegExpCheck = function (params) {
    var result = true;
    if (this.PHONE_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 月份验证
RegularExpress.prototype.monthRegExpCheck = function (params) {
    var result = true;
    if (this.MONTH_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 金额验证
RegularExpress.prototype.moneyRegExpCheck = function (params) {
    var result = true;
    if (this.MONEY_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 租客数验证
RegularExpress.prototype.customerRegExpCheck = function (params) {
    var result = true;
    if (this.CUSTOMER_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 楼层数验证
RegularExpress.prototype.floorCountRegExpCheck = function (params) {
    var result = true;
    if (this.FLOORCOUNT_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 层户数验证
RegularExpress.prototype.roomCountRegExpCheck = function (params) {
    var result = true;
    if (this.ROOMCOUNT_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 面积验证
RegularExpress.prototype.areaRegExpCheck = function (params) {
    var result = true;
    if (this.AREA_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 房型验证
RegularExpress.prototype.roomLayoutRegExpCheck = function (params) {
    var result = true;
    if (this.ROOMLAYOUT_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 度数验证
RegularExpress.prototype.degreeRegExpCheck = function (params) {
    var result = true;
    if (this.DEGREE_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 工号验证
RegularExpress.prototype.worknumberRegExpCheck = function (params) {
    var result = true;
    if (this.WORKNUMBER_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 费用验证
RegularExpress.prototype.costRegExpCheck = function (params) {
    var result = true;
    if (this.COST_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
// 日期验证
RegularExpress.prototype.advanceRegExpCheck = function (params) {
    var result = true;
    if (this.ADVANCE_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
//角色名称验证
RegularExpress.prototype.roleRegExpCheck = function (params) {
    var result = true;
    if (this.ROLE_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
//验证码验证
RegularExpress.prototype.codeRegExpCheck = function (params) {
    var result = true;
    if (this.CODE_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
//标签名验证
RegularExpress.prototype.labelRegExpCheck = function (params) {
    var result = true;
    if (this.LABEL_REG_EXP.test(params)) {
        result = false;
    }
    return result;
}
var regular = new RegularExpress();
