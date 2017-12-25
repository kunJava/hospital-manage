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
    <link rel="stylesheet" href="${base}/resources/layui/layui/css/layui.css" media="all">
    <script src="${base}/resources/jquery.min.js"></script>
    <script src="${base}/resources/jquery.Jcrop.js"></script>
    <style type="text/css">
        .optdual {
            position: relative;
        }

        .optdual .offset {
            position: absolute;
            left: 18em;
        }

        .optlist label {
            width: 16em;
            display: block;
        }

        .layui-upload-button input, .layui-upload-file {
            opacity: .01;
            filter: Alpha(opacity=1);
            cursor: pointer
        }

    </style>

</head>
<body>

<div class="container">
    <div class="row">
        <div class="span12">
            <div class="jc-demo-box">
                <img src="${base}/resources/image/pool.jpg" id="target" alt=""/>
                <div style="margin: .8em 0 .5em;">
                <%--<span class="requiresjcrop">--%>
                  <%--<button id="setSelect" class="btn btn-mini">随机选择</button>--%>
                  <%--<button id="animateTo" class="btn btn-mini">animateTo</button>--%>
                  <%--<button id="release" class="btn btn-mini">取消</button>--%>
                  <%--<button id="disable" class="btn btn-mini">Disable</button>--%>
                <%--</span>--%>
                    <%--<button id="enable" class="btn btn-mini" style="display:none;">Re-Enable</button>--%>
                    <%--<button id="unhook" class="btn btn-mini">禁用</button>--%>
                    <%--<button id="rehook" class="btn btn-mini" style="display:none;">使用</button>--%>
                </div>
                <fieldset class="optdual requiresjcrop">
                    <legend>功能键</legend>
                    <div class="optlist offset">
                        <label><input type="radio" name="lock_size" value="16/9"/>固定宽高比16:9</label>
                        <label><input type="radio" name="lock_size" value="4/3"/>固定宽高比4:3</label>
                        <label><input type="radio" name="lock_size" value="1/1"/>固定宽高比1:1</label>
                        <%--<label><input type="checkbox" id="size_lock"/>限制最大和最小</label>--%>
                    </div>
                    <div class="optlist">
                        <%--<label><input type="checkbox" id="can_click"/>允许重新选择</label>--%>
                        <label><input type="checkbox" id="can_move"/>允许移动选择框</label>
                        <label><input type="checkbox" id="can_size"/>允许调整大小</label>
                    </div>
                </fieldset>
                <fieldset class="requiresjcrop" style="margin: .5em 0;">
                    <legend>提交</legend>
                    <form action="" method="post" id="crop_form">
                        <input type="hidden" id="bigImage" name="bigImage"/>
                        <input type="hidden" id="x" name="x"/>
                        <input type="hidden" id="y" name="y"/>
                        <input type="hidden" id="w" name="w"/>
                        <input type="hidden" id="h" name="h"/>
                        <P><input type="button" value="确认" id="crop_submit" class="btn btn-mini"/></P>
                    </form>
                </fieldset>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    jQuery(function ($) {
        var jcrop_api;
        initJcrop();
        function initJcrop() {
            $('.requiresjcrop').hide();
            $('#target').Jcrop({
                onRelease: releaseCheck
            }, function () {
                jcrop_api = this;
                jcrop_api.animateTo([100, 100, 400, 300]);
                $('#can_click,#can_move,#can_size').attr('checked', 'checked');
                $('#ar_lock,#size_lock,#bg_swap').attr('checked', false);
                $('.requiresjcrop').show();
            });
        }
        function getRandom() {
            var dim = jcrop_api.getBounds();
            return [
                Math.round(Math.random() * dim[0]),
                Math.round(Math.random() * dim[1]),
                Math.round(Math.random() * dim[0]),
                Math.round(Math.random() * dim[1])
            ];
        }

        function releaseCheck() {
            jcrop_api.setOptions({allowSelect: true});
            $('#can_click').attr('checked', false);
        };

        $('#setSelect').click(function () {
            jcrop_api.setSelect(getRandom());
        });
        $('#animateTo').click(function () {
            jcrop_api.animateTo(getRandom());
        });
        $('#release').click(function () {
            jcrop_api.release();
        });
        $('#disable').click(function () {
            jcrop_api.disable();
            $('#enable').show();
            $('.requiresjcrop').hide();
        });
        $('#enable').click(function () {
            jcrop_api.enable();
            $('#enable').hide();
            $('.requiresjcrop').show();
        });
        $('#rehook').click(function () {
            $('#rehook,#enable').hide();
            initJcrop();
            $('#unhook,.requiresjcrop').show();
            return false;
        });
        $('#unhook').click(function () {
            jcrop_api.destroy();
            $('#unhook,#enable,.requiresjcrop').hide();
            $('#rehook').show();
            return false;
        });

        $('#img1').click(function () {
            $(this).addClass('active').closest('.btn-group').find('button.active').not(this).removeClass('active');
            jcrop_api.setImage('demo_files/sago.jpg');
            jcrop_api.setOptions({bgOpacity: .6});
            return false;
        });
        $('#img2').click(function () {
            $(this).addClass('active').closest('.btn-group')
                .find('button.active').not(this).removeClass('active');

            jcrop_api.setImage('demo_files/pool.jpg');
            jcrop_api.setOptions({bgOpacity: .6});
            return false;
        });
        $('#img3').click(function () {
            $(this).addClass('active').closest('.btn-group').find('button.active').not(this).removeClass('active');
            jcrop_api.setImage('demo_files/sago.jpg', function () {
                this.setOptions({
                    bgOpacity: 1,
                    outerImage: 'demo_files/sagomod.jpg'
                });
                this.animateTo(getRandom());
            });
            return false;
        });

        $('#can_click').change(function () {
            jcrop_api.setOptions({allowSelect: !!this.checked});
            jcrop_api.focus();
        });
        $('#can_move').change(function () {
            jcrop_api.setOptions({allowMove: !!this.checked});
            jcrop_api.focus();
        });
        $('#can_size').change(function () {
            jcrop_api.setOptions({allowResize: !!this.checked});
            jcrop_api.focus();
        });
        $("input[name='lock_size']").change(function () {
            var size = $("input[name='lock_size']:checked").val();
            var array = size.split("/");
            var width = array[0];
            var height = array[1];
            jcrop_api.setOptions(this.checked ?
                {aspectRatio: width/height} : {aspectRatio: 0});
            jcrop_api.focus();
        });
        $('#size_lock').change(function () {
            jcrop_api.setOptions(this.checked ? {
                    minSize: [80, 80],
                    maxSize: [350, 350]
                } : {
                    minSize: [0, 0],
                    maxSize: [0, 0]
                });
            jcrop_api.focus();
        });

    });
</script>

</body>
</html>

