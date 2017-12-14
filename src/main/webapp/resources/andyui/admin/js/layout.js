/*
    布局、定位
*/

(function (window) {
    var module = {};

    //浮动面板
    module.floatbox = function (a) {
        if(a.is('.top')){
            if(a.is(':hidden')){
                a.show()
                    var floath=a.outerHeight();
                    a.css('top',0-floath-5+'px').animate({top:'0px'},300);
                }
            else {
                var floath=a.outerHeight();
                a.animate({top:0-floath-5+'px'},300,function(){a.hide()});
            }
        }

        if(a.is('.bottom')){
            if(a.is(':hidden')){
                a.show()
                var floath=a.outerHeight();
                a.css('bottom',0-floath-5+'px').animate({bottom:'0px'},300);
            }
            else {
                var floath=a.outerHeight();
                a.animate({bottom:0-floath-5+'px'},300,function(){a.hide()});
            }
        }
        if(a.is('.left')){
            if(a.is(':hidden')){
                a.show()
                var floatw=a.outerWidth();
                a.css('left',0-floath-5+'px').animate({left:'0px'},300);
            }else {
                var floath=a.outerWidth();
                a.animate({left:0-floath-5+'px'},300,function(){a.hide()});
            }
        }

        if(a.is('.right')){
            if(a.is(':hidden')){
                a.show()
                var floatw=a.outerWidth();
                a.css('right',0-floath-5+'px').animate({right:'0px'},300);
            }else {
                var floath=a.outerWidth();
                a.animate({right:0-floath-5+'px'},300,function(){a.hide()});
           }
        }
    };
    //浮动面板事件响应
    module.floatact = function () {
        $("[an-float]").each(function(index, element) {
            var act=$(this).attr('option');
            if(act=='click'){
                $(this).click(function(){andy.floatbox($(this))})
                }
            else if(act=='leave'){
                $(this).on("mouseleave", function(){
                    andy.floatbox($(this));
                    })
                }
        });
    };
    // 自动执行
    module.perform = function(e){
        var body = $("body");
        if(e){
            body = e;
            // body.css("overflow", "");
        };
        // 元件类功能执行
        for(var i = 0;i<andy.UI_PERFORM.length;i++){
            var name = andy.UI_PERFORM[i];
            if(name == "u-switch"){
                // body.find("." + name).each(function(index, cell){
                //     $(cell).switchs();
                // });
                if(body.hasClass(name)){
                    body.switchs();
                }
            };
        };
        // 控件tabs accrodion datagrid等执行
        for(var i = 0;i<andy.UI_ATTR.length;i++){
            var name = andy.UI_ATTR[i];
            // body.find("["+name+"]").each(function(i, e){
            //     var ui = $(e);
            //     if(!ui.attr(name)){
            //         ui.attr(name, name)
            //         ui[name.replace("-", "_")]({});
            //     }
            // })
            if(body.is("["+name+"]")){
                if(!body.attr(name)){
                    body.attr(name, name)
                    body[name.replace("-", "_")]({});
                }
            }
        };

        if(body.children("div,input,form,table,thead,tbody,th,tr,td,img,ul,li,a").length>0){
            body.children("div,input,form,table,tbody,th,tr,td,img,ul,li,a").each(function(index, cell){
                var cell = $(cell);
                if(cell.is("img")){
                    andy.img(cell);
                }
                // 屏蔽隔断判断
                if(!cell.hasClass(andy.UI_SHIELDING) && !cell.hasClass(andy.UI_SHIELDING_PERFORM) && !cell.is("[autoxmpcode=true]")){
                    andy.perform(cell)
                }
            })
        }
        
    };
    
    module.layout = function(e){
        // 浏览器是ie6 ie6是否开启渲染
        if(andy.IE() == 6 && andy.LAYOUT_IE6 == false){
            return false;
        };

        var body = $("body");
        if(e){
            body = e;
            // body.css("overflow", "");
        };

        body.each(function(index, element){
            var $element = $(element);
            var parentWidth, parentHeight;
            if($element.parent().is('body')){
                parentWidth=$(window).width();
                parentHeight=$(window).height();
                // alert("body:"+parentWidth+ parentHeight);
            }else{
                var parentElement = $element.parent();
                if(parentElement.is("form")){
                    parentElement = parentElement.parent();
                }
                parentWidth=parentElement.width();
                parentHeight=parentElement.height();
            };
            for(var i = 0;i<andy.UI_LAYOUT.length;i++){
                var name = andy.UI_LAYOUT[i];
                if($element.hasClass(name)){
                    if(name == "g-layout"){
                        //设置框架各个元素的尺寸
                        andy.autolayout($element,parentWidth,parentHeight);
                    }else if(name == "g-max"){
                        andy.gmax($element);//最大化
                    }else if(name == "g-h-max"){
                        andy.hmax($element);//高度填充
                    }else if(name == "g-w-max"){
                        andy.wmax($element);//宽度最大化 分割
                    }else if(name == "g-h-auto"){
                        andy.hauto($element);
                    }else if(name == "g-w-auto"){
                        andy.wauto($element);
                    };
                    
                };
            };
            for(var i = 0;i<andy.UI_ATTR.length;i++){
                var name = andy.UI_ATTR[i]; 
                // ["an-tabs", "an-accordion", "an-datagrid"]
                var attrName = $element.attr(name);
                if(attrName == "an-tabs"){
                    andy.tabsLayout($element);
                }else if(attrName == "an-datagrid"){
                    andy.datagridLayout($element);
                };
            };
            if($element.children("div").length > 0){
                // 处理子集为DIV的对象
                $element.children("div").each(function(i, el){
                    var div = $(el);
                    if(!div.hasClass("f-hidden") && !div.hasClass("item") && !div.hasClass(andy.UI_SHIELDING) && !div.hasClass(andy.UI_SHIELDING_LAYOUT) && !div.is("[autoxmpcode=true]")){
                        andy.layout(div);
                    }
                });
                // 渲染表单问题 待处理
                andy.formlayout();
            }else if($element.children("table,form").length > 0){
                // 处理子集为table的对象
                $element.children("table,form").each(function(i, el){
                    var cell = $(el);
                    if(!cell.hasClass(andy.UI_SHIELDING) && !cell.hasClass(andy.UI_SHIELDING_LAYOUT) && !cell.is("[autoxmpcode=true]")){
                        andy.layout(cell); 
                        // 渲染表单问题 待处理
                        andy.formlayout(cell);
                    }
                });
                
            }else if($element.children("iframe").length > 0){
                // console.log($element.children("iframe"))
                // IE6强制刷新
                var ieversion = andy.IE();
                if(ieversion <= 8 && ieversion != 0){
                    var iframe = $element.children("iframe");
                    if(iframe[0].contentWindow&&iframe[0].contentWindow.andy){
                        iframe[0].contentWindow.andy.layout();
                    }
                    //var src = iframe.attr("src");
                    //iframe.attr("src", src);
                };
            };
        });
        
    };

    // 执行渲染 和功能
    module.activeTarget = function(e){
        var body = $("body");
        if(e){
            body = e;
            // body.css("overflow", "");
        };
        andy.perform(e)
        andy.layout(e)
    }

    //tabs布局
    module.tabsLayout = function(tabs){
        var pheight = tabs.parent().height();
        var pwidth = tabs.parent().width();
        var tabsDiv = tabs[0];
        if (tabsDiv.option && tabsDiv.option.fit == false){
            if(tabsDiv.option.height > 0){
                pheight = tabsDiv.option.height;
            };
            if(tabsDiv.option.width > 0){
                pwidth = tabsDiv.option.width;
            };
        }
        var head = tabs.children(".m-tabs-header");
        var body = tabs.children(".m-tabs-content");
        var item = body.children(".item");
        var bodyPadding = parseInt(item.css("padding-left"));
        var _stringclass = {
            head:"m-tabs-header",
            body:"m-tabs-content",
            hidden:"f-hidden",
            layouted:"layouted",
            item:"item",
            active:"activate",
            headTop:"head-top",
            headLeft:"head-left",
            headRight:"head-right",
            headBottom:"head-bottom"
        };
        if(typeof(bodyPadding) != "number"){
            bodyPadding = 0;
        }
        
        var headHeight = 0;//head.outerHeight() + bodyPadding *2;
        var headWidth = 0;
        if(!tabs.hasClass(_stringclass.headTop) && !tabs.hasClass(_stringclass.headLeft) && !tabs.hasClass(_stringclass.headRight) && !tabs.hasClass(_stringclass.headBottom)){
            headHeight = head.outerHeight();
        }else if(tabs.hasClass(_stringclass.headTop)){
            headHeight = head.outerHeight();
        }else if(tabs.hasClass(_stringclass.headLeft)){
            headWidth = head.outerWidth();
        }else if(tabs.hasClass(_stringclass.headRight)){
            headWidth = head.outerWidth();
        }else if(tabs.hasClass(_stringclass.headBottom)){
            headHeight = head.outerHeight();
        }
        // tabs.height(pheight).width(pwidth);
        tabs.outerHeight(pheight).outerWidth(pwidth);
        body.outerHeight(pheight - headHeight).outerWidth(pwidth - headWidth);
        var bodyHeight = body.height();
        var bodyWidth = body.width();
        // body.height(pheight - headHeight).width(pwidth - headWidth);
        body.children().each(function(index, content){
            var $content = $(content);
            $content.removeClass(_stringclass.layouted);
            $content.outerHeight(bodyHeight).outerWidth(bodyWidth);
            // 响应式布局 后渲染当前选中页面
            if($content.hasClass(_stringclass.active)){
                andy.layout($content);
            }
        });
    }

    //datagrid布局
    module.datagridLayout = function(datagrid){
        var pheight = datagrid.parent().parent().parent().height();
        var pwidth = datagrid.parent().parent().parent().width();
        // console.log(pheight, pwidth, datagrid.offsetParent());
        datagrid.an_tableLayout(datagrid, pwidth, pheight);
    }

    module.autolayout = function(element,pw,ph){
        if(element[0]){
            element.outerWidth(pw).outerHeight(ph);
        }
        var layout = element;
        var layhead = layout.children(".layout-head");
        var layleft = layout.children(".layout-left");
        var layright = layout.children(".layout-right");
        var layfoot = layout.children(".layout-foot");
        var laycenter = layout.children(".layout-center");

        if(layhead[0]){
            // layhead.width(pw);
            layhead.outerWidth(pw);
        };

        if(layfoot[0]){
            // layfoot.width(pw);
            layfoot.outerWidth(pw);
        };

        if(layleft[0]){
            var layheadHeight = 0;
            var layfootHeight = 0;

            if(layhead[0]){
                layheadHeight = layhead.height();
            };
            if(layfoot[0]){
                layfootHeight = layfoot.height();
            };
            layleft.height(ph - layheadHeight - layfootHeight);
            layleft.css('top',layheadHeight+'px');
        };

        if(layright[0]){
            var layheadHeight = 0;
            var layfootHeight = 0;
            if(layhead[0]){
                layheadHeight = layhead.height();
            };
            if(layfoot[0]){
                layfootHeight = layfoot.height();
            };

            layright.height(ph - layheadHeight - layfootHeight);
            layright.css('top',layheadHeight+'px');
        };

        if(laycenter[0]){
            var layleftWidth = 0;
            var layrightWidth = 0;
            var layheadOuterHeight = 0;
            var layfootOuterHeight = 0;
            var layleftOuterWidth = 0;
            var layrightOuterWidth = 0;

            if(layleft[0]){
                layleftWidth = layleft.width();
                layleftOuterWidth = layleft.outerWidth();
            };
            if(layright[0]){
                layrightWidth = layright.width();
                layrightOuterWidth = layright.outerWidth();
            };
            if(layhead[0]){
                layheadOuterHeight = layhead.outerHeight();
            };
            if(layfoot[0]){
                layfootOuterHeight = layfoot.outerHeight();
            };
            // 注释的是 以前计算方式
            // laycenter.width(pw - layleftWidth - layrightWidth);
            // laycenter.height(ph - layheadOuterHeight - layfootOuterHeight);
            laycenter.outerWidth(pw - layleftOuterWidth - layrightOuterWidth);
            laycenter.outerHeight(ph - layheadOuterHeight - layfootOuterHeight);
            laycenter.css({'top':layheadOuterHeight+'px','left':layleftOuterWidth+'px'});
            // alert(layheadOuterHeight, layleftWidth, layrightWidth);
        };

        if(laycenter.children().is('iframe')){
            var h = laycenter.height();
            andy.hauto(laycenter.children('iframe'));//高度填充
            laycenter.css('overflow','hidden');
        };
    };

    // 获取对象填充内容宽高
    module.getInnerSize = function(element){
        var obj = {
            innerWidth:0,
            innerHeight:0
        };

        var elementParent = element.parent();
        var parenth = elementParent.innerHeight();
        if(elementParent.css("padding-top")){
            parenth -= parseInt(elementParent.css("padding-top"));
        }
        if(elementParent.css("padding-bottom")){
            parenth -= parseInt(elementParent.css("padding-bottom"));
        }
        var parentw = elementParent.innerWidth();
         if(elementParent.css("padding-left")){
            parentw -= parseInt(elementParent.css("padding-left"));
        }
        if(elementParent.css("padding-right")){
            parentw -= parseInt(elementParent.css("padding-right"));
        }

        obj.innerWidth = parentw;
        obj.innerHeight = parenth;
        return obj;
    }
    
    //动态高度填充 上下平分
    module.hmax = function(element){
        var obj = andy.getInnerSize(element);
        var parenth = obj.innerHeight;
        var parentw = obj.innerWidth;
        var hmaxn = element.siblings('.g-h-max').length + 1;
        // var sibls = $(element).siblings().not('.g-h-max');
        var sibls = $(element).siblings(':not(.g-h-max)');
        var sibl = sibls.not('.u-float');
        var siblingn = sibl.length;
        var sum = 0;
        for (var i = 0; i < siblingn; i++) {
            sum += $(sibl[i]).outerHeight();
        };
        // var hmaxH = parseInt((parenth - sum) / hmaxn);
        // 求余 计算浮点数
        var yu = (parenth - sum) % hmaxn;
        var hmaxH = Math.floor((parenth - sum) / hmaxn);
        if(element.index() < yu){
            hmaxH = hmaxH + 1;
        }
        // 关于 padding  border
        // element.height(hmaxH).outerWidth(parentw);
        element.outerHeight(hmaxH, true).outerWidth(parentw, true);
    };

    // 纯h
    module.hauto = function(element){
        var obj = andy.getInnerSize(element);
        var parenth = obj.innerHeight;
        var hmaxn = element.siblings('.g-h-auto').length + 1;
        // var sibls = $(element).siblings().not('.g-h-auto');
        var sibls = $(element).siblings(':not(.g-h-auto)');
        var sibl = sibls.not('.u-float');
        var siblingn = sibl.length;
        var sum = 0;
        for (var i = 0; i < siblingn; i++) {
            sum += $(sibl[i]).outerHeight();
        };
        // 求余 计算浮点数
        var yu = (parenth - sum) % hmaxn;
        var hmaxH = Math.floor((parenth - sum) / hmaxn);
        if(element.index() < yu){
            hmaxH = hmaxH + 1;
        }
        // 关于 padding  border
        element.outerHeight(hmaxH, true)
    };

    // 动态宽度填充
    module.wmax = function(element){
        var obj = andy.getInnerSize(element);
        var parenth = obj.innerHeight;
        var parentw = obj.innerWidth;
        var wmaxn = element.siblings('.g-w-max').length + 1;
        // var sibls = $(element).siblings().not('.g-w-max');
        var sibls = $(element).siblings(':not(.g-w-max)');
        var sibl = sibls.not('.u-float');
        var siblingn = sibl.length;
        var sum = 0;
        for (var i = 0; i < siblingn; i++) {
            sum += $(sibl[i]).outerWidth();
        };
        // 求余 计算浮点数
        var yu = (parentw - sum) % wmaxn;
        var wmaxH = Math.floor((parentw - sum) / wmaxn);
        if(element.index() < yu){
            wmaxH = wmaxH + 1;
        }
        element.outerHeight(parenth, true).outerWidth(wmaxH, true);
    }

    //纯w
    module.wauto = function(element){
        var obj = andy.getInnerSize(element);
        var parentw = obj.innerWidth;
        var wmaxn = element.siblings('.g-w-auto').length + 1;
        // var sibls = $(element).siblings().not('.g-w-auto');
        var sibls = $(element).siblings(':not(.g-w-auto)');
        var sibl = sibls.not('.u-float');
        var siblingn = sibl.length;
        var sum = 0;
        for (var i = 0; i < siblingn; i++) {
            sum += $(sibl[i]).outerWidth();
        };
        // 求余 计算浮点数
        var yu = (parentw - sum) % wmaxn;
        var wmaxH = Math.floor((parentw - sum) / wmaxn);
        if(element.index() < yu){
            wmaxH = wmaxH + 1;
        }
        element.outerWidth(wmaxH, true);
    }

    //动态处理填充尺寸溢出
    module.gmax = function(element){
        var obj = andy.getInnerSize(element);
        var parenth = Math.floor(obj.innerHeight);
        var parentw = Math.floor(obj.innerWidth);
        // 考虑了边框问题
        element.outerWidth(parentw, true);
        element.outerHeight(parenth, true);
    };

    //动态处理u-panel结构 针对panel-head\panel-body\panel-foot布局
    module.panelauto = function(){
        $('.u-panel.u-datagrid').each(function(index, element) {
            var upanel = $(element);
            var Pw=upanel.parent().width(), Ph=upanel.parent().height();
            upanel.height(Ph);
            var panelheight = upanel.outerHeight();
            var head = upanel.children(".panel-head");
            var body = upanel.children(".panel-body");
            var foot = upanel.children(".panel-foot");

            if(body[0]){
                body.height(panelheight - (head.outerHeight()||0) - (foot.outerHeight()||0));
            }
        }); 

        // var windowWidth = $('.u-panel.window').parent().outerWidth();
        // $('.u-panel.window').width(windowWidth);
        $('.u-panel.window').each(function(index, element) {
            var upanel = $(element);
            var padding_top = parseInt(upanel.parent().css("padding-top"));
            var padding_bottom = parseInt(upanel.parent().css("padding-bottom"));
            var Pw=upanel.parent().width(), Ph=upanel.parent().height() - padding_top - padding_bottom;
            // upanel.css("height", Ph);
            upanel.height(Ph);
            var panelheight = upanel.height();//parseInt(upanel.css("height"));
            var head = upanel.children(".panel-head");
            var body = upanel.children(".panel-body");
            var b_padding_top = parseInt(body.css("padding-top"));
            var b_padding_bottom = parseInt(body.css("padding-bottom"));
            var foot = upanel.children(".panel-foot");

            if(body){
                body.height(panelheight - (head.outerHeight()||0) - (foot.outerHeight()||0) - b_padding_top - b_padding_bottom);
            };
        }); 
    };

    //ui布局渲染
    module.uiLayout = function(element){
        // andy.UI_ATTR
        for(var i = 0;i<andy.UI_ATTR.length;i++){
            // console.log(element.children().find("["+name+"]"))
            var name = andy.UI_ATTR[i];
            element.children().find("["+name+"]").trigger("layout");
        }
        
    };
    /**
     * 表单布局
     */
    module.formlayout = function(target){
        $(".m-table-form.inline").find(".u-formitem").each(function(index, element){
            var $element = $(element);
            var thisW = $element.width(),
                thisPH = $element.parent().height();
            // 设置td高度 下面内容是以td高度为准
            // 现在新的 高度是 CSS处理的
            // if($element.hasClass("u-input-span")){
            //     $element.parent().height(thisPH);
            // };

            var maxHeight = 0;
            $element.parent().parent().find('.u-input-span, .u-input, textarea, .g-combo').each(function(i, e){
                // 获取到所有TD内容的 最大高度
                var cell = $(e);
                if(maxHeight == 0){
                    maxHeight = cell.outerHeight();
                }else if(cell.outerHeight() > maxHeight){
                    maxHeight = cell.outerHeight();
                };
            });

            $element.parent().siblings().each(function(i, e){
                var cell = $(e);
                cell.height(maxHeight);
            });
            $element.parent().height(maxHeight);
        })

        // 日期选择器
        $(".u-time-group").find(".u-time-input").each(function(i, e){
            // 屏蔽是因为解决了字体图标的问题
            var input = $(e);
            andy.inputLayout(input);
        });

        if(target){
            target.find(".u-group .u-input, .u-group .g-combo").each(function(i, e){
                // 屏蔽是因为解决了字体图标的问题
                var input = $(e);
                
                if(input.parent().hasClass("m-tooltip")){
                    andy.inputLayout(input.parent());
                }else{
                    andy.inputLayout(input);
                }
                
            });
        }else{
            // andy.fromInit()
            $(".u-group").find(".u-input, .g-combo").each(function(i, e){
                // 屏蔽是因为解决了字体图标的问题
                var input = $(e);
                
                if(input.parent().hasClass("m-tooltip")){
                    andy.inputLayout(input.parent());
                }else{
                    andy.inputLayout(input);
                }
                
            });
        }
    }

    // input布局
    module.inputLayout = function(input){
        var pw = input.parent().width();
        var cw = 0;
        var otherInputCounts = 1;
        if(input.parent().hasClass("u-time-input")){
            return false;
        }
        input.siblings().each(function(j, element){
            // 处理验证TOOLTIP 宽度
            var other = $(element);
            if(other.hasClass("infobox") == false && other.hasClass("u-nd") == false && other.hasClass("u-input") == false && other.hasClass("u-time-input") == false){
                if(input.hasClass("u-input") && other.hasClass("g-combo")){
                    pw -= other.outerWidth();
                }else if(other.hasClass("g-combo") == false && other.hasClass("u-time-input") == false){
                    pw -= other.outerWidth();
                }
            };
            if(input.hasClass("u-input") && other.hasClass("u-input") || input.hasClass("g-combo") && other.hasClass("g-combo") || input.hasClass("u-time-input") && other.hasClass("u-time-input")){
                otherInputCounts += 1;
            }
            if(other.hasClass("item-r")){
                other.css({
                    "position":"absolute",
                    "right":"0",
                    "top":"0"
                })
            }
        });

        // 求余 计算浮点数
        var yu = pw % otherInputCounts;
        var wmaxH = Math.floor(pw / otherInputCounts);
        if(input.index() < yu){
            wmaxH = wmaxH + 1;
        }
        input.outerWidth(wmaxH, true);
        // input.outerWidth(Math.floor(pw/otherInputCounts));
        // 表单里面的ul宽度
        if(input.parent().parent().hasClass("g-combo")){
            var touchTarget = andy.combo("getTouchTarget", input);
            var showTarget = andy.combo("getShowTarget", input);
            
            if(touchTarget && showTarget){
                showTarget.width(input.width());
            }
        }
    };

    //收缩layout
    module.shrinkageLayout = function(options){
        var opts = $.extend({
            element:"", //传入操作对象
            min:0,//收缩最小值
            max:100,//收缩最大值
            direction:"v",//收缩方向 v垂直 l水平
            isAnimation:true,//是否有动画效果
            time:100,//动画作用时间 毫秒
            layout:true,//框架重布局
            shrinkageBefore:function(){},//收缩之前做的操作
            callback: function () {
            } //默认回调
        }, options);

        var element = opts.element;
        var oldHeight = element.height();
        var oldWidth = element.width();
        var min = opts.min;
        var max = opts.max;
        var time = opts.time;
        var aniOver = function(){
            if(opts.layout){
                $.fn.layoutMain();
            }
            opts.callback(element);
        };

        if(!opts.isAnimation){
            time = 0;
        }

        opts.shrinkageBefore();

        if(opts.direction == "v"){
            if(element.height() != min){
                element.animate({height:min + 'px'}, time, aniOver);
            }else{
                element.animate({height:max + 'px'}, time, aniOver);
            }
        }

        if(opts.direction == "l"){
            if(element.width() != min){
                element.animate({width:min + 'px'}, time, aniOver);
            }else{
                element.animate({width:max + 'px'}, time, aniOver);
            }
        }
    };
    window.andy = $.extend({}, true, window.andy, module);
})(window);

