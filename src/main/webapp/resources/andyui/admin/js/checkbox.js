(function($){
    function createCheckbox($div,This,options){
        var checkIsHave = function(id){
            var have = false;
            for(var i = 0;i < options.checked.length; i++){
                if (options.checked[i]==id) {
                    have = true;
                }
            }
            return have;
        }
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
                    if (checkIsHave(item["id"])) {
                        if(!options.checked){
                            This.attr("value", item[valueField])
                        }
                        
                        $div.append('<label class="u-checkbox" style="'+itemWidth+'" ><input name="'+nameAttr+'_checkbox" type="checkbox" '+editable+' value="'+item[valueField]+'" checked="checked" >'+item[textField]+'</label>');
                    }else {
                        $div.append('<label class="u-checkbox" style="'+itemWidth+'" ><input name="'+nameAttr+'_checkbox" type="checkbox" '+editable+' value="'+item[valueField]+'" >'+item[textField]+'</label>');
                    }
                    
                });
                registerEvent($div,This);
                if(options.checked){
                    for(var i = 0; i < options.checked.length; i++){
                        This.an_checkbox("setValue", options.checked[i])
                    }
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

    function registerEvent($div,This){
    	$div.find("input").on('click',function(){
            This.val(This.an_checkbox("getValue"));
        });
    }

    function setValueToInput(This, value){
        This.attr("value", value)
    }

    $.fn.an_checkbox = function(options, param){
        if (typeof options == 'string'){
            var method = $.fn.an_checkbox.methods[options];
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
                        var data = getOption[name].split(",");
                        options.checked = data;
                    }else{
                        options[name] = getOption[name];
                    }
                }
            }else{
                if(options.checked){
                    setValueToInput(this, options.checked)
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
            createCheckbox($div,this,options);   

		}
    };
    
    $.fn.an_checkbox.methods={
        getValue:function(me,para){
            var values=new Array();
            var str = "";
            me.find("input").each(function(index,item){   
                if($(item).prop('checked')==true){   
                    values.push($(item).prop('value'));
                }
            });
            str = values.join(",");

            return str; 
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