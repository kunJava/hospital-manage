/*datagrid */
/**
 * 数据列表模块
 * author:林耘宇
 **/
(function ($) {
    $.fn.extend({
        an_datagrid:function(){
            var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;

            var tl = $.extend({
                table:'',//表格id
                bodyUrl:'',//创建body部分列表json
                urlParams:{},//链接参数配置
                ajaxType:'get',//请求url方式 get post
                lockTable:{
                    lockRow:0,//固定行数
                    lockColumn:0//固定列数
                },
                width:"100%",//表格显示宽度（实质是外出div宽度）
                height:"100%",//表格显示高度（实质是外出div高度）
                checkEnable:true,//check 是否可用 设置flase以便外部使用
                checkbox:"",//field字段属性
                radio:"",//field字段属性
                addColumns:"",
                coverColumns:"",
                setRowHtml:"",//生成row回调 方法，回调外部获取html td片段,传出参数tr的id 和 json
                setTrId:"",//设置tr id字段
                sortList:"",//排序设置 filed字段 icon样式 sort默认排序 升序"ascending" 降序"descending"
                onSortClick:function(){},//排序点击 排序filed字段 当前升降序ascending升序 descending降序
                onLoadComplete:function(){},
                onClickRow:function(){},//单击行事件
                onDblClickRow:function(){},//双击行事件
                onClickCell:function(){},//点击单元
                onDblClickCell:function(){}//双击单元
            }, options);

            var tableId=tl.table;
            var table = $(this);
            if(tl.table == ""){
                table = andy.setRandomId(table, "datagrid_");
                tl.table = table.attr("id");
                tableId = tl.table;
            }
            var ptable = table.parent();
            var tpheight = ptable.height();//父级高度
            var tpwidth = ptable.width();//父级宽度

            // 获取 设置对象
            var getOption = table.attr("options");
            var getValueElement = "";
            if(getOption){
                 getOption = "{"+ getOption+"}";
                 getOption = andy.stringToJson(getOption);
                // 处理设置
                for(var name in getOption){
                    if(getOption[name] == "true"){
                        tl[name] = true;
                    }else if(getOption[name] == "false"){
                        tl[name] = false;
                    }else{
                        tl[name] = getOption[name];
                    }
                }
            }
            tl.table = table;

            // 私有事件
            var lock = "EVENT_LOCK";
            var getHeadJson = "EVENT_GET_JSON";
            var getAllRowData = "EVENT_GET_ROW_DATA";
            var addRow = "EVENT_ADD_ROW";//新增行
            var getRow = "EVENT_GET_ROW";//获取行 数据
            var setRow = "EVENT_SET_ROW";//设置行数据
            var tableView = "EVENT_TABLE_VIEW";//显示隐藏列
            var addColumns = "EVENT_ADD_COLS";//增加 属性列 内容
            var coverColumns = "EVENT_COVER_COLS";//覆盖 属性列 内容
            var getChecked = "EVENT_GET_CHECKED";//获取选中数据
            var isAutoLockHead = false;//是否自动锁定head

            if(tl.height != "100%" || tl.height > 0){
                tpheight = tl.height;
            }else if(tl.height == "100%"){
                // tpheight = tl.height;
            };
            if(tl.width != "100%" || tl.width > 0){
                tpwidth = tl.width;
            }else if(tl.width == "100%"){
                // tpheight = tl.width;
            };

            if(funstyle != ""){
                if(funstyle == "locakTable"){
                    var thislock = {
                        lockRow:0,//固定行数
                        lockColumn:0//固定列数
                    };
                    var locktable = arguments[1];
                    thislock = $.extend(thislock, locktable);
                    table.trigger(lock, thislock);
                }else if(funstyle == "tableView"){
                    var node = arguments[1];
                    table.trigger(tableView, node);
                }else if(funstyle == "getHeadJson"){
                    // 获取头部JSON结构
                    var data = [];
                    var table = arguments[1];
                    var setJsonIndex = function(data){
                        var index = 0;
                        var p_index = 0;
                        var onData = function(data){
                            for(var i = 0; i <data.length; i++){
                                var dd = data[i];
                                if(dd.children.length > 0){
                                    dd.jsonParentIndex = p_index;
                                    onData(dd.children);
                                    p_index +=1;
                                }else{
                                    dd.jsonIndex = index;
                                    index += 1;
                                }
                            }
                        }
                        onData(data, index);
                    }
                    var getIsOpen = function(th){
                        var isOpen = "open";
                        if(th.hasClass("f-hidden")){
                            isOpen = "close";
                        }
                        return isOpen;
                    }
                    var getData = function(index, thIndex){
                        var ce = index-1;
                        var current = 0;
                        var thIndex = thIndex;
                        var newData = "";
                        var onData = function(data){
                            var cc = 0;//当前应有长度
                            var sc = 0;//初始长度
                            for(var i = 0; i < data.length; i ++){
                                var dd = data[i];
                                if(ce == current){
                                    if(dd.rowspan){
                                    }else{
                                        if(dd.maxColspan){
                                            cc += parseInt(dd.maxColspan);
                                        }else{
                                            cc += 1;
                                        }
                                        for(var j = sc ; j < cc; j ++){
                                            if(thIndex == j){
                                                newData = dd;
                                                break;
                                            }
                                        }
                                        sc += 1;
                                    }
                                }else{
                                    if(dd.children.length > 0){
                                        current = parseInt(dd.layer);
                                        onData(dd.children);
                                    }
                                }
                                if(newData != ""){
                                    // 如果有赋值 则退出循环
                                    break;
                                }

                            }
                        }
                        onData(data);
                        return newData;
                    }
                    table.find("thead tr").each(function(index, tr){
                        $(tr).find("th").each(function(i, th){
                            var $th = $(th);
                            var ob = {'id':index+"_"+i, 'name':$th.html(), 'view':getIsOpen($th), 'th_index':i, 'layer':index, 'colspan':$th.attr('colspan'), 'maxColspan':$th.attr('maxColspan'), 'rowspan':$th.attr('rowspan'), children:[]};
                            if(index == 0){
                                data.push(ob);
                            }else{
                                var cdata = getData(index, i);//层级 和th索引
                                if(cdata != ""){
                                    cdata.children.push(ob);
                                }
                            }
                        })
                    })
                    // 设置所有JSON索引 除开父节点
                    setJsonIndex(data);
                    return data;
                }else if(funstyle == "addColumns"){
                    var obj = {};
                    obj = {
                        data:arguments[1]
                    }
                    table.trigger(addColumns, obj);
                }else if(funstyle == "coverColumns"){
                    var obj = {};
                    obj = {
                        data:arguments[1]
                    }
                    table.trigger(coverColumns, obj);
                }else if(funstyle == "getChecked"){
                    var fun = arguments[1];
                    table.trigger(getChecked, fun)
                }else if(funstyle == "addRow"){
                    // 新增行 行数据
                    var data = arguments[1];
                    var fun = arguments[2];
                    var op = {
                        data:data,
                        callback:fun
                    }
                    table.trigger(addRow, op)
                }else if(funstyle == "getRow"){
                    var id = arguments[1];
                    var fun = arguments[2];
                    var op = {
                        id:id,
                        callback:fun
                    }
                    table.trigger(getRow, op)
                }else if(funstyle == "getAllRowData"){
                    var fun = arguments[1];
                    table.trigger(getAllRowData, fun)
                }else if(funstyle == "setRow"){
                    // id json  全设置
                    // id 属性字段 value  单个字段设置
                    var id = arguments[1];
                    var data = arguments[2];
                    var value = arguments[3];
                    var op = {
                        id:id,
                        data:data,
                        value:value
                    }
                    table.trigger(setRow, op)
                };
            }else{
                var box = $("<div style = 'position:relative;clear:both;'></div>");
                if(tpwidth != "100%"){
                    if(tl.lockTable.lockRow == 0){
                        box = $("<div style = 'position:relative;clear:both;overflow-x:auto;height:100%;'></div>");
                    }else{
                        box = $("<div style = 'position:relative;clear:both;overflow-x:auto;overflow-y:hidden;height:100%;'></div>");
                    }

                }
                table.wrap(box);

                // 绑定options
                table.data("options", tl)

                var init = function(){
                    // 显示隐藏列
                    table.bind(tableView, function(e, node){
                        var table = $("#" + tableId);
                        table.an_tableSetView(table, node);
                        var pheight = table.parent().parent().parent().height();
                        var pwidth = table.parent().parent().parent().width();
                        table.an_tableLayout(table, pwidth, pheight);
                    })

                    // 锁定行列
                    tl.table.bind(lock, function(e, locktable){
                        var table = $("#" + tableId);
                        table.an_tableLock({
                            table:tableId,//table的id
                            lockRow:locktable.lockRow,//固定行数
                            lockColumn:locktable.lockColumn,//固定列数
                            width:tpwidth,//表格显示宽度（实质是外出div宽度）
                            height:tpheight//表格显示高度（实质是外出div高度）
                        });
                        if(locktable.lockRow > 0){
                            table.parent().parent().css("overflow-y","hidden")
                        }
                        var pheight = table.parent().parent().parent().height();
                        var pwidth = table.parent().parent().parent().width();
                        table.an_tableLayout(table, pwidth, pheight);

                    });

                    //增加colums
                    tl.table.bind(addColumns, function(e, obj){
                        // console.log("aaa")
                        table.an_addColumns({
                            table:tableId,//table的id
                            columns:obj.data
                        })

                    })
                    if(tl.addColumns != ""){
                        table.an_addColumns({
                            table:tableId,//table的id
                            columns:tl.addColumns
                        })
                    }

                    tl.table.bind(coverColumns, function(e, obj){
                        if(typeof obj == "string"){
                            obj = andy.stringToJson(obj);
                        }
                        table.an_coverColumns({
                            table:tableId,//table的id
                            columns:obj.data
                        })
                    })

                    // 覆盖colums
                    if(tl.coverColumns != ""){
                        table.an_coverColumns({
                            table:tableId,
                            columns:tl.coverColumns
                        })
                    }

                    // 增加行
                    table.bind(addRow, function(e, op){
                        var options = table.data("options")
                        table.an_addRow(options, op)
                    })

                    // 获取行数据 通过id
                    table.bind(getRow, function(e, op){
                        table.an_getRow(op)
                    })

                    // 获取所有row数据
                    table.bind(getAllRowData, function(e, fun){
                        table.an_getAllRowData(fun)
                    })

                    // 获取值
                    table.bind(getChecked, function(e, fun){
                        var op = $.extend(true,{}, tl, {
                            callback:fun
                        })
                        if(op.checkbox != "" || op.radio != ""){
                            table.an_getChecked(op)
                        }
                    })

                    // 设置
                    table.bind(setRow, function(e, op){
                        table.an_setRow(op)
                    })

                    // //锁定行列
                    var lr = tl.lockTable.lockRow;
                    var lc = tl.lockTable.lockColumn;
                    if(isAutoLockHead && table.find('thead').children().length > 0){
                        lr = table.find('thead').children().length;
                        tl.lockTable.lockRow = lr;
                    }

                    if(lr >= 1 || lc >= 1){
                        table.an_tableLock({
                            table:tableId,//table的id
                            lockRow:lr,//固定行数
                            lockColumn:lc,//固定列数
                            width:tpwidth,//表格显示宽度（实质是外出div宽度）
                            height:tpheight//表格显示高度（实质是外出div高度）
                        });
                    };

                    if(tl.sortList != ""){
                        table.an_creatSortBtn()
                    }

                    var pheight = table.parent().parent().parent().height();
                    var pwidth = table.parent().parent().parent().width();
                    table.an_tableLayout(table, pwidth, pheight);

                    table.on("click", function(e){
                        var cell = $(e.target);
                        var row = cell.parent();
                        tl.onClickRow(row.index(), row)
                        tl.onClickCell(cell.index(), cell)
                    })

                    table.on("dblclick", function(e){
                        var cell = $(e.target);
                        var row = cell.parent();
                        tl.onDblClickRow(row.index(), row)
                        tl.onDblClickCell(cell.index(), cell)
                    })
                }

                if(tl.bodyUrl != ""){
                    table.an_creatDataList(tl, function(){
                        init();
                    });
                }else{
                    init()
                }
            };
        },
        an_addColumns:function(_options){
            // 添加列内容
            var table = $(this);
            var tableBody = table.find('tbody');
            var tableHeader = table.find('thead');
            if(_options.columns && _options.columns.length > 0){
                for(var i in _options.columns){
                    var columns = _options.columns[i];
                    var field = columns.field;
                    var formatter = columns.formatter;

                    tableHeader.find("[field]").each(function(index, th){
                        if($(th).attr("field") == field){
                            tableBody.find("tr").each(function(tr_index, tr){
                                $(tr).find("td").each(function(td_index, td){
                                    if(td_index == index){
                                        $(td).append(formatter);
                                    }
                                })
                            })
                        }
                    })
                }
            }
        },
        an_coverColumns:function(_options){
            // 覆盖列内容
            var table = $(this);
            var tableBody = table.find('tbody');
            var tableHeader = table.find('thead');
            if(_options.columns && _options.columns.length > 0){
                for(var i in _options.columns){
                    var columns = _options.columns[i];
                    var field = columns.field;
                    var formatter = columns.formatter;

                    tableHeader.find("[field]").each(function(index, th){
                        if($(th).attr("field") == field){
                            tableBody.find("tr").each(function(tr_index, tr){
                                $(tr).find("td").each(function(td_index, td){
                                    if(td_index == index){
                                        $(td).empty()
                                        $(td).append(formatter);
                                    }
                                })
                            })
                        }
                    })
                }
            }
        },
        an_getChecked:function(_options){
            var table = $(this);
            var tableBody = table.find('tbody');
            var tableHeader = table.find('thead');
            var field = "";
            var value = "";
            var data = [];
            if(_options.checkbox != ""){
                field = _options.checkbox;
            }else if(_options.radio != ""){
                field = _options.radio;
            }
            tableHeader.find("[field]").each(function(index, th){
                if($(th).attr("field") == field){
                    tableBody.find("tr").each(function(tr_index, tr){
                        if($(tr).hasClass("current")){
                            data.push($(tr).data("tr_data"));
                            $(tr).find("td").each(function(td_index, td){
                                if(td_index == index){
                                    if(value == ""){
                                        value += $(td).text()
                                    }else{
                                        value += ","+$(td).text()
                                    }
                                }
                            })
                        }

                    })
                }
            })

            _options.callback(value, data)
        },
        an_addRow:function(_options, op){
            var table = $(this);
            var tableBody = table.find('tbody');
            var tableHeader = table.find('thead');

            var idstr = _options.setTrId;
            if(idstr == ''){
                idstr = table.attr("id");
            }
            var lastId = tableBody.find("tr").last().attr("id");
            // var lastIndex = parseInt(lastId.charAt(lastId.length - 1))+1;
            var timestamp=new Date().getTime()
            var thisid = idstr+timestamp;
            // var thisid = idstr+lastIndex;
            var str = "<tr id='"+thisid+"'>";
            var contendStr = "";
            var tdData = op.data;
            var childrenData = "";

            if(_options.setRowHtml != ''){
                contendStr = _options.setRowHtml(thisid, tdData)
                str += contendStr.html;
                str += "</tr>";
                tableBody.append(str);
                $("#"+thisid).data("tr_data", tdData)
                if(contendStr.callback){
                    contendStr.callback(thisid, tdData, contendStr.html)
                }
                andy.perform($("#"+thisid))

            }
            if(op.callback){
                op.callback(tdData, thisid, contendStr.html)
            }
        },
        an_getRow:function(op){
            var table = $(this);
            var tableBody = table.find('tbody');
            var tableHeader = table.find('thead');
            if(op.callback){
                op.callback($("#"+op.id).data("tr_data"));
            }
        },
        an_getAllRowData:function(fun){
            var table = $(this);
            var tableBody = table.find('tbody');
            var tableHeader = table.find('thead');
            var allData = [];
            tableBody.find("tr").each(function(index, tr){
                allData.push($(tr).data("tr_data"))
            })
            if(fun){
                fun(allData)
            }
        },
        an_setRow:function(op){
            var table = $(this);
            var tableBody = table.find('tbody');
            var tableHeader = table.find('thead');
            var trId = op.id;
            var tr = tableBody.find("#"+trId);
            if(typeof op.data == "string"){
                var trData = tr.data("tr_data");
                trData[op.data] = op.value;
                tr.data("tr_data", trData);
            }else if(typeof op.data == "object"){
                tr.data("tr_data", op.data);
            };
        },
        an_creatDataList:function(_options, callBack){
            // 通过json 创建列表
            var table = $(this);
            var tableId = table.attr("id");
            var url = _options.bodyUrl;
            var ajaxType = _options.ajaxType;

            var isHaveChildren = function(data){
                var isHave = false;
                for(var j in data){
                    if(j == "children"){
                        isHave = data[j];
                    }
                }
                return isHave;
            }

            var insertTableBody = function(data){
                // return false;
                var tableBody = table.find('tbody');
                var tableHeader = table.find('thead');

                var bodyData = data.rows;
                var bodyAlign = data.rows_align || false;
                var bodyClass = data.rows_class;
                var headFieldArr = [];
                var bodyTdArr = [];

                var getHiddenByHeader = function(fieldName){
                    var hiddenClass = "";
                    tableHeader.find("th").each(function(index, th){
                        if($(th).attr("field") == fieldName && $(th).hasClass("f-hidden")){
                            hiddenClass = " f-hidden";
                        }
                    })
                    return hiddenClass;
                }

                var connectStr = function(){
                    var str = "";
                    if(headFieldArr.length>0){
                        for(var i = 0; i < headFieldArr.length; i++){
                            for(var name in bodyTdArr){
                                if(name == headFieldArr[i]){
                                    str += bodyTdArr[name];
                                }
                            }
                            if(headFieldArr[i] == "checkbox"){
                                str += "<td><input type='checkbox'></td>";
                            }else if(headFieldArr[i] == "radio"){
                                str += "<td><input type='radio' name = 'radio_"+table.attr("id")+"'></td>";
                            }
                        }
                    }else{
                        for(var name in bodyTdArr){
                            str += bodyTdArr[name];
                        }
                    }

                    return str;
                }


                tableHeader.find("[field]").each(function(index, th){
                    var $th = $(th);
                    headFieldArr[index] = $th.attr("field");
                })


                var cccStr = "";
                var createChildren2 = function(data, index){
                    for(var i = 0; i < data.length; i++){
                        var cstr = "<tr style = 'display:none;'>";
                        var conStr = "";
                        var tdData = data[i];
                        for(var j in tdData){
                            var ali = "";
                            var node = "";
                            if(bodyAlign && bodyAlign[0][j]){
                                // 设置td样式
                                ali = bodyAlign[0][j];
                            }
                            if(bodyClass && bodyClass[0][j] == "tree"){
                                var url = isHaveChildren(tdData);
                                if(typeof url === "string"){
                                    node = "group n"+(index+1);
                                    childrenUrl = "childrenUrl = "+ url;
                                }else if(typeof url === "object"){
                                    node = "group n"+(index+1);
                                    // console.log(url)
                                    createChildren2(url, index +1)
                                }else{
                                    node = "node n"+(index+1);
                                }
                            }
                            // 关于表头隐藏问题
                            var hiddenClass = getHiddenByHeader(j);
                            if(hiddenClass != ""){
                                node += hiddenClass;
                            }
                            if(j != "children"){
                                // contendStr += "<td align = '"+ali+"' class = '"+node+"' "+childrenUrl+">"+tdData[j]+"</td>";
                                bodyTdArr[j] = "<td align = '"+ali+"' class = '"+node+"' "+childrenUrl+">"+tdData[j]+"</td>";
                            }
                        }
                        conStr = connectStr();
                        cstr += conStr;
                        cstr += "</tr>";
                        cccStr += cstr;
                        cstr = "";
                        bodyTdArr = [];
                    }

                }

                var ccStr = "";

                var createChildren = function(data, index){
                    for(var i = 0; i < data.length; i++){
                        var cstr = "<tr style = 'display:none;'>";
                        var conStr = "";
                        var tdData = data[i];
                        for(var j in tdData){
                            var ali = "";
                            var node = "";
                            if(bodyAlign && bodyAlign[0][j]){
                                // 设置td样式
                                ali = bodyAlign[0][j];
                            }
                            if(bodyClass && bodyClass[0][j] == "tree"){
                                var url = isHaveChildren(tdData);
                                if(typeof url === "string"){
                                    node = "group n"+(index+1);
                                    childrenUrl = "childrenUrl = "+ url;
                                }else if(typeof url === "object"){
                                    node = "group n"+(index+1);
                                    // console.log(url)
                                    createChildren2(url, index +1)
                                }else{
                                    node = "node n"+(index+1);
                                }
                            }
                            // 关于表头隐藏问题
                            var hiddenClass = getHiddenByHeader(j);
                            if(hiddenClass != ""){
                                node += hiddenClass;
                            }
                            if(j != "children"){
                                // contendStr += "<td align = '"+ali+"' class = '"+node+"' "+childrenUrl+">"+tdData[j]+"</td>";
                                bodyTdArr[j] = "<td align = '"+ali+"' class = '"+node+"' "+childrenUrl+">"+tdData[j]+"</td>";
                            }
                        }
                        conStr = connectStr();
                        cstr += conStr;
                        cstr += "</tr>";
                        ccStr += cstr;
                        ccStr +=cccStr;
                        cstr = "";
                        cccStr = "";
                        bodyTdArr = [];
                    }

                }

                var idstr = _options.setTrId;
                if(idstr == ''){
                    idstr = tableId;
                }
                for(var i = 0; i < bodyData.length; i++){
                    var timestamp=new Date()
                    var thisid = idstr+Date.parse(timestamp)+i;
                    var str = "<tr id='"+thisid+"'>";
                    var contendStr = "";
                    var tdData = bodyData[i];
                    var tdCallBack = "";
                    var childrenData = "";

                    if(_options.setRowHtml != ''){
                        var op = _options.setRowHtml(thisid, tdData)
                        contendStr = op.html;
                        tdCallBack = op.callback || function(){};
                    }else{
                        for(var j in tdData){
                            var ali = "";
                            var node = "";
                            var childrenUrl = "";

                            if(bodyAlign && bodyAlign[0][j]){
                                // 设置td样式
                                ali = bodyAlign[0][j];
                            }
                            if(bodyClass && bodyClass[0][j] == "tree"){
                                var url = isHaveChildren(tdData);
                                if(typeof url === "string"){
                                    node = "group n1";
                                    childrenUrl = "childrenUrl = "+ url;
                                }else if(typeof url === "object"){
                                    node = "group n1";
                                    createChildren(url, 1)
                                }else{
                                    node = "node n1";
                                }
                            }else if(bodyClass){
                                node = bodyClass[0][j];
                            }
                            // 关于表头隐藏问题
                            var hiddenClass = getHiddenByHeader(j);
                            if(hiddenClass != ""){
                                node += hiddenClass;
                            }
                            if(j != "children"){
                                // contendStr += "<td align = '"+ali+"' class = '"+node+"' "+childrenUrl+">"+tdData[j]+"</td>";
                                bodyTdArr[j] = "<td align = '"+ali+"' class = '"+node+"' "+childrenUrl+">"+tdData[j]+"</td>";
                            }
                            // if()
                        }
                        contendStr = connectStr();
                    }

                    str += contendStr;
                    str += "</tr>";
                    str += ccStr;
                    ccStr = "";
                    bodyTdArr = [];
                    tableBody.append(str);
                    $("#"+thisid).data("tr_data", tdData);
                    if(tdCallBack != ""){
                        tdCallBack(thisid, tdData, contendStr);
                    }
                    if(tdData.checked && tdData.checked == true){
                        $("#"+thisid).addClass("current")
                        var input = $("#"+thisid).find('input');
                        if(input.attr('type') == "checkbox" || input.attr('type') == "radio"){
                            input.prop("checked", true);
                        }
                    }

                    contendStr = "";
                }
                if(_options.setRowHtml != ""){
                    andy.perform(table)
                }

            }

            // 执行
            if(typeof url == "string"){
                if(ajaxType == "get"){
                    andy.loaddata(url, _options.urlParams, function(data){
                        if(typeof data == "string"){
                            data = andy.stringToJson(data)
                        }
                        insertTableBody(data);
                        _options.onLoadComplete(data);
                        callBack();
                    })
                }else if(ajaxType == "post"){
                    andy.postdata(url, _options.urlParams, function(data){
                        if(typeof data == "string"){
                            data = andy.stringToJson(data)
                        }
                        insertTableBody(data);
                        _options.onLoadComplete(data);
                        callBack();
                    })
                }

            }else if(typeof url == "object"){
                // 如果是数据
                insertTableBody(url);
                callBack();
            }
        },
        an_tableInsertList:function(target, data){
            var ptr = target.parent();

            var isHaveChildren = function(data){
                var isHave = "";
                for(var j in data){
                    if(j == "children"){
                        isHave = data[j];
                    }
                }
                return isHave;
            }
            for(var i = 0; i < data.length; i++){
                var str = "<tr>";
                var tdData = data[i];
                var index = 0;
                for(var j in tdData){
                    var ali = "";
                    var node = "";
                    var childrenUrl = "";
                    var url = "";
                    ptr.children().each(function(i, t){
                        var ctd = $(t);
                        if(index == i){
                            ali = ctd.attr("align");
                            if(ctd.hasClass("group") || ctd.hasClass("node")){
                                node = "node n2";
                            }
                        }
                    })
                    // if(bodyAlign[j]){
                    //     // 设置td样式
                    //     ali = bodyAlign[j];
                    // }
                    // if(bodyClass && bodyClass[0][j] == "tree"){
                    //     url = isHaveChildren(tdData);
                    //     if(url != ""){
                    //         node = "group n1";
                    //         childrenUrl = url;
                    //     }else{
                    //         node = "node n1";
                    //     }
                    // }
                    if(j != "children"){
                        str += "<td align = '"+ali+"' class = '"+node+"' childrenUrl = '"+url+"'>"+tdData[j]+"</td>";
                    }
                    index += 1;

                }
                str += "</tr>";
                ptr.after(str);
            }
        },
        an_tableLayout:function(element, pw, ph){
            var scrollWidth = 17;
            var tableId = element[0].id;
            var table = element;
            var boxid = 'divBoxing-' + tableId;
            var bodyid = 'divBoxingbody-' + tableId;
            var headid = 'divBoxinghead-' + tableId;
            var fixedid = 'divBoxingfixed-'+tableId;

            var divBox = $("#" + boxid);//table活动体对象
            var divBoxhead = $("#" + headid);//锁定行对象
            var divBoxbody = $("#" + bodyid);//锁定列对象
            var divBoxfixed = $("#" + fixedid);//锁定头部交叉对象
            var th = $("#"+tableId+"_h");
            var tw = $("#"+tableId+"_w");

            var lheight = ph;
            var lwidth = pw;
            if(table.height() <= ph){
                // 没有滚动条的时候不计算滚动条宽度
                scrollWidth = 0;
            };
            // 锁定行列渲染
            divBox.parent().width(lwidth).height(lheight);
            divBox.width(lwidth).height(lheight);
            divBoxhead.width(divBox.width() - scrollWidth);
            th.height(table.height());
            divBoxbody.height(divBox.height() - scrollWidth);
            tw.width(table.width());

            // ----------------------------------------------选中行列操作

            // 选中行 动作
            var setStatus = function(element, status){
                if(element.parent().is("td")){
                    element.prop("checked", status);
                    var tr = element.parents("tr");
                    if(status){
                        tr.addClass("current");
                        var tr_data = tr.data("tr_data");
                        tr_data?tr_data.checked = true:tr_data ={};tr_data.checked=true;
                        tr.data("tr_data", tr_data)
                    }else{
                        tr.removeClass("current");
                        var tr_data = tr.data("tr_data");
                        tr_data?tr_data.checked = false:tr_data ={};tr_data.checked=false;
                        tr.data("tr_data", tr_data)
                    }

                };
            };
            var setCheck = function(index, element, status){
                element.find("input").each(function(i, input1){
                    var cell = $(input1);
                    // 非数字类型为全选 或者 是单选
                    if(typeof(index) != "number" || index == i){
                        if(cell.prop("checked") != status){
                            setStatus(cell, status);
                        };
                    };

                 });
            };
            // 设置所有
            var setItemAll = function(status){
                if(divBox[0]){
                    setCheck("", divBox.find("table"), status);
                }else{
                    setCheck("", table, status);
                };
                setCheck("", divBoxhead.find("table"), status);
                setCheck("", divBoxbody.find("table"), status);
                setCheck("", divBoxfixed.find("table"), status);
            };
            // 设置单个
            var setItem = function(index, status){
                if(divBox[0]){
                    setCheck(index, divBox.find("table"), status);
                }else{
                    setCheck(index, table, status);
                };
                setCheck(index, divBoxhead.find("table"), status);
                setCheck(index, divBoxbody.find("table"), status);
                setCheck(index, divBoxfixed.find("table"), status);
            };


            // ---------------------------------------------------树点击管理
            var getClassName = function(tr, name){
                var c = tr.children("."+name);
                var classname = c.attr("class");
                return classname
            };
            // 获取自己的层级
            var getGroupIndex = function(tr, classname){
                var name = getClassName(tr, classname);
                var namestr = name.split(" ");
                var nop = namestr[1].substr(0, 1);
                var non = parseInt(namestr[1].substr(1, namestr.length));
                return non;
            }
            // 获取自己的文件夹
            var getGroup = function(tr){
                var name = getClassName(tr, "node");
                var namestr = name.split(" ");
                var nop = namestr[1].substr(0, 1);

                var non = parseInt(namestr[1].substr(1, namestr.length));
                if(non >= 1){
                    non -= 1;
                };
                var preFirstGroup = tr.prevAll(".group"+nop+ non).first();
                if(non == 0){
                    preFirstGroup = null;
                }
                return preFirstGroup;
            }
            // 遍历对象 点击对象class 点击对象 是否开启
            var setNodeStatus = function(tr, fclass, clickt,  isOpen){
                // 设置节点显示状态
                var tclass = tr.attr("class");
                if(tclass && tclass.substr(0, tclass.length - 1) == fclass.substr(0, fclass.length - 1) && tclass.substr(tclass.length - 1, tclass.length) > fclass.substr(fclass.length - 1, fclass.length)){
                    // 操作文件夹
                    if(isOpen){
                        $(tr).css("display", "");
                    }else{
                        $(tr).css("display", "none");
                    }
                }else if(!tclass){
                    // 操作节点
                    if(isOpen){
                        var preFirstGroup = getGroup(tr);
                        // 如果它的父级文件夹开着 那么它就显示
                        if(preFirstGroup && preFirstGroup.children("td").hasClass("open")){
                            $(tr).css("display", "");
                        };
                    }else{
                        var preFirstGroup = getGroup(tr);
                        var clickIndex = getGroupIndex(clickt, "group");
                        var current = getGroupIndex(tr, "node");
                        if(preFirstGroup && preFirstGroup.children("td").hasClass("open") == false || current > clickIndex){
                            $(tr).css("display", "none");
                        };
                    };
                };
            };

            // 事件绑定
            var bindEvent = function(element){
                // 勾选事件绑定
                element.find("input").each(function(index, input){
                    var cell = $(input);
                    if(cell.parent().is("th") || cell.parent().is("td")){
                        if(table.data("options").checkEnable == false){
                            return false;
                        }
                        cell.unbind("click");
                        cell.click(function(e){
                            // 多选操作
                            if(cell.prop("checked") && cell.attr("type") == "checkbox"){
                                cell.parents("tr").addClass("current");
                                var tr = cell.parents("tr");
                                if(!tr.data("tr_data")){
                                    tr.data("tr_data", {
                                        checked:true
                                    })
                                }
                                var tr_data = tr.data("tr_data");
                                tr_data.checked = true;
                                setItem(index, true);
                                // 操作勾选动作
                                if(cell.parent().is("th") && cell.attr("type") == "checkbox"){
                                    // setCheck(element, true);
                                    setItemAll(true);
                                };
                            }else if(cell.attr("type") == "checkbox"){
                                cell.parents("tr").removeClass("current");
                                setItem(index, false);
                                var tr = cell.parents("tr");
                                var tr_data = tr.data("tr_data");
                                tr_data["checked"] = false;
                                // 操作取消动作
                                if(cell.parent().is("th") && cell.attr("type") == "checkbox"){
                                    setItemAll(false); 
                                };
                            }
                            // 单选操作
                            if(cell.prop("checked") && cell.attr("type") == "radio"){
                                cell.parents("tr").siblings().removeClass("current")
                                cell.parents("tr").addClass("current");
                            }

                        })
                    };

                });
                // 普通选中行 这个和多选有逻辑冲突 先屏蔽 这个选中行应该是唯一选中状态
                // element.find("table thead,tbody td:not('.group')").each(function(index, td){
                //     var cell = $(td);
                //     cell.unbind("click");
                //     cell.click(function(e){
                //         cell.parents("tr").toggleClass("current");
                //     });
                // });
                // 树表选择
                element.find(".group").each(function(index, group){
                    var cell = $(group);
                    var pcell = cell.parent();
                    var cclass = cell.attr("class");
                    var cname = cclass.split(" ");
                    cclass = cname[0] + cname[1];
                    pcell.addClass(cclass);
                    cell.unbind("click");
                    cell.click(function(e){
                        var g = $(e.target);
                        if(g.find("span").hasClass("quarters-loader")){
                            return false;
                        }
                        var tr = g.parent();
                        // 取 以上cclass赋值
                        var fclass = tr.attr("class").split(" ")[0];
                        var span = "<span class='quarters-loader' style = 'width:18px;height:18px;margin-left:8px'></span>";
                        // <span class="quarters-loader" style = "width:18px;height:18px;margin-left:8px"></span>
                        var isOpen = false;//执行动作
                        if(g.hasClass("open")){
                            isOpen = false;
                            g.removeClass("open");
                        }else{
                            isOpen = true;
                            g.addClass("open");
                        };

                        if(g.attr("childrenUrl")){
                            g.append(span);
                            andy.loaddata(g.attr("childrenUrl"), function(data){
                                g.find("span").remove(".quarters-loader");
                                table.an_tableInsertList(g, data)
                                g.attr("childrenUrl", "");
                                element.an_tableLayout(element, pw, ph);
                                // an_tableLayout:function(element, pw, ph)
                            })
                        }else{
                            tr.nextUntil("."+fclass).each(function(i, c){
                                setNodeStatus($(c), fclass, tr, isOpen);
                            });
                            // 锁定锁定行列状态
                            var headtr = divBoxhead.find("tbody tr").eq(tr.index());
                            headtr.nextUntil("."+fclass).each(function(i, c){
                                setNodeStatus($(c), fclass, headtr, isOpen);
                            });
                            var bodytr = divBoxbody.find("tbody tr").eq(tr.index());
                            bodytr.nextUntil("."+fclass).each(function(i, c){
                                setNodeStatus($(c), fclass, bodytr, isOpen);
                            });
                            var fixedtr = divBoxfixed.find("tbody tr").eq(tr.index());
                            fixedtr.nextUntil("."+fclass).each(function(i, c){
                                setNodeStatus($(c), fclass, fixedtr, isOpen);
                            });
                            // 重新渲染锁定行列
                            var pheight = table.parent().parent().parent().height();
                            var pwidth = table.parent().parent().parent().width();
                            table.an_tableLayout(table, pwidth, pheight);
                        }

                    });

                });
            };


            if(divBox[0]){
                bindEvent(divBox.find("table"));
            }else{
                bindEvent(table);
            };
            bindEvent(divBoxhead.find("table"));
            bindEvent(divBoxbody.find("table"));
            bindEvent(divBoxfixed.find("table"));
        },
        an_tableLock: function(options) {
            var tl = $.extend({
                table:'lockTable',//table的id
                lockRow:0,//固定行数
                lockColumn:0,//固定列数
                width:'100%',//表格显示宽度（实质是外出div宽度）
                height:'100%',//表格显示高度（实质是外出div高度）
                lockRowCss:'lockRowBg',//锁定行的样式
                lockColumnCss:'lockColumnBg'//锁定列的样式
            }, options);

            var tableId=tl.table;
            var table=$('#'+tableId);
            var an_datagrid = "an-datagrid";//渲染字段
            var boxid = 'divBoxing-' + tableId;
            var bodyid = 'divBoxingbody-' + tableId;
            var headid = 'divBoxinghead-' + tableId;
            var fixedid = 'divBoxingfixed-'+tableId;
            var topindex = 50;
            var bottomindex = 1;
            var fiexdindex = 100;

            // if(table){

            // jQuery.fx.interval = 10000;
            var box=$("<div id='"+boxid+"'></div>").scroll(function(e){//在此处添加事件
                if(e.target.scrollTop > 0){
                    divBoxbody.css({"z-index":bottomindex});
                    divBoxhead.css({"z-index":topindex});
                }
                if(e.target.scrollLeft > 0){
                    divBoxbody.css({"z-index":topindex});
                    divBoxhead.css({"z-index":bottomindex});
                }
                divBoxbody.stop().animate({"scrollTop":e.target.scrollTop+'px'}, 0);
                divBoxhead.stop().animate({"scrollLeft":e.target.scrollLeft+'px'}, 0);
            });
            box.css({'width':tl.width, 'height':tl.height, 'overflow':'auto', 'position':'relative', 'clear':'both'});//设置高度和宽度
            table.wrap(box);
            table.addClass('tbLock');

            //创建div
            var divBox = $("#" + boxid);
            divBox.after("<div id = '"+headid+"'></div>");
            divBox.after("<div id = '"+bodyid+"'></div>");
            divBox.after("<div id = '"+fixedid+"'></div>");
            var divBoxhead = $("#" + headid);
            var divBoxbody = $("#" + bodyid);
            var divBoxfixed = $("#" + fixedid);

            var crossNum=tl.lockRow*tl.lockColumn;
            var scrollWidth = 17;
            var rowheights = 0;
            var colwidths = 0;
            if(tl.lockRow>0){
                var tr;
                for(var r=0;r<tl.lockRow;++r){//添加行锁定
                    tr=table.find('thead tr:eq('+r+') >th').addClass('LockRow').addClass(tl.lockRowCss);
                    if(!tr[r]){
                        // 头部不够 锁定body部分
                        tr=table.find('tbody tr:eq('+r+') >td').addClass('LockRow').addClass(tl.lockRowCss);
                    };
                    var trHeight = tr[r].offsetHeight;
                    if($(tr[r]).attr("rowspan")){
                        // 跨行计算
                        trHeight = trHeight/parseInt($(tr[r]).attr("rowspan"));
                    };
                    rowheights += trHeight;
                    for(var c=0;c<tl.lockColumn;++c){//设置交叉单元格样式，除了锁定单元格外还有交叉单元格自身样式
                        if(tr){
                            table.find('thead tr th:eq('+c+')').addClass('LockCell');
                            tr.find('td:eq('+c+')').addClass('LockCell').addClass(tl.lockRowCss);
                        }

                    }
                }
            };
            if(tl.lockColumn>0){
                var rowNum=$('#'+tableId+' tr').length;
                var tr, th;
                for(var r=(tl.lockRow);r<rowNum;++r){
                    tr=table.find('tr:eq('+r+')');
                    th = table.find('thead tr:eq(0) >th')
                    for(var c=0;c<tl.lockColumn;++c){//添加列锁定
                        if(r == (tl.lockRow)){
                            colwidths += th[c].offsetWidth;
                        };
                        tr.find('td:eq('+c+')').addClass('LockCell').addClass(tl.lockColumnCss);
                    }
                }
            }

            //复制横向

            var boxwidth = divBox.width() - scrollWidth;
            // console.log(divBox.css("width"), "|", tl.width);
            divBoxhead.width(boxwidth);//设置高度和宽度
            var th = table.clone(true).attr({"id":tableId + "_h"});
            
            th.height(table.height());
            divBoxhead.css({"position":"absolute", "top":"0px", "left":"0px", "overflow":"hidden"});
            divBoxhead.height(rowheights);
            divBoxhead.append(th);
            // th.removeAttr(an_datagrid);//移除属性名
            th.attr("optipns", null);
            th.attr(an_datagrid, null);

            //复制纵向
            divBoxbody.css({"position":"absolute", "top":"0px", "left":"0px", "overflow":"hidden"});
            var divheight = divBox.height() - scrollWidth;
            divBoxbody.height(divheight);
            var tw = table.clone(true).attr({"id":tableId + "_w"});
            
            tw.width(table.width());
            divBoxbody.width(colwidths);//设置高度和宽度
            divBoxbody.append(tw);
            // IE8 下面不支持
            tw.attr("options",null);//移除属性名
            tw.attr(an_datagrid, null);
            // tw.removeAttr("an-datagrid");//移除属性名
            //当table宽度自设置为100%时候

            // //复制交叉固定
            divBoxfixed.css({"position":"absolute", "top":"0px", "left":"0px", "overflow":"hidden"});
            divBoxfixed.css({"z-index":fiexdindex});

            var fixed = table.clone(true).attr({"id":tableId + "_f"});
            
            divBoxfixed.width(colwidths).height(rowheights);
            // fixed.find("thead tr th:not(.LockCell)").remove();
            divBoxfixed.append(fixed);
            fixed.width(table.width()).height(table.height());
            fixed.attr("options",null)//移除属性名
            fixed.attr(an_datagrid, null);
            // $("#lockTable_f").css({'width':'200px', "_width":"200px"});

            // //绑定布局事件
            if(rowheights > 0 && colwidths > 0){
                table.bind("layout", function(){
                    var lheight = divBox.parent().parent().height();
                    var lwidth = divBox.parent().parent().width();
                    divBox.parent().width(lwidth).height(lheight);
                    divBox.width(lwidth).height(lheight);
                    fixed.width(table.width()).height(table.height());
                    // table.width(tl.width).height(divBox.height());

                    divBoxhead.width(divBox.width() - scrollWidth);
                    th.height(table.height());
                    divBoxbody.height(divBox.height() - scrollWidth);
                    tw.width(table.width());


                })
            }

        },
        an_tableSetView:function(element, node){
            var tableId = element[0].id;
            var table = element;
            var an_datagrid = "an-datagrid";//渲染字段
            var boxid = 'divBoxing-' + tableId;
            var bodyid = 'divBoxingbody-' + tableId;
            var headid = 'divBoxinghead-' + tableId;
            var fixedid = 'divBoxingfixed-'+tableId;

            //创建div
            var divBox = $("#" + boxid);
            var divBoxhead = $("#" + headid);
            var divBoxbody = $("#" + bodyid);
            var divBoxfixed = $("#" + fixedid);

            // 获取当前头部JSON
            var headData = table.an_datagrid("getHeadJson", table);

            var setView = function(tb){

                // 头部父级牵连
                var setHeadParent = function (){
                    var index = 0;
                    var parentNode = "";
                    var pNode = "";

                    var onParentData = function(data){
                        for(var i = 0; i <data.length; i++){
                            var dd = data[i];
                            if(node.layer == dd.layer){
                                if(node.jsonIndex == index){
                                    parentNode = dd;
                                    break;
                                }

                            }
                            if(dd.children.length > 0){
                                pNode = dd;
                                onParentData(dd.children);
                            }else{
                                index += 1;
                            }

                            if(parentNode != ""){
                                break;
                            }
                        }
                    }
                    onParentData(headData);

                    var openCounts = 0;
                    for(var i = 0;i < pNode.children.length; i++){
                        var d = pNode.children[i];
                        if(d.view == "open"){
                            openCounts +=1;
                        }
                    }
                    tb.find("thead tr").each(function(tr_index,tr){
                        $(tr).find("th").each(function(th_index, th){

                            if(tr_index == parseInt(pNode.layer) && th_index == parseInt(pNode.th_index)){
                                if(openCounts > 0){
                                    $(th).removeClass("f-hidden");
                                    $(th).attr("colspan", openCounts);
                                    pNode.view = "open";
                                }else if(openCounts == 0){
                                    $(th).addClass("f-hidden");
                                    pNode.view = "close";
                                }
                            }
                        })
                    })
                }

                // 头部子级牵连
                var setHeadChildren = function(){
                    var index = 0;
                    var parentNode = "";
                    var pNode = "";
                    var parentDom = "";

                    var onChildrenData = function(data){
                        for(var i = 0; i <data.length; i++){
                            var dd = data[i];
                            if(node.layer == dd.layer){
                                // console.log(node.jsonParentIndex, index, dd.jsonParentIndex);
                                if(node.jsonParentIndex == dd.jsonParentIndex){
                                    parentNode = dd;
                                    break;
                                }

                            }
                            if(dd.children.length > 0){
                                pNode = dd;
                                index += 1;
                                onChildrenData(dd.children);
                            }

                            if(parentNode != ""){
                                break;
                            }
                        }
                    }

                    var hiddenNode = function(nn){
                        for(var i = 0; i <nn.children.length; i++){
                            var dd = nn.children[i];

                            tb.find("thead tr").each(function(tr_index,tr){
                                $(tr).find("th").each(function(th_index, th){

                                    if(tr_index == parseInt(dd.layer) && th_index == parseInt(dd.th_index)){
                                        var $th = $(th);

                                        if(nn.view == 'open'){
                                            $th.removeClass("f-hidden");
                                            dd.view = "open";
                                        }else{
                                            $th.addClass("f-hidden");
                                            dd.view = "close";
                                        }
                                        hiddenTbody(dd);
                                    }
                                })
                            })
                            if(dd.children.length > 0){
                                hiddenNode(dd.children);
                            }
                        }
                    }

                    var getNodeStatus = function(p_node){
                        var openCounts = 0;
                        for(var i = 0;i < p_node.children.length; i++){
                            var d = p_node.children[i];
                            if(d.view == "open"){
                                openCounts +=1;
                            }
                        }
                        return openCounts;
                    }


                    onChildrenData(headData);

                    // 集合一下 全部隐藏
                    hiddenNode(parentNode);
                    // 反操作父节点数量
                    if(getNodeStatus(parentNode) > 0){
                        tb.find("thead tr").each(function(tr_index,tr){
                            $(tr).find("th").each(function(th_index, th){

                                if(tr_index == parseInt(parentNode.layer) && th_index == parseInt(parentNode.th_index)){
                                    var $th = $(th);

                                    $(th).attr("colspan", getNodeStatus(parentNode));
                                }
                            })
                        })
                    }
                }

                // 内容显示隐藏
                var hiddenTbody = function (node){
                    tb.find("tbody tr").each(function(tr_index,tr){
                        $(tr).find("td").each(function(td_index, td){

                            if(td_index == parseInt(node.jsonIndex)){
                                if(node.view == "open"){
                                    $(td).removeClass("f-hidden");
                                }else{
                                    $(td).addClass("f-hidden");
                                }
                            }
                        })

                    })
                }

                // 头部显示隐藏
                var trCounts = tb.find("thead tr").length;
                tb.find("thead tr").each(function(tr_index,tr){
                    $(tr).find("th").each(function(th_index, th){
                        if(tr_index == parseInt(node.layer) && th_index == parseInt(node.th_index)){
                            if($(th).hasClass("f-hidden")){
                                $(th).removeClass("f-hidden");
                                node.view = "open";
                            }else{
                                $(th).addClass("f-hidden");
                                node.view = "close";
                            }
                            headData = table.an_datagrid("getHeadJson", table);
                            hiddenTbody(node);
                            if(tr_index > 0){
                                setHeadParent();
                            }else if(tr_index < trCounts-1){
                                setHeadChildren();
                            }
                        }
                    })
                })
            }

            if(divBox.length > 0){
                setView(divBox);
                setView(divBoxhead);
                setView(divBoxbody);
                setView(divBoxfixed);
            }else{
                setView(table);
            }
        },
        an_tableView:function(){
            // 关于数据列表 头部显示隐藏
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

            var table = $(this);
            var dialogId = table.attr("id")+"_dialog";
            var treeId = table.attr("id")+"_tree";

            var getJson = "EVENT_GET_JSON";//获取头部当前JSON状态

            if(funstyle != ""){
                //方法写入
                if(funstyle == "getJson"){
                    var fun = arguments[1];
                    table.trigger(getJson, fun);
                };
            }else{

                var _options = $.extend({
                    width:400,
                    height:430,
                    setHeadJson:"",
                    postUrl:"",//提交当前表头显示隐藏状态地址
                    postSuccess:function(){},//提交状态成功
                    onTreeCheck:function(){}
                }, options);

                // 对话框底部按钮
                var dialog_bottom = "<div class='u-p-l-bottom u-upload-bot' style = 'width:100%;height:40px;background:#EEE;position:absolute;bottom:0px;left:0px;_top:"+(_options.height-45)+"px;_left:5px;_z-index:10000;'>"+
                                        "<div class='f-right f-p-xs'>"+
                                      "<a href='javascript:;' class='u-button-default success submit' id = 'submit_btn' style='float:left; margin-left:10px;'>确认</a>"+
                                    "</div></div>";
                // 创建对话框
                $(document).an_dialog({
                    id:dialogId,
                    aniClose:false,
                    locMyself:true,
                    onBeforeClose:function(){
                        // 关闭对话框验证
                        return true;
                    },
                    title: "显示隐藏列",
                    html: "<div class='' style = 'height:"+(_options.height-85)+"px;overflow-y:auto'><ul id='"+treeId+"' class='ztree'></ul></div>" + dialog_bottom,
                    width:_options.width,
                    height:_options.height
                });

                dialog = $("#"+dialogId);

                // 对话框确认按钮
                var submit = dialog.find("#submit_btn");
                var isSubmit = false;

                var onTreeCheck = function(node){
                    // console.log(node)
                    table.an_datagrid("tableView", node);
                }

                var setCurrentCheck = function (data){
                    var t = $.fn.zTree.getZTreeObj(treeId);
                    // var node = t.getNodeByTId(data.tId);
                    var node = t.getNodeByParam("id", data.id);
                    t.checkNode(node, true, false);
                }

                var createTree = function (treeId, set, nodes){
                    // console.log(treeId, nodes)
                    //树设置
                    var setting = {
                        treeObj:null,
                        callback:{
                            onCheck:function(event, treeId, treeNode) {
                                // 对比即时状态
                                // var cData = table.an_datagrid("getHeadJson", table);
                                // console.log(treeNode.view)
                                // var cNode = getNode(cData);
                                // function getNode(node){
                                //     var n = "";
                                //     goNode(node);
                                //     function goNode(node){
                                //         for(var i = 0; i < node.length; i++){
                                //             var d = node[i];
                                //             if(d.layer == treeNode.layer && d.th_index == treeNode.th_index){
                                //                 n = d;
                                //             }
                                //             if(d.children.length > 0){
                                //                 goNode(d.children);
                                //             }
                                //         }
                                //     }
                                //     return n;
                                // }
                                // treeNode.view = cNode.view;
                                // 外部调用事件
                                // if(treeNode.view == "open"){
                                //     treeNode.view = "close";
                                // } else{
                                //     treeNode.view = "open";
                                // }
                                _options.onTreeCheck(treeNode);
                                onTreeCheck(treeNode);
                            }
                        },
                        check: {
                            enable: true,
                            chkStyle: "checkbox",
                            chkboxType: { "Y": "sp", "N": "sp" }
                        },
                        data: {
                            simpleData: {
                              enable: true
                            }
                        }
                    };
                    if(set){
                        setting = $.extend(setting, set);
                    };

                    var tree = "";
                    // 判断是否加载ztree结构json
                    if(nodes){
                        $.fn.zTree.init($("#" + treeId), setting, nodes);
                        tree = $("#" + treeId);
                        for(var i = 0; i< nodes.length; i++){
                            // console.log(nodes[i].view)
                            if(nodes[i].view == "close"){
                                setCurrentCheck(nodes[i]);
                            }
                        }

                        // setCurrentShow(combo.showTarget);
                    }else if(op && op.url){
                        // andy.loaddata(op.url, function(data){
                        //     data = andy.stringToJson(data);
                        //     $.fn.zTree.init($("#" + treeId), setting, data);
                        //     tree = $("#" + treeId);
                        //     setCurrentShow(combo.showTarget);
                        // })
                    };
                }
                submit.on("click", function(e){
                    if(isSubmit){
                        return true;
                    }
                    isSubmit = true;
                    if(_options.postUrl == ""){
                        isSubmit = false;
                        dialog.an_dialog("close");
                    }else{
                        var headData = table.an_datagrid("getHeadJson", table);
                        $.post(_options.postUrl, headData, function(data, textStatus, jqXHR){
                            if(textStatus == "success"){
                                alert("状态已经保存");
                                _options.postSuccess();
                                isSubmit = false;
                                dialog.an_dialog("close");
                            }else{
                                alert(jqXHR);
                                isSubmit = false;
                            }

                        });
                    }
                })

                // 获取当前头部数据
                table.bind(getJson, function(e, fun){
                    var headData = table.an_datagrid("getHeadJson", table);
                    fun(headData);
                })

                // 获取当前头部JSON
                var headData = table.an_datagrid("getHeadJson", table);
                createTree(treeId, null, headData)
            }

        },
        an_creatSortBtn:function(){
            var table = $(this);
            var tableId = table.attr("id");
            var options = table.data("options");
            var lockTable = options.lockTable;
            var field = options.sortList.field;
            var sort = options.sortList.sort || "descending";//默认降序
            var icon = options.sortList.icon || "<div class = 'm-icon'><i class='iconfont'>&#xe705;</i></div>";
            var iconb = options.sortList.iconb || "<div class = 'm-icon'><i class='iconfont'>&#xe706;</i></div>";
            if(lockTable.lockColumn > 0 || lockTable.lockRow > 0){
                table = $("#"+tableId+"_h");
            }

            var replaceIcon = function(cell){
                sort == "descending"?sort = "ascending":sort = "descending";
                cell.replaceWith(sort == "descending"?iconb:icon);
                cell.click(function(e){
                    replaceIcon($(e.target))
                    options.onSortClick(field, sort)
                })
            }
            table.find("thead tr th").each(function(index, th){
                if($(th).attr("field") == field){
                    $(th).append(sort == "descending"?iconb:icon)
                    $(th).find(".m-icon").click(function(e){
                        replaceIcon($(e.target))
                        options.onSortClick(field, sort)
                    })
                }
            })
        }
    });
})(jQuery);