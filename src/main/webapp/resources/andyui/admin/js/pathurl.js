/*path */
/**
 * 路径导航/面包屑
 * author:林耘宇
 **/

 (function ($) {
    $.fn.extend({
        an_path:function(){
            var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;

            var _options = $.extend({
                url:"",
                data:"",
                disableA:false,//是否禁用a标签链接
                spliteIcon:"&#xe600",
                onClick:function(){}
            }, options);

            var path = $(this);

            // 私有事件
            var reset = "EVENT_RESET";

            // 获取 设置对象
            var getOption = path.attr("options");
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

            if(funstyle != ""){
                if(funstyle == "reset"){
                    var obj = {
                        data:arguments[1]
                    }
                    path.trigger(reset, obj);
                };
            }else{

                function creatList(data){
                    var str ="";
                    for(var i = 0;i<data.length;i++){
                        var d = data[i];
                        var target, url,icon, isHome, active;
                        isHome = i ==0?"home":"";
                        active = (i == data.length - 1)?" active":"";
                        url = d.url && d.url!= "" && _options.disableA == false?d.url:"javascript:;";
                        spliteIcon = "<i class = 'iconfont'>"+_options.spliteIcon+"</i>";
                        icons = d.icons && d.icon != ""?"<i class = 'iconfont homeicon'>"+d.icons+"</i>":"";
                        d.target && d.target!= ""?target = "target="+d.target:target = "";
                        str += "<li liId = "+d.id+" class = "+isHome+ active+" ><a href ="+url+" target = "+target+">"+
                        icons+d.text+spliteIcon+"</a></li>";
                    }
                    path.append(str)
                    path.find("li").each(function(index, li){
                        var $li = $(li);
                        $li.data("json", data[index])
                        $li.click(function(e){
                            _options.onClick($(this).data("json"))
                            e.preventDefault()
                        })
                    })
                }

                function loadData(){
                    if(_options.url!= ""){
                        andy.loadData(_options.url, function(data){
                            creatList(data)
                        })
                    }else{
                        creatList(data)
                    }
                }

                function init(){
                    loadData()
                }
                init()


                // 方法执行
                path.bind(reset, function(e, obj){
                    path.empty()
                    creatList(obj.data)
                })
            }; 
        }
    });
})(jQuery);