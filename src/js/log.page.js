// 日志查看权限
window.onload=function () {
    if(!webApp.grantControl($(".fq-contain-dv"), "log_select")){
        // 无权限查看
        webApp.noGrant();
    }

}
// 下拉函数调用
DropdownInit();

