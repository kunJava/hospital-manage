/*an_datetime */
/**
 * 时间选择器
 * author:赵祎
 **/

(function ($) {
    $.fn.extend({
        an_datetime:function(){
            var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;
            var _options = $.extend({
                elem: '',
                valuename:"xx",
                showEvent:"click",
                format: "YY/MM/DD hh:mm:ss",
                getUrl: '/ApiBeta1.1/module/form/an-dateedit/an-dateeditjson.json',
                plugins:"datetime",//   calendar为日历备注   datetime 为日期选择器 
                time:true,
                // name:"laydatename",
                min: '2010-1-1 00:00:00', //设定最小日期
                max: '2020-12-30 23:59:59', //设置最大日期
                istime: true,
                head:"show",   //是否隐藏头部 hide
                combo:false,  //是否为combo结构
                istoday: true, //今天按钮
                display:"block",
                tagging:false, //是否显示角标内容 可填ul 和newFunc
                func:function(){},
                reset: true,  //清空按钮
                enter:true,  //确认按钮
                corner:false,   //   角标设置 
                memo:false,     //备注按钮
                price:false,    //是否以价格表样式展示
                cOnce:false, //点击离开
                choose: false //时间联动
            }, options);
            var laydate = $(this);
            // 获取 设置对象
            var getOption = laydate.attr("options");
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
            var elem=_options.elem
            if(funstyle != ""){
                // 操作方法
            }else{
                // 生成结构
                if(_options.plugins=="datetime"){
                    if(_options.choose==true){
                        var gCombostr =  "<input name = '"+_options.elem+"' id = '"+_options.elem+"' class = 'f-hidden' value = ''/>"
                         var combostr =" <div class='m-calendar'><div id='"+_options.elem+"Mid'><div class='leftDate lor' style='width:50%;float:left;'><div class='laydate-top'>"+
                             "<div class='laydate-ym' id='laydate-ym' >"+
                             "<a class='laydate-left-y' id='yl'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-m' id='ml'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-info'></a>"+
                             "<a class='laydate-right-m' id='mr'><i class='iconfont'>&#xe607;</i></a>"+
                             "<a class='laydate-right-y' id='yr'><i class='iconfont'>&#xe607;</i></a>"+
                            "</div></div>"+
                            "  <div class='laydate-center'><table class='laydate-table' id='laydate-table'></table></div><div class='laydate-bottom'><ul id='laydate-hms'>"+
                            "  </ul><div class='laydate-time' id='laydate-time'></div></div></div><div class='rightDate lor' style='width:50%;float:right;'><div class='laydate-top'>"+
                             "<div class='laydate-ym' id='laydate-ym' >"+
                             "<a class='laydate-left-y' id='yl'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-m' id='ml'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-info'></a>"+
                             "<a class='laydate-right-m' id='mr'><i class='iconfont'>&#xe607;</i></a>"+
                             "<a class='laydate-right-y' id='yr'><i class='iconfont'>&#xe607;</i></a>"+
                            "</div></div>"+
                            "  <div class='laydate-center'><table class='laydate-table' id='laydate-table'></table></div><div class='laydate-bottom'><ul id='laydate-hms'></ul>"+
                            "  <div class='laydate-time' id='laydate-time'></div></div></div></div><div class='laydate-btn'></div></div>";
                    }else{
                        var gCombostr =  "<input name = '"+_options.elem+"' id = '"+_options.elem+"' class = 'f-hidden' value = ''/>"
                            // "<input type='text' class='laydate-icon u-input' name='"+_options.name+"' placeholder='请输入日期' combo = 'combo' />"
                           var combostr =" <div class='m-calendar'><div class='leftDate lor'><div class='laydate-top'>"+
                             "<div class='laydate-ym' id='laydate-ym' >"+
                             "<a class='laydate-left-y' id='yl'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-m' id='ml'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-info'></a>"+
                             "<a class='laydate-right-m' id='mr'><i class='iconfont'>&#xe607;</i></a>"+
                             "<a class='laydate-right-y' id='yr'><i class='iconfont'>&#xe607;</i></a>"+
                            "</div></div>"+
                            "  <div class='laydate-center'><table class='laydate-table' id='laydate-table'></table></div>"+
                            "  <div class='laydate-bottom'><ul id='laydate-hms'></ul>"+
                            "  <div class='laydate-time' id='laydate-time'></div><div class='laydate-btn'></div></div>"+
                            " </div></div>";
                    }
                    var strSetYY="<table class='laydate-table laydate-table-y' id='laydate-tables-y' style=' display: none'>"+
                        "<tbody id='tbody-laydate-y'></tbody></table>";
                    var strSetYYH="<div class='laydate-ym' id='laydate-y' style=' display: none'>"+
                             "<a class='laydate-left-y' id='yll'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-info'>2010年-2017年</a>"+
                             "<a class='laydate-right-y' id='yrr'><i class='iconfont'>&#xe607;</i></a>"+
                           " </div>"
                    var strSetMM="<table class='laydate-table laydate-table-y' id='laydate-tables-m' style=' display: none'>"+
                        "<tbody id='tbody-laydate-m'></tbody></table>";
                    var strSetMMH="<div class='laydate-ym' id='laydate-m' style=' display: none'>"+
                             // "<a class='laydate-left-m' id='yl'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-info'></a>"+
                             // "<a class='laydate-right-m' id='yr'><i class='iconfont'>&#xe607;</i></a>"+
                            "</div>";
                    var strSetDD="<thead></thead><tbody></tbody>";   //生成结构 
                    var strSetOk="<a id='laydate-ok' style='display: block;'>确认</a>";
                    var strSetClear="<a id='laydate-clear' style='display: block;'>清空</a>";
                    var strSetToday="<a id='laydate-today' style='display: block;'>今天</a>";
                    var strSethh="<li><input readonly id='hh'>时</li>";
                    var strSetmi="<li><input readonly id='mm'>分</li>";
                    var strSetss="<li><input readonly id='ss'>秒</li>";
                    var strSetTimehCho="<div class='laydte_hsmtex'></div>"+
                        "<div id='laydate-hmsno' class='laydate-hmsno' style='word-wrap:break-word;'></div>";
                    var theDate;  
                    // laydate.css("display","none");
                    // //console.log(laydate.parents(".m-combo").find('combo'))
                    laydate.parents(".m-combo").attr("id",_options.elem);
                    laydate = $("#"+_options.elem);
                    laydate.find('.u-group').find("input").addClass("laydate-icon u-input");
                    laydate.find('.u-group').find("input").attr("placeholder","请输入日期");
                    laydate.find('.u-group').append(gCombostr);
                    // "<input type='text' class='laydate-icon u-input' name='"+_options.name+"' placeholder='请输入日期' combo = 'combo' />"
                    laydate.find('.combo').html(combostr);
                    if (_options.choose==true){
                        laydate.find('.leftDate').css("width",'50%');
                        laydate.find('.rightDate').css("width",'50%');
                    }else{
                        var theWidth=laydate.find('.m-calendar').css("width");
                        laydate.find('.combo').css("width",theWidth);
                    }
                    var midDiv="";
                    if(_options.choose==true){
                        midDiv=_options.elem+"Mid";
                    }
                    var midDiv=_options.elem+'Mid';
                    // //console.log(midDiv)
                    laydate.data("options", _options)
                    var url = _options.getUrl;
                }else if(_options.plugins=="calendar"){   //日历备注插件
                    var combostr = " <div class='m-calendar ' id='"+_options.elem+"' >"+  
                        "  <div class='leftDate lor'><div class='laydate-top'>"+
                            "<div class='laydate-ym' id='laydate-ym' >"+
                             "<a class='laydate-left-y' id='yl'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-m' id='ml'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-info'>2017年8月</a>"+
                             "<a class='laydate-right-y' id='mr'><i class='iconfont'>&#xe607;</i></a>"+
                             "<a class='laydate-right-m' id='yr'><i class='iconfont'>&#xe607;</i></a>"+
                            "</div></div>"+
                        "  <div class='laydate-center'><table class='laydate-table' id='laydate-table'></table></div>"+
                        "  <div class='laydate-bottom'></div></div>"+
                        " </div>";
                    var strSetYY="<table class='laydate-table laydate-table-y' id='laydate-tables-y' style=' display: none'>"+
                        "<tbody id='tbody-laydate-y'><tr></tbody></table>";
                    var strSetYYH="<div class='laydate-ym' id='laydate-y' style=' display: none'>"+
                             "<a class='laydate-left-y' id='yl'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-info'>2010年-2017年</a>"+
                             "<a class='laydate-right-y' id='yr'><i class='iconfont'>&#xe607;</i></a>"+
                           " </div>";
                    var strSetMM="<table class='laydate-table laydate-table-y' id='laydate-tables-m' style=' display: none'>"+
                        "<tbody id='tbody-laydate-m'></tbody></table>";
                    var strSetMMH="<div class='laydate-ym' id='laydate-m' style=' display: none'>"+
                             "<a class='laydate-left-m' id='yl'><i class='iconfont'>&#xe614;</i></a>"+
                             "<a class='laydate-left-info'>2017年</a>"+
                             "<a class='laydate-right-m' id='yr'><i class='iconfont'>&#xe607;</i></a>"+
                            "</div>";
                    var strSetDD="<thead></thead><tbody id='tbody_"+_options.elem+"'></tbody>";
                    var theDate;     
                    laydate.css("display","none");
                    laydate.after(combostr);
                    laydate = $("#"+_options.elem);
                    laydate.data("options", _options);
                    var url = _options.getUrl;
                }
            };
            var tbody="#tbody_"+_options.elem;
            //生成时间组件
            var setNewLaydate = function(laydate){
                var setMenu = function(){           
                    if(_options.reset==true){
                        laydate.find(".laydate-btn").append(strSetClear);               
                    };
                    if(_options.istoday==true){
                       laydate.find(".laydate-btn").append(strSetToday);                       
                    };
                    if(_options.enter==true){
                        laydate.find(".laydate-btn").append(strSetOk);
                    };
                };
                //生成时间选择
                var setTimeCho=function(){
                    laydate.find("#laydate-time").append(strSetTimehCho);
                };
                    
                // 初始化
                function init(){
                    if(_options.plugins=="datetime"){
                    setMenu(_options);
                    setTimeCho();
                    laydate.data("isEnable",true);
                    laydate.data("isText",false);
                    }else if(_options.plugins=="calendar"){
                        laydate = $("#"+_options.elem);
                        laydate.data("isEnable",true);
                        laydate.data("isText",false);
                    };
                };
                // laydate = $("#"+_options.elem)
                   
                    // laydate.data("format","YYYY/MM/DD hh:mm:ss")
           

                // if(_options.combo==false){
                //         $(".m-calendar").css("display","block")
                //     }else {
                //         //执行操作
                //         andy.combo({
                //             isEnable:true,
                //             combo:laydate,
                //             showComplete:function(){
                //             }
                //         });
                //     }
                init()

                var d=new Date();
                var DD=d.getDate();  //获取当前几号
                var MM=d.getMonth();  //获取当前几月 
                var YY=d.getFullYear();  //获取当年哪年
                var hh=d.getHours();  //获取小时
                var mi=d.getMinutes(); //获取分
                var ss=d.getSeconds(); //获取秒
                var time=hh+":"+mi+":"+ss;
                //获取当前周几
                var weekDay=["日","一","二","三","四","五","六"];
                var WW = weekDay[d.getDay()];
                var theFormat = new Array(); 
                var theFormat=_options.format;
                var thisYear=YY;
                var thisMonth=MM+1;
                var thisDay=DD;
                var thisHour=hh;
                var thisMinute=mi;
                var thisSecond=ss;
                var rightData= [];
                var leftData=[];
                var dateType;
                var timesYMD;
                var timeshms;
                var min=_options.min;
                var minYear="";
                var minMonth="";
                var minDay="";
                var minHour="";
                var minMinute="";
                var minSecond="";
                var max=_options.max;
                var maxYear="";
                var maxMonth="";
                var maxDay="";
                var maxHour="";
                var maxMinute="";
                var maxSecond="";
                var midYear="mid";
                var midMonth="";
                var midDay="";
                var getInt=function(string){
                var reg = /\d+/g;
                var str = string;
                var ms = str.match(reg)
                return ms
                }
                var json_Obj={};
                var getJson=function(){  //获取json
                    andy.loaddata(_options.getUrl, function(d){
                        json_Obj=d;
                        setTheLaydate(".leftDate");
                   })
                }



                //判断日期格式  分解空格
                if(_options.plugins=="datetime"){
                    if(theFormat.indexOf(" ")==-1){
                        var timesYMD = theFormat.split('/');
                        if(timesYMD[0][1]!='YY'){
                            if(timesYMD[0][1]=='h'){
                                    dateType=1;
                                    laydate.find(".laydate-top").css("display","none");
                            }else{
                                dateType=0;
                                laydate.find(".laydate-top").find("#laydate-ym").css("display","none");
                                laydate.find(".laydate-top").find("#laydate-m").css("display","block");
                            }
                        }
                        for(y=0;y<timesYMD.length;y++){
                            if(timesYMD[y]=="YY"){
                                laydate.find("#laydate-table").after(strSetYY);
                                laydate.find("#laydate-ym").after(strSetYYH);
                            }else if(timesYMD[y]=="MM"){
                                laydate.find("#laydate-table").after(strSetMM);
                                laydate.find("#laydate-ym").after(strSetMMH);
                            }else if(timesYMD[y]=="DD"){
                                laydate.find("#laydate-table").append(strSetDD);
                            }
                        }
                        var timeshms=theFormat;
                        if(timeshms[0]!='h'){
                                dateType=1;
                            }
                        if(timeshms=="hh:mm"){
                            // $("#laydate-hms").css("display","block");
                            laydate.find("#laydate-hms").append(strSethh);
                            laydate.find("#laydate-hms").append(strSetmi);
                        }else if(timeshms=="mm:ss"){
                            laydate.find("#laydate-hms").append(strSetmi);
                            laydate.find("#laydate-hms").append(strSetss);
                        }else if(timeshms=="hh:mm:ss"){
                            laydate.find("#laydate-hms").append(strSethh);
                            laydate.find("#laydate-hms").append(strSetmi);
                            laydate.find("#laydate-hms").append(strSetss);
                        }
                    }else{
                        var theFormat = theFormat.split(' ');

                        var timesYMD = new Array();
                        var timeshms;
                        for(var t=0;t<theFormat.length;t++){
                             
                            timesYMD = theFormat[0].split('/');
                            timeshms = theFormat[1];             
                        }
                        for(y=0;y<timesYMD.length;y++){
                            if(timesYMD[0]!='YY'){
                                dateType=0;
                            }
                            if(timesYMD[y]=="YY"){
                                laydate.find("#laydate-table").after(strSetYY);
                                laydate.find("#laydate-ym").after(strSetYYH);
                            }else if(timesYMD[y]=="MM"){
                                laydate.find("#laydate-table").after(strSetMM);
                                laydate.find("#laydate-ym").after(strSetMMH);
                            }else if(timesYMD[y]=="DD"){
                                laydate.find("#laydate-table").append(strSetDD);
                                laydate.find("#laydate-table thead").prev().remove();
                            }
                        }
                        if(timeshms=="hh:mm"){
                            // $("#laydate-hms").css("display","block");
                            laydate.find("#laydate-hms").append(strSethh);
                            laydate.find("#laydate-hms").append(strSetmi);
                        }else if(timeshms=="mm:ss"){
                            laydate.find("#laydate-hms").append(strSetmi);
                            laydate.find("#laydate-hms").append(strSetss);
                        }else if(timeshms=="hh:mm:ss"){
                            laydate.find("#laydate-hms").append(strSethh);
                            laydate.find("#laydate-hms").append(strSetmi);
                            laydate.find("#laydate-hms").append(strSetss);
                        }
                    }
                }else if(_options.plugins=="calendar"){
                    var setTheDateLayDate=function(){
                        if(_options.head=="hide"){
                        laydate.find(".laydate-top").css("display","none");
                        laydate.find("tbody").remove()
                        laydate.find("#laydate-table thead").prev('tbody').remove();
                        laydate.find("#laydate-table").append(strSetDD);
                        laydate.find(".u-input").val(thisYear+"-"+thisMonth);
                        }else if(_options.head=="show"){
                        laydate.find("#laydate-table").after(strSetYY);
                        laydate.find("#laydate-table").after(strSetMM);
                        laydate.find("#laydate-table").append(strSetDD);
                        laydate.find("#laydate-table thead").prev().remove();
                        laydate.find(".u-input").val(thisYear+"-"+thisMonth);
                        }
                        
                    }
                }
                //设置底部时分秒
                var setThehms=function(event){
                    //获取当前点击的小时
                    var getHoverHour = function(event){
                        laydate.find(".laydate-hmsno span").hover(function(event){
                            $(this).click(function(event) {
                                var lor= getlor($(this))
                                var thisClick=($(this).html());
                                //将字符串转换为数字类型
                                thisHour=parseInt(thisClick,10);
                                console.log(lor)
                                if(_options.choose==true){
                                    if(lor==".leftDate"){
                                        console.log(midDiv)
                                        var leftArr=$("#"+midDiv).data("leftData");
                                        leftArr.thisHour=thisHour
                                    }else if(lor==".rightDate"){    
                                        var rightArr=$("#"+midDiv).data("rightData");
                                        rightArr.thisHour=thisHour
                                    }
                                }
                                laydate.find(lor).find("#hh").val(thisHour);
                                if(_options.cOnce==true){
                                    laydate.find(".laydate-time").css("display","none");
                                }else{
                                    laydate.find(".laydate-hmsno").mouseleave(function() {
                                        laydate.find(".laydate-time").css("display","none");
                                    });
                                }
                            });
                        });
                    };

                    //获取当前点击的分钟
                    var getHoverMinute = function(){
                        laydate.find(".laydate-hmsno span").hover(function(event){
                            $(this).click(function(event) {
                                var lor=getlor($(this))
                                var thisClick=($(this).html());
                                //将字符串转换为数字类型
                                thisMinute=parseInt(thisClick,10);
                                laydate.find(lor).find("#mm").val(thisMinute);
                                if(_options.choose==true){
                                    if(lor==".leftDate"){
                                        var leftArr=$("#"+midDiv).data("leftData");
                                        leftArr.thisMinute=thisMinute
                                    }else if(lor==".rightDate"){    
                                        var rightArr=$("#"+midDiv).data("rightData");
                                        rightArr.thisMinute=thisMinute
                                    }
                                }
                                if(_options.cOnce==true){
                                   laydate.find("#laydate-time").css("display","none");
                                }else{
                                    laydate.find(".laydate-hmsno").mouseleave(function() {
                                        laydate.find("#laydate-time").css("display","none");
                                    });
                                }
                            });
                        });
                    };

                    //获取当前点击的秒钟
                    var getHoverSecond = function(){
                        laydate.find(".laydate-hmsno span").hover(function(event){
                            $(this).click(function(event) {
                                var lor=getlor($(this))
                                var thisClick=($(this).html());
                                //将字符串转换为数字类型
                                thisSecond=parseInt(thisClick,10);
                                if(_options.choose==true){
                                    if(lor==".leftDate"){
                                        var leftArr=$("#"+midDiv).data("leftData");
                                        leftArr.thisSecond=thisSecond
                                    }else if(lor==".rightDate"){    
                                        var rightArr=$("#"+midDiv).data("rightData");
                                        rightArr.thisSecond=thisSecond
                                    }
                                }
                                
                                laydate.find("#ss").val(thisSecond);
                                if(_options.cOnce==true){
                                    laydate.find("#laydate-time").css("display","none");
                                }else{
                                    laydate.find(".laydate-hmsno").mouseleave(function() {
                                        laydate.find("#laydate-time").css("display","none");
                                    });
                                }
                            });
                        });
                    };

                    //弹出小时选择框
                    laydate.find("#hh").click(function(event) {
                        var lor=getlor($(this))
                        // //console.log($(this).parents(".lor").siblings().find('laydate-time'))
                        $(this).parents(".lor").siblings().find('.laydate-time').css("display","none")
                        // $(".laydate-table").css("height","230px");
                        laydate.find(lor).find("#laydate-time").removeClass("laydate-time1");
                        laydate.find(lor).find(".laydte_hsmtex").html("小时");
                            var str=""
                            for(var i=0;i<24;i++){
                                str+="<span>"+i+"</span>";
                            }
                            laydate.find(lor).find(".laydate-hmsno").html(str)
                        laydate.find(lor).find("#laydate-time").css("display","block");
                        getHoverHour(lor);
                    });

                    //弹出分钟选择框
                    laydate.find("#mm").click(function(event) {
                        var lor=getlor($(this))
                        $(this).parents(".lor").siblings().find('.laydate-time').css("display","none")
                        // $(".laydate-table").css("height","230px");
                        laydate.find(lor).find(".laydate-time").addClass("laydate-time1");
                        laydate.find(lor).find(".laydte_hsmtex").html("分钟");
                        var str=""
                        for(var i=0;i<60;i++){
                                str+="<span>"+i+"</span>";
                            }
                            laydate.find(lor).find(".laydate-hmsno").html(str);
                        laydate.find(lor).find("#laydate-time").css("display","block");
                        getHoverMinute(lor);
                    });

                    //弹出秒钟选择框
                    laydate.find("#ss").click(function(event) {
                        var lor=getlor($(this))
                         $(this).parents(".lor").siblings().find('.laydate-time').css("display","none")
                        // $(".laydate-table").css("height","230px")
                        laydate.find(lor).find(".laydate-time").addClass("laydate-time1")
                        laydate.find(lor).find(".laydte_hsmtex").html("秒钟");
                        var str=""
                        for(var i=0;i<60;i++){
                                str+="<span>"+i+"</span>";
                            }
                            laydate.find(lor).find(".laydate-hmsno").html(str);
                        laydate.find(lor).find("#laydate-time").css("display","block");
                        getHoverSecond(lor);
                    });
                }

                //设置时间为今天
                var setToday=function(){
                    laydate.find("#leftYears").hide();
                    laydate.find("#rightMonth").hide();
                    thisYear=YY;
                    thisMonth=MM+1;
                    thisDay=DD;
                    thisHour=hh;
                    thisMinute=mi;
                    thisSecond=ss;
                    if(_options.choose==true){
                        setTheLaydate(".rightDate");
                    }
                    setTheLaydate(".leftDate");
                    changeDate();
                }
                
                //获取最小时间
                var setMinTime=function(min){
                    if(min.indexOf(" ")==-1){
                        var timesMinYMD = new Array();
                        for(var t=0;t<min.length;t++){
                            timesMinYMD = theMin[0].split('-');
                        }
                        minYear=parseInt(timesMinYMD[0],10);
                        minMonth=parseInt(timesMinYMD[1],10);
                        minDay=parseInt(timesMinYMD[2],10);
                    }else{
                        var theMin = min.split(' ');
                        var timesMinYMD = new Array();
                        var timesMinhms = new Array();
                        for(var t=0;t<min.length;t++){
                            timesMinYMD = theMin[0].split('-');
                            timesMinhms = theMin[1].split(':');
                        }
                        minYear=parseInt(timesMinYMD[0],10);
                        minMonth=parseInt(timesMinYMD[1],10);
                        minDay=parseInt(timesMinYMD[2],10);
                        minHour=parseInt(timesMinhms[0],10);
                        minMinute=parseInt(timesMinhms[1],10);
                        minSecond=parseInt(timesMinhms[2],10);
                    };
                };
                //获取最大时间
                var setMaxTime=function(max){
                    if(max.indexOf(" ")==-1){
                        var timesMaxYMD = new Array();
                        for(var t=0;t<max.length;t++){
                            timesMaxYMD = theMin[0].split('-');
                        }
                        maxYear=parseInt(timesMaxYMD[0],10);
                        mxaMonth=parseInt(timesMaxYMD[1],10);
                        maxDay=parseInt(timesMaxYMD[2],10);
                    }else{
                        var theMax = max.split(' ');
                        var timesMaxYMD = new Array();
                        var timesMaxhms = new Array();
                        for(var t=0;t<max.length;t++){
                            timesMaxYMD = theMax[0].split('-');
                            timesMaxhms = theMax[1].split(':');
                        }
                        maxYear=parseInt(timesMaxYMD[0],10);
                        maxMonth=parseInt(timesMaxYMD[1],10);
                        maxDay=parseInt(timesMaxYMD[2],10);
                        maxHour=parseInt(timesMaxhms[0],10);
                        maxMinute=parseInt(timesMaxhms[1],10);
                        maxSecond=parseInt(timesMaxhms[2],10);
                    };
                };

                var menuBtn = function(){   // 设置按钮
                    laydate.find("#laydate-ok").click(function(){   //确认按钮 
                        determineDay()
                        var theFormat=_options.format;
                        laydate.find(".combo").hide();
                        laydate.removeClass('open');
                        var strO="";
                        
                        if(_options.choose==true){
                            var rightArr=$("#"+midDiv).data("rightData");
                            var leftArr=$("#"+midDiv).data("leftData");
                            var leftYear=leftArr.thisYear;
                            var leftMonth=leftArr.thisMonth;
                            var leftDay=leftArr.thisDay;
                            var leftHour=leftArr.thisHour;
                            var leftMinute=leftArr.thisMinute;
                            var leftSecond=leftArr.thisSecond;
                            // thisHour,thisMinute,thisSecond
                            var rightYear=rightArr.thisYear;
                            var rightMonth=rightArr.thisMonth;
                            var rightDay=rightArr.thisDay;
                            var rightHour=rightArr.thisHour;
                            var rightMinute=rightArr.thisMinute;
                            var rightSecond=rightArr.thisSecond;
                            if(rightHour<leftHour){
                                rightHour=leftHour
                                rightMinute=leftMinute
                                rightSecond=leftSecond
                            }else if(rightHour==leftHour&&rightMinute<leftMinute){
                                rightMinute=leftMinute
                                rightSecond=leftSecond
                            }else if(rightHour==leftHour&&rightMinute==leftMinute&&rightSecond<leftSecond){
                                rightSecond=leftSecond
                            }
                            if(theFormat.indexOf(" ")==-1){
                                if(theFormat=="YY/MM/DD"){
                                    strO=leftYear+"-"+leftMonth+"-"+leftDay+" 至 "+rightYear+"-"+rightMonth+"-"+rightDay
                                }else if(theFormat=="YY/MM"){
                                    strO=leftYear+"-"+leftMonth+" 至 "+rightYear+"-"+rightMonth
                                }else if(theFormat=="MM/DD"){
                                    strO=leftMonth+"-"+leftDay+" 至 "+rightMonth+"-"+rightDay
                                }else if(theFormat=="hh:mm:ss"){
                                    strO=leftHour+":"+leftMinute+":"+leftSecond+" 至 "+rightHour+":"+rightMinute+":"+rightSecond
                                }else if(theFormat=="hh:mm"){
                                    strO=leftHour+":"+leftMinute+" 至 "+rightHour+":"+rightMinute
                                }
                            }else{
                                if(theFormat=="YY/MM/DD hh:mm:ss"){
                                    strO=leftYear+"/"+leftMonth+"/"+leftDay+" "+leftHour+":"+leftMinute+":"+leftSecond+" 至 "+rightYear+"/"+rightMonth+"/"+rightDay+" "+rightHour+":"+rightMinute+":"+rightSecond
                                }else if(theFormat=="MM/DD hh:mm:ss"){
                                    strO=leftMonth+"/"+leftDay+" "+leftHour+":"+leftMinute+":"+leftSecond+" 至 "+rightMonth+"/"+rightDay+" "+rightHour+":"+rightMinute+":"+rightSecond
                                }else if(theFormat=="MM/DD hh:mm"){
                                    // //console.log(leftMonth,leftDay)
                                    strO=leftMonth+"/"+leftDay+" "+leftHour+":"+leftMinute+" 至 "+rightMonth+"/"+rightDay+" "+rightHour+":"+rightMinute
                                }
                            }
                            rightData={'lor':'.rightDate','thisYear':rightYear,'thisMonth':rightMonth,'thisDay':rightDay,'thisHour':rightHour,'thisMinute':rightMinute,'thisSecond':rightSecond};
                            leftData={'lor':'.leftDate','thisYear':leftYear,'thisMonth':leftMonth,'thisDay':leftDay,'thisHour':leftHour,'thisMinute':leftMinute,'thisSecond':leftSecond};
                            $("#"+midDiv).data("leftData",leftData);
                            $("#"+midDiv).data("rightData",rightData);
                            setTheLaydate('.rightDate')
                            setTheLaydate('.leftDate')
                        }else {
                            if(theFormat.indexOf(" ")==-1){
                                if(theFormat=="YY/MM/DD"){
                                    strO=thisYear+"-"+thisMonth+"-"+thisDay
                                }else if(theFormat=="YY/MM"){
                                    strO=thisYear+"-"+thisMonth
                                }else if(theFormat=="MM/DD"){
                                    strO=thisMonth+"-"+thisDay
                                }else if(theFormat=="hh:mm:ss"){
                                    strO=thisHour+":"+thisMinute+":"+thisSecond
                                }else if(theFormat=="hh:mm"){
                                    strO=thisHour+":"+thisMinute
                                }

                            }else{
                                if(theFormat=="YY/MM/DD hh:mm:ss"){
                                    strO=thisYear+"/"+thisMonth+"/"+thisDay+" "+thisHour+":"+thisMinute+":"+thisSecond
                                }else if(theFormat=="MM/DD hh:mm:ss"){
                                    strO=thisMonth+"/"+thisDay+" "+thisHour+":"+thisMinute+":"+thisSecond
                                }else if(theFormat=="MM/DD hh:mm"){
                                    // //console.log(thisMonth,thisDay)
                                    strO=thisMonth+"/"+thisDay+" "+thisHour+":"+thisMinute
                                }
                            }
                        }
                        laydate.find(".u-input").attr("value",strO);
                    });
                    laydate.find("#laydate-clear").click(function(){
                        laydate.find(".u-input").attr("value","");
                    });

                    //今天按钮
                    laydate.find("#laydate-today").click(function(){
                       setToday();   
                        var strO=""
                        var theFormat=_options.format;
                        if(theFormat.indexOf(" ")==-1){
                            if(theFormat=="YY/MM/DD"){
                                strO=thisYear+"/"+thisMonth+"/"+thisDay
                            }else if(theFormat=="YY/MM"){
                                strO=thisYear+"/"+thisMonth
                            }else if(theFormat=="MM/DD"){
                                strO=thisMonth+"/"+thisDay;
                            }
                        }else{
                            if(theFormat=="YY/MM/DD hh:mm:ss"){
                                strO=thisYear+"/"+thisMonth+"/"+thisDay+" "+thisHour+":"+thisMinute+":"+thisSecond;
                            }else if(theFormat=="MM/DD hh:mm:ss"){
                                strO=thisMonth+"/"+thisDay+" "+thisHour+":"+thisMinute+":"+thisSecond;
                            }else if(theFormat=="MM/DD hh:mm"){
                                strO=thisMonth+"/"+thisDay+" "+thisHour+":"+thisMinute;
                            }
                        } 
                        laydate.find(".u-input").attr("value",strO);

                        laydate.find(".f-hidden").attr("value",strO);
                    });
                }
                //判断天数
                var getThisDays=function(month,year){
                    var thisDays
                    if(month==4 || month==6|| month==9 ||  month== 11){
                        thisDays=30;
                    }else if (month==2){
                        if (((year % 4)==0) && ((year % 100)!=0) || ((year % 400)==0)){
                            thisDays=29;
                        }else{
                            thisDays=28;
                        }
                    }else{
                        thisDays=31;
                    }
                    return thisDays
                };

                // var setThead=function(){
                //     var theWeekDay="";            
                //     for(var i=0;i<weekDay.length;i++){
                //         theWeekDay+="<th>"+weekDay[i]+"</th>"
                //     }
                //     var str="<tr>"+theWeekDay+"</tr>";
                //     laydate.find(".laydate-table thead").html(str);
                // };
                var getlor = function(dom){
                    var lor; 
                    if (dom==''||dom==undefined){
                        return
                    }else{
                       if(dom.parents(".lor").hasClass('leftDate')){
                            // //console.log("left");
                            lor=".leftDate";
                        }else if(dom.parents(".lor").hasClass('rightDate')){
                            // //console.log('right');
                            lor=".rightDate"
                        }
                        return lor; 
                    }
                }
                //设置年份选项表
                var setTheYearShow= function(thisYear,lor,dom){
                    var strB="";
                    var strA="";
                    var min = "";
                    var max = "";
                    (thisYear-8>1900)?min=thisYear-9:min=1900;
                    (thisYear+7<2050)?max=thisYear+8:max= 2050;
                    for (i=min;i<=thisYear;i++){
                    (i<minYear)?strB+= "<td class='laydate-nothis' y='"+i+"年'><div class='dateYY'>"+i+"年</div></td>-|-":strB+= "<td y='"+i+"年'><div class='dateYY'>"+i+"年</div></td>-|-";
                    }
                    // laydate.find(lor).find("#laydate-tables-y").html(strB)
                    // $(".minYear").css("color","#a0e1ff")
                    for (i=thisYear+1;i<=max;i++){
                    (i>maxYear)?strA+= "<td class='laydate-nothis' y='"+i+"年'><div class='dateYY'>"+i+"年</div></td>-|-":strA+= "<td y='"+i+"年'><div class='dateYY'>"+i+"年</div></td>-|-";
                    }
                    // laydate.find(lor).find("#laydate-tables-y").append(strA)
                    // $(".maxYear").css("color","#a0e1ff")
                    var stryyy=strB+strA;
                    var arr = new Array();  
                    var arr = stryyy.split('-|-');
                    var arr1=$(arr[0]).find(".dateYY").html();
                    var arr2=$(arr[15]).find(".dateYY").html();
                    laydate.find(lor).find("#laydate-y").find('.laydate-left-info').html(arr1+" 至 "+arr2);
                    arr='<tr>'+arr[0]+arr[1]+arr[2]+arr[3]+'</tr>'+'<tr>'+arr[4]+arr[5]+arr[6]+arr[7]+'</tr>'+'<tr>'+arr[8]+arr[9]+arr[10]+arr[11]+'</tr>'+'<tr>'+arr[12]+arr[13]+arr[14]+arr[15]+'</tr>';

                    laydate.find(lor).find("#tbody-laydate-y").html(arr);
                    changePage(lor);
                    getHoverYear(lor);
                };
                var changePage=function(lor){
                    // laydate.find(lor).find(".laydate-left-y").click(function(event) {
                    //     console.log($(this))
                    // });
                    var li=laydate.find(lor).find("#tbody-laydate-y .dateYY")
                    for(var i=0;i<li.length;i++){
                    }
                        var year=li[9];
                        year=$(year).html();
                        year=parseInt(year,10);
                    laydate.find(lor).find("#yll").unbind("click").click(function() {
                        (year-16<minYear)?year=minYear:year=year-16;
                        setTheYearShow(year,lor);
                    });
                    laydate.find(lor).find("#yrr").unbind("click").click(function() {
                        (year+16>maxYear)?year=maxYear:year=year+16;
                        setTheYearShow(year,lor);
                    });

                    setTheMonthShow()
                    getHoverYear(lor);
                };

                //设置月份选项表
                var setTheMonthShow= function(){
                    var str=""
                    for(i=1;i<=12;i++){
                        if(i<9){
                            str+="<td m='"+i+"月'><div class='dateMM'>0"+i+"月</div></td>-|-"
                        }else if(9<i<12){
                            str+="<td m='"+i+"月'><div class='dateMM'>"+i+"月</div></td>-|-"
                        }else if(i=12){
                            str+="<td m='"+i+"月'><div class='dateMM'>"+i+"月</div></td>"
                        }
                        // (i<9)?str+="<span m="+i+">0"+(i+1)+"月</span>":str+="<span m="+i+">"+(i+1)+"月</span>";
                    }
                    var arr = new Array();  
                    arr = str.split('-|-');
                    arr='<tr>'+arr[0]+arr[1]+arr[2]+'</tr>'+'<tr>'+arr[3]+arr[4]+arr[5]+'</tr>'+'<tr>'+arr[6]+arr[7]+arr[8]+'</tr><tr>'+arr[9]+arr[10]+arr[11]+'</tr>';
                    
                    laydate.find("#tbody-laydate-m").html(arr)
                }
                // 生成选择器头部
                var setThead=function(){
                    var theWeekDay="";          
                    for(var i=0;i<weekDay.length;i++){
                        theWeekDay+="<th>"+weekDay[i]+"</th>"
                    }
                    var str="<tr>"+theWeekDay+"</tr>";
                    laydate.find("#laydate-table thead").html(str);
                };

                //生成日历
                var setTheCalendar = function(theYear,theMonth,min,max){
                    var str="";
                    var strf="";
                        var dd=new Date()
                        dd.setMonth(theMonth-1)
                        dd.setFullYear(theYear)
                        var y=theYear;
                        var m=theMonth;
                        if(_options.plugins=="datetime"){
                            for (i=min;i<max+1;i++){
                                dd.setDate(i)
                                var WWW = weekDay[dd.getDay()];
                                // var f="1111"
                                // var strf="<div><div class='dateDD'>"+i+"</div><div>"+f+"</div></div>"
                                strf="<div class='dateTd'><div class='dateDD'><div class='dateDay'>"+i+"</div></div>";
                                if(i==min){
                                    if(WWW=="六"){
                                        if(m!=thisMonth){
                                            str+="<td class='laydate-nothis' y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>-|-";
                                        }else{
                                        str+="<td class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>-|-";              
                                        }

                                    }else{
                                        if(m!=thisMonth){
                                            str+="<td class='laydate-nothis' y="+y+" m="+m+" d="+i+">"+strf+"</td>";
                                        }else{
                                            str+="<td class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>";
                                        }

                                    }
                                }else if(i==max){
                                        if(m!=thisMonth){
                                   str+="<td class='laydate-nothis' y="+y+" m="+m+" d="+i+">"+strf+"</td>";
                                        }else{
                                   str+="<td class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>";
                                        }
                                }else{
                                    if(WWW=="六"){
                                        if(i!=max){
                                            if(m!=thisMonth){
                                            str+="<td class='laydate-nothis' y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>-|-"; 
                                            }else{
                                            str+="<td class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>-|-"; 
                                            }
                                        }else{
                                            if(m!=thisMonth){
                                             str+="<td class='laydate-nothis' y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>";
                                             }else{
                                             str+="<td class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>";
                                            }
                                        }
                                    }else{
                                            if(m!=thisMonth){
                                        str+="<td class='laydate-nothis' y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>";
                                        }else{
                                        str+="<td class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>";
                                         }
                                    }
                                }
                            }
                            return str;
                        }else if(_options.plugins=="calendar"){
                            for (i=min;i<max+1;i++){
                                dd.setDate(i);
                                var WWW = weekDay[dd.getDay()];
                                var memo="";   //备注内容
                                var corner="";     //角标数字
                                var memoClass="";
                                var price="";
                                var oc="";
                                var lcontent={};
                                // //console.log(json_Obj)
                                for(var l=0;l<json_Obj.length;l++){
                                    if ("timestamp" in json_Obj[l]){
                                        var   year=""
                                        var   month=""
                                        var   date=""
                                        var  jsonDate=parseInt(json_Obj[l].timestamp,10)
                                        jsonDate=new Date(jsonDate*1000)
                                        var formatDate=function (now) {     
                                            year=now.getFullYear();     
                                            month=now.getMonth()+1;     
                                            day=now.getDate(); 
                                        }
                                        formatDate(jsonDate)
                                        if(y==year&&m==month&&i==day){
                                            memo=json_Obj[l].memo;
                                            if(memo==undefined){
                                                memo="";
                                            }
                                            memoClass=(json_Obj[l].memoClass);
                                            memoClass="class='"+memoClass+"'";
                                            lcontent = json_Obj[l].content;
                                            var jOC,count=0;
                                            for(jOC in lcontent){
                                                var arrlc=new Array(lcontent);
                                                count++;
                                            }
                                            corner=count;
                                            var priceL="";
                                            var strpp="";
                                            priceL = json_Obj[l].price;
                                            for(var pp=0;pp<price.length;pp++){
                                                strpp+=priceL[pp]
                                            }
                                            price=strpp;
                                        }
                                    }else if("jsonYear" in json_Obj[l]){
                                        if(y==json_Obj[l].jsonYear&&m==json_Obj[l].m&&i==json_Obj[l].d){
                                            memo=json_Obj[l].memo;
                                            if(memo==undefined){
                                                memo="";
                                            }
                                            memoClass=(json_Obj[l].memoClass);
                                            //memoClass="+memoClass+";
                                            lcontent = json_Obj[l].content;
                                            var jOC,count=0;
                                            for(jOC in lcontent){
                                                var arrlc=new Array(lcontent);
                                                count++;
                                            }
                                            corner=count;
                                            var priceL="";
                                            var strpp="";
                                            var JOPP="";
                                            priceL = json_Obj[l].price;
                                            for(JOPP in priceL){
                                                strpp+="<p>"+priceL[JOPP]+"</p>"
                                            }
                                            price=strpp;
                                        }
                                    }
                                }
                                var strprice="";

                                    var strpic="";
                                if(_options.price==true){
                                    (price==""||price==undefined)?strpic="":strpic="<div class='divPic'>"+price+"</div>";
                                }else if(_options.price!=true){
                                    strpic="";
                                }

                                if(_options.memo==true  && _options.corner==true){
                                    var strCor="";
                                    var strMe="";
                                    (corner=="")?strCor="":strCor="<div class='corner'><i class='iconfont' >&#xe62c;</i></div>";
                                    (memo=="")?strMe="":strMe="<div class='dateText "+memoClass+"'>"+memo+"</div>";
                                    strf="<div class='dateTd'><div class='dateDD'>"+strCor+"<div class='dateDay'>"+i+"</div>"+strMe+"</div>"+strpic+"</div>";
                                }else if(_options.corner==true && _options.memo!=true){
                                    var strCor="";
                                    (corner=="")?strCor="":strCor="<div class='corner'><i class='iconfont' >&#xe62c;</i><div class='tagging'></div></div>"
                                    strf="<div class='dateTd'><div class='dateDD'>"+strCor+"<div class='dateDay'>"+i+"</div></div>"+strpic+"</div>";
                                }else if(_options.memo==true && _options.corner!=true){
                                    var strMe="";
                                    (memo=="")?strMe="":strMe="<div class='dateText "+memoClass+"'>"+memo+"</div>";
                                    strf="<div class='dateTd'><div class='dateDD'><div class='dateDay'>"+i+"</div>"+strMe+"</div></div>"+strpic+"";
                                }else{
                                    strf="<div class='dateTd'><div class='dateDD'><div class='dateDay'>"+i+"</div></div>"+strpic+"</div>";
                                }
                                
                                if(i==min){
                                    if(WWW=="六"){
                                        (m!=thisMonth)?str+="<td "+oc+" class='laydate-nothis ' y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>-|-":str+="<td "+oc+" class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>-|-";
                                    }else{
                                        (m!=thisMonth)?str+="<td "+oc+" class='laydate-nothis' y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>":str+="<td "+oc+" class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>";
                                    }
                                }else if(i==max){
                                    (m!=thisMonth)?str+="<td "+oc+" class='laydate-nothis' y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>":str+="<td "+oc+" class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>";
                                }else{
                                    if(WWW=="六"){
                                        if(i!=max){
                                            (m!=thisMonth)?str+="<td "+oc+" class='laydate-nothis' y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>-|-":str+="<td "+oc+" class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>-|-";
                                        }else{
                                            (m!=thisMonth)?str+="<td "+oc+" class='laydate-nothis' y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>":str+="<td "+oc+" class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>";
                                        }
                                    }else{
                                        (m!=thisMonth)?str+="<td "+oc+" class='laydate-nothis' y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>":str+="<td "+oc+" class y='"+y+"' m='"+m+"' d='"+i+"'>"+strf+"</td>";
                                    }
                                }
                            }
                            return str;
                        }
                };


                //下拉箭头绑定
                var yMClick=function(lor){
                    laydate.find(lor).find(".label").click(function() {
                        laydate.find(this).siblings().click();
                    });
                    //日期选定
                    laydate.find(lor).find(".dateDD").unbind("click").click(function() {
                        // //console.log(111)
                        // laydate.find(this).siblings().click()
                    });
                    //年份点击事件
                    laydate.find(lor).find("#laydate-ym").find(".laydate-left-info").unbind("click").click(function() {
                        if(dateType==1){
                            return false
                        }else if(dateType==0){
                            laydate.find(lor).find("#laydate-tables-m").css("display","");
                            laydate.find(lor).find("#laydate-table").css("display","none");
                            laydate.find(lor).find("#laydate-m").css("display","block");
                            laydate.find(lor).find("#laydate-ym").css("display","none");
                            getHoverMonth(lor)
                        }else{
                            laydate.find(lor).find("#laydate-tables-y").css("display","");
                            laydate.find(lor).find("#laydate-table").css("display","none");
                            laydate.find(lor).find("#laydate-y").css("display","block");
                            laydate.find(lor).find("#laydate-ym").css("display","none");
                            getHoverYear(lor)
                        }
                            
                    });
                    
                    // //月份点击事件
                    // laydate.find(lor).find("#laydate-m").unbind("click").click(function() {
                    //     $(this).parents(".lor").siblings().find("#leftYears").hide();
                    //     $(this).parents(".lor").siblings().find("#rightMonth").hide();
                    //     laydate.find(lor).find("#rightMonth").show();
                    //     laydate.find(lor).find("#leftYears").hide();
                    //     getHoverMonth(lor);
                    // });
                }

                //
                var judge=function(dom,yyy,mmm,ddd){
                    var lor=getlor(dom);
                    var rightArr=$("#"+midDiv).data("rightData");
                    var leftArr=$("#"+midDiv).data("leftData");
                    if(lor==".leftDate"){
                        yyy!=""?thisYear=yyy:thisYear=leftArr.thisYear;
                        mmm!=""?thisMonth=mmm:thisMonth=leftArr.thisMonth;
                        ddd!=""?thisDay=ddd:thisDay=leftArr.thisDay;
                        midYear=rightArr.thisYear;
                        midMonth=rightArr.thisMonth;
                        midDay=rightArr.thisDay;
                       if(thisYear<minYear||thisYear>midYear){
                           return false
                       }else if((thisYear==minYear&&thisMonth<minMonth)||(thisYear==midYear&&thisMonth>midMonth)){
                           return false
                       }else if((thisYear==minYear&&thisMonth==minMonth&&thisDay<minDay)||(thisYear==midYear&&thisMonth==midMonth&&thisDay>midDay)){    
                        
                           return false
                       }else{
                            return true
                       }
                    }else if(lor==".rightDate"){
                        yyy!=""?thisYear=yyy:thisYear=rightArr.thisYear;
                        mmm!=""?thisMonth=mmm:thisMonth=rightArr.thisMonth;
                        ddd!=""?thisDay=ddd:thisDay=rightArr.thisDay;
                        midYear=leftArr.thisYear;
                        midMonth=leftArr.thisMonth;
                        midDay=leftArr.thisDay;
                       if(thisYear<midYear||thisYear>maxYear){
                        // //console.log(111)
                            return false
                        }else if((thisYear==midYear&&thisMonth<midMonth)||(thisYear==maxYear&&thisMonth>maxMonth)){
                        // //console.log(222)
                        return false
                        }else if((thisYear==midYear&&thisMonth==midMonth&&thisDay<midDay)||(thisYear==maxYear&&thisMonth==maxMonth&&thisDay>maxDay)){    
                           // //console.log(333)
                           return false
                        }else{
                            return true
                       }
                    }
                }   
                //年份列表选定事件
                var getHoverYear = function(lor){

                    laydate.find(lor).find("#laydate-tables-y td").hover(function(event){
                        laydate.find(this).unbind("click").click(function(event){
                            // //console.log($(this))
                            var thisClick=($(this).find(".dateYY").html());
                            //将字符串转换为数字类型
                            thisYear=parseInt(thisClick,10);
                            if(_options.choose==true){
                                var tof=judge($(this),thisYear,"","")
                                if (tof==true){
                                    var rightArr=$("#"+midDiv).data("rightData");
                                    var leftArr=$("#"+midDiv).data("leftData");
                                    if(lor==".leftDate"){
                                        leftArr.thisYear=thisYear
                                    }else if(lor==".rightDate"){
                                        rightArr.thisYear=thisYear
                                    }
                                    laydate.find(this).parents("tr").siblings().children('td').removeClass('active');
                                    laydate.find(this).siblings().removeClass('active');
                                    laydate.find(this).addClass('active');
                                    laydate.find(lor).find("#laydate-tables-m").css("display","");
                                    laydate.find(lor).find("#laydate-tables-y").css("display","none");
                                    laydate.find(lor).find("#laydate-y").css("display","none");
                                    laydate.find(lor).find("#laydate-m").css("display","block");
                                    setTheYearShow(lor)
                                    getHoverMonth(lor)
                                }
                            }else{
                                if(thisYear<minYear){
                                    thisYear=minYear;
                                    return false
                                }else if(thisYear>maxYear){
                                    thisYear=maxYear;
                                    return false
                                }
                                // setTheYearShow(thisYear,lor);
                                laydate.find(lor).find("#laydate-tables-m").css("display","");
                                laydate.find(lor).find("#laydate-tables-y").css("display","none");
                                laydate.find(lor).find("#laydate-y").css("display","none");
                                laydate.find(lor).find("#laydate-m").css("display","block");
                                setTheYearShow(lor)
                                getHoverMonth(lor)
                            }
                            laydate.find("#leftYears").css("display", "none");
                            event.stopPropagation()
                        });
                    });
                };

                //月份列表选定事件
                var getHoverMonth = function(lor){
                    laydate.find(lor).find("#laydate-tables-m td").hover(function(event){
                        laydate.find(this).unbind("click").click(function(event) {
                            var thisClick=($(this).find(".dateMM").html());
                            //将字符串转换为数字类型
                            thisMonth=parseInt(thisClick,10);
                            if(_options.choose==true){
                                var tof=judge($(this),"",thisMonth,"");
                                if(tof==true){
                                    var rightArr=$("#"+midDiv).data("rightData");
                                    var leftArr=$("#"+midDiv).data("leftData");
                                    if(lor==".leftDate"){
                                        leftArr.thisMonth=thisMonth
                                    }else if(lor==".rightDate"){
                                        rightArr.thisMonth=thisMonth
                                    }
                                    laydate.find(this).parents("tr").siblings().children('td').removeClass('active');
                                    laydate.find(this).siblings().removeClass('active');
                                    laydate.find(this).addClass('active');
                                    laydate.find(lor).find("#laydate-tables-m").css("display","none");
                                    laydate.find(lor).find("#laydate-table").css("display","");
                                    laydate.find(lor).find("#laydate-ym").css("display","block");
                                    laydate.find(lor).find("#laydate-m").css("display","none");
                                    setTheMonthShow();
                                    setTheLaydate(lor)
                                    event.stopPropagation()
                                }
                            }else{
                                if(thisYear==minYear&&thisMonth<minMonth){
                                    thisMonth=minMonth
                                    return false
                                }else if(thisYear==maxYear&&thisMonth>maxMonth){
                                    thisMonth=maxMonth
                                    return false
                                }
                                setTheMonthShow();
                                setTheLaydate(lor);
                                laydate.find(lor).find("#laydate-tables-m").css("display","none");
                                laydate.find(lor).find("#laydate-table").css("display","");
                                laydate.find(lor).find("#laydate-ym").css("display","block");
                                laydate.find(lor).find("#laydate-m").css("display","none");
                            }
                            event.stopPropagation()
                        });
                    });
                };
                //日期列表选定事件
                var getHoverDay = function(evnet){
                    laydate.find(".laydate-table td").hover(function(event){
                        laydate.find(".laydate-table td").unbind("click").click(function(event){
                            var lor=getlor($(this))
                            var thisClickm=($(this).attr("m"));
                            var thisClickd=($(this).attr("d"));
                            //将字符串转换为数字类型
                            thisDay=parseInt(thisClickd,10);
                            thisMonth=parseInt(thisClickm,10);
                            if($(this).hasClass('laydate-nothis')){
                                return false
                            }else{
                                if(_options.choose==true){
                                    var callback=judge($(this),"","",thisDay)
                                    if(callback==false){
                                        return false
                                    }else{
                                        var rightArr=$("#"+midDiv).data("rightData");
                                        var leftArr=$("#"+midDiv).data("leftData");
                                        if(lor==".leftDate"){
                                            leftArr.thisDay=thisDay
                                        }else if(lor==".rightDate"){
                                            rightArr.thisDay=thisDay
                                        }
                                        laydate.find(this).parents("tr").siblings().children('td').removeClass('isToday');
                                        laydate.find(this).siblings().removeClass('isToday');
                                        laydate.find(this).addClass('isToday');
                                    }
                                }else{
                                    laydate.find(this).parents("tr").siblings().children('td').removeClass('isToday');
                                    laydate.find(this).siblings().removeClass('isToday');
                                    laydate.find(this).addClass('isToday');
                                    if(thisYear==minYear&&thisMonth==minMonth&&thisDay<minDay){
                                        return false
                                    }else if(thisYear==maxYear&&thisMonth==maxMonth&&thisDay>maxDay){
                                        return false
                                    }
                                }    
                                if(_options.cOnce==true){
                                    // laydate.find(".m-calendar").css("display","none");
                                    laydate.find("#laydate-ok").click()
                                    setTheCalendar()
                                    setTheLaydate(lor)
                                    setTbody()
                                }
                            }
                        });
                    });
                };

                var changeDate=function(){
                    laydate.find("#yl").unbind("click").click(function(event){
                        if(dateType==0){
                            return false
                        }else{
                            var lor=getlor($(this))
                            if(_options.choose==true){
                                if(lor==".leftDate"){
                                    var thisArr=$("#"+midDiv).data("leftData");
                                        thisYear=thisArr.thisYear;
                                        thisMonth=thisArr.thisMonth;
                                        thisDay=thisArr.thisDay;
                                        midYear=minYear;
                                        midMonth=minMonth;
                                        midDay=minDay;
                                    if(thisYear-1<midYear){
                                        return false
                                    }else if(thisYear-1==midYear&&thisMonth<midMonth){
                                        thisYear-=1
                                        thisMonth=midMonth;
                                        thisDay=midDay;
                                        setTheLaydate(lor)
                                   }else if(thisYear-1==midYear&&thisMonth==midMonth&&thisDay<midDay){
                                        thisYear-=1;
                                        thisMonth=midMonth;
                                        thisDay=midDay;
                                        setTheLaydate(lor)
                                   }else{
                                        thisYear-=1
                                        setTheLaydate(lor)
                                    }
                                }else if(lor==".rightDate"){
                                    var midArr=$("#"+midDiv).data("leftData");
                                    midYear=midArr.thisYear;
                                    midMonth=midArr.thisMonth;
                                    midDay=midArr.thisDay;
                                    var thisArr=$("#"+midDiv).data("rightData");
                                        thisYear=thisArr.thisYear;
                                        thisMonth=thisArr.thisMonth;
                                        thisDay=thisArr.thisDay;
                                    if(thisYear-1<midYear){
                                        return false
                                    }else if(thisYear-1==midYear&&thisMonth<midMonth){
                                        thisYear-=1;
                                        thisMonth=midMonth;
                                        thisDay=midDay;
                                        setTheLaydate(lor)
                                   }else if(thisYear-1==midYear&&thisMonth==midMonth&&thisDay<midDay){
                                        thisYear-=1;
                                        thisMonth=midMonth;
                                        thisDay=midDay;
                                        setTheLaydate(lor)
                                   }else{
                                        thisYear-=1
                                        setTheLaydate(lor)
                                    }
                                }
                            }else{
                               if(thisYear-1<minYear){
                                return false
                                }else if(thisYear-1==minYear&&thisMonth<minMonth){
                                    thisYear-=1
                                    thisMonth=minMonth;
                                    setTheLaydate(lor)
                                // return false
                               }else{
                                thisYear-=1
                                setTheLaydate(lor)
                               }
                            }
                        }
                    });
                    laydate.find("#yr").unbind("click").click(function(event){
                        console.log
                        if(dateType==0){
                            return false
                        }else{
                            var lor=getlor($(this))
                            if(_options.choose==true){
                                if(lor==".leftDate"){
                                    var midArr=$("#"+midDiv).data("rightData");
                                    midYear=midArr.thisYear;
                                    midMonth=midArr.thisMonth;
                                    midDay=midArr.thisDay;
                                    var thisArr=$("#"+midDiv).data("leftData");
                                        thisYear=thisArr.thisYear;
                                        thisMonth=thisArr.thisMonth;
                                        thisDay=thisArr.thisDay;
                                    if(thisYear+1>midYear){
                                        return false
                                    }else if(thisYear+1==midYear&&thisMonth>midMonth){
                                        thisYear+=1
                                        thisMonth=midMonth;
                                        thisDay=midDay;
                                        setTheLaydate(lor)
                                   }else if(thisYear+1==minYear&&thisMonth==minMonth&&thisDay>midDay){
                                        thisYear+=1;
                                        thisMonth=midMonth;
                                        thisDay=midDay;
                                        setTheLaydate(lor)
                                   }else{
                                        thisYear+=1
                                        setTheLaydate(lor)
                                    }
                                }else if(lor==".rightDate"){
                                    var thisArr=$("#"+midDiv).data("rightData");
                                        thisYear=thisArr.thisYear;
                                        thisMonth=thisArr.thisMonth;
                                        thisDay=thisArr.thisDay;
                                        midYear=maxYear;
                                        midMonth=maxMonth;
                                        midDay=maxDay;
                                    if(thisYear+1>midYear){
                                        return false
                                    }else if(thisYear+1==maxYear&&thisMonth>maxMonth){
                                        thisYear+=1
                                        thisMonth=midMonth;
                                        thisDay=midDay;
                                        setTheLaydate(lor)
                                   }else if(thisYear+1==midYear&&thisMonth==midMonth&&thisDay>midDay){
                                        thisYear+=1;
                                        thisMonth=midMonth;
                                        thisDay=midDay;
                                        setTheLaydate(lor)
                                   }else{
                                        thisYear+=1
                                        setTheLaydate(lor)
                                    }
                                }
                            }else{
                                if(thisYear+1>maxYear){
                                return false
                                }else if(thisYear+1==maxYear&&thisMonth>minMonth){
                                    thisYear+=1
                                    thisMonth=minMonth;
                                    setTheLaydate(lor)
                                // return false
                               }else{
                                thisYear+=1
                                setTheLaydate(lor)
                                }
                            }
                        }
                    });
                    laydate.find("#ml").unbind("click").click(function(event){
                        if(dateType==0){
                            return false
                        }else{
                            var lor=getlor($(this))
                            if(_options.choose==true){
                                if(lor==".leftDate"){
                                        midYear=minYear;
                                        midMonth=minMonth;
                                        midDay=minDay;
                                    var thisArr=$("#"+midDiv).data("leftData");
                                        thisYear=thisArr.thisYear;
                                        thisMonth=thisArr.thisMonth;
                                        thisDay=thisArr.thisDay;
                                    if(thisYear==midYear&&thisMonth-1<midMonth){
                                        return false
                                    }else{
                                        if(thisMonth==1){
                                            thisMonth+=11;
                                            thisYear-=1;
                                            setTheLaydate(lor)
                                        }else{
                                            thisMonth-=1;
                                            setTheLaydate(lor)
                                        }
                                    }
                                }else if(lor==".rightDate"){
                                    var midArr=$("#"+midDiv).data("leftData");
                                    midYear=midArr.thisYear;
                                    midMonth=midArr.thisMonth;
                                    midDay=midArr.thisDay;
                                    var thisArr=$("#"+midDiv).data("rightData");
                                        thisYear=thisArr.thisYear;
                                        thisMonth=thisArr.thisMonth;
                                        thisDay=thisArr.thisDay;
                                    if(thisYear==midYear&&thisMonth-1<midMonth){
                                        thisDay=minDay;
                                        return false
                                    }else{
                                        if(thisMonth==1){
                                            thisMonth+=11;
                                            thisYear-=1;
                                            setTheLaydate(lor)
                                        }else{
                                            thisMonth-=1;
                                            setTheLaydate(lor)
                                        }
                                    }
                                }
                            }else{
                                if(thisYear==minYear&&thisMonth-1<minMonth){
                                    thisDay=minDay;
                                    return false
                                }else{
                                    if(thisMonth==1){
                                        thisMonth+=11;
                                        thisYear-=1;
                                        setTheLaydate(lor)
                                    }else{
                                        thisMonth-=1;
                                        setTheLaydate(lor)
                                    }
                                }
                            }
                        }   
                    });
                    laydate.find("#mr").unbind("click").click(function(){
                        if(dateType==0){
                            return false
                        }else{
                            var lor=getlor($(this));
                            if(_options.choose==true){
                                if(lor==".leftDate"){
                                    var midArr=$("#"+midDiv).data("rightData");
                                    midYear=midArr.thisYear;
                                    midMonth=midArr.thisMonth;
                                    midDay=midArr.thisDay;
                                    var thisArr=$("#"+midDiv).data("leftData");
                                        thisYear=thisArr.thisYear;
                                        thisMonth=thisArr.thisMonth;
                                        thisDay=thisArr.thisDay;
                                    if(thisYear==midYear&&thisMonth+1>midMonth){
                                        thisDay=maxDay;
                                        return false
                                    }else{
                                        if(thisMonth==12){
                                            thisYear+=1;
                                            thisMonth-=11;
                                            setTheLaydate(lor)
                                        }else{
                                            thisMonth+=1
                                            setTheLaydate(lor)
                                        }
                                    }
                                }else if(lor==".rightDate"){
                                    var thisArr=$("#"+midDiv).data("rightData");
                                        thisYear=thisArr.thisYear;
                                        thisMonth=thisArr.thisMonth;
                                        thisDay=thisArr.thisDay;
                                        midYear=maxYear;
                                        midMonth=maxMonth;
                                        midDay=maxDay;
                                    if(thisYear==midYear&&thisMonth+1>midMonth){
                                        thisDay=midDay;
                                        // //console.log(thisDay,minDay)
                                        return false
                                    }else{
                                        if(thisMonth==12){
                                            thisYear+=1;
                                            thisMonth-=11;
                                            setTheLaydate(lor)
                                        }else{
                                            thisMonth+=1;
                                            setTheLaydate(lor)
                                        }
                                    }
                                }
                            }else{
                               if(thisYear==maxYear&&thisMonth+1>maxMonth){
                                    thisDay=minDay;
                                    return false
                                }else{
                                    // //console.log(thisMonth,minMonth)
                                   if(thisMonth==12){
                                    thisMonth-=11;
                                    thisYear+=1;
                                        setTheLaydate(lor)
                                   }else{
                                    thisMonth+=1
                                    setTheLaydate(lor)
                                   }
                               }
                            }
                        }
                    });
                };

                var determineDay=function(){
                    var thisMonthDays=getThisDays(thisMonth);
                    var lastMonthDays=getThisDays(thisMonth-1==0?thisMonth==12&&theYear-1:thisMonth-1,thisYear);
                    var nextMonthDays=getThisDays(thisMonth+1==13?thisMonth==1&&theYear+1:thisMonth+1,thisYear);
                    if(thisMonthDays<thisDay){
                        thisDay=1
                    }
                }

                var setTheLaydate=function(lor){ 
                    if(lor==".leftDate"){

                        var thisArr=$("#"+midDiv).data("leftData");
                        thisArr==undefined?thisYear=thisYear:thisYear=thisArr.thisYear;
                        thisArr==undefined?thisMonth=thisMonth:thisMonth=thisArr.thisMonth;
                        thisArr==undefined?thisHour=thisHour:thisHour=thisArr.thisHour;
                        thisArr==undefined?thisMinute=thisMinute:thisMinute=thisArr.thisMinute;
                        thisArr==undefined?thisSecond=thisSecond:thisSecond=thisArr.thisSecond;
                    }else if(lor==".rightDate"){
                        var thisArr=$("#"+midDiv).data("rightData");
                        thisArr==undefined?thisYear=thisYear:thisYear=thisArr.thisYear;
                        thisArr==undefined?thisMonth=thisMonth:thisMonth=thisArr.thisMonth;
                        thisArr==undefined?thisHour=thisHour:thisHour=thisArr.thisHour;
                        thisArr==undefined?thisMinute=thisMinute:thisMinute=thisArr.thisMinute;
                        thisArr==undefined?thisSecond=thisSecond:thisSecond=thisArr.thisSecond;

                    }
                    laydate.find(lor).find('.laydate-top').find("#laydate-ym").find(".laydate-left-info").html(thisYear+'年'+thisMonth+'月');
                    laydate.find(lor).find('.laydate-top').find("#laydate-y").find(".laydate-left-info").html(thisYear);
                    laydate.find(lor).find('.laydate-top').find("#laydate-m").find(".laydate-left-info").html(thisMonth+' 月');
                    laydate.find(lor).find("#hh").val(thisHour);
                    laydate.find(lor).find("#mm").val(thisMinute);
                    laydate.find(lor).find("#ss").val(thisSecond);
                    setTbody(lor);
                }
                var setTbody=function(lor){
                    
                    laydate.find(lor).find("#laydate-table tbody").html("")
                    laydate.find(lor).find("#laydate-table tbody tr td").unbind("click");
                    //生成当月日历
                    // //console.log(thisYear)
                    //将字符串转换为数字类型
                    var thisMonthDays=getThisDays(thisMonth);
                    var lastMonthDays=getThisDays(thisMonth-1==0?thisMonth==12&&theYear-1:thisMonth-1,thisYear);
                    var nextMonthDays=getThisDays(thisMonth+1==13?thisMonth==1&&theYear+1:thisMonth+1,thisYear);
                    var strThis = setTheCalendar(thisYear,thisMonth,1,thisMonthDays);
                    if(_options.choose==true){
                        if(lor=='.rightDate'){
                            rightData={'lor':lor,'thisYear':thisYear,'thisMonth':thisMonth,'thisDay':thisDay,'thisHour':thisHour,'thisMinute':thisMinute,'thisSecond':thisSecond};
                        }else if(lor=='.leftDate'){
                            leftData={'lor':lor,'thisYear':thisYear,'thisMonth':thisMonth,'thisDay':thisDay,'thisHour':thisHour,'thisMinute':thisMinute,'thisSecond':thisSecond};
                        };
                    };
                    $("#"+midDiv).data("leftData",leftData);
                    $("#"+midDiv).data("rightData",rightData);
                    var arr = new Array();  
                    var arr = strThis.split('-|-');
                    for(var j=0;j<arr.length;j++) {
                    laydate.find(lor).find("#laydate-table tbody").append("<tr>"+arr[j]+"</tr>");
                    };
                    laydate.find(lor).find("#laydate-table tbody td").each(function(index, td){
                    var td = $(td);
                    var tdy=(td.attr("y"));
                    var tdm=(td.attr("m"));
                    var tdd=(td.attr("d"));
                    if(_options.plugins=="calendar"){
                        for(var l=0;l<json_Obj.length;l++){
                            if ("timestamp" in json_Obj[l]){
                                var year=""    
                                var month="";     
                                var date="";     
                                var jsonDate=parseInt(json_Obj[l].timestamp,10)
                                    jsonDate=new Date(jsonDate*1000)
                                    // //console.log(jsonDate)
                                var formatDate=function (now) {     
                                    year=now.getFullYear();     
                                    month=now.getMonth()+1;     
                                    day=now.getDate(); 
                                }
                                formatDate(jsonDate)
                                // //console.log(year,month,day)
                                var lcontent = json_Obj[l].content;
                                var price = json_Obj[l].price;
                                if(tdy == year&&tdm==month&&tdd==day){
                                    // //console.log(tdy,"--",tdm,tdd)
                                    $(this).data("json",lcontent);
                                    $(this).find(".divPic").data("json",price)
                                }
                            }else if("jsonYear" in json_Obj[l]){
                                if(tdy ==json_Obj[l].jsonYear&&tdm==json_Obj[l].m&&tdd==json_Obj[l].d){
                                    // //console.log(tdy,tdm,tdd)
                                    var lcontent = json_Obj[l].content;
                                    var price = json_Obj[l].price;
                                    $(this).data("json",lcontent);
                                    $(this).find(".divPic").data("json",price);
                                    // //console.log($(this).find(".divPic").data("json"));  //价格列表的json信息，可获取
                                }
                            }
                        }
                    }
                    var sYY=thisYear.toString()
                    var sDD=thisDay.toString()
                    var sMM=thisMonth.toString()
                    if(tdy==sYY&&tdm==sMM&&tdd==sDD){
                        $(this).addClass("isToday");
                    }
                });
                    var setMonthLast=function(lor){
                        var firstTr =laydate.find(lor).find('#laydate-table').find('tbody').find("tr:first");

                        var beforeThisMonthDays = 7-firstTr.find("td").length;
                        if(beforeThisMonthDays!=0){
                            var qqq=lastMonthDays-beforeThisMonthDays+1
                            var strLast = setTheCalendar(thisYear,thisMonth-1,qqq,lastMonthDays)
                            var arr = new Array();
                            var arr = strLast.split();
                            for(var j=0;j<arr.length;j++) {
                               firstTr.prepend(arr[j]);
                           }
                        }else{
                        }
                    };
                    var setMonthNext= function(lor){
                        var lastTr =laydate.find(lor).find('#laydate-table').find('tbody').find("tr:last");
                        var nextThisMonthDays = 7-lastTr.find("td").length;
                        if(nextThisMonthDays!=0){
                            var strNext = setTheCalendar(thisYear,thisMonth+1,1,nextThisMonthDays)
                            var arr = new Array(); 
                            var arr = strNext.split('-|-');
                            for(var j=0;j<arr.length;j++) {
                               lastTr.append(arr[j]);
                                }
                            // 当展示不够6行
                            var tBodyTr =laydate.find(lor).find('#laydate-table').find('tbody').find("tr");
                            if (laydate.find(tBodyTr).length<6){
                                var str = "";
                                var strNext_n = setTheCalendar(thisYear,thisMonth+1,nextThisMonthDays+1,nextThisMonthDays+7)
                                // for(var k=nextThisMonthDays+1;k<nextThisMonthDays+8;k++){
                                //     str+="<td class='laydate-nothis' y='"+thisYear+"' m='"+(thisMonth+1)+"' d='"+k+"'>"+k+"</td>";
                                // }
                                var arr = new Array(); 
                                var arr = strNext_n.split('-|-');
                                var stt=""
                                for(var j=0;j<arr.length;j++) {

                                   stt+=arr[j];
                                }
                                stt="<tr>"+stt+"</tr>"
                                lastTr.after(stt);
                                // lastTr.after("<tr>"+str+"</tr>");
                            }
                        }else{
                            // 当展示不够6行
                            var str=""
                            var strNext_n = setTheCalendar(thisYear,thisMonth+1,1,7)
                            var arr = new Array(); 
                            var arr = strNext_n.split('-');
                            var stt=""
                            for(var j=0;j<arr.length;j++) {
                               stt+=arr[j];
                            }
                            stt="<tr>"+stt+"</tr>"
                            lastTr.after(stt);
                        };

                        // for(var ym=0;ym<$("td").length;ym++){
                        //     var tdn=$("td").attr("m")
                        //     //console.log(tdn) 
                        // }
                    };
                    setMonthLast(lor)
                    setMonthNext(lor)
                    if(_options.plugins=="calendar"){
                        if(_options.tagging=="newFunc"){
                            laydate.find('td').click(function(event) {
                                _options.func();
                            });
                        }else if(_options.tagging=="ul"){
                            laydate.find(".laydate-table tbody tr td").click(function(event){
                                console.log($(this))
                                laydate.find(".laydate-table tbody tr td").find(".tagging").remove()
                            var dataJson=($(this).data('json'));
                            var setMenu=function(dataJson){
                                var li="";
                                var stra="";
                                $.each(dataJson, function (index, obj) {   // 遍历json  content
                                    li=dataJson[index];
                                    var li_split=li.split('$');
                                    var title=li_split[0];
                                    var url=li_split[1];
                                    var text=li_split[2];
                                    var icon=li_split[3];
                                    (icon==""||icon==undefined)?icon="":icon=li_split[3];
                                    (text==""||text==undefined)?text="":text=" : "+li_split[2];
                                    (url==""||url==undefined)?url="":url=li_split[1];
                                    (title==""||title==undefined)?title="":title=li_split[0];
                                    stra+="<li nurl='"+url+"'><a href='javascript:;' ><i class='iconfont'>"+icon+"</i>"+title+text+"</a></li>";
                                });
                                var strw='<ul class="m-menu tagging" >'+stra+'</ul>';
                                var target=$(event.target);
                                target.parents("td").css("z-index","9999");
                                target.parents(".dateDD").find(".corner").append(strw);
                                target.parents(".m-calendar").css("overflow","visible");
                                var nurl=$(".tagging li").attr("nurl");
                                function showDialog(dlgId, title, url, width, height, modalval, locMyself) {
                                    $(document).an_dialog({
                                        title : title,
                                        id : dlgId,
                                        width : width || 900,
                                        height : height || 700,
                                        modalval : modalval === undefined ? true : modalval,
                                        url : url,
                                        locMyself:locMyself||false,
                                        onClose:function(e){
                                            getJson();
                                            setTbody()
                                        }
                                    });
                                };
                                
                                var setcoordinate = function(targetTD) {
                                    var pwidth = targetTD.parents(".m-calendar").css("width");
                                    var pheight = targetTD.parents(".m-calendar").css("height");
                                    pwidth=parseInt(pwidth,10);
                                    pheight=parseInt(pheight,10);
                                    var y = targetTD.position().top; 
                                    var x = targetTD.position().left;
                                    var cWidth= targetTD.find(".m-menu").css("width")
                                    var cHeight = targetTD.find(".m-menu").css("height");
                                    cWidth=parseInt(cWidth,10);
                                    cHeight=parseInt(cHeight,10);
                                    if(x<=50){
                                        $(".tagging").css("left","-5px");
                                    }else if(50<x && x<=120){
                                        $(".tagging").css("left","-25px");
                                    }else if(120<x && x<=pwidth-120){
                                        $(".tagging").css("left",(-(cWidth/2)+"px"));
                                    }else if((pwidth-120)<x && x<=(pwidth-50)){
                                        $(".tagging").css("left",(-(cWidth-25)+"px"));
                                    }else if((pwidth-x)<cWidth && x<=pwidth){
                                        $(".tagging").css("left",((-cWidth-5)+"px"));
                                    };
                                    if(y==65 || y==95){
                                        $(".tagging").css("top","30px");
                                    }else if(y==225 || y==255){
                                        $(".tagging").css("top",(-cHeight+"px"));
                                    };
                                };
                                var targetTD=target.parents("td");
                                setcoordinate(targetTD);
                                target.parent(".dateDD").find(".m-menu li").click(function(event) {
                                    showDialog("WorklogMain", "编辑",nurl, 1000, null, true);
                                });
                                target.parents("tr").siblings().children('td').mouseenter (function(event) {
                                    target.parents("td").css("z-index","");
                                    target.parents(".m-calendar").css("overflow","hidden");
                                    target.parent(".dateDD").find(".m-menu").remove();
                                });
                                target.parents("td").siblings().mouseenter (function(event) {
                                    target.parents("td").css("z-index","");
                                    target.parents(".m-calendar").css("overflow","hidden");
                                    target.parent(".dateDD").find(".m-menu").remove();
                                });
                                target.parent(".dateDD").find(".tagging").hover(function(event) {},function(){
                                    target.parents("td").css("z-index","");
                                    target.parent(".dateDD").find(".m-menu").remove();
                                    target.parents(".m-calendar").css("overflow","hidden");
                                });
                            };
                            var obj=$(event.target);
                            var right = obj.offset().left+obj.width();  
                            var down = obj.offset().top+obj.height();
                            setMenu(dataJson);
                            })
                        }else{
                            return false
                        }
                    }else if(_options.plugins=="datetime"){
                        getHoverDay();
                    }
                }
                if(_options.plugins=="calendar"){
                    getJson();
                    setTheDateLayDate();
                    // setTheLaydate()
                }else if(_options.plugins=="datetime"){
                    leftData={'lor':'.leftDate','thisYear':thisYear,'thisMonth':thisMonth,'thisDay':thisDay,'thisHour':thisHour,'thisMinute':thisMinute,'thisSecond':thisSecond};

                    $("#"+midDiv).data("leftData",leftData);
                    setTheLaydate(".leftDate");
                    if(_options.choose==true){
                        rightData={'lor':'.rightDate','thisYear':thisYear,'thisMonth':thisMonth,'thisDay':thisDay,'thisHour':thisHour,'thisMinute':thisMinute,'thisSecond':thisSecond};
                        $("#"+midDiv).data("rightData",rightData);
                        setTheLaydate(".rightDate");
                    }
                    menuBtn();
                    setThehms();
                }

                // }else{
                //     laydate = $("#"+_options.elem);
                //     laydate.data("options", _options);
                //     setNewLaydate(laydate);
                // }
                yMClick(".leftDate");
                setMinTime(_options.min);
                setMaxTime(_options.max);
                changeDate();

                setThead();
                setTheYearShow(YY,".leftDate");
                if(_options.choose==true){
                   setTheYearShow(YY,".rightDate");
                   yMClick(".rightDate")
                }
                setTheMonthShow();
            };
            if(_options.choose==true){
                laydate = $("#"+_options.elem);
                laydate.data("options", _options);
                setNewLaydate(laydate);
            }else{
                laydate = $("#"+_options.elem);
                laydate.data("options", _options);
                setNewLaydate(laydate);
            }
        }
    })
})(jQuery);