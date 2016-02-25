var $ = jQuery.noConflict();
(function ($) {

    function transition() { //trata das animações do centro
        var statsTemplate;
        statsTemplate = "#" + $(".section").filter(".is-active").attr("id");
        $("a[href=" + statsTemplate + "]").addClass("is-active");
        call();
        if (emptyJ.hasClass("cssanimations")) {
            $(statsTemplate).find("[data-animation-in]").each(function () {
                var emptyJ = $(this);
                var r20 = "fadeIn";

                var _0x7cd2x11 = 1;
                if (emptyJ.data("animation-in")) {
                    r20 = emptyJ.data("animation-in");
                }
                if (emptyJ.data("animation-in-delay")) {
                    _0x7cd2x11 = emptyJ.data("animation-in-delay");
                }
                emptyJ.css("animation-delay", _0x7cd2x11 + 500 + "ms").addClass("animated").addClass(r20);
            });
        }
        $spy.addClass(statsTemplate.replace("#", " ") + "-in");
        $(".site-loader").velocity("fadeOut", {
            queue: false,
            delay: 500,
            duration: 800,

            complete: function () {
                $spy.addClass("is-loaded");
            }
        });
    }


    function domReady() {
        $(".site-header__icon__nav").find("a").add("resp").on("click", function (dataAndEvents) {
            dataAndEvents.preventDefault();
            one();
        });
    }


    function one() {
        var emptyJ = $(".site-nav");
        $spy.toggleClass("nav-in");
        if ($spy.hasClass("nav-in")) {
            emptyJ.velocity("stop", true).velocity("fadeIn", {
                duration: 500
            });
            $(".site-nav__inner").velocity("stop", true).velocity({
                translateY: "[0, -25%]",
                rotateX: "[0deg, 35deg]",
                opacity: "[1, '.4']"
            }, {
                duration: 500
            });
        } else {
            emptyJ.velocity("stop", true).velocity("fadeOut", {
                duration: 500
            });
            $(".site-nav__inner").velocity("stop", true).velocity({
                translateY: "[25%, 0]",
                rotateX: "[-35deg, 0deg]",
                opacity: "['.4', 1]"
            }, {
                duration: 500
            });
        }
    }


    function run() {
        var $src = $(".section");

        var which = [];
        $src.each(function () {
            which.push(this.id);
        });
        serverAttrs.on("click", function (dataAndEvents) {
            var curElem = $(this);
            var statsTemplate = curElem.attr("href");

            var maxh = 1;
            dataAndEvents.preventDefault();
            if (!$(statsTemplate).length || curElem.hasClass("is-active")) {
                return false;
            }
            if ($spy.hasClass("is-loaded")) {
                if (!$spy.hasClass("animating")) {
                    serverAttrs.filter(".is-active").removeClass("is-active");
                    teardown();
                    if (emptyJ.hasClass("cssanimations")) {
                        $src.filter(".is-active").find("[data-animation-out]").each(function () {
                            var h = $(this).data("animation-out-delay");
                            if (h) {
                                maxh = h > maxh ? h : maxh;
                            }
                        });
                    }
                    $(".site-loader").velocity("fadeIn", {
                        queue: false,
                        delay: maxh + 500,
                        duration: 800,

                        complete: function () {
                            $spy.removeClass("animating");
                            $(".site-wrap")["scrollTop"](0);
                            $(".site-wrap")["perfectscrollbar"]("update");
                            $(".section").filter(".is-active").removeClass("is-active");
                            $(statsTemplate).addClass("is-active");
                            $("a[href=" + statsTemplate + "]").addClass("is-active");
                            $.each(which, function (deepDataAndEvents, dataAndEvents) {
                                $spy.removeClass(dataAndEvents + "-in");
                            });
                            $spy.addClass(statsTemplate.replace("#", " ") + "-in");
                            $(".form-group").removeClass("error");
                            $(".form-notify").removeClass("valid error").html().hide();
                            $(this).velocity("fadeOut", {
                                delay: 100,
                                duration: 800
                            });
                            setTimeout(function () {
                                call();
                                onComplete();
                            }, 0);
                        }
                    });
                }
            }
        });
    }


    function onComplete() {
        var _0x7cd2x1d = $(".section").filter(".is-active");
        _0x7cd2x1d.find("[data-animation-in]").each(function () {
            var ctx = $(this);
            var r20 = "fadeIn";

            var y = 100;
            if (ctx.data("animation-in")) {
                r20 = ctx.data("animation-in");
            }
            if (ctx.data("animation-in-delay")) {
                y = ctx.data("animation-in-delay");
            }
            ctx.css("animation-delay", y + "ms").addClass("animated").addClass(r20);
        });
    }


    function teardown() {

        var _0x7cd2x18 = 1;
        $spy.addClass("animating");
        $("[data-animation-out]").each(function () {
            var collection = $(this);
            var resp = "fadeIn";
            var r20 = "fadeOut";

            var _0x7cd2x11 = 100;

            var y = 1;
            if (collection.data("animation-in")) {
                resp = collection.data("animation-in");
            }
            if (collection.data("animation-out")) {
                r20 = collection.data("animation-out");
            }
            if (collection.data("animation-in-delay")) {
                _0x7cd2x11 = collection.data("animation-in-delay");
            }
            if (collection.data("animation-out-delay")) {
                y = collection.data("animation-out-delay");
            }
            collection.css("animation-delay", _0x7cd2x11 + "ms");
            if (collection.closest(".section").hasClass("is-active")) {
                collection.removeClass(resp).addClass(r20);
                if (collection.data("animation-out-delay")) {
                    collection.css("animation-delay", y + "ms");
                } else {
                    collection.css("animation-delay", "1ms");
                }
            } else {
                collection.removeClass(resp).removeClass(r20).removeAttr("style", "animation-delay");
            }
        });
    }


    function call() {
        var emptyJ = $(".site-wrap");
        if (!_0x7cd2x8) {
            emptyJ.perfectScrollbar({
                suppressScrollX: true
            });
        }
    }


    function onDeviceReady() {
        var emptyJ = $("#formContact");
        var _0x7cd2x24 = emptyJ.find(".form-notify");
        emptyJ.validate({
            onfocusout: false,
            onkeyup: false,
            onclick: false,
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                }
            },
            messages: {},

            errorPlacement: function (element, error) {
            },

            highlight: function (js) {
                $(js).parent(".form-group").addClass("error");
            },

            unhighlight: function (element) {
                $(element).parent(".form-group").removeClass("error");
            },

            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    url: "assets/php/contact.php",
                    dataType: "json",
                    cache: false,
                    data: emptyJ.serialize(),

                    success: function (textStatus) {
                        if (textStatus.code == 0) {
                            emptyJ.validate().resetForm();
                            emptyJ[0].reset();
                            emptyJ.find(".form-label").removeClass("error");
                            emptyJ.find("button").blur();
                            _0x7cd2x24.removeClass("valid error").addClass("valid").html(textStatus.message).show();
                        } else {
                            _0x7cd2x24.removeClass("valid error").addClass("error").html(textStatus.message).show();
                        }
                    },

                    error: function (textStatus) {
                        _0x7cd2x24.removeClass("valid").addClass("error").html("An error occurred. Please try again later.").show();
                    }
                });
            },


            invalidHandler: function (val, k) {
                var _0x7cd2x2b = k.numberOfInvalids();
                if (_0x7cd2x2b) {
                    var r20 = _0x7cd2x2b == 1 ? "You missed  1 field. It has been highlighted. " : "You missed " + _0x7cd2x2b + "fields. They have been highlighted.";
                    _0x7cd2x24.removeClass("valid error").addClass("error").html(r20).show();
                }
            }
        });
    }


    function init() { //inicia a pop up para adicionar musicas
        var nodes = $('a[href="#newsletter"], a[href="#playlist"]');
        var emptyJ = $("#formNewsletter");
        var _0x7cd2x24 = emptyJ.find(".form-notify");
        var value = {
            closeMarkup: '<div class="mfp-close_c mfp-close"></div>',
            type: "inline",
            overflowY: "scroll",
            removalDelay: 500,
            mainClass: "mfp-effect",
            preloader: false,
            focus: "input",
            callbacks: {

                beforeOpen: function () {
                    if ($(window).width() < 768) {

                        this.st.focus = false;
                    } else {
                        this.st.focus = "#newsletterEmail";
                    }
                    $spy.addClass("newsletter-in");
                },

                beforeClose: function () {
                    $spy.removeClass("newsletter-in");
                },

                afterClose: function () {
                    nodes.blur();
                    emptyJ.find(".form-group").removeClass("error");
                    _0x7cd2x24.removeClass("valid error").html().hide();
                }
            },
            midClick: true
        };
        nodes.magnificPopup(value);
        emptyJ.validate({
            onfocusout: false,
            onkeyup: false,
            onclick: false,
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {},


            errorPlacement: function (element, error) {
            },

            highlight: function (js) {
                $(js).parent(".form-group").addClass("error");
            },

            unhighlight: function (element) {
                $(element).parent(".form-group").removeClass("error");
            },

            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    url: "/api-vlc/add",
                    dataType: "json",
                    cache: false,
                    data: emptyJ.serialize(),

                    success: function (textStatus) {
                        if (textStatus.code == 0) {
                            emptyJ.validate().resetForm();
                            emptyJ[0].reset();
                            emptyJ.find(".form-label").removeClass("error");
                            emptyJ.find("button").blur();
                            _0x7cd2x24.removeClass("error").addClass("valid").html(textStatus.message).show();
                        } else {
                            _0x7cd2x24.removeClass("valid").addClass("error").html(textStatus.message).show();
                        }
                    },

                    error: function (textStatus) {
                        _0x7cd2x24.removeClass("valid").addClass("error").html("An error occurred. Please try again later.").show();
                    }
                });
            },


            invalidHandler: function (val, k) {
                var _0x7cd2x2b = k.numberOfInvalids();
                if (_0x7cd2x2b) {
                    var r20 = _0x7cd2x2b == 1 ? "You missed 1 field. It has been highlighted. " : "You missed " + _0x7cd2x2b + "fields. They have been highlighted.";
                    _0x7cd2x24.removeClass("valid").addClass("error").html(r20).show();
                }
            }
        });
    }

    function fn() {
        var ease = $(".cloud-01");
        ease.velocity({
            translateZ: 0,
            translateX: "[-100%, 100%]"
        }, {
            duration: 25E3,
            ease: "liner",
            queue: false,

            complete: function () {
                $(this).velocity({
                    translateX: "100%"
                }, {
                    duration: 0,
                    queue: false,

                    complete: fn
                });
            }
        });
    }


    function done() {
        var ease = $(".cloud-02");
        ease.velocity({
            translateZ: 0,
            translateX: "[-100%, 100%]"
        }, {
            duration: 35E3,
            ease: "liner",
            queue: false,

            complete: function () {
                $(this).velocity({
                    translateX: "100%"
                }, {
                    duration: 0,
                    queue: false,

                    complete: done
                });
            }
        });
    }


    function show() {
        var ease = $(".cloud-03");
        ease.velocity({
            translateZ: 0,
            translateX: "[-100%, 100%]"
        }, {
            duration: 45E3,
            ease: "liner",
            queue: false,

            complete: function () {
                $(this).velocity({
                    translateX: "100%"
                }, {
                    duration: 0,
                    queue: false,

                    complete: show
                });
            }
        });
    }


    function callback() {
        var ease = $(".star-01");
        ease.velocity({
            translateZ: 0,
            translateY: "[-2000px, 0]"
        }, {
            duration: 5E4,
            ease: "liner",
            queue: false,

            complete: function () {
                $(this).velocity({
                    translateY: 0
                }, {
                    duration: 0,
                    queue: false,

                    complete: callback
                });
            }
        });
    }


    function hide() {
        var ease = $(".star-02");
        ease.velocity({
            translateZ: 0,
            translateY: "[-2000px, 0]"
        }, {
            duration: 1E5,
            ease: "liner",
            queue: false,

            complete: function () {
                $(this).velocity({
                    translateY: 0
                }, {
                    duration: 0,
                    queue: false,

                    complete: hide
                });
            }
        });
    }


    function fix() {
        var ease = $(".star-03");
        ease.velocity({
            translateZ: 0,
            translateY: "[-2000px, 0]"
        }, {
            duration: 15E4,
            ease: "liner",
            queue: false,

            complete: function () {
                $(this).velocity({
                    translateY: 0
                }, {
                    duration: 0,
                    queue: false,

                    complete: fix
                });
            }
        });
    }


    function find() {

        var _bg_effect_star_color = 'rgba(255, 255, 255, .9)';// rgba format - star color
        var _bg_effect_star_width = 1.6; // px - star width
        var _bg_effect_link_width = 0.4; //expessura das linhas


        function build(args) {

            function animate() {

                this.x = Math.random() * args.width;

                this.y = Math.random() * args.height;

                this.vx = line.config.velocity - Math.random() * 0.1;

                this.vy = line.config.velocity - Math.random() * 0.1;

                this.radius = Math.random() * line.config.star.width;
            }

            var lowestDeltaXY = 12E3;
            var VELOCITY_UFO = 0.2;
            var b4 = $(window).width();
            var a1 = $(window).height();
            var len = Math.round(a1 * b4 / lowestDeltaXY); //numero de estrelas
            var line = $(this);
            var obj = args.getContext("2d");

            line.config = {
                star: {
                    color: _bg_effect_star_color,
                    width: _bg_effect_star_width
                },
                line: {
                    color: _bg_effect_star_color,
                    width: _bg_effect_link_width
                },
                position: {
                    x: args.width * 0.5,
                    y: args.height * 0.5
                },
                velocity: VELOCITY_UFO,
                length: len,
                distance: 100,
                radius: 100,
                stars: []
            };

            animate.prototype = {

                create: function () {
                    obj.beginPath();
                    obj.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                    obj.fill();
                },

                animate: function () {
                    var unlock;

                    unlock = 0;
                    for (; unlock < line.config.length; unlock++) {
                        var cache = line.config.stars[unlock];
                        if (cache.y < 0 || cache.y > args.height) {
                            cache.vx = cache.vx;

                            cache.vy = -cache.vy;
                        } else {
                            if (cache.x < 0 || cache.x > args.width) {

                                cache.vx = -cache.vx;
                                cache.vy = cache.vy;
                            }
                        }
                        cache.x += cache.vx;
                        cache.y += cache.vy;
                    }
                },

                line: function () {
                    var _len = line.config.length;
                    var args;
                    var token;
                    var _i;
                    var _j;

                    _i = 0;
                    for (; _i < _len; _i++) {

                        _j = 0;
                        for (; _j < _len; _j++) {
                            args = line.config.stars[_i];
                            token = line.config.stars[_j];
                            if (args.x - token.x < line.config.distance && (args.y - token.y < line.config.distance && (args.x - token.x > -line.config.distance && args.y - token.y > -line.config.distance))) {
                                if (args.x - line.config.position.x < line.config.radius && (args.y - line.config.position.y < line.config.radius && (args.x - line.config.position.x > -line.config.radius && args.y - line.config.position.y > -line.config.radius))) {
                                    obj.beginPath();
                                    obj.moveTo(args.x, args.y);
                                    obj.lineTo(token.x, token.y);
                                    obj.stroke();
                                    obj.closePath();
                                }
                            }
                        }
                    }
                }
            };

            line.createStars = function () {
                var padLength = line.config.length;
                var part;
                var i;
                obj.clearRect(0, 0, args.width, args.height);

                i = 0;
                for (; i < padLength; i++) {
                    line.config.stars.push(new animate);
                    part = line.config.stars[i];
                    part.create();
                }
                part.line();
                part.animate();
            };

            line.setCanvas = function () {
                args.width = window.innerWidth;
                args.height = window.innerHeight;
            };

            line.setContext = function () {
                obj.fillStyle = line.config.star.color;
                obj.strokeStyle = line.config.line.color;
                obj.lineWidth = line.config.line.width;
                obj.fill();
            };


            line.loop = function ($sanitize) {
                $sanitize();
                throttledUpdate(function () {
                    line.loop(function () {
                        $sanitize();
                    });
                });
            };

            line.bind = function () {
                $(window).on("mousemove", function (dataAndEvents) {
                    line.config.position.x = dataAndEvents.pageX;
                    line.config.position.y = dataAndEvents.pageY;
                });
            };

            line.init = function () {
                line.setCanvas();
                line.setContext();
                line.loop(function () {
                    line.createStars();
                });
                line.bind();
            };
            return line;
        }

        var emptyJ = $(".site-bg__canvas");
        $spy.addClass("is-site-bg-star");
        var throttledUpdate = window.requestAnimationFrame || (window.mozRequestAnimationFrame || (window.webkitRequestAnimationFrame || (window.msRequestAnimationFrame || function (task) {
                window.setTimeout(task, 1E3 / 60);
            })));
        $(window).on("load", function () {
            setTimeout(function () {
                build($("canvas")[0]).init();
                emptyJ.velocity("transition.fadeIn", {
                    duration: 3E3
                });
            }, 2E3);
        });

        var successCallback = function () {
            var timers = {};
            return function (callback, delay, key) {
                if (!key) {
                    key = " ";
                }
                if (timers.key) {
                    clearTimeout(timers.key);
                }

                timers.key = setTimeout(callback, delay);
            };
        }();
        $(window).resize(function () {
            successCallback(function () {
                build($("canvas")[0]).init();
            }, "800", " ");
        });
    }


    function main() {

        function loop() {

            var data = ["assets/img/bg/home.jpg", "assets/img/bg/about.jpg", "assets/img/bg/service.jpg", "assets/img/bg/contact.jpg"];

            var elems = [];
            var i;

            i = 0;
            for (; i < data.length; i++) {

                var e = new Image;
                e.src = data[i];

                elems[i] = e;
            }
            var isArray = imagesLoaded(elems);
            $spy.addClass("is-each");
            $(".site-bg__video").remove();
            isArray.on("always", function (dataAndEvents) {
                transition();
            });
        }

        loop();
    }


    function group() {
        var emptyJ = $("#serviceCarousel");
        if (emptyJ.length) {
            emptyJ.owlCarousel({
                rewind: true,
                nav: true,
                navText: "[, ]",
                navContainer: ".service__carousel-control",
                navContainerClass: "carousel-nav",
                navClass: "[carousel-prev, carousel-next]",
                dots: false,
                margin: 30,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                }
            });
        }
    }

    "use strict;"
    var emptyJ = $("html");
    var $spy = $("body");
    var collection = $('[data-link="section"]');
    var resp = $(".site-nav__menu").find("a");
    var serverAttrs = collection.add("resp");
    (function () {
        "use strict;"
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var r20 = document.createElement("style");
            r20.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
            document.querySelector("head").appendChild(r20);
        }
    })();
    if (!emptyJ.hasClass("desktop")) {

        var _0x7cd2x8 = true;
        emptyJ.addClass("is-mobile");
    } else {

        _0x7cd2x8 = false;
        emptyJ.addClass("is-desktop");
    }
    if (emptyJ.hasClass("ie9")) {

        var _0x7cd2x9 = true
    }
    $("a[href=#]").on("click", function (dataAndEvents) {
        dataAndEvents.preventDefault();
    });
    $(".site-footer__social").clone().removeClass("site-footer__social").addClass("site-nav__social").insertAfter(".site-nav__menu");
    domReady();
    run();
    onDeviceReady();
    init();
    find();
    $(window).on("load", function () {
        main();
    });
    $(".accordion > dd").hide().first().slideDown();
    $(".accordion").each(function () {
        $(this).find("dt > a").first().addClass("is-active").parent().next().css({
            display: "block"
        });
    });
    $(".accordion > dt > a").on("click", function () {
        var emptyJ = $(this);
        if (emptyJ.hasClass("is-active")) {
            emptyJ.removeClass("is-active");
            emptyJ.parent().next("dd").stop(true).slideUp();
        } else {
            emptyJ.parents(".accordion").find("dt > a.is-active").parent().next("dd").stop(true).slideUp();
            emptyJ.parents(".accordion").find("dt > a.is-active").removeClass("is-active");
            emptyJ.addClass("is-active");
            emptyJ.parent().next("dd").stop(true).slideDown();
        }
    });
    group();
})(jQuery);
