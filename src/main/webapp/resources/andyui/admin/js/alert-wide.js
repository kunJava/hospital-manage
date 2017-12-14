/*global andy,$*/
/**
 * Created by chen_muse on 2017/6/13.
 * **/


(function (andy, $) {
    'use strict';
    andy.pluginBone = andy.pluginBone || {};
    andy.pluginBone.alert =
        '  <div class="u-alert {{type}} f-m-b-sm animated alert-{{alertId}}">'
        + '<i class="iconfont">&#xe6ff;</i>'
        + '<i class="iconfont close" dismiss="an-alert">&#xe602;</i>'
        + '{{content}}'
        + '</div>';

    var alertRender, index = 0;
    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[dismiss="an-alert"]'
    var Alert = function (el) {
        $(el).on('click', dismiss, this.close)
    }


    Alert.TRANSITION_DURATION = 500

    Alert.prototype.close = function (e) {
        var $this = $(this)
        var selector = $this.attr('data-target')
        //
        //if (!selector) {
        //    selector = $this.attr('href')
        //    selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        //}

        var $parent = $(selector === '#' ? [] : selector)

        if (e) e.preventDefault()

        if (!$parent.length) {
            $parent = $this.closest('.u-alert')
        }

        $parent.trigger(e = $.Event('close.alert'))

        if (e.isDefaultPrevented()) return

        //$parent.removeClass('in')

        function removeElement() {
            // detach from parent, fire event then clean up data
            $parent.detach().trigger('closed.alert').remove()
        }

        //$parent.hasClass('animated') ?
        //    $parent
        //        .one('bsTransitionEnd', removeElement)
        //        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
        //    removeElement()
        var name = 'fadeOutUp';
        var ie = andy.IE();
        if (name && (!(ie <= 8) || ie === 0)) {
            $parent.addClass(name);
            window.setTimeout(function () {
                removeElement();
            }, Alert.TRANSITION_DURATION);
        }
    }


    // ALERT PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('an-alert')

            if (!data) $this.data('an-alert', (data = new Alert(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }


    $.fn.an_alert = Plugin
    $.fn.an_alert.Constructor = Alert

    andy.an_alert_wide = function (options) {
        var defaults = {
            type: 'info',//success、info、warning、danger、default、black
            content: '提示内容',//提示内容
            alertId: index++,
            //audio:'',//播放声音，仅支持高级浏览器
            //callback: function () {
            //}
        }

        var _options = $.extend(defaults, options);


        alertRender = alertRender || template.compile(andy.pluginBone.alert);
        var str = alertRender(_options);
        $('body').append(str);
        $('.alert-' + _options.alertId).css({
            zIndex: 100,
            position: 'fixed',
            top: '10px',
            width: ( $('body').width() - 120 * 2-62) + 'px',
            left: '120px',
        })
    };


    // ALERT DATA-API
    // ==============

    $(document).on('click.an-alert', dismiss, Alert.prototype.close)


})(andy, jQuery);
