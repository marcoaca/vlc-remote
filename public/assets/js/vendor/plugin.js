/*!
 * Owl carousel
 */
!function (t, e, i, s) {
    function n(e, i) {
        this.settings = null, this.options = t.extend({}, n.Defaults, i), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, t.each(["onResize", "onThrottledResize"], t.proxy(function (e, i) {
            this._handlers[i] = t.proxy(this[i], this)
        }, this)), t.each(n.Plugins, t.proxy(function (t, e) {
            this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
        }, this)), t.each(n.Workers, t.proxy(function (e, i) {
            this._pipe.push({
                filter: i.filter,
                run: t.proxy(i.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }

    n.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, n.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, n.Type = {
        Event: "event",
        State: "state"
    }, n.Plugins = {}, n.Workers = [{
        filter: ["width", "settings"],
        run: function () {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function () {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (t) {
            var e = this.settings.margin || "",
                i = !this.settings.autoWidth,
                s = this.settings.rtl,
                n = {
                    width: "auto",
                    "margin-left": s ? e : "",
                    "margin-right": s ? "" : e
                };
            !i && this.$stage.children().css(n), t.css = n
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (t) {
            var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                i = null,
                s = this._items.length,
                n = !this.settings.autoWidth,
                o = [];
            for (t.items = {
                merge: !1,
                width: e
            }; s--;) i = this._mergers[s], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = i > 1 || t.items.merge, o[s] = n ? e * i : this._items[s].width();
            this._widths = o
        }
    }, {
        filter: ["items", "settings"],
        run: function () {
            var e = [],
                i = this._items,
                s = this.settings,
                n = Math.max(2 * s.items, 4),
                o = 2 * Math.ceil(i.length / 2),
                r = s.loop && i.length ? s.rewind ? n : Math.max(n, o) : 0,
                a = "",
                h = "";
            for (r /= 2; r--;) e.push(this.normalize(e.length / 2, !0)), a += i[e[e.length - 1]][0].outerHTML, e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), h = i[e[e.length - 1]][0].outerHTML + h;
            this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(h).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function () {
            for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, s = 0, n = 0, o = []; ++i < e;) s = o[i - 1] || 0, n = this._widths[this.relative(i)] + this.settings.margin, o.push(s + n * t);
            this._coordinates = o
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function () {
            var t = this.settings.stagePadding,
                e = this._coordinates,
                i = {
                    width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                    "padding-left": t || "",
                    "padding-right": t || ""
                };
            this.$stage.css(i)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (t) {
            var e = this._coordinates.length,
                i = !this.settings.autoWidth,
                s = this.$stage.children();
            if (i && t.items.merge)
                for (; e--;) t.css.width = this._widths[this.relative(e)], s.eq(e).css(t.css);
            else i && (t.css.width = t.items.width, s.css(t.css))
        }
    }, {
        filter: ["items"],
        run: function () {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function (t) {
            t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
        }
    }, {
        filter: ["position"],
        run: function () {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function () {
            var t, e, i, s, n = this.settings.rtl ? 1 : -1,
                o = 2 * this.settings.stagePadding,
                r = this.coordinates(this.current()) + o,
                a = r + this.width() * n,
                h = [];
            for (i = 0, s = this._coordinates.length; s > i; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * n, (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && h.push(i);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + h.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
        }
    }], n.prototype.initialize = function () {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var e, i, n;
            e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : s, n = this.$element.children(i).width(), e.length && 0 >= n && this.preloadAutoWidthImages(e)
        }
        this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, n.prototype.setup = function () {
        var e = this.viewport(),
            i = this.options.responsive,
            s = -1,
            n = null;
        i ? (t.each(i, function (t) {
            e >= t && t > s && (s = Number(t))
        }), n = t.extend({}, this.options, i[s]), delete n.responsive, n.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + s))) : n = t.extend({}, this.options), (null === this.settings || this._breakpoint !== s) && (this.trigger("change", {
            property: {
                name: "settings",
                value: n
            }
        }), this._breakpoint = s, this.settings = n, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, n.prototype.optionsLogic = function () {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, n.prototype.prepare = function (e) {
        var i = this.trigger("prepare", {
            content: e
        });
        return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {
            content: i.data
        }), i.data
    }, n.prototype.update = function () {
        for (var e = 0, i = this._pipe.length, s = t.proxy(function (t) {
            return this[t]
        }, this._invalidated), n = {}; i > e;)(this._invalidated.all || t.grep(this._pipe[e].filter, s).length > 0) && this._pipe[e].run(n), e++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, n.prototype.width = function (t) {
        switch (t = t || n.Width.Default) {
            case n.Width.Inner:
            case n.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, n.prototype.refresh = function () {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, n.prototype.onThrottledResize = function () {
        e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, n.prototype.onResize = function () {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.$element.is(":visible") ? (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized"))) : !1 : !1
    }, n.prototype.registerEventHandlers = function () {
        t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
    }, n.prototype.onDragStart = function (e) {
        var s = null;
        3 !== e.which && (t.support.transform ? (s = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), s = {
            x: s[16 === s.length ? 12 : 4],
            y: s[16 === s.length ? 13 : 5]
        }) : (s = this.$stage.position(), s = {
            x: this.settings.rtl ? s.left + this.$stage.width() - this.width() + this.settings.margin : s.left,
            y: s.top
        }), this.is("animating") && (t.support.transform ? this.animate(s.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = s, this._drag.stage.current = s, this._drag.pointer = this.pointer(e), t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(i).one("mousemove.owl.core touchmove.owl.core", t.proxy(function (e) {
            var s = this.difference(this._drag.pointer, this.pointer(e));
            t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(s.x) < Math.abs(s.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, n.prototype.onDragMove = function (t) {
        var e = null,
            i = null,
            s = null,
            n = this.difference(this._drag.pointer, this.pointer(t)),
            o = this.difference(this._drag.stage.start, n);
        this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % i + i) % i + e) : (e = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), s = this.settings.pullDrag ? -1 * n.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + s), i + s)), this._drag.stage.current = o, this.animate(o.x))
    }, n.prototype.onDragEnd = function (e) {
        var s = this.difference(this._drag.pointer, this.pointer(e)),
            n = this._drag.stage.current,
            o = s.x > 0 ^ this.settings.rtl ? "left" : "right";
        t(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== s.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(n.x, 0 !== s.x ? o : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = o, (Math.abs(s.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, n.prototype.closest = function (e, i) {
        var s = -1,
            n = 30,
            o = this.width(),
            r = this.coordinates();
        return this.settings.freeDrag || t.each(r, t.proxy(function (t, a) {
            return e > a - n && a + n > e ? s = t : this.op(e, "<", a) && this.op(e, ">", r[t + 1] || a - o) && (s = "left" === i ? t + 1 : t), -1 === s
        }, this)), this.settings.loop || (this.op(e, ">", r[this.minimum()]) ? s = e = this.minimum() : this.op(e, "<", r[this.maximum()]) && (s = e = this.maximum())), s
    }, n.prototype.animate = function (e) {
        var i = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
            transform: "translate3d(" + e + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : i ? this.$stage.animate({
            left: e + "px"
        }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: e + "px"
        })
    }, n.prototype.is = function (t) {
        return this._states.current[t] && this._states.current[t] > 0
    }, n.prototype.current = function (t) {
        if (t === s) return this._current;
        if (0 === this._items.length) return s;
        if (t = this.normalize(t), this._current !== t) {
            var e = this.trigger("change", {
                property: {
                    name: "position",
                    value: t
                }
            });
            e.data !== s && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, n.prototype.invalidate = function (e) {
        return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function (t, e) {
            return e
        })
    }, n.prototype.reset = function (t) {
        t = this.normalize(t), t !== s && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, n.prototype.normalize = function (e, i) {
        var n = this._items.length,
            o = i ? 0 : this._clones.length;
        return !t.isNumeric(e) || 1 > n ? e = s : (0 > e || e >= n + o) && (e = ((e - o / 2) % n + n) % n + o / 2), e
    }, n.prototype.relative = function (t) {
        return t -= this._clones.length / 2, this.normalize(t, !0)
    }, n.prototype.maximum = function (t) {
        var e, i = this.settings,
            s = this._coordinates.length,
            n = Math.abs(this._coordinates[s - 1]) - this._width,
            o = -1;
        if (i.loop) s = this._clones.length / 2 + this._items.length - 1;
        else if (i.autoWidth || i.merge)
            for (; s - o > 1;) Math.abs(this._coordinates[e = s + o >> 1]) < n ? o = e : s = e;
        else s = i.center ? this._items.length - 1 : this._items.length - i.items;
        return t && (s -= this._clones.length / 2), Math.max(s, 0)
    }, n.prototype.minimum = function (t) {
        return t ? 0 : this._clones.length / 2
    }, n.prototype.items = function (t) {
        return t === s ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, n.prototype.mergers = function (t) {
        return t === s ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, n.prototype.clones = function (e) {
        var i = this._clones.length / 2,
            n = i + this._items.length,
            o = function (t) {
                return t % 2 === 0 ? n + t / 2 : i - (t + 1) / 2
            };
        return e === s ? t.map(this._clones, function (t, e) {
            return o(e)
        }) : t.map(this._clones, function (t, i) {
            return t === e ? o(i) : null
        })
    }, n.prototype.speed = function (t) {
        return t !== s && (this._speed = t), this._speed
    }, n.prototype.coordinates = function (e) {
        var i = null;
        return e === s ? t.map(this._coordinates, t.proxy(function (t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (i = this._coordinates[e], i += (this.width() - i + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[e - 1] || 0, i)
    }, n.prototype.duration = function (t, e, i) {
        return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }, n.prototype.to = function (t, e) {
        var i = this.current(),
            s = null,
            n = t - this.relative(i),
            o = (n > 0) - (0 > n),
            r = this._items.length,
            a = this.minimum(),
            h = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(n) > r / 2 && (n += -1 * o * r), t = i + n, s = ((t - a) % r + r) % r + a, s !== t && h >= s - n && s - n > 0 && (i = s - n, t = s, this.reset(i))) : this.settings.rewind ? (h += 1, t = (t % h + h) % h) : t = Math.max(a, Math.min(h, t)), this.speed(this.duration(i, t, e)), this.current(t), this.$element.is(":visible") && this.update()
    }, n.prototype.next = function (t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, n.prototype.prev = function (t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, n.prototype.onTransitionEnd = function (t) {
        return t !== s && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0)) ? !1 : (this.leave("animating"), void this.trigger("translated"))
    }, n.prototype.viewport = function () {
        var s;
        if (this.options.responsiveBaseElement !== e) s = t(this.options.responsiveBaseElement).width();
        else if (e.innerWidth) s = e.innerWidth;
        else {
            if (!i.documentElement || !i.documentElement.clientWidth) throw "Can not detect viewport width.";
            s = i.documentElement.clientWidth
        }
        return s
    }, n.prototype.replace = function (e) {
        this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function () {
            return 1 === this.nodeType
        }).each(t.proxy(function (t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(t.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, n.prototype.add = function (e, i) {
        var n = this.relative(this._current);
        i = i === s ? this._items.length : this.normalize(i, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
            content: e,
            position: i
        }), e = this.prepare(e), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[i - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this._items[n] && this.reset(this._items[n].index()), this.invalidate("items"), this.trigger("added", {
            content: e,
            position: i
        })
    }, n.prototype.remove = function (t) {
        t = this.normalize(t, !0), t !== s && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, n.prototype.preloadAutoWidthImages = function (e) {
        e.each(t.proxy(function (e, i) {
            this.enter("pre-loading"), i = t(i), t(new Image).one("load", t.proxy(function (t) {
                i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"))
        }, this))
    }, n.prototype.destroy = function () {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), this.settings.responsive !== !1 && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize));
        for (var s in this._plugins) this._plugins[s].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, n.prototype.op = function (t, e, i) {
        var s = this.settings.rtl;
        switch (e) {
            case "<":
                return s ? t > i : i > t;
            case ">":
                return s ? i > t : t > i;
            case ">=":
                return s ? i >= t : t >= i;
            case "<=":
                return s ? t >= i : i >= t
        }
    }, n.prototype.on = function (t, e, i, s) {
        t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
    }, n.prototype.off = function (t, e, i, s) {
        t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
    }, n.prototype.trigger = function (e, i, s, o, r) {
        var a = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            h = t.camelCase(t.grep(["on", e, s], function (t) {
                return t
            }).join("-").toLowerCase()),
            l = t.Event([e, "owl", s || "carousel"].join(".").toLowerCase(), t.extend({
                relatedTarget: this
            }, a, i));
        return this._supress[e] || (t.each(this._plugins, function (t, e) {
            e.onTrigger && e.onTrigger(l)
        }), this.register({
            type: n.Type.Event,
            name: e
        }), this.$element.trigger(l), this.settings && "function" == typeof this.settings[h] && this.settings[h].call(this, l)), l
    }, n.prototype.enter = function (e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
            this._states.current[e] === s && (this._states.current[e] = 0), this._states.current[e]++
        }, this))
    }, n.prototype.leave = function (e) {
        t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
            this._states.current[e]--
        }, this))
    }, n.prototype.register = function (e) {
        if (e.type === n.Type.Event) {
            if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
                var i = t.event.special[e.name]._default;
                t.event.special[e.name]._default = function (t) {
                    return !i || !i.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments)
                }, t.event.special[e.name].owl = !0
            }
        } else e.type === n.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function (i, s) {
            return t.inArray(i, this._states.tags[e.name]) === s
        }, this)))
    }, n.prototype.suppress = function (e) {
        t.each(e, t.proxy(function (t, e) {
            this._supress[e] = !0
        }, this))
    }, n.prototype.release = function (e) {
        t.each(e, t.proxy(function (t, e) {
            delete this._supress[e]
        }, this))
    }, n.prototype.pointer = function (t) {
        var i = {
            x: null,
            y: null
        };
        return t = t.originalEvent || t || e.event, t = t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, t.pageX ? (i.x = t.pageX, i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i
    }, n.prototype.difference = function (t, e) {
        return {
            x: t.x - e.x,
            y: t.y - e.y
        }
    }, t.fn.owlCarousel = function (e) {
        var i = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var s = t(this),
                o = s.data("owl.carousel");
            o || (o = new n(this, "object" == typeof e && e), s.data("owl.carousel", o), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (e, i) {
                o.register({
                    type: n.Type.Event,
                    name: i
                }), o.$element.on(i + ".owl.carousel.core", t.proxy(function (t) {
                    t.namespace && t.relatedTarget !== this && (this.suppress([i]), o[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
                }, o))
            })), "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, i)
        })
    }, t.fn.owlCarousel.Constructor = n
}(window.Zepto || window.jQuery, window, document),
    function (t, e, i, s) {
        var n = function (e) {
            this._core = e, this._interval = null, this._visible = null, this._handlers = {
                "initialized.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.autoRefresh && this.watch()
                }, this)
            }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        n.Defaults = {
            autoRefresh: !0,
            autoRefreshInterval: 500
        }, n.prototype.watch = function () {
            this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
        }, n.prototype.refresh = function () {
            this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
        }, n.prototype.destroy = function () {
            var t, i;
            e.clearInterval(this._interval);
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n
    }(window.Zepto || window.jQuery, window, document),
    function (t, e, i, s) {
        var n = function (e) {
            this._core = e, this._loaded = [], this._handlers = {
                "initialized.owl.carousel change.owl.carousel": t.proxy(function (e) {
                    if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
                        for (var i = this._core.settings, s = i.center && Math.ceil(i.items / 2) || i.items, n = i.center && -1 * s || 0, o = (e.property && e.property.value || this._core.current()) + n, r = this._core.clones().length, a = t.proxy(function (t, e) {
                            this.load(e)
                        }, this); n++ < s;) this.load(r / 2 + this._core.relative(o)), r && t.each(this._core.clones(this._core.relative(o)), a), o++
                }, this)
            }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        n.Defaults = {
            lazyLoad: !1
        }, n.prototype.load = function (i) {
            var s = this._core.$stage.children().eq(i),
                n = s && s.find(".owl-lazy");
            !n || t.inArray(s.get(0), this._loaded) > -1 || (n.each(t.proxy(function (i, s) {
                var n, o = t(s),
                    r = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
                this._core.trigger("load", {
                    element: o,
                    url: r
                }, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function () {
                    o.css("opacity", 1), this._core.trigger("loaded", {
                        element: o,
                        url: r
                    }, "lazy")
                }, this)).attr("src", r) : (n = new Image, n.onload = t.proxy(function () {
                    o.css({
                        "background-image": "url(" + r + ")",
                        opacity: "1"
                    }), this._core.trigger("loaded", {
                        element: o,
                        url: r
                    }, "lazy")
                }, this), n.src = r)
            }, this)), this._loaded.push(s.get(0)))
        }, n.prototype.destroy = function () {
            var t, e;
            for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Lazy = n
    }(window.Zepto || window.jQuery, window, document),
    function (t, e, i, s) {
        var n = function (e) {
            this._core = e, this._handlers = {
                "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.autoHeight && this.update()
                }, this),
                "changed.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
                }, this),
                "loaded.owl.lazy": t.proxy(function (t) {
                    t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
                }, this)
            }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        n.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        }, n.prototype.update = function () {
            var e = this._core._current,
                i = e + this._core.settings.items,
                s = this._core.$stage.children().toArray().slice(e, i);
            heights = [], maxheight = 0, t.each(s, function (e, i) {
                heights.push(t(i).height())
            }), maxheight = Math.max.apply(null, heights), this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass)
        }, n.prototype.destroy = function () {
            var t, e;
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = n
    }(window.Zepto || window.jQuery, window, document),
    function (t, e, i, s) {
        var n = function (e) {
            this._core = e, this._videos = {}, this._playing = null, this._handlers = {
                "initialized.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.register({
                        type: "state",
                        name: "playing",
                        tags: ["interacting"]
                    })
                }, this),
                "resize.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
                }, this),
                "refreshed.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
                }, this),
                "changed.owl.carousel": t.proxy(function (t) {
                    t.namespace && "position" === t.property.name && this._playing && this.stop()
                }, this),
                "prepared.owl.carousel": t.proxy(function (e) {
                    if (e.namespace) {
                        var i = t(e.content).find(".owl-video");
                        i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
                    }
                }, this)
            }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function (t) {
                this.play(t)
            }, this))
        };
        n.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        }, n.prototype.fetch = function (t, e) {
            var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube",
                s = t.attr("data-vimeo-id") || t.attr("data-youtube-id"),
                n = t.attr("data-width") || this._core.settings.videoWidth,
                o = t.attr("data-height") || this._core.settings.videoHeight,
                r = t.attr("href");
            if (!r) throw new Error("Missing video URL.");
            if (s = r.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), s[3].indexOf("youtu") > -1) i = "youtube";
            else {
                if (!(s[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
                i = "vimeo"
            }
            s = s[6], this._videos[r] = {
                type: i,
                id: s,
                width: n,
                height: o
            }, e.attr("data-video", r), this.thumbnail(t, this._videos[r])
        }, n.prototype.thumbnail = function (e, i) {
            var s, n, o, r = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
                a = e.find("img"),
                h = "src",
                l = "",
                c = this._core.settings,
                p = function (t) {
                    n = '<div class="owl-video-play-icon"></div>', s = c.lazyLoad ? '<div class="owl-video-tn ' + l + '" ' + h + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(s), e.after(n)
                };
            return e.wrap('<div class="owl-video-wrapper"' + r + "></div>"), this._core.settings.lazyLoad && (h = "data-src", l = "owl-lazy"), a.length ? (p(a.attr(h)), a.remove(), !1) : void("youtube" === i.type ? (o = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg", p(o)) : "vimeo" === i.type && t.ajax({
                type: "GET",
                url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (t) {
                    o = t[0].thumbnail_large, p(o)
                }
            }))
        }, n.prototype.stop = function () {
            this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
        }, n.prototype.play = function (e) {
            var i, s = t(e.target),
                n = s.closest("." + this._core.settings.itemClass),
                o = this._videos[n.attr("data-video")],
                r = o.width || "100%",
                a = o.height || this._core.$stage.height();
            this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), n = this._core.items(this._core.relative(n.index())), this._core.reset(n.index()), "youtube" === o.type ? i = '<iframe width="' + r + '" height="' + a + '" src="http://www.youtube.com/embed/' + o.id + "?autoplay=1&v=" + o.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === o.type && (i = '<iframe src="http://player.vimeo.com/video/' + o.id + '?autoplay=1" width="' + r + '" height="' + a + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), t('<div class="owl-video-frame">' + i + "</div>").insertAfter(n.find(".owl-video")), this._playing = n.addClass("owl-video-playing"))
        }, n.prototype.isInFullScreen = function () {
            var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
            return e && t(e).parent().hasClass("owl-video-frame")
        }, n.prototype.destroy = function () {
            var t, e;
            this._core.$element.off("click.owl.video");
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Video = n
    }(window.Zepto || window.jQuery, window, document),
    function (t, e, i, s) {
        var n = function (e) {
            this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.swapping = !0, this.previous = s, this.next = s, this.handlers = {
                "change.owl.carousel": t.proxy(function (t) {
                    t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
                }, this),
                "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (t) {
                    t.namespace && (this.swapping = "translated" == t.type)
                }, this),
                "translate.owl.carousel": t.proxy(function (t) {
                    t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                }, this)
            }, this.core.$element.on(this.handlers)
        };
        n.Defaults = {
            animateOut: !1,
            animateIn: !1
        }, n.prototype.swap = function () {
            if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
                this.core.speed(0);
                var e, i = t.proxy(this.clear, this),
                    s = this.core.$stage.children().eq(this.previous),
                    n = this.core.$stage.children().eq(this.next),
                    o = this.core.settings.animateIn,
                    r = this.core.settings.animateOut;
                this.core.current() !== this.previous && (r && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), s.one(t.support.animation.end, i).css({
                    left: e + "px"
                }).addClass("animated owl-animated-out").addClass(r)), o && n.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(o))
            }
        }, n.prototype.clear = function (e) {
            t(e.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
        }, n.prototype.destroy = function () {
            var t, e;
            for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Animate = n
    }(window.Zepto || window.jQuery, window, document),
    function (t, e, i, s) {
        var n = function (e) {
            this._core = e, this._interval = null, this._paused = !1, this._handlers = {
                "changed.owl.carousel": t.proxy(function (t) {
                    t.namespace && "settings" === t.property.name && (this._core.settings.autoplay ? this.play() : this.stop())
                }, this),
                "initialized.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.autoplay && this.play()
                }, this),
                "play.owl.autoplay": t.proxy(function (t, e, i) {
                    t.namespace && this.play(e, i)
                }, this),
                "stop.owl.autoplay": t.proxy(function (t) {
                    t.namespace && this.stop()
                }, this),
                "mouseover.owl.autoplay": t.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this),
                "mouseleave.owl.autoplay": t.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
                }, this)
            }, this._core.$element.on(this._handlers), this._core.options = t.extend({}, n.Defaults, this._core.options)
        };
        n.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        }, n.prototype.play = function (s, n) {
            this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._interval = e.setInterval(t.proxy(function () {
                this._paused || this._core.is("busy") || this._core.is("interacting") || i.hidden || this._core.next(n || this._core.settings.autoplaySpeed)
            }, this), s || this._core.settings.autoplayTimeout))
        }, n.prototype.stop = function () {
            this._core.is("rotating") && (e.clearInterval(this._interval), this._core.leave("rotating"))
        }, n.prototype.pause = function () {
            this._core.is("rotating") && (this._paused = !0)
        }, n.prototype.destroy = function () {
            var t, e;
            this.stop();
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.autoplay = n
    }(window.Zepto || window.jQuery, window, document),
    function (t, e, i, s) {
        "use strict";
        var n = function (e) {
            this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
                next: this._core.next,
                prev: this._core.prev,
                to: this._core.to
            }, this._handlers = {
                "prepared.owl.carousel": t.proxy(function (e) {
                    e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot") + "</div>")
                }, this),
                "added.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
                }, this),
                "remove.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
                }, this),
                "changed.owl.carousel": t.proxy(function (t) {
                    t.namespace && "position" == t.property.name && this.draw()
                }, this),
                "initialized.owl.carousel": t.proxy(function (t) {
                    t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
                }, this),
                "refreshed.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
                }, this)
            }, this._core.options = t.extend({}, n.Defaults, this._core.options), this.$element.on(this._handlers)
        };
        n.Defaults = {
            nav: !1,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1
        }, n.prototype.initialize = function () {
            var e, i = this._core.settings;
            this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function (t) {
                this.prev(i.navSpeed)
            }, this)), this._controls.$next = t("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function (t) {
                this.next(i.navSpeed)
            }, this)), i.dotsData || (this._templates = [t("<div>").addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", t.proxy(function (e) {
                var s = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
                e.preventDefault(), this.to(s, i.dotsSpeed)
            }, this));
            for (e in this._overrides) this._core[e] = t.proxy(this[e], this)
        }, n.prototype.destroy = function () {
            var t, e, i, s;
            for (t in this._handlers) this.$element.off(t, this._handlers[t]);
            for (e in this._controls) this._controls[e].remove();
            for (s in this.overides) this._core[s] = this._overrides[s];
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, n.prototype.update = function () {
            var t, e, i, s = this._core.clones().length / 2,
                n = s + this._core.items().length,
                o = this._core.maximum(!0),
                r = this._core.settings,
                a = r.center || r.autoWidth || r.dotsData ? 1 : r.dotsEach || r.items;
            if ("page" !== r.slideBy && (r.slideBy = Math.min(r.slideBy, r.items)), r.dots || "page" == r.slideBy)
                for (this._pages = [], t = s, e = 0, i = 0; n > t; t++) {
                    if (e >= a || 0 === e) {
                        if (this._pages.push({
                                start: Math.min(o, t - s),
                                end: t - s + a - 1
                            }), Math.min(o, t - s) === o) break;
                        e = 0, ++i
                    }
                    e += this._core.mergers(this._core.relative(t))
                }
        }, n.prototype.draw = function () {
            var e, i = this._core.settings,
                s = this._core.items().length <= i.items,
                n = this._core.relative(this._core.current()),
                o = i.loop || i.rewind;
            this._controls.$relative.toggleClass("disabled", !i.nav || s), i.nav && (this._controls.$previous.toggleClass("disabled", !o && n <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !o && n >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !i.dots || s), i.dots && (e = this._pages.length - this._controls.$absolute.children().length, i.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : 0 > e && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
        }, n.prototype.onTrigger = function (e) {
            var i = this._core.settings;
            e.page = {
                index: t.inArray(this.current(), this._pages),
                count: this._pages.length,
                size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
            }
        }, n.prototype.current = function () {
            var e = this._core.relative(this._core.current());
            return t.grep(this._pages, t.proxy(function (t, i) {
                return t.start <= e && t.end >= e
            }, this)).pop()
        }, n.prototype.getPosition = function (e) {
            var i, s, n = this._core.settings;
            return "page" == n.slideBy ? (i = t.inArray(this.current(), this._pages), s = this._pages.length, e ? ++i : --i, i = this._pages[(i % s + s) % s].start) : (i = this._core.relative(this._core.current()), s = this._core.items().length, e ? i += n.slideBy : i -= n.slideBy), i
        }, n.prototype.next = function (e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
        }, n.prototype.prev = function (e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
        }, n.prototype.to = function (e, i, s) {
            var n;
            s ? t.proxy(this._overrides.to, this._core)(e, i) : (n = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % n + n) % n].start, i))
        }, t.fn.owlCarousel.Constructor.Plugins.Navigation = n
    }(window.Zepto || window.jQuery, window, document),
    function (t, e, i, s) {
        "use strict";
        var n = function (i) {
            this._core = i, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
                "initialized.owl.carousel": t.proxy(function (i) {
                    i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
                }, this),
                "prepared.owl.carousel": t.proxy(function (e) {
                    if (e.namespace) {
                        var i = t(e.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                        if (!i) return;
                        this._hashes[i] = e.content
                    }
                }, this),
                "changed.owl.carousel": t.proxy(function (i) {
                    if (i.namespace && "position" === i.property.name) {
                        var s = this._core.items(this._core.relative(this._core.current())),
                            n = t.map(this._hashes, function (t, e) {
                                return t === s ? e : null
                            }).join();
                        if (!n || e.location.hash.slice(1) === n) return;
                        e.location.hash = n
                    }
                }, this)
            }, this._core.options = t.extend({}, n.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function (t) {
                var i = e.location.hash.substring(1),
                    n = this._core.$stage.children(),
                    o = this._hashes[i] && n.index(this._hashes[i]);
                o !== s && o !== this._core.current() && this._core.to(this._core.relative(o), !1, !0)
            }, this))
        };
        n.Defaults = {
            URLhashListener: !1
        }, n.prototype.destroy = function () {
            var i, s;
            t(e).off("hashchange.owl.navigation");
            for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
            for (s in Object.getOwnPropertyNames(this)) "function" != typeof this[s] && (this[s] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Hash = n
    }(window.Zepto || window.jQuery, window, document),
    function (t, e, i, s) {
        function n(e, i) {
            var n = !1,
                o = e.charAt(0).toUpperCase() + e.slice(1);
            return t.each((e + " " + a.join(o + " ") + o).split(" "), function (t, e) {
                return r[e] !== s ? (n = i ? e : !0, !1) : void 0
            }), n
        }

        function o(t) {
            return n(t, !0)
        }

        var r = t("<support>").get(0).style,
            a = "Webkit Moz O ms".split(" "),
            h = {
                transition: {
                    end: {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        transition: "transitionend"
                    }
                },
                animation: {
                    end: {
                        WebkitAnimation: "webkitAnimationEnd",
                        MozAnimation: "animationend",
                        OAnimation: "oAnimationEnd",
                        animation: "animationend"
                    }
                }
            },
            l = {
                csstransforms: function () {
                    return !!n("transform")
                },
                csstransforms3d: function () {
                    return !!n("perspective")
                },
                csstransitions: function () {
                    return !!n("transition")
                },
                cssanimations: function () {
                    return !!n("animation")
                }
            };
        l.csstransitions() && (t.support.transition = new String(o("transition")), t.support.transition.end = h.transition.end[t.support.transition]), l.cssanimations() && (t.support.animation = new String(o("animation")), t.support.animation.end = h.animation.end[t.support.animation]), l.csstransforms() && (t.support.transform = new String(o("transform")), t.support.transform3d = l.csstransforms3d())
    }(window.Zepto || window.jQuery, window, document);

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function () {
    function e() {
    }

    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t) return n;
        return -1
    }

    function n(e) {
        return function () {
            return this[e].apply(this, arguments)
        }
    }

    var i = e.prototype,
        r = this,
        o = r.EventEmitter;
    i.getListeners = function (e) {
        var t, n, i = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
        } else t = i[e] || (i[e] = []);
        return t
    }, i.flattenListeners = function (e) {
        var t, n = [];
        for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
        return n
    }, i.getListenersAsObject = function (e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, i.addListener = function (e, n) {
        var i, r = this.getListenersAsObject(e),
            o = "object" == typeof n;
        for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
            listener: n,
            once: !1
        });
        return this
    }, i.on = n("addListener"), i.addOnceListener = function (e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        })
    }, i.once = n("addOnceListener"), i.defineEvent = function (e) {
        return this.getListeners(e), this
    }, i.defineEvents = function (e) {
        for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
        return this
    }, i.removeListener = function (e, n) {
        var i, r, o = this.getListenersAsObject(e);
        for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
        return this
    }, i.off = n("removeListener"), i.addListeners = function (e, t) {
        return this.manipulateListeners(!1, e, t)
    }, i.removeListeners = function (e, t) {
        return this.manipulateListeners(!0, e, t)
    }, i.manipulateListeners = function (e, t, n) {
        var i, r, o = e ? this.removeListener : this.addListener,
            s = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (i = n.length; i--;) o.call(this, t, n[i]);
        else
            for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
        return this
    }, i.removeEvent = function (e) {
        var t, n = typeof e,
            i = this._getEvents();
        if ("string" === n) delete i[e];
        else if ("object" === n)
            for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
        else delete this._events;
        return this
    }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) {
        var n, i, r, o, s = this.getListenersAsObject(e);
        for (r in s)
            if (s.hasOwnProperty(r))
                for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, i.trigger = n("emitEvent"), i.emit = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, i.setOnceReturnValue = function (e) {
        return this._onceReturnValue = e, this
    }, i._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, i._getEvents = function () {
        return this._events || (this._events = {})
    }, e.noConflict = function () {
        return r.EventEmitter = o, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this),
    function (e) {
        function t(t) {
            var n = e.event;
            return n.target = n.target || n.srcElement || t, n
        }

        var n = document.documentElement,
            i = function () {
            };
        n.addEventListener ? i = function (e, t, n) {
            e.addEventListener(t, n, !1)
        } : n.attachEvent && (i = function (e, n, i) {
            e[n + i] = i.handleEvent ? function () {
                var n = t(e);
                i.handleEvent.call(i, n)
            } : function () {
                var n = t(e);
                i.call(e, n)
            }, e.attachEvent("on" + n, e[n + i])
        });
        var r = function () {
        };
        n.removeEventListener ? r = function (e, t, n) {
            e.removeEventListener(t, n, !1)
        } : n.detachEvent && (r = function (e, t, n) {
            e.detachEvent("on" + t, e[t + n]);
            try {
                delete e[t + n]
            } catch (i) {
                e[t + n] = void 0
            }
        });
        var o = {
            bind: i,
            unbind: r
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
    }(this),
    function (e, t) {
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) {
            return t(e, n, i)
        }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
    }(window, function (e, t, n) {
        function i(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function r(e) {
            return "[object Array]" === d.call(e)
        }

        function o(e) {
            var t = [];
            if (r(e)) t = e;
            else if ("number" == typeof e.length)
                for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
            else t.push(e);
            return t
        }

        function s(e, t, n) {
            if (!(this instanceof s)) return new s(e, t);
            "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
            var r = this;
            setTimeout(function () {
                r.check()
            })
        }

        function f(e) {
            this.img = e
        }

        function c(e) {
            this.src = e, v[e] = this
        }

        var a = e.jQuery,
            u = e.console,
            h = "undefined" != typeof u,
            d = Object.prototype.toString;
        s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
            this.images = [];
            for (var e = 0, t = this.elements.length; t > e; e++) {
                var n = this.elements[e];
                "IMG" === n.nodeName && this.addImage(n);
                var i = n.nodeType;
                if (i && (1 === i || 9 === i || 11 === i))
                    for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
                        var f = r[o];
                        this.addImage(f)
                    }
            }
        }, s.prototype.addImage = function (e) {
            var t = new f(e);
            this.images.push(t)
        }, s.prototype.check = function () {
            function e(e, r) {
                return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
            }

            var t = this,
                n = 0,
                i = this.images.length;
            if (this.hasAnyBroken = !1, !i) return void this.complete();
            for (var r = 0; i > r; r++) {
                var o = this.images[r];
                o.on("confirm", e), o.check()
            }
        }, s.prototype.progress = function (e) {
            this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
            var t = this;
            setTimeout(function () {
                t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
            })
        }, s.prototype.complete = function () {
            var e = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = !0;
            var t = this;
            setTimeout(function () {
                if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                    var n = t.hasAnyBroken ? "reject" : "resolve";
                    t.jqDeferred[n](t)
                }
            })
        }, a && (a.fn.imagesLoaded = function (e, t) {
            var n = new s(this, e, t);
            return n.jqDeferred.promise(a(this))
        }), f.prototype = new t, f.prototype.check = function () {
            var e = v[this.img.src] || new c(this.img.src);
            if (e.isConfirmed) return void this.confirm(e.isLoaded, "cached was confirmed");
            if (this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
            var t = this;
            e.on("confirm", function (e, n) {
                return t.confirm(e.isLoaded, n), !0
            }), e.check()
        }, f.prototype.confirm = function (e, t) {
            this.isLoaded = e, this.emit("confirm", this, t)
        };
        var v = {};
        return c.prototype = new t, c.prototype.check = function () {
            if (!this.isChecked) {
                var e = new Image;
                n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
            }
        }, c.prototype.handleEvent = function (e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, c.prototype.onload = function (e) {
            this.confirm(!0, "onload"), this.unbindProxyEvents(e)
        }, c.prototype.onerror = function (e) {
            this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
        }, c.prototype.confirm = function (e, t) {
            this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
        }, c.prototype.unbindProxyEvents = function (e) {
            n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
        }, s
    });

/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */

!function (t) {
    t.extend(t.fn, {
        validate: function (e) {
            if (!this.length) return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var r = t.data(this[0], "validator");
            return r ? r : (this.attr("novalidate", "novalidate"), r = new t.validator(e, this[0]), t.data(this[0], "validator", r), r.settings.onsubmit && (this.validateDelegate(":submit", "click", function (e) {
                r.settings.submitHandler && (r.submitButton = e.target), t(e.target).hasClass("cancel") && (r.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (r.cancelSubmit = !0)
            }), this.submit(function (e) {
                function a() {
                    var a;
                    return r.settings.submitHandler ? (r.submitButton && (a = t("<input type='hidden'/>").attr("name", r.submitButton.name).val(t(r.submitButton).val()).appendTo(r.currentForm)), r.settings.submitHandler.call(r, r.currentForm, e), r.submitButton && a.remove(), !1) : !0
                }

                return r.settings.debug && e.preventDefault(), r.cancelSubmit ? (r.cancelSubmit = !1, a()) : r.form() ? r.pendingRequest ? (r.formSubmitted = !0, !1) : a() : (r.focusInvalid(), !1)
            })), r)
        },
        valid: function () {
            if (t(this[0]).is("form")) return this.validate().form();
            var e = !0,
                r = t(this[0].form).validate();
            return this.each(function () {
                e = e && r.element(this)
            }), e
        },
        removeAttrs: function (e) {
            var r = {},
                a = this;
            return t.each(e.split(/\s/), function (t, e) {
                r[e] = a.attr(e), a.removeAttr(e)
            }), r
        },
        rules: function (e, r) {
            var a = this[0];
            if (e) {
                var i = t.data(a.form, "validator").settings,
                    n = i.rules,
                    s = t.validator.staticRules(a);
                switch (e) {
                    case "add":
                        t.extend(s, t.validator.normalizeRule(r)), delete s.messages, n[a.name] = s, r.messages && (i.messages[a.name] = t.extend(i.messages[a.name], r.messages));
                        break;
                    case "remove":
                        if (!r) return delete n[a.name], s;
                        var o = {};
                        return t.each(r.split(/\s/), function (t, e) {
                            o[e] = s[e], delete s[e]
                        }), o
                }
            }
            var u = t.validator.normalizeRules(t.extend({}, t.validator.classRules(a), t.validator.attributeRules(a), t.validator.dataRules(a), t.validator.staticRules(a)), a);
            if (u.required) {
                var l = u.required;
                delete u.required, u = t.extend({
                    required: l
                }, u)
            }
            return u
        }
    }), t.extend(t.expr[":"], {
        blank: function (e) {
            return !t.trim("" + t(e).val())
        },
        filled: function (e) {
            return !!t.trim("" + t(e).val())
        },
        unchecked: function (e) {
            return !t(e).prop("checked")
        }
    }), t.validator = function (e, r) {
        this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = r, this.init()
    }, t.validator.format = function (e, r) {
        return 1 === arguments.length ? function () {
            var r = t.makeArray(arguments);
            return r.unshift(e), t.validator.format.apply(this, r)
        } : (arguments.length > 2 && r.constructor !== Array && (r = t.makeArray(arguments).slice(1)), r.constructor !== Array && (r = [r]), t.each(r, function (t, r) {
            e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function () {
                return r
            })
        }), e)
    }, t.extend(t.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: t([]),
            errorLabelContainer: t([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function (t, e) {
                this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
            },
            onfocusout: function (t, e) {
                this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
            },
            onkeyup: function (t, e) {
                (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
            },
            onclick: function (t, e) {
                t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
            },
            highlight: function (e, r, a) {
                "radio" === e.type ? this.findByName(e.name).addClass(r).removeClass(a) : t(e).addClass(r).removeClass(a)
            },
            unhighlight: function (e, r, a) {
                "radio" === e.type ? this.findByName(e.name).removeClass(r).addClass(a) : t(e).removeClass(r).addClass(a)
            }
        },
        setDefaults: function (e) {
            t.extend(t.validator.defaults, e)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: t.validator.format("Please enter no more than {0} characters."),
            minlength: t.validator.format("Please enter at least {0} characters."),
            rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
            range: t.validator.format("Please enter a value between {0} and {1}."),
            max: t.validator.format("Please enter a value less than or equal to {0}."),
            min: t.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function () {
                function e(e) {
                    var r = t.data(this[0].form, "validator"),
                        a = "on" + e.type.replace(/^validate/, "");
                    r.settings[a] && r.settings[a].call(r, this[0], e)
                }

                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var r = this.groups = {};
                t.each(this.settings.groups, function (e, a) {
                    "string" == typeof a && (a = a.split(/\s/)), t.each(a, function (t, a) {
                        r[a] = e
                    })
                });
                var a = this.settings.rules;
                t.each(a, function (e, r) {
                    a[e] = t.validator.normalizeRule(r)
                }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function () {
                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function () {
                this.prepareForm();
                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                return this.valid()
            },
            element: function (e) {
                e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
                var r = this.check(e) !== !1;
                return r ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), r
            },
            showErrors: function (e) {
                if (e) {
                    t.extend(this.errorMap, e), this.errorList = [];
                    for (var r in e) this.errorList.push({
                        message: e[r],
                        element: this.findByName(r)[0]
                    });
                    this.successList = t.grep(this.successList, function (t) {
                        return !(t.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function () {
                t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            },
            objectLength: function (t) {
                var e = 0;
                for (var r in t) e++;
                return e
            },
            hideErrors: function () {
                this.addWrapper(this.toHide).hide()
            },
            valid: function () {
                return 0 === this.size()
            },
            size: function () {
                return this.errorList.length
            },
            focusInvalid: function () {
                if (this.settings.focusInvalid) try {
                    t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (e) {
                }
            },
            findLastActive: function () {
                var e = this.lastActive;
                return e && 1 === t.grep(this.errorList, function (t) {
                        return t.element.name === e.name
                    }).length && e
            },
            elements: function () {
                var e = this,
                    r = {};
                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                    return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in r || !e.objectLength(t(this).rules()) ? !1 : (r[this.name] = !0, !0)
                })
            },
            clean: function (e) {
                return t(e)[0]
            },
            errors: function () {
                var e = this.settings.errorClass.replace(" ", ".");
                return t(this.settings.errorElement + "." + e, this.errorContext)
            },
            reset: function () {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
            },
            prepareForm: function () {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function (t) {
                this.reset(), this.toHide = this.errorsFor(t)
            },
            elementValue: function (e) {
                var r = t(e).attr("type"),
                    a = t(e).val();
                return "radio" === r || "checkbox" === r ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof a ? a.replace(/\r/g, "") : a
            },
            check: function (e) {
                e = this.validationTargetFor(this.clean(e));
                var r, a = t(e).rules(),
                    i = !1,
                    n = this.elementValue(e);
                for (var s in a) {
                    var o = {
                        method: s,
                        parameters: a[s]
                    };
                    try {
                        if (r = t.validator.methods[s].call(this, n, e, o.parameters), "dependency-mismatch" === r) {
                            i = !0;
                            continue
                        }
                        if (i = !1, "pending" === r) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                        if (!r) return this.formatAndAdd(e, o), !1
                    } catch (u) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + o.method + "' method.", u), u
                    }
                }
                return i ? void 0 : (this.objectLength(a) && this.successList.push(e), !0)
            },
            customDataMessage: function (e, r) {
                return t(e).data("msg-" + r.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + r.toLowerCase())
            },
            customMessage: function (t, e) {
                var r = this.settings.messages[t];
                return r && (r.constructor === String ? r : r[e])
            },
            findDefined: function () {
                for (var t = 0; t < arguments.length; t++)
                    if (void 0 !== arguments[t]) return arguments[t];
                return void 0
            },
            defaultMessage: function (e, r) {
                return this.findDefined(this.customMessage(e.name, r), this.customDataMessage(e, r), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[r], "<strong>Warning: No message defined for " + e.name + "</strong>")
            },
            formatAndAdd: function (e, r) {
                var a = this.defaultMessage(e, r.method),
                    i = /\$?\{(\d+)\}/g;
                "function" == typeof a ? a = a.call(this, r.parameters, e) : i.test(a) && (a = t.validator.format(a.replace(i, "{$1}"), r.parameters)), this.errorList.push({
                    message: a,
                    element: e
                }), this.errorMap[e.name] = a, this.submitted[e.name] = a
            },
            addWrapper: function (t) {
                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            },
            defaultShowErrors: function () {
                var t, e;
                for (t = 0; this.errorList[t]; t++) {
                    var r = this.errorList[t];
                    this.settings.highlight && this.settings.highlight.call(this, r.element, this.settings.errorClass, this.settings.validClass), this.showLabel(r.element, r.message)
                }
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                if (this.settings.unhighlight)
                    for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function () {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function () {
                return t(this.errorList).map(function () {
                    return this.element
                })
            },
            showLabel: function (e, r) {
                var a = this.errorsFor(e);
                a.length ? (a.removeClass(this.settings.validClass).addClass(this.settings.errorClass), a.html(r)) : (a = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(r || ""), this.settings.wrapper && (a = a.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(a).length || (this.settings.errorPlacement ? this.settings.errorPlacement(a, t(e)) : a.insertAfter(e))), !r && this.settings.success && (a.text(""), "string" == typeof this.settings.success ? a.addClass(this.settings.success) : this.settings.success(a, e)), this.toShow = this.toShow.add(a)
            },
            errorsFor: function (e) {
                var r = this.idOrName(e);
                return this.errors().filter(function () {
                    return t(this).attr("for") === r
                })
            },
            idOrName: function (t) {
                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            },
            validationTargetFor: function (t) {
                return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
            },
            checkable: function (t) {
                return /radio|checkbox/i.test(t.type)
            },
            findByName: function (e) {
                return t(this.currentForm).find("[name='" + e + "']")
            },
            getLength: function (e, r) {
                switch (r.nodeName.toLowerCase()) {
                    case "select":
                        return t("option:selected", r).length;
                    case "input":
                        if (this.checkable(r)) return this.findByName(r.name).filter(":checked").length
                }
                return e.length
            },
            depend: function (t, e) {
                return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
            },
            dependTypes: {
                "boolean": function (t, e) {
                    return t
                },
                string: function (e, r) {
                    return !!t(e, r.form).length
                },
                "function": function (t, e) {
                    return t(e)
                }
            },
            optional: function (e) {
                var r = this.elementValue(e);
                return !t.validator.methods.required.call(this, r, e) && "dependency-mismatch"
            },
            startRequest: function (t) {
                this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
            },
            stopRequest: function (e, r) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], r && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !r && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function (e) {
                return t.data(e, "previousValue") || t.data(e, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(e, "remote")
                    })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function (e, r) {
            e.constructor === String ? this.classRuleSettings[e] = r : t.extend(this.classRuleSettings, e)
        },
        classRules: function (e) {
            var r = {},
                a = t(e).attr("class");
            return a && t.each(a.split(" "), function () {
                this in t.validator.classRuleSettings && t.extend(r, t.validator.classRuleSettings[this])
            }), r
        },
        attributeRules: function (e) {
            var r = {},
                a = t(e),
                i = a[0].getAttribute("type");
            for (var n in t.validator.methods) {
                var s;
                "required" === n ? (s = a.get(0).getAttribute(n), "" === s && (s = !0), s = !!s) : s = a.attr(n), /min|max/.test(n) && (null === i || /number|range|text/.test(i)) && (s = Number(s)), s ? r[n] = s : i === n && "range" !== i && (r[n] = !0)
            }
            return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r
        },
        dataRules: function (e) {
            var r, a, i = {},
                n = t(e);
            for (r in t.validator.methods) a = n.data("rule-" + r.toLowerCase()), void 0 !== a && (i[r] = a);
            return i
        },
        staticRules: function (e) {
            var r = {},
                a = t.data(e.form, "validator");
            return a.settings.rules && (r = t.validator.normalizeRule(a.settings.rules[e.name]) || {}), r
        },
        normalizeRules: function (e, r) {
            return t.each(e, function (a, i) {
                if (i === !1) return void delete e[a];
                if (i.param || i.depends) {
                    var n = !0;
                    switch (typeof i.depends) {
                        case "string":
                            n = !!t(i.depends, r.form).length;
                            break;
                        case "function":
                            n = i.depends.call(r, r)
                    }
                    n ? e[a] = void 0 !== i.param ? i.param : !0 : delete e[a]
                }
            }), t.each(e, function (a, i) {
                e[a] = t.isFunction(i) ? i(r) : i
            }), t.each(["minlength", "maxlength"], function () {
                e[this] && (e[this] = Number(e[this]))
            }), t.each(["rangelength", "range"], function () {
                var r;
                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (r = e[this].split(/[\s,]+/), e[this] = [Number(r[0]), Number(r[1])]))
            }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
        },
        normalizeRule: function (e) {
            if ("string" == typeof e) {
                var r = {};
                t.each(e.split(/\s/), function () {
                    r[this] = !0
                }), e = r
            }
            return e
        },
        addMethod: function (e, r, a) {
            t.validator.methods[e] = r, t.validator.messages[e] = void 0 !== a ? a : t.validator.messages[e], r.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        },
        methods: {
            required: function (e, r, a) {
                if (!this.depend(a, r)) return "dependency-mismatch";
                if ("select" === r.nodeName.toLowerCase()) {
                    var i = t(r).val();
                    return i && i.length > 0
                }
                return this.checkable(r) ? this.getLength(e, r) > 0 : t.trim(e).length > 0
            },
            email: function (t, e) {
                return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
            },
            url: function (t, e) {
                return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
            },
            date: function (t, e) {
                return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
            },
            dateISO: function (t, e) {
                return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
            },
            number: function (t, e) {
                return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            },
            digits: function (t, e) {
                return this.optional(e) || /^\d+$/.test(t)
            },
            creditcard: function (t, e) {
                if (this.optional(e)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(t)) return !1;
                var r = 0,
                    a = 0,
                    i = !1;
                t = t.replace(/\D/g, "");
                for (var n = t.length - 1; n >= 0; n--) {
                    var s = t.charAt(n);
                    a = parseInt(s, 10), i && (a *= 2) > 9 && (a -= 9), r += a, i = !i
                }
                return r % 10 === 0
            },
            minlength: function (e, r, a) {
                var i = t.isArray(e) ? e.length : this.getLength(t.trim(e), r);
                return this.optional(r) || i >= a
            },
            maxlength: function (e, r, a) {
                var i = t.isArray(e) ? e.length : this.getLength(t.trim(e), r);
                return this.optional(r) || a >= i
            },
            rangelength: function (e, r, a) {
                var i = t.isArray(e) ? e.length : this.getLength(t.trim(e), r);
                return this.optional(r) || i >= a[0] && i <= a[1]
            },
            min: function (t, e, r) {
                return this.optional(e) || t >= r
            },
            max: function (t, e, r) {
                return this.optional(e) || r >= t
            },
            range: function (t, e, r) {
                return this.optional(e) || t >= r[0] && t <= r[1]
            },
            equalTo: function (e, r, a) {
                var i = t(a);
                return this.settings.onfocusout && i.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                    t(r).valid()
                }), e === i.val()
            },
            remote: function (e, r, a) {
                if (this.optional(r)) return "dependency-mismatch";
                var i = this.previousValue(r);
                if (this.settings.messages[r.name] || (this.settings.messages[r.name] = {}), i.originalMessage = this.settings.messages[r.name].remote, this.settings.messages[r.name].remote = i.message, a = "string" == typeof a && {
                            url: a
                        } || a, i.old === e) return i.valid;
                i.old = e;
                var n = this;
                this.startRequest(r);
                var s = {};
                return s[r.name] = e, t.ajax(t.extend(!0, {
                    url: a,
                    mode: "abort",
                    port: "validate" + r.name,
                    dataType: "json",
                    data: s,
                    success: function (a) {
                        n.settings.messages[r.name].remote = i.originalMessage;
                        var s = a === !0 || "true" === a;
                        if (s) {
                            var o = n.formSubmitted;
                            n.prepareElement(r), n.formSubmitted = o, n.successList.push(r), delete n.invalid[r.name], n.showErrors()
                        } else {
                            var u = {},
                                l = a || n.defaultMessage(r, "remote");
                            u[r.name] = i.message = t.isFunction(l) ? l(e) : l, n.invalid[r.name] = !0, n.showErrors(u)
                        }
                        i.valid = s, n.stopRequest(r, s)
                    }
                }, a)), "pending"
            }
        }
    }), t.format = t.validator.format
}(jQuery),
    function (t) {
        var e = {};
        if (t.ajaxPrefilter) t.ajaxPrefilter(function (t, r, a) {
            var i = t.port;
            "abort" === t.mode && (e[i] && e[i].abort(), e[i] = a)
        });
        else {
            var r = t.ajax;
            t.ajax = function (a) {
                var i = ("mode" in a ? a : t.ajaxSettings).mode,
                    n = ("port" in a ? a : t.ajaxSettings).port;
                return "abort" === i ? (e[n] && e[n].abort(), e[n] = r.apply(this, arguments), e[n]) : r.apply(this, arguments)
            }
        }
    }(jQuery),
    function (t) {
        t.extend(t.fn, {
            validateDelegate: function (e, r, a) {
                return this.bind(r, function (r) {
                    var i = t(r.target);
                    return i.is(e) ? a.apply(i, arguments) : void 0
                })
            }
        })
    }(jQuery);

/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */

!function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("undefined" != typeof jQuery ? jQuery : window.Zepto)
}(function (e) {
    "use strict";

    function t(t) {
        var r = t.data;
        t.isDefaultPrevented() || (t.preventDefault(), e(t.target).ajaxSubmit(r))
    }

    function r(t) {
        var r = t.target,
            a = e(r);
        if (!a.is("[type=submit],[type=image]")) {
            var n = a.closest("[type=submit]");
            if (0 === n.length) return;
            r = n[0]
        }
        var i = this;
        if (i.clk = r, "image" == r.type)
            if (void 0 !== t.offsetX) i.clk_x = t.offsetX, i.clk_y = t.offsetY;
            else if ("function" == typeof e.fn.offset) {
                var o = a.offset();
                i.clk_x = t.pageX - o.left, i.clk_y = t.pageY - o.top
            } else i.clk_x = t.pageX - r.offsetLeft, i.clk_y = t.pageY - r.offsetTop;
        setTimeout(function () {
            i.clk = i.clk_x = i.clk_y = null
        }, 100)
    }

    function a() {
        if (e.fn.ajaxSubmit.debug) {
            var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t)
        }
    }

    var n = {};
    n.fileapi = void 0 !== e("<input type='file'/>").get(0).files, n.formdata = void 0 !== window.FormData;
    var i = !!e.fn.prop;
    e.fn.attr2 = function () {
        if (!i) return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
    }, e.fn.ajaxSubmit = function (t) {
        function r(r) {
            var a, n, i = e.param(r, t.traditional).split("&"),
                o = i.length,
                s = [];
            for (a = 0; o > a; a++) i[a] = i[a].replace(/\+/g, " "), n = i[a].split("="), s.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
            return s
        }

        function o(a) {
            for (var n = new FormData, i = 0; i < a.length; i++) n.append(a[i].name, a[i].value);
            if (t.extraData) {
                var o = r(t.extraData);
                for (i = 0; i < o.length; i++) o[i] && n.append(o[i][0], o[i][1])
            }
            t.data = null;
            var s = e.extend(!0, {}, e.ajaxSettings, t, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: u || "POST"
            });
            t.uploadProgress && (s.xhr = function () {
                var r = e.ajaxSettings.xhr();
                return r.upload && r.upload.addEventListener("progress", function (e) {
                    var r = 0,
                        a = e.loaded || e.position,
                        n = e.total;
                    e.lengthComputable && (r = Math.ceil(a / n * 100)), t.uploadProgress(e, a, n, r)
                }, !1), r
            }), s.data = null;
            var c = s.beforeSend;
            return s.beforeSend = function (e, r) {
                t.formData ? r.data = t.formData : r.data = n, c && c.call(this, e, r)
            }, e.ajax(s)
        }

        function s(r) {
            function n(e) {
                var t = null;
                try {
                    e.contentWindow && (t = e.contentWindow.document)
                } catch (r) {
                    a("cannot get iframe.contentWindow document: " + r)
                }
                if (t) return t;
                try {
                    t = e.contentDocument ? e.contentDocument : e.document
                } catch (r) {
                    a("cannot get iframe.contentDocument: " + r), t = e.document
                }
                return t
            }

            function o() {
                function t() {
                    try {
                        var e = n(g).readyState;
                        a("state = " + e), e && "uninitialized" == e.toLowerCase() && setTimeout(t, 50)
                    } catch (r) {
                        a("Server abort: ", r, " (", r.name, ")"), s(k), j && clearTimeout(j), j = void 0
                    }
                }

                var r = f.attr2("target"),
                    i = f.attr2("action"),
                    o = "multipart/form-data",
                    c = f.attr("enctype") || f.attr("encoding") || o;
                w.setAttribute("target", p), (!u || /post/i.test(u)) && w.setAttribute("method", "POST"), i != m.url && w.setAttribute("action", m.url), m.skipEncodingOverride || u && !/post/i.test(u) || f.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), m.timeout && (j = setTimeout(function () {
                    T = !0, s(D)
                }, m.timeout));
                var l = [];
                try {
                    if (m.extraData)
                        for (var d in m.extraData) m.extraData.hasOwnProperty(d) && l.push(e.isPlainObject(m.extraData[d]) && m.extraData[d].hasOwnProperty("name") && m.extraData[d].hasOwnProperty("value") ? e('<input type="hidden" name="' + m.extraData[d].name + '">').val(m.extraData[d].value).appendTo(w)[0] : e('<input type="hidden" name="' + d + '">').val(m.extraData[d]).appendTo(w)[0]);
                    m.iframeTarget || v.appendTo("body"), g.attachEvent ? g.attachEvent("onload", s) : g.addEventListener("load", s, !1), setTimeout(t, 15);
                    try {
                        w.submit()
                    } catch (h) {
                        var x = document.createElement("form").submit;
                        x.apply(w)
                    }
                } finally {
                    w.setAttribute("action", i), w.setAttribute("enctype", c), r ? w.setAttribute("target", r) : f.removeAttr("target"), e(l).remove()
                }
            }

            function s(t) {
                if (!x.aborted && !F) {
                    if (M = n(g), M || (a("cannot access response document"), t = k), t === D && x) return x.abort("timeout"), void S.reject(x, "timeout");
                    if (t == k && x) return x.abort("server abort"), void S.reject(x, "error", "server abort");
                    if (M && M.location.href != m.iframeSrc || T) {
                        g.detachEvent ? g.detachEvent("onload", s) : g.removeEventListener("load", s, !1);
                        var r, i = "success";
                        try {
                            if (T) throw "timeout";
                            var o = "xml" == m.dataType || M.XMLDocument || e.isXMLDoc(M);
                            if (a("isXml=" + o), !o && window.opera && (null === M.body || !M.body.innerHTML) && --O) return a("requeing onLoad callback, DOM not available"), void setTimeout(s, 250);
                            var u = M.body ? M.body : M.documentElement;
                            x.responseText = u ? u.innerHTML : null, x.responseXML = M.XMLDocument ? M.XMLDocument : M, o && (m.dataType = "xml"), x.getResponseHeader = function (e) {
                                var t = {
                                    "content-type": m.dataType
                                };
                                return t[e.toLowerCase()]
                            }, u && (x.status = Number(u.getAttribute("status")) || x.status, x.statusText = u.getAttribute("statusText") || x.statusText);
                            var c = (m.dataType || "").toLowerCase(),
                                l = /(json|script|text)/.test(c);
                            if (l || m.textarea) {
                                var f = M.getElementsByTagName("textarea")[0];
                                if (f) x.responseText = f.value, x.status = Number(f.getAttribute("status")) || x.status, x.statusText = f.getAttribute("statusText") || x.statusText;
                                else if (l) {
                                    var p = M.getElementsByTagName("pre")[0],
                                        h = M.getElementsByTagName("body")[0];
                                    p ? x.responseText = p.textContent ? p.textContent : p.innerText : h && (x.responseText = h.textContent ? h.textContent : h.innerText)
                                }
                            } else "xml" == c && !x.responseXML && x.responseText && (x.responseXML = X(x.responseText));
                            try {
                                E = _(x, c, m)
                            } catch (y) {
                                i = "parsererror", x.error = r = y || i
                            }
                        } catch (y) {
                            a("error caught: ", y), i = "error", x.error = r = y || i
                        }
                        x.aborted && (a("upload aborted"), i = null), x.status && (i = x.status >= 200 && x.status < 300 || 304 === x.status ? "success" : "error"), "success" === i ? (m.success && m.success.call(m.context, E, "success", x), S.resolve(x.responseText, "success", x), d && e.event.trigger("ajaxSuccess", [x, m])) : i && (void 0 === r && (r = x.statusText), m.error && m.error.call(m.context, x, i, r), S.reject(x, "error", r), d && e.event.trigger("ajaxError", [x, m, r])), d && e.event.trigger("ajaxComplete", [x, m]), d && !--e.active && e.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, x, i), F = !0, m.timeout && clearTimeout(j), setTimeout(function () {
                            m.iframeTarget ? v.attr("src", m.iframeSrc) : v.remove(), x.responseXML = null
                        }, 100)
                    }
                }
            }

            var c, l, m, d, p, v, g, x, y, b, T, j, w = f[0],
                S = e.Deferred();
            if (S.abort = function (e) {
                    x.abort(e)
                }, r)
                for (l = 0; l < h.length; l++) c = e(h[l]), i ? c.prop("disabled", !1) : c.removeAttr("disabled");
            if (m = e.extend(!0, {}, e.ajaxSettings, t), m.context = m.context || m, p = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (v = e(m.iframeTarget), b = v.attr2("name"), b ? p = b : v.attr2("name", p)) : (v = e('<iframe name="' + p + '" src="' + m.iframeSrc + '" />'), v.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })), g = v[0], x = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function () {
                    },
                    getResponseHeader: function () {
                    },
                    setRequestHeader: function () {
                    },
                    abort: function (t) {
                        var r = "timeout" === t ? "timeout" : "aborted";
                        a("aborting upload... " + r), this.aborted = 1;
                        try {
                            g.contentWindow.document.execCommand && g.contentWindow.document.execCommand("Stop")
                        } catch (n) {
                        }
                        v.attr("src", m.iframeSrc), x.error = r, m.error && m.error.call(m.context, x, r, t), d && e.event.trigger("ajaxError", [x, m, r]), m.complete && m.complete.call(m.context, x, r)
                    }
                }, d = m.global, d && 0 === e.active++ && e.event.trigger("ajaxStart"), d && e.event.trigger("ajaxSend", [x, m]), m.beforeSend && m.beforeSend.call(m.context, x, m) === !1) return m.global && e.active--, S.reject(), S;
            if (x.aborted) return S.reject(), S;
            y = w.clk, y && (b = y.name, b && !y.disabled && (m.extraData = m.extraData || {}, m.extraData[b] = y.value, "image" == y.type && (m.extraData[b + ".x"] = w.clk_x, m.extraData[b + ".y"] = w.clk_y)));
            var D = 1,
                k = 2,
                A = e("meta[name=csrf-token]").attr("content"),
                L = e("meta[name=csrf-param]").attr("content");
            L && A && (m.extraData = m.extraData || {}, m.extraData[L] = A), m.forceSync ? o() : setTimeout(o, 10);
            var E, M, F, O = 50,
                X = e.parseXML || function (e, t) {
                        return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.nodeName ? t : null
                    },
                C = e.parseJSON || function (e) {
                        return window.eval("(" + e + ")")
                    },
                _ = function (t, r, a) {
                    var n = t.getResponseHeader("content-type") || "",
                        i = "xml" === r || !r && n.indexOf("xml") >= 0,
                        o = i ? t.responseXML : t.responseText;
                    return i && "parsererror" === o.documentElement.nodeName && e.error && e.error("parsererror"), a && a.dataFilter && (o = a.dataFilter(o, r)), "string" == typeof o && ("json" === r || !r && n.indexOf("json") >= 0 ? o = C(o) : ("script" === r || !r && n.indexOf("javascript") >= 0) && e.globalEval(o)), o
                };
            return S
        }

        if (!this.length) return a("ajaxSubmit: skipping submit process - no element selected"), this;
        var u, c, l, f = this;
        "function" == typeof t ? t = {
            success: t
        } : void 0 === t && (t = {}), u = t.type || this.attr2("method"), c = t.url || this.attr2("action"), l = "string" == typeof c ? e.trim(c) : "", l = l || window.location.href || "", l && (l = (l.match(/^([^#]+)/) || [])[1]), t = e.extend(!0, {
            url: l,
            success: e.ajaxSettings.success,
            type: u || e.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, t);
        var m = {};
        if (this.trigger("form-pre-serialize", [this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (t.beforeSerialize && t.beforeSerialize(this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var d = t.traditional;
        void 0 === d && (d = e.ajaxSettings.traditional);
        var p, h = [],
            v = this.formToArray(t.semantic, h);
        if (t.data && (t.extraData = t.data, p = e.param(t.data, d)), t.beforeSubmit && t.beforeSubmit(v, this, t) === !1) return a("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [v, this, t, m]), m.veto) return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var g = e.param(v, d);
        p && (g = g ? g + "&" + p : p), "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + g, t.data = null) : t.data = g;
        var x = [];
        if (t.resetForm && x.push(function () {
                f.resetForm()
            }), t.clearForm && x.push(function () {
                f.clearForm(t.includeHidden)
            }), !t.dataType && t.target) {
            var y = t.success || function () {
                };
            x.push(function (r) {
                var a = t.replaceTarget ? "replaceWith" : "html";
                e(t.target)[a](r).each(y, arguments)
            })
        } else t.success && x.push(t.success);
        if (t.success = function (e, r, a) {
                for (var n = t.context || this, i = 0, o = x.length; o > i; i++) x[i].apply(n, [e, r, a || f, f])
            }, t.error) {
            var b = t.error;
            t.error = function (e, r, a) {
                var n = t.context || this;
                b.apply(n, [e, r, a, f])
            }
        }
        if (t.complete) {
            var T = t.complete;
            t.complete = function (e, r) {
                var a = t.context || this;
                T.apply(a, [e, r, f])
            }
        }
        var j = e("input[type=file]:enabled", this).filter(function () {
                return "" !== e(this).val()
            }),
            w = j.length > 0,
            S = "multipart/form-data",
            D = f.attr("enctype") == S || f.attr("encoding") == S,
            k = n.fileapi && n.formdata;
        a("fileAPI :" + k);
        var A, L = (w || D) && !k;
        t.iframe !== !1 && (t.iframe || L) ? t.closeKeepAlive ? e.get(t.closeKeepAlive, function () {
            A = s(v)
        }) : A = s(v) : A = (w || D) && k ? o(v) : e.ajax(t), f.removeData("jqxhr").data("jqxhr", A);
        for (var E = 0; E < h.length; E++) h[E] = null;
        return this.trigger("form-submit-notify", [this, t]), this
    }, e.fn.ajaxForm = function (n) {
        if (n = n || {}, n.delegation = n.delegation && e.isFunction(e.fn.on), !n.delegation && 0 === this.length) {
            var i = {
                s: this.selector,
                c: this.context
            };
            return !e.isReady && i.s ? (a("DOM not ready, queuing ajaxForm"), e(function () {
                e(i.s, i.c).ajaxForm(n)
            }), this) : (a("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)")), this)
        }
        return n.delegation ? (e(document).off("submit.form-plugin", this.selector, t).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, n, t).on("click.form-plugin", this.selector, n, r), this) : this.ajaxFormUnbind().bind("submit.form-plugin", n, t).bind("click.form-plugin", n, r)
    }, e.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin")
    }, e.fn.formToArray = function (t, r) {
        var a = [];
        if (0 === this.length) return a;
        var i, o = this[0],
            s = this.attr("id"),
            u = t ? o.getElementsByTagName("*") : o.elements;
        if (u && !/MSIE [678]/.test(navigator.userAgent) && (u = e(u).get()), s && (i = e(':input[form="' + s + '"]').get(), i.length && (u = (u || []).concat(i))), !u || !u.length) return a;
        var c, l, f, m, d, p, h;
        for (c = 0, p = u.length; p > c; c++)
            if (d = u[c], f = d.name, f && !d.disabled)
                if (t && o.clk && "image" == d.type) o.clk == d && (a.push({
                    name: f,
                    value: e(d).val(),
                    type: d.type
                }), a.push({
                    name: f + ".x",
                    value: o.clk_x
                }, {
                    name: f + ".y",
                    value: o.clk_y
                }));
                else if (m = e.fieldValue(d, !0), m && m.constructor == Array)
                    for (r && r.push(d), l = 0, h = m.length; h > l; l++) a.push({
                        name: f,
                        value: m[l]
                    });
                else if (n.fileapi && "file" == d.type) {
                    r && r.push(d);
                    var v = d.files;
                    if (v.length)
                        for (l = 0; l < v.length; l++) a.push({
                            name: f,
                            value: v[l],
                            type: d.type
                        });
                    else a.push({
                        name: f,
                        value: "",
                        type: d.type
                    })
                } else null !== m && "undefined" != typeof m && (r && r.push(d), a.push({
                    name: f,
                    value: m,
                    type: d.type,
                    required: d.required
                }));
        if (!t && o.clk) {
            var g = e(o.clk),
                x = g[0];
            f = x.name, f && !x.disabled && "image" == x.type && (a.push({
                name: f,
                value: g.val()
            }), a.push({
                name: f + ".x",
                value: o.clk_x
            }, {
                name: f + ".y",
                value: o.clk_y
            }))
        }
        return a
    }, e.fn.formSerialize = function (t) {
        return e.param(this.formToArray(t))
    }, e.fn.fieldSerialize = function (t) {
        var r = [];
        return this.each(function () {
            var a = this.name;
            if (a) {
                var n = e.fieldValue(this, t);
                if (n && n.constructor == Array)
                    for (var i = 0, o = n.length; o > i; i++) r.push({
                        name: a,
                        value: n[i]
                    });
                else null !== n && "undefined" != typeof n && r.push({
                    name: this.name,
                    value: n
                })
            }
        }), e.param(r)
    }, e.fn.fieldValue = function (t) {
        for (var r = [], a = 0, n = this.length; n > a; a++) {
            var i = this[a],
                o = e.fieldValue(i, t);
            null === o || "undefined" == typeof o || o.constructor == Array && !o.length || (o.constructor == Array ? e.merge(r, o) : r.push(o))
        }
        return r
    }, e.fieldValue = function (t, r) {
        var a = t.name,
            n = t.type,
            i = t.tagName.toLowerCase();
        if (void 0 === r && (r = !0), r && (!a || t.disabled || "reset" == n || "button" == n || ("checkbox" == n || "radio" == n) && !t.checked || ("submit" == n || "image" == n) && t.form && t.form.clk != t || "select" == i && -1 == t.selectedIndex)) return null;
        if ("select" == i) {
            var o = t.selectedIndex;
            if (0 > o) return null;
            for (var s = [], u = t.options, c = "select-one" == n, l = c ? o + 1 : u.length, f = c ? o : 0; l > f; f++) {
                var m = u[f];
                if (m.selected) {
                    var d = m.value;
                    if (d || (d = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), c) return d;
                    s.push(d)
                }
            }
            return s
        }
        return e(t).val()
    }, e.fn.clearForm = function (t) {
        return this.each(function () {
            e("input,select,textarea", this).clearFields(t)
        })
    }, e.fn.clearFields = e.fn.clearInputs = function (t) {
        var r = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
            var a = this.type,
                n = this.tagName.toLowerCase();
            r.test(a) || "textarea" == n ? this.value = "" : "checkbox" == a || "radio" == a ? this.checked = !1 : "select" == n ? this.selectedIndex = -1 : "file" == a ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone(!0)) : e(this).val("") : t && (t === !0 && /hidden/.test(a) || "string" == typeof t && e(this).is(t)) && (this.value = "")
        })
    }, e.fn.resetForm = function () {
        return this.each(function () {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    }, e.fn.enable = function (e) {
        return void 0 === e && (e = !0), this.each(function () {
            this.disabled = !e
        })
    }, e.fn.selected = function (t) {
        return void 0 === t && (t = !0), this.each(function () {
            var r = this.type;
            if ("checkbox" == r || "radio" == r) this.checked = t;
            else if ("option" == this.tagName.toLowerCase()) {
                var a = e(this).parent("select");
                t && a[0] && "select-one" == a[0].type && a.find("option").selected(!1), this.selected = t
            }
        })
    }, e.fn.ajaxSubmit.debug = !1
});


/*!
 * Magnific Popup - v1.0.0 - 2014-12-12
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2014 Dmitry Semenov;
 */

!function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (e) {
    var t, o, i, n, r, a, s, l = "Close",
        u = "BeforeClose",
        p = "AfterClose",
        c = "BeforeAppend",
        m = "MarkupParse",
        d = "Open",
        f = "Change",
        v = "mfp",
        y = "." + v,
        h = "mfp-ready",
        g = "mfp-removing",
        w = "mfp-prevent-close",
        b = function () {
        },
        P = !!window.jQuery,
        T = e(window),
        I = function (e, o) {
            t.ev.on(v + e + y, o)
        },
        C = function (t, o, i, n) {
            var r = document.createElement("div");
            return r.className = "mfp-" + t, i && (r.innerHTML = i), n ? o && o.appendChild(r) : (r = e(r), o && r.appendTo(o)), r
        },
        S = function (o, i) {
            t.ev.triggerHandler(v + o, i), t.st.callbacks && (o = o.charAt(0).toLowerCase() + o.slice(1), t.st.callbacks[o] && t.st.callbacks[o].apply(t, e.isArray(i) ? i : [i]))
        },
        x = function (o) {
            return o === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = o), t.currTemplate.closeBtn
        },
        Y = function () {
            e.magnificPopup.instance || (t = new b, t.init(), e.magnificPopup.instance = t)
        },
        j = function () {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    b.prototype = {
        constructor: b,
        init: function () {
            var o = navigator.appVersion;
            t.isIE7 = -1 !== o.indexOf("MSIE 7."), t.isIE8 = -1 !== o.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(o), t.isIOS = /iphone|ipad|ipod/gi.test(o), t.supportsTransition = j(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = e(document), t.popupsCache = {}
        },
        open: function (o) {
            i || (i = e(document.body));
            var r;
            if (o.isObj === !1) {
                t.items = o.items.toArray(), t.index = 0;
                var s, l = o.items;
                for (r = 0; r < l.length; r++)
                    if (s = l[r], s.parsed && (s = s.el[0]), s === o.el[0]) {
                        t.index = r;
                        break
                    }
            } else t.items = e.isArray(o.items) ? o.items : [o.items], t.index = o.index || 0;
            if (t.isOpen) return void t.updateItemHTML();
            t.types = [], a = "", o.mainEl && o.mainEl.length ? t.ev = o.mainEl.eq(0) : t.ev = n, o.key ? (t.popupsCache[o.key] || (t.popupsCache[o.key] = {}), t.currTemplate = t.popupsCache[o.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, o), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = C("bg").on("click" + y, function () {
                t.close()
            }), t.wrap = C("wrap").attr("tabindex", -1).on("click" + y, function (e) {
                t._checkIfClose(e.target) && t.close()
            }), t.container = C("container", t.wrap)), t.contentContainer = C("content"), t.st.preloader && (t.preloader = C("preloader", t.container, t.st.tLoading));
            var u = e.magnificPopup.modules;
            for (r = 0; r < u.length; r++) {
                var p = u[r];
                p = p.charAt(0).toUpperCase() + p.slice(1), t["init" + p].call(t)
            }
            S("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (I(m, function (e, t, o, i) {
                o.close_replaceWith = x(i.type)
            }), a += " mfp-close-btn-in") : t.wrap.append(x())), t.st.alignTop && (a += " mfp-align-top"), t.wrap.css(t.fixedContentPos ? {
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            } : {
                top: T.scrollTop(),
                position: "absolute"
            }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                height: n.height(),
                position: "absolute"
            }), t.st.enableEscapeKey && n.on("keyup" + y, function (e) {
                27 === e.keyCode && t.close()
            }), T.on("resize" + y, function () {
                t.updateSize()
            }), t.st.closeOnContentClick || (a += " mfp-auto-cursor"), a && t.wrap.addClass(a);
            var c = t.wH = T.height(),
                f = {};
            if (t.fixedContentPos && t._hasScrollBar(c)) {
                var v = t._getScrollbarSize();
                v && (f.marginRight = v)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : f.overflow = "hidden");
            var g = t.st.mainClass;
            return t.isIE7 && (g += " mfp-ie7"), g && t._addClassToMFP(g), t.updateItemHTML(), S("BuildControls"), e("html").css(f), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || i), t._lastFocusedEl = document.activeElement, setTimeout(function () {
                t.content ? (t._addClassToMFP(h), t._setFocus()) : t.bgOverlay.addClass(h), n.on("focusin" + y, t._onFocusIn)
            }, 16), t.isOpen = !0, t.updateSize(c), S(d), o
        },
        close: function () {
            t.isOpen && (S(u), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(g), setTimeout(function () {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function () {
            S(l);
            var o = g + " " + h + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (o += t.st.mainClass + " "), t._removeClassFromMFP(o), t.fixedContentPos) {
                var i = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : i.overflow = "", e("html").css(i)
            }
            n.off("keyup" + y + " focusin" + y), t.ev.off(y), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, S(p)
        },
        updateSize: function (e) {
            if (t.isIOS) {
                var o = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * o;
                t.wrap.css("height", i), t.wH = i
            } else t.wH = e || T.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), S("Resize")
        },
        updateItemHTML: function () {
            var o = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), o.parsed || (o = t.parseEl(t.index));
            var i = o.type;
            if (S("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = o, !t.currTemplate[i]) {
                var n = t.st[i] ? t.st[i].markup : !1;
                S("FirstMarkupParse", n), n ? t.currTemplate[i] = e(n) : t.currTemplate[i] = !0
            }
            r && r !== o.type && t.container.removeClass("mfp-" + r + "-holder");
            var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](o, t.currTemplate[i]);
            t.appendContent(a, i), o.preloaded = !0, S(f, o), r = o.type, t.container.prepend(t.contentContainer), S("AfterChange")
        },
        appendContent: function (e, o) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[o] === !0 ? t.content.find(".mfp-close").length || t.content.append(x()) : t.content = e : t.content = "", S(c), t.container.addClass("mfp-" + o + "-holder"), t.contentContainer.append(t.content)
        },
        parseEl: function (o) {
            var i, n = t.items[o];
            if (n.tagName ? n = {
                    el: e(n)
                } : (i = n.type, n = {
                    data: n,
                    src: n.src
                }), n.el) {
                for (var r = t.types, a = 0; a < r.length; a++)
                    if (n.el.hasClass("mfp-" + r[a])) {
                        i = r[a];
                        break
                    }
                n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href"))
            }
            return n.type = i || t.st.type || "inline", n.index = o, n.parsed = !0, t.items[o] = n, S("ElementParse", n), t.items[o]
        },
        addGroup: function (e, o) {
            var i = function (i) {
                i.mfpEl = this, t._openClick(i, e, o)
            };
            o || (o = {});
            var n = "click.magnificPopup";
            o.mainEl = e, o.items ? (o.isObj = !0, e.off(n).on(n, i)) : (o.isObj = !1, o.delegate ? e.off(n).on(n, o.delegate, i) : (o.items = e, e.off(n).on(n, i)))
        },
        _openClick: function (o, i, n) {
            var r = void 0 !== n.midClick ? n.midClick : e.magnificPopup.defaults.midClick;
            if (r || 2 !== o.which && !o.ctrlKey && !o.metaKey) {
                var a = void 0 !== n.disableOn ? n.disableOn : e.magnificPopup.defaults.disableOn;
                if (a)
                    if (e.isFunction(a)) {
                        if (!a.call(t)) return !0
                    } else if (T.width() < a) return !0;
                o.type && (o.preventDefault(), t.isOpen && o.stopPropagation()), n.el = e(o.mfpEl), n.delegate && (n.items = i.find(n.delegate)), t.open(n)
            }
        },
        updateStatus: function (e, i) {
            if (t.preloader) {
                o !== e && t.container.removeClass("mfp-s-" + o), i || "loading" !== e || (i = t.st.tLoading);
                var n = {
                    status: e,
                    text: i
                };
                S("UpdateStatus", n), e = n.status, i = n.text, t.preloader.html(i), t.preloader.find("a").on("click", function (e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("mfp-s-" + e), o = e
            }
        },
        _checkIfClose: function (o) {
            if (!e(o).hasClass(w)) {
                var i = t.st.closeOnContentClick,
                    n = t.st.closeOnBgClick;
                if (i && n) return !0;
                if (!t.content || e(o).hasClass("mfp-close") || t.preloader && o === t.preloader[0]) return !0;
                if (o === t.content[0] || e.contains(t.content[0], o)) {
                    if (i) return !0
                } else if (n && e.contains(document, o)) return !0;
                return !1
            }
        },
        _addClassToMFP: function (e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        },
        _removeClassFromMFP: function (e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        },
        _hasScrollBar: function (e) {
            return (t.isIE7 ? n.height() : document.body.scrollHeight) > (e || T.height())
        },
        _setFocus: function () {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function (o) {
            return o.target === t.wrap[0] || e.contains(t.wrap[0], o.target) ? void 0 : (t._setFocus(), !1)
        },
        _parseMarkup: function (t, o, i) {
            var n;
            i.data && (o = e.extend(i.data, o)), S(m, [t, o, i]), e.each(o, function (e, o) {
                if (void 0 === o || o === !1) return !0;
                if (n = e.split("_"), n.length > 1) {
                    var i = t.find(y + "-" + n[0]);
                    if (i.length > 0) {
                        var r = n[1];
                        "replaceWith" === r ? i[0] !== o[0] && i.replaceWith(o) : "img" === r ? i.is("img") ? i.attr("src", o) : i.replaceWith('<img src="' + o + '" class="' + i.attr("class") + '" />') : i.attr(n[1], o)
                    }
                } else t.find(y + "-" + e).html(o)
            })
        },
        _getScrollbarSize: function () {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: b.prototype,
        modules: [],
        open: function (t, o) {
            return Y(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = o || 0, this.instance.open(t)
        },
        close: function () {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function (t, o) {
            o.options && (e.magnificPopup.defaults[t] = o.options), e.extend(this.proto, o.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, e.fn.magnificPopup = function (o) {
        Y();
        var i = e(this);
        if ("string" == typeof o)
            if ("open" === o) {
                var n, r = P ? i.data("magnificPopup") : i[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                r.items ? n = r.items[a] : (n = i, r.delegate && (n = n.find(r.delegate)), n = n.eq(a)), t._openClick({
                    mfpEl: n
                }, i, r)
            } else t.isOpen && t[o].apply(t, Array.prototype.slice.call(arguments, 1));
        else o = e.extend(!0, {}, o), P ? i.data("magnificPopup", o) : i[0].magnificPopup = o, t.addGroup(i, o);
        return i
    };
    var Q, A, $, k = "inline",
        D = function () {
            $ && (A.after($.addClass(Q)).detach(), $ = null)
        };
    e.magnificPopup.registerModule(k, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function () {
                t.types.push(k), I(l + "." + k, function () {
                    D()
                })
            },
            getInline: function (o, i) {
                if (D(), o.src) {
                    var n = t.st.inline,
                        r = e(o.src);
                    if (r.length) {
                        var a = r[0].parentNode;
                        a && a.tagName && (A || (Q = n.hiddenClass, A = C(Q), Q = "mfp-" + Q), $ = r.after(A).detach().removeClass(Q)), t.updateStatus("ready")
                    } else t.updateStatus("error", n.tNotFound), r = e("<div>");
                    return o.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(i, {}, o), i
            }
        }
    });
    var W, M = "ajax",
        E = function () {
            W && i.removeClass(W)
        },
        O = function () {
            E(), t.req && t.req.abort()
        };
    e.magnificPopup.registerModule(M, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function () {
                t.types.push(M), W = t.st.ajax.cursor, I(l + "." + M, O), I("BeforeChange." + M, O)
            },
            getAjax: function (o) {
                W && i.addClass(W), t.updateStatus("loading");
                var n = e.extend({
                    url: o.src,
                    success: function (i, n, r) {
                        var a = {
                            data: i,
                            xhr: r
                        };
                        S("ParseAjax", a), t.appendContent(e(a.data), M), o.finished = !0, E(), t._setFocus(), setTimeout(function () {
                            t.wrap.addClass(h)
                        }, 16), t.updateStatus("ready"), S("AjaxContentAdded")
                    },
                    error: function () {
                        E(), o.finished = o.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", o.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(n), ""
            }
        }
    });
    var z, N = function (o) {
        if (o.data && void 0 !== o.data.title) return o.data.title;
        var i = t.st.image.titleSrc;
        if (i) {
            if (e.isFunction(i)) return i.call(t, o);
            if (o.el) return o.el.attr(i) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function () {
                var e = t.st.image,
                    o = ".image";
                t.types.push("image"), I(d + o, function () {
                    "image" === t.currItem.type && e.cursor && i.addClass(e.cursor)
                }), I(l + o, function () {
                    e.cursor && i.removeClass(e.cursor), T.off("resize" + y)
                }), I("Resize" + o, t.resizeImage), t.isLowIE && I("AfterChange", t.resizeImage)
            },
            resizeImage: function () {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var o = 0;
                    t.isLowIE && (o = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - o)
                }
            },
            _onImageHasSize: function (e) {
                e.img && (e.hasSize = !0, z && clearInterval(z), e.isCheckingImgSize = !1, S("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function (e) {
                var o = 0,
                    i = e.img[0],
                    n = function (r) {
                        z && clearInterval(z), z = setInterval(function () {
                            return i.naturalWidth > 0 ? void t._onImageHasSize(e) : (o > 200 && clearInterval(z), o++, void(3 === o ? n(10) : 40 === o ? n(50) : 100 === o && n(500)))
                        }, r)
                    };
                n(1)
            },
            getImage: function (o, i) {
                var n = 0,
                    r = function () {
                        o && (o.img[0].complete ? (o.img.off(".mfploader"), o === t.currItem && (t._onImageHasSize(o), t.updateStatus("ready")), o.hasSize = !0, o.loaded = !0, S("ImageLoadComplete")) : (n++, 200 > n ? setTimeout(r, 100) : a()))
                    },
                    a = function () {
                        o && (o.img.off(".mfploader"), o === t.currItem && (t._onImageHasSize(o), t.updateStatus("error", s.tError.replace("%url%", o.src))), o.hasSize = !0, o.loaded = !0, o.loadError = !0)
                    },
                    s = t.st.image,
                    l = i.find(".mfp-img");
                if (l.length) {
                    var u = document.createElement("img");
                    u.className = "mfp-img", o.el && o.el.find("img").length && (u.alt = o.el.find("img").attr("alt")), o.img = e(u).on("load.mfploader", r).on("error.mfploader", a), u.src = o.src, l.is("img") && (o.img = o.img.clone()), u = o.img[0], u.naturalWidth > 0 ? o.hasSize = !0 : u.width || (o.hasSize = !1)
                }
                return t._parseMarkup(i, {
                    title: N(o),
                    img_replaceWith: o.img
                }, o), t.resizeImage(), o.hasSize ? (z && clearInterval(z), o.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", o.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), o.loading = !0, o.hasSize || (o.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(o)), i)
            }
        }
    });
    var B, V = function () {
        return void 0 === B && (B = void 0 !== document.createElement("p").style.MozTransform), B
    };
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function () {
                var e, o = t.st.zoom,
                    i = ".zoom";
                if (o.enabled && t.supportsTransition) {
                    var n, r, a = o.duration,
                        s = function (e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + o.duration / 1e3 + "s " + o.easing,
                                n = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return n["-webkit-" + r] = n["-moz-" + r] = n["-o-" + r] = n[r] = i, t.css(n), t
                        },
                        p = function () {
                            t.content.css("visibility", "visible")
                        };
                    I("BuildControls" + i, function () {
                        if (t._allowZoom()) {
                            if (clearTimeout(n), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return void p();
                            r = s(e), r.css(t._getOffset()), t.wrap.append(r), n = setTimeout(function () {
                                r.css(t._getOffset(!0)), n = setTimeout(function () {
                                    p(), setTimeout(function () {
                                        r.remove(), e = r = null, S("ZoomAnimationEnded")
                                    }, 16)
                                }, a)
                            }, 16)
                        }
                    }), I(u + i, function () {
                        if (t._allowZoom()) {
                            if (clearTimeout(n), t.st.removalDelay = a, !e) {
                                if (e = t._getItemToZoom(), !e) return;
                                r = s(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function () {
                                r.css(t._getOffset())
                            }, 16)
                        }
                    }), I(l + i, function () {
                        t._allowZoom() && (p(), r && r.remove(), e = null)
                    })
                }
            },
            _allowZoom: function () {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function () {
                return t.currItem.hasSize ? t.currItem.img : !1
            },
            _getOffset: function (o) {
                var i;
                i = o ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var n = i.offset(),
                    r = parseInt(i.css("padding-top"), 10),
                    a = parseInt(i.css("padding-bottom"), 10);
                n.top -= e(window).scrollTop() - r;
                var s = {
                    width: i.width(),
                    height: (P ? i.innerHeight() : i[0].offsetHeight) - a - r
                };
                return V() ? s["-moz-transform"] = s.transform = "translate(" + n.left + "px," + n.top + "px)" : (s.left = n.left, s.top = n.top), s
            }
        }
    });
    var F = "iframe",
        _ = "//about:blank",
        L = function (e) {
            if (t.currTemplate[F]) {
                var o = t.currTemplate[F].find("iframe");
                o.length && (e || (o[0].src = _), t.isIE8 && o.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(F, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function () {
                t.types.push(F), I("BeforeChange", function (e, t, o) {
                    t !== o && (t === F ? L() : o === F && L(!0))
                }), I(l + "." + F, function () {
                    L()
                })
            },
            getIframe: function (o, i) {
                var n = o.src,
                    r = t.st.iframe;
                e.each(r.patterns, function () {
                    return n.indexOf(this.index) > -1 ? (this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)), n = this.src.replace("%id%", n), !1) : void 0
                });
                var a = {};
                return r.srcAction && (a[r.srcAction] = n), t._parseMarkup(i, a, o), t.updateStatus("ready"), i
            }
        }
    });
    var R = function (e) {
            var o = t.items.length;
            return e > o - 1 ? e - o : 0 > e ? o + e : e
        },
        X = function (e, t, o) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, o)
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function () {
                var o = t.st.gallery,
                    i = ".mfp-gallery",
                    r = Boolean(e.fn.mfpFastClick);
                return t.direction = !0, o && o.enabled ? (a += " mfp-gallery", I(d + i, function () {
                    o.navigateByImgClick && t.wrap.on("click" + i, ".mfp-img", function () {
                        return t.items.length > 1 ? (t.next(), !1) : void 0
                    }), n.on("keydown" + i, function (e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }), I("UpdateStatus" + i, function (e, o) {
                    o.text && (o.text = X(o.text, t.currItem.index, t.items.length))
                }), I(m + i, function (e, i, n, r) {
                    var a = t.items.length;
                    n.counter = a > 1 ? X(o.tCounter, r.index, a) : ""
                }), I("BuildControls" + i, function () {
                    if (t.items.length > 1 && o.arrows && !t.arrowLeft) {
                        var i = o.arrowMarkup,
                            n = t.arrowLeft = e(i.replace(/%title%/gi, o.tPrev).replace(/%dir%/gi, "left")).addClass(w),
                            a = t.arrowRight = e(i.replace(/%title%/gi, o.tNext).replace(/%dir%/gi, "right")).addClass(w),
                            s = r ? "mfpFastClick" : "click";
                        n[s](function () {
                            t.prev()
                        }), a[s](function () {
                            t.next()
                        }), t.isIE7 && (C("b", n[0], !1, !0), C("a", n[0], !1, !0), C("b", a[0], !1, !0), C("a", a[0], !1, !0)), t.container.append(n.add(a))
                    }
                }), I(f + i, function () {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function () {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }, 16)
                }), void I(l + i, function () {
                    n.off(i), t.wrap.off("click" + i), t.arrowLeft && r && t.arrowLeft.add(t.arrowRight).destroyMfpFastClick(), t.arrowRight = t.arrowLeft = null
                })) : !1
            },
            next: function () {
                t.direction = !0, t.index = R(t.index + 1), t.updateItemHTML()
            },
            prev: function () {
                t.direction = !1, t.index = R(t.index - 1), t.updateItemHTML()
            },
            goTo: function (e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            },
            preloadNearbyImages: function () {
                var e, o = t.st.gallery.preload,
                    i = Math.min(o[0], t.items.length),
                    n = Math.min(o[1], t.items.length);
                for (e = 1; e <= (t.direction ? n : i); e++) t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? i : n); e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function (o) {
                if (o = R(o), !t.items[o].preloaded) {
                    var i = t.items[o];
                    i.parsed || (i = t.parseEl(o)), S("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", function () {
                        i.hasSize = !0
                    }).on("error.mfploader", function () {
                        i.hasSize = !0, i.loadError = !0, S("LazyLoadError", i)
                    }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    e.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function (e) {
                return e.src.replace(/\.\w+$/, function (e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina,
                        o = e.ratio;
                    o = isNaN(o) ? o() : o, o > 1 && (I("ImageHasSize." + U, function (e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / o,
                            width: "100%"
                        })
                    }), I("ElementParse." + U, function (t, i) {
                        i.src = e.replaceSrc(i, o)
                    }))
                }
            }
        }
    }),
        function () {
            var t = 1e3,
                o = "ontouchstart" in window,
                i = function () {
                    T.off("touchmove" + r + " touchend" + r)
                },
                n = "mfpFastClick",
                r = "." + n;
            e.fn.mfpFastClick = function (n) {
                return e(this).each(function () {
                    var a, s = e(this);
                    if (o) {
                        var l, u, p, c, m, d;
                        s.on("touchstart" + r, function (e) {
                            c = !1, d = 1, m = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0], u = m.clientX, p = m.clientY, T.on("touchmove" + r, function (e) {
                                m = e.originalEvent ? e.originalEvent.touches : e.touches, d = m.length, m = m[0], (Math.abs(m.clientX - u) > 10 || Math.abs(m.clientY - p) > 10) && (c = !0, i())
                            }).on("touchend" + r, function (e) {
                                i(), c || d > 1 || (a = !0, e.preventDefault(), clearTimeout(l), l = setTimeout(function () {
                                    a = !1
                                }, t), n())
                            })
                        })
                    }
                    s.on("click" + r, function () {
                        a || n()
                    })
                })
            }, e.fn.destroyMfpFastClick = function () {
                e(this).off("touchstart" + r + " click" + r), o && T.off("touchmove" + r + " touchend" + r)
            }
        }(), Y()
});

/*!
 * jquery.mb.components
 * file: jquery.mb.YTPlayer.src.js
 * last modified: 01/07/15 19.35
 * Open Lab s.r.l., Florence - Italy
 * email: matteo@open-lab.com
 * site: http://pupunzi.com
 * http://open-lab.com
 * blog: http://pupunzi.open-lab.com
 * Q&A:  http://jquery.pupunzi.com
 * Licences: MIT, GPL
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);
 */

function onYouTubeIframeAPIReady() {
    ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}

function uncamel(e) {
    return e.replace(/([A-Z])/g, function (e) {
        return "-" + e.toLowerCase()
    })
}

function setUnit(e, t) {
    return "string" != typeof e || e.match(/^[\-0-9\.]+jQuery/) ? "" + e + t : e
}

function setFilter(e, t, o) {
    var i = uncamel(t),
        r = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
    e[r + "filter"] = e[r + "filter"] || "", o = setUnit(o > jQuery.CSS.filters[t].max ? jQuery.CSS.filters[t].max : o, jQuery.CSS.filters[t].unit), e[r + "filter"] += i + "(" + o + ") ", delete e[t]
}
var ytp = ytp || {},
    getYTPVideoID = function (e) {
        var t, o;
        return e.indexOf("youtu.be") > 0 ? (t = e.substr(e.lastIndexOf("/") + 1, e.length), o = t.indexOf("?list=") > 0 ? t.substr(t.lastIndexOf("="), t.length) : null, t = o ? t.substr(0, t.lastIndexOf("?")) : t) : e.indexOf("http") > -1 ? (t = e.match(/[\\?&]v=([^&#]*)/)[1], o = e.indexOf("list=") > 0 ? e.match(/[\\?&]list=([^&#]*)/)[1] : null) : (t = e.length > 15 ? null : e, o = t ? null : e), {
            videoID: t,
            playlistID: o
        }
    };
!function (jQuery, ytp) {
    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "2.9.4",
        build: "{{ build }}",
        author: "Matteo Bicocchi",
        apiKey: "",
        defaults: {
            containment: "body",
            ratio: "auto",
            videoURL: null,
            playlistURL: null,
            startAt: 0,
            stopAt: 0,
            autoPlay: !0,
            vol: 50,
            addRaster: !1,
            opacity: 1,
            quality: "default",
            mute: !1,
            loop: !0,
            showControls: !0,
            showAnnotations: !1,
            showYTLogo: !0,
            stopMovieOnBlur: !0,
            realfullscreen: !0,
            gaTrack: !0,
            optimizeDisplay: !0,
            onReady: function (e) {
            }
        },
        controls: {
            play: "P",
            pause: "p",
            mute: "M",
            unmute: "A",
            onlyYT: "O",
            showSite: "R",
            ytLogo: "Y"
        },
        locationProtocol: "https:",
        buildPlayer: function (options) {
            return this.each(function () {
                var YTPlayer = this,
                    $YTPlayer = jQuery(YTPlayer);
                YTPlayer.loop = 0, YTPlayer.opt = {}, YTPlayer.state = {}, YTPlayer.filtersEnabled = !0, YTPlayer.filters = {
                    grayscale: {
                        value: 0,
                        unit: "%"
                    },
                    hue_rotate: {
                        value: 0,
                        unit: "deg"
                    },
                    invert: {
                        value: 0,
                        unit: "%"
                    },
                    opacity: {
                        value: 0,
                        unit: "%"
                    },
                    saturate: {
                        value: 0,
                        unit: "%"
                    },
                    sepia: {
                        value: 0,
                        unit: "%"
                    },
                    brightness: {
                        value: 0,
                        unit: "%"
                    },
                    contrast: {
                        value: 0,
                        unit: "%"
                    },
                    blur: {
                        value: 0,
                        unit: "px"
                    }
                }, $YTPlayer.addClass("mb_YTPlayer");
                var property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
                "undefined" != typeof property && "undefined" != typeof property.vol && (property.vol = 0 === property.vol ? property.vol = 1 : property.vol), jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property), YTPlayer.hasChanged || (YTPlayer.defaultOpt = {}, jQuery.extend(YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options, property)), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1;
                var isIframe = function () {
                    var e = !1;
                    try {
                        self.location.href != top.location.href && (e = !0)
                    } catch (t) {
                        e = !0
                    }
                    return e
                };
                YTPlayer.canGoFullScreen = !(jQuery.browser.msie || jQuery.browser.opera || isIframe()), YTPlayer.canGoFullScreen || (YTPlayer.opt.realfullscreen = !1), $YTPlayer.attr("id") || $YTPlayer.attr("id", "video_" + (new Date).getTime());
                var playerID = "mbYTP_" + YTPlayer.id;
                YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0;
                var videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).videoID : !1,
                    playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).playlistID : !1;
                YTPlayer.videoID = videoID, YTPlayer.playlistID = playlistID, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "0" : "3";
                var playerVars = {
                    autoplay: 0,
                    modestbranding: 1,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    enablejsapi: 1,
                    version: 3,
                    playerapiid: playerID,
                    origin: "*",
                    allowfullscreen: !0,
                    wmode: "transparent",
                    iv_load_policy: YTPlayer.opt.showAnnotations
                };
                document.createElement("video").canPlayType && jQuery.extend(playerVars, {
                    html5: 1
                }), jQuery.browser.msie && jQuery.browser.version < 9 && (this.opt.opacity = 1);
                var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox"),
                    overlay = jQuery("<div/>").css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }).addClass("YTPOverlay");
                if (YTPlayer.isSelf = "self" == YTPlayer.opt.containment, YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = jQuery("self" == YTPlayer.opt.containment ? this : YTPlayer.opt.containment), YTPlayer.isBackground = "body" == YTPlayer.opt.containment.get(0).tagName.toLowerCase(), !YTPlayer.isBackground || !ytp.backgroundIsInited) {
                    var isPlayer = YTPlayer.opt.containment.is(jQuery(this));
                    if (YTPlayer.canPlayOnMobile = isPlayer && 0 === jQuery(this).children().length, isPlayer ? YTPlayer.isPlayer = !0 : $YTPlayer.hide(), jQuery.browser.mobile && !YTPlayer.canPlayOnMobile) return void $YTPlayer.remove();
                    var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
                    if (wrapper.css({
                            position: "absolute",
                            zIndex: 0,
                            minWidth: "100%",
                            minHeight: "100%",
                            left: 0,
                            top: 0,
                            overflow: "hidden",
                            opacity: 0
                        }), playerBox.css({
                            position: "absolute",
                            zIndex: 0,
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            overflow: "hidden"
                        }), wrapper.append(playerBox), YTPlayer.opt.containment.children().not("script, style").each(function () {
                            "static" == jQuery(this).css("position") && jQuery(this).css("position", "relative")
                        }), YTPlayer.isBackground ? (jQuery("body").css({
                            boxSizing: "border-box"
                        }), wrapper.css({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 0
                        }), $YTPlayer.hide()) : "static" == YTPlayer.opt.containment.css("position") && YTPlayer.opt.containment.css({
                            position: "relative"
                        }), YTPlayer.opt.containment.prepend(wrapper), YTPlayer.wrapper = wrapper, playerBox.css({
                            opacity: 1
                        }), jQuery.browser.mobile || (playerBox.after(overlay), YTPlayer.overlay = overlay), YTPlayer.isBackground || overlay.on("mouseenter", function () {
                            YTPlayer.controlBar && YTPlayer.controlBar.addClass("visible")
                        }).on("mouseleave", function () {
                            YTPlayer.controlBar && YTPlayer.controlBar.removeClass("visible")
                        }), ytp.YTAPIReady) setTimeout(function () {
                        jQuery(document).trigger("YTAPIReady")
                    }, 100);
                    else {
                        jQuery("#YTAPI").remove();
                        var tag = jQuery("<script></script>").attr({
                            src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
                            id: "YTAPI"
                        });
                        jQuery("head").prepend(tag)
                    }
                    jQuery(document).on("YTAPIReady", function () {
                        YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit || (YTPlayer.isBackground && (ytp.backgroundIsInited = !0), YTPlayer.opt.autoPlay = "undefined" == typeof YTPlayer.opt.autoPlay ? YTPlayer.isBackground ? !0 : !1 : YTPlayer.opt.autoPlay, YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(YTPlayer), jQuery(YTPlayer).on("YTPChanged", function () {
                            if (!YTPlayer.isInit) {
                                if (YTPlayer.isInit = !0, jQuery.browser.mobile && YTPlayer.canPlayOnMobile) {
                                    if (YTPlayer.opt.containment.outerWidth() > jQuery(window).width()) {
                                        YTPlayer.opt.containment.css({
                                            maxWidth: "100%"
                                        });
                                        var h = .6 * YTPlayer.opt.containment.outerWidth();
                                        YTPlayer.opt.containment.css({
                                            maxHeight: h
                                        })
                                    }
                                    return void new YT.Player(playerID, {
                                        videoId: YTPlayer.videoID.toString(),
                                        height: "100%",
                                        width: "100%",
                                        events: {
                                            onReady: function (e) {
                                                YTPlayer.player = e.target, playerBox.css({
                                                    opacity: 1
                                                }), YTPlayer.wrapper.css({
                                                    opacity: 1
                                                })
                                            }
                                        }
                                    })
                                }
                                new YT.Player(playerID, {
                                    videoId: YTPlayer.videoID.toString(),
                                    playerVars: playerVars,
                                    events: {
                                        onReady: function (e) {
                                            if (YTPlayer.player = e.target, !YTPlayer.isReady) {
                                                YTPlayer.isReady = YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ? !1 : !0, YTPlayer.playerEl = YTPlayer.player.getIframe(), $YTPlayer.optimizeDisplay(), YTPlayer.videoID = videoID, jQuery(window).on("resize.YTP", function () {
                                                    $YTPlayer.optimizeDisplay()
                                                }), jQuery.mbYTPlayer.checkForState(YTPlayer);
                                                var t = jQuery.Event("YTPUnstarted");
                                                t.time = YTPlayer.player.time, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(t)
                                            }
                                        },
                                        onStateChange: function (event) {
                                            if ("function" == typeof event.target.getPlayerState) {
                                                var state = event.target.getPlayerState();
                                                if (YTPlayer.state != state) {
                                                    YTPlayer.state = state;
                                                    var eventType;
                                                    switch (state) {
                                                        case -1:
                                                            eventType = "YTPUnstarted";
                                                            break;
                                                        case 0:
                                                            eventType = "YTPEnd";
                                                            break;
                                                        case 1:
                                                            eventType = "YTPStart", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) && _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]), "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString());
                                                            break;
                                                        case 2:
                                                            eventType = "YTPPause", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                            break;
                                                        case 3:
                                                            YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), eventType = "YTPBuffering", YTPlayer.controlBar && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                            break;
                                                        case 5:
                                                            eventType = "YTPCued"
                                                    }
                                                    var YTPEvent = jQuery.Event(eventType);
                                                    YTPEvent.time = YTPlayer.player.time, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(YTPEvent)
                                                }
                                            }
                                        },
                                        onPlaybackQualityChange: function (e) {
                                            var t = e.target.getPlaybackQuality(),
                                                o = jQuery.Event("YTPQualityChange");
                                            o.quality = t, jQuery(YTPlayer).trigger(o)
                                        },
                                        onError: function (e) {
                                            150 == e.data && (console.log("Embedding this video is restricted by Youtube."), YTPlayer.isPlayList && jQuery(YTPlayer).playNext()), 2 == e.data && YTPlayer.isPlayList && jQuery(YTPlayer).playNext(), "function" == typeof YTPlayer.opt.onError && YTPlayer.opt.onError($YTPlayer, e)
                                        }
                                    }
                                })
                            }
                        }))
                    })
                }
            })
        },
        getDataFromAPI: function (e) {
            if (e.videoData = jQuery.mbStorage.get("YYTPlayer_data_" + e.videoID), jQuery(e).off("YTPData.YTPlayer").on("YTPData.YTPlayer", function () {
                    if (e.hasData && e.isPlayer && !e.opt.autoPlay) {
                        var t = e.videoData.thumb_max || e.videoData.thumb_high || e.videoData.thumb_medium;
                        e.opt.containment.css({
                            background: "rgba(0,0,0,0.5) url(" + t + ") center center",
                            backgroundSize: "cover"
                        }), e.opt.backgroundUrl = t
                    }
                }), e.videoData) setTimeout(function () {
                e.opt.ratio = "auto" == e.opt.ratio ? "16/9" : e.opt.ratio, e.dataReceived = !0, jQuery(e).trigger("YTPChanged");
                var t = jQuery.Event("YTPData");
                t.prop = {};
                for (var o in e.videoData) t.prop[o] = e.videoData[o];
                jQuery(e).trigger(t)
            }, 500), e.hasData = !0;
            else if (jQuery.mbYTPlayer.apiKey) jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + e.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function (t) {
                function o(t) {
                    e.videoData = {}, e.videoData.id = e.videoID, e.videoData.channelTitle = t.channelTitle, e.videoData.title = t.title, e.videoData.description = t.description.length < 400 ? t.description : t.description.substring(0, 400) + " ...", e.videoData.aspectratio = "auto" == e.opt.ratio ? "16/9" : e.opt.ratio, e.opt.ratio = e.videoData.aspectratio, e.videoData.thumb_max = t.thumbnails.maxres ? t.thumbnails.maxres.url : null, e.videoData.thumb_high = t.thumbnails.high ? t.thumbnails.high.url : null, e.videoData.thumb_medium = t.thumbnails.medium ? t.thumbnails.medium.url : null, jQuery.mbStorage.set("YYTPlayer_data_" + e.videoID, e.videoData)
                }

                e.dataReceived = !0, jQuery(e).trigger("YTPChanged"), o(t.items[0].snippet), e.hasData = !0;
                var i = jQuery.Event("YTPData");
                i.prop = {};
                for (var r in e.videoData) i.prop[r] = e.videoData[r];
                jQuery(e).trigger(i)
            });
            else {
                if (setTimeout(function () {
                        jQuery(e).trigger("YTPChanged")
                    }, 50), e.isPlayer && !e.opt.autoPlay) {
                    var t = jQuery.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + e.videoID + "/hqdefault.jpg";
                    e.opt.containment.css({
                        background: "rgba(0,0,0,0.5) url(" + t + ") center center",
                        backgroundSize: "cover"
                    }), e.opt.backgroundUrl = t
                }
                e.videoData = null, e.opt.ratio = "auto" == e.opt.ratio ? "16/9" : e.opt.ratio
            }
            e.isPlayer && !e.opt.autoPlay && (e.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(e).append(e.loading), e.loading.fadeIn())
        },
        removeStoredData: function () {
            jQuery.mbStorage.remove()
        },
        getVideoData: function () {
            var e = this.get(0);
            return e.videoData
        },
        getVideoID: function () {
            var e = this.get(0);
            return e.videoID || !1
        },
        setVideoQuality: function (e) {
            var t = this.get(0);
            jQuery.browser.chrome || t.player.setPlaybackQuality(e)
        },
        playlist: function (e, t, o) {
            var i = this,
                r = i.get(0);
            return r.isPlayList = !0, t && (e = jQuery.shuffle(e)), r.videoID || (r.videos = e, r.videoCounter = 0, r.videoLength = e.length, jQuery(r).data("property", e[0]), jQuery(r).mb_YTPlayer()), "function" == typeof o && jQuery(r).on("YTPChanged", function () {
                o(r)
            }), jQuery(r).on("YTPEnd", function () {
                jQuery(r).playNext()
            }), i
        },
        playNext: function () {
            var e = this.get(0);
            return e.videoCounter++, e.videoCounter >= e.videoLength && (e.videoCounter = 0), jQuery(e).changeMovie(e.videos[e.videoCounter]), this
        },
        playPrev: function () {
            var e = this.get(0);
            return e.videoCounter--, e.videoCounter < 0 && (e.videoCounter = e.videoLength - 1), jQuery(e).changeMovie(e.videos[e.videoCounter]), this
        },
        changeMovie: function (e) {
            var t = this.get(0);
            t.opt.startAt = 0, t.opt.stopAt = 0, t.opt.mute = !0, t.hasData = !1, t.hasChanged = !0, e && jQuery.extend(t.opt, t.defaultOpt, e), t.videoID = getYTPVideoID(t.opt.videoURL).videoID, jQuery(t.playerEl).CSSAnimate({
                opacity: 0
            }, 200, function () {
                return jQuery(t).YTPGetPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + t.videoID), 1, t.opt.quality), jQuery.mbYTPlayer.checkForState(t), jQuery(t).optimizeDisplay(), jQuery.mbYTPlayer.getDataFromAPI(t), this
            })
        },
        getPlayer: function () {
            return jQuery(this).get(0).player
        },
        playerDestroy: function () {
            var e = this.get(0);
            ytp.YTAPIReady = !1, ytp.backgroundIsInited = !1, e.isInit = !1, e.videoID = null;
            var t = e.wrapper;
            return t.remove(), jQuery("#controlBar_" + e.id).remove(), clearInterval(e.checkForStartAt), clearInterval(e.getState), this
        },
        fullscreen: function (real) {
            function hideMouse() {
                YTPlayer.overlay.css({
                    cursor: "none"
                })
            }

            function RunPrefixMethod(e, t) {
                for (var o, i, r = ["webkit", "moz", "ms", "o", ""], n = 0; n < r.length && !e[o];) {
                    if (o = t, "" == r[n] && (o = o.substr(0, 1).toLowerCase() + o.substr(1)), o = r[n] + o, i = typeof e[o], "undefined" != i) return r = [r[n]], "function" == i ? e[o]() : e[o];
                    n++
                }
            }

            function launchFullscreen(e) {
                RunPrefixMethod(e, "RequestFullScreen")
            }

            function cancelFullscreen() {
                (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
            }

            var YTPlayer = this.get(0);
            "undefined" == typeof real && (real = YTPlayer.opt.realfullscreen), real = eval(real);
            var controls = jQuery("#controlBar_" + YTPlayer.id),
                fullScreenBtn = controls.find(".mb_OnlyYT"),
                videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
            if (real) {
                var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
                    var e = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
                    e ? (jQuery(YTPlayer).YTPSetVideoQuality("default"), jQuery(YTPlayer).trigger("YTPFullScreenStart")) : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("fullscreen"), videoWrapper.CSSAnimate({
                        opacity: YTPlayer.opt.opacity
                    }, 500), videoWrapper.css({
                        zIndex: 0
                    }), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
                })
            }
            return YTPlayer.isAlone ? (jQuery(document).off("mousemove.YTPlayer"), YTPlayer.overlay.css({
                cursor: "auto"
            }), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({
                opacity: YTPlayer.opt.opacity
            }, 500), videoWrapper.css({
                zIndex: 0
            })), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1) : (jQuery(document).on("mousemove.YTPlayer", function (e) {
                YTPlayer.overlay.css({
                    cursor: "auto"
                }), clearTimeout(YTPlayer.hideCursor), jQuery(e.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3))
            }), hideMouse(), real ? (videoWrapper.css({
                opacity: 0
            }), videoWrapper.addClass("fullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function () {
                videoWrapper.CSSAnimate({
                    opacity: 1
                }, 1e3), YTPlayer.wrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
            }, 500)) : videoWrapper.css({
                zIndex: 1e4
            }).CSSAnimate({
                opacity: 1
            }, 1e3), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0), this
        },
        toggleLoops: function () {
            var e = this.get(0),
                t = e.opt;
            return 1 == t.loop ? t.loop = 0 : (t.startAt ? e.player.seekTo(t.startAt) : e.player.playVideo(), t.loop = 1), this
        },
        play: function () {
            var e = this.get(0);
            if (e.isReady) {
                var t = jQuery("#controlBar_" + e.id),
                    o = t.find(".mb_YTPPlaypause");
                return o.html(jQuery.mbYTPlayer.controls.pause), e.player.playVideo(), e.wrapper.CSSAnimate({
                    opacity: e.isAlone ? 1 : e.opt.opacity
                }, 2e3), jQuery(e.playerEl).CSSAnimate({
                    opacity: 1
                }, 1e3), jQuery(e).css("background-image", "none"), this
            }
        },
        togglePlay: function (e) {
            var t = this.get(0);
            return 1 == t.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof e && e(t.state), this
        },
        stop: function () {
            var e = this.get(0),
                t = jQuery("#controlBar_" + e.id),
                o = t.find(".mb_YTPPlaypause");
            return o.html(jQuery.mbYTPlayer.controls.play), e.player.stopVideo(), this
        },
        pause: function () {
            var e = this.get(0),
                t = jQuery("#controlBar_" + e.id),
                o = t.find(".mb_YTPPlaypause");
            return o.html(jQuery.mbYTPlayer.controls.play), e.player.pauseVideo(), this
        },
        seekTo: function (e) {
            var t = this.get(0);
            return t.player.seekTo(e, !0), this
        },
        setVolume: function (e) {
            var t = this.get(0);
            return e || t.opt.vol || 0 != t.player.getVolume() ? !e && t.player.getVolume() > 0 || e && t.opt.vol == e ? t.isMute ? jQuery(t).YTPUnmute() : jQuery(t).YTPMute() : (t.opt.vol = e, t.player.setVolume(t.opt.vol), t.volumeBar && t.volumeBar.length && t.volumeBar.updateSliderVal(e)) : jQuery(t).YTPUnmute(), this
        },
        mute: function () {
            var e = this.get(0);
            if (!e.isMute) {
                e.player.mute(), e.isMute = !0, e.player.setVolume(0), e.volumeBar && e.volumeBar.length && e.volumeBar.width() > 10 && e.volumeBar.updateSliderVal(0);
                var t = jQuery("#controlBar_" + e.id),
                    o = t.find(".mb_YTPMuteUnmute");
                o.html(jQuery.mbYTPlayer.controls.unmute), jQuery(e).addClass("isMuted"), e.volumeBar && e.volumeBar.length && e.volumeBar.addClass("muted");
                var i = jQuery.Event("YTPMuted");
                return i.time = e.player.time, e.canTrigger && jQuery(e).trigger(i), this
            }
        },
        unmute: function () {
            var e = this.get(0);
            if (e.isMute) {
                e.player.unMute(), e.isMute = !1, e.player.setVolume(e.opt.vol), e.volumeBar && e.volumeBar.length && e.volumeBar.updateSliderVal(e.opt.vol > 10 ? e.opt.vol : 10);
                var t = jQuery("#controlBar_" + e.id),
                    o = t.find(".mb_YTPMuteUnmute");
                o.html(jQuery.mbYTPlayer.controls.mute), jQuery(e).removeClass("isMuted"), e.volumeBar && e.volumeBar.length && e.volumeBar.removeClass("muted");
                var i = jQuery.Event("YTPUnmuted");
                return i.time = e.player.time, e.canTrigger && jQuery(e).trigger(i), this
            }
        },
        applyFilter: function (e, t) {
            var o = this.get(0);
            return o.filters[e].value = t, o.filtersEnabled && this.YTPEnableFilters(), this
        },
        applyFilters: function (e) {
            var t = this.get(0);
            return this.on("YTPReady", function () {
                for (var o in e) t.filters[o].value = e[o], jQuery(t).YTPApplyFilter(o, e[o]);
                jQuery(t).trigger("YTPFiltersApplied")
            }), this
        },
        toggleFilter: function (e, t) {
            return this.each(function () {
                var o = this;
                o.filters[e].value ? o.filters[e].value = 0 : o.filters[e].value = t, o.filtersEnabled && jQuery(this).YTPEnableFilters()
            })
        },
        toggleFilters: function (e) {
            return this.each(function () {
                var t = this;
                t.filtersEnabled ? (jQuery(t).trigger("YTPDisableFilters"), jQuery(t).YTPDisableFilters()) : (jQuery(t).YTPEnableFilters(), jQuery(t).trigger("YTPEnableFilters")), "function" == typeof e && e(t.filtersEnabled)
            })
        },
        disableFilters: function () {
            return this.each(function () {
                var e = this,
                    t = jQuery(e.playerEl);
                t.css("-webkit-filter", ""), t.css("filter", ""), e.filtersEnabled = !1
            })
        },
        enableFilters: function () {
            return this.each(function () {
                var e = this,
                    t = jQuery(e.playerEl),
                    o = "";
                for (var i in e.filters) e.filters[i].value && (o += i.replace("_", "-") + "(" + e.filters[i].value + e.filters[i].unit + ") ");
                t.css("-webkit-filter", o), t.css("filter", o), e.filtersEnabled = !0
            })
        },
        removeFilter: function (e, t) {
            return this.each(function () {
                "function" == typeof e && (t = e, e = null);
                var o = this;
                if (e) jQuery(this).YTPApplyFilter(e, 0), "function" == typeof t && t(e);
                else
                    for (var i in o.filters) jQuery(this).YTPApplyFilter(i, 0), "function" == typeof t && t(i)
            })
        },
        manageProgress: function () {
            var e = this.get(0),
                t = jQuery("#controlBar_" + e.id),
                o = t.find(".mb_YTPProgress"),
                i = t.find(".mb_YTPLoaded"),
                r = t.find(".mb_YTPseekbar"),
                n = o.outerWidth(),
                s = Math.floor(e.player.getCurrentTime()),
                a = Math.floor(e.player.getDuration()),
                l = s * n / a,
                u = 0,
                p = 100 * e.player.getVideoLoadedFraction();
            return i.css({
                left: u,
                width: p + "%"
            }), r.css({
                left: 0,
                width: l
            }), {
                totalTime: a,
                currentTime: s
            }
        },
        buildControls: function (YTPlayer) {
            var data = YTPlayer.opt;
            if (data.showYTLogo = data.showYTLogo || data.printUrl, !jQuery("#controlBar_" + YTPlayer.id).length) {
                YTPlayer.controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
                    whiteSpace: "noWrap",
                    position: YTPlayer.isBackground ? "fixed" : "absolute",
                    zIndex: YTPlayer.isBackground ? 1e4 : 1e3
                }).hide();
                var buttonBar = jQuery("<div/>").addClass("buttonBar"),
                    playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function () {
                        1 == YTPlayer.player.getPlayerState() ? jQuery(YTPlayer).YTPPause() : jQuery(YTPlayer).YTPPlay()
                    }),
                    MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function () {
                        0 == YTPlayer.player.getVolume() ? jQuery(YTPlayer).YTPUnmute() : jQuery(YTPlayer).YTPMute()
                    }),
                    volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({
                        display: "inline-block"
                    });
                YTPlayer.volumeBar = volumeBar;
                var idx = jQuery("<span/>").addClass("mb_YTPTime"),
                    vURL = data.videoURL ? data.videoURL : "";
                vURL.indexOf("http") < 0 && (vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL);
                var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
                        window.open(vURL, "viewOnYT")
                    }),
                    onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function () {
                        jQuery(YTPlayer).YTPFullscreen(data.realfullscreen)
                    }),
                    progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function (e) {
                        timeBar.css({
                            width: e.clientX - timeBar.offset().left
                        }), YTPlayer.timeW = e.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({
                            width: 0
                        });
                        var t = Math.floor(YTPlayer.player.getDuration());
                        YTPlayer["goto"] = timeBar.outerWidth() * t / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer["goto"]), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({
                            width: 0
                        })
                    }),
                    loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
                    timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
                progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), data.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({
                    initialval: YTPlayer.opt.vol,
                    scale: 100,
                    orientation: "h",
                    callback: function (e) {
                        0 == e.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(e.value), YTPlayer.isMute || (YTPlayer.opt.vol = e.value)
                    }
                })
            }
        },
        checkForState: function (YTPlayer) {
            var interval = YTPlayer.opt.showControls ? 100 : 700;
            return clearInterval(YTPlayer.getState), jQuery.contains(document, YTPlayer) ? (jQuery.mbYTPlayer.checkForStart(YTPlayer), void(YTPlayer.getState = setInterval(function () {
                var prog = jQuery(YTPlayer).YTPManageProgress(),
                    $YTPlayer = jQuery(YTPlayer),
                    data = YTPlayer.opt,
                    startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 0,
                    stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
                if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.player.time != prog.currentTime) {
                    var YTPEvent = jQuery.Event("YTPTime");
                    YTPEvent.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(YTPEvent)
                }
                if (YTPlayer.player.time = prog.currentTime, 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && YTPlayer.controlBar.find(".mb_YTPTime").html(prog.totalTime ? jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime) : "-- : -- / -- : --"), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, $YTPlayer.YTPPause())), YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), 1 == YTPlayer.player.getPlayerState() && (parseFloat(YTPlayer.player.getDuration() - 1.5) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt)) {
                    if (YTPlayer.isEnded) return;
                    if (YTPlayer.isEnded = !0, setTimeout(function () {
                            YTPlayer.isEnded = !1
                        }, 1e3), YTPlayer.isPlayList) {
                        clearInterval(YTPlayer.getState);
                        var YTPEnd = jQuery.Event("YTPEnd");
                        return YTPEnd.time = YTPlayer.player.time, void jQuery(YTPlayer).trigger(YTPEnd)
                    }
                    data.loop ? (startAt = startAt || 1, YTPlayer.player.pauseVideo(), YTPlayer.player.seekTo(startAt, !0), $YTPlayer.YTPPlay()) : (YTPlayer.player.pauseVideo(), YTPlayer.wrapper.CSSAnimate({
                        opacity: 0
                    }, 1e3, function () {
                        var e = jQuery.Event("YTPEnd");
                        e.time = YTPlayer.player.time, jQuery(YTPlayer).trigger(e), YTPlayer.player.seekTo(startAt, !0), YTPlayer.isBackground || YTPlayer.opt.containment.css({
                            background: "rgba(0,0,0,0.5) url(" + YTPlayer.opt.backgroundUrl + ") center center",
                            backgroundSize: "cover"
                        })
                    }))
                }
            }, interval))) : (jQuery(YTPlayer).YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt))
        },
        checkForStart: function (e) {
            var t = jQuery(e);
            if (!jQuery.contains(document, e)) return void jQuery(e).YTPPlayerDestroy();
            if (jQuery.browser.chrome && (e.opt.quality = "default"), e.player.pauseVideo(), jQuery(e).muteYTPVolume(), jQuery("#controlBar_" + e.id).remove(), e.opt.showControls && jQuery.mbYTPlayer.buildControls(e), e.opt.addRaster) {
                var o = "dot" == e.opt.addRaster ? "raster-dot" : "raster";
                e.overlay.addClass(e.isRetina ? o + " retina" : o)
            } else e.overlay.removeClass(function (e, t) {
                var o = t.split(" "),
                    i = [];
                return jQuery.each(o, function (e, t) {
                    /raster.*/.test(t) && i.push(t)
                }), i.push("retina"), i.join(" ")
            });
            e.checkForStartAt = setInterval(function () {
                jQuery(e).YTPMute();
                var o = e.opt.startAt ? e.opt.startAt : 1,
                    i = e.player.getVideoLoadedFraction() > o / e.player.getDuration();
                if (e.player.getDuration() > 0 && e.player.getCurrentTime() >= o && i) {
                    clearInterval(e.checkForStartAt), e.isReady = !0, "function" == typeof e.opt.onReady && e.opt.onReady(e);
                    var r = jQuery.Event("YTPReady");
                    jQuery(e).trigger(r), e.player.pauseVideo(), e.opt.mute || jQuery(e).YTPUnmute(), e.canTrigger = !0, e.opt.autoPlay ? (t.YTPPlay(), t.css("background-image", "none"), jQuery(e.playerEl).CSSAnimate({
                        opacity: 1
                    }, 1e3), e.wrapper.CSSAnimate({
                        opacity: e.isAlone ? 1 : e.opt.opacity
                    }, 1e3)) : (e.player.pauseVideo(), e.isPlayer || (jQuery(e.playerEl).CSSAnimate({
                        opacity: 1
                    }, 1e3), e.wrapper.CSSAnimate({
                        opacity: e.isAlone ? 1 : e.opt.opacity
                    }, 1e3))), e.isPlayer && !e.opt.autoPlay && (e.loading.html("Ready"), setTimeout(function () {
                        e.loading.fadeOut()
                    }, 100)), e.controlBar && e.controlBar.slideDown(1e3)
                } else o >= 0 && e.player.seekTo(o, !0)
            }, 1e3)
        },
        formatTime: function (e) {
            var t = Math.floor(e / 60),
                o = Math.floor(e - 60 * t);
            return (9 >= t ? "0" + t : t) + " : " + (9 >= o ? "0" + o : o)
        }
    }, jQuery.fn.toggleVolume = function () {
        var e = this.get(0);
        if (e) return e.player.isMuted() ? (jQuery(e).YTPUnmute(), !0) : (jQuery(e).YTPMute(), !1)
    }, jQuery.fn.optimizeDisplay = function () {
        var e = this.get(0),
            t = e.opt,
            o = jQuery(e.playerEl),
            i = {},
            r = e.wrapper;
        i.width = r.outerWidth(), i.height = r.outerHeight();
        var n = 24,
            s = 100,
            a = {};
        t.optimizeDisplay ? (a.width = i.width + i.width * n / 100, a.height = Math.ceil("16/9" == t.ratio ? 9 * i.width / 16 : 3 * i.width / 4), a.marginTop = -((a.height - i.height) / 2), a.marginLeft = -(i.width * (n / 2) / 100), a.height < i.height && (a.height = i.height + i.height * n / 100, a.width = Math.floor("16/9" == t.ratio ? 16 * i.height / 9 : 4 * i.height / 3), a.marginTop = -(i.height * (n / 2) / 100), a.marginLeft = -((a.width - i.width) / 2)), a.width += s, a.height += s, a.marginTop -= s / 2, a.marginLeft -= s / 2) : (a.width = "100%", a.height = "100%", a.marginTop = 0, a.marginLeft = 0), o.css({
            width: a.width,
            height: a.height,
            marginTop: a.marginTop,
            marginLeft: a.marginLeft
        })
    }, jQuery.shuffle = function (e) {
        for (var t = e.slice(), o = t.length, i = o; i--;) {
            var r = parseInt(Math.random() * o),
                n = t[i];
            t[i] = t[r], t[r] = n
        }
        return t
    }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.playNext = jQuery.mbYTPlayer.playNext, jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls, jQuery.fn.playYTP = jQuery.mbYTPlayer.play, jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop, jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause, jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo, jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute, jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute, jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData
}(jQuery, ytp), jQuery.support.CSStransition = function () {
    var e = document.body || document.documentElement,
        t = e.style;
    return void 0 !== t.transition || void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.MsTransition || void 0 !== t.OTransition
}(), jQuery.CSS = {
    name: "mb.CSSAnimate",
    author: "Matteo Bicocchi",
    version: "2.0.0",
    transitionEnd: "transitionEnd",
    sfx: "",
    filters: {
        blur: {
            min: 0,
            max: 100,
            unit: "px"
        },
        brightness: {
            min: 0,
            max: 400,
            unit: "%"
        },
        contrast: {
            min: 0,
            max: 400,
            unit: "%"
        },
        grayscale: {
            min: 0,
            max: 100,
            unit: "%"
        },
        hueRotate: {
            min: 0,
            max: 360,
            unit: "deg"
        },
        invert: {
            min: 0,
            max: 100,
            unit: "%"
        },
        saturate: {
            min: 0,
            max: 400,
            unit: "%"
        },
        sepia: {
            min: 0,
            max: 100,
            unit: "%"
        }
    },
    normalizeCss: function (e) {
        var t = jQuery.extend(!0, {}, e);
        jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-");
        for (var o in t) {
            "transform" === o && (t[jQuery.CSS.sfx + "transform"] = t[o], delete t[o]), "transform-origin" === o && (t[jQuery.CSS.sfx + "transform-origin"] = e[o], delete t[o]), "filter" !== o || jQuery.browser.mozilla || (t[jQuery.CSS.sfx + "filter"] = e[o], delete t[o]), "blur" === o && setFilter(t, "blur", e[o]), "brightness" === o && setFilter(t, "brightness", e[o]), "contrast" === o && setFilter(t, "contrast", e[o]), "grayscale" === o && setFilter(t, "grayscale", e[o]), "hueRotate" === o && setFilter(t, "hueRotate", e[o]), "invert" === o && setFilter(t, "invert", e[o]), "saturate" === o && setFilter(t, "saturate", e[o]),
            "sepia" === o && setFilter(t, "sepia", e[o]);
            var i = "";
            "x" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " translateX(" + setUnit(e[o], "px") + ")", delete t[o]), "y" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " translateY(" + setUnit(e[o], "px") + ")", delete t[o]), "z" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " translateZ(" + setUnit(e[o], "px") + ")", delete t[o]), "rotate" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotate(" + setUnit(e[o], "deg") + ")", delete t[o]), "rotateX" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotateX(" + setUnit(e[o], "deg") + ")", delete t[o]), "rotateY" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotateY(" + setUnit(e[o], "deg") + ")", delete t[o]), "rotateZ" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotateZ(" + setUnit(e[o], "deg") + ")", delete t[o]), "scale" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scale(" + setUnit(e[o], "") + ")", delete t[o]), "scaleX" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scaleX(" + setUnit(e[o], "") + ")", delete t[o]), "scaleY" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scaleY(" + setUnit(e[o], "") + ")", delete t[o]), "scaleZ" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scaleZ(" + setUnit(e[o], "") + ")", delete t[o]), "skew" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " skew(" + setUnit(e[o], "deg") + ")", delete t[o]), "skewX" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " skewX(" + setUnit(e[o], "deg") + ")", delete t[o]), "skewY" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " skewY(" + setUnit(e[o], "deg") + ")", delete t[o]), "perspective" === o && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " perspective(" + setUnit(e[o], "px") + ")", delete t[o])
        }
        return t
    },
    getProp: function (e) {
        var t = [];
        for (var o in e) t.indexOf(o) < 0 && t.push(uncamel(o));
        return t.join(",")
    },
    animate: function (e, t, o, i, r) {
        return this.each(function () {
            function n() {
                s.called = !0, s.CSSAIsRunning = !1, a.off(jQuery.CSS.transitionEnd + "." + s.id), clearTimeout(s.timeout), a.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof r && r.apply(s), "function" == typeof s.CSSqueue && (s.CSSqueue(), s.CSSqueue = null)
            }

            var s = this,
                a = jQuery(this);
            s.id = s.id || "CSSA_" + (new Date).getTime();
            var l = l || {
                    type: "noEvent"
                };
            if (s.CSSAIsRunning && s.eventType == l.type && !jQuery.browser.msie && jQuery.browser.version <= 9) return void(s.CSSqueue = function () {
                a.CSSAnimate(e, t, o, i, r)
            });
            if (s.CSSqueue = null, s.eventType = l.type, 0 !== a.length && e) {
                if (e = jQuery.normalizeCss(e), s.CSSAIsRunning = !0, "function" == typeof t && (r = t, t = jQuery.fx.speeds._default), "function" == typeof o && (i = o, o = 0), "string" == typeof o && (r = o, o = 0), "function" == typeof i && (r = i, i = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof t)
                    for (var u in jQuery.fx.speeds) {
                        if (t == u) {
                            t = jQuery.fx.speeds[u];
                            break
                        }
                        t = jQuery.fx.speeds._default
                    }
                if (t || (t = jQuery.fx.speeds._default), "string" == typeof r && (i = r, r = null), !jQuery.support.CSStransition) {
                    for (var p in e) {
                        if ("transform" === p && delete e[p], "filter" === p && delete e[p], "transform-origin" === p && delete e[p], "auto" === e[p] && delete e[p], "x" === p) {
                            var m = e[p],
                                c = "left";
                            e[c] = m, delete e[p]
                        }
                        if ("y" === p) {
                            var m = e[p],
                                c = "top";
                            e[c] = m, delete e[p]
                        }
                        ("-ms-transform" === p || "-ms-filter" === p) && delete e[p]
                    }
                    return void a.delay(o).animate(e, t, r)
                }
                var d = {
                    "default": "ease",
                    "in": "ease-in",
                    out: "ease-out",
                    "in-out": "ease-in-out",
                    snap: "cubic-bezier(0,1,.5,1)",
                    easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                    easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                    easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                    easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                    easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                    easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                    easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                    easeInOutExpo: "cubic-bezier(1,0,0,1)",
                    easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                    easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                    easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                    easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                    easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                    easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                    easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                    easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                    easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                    easeInSine: "cubic-bezier(.47,0,.745,.715)",
                    easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                    easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                    easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                    easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
                    easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
                };
                d[i] && (i = d[i]), a.off(jQuery.CSS.transitionEnd + "." + s.id);
                var f = jQuery.CSS.getProp(e),
                    y = {};
                jQuery.extend(y, e), y[jQuery.CSS.sfx + "transition-property"] = f, y[jQuery.CSS.sfx + "transition-duration"] = t + "ms", y[jQuery.CSS.sfx + "transition-delay"] = o + "ms", y[jQuery.CSS.sfx + "transition-timing-function"] = i, setTimeout(function () {
                    a.one(jQuery.CSS.transitionEnd + "." + s.id, n), a.css(y)
                }, 1), s.timeout = setTimeout(function () {
                    return s.called || !r ? (s.called = !1, void(s.CSSAIsRunning = !1)) : (a.css(jQuery.CSS.sfx + "transition", ""), r.apply(s), s.CSSAIsRunning = !1, void("function" == typeof s.CSSqueue && (s.CSSqueue(), s.CSSqueue = null)))
                }, t + o + 10)
            }
        })
    }
}, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function (e) {
    return this.each(function () {
        var t = jQuery(this),
            o = jQuery.normalizeCss(e);
        t.css(o)
    })
};
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
    jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.msie = !1, jQuery.browser.ua = nAgt, jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8));
    else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4);
    else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
    else if (-1 != nAgt.indexOf("Trident")) {
        jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
        var start = nAgt.indexOf("rv:") + 3,
            end = start + 4;
        jQuery.browser.fullVersion = nAgt.substring(start, end)
    } else -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));
    -1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion
}
jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && jQuery(window).width() > 765, jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt), !function (e) {
    /iphone|ipod|ipad|android|ie|blackberry|fennec/.test(navigator.userAgent.toLowerCase());
    var t = "ontouchstart" in window || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch || !1;
    e.simpleSlider = {
        defaults: {
            initialval: 0,
            scale: 100,
            orientation: "h",
            readonly: !1,
            callback: !1
        },
        events: {
            start: t ? "touchstart" : "mousedown",
            end: t ? "touchend" : "mouseup",
            move: t ? "touchmove" : "mousemove"
        },
        init: function (o) {
            return this.each(function () {
                var i = this,
                    r = e(i);
                r.addClass("simpleSlider"), i.opt = {}, e.extend(i.opt, e.simpleSlider.defaults, o), e.extend(i.opt, r.data());
                var n = "h" == i.opt.orientation ? "horizontal" : "vertical",
                    s = e("<div/>").addClass("level").addClass(n);
                r.prepend(s), i.level = s, r.css({
                    cursor: "default"
                }), "auto" == i.opt.scale && (i.opt.scale = e(i).outerWidth()), r.updateSliderVal(), i.opt.readonly || (r.on(e.simpleSlider.events.start, function (e) {
                    t && (e = e.changedTouches[0]), i.canSlide = !0, r.updateSliderVal(e), r.css({
                        cursor: "col-resize"
                    }), e.preventDefault(), e.stopPropagation()
                }), e(document).on(e.simpleSlider.events.move, function (o) {
                    t && (o = o.changedTouches[0]), i.canSlide && (e(document).css({
                        cursor: "default"
                    }), r.updateSliderVal(o), o.preventDefault(), o.stopPropagation())
                }).on(e.simpleSlider.events.end, function () {
                    e(document).css({
                        cursor: "auto"
                    }), i.canSlide = !1, r.css({
                        cursor: "auto"
                    })
                }))
            })
        },
        updateSliderVal: function (t) {
            function o(e, t) {
                return Math.floor(100 * e / t)
            }

            var i = this,
                r = i.get(0);
            r.opt.initialval = "number" == typeof r.opt.initialval ? r.opt.initialval : r.opt.initialval(r);
            var n = e(r).outerWidth(),
                s = e(r).outerHeight();
            r.x = "object" == typeof t ? t.clientX + document.body.scrollLeft - i.offset().left : "number" == typeof t ? t * n / r.opt.scale : r.opt.initialval * n / r.opt.scale, r.y = "object" == typeof t ? t.clientY + document.body.scrollTop - i.offset().top : "number" == typeof t ? (r.opt.scale - r.opt.initialval - t) * s / r.opt.scale : r.opt.initialval * s / r.opt.scale, r.y = i.outerHeight() - r.y, r.scaleX = r.x * r.opt.scale / n, r.scaleY = r.y * r.opt.scale / s, r.outOfRangeX = r.scaleX > r.opt.scale ? r.scaleX - r.opt.scale : r.scaleX < 0 ? r.scaleX : 0, r.outOfRangeY = r.scaleY > r.opt.scale ? r.scaleY - r.opt.scale : r.scaleY < 0 ? r.scaleY : 0, r.outOfRange = "h" == r.opt.orientation ? r.outOfRangeX : r.outOfRangeY, r.value = "undefined" != typeof t ? "h" == r.opt.orientation ? r.x >= i.outerWidth() ? r.opt.scale : r.x <= 0 ? 0 : r.scaleX : r.y >= i.outerHeight() ? r.opt.scale : r.y <= 0 ? 0 : r.scaleY : "h" == r.opt.orientation ? r.scaleX : r.scaleY, "h" == r.opt.orientation ? r.level.width(o(r.x, n) + "%") : r.level.height(o(r.y, s)), "function" == typeof r.opt.callback && r.opt.callback(r)
        }
    }, e.fn.simpleSlider = e.simpleSlider.init, e.fn.updateSliderVal = e.simpleSlider.updateSliderVal
}(jQuery), !function (e) {
    e.mbCookie = {
        set: function (e, t, o, i) {
            t = JSON.stringify(t), o || (o = 7), i = i ? "; domain=" + i : "";
            var r, n = new Date;
            n.setTime(n.getTime() + 864e5 * o), r = "; expires=" + n.toGMTString(), document.cookie = e + "=" + t + r + "; path=/" + i
        },
        get: function (e) {
            for (var t = e + "=", o = document.cookie.split(";"), i = 0; i < o.length; i++) {
                for (var r = o[i];
                     " " == r.charAt(0);) r = r.substring(1, r.length);
                if (0 == r.indexOf(t)) return JSON.parse(r.substring(t.length, r.length))
            }
            return null
        },
        remove: function (t) {
            e.mbCookie.set(t, "", -1)
        }
    }, e.mbStorage = {
        set: function (e, t) {
            t = JSON.stringify(t), localStorage.setItem(e, t)
        },
        get: function (e) {
            return localStorage[e] ? JSON.parse(localStorage[e]) : null
        },
        remove: function (e) {
            e ? localStorage.removeItem(e) : localStorage.clear()
        }
    }
}(jQuery);

