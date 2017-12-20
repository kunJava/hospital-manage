<%@ taglib prefix="f" uri="http://www.springframework.org/tags/form" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="basePath" value="${pageContext.request.contextPath}"/>
<html>
<head>

    <title>选择地址</title>
    <script type="text/javascript" src="http://libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/core/andyui/icon/iconfont.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/core/andyui/css/animate.css">
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/core/andyui/css/andyui.css">
    <script src="${basePath}/resources/core/andyui/js/jquery.min.js"></script>
    <script src="${basePath}/resources/core/andyui/js/andyui.min.1.0.js"></script>
    <script src="${basePath}/resources/core/andyui/js/laydate/laydate-debug.js"></script>
    <script src="${basePath}/resources/core/eimm/js/base.js"></script>
    <script type="text/javascript" src="${basePath}/resources/core/My97DatePicker/WdatePicker.js"></script>
    <script src="${basePath}/resources/layui/layui/layui.js"></script>
    <script src="${basePath}/resources/andyui/admin/js/andyui-debug.js"></script>
    <title>拖拽选址</title>
    <style>
        html, body {
            height: 100%;
            margin: 0;
            width: 100%;
            padding: 0;
            overflow: hidden;
            font-size: 13px;
        }

        .map {
            height: 100%;
            width: 100%;
            float: left;
        }

        #right {
            color: #444;
            background-color: #fff;
            width: 40%;
            float: left;
            height: 18%;
            position: absolute;
            border: 2px solid rgb(255, 153, 0);
            border-radius: 6px;
        }

        #start, #stop, #right input {
            margin: 4px;
            margin-left: 15px;
        }

        .title {
            width: 100%;
            background-color: #dadada
        }

        button {
            border: solid 1px;
            margin-left: 15px;
            background-color: #dadafa;
        }

        .c {
            font-weight: 600;
            padding-left: 15px;
            padding-top: 4px;
        }

        #lnglat, #address, #nearestJunction, #nearestRoad, #nearestPOI, .title {
            padding-left: 15px;
        }
    </style>

    <script>
        function saveAdd() {
            console.log(document.getElementById("address").innerHTML);
            var companyAddress = parent.document.getElementById("companyAddress");
            if (companyAddress == null){
                //先取iframe 再取dom元素
                companyAddress = parent.document.getElementById('busTabContent_1').contentWindow.document.getElementById('companyAddress');
            }
            companyAddress.value = document.getElementById("address").innerHTML;
            console.log(document.getElementById("address").innerHTML);
            var latlon= document.getElementById("lnglat").innerHTML;
            console.log(latlon);
            var latlons=latlon.split(",");
            var lat = parent.document.getElementById("lat");
            var lon = parent.document.getElementById("lon");
            if (lat == null){
                lat = parent.document.getElementById('busTabContent_1').contentWindow.document.getElementById('lat');
            }
            if (lon == null){
                lon = parent.document.getElementById('busTabContent_1').contentWindow.document.getElementById('lon');
            }
            lat.value = latlons[1];
            lon.value = latlons[0];

            $(document).an_dialog("close", "addMap");
        }
    </script>
</head>

<body>
<div style="width: 100%;height: 100%;">
    <div id="container" class="map" tabindex="0"></div>
    <!--     <input class="search" id="search" type="text" name="map" style="width: 240px;height: 30px;float: right;position:fixed; " placeholder="请输入想要搜寻的地址"> -->
    <div id='right'>
        <div style="margin-top: 10px;display: none;">
            <div class='title' id="title" style="display: none;">选择模式</div>
            <div class="f-clear">
                <label class=" u-checkbox"><input name="mode" type="radio" value='dragMap' checked>拖拽地图模式</label>
                <label class=" u-checkbox"><input name="mode" type="radio" value='dragMarker'>拖拽Marker模式</label>
            </div>
        </div>
        <div>
            <button id='start' style="display: none;">开始选点</button>
            <button id='stop' style="display: none;">关闭选点</button>
        </div>
        <div>
            <div class='title' style="display: none;">选址结果</div>
            <div class='c' style="display: none;">经纬度:</div>
            <div id='lnglat' style="display: none;"></div>
            <div class='panel'>
                <p class="sm f-color-dark f-m-l-sm">输入地址显示位置:</p>
                <input class="u-input" id='input' value='' style='margin: 0 0 0 15px;width: 250px'>
                <button class="u-btn warning" id="btn">搜索</button>
                <a href="javascript:void (0)" onclick="saveAdd()" class="u-btn " id="btnR">确认</a>
                <div id='message' style="display: none;"></div>
            </div>
            <div class='c sm'>地址:</div>
            <div id='address'></div>
            <div class='c' style="display: none;">最近的路口:</div>
            <div id='nearestJunction' style="display: none;"></div>
            <div class='c' style="display: none;">最近的路:</div>
            <div id='nearestRoad' style="display: none;"></div>
            <div class='c' style="display: none;">最近的POI:</div>
            <div id='nearestPOI' style="display: none;"></div>
        </div>
    </div>
