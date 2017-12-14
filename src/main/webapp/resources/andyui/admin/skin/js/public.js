/**
 * Created by LR on 17/3/22.
 */

$(function () {
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

});