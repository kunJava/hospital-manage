<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<c:set var="base" value="${pageContext.request.contextPath}" />
<!doctype html>
<html>
<head>
    <%@ include file="/WEB-INF/common/common_meta.jsp" %>
    <title>用户登录</title>
    <link rel="stylesheet" type="text/css" href="${base}/resources/andyui/admin/css/parts/unit.css" />
    <link rel="stylesheet" type="text/css" href="${base}/resources/andyui/admin/skin/member.css" />
    <script src="${base}/resources/layui/layui/layui.js"></script>
    <script src="${base}/resources/layui/layui/layuiUtil.js"></script>
    <script src="${base}/resources/jquery.min.js"></script>
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
            background-color:rgba(255,134,0,1.00);
            color: #fff;
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
            border-radius: 5px;
        }
        .yBtn a:hover{
            background-color: rgba(255,95,0,1.00);
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
        <a href="#" class="active">用户登录</a>
    </li>
    <li>
        <a href="${base}/user/toRegisterPage">会员注册</a>
    </li>
</ul>
<div class="login-box">
    <form id="loginForm">
        <div class="tName f-clear">
            <div class="u-group">
                <div class="item item-l"><img src="${base}/resources/andyui/admin/skin/img/user.png"></div>
                <input type="text" class="item item-r u-input nohover"  placeholder="请输入账号" name="phoneNum" autocomplete="off">
            </div>
        </div>
        <div class="tPwd f-clear">
            <div class="u-group">
                <div class="item item-l"><img src="${base}/resources/andyui/admin/skin/img/password.png"></div>
                <input type="password" class="item item-r u-input nohover"  placeholder="请输入密码" name="password" autocomplete="off">
            </div>
        </div>
        <div class="yBtn"><a onclick="login();" id="loginA">登 录</a></div>
        <div class="yCheck f-clear">
            <label class="f-left u-checkbox">
                <input name="a" id="remeberPwd" type="checkbox">记住密码</label>
            <a class="f-right forgetPW" href="javascript:void(0)" id="setNewWord">忘记密码?</a></div>
        <div class="kjLogin"><span>快捷登录</span></div>
        <div class="kjBox" style="width: 66px;padding-left: 157px;">
            <a href="javascript:void(0)"><img src="http://tjb69.com/trip-mall/resources/mall/img/wxdl.png" alt=""></a></div>
    </form>
</div>
<div class="login-title"></div>
<div class="login-bg"></div>
<script>
    function login() {
        var acount = $("input[name='phoneNum']").val();
        acount = $.trim(acount);
        if(StringUtil.isNull(acount)){
            LayuiUtil.msg("账号不能为空。");
            return false;
        }
        var pwd = $("input[name='password']").val();
        pwd = $.trim(pwd);
        if(StringUtil.isNull(pwd)){
            LayuiUtil.msg("密码不能为空。");
            return false;
        }
        var url = location.protocol + "//" + location.host + "/user/login";
        if($("#remeberPwd").is(':checked')){
            CookieUtil.setCookie("user_account",acount);
            CookieUtil.setCookie("user_password",pwd);
        }
        $('#loginA').attr('disabled',"true");
        $.post(url, $("#loginForm").serializeArray(), function (json) {
            if (json.state) {
                var user = json.result;
                var nickName = user.nickName || '';
                if(nickName == ''){
                    nickName = user.account;
                }
                var user_id = user.id||'';
                var headImg = user.headImg||'';
                var phoneNum = user.phoneNum||'';
                var userType = user.userType;
                var seller_id = user.merchatId || '';
                CookieUtil.setCookie("user_name",nickName);
                CookieUtil.setCookie("user_id", user_id);
                CookieUtil.setCookie("head_img",headImg);
                CookieUtil.setCookie("phoneNum",phoneNum);
                CookieUtil.setCookie("userType",userType);
                CookieUtil.setCookie("seller_id",seller_id);
                var redirectUrl = "${base}/user/userCenter?userId="+user_id;
                setTimeout(function () {
                    window.location.href = redirectUrl;
                }, 1000);
            }else{
                LayuiUtil.msg(json.msg);
                $('#loginA').removeAttr("disabled");
            }
        }, "json");

    }
</script>
</body>
</html>
