(function($){
	
    function createRadioBox($div,This,options){
        var initChecks = function(){
            if(options.data){
            	var valueField=options.valueField || 'value';
            	var textField=options.textField || 'text';
            	var itemWidth=options.itemWidth || '';
            	if (itemWidth!='') {
            		itemWidth="width:"+itemWidth;
    			}
            	var nameAttr=This.attr("name");
            	var editable='';
            	if (options.editable) {editable="disabled='disabled'";}
                $.each(options.data,function(index,item){
                	if (index==0) {
                		if(!options.checked){
                            This.attr("value", item[valueField])
                        }
                		$div.append('<label class="u-checkbox" style="'+itemWidth+'" ><input name="'+nameAttr+'_radio" type="radio" '+editable+' value="'+item[valueField]+'" checked="checked" >'+item[textField]+'</label>');
    				}else {
    					$div.append('<label class="u-checkbox" style="'+itemWidth+'" ><input name="'+nameAttr+'_radio" type="radio" '+editable+' value="'+item[valueField]+'" >'+item[textField]+'</label>');
    				}
                });
                registerEvent($div,This,options);
                if(options.checked){
                    This.an_checkbox("setValue", options.checked)
                }
            }    
        }

        if(options.url){
            andy.loaddata(options.url, function(data){
                options.data = data;
                initChecks();
            })
        }

        initChecks()
    }

    function registerEvent($div,This,options){
    	$div.find("input").on('click',function(){
            This.val(This.an_radiobox("getValue"));
            if(options.onclick){
                options.onclick(This)
            }
        });
    }

    function setValueToInput(This, value){
        This.attr("value", value)
    }

    $.fn.an_radiobox = function(options, param){
        if (typeof options == 'string'){
            var method = $.fn.an_radiobox.methods[options];
            if (method){
                return method(this.next(), param);
            }
        }else {
            // 获取 设置对象
            var getOption = this.attr("options");
            var getValueElement = "";
            if(getOption){
                 getOption = "{"+ getOption+"}";
                 getOption = andy.stringToJson(getOption);
                // 处理设置
                for(var name in getOption){
                    if(name == "checked"){
                        //入值隐藏input
                        setValueToInput(this, getOption[name])
                        options.checked = getOption[name];
                    }else{
                        options[name] = getOption[name];
                    }
                }
            }
        	var width = options.width||this.width();
            var height = options.height||this.height();
            var $div = $("<div class='u-input-span' ></div>");
            $div.width(width);
            $div.height(height);
            this.hide();
        	this.after($div);
        	options = options || {};
            createRadioBox($div,this,options);   
		}
    };
    
    $.fn.an_radiobox.methods={
        getValue:function(me,para){
        	var checked = me.find('input:checked');
        	var val ="";
			if (checked.length)
				val= checked[0].value;
			return val;
        },
        setValue:function(me,para){
        	me.find("input").each(function(index,item){
                if(para == $(item).attr('value')){
                    if($(item).prop('checked')!=true){         
                         $(item).prop('checked',true);
                    }
                }
            });
        }
    };
})(jQuery);