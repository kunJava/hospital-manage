<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="base" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="utf-8">
    <title>测试fastDFS文件上传</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="${base}/resources/layui/layui/css/layui.css"  media="all">
    <script src="${base}/resources/layui/layui/layui.js" charset="utf-8"></script>
    <script>
        layui.use('upload', function(){
            var $ = layui.jquery,
            upload = layui.upload;
            //普通图片上传
            var uploadInst = upload.render({
                elem: '#test1'
                ,url: '${base}/upload/uploadImage'
                ,before: function(obj){
                    //预读本地文件示例，不支持ie8
                    obj.preview(function(index, file, result){
                        $('#demo1').attr('src', result); //图片链接（base64）
                    });
                }
                ,done: function(res){
                    //如果上传失败
                    if(res.code > 0){
                        return layer.msg('上传失败');
                    }
                    //上传成功
                }
                ,error: function(){
                    //演示失败状态，并实现重传
                    var demoText = $('#demoText');
                    demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
                    demoText.find('.demo-reload').on('click', function(){
                        uploadInst.upload();
                    });
                }
            });
        });
    </script>
</head>
<body>
<div class="layui-upload">
    <button type="button" class="layui-btn" id="test1">上传图片</button>
    <div class="layui-upload-list">
        <img class="layui-upload-img" id="demo1">
        <p id="demoText"></p>
    </div>
</div>

<form action="${base}/upload/uploadImage" method="post"  enctype="multipart/form-data">
    <div>
        选择文件 :
        <input type="file" name="fileRequest" value="" />
        <input type="submit" value="submit">
    </div>
    <img src="http://111.231.209.74:8888/group1/M00/00/00/rBsAC1o80i2AVr6dAAAisA2l834104.png">
</form>
</body>
</html>