/**
 * kenburnsy - Easy to use JQuery plugin to make slideshows with Ken Burns effect
 * @version v0.0.5
 * @link https://github.com/ZeroOneStudio/kenburnsy
 * @license MIT
 */

!function (t, e, i, n) {
    function s(e, i) {
        this.el = e, this.$el = t(e), this.settings = t.extend({}, o, i), this._defaults = o, this._name = a, this._slides = [], this.currentIndex = 0, this.init()
    }

    var a = "kenburnsy",
        o = {
            fullscreen: !1,
            duration: 9e3,
            fadeInDuration: 1500,
            height: null
        },
        r = {
            zoomOut: function (e, i) {
                t(e).velocity({
                    rotateZ: "3deg",
                    scale: "1.1"
                }, 0).velocity({
                    translateZ: 0,
                    rotateZ: "0deg",
                    scale: "1"
                }, i)
            },
            zoomIn: function (e, i) {
                t(e).velocity({
                    rotateZ: "0deg",
                    scale: "1"
                }, 0).velocity({
                    translateZ: 0,
                    rotateZ: "3deg",
                    scale: "1.1"
                }, i)
            }
        },
        c = function (e) {
            var i = function (t) {
                function i() {
                    s(), setTimeout(function () {
                        t.resolve(a)
                    })
                }

                function n() {
                    s(), t.rejectWith(a)
                }

                function s() {
                    a.onload = null, a.onerror = null, a.onabort = null
                }

                var a = new Image;
                a.onload = i, a.onerror = n, a.onabort = n, a.src = e
            };
            return t.Deferred(i).promise()
        };
    Object.keys || (Object.keys = function (t) {
        if (t !== Object(t)) throw new TypeError("Object.keys called on a non-object");
        var e, i = [];
        for (e in t) Object.prototype.hasOwnProperty.call(t, e) && i.push(e);
        return i
    }), t.extend(s.prototype, {
        init: function () {
            var e, i = this.settings,
                n = this;
            e = this.$el.children().map(function (t, e) {
                return e.src
            }), this.$el.addClass(function () {
                var t = [a];
                return i.fullscreen && t.push("fullscreen"), t.join(" ")
            }), t.when.apply(t, t.map(e, c)).done(function () {
                var t = Array.prototype.slice.call(arguments);
                n.buildScene(t)
            })
        },
        reveal: function (e) {
            var i = this._slides[e],
                n = this.$el;
            t(i).velocity({
                opacity: 0
            }, 0, function () {
                t(this).appendTo(n)
            }).velocity({
                opacity: 1,
                translateZ: 0
            }, {
                duration: this.settings.fadeInDuration,
                queue: !1
            })
        },
        animate: function (t) {
            var e = Object.keys(r),
                i = r[e[Math.floor(e.length * Math.random())]],
                n = this.settings.duration,
                s = this._slides[t];
            i(s, n)
        },
        show: function (t) {
            this.reveal(t), this.animate(t)
        },
        next: function () {
            this.currentIndex = 0 === this.currentIndex ? this._slides.length - 1 : this.currentIndex - 1, this.show(this.currentIndex)
        },
        addSlides: function (e) {
            var n = this.el;
            return t.map(e.reverse(), function (t) {
                var e = i.createElement("div");
                return e.style.backgroundImage = "url(" + t.src + ")", e.className = "slide", n.appendChild(e), e
            })
        },
        buildScene: function (t) {
            var e = this,
                i = this.settings;
            this.el.innerHTML = "", this._slides = this.addSlides(t), this.currentIndex = t.length - 1, i.fullscreen || (this.el.style.height = this.settings.height || t[this.currentIndex].height + "px"), this.animate(this.currentIndex), setInterval(function () {
                e.next()
            }, i.duration - i.fadeInDuration)
        }
    }), t.fn[a] = function (e) {
        return this.each(function () {
            t.data(this, "plugin_" + a) || t.data(this, "plugin_" + a, new s(this, e))
        }), this
    }
}(jQuery, window, document);
!function (t, e, n, i) {
    function s(e, n) {
        this.el = e, this.$el = t(e), this.settings = t.extend({}, o, n), this._defaults = o, this._name = a, this._slides = [], this.currentIndex = 0, this.init()
    }

    var a = "ss",
        o = {
            fullscreen: !1,
            duration: 9e3,
            fadeInDuration: 1500,
            height: null
        },
        r = {
            zoomOut: function (e, n) {
                t(e).velocity({
                    translateZ: 0
                }, 0).velocity({
                    translateZ: 0
                }, n)
            },
            zoomIn: function (e, n) {
                t(e).velocity({
                    translateZ: 0
                }, 0).velocity({
                    translateZ: 0
                }, n)
            }
        },
        c = function (e) {
            var n = function (t) {
                function n() {
                    s(), setTimeout(function () {
                        t.resolve(a)
                    })
                }

                function i() {
                    s(), t.rejectWith(a)
                }

                function s() {
                    a.onload = null, a.onerror = null, a.onabort = null
                }

                var a = new Image;
                a.onload = n, a.onerror = i, a.onabort = i, a.src = e
            };
            return t.Deferred(n).promise()
        };
    Object.keys || (Object.keys = function (t) {
        if (t !== Object(t)) throw new TypeError("Object.keys called on a non-object");
        var e, n = [];
        for (e in t) Object.prototype.hasOwnProperty.call(t, e) && n.push(e);
        return n
    }), t.extend(s.prototype, {
        init: function () {
            var e, n = this.settings,
                i = this;
            e = this.$el.children().map(function (t, e) {
                return e.src
            }), this.$el.addClass(function () {
                var t = [a];
                return n.fullscreen && t.push("fullscreen"), t.join(" ")
            }), t.when.apply(t, t.map(e, c)).done(function () {
                var t = Array.prototype.slice.call(arguments);
                i.buildScene(t)
            })
        },
        reveal: function (e) {
            var n = this._slides[e],
                i = this.$el;
            t(n).velocity({
                opacity: 0
            }, 0, function () {
                t(this).appendTo(i)
            }).velocity({
                opacity: 1,
                translateZ: 0
            }, {
                duration: this.settings.fadeInDuration,
                queue: !1
            })
        },
        animate: function (t) {
            var e = Object.keys(r),
                n = r[e[Math.floor(e.length * Math.random())]],
                i = this.settings.duration,
                s = this._slides[t];
            n(s, i)
        },
        show: function (t) {
            this.reveal(t), this.animate(t)
        },
        next: function () {
            this.currentIndex = 0 === this.currentIndex ? this._slides.length - 1 : this.currentIndex - 1, this.show(this.currentIndex)
        },
        addSlides: function (e) {
            var i = this.el;
            return t.map(e.reverse(), function (t) {
                var e = n.createElement("div");
                return e.style.backgroundImage = "url(" + t.src + ")", e.className = "slide", i.appendChild(e), e
            })
        },
        buildScene: function (t) {
            var e = this,
                n = this.settings;
            this.el.innerHTML = "", this._slides = this.addSlides(t), this.currentIndex = t.length - 1, n.fullscreen || (this.el.style.height = this.settings.height || t[this.currentIndex].height + "px"), this.animate(this.currentIndex), setInterval(function () {
                e.next()
            }, n.duration - n.fadeInDuration)
        }
    }), t.fn[a] = function (e) {
        return this.each(function () {
            t.data(this, "plugin_" + a) || t.data(this, "plugin_" + a, new s(this, e))
        }), this
    }
}(jQuery, window, document);

