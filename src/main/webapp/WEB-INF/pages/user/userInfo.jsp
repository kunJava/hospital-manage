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
<c:set var="base" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <title>用户信息</title>
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
    </style>
    <link rel="stylesheet" href="${base}/resources/layui/layui/css/layui.css"  media="all">
    <script src="${base}/resources/layui/layui/layui.js" charset="utf-8"></script>
    <script src="${base}/resources/andyui/admin/js/andyui-debug.js"></script>
    <script>
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            laydate.render({
                elem: '#laydate'
            });
        });
        //Demo
        layui.use('form', function(){
            var form = layui.form;
            //监听提交
            form.on('submit(formDemo)', function(data){
                layer.msg(JSON.stringify(data.field));
                return false;
            });
        });

        function selectMap() {
            $(document).an_dialog({
                id: 'addMap',
                title: '地址',
                width: 1000,
                height: 600,
                url: '${base}/user/toMap'
            })
        }

        function saveOrUpdate() {
            if (andy.fromVerify(document.getElementById("userForm"))) {
                var date=$("#laydate").val().split("-");
                var ndate=new Date();
                var yy=ndate.getFullYear();
                var mm=ndate.getMonth()+1;
                var dd=ndate.getDate();
                console.log(date[0],date[1],date[2],yy,mm,dd);
                if(yy<date[0]){
                    LayuiUtil.msg("出生日期大于今天?你穿越了?");
                    return false;
                }else if(yy==date[0]&&mm<date[1]){
                    LayuiUtil.msg("出生日期大于今天?你穿越了?");
                    return false;
                }else if(yy==date[0]&&mm==date[1]&&dd<date[2]){
                    LayuiUtil.msg("出生日期大于今天?你穿越了?");
                    return false;
                }else{
                    var url = "${base}/user/myInfoSaveOrUpdate";
                    $.post(url, $("#userForm").serializeArray(), function(result) {
                        if (result.state){
                            var user = result.result;
                            var nickName = user.nickName || '';
                            var headImg = user.headImg||'';
                            var phoneNum = user.phoneNum||'';
                            CookieUtil.setCookie("user_name_cd",nickName);
                            CookieUtil.setCookie("head_img_cd",headImg);
                            CookieUtil.setCookie("phoneNum_cd",phoneNum);
                        }
                        LayuiUtil.msg(result.msg);
                    });
                }
            }
        }
        /**
         *退出登录
         */
        function logOut() {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.confirm('确认退出登录？', {
                    btn: ['确认', '取消'] //按钮
                }, function () {
                    CookieUtil.logOut();
                    layer.closeAll();
                    window.location.reload();
                }, function () {
                    layer.close();
                });
            });
        }
    </script>
