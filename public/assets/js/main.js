/** @type {Array} */
var _0x2dae = ["noConflict", "use strict", "html", "body", '[data-link="section"]', "a", "find", ".site-nav__menu", "add", "match", "userAgent", "style", "createElement", "@-ms-viewport{width:auto!important}", "createTextNode", "appendChild", "head", "querySelector", "desktop", "hasClass", "is-mobile", "addClass", "is-desktop", "ie9", "click", "preventDefault", "on", "a[href=#]", "insertAfter", "site-nav__social", "site-footer__social", "removeClass", "clone", ".site-footer__social", "border-on",
    "#countdown_dashboard", "length", "countdown-on", "countDown", "remove", "#", "id", "attr", ".is-active", "filter", ".section", "is-active", 'a[href="', '"]', "cssanimations", "fadeIn", "animation-in", "data", "animation-in-delay", "animated", "animation-delay", "ms", "css", "each", "[data-animation-in]", "", "replace", "-in", "fadeOut", "is-loaded", "velocity", ".site-loader", ".site-header__icon__nav", ".site-nav", "nav-in", "toggleClass", "stop", "0", "-25%", "0deg", "35deg", "1", ".4", ".site-nav__inner",
    "25%", "-35deg", "push", "href", "animating", "animation-out-delay", "[data-animation-out]", "scrollTop", ".site-wrap", "update", "perfectScrollbar", "error", ".form-group", "hide", "valid error", ".form-notify", "animation-out", "closest", "1ms", "removeAttr", "#formContact", "parent", "POST", "assets/php/contact.php", "json", "serialize", "code", "resetForm", "validate", "reset", ".form-label", "blur", "button", "show", "message", "valid", "An error occurred. Please try again later.", "ajaxSubmit",
    "numberOfInvalids", "You missed 1 field. It has been highlighted.", "You missed ", " fields. They have been highlighted.", 'a[href="#newsletter"]', "#formNewsletter", '<div class="mfp-close_c mfp-close"></div>', "inline", "scroll", "mfp-effect", "input", "width", "focus", "st", "#newsletterEmail", "newsletter-in", "magnificPopup", "/api-vlc/add", "load", ".site-bg__video", "is-site-bg-img", ".site-bg__img", "is-site-bg-slideshow", '<img src="assets/img/bg/site-bg-slideshow-', '.jpg">',
    "append", "ss", "kenburnsy", ".site-header__icon__audio", "is-site-bg-video", '<video id="videoPlayer" autoplay loop>', '<source src="assets/video/video.mp4" type="video/mp4">', "</video>", "videoPlayer", "getElementById", "muted", "is-audio-on", "is-audio-off", "is-site-bg-video-youtube", "data-property", '{videoURL: _bg_video_youtube_url, autoPlay: true, loop: _bg_video_youtube_loop, startAt: _bg_video_youtube_start, stopAt: _bg_video_youtube_end, mute: true, quality: _bg_video_youtube_quality, realfullscreen: true, optimizeDisplay: true, addRaster: false, showYTLogo: false, showControls: false, stopMovieOnBlur: false, containment: "self"}',
    '{videoURL: _bg_video_youtube_url, autoPlay: true, loop: _bg_video_youtube_loop, startAt: _bg_video_youtube_start, stopAt: _bg_video_youtube_end, mute: false, quality: _bg_video_youtube_quality, realfullscreen: true, optimizeDisplay: true, addRaster: false, showYTLogo: false, showControls: false, stopMovieOnBlur: false, containment: "self"}', '<audio id="audioPlayer" loop>', '<source src="assets/audio/audio.mp3" type="audio/mpeg">', "</audio>", "audioPlayer", "play", "pause", ".site-bg__canvas",
    ".site-bg__effect", "opacity", '<div class="cloud cloud-01"></div>', '<div class="cloud cloud-02"></div>', '<div class="cloud cloud-03"></div>', "is-site-bg-cloud", ".cloud-01", "-100%", "100%", "liner", ".cloud-02", ".cloud-03", '<div class="star star-01"></div>', '<div class="star star-02"></div>', '<div class="star star-03"></div>', "is-site-bg-parallax-star", "block", ".star-01", "-2000px", ".star-02", ".star-03", "is-site-bg-star", "height", "round", "2d", "getContext", "config", "x", "random",
    "y", "vx", "vy", "radius", "star", "prototype", "beginPath", "PI", "arc", "fill", "stars", "distance", "position", "moveTo", "lineTo", "stroke", "closePath", "createStars", "clearRect", "create", "line", "animate", "setCanvas", "innerWidth", "innerHeight", "setContext", "fillStyle", "color", "strokeStyle", "lineWidth", "loop", "bind", "mousemove", "pageX", "pageY", "init", "requestAnimationFrame", "mozRequestAnimationFrame", "webkitRequestAnimationFrame", "msRequestAnimationFrame", "setTimeout",
    "canvas", "transition.fadeIn", "resize", "assets/img/bg/home.jpg", "assets/img/bg/about.jpg", "assets/img/bg/service.jpg", "assets/img/bg/contact.jpg", "src", "is-each", "always", "slideDown", "first", ".accordion > dd", "next", "dt > a", ".accordion", "slideUp", "dd", "dt > a.is-active", "parents", ".accordion > dt > a", "#serviceCarousel", ".service__carousel-control", "carousel-nav", "carousel-prev", "carousel-next", "owlCarousel"];