/*!
 * jQuery Countdown plugin v1.0
 * http://www.littlewebthings.com/projects/countdown/
 *
 * Copyright 2010, Vassilis Dourdounis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

!function (a) {
    a.fn.countDown = function (t) {
        return config = {}, a.extend(config, t), diffSecs = this.setCountDown(config), config.onComplete && a.data(a(this)[0], "callback", config.onComplete), config.omitWeeks && a.data(a(this)[0], "omitWeeks", config.omitWeeks), a("#" + a(this).attr("id") + " .digit").html('<div class="top"></div><div class="bottom"></div>'), a(this).doCountDown(a(this).attr("id"), diffSecs, 500), this
    }, a.fn.stopCountDown = function () {
        clearTimeout(a.data(this[0], "timer"))
    }, a.fn.startCountDown = function () {
        this.doCountDown(a(this).attr("id"), a.data(this[0], "diffSecs"), 500)
    }, a.fn.setCountDown = function (t) {
        var e = new Date;
        t.targetDate ? e = new Date(t.targetDate.month + "/" + t.targetDate.day + "/" + t.targetDate.year + " " + t.targetDate.hour + ":" + t.targetDate.min + ":" + t.targetDate.sec + (t.targetDate.utc ? " UTC" : "")) : t.targetOffset && (e.setFullYear(t.targetOffset.year + e.getFullYear()), e.setMonth(t.targetOffset.month + e.getMonth()), e.setDate(t.targetOffset.day + e.getDate()), e.setHours(t.targetOffset.hour + e.getHours()), e.setMinutes(t.targetOffset.min + e.getMinutes()), e.setSeconds(t.targetOffset.sec + e.getSeconds()));
        var s = new Date;
        return diffSecs = Math.floor((e.valueOf() - s.valueOf()) / 1e3), a.data(this[0], "diffSecs", diffSecs), diffSecs
    }, a.fn.doCountDown = function (s, i, o) {
        $this = a("#" + s), 0 >= i && (i = 0, a.data($this[0], "timer") && clearTimeout(a.data($this[0], "timer"))), secs = i % 60, mins = Math.floor(i / 60) % 60, hours = Math.floor(i / 60 / 60) % 24, 1 == a.data($this[0], "omitWeeks") ? (days = Math.floor(i / 60 / 60 / 24), weeks = Math.floor(i / 60 / 60 / 24 / 7)) : (days = Math.floor(i / 60 / 60 / 24) % 7, weeks = Math.floor(i / 60 / 60 / 24 / 7)), $this.dashChangeTo(s, "seconds_dash", secs, o ? o : 800), $this.dashChangeTo(s, "minutes_dash", mins, o ? o : 1200), $this.dashChangeTo(s, "hours_dash", hours, o ? o : 1200), $this.dashChangeTo(s, "days_dash", days, o ? o : 1200), $this.dashChangeTo(s, "weeks_dash", weeks, o ? o : 1200), a.data($this[0], "diffSecs", i), i > 0 ? (e = $this, t = setTimeout(function () {
            e.doCountDown(s, i - 1)
        }, 1e3), a.data(e[0], "timer", t)) : (cb = a.data($this[0], "callback")) && a.data($this[0], "callback")()
    }, a.fn.dashChangeTo = function (t, e, s, i) {
        $this = a("#" + t);
        for (var o = $this.find("." + e + " .digit").length - 1; o >= 0; o--) {
            var n = s % 10;
            s = (s - n) / 10, $this.digitChangeTo("#" + $this.attr("id") + " ." + e + " .digit:eq(" + o + ")", n, i)
        }
    }, a.fn.digitChangeTo = function (t, e, s) {
        s || (s = 800), a(t + " div.top").html() != e + "" && (a(t + " div.top").css({
            display: "block"
        }), a(t + " div.top").html(e ? e : "0").slideDown(s))
    }
}(jQuery);

/*!
 * Device.js
 * (c) 2014 Matthew Hudson
 * Device.js is freely distributable under the MIT license.
 * For all details and documentation:
 * http://matthewhudson.me/projects/device.js/
 */