</head>
<body>
<div class="g-box1200 f-clear">
    <div class="row col-12">
        <div class="col-3">
            <ul class="u-nav">
                <li><strong>个人中心</strong></li>
                <%--<li><a href="#">我的旅游攻略</a></li>
                <li><a href="#">我的好友</a></li>
                <li><a href="#">收到的礼品</a></li>
                <li><a href="#">修改密码</a></li>--%>
                <li><a href="${base}/user/fastDFSTest">文件上传测试</a></li>
                <li><a href="${base}/user/userInfo">用户信息</a></li>
            </ul>
            <%--<ul class="u-nav">
                <li><strong>需求</strong></li>
                <li><a href="#">功能1</a></li>
                <li><a href="#">功能2</a></li>
                <li><a href="#">功能3</a></li>
                <li><a href="#">功能4</a></li>
                <li><a href="#">功能5</a></li>
            </ul>--%>
            <img src="#" width="100%" height="200px"/>
        </div>
        <div class="col-9">
            <div class="m-box">
                <form id="userForm" target="_self" method="post" class="myinfo-right layui-form">
                    <input type="hidden" name="headImg" value="${bean.headImg}">
                    <table class="m-table-form">
                        <tr>
                            <td class="table-head">头像:</td>
                            <td colspan="7">
                                <div class=" u-formitem tx-up" style="width: 482px;">
                                    <c:if test="${empty bean.headImg}">
                                        <img id="img_head" src="${base}/resources/member/img/mu07.jpg">
                                    </c:if>
                                    <c:if test="${not empty bean.headImg}">
                                        <img id="img_head" src="${bean.headImg}">
                                    </c:if>
                                    <div>
                                        <a href="javascript:void(0)" class="tx-upload">选择图片</a>
                                        <a href="javascript:void(0)" class="tx-upload" onclick="">上传图片</a>
                                        <input style="position:absolute;left:157px;top: 134px;width:97px;height:26px;z-index:999;opacity:0;border:0px solid red;"
                                               onchange=""
                                               id="headImgUp" type="file" name="headImgUp"/>
                                    </div>
                                    <div>支持jpg、png、bmp，图片大小5M以内</div>

                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">昵称:</td>
                            <td colspan="7">
                                <div class=" u-formitem">
                                    <input type="text" placeholder="请输入昵称" class="u-input nohover nofocus"
                                           name="nickName" style="width: 100%;"
                                           value="${bean.nickName}"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">姓名:</td>
                            <td colspan="7">
                                <div class=" u-formitem">
                                    <input type="text" placeholder="请输入真实姓名" class="u-input nohover nofocus"
                                           name="realName" style="width: 100%;"
                                           value="${bean.realName}"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">QQ:</td>
                            <td colspan="7">
                                <div class=" u-formitem">
                                    <input type="text" placeholder="请输入QQ号" class="u-input nohover nofocus"
                                           name="qq" style="width: 100%;"
                                           value="${bean.qq}"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">微信:</td>
                            <td colspan="7">
                                <div class=" u-formitem">
                                    <input type="text" placeholder="请输入微信号" class="u-input nohover nofocus"
                                           name="weixin" style="width: 100%;"
                                           value="${bean.weixin}"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">邮箱:</td>
                            <td colspan="7">
                                <div class=" u-formitem">
                                    <input type="text" placeholder="请输入邮箱" class="u-input nohover nofocus"
                                           name="email" style="width: 100%;"
                                           value="${bean.email}"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">性别:</td>
                            <td colspan="7">
                                <div class="layui-form-item" style="margin-bottom: 2px;margin-left: -102px;">
                                    <div class="layui-input-block">
                                        <input type="radio" name="gender" value="1" title="男" <c:if test="${bean.gender == 1}">checked="checked"</c:if> >
                                        <input type="radio" name="gender" value="2" title="女" <c:if test="${bean.gender == 2}">checked="checked"</c:if>>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">出生日期:</td>
                            <td colspan="7">
                                <div class="u-formitem">
                                    <input type="text" class="u-input nohover nofocus laydate-icon" style="height: 30px;width: 100%;"
                                           readonly="readonly" id="laydate" placeholder="请选择日期" name="birthday" value="<fmt:formatDate value="${bean.birthday}" pattern="yyyy-MM-dd" ></fmt:formatDate>">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">地址:</td>
                            <td colspan="7">
                                <div style="margin-left: 5px;">
                                    <input id="companyAddress" name="address" value="${bean.address}" style="height: 30px;width: 80%;"
                                           type="text" class="u-input" readonly="readonly" >
                                </div>
                                <div style="float: left;margin-left: 20px">
                                    <a href="javascript:void (0);" onclick="selectMap();" class="u-btn full dark"
                                       style="width:100%;">查看地图
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr style="display: none;">
                            <td class="table-head">经度：</td>
                            <td>
                                <input id="lon" name="lon" readonly="readonly" type="text" class="u-input" value="${bean.lon}"
                                       placeholder="">
                            </td>
                            <td class="table-head">纬度：</td>
                            <td>
                                <input id="lat" name="lat" readonly="readonly" type="text" class="u-input" value="${bean.lat}"
                                       placeholder="">
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">个人简介:</td>
                            <td colspan="7">
                                <div class=" u-formitem">
                                    <textarea class="u-textarea" style="height:100px;width: 100%;border-radius:0;background:#ffffff;" name="userDesc" placeholder="此用户很懒尚未填写任何个人介绍">${bean.userDesc}</textarea>
                                </div>
                            </td>
                        </tr>
                    </table>
                </form>
                <div class="save-btn-ff6600"><a onclick="saveOrUpdate()">保存</a></div>
            </div>
        </div>
    </div>
</div>


</body>
</html>
