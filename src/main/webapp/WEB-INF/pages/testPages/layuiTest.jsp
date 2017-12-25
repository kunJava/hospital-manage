<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<c:set var="base" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
    <title>layUI测试</title>
    <link rel="stylesheet" href="${base}/resources/layui/layui/css/layui.css"  media="all">
</head>
<body>
<div class="site-demo-button" id="layerDemo" style="margin-bottom: 0;">
    <button data-method="setTop" data-type="auto" class="layui-btn">弹出层</button>
</div>
<script src="${base}/resources/layui/layui/layui.js" charset="utf-8"></script>
<script>
    layui.use('layer', function(){ //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句

        //触发事件
        var active = {
            setTop: function(){
                var that = this;
                layer.open({
                    type: 2 //此处以iframe举例
                    ,title: '弹出窗口'
                    ,area: ['390px', '260px']
                    ,shade: 0
                    ,maxmin: true
                    ,offset: 'auto'
                    ,content: 'http://layer.layui.com/test/settop.html'
                    ,btn: ['继续弹出', '全部关闭'] //只是为了演示
                    ,yes: function(){
                        $(that).click();
                    }
                    ,btn2: function(){
                        layer.closeAll();
                    }

                    ,zIndex: layer.zIndex //重点1
                    ,success: function(layero){
                        layer.setTop(layero); //重点2
                    }
                });
            }
        };

        $('#layerDemo .layui-btn').on('click', function(){
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });

    });
</script>

</body>
</html>