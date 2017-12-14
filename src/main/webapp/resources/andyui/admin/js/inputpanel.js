
 
 
 (function ($) {
    $.fn.extend({
    	an_select:function(){
    		var ths = $(this);
    		var options = {};
            var funstyle = "";
            for(var i= 0; i <arguments.length;i++){
                var a = arguments[0];
                if(typeof a == "object"){
                    options = a;
                }else if(typeof a == "string"){
                    funstyle = a;
                }
            };

            var _options = $.extend({
                showUrl:"",//
                itemNum:0,
                width:null,
                itemWidth:[],//默认数据组["01", "02", "03"]
                checked:[],//默认选中 注意 数据里面是id数列
                inputName:"panel-input"
            }, options);
            options = andy.stringToJson(ths.attr("options"));
            _options = $.extend(_options, options);
            
    		
    		
    		
    		if(funstyle != ""){
    			// 私有事件
	            var getValue = "EVENT_VALUE";
	    		ths.bind("EVENT_VALUE", function(e, d,fun){
	    			d = d.split(',');
	    			//根据id回显
	    			var AllValue = '';
	    			function getAllDataById(id,data){
    					for(var i = 0;i < data.length; i ++){
	                        if(data[i].id == id){
	                        	AllValue = data[i].name;
	                        }else if(data[i].children){
	                            getAllDataById(id, data[i].children);
	                        }
	                    }
	                    if(AllValue != ""){
	                        return AllValue;
	                    }
    				}
	    			andy.loaddata(_options.showUrl,function(data){
	    				var zhi = [];
	    				for(var i = 0;i<d.length;i++){
	    					zhi.push(getAllDataById(d[i],data));
	    				};
						fun(zhi);
	    			})
	            });
    			
    			if(funstyle == "getValue"){
					ths.trigger(getValue, [arguments[2],arguments[1]]);
				};
    		}else{
      			$(ths).wrap("<div class='m-tooltip'></div>");
	    		$(ths).addClass('s-btn');
	    		
	    		var commaStr = '';
	    		for(var i = 0;i<_options.itemNum-1;i++){
	    			commaStr += ','
	    		}
	    		if(!_options.width){
	    			$(ths).after('<input type="hidden" name="'+_options.inputName+'" iddata="'+commaStr+'" valuedata="'+commaStr+'" namedata="'+commaStr+'" value=""/><div class="s-panel f-b f-bg-white" style="display:none;"></div>');
	    			_options.width = $(ths).parent().css('width').slice(0,-2);
	    		}else{
	    			$(ths).after('<input type="hidden" name="'+_options.inputName+'" iddata="'+commaStr+'" valuedata="'+commaStr+'" namedata="'+commaStr+'" value=""/><div class="s-panel f-b f-bg-white" style="display:none;width:'+_options.width+'px;"></div>');
	    		}
	    		function jsHeight($father){
	    			var height = 0;
	    			$father.children().each(function(){
	    				height += parseInt($(this).css('height').slice(0,-2));
	    			});
	    			return height;
	    		}
	    		$('.s-btn').on('click',function(){
	    			$(this).nextAll('.s-panel').show();
	    			var longHeight = 0;
	    			for(var i = 0;i<_options.itemNum;i++){
	    				var curfrow= $(this).nextAll('.s-panel').children('div[class^=frow'+i+']')
	    				if(longHeight<jsHeight(curfrow)){
	    					longHeight = jsHeight(curfrow);
	    				}
	    			}
					for(var i = 0;i<_options.itemNum;i++){
						$($(this).nextAll('.s-panel').children('div[class^=frow]')[i]).css('height',longHeight+'px')
					}
	    		});
	    		$('.s-panel').parent().on('mouseleave',function(){
	    			$(this).children('.s-panel').hide();
	    		});
	    		var thisData = '';
	    		function getDataById(id, data){
                    for(var i = 0;i < data.length; i ++){
                        if(data[i].id == id){
                            thisData = data[i].children;
                        }else if(data[i].children){
                            getDataById(id, data[i].children);
                        }
                    }
                    if(thisData != ""){
                        return thisData;
                    }
                }
	    		
	    		
	    		
	    		//计算每个层级的宽度,记录在floorWidth数组中
				var itemWidth = [];
				if(_options.itemWidth.length == 0){
					var flwidth = Math.floor(_options.width/_options.itemNum)
					for(var i = 0;i<_options.itemNum;i++){
						itemWidth[i] = flwidth;
					}
				}else{
					var llen = 0;
					for(var i = 0;i<_options.itemWidth.length;i++){
						llen += _options.itemWidth[i];
						itemWidth[i] = _options.itemWidth[i];
					}
					var rlen = _options.width - llen;
					for(var i = _options.itemWidth.length,len = _options.itemNum - _options.itemWidth.length;i<_options.itemNum;i++){
						itemWidth[i] = Math.floor(rlen/len);
					}
				}
				_options.itemWidth = itemWidth;
    			
    			
    			//拼接每个层级的元素
				var f = '';
				for(var i = 0;i<_options.itemNum;i++){
					if(i == _options.itemNum-1){
						f += '<div class="frow'+i+' f-b-n" style="width:'+_options.itemWidth[i]+'px;"></div>';
					}else{
						f += '<div class="frow'+i+' f-b-r" style="width:'+_options.itemWidth[i]+'px;"></div>';
					}
				}
				$(ths).nextAll(".s-panel").append(f);
	    		
	    		
	    		
	    		if(_options.checked.length == 0){
	    			andy.loaddata(_options.showUrl,function(data){
		    			//拼接数据到上面
		    			var frow0 = '';
						for(var i = 0;i<data.length;i++){
							if(i % 2 == 0){
								frow0 += '<p class="f-bg-white" data-id="'+data[i].id+'" data-name="'+data[i].name+'" value="'+data[i].value+'">'+data[i].name+'</p>';
							}else{
								frow0 += '<p class="f-bg-light-lter" data-id="'+data[i].id+'" data-name="'+data[i].name+'" value="'+data[i].value+'">'+data[i].name+'</p>';
							}
						}
						$(ths).nextAll('.s-panel').children('.frow0').append(frow0);
		    			function spHide($this){
							$this.parents('.m-tooltip').find('.s-panel').hide();
						}
		    			//点击事件
						function dianji(){
							var $input = $(this).parent().parent().prevAll('input');
							var iddata = $($(this).parent().parent()[0]).prev().attr('iddata');
							var valuedata = $($(this).parent().parent()[0]).prev().attr('valuedata');
							var namedata = $($(this).parent().parent()[0]).prev().attr('namedata');
							iddata = iddata.split(',');
							valuedata = valuedata.split(',');
							namedata = namedata.split(',');
							
							var cj = parseInt($(this).parent().attr('class').slice(4,5));
							iddata[cj] = $(this).data('id');
							valuedata[cj] = $(this).attr('value');
							namedata[cj] = $(this).data('name');
							for(var i = cj+1;i<_options.itemNum;i++){
								iddata[i] = '';
								valuedata[i] = '';
								namedata[i] = '';
							}
							for(var i = 0 ;i<namedata.length;i++){
							    if(namedata[i] == "" || typeof(namedata[i]) == "undefined"){
				                    namedata.splice(i,1);
				                    i= i-1;
							    }
							}
							$input.attr('value',namedata.join('-'));

							iddata = iddata.join(',');
							var value = '';
							for(var i = 0;i<valuedata.length;i++){
								if(valuedata[i] != ''){
									value = valuedata[i];
								}
							}
							valuedata = valuedata.join(',');
							namedata = namedata.join(',');
							
							$($(this).parent().parent()[0]).prev().attr('iddata',iddata);
							$($(this).parent().parent()[0]).prev().attr('valuedata',valuedata);
							$($(this).parent().parent()[0]).prev().attr('namedata',namedata);
							$($(this).parent().parent()[0]).prev().attr('value',value);
							
							
							$(this).parent().find('p').removeClass('activate');
							
							$(this).addClass('activate');
							var curId = $(this).data('id');
							
							var curChildren = getDataById(curId,data); 
							
	
							
							var nextRow = $(this).parent().next();
							var nextStr = '';
							if(curChildren){
								for(var i = 0;i<curChildren.length;i++){
									if(i % 2 == 0){
										nextStr += '<p class="f-bg-white" data-id="'+curChildren[i].id+'" data-name="'+curChildren[i].name+'" value="'+curChildren[i].value+'">'+curChildren[i].name+'</p>';
									}else{
										nextStr += '<p class="f-bg-light-lter" data-id="'+curChildren[i].id+'" data-name="'+curChildren[i].name+'" value="'+curChildren[i].value+'">'+curChildren[i].name+'</p>';
									}
								}
								var frag=document.createDocumentFragment();
						  		frag = $($(frag).append(nextStr)); 
						  		$(this).parent().nextAll().empty();
								nextRow.append(frag);
								
								var longHeight = 0;
				    			for(var i = 0;i<_options.itemNum;i++){
				    				var curfrow= $input.nextAll('.s-panel').children('div[class^=frow'+i+']')
				    				if(longHeight<jsHeight(curfrow)){
				    					longHeight = jsHeight(curfrow);
				    				}
				    			}
								for(var i = 0;i<_options.itemNum;i++){
									$($input.nextAll('.s-panel').children('div[class^=frow]')[i]).css('height',longHeight+'px');
//									$($('div[class^=frow]')[i]).css('height',longHeight+'px');
								}
								
								$input.nextAll('.s-panel').find('[class^=frow] p').off();
								$input.nextAll('.s-panel').find('[class^=frow] p').on('click',dianji);
							}else{
								$(this).parent().nextAll().empty();
								spHide($(this));
							}
							
						}
						$(ths).nextAll('.s-panel').find('[class^=frow] p').on('click',dianji);
		    			
		    			
		    		});
	    			
	    			
	    		}else{
	    			andy.loaddata(_options.showUrl,function(data){
		    			//拼接数据到上面
		    			var frow = '';
		    			var idd = [];
		    			var valued = [];
		    			var value = '';
		    			var named = [];
		    			_options.checked = _options.checked.split(',')
						for(var i = 0,data01 = data;i<_options.checked.length;i++){
							for(var k = 0;k<data01.length;k++){
								if(k % 2 == 0){
									frow += '<p class="f-bg-white" data-id="'+data01[k].id+'" data-name="'+data01[k].name+'" value="'+data01[k].value+'">'+data01[k].name+'</p>';
								}else{
									frow += '<p class="f-bg-light-lter" data-id="'+data01[k].id+'" data-name="'+data01[k].name+'" value="'+data01[k].value+'">'+data01[k].name+'</p>';
								}
							}
							$(ths).nextAll('.s-panel').children('.frow'+i).append(frow);
							frow = '';
							var length01 = data01.length;
							var data02 = data01;
							for(var j = 0;j<length01;j++){
								if(data02[j].id == _options.checked[i]){
									$('[data-id='+data02[j].id+']').addClass('activate');
									idd.push(data02[j].id);
									named.push(data02[j].name);
									valued.push(data02[j].value);
									value = data02[j].value;
									data01 = data02[j].children;
								}
							}
						}
						var Ivalue = '';
						for(var i = 0;i<named.length;i++){
							if(i == 0){
								Ivalue += named[i];
							}else{
								Ivalue += '-'+named[i];
							}
						}
						$(ths).attr('value',Ivalue);
		    			$(ths).next().attr('iddata',idd);
						$(ths).next().attr('namedata',named);
						$(ths).next().attr('valuedata',valued);
						$(ths).next().attr('value',value);
		    			
		    			function spHide($this){
							$this.parents('.m-tooltip').find('.s-panel').hide();
						}
		    			function dianji(){
							var $input = $(this).parent().parent().prevAll('input');
							var iddata = $($(this).parent().parent()[0]).prev().attr('iddata');
							var valuedata = $($(this).parent().parent()[0]).prev().attr('valuedata');
							var namedata = $($(this).parent().parent()[0]).prev().attr('namedata');
							iddata = iddata.split(',');
							valuedata = valuedata.split(',');
							namedata = namedata.split(',');
							
							var cj = parseInt($(this).parent().attr('class').slice(4,5));
							iddata[cj] = $(this).data('id');
							valuedata[cj] = $(this).attr('value');
							namedata[cj] = $(this).data('name');
							for(var i = cj+1;i<_options.itemNum;i++){
								iddata[i] = '';
								valuedata[i] = '';
								namedata[i] = '';
							}
							for(var i = 0 ;i<namedata.length;i++){
							    if(namedata[i] == "" || typeof(namedata[i]) == "undefined"){
				                    namedata.splice(i,1);
				                    i= i-1;
							    }
							}
							$input.attr('value',namedata.join('-'));

							iddata = iddata.join(',');
							var value = '';
							for(var i = 0;i<valuedata.length;i++){
								if(valuedata[i] != ''){
									value = valuedata[i];
								}
							}
							valuedata = valuedata.join(',');
							namedata = namedata.join(',');
							
							$($(this).parent().parent()[0]).prev().attr('iddata',iddata);
							$($(this).parent().parent()[0]).prev().attr('valuedata',valuedata);
							$($(this).parent().parent()[0]).prev().attr('namedata',namedata);
							$($(this).parent().parent()[0]).prev().attr('value',value);
							
							
							$(this).parent().find('p').removeClass('activate');
							
							$(this).addClass('activate');
							var curId = $(this).data('id');
							
							var curChildren = getDataById(curId,data); 
							
	
							
							var nextRow = $(this).parent().next();
							var nextStr = '';
							if(curChildren){
								for(var i = 0;i<curChildren.length;i++){
									if(i % 2 == 0){
										nextStr += '<p class="f-bg-white" data-id="'+curChildren[i].id+'" data-name="'+curChildren[i].name+'" value="'+curChildren[i].value+'">'+curChildren[i].name+'</p>';
									}else{
										nextStr += '<p class="f-bg-light-lter" data-id="'+curChildren[i].id+'" data-name="'+curChildren[i].name+'" value="'+curChildren[i].value+'">'+curChildren[i].name+'</p>';
									}
								}
								var frag=document.createDocumentFragment();
						  		frag = $($(frag).append(nextStr)); 
						  		$(this).parent().nextAll().empty();
								nextRow.append(frag);
								
								var longHeight = 0;
				    			for(var i = 0;i<_options.itemNum;i++){
				    				var curfrow= $input.nextAll('.s-panel').children('div[class^=frow'+i+']')
				    				if(longHeight<jsHeight(curfrow)){
				    					longHeight = jsHeight(curfrow);
				    				}
				    			}
								for(var i = 0;i<_options.itemNum;i++){
									$($input.nextAll('.s-panel').children('div[class^=frow]')[i]).css('height',longHeight+'px');
//									$($('div[class^=frow]')[i]).css('height',longHeight+'px');
								}
								
								$input.nextAll('.s-panel').find('[class^=frow] p').off();
								$input.nextAll('.s-panel').find('[class^=frow] p').on('click',dianji);
							}else{
								$(this).parent().nextAll().empty();
								spHide($(this));
							}
							
						}
							
						$('[class^=frow] p').on('click',dianji);
		    			
		    			
		    		});
	    		}
    		}
    	}
    });
})(jQuery);
