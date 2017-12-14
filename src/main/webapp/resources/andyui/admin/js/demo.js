/*demo */
/**
 * 下拉列表模块
 * author:林耘宇
 **/


 (function ($) {
    $.fn.extend({
        an_demo:function(options, params){
            var am = new module();
            var demo = $(this);
            // 默认配置
            am.setOptions({
                
            })

            if(typeof options == "string"){
                var method = $.fn.an_demo.methods[options];
                if(method){
                    return method(demo, params);
                }
            }else{
                am.init(options)
                // 组件业务处理
            }
        }
    })
    $.fn.an_demo.methods = {
        getValue:function(demo, param){
            return "value";
        }
    }
})(jQuery);