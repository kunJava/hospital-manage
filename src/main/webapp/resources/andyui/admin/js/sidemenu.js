/*sidemenu */
/**
 * 菜单组件  包含 顶部菜单top 左侧菜单 left 右侧菜单 right 底部菜单 bottom
 * author:林耘宇
 **/
(function ($) {
    $.fn.extend({
        an_sidemenu:function(){
            var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;
            var _options = $.extend({
                menuId:"",
                url:"",
                urlData:"",
                checked:[],
                autoHide:true,//针对侧边菜单
                autoShow:false,//默认展开子项
                showEvent:"click",//子菜单显示事件
                hideEvent:"mouseleave",//子菜单显示事件
                defaultIcon:"&#xe68c;",//默认图标
                childrenDownIcon:"&#xe613;",//子节点箭头
                childrenRightIcon:"&#xe607;",
                onClick:function(){},
                onComplete:function(){}
            }, options);

            var menu = $(this);
            if(_options.menuId == ""){
                menu = andy.setRandomId(menu, "menu_");
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

            if(funstyle != ""){
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

                // 去除所有选中效果
                var removeActive = function(){
                    _options.menu.find("a").removeClass("active");
                }

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
                    li.bind(_options.showEvent, function(e){
                        var thisli = getLi($(e.target));
                        removeActive()
                        _options.onClick(thisli)
                        thisli.children("a").addClass("active")
                        // 阻止冒泡 准许事件发生
                        e.stopPropagation()
                        //  // 绑定侧边菜单操作
                         if(thisli.children("ul").hasClass("show")){
                             hideThis(thisli)
                             e.stopPropagation()
                         }else{
                             showUl(thisli)
                             if(_options.autoHide){
                                 hideOther(thisli)
                             }
                             e.stopPropagation()
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
                            if(li.url){
                                url = li.url;
                            };
                            li.target?target="target="+li.target:target="";
                            if(li.id==_options.checked[level]){
                                active="active";
                                removeActive()
                            }
                            str = "<li id = "+li.id+"><a href="+url+" "+target+" class = '"+active+"'>"+icon+li.text+"</a></li>";
                            parent.find("ul").append(str);
                            // 子节点数据绑定
                            var $li = $("#"+li.id);
                            $li.data("json", li);
                            if(li.children && li.children.length > 0 && $li.length > 0){
                                $li.data("children", li.children);
                                $li.find("a").addClass("parent");
                                $li.find("a").append("<i class='iconfont arrow'>"+_options.childrenRightIcon+"</i>");
                            }
                            bindEvent($li);
                        }catch(e){}
                    }
                }

                // 创建主节点片段
                createMainHtml = function(data){
                    for(var k in data){
                        var li = data[k];
                        try{
                            var icon,url,target,str,active;
                            active = "";
                            icon = "";
                            url = "javascript:;";
                            if(li.icons){
                                var thisIcon = li.icons;
                                li.icons==""?thisIcon=_options.defaultIcon:null;
                                icon = "<i class='iconfont icon'>"+thisIcon+"</i>";
                            }else if(_options.defaultIcon != ""){
                                icon = "<i class='iconfont icon'>"+_options.defaultIcon+"</i>";
                            };
                            if(li.url){
                                url = li.url;
                            };
                            li.target?target="target="+li.target:target="";
                            li.id==_options.checked[0]?active="active":null;
                            str = "<li id = "+li.id+"><a href="+url+" "+target+" class = '"+active+"'>"+icon+li.text+"</a></li>";
                            _options.menu.append(str);
                            // 子节点数据绑定
                            var $li = $("#"+li.id);
                            $li.data("json", li);
                            if(li.children && li.children.length > 0 && $li.length > 0){
                                $li.data("children", li.children);
                                $li.find("a").addClass("parent");
                                $li.find("a").append("<i class='iconfont arrow'>"+_options.childrenRightIcon+"</i>");

                            };
                            bindEvent($li);
                        }catch(e){}
                    }
                };


                // 展开操作
                showMenu = function(){
                    if(_options.checked.length>0){
                        for(var i = 0; i< _options.checked.length; i++){
                            var li = _options.menu.find("#"+_options.checked[i]);
                            showUl(li)
                        }
                    }
                    _options.onComplete()
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

                // 执行主体
                var init = function(){
                    getJson()
                };

                init();

                // 绑定离开事件
                _options.menu.bind(_options.hideEvent, function(){
                    // if(_options.menuType == "top"){
                    //  _options.menu.find("ul").removeClass("show")
                    // }
                })
            }
        }
    });
})(jQuery);