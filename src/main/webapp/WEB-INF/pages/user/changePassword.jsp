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
            <ul class="u-nav">
                <li><strong>个人中心</strong></li>
                <li><a href="#">我的旅游攻略</a></li>
                <li><a href="#">我的好友</a></li>
                <li><a href="#">收到的礼品</a></li>
                <li><a href="${base}/user/toChangePasswordPage">修改密码</a></li>
                <li><a href="#">常用联系人</a></li>
                <li><a href="${base}/user/userInfo">用户信息</a></li>
            </ul>
            <ul class="u-nav">
                <li><strong>需求</strong></li>
                <li><a href="#">功能1</a></li>
                <li><a href="#">功能2</a></li>
                <li><a href="#">功能3</a></li>
                <li><a href="#">功能4</a></li>
                <li><a href="#">功能5</a></li>
            </ul>
            <img src="#" width="100%" height="200px" /></div>
        <div class="col-9">
            <div class="m-box">
                <div style="height: 45px; line-height: 45px; border-bottom: 1px solid #ccc; overflow: visible"><span style="font-size: 18px;height: 44px; line-height: 45px;border-bottom:#FF8E00 2px solid; display: block; float: left; padding: 0 15px;">修改密码</span></div>
                <div style="width: 800px; margin: 40px auto">
                    <table class="m-table-form" width="100%">
                        <tr>
                            <td class="table-head">输入原密码</td>
                            <td colspan="2"><input type="text" class="u-input" id="oldPassword"></td>
                        </tr>
                        <tr>
                            <td class="table-head">输入原密码</td>
                            <td colspan="2"><input type="password" class="u-input" id="repeatOldPassword"></td>
                        </tr>
                        <tr>
                            <td class="table-head">输入新密码</td>
                            <td colspan="2"><input type="password" class="u-input" id="newPassword"></td>
                        </tr>
                        <tr>
                            <td class="table-head">输入手机验证码</td>
                            <td><input type="text" class="u-input" name="phoneNumber"></td>
                            <td style="width: 120px">&nbsp;&nbsp;<input id="getCode" class="u-btn" type="button" value="获取验证码"></td>
                        </tr>
                    </table>
                    <div class="f-p f-right">
                        <button class="u-btn warning f-ng-p-md">提交修改</button>
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
            var abc = $("#getCode").val();
            console.log(abc);
            var phoneNumber = $("input[name='phoneNumber']").val();
            phoneNumber = $.trim(phoneNumber);
            if(StringUtil.isNull(phoneNumber)){
                LayuiUtil.msg("手机号不能为空。");
                $("#getCode").removeAttr("disabled");
                return false;
            }
            var reg = /^1[3|4|5|7|8][0-9]{9}$/;
            var flag = reg.test(phoneNumber); //true
            if(!flag){
                LayuiUtil.msg("手机号码有误！");
                $("#getCode").removeAttr("disabled");
                return false;
            }
            $.ajax({
                type:"POST",
                dataType:"json",
                url:"${base}/user/sendCode",
                data:{"phoneNum":phoneNumber},
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
                console.log(333);
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



</script>
</body>
</html>

