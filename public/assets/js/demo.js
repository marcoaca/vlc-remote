/** @type {Array} */
var _0xeb2f = ["noConflict", "use strict", "html", "body", "[data-color-name]", ".css", "", "replace", "dark_", "black_", "assets/css/theme_", "href", "attr", "#theme", "black", "indexOf", "dark", "light", "is-", "color-name", "data", "push", "each", "find", '[data-type="theme-main"]', '[data-type="theme-color"]', "selected", "addClass", "[data-color-name='", "']", "click", "preventDefault", "ccard-in", "toggleClass", "on", ".ccard__toggle", "background-color", "color-code", "css", "length", "parents",
    "data-color-name", "removeClass", "_", "_on", "hasClass", "off", "oo", " ", "a", '[data-type="toggle"]'];
var $ = jQuery[_0xeb2f[0]]();
(function ($) {
    /**
     * @return {undefined}
     */
    function attach() {
        var relatedTarget = $("data-color-name");
        var _0xae92x6 = $("#theme").attr("href").replace("assets/css/theme_", "").replace("black_", "").replace("dark_", "").replace('.css', "");
        if ($("#theme").attr("href").indexOf("black") !== -1) {
            var _0xae92x7 = "black";
        }
        if ($("#theme").attr("href").indexOf("dark") !== -1) {
            _0xae92x7 = "dark";
        }
        if ($("#theme").attr("href").indexOf("light") !== -1) {
            _0xae92x7 = "light";
        }
        /** @type {Array} */
        var which = [];
        /** @type {Array} */
        var r20 = [];
        $('[data-type="theme-main"]').find(relatedTarget).each(function () {
            which.push("is-" + $(this).data("color-name"));
        });
        $('[data-type="theme-color"]').find(relatedTarget).each(function () {
            r20.push("is-" + $(this).data("color-name"));
        });
        $('[data-color-name=' + _0xae92x7 + ']').addClass("selected");
        $('[data-color-name=' + _0xae92x6 + ']').addClass("selected");
        collection.addClass("is-" + _0xae92x7).addClass("is-" + _0xae92x6);
        $('.ccard__toggle').on("click", function (dataAndEvents) {
            dataAndEvents.preventDefault();
            collection.toggleClass("ccard-in");
        });
        relatedTarget.each(function () {
            var emptyJ = $(this);
            emptyJ.css("background-color", emptyJ.data("color-code"));
            emptyJ.on("click", function (dataAndEvents) {
                dataAndEvents.preventDefault();
                if (emptyJ.parents('[data-type="theme-main"]').length) {
                    _0xae92x7 = emptyJ.attr("data-color-name");
                    $('[data-type="theme-main"]').find("data-color-name").removeClass("selected");
                    $.each(which, function (dataAndEvents, resp) {
                        collection.removeClass(resp).addClass("is-" + _0xae92x7);
                    });
                }
                if (emptyJ.parents('[data-type="theme-color"]').length) {
                    _0xae92x6 = emptyJ.attr("data-color-name");
                    $('[data-type="theme-color"]').find('[data-color-name]').removeClass("selected");
                    $.each(r20, function (dataAndEvents, resp) {
                        collection.removeClass(resp).addClass("is-" + _0xae92x6);
                    });
                }
                emptyJ.addClass(selected);
                $("#theme").attr("href", "assets/css/theme_" + _0xae92x7 + _ + _0xae92x6 + '.css');
            });
        });
        $('[data-type="toggle"]').find("a").each(function () {
            var emptyJ = $(this);
            if (emptyJ.hasClass("_on")) {
                collection.removeClass(emptyJ.data("off")).addClass(emptyJ.data("on"));
            } else {
                collection.removeClass(emptyJ.data("oo")).addClass(emptyJ.data("off"));
            }
            emptyJ.on("click", function () {
                emptyJ.toggleClass("_on");
                collection.toggleClass(emptyJ.data("on") + " " + emptyJ.data("off"));
            });
        });
    }

    "use strict";
    var emptyJ = $("html");
    var collection = $("body");
    attach();
})(jQuery);