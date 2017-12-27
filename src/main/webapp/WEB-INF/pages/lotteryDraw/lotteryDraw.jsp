<%--
  Created by IntelliJ IDEA.
  User: Kun
  Date: 2017/12/15 0015
  Time: 15:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<html>
<head>
    <title>抽奖</title>
    <%@ include file="/WEB-INF/common/common_tag2.jsp" %>
    <link rel="stylesheet" type="text/css" href="${base}/resources/core/andyui/css/andyui.css">
    <style>
        /*个人资料-我的信息*/
        .myinfo-right {width:600px;min-height:600px;padding:45px 200px;border:1px solid #eeeeee;background:#ffffff;border-radius:3px;}
        .myinfo-right .tx-upload{display:inline-block;*display:inline;*zoom:1;width:95px;text-align:center;height:25px;line-height:25px;border:1px solid #c6e3fc;color:#03a9f4;border-radius:2px;margin:10px 0;}
        .myinfo-right .tx-up img{width:119px;height:119px;vertical-align:bottom;}
        .save-btn-ff6600{text-align:center;padding:30px 0 0 80px;}
        .save-btn-ff6600 a{text-align:center;display:inline-block;*display:inline;*zoom:1;background:#ff6600;width:120px;height:36px;line-height:36px;color:#ffffff;}
        .alert.f-clear.alert-black.f-m-b-xs.animated.fadeInDown.alertnew i{
            display: none;
        }
        .alert img{position: absolute;left: 50%;top:50%;margin: -50px 0 0 -50px;}
        .m-table-form .u-formitem {
            padding: 5px;
            position: relative;
        }
        .m-table-form td.table-head {
            width: 120px;
            color: rgb(110, 110, 110);
        }
        .m-table-form td.table-head {
            text-align: right;
            padding: 15px 15px;
        }
        .m-table-form td {
            vertical-align: middle;
            z-index: 1;
            overflow: visible;
        }
        div {
            display: block;
        }
        .myinfo-right .tx-up {
            text-align: center;
        }
        .m-table tbody tr td {
            padding: 0 !important;
            vertical-align: middle;
        }

        .status i {
            color: #CCCCCC;
            font-size: 26px;
            width: 26px;
            height: 18px;
            display: block
        }
    </style>
    <script src="${base}/resources/andyui/admin/js/andyui-debug.js"></script>
    <script src="${base}/resources/ajaxfileupload.js"></script>
    <link rel="stylesheet" href="${base}/resources/layui/layui/css/layui.css"  media="all">
    <script src="${base}/resources/layui/layui/layui.js" charset="utf-8"></script>
    <script>
        function lotteryDraw() {
            var url = '${base}/prize/lotteryDraw';
            $.post(url,null,function (result) {
                if (result.state){
                    var prize = result.result.prizeName;
                    LayuiUtil.msg(prize);
                }
            })
        }

    </script>
</head>
<body>
<div class="g-box1200 f-clear">
    <div class="row col-12">
        <div class="col-3">
            <ul class="u-nav">
                <li><strong>个人中心</strong></li>
                <li><a href="${base}/user/userCenter">用户首页</a></li>
                <li><a href="${base}/user/userInfo">用户信息</a></li>
                <li><a href="${base}/user/toChangePasswordPage">修改密码</a></li>
                <li><a href="">联系人</a></li>
            </ul>
            <ul class="u-nav">
                <li><strong>小程序</strong></li>
                <li><a href="${base}/prize/lotteryDrawPage">娱乐抽奖</a></li>
            </ul>
            <img src="#" width="100%" height="200px"/>
        </div>
        <div class="col-9" style="margin-top: 50px;">
            <div class="m-box">
                <div class="save-btn-ff6600"><a onclick="lotteryDraw()">抽奖</a></div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
