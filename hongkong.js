/**
 * Parallax scrolling
 */
(function ($) {
    var $scrollTop = $('[data-parallax-top]');
    var $scrollBottom = $('[data-parallax-bottom]');
    var scrollPosition = 0;

    /**
     * Get the factor attribute for each
     * @return {[type]} [description]
     */
    var _generateFactor = function () {
        var i, len;

        for (i = 0, len = $scrollTop.length; i < len; i++) {
            $scrollTop.eq(i).css('transform', 'translate3d(0, 0, 0)');
            $scrollTop[i].factor = $scrollTop[i].getAttribute('data-parallax-factor') || 4;
        }

        for (i = 0, len = $scrollBottom.length; i < len; i++) {
            $scrollBottom.eq(i).css('transform', 'translate3d(0, 0, 0)');
            $scrollBottom[i].factor = $scrollBottom[i].getAttribute('data-parallax-factor') || 4;
        }
    };


    /**
     * Callback for throttle function
     * @return {void}
     */
    var _callback = function () {
        var scroll = window.pageYOffset;
        var i, len;
        var factor;

        if (scrollPosition === scroll) {

            window.requestAnimationFrame(_callback);

            return false;
        }

        scrollPosition = scroll;

        for (i = 0, len = $scrollTop.length; i < len; i++) {
            factor = $scrollTop[i].factor;
            $scrollTop.eq(i).css('transform', 'translate3d(0, ' + parseInt(scroll / factor, 10) + 'px, 0)');
        }

        for (i = 0, len = $scrollBottom.length; i < len; i++) {
            factor = $scrollBottom[i].factor;
            $scrollBottom.eq(i).css('transform', 'translate3d(0, ' + parseInt(scroll / (factor * -1), 10) + 'px, 0)');
        }

        window.requestAnimationFrame(_callback);
    };

    /**
     * Init
     */

     _generateFactor();

     window.requestAnimationFrame(_callback);

}(jQuery));
