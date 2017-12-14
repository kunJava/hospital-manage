/**
 * 自动生成XMP内容
 * 作者：chenxiaoying
 * 创建日期：2017/6/2
 *
 * 解决iconfont中的字体图标获取原unicode失败，以及&符号被转义的问题
 *
 * 使用 在需要生成XMP 的元素上 设置 autoxmpcode=true，会自动在该元素的后面插入XMP
 */

var autoXmpCode = function () {
    $("[autoxmpcode]").each(function (index, el) {
        var cEl = $(el).clone(), targetDomId = $(el).attr('autoxmpcode4id'), result;
        cEl.find('.iconfont').each(function (index, iEl) {
            iEl.innerText = escape(iEl.innerText).toLocaleLowerCase() + ';';
        })
        result = '<xmp class="prettyprint pre-scrollable linenums bs-example-cold">' + cEl[0].innerHTML.replace(/%u/gi, '&#x') + '</xmp>';
        if (targetDomId && targetDomId !== '' && $('#' + targetDomId).length > 0) {
            $('#' + targetDomId).html(result);
            andy.layout($(el));
            andy.perform($(el));
            andy.fromInit()
            andy.img()
            $(el).attr("autoxmpcode", null)
        } else {
            $(el).after(result);
        }
    });
}

