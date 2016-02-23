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
var $ = jQuery[noConflict]();
(function($) {
    /**
     * @return {undefined}
     */
    function shim() {
        var emptyJ = $('#countdown_dashboard');
        if (_countdown) {
            if (emptyJ[length]) {
                $spy[addClass](countdown-on);
                emptyJ[countDown]({
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
            emptyJ[remove]();
        }
    }
    /**
     * @return {undefined}
     */
    function transition() {
        var statsTemplate;
        statsTemplate = # + $('.section')[filter]('.is-active')[attr](id);
        $(a[href=" + statsTemplate + "])[addClass](is-active);
        call();
        if (emptyJ[hasClass](cssanimations)) {
            $(statsTemplate)[find]([data-animation-in])[each](function() {
                var emptyJ = $(this);
                var r20 = fadeIn;
                /** @type {number} */
                var _0x7cd2x11 = 1;
                if (emptyJ[data](animation-in)) {
                    r20 = emptyJ[data](animation-in);
                }
                if (emptyJ[data](animation-in-delay)) {
                    _0x7cd2x11 = emptyJ[data](animation-in-delay);
                }
                emptyJ[css](animation-delay, _0x7cd2x11 + 500 + ms)[addClass](animated)[addClass](r20);
            });
        }
        $spy[addClass](statsTemplate[replace](#, ) + -in);
        $('.site-loader')[velocity](fadeOut, {
            queue : false,
            delay : 500,
            duration : 800,
            /**
             * @return {undefined}
             */
            complete : function() {
                $spy[addClass](is-loaded);
            }
        });
    }
    /**
     * @return {undefined}
     */
    function domReady() {
        $('.site-header__icon__nav')[find](a)[add](resp)[on](click, function(dataAndEvents) {
            dataAndEvents[preventDefault]();
            one();
        });
    }
    /**
     * @return {undefined}
     */
    function one() {
        var emptyJ = $('.site-nav');
        $spy[toggleClass](nav-in);
        if ($spy[hasClass](nav-in)) {
            emptyJ[velocity](stop, true)[velocity](fadeIn, {
                duration : 500
            });
            $('.site-nav__inner')[velocity](stop, true)[velocity]({
                translateY : [0, -25%],
                rotateX : [0deg, 35deg],
                opacity : [1, '.4']
            }, {
                duration : 500
            });
        } else {
            emptyJ[velocity](stop, true)[velocity](fadeOut, {
                duration : 500
            });
            $('.site-nav__inner')[velocity](stop, true)[velocity]({
                translateY : [25%, 0],
                rotateX : [-35deg, 0deg],
                opacity : ['.4', 1]
            }, {
                duration : 500
            });
        }
    }
    /**
     * @return {undefined}
     */
    function run() {
        var $src = $('.section');
        /** @type {Array} */
        var which = [];
        $src[each](function() {
            which[push](this[id]);
        });
        serverAttrs[on](click, function(dataAndEvents) {
            var curElem = $(this);
            var statsTemplate = curElem[attr](href);
            /** @type {number} */
            var maxh = 1;
            dataAndEvents[preventDefault]();
            if (!$(statsTemplate)[length] || curElem[hasClass](is-active)) {
                return false;
            }
            if ($spy[hasClass](is-loaded)) {
                if (!$spy[hasClass](animating)) {
                    serverAttrs[filter]('.is-active')[removeClass](is-active);
                    teardown();
                    if (emptyJ[hasClass](cssanimations)) {
                        $src[filter]('.is-active')[find]([data-animation-out])[each](function() {
                            var h = $(this)[data](animation-out-delay);
                            if (h) {
                                maxh = h > maxh ? h : maxh;
                            }
                        });
                    }
                    $('.site-loader')[velocity](fadeIn, {
                        queue : false,
                        delay : maxh + 500,
                        duration : 800,
                        /**
                         * @return {undefined}
                         */
                        complete : function() {
                            $spy[removeClass](animating);
                            $('.site-wrap')[scrollTop](0);
                            $('.site-wrap')[perfectScrollbar](update);
                            $('.section')[filter]('.is-active')[removeClass](is-active);
                            $(statsTemplate)[addClass](is-active);
                            $(a[href=" + statsTemplate + "])[addClass](is-active);
                            $[each](which, function(deepDataAndEvents, dataAndEvents) {
                                $spy[removeClass](dataAndEvents + -in);
                            });
                            $spy[addClass](statsTemplate[replace](#, ) + -in);
                            $('.form-group')[removeClass](error);
                            $('.form-notify')[removeClass](valid error)[html]()[hide]();
                            $(this)[velocity](fadeOut, {
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
        var _0x7cd2x1d = $('.section')[filter]('.is-active');
        _0x7cd2x1d[find]([data-animation-in])[each](function() {
            var ctx = $(this);
            var r20 = fadeIn;
            /** @type {number} */
            var y = 100;
            if (ctx[data](animation-in)) {
                r20 = ctx[data](animation-in);
            }
            if (ctx[data](animation-in-delay)) {
                y = ctx[data](animation-in-delay);
            }
            ctx[css](animation-delay, y + ms)[addClass](animated)[addClass](r20);
        });
    }
    /**
     * @return {undefined}
     */
    function teardown() {
        /** @type {number} */
        var _0x7cd2x18 = 1;
        $spy[addClass](animating);
        $([data-animation-out])[each](function() {
            var collection = $(this);
            var resp = fadeIn;
            var r20 = fadeOut;
            /** @type {number} */
            var _0x7cd2x11 = 100;
            /** @type {number} */
            var y = 1;
            if (collection[data](animation-in)) {
                resp = collection[data](animation-in);
            }
            if (collection[data](animation-out)) {
                r20 = collection[data](animation-out);
            }
            if (collection[data](animation-in-delay)) {
                _0x7cd2x11 = collection[data](animation-in-delay);
            }
            if (collection[data](animation-out-delay)) {
                y = collection[data](animation-out-delay);
            }
            collection[css](animation-delay, _0x7cd2x11 + ms);
            if (collection[closest]('.section')[hasClass](is-active)) {
                collection[removeClass](resp)[addClass](r20);
                if (collection[data](animation-out-delay)) {
                    collection[css](animation-delay, y + ms);
                } else {
                    collection[css](animation-delay, 1ms);
                }
            } else {
                collection[removeClass](resp)[removeClass](r20)[removeAttr](style, animation-delay);
            }
        });
    }
    /**
     * @return {undefined}
     */
    function call() {
        var emptyJ = $('.site-wrap');
        if (!_0x7cd2x8) {
            emptyJ[perfectScrollbar]({
                suppressScrollX : true
            });
        }
    }
    /**
     * @return {undefined}
     */
    function onDeviceReady() {
        var emptyJ = $(#formContact);
        var _0x7cd2x24 = emptyJ[find]('.form-notify');
        emptyJ[validate]({
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
                $(js)[parent]('.form-group')[addClass](error);
            },
            /**
             * @param {?} element
             * @return {undefined}
             */
            unhighlight : function(element) {
                $(element)[parent]('.form-group')[removeClass](error);
            },
            /**
             * @param {?} form
             * @return {undefined}
             */
            submitHandler : function(form) {
                $(form)[ajaxSubmit]({
                    type : POST,
                    url : assets/php/contact.php,
                    dataType : json,
                    cache : false,
                    data : emptyJ[serialize](),
                    /**
                     * @param {?} textStatus
                     * @return {undefined}
                     */
                    success : function(textStatus) {
                        if (textStatus[code] == 0) {
                            emptyJ[validate]()[resetForm]();
                            emptyJ[0][reset]();
                            emptyJ[find]('.form-label')[removeClass](error);
                            emptyJ[find](button)[blur]();
                            _0x7cd2x24[removeClass](valid error)[addClass](valid)[html](textStatus[message])[show]();
                        } else {
                            _0x7cd2x24[removeClass](valid error)[addClass](error)[html](textStatus[message])[show]();
                        }
                    },
                    /**
                     * @param {?} textStatus
                     * @return {undefined}
                     */
                    error : function(textStatus) {
                        _0x7cd2x24[removeClass](valid)[addClass](error)[html](An error occurred. Please try again later.)[show]();
                    }
                });
            },
            /**
             * @param {?} val
             * @param {?} k
             * @return {undefined}
             */
            invalidHandler : function(val, k) {
                var _0x7cd2x2b = k[numberOfInvalids]();
                if (_0x7cd2x2b) {
                    var r20 = _0x7cd2x2b == 1 ? You missed 1 field. It has been highlighted. : You missed  + _0x7cd2x2b +  fields. They have been highlighted.;
                    _0x7cd2x24[removeClass](valid error)[addClass](error)[html](r20)[show]();
                }
            }
        });
    }
    /**
     * @return {undefined}
     */
    function init() {
        var nodes = $('a[href="#newsletter"], a[href="#playlist"]');
        var emptyJ = $(#formNewsletter);
        var _0x7cd2x24 = emptyJ[find]('.form-notify');
        var value = {
            closeMarkup : <div class="mfp-close_c mfp-close"></div>,
            type : inline,
            overflowY : scroll,
            removalDelay : 500,
            mainClass : mfp-effect,
            preloader : false,
            focus : input,
            callbacks : {
                /**
                 * @return {undefined}
                 */
                beforeOpen : function() {
                    if ($(window)[width]() < 768) {
                        /** @type {boolean} */
                        this[st][focus] = false;
                    } else {
                        this[st][focus] = #newsletterEmail;
                    }
                    $spy[addClass](newsletter-in);
                },
                /**
                 * @return {undefined}
                 */
                beforeClose : function() {
                    $spy[removeClass](newsletter-in);
                },
                /**
                 * @return {undefined}
                 */
                afterClose : function() {
                    nodes[blur]();
                    emptyJ[find]('.form-group')[removeClass](error);
                    _0x7cd2x24[removeClass](valid error)[html]()[hide]();
                }
            },
            midClick : true
        };
        nodes[magnificPopup](value);
        emptyJ[validate]({
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
                $(js)[parent]('.form-group')[addClass](error);
            },
            /**
             * @param {?} element
             * @return {undefined}
             */
            unhighlight : function(element) {
                $(element)[parent]('.form-group')[removeClass](error);
            },
            /**
             * @param {?} form
             * @return {undefined}
             */
            submitHandler : function(form) {
                $(form)[ajaxSubmit]({
                    type : POST,
                    url : /api-vlc/add,
                    dataType : json,
                    cache : false,
                    data : emptyJ[serialize](),
                    /**
                     * @param {?} textStatus
                     * @return {undefined}
                     */
                    success : function(textStatus) {
                        if (textStatus[code] == 0) {
                            emptyJ[validate]()[resetForm]();
                            emptyJ[0][reset]();
                            emptyJ[find]('.form-label')[removeClass](error);
                            emptyJ[find](button)[blur]();
                            _0x7cd2x24[removeClass](error)[addClass](valid)[html](textStatus[message])[show]();
                        } else {
                            _0x7cd2x24[removeClass](valid)[addClass](error)[html](textStatus[message])[show]();
                        }
                    },
                    /**
                     * @param {?} textStatus
                     * @return {undefined}
                     */
                    error : function(textStatus) {
                        _0x7cd2x24[removeClass](valid)[addClass](error)[html](An error occurred. Please try again later.)[show]();
                    }
                });
            },
            /**
             * @param {?} val
             * @param {?} k
             * @return {undefined}
             */
            invalidHandler : function(val, k) {
                var _0x7cd2x2b = k[numberOfInvalids]();
                if (_0x7cd2x2b) {
                    var r20 = _0x7cd2x2b == 1 ? You missed 1 field. It has been highlighted. : You missed  + _0x7cd2x2b +  fields. They have been highlighted.;
                    _0x7cd2x24[removeClass](valid)[addClass](error)[html](r20)[show]();
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
        $('.site-bg__video')[remove]();
        $spy[addClass](is-site-bg-img);
    }

    /**
     * @return {undefined}
     */
    function access() {
        /**
         * @return {undefined}
         */
        function fn() {
            var emptyJ = $('.site-header__icon__audio');
            var _0x7cd2x3c = document[getElementById](audioPlayer);
            emptyJ[on](click, function() {
                var emptyJ = $(this);
                if ($spy[hasClass](is-audio-on)) {
                    //_0x7cd2x3c[pause]();
                    $spy[removeClass](is-audio-on)[addClass](is-audio-off);
                } else {
                    if ($spy[hasClass](is-audio-off)) {
                        //_0x7cd2x3c[play]();
                        $spy[removeClass](is-audio-off)[addClass](is-audio-on);
                    }
                }
            });
        }
        if (_0x7cd2x8) {
            if (_bg_style_mobile == 2 || (_bg_style_mobile == 4 || (_bg_style_mobile == 6 || _bg_style_mobile == 8))) {
                $spy[addClass](is-audio-off);
                fn();
            }
        } else {
            if (_bg_style_desktop == 2 || (_bg_style_desktop == 4 || (_bg_style_desktop == 6 || (_bg_style_desktop == 8 || (_bg_style_desktop == 11 || _bg_style_desktop == 14))))) {
                var _0x7cd2x3c = document[getElementById](audioPlayer);
                $spy[addClass](is-audio-on);
                //_0x7cd2x3c[play]();
                fn();
            }
        }
    }
    /**
     * @return {undefined}
     */
    function reset() {
        if (_bg_effect == 0) {
            $('.site-bg__canvas')[remove]();
        } else {
            if (_bg_effect == 1) {
                focus();
            } else {
                if (_bg_effect == 3) {
                    find();
                }
            }
        }
    }
    /**
     * @return {undefined}
     */
    function focus() {
        var emptyJ = $('.site-bg__effect');
        $('.site-bg__canvas')[remove]();
        emptyJ[css](opacity, _cloud_opacity);
        if (emptyJ[length]) {
            emptyJ[append](<div class="cloud cloud-01"></div> + <div class="cloud cloud-02"></div> + <div class="cloud cloud-03"></div>);
            $spy[addClass](is-site-bg-cloud);
            fn();
            done();
            show();
        }
    }
    /**
     * @return {undefined}
     */
    function fn() {
        var ease = $('.cloud-01');
        ease[velocity]({
            translateZ : 0,
            translateX : [-100%, 100%]
        }, {
            duration : 25E3,
            ease : liner,
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[velocity]({
                    translateX : 100%
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
        var ease = $('.cloud-02');
        ease[velocity]({
            translateZ : 0,
            translateX : [-100%, 100%]
        }, {
            duration : 35E3,
            ease : liner,
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[velocity]({
                    translateX : 100%
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
        var ease = $('.cloud-03');
        ease[velocity]({
            translateZ : 0,
            translateX : [-100%, 100%]
        }, {
            duration : 45E3,
            ease : liner,
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[velocity]({
                    translateX : 100%
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
    function callback() {
        var ease = $('.star-01');
        ease[velocity]({
            translateZ : 0,
            translateY : [-2000px, 0]
        }, {
            duration : 5E4,
            ease : liner,
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[velocity]({
                    translateY : 0
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
        var ease = $('.star-02');
        ease[velocity]({
            translateZ : 0,
            translateY : [-2000px, 0]
        }, {
            duration : 1E5,
            ease : liner,
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[velocity]({
                    translateY : 0
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
        var ease = $('.star-03');
        ease[velocity]({
            translateZ : 0,
            translateY : [-2000px, 0]
        }, {
            duration : 15E4,
            ease : liner,
            queue : false,
            /**
             * @return {undefined}
             */
            complete : function() {
                $(this)[velocity]({
                    translateY : 0
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
                this[x] = Math[random]() * args[width];
                /** @type {number} */
                this[y] = Math[random]() * args[height];
                /** @type {number} */
                this[vx] = line[config][velocity] - Math[random]() * 0.3;
                /** @type {number} */
                this[vy] = line[config][velocity] - Math[random]() * 0.3;
                /** @type {number} */
                this[radius] = Math[random]() * line[config][star][width];
            }
            /** @type {number} */
            var lowestDeltaXY = 12E3;
            /** @type {number} */
            var VELOCITY_UFO = 0.2;
            var b4 = $(window)[width]();
            var a1 = $(window)[height]();
            var len = Math[round](a1 * b4 / lowestDeltaXY);
            var line = $(this);
            var obj = args[getContext](2d);
            line[config] = {
                star : {
                    color : _bg_effect_star_color,
                    width : _bg_effect_star_width
                },
                line : {
                    color : _bg_effect_star_color,
                    width : 0.4
                },
                position : {
                    x : args[width] * 0.5,
                    y : args[height] * 0.5
                },
                velocity : VELOCITY_UFO,
                length : len,
                distance : 130,
                radius : 120,
                stars : []
            };
            animate[prototype] = {
                /**
                 * @return {undefined}
                 */
                create : function() {
                    obj[beginPath]();
                    obj[arc](this[x], this[y], this[radius], 0, Math[PI] * 2, false);
                    obj[fill]();
                },
                /**
                 * @return {undefined}
                 */
                animate : function() {
                    var unlock;
                    /** @type {number} */
                    unlock = 0;
                    for (;unlock < line[config][length];unlock++) {
                        var cache = line[config][stars][unlock];
                        if (cache[y] < 0 || cache[y] > args[height]) {
                            cache[vx] = cache[vx];
                            /** @type {number} */
                            cache[vy] = -cache[vy];
                        } else {
                            if (cache[x] < 0 || cache[x] > args[width]) {
                                /** @type {number} */
                                cache[vx] = -cache[vx];
                                cache[vy] = cache[vy];
                            }
                        }
                        cache[x] += cache[vx];
                        cache[y] += cache[vy];
                    }
                },
                /**
                 * @return {undefined}
                 */
                line : function() {
                    var _len = line[config][length];
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
                            args = line[config][stars][_i];
                            token = line[config][stars][_j];
                            if (args[x] - token[x] < line[config][distance] && (args[y] - token[y] < line[config][distance] && (args[x] - token[x] > -line[config][distance] && args[y] - token[y] > -line[config][distance]))) {
                                if (args[x] - line[config][position][x] < line[config][radius] && (args[y] - line[config][position][y] < line[config][radius] && (args[x] - line[config][position][x] > -line[config][radius] && args[y] - line[config][position][y] > -line[config][radius]))) {
                                    obj[beginPath]();
                                    obj[moveTo](args[x], args[y]);
                                    obj[lineTo](token[x], token[y]);
                                    obj[stroke]();
                                    obj[closePath]();
                                }
                            }
                        }
                    }
                }
            };
            /**
             * @return {undefined}
             */
            line[createStars] = function() {
                var padLength = line[config][length];
                var part;
                var i;
                obj[clearRect](0, 0, args[width], args[height]);
                /** @type {number} */
                i = 0;
                for (;i < padLength;i++) {
                    line[config][stars][push](new animate);
                    part = line[config][stars][i];
                    part[create]();
                }
                part[line]();
                part[animate]();
            };
            /**
             * @return {undefined}
             */
            line[setCanvas] = function() {
                args[width] = window[innerWidth];
                args[height] = window[innerHeight];
            };
            /**
             * @return {undefined}
             */
            line[setContext] = function() {
                obj[fillStyle] = line[config][star][color];
                obj[strokeStyle] = line[config][line][color];
                obj[lineWidth] = line[config][line][width];
                obj[fill]();
            };
            /**
             * @param {?} $sanitize
             * @return {undefined}
             */
            line[loop] = function($sanitize) {
                $sanitize();
                throttledUpdate(function() {
                    line[loop](function() {
                        $sanitize();
                    });
                });
            };
            /**
             * @return {undefined}
             */
            line[bind] = function() {
                $(window)[on](mousemove, function(dataAndEvents) {
                    line[config][position][x] = dataAndEvents[pageX];
                    line[config][position][y] = dataAndEvents[pageY];
                });
            };
            /**
             * @return {undefined}
             */
            line[init] = function() {
                line[setCanvas]();
                line[setContext]();
                line[loop](function() {
                    line[createStars]();
                });
                line[bind]();
            };
            return line;
        }
        var emptyJ = $('.site-bg__canvas');
        $spy[addClass](is-site-bg-star);
        var throttledUpdate = window[requestAnimationFrame] || (window[mozRequestAnimationFrame] || (window[webkitRequestAnimationFrame] || (window[msRequestAnimationFrame] || function(task) {
                window[setTimeout](task, 1E3 / 60);
            })));
        $(window)[on](load, function() {
            setTimeout(function() {
                build($(canvas)[0])[init]();
                emptyJ[velocity](transition.fadeIn, {
                    duration : 3E3
                });
            }, 2E3);
        });
        var successCallback = function() {
            var timers = {};
            return function(callback, delay, key) {
                if (!key) {
                    key = ;
                }
                if (timers[key]) {
                    clearTimeout(timers[key]);
                }
                /** @type {number} */
                timers[key] = setTimeout(callback, delay);
            };
        }();
        $(window)[resize](function() {
            successCallback(function() {
                build($(canvas)[0])[init]();
            }, 800, );
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
            var data = [assets/img/bg/home.jpg, assets/img/bg/about.jpg, assets/img/bg/service.jpg, assets/img/bg/contact.jpg];
            /** @type {Array} */
            var elems = [];
            var i;
            /** @type {number} */
            i = 0;
            for (;i < data[length];i++) {
                /** @type {Image} */
                var e = new Image;
                e[src] = data[i];
                /** @type {Image} */
                elems[i] = e;
            }
            var isArray = imagesLoaded(elems);
            $spy[addClass](is-each);
            $('.site-bg__video')[remove]();
            isArray[on](always, function(dataAndEvents) {
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
        var emptyJ = $(#serviceCarousel);
        if (emptyJ[length]) {
            emptyJ[owlCarousel]({
                rewind : true,
                nav : true,
                navText : [, ],
                navContainer : '.service__carousel-control',
                navContainerClass : carousel-nav,
                navClass : [carousel-prev, carousel-next],
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
    use strict;
    var emptyJ = $(html);
    var $spy = $(body);
    var collection = $([data-link="section"]);
    var resp = $('.site-nav__menu')[find](a);
    var serverAttrs = collection[add](resp);
    (function() {
        use strict;
        if (navigator[userAgent][match](/IEMobile\/10\.0/)) {
            var r20 = document[createElement](style);
            r20[appendChild](document[createTextNode](@-ms-viewport{width:auto!important}));
            document[querySelector](head)[appendChild](r20);
        }
    })();
    if (!emptyJ[hasClass](desktop)) {
        /** @type {boolean} */
        var _0x7cd2x8 = true;
        emptyJ[addClass](is-mobile);
    } else {
        /** @type {boolean} */
        _0x7cd2x8 = false;
        emptyJ[addClass](is-desktop);
    }
    if (emptyJ[hasClass](ie9)) {
        /** @type {boolean} */
        var _0x7cd2x9 = true
    }
    $(a[href=#])[on](click, function(dataAndEvents) {
        dataAndEvents[preventDefault]();
    });
    $('.site-footer__social')[clone]()[removeClass](site-footer__social)[addClass](site-nav__social)[insertAfter]('.site-nav__menu');
    if (_site_border) {
        $spy[addClass](border-on);
    }
    shim();
    domReady();
    run();
    onDeviceReady();
    init();
    displayMachineTagTree();
    access();
    reset();
    $(window)[on](load, function() {
        main();
    });
    $('.accordion > dd')[hide]()[first]()[slideDown]();
    $('.accordion')[each](function() {
        $(this)[find](dt > a)[first]()[addClass](is-active)[parent]()[next]()[css]({
            display : block
        });
    });
    $('.accordion > dt > a')[on](click, function() {
        var emptyJ = $(this);
        if (emptyJ[hasClass](is-active)) {
            emptyJ[removeClass](is-active);
            emptyJ[parent]()[next](dd)[stop](true)[slideUp]();
        } else {
            emptyJ[parents]('.accordion')[find](dt > a.is-active)[parent]()[next](dd)[stop](true)[slideUp]();
            emptyJ[parents]('.accordion')[find](dt > a.is-active)[removeClass](is-active);
            emptyJ[addClass](is-active);
            emptyJ[parent]()[next](dd)[stop](true)[slideDown]();
        }
    });
    group();
})(jQuery);
