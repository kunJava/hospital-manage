<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<c:set var="base" value="${pageContext.request.contextPath}" />
<!doctype html>
<html>
<head>
    <%@ include file="/WEB-INF/common/common_meta.jsp" %>
    <title>用户注册</title>
    <link rel="stylesheet" type="text/css" href="${base}/resources/andyui/admin/css/parts/unit.css" />
    <link rel="stylesheet" type="text/css" href="${base}/resources/andyui/admin/skin/member.css" />
    <script src="${base}/resources/jquery.min.js"></script>
    <script src="${base}/resources/layui/layui/layui.js"></script>
    <script src="${base}/resources/layui/layui/layuiUtil.js"></script>
    <script src="${base}/resources/andyui/admin/js/stringUtil.js"></script>
    <script src="${base}/resources/andyui/admin/js/cookieUtil.js"></script>
    <style>
        body{background-color: #ECECEC}
        .head{ height: auto}
        .login-bg{ height: 459px; background: url(${base}/resources/andyui/admin/skin/img/login.png) center top no-repeat;}
        .login-title{position: absolute; top: 80px; width: 200px; height: 55px; left: 50%; margin-left: -100px; background: url(${base}/resources/andyui/admin/skin/img/logo1.png); z-index: 1;}
        .login-nav{
            padding: 0;
            margin: 0 0 0 -175px;
            position: absolute;
            width: 350px;
            height: 40px;
            top:150px;
            left:50%;

        }
        .login-nav li{
            display:block;
            float: left;
            height: 40px;
            line-height: 40px;
            text-align: center;
            width: 175px;

        }
        .login-nav li a{
            display: block;
            float: left;
            width: 175px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: rgba(255,255,255,.5);
        }
        .login-nav li a.active{
            font-size: 16px;
            font-weight: 500;
            color: rgba(255,255,255,1);
        }
        .login-box{position: absolute; width: 350px; background: #fff; border-radius: 15px; box-shadow: 2px 2px 10px rgba(0,0,0,.3); top: 200px; left: 50%; margin-left: -190px; padding: 30px}

        .u-group , .u-group .item{
            height:40px;
            line-height: 40px;
            margin-bottom: 15px;
        }
        .u-group .item.item-l img{
            width: 28px;
            height: 28px;
            margin: 5px 5px 4px 5px;
        }
        .u-group .item.item-r{
            width: 297px;
        }
        .yBtn a{
            display: block;
            height: 40px;
            line-height: 40px;
            background-color:#F04043;
            color: #fff;
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            border-radius: 5px;
        }
        .yBtn a:hover{
            background-color:#B02426;
        }
        .yCheck{
            padding: 10px;
        }
        .kjLogin{
            height: 20px;
            border-bottom: #B3B3B3 1px solid;
            overflow: visible;
            line-height: 40px;
            font-size: 14px;
            color: #B3B3B3;

            text-align: center;
            margin-bottom: 20px;
        }
        .kjLogin span{
            text-align: center;
            color: #B3B3B3;
            background-color: #fff;
            padding: 5px;
        }
        .login-boxmin{}
    </style>
</head>

<body>

<div class="head">
    <div class="head-top">
        <div class="f-left"><img src="${base}/resources/andyui/admin/skin/img/u8.png">下载APP客户端</div>
        <div class="f-right"><a href="" class="c-2" >返回首页</a><a href="">分销商加盟</a><a href="">供应商入口</a> </div>
    </div>
</div>
<ul class="login-nav">
    <li>
        <a href="${base}/user/toLoginPage">用户登录</a>
    </li>
    <li>
        <a href="#" class="active">会员注册</a>
    </li>
</ul>
<div class="login-box">
    <form id="registerForm">
        <div class="tName f-clear">
            <div class="u-group">
                <div class="item item-l"><img src="${base}/resources/andyui/admin/skin/img/phone.png"></div>
                <input type="text" class="item item-r u-input nohover" name="account" id="account" placeholder="请输入手机号码">
            </div>
        </div>
        <div class="tPwd f-clear">
            <div class="u-group">
                <div class="item item-l"><img src="${base}/resources/andyui/admin/skin/img/password.png"></div>
                <input type="password" class="item item-r u-input nohover" name="password" id="password" placeholder="请输入密码">
            </div>
        </div>

        <div class="tPwd f-clear">
            <div class="u-group">
                <div class="item item-l"><img src="${base}/resources/andyui/admin/skin/img/password.png"></div>
                <input type="password" class="item item-r u-input nohover" id="repeatPassword" placeholder="请确认输入的密码">
            </div>
        </div>
        <%--<div class="tVer f-clear">
            <div class="u-group">
                <div class="item item-l"><img src="${base}/resources/andyui/admin/skin/img/Verification.png"></div>
                <input type="text" class="item item-r u-input nohover" id="passCode" placeholder="请输入验证码" name="imageValidate" >
            </div>
            <a id="codeSpan" class="f-p-xs" style="color: #0051F5">获取验证码</a>
        </div>--%>
        <div class="yCheck f-clear">
            <label class="f-left u-checkbox">
                <input name="a" id="agreeCheckbox" type="checkbox">我已阅读并同意<a href="#" style="color: #CF4749">《隐私声明，使用协议》</a></label>
        </div>
        <div class="yBtn"><a href="javascript:void(0);" id="loginA">注 册</a></div>


    </form>
</div>
<div class="login-title"></div>
<div class="login-bg"></div>
<script>
    $("#loginA").click(function() {
        $('#loginA').attr('disabled',"true");
        var password = $("#password").val();
        var repeatPassword = $("#repeatPassword").val();
        var account = $("#account").val();
        if (account == '' || password == ''){
            LayuiUtil.msg("请输入账号和密码。");
            return false;
        }
        if(password.length>5){
            if(StringUtil.isNull(repeatPassword)){
                LayuiUtil.msg("请输入确认密码。");
                return false;
            }else if(password != repeatPassword){
                LayuiUtil.msg("两次密码不一致。");
                return false;
            }
            if($("#agreeCheckbox").is(':checked')==true){
                var reg = /^1[3|4|5|7|8][0-9]{9}$/;
                var flag = reg.test(account); //true
                if(!flag){
                    LayuiUtil.msg("手机号码有误！");
                    $('#loginA').removeAttr("disabled");
                    return false;
                }
            register();
            }else if($("#agreeCheckbox").is(':checked')==false){
                $('#loginA').removeAttr("disabled");
                LayuiUtil.msg("请阅读并同意《隐私声明，使用协议》!");
            }
        }else{
            LayuiUtil.msg("密码位数不低于6位。");
            $('#loginA').removeAttr("disabled");
            return false;
        }
    });
    function register(){
        var url="${base}/user/register";
        $.post(url,$("#registerForm").serializeArray(),function(json){
            if(json.msg == 'success'){
                var user = json.result;
                var nickName = user.nickName||'';
                var user_id = user.id||'';
                var headImg = user.headImg||'';
                var phoneNum = user.phoneNum||'';
                var userType = user.userType;
                CookieUtil.setCookie("user_name_cd",nickName);
                CookieUtil.setCookie("user_id_cd", user_id);
                CookieUtil.setCookie("head_img_cd",headImg);
                CookieUtil.setCookie("phoneNum_cd",phoneNum);
                CookieUtil.setCookie("userType_cd",userType);
                var redirectUrl = "${base}/user/userCenter?userId="+user_id;
                window.location.href = redirectUrl;
            }else{
                LayuiUtil.msg(json.msg);
                $('#loginA').removeAttr("disabled");
            }
        },"json");
    }
</script>
</body>
</html>