var $ = jQuery[_0x2dae[0]]();
(function($) {
    /**
     * @return {undefined}
     */
    function shim() {
        var emptyJ = $(_0x2dae[35]);
        if (_countdown) {
            if (emptyJ[_0x2dae[36]]) {
                $spy[_0x2dae[21]](_0x2dae[37]);
                emptyJ[_0x2dae[38]]({
                    targetDate : {
                        "day" : _countdown_date[2],
                        "month" : _countdown_date[1],
                        "year" : _countdown_date[0],
                        "hour" : 0,
                        "min" : 0,
                        "sec" : 0,
                        "utc" : _countdown_utc
                    },
                    omitWeeks : true
                });
            }
        } else {
            emptyJ[_0x2dae[39]]();
        }
    }
    /**
     * @return {undefined}
     */
    function transition() {
        var statsTemplate;
        statsTemplate = _0x2dae[40] + $(_0x2dae[45])[_0x2dae[44]](_0x2dae[43])[_0x2dae[42]](_0x2dae[41]);
        $(_0x2dae[47] + statsTemplate + _0x2dae[48])[_0x2dae[21]](_0x2dae[46]);
        call();
        if (emptyJ[_0x2dae[19]](_0x2dae[49])) {
            $(statsTemplate)[_0x2dae[6]](_0x2dae[59])[_0x2dae[58]](function() {
                var emptyJ = $(this);
                var r20 = _0x2dae[50];
                /** @type {number} */
                var _0x7cd2x11 = 1;
                if (emptyJ[_0x2dae[52]](_0x2dae[51])) {
                    r20 = emptyJ[_0x2dae[52]](_0x2dae[51]);
                }
                if (emptyJ[_0x2dae[52]](_0x2dae[53])) {
                    _0x7cd2x11 = emptyJ[_0x2dae[52]](_0x2dae[53]);
                }
                emptyJ[_0x2dae[57]](_0x2dae[55], _0x7cd2x11 + 500 + _0x2dae[56])[_0x2dae[21]](_0x2dae[54])[_0x2dae[21]](r20);
            });
        }
        $spy[_0x2dae[21]](statsTemplate[_0x2dae[61]](_0x2dae[40], _0x2dae[60]) + _0x2dae[62]);
        $(_0x2dae[66])[_0x2dae[65]](_0x2dae[63], {
            queue : false,
            delay : 500,
            duration : 800,
            /**
             * @return {undefined}
             */
            complete : function() {
                $spy[_0x2dae[21]](_0x2dae[64]);
            }
        });
    }
    /**
     * @return {undefined}
     */
    function domReady() {
        $(_0x2dae[67])[_0x2dae[6]](_0x2dae[5])[_0x2dae[8]](resp)[_0x2dae[26]](_0x2dae[24], function(dataAndEvents) {
            dataAndEvents[_0x2dae[25]]();
            one();
        });
    }
    /**
     * @return {undefined}
     */
    function one() {
        var emptyJ = $(_0x2dae[68]);
        $spy[_0x2dae[70]](_0x2dae[69]);
        if ($spy[_0x2dae[19]](_0x2dae[69])) {
            emptyJ[_0x2dae[65]](_0x2dae[71], true)[_0x2dae[65]](_0x2dae[50], {
                duration : 500
            });
            $(_0x2dae[78])[_0x2dae[65]](_0x2dae[71], true)[_0x2dae[65]]({
                translateY : [_0x2dae[72], _0x2dae[73]],
                rotateX : [_0x2dae[74], _0x2dae[75]],
                opacity : [_0x2dae[76], _0x2dae[77]]
            }, {
                duration : 500
            });
        } else {
            emptyJ[_0x2dae[65]](_0x2dae[71], true)[_0x2dae[65]](_0x2dae[63], {
                duration : 500
            });
            $(_0x2dae[78])[_0x2dae[65]](_0x2dae[71], true)[_0x2dae[65]]({
                translateY : [_0x2dae[79], _0x2dae[72]],
                rotateX : [_0x2dae[80], _0x2dae[74]],
                opacity : [_0x2dae[77], _0x2dae[76]]
            }, {
                duration : 500
            });
        }
    }
    /**
     * @return {undefined}
     */
    function run() {
        var $src = $(_0x2dae[45]);
        /** @type {Array} */
        var which = [];
        $src[_0x2dae[58]](function() {
            which[_0x2dae[81]](this[_0x2dae[41]]);
        });
        serverAttrs[_0x2dae[26]](_0x2dae[24], function(dataAndEvents) {
            var curElem = $(this);
            var statsTemplate = curElem[_0x2dae[42]](_0x2dae[82]);
            /** @type {number} */
            var maxh = 1;
            dataAndEvents[_0x2dae[25]]();
            if (!$(statsTemplate)[_0x2dae[36]] || curElem[_0x2dae[19]](_0x2dae[46])) {
                return false;
            }
            if ($spy[_0x2dae[19]](_0x2dae[64])) {
                if (!$spy[_0x2dae[19]](_0x2dae[83])) {
                    serverAttrs[_0x2dae[44]](_0x2dae[43])[_0x2dae[31]](_0x2dae[46]);
                    teardown();
                    if (emptyJ[_0x2dae[19]](_0x2dae[49])) {
                        $src[_0x2dae[44]](_0x2dae[43])[_0x2dae[6]](_0x2dae[85])[_0x2dae[58]](function() {
                            var h = $(this)[_0x2dae[52]](_0x2dae[84]);
                            if (h) {
                                maxh = h > maxh ? h : maxh;
                            }
                        });
                    }
                    $(_0x2dae[66])[_0x2dae[65]](_0x2dae[50], {
                        queue : false,
                        delay : maxh + 500,
                        duration : 800,
                        /**
                         * @return {undefined}
                         */
                        complete : function() {
                            $spy[_0x2dae[31]](_0x2dae[83]);
                            $(_0x2dae[87])[_0x2dae[86]](0);
                            $(_0x2dae[87])[_0x2dae[89]](_0x2dae[88]);
                            $(_0x2dae[45])[_0x2dae[44]](_0x2dae[43])[_0x2dae[31]](_0x2dae[46]);
                            $(statsTemplate)[_0x2dae[21]](_0x2dae[46]);
                            $(_0x2dae[47] + statsTemplate + _0x2dae[48])[_0x2dae[21]](_0x2dae[46]);
                            $[_0x2dae[58]](which, function(deepDataAndEvents, dataAndEvents) {
                                $spy[_0x2dae[31]](dataAndEvents + _0x2dae[62]);
                            });
                            $spy[_0x2dae[21]](statsTemplate[_0x2dae[61]](_0x2dae[40], _0x2dae[60]) + _0x2dae[62]);
                            $(_0x2dae[91])[_0x2dae[31]](_0x2dae[90]);
                            $(_0x2dae[94])[_0x2dae[31]](_0x2dae[93])[_0x2dae[2]](_0x2dae[60])[_0x2dae[92]]();
                            $(this)[_0x2dae[65]](_0x2dae[63], {
                                delay : 100,
                                duration : 800
                            });
                            setTimeout(function() {
                                call();
                                onComplete();
                            }, 0);
                        }
                    });
                }
            }
        });
    }
    /**
     * @return {undefined}
     */
    function onComplete() {
        var _0x7cd2x1d = $(_0x2dae[45])[_0x2dae[44]](_0x2dae[43]);
        _0x7cd2x1d[_0x2dae[6]](_0x2dae[59])[_0x2dae[58]](function() {
            var ctx = $(this);
            var r20 = _0x2dae[50];
            /** @type {number} */
            var y = 100;
            if (ctx[_0x2dae[52]](_0x2dae[51])) {
                r20 = ctx[_0x2dae[52]](_0x2dae[51]);
            }
            if (ctx[_0x2dae[52]](_0x2dae[53])) {
                y = ctx[_0x2dae[52]](_0x2dae[53]);
            }
            ctx[_0x2dae[57]](_0x2dae[55], y + _0x2dae[56])[_0x2dae[21]](_0x2dae[54])[_0x2dae[21]](r20);
        });
    }
    /**
     * @return {undefined}
     */
    function teardown() {
        /** @type {number} */
        var _0x7cd2x18 = 1;
        $spy[_0x2dae[21]](_0x2dae[83]);
        $(_0x2dae[85])[_0x2dae[58]](function() {
            var collection = $(this);
            var resp = _0x2dae[50];
            var r20 = _0x2dae[63];
            /** @type {number} */
            var _0x7cd2x11 = 100;
            /** @type {number} */
            var y = 1;
            if (collection[_0x2dae[52]](_0x2dae[51])) {
                resp = collection[_0x2dae[52]](_0x2dae[51]);
            }
            if (collection[_0x2dae[52]](_0x2dae[95])) {
                r20 = collection[_0x2dae[52]](_0x2dae[95]);
            }
            if (collection[_0x2dae[52]](_0x2dae[53])) {
                _0x7cd2x11 = collection[_0x2dae[52]](_0x2dae[53]);
            }
            if (collection[_0x2dae[52]](_0x2dae[84])) {
                y = collection[_0x2dae[52]](_0x2dae[84]);
            }
            collection[_0x2dae[57]](_0x2dae[55], _0x7cd2x11 + _0x2dae[56]);
            if (collection[_0x2dae[96]](_0x2dae[45])[_0x2dae[19]](_0x2dae[46])) {
                collection[_0x2dae[31]](resp)[_0x2dae[21]](r20);
                if (collection[_0x2dae[52]](_0x2dae[84])) {
                    collection[_0x2dae[57]](_0x2dae[55], y + _0x2dae[56]);
                } else {
                    collection[_0x2dae[57]](_0x2dae[55], _0x2dae[97]);
                }
            } else {
                collection[_0x2dae[31]](resp)[_0x2dae[31]](r20)[_0x2dae[98]](_0x2dae[11], _0x2dae[55]);
            }
        });
    }
    /**
     * @return {undefined}
     */
    function call() {
        var emptyJ = $(_0x2dae[87]);
        if (!_0x7cd2x8) {
            emptyJ[_0x2dae[89]]({
                suppressScrollX : true
            });
        }
    }
    /**
     * @return {undefined}
     */
    function onDeviceReady() {
        var emptyJ = $(_0x2dae[99]);
        var _0x7cd2x24 = emptyJ[_0x2dae[6]](_0x2dae[94]);
        emptyJ[_0x2dae[107]]({
            onfocusout : false,
            onkeyup : false,
            onclick : false,
            rules : {
                name : {
                    required : true
                },
                email : {
                    required : true,
                    email : true
                },
                message : {
                    required : true
                }
            },
            messages : {},
            /**
             * @param {?} element
             * @param {?} error
             * @return {undefined}
             */
            errorPlacement : function(element, error) {
            },
            /**
             * @param {?} js
             * @return {undefined}
             */
            highlight : function(js) {
                $(js)[_0x2dae[100]](_0x2dae[91])[_0x2dae[21]](_0x2dae[90]);
            },
            /**
             * @param {?} element
             * @return {undefined}
             */
            unhighlight : function(element) {
                $(element)[_0x2dae[100]](_0x2dae[91])[_0x2dae[31]](_0x2dae[90]);
            },
            /**
             * @param {?} form
             * @return {undefined}
             */
            submitHandler : function(form) {
                $(form)[_0x2dae[116]]({
                    type : _0x2dae[101],
                    url : _0x2dae[102],
                    dataType : _0x2dae[103],
                    cache : false,
                    data : emptyJ[_0x2dae[104]](),
                    /**
                     * @param {?} textStatus
                     * @return {undefined}
                     */
                    success : function(textStatus) {
                        if (textStatus[_0x2dae[105]] == 0) {
                            emptyJ[_0x2dae[107]]()[_0x2dae[106]]();
                            emptyJ[0][_0x2dae[108]]();
                            emptyJ[_0x2dae[6]](_0x2dae[109])[_0x2dae[31]](_0x2dae[90]);
                            emptyJ[_0x2dae[6]](_0x2dae[111])[_0x2dae[110]]();
                            _0x7cd2x24[_0x2dae[31]](_0x2dae[93])[_0x2dae[21]](_0x2dae[114])[_0x2dae[2]](textStatus[_0x2dae[113]])[_0x2dae[112]]();
                        } else {
                            _0x7cd2x24[_0x2dae[31]](_0x2dae[93])[_0x2dae[21]](_0x2dae[90])[_0x2dae[2]](textStatus[_0x2dae[113]])[_0x2dae[112]]();
                        }
                    },
                    /**
                     * @param {?} textStatus
                     * @return {undefined}
                     */
                    error : function(textStatus) {
                        _0x7cd2x24[_0x2dae[31]](_0x2dae[114])[_0x2dae[21]](_0x2dae[90])[_0x2dae[2]](_0x2dae[115])[_0x2dae[112]]();
                    }
                });
            },
            /**
             * @param {?} val
             * @param {?} k
             * @return {undefined}
             */
            invalidHandler : function(val, k) {
                var _0x7cd2x2b = k[_0x2dae[117]]();
                if (_0x7cd2x2b) {
                    var r20 = _0x7cd2x2b == 1 ? _0x2dae[118] : _0x2dae[119] + _0x7cd2x2b + _0x2dae[120];
                    _0x7cd2x24[_0x2dae[31]](_0x2dae[93])[_0x2dae[21]](_0x2dae[90])[_0x2dae[2]](r20)[_0x2dae[112]]();
                }
            }
        });
    }
    /**
     * @return {undefined}
     */
    function init() {
        var nodes = $('a[href="#newsletter"], a[href="#playlist"]');
        var emptyJ = $(_0x2dae[122]);
        var _0x7cd2x24 = emptyJ[_0x2dae[6]](_0x2dae[94]);
        var value = {
            closeMarkup : _0x2dae[123],
            type : _0x2dae[124],
            overflowY : _0x2dae[125],
            removalDelay : 500,
            mainClass : _0x2dae[126],
            preloader : false,
            focus : _0x2dae[127],
            callbacks : {
                /**
                 * @return {undefined}
                 */
                beforeOpen : function() {
                    if ($(window)[_0x2dae[128]]() < 768) {
                        /** @type {boolean} */
                        this[_0x2dae[130]][_0x2dae[129]] = false;
                    } else {
                        this[_0x2dae[130]][_0x2dae[129]] = _0x2dae[131];
                    }
                    $spy[_0x2dae[21]](_0x2dae[132]);
                },
                /**
                 * @return {undefined}
                 */
                beforeClose : function() {
                    $spy[_0x2dae[31]](_0x2dae[132]);
                },
                /**
                 * @return {undefined}
                 */
                afterClose : function() {
                    nodes[_0x2dae[110]]();
                    emptyJ[_0x2dae[6]](_0x2dae[91])[_0x2dae[31]](_0x2dae[90]);
                    _0x7cd2x24[_0x2dae[31]](_0x2dae[93])[_0x2dae[2]](_0x2dae[60])[_0x2dae[92]]();
                }
            },
            midClick : true
        };
        nodes[_0x2dae[133]](value);
        emptyJ[_0x2dae[107]]({
            onfocusout : false,
            onkeyup : false,
            onclick : false,
            rules : {
                email : {
                    required : true,
                    email : true
                }
            },
            messages : {},
            /**
             * @param {?} element
             * @param {?} error
             * @return {undefined}
             */
            errorPlacement : function(element, error) {
            },
            /**
             * @param {?} js
             * @return {undefined}
             */
            highlight : function(js) {
                $(js)[_0x2dae[100]](_0x2dae[91])[_0x2dae[21]](_0x2dae[90]);
            },
            /**
             * @param {?} element
             * @return {undefined}
             */
            unhighlight : function(element) {
                $(element)[_0x2dae[100]](_0x2dae[91])[_0x2dae[31]](_0x2dae[90]);
            },
            /**
             * @param {?} form
             * @return {undefined}
             */
            submitHandler : function(form) {
                $(form)[_0x2dae[116]]({
                    type : _0x2dae[101],
                    url : _0x2dae[134],
                    dataType : _0x2dae[103],
                    cache : false,
                    data : emptyJ[_0x2dae[104]](),
                    /**
                     * @param {?} textStatus
                     * @return {undefined}
                     */
                    success : function(textStatus) {
                        if (textStatus[_0x2dae[105]] == 0) {
                            emptyJ[_0x2dae[107]]()[_0x2dae[106]]();
                            emptyJ[0][_0x2dae[108]]();
                            emptyJ[_0x2dae[6]](_0x2dae[109])[_0x2dae[31]](_0x2dae[90]);
                            emptyJ[_0x2dae[6]](_0x2dae[111])[_0x2dae[110]]();
                            _0x7cd2x24[_0x2dae[31]](_0x2dae[90])[_0x2dae[21]](_0x2dae[114])[_0x2dae[2]](textStatus[_0x2dae[113]])[_0x2dae[112]]();
                        } else {
                            _0x7cd2x24[_0x2dae[31]](_0x2dae[114])[_0x2dae[21]](_0x2dae[90])[_0x2dae[2]](textStatus[_0x2dae[113]])[_0x2dae[112]]();
                        }
                    },
                    /**
                     * @param {?} textStatus
                     * @return {undefined}
                     */
                    error : function(textStatus) {
                        _0x7cd2x24[_0x2dae[31]](_0x2dae[114])[_0x2dae[21]](_0x2dae[90])[_0x2dae[2]](_0x2dae[115])[_0x2dae[112]]();
                    }
                });
            },
            /**
             * @param {?} val
             * @param {?} k
             * @return {undefined}
             */
            invalidHandler : function(val, k) {
                var _0x7cd2x2b = k[_0x2dae[117]]();
                if (_0x7cd2x2b) {
                    var r20 = _0x7cd2x2b == 1 ? _0x2dae[118] : _0x2dae[119] + _0x7cd2x2b + _0x2dae[120];
                    _0x7cd2x24[_0x2dae[31]](_0x2dae[114])[_0x2dae[21]](_0x2dae[90])[_0x2dae[2]](r20)[_0x2dae[112]]();
                }
            }
        });
    }
    /**
     * @return {undefined}
     */
    function displayMachineTagTree() {
        if (_0x7cd2x8) {
            if (_bg_style_mobile == 3 || _bg_style_mobile == 4) {
                setupTreeTable();
            }
        } else {
            if (_bg_style_desktop == 3 || _bg_style_desktop == 4) {
                setupTreeTable();
            }
        }
    }
    /**
     * @return {undefined}
     */
    function setupTreeTable() {
        $(_0x2dae[136])[_0x2dae[39]]();
        $spy[_0x2dae[21]](_0x2dae[137]);
    }

    /**
     * @return {undefined}
     */
    function access() {
        /**
         * @return {undefined}
         */
        function fn() {
            var emptyJ = $(_0x2dae[145]);
            var _0x7cd2x3c = document[_0x2dae[151]](_0x2dae[162]);
            emptyJ[_0x2dae[26]](_0x2dae[24], function() {
                var emptyJ = $(this);
                if ($spy[_0x2dae[19]](_0x2dae[153])) {
                    //_0x7cd2x3c[_0x2dae[164]]();
                    $spy[_0x2dae[31]](_0x2dae[153])[_0x2dae[21]](_0x2dae[154]);
                } else {
                    if ($spy[_0x2dae[19]](_0x2dae[154])) {
                        //_0x7cd2x3c[_0x2dae[163]]();
                        $spy[_0x2dae[31]](_0x2dae[154])[_0x2dae[21]](_0x2dae[153]);
                    }
                }
            });
        }
        if (_0x7cd2x8) {
            if (_bg_style_mobile == 2 || (_bg_style_mobile == 4 || (_bg_style_mobile == 6 || _bg_style_mobile == 8))) {
                $spy[_0x2dae[21]](_0x2dae[154]);
                fn();
            }
        } else {
            if (_bg_style_desktop == 2 || (_bg_style_desktop == 4 || (_bg_style_desktop == 6 || (_bg_style_desktop == 8 || (_bg_style_desktop == 11 || _bg_style_desktop == 14))))) {
                var _0x7cd2x3c = document[_0x2dae[151]](_0x2dae[162]);
                $spy[_0x2dae[21]](_0x2dae[153]);
                //_0x7cd2x3c[_0x2dae[163]]();
                fn();
            }
        }
    }
    /**
     * @return {undefined}
     */
    function reset() {
        if (_bg_effect == 0) {
            $(_0x2dae[165])[_0x2dae[39]]();
        } else {
            if (_bg_effect == 1) {
                focus();
            } else {
                if (_bg_effect == 2) {
                    handler();
                } else {
                    if (_bg_effect == 3) {
                        find();
                    }
                }
            }
        }
    }
    /**
     * @return {undefined}
     */
    function focus() {
        var emptyJ = $(_0x2dae[166]);
        $(_0x2dae[165])[_0x2dae[39]]();
        emptyJ[_0x2dae[57]](_0x2dae[167], _cloud_opacity);
        if (emptyJ[_0x2dae[36]]) {
            emptyJ[_0x2dae[142]](_0x2dae[168] + _0x2dae[169] + _0x2dae[170]);
            $spy[_0x2dae[21]](_0x2dae[171]);
            fn();
            done();
            show();
        }
    }
    /**
     * @return {undefined}
     */
    function fn() {
        var ease = $(_0x2dae[172]);
        ease[_0x2dae[65]]({
            translateZ : _0x2dae[72],
            translateX : [_0x2dae[173], _0x2dae[174]]
        }, {
            duration : 25E3,
            ease : _0x2dae[175],
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[_0x2dae[65]]({
                    translateX : _0x2dae[174]
                }, {
                    duration : 0,
                    queue : false,
                    /** @type {function (): undefined} */
                    complete : fn
                });
            }
        });
    }
    /**
     * @return {undefined}
     */
    function done() {
        var ease = $(_0x2dae[176]);
        ease[_0x2dae[65]]({
            translateZ : _0x2dae[72],
            translateX : [_0x2dae[173], _0x2dae[174]]
        }, {
            duration : 35E3,
            ease : _0x2dae[175],
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[_0x2dae[65]]({
                    translateX : _0x2dae[174]
                }, {
                    duration : 0,
                    queue : false,
                    /** @type {function (): undefined} */
                    complete : done
                });
            }
        });
    }
    /**
     * @return {undefined}
     */
    function show() {
        var ease = $(_0x2dae[177]);
        ease[_0x2dae[65]]({
            translateZ : _0x2dae[72],
            translateX : [_0x2dae[173], _0x2dae[174]]
        }, {
            duration : 45E3,
            ease : _0x2dae[175],
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[_0x2dae[65]]({
                    translateX : _0x2dae[174]
                }, {
                    duration : 0,
                    queue : false,
                    /** @type {function (): undefined} */
                    complete : show
                });
            }
        });
    }
    /**
     * @return {undefined}
     */
    function handler() {
        var duration = $(_0x2dae[166]);
        $(_0x2dae[165])[_0x2dae[39]]();
        duration[_0x2dae[57]](_0x2dae[167], 0);
        if (duration[_0x2dae[36]]) {
            duration[_0x2dae[142]](_0x2dae[178] + _0x2dae[179] + _0x2dae[180]);
            $spy[_0x2dae[21]](_0x2dae[181]);
            callback();
            hide();
            fix();
            $(window)[_0x2dae[26]](_0x2dae[135], function() {
                setTimeout(function() {
                    duration[_0x2dae[65]]({
                        translateZ : _0x2dae[72],
                        opacity : [_parallax_star_opacity, _0x2dae[72]]
                    }, {
                        display : _0x2dae[182],
                        duration : 3E3
                    });
                }, 2E3);
            });
        }
    }
    /**
     * @return {undefined}
     */
    function callback() {
        var ease = $(_0x2dae[183]);
        ease[_0x2dae[65]]({
            translateZ : _0x2dae[72],
            translateY : [_0x2dae[184], _0x2dae[72]]
        }, {
            duration : 5E4,
            ease : _0x2dae[175],
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[_0x2dae[65]]({
                    translateY : _0x2dae[72]
                }, {
                    duration : 0,
                    queue : false,
                    /** @type {function (): undefined} */
                    complete : callback
                });
            }
        });
    }
    /**
     * @return {undefined}
     */
    function hide() {
        var ease = $(_0x2dae[185]);
        ease[_0x2dae[65]]({
            translateZ : _0x2dae[72],
            translateY : [_0x2dae[184], _0x2dae[72]]
        }, {
            duration : 1E5,
            ease : _0x2dae[175],
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[_0x2dae[65]]({
                    translateY : _0x2dae[72]
                }, {
                    duration : 0,
                    queue : false,
                    /** @type {function (): undefined} */
                    complete : hide
                });
            }
        });
    }
    /**
     * @return {undefined}
     */
    function fix() {
        var ease = $(_0x2dae[186]);
        ease[_0x2dae[65]]({
            translateZ : _0x2dae[72],
            translateY : [_0x2dae[184], _0x2dae[72]]
        }, {
            duration : 15E4,
            ease : _0x2dae[175],
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[_0x2dae[65]]({
                    translateY : _0x2dae[72]
                }, {
                    duration : 0,
                    queue : false,
                    /** @type {function (): undefined} */
                    complete : fix
                });
            }
        });
    }
    /**
     * @return {undefined}
     */
    function find() {
        /**
         * @param {?} args
         * @return {?}
         */
        function build(args) {
            /**
             * @return {undefined}
             */
            function animate() {
                /** @type {number} */
                this[_0x2dae[193]] = Math[_0x2dae[194]]() * args[_0x2dae[128]];
                /** @type {number} */
                this[_0x2dae[195]] = Math[_0x2dae[194]]() * args[_0x2dae[188]];
                /** @type {number} */
                this[_0x2dae[196]] = line[_0x2dae[192]][_0x2dae[65]] - Math[_0x2dae[194]]() * 0.3;
                /** @type {number} */
                this[_0x2dae[197]] = line[_0x2dae[192]][_0x2dae[65]] - Math[_0x2dae[194]]() * 0.3;
                /** @type {number} */
                this[_0x2dae[198]] = Math[_0x2dae[194]]() * line[_0x2dae[192]][_0x2dae[199]][_0x2dae[128]];
            }
            /** @type {number} */
            var lowestDeltaXY = 12E3;
            /** @type {number} */
            var VELOCITY_UFO = 0.2;
            var b4 = $(window)[_0x2dae[128]]();
            var a1 = $(window)[_0x2dae[188]]();
            var len = Math[_0x2dae[189]](a1 * b4 / lowestDeltaXY);
            var line = $(this);
            var obj = args[_0x2dae[191]](_0x2dae[190]);
            line[_0x2dae[192]] = {
                star : {
                    color : _bg_effect_star_color,
                    width : _bg_effect_star_width
                },
                line : {
                    color : _bg_effect_star_color,
                    width : 0.4
                },
                position : {
                    x : args[_0x2dae[128]] * 0.5,
                    y : args[_0x2dae[188]] * 0.5
                },
                velocity : VELOCITY_UFO,
                length : len,
                distance : 130,
                radius : 120,
                stars : []
            };
            animate[_0x2dae[200]] = {
                /**
                 * @return {undefined}
                 */
                create : function() {
                    obj[_0x2dae[201]]();
                    obj[_0x2dae[203]](this[_0x2dae[193]], this[_0x2dae[195]], this[_0x2dae[198]], 0, Math[_0x2dae[202]] * 2, false);
                    obj[_0x2dae[204]]();
                },
                /**
                 * @return {undefined}
                 */
                animate : function() {
                    var unlock;
                    /** @type {number} */
                    unlock = 0;
                    for (;unlock < line[_0x2dae[192]][_0x2dae[36]];unlock++) {
                        var cache = line[_0x2dae[192]][_0x2dae[205]][unlock];
                        if (cache[_0x2dae[195]] < 0 || cache[_0x2dae[195]] > args[_0x2dae[188]]) {
                            cache[_0x2dae[196]] = cache[_0x2dae[196]];
                            /** @type {number} */
                            cache[_0x2dae[197]] = -cache[_0x2dae[197]];
                        } else {
                            if (cache[_0x2dae[193]] < 0 || cache[_0x2dae[193]] > args[_0x2dae[128]]) {
                                /** @type {number} */
                                cache[_0x2dae[196]] = -cache[_0x2dae[196]];
                                cache[_0x2dae[197]] = cache[_0x2dae[197]];
                            }
                        }
                        cache[_0x2dae[193]] += cache[_0x2dae[196]];
                        cache[_0x2dae[195]] += cache[_0x2dae[197]];
                    }
                },
                /**
                 * @return {undefined}
                 */
                line : function() {
                    var _len = line[_0x2dae[192]][_0x2dae[36]];
                    var args;
                    var token;
                    var _i;
                    var _j;
                    /** @type {number} */
                    _i = 0;
                    for (;_i < _len;_i++) {
                        /** @type {number} */
                        _j = 0;
                        for (;_j < _len;_j++) {
                            args = line[_0x2dae[192]][_0x2dae[205]][_i];
                            token = line[_0x2dae[192]][_0x2dae[205]][_j];
                            if (args[_0x2dae[193]] - token[_0x2dae[193]] < line[_0x2dae[192]][_0x2dae[206]] && (args[_0x2dae[195]] - token[_0x2dae[195]] < line[_0x2dae[192]][_0x2dae[206]] && (args[_0x2dae[193]] - token[_0x2dae[193]] > -line[_0x2dae[192]][_0x2dae[206]] && args[_0x2dae[195]] - token[_0x2dae[195]] > -line[_0x2dae[192]][_0x2dae[206]]))) {
                                if (args[_0x2dae[193]] - line[_0x2dae[192]][_0x2dae[207]][_0x2dae[193]] < line[_0x2dae[192]][_0x2dae[198]] && (args[_0x2dae[195]] - line[_0x2dae[192]][_0x2dae[207]][_0x2dae[195]] < line[_0x2dae[192]][_0x2dae[198]] && (args[_0x2dae[193]] - line[_0x2dae[192]][_0x2dae[207]][_0x2dae[193]] > -line[_0x2dae[192]][_0x2dae[198]] && args[_0x2dae[195]] - line[_0x2dae[192]][_0x2dae[207]][_0x2dae[195]] > -line[_0x2dae[192]][_0x2dae[198]]))) {
                                    obj[_0x2dae[201]]();
                                    obj[_0x2dae[208]](args[_0x2dae[193]], args[_0x2dae[195]]);
                                    obj[_0x2dae[209]](token[_0x2dae[193]], token[_0x2dae[195]]);
                                    obj[_0x2dae[210]]();
                                    obj[_0x2dae[211]]();
                                }
                            }
                        }
                    }
                }
            };
            /**
             * @return {undefined}
             */
            line[_0x2dae[212]] = function() {
                var padLength = line[_0x2dae[192]][_0x2dae[36]];
                var part;
                var i;
                obj[_0x2dae[213]](0, 0, args[_0x2dae[128]], args[_0x2dae[188]]);
                /** @type {number} */
                i = 0;
                for (;i < padLength;i++) {
                    line[_0x2dae[192]][_0x2dae[205]][_0x2dae[81]](new animate);
                    part = line[_0x2dae[192]][_0x2dae[205]][i];
                    part[_0x2dae[214]]();
                }
                part[_0x2dae[215]]();
                part[_0x2dae[216]]();
            };
            /**
             * @return {undefined}
             */
            line[_0x2dae[217]] = function() {
                args[_0x2dae[128]] = window[_0x2dae[218]];
                args[_0x2dae[188]] = window[_0x2dae[219]];
            };
            /**
             * @return {undefined}
             */
            line[_0x2dae[220]] = function() {
                obj[_0x2dae[221]] = line[_0x2dae[192]][_0x2dae[199]][_0x2dae[222]];
                obj[_0x2dae[223]] = line[_0x2dae[192]][_0x2dae[215]][_0x2dae[222]];
                obj[_0x2dae[224]] = line[_0x2dae[192]][_0x2dae[215]][_0x2dae[128]];
                obj[_0x2dae[204]]();
            };
            /**
             * @param {?} $sanitize
             * @return {undefined}
             */
            line[_0x2dae[225]] = function($sanitize) {
                $sanitize();
                throttledUpdate(function() {
                    line[_0x2dae[225]](function() {
                        $sanitize();
                    });
                });
            };
            /**
             * @return {undefined}
             */
            line[_0x2dae[226]] = function() {
                $(window)[_0x2dae[26]](_0x2dae[227], function(dataAndEvents) {
                    line[_0x2dae[192]][_0x2dae[207]][_0x2dae[193]] = dataAndEvents[_0x2dae[228]];
                    line[_0x2dae[192]][_0x2dae[207]][_0x2dae[195]] = dataAndEvents[_0x2dae[229]];
                });
            };
            /**
             * @return {undefined}
             */
            line[_0x2dae[230]] = function() {
                line[_0x2dae[217]]();
                line[_0x2dae[220]]();
                line[_0x2dae[225]](function() {
                    line[_0x2dae[212]]();
                });
                line[_0x2dae[226]]();
            };
            return line;
        }
        var emptyJ = $(_0x2dae[165]);
        $spy[_0x2dae[21]](_0x2dae[187]);
        var throttledUpdate = window[_0x2dae[231]] || (window[_0x2dae[232]] || (window[_0x2dae[233]] || (window[_0x2dae[234]] || function(task) {
                window[_0x2dae[235]](task, 1E3 / 60);
            })));
        $(window)[_0x2dae[26]](_0x2dae[135], function() {
            setTimeout(function() {
                build($(_0x2dae[236])[0])[_0x2dae[230]]();
                emptyJ[_0x2dae[65]](_0x2dae[237], {
                    duration : 3E3
                });
            }, 2E3);
        });
        var successCallback = function() {
            var timers = {};
            return function(callback, delay, key) {
                if (!key) {
                    key = _0x2dae[60];
                }
                if (timers[key]) {
                    clearTimeout(timers[key]);
                }
                /** @type {number} */
                timers[key] = setTimeout(callback, delay);
            };
        }();
        $(window)[_0x2dae[238]](function() {
            successCallback(function() {
                build($(_0x2dae[236])[0])[_0x2dae[230]]();
            }, 800, _0x2dae[60]);
        });
    }
    /**
     * @return {undefined}
     */
    function main() {
        /**
         * @return {undefined}
         */
        function loop() {
            /** @type {Array} */
            var data = [_0x2dae[239], _0x2dae[240], _0x2dae[241], _0x2dae[242]];
            /** @type {Array} */
            var elems = [];
            var i;
            /** @type {number} */
            i = 0;
            for (;i < data[_0x2dae[36]];i++) {
                /** @type {Image} */
                var e = new Image;
                e[_0x2dae[243]] = data[i];
                /** @type {Image} */
                elems[i] = e;
            }
            var isArray = imagesLoaded(elems);
            $spy[_0x2dae[21]](_0x2dae[244]);
            $(_0x2dae[136])[_0x2dae[39]]();
            isArray[_0x2dae[26]](_0x2dae[245], function(dataAndEvents) {
                transition();
            });
        }
        if (_0x7cd2x8) {
            if (_bg_style_mobile == 1 || _bg_style_mobile == 2) {
                loop();
            } else {
                transition();
            }
        } else {
            if (_bg_style_desktop == 1 || _bg_style_desktop == 2) {
                loop();
            } else {
                transition();
            }
        }
    }
    /**
     * @return {undefined}
     */
    function group() {
        var emptyJ = $(_0x2dae[257]);
        if (emptyJ[_0x2dae[36]]) {
            emptyJ[_0x2dae[262]]({
                rewind : true,
                nav : true,
                navText : [_0x2dae[60], _0x2dae[60]],
                navContainer : _0x2dae[258],
                navContainerClass : _0x2dae[259],
                navClass : [_0x2dae[260], _0x2dae[261]],
                dots : false,
                margin : 30,
                responsive : {
                    0 : {
                        items : 1
                    },
                    768 : {
                        items : 2
                    },
                    992 : {
                        items : 3
                    }
                }
            });
        }
    }
    _0x2dae[1];
    var emptyJ = $(_0x2dae[2]);
    var $spy = $(_0x2dae[3]);
    var collection = $(_0x2dae[4]);
    var resp = $(_0x2dae[7])[_0x2dae[6]](_0x2dae[5]);
    var serverAttrs = collection[_0x2dae[8]](resp);
    (function() {
        _0x2dae[1];
        if (navigator[_0x2dae[10]][_0x2dae[9]](/IEMobile\/10\.0/)) {
            var r20 = document[_0x2dae[12]](_0x2dae[11]);
            r20[_0x2dae[15]](document[_0x2dae[14]](_0x2dae[13]));
            document[_0x2dae[17]](_0x2dae[16])[_0x2dae[15]](r20);
        }
    })();
    if (!emptyJ[_0x2dae[19]](_0x2dae[18])) {
        /** @type {boolean} */
        var _0x7cd2x8 = true;
        emptyJ[_0x2dae[21]](_0x2dae[20]);
    } else {
        /** @type {boolean} */
        _0x7cd2x8 = false;
        emptyJ[_0x2dae[21]](_0x2dae[22]);
    }
    if (emptyJ[_0x2dae[19]](_0x2dae[23])) {
        /** @type {boolean} */
        var _0x7cd2x9 = true
    }
    $(_0x2dae[27])[_0x2dae[26]](_0x2dae[24], function(dataAndEvents) {
        dataAndEvents[_0x2dae[25]]();
    });
    $(_0x2dae[33])[_0x2dae[32]]()[_0x2dae[31]](_0x2dae[30])[_0x2dae[21]](_0x2dae[29])[_0x2dae[28]](_0x2dae[7]);
    if (_site_border) {
        $spy[_0x2dae[21]](_0x2dae[34]);
    }
    shim();
    domReady();
    run();
    onDeviceReady();
    init();
    displayMachineTagTree();
    access();
    reset();
    $(window)[_0x2dae[26]](_0x2dae[135], function() {
        main();
    });
    $(_0x2dae[248])[_0x2dae[92]]()[_0x2dae[247]]()[_0x2dae[246]]();
    $(_0x2dae[251])[_0x2dae[58]](function() {
        $(this)[_0x2dae[6]](_0x2dae[250])[_0x2dae[247]]()[_0x2dae[21]](_0x2dae[46])[_0x2dae[100]]()[_0x2dae[249]]()[_0x2dae[57]]({
            display : _0x2dae[182]
        });
    });
    $(_0x2dae[256])[_0x2dae[26]](_0x2dae[24], function() {
        var emptyJ = $(this);
        if (emptyJ[_0x2dae[19]](_0x2dae[46])) {
            emptyJ[_0x2dae[31]](_0x2dae[46]);
            emptyJ[_0x2dae[100]]()[_0x2dae[249]](_0x2dae[253])[_0x2dae[71]](true)[_0x2dae[252]]();
        } else {
            emptyJ[_0x2dae[255]](_0x2dae[251])[_0x2dae[6]](_0x2dae[254])[_0x2dae[100]]()[_0x2dae[249]](_0x2dae[253])[_0x2dae[71]](true)[_0x2dae[252]]();
            emptyJ[_0x2dae[255]](_0x2dae[251])[_0x2dae[6]](_0x2dae[254])[_0x2dae[31]](_0x2dae[46]);
            emptyJ[_0x2dae[21]](_0x2dae[46]);
            emptyJ[_0x2dae[100]]()[_0x2dae[249]](_0x2dae[253])[_0x2dae[71]](true)[_0x2dae[246]]();
        }
    });
    group();
})(jQuery);
