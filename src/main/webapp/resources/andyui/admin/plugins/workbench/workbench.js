(function ($, win) {
    var module,frameData, dragLi, dragLiParent,startDrag, mouseoverRect,timeHanld,isLock,defaultIcon,pageMarginLeft;
    module = {};
    frameData = {};
    // menu拖动对象
    dragLi = {};
    dragLiParent = [];
    startDrag = {};

    mouseoverRect = {};
    timeHanld = null;
    isLock = "locked";
    defaultIcon = "&#xe67e;";

    pageMarginLeft = $(win).width();

    // 保存操作
    module.saveFrame = function(){
        // frameData
        var workBenchStage = $("#workBenchStage");
        var obj = [];
        workBenchStage.find(".topFrame").each(function(index, topFrame){
            var $topFrame = $(topFrame);
            var topData = $topFrame.data("json");
            $topFrame.attr("andydrag", "");
            $topFrame.removeClass("show");
            $topFrame.find(".panel-head.min").addClass("f-hidden").height(0)
            andy.layout($topFrame)
            $topFrame.find(".panel-head .u-group.f-right").css("display", "none")
            $topFrame.find(".panel-head .u-group.f-right.more").css("display", "block")
            $topFrame.removeClass("options")
            module.resetTitle($topFrame.find(".panel-head .u-input"))
            // $topFrame.find(".panel-head .u-input").attr("readonly","readonly");
            topData.menuId?null:topData.menuId = topData.id;
            obj.push(topData)
        })
        var myloading = andy.loading('top','保存中...',function(){});
        try{
            andy.postdata(frameData.save, {data:andy.jsonToString(obj)}, function(){
                myloading.close();
            })
        }catch(e){
            alert(e)
        }
        
    }

    // title编辑 模式
    module.resetTitle = function(title){
        var oldValue = title.text();
        title.replaceWith("<div class = 'title'>"+oldValue+"</div>");
    }
    module.activeTitle = function(title, dom){
        var oldTitle = dom.data("json").title;
        var editTitle = title.replaceWith("<input class = 'u-input edit item' value = "+oldTitle+" />")

        editTitle.blur(function(e){
            var d = dom.data("json");
            if(editTitle.val() == ""){
                editTitle.val(oldTitle)
            }
            d.title = editTitle.val()
            dom.data("json", d)
        })
    }

    // 启动拖拽
    module.activeDragForFrame = function(){
        var workBenchStage = $("#workBenchStage");
        workBenchStage.find(".topFrame").each(function(index, topFrame){
            var $topFrame = $(topFrame);
            $topFrame.addClass("options")
            $topFrame.find(".panel-head.min").removeClass("f-hidden").height(32)
            andy.layout($topFrame)
            module.activeTitle($topFrame.find(".panel-head .title"), $topFrame)
            // $topFrame.find(".panel-head .u-input").attr("readonly",null);

            // $topFrame.find(".panel-head .u-group.f-right").css("display", "none")

            // $topFrame.hasClass("locked")?$topFrame.addClass("show").removeClass("options"):$topFrame.attr("andydrag", "true");
            
            if($topFrame.hasClass("locked")){
                $topFrame.addClass("show").removeClass("options")
                $topFrame.find(".panel-head .u-group.f-right").css("display", "none")
            }else{
                $topFrame.find(".panel-head .u-group.f-right").css("display", "block")
                $topFrame.attr("andydrag", "true")
            }
            $topFrame.find(".panel-head .u-group.f-right.more").css("display", "none")
        })
    }

    // 取消编辑
    module.cancelOptions = function(){
        var workBenchStage = $("#workBenchStage");
        workBenchStage.empty()
        var menu = $("#menuList");
        var menuList = menu.find(".panel-body");
        menuList.empty()
        module.setMenuList(frameData.tabs)
        module.creatFrameByStage(frameData.widgets)
    }

    // 设置个人工作台按钮是否可见
    module.setFrame = function(isShow){
        var optionsBench = $("#optionsBench");
        var optionsCancel = $("#optionsCancel");
        var menu = $("#menuList");
        if(optionsBench){
            isShow == "true" && isShow?null:optionsBench.hide();
            optionsCancel.click(function(e){
                module.cancelOptions()
                var a = optionsBench;
                a.removeClass("success")
                optionsCancel.addClass("f-hidden")
                a.addClass("item-l")
                a.html("<i class='iconfont'>&#xe767;</i> 配置")
                menu.hide()
            });
            optionsBench.click(function(e){
                var a = $(e.target);
                a.is("i")?a=a.parent():null;
                if(a.hasClass("item-l")){
                    module.activeDragForFrame()
                    a.removeClass("item-l")
                    optionsCancel.removeClass("f-hidden")
                    a.addClass("success")
                    a.html("<i class='iconfont'>&#xe767;</i> 保存")
                    menu.show()
                    
                }else{
                    // 保存时候 检查数据
                    module.saveFrame()
                    a.removeClass("success")
                    optionsCancel.addClass("f-hidden")
                    a.addClass("item-l")
                    a.html("<i class='iconfont'>&#xe767;</i> 配置")
                    menu.hide()
                }
                
            })
        }
    }

    // 获取临时占位
    module.getTemporaryRect = function(data){
        var col = "col-"+data.width;
        var height = 100 * data.height;
        var str = "<div class='"+col+" temporaryFrame topFrame' style='height:"+height+"px;opacity:0.5;'>"+
        "<div class='f-p-sm g-h-max'><div class = 'f-bb'></div></div>"+
        "</div>";
        return str;
    }

    // 替换临时占位
    module.replaceTemporaryRect = function(data){
        var temporaryRect = $(".temporaryFrame");
        var workBenchStage = $("#workBenchStage");
        var str = module.getFrame(data);
        temporaryRect.replaceWith(str)
        var div = workBenchStage.find("#"+data.id);
        div.data("json", data)
        div.attr("andydrag", "true")
       

        if(data.api){
            div.find(".panel-body").load(data.api, function(){
                module.addOptions(div)
                div.addClass("options")
                div.find(".panel-head .u-input").attr("readonly",null);
                andy.layout(div);
                module.activeTitle(div.find(".panel-head .title"), div)
                if(div.hasClass("locked")){
                    div.addClass("show").removeClass("options")
                    div.find(".panel-head .u-group.f-right").css("display", "none")
                }else{
                    div.find(".panel-head .u-group.f-right").css("display", "block")
                    div.attr("andydrag", "true")
                }
            })
        }else{
            andy.layout(div);
        }


        
    }

    // 重置操作对象
    module.resetObject = function(){
        dragLi = {};
        dragLiParent = [];
        mouseoverRect = [];
    }

    // 检测是否在内部
    module.checkInContent = function(pageX, pageY, obj){
        var isIn = false;
        obj = obj[0];
        if(pageX > obj.offsetLeft && pageX < obj.offsetLeft + obj.clientWidth && pageY > obj.offsetTop && pageY < obj.offsetTop + obj.clientHeight){
            isIn = true
        }
        return isIn;
    }

    // 检查是否需要插入
    module.checkInRect = function(event){
        var workBenchStage = $("#workBenchStage");
        var pageX = event.pageX - module.getBodyLeft();
        var pageY = event.pageY;
        var isHave = false;
        workBenchStage.find(".topFrame").each(function(index, topFrame){
            var $topFrame = $(topFrame);
            var isIn = module.checkInContent(pageX, pageY, $topFrame);
            if(isIn && $topFrame.hasClass("locked") == false){
                isHave = true;
                mouseoverRect = $topFrame;
                var temporaryRect = $(".temporaryFrame");
                temporaryRect.find(".f-bb").css({
                    "background-color":"#B2FDBA"
                })
                temporaryRect.insertBefore($topFrame)
            }
        })

        if(isHave == false){
            mouseoverRect = [];
            var temporaryRect = $(".temporaryFrame");
            temporaryRect.appendTo(workBenchStage)
        }
    }

    // 检查是否移动临时div
    module.checkIsMove = function(event){
        var workBenchStage = $("#workBenchStage");
        var pageX = event.pageX;
        var pageY = event.pageY;
        var isHave = false;
        workBenchStage.find(".topFrame").each(function(index, topFrame){
            var $topFrame = $(topFrame);
            var isIn = module.checkInContent(pageX, pageY, $topFrame);
            if(isIn && $topFrame.hasClass("locked") == false){
                isHave = true;
                mouseoverRect = $topFrame;
                var temporaryRect = $(".temporaryFrame");
                temporaryRect.find(".f-bb").css({
                    "background-color":"#B2FDBA"
                })
                temporaryRect.insertBefore($topFrame)
            }
        })

        if(isHave == false){
            mouseoverRect = [];
            var temporaryRect = $(".temporaryFrame");
            temporaryRect.appendTo(workBenchStage)
        }
    }

    // 获取主体偏移
    module.getBodyLeft = function(){
        return (pageMarginLeft - $(".workbench-body").width())/2;
    }

    // 启动拖动
    module.dragBefore = function(li, event){
        var $li = $(li);
        if($li.hasClass("m-panel") == false && $li.is("li")){
            dragLi = $li;
            dragLiParent = dragLi.parent();
            dragLi.addClass("moving");
            dragLi.css({
                "z-index":"999",
                "cursor":"move",
                "position":"absolute",
                "left":event.pageX,
                "top":event.pageY-dragLi.height()
            })
            dragLi.prependTo($("body"))

            // 创建临时占位
            var str = module.getTemporaryRect(dragLi.data("json"));
            var workBenchStage = $("#workBenchStage");
            workBenchStage.append(str)
            andy.layout($(".temporaryFrame"))
        }else if($li.is("div") && $li.hasClass("topFrame")){
            // 调整内容位置
            dragLi = $li;
            dragLiParent = dragLi.parent();
            dragLiParent.dragLiStartIndex = dragLi.index();
            startDrag.offsetX = event[0].offsetX;
            startDrag.offsetY = event[0].offsetY;
            var dragRectData = dragLi.data("json");

            // 浮动前 需要占位div
            var tf = module.getTemporaryRect(dragRectData)
            dragLi.before(tf)
            andy.layout($(".temporaryFrame"))
            // 开始浮动
            dragLi.css({
                "z-index":"999",
                "cursor":"move",
                "opacity":"0.5",
                "position":"absolute",
                "left":event[0].clientX,
                "top":event[0].clientY
            })
            dragLi.addClass("dragNow")
            dragLi.prependTo($("body"))
        }else{
            $li.css({
                "cursor":"move"
            })
        }
    };

    module.dragOn = function(li, obj){
        var e = obj.event;
        var $li = $(li);
        if($li.hasClass("m-panel") == false && $li.is("li")){
            
            dragLi.css({
                "cursor":"move",
                "left":e.pageX,
                "top":e.pageY-dragLi.height()
            })

            module.checkInRect(e)
        }else if($li.is("div") && $li.hasClass("topFrame")){
            // 调整内容位置
            dragLi = $li;
            dragLi.css({
                "cursor":"move",
                "left":e.clientX-startDrag.offsetX,
                "top":e.clientY- startDrag.offsetY
            })
            module.checkIsMove(e)
        }else{
            $li.css({
                "cursor":"move"
            })
        }
    };

    module.dragEnd = function(li, obj){
        var e = obj.event;
        var $li = $(li);
        if($li.hasClass("m-panel") == false && $li.is("li")){
            var isReplace = false;
            if(mouseoverRect && mouseoverRect.length > 0){
                isReplace = mouseoverRect.hasClass("temporaryFrame");
            };
            if(isReplace){
                // 插入操作
                module.replaceTemporaryRect(dragLi.data("json"));
                dragLi.remove();
                module.resetObject()
            }else{
                // 不做任何操作 
                if(dragLi.length>0){
                    dragLi.removeClass("moving");
                    dragLi.css({
                        "cursor":"default",
                        "position":"",
                        "left":"",
                        "top":""
                    })
                    dragLi.prependTo(dragLiParent)
                }
                $(".temporaryFrame").remove()
                module.resetObject()
            }
        }else if($li.is("div") && $li.hasClass("topFrame")){
            // 调整内容位置
            dragLi = $li;
            dragLi.css({
                "z-index":"1",
                "cursor":"default",
                "opacity":"1",
                "position":"",
                "left":"",
                "top":""
            })
            var isReplace = false;
            if(mouseoverRect && mouseoverRect.length > 0){
                isReplace = mouseoverRect.hasClass("temporaryFrame");
            };
            if(isReplace){
                // 插入操作
                dragLi.insertBefore($(".temporaryFrame"))
            }else{
                if(dragLiParent.length > 0){
                    var startRect = dragLiParent.find(".topFrame:eq('"+dragLiParent.dragLiStartIndex+"')");
                    dragLi.insertBefore(startRect)
                }
            }
            
            dragLi.removeClass("dragNow")
            $(".temporaryFrame").remove();
            module.resetObject()
        }else{
            $li.css({
                "cursor":"default"
            })
        }
    };
    module.activeDrag = function(){
        andy.dragElement({dragName:"andyDrag",lockInParent:false,
            onDragBeforeElement:function(li, event){
                if($(li).hasClass("m-panel") && event[0].offsetY > 35){
                    return false;
                }
                if($(event[0].target).is("input") && $(event[0].target).hasClass("edit")){
                    return false;
                }
                module.dragBefore(li, event)
                return true;
            },
            onDragElement:function(li, obj){
                module.dragOn(li, obj)
                return true;
            },
            onDragEndElement:function(li, obj){
                module.dragEnd(li, obj)
                return true;
            }
        });
    }

    // 初始化可配置模块列表
    module.getMenuElement = function(obj){
        var icon = (obj.icons||obj.icons!= undefined)?obj.icons:defaultIcon;
		var classname = obj["class"];
        return "<li andyDrag='true' id ="+obj.id+"><a class='"+classname+"'><i class='iconfont'>"+icon+"</i></a><p>"+obj.title+"</p></li>";
    }

    module.setMenuList = function(list){
        var menu = $("#menuList");
        var menuList = menu.find(".panel-body");
        var tabsId = "menuList_tabs_id";
        var tabsStr = "<div class='m-tabs' id = '"+tabsId+"' an-tabs>"+
        "<div class='m-tabs-header mo line'><ul class='m-tabs-nav'></ul></div>"+
        "<div class='m-tabs-content'></div></div>";
        menuList.append(tabsStr)
        var tabs = $("#"+tabsId);

        var tabsHead = tabs.find(".m-tabs-header ul");
        var content = tabs.find(".m-tabs-content");

        // 生成tabs结构
        for(var i = 0; i < list.length; i++){
            var title = list[i].title;
            var contentList = list[i].list;
            tabsHead.append("<li class='col-4'><a href='javascript:;'>"+title+"</a></li>");
            content.append("<div class='item f-p-xs' id='"+list[i].id+"'><ul class='m-list icon'></ul></div>");
            //获取到当前ul
            var ul = content.find("ul:last");
            for(var j = 0; j < contentList.length; j++){
                var obj = contentList[j];
                ul.append(module.getMenuElement(obj));
                var li = ul.find("#"+obj.id);
                li.data("json", obj);
            }
        }
        andy.perform(tabs.parent());
        module.activeDrag()
        module.tabs = tabs;
    }

    // 初始化默认配置
    module.getFrame = function(data){
        var col = "col-"+data.width;
        var height = 100 * data.height;
        var head = data.head;//是否出现头部
        var title = "<input class = 'u-input edit item' value = "+data.title+" />";
        data.lock == isLock?title=data.title:null;
        var headStr = "<div class='panel-head'><div class='m-toolbar'><div class='title'><i class='iconfont'>"+data.icons+"</i>"+data.title+"</div></div></div>";
        var headMinStr = "<div class='panel-head min f-hidden' style = 'height:0px'><div class='m-toolbar'><div class='title'><i class='iconfont'>"+data.icons+"</i>"+data.title+"</div></div></div>";
        if(typeof head == "string"){
            head=="false"?head = headMinStr:head = headStr;
        }else if(typeof head == "boolean"){
            head==false?head = headMinStr:head = headStr;
        }
        var str = "<div andyDrag='' class='"+col+" topFrame "+data.lock+"' style='height:"+height+"px;' id = '"+data.id+"'>"+
        "<div class='f-p-sm g-h-max' style = 'overflow:hidden;'>"+
        "<div class='m-panel f-r' style='height:100%'>"+head+
        "<div class='panel-body g-h-max'></div>"+
        "</div></div></div>";
        return str;
    }

    // 加入锁定
    module.addLock=function(dom){
        var lock = "<div class = 'lockicon u-float'><i class='iconfont'>&#xe6fc;</i></div>";
        dom.append(lock)
        dom.addClass(isLock)
    }

    // 加入操作组
    module.deleteComponents = function(topFrame){
        var thisData = topFrame.data("json");
        var tabsOneDiv = module.tabs.find("#"+thisData.pid);
        var tabsUl = tabsOneDiv.find("ul");
        tabsUl.prepend(module.getMenuElement(thisData))
        var li = tabsUl.find("#"+thisData.id).data("json", thisData);
        module.tabs.an_tabs("show", tabsOneDiv.index());
        topFrame.remove()
    }

    module.addOptions = function(dom){
        var opt = "<div class='u-group f-right'> "+
        "<a class='u-btn optionsbtn'><i class='iconfont'>&#xe767;</i></a> "+
        "<a class='u-btn deletebtn'><i class='iconfont'>&#xe62a;</i></a>"+
        "</div>";
        var more = "<div class='u-group f-right more'>"+
        "<a class='u-btn more'><i class='iconfont'>&#xe786;</i></a> "+
        "</div>";
        var domData = dom.data("json");
        domData.targetUrl&&domData.targetUrl.length>0?opt+=more:null;
        dom.find(".m-toolbar").append(opt)
        dom.find(".panel-head .u-group.f-right").css("display", "none")
        dom.find(".panel-head .u-group.f-right.more").css("display", "block")
        // 事件绑定
        var optionsbtn = dom.find(".optionsbtn");
        var deletebtn = dom.find(".deletebtn");
        var morebtn = dom.find(".u-btn.more");
        var editTitle = dom.find(".panel-head .u-input");
        var oldTitle = editTitle.val();

        deletebtn.on("click", function(e){
            module.deleteComponents($(e.target).parents(".topFrame"))
            e.stopPropagation()
        })

        editTitle.blur(function(e){
            var d = dom.data("json");
            if(editTitle.val() == ""){
                editTitle.val(oldTitle)
            }
            d.title = editTitle.val()
            dom.data("json", d)
        })
        morebtn.unbind("click")
        morebtn.on("click", function(e){
            domData.targetUrl?window.location.href=domData.targetUrl:null;
        })

    }

    module.addRowDiv = function(){
        var workBenchStage = $("#workBenchStage");
        workBenchStage.append("<div class = 'row'></div>")
    }

    module.resetFrame = function(frame){
        var frameData = frame.data("json");
        var workBenchStage = $("#workBenchStage");
        frame.empty();
        frame.replaceWith(module.getFrame(frameData))
        frame = $("#"+frame.attr("id"))
        frame.data("json", frameData)

        var lock = frameData.lock;
        frame.find(".panel-body").load(frameData.api, function(){
            lock==isLock?module.addLock(frame):null;
            module.addOptions(frame)
            andy.layout(frame);
        })
    }

    module.creatFrameByStage = function(list){
        var workBenchStage = $("#workBenchStage");
        // module.addRowDiv()
        list = list?list:[];
        var counts = 0;
        for(var i = 0; i< list.length; i++){
            var frame = module.getFrame(list[i]);
            // counts += parseInt(list[i].width)
            // if(counts > 12){
            //     module.addRowDiv();
            //     counts = 0;
            // }
            // workBenchStage.find(".row:last").append(frame)
            workBenchStage.append(frame)
            var rect = $("#"+list[i].id);
            rect.data("json", list[i]);
        }

        // 执行队列
        workBenchStage.find(".topFrame").each(function(index, topFrame){
            var topFrame = $(topFrame);
            $(document).queue("loadpage",
                function(){
                    //全局变量，储存第一个ajax请求数据
                    var data = topFrame.data("json");
                    var lock = data.lock;
                    topFrame.find(".panel-body").load(data.api, function(){
                        $(document).dequeue("loadpage");
                        lock==isLock?module.addLock(topFrame):null;
                        module.addOptions(topFrame);
						andy.perform(topFrame);
                        andy.layout(topFrame);
                    })
                }
            );
        })
        $(document).dequeue("loadpage");
    }

    module.setInit = function(url){
        andy.loaddata(url, function(data){
            frameData = data;
            module.setFrame(data.edit)
            module.setMenuList(data.tabs)
            module.creatFrameByStage(data.widgets)
        })
    }

    module.init = function(url){
        module.setInit(url)
    }

    window.workBench = module;
})(jQuery, window);