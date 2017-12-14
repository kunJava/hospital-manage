
// json2.js 来源json官网
if (typeof JSON !== "object") {
    JSON = {};
}

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? "0" + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + "-" +
                        f(this.getUTCMonth() + 1) + "-" +
                        f(this.getUTCDate()) + "T" +
                        f(this.getUTCHours()) + ":" +
                        f(this.getUTCMinutes()) + ":" +
                        f(this.getUTCSeconds()) + "Z"
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {
        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
            : "\"" + string + "\"";
    }


    function str(key, holder) {
        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];
        if (value && typeof value === "object" &&
                typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
        case "string":
            return quote(value);

        case "number":
            return isFinite(value)
                ? String(value)
                : "null";

        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null";
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }

                v = partial.length === 0
                    ? "[]"
                    : gap
                        ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                        : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            }
            v = partial.length === 0
                ? "{}"
                : gap
                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                    : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }
    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }
            } else if (typeof space === "string") {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" &&
                    (typeof replacer !== "object" ||
                    typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            return str("", {"": value});
        };
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" +
                            ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

                j = eval("(" + text + ")");

                return (typeof reviver === "function")
                    ? walk({"": j}, "")
                    : j;
            }

            throw new SyntaxError("JSON.parse");
        };
    }
}());
/*
  数据操作
*/
(function (window) {
    var module = {};

    // -----------------------------------------------------------字符操作相关
    //读取数据方法 传入数据地址和加载完成后执行的方法callback
    //an_loaddata("xx.json", function(data){ console.log(data) })
    module.loaddata = function (dataUrl,argu,callback) {
        var data;
        if(arguments.length === 2){
            callback = argu;
            argu = undefined;
        }
        if (dataUrl.indexOf("{") > 0 || dataUrl.indexOf("[") > 0) {
            data = module.stringToJson(dataUrl);
            callback(data);
            return;
        }
        $.get(dataUrl, argu,function (data, status) {
            if (status == "success") {
                callback(data);
            }else {
                console.log(dataUrl + "|load data is failure!");
            };
        }).error(function(data) { 
            // 主要处理无链接的情况 status:404  statusText:"Not Found"
            callback(false, data);//data: data.status  data.statusText
        });
    };
    //传出数据方法 data结构{name:"xxx", id:"xx"}
    module.postdata = function(dataUrl, data, callback){
        if(arguments.length === 2){
            callback = data;
            data = undefined;
        }
        $.post(dataUrl, data, function (data, status) {
            if (status == "success") {
                callback(data);
            }else {
                console.log(dataUrl + "|load data is failure!");
            };
        });
    };

    // 通过API获取数据
    module.getDataByApi = function(api, callback, data, gettype){
        if(typeof api == "object"){
            return callback(api);
        }else{
            
        }
    }

    //数据转换string -> json
    module.stringToJson = function(string){
        var datastring = string;
        if(typeof datastring == "string"){
            // if(andy.IE() < 8 && andy.IE() != 0){
                // 不是不兼容parse问题 是json字符格式问题
                // datastring = JSON.parse(datastring);
            //     datastring = eval("("+datastring+")");
            // }else{
                datastring = eval("("+datastring+")");
            // }
        }
        return datastring;
    };
    // 数据转换json -> string
    module.jsonToString = function(obj){
        var data = obj;
        if(typeof data == "object"){
            data = JSON.stringify(data)
        }
        return data;
    }

    /* json字段 检索查询
        parms：arr json数据, str 条件

        Demo 1：//基础

        var arr = [3,5,7,8];

        var list1 = andy.where(arr, "data > 5") ; //得到[7,8]

        var list2 = andy.where(arr, "i  < 3"); // 得到[3,5,7]

         

        Demo 2:  //进阶

        var arr = [{id:1,name:"Jay"},{id:2,name:"Joy"},{id:3,name:"Bob"}];

        var list1 = andy.where(arr, "data.name == 'Joy'"); //得到 [{id:2,name:"Joy"}] ;

        var list2 = andy.where(arr, "data.name.indexOf('data')!=-1");//得到name含有'o'字母的 [{id:2,name:"Joy"},{id:3,name:"Bob"}];

         

        Demo 3: //高级

        var arr =[{name:"Jay",age:29,c:[{name:"A"},{name:"B"}]},{name:"Jay",age:26,c:[]},{name:"Jay",age:24,c:[{name:"C"}]}];

        var list1 = andy.where(arr, "data.age > 25 && !data.c && data.c.length > 0");

        //年龄大于25且至少有一个孩子 [{name:"Jay",age:29,children:[{name:"A"},{name:"B"}]}]
    */
    module.where =  function (arr, str) {
        var s = $.grep(arr, function (data, i){
            return JSON.parse(str);
        })
        return s;
    }

    /* 字符替换   ABCASDFASDF 把其中A替换为P, andy.stringReplace(ABCASDFASDF, A, P)
        支持 批量替换 
        andy.stringReplace(ABCASDFASDF, [A, B], P) 把A B 都替换为P
        andy.stringReplace(ABCASDFASDF, [A, B], [P, R]) 把A B 分别替换为P R
    */
    
    module.stringReplace = function(string, character, replace){
        var data = string;
        var reg;
        var setReplace = function(character, index){
            var newCharacter;
            reg = null;
            reg = new RegExp(character, "g");
            if(typeof replace == "object"){
                for(var i = 0; i < replace.length; i++){
                    if(i == index){
                        newCharacter = replace[i];
                    }
                }
            }else if(typeof replace == "string"){
                newCharacter = replace;
            }
            data = data.replace(reg, newCharacter);
        }
        if(typeof character == "object"){
            for(var i = 0; i < character.length; i++){
                setReplace(character[i], i)
            }
        }else{
            setReplace(character)
        }
        return data;
    }

    /*
        andy-data: 数据绑定 针对表单初步 实行,绑定字段,默认为input字段
        andy-data-type:
            "combo":下拉
            "verify":验证框

        andy-data-main: 主数据位置

        andy-data-auto:自动执行,默认不自动执行
            auto相关:
            andy-data-url:ajax加载数据地址

        andy-data-notAuto:不自动执行
    */
    module.an_andyData = function(data){
        var andy_main, andy_data_str, andy_data_type, getValueByData, mainData;
        mainData = data;
        andy_main = $('[andy-data-main]');
        andy_data_str = "andy-data";
        andy_data_type = "andy-data-type";

        var getValueByData = function(dataStr, index){
            var value;
            var arr = dataStr.split(".");

            var isHaveSameProperty = function(arr, pro){
                var isHave = false;
                for(var i in arr){
                    if(i == pro){
                        isHave = true;
                    }
                }
                return isHave;
            }

            var isHaveChildren = function(arr){
                var isHave = false;
                for(var i in arr){
                    isHave = true;
                }
                return isHave;
            }

            var getValue = function(thisData, arr, i, fun){
                var data = thisData[arr[i]];
                if(arr[i+1] && isHaveSameProperty(data, arr[i+1])){
                    getValue(data, arr, i+1, fun)
                }else{
                    fun(data)
                }
            }
            getValue(mainData, arr, 0, function(v){
                value = v;
            })
            return value;
        }

        andy_main.find("["+andy_data_str+"]").each(function(index, andy_data){
            var dataElement = $(andy_data);
            var valueObj = getValueByData(dataElement.attr(andy_data_str));
            // console.log(valueObj, dataElement.find("[andy-data-combo]"))
            if(dataElement.attr(andy_data_type) == "combo"){
                dataElement.an_combo(valueObj)
            }else{
                var d = dataElement;
                d.is("input")?d.val(valueObj):d.text(valueObj);
            }
        })
    }


    //内容拷贝
    module.copy = function (content, tip) {
        if ($("#copytextarea").length == 0) {
            $('body').append("<textarea id='copytextarea' style='height:0; border:0; width:0; display:block; opacity:0'></textarea>");
        }
        var copybox = $("#copytextarea");
        copybox.text(content);
        // 选择对象
        copybox.select();
        // 执行浏览器复制命令
        document.execCommand("Copy");
        alert(tip);
    };

    // 跨域 数据发送
    module.execiFrame = function(options){
        var execPageUrl = options.execPageUrl || "";
        var execData = options.execData || "";
        execData = andy.jsonToString(execData);
        // 转码
        execData = encodeURI(execData);
        execPageUrl = execPageUrl+"?exec="+ execData;
        if(typeof(exec_obj)=='undefined'){  
            exec_obj = document.createElement('iframe');  
            exec_obj.name = 'exec_frame';  
            exec_obj.src = execPageUrl;  
            exec_obj.style.display = 'none';  
            document.body.appendChild(exec_obj);  
        }else{  
            exec_obj.src = execPageUrl;  
        }  
    }

    // 链接处理
    module.getUrlParam = function (name, url) {
        var windowurl = url || window.location;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = windowurl.search.substr(1).match(reg);
        // 转码
        // if (r != null) return unescape(r[2]); return null;
        if (r != null) return decodeURI(r[2]); return null;

    }
	window.andy = $.extend({}, true, window.andy, module);
})(window);


