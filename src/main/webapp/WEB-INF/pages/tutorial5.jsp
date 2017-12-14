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
        jQuery(function ($) {

            // The variable jcrop_api will hold a reference to the
            // Jcrop API once Jcrop is instantiated.
            var jcrop_api;

            // In this example, since Jcrop may be attached or detached
            // at the whim of the user, I've wrapped the call into a function
            initJcrop();

            // The function is pretty simple
            function initJcrop()//{{{
            {
                // Hide any interface elements that require Jcrop
                // (This is for the local user interface portion.)
                $('.requiresjcrop').hide();

                // Invoke Jcrop in typical fashion
                $('#target').Jcrop({
                    onRelease: releaseCheck
                }, function () {

                    jcrop_api = this;
                    jcrop_api.animateTo([100, 100, 400, 300]);

                    // Setup and dipslay the interface for "enabled"
                    $('#can_click,#can_move,#can_size').attr('checked', 'checked');
                    $('#ar_lock,#size_lock,#bg_swap').attr('checked', false);
                    $('.requiresjcrop').show();

                });

            };
            //}}}

            // Use the API to find cropping dimensions
            // Then generate a random selection
            // This function is used by setSelect and animateTo buttons
            // Mainly for demonstration purposes
            function getRandom() {
                var dim = jcrop_api.getBounds();
                return [
                    Math.round(Math.random() * dim[0]),
                    Math.round(Math.random() * dim[1]),
                    Math.round(Math.random() * dim[0]),
                    Math.round(Math.random() * dim[1])
                ];
            };

            // This function is bound to the onRelease handler...
            // In certain circumstances (such as if you set minSize
            // and aspectRatio together), you can inadvertently lose
            // the selection. This callback re-enables creating selections
            // in such a case. Although the need to do this is based on a
            // buggy behavior, it's recommended that you in some way trap
            // the onRelease callback if you use allowSelect: false
            function releaseCheck() {
                jcrop_api.setOptions({allowSelect: true});
                $('#can_click').attr('checked', false);
            };

            // Attach interface buttons
            // This may appear to be a lot of code but it's simple stuff
            $('#setSelect').click(function (e) {
                // Sets a random selection
                jcrop_api.setSelect(getRandom());
            });
            $('#animateTo').click(function (e) {
                // Animates to a random selection
                jcrop_api.animateTo(getRandom());
            });
            $('#release').click(function (e) {
                // Release method clears the selection
                jcrop_api.release();
            });
            $('#disable').click(function (e) {
                // Disable Jcrop instance
                jcrop_api.disable();
                // Update the interface to reflect disabled state
                $('#enable').show();
                $('.requiresjcrop').hide();
            });
            $('#enable').click(function (e) {
                // Re-enable Jcrop instance
                jcrop_api.enable();
                // Update the interface to reflect enabled state
                $('#enable').hide();
                $('.requiresjcrop').show();
            });
            $('#rehook').click(function (e) {
                // This button is visible when Jcrop has been destroyed
                // It performs the re-attachment and updates the UI
                $('#rehook,#enable').hide();
                initJcrop();
                $('#unhook,.requiresjcrop').show();
                return false;
            });
            $('#unhook').click(function (e) {
                // Destroy Jcrop widget, restore original state
                jcrop_api.destroy();
                // Update the interface to reflect un-attached state
                $('#unhook,#enable,.requiresjcrop').hide();
                $('#rehook').show();
                return false;
            });

            // Hook up the three image-swapping buttons
            $('#img1').click(function (e) {
                $(this).addClass('active').closest('.btn-group')
                    .find('button.active').not(this).removeClass('active');

                jcrop_api.setImage('demo_files/sago.jpg');
                jcrop_api.setOptions({bgOpacity: .6});
                return false;
            });
            $('#img2').click(function (e) {
                $(this).addClass('active').closest('.btn-group')
                    .find('button.active').not(this).removeClass('active');

                jcrop_api.setImage('demo_files/pool.jpg');
                jcrop_api.setOptions({bgOpacity: .6});
                return false;
            });
            $('#img3').click(function (e) {
                $(this).addClass('active').closest('.btn-group')
                    .find('button.active').not(this).removeClass('active');

                jcrop_api.setImage('demo_files/sago.jpg', function () {
                    this.setOptions({
                        bgOpacity: 1,
                        outerImage: 'demo_files/sagomod.jpg'
                    });
                    this.animateTo(getRandom());
                });
                return false;
            });

            // The checkboxes simply set options based on it's checked value
            // Options are changed by passing a new options object

            // Also, to prevent strange behavior, they are initially checked
            // This matches the default initial state of Jcrop

            $('#can_click').change(function (e) {
                jcrop_api.setOptions({allowSelect: !!this.checked});
                jcrop_api.focus();
            });
            $('#can_move').change(function (e) {
                jcrop_api.setOptions({allowMove: !!this.checked});
                jcrop_api.focus();
            });
            $('#can_size').change(function (e) {
                jcrop_api.setOptions({allowResize: !!this.checked});
                jcrop_api.focus();
            });
            $("input[name='lock_size']").change(function (e) {
                var size = $("input[name='lock_size']:checked").val();
                var array = size.split("/");
                var width = array[0];
                var height = array[1];
                jcrop_api.setOptions(this.checked ?
                    {aspectRatio: width/height} : {aspectRatio: 0});
                jcrop_api.focus();
            });
            $('#size_lock').change(function (e) {
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
    <link rel="stylesheet" href="${base}/resources/layui/css/main.css" type="text/css"/>
    <link rel="stylesheet" href="${base}/resources/layui/css/demos.css" type="text/css"/>
    <link rel="stylesheet" href="${base}/resources/layui/css/jquery.Jcrop.css" type="text/css"/>
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

        #dl_links {
            margin-top: .5em;
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
                <span class="requiresjcrop">
                  <button id="setSelect" class="btn btn-mini">随机选择</button>
                  <%--<button id="animateTo" class="btn btn-mini">animateTo</button>--%>
                  <button id="release" class="btn btn-mini">取消</button>
                  <%--<button id="disable" class="btn btn-mini">Disable</button>--%>
                </span>
                    <%--<button id="enable" class="btn btn-mini" style="display:none;">Re-Enable</button>--%>
                    <button id="unhook" class="btn btn-mini">禁用</button>
                    <button id="rehook" class="btn btn-mini" style="display:none;">使用</button>
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

</body>
</html>

