/*
   当前基础包包含:
   基础公共方法
   兼容老版本公共方法
   小莹姐的组件调用的公共方法类

   基础包 包含:
   browserbase.js 浏览器基础包
   colorbase.js 颜色基础包
   layout.js  布局基础包
   database.js 数据处理基础包
*/

(function (window) {
    "use strict";
    var module = {};

    //全局属性配置
    module.UI_ATTR = ["an-tabs", "an-accordion", "an-datagrid", "an-combo", "an-spinner", "an-related", "an-datagridPagination", "an-checkbox", "an-radiobox", "an-topnav","an-sidemenu","an-tabsheader","an-scrollbar","an-scrolltabs"];
    //全局布局配置
    module.UI_LAYOUT = ["g-layout", "g-max", "g-h-max", "g-w-max", "g-h-auto", "g-w-auto"];
    //全局自动执行配置
    module.UI_PERFORM = ["u-switch"];
    // 屏蔽渲染配置
    module.UI_SHIELDING = ["shielding"];//屏蔽layout perform
    module.UI_SHIELDING_LAYOUT = ["shielding-layout"];//屏蔽layout
    module.UI_SHIELDING_PERFORM = ["shielding-perform"];//屏蔽perform
    //全局事件名定义
    module.EVENT_CLICK = "andy_click";//点击事件
    module.COMBO_CHOOSE_LISET = "combo_choose_list";//combo选择事件

    // 全局延迟等级
    module.SETTIME_01 = 100;
    module.SETTIME_02 = 200;

    // IE6渲染开关
    module.LAYOUT_IE6 = true;

    // ------------------------------------------基础类公共方法

    //设置对象zindex
    //参数：对象路径， zindex层级
    //使用方法 an_setZindex(element, index);
    module.setZindex = function (element, index) {
        $(element).css("z-index", index);
    };

    // 获取0+随机数
    module.getRandom = function(n){
        return Math.floor(Math.random()*n+1);
    };

    // 获取随机id
    module.setRandomId = function(dom, name, number){
        var id = dom.attr("id");
        var randomNumber = number || 10000;
        if(id == undefined || id == null || id == ""){
            id = name+andy.getRandom(randomNumber);
            dom.attr("id", id);
            dom = $("#"+id);
        }else{
            dom = $("#"+id);
        }
        return dom;
    };

    //中继器
    //设置中继器，属性 方法 都可以
    module.setWindow = function (options) {
        var element = window.top.an_element;
        if (element) {
            window.top.an_element = $.extend(window.top.an_element, options);
        }
        else {
            window.top.an_element = options;
        }
    };

    //从中继器获取，设置的属性 方法
    module.getWindow = function (options) {
        return window.top.an_element;
    };

    //执行 为idXX的iframe里面的name方法，options为参数
    // id, name, options
    module.toWindow = function () {
        //平级查找||当前子集查找
        var id = arguments[0];
        var name = arguments[1];
        var box = window.top.$("#" + id)[0] || $("#" + id)[0];
        if (!box) {
            //平级子集查找
            box = window.top.$("iframe").contents().find("#" + id)[0];
        }
        box = box.contentWindow;
        // var box = window.top.document.getElementById(id).contentWindow;
        // var windowbox = element[0] ? element : $(this).contents().find("#" + id);

        var args = [];
        if (arguments.length > 2) {
            for (var i = 2, len = arguments.length; i < len; i++) {
                args.push(arguments[i]);
            }
        }
        ;

        if (box && box[name]) {
            box[name].apply(this, args);
        }
        else {
            console.log("don't have this id!")
        }
    };

    //弹出combo
    module.combo = function(){
        // 绑定选中事件
        var options = {};
        var funstyle = "";
        for(var i= 0; i <arguments.length;i++){
            // console.log(arguments[0]);
            var a = arguments[0];
            if(typeof a == "object"){
                options = a;
            }else if(typeof a == "string"){
                funstyle = a;
            }
        };
        var opts = $.extend({
            combo:"", //combo对象
            showEvent:"click",//默认触发事件
            hiddenEvent:"mouseleave", //默认隐藏事件
            isEnable:true,//默认可用
            setTime:200,//缓冲时间
            showComplete: function () {
                //完成显示回调  
            },
            hiddenComplete:function(){
                // 隐藏完成回调
            }
        }, options);

        if(funstyle != ""){
            if(funstyle == "getTouchTarget"){
                // 方法名 combo对象
                var combo = arguments[1];
                return getTouchTarget(combo);
            }else if(funstyle == "getShowTarget"){
                var combo = arguments[1];
                return getShowTarget(combo);
            }else if(funstyle == "hiddenTarget"){
                var combo = arguments[1];
                return hiddenShowTarget(combo);
            }
        }else{
            var combo = opts.combo;
            combo.touchTarget = combo.find("[combo]").first();
            combo.showTarget;
            combo.children(":gt(0)").each(function(i, e){
                if($(e).is("[combo='"+combo.touchTarget.attr("combo")+"']")){
                    combo.showTarget = $(e);
                }
            });
            // 获取 设置对象
            var getOption = combo.attr("opstion");
            var getValueElement = "";
            if(getOption){
                getOption = getOption.split(",");
                // 处理设置
                for(var i = 0; i < getOption.length; i++){
                    var o = getOption[i].split(":");
                    if(o[0] == "show"){
                        // showEvent = o[1];
                        opts.showEvent = o[1];
                    }else if(o[0] == "hidden"){
                        opts.hiddenEvent = o[1];
                    }
                }
            };
            var timeHanld = "";
            combo.enable = opts.isEnable;
            var eventTarget = combo.touchTarget.parent();
            if(eventTarget.is("[an-combo]")){
                eventTarget = combo.touchTarget;
            }

            if(opts.isEnable){
                eventTarget.unbind(opts.showEvent);
                eventTarget.bind(opts.showEvent, function(e){
                    if(combo.data("isEnable") && combo.data("isText") == false){
                        if(combo.hasClass("open")){
                            combo.showTarget.css("display", "none");
                            combo.removeClass("open");
                        }else{
                            if(combo.showTarget.is("ul") == false){
                                andy.formlayout();
                            }
                            combo.showTarget.css("display", "block");
                            combo.addClass("open");
                            opts.showComplete();
                        }
                    }
                });

                combo.on(opts.hiddenEvent, function(e){
                    timeHanld = setTimeout(function(){
                        combo.showTarget.css("display", "none");
                        // closeAll();
                        combo.removeClass("open");
                        opts.hiddenComplete();
                        timeHanld = "";
                    }, opts.setTime);
                });

                combo.mouseover(function(e){
                    if(timeHanld != ""){
                        clearTimeout(timeHanld);
                        timeHanld = "";
                    }
                });
            // }else{
                // 对于动作来说 把css样式 分离到 组件去
                // if(combo.touchTarget){
                //     combo.touchTarget.addClass("u-disabled");
                // }
            }

        }

        function getTouchTarget(combo){
            return combo.find("[combo]").first();
        }

        function getShowTarget(combo){
            var show;
            var touchTarget = combo.find("[combo]").first();
            combo.children(":gt(0)").each(function(i, e){
                if($(e).is("[combo='"+touchTarget.attr("combo")+"']")){
                    show = $(e);
                }
            });
            return show;
        }

        function hiddenShowTarget(combo){
            var showTarget = getShowTarget(combo);
            if(showTarget){
                showTarget.css("display", "none");
            }
            combo.removeClass("open");
        }
    };

    //浏览器启动全屏
    module.fullscreen=module.an_fullscreen = function () {
        //ie浏览启动器全屏(需要设置ie浏览器Internet选项-安全-Internet-自定义级别中-对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本 点启用）
        var ieInto = function () {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
        //非ie浏览器启动全屏
        var into = function (element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            }
            else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
            else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
            else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            ieInto();
        }
        else {
            into(window.top.document.documentElement);
        }
    };
    //退出全屏
    module.exitFullscreen = function () {
        //ie浏览退出器全屏
        var ieExit = function () {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
        //非ie浏览器退出全屏
        var exit = function () {
            if (window.top.document.exitFullscreen) {
                window.top.document.exitFullscreen();
            }
            else if (window.top.document.mozCancelFullScreen) {
                window.top.document.mozCancelFullScreen();
            }
            else if (window.top.document.webkitExitFullscreen) {
                window.top.document.webkitExitFullscreen();
            }
        }
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            ieExit();
        }
        else {
            exit();
        }
    };

    //-----------------------------------------------小莹姐组件使用的公共方法

    
    /**
     * 销毁iframe，释放iframe所占用的内存。
     * 特别针对IE
     * @param iframe 需要销毁的iframe对象
     */
    module.destroyIframe = function(iframe){
        var i,ciframes;
        try{
            if(iframe.contentWindow && iframe.contentWindow.$){
                ciframes = iframe.contentWindow.$('iframe');
            }else {
                ciframes = iframe.contentWindow.document.getElementsByTagName("iframe");
            }

            //先销毁子页面的内存
            if(ciframes.length>0){
                for(i=0;i<ciframes.length;i++){
                    module.destroyIframe(ciframes[i]);
                }
            }
            //把iframe指向空白页面，这样可以释放大部分内存。
            iframe.src = 'about:blank';
        
            iframe.contentWindow.document.write('');
            iframe.contentWindow.document.clear();
        }catch(e){}
        //把iframe从页面移除
        if(iframe.parentNode){
            iframe.parentNode.removeChild(iframe);
        }
    };

    /***
     * 执行回调数组，主要用于组件模块的回调数组，
     * 要求每个函数必须有返回值，true表示继续正常执行，false
     * @param arr 函数数组
     * @param args 执行函数参数
     */
    module.arrayFunCall = function (arr, args) {
        var iden = true;
        if (arr.length > 0) {
            var i = 0;
            for (i; i < arr.length; i++) {
                if (typeof arr[i] === "function") {
                    iden = iden && arr[i](args);
                }
            }
        }
        return iden;
    };

    /**
     * 对象合并
     * @returns {*|{}} 任意个参数
     */
    module.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        //如果第一个值为bool值，那么就将第二个参数作为目标参数，同时目标参数从2开始计数
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
        }
        // 当目标参数不是object 或者不是函数的时候，设置成object类型的
        if (typeof target !== "object" && !andy.isFunction(target)) {
            target = {};
        }
        //如果extend只有一个函数的时候，那么将跳出后面的操作
        if (length === i) {
            target = this;
            --i;
        }
        for (; i < length; i++) {
            // 仅处理不是 null/undefined values
            if ((options = arguments[i]) != null) {
                // 扩展options对象
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    // 如果目标对象和要拷贝的对象是恒相等的话，那就执行下一个循环。
                    if (target === copy) {
                        continue;
                    }
                    // 如果我们拷贝的对象是一个对象或者数组的话
                    if (deep && copy && ( andy.isPlainObject(copy) || (copyIsArray = andy.isArray(copy)) )) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && andy.isArray(src) ? src : [];
                        } else {
                            clone = src && andy.isPlainObject(src) ? src : {};
                        }
                        //不删除目标对象，将目标对象和原对象重新拷贝一份出来。
                        target[name] = andy.extend(deep, clone, copy);
                        // 如果options[name]的不为空，那么将拷贝到目标对象上去。
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        // 返回修改的目标对象
        return target;
    };

    //--------------------------------------------兼容老版本公共方法保留
    //敲击回车事件
    //an_enter({element:要绑定回车事件的dom节点、id、class,callback:回车事件中要执行的函数})----调用回车事件函数
    module.enter = function (element, callback) {
        var element = element == undefined ? document : element;
        $(element).keydown(function () {
            if (event.keyCode == 13) {
                callback();
            }
        })
    };
    //移除回车事件
    //an_unenter({element:要移除回车事件的dom节点、id、class})------调用移除回车事件函数
    module.unEnter = function (element) {
        $(element).off("keydown");
    }; 
    
    //自动滚动条
    module.scrollbar = function () {
        $('.scrollbar').each(function (index, element) {
            var scrh = $(this).height(), scrw = $(this).width();
            $(this).mCustomScrollbar(
                {
                    setWidth: scrw,
                    setHeight: scrh,
                    axis: "y",
                    scrollbarPosition: "inside",
                    autoDraggerLength: true,
                    autoHideScrollbar: true,
                    autoExpandScrollbar: true,
                    alwaysShowScrollbar: 0,
                    mouseWheel: {
                        enable: true
                    },
                    keyboard: {
                        enable: true
                    },
                    theme: "minimal-dark",
                    scrollInertia: 800,
                    live: 'on'
                });
        });
    };

    //默认图片...
    module.img = function (element) {
        if(element && element.is("img[src='#']")){
            var imgW = element.width(), imgH = element.height();
            if (element.attr('title') == '' || element.attr('title') == undefined) {
                var imgtitle = '';
            }
            else {
                var imgtitle = element.attr('title') + ' ';
            }
            element.removeAttr('src').attr('data-src', 'holder.js/' + imgW + 'x' + imgH + '?font=Lucida Family&text=' + imgtitle + imgW + '×' + imgH);
        }else{
            // $("img[src='#']").each(function (index, element) {
            //     var imgW = $(this).width(), imgH = $(this).height();
            //     if ($(this).attr('title') == '' || $(this).attr('title') == undefined) {
            //         var imgtitle = '';
            //     }
            //     else {
            //         var imgtitle = $(this).attr('title') + ' ';
            //     }
            //     $(this).removeAttr('src').attr('data-src', 'holder.js/' + imgW + 'x' + imgH + '?font=Lucida Family&text=' + imgtitle + imgW + '×' + imgH);
            // });
        }
        
    };

    //页面跳转...
    module.url = function (url, target) {
        if (target == 'top') {
            top.location = url;
        }
        else if (target == 'self') {
            self.location = url;
        }
        else {
            window.top.contentWindow.find(target).attr('src', url);
        }
    };
    //ajax加载...
    module.dataurl = function () {
        $("[data-url]").each(function () {
            var dataurl = $(this).attr('data-url');
            var datacallback = $(this).attr('data-callback');
            $(this).load(dataurl, datacallback);
        });
    };
    //a链接默认失效
    module.a = function () {
        $("[href='#']").each(function (index, element) {
              $(this).attr('href', 'javascript:void(0)');
        });
    };
    //单选多选样式渲染
    module.checked = function () {
        $(".an_checkbox").each(function (index, element) {
            var $this = $(element),
                $text = $this.attr('title'),
                packagee = '';
            if ($this.attr('type') == 'checkbox' && $this.hasClass('switch') == false) {
                packagee = '<label class="i-checks"></label>'
            }
            else if ($this.attr('type') == 'radio') {
                packagee = '<label class="i-checks"></label>'
            }
            else if ($this.attr('type') == 'checkbox' && $this.hasClass('switch')) {
                packagee = '<label class="i-switch m-r-sm"></label>';
                $text = '<span class="textmax">' + $this.attr('title') + '</span>';
            }
            if ($this.parent().is('label')) {
                //已经封装过的选择器不在渲染
                return false
            }
            else {
                $this.wrap(packagee);
                $this.after(' <i></i>' + $text);
            }
            var clickbox = $this.parent();
            if ($this.hasClass('checkbox-inline')) {
                clickbox.addClass('checkbox-inline');
            }
        });
    };
    
    module.closesearch = function (e, h, i) {
        var t = $(e).text();
        if (t == '高级搜索') {
            $(i).layout('panel', 'north').panel('resize', {
                height: h
            });
            $(i).layout('resize');
            $(e).text('关闭搜索');
        }
        if (t == '关闭搜索') {
            $(i).layout('panel', 'north').panel('resize', {
                height: 1
            });
            $(i).layout('resize');
            $(e).text('高级搜索');
        }
    };

    // 实际渲染测试
    module.miniDialog = function(options){
        var op = $.extend({}, {
            content:""
        }, options)

        var body = $("body");
        body.find(".m-alertbox").length>0?null:body.append("<div class = 'm-alertbox t-m'></div>");
        var alertBox = body.find(".m-alertbox");
        alertBox.append("<div class = 'minidialog'>"+op.content+"</div>");
        var dialog = body.find(".minidialog:last");
        dialog.css({
            "background":"#000",
            "background-color":"rgba(0, 0, 0, 0.4)",
            "text-align":"center",
            "padding":"10px",
            "word-wrap": "break-word",
            "margin-top":"10px",
            "color":"#fff"
        })
        setTimeout(function(){
            dialog.remove()
        }, 3000)
    }
    module.setDebug = function(state){
        module.debug = state;
    }
    module.getDebug = function(){
        module.debug?null:module.debug = "close";
        return module.debug;
    }

    module.startCheck = function(str){
        var debug = module.getDebug();
        module.costTime = 0;
        module.costTitle = str||"";
        module.checkHanld = null;
        debug == "open"?module.checkHanld = setInterval(function(){
            module.costTime += 1;
        }, 1):null;
    }
    
    module.endCheck = function(){
        var debug = module.getDebug();
        if(debug == "open"){
            module.checkHanld?clearInterval(module.checkHanld):null;
            module.miniDialog({
            content:module.costTitle+module.costTime
            })
            module.costTime = 0;
            module.costTitle = "";
        }
    }

    window.andy = module;
})(window);
