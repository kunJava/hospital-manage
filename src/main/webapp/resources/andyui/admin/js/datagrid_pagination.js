/*datagrid_pagination */
/**
 * 分页数据列表组件
 * author:林耘宇
 **/

(function($){
	$.fn.extend({
		an_datagridPagination:function(){
			var options = {};
            var funstyle = "";
            var arg = arguments[0];
            (typeof arg == "object")? options = arg:funstyle = arg;

            var _options = $.extend({
            	dpId:"",
            	url:"",
                urlParams:{},
                ajaxType:"get",
                addColumns:'',
                coverColumns:'',
                onPaginationSelect:function(){},//分页事件
                onLoadComplete:function(){},
            	onClickRow:function(){},//单击行事件
                onDblClickRow:function(){},//双击行事件
                onClickCell:function(){},//点击单元
                onDblClickCell:function(){}//双击单元
            }, options);

            var dp = $(this);
            if(_options.dpId == ""){
                dp = andy.setRandomId(dp, "datagrid_pagination_");
                _options.dpId = dp.attr("id");
                dpId=_options.dpId;
            }
            var getOption = dp.attr("options");
            var getValueElement = "";
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

            var loadListData,getChecked;
            loadListData = "EVENT_LOAD_LIST";
            getChecked = "EVENT_GET_TABLE_CHECKED";

            if(funstyle != ""){
            	if(funstyle == "loadListData"){
            		var url = arguments[1];
            		var isNewPagination = arguments[2];//默认刷新分页
                    var data = arguments[3];//参数设置
                    var ajaxType = arguments[4];//请求类型
            		if(isNewPagination != false){
            			isNewPagination = true;
            		}
            		var obj = {
            			url:url,
            			isNewPagination:isNewPagination,
                        data:data,
                        ajaxType:ajaxType
            		}
                    dp.trigger(loadListData, obj);
            	}else if(funstyle == "getChecked"){
                    var fun = arguments[1];
                    dp.trigger(getChecked, fun);
                }
            }else{
				var table = dp.find("table");
                var tableId = table.attr("id");
                table = $("#"+tableId);
				var pagination = dp.find(".m-pagebar");
				var paginationId = pagination.attr("id");
                var pageIndex = 1;
				var initPagination = function(){
					if(pagination[0]){
						var templateStr = "<div class='f-left'> 每页显示"+
			              "<select class='u-select xs auto' page-select = ''>"+
			                "<option>10</option>"+
			                "<option>20</option>"+
			                "<option>30</option>"+
			                "<option>40</option>"+
			                "<option>50</option>"+
			              "</select>"+
			              "<button class='u-btn xs texture' page-fist = ''><i class='iconfont'>&#xe60e;</i></button>"+
			              "<button class='u-btn xs texture' page-prev = ''><i class='iconfont'>&#xe787;</i></button>"+
			              "第<input type='text' style='width:50px' value='1' class='u-input xs auto' page-index = ''>共<a page-counts>10</a>页"+
			              "<button class='u-btn xs texture' page-next = ''><i class='iconfont'>&#xe788;</i></button>"+
			              "<button class='u-btn xs texture' page-last = ''><i class='iconfont'>&#xe60d;</i></button>"+
				            "</div><div class='f-right' page-record = ''>共2000记录</div>";

				        pagination.append(templateStr);
					}
				}

                var goTable = function(data){
                    // var tableOption = $.extend(true, _options, {
                    //     bodyUrl:data
                    // })
                    // 直接替换老数据
                    _options.bodyUrl = data;
                    var tableOption = _options;
                    // console.log(tableOption, data)
                    table.an_datagrid(tableOption)

                    if(data['total'] && pagination.hasClass("promty") == false){
                        var obj = {};
                        var pageObject = {};
                        obj = $.extend(true, data,tableOption, {
                            onSelectPage:function(index, pageCounts){
                                // console.log(_options.url+"?pageNumber="+index+"&pageSize="+pageCounts)
                                // loadTable(_options.url+"?pageNumber="+index+"&pageSize="+pageCounts)
                                // loadTable(_options.url)
                                // console.log("当前页:"+index+",显示条数:"+pageCounts);
                                loadTable(_options.url+"?pageNumber="+index+"&pageSize="+pageCounts, "have");
                                 // console.log("当前页:"+index+",显示条数:"+pageCounts);
                                 pageIndex = index;
                                if(_options.onPaginationSelect){
                                    _options.onPaginationSelect(index, parseInt(pageCounts))
                                }
                            }
                        })
                        pagination.empty();
                        initPagination()
                        if(obj.urlParams.pageNumber){
                            obj.index = obj.urlParams.pageNumber;
                        }
                        pagination.an_pagination(obj);
                        
                        pagination.addClass("promty");
                    }
                    
                }

				var loadTable = function(url, ishave){
                    table.find("tbody").empty();
                    var param = _options.urlParams;
                    if(ishave == "have"){
                        param = {};
                    }

                    var loadData = function(url, param, ajaxType, callback){
                        if(ajaxType == "get"){
                            andy.loaddata(url, param, function(data){
                                callback(data)
                            })
                        }else{
                            andy.postdata(url, param, function(data){
                                callback(data)
                            })
                        }
                    }
                    
                    if(typeof url == "object"){
                        goTable(url);
                        _options.onLoadComplete(url);
                    }else if(_options.ajaxType == "get"){
                        loadData(url, param,"get", function(data){
                            goTable(data);
                            _options.onLoadComplete(data);
                        })
                    }else if(_options.ajaxType == "post"){
                        loadData(url, param,"post", function(data){
                            goTable(data);
                            _options.onLoadComplete(data);
                        })
                    }
				}
                
                if(_options.url != ""){
                	loadTable(_options.url)
                }

                // 获取列表选中值
                dp.bind(getChecked, function(e, fun){
                    var tt = $("#"+tableId);
                    tt.an_datagrid("getChecked", function(value, data){
                        fun(value, data)
                    })
                })

                dp.bind(loadListData, function(e, obj){
                	// console.log("url")
                	if(obj.isNewPagination){
                		pagination.removeClass("promty");
                	}
                    if(obj.ajaxType){
                        _options.ajaxType = obj.ajaxType;
                    }
                    if(obj.data){
                        _options.urlParams = $.extend(true, {}, _options.urlParams, obj.data)
                    }
                	loadTable(obj.url)
                })
            }
		}
	})
})($);
