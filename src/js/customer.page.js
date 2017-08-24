panel_tab5($('.btn-customeradd,.btn-customercheck,.btn-edit,.meom-beiwang'),$('.modal-mask,.btn-cancel'),$('.alert-modal-wraper'));

$('.tag-ul').on('click', 'li', function () {
    if ($(this).hasClass('tagli-sel') == true) {
        $(this).removeClass('tagli-sel');
    } else {
        $(this).addClass('tagli-sel');
    }
})

/**
 * BEGIN 上拉列表
 * Author:liyong
 * Date:2017-05-10
 * @param null
 */
$(".fq-modal-bottom2 .icon").removeClass('icon-xiala').addClass('icon-zhankai');
$("#FollowType").hover(function () {
    DropupInit();
});

// liyong
function DropupInit() {
    var shangla;
    shangla = new fq.shangla(null, $('.fq-shangla'));
    shangla.init();
}

fq.shangla = function (data, obj) {
    o = this;
    this.type = obj.attr('type');
    this.clickflag = false;
    this.xialaclickflag = false;
    this.init = function () {
        obj.hover(function () {
            if ($(this).attr('type') == 'hov') {
                obj.find('ul').hide();
                $(this).find('i').removeClass('icon-zhankai').addClass('icon-xiala');
                $(this).addClass('xiala-cur').find('.fq-xiala-sel').css({ 'border-bottom': '0px', 'border-radius': '4px 4px 0px 0px' });
                $(this).find('ul').slideDown(100);
            }
        }, function () {
            obj.removeClass('xiala-cur').find('ul').slideUp(100, function () {
                $(this).parent().find('.fq-xiala-sel').css({ 'border-bottom': '1px solid #e6e6e6', 'border-radius': '4px' });
            });
            obj.find('i').removeClass('icon-xiala').addClass('icon-zhankai');
            // delete o.xiala;
        });
        $('.fq-shangla ul li').hover(function () {
            $(this).addClass('hov');
        }, function () {
            $(this).removeClass('hov');
        }).unbind().click(function () {
            $(this).parent().find('.cur').removeClass('cur');
            $(this).addClass('cur').parents('.fq-shangla').find('.fq-xiala-sel').html($(this).html());
            obj.removeClass('xiala-cur').find('ul').slideUp(100, function () {
                $(this).parent().find('.fq-xiala-sel').css({ 'border-bottom': '1px solid #e6e6e6', 'border-radius': '4px' });
            });
            obj.find('i').removeClass('icon-xiala').addClass('icon-zhankai');

            if ($(this).parent().parent().attr('id') == "DptEnable") {
                DptBind($(this).attr("data-value"));
            }

        });
        obj.find('span.fq-xiala-sel').unbind().click(function () {
            if ($(this).parent().attr('type') == 'click') {
                o.clickflag = !o.clickflag;
                o.xiala = $(this).parent();
                o.xiala.find('i').removeClass('icon-zhankai').addClass('icon-xiala');
                o.xiala.addClass('xiala-cur').find('.fq-xiala-sel').css({ 'border-bottom': '0px', 'border-radius': '4px 4px 0px 0px' });
                o.xiala.find('ul').slideDown(100);
            }
        });
        addListener(document.body, "click", function () {
        });
    }
}