(function () {
    var t, e, n, r, o, i, a, l, s, c;
    e = window.device, t = {}, window.device = t, r = window.document.documentElement, c = window.navigator.userAgent.toLowerCase(), t.ios = function () {
        return t.iphone() || t.ipod() || t.ipad()
    }, t.iphone = function () {
        return !t.windows() && o("iphone")
    }, t.ipod = function () {
        return o("ipod")
    }, t.ipad = function () {
        return o("ipad")
    }, t.android = function () {
        return !t.windows() && o("android")
    }, t.androidPhone = function () {
        return t.android() && o("mobile")
    }, t.androidTablet = function () {
        return t.android() && !o("mobile")
    }, t.blackberry = function () {
        return o("blackberry") || o("bb10") || o("rim")
    }, t.blackberryPhone = function () {
        return t.blackberry() && !o("tablet")
    }, t.blackberryTablet = function () {
        return t.blackberry() && o("tablet")
    }, t.windows = function () {
        return o("windows")
    }, t.windowsPhone = function () {
        return t.windows() && o("phone")
    }, t.windowsTablet = function () {
        return t.windows() && o("touch") && !t.windowsPhone()
    }, t.fxos = function () {
        return (o("(mobile;") || o("(tablet;")) && o("; rv:")
    }, t.fxosPhone = function () {
        return t.fxos() && o("mobile")
    }, t.fxosTablet = function () {
        return t.fxos() && o("tablet")
    }, t.meego = function () {
        return o("meego")
    }, t.cordova = function () {
        return window.cordova && "file:" === location.protocol
    }, t.nodeWebkit = function () {
        return "object" == typeof window.process
    }, t.mobile = function () {
        return t.androidPhone() || t.iphone() || t.ipod() || t.windowsPhone() || t.blackberryPhone() || t.fxosPhone() || t.meego()
    }, t.tablet = function () {
        return t.ipad() || t.androidTablet() || t.blackberryTablet() || t.windowsTablet() || t.fxosTablet()
    }, t.desktop = function () {
        return !t.tablet() && !t.mobile()
    }, t.television = function () {
        var t;
        for (television = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"], t = 0; t < television.length;) {
            if (o(television[t])) return !0;
            t++
        }
        return !1
    }, t.portrait = function () {
        return window.innerHeight / window.innerWidth > 1
    }, t.landscape = function () {
        return window.innerHeight / window.innerWidth < 1
    }, t.noConflict = function () {
        return window.device = e, this
    }, o = function (t) {
        return -1 !== c.indexOf(t)
    }, a = function (t) {
        var e;
        return e = new RegExp(t, "i"), r.className.match(e)
    }, n = function (t) {
        var e = null;
        a(t) || (e = r.className.replace(/^\s+|\s+$/g, ""), r.className = e + " " + t)
    }, s = function (t) {
        a(t) && (r.className = r.className.replace(" " + t, ""))
    }, t.ios() ? t.ipad() ? n("ios ipad tablet") : t.iphone() ? n("ios iphone mobile") : t.ipod() && n("ios ipod mobile") : t.android() ? n(t.androidTablet() ? "android tablet" : "android mobile") : t.blackberry() ? n(t.blackberryTablet() ? "blackberry tablet" : "blackberry mobile") : t.windows() ? n(t.windowsTablet() ? "windows tablet" : t.windowsPhone() ? "windows mobile" : "desktop") : t.fxos() ? n(t.fxosTablet() ? "fxos tablet" : "fxos mobile") : t.meego() ? n("meego mobile") : t.nodeWebkit() ? n("node-webkit") : t.television() ? n("television") : t.desktop() && n("desktop"), t.cordova() && n("cordova"), i = function () {
        t.landscape() ? (s("portrait"), n("landscape")) : (s("landscape"), n("portrait"))
    }, l = Object.prototype.hasOwnProperty.call(window, "onorientationchange") ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(l, i, !1) : window.attachEvent ? window.attachEvent(l, i) : window[l] = i, i(), "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
        return t
    }) : "undefined" != typeof module && module.exports ? module.exports = t : window.device = t
}).call(this);

