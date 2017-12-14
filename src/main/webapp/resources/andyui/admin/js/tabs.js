/*tabs */
/**
 * 分页模块
 * author:林耘宇
 **/
(function ($) {
    $.fn.extend({
        an_tabs:function(){
            var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;

            var _options = $.extend({
                tabsId:"",
                index:1,//默认打开
                fit:true,//默认自适应
                autoActive:true,//自动渲染 关闭后默认只渲染首开页
                height:0,
                width:0,
                tabsEvent:"click",//tabs切换事件
                hidden:[],//隐藏tabs:0不可见 1可见 [1, 0, 1];
                onClick:function(){}
            }, options);

            var _stringclass = {
                head:"m-tabs-header",
                body:"m-tabs-content",
                layouted:"layouted",
                hidden:"f-hidden",
                item:"item",
                active:"active",
                headTop:"head-top",
                headLeft:"head-left",
                headRight:"head-right",
                headBottom:"head-bottom"
            };

            var tabs = $(this);
            if(_options.tabsId == ""){
                tabs = andy.setRandomId(tabs, "tabs_");
                _options.tabsId = tabs.attr("id");
            }
            var head = tabs.children("."+_stringclass.head);
            var body = tabs.children("."+_stringclass.body);
            var item = body.children("." + _stringclass.item);
            var leftBar = "<div class='iconfont left-bar'>&#xe614;</div>";
            var rightBar = "<div class='iconfont right-bar'>&#xe607;</div>";
            var showEvent = "SHOW_EVENT";
            
            // 获取 设置对象
            var getOption = tabs.attr("options");
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

            tabs.data("fit", _options.fit);
            var show = function(index){
                body.children().each(function(i, e){
                    var t = $(e);
                    if(index == i){
                        if(!t.hasClass(_stringclass.active)){
                            t.addClass(_stringclass.active);
                        }
                        if(!t.hasClass(_stringclass.layouted)){
                            if(_options.autoActive == false){
                                t.append(t.data("content"))
                            }
                            andy.perform(t);
                            andy.layout(t);
                            t.addClass(_stringclass.layouted);
                        }
                    }else{
                        t.removeClass(_stringclass.active);
                    }
                });
            };

            // 执行隐藏
            var isHidden = function(index){
                if(_options.hidden != []){
                    if(typeof(_options.hidden[index]) == "number"){
                        return _options.hidden[index];
                    }
                }else{
                    return 1;
                };
            };

            if(funstyle != ""){
                //方法写入
                if(funstyle == "hidden"){
                    // 默认选择第一个 显示的页签
                    var getChoose = function(arr){
                        var choose = 0;
                        for(var i = 0; i < arr.length; i++){
                            if(arr[i] == 1){
                                choose = i;
                                break;
                            }
                        };
                        return choose;
                    };
                    var arr = arguments[1];
                    var choose = getChoose(arr);
                    _options.hidden = arr;
                    show(choose);

                    head.find("li").each(function(i, e){
                        var t = $(e);
                        t.removeClass(_stringclass.active);
                        if(isHidden(i) == 0){
                            t.hide();
                        }else if(isHidden(i) == 1){
                            t.show();
                            if(i == choose){
                                t.addClass(_stringclass.active);
                            }
                        };
                    });

                    
                }else if(funstyle = "show"){
                    var index = parseInt(arguments[1]);
                    if(index < 0){
                        index = 0;
                    }
                    tabs.trigger(showEvent, index);
                };
            }else{

                if(tabs[0]){
                    tabs[0].option = _options;
                }
                
                
                var tabstyle = "";
                var contentstyle = "";
                var leftBarBtn,rightBarBtn;
                // var pheight = tabs.parent().height();//父级高度

                // console.log(tabs.parent().css("height"))
                var bodyPadding = parseInt(body.css("padding-left"));
                if(!bodyPadding){
                    bodyPadding = 0;
                }
                var bodyBorder = parseInt(body.css("border-left"));
                if(!bodyBorder){
                    bodyBorder = 0;
                }
                var bodyBottomBorder = parseInt(body.css("border-bottom"));
                if(!bodyBottomBorder){
                    bodyBottomBorder = 0;
                }
    			//alert(bodyPadding);
    			
                var headHeight = 0;//head.outerHeight() + bodyPadding *2;
                var headWidth = 0;

                // 初始化左右滑动按钮
                var moveOptions = function(direction){
                    var ulWidth = getHeadWidth();
                    var headWidth = head.width()- leftBarBtn.outerWidth()*2 - head.find("li").length * 2 -2;
                    var ul = head.find("ul");
                    var left = ul.css("left") == "auto"?0:parseInt(ul.css("left"));
                    var moveLeft = left+headWidth*direction;
                    moveLeft > 0?moveLeft = 0:null;
                    moveLeft < -ulWidth?moveLeft = left:null;
                    -moveLeft > (ulWidth - headWidth)? moveLeft = headWidth - ulWidth:null; 
                    ul.animate({"left":moveLeft}, 300)
                }
                var setOptionsBtn = function(){
                    head.append(leftBar);
                    head.append(rightBar);
                    leftBarBtn = head.find(".left-bar");
                    leftBarBtn.hide()
                    leftBarBtn.click(function(){
                        moveOptions(1)
                    })
                    rightBarBtn = head.find(".right-bar");
                    rightBarBtn.hide()
                    rightBarBtn.click(function(){
                        moveOptions(-1)
                    })
                }
                if(!tabs.hasClass(_stringclass.headTop) && !tabs.hasClass(_stringclass.headLeft) && !tabs.hasClass(_stringclass.headRight) && !tabs.hasClass(_stringclass.headBottom)){
                    headHeight = head.outerHeight();
                    setOptionsBtn()
                    // tabs.addClass(_stringclass.headTop);
                }else if(tabs.hasClass(_stringclass.headTop)){
                    headHeight = head.outerHeight();
                    setOptionsBtn()
                }else if(tabs.hasClass(_stringclass.headLeft)){
                    headWidth = head.outerWidth();
                }else if(tabs.hasClass(_stringclass.headRight)){
                    headWidth = head.outerWidth();
                }else if(tabs.hasClass(_stringclass.headBottom)){
                    headHeight = head.outerHeight();
                }

                var choose = function(index){
                    head.find("li").each(function(i, e){
                        var t = $(e);
                        if(index == i){
                            if(!t.hasClass(_stringclass.active)){
                                t.addClass(_stringclass.active);
                            }
                        }else{
                            if(isHidden(i) == 0){
                                t.hide()
                                // t.addClass(_stringclass.hidden);
                            }
                            t.removeClass(_stringclass.active);
                        }
                    })
                    // hiddenTabs();
                    if(_options.autoActive == false){
                        body.children().each(function(i, e){
                            var t = $(e);
                            if(index != i){
                                if(!t.hasClass(_stringclass.layouted)){
                                    var con = t.html();
                                    if(con){
                                        t.data("content", con)
                                    }
                                    t.empty()
                                }
                            }
                        });
                    }
                    show(index);
                };

                var start = function(){
                    if(tabs.children().find(_stringclass.head)){
                        choose(_options.index - 1);
                    }

                    //绑定事件
                    head.find("li").each(function(i, e){
                        var $e = $(e);
                        // $e.is('li') || ($e = $e.closest('li'));
                        $e.find(".close").click(function(e){
                            $e.addClass("f-hidden")
                            _options.hidden[i] = 0;
                            choose(0);
                            e.stopPropagation()
                        })
                        $e.bind(_options.tabsEvent, function(event){
                            choose(i);
                            _options.onClick(event);
                            tabs.trigger(andy.EVENT_CLICK, i+1);
                        })
                    })
                };

                var getHeadWidth = function(){
                    var width = 0;
                    head.find("li").each(function(index, li){
                        width += $(li).outerWidth()
                    })
                    return width;
                }

                var fitlayout= function(){
                    var pheight = tabs.parent().height();
                    var pwidth = tabs.parent().width();
                    // tabs.height(pheight).width(pwidth);
                    tabs.outerHeight(pheight).outerWidth(pwidth);
                    body.outerHeight(pheight - headHeight).outerWidth(pwidth - headWidth);
                    // tabs.trigger("layout_complete");//出发布局结束
                    var bodyHeight = body.height();
                    var bodyWidth = body.width();
                    body.children().each(function(index, content){
                        var $content = $(content);
                        $content.outerHeight(bodyHeight).outerWidth(bodyWidth);
                    });

                    // overflow
                    if(getHeadWidth() > head.width() && leftBarBtn){
                        head.addClass("overflow")
                        head.find("ul").width(head.width()*2)
                        leftBarBtn.show()
                        rightBarBtn.show()
                    }else if(leftBarBtn){
                        head.removeClass("overflow")
                        leftBarBtn.hide()
                        rightBarBtn.hide()
                    }
                };

                // 主动选择分页
                tabs.bind(showEvent, function(e, index){
                    choose(index);
                })
                
                if(!tabs.data("fit")){
                    var pheight = tabs.parent().height();
                    var pwidth = tabs.parent().width();
                    if(_options.height>0){
                        pheight = _options.height;
                    }
                    if(_options.width>0){
                        pwidth = _options.width;
                    }
                    tabs.outerHeight(pheight).outerWidth(pwidth);
                    body.outerHeight(pheight - headHeight).outerWidth(pwidth - headWidth);
                    var bodyHeight = body.height();
                    var bodyWidth = body.width();
                    body.children().each(function(index, content){
                        var $content = $(content);
                        $content.outerHeight(bodyHeight).outerWidth(bodyWidth);
                        $content.outerWidth(bodyWidth);
                    });
                }else{
                    fitlayout();
                    tabs.bind("layout", function(){
                        fitlayout();
                    })
                };

                start();
            };
        }
    })
})(jQuery);