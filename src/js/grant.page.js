//面板切换
panel_tab5($('.btn-roleadd,.btn-roledetail'), $('.modal-mask,.btn-cancel'), $('.alert-modal-wraper'));
// 点击职务编辑
var flag = false;
(function () {
    $('.power-top-sec-right p').click(function () {
        $(".desk-right li").css("cursor", "pointer");
        $(this).hide().next().fadeIn();
        $('.power-ig').attr('src', $('.power-ig').attr('srcedit'));
        flag = true;
    });
// 点击取消
    $('.power-edit-ul li').click(function () {
        $(".desk-right li").removeAttr("style");
        $(this).parent().hide().prev().fadeIn();
        $('.power-ig').attr('src', $('.power-ig').attr('srccom'));
        flag = false;
    });
    /*ly6.6点击职务编辑*/
    $('.power-top-sec-right>p').click(function () {
        $(".desk-right li i").addClass("xianshi").hide();
        $(".desk-right li .xianshi").show();
    });
    // ly6.6点击取消，保存
    $('.power-top-sec-right>ul>li').click(function () {
        $(".desk-right li i").removeClass("xianshi").hide();
        $(".desk-right li .xianshi").show();
    });


// 点击选中菜单和物业的权限编辑
    $("#menu-content").on("click", "li", function () {
        if (flag == true) {
            $(this).children().eq(1).toggleClass("zd-blue");
            $(".desk-right li .zd-blue b").show();
        }
    });
    $("#power-content").on("click", ".power-right-bill li", function () {
        if (flag == true) {
            $(this).children().eq(1).toggleClass("zd-blue");
            $(".desk-right li .zd-blue b").show();
        }
    });

})(jQuery);


// 角色点击 悬停
$(".nav2-power ").on("click", "li", function () {
    flag = false;
    $(".power-edit-ul").hide().prev().fadeIn();
    $(".nav2-power li").removeClass("sel");
    $(this).addClass("sel");
    powerBind();
    rolePowerBind();
});

// 点击角色编辑
$(" .nav2-power #roles").on("click", "b", function () {
    var html = $(this).parent("li").find("span").html();
    $("#roleName_Edit").val(html);
})

/**
 * 
 * @constructor
 */
function GrantPage() {
    var arguments = arguments.length != 0 ? arguments[0] : arguments;
    this.init();
}

/**
 *
 * @param name
 * @returns {*}
 */
GrantPage.prototype.getParams=function (name) {
    var _this=this;
    var params=null;

    return params;
}

/**
 *
 * @returns {GrantPage}
 */
GrantPage.prototype.init=function () {
    return this;
}
var grant=new GrantPage();
