<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sitemesh" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<c:set var="base" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title><sitemesh:title/></title>
    <link rel="stylesheet" type="text/css" href="${base}/resources/andyui/admin/css/parts/unit.css" />
    <link rel="stylesheet" type="text/css" href="${base}/resources/andyui/admin/skin/member.css" />
    <script type="text/javascript" src="${base}/resources/andyui/admin/js/jquery.min.js"></script>
    <script type="text/javascript" src="${base}/resources/andyui/admin/js/holder.js"></script>
    <script type="text/javascript" src="${base}/resources/andyui/admin/js/stringUtil.js"></script>
    <script type="text/javascript" src="${base}/resources/layui/layui/layuiUtil.js"></script>
    <script type="text/javascript" src="${base}/resources/andyui/admin/js/cookieUtil.js"></script>
    <sitemesh:head/>
    <style type="text/css">
        .hide_class {display: none}
        div.signState  {float: left;margin-left: 20px;line-height: 35px;height: 35px;padding: 2px;}
        div.signState .headImg{width: 30px;height: 30px;border-radius: 30px; float: left;}
        .signState .userName{float: left;}
        .signState .userName:hover{color: #FF9900}
        .loginOut {margin-left: 20px;cursor: pointer;}
        .loginOut:hover{color: #FF9900}
    </style>
</head>
<body>
<div class="head">
    <div class="head-top">
        <div class="f-left"><img src="${base}/resources/andyui/admin/img/u8.png">下载APP客户端</div>
        <div class="f-right">
            <span>您好！欢迎来到铁脚板</span>
            <a href="${base}/user/toRegisterPage" class="c-1 noLoginSate">注册</a>
            <a href="${base}/user/toLoginPage" class="c-2 noLoginSate">登录</a>
            <a style="margin-left: 0 !important;" id="personalCenter" class="signState">
                <div class="signState">
                    <img id="user_head_img" src="" onerror="this.src='${base}/resources/andyui/admin/img/u230.png'" class="headImg">
                </div>
                <span class="signState">
				<div class="userName" id="userName">会员</div>
				</span>
            </a>
            <span onclick="logOut()" class="loginOut signState">退出</span>
            <a href="">| &nbsp;&nbsp; 商家中心</a>
            <a id="sellerDoor" href="">商家入驻</a>
        </div>
    </div>
    <div class="nav"> <img class="logo" src="${base}/resources/andyui/admin/skin/img/u2.png">
        <strong class="u-title">会员中心</strong>
    </div>
</div>
<sitemesh:body/>
<div class="foot f-m-t-lg">
    <div class="g-box1200">
        <ul class="foot-info">
            <li><strong>新手上路</strong>
            </li>
            <li><a href="javascript:void(0);" onclick="openInformationDialog('入驻流程','入驻流程')">入驻流程</a></li>
            <li><a href="javascript:void(0);" onclick="openInformationDialog('入驻流程注意事项','入驻流程注意事项')">入驻流程注意事项</a></li>
            <li><a href="javascript:void(0);" onclick="openInformationDialog('购物流程','购物流程')">购物流程</a></li>
            <li><a href="" <%--onclick="openInformationDialog('帮助中心','帮助中心')"--%>>帮助中心</a></li>
        </ul>
        <ul class="foot-info">
            <li><strong>商家入驻常见问题</strong>
            </li>
            <li><a href="javascript:void(0);" onclick="openInformationDialog('常见问题答疑','常见问题答疑')">常见问题答疑</a></li>
            <li><a href="javascript:void(0);" onclick="openInformationDialog('平台规则','平台规则')">平台规则</a></li>
            <li><a href="javascript:void(0);" onclick="openInformationDialog('业态解读','业态解读')">业态解读</a></li>
            <li><a href="javascript:void(0);" onclick="openInformationDialog('扶贫政策','扶贫政策')">扶贫政策</a></li>
        </ul>
        <ul class="foot-info">
            <li><strong>24小时服务热线</strong>
            </li>
            <li><a href="">0851-24315005</a>
            </li>
            <li><a href="">QQ：3451253447</a>
            </li>
            <li><a href="">电子邮箱：kefu@jtb69.com</a>
            </li>
        </ul>
        <ul class="foot-info foot-wx">
            <li><img src="${base}/resources/andyui/admin/img/weixin1.jpg">
                <p>铁脚板APP<br>
                    官方服务号</p>
            </li>
            <li><img src="${base}/resources/andyui/admin/img/weixin1.jpg">
                <p>铁脚板TV<br>
                    老铁会</p>
            </li>
        </ul>
        <ul class="foot-con">
            <li><a href="" class="f-b-n-l"><img src="${base}/resources/andyui/admin/img/f-1.jpg">关于我们</a></li>
            <li><a href=""><img src="${base}/resources/andyui/admin/img/f-2.jpg">帮助</a></li>
            <li><a href=""><img src="${base}/resources/andyui/admin/img/f-3.jpg">商家入驻</a></li>
            <li><a href=""><img src="${base}/resources/andyui/admin/img/f-4.jpg">手机APP下载</a></li>
            <li><a href=""><img src="${base}/resources/andyui/admin/img/f-5.jpg">服务协议</a></li>
        </ul>
        <div class="foot-bot"><a href="">贵公网安备 52030002001035号</a>|<a href="">黔ICP 17002359号</a>|<a href="">营业执照</a>|<a href="">网络文化经营许可证</a>|<a href="">视频流通许可证</a> </div>
        <div class="foot-bot-img">
            <img src="${base}/resources/andyui/admin/img/f-6.jpg">
            <img src="${base}/resources/andyui/admin/img/f-7.jpg">
        </div>
    </div>
</div>
<script type="text/javascript">
    $(function () {
        if (CookieUtil.checkIsLogin()) {
            $('.signState').show();
            $('.noLoginSate').hide();
            var username = CookieUtil.getUserName();
            var headimg = CookieUtil.getHeadImg();
            var userId = CookieUtil.getUserId();
            var personalLink = "${base}/user/userCenter";
            $("#userName").text(username);
            if (StringUtil.isNotNull(headimg)) {
                $("#user_head_img").attr("src", headimg);
            }
            $('#personalCenter').attr("href", personalLink);

        } else {
            $('.noLoginSate').show();
            $('.signState').hide();
        }

    });

//    /**
//     *退出登录
//     */
//    function logOut() {
//        layui.use('layer', function () {
//            var layer = layui.layer;
//            layer.confirm('确认退出登录？', {
//                btn: ['确认', '取消'] //按钮
//            }, function () {
//                CookieUtil.logOut();
//                layer.closeAll();
//                window.location.reload();
//            }, function () {
//                layer.close();
//            });
//        });
//    }
</script>
</body>
</html>
