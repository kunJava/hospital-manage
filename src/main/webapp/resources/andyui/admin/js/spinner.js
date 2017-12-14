/*spinner */
/**
 * 数字调节器
 * author:林耘宇
 **/

 (function ($) {
    $.fn.extend({
    	an_spinner:function(){
    		var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;

            var _options = $.extend({
                spinnerSize:"",//xs sm md lg
                increment:1,//默认增减值
                min:0,//默认为0
                max:99999,//默认99999
                inputName:"",
                value:1,//默认值
                onChange:function(){}
            }, options);

            var spi = $(this);
            if(spi.is("input")){
                var spinner_id = spi.attr("id");
                spi.removeAttr("id", "");
                spi.removeAttr("an-spinner", "");
                if(!spinner_id){
                    spinner_id = "spinner_"+andy.getRandom(10000);
                }
                var spinner_style = spi.attr("style");
                if(spi.attr("name")){
                    _options.inputName = spi.attr("name");
                    spi.removeAttr("name");    
                }
                if(spi.attr("value")){
                    _options.value = spi.attr("value");
                    spi.removeAttr("value");
                }
                
                var spinner_options = spi.attr("options");

                spi.css("display", "none");
                var subSpan = "<a class='item item-l u-btn' sub><i class='iconfont'>&#xe670;</i></a>";
                var addSpan = "<a class='item item-r u-btn' add><i class='iconfont'>&#xe66f;</i></a>";
                var valueInput = "<input type='text' class='item u-input nohover' name = '"+_options.inputName+"' style='text-align:center; width:0px; text-indent:0' value='"+_options.value+"' val>";
                var div = "<div class='u-group "+_options.spinnerSize+"' id = '"+spinner_id+"' style = '"+spinner_style+"' options = "+spinner_options+" an-spinner>"+subSpan+valueInput+addSpan+"</div>";
                spi.before(div);
                spi = $("#"+spinner_id);
                andy.layout(spi.parent());
            }
            var sub = spi.find("[sub]");
            var val = spi.find("[val]");
            var add = spi.find("[add]");

            // 私有事件
            var getValue = "EVENT_VALUE";

            // 获取 设置对象
            var getOption = spi.attr("options");
            if(getOption){
                 getOption = "{"+ getOption+"}";
                 getOption = andy.stringToJson(getOption);
                // 处理设置
                for(var name in getOption){
                    if(name == "onChange"){
                        var thisName = getOption[name];
                        _options.onChange = function(e){
                            var fun;
                            if(typeof thisName == "string"){
                                fun = andy.stringToJson(thisName);
                            }else{
                                fun = thisName;
                            }
                            
                            fun(e);
                        }
                    }else if(name == "increment"){
                        _options.increment = parseInt(getOption[name]);
                    }else if(name == "min"){
                        _options.min = parseInt(getOption[name]);
                    }else if(name == "max"){
                        _options.max = parseInt(getOption[name]);
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

            if(funstyle != ""){
				if(funstyle == "getValue"){
					var fun = arguments[1];
					spi.trigger(getValue, fun);
				};
            }else{

            	// 方法事件绑定
            	spi.bind(getValue, function(e, fun){
					fun(val.val());
            	});

				sub.click(function(e){
					var c = parseInt(val.val());
					if(c > _options.min){
						c -= _options.increment;
						val.val(c);
                        val.attr("value", c);
                        _options.onChange(val.val());
					};
	            });

	            add.click(function(e){
					var c = parseInt(val.val());
					if(c < _options.max){
						c += _options.increment;
						val.val(c);
                        val.attr("value", c);
                        _options.onChange(val.val());
					};
	            });
            }; 
    	}
	});
})(jQuery);