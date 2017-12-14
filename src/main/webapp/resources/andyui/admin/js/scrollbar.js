/*scrollbar */
/**
 * 滚动条
 * author:林耘宇
 **/
(function ($) {
    $.fn.extend({
        an_scrollbar:function(){
            var options = {};
            var funstyle = "";
            var arg = arguments[0];
            var scroll = $(this);
            (typeof arg == "object")? options = arg:funstyle = arg;

            // 初始配置
            var _options = $.extend({
                scrollId:"",
                barStyle:"style01",
                minStep:2,//最小滚动步长
                overflowX:"auto",//横向滚动条
                overflowY:"auto",//纵向滚动条
                isBarPlaceholder:false,//滚动条是否占位
                isFitParent:true,
                autoHidden:false,//是否自动隐藏，在没有鼠标的时候
                resizeHanld:null,
                alwaysShow:false
            }, options);

            if(_options.scrollId == ""){
                scroll = andy.setRandomId(scroll, "scroll_");
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

            scroll.showBar = function(){
                scroll.trigger("showScrollBar")
            }

            scroll.anchor = function(id){
                scroll.trigger("anchor", id)
            }

            if(funstyle != ""){
                scroll[arg]?scroll[arg](arguments[1]):null;
            }else{
                var topHeight = scroll.height();
                scroll.addClass("f-clear")
                scroll.wrap("<div class='m-scroll "+_options.barStyle+"'></div>")
                scroll.wrap("<div class='m-scroll-left'></div>")
                var top = scroll.parent().parent()
                var left = scroll.parent();
                var rightStr = "<div class='m-scroll-right'>"+
                "<div class='scroll-ico-top'><i class='iconfont'>&#xe615;</i></div>"+
                "<div class='scroll-ico-con'></div>"+
                "<div class='scroll-ico-bottom'><i class='iconfont'>&#xe613;</i></div>"+
                "</div>";
                top.append(rightStr)
                var right = left.next();
                var scrollbar = right.find(".scroll-ico-con");
                var topButton = right.find(".scroll-ico-top");

                var bottomStr = "<div class='m-scroll-bottom'>"+
                "<div class='scroll-ico-left'><i class='iconfont'>&#xe614;</i></div>"+
                "<div class='scroll-ico-con'></div>"+
                "<div class='scroll-ico-right'><i class='iconfont'>&#xe607;</i></div>"+
                "</div>";
                top.append(bottomStr)
                var bottom = right.next();
                var bottomScrollbar = bottom.find(".scroll-ico-con");
                var leftButton = bottom.find(".scroll-ico-left");
                var rightButton = bottom.find(".scroll-ico-right");
                leftButton.css("display")=="none"?leftButton.width(0):null;
                rightButton.css("display")=="none"?rightButton.width(0):null;
                var isBottomDrag = false;
                var startX = 0;
                
                topButton.css("display")=="none"?topButton.height(0):null;
                var bottomButton = right.find(".scroll-ico-bottom");
                bottomButton.css("display")=="none"?bottomButton.height(0):null;
                var isDrag = false;
                var startY = 0;

                // 滚动条是否占位isBarPlaceholder
                if(_options.isBarPlaceholder){
                    left.css({
                        "padding-right":scrollbar.width(),
                        "padding-bottom":bottomScrollbar.height()
                    })
                }

                scroll.showScrollBar = function(){
                    if(!_options.alwaysShow){
                        if(scroll.height()<= top.height()){
                            right.hide()
                            scroll.parent().parent().unbind("mouseout mouseover")
                            left.css({
                                "top":0,
                                "padding-right":0
                            })
                        }else if(_options.overflowY == "auto"){
                            right.show()
                            if(_options.autoHidden){
                                scroll.parent().parent().mouseout(function(e){
                                    if($(e.target).parents(".m-scroll")){
                                        right.hide()
                                        bottom.hide()
                                    }
                                    e.preventDefault()
                                })
                                scroll.parent().parent().mouseover(function(e){
                                    right.show()
                                    if(scroll.width() > top.width()){
                                        bottom.show()
                                    }
                                    e.preventDefault()
                                })
                            }
                        };
                        if(scroll.width() <= top.width()){
                            bottom.hide()
                            left.css({
                                "left":0,
                                "padding-bottom":0
                            })
                        }else if(_options.overflowX == "auto"){
                            bottom.show()
                        }
                        if(right.is(":hidden")== false && bottom.is(":hidden")== false && right.hasClass("edit") == false && _options.isBarPlaceholder){
                            right.addClass("edit")
                            bottom.addClass("edit")
                            right.height(right.height() - parseInt(left.css("padding-bottom")))
                            bottom.width(bottom.width() - parseInt(left.css("padding-right")))
                            left.after("<div class = 'm-scroll-bg'></div>")
                        }
                    }
                    // 设置滚动条高度
                    if(_options.overflowY == "auto"){
                        var sheight = parseInt(right.height()- bottomButton.height()*2)*(top.height()/left.outerHeight());
                        scrollbar.animate({"height":sheight}, 100)
                    }else{
                        right.hide()
                    }
                    
                    // 设置滚动条宽度
                    if(_options.overflowX == "auto"){
                        var swidth = parseInt(bottom.width()- leftButton.height()*2)*(top.width()/left.outerWidth());
                        // scrollbar.height(sheight)
                        bottomScrollbar.animate({"width":swidth}, 100)
                    }else{
                        bottom.hide()
                    }
                }

                scroll.getDisHeight = function(){
                    return right.height() - (scrollbar.height()-bottomButton.height()*2);
                }

                scroll.moveContent = function(dis){
                    var disHeight = right.height()-scrollbar.height()-bottomButton.height()*2;
                    var addContent = (left.outerHeight() - top.height())/disHeight;
                    var contentHeight = -dis*addContent;
                    if(contentHeight < top.height() - left.outerHeight()){
                        contentHeight = top.height() - left.outerHeight();
                    }
                    scroll.parent().css("top", contentHeight)
                }

                scroll.moveBar = function(e){
                    if(isDrag){
                        var dis = e.clientY - startY;
                        var disHeight = right.height()-scrollbar.height()-bottomButton.height()*2;
                        if(dis < topButton.height()){
                            dis = topButton.height();
                        }else if(dis > disHeight+topButton.height()){
                            dis = disHeight+topButton.height();
                        }
                        scrollbar.css("top",dis)
                        scroll.moveContent(dis - topButton.height())
                    }
                }

                // 横向滚动
                scroll.disMoveBottomBar = function(delta){
                    if(scroll.width() < top.width()){
                        return false;
                    }
                    var disWidth = bottom.width()-bottomScrollbar.width()-bottomButton.width()*2;
                    var counts = Math.ceil(disWidth/bottomScrollbar.width());
                    counts > _options.minStep?_options.minStep=counts:null;
                    var dis = parseInt(bottomScrollbar.css("left"))-delta*(disWidth/_options.minStep);
                    if(dis < leftButton.width()){
                        dis = leftButton.width();
                    }else if(dis > disWidth+leftButton.width()){
                        dis = disWidth+leftButton.width();
                    }
                    bottomScrollbar.css({"left":dis})
                    scroll.moveBottomContent(dis - topButton.width())
                }
                scroll.moveBottomContent = function(dis){
                    var disWidth = bottom.width()-bottomScrollbar.width()-leftButton.width()*2;
                    var addContent = (left.outerWidth() - top.width())/disWidth;
                    var contentWidth = -dis*addContent;
                    if(contentWidth < top.width() - left.outerWidth()){
                        contentWidth = top.width() - left.outerWidth();
                    }
                    scroll.parent().css("left", contentWidth)
                }
                scroll.moveBottomBar = function(e){
                    if(isBottomDrag){
                        var dis = e.clientX - startX;
                        var disWidth = bottom.width()-bottomScrollbar.width()-leftButton.width()*2;
                        if(dis < leftButton.width()){
                            dis = leftButton.width();
                        }else if(dis > disWidth+leftButton.width()){
                            dis = disWidth+leftButton.width();
                        }
                        bottomScrollbar.css("left",dis)
                        scroll.moveBottomContent(dis - leftButton.width())
                    }
                }

                // 距离滚动
                scroll.disMoveBar = function(delta){
                    if(scroll.height() < top.height()){
                        return false;
                    }
                    var disHeight = right.height()-scrollbar.height()-bottomButton.height()*2;
                    var counts = Math.ceil(disHeight/scrollbar.height());
                    counts > _options.minStep?_options.minStep=counts:null;
                    var dis = parseInt(scrollbar.css("top"))-delta*(disHeight/_options.minStep);
                    if(dis < topButton.height()){
                        dis = topButton.height();
                    }else if(dis > disHeight+topButton.height()){
                        dis = disHeight+topButton.height();
                    }
                    scrollbar.css({"top":dis})
                    scroll.moveContent(dis - topButton.height())
                }

                // 内容目标滚动
                scroll.contentAnchor = function(offsetTop, cheight){
                    // 滚动条剩余高度
                    var disHeight = right.height()-scrollbar.height()-bottomButton.height()*2;
                    var dis = -offsetTop;
                    if(top.height() > scroll.height()){
                        return false;
                    }
                    setTimeout(function(){
                        if(offsetTop+cheight > top.height() && dis < top.height() - scroll.height()){
                            dis = top.height() - scroll.height();
                        }
                        // 内容定位
                        scroll.parent().css("top", dis)
                        var scrollDis = (disHeight/(scroll.height() - top.height()))*(dis);
                        // var sdis = parseInt(scrollbar.css("top")) - scrollDis;
                        // if(scrollDis == 0){
                        //     sdis = scrollDis - parseInt(scrollbar.css("top"));
                        // }
                        // if(sdis < topButton.height()){
                        //     sdis = topButton.height();
                        // }else if(sdis > disHeight+topButton.height()){
                        //     sdis = disHeight+topButton.height();
                        // }
                        scrollbar.css({"top":-scrollDis})
                    }, 100)
                }

                scrollbar.mousedown(function(e){
                    isDrag = true;
                    startY = e.clientY-parseInt(scrollbar.css("top"));
                    return true;
                })

                scrollbar.parent().parent().mousemove(function(e){
                    scroll.moveBar(e)
                    return true;
                })
                scrollbar.parent().parent().mouseout(function(e){
                    e.stopPropagation()
                    return true;
                })
                scrollbar.parent().parent().mouseup(function(e){
                    isDrag = false;
                    return true;
                })
                scrollbar.parent().parent().mouseenter(function(e){
                    scroll.showScrollBar()
                    isDrag = false;
                    return true;
                })

                // ----------

                bottomScrollbar.mousedown(function(e){
                    isBottomDrag = true;
                    startX = e.clientX-parseInt(bottomScrollbar.css("left"));
                    return true;
                })

                bottomScrollbar.parent().parent().mousemove(function(e){
                    scroll.moveBottomBar(e)
                    return true;
                })
                bottomScrollbar.parent().parent().mouseout(function(e){
                    e.stopPropagation()
                    return true;
                })
                bottomScrollbar.parent().parent().mouseup(function(e){
                    isBottomDrag = false;
                    return true;
                })
                bottomScrollbar.parent().parent().mouseenter(function(e){
                    scroll.showScrollBar()
                    isBottomDrag = false;
                    return true;
                })

                // 滚轮
                top.on("mousewheel DOMMouseScroll", function (e) {
                    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); 
                    e.preventDefault();
                    // e.stopPropagation();
                    if (delta > 0) {
                        // 向上滚
                        scroll.disMoveBar(delta)
                    } else if (delta < 0) {
                        // 向下滚
                        scroll.disMoveBar(delta)
                    }
                })

                topButton.click(function(){
                    scroll.disMoveBar(1);
                })

                bottomButton.click(function(){
                    scroll.disMoveBar(-1);
                })

                leftButton.click(function(){
                    scroll.disMoveBottomBar(1);
                })

                rightButton.click(function(){
                    scroll.disMoveBottomBar(-1);
                })
                
                scroll.mousedown(function(){
                    setTimeout(function(){
                        scroll.showScrollBar()
                    }, 300)
                })
                scroll.bind("showScrollBar", function(){
                    setTimeout(function(){
                        scroll.showScrollBar()
                    }, 100)
                })
                scroll.bind("anchor", function(e, id){
                    var an = scroll.find("#"+id);
                    var oldPosition = an.css("position");
                    if(an.length>0){
                        an.css("position", "absolute")
                        scroll.contentAnchor(an[0].offsetTop, an.height())
                        an.css("position", oldPosition)
                        an = [];
                    }
                })

                $(window).resize(function(event){
                    if(_options.isFitParent){
                        if(_options.resizeHanld == null){
                            _options.resizeHanld = setTimeout(function(){
                                scroll.showScrollBar()
                                _options.resizeHanld = null;
                            }, 300)
                        }else{
                            clearTimeout(_options.resizeHanld)
                            _options.resizeHanld = setTimeout(function(){
                                scroll.showScrollBar()
                                _options.resizeHanld = null;
                            }, 300)
                        }
                    }
                    
                })
                _options.alwaysShow?null:scroll.showScrollBar();
            }
        }
    });
})(jQuery);