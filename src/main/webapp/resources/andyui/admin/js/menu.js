/*menu */
/**
 * 菜单组件  包含 顶部菜单top 左侧菜单 left 右侧菜单 right 底部菜单 bottom
 * author:林耘宇
 **/
(function ($) {
 	$.fn.extend({
 		an_menu:function(){
 			var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;
            var _options = $.extend({
                menuId:"",
                menuType:"top",// top side
                url:"",
                urlData:"",
                autoHide:false,//针对侧边菜单
                downMenu:true,//是否下拉菜单
                showEvent:"mouseover",//子菜单显示事件
                hideEvent:"mouseleave",//子菜单显示事件
                childrenDownIcon:"&#xe613;",//子节点箭头
                childrenRightIcon:"&#xe607;",
                onClick:function(){}
            }, options);

            var menu = $(this);
			if(menu.attr("id") == false){
				menu = $("#menu"+andy.getRandom(10000));
			}else{
				menu = $("#"+menu.attr("id"));
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

            	// 隐藏 或者收缩"其他"
            	var hideOther = function(thisli){
            		thisli.siblings().each(function(index, otherLi){
						$(otherLi).children("a").removeClass("active");
						$(otherLi).find("ul").removeClass("show");
					});
            	}

            	// 隐藏或收缩当前
            	var hideThis = function(thisli){
            		thisli.children("a").removeClass("active");
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
            		if(_options.showEvent != "click"){
            			// li对象  children数据
						_options.onClick(li, li.data("children"))
            		};
            		li.bind(_options.showEvent, function(e){
						var thisli = getLi($(e.target));						// 顶部菜单 一级出现active
						if(_options.menuType == "top" && thisli.parents("ul").length == 1){
							thisli.children("a").addClass("active");//当前鼠标位置标识
						}else if(_options.menuType == "side"){
							thisli.children("a").addClass("active");
						}
						// 事件操作
						if(_options.showEvent == "click"){
	            			// li对象  children数据
							_options.onClick(li, li.data("children"))
	            		};
						if(_options.menuType == "top"){
							if(_options.downMenu){
								hideOther(thisli)
								showUl(thisli)
							}
						}else if(_options.menuType == "side"){
							// 绑定侧边菜单操作
							if(thisli.children("ul").hasClass("show")){
								hideThis(thisli)
								return false;
							}else{
								showUl(thisli)
								if(_options.autoHide){
									hideOther(thisli)
								}
								return false;
							}
						}
						
					});
            	}

            	// 创建子节点
            	createUlHtml = function(parent){
            		var data = parent.data("children");
            		for(var k in data){
            			var li = data[k];
            			try{
            				var icon = "";
            				if(li.icons){
            					icon = "<i class='iconfont icon'>"+li.icons+"</i>";
            				}
            				var str = "<li id = "+li.id+"><a href='javascript:void(0)'>"+icon+li.text+"</a></li>";
							parent.find("ul").append(str);
							// 子节点数据绑定
							var $li = $("#"+li.id);
							if(li.children && $li.length > 0){
								$li.data("children", li.children);
								if(_options.menuType == "side"){
									$li.find("a").addClass("parent");
								}
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
            				var icon = "";
            				if(li.icons){
            					icon = "<i class='iconfont icon'>"+li.icons+"</i>";
            				}
            				var str = "<li id = "+li.id+"><a href='javascript:void(0)'>"+icon+li.text+"</a></li>";
							_options.menu.append(str);
							// 子节点数据绑定
							var $li = $("#"+li.id);
							if(li.children && $li.length > 0){
								$li.data("children", li.children);
								if(_options.menuType == "side"){
									$li.find("a").addClass("parent");
								};
								$li.find("a").append("<i class='iconfont arrow'>"+_options.childrenDownIcon+"</i>");
								
							};
							bindEvent($li);
            			}catch(e){}
            		}
            	};

            	var getJson = function(){
            		var data;
            		if(_options.url != ""){
            			andy.loaddata(_options.url, function(data){
	                        data = andy.stringToJson(data)
	                        createMainHtml(data);
	                    })
            		}else if(_options.urlData != ""){
            			data = andy.stringToJson(_options.urlData)
            			createMainHtml(data);
            		}
            	}
            	
            	// 执行主体
            	var init = function(){
					getJson()
            	};

            	init();

				// 绑定离开事件
            	_options.menu.bind(_options.hideEvent, function(){
            		if(_options.menuType == "top"){
            			_options.menu.find("ul").removeClass("show")
            		}
            	})
            }
 		}
	});
})(jQuery);