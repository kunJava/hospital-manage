/*scrolltabs */
/**
 * 滚动切换
 * author:林耘宇
 **/
 (function ($) {
    $.fn.extend({
        an_scrolltabs:function(){
            var options = {};
            var funstyle = "";
            var arg = arguments[0];
            var scroll = $(this);
            (typeof arg == "object")? options = arg:funstyle = arg;

            // 初始配置
            var _options = $.extend({
                scrollId:"",
                minStep:2,//最小滚动步长
                stepWidth:0,//按照宽度来移动
                isContentMove:false,//是否根据内容元素来滚动
                isAnimation:true,//是否启用动画
                animationTime:300,//动画时长
                isBarPlaceholder:false,//切换按钮是否占位
                isFitParent:true,
                autoHidden:false,//是否自动隐藏按钮，在没有鼠标的时候
                resizeHanld:null,
                alwaysShow:false
            }, options);

            if(_options.scrollId == ""){
                scroll = andy.setRandomId(scroll, "scrolltabs_");
                _options.scrollId = scroll.attr("id");
            }

            // 获取 设置对象
            var getOption = scroll.attr("options");
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

            scroll.data("options", _options)

            if(funstyle != ""){
                scroll[arg]?scroll[arg](arguments[1]):null;
            }else{
                var parentWidth = scroll.parent().innerWidth();
                var parentHeight = scroll.parent().innerHeight();
                scroll.wrap("<div class='m-scrolltabs'></div>");
                scroll.wrap("<div class='scrolltabs-con f-clear'></div>");
                scroll.css({
                    "position":"absolute",
                    "left":0
                })

                var top = scroll.parent().parent();
                var center = scroll.parent();
                
                var left = "<div class='iconfont left-bar'>&#xe610;</div>";
                top.append(left)
                left = top.find(".left-bar");
                var right = "<div class='iconfont right-bar'>&#xe7be;</div>";
                top.append(right)
                right = top.find(".right-bar");

                if(_options.width && _options.width > 0){
                    top.outerWidth(_options.width)
                }
                if(_options.height && _options.height > 0){
                    top.outerHeight(_options.height)
                }else{
                    top.outerHeight(parentHeight)
                }
                if(_options.isBarPlaceholder == false){
                    top.addClass("m-scrolltabs-cover")
                }else if(_options.width && _options.width > 0){
                    top.outerWidth(top.outerWidth() - left.outerWidth() * 2)
                }

                if(_options.autoHidden){
                    left.hide()
                    right.hide()
                }

                scroll.setWidth = function(){
                    var cc = scroll.getChildren();
                    var all = 0;

                    cc.each(function(index, cell){
                        all += $(cell).outerWidth();
                    })
                    scroll.innerWidth(all)
                    scroll.css("display","block")
                }

                // 方法处理
                scroll.getChildren = function(){
                    var cc;
                    if(center.children().length > 1){
                        cc = center.children();
                    }else if(center.children().children().length > 1){
                        cc = center.children().children();
                    }
                    return cc;
                }

                scroll.getDis = function(delta){
                    var cc, moveDis = 0, currentDis = 0, left = parseInt(scroll.css('left'));
                    cc = scroll.getChildren()

                    if(delta < 0){
                        currentDis = left < 0?-left+center.width():left+center.width();
                    }else{
                        currentDis = left < 0?-left:left;
                    }
                    
                    cc.each(function(index, cell){
                        if(moveDis <= currentDis){
                            moveDis+=$(cell).outerWidth();
                            if(moveDis > currentDis){
                                if(delta < 0){
                                    moveDis = (moveDis - currentDis);
                                }else{
                                    if($(cell).outerWidth() == (moveDis - currentDis)){
                                        moveDis = $(cell).outerWidth();
                                    }else{
                                        moveDis = $(cell).outerWidth() - (moveDis - currentDis);
                                    }
                                    
                                }
                                return false;
                            }
                        }
                    })

                    // console.log(center.children().length, center.children().children().length)
                    // console.log(center.children().width(), center.children().children().width())
                    return moveDis;
                }
                scroll.disMoveBar = function(delta){
                    if(scroll.width() < top.width()){
                        left.hide();
                        right.hide();
                        return false;
                    }else{
                        left.show()
                        right.show()
                    }

                    var disWidth = scroll.outerWidth() - center.width();
                    var counts = Math.ceil(disWidth/center.width());
                    // 步长和内容长度有关系
                    counts > _options.minStep?_options.minStep=counts:null;
                    var addContent = _options.stepWidth > 0?_options.stepWidth:disWidth/counts;

                    if(_options.isContentMove){
                        addContent = scroll.getDis(delta);
                    }

                    var contentWidth = parseInt(scroll.css("left"))+delta*addContent;
                    if(contentWidth < -disWidth){
                        contentWidth = -disWidth;
                    }else if(contentWidth > 0){
                        contentWidth = 0;
                    }
                    if(_options.isAnimation){
                        scroll.animate({"left":contentWidth}, _options.animationTime)
                    }else{
                        scroll.css("left", contentWidth)
                    }
                }

                scroll.isShow = function(){
                    if(scroll.width() < top.width()){
                        return false;
                    }else{
                        if(_options.autoHidden){
                            left.show()
                            right.show()
                        }
                    }
                }


                // 触发事件
                left.click(function(){
                    scroll.disMoveBar(1)
                })

                right.click(function(){
                    scroll.disMoveBar(-1)
                })

                top.mouseover(function(){
                    scroll.isShow()
                })

                top.mouseout(function(){
                    if(_options.autoHidden){
                        left.hide()
                        right.hide()
                    }
                })

                top.mouseenter(function(){
                    scroll.isShow()
                })

                scroll.setWidth()

                $(window).resize(function(event){
                    if(_options.isFitParent){
                        if(_options.resizeHanld == null){
                            _options.resizeHanld = setTimeout(function(){
                                scroll.disMoveBar()
                                _options.resizeHanld = null;
                            }, 300)
                        }else{
                            clearTimeout(_options.resizeHanld)
                            _options.resizeHanld = setTimeout(function(){
                                scroll.disMoveBar()
                                _options.resizeHanld = null;
                            }, 300)
                        }
                    }
                    
                })

            }
        }
    });
})(jQuery);