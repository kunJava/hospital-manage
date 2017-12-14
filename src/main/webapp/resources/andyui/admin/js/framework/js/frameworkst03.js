(function($, win) {
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
        id: {
            center: "an_center",
            username: "an_username",
            jobs: "an_jobs",
            framework: "framework",
            systemlist: "an_navmore",
            topnav: "an_topnav",
            toolbar: "an_toolbar",
            userhead: "an_userhead",
            stage: "stage",
            navname:"an_navname",
            sidemenu: "an_sidemenu"
        },
        api: {
            systemlist: "",
            framework: "",
            user: ""
        },
        data: {
            user: "",
            framework: ""
        },
        icons: {
            defaultIcon: "&#xe642;"
        }
    };

    // 切换内容页面
    _module.loadUrl = function(url) {
        $("#stage").attr("src", url)
    }

    // 更新在线人数
    _module.setPeopleCounts = function(counts) {
        $("#" + _options.id.foot).find(".counts").html("<i class='iconfont'>&#xe631;</i>" + counts + "人在线");
    }

    // 系统名
    _module.setNavName = function(name) {
        $("#" + _options.id.navname).find("span").text(name)
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

    // 用户操作 ****************
    _module.setUser = function(data) {
        var user = $("#" + _options.id.username);
        user ? user.text(data.username) : null;
        var head = $("#" + _options.id.userhead);
        head ? head.attr("src", _function.resourcesUrl + data.userhead || _function.resourcesUrl + "userwomen.png") : null;
        var jobs = $("#" + _options.id.jobs);
        // jobs?jobs.text(data.jobs):null;
        if (jobs) {
            var jobStr = "<input class='m-combo post' options='isEnable:true' id=" + _options.id.jobs + " >";
            jobs.replaceWith(jobStr)
            jobs = $("#" + _options.id.jobs);
            jobs.an_combo({
                showData: data.joblists,
                checked: [data.jobs],
                comboSize: "xs",
                onChange: function(li) {
                    // 切换职能
                    var jobsUrl = li.attr("value");
                    var styleData = data.framestyle;
                    window.top.location.href = jobsUrl; //+"?structrue="+styleData.structrue+"&color="+styleData.color+"&style="+styleData.style;
                }
            })
        }

        // 用户消息
        _function.setMessage(data.message.message, data.message);
        // 初始化颜色 样式
        // _function.setStyle(data.framestyle)
        var stylebtn = $("#tool_mainstyle");
        _module.userjson = data;
        data.framestyle ? _function.setStyle(data.framestyle) : null;
    }

    // 顶部操作 ****************
    _module.setToolBar = function(jsondata) {
        _module.topToolbar = $("#" + _options.id.toolbar);
        // 调用扩展操作方法
        _function.setToolBar(_module.topToolbar, jsondata[0])
    }

    // 操作栏
    _module.creatToolOperation = function(id) {
        _module.iframeCenter = $("#" + _options.id.center);
        var str = "<div class='u-float right toolbox hide' id=" + id + " an-float option='leave'>" +
            "<div class='f-p'></div></div>";
        _module.iframeCenter.prepend(str);
    }

    // 框架布局
    _module.frameLayout = function() {
        var mainJson = _module.framework.data("json");
        _module.setToolBar(mainJson.topoperation)
    }

    // 加载页面
    _module.setIframeUrl = function(url, type) {
        _module.iframeStage = $("#" + _options.id.stage);
        type ? window.location.href = url : _module.iframeStage.attr("src", url);
    }

    // 设置侧边菜单 *******************
    _module.setSideMenu = function(jsonurl) {
        _module.sidemenu = $("#" + _options.id.sidemenu);
        _module.sidemenu.empty();
        var options = {
            url: jsonurl,
            autoHide: true
        }
        if (typeof jsonurl == "object" && jsonurl && jsonurl.length >0) {
            options = {
                urlData: jsonurl,
                autoHide: true
            }
        }
        _module.sidemenu.an_sidemenu(options)
    }

    // 设置顶部系统菜单和导航
    _module.setTopNav = function(jsonurl) {
        var frameworkData = _module.framework.data("json");
        _module.topnav = $("#" + _options.id.topnav);
        _module.topnav.empty();

        if (typeof jsonurl == "string") {
            andy.loaddata(jsonurl, function(data) {
                _module.topnav.an_topnav({
                        urlData: data,
                        checked: [frameworkData.sidemenu],
                        downMenu: false,
                        onClick: function(li) {
                            var lijosn = li.data("json")
                            lijosn.children ? _module.setSideMenu(lijosn.children) : null;
                        }
                    })
                    // 默认侧边选项
                for (var i in data) {
                    if (data[i].id == frameworkData.sidemenu) {
                        data[i].children ? _module.setSideMenu(data[i].children) : null;
                    }
                }
            })
        } else {
            var topdata = jsonurl;
            for (var i = 0; i < topdata.length; i++) {
                var t = topdata[i];
                if (frameworkData.topnav == t.id) {
                    _module.setSideMenu(t.children)
                }
            }

            _module.topnav.data("json", topdata)
            _module.topnav.an_topnav({
                downMenu: false,
                isFitParent: true,
                checked: [frameworkData.topnav],
                urlData: topdata,
                onClick: function(li) {
                    var lidata = li.data("json");
                    if (lidata.children && lidata.children.length > 0) {
                        _module.setSideMenu(lidata.children)
                    }else{
                        _module.sidemenu = $("#"+_options.id.sidemenu);
                        _module.sidemenu.empty();
                    }
                    _module.setNavName(lidata.text)
                }
            })
        }
    }

    _module.setSystemList = function() {
        var systemData = _module.systemlist.data("json");
        var frameworkData = _module.framework.data("json");
        var systemUl = _module.systemlist.find("ul");
        for (var i = 0; i < systemData.length; i++) {
            var sd = systemData[i];
            var url = sd.url ? sd.url : "javascript:;";
            var target = sd.target ? sd.target : "";
            var icon = sd.icons || sd.icons != undefined ? sd.icons : _options.icons.defaultIcon;
            var str = "<li id = '" + sd.id + "'><a href = '" + url + "' target='" + target + "' dataurl='" + sd.data + "'>" +
                "<i class='iconfont'>" + icon + "</i><p>" + sd.text + "</p></a></li>";
            systemUl.append(str);
            $("#" + sd.id).data("json", sd)
            if (frameworkData.system != "" && frameworkData.system == sd.id) {
                // 默认选项
                sd.children ? _module.setTopNav(sd.children) : null;
            }
        }
        systemUl.click(function(e) {
            var t = $(e.target);
            t = t.find("a")[0] ? t.find("a") : t.parent();
            t = t.is("li") ? t.find("a") : t;
            var li = t.parent();
            _module.sidemenu = $("#" + _options.id.sidemenu);
            _module.sidemenu.empty();
            andy.layout(_module.sidemenu.parent())
            li.data("json").children ? _module.setTopNav(li.data("json").children) : null;
            
            _module.setNavName(li.find("p").text())
        })


    }

    // 初始化数据加载 *********************

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

    _module.initUser = function() {
        andy.loaddata(_options.api.user, function(data, e) {
            _module.setUser(data[0])
            if(data[0].message){
                _function.showMessage(data[0].message.message)
            }
        })
    }

    _module.initSystem = function() {
        var opid = _options.id;
        // 这里需要拆分systemApi 里面包含了 系统导航和 顶部导航
        var systemData, topData;
        systemData = [];
        topData = [];
        _module.topnav = $("#" + opid.topnav);
        _module.systemlist = $("#" + opid.systemlist);
        andy.loaddata(_options.api.systemlist, null, function(data, e) {
            _module.systemlist.data("json", data)
            _module.setSystemList()
                // 加载用户信息
            _module.initUser()
        })

    }

    _module.initFrameWork = function() {
        _module.framework = $("#" + _options.id.framework);
        andy.loaddata(_options.api.framework, function(data) {
            _module.framework.data("json", data[0])
            _module.frameLayout()
            _module.setIframeUrl(data[0].defaultUrl)

            // 生成系统菜单和顶部导航
            _module.initSystem()

        })
    }

    _module.init = function(options) {
        _options = $.extend({}, _options, options);
        // 生成框架设置
        _module.initFrameWork();
		
		// 用户信息开关
		$('.userbox').before("<div class='f-clear f-info-c' id='userboxbar'><i class='iconfont'>&#xe7bb;</i></div>");
        $("#userboxbar").click(function(){
			var bar=$(this);
			var icon=$(this).find('.iconfont');
	    	$('.userbox').slideToggle('fast',function(){
				if($(".userbox").is(":hidden")){
					icon.html('&#xe611;')
				}else{
					icon.html('&#xe7bb;')
				}
			});
	    })
    }

    win.sidemenu = function() {
        $(".framework-left").toggleClass("min")
        andy.layout($("body"))
    }

    win.framework = _module;
})(jQuery, window);