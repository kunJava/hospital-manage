/*accordion */
/**
 * 手风琴模块
 * author:林耘宇
 **/
(function ($) {
    $.fn.extend({
        an_accordion:function(options){
            var _options = $.extend({
                index:1,//默认打开第一个 设置0为全关闭
                isAnimation:true,
                animationTime:200,//动画时间
                multiple:false,//允许同时打开多个或者关闭多个
                isAllOpen:false,//是否全打开，必须multiple为true时才生效

                fit:false,//默认自适应
                height:0,
                width:0,
                onClick:function(){}
            }, options);

            var _stringclass = {
                head:"panel-head",
                body:"panel-body",
                title:"panel-head-title",
                hidden:"f-hidden",
                active:"active"
            };

            var accordion = $(this);
            var head = accordion.children().children("."+_stringclass.head);
            var body = accordion.children().children("."+_stringclass.body);

            var getOption = accordion.attr("options");
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
            var tabstyle = "";
            var contentstyle = "";

            // if(!_options.fit){
            //     tabstyle = "height:"+_options.height+"px;_height:"+_options.height+"px;width:"+_options.width+"px;";
            //     contentstyle = "height:"+(_options.height - 66)+"px;_height:"+(_options.height - 66)+"px;width:"+(_options.width - 30)+"px;overflow:auto";
            // }

            if(_options.fit){
                var parentHeight = accordion.parent().height();
                tabstyle = "height:"+parentHeight+"px";
                var headHeight = 0;
                accordion.css("overflow","hidden")
                head.each(function(index, head){
                    headHeight+= $(head).outerHeight();
                })
                contentstyle = "height:"+(parentHeight - headHeight)+"px";
                accordion.innerHeight(parentHeight)
                body.each(function(index, bd){
                    $(bd).outerHeight(parentHeight - headHeight)
                    $(bd).css("overflow-y","auto")
                })
            }
            // accordion.attr("style", tabstyle);
            // body.each(function(index, bd){
            //     $(bd).attr("style", contentstyle)
            // })

            var show = function(index){
                var page = _options.index;
                if(index){
                    page = index;
                }

                body.each(function(i, e){
                    var t = $(e);
                    if(page > 0 &&  page == (i + 1)){
                        if(_options.isAnimation){
                            if(_options.multiple){
                                t.slideToggle(_options.animationTime, function(){
                                    andy.layout(t)
                                });

                            }else{
                                t.slideDown(_options.animationTime, function(){
                                    andy.layout(t)
                                });
                            }
                        }else{
                            if(_options.multiple){
                                t.toggleClass(_stringclass.hidden);
                                andy.layout(t)
                            }else{
                                t.removeClass(_stringclass.hidden);
                            }
                        }
                    }else{
                        if(!_options.multiple){
                            if(_options.isAnimation){
                                t.slideUp(_options.animationTime);
                            }else{
                                t.addClass(_stringclass.hidden);
                            }
                        }
                    }
                })
            }

            var choose = function(index){
                body.each(function(i, e){
                    var t = $(e);
                    if(t.css("display") == "block" && _options.multiple){

                    }
                })
                show(index);
            }

            var build = function(){
                if(_options.multiple && !_options.isAllOpen){
                    body.each(function(i, e){
                        var t = $(e);
                        if(_options.index > 0 && _options.index == (i+1)){
                            if(_options.isAnimation){
                                t.slideDown(_options.animationTime, function(){
                                    andy.layout(t)
                                });
                            }
                        }else{
                            if(_options.isAnimation){
                                t.slideUp(_options.animationTime);
                            }else{
                                t.addClass(_stringclass.hidden);
                            }
                        }
                    });
                }else if(_options.multiple && _options.isAllOpen){
                    body.each(function(i, e){
                        var t = $(e);
                        if(_options.isAnimation){
                            t.slideDown(_options.animationTime, function(){
                                andy.layout(t)
                            });
                        }
                    });
                }else{
                    show();
                }
            };

            var start = function(){
                if(body){
                    build();
                };

                //绑定事件
                head.each(function(i, e){
                    $(e).click(function(e){
                        show(i+1);
                        // activate
                        head.each(function(index, head){
                            $(head).removeClass(_stringclass.active);
                        });
                        $(this).addClass(_stringclass.active);
                        _options.onClick(e);
                    })

                    if(i == _options.index-1){
                        $(this).addClass(_stringclass.active);
                    }else if(_options.isAllOpen){
                        $(this).addClass(_stringclass.active);
                    }
                })
            };
            start();
        }
    })
})(jQuery);