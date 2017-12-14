// 框架操作 方法扩展
(function ($, win) {
    var _options = {
        search:{
            id:"tool_search",
            title:"应用搜索",
            icons:"&#xe60a;"
        },
        message:{
            id:"tool_message",
            title:"消息提示",
            icons:"&#xe777;"
        },
        mainclose:{
            id:"tool_mainclose",
            title:"注销",
            icons:"&#xe66b;"
        },
        mainstyle:{
            id:"tool_mainstyle",
            title:"皮肤设置",
            icons:"&#xe601;",
            style:{
                "default":{
                    title:"默认",
                    name:"default.css",
                    img:"template/menu-icon/color01.png"
                },
                "info":{
                    title:"蓝色",
                    name:"info.css",
                    img:"template/menu-icon/color02.png"
                }
            },
            structrue:{
                st01:{
                    title:"标准",
                    name:"style01",
                    img:"template/menu-icon/template01.png"
                },
                st02:{
                    title:"简洁",
                    name:"style02",
                    img:"template/menu-icon/template03.png"
                },
                st03:{
                    title:"传统",
                    name:"style03",
                    img:"template/menu-icon/template02.png"
                }
            }
        },
        systemhelp:{
            id:"tool_systemhelp",
            title:"系统帮助",
            icons:"&#xe744;"
        },
        options:{
            id:"tool_options",
            title:"我的配置",
            icons:"&#xe622;"
        }
    };

    var _publicOptions = {
        refresh:{
            id:"tool_refresh",
            title:"内容页面刷新",
            icons:"&#xe608;"
        },
        head:{
            id:"tool_head",
            title:"弹出用户信息",
            img:"userwomen.png"
        }
    }
    var _function = {};

    _function.resourcesUrl = "";//资源地址
    _function.cssUrl = "";//样式地址
    // _function.centerfloat = $('#an_centerfloat');

    _function.floatbox = function(name){
        var centerFloat = $('#an_centerfloat');
        centerFloat.attr("typename", name)
        centerFloat.children().empty()
        centerFloat.is(":hidden")?andy.floatbox(centerFloat):null;
        return centerFloat;
    }

    // 插入搜索
    _function.setSearch = function(jsonData){
        var centerFloat = $('#an_centerfloat');
        var searchbox = centerFloat.find(".searchlist");
        searchbox.empty();
        // var listCounts = jsonData.length;
        for(var i in jsonData){
            var d = jsonData[i];
            var url = d.url||"javascript:void(0);";
            var target = d.target || "stage";
            searchbox.append("<li><a href="+url+" target = '"+target+"'><i class='iconfont "+d.classColor+"'>"+d.icons+"</i>"+d.text+"</a></li>");
        }
    }

    _function.search = function(options){
        options.event_click = function(e){
            var centerFloat = _function.floatbox("search")
            var title = "<div class='h4 f-p-sm f-p-t-n f-p-l-n  f-p-r-n'>应用搜索</div>";
            var searchInput = "<div class='u-group f-m-b-xs sm searchbox' >"+
                "<input type='text' class='item item-l u-input' style='width:132px' placeholder='输入文本'>"+
            "<button class='item item-r u-btn'><i class='iconfont'>&#xe60a;</i></button></div>";
            var mess = "<div class='sm f-p-l-n f-p-r-n'>常用应用</div>"+
            "<ul class='f-p-sm f-p-t-n f-p-l-n f-p-r-n searchlist'></ul>";
            centerFloat.children().append(title)
            centerFloat.children().append(searchInput)
            centerFloat.children().append(mess)
            _function.setSearch(options.list)

            centerFloat.find(".searchbox button").click(function(){
                var searchVal = centerFloat.find(".searchbox input");
                var obj = {};
                searchVal.val() != ""?obj["value"] = searchVal.val():null;
                if(options.api && searchVal.val() != ""){
                    andy.loaddata(options.api, obj, function(data){
                        _function.setSearch(data.list)
                    })
                }
            })
        }
    }

    // 插入消息操作

    _function.deleteMessage = function(id){
        var mess = framework.userjson.message.message;
        for(var i in mess){
            if(mess[i].id == id){
                mess.splice(i, 1)
            }
        }
        // framework.userjson.message.message = options.message;
    }
    _function.setMessage = function(jsonData, options){
        var centerFloat = $('#an_centerfloat');
        centerFloat.children().empty();
        var title = "<div class='h4 f-p-sm f-p-t-n f-p-l-n  f-p-r-n'>消息提示</div>";
        centerFloat.children().append(title)
        var messLength = 0;
        var api = options.api||null;
        for(var i in jsonData){
            messLength += 1;
        }
        var mess = "<div class='sm f-p-l-n f-p-r-n'>当前共有 "+messLength+" 条消息记录</div>"+
        "<ul class='f-p-sm f-p-t-n f-p-l-n f-p-r-n informationlist'></ul>";
        centerFloat.children().append(mess)
        var informationBox = centerFloat.find(".informationlist");
        for(var i in jsonData){
            var d = jsonData[i];
            var c = d.classColor || "f-color-danger";
            var str = "<li><a href='javascript:void(0);' id = '"+d.id+"'><i class='iconfont close'>&#xe602;</i>"+
            "<i class='iconfont "+c+"'>&#xe789;</i>"+d.title+
            "<div class='f-clear small'>"+d.time+"</div></a></li>";
            informationBox.append(str);
        }

        function openMessageDialog(data){
             $(document).an_dialog(data);
        }

        
        // 删除列表
        informationBox.find(".close").click(function(e){
            var a = $(e.target).parent();
            var aid = a.attr("id");
            _function.deleteMessage(aid)
            var deleteApi = framework.userjson.message.deleteApi;
            andy.loaddata(deleteApi, {id:aid}, function(data){
                _function.setMessage(framework.userjson.message.message, framework.userjson.message)
            })
            _function.refreshMessCounts()
            e.stopPropagation();
        })
        informationBox.find("a").click(function(e){
            var a = $(e.target).is("a")?$(e.target):$(e.target).parent();
            var aid = a.attr("id");
            _function.deleteMessage(aid)
            if(_function.messageClick){
                _function.messageClick(aid, jsonData)
            }
            _function.refreshMessCounts()
            // api?andy.loaddata(api, {id:aid}, function(data){openMessageDialog(data)}):null;
        })
    }

    _function.messageHanld = null;

    _function.alertMessage = function(){
        var messageCell = $("#"+_options.message.id);
        var alert = $("#"+_options.message.id+"_view");
        if(alert.length > 0){
            alert.remove()
        }
        var options = messageCell.data("json");
        if(options.isView == false || options.isView == "false"){
            return false;
        }
        var mess = framework.userjson.message.message;
        var messIds = [];
        var list = "";
        var noView = false;

        for(var i in mess){
            var m = mess[i];
            messIds.push(m.id);
            var str = "<li class='clickstyle' id = '"+m.id+"_view' >"+
                "<i class='iconfont icon'>&#xe69b</i>"+
                "<div class='content'>"+
                    "<p class='f-p-b-xs'>"+m.title+"</p>"+
                    "<small>"+m.time+"</small>"+
                "</div></li>";
            list += str;
        }

        var dialog = "<div style = 'width:300px;height:300px;'>"+
        "<div class = 'g-h-max f-p-xs'>"+
            "<ul class = 'm-timeline' an-scrollbar = '' options='autoHidden:true'>"+
            list+"</ul></div>"+
        "<div class = 'm-toolbar f-p-xs f-bg-light-lt400'>"+
            "<div class = 'item' style = 'width:100%;'><label class = 'u-checkbox'><input type='checkbox' id = 'view_checkbox'>"+
            "忽略当前消息</label><div class='item f-right'>"+
                "<a class = 'u-btn info' id = 'view_button'>我知道了</a>"+
            "</div></div></div></div>";

        andy.an_alert({
            'id':_options.message.id+"_view",
            'style':'alert-default',
            'position':'b-r',
            'content':dialog,
            'delaytime':options.viewTime,
            'callback':function(){
                // alert('返回函数！')
            }
        })
        alert = $("#"+_options.message.id+"_view");
        alert.children().first().width(0).hide();
        alert.children().last().css({
            // "margin-left":"-28px"
        });
        alert.css("padding","0");
        alert.find("li").each(function(index, li){
            $(li).click(function(){
                var aid = $(this).attr("id");
                aid = aid.split("_")[0];
                if(_function.messageClick){
                    _function.messageClick(aid, mess)
                }
                // _function.deleteMessage(aid)
            })
        })
        alert.find("#view_checkbox").click(function(){
            noView = $(this).prop("checked");
        })
        alert.find("#view_button").click(function(){
            alert.hide()
            if(noView){
                framework.userjson.message.message = [];
                _function.refreshMessCounts()
                andy.loaddata(options.viewApi,{"id":messIds}, function(){})
            }
        })
        andy.perform($(".m-alertbox"))
        andy.layout($(".m-alertbox"))
    }

    _function.refreshMessCounts = function(){
        var messageCell = $("#"+_options.message.id);
        var messLength = 0;
        if(framework.userjson.message.message){
            messLength = framework.userjson.message.message.length
        }
        if(messageCell.children().length>2){
            messageCell.find("span").text(messLength)
        }else{
            messageCell.append("<span class='u-point danger'>"+messLength+"</span>")
        }
        if(messLength == 0){
            messageCell.find("span").remove()
        }
        
    }

    _function.showMessage = function(data){
        if(data && data.length>0){
            _function.alertMessage()
        }
        if(_function.messageHanld == null){
            var messageCell = $("#"+_options.message.id);
            var options = messageCell.data("json");
            _function.refreshMessCounts()
            if(options.time){
                options.time = parseInt(options.time)
                _function.messageHanld = setInterval(function(){
                    var idarr = [];
                    var mess = framework.userjson.message.message;
                    for(var i in mess){
                        idarr.push(mess[i].id)
                    }
                    andy.loaddata(options.api, {id:idarr}, function(data){
                        // _function.setMessage(data, options)
                        var mess = framework.userjson.message.message;
                        var centerFloat = $('#an_centerfloat');
                        for(var i in data){
                            mess.push(data[i])
                        }
                        _function.showMessage(data)
                        if(centerFloat.attr("typename") == "message"){
                            _function.setMessage(mess, options)
                        }
                        _function.refreshMessCounts()
                        
                    })
                }, options.time)
            }
            
        }
    }

    _function.message = function(options){
        options.event_click = function(e){
            var centerFloat = _function.floatbox("message")
            var mess = framework.userjson.message.message || options.message || {};
            _function.setMessage(mess, options)
        }
    }
    _function.head = function(options){
        options.event_click = function(e){
            //var userbox=$(".userbox");
//            if(userbox.hasClass('hidden')){
//                userbox.removeClass('hidden');
//                userbox.animate({height:"51px"},100);
//            }else{
//                userbox.animate({height:"0px"},100,function(){
//                    userbox.addClass('hidden');
//                });
//            }
        }
    }
    _function.refresh = function(options){
        options.event_click = function(e){
            document.getElementById('stage').contentWindow.location.reload(true);
            // $("#stage").attr("src", $("#stage").attr("src"))
        }
    }

    // 注销操作
    _function.loginout = function(userjson, options, callback, type){
        var loginoutApi = options.api;
        var operateType = type||"exit";//"exit","lock"
        var callback = callback || function(){};

        // 跳转注销页面
        $(document).an_dialog({
            modalval:true,
            massage: {
                type: '提示',
                content: '是否注销?'
            },
            buttons: [{
                text: '注销',
                cls:"success",
                handler: function (e) {
                    // alert("点击了OK");
                    window.top.location.href=loginoutApi;
                    e.data.an_dialog("close");
                }
            }, {
                text: '取消',
                handler: function (e) {
                    e.data.an_dialog("close");
                }
            }]
        });
        // andy.loaddata(loginoutApi, {
        //     id:userjson.id,
        //     type:operateType
        // }, callback)
    }
    _function.login = function(userjson,options, value){
        var lockScreen = $("#lockscreen")
        var mess = lockScreen.find(".mess")
        var loginApi = options.login.login;
        if(value != ""){
            andy.loaddata(loginApi, {
                "id":userjson.id,
                "password":value
            }, function(data, mess){
                if(data){
                    // 收回锁屏
                    andy.floatbox(lockScreen)
                }else{
                    mess = lockScreen.find(".mess")
                    mess.text("密码错误!");
                }
            })
        }else{
            mess.text("请输入登录密码!");
        }
    }
    _function.loginlock = function(userjson, options){
        var lockfun = function(){
            var str = "<div class='u-float top lock hide' id='lockscreen' an-float option = 'click'>"+
            "<div class='f-p'><div class='h4 f-p-sm f-p-t-n f-p-l-n f-p-r-n'>锁屏</div>"+
            "<div class='vatar f-p-b-sm f-info-c'><img src='"+_function.resourcesUrl+userjson.userhead+"' class='bigavatar'></div>"+
            "<div class='f-p-lg f-info-c f-p-t-n f-color-white md'>"+userjson.username+"</div>"+
            "<div class='f-p-lg f-info-c f-p-t-n mess'>您的登录已经过期，或进入锁屏状态！</div>"+
            "<div class='f-p-xs f-clear'>"+
            "<input class='u-input passwordInput' type='password' placeholder='输入密码' style='width: 260px'>"+
            "</div><div class='f-p-sm f-info-c'><a class='u-btn login' style='width:260px' href='javascript:void(0);'>登录</a></div>"+
            "<div class='f-info-c'> <a class='u-btn link sm changeLogin' style='width:260px' href='javascript:void(0);'>切换账号登录</a> </div>"+
            "</div></div>";
            var fw = $("#framework");
            fw.append(str)
            var lockScreen = $("#lockscreen")
            var pwInput = $(".passwordInput")
            var login = $(".login")
            var changeLogin = $(".changeLogin")
            andy.floatbox(lockScreen)
            changeLogin.click(function(){
                _function.loginout(userjson, options)
            })
            login.click(function(){
                _function.login(userjson,options, pwInput.val())
            })
        }
        _function.loginout(userjson, options, function(){
            lockfun()
        }, "lock")
    }
    _function.mainclose = function(options){
        options.event_click = function(e){
            var centerFloat = _function.floatbox("mainclose")
            var title = "<div class='h4 f-p-sm f-p-t-n f-p-l-n f-p-r-n'>账户注销</div>";
            centerFloat.children().append(title)
            if(framework.userjson){
                var userjson = framework.userjson;
                var head = _function.resourcesUrl?_function.resourcesUrl+userjson.userhead:"";
                var userHead = "<div class='f-p-lg f-p-b-md f-info-c'><img src='"+head+"' class='bigavatar'></div>";
                centerFloat.children().append(userHead)
                var name = "<div class='f-p-lg f-info-c f-p-t-n f-color-white'>"+userjson.username+"</div>";
                centerFloat.children().append(name)

                var btn = "<div class='f-p-xs f-p-t-n f-info-c'>"+
                "<a class='u-btn sm loginout' style='width: 150px' href='javascript:void(0);'>确认注销账号</a></div>";
                // "<div class='f-p-xs f-p-t-n f-info-c'>"+
                // "<a class='u-btn sm loginlock' style='width: 150px' href='javascript:void(0);'>暂时锁屏</a> </div>";
                centerFloat.children().append(btn)

                centerFloat.find(".loginout").click(function(){
                    _function.loginout(userjson,options)
                })
                centerFloat.find(".loginlock").click(function(){
                    _function.loginlock(userjson, options)
                })
            }
        }
    }
    // 样式切换
    _function.setStyle = function(obj){
        //皮肤装载
        var options = _options.mainstyle;
        function pageskin(){
            var page=$('#framework'),
            //     c=page.attr('color'),
                s=page.attr('styles');
            // page.attr("class","g-layout g-framework "+ c +" "+ s);
            $("[andyclass='changestyle']").attr("href", _function.cssUrl+s)
        }
        //系统换肤
        function changecolor(color){
            $('#framework').attr('color',color);
            pageskin();
        }
        function changestyles(styles){
            $('#framework').attr('styles',styles);
            pageskin();
        }
        // if(obj.color){
        //     var c = options.color[obj.color].split("-");
        //     c = c[c.length-1];
        //     changecolor(c);
        // }
        if(options.style){
            options.style[obj.style]?changestyles(options.style[obj.style].name):null;
        }
    }

    _function.mainstyle = function(options){
        options.event_click = function(e){
            var centerFloat = _function.floatbox("mainstyle")
            var stylebtn = $("#"+options.id)
            var obj = framework.userjson.framestyle||{};    
            // 创建内容
            var title = "<div class='h4 f-p-sm f-p-t-n f-p-l-n f-p-r-n'>皮肤设置</div>";
            var colorTitle = "<div class='f-p-sm f-p-l-n f-p-r-n'>色系</div><div class='f-p-b-sm'><div class='colorbox'></div></div>";
            var styleTitle = "<div class='f-p-sm f-p-l-n f-p-r-n f-clear'>皮肤风格</div><ul class='m-list img stylebox f-clear'></ul>";
            var structrueTitle = "<div class='f-p-sm f-p-l-n f-p-r-n f-clear'>框架</div><ul class='m-list img structruebox f-clear'></ul>";

            centerFloat.children().append(title)

            if(options.color){
                centerFloat.children().append(colorTitle)
                var colorbox = centerFloat.children().find(".colorbox");
                for(var i in options.color){
                    var colorClass = options.color[i];
                    colorbox.append("<a class='"+colorClass+"' color = '"+i+"'>&nbsp;</a>");
                }
                colorbox.find("a").click(function(e){
                    // var c = $(e.target).attr("class").split("-");
                    var c = $(e.target).attr("color");
                    // changecolor(c[c.length-1])
                    obj.color = c;
                    _function.setStyle(obj)
                })
            }
            if(options.style){
                centerFloat.children().append(styleTitle)
                var stylebox = centerFloat.children().find(".stylebox");
                for(var i in options.style){
                    var style = options.style[i];
                    stylebox.append("<li class='col-4'><a title='"+style.title+"'><img src='"+_function.resourcesUrl+style.img+"' stylename = '"+style.name+"' styleid = '"+i+"'><div class='title'>"+style.title+"</div></a></li>");
                }
                stylebox.find("a").click(function(e){
                    var s = $(e.target).attr("stylename");
                    var id = $(e.target).attr("styleid");
                    obj.style = id;
                    obj.id = options.templeteId;
                    
                    if($("[andyclass='changestyle']").length>0){
                        _function.setStyle(obj)
                    }else{
                        window.top.location.href=options.api+"?structrue="+obj.structrue+"&color="+obj.color+"&style="+obj.style+"&id="+obj.id;
                    }
                    
                    // options.api?andy.loaddata(options.api, obj, function(){}):null;
                })
            }
            if(options.structrue){
                centerFloat.children().append(structrueTitle)
                var structruebox = centerFloat.children().find(".structruebox");
                for(var i in options.structrue){
                    var structrue = options.structrue[i];
                    structruebox.append("<li class='col-4'><a title='"+structrue.title+"'><img src='"+_function.resourcesUrl+structrue.img+"' stylename = '"+structrue.name+"' styleid = '"+i+"' templeteId = '"+structrue.templeteId+"'><div class='title'>"+structrue.title+"</div></a></li>");
                }
                structruebox.find("a").click(function(e){
                    var s = $(e.target).attr("styleid");
                    obj.structrue = s;
                    obj.id = options.templeteId;
                    window.top.location.href=options.api+"?structrue="+obj.structrue+"&color="+obj.color+"&style="+obj.style+"&id="+obj.id;
//                    options.api?andy.loaddata(options.api, obj, function(data){
//                    	console.log(data)
//                    	window.location.href=data;
//                    }):null;
                    
                })
                
            }
        }
    }
    _function.options = function(options){
        options.event_click = function(e){
            var centerFloat = _function.floatbox("options")
        }
    }

    _function.setFunction = function(name, value){
        _function[name]?_function[name](value):_function[name]=function(value){};
    }

    _function.setToolBar = function(bar, jsonData, isPre){
        // 展示部分
        for(var i in _publicOptions){
            var obj = _publicOptions[i];
            var isHave = false;
            bar.find("a").each(function(index, a){
                if($(a).attr("id") == obj.id){
                    isHave = true;
                }
            })
            if(isHave == false){
                var icons = obj.icons?"<i class='iconfont'>"+obj.icons+"</i>":"<img src="+_function.resourcesUrl+obj.img+">";
                var str = "<a class = 'u-btn' id = '"+obj.id+"' title = '"+obj.title+"'"+
                " href = 'javascript:void(0);' >"+icons+"</a>";

                isPre?bar.prepend(str):bar.append(str);
                _function.setFunction(i, obj)
                obj.event_click?null:obj.event_click = function(){};
                var a = $("#"+obj.id);
                a.data("json", obj);
                a.click(function(e){
                    var a = $(e.target).is("a")?$(e.target):$(e.target).parents("a");
                    a.data("json").event_click(e)
                })
            }
        }

        for(var i = 0; i < jsonData.operation.length; i++){
            var name = jsonData.operation[i];
            var data = jsonData.operation[i];
            typeof name == "object"?name =jsonData.operation[i].name:null;
            var obj = _options[name] || jsonData.operation[i];
            (typeof data == "object") && (typeof obj == "object") ? obj = $.extend({}, obj, data):null;
            var icons = obj.icons?"<i class='iconfont'>"+obj.icons+"</i>":"<img src="+_function.resourcesUrl+obj.img+">";
            var str = "<a class = 'u-btn' id = '"+obj.id+"' title = '"+obj.title+"'"+
            " href = 'javascript:void(0);' >"+icons+"</a>";

            isPre?bar.prepend(str):bar.append(str);
            _function.setFunction(name, obj)
            obj.event_click?null:obj.event_click = function(){};
            var a = $("#"+obj.id);
            a.data("json", obj);
            a.click(function(e){
                var a = $(e.target).is("a")?$(e.target):$(e.target).parents("a");
                a.data("json").event_click(e)
            })
        }
        // 更多部分
        var moreStr = "<div class='item m-combo' options = 'changeTarget:false' id = 'more_combo' an-combo>"+
        " <a class='u-btn' combo='combo' title='更多操作'><i class='iconfont'>&#xe786;</i></a>"+
        "<ul class='combo m-menu' combo='combo' style='width:94px'></ul></div>";
        var more = jsonData.more&&jsonData.more.length>0?moreStr:"";
        more!= ""?bar.append(more):null;
        var ul = bar.find("#more_combo").find("ul");

        for(var j = 0; j < jsonData.more.length; j++){
            var name = jsonData.more[j];
            var data = jsonData.more[j];
            typeof name == "object"?name=jsonData.more[j].name:null;
            var obj = _options[name] || jsonData.more[j];
            ((typeof data == "object") && (typeof obj == "object")) ? obj = $.extend({},obj,data):null;
            var str = "<li listId = "+obj.id+"><a href='javascript:;'>"+
            "<i class='iconfont'>"+obj.icons+"</i>"+obj.title+"</a></li>";

            ul.append(str)
            _function.setFunction(name, obj)
            obj.event_click?null:obj.event_click = function(){};
            var li = $("[listId="+obj.id+"]").find("a");
            li.data("json", obj);
            li.click(function(e){
                var li = $(e.target);
                li = li.is("a")?li:li.parent();
                li.data("json").event_click(e)
            })
        }
        // 生成操作栏 并执行功能
        ul.find("li").length>0&&andy.perform?andy.perform(bar):null;
    }
    win.fw_function = _function;
})(jQuery, window);