/*!
 * perfect-scrollbar v0.6.7
 * Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */

!function t(e, n, r) {
    function o(a, l) {
        if (!n[a]) {
            if (!e[a]) {
                var s = "function" == typeof require && require;
                if (!l && s) return s(a, !0);
                if (i) return i(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[a] = {
                exports: {}
            };
            e[a][0].call(u.exports, function (t) {
                var n = e[a][1][t];
                return o(n ? n : t)
            }, u, u.exports, t, e, n, r)
        }
        return n[a].exports
    }

    for (var i = "function" == typeof require && require, a = 0; a < r.length; a++) o(r[a]);
    return o
}({
    1: [function (t, e, n) {
        "use strict";

        function r(t) {
            t.fn.perfectScrollbar = function (e) {
                return this.each(function () {
                    if ("object" == typeof e || "undefined" == typeof e) {
                        var n = e;
                        i.get(this) || o.initialize(this, n)
                    } else {
                        var r = e;
                        "update" === r ? o.update(this) : "destroy" === r && o.destroy(this)
                    }
                    return t(this)
                })
            }
        }

        var o = t("../main"),
            i = t("../plugin/instances");
        if ("function" == typeof define && define.amd) define(["jquery"], r);
        else {
            var a = window.jQuery ? window.jQuery : window.$;
            "undefined" != typeof a && r(a)
        }
        e.exports = r
    }, {
        "../main": 7,
        "../plugin/instances": 18
    }],
    2: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            var n = t.className.split(" ");
            n.indexOf(e) < 0 && n.push(e), t.className = n.join(" ")
        }

        function o(t, e) {
            var n = t.className.split(" "),
                r = n.indexOf(e);
            r >= 0 && n.splice(r, 1), t.className = n.join(" ")
        }

        n.add = function (t, e) {
            t.classList ? t.classList.add(e) : r(t, e)
        }, n.remove = function (t, e) {
            t.classList ? t.classList.remove(e) : o(t, e)
        }, n.list = function (t) {
            return t.classList ? Array.prototype.slice.apply(t.classList) : t.className.split(" ")
        }
    }, {}],
    3: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            return window.getComputedStyle(t)[e]
        }

        function o(t, e, n) {
            return "number" == typeof n && (n = n.toString() + "px"), t.style[e] = n, t
        }

        function i(t, e) {
            for (var n in e) {
                var r = e[n];
                "number" == typeof r && (r = r.toString() + "px"), t.style[n] = r
            }
            return t
        }

        var a = {};
        a.e = function (t, e) {
            var n = document.createElement(t);
            return n.className = e, n
        }, a.appendTo = function (t, e) {
            return e.appendChild(t), t
        }, a.css = function (t, e, n) {
            return "object" == typeof e ? i(t, e) : "undefined" == typeof n ? r(t, e) : o(t, e, n)
        }, a.matches = function (t, e) {
            return "undefined" != typeof t.matches ? t.matches(e) : "undefined" != typeof t.matchesSelector ? t.matchesSelector(e) : "undefined" != typeof t.webkitMatchesSelector ? t.webkitMatchesSelector(e) : "undefined" != typeof t.mozMatchesSelector ? t.mozMatchesSelector(e) : "undefined" != typeof t.msMatchesSelector ? t.msMatchesSelector(e) : void 0
        }, a.remove = function (t) {
            "undefined" != typeof t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
        }, a.queryChildren = function (t, e) {
            return Array.prototype.filter.call(t.childNodes, function (t) {
                return a.matches(t, e)
            })
        }, e.exports = a
    }, {}],
    4: [function (t, e, n) {
        "use strict";
        var r = function (t) {
            this.element = t, this.events = {}
        };
        r.prototype.bind = function (t, e) {
            "undefined" == typeof this.events[t] && (this.events[t] = []), this.events[t].push(e), this.element.addEventListener(t, e, !1)
        }, r.prototype.unbind = function (t, e) {
            var n = "undefined" != typeof e;
            this.events[t] = this.events[t].filter(function (r) {
                return n && r !== e ? !0 : (this.element.removeEventListener(t, r, !1), !1)
            }, this)
        }, r.prototype.unbindAll = function () {
            for (var t in this.events) this.unbind(t)
        };
        var o = function () {
            this.eventElements = []
        };
        o.prototype.eventElement = function (t) {
            var e = this.eventElements.filter(function (e) {
                return e.element === t
            })[0];
            return "undefined" == typeof e && (e = new r(t), this.eventElements.push(e)), e
        }, o.prototype.bind = function (t, e, n) {
            this.eventElement(t).bind(e, n)
        }, o.prototype.unbind = function (t, e, n) {
            this.eventElement(t).unbind(e, n)
        }, o.prototype.unbindAll = function () {
            for (var t = 0; t < this.eventElements.length; t++) this.eventElements[t].unbindAll()
        }, o.prototype.once = function (t, e, n) {
            var r = this.eventElement(t),
                o = function (t) {
                    r.unbind(e, o), n(t)
                };
            r.bind(e, o)
        }, e.exports = o
    }, {}],
    5: [function (t, e, n) {
        "use strict";
        e.exports = function () {
            function t() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }

            return function () {
                return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
            }
        }()
    }, {}],
    6: [function (t, e, n) {
        "use strict";
        var r = t("./class"),
            o = t("./dom");
        n.toInt = function (t) {
            return parseInt(t, 10) || 0
        }, n.clone = function (t) {
            if (null === t) return null;
            if ("object" == typeof t) {
                var e = {};
                for (var n in t) e[n] = this.clone(t[n]);
                return e
            }
            return t
        }, n.extend = function (t, e) {
            var n = this.clone(t);
            for (var r in e) n[r] = this.clone(e[r]);
            return n
        }, n.isEditable = function (t) {
            return o.matches(t, "input,[contenteditable]") || o.matches(t, "select,[contenteditable]") || o.matches(t, "textarea,[contenteditable]") || o.matches(t, "button,[contenteditable]")
        }, n.removePsClasses = function (t) {
            for (var e = r.list(t), n = 0; n < e.length; n++) {
                var o = e[n];
                0 === o.indexOf("ps-") && r.remove(t, o)
            }
        }, n.outerWidth = function (t) {
            return this.toInt(o.css(t, "width")) + this.toInt(o.css(t, "paddingLeft")) + this.toInt(o.css(t, "paddingRight")) + this.toInt(o.css(t, "borderLeftWidth")) + this.toInt(o.css(t, "borderRightWidth"))
        }, n.startScrolling = function (t, e) {
            r.add(t, "ps-in-scrolling"), "undefined" != typeof e ? r.add(t, "ps-" + e) : (r.add(t, "ps-x"), r.add(t, "ps-y"))
        }, n.stopScrolling = function (t, e) {
            r.remove(t, "ps-in-scrolling"), "undefined" != typeof e ? r.remove(t, "ps-" + e) : (r.remove(t, "ps-x"), r.remove(t, "ps-y"))
        }, n.env = {
            isWebKit: "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
            supportsIePointer: null !== window.navigator.msMaxTouchPoints
        }
    }, {
        "./class": 2,
        "./dom": 3
    }],
    7: [function (t, e, n) {
        "use strict";
        var r = t("./plugin/destroy"),
            o = t("./plugin/initialize"),
            i = t("./plugin/update");
        e.exports = {
            initialize: o,
            update: i,
            destroy: r
        }
    }, {
        "./plugin/destroy": 9,
        "./plugin/initialize": 17,
        "./plugin/update": 21
    }],
    8: [function (t, e, n) {
        "use strict";
        e.exports = {
            maxScrollbarLength: null,
            minScrollbarLength: null,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
            stopPropagationOnClick: !0,
            suppressScrollX: !1,
            suppressScrollY: !1,
            swipePropagation: !0,
            useBothWheelAxes: !1,
            useKeyboard: !0,
            useSelectionScroll: !1,
            wheelPropagation: !1,
            wheelSpeed: 1
        }
    }, {}],
    9: [function (t, e, n) {
        "use strict";
        var r = t("../lib/dom"),
            o = t("../lib/helper"),
            i = t("./instances");
        e.exports = function (t) {
            var e = i.get(t);
            e && (e.event.unbindAll(), r.remove(e.scrollbarX), r.remove(e.scrollbarY), r.remove(e.scrollbarXRail), r.remove(e.scrollbarYRail), o.removePsClasses(t), i.remove(t))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18
    }],
    10: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(t) {
                return t.getBoundingClientRect()
            }

            var r = window.Event.prototype.stopPropagation.bind;
            e.settings.stopPropagationOnClick && e.event.bind(e.scrollbarY, "click", r), e.event.bind(e.scrollbarYRail, "click", function (r) {
                var i = o.toInt(e.scrollbarYHeight / 2),
                    s = e.railYRatio * (r.pageY - window.scrollY - n(e.scrollbarYRail).top - i),
                    c = e.railYRatio * (e.railYHeight - e.scrollbarYHeight),
                    u = s / c;
                0 > u ? u = 0 : u > 1 && (u = 1), l(t, "top", (e.contentHeight - e.containerHeight) * u), a(t), r.stopPropagation()
            }), e.settings.stopPropagationOnClick && e.event.bind(e.scrollbarX, "click", r), e.event.bind(e.scrollbarXRail, "click", function (r) {
                var i = o.toInt(e.scrollbarXWidth / 2),
                    s = e.railXRatio * (r.pageX - window.scrollX - n(e.scrollbarXRail).left - i),
                    c = e.railXRatio * (e.railXWidth - e.scrollbarXWidth),
                    u = s / c;
                0 > u ? u = 0 : u > 1 && (u = 1), l(t, "left", (e.contentWidth - e.containerWidth) * u - e.negativeScrollAdjustment), a(t), r.stopPropagation()
            })
        }

        var o = t("../../lib/helper"),
            i = t("../instances"),
            a = t("../update-geometry"),
            l = t("../update-scroll");
        e.exports = function (t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    11: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n) {
                var o = r + n * e.railXRatio,
                    i = e.scrollbarXRail.getBoundingClientRect().left + e.railXRatio * (e.railXWidth - e.scrollbarXWidth);
                0 > o ? e.scrollbarXLeft = 0 : o > i ? e.scrollbarXLeft = i : e.scrollbarXLeft = o;
                var l = a.toInt(e.scrollbarXLeft * (e.contentWidth - e.containerWidth) / (e.containerWidth - e.railXRatio * e.scrollbarXWidth)) - e.negativeScrollAdjustment;
                c(t, "left", l)
            }

            var r = null,
                o = null,
                l = function (e) {
                    n(e.pageX - o), s(t), e.stopPropagation(), e.preventDefault()
                },
                u = function () {
                    a.stopScrolling(t, "x"), e.event.unbind(e.ownerDocument, "mousemove", l)
                };
            e.event.bind(e.scrollbarX, "mousedown", function (n) {
                o = n.pageX, r = a.toInt(i.css(e.scrollbarX, "left")) * e.railXRatio, a.startScrolling(t, "x"), e.event.bind(e.ownerDocument, "mousemove", l), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }

        function o(t, e) {
            function n(n) {
                var o = r + n * e.railYRatio,
                    i = e.scrollbarYRail.getBoundingClientRect().top + e.railYRatio * (e.railYHeight - e.scrollbarYHeight);
                0 > o ? e.scrollbarYTop = 0 : o > i ? e.scrollbarYTop = i : e.scrollbarYTop = o;
                var l = a.toInt(e.scrollbarYTop * (e.contentHeight - e.containerHeight) / (e.containerHeight - e.railYRatio * e.scrollbarYHeight));
                c(t, "top", l)
            }

            var r = null,
                o = null,
                l = function (e) {
                    n(e.pageY - o), s(t), e.stopPropagation(), e.preventDefault()
                },
                u = function () {
                    a.stopScrolling(t, "y"), e.event.unbind(e.ownerDocument, "mousemove", l)
                };
            e.event.bind(e.scrollbarY, "mousedown", function (n) {
                o = n.pageY, r = a.toInt(i.css(e.scrollbarY, "top")) * e.railYRatio, a.startScrolling(t, "y"), e.event.bind(e.ownerDocument, "mousemove", l), e.event.once(e.ownerDocument, "mouseup", u), n.stopPropagation(), n.preventDefault()
            })
        }

        var i = t("../../lib/dom"),
            a = t("../../lib/helper"),
            l = t("../instances"),
            s = t("../update-geometry"),
            c = t("../update-scroll");
        e.exports = function (t) {
            var e = l.get(t);
            r(t, e), o(t, e)
        }
    }, {
        "../../lib/dom": 3,
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    12: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && 0 > r) return !e.settings.wheelPropagation
                }
                var i = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === i && 0 > n || i >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }

            var r = !1;
            e.event.bind(t, "mouseenter", function () {
                r = !0
            }), e.event.bind(t, "mouseleave", function () {
                r = !1
            });
            var i = !1;
            e.event.bind(e.ownerDocument, "keydown", function (s) {
                if ((!s.isDefaultPrevented || !s.isDefaultPrevented()) && r) {
                    var c = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
                    if (c) {
                        for (; c.shadowRoot;) c = c.shadowRoot.activeElement;
                        if (o.isEditable(c)) return
                    }
                    var u = 0,
                        d = 0;
                    switch (s.which) {
                        case 37:
                            u = -30;
                            break;
                        case 38:
                            d = 30;
                            break;
                        case 39:
                            u = 30;
                            break;
                        case 40:
                            d = -30;
                            break;
                        case 33:
                            d = 90;
                            break;
                        case 32:
                            d = s.shiftKey ? 90 : -90;
                            break;
                        case 34:
                            d = -90;
                            break;
                        case 35:
                            d = s.ctrlKey ? -e.contentHeight : -e.containerHeight;
                            break;
                        case 36:
                            d = s.ctrlKey ? t.scrollTop : e.containerHeight;
                            break;
                        default:
                            return
                    }
                    l(t, "top", t.scrollTop - d), l(t, "left", t.scrollLeft + u), a(t), i = n(u, d), i && s.preventDefault()
                }
            })
        }

        var o = t("../../lib/helper"),
            i = t("../instances"),
            a = t("../update-geometry"),
            l = t("../update-scroll");
        e.exports = function (t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    13: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n(n, r) {
                var o = t.scrollTop;
                if (0 === n) {
                    if (!e.scrollbarYActive) return !1;
                    if (0 === o && r > 0 || o >= e.contentHeight - e.containerHeight && 0 > r) return !e.settings.wheelPropagation
                }
                var i = t.scrollLeft;
                if (0 === r) {
                    if (!e.scrollbarXActive) return !1;
                    if (0 === i && 0 > n || i >= e.contentWidth - e.containerWidth && n > 0) return !e.settings.wheelPropagation
                }
                return !0
            }

            function r(t) {
                var e = t.deltaX,
                    n = -1 * t.deltaY;
                return ("undefined" == typeof e || "undefined" == typeof n) && (e = -1 * t.wheelDeltaX / 6, n = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, n *= 10), e !== e && n !== n && (e = 0, n = t.wheelDelta), [e, n]
            }

            function i(e, n) {
                var r = t.querySelector("textarea:hover");
                if (r) {
                    var o = r.scrollHeight - r.clientHeight;
                    if (o > 0 && !(0 === r.scrollTop && n > 0 || r.scrollTop === o && 0 > n)) return !0;
                    var i = r.scrollLeft - r.clientWidth;
                    if (i > 0 && !(0 === r.scrollLeft && 0 > e || r.scrollLeft === i && e > 0)) return !0
                }
                return !1
            }

            function s(s) {
                if (o.env.isWebKit || !t.querySelector("select:focus")) {
                    var u = r(s),
                        d = u[0],
                        p = u[1];
                    i(d, p) || (c = !1, e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (p ? l(t, "top", t.scrollTop - p * e.settings.wheelSpeed) : l(t, "top", t.scrollTop + d * e.settings.wheelSpeed), c = !0) : e.scrollbarXActive && !e.scrollbarYActive && (d ? l(t, "left", t.scrollLeft + d * e.settings.wheelSpeed) : l(t, "left", t.scrollLeft - p * e.settings.wheelSpeed), c = !0) : (l(t, "top", t.scrollTop - p * e.settings.wheelSpeed), l(t, "left", t.scrollLeft + d * e.settings.wheelSpeed)), a(t), c = c || n(d, p), c && (s.stopPropagation(), s.preventDefault()))
                }
            }

            var c = !1;
            "undefined" != typeof window.onwheel ? e.event.bind(t, "wheel", s) : "undefined" != typeof window.onmousewheel && e.event.bind(t, "mousewheel", s)
        }

        var o = t("../../lib/helper"),
            i = t("../instances"),
            a = t("../update-geometry"),
            l = t("../update-scroll");
        e.exports = function (t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    14: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            e.event.bind(t, "scroll", function () {
                i(t)
            })
        }

        var o = t("../instances"),
            i = t("../update-geometry");
        e.exports = function (t) {
            var e = o.get(t);
            r(t, e)
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19
    }],
    15: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            function n() {
                var t = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : "";
                return 0 === t.toString().length ? null : t.getRangeAt(0).commonAncestorContainer
            }

            function r() {
                c || (c = setInterval(function () {
                    return i.get(t) ? (l(t, "top", t.scrollTop + u.top), l(t, "left", t.scrollLeft + u.left), void a(t)) : void clearInterval(c)
                }, 50))
            }

            function s() {
                c && (clearInterval(c), c = null), o.stopScrolling(t)
            }

            var c = null,
                u = {
                    top: 0,
                    left: 0
                },
                d = !1;
            e.event.bind(e.ownerDocument, "selectionchange", function () {
                t.contains(n()) ? d = !0 : (d = !1, s())
            }), e.event.bind(window, "mouseup", function () {
                d && (d = !1, s())
            }), e.event.bind(window, "mousemove", function (e) {
                if (d) {
                    var n = {
                            x: e.pageX,
                            y: e.pageY
                        },
                        i = {
                            left: t.offsetLeft,
                            right: t.offsetLeft + t.offsetWidth,
                            top: t.offsetTop,
                            bottom: t.offsetTop + t.offsetHeight
                        };
                    n.x < i.left + 3 ? (u.left = -5, o.startScrolling(t, "x")) : n.x > i.right - 3 ? (u.left = 5, o.startScrolling(t, "x")) : u.left = 0, n.y < i.top + 3 ? (i.top + 3 - n.y < 5 ? u.top = -5 : u.top = -20, o.startScrolling(t, "y")) : n.y > i.bottom - 3 ? (n.y - i.bottom + 3 < 5 ? u.top = 5 : u.top = 20, o.startScrolling(t, "y")) : u.top = 0, 0 === u.top && 0 === u.left ? s() : r()
                }
            })
        }

        var o = t("../../lib/helper"),
            i = t("../instances"),
            a = t("../update-geometry"),
            l = t("../update-scroll");
        e.exports = function (t) {
            var e = i.get(t);
            r(t, e)
        }
    }, {
        "../../lib/helper": 6,
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    16: [function (t, e, n) {
        "use strict";

        function r(t, e, n, r) {
            function l(n, r) {
                var o = t.scrollTop,
                    i = t.scrollLeft,
                    a = Math.abs(n),
                    l = Math.abs(r);
                if (l > a) {
                    if (0 > r && o === e.contentHeight - e.containerHeight || r > 0 && 0 === o) return !e.settings.swipePropagation
                } else if (a > l && (0 > n && i === e.contentWidth - e.containerWidth || n > 0 && 0 === i)) return !e.settings.swipePropagation;
                return !0
            }

            function s(e, n) {
                a(t, "top", t.scrollTop - n), a(t, "left", t.scrollLeft - e), i(t)
            }

            function c() {
                w = !0
            }

            function u() {
                w = !1
            }

            function d(t) {
                return t.targetTouches ? t.targetTouches[0] : t
            }

            function p(t) {
                return t.targetTouches && 1 === t.targetTouches.length ? !0 : t.pointerType && "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE ? !0 : !1
            }

            function f(t) {
                if (p(t)) {
                    Y = !0;
                    var e = d(t);
                    v.pageX = e.pageX, v.pageY = e.pageY, b = (new Date).getTime(), null !== y && clearInterval(y), t.stopPropagation()
                }
            }

            function h(t) {
                if (!w && Y && p(t)) {
                    var e = d(t),
                        n = {
                            pageX: e.pageX,
                            pageY: e.pageY
                        },
                        r = n.pageX - v.pageX,
                        o = n.pageY - v.pageY;
                    s(r, o), v = n;
                    var i = (new Date).getTime(),
                        a = i - b;
                    a > 0 && (m.x = r / a, m.y = o / a, b = i), l(r, o) && (t.stopPropagation(), t.preventDefault())
                }
            }

            function g() {
                !w && Y && (Y = !1, clearInterval(y), y = setInterval(function () {
                    return o.get(t) ? Math.abs(m.x) < .01 && Math.abs(m.y) < .01 ? void clearInterval(y) : (s(30 * m.x, 30 * m.y), m.x *= .8, void(m.y *= .8)) : void clearInterval(y)
                }, 10))
            }

            var v = {},
                b = 0,
                m = {},
                y = null,
                w = !1,
                Y = !1;
            n && (e.event.bind(window, "touchstart", c), e.event.bind(window, "touchend", u), e.event.bind(t, "touchstart", f), e.event.bind(t, "touchmove", h), e.event.bind(t, "touchend", g)), r && (window.PointerEvent ? (e.event.bind(window, "pointerdown", c), e.event.bind(window, "pointerup", u), e.event.bind(t, "pointerdown", f), e.event.bind(t, "pointermove", h), e.event.bind(t, "pointerup", g)) : window.MSPointerEvent && (e.event.bind(window, "MSPointerDown", c), e.event.bind(window, "MSPointerUp", u), e.event.bind(t, "MSPointerDown", f), e.event.bind(t, "MSPointerMove", h), e.event.bind(t, "MSPointerUp", g)))
        }

        var o = t("../instances"),
            i = t("../update-geometry"),
            a = t("../update-scroll");
        e.exports = function (t, e, n) {
            var i = o.get(t);
            r(t, i, e, n)
        }
    }, {
        "../instances": 18,
        "../update-geometry": 19,
        "../update-scroll": 20
    }],
    17: [function (t, e, n) {
        "use strict";
        var r = t("../lib/class"),
            o = t("../lib/helper"),
            i = t("./instances"),
            a = t("./update-geometry"),
            l = t("./handler/click-rail"),
            s = t("./handler/drag-scrollbar"),
            c = t("./handler/keyboard"),
            u = t("./handler/mouse-wheel"),
            d = t("./handler/native-scroll"),
            p = t("./handler/selection"),
            f = t("./handler/touch");
        e.exports = function (t, e) {
            e = "object" == typeof e ? e : {}, r.add(t, "ps-container");
            var n = i.add(t);
            n.settings = o.extend(n.settings, e), l(t), s(t), u(t), d(t), n.settings.useSelectionScroll && p(t), (o.env.supportsTouch || o.env.supportsIePointer) && f(t, o.env.supportsTouch, o.env.supportsIePointer), n.settings.useKeyboard && c(t), a(t)
        }
    }, {
        "../lib/class": 2,
        "../lib/helper": 6,
        "./handler/click-rail": 10,
        "./handler/drag-scrollbar": 11,
        "./handler/keyboard": 12,
        "./handler/mouse-wheel": 13,
        "./handler/native-scroll": 14,
        "./handler/selection": 15,
        "./handler/touch": 16,
        "./instances": 18,
        "./update-geometry": 19
    }],
    18: [function (t, e, n) {
        "use strict";

        function r(t) {
            var e = this;
            e.settings = d.clone(s), e.containerWidth = null, e.containerHeight = null, e.contentWidth = null, e.contentHeight = null, e.isRtl = "rtl" === l.css(t, "direction"), e.isNegativeScroll = function () {
                var e = t.scrollLeft,
                    n = null;
                return t.scrollLeft = -1, n = t.scrollLeft < 0, t.scrollLeft = e, n
            }(), e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, e.event = new c, e.ownerDocument = t.ownerDocument || document, e.scrollbarXRail = l.appendTo(l.e("div", "ps-scrollbar-x-rail"), t), e.scrollbarX = l.appendTo(l.e("div", "ps-scrollbar-x"), e.scrollbarXRail), e.scrollbarXActive = null, e.scrollbarXWidth = null, e.scrollbarXLeft = null, e.scrollbarXBottom = d.toInt(l.css(e.scrollbarXRail, "bottom")), e.isScrollbarXUsingBottom = e.scrollbarXBottom === e.scrollbarXBottom, e.scrollbarXTop = e.isScrollbarXUsingBottom ? null : d.toInt(l.css(e.scrollbarXRail, "top")), e.railBorderXWidth = d.toInt(l.css(e.scrollbarXRail, "borderLeftWidth")) + d.toInt(l.css(e.scrollbarXRail, "borderRightWidth")), l.css(e.scrollbarXRail, "display", "block"), e.railXMarginWidth = d.toInt(l.css(e.scrollbarXRail, "marginLeft")) + d.toInt(l.css(e.scrollbarXRail, "marginRight")), l.css(e.scrollbarXRail, "display", ""), e.railXWidth = null, e.railXRatio = null, e.scrollbarYRail = l.appendTo(l.e("div", "ps-scrollbar-y-rail"), t), e.scrollbarY = l.appendTo(l.e("div", "ps-scrollbar-y"), e.scrollbarYRail), e.scrollbarYActive = null, e.scrollbarYHeight = null, e.scrollbarYTop = null, e.scrollbarYRight = d.toInt(l.css(e.scrollbarYRail, "right")), e.isScrollbarYUsingRight = e.scrollbarYRight === e.scrollbarYRight, e.scrollbarYLeft = e.isScrollbarYUsingRight ? null : d.toInt(l.css(e.scrollbarYRail, "left")), e.scrollbarYOuterWidth = e.isRtl ? d.outerWidth(e.scrollbarY) : null, e.railBorderYWidth = d.toInt(l.css(e.scrollbarYRail, "borderTopWidth")) + d.toInt(l.css(e.scrollbarYRail, "borderBottomWidth")), l.css(e.scrollbarYRail, "display", "block"), e.railYMarginHeight = d.toInt(l.css(e.scrollbarYRail, "marginTop")) + d.toInt(l.css(e.scrollbarYRail, "marginBottom")), l.css(e.scrollbarYRail, "display", ""), e.railYHeight = null, e.railYRatio = null
        }

        function o(t) {
            return "undefined" == typeof t.dataset ? t.getAttribute("data-ps-id") : t.dataset.psId
        }

        function i(t, e) {
            "undefined" == typeof t.dataset ? t.setAttribute("data-ps-id", e) : t.dataset.psId = e
        }

        function a(t) {
            "undefined" == typeof t.dataset ? t.removeAttribute("data-ps-id") : delete t.dataset.psId
        }

        var l = t("../lib/dom"),
            s = t("./default-setting"),
            c = t("../lib/event-manager"),
            u = t("../lib/guid"),
            d = t("../lib/helper"),
            p = {};
        n.add = function (t) {
            var e = u();
            return i(t, e), p[e] = new r(t), p[e]
        }, n.remove = function (t) {
            delete p[o(t)], a(t)
        }, n.get = function (t) {
            return p[o(t)]
        }
    }, {
        "../lib/dom": 3,
        "../lib/event-manager": 4,
        "../lib/guid": 5,
        "../lib/helper": 6,
        "./default-setting": 8
    }],
    19: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
        }

        function o(t, e) {
            var n = {
                width: e.railXWidth
            };
            e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft, e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - t.scrollTop : n.top = e.scrollbarXTop + t.scrollTop, a.css(e.scrollbarXRail, n);
            var r = {
                top: t.scrollTop,
                height: e.railYHeight
            };
            e.isScrollbarYUsingRight ? e.isRtl ? r.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : r.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? r.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : r.left = e.scrollbarYLeft + t.scrollLeft, a.css(e.scrollbarYRail, r), a.css(e.scrollbarX, {
                left: e.scrollbarXLeft,
                width: e.scrollbarXWidth - e.railBorderXWidth
            }), a.css(e.scrollbarY, {
                top: e.scrollbarYTop,
                height: e.scrollbarYHeight - e.railBorderYWidth
            })
        }

        var i = t("../lib/class"),
            a = t("../lib/dom"),
            l = t("../lib/helper"),
            s = t("./instances"),
            c = t("./update-scroll");
        e.exports = function (t) {
            var e = s.get(t);
            e.containerWidth = t.clientWidth, e.containerHeight = t.clientHeight, e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight;
            var n;
            t.contains(e.scrollbarXRail) || (n = a.queryChildren(t, ".ps-scrollbar-x-rail"), n.length > 0 && n.forEach(function (t) {
                a.remove(t)
            }), a.appendTo(e.scrollbarXRail, t)), t.contains(e.scrollbarYRail) || (n = a.queryChildren(t, ".ps-scrollbar-y-rail"), n.length > 0 && n.forEach(function (t) {
                a.remove(t)
            }), a.appendTo(e.scrollbarYRail, t)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = r(e, l.toInt(e.railXWidth * e.containerWidth / e.contentWidth)), e.scrollbarXLeft = l.toInt((e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth))) : (e.scrollbarXActive = !1, e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = 0), !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = r(e, l.toInt(e.railYHeight * e.containerHeight / e.contentHeight)), e.scrollbarYTop = l.toInt(t.scrollTop * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight))) : (e.scrollbarYActive = !1, e.scrollbarYHeight = 0, e.scrollbarYTop = 0, c(t, "top", 0)), e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), o(t, e), i[e.scrollbarXActive ? "add" : "remove"](t, "ps-active-x"), i[e.scrollbarYActive ? "add" : "remove"](t, "ps-active-y")
        }
    }, {
        "../lib/class": 2,
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-scroll": 20
    }],
    20: [function (t, e, n) {
        "use strict";
        var r, o, i = t("./instances"),
            a = document.createEvent("Event"),
            l = document.createEvent("Event"),
            s = document.createEvent("Event"),
            c = document.createEvent("Event"),
            u = document.createEvent("Event"),
            d = document.createEvent("Event"),
            p = document.createEvent("Event"),
            f = document.createEvent("Event"),
            h = document.createEvent("Event"),
            g = document.createEvent("Event");
        a.initEvent("ps-scroll-up", !0, !0), l.initEvent("ps-scroll-down", !0, !0), s.initEvent("ps-scroll-left", !0, !0), c.initEvent("ps-scroll-right", !0, !0), u.initEvent("ps-scroll-y", !0, !0), d.initEvent("ps-scroll-x", !0, !0), p.initEvent("ps-x-reach-start", !0, !0), f.initEvent("ps-x-reach-end", !0, !0), h.initEvent("ps-y-reach-start", !0, !0), g.initEvent("ps-y-reach-end", !0, !0), e.exports = function (t, e, n) {
            if ("undefined" == typeof t) throw "You must provide an element to the update-scroll function";
            if ("undefined" == typeof e) throw "You must provide an axis to the update-scroll function";
            if ("undefined" == typeof n) throw "You must provide a value to the update-scroll function";
            if ("top" === e && 0 >= n) return t.scrollTop = 0, void t.dispatchEvent(h);
            if ("left" === e && 0 >= n) return t.scrollLeft = 0, void t.dispatchEvent(p);
            var v = i.get(t);
            return "top" === e && n > v.contentHeight - v.containerHeight ? (t.scrollTop = v.contentHeight - v.containerHeight, void t.dispatchEvent(g)) : "left" === e && n > v.contentWidth - v.containerWidth ? (t.scrollLeft = v.contentWidth - v.containerWidth, void t.dispatchEvent(f)) : (r || (r = t.scrollTop), o || (o = t.scrollLeft), "top" === e && r > n && t.dispatchEvent(a), "top" === e && n > r && t.dispatchEvent(l), "left" === e && o > n && t.dispatchEvent(s), "left" === e && n > o && t.dispatchEvent(c), "top" === e && (t.scrollTop = r = n, t.dispatchEvent(u)), void("left" === e && (t.scrollLeft = o = n, t.dispatchEvent(d))))
        }
    }, {
        "./instances": 18
    }],
    21: [function (t, e, n) {
        "use strict";
        var r = t("../lib/dom"),
            o = t("../lib/helper"),
            i = t("./instances"),
            a = t("./update-geometry");
        e.exports = function (t) {
            var e = i.get(t);
            e && (e.negativeScrollAdjustment = e.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, r.css(e.scrollbarXRail, "display", "block"), r.css(e.scrollbarYRail, "display", "block"), e.railXMarginWidth = o.toInt(r.css(e.scrollbarXRail, "marginLeft")) + o.toInt(r.css(e.scrollbarXRail, "marginRight")), e.railYMarginHeight = o.toInt(r.css(e.scrollbarYRail, "marginTop")) + o.toInt(r.css(e.scrollbarYRail, "marginBottom")), r.css(e.scrollbarXRail, "display", "none"), r.css(e.scrollbarYRail, "display", "none"), a(t), r.css(e.scrollbarXRail, "display", ""), r.css(e.scrollbarYRail, "display", ""))
        }
    }, {
        "../lib/dom": 3,
        "../lib/helper": 6,
        "./instances": 18,
        "./update-geometry": 19
    }]
}, {}, [1]);

