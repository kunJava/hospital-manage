/*mod */
/**
 * 组件基础模型
 * author:林耘宇
 **/

 (function(win){
    var mod = function(){};
    var $doc = $(document);
    var $win = $(window);

    mod.prototype.init = function(options){
        var defaultOptions = mod.prototype.getOptions();
        mod.prototype.setOptions($.extend(defaultOptions, options))
    }

    mod.prototype.extendOptions = function(str){
        var getOption = "{"+ str+"}";
        getOption = andy.stringToJson(getOption);
        var options = mod.prototype.getOptions();
        // 处理设置
        for(var name in getOption){
            if(getOption[name] == "true"){
                options[name] = true;
            }else if(getOption[name] == "false"){
                options[name] = false;
            }else{
                options[name] = getOption[name];
            }
        }
        mod.prototype.setOptions(options)
    }

    mod.prototype.setOptions = function(options){
        mod.prototype.options = options;
    }

    mod.prototype.getOptions = function(){
        return mod.prototype.options;
    }

    mod.prototype.checkIsHaveScroll = function(){
        var have = false;
        if($doc.height() > $win.innerHeight()){
            have = true;
        };
        return have;
    }
    win.module = mod;
 })(window)