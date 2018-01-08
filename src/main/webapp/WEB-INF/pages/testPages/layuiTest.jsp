<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<c:set var="base" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
    <title>layUI测试</title>
    <link rel="stylesheet" href="${base}/resources/layui/layui/css/layui.css"  media="all">
    <script>
        function layWindow () {
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.open({
                    type: 1,
                    title: '查看详情',
                    skin: 'layui-layer-rim',
                    area: ['800px', '600px'],
                    content: 'exo?'
                });
            });

        }
    </script>
</head>
<body>
<div class="site-demo-button" id="layerDemo" style="margin-bottom: 0;">
    <button data-method="setTop" data-type="auto" class="layui-btn" onclick="layWindow()">弹出层</button>
</div>
</body>
</html>