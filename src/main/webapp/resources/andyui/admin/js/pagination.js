/*pagination */
/**
 * 分页模块
 * author:林耘宇
 **/
(function ($) {
    $.fn.extend({
        an_pagination:function(){
            var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;

            if(funstyle != ""){
                if(funstyle == "total"){

                    $(this).trigger("total", arguments[1].total);
                }
                if(funstyle == "select"){
                     $(this).trigger("select");
                }
            }else{
                //合并设置
                var _options = $.extend({
                    index:1,//默认打开页面索引
                    total:100,//总条数
                    selectListIndex:1,//选择列表索引默认为1
                    list:[10, 20, 30, 40, 50],//每页列表
                    onSelectPage:function(){}//选择每页显示行数
                }, options);

                var pn = $(this);
                var page_fist = pn.find("[page-fist]");//跳转到第一页
                var page_prev = pn.find("[page-prev]");//跳转到上一页
                var page_next = pn.find("[page-next]");//跳转到下一页
                var page_last = pn.find("[page-last]");//跳转到最后一页
                var page_index = pn.find("[page-index]");//当前页数
                var page_select = pn.find("[page-select]");
                var page_refresh = pn.find("[page-refresh]");//刷新当前页
                if(_options.pageSize > 0){
                    for(var i = 0; i < _options.list.length; i++){
                        if(_options.pageSize == _options.list[i]){
                            _options.selectListIndex = i+1;
                        }
                    }
                };
                var currentSelectNumber = _options.list[_options.selectListIndex - 1];

                _options.selectListIndex = parseInt(_options.selectListIndex);
                
                if(_options.selectListIndex > 1 || options.selectListIndex <= _options.list.length + 1){
                    currentSelectNumber = _options.list[_options.selectListIndex - 1];
                    page_select.val(currentSelectNumber)
                }
                if(page_select){
                    currentSelectNumber = page_select.val();
                }
                var index = parseInt(_options.index);
                //当前总页数
                var currentNumber = Math.ceil(parseInt(_options.total)/currentSelectNumber);

                var changeText = function(){
                    // pn.find("[page-counts]")page-record
                    var page_counts = pn.find("[page-counts]");
                    var page_recoud = pn.find("[page-record]");
                    var page_index = pn.find("[page-index]");
                    
                    if(page_counts){
                        page_counts.text(currentNumber)
                    }
                    if(page_index){
                        page_index.val(index);
                    }
                    if(page_recoud){
                        page_recoud.text("共"+_options.total+"条记录");
                    }
                    
                }


                // 输入页码
                if(page_index){
                    page_index.focus(function(e){
                        pn.unbind("select");
                    });
                    page_index.change(function(e){
                        index=$(e.target).val();
                        if(/^\-?\d+$/.test(index) && currentNumber!=0){
                            index=index<=0?1:index>currentNumber?currentNumber:index;
                            _options.onSelectPage(index, currentSelectNumber);
                        }
                    });
                    page_index.blur(function(e){
                         pn.bind("select",function(e){
                             _options.onSelectPage(index, currentSelectNumber);
                         });
                    });
                };
                
                //选择每页显示行数
                pn.find("[page-select]").change(function(e){
                    _options.onSelectPage(index, $(e.target).val());
                    currentSelectNumber = $(e.target).val();
                    currentNumber = Math.ceil(_options.total/currentSelectNumber);
                    if(index > currentNumber){
                        index = 1;
                    };
                    changeText();
                });
                pn.bind("select",function(e){
                    _options.onSelectPage(index, currentSelectNumber);
                });
                pn.bind("total", function(e, total){
                    _options.total = total;
                    currentNumber = Math.ceil(_options.total/currentSelectNumber);
                    if(index > currentNumber){
                        index = 1;
                    };
                    changeText();
                })

                if(page_fist){
                    page_fist.click(function(e){
                        if(index != 1){
                            index =1;
                            changeText();
                            _options.onSelectPage(index, currentSelectNumber);
                        }
                    })
                };

                if(page_prev){
                    page_prev.click(function(e){
                        if(index > 1){
                            index -=1;
                            changeText();
                            _options.onSelectPage(index, currentSelectNumber);
                        }
                    })
                };

                if(page_next){
                    page_next.click(function(e){
                        if(index < currentNumber){
                            index +=1;
                            changeText();
                            _options.onSelectPage(index, currentSelectNumber);
                        }
                    })
                };

                if(page_last){
                    page_last.click(function(e){
                        if(index != currentNumber){
                            index = currentNumber;
                            changeText();
                            _options.onSelectPage(index, currentSelectNumber);
                        }
                    })
                };

                if(page_refresh){
                    page_refresh.click(function(e){
                        _options.onSelectPage(index, currentSelectNumber);
                    })
                };

                if(page_index){
                    page_index.css("type", "number");
                    // page_index.attr("type", "number")
                    page_index.blur(function(e){
                        index = parseInt(page_index.val());
                        _options.onSelectPage(parseInt(page_index.val()), currentSelectNumber);
                        // console.log(page_index.val())
                    })
                };
                
                changeText();

                return _options;

            }

        }
    })
})(jQuery);