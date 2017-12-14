/*tabsheader */
/**
 * 菜单组件  分页导航
 * author:林耘宇
 **/
 (function ($) {
 	$.fn.extend({
 		an_tabsheader:function(){
 			var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;

            var _options = $.extend({
                menuId:"",
                url:"",
                urlData:"",
                chooseIndex:0,
                changeEvent:"click",//切换事件
                onClick:function(){}
            }, options);

            var menu = $(this);
            if(_options.menuId == ""){
                menu = andy.setRandomId(menu, "tabsheader_");
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

            	// 隐藏 或者收缩"其他"
            	var hideOther = function(thisli){
            		thisli.siblings().each(function(index, otherLi){
						$(otherLi).removeClass("active");
					});
            	}

            	bindEvent = function(li){
            		li.unbind(_options.changeEvent);
            		if(_options.changeEvent != "click"){
            			// li对象  children数据
						_options.onClick(li, li.data("children"))
            		};
            		li.bind(_options.changeEvent, function(e){
						var thisli = getLi($(e.target));	
						hideOther(thisli);
						thisli.addClass("active");//当前鼠标位置标识
						// 事件操作
						if(_options.changeEvent == "click"){
	            			// li对象  children数据
							_options.onClick(li, li.data("children"))
	            		};
						// if(_options.downMenu){
						// 	hideOther(thisli)
						// 	showUl(thisli)
						// }
						
					});
            	}

            	// 创建主节点片段
            	createMainHtml = function(data){
            		var ul = "<ul class='m-tabs-nav'></ul>";
            		_options.menu.append(ul);
            		ul = _options.menu.find("ul");
            		for(var k in data){
            			var li = data[k];
            			try{
            				var active = "class = 'active'";
            				if(k != _options.chooseIndex){
            					active = "";
            				}
            				var liid = li.id || _options.menuId+k;
            				var str = "<li "+active+" id = "+liid+"><a href='javascript:void(0)'>"+li.text+"</a></li>";
							ul.append(str);
							var $li = $("#"+liid);
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
            		}else{
                        menu.find("li").each(function(index, li){
                            bindEvent($(li))
                        })
                    }
            	}
            	
            	// 执行主体
            	var init = function(){
					getJson()
            	};

            	init();

				// 绑定离开事件
           //  	_options.menu.bind(_options.hideEvent, function(){
        			// _options.menu.find("ul").removeClass("show")
           //  	})
            }
 		}
 	});
})(jQuery);