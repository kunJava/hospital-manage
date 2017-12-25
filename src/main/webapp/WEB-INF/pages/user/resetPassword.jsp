<%--
  Created by IntelliJ IDEA.
  User: Kun
  Date: 2017/12/21 0021
  Time: 10:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<c:set var="base" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <title>铁脚板会员中心</title>
    <link rel="stylesheet" type="text/css" href="${base}/resources/andyui/admin/css/parts/module.css" />
    <link rel="stylesheet" type="text/css" href="${base}/resources/andyui/admin/css/parts/attribute.css" />
    <script src="${base}/resources/andyui/admin/js/andyui.js"></script>
    <script src="${base}/resources/layui/layui/layui.js"></script>
    <script src="${base}/resources/layui/layui/layuiUtil.js"></script>
</head>
<body>
<div  class="g-box1200 f-clear">
    <div class="row col-12">
        <div class="col-3">
            <img src="#" width="100%" height="200px" /></div>
        <div class="col-9">
            <div class="m-box">
                <div style="height: 45px; line-height: 45px; border-bottom: 1px solid #ccc; overflow: visible"><span style="font-size: 18px;height: 44px; line-height: 45px;border-bottom:#FF8E00 2px solid; display: block; float: left; padding: 0 15px;">重置密码</span></div>
                <div style="width: 400px; margin: 40px auto; float: left;">
                    <table class="m-table-form" width="100%">
                        <tr>
                            <td class="table-head">输入用户名</td>
                            <td colspan="2"><input type="text" class="u-input" id="account"></td>
                        </tr>
                        <tr>
                            <td class="table-head">输入新密码</td>
                            <td colspan="2"><input type="password" class="u-input" id="newPassword"></td>
                        </tr>
                        <tr>
                            <td class="table-head">再次输入新密码</td>
                            <td colspan="2"><input type="password" class="u-input" id="repeatNewPassword"></td>
                        </tr>
                        <tr>
                        <td class="table-head">输入手机验证码</td>
                        <td><input type="text" class="u-input" id="zymCode"></td>
                        <td style="width: 120px">&nbsp;&nbsp;<input id="getCode" class="u-btn" type="button" value="获取验证码"></td>
                        </tr>
                    </table>
                    <div class="f-p f-right">
                        <input type="button" onclick="submitReset()" id="submitChange" class="u-btn warning f-ng-p-md" value="提交"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>

    $(function () {
        $("#getCode").removeAttr("disabled");
        //发送验证码
        $("#getCode").click(function () {
            $("#getCode").attr("disabled","true");
            var account = $("#account").val();
            $.ajax({
                type:"POST",
                dataType:"json",
                url:"${base}/user/sendCode",
                data:{"account":account},
                success:function (json) {
                    LayuiUtil.msg(json.msg);
                    time(this);
                },
                error:function () {
                    LayuiUtil.msg("手机验证码发送失败，请重新发送。");
                    $("#getCode").removeAttr("disabled");
                }
            });

            //验证码倒计时
            var wait = 30;
            function time(obj) {
                if(wait==0) {
                    $("#getCode").removeAttr("disabled");
                    $("#getCode").val("获取验证码");
                    wait = 30;
                }else {
                    $("#getCode").attr("disabled","true");
                    $("#getCode").val(wait+"秒后重新发送");
                    wait--;
                    setTimeout(function() {     //倒计时方法
                        time(obj);
                    },1000);//间隔为1s
                }
            }
        });
    });

    function submitReset() {
        $('#submitReset').attr('disabled',"true");
        var account = $("#account").val();
        var repeatNewPassword = $("#repeatNewPassword").val();
        var newPassword = $("#newPassword").val();
        var zymCode = $("#zymCode").val();

        if (account == '' || newPassword == ''){
            LayuiUtil.msg("请输入账户和新密码。");
            $('#submitReset').removeAttr("disabled");
            return false;
        }if (zymCode == ''){
            LayuiUtil.msg("请输入验证码。");
            $('#submitReset').removeAttr("disabled");
            return false;
        }
        if(newPassword.length > 5 && zymCode.length === 6 ){
            if(newPassword !== repeatNewPassword){
                LayuiUtil.msg("两次输入的新密码不一致。");
                $('#submitReset').removeAttr("disabled");
                return false;
            }
            resetPassword(account,newPassword,zymCode);
        }else{
            LayuiUtil.msg("密码或验证码位数不正确。");
            $('#submitReset').removeAttr("disabled");
            return false;
        }
//        if(StringUtil.isNull(zymCode)){
//            LayuiUtil.msg("请输入验证码。");
//            $('#submitChange').removeAttr("disabled");
//            return false;
//        }
//        if(zymCode.length != 6){
//            LayuiUtil.msg("验证码位数不正确。");
//            $('#submitChange').removeAttr("disabled");
//            return false;
//        }


    }

    function resetPassword(account,newPassword,zymCode) {
        $.ajax({
            type:"POST",
            dataType:"json",
            url:"${base}/user/resetPassword",
            data:{"account":account,"newPassword":newPassword,"zymCode":zymCode},
            success:function (json) {
                if(json.state) {
                    LayuiUtil.msg(json.msg);
                    //跳转到登录页
                    var redirectUrl = "${base}/user/toLoginPage";
                    setTimeout(function () {
                        window.location.href = redirectUrl;
                    }, 1000);
                }else{
                    LayuiUtil.msg(json.msg);
                    $('#submitReset').removeAttr("disabled");
                }
            },
            error:function () {
                LayuiUtil.msg("系统异常，请稍后再试。");
                $('#submitReset').removeAttr("disabled");
            }
        });
    }
</script>
</body>
</html>

