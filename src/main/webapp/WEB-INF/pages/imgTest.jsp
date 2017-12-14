<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="base" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <title>picture</title>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="${base}/resources/layui/css/layui.css" media="all">
    <script src="${base}/resources/jquery.min.js"></script>
    <script src="${base}/resources/jquery.Jcrop.js"></script>
    <script type="text/javascript">

        $(function () {
            cutImage();
            /*showCoords('');*/
        })

        function cutImage() {
            $("#srcImg").Jcrop({
                aspectRatio: 1,
                onChange: showCoords,
                onSelect: showCoords,
                minSize: [200, 200]
            });
        }

        //简单的事件处理程序，响应自onChange,onSelect事件，按照上面的Jcrop调用
        function showCoords(obj) {
            $("#x").val(obj.x);
            $("#y").val(obj.y);
            $("#w").val(obj.w);
            $("#h").val(obj.h);
            if (parseInt(obj.w) > 0) {
                //计算预览区域图片缩放的比例，通过计算显示区域的宽度(与高度)与剪裁的宽度(与高度)之比得到
                var rx = $("#preview_box").width() / obj.w;
                var ry = $("#preview_box").height() / obj.h;
                //通过比例值控制图片的样式与显示
                $("#previewImg").css({
                    width: Math.round(rx * $("#srcImg").width()) + "px", //预览图片宽度为计算比例值与原图片宽度的乘积
                    height: Math.round(rx * $("#srcImg").height()) + "px", //预览图片高度为计算比例值与原图片高度的乘积
                    marginLeft: "-" + Math.round(rx * obj.x) + "px", marginTop: "-" + Math.round(ry * obj.y) + "px"
                });
            }
        }
    </script>
    <link rel="stylesheet" href="${base}/resources/layui/css/main.css" type="text/css"/>
    <link rel="stylesheet" href="${base}/resources/layui/css/demos.css" type="text/css"/>
    <link rel="stylesheet" href="${base}/resources/layui/css/jquery.Jcrop.css" type="text/css"/>
</head>
<body>
<div id="cutImage" style="">
    <div class="bigImg" style="float: left;">
        <img id="srcImg" src="${base}/resources/image/pool.jpg" width="500px" height="370px"/>
    </div>
    <%--<div id="preview_box" class="previewImg">
        <img id="previewImg" src="${base}/resources/image/pool.jpg" width="120px"/>
    </div>--%>
    <div>
        <form action="" method="post" id="crop_form">
            <input type="hidden" id="bigImage" name="bigImage"/>
            <input type="hidden" id="x" name="x"/>
            <input type="hidden" id="y" name="y"/>
            <input type="hidden" id="w" name="w"/>
            <input type="hidden" id="h" name="h"/>
            <P><input type="button" value="确认" id="crop_submit"/></P>
        </form>
    </div>
</div>
</body>
</html>
