$(function(){
	//页面侧边栏
	var $totoplist = $(".to_top_list");
    $(".erweima_list").hover(function () {
        $(".erweima_box").show()
    }, function () {
        $(".erweima_box").hide()
    });
    $totoplist.hover(function () {
        $(".to_top").stop(1,0).animate({
            left:-45+"px"
        })
    }, function () {
        $(".to_top").stop(1,0).animate({
            left:-1+"px"
        })
    });
    $totoplist.click(function () {
        if($(window).scrollTop() >=300){
            $('html,body').animate({scrollTop:0},700)
        }
    });
	$(window).scroll(function(){
		//获取窗口的滚动条的垂直位置
        var s = $(window).scrollTop();
        if(s>700){
            $(".m-topmenus").fadeIn(100);
        }else{
            $(".m-topmenus").fadeOut(200);
        }
        if( s > 288){
            $(".slider_bar").fadeIn(100);
        }else{
            $(".slider_bar").fadeOut(200);
        }
    });
    //游记攻略侧边栏
    $('.sight-rightBar').on('click',function(){
		if($(this).hasClass('hide')){
			$(this).removeClass('hide');
		}else{
			$(this).addClass('hide');
		}
    })
	//tabs切换
	$('.s-panle .s-panel-head span').on('click',function(){
		var index = $(this).attr('tabindex');
		$(this).parent().find('span').removeClass('active');
		$(this).addClass('active');
		$('.s-panle .s-panel-body .item').removeClass('active');
		$('.s-panle .s-panel-body .item').each(function(i,e){
			if($(e).attr('tabindex') == index){
				$(e).addClass('active');
			}
		})
	});
	//评论收缩按钮
	$('.revertbtn').on('click',function(){
		if($(this).hasClass('revertbtn-down')){
			$(this).removeClass('revertbtn-down');
			$(this).addClass('revertbtn-up');
		}else if($(this).hasClass('revertbtn-up')){
			$(this).removeClass('revertbtn-up');
			$(this).addClass('revertbtn-down');
		}
		$($(this).parents('.u-revert')).find('.revert-text').toggle();		
	})
	//首页轮播
	$('#carousel').carouFredSel({
		circular: true,
		responsive:true,
		direction:'left',
		height:550,
		synchronise:["#footerBar", true, true, 0],
		items: {
			visible: 1,
			minimum: 1,
			height:'100%'
		},
		prev: '#carousel-prev',//指定左翻按钮
		next: '#carousel-next',//指定右翻按钮
		pagination: {
			container: '#carousel-pager',
			anchorBuilder: function( nr ) {
				var src1=$(this).find('img').attr('src');
				return '<div class="pager-img"><img src='+src1+' alt=""/> </div>';
			}
		},
		scroll:{
			items:1,
			fx:'directscroll',
			easing:'linear',
			duration:500,
			pauseOnHover:false
			},
		auto:{
			play:'auto',
			pauseDuration:2500
			}
	});
	//目的地轮播
	$('#carousel1').carouFredSel({
		circular: true,
		responsive:true,
		direction:'left',
		height:672,
		synchronise:["#footerBar", true, true, 0],
		items: {
			visible: 1,
			minimum: 1,
			height:'100%'
		},
		prev: '#carousel-prev1',//指定左翻按钮
		next: '#carousel-next1',//指定右翻按钮
		scroll:{
			items:1,
			fx:'directscroll',
			easing:'linear',
			duration:500,
			pauseOnHover:false
			},
		auto:{
			play:'auto',
			pauseDuration:2500
			}
	});
	//目的地详情轮播
	$('#carousel3 li').each(function(i) {
		$(this).addClass( 'itm'+i );
		$(this).click(function() {
			$('#carousel2').trigger( 'slideTo', [i, 0, true] );
			return false;
		});
	});
	$('#carousel3 li.itm0').addClass( 'selected' );
	$('#carousel2').carouFredSel({
		circular: true,
		responsive:true,
		direction:'left',
		height:540,
		items: {
			visible: 1,
			minimum: 1,
			height:'100%'
		},
		scroll:{
			fx: 'directscroll',
			onBefore: function() {
				var pos = $(this).triggerHandler( 'currentPosition' );
				$('#carousel3 li').removeClass( 'selected' );
				$('#carousel3 li.itm'+pos).addClass( 'selected' );
				var page = Math.floor( pos / 6);
				$('#carousel3').trigger( 'slideToPage', page );
			}
			},
		auto:{
			play:'auto',
			pauseDuration:2500
			}
	});
	$('#carousel3').carouFredSel({
		circular: true,
		responsive:true,
		direction:'left',
		height:85,
		items: {
			visible: 6,
			minimum: 6,
			height:'100%'
		},
		prev: '#carousel-prev3',
		next: '#carousel-next3',
		auto:false
	});
	$('#carousel6 li').each(function(i) {
		$(this).addClass( 'itm'+i );
		$(this).click(function() {
			$('#carousel5').trigger( 'slideTo', [i, 0, true] );
			return false;
		});
	});
	$('#carousel6 li.itm0').addClass( 'selected' );
	$('#carousel5').carouFredSel({
		circular: true,
		responsive:true,
		direction:'left',
		height:378,
		items: {
			visible: 1,
			minimum: 1,
			height:'100%'
		},
		scroll:{
			fx: 'directscroll',
			onBefore: function() {
				var pos = $(this).triggerHandler( 'currentPosition' );
				$('#carousel6 li').removeClass( 'selected' );
				$('#carousel6 li.itm'+pos).addClass( 'selected' );
				var page = Math.floor( pos / 3);
				$('#carousel6').trigger( 'slideToPage', page );
			}
			},
		auto:{
			play:'auto',
			pauseDuration:2500
			}
	});
	$('#carousel6').carouFredSel({
		circular: true,
		responsive:true,
		direction:'left',
		height:85,
		items: {
			visible: 3,
			minimum: 3,
			height:'100%'
		},
		prev: '#carousel-prev6',
		next: '#carousel-next6',
		auto:false
	});
	
	
	
	$('#carousel9 li').each(function(i) {
		$(this).addClass( 'itm'+i );
		$(this).click(function() {
			$('#carousel8').trigger( 'slideTo', [i, 0, true] );
			return false;
		});
	});
	$('#carousel9 li.itm0').addClass( 'selected' );
	$('#carousel8').carouFredSel({
		circular: true,
		responsive:true,
		direction:'left',
		height:280,
		items: {
			visible: 1,
			minimum: 1,
			height:'100%'
		},
		scroll:{
			fx: 'directscroll',
			onBefore: function() {
				var pos = $(this).triggerHandler( 'currentPosition' );
				$('#carousel9 li').removeClass( 'selected' );
				$('#carousel9 li.itm'+pos).addClass( 'selected' );
				var page = Math.floor( pos / 4);
				$('#carousel9').trigger( 'slideToPage', page );
			}
			},
		auto:{
			play:'auto',
			pauseDuration:2500
			}
	});
	$('#carousel9').carouFredSel({
		circular: true,
		responsive:true,
		direction:'left',
		height:60,
		items: {
			visible: 4,
			minimum: 3,
			height:'100%'
		},
		prev: '#carousel-prev9',
		next: '#carousel-next9',
		auto:false
	});

	//酒店购买图片轮播
	function jdlunbo(){
		var $Circle = $(".right_box"),
	    ul = $(".jd-lunbo-slide .left .ul2"),
	    $ul2li = ul.find('li'),i = 0;
	    $.each($ul2li, function (ind,obj) {
	      	var $src = $(obj).find('img').attr('src');
	      	var m="";
	      	m += '<li style="background: url('+$src+') no-repeat center"></li>';
	      	$Circle.append(m);
	    });
	    function pptMove() {
	      	ul.stop(1,0).animate({
	        	left:-850*i
	      	},500);
	      	$rightbox.eq(i).addClass("right_box_on").siblings().removeClass("right_box_on");
	    }
	    $(".prevjd").click(function() {
	      	i--;
		    if(i == -1){
		        i= $ul2li.length-1;
		    }
	      	pptMove();
	    });
	    $(".nextjd").click(function() {
	      	i++;
	      	if(i == $ul2li.length){
	        	i=0;
	      	}
	      	pptMove();
	    });
	    var $rightbox =$(".right_box li");
	    $rightbox.first().addClass('right_box_on');
	    $rightbox.each(function (ind,obj) {
		    $(obj).click(function () {
		        i = ind ;
		        pptMove();
		        $(this).addClass("right_box_on").siblings().removeClass("right_box_on");
		    });
		    $(".label_number span").text((ind+1)+'张')
	    });
	}
	jdlunbo();
	//活动轮播
	$('#carousel4').carouFredSel({
		circular: true,
		responsive:true,
		direction:'left',
		height:487,
		items: {
			visible: 1,
			minimum: 1,
			height:'100%'
		},
		pagination: "#carousel-pager4",//指定圆点坐标
		scroll:{
			items:1,
			fx:'directscroll',
			easing:'linear',
			duration:500,
			pauseOnHover:false
			},
		auto:{
			play:'auto',
			pauseDuration:2500
			}
	});
	//酒店轮播
	$('#carousel7').carouFredSel({
		circular: true,
		responsive:true,
		direction:'left',
		height:280,
		items: {
			visible: 1,
			minimum: 1,
			height:'100%'
		},
		pagination: "#carousel-pager7",//指定圆点坐标
		scroll:{
			items:1,
			fx:'directscroll',
			easing:'linear',
			duration:500,
			pauseOnHover:false
			},
		auto:{
			play:'auto',
			pauseDuration:2500
			}
	});
})

