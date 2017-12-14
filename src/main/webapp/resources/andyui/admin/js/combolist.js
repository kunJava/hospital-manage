/*combolist */
/**
 * 下拉列表模块
 * author:林耘宇
 **/


 (function ($) {
    $.fn.extend({
        an_combolist:function(options, params){
            var am = new module();
            var combo = $(this);
            // 默认配置
            am.setOptions({
                comboId:"",
                comboSize:"",//xs sm md lg
                touchTargetType:"input",
                inputVerify:"",
                changeTarget:true,//切换触发对象内容
                inputName:"",
                showUrl:"",
                showData:[],//初始化数据
                checked:[],//已选id 初始化
                defaultValue:"下拉选择",//默认显示提示
                selects:false,//是否多选
                isEnable:true,//是否可用
                isText:false,//是否为纯文本 无法选择设置
                row:0,//默认显示多少行,更多的出现滚动条
                open:false,//默认关闭
                windowAuto:true,//根据窗口自适应
                idvalue:"id",//属性字段绑定
                valuedata:"value",//属性字段绑定
                namevalue:"name",//属性字段绑定
                editor:false,//可编辑 可以输入
                onChange:function(){}//选择事件
            })

            // 配置
            var showEvent = "click";//默认显示事件
            var touchIsEnable = true;//触发对象是否可用

            if(typeof options == "string"){
                var method = $.fn.an_combolist.methods[options];
                if(method){
                    return method(combo, params);
                }
            }else{
                am.init(options)
                _options = am.getOptions()
                // 组件业务处理
                var combo = $(this);
                if(combo.is("input")){
                    var combo_id = combo.attr("id");
                    combo.removeAttr("id", "");
                    combo.removeAttr("an-combo", "");
                    if(!combo_id){
                        combo_id = "combo_"+andy.getRandom(10000);
                    }
                    var combo_style = combo.attr("style");
                    combo.removeAttr("style");
                    _options.inputName = combo.attr("name");
                    combo.removeAttr("name");
                    var combo_options = combo.attr("options");
                    combo_options = "options = "+combo_options;
                    combo.removeAttr("options", "");
                    var combo_class = "m-combo";
                    if(combo.attr("class")){
                        combo_class = combo.attr("class");
                        combo.attr("class", "");
                    }
                    combo.css("type", "hidden");
                    var div = "<div class = '"+combo_class+"' id = '"+combo_id+"' style = '"+combo_style+"' "+combo_options+" an-combo></div>";
                    combo.before(div);
                    combo.remove();
                    combo = $("#"+combo_id);
                }
                if(combo.attr("an-combo") != "an-combo"){
                    combo.attr("an-combo", "an-combo");
                }
                // 给combo生成id
                if(_options.comboId == ""){
                    combo = andy.setRandomId(combo, "combo_");
                    _options.comboId = combo.attr("id");
                }
                var doc = $(document);
                var win = $(window);
                var ul_height = 0;//第一层ul高度
                var getOption = combo.attr("options");
                if(getOption){
                    am.extendOptions(getOption)
                    _options = am.getOptions()
                }
                _options.combo = combo;
                combo.data("options", _options)

                 // 兼容IE6 的显示
                if(andy.IE() == 6){
                    combo.find("ul").each(function(i, e){
                        var cell = $(e);
                        if(!cell.prev().is("div")){
                            cell.before("<div></div>");
                        }
                    });
                };

                // 判断是否有侧边滚动条
                var isHaveScroll = am.checkIsHaveScroll();

                var setUlHeight = function(){
                    // 只有大于row的时候才出现滚动条
                    if(combo.showTarget.children().length > _options.row && _options.row != 0){
                        combo.showTarget.addClass("u-overflow-y");
                        ul_height = _options.row * combo.showTarget.children().outerHeight();
                        combo.showTarget.height(ul_height);
                    }else{
                        combo.showTarget.removeClass("u-overflow-y");
                        ul_height = 0;//combo.showTarget.children().length * last_li.outerHeight();
                        combo.showTarget.css("height", "");
                    };
                };

                var setUlScrollHeight = function(height){
                    if(height < combo.showTarget.height()){
                        combo.showTarget.addClass("u-overflow-y");
                        combo.showTarget.outerHeight(height)
                    }
                }

                // 显示层排列
                var showUl = function(pul, ul){
                    var offset = pul.offset();
                    var pleft = offset.left;
                    var ptop = offset.top;
                    var doc_width = doc.width();
                    var doc_height = doc.height();
                    var doc_scrollTop = doc.scrollTop();
                    var ul_width = ul.outerWidth();
                    setUlHeight();
                    var ulHeight = ul.height();

                    var scrollWidth = 0;
                    if(isHaveScroll){
                        scrollWidth = 17;
                    };

                    if(doc_width - pleft - scrollWidth >= ul_width){
                        ul.css({"left":"0px","right":"auto"});
                    }else{
                        ul.css({"left":"auto", "right":"0px"});
                    };
                    // 垂直排列
                    var buttonHeight = combo.touchTarget.outerHeight();
                    /* ________________
                       |           |   buttonTop Height
                       |  ______   |___
                       |  |     |  |
                       |  -------  |-----buttonBottom Height
                       -------------------
                    */
                    
                    var buttonBottom = win.height() - (ptop - doc_scrollTop);
                    var buttonTop = win.height() - buttonBottom - buttonHeight;
                    if(_options.windowAuto){
                        if(buttonBottom >= buttonTop){
                            ul.css("top", buttonHeight + "px");
                            setUlScrollHeight(buttonBottom - buttonHeight)
                        }else{
                            setUlScrollHeight(win.height() - buttonBottom)
                            ulHeight = combo.showTarget.outerHeight()
                            ul.css("top", -ulHeight + "px");
                        }
                    }else{
                        ul.css("top", buttonHeight + "px");
                        setUlScrollHeight(buttonBottom - buttonHeight)
                    }
                    
                };

                var init = function(combo, touchType, showType){
                    combo.data("selects", _options.selects);
                    combo.data("isEnable", _options.isEnable);
                    combo.data("isText", _options.isText);
                    combo.an_combolist_creatTouch(_options);
                    combo.an_combolist_creatShow(_options);
                }

                // 当没有静态对象时 初始化默认对象
                if(combo.children().length == 0){
                    init(combo, _options.touchTargetType, _options.showTargetType);
                }else{
                    var touchTarget = andy.combo("getTouchTarget", combo);
                    // 判断触发对象类型
                    if(_options.inputName == ""){
                        _options.inputName = _options.comboId;
                    }
                    if(_options.valueForInput == null){
                        combo.append("<input type = 'hidden' name = '"+_options.inputName+"'>");
                        _options.valueForInput = combo.find("input");
                    }
                    init(combo, _options.touchTargetType, _options.showTargetType);
                    if(_options.editor == false){
                        combo.find(".u-input").addClass("u-diseditor");
                    }else{
                        combo.find(".u-input").attr("readonly", null);
                    }
                }

                andy.combo({
                    combo:combo,
                    showEvent:showEvent,
                    showComplete:function(){
                        combo.css("z-index", 99999);
                        combo.showTarget.css("z-index", 99999);
                        showUl(combo, combo.showTarget);
                    },
                    hiddenComplete:function(){
                        combo.css("z-index", "");
                        combo.showTarget.css("z-index", "");
                    }
                });
            }
        },
        an_combolist_creatTouch:function(options){
            var am = new module();
            var comboId = $(this).attr("id");
            var combo = $("#"+comboId);

            // 默认配置
            am.setOptions({
                combo:"",
                comboName:"combo",
                inputVerify:"",
                checked:"",//已选id 初始化
                selects:false,
                defaultValue:"下拉选择",
                touchTargetType:""//默认显示多少行,更多的出现滚动条
            })

            if(typeof options == "string"){
                var method = $.fn.an_combolist.methods[options];
                if(method){
                    return method(combo, params);
                }
            }else{
                am.init(options)
                _options = am.getOptions()
                if(combo.data("selects") != undefined){
                    _options.selects = combo.data("selects");
                }

                if(_options.combo.children().length == 0){
                    var enableText = "";
                    if(_options.combo.data("isEnable") == false){
                        enableText = "disabled";
                    }
                    if(_options.checked.length > 0){
                        _options.defaultValue = "";
                    }
                     _options.combo.append("<div class='u-group "+_options.comboSize+"'><input class = 'item item-l u-input u-diseditor' readonly='readonly' verify = '"+_options.inputVerify+"' value = '"+_options.defaultValue+"' "+enableText+" combo = '"+_options.comboName+"'><i class='iconfont mark item item-r'>&#xe613;</i></div>");
                    andy.formlayout();
                }
            }
        },
        an_combolist_creatShow:function(options){

        },
        an_combolist_bindEvent:function(){

        }
    })
    $.fn.an_combolist.methods = {
        getValue:function(combo, param){
            return "ssss";
        }
    }
})(jQuery);