</div>
<script type="text/javascript" src='http://webapi.amap.com/maps?v=1.3&key=591e6068278e3112479827cc6fbc1ec8&plugin=AMap.ToolBar'></script>
<script src="http://webapi.amap.com/ui/1.0/main.js"></script>
<script type="text/javascript">
    var map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', {
        resizeEnable: true
    });
    $("#btn").click(function (event) {
        $("#input").keydown();
    });

    map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
        var str = ['定位成功'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        if (data.accuracy) {
            str.push('精度：' + data.accuracy + ' 米');
        }//如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        // document.getElementById('tip').innerHTML = str.join('<br>');
    }
    //解析定位错误信息
    function onError(data) {
        document.getElementById('tip').innerHTML = '定位失败';
    }
    AMap.service('AMap.PlaceSearch', function () {//回调函数
        //实例化PlaceSearch
        placeSearch = new AMap.PlaceSearch();
        //TODO: 使用placeSearch对象调用关键字搜索的功能
    });
    AMap.plugin('AMap.Geocoder', function () {
        var geocoder = new AMap.Geocoder({});
        var marker = new AMap.Marker({
            map: map,
            bubble: true
        })
        var input = document.getElementById('input');
        input.onchange = function (e) {
            var address = input.value;
            geocoder.getLocation(address, function (status, result) {
                if (status == 'complete' && result.geocodes.length) {
                    marker.setPosition(result.geocodes[0].location);
                    map.setCenter(marker.getPosition())
                    document.getElementById('message').innerHTML = ''
                    newadd()
                } else {
                    document.getElementById('message').innerHTML = '获取位置失败'
                }
            })
        }
        input.onchange();

    });

    var newadd = function () {
        AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
            var positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: map
            });
            positionPicker.on('success', function (positionResult) {
                document.getElementById('lnglat').innerHTML = positionResult.position;
                document.getElementById('address').innerHTML = positionResult.address;
                document.getElementById('nearestJunction').innerHTML = positionResult.nearestJunction;
                document.getElementById('nearestRoad').innerHTML = positionResult.nearestRoad;
                document.getElementById('nearestPOI').innerHTML = positionResult.nearestPOI;
            });
            positionPicker.on('fail', function (positionResult) {
                document.getElementById('lnglat').innerHTML = ' ';
                document.getElementById('address').innerHTML = ' ';
                document.getElementById('nearestJunction').innerHTML = ' ';
                document.getElementById('nearestRoad').innerHTML = ' ';
                document.getElementById('nearestPOI').innerHTML = ' ';
            });
            var onModeChange = function (e) {
                positionPicker.setMode(e.target.value)
            };
            var startButton = $('#start');
            var stopButton = $('#stop');
            var dragMapMode = document.getElementsByName('mode')[0];
            var dragMarkerMode = document.getElementsByName('mode')[1];
            AMap.event.addDomListener(startButton, 'click', function () {
                positionPicker.start(map.getBounds().getSouthWest())
            });
            AMap.event.addDomListener(stopButton, 'click', function () {
                positionPicker.stop();
            });
            AMap.event.addDomListener(dragMapMode, 'change', onModeChange);
            AMap.event.addDomListener(dragMarkerMode, 'change', onModeChange);
            positionPicker.start();
            map.panBy(0, 1);

            map.addControl(new AMap.ToolBar({
                liteStyle: true
            }))
        });
    };
    newadd()
</script>
</body>

</html>