/*!
 * VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License
 */

!function (e) {
    function t(e) {
        var t = e.length,
            n = r.type(e);
        return "function" === n || r.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    if (!e.jQuery) {
        var r = function (e, t) {
            return new r.fn.init(e, t)
        };
        r.isWindow = function (e) {
            return null != e && e == e.window
        }, r.type = function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? o[a.call(e)] || "object" : typeof e
        }, r.isArray = Array.isArray || function (e) {
                return "array" === r.type(e)
            }, r.isPlainObject = function (e) {
            var t;
            if (!e || "object" !== r.type(e) || e.nodeType || r.isWindow(e)) return !1;
            try {
                if (e.constructor && !i.call(e, "constructor") && !i.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            for (t in e);
            return void 0 === t || i.call(e, t)
        }, r.each = function (e, r, n) {
            var o, i = 0,
                a = e.length,
                l = t(e);
            if (n) {
                if (l)
                    for (; a > i && (o = r.apply(e[i], n), o !== !1); i++);
                else
                    for (i in e)
                        if (o = r.apply(e[i], n), o === !1) break
            } else if (l)
                for (; a > i && (o = r.call(e[i], i, e[i]), o !== !1); i++);
            else
                for (i in e)
                    if (o = r.call(e[i], i, e[i]), o === !1) break;
            return e
        }, r.data = function (e, t, o) {
            if (void 0 === o) {
                var i = e[r.expando],
                    a = i && n[i];
                if (void 0 === t) return a;
                if (a && t in a) return a[t]
            } else if (void 0 !== t) {
                var i = e[r.expando] || (e[r.expando] = ++r.uuid);
                return n[i] = n[i] || {}, n[i][t] = o, o
            }
        }, r.removeData = function (e, t) {
            var o = e[r.expando],
                i = o && n[o];
            i && r.each(t, function (e, t) {
                delete i[t]
            })
        }, r.extend = function () {
            var e, t, n, o, i, a, l = arguments[0] || {},
                s = 1,
                c = arguments.length,
                u = !1;
            for ("boolean" == typeof l && (u = l, l = arguments[s] || {}, s++), "object" != typeof l && "function" !== r.type(l) && (l = {}), s === c && (l = this, s--); c > s; s++)
                if (null != (i = arguments[s]))
                    for (o in i) e = l[o], n = i[o], l !== n && (u && n && (r.isPlainObject(n) || (t = r.isArray(n))) ? (t ? (t = !1, a = e && r.isArray(e) ? e : []) : a = e && r.isPlainObject(e) ? e : {}, l[o] = r.extend(u, a, n)) : void 0 !== n && (l[o] = n));
            return l
        }, r.queue = function (e, n, o) {
            function i(e, r) {
                var n = r || [];
                return null != e && (t(Object(e)) ? !function (e, t) {
                    for (var r = +t.length, n = 0, o = e.length; r > n;) e[o++] = t[n++];
                    if (r !== r)
                        for (; void 0 !== t[n];) e[o++] = t[n++];
                    return e.length = o, e
                }(n, "string" == typeof e ? [e] : e) : [].push.call(n, e)), n
            }

            if (e) {
                n = (n || "fx") + "queue";
                var a = r.data(e, n);
                return o ? (!a || r.isArray(o) ? a = r.data(e, n, i(o)) : a.push(o), a) : a || []
            }
        }, r.dequeue = function (e, t) {
            r.each(e.nodeType ? [e] : e, function (e, n) {
                t = t || "fx";
                var o = r.queue(n, t),
                    i = o.shift();
                "inprogress" === i && (i = o.shift()), i && ("fx" === t && o.unshift("inprogress"), i.call(n, function () {
                    r.dequeue(n, t)
                }))
            })
        }, r.fn = r.prototype = {
            init: function (e) {
                if (e.nodeType) return this[0] = e, this;
                throw new Error("Not a DOM node.")
            },
            offset: function () {
                var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                }
            },
            position: function () {
                function e() {
                    for (var e = this.offsetParent || document; e && "html" === !e.nodeType.toLowerCase && "static" === e.style.position;) e = e.offsetParent;
                    return e || document
                }

                var t = this[0],
                    e = e.apply(t),
                    n = this.offset(),
                    o = /^(?:body|html)$/i.test(e.nodeName) ? {
                        top: 0,
                        left: 0
                    } : r(e).offset();
                return n.top -= parseFloat(t.style.marginTop) || 0, n.left -= parseFloat(t.style.marginLeft) || 0, e.style && (o.top += parseFloat(e.style.borderTopWidth) || 0, o.left += parseFloat(e.style.borderLeftWidth) || 0), {
                    top: n.top - o.top,
                    left: n.left - o.left
                }
            }
        };
        var n = {};
        r.expando = "velocity" + (new Date).getTime(), r.uuid = 0;
        for (var o = {}, i = o.hasOwnProperty, a = o.toString, l = "Boolean Number String Function Array Date RegExp Object Error".split(" "), s = 0; s < l.length; s++) o["[object " + l[s] + "]"] = l[s].toLowerCase();
        r.fn.init.prototype = r.fn, e.Velocity = {
            Utilities: r
        }
    }
}(window),
    function (e) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
    }(function () {
        return function (e, t, r, n) {
            function o(e) {
                for (var t = -1, r = e ? e.length : 0, n = []; ++t < r;) {
                    var o = e[t];
                    o && n.push(o)
                }
                return n
            }

            function i(e) {
                return h.isWrapped(e) ? e = [].slice.call(e) : h.isNode(e) && (e = [e]), e
            }

            function a(e) {
                var t = d.data(e, "velocity");
                return null === t ? n : t
            }

            function l(e) {
                return function (t) {
                    return Math.round(t * e) * (1 / e)
                }
            }

            function s(e, r, n, o) {
                function i(e, t) {
                    return 1 - 3 * t + 3 * e
                }

                function a(e, t) {
                    return 3 * t - 6 * e
                }

                function l(e) {
                    return 3 * e
                }

                function s(e, t, r) {
                    return ((i(t, r) * e + a(t, r)) * e + l(t)) * e
                }

                function c(e, t, r) {
                    return 3 * i(t, r) * e * e + 2 * a(t, r) * e + l(t)
                }

                function u(t, r) {
                    for (var o = 0; h > o; ++o) {
                        var i = c(r, e, n);
                        if (0 === i) return r;
                        var a = s(r, e, n) - t;
                        r -= a / i
                    }
                    return r
                }

                function p() {
                    for (var t = 0; y > t; ++t) P[t] = s(t * x, e, n)
                }

                function d(t, r, o) {
                    var i, a, l = 0;
                    do a = r + (o - r) / 2, i = s(a, e, n) - t, i > 0 ? o = a : r = a; while (Math.abs(i) > m && ++l < b);
                    return a
                }

                function f(t) {
                    for (var r = 0, o = 1, i = y - 1; o != i && P[o] <= t; ++o) r += x;
                    --o;
                    var a = (t - P[o]) / (P[o + 1] - P[o]),
                        l = r + a * x,
                        s = c(l, e, n);
                    return s >= v ? u(t, l) : 0 == s ? l : d(t, r, r + x)
                }

                function g() {
                    T = !0, (e != r || n != o) && p()
                }

                var h = 4,
                    v = .001,
                    m = 1e-7,
                    b = 10,
                    y = 11,
                    x = 1 / (y - 1),
                    w = "Float32Array" in t;
                if (4 !== arguments.length) return !1;
                for (var S = 0; 4 > S; ++S)
                    if ("number" != typeof arguments[S] || isNaN(arguments[S]) || !isFinite(arguments[S])) return !1;
                e = Math.min(e, 1), n = Math.min(n, 1), e = Math.max(e, 0), n = Math.max(n, 0);
                var P = w ? new Float32Array(y) : new Array(y),
                    T = !1,
                    Y = function (t) {
                        return T || g(), e === r && n === o ? t : 0 === t ? 0 : 1 === t ? 1 : s(f(t), r, o)
                    };
                Y.getControlPoints = function () {
                    return [{
                        x: e,
                        y: r
                    }, {
                        x: n,
                        y: o
                    }]
                };
                var R = "generateBezier(" + [e, r, n, o] + ")";
                return Y.toString = function () {
                    return R
                }, Y
            }

            function c(e, t) {
                var r = e;
                return h.isString(e) ? y.Easings[e] || (r = !1) : r = h.isArray(e) && 1 === e.length ? l.apply(null, e) : h.isArray(e) && 2 === e.length ? x.apply(null, e.concat([t])) : h.isArray(e) && 4 === e.length ? s.apply(null, e) : !1, r === !1 && (r = y.Easings[y.defaults.easing] ? y.defaults.easing : b), r
            }

            function u(e) {
                if (e) {
                    var t = (new Date).getTime(),
                        r = y.State.calls.length;
                    r > 1e4 && (y.State.calls = o(y.State.calls));
                    for (var i = 0; r > i; i++)
                        if (y.State.calls[i]) {
                            var l = y.State.calls[i],
                                s = l[0],
                                c = l[2],
                                f = l[3],
                                g = !!f,
                                v = null;
                            f || (f = y.State.calls[i][3] = t - 16);
                            for (var m = Math.min((t - f) / c.duration, 1), b = 0, x = s.length; x > b; b++) {
                                var S = s[b],
                                    T = S.element;
                                if (a(T)) {
                                    var Y = !1;
                                    if (c.display !== n && null !== c.display && "none" !== c.display) {
                                        if ("flex" === c.display) {
                                            var R = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                            d.each(R, function (e, t) {
                                                w.setPropertyValue(T, "display", t)
                                            })
                                        }
                                        w.setPropertyValue(T, "display", c.display)
                                    }
                                    c.visibility !== n && "hidden" !== c.visibility && w.setPropertyValue(T, "visibility", c.visibility);
                                    for (var V in S)
                                        if ("element" !== V) {
                                            var E, C = S[V],
                                                k = h.isString(C.easing) ? y.Easings[C.easing] : C.easing;
                                            if (1 === m) E = C.endValue;
                                            else {
                                                var X = C.endValue - C.startValue;
                                                if (E = C.startValue + X * k(m, c, X), !g && E === C.currentValue) continue
                                            }
                                            if (C.currentValue = E, "tween" === V) v = E;
                                            else {
                                                if (w.Hooks.registered[V]) {
                                                    var L = w.Hooks.getRoot(V),
                                                        H = a(T).rootPropertyValueCache[L];
                                                    H && (C.rootPropertyValue = H)
                                                }
                                                var W = w.setPropertyValue(T, V, C.currentValue + (0 === parseFloat(E) ? "" : C.unitType), C.rootPropertyValue, C.scrollData);
                                                w.Hooks.registered[V] && (w.Normalizations.registered[L] ? a(T).rootPropertyValueCache[L] = w.Normalizations.registered[L]("extract", null, W[1]) : a(T).rootPropertyValueCache[L] = W[1]), "transform" === W[0] && (Y = !0)
                                            }
                                        }
                                    c.mobileHA && a(T).transformCache.translate3d === n && (a(T).transformCache.translate3d = "(0px, 0px, 0px)", Y = !0), Y && w.flushTransformCache(T)
                                }
                            }
                            c.display !== n && "none" !== c.display && (y.State.calls[i][2].display = !1), c.visibility !== n && "hidden" !== c.visibility && (y.State.calls[i][2].visibility = !1), c.progress && c.progress.call(l[1], l[1], m, Math.max(0, f + c.duration - t), f, v), 1 === m && p(i)
                        }
                }
                y.State.isTicking && P(u)
            }

            function p(e, t) {
                if (!y.State.calls[e]) return !1;
                for (var r = y.State.calls[e][0], o = y.State.calls[e][1], i = y.State.calls[e][2], l = y.State.calls[e][4], s = !1, c = 0, u = r.length; u > c; c++) {
                    var p = r[c].element;
                    if (t || i.loop || ("none" === i.display && w.setPropertyValue(p, "display", i.display), "hidden" === i.visibility && w.setPropertyValue(p, "visibility", i.visibility)), i.loop !== !0 && (d.queue(p)[1] === n || !/\.velocityQueueEntryFlag/i.test(d.queue(p)[1])) && a(p)) {
                        a(p).isAnimating = !1, a(p).rootPropertyValueCache = {};
                        var f = !1;
                        d.each(w.Lists.transforms3D, function (e, t) {
                            var r = /^scale/.test(t) ? 1 : 0,
                                o = a(p).transformCache[t];
                            a(p).transformCache[t] !== n && new RegExp("^\\(" + r + "[^.]").test(o) && (f = !0, delete a(p).transformCache[t])
                        }), i.mobileHA && (f = !0, delete a(p).transformCache.translate3d), f && w.flushTransformCache(p), w.Values.removeClass(p, "velocity-animating")
                    }
                    if (!t && i.complete && !i.loop && c === u - 1) try {
                        i.complete.call(o, o)
                    } catch (g) {
                        setTimeout(function () {
                            throw g
                        }, 1)
                    }
                    l && i.loop !== !0 && l(o), a(p) && i.loop === !0 && !t && (d.each(a(p).tweensContainer, function (e, t) {
                        /^rotate/.test(e) && 360 === parseFloat(t.endValue) && (t.endValue = 0, t.startValue = 360), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
                    }), y(p, "reverse", {
                        loop: !0,
                        delay: i.delay
                    })), i.queue !== !1 && d.dequeue(p, i.queue)
                }
                y.State.calls[e] = !1;
                for (var h = 0, v = y.State.calls.length; v > h; h++)
                    if (y.State.calls[h] !== !1) {
                        s = !0;
                        break
                    }
                s === !1 && (y.State.isTicking = !1, delete y.State.calls, y.State.calls = [])
            }

            var d, f = function () {
                    if (r.documentMode) return r.documentMode;
                    for (var e = 7; e > 4; e--) {
                        var t = r.createElement("div");
                        if (t.innerHTML = "<!--[if IE " + e + "]><span></span><![endif]-->", t.getElementsByTagName("span").length) return t = null, e
                    }
                    return n
                }(),
                g = function () {
                    var e = 0;
                    return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function (t) {
                            var r, n = (new Date).getTime();
                            return r = Math.max(0, 16 - (n - e)), e = n + r, setTimeout(function () {
                                t(n + r)
                            }, r)
                        }
                }(),
                h = {
                    isString: function (e) {
                        return "string" == typeof e
                    },
                    isArray: Array.isArray || function (e) {
                        return "[object Array]" === Object.prototype.toString.call(e)
                    },
                    isFunction: function (e) {
                        return "[object Function]" === Object.prototype.toString.call(e)
                    },
                    isNode: function (e) {
                        return e && e.nodeType
                    },
                    isNodeList: function (e) {
                        return "object" == typeof e && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e)) && e.length !== n && (0 === e.length || "object" == typeof e[0] && e[0].nodeType > 0)
                    },
                    isWrapped: function (e) {
                        return e && (e.jquery || t.Zepto && t.Zepto.zepto.isZ(e))
                    },
                    isSVG: function (e) {
                        return t.SVGElement && e instanceof t.SVGElement
                    },
                    isEmptyObject: function (e) {
                        for (var t in e) return !1;
                        return !0
                    }
                },
                v = !1;
            if (e.fn && e.fn.jquery ? (d = e, v = !0) : d = t.Velocity.Utilities, 8 >= f && !v) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
            if (7 >= f) return void(jQuery.fn.velocity = jQuery.fn.animate);
            var m = 400,
                b = "swing",
                y = {
                    State: {
                        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        isAndroid: /Android/i.test(navigator.userAgent),
                        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                        isChrome: t.chrome,
                        isFirefox: /Firefox/i.test(navigator.userAgent),
                        prefixElement: r.createElement("div"),
                        prefixMatches: {},
                        scrollAnchor: null,
                        scrollPropertyLeft: null,
                        scrollPropertyTop: null,
                        isTicking: !1,
                        calls: []
                    },
                    CSS: {},
                    Utilities: d,
                    Redirects: {},
                    Easings: {},
                    Promise: t.Promise,
                    defaults: {
                        queue: "",
                        duration: m,
                        easing: b,
                        begin: n,
                        complete: n,
                        progress: n,
                        display: n,
                        visibility: n,
                        loop: !1,
                        delay: !1,
                        mobileHA: !0,
                        _cacheValues: !0
                    },
                    init: function (e) {
                        d.data(e, "velocity", {
                            isSVG: h.isSVG(e),
                            isAnimating: !1,
                            computedStyle: null,
                            tweensContainer: null,
                            rootPropertyValueCache: {},
                            transformCache: {}
                        })
                    },
                    hook: null,
                    mock: !1,
                    version: {
                        major: 1,
                        minor: 2,
                        patch: 2
                    },
                    debug: !1
                };
            t.pageYOffset !== n ? (y.State.scrollAnchor = t, y.State.scrollPropertyLeft = "pageXOffset", y.State.scrollPropertyTop = "pageYOffset") : (y.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, y.State.scrollPropertyLeft = "scrollLeft", y.State.scrollPropertyTop = "scrollTop");
            var x = function () {
                function e(e) {
                    return -e.tension * e.x - e.friction * e.v
                }

                function t(t, r, n) {
                    var o = {
                        x: t.x + n.dx * r,
                        v: t.v + n.dv * r,
                        tension: t.tension,
                        friction: t.friction
                    };
                    return {
                        dx: o.v,
                        dv: e(o)
                    }
                }

                function r(r, n) {
                    var o = {
                            dx: r.v,
                            dv: e(r)
                        },
                        i = t(r, .5 * n, o),
                        a = t(r, .5 * n, i),
                        l = t(r, n, a),
                        s = 1 / 6 * (o.dx + 2 * (i.dx + a.dx) + l.dx),
                        c = 1 / 6 * (o.dv + 2 * (i.dv + a.dv) + l.dv);
                    return r.x = r.x + s * n, r.v = r.v + c * n, r
                }

                return function n(e, t, o) {
                    var i, a, l, s = {
                            x: -1,
                            v: 0,
                            tension: null,
                            friction: null
                        },
                        c = [0],
                        u = 0,
                        p = 1e-4,
                        d = .016;
                    for (e = parseFloat(e) || 500, t = parseFloat(t) || 20, o = o || null, s.tension = e, s.friction = t, i = null !== o, i ? (u = n(e, t), a = u / o * d) : a = d; ;)
                        if (l = r(l || s, a), c.push(1 + l.x), u += 16, !(Math.abs(l.x) > p && Math.abs(l.v) > p)) break;
                    return i ? function (e) {
                        return c[e * (c.length - 1) | 0]
                    } : u
                }
            }();
            y.Easings = {
                linear: function (e) {
                    return e
                },
                swing: function (e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                spring: function (e) {
                    return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
                }
            }, d.each([
                ["ease", [.25, .1, .25, 1]],
                ["ease-in", [.42, 0, 1, 1]],
                ["ease-out", [0, 0, .58, 1]],
                ["ease-in-out", [.42, 0, .58, 1]],
                ["easeInSine", [.47, 0, .745, .715]],
                ["easeOutSine", [.39, .575, .565, 1]],
                ["easeInOutSine", [.445, .05, .55, .95]],
                ["easeInQuad", [.55, .085, .68, .53]],
                ["easeOutQuad", [.25, .46, .45, .94]],
                ["easeInOutQuad", [.455, .03, .515, .955]],
                ["easeInCubic", [.55, .055, .675, .19]],
                ["easeOutCubic", [.215, .61, .355, 1]],
                ["easeInOutCubic", [.645, .045, .355, 1]],
                ["easeInQuart", [.895, .03, .685, .22]],
                ["easeOutQuart", [.165, .84, .44, 1]],
                ["easeInOutQuart", [.77, 0, .175, 1]],
                ["easeInQuint", [.755, .05, .855, .06]],
                ["easeOutQuint", [.23, 1, .32, 1]],
                ["easeInOutQuint", [.86, 0, .07, 1]],
                ["easeInExpo", [.95, .05, .795, .035]],
                ["easeOutExpo", [.19, 1, .22, 1]],
                ["easeInOutExpo", [1, 0, 0, 1]],
                ["easeInCirc", [.6, .04, .98, .335]],
                ["easeOutCirc", [.075, .82, .165, 1]],
                ["easeInOutCirc", [.785, .135, .15, .86]]
            ], function (e, t) {
                y.Easings[t[0]] = s.apply(null, t[1])
            });
            var w = y.CSS = {
                RegEx: {
                    isHex: /^#([A-f\d]{3}){1,2}$/i,
                    valueUnwrap: /^[A-z]+\((.*)\)$/i,
                    wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                    valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                },
                Lists: {
                    colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                    transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                    transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
                },
                Hooks: {
                    templates: {
                        textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                        boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                        clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                        backgroundPosition: ["X Y", "0% 0%"],
                        transformOrigin: ["X Y Z", "50% 50% 0px"],
                        perspectiveOrigin: ["X Y", "50% 50%"]
                    },
                    registered: {},
                    register: function () {
                        for (var e = 0; e < w.Lists.colors.length; e++) {
                            var t = "color" === w.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                            w.Hooks.templates[w.Lists.colors[e]] = ["Red Green Blue Alpha", t]
                        }
                        var r, n, o;
                        if (f)
                            for (r in w.Hooks.templates) {
                                n = w.Hooks.templates[r], o = n[0].split(" ");
                                var i = n[1].match(w.RegEx.valueSplit);
                                "Color" === o[0] && (o.push(o.shift()), i.push(i.shift()), w.Hooks.templates[r] = [o.join(" "), i.join(" ")])
                            }
                        for (r in w.Hooks.templates) {
                            n = w.Hooks.templates[r], o = n[0].split(" ");
                            for (var e in o) {
                                var a = r + o[e],
                                    l = e;
                                w.Hooks.registered[a] = [r, l]
                            }
                        }
                    },
                    getRoot: function (e) {
                        var t = w.Hooks.registered[e];
                        return t ? t[0] : e
                    },
                    cleanRootPropertyValue: function (e, t) {
                        return w.RegEx.valueUnwrap.test(t) && (t = t.match(w.RegEx.valueUnwrap)[1]), w.Values.isCSSNullValue(t) && (t = w.Hooks.templates[e][1]), t
                    },
                    extractValue: function (e, t) {
                        var r = w.Hooks.registered[e];
                        if (r) {
                            var n = r[0],
                                o = r[1];
                            return t = w.Hooks.cleanRootPropertyValue(n, t), t.toString().match(w.RegEx.valueSplit)[o]
                        }
                        return t
                    },
                    injectValue: function (e, t, r) {
                        var n = w.Hooks.registered[e];
                        if (n) {
                            var o, i, a = n[0],
                                l = n[1];
                            return r = w.Hooks.cleanRootPropertyValue(a, r), o = r.toString().match(w.RegEx.valueSplit), o[l] = t, i = o.join(" ")
                        }
                        return r
                    }
                },
                Normalizations: {
                    registered: {
                        clip: function (e, t, r) {
                            switch (e) {
                                case "name":
                                    return "clip";
                                case "extract":
                                    var n;
                                    return w.RegEx.wrappedValueAlreadyExtracted.test(r) ? n = r : (n = r.toString().match(w.RegEx.valueUnwrap), n = n ? n[1].replace(/,(\s+)?/g, " ") : r), n;
                                case "inject":
                                    return "rect(" + r + ")"
                            }
                        },
                        blur: function (e, t, r) {
                            switch (e) {
                                case "name":
                                    return y.State.isFirefox ? "filter" : "-webkit-filter";
                                case "extract":
                                    var n = parseFloat(r);
                                    if (!n && 0 !== n) {
                                        var o = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                        n = o ? o[1] : 0
                                    }
                                    return n;
                                case "inject":
                                    return parseFloat(r) ? "blur(" + r + ")" : "none"
                            }
                        },
                        opacity: function (e, t, r) {
                            if (8 >= f) switch (e) {
                                case "name":
                                    return "filter";
                                case "extract":
                                    var n = r.toString().match(/alpha\(opacity=(.*)\)/i);
                                    return r = n ? n[1] / 100 : 1;
                                case "inject":
                                    return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")"
                            } else switch (e) {
                                case "name":
                                    return "opacity";
                                case "extract":
                                    return r;
                                case "inject":
                                    return r
                            }
                        }
                    },
                    register: function () {
                        9 >= f || y.State.isGingerbread || (w.Lists.transformsBase = w.Lists.transformsBase.concat(w.Lists.transforms3D));
                        for (var e = 0; e < w.Lists.transformsBase.length; e++) !function () {
                            var t = w.Lists.transformsBase[e];
                            w.Normalizations.registered[t] = function (e, r, o) {
                                switch (e) {
                                    case "name":
                                        return "transform";
                                    case "extract":
                                        return a(r) === n || a(r).transformCache[t] === n ? /^scale/i.test(t) ? 1 : 0 : a(r).transformCache[t].replace(/[()]/g, "");
                                    case "inject":
                                        var i = !1;
                                        switch (t.substr(0, t.length - 1)) {
                                            case "translate":
                                                i = !/(%|px|em|rem|vw|vh|\d)$/i.test(o);
                                                break;
                                            case "scal":
                                            case "scale":
                                                y.State.isAndroid && a(r).transformCache[t] === n && 1 > o && (o = 1), i = !/(\d)$/i.test(o);
                                                break;
                                            case "skew":
                                                i = !/(deg|\d)$/i.test(o);
                                                break;
                                            case "rotate":
                                                i = !/(deg|\d)$/i.test(o)
                                        }
                                        return i || (a(r).transformCache[t] = "(" + o + ")"), a(r).transformCache[t]
                                }
                            }
                        }();
                        for (var e = 0; e < w.Lists.colors.length; e++) !function () {
                            var t = w.Lists.colors[e];
                            w.Normalizations.registered[t] = function (e, r, o) {
                                switch (e) {
                                    case "name":
                                        return t;
                                    case "extract":
                                        var i;
                                        if (w.RegEx.wrappedValueAlreadyExtracted.test(o)) i = o;
                                        else {
                                            var a, l = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };
                                            /^[A-z]+$/i.test(o) ? a = l[o] !== n ? l[o] : l.black : w.RegEx.isHex.test(o) ? a = "rgb(" + w.Values.hexToRgb(o).join(" ") + ")" : /^rgba?\(/i.test(o) || (a = l.black), i = (a || o).toString().match(w.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                        }
                                        return 8 >= f || 3 !== i.split(" ").length || (i += " 1"), i;
                                    case "inject":
                                        return 8 >= f ? 4 === o.split(" ").length && (o = o.split(/\s+/).slice(0, 3).join(" ")) : 3 === o.split(" ").length && (o += " 1"), (8 >= f ? "rgb" : "rgba") + "(" + o.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
                                }
                            }
                        }()
                    }
                },
                Names: {
                    camelCase: function (e) {
                        return e.replace(/-(\w)/g, function (e, t) {
                            return t.toUpperCase()
                        })
                    },
                    SVGAttribute: function (e) {
                        var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                        return (f || y.State.isAndroid && !y.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
                    },
                    prefixCheck: function (e) {
                        if (y.State.prefixMatches[e]) return [y.State.prefixMatches[e], !0];
                        for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, n = t.length; n > r; r++) {
                            var o;
                            if (o = 0 === r ? e : t[r] + e.replace(/^\w/, function (e) {
                                    return e.toUpperCase()
                                }), h.isString(y.State.prefixElement.style[o])) return y.State.prefixMatches[e] = o, [o, !0]
                        }
                        return [e, !1]
                    }
                },
                Values: {
                    hexToRgb: function (e) {
                        var t, r = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                            n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                        return e = e.replace(r, function (e, t, r, n) {
                            return t + t + r + r + n + n
                        }), t = n.exec(e), t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
                    },
                    isCSSNullValue: function (e) {
                        return 0 == e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                    },
                    getUnitType: function (e) {
                        return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                    },
                    getDisplayType: function (e) {
                        var t = e && e.tagName.toString().toLowerCase();
                        return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                    },
                    addClass: function (e, t) {
                        e.classList ? e.classList.add(t) : e.className += (e.className.length ? " " : "") + t
                    },
                    removeClass: function (e, t) {
                        e.classList ? e.classList.remove(t) : e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ")
                    }
                },
                getPropertyValue: function (e, r, o, i) {
                    function l(e, r) {
                        function o() {
                            c && w.setPropertyValue(e, "display", "none")
                        }

                        var s = 0;
                        if (8 >= f) s = d.css(e, r);
                        else {
                            var c = !1;
                            if (/^(width|height)$/.test(r) && 0 === w.getPropertyValue(e, "display") && (c = !0, w.setPropertyValue(e, "display", w.Values.getDisplayType(e))), !i) {
                                if ("height" === r && "border-box" !== w.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var u = e.offsetHeight - (parseFloat(w.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingBottom")) || 0);
                                    return o(), u
                                }
                                if ("width" === r && "border-box" !== w.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                    var p = e.offsetWidth - (parseFloat(w.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(w.getPropertyValue(e, "paddingRight")) || 0);
                                    return o(), p
                                }
                            }
                            var g;
                            g = a(e) === n ? t.getComputedStyle(e, null) : a(e).computedStyle ? a(e).computedStyle : a(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === r && (r = "borderTopColor"), s = 9 === f && "filter" === r ? g.getPropertyValue(r) : g[r], ("" === s || null === s) && (s = e.style[r]), o()
                        }
                        if ("auto" === s && /^(top|right|bottom|left)$/i.test(r)) {
                            var h = l(e, "position");
                            ("fixed" === h || "absolute" === h && /top|left/i.test(r)) && (s = d(e).position()[r] + "px")
                        }
                        return s
                    }

                    var s;
                    if (w.Hooks.registered[r]) {
                        var c = r,
                            u = w.Hooks.getRoot(c);
                        o === n && (o = w.getPropertyValue(e, w.Names.prefixCheck(u)[0])), w.Normalizations.registered[u] && (o = w.Normalizations.registered[u]("extract", e, o)), s = w.Hooks.extractValue(c, o)
                    } else if (w.Normalizations.registered[r]) {
                        var p, g;
                        p = w.Normalizations.registered[r]("name", e), "transform" !== p && (g = l(e, w.Names.prefixCheck(p)[0]), w.Values.isCSSNullValue(g) && w.Hooks.templates[r] && (g = w.Hooks.templates[r][1])), s = w.Normalizations.registered[r]("extract", e, g)
                    }
                    if (!/^[\d-]/.test(s))
                        if (a(e) && a(e).isSVG && w.Names.SVGAttribute(r))
                            if (/^(height|width)$/i.test(r)) try {
                                s = e.getBBox()[r]
                            } catch (h) {
                                s = 0
                            } else s = e.getAttribute(r);
                        else s = l(e, w.Names.prefixCheck(r)[0]);
                    return w.Values.isCSSNullValue(s) && (s = 0), y.debug >= 2 && console.log("Get " + r + ": " + s), s
                },
                setPropertyValue: function (e, r, n, o, i) {
                    var l = r;
                    if ("scroll" === r) i.container ? i.container["scroll" + i.direction] = n : "Left" === i.direction ? t.scrollTo(n, i.alternateValue) : t.scrollTo(i.alternateValue, n);
                    else if (w.Normalizations.registered[r] && "transform" === w.Normalizations.registered[r]("name", e)) w.Normalizations.registered[r]("inject", e, n), l = "transform", n = a(e).transformCache[r];
                    else {
                        if (w.Hooks.registered[r]) {
                            var s = r,
                                c = w.Hooks.getRoot(r);
                            o = o || w.getPropertyValue(e, c), n = w.Hooks.injectValue(s, n, o), r = c
                        }
                        if (w.Normalizations.registered[r] && (n = w.Normalizations.registered[r]("inject", e, n), r = w.Normalizations.registered[r]("name", e)), l = w.Names.prefixCheck(r)[0], 8 >= f) try {
                            e.style[l] = n
                        } catch (u) {
                            y.debug && console.log("Browser does not support [" + n + "] for [" + l + "]")
                        } else a(e) && a(e).isSVG && w.Names.SVGAttribute(r) ? e.setAttribute(r, n) : e.style[l] = n;
                        y.debug >= 2 && console.log("Set " + r + " (" + l + "): " + n)
                    }
                    return [l, n]
                },
                flushTransformCache: function (e) {
                    function t(t) {
                        return parseFloat(w.getPropertyValue(e, t))
                    }

                    var r = "";
                    if ((f || y.State.isAndroid && !y.State.isChrome) && a(e).isSVG) {
                        var n = {
                            translate: [t("translateX"), t("translateY")],
                            skewX: [t("skewX")],
                            skewY: [t("skewY")],
                            scale: 1 !== t("scale") ? [t("scale"), t("scale")] : [t("scaleX"), t("scaleY")],
                            rotate: [t("rotateZ"), 0, 0]
                        };
                        d.each(a(e).transformCache, function (e) {
                            /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), n[e] && (r += e + "(" + n[e].join(" ") + ") ", delete n[e])
                        })
                    } else {
                        var o, i;
                        d.each(a(e).transformCache, function (t) {
                            return o = a(e).transformCache[t], "transformPerspective" === t ? (i = o, !0) : (9 === f && "rotateZ" === t && (t = "rotate"), void(r += t + o + " "))
                        }), i && (r = "perspective" + i + " " + r)
                    }
                    w.setPropertyValue(e, "transform", r)
                }
            };
            w.Hooks.register(), w.Normalizations.register(), y.hook = function (e, t, r) {
                var o = n;
                return e = i(e), d.each(e, function (e, i) {
                    if (a(i) === n && y.init(i), r === n) o === n && (o = y.CSS.getPropertyValue(i, t));
                    else {
                        var l = y.CSS.setPropertyValue(i, t, r);
                        "transform" === l[0] && y.CSS.flushTransformCache(i), o = l
                    }
                }), o
            };
            var S = function () {
                function e() {
                    return l ? V.promise || null : s
                }

                function o() {
                    function e(e) {
                        function p(e, t) {
                            var r = n,
                                o = n,
                                a = n;
                            return h.isArray(e) ? (r = e[0], !h.isArray(e[1]) && /^[\d-]/.test(e[1]) || h.isFunction(e[1]) || w.RegEx.isHex.test(e[1]) ? a = e[1] : (h.isString(e[1]) && !w.RegEx.isHex.test(e[1]) || h.isArray(e[1])) && (o = t ? e[1] : c(e[1], l.duration), e[2] !== n && (a = e[2]))) : r = e, t || (o = o || l.easing), h.isFunction(r) && (r = r.call(i, T, P)), h.isFunction(a) && (a = a.call(i, T, P)), [r || 0, o, a]
                        }

                        function f(e, t) {
                            var r, n;
                            return n = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
                                return r = e, ""
                            }), r || (r = w.Values.getUnitType(e)), [n, r]
                        }

                        function m() {
                            var e = {
                                    myParent: i.parentNode || r.body,
                                    position: w.getPropertyValue(i, "position"),
                                    fontSize: w.getPropertyValue(i, "fontSize")
                                },
                                n = e.position === W.lastPosition && e.myParent === W.lastParent,
                                o = e.fontSize === W.lastFontSize;
                            W.lastParent = e.myParent, W.lastPosition = e.position, W.lastFontSize = e.fontSize;
                            var l = 100,
                                s = {};
                            if (o && n) s.emToPx = W.lastEmToPx, s.percentToPxWidth = W.lastPercentToPxWidth, s.percentToPxHeight = W.lastPercentToPxHeight;
                            else {
                                var c = a(i).isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");
                                y.init(c), e.myParent.appendChild(c), d.each(["overflow", "overflowX", "overflowY"], function (e, t) {
                                    y.CSS.setPropertyValue(c, t, "hidden")
                                }), y.CSS.setPropertyValue(c, "position", e.position), y.CSS.setPropertyValue(c, "fontSize", e.fontSize), y.CSS.setPropertyValue(c, "boxSizing", "content-box"), d.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (e, t) {
                                    y.CSS.setPropertyValue(c, t, l + "%")
                                }), y.CSS.setPropertyValue(c, "paddingLeft", l + "em"), s.percentToPxWidth = W.lastPercentToPxWidth = (parseFloat(w.getPropertyValue(c, "width", null, !0)) || 1) / l, s.percentToPxHeight = W.lastPercentToPxHeight = (parseFloat(w.getPropertyValue(c, "height", null, !0)) || 1) / l, s.emToPx = W.lastEmToPx = (parseFloat(w.getPropertyValue(c, "paddingLeft")) || 1) / l, e.myParent.removeChild(c)
                            }
                            return null === W.remToPx && (W.remToPx = parseFloat(w.getPropertyValue(r.body, "fontSize")) || 16), null === W.vwToPx && (W.vwToPx = parseFloat(t.innerWidth) / 100, W.vhToPx = parseFloat(t.innerHeight) / 100), s.remToPx = W.remToPx, s.vwToPx = W.vwToPx, s.vhToPx = W.vhToPx, y.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(s), i), s
                        }

                        if (l.begin && 0 === T) try {
                            l.begin.call(g, g)
                        } catch (x) {
                            setTimeout(function () {
                                throw x
                            }, 1)
                        }
                        if ("scroll" === E) {
                            var S, Y, R, C = /^x$/i.test(l.axis) ? "Left" : "Top",
                                k = parseFloat(l.offset) || 0;
                            l.container ? h.isWrapped(l.container) || h.isNode(l.container) ? (l.container = l.container[0] || l.container, S = l.container["scroll" + C], R = S + d(i).position()[C.toLowerCase()] + k) : l.container = null : (S = y.State.scrollAnchor[y.State["scrollProperty" + C]], Y = y.State.scrollAnchor[y.State["scrollProperty" + ("Left" === C ? "Top" : "Left")]], R = d(i).offset()[C.toLowerCase()] + k), s = {
                                scroll: {
                                    rootPropertyValue: !1,
                                    startValue: S,
                                    currentValue: S,
                                    endValue: R,
                                    unitType: "",
                                    easing: l.easing,
                                    scrollData: {
                                        container: l.container,
                                        direction: C,
                                        alternateValue: Y
                                    }
                                },
                                element: i
                            }, y.debug && console.log("tweensContainer (scroll): ", s.scroll, i)
                        } else if ("reverse" === E) {
                            if (!a(i).tweensContainer) return void d.dequeue(i, l.queue);
                            "none" === a(i).opts.display && (a(i).opts.display = "auto"), "hidden" === a(i).opts.visibility && (a(i).opts.visibility = "visible"), a(i).opts.loop = !1, a(i).opts.begin = null, a(i).opts.complete = null, b.easing || delete l.easing, b.duration || delete l.duration, l = d.extend({}, a(i).opts, l);
                            var X = d.extend(!0, {}, a(i).tweensContainer);
                            for (var L in X)
                                if ("element" !== L) {
                                    var H = X[L].startValue;
                                    X[L].startValue = X[L].currentValue = X[L].endValue, X[L].endValue = H, h.isEmptyObject(b) || (X[L].easing = l.easing), y.debug && console.log("reverse tweensContainer (" + L + "): " + JSON.stringify(X[L]), i)
                                }
                            s = X
                        } else if ("start" === E) {
                            var X;
                            a(i).tweensContainer && a(i).isAnimating === !0 && (X = a(i).tweensContainer), d.each(v, function (e, t) {
                                if (RegExp("^" + w.Lists.colors.join("$|^") + "$").test(e)) {
                                    var r = p(t, !0),
                                        o = r[0],
                                        i = r[1],
                                        a = r[2];
                                    if (w.RegEx.isHex.test(o)) {
                                        for (var l = ["Red", "Green", "Blue"], s = w.Values.hexToRgb(o), c = a ? w.Values.hexToRgb(a) : n, u = 0; u < l.length; u++) {
                                            var d = [s[u]];
                                            i && d.push(i), c !== n && d.push(c[u]), v[e + l[u]] = d
                                        }
                                        delete v[e]
                                    }
                                }
                            });
                            for (var I in v) {
                                var j = p(v[I]),
                                    F = j[0],
                                    M = j[1],
                                    N = j[2];
                                I = w.Names.camelCase(I);
                                var O = w.Hooks.getRoot(I),
                                    z = !1;
                                if (a(i).isSVG || "tween" === O || w.Names.prefixCheck(O)[1] !== !1 || w.Normalizations.registered[O] !== n) {
                                    (l.display !== n && null !== l.display && "none" !== l.display || l.visibility !== n && "hidden" !== l.visibility) && /opacity|filter/.test(I) && !N && 0 !== F && (N = 0), l._cacheValues && X && X[I] ? (N === n && (N = X[I].endValue + X[I].unitType), z = a(i).rootPropertyValueCache[O]) : w.Hooks.registered[I] ? N === n ? (z = w.getPropertyValue(i, O), N = w.getPropertyValue(i, I, z)) : z = w.Hooks.templates[O][1] : N === n && (N = w.getPropertyValue(i, I));
                                    var D, q, B, $ = !1;
                                    if (D = f(I, N), N = D[0], B = D[1], D = f(I, F), F = D[0].replace(/^([+-\/*])=/, function (e, t) {
                                            return $ = t, ""
                                        }), q = D[1], N = parseFloat(N) || 0, F = parseFloat(F) || 0, "%" === q && (/^(fontSize|lineHeight)$/.test(I) ? (F /= 100, q = "em") : /^scale/.test(I) ? (F /= 100, q = "") : /(Red|Green|Blue)$/i.test(I) && (F = F / 100 * 255, q = "")), /[\/*]/.test($)) q = B;
                                    else if (B !== q && 0 !== N)
                                        if (0 === F) q = B;
                                        else {
                                            o = o || m();
                                            var U = /margin|padding|left|right|width|text|word|letter/i.test(I) || /X$/.test(I) || "x" === I ? "x" : "y";
                                            switch (B) {
                                                case "%":
                                                    N *= "x" === U ? o.percentToPxWidth : o.percentToPxHeight;
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    N *= o[B + "ToPx"]
                                            }
                                            switch (q) {
                                                case "%":
                                                    N *= 1 / ("x" === U ? o.percentToPxWidth : o.percentToPxHeight);
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    N *= 1 / o[q + "ToPx"]
                                            }
                                        }
                                    switch ($) {
                                        case "+":
                                            F = N + F;
                                            break;
                                        case "-":
                                            F = N - F;
                                            break;
                                        case "*":
                                            F = N * F;
                                            break;
                                        case "/":
                                            F = N / F
                                    }
                                    s[I] = {
                                        rootPropertyValue: z,
                                        startValue: N,
                                        currentValue: N,
                                        endValue: F,
                                        unitType: q,
                                        easing: M
                                    }, y.debug && console.log("tweensContainer (" + I + "): " + JSON.stringify(s[I]), i)
                                } else y.debug && console.log("Skipping [" + O + "] due to a lack of browser support.")
                            }
                            s.element = i
                        }
                        s.element && (w.Values.addClass(i, "velocity-animating"), A.push(s), "" === l.queue && (a(i).tweensContainer = s, a(i).opts = l), a(i).isAnimating = !0, T === P - 1 ? (y.State.calls.push([A, g, l, null, V.resolver]), y.State.isTicking === !1 && (y.State.isTicking = !0, u())) : T++)
                    }

                    var o, i = this,
                        l = d.extend({}, y.defaults, b),
                        s = {};
                    switch (a(i) === n && y.init(i), parseFloat(l.delay) && l.queue !== !1 && d.queue(i, l.queue, function (e) {
                        y.velocityQueueEntryFlag = !0, a(i).delayTimer = {
                            setTimeout: setTimeout(e, parseFloat(l.delay)),
                            next: e
                        }
                    }), l.duration.toString().toLowerCase()) {
                        case "fast":
                            l.duration = 200;
                            break;
                        case "normal":
                            l.duration = m;
                            break;
                        case "slow":
                            l.duration = 600;
                            break;
                        default:
                            l.duration = parseFloat(l.duration) || 1
                    }
                    y.mock !== !1 && (y.mock === !0 ? l.duration = l.delay = 1 : (l.duration *= parseFloat(y.mock) || 1, l.delay *= parseFloat(y.mock) || 1)), l.easing = c(l.easing, l.duration), l.begin && !h.isFunction(l.begin) && (l.begin = null), l.progress && !h.isFunction(l.progress) && (l.progress = null), l.complete && !h.isFunction(l.complete) && (l.complete = null), l.display !== n && null !== l.display && (l.display = l.display.toString().toLowerCase(), "auto" === l.display && (l.display = y.CSS.Values.getDisplayType(i))), l.visibility !== n && null !== l.visibility && (l.visibility = l.visibility.toString().toLowerCase()), l.mobileHA = l.mobileHA && y.State.isMobile && !y.State.isGingerbread, l.queue === !1 ? l.delay ? setTimeout(e, l.delay) : e() : d.queue(i, l.queue, function (t, r) {
                        return r === !0 ? (V.promise && V.resolver(g), !0) : (y.velocityQueueEntryFlag = !0, void e(t))
                    }), "" !== l.queue && "fx" !== l.queue || "inprogress" === d.queue(i)[0] || d.dequeue(i)
                }

                var l, s, f, g, v, b, x = arguments[0] && (arguments[0].p || d.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || h.isString(arguments[0].properties));
                if (h.isWrapped(this) ? (l = !1, f = 0, g = this, s = this) : (l = !0, f = 1, g = x ? arguments[0].elements || arguments[0].e : arguments[0]), g = i(g)) {
                    x ? (v = arguments[0].properties || arguments[0].p, b = arguments[0].options || arguments[0].o) : (v = arguments[f], b = arguments[f + 1]);
                    var P = g.length,
                        T = 0;
                    if (!/^(stop|finish|finishAll)$/i.test(v) && !d.isPlainObject(b)) {
                        var Y = f + 1;
                        b = {};
                        for (var R = Y; R < arguments.length; R++) h.isArray(arguments[R]) || !/^(fast|normal|slow)$/i.test(arguments[R]) && !/^\d/.test(arguments[R]) ? h.isString(arguments[R]) || h.isArray(arguments[R]) ? b.easing = arguments[R] : h.isFunction(arguments[R]) && (b.complete = arguments[R]) : b.duration = arguments[R]
                    }
                    var V = {
                        promise: null,
                        resolver: null,
                        rejecter: null
                    };
                    l && y.Promise && (V.promise = new y.Promise(function (e, t) {
                        V.resolver = e, V.rejecter = t
                    }));
                    var E;
                    switch (v) {
                        case "scroll":
                            E = "scroll";
                            break;
                        case "reverse":
                            E = "reverse";
                            break;
                        case "finish":
                        case "finishAll":
                        case "stop":
                            d.each(g, function (e, t) {
                                a(t) && a(t).delayTimer && (clearTimeout(a(t).delayTimer.setTimeout), a(t).delayTimer.next && a(t).delayTimer.next(), delete a(t).delayTimer), "finishAll" !== v || b !== !0 && !h.isString(b) || (d.each(d.queue(t, h.isString(b) ? b : ""), function (e, t) {
                                    h.isFunction(t) && t()
                                }), d.queue(t, h.isString(b) ? b : "", []))
                            });
                            var C = [];
                            return d.each(y.State.calls, function (e, t) {
                                t && d.each(t[1], function (r, o) {
                                    var i = b === n ? "" : b;
                                    return i === !0 || t[2].queue === i || b === n && t[2].queue === !1 ? void d.each(g, function (r, n) {
                                        n === o && ((b === !0 || h.isString(b)) && (d.each(d.queue(n, h.isString(b) ? b : ""), function (e, t) {
                                            h.isFunction(t) && t(null, !0)
                                        }), d.queue(n, h.isString(b) ? b : "", [])), "stop" === v ? (a(n) && a(n).tweensContainer && i !== !1 && d.each(a(n).tweensContainer, function (e, t) {
                                            t.endValue = t.currentValue
                                        }), C.push(e)) : ("finish" === v || "finishAll" === v) && (t[2].duration = 1))
                                    }) : !0
                                })
                            }), "stop" === v && (d.each(C, function (e, t) {
                                p(t, !0)
                            }), V.promise && V.resolver(g)), e();
                        default:
                            if (!d.isPlainObject(v) || h.isEmptyObject(v)) {
                                if (h.isString(v) && y.Redirects[v]) {
                                    var k = d.extend({}, b),
                                        X = k.duration,
                                        L = k.delay || 0;
                                    return k.backwards === !0 && (g = d.extend(!0, [], g).reverse()), d.each(g, function (e, t) {
                                        parseFloat(k.stagger) ? k.delay = L + parseFloat(k.stagger) * e : h.isFunction(k.stagger) && (k.delay = L + k.stagger.call(t, e, P)), k.drag && (k.duration = parseFloat(X) || (/^(callout|transition)/.test(v) ? 1e3 : m), k.duration = Math.max(k.duration * (k.backwards ? 1 - e / P : (e + 1) / P), .75 * k.duration, 200)), y.Redirects[v].call(t, t, k || {}, e, P, g, V.promise ? V : n)
                                    }), e()
                                }
                                var H = "Velocity: First argument (" + v + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                return V.promise ? V.rejecter(new Error(H)) : console.log(H), e()
                            }
                            E = "start"
                    }
                    var W = {
                            lastParent: null,
                            lastPosition: null,
                            lastFontSize: null,
                            lastPercentToPxWidth: null,
                            lastPercentToPxHeight: null,
                            lastEmToPx: null,
                            remToPx: null,
                            vwToPx: null,
                            vhToPx: null
                        },
                        A = [];
                    d.each(g, function (e, t) {
                        h.isNode(t) && o.call(t)
                    });
                    var I, k = d.extend({}, y.defaults, b);
                    if (k.loop = parseInt(k.loop), I = 2 * k.loop - 1, k.loop)
                        for (var j = 0; I > j; j++) {
                            var F = {
                                delay: k.delay,
                                progress: k.progress
                            };
                            j === I - 1 && (F.display = k.display, F.visibility = k.visibility, F.complete = k.complete), S(g, "reverse", F)
                        }
                    return e()
                }
            };
            y = d.extend(S, y), y.animate = S;
            var P = t.requestAnimationFrame || g;
            return y.State.isMobile || r.hidden === n || r.addEventListener("visibilitychange", function () {
                r.hidden ? (P = function (e) {
                    return setTimeout(function () {
                        e(!0)
                    }, 16)
                }, u()) : P = t.requestAnimationFrame || g
            }), e.Velocity = y, e !== t && (e.fn.velocity = S, e.fn.velocity.defaults = y.defaults), d.each(["Down", "Up"], function (e, t) {
                y.Redirects["slide" + t] = function (e, r, o, i, a, l) {
                    var s = d.extend({}, r),
                        c = s.begin,
                        u = s.complete,
                        p = {
                            height: "",
                            marginTop: "",
                            marginBottom: "",
                            paddingTop: "",
                            paddingBottom: ""
                        },
                        f = {};
                    s.display === n && (s.display = "Down" === t ? "inline" === y.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), s.begin = function () {
                        c && c.call(a, a);
                        for (var r in p) {
                            f[r] = e.style[r];
                            var n = y.CSS.getPropertyValue(e, r);
                            p[r] = "Down" === t ? [n, 0] : [0, n]
                        }
                        f.overflow = e.style.overflow, e.style.overflow = "hidden"
                    }, s.complete = function () {
                        for (var t in f) e.style[t] = f[t];
                        u && u.call(a, a), l && l.resolver(a)
                    }, y(e, p, s)
                }
            }), d.each(["In", "Out"], function (e, t) {
                y.Redirects["fade" + t] = function (e, r, o, i, a, l) {
                    var s = d.extend({}, r),
                        c = {
                            opacity: "In" === t ? 1 : 0
                        },
                        u = s.complete;
                    o !== i - 1 ? s.complete = s.begin = null : s.complete = function () {
                        u && u.call(a, a), l && l.resolver(a)
                    }, s.display === n && (s.display = "In" === t ? "auto" : "none"), y(this, c, s)
                }
            }), y
        }(window.jQuery || window.Zepto || window, window, document)
    });

/*
 * VelocityJS.org UI Pack (5.0.4). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License. Portions copyright Daniel Eden, Christian Pucci.
 */

!function (e) {
    "function" == typeof require && "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(["velocity"], e) : e()
}(function () {
    return function (e, t, r, n) {
        function a(e, t) {
            var r = [];
            return e && t ? (o.each([e, t], function (e, t) {
                var n = [];
                o.each(t, function (e, t) {
                    for (; t.toString().length < 5;) t = "0" + t;
                    n.push(t)
                }), r.push(n.join(""))
            }), parseFloat(r[0]) > parseFloat(r[1])) : !1
        }

        if (!e.Velocity || !e.Velocity.Utilities) return void(t.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));
        var i = e.Velocity,
            o = i.Utilities,
            s = i.version,
            l = {
                major: 1,
                minor: 1,
                patch: 0
            };
        if (a(l, s)) {
            var c = "Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
            throw alert(c), new Error(c)
        }
        i.RegisterEffect = i.RegisterUI = function (e, t) {
            function r(e, t, r, n) {
                var a, s = 0;
                o.each(e.nodeType ? [e] : e, function (e, t) {
                    n && (r += e * n), a = t.parentNode, o.each(["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"], function (e, r) {
                        s += parseFloat(i.CSS.getPropertyValue(t, r))
                    })
                }), i.animate(a, {
                    height: ("In" === t ? "+" : "-") + "=" + s
                }, {
                    queue: !1,
                    easing: "ease-in-out",
                    duration: r * ("In" === t ? .6 : 1)
                })
            }

            return i.Redirects[e] = function (a, s, l, c, u, p) {
                function f() {
                    s.display !== n && "none" !== s.display || !/Out$/.test(e) || o.each(u.nodeType ? [u] : u, function (e, t) {
                        i.CSS.setPropertyValue(t, "display", "none")
                    }), s.complete && s.complete.call(u, u), p && p.resolver(u || a)
                }

                var d = l === c - 1;
                "function" == typeof t.defaultDuration ? t.defaultDuration = t.defaultDuration.call(u, u) : t.defaultDuration = parseFloat(t.defaultDuration);
                for (var g = 0; g < t.calls.length; g++) {
                    var h = t.calls[g],
                        v = h[0],
                        m = s.duration || t.defaultDuration || 1e3,
                        y = h[1],
                        b = h[2] || {},
                        w = {};
                    if (w.duration = m * (y || 1), w.queue = s.queue || "", w.easing = b.easing || "ease", w.delay = parseFloat(b.delay) || 0, w._cacheValues = b._cacheValues || !0, 0 === g) {
                        if (w.delay += parseFloat(s.delay) || 0, 0 === l && (w.begin = function () {
                                s.begin && s.begin.call(u, u);
                                var t = e.match(/(In|Out)$/);
                                t && "In" === t[0] && v.opacity !== n && o.each(u.nodeType ? [u] : u, function (e, t) {
                                    i.CSS.setPropertyValue(t, "opacity", 0)
                                }), s.animateParentHeight && t && r(u, t[0], m + w.delay, s.stagger)
                            }), null !== s.display)
                            if (s.display !== n && "none" !== s.display) w.display = s.display;
                            else if (/In$/.test(e)) {
                                var x = i.CSS.Values.getDisplayType(a);
                                w.display = "inline" === x ? "inline-block" : x
                            }
                        s.visibility && "hidden" !== s.visibility && (w.visibility = s.visibility)
                    }
                    g === t.calls.length - 1 && (w.complete = function () {
                        if (t.reset) {
                            for (var e in t.reset) {
                                var r = t.reset[e];
                                i.CSS.Hooks.registered[e] !== n || "string" != typeof r && "number" != typeof r || (t.reset[e] = [t.reset[e], t.reset[e]])
                            }
                            var o = {
                                duration: 0,
                                queue: !1
                            };
                            d && (o.complete = f), i.animate(a, t.reset, o)
                        } else d && f()
                    }, "hidden" === s.visibility && (w.visibility = s.visibility)), i.animate(a, v, w)
                }
            }, i
        }, i.RegisterEffect.packagedEffects = {
            "callout.bounce": {
                defaultDuration: 550,
                calls: [
                    [{
                        translateY: -30
                    }, .25],
                    [{
                        translateY: 0
                    }, .125],
                    [{
                        translateY: -15
                    }, .125],
                    [{
                        translateY: 0
                    }, .25]
                ]
            },
            "callout.shake": {
                defaultDuration: 800,
                calls: [
                    [{
                        translateX: -11
                    }, .125],
                    [{
                        translateX: 11
                    }, .125],
                    [{
                        translateX: -11
                    }, .125],
                    [{
                        translateX: 11
                    }, .125],
                    [{
                        translateX: -11
                    }, .125],
                    [{
                        translateX: 11
                    }, .125],
                    [{
                        translateX: -11
                    }, .125],
                    [{
                        translateX: 0
                    }, .125]
                ]
            },
            "callout.flash": {
                defaultDuration: 1100,
                calls: [
                    [{
                        opacity: [0, "easeInOutQuad", 1]
                    }, .25],
                    [{
                        opacity: [1, "easeInOutQuad"]
                    }, .25],
                    [{
                        opacity: [0, "easeInOutQuad"]
                    }, .25],
                    [{
                        opacity: [1, "easeInOutQuad"]
                    }, .25]
                ]
            },
            "callout.pulse": {
                defaultDuration: 825,
                calls: [
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1
                    }, .5, {
                        easing: "easeInExpo"
                    }],
                    [{
                        scaleX: 1,
                        scaleY: 1
                    }, .5]
                ]
            },
            "callout.swing": {
                defaultDuration: 950,
                calls: [
                    [{
                        rotateZ: 15
                    }, .2],
                    [{
                        rotateZ: -10
                    }, .2],
                    [{
                        rotateZ: 5
                    }, .2],
                    [{
                        rotateZ: -5
                    }, .2],
                    [{
                        rotateZ: 0
                    }, .2]
                ]
            },
            "callout.tada": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        scaleX: .9,
                        scaleY: .9,
                        rotateZ: -3
                    }, .1],
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1,
                        rotateZ: 3
                    }, .1],
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1,
                        rotateZ: -3
                    }, .1],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    ["reverse", .125],
                    [{
                        scaleX: 1,
                        scaleY: 1,
                        rotateZ: 0
                    }, .2]
                ]
            },
            "transition.fadeIn": {
                defaultDuration: 500,
                calls: [
                    [{
                        opacity: [1, 0]
                    }]
                ]
            },
            "transition.fadeOut": {
                defaultDuration: 500,
                calls: [
                    [{
                        opacity: [0, 1]
                    }]
                ]
            },
            "transition.flipXIn": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        rotateY: [0, -55]
                    }]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipXOut": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        rotateY: 55
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateY: 0
                }
            },
            "transition.flipYIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        rotateX: [0, -45]
                    }]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipYOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        rotateX: 25
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateX: 0
                }
            },
            "transition.flipBounceXIn": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [.725, 0],
                        transformPerspective: [400, 400],
                        rotateY: [-10, 90]
                    }, .5],
                    [{
                        opacity: .8,
                        rotateY: 10
                    }, .25],
                    [{
                        opacity: 1,
                        rotateY: 0
                    }, .25]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipBounceXOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [.9, 1],
                        transformPerspective: [400, 400],
                        rotateY: -10
                    }, .5],
                    [{
                        opacity: 0,
                        rotateY: 90
                    }, .5]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateY: 0
                }
            },
            "transition.flipBounceYIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [.725, 0],
                        transformPerspective: [400, 400],
                        rotateX: [-10, 90]
                    }, .5],
                    [{
                        opacity: .8,
                        rotateX: 10
                    }, .25],
                    [{
                        opacity: 1,
                        rotateX: 0
                    }, .25]
                ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipBounceYOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [.9, 1],
                        transformPerspective: [400, 400],
                        rotateX: -15
                    }, .5],
                    [{
                        opacity: 0,
                        rotateX: 90
                    }, .5]
                ],
                reset: {
                    transformPerspective: 0,
                    rotateX: 0
                }
            },
            "transition.swoopIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformOriginX: ["100%", "50%"],
                        transformOriginY: ["100%", "100%"],
                        scaleX: [1, 0],
                        scaleY: [1, 0],
                        translateX: [0, -700],
                        translateZ: 0
                    }]
                ],
                reset: {
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.swoopOut": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformOriginX: ["50%", "100%"],
                        transformOriginY: ["100%", "100%"],
                        scaleX: 0,
                        scaleY: 0,
                        translateX: -700,
                        translateZ: 0
                    }]
                ],
                reset: {
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    scaleX: 1,
                    scaleY: 1,
                    translateX: 0
                }
            },
            "transition.whirlIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: [1, 0],
                        scaleY: [1, 0],
                        rotateY: [0, 160]
                    }, 1, {
                        easing: "easeInOutSine"
                    }]
                ]
            },
            "transition.whirlOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [0, "easeInOutQuint", 1],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: 0,
                        scaleY: 0,
                        rotateY: 160
                    }, 1, {
                        easing: "swing"
                    }]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1,
                    rotateY: 0
                }
            },
            "transition.shrinkIn": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: [1, 1.5],
                        scaleY: [1, 1.5],
                        translateZ: 0
                    }]
                ]
            },
            "transition.shrinkOut": {
                defaultDuration: 600,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: 1.3,
                        scaleY: 1.3,
                        translateZ: 0
                    }]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.expandIn": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: [1, .625],
                        scaleY: [1, .625],
                        translateZ: 0
                    }]
                ]
            },
            "transition.expandOut": {
                defaultDuration: 700,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformOriginX: ["50%", "50%"],
                        transformOriginY: ["50%", "50%"],
                        scaleX: .5,
                        scaleY: .5,
                        translateZ: 0
                    }]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.bounceIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        scaleX: [1.05, .3],
                        scaleY: [1.05, .3]
                    }, .4],
                    [{
                        scaleX: .9,
                        scaleY: .9,
                        translateZ: 0
                    }, .2],
                    [{
                        scaleX: 1,
                        scaleY: 1
                    }, .5]
                ]
            },
            "transition.bounceOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        scaleX: .95,
                        scaleY: .95
                    }, .35],
                    [{
                        scaleX: 1.1,
                        scaleY: 1.1,
                        translateZ: 0
                    }, .35],
                    [{
                        opacity: [0, 1],
                        scaleX: .3,
                        scaleY: .3
                    }, .3]
                ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.bounceUpIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [-30, 1e3]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateY: 10
                    }, .2],
                    [{
                        translateY: 0
                    }, .2]
                ]
            },
            "transition.bounceUpOut": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        translateY: 20
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateY: -1e3
                    }, .8]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.bounceDownIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [30, -1e3]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateY: -10
                    }, .2],
                    [{
                        translateY: 0
                    }, .2]
                ]
            },
            "transition.bounceDownOut": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        translateY: -20
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateY: 1e3
                    }, .8]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.bounceLeftIn": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [30, -1250]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateX: -10
                    }, .2],
                    [{
                        translateX: 0
                    }, .2]
                ]
            },
            "transition.bounceLeftOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        translateX: 30
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateX: -1250
                    }, .8]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.bounceRightIn": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [-30, 1250]
                    }, .6, {
                        easing: "easeOutCirc"
                    }],
                    [{
                        translateX: 10
                    }, .2],
                    [{
                        translateX: 0
                    }, .2]
                ]
            },
            "transition.bounceRightOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        translateX: -30
                    }, .2],
                    [{
                        opacity: [0, "easeInCirc", 1],
                        translateX: 1250
                    }, .8]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideUpIn": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, 20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideUpOut": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: -20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideDownIn": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, -20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideDownOut": {
                defaultDuration: 900,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: 20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideLeftIn": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, -20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideLeftOut": {
                defaultDuration: 1050,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: -20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideRightIn": {
                defaultDuration: 1e3,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, 20],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideRightOut": {
                defaultDuration: 1050,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: 20,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideUpBigIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, 75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideUpBigOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: -75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideDownBigIn": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateY: [0, -75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideDownBigOut": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateY: 75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideLeftBigIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, -75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideLeftBigOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: -75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideRightBigIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        translateX: [0, 75],
                        translateZ: 0
                    }]
                ]
            },
            "transition.slideRightBigOut": {
                defaultDuration: 750,
                calls: [
                    [{
                        opacity: [0, 1],
                        translateX: 75,
                        translateZ: 0
                    }]
                ],
                reset: {
                    translateX: 0
                }
            },
            "transition.perspectiveUpIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: ["100%", "100%"],
                        rotateX: [0, -180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveUpOut": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: ["100%", "100%"],
                        rotateX: -180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateX: 0
                }
            },
            "transition.perspectiveDownIn": {
                defaultDuration: 800,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateX: [0, 180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveDownOut": {
                defaultDuration: 850,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [800, 800],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateX: 180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateX: 0
                }
            },
            "transition.perspectiveLeftIn": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateY: [0, -180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveLeftOut": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: [0, 0],
                        transformOriginY: [0, 0],
                        rotateY: -180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateY: 0
                }
            },
            "transition.perspectiveRightIn": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [1, 0],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: ["100%", "100%"],
                        transformOriginY: [0, 0],
                        rotateY: [0, 180]
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveRightOut": {
                defaultDuration: 950,
                calls: [
                    [{
                        opacity: [0, 1],
                        transformPerspective: [2e3, 2e3],
                        transformOriginX: ["100%", "100%"],
                        transformOriginY: [0, 0],
                        rotateY: 180
                    }]
                ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateY: 0
                }
            }
        };
        for (var u in i.RegisterEffect.packagedEffects) i.RegisterEffect(u, i.RegisterEffect.packagedEffects[u]);
        i.RunSequence = function (e) {
            var t = o.extend(!0, [], e);
            t.length > 1 && (o.each(t.reverse(), function (e, r) {
                var n = t[e + 1];
                if (n) {
                    var a = r.o || r.options,
                        s = n.o || n.options,
                        l = a && a.sequenceQueue === !1 ? "begin" : "complete",
                        c = s && s[l],
                        u = {};
                    u[l] = function () {
                        var e = n.e || n.elements,
                            t = e.nodeType ? [e] : e;
                        c && c.call(t, t), i(r)
                    }, n.o ? n.o = o.extend({}, s, u) : n.options = o.extend({}, s, u)
                }
            }), t.reverse()), i(t[0])
        }
    }(window.jQuery || window.Zepto || window, window, document)
});