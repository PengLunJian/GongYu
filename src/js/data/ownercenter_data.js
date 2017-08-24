function ValidBind() {
    var txt = "";
    if (localStorage.getItem("isValid") != 1) {
        txt = "（未认证）";
    }
    else {
        txt = "（已认证）";
    }
    $("#IsValid").text(txt);
}

//更新密码
function PwdChange() {
    var data = {
        requestKey: localStorage.getItem("requestKey"),
        employeeCharId: localStorage.getItem("employeeCharId"),
        oldPwd: $("#OldPwd").val(),
        newPwd1: $("#NewPwd1").val(),
        newPwd2: $("#NewPwd2").val()
    };
    // 新密码验证8-16位数字字母
    if (regular.passwordRegExpCheck(data.newPwd1.trim())) {
        messageBox.show("警告", "请输入8-16位新密码！", MessageBoxButtons.OK, MessageBoxIcons.warning);
        return false;
    }
    // 判断新密码不能与当前密码相同
    if (data['oldPwd'] != '') {
        if (data['oldPwd']  == data['newPwd1'] ) {
            messageBox.show("提示", "新密码不能与当前密码相同！", MessageBoxButtons.OK, MessageBoxIcons.infomation);
            return false;
        }
    }
    $.ajax({
        type: "POST",
        url: host + "/identity/pwdresetuser",
        data: data,
        dataType: "json",
        success: function (jdata) {
            if (jdata.succ) {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
                $(".btn-confirm").click(function () {
                    data['oldPwd']='';
                    // 密码修改成功后跳转到登录页重新登录
                    window.parent.location.href = 'login.html';
                });
            } else {
                messageBox.show("提示", jdata.msg, MessageBoxButtons.OK, MessageBoxIcons.infomation);
            }


        },
        error: function (XMLHttpRequest, txtStatus, errorThrown) {
            messageBox.show("错误", txtStatus, MessageBoxButtons.OK, MessageBoxIcons.error);
        }
    });
}





