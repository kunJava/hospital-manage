(function ($) {
    $.fn.extend({
        an_setPaginer:function(pageNumber,pageCount){
            if(pageCount<2){
                var str="";
                $(".sc_paginer").hide();
            }else if(pageCount<6){
                var str="";
                for(var i=1;i<pageCount+1;i++){
                    var pageNumber=parseInt(pageNumber)
                    if(i==pageNumber){
                        strP="<li class='numPage thisPage'pageNumber='"+i+"'><a>"+i+"</a></li>";
                    }else{
                        strP="<li class='numPage'pageNumber='"+i+"'><a>"+i+"</a></li>";
                    }
                    str+=strP;
                }
                str="<ul><li class='lastPage'><a>上一页</a></li>"+str+"<li class='endPage'><a>末页</a></li><li class='nextPage'><a>下一页</a></li></ul>"
                $(".sc_paginer").html(str);
            }else if(pageCount>5&&pageCount<=100){
            }
            $(".sc_paginer ul li").children("a").click(function(event){
                var thisClick=$(this).parent("li")
                if(thisClick.hasClass('numPage')){
                    thisClick.siblings().removeClass('thisPage');
                    thisClick.addClass('thisPage');
                    pageNumber=thisClick.attr("pageNumber");
                    loadXMLDoc(pageNumber)
                }else if(thisClick.hasClass('lastPage')){
                    thisClick.parent("ul").children("li").each(function(index, li) {
                        var li=$(li);
                        if(li.hasClass('thisPage')!=""){
                            pageNumber=li.attr('pageNumber')
                            pageNumber=parseInt(pageNumber)
                            if(pageNumber-1==0){
                                pageNumber=1;
                            }else{
                                pageNumber=pageNumber-1;
                            }
                            
                            loadXMLDoc(pageNumber);
                        }
                    });
                }else if(thisClick.hasClass('nextPage')){
                    thisClick.parent("ul").children("li").each(function(index, li) {
                        var li=$(li);
                        if(li.hasClass('thisPage')!=""){
                            pageNumber=li.attr('pageNumber');
                            pageNumber=parseInt(pageNumber);
                            if(pageNumber+1>pageCount){
                                pageNumber=pageCount;
                            }else{
                                pageNumber=pageNumber+1;
                            }
                            loadXMLDoc(pageNumber);
                        }
                    });
                }else if(thisClick.hasClass('endPage')){
                    pageNumber=pageCount;
                    loadXMLDoc(pageNumber)
                }
            });
        }
    })
})(jQuery);