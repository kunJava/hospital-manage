/*combo */
/**
 * 组合框模块
 * author:林耘宇
 **/
 (function ($) {
    $.fn.extend({
        an_inputcombo:function(){
            var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;

            var _options = $.extend({
                comboId:"",
                touchTargetType:"input",
                inputVerify:"",
                showTargetType:"list",
                inputName:"",
                showUrl:"",
                showData:[],//初始化数据
                checked:[],//已选id 初始化
                treeCheckBoxType:{},//树选择配置
                defaultValue:"下拉选择",//默认显示提示
                treeId:"",//下拉树ID
                treeSetting:{},//下拉树 树覆盖设置
                treeAsync:{},//下拉树异步设置
                selects:false,//是否多选
                isEnable:true,//是否可用
                isText:false,//是否为纯文本 无法选择设置
                row:0,//默认显示多少行,更多的出现滚动条
                showHeight:200,//设置 在下拉树的情况下的 显示高度
                open:false,//默认关闭
                windowAuto:true,//根据窗口自适应
                idvalue:"id",//属性字段绑定
                valuedata:"value",//属性字段绑定
                namevalue:"name",//属性字段绑定
                editor:true,//可编辑 可以输入
                autoclear:false,//失去焦点自动清除
                setListHtml:"",//自定义li标签
                onInputChange:function(){},//输入事件
                onChange:function(){}//选择事件
            }, options);
            
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

                // combo.attr("type", "hidden");
                combo.css("type", "hidden");

                var div = "<div class = '"+combo_class+"' id = '"+combo_id+"' style = '"+combo_style+"' "+combo_options+" an-combo></div>";
                combo.before(div);
                combo.remove();
                combo = $("#"+combo_id);
                _options.comboId = combo_id;
            }
            if(combo.attr("an-combo") != "an-combo"){
                combo.attr("an-combo", "an-combo");
            }

            var setRandomId = function(dom, name, number){
                var id = dom.attr("id");
                var randomNumber = number || 10000;
                if(id == undefined || id == null || id == ""){
                    id = name+andy.getRandom(randomNumber);
                    dom.attr("id", id);
                    dom = $("#"+id);
                }else{
                    dom = $("#"+id);
                }
                return dom;
            };
            
            // 给combo生成id
            if(_options.comboId == ""){
                combo = setRandomId(combo, "combo_");
                _options.comboId = combo.attr("id");
            }
            var doc = $(document);
            var win = $(window);

            var ul_height = 0;//第一层ul高度

            // 私有事件
            var setRow = "EVENT_ROW";
            var setDefault = "EVENT_SET_DEFAULT";//还原默认状态
            var getVal = "EVENT_GET_VALUE";
            var getChooseId = "EVENT_GET_ID";
            var setShow = "EVENT_SHOW";//设置新的显示对象
            var setEnable = "EVENT_ENABLE";//设置是否禁用
            var setCurrentChoose = "EVENT_CHOOSE";//主动选择方法
            var setList = "EVENT_SET_NEW_LIST";
            var setTree = "EVENT_SET_NEW_TREE";
            // 特殊设置事件
            var addTree = "EVENT_TREE";//创建树多选列表

            // 配置
            var showEvent = "click";//默认显示事件
            var touchIsEnable = true;//触发对象是否可用

            // var showUrl = _options.showUrl;//异步加载url 包含list tree

            // 获取 设置对象
            var getOption = combo.attr("options");
            var getValueElement = "";
            if(getOption){
                 getOption = "{"+ getOption+"}";
                 getOption = andy.stringToJson(getOption);
                // 处理设置
                for(var name in getOption){
                    if(name == "onChange"){
                        var thisName = getOption[name];
                        _options.onChange = function(e){
                            var fun = andy.stringToJson(thisName);
                            fun(e);
                        }
                    }else if(name == "checked"){
                        var data = getOption[name].split(",");
                        _options.checked = data;
                    }else{
                        if(getOption[name] == "true"){
                            _options[name] = true;
                        }else if(getOption[name] == "false"){
                            _options[name] = false;
                        }else{
                            _options[name] = getOption[name];
                        }
                        
                    }
                    
                }
            }
            _options.combo = combo;
            // console.log(getOption);
            //入值input// 最新的 button 对象 touchTarget:button 的情况
            _options.valueForInput = null;
            combo.find("input").each(function(i, input){
                if($(input).attr("type") == "hidden"){
                    _options.valueForInput = $(input);
                }
            });
            

            if(funstyle != ""){
                // 处理方法
                if(funstyle == "row"){
                    var row = arguments[1];
                    if(combo && combo[0]){
                        combo.trigger(setRow, row);
                    };
                }else if(funstyle == "setDefault"){
                    var fun = arguments[1];
                    combo.trigger(setDefault, fun);
                }else if(funstyle == "setCurrentChoose"){
                    var choose = arguments[1];
                    // choose:[id, id]
                    var arr = {
                        choose:choose
                    }
                    combo.trigger(setCurrentChoose, arr);
                }else if(funstyle == "getValue"){
                    var fun = arguments[1];
                    combo.trigger(getVal, fun);
                }else if(funstyle == "getChooseId"){
                    var fun = arguments[1];
                    combo.trigger(getChooseId, fun);
                }else if(funstyle == "getShowTarget"){
                    // 获取显示对象
                    return andy.combo("getShowTarget", $("#"+_options.comboId));
                }else if(funstyle == "setShowTarget"){
                    // 设置新的显示对象
                    var show = arguments[1];
                    combo.trigger(setShow, show);
                }else if(funstyle == "setList"){
                    var arr = {
                        listdata:arguments[1]
                    };
                    combo.trigger(setList, arr);
                }else if(funstyle == "setTree"){
                    var arr = {
                        listdata:arguments[1]
                    };
                    combo.trigger(setTree, arr);
                }else if(funstyle == "addTree"){
                    // 传入树设置
                    var op = arguments[1];
                    combo.trigger(addTree, op);
                }else if(funstyle == "isEnable"){
                    var isEnable = arguments[1];
                    combo.trigger(setEnable, isEnable);
                };
            }else{
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
                var isHaveScroll = function(){
                    var have = false;
                    if(doc.height() > win.innerHeight()){
                        have = true;
                    };
                    return have;
                };

                var setUlHeight = function(){
                    // 只有大于row的时候才出现滚动条
                    if(combo.showTarget.children().length > _options.row && _options.row != 0){
                        combo.showTarget.addClass("u-overflow-y");
                        ul_height = _options.row * combo.showTarget.children().outerHeight();
                        combo.showTarget.height(ul_height);
                        // u-overflow-y
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
                    // console.log("input"+combo.touchTarget.width(), combo.touchTarget.outerWidth());
                    // ul.width(combo.touchTarget.width());
                    // console.log("ul"+ul.width(), ul.outerWidth());
                    var ul_width = ul.outerWidth();
                    setUlHeight();
                    var ulHeight = ul.height();

                    var scrollWidth = 0;
                    if(isHaveScroll()){
                        scrollWidth = 17;
                    };

                    // combo.showTarget.width(combo.touchTarget.width())

                    if(doc_width - pleft - scrollWidth >= ul_width){
                        ul.css({"left":"0px","right":"auto"});
                    }else{
                        ul.css({"left":"auto", "right":"0px"});
                    };
                    // 垂直排列
                    // ul.css({"left":pleft});
                    // 上下排列
                    // var buttonHeight = combo.touchTarget.outerHeight()-1;
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
                            // ul.css("top", ptop + buttonHeight + "px");
                            ul.css("top", buttonHeight + "px");
                            setUlScrollHeight(buttonBottom - buttonHeight)
                        }else{
                            setUlScrollHeight(win.height() - buttonBottom)
                            ulHeight = combo.showTarget.outerHeight()
                            // ul.css("top", ptop-ulHeight + "px");
                            ul.css("top", -ulHeight + "px");
                        }
                    }else{
                        // ul.css("top", ptop + buttonHeight + "px");
                        ul.css("top", buttonHeight + "px");
                        setUlScrollHeight(buttonBottom - buttonHeight)
                    }
                    
                };

                // 除开ul的 显示位置
                var show = function (pdiv, div){
                    var offset = pdiv.offset();
                    var pleft = offset.left;
                    var ptop = offset.top;
                    var doc_width = doc.width();
                    var doc_height = doc.height();
                    var doc_scrollTop = doc.scrollTop();
                    // console.log("input"+combo.touchTarget.width(), combo.touchTarget.outerWidth());
                    // div.width(combo.touchTarget.width());
                    // console.log("div"+div.width(), div.outerWidth());
                    var ul_width = div.outerWidth();
                    var ulHeight = div.height();

                    var scrollWidth = 0;
                    if(isHaveScroll()){
                        scrollWidth = 17;
                    };

                    // if(combo.touchTarget.width() == "100%" || combo.touchTarget.width() == false){
                    //     combo.showTarget.width(combo.touchTarget.width())
                    // }

                    // 左右排列
                    if(doc_width - pleft - scrollWidth >= ul_width){
                        div.css({"left":"0px","right":"auto"});
                    }else{
                        div.css({"left":"auto", "right":"0px"});
                    };

                    // 垂直排列
                    // div.css({"left":pleft+"px"});

                    // 上下排列
                    // console.log(win.height() - (ptop - doc_scrollTop), ulHeight);
                    // var buttonHeight = combo.touchTarget.outerHeight() - 1;
                    var buttonHeight = combo.touchTarget.outerHeight();
                    // if(_options.windowAuto){
                    //     if($(window).height() - (ptop - doc_scrollTop) - buttonHeight <= ulHeight){
                    //         div.css("top", -ulHeight + "px");
                    //     }else{
                    //         div.css("top", buttonHeight + "px");
                    //     }
                    // }else{
                    //     div.css("top", buttonHeight + "px");
                    // }

                    var buttonBottom = win.height() - (ptop - doc_scrollTop);
                    var buttonTop = win.height() - buttonBottom - buttonHeight;
                    if(_options.windowAuto){
                        if(buttonBottom >= buttonTop){
                            // div.css("top", ptop + buttonHeight + "px");
                            div.css("top", buttonHeight + "px");
                            setUlScrollHeight(buttonBottom - buttonHeight)
                        }else{
                            setUlScrollHeight(win.height() - buttonBottom)
                            ulHeight = combo.showTarget.outerHeight()
                            // div.css("top", ptop-ulHeight + "px");
                            div.css("top", -ulHeight + "px");
                        }
                    }else{
                        // div.css("top", ptop + buttonHeight + "px");
                        div.css("top", buttonHeight + "px");
                        setUlScrollHeight(buttonBottom - buttonHeight)
                    }
                };

                // =========================================通用 显示对象方法

                // 更新显示对象 显示对象 是否清除以前结构
                var setCurrentShow = function(show, isClear){
                    if(isClear){
                        combo.showTarget.empty();
                    };
                    if(show instanceof jQuery){  
                        combo.showTarget.replaceWith(show);
                    }else{
                        combo.showTarget.replaceWith($(show));
                    };
                    andy.combo({
                        combo:combo,
                        showEvent:showEvent,
                        showComplete:function(){
                            if(_options.showTargetType == "list"){
                                showUl(combo, combo.showTarget);
                            }else{
                                show(combo, combo.showTarget);
                            }
                        }
                    });
                    _options.showData = [];
                    // _options.showUrl = "";
                    combo.an_inputcombo_bindEvent(_options);
                };

                // 样式修复
                // combo.addClass("u-input-span");
                // combo.css("padding", "0px");

                var setEnableFun = function(){
                    if(combo){
                        var touchTarget = combo.touchTarget;
                        if(touchTarget.is("input") == false){
                            touchTarget = touchTarget.find("input");
                        }
                        if(combo.data("isEnable") == true){
                            touchTarget.removeAttr("disabled");
                            combo.removeClass("u-disabled");
                        }else{
                            touchTarget.attr("disabled","disabled");
                            combo.addClass("u-disabled");
                        }
                    }
                }


                var init = function(combo, touchType, showType){
                    combo.data("selects", _options.selects);
                    combo.data("isEnable", _options.isEnable);
                    combo.data("isText", _options.isText);
                    combo.an_inputcombo_creatTouch(_options);
                    combo.an_inputcombo_creatShow(_options);
                    if(_options.inputName == "" || _options.inputName == undefined){
                        _options.inputName = _options.comboId+"_input";
                    }
                    if(_options.valueForInput == null){
                        combo.append("<input type = 'hidden' name = '"+_options.inputName+"'>");
                        _options.valueForInput = combo.find("input:hidden");
                    }
                }

                // "normal":input 普通类型  "ban":input 禁止修改
                // 当没有静态对象时 初始化默认对象
                if(combo.children().length == 0){
                    init(combo, _options.touchTargetType, _options.showTargetType);
                    if(_options.editor == false){
                        combo.find(".u-input:first").addClass("u-diseditor");
                    }else{
                        combo.find(".u-input:first").attr("readonly", null);
                        combo.find(".u-input:first").removeClass("u-diseditor");
                    }
                }else{
                    var touchTarget = andy.combo("getTouchTarget", combo);
                    // 判断触发对象类型
                    // if(touchTarget.is("button")){
                        // _options.touchTargetType = "button";
                        
                    // }
                    init(combo, _options.touchTargetType, _options.showTargetType);
                    if(_options.editor == false){
                        combo.find(".u-input:first").addClass("u-diseditor");
                    }else{
                        combo.find(".u-input:first").attr("readonly", null);
                    }
                }

                andy.combo({
                    combo:combo,
                    showEvent:showEvent,
                    showComplete:function(){
                        combo.css("z-index", 99999);
                        combo.showTarget.css("z-index", 99999);
                        if(_options.showTargetType == "list"){
                            showUl(combo, combo.showTarget);
                        }else{
                            show(combo, combo.showTarget);
                        }
                    },
                    hiddenComplete:function(){
                        combo.css("z-index", "");
                        combo.showTarget.css("z-index", "");
                    }
                });

                setEnableFun();

                // 入值input
                _options.valueForInput = combo.touchTarget;
                if(_options.valueForInput.is("input") == false){
                    _options.valueForInput.find("input").each(function(index, input){
                        _options.valueForInput = $(input);
                    })
                }
                // if(_options.valueForInput.is("input")){
                    if(_options.inputName == "" && _options.valueForInput.attr("name") == undefined){
                        // _options.inputName = _options.comboId + "_value";
                        _options.valueForInput.attr("name", _options.comboId + "_value");
                    }else if(_options.valueForInput.attr("name") == undefined){
                        _options.valueForInput.attr("name", _options.comboId + "_value");
                    }
                // }
                

                // 修改限制行
                combo.bind(setRow, function(e, row){
                    _options.row = row;
                });

                // 设置新的list对象 通过json
                combo.bind(setList, function(e, arr){
                    var show = combo.an_inputcombo_getList(_options, arr.listdata);
                    var target = combo.showTarget;
                    target.empty();
                    // target.append(show);
                    // combo.an_inputcombo("setDefault");
                    // setCurrentShow(target, true);
                    _options.showData = arr.listdata;
                    combo.an_inputcombo_bindEvent(_options)
                });

                // 设置新tree对象 通过json
                combo.bind(setTree, function(e, arr){
                    var target = combo.showTarget;
                    target.empty();
                    andy.combo({
                        combo:combo,
                        showEvent:showEvent,
                        showComplete:function(){
                            show(combo, combo.showTarget);
                        }
                    });
                    _options.showData = arr.listdata;
                    combo.an_inputcombo_bindEvent(_options)
                })

                // 设置新的显示对象
                combo.bind(setShow, function(e, show){
                    setCurrentShow(show, true);
                });

                // 树结构事件绑定
                combo.bind(addTree, function(e, op){
                    // createTree(op.treeId, op.setting, op.nodes, op);
                });

                if(combo.showTarget.is("ul")){
                    // combo.find("ul li").click(function(e){
                    //     var t = $(e.target);
                    //     if(t.is('li') == false){
                    //         t = t.closest('li');
                    //     };
                    //     // 如果有 入值input 就附上value值
                    //     if(inputValue[0]){
                    //         inputValue.val(t.attr("value"));
                    //     };
                    //     if(span[0]){
                    //         if(span.children().has("p")){
                    //             var text = $(e.target).text();
                    //             span.children("p").text(text);
                    //         };
                            
                    //     };
                    //     combo.showTarget.css("display", "none");
                    //     combo.removeClass("open");
                    //     combo.trigger(andy.EVENT_CLICK, t.attr("value"));
                    // }); 
                };

                // 还原默认状态
                combo.bind(setDefault, function(e, fun){
                    var touchTarget = combo.find("input:hidden");
                    var valueInput = combo.touchTarget;
                    var inputValue = "";
                    var valueArr = "";
                    var idArr = "";
                    if(valueInput.is("input") == false){
                        valueInput = combo.find("input:first");
                    } 
                    if(combo.showTarget.is("ul")){
                        combo.showTarget.children().each(function(i, li){
                            var $li = $(li);
                            if($li.hasClass("active")){
                                $li.removeClass("active");
                            }
                            if(_options.checked.length > 0){
                                for(var di in _options.checked){
                                    if($li.attr("listId") == _options.checked[di]){
                                        $li.addClass("active")
                                        if(idArr == ""){
                                            inputValue = $li.text();
                                            valueArr = $li.attr("value");
                                            idArr = $li.attr("listId")
                                        }else{
                                            inputValue += ","+$li.text();
                                            valueArr = $li.attr("value");
                                            idArr += ","+$li.attr("listId");
                                        }
                                    }
                                }
                            }
                        })
                    }

                    if(touchTarget.is("input")){
                        if(_options.checked.length > 0){
                            touchTarget.attr({"value":inputValue, "idValue":idArr, "valueData":valueArr});
                            touchTarget.val(inputValue);
                            valueInput.attr("value", inputValue);
                            valueInput.val(inputValue);
                        }else{
                            touchTarget.attr({"value":_options.defaultValue, "idValue":"", "valueData":""});
                            touchTarget.val(_options.defaultValue);
                            valueInput.attr("value", _options.defaultValue);
                            valueInput.val(_options.defaultValue);
                        }
                    }

                    if(fun){
                        fun(valueArr, idArr);
                    }
                    
                })

                // 是否禁用combo
                // console.log(combo)
                combo.bind(setEnable, function(e, isEnable){
                    combo.data("isEnable",isEnable);
                    setEnableFun();
                });


                // 绑定显示对象事件 绑定事件 可以在创建方法里面直接绑定 也可以调用绑定事件方法
                combo.an_inputcombo_creatShow("eventBind", _options);
                
                // combo.an_inputcombo_bindEvent({
                //     combo:combo,
                //     touchTargetType:touchTargetType,
                //     showTargetType:showTargetType,
                //     showUrl:showUrl
                // })

                // 设置选择id 方法
                combo.bind(setCurrentChoose, function(e, choose){

                });
            };
        },
        an_inputcombo_creatTouch:function(){
            var options = {};
            var funstyle = "";
            for(var i= 0; i <arguments.length;i++){
                var a = arguments[0];
                if(typeof a == "object"){
                    options = a;
                }else if(typeof a == "string"){
                    funstyle = a;
                }
            };

            var _options = $.extend({
                combo:"",
                comboName:"combo",
                inputVerify:"",
                checked:"",//已选id 初始化
                selects:false,
                defaultValue:"下拉选择",
                touchTargetType:""//默认显示多少行,更多的出现滚动条
                // open:false//默认关闭
            }, options);

            var addChoose = "EVENT_ADD_CHOOSE";
            var cancelChoose = "EVENT_CANCEL_CHOOSE";
            var getVal = "EVENT_GET_VALUE";
            var getChooseId = "EVENT_GET_ID";
            var comboId = $(this).attr("id");

            var combo = $("#"+comboId);
            var selectId = "";
            var seletc = "";
            if(combo.data("selects") != undefined){
                _options.selects = combo.data("selects");
            }
            
            if(funstyle != ""){
                if(funstyle == "addChoose"){
                    var touchData = arguments[1];
                    combo.trigger(addChoose, touchData)
                }else if(funstyle == "cancelChoose"){
                    var touchData = arguments[1];
                    combo.trigger(cancelChoose, touchData)
                }else if(funstyle == "getValue"){
                    var fun = arguments[1];
                    combo.trigger(getVal, fun);
                };
            }else{
                // -------------------------------------------selects 操作
                var insetSelects = function(data){
                    seletc.addElement(data)
                }

                var removeSelects = function(data){
                    seletc.deleteElement(data)
                }
                //----------------------------------------------------button touch 操作
                var addButton = function(node){
                    //插入input:id name
                    var thiscombo = $("#"+comboId);
                    var touchTarget = andy.combo("getTouchTarget", thiscombo);
                    var oldP = touchTarget.parent().find("p");
                    var inValueInput = _options.valueForInput;
                    // var inputValue;
                    // _options.combo.find("input").each(function(i, input){
                    //     if($(input).attr("type") == "hidden"){
                    //         inputValue = $(input);
                    //     }
                    // });
                    if(inValueInput.is("input") == false){
                        inValueInput.find("input").each(function(index, input){
                            inValueInput = $(input);
                        })
                    }
                    
                    var oldName = oldP.attr("value");
                    var idName = inValueInput.attr("idValue");
                    if(node.attr && typeof node.attr != "string"){
                        // node.attr = JSON.stringify(node.attr);
                        node.attr = "";
                    }

                    var inValue = inValueInput.attr("valueData");
                    if(oldName == undefined || oldName == "" || oldName == _options.defaultValue){
                        oldName = node.name;
                        idName = node.id;
                        inValue = (node.value || node.attrValue || node.attr);
                    }else{
                        oldName = oldName+"，"+node.name;
                        idName = idName+","+node.id;
                        var newV = (node.value || node.attrValue || node.attr);
                        inValue = inValue + "," +newV;
                    }
                    
                    if(_options.selects == false){
                        // console.log(node.name)
                        inValueInput.attr({"idValue":node.id, "valueData":(node.value || node.attrValue || node.attr)});
                        oldP.text(node.name);
                        // inputValue.attr({"value":node.value});
                    }else{
                        inValueInput.attr({"idValue":idName, "valueData":inValue});
                        oldP.text(oldName);
                        // inputValue.attr({"value":inValue});
                    }
                    if(inValueInput.attr("verify")){
                        // andy.inputCheck(inValueInput[0]);
                    }
                    
                }
                var insetButton = function(data){
                    var combo = $("#"+comboId);
                    if(_options.valueForInput == null){
                        if(combo.find("input").length == 0){
                            combo.append("<input type = 'hidden' name = '"+_options.inputName+"'>");
                            _options.valueForInput = combo.find("input");
                        };
                    }
                    var inValueInput = _options.valueForInput;
                    if(inValueInput.is("input") == false){
                        inValueInput.find("input").each(function(index, input){
                            inValueInput = $(input);
                        })
                    }
                    if(inValueInput && inValueInput.is("input")){
                        var idName = inValueInput.attr("idValue");
                        if(idName != undefined && idName != ""){
                            var idArr = idName.split(",");
                            var isHaveSameId = false;
                            for(var i = 0; i < idArr.length; i++){
                                if(idArr[i] == data.id){
                                    isHaveSameId = true;
                                }
                            }
                            if(!isHaveSameId){
                                addButton(data);
                            }
                        }else{
                            addButton(data);
                        }
                        
                    }
                }

                
                //-----------------------------------------------------input touch操作
                var getPathText = function(path){
                    var str = "";
                    for(var i = 0; i < path.length - 1; i++){
                            str += path[i].name+"-";
                    }
                    return str;
                }

                var addInput = function(node){
                    //插入input:id name
                    var thiscombo = $("#"+comboId);
                    // var touchTarget = andy.combo("getTouchTarget", thiscombo);
                    // var inputValue;
                    // _options.combo.find("input").each(function(i, input){
                    //     if($(input).attr("type") == "hidden"){
                    //         inputValue = $(input);
                    //     }
                    // });
                    
                    var inputValue = andy.combo("getTouchTarget", thiscombo);
                    var touchTarget = thiscombo.find("input:hidden");

                    if(inputValue.is("input") == false){
                        inputValue.find("input:first");
                    }
                    
                    var oldName = inputValue.attr("value");
                    var idName = touchTarget.attr("idValue");
                    if(node.attr && typeof node.attr != "string"){
                        // node.attr = JSON.stringify(node.attr);
                        node.attr = "";
                    }

                    var inValue = touchTarget.attr("valueData");
                    var parentName = "";
                    if(node.getParentNode && _options.selects == false){
                        parentName = getPathText(node.getPath())
                    }else if(node.path && _options.selects == false){
                        parentName = getPathText(node.path)
                    }
                    
                    if(oldName == undefined || oldName == "" || oldName == _options.defaultValue){
                        oldName = parentName+node.name;
                        idName = node.id;
                        inValue = (node.value || node.attrValue || node.attr);
                    }else{
                        oldName = oldName+"，"+parentName+node.name;
                        idName = idName+","+node.id;
                        var newV = (node.value || node.attrValue || node.attr);
                        inValue = inValue + "," +newV;
                    }
                    
                    if(_options.selects == false){
                        // touchTarget.attr({"value":parentName+node.name, "idValue":node.id, "valueData":(node.value || node.attrValue || node.attr)});
                        // touchTarget.val(parentName+node.name);
                        touchTarget.attr({"value":node.id, "idValue":node.id, "valueData":(node.value || node.attrValue || node.attr)});
                        touchTarget.val(node.id);
                        inputValue.attr("value", parentName+node.name);
                        inputValue.val(parentName+node.name);
                    }else{
                        // touchTarget.attr({"value":oldName, "idValue":idName, "valueData":inValue});
                        // touchTarget.val(oldName);
                        touchTarget.attr({"value":idName, "idValue":idName, "valueData":inValue});
                        touchTarget.val(idName);
                        inputValue.attr({"value":oldName});
                        inputValue.val(oldName);
                    }
                    if(touchTarget.attr("verify")){
                        andy.inputCheck(touchTarget[0]);
                    }
                    
                }

                // input插入
                var insetInput = function(data){
                    // console.log(touchTarget[0])
                    var touchTarget = andy.combo("getTouchTarget", $("#"+comboId));

                    if(touchTarget.is("input") == false){
                        touchTarget.find("input").each(function(index, input){
                            touchTarget = $(input);
                        })
                    }

                    if(touchTarget && touchTarget.is("input")){
                        var idName = touchTarget.attr("idValue");
                        if(idName != undefined && idName != ""){
                            var idArr = idName.split(",");
                            var isHaveSameId = false;
                            for(var i = 0; i < idArr.length; i++){
                                if(idArr[i] == data.id){
                                    isHaveSameId = true;
                                }
                            }
                            if(!isHaveSameId){
                                addInput(data);
                            }
                        }else{
                            addInput(data);
                        }
                        
                    }
                }

                

                var removeSetInput = function(treeNode){
                    // 移除input:id name
                    
                    var touchTarget = $("#"+comboId).find("input:hidden");
                    var touchValue = andy.combo("getTouchTarget", $("#"+comboId));
                    // var inputValue;
                    // _options.combo.find("input").each(function(i, input){
                    //     if($(input).attr("type") == "hidden"){
                    //         inputValue = $(input);
                    //     }
                    // });
                    if(touchValue.is("input") == false){
                        touchValue.find("input:first");
                    }


                    if(touchTarget && touchTarget.is("input")){
                        var oldName = touchValue.attr("value");
                        var idName = touchTarget.attr("idValue");

                        var inValue = touchTarget.attr("valueData");
                        // console.log("aaa:",idName)

                        var oldArr = oldName.split("，");
                        var idArr = idName.split(",");
                        var inValArr = inValue.split(",");

                        for(var i = 0; i < idArr.length; i++){
                            if(idArr[i] == treeNode.id){
                                idArr.splice(i, 1);
                                oldArr.splice(i, 1);
                                inValArr.splice(i, 1);
                            }
                        }
                        // 清空之前选择
                        touchTarget.attr("value", "");
                        touchTarget.attr("idValue", "");
                        touchTarget.attr("valueData", "");
                        var oldName = touchValue.attr("value");
                        var idName = touchTarget.attr("idValue");

                        var inValue = touchTarget.attr("valueData");
                        for(var i = 0; i < idArr.length; i++){
                            // addInput(idArr[i]);
                            var name = oldArr[i];
                            var id = idArr[i]; 
                            var valued = inValArr[i];
                            if(i == 0){
                                oldName = name;
                                idName = id;
                                inValue = valued;

                            }else{
                                oldName = oldName+"，"+name;
                                idName = idName+","+id;
                                inValue = inValue + ","+valued;
                            }
                        }

                        
                        touchValue.attr("value", oldName);
                        touchValue.val(oldName);

                        touchTarget.val(idName);
                        touchTarget.attr("value", idName);
                        touchTarget.attr("idValue", idName);
                        touchTarget.attr("valueData", inValue);
                    }
                }
                // touchTarget
                var addTouchTarget = function(touchData){
                    if(_options.touchTargetType == "input"){
                        // console.log("input")
                        insetInput(touchData);
                    }else if(_options.touchTargetType == "button"){
                        insetButton(touchData);
                    }else if(_options.touchTargetType == "selects"){
                        insetSelects(touchData);
                    }
                }

                var cancelTouchTarget = function(touchData){
                    if(_options.touchTargetType == "input"){
                        removeSetInput(touchData);
                    }else if(_options.touchTargetType == "button"){
                        removeSetButton(touchData);
                    }else if(_options.touchTargetType == "selects"){
                        removeSelects(touchData);
                    }
                }

                // 根据不同触发对象 创建不同对象
                if(_options.touchTargetType == "input"){
                    if(_options.combo.children().length == 0){
                        var enableText = "";
                        if(_options.combo.data("isEnable") == false){
                            enableText = "disabled";
                        }
                        if(_options.checked.length > 0){
                            _options.defaultValue = "";
                        }
                        _options.combo.append("<div class='u-group u-up-menu'><input class = 'item item-l u-input u-diseditor' readonly='readonly' verify = '"+_options.inputVerify+"' value = '"+_options.defaultValue+"' "+enableText+" combo = '"+_options.comboName+"'><i class='iconfont mark item item-r'>&#xe613;</i></div>");
                        andy.formlayout();
                    }
                }else if(_options.touchTargetType == "button"){
                    if(_options.combo.children().length == 0){
                        var enableText = "";
                        if(_options.combo.data("isEnable") == false){
                            enableText = "disabled";
                        }
                        if(_options.checked.length > 0){
                            _options.defaultValue = "";
                        }
                        _options.combo.append("<span class='u-but-group u-group-center'><p style='color:#000'>"+_options.defaultValue+"</p><i class='iconfont'>&#xe613;</i><button type='button' class='u-but-button' combo = '"+_options.comboName+"'></button></span>");
                        _options.combo.toggleClass("u-btn-eject u-group-center");
                        andy.formlayout();
                    }
                }else if(_options.touchTargetType == "selects"){
                    // 多选文本框
                    selectId = comboId+"_selects";
                    if(_options.combo.children().length == 0){
                        _options.combo.append("<div class='u-btn-eject' style='width:100%;' combo = '"+_options.comboName+"'><div class='u-btn-checkbox f-clear' id="+selectId+"></div></div>");
                    }
                    var inputName = _options.inputName;
                    if(inputName = ""){
                        inputName = comboId + "_input";
                    }
                    seletc = andy.multiSelect({
                        parent:document.getElementById(selectId),
                        dataKey:inputName,//input的name
                        list:[]
                    });
                }

                var touchTarget = andy.combo("getTouchTarget", $("#"+comboId));

                if(touchTarget.is("input") == false){
                    touchTarget = touchTarget.find("input:first");
                }
                // 绑定输入事件
                touchTarget.keyup(function(){
                    var changeValue = touchTarget.val();
                    _options.onInputChange(changeValue);
                    // _options.inputValue
                    touchTarget.attr("value", changeValue);
                    var hiddenInput = combo.find("input:hidden");
                    hiddenInput.val(changeValue);
                    hiddenInput.attr("value", changeValue);
                })

                touchTarget.blur(function(){
                    if(_options.autoclear){
                        touchTarget.attr("value", null);
                        touchTarget.val(null);
                        var hiddenInput = combo.find("input:hidden");
                        hiddenInput.val(null);
                        hiddenInput.attr("value", null);
                    }
                })

                touchTarget.mouseup(function(){
                    this.select();
                })

                combo.bind(addChoose, function(e, data){
                    // console.log(data)
                    addTouchTarget(data);
                })

                combo.bind(cancelChoose, function(e, data){
                    cancelTouchTarget(data);
                })

                combo.bind(getVal, function(e, fun){
                    var touchTarget = andy.combo("getTouchTarget", $("#"+comboId));
                    if(touchTarget){
                        var value = touchTarget.attr("valueData");
                        fun(value);
                    }
                })

                combo.bind(getChooseId, function(e, fun){
                    var touchTarget = andy.combo("getTouchTarget", $("#"+comboId));
                    if(touchTarget.is("input") == false){
                        touchTarget.find("input").each(function(index, input){
                            touchTarget = $(input);
                        })
                    }
                    if(touchTarget){
                        var idvalue = touchTarget.attr("idvalue");
                        fun(idvalue);
                    }
                })

            }
        },
        an_inputcombo_creatShow:function(){
            var options = {};
            var funstyle = "";
            for(var i= 0; i <arguments.length;i++){
                // console.log(arguments[0]);
                var a = arguments[0];
                if(typeof a == "object"){
                    options = a;
                }else if(typeof a == "string"){
                    funstyle = a;
                }
            };

            var _options = $.extend({
                combo:"",
                comboName:"combo",
                showTargetType:""//默认显示多少行,更多的出现滚动条
            }, options);

            var eventBind = "EVENT_BIND";

            if(funstyle != ""){
                if(funstyle == "eventBind"){
                    var obj = arguments[1];
                    $(this).trigger(eventBind, obj);
                };
            }else{
                if(_options.showTargetType == "list"){
                    if(_options.combo.children().length == 1){
                        _options.combo.append("<ul class = 'combo u-down-menu' combo = '"+_options.comboName+"'></ul>")
                    }
                }else if(_options.showTargetType == "tree"){
                    if(_options.combo.children().length == 1){
                        _options.combo.append("<div class='combo but-tree' style='height:"+_options.showHeight+"px;' combo ='"+_options.comboName+"'></div>")
                    }
                }

                _options.combo.bind(eventBind, function(e, obj){
                    _options.combo.an_inputcombo_bindEvent(obj)
                })
            }
        },
        an_inputcombo_getList:function(_options, data){
            var lis = "";
            if(data.length == 0){
                return lis;
            };
            for(var i = 0; i < data.length; i++){
                var liData = data[i];
                var isFist = "";
                var valueStr = "";
                var attrStr = "";
                var attrValueStr = "";

                if(i == 0){
                    isFist = "first";
                }
                if(liData[_options.valuedata]){
                    valueStr = "value = "+liData[_options.valuedata];
                }else if(liData.attrValue){
                    attrValueStr = "attrValue = " + liData.attrValue;
                }else if(liData.attr){
                    // 适用于多数据类型
                    attrStr = "attrStr = "+liData.attr;
                }
                var li = "<li class = '"+isFist+"' "+valueStr+" "+attrStr+" "+attrValueStr+" listId = '"+liData[_options.idvalue]+"' ><a>"+liData[_options.namevalue]+"</a></li>";
                if(_options.setListHtml != ""){
                    li = _options.setListHtml(liData).html;
                };
                lis += li;
            };
            return lis;
        },
        an_inputcombo_bindEvent:function(){
            // 绑定选中事件
            var options = {};
            var funstyle = "";
            for(var i= 0; i <arguments.length;i++){
                // console.log(arguments[0]);
                var a = arguments[0];
                if(typeof a == "object"){
                    options = a;
                }else if(typeof a == "string"){
                    funstyle = a;
                }
            };

            var _options = $.extend({
                combo:"",
                selects:false,
                checked:[],//已选id 初始化
                treeId:"",//下拉树ID
                onChange:function(){},
                touchTargetType:"input",
                showTargetType:"list",
                showUrl:""
            }, options);

            var touchTarget = _options.combo.touchTarget;
            var showTarget = _options.combo.showTarget;

            if($(this).data("selects") != undefined){
                _options.selects = $(this).data("selects");
            }

            if(funstyle != ""){
                if(funstyle == "setCurrentChoose"){
                };
            }else{

                // =========================================通用 显示对象方法

                // 更新显示对象 显示对象 是否清楚以前结构
                var setCurrentShow = function(show, isClear){
                    var combo = _options.combo;
                    if(isClear){
                        combo.showTarget.empty();
                    };
                    if(show instanceof jQuery){  
                        combo.showTarget = show;
                    }else{
                        combo.showTarget = $(show);
                    };
                };

                var addTouch = function(touchData){
                    // if(_options.touchTargetType == "input"){
                        // console.log(touchData)
                        if(touchData.checked){
                            _options.combo.an_inputcombo_creatTouch("addChoose", touchData);
                        }else{
                            _options.combo.an_inputcombo_creatTouch("cancelChoose", touchData);
                        }
                    // }
                }

                var goTreeCheck = function(treeNode, isCheck){
                    // console.log(treeNode, isCheck);
                    // var nodes = treeObj.getSelectedNodes();
                    // console.log(treeNode.checked)
                    // 插入 触发对象 利用统一方法入口
                    if (treeNode && isCheck && treeNode.checked) {
                        if (treeNode.children && _options.selects) {
                            // insetInput(treeNode);
                            _options.combo.an_inputcombo_creatTouch("addChoose", treeNode);
                            for (var i = 0; i < treeNode.children.length; i++) {
                                goTreeCheck(treeNode.children[i], isCheck);
                            }
                        } else {
                            // insetInput(treeNode);
                            _options.combo.an_inputcombo_creatTouch("addChoose", treeNode);
                        }
                    } else if (!isCheck) {
                        if (treeNode.children) {
                            // removeSetInput(treeNode);
                            _options.combo.an_inputcombo_creatTouch("cancelChoose", treeNode);
                            for (var i = 0; i < treeNode.children.length; i++) {
                                goTreeCheck(treeNode.children[i], isCheck);
                            }
                        } else {
                            // removeSetInput(treeNode);
                            _options.combo.an_inputcombo_creatTouch("cancelChoose", treeNode);
                        }
                    }
                }

                var onTreeCheck = function(treeNode){
                    if(treeNode){
                        goTreeCheck(treeNode, treeNode.checked);
                        // if(treeNode.checked){
                        //     // 选取
                        //     goTreeCheck(treeNode, true);
                        // }else{
                        //     // 取消
                        //     goTreeCheck(treeNode, false);
                        // }
                    }
                }

                var setChecked = function(treeId, checked){
                    if(!checked){
                        return false;
                    }
                    var treeObj = $.fn.zTree.getZTreeObj(treeId);
                    for(var i = 0; i < checked.length; i++){
                        var node = treeObj.getNodeByParam("id", checked[i], null);
                        if(node){
                            treeObj.checkNode(node, true, true);
                            var nodec = {
                                path:node.getPath(),
                                children:node.children,
                                value:node[_options.valuedata],
                                attr:node.attr || "",
                                name:node[_options.namevalue],
                                children:node.children,
                                checked:node.checked,
                                id:node[_options.idvalue]
                            }
                            onTreeCheck(nodec);
                        }
                    }

                }

                var getLiData = function(li){
                    // 从li标签里面获取数据
                    var liData = {
                        checked:li.hasClass("active"),
                        value:li.attr("value"),
                        id:li.attr("listId"),
                        name:li.text()
                    }
                    return liData;
                }

                // 创建列表结构
                var creatListShow = function(){
                    // 绑定事件
                    var checkLenght = _options.checked.length;
                    showTarget.children().each(function(index, li){
                        // 初始化\
                        var $li = $(li);
                        // 如果li标签 没有识别listId 则主动以索引赋予
                        if(!$li.attr("listId")){
                            $li.attr("listId", _options.combo.attr("id")+"_"+index);
                        }
                        if(checkLenght > 0){
                            for(var i = 0; i< checkLenght; i++){
                                if($li.attr("listId") == String(_options.checked[i])){
                                    $li.addClass("active");
                                    var liData = getLiData($li);
                                    addTouch(liData)
                                }
                            }

                        }
                        $li.unbind("click");
                        $li.on("click", function(e){
                            var t = $(e.target);
                            if(t.is('li') == false){
                                t = t.closest('li');
                            };
                            
                            if(!_options.selects){
                                showTarget.children().each(function(index, li){
                                    $(li).removeClass("active");
                                })
                            }
                            t.toggleClass("active");
                            var touchData = getLiData(t);
                            $li.comboData = touchData;
                            
                            addTouch(touchData)
                            $("#"+_options.comboId).trigger(andy.COMBO_CHOOSE_LISET, $li);
                            _options.onChange($li);
                            // 点击隐藏列表
                            if(_options.selects == false){
                                andy.combo("hiddenTarget", _options.combo);
                            }
                        })
                    })
                    
                }

                // 创建树结构
                var createTree = function(id, set, nodes, op){
                    var treeId = id;
                    _options.selects = op.selects;//是否多选 true为多选
                    var checked = op.checked;
                    var combo = _options.combo;
                    
                    //树设置
                    var setting = {
                        treeObj:null,
                        callback:{
                            onCheck:function(event, treeId, treeNode) {
                                var node = {
                                    path:treeNode.getPath(),
                                    children:treeNode.children,
                                    value:treeNode[_options.valuedata],
                                    attr:treeNode.attr || "",
                                    name:treeNode[_options.namevalue],
                                    children:treeNode.children,
                                    checked:treeNode.checked,
                                    id:treeNode[_options.idvalue]
                                }
                                onTreeCheck(node);
                                _options.onChange(treeNode);
                            }
                        },
                        check: {
                            enable: true,
                            autoCheckTrigger: true,
                            chkStyle: "checkbox",
                            chkboxType: { "Y": "s", "N": "s" }
                        },
                        data: {
                            key:{
                                name:_options.namevalue
                            },
                            simpleData: {
                              enable: true,
                              idKey:_options.idvalue
                            }
                        }
                    };

                    if(_options.treeCheckBoxType != {}){
                        setting.check.chkboxType = _options.treeCheckBoxType;
                    }
                    // 异步树设置
                    if(_options.treeAsync != {}){
                        setting.async = _options.treeAsync;
                    }
                    // 单选多选设置
                    if(_options.selects == false){
                        setting.check = {
                            enable:true,
                            radioType: "all",
                            chkStyle:"radio"
                        }
                    }

                    if(set){
                        setting = $.extend(true, {}, setting, set);
                    };

                    // 插入树结构
                    combo.showTarget.append("<div class='g-h-max'><ul id='"+treeId+"' class='ztree'></ul></div>");
                    var tree = "";
                    // 判断是否加载ztree结构json
                    if(nodes){
                        $.fn.zTree.init($("#" + treeId), setting, nodes);
                        tree = $("#" + treeId);
                        setChecked(treeId, checked);
                        setCurrentShow(combo.showTarget);
                    }else if(op && op.url){
                        andy.loaddata(op.url, function(data){
                            data = andy.stringToJson(data);
                            // console.log(combo.showTarget)
                            $.fn.zTree.init($("#" + treeId), setting, data);
                            tree = $("#" + treeId);
                            setChecked(treeId, checked);
                            setCurrentShow(combo.showTarget);
                        })
                    };
                }

                // showTarget
                var initShow = function(data){
                    if(_options.showTargetType == "list"){
                        var lis = _options.combo.an_inputcombo_getList(_options, data);
                        showTarget.append(lis);

                        creatListShow();
                    }else if(_options.showTargetType == "tree"){
                        if(_options.treeId == ""){
                            _options.treeId = "treeId_"+andy.getRandom(10000);
                        };
                        createTree(_options.treeId, _options.treeSetting, data, _options);
                    }
                    
                }

                if(_options.showUrl == null || _options.showUrl == "" && _options.showData.length == 0){
                    if(_options.showTargetType == "list"){
                        creatListShow();
                    };
                    return false;
                }else if(_options.showData.length > 0){
                    if(typeof(_options.showData) == "string"){
                        _options.showData = andy.stringToJson(_options.showData);
                    }
                    initShow(_options.showData);
                }else if(_options.showUrl != ""){
                    andy.loaddata(_options.showUrl, function(data){
                        data = andy.stringToJson(data)
                        if(data.length > 0){
                            initShow(data);
                        }
                    })
                }else{
                    if(_options.showTargetType == "list"){
                        creatListShow();
                    }
                }

                _options.combo.bind("EVENT_CHOOSE", function(e, choose){
                    showTarget.children().each(function(index, li){
                        // 初始化\
                        var $li = $(li);
                        for(var i = 0; i < choose.choose.length; i++){
                            if(parseInt($li.attr("listId")) == choose.choose[i]){
                                if(!_options.selects){
                                    showTarget.children().each(function(index, li){
                                        $(li).removeClass("active");
                                    })
                                }
                                $li.addClass("active");
                                var liData = getLiData($li);
                                addTouch(liData)
                            }
                        }
                       
                    })
                })
            }
        }
    });
})(jQuery);