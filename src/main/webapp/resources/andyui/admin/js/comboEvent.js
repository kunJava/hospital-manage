/*combolist */
/**
 * 下拉列表模块
 * author:林耘宇
 **/


 (function ($) {
    $.fn.extend({
        an_comboEvent:function(options, params){
            var am = new module();
            // 默认配置
            am.setOptions({
                elem:"",//触发对象id
                show:"", //显示对象id
                showEvent:"click",//默认触发事件
                hiddenEvent:"mouseleave", //默认隐藏事件
                isEnable:true,//默认可用
                windowAuto:true,//窗口自适应
                setTime:200,//缓冲时间
                showComplete: function () {
                    //完成显示回调  
                },
                hiddenComplete:function(){
                    // 隐藏完成回调
                }
            })

            if(typeof options == "string"){
                var method = $.fn.an_comboEvent.methods[options];
                var elem = $(this);
                if(method){
                    return method(elem, params);
                }
            }else{
                am.init(options)
                _options = am.getOptions()
                var doc = $(document);
                var win = $(window);
                var elem = $("#"+_options.elem);
                var elemParent = elem.parent();
                var show = $("#"+_options.show);
                // var ul_height = 0;//第一层ul高度
                var getOption = elem.attr("options");
                if(getOption){
                    am.extendOptions(getOption)
                    _options = am.getOptions()
                }
                elem.data("options", _options)

                 // 如果显示对象不在同一级,那么插入到触发对象后面
                if(show.parent() != elemParent){
                    elem.after(show)
                }
                elemParent.css({
                    position:"relative"
                })
                elem.css({
                    display:"block",
                    position:"absolute"
                })
                show.css({
                    display:"none",
                    position:"absolute"
                })

                // 判断是否有侧边滚动条
                var isHaveScroll = am.checkIsHaveScroll();

                var setUlScrollHeight = function(height){
                    if(height < show.height()){
                        show.addClass("u-overflow-y");
                        show.outerHeight(height)
                    }
                }

                var setPosition = function(){
                    var offset = elemParent.offset();
                    var pleft = offset.left;
                    var ptop = offset.top;
                    var doc_width = doc.width();
                    var doc_height = doc.height();
                    var doc_scrollTop = doc.scrollTop();
                    var ul_width = show.outerWidth();
                    var ulHeight = show.height();

                    var scrollWidth = 0;
                    if(isHaveScroll){
                        scrollWidth = 17;
                    };

                    // 左右排列
                    if(doc_width - pleft - scrollWidth >= ul_width){
                        show.css({"left":"0px","right":"auto"});
                    }else{
                        show.css({"left":"auto", "right":"0px"});
                    };
                    var buttonHeight = elem.outerHeight();

                    var buttonBottom = win.height() - (ptop - doc_scrollTop);
                    var buttonTop = win.height() - buttonBottom - buttonHeight;
                    if(_options.windowAuto){
                        if(buttonBottom >= buttonTop){
                            show.css("top", buttonHeight + "px");
                            setUlScrollHeight(buttonBottom - buttonHeight)
                        }else{
                            setUlScrollHeight(win.height() - buttonBottom)
                            ulHeight = show.outerHeight()
                            show.css("top", -ulHeight + "px");
                        }
                    }else{
                        show.css("top", buttonHeight + "px");
                        setUlScrollHeight(buttonBottom - buttonHeight)
                    }
                }

                var timeHanld = "";

               
                elem.bind(_options.showEvent, function(){
                    show.css({
                        display:"block"
                    })
                    setPosition()
                })

                show.on(_options.hiddenEvent, function(e){
                    timeHanld = setTimeout(function(){
                        show.css("display", "none");
                        // closeAll();
                        elem.removeClass("open");
                        _options.hiddenComplete();
                        timeHanld = "";
                    }, _options.setTime);
                });

                show.mouseover(function(e){
                    if(timeHanld != ""){
                        clearTimeout(timeHanld);
                        timeHanld = "";
                    }
                });


                 // 兼容IE6 的显示
                // if(andy.IE() == 6){
                //     combo.find("ul").each(function(i, e){
                //         var cell = $(e);
                //         if(!cell.prev().is("div")){
                //             cell.before("<div></div>");
                //         }
                //     });
                // };
            }
        }
    })
    $.fn.an_comboEvent.methods = {
        close:function(elem, param){
            var _options = elem.data("options")
            var elem = $("#"+_options.elem);
            var show = $("#"+_options.show);

            show.css({
                display:"none"
            })
        }
    }
})(jQuery);3