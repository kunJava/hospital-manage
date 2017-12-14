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
            navname:"an_navname",
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

    // 更新在线人数
    _module.setPeopleCounts = function(counts){
        $("#"+_options.id.foot).find(".counts").html("<i class='iconfont'>&#xe631;</i>"+counts+"人在线");
    }

    // 系统名
    _module.setNavName = function(name){
        $("#"+_options.id.navname).find("span").text(name)
    }

    // 用户操作 ****************
    _module.setUser = function(data){
        var user = $("#"+_options.id.username);
        user?user.text(data.username):null;
        var head = $("#"+_options.id.userhead);
        head?head.attr("src",_function.resourcesUrl+data.userhead || _function.resourcesUrl+"userwomen.png"):null;
        var jobs = $("#"+_options.id.jobs);
        // jobs?jobs.text(data.jobs):null;
        if(jobs){
            var jobStr = "<input class='m-combo post' options='isEnable:true' id="+_options.id.jobs+" >";
            jobs.replaceWith(jobStr)
            jobs = $("#"+_options.id.jobs);
            jobs.an_combo({
                showData:data.joblists,
                checked:[data.jobs],
                comboSize:"xs",
                onChange:function(li){
                    // 切换职能
                    var jobsUrl = li.attr("value");
                    var styleData = data.framestyle;
                    window.top.location.href=jobsUrl;//+"?structrue="+styleData.structrue+"&color="+styleData.color+"&style="+styleData.style;
                }
            })
        }

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

    // 设置侧边菜单 *******************
    _module.setSideMenu = function(jsonurl, menuId){
        _module.sidemenu = $("#"+_options.id.sidemenu);
        _module.sidemenu.empty();

        var menuId = menuId?menuId:[];

        var options = {
            url:jsonurl,
            checked:menuId,
            autoHide:true
        }
        if(typeof jsonurl == "object"){
            var topdata,sidedata;
            topdata = [];
            sidedata = [];
            for(var i = 0;i < jsonurl.length; i++){
                jsonurl[i].show == "top"?topdata.push(jsonurl[i]):sidedata.push(jsonurl[i]);
            }
            if(topdata.length>0){
                _module.topnav.data("json", topdata);
                _module.setTopNav()
            }
            options = {
                urlData:sidedata,
                checked:menuId,
                autoHide:true
            }
        }
        _module.sidemenu.an_sidemenu(options)

    }

    // 设置顶部系统菜单和导航
    _module.setTopNavChecked = function(id){
        // _module.getNewMenuId
        // console.log(_module.topnav.data("json"))
        _module.topnav.an_topnav("checked", [id])
    }
    _module.clearTopNavChecked = function(){
        _module.topnav.an_topnav("clearChecked")
    }
    _module.setTopNav = function(){
        var frameworkData = _module.framework.data("json");
        var topdata = _module.topnav.data("json");
        var sidedata = [];
        _module.topnav.empty();

        // 如果main.json里面配置了sidemenu 验证topdata是否有children
        for(var i = 0; i < topdata.length; i++){
            var t = topdata[i];
            if(frameworkData.topnav == t.id){
                _module.setSideMenu(t.children)
            }
        }
        _module.topnav.data("json", topdata)
        _module.topnav.an_topnav({
            downMenu:false,
            isFitParent:true,
            checked:[frameworkData.topnav],
            urlData:topdata,
            onClick:function(li){
                var lidata = li.data("json");
                var menuleft = $(".framework-left");
                if(lidata.children && lidata.children.length>0){
                    menuleft.show()
                    menuleft.width(_module.menuLeftWidth)
                    _module.setSideMenu(lidata.children)
                }else{
                    menuleft.width() > 0 ?_module.menuLeftWidth = menuleft.width():null;
                    menuleft.width(0)
                    menuleft.hide()
                }
                andy.layout($("body"))
                _module.setNavName(lidata.text)
            }
        })
    }

    // 根据系统id更新侧边导航
    /*
        systemId:系统id
        menuId:[一级id,二级id]
    */
    _module.getNewMenuId = function(data, menuId){
        var arr = [];
        var find = false;
        var check = false;
        var parent = null;
        var parentId = null;

        function checkParent(c, par){
            for(var i = 0;i<c.length;i++){
                if(check){break;}
                if(c[i].id == parentId){
                    par?forParent(par, parentId):null;
                    check = true;
                    break;
                }else{
                    if(c[i].children && c[i].children.length > 0){
                        checkParent(c[i].children, c[i])
                    }
                }
            }
        }

        function forParent(parent, id){
            for(var i = 0; i < parent.children.length; i ++){
                if(parent.children[i].id == id){
                    arr.unshift(parent.id)
                    parentId = parent.id;
                    checkParent(data)
                }
            }
        }
        function go(c){
            for(var i = 0;i<c.length;i++){
                if(find){break;}
                if(c[i].id == menuId){
                    arr.push(menuId);
                    find = true;
                    parent?forParent(parent, menuId):null;
                    break;
                }else{
                    if(c[i].children && c[i].children.length > 0){
                        parent = c[i];
                        go(c[i].children)
                    }
                }
            }
        }
        go(data)
        return arr;
    }
    _module.setSideMenuById = function(systemId, menuId){
        var systemData = _module.systemlist.data("json");
        for(var i = 0; i < systemData.length; i++){
            var sd = systemData[i];
            if(systemId == sd.id){
                // 默认选项
                var newMenuId = _module.getNewMenuId(sd.children, menuId);
                var firstId = newMenuId[0];
                var sdChild = sd.children;
                for(var c in sdChild){
                    if(sdChild[c].id == firstId && sdChild[c].show == "top"){
                        sdChild = sdChild[c].children;
                        newMenuId.shift()

                        sdChild?_module.setSideMenu(sdChild, newMenuId):null;
                        break;
                    }
                }
                sdChild?_module.setSideMenu(sdChild, newMenuId):null;
            }
        }
        _module.clearTopNavChecked()
    }

    // 初始化数据加载 *********************
    _module.initSystem = function(){
        var opid = _options.id;
        // 这里需要拆分systemApi 里面包含了 系统导航和 顶部导航
        var systemData,topData;
        systemData = [];
        topData = [];
        _module.topnav = $("#"+opid.topnav);
        _module.systemlist = $("#"+opid.systemlist);
        andy.loaddata(_options.api.systemlist,null, function(data, e){
            // for(var i = 0; i < data.length; i++){
            //     data[i].show == "top"?topData.push(data[i]):systemData.push(data[i]);
            // }
            _module.topnav.data("json", data)
            _module.setTopNav()
            // _module.systemlist.data("json", systemData)
            // _module.setSystemList()

            // 加载用户信息
            _module.initUser()
        })

    }

    _module.initUser = function(){
        andy.loaddata(_options.api.user, function(data, e){
            // _module.setUser(data[0])
            _module.userjson = data[0];
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

            // 生成系统菜单和顶部导航
            _module.initSystem()

        })
    }

    _module.init = function(options){
        _options = $.extend({}, _options, options);
        // 生成框架设置
        _module.initFrameWork()
    }

    win.sidemenu = function(){
        $(".framework-left").toggleClass("min")
        andy.layout($("body"))
        if($(".framework-left").hasClass("min")){
            // $(".toplogo").hide()
        }else{
            // $(".toplogo").show()
        }
    }

    win.framework = _module;
})(jQuery, window);