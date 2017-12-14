/*topnav */
/**
 * 菜单组件  顶部菜单top
 * author:林耘宇
 **/
(function ($) {
    $.fn.extend({
        an_topnav:function(){
            var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;
            var _options = $.extend({
                menuId:"",
                url:"",
                urlData:"",
                checked:"",
                downMenu:true,//是否下拉菜单
                defaultShowDown:false,//默认展示下拉
                defaultIcon:"&#xe68c;",//默认图标
                showEvent:"mouseover",//子菜单显示事件
                hideEvent:"mouseleave",//子菜单显示事件
                childrenDownIcon:"&#xe613;",//子节点箭头
                isFitParent:false,//是否根据父级固定宽度自适应
                childrenRightIcon:"&#xe607;",
                onMouseOver:function(){},
                onMouseEnter:function(){},
                onClick:function(){}
            }, options);

            var menu = $(this);
            if(_options.menuId == ""){
                menu = andy.setRandomId(menu, "topnav_");
                _options.menuId = menu.attr("id");
            }
            // 获取 设置对象
            var getOption = menu.attr("options");
            var getValueElement = "";
            if(getOption){
                 getOption = "{"+ getOption+"}";
                 getOption = andy.stringToJson(getOption);
                // 处理设置
                for(var name in getOption){
                    if(getOption[name] == "true"){
                        _options[name] = true;
                    }else if(getOption[name] == "false"){
                        _options[name] = false;
                    }else{
                        _options[name] = getOption[name];
                    }
                }
            }
            _options.menu = menu;
            _options.resizeHanld = null;
            _options.level = 0;

            var checkedEvent = "EVENT_CHECKED";
            var onresize = "EVENT_ON_RESIZE";
            var clearCheckedEvent = "EVENT_CLEAR_CHECKED";

            if(funstyle != ""){
                if(funstyle == "checked"){
                    var arr = arguments[1];
                    var obj = {
                        arr:arr
                    }
                    _options.menu.trigger(checkedEvent, obj);
                }else if(funstyle == "onresize"){
                    _options.menu.trigger(onresize);
                }else if(funstyle == "clearChecked"){
                    _options.menu.trigger(clearCheckedEvent);
                };
            }else{

                var createUlHtml,createMainHtml,bindEvent;

                // 获取li标签
                var getLi = function(dom){
                    if(dom.is("li") == false){
                        dom = dom.parents("li").eq(0);
                    }
                    return dom;
                };

                // 获取li标签
                var getUl = function(dom){
                    if(dom.is("ul") == false){
                        dom = dom.parents("ul").first();
                    }
                    return dom;
                };

                // 隐藏 或者收缩"其他"
                var hideOther = function(thisli){
                    thisli.siblings().each(function(index, otherLi){
                        // $(otherLi).children("a").removeClass("active");
                        $(otherLi).find("ul").removeClass("show");
                    });
                }

                // 隐藏或收缩当前
                var hideThis = function(thisli){
                    // thisli.children("a").removeClass("active");
                    thisli.find("ul").removeClass("show");
                }

                // 去除所有选中效果
                var removeActive = function(){
                    _options.menu.find("a").removeClass("active");
                }

                // 去除同级选中效果
                var removeSiblingsActive = function(li){
                    li.parent().parent().siblings().find("a").removeClass("active");
                    li.parent().parent().find("a:first").addClass("active");
                    li.siblings().find("a").removeClass("active");
                }

                // 显示当前UL
                var showUl = function(thisli){
                    if(thisli.find("ul").length == 0 && thisli.data("children")){
                        thisli.append("<ul></ul>");
                        createUlHtml(thisli)
                        thisli.find("ul").addClass("show");
                    }else{
                        thisli.find("ul").eq(0).addClass("show");
                    }
                }

                bindEvent = function(li){
                    li.unbind(_options.showEvent);
                    li.click(function(e){
                        removeSiblingsActive(li)
                        _options.onClick(li)
                        li.children("a:first").addClass("active")
                        // 阻止冒泡 准许事件发生
                        e.stopPropagation()
                    })
                    li.mouseover(function(e){
                        _options.onMouseOver(li)
                        // 阻止冒泡 准许事件发生
                        e.stopPropagation()
                    })
                    li.mouseenter(function(e){
                        _options.onMouseEnter(li)
                        e.stopPropagation()
                     })
                    // if(_options.showEvent != "click"){
                        // li对象  children数据
                        // _options.onClick(li, li.data("children"))
                    // };
                    li.bind(_options.showEvent, function(e){
                        var thisli = getLi($(e.target));                        // 顶部菜单 一级出现active
                        // if(thisli.parents("ul").length == 1){
                            // thisli.children("a").addClass("active");//当前鼠标位置标识
                        // }
                        // 事件操作
                        // if(_options.showEvent == "click"){
                            // li对象  children数据
                            // _options.onClick(li, li.data("children"))
                        // };
                        if(_options.downMenu){
                            hideOther(thisli)
                            showUl(thisli)
                        }
                        
                    });
                }

                // 创建子节点
                createUlHtml = function(parent){
                    var data = parent.data("children");
                    var level = parent.parents("ul").length;
                    for(var k in data){
                        var li = data[k];
                        try{
                            var icon,url,target,str,active;
                            icon = "";
                            url = "javascript:;";
                            active = "";
                            if(li.icons){
                                var thisIcon = li.icons;
                                li.icons==""?thisIcon=_options.defaultIcon:null;
                                icon = "<i class='iconfont icon'>"+thisIcon+"</i>";
                            }else if(_options.defaultIcon != ""){
                                icon = "<i class='iconfont icon'>"+_options.defaultIcon+"</i>";
                            };
                            li.url?url=li.url:null;
                            li.target?target="target="+li.target:target="";
                            if(li.id==_options.checked[level]){
                                active="active";
                                // removeActive()
                            }
                            str = "<li id = "+li.id+"><a href="+url+" "+target+" class = '"+active+"'>"+icon+li.text+"</a></li>";

                            parent.find("ul").append(str);
                            // 子节点数据绑定
                            var $li = $("#"+li.id);
                            if(li.children && li.children.length > 0 && $li.length > 0){
                                $li.data("children", li.children);
                                $li.find("a").append("<i class='iconfont arrow'>"+_options.childrenRightIcon+"</i>");
                            }
                            bindEvent($li);
                        }catch(e){
                            alert(e)
                        }
                    }
                }

                // 创建主节点片段
                createMainHtml = function(data){
                    var allWidth = 0;
                    for(var k in data){
                        var li = data[k];
                        try{
                            var icon,url,target,str,active;
                            icon = "";
                            active = "";
                            url = "javascript:;";
                            if(li.icons){
                                var thisIcon = li.icons;
                                li.icons==""?thisIcon=_options.defaultIcon:null;
                                icon = "<i class='iconfont icon'>"+thisIcon+"</i>";
                            }else if(_options.defaultIcon != ""){
                                icon = "<i class='iconfont icon'>"+_options.defaultIcon+"</i>";
                            };
                            li.url?url=li.url:null;
                            li.target?target="target="+li.target:target="";
                            li.id==_options.checked[0]?active="active":null;
                            str = "<li id = "+li.id+"><a href="+url+" "+target+" class = '"+active+"'>"+icon+li.text+"</a></li>";
                            _options.menu.append(str);
                            // 子节点数据绑定
                            var $li = $("#"+li.id);
                            $li.data("json", li);
                            if(li.children && li.children.length > 0 && $li.length > 0){
                                $li.data("children", li.children);
                                if(_options.downMenu){
                                    $li.find("a").append("<i class='iconfont arrow'>"+_options.childrenDownIcon+"</i>");
                                }
                            };
                            bindEvent($li);
                            allWidth += $li.outerWidth()
                        }catch(e){}
                    }
                    // _options.menu.width(allWidth)
                };

                // 展开操作
                showMenu = function(){
                    if(_options.checked.length>0){
                        for(var i = 0; i< _options.checked.length; i++){
                            var li = _options.menu.find("#"+_options.checked[i]);
                            if(_options.defaultShowDown){
                                showUl(li)
                            }
                        }
                    }
                }

                var getJson = function(){
                    var data;
                    if(_options.url != ""){
                        andy.loaddata(_options.url, function(data){
                            data = andy.stringToJson(data)
                            createMainHtml(data);
                            showMenu();
                        })
                    }else if(_options.urlData != ""){
                        data = andy.stringToJson(_options.urlData)
                        createMainHtml(data);
                        showMenu();
                    }else{
                        menu.find("li").each(function(index, li){
                            bindEvent($(li))
                        })
                        showMenu();
                    }
                }


                // 自适应设置
                var setResize = function(){
                    if(_options.isFitParent){
                        var mp = _options.menu.parent();
                        var right = mp.find(".right-btn");
                        var left = mp.find(".left-btn");
                        var otherWidth = 0;
                        var dis = "none";
                        mp.siblings().each(function(index, m){
                            $(m).hasClass("no-float")?null:otherWidth += $(m).outerWidth();
                        })
                        var mpWidth = mp.parent().width() - otherWidth - parseInt(mp.css("margin-left")) - parseInt(mp.css("margin-right"));
                        mp.outerWidth(mpWidth - 1)
                        mp.outerWidth()<_options.menu.outerWidth()?dis="":dis = "none";
                        left.css({
                            "top":"0",
                            "display":dis,
                            "left":"0"
                        })
                        right.css({
                            "top":"0",
                            "display":dis,
                            "left":"0"
                        })
                        if(dis=="none"){
                            _options.menu.css("left", 0)
                        }
                    }
                }

                var setOptionsBtn = function(){
                    var mp = _options.menu.parent();
                    var menuHeight = _options.menu.outerHeight();
                    var rightStr = "<div class = 'right-btn f-clear'><i class='iconfont'>&#xe60f;</i></div>";
                    var leftStr = "<div class = 'left-btn f-clear'><i class='iconfont'>&#xe626;</i></div>";
                    right = mp.parent().find(".right-btn");
                    left = mp.parent().find(".left-btn");
                    right.length>0?null:mp.append(rightStr);
                    right = mp.find(".right-btn");
                    
                    right.css({
                        "cursor": "pointer",
                        "text-decoration": "none",
                        "position":"relative",
                        "width":"16px",
                        "float":"left",
                        "display":"block",
                        "line-height":menuHeight+"px",
                        "height":menuHeight
                    })
                    right.unbind("click").on("click", function(){
                        var movedis = parseInt(_options.menu.css("left"))-mp.width();
                        movedis < -_options.menu.width()+mp.width()?movedis = -_options.menu.width()+mp.width():null;
                        _options.menu.css("left", movedis)
                    })
                    left.length>0?null:mp.append(leftStr);
                    left = mp.find(".left-btn");
                    left.css({
                        "cursor": "pointer",
                        "text-decoration": "none",
                        "position":"relative",
                        "width":"16px",
                        "float":"left",
                        "display":"block",
                        "line-height":menuHeight+"px",
                        "height":menuHeight
                    })
                    left.unbind("click").on("click", function(){
                        var movedis = parseInt(_options.menu.css("left"))+mp.width();
                        movedis>0?movedis=0:null;
                        _options.menu.css("left", movedis)
                    })
                }

                var setParentWidth = function(){
                    if(_options.isFitParent){
                        var mp = _options.menu.parent();
                        var menuHeight = _options.menu.outerHeight();
                        mp.css({
                            "height":menuHeight,
                            "overflow":"hidden",
                            "position":"relative",
                            "top":"0px",
                            "left":"0px"
                        })
                        _options.menu.css({
                            "position":"absolute",
                            "left":"0"
                        })

                        setOptionsBtn()
                        setResize()
                        $(window).resize(function(event){
                            if(_options.resizeHanld == null){
                                _options.resizeHanld = setTimeout(function(){
                                    setResize()
                                    _options.resizeHanld = null;
                                }, 300)
                            }else{
                                clearTimeout(_options.resizeHanld)
                                _options.resizeHanld = setTimeout(function(){
                                    setResize()
                                    _options.resizeHanld = null;
                                }, 300)
                            }
                        })
                    }
                }
                
                // 执行主体
                var init = function(){
                    getJson()
                    setParentWidth()
                };

                init();

                // 绑定离开事件
                _options.menu.bind(_options.hideEvent, function(){
                    _options.menu.find("ul").removeClass("show")
                })

                // 更新父级宽度
                _options.menu.bind(onresize, function(){
                    setResize()
                })

                // 清除选择
                _options.menu.bind(clearCheckedEvent, function(e){
                    _options.menu.find("li").each(function(index, li){
                        $(li).find("a").removeClass("active")
                    })
                })

                _options.menu.bind(checkedEvent, function(e, arr){
                    var arr = arr.arr;
                    for(var i in arr){
                        var li = _options.menu.find("[id="+arr[i]+"]");
                        li.siblings().find("a").removeClass("active")
                        li.find("a").addClass("active")
                    }
                })
            }
        }
    });
})(jQuery);