
(function (window) {
	var module = {}

	//关闭提示方法	
    module.an_alertclose= function(itemindex,itemcallback,itemdelaytime){
		itemindex.click(itemcallback);
        itemindex.mouseenter(function(e) {
            $(this).attr('lock',true);
			$(this).removeClass('fadeInDown');
			$(this).addClass('pulse');
        });
				
		itemindex.mouseout(function(e) {
			$(this).removeAttr('lock');
			$(this).removeClass('pulse');
			setTimeout(function(){
			if(itemindex.attr('lock')==undefined){
			itemindex.addClass('zoomOut');
			setTimeout(function(){itemindex.remove()},250);
			}
			},itemdelaytime);
			
			})
        setTimeout(function(){
			if(itemindex.attr('lock')==undefined){
			itemindex.addClass('zoomOut');
			setTimeout(function(){itemindex.remove()},250);
			}
		},itemdelaytime);
	}// JavaScript Document

	//打印提示方法
	module.an_alertitem =function(target,boxindex,al_content,al_style,al_callback,al_type,al_delaytime, _options){
		if(target=='top'){
			window.top.$('body').find('.alertnew').removeClass('alertnew');
			}else{
				$('body').find('.alertnew').removeClass('alertnew');
				}
		if(al_type=='message'){
			var item_icon='<i class="iconfont">&#xe703;</i> '
			}
		else if(al_type=='emial'){
			var item_icon='<i class="iconfont">&#xe6e7;</i> '
			}
		else {
			var item_icon='<img src="'+al_type+'" class="f-r-o f-left">'
			}
		boxindex.prepend("<div class='alert f-clear "+al_style+" f-m-b-xs animated fadeInDown alertnew' id = "+_options.id+" >"+item_icon+al_content+"</div>");
		if(target=='top'){				
			window.top.$('body').find('.alertnew').each(function() {
				var _this=$(this);
				andy.an_alertclose(_this,al_callback,al_delaytime);
               });
			
		}else{
		   $('body').find('.alertnew').each(function() {
		   var _this=$(this);
			andy.an_alertclose(_this,al_callback,al_delaytime);
           });
				
		}
	}
	//简易全局消息提示插件
	module.an_alert = function(options){
		var defaults = {
			id:"",
            type:'message',// message提示消息|emial系统信息|interflow交流
			style:'alert-black',//alert-success、alert-info、alert-warning、alert-danger、alert-default、alert-black
			content:'提示内容',//提示内容
//			url:'',//链接地址
//			urltarget:'self',//top,self链接的目标
			target:'top',//目标位置 top,self
			position:'t-m',//出现方向 t-m t-r b-r
			audio:'',//播放声音，仅支持高级浏览器
			callback:function(){},
			delaytime:5000//自动消失的时间
		}
		
        var _options = $.extend(defaults, options);
		
		if(_options.audio!=undefined && _options.audio!=''){
			window.top.$('body').append("<audio id='audio' src='"+_options.audio+"' autoplay></audio>");
			setTimeout(function(){window.top.$('body').find('#audio').remove()},1000);
			}
		
		if(_options.target=='top'){
			if(window.top.$('body').find('.'+_options.position).length==0){
				window.top.$('body').append("<div class='m-alertbox "+_options.position+"'></div>");
				var boxindex=window.top.$('body').find('.'+_options.position);
				andy.an_alertitem(_options.target,boxindex,_options.content,_options.style,_options.callback,_options.type,_options.delaytime, _options)
				}else{
				var boxindex=window.top.$('body').find('.'+_options.position);
				andy.an_alertitem(_options.target,boxindex,_options.content,_options.style,_options.callback,_options.type,_options.delaytime, _options)
			}
		}
		if(_options.target=='self'){
			if($('body').find('.'+_options.position).length==0){
				$('body').append("<div class='m-alertbox "+_options.position+"'></div>");
				var boxindex=$('body').find('.'+_options.position);
				andy.an_alertitem(_options.target,boxindex,_options.content,_options.style,_options.callback,_options.type,_options.delaytime, _options)
				}else{
				var boxindex=$('body').find('.'+_options.position);
				andy.an_alertitem(_options.target,boxindex,_options.content,_options.style,_options.callback,_options.type,_options.delaytime, _options)
			}
		}
	}
	
	

    $.extend(window.andy, module);
	// window.andy = module;
})(window);