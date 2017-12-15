<%--
  Created by IntelliJ IDEA.
  User: Kun
  Date: 2017/12/15 0015
  Time: 15:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
                <li><a href="#">修改密码</a></li>
                <li><a href="#">常用联系人</a></li>--%>
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
                    <table class="m-table-form">
                        <tr>
                            <td class="table-head">头像:</td>
                            <td colspan="7">
                                <div class=" u-formitem tx-up" style="width: 482px;">
                                    <c:if test="${empty bean.HEAD_IMG}">
                                        <img id="img_head" src="${base}/resources/member/img/mu07.jpg">
                                    </c:if>
                                    <c:if test="${not empty bean.HEAD_IMG}">
                                        <img id="img_head" src="${bean.HEAD_IMG}">
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
                                    <input type="text" placeholder="8-20个中文/英文或字母" class="u-input nohover nofocus"
                                           name="nickName" style="width: 100%;"
                                           value="${bean.NICK_NAME}"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">姓名:</td>
                            <td colspan="7">
                                <div class=" u-formitem">
                                    <input type="text" placeholder="8-20个中文/英文或字母" class="u-input nohover nofocus"
                                           name="realName" style="width: 100%;"
                                           value="${bean.REAL_NAME}"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">性别:</td>
                            <td colspan="7">
                                <div class="layui-form-item" style="margin-bottom: 2px;margin-left: -102px;">
                                    <div class="layui-input-block">
                                        <input type="radio" name="sex" value="男" title="男" checked="">
                                        <input type="radio" name="sex" value="女" title="女">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">出生日期:</td>
                            <td colspan="7">
                                <div class="u-formitem">
                                    <input type="text" class="u-input nohover nofocus laydate-icon" style="height: 30px;width: 100%;"
                                           readonly="readonly" id="laydate" placeholder="请选择日期" name="birthday" value="${bean.BIRTHDAY}">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="table-head">个人简介:</td>
                            <td colspan="7">
                                <div class=" u-formitem">
                                    <textarea class="u-textarea" style="height:100px;width: 100%;border-radius:0;background:#ffffff;" name="profile">${bean.USER_DESC}</textarea>
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
