(function ($, win) {
    var _module = {};
    // 加载扩展方法
    var _function = win.fw_function || {};
    // 基础配置 默认配置项
    /*
       id:框架页面 dom id
       api:加载数据地址
       data:初始化配置
    */
    var _options = {
        id:{
            center:"an_center",
            username:"an_username",
            jobs:"an_jobs",
            framework:"framework",
            systemlist:"an_navmore",
            topnav:"an_topnav",
            toolbar:"an_toolbar",
            userhead:"an_userhead",
            stage:"stage",
            sidemenu:"an_sidemenu"
        },
        api:{
            systemlist:"",
            framework:"",
            user:""
        },
        data:{
            user:"",
            framework:""
        },
        icons:{
            defaultIcon:"&#xe642;"
        }
    };

    // 切换内容页面
    _module.loadUrl = function(url){
        $("#stage").attr("src", url)
    }

    // 用户操作 ****************
    _module.identity = function(data){
        _module.topToolbar = $("#"+_options.id.toolbar);
        _function.identity = function(options){
            options.event_click = function(e){
                var centerFloat = _function.floatbox()
                var title = "<div class='h4 f-p-sm f-p-t-n f-p-l-n f-p-r-n'>账户身份</div>";
                centerFloat.children().append(title)
                if(framework.userjson){
                    var userjson = framework.userjson;
                    var head = _function.resourcesUrl?_function.resourcesUrl+userjson.userhead:"";
                    var userHead = "<div class='f-p-lg f-p-b-md f-info-c'><img src='"+head+"' class='bigavatar'></div>";
                    centerFloat.children().append(userHead)
                    var name = "<div class='f-p-lg f-info-c f-p-t-n f-color-white'>"+userjson.username+"</div>";
                    centerFloat.children().append(name)

                    var btn = "<div class='f-p-xs f-p-t-n f-info-c'><input class='m-combo post' options='isEnable:true' id="+_options.id.jobs+" ></div>";

                    centerFloat.children().append(btn)

                    jobs = $("#"+_options.id.jobs);
                    jobs.an_combo({
                        showData:options.joblists,
                        checked:[options.jobs],
                        comboSize:"xs",
                        onChange:function(li){
                            // 切换职能
                            var jobsUrl = li.attr("value");
                            var styleData = options.framestyle;
                            window.top.location.href=jobsUrl;//+"?structrue="+styleData.structrue+"&color="+styleData.color+"&style="+styleData.style;
                        }
                    })
                }
            }
        }
        _function.setToolBar(_module.topToolbar, {
            operation:[{
                name:"identity",
                jobs:data.jobs,
                joblists:data.joblists,
                framestyle:data.framestyle,
                id:"tool_identity",
                title:"弹出用户身份",
                img:"userwomen.png"
            }],
            more:[]
        }, true)
    }
    _module.setUser = function(data){
        var user = $("#"+_options.id.username);
        user?user.text(data.username):null;
        var head = $("#"+_options.id.userhead);
        head?head.attr("src",_function.resourcesUrl+data.userhead || _function.resourcesUrl+"userwomen.png"):null;
        var jobs = $("#"+_options.id.jobs);
        jobs?jobs.text(data.jobs):null;
        _module.identity(data)

        // 用户消息
        _function.setMessage(data.message.message, data.message);
        // 初始化颜色 样式
        // _function.setStyle(data.framestyle)
        var stylebtn = $("#tool_mainstyle");
        _module.userjson = data;
        data.framestyle?_function.setStyle(data.framestyle):null;
    }

    // 顶部操作 ****************
    _module.setToolBar = function(jsondata){
        _module.topToolbar = $("#"+_options.id.toolbar);
        // 调用扩展操作方法
        _function.setToolBar(_module.topToolbar, jsondata[0])
        // 不需要头像操作
        $("#tool_head")?$("#tool_head").hide():null;
        setTimeout(function(){
            andy.layout($(".nav").parent())
        }, 100)
    }

    // 操作栏
    _module.creatToolOperation = function(id){
        _module.iframeCenter = $("#"+_options.id.center);
        var str = "<div class='u-float right toolbox hide' id="+id+" an-float option='leave'>"+
        "<div class='f-p'></div></div>";
        _module.iframeCenter.prepend(str);
    }

    // 框架布局
    _module.frameLayout = function(){
        var mainJson = _module.framework.data("json");
        _module.setToolBar(mainJson.topoperation)
    }

    // 加载页面
    _module.setIframeUrl = function(url, type){
        _module.iframeStage = $("#"+_options.id.stage);
        type?window.location.href=url:_module.iframeStage.attr("src", url);
    }

    // 设置顶部系统菜单和导航
    _module.setTopNav = function(jsonurl){
        // var topdata = _module.topnav.data("json");
        var frameworkData = _module.framework.data("json");
        _module.topnav = $("#"+_options.id.topnav);
        _module.topnav.empty();
        var options = {
            url:jsonurl,
            checked:[frameworkData.sidemenu]
        }
        if(typeof jsonurl == "object"){
            options = {
                checked:[frameworkData.sidemenu],
                urlData:jsonurl
            }
        }
        _module.topnav.an_topnav(options)
        _module.topnav.an_scrolltabs({
            isBarPlaceholder:true
        })
    }

    _module.setSystemList = function(){
        var systemData = _module.systemlist.data("json");
        var frameworkData = _module.framework.data("json");
        var systemUl = _module.systemlist.find("ul");
        for(var i = 0; i < systemData.length; i++){
            var sd = systemData[i];
            var url = sd.url?sd.url:"javascript:;";
            var target = sd.target?sd.target:"";
            var dataurl = sd.data || "";
            var str = "<li id = '"+sd.id+"'><a href = '"+url+"' target='"+target+"' dataurl='"+dataurl+"'>"+
            "<i class='iconfont'>"+sd.icons+"</i><p>"+sd.text+"</p></a></li>";
            systemUl.append(str);
            $("#"+sd.id).data("json", sd)
            if(frameworkData.system != "" && frameworkData.system == sd.id){
                // 默认选项
                sd.children?_module.setTopNav(sd.children):null;
            }
        }
        systemUl.click(function(e){
            var t = $(e.target);
            t = t.find("a")[0]?t.find("a"):t.parent();
            t = t.is("li")?t.find("a"):t;
            var li = t.parent();
            li.data("json").children?_module.setTopNav(li.data("json").children):null;
        })

    }

    _module.setSideMenuById = function(systemId, menuId){
    }

    // 初始化数据加载 *********************
    _module.initSystem = function(){
        var opid = _options.id;
        // 这里需要拆分systemApi 里面包含了 系统导航和 顶部导航
        // var systemData,topData;
        // systemData = [];
        // topData = [];
        _module.topnav = $("#"+opid.topnav);
        _module.systemlist = $("#"+opid.systemlist);
        andy.loaddata(_options.api.systemlist,null, function(data, e){
            // for(var i = 0; i < data.length; i++){
            //  data[i].show == "top"?topData.push(data[i]):systemData.push(data[i]);
            // }
            // _module.topnav.data("json", topData)
            // _module.setTopNav()
            // _module.systemlist.data("json", systemData)
            // _module.setSystemList()
            _module.systemlist.data("json", data)
            _module.setSystemList()
        })

    }

    _module.initUser = function(){
        andy.loaddata(_options.api.user, function(data, e){
            _module.setUser(data[0])
            if(data[0].message){
                _function.showMessage(data[0].message.message)
            }
        })
    }

    _module.initFrameWork = function(){
        _module.framework = $("#"+_options.id.framework);
        andy.loaddata(_options.api.framework, function(data){
            _module.framework.data("json", data[0])
            _module.frameLayout()
            _module.setIframeUrl(data[0].defaultUrl)
            // 加载用户信息
            _module.initUser()
            // 生成系统菜单和顶部导航
            _module.initSystem()
        })
    }

    _module.init = function(options){
        _options = $.extend({}, _options, options);
        // 生成框架设置
        _module.initFrameWork()
    }

    win.framework = _module;
})(jQuery, window);