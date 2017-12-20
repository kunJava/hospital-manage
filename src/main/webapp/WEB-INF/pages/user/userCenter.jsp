<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<c:set var="base" value="${pageContext.request.contextPath}"/>
<!doctype html>
<html>
<head>
    <title>会员中心</title>
    <script src="${base}/resources/andyui/admin/js/andyui-debug.js"></script>
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
                <li><a href="${base}/user/resetPassword">修改密码</a></li>
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
                <div class="m-box-head"><strong class="u-title">最新发生的订单</strong>
                    <div class="f-right"><span>关键词</span><input type="text" class="u-input" placeholder="输入关键词"><a href="" class="u-btns">搜索</a></div>
                </div>
                <div class="m-box-body">
                    <div class="m-tabs-list">
                        <div class="m-tabs-head">
                            <ul>
                                <li><a href="" class="cerrent">未使用</a></li>
                                <li><a href="">待支付</a></li>
                                <li><a href="">已完成</a></li>
                            </ul>
                        </div>
                        <div class="m-tabs-body">
                            <div class="u-order">
                                <div class="u-order-head"><strong class="u-unpaid">待支付</strong><strong class="u-success">已支付</strong><strong>已兑换</strong>
                                    <div class="f-right"><span class="u-redeem-code">电子兑换码：293783219789171</span><a href="" class="u-message"><img src="${base}/resources/andyui/admin/skin/img/u285.png">将兑换码发送到我的手机</a></div></div>
                                <div class="u-order-body">
                                    <strong class="u-title">赤水丹霞景区门票</strong>
                                    <ul class="u-info">
                                        <li><span class="u-s-title">有效期：</span><span>2017年</span></li>
                                        <li><span class="u-s-title">购票数：</span><span>2</span><span class="u-s-title">票价：</span><span>￥324.00 人</span></li>
                                        <li><span class="u-s-title">游客：</span><span class="u-name">游客姓名</span><span class="u-name">游客姓名</span><span class="u-name">游客姓名</span></li>
                                        <li><span class="u-s-title">合计：</span><span class="u-cost">￥2000</span></li>
                                        <li><span class="u-s-title">地址：</span><span class="u-address">贵州省遵义市赤水市大同镇382县道四洞沟景区</span></li>
                                        <li><span class="u-s-title">服务商：</span><span>中国青年旅行社贵州分社</span><span class="u-s-title u-width">售后服务电话：</span><span class="u-tel">15255559999</span></li>
                                    </ul>
                                    <div class="u-exchange"><strong>电子门票的兑换方式：</strong><p>请使用电子兑换码在景区售票口网络购票窗台进行兑换</p>
                                    </div>
                                </div>
                            </div>
                            <div class="u-order">
                                <div class="u-order-head"><strong class="u-unpaid">待支付</strong><strong class="u-success">已支付</strong><strong>已兑换</strong>
                                    <div class="f-right"><span class="u-redeem-code u-use">电子兑换码：293783219789171</span></div></div>
                                <div class="u-order-body">
                                    <strong class="u-title">赤水丹霞景区门票</strong>
                                    <ul class="u-info">
                                        <li><span class="u-s-title">有效期：</span><span>2017年</span></li>
                                        <li><span class="u-s-title">购票数：</span><span>2</span><span class="u-s-title">票价：</span><span>￥324.00 人</span></li>
                                        <li><span class="u-s-title">游客：</span><span class="u-name">游客姓名</span><span class="u-name">游客姓名</span><span class="u-name">游客姓名</span></li>
                                        <li><span class="u-s-title">合计：</span><span class="u-cost">￥2000</span></li>
                                        <li><span class="u-s-title">地址：</span><span class="u-address">贵州省遵义市赤水市大同镇382县道四洞沟景区</span></li>
                                        <li><span class="u-s-title">服务商：</span><span>中国青年旅行社贵州分社</span><span class="u-s-title u-width">售后服务电话：</span><span class="u-tel">15255559999</span></li>
                                    </ul>
                                    <div class="u-exchange"><strong>电子门票的兑换方式：</strong><p>请使用电子兑换码在景区售票口网络购票窗台进行兑换</p>
                                    </div>
                                </div>
                            </div>
                            <div class="u-order">
                                <div class="u-order-head"><strong class="u-unpaid">待支付</strong><strong class="u-success">已支付</strong><strong>已兑换</strong>
                                    <div class="f-right"><a href="" class="u-btns">去支付</a></div></div>
                                <div class="u-order-body">
                                    <strong class="u-title">赤水丹霞景区门票</strong>
                                    <ul class="u-info">
                                        <li><span class="u-s-title">有效期：</span><span>2017年</span></li>
                                        <li><span class="u-s-title">购票数：</span><span>2</span><span class="u-s-title">票价：</span><span>￥324.00 人</span></li>
                                        <li><span class="u-s-title">游客：</span><span class="u-name">游客姓名</span><span class="u-name">游客姓名</span><span class="u-name">游客姓名</span></li>
                                        <li><span class="u-s-title">合计：</span><span class="u-cost">￥2000</span></li>
                                        <li><span class="u-s-title">地址：</span><span class="u-address">贵州省遵义市赤水市大同镇382县道四洞沟景区</span></li>
                                        <li><span class="u-s-title">服务商：</span><span>中国青年旅行社贵州分社</span><span class="u-s-title u-width">售后服务电话：</span><span class="u-tel">15255559999</span></li>
                                    </ul>
                                    <div class="u-exchange"><strong>电子门票的兑换方式：</strong><p>请使用电子兑换码在景区售票口网络购票窗台进行兑换</p>
                                    </div>
                                </div>
                            </div>
                            <div class="sc-paginer">
                                <ul>
                                    <li class="pagin-num">共2500页/3000条</li>
                                    <li class="pagin-prev"><a href="javascript:void(0)">上一页</a></li>
                                    <li class="activate"><a href="javascript:void(0)">1</a></li>
                                    <li><a href="javascript:void(0)">2</a></li>
                                    <li><a href="javascript:void(0)">3</a></li>
                                    <li><a href="javascript:void(0)">4</a></li>
                                    <li><a href="javascript:void(0)">5</a></li>
                                    <li><a href="javascript:void(0)">6</a></li>
                                    <li><a href="javascript:void(0)">7</a></li>
                                    <li class="pagin-next"><a href="javascript:void(0)">下一页</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