(function ($) {
    $.fn.an_queue = function (options) {
        var fun = options.queue;
        $(this).queue("goqueue", fun);
        // $.fn.an_queue.start();
    };
    $.fn.an_queue.next = function (time) {
        var $this = $(this);
        if (time) {
            var s = setTimeout(function () {
                $this.dequeue("goqueue");
            }, time)
        }
        else {
            $this.dequeue("goqueue");
        }
    };
    //图片加载等待
    $.fn.an_imgLoad = function (options) {
        var opts = $.extend({
            time: 4000, ///等待载入时间，如果超过这个时间就直接执行回调
            callback: function () {
            } //默认回调
        }, options);
        var $this = this, i = 0, j = 0, len = this.length;
        $this.each(function () {
            var _this = this, dateSrc = $(_this).attr("date-src"), imgsrc = dateSrc ? dateSrc : _this.src;
            var img = new Image();
            img.onload = function () {
                img.onload = null;
                _this.src = imgsrc;
                i++;
            };
            img.src = imgsrc;
        });
        var t = window.setInterval(function () {
            j++;
            //$("#msg").html(i);
            if (i == len || j * 200 >= opts.time) {
                window.clearInterval(t);
                opts.callback();
            }
        }, 200);
    };

    $.fn.layoutMain = function(){
        if(andy.IE() == 6){
            //框架执行
            if(andy.LAYOUT_IE6){
                andy.layout();
            };
        }else{
            andy.layout();
            // andy.formlayout();
        };
    };
    $(function(){
        $.fn.layoutMain();
        andy.perform();//自动执行
        //默认执行图片占位
        // andy.img();
        andy.floatact();//浮动面板响应动作
        andy.a();//浮动面板响应动作
    });
})(jQuery);

//andy.loading("top", "正在加载...");

$(document).ready(function(){
    var t = null;
    var setTime = andy.SETTIME_02;
    //andy.closeoverlay();
    $(window).resize(function(e){
        if(t){
            window.clearTimeout(t);
        };
        t = window.setTimeout(function(){
            $.fn.layoutMain();
            t = null;
            if(andy.IE() > 7 || andy.IE() == 0){
                // 关于 收缩屏幕渲染问题
                t = window.setTimeout(function(){
                    $.fn.layoutMain();
                    t = null;
                }, setTime/2);
            };

        }, setTime);
    })
});