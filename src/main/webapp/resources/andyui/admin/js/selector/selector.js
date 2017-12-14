/*selector */
/**
 * 选择器组件
 * author:林耘宇
 **/
    //必须引入z-tree

(function ($) {
    $.fn.extend({
        an_selector: function () {
            var options = {}, METHODS = {};
            var funstyle = "";
            for (var i = 0; i < arguments.length; i++) {
                var a = arguments[0];
                if (typeof a == "object") {
                    options = a;
                } else if (typeof a == "string") {
                    funstyle = a;
                }
            }

            if (funstyle != "") {
                if (METHODS[funstyle]) {
                    //有mothed则调用之
                    return METHODS[funstyle](this, arguments[1]);
                }
                throw 'The method of' + funstyle + 'is undefined';
                return false;
            } else {
                var _options = $.extend({
                    treeid: "",//ztree dom的id
                    selects: true,//是否多选 true为多选
                    treeData: options.url || "",//传入ztree结构json
                    nodes: [],//传入本地数据同步加载-ztree
                    rightNodes: [],//已选好的数据
                    searchUrl: "",//搜索从后台获取数据
                    getUrl: "",//保留原来的点击树节点以后获取
                    searchText: "输入工号/名字",
                    treeTitle: options.leftTitle || "部门结构",
                    setting: "",//默认ztree配置
                    tableList:false,
                    cal:function(){},
                    //clickTree: function (url, treeId, text)//自己组织点击的数据 传入一个闭包函数 function(id){return function(){}}
                    submit: function () {
                    }
                }, options);
                
                var sel = $(this);
                var center = sel.find("[center]");
                var right = sel.find("[right]");
                var choose = sel.find("[choose]");//全选按钮
                var cancel = sel.find("[cancel]");//全部取消按钮
                var submit = sel.find("[submit]");//提交按钮
                var inputText = sel.find("[inputText]");//搜索框
                var search = sel.find("[search]");//搜索按钮
                var treeTitle = sel.find("[treeTitle]");//左边标题
                var chooseData = [];
                var currentTreeNode = "";
				
				//判断是否以表格的方式显示
				if(!_options.tableList){
					center.wrap("<div class='f-p-sm' center></div>");
					center.remove();
					center = $("[center]");
				}
				
                //保留
                if (treeTitle.length === 0) {
                    var treeTitle = sel.find("[leftTitle]");//左边标题
                }

                //树设置
                var default_setting = {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                };

                var setting = {
                    callback: {
                        onClick: function (event, treeId, treeNode) {
                            currentTreeNode = treeNode;
                            onTreeClick(currentTreeNode);
                        }
                    }
                };
                if (_options.setting != "") {
                    setting = $.extend(true, setting, _options.setting, default_setting);
                }

                setting.callback.onClick = function (event, treeId, treeNode) {
                    currentTreeNode = treeNode;
                    onTreeClick(currentTreeNode);
                };

                var tree = "";
                // 判断是否加载ztree结构json
                if (_options.treeData == "") {
                    $.fn.zTree.init($("#" + _options.treeid), setting, _options.nodes);
                    tree = $("#" + _options.treeid);
                } else {
                    andy.loaddata(_options.treeData, function (data) {
                        data = andy.stringToJson(data);
                        $.fn.zTree.init($("#" + _options.treeid), setting, data);
                        tree = $("#" + _options.treeid);
                    })
                }

                //已选框是否有数据
                if (_options.rightNodes.length > 0) {
                    for (var i = 0; i < _options.rightNodes.length; i++) {
                        var data = _options.rightNodes[i];
                        addToRight(data);
                    }
                }


                // 左边标题
                if (treeTitle) {
                    treeTitle.text(_options.treeTitle);
                }


                // 进行全选操作
                if (choose) {
                    if (_options.selects == false) {
                        choose.addClass("f-hidden");
                    }
                    choose.click(function () {
                        if (center && center.attr("table-list") != "true") {
                            center.children().each(function (index, e) {
                                for (var i = 0; i < chooseData.length; i++) {
                                    if ($(e).attr("id") == chooseData[i].id) {
                                        clearSelf($(e));
                                        addToRight(chooseData[i]);
                                    }
                                }
                            })
                        }else{
                            $("#tableOption tbody").find("tr").each(function(index, tr){
                                var trid = $(tr).attr("id");
                                for(var i = 0; i < chooseData.length; i++){
                                    if ($("#"+trid).data("tr_data").id == chooseData[i].id) {
                                        addToRight(chooseData[i]);
                                    } 
                                }

                            })
                            $("#tableOption tbody").empty()
                        }
                    })
                }
                ;

                // 进行全部取消操作
                if (cancel) {
                    if (_options.selects == false) {
                        cancel.addClass("f-hidden");
                    }
                    cancel.click(function () {
                        if (right) {
                            right.children().each(function (index, e) {
                                clearSelf($(e));
                                changeCenterFrame(chooseData);
                            })
                        }
                    })
                }


                // 提交按钮
                if (submit) {
                    submit.click(function () {
                        _options.submit(getChooseJson());
                        _options.cal(getChooseJson());
                    })
                }


                //搜索按钮
                if (search) {
                    search.click(function () {
                        onTreeClick(currentTreeNode, true);
                    });
                }

                if (inputText) {
                    inputText.attr("placeholder", _options.searchText);
                    var ie = andy.getBrowser().browser.ie;
                    if (ie && ie < 8) {
                        inputText.val(_options.searchText);
                        inputText.blur(function (e) {
                            if ($(e.target).val() == "") {
                                inputText.val(_options.searchText);
                            }
                        });
                        inputText.focus(function (e) {
                            if ($(e.target).val() == _options.searchText) {
                                inputText.val("");
                            }

                        });
                    }

                }

                // 树点击事件 event, treeId, treeNode
                function onTreeClick(treeNode, isSearch) {
                    var params = {}, url = _options.getUrl;
                    //新的链接方式
                    if (!url) {
                        url = isSearch ? _options.searchUrl : treeNode.dataUrl;
                    }

                    var text = "";
                    if (url != "") {
                        if (inputText.val() != _options.searchText && isSearch) {
                            params.search = inputText.val();
                        }
                        params.id = treeNode.id;
                        if (_options.clickTree) {
                            params = _options.clickTree(treeNode);
                        }
                        if (url && url !== "") {
                            andy.loaddata(url, params, function (data) {
                                data = andy.stringToJson(data);
                                chooseData = data;
                                changeCenterFrame(data);
                            })
                        }

                    }
                };
                
                
                var addToCenterList = function(d){
                    $("#tableOption").an_datagrid("addRow", d, function(tdData,thisid, html){
                        $("#"+thisid).on("click", function(e){
                            if($(e.target).is("input")){
                                if($(e.target).prop("checked")){
                                    $("#"+thisid).addClass("current")
                                    addToRight(d);
                                    $("#"+thisid).remove()
                                }else{
                                    $("#"+thisid).removeClass("current")
                                }
                                // console.log(html, thisid, tdData)
                            }
                        })
                    })
                }

                function changeCenterFrame(data) {
                    if (center && center.attr("table-list") != "true") {
                        center.empty();
                        for (var i = 0; i < data.length; i++) {
                            var d = data[i];
                            if (!checkId(right, d.id)) {
                                addToCenter(d);
                            }
                        }
                    }else{
                        $("#tableOption").find("tbody").empty()
                        for (var i = 0; i < data.length; i++) {
                            var d = data[i];
                            if (!checkId(right, d.id)) {
                                addToCenterList(d);
                            }
                        }
                    }
                };
                METHODS.changeCenterFrame = changeCenterFrame;

                // 添加人员到中间
                function addToCenter(data) { 
                    if (center) {
                        if (checkDataId(chooseData, data.id) && !checkId(center, data.id)) {
                            center.append("<button class='u-btn sm' id = " + data.id + " data = " + data.data + " name = " + data.name + ">" + data.name + "</button>");
                            var button = $("#" + data.id);
                            button.click(function (e) {
                                clearSelf(button);
                                addToRight(data);
                            })
                        }
                    }
                };

                // 添加人员到右侧
                function addToRight(data) {
                    if (right) {
                        if (!checkId(right, data.id) && _options.selects) {
                            right.append("<button class='u-btn sm' id = " + data.id + " data = " + data.data + " name = " + data.name + ">" + data.name + "<i class='iconfont'>&#xe602;</i></button>");
                            var button = $("#" + data.id);
                            button.click(function (e) {
                                clearSelf(button);
                                if(center.attr("table-list") != "true"){
                                    addToCenter(data);
                                }else{
                                    addToCenterList(data);
                                }
                                
                            })
                        } else if (_options.selects == false) {
                            // 单选人员
                            right.children('button').each(function (i, button) {
                                var btn = $(button);
                                clearSelf(btn);
                                var btnData = {
                                    id: btn.attr('id'),
                                    name: btn.attr('name'),
                                    data: btn.attr('data')
                                }
                                if(center.attr("table-list") != "true"){
                                    addToCenter(data);
                                }else{
                                    addToCenterList(data);
                                }
                            })
                            right.append("<button class='u-btn sm' id = " + data.id + " data = " + data.data + " name = " + data.name + ">" + data.name + "<i class='iconfont'>&#xe602;</i></button>");
                            var button = $("#" + data.id);
                            button.click(function (e) {
                                clearSelf(button);
                                if(center.attr("table-list") != "true"){
                                    addToCenter(data);
                                }else{
                                    addToCenterList(data);
                                }
                            })
                        }
                    }
                };
                // 查询对象是否有相同id
                function checkId(element, id) {
                    var ishave = false;
                    element.children().each(function (index, e) {
                        if (id == $(e).attr("id")) {
                            ishave = true;
                        }
                    })
                    return ishave;
                };

                // 检查数组是否有相同id
                function checkDataId(data, id) {
                    var ishave = false;
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        if (id == d.id) {
                            ishave = true;
                        }
                    }
                    ;
                    return ishave;
                }

                //移除自己
                function clearSelf(element) {
                    element.unbind('click');
                    element.remove();
                };

                //获取被选框对象 生成数据后
                function getChooseJson() {
                    var str = "[";
                    right.children().each(function (index, e) {
                        var $this = $(e);
                        var s = "{'id':'" + $this.attr("id") + "','name':'" + $this.attr("name") + "','data':'" + $this.attr("data") + "', 'tId':'" + $this.attr("tId") + "'}";
                        if (str == "[") {
                            str += s;
                        } else {
                            str += "," + s;
                        }

                    })
                    str += "]";
                    var jstr = eval('(' + str + ')');
                    return jstr;
                };
            }

        },
        an_selectorMulti: function () {
            var options = {}, METHODS = {};
            var funstyle = "";
            for (var i = 0; i < arguments.length; i++) {
                var a = arguments[0];
                if (typeof a == "object") {
                    options = a;
                } else if (typeof a == "string") {
                    funstyle = a;
                }
            }


            if (funstyle != "") {
                if (METHODS[funstyle]) {
                    //有mothed则调用之
                    return METHODS[funstyle](this, arguments[1]);
                }
                throw 'The method of' + funstyle + 'is undefined';
                return false;
            } else {
                var _options = $.extend({
                    treeid: "",//ztree dom的id
                    selects: true,//是否多选 true为多选
                    treeData: options.url || "",//传入ztree结构json
                    nodes: [],//传入本地数据同步加载-ztree
                    rightNodes: [],//已选好的数据
                    tableList:true,
                    searchUrl: "",//搜索从后台获取数据
                    getUrl: "",//保留原来的点击树节点以后获取
                    searchText: "输入工号/名字",
                    treeTitle: options.leftTitle || "部门结构",
                    setting: "",//默认ztree配置
                    //clickTree: function (url, treeId, text)//自己组织点击的数据 传入一个闭包函数 function(id){return function(){}}
                    submit: function () {
                    }
                }, options);
               
                var sel = $(this);
                var head = sel.find("[selecthead]");
                var leftframe = sel.find("[leftframe]");
                
                var center = sel.find("[center]");
                var right = sel.find("[right]");
                var choose = sel.find("[choose]");//全选按钮
                var cancel = sel.find("[cancel]");//全部取消按钮
                var submit = sel.find("[submit]");//提交按钮
                var inputText = sel.find("[inputText]");//搜索框
                var search = sel.find("[search]");//搜索按钮
                
                var chooseData = [];
                var currentTreeNode = "";
				
				//判断是否以表格的方式显示
				if(!_options.tableList){
					center.wrap("<div class='f-p-sm' center></div>");
					center.remove();
					center = $("[center]");
				}

                // 操作leftframe显示
                var setShowFrame = function(index){
                    var leftframeOne = sel.find(".leftframe");
                    leftframeOne.each(function(frameindex, frame){
                        if(frameindex == index){
                            $(frame).show()
                        }else{
                            $(frame).hide()
                        }
                    })
                }

                // 生成分页页签
                if(typeof _options.treeTitle == "object"){
                    for(var i = 0; i < _options.treeTitle.length; i++){
                        head.append("<li index='1' selectbtn style='margin:5px 5px 0 0;'><a href='javascript:;'>"+_options.treeTitle[i]+"</a></li>")
                        leftframe.append("<div class = 'g-max leftframe' style = 'position:relative;'>"+
                                "<div class='panel-head f-b-b'>"+
                                    "<div class='panel-h-l'>"+
                                        "<strong class='title' treeTitle>"+_options.treeTitle[i]+"</strong>"+
                                    "</div></div>"+
                                "<div class='panel-body g-h-max'>"+
                                    "<ul id='"+_options.treeid[i]+"' class='ztree'></ul>"+
                                "</div></div>")
                    }
                    sel.an_tabs();
                    andy.layout(leftframe)
                    andy.layout(center.parent())
                    setShowFrame(0)
                }
                var treeTitle = sel.find("[treeTitle]");//左边标题
                var selectbtn = sel.find("[selectbtn]");
                

                //保留
                if (treeTitle.length === 0) {
                    var treeTitle = sel.find("[leftTitle]");//左边标题
                }

                //树设置
                var default_setting = {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                };

                var setting = {
                    callback: {
                        onClick: function (event, treeId, treeNode) {
                            currentTreeNode = treeNode;
                            onTreeClick(currentTreeNode);
                        }
                    }
                };
                if (_options.setting != "") {
                    setting = $.extend(true, setting, _options.setting, default_setting);
                }

                setting.callback.onClick = function (event, treeId, treeNode) {
                    currentTreeNode = treeNode;
                    onTreeClick(currentTreeNode);
                };

                var tree = "";
                // 判断是否加载ztree结构json
                // if (_options.treeData == "") {
                //     $.fn.zTree.init($("#" + _options.treeid[0]), setting, _options.nodes);
                //     tree = $("#" + _options.treeid[0]);
                // } else {
                // 	// console.log('_options.treeData[0]=>'+_options.treeData[0]);
                //     andy.loaddata(_options.treeData[0], function (data) {
                //         data = andy.stringToJson(data);
                //         console.log(_options.treeid[0]);
                //         $.fn.zTree.init($("#" + _options.treeid[0]), setting, data);
                //         tree = $("#" + _options.treeid[0]);
                //     })
                // }

                var createTree = function(index){
                    // 判断是否加载ztree结构json
                    if (_options.treeData == "") {
                        $.fn.zTree.init($("#" + _options.treeid[index]), setting, _options.nodes);
                        tree = $("#" + _options.treeid[index]);
                    } else {
                        // console.log('_options.treeData[index]=>'+_options.treeData[index]);
                        andy.loaddata(_options.treeData[index], function (data) {
                            data = andy.stringToJson(data);
                            $.fn.zTree.init($("#" + _options.treeid[index]), setting, data);
                            tree = $("#" + _options.treeid[index]);
                        })
                    }
                }
                createTree(0)

                //已选框是否有数据
                if (_options.rightNodes.length > 0) {
                    for (var i = 0; i < _options.rightNodes.length; i++) {
                        var data = _options.rightNodes[i];
                        addToRight(data);
                    }
                }

                // 结构分页
                sel.bind(andy.EVENT_CLICK, function(e, index){
                     // treeTitle.text(_options.treeTitle[index-1]);
                     setShowFrame(index-1)
                     createTree(index-1)
                })


                // 左边标题
                // if (treeTitle) {
                //     treeTitle.text(_options.treeTitle[0]);
                // }


				// 进行按钮选择操作
                // if (selectbtn) {
                // 	for(var i=0;i<selectbtn.length;i++){
                // 		$(selectbtn[i]).click(function () {
                // 			var treed = _options.treeData;
                // 			// console.log(treed);
                // 			// console.log(treed[1]);
                //    //          console.log(_options.treeData[0]);
	               //          if (_options.treeData[i] == "") {
			             //        $.fn.zTree.init($("#" + _options.treeid), setting, _options.nodes);
			             //        tree = $("#" + _options.treeid);
			             //    } else {
			             //    	console.log($(this).index());
			             //        andy.loaddata(_options.treeData[$(this).index()], function (data) {
			             //            data = andy.stringToJson(data);
			             //            console.log(_options.treeid);
			             //            $.fn.zTree.init($("#" + _options.treeid), setting, data);
			             //            tree = $("#" + _options.treeid);
			             //        })
			             //    }
                //     	})
                // 	}
                // };

                // 进行全选操作
                if (choose) {
                    if (_options.selects == false) {
                        choose.addClass("f-hidden");
                    }
                    choose.click(function () {
                        if (center && center.attr("table-list") != "true") {
                            center.children().each(function (index, e) {
                                for (var i = 0; i < chooseData.length; i++) {
                                    if ($(e).attr("id") == chooseData[i].id) {
                                        clearSelf($(e));
                                        addToRight(chooseData[i]);
                                    }
                                }
                            })
                        }else{
                            $("#tableOption tbody").find("tr").each(function(index, tr){
                                
                                var trid = $(tr).attr("id");
                                for(var i = 0; i < chooseData.length; i++){
                                    if ($("#"+trid).data("tr_data").id == chooseData[i].id) {
                                        addToRight(chooseData[i]);
                                    } 
                                }

                            })
                            $("#tableOption tbody").empty()
                        }
                    })
                }
                ;

                // 进行全部取消操作
                if (cancel) {
                    if (_options.selects == false) {
                        cancel.addClass("f-hidden");
                    }
                    cancel.click(function () {
                        if (right) {
                            right.children().each(function (index, e) {
                                clearSelf($(e));
                                changeCenterFrame(chooseData);
                            })
                        }
                    })
                }


                // 提交按钮
                if (submit) {
                    submit.click(function () {
                        _options.submit(getChooseJson());
                        _options.cal(getChooseJson());
                    })
                }


                //搜索按钮
                if (search) {
                    search.click(function () {
                        onTreeClick(currentTreeNode, true);
                    });
                }

                if (inputText) {
                    inputText.attr("placeholder", _options.searchText);
                    var ie = andy.getBrowser().browser.ie;
                    if (ie && ie < 8) {
                        inputText.val(_options.searchText);
                        inputText.blur(function (e) {
                            if ($(e.target).val() == "") {
                                inputText.val(_options.searchText);
                            }
                        });
                        inputText.focus(function (e) {
                            if ($(e.target).val() == _options.searchText) {
                                inputText.val("");
                            }

                        });
                    }

                }

                // 树点击事件 event, treeId, treeNode
                function onTreeClick(treeNode, isSearch) {
                    var params = {}, url = _options.getUrl;
                    //新的链接方式
                    if (!url) {
                        url = isSearch ? _options.searchUrl : treeNode.dataUrl;
                    }

                    var text = "";
                    if (url != "") {
                        if (inputText.val() != _options.searchText && isSearch) {
                            params.search = inputText.val();
                        }
                        params.id = treeNode.id;
                        if (_options.clickTree) {
                            params = _options.clickTree(treeNode);
                        }
                        if (url && url !== "") {
                            andy.loaddata(url, params, function (data) {
                                data = andy.stringToJson(data);
                                chooseData = data;
                                changeCenterFrame(data);
                            })
                        }

                    }
                };
				
                var addToCenterList = function(d){
                    $("#tableOption").an_datagrid("addRow", d, function(tdData,thisid, html){
                        $("#"+thisid).on("click", function(e){
                            if($(e.target).is("input")){
                                if($(e.target).prop("checked")){
                                    $("#"+thisid).addClass("current")
                                    addToRight(d);
                                    $("#"+thisid).remove()
                                }else{
                                    $("#"+thisid).removeClass("current")
                                }
                                // console.log(html, thisid, tdData)
                            }
                        })
                    })
                }

                function changeCenterFrame(data) {
                    //console.log(data);
                    if (center && center.attr("table-list") != "true") {
                        center.empty();
                        for (var i = 0; i < data.length; i++) {
                            var d = data[i];
                            if (!checkId(right, d.id)) {
                                addToCenter(d);
                            }
                        }
                    }else{
                        $("#tableOption").find("tbody").empty()
                        for (var i = 0; i < data.length; i++) {
                            var d = data[i];
                            if (!checkId(right, d.id)) {
                                addToCenterList(d);
                            }
                        }
                    }
                };
                METHODS.changeCenterFrame = changeCenterFrame;

                // 添加人员到中间
                function addToCenter(data) { 
                    if (center) {
                        if (checkDataId(chooseData, data.id) && !checkId(center, data.id)) {
                            center.append("<button class='u-btn sm' id = " + data.id + " data = " + data.data + " name = " + data.name + ">" + data.name + "</button>");
                            var button = $("#" + data.id);
                            button.click(function (e) {
                                clearSelf(button);
                                addToRight(data);
                            })
                        }
                    }
                };

                // 添加人员到右侧
                function addToRight(data) {
                    if (right) {
                        if (!checkId(right, data.id) && _options.selects) {
                            right.append("<button class='u-btn sm' id = " + data.id + " data = " + data.data + " name = " + data.name + ">" + data.name + "<i class='iconfont'>&#xe602;</i></button>");
                            var button = $("#" + data.id);
                            button.click(function (e) {
                                clearSelf(button);
                                if(center.attr("table-list") != "true"){
                                    addToCenter(data);
                                }else{
                                    addToCenterList(data);
                                }
                                
                            })
                        } else if (_options.selects == false) {
                            // 单选人员
                            right.children('button').each(function (i, button) {
                                var btn = $(button);
                                clearSelf(btn);
                                var btnData = {
                                    id: btn.attr('id'),
                                    name: btn.attr('name'),
                                    data: btn.attr('data')
                                }
                                if(center.attr("table-list") != "true"){
                                    addToCenter(data);
                                }else{
                                    addToCenterList(data);
                                }
                            })
                            right.append("<button class='u-btn sm' id = " + data.id + " data = " + data.data + " name = " + data.name + ">" + data.name + "<i class='iconfont'>&#xe602;</i></button>");
                            var button = $("#" + data.id);
                            button.click(function (e) {
                                clearSelf(button);
                                if(center.attr("table-list") != "true"){
                                    addToCenter(data);
                                }else{
                                    addToCenterList(data);
                                }
                            })
                        }
                    }
                };

                // 查询对象是否有相同id
                function checkId(element, id) {
                    var ishave = false;
                    element.children().each(function (index, e) {
                        if (id == $(e).attr("id")) {
                            ishave = true;
                        }
                    })
                    return ishave;
                };

                // 检查数组是否有相同id
                function checkDataId(data, id) {
                    var ishave = false;
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        if (id == d.id) {
                            ishave = true;
                        }
                    }
                    ;
                    return ishave;
                }

                //移除自己
                function clearSelf(element) {
                    element.unbind('click');
                    element.remove();
                };

                //获取被选框对象 生成数据后
                function getChooseJson() {
                    var str = "[";
                    right.children().each(function (index, e) {
                        var $this = $(e);
                        var s = "{'id':'" + $this.attr("id") + "','name':'" + $this.attr("name") + "','data':'" + $this.attr("data") + "', 'tId':'" + $this.attr("tId") + "'}";
                        if (str == "[") {
                            str += s;
                        } else {
                            str += "," + s;
                        }

                    })
                    str += "]";
                    var jstr = eval('(' + str + ')');
                    return jstr;
                };
            }

        },
        //属性选择器 一般用在部门选择器
        an_selectorTree: function () {
            var options = {};
            var funstyle = "";
            for (var i = 0; i < arguments.length; i++) {
                var a = arguments[0];
                if (typeof a == "object") {
                    options = a;
                } else if (typeof a == "string") {
                    funstyle = a;
                }
            }
            ;
            if (funstyle != "") {
                //方法写入
                // if(funstyle == "total"){
                //     $(this).trigger("total", options.total);
                // }
            } else {
                //合并设置
                var _options = $.extend({
                    treeid: "",//ztree dom的id
                    selects: true,//是否多选 true为多选
                    treeData: options.url || "",//传入ztree结构json
                    nodes: [],//传入本地数据同步加载-ztree
                    rightNodes: [],//已选好的数据
                    treeTitle: options.leftTitle || "部门结构",
                    submit: function () {
                    }
                }, options);
				
                var sel = $(this);//sel是tree-selector.html页面的大容器div#selector2.g-layout.f-b
                var right = sel.find("[right]");//right是被选部门的容器div元素
                var cancel = sel.find("[cancel]");//全部取消按钮
                var submit = sel.find("[submit]");//确定按钮
                var treeTitle = sel.find("[treeTitle]");//左边标题
                var chooseData = [];
                var currentTreeNode = "";
                var treeObject = $.fn.zTree.getZTreeObj(_options.treeid);//必须初始化ztree才可以使用$.fn.zTree.getZTreeObj
                //保留
                if (treeTitle.length === 0) {
                    var treeTitle = sel.find("[leftTitle]");//左边标题
                }
				
                //树设置
                var setting = {
                    treeId: "1",
                    treeObj: null,
                    callback: {
                        onCheck: function (event, treeId, treeNode) {
                            onTreeCheck(treeNode);
                        }
                    },
                    check: {
                        enable: true,
                        chkStyle: "checkbox",
                        chkboxType: {"Y": "s", "N": "s"}
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                };
				if (!_options.selects) {//传入的为布尔值 无需和string做判断 
                    setting.check = {
                        enable: true,
                        chkStyle: "radio"
                    }
                }

                var tree = "";
                // 判断是否加载ztree结构json
                if (_options.treeData == "") {
                    $.fn.zTree.init($("#" + _options.treeid), setting, _options.nodes);
                    tree = $("#" + _options.treeid);
                    initRight();
                } else {
                    andy.loaddata(_options.treeData, function (data) {
                        data = andy.stringToJson(data);
                        $.fn.zTree.init($("#" + _options.treeid), setting, data);
                        tree = $("#" + _options.treeid);//树容器ul
                        initRight();
                    })
                }

                //已选框是否有数据
                function initRight() {
                    if (_options.rightNodes.length > 0) {
                        for (var i = 0; i < _options.rightNodes.length; i++) {
                            var data = _options.rightNodes[i];//是一个对象包含该部门的id等
                            addToRight(data);
                            var t = $.fn.zTree.getZTreeObj(_options.treeid);
                            // var node = t.getNodeByTId(data.tId);
                            var node = t.getNodeByParam("id", data.id);//带有该部门更多的参数
                            t.checkNode(node, true, false);
                        }
                    }
                };

                // 左边标题
                if (treeTitle) {
                    treeTitle.text(_options.treeTitle);
                }


                // 进行全部取消操作
                if (cancel) {
                    if (_options.selects == false) {
                        cancel.addClass("f-hidden");
                    }
                    cancel.click(function () {
                        if (right) {
                            right.children().each(function (index, e) {
                                var t = $(e);
                                var tObject = $.fn.zTree.getZTreeObj(_options.treeid);
                                var id = t.attr("id");
                                var node = tObject.getNodeByParam("id", id);
                                removeToRight(node);
                            })
                        }
                    })
                }
                // 提交按钮
                if (submit) {
                    submit.click(function () {
                        _options.submit(getChooseJson());
                    })
                }


                //节点选取
                function onTreeCheck(treeNode) {
                    if (treeNode) {
                        if (treeNode.checked) {
                            // 选取
                            goCheck(treeNode, true);
                        } else {
                            // 取消
                            goCheck(treeNode, false);
                        }
                    }
                };

                function goCheck(treeNode, isCheck) {
                    if (treeNode && isCheck) {
                        if (treeNode.children && _options.selects) {
                            addToRight(treeNode);
                            for (var i = 0; i < treeNode.children.length; i++) {
                                goCheck(treeNode.children[i], isCheck);
                            }
                        } else {
                            addToRight(treeNode);
                        }
                    } else if (!isCheck) {
                        if (treeNode.children) {
                            removeToRight(treeNode);
                            for (var i = 0; i < treeNode.children.length; i++) {
                                goCheck(treeNode.children[i], isCheck);
                            }
                        } else {
                            removeToRight(treeNode);
                        }
                    }
                };

                // 添加人员到右侧
                function addToRight(data) {
                    if (right) {
                        if (!checkId(right, data.id) && _options.selects) {
                            right.append("<button class='u-btn sm' id = " + data.id + " data = " + data.data + " name = " + data.name + ">" + data.name + "<i class='iconfont'>&#xe602;</i></button>");
                            var button = right.find("#" + data.id);
                            button.click(function (e) {
                                removeToRight(data);
                            })
                        } else if (_options.selects == false) {
                            var tObject = $.fn.zTree.getZTreeObj(_options.treeid);
                            // 获取结点
                            right.children('button').each(function (i, button) {
                                var id = $(button).attr("id");
                                var btnData = tObject.getNodeByParam("id", id);
                                removeToRight(btnData);
                            })
                            right.append("<button class='u-btn sm' id = " + data.id + " data = " + data.data + " name = " + data.name + ">" + data.name + "<i class='iconfont'>&#xe602;</i></button>");
                            var button = right.find("#" + data.id);
                            button.click(function (e) {
                                removeToRight(data);
                            })
                        }
                    }
                };

                function removeToRight(data) {
                    var button = right.find("#" + data.id);
                    clearSelf(button);
                    var t = $.fn.zTree.getZTreeObj(_options.treeid);
                    if (!data.tId) {
                        data = t.getNodeByParam("id", data.id);
                    }

                    t.checkNode(data, false, false);
                }

                // 查询对象是否有相同id
                function checkId(element, id) {
                    var ishave = false;
                    element.children().each(function (index, e) {
                        if (id == $(e).attr("id")) {
                            ishave = true;
                        }
                    })
                    return ishave;
                }

                // 检查数组是否有相同id
                function checkDataId(data, id) {
                    var ishave = false;
                    for (var i = 0; i < data.length; i++) {
                        var d = data[i];
                        if (id == d.id) {
                            ishave = true;
                        }
                    }
                    ;
                    return ishave;
                }

                //移除自己
                function clearSelf(element) {
                    element.unbind('click');
                    element.remove();
                };

                //获取被选框对象 生成数据后
                function getChooseJson() {
                    var str = "[";
                    right.children().each(function (index, e) {
                        var $this = $(e);
                        var s = "{'id':'" + $this.attr("id") + "','name':'" + $this.attr("name") + "','data':'" + $this.attr("data") + "'}";
                        if (str == "[") {
                            str += s;
                        } else {
                            str += "," + s;
                        }

                    })
                    str += "]";
                    var jstr = eval('(' + str + ')');
                    return jstr;
                };
            }
            ;
        }
    })


    /**
     * 打开选择器对话框
     * @param title 标题 默认为 “人员选择”
     * @param treeTitle 树标题 “部门结构”
     * @param treeData  url 或者 json
     * @param getNodeTags func  点击一个节点以后通过这个函数获取节点数据
     * @param callback  回调 选择完成以后回调 以选择结果为参数
     */
    andy.openSelectorDialog = function (options) {
        var args, defaults = {
            title: "人员选择",
            treeTitle: "部门结构",
            treeData: "/project/tsi/data/department.json",
            callback: function (data) {

            },
            cal:function(){}
        };
        args = $.extend({}, defaults, options);
        $(document).an_dialog({
            id: "openSelector",
            width: options.width || 823,
            height: 455,
            title: args.title,
            url: options.url || ((options.pathroot||"") + "/andyui/admin/js/selector/selector.html"),
            data: args
        });

    };


    andy.initSelector = function(el){
        if (el.getAttribute("options")) {
            var data = andy.stringToJson(el.getAttribute("options"));
            data.callback = function (list) {
                data.rightNodes = list;
                //多选框初始化
                andy.multiSelect({
                    parent: $(el).find("[selectorListBox]")[0],
                    dataKey: data.dataKey,//input的name
                    onDelete: function (index) {
                        list.splice(index - 1, 1);
                    },
                    list: list
                });
            };
            if(data.rightNodes && data.rightNodes.length !== 0){
            	data.callback(data.rightNodes);
            }
            $(el).find("[openSelector]").click(
                function () {
                    if (el.className.indexOf("tree-selector") > 0) {
                        data.url = (data.pathroot||"") + "/andyui/admin/js/selector/tree-selector.html";
                        data.width = 420;
                    }else if (el.className.indexOf("multi-selector") > 0) {
                        data.url = (data.pathroot||"") + "/andyui/admin/js/selector/tabs-selector.html";
                        // console.log(data.url)
                    }
                    andy.openSelectorDialog(data);
                }
            );
        }
    };


    //options上要增加一个dataKey
    $(document).ready(function () {
        $(".selector").each(function (index, el) {
            andy.initSelector(el);
        });
    });

})(jQuery);