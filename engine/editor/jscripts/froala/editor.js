/*!
 * froala_editor v2.9.5 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2019 Froala Labs
 */
var editbol = false;
var addbol = false;
! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t)
    } : n(window.jQuery)
}(function(w) {
    var s = function(e, t) {
        this.id = ++w.FE.ID;
        var n = {};
        t && t.documentReady && (n.toolbarButtons = ["fullscreen", "undo", "redo", "getPDF", "print", "|", "bold", "italic", "underline", "color", "clearFormatting", "|", "alignLeft", "alignCenter", "alignRight", "alignJustify", "|", "formatOL", "formatUL", "indent", "outdent", "-", "paragraphFormat", "|", "fontFamily", "|", "fontSize", "|", "insertLink", "insertImage", "quote"], n.paragraphFormatSelection = !0, n.fontFamilySelection = !0, n.fontSizeSelection = !0, n.placeholderText = "", n.quickInsertEnabled = !1, n.charCounterCount = !1), this.opts = w.extend(!0, {}, w.extend({}, s.DEFAULTS, n, "object" == typeof t && t));
        var r = JSON.stringify(this.opts);
        w.FE.OPTS_MAPPING[r] = w.FE.OPTS_MAPPING[r] || this.id, this.sid = w.FE.OPTS_MAPPING[r], w.FE.SHARED[this.sid] = w.FE.SHARED[this.sid] || {}, this.shared = w.FE.SHARED[this.sid], this.shared.count = (this.shared.count || 0) + 1, this.$oel = w(e), this.$oel.data("froala.editor", this), this.o_doc = e.ownerDocument, this.o_win = "defaultView" in this.o_doc ? this.o_doc.defaultView : this.o_doc.parentWindow;
        var o = w(this.o_win).scrollTop();
        this.$oel.on("froala.doInit", w.proxy(function() {
            this.$oel.off("froala.doInit"), this.doc = this.$el.get(0).ownerDocument, this.win = "defaultView" in this.doc ? this.doc.defaultView : this.doc.parentWindow, this.$doc = w(this.doc), this.$win = w(this.win), this.opts.pluginsEnabled || (this.opts.pluginsEnabled = Object.keys(w.FE.PLUGINS)), this.opts.initOnClick ? (this.load(w.FE.MODULES), this.$el.on("touchstart.init", function() {
                w(this).data("touched", !0)
            }), this.$el.on("touchmove.init", function() {
                w(this).removeData("touched")
            }), this.$el.on("mousedown.init touchend.init dragenter.init focus.init", w.proxy(function(e) {
                if ("touchend" == e.type && !this.$el.data("touched")) return !0;
                if (1 === e.which || !e.which) {
                    this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"), this.load(w.FE.MODULES), this.load(w.FE.PLUGINS);
                    var t = e.originalEvent && e.originalEvent.originalTarget;
                    t && "IMG" == t.tagName && w(t).trigger("mousedown"), "undefined" == typeof this.ul && this.destroy(), "touchend" == e.type && this.image && e.originalEvent && e.originalEvent.target && w(e.originalEvent.target).is("img") && setTimeout(w.proxy(function() {
                        this.image.edit(w(e.originalEvent.target))
                    }, this), 100), this.ready = !0, this.events.trigger("initialized")
                }
            }, this)), this.events.trigger("initializationDelayed")) : (this.load(w.FE.MODULES), this.load(w.FE.PLUGINS), w(this.o_win).scrollTop(o), "undefined" == typeof this.ul && this.destroy(), this.ready = !0, this.events.trigger("initialized"))
        }, this)), this._init()
    };
    s.DEFAULTS = {
        initOnClick: !1,
        pluginsEnabled: null
    }, s.MODULES = {}, s.PLUGINS = {}, s.VERSION = "2.9.5", s.INSTANCES = [], s.OPTS_MAPPING = {}, s.SHARED = {}, s.ID = 0, s.prototype._init = function() {
        var e = this.$oel.prop("tagName");
        this.$oel.closest("label").length;
        var t = w.proxy(function() {
                "TEXTAREA" != e && (this._original_html = this._original_html || this.$oel.html()), this.$box = this.$box || this.$oel, this.opts.fullPage && (this.opts.iframe = !0), this.opts.iframe ? (this.$iframe = w('<iframe src="about:blank" frameBorder="0">'), this.$wp = w("<div></div>"), this.$box.html(this.$wp), this.$wp.append(this.$iframe), this.$iframe.get(0).contentWindow.document.open(), this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"), this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"), this.$iframe.get(0).contentWindow.document.close(), this.$el = this.$iframe.contents().find("body"), this.el = this.$el.get(0), this.$head = this.$iframe.contents().find("head"), this.$html = this.$iframe.contents().find("html"), this.iframe_document = this.$iframe.get(0).contentWindow.document) : (this.$el = w("<div></div>"), this.el = this.$el.get(0), this.$wp = w("<div></div>").append(this.$el), this.$box.html(this.$wp)), this.$oel.trigger("froala.doInit")
            }, this),
            n = w.proxy(function() {
                this.$box = w("<div>"), this.$oel.before(this.$box).hide(), this._original_html = this.$oel.val(), this.$oel.parents("form").on("submit." + this.id, w.proxy(function() {
                    this.events.trigger("form.submit")
                }, this)), this.$oel.parents("form").on("reset." + this.id, w.proxy(function() {
                    this.events.trigger("form.reset")
                }, this)), t()
            }, this),
            r = w.proxy(function() {
                this.$el = this.$oel, this.el = this.$el.get(0), this.$el.attr("contenteditable", !0).css("outline", "none").css("display", "inline-block"), this.opts.multiLine = !1, this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit")
            }, this),
            o = w.proxy(function() {
                this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit")
            }, this),
            i = w.proxy(function() {
                this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.on("click.popup", function(e) {
                    e.preventDefault()
                }), this.$oel.trigger("froala.doInit")
            }, this);
        this.opts.editInPopup ? i() : "TEXTAREA" == e ? n() : "A" == e ? r() : "IMG" == e ? o() : "BUTTON" == e || "INPUT" == e ? (this.opts.editInPopup = !0, this.opts.toolbarInline = !1, i()) : t()
    }, s.prototype.load = function(e) {
        for (var t in e)
            if (e.hasOwnProperty(t)) {
                if (this[t]) continue;
                if (w.FE.PLUGINS[t] && this.opts.pluginsEnabled.indexOf(t) < 0) continue;
                if (this[t] = new e[t](this), this[t]._init && (this[t]._init(), this.opts.initOnClick && "core" == t)) return !1
            }
    }, s.prototype.destroy = function() {
        this.destroying = !0, this.shared.count--, this.events.$off();
        var e = this.html.get();
        if (this.opts.iframe && (this.events.disableBlur(), this.win.focus(), this.events.enableBlur()), this.events.trigger("destroy", [], !0), this.events.trigger("shared.destroy", undefined, !0), 0 === this.shared.count) {
            for (var t in this.shared) this.shared.hasOwnProperty(t) && (this.shared[t], w.FE.SHARED[this.sid][t] = null);
            delete w.FE.SHARED[this.sid]
        }
        this.$oel.parents("form").off("." + this.id), this.$oel.off("click.popup"), this.$oel.removeData("froala.editor"), this.$oel.off("froalaEditor"), this.core.destroy(e), w.FE.INSTANCES.splice(w.FE.INSTANCES.indexOf(this), 1)
    }, w.fn.froalaEditor = function(o) {
        for (var i = [], e = 0; e < arguments.length; e++) i.push(arguments[e]);
        if ("string" == typeof o) {
            var a = [];
            return this.each(function() {
                var e = w(this).data("froala.editor");
                if (e) {
                    var t, n;
                    if (0 < o.indexOf(".") && e[o.split(".")[0]] ? (e[o.split(".")[0]] && (t = e[o.split(".")[0]]), n = o.split(".")[1]) : (t = e, n = o.split(".")[0]), !t[n]) return w.error("Method " + o + " does not exist in Froala Editor.");
                    var r = t[n].apply(e, i.slice(1));
                    r === undefined ? a.push(this) : 0 === a.length && a.push(r)
                }
            }), 1 == a.length ? a[0] : a
        }
        if ("object" == typeof o || !o) return this.each(function() {
            if (!w(this).data("froala.editor")) {
                new s(this, o)
            }
        })
    }, w.fn.froalaEditor.Constructor = s, w.FroalaEditor = s, w.FE = s, w.FE.XS = 0, w.FE.SM = 1, w.FE.MD = 2, w.FE.LG = 3;
    w.FE.LinkRegExCommon = "[a-z\\u0080-\\u009f\\u00a1-\\uffff0-9-_.]{1,}", w.FE.LinkRegExEnd = "((:[0-9]{1,5})|)(((\\/|\\?|#)[a-z\\u00a1-\\uffff0-9@?\\|!^=%&amp;/~+#-\\'*-_{}]*)|())", w.FE.LinkRegExTLD = "((" + w.FE.LinkRegExCommon + ")(\\.(com|net|org|edu|mil|gov|co|biz|info|me|dev)))", w.FE.LinkRegExHTTP = "((ftp|http|https):\\/\\/" + w.FE.LinkRegExCommon + ")", w.FE.LinkRegExAuth = "((ftp|http|https):\\/\\/[\\u0021-\\uffff]{1,}@" + w.FE.LinkRegExCommon + ")", w.FE.LinkRegExWWW = "(www\\." + w.FE.LinkRegExCommon + "\\.[a-z0-9-]{2,24})", w.FE.LinkRegEx = "(" + w.FE.LinkRegExTLD + "|" + w.FE.LinkRegExHTTP + "|" + w.FE.LinkRegExWWW + "|" + w.FE.LinkRegExAuth + ")" + w.FE.LinkRegExEnd, w.FE.LinkProtocols = ["mailto", "tel", "sms", "notes", "data"], w.FE.MAIL_REGEX = /.+@.+\..+/i, w.FE.MODULES.helpers = function(i) {
        function e() {
            var e, t, n = {},
                r = (t = -1, "Microsoft Internet Explorer" == navigator.appName ? (e = navigator.userAgent, null !== new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))) : "Netscape" == navigator.appName && (e = navigator.userAgent, null !== new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))), t);
            if (0 < r) n.msie = !0;
            else {
                var o = navigator.userAgent.toLowerCase(),
                    i = /(edge)[ \/]([\w.]+)/.exec(o) || /(chrome)[ \/]([\w.]+)/.exec(o) || /(webkit)[ \/]([\w.]+)/.exec(o) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(o) || /(msie) ([\w.]+)/.exec(o) || o.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(o) || [],
                    a = i[1] || "";
                i[2];
                i[1] && (n[a] = !0), n.chrome ? n.webkit = !0 : n.webkit && (n.safari = !0)
            }
            return n.msie && (n.version = r), n
        }

        function t() {
            return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !o()
        }

        function n() {
            return /(Android)/g.test(navigator.userAgent) && !o()
        }

        function r() {
            return /(Blackberry)/g.test(navigator.userAgent)
        }

        function o() {
            return /(Windows Phone)/gi.test(navigator.userAgent)
        }

        function a(e) {
            return parseInt(e, 10) || 0
        }
        var s;
        var l = null;
        return {
            _init: function() {
                i.browser = e(),
                    function() {
                        function e(e, t) {
                            var i = e[t];
                            e[t] = function(e) {
                                var t, n = !1,
                                    r = !1;
                                if (e && e.match(s)) {
                                    e = e.replace(s, ""), this.parentNode || (a.appendChild(this), r = !0);
                                    var o = this.parentNode;
                                    return this.id || (this.id = "rootedQuerySelector_id_" + (new Date).getTime(), n = !0), t = i.call(o, "#" + this.id + " " + e), n && (this.id = ""), r && a.removeChild(this), t
                                }
                                return i.call(this, e)
                            }
                        }
                        var a = i.o_doc.createElement("div");
                        try {
                            a.querySelectorAll(":scope *")
                        } catch (t) {
                            var s = /^\s*:scope/gi;
                            e(Element.prototype, "querySelector"), e(Element.prototype, "querySelectorAll"), e(HTMLElement.prototype, "querySelector"), e(HTMLElement.prototype, "querySelectorAll")
                        }
                    }(), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) {
                        var t = this;
                        if (!t) return null;
                        if (!document.documentElement.contains(this)) return null;
                        do {
                            if (t.matches(e)) return t;
                            t = t.parentElement
                        } while (null !== t);
                        return null
                    })
            },
            isIOS: t,
            isMac: function() {
                return null == l && (l = 0 <= navigator.platform.toUpperCase().indexOf("MAC")), l
            },
            isAndroid: n,
            isBlackberry: r,
            isWindowsPhone: o,
            isMobile: function() {
                return n() || t() || r()
            },
            isEmail: function(e) {
                return !/^(https?:|ftps?:|)\/\//i.test(e) && w.FE.MAIL_REGEX.test(e)
            },
            requestAnimationFrame: function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
                    window.setTimeout(e, 1e3 / 60)
                }
            },
            getPX: a,
            screenSize: function() {
                var e = w('<div class="fr-visibility-helper"></div>').appendTo("body:first");
                try {
                    var t = a(e.css("margin-left"));
                    return e.remove(), t
                } catch (n) {
                    return w.FE.LG
                }
            },
            isTouch: function() {
                return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch
            },
            sanitizeURL: function(e) {
                return /^(https?:|ftps?:|)\/\//i.test(e) ? e : /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e) ? e : new RegExp("^(" + w.FE.LinkProtocols.join("|") + "):\\/\\/", "i").test(e) ? e : e = encodeURIComponent(e).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/gi, "mailto:").replace(/file%3A/gi, "file:").replace(/sms%3A/gi, "sms:").replace(/tel%3A/gi, "tel:").replace(/notes%3A/gi, "notes:").replace(/data%3Aimage/gi, "data:image").replace(/blob%3A/gi, "blob:").replace(/%3A/g, ":").replace(/webkit-fake-url%3A/gi, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%7B/g, "{").replace(/%7D/g, "}")
            },
            isArray: function(e) {
                return e && !e.propertyIsEnumerable("length") && "object" == typeof e && "number" == typeof e.length
            },
            RGBToHex: function(e) {
                function t(e) {
                    return ("0" + parseInt(e, 10).toString(16)).slice(-2)
                }
                try {
                    return e && "transparent" !== e ? /^#[0-9A-F]{6}$/i.test(e) ? e : ("#" + t((e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))[1]) + t(e[2]) + t(e[3])).toUpperCase() : ""
                } catch (n) {
                    return null
                }
            },
            HEXtoRGB: function(e) {
                e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, t, n, r) {
                    return t + t + n + n + r + r
                });
                var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                return t ? "rgb(" + parseInt(t[1], 16) + ", " + parseInt(t[2], 16) + ", " + parseInt(t[3], 16) + ")" : ""
            },
            isURL: function(e) {
                return !!/^(https?:|ftps?:|)\/\//i.test(e) && (e = String(e).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20"), new RegExp("^" + w.FE.LinkRegExHTTP + w.FE.LinkRegExEnd + "$", "gi").test(e))
            },
            getAlignment: function(e) {
                var t = (e.css("text-align") || "").replace(/-(.*)-/g, "");
                if (["left", "right", "justify", "center"].indexOf(t) < 0) {
                    if (!s) {
                        var n = w('<div dir="' + ("rtl" == i.opts.direction ? "rtl" : "auto") + '" style="text-align: ' + i.$el.css("text-align") + '; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>');
                        w("body:first").append(n);
                        var r = n.find("#s1").get(0).getBoundingClientRect().left,
                            o = n.find("#s2").get(0).getBoundingClientRect().left;
                        n.remove(), s = r < o ? "left" : "right"
                    }
                    t = s
                }
                return t
            },
            scrollTop: function() {
                return i.o_win.pageYOffset ? i.o_win.pageYOffset : i.o_doc.documentElement && i.o_doc.documentElement.scrollTop ? i.o_doc.documentElement.scrollTop : i.o_doc.body.scrollTop ? i.o_doc.body.scrollTop : 0
            },
            scrollLeft: function() {
                return i.o_win.pageXOffset ? i.o_win.pageXOffset : i.o_doc.documentElement && i.o_doc.documentElement.scrollLeft ? i.o_doc.documentElement.scrollLeft : i.o_doc.body.scrollLeft ? i.o_doc.body.scrollLeft : 0
            },
            isInViewPort: function(e) {
                var t = e.getBoundingClientRect();
                return 0 <= (t = {
                    top: Math.round(t.top),
                    bottom: Math.round(t.bottom)
                }).top && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) || t.top <= 0 && t.bottom >= (window.innerHeight || document.documentElement.clientHeight)
            }
        }
    }, w.FE.MODULES.events = function(l) {
        var e, a = {};

        function t(e, t, n) {
            f(e, t, n)
        }

        function n(e) {
            if (void 0 === e && (e = !0), !l.$wp) return !1;
            if (l.helpers.isIOS()) {
                l.$win.get(0).focus();
                var t = 0 === l.$win.scrollTop() ? 1 : l.$win.scrollTop();
                window.scrollTo(0, t)
            }
            if (l.core.hasFocus()) return !1;
            if (!l.core.hasFocus() && e) {
                var n = l.$win.scrollTop();
                if (l.browser.msie && l.$box && l.$box.css("position", "fixed"), l.browser.msie && l.$wp && l.$wp.css("overflow", "visible"), l.browser.msie && l.$sc && l.$sc.css("position", "fixed"), s(), l.$el.focus(), l.events.trigger("focus"), i(), l.browser.msie && l.$sc && l.$sc.css("position", ""), l.browser.msie && l.$box && l.$box.css("position", ""), l.browser.msie && l.$wp && l.$wp.css("overflow", "auto"), n != l.$win.scrollTop() && l.$win.scrollTop(n), !l.selection.info(l.el).atStart) return !1
            }
            if (!l.core.hasFocus() || 0 < l.$el.find(".fr-marker").length) return !1;
            if (l.selection.info(l.el).atStart && l.selection.isCollapsed() && null != l.html.defaultTag()) {
                var r = l.markers.insert();
                if (r && !l.node.blockParent(r)) {
                    w(r).remove();
                    var o = l.$el.find(l.html.blockTagsQuery()).get(0);
                    o && (w(o).prepend(w.FE.MARKERS), l.selection.restore())
                } else r && w(r).remove()
            }
        }
        var r = !1;

        function i() {
            e = !0
        }

        function s() {
            e = !1
        }

        function o() {
            return e
        }

        function d(e, t, n) {
            var r, o = e.split(" ");
            if (1 < o.length) {
                for (var i = 0; i < o.length; i++) d(o[i], t, n);
                return !0
            }
            void 0 === n && (n = !1), r = 0 !== e.indexOf("shared.") ? a[e] = a[e] || [] : l.shared._events[e] = l.shared._events[e] || [], n ? r.unshift(t) : r.push(t)
        }
        var c = [];

        function f(e, t, n, r, o) {
            "function" == typeof n && (o = r, r = n, n = !1);
            var i, a = o ? l.shared.$_events : c,
                s = o ? l.sid : l.id;
            i = r, r = function() {
                if (!l.destroying) return i.apply(this, arguments)
            }, n ? e.on(t.split(" ").join(".ed" + s + " ") + ".ed" + s, n, r) : e.on(t.split(" ").join(".ed" + s + " ") + ".ed" + s, r), a.push([e, t.split(" ").join(".ed" + s + " ") + ".ed" + s])
        }

        function p(e) {
            for (var t = 0; t < e.length; t++) e[t][0].off(e[t][1])
        }

        function u(e, t, n) {
            if (!l.edit.isDisabled() || n) {
                var r, o;
                if (0 !== e.indexOf("shared.")) r = a[e];
                else {
                    if (0 < l.shared.count) return !1;
                    r = l.shared._events[e]
                }
                if (r)
                    for (var i = 0; i < r.length; i++)
                        if (!1 === (o = r[i].apply(l, t))) return !1;
                return !1 !== (o = l.$oel.triggerHandler("froalaEditor." + e, w.merge([l], t || []))) && o
            }
        }

        function g() {
            for (var e in a) a.hasOwnProperty(e) && delete a[e]
        }

        function h() {
            for (var e in l.shared._events) l.shared._events.hasOwnProperty(e) && delete l.shared._events[e]
        }
        return {
            _init: function() {
                l.shared.$_events = l.shared.$_events || [], l.shared._events = {}, l.helpers.isMobile() ? (l._mousedown = "touchstart", l._mouseup = "touchend", l._move = "touchmove", l._mousemove = "touchmove") : (l._mousedown = "mousedown", l._mouseup = "mouseup", l._move = "", l._mousemove = "mousemove"), t(l.$el, "click mouseup mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart", function(e) {
                    u(e.type, [e])
                }), d("mousedown", function() {
                    for (var e = 0; e < w.FE.INSTANCES.length; e++) w.FE.INSTANCES[e] != l && w.FE.INSTANCES[e].popups && w.FE.INSTANCES[e].popups.areVisible() && w.FE.INSTANCES[e].$el.find(".fr-marker").remove()
                }), t(l.$win, l._mousedown, function(e) {
                    u("window.mousedown", [e]), i()
                }), t(l.$win, l._mouseup, function(e) {
                    u("window.mouseup", [e])
                }), t(l.$win, "cut copy keydown keyup touchmove touchend", function(e) {
                    u("window." + e.type, [e])
                }), t(l.$doc, "dragend drop", function(e) {
                    u("document." + e.type, [e])
                }), t(l.$el, "keydown keypress keyup input", function(e) {
                    u(e.type, [e])
                }), t(l.$el, "focus", function(e) {
                    o() && (n(!1), !1 === r && u(e.type, [e]))
                }), t(l.$el, "blur", function(e) {
                    o() && !0 === r && (u(e.type, [e]), i())
                }), f(l.$el, "mousedown", '[contenteditable="true"]', function() {
                    s(), l.$el.blur()
                }), d("focus", function() {
                    r = !0
                }), d("blur", function() {
                    r = !1
                }), i(), t(l.$el, "cut copy paste beforepaste", function(e) {
                    u(e.type, [e])
                }), d("destroy", g), d("shared.destroy", h)
            },
            on: d,
            trigger: u,
            bindClick: function(e, t, n) {
                f(e, l._mousedown, t, function(e) {
                    var t, n;
                    l.edit.isDisabled() || (n = w((t = e).currentTarget), l.edit.isDisabled() || l.node.hasClass(n.get(0), "fr-disabled") ? t.preventDefault() : "mousedown" === t.type && 1 !== t.which || (l.helpers.isMobile() || t.preventDefault(), (l.helpers.isAndroid() || l.helpers.isWindowsPhone()) && 0 === n.parents(".fr-dropdown-menu").length && (t.preventDefault(), t.stopPropagation()), n.addClass("fr-selected"), l.events.trigger("commands.mousedown", [n])))
                }, !0), f(e, l._mouseup + " " + l._move, t, function(e) {
                    l.edit.isDisabled() || function(e, t) {
                        var n = w(e.currentTarget);
                        if (l.edit.isDisabled() || l.node.hasClass(n.get(0), "fr-disabled")) return e.preventDefault();
                        if (("mouseup" !== e.type || 1 === e.which) && l.node.hasClass(n.get(0), "fr-selected"))
                            if ("touchmove" != e.type) {
                                if (e.stopPropagation(), e.stopImmediatePropagation(), e.preventDefault(), !l.node.hasClass(n.get(0), "fr-selected")) return l.button.getButtons(".fr-selected", !0).removeClass("fr-selected");
                                if (l.button.getButtons(".fr-selected", !0).removeClass("fr-selected"), n.data("dragging") || n.attr("disabled")) return n.removeData("dragging");
                                var r = n.data("timeout");
                                r && (clearTimeout(r), n.removeData("timeout")), t.apply(l, [e])
                            } else n.data("timeout") || n.data("timeout", setTimeout(function() {
                                n.data("dragging", !0)
                            }, 100))
                    }(e, n)
                }, !0), f(e, "mousedown click mouseup", t, function(e) {
                    l.edit.isDisabled() || e.stopPropagation()
                }, !0), d("window.mouseup", function() {
                    l.edit.isDisabled() || (e.find(t).removeClass("fr-selected"), i())
                }), f(e, "mouseenter", t, function() {
                    w(this).hasClass("fr-options") && w(this).prev(".fr-btn").addClass("fr-btn-hover"), w(this).next(".fr-btn").hasClass("fr-options") && w(this).next(".fr-btn").addClass("fr-btn-hover")
                }), f(e, "mouseleave", t, function() {
                    w(this).hasClass("fr-options") && w(this).prev(".fr-btn").removeClass("fr-btn-hover"), w(this).next(".fr-btn").hasClass("fr-options") && w(this).next(".fr-btn").removeClass("fr-btn-hover")
                })
            },
            disableBlur: s,
            enableBlur: i,
            blurActive: o,
            focus: n,
            chainTrigger: function(e, t, n) {
                if (!l.edit.isDisabled() || n) {
                    var r, o;
                    if (0 !== e.indexOf("shared.")) r = a[e];
                    else {
                        if (0 < l.shared.count) return !1;
                        r = l.shared._events[e]
                    }
                    if (r)
                        for (var i = 0; i < r.length; i++) void 0 !== (o = r[i].apply(l, [t])) && (t = o);
                    return void 0 !== (o = l.$oel.triggerHandler("froalaEditor." + e, w.merge([l], [t]))) && (t = o), t
                }
            },
            $on: f,
            $off: function() {
                p(c), c = [], 0 === l.shared.count && (p(l.shared.$_events), l.shared.$_events = [])
            }
        }
    }, w.FE.MODULES.node = function(a) {
        function s(e) {
            return e && "IFRAME" != e.tagName ? Array.prototype.slice.call(e.childNodes || []) : []
        }

        function l(e) {
            return !!e && (e.nodeType == Node.ELEMENT_NODE && 0 <= w.FE.BLOCK_TAGS.indexOf(e.tagName.toLowerCase()))
        }

        function d(e) {
            var t = {},
                n = e.attributes;
            if (n)
                for (var r = 0; r < n.length; r++) {
                    var o = n[r];
                    t[o.nodeName] = o.value
                }
            return t
        }

        function t(e) {
            for (var t = "", n = d(e), r = Object.keys(n).sort(), o = 0; o < r.length; o++) {
                var i = r[o],
                    a = n[i];
                a.indexOf("'") < 0 && 0 <= a.indexOf('"') ? t += " " + i + "='" + a + "'" : 0 <= a.indexOf('"') && 0 <= a.indexOf("'") ? t += " " + i + '="' + (a = a.replace(/"/g, "&quot;")) + '"' : t += " " + i + '="' + a + '"'
            }
            return t
        }

        function n(e) {
            return e === a.el
        }
        return {
            isBlock: l,
            isEmpty: function(e, t) {
                if (!e) return !0;
                if (e.querySelector("table")) return !1;
                var n = s(e);
                1 == n.length && l(n[0]) && (n = s(n[0]));
                for (var r = !1, o = 0; o < n.length; o++) {
                    var i = n[o];
                    if (!(t && a.node.hasClass(i, "fr-marker") || i.nodeType == Node.TEXT_NODE && 0 === i.textContent.length)) {
                        if ("BR" != i.tagName && 0 < (i.textContent || "").replace(/\u200B/gi, "").replace(/\n/g, "").length) return !1;
                        if (r) return !1;
                        "BR" == i.tagName && (r = !0)
                    }
                }
                return !(e.querySelectorAll(w.FE.VOID_ELEMENTS.join(",")).length - e.querySelectorAll("br").length || e.querySelector(a.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || 1 < e.querySelectorAll(w.FE.BLOCK_TAGS.join(",")).length || e.querySelector(a.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)"))
            },
            blockParent: function(e) {
                for (; e && e.parentNode !== a.el && (!e.parentNode || !a.node.hasClass(e.parentNode, "fr-inner"));)
                    if (l(e = e.parentNode)) return e;
                return null
            },
            deepestParent: function(e, t, n) {
                if (void 0 === t && (t = []), void 0 === n && (n = !0), t.push(a.el), 0 <= t.indexOf(e.parentNode) || e.parentNode && a.node.hasClass(e.parentNode, "fr-inner") || e.parentNode && 0 <= w.FE.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) && n) return null;
                for (; t.indexOf(e.parentNode) < 0 && e.parentNode && !a.node.hasClass(e.parentNode, "fr-inner") && (w.FE.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) < 0 || !n) && (!l(e) || !l(e.parentNode) || !n);) e = e.parentNode;
                return e
            },
            rawAttributes: d,
            attributes: t,
            clearAttributes: function(e) {
                for (var t = e.attributes, n = t.length - 1; 0 <= n; n--) {
                    var r = t[n];
                    e.removeAttribute(r.nodeName)
                }
            },
            openTagString: function(e) {
                return "<" + e.tagName.toLowerCase() + t(e) + ">"
            },
            closeTagString: function(e) {
                return "</" + e.tagName.toLowerCase() + ">"
            },
            isFirstSibling: function e(t, n) {
                void 0 === n && (n = !0);
                for (var r = t.previousSibling; r && n && a.node.hasClass(r, "fr-marker");) r = r.previousSibling;
                return !r || r.nodeType == Node.TEXT_NODE && "" === r.textContent && e(r)
            },
            isLastSibling: function e(t, n) {
                void 0 === n && (n = !0);
                for (var r = t.nextSibling; r && n && a.node.hasClass(r, "fr-marker");) r = r.nextSibling;
                return !r || r.nodeType == Node.TEXT_NODE && "" === r.textContent && e(r)
            },
            isList: function(e) {
                return !!e && 0 <= ["UL", "OL"].indexOf(e.tagName)
            },
            isLink: function(e) {
                return !!e && e.nodeType == Node.ELEMENT_NODE && "a" == e.tagName.toLowerCase()
            },
            isElement: n,
            contents: s,
            isVoid: function(e) {
                return e && e.nodeType == Node.ELEMENT_NODE && 0 <= w.FE.VOID_ELEMENTS.indexOf((e.tagName || "").toLowerCase())
            },
            hasFocus: function(e) {
                return e === a.doc.activeElement && (!a.doc.hasFocus || a.doc.hasFocus()) && !!(n(e) || e.type || e.href || ~e.tabIndex)
            },
            isEditable: function(e) {
                return (!e.getAttribute || "false" != e.getAttribute("contenteditable")) && ["STYLE", "SCRIPT"].indexOf(e.tagName) < 0
            },
            isDeletable: function(e) {
                return e && e.nodeType == Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= (e.getAttribute("class") || "").indexOf("fr-deletable")
            },
            hasClass: function(e, t) {
                return e instanceof w && (e = e.get(0)), e && e.classList && e.classList.contains(t)
            },
            filter: function(e) {
                return a.browser.msie ? e : {
                    acceptNode: e
                }
            }
        }
    }, w.FE.INVISIBLE_SPACE = "&#8203;", w.FE.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">' + w.FE.INVISIBLE_SPACE + "</span>", w.FE.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">' + w.FE.INVISIBLE_SPACE + "</span>", w.FE.MARKERS = w.FE.START_MARKER + w.FE.END_MARKER, w.FE.MODULES.markers = function(d) {
        function l() {
            if (!d.$wp) return null;
            try {
                var e = d.selection.ranges(0),
                    t = e.commonAncestorContainer;
                if (d.core.isEmpty() && t.textContent !== w("<span>").html(w.FE.INVISIBLE_SPACE).text()) return d.selection.setAtStart(d.el), d.$el.find(".fr-marker:first").replaceWith('<span class="fr-single-marker" style="display: none; line-height: 0;">' + w.FE.INVISIBLE_SPACE + "</span>"), d.$el.find(".fr-marker").remove(), d.$el.find(".fr-single-marker").removeClass("fr-single-marker").addClass("fr-marker").get(0);
                if (t != d.el && 0 === d.$el.find(t).length) return null;
                var n = e.cloneRange(),
                    r = e.cloneRange();
                n.collapse(!0);
                var o = w('<span class="fr-marker" style="display: none; line-height: 0;">' + w.FE.INVISIBLE_SPACE + "</span>", d.doc)[0];
                if (n.insertNode(o), o = d.$el.find("span.fr-marker").get(0)) {
                    for (var i = o.nextSibling; i && i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length;) w(i).remove(), i = d.$el.find("span.fr-marker").get(0).nextSibling;
                    return d.selection.clear(), d.selection.get().addRange(r), o
                }
                return null
            } catch (a) {}
        }

        function c() {
            d.$el.find(".fr-marker").remove()
        }
        return {
            place: function(e, t, n) {
                var r, o, i;
                try {
                    var a = e.cloneRange();
                    if (a.collapse(t), a.insertNode(w('<span class="fr-marker" data-id="' + n + '" data-type="' + t + '" style="display: ' + (d.browser.safari ? "none" : "inline-block") + '; line-height: 0;">' + w.FE.INVISIBLE_SPACE + "</span>", d.doc)[0]), !0 === t)
                        for (i = (r = d.$el.find('span.fr-marker[data-type="true"][data-id="' + n + '"]').get(0)).nextSibling; i && i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length;) w(i).remove(), i = r.nextSibling;
                    if (!0 === t && !e.collapsed) {
                        for (; !d.node.isElement(r.parentNode) && !i;) w(r.parentNode).after(r), i = r.nextSibling;
                        if (i && i.nodeType === Node.ELEMENT_NODE && d.node.isBlock(i) && "HR" !== i.tagName) {
                            for (o = [i]; i = o[0], (o = d.node.contents(i))[0] && d.node.isBlock(o[0]););
                            w(i).prepend(w(r))
                        }
                    }
                    if (!1 === t && !e.collapsed) {
                        if ((i = (r = d.$el.find('span.fr-marker[data-type="false"][data-id="' + n + '"]').get(0)).previousSibling) && i.nodeType === Node.ELEMENT_NODE && d.node.isBlock(i) && "HR" !== i.tagName) {
                            for (o = [i]; i = o[o.length - 1], (o = d.node.contents(i))[o.length - 1] && d.node.isBlock(o[o.length - 1]););
                            w(i).append(w(r))
                        }(r.parentNode && 0 <= ["TD", "TH"].indexOf(r.parentNode.tagName) || !r.previousSibling && d.node.isBlock(r.parentElement)) && r.parentNode.previousSibling && !r.previousSibling && w(r.parentNode.previousSibling).append(r)
                    }
                    var s = d.$el.find('span.fr-marker[data-type="' + t + '"][data-id="' + n + '"]').get(0);
                    return s && (s.style.display = "none"), s
                } catch (l) {
                    return null
                }
            },
            insert: l,
            split: function() {
                d.selection.isCollapsed() || d.selection.remove();
                var e = d.$el.find(".fr-marker").get(0);
                if (null == e && (e = l()), null == e) return null;
                var t = d.node.deepestParent(e);
                if (t || (t = d.node.blockParent(e)) && "LI" != t.tagName && (t = null), t)
                    if (d.node.isBlock(t) && d.node.isEmpty(t)) "LI" != t.tagName || t.parentNode.firstElementChild != t || d.node.isEmpty(t.parentNode) ? w(t).replaceWith('<span class="fr-marker"></span>') : w(t).append('<span class="fr-marker"></span>');
                    else if (d.cursor.isAtStart(e, t)) w(t).before('<span class="fr-marker"></span>'), w(e).remove();
                else if (d.cursor.isAtEnd(e, t)) w(t).after('<span class="fr-marker"></span>'), w(e).remove();
                else {
                    for (var n = e, r = "", o = ""; n = n.parentNode, r += d.node.closeTagString(n), o = d.node.openTagString(n) + o, n != t;);
                    w(e).replaceWith('<span id="fr-break"></span>');
                    var i = d.node.openTagString(t) + w(t).html() + d.node.closeTagString(t);
                    i = i.replace(/<span id="fr-break"><\/span>/g, r + '<span class="fr-marker"></span>' + o), w(t).replaceWith(i)
                }
                return d.$el.find(".fr-marker").get(0)
            },
            insertAtPoint: function(e) {
                var t, n = e.clientX,
                    r = e.clientY;
                c();
                var o = null;
                if ("undefined" != typeof d.doc.caretPositionFromPoint ? (t = d.doc.caretPositionFromPoint(n, r), (o = d.doc.createRange()).setStart(t.offsetNode, t.offset), o.setEnd(t.offsetNode, t.offset)) : "undefined" != typeof d.doc.caretRangeFromPoint && (t = d.doc.caretRangeFromPoint(n, r), (o = d.doc.createRange()).setStart(t.startContainer, t.startOffset), o.setEnd(t.startContainer, t.startOffset)), null !== o && "undefined" != typeof d.win.getSelection) {
                    var i = d.win.getSelection();
                    i.removeAllRanges(), i.addRange(o)
                } else if ("undefined" != typeof d.doc.body.createTextRange) try {
                    (o = d.doc.body.createTextRange()).moveToPoint(n, r);
                    var a = o.duplicate();
                    a.moveToPoint(n, r), o.setEndPoint("EndToEnd", a), o.select()
                } catch (s) {
                    return !1
                }
                l()
            },
            remove: c
        }
    }, w.FE.MODULES.selection = function(S) {
        function s() {
            var e = "";
            return S.win.getSelection ? e = S.win.getSelection() : S.doc.getSelection ? e = S.doc.getSelection() : S.doc.selection && (e = S.doc.selection.createRange().text), e.toString()
        }

        function T() {
            return S.win.getSelection ? S.win.getSelection() : S.doc.getSelection ? S.doc.getSelection() : S.doc.selection.createRange()
        }

        function c(e) {
            var t = T(),
                n = [];
            if (t && t.getRangeAt && t.rangeCount) {
                n = [];
                for (var r = 0; r < t.rangeCount; r++) n.push(t.getRangeAt(r))
            } else n = S.doc.createRange ? [S.doc.createRange()] : [];
            return void 0 !== e ? n[e] : n
        }

        function y() {
            var e = T();
            try {
                e.removeAllRanges ? e.removeAllRanges() : e.empty ? e.empty() : e.clear && e.clear()
            } catch (t) {}
        }

        function f(e, t) {
            var n = e;
            return n.nodeType == Node.ELEMENT_NODE && 0 < n.childNodes.length && n.childNodes[t] && (n = n.childNodes[t]), n.nodeType == Node.TEXT_NODE && (n = n.parentNode), n
        }

        function N() {
            if (S.$wp) {
                S.markers.remove();
                var e, t, n = c(),
                    r = [];
                for (t = 0; t < n.length; t++)
                    if (n[t].startContainer !== S.doc || S.browser.msie) {
                        var o = (e = n[t]).collapsed,
                            i = S.markers.place(e, !0, t),
                            a = S.markers.place(e, !1, t);
                        if (void 0 !== i && i || !o || (w(".fr-marker").remove(), S.selection.setAtEnd(S.el)), S.el.normalize(), S.browser.safari && !o) try {
                            (e = S.doc.createRange()).setStartAfter(i), e.setEndBefore(a), r.push(e)
                        } catch (s) {}
                    }
                if (S.browser.safari && r.length)
                    for (S.selection.clear(), t = 0; t < r.length; t++) S.selection.get().addRange(r[t])
            }
        }

        function C() {
            var e, t = S.el.querySelectorAll('.fr-marker[data-type="true"]');
            if (!S.$wp) return S.markers.remove(), !1;
            if (0 === t.length) return !1;
            if (S.browser.msie || S.browser.edge)
                for (e = 0; e < t.length; e++) t[e].style.display = "inline-block";
            S.core.hasFocus() || S.browser.msie || S.browser.webkit || S.$el.focus(), y();
            var n = T();
            for (e = 0; e < t.length; e++) {
                var r = w(t[e]).data("id"),
                    o = t[e],
                    i = S.doc.createRange(),
                    a = S.$el.find('.fr-marker[data-type="false"][data-id="' + r + '"]');
                (S.browser.msie || S.browser.edge) && a.css("display", "inline-block");
                var s = null;
                if (0 < a.length) {
                    a = a[0];
                    try {
                        for (var l, d = !1, c = o.nextSibling; c && c.nodeType == Node.TEXT_NODE && 0 === c.textContent.length;) c = (l = c).nextSibling, w(l).remove();
                        for (var f, p, u = a.nextSibling; u && u.nodeType == Node.TEXT_NODE && 0 === u.textContent.length;) u = (l = u).nextSibling, w(l).remove();
                        if (o.nextSibling == a || a.nextSibling == o) {
                            for (var g = o.nextSibling == a ? o : a, h = g == o ? a : o, m = g.previousSibling; m && m.nodeType == Node.TEXT_NODE && 0 === m.length;) m = (l = m).previousSibling, w(l).remove();
                            if (m && m.nodeType == Node.TEXT_NODE)
                                for (; m && m.previousSibling && m.previousSibling.nodeType == Node.TEXT_NODE;) m.previousSibling.textContent = m.previousSibling.textContent + m.textContent, m = m.previousSibling, w(m.nextSibling).remove();
                            for (var E = h.nextSibling; E && E.nodeType == Node.TEXT_NODE && 0 === E.length;) E = (l = E).nextSibling, w(l).remove();
                            if (E && E.nodeType == Node.TEXT_NODE)
                                for (; E && E.nextSibling && E.nextSibling.nodeType == Node.TEXT_NODE;) E.nextSibling.textContent = E.textContent + E.nextSibling.textContent, E = E.nextSibling, w(E.previousSibling).remove();
                            if (m && (S.node.isVoid(m) || S.node.isBlock(m)) && (m = null), E && (S.node.isVoid(E) || S.node.isBlock(E)) && (E = null), m && E && m.nodeType == Node.TEXT_NODE && E.nodeType == Node.TEXT_NODE) {
                                w(o).remove(), w(a).remove();
                                var v = m.textContent.length;
                                m.textContent = m.textContent + E.textContent, w(E).remove(), S.opts.htmlUntouched || S.spaces.normalize(m), i.setStart(m, v), i.setEnd(m, v), d = !0
                            } else !m && E && E.nodeType == Node.TEXT_NODE ? (w(o).remove(), w(a).remove(), S.opts.htmlUntouched || S.spaces.normalize(E), s = w(S.doc.createTextNode("\u200b")), w(E).before(s), i.setStart(E, 0), i.setEnd(E, 0), d = !0) : !E && m && m.nodeType == Node.TEXT_NODE && (w(o).remove(), w(a).remove(), S.opts.htmlUntouched || S.spaces.normalize(m), s = w(S.doc.createTextNode("\u200b")), w(m).after(s), i.setStart(m, m.textContent.length), i.setEnd(m, m.textContent.length), d = !0)
                        }
                        if (!d)(S.browser.chrome || S.browser.edge) && o.nextSibling == a ? (f = A(a, i, !0) || i.setStartAfter(a), p = A(o, i, !1) || i.setEndBefore(o)) : (o.previousSibling == a && (a = (o = a).nextSibling), a.nextSibling && "BR" === a.nextSibling.tagName || !a.nextSibling && S.node.isBlock(o.previousSibling) || o.previousSibling && "BR" == o.previousSibling.tagName || (o.style.display = "inline", a.style.display = "inline", s = w(S.doc.createTextNode("\u200b"))), f = A(o, i, !0) || w(o).before(s) && i.setStartBefore(o), p = A(a, i, !1) || w(a).after(s) && i.setEndAfter(a)), "function" == typeof f && f(), "function" == typeof p && p()
                    } catch (b) {}
                }
                s && s.remove();
                try {
                    n.addRange(i)
                } catch (b) {}
            }
            S.markers.remove()
        }

        function A(e, t, n) {
            var r, o = e.previousSibling,
                i = e.nextSibling;
            return o && i && o.nodeType == Node.TEXT_NODE && i.nodeType == Node.TEXT_NODE ? (r = o.textContent.length, n ? (i.textContent = o.textContent + i.textContent, w(o).remove(), w(e).remove(), S.opts.htmlUntouched || S.spaces.normalize(i), function() {
                t.setStart(i, r)
            }) : (o.textContent = o.textContent + i.textContent, w(i).remove(), w(e).remove(), S.opts.htmlUntouched || S.spaces.normalize(o), function() {
                t.setEnd(o, r)
            })) : o && !i && o.nodeType == Node.TEXT_NODE ? (r = o.textContent.length, n ? (S.opts.htmlUntouched || S.spaces.normalize(o), function() {
                t.setStart(o, r)
            }) : (S.opts.htmlUntouched || S.spaces.normalize(o), function() {
                t.setEnd(o, r)
            })) : !(!i || o || i.nodeType != Node.TEXT_NODE) && (n ? (S.opts.htmlUntouched || S.spaces.normalize(i), function() {
                t.setStart(i, 0)
            }) : (S.opts.htmlUntouched || S.spaces.normalize(i), function() {
                t.setEnd(i, 0)
            }))
        }

        function x() {
            for (var e = c(), t = 0; t < e.length; t++)
                if (!e[t].collapsed) return !1;
            return !0
        }

        function o(e) {
            var t, n, r = !1,
                o = !1;
            if (S.win.getSelection) {
                var i = S.win.getSelection();
                i.rangeCount && ((n = (t = i.getRangeAt(0)).cloneRange()).selectNodeContents(e), n.setEnd(t.startContainer, t.startOffset), r = "" === n.toString(), n.selectNodeContents(e), n.setStart(t.endContainer, t.endOffset), o = "" === n.toString())
            } else S.doc.selection && "Control" != S.doc.selection.type && ((n = (t = S.doc.selection.createRange()).duplicate()).moveToElementText(e), n.setEndPoint("EndToStart", t), r = "" === n.text, n.moveToElementText(e), n.setEndPoint("StartToEnd", t), o = "" === n.text);
            return {
                atStart: r,
                atEnd: o
            }
        }

        function $(e, t) {
            void 0 === t && (t = !0);
            var n = w(e).html();
            n && n.replace(/\u200b/g, "").length != n.length && w(e).html(n.replace(/\u200b/g, ""));
            for (var r = S.node.contents(e), o = 0; o < r.length; o++) r[o].nodeType != Node.ELEMENT_NODE ? w(r[o]).remove() : ($(r[o], 0 === o), 0 === o && (t = !1));
            e.nodeType == Node.TEXT_NODE ? w(e).replaceWith('<span data-first="true" data-text="true"></span>') : t && w(e).attr("data-first", !0)
        }

        function O() {
            return 0 === w(this).find("fr-inner").length
        }

        function p() {
            try {
                if (!S.$wp) return !1;
                for (var e = c(0).commonAncestorContainer; e && !S.node.isElement(e);) e = e.parentNode;
                return !!S.node.isElement(e)
            } catch (t) {
                return !1
            }
        }

        function r(e, t) {
            if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;
            for (var n = e.firstChild; n && (S.node.isBlock(n) || t && !S.node.isVoid(n) && n.nodeType == Node.ELEMENT_NODE);) n = (e = n).firstChild;
            e.innerHTML = w.FE.MARKERS + e.innerHTML
        }

        function i(e, t) {
            if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;
            for (var n = e.lastChild; n && (S.node.isBlock(n) || t && !S.node.isVoid(n) && n.nodeType == Node.ELEMENT_NODE);) n = (e = n).lastChild;
            var r = S.doc.createElement("SPAN");
            for (r.setAttribute("id", "fr-sel-markers"), r.innerHTML = w.FE.MARKERS; e.parentNode && S.opts.htmlAllowedEmptyTags && 0 <= S.opts.htmlAllowedEmptyTags.indexOf(e.tagName.toLowerCase());) e = e.parentNode;
            e.appendChild(r);
            var o = e.querySelector("#fr-sel-markers");
            o.outerHTML = o.innerHTML
        }
        return {
            text: s,
            get: T,
            ranges: c,
            clear: y,
            element: function() {
                var e = T();
                try {
                    if (e.rangeCount) {
                        var t, n = c(0),
                            r = n.startContainer;
                        if (S.node.isElement(r) && 0 === n.startOffset && r.childNodes.length)
                            for (; r.childNodes.length && r.childNodes[0].nodeType === Node.ELEMENT_NODE;) r = r.childNodes[0];
                        if (r.nodeType == Node.TEXT_NODE && n.startOffset == (r.textContent || "").length && r.nextSibling && (r = r.nextSibling), r.nodeType == Node.ELEMENT_NODE) {
                            var o = !1;
                            if (0 < r.childNodes.length && r.childNodes[n.startOffset]) {
                                for (t = r.childNodes[n.startOffset]; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;
                                if (t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0), !o && 1 < r.childNodes.length && 0 < n.startOffset && r.childNodes[n.startOffset - 1]) {
                                    for (t = r.childNodes[n.startOffset - 1]; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;
                                    t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0)
                                }
                            } else !n.collapsed && r.nextSibling && r.nextSibling.nodeType == Node.ELEMENT_NODE && (t = r.nextSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0);
                            !o && 0 < r.childNodes.length && w(r.childNodes[0]).text().replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && ["BR", "IMG", "HR"].indexOf(r.childNodes[0].tagName) < 0 && (r = r.childNodes[0])
                        }
                        for (; r.nodeType != Node.ELEMENT_NODE && r.parentNode;) r = r.parentNode;
                        for (var i = r; i && "HTML" != i.tagName;) {
                            if (i == S.el) return r;
                            i = w(i).parent()[0]
                        }
                    }
                } catch (a) {}
                return S.el
            },
            endElement: function() {
                var e = T();
                try {
                    if (e.rangeCount) {
                        var t, n = c(0),
                            r = n.endContainer;
                        if (r.nodeType == Node.ELEMENT_NODE) {
                            var o = !1;
                            0 < r.childNodes.length && r.childNodes[n.endOffset] && w(r.childNodes[n.endOffset]).text() === s() ? (r = r.childNodes[n.endOffset], o = !0) : !n.collapsed && r.previousSibling && r.previousSibling.nodeType == Node.ELEMENT_NODE ? (t = r.previousSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0) : !n.collapsed && 0 < r.childNodes.length && r.childNodes[n.endOffset] && (t = r.childNodes[n.endOffset].previousSibling).nodeType == Node.ELEMENT_NODE && t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0), !o && 0 < r.childNodes.length && w(r.childNodes[r.childNodes.length - 1]).text() === s() && ["BR", "IMG", "HR"].indexOf(r.childNodes[r.childNodes.length - 1].tagName) < 0 && (r = r.childNodes[r.childNodes.length - 1])
                        }
                        for (r.nodeType == Node.TEXT_NODE && 0 === n.endOffset && r.previousSibling && r.previousSibling.nodeType == Node.ELEMENT_NODE && (r = r.previousSibling); r.nodeType != Node.ELEMENT_NODE && r.parentNode;) r = r.parentNode;
                        for (var i = r; i && "HTML" != i.tagName;) {
                            if (i == S.el) return r;
                            i = w(i).parent()[0]
                        }
                    }
                } catch (a) {}
                return S.el
            },
            save: N,
            restore: C,
            isCollapsed: x,
            isFull: function() {
                if (x()) return !1;
                S.selection.save();
                var e, t = S.el.querySelectorAll("td, th, img, br");
                for (e = 0; e < t.length; e++) t[e].nextSibling && (t[e].innerHTML = '<span class="fr-mk">' + w.FE.INVISIBLE_SPACE + "</span>" + t[e].innerHTML);
                var n = !1,
                    r = o(S.el);
                for (r.atStart && r.atEnd && (n = !0), t = S.el.querySelectorAll(".fr-mk"), e = 0; e < t.length; e++) t[e].parentNode.removeChild(t[e]);
                return S.selection.restore(), n
            },
            inEditor: p,
            remove: function() {
                if (x()) return !0;
                var t;
                N();
                var n = function(e) {
                        for (var t = e.previousSibling; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) {
                            var n = t;
                            t = t.previousSibling, w(n).remove()
                        }
                        return t
                    },
                    r = function(e) {
                        for (var t = e.nextSibling; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) {
                            var n = t;
                            t = t.nextSibling, w(n).remove()
                        }
                        return t
                    },
                    o = S.$el.find('.fr-marker[data-type="true"]');
                for (t = 0; t < o.length; t++)
                    for (var i = o[t]; !(n(i) || S.node.isBlock(i.parentNode) || S.$el.is(i.parentNode) || S.node.hasClass(i.parentNode, "fr-inner"));) w(i.parentNode).before(i);
                var a = S.$el.find('.fr-marker[data-type="false"]');
                for (t = 0; t < a.length; t++) {
                    for (var s = a[t]; !(r(s) || S.node.isBlock(s.parentNode) || S.$el.is(s.parentNode) || S.node.hasClass(s.parentNode, "fr-inner"));) w(s.parentNode).after(s);
                    s.parentNode && S.node.isBlock(s.parentNode) && S.node.isEmpty(s.parentNode) && !S.$el.is(s.parentNode) && !S.node.hasClass(s.parentNode, "fr-inner") && S.opts.keepFormatOnDelete && w(s.parentNode).after(s)
                }
                if (function() {
                        for (var e = S.$el.find(".fr-marker"), t = 0; t < e.length; t++)
                            if (w(e[t]).parentsUntil('.fr-element, [contenteditable="true"]', '[contenteditable="false"]').length) return !1;
                        return !0
                    }()) {
                    ! function e(t, n) {
                        var r = S.node.contents(t.get(0));
                        0 <= ["TD", "TH"].indexOf(t.get(0).tagName) && 1 == t.find(".fr-marker").length && S.node.hasClass(r[0], "fr-marker") && t.attr("data-del-cell", !0);
                        for (var o = 0; o < r.length; o++) {
                            var i = r[o];
                            S.node.hasClass(i, "fr-marker") ? n = (n + 1) % 2 : n ? 0 < w(i).find(".fr-marker").length ? n = e(w(i), n) : ["TD", "TH"].indexOf(i.tagName) < 0 && !S.node.hasClass(i, "fr-inner") ? !S.opts.keepFormatOnDelete || 0 < S.$el.find("[data-first]").length || S.node.isVoid(i) ? w(i).remove() : $(i) : S.node.hasClass(i, "fr-inner") ? 0 === w(i).find(".fr-inner").length ? w(i).html("<br>") : w(i).find(".fr-inner").filter(O).html("<br>") : (w(i).empty(), w(i).attr("data-del-cell", !0)) : 0 < w(i).find(".fr-marker").length && (n = e(w(i), n))
                        }
                        return n
                    }(S.$el, 0);
                    var l = S.$el.find('[data-first="true"]');
                    if (l.length) S.$el.find(".fr-marker").remove(), l.append(w.FE.INVISIBLE_SPACE + w.FE.MARKERS).removeAttr("data-first"), l.attr("data-text") && l.replaceWith(l.html());
                    else
                        for (S.$el.find("table").filter(function() {
                                return 0 < w(this).find("[data-del-cell]").length && w(this).find("[data-del-cell]").length == w(this).find("td, th").length
                            }).remove(), S.$el.find("[data-del-cell]").removeAttr("data-del-cell"), o = S.$el.find('.fr-marker[data-type="true"]'), t = 0; t < o.length; t++) {
                            var d = o[t],
                                c = d.nextSibling,
                                f = S.$el.find('.fr-marker[data-type="false"][data-id="' + w(d).data("id") + '"]').get(0);
                            if (f) {
                                if (d && (!c || c != f)) {
                                    var p = S.node.blockParent(d),
                                        u = S.node.blockParent(f),
                                        g = !1,
                                        h = !1;
                                    if (p && 0 <= ["UL", "OL"].indexOf(p.tagName) && (g = !(p = null)), u && 0 <= ["UL", "OL"].indexOf(u.tagName) && (h = !(u = null)), w(d).after(f), p != u)
                                        if (null != p || g)
                                            if (null != u || h || 0 !== w(p).parentsUntil(S.$el, "table").length) p && u && 0 === w(p).parentsUntil(S.$el, "table").length && 0 === w(u).parentsUntil(S.$el, "table").length && 0 === w(p).find(u).length && 0 === w(u).find(p).length && (w(p).append(w(u).html()), w(u).remove());
                                            else {
                                                for (c = p; !c.nextSibling && c.parentNode != S.el;) c = c.parentNode;
                                                for (c = c.nextSibling; c && "BR" != c.tagName;) {
                                                    var m = c.nextSibling;
                                                    w(p).append(c), c = m
                                                }
                                                c && "BR" == c.tagName && w(c).remove()
                                            }
                                    else {
                                        var E = S.node.deepestParent(d);
                                        E ? (w(E).after(w(u).html()), w(u).remove()) : 0 === w(u).parentsUntil(S.$el, "table").length && (w(d).next().after(w(u).html()), w(u).remove())
                                    }
                                }
                            } else f = w(d).clone().attr("data-type", !1), w(d).after(f)
                        }
                }
                S.$el.find("li:empty").remove(), S.opts.keepFormatOnDelete || S.html.fillEmptyBlocks(), S.html.cleanEmptyTags(!0), S.opts.htmlUntouched || (S.clean.lists(), S.$el.find("li:empty").append("<br>"), S.spaces.normalize());
                var v = S.$el.find(".fr-marker:last").get(0),
                    b = S.$el.find(".fr-marker:first").get(0);
                void 0 !== v && void 0 !== b && !v.nextSibling && b.previousSibling && "BR" == b.previousSibling.tagName && S.node.isElement(v.parentNode) && S.node.isElement(b.parentNode) && S.$el.append("<br>"), C()
            },
            blocks: function() {
                var e, t = [],
                    n = T();
                if (p() && n.rangeCount) {
                    var r = c();
                    for (e = 0; e < r.length; e++) {
                        var o, i = r[e],
                            a = f(i.startContainer, i.startOffset),
                            s = f(i.endContainer, i.endOffset);
                        (S.node.isBlock(a) || S.node.hasClass(a, "fr-inner")) && t.indexOf(a) < 0 && t.push(a), (o = S.node.blockParent(a)) && t.indexOf(o) < 0 && t.push(o);
                        for (var l = [], d = a; d !== s && d !== S.el;) l.indexOf(d) < 0 && d.children && d.children.length ? (l.push(d), d = d.children[0]) : d.nextSibling ? d = d.nextSibling : d.parentNode && (d = d.parentNode, l.push(d)), S.node.isBlock(d) && l.indexOf(d) < 0 && t.indexOf(d) < 0 && (d !== s || 0 < i.endOffset) && t.push(d);
                        S.node.isBlock(s) && t.indexOf(s) < 0 && 0 < i.endOffset && t.push(s), (o = S.node.blockParent(s)) && t.indexOf(o) < 0 && t.push(o)
                    }
                }
                for (e = t.length - 1; 0 < e; e--) w(t[e]).find(t).length && t.splice(e, 1);
                return t
            },
            info: o,
            setAtEnd: i,
            setAtStart: r,
            setBefore: function(e, t) {
                void 0 === t && (t = !0);
                for (var n = e.previousSibling; n && n.nodeType == Node.TEXT_NODE && 0 === n.textContent.length;) n = n.previousSibling;
                return n ? (S.node.isBlock(n) ? i(n) : "BR" == n.tagName ? w(n).before(w.FE.MARKERS) : w(n).after(w.FE.MARKERS), !0) : !!t && (S.node.isBlock(e) ? r(e) : w(e).before(w.FE.MARKERS), !0)
            },
            setAfter: function(e, t) {
                void 0 === t && (t = !0);
                for (var n = e.nextSibling; n && n.nodeType == Node.TEXT_NODE && 0 === n.textContent.length;) n = n.nextSibling;
                return n ? (S.node.isBlock(n) ? r(n) : w(n).before(w.FE.MARKERS), !0) : !!t && (S.node.isBlock(e) ? i(e) : w(e).after(w.FE.MARKERS), !0)
            },
            rangeElement: f
        }
    }, w.extend(w.FE.DEFAULTS, {
        htmlAllowedTags: ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr"],
        htmlRemoveTags: ["script", "style"],
        htmlAllowedAttrs: ["accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen", "allowtransparency", "alt", "aria-.*", "async", "autocomplete", "autofocus", "autoplay", "autosave", "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked", "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "dropzone", "enctype", "for", "form", "formaction", "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen", "multiple", "muted", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start", "step", "summary", "spellcheck", "style", "tabindex", "target", "title", "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap"],
        htmlAllowedStyleProps: [".*"],
        htmlAllowComments: !0,
        htmlUntouched: !1,
        fullPage: !1
    }), w.FE.HTML5Map = {
        B: "STRONG",
        I: "EM",
        STRIKE: "S"
    }, w.FE.MODULES.clean = function(f) {
        var p, u, g, h;

        function o(e) {
            if (e.nodeType == Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= e.getAttribute("class").indexOf("fr-marker")) return !1;
            var t, n = f.node.contents(e),
                r = [];
            for (t = 0; t < n.length; t++) n[t].nodeType != Node.ELEMENT_NODE || f.node.isVoid(n[t]) ? n[t].nodeType == Node.TEXT_NODE && (n[t].textContent = n[t].textContent.replace(/\u200b/g, "")) : n[t].textContent.replace(/\u200b/g, "").length != n[t].textContent.length && o(n[t]);
            if (e.nodeType == Node.ELEMENT_NODE && !f.node.isVoid(e) && (e.normalize(), n = f.node.contents(e), r = e.querySelectorAll(".fr-marker"), n.length - r.length == 0)) {
                for (t = 0; t < n.length; t++)
                    if (n[t].nodeType == Node.ELEMENT_NODE && (n[t].getAttribute("class") || "").indexOf("fr-marker") < 0) return !1;
                for (t = 0; t < r.length; t++) e.parentNode.insertBefore(r[t].cloneNode(!0), e);
                return e.parentNode.removeChild(e), !1
            }
        }

        function s(e, t) {
            if (e.nodeType == Node.COMMENT_NODE) return "\x3c!--" + e.nodeValue + "--\x3e";
            if (e.nodeType == Node.TEXT_NODE) return t ? e.textContent.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e.textContent.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\u0009/g, "");
            if (e.nodeType != Node.ELEMENT_NODE) return e.outerHTML;
            if (e.nodeType == Node.ELEMENT_NODE && 0 <= ["STYLE", "SCRIPT", "NOSCRIPT"].indexOf(e.tagName)) return e.outerHTML;
            if (e.nodeType == Node.ELEMENT_NODE && "svg" == e.tagName) {
                var n = document.createElement("div"),
                    r = e.cloneNode(!0);
                return n.appendChild(r), n.innerHTML
            }
            if ("IFRAME" == e.tagName) return e.outerHTML.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
            var o = e.childNodes;
            if (0 === o.length) return e.outerHTML;
            for (var i = "", a = 0; a < o.length; a++) "PRE" == e.tagName && (t = !0), i += s(o[a], t);
            return f.node.openTagString(e) + i + f.node.closeTagString(e)
        }
        var a = [];

        function m(e) {
            var t = e.replace(/;;/gi, ";");
            return ";" != (t = t.replace(/^;/gi, "")).charAt(t.length) && (t += ";"), t
        }

        function l(e) {
            var t;
            for (t in e)
                if (e.hasOwnProperty(t)) {
                    var n = t.match(g),
                        r = null;
                    "style" == t && f.opts.htmlAllowedStyleProps.length && (r = e[t].match(h)), n && r ? e[t] = m(r.join(";")) : n && ("style" != t || r) || delete e[t]
                }
            for (var o = "", i = Object.keys(e).sort(), a = 0; a < i.length; a++) e[t = i[a]].indexOf('"') < 0 ? o += " " + t + '="' + e[t] + '"' : o += " " + t + "='" + e[t] + "'";
            return o
        }

        function d(e, t) {
            var n, r = document.implementation.createHTMLDocument("Froala DOC").createElement("DIV");
            w(r).append(e);
            var o = "";
            if (r) {
                var i = f.node.contents(r);
                for (n = 0; n < i.length; n++) t(i[n]);
                for (i = f.node.contents(r), n = 0; n < i.length; n++) o += s(i[n])
            }
            return o
        }

        function c(e, t, n) {
            a = [];
            var r = e = e.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function(e) {
                    return a.push(e), "[FROALA.EDITOR.SCRIPT " + (a.length - 1) + "]"
                }).replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, function(e) {
                    return a.push(e), "[FROALA.EDITOR.NOSCRIPT " + (a.length - 1) + "]"
                }).replace(/<meta((?:[\w\W]*?)) http-equiv="/g, '<meta$1 data-fr-http-equiv="').replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-fr-src="'),
                o = null;
            f.opts.fullPage && (r = f.html.extractNode(e, "body") || (0 <= e.indexOf("<body") ? "" : e), n && (o = f.html.extractNode(e, "head") || "")), r = d(r, t), o && (o = d(o, t));
            var i = function(e, t, n) {
                if (f.opts.fullPage) {
                    var r = f.html.extractDoctype(n),
                        o = l(f.html.extractNodeAttrs(n, "html"));
                    return t = null == t ? f.html.extractNode(n, "head") || "<title></title>" : t, r + "<html" + o + "><head" + l(f.html.extractNodeAttrs(n, "head")) + ">" + t + "</head><body" + l(f.html.extractNodeAttrs(n, "body")) + ">" + e + "</body></html>"
                }
                return e
            }(r, o, e);
            return i.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi, function(e, t) {
                return 0 <= f.opts.htmlRemoveTags.indexOf("script") ? "" : a[parseInt(t, 10)]
            }).replace(/\[FROALA\.EDITOR\.NOSCRIPT ([\d]*)\]/gi, function(e, t) {
                return 0 <= f.opts.htmlRemoveTags.indexOf("noscript") ? "" : a[parseInt(t, 10)].replace(/\&lt;/g, "<").replace(/\&gt;/g, ">")
            }).replace(/<img((?:[\w\W]*?)) data-fr-src="/g, '<img$1 src="')
        }

        function E(e) {
            var t = f.doc.createElement("DIV");
            return t.innerText = e, t.textContent
        }

        function v(e) {
            for (var t = f.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType != Node.TEXT_NODE && v(t[n]);
            ! function(e) {
                if ("SPAN" == e.tagName && 0 <= (e.getAttribute("class") || "").indexOf("fr-marker")) return;
                var t, n;
                if ("PRE" == e.tagName && 0 <= (n = (t = e).innerHTML).indexOf("\n") && (t.innerHTML = n.replace(/\n/g, "<br>")), e.nodeType == Node.ELEMENT_NODE && (e.getAttribute("data-fr-src") && 0 !== e.getAttribute("data-fr-src").indexOf("blob:") && e.setAttribute("data-fr-src", f.helpers.sanitizeURL(E(e.getAttribute("data-fr-src")))), e.getAttribute("href") && e.setAttribute("href", f.helpers.sanitizeURL(E(e.getAttribute("href")))), e.getAttribute("src") && e.setAttribute("src", f.helpers.sanitizeURL(E(e.getAttribute("src")))), e.getAttribute("data") && e.setAttribute("data", f.helpers.sanitizeURL(E(e.getAttribute("data")))), 0 <= ["TABLE", "TBODY", "TFOOT", "TR"].indexOf(e.tagName) && (e.innerHTML = e.innerHTML.trim())), !f.opts.pasteAllowLocalImages && e.nodeType == Node.ELEMENT_NODE && "IMG" == e.tagName && e.getAttribute("data-fr-src") && 0 === e.getAttribute("data-fr-src").indexOf("file://")) return e.parentNode.removeChild(e);
                if (e.nodeType == Node.ELEMENT_NODE && w.FE.HTML5Map[e.tagName] && "" === f.node.attributes(e)) {
                    var r = w.FE.HTML5Map[e.tagName],
                        o = "<" + r + ">" + e.innerHTML + "</" + r + ">";
                    e.insertAdjacentHTML("beforebegin", o), (e = e.previousSibling).parentNode.removeChild(e.nextSibling)
                }
                if (f.opts.htmlAllowComments || e.nodeType != Node.COMMENT_NODE)
                    if (e.tagName && e.tagName.match(u)) e.parentNode.removeChild(e);
                    else if (e.tagName && !e.tagName.match(p)) {
                    if ("svg" === e.tagName) e.parentNode.removeChild(e);
                    else if (!f.browser.safari || "path" != e.tagName || !e.parentNode || "svg" != e.parentNode.tagName) try {
                        e.outerHTML = e.innerHTML
                    } catch (c) {}
                } else {
                    var i = e.attributes;
                    if (i)
                        for (var a = i.length - 1; 0 <= a; a--) {
                            var s = i[a],
                                l = s.nodeName.match(g),
                                d = null;
                            "style" == s.nodeName && f.opts.htmlAllowedStyleProps.length && (d = s.value.match(h)), l && d ? s.value = m(d.join(";")) : l && ("style" != s.nodeName || d) || e.removeAttribute(s.nodeName)
                        }
                } else 0 !== e.data.indexOf("[FROALA.EDITOR") && e.parentNode.removeChild(e)
            }(e)
        }
        return {
            _init: function() {
                f.opts.fullPage && w.merge(f.opts.htmlAllowedTags, ["head", "title", "style", "link", "base", "body", "html", "meta"])
            },
            html: function(e, t, n, r) {
                void 0 === t && (t = []), void 0 === n && (n = []), void 0 === r && (r = !1);
                var o, i = w.merge([], f.opts.htmlAllowedTags);
                for (o = 0; o < t.length; o++) 0 <= i.indexOf(t[o]) && i.splice(i.indexOf(t[o]), 1);
                var a = w.merge([], f.opts.htmlAllowedAttrs);
                for (o = 0; o < n.length; o++) 0 <= a.indexOf(n[o]) && a.splice(a.indexOf(n[o]), 1);
                return a.push("data-fr-.*"), a.push("fr-.*"), p = new RegExp("^" + i.join("$|^") + "$", "gi"), g = new RegExp("^" + a.join("$|^") + "$", "gi"), u = new RegExp("^" + f.opts.htmlRemoveTags.join("$|^") + "$", "gi"), h = f.opts.htmlAllowedStyleProps.length ? new RegExp("((^|;|\\s)" + f.opts.htmlAllowedStyleProps.join(":.+?(?=;|$))|((^|;|\\s)") + ":.+?(?=(;)|$))", "gi") : null, e = c(e, v, !0)
            },
            toHTML5: function() {
                var e = f.el.querySelectorAll(Object.keys(w.FE.HTML5Map).join(","));
                if (e.length) {
                    var t = !1;
                    f.el.querySelector(".fr-marker") || (f.selection.save(), t = !0);
                    for (var n = 0; n < e.length; n++) "" === f.node.attributes(e[n]) && w(e[n]).replaceWith("<" + w.FE.HTML5Map[e[n].tagName] + ">" + e[n].innerHTML + "</" + w.FE.HTML5Map[e[n].tagName] + ">");
                    t && f.selection.restore()
                }
            },
            tables: function() {
                ! function() {
                    for (var e = f.el.querySelectorAll("tr"), t = 0; t < e.length; t++) {
                        for (var n = e[t].children, r = !0, o = 0; o < n.length; o++)
                            if ("TH" != n[o].tagName) {
                                r = !1;
                                break
                            }
                        if (!1 !== r && 0 !== n.length) {
                            for (var i = e[t]; i && "TABLE" != i.tagName && "THEAD" != i.tagName;) i = i.parentNode;
                            var a = i;
                            "THEAD" != a.tagName && (a = f.doc.createElement("THEAD"), i.insertBefore(a, i.firstChild)), a.appendChild(e[t])
                        }
                    }
                }()
            },
            lists: function() {
                ! function() {
                    var e, t = [];
                    do {
                        if (t.length) {
                            var n = t[0],
                                r = f.doc.createElement("ul");
                            n.parentNode.insertBefore(r, n);
                            do {
                                var o = n;
                                n = n.nextSibling, r.appendChild(o)
                            } while (n && "LI" == n.tagName)
                        }
                        t = [];
                        for (var i = f.el.querySelectorAll("li"), a = 0; a < i.length; a++) e = i[a], f.node.isList(e.parentNode) || t.push(i[a])
                    } while (0 < t.length)
                }(),
                function() {
                    for (var e = f.el.querySelectorAll("ol + ol, ul + ul"), t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (f.node.isList(n.previousSibling) && f.node.openTagString(n) == f.node.openTagString(n.previousSibling)) {
                            for (var r = f.node.contents(n), o = 0; o < r.length; o++) n.previousSibling.appendChild(r[o]);
                            n.parentNode.removeChild(n)
                        }
                    }
                }(),
                function() {
                    for (var e = f.el.querySelectorAll("ul, ol"), t = 0; t < e.length; t++)
                        for (var n = f.node.contents(e[t]), r = null, o = n.length - 1; 0 <= o; o--) "LI" != n[o].tagName && "UL" != n[o].tagName && "OL" != n[o].tagName ? (r || (r = w("<li>")).insertBefore(n[o]), r.prepend(n[o])) : r = null
                }(),
                function() {
                    var e, t, n;
                    do {
                        t = !1;
                        var r = f.el.querySelectorAll("li:empty");
                        for (e = 0; e < r.length; e++) r[e].parentNode.removeChild(r[e]);
                        var o = f.el.querySelectorAll("ul, ol");
                        for (e = 0; e < o.length; e++)(n = o[e]).querySelector("LI") || (t = !0, n.parentNode.removeChild(n))
                    } while (!0 === t)
                }(),
                function() {
                    for (var e = f.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"), t = 0; t < e.length; t++) {
                        var n = e[t],
                            r = n.previousSibling;
                        r && ("LI" == r.tagName ? r.appendChild(n) : w(n).wrap("<li></li>"))
                    }
                }(),
                function() {
                    for (var e = f.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (n.nextSibling) {
                            var r = n.nextSibling,
                                o = w("<li>");
                            w(n.parentNode).after(o);
                            do {
                                var i = r;
                                r = r.nextSibling, o.append(i)
                            } while (r)
                        }
                    }
                }(),
                function() {
                    for (var e = f.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (f.node.isFirstSibling(n)) w(n).before("<br/>");
                        else if (n.previousSibling && "BR" == n.previousSibling.tagName) {
                            for (var r = n.previousSibling.previousSibling; r && f.node.hasClass(r, "fr-marker");) r = r.previousSibling;
                            r && "BR" != r.tagName && w(n.previousSibling).remove()
                        }
                    }
                }(),
                function() {
                    for (var e = f.el.querySelectorAll("li:empty"), t = 0; t < e.length; t++) w(e[t]).remove()
                }()
            },
            invisibleSpaces: function(e) {
                return e.replace(/\u200b/g, "").length == e.length ? e : f.clean.exec(e, o)
            },
            exec: c
        }
    }, w.FE.MODULES.spaces = function(l) {
        function r(e, t) {
            var n = e.previousSibling,
                r = e.nextSibling,
                o = e.textContent,
                i = e.parentNode;
            if (!l.html.isPreformatted(i)) {
                t && (o = o.replace(/[\f\n\r\t\v ]{2,}/g, " "), r && "BR" !== r.tagName && !l.node.isBlock(r) || !(l.node.isBlock(i) || l.node.isLink(i) && !i.nextSibling || l.node.isElement(i)) || (o = o.replace(/[\f\n\r\t\v ]{1,}$/g, "")), n && "BR" !== n.tagName && !l.node.isBlock(n) || !(l.node.isBlock(i) || l.node.isLink(i) && !i.previousSibling || l.node.isElement(i)) || (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), (l.node.isBlock(r) || l.node.isBlock(n)) && (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), " " === o && (n && l.node.isVoid(n) || r && l.node.isVoid(r)) && !(n && r && l.node.isVoid(n) || r && n && l.node.isVoid(r)) && (o = "")), (!n && l.node.isBlock(r) || !r && l.node.isBlock(n)) && l.node.isBlock(i) && i !== l.el && (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, ""));
                for (var a = "", s = 0; s < o.length; s++) 32 != o.charCodeAt(s) || 0 !== s && 32 != a.charCodeAt(s - 1) || n && r && l.node.isVoid(n) || n && r && l.node.isVoid(r) ? a += o[s] : a += w.FE.UNICODE_NBSP;
                (!r || r && l.node.isBlock(r) || r && r.nodeType == Node.ELEMENT_NODE && l.win.getComputedStyle(r) && "block" == l.win.getComputedStyle(r).display) && (l.node.isVoid(n) || (a = a.replace(/ $/, w.FE.UNICODE_NBSP))), !n || l.node.isVoid(n) || l.node.isBlock(n) || 1 !== (a = a.replace(/^\u00A0([^ $])/, " $1")).length || 160 !== a.charCodeAt(0) || !r || l.node.isVoid(r) || l.node.isBlock(r) || l.node.hasClass(n, "fr-marker") && l.node.hasClass(r, "fr-marker") || (a = " "), e.textContent != a && (e.textContent = a)
            }
        }

        function d(e, t) {
            if (void 0 !== e && e || (e = l.el), void 0 === t && (t = !1), !e.getAttribute || "false" != e.getAttribute("contenteditable"))
                if (e.nodeType == Node.TEXT_NODE) r(e, t);
                else if (e.nodeType == Node.ELEMENT_NODE)
                for (var n = l.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, l.node.filter(function(e) {
                        for (var t = e.parentNode; t && t !== l.el;) {
                            if ("STYLE" == t.tagName || "IFRAME" == t.tagName) return !1;
                            if ("PRE" === t.tagName) return !1;
                            t = t.parentNode
                        }
                        return null != e.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g) && !l.node.hasClass(e.parentNode, "fr-marker")
                    }), !1); n.nextNode();) r(n.currentNode, t)
        }
        return {
            normalize: d,
            normalizeAroundCursor: function() {
                for (var e = [], t = l.el.querySelectorAll(".fr-marker"), n = 0; n < t.length; n++) {
                    for (var r = null, o = l.node.blockParent(t[n]), i = (r = o || t[n]).nextSibling, a = r.previousSibling; i && "BR" == i.tagName;) i = i.nextSibling;
                    for (; a && "BR" == a.tagName;) a = a.previousSibling;
                    r && e.indexOf(r) < 0 && e.push(r), a && e.indexOf(a) < 0 && e.push(a), i && e.indexOf(i) < 0 && e.push(i)
                }
                for (var s = 0; s < e.length; s++) d(e[s])
            }
        }
    }, w.FE.UNICODE_NBSP = String.fromCharCode(160), w.FE.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"], w.FE.BLOCK_TAGS = ["address", "article", "aside", "audio", "blockquote", "canvas", "details", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", "video"], w.extend(w.FE.DEFAULTS, {
        htmlAllowedEmptyTags: ["textarea", "a", "iframe", "object", "video", "style", "script", ".fa", ".fr-emoticon", ".fr-inner", "path", "line"],
        htmlDoNotWrapTags: ["script", "style"],
        htmlSimpleAmpersand: !1,
        htmlIgnoreCSSProperties: [],
        htmlExecuteScripts: !0
    }), w.FE.MODULES.html = function(F) {
        function c() {
            return F.opts.enter == w.FE.ENTER_P ? "p" : F.opts.enter == w.FE.ENTER_DIV ? "div" : F.opts.enter == w.FE.ENTER_BR ? null : void 0
        }

        function s(e, t) {
            return !(!e || e === F.el) && (t ? -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName) || s(e.parentNode, t) : -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName))
        }

        function i(e) {
            var t, n = [],
                r = [];
            if (e) {
                var o = F.el.querySelectorAll(".fr-marker");
                for (t = 0; t < o.length; t++) {
                    var i = F.node.blockParent(o[t]) || o[t];
                    if (i) {
                        var a = i.nextSibling,
                            s = i.previousSibling;
                        i && r.indexOf(i) < 0 && F.node.isBlock(i) && r.push(i), s && F.node.isBlock(s) && r.indexOf(s) < 0 && r.push(s), a && F.node.isBlock(a) && r.indexOf(a) < 0 && r.push(a)
                    }
                }
            } else r = F.el.querySelectorAll(p());
            var l = p();
            for (l += "," + w.FE.VOID_ELEMENTS.join(","), l += ", .fr-inner", l += "," + F.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)", t = r.length - 1; 0 <= t; t--)
                if (!(r[t].textContent && 0 < r[t].textContent.replace(/\u200B|\n/g, "").length || 0 < r[t].querySelectorAll(l).length)) {
                    for (var d = F.node.contents(r[t]), c = !1, f = 0; f < d.length; f++)
                        if (d[f].nodeType != Node.COMMENT_NODE && d[f].textContent && 0 < d[f].textContent.replace(/\u200B|\n/g, "").length) {
                            c = !0;
                            break
                        }
                    c || n.push(r[t])
                }
            return n
        }

        function p() {
            return w.FE.BLOCK_TAGS.join(", ")
        }

        function e(e) {
            var t, n, r = w.merge([], w.FE.VOID_ELEMENTS);
            r = w.merge(r, F.opts.htmlAllowedEmptyTags), r = void 0 === e ? w.merge(r, w.FE.BLOCK_TAGS) : w.merge(r, w.FE.NO_DELETE_TAGS), t = F.el.querySelectorAll("*:empty:not(" + r.join("):not(") + "):not(.fr-marker)");
            do {
                n = !1;
                for (var o = 0; o < t.length; o++) 0 !== t[o].attributes.length && void 0 === t[o].getAttribute("href") || (t[o].parentNode.removeChild(t[o]), n = !0);
                t = F.el.querySelectorAll("*:empty:not(" + r.join("):not(") + "):not(.fr-marker)")
            } while (t.length && n)
        }

        function a(e, t) {
            var n = c();
            if (t && (n = "div"), n) {
                for (var r = F.doc.createDocumentFragment(), o = null, i = !1, a = e.firstChild, s = !1; a;) {
                    var l = a.nextSibling;
                    if (a.nodeType == Node.ELEMENT_NODE && (F.node.isBlock(a) || 0 <= F.opts.htmlDoNotWrapTags.indexOf(a.tagName.toLowerCase()) && !F.node.hasClass(a, "fr-marker"))) o = null, r.appendChild(a.cloneNode(!0));
                    else if (a.nodeType != Node.ELEMENT_NODE && a.nodeType != Node.TEXT_NODE) o = null, r.appendChild(a.cloneNode(!0));
                    else if ("BR" == a.tagName) null == o ? (o = F.doc.createElement(n), s = !0, t && (o.setAttribute("class", "fr-temp-div"), o.setAttribute("data-empty", !0)), o.appendChild(a.cloneNode(!0)), r.appendChild(o)) : !1 === i && (o.appendChild(F.doc.createElement("br")), t && (o.setAttribute("class", "fr-temp-div"), o.setAttribute("data-empty", !0))), o = null;
                    else {
                        var d = a.textContent;
                        a.nodeType !== Node.TEXT_NODE || 0 < d.replace(/\n/g, "").replace(/(^ *)|( *$)/g, "").length || d.replace(/(^ *)|( *$)/g, "").length && d.indexOf("\n") < 0 ? (null == o && (o = F.doc.createElement(n), s = !0, t && o.setAttribute("class", "fr-temp-div"), r.appendChild(o), i = !1), o.appendChild(a.cloneNode(!0)), i || F.node.hasClass(a, "fr-marker") || a.nodeType == Node.TEXT_NODE && 0 === d.replace(/ /g, "").length || (i = !0)) : s = !0
                    }
                    a = l
                }
                s && (e.innerHTML = "", e.appendChild(r))
            }
        }

        function l(e, t) {
            for (var n = e.length - 1; 0 <= n; n--) a(e[n], t)
        }

        function t(e, t, n, r, o) {
            if (!F.$wp) return !1;
            void 0 === e && (e = !1), void 0 === t && (t = !1), void 0 === n && (n = !1), void 0 === r && (r = !1), void 0 === o && (o = !1);
            var i = F.$wp.scrollTop();
            a(F.el, e), r && l(F.el.querySelectorAll(".fr-inner"), e), t && l(F.el.querySelectorAll("td, th"), e), n && l(F.el.querySelectorAll("blockquote"), e), o && l(F.el.querySelectorAll("li"), e), i != F.$wp.scrollTop() && F.$wp.scrollTop(i)
        }

        function n(e) {
            if (void 0 === e && (e = F.el), e && 0 <= ["SCRIPT", "STYLE", "PRE"].indexOf(e.tagName)) return !1;
            for (var t = F.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, F.node.filter(function(e) {
                    return null != e.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g)
                }), !1); t.nextNode();) {
                var n = t.currentNode;
                if (!s(n.parentNode, !0)) {
                    var r = F.node.isBlock(n.parentNode) || F.node.isElement(n.parentNode),
                        o = n.textContent.replace(/(?!^)( ){2,}(?!$)/g, " ").replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " ");
                    if (r) {
                        var i = n.previousSibling,
                            a = n.nextSibling;
                        i && a && " " == o ? o = F.node.isBlock(i) && F.node.isBlock(a) ? "" : " " : (i || (o = o.replace(/^ */, "")), a || (o = o.replace(/ *$/, "")))
                    }
                    n.textContent = o
                }
            }
        }

        function r(e, t, n) {
            var r = new RegExp(t, "gi").exec(e);
            return r ? r[n] : null
        }

        function k(e) {
            var t = e.doctype,
                n = "<!DOCTYPE html>";
            return t && (n = "<!DOCTYPE " + t.name + (t.publicId ? ' PUBLIC "' + t.publicId + '"' : "") + (!t.publicId && t.systemId ? " SYSTEM" : "") + (t.systemId ? ' "' + t.systemId + '"' : "") + ">"), n
        }

        function d(e) {
            var t = e.parentNode;
            if (t && (F.node.isBlock(t) || F.node.isElement(t)) && ["TD", "TH"].indexOf(t.tagName) < 0) {
                for (var n = e.previousSibling, r = e.nextSibling; n && (n.nodeType == Node.TEXT_NODE && 0 === n.textContent.replace(/\n|\r/g, "").length || F.node.hasClass(n, "fr-tmp"));) n = n.previousSibling;
                if (r) return !1;
                n && t && "BR" != n.tagName && !F.node.isBlock(n) && !r && 0 < t.textContent.replace(/\u200B/g, "").length && 0 < n.textContent.length && !F.node.hasClass(n, "fr-marker") && (F.el == t && !r && F.opts.enter == w.FE.ENTER_BR && F.browser.msie || e.parentNode.removeChild(e))
            } else !t || F.node.isBlock(t) || F.node.isElement(t) || e.previousSibling || e.nextSibling || !F.node.isDeletable(e.parentNode) || d(e.parentNode)
        }

        function u() {
            F.opts.htmlUntouched || (e(), t(), n(), F.spaces.normalize(null, !0), F.html.fillEmptyBlocks(), F.clean.lists(), F.clean.tables(), F.clean.toHTML5(), F.html.cleanBRs()), F.selection.restore(), o(), F.placeholder.refresh()
        }

        function o() {
            F.node.isEmpty(F.el) && (null != c() ? F.el.querySelector(p()) || F.el.querySelector(F.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || (F.core.hasFocus() ? (F.$el.html("<" + c() + ">" + w.FE.MARKERS + "<br/></" + c() + ">"), F.selection.restore()) : F.$el.html("<" + c() + "><br/></" + c() + ">")) : F.el.querySelector("*:not(.fr-marker):not(br)") || (F.core.hasFocus() ? (F.$el.html(w.FE.MARKERS + "<br/>"), F.selection.restore()) : F.$el.html("<br/>")))
        }

        function g(e, t) {
            return r(e, "<" + t + "[^>]*?>([\\w\\W]*)</" + t + ">", 1)
        }

        function h(e, t) {
            var n = w("<div " + (r(e, "<" + t + "([^>]*?)>", 1) || "") + ">");
            return F.node.rawAttributes(n.get(0))
        }

        function m(e) {
            return (r(e, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>").replace(/\n/g, " ").replace(/ {2,}/g, " ")
        }

        function E(e, t) {
            F.opts.htmlExecuteScripts ? e.html(t) : e.get(0).innerHTML = t
        }

        function D(e) {
            var t;
            (t = /:not\(([^\)]*)\)/g).test(e) && (e = e.replace(t, "     $1 "));
            var n = 100 * (e.match(/(#[^\s\+>~\.\[:]+)/g) || []).length + 10 * (e.match(/(\[[^\]]+\])/g) || []).length + 10 * (e.match(/(\.[^\s\+>~\.\[:]+)/g) || []).length + 10 * (e.match(/(:[\w-]+\([^\)]*\))/gi) || []).length + 10 * (e.match(/(:[^\s\+>~\.\[:]+)/g) || []).length + (e.match(/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi) || []).length;
            return n += ((e = (e = e.replace(/[\*\s\+>~]/g, " ")).replace(/[#\.]/g, " ")).match(/([^\s\+>~\.\[:]+)/g) || []).length
        }

        function M(e) {
            if (F.events.trigger("html.processGet", [e]), e && e.getAttribute && "" === e.getAttribute("class") && e.removeAttribute("class"), e && e.getAttribute && "" === e.getAttribute("style") && e.removeAttribute("style"), e && e.nodeType == Node.ELEMENT_NODE) {
                var t, n = e.querySelectorAll('[class=""],[style=""]');
                for (t = 0; t < n.length; t++) {
                    var r = n[t];
                    "" === r.getAttribute("class") && r.removeAttribute("class"), "" === r.getAttribute("style") && r.removeAttribute("style")
                }
                if ("BR" === e.tagName) d(e);
                else {
                    var o = e.querySelectorAll("br");
                    for (t = 0; t < o.length; t++) d(o[t])
                }
            }
        }

        function _(e, t) {
            return e[3] - t[3]
        }

        function f(e) {
            var t = F.doc.createElement("div");
            return t.innerHTML = e, null !== t.querySelector(p())
        }

        function v(e) {
            var t = null;
            if (void 0 === e && (t = F.selection.element()), F.opts.keepFormatOnDelete) return !1;
            var n, r, o = t ? (t.textContent.match(/\u200B/g) || []).length - t.querySelectorAll(".fr-marker").length : 0;
            if ((F.el.textContent.match(/\u200B/g) || []).length - F.el.querySelectorAll(".fr-marker").length == o) return !1;
            do {
                r = !1, n = F.el.querySelectorAll("*:not(.fr-marker)");
                for (var i = 0; i < n.length; i++) {
                    var a = n[i];
                    if (t != a) {
                        var s = a.textContent;
                        0 === a.children.length && 1 === s.length && 8203 == s.charCodeAt(0) && "TD" !== a.tagName && (w(a).remove(), r = !0)
                    }
                }
            } while (r)
        }
        return {
            defaultTag: c,
            isPreformatted: s,
            emptyBlocks: i,
            emptyBlockTagsQuery: function() {
                return w.FE.BLOCK_TAGS.join(":empty, ") + ":empty"
            },
            blockTagsQuery: p,
            fillEmptyBlocks: function(e) {
                var t = i(e);
                F.node.isEmpty(F.el) && F.opts.enter === w.FE.ENTER_BR && t.push(F.el);
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    "false" === r.getAttribute("contenteditable") || r.querySelector(F.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || F.node.isVoid(r) || "TABLE" != r.tagName && "TBODY" != r.tagName && "TR" != r.tagName && "UL" != r.tagName && "OL" != r.tagName && r.appendChild(F.doc.createElement("br"))
                }
                if (F.browser.msie && F.opts.enter == w.FE.ENTER_BR) {
                    var o = F.node.contents(F.el);
                    o.length && o[o.length - 1].nodeType == Node.TEXT_NODE && F.$el.append("<br>")
                }
            },
            cleanEmptyTags: e,
            cleanWhiteTags: v,
            cleanBlankSpaces: n,
            blocks: function() {
                return F.$el.get(0).querySelectorAll(p())
            },
            getDoctype: k,
            set: function(e) {
                var t, n, r, o = F.clean.html((e || "").trim(), [], [], F.opts.fullPage);
                if (F.opts.fullPage) {
                    var i = g(o, "body") || (0 <= o.indexOf("<body") ? "" : o),
                        a = h(o, "body"),
                        s = g(o, "head") || "<title></title>",
                        l = h(o, "head"),
                        d = w("<div>").append(s).contents().each(function() {
                            (this.nodeType == Node.COMMENT_NODE || 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName)) && this.parentNode.removeChild(this)
                        }).end().html().trim();
                    s = w("<div>").append(s).contents().map(function() {
                        return this.nodeType == Node.COMMENT_NODE ? "\x3c!--" + this.nodeValue + "--\x3e" : 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) ? this.outerHTML : ""
                    }).toArray().join("");
                    var c = m(o),
                        f = h(o, "html");
                    E(F.$el, d + "\n" + i), F.node.clearAttributes(F.el), F.$el.attr(a), F.$el.addClass("fr-view"), F.$el.attr("spellcheck", F.opts.spellcheck), F.$el.attr("dir", F.opts.direction), E(F.$head, s), F.node.clearAttributes(F.$head.get(0)), F.$head.attr(l), F.node.clearAttributes(F.$html.get(0)), F.$html.attr(f), F.iframe_document.doctype.parentNode.replaceChild((t = c, n = F.iframe_document, (r = t.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i)) ? n.implementation.createDocumentType(r[1], r[3], r[4]) : n.implementation.createDocumentType("html")), F.iframe_document.doctype)
                } else E(F.$el, o);
                var p = F.edit.isDisabled();
                F.edit.on(), F.core.injectStyle(F.opts.iframeDefaultStyle + F.opts.iframeStyle), u(), F.opts.useClasses || (F.$el.find("[fr-original-class]").each(function() {
                    this.setAttribute("class", this.getAttribute("fr-original-class")), this.removeAttribute("fr-original-class")
                }), F.$el.find("[fr-original-style]").each(function() {
                    this.setAttribute("style", this.getAttribute("fr-original-style")), this.removeAttribute("fr-original-style")
                })), p && F.edit.off(), F.events.trigger("html.set")
            },
            get: function(e, t) {
                if (!F.$wp) return F.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;
                var n = "";
                F.events.trigger("html.beforeGet");
                var r, o, i = [],
                    a = {},
                    s = [],
                    l = F.el.querySelectorAll("input, textarea");
                for (r = 0; r < l.length; r++) l[r].setAttribute("value", l[r].value);
                if (!F.opts.useClasses && !t) {
                    var d = new RegExp("^" + F.opts.htmlIgnoreCSSProperties.join("$|^") + "$", "gi");
                    for (r = 0; r < F.doc.styleSheets.length; r++) {
                        var c, f = 0;
                        try {
                            c = F.doc.styleSheets[r].cssRules, F.doc.styleSheets[r].ownerNode && "STYLE" == F.doc.styleSheets[r].ownerNode.nodeType && (f = 1)
                        } catch (w) {}
                        if (c)
                            for (var p = 0, u = c.length; p < u; p++)
                                if (c[p].selectorText && 0 < c[p].style.cssText.length) {
                                    var g, h = c[p].selectorText.replace(/body |\.fr-view /g, "").replace(/::/g, ":");
                                    try {
                                        g = F.el.querySelectorAll(h)
                                    } catch (w) {
                                        g = []
                                    }
                                    for (o = 0; o < g.length; o++) {
                                        !g[o].getAttribute("fr-original-style") && g[o].getAttribute("style") ? (g[o].setAttribute("fr-original-style", g[o].getAttribute("style")), i.push(g[o])) : g[o].getAttribute("fr-original-style") || (g[o].setAttribute("fr-original-style", ""), i.push(g[o])), a[g[o]] || (a[g[o]] = {});
                                        for (var m = 1e3 * f + D(c[p].selectorText), E = c[p].style.cssText.split(";"), v = 0; v < E.length; v++) {
                                            var b = E[v].trim().split(":")[0];
                                            if (b && !b.match(d) && (a[g[o]][b] || (a[g[o]][b] = 0) <= (g[o].getAttribute("fr-original-style") || "").indexOf(b + ":") && (a[g[o]][b] = 1e4), m >= a[g[o]][b] && (a[g[o]][b] = m, E[v].trim().length))) {
                                                var S = E[v].trim().split(":");
                                                S.splice(0, 1), s.push([g[o], b.trim(), S.join(":").trim(), m])
                                            }
                                        }
                                    }
                                }
                    }
                    for (s.sort(_), r = 0; r < s.length; r++) {
                        var T = s[r];
                        T[0].style[T[1]] = T[2]
                    }
                    for (r = 0; r < i.length; r++)
                        if (i[r].getAttribute("class") && (i[r].setAttribute("fr-original-class", i[r].getAttribute("class")), i[r].removeAttribute("class")), 0 < (i[r].getAttribute("fr-original-style") || "").trim().length) {
                            var y = i[r].getAttribute("fr-original-style").split(";");
                            for (o = 0; o < y.length; o++)
                                if (0 < y[o].indexOf(":")) {
                                    var N = y[o].split(":"),
                                        C = N[0];
                                    N.splice(0, 1), i[r].style[C.trim()] = N.join(":").trim()
                                }
                        }
                }
                if (F.node.isEmpty(F.el)) F.opts.fullPage && (n = k(F.iframe_document), n += "<html" + F.node.attributes(F.$html.get(0)) + ">" + F.$html.find("head").get(0).outerHTML + "<body></body></html>");
                else if (void 0 === e && (e = !1), F.opts.fullPage) {
                    n = k(F.iframe_document), F.$el.removeClass("fr-view");
                    var A = F.opts.heightMin,
                        x = F.opts.height,
                        $ = F.opts.heightMax;
                    F.opts.heightMin = null, F.opts.height = null, F.opts.heightMax = null, F.size.refresh(), n += "<html" + F.node.attributes(F.$html.get(0)) + ">" + F.$html.html() + "</html>", F.opts.heightMin = A, F.opts.height = x, F.opts.heightMax = $, F.size.refresh(), F.$el.addClass("fr-view")
                } else n = F.$el.html();
                if (!F.opts.useClasses && !t)
                    for (r = 0; r < i.length; r++) i[r].getAttribute("fr-original-class") && (i[r].setAttribute("class", i[r].getAttribute("fr-original-class")), i[r].removeAttribute("fr-original-class")), null != i[r].getAttribute("fr-original-style") && void 0 !== i[r].getAttribute("fr-original-style") ? (0 !== i[r].getAttribute("fr-original-style").length ? i[r].setAttribute("style", i[r].getAttribute("fr-original-style")) : i[r].removeAttribute("style"), i[r].removeAttribute("fr-original-style")) : i[r].removeAttribute("style");
                F.opts.fullPage && (n = (n = (n = (n = (n = (n = (n = (n = n.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, "")).replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g, "")).replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, "")).replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")).replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>')).replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")), F.opts.htmlSimpleAmpersand && (n = n.replace(/\&amp;/gi, "&")), F.events.trigger("html.afterGet"), e || (n = n.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")), n = F.clean.invisibleSpaces(n), n = F.clean.exec(n, M);
                var O = F.events.chainTrigger("html.get", n);
                return "string" == typeof O && (n = O), n = (n = n.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function(e) {
                    return e.replace(/<br>/g, "\n")
                })).replace(/<meta((?:[\w\W]*?)) data-fr-http-equiv="/g, '<meta$1 http-equiv="')
            },
            getSelected: function() {
                var e, t, n = function(e, t) {
                        for (; t && (t.nodeType == Node.TEXT_NODE || !F.node.isBlock(t)) && !F.node.isElement(t) && !F.node.hasClass(t, "fr-inner");) t && t.nodeType != Node.TEXT_NODE && w(e).wrapInner(F.node.openTagString(t) + F.node.closeTagString(t)), t = t.parentNode;
                        t && e.innerHTML == t.innerHTML && (e.innerHTML = t.outerHTML)
                    },
                    r = "";
                if ("undefined" != typeof F.win.getSelection) {
                    F.browser.mozilla && (F.selection.save(), 1 < F.$el.find('.fr-marker[data-type="false"]').length && (F.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(), F.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0"), F.$el.find(".fr-marker").not('[data-id="0"]').remove()), F.selection.restore());
                    for (var o = F.selection.ranges(), i = 0; i < o.length; i++) {
                        var a = document.createElement("div");
                        a.appendChild(o[i].cloneContents()), n(a, (t = e = void 0, t = null, F.win.getSelection ? (e = F.win.getSelection()) && e.rangeCount && (t = e.getRangeAt(0).commonAncestorContainer).nodeType != Node.ELEMENT_NODE && (t = t.parentNode) : (e = F.doc.selection) && "Control" != e.type && (t = e.createRange().parentElement()), null != t && (0 <= w.inArray(F.el, w(t).parents()) || t == F.el) ? t : null)), 0 < w(a).find(".fr-element").length && (a = F.el), r += a.innerHTML
                    }
                } else "undefined" != typeof F.doc.selection && "Text" == F.doc.selection.type && (r = F.doc.selection.createRange().htmlText);
                return r
            },
            insert: function(e, t, n) {
                var r, o, i;
                if (F.selection.isCollapsed() || F.selection.remove(), r = t ? e : F.clean.html(e), e.indexOf('class="fr-marker"') < 0 && (o = r, (i = F.doc.createElement("div")).innerHTML = o, F.selection.setAtEnd(i, !0), r = i.innerHTML), F.node.isEmpty(F.el) && !F.opts.keepFormatOnDelete && f(r)) F.el.innerHTML = r;
                else {
                    var a = F.markers.insert();
                    if (a) {
                        F.node.isLastSibling(a) && w(a).parent().hasClass("fr-deletable") && w(a).insertAfter(w(a).parent());
                        var s = F.node.blockParent(a);
                        if ((f(r) || n) && (F.node.deepestParent(a) || s && "LI" == s.tagName)) {
                            if (s && "LI" == s.tagName && (r = function(e) {
                                    if (!F.html.defaultTag()) return e;
                                    var t = F.doc.createElement("div");
                                    t.innerHTML = e;
                                    for (var n = t.querySelectorAll(":scope > " + F.html.defaultTag()), r = n.length - 1; 0 <= r; r--) {
                                        var o = n[r];
                                        F.node.isBlock(o.previousSibling) || (o.previousSibling && !F.node.isEmpty(o) && w("<br>").insertAfter(o.previousSibling), o.outerHTML = o.innerHTML)
                                    }
                                    return t.innerHTML
                                }(r)), !(a = F.markers.split())) return !1;
                            a.outerHTML = r
                        } else a.outerHTML = r
                    } else F.el.innerHTML = F.el.innerHTML + r
                }
                u(), F.keys.positionCaret(), F.events.trigger("html.inserted")
            },
            wrap: t,
            unwrap: function() {
                F.$el.find("div.fr-temp-div").each(function() {
                    this.previousSibling && this.previousSibling.nodeType === Node.TEXT_NODE && w(this).before("<br>"), w(this).attr("data-empty") || !this.nextSibling || F.node.isBlock(this.nextSibling) && !w(this.nextSibling).hasClass("fr-temp-div") ? w(this).replaceWith(w(this).html()) : w(this).replaceWith(w(this).html() + "<br>")
                }), F.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function() {
                    return "" === w(this).attr("class")
                }).removeAttr("class")
            },
            escapeEntities: function(e) {
                return e.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&#39;")
            },
            checkIfEmpty: o,
            extractNode: g,
            extractNodeAttrs: h,
            extractDoctype: m,
            cleanBRs: function() {
                for (var e = F.el.getElementsByTagName("br"), t = 0; t < e.length; t++) d(e[t])
            },
            _init: function() {
                if (F.$wp) {
                    var e = function() {
                        v(), F.placeholder && setTimeout(F.placeholder.refresh, 0)
                    };
                    F.events.on("mouseup", e), F.events.on("keydown", e), F.events.on("contentChanged", o)
                }
            }
        }
    }, w.extend(w.FE.DEFAULTS, {
        height: null,
        heightMax: null,
        heightMin: null,
        width: null
    }), w.FE.MODULES.size = function(e) {
        function t() {
            n(), e.opts.height && e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom"))), e.$iframe.height(e.$el.outerHeight(!0))
        }

        function n() {
            
            e.opts.heightMin ? e.$el.css("minHeight", e.opts.heightMin) : e.$el.css("minHeight", ""), e.opts.heightMax ? (e.$wp.css("maxHeight", e.opts.heightMax), e.$wp.css("overflow", "auto")) : (e.$wp.css("maxHeight", ""), e.$wp.css("overflow", "")), 
            e.opts.height ? ( e.$wp.css("overflow", "auto"), e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom")))) 
            : (e.$wp.css("height", ""), e.opts.heightMin || e.$el.css("minHeight", ""), e.opts.heightMax || e.$wp.css("overflow", "")), editbol ? (e.$wp.height(e.opts.height-40)) : (e.$wp.height(e.opts.height)), e.opts.width && e.$box.width(e.opts.width)
        }
        return {
            _init: function() {
                if (!e.$wp) return !1;
                n(), e.$iframe && (e.events.on("keyup keydown", function() {
                    setTimeout(t, 0)
                }, !0), e.events.on("commands.after html.set init initialized paste.after", t))
            },
            syncIframe: t,
            refresh: n
        }
    }, w.extend(w.FE.DEFAULTS, {
        language: null
    }), w.FE.LANGUAGE = {}, w.FE.MODULES.language = function(e) {
        var t;
        return {
            _init: function() {
                w.FE.LANGUAGE && (t = w.FE.LANGUAGE[e.opts.language]), t && t.direction && (e.opts.direction = t.direction)
            },
            translate: function(e) {
                return t && t.translation[e] && t.translation[e].length ? t.translation[e] : e
            }
        }
    }, w.extend(w.FE.DEFAULTS, {
        placeholderText: "Type something"
    }), w.FE.MODULES.placeholder = function(f) {
        function e() {
            f.$placeholder || (f.$placeholder = w('<span class="fr-placeholder"></span>'), f.$wp.append(f.$placeholder));
            var e = f.opts.iframe ? f.$iframe.prev().outerHeight(!0) : f.$el.prev().outerHeight(!0),
                t = 0,
                n = 0,
                r = 0,
                o = 0,
                i = 0,
                a = 0,
                s = f.node.contents(f.el),
                l = w(f.selection.element()).css("text-align");
            if (s.length && s[0].nodeType == Node.ELEMENT_NODE) {
                var d = w(s[0]);
                (!f.opts.toolbarInline || 0 < f.$el.prev().length) && f.ready && (t = f.helpers.getPX(d.css("margin-top")), o = f.helpers.getPX(d.css("padding-top")), n = f.helpers.getPX(d.css("margin-left")), r = f.helpers.getPX(d.css("margin-right")), i = f.helpers.getPX(d.css("padding-left")), a = f.helpers.getPX(d.css("padding-right"))), f.$placeholder.css("font-size", d.css("font-size")), f.$placeholder.css("line-height", d.css("line-height"))
            } else f.$placeholder.css("font-size", f.$el.css("font-size")), f.$placeholder.css("line-height", f.$el.css("line-height"));
            if (f.$wp.addClass("show-placeholder"), f.$placeholder.css({
                    marginTop: Math.max(f.helpers.getPX(f.$el.css("margin-top")), t) + (e || 0),
                    paddingTop: Math.max(f.helpers.getPX(f.$el.css("padding-top")), o),
                    paddingLeft: Math.max(f.helpers.getPX(f.$el.css("padding-left")), i),
                    marginLeft: Math.max(f.helpers.getPX(f.$el.css("margin-left")), n),
                    paddingRight: Math.max(f.helpers.getPX(f.$el.css("padding-right")), a),
                    marginRight: Math.max(f.helpers.getPX(f.$el.css("margin-right")), r),
                    textAlign: l
                }).text(f.language.translate(f.opts.placeholderText || f.$oel.attr("placeholder") || "")), f.$placeholder.html(f.$placeholder.text().replace(/\n/g, "<br>")), f.size.refresh(), f.$placeholder.outerHeight() > f.$el.height()) {
                var c = f.opts.heightMin;
                f.opts.heightMin = f.$placeholder.outerHeight() + (f.$tb ? f.$tb.height() : 0), f.size.refresh(), f.opts.heightMin = c
            }
        }

        function t() {
            f.$wp.removeClass("show-placeholder"), f.size.refresh()
        }

        function n() {
            if (!f.$wp) return !1;
            f.core.isEmpty() ? e() : t()
        }
        return {
            _init: function() {
                if (!f.$wp) return !1;
                f.events.on("init input keydown keyup contentChanged initialized", n)
            },
            show: e,
            hide: t,
            refresh: n,
            isVisible: function() {
                return !!f.$wp && f.node.hasClass(f.$wp.get(0), "show-placeholder")
            }
        }
    }, w.FE.MODULES.edit = function(t) {
        function e() {
            if (t.browser.mozilla) try {
                t.doc.execCommand("enableObjectResizing", !1, "false"), t.doc.execCommand("enableInlineTableEditing", !1, "false")
            } catch (e) {}
            if (t.browser.msie) try {
                t.doc.body.addEventListener("mscontrolselect", function(e) {
                    return e.preventDefault(), !1
                })
            } catch (e) {}
        }
        var n = !1;

        function r() {
            return n
        }
        return {
            _init: function() {
                t.events.on("focus", function() {
                    r() ? t.edit.off() : t.edit.on()
                })
            },
            on: function() {
                t.$wp ? (t.$el.attr("contenteditable", !0), t.$el.removeClass("fr-disabled").attr("aria-disabled", !1), t.$tb && t.$tb.removeClass("fr-disabled").removeAttr("aria-disabled"), e()) : t.$el.is("a") && t.$el.attr("contenteditable", !0), n = !1
            },
            off: function() {
                t.events.disableBlur(), t.$wp ? (t.$el.attr("contenteditable", !1), t.$el.addClass("fr-disabled").attr("aria-disabled", !0), t.$tb && t.$tb.addClass("fr-disabled").attr("aria-disabled", !0)) : t.$el.is("a") && t.$el.attr("contenteditable", !1), t.events.enableBlur(), n = !0
            },
            disableDesign: e,
            isDisabled: r
        }
    }, w.extend(w.FE.DEFAULTS, {
        documentReady: !1,
        editorClass: null,
        typingTimer: 500,
        iframe: !1,
        requestWithCORS: !0,
        requestWithCredentials: !1,
        requestHeaders: {},
        useClasses: !0,
        spellcheck: !0,
        iframeDefaultStyle: 'html{margin:0px;height:auto;}body{height:auto;padding:10px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}body::-moz-selection{background:#b5d6fd;color:#000;}body::selection{background:#b5d6fd;color:#000;}',
        iframeStyle: "",
        iframeStyleFiles: [],
        direction: "auto",
        zIndex: 1,
        tabIndex: null,
        disableRightClick: !1,
        scrollableContainer: "body",
        keepFormatOnDelete: !1,
        theme: null
    }), w.FE.MODULES.core = function(d) {
        var c;

        function t() {
            if (d.$box.addClass("fr-box" + (d.opts.editorClass ? " " + d.opts.editorClass : "")), d.$box.attr("role", "application"), d.$wp.addClass("fr-wrapper"), d.opts.documentReady && d.$box.addClass("fr-document"), d.opts.iframe || d.$el.addClass("fr-element fr-view"), d.opts.iframe) {
                c = [], d.$iframe.addClass("fr-iframe"), d.$el.addClass("fr-view");
                for (var e = 0; e < d.o_doc.styleSheets.length; e++) {
                    var t;
                    try {
                        t = d.o_doc.styleSheets[e].cssRules
                    } catch (o) {}
                    if (t)
                        for (var n = 0, r = t.length; n < r; n++) !t[n].selectorText || 0 !== t[n].selectorText.indexOf(".fr-view") && 0 !== t[n].selectorText.indexOf(".fr-element") || 0 < t[n].style.cssText.length && (0 === t[n].selectorText.indexOf(".fr-view") ? c.push({
                            selector: t[n].selectorText.replace(/\.fr-view/g, "body"),
                            style: t[n].style
                        }) : c.push({
                            selector: t[n].selectorText.replace(/\.fr-element/g, "body"),
                            style: t[n].style
                        }))
                }
            }
            "auto" != d.opts.direction && d.$box.removeClass("fr-ltr fr-rtl").addClass("fr-" + d.opts.direction), d.$el.attr("dir", d.opts.direction), d.$wp.attr("dir", d.opts.direction), 1 < d.opts.zIndex && d.$box.css("z-index", d.opts.zIndex), d.opts.theme && d.$box.addClass(d.opts.theme + "-theme"), d.opts.tabIndex = d.opts.tabIndex || d.$oel.attr("tabIndex"), d.opts.tabIndex && d.$el.attr("tabIndex", d.opts.tabIndex)
        }
        return {
            _init: function() {
                if (w.FE.INSTANCES.push(d), d.drag_support = {
                        filereader: "undefined" != typeof FileReader,
                        formdata: !!d.win.FormData,
                        progress: "upload" in new XMLHttpRequest
                    }, d.$wp) {
                    t(), d.html.set(d._original_html), d.$el.attr("spellcheck", d.opts.spellcheck), d.helpers.isMobile() && (d.$el.attr("autocomplete", d.opts.spellcheck ? "on" : "off"), d.$el.attr("autocorrect", d.opts.spellcheck ? "on" : "off"), d.$el.attr("autocapitalize", d.opts.spellcheck ? "on" : "off")), d.opts.disableRightClick && d.events.$on(d.$el, "contextmenu", function(e) {
                        if (2 == e.button) return !1
                    });
                    try {
                        d.doc.execCommand("styleWithCSS", !1, !1)
                    } catch (e) {}
                }
                "TEXTAREA" == d.$oel.get(0).tagName && (d.events.on("contentChanged", function() {
                    d.$oel.val(d.html.get())
                }), d.events.on("form.submit", function() {
                    d.$oel.val(d.html.get())
                }), d.events.on("form.reset", function() {
                    d.html.set(d._original_html)
                }), d.$oel.val(d.html.get())), d.helpers.isIOS() && d.events.$on(d.$doc, "selectionchange", function() {
                    d.$doc.get(0).hasFocus() || d.$win.get(0).focus()
                }), d.events.trigger("init"), d.opts.autofocus && !d.opts.initOnClick && d.$wp && d.events.on("initialized", function() {
                    d.events.focus(!0)
                })
            },
            destroy: function(e) {
                "TEXTAREA" == d.$oel.get(0).tagName && d.$oel.val(e), d.$box && d.$box.removeAttr("role"), d.$wp && ("TEXTAREA" == d.$oel.get(0).tagName ? (d.$el.html(""), d.$wp.html(""), d.$box.replaceWith(d.$oel), d.$oel.show()) : (d.$wp.replaceWith(e), d.$el.html(""), d.$box.removeClass("fr-view fr-ltr fr-box " + (d.opts.editorClass || "")), d.opts.theme && d.$box.addClass(d.opts.theme + "-theme"))), this.$wp = null, this.$el = null, this.el = null, this.$box = null
            },
            isEmpty: function() {
                return d.node.isEmpty(d.el)
            },
            getXHR: function(e, t) {
                var n = new XMLHttpRequest;
                for (var r in n.open(t, e, !0), d.opts.requestWithCredentials && (n.withCredentials = !0), d.opts.requestHeaders) d.opts.requestHeaders.hasOwnProperty(r) && n.setRequestHeader(r, d.opts.requestHeaders[r]);
                return n
            },
            injectStyle: function(e) {
                if (d.opts.iframe) {
                    d.$head.find("style[data-fr-style], link[data-fr-style]").remove();
                    for (var t = w('<style data-fr-style="true">' + e + "</style>").appendTo(d.$head)[0].sheet, n = 0; n < c.length; n++)
                        for (var r = t.insertRule(c[n].selector + "{}", t.cssRules.length), o = 0; o < c[n].style.length; o++) {
                            var i = c[n].style[o],
                                a = c[n].style[i];
                            d.browser.safari && "content" === i && (a = '"' + a + '"'), t.cssRules[r].style[i] = a
                        }
                    for (var s = 0; s < d.opts.iframeStyleFiles.length; s++) {
                        var l = w('<link data-fr-style="true" rel="stylesheet" href="' + d.opts.iframeStyleFiles[s] + '">');
                        l.get(0).addEventListener("load", d.size.syncIframe), d.$head.append(l)
                    }
                }
            },
            hasFocus: function() {
                return d.browser.mozilla && d.helpers.isMobile() ? d.selection.inEditor() : d.node.hasFocus(d.el) || 0 < d.$el.find("*:focus").length
            },
            sameInstance: function(e) {
                if (!e) return !1;
                var t = e.data("instance");
                return !!t && t.id == d.id
            }
        }
    }, w.FE.MODULES.cursorLists = function(h) {
        function m(e) {
            for (var t = e;
                "LI" != t.tagName;) t = t.parentNode;
            return t
        }

        function E(e) {
            for (var t = e; !h.node.isList(t);) t = t.parentNode;
            return t
        }
        return {
            _startEnter: function(e) {
                var t, n = m(e),
                    r = n.nextSibling,
                    o = n.previousSibling,
                    i = h.html.defaultTag();
                if (h.node.isEmpty(n, !0) && r) {
                    for (var a = "", s = "", l = e.parentNode; !h.node.isList(l) && l.parentNode && ("LI" !== l.parentNode.tagName || l.parentNode === n);) a = h.node.openTagString(l) + a, s += h.node.closeTagString(l), l = l.parentNode;
                    a = h.node.openTagString(l) + a, s += h.node.closeTagString(l);
                    var d = "";
                    for (d = l.parentNode && "LI" == l.parentNode.tagName ? s + "<li>" + w.FE.MARKERS + "<br>" + a : i ? s + "<" + i + ">" + w.FE.MARKERS + "<br></" + i + ">" + a : s + w.FE.MARKERS + "<br>" + a;
                        ["UL", "OL"].indexOf(l.tagName) < 0 || l.parentNode && "LI" === l.parentNode.tagName;) l = l.parentNode;
                    w(n).replaceWith('<span id="fr-break"></span>');
                    var c = h.node.openTagString(l) + w(l).html() + h.node.closeTagString(l);
                    c = c.replace(/<span id="fr-break"><\/span>/g, d), w(l).replaceWith(c), h.$el.find("li:empty").remove()
                } else if (o && r || !h.node.isEmpty(n, !0)) {
                    for (var f = "<br>", p = e.parentNode; p && "LI" != p.tagName;) f = h.node.openTagString(p) + f + h.node.closeTagString(p), p = p.parentNode;
                    w(n).before("<li>" + f + "</li>"), w(e).remove()
                } else if (o) {
                    t = E(n);
                    for (var u = w.FE.MARKERS + "<br>", g = e.parentNode; g && "LI" != g.tagName;) u = h.node.openTagString(g) + u + h.node.closeTagString(g), g = g.parentNode;
                    t.parentNode && "LI" == t.parentNode.tagName ? w(t.parentNode).after("<li>" + u + "</li>") : i ? w(t).after("<" + i + ">" + u + "</" + i + ">") : w(t).after(u), w(n).remove()
                } else(t = E(n)).parentNode && "LI" == t.parentNode.tagName ? r ? w(t.parentNode).before(h.node.openTagString(n) + w.FE.MARKERS + "<br></li>") : w(t.parentNode).after(h.node.openTagString(n) + w.FE.MARKERS + "<br></li>") : i ? w(t).before("<" + i + ">" + w.FE.MARKERS + "<br></" + i + ">") : w(t).before(w.FE.MARKERS + "<br>"), w(n).remove()
            },
            _middleEnter: function(e) {
                for (var t = m(e), n = "", r = e, o = "", i = ""; r != t;) {
                    var a = "A" == (r = r.parentNode).tagName && h.cursor.isAtEnd(e, r) ? "fr-to-remove" : "";
                    o = h.node.openTagString(w(r).clone().addClass(a).get(0)) + o, i = h.node.closeTagString(r) + i
                }
                n = i + n + o + w.FE.MARKERS + (h.opts.keepFormatOnDelete ? w.FE.INVISIBLE_SPACE : ""), w(e).replaceWith('<span id="fr-break"></span>');
                var s = h.node.openTagString(t) + w(t).html() + h.node.closeTagString(t);
                s = s.replace(/<span id="fr-break"><\/span>/g, n), w(t).replaceWith(s)
            },
            _endEnter: function(e) {
                for (var t = m(e), n = w.FE.MARKERS, r = "", o = e, i = !1; o != t;) {
                    var a = "A" == (o = o.parentNode).tagName && h.cursor.isAtEnd(e, o) ? "fr-to-remove" : "";
                    i || o == t || h.node.isBlock(o) || (i = !0, r += w.FE.INVISIBLE_SPACE), r = h.node.openTagString(w(o).clone().addClass(a).get(0)) + r, n += h.node.closeTagString(o)
                }
                var s = r + n;
                w(e).remove(), w(t).after(s)
            },
            _backspace: function(e) {
                var t = m(e),
                    n = t.previousSibling;
                if (n) {
                    n = w(n).find(h.html.blockTagsQuery()).get(-1) || n, w(e).replaceWith(w.FE.MARKERS);
                    var r = h.node.contents(n);
                    r.length && "BR" == r[r.length - 1].tagName && w(r[r.length - 1]).remove(), w(t).find(h.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                        this.parentNode == t && w(this).replaceWith(w(this).html() + (h.node.isEmpty(this) ? "" : "<br>"))
                    });
                    for (var o, i = h.node.contents(t)[0]; i && !h.node.isList(i);) o = i.nextSibling, w(n).append(i), i = o;
                    for (n = t.previousSibling; i;) o = i.nextSibling, w(n).append(i), i = o;
                    1 < (r = h.node.contents(n)).length && "BR" === r[r.length - 1].tagName && w(r[r.length - 1]).remove(), w(t).remove()
                } else {
                    var a = E(t);
                    if (w(e).replaceWith(w.FE.MARKERS), a.parentNode && "LI" == a.parentNode.tagName) {
                        var s = a.previousSibling;
                        h.node.isBlock(s) ? (w(t).find(h.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                            this.parentNode == t && w(this).replaceWith(w(this).html() + (h.node.isEmpty(this) ? "" : "<br>"))
                        }), w(s).append(w(t).html())) : w(a).before(w(t).html())
                    } else {
                        var l = h.html.defaultTag();
                        l && 0 === w(t).find(h.html.blockTagsQuery()).length ? w(a).before("<" + l + ">" + w(t).html() + "</" + l + ">") : w(a).before(w(t).html())
                    }
                    w(t).remove(), h.html.wrap(), 0 === w(a).find("li").length && w(a).remove()
                }
            },
            _del: function(e) {
                var t, n = m(e),
                    r = n.nextSibling;
                if (r) {
                    (t = h.node.contents(r)).length && "BR" == t[0].tagName && w(t[0]).remove(), w(r).find(h.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                        this.parentNode == r && w(this).replaceWith(w(this).html() + (h.node.isEmpty(this) ? "" : "<br>"))
                    });
                    for (var o, i = e, a = h.node.contents(r)[0]; a && !h.node.isList(a);) o = a.nextSibling, w(i).after(a), i = a, a = o;
                    for (; a;) o = a.nextSibling, w(n).append(a), a = o;
                    w(e).replaceWith(w.FE.MARKERS), w(r).remove()
                } else {
                    for (var s = n; !s.nextSibling && s != h.el;) s = s.parentNode;
                    if (s == h.el) return !1;
                    if (s = s.nextSibling, h.node.isBlock(s)) w.FE.NO_DELETE_TAGS.indexOf(s.tagName) < 0 && (w(e).replaceWith(w.FE.MARKERS), (t = h.node.contents(n)).length && "BR" == t[t.length - 1].tagName && w(t[t.length - 1]).remove(), w(n).append(w(s).html()), w(s).remove());
                    else
                        for ((t = h.node.contents(n)).length && "BR" == t[t.length - 1].tagName && w(t[t.length - 1]).remove(), w(e).replaceWith(w.FE.MARKERS); s && !h.node.isBlock(s) && "BR" != s.tagName;) w(n).append(w(s)), s = s.nextSibling
                }
            }
        }
    }, w.FE.NO_DELETE_TAGS = ["TH", "TD", "TR", "TABLE", "FORM"], w.FE.SIMPLE_ENTER_TAGS = ["TH", "TD", "LI", "DL", "DT", "FORM"], w.FE.MODULES.cursor = function(u) {
        function i(e) {
            return !!e && (!!u.node.isBlock(e) || (e.nextSibling && e.nextSibling.nodeType == Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? i(e.nextSibling) : !(e.nextSibling && (!e.previousSibling || "BR" != e.nextSibling.tagName || e.nextSibling.nextSibling)) && i(e.parentNode)))
        }

        function a(e) {
            return !!e && (!!u.node.isBlock(e) || (e.previousSibling && e.previousSibling.nodeType == Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? a(e.previousSibling) : !e.previousSibling && (!(e.previousSibling || !u.node.hasClass(e.parentNode, "fr-inner")) || a(e.parentNode))))
        }

        function g(e, t) {
            return !!e && (e != u.$wp.get(0) && (e.previousSibling && e.previousSibling.nodeType == Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? g(e.previousSibling, t) : !e.previousSibling && (e.parentNode == t || g(e.parentNode, t))))
        }

        function h(e, t) {
            return !!e && (e != u.$wp.get(0) && (e.nextSibling && e.nextSibling.nodeType == Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? h(e.nextSibling, t) : !(e.nextSibling && (!e.previousSibling || "BR" != e.nextSibling.tagName || e.nextSibling.nextSibling)) && (e.parentNode == t || h(e.parentNode, t))))
        }

        function s(e) {
            return 0 < w(e).parentsUntil(u.$el, "LI").length && 0 === w(e).parentsUntil("LI", "TABLE").length
        }

        function d(e, t) {
            var n = new RegExp((t ? "^" : "") + "(([\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+\\u200D)*[\\uD83C-\\uDBFF\\uDC00-\\uDFFF]{2})" + (t ? "" : "$"), "i"),
                r = e.match(n);
            return r ? r[0].length : 1
        }

        function c(e) {
            for (var t, n = e; !n.previousSibling;)
                if (n = n.parentNode, u.node.isElement(n)) return !1;
            if (n = n.previousSibling, !u.node.isBlock(n) && u.node.isEditable(n)) {
                for (t = u.node.contents(n); n.nodeType != Node.TEXT_NODE && !u.node.isDeletable(n) && t.length && u.node.isEditable(n);) n = t[t.length - 1], t = u.node.contents(n);
                if (n.nodeType == Node.TEXT_NODE) {
                    var r = n.textContent,
                        o = r.length;
                    if (r.length && "\n" === r[r.length - 1]) return n.textContent = r.substring(0, o - 2), 0 === n.textContent.length && n.parentNode.removeChild(n), c(e);
                    if (u.opts.tabSpaces && r.length >= u.opts.tabSpaces) 0 === r.substr(r.length - u.opts.tabSpaces, r.length - 1).replace(/ /g, "").replace(new RegExp(w.FE.UNICODE_NBSP, "g"), "").length && (o = r.length - u.opts.tabSpaces + 1);
                    n.textContent = r.substring(0, o - d(r)), u.opts.htmlUntouched && !e.nextSibling && n.textContent.length && " " === n.textContent[n.textContent.length - 1] && (n.textContent = n.textContent.substring(0, n.textContent.length - 1) + w.FE.UNICODE_NBSP);
                    var i = r.length != n.textContent.length;
                    if (0 === n.textContent.length)
                        if (i && u.opts.keepFormatOnDelete) w(n).after(w.FE.INVISIBLE_SPACE + w.FE.MARKERS);
                        else if (0 !== r.length && u.node.isBlock(n.parentNode)) w(n).after(w.FE.MARKERS);
                    else if ((2 != n.parentNode.childNodes.length || n.parentNode != e.parentNode) && 1 != n.parentNode.childNodes.length || u.node.isBlock(n.parentNode) || u.node.isElement(n.parentNode) || !u.node.isDeletable(n.parentNode)) {
                        for (; !u.node.isElement(n.parentNode) && u.node.isEmpty(n.parentNode) && w.FE.NO_DELETE_TAGS.indexOf(n.parentNode.tagName) < 0;) {
                            var a = n;
                            n = n.parentNode, a.parentNode.removeChild(a)
                        }
                        w(n).after(w.FE.MARKERS), u.node.isElement(n.parentNode) && !e.nextSibling && n.previousSibling && "BR" == n.previousSibling.tagName && w(e).after("<br>"), n.parentNode.removeChild(n)
                    } else w(n.parentNode).after(w.FE.MARKERS), w(n.parentNode).remove();
                    else w(n).after(w.FE.MARKERS)
                } else u.node.isDeletable(n) ? (w(n).after(w.FE.MARKERS), w(n).remove()) : e.nextSibling && "BR" == e.nextSibling.tagName && u.node.isVoid(n) && "BR" != n.tagName ? (w(e.nextSibling).remove(), w(e).replaceWith(w.FE.MARKERS)) : !1 !== u.events.trigger("node.remove", [w(n)]) && (w(n).after(w.FE.MARKERS), w(n).remove())
            } else if (w.FE.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (u.node.isEditable(n) || u.node.isDeletable(n)))
                if (u.node.isDeletable(n)) w(e).replaceWith(w.FE.MARKERS), w(n).remove();
                else if (u.node.isEmpty(n) && !u.node.isList(n)) w(n).remove(), w(e).replaceWith(w.FE.MARKERS);
            else {
                for (u.node.isList(n) && (n = w(n).find("li:last").get(0)), (t = u.node.contents(n)) && "BR" == t[t.length - 1].tagName && w(t[t.length - 1]).remove(), t = u.node.contents(n); t && u.node.isBlock(t[t.length - 1]);) n = t[t.length - 1], t = u.node.contents(n);
                w(n).append(w.FE.MARKERS);
                for (var s = e; !s.previousSibling;) s = s.parentNode;
                for (; s && "BR" !== s.tagName && !u.node.isBlock(s);) {
                    var l = s;
                    s = s.nextSibling, w(n).append(l)
                }
                s && "BR" == s.tagName && w(s).remove(), w(e).remove()
            } else e.nextSibling && "BR" == e.nextSibling.tagName && w(e.nextSibling).remove();
            return !0
        }

        function l(e) {
            var t = 0 < w(e).parentsUntil(u.$el, "BLOCKQUOTE").length,
                n = u.node.deepestParent(e, [], !t);
            if (n && "BLOCKQUOTE" == n.tagName) {
                var r = u.node.deepestParent(e, [w(e).parentsUntil(u.$el, "BLOCKQUOTE").get(0)]);
                r && r.nextSibling && (n = r)
            }
            if (null !== n) {
                var o, i = n.nextSibling;
                if (u.node.isBlock(n) && (u.node.isEditable(n) || u.node.isDeletable(n)) && i && w.FE.NO_DELETE_TAGS.indexOf(i.tagName) < 0)
                    if (u.node.isDeletable(i)) w(i).remove(), w(e).replaceWith(w.FE.MARKERS);
                    else if (u.node.isBlock(i) && u.node.isEditable(i))
                    if (u.node.isList(i))
                        if (u.node.isEmpty(n, !0)) w(n).remove(), w(i).find("li:first").prepend(w.FE.MARKERS);
                        else {
                            var a = w(i).find("li:first");
                            "BLOCKQUOTE" == n.tagName && (o = u.node.contents(n)).length && u.node.isBlock(o[o.length - 1]) && (n = o[o.length - 1]), 0 === a.find("ul, ol").length && (w(e).replaceWith(w.FE.MARKERS), a.find(u.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                                this.parentNode == a.get(0) && w(this).replaceWith(w(this).html() + (u.node.isEmpty(this) ? "" : "<br>"))
                            }), w(n).append(u.node.contents(a.get(0))), a.remove(), 0 === w(i).find("li").length && w(i).remove())
                        }
                else {
                    if ((o = u.node.contents(i)).length && "BR" == o[0].tagName && w(o[0]).remove(), "BLOCKQUOTE" != i.tagName && "BLOCKQUOTE" == n.tagName)
                        for (o = u.node.contents(n); o.length && u.node.isBlock(o[o.length - 1]);) n = o[o.length - 1], o = u.node.contents(n);
                    else if ("BLOCKQUOTE" == i.tagName && "BLOCKQUOTE" != n.tagName)
                        for (o = u.node.contents(i); o.length && u.node.isBlock(o[0]);) i = o[0], o = u.node.contents(i);
                    w(e).replaceWith(w.FE.MARKERS), w(n).append(i.innerHTML), w(i).remove()
                } else {
                    for (w(e).replaceWith(w.FE.MARKERS); i && "BR" !== i.tagName && !u.node.isBlock(i) && u.node.isEditable(i);) {
                        var s = i;
                        i = i.nextSibling, w(n).append(s)
                    }
                    i && "BR" == i.tagName && u.node.isEditable(i) && w(i).remove()
                }
            }
        }

        function n(e) {
            for (var t, n = e; !n.nextSibling;)
                if (n = n.parentNode, u.node.isElement(n)) return !1;
            if ("BR" == (n = n.nextSibling).tagName && u.node.isEditable(n))
                if (n.nextSibling) {
                    if (u.node.isBlock(n.nextSibling) && u.node.isEditable(n.nextSibling)) {
                        if (!(w.FE.NO_DELETE_TAGS.indexOf(n.nextSibling.tagName) < 0)) return void w(n).remove();
                        n = n.nextSibling, w(n.previousSibling).remove()
                    }
                } else if (i(n)) {
                if (s(e)) u.cursorLists._del(e);
                else u.node.deepestParent(n) && ((!u.node.isEmpty(u.node.blockParent(n)) || (u.node.blockParent(n).nextSibling && w.FE.NO_DELETE_TAGS.indexOf(u.node.blockParent(n).nextSibling.tagName)) < 0) && w(n).remove(), l(e));
                return
            }
            if (!u.node.isBlock(n) && u.node.isEditable(n)) {
                for (t = u.node.contents(n); n.nodeType != Node.TEXT_NODE && t.length && !u.node.isDeletable(n) && u.node.isEditable(n);) n = t[0], t = u.node.contents(n);
                n.nodeType == Node.TEXT_NODE ? (w(n).before(w.FE.MARKERS), n.textContent.length && (n.textContent = n.textContent.substring(d(n.textContent, !0), n.textContent.length))) : u.node.isDeletable(n) ? (w(n).before(w.FE.MARKERS), w(n).remove()) : !1 !== u.events.trigger("node.remove", [w(n)]) && (w(n).before(w.FE.MARKERS), w(n).remove()), w(e).remove()
            } else if (w.FE.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (u.node.isEditable(n) || u.node.isDeletable(n)))
                if (u.node.isDeletable(n)) w(e).replaceWith(w.FE.MARKERS), w(n).remove();
                else if (u.node.isList(n)) e.previousSibling ? (w(n).find("li:first").prepend(e), u.cursorLists._backspace(e)) : (w(n).find("li:first").prepend(w.FE.MARKERS), w(e).remove());
            else if ((t = u.node.contents(n)) && t.length && "BR" == t[0].tagName && w(t[0]).remove(), t && "BLOCKQUOTE" == n.tagName) {
                var r = t[0];
                for (w(e).before(w.FE.MARKERS); r && "BR" != r.tagName;) {
                    var o = r;
                    r = r.nextSibling, w(e).before(o)
                }
                r && "BR" == r.tagName && w(r).remove()
            } else w(e).after(w(n).html()).after(w.FE.MARKERS), w(n).remove()
        }

        function f() {
            for (var e = u.el.querySelectorAll("blockquote:empty"), t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t])
        }

        function p(e, t, n) {
            var r, o = u.node.deepestParent(e, [], !n);
            if (o && "BLOCKQUOTE" == o.tagName) return h(e, o) ? (r = u.html.defaultTag(), t ? w(e).replaceWith("<br>" + w.FE.MARKERS) : r ? w(o).after("<" + r + ">" + w.FE.MARKERS + "<br></" + r + ">") : w(o).after(w.FE.MARKERS + "<br>"), w(e).remove()) : m(e, t, n), !1;
            if (null == o)(r = u.html.defaultTag()) && u.node.isElement(e.parentNode) ? w(e).replaceWith("<" + r + ">" + w.FE.MARKERS + "<br></" + r + ">") : !e.previousSibling || w(e.previousSibling).is("br") || e.nextSibling ? w(e).replaceWith("<br>" + w.FE.MARKERS) : w(e).replaceWith("<br>" + w.FE.MARKERS + "<br>");
            else {
                var i = e,
                    a = "";
                "PRE" != o.tagName || e.nextSibling || (t = !0), u.node.isBlock(o) && !t || (a = "<br/>");
                var s, l = "",
                    d = "",
                    c = "",
                    f = "";
                (r = u.html.defaultTag()) && u.node.isBlock(o) && (c = "<" + r + ">", f = "</" + r + ">", o.tagName == r.toUpperCase() && (c = u.node.openTagString(w(o).clone().removeAttr("id").get(0))));
                do {
                    if (i = i.parentNode, !t || i != o || t && !u.node.isBlock(o))
                        if (l += u.node.closeTagString(i), i == o && u.node.isBlock(o)) d = c + d;
                        else {
                            var p = "A" == i.tagName && h(e, i) ? "fr-to-remove" : "";
                            d = u.node.openTagString(w(i).clone().addClass(p).get(0)) + d
                        }
                } while (i != o);
                a = l + a + d + (e.parentNode == o && u.node.isBlock(o) ? "" : w.FE.INVISIBLE_SPACE) + w.FE.MARKERS, u.node.isBlock(o) && !w(o).find("*:last").is("br") && w(o).append("<br/>"), w(e).after('<span id="fr-break"></span>'), w(e).remove(), o.nextSibling && !u.node.isBlock(o.nextSibling) || u.node.isBlock(o) || w(o).after("<br>"), s = (s = !t && u.node.isBlock(o) ? u.node.openTagString(o) + w(o).html() + f : u.node.openTagString(o) + w(o).html() + u.node.closeTagString(o)).replace(/<span id="fr-break"><\/span>/g, a), w(o).replaceWith(s)
            }
        }

        function m(e, t, n) {
            var r = u.node.deepestParent(e, [], !n);
            if (null == r) u.html.defaultTag() && e.parentNode === u.el ? w(e).replaceWith("<" + u.html.defaultTag() + ">" + w.FE.MARKERS + "<br></" + u.html.defaultTag() + ">") : (e.nextSibling && !u.node.isBlock(e.nextSibling) || w(e).after("<br>"), w(e).replaceWith("<br>" + w.FE.MARKERS));
            else {
                var o = e,
                    i = "";
                "PRE" == r.tagName && (t = !0), u.node.isBlock(r) && !t || (i = "<br>");
                var a = "",
                    s = "";
                do {
                    var l = o;
                    if (o = o.parentNode, "BLOCKQUOTE" == r.tagName && u.node.isEmpty(l) && !u.node.hasClass(l, "fr-marker") && 0 < w(l).find(e).length && w(l).after(e), "BLOCKQUOTE" != r.tagName || !h(e, o) && !g(e, o))
                        if (!t || o != r || t && !u.node.isBlock(r)) {
                            a += u.node.closeTagString(o);
                            var d = "A" == o.tagName && h(e, o) ? "fr-to-remove" : "";
                            s = u.node.openTagString(w(o).clone().addClass(d).removeAttr("id").get(0)) + s
                        } else "BLOCKQUOTE" == r.tagName && t && (s = a = "")
                } while (o != r);
                var c = r == e.parentNode && u.node.isBlock(r) || e.nextSibling;
                if ("BLOCKQUOTE" == r.tagName)
                    if (e.previousSibling && u.node.isBlock(e.previousSibling) && e.nextSibling && "BR" == e.nextSibling.tagName && (w(e.nextSibling).after(e), e.nextSibling && "BR" == e.nextSibling.tagName && w(e.nextSibling).remove()), t) i = a + i + w.FE.MARKERS + s;
                    else {
                        var f = u.html.defaultTag();
                        i = a + i + (f ? "<" + f + ">" : "") + w.FE.MARKERS + "<br>" + (f ? "</" + f + ">" : "") + s
                    }
                else i = a + i + s + (c ? "" : w.FE.INVISIBLE_SPACE) + w.FE.MARKERS;
                w(e).replaceWith('<span id="fr-break"></span>');
                var p = u.node.openTagString(r) + w(r).html() + u.node.closeTagString(r);
                p = p.replace(/<span id="fr-break"><\/span>/g, i), w(r).replaceWith(p)
            }
        }
        return {
            enter: function(t) {
                var n = u.markers.insert();
                if (!n) return !0;
                for (var r = n.parentNode; r && !u.node.isElement(r);) {
                    if ("false" === r.getAttribute("contenteditable")) return w(n).replaceWith(w.FE.MARKERS), u.selection.restore(), !1;
                    if ("true" === r.getAttribute("contenteditable")) break;
                    r = r.parentNode
                }
                u.el.normalize();
                var o = !1;
                0 < w(n).parentsUntil(u.$el, "BLOCKQUOTE").length && (o = !0), w(n).parentsUntil(u.$el, "TD, TH").length && (o = !1), i(n) ? !s(n) || t || o ? p(n, t, o) : u.cursorLists._endEnter(n) : a(n) ? !s(n) || t || o ? function e(t, n, r) {
                    var o, i = u.node.deepestParent(t, [], !r);
                    if (i && "TABLE" == i.tagName) return w(i).find("td:first, th:first").prepend(t), e(t, n, r);
                    if (i && "BLOCKQUOTE" == i.tagName)
                        if (g(t, i)) {
                            if (!n) return (o = u.html.defaultTag()) ? w(i).before("<" + o + ">" + w.FE.MARKERS + "<br></" + o + ">") : w(i).before(w.FE.MARKERS + "<br>"), w(t).remove(), !1
                        } else h(t, i) ? p(t, n, !0) : m(t, n, !0);
                    if (null == i)(o = u.html.defaultTag()) && u.node.isElement(t.parentNode) ? w(t).replaceWith("<" + o + ">" + w.FE.MARKERS + "<br></" + o + ">") : w(t).replaceWith("<br>" + w.FE.MARKERS);
                    else {
                        if (u.node.isBlock(i))
                            if ("PRE" == i.tagName && (n = !0), n) w(t).remove(), w(i).prepend("<br>" + w.FE.MARKERS);
                            else {
                                if (u.node.isEmpty(i, !0)) return p(t, n, r);
                                if (u.opts.keepFormatOnDelete) {
                                    for (var a = t, s = w.FE.INVISIBLE_SPACE; a != i && !u.node.isElement(a);) a = a.parentNode, s = u.node.openTagString(a) + s + u.node.closeTagString(a);
                                    w(i).before(s)
                                } else w(i).before(u.node.openTagString(w(i).clone().removeAttr("id").get(0)) + "<br>" + u.node.closeTagString(i))
                            }
                        else w(i).before("<br>");
                        w(t).remove()
                    }
                }(n, t, o) : u.cursorLists._startEnter(n) : !s(n) || t || o ? m(n, t, o) : u.cursorLists._middleEnter(n), u.$el.find(".fr-to-remove").each(function() {
                    for (var e = u.node.contents(this), t = 0; t < e.length; t++) e[t].nodeType == Node.TEXT_NODE && (e[t].textContent = e[t].textContent.replace(/\u200B/g, ""));
                    w(this).replaceWith(this.innerHTML)
                }), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists(), u.spaces.normalizeAroundCursor()), u.selection.restore()
            },
            backspace: function() {
                var e = !1,
                    t = u.markers.insert();
                if (!t) return !0;
                for (var n = t.parentNode; n && !u.node.isElement(n);) {
                    if ("false" === n.getAttribute("contenteditable")) return w(t).replaceWith(w.FE.MARKERS), u.selection.restore(), !1;
                    if ("true" === n.getAttribute("contenteditable")) break;
                    n = n.parentNode
                }
                u.el.normalize();
                var r = t.previousSibling;
                if (r) {
                    var o = r.textContent;
                    o && o.length && 8203 == o.charCodeAt(o.length - 1) && (1 == o.length ? w(r).remove() : r.textContent = r.textContent.substr(0, o.length - d(o)))
                }
                return i(t) ? s(t) && g(t, w(t).parents("li:first").get(0)) ? u.cursorLists._backspace(t) : e = c(t) : a(t) ? s(t) && g(t, w(t).parents("li:first").get(0)) ? u.cursorLists._backspace(t) : function(e) {
                    for (var t = 0 < w(e).parentsUntil(u.$el, "BLOCKQUOTE").length, n = u.node.deepestParent(e, [], !t), r = n; n && !n.previousSibling && "BLOCKQUOTE" != n.tagName && n.parentElement != u.el && !u.node.hasClass(n.parentElement, "fr-inner") && w.FE.SIMPLE_ENTER_TAGS.indexOf(n.parentElement.tagName) < 0;) n = n.parentElement;
                    if (n && "BLOCKQUOTE" == n.tagName) {
                        var o = u.node.deepestParent(e, [w(e).parentsUntil(u.$el, "BLOCKQUOTE").get(0)]);
                        o && o.previousSibling && (r = n = o)
                    }
                    if (null !== n) {
                        var i, a = n.previousSibling;
                        if (u.node.isBlock(n) && u.node.isEditable(n))
                            if (a && w.FE.NO_DELETE_TAGS.indexOf(a.tagName) < 0) {
                                if (u.node.isDeletable(a)) w(a).remove(), w(e).replaceWith(w.FE.MARKERS);
                                else if (u.node.isEditable(a))
                                    if (u.node.isBlock(a))
                                        if (u.node.isEmpty(a) && !u.node.isList(a)) w(a).remove(), w(e).after(u.opts.keepFormatOnDelete ? w.FE.INVISIBLE_SPACE : "");
                                        else {
                                            if (u.node.isList(a) && (a = w(a).find("li:last").get(0)), (i = u.node.contents(a)).length && "BR" == i[i.length - 1].tagName && w(i[i.length - 1]).remove(), "BLOCKQUOTE" == a.tagName && "BLOCKQUOTE" != n.tagName)
                                                for (i = u.node.contents(a); i.length && u.node.isBlock(i[i.length - 1]);) a = i[i.length - 1], i = u.node.contents(a);
                                            else if ("BLOCKQUOTE" != a.tagName && "BLOCKQUOTE" == r.tagName)
                                                for (i = u.node.contents(r); i.length && u.node.isBlock(i[0]);) r = i[0], i = u.node.contents(r);
                                            if (u.node.isEmpty(n)) w(e).remove(), u.selection.setAtEnd(a, !0);
                                            else {
                                                w(e).replaceWith(w.FE.MARKERS);
                                                var s = a.childNodes;
                                                u.node.isBlock(s[s.length - 1]) ? w(s[s.length - 1]).append(r.innerHTML) : w(a).append(r.innerHTML)
                                            }
                                            w(r).remove(), u.node.isEmpty(n) && w(n).remove()
                                        }
                                else w(e).replaceWith(w.FE.MARKERS), "BLOCKQUOTE" == n.tagName && a.nodeType == Node.ELEMENT_NODE ? w(a).remove() : (w(a).after(u.node.isEmpty(n) ? "" : w(n).html()), w(n).remove(), "BR" == a.tagName && w(a).remove())
                            } else a || n && "BLOCKQUOTE" === n.tagName && 0 === w(n).text().replace(/\u200B/g, "").length && w(n).remove()
                    }
                }(t) : e = c(t), w(t).remove(), f(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists(), u.spaces.normalizeAroundCursor()), u.selection.restore(), e
            },
            del: function() {
                var e = u.markers.insert();
                if (!e) return !1;
                if (u.el.normalize(), i(e))
                    if (s(e))
                        if (0 === w(e).parents("li:first").find("ul, ol").length) u.cursorLists._del(e);
                        else {
                            var t = w(e).parents("li:first").find("ul:first, ol:first").find("li:first");
                            (t = t.find(u.html.blockTagsQuery()).get(-1) || t).prepend(e), u.cursorLists._backspace(e)
                        }
                else l(e);
                else a(e), n(e);
                w(e).remove(), f(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists()), u.spaces.normalizeAroundCursor(), u.selection.restore()
            },
            isAtEnd: h,
            isAtStart: g
        }
    }, w.FE.ENTER_P = 0, w.FE.ENTER_DIV = 1, w.FE.ENTER_BR = 2, w.FE.KEYCODE = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        FF_SEMICOLON: 59,
        FF_EQUALS: 61,
        QUESTION_MARK: 63,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        META: 91,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        FF_HYPHEN: 173,
        SEMICOLON: 186,
        DASH: 189,
        EQUALS: 187,
        COMMA: 188,
        HYPHEN: 189,
        PERIOD: 190,
        SLASH: 191,
        APOSTROPHE: 192,
        TILDE: 192,
        SINGLE_QUOTE: 222,
        OPEN_SQUARE_BRACKET: 219,
        BACKSLASH: 220,
        CLOSE_SQUARE_BRACKET: 221,
        IME: 229
    }, w.extend(w.FE.DEFAULTS, {
        enter: w.FE.ENTER_P,
        multiLine: !0,
        tabSpaces: 0
    }), w.FE.MODULES.keys = function(l) {
        var d, n, r, c = !1;

        function e() {
            if (l.browser.mozilla && l.selection.isCollapsed() && !c) {
                var e = l.selection.ranges(0),
                    t = e.startContainer,
                    n = e.startOffset;
                t && t.nodeType == Node.TEXT_NODE && n <= t.textContent.length && 0 < n && 32 == t.textContent.charCodeAt(n - 1) && (l.selection.save(), l.spaces.normalize(), l.selection.restore())
            }
        }

        function t() {
            l.selection.isFull() && setTimeout(function() {
                var e = l.html.defaultTag();
                e ? l.$el.html("<" + e + ">" + w.FE.MARKERS + "<br/></" + e + ">") : l.$el.html(w.FE.MARKERS + "<br/>"), l.selection.restore(), l.placeholder.refresh(), l.button.bulkRefresh(), l.undo.saveStep()
            }, 0)
        }

        function o() {
            c = !1
        }

        function i() {
            c = !1
        }

        function f() {
            var e = l.html.defaultTag();
            e ? l.$el.html("<" + e + ">" + w.FE.MARKERS + "<br/></" + e + ">") : l.$el.html(w.FE.MARKERS + "<br/>"), l.selection.restore()
        }

        function a(e) {
            var t = l.selection.element();
            if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName)) return !0;
            if (e && h(e.which)) return p(), !0;
            l.events.disableBlur(), null;
            var n = e.which;
            if (16 === n) return !0;
            if ((d = n) === w.FE.KEYCODE.IME) return c = !0;
            c = !1;
            var r, o, i, a = m(n) && !g(e) && !e.altKey,
                s = n == w.FE.KEYCODE.BACKSPACE || n == w.FE.KEYCODE.DELETE;
            if ((!(g(e) || e.shiftKey && (33 === n || 34 === n || 35 === n || 36 === n)) && l.selection.isFull() && !l.opts.keepFormatOnDelete && !l.placeholder.isVisible() || s && l.placeholder.isVisible() && l.opts.keepFormatOnDelete) && (a || s) && (f(), !m(n))) return e.preventDefault(), !0;
            n == w.FE.KEYCODE.ENTER ? e.shiftKey ? ((i = e).preventDefault(), i.stopPropagation(), l.opts.multiLine && (l.selection.isCollapsed() || l.selection.remove(), l.cursor.enter(!0))) : (o = e, l.opts.multiLine ? (l.helpers.isIOS() || (o.preventDefault(), o.stopPropagation()), l.selection.isCollapsed() || l.selection.remove(), l.cursor.enter()) : (o.preventDefault(), o.stopPropagation())) : n === w.FE.KEYCODE.BACKSPACE && (e.metaKey || e.ctrlKey) ? setTimeout(function() {
                l.events.disableBlur(), l.events.focus()
            }, 0) : n != w.FE.KEYCODE.BACKSPACE || g(e) || e.altKey ? n != w.FE.KEYCODE.DELETE || g(e) || e.altKey || e.shiftKey ? n == w.FE.KEYCODE.SPACE ? function(e) {
                var t = l.selection.element();
                if (!l.helpers.isMobile() && t && "A" == t.tagName) {
                    e.preventDefault(), e.stopPropagation(), l.selection.isCollapsed() || l.selection.remove();
                    var n = l.markers.insert();
                    if (n) {
                        var r = n.previousSibling;
                        !n.nextSibling && n.parentNode && "A" == n.parentNode.tagName ? (n.parentNode.insertAdjacentHTML("afterend", "&nbsp;" + w.FE.MARKERS), n.parentNode.removeChild(n)) : (r && r.nodeType == Node.TEXT_NODE && 1 == r.textContent.length && 160 == r.textContent.charCodeAt(0) ? r.textContent = r.textContent + " " : n.insertAdjacentHTML("beforebegin", "&nbsp;"), n.outerHTML = w.FE.MARKERS), l.selection.restore()
                    }
                }
            }(e) : n == w.FE.KEYCODE.TAB ? function(e) {
                if (0 < l.opts.tabSpaces)
                    if (l.selection.isCollapsed()) {
                        l.undo.saveStep(), e.preventDefault(), e.stopPropagation();
                        for (var t = "", n = 0; n < l.opts.tabSpaces; n++) t += "&nbsp;";
                        l.html.insert(t), l.placeholder.refresh(), l.undo.saveStep()
                    } else e.preventDefault(), e.stopPropagation(), e.shiftKey ? l.commands.outdent() : l.commands.indent()
            }(e) : g(e) || !m(e.which) || l.selection.isCollapsed() || e.ctrlKey || e.altKey || l.selection.remove() : l.placeholder.isVisible() ? (l.opts.keepFormatOnDelete || f(), e.preventDefault(), e.stopPropagation()) : ((r = e).preventDefault(), r.stopPropagation(), "" === l.selection.text() ? l.cursor.del() : l.selection.remove(), l.placeholder.refresh()) : l.placeholder.isVisible() ? (l.opts.keepFormatOnDelete || f(), e.preventDefault(), e.stopPropagation()) : function(e) {
                if (l.selection.isCollapsed())
                    if (l.cursor.backspace(), l.helpers.isIOS()) {
                        var t = l.selection.ranges(0);
                        t.deleteContents(), t.insertNode(document.createTextNode("\u200b")), l.selection.get().modify("move", "forward", "character")
                    } else e.preventDefault(), e.stopPropagation();
                else e.preventDefault(), e.stopPropagation(), l.selection.remove();
                l.placeholder.refresh()
            }(e), l.events.enableBlur()
        }

        function s() {
            if (!l.$wp) return !0;
            var e;
            l.opts.height || l.opts.heightMax ? (e = l.position.getBoundingRect().top, l.opts.iframe && (e += l.$iframe.offset().top, e -= l.helpers.scrollTop()), e > l.$wp.offset().top - l.helpers.scrollTop() + l.$wp.height() - 20 && l.$wp.scrollTop(e + l.$wp.scrollTop() - (l.$wp.height() + l.$wp.offset().top) + l.helpers.scrollTop() + 20)) : (e = l.position.getBoundingRect().top, l.opts.toolbarBottom && (e += l.opts.toolbarStickyOffset), l.opts.iframe && (e += l.$iframe.offset().top, e -= l.helpers.scrollTop()), (e += l.opts.toolbarStickyOffset) > l.o_win.innerHeight - 20 && w(l.o_win).scrollTop(e + l.helpers.scrollTop() - l.o_win.innerHeight + 20), e = l.position.getBoundingRect().top, l.opts.toolbarBottom || (e -= l.opts.toolbarStickyOffset), l.opts.iframe && (e += l.$iframe.offset().top, e -= l.helpers.scrollTop()), e < l.$tb.height() + 20 && w(l.o_win).scrollTop(e + l.helpers.scrollTop() - l.$tb.height() - 20))
        }

        function p() {
            var e, t = l.selection.element();
            ! function(e) {
                if (!e) return !1;
                var t = e.innerHTML;
                return !!((t = t.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")) && /\u200B/.test(t) && 0 < t.replace(/\u200B/gi, "").length)
            }(t) || l.node.hasClass(t, "fr-marker") || "IFRAME" == t.tagName || (e = t, l.helpers.isIOS() && 0 !== ((e.textContent || "").match(/[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi) || []).length) || (l.selection.save(), function(e) {
                for (var t = l.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, l.node.filter(function(e) {
                        return /\u200B/gi.test(e.textContent)
                    }), !1); t.nextNode();) {
                    var n = t.currentNode;
                    n.textContent = n.textContent.replace(/\u200B/gi, "")
                }
            }(t), l.selection.restore())
        }

        function u(e) {
            var t = l.selection.element();
            if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName)) return !0;
            if (e && 0 === e.which && d && (e.which = d), l.helpers.isAndroid() && l.browser.mozilla) return !0;
            if (c) return !1;
            if (e && l.helpers.isIOS() && e.which == w.FE.KEYCODE.ENTER && l.doc.execCommand("undo"), !l.selection.isCollapsed()) return !0;
            if (e && (e.which === w.FE.KEYCODE.META || e.which == w.FE.KEYCODE.CTRL)) return !0;
            if (e && h(e.which)) return !0;
            if (e && !l.helpers.isIOS() && (e.which == w.FE.KEYCODE.ENTER || e.which == w.FE.KEYCODE.BACKSPACE || 37 <= e.which && e.which <= 40 && !l.browser.msie)) try {
                s()
            } catch (n) {}
            p()
        }

        function g(e) {
            if (-1 != navigator.userAgent.indexOf("Mac OS X")) {
                if (e.metaKey && !e.altKey) return !0
            } else if (e.ctrlKey && !e.altKey) return !0;
            return !1
        }

        function h(e) {
            if (e >= w.FE.KEYCODE.ARROW_LEFT && e <= w.FE.KEYCODE.ARROW_DOWN) return !0
        }

        function m(e) {
            if (e >= w.FE.KEYCODE.ZERO && e <= w.FE.KEYCODE.NINE) return !0;
            if (e >= w.FE.KEYCODE.NUM_ZERO && e <= w.FE.KEYCODE.NUM_MULTIPLY) return !0;
            if (e >= w.FE.KEYCODE.A && e <= w.FE.KEYCODE.Z) return !0;
            if (l.browser.webkit && 0 === e) return !0;
            switch (e) {
                case w.FE.KEYCODE.SPACE:
                case w.FE.KEYCODE.QUESTION_MARK:
                case w.FE.KEYCODE.NUM_PLUS:
                case w.FE.KEYCODE.NUM_MINUS:
                case w.FE.KEYCODE.NUM_PERIOD:
                case w.FE.KEYCODE.NUM_DIVISION:
                case w.FE.KEYCODE.SEMICOLON:
                case w.FE.KEYCODE.FF_SEMICOLON:
                case w.FE.KEYCODE.DASH:
                case w.FE.KEYCODE.EQUALS:
                case w.FE.KEYCODE.FF_EQUALS:
                case w.FE.KEYCODE.COMMA:
                case w.FE.KEYCODE.PERIOD:
                case w.FE.KEYCODE.SLASH:
                case w.FE.KEYCODE.APOSTROPHE:
                case w.FE.KEYCODE.SINGLE_QUOTE:
                case w.FE.KEYCODE.OPEN_SQUARE_BRACKET:
                case w.FE.KEYCODE.BACKSLASH:
                case w.FE.KEYCODE.CLOSE_SQUARE_BRACKET:
                    return !0;
                default:
                    return !1
            }
        }

        function E(e) {
            var t = e.which;
            if (g(e) || 37 <= t && t <= 40 || !m(t) && t != w.FE.KEYCODE.DELETE && t != w.FE.KEYCODE.BACKSPACE && t != w.FE.KEYCODE.ENTER && t != w.FE.KEYCODE.IME) return !0;
            n || (r = l.snapshot.get(), l.undo.canDo() || l.undo.saveStep()), clearTimeout(n), n = setTimeout(function() {
                n = null, l.undo.saveStep()
            }, Math.max(250, l.opts.typingTimer))
        }

        function v(e) {
            var t = e.which;
            if (g(e) || 37 <= t && t <= 40) return !0;
            r && n ? (l.undo.saveStep(r), r = null) : void 0 !== t && 0 !== t || r || n || l.undo.saveStep()
        }

        function b(e) {
            if (e && "BR" == e.tagName) return !1;
            try {
                return 0 === (e.textContent || "").length && e.querySelector && !e.querySelector(":scope > br") || e.childNodes && 1 == e.childNodes.length && e.childNodes[0].getAttribute && ("false" == e.childNodes[0].getAttribute("contenteditable") || l.node.hasClass(e.childNodes[0], "fr-img-caption"))
            } catch (t) {
                return !1
            }
        }

        function S(e) {
            var t = l.el.childNodes,
                n = l.html.defaultTag();
            return !(!e.target || e.target === l.el) || (0 === t.length || void(l.$el.outerHeight() - e.offsetY <= 10 ? b(t[t.length - 1]) && (n ? l.$el.append("<" + n + ">" + w.FE.MARKERS + "<br></" + n + ">") : l.$el.append(w.FE.MARKERS + "<br>"), l.selection.restore(), s()) : e.offsetY <= 10 && b(t[0]) && (n ? l.$el.prepend("<" + n + ">" + w.FE.MARKERS + "<br></" + n + ">") : l.$el.prepend(w.FE.MARKERS + "<br>"), l.selection.restore(), s())))
        }

        function T() {
            n && clearTimeout(n)
        }
        return {
            _init: function() {
                l.events.on("keydown", E), l.events.on("input", e), l.events.on("mousedown", i), l.events.on("keyup input", v), l.events.on("keypress", o), l.events.on("keydown", a), l.events.on("keyup", u), l.events.on("destroy", T), l.events.on("html.inserted", u), l.events.on("cut", t), l.opts.multiLine && l.events.on("click", S)
            },
            ctrlKey: g,
            isCharacter: m,
            isArrow: h,
            forceUndo: function() {
                n && (clearTimeout(n), l.undo.saveStep(), r = null)
            },
            isIME: function() {
                return c
            },
            isBrowserAction: function(e) {
                var t = e.which;
                return g(e) || t == w.FE.KEYCODE.F5
            },
            positionCaret: s
        }
    }, w.FE.MODULES.accessibility = function(f) {
        var i = !0;

        function s(t) {
            t && t.length && !f.$el.find('[contenteditable="true"]').is(":focus") && (t.data("blur-event-set") || t.parents(".fr-popup").length || (f.events.$on(t, "blur", function() {
                var e = t.parents(".fr-toolbar, .fr-popup").data("instance") || f;
                e.events.blurActive() && !f.core.hasFocus() && e.events.trigger("blur"), setTimeout(function() {
                    e.events.enableBlur()
                }, 100)
            }, !0), t.data("blur-event-set", !0)), (t.parents(".fr-toolbar, .fr-popup").data("instance") || f).events.disableBlur(), t.focus(), f.shared.$f_el = t)
        }

        function p(e, t) {
            var n = t ? "last" : "first",
                r = e.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible")[n]();
            if (r.length) return s(r), !0
        }

        function a(e) {
            return e.is("input, textarea, select") && t(), f.events.disableBlur(), e.focus(), !0
        }

        function u(e, t) {
            var n = e.find("input, textarea, button, select").filter(":visible").not(":disabled").filter(t ? ":last" : ":first");
            if (n.length) return a(n);
            if (f.shared.with_kb) {
                var r = e.find(".fr-active-item:visible:first");
                if (r.length) return a(r);
                var o = e.find("[tabIndex]:visible:first");
                if (o.length) return a(o)
            }
        }

        function t() {
            0 === f.$el.find(".fr-marker").length && f.core.hasFocus() && f.selection.save()
        }

        function l() {
            var e = f.popups.areVisible();
            if (e) {
                var t = e.find(".fr-buttons");
                return t.find("button:focus, .fr-group span:focus").length ? !p(e.data("instance").$tb) : !p(t)
            }
            return !p(f.$tb)
        }

        function d() {
            var e = null;
            return f.shared.$f_el.is(".fr-dropdown.fr-active") ? e = f.shared.$f_el : f.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active") && (e = f.shared.$f_el.closest(".fr-dropdown-menu").prev()), e
        }

        function n(e, t, n) {
            if (f.shared.$f_el) {
                var r = d();
                r && (f.button.click(r), f.shared.$f_el = r);
                var o = e.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible"),
                    i = o.index(f.shared.$f_el);
                if (0 === i && !n || i == o.length - 1 && n) {
                    var a;
                    if (t) {
                        if (e.parent().is(".fr-popup")) a = !u(e.parent().children().not(".fr-buttons"), !n);
                        !1 === a && (f.shared.$f_el = null)
                    }
                    t && !1 === a || p(e, !n)
                } else s(w(o.get(i + (n ? 1 : -1))));
                return !1
            }
        }

        function c(e, t) {
            return n(e, t, !0)
        }

        function g(e, t) {
            return n(e, t)
        }

        function h(e) {
            if (f.shared.$f_el) {
                var t;
                if (f.shared.$f_el.is(".fr-dropdown.fr-active")) return s(t = e ? f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last()), !1;
                if (f.shared.$f_el.is("a.fr-command")) return (t = e ? f.shared.$f_el.closest("li").nextAll(":visible:first").find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest("li").prevAll(":visible:first").find(".fr-command:not(.fr-disabled)").first()).length || (t = e ? f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()), s(t), !1
            }
        }

        function m() {
            if (f.shared.$f_el) {
                if (f.shared.$f_el.hasClass("fr-dropdown")) f.button.click(f.shared.$f_el);
                else if (f.shared.$f_el.is("button.fr-back")) {
                    f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus());
                    var e = f.popups.areVisible(f);
                    e && (f.shared.with_kb = !1), f.button.click(f.shared.$f_el), v(e)
                } else {
                    if (f.events.disableBlur(), f.button.click(f.shared.$f_el), f.shared.$f_el.attr("data-popup")) {
                        var t = f.popups.areVisible(f);
                        t && t.data("popup-button", f.shared.$f_el)
                    } else if (f.shared.$f_el.attr("data-modal")) {
                        var n = f.modals.areVisible(f);
                        n && n.data("modal-button", f.shared.$f_el)
                    }
                    f.shared.$f_el = null
                }
                return !1
            }
        }

        function E() {
            f.shared.$f_el && (f.events.disableBlur(), f.shared.$f_el.blur(), f.shared.$f_el = null), !1 !== f.events.trigger("toolbar.focusEditor") && (f.events.disableBlur(), f.browser.msie || f.$el.focus(), f.events.focus())
        }

        function r(r) {
            r && r.length && (f.events.$on(r, "keydown", function(e) {
                if (!w(e.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command")) return !0;
                var t = r.parents(".fr-popup").data("instance") || r.data("instance") || f;
                f.shared.with_kb = !0;
                var n = t.accessibility.exec(e, r);
                return f.shared.with_kb = !1, n
            }, !0), f.browser.msie || f.events.$on(r, "mouseenter", "[tabIndex]", function(e) {
                var t = r.parents(".fr-popup").data("instance") || r.data("instance") || f;
                if (!i) return e.stopPropagation(), void e.preventDefault();
                var n = w(e.currentTarget);
                t.shared.$f_el && t.shared.$f_el.not(n) && t.accessibility.focusEditor()
            }, !0))
        }

        function v(e) {
            var t = e.data("popup-button");
            t && setTimeout(function() {
                s(t), e.data("popup-button", null)
            }, 0)
        }

        function o(e) {
            var t = f.popups.areVisible(e);
            t && t.data("popup-button", null)
        }

        function e(e) {
            var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
            if (e.which == w.FE.KEYCODE.F10 && !t && !e.shiftKey && e.altKey) {
                f.shared.with_kb = !0;
                var n = f.popups.areVisible(f),
                    r = !1;
                return n && (r = u(n.children().not(".fr-buttons"))), r || l(), f.shared.with_kb = !1, e.preventDefault(), e.stopPropagation(), !1
            }
            return !0
        }
        return {
            _init: function() {
                f.$wp ? f.events.on("keydown", e, !0) : f.events.$on(f.$win, "keydown", e, !0), f.events.on("mousedown", function(e) {
                    o(f), f.shared.$f_el && (f.accessibility.restoreSelection(), e.stopPropagation(), f.events.disableBlur(), f.shared.$f_el = null)
                }, !0), f.events.on("blur", function() {
                    f.shared.$f_el = null, o(f)
                }, !0)
            },
            registerPopup: function(e) {
                var d, c, t = f.popups.get(e),
                    n = (d = e, c = f.popups.get(d), {
                        _tiKeydown: function(e) {
                            var t = c.data("instance") || f;
                            if (!1 === t.events.trigger("popup.tab", [e])) return !1;
                            var n = e.which,
                                r = c.find(":focus:first");
                            if (w.FE.KEYCODE.TAB == n) {
                                e.preventDefault();
                                var o = c.children().not(".fr-buttons"),
                                    i = o.find("input, textarea, button, select").filter(":visible").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(),
                                    a = i.indexOf(this) + (e.shiftKey ? -1 : 1);
                                if (0 <= a && a < i.length) return t.events.disableBlur(), w(i[a]).focus(), e.stopPropagation(), !1;
                                var s = c.find(".fr-buttons");
                                if (s.length && p(s, !!e.shiftKey)) return e.stopPropagation(), !1;
                                if (u(o)) return e.stopPropagation(), !1
                            } else {
                                if (w.FE.KEYCODE.ENTER != n || !e.target || "TEXTAREA" === e.target.tagName) return w.FE.KEYCODE.ESC == n ? (e.preventDefault(), e.stopPropagation(), t.accessibility.restoreSelection(), t.popups.isVisible(d) && c.find(".fr-back:visible").length ? (t.opts.toolbarInline && (t.events.disableBlur(), t.events.focus()), t.button.exec(c.find(".fr-back:visible:first")), v(c)) : t.popups.isVisible(d) && c.find(".fr-dismiss:visible").length ? t.button.exec(c.find(".fr-dismiss:visible:first")) : (t.popups.hide(d), t.opts.toolbarInline && t.toolbar.showInline(null, !0), v(c)), !1) : w.FE.KEYCODE.SPACE == n && (r.is(".fr-submit") || r.is(".fr-dismiss")) ? (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(r), !0) : t.keys.isBrowserAction(e) ? void e.stopPropagation() : r.is("input[type=text], textarea") ? void e.stopPropagation() : w.FE.KEYCODE.SPACE == n && (r.is(".fr-link-attr") || r.is("input[type=file]")) ? void e.stopPropagation() : (e.stopPropagation(), e.preventDefault(), !1);
                                var l = null;
                                0 < c.find(".fr-submit:visible").length ? l = c.find(".fr-submit:visible:first") : c.find(".fr-dismiss:visible").length && (l = c.find(".fr-dismiss:visible:first")), l && (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(l))
                            }
                        },
                        _tiMouseenter: function() {
                            var e = c.data("instance") || f;
                            o(e)
                        }
                    });
                r(t.find(".fr-buttons")), f.events.$on(t, "mouseenter", "tabIndex", n._tiMouseenter, !0), f.events.$on(t.children().not(".fr-buttons"), "keydown", "[tabIndex]", n._tiKeydown, !0), f.popups.onHide(e, function() {
                    (t.data("instance") || f).accessibility.restoreSelection()
                }), f.popups.onShow(e, function() {
                    i = !1, setTimeout(function() {
                        i = !0
                    }, 0)
                })
            },
            registerToolbar: r,
            focusToolbarElement: s,
            focusToolbar: p,
            focusContent: u,
            focusPopup: function(r) {
                var o = r.children().not(".fr-buttons");
                o.data("mouseenter-event-set") || f.browser.msie || (f.events.$on(o, "mouseenter", "[tabIndex]", function(e) {
                    var t = r.data("instance") || f;
                    if (!i) return e.stopPropagation(), void e.preventDefault();
                    var n = o.find(":focus:first");
                    n.length && !n.is("input, button, textarea, select") && (t.events.disableBlur(), n.blur(), t.events.disableBlur(), t.events.focus())
                }), o.data("mouseenter-event-set", !0)), !u(o) && f.shared.with_kb && p(r.find(".fr-buttons"))
            },
            focusModal: function(e) {
                f.core.hasFocus() || (f.events.disableBlur(), f.events.focus()), f.accessibility.saveSelection(), f.events.disableBlur(), f.$el.blur(), f.selection.clear(), f.events.disableBlur(), f.shared.with_kb ? e.find(".fr-command[tabIndex], [tabIndex]").first().focus() : e.find("[tabIndex]:first").focus()
            },
            focusEditor: E,
            focusPopupButton: v,
            focusModalButton: function(e) {
                var t = e.data("modal-button");
                t && setTimeout(function() {
                    s(t), e.data("modal-button", null)
                }, 0)
            },
            hasFocus: function() {
                return null != f.shared.$f_el
            },
            exec: function(e, t) {
                var n = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                    r = e.which,
                    o = !1;
                return r != w.FE.KEYCODE.TAB || n || e.shiftKey || e.altKey ? r != w.FE.KEYCODE.ARROW_RIGHT || n || e.shiftKey || e.altKey ? r != w.FE.KEYCODE.TAB || n || !e.shiftKey || e.altKey ? r != w.FE.KEYCODE.ARROW_LEFT || n || e.shiftKey || e.altKey ? r != w.FE.KEYCODE.ARROW_UP || n || e.shiftKey || e.altKey ? r != w.FE.KEYCODE.ARROW_DOWN || n || e.shiftKey || e.altKey ? r != w.FE.KEYCODE.ENTER && r != w.FE.KEYCODE.SPACE || n || e.shiftKey || e.altKey ? r != w.FE.KEYCODE.ESC || n || e.shiftKey || e.altKey ? r != w.FE.KEYCODE.F10 || n || e.shiftKey || !e.altKey || (o = l()) : o = function(e) {
                    if (f.shared.$f_el) {
                        var t = d();
                        return t ? (f.button.click(t), s(t)) : e.parent().find(".fr-back:visible").length ? (f.shared.with_kb = !1, f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus()), f.button.exec(e.parent().find(".fr-back:visible:first")), v(e.parent())) : f.shared.$f_el.is("button, .fr-group span") && (e.parent().is(".fr-popup") ? (f.accessibility.restoreSelection(), f.shared.$f_el = null, !1 !== f.events.trigger("toolbar.esc") && (f.popups.hide(e.parent()), f.opts.toolbarInline && f.toolbar.showInline(null, !0), v(e.parent()))) : E()), !1
                    }
                }(t) : o = m() : o = f.shared.$f_el && f.shared.$f_el.is(".fr-dropdown:not(.fr-active)") ? m() : h(!0) : o = h() : o = g(t) : o = g(t, !0) : o = c(t) : o = c(t, !0), f.shared.$f_el || o !== undefined || (o = !0), !o && f.keys.isBrowserAction(e) && (o = !0), !!o || (e.preventDefault(), e.stopPropagation(), !1)
            },
            saveSelection: t,
            restoreSelection: function() {
                f.$el.find(".fr-marker").length && (f.events.disableBlur(), f.selection.restore(), f.events.enableBlur())
            }
        }
    }, w.FE.MODULES.format = function(h) {
        function l(e, t) {
            var n = "<" + e;
            for (var r in t) t.hasOwnProperty(r) && (n += " " + r + '="' + t[r] + '"');
            return n += ">"
        }

        function f(e, t) {
            var n = e;
            for (var r in t) t.hasOwnProperty(r) && (n += "id" == r ? "#" + t[r] : "class" == r ? "." + t[r] : "[" + r + '="' + t[r] + '"]');
            return n
        }

        function p(e, t) {
            return !(!e || e.nodeType != Node.ELEMENT_NODE) && (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t)
        }

        function m(e, t, n) {
            if (e) {
                for (; e.nodeType === Node.COMMENT_NODE;) e = e.nextSibling;
                if (e) {
                    if (h.node.isBlock(e) && "HR" !== e.tagName) return m(e.firstChild, t, n), !1;
                    for (var r = w(l(t, n)).insertBefore(e), o = e; o && !w(o).is(".fr-marker") && 0 === w(o).find(".fr-marker").length && "UL" != o.tagName && "OL" != o.tagName;) {
                        var i = o;
                        if (h.node.isBlock(o) && "HR" !== e.tagName) return m(o.firstChild, t, n), !1;
                        o = o.nextSibling, r.append(i)
                    }
                    if (o)(w(o).find(".fr-marker").length || "UL" == o.tagName || "OL" == o.tagName) && m(o.firstChild, t, n);
                    else {
                        for (var a = r.get(0).parentNode; a && !a.nextSibling && !h.node.isElement(a);) a = a.parentNode;
                        if (a) {
                            var s = a.nextSibling;
                            s && (h.node.isBlock(s) ? "HR" === s.tagName ? m(s.nextSibling, t, n) : m(s.firstChild, t, n) : m(s, t, n))
                        }
                    }
                    r.is(":empty") && r.remove()
                }
            }
        }

        function n(e, t) {
            var n;
            if (void 0 === t && (t = {}), t.style && delete t.style, h.selection.isCollapsed()) {
                h.markers.insert(), h.$el.find(".fr-marker").replaceWith(l(e, t) + w.FE.INVISIBLE_SPACE + w.FE.MARKERS + ("</" + e + ">")), h.selection.restore()
            } else {
                var r;
                h.selection.save(), m(h.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling, e, t);
                do {
                    for (r = h.$el.find(f(e, t) + " > " + f(e, t)), n = 0; n < r.length; n++) r[n].outerHTML = r[n].innerHTML
                } while (r.length);
                h.el.normalize();
                var o = h.el.querySelectorAll(".fr-marker");
                for (n = 0; n < o.length; n++) {
                    var i = w(o[n]);
                    !0 === i.data("type") ? p(i.get(0).nextSibling, f(e, t)) && i.next().prepend(i) : p(i.get(0).previousSibling, f(e, t)) && i.prev().append(i)
                }
                h.selection.restore()
            }
        }

        function E(e, t, n, r) {
            if (!r) {
                var o = !1;
                if (!0 === e.data("type"))
                    for (; h.node.isFirstSibling(e.get(0)) && !e.parent().is(h.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().before(e), o = !0;
                else if (!1 === e.data("type"))
                    for (; h.node.isLastSibling(e.get(0)) && !e.parent().is(h.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().after(e), o = !0;
                if (o) return !0
            }
            if (e.parents(t).length || void 0 === t) {
                var i = "",
                    a = "",
                    s = e.parent();
                if (s.is(h.$el) || h.node.isBlock(s.get(0))) return !1;
                for (; !h.node.isBlock(s.parent().get(0)) && (void 0 === t || void 0 !== t && !p(s.get(0), f(t, n)));) i += h.node.closeTagString(s.get(0)), a = h.node.openTagString(s.get(0)) + a, s = s.parent();
                var l = e.get(0).outerHTML;
                e.replaceWith('<span id="mark"></span>');
                var d = s.html().replace(/<span id="mark"><\/span>/, i + h.node.closeTagString(s.get(0)) + a + l + i + h.node.openTagString(s.get(0)) + a);
                return s.replaceWith(h.node.openTagString(s.get(0)) + d + h.node.closeTagString(s.get(0))), !0
            }
            return !1
        }

        function r(t, n) {
            void 0 === n && (n = {}), n.style && delete n.style;
            var r = h.selection.isCollapsed();
            h.selection.save();
            for (var o = !0; o;) {
                o = !1;
                for (var i = h.$el.find(".fr-marker"), a = 0; a < i.length; a++) {
                    var s = w(i[a]),
                        l = null;
                    if (s.attr("data-cloned") || r || (l = s.clone().removeClass("fr-marker").addClass("fr-clone"), !0 === s.data("type") ? s.attr("data-cloned", !0).after(l) : s.attr("data-cloned", !0).before(l)), E(s, t, n, r)) {
                        o = !0;
                        break
                    }
                }
            }! function e(t, n, r, o) {
                for (var i = h.node.contents(t.get(0)), a = 0; a < i.length; a++) {
                    var s = i[a];
                    if (h.node.hasClass(s, "fr-marker")) n = (n + 1) % 2;
                    else if (n)
                        if (0 < w(s).find(".fr-marker").length) n = e(w(s), n, r, o);
                        else {
                            for (var l = w(s).find(r || "*:not(br)"), d = l.length - 1; 0 <= d; d--) {
                                var c = l[d];
                                h.node.isBlock(c) || h.node.isVoid(c) || void 0 !== r && !p(c, f(r, o)) ? h.node.isBlock(c) && void 0 === r && "TABLE" != s.tagName && h.node.clearAttributes(c) : h.node.hasClass(c, "fr-clone") || (c.outerHTML = c.innerHTML)
                            }
                            void 0 === r && s.nodeType == Node.ELEMENT_NODE && !h.node.isVoid(s) || p(s, f(r, o)) ? h.node.isBlock(s) ? void 0 === r && s.nodeType == Node.ELEMENT_NODE && h.node.isBlock(s) && "TABLE" != s.tagName && h.node.clearAttributes(s) : h.node.hasClass(s, "fr-clone") || (s.outerHTML = s.innerHTML) : void 0 === r && s.nodeType == Node.ELEMENT_NODE && h.node.isBlock(s) && "TABLE" != s.tagName && h.node.clearAttributes(s)
                        }
                    else 0 < w(s).find(".fr-marker").length && (n = e(w(s), n, r, o))
                }
                return n
            }(h.$el, 0, t, n), r || (h.$el.find(".fr-marker").remove(), h.$el.find(".fr-clone").removeClass("fr-clone").addClass("fr-marker")), r && h.$el.find(".fr-marker").before(w.FE.INVISIBLE_SPACE).after(w.FE.INVISIBLE_SPACE), h.html.cleanEmptyTags(), h.el.normalize(), h.selection.restore()
        }

        function t(e, t) {
            var n, r, o, i, a, s = null;
            if (h.selection.isCollapsed()) {
                h.markers.insert();
                var l = (r = h.$el.find(".fr-marker")).parent();
                if (h.node.openTagString(l.get(0)) == '<span style="' + e + ": " + l.css(e) + ';">') {
                    if (h.node.isEmpty(l.get(0))) s = w('<span style="' + e + ": " + t + ';">' + w.FE.INVISIBLE_SPACE + w.FE.MARKERS + "</span>"), l.replaceWith(s);
                    else {
                        var d = {};
                        d["style*"] = e + ":", E(r, "span", d, !0), r = h.$el.find(".fr-marker"), t ? (s = w('<span style="' + e + ": " + t + ';">' + w.FE.INVISIBLE_SPACE + w.FE.MARKERS + "</span>"), r.replaceWith(s)) : r.replaceWith(w.FE.INVISIBLE_SPACE + w.FE.MARKERS)
                    }
                    h.html.cleanEmptyTags()
                } else h.node.isEmpty(l.get(0)) && l.is("span") ? (r.replaceWith(w.FE.MARKERS), l.css(e, t)) : (s = w('<span style="' + e + ": " + t + ';">' + w.FE.INVISIBLE_SPACE + w.FE.MARKERS + "</span>"), r.replaceWith(s));
                s && v(s, e, t)
            } else {
                if (h.selection.save(), null == t || "color" == e && 0 < h.$el.find(".fr-marker").parents("u, a").length) {
                    var c = h.$el.find(".fr-marker");
                    for (n = 0; n < c.length; n++)
                        if (!0 === (r = w(c[n])).data("type"))
                            for (; h.node.isFirstSibling(r.get(0)) && !r.parent().is(h.$el) && !h.node.isElement(r.parent().get(0)) && !h.node.isBlock(r.parent().get(0));) r.parent().before(r);
                        else
                            for (; h.node.isLastSibling(r.get(0)) && !r.parent().is(h.$el) && !h.node.isElement(r.parent().get(0)) && !h.node.isBlock(r.parent().get(0));) r.parent().after(r)
                }
                var f = h.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling,
                    p = {
                        "class": "fr-unprocessed"
                    };
                for (t && (p.style = e + ": " + t + ";"), m(f, "span", p), h.$el.find(".fr-marker + .fr-unprocessed").each(function() {
                        w(this).prepend(w(this).prev())
                    }), h.$el.find(".fr-unprocessed + .fr-marker").each(function() {
                        w(this).prev().append(this)
                    }), (t || "").match(/\dem$/) && h.$el.find("span.fr-unprocessed").removeClass("fr-unprocessed"); 0 < h.$el.find("span.fr-unprocessed").length;) {
                    if ((s = h.$el.find("span.fr-unprocessed:first").removeClass("fr-unprocessed")).parent().get(0).normalize(), s.parent().is("span") && 1 == s.parent().get(0).childNodes.length) {
                        s.parent().css(e, t);
                        var u = s;
                        s = s.parent(), u.replaceWith(u.html())
                    }
                    var g = s.find("span");
                    for (n = g.length - 1; 0 <= n; n--) o = g[n], i = e, a = void 0, (a = w(o)).css(i, ""), "" === a.attr("style") && a.replaceWith(a.html());
                    v(s, e, t)
                }
            }! function() {
                var e;
                for (; 0 < h.$el.find(".fr-split:empty").length;) h.$el.find(".fr-split:empty").remove();
                h.$el.find(".fr-split").removeClass("fr-split"), h.$el.find('[style=""]').removeAttr("style"), h.$el.find('[class=""]').removeAttr("class"), h.html.cleanEmptyTags(), w(h.$el.find("span").get().reverse()).each(function() {
                    this.attributes && 0 !== this.attributes.length || w(this).replaceWith(this.innerHTML)
                }), h.el.normalize();
                var t = h.$el.find("span[style] + span[style]");
                for (e = 0; e < t.length; e++) {
                    var n = w(t[e]),
                        r = w(t[e]).prev();
                    n.get(0).previousSibling == r.get(0) && h.node.openTagString(n.get(0)) == h.node.openTagString(r.get(0)) && (n.prepend(r.html()), r.remove())
                }
                h.$el.find("span[style] span[style]").each(function() {
                    if (0 <= w(this).attr("style").indexOf("font-size")) {
                        var e = w(this).parents("span[style]");
                        0 <= e.attr("style").indexOf("background-color") && (w(this).attr("style", w(this).attr("style") + ";" + e.attr("style")), E(w(this), "span[style]", {}, !1))
                    }
                }), h.el.normalize(), h.selection.restore()
            }()
        }

        function v(e, t, n) {
            var r, o, i, a = e.parentsUntil(h.$el, "span[style]"),
                s = [];
            for (r = a.length - 1; 0 <= r; r--) o = a[r], i = t, 0 === w(o).attr("style").indexOf(i + ":") || 0 <= w(o).attr("style").indexOf(";" + i + ":") || 0 <= w(o).attr("style").indexOf("; " + i + ":") || s.push(a[r]);
            if ((a = a.not(s)).length) {
                for (var l = "", d = "", c = "", f = "", p = e.get(0); p = p.parentNode, w(p).addClass("fr-split"), l += h.node.closeTagString(p), d = h.node.openTagString(w(p).clone().addClass("fr-split").get(0)) + d, a.get(0) != p && (c += h.node.closeTagString(p), f = h.node.openTagString(w(p).clone().addClass("fr-split").get(0)) + f), a.get(0) != p;);
                var u = l + h.node.openTagString(w(a.get(0)).clone().css(t, n || "").get(0)) + f + e.css(t, "").get(0).outerHTML + c + "</span>" + d;
                e.replaceWith('<span id="fr-break"></span>');
                var g = a.get(0).outerHTML;
                w(a.get(0)).replaceWith(g.replace(/<span id="fr-break"><\/span>/g, u))
            }
        }

        function o(e, t) {
            void 0 === t && (t = {}), t.style && delete t.style;
            var n = h.selection.ranges(0),
                r = n.startContainer;
            if (r.nodeType == Node.ELEMENT_NODE && 0 < r.childNodes.length && r.childNodes[n.startOffset] && (r = r.childNodes[n.startOffset]), !n.collapsed && r.nodeType == Node.TEXT_NODE && n.startOffset == (r.textContent || "").length) {
                for (; !h.node.isBlock(r.parentNode) && !r.nextSibling;) r = r.parentNode;
                r.nextSibling && (r = r.nextSibling)
            }
            for (var o = r; o && o.nodeType == Node.ELEMENT_NODE && !p(o, f(e, t));) o = o.firstChild;
            if (o && o.nodeType == Node.ELEMENT_NODE && p(o, f(e, t))) return !0;
            var i = r;
            for (i && i.nodeType != Node.ELEMENT_NODE && (i = i.parentNode); i && i.nodeType == Node.ELEMENT_NODE && i != h.el && !p(i, f(e, t));) i = i.parentNode;
            return !(!i || i.nodeType != Node.ELEMENT_NODE || i == h.el || !p(i, f(e, t)))
        }
        return {
            is: o,
            toggle: function(e, t) {
                o(e, t) ? r(e, t) : n(e, t)
            },
            apply: n,
            remove: r,
            applyStyle: t,
            removeStyle: function(e) {
                t(e, null)
            }
        }
    }, w.extend(w.FE.DEFAULTS, {
        indentMargin: 20
    }), w.FE.COMMANDS = {
        bold: {
            title: "Bold",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("b");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        italic: {
            title: "Italic",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("i");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        underline: {
            title: "Underline",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("u");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        strikeThrough: {
            title: "Strikethrough",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("s");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        subscript: {
            title: "Subscript",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("sub");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        superscript: {
            title: "Superscript",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("sup");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        outdent: {
            title: "Decrease Indent"
        },
        indent: {
            title: "Increase Indent"
        },
        undo: {
            title: "Undo",
            undo: !1,
            forcedRefresh: !0,
            disabled: !0
        },
        redo: {
            title: "Redo",
            undo: !1,
            forcedRefresh: !0,
            disabled: !0
        },
        insertHR: {
            title: "Insert Horizontal Line"
        },
        clearFormatting: {
            title: "Clear Formatting"
        },
        selectAll: {
            title: "Select All",
            undo: !1
        }
    }, w.FE.RegisterCommand = function(e, t) {
        w.FE.COMMANDS[e] = t
    }, w.FE.MODULES.commands = function(a) {
        function o(e) {
            return a.html.defaultTag() && (e = "<" + a.html.defaultTag() + ">" + e + "</" + a.html.defaultTag() + ">"), e
        }
        var i = {
            bold: function() {
                e("bold", "b")
            },
            subscript: function() {
                a.format.is("sup") && a.format.remove("sup"), e("subscript", "sub")
            },
            superscript: function() {
                a.format.is("sub") && a.format.remove("sub"), e("superscript", "sup")
            },
            italic: function() {
                e("italic", "i")
            },
            strikeThrough: function() {
                e("strikeThrough", "s")
            },
            underline: function() {
                e("underline", "u")
            },
            undo: function() {
                a.undo.run()
            },
            redo: function() {
                a.undo.redo()
            },
            indent: function() {
                n(1)
            },
            outdent: function() {
                n(-1)
            },
            show: function() {
                a.opts.toolbarInline && a.toolbar.showInline(null, !0)
            },
            insertHR: function() {
                a.selection.remove();
                var e = "";
                a.core.isEmpty() && (e = o(e = "<br>")), a.html.insert('<hr id="fr-just">' + e);
                var t, n = a.$el.find("hr#fr-just");
                if (n.removeAttr("id"), 0 === n.next().length) {
                    var r = a.html.defaultTag();
                    r ? n.after(w("<" + r + ">").append("<br>")) : n.after("<br>")
                }
                n.prev().is("hr") ? t = a.selection.setAfter(n.get(0), !1) : n.next().is("hr") ? t = a.selection.setBefore(n.get(0), !1) : a.selection.setAfter(n.get(0), !1) || a.selection.setBefore(n.get(0), !1), t || void 0 === t || (e = o(e = w.FE.MARKERS + "<br>"), n.after(e)), a.selection.restore()
            },
            clearFormatting: function() {
                a.format.remove()
            },
            selectAll: function() {
                a.doc.execCommand("selectAll", !1, !1)
            }
        };

        function t(e, t) {
            if (!1 !== a.events.trigger("commands.before", w.merge([e], t || []))) {
                var n = w.FE.COMMANDS[e] && w.FE.COMMANDS[e].callback || i[e],
                    r = !0,
                    o = !1;
                w.FE.COMMANDS[e] && ("undefined" != typeof w.FE.COMMANDS[e].focus && (r = w.FE.COMMANDS[e].focus), "undefined" != typeof w.FE.COMMANDS[e].accessibilityFocus && (o = w.FE.COMMANDS[e].accessibilityFocus)), (!a.core.hasFocus() && r && !a.popups.areVisible() || !a.core.hasFocus() && o && a.accessibility.hasFocus()) && a.events.focus(!0), w.FE.COMMANDS[e] && !1 !== w.FE.COMMANDS[e].undo && (a.$el.find(".fr-marker").length && (a.events.disableBlur(), a.selection.restore()), a.undo.saveStep()), n && n.apply(a, w.merge([e], t || [])), a.events.trigger("commands.after", w.merge([e], t || [])), w.FE.COMMANDS[e] && !1 !== w.FE.COMMANDS[e].undo && a.undo.saveStep()
            }
        }

        function e(e, t) {
            a.format.toggle(t)
        }

        function n(e) {
            a.selection.save(), a.html.wrap(!0, !0, !0, !0), a.selection.restore();
            for (var t = a.selection.blocks(), n = 0; n < t.length; n++)
                if ("LI" != t[n].tagName && "LI" != t[n].parentNode.tagName) {
                    var r = w(t[n]),
                        o = "rtl" == a.opts.direction || "rtl" == r.css("direction") ? "margin-right" : "margin-left",
                        i = a.helpers.getPX(r.css(o));
                    if (r.width() < 2 * a.opts.indentMargin && 0 < e) continue;
                    r.css(o, Math.max(i + e * a.opts.indentMargin, 0) || ""), r.removeClass("fr-temp-div")
                }
            a.selection.save(), a.html.unwrap(), a.selection.restore()
        }

        function r(e) {
            return function() {
                t(e)
            }
        }
        var s = {};
        for (var l in i) i.hasOwnProperty(l) && (s[l] = r(l));
        return w.extend(s, {
            exec: t,
            _init: function() {
                a.events.on("keydown", function(e) {
                    var t = a.selection.element();
                    if (t && "HR" == t.tagName && !a.keys.isArrow(e.which)) return e.preventDefault(), !1
                }), a.events.on("keyup", function(e) {
                    var t = a.selection.element();
                    if (t && "HR" == t.tagName)
                        if (e.which == w.FE.KEYCODE.ARROW_LEFT || e.which == w.FE.KEYCODE.ARROW_UP) {
                            if (t.previousSibling) return a.node.isBlock(t.previousSibling) ? a.selection.setAtEnd(t.previousSibling) : w(t).before(w.FE.MARKERS), a.selection.restore(), !1
                        } else if ((e.which == w.FE.KEYCODE.ARROW_RIGHT || e.which == w.FE.KEYCODE.ARROW_DOWN) && t.nextSibling) return a.node.isBlock(t.nextSibling) ? a.selection.setAtStart(t.nextSibling) : w(t).after(w.FE.MARKERS), a.selection.restore(), !1
                }), a.events.on("mousedown", function(e) {
                    if (e.target && "HR" == e.target.tagName) return e.preventDefault(), e.stopPropagation(), !1
                }), a.events.on("mouseup", function() {
                    var e = a.selection.element();
                    e == a.selection.endElement() && e && "HR" == e.tagName && (e.nextSibling && (a.node.isBlock(e.nextSibling) ? a.selection.setAtStart(e.nextSibling) : w(e).after(w.FE.MARKERS)), a.selection.restore())
                })
            }
        })
    }, w.FE.MODULES.data = function(p) {
        var u = "NCKB1zwtPA9tqzajXC2c2A7B-16VD3spzJ1C9C3D5oOF2OB1NB1LD7VA5QF4TE3gytXB2A4C-8VA2AC4E1D3GB2EB2KC3KD1MF1juuSB1A8C6yfbmd1B2a1A5qdsdB2tivbC3CB1KC1CH1eLA2sTF1B4I4H-7B-21UB6b1F5bzzzyAB4JC3MG2hjdKC1JE6C1E1cj1pD-16pUE5B4prra2B5ZB3D3C3pxj1EA6A3rnJA2C-7I-7JD9D1E1wYH1F3sTB5TA2G4H4ZA22qZA5BB3mjcvcCC3JB1xillavC-21VE6PC5SI4YC5C8mb1A3WC3BD2B5aoDA2qqAE3A5D-17fOD1D5RD4WC10tE6OAZC3nF-7b1C4A4D3qCF2fgmapcromlHA2QA6a1E1D3e1A6C2bie2F4iddnIA7B2mvnwcIB5OA1DB2OLQA3PB10WC7WC5d1E3uI-7b1D5D6b1E4D2arlAA4EA1F-11srxI-7MB1D7PF1E5B4adB-21YD5vrZH3D3xAC4E1A2GF2CF2J-7yNC2JE1MI2hH-7QB1C6B5B-9bA-7XB13a1B5VievwpKB4LA3NF-10H-9I-8hhaC-16nqPG4wsleTD5zqYF3h1G2B7B4yvGE2Pi1H-7C-21OE6B1uLD1kI4WC1E7C5g1D-8fue1C8C6c1D4D3Hpi1CC4kvGC2E1legallyXB4axVA11rsA4A-9nkdtlmzBA2GD3A13A6CB1dabE1lezrUE6RD5TB4A-7f1C8c1B5d1D4D3tyfCD5C2D2==",
            g = function() {
                for (var e = 0, t = document.domain, n = t.split("."), r = "_gd" + (new Date).getTime(); e < n.length - 1 && -1 == document.cookie.indexOf(r + "=" + r);) t = n.slice(-1 - ++e).join("."), document.cookie = r + "=" + r + ";domain=" + t + ";";
                return document.cookie = r + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + t + ";", (t || "").replace(/(^\.*)|(\.*$)/g, "")
            }();

        function h(e) {
            return e
        }
        var m, E, v = h(function(e) {
            if (!e) return e;
            for (var t = "", n = h("charCodeAt"), r = h("fromCharCode"), o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".indexOf(e[0]), i = 1; i < e.length - 2; i++) {
                for (var a = d(++o), s = e[n](i), l = "";
                    /[0-9-]/.test(e[i + 1]);) l += e[++i];
                s = c(s, a, l = parseInt(l, 10) || 0), s ^= o - 1 & 31, t += String[r](s)
            }
            return t
        });

        function d(e) {
            for (var t = e.toString(), n = 0, r = 0; r < t.length; r++) n += parseInt(t.charAt(r), 10);
            return 10 < n ? n % 9 + 1 : n
        }

        function c(e, t, n) {
            for (var r = Math.abs(n); 0 < r--;) e -= t;
            return n < 0 && (e += 123), e
        }

        function b(e) {
            return e && "block" !== e.css("display") ? (e.remove(), !0) : e && 0 === p.helpers.getPX(e.css("height")) ? (e.remove(), !0) : !(!e || "absolute" !== e.css("position") && "fixed" !== e.css("position") || (e.remove(), 0))
        }

        function S(e) {
            return e && 0 === p.$box.find(e).length
        }
        var e = 0;

        function T() {
            if (10 < e && (p[h(v("0ppecjvc=="))](), setTimeout(function() {
                    w.FE = null
                }, 10)), !p.$box) return !1;
            p.$wp.prepend(v(h(v(u)))), m = p.$wp.find("> div:first"), E = m.find("> a"), "rtl" == p.opts.direction && m.css("left", "auto").css("right", 0).attr("direction", "rtl"), e++
        }

        function y(e) {
            for (var t = [v("9qqG-7amjlwq=="), v("KA3B3C2A6D1D5H5H1A3=="), v("3B9B3B5F3C4G3E3=="), v("QzbzvxyB2yA-9m=="), v("ji1kacwmgG5bc=="), v("nmA-13aogi1A3c1jd=="), v("BA9ggq=="), v("emznbjbH3fij=="), v("tkC-22d1qC-13sD1wzF-7==")], n = 0; n < t.length; n++)
                if (String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
                        return (t === undefined || t > this.length) && (t = this.length), this.substring(t - e.length, t) === e
                    }), e.endsWith(t[n])) return !0;
            return !1
        }
        return {
            _init: function() {
                var e = p.o_win.FEK;
                try {
                    e = e || localStorage && localStorage.FEK
                } catch (f) {}
                e = p.opts.key || e || [""];
                var t = v(h("ziRA1E3B9pA5B-11D-11xg1A3ZB5D1D4B-11ED2EG2pdeoC1clIH4wB-22yQD5uF4YE3E3A9=="));
                "string" == typeof e && (e = [e]);
                for (var n, r, o, i = !(p.ul = !0), a = 0, s = 0; s < e.length; s++) {
                    var l = (r = e[s], 3 === (o = (v(r) || "").split("|")).length ? o : [null, null, v(r) || ""]),
                        d = l[2];
                    if (d === v(h(v("mcVRDoB1BGILD7YFe1BTXBA7B6=="))) || 0 <= d.indexOf(g, d.length - g.length) || y(g)) {
                        if (!((null === (n = l[1]) || new Date(n) < new Date(v("fA4B3E3C1I3H2C6C6C3E4=="))) && 0 < (g || "").length) || y(g)) {
                            p.ul = !1;
                            break
                        }
                        i = !0, u = "RCZB17botVG4A-8yzia1C4A5DG3CD2cFB4qflmCE4I2FB1SC7F6PE4WE3RD6e2A4c1D3d1E2E3ehxdGE3CE2IB2LC1HG2LE1QA3QC7B-13cC-9epmkjc1B4e1C4pgjgvkOC5E1eNE1HB2LD2B-13WD5tvabUA5a1A4f1A2G3C2A-21cihKE3FE2DB2cccJE1iC-7G-7tD-17tVD6A-9qC-7QC7a1E4B4je1E3E2G2ecmsAA1xH-8HB11C1D1lgzQA3dTB8od1D4XE3ohb1B4E4D3mbLA10NA7C-21d1genodKC11PD9PE5tA-8UI3ZC5XB5B-11qXF2F-7wtwjAG3NA1IB1OD1HC1RD4QJ4evUF2D5XG2G4XA8pqocH1F3G2J2hcpHC4D1MD4C1MB8PD5klcQD1A8A6e2A3ed1E2A24A7HC5C3qA-9tiA-61dcC3MD1LE1D4SA3A9ZZXSE4g1C3Pa2C5ufbcGI3I2B4skLF2CA1vxB-22wgUC4kdH-8cVB5iwe1A2D3H3G-7DD5JC2ED2OH2JB10D3C2xHE1KA29PB11wdC-11C4cixb2C7a1C4YYE3B2A15uB-21wpCA1MF1NuC-21dyzD6pPG4I-7pmjc1A4yte1F3B-22yvCC3VbC-7qC-22qNE2hC1vH-8zad1RF6WF3DpI-7C8A-16hpf1F3D2ylalB-13BB2lpA-63IB3uOF6D5G4gabC-21UD2A3PH4ZA20B11b2C6ED4A2H3I1A15DB4KD2laC-8LA5B8B7==", a = l[0] || -1
                    }
                }
                var c = new Image;
                !0 === p.ul && (T(), c.src = i ? h(v(t)) + "e=" + a : h(v(t)) + "u"), !0 === p.ul && (p.events.on("contentChanged", function() {
                    (b(m) || b(E) || S(m) || S(E)) && T()
                }), p.events.on("html.get", function(e) {
                    return e + '<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>'
                })), p.events.on("html.set", function() {
                    var e = p.el.querySelector('[data-f-id="pbf"]');
                    e && w(e).remove()
                }), p.events.on("destroy", function() {
                    m && m.length && m.remove()
                }, !0)
            }
        }
    }, w.extend(w.FE.DEFAULTS, {
        pastePlain: !1,
        pasteDeniedTags: ["colgroup", "col", "meta"],
        pasteDeniedAttrs: ["class", "id", "style"],
        pasteAllowedStyleProps: [".*"],
        pasteAllowLocalImages: !1
    }), w.FE.MODULES.paste = function(C) {
        var A, a, o, x;

        function n(e, t) {
            try {
                C.win.localStorage.setItem("fr-copied-html", e), C.win.localStorage.setItem("fr-copied-text", t)
            } catch (n) {}
        }

        function e(e) {
            var t = C.html.getSelected();
            n(t, w("<div>").html(t).text()), "cut" == e.type && (C.undo.saveStep(), setTimeout(function() {
                C.selection.save(), C.html.wrap(), C.selection.restore(), C.events.focus(), C.undo.saveStep()
            }, 0))
        }
        var i = !1;

        function t(e) {
            if (C.edit.isDisabled()) return !1;
            if (i) return !1;
            if (e.originalEvent && (e = e.originalEvent), !1 === C.events.trigger("paste.before", [e])) return e.preventDefault(), !1;
            if (C.$win.scrollTop(), e && e.clipboardData && e.clipboardData.getData) {
                var t = "",
                    n = e.clipboardData.types;
                if (C.helpers.isArray(n))
                    for (var r = 0; r < n.length; r++) t += n[r] + ";";
                else t = n;
                if (A = "", /text\/rtf/.test(t) && (a = e.clipboardData.getData("text/rtf")), /text\/html/.test(t) && !C.browser.safari ? A = e.clipboardData.getData("text/html") : /text\/rtf/.test(t) && C.browser.safari ? A = a : /public.rtf/.test(t) && C.browser.safari && (A = e.clipboardData.getData("text/rtf")), "" !== A) return s(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1;
                A = null
            }
            return function() {
                C.selection.save(), C.events.disableBlur(), A = null, o ? (o.html(""), C.browser.edge && C.opts.iframe && C.$el.append(o)) : (o = w('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 2147483647; line-height: 140%; -moz-user-select: text; -webkit-user-select: text; -ms-user-select: text; user-select: text;" tabIndex="-1"></div>'), C.browser.webkit || C.browser.mozilla ? (o.css("top", C.$sc.scrollTop()), C.$el.after(o)) : C.browser.edge && C.opts.iframe ? C.$el.append(o) : C.$box.after(o), C.events.on("destroy", function() {
                    o.remove()
                }));
                var e;
                C.helpers.isIOS() && C.$sc && (e = C.$sc.scrollTop());
                C.opts.iframe && C.$el.attr("contenteditable", "false");
                o.focus(), C.helpers.isIOS() && C.$sc && C.$sc.scrollTop(e);
                C.win.setTimeout(s, 1)
            }(), !1
        }

        function r(e) {
            if (e.originalEvent && (e = e.originalEvent), e && e.dataTransfer && e.dataTransfer.getData) {
                var t = "",
                    n = e.dataTransfer.types;
                if (C.helpers.isArray(n))
                    for (var r = 0; r < n.length; r++) t += n[r] + ";";
                else t = n;
                if (A = "", /text\/rtf/.test(t) && (a = e.dataTransfer.getData("text/rtf")), /text\/html/.test(t) ? A = e.dataTransfer.getData("text/html") : /text\/rtf/.test(t) && C.browser.safari ? A = a : /text\/plain/.test(t) && !this.browser.mozilla && (A = C.html.escapeEntities(e.dataTransfer.getData("text/plain")).replace(/\n/g, "<br>")), "" !== A) {
                    C.keys.forceUndo(), x = C.snapshot.get(), C.selection.save(), C.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-helper");
                    var o = C.markers.insertAtPoint(e);
                    if (C.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-placeholder"), C.$el.find(".fr-marker-helper").addClass("fr-marker").removeClass("fr-marker-helper"), C.selection.restore(), C.selection.remove(), C.$el.find(".fr-marker-placeholder").addClass("fr-marker").removeClass("fr-marker-placeholder"), !1 !== o) {
                        var i = C.el.querySelector(".fr-marker");
                        return w(i).replaceWith(w.FE.MARKERS), C.selection.restore(), s(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1
                    }
                } else A = null
            }
        }

        function s() {
            C.opts.iframe && C.$el.attr("contenteditable", "true"), C.browser.edge && C.opts.iframe && C.$box.after(o), x || (C.keys.forceUndo(), x = C.snapshot.get()), A || (A = o.get(0).innerHTML, C.selection.restore(), C.events.enableBlur());
            var e = A.match(/(class=\"?Mso|class=\'?Mso|class="?Xl|class='?Xl|class=Xl|style=\"[^\"]*\bmso\-|style=\'[^\']*\bmso\-|w:WordDocument)/gi),
                t = C.events.chainTrigger("paste.beforeCleanup", A);
            t && "string" == typeof t && (A = t), (!e || e && !1 !== C.events.trigger("paste.wordPaste", [A])) && l(A, e)
        }

        function $(e) {
            for (var t = "", n = 0; n++ < e;) t += "&nbsp;";
            return t
        }

        function l(r, e, t) {
            var n, o = null,
                i = null;
            if (0 <= r.toLowerCase().indexOf("<body")) {
                var a = "";
                0 <= r.indexOf("<style") && (a = r.replace(/[.\s\S\w\W<>]*(<style[^>]*>[\s]*[.\s\S\w\W<>]*[\s]*<\/style>)[.\s\S\w\W<>]*/gi, "$1")), r = a + r.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)[\s]*<\/body>[.\s\S\w\W<>]*/gi, "$1");
                var s = 0,
                    l = "";
                r.replace(/<pre.*?>([\s\S]*?)<\/pre>/gi, function(e, t, n) {
                    s < n && (l += r.substring(s, n).replace(/ \n/g, " ").replace(/\n /g, " ").replace(/([^>])\n([^<])/g, "$1 $2")), l += e, s = n + e.length
                }), r.length > s + 1 && (l += r.substring(s, r.length).replace(/ \n/g, " ").replace(/\n /g, " ").replace(/([^>])\n([^<])/g, "$1 $2")), r = l
            }
            var d = !1;
            0 <= r.indexOf('id="docs-internal-guid') && (r = r.replace(/^[\w\W\s\S]* id="docs-internal-guid[^>]*>([\w\W\s\S]*)<\/b>[\w\W\s\S]*$/g, "$1"), d = !0), 0 <= r.indexOf('content="Sheets"') && (r = r.replace(/width:0px;/g, ""));
            var c = !1,
                f = !1;
            if (!e)
                if (c = function(e) {
                        var t = null;
                        try {
                            t = C.win.localStorage.getItem("fr-copied-text")
                        } catch (n) {}
                        return !(!t || w("<div>").html(e).text().replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") != t.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, ""))
                    }(r), f = function() {
                        var e = null;
                        try {
                            e = C.win.localStorage.getItem("fr-dragged-content-text")
                        } catch (t) {}
                        return !(!e || w("<div>").html(A).text().replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") != e.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, ""))
                    }(), c && (r = C.win.localStorage.getItem("fr-copied-html")), f && (c = !0, r = C.win.localStorage.getItem("fr-dragged-content-html")), c) r = C.clean.html(r, C.opts.pasteDeniedTags, C.opts.pasteDeniedAttrs);
                else {
                    var p = C.opts.htmlAllowedStyleProps;
                    C.opts.htmlAllowedStyleProps = C.opts.pasteAllowedStyleProps, C.opts.htmlAllowComments = !1, r = (r = (r = r.replace(/<span class="Apple-tab-span">\s*<\/span>/g, $(C.opts.tabSpaces || 4))).replace(/<span class="Apple-tab-span" style="white-space:pre">(\t*)<\/span>/g, function(e, t) {
                        return $(t.length * (C.opts.tabSpaces || 4))
                    })).replace(/\t/g, $(C.opts.tabSpaces || 4)), r = C.clean.html(r, C.opts.pasteDeniedTags, C.opts.pasteDeniedAttrs), C.opts.htmlAllowedStyleProps = p, C.opts.htmlAllowComments = !0, r = (r = (r = O(r)).replace(/\r/g, "")).replace(/^ */g, "").replace(/ *$/g, "")
                }!e || C.wordPaste && t || (0 === (r = r.replace(/^\n*/g, "").replace(/^ /g, "")).indexOf("<colgroup>") && (r = "<table>" + r + "</table>"), r = O(r = function(e) {
                var t;
                e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>")).replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>")).replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ol>")).replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span")).replace(/<!--\[if \!supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, "")).replace(/<!\[if \!supportLists\]>([\s\S]*?)<!\[endif\]>/gi, "")).replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " ")).replace(/<!--[\s\S]*?-->/gi, "")).replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
                var n, r = ["style", "script", "applet", "embed", "noframes", "noscript"];
                for (t = 0; t < r.length; t++) {
                    var o = new RegExp("<" + r[t] + ".*?" + r[t] + "(.*?)>", "gi");
                    e = e.replace(o, "")
                }
                for (e = (e = (e = e.replace(/&nbsp;/gi, " ")).replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>")).replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>");
                    (e = (n = e).replace(/<[^\/>][^>]*><\/[^>]+>/gi, "")) != n;);
                e = (e = e.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>')).replace(/<lilevel1([^>]*)>/gi, "<li$1>"), e = (e = (e = C.clean.html(e, C.opts.pasteDeniedTags, C.opts.pasteDeniedAttrs)).replace(/<a>(.[^<]+)<\/a>/gi, "$1")).replace(/<br> */g, "<br>");
                var i = C.o_doc.createElement("div");
                i.innerHTML = e;
                var a = i.querySelectorAll("li[data-indent]");
                for (t = 0; t < a.length; t++) {
                    var s = a[t],
                        l = s.previousElementSibling;
                    if (l && "LI" == l.tagName) {
                        var d = l.querySelector(":scope > ul, :scope > ol");
                        d || (d = document.createElement("ul"), l.appendChild(d)), d.appendChild(s)
                    } else s.removeAttribute("data-indent")
                }
                return C.html.cleanBlankSpaces(i), e = i.innerHTML
            }(r))), C.opts.pastePlain && !c && (r = function(e) {
                var t, n = null,
                    r = C.doc.createElement("div");
                r.innerHTML = e;
                var o = r.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote");
                for (t = 0; t < o.length; t++)(n = o[t]).outerHTML = "<" + (C.html.defaultTag() || "DIV") + ">" + n.innerHTML + "</" + (C.html.defaultTag() || "DIV") + ">";
                for (t = (o = r.querySelectorAll("*:not(" + "p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not(") + ")")).length - 1; 0 <= t; t--)(n = o[t]).outerHTML = n.innerHTML;
                var i = function(e) {
                    for (var t = C.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType != Node.TEXT_NODE && t[n].nodeType != Node.ELEMENT_NODE ? t[n].parentNode.removeChild(t[n]) : i(t[n])
                };
                return i(r), r.innerHTML
            }(r));
            var u = C.events.chainTrigger("paste.afterCleanup", r);
            if ("string" == typeof u && (r = u), "" !== r) {
                var g = C.o_doc.createElement("div");
                0 <= (g.innerHTML = r).indexOf("<body>") ? (C.html.cleanBlankSpaces(g), C.spaces.normalize(g, !0)) : C.spaces.normalize(g);
                var h = g.getElementsByTagName("span");
                for (n = h.length - 1; 0 <= n; n--) {
                    var m = h[n];
                    0 === m.attributes.length && (m.outerHTML = m.innerHTML)
                }
                if (!0 === C.opts.linkAlwaysBlank) {
                    var E = g.getElementsByTagName("a");
                    for (n = E.length - 1; 0 <= n; n--) {
                        var v = E[n];
                        v.getAttribute("target") || v.setAttribute("target", "_blank")
                    }
                }
                var b = C.selection.element(),
                    S = !1;
                if (b && w(b).parentsUntil(C.el, "ul, ol").length && (S = !0), S) {
                    var T = g.children;
                    1 == T.length && 0 <= ["OL", "UL"].indexOf(T[0].tagName) && (T[0].outerHTML = T[0].innerHTML)
                }
                if (!d) {
                    var y = g.getElementsByTagName("br");
                    for (n = y.length - 1; 0 <= n; n--) {
                        var N = y[n];
                        C.node.isBlock(N.previousSibling) && N.parentNode.removeChild(N)
                    }
                }
                if (C.opts.enter == w.FE.ENTER_BR)
                    for (n = (o = g.querySelectorAll("p, div")).length - 1; 0 <= n; n--) 0 === (i = o[n]).attributes.length && (i.outerHTML = i.innerHTML + (i.nextSibling && !C.node.isEmpty(i) ? "<br>" : ""));
                else if (C.opts.enter == w.FE.ENTER_DIV)
                    for (n = (o = g.getElementsByTagName("p")).length - 1; 0 <= n; n--) 0 === (i = o[n]).attributes.length && (i.outerHTML = "<div>" + i.innerHTML + "</div>");
                else C.opts.enter == w.FE.ENTER_P && 1 == g.childNodes.length && "P" == g.childNodes[0].tagName && 0 === g.childNodes[0].attributes.length && (g.childNodes[0].outerHTML = g.childNodes[0].innerHTML);
                r = g.innerHTML, c && (r = function(e) {
                    var t, n = C.o_doc.createElement("div");
                    n.innerHTML = e;
                    var r = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(" + w.FE.VOID_ELEMENTS.join("):not(") + "):not(" + C.opts.htmlAllowedEmptyTags.join("):not(") + ")");
                    for (; r.length;) {
                        for (t = 0; t < r.length; t++) r[t].parentNode.removeChild(r[t]);
                        r = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(" + w.FE.VOID_ELEMENTS.join("):not(") + "):not(" + C.opts.htmlAllowedEmptyTags.join("):not(") + ")")
                    }
                    return n.innerHTML
                }(r)), C.html.insert(r, !0)
            }
            C.events.trigger("paste.after"), C.undo.saveStep(x), x = null, C.undo.saveStep()
        }

        function d(e) {
            for (var t = e.length - 1; 0 <= t; t--) e[t].attributes && e[t].attributes.length && e.splice(t, 1);
            return e
        }

        function O(e) {
            var t, n = C.o_doc.createElement("div");
            n.innerHTML = e;
            for (var r = d(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])"))); r.length;) {
                var o = r[r.length - 1];
                if (C.html.defaultTag() && "div" != C.html.defaultTag()) o.querySelector(C.html.blockTagsQuery()) ? o.outerHTML = o.innerHTML : o.outerHTML = "<" + C.html.defaultTag() + ">" + o.innerHTML + "</" + C.html.defaultTag() + ">";
                else {
                    var i = o.querySelectorAll("*");
                    !i.length || "BR" !== i[i.length - 1].tagName && 0 === o.innerText.length ? o.outerHTML = o.innerHTML + (o.nextSibling ? "<br>" : "") : !i.length || "BR" !== i[i.length - 1].tagName || i[i.length - 1].nextSibling ? o.outerHTML = o.innerHTML + (o.nextSibling ? "<br>" : "") : o.outerHTML = o.innerHTML
                }
                r = d(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])")))
            }
            for (r = d(Array.prototype.slice.call(n.querySelectorAll("div:not([style])"))); r.length;) {
                for (t = 0; t < r.length; t++) {
                    var a = r[t],
                        s = a.innerHTML.replace(/\u0009/gi, "").trim();
                    try {
                        a.outerHTML = s
                    } catch (l) {}
                }
                r = d(Array.prototype.slice.call(n.querySelectorAll("div:not([style])")))
            }
            return n.innerHTML
        }

        function c(e) {
            if (e.originalEvent && e.originalEvent.target && e.originalEvent.target.nodeType == Node.TEXT_NODE) try {
                C.win.localStorage.setItem("fr-dragged-content-html", e.originalEvent.dataTransfer.getData("text/html")), C.win.localStorage.setItem("fr-dragged-content-text", e.originalEvent.dataTransfer.getData("text/plain"))
            } catch (t) {}
        }

        function f() {
            C.el.removeEventListener("copy", e), C.el.removeEventListener("cut", e), C.el.removeEventListener("paste", t)
        }
        return {
            _init: function() {
                C.el.addEventListener("copy", e), C.el.addEventListener("cut", e), C.el.addEventListener("paste", t, {
                    capture: !0
                }), C.events.on("drop", r), C.browser.msie && C.browser.version < 11 && (C.events.on("mouseup", function(e) {
                    2 == e.button && (setTimeout(function() {
                        i = !1
                    }, 50), i = !0)
                }, !0), C.events.on("beforepaste", t)), C.events.on("dragstart", c, !0), C.events.on("destroy", f)
            },
            cleanEmptyTagsAndDivs: O,
            getRtfClipboard: function() {
                return a
            },
            saveCopiedText: n,
            clean: l
        }
    }, w.extend(w.FE.DEFAULTS, {
        shortcutsEnabled: [],
        shortcutsHint: !0
    }), w.FE.SHORTCUTS_MAP = {}, w.FE.RegisterShortcut = function(e, t, n, r, o, i) {
        w.FE.SHORTCUTS_MAP[(o ? "^" : "") + (i ? "@" : "") + e] = {
            cmd: t,
            val: n,
            letter: r,
            shift: o,
            option: i
        }, w.FE.DEFAULTS.shortcutsEnabled.push(t)
    }, w.FE.RegisterShortcut(w.FE.KEYCODE.E, "show", null, "E", !1, !1), w.FE.RegisterShortcut(w.FE.KEYCODE.B, "bold", null, "B", !1, !1), w.FE.RegisterShortcut(w.FE.KEYCODE.I, "italic", null, "I", !1, !1), w.FE.RegisterShortcut(w.FE.KEYCODE.U, "underline", null, "U", !1, !1), w.FE.RegisterShortcut(w.FE.KEYCODE.S, "strikeThrough", null, "S", !1, !1), w.FE.RegisterShortcut(w.FE.KEYCODE.CLOSE_SQUARE_BRACKET, "indent", null, "]", !1, !1), w.FE.RegisterShortcut(w.FE.KEYCODE.OPEN_SQUARE_BRACKET, "outdent", null, "[", !1, !1), w.FE.RegisterShortcut(w.FE.KEYCODE.Z, "undo", null, "Z", !1, !1), w.FE.RegisterShortcut(w.FE.KEYCODE.Z, "redo", null, "Z", !0, !1), w.FE.RegisterShortcut(w.FE.KEYCODE.Y, "redo", null, "Y", !1, !1), w.FE.MODULES.shortcuts = function(s) {
        var r = null;
        var l = !1;

        function e(e) {
            if (!s.core.hasFocus()) return !0;
            var t = e.which,
                n = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
            if ("keyup" == e.type && l && t != w.FE.KEYCODE.META) return l = !1;
            "keydown" == e.type && (l = !1);
            var r = (e.shiftKey ? "^" : "") + (e.altKey ? "@" : "") + t;
            if (n && w.FE.SHORTCUTS_MAP[r]) {
                var o = w.FE.SHORTCUTS_MAP[r].cmd;
                if (o && 0 <= s.opts.shortcutsEnabled.indexOf(o)) {
                    var i, a = w.FE.SHORTCUTS_MAP[r].val;
                    if (o && !a ? i = s.$tb.find('.fr-command[data-cmd="' + o + '"]') : o && a && (i = s.$tb.find('.fr-command[data-cmd="' + o + '"][data-param1="' + a + '"]')), i.length) return e.preventDefault(), e.stopPropagation(), i.parents(".fr-toolbar").data("instance", s), "keydown" == e.type && (s.button.exec(i), l = !0), !1;
                    if (o && (s.commands[o] || w.FE.COMMANDS[o] && w.FE.COMMANDS[o].callback)) return e.preventDefault(), e.stopPropagation(), "keydown" == e.type && ((s.commands[o] || w.FE.COMMANDS[o].callback)(), l = !0), !1
                }
            }
        }
        return {
            _init: function() {
                s.events.on("keydown", e, !0), s.events.on("keyup", e, !0)
            },
            get: function(e) {
                if (!s.opts.shortcutsHint) return null;
                if (!r)
                    for (var t in r = {}, w.FE.SHORTCUTS_MAP) w.FE.SHORTCUTS_MAP.hasOwnProperty(t) && 0 <= s.opts.shortcutsEnabled.indexOf(w.FE.SHORTCUTS_MAP[t].cmd) && (r[w.FE.SHORTCUTS_MAP[t].cmd + "." + (w.FE.SHORTCUTS_MAP[t].val || "")] = {
                        shift: w.FE.SHORTCUTS_MAP[t].shift,
                        option: w.FE.SHORTCUTS_MAP[t].option,
                        letter: w.FE.SHORTCUTS_MAP[t].letter
                    });
                var n = r[e];
                return n ? (s.helpers.isMac() ? String.fromCharCode(8984) : s.language.translate("Ctrl") + "+") + (n.shift ? s.helpers.isMac() ? String.fromCharCode(8679) : s.language.translate("Shift") + "+" : "") + (n.option ? s.helpers.isMac() ? String.fromCharCode(8997) : s.language.translate("Alt") + "+" : "") + n.letter : null
            }
        }
    }, w.FE.MODULES.snapshot = function(l) {
        function n(e) {
            for (var t = e.parentNode.childNodes, n = 0, r = null, o = 0; o < t.length; o++) {
                if (r) {
                    var i = t[o].nodeType === Node.TEXT_NODE && "" === t[o].textContent,
                        a = r.nodeType === Node.TEXT_NODE && t[o].nodeType === Node.TEXT_NODE,
                        s = r.nodeType === Node.TEXT_NODE && "" === r.textContent;
                    i || a || s || n++
                }
                if (t[o] == e) return n;
                r = t[o]
            }
        }

        function o(e) {
            var t = [];
            if (!e.parentNode) return [];
            for (; !l.node.isElement(e);) t.push(n(e)), e = e.parentNode;
            return t.reverse()
        }

        function i(e, t) {
            for (; e && e.nodeType === Node.TEXT_NODE;) {
                var n = e.previousSibling;
                n && n.nodeType == Node.TEXT_NODE && (t += n.textContent.length), e = n
            }
            return t
        }

        function d(e) {
            for (var t = l.el, n = 0; n < e.length; n++) t = t.childNodes[e[n]];
            return t
        }

        function r(e, t) {
            try {
                var n = d(t.scLoc),
                    r = t.scOffset,
                    o = d(t.ecLoc),
                    i = t.ecOffset,
                    a = l.doc.createRange();
                a.setStart(n, r), a.setEnd(o, i), e.addRange(a)
            } catch (s) {}
        }
        return {
            get: function() {
                var e, t = {};
                if (l.events.trigger("snapshot.before"), t.html = (l.$wp ? l.$el.html() : l.$oel.get(0).outerHTML).replace(/ style=""/g, ""), t.ranges = [], l.$wp && l.selection.inEditor() && l.core.hasFocus())
                    for (var n = l.selection.ranges(), r = 0; r < n.length; r++) t.ranges.push({
                        scLoc: o((e = n[r]).startContainer),
                        scOffset: i(e.startContainer, e.startOffset),
                        ecLoc: o(e.endContainer),
                        ecOffset: i(e.endContainer, e.endOffset)
                    });
                return l.events.trigger("snapshot.after", [t]), t
            },
            restore: function(e) {
                l.$el.html() != e.html && (l.opts.htmlExecuteScripts ? l.$el.html(e.html) : l.el.innerHTML = e.html);
                var t = l.selection.get();
                l.selection.clear(), l.events.focus(!0);
                for (var n = 0; n < e.ranges.length; n++) r(t, e.ranges[n])
            },
            equal: function(e, t) {
                return e.html == t.html && (!l.core.hasFocus() || JSON.stringify(e.ranges) == JSON.stringify(t.ranges))
            }
        }
    }, w.FE.MODULES.undo = function(n) {
        function e(e) {
            var t = e.which;
            n.keys.ctrlKey(e) && (90 == t && e.shiftKey && e.preventDefault(), 90 == t && e.preventDefault())
        }
        var t = null;

        function r() {
            if (!n.undo_stack || n.undoing) return !1;
            for (; n.undo_stack.length > n.undo_index;) n.undo_stack.pop()
        }

        function o() {
            t = (n.$wp ? n.$el.html() : n.$oel.get(0).outerHTML).replace(/ style=""/g, ""), n.undo_index = 0, n.undo_stack = []
        }

        function i() {
            n.undo_stack = []
        }
        return {
            _init: function() {
                o(), n.events.on("initialized", function() {
                    t = (n.$wp ? n.$el.html() : n.$oel.get(0).outerHTML).replace(/ style=""/g, "")
                }), n.events.on("blur", function() {
                    n.el.querySelector(".fr-dragging") || n.undo.saveStep()
                }), n.events.on("keydown", e), n.events.on("destroy", i)
            },
            run: function() {
                if (1 < n.undo_index) {
                    n.undoing = !0;
                    var e = n.undo_stack[--n.undo_index - 1];
                    clearTimeout(n._content_changed_timer), n.snapshot.restore(e), t = e.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.undo"), n.undoing = !1
                }
            },
            redo: function() {
                if (n.undo_index < n.undo_stack.length) {
                    n.undoing = !0;
                    var e = n.undo_stack[n.undo_index++];
                    clearTimeout(n._content_changed_timer), n.snapshot.restore(e), t = e.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.redo"), n.undoing = !1
                }
            },
            canDo: function() {
                return !(0 === n.undo_stack.length || n.undo_index <= 1)
            },
            canRedo: function() {
                return n.undo_index != n.undo_stack.length
            },
            dropRedo: r,
            reset: o,
            saveStep: function(e) {
                if (!n.undo_stack || n.undoing || n.el.querySelector(".fr-marker")) return !1;
                void 0 === e ? (e = n.snapshot.get(), n.undo_stack[n.undo_index - 1] && n.snapshot.equal(n.undo_stack[n.undo_index - 1], e) || (r(), n.undo_stack.push(e), n.undo_index++, e.html != t && (n.events.trigger("contentChanged"), t = e.html))) : (r(), 0 < n.undo_index ? n.undo_stack[n.undo_index - 1] = e : (n.undo_stack.push(e), n.undo_index++))
            }
        }
    }, w.FE.ICON_TEMPLATES = {
        font_awesome: '<i class="fa fa-[NAME]" aria-hidden="true"></i>',
        font_awesome_5: '<i class="fas fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5r: '<i class="far fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5l: '<i class="fal fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5b: '<i class="fab fa-[FA5NAME]" aria-hidden="true"></i>',
        text: '<span style="text-align: center;">[NAME]</span>',
        image: "<img src=[SRC] alt=[ALT] />",
        svg: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">[PATH]</svg>',
        empty: " "
    }, w.FE.ICONS = {
        bold: {
            NAME: "bold"
        },
        italic: {
            NAME: "italic"
        },
        underline: {
            NAME: "underline"
        },
        strikeThrough: {
            NAME: "strikethrough"
        },
        subscript: {
            NAME: "subscript"
        },
        superscript: {
            NAME: "superscript"
        },
        color: {
            NAME: "tint"
        },
        outdent: {
            NAME: "outdent"
        },
        indent: {
            NAME: "indent"
        },
        undo: {
            NAME: "rotate-left",
            FA5NAME: "undo"
        },
        redo: {
            NAME: "rotate-right",
            FA5NAME: "redo"
        },
        insertHR: {
            NAME: "minus"
        },
        clearFormatting: {
            NAME: "eraser"
        },
        selectAll: {
            NAME: "mouse-pointer"
        }
    }, w.FE.DefineIconTemplate = function(e, t) {
        w.FE.ICON_TEMPLATES[e] = t
    }, w.FE.DefineIcon = function(e, t) {
        w.FE.ICONS[e] = t
    }, w.extend(w.FE.DEFAULTS, {
        iconsTemplate: "font_awesome"
    }), w.FE.MODULES.icon = function(o) {
        return {
            create: function(n) {
                var e = null,
                    r = w.FE.ICONS[n];
                if (void 0 !== r) {
                    var t = r.template || w.FE.ICON_DEFAULT_TEMPLATE || o.opts.iconsTemplate;
                    t && t.apply && (t = t.apply(o)), r.FA5NAME || (r.FA5NAME = r.NAME), t && (t = w.FE.ICON_TEMPLATES[t]) && (e = t.replace(/\[([a-zA-Z0-9]*)\]/g, function(e, t) {
                        return "NAME" == t ? r[t] || n : r[t]
                    }))
                }
                return e || n
            },
            getTemplate: function(e) {
                var t = w.FE.ICONS[e],
                    n = o.opts.iconsTemplate;
                return void 0 !== t ? n = t.template || w.FE.ICON_DEFAULT_TEMPLATE || o.opts.iconsTemplate : n
            }
        }
    }, w.extend(w.FE.DEFAULTS, {
        tooltips: !0
    }), w.FE.MODULES.tooltip = function(o) {
        function r() {
            if (o.helpers.isMobile()) return !1;
            o.$tooltip && o.$tooltip.removeClass("fr-visible").css("left", "-3000px").css("position", "fixed")
        }

        function i(e, t) {
            if (o.helpers.isMobile()) return !1;
            if (e.data("title") || e.data("title", e.attr("title")), !e.data("title")) return !1;
            o.$tooltip || o.opts.tooltips && !o.helpers.isMobile() && (o.shared.$tooltip ? o.$tooltip = o.shared.$tooltip : (o.shared.$tooltip = w('<div class="fr-tooltip"></div>'), o.$tooltip = o.shared.$tooltip, o.opts.theme && o.$tooltip.addClass(o.opts.theme + "-theme"), w(o.o_doc).find("body:first").append(o.$tooltip)), o.events.on("shared.destroy", function() {
                o.$tooltip.html("").removeData().remove(), o.$tooltip = null
            }, !0)), e.removeAttr("title"), o.$tooltip.text(o.language.translate(e.data("title"))), o.$tooltip.addClass("fr-visible");
            var n = e.offset().left + (e.outerWidth() - o.$tooltip.outerWidth()) / 2;
            n < 0 && (n = 0), n + o.$tooltip.outerWidth() > w(o.o_win).width() && (n = w(o.o_win).width() - o.$tooltip.outerWidth()), void 0 === t && (t = o.opts.toolbarBottom), e.offset().top - w(window).scrollTop() + e.outerHeight() + 10 >= w(window).height() && (t = !0);
            var r = t ? e.offset().top - o.$tooltip.height() : e.offset().top + e.outerHeight();
            o.$tooltip.css("position", ""), o.$tooltip.css("left", n), o.$tooltip.css("top", Math.ceil(r)), "static" != w(o.o_doc).find("body:first").css("position") ? (o.$tooltip.css("margin-left", -w(o.o_doc).find("body:first").offset().left), o.$tooltip.css("margin-top", -w(o.o_doc).find("body:first").offset().top)) : (o.$tooltip.css("margin-left", ""), o.$tooltip.css("margin-top", ""))
        }
        return {
            hide: r,
            to: i,
            bind: function(e, t, n) {
                o.opts.tooltips && !o.helpers.isMobile() && (o.events.$on(e, "mouseenter", t, function(e) {
                    o.node.hasClass(e.currentTarget, "fr-disabled") || o.edit.isDisabled() || i(w(e.currentTarget), n)
                }, !0), o.events.$on(e, "mouseleave " + o._mousedown + " " + o._mouseup, t, function() {
                    r()
                }, !0))
            }
        }
    }, w.FE.MODULES.button = function(u) {
        var a = [];
        (u.opts.toolbarInline || u.opts.toolbarContainer) && (u.shared.buttons || (u.shared.buttons = []), a = u.shared.buttons);
        var s = [];

        function l(e, t, n) {
            for (var r = w(), o = 0; o < e.length; o++) {
                var i = w(e[o]);
                if (i.is(t) && (r = r.add(i)), n && i.is(".fr-dropdown")) {
                    var a = i.next().find(t);
                    r = r.add(a)
                }
            }
            return r
        }

        function d(e, t) {
            var n, r = w();
            if (!e) return r;
            for (n in r = (r = r.add(l(a, e, t))).add(l(s, e, t)), u.shared.popups)
                if (u.shared.popups.hasOwnProperty(n)) {
                    var o = u.shared.popups[n].children().find(e);
                    r = r.add(o)
                }
            for (n in u.shared.modals)
                if (u.shared.modals.hasOwnProperty(n)) {
                    var i = u.shared.modals[n].$modal.find(e);
                    r = r.add(i)
                }
            return r
        }

        function r(e) {
            e.addClass("fr-blink"), setTimeout(function() {
                e.removeClass("fr-blink")
            }, 500);
            for (var t = e.data("cmd"), n = []; void 0 !== e.data("param" + (n.length + 1));) n.push(e.data("param" + (n.length + 1)));
            var r = d(".fr-dropdown.fr-active");
            r.length && (r.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), r.prev(".fr-expanded").removeClass("fr-expanded"), r.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", "")), e.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(t, n)
        }

        function t(e) {
            var t = e.parents(".fr-popup, .fr-toolbar").data("instance");
            if (0 !== e.parents(".fr-popup").length || e.data("popup") || t.popups.hideAll(), t.popups.areVisible() && !t.popups.areVisible(t)) {
                for (var n = 0; n < w.FE.INSTANCES.length; n++) w.FE.INSTANCES[n] != t && w.FE.INSTANCES[n].popups && w.FE.INSTANCES[n].popups.areVisible() && w.FE.INSTANCES[n].$el.find(".fr-marker").remove();
                t.popups.hideAll()
            }
            u.node.hasClass(e.get(0), "fr-dropdown") ? function(e) {
                var t = e.next(),
                    n = u.node.hasClass(e.get(0), "fr-active"),
                    r = d(".fr-dropdown.fr-active").not(e),
                    o = e.parents(".fr-toolbar, .fr-popup").data("instance") || u;
                if (o.helpers.isIOS() && !o.el.querySelector(".fr-marker") && (o.selection.save(), o.selection.clear(), o.selection.restore()), !n) {
                    var i = e.data("cmd");
                    t.find(".fr-command").removeClass("fr-active").attr("aria-selected", !1), w.FE.COMMANDS[i] && w.FE.COMMANDS[i].refreshOnShow && w.FE.COMMANDS[i].refreshOnShow.apply(o, [e, t]), t.css("left", e.offset().left - e.parent().offset().left - ("rtl" == u.opts.direction ? t.width() - e.outerWidth() : 0)), t.addClass("test-height");
                    var a = t.outerHeight();
                    t.removeClass("test-height"), t.css("top", "").css("bottom", ""), !u.opts.toolbarBottom && t.offset().top + e.outerHeight() + a < w(u.o_doc).height() ? t.css("top", e.position().top + e.outerHeight()) : t.css("bottom", e.parents(".fr-popup, .fr-toolbar").first().height() - e.position().top)
                }
                e.addClass("fr-blink").toggleClass("fr-active"), e.hasClass("fr-options") && e.prev().toggleClass("fr-expanded"), e.hasClass("fr-active") ? (t.attr("aria-hidden", !1), e.attr("aria-expanded", !0)) : (t.attr("aria-hidden", !0), e.attr("aria-expanded", !1)), setTimeout(function() {
                    e.removeClass("fr-blink")
                }, 300), t.css("margin-left", ""), t.offset().left + t.outerWidth() > u.$sc.offset().left + u.$sc.width() && t.css("margin-left", -(t.offset().left + t.outerWidth() - u.$sc.offset().left - u.$sc.width())), t.offset().left < u.$sc.offset().left && "rtl" == u.opts.direction && t.css("margin-left", u.$sc.offset().left), r.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), r.prev(".fr-expanded").removeClass("fr-expanded"), r.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), 0 !== e.parents(".fr-popup").length || u.opts.toolbarInline || (u.node.hasClass(e.get(0), "fr-active") ? u.$tb.css("zIndex", (u.opts.zIndex || 1) + 4) : u.$tb.css("zIndex", ""));
                var s = t.find("a.fr-command.fr-active:first");
                u.helpers.isMobile() || (s.length ? u.accessibility.focusToolbarElement(s) : u.accessibility.focusToolbarElement(e))
            }(e) : (r(e), w.FE.COMMANDS[e.data("cmd")] && !1 !== w.FE.COMMANDS[e.data("cmd")].refreshAfterCallback && t.button.bulkRefresh())
        }

        function i(e) {
            t(w(e.currentTarget))
        }

        function c(e) {
            var t = e.find(".fr-dropdown.fr-active");
            t.length && (t.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), t.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), t.prev().removeClass("fr-expanded"))
        }

        function f(e) {
            e.preventDefault(), e.stopPropagation()
        }

        function p(e) {
            if (e.stopPropagation(), !u.helpers.isMobile()) return !1
        }

        function g(e, t, n) {
            if (t = w.extend(!0, {}, t), u.helpers.isMobile() && !1 === t.showOnMobile) return "";
            var r = t.displaySelection;
            "function" == typeof r && (r = r(u));
            var o = "";
            if ("options" !== t.type)
                if (r) {
                    var i = "function" == typeof t.defaultSelection ? t.defaultSelection(u) : t.defaultSelection;
                    o = '<span style="width:' + (t.displaySelectionWidth || 100) + 'px">' + u.language.translate(i || t.title) + "</span>"
                } else o = u.icon.create(t.icon || e), o += '<span class="fr-sr-only">' + (u.language.translate(t.title) || "") + "</span>";
            var a = t.popup ? ' data-popup="true"' : "",
                s = t.modal ? ' data-modal="true"' : "",
                l = u.shortcuts.get(e + ".");
            l = l ? " (" + l + ")" : "";
            var d = e + "-" + u.id,
                c = "dropdown-menu-" + d,
                f = '<button id="' + d + '"type="button" tabIndex="-1" role="button"' + (t.toggle ? ' aria-pressed="false"' : "") + ("dropdown" == t.type || "options" == t.type ? ' aria-controls="' + c + '" aria-expanded="false" aria-haspopup="true"' : "") + (t.disabled ? ' aria-disabled="true"' : "") + ' title="' + (u.language.translate(t.title) || "") + l + '" class="fr-command fr-btn' + ("dropdown" == t.type || "options" == t.type ? " fr-dropdown" : "") + ("options" == t.type ? " fr-options" : "") + " fr-btn-" + u.icon.getTemplate(t.icon) + (t.displaySelection ? " fr-selection" : "") + (t.back ? " fr-back" : "") + (t.disabled ? " fr-disabled" : "") + (n ? "" : " fr-hidden") + '" data-cmd="' + e + '"' + a + s + ">" + o + "</button>";
            if ("dropdown" == t.type || "options" == t.type) {
                var p = '<div id="' + c + '" class="fr-dropdown-menu" role="listbox" aria-labelledby="' + d + '" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">';
                p += function(e, t) {
                    var n = "";
                    if (t.html) "function" == typeof t.html ? n += t.html.call(u) : n += t.html;
                    else {
                        var r = t.options;
                        for (var o in "function" == typeof r && (r = r()), n += '<ul class="fr-dropdown-list" role="presentation">', r)
                            if (r.hasOwnProperty(o)) {
                                var i = u.shortcuts.get(e + "." + o);
                                i = i ? '<span class="fr-shortcut">' + i + "</span>" : "", n += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="' + ("options" === t.type ? e.replace(/Options/g, "") : e) + '" data-param1="' + o + '" title="' + r[o] + '">' + u.language.translate(r[o]) + "</a></li>"
                            }
                        n += "</ul>"
                    }
                    return n
                }(e, t), f += p += "</div></div></div>"
            }
            return t.hasOptions && t.hasOptions.apply(u) && (t.type = "options", t.hasOptions = !1, f = '<div class="fr-btn-wrap">' + f + g(e + "Options", t, n) + "</div>"), f
        }

        function e(o) {
            var i = u.$tb && u.$tb.data("instance") || u;
            if (!1 === u.events.trigger("buttons.refresh")) return !0;
            setTimeout(function() {
                for (var e = i.selection.inEditor() && i.core.hasFocus(), t = 0; t < o.length; t++) {
                    var n = w(o[t]),
                        r = n.data("cmd");
                    0 === n.parents(".fr-popup").length ? e || w.FE.COMMANDS[r] && w.FE.COMMANDS[r].forcedRefresh ? i.button.refresh(n) : u.node.hasClass(n.get(0), "fr-dropdown") || (n.removeClass("fr-active"), n.attr("aria-pressed") && n.attr("aria-pressed", !1)) : n.parents(".fr-popup").is(":visible") && i.button.refresh(n)
                }
            }, 0)
        }

        function n() {
            e(a), e(s)
        }

        function o() {
            a = [], s = []
        }
        u.shared.popup_buttons || (u.shared.popup_buttons = []), s = u.shared.popup_buttons;
        var h = null;

        function m() {
            clearTimeout(h), h = setTimeout(n, 50)
        }
        return {
            _init: function() {
                u.opts.toolbarInline ? u.events.on("toolbar.show", n) : (u.events.on("mouseup", m), u.events.on("keyup", m), u.events.on("blur", m), u.events.on("focus", m), u.events.on("contentChanged", m), u.helpers.isMobile() && u.events.$on(u.$doc, "selectionchange", n)), u.events.on("shared.destroy", o)
            },
            buildList: function(e, t) {
                for (var n = "", r = 0; r < e.length; r++) {
                    var o = e[r],
                        i = w.FE.COMMANDS[o];
                    i && "undefined" != typeof i.plugin && u.opts.pluginsEnabled.indexOf(i.plugin) < 0 || (i ? n += g(o, i, void 0 === t || 0 <= t.indexOf(o)) : "|" == o ? n += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" == o && (n += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>'))
                }
                return n
            },
            bindCommands: function(t, e) {
                u.events.bindClick(t, ".fr-command:not(.fr-disabled)", i), u.events.$on(t, u._mousedown + " " + u._mouseup + " " + u._move, ".fr-dropdown-menu", f, !0), u.events.$on(t, u._mousedown + " " + u._mouseup + " " + u._move, ".fr-dropdown-menu .fr-dropdown-wrapper", p, !0);
                var n = t.get(0).ownerDocument,
                    r = "defaultView" in n ? n.defaultView : n.parentWindow,
                    o = function(e) {
                        (!e || e.type == u._mouseup && e.target != w("html").get(0) || "keydown" == e.type && (u.keys.isCharacter(e.which) && !u.keys.ctrlKey(e) || e.which == w.FE.KEYCODE.ESC)) && c(t)
                    };
                u.events.$on(w(r), u._mouseup + " resize keydown", o, !0), u.opts.iframe && u.events.$on(u.$win, u._mouseup, o, !0), u.node.hasClass(t.get(0), "fr-popup") ? w.merge(s, t.find(".fr-btn").toArray()) : w.merge(a, t.find(".fr-btn").toArray()), u.tooltip.bind(t, ".fr-btn, .fr-title", e)
            },
            refresh: function(e) {
                var t, n = e.parents(".fr-popup, .fr-toolbar").data("instance") || u,
                    r = e.data("cmd");
                u.node.hasClass(e.get(0), "fr-dropdown") ? t = e.next() : (e.removeClass("fr-active"), e.attr("aria-pressed") && e.attr("aria-pressed", !1)), w.FE.COMMANDS[r] && w.FE.COMMANDS[r].refresh ? w.FE.COMMANDS[r].refresh.apply(n, [e, t]) : u.refresh[r] && n.refresh[r](e, t)
            },
            bulkRefresh: n,
            exec: r,
            click: t,
            hideActiveDropdowns: c,
            getButtons: d
        }
    }, w.FE.MODULES.modals = function(l) {
        l.shared.modals || (l.shared.modals = {});
        var s, d = l.shared.modals;

        function e() {
            for (var e in d) {
                var t = d[e];
                t && t.$modal && t.$modal.removeData().remove()
            }
            s && s.removeData().remove(), d = {}
        }

        function c(e, t) {
            if (d[e]) {
                var n = d[e].$modal,
                    r = n.data("instance") || l;
                r.events.enableBlur(), n.hide(), s.hide(), w(r.o_doc).find("body:first").removeClass("prevent-scroll fr-mobile"), n.removeClass("fr-active"), t || (r.accessibility.restoreSelection(), r.events.trigger("modals.hide"))
            }
        }

        function n(e) {
            var t;
            if ("string" == typeof e) {
                if (!d[e]) return;
                t = d[e].$modal
            } else t = e;
            return t && l.node.hasClass(t, "fr-active") && l.core.sameInstance(t) || !1
        }
        return {
            _init: function() {
                l.events.on("shared.destroy", e, !0)
            },
            get: function(e) {
                return d[e]
            },
            create: function(n, e, t) {
                if (l.shared.$overlay || (l.shared.$overlay = w('<div class="fr-overlay">').appendTo("body:first")), s = l.shared.$overlay, l.opts.theme && s.addClass(l.opts.theme + "-theme"), !d[n]) {
                    var r = (o = e, i = t, a = '<div tabIndex="-1" class="fr-modal' + (l.opts.theme ? " " + l.opts.theme + "-theme" : "") + '"><div class="fr-modal-wrapper">', a += '<div class="fr-modal-head">' + o + '<span title="' + l.language.translate("Cancel") + '" class="fr-modal-close">&times;</span></div>', a += '<div tabIndex="-1" class="fr-modal-body">' + i + "</div>", w(a += "</div></div>"));
                    d[n] = {
                        $modal: r,
                        $head: r.find(".fr-modal-head"),
                        $body: r.find(".fr-modal-body")
                    }, l.helpers.isMobile() || r.addClass("fr-desktop"), r.appendTo("body:first"), l.events.$on(r, "click", ".fr-modal-close", function() {
                        c(n)
                    }, !0), d[n].$body.css("margin-top", d[n].$head.outerHeight()), l.events.$on(r, "keydown", function(e) {
                        var t = e.which;
                        return t == w.FE.KEYCODE.ESC ? (c(n), l.accessibility.focusModalButton(r), !1) : !(!w(e.target).is("input[type=text], textarea") && t != w.FE.KEYCODE.ARROW_UP && t != w.FE.KEYCODE.ARROW_DOWN && !l.keys.isBrowserAction(e) && (e.preventDefault(), e.stopPropagation(), 1))
                    }, !0), c(n, !0)
                }
                var o, i, a;
                return d[n]
            },
            show: function(e) {
                if (d[e]) {
                    var t = d[e].$modal;
                    t.data("instance", l), t.show(), s.show(), w(l.o_doc).find("body:first").addClass("prevent-scroll"), l.helpers.isMobile() && w(l.o_doc).find("body:first").addClass("fr-mobile"), t.addClass("fr-active"), l.accessibility.focusModal(t)
                }
            },
            hide: c,
            resize: function(e) {
                if (d[e]) {
                    var t = d[e],
                        n = t.$modal,
                        r = t.$body,
                        o = w(l.o_win).height(),
                        i = n.find(".fr-modal-wrapper"),
                        a = o - i.outerHeight(!0) + (i.height() - (r.outerHeight(!0) - r.height())),
                        s = "auto";
                    a < r.get(0).scrollHeight && (s = a), r.height(s)
                }
            },
            isVisible: n,
            areVisible: function(e) {
                for (var t in d)
                    if (d.hasOwnProperty(t) && n(t) && (void 0 === e || d[t].$modal.data("instance") == e)) return d[t].$modal;
                return !1
            }
        }
    }, w.FE.POPUP_TEMPLATES = {
        "text.edit": "[_EDIT_]"
    }, w.FE.RegisterTemplate = function(e, t) {
        w.FE.POPUP_TEMPLATES[e] = t
    }, w.FE.MODULES.popups = function(c) {
        c.shared.popups || (c.shared.popups = {});
        var f = c.shared.popups;

        function p(e, t) {
            t.is(":visible") || (t = c.$sc), t.is(f[e].data("container")) || (f[e].data("container", t), t.append(f[e]))
        }

        function u(e) {
            return f[e] && c.node.hasClass(f[e], "fr-active") && c.core.sameInstance(f[e]) || !1
        }

        function g(e) {
            for (var t in f)
                if (f.hasOwnProperty(t) && u(t) && (void 0 === e || f[t].data("instance") == e)) return f[t];
            return !1
        }

        function n(e) {
            var t = null;
            (t = "string" != typeof e ? e : f[e]) && c.node.hasClass(t, "fr-active") && (t.removeClass("fr-active fr-above"), c.events.trigger("popups.hide." + e), c.$tb && (1 < c.opts.zIndex ? c.$tb.css("zIndex", c.opts.zIndex + 1) : c.$tb.css("zIndex", "")), c.events.disableBlur(), t.find("input, textarea, button").filter(":focus").blur(), t.find("input, textarea").attr("disabled", "disabled"))
        }

        function h(e) {
            for (var t in void 0 === e && (e = []), f) f.hasOwnProperty(t) && e.indexOf(t) < 0 && n(t)
        }

        function t() {
            c.shared.exit_flag = !0
        }

        function m() {
            c.shared.exit_flag = !1
        }

        function i() {
            return c.shared.exit_flag
        }

        function o(e, t) {
            var n, r, o = function(e, t) {
                var n = w.FE.POPUP_TEMPLATES[e];
                if (!n) return null;
                for (var r in "function" == typeof n && (n = n.apply(c)), t) t.hasOwnProperty(r) && (n = n.replace("[_" + r.toUpperCase() + "_]", t[r]));
                return n
            }(e, t);
            return o ? (n = w('<div class="fr-popup' + (c.helpers.isMobile() ? " fr-mobile" : " fr-desktop") + (c.opts.toolbarInline ? " fr-inline" : "") + '"><span class="fr-arrow"></span>' + o + "</div>"), c.opts.theme && n.addClass(c.opts.theme + "-theme"), 1 < c.opts.zIndex && (c.opts.editInPopup ? n.css("z-index", c.opts.zIndex + 2) : c.$tb.css("z-index", c.opts.zIndex + 2)), "auto" != c.opts.direction && n.removeClass("fr-ltr fr-rtl").addClass("fr-" + c.opts.direction), n.find("input, textarea").attr("dir", c.opts.direction).attr("disabled", "disabled"), (r = w("body:first")).append(n), n.data("container", r), f[e] = n, c.button.bindCommands(n, !1), n) : (n = w('<div class="fr-popup fr-empty"></div>'), (r = w("body:first")).append(n), n.data("container", r), f[e] = n)
        }

        function E(r) {
            var o = f[r];
            return {
                _windowResize: function() {
                    var e = o.data("instance") || c;
                    !e.helpers.isMobile() && o.is(":visible") && (e.events.disableBlur(), e.popups.hide(r), e.events.enableBlur())
                },
                _inputFocus: function(e) {
                    var t = o.data("instance") || c,
                        n = w(e.currentTarget);
                    if (n.is("input:file") && n.closest(".fr-layer").addClass("fr-input-focus"), e.preventDefault(), e.stopPropagation(), setTimeout(function() {
                            t.events.enableBlur()
                        }, c.browser.msie ? 100 : 0), t.helpers.isMobile()) {
                        var r = w(t.o_win).scrollTop();
                        setTimeout(function() {
                            w(t.o_win).scrollTop(r)
                        }, 0)
                    }
                },
                _inputBlur: function(e) {
                    var t = o.data("instance") || c,
                        n = w(e.currentTarget);
                    n.is("input:file") && n.closest(".fr-layer").removeClass("fr-input-focus"), document.activeElement != this && w(this).is(":visible") && (t.events.blurActive() && t.events.trigger("blur"), t.events.enableBlur())
                },
                _editorKeydown: function(e) {
                    var t = o.data("instance") || c;
                    t.keys.ctrlKey(e) || e.which == w.FE.KEYCODE.ALT || e.which == w.FE.KEYCODE.ESC || (u(r) && o.find(".fr-back:visible").length ? t.button.exec(o.find(".fr-back:visible:first")) : e.which != w.FE.KEYCODE.ALT && t.popups.hide(r))
                },
                _preventFocus: function(e) {
                    var t = o.data("instance") || c,
                        n = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
                    "mouseup" == e.type || w(n).is(":focus") || t.events.disableBlur(), "mouseup" != e.type || w(n).hasClass("fr-command") || 0 < w(n).parents(".fr-command").length || w(n).hasClass("fr-dropdown-content") || c.button.hideActiveDropdowns(o), (c.browser.safari || c.browser.mozilla) && "mousedown" == e.type && w(n).is("input[type=file]") && t.events.disableBlur();
                    var r = "input, textarea, button, select, label, .fr-command";
                    if (n && !w(n).is(r) && 0 === w(n).parents(r).length) return e.stopPropagation(), !1;
                    n && w(n).is(r) && e.stopPropagation(), m()
                },
                _editorMouseup: function() {
                    o.is(":visible") && i() && 0 < o.find("input:focus, textarea:focus, button:focus, select:focus").filter(":visible").length && c.events.disableBlur()
                },
                _windowMouseup: function(e) {
                    if (!c.core.sameInstance(o)) return !0;
                    var t = o.data("instance") || c;
                    o.is(":visible") && i() && (e.stopPropagation(), t.markers.remove(), t.popups.hide(r), m())
                },
                _windowKeydown: function(e) {
                    if (!c.core.sameInstance(o)) return !0;
                    var t = o.data("instance") || c,
                        n = e.which;
                    if (w.FE.KEYCODE.ESC == n) {
                        if (t.popups.isVisible(r) && t.opts.toolbarInline) return e.stopPropagation(), t.popups.isVisible(r) && (o.find(".fr-back:visible").length ? (t.button.exec(o.find(".fr-back:visible:first")), t.accessibility.focusPopupButton(o)) : o.find(".fr-dismiss:visible").length ? t.button.exec(o.find(".fr-dismiss:visible:first")) : (t.popups.hide(r), t.toolbar.showInline(null, !0), t.accessibility.focusPopupButton(o))), !1;
                        if (t.popups.isVisible(r)) return o.find(".fr-back:visible").length ? (t.button.exec(o.find(".fr-back:visible:first")), t.accessibility.focusPopupButton(o)) : o.find(".fr-dismiss:visible").length ? t.button.exec(o.find(".fr-dismiss:visible:first")) : (t.popups.hide(r), t.accessibility.focusPopupButton(o)), !1
                    }
                },
                _doPlaceholder: function() {
                    0 === w(this).next().length && w(this).attr("placeholder") && w(this).after('<label for="' + w(this).attr("id") + '">' + w(this).attr("placeholder") + "</label>"), w(this).toggleClass("fr-not-empty", "" !== w(this).val())
                },
                _repositionPopup: function() {
                    if (!c.opts.height && !c.opts.heightMax || c.opts.toolbarInline) return !0;
                    if (c.$wp && u(r) && o.parent().get(0) == c.$sc.get(0)) {
                        var e = o.offset().top - c.$wp.offset().top,
                            t = c.$wp.outerHeight();
                        c.node.hasClass(o.get(0), "fr-above") && (e += o.outerHeight()), t < e || e < 0 ? o.addClass("fr-hidden") : o.removeClass("fr-hidden")
                    }
                }
            }
        }

        function a(e, t) {
            c.events.on("mouseup", e._editorMouseup, !0), c.$wp && c.events.on("keydown", e._editorKeydown), c.events.on("blur", function() {
                g() && c.markers.remove(), h()
            }), c.$wp && !c.helpers.isMobile() && c.events.$on(c.$wp, "scroll.popup" + t, e._repositionPopup), c.events.on("window.mouseup", e._windowMouseup, !0), c.events.on("window.keydown", e._windowKeydown, !0), f[t].data("inst" + c.id, !0), c.events.on("destroy", function() {
                c.core.sameInstance(f[t]) && f[t].removeClass("fr-active").appendTo("body:first")
            }, !0)
        }

        function e() {
            for (var e in f)
                if (f.hasOwnProperty(e)) {
                    var t = f[e];
                    t && (t.html("").removeData().remove(), f[e] = null)
                }
            f = []
        }
        return c.shared.exit_flag = !1, {
            _init: function() {
                c.events.on("shared.destroy", e, !0), c.events.on("window.mousedown", t), c.events.on("window.touchmove", m), c.events.$on(w(c.o_win), "scroll", m), c.events.on("mousedown", function(e) {
                    g() && (e.stopPropagation(), c.$el.find(".fr-marker").remove(), t(), c.events.disableBlur())
                })
            },
            create: function(e, t) {
                var n = o(e, t),
                    r = E(e);
                return a(r, e), c.events.$on(n, "mousedown mouseup touchstart touchend touch", "*", r._preventFocus, !0), c.events.$on(n, "focus", "input, textarea, button, select", r._inputFocus, !0), c.events.$on(n, "blur", "input, textarea, button, select", r._inputBlur, !0), c.accessibility.registerPopup(e), c.events.$on(n, "keydown keyup change input", "input, textarea", r._doPlaceholder, !0), c.helpers.isIOS() && c.events.$on(n, "touchend", "label", function() {
                    w("#" + w(this).attr("for")).prop("checked", function(e, t) {
                        return !t
                    })
                }, !0), c.events.$on(w(c.o_win), "resize", r._windowResize, !0), n
            },
            get: function(e) {
                var t = f[e];
                return t && !t.data("inst" + c.id) && a(E(e), e), t
            },
            show: function(e, t, n, r) {
                if (u(e) || (g() && 0 < c.$el.find(".fr-marker").length ? (c.events.disableBlur(), c.selection.restore()) : g() || (c.events.disableBlur(), c.events.focus(), c.events.enableBlur())), h([e]), !f[e]) return !1;
                var o = c.button.getButtons(".fr-dropdown.fr-active");
                o.removeClass("fr-active").attr("aria-expanded", !1).parent(".fr-toolbar").css("zIndex", ""), o.next().attr("aria-hidden", !0), f[e].data("instance", c), c.$tb && c.$tb.data("instance", c);
                var i = f[e].outerWidth(),
                    a = u(e);
                f[e].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");
                var s, l, d = f[e].data("container");
                s = e, (l = d).is(":visible") || (l = c.$sc), 0 === l.find([f[s]]).length && l.append(f[s]), c.opts.toolbarInline && d && c.$tb && d.get(0) == c.$tb.get(0) && (p(e, c.$sc), n = c.$tb.offset().top - c.helpers.getPX(c.$tb.css("margin-top")), t = c.$tb.offset().left + c.$tb.outerWidth() / 2 + (parseFloat(c.$tb.find(".fr-arrow").css("margin-left")) || 0) + c.$tb.find(".fr-arrow").outerWidth() / 2, c.node.hasClass(c.$tb.get(0), "fr-above") && n && (n += c.$tb.outerHeight()), r = 0), d = f[e].data("container"), !c.opts.iframe || r || a || (t && (t -= c.$iframe.offset().left), n && (n -= c.$iframe.offset().top)), d.is(c.$tb) ? c.$tb.css("zIndex", (c.opts.zIndex || 1) + 4) : f[e].css("zIndex", (c.opts.zIndex || 1) + 4), t && (t -= i / 2), c.opts.toolbarBottom && d && c.$tb && d.get(0) == c.$tb.get(0) && (f[e].addClass("fr-above"), n && (n -= f[e].outerHeight())), f[e].removeClass("fr-active"), c.position.at(t, n, f[e], r || 0), f[e].addClass("fr-active"), a || c.accessibility.focusPopup(f[e]), c.opts.toolbarInline && c.toolbar.hide(), c.events.trigger("popups.show." + e), E(e)._repositionPopup(), m()
            },
            hide: n,
            onHide: function(e, t) {
                c.events.on("popups.hide." + e, t)
            },
            hideAll: h,
            setContainer: p,
            refresh: function(e) {
                f[e].data("instance", c), c.events.trigger("popups.refresh." + e);
                for (var t = f[e].find(".fr-command"), n = 0; n < t.length; n++) {
                    var r = w(t[n]);
                    0 === r.parents(".fr-dropdown-menu").length && c.button.refresh(r)
                }
            },
            onRefresh: function(e, t) {
                c.events.on("popups.refresh." + e, t)
            },
            onShow: function(e, t) {
                c.events.on("popups.show." + e, t)
            },
            isVisible: u,
            areVisible: g
        }
    }, w.FE.MODULES.position = function(v) {
        function o() {
            var e = v.selection.ranges(0).getBoundingClientRect();
            if (0 === e.top && 0 === e.left && 0 === e.width || 0 === e.height) {
                var t = !1;
                0 === v.$el.find(".fr-marker").length && (v.selection.save(), t = !0);
                var n = v.$el.find(".fr-marker:first");
                n.css("display", "inline"), n.css("line-height", "");
                var r = n.offset(),
                    o = n.outerHeight();
                n.css("display", "none"), n.css("line-height", 0), (e = {}).left = r.left, e.width = 0, e.height = o, e.top = r.top - (v.opts.iframe ? 0 : v.helpers.scrollTop()), e.right = 1, e.bottom = 1, e.ok = !0, t && v.selection.restore()
            }
            return e
        }

        function i(e, t, n, r) {
            var o = n.data("container");
            !o || "BODY" === o.get(0).tagName && "static" == o.css("position") || (e && (e -= o.offset().left), t && (t -= o.offset().top), "BODY" != o.get(0).tagName ? (e && (e += o.get(0).scrollLeft), t && (t += o.get(0).scrollTop)) : "absolute" == o.css("position") && (e && (e += o.position().left), t && (t += o.position().top))), v.opts.iframe && o && v.$tb && o.get(0) != v.$tb.get(0) && (e && (e += v.$iframe.offset().left), t && (t += v.$iframe.offset().top));
            var i, a, s, l, d = (a = e, s = (i = n).outerWidth(!0), l = i.parent().offset().left, i.parent().get(0) == v.$sc.get(0) && (l -= i.parent().position().left), l + a + s > v.$sc.get(0).clientWidth - 10 && (a = v.$sc.get(0).clientWidth - s - l - 10), a < 0 && (a = 10), a);
            if (e) {
                n.css("left", d);
                var c = n.data("fr-arrow");
                c || (c = n.find(".fr-arrow"), n.data("fr-arrow", c)), c.data("margin-left") || c.data("margin-left", v.helpers.getPX(c.css("margin-left"))), c.css("margin-left", e - d + c.data("margin-left"))
            }
            t && n.css("top", function(e, t, n) {
                var r = e.outerHeight(!0);
                if (!v.helpers.isMobile() && v.$tb && e.parent().get(0) != v.$tb.get(0)) {
                    var o = e.parent().offset().top,
                        i = t - r - (n || 0);
                    e.parent().get(0) == v.$sc.get(0) && (o -= e.parent().position().top);
                    var a = v.$sc.get(0).clientHeight;
                    o + t + r > v.$sc.offset().top + a && 0 < e.parent().offset().top + i && 0 < i ? i > v.$wp.scrollTop() && (t = i, e.addClass("fr-above")) : e.removeClass("fr-above")
                }
                return t
            }(n, t, r))
        }

        function n(e) {
            var n = w(e),
                t = n.is(".fr-sticky-on"),
                r = n.data("sticky-top"),
                o = n.data("sticky-scheduled");
            if (void 0 === r) {
                n.data("sticky-top", 0);
                var i = w('<div class="fr-sticky-dummy" style="height: ' + n.outerHeight() + 'px;"></div>');
                v.$box.prepend(i)
            } else v.$box.find(".fr-sticky-dummy").css("height", n.outerHeight());
            if (v.core.hasFocus() || 0 < v.$tb.find("input:visible:focus").length) {
                var a = v.helpers.scrollTop(),
                    s = Math.min(Math.max(a - v.$tb.parent().offset().top, 0), v.$tb.parent().outerHeight() - n.outerHeight());
                s != r && s != o && (clearTimeout(n.data("sticky-timeout")), n.data("sticky-scheduled", s), n.outerHeight() < a - v.$tb.parent().offset().top && n.addClass("fr-opacity-0"), n.data("sticky-timeout", setTimeout(function() {
                    var e = v.helpers.scrollTop(),
                        t = Math.min(Math.max(e - v.$tb.parent().offset().top, 0), v.$tb.parent().outerHeight() - n.outerHeight());
                    0 < t && "BODY" == v.$tb.parent().get(0).tagName && (t += v.$tb.parent().position().top), t != r && (n.css("top", Math.max(t, 0)), n.data("sticky-top", t), n.data("sticky-scheduled", t)), n.removeClass("fr-opacity-0")
                }, 100))), t || (n.css("top", "0"), n.width(v.$tb.parent().width()), n.addClass("fr-sticky-on"), v.$box.addClass("fr-sticky-box"))
            } else clearTimeout(w(e).css("sticky-timeout")), n.css("top", "0"), n.css("position", ""), n.width(""), n.data("sticky-top", 0), n.removeClass("fr-sticky-on"), v.$box.removeClass("fr-sticky-box")
        }

        function t(e) {
            if (e.offsetWidth) {
                var t, n, r = w(e),
                    o = r.outerHeight(),
                    i = r.data("sticky-top"),
                    a = r.data("sticky-position"),
                    s = w("body" == v.opts.scrollableContainer ? v.o_win : v.opts.scrollableContainer).outerHeight(),
                    l = 0,
                    d = 0;
                "body" !== v.opts.scrollableContainer && (l = v.$sc.offset().top, d = w(v.o_win).outerHeight() - l - s);
                var c = "body" == v.opts.scrollableContainer ? v.helpers.scrollTop() : l,
                    f = r.is(".fr-sticky-on");
                r.data("sticky-parent") || r.data("sticky-parent", r.parent());
                var p = r.data("sticky-parent"),
                    u = p.offset().top,
                    g = p.outerHeight();
                if (r.data("sticky-offset") || void 0 !== i ? v.$box.find(".fr-sticky-dummy").css("height", o + "px") : (r.data("sticky-offset", !0), r.after('<div class="fr-sticky-dummy" style="height: ' + o + 'px;"></div>')), !a) {
                    var h = "auto" !== r.css("top") || "auto" !== r.css("bottom");
                    h || r.css("position", "fixed"), a = {
                        top: v.node.hasClass(r.get(0), "fr-top"),
                        bottom: v.node.hasClass(r.get(0), "fr-bottom")
                    }, h || r.css("position", ""), r.data("sticky-position", a), r.data("top", v.node.hasClass(r.get(0), "fr-top") ? r.css("top") : "auto"), r.data("bottom", v.node.hasClass(r.get(0), "fr-bottom") ? r.css("bottom") : "auto")
                }
                t = v.helpers.getPX(r.data("top")), n = v.helpers.getPX(r.data("bottom"));
                var m = a.top && u < c + t && c + t <= u + g - o && (v.helpers.isInViewPort(v.$sc.get(0)) || "body" == v.opts.scrollableContainer),
                    E = a.bottom && u + o < c + s - n && c + s - n < u + g;
                m || E ? (r.css("width", p.get(0).getBoundingClientRect().width + "px"), f || (r.addClass("fr-sticky-on"), r.removeClass("fr-sticky-off"), r.css("top") && ("auto" != r.data("top") ? r.css("top", v.helpers.getPX(r.data("top")) + l) : r.data("top", "auto")), r.css("bottom") && ("auto" != r.data("bottom") ? r.css("bottom", v.helpers.getPX(r.data("bottom")) + d) : r.css("bottom", "auto")))) : v.node.hasClass(r.get(0), "fr-sticky-off") || (r.width(""), r.removeClass("fr-sticky-on"), r.addClass("fr-sticky-off"), r.css("top") && "auto" != r.data("top") && a.top && r.css("top", 0), r.css("bottom") && "auto" != r.data("bottom") && a.bottom && r.css("bottom", 0))
            }
        }

        function e() {
            if (v._stickyElements)
                for (var e = 0; e < v._stickyElements.length; e++) t(v._stickyElements[e])
        }
        return {
            _init: function() {
                ! function() {
                    if (v._stickyElements = [], v.helpers.isIOS()) {
                        var t = function() {
                            if (v.helpers.requestAnimationFrame()(t), !1 !== v.events.trigger("position.refresh"))
                                for (var e = 0; e < v._stickyElements.length; e++) n(v._stickyElements[e])
                        };
                        t(), v.events.$on(w(v.o_win), "scroll", function() {
                            if (v.core.hasFocus())
                                for (var e = 0; e < v._stickyElements.length; e++) {
                                    var t = w(v._stickyElements[e]),
                                        n = t.parent(),
                                        r = v.helpers.scrollTop();
                                    t.outerHeight() < r - n.offset().top && (t.addClass("fr-opacity-0"), t.data("sticky-top", -1), t.data("sticky-scheduled", -1))
                                }
                        }, !0)
                    } else "body" !== v.opts.scrollableContainer && v.events.$on(w(v.opts.scrollableContainer), "scroll", e, !0), v.events.$on(w(v.o_win), "scroll", e, !0), v.events.$on(w(v.o_win), "resize", e, !0), v.events.on("initialized", e), v.events.on("focus", e), v.events.$on(w(v.o_win), "resize", "textarea", e, !0);
                    v.events.on("destroy", function() {
                        v._stickyElements = []
                    })
                }()
            },
            forSelection: function(e) {
                var t = o();
                e.css({
                    top: 0,
                    left: 0
                });
                var n = t.top + t.height,
                    r = t.left + t.width / 2 - e.get(0).offsetWidth / 2 + v.helpers.scrollLeft();
                v.opts.iframe || (n += v.helpers.scrollTop()), i(r, n, e, t.height)
            },
            addSticky: function(e) {
                e.addClass("fr-sticky"), v.helpers.isIOS() && e.addClass("fr-sticky-ios"), e.removeClass("fr-sticky"), v._stickyElements.push(e.get(0))
            },
            refresh: e,
            at: i,
            getBoundingRect: o
        }
    }, w.FE.MODULES.refresh = function(o) {
        function i(e, t) {
            e.toggleClass("fr-disabled", t).attr("aria-disabled", t)
        }
        return {
            undo: function(e) {
                i(e, !o.undo.canDo())
            },
            redo: function(e) {
                i(e, !o.undo.canRedo())
            },
            outdent: function(e) {
                if (o.node.hasClass(e.get(0), "fr-no-refresh")) return !1;
                for (var t = o.selection.blocks(), n = 0; n < t.length; n++) {
                    var r = "rtl" == o.opts.direction || "rtl" == w(t[n]).css("direction") ? "margin-right" : "margin-left";
                    if ("LI" == t[n].tagName || "LI" == t[n].parentNode.tagName) return i(e, !1), !0;
                    if (0 < o.helpers.getPX(w(t[n]).css(r))) return i(e, !1), !0
                }
                i(e, !0)
            },
            indent: function(e) {
                if (o.node.hasClass(e.get(0), "fr-no-refresh")) return !1;
                for (var t = o.selection.blocks(), n = 0; n < t.length; n++) {
                    for (var r = t[n].previousSibling; r && r.nodeType == Node.TEXT_NODE && 0 === r.textContent.length;) r = r.previousSibling;
                    if ("LI" != t[n].tagName || r) return i(e, !1), !0;
                    i(e, !0)
                }
            }
        }
    }, w.extend(w.FE.DEFAULTS, {
        editInPopup: !1
    }), w.FE.MODULES.textEdit = function(n) {
        function t() {
            n.events.$on(n.$el, n._mouseup, function() {
                setTimeout(function() {
                    var e, t;
                    t = n.popups.get("text.edit"), e = "INPUT" === n.$el.prop("tagName") ? n.$el.attr("placeholder") : n.$el.text(), t.find("input").val(e).trigger("change"), n.popups.setContainer("text.edit", n.$sc), n.popups.show("text.edit", n.$el.offset().left + n.$el.outerWidth() / 2, n.$el.offset().top + n.$el.outerHeight(), n.$el.outerHeight())
                }, 10)
            })
        }
        return {
            _init: function() {
                var e;
                n.opts.editInPopup && (e = {
                    edit: '<div id="fr-text-edit-' + n.id + '" class="fr-layer fr-text-edit-layer"><div class="fr-input-line"><input type="text" placeholder="' + n.language.translate("Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="updateText" tabIndex="2">' + n.language.translate("Update") + "</button></div></div>"
                }, n.popups.create("text.edit", e), t())
            },
            update: function() {
                var e = n.popups.get("text.edit").find("input").val();
                0 === e.length && (e = n.opts.placeholderText), "INPUT" === n.$el.prop("tagName") ? n.$el.attr("placeholder", e) : n.$el.text(e), n.events.trigger("contentChanged"), n.popups.hide("text.edit")
            }
        }
    }, w.FE.RegisterCommand("updateText", {
        focus: !1,
        undo: !1,
        callback: function() {
            this.textEdit.update()
        }
    }), w.extend(w.FE.DEFAULTS, {
        toolbarBottom: !1,
        toolbarButtons: null,
        toolbarButtonsXS: null,
        toolbarButtonsSM: null,
        toolbarButtonsMD: null,
        toolbarContainer: null,
        toolbarInline: !1,
        toolbarSticky: !0,
        toolbarStickyOffset: 0,
        toolbarVisibleWithoutSelection: !1
    }), w.FE.TOOLBAR_BUTTONS = ["fullscreen", "bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "|", "fontFamily", "fontSize", "color", "inlineClass", "inlineStyle", "paragraphStyle", "lineHeight", "|", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "quote", "-", "insertLink", "insertImage", "insertVideo", "embedly", "insertFile", "insertTable", "|", "emoticons", "fontAwesome", "specialCharacters", "insertHR", "selectAll", "clearFormatting", "|", "print", "getPDF", "spellChecker", "help", "html", "|", "undo", "redo"], w.FE.TOOLBAR_BUTTONS_MD = null, w.FE.TOOLBAR_BUTTONS_SM = ["bold", "italic", "underline", "|", "fontFamily", "fontSize", "insertLink", "insertImage", "table", "|", "undo", "redo"], w.FE.TOOLBAR_BUTTONS_XS = ["bold", "italic", "fontFamily", "fontSize", "|", "undo", "redo"], w.FE.MODULES.toolbar = function(o) {
        var r = [];

        function i(e, t) {
            for (var n = 0; n < t.length; n++) "-" != t[n] && "|" != t[n] && e.indexOf(t[n]) < 0 && e.push(t[n])
        }

        function a() {
            var e = o.helpers.screenSize();
            return r[e]
        }

        function e() {
            var e = a();
            o.$tb.find(".fr-separator").remove(), o.$tb.find("> .fr-command, > div.fr-btn-wrap").addClass("fr-hidden");
            for (var t = 0; t < e.length; t++)
                if ("|" == e[t] || "-" == e[t]) o.$tb.append(o.button.buildList([e[t]]));
                else {
                    var n = o.$tb.find('> .fr-command[data-cmd="' + e[t] + '"], > div.fr-btn-wrap > .fr-command[data-cmd="' + e[t] + '"]'),
                        r = null;
                    o.node.hasClass(n.next().get(0), "fr-dropdown-menu") && (r = n.next()), o.node.hasClass(n.next().get(0), "fr-options") && (n = n.parent()), n.removeClass("fr-hidden").appendTo(o.$tb), r && r.appendTo(o.$tb)
                }
        }

        function t(e, t) {
            setTimeout(function() {
                if ((!e || e.which != w.FE.KEYCODE.ESC) && o.selection.inEditor() && o.core.hasFocus() && !o.popups.areVisible() && (o.opts.toolbarVisibleWithoutSelection || !o.selection.isCollapsed() && !o.keys.isIME() || t)) {
                    if (o.$tb.data("instance", o), !1 === o.events.trigger("toolbar.show", [e])) return !1;
                    o.$tb.show(), o.opts.toolbarContainer || o.position.forSelection(o.$tb), 1 < o.opts.zIndex ? o.$tb.css("z-index", o.opts.zIndex + 1) : o.$tb.css("z-index", null)
                }
            }, 0)
        }

        function n(e) {
            return (!e || "blur" !== e.type || document.activeElement !== o.el) && (!(!e || "keydown" !== e.type || !o.keys.ctrlKey(e)) || (!!o.button.getButtons(".fr-dropdown.fr-active").next().find(o.o_doc.activeElement).length || void(!1 !== o.events.trigger("toolbar.hide") && o.$tb.hide())))
        }
        r[w.FE.XS] = o.opts.toolbarButtonsXS || o.opts.toolbarButtons || w.FE.TOOLBAR_BUTTONS_XS || w.FE.TOOLBAR_BUTTONS || [], r[w.FE.SM] = o.opts.toolbarButtonsSM || o.opts.toolbarButtons || w.FE.TOOLBAR_BUTTONS_SM || w.FE.TOOLBAR_BUTTONS || [], r[w.FE.MD] = o.opts.toolbarButtonsMD || o.opts.toolbarButtons || w.FE.TOOLBAR_BUTTONS_MD || w.FE.TOOLBAR_BUTTONS || [], r[w.FE.LG] = o.opts.toolbarButtons || w.FE.TOOLBAR_BUTTONS || [];
        var s = null;

        function l(e) {
            clearTimeout(s), e && e.which == w.FE.KEYCODE.ESC || (s = setTimeout(t, o.opts.typingTimer))
        }

        function d() {
            o.events.on("window.mousedown", n), o.events.on("keydown", n), o.events.on("blur", n), o.helpers.isMobile() || o.events.on("window.mouseup", t), o.helpers.isMobile() ? o.helpers.isIOS() || (o.events.on("window.touchend", t), o.browser.mozilla && setInterval(t, 200)) : o.events.on("window.keyup", l), o.events.on("keydown", function(e) {
                e && e.which == w.FE.KEYCODE.ESC && n()
            }), o.events.on("keydown", function(e) {
                if (e.which == w.FE.KEYCODE.ALT) return e.stopPropagation(), !1
            }, !0), o.events.$on(o.$wp, "scroll.toolbar", t), o.events.$on(o.$sc, "scroll.toolbar", t), o.events.on("commands.after", t), o.helpers.isMobile() && (o.events.$on(o.$doc, "selectionchange", l), o.events.$on(o.$doc, "orientationchange", t))
        }

        function c() {
            o.$tb.html("").removeData().remove(), o.$tb = null
        }

        function f() {
            o.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"), o.$box.find(".fr-sticky-dummy").remove()
        }

        function p() {
            o.opts.theme && o.$tb.addClass(o.opts.theme + "-theme"), 1 < o.opts.zIndex && o.$tb.css("z-index", o.opts.zIndex + 1), "auto" != o.opts.direction && o.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-" + o.opts.direction), o.helpers.isMobile() ? o.$tb.addClass("fr-mobile") : o.$tb.addClass("fr-desktop"), o.opts.toolbarContainer ? (o.opts.toolbarInline && (d(), n()), o.opts.toolbarBottom ? o.$tb.addClass("fr-bottom") : o.$tb.addClass("fr-top")) : o.opts.toolbarInline ? (o.$sc.append(o.$tb), o.$tb.data("container", o.$sc), o.$tb.addClass("fr-inline"), o.$tb.prepend('<span class="fr-arrow"></span>'), d(), o.opts.toolbarBottom = !1) : (o.opts.toolbarBottom && !o.helpers.isIOS() ? (o.$box.append(o.$tb), o.$tb.addClass("fr-bottom"), o.$box.addClass("fr-bottom")) : (o.opts.toolbarBottom = !1, o.$box.prepend(o.$tb), o.$tb.addClass("fr-top"), o.$box.addClass("fr-top")), o.$tb.addClass("fr-basic"), o.opts.toolbarSticky && (o.opts.toolbarStickyOffset && (o.opts.toolbarBottom ? o.$tb.css("bottom", o.opts.toolbarStickyOffset) : o.$tb.css("top", o.opts.toolbarStickyOffset)), o.position.addSticky(o.$tb))),
                function() {
                    var e = w.merge([], a());
                    i(e, r[w.FE.XS]), i(e, r[w.FE.SM]), i(e, r[w.FE.MD]), i(e, r[w.FE.LG]);
                    for (var t = e.length - 1; 0 <= t; t--) "-" != e[t] && "|" != e[t] && e.indexOf(e[t]) < t && e.splice(t, 1);
                    var n = o.button.buildList(e, a());
                    o.$tb.append(n), o.button.bindCommands(o.$tb)
                }(), o.events.$on(w(o.o_win), "resize", e), o.events.$on(w(o.o_win), "orientationchange", e), o.accessibility.registerToolbar(o.$tb), o.events.$on(o.$tb, o._mousedown + " " + o._mouseup, function(e) {
                    var t = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
                    if (t && "INPUT" != t.tagName && !o.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1
                }, !0)
        }
        var u = !1;
        return {
            _init: function() {
                if (o.$sc = w(o.opts.scrollableContainer).first(), !o.$wp) return !1;
                o.opts.toolbarContainer ? (o.shared.$tb ? (o.$tb = o.shared.$tb, o.opts.toolbarInline && d()) : (o.shared.$tb = w('<div class="fr-toolbar"></div>'), o.$tb = o.shared.$tb, w(o.opts.toolbarContainer).append(o.$tb), p(), o.$tb.data("instance", o)), o.opts.toolbarInline ? o.$box.addClass("fr-inline") : o.$box.addClass("fr-basic"), o.events.on("focus", function() {
                    o.$tb.data("instance", o)
                }, !0), o.opts.toolbarInline = !1) : o.opts.toolbarInline ? (o.$box.addClass("fr-inline"), o.shared.$tb ? (o.$tb = o.shared.$tb, d()) : (o.shared.$tb = w('<div class="fr-toolbar"></div>'), o.$tb = o.shared.$tb, p())) : (o.$box.addClass("fr-basic"), o.$tb = w('<div class="fr-toolbar"></div>'), p(), o.$tb.data("instance", o)), o.events.on("destroy", f, !0), o.events.on(o.opts.toolbarInline || o.opts.toolbarContainer ? "shared.destroy" : "destroy", c, !0)
            },
            hide: n,
            show: function() {
                if (!1 === o.events.trigger("toolbar.show")) return !1;
                o.$tb.show()
            },
            showInline: t,
            disable: function() {
                !u && o.$tb && (o.$tb.find("> .fr-command, .fr-btn-wrap > .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled", !0), u = !0)
            },
            enable: function() {
                u && o.$tb && (o.$tb.find("> .fr-command, .fr-btn-wrap > .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled", !1), u = !1), o.button.bulkRefresh()
            }
        }
    }
});

/*!
 * align Plugin
 */

! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = function(e, n) {
        return n === undefined && (n = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), t(n)
    } : t(window.jQuery)
}(function(r) {
    r.FE.PLUGINS.align = function(a) {
        return {
            apply: function(e) {
                var n = a.selection.element();
                if (r(n).parents(".fr-img-caption").length) r(n).css("text-align", e);
                else {
                    a.selection.save(), a.html.wrap(!0, !0, !0, !0), a.selection.restore();
                    for (var t = a.selection.blocks(), i = 0; i < t.length; i++) r(t[i]).css("text-align", e).removeClass("fr-temp-div"), "" === r(t[i]).attr("class") && r(t[i]).removeAttr("class"), "" === r(t[i]).attr("style") && r(t[i]).removeAttr("style");
                    a.selection.save(), a.html.unwrap(), a.selection.restore()
                }
            },
            refresh: function(e) {
                var n = a.selection.blocks();
                if (n.length) {
                    var t = a.helpers.getAlignment(r(n[0]));
                    e.find("> *:first").replaceWith(a.icon.create("align-" + t))
                }
            },
            refreshOnShow: function(e, n) {
                var t = a.selection.blocks();
                if (t.length) {
                    var i = a.helpers.getAlignment(r(t[0]));
                    n.find('a.fr-command[data-param1="' + i + '"]').addClass("fr-active").attr("aria-selected", !0)
                }
            },
            refreshForToolbar: function(e) {
                var n = a.selection.blocks();
                if (n.length) {
                    var t = a.helpers.getAlignment(r(n[0]));
                    "align" + (t = t.charAt(0).toUpperCase() + t.slice(1)) == e.attr("data-cmd") && e.addClass("fr-active")
                }
            }
        }
    }, r.FE.DefineIcon("align", {
        NAME: "align-left"
    }), r.FE.DefineIcon("align-left", {
        NAME: "align-left"
    }), r.FE.DefineIcon("align-right", {
        NAME: "align-right"
    }), r.FE.DefineIcon("align-center", {
        NAME: "align-center"
    }), r.FE.DefineIcon("align-justify", {
        NAME: "align-justify"
    }), r.FE.RegisterCommand("align", {
        type: "dropdown",
        title: "Align",
        options: {
            left: "Align Left",
            center: "Align Center",
            right: "Align Right",
            justify: "Align Justify"
        },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                n = r.FE.COMMANDS.align.options;
            for (var t in n) n.hasOwnProperty(t) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="align" data-param1="' + t + '" title="' + this.language.translate(n[t]) + '">' + this.icon.create("align-" + t) + '<span class="fr-sr-only">' + this.language.translate(n[t]) + "</span></a></li>");
            return e += "</ul>"
        },
        callback: function(e, n) {
            this.align.apply(n)
        },
        refresh: function(e) {
            this.align.refresh(e)
        },
        refreshOnShow: function(e, n) {
            this.align.refreshOnShow(e, n)
        },
        plugin: "align"
    }), r.FE.RegisterCommand("alignLeft", {
        type: "button",
        icon: "align-left",
        callback: function() {
            this.align.apply("left")
        },
        refresh: function(e) {
            this.align.refreshForToolbar(e)
        }
    }), r.FE.RegisterCommand("alignRight", {
        type: "button",
        icon: "align-right",
        callback: function() {
            this.align.apply("right")
        },
        refresh: function(e) {
            this.align.refreshForToolbar(e)
        }
    }), r.FE.RegisterCommand("alignCenter", {
        type: "button",
        icon: "align-center",
        callback: function() {
            this.align.apply("center")
        },
        refresh: function(e) {
            this.align.refreshForToolbar(e)
        }
    }), r.FE.RegisterCommand("alignJustify", {
        type: "button",
        icon: "align-justify",
        callback: function() {
            this.align.apply("justify")
        },
        refresh: function(e) {
            this.align.refreshForToolbar(e)
        }
    })
});

/*!
 * font_family Plugin
 */

! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t)
    } : n(window.jQuery)
}(function(l) {
    l.extend(l.FE.DEFAULTS, {
        fontFamily: {
            "Arial,Helvetica,sans-serif": "Arial",
            "Georgia,serif": "Georgia",
            "Impact,Charcoal,sans-serif": "Impact",
            "Tahoma,Geneva,sans-serif": "Tahoma",
            "Times New Roman,Times,serif,-webkit-standard": "Times New Roman",
            "Verdana,Geneva,sans-serif": "Verdana"
        },
        fontFamilySelection: !1,
        fontFamilyDefaultSelection: "Font Family"
    }), l.FE.PLUGINS.fontFamily = function(o) {
        function i(e) {
            var t = e.replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'| /g, "").split(",");
            return l.grep(t, function(e) {
                return 0 < e.length
            })
        }

        function r(e, t) {
            for (var n = 0; n < e.length; n++)
                for (var a = 0; a < t.length; a++)
                    if (e[n].toLowerCase() == t[a].toLowerCase()) return [n, a];
            return null
        }

        function f() {
            var e = i(l(o.selection.element()).css("font-family")),
                t = [];
            for (var n in o.opts.fontFamily)
                if (o.opts.fontFamily.hasOwnProperty(n)) {
                    var a = r(e, i(n));
                    a && t.push([n, a])
                }
            return 0 === t.length ? null : (t.sort(function(e, t) {
                var n = e[1][0] - t[1][0];
                return 0 === n ? e[1][1] - t[1][1] : n
            }), t[0][0])
        }
        return {
            apply: function(e) {
                o.format.applyStyle("font-family", e)
            },
            refreshOnShow: function(e, t) {
                t.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), t.find('.fr-command[data-param1="' + f() + '"]').addClass("fr-active").attr("aria-selected", !0);
                var n = t.find(".fr-dropdown-list"),
                    a = t.find(".fr-active").parent();
                a.length ? n.parent().scrollTop(a.offset().top - n.offset().top - (n.parent().outerHeight() / 2 - a.outerHeight() / 2)) : n.parent().scrollTop(0)
            },
            refresh: function(e) {
                if (o.opts.fontFamilySelection) {
                    var t = l(o.selection.element()).css("font-family").replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'|/g, "").split(",");
                    e.find("> span").text(o.opts.fontFamily[f()] || t[0] || o.language.translate(o.opts.fontFamilyDefaultSelection))
                }
            }
        }
    }, l.FE.RegisterCommand("fontFamily", {
        type: "dropdown",
        displaySelection: function(e) {
            return e.opts.fontFamilySelection
        },
        defaultSelection: function(e) {
            return e.opts.fontFamilyDefaultSelection
        },
        displaySelectionWidth: 120,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.fontFamily;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontFamily" data-param1="' + n + '" style="font-family: ' + n + '" title="' + t[n] + '">' + t[n] + "</a></li>");
            return e += "</ul>"
        },
        title: "Font Family",
        callback: function(e, t) {
            this.fontFamily.apply(t)
        },
        refresh: function(e) {
            this.fontFamily.refresh(e)
        },
        refreshOnShow: function(e, t) {
            this.fontFamily.refreshOnShow(e, t)
        },
        plugin: "fontFamily"
    }), l.FE.DefineIcon("fontFamily", {
        NAME: "font"
    })
});

/*!
 * font_size Plugin
 */

! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t)
    } : n(window.jQuery)
}(function(f) {
    f.extend(f.FE.DEFAULTS, {
        fontSize: ["8", "9", "10", "11", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96"],
        fontSizeSelection: !1,
        fontSizeDefaultSelection: "12",
        fontSizeUnit: "px"
    }), f.FE.PLUGINS.fontSize = function(r) {
        return {
            apply: function(e) {
                r.format.applyStyle("font-size", e)
            },
            refreshOnShow: function(e, t) {
                var n = f(r.selection.element()).css("font-size");
                "pt" === r.opts.fontSizeUnit && (n = Math.round(72 * parseFloat(n, 10) / 96) + "pt"), t.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), t.find('.fr-command[data-param1="' + n + '"]').addClass("fr-active").attr("aria-selected", !0);
                var o = t.find(".fr-dropdown-list"),
                    i = t.find(".fr-active").parent();
                i.length ? o.parent().scrollTop(i.offset().top - o.offset().top - (o.parent().outerHeight() / 2 - i.outerHeight() / 2)) : o.parent().scrollTop(0)
            },
            refresh: function(e) {
                if (r.opts.fontSizeSelection) {
                    var t = r.helpers.getPX(f(r.selection.element()).css("font-size"));
                    "pt" === r.opts.fontSizeUnit && (t = Math.round(72 * parseFloat(t, 10) / 96) + "pt"), e.find("> span").text(t)
                }
            }
        }
    }, f.FE.RegisterCommand("fontSize", {
        type: "dropdown",
        title: "Font Size",
        displaySelection: function(e) {
            return e.opts.fontSizeSelection
        },
        displaySelectionWidth: 30,
        defaultSelection: function(e) {
            return e.opts.fontSizeDefaultSelection
        },
        html: function() {
            for (var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.fontSize, n = 0; n < t.length; n++) {
                var o = t[n];
                e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontSize" data-param1="' + o + this.opts.fontSizeUnit + '" title="' + o + '">' + o + "</a></li>"
            }
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.fontSize.apply(t)
        },
        refresh: function(e) {
            this.fontSize.refresh(e)
        },
        refreshOnShow: function(e, t) {
            this.fontSize.refreshOnShow(e, t)
        },
        plugin: "fontSize"
    }), f.FE.DefineIcon("fontSize", {
        NAME: "text-height"
    })
});

/*!
 * table Plugin
 */

! function(l) {
    "function" == typeof define && define.amd ? define(["jquery"], l) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), l(t)
    } : l(window.jQuery)
}(function(Z) {
    Z.extend(Z.FE.POPUP_TEMPLATES, {
        "table.insert": "[_BUTTONS_][_ROWS_COLUMNS_]",
        "table.edit": "[_BUTTONS_]",
        "table.colors": "[_BUTTONS_][_COLORS_][_CUSTOM_COLOR_]"
    }), Z.extend(Z.FE.DEFAULTS, {
        tableInsertMaxSize: 10,
        tableEditButtons: ["tableHeader", "tableRemove", "|", "tableRows", "tableColumns", "tableStyle", "-", "tableCells", "tableCellBackground", "tableCellVerticalAlign", "tableCellHorizontalAlign", "tableCellStyle"],
        tableInsertButtons: ["tableBack", "|"],
        tableResizer: !0,
        tableDefaultWidth: "100%",
        tableResizerOffset: 5,
        tableResizingLimit: 30,
        tableColorsButtons: ["tableBack", "|"],
        tableColors: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
        tableColorsStep: 7,
        tableCellStyles: {
            "fr-highlighted": "Highlighted",
            "fr-thick": "Thick"
        },
        tableStyles: {
            "fr-dashed-borders": "Dashed Borders",
            "fr-alternate-rows": "Alternate Rows"
        },
        tableCellMultipleStyles: !0,
        tableMultipleStyles: !0,
        tableInsertHelper: !0,
        tableInsertHelperOffset: 15
    }), Z.FE.PLUGINS.table = function(w) {
        var C, o, s, n, a, r, E;

        function h() {
            var e = O();
            if (e) {
                var t = w.popups.get("table.edit");
                if (t || (t = p()), t) {
                    w.popups.setContainer("table.edit", w.$sc);
                    var l = M(e),
                        a = (l.left + l.right) / 2,
                        s = l.bottom;
                    w.popups.show("table.edit", a, s, l.bottom - l.top), w.edit.isDisabled() && (1 < J().length && w.toolbar.disable(), w.$el.removeClass("fr-no-selection"), w.edit.on(), w.button.bulkRefresh(), w.selection.setAtEnd(w.$el.find(".fr-selected-cell:last").get(0)), w.selection.restore())
                }
            }
        }

        function f() {
            var e, t, l, a, s = O();
            if (s) {
                var n = w.popups.get("table.colors");
                n || (n = function() {
                    var e = "";
                    0 < w.opts.tableColorsButtons.length && (e = '<div class="fr-buttons fr-table-colors-buttons">' + w.button.buildList(w.opts.tableColorsButtons) + "</div>");
                    var t = "";
                    w.opts.colorsHEXInput && (t = '<div class="fr-table-colors-hex-layer fr-active fr-layer" id="fr-table-colors-hex-layer-' + w.id + '"><div class="fr-input-line"><input maxlength="7" id="fr-table-colors-hex-layer-text-' + w.id + '" type="text" placeholder="' + w.language.translate("HEX Color") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="tableCellBackgroundCustomColor" tabIndex="2" role="button">' + w.language.translate("OK") + "</button></div></div>");
                    var l = {
                            buttons: e,
                            colors: function() {
                                for (var e = '<div class="fr-table-colors">', t = 0; t < w.opts.tableColors.length; t++) 0 !== t && t % w.opts.tableColorsStep == 0 && (e += "<br>"), "REMOVE" != w.opts.tableColors[t] ? e += '<span class="fr-command" style="background: ' + w.opts.tableColors[t] + ';" tabIndex="-1" role="button" data-cmd="tableCellBackgroundColor" data-param1="' + w.opts.tableColors[t] + '"><span class="fr-sr-only">' + w.language.translate("Color") + " " + w.opts.tableColors[t] + "&nbsp;&nbsp;&nbsp;</span></span>" : e += '<span class="fr-command" data-cmd="tableCellBackgroundColor" tabIndex="-1" role="button" data-param1="REMOVE" title="' + w.language.translate("Clear Formatting") + '">' + w.icon.create("tableColorRemove") + '<span class="fr-sr-only">' + w.language.translate("Clear Formatting") + "</span></span>";
                                return e += "</div>"
                            }(),
                            custom_color: t
                        },
                        a = w.popups.create("table.colors", l);
                    return w.events.$on(w.$wp, "scroll.table-colors", function() {
                        w.popups.isVisible("table.colors") && f()
                    }), u = a, w.events.on("popup.tab", function(e) {
                        var t = Z(e.currentTarget);
                        if (!w.popups.isVisible("table.colors") || !t.is("span")) return !0;
                        var l = e.which,
                            a = !0;
                        if (Z.FE.KEYCODE.TAB == l) {
                            var s = u.find(".fr-buttons");
                            a = !w.accessibility.focusToolbar(s, !!e.shiftKey)
                        } else if (Z.FE.KEYCODE.ARROW_UP == l || Z.FE.KEYCODE.ARROW_DOWN == l || Z.FE.KEYCODE.ARROW_LEFT == l || Z.FE.KEYCODE.ARROW_RIGHT == l) {
                            var n = t.parent().find("span.fr-command"),
                                r = n.index(t),
                                o = w.opts.colorsStep,
                                i = Math.floor(n.length / o),
                                f = r % o,
                                c = Math.floor(r / o),
                                d = c * o + f,
                                p = i * o;
                            Z.FE.KEYCODE.ARROW_UP == l ? d = ((d - o) % p + p) % p : Z.FE.KEYCODE.ARROW_DOWN == l ? d = (d + o) % p : Z.FE.KEYCODE.ARROW_LEFT == l ? d = ((d - 1) % p + p) % p : Z.FE.KEYCODE.ARROW_RIGHT == l && (d = (d + 1) % p);
                            var h = Z(n.get(d));
                            w.events.disableBlur(), h.focus(), a = !1
                        } else Z.FE.KEYCODE.ENTER == l && (w.button.exec(t), a = !1);
                        return !1 === a && (e.preventDefault(), e.stopPropagation()), a
                    }, !0), a;
                    var u
                }()), w.popups.setContainer("table.colors", w.$sc);
                var r = M(s),
                    o = (r.left + r.right) / 2,
                    i = r.bottom;
                e = w.popups.get("table.colors"), t = w.$el.find(".fr-selected-cell:first"), l = w.helpers.RGBToHex(t.css("background-color")), a = e.find(".fr-table-colors-hex-layer input"), e.find(".fr-selected-color").removeClass("fr-selected-color fr-active-item"), e.find('span[data-param1="' + l + '"]').addClass("fr-selected-color fr-active-item"), a.val(l).trigger("change"), w.popups.show("table.colors", o, i, r.bottom - r.top)
            }
        }

        function i() {
            0 === J().length && w.toolbar.enable()
        }

        function c(e) {
            if (e) return w.popups.onHide("table.insert", function() {
                w.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseenter")
            }), !0;
            var t = "";
            0 < w.opts.tableInsertButtons.length && (t = '<div class="fr-buttons">' + w.button.buildList(w.opts.tableInsertButtons) + "</div>");
            var l, a = {
                    buttons: t,
                    rows_columns: function() {
                        for (var e = '<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">', t = 1; t <= w.opts.tableInsertMaxSize; t++) {
                            for (var l = 1; l <= w.opts.tableInsertMaxSize; l++) {
                                var a = "inline-block";
                                2 < t && !w.helpers.isMobile() && (a = "none");
                                var s = "fr-table-cell ";
                                1 == t && 1 == l && (s += " hover"), e += '<span class="fr-command ' + s + '" tabIndex="-1" data-cmd="tableInsert" data-row="' + t + '" data-col="' + l + '" data-param1="' + t + '" data-param2="' + l + '" style="display: ' + a + ';" role="button"><span></span><span class="fr-sr-only">' + t + " &times; " + l + "&nbsp;&nbsp;&nbsp;</span></span>"
                            }
                            e += '<div class="new-line"></div>'
                        }
                        return e += "</div></div>"
                    }()
                },
                s = w.popups.create("table.insert", a);
            return w.events.$on(s, "mouseenter", ".fr-table-size .fr-select-table-size .fr-table-cell", function(e) {
                d(Z(e.currentTarget))
            }, !0), l = s, w.events.$on(l, "focus", "[tabIndex]", function(e) {
                var t = Z(e.currentTarget);
                d(t)
            }), w.events.on("popup.tab", function(e) {
                var t = Z(e.currentTarget);
                if (!w.popups.isVisible("table.insert") || !t.is("span, a")) return !0;
                var l, a = e.which;
                if (Z.FE.KEYCODE.ARROW_UP == a || Z.FE.KEYCODE.ARROW_DOWN == a || Z.FE.KEYCODE.ARROW_LEFT == a || Z.FE.KEYCODE.ARROW_RIGHT == a) {
                    if (t.is("span.fr-table-cell")) {
                        var s = t.parent().find("span.fr-table-cell"),
                            n = s.index(t),
                            r = w.opts.tableInsertMaxSize,
                            o = n % r,
                            i = Math.floor(n / r);
                        Z.FE.KEYCODE.ARROW_UP == a ? i = Math.max(0, i - 1) : Z.FE.KEYCODE.ARROW_DOWN == a ? i = Math.min(w.opts.tableInsertMaxSize - 1, i + 1) : Z.FE.KEYCODE.ARROW_LEFT == a ? o = Math.max(0, o - 1) : Z.FE.KEYCODE.ARROW_RIGHT == a && (o = Math.min(w.opts.tableInsertMaxSize - 1, o + 1));
                        var f = i * r + o,
                            c = Z(s.get(f));
                        d(c), w.events.disableBlur(), c.focus(), l = !1
                    }
                } else Z.FE.KEYCODE.ENTER == a && (w.button.exec(t), l = !1);
                return !1 === l && (e.preventDefault(), e.stopPropagation()), l
            }, !0), s
        }

        function d(e) {
            var t = e.data("row"),
                l = e.data("col"),
                a = e.parent();
            a.siblings(".fr-table-size-info").html(t + " &times; " + l), a.find("> span").removeClass("hover fr-active-item");
            for (var s = 1; s <= w.opts.tableInsertMaxSize; s++)
                for (var n = 0; n <= w.opts.tableInsertMaxSize; n++) {
                    var r = a.find('> span[data-row="' + s + '"][data-col="' + n + '"]');
                    s <= t && n <= l ? r.addClass("hover") : s <= t + 1 || s <= 2 && !w.helpers.isMobile() ? r.css("display", "inline-block") : 2 < s && !w.helpers.isMobile() && r.css("display", "none")
                }
            e.addClass("fr-active-item")
        }

        function p(e) {
            if (e) return w.popups.onHide("table.edit", i), !0;
            if (0 < w.opts.tableEditButtons.length) {
                var t = {
                        buttons: '<div class="fr-buttons">' + w.button.buildList(w.opts.tableEditButtons) + "</div>"
                    },
                    l = w.popups.create("table.edit", t);
                return w.events.$on(w.$wp, "scroll.table-edit", function() {
                    w.popups.isVisible("table.edit") && h()
                }), l
            }
            return !1
        }

        function u() {
            if (0 < J().length) {
                var e = Q();
                w.selection.setBefore(e.get(0)) || w.selection.setAfter(e.get(0)), w.selection.restore(), w.popups.hide("table.edit"), e.remove(), w.toolbar.enable()
            }
        }

        function b(e) {
            var t = Q();
            if (0 < t.length) {
                if (0 < w.$el.find("th.fr-selected-cell").length && "above" == e) return;
                var l, a, s, n = O(),
                    r = $(n);
                a = "above" == e ? r.min_i : r.max_i;
                var o = "<tr>";
                for (l = 0; l < n[a].length; l++) {
                    if ("below" == e && a < n.length - 1 && n[a][l] == n[a + 1][l] || "above" == e && 0 < a && n[a][l] == n[a - 1][l]) {
                        if (0 === l || 0 < l && n[a][l] != n[a][l - 1]) {
                            var i = Z(n[a][l]);
                            i.attr("rowspan", parseInt(i.attr("rowspan"), 10) + 1)
                        }
                    } else o += '<td style="' + Z(n[a][l]).attr("style") + '" ><br></td>'
                }
                o += "</tr>", s = 0 < w.$el.find("th.fr-selected-cell").length && "below" == e ? Z(t.find("tbody").not(t.find("table tbody"))) : Z(t.find("tr").not(t.find("table tr")).get(a)), "below" == e ? "TBODY" == s.prop("tagName") ? s.prepend(o) : s.after(o) : "above" == e && (s.before(o), w.popups.isVisible("table.edit") && h())
            }
        }

        function g(e, t, l) {
            var a, s, n, r, o, i = 0,
                f = O(l);
            if (e < (t = Math.min(t, f[0].length - 1)))
                for (s = e; s <= t; s++)
                    if (!(e < s && f[0][s] == f[0][s - 1]) && 1 < (r = Math.min(parseInt(f[0][s].getAttribute("colspan"), 10) || 1, t - e + 1)) && f[0][s] == f[0][s + 1])
                        for (i = r - 1, a = 1; a < f.length; a++)
                            if (f[a][s] != f[a - 1][s]) {
                                for (n = s; n < s + r; n++)
                                    if (1 < (o = parseInt(f[a][n].getAttribute("colspan"), 10) || 1) && f[a][n] == f[a][n + 1]) n += i = Math.min(i, o - 1);
                                    else if (!(i = Math.max(0, i - 1))) break;
                                if (!i) break
                            }
            i && v(f, i, "colspan", 0, f.length - 1, e, t)
        }

        function m(e, t, l) {
            var a, s, n, r, o, i = 0,
                f = O(l);
            if (e < (t = Math.min(t, f.length - 1)))
                for (a = e; a <= t; a++)
                    if (!(e < a && f[a][0] == f[a - 1][0]) && 1 < (r = Math.min(parseInt(f[a][0].getAttribute("rowspan"), 10) || 1, t - e + 1)) && f[a][0] == f[a + 1][0])
                        for (i = r - 1, s = 1; s < f[0].length; s++)
                            if (f[a][s] != f[a][s - 1]) {
                                for (n = a; n < a + r; n++)
                                    if (1 < (o = parseInt(f[n][s].getAttribute("rowspan"), 10) || 1) && f[n][s] == f[n + 1][s]) n += i = Math.min(i, o - 1);
                                    else if (!(i = Math.max(0, i - 1))) break;
                                if (!i) break
                            }
            i && v(f, i, "rowspan", e, t, 0, f[0].length - 1)
        }

        function v(e, t, l, a, s, n, r) {
            var o, i, f;
            for (o = a; o <= s; o++)
                for (i = n; i <= r; i++) a < o && e[o][i] == e[o - 1][i] || n < i && e[o][i] == e[o][i - 1] || 1 < (f = parseInt(e[o][i].getAttribute(l), 10) || 1) && (1 < f - t ? e[o][i].setAttribute(l, f - t) : e[o][i].removeAttribute(l))
        }

        function R(e, t, l, a, s) {
            m(e, t, s), g(l, a, s)
        }

        function t(e) {
            var t = w.$el.find(".fr-selected-cell");
            "REMOVE" != e ? t.css("background-color", w.helpers.HEXtoRGB(e)) : t.css("background-color", ""), h()
        }

        function O(e) {
            var f = [];
            return null == (e = e || null) && 0 < J().length && (e = Q()), e && e.find("tr:visible").not(e.find("table tr")).each(function(o, e) {
                var t = Z(e),
                    i = 0;
                t.find("> th, > td").each(function(e, t) {
                    for (var l = Z(t), a = parseInt(l.attr("colspan"), 10) || 1, s = parseInt(l.attr("rowspan"), 10) || 1, n = o; n < o + s; n++)
                        for (var r = i; r < i + a; r++) f[n] || (f[n] = []), f[n][r] ? i++ : f[n][r] = t;
                    i += a
                })
            }), f
        }

        function A(e, t) {
            for (var l = 0; l < t.length; l++)
                for (var a = 0; a < t[l].length; a++)
                    if (t[l][a] == e) return {
                        row: l,
                        col: a
                    }
        }

        function F(e, t, l) {
            for (var a = e + 1, s = t + 1; a < l.length;) {
                if (l[a][t] != l[e][t]) {
                    a--;
                    break
                }
                a++
            }
            for (a == l.length && a--; s < l[e].length;) {
                if (l[e][s] != l[e][t]) {
                    s--;
                    break
                }
                s++
            }
            return s == l[e].length && s--, {
                row: a,
                col: s
            }
        }

        function x() {
            w.el.querySelector(".fr-cell-fixed") && w.el.querySelector(".fr-cell-fixed").classList.remove("fr-cell-fixed"), w.el.querySelector(".fr-cell-handler") && w.el.querySelector(".fr-cell-handler").classList.remove("fr-cell-handler")
        }

        function D() {
            var e = w.$el.find(".fr-selected-cell");
            0 < e.length && e.each(function() {
                var e = Z(this);
                e.removeClass("fr-selected-cell"), "" === e.attr("class") && e.removeAttr("class")
            }), x()
        }

        function y() {
            w.events.disableBlur(), w.selection.clear(), w.$el.addClass("fr-no-selection"), w.$el.blur(), w.events.enableBlur()
        }

        function $(e) {
            var t = w.$el.find(".fr-selected-cell");
            if (0 < t.length) {
                var l, a = e.length,
                    s = 0,
                    n = e[0].length,
                    r = 0;
                for (l = 0; l < t.length; l++) {
                    var o = A(t[l], e),
                        i = F(o.row, o.col, e);
                    a = Math.min(o.row, a), s = Math.max(i.row, s), n = Math.min(o.col, n), r = Math.max(i.col, r)
                }
                return {
                    min_i: a,
                    max_i: s,
                    min_j: n,
                    max_j: r
                }
            }
            return null
        }

        function M(e) {
            var t = $(e),
                l = Z(e[t.min_i][t.min_j]),
                a = Z(e[t.min_i][t.max_j]),
                s = Z(e[t.max_i][t.min_j]);
            return {
                left: l.offset().left,
                right: a.offset().left + a.outerWidth(),
                top: l.offset().top,
                bottom: s.offset().top + s.outerHeight()
            }
        }

        function _(t, l) {
            if (Z(t).is(l)) D(), Z(t).addClass("fr-selected-cell");
            else {
                y(), w.edit.off();
                var a = O(),
                    s = A(t, a),
                    n = A(l, a),
                    r = function e(t, l, a, s, n) {
                        var r, o, i, f, c = t,
                            d = l,
                            p = a,
                            h = s;
                        for (r = c; r <= d; r++)(1 < (parseInt(Z(n[r][p]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Z(n[r][p]).attr("colspan"), 10) || 1)) && (f = F((i = A(n[r][p], n)).row, i.col, n), c = Math.min(i.row, c), d = Math.max(f.row, d), p = Math.min(i.col, p), h = Math.max(f.col, h)), (1 < (parseInt(Z(n[r][h]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Z(n[r][h]).attr("colspan"), 10) || 1)) && (f = F((i = A(n[r][h], n)).row, i.col, n), c = Math.min(i.row, c), d = Math.max(f.row, d), p = Math.min(i.col, p), h = Math.max(f.col, h));
                        for (o = p; o <= h; o++)(1 < (parseInt(Z(n[c][o]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Z(n[c][o]).attr("colspan"), 10) || 1)) && (f = F((i = A(n[c][o], n)).row, i.col, n), c = Math.min(i.row, c), d = Math.max(f.row, d), p = Math.min(i.col, p), h = Math.max(f.col, h)), (1 < (parseInt(Z(n[d][o]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Z(n[d][o]).attr("colspan"), 10) || 1)) && (f = F((i = A(n[d][o], n)).row, i.col, n), c = Math.min(i.row, c), d = Math.max(f.row, d), p = Math.min(i.col, p), h = Math.max(f.col, h));
                        return c == t && d == l && p == a && h == s ? {
                            min_i: t,
                            max_i: l,
                            min_j: a,
                            max_j: s
                        } : e(c, d, p, h, n)
                    }(Math.min(s.row, n.row), Math.max(s.row, n.row), Math.min(s.col, n.col), Math.max(s.col, n.col), a);
                D(), t.classList.add("fr-cell-fixed"), l.classList.add("fr-cell-handler");
                for (var o = r.min_i; o <= r.max_i; o++)
                    for (var i = r.min_j; i <= r.max_j; i++) Z(a[o][i]).addClass("fr-selected-cell")
            }
        }

        function I(e) {
            var t = null,
                l = Z(e.target);
            return "TD" == e.target.tagName || "TH" == e.target.tagName ? t = e.target : 0 < l.closest("td").length ? t = l.closest("td").get(0) : 0 < l.closest("th").length && (t = l.closest("th").get(0)), 0 === w.$el.find(t).length ? null : t
        }

        function S() {
            D(), w.popups.hide("table.edit")
        }

        function e(e) {
            var t = I(e);
            if ("false" == Z(t).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
            if (0 < J().length && !t && S(), !w.edit.isDisabled() || w.popups.isVisible("table.edit"))
                if (1 != e.which || 1 == e.which && w.helpers.isMac() && e.ctrlKey)(3 == e.which || 1 == e.which && w.helpers.isMac() && e.ctrlKey) && t && S();
                else if (n = !0, t) {
                0 < J().length && !e.shiftKey && S(), e.stopPropagation(), w.events.trigger("image.hideResizer"), w.events.trigger("video.hideResizer"), s = !0;
                var l = t.tagName.toLowerCase();
                e.shiftKey && 0 < w.$el.find(l + ".fr-selected-cell").length ? Z(w.$el.find(l + ".fr-selected-cell").closest("table")).is(Z(t).closest("table")) ? _(a, t) : y() : ((w.keys.ctrlKey(e) || e.shiftKey) && (1 < J().length || 0 === Z(t).find(w.selection.element()).length && !Z(t).is(w.selection.element())) && y(), a = t, 0 < w.opts.tableEditButtons.length && _(a, a))
            }
        }

        function l(e) {
            if (w.popups.areVisible()) return !0;
            if (s || w.$tb.is(e.target) || w.$tb.is(Z(e.target).closest(w.$tb.get(0))) || (0 < J().length && w.toolbar.enable(), D()), !(1 != e.which || 1 == e.which && w.helpers.isMac() && e.ctrlKey)) {
                if (n = !1, s) s = !1, I(e) || 1 != J().length ? 0 < J().length && (w.selection.isCollapsed() ? h() : D()) : D();
                if (E) {
                    E = !1, C.removeClass("fr-moving"), w.$el.removeClass("fr-no-selection"), w.edit.on();
                    var t = parseFloat(C.css("left")) + w.opts.tableResizerOffset + w.$wp.offset().left;
                    w.opts.iframe && (t -= w.$iframe.offset().left), C.data("release-position", t), C.removeData("max-left"), C.removeData("max-right"),
                        function() {
                            var e = C.data("origin"),
                                t = C.data("release-position");
                            if (e !== t) {
                                var l = C.data("first"),
                                    a = C.data("second"),
                                    s = C.data("table"),
                                    n = s.outerWidth();
                                if (w.undo.canDo() || w.undo.saveStep(), null !== l && null !== a) {
                                    var r, o, i, f = O(s),
                                        c = [],
                                        d = [],
                                        p = [],
                                        h = [];
                                    for (r = 0; r < f.length; r++) o = Z(f[r][l]), i = Z(f[r][a]), c[r] = o.outerWidth(), p[r] = i.outerWidth(), d[r] = c[r] / n * 100, h[r] = p[r] / n * 100;
                                    for (r = 0; r < f.length; r++)
                                        if (o = Z(f[r][l]), i = Z(f[r][a]), f[r][l] != f[r][a]) {
                                            var u = (d[r] * (c[r] + t - e) / c[r]).toFixed(4);
                                            o.css("width", u + "%"), i.css("width", (d[r] + h[r] - u).toFixed(4) + "%")
                                        }
                                } else {
                                    var b, g = s.parent(),
                                        m = n / g.width() * 100,
                                        v = (parseInt(s.css("margin-left"), 10) || 0) / g.width() * 100,
                                        E = (parseInt(s.css("margin-right"), 10) || 0) / g.width() * 100;
                                    "rtl" == w.opts.direction && 0 === a || "rtl" != w.opts.direction && 0 !== a ? (b = (n + t - e) / n * m, s.css("margin-right", "calc(100% - " + Math.round(b).toFixed(4) + "% - " + Math.round(v).toFixed(4) + "%)")) : ("rtl" == w.opts.direction && 0 !== a || "rtl" != w.opts.direction && 0 === a) && (b = (n - t + e) / n * m, s.css("margin-left", "calc(100% - " + Math.round(b).toFixed(4) + "% - " + Math.round(E).toFixed(4) + "%)")), s.css("width", Math.round(b).toFixed(4) + "%")
                                }
                                w.selection.restore(), w.undo.saveStep(), w.events.trigger("table.resized", [s.get(0)])
                            }
                            C.removeData("origin"), C.removeData("release-position"), C.removeData("first"), C.removeData("second"), C.removeData("table")
                        }(), W()
                }
            }
        }

        function T(e) {
            if (!0 === s && 0 < w.opts.tableEditButtons.length) {
                if (Z(e.currentTarget).closest("table").is(Q())) {
                    if ("TD" == e.currentTarget.tagName && 0 === w.$el.find("th.fr-selected-cell").length) return void _(a, e.currentTarget);
                    if ("TH" == e.currentTarget.tagName && 0 === w.$el.find("td.fr-selected-cell").length) return void _(a, e.currentTarget)
                }
                y()
            }
        }

        function N(e, t, l, a) {
            for (var s, n = t; n != w.el && "TD" != n.tagName && "TH" != n.tagName && ("up" == a ? s = n.previousElementSibling : "down" == a && (s = n.nextElementSibling), !s);) n = n.parentNode;
            "TD" == n.tagName || "TH" == n.tagName ? function(e, t) {
                for (var l = e; l && "TABLE" != l.tagName && l.parentNode != w.el;) l = l.parentNode;
                if (l && "TABLE" == l.tagName) {
                    var a = O(Z(l));
                    "up" == t ? B(A(e, a), l, a) : "down" == t && z(A(e, a), l, a)
                }
            }(n, a) : s && ("up" == a && w.selection.setAtEnd(s), "down" == a && w.selection.setAtStart(s))
        }

        function B(e, t, l) {
            0 < e.row ? w.selection.setAtEnd(l[e.row - 1][e.col]) : N(0, t, 0, "up")
        }

        function z(e, t, l) {
            var a = parseInt(l[e.row][e.col].getAttribute("rowspan"), 10) || 1;
            e.row < l.length - a ? w.selection.setAtStart(l[e.row + a][e.col]) : N(0, t, 0, "down")
        }

        function W() {
            C && (C.find("div").css("opacity", 0), C.css("top", 0), C.css("left", 0), C.css("height", 0), C.find("div").css("height", 0), C.hide())
        }

        function k() {
            o && o.removeClass("fr-visible").css("left", "-9999px")
        }

        function K(e, t) {
            var l = Z(t),
                a = l.closest("table"),
                s = a.parent();
            if (t && "TD" != t.tagName && "TH" != t.tagName && (0 < l.closest("td").length ? t = l.closest("td") : 0 < l.closest("th").length && (t = l.closest("th"))), !t || "TD" != t.tagName && "TH" != t.tagName) C && l.get(0) != C.get(0) && l.parent().get(0) != C.get(0) && w.core.sameInstance(C) && W();
            else {
                if (l = Z(t), 0 === w.$el.find(l).length) return !1;
                var n = l.offset().left - 1,
                    r = n + l.outerWidth();
                if (Math.abs(e.pageX - n) <= w.opts.tableResizerOffset || Math.abs(r - e.pageX) <= w.opts.tableResizerOffset) {
                    var o, i, f, c, d, p = O(a),
                        h = A(t, p),
                        u = F(h.row, h.col, p),
                        b = a.offset().top,
                        g = a.outerHeight() - 1;
                    "rtl" != w.opts.direction ? e.pageX - n <= w.opts.tableResizerOffset ? (f = n, 0 < h.col ? (c = n - j(h.col - 1, p) + w.opts.tableResizingLimit, d = n + j(h.col, p) - w.opts.tableResizingLimit, o = h.col - 1, i = h.col) : (o = null, i = 0, c = a.offset().left - 1 - parseInt(a.css("margin-left"), 10), d = a.offset().left - 1 + a.width() - p[0].length * w.opts.tableResizingLimit)) : r - e.pageX <= w.opts.tableResizerOffset && (f = r, u.col < p[u.row].length && p[u.row][u.col + 1] ? (c = r - j(u.col, p) + w.opts.tableResizingLimit, d = r + j(u.col + 1, p) - w.opts.tableResizingLimit, o = u.col, i = u.col + 1) : (o = u.col, i = null, c = a.offset().left - 1 + p[0].length * w.opts.tableResizingLimit, d = s.offset().left - 1 + s.width() + parseFloat(s.css("padding-left")))) : r - e.pageX <= w.opts.tableResizerOffset ? (f = r, 0 < h.col ? (c = r - j(h.col, p) + w.opts.tableResizingLimit, d = r + j(h.col - 1, p) - w.opts.tableResizingLimit, o = h.col, i = h.col - 1) : (o = null, i = 0, c = a.offset().left + p[0].length * w.opts.tableResizingLimit, d = s.offset().left - 1 + s.width() + parseFloat(s.css("padding-left")))) : e.pageX - n <= w.opts.tableResizerOffset && (f = n, u.col < p[u.row].length && p[u.row][u.col + 1] ? (c = n - j(u.col + 1, p) + w.opts.tableResizingLimit, d = n + j(u.col, p) - w.opts.tableResizingLimit, o = u.col + 1, i = u.col) : (o = u.col, i = null, c = s.offset().left + parseFloat(s.css("padding-left")), d = a.offset().left - 1 + a.width() - p[0].length * w.opts.tableResizingLimit)), C || (w.shared.$table_resizer || (w.shared.$table_resizer = Z('<div class="fr-table-resizer"><div></div></div>')), C = w.shared.$table_resizer, w.events.$on(C, "mousedown", function(e) {
                        return !w.core.sameInstance(C) || (0 < J().length && S(), 1 == e.which ? (w.selection.save(), E = !0, C.addClass("fr-moving"), y(), w.edit.off(), C.find("div").css("opacity", 1), !1) : void 0)
                    }), w.events.$on(C, "mousemove", function(e) {
                        if (!w.core.sameInstance(C)) return !0;
                        E && (w.opts.iframe && (e.pageX -= w.$iframe.offset().left), X(e))
                    }), w.events.on("shared.destroy", function() {
                        C.html("").removeData().remove(), C = null
                    }, !0), w.events.on("destroy", function() {
                        w.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"), C.hide().appendTo(Z("body:first"))
                    }, !0)), C.data("table", a), C.data("first", o), C.data("second", i), C.data("instance", w), w.$wp.append(C);
                    var m = f - w.win.pageXOffset - w.opts.tableResizerOffset - w.$wp.offset().left,
                        v = b - w.$wp.offset().top + w.$wp.scrollTop();
                    w.opts.iframe && (m += w.$iframe.offset().left, v += w.$iframe.offset().top, c += w.$iframe.offset().left, d += w.$iframe.offset().left), C.data("max-left", c), C.data("max-right", d), C.data("origin", f - w.win.pageXOffset), C.css("top", v), C.css("left", m), C.css("height", g), C.find("div").css("height", g), C.css("padding-left", w.opts.tableResizerOffset), C.css("padding-right", w.opts.tableResizerOffset), C.show()
                } else w.core.sameInstance(C) && W()
            }
        }

        function L(e, t) {
            if (w.$box.find(".fr-line-breaker").is(":visible")) return !1;
            o || q(), w.$box.append(o), o.data("instance", w);
            var l, a = Z(t).find("tr:first"),
                s = e.pageX,
                n = 0,
                r = 0;
            w.opts.iframe && (n += w.$iframe.offset().left - w.helpers.scrollLeft(), r += w.$iframe.offset().top - w.helpers.scrollTop()), a.find("th, td").each(function() {
                var e = Z(this);
                return e.offset().left <= s && s < e.offset().left + e.outerWidth() / 2 ? (l = parseInt(o.find("a").css("width"), 10), o.css("top", r + e.offset().top - w.$box.offset().top - l - 5), o.css("left", n + e.offset().left - w.$box.offset().left - l / 2), o.data("selected-cell", e), o.data("position", "before"), o.addClass("fr-visible"), !1) : e.offset().left + e.outerWidth() / 2 <= s && s < e.offset().left + e.outerWidth() ? (l = parseInt(o.find("a").css("width"), 10), o.css("top", r + e.offset().top - w.$box.offset().top - l - 5), o.css("left", n + e.offset().left - w.$box.offset().left + e.outerWidth() - l / 2), o.data("selected-cell", e), o.data("position", "after"), o.addClass("fr-visible"), !1) : void 0
            })
        }

        function H(e, t) {
            if (w.$box.find(".fr-line-breaker").is(":visible")) return !1;
            o || q(), w.$box.append(o), o.data("instance", w);
            var l, a = Z(t),
                s = e.pageY,
                n = 0,
                r = 0;
            w.opts.iframe && (n += w.$iframe.offset().left - w.helpers.scrollLeft(), r += w.$iframe.offset().top - w.helpers.scrollTop()), a.find("tr").each(function() {
                var e = Z(this);
                return e.offset().top <= s && s < e.offset().top + e.outerHeight() / 2 ? (l = parseInt(o.find("a").css("width"), 10), o.css("top", r + e.offset().top - w.$box.offset().top - l / 2), o.css("left", n + e.offset().left - w.$box.offset().left - l - 5), o.data("selected-cell", e.find("td:first")), o.data("position", "above"), o.addClass("fr-visible"), !1) : e.offset().top + e.outerHeight() / 2 <= s && s < e.offset().top + e.outerHeight() ? (l = parseInt(o.find("a").css("width"), 10), o.css("top", r + e.offset().top - w.$box.offset().top + e.outerHeight() - l / 2), o.css("left", n + e.offset().left - w.$box.offset().left - l - 5), o.data("selected-cell", e.find("td:first")), o.data("position", "below"), o.addClass("fr-visible"), !1) : void 0
            })
        }

        function Y(e) {
            r = null;
            var t = w.doc.elementFromPoint(e.pageX - w.win.pageXOffset, e.pageY - w.win.pageYOffset);
            w.opts.tableResizer && (!w.popups.areVisible() || w.popups.areVisible() && w.popups.isVisible("table.edit")) && K(e, t), !w.opts.tableInsertHelper || w.popups.areVisible() || w.$tb.hasClass("fr-inline") && w.$tb.is(":visible") || function(e, t) {
                if (0 === J().length) {
                    var l, a, s;
                    if (t && ("HTML" == t.tagName || "BODY" == t.tagName || w.node.isElement(t)))
                        for (l = 1; l <= w.opts.tableInsertHelperOffset; l++) {
                            if (a = w.doc.elementFromPoint(e.pageX - w.win.pageXOffset, e.pageY - w.win.pageYOffset + l), Z(a).hasClass("fr-tooltip")) return;
                            if (a && ("TH" == a.tagName || "TD" == a.tagName || "TABLE" == a.tagName) && (Z(a).parents(".fr-wrapper").length || w.opts.iframe)) return L(e, Z(a).closest("table"));
                            if (s = w.doc.elementFromPoint(e.pageX - w.win.pageXOffset + l, e.pageY - w.win.pageYOffset), Z(s).hasClass("fr-tooltip")) return;
                            if (s && ("TH" == s.tagName || "TD" == s.tagName || "TABLE" == s.tagName) && (Z(s).parents(".fr-wrapper").length || w.opts.iframe)) return H(e, Z(s).closest("table"))
                        }
                    w.core.sameInstance(o) && k()
                }
            }(e, t)
        }

        function P() {
            if (E) {
                var e = C.data("table").offset().top - w.win.pageYOffset;
                w.opts.iframe && (e += w.$iframe.offset().top - w.helpers.scrollTop()), C.css("top", e)
            }
        }

        function j(e, t) {
            var l, a = Z(t[0][e]).outerWidth();
            for (l = 1; l < t.length; l++) a = Math.min(a, Z(t[l][e]).outerWidth());
            return a
        }

        function V(e, t, l) {
            var a, s = 0;
            for (a = e; a <= t; a++) s += j(a, l);
            return s
        }

        function X(e) {
            if (1 < J().length && n && y(), !1 === n && !1 === s && !1 === E) r && clearTimeout(r), w.edit.isDisabled() && !w.popups.isVisible("table.edit") || (r = setTimeout(Y, 30, e));
            else if (E) {
                var t = e.pageX - w.win.pageXOffset;
                w.opts.iframe && (t += w.$iframe.offset().left);
                var l = C.data("max-left"),
                    a = C.data("max-right");
                l <= t && t <= a ? C.css("left", t - w.opts.tableResizerOffset - w.$wp.offset().left) : t < l && parseFloat(C.css("left"), 10) > l - w.opts.tableResizerOffset ? C.css("left", l - w.opts.tableResizerOffset - w.$wp.offset().left) : a < t && parseFloat(C.css("left"), 10) < a - w.opts.tableResizerOffset && C.css("left", a - w.opts.tableResizerOffset - w.$wp.offset().left)
            } else n && k()
        }

        function U(e) {
            w.node.isEmpty(e.get(0)) ? e.prepend(Z.FE.MARKERS) : e.prepend(Z.FE.START_MARKER).append(Z.FE.END_MARKER)
        }

        function q() {
            w.shared.$ti_helper || (w.shared.$ti_helper = Z('<div class="fr-insert-helper"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + w.language.translate("Insert") + '"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a></div>'), w.events.bindClick(w.shared.$ti_helper, "a", function() {
                var e = o.data("selected-cell"),
                    t = o.data("position"),
                    l = o.data("instance") || w;
                "before" == t ? (w.undo.saveStep(), e.addClass("fr-selected-cell"), l.table.insertColumn(t), e.removeClass("fr-selected-cell"), w.undo.saveStep()) : "after" == t ? (w.undo.saveStep(), e.addClass("fr-selected-cell"), l.table.insertColumn(t), e.removeClass("fr-selected-cell"), w.undo.saveStep()) : "above" == t ? (w.undo.saveStep(), e.addClass("fr-selected-cell"), l.table.insertRow(t), e.removeClass("fr-selected-cell"), w.undo.saveStep()) : "below" == t && (w.undo.saveStep(), e.addClass("fr-selected-cell"), l.table.insertRow(t), e.removeClass("fr-selected-cell"), w.undo.saveStep()), k()
            }), w.events.on("shared.destroy", function() {
                w.shared.$ti_helper.html("").removeData().remove(), w.shared.$ti_helper = null
            }, !0), w.events.$on(w.shared.$ti_helper, "mousemove", function(e) {
                e.stopPropagation()
            }, !0), w.events.$on(Z(w.o_win), "scroll", function() {
                k()
            }, !0), w.events.$on(w.$wp, "scroll", function() {
                k()
            }, !0)), o = w.shared.$ti_helper, w.events.on("destroy", function() {
                o = null
            }), w.tooltip.bind(w.$box, ".fr-insert-helper > a.fr-floating-btn")
        }

        function G() {
            a = null, clearTimeout(r)
        }

        function J() {
            return w.el.querySelectorAll(".fr-selected-cell")
        }

        function Q() {
            var e = J();
            if (e.length) {
                for (var t = e[0]; t && "TABLE" != t.tagName && t.parentNode != w.el;) t = t.parentNode;
                return t && "TABLE" == t.tagName ? Z(t) : Z([])
            }
            return Z([])
        }
        return {
            _init: function() {
                if (!w.$wp) return !1;
                if (!w.helpers.isMobile()) {
                    E = s = n = !1, w.events.$on(w.$el, "mousedown", e), w.popups.onShow("image.edit", function() {
                        D(), s = n = !1
                    }), w.popups.onShow("link.edit", function() {
                        D(), s = n = !1
                    }), w.events.on("commands.mousedown", function(e) {
                        0 < e.parents(".fr-toolbar").length && D()
                    }), w.events.$on(w.$el, "mouseenter", "th, td", T), w.events.$on(w.$win, "mouseup", l), w.opts.iframe && w.events.$on(Z(w.o_win), "mouseup", l), w.events.$on(w.$win, "mousemove", X), w.events.$on(Z(w.o_win), "scroll", P), w.events.on("contentChanged", function() {
                        0 < J().length && (h(), w.$el.find("img").on("load.selected-cells", function() {
                            Z(this).off("load.selected-cells"), 0 < J().length && h()
                        }))
                    }), w.events.$on(Z(w.o_win), "resize", function() {
                        D()
                    }), w.events.on("toolbar.esc", function() {
                        if (0 < J().length) return w.events.disableBlur(), w.events.focus(), !1
                    }, !0), w.events.$on(Z(w.o_win), "keydown", function() {
                        n && s && (s = n = !1, w.$el.removeClass("fr-no-selection"), w.edit.on(), w.selection.setAtEnd(w.$el.find(".fr-selected-cell:last").get(0)), w.selection.restore(), D())
                    }), w.events.$on(w.$el, "keydown", function(e) {
                        e.shiftKey ? !1 === function(e) {
                            var t = J();
                            if (0 < t.length) {
                                var l, a, s = O(),
                                    n = e.which;
                                1 == t.length ? a = l = t[0] : (l = w.el.querySelector(".fr-cell-fixed"), a = w.el.querySelector(".fr-cell-handler"));
                                var r = A(a, s);
                                if (Z.FE.KEYCODE.ARROW_RIGHT == n) {
                                    if (r.col < s[0].length - 1) return _(l, s[r.row][r.col + 1]), !1
                                } else if (Z.FE.KEYCODE.ARROW_DOWN == n) {
                                    if (r.row < s.length - 1) return _(l, s[r.row + 1][r.col]), !1
                                } else if (Z.FE.KEYCODE.ARROW_LEFT == n) {
                                    if (0 < r.col) return _(l, s[r.row][r.col - 1]), !1
                                } else if (Z.FE.KEYCODE.ARROW_UP == n && 0 < r.row) return _(l, s[r.row - 1][r.col]), !1
                            }
                        }(e) && setTimeout(function() {
                            h()
                        }, 0) : function(e) {
                            var t = e.which,
                                l = w.selection.blocks();
                            if (l.length && ("TD" == (l = l[0]).tagName || "TH" == l.tagName)) {
                                for (var a = l; a && "TABLE" != a.tagName && a.parentNode != w.el;) a = a.parentNode;
                                if (a && "TABLE" == a.tagName && (Z.FE.KEYCODE.ARROW_LEFT == t || Z.FE.KEYCODE.ARROW_UP == t || Z.FE.KEYCODE.ARROW_RIGHT == t || Z.FE.KEYCODE.ARROW_DOWN == t) && (0 < J().length && S(), w.browser.webkit && (Z.FE.KEYCODE.ARROW_UP == t || Z.FE.KEYCODE.ARROW_DOWN == t))) {
                                    var s = w.selection.ranges(0).startContainer;
                                    if (s.nodeType == Node.TEXT_NODE && (Z.FE.KEYCODE.ARROW_UP == t && (s.previousSibling && "BR" !== s.previousSibling.tagName || s.previousSibling && "BR" === s.previousSibling.tagName && s.previousSibling.previousSibling) || Z.FE.KEYCODE.ARROW_DOWN == t && (s.nextSibling && "BR" !== s.nextSibling.tagName || s.nextSibling && "BR" === s.nextSibling.tagName && s.nextSibling.nextSibling))) return;
                                    e.preventDefault(), e.stopPropagation();
                                    var n = O(Z(a)),
                                        r = A(l, n);
                                    Z.FE.KEYCODE.ARROW_UP == t ? B(r, a, n) : Z.FE.KEYCODE.ARROW_DOWN == t && z(r, a, n), w.selection.restore()
                                }
                            }
                        }(e)
                    }), w.events.on("keydown", function(e) {
                        if (!1 === function(e) {
                                if (e.which == Z.FE.KEYCODE.TAB) {
                                    var t;
                                    if (0 < J().length) t = w.$el.find(".fr-selected-cell:last");
                                    else {
                                        var l = w.selection.element();
                                        "TD" == l.tagName || "TH" == l.tagName ? t = Z(l) : l != w.el && (0 < Z(l).parentsUntil(w.$el, "td").length ? t = Z(l).parents("td:first") : 0 < Z(l).parentsUntil(w.$el, "th").length && (t = Z(l).parents("th:first")))
                                    }
                                    if (t) return e.preventDefault(), !!(0 === w.selection.get().focusOffset && 0 < Z(w.selection.element()).parentsUntil(w.$el, "ol, ul").length && (0 < Z(w.selection.element()).closest("li").prev().length || Z(w.selection.element()).is("li") && 0 < Z(w.selection.element()).prev().length)) || (S(), e.shiftKey ? 0 < t.prev().length ? U(t.prev()) : 0 < t.closest("tr").length && 0 < t.closest("tr").prev().length ? U(t.closest("tr").prev().find("td:last")) : 0 < t.closest("tbody").length && 0 < t.closest("table").find("thead tr").length && U(t.closest("table").find("thead tr th:last")) : 0 < t.next().length ? U(t.next()) : 0 < t.closest("tr").length && 0 < t.closest("tr").next().length ? U(t.closest("tr").next().find("td:first")) : 0 < t.closest("thead").length && 0 < t.closest("table").find("tbody tr").length ? U(t.closest("table").find("tbody tr td:first")) : (t.addClass("fr-selected-cell"), b("below"), D(), U(t.closest("tr").next().find("td:first"))), w.selection.restore(), !1)
                                }
                            }(e)) return !1;
                        var t = J();
                        if (0 < t.length) {
                            if (0 < t.length && w.keys.ctrlKey(e) && e.which == Z.FE.KEYCODE.A) return D(), w.popups.isVisible("table.edit") && w.popups.hide("table.edit"), t = [], !0;
                            if (e.which == Z.FE.KEYCODE.ESC && w.popups.isVisible("table.edit")) return D(), w.popups.hide("table.edit"), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), !(t = []);
                            if (1 < t.length && (e.which == Z.FE.KEYCODE.BACKSPACE || e.which == Z.FE.KEYCODE.DELETE)) {
                                w.undo.saveStep();
                                for (var l = 0; l < t.length; l++) Z(t[l]).html("<br>"), l == t.length - 1 && Z(t[l]).prepend(Z.FE.MARKERS);
                                return w.selection.restore(), w.undo.saveStep(), !(t = [])
                            }
                            if (1 < t.length && e.which != Z.FE.KEYCODE.F10 && !w.keys.isBrowserAction(e)) return e.preventDefault(), !(t = [])
                        } else if (!(t = []) === function(e) {
                                if (e.altKey && e.which == Z.FE.KEYCODE.SPACE) {
                                    var t, l = w.selection.element();
                                    if ("TD" == l.tagName || "TH" == l.tagName ? t = l : 0 < Z(l).closest("td").length ? t = Z(l).closest("td").get(0) : 0 < Z(l).closest("th").length && (t = Z(l).closest("th").get(0)), t) return e.preventDefault(), _(t, t), h(), !1
                                }
                            }(e)) return !1
                    }, !0);
                    var t = [];
                    w.events.on("html.beforeGet", function() {
                        t = J();
                        for (var e = 0; e < t.length; e++) t[e].className = (t[e].className || "").replace(/fr-selected-cell/g, "")
                    }), w.events.on("html.afterGet", function() {
                        for (var e = 0; e < t.length; e++) t[e].className = (t[e].className ? t[e].className.trim() + " " : "") + "fr-selected-cell";
                        t = []
                    }), c(!0), p(!0)
                }
                w.events.on("destroy", G)
            },
            insert: function(e, t) {
                var l, a, s = "<table " + (w.opts.tableDefaultWidth ? 'style="width: ' + w.opts.tableDefaultWidth + ';" ' : "") + 'class="fr-inserted-table"><tbody>',
                    n = 100 / t;
                for (l = 0; l < e; l++) {
                    for (s += "<tr>", a = 0; a < t; a++) s += "<td" + (w.opts.tableDefaultWidth ? ' style="width: ' + n.toFixed(4) + '%;"' : "") + ">", 0 === l && 0 === a && (s += Z.FE.MARKERS), s += "<br></td>";
                    s += "</tr>"
                }
                s += "</tbody></table>", w.html.insert(s), w.selection.restore();
                var r = w.$el.find(".fr-inserted-table");
                r.removeClass("fr-inserted-table"), w.events.trigger("table.inserted", [r.get(0)])
            },
            remove: u,
            insertRow: b,
            deleteRow: function() {
                var e = Q();
                if (0 < e.length) {
                    var t, l, a, s = O(),
                        n = $(s);
                    if (0 === n.min_i && n.max_i == s.length - 1) u();
                    else {
                        for (t = n.max_i; t >= n.min_i; t--) {
                            for (a = Z(e.find("tr").not(e.find("table tr")).get(t)), l = 0; l < s[t].length; l++)
                                if (0 === l || s[t][l] != s[t][l - 1]) {
                                    var r = Z(s[t][l]);
                                    if (1 < parseInt(r.attr("rowspan"), 10)) {
                                        var o = parseInt(r.attr("rowspan"), 10) - 1;
                                        1 == o ? r.removeAttr("rowspan") : r.attr("rowspan", o)
                                    }
                                    if (t < s.length - 1 && s[t][l] == s[t + 1][l] && (0 === t || s[t][l] != s[t - 1][l])) {
                                        for (var i = s[t][l], f = l; 0 < f && s[t][f] == s[t][f - 1];) f--;
                                        0 === f ? Z(e.find("tr").not(e.find("table tr")).get(t + 1)).prepend(i) : Z(s[t + 1][f - 1]).after(i)
                                    }
                                }
                            var c = a.parent();
                            a.remove(), 0 === c.find("tr").length && c.remove(), s = O(e)
                        }
                        R(0, s.length - 1, 0, s[0].length - 1, e), 0 < n.min_i ? w.selection.setAtEnd(s[n.min_i - 1][0]) : w.selection.setAtEnd(s[0][0]), w.selection.restore(), w.popups.hide("table.edit")
                    }
                }
            },
            insertColumn: function(i) {
                var e = Q();
                if (0 < e.length) {
                    var f, c = O(),
                        t = $(c);
                    f = "before" == i ? t.min_j : t.max_j;
                    var l, d = 100 / c[0].length,
                        p = 100 / (c[0].length + 1);
                    e.find("th, td").each(function() {
                        (l = Z(this)).data("old-width", l.outerWidth() / e.outerWidth() * 100)
                    }), e.find("tr").not(e.find("table tr")).each(function(e) {
                        for (var t, l = Z(this), a = 0, s = 0; a - 1 < f;) {
                            if (!(t = l.find("> th, > td").get(s))) {
                                t = null;
                                break
                            }
                            t == c[e][a] ? (a += parseInt(Z(t).attr("colspan"), 10) || 1, s++) : (a += parseInt(Z(c[e][a]).attr("colspan"), 10) || 1, "after" == i && (t = 0 === s ? -1 : l.find("> th, > td").get(s - 1)))
                        }
                        var n, r = Z(t);
                        if ("after" == i && f < a - 1 || "before" == i && 0 < f && c[e][f] == c[e][f - 1]) {
                            if (0 === e || 0 < e && c[e][f] != c[e - 1][f]) {
                                var o = parseInt(r.attr("colspan"), 10) + 1;
                                r.attr("colspan", o), r.css("width", (r.data("old-width") * p / d + p).toFixed(4) + "%"), r.removeData("old-width")
                            }
                        } else n = 0 < l.find("th").length ? '<th style="width: ' + p.toFixed(4) + '%;"><br></th>' : '<td style="width: ' + p.toFixed(4) + '%;"><br></td>', -1 == t ? l.prepend(n) : null == t ? l.append(n) : "before" == i ? r.before(n) : "after" == i && r.after(n)
                    }), e.find("th, td").each(function() {
                        (l = Z(this)).data("old-width") && (l.css("width", (l.data("old-width") * p / d).toFixed(4) + "%"), l.removeData("old-width"))
                    }), w.popups.isVisible("table.edit") && h()
                }
            },
            deleteColumn: function() {
                var e = Q();
                if (0 < e.length) {
                    var t, l, a, s = O(),
                        n = $(s);
                    if (0 === n.min_j && n.max_j == s[0].length - 1) u();
                    else {
                        var r = 0;
                        for (t = 0; t < s.length; t++)
                            for (l = 0; l < s[0].length; l++)(a = Z(s[t][l])).hasClass("fr-selected-cell") || (a.data("old-width", a.outerWidth() / e.outerWidth() * 100), (l < n.min_j || l > n.max_j) && (r += a.outerWidth() / e.outerWidth() * 100));
                        for (r /= s.length, l = n.max_j; l >= n.min_j; l--)
                            for (t = 0; t < s.length; t++)
                                if (0 === t || s[t][l] != s[t - 1][l])
                                    if (a = Z(s[t][l]), 1 < (parseInt(a.attr("colspan"), 10) || 1)) {
                                        var o = parseInt(a.attr("colspan"), 10) - 1;
                                        1 == o ? a.removeAttr("colspan") : a.attr("colspan", o), a.css("width", (100 * (a.data("old-width") - j(l, s)) / r).toFixed(4) + "%"), a.removeData("old-width")
                                    } else {
                                        var i = Z(a.parent().get(0));
                                        a.remove(), 0 === i.find("> th, > td").length && (0 === i.prev().length || 0 === i.next().length || i.prev().find("> th[rowspan], > td[rowspan]").length < i.prev().find("> th, > td").length) && i.remove()
                                    }
                        R(0, s.length - 1, 0, s[0].length - 1, e), 0 < n.min_j ? w.selection.setAtEnd(s[n.min_i][n.min_j - 1]) : w.selection.setAtEnd(s[n.min_i][0]), w.selection.restore(), w.popups.hide("table.edit"), e.find("th, td").each(function() {
                            (a = Z(this)).data("old-width") && (a.css("width", (100 * a.data("old-width") / r).toFixed(4) + "%"), a.removeData("old-width"))
                        })
                    }
                }
            },
            mergeCells: function() {
                if (1 < J().length && (0 === w.$el.find("th.fr-selected-cell").length || 0 === w.$el.find("td.fr-selected-cell").length)) {
                    x();
                    var e, t, l = $(O()),
                        a = w.$el.find(".fr-selected-cell"),
                        s = Z(a[0]),
                        n = s.parent().find(".fr-selected-cell"),
                        r = s.closest("table"),
                        o = s.html(),
                        i = 0;
                    for (e = 0; e < n.length; e++) i += Z(n[e]).outerWidth();
                    for (s.css("width", Math.min(100, i / r.outerWidth() * 100).toFixed(4) + "%"), l.min_j < l.max_j && s.attr("colspan", l.max_j - l.min_j + 1), l.min_i < l.max_i && s.attr("rowspan", l.max_i - l.min_i + 1), e = 1; e < a.length; e++) "<br>" != (t = Z(a[e])).html() && "" !== t.html() && (o += "<br>" + t.html()), t.remove();
                    s.html(o), w.selection.setAtEnd(s.get(0)), w.selection.restore(), w.toolbar.enable(), m(l.min_i, l.max_i, r);
                    var f = r.find("tr:empty");
                    for (e = f.length - 1; 0 <= e; e--) Z(f[e]).remove();
                    g(l.min_j, l.max_j, r), h()
                }
            },
            splitCellVertically: function() {
                if (1 == J().length) {
                    var e = w.$el.find(".fr-selected-cell"),
                        t = parseInt(e.attr("colspan"), 10) || 1,
                        l = e.parent().outerWidth(),
                        a = e.outerWidth(),
                        s = e.clone().html("<br>"),
                        n = O(),
                        r = A(e.get(0), n);
                    if (1 < t) {
                        var o = Math.ceil(t / 2);
                        a = V(r.col, r.col + o - 1, n) / l * 100;
                        var i = V(r.col + o, r.col + t - 1, n) / l * 100;
                        1 < o ? e.attr("colspan", o) : e.removeAttr("colspan"), 1 < t - o ? s.attr("colspan", t - o) : s.removeAttr("colspan"), e.css("width", a.toFixed(4) + "%"), s.css("width", i.toFixed(4) + "%")
                    } else {
                        var f;
                        for (f = 0; f < n.length; f++)
                            if (0 === f || n[f][r.col] != n[f - 1][r.col]) {
                                var c = Z(n[f][r.col]);
                                if (!c.is(e)) {
                                    var d = (parseInt(c.attr("colspan"), 10) || 1) + 1;
                                    c.attr("colspan", d)
                                }
                            }
                        a = a / l * 100 / 2, e.css("width", a.toFixed(4) + "%"), s.css("width", a.toFixed(4) + "%")
                    }
                    e.after(s), D(), w.popups.hide("table.edit")
                }
            },
            splitCellHorizontally: function() {
                if (1 == J().length) {
                    var e = w.$el.find(".fr-selected-cell"),
                        t = e.parent(),
                        l = e.closest("table"),
                        a = parseInt(e.attr("rowspan"), 10),
                        s = O(),
                        n = A(e.get(0), s),
                        r = e.clone().html("<br>");
                    if (1 < a) {
                        var o = Math.ceil(a / 2);
                        1 < o ? e.attr("rowspan", o) : e.removeAttr("rowspan"), 1 < a - o ? r.attr("rowspan", a - o) : r.removeAttr("rowspan");
                        for (var i = n.row + o, f = 0 === n.col ? n.col : n.col - 1; 0 <= f && (s[i][f] == s[i][f - 1] || 0 < i && s[i][f] == s[i - 1][f]);) f--; - 1 == f ? Z(l.find("tr").not(l.find("table tr")).get(i)).prepend(r) : Z(s[i][f]).after(r)
                    } else {
                        var c, d = Z("<tr>").append(r);
                        for (c = 0; c < s[0].length; c++)
                            if (0 === c || s[n.row][c] != s[n.row][c - 1]) {
                                var p = Z(s[n.row][c]);
                                p.is(e) || p.attr("rowspan", (parseInt(p.attr("rowspan"), 10) || 1) + 1)
                            }
                        t.after(d)
                    }
                    D(), w.popups.hide("table.edit")
                }
            },
            addHeader: function() {
                var e = Q();
                if (0 < e.length && 0 === e.find("th").length) {
                    var t, l = "<thead><tr>",
                        a = 0;
                    for (e.find("tr:first > td").each(function() {
                            var e = Z(this);
                            a += parseInt(e.attr("colspan"), 10) || 1
                        }), t = 0; t < a; t++) l += "<th><br></th>";
                    l += "</tr></thead>", e.prepend(l), h()
                }
            },
            removeHeader: function() {
                var e = Q(),
                    t = e.find("thead");
                if (0 < t.length)
                    if (0 === e.find("tbody tr").length) u();
                    else if (t.remove(), 0 < J().length) h();
                else {
                    w.popups.hide("table.edit");
                    var l = e.find("tbody tr:first td:first").get(0);
                    l && (w.selection.setAtEnd(l), w.selection.restore())
                }
            },
            setBackground: t,
            showInsertPopup: function() {
                var e = w.$tb.find('.fr-command[data-cmd="insertTable"]'),
                    t = w.popups.get("table.insert");
                if (t || (t = c()), !t.hasClass("fr-active")) {
                    w.popups.refresh("table.insert"), w.popups.setContainer("table.insert", w.$tb);
                    var l = e.offset().left + e.outerWidth() / 2,
                        a = e.offset().top + (w.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                    w.popups.show("table.insert", l, a, e.outerHeight())
                }
            },
            showEditPopup: h,
            showColorsPopup: f,
            back: function() {
                0 < J().length ? h() : (w.popups.hide("table.insert"), w.toolbar.showInline())
            },
            verticalAlign: function(e) {
                w.$el.find(".fr-selected-cell").css("vertical-align", e)
            },
            horizontalAlign: function(e) {
                w.$el.find(".fr-selected-cell").css("text-align", e)
            },
            applyStyle: function(e, t, l, a) {
                if (0 < t.length) {
                    if (!l) {
                        var s = Object.keys(a);
                        s.splice(s.indexOf(e), 1), t.removeClass(s.join(" "))
                    }
                    t.toggleClass(e)
                }
            },
            selectedTable: Q,
            selectedCells: J,
            customColor: function() {
                var e = w.popups.get("table.colors").find(".fr-table-colors-hex-layer input");
                e.length && t(e.val())
            },
            selectCells: _
        }
    }, Z.FE.DefineIcon("insertTable", {
        NAME: "table"
    }), Z.FE.RegisterCommand("insertTable", {
        title: "Insert Table",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("table.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("table.insert")) : this.table.showInsertPopup()
        },
        plugin: "table"
    }), Z.FE.RegisterCommand("tableInsert", {
        callback: function(e, t, l) {
            this.table.insert(t, l), this.popups.hide("table.insert")
        }
    }), Z.FE.DefineIcon("tableHeader", {
        NAME: "header",
        FA5NAME: "heading"
    }), Z.FE.RegisterCommand("tableHeader", {
        title: "Table Header",
        focus: !1,
        toggle: !0,
        callback: function() {
            this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]').hasClass("fr-active") ? this.table.removeHeader() : this.table.addHeader()
        },
        refresh: function(e) {
            var t = this.table.selectedTable();
            0 < t.length && (0 === t.find("th").length ? e.removeClass("fr-active").attr("aria-pressed", !1) : e.addClass("fr-active").attr("aria-pressed", !0))
        }
    }), Z.FE.DefineIcon("tableRows", {
        NAME: "bars"
    }), Z.FE.RegisterCommand("tableRows", {
        type: "dropdown",
        focus: !1,
        title: "Row",
        options: {
            above: "Insert row above",
            below: "Insert row below",
            "delete": "Delete row"
        },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = Z.FE.COMMANDS.tableRows.options;
            for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableRows" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(t[l]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) {
            "above" == t || "below" == t ? this.table.insertRow(t) : this.table.deleteRow()
        }
    }), Z.FE.DefineIcon("tableColumns", {
        NAME: "bars fa-rotate-90"
    }), Z.FE.RegisterCommand("tableColumns", {
        type: "dropdown",
        focus: !1,
        title: "Column",
        options: {
            before: "Insert column before",
            after: "Insert column after",
            "delete": "Delete column"
        },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = Z.FE.COMMANDS.tableColumns.options;
            for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableColumns" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(t[l]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) {
            "before" == t || "after" == t ? this.table.insertColumn(t) : this.table.deleteColumn()
        }
    }), Z.FE.DefineIcon("tableCells", {
        NAME: "square-o",
        FA5NAME: "square"
    }), Z.FE.RegisterCommand("tableCells", {
        type: "dropdown",
        focus: !1,
        title: "Cell",
        options: {
            merge: "Merge cells",
            "vertical-split": "Vertical split",
            "horizontal-split": "Horizontal split"
        },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = Z.FE.COMMANDS.tableCells.options;
            for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCells" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(t[l]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) {
            "merge" == t ? this.table.mergeCells() : "vertical-split" == t ? this.table.splitCellVertically() : this.table.splitCellHorizontally()
        },
        refreshOnShow: function(e, t) {
            1 < this.$el.find(".fr-selected-cell").length ? (t.find('a[data-param1="vertical-split"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="horizontal-split"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="merge"]').removeClass("fr-disabled").attr("aria-disabled", !1)) : (t.find('a[data-param1="merge"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="vertical-split"]').removeClass("fr-disabled").attr("aria-disabled", !1), t.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled").attr("aria-disabled", !1))
        }
    }), Z.FE.DefineIcon("tableRemove", {
        NAME: "trash"
    }), Z.FE.RegisterCommand("tableRemove", {
        title: "Remove Table",
        focus: !1,
        callback: function() {
            this.table.remove()
        }
    }), Z.FE.DefineIcon("tableStyle", {
        NAME: "paint-brush"
    }), Z.FE.RegisterCommand("tableStyle", {
        title: "Table Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.tableStyles;
            for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableStyle" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(t[l]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.table.applyStyle(t, this.$el.find(".fr-selected-cell").closest("table"), this.opts.tableMultipleStyles, this.opts.tableStyles)
        },
        refreshOnShow: function(e, t) {
            var l = this.$el.find(".fr-selected-cell").closest("table");
            l && t.find(".fr-command").each(function() {
                var e = Z(this).data("param1"),
                    t = l.hasClass(e);
                Z(this).toggleClass("fr-active", t).attr("aria-selected", t)
            })
        }
    }), Z.FE.DefineIcon("tableCellBackground", {
        NAME: "tint"
    }), Z.FE.RegisterCommand("tableCellBackground", {
        title: "Cell Background",
        focus: !1,
        popup: !0,
        callback: function() {
            this.table.showColorsPopup()
        }
    }), Z.FE.RegisterCommand("tableCellBackgroundColor", {
        undo: !0,
        focus: !1,
        callback: function(e, t) {
            this.table.setBackground(t)
        }
    }), Z.FE.DefineIcon("tableBack", {
        NAME: "arrow-left"
    }), Z.FE.RegisterCommand("tableBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function() {
            this.table.back()
        },
        refresh: function(e) {
            0 !== this.table.selectedCells().length || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
        }
    }), Z.FE.DefineIcon("tableCellVerticalAlign", {
        NAME: "arrows-v",
        FA5NAME: "arrows-alt-v"
    }), Z.FE.RegisterCommand("tableCellVerticalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Vertical Align",
        options: {
            Top: "Align Top",
            Middle: "Align Middle",
            Bottom: "Align Bottom"
        },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = Z.FE.COMMANDS.tableCellVerticalAlign.options;
            for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellVerticalAlign" data-param1="' + l.toLowerCase() + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(l) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.table.verticalAlign(t)
        },
        refreshOnShow: function(e, t) {
            t.find('.fr-command[data-param1="' + this.$el.find(".fr-selected-cell").css("vertical-align") + '"]').addClass("fr-active").attr("aria-selected", !0)
        }
    }), Z.FE.DefineIcon("tableCellHorizontalAlign", {
        NAME: "align-left"
    }), Z.FE.DefineIcon("align-left", {
        NAME: "align-left"
    }), Z.FE.DefineIcon("align-right", {
        NAME: "align-right"
    }), Z.FE.DefineIcon("align-center", {
        NAME: "align-center"
    }), Z.FE.DefineIcon("align-justify", {
        NAME: "align-justify"
    }), Z.FE.RegisterCommand("tableCellHorizontalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Horizontal Align",
        options: {
            left: "Align Left",
            center: "Align Center",
            right: "Align Right",
            justify: "Align Justify"
        },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = Z.FE.COMMANDS.tableCellHorizontalAlign.options;
            for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="tableCellHorizontalAlign" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.icon.create("align-" + l) + '<span class="fr-sr-only">' + this.language.translate(t[l]) + "</span></a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.table.horizontalAlign(t)
        },
        refresh: function(e) {
            var t = this.table.selectedCells();
            t.length && e.find("> *:first").replaceWith(this.icon.create("align-" + this.helpers.getAlignment(Z(t[0]))))
        },
        refreshOnShow: function(e, t) {
            t.find('.fr-command[data-param1="' + this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first")) + '"]').addClass("fr-active").attr("aria-selected", !0)
        }
    }), Z.FE.DefineIcon("tableCellStyle", {
        NAME: "magic"
    }), Z.FE.RegisterCommand("tableCellStyle", {
        title: "Cell Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.tableCellStyles;
            for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellStyle" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(t[l]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.table.applyStyle(t, this.$el.find(".fr-selected-cell"), this.opts.tableCellMultipleStyles, this.opts.tableCellStyles)
        },
        refreshOnShow: function(e, t) {
            var l = this.$el.find(".fr-selected-cell:first");
            l && t.find(".fr-command").each(function() {
                var e = Z(this).data("param1"),
                    t = l.hasClass(e);
                Z(this).toggleClass("fr-active", t).attr("aria-selected", t)
            })
        }
    }), Z.FE.RegisterCommand("tableCellBackgroundCustomColor", {
        title: "OK",
        undo: !0,
        callback: function() {
            this.table.customColor()
        }
    }), Z.FE.DefineIcon("tableColorRemove", {
        NAME: "eraser"
    })
});

/*!
 * lists Plugin
 */

! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t)
    } : n(window.jQuery)
}(function(u) {
    u.extend(u.FE.DEFAULTS, {
        listAdvancedTypes: !0
    }), u.FE.PLUGINS.lists = function(d) {
        function c(e) {
            return '<span class="fr-open-' + e.toLowerCase() + '"></span>'
        }

        function g(e) {
            return '<span class="fr-close-' + e.toLowerCase() + '"></span>'
        }

        function r(e, t) {
            ! function(e, t) {
                for (var n = [], a = 0; a < e.length; a++) {
                    var r = e[a].parentNode;
                    "LI" == e[a].tagName && r.tagName != t && n.indexOf(r) < 0 && n.push(r)
                }
                for (a = n.length - 1; 0 <= a; a--) {
                    var o = u(n[a]);
                    o.replaceWith("<" + t.toLowerCase() + " " + d.node.attributes(o.get(0)) + ">" + o.html() + "</" + t.toLowerCase() + ">")
                }
            }(e, t);
            var n, a = d.html.defaultTag(),
                r = null;
            e.length && (n = "rtl" == d.opts.direction || "rtl" == u(e[0]).css("direction") ? "margin-right" : "margin-left");
            for (var o = 0; o < e.length; o++)
                if ("TD" != e[o].tagName && "TH" != e[o].tagName && "LI" != e[o].tagName) {
                    var l = d.helpers.getPX(u(e[o]).css(n)) || 0;
                    (e[o].style.marginLeft = null) === r && (r = l);
                    var s = 0 < r ? "<" + t + ' style="' + n + ": " + r + 'px;">' : "<" + t + ">",
                        i = "</" + t + ">";
                    for (l -= r; 0 < l / d.opts.indentMargin;) s += "<" + t + ">", i += i, l -= d.opts.indentMargin;
                    a && e[o].tagName.toLowerCase() == a ? u(e[o]).replaceWith(s + "<li" + d.node.attributes(e[o]) + ">" + u(e[o]).html() + "</li>" + i) : u(e[o]).wrap(s + "<li></li>" + i)
                }
            d.clean.lists()
        }

        function o(e) {
            var t, n;
            for (t = e.length - 1; 0 <= t; t--)
                for (n = t - 1; 0 <= n; n--)
                    if (u(e[n]).find(e[t]).length || e[n] == e[t]) {
                        e.splice(t, 1);
                        break
                    }
            var a = [];
            for (t = 0; t < e.length; t++) {
                var r = u(e[t]),
                    o = e[t].parentNode,
                    l = r.attr("class");
                if (r.before(g(o.tagName)), "LI" == o.parentNode.tagName) r.before(g("LI")), r.after(c("LI"));
                else {
                    var s = "";
                    l && (s += ' class="' + l + '"');
                    var i = "rtl" == d.opts.direction || "rtl" == r.css("direction") ? "margin-right" : "margin-left";
                    d.helpers.getPX(u(o).css(i)) && 0 <= (u(o).attr("style") || "").indexOf(i + ":") && (s += ' style="' + i + ":" + d.helpers.getPX(u(o).css(i)) + 'px;"'), d.html.defaultTag() && 0 === r.find(d.html.blockTagsQuery()).length && r.wrapInner("<" + d.html.defaultTag() + s + "></" + d.html.defaultTag() + ">"), d.node.isEmpty(r.get(0), !0) || 0 !== r.find(d.html.blockTagsQuery()).length || r.append("<br>"), r.append(c("LI")), r.prepend(g("LI"))
                }
                r.after(c(o.tagName)), "LI" == o.parentNode.tagName && (o = o.parentNode.parentNode), a.indexOf(o) < 0 && a.push(o)
            }
            for (t = 0; t < a.length; t++) {
                var p = u(a[t]),
                    f = p.html();
                f = (f = f.replace(/<span class="fr-close-([a-z]*)"><\/span>/g, "</$1>")).replace(/<span class="fr-open-([a-z]*)"><\/span>/g, "<$1>"), p.replaceWith(d.node.openTagString(p.get(0)) + f + d.node.closeTagString(p.get(0)))
            }
            d.$el.find("li:empty").remove(), d.$el.find("ul:empty, ol:empty").remove(), d.clean.lists(), d.html.wrap()
        }

        function l(e) {
            d.selection.save();
            for (var t = 0; t < e.length; t++) {
                var n = e[t].previousSibling;
                if (n) {
                    var a = u(e[t]).find("> ul, > ol").last().get(0);
                    if (a) {
                        for (var r = u("<li>").prependTo(u(a)), o = d.node.contents(e[t])[0]; o && !d.node.isList(o);) {
                            var l = o.nextSibling;
                            r.append(o), o = l
                        }
                        u(n).append(u(a)), u(e[t]).remove()
                    } else {
                        var s = u(n).find("> ul, > ol").last().get(0);
                        if (s) u(s).append(u(e[t]));
                        else {
                            var i = u("<" + e[t].parentNode.tagName + ">");
                            u(n).append(i), i.append(u(e[t]))
                        }
                    }
                }
            }
            d.clean.lists(), d.selection.restore()
        }

        function s(e) {
            d.selection.save(), o(e), d.selection.restore()
        }

        function e(e) {
            if ("indent" == e || "outdent" == e) {
                for (var t = !1, n = d.selection.blocks(), a = [], r = 0; r < n.length; r++) "LI" == n[r].tagName ? (t = !0, a.push(n[r])) : "LI" == n[r].parentNode.tagName && (t = !0, a.push(n[r].parentNode));
                t && ("indent" == e ? l(a) : s(a))
            }
        }
        return {
            _init: function() {
                d.events.on("commands.after", e), d.events.on("keydown", function(e) {
                    if (e.which == u.FE.KEYCODE.TAB) {
                        for (var t = d.selection.blocks(), n = [], a = 0; a < t.length; a++) "LI" == t[a].tagName ? n.push(t[a]) : "LI" == t[a].parentNode.tagName && n.push(t[a].parentNode);
                        if (1 < n.length || n.length && (d.selection.info(n[0]).atStart || d.node.isEmpty(n[0]))) return e.preventDefault(), e.stopPropagation(), e.shiftKey ? s(n) : l(n), !1
                    }
                }, !0)
            },
            format: function(e, t) {
                var n, a;
                for (d.selection.save(), d.html.wrap(!0, !0, !0, !0), d.selection.restore(), a = d.selection.blocks(), n = 0; n < a.length; n++) "LI" != a[n].tagName && "LI" == a[n].parentNode.tagName && (a[n] = a[n].parentNode);
                if (d.selection.save(), function(e, t) {
                        for (var n = !0, a = 0; a < e.length; a++) {
                            if ("LI" != e[a].tagName) return !1;
                            e[a].parentNode.tagName != t && (n = !1)
                        }
                        return n
                    }(a, e) ? t || o(a) : r(a, e), d.html.unwrap(), d.selection.restore(), t = t || "default") {
                    for (a = d.selection.blocks(), n = 0; n < a.length; n++) "LI" != a[n].tagName && "LI" == a[n].parentNode.tagName && (a[n] = a[n].parentNode);
                    for (n = 0; n < a.length; n++) "LI" == a[n].tagName && (u(a[n].parentNode).css("list-style-type", "default" === t ? "" : t), 0 === (u(a[n].parentNode).attr("style") || "").length && u(a[n].parentNode).removeAttr("style"))
                }
            },
            refresh: function(e, t) {
                var n = u(d.selection.element());
                if (n.get(0) != d.el) {
                    var a = n.get(0);
                    (a = "LI" != a.tagName && a.firstElementChild && "LI" != a.firstElementChild.tagName ? n.parents("li").get(0) : "LI" == a.tagName || a.firstElementChild ? a.firstElementChild && "LI" == a.firstElementChild.tagName ? n.get(0).firstChild : n.get(0) : n.parents("li").get(0)) && a.parentNode.tagName == t && d.el.contains(a.parentNode) && e.addClass("fr-active")
                }
            }
        }
    }, u.FE.RegisterCommand("formatUL", {
        title: "Unordered List",
        type: "button",
        hasOptions: function() {
            return this.opts.listAdvancedTypes
        },
        options: {
            "default": "Default",
            circle: "Circle",
            disc: "Disc",
            square: "Square"
        },
        refresh: function(e) {
            this.lists.refresh(e, "UL")
        },
        callback: function(e, t) {
            this.lists.format("UL", t)
        },
        plugin: "lists"
    }), u.FE.RegisterCommand("formatOL", {
        title: "Ordered List",
        hasOptions: function() {
            return this.opts.listAdvancedTypes
        },
        options: {
            "default": "Default",
            "lower-alpha": "Lower Alpha",
            "lower-greek": "Lower Greek",
            "lower-roman": "Lower Roman",
            "upper-alpha": "Upper Alpha",
            "upper-roman": "Upper Roman"
        },
        refresh: function(e) {
            this.lists.refresh(e, "OL")
        },
        callback: function(e, t) {
            this.lists.format("OL", t)
        },
        plugin: "lists"
    }), u.FE.DefineIcon("formatUL", {
        NAME: "list-ul"
    }), u.FE.DefineIcon("formatOL", {
        NAME: "list-ol"
    })
});

/*!
 * line_breaker Plugin
 */

! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t)
    } : n(window.jQuery)
}(function(v) {
    v.extend(v.FE.DEFAULTS, {
        lineBreakerTags: ["table", "hr", "form", "dl", "span.fr-video", ".fr-embedly"],
        lineBreakerOffset: 15,
        lineBreakerHorizontalOffset: 10
    }), v.FE.PLUGINS.lineBreaker = function(d) {
        var g, t, a;

        function s(e, t) {
            var n, r, a, o, i, s, f, l;
            if (null == e) i = (o = t.parent()).offset().top, n = (f = t.offset().top) - Math.min((f - i) / 2, d.opts.lineBreakerOffset), a = o.outerWidth(), r = o.offset().left;
            else if (null == t)(s = (o = e.parent()).offset().top + o.outerHeight()) < (l = e.offset().top + e.outerHeight()) && (s = (o = v(o).parent()).offset().top + o.outerHeight()), n = l + Math.min(Math.abs(s - l) / 2, d.opts.lineBreakerOffset), a = o.outerWidth(), r = o.offset().left;
            else {
                o = e.parent();
                var p = e.offset().top + e.height(),
                    u = t.offset().top;
                if (u < p) return !1;
                n = (p + u) / 2, a = o.outerWidth(), r = o.offset().left
            }
            d.opts.iframe && (r += d.$iframe.offset().left - d.helpers.scrollLeft(), n += d.$iframe.offset().top - d.helpers.scrollTop()), d.$box.append(g), g.css("top", n - d.win.pageYOffset), g.css("left", r - d.win.pageXOffset), g.css("width", a), g.data("tag1", e), g.data("tag2", t), g.addClass("fr-visible").data("instance", d)
        }

        function f(e) {
            if (e) {
                var t = v(e);
                if (0 === d.$el.find(t).length) return null;
                if (e.nodeType != Node.TEXT_NODE && t.is(d.opts.lineBreakerTags.join(","))) return t;
                if (0 < t.parents(d.opts.lineBreakerTags.join(",")).length) return e = t.parents(d.opts.lineBreakerTags.join(",")).get(0), 0 !== d.$el.find(e).length && v(e).is(d.opts.lineBreakerTags.join(",")) ? v(e) : null
            }
            return null
        }

        function o(e, t) {
            var n = d.doc.elementFromPoint(e, t);
            return n && !v(n).closest(".fr-line-breaker").length && !d.node.isElement(n) && n != d.$wp.get(0) && function(e) {
                if ("undefined" != typeof e.inFroalaWrapper) return e.inFroalaWrapper;
                for (var t = e; e.parentNode && e.parentNode !== d.$wp.get(0);) e = e.parentNode;
                return t.inFroalaWrapper = e.parentNode == d.$wp.get(0), t.inFroalaWrapper
            }(n) ? n : null
        }

        function i(e, t, n) {
            for (var r = n, a = null; r <= d.opts.lineBreakerOffset && !a;)(a = o(e, t - r)) || (a = o(e, t + r)), r += n;
            return a
        }

        function l(e, t, n) {
            for (var r = null, a = 100; !r && e > d.$box.offset().left && e < d.$box.offset().left + d.$box.outerWidth() && 0 < a;)(r = o(e, t)) || (r = i(e, t, 5)), "left" == n ? e -= d.opts.lineBreakerHorizontalOffset : e += d.opts.lineBreakerHorizontalOffset, a -= d.opts.lineBreakerHorizontalOffset;
            return r
        }

        function n(e) {
            var t = a = null,
                n = null,
                r = d.doc.elementFromPoint(e.pageX - d.win.pageXOffset, e.pageY - d.win.pageYOffset);
            r && ("HTML" == r.tagName || "BODY" == r.tagName || d.node.isElement(r) || 0 <= (r.getAttribute("class") || "").indexOf("fr-line-breaker")) ? ((n = i(e.pageX - d.win.pageXOffset, e.pageY - d.win.pageYOffset, 1)) || (n = l(e.pageX - d.win.pageXOffset - d.opts.lineBreakerHorizontalOffset, e.pageY - d.win.pageYOffset, "left")), n || (n = l(e.pageX - d.win.pageXOffset + d.opts.lineBreakerHorizontalOffset, e.pageY - d.win.pageYOffset, "right")), t = f(n)) : t = f(r), t ? function(e, t) {
                var n, r, a = e.offset().top,
                    o = e.offset().top + e.outerHeight();
                if (Math.abs(o - t) <= d.opts.lineBreakerOffset || Math.abs(t - a) <= d.opts.lineBreakerOffset)
                    if (Math.abs(o - t) < Math.abs(t - a)) {
                        for (var i = (r = e.get(0)).nextSibling; i && i.nodeType == Node.TEXT_NODE && 0 === i.textContent.length;) i = i.nextSibling;
                        if (!i) return s(e, null);
                        if (n = f(i)) return s(e, n)
                    } else {
                        if (!(r = e.get(0)).previousSibling) return s(null, e);
                        if (n = f(r.previousSibling)) return s(n, e)
                    }
                g.removeClass("fr-visible").removeData("instance")
            }(t, e.pageY) : d.core.sameInstance(g) && g.removeClass("fr-visible").removeData("instance")
        }

        function e(e) {
            return !(g.hasClass("fr-visible") && !d.core.sameInstance(g)) && (d.popups.areVisible() || d.el.querySelector(".fr-selected-cell") ? (g.removeClass("fr-visible"), !0) : void(!1 !== t || d.edit.isDisabled() || (a && clearTimeout(a), a = setTimeout(n, 30, e))))
        }

        function r() {
            a && clearTimeout(a), g && g.hasClass("fr-visible") && g.removeClass("fr-visible").removeData("instance")
        }

        function p() {
            t = !0, r()
        }

        function u() {
            t = !1
        }

        function c(e) {
            e.preventDefault();
            var t = g.data("instance") || d;
            g.removeClass("fr-visible").removeData("instance");
            var n = g.data("tag1"),
                r = g.data("tag2"),
                a = d.html.defaultTag();
            null == n ? a && "TD" != r.parent().get(0).tagName && 0 === r.parents(a).length ? r.before("<" + a + ">" + v.FE.MARKERS + "<br></" + a + ">") : r.before(v.FE.MARKERS + "<br>") : a && "TD" != n.parent().get(0).tagName && 0 === n.parents(a).length ? n.after("<" + a + ">" + v.FE.MARKERS + "<br></" + a + ">") : n.after(v.FE.MARKERS + "<br>"), t.selection.restore()
        }
        return {
            _init: function() {
                if (!d.$wp) return !1;
                d.shared.$line_breaker || (d.shared.$line_breaker = v('<div class="fr-line-breaker"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + d.language.translate("Break") + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="21" y="11" width="2" height="8"/><rect x="14" y="17" width="7" height="2"/><path d="M14.000,14.000 L14.000,22.013 L9.000,18.031 L14.000,14.000 Z"/></svg></a></div>')), g = d.shared.$line_breaker, d.events.on("shared.destroy", function() {
                    g.html("").removeData().remove(), g = null
                }, !0), d.events.on("destroy", function() {
                    g.removeData("instance").removeClass("fr-visible").appendTo("body:first"), clearTimeout(a)
                }, !0), d.events.$on(g, "mousemove", function(e) {
                    e.stopPropagation()
                }, !0), d.events.bindClick(g, "a", c), t = !1, d.events.$on(d.$win, "mousemove", e), d.events.$on(v(d.win), "scroll", r), d.events.on("popups.show.table.edit", r), d.events.on("commands.after", r), d.events.$on(v(d.win), "mousedown", p), d.events.$on(v(d.win), "mouseup", u)
            }
        }
    }
});

/*!
 * fullscreen Plugin
 */

! function(o) {
    "function" == typeof define && define.amd ? define(["jquery"], o) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), o(t)
    } : o(window.jQuery)
}(function(c) {
    c.FE.PLUGINS.fullscreen = function(o) {
        var t, r, s, n;

        function i() {
            return o.$box.hasClass("fr-fullscreen")
        }

        function e() {

            heigbox = $('.fr-box').height();
            if (o.helpers.isIOS() && o.core.hasFocus()) return o.$el.blur(), setTimeout(f, 250), !1;
            t = o.helpers.scrollTop(), o.$box.toggleClass("fr-fullscreen"), c("body:first").toggleClass("fr-fullscreen"), o.helpers.isMobile() && (o.$tb.data("parent", o.$tb.parent()), o.$tb.prependTo(o.$box), o.$tb.data("sticky-dummy") && o.$tb.after(o.$tb.data("sticky-dummy"))), r = o.opts.height, s = o.opts.heightMax, n = o.opts.zIndex, o.position.refresh(), o.opts.height = o.o_win.innerHeight - (o.opts.toolbarInline ? 0 : o.$tb.outerHeight()), o.opts.zIndex = 999, o.opts.heightMax = null, o.size.refresh(), o.opts.toolbarInline && o.toolbar.showInline();
            for (var e = o.$box.parent(); !e.is("body:first");) e.addClass("fr-fullscreen-wrapper"), e = e.parent();
            o.opts.toolbarContainer && o.$box.prepend(o.$tb), o.events.trigger("charCounter.update"), o.events.trigger("codeView.update"), o.$win.trigger("scroll");
            window.scrollBy(0, document.documentElement.clientHeight);
            document.body.style.overflow = 'hidden';
            /*  	var frtool = $(".fr-toolbar");
              $(frtool).css('position','sticky');*/
            mfullscreen = true;
            /* var fot = $(".fr-wrapper"); 
             $(fot).css('height', $(fot).height()-130);
            */
            //  $('.fr-wrapper').css('top','30px');
            if (!editbol) {
                // $('.fr-wrapper').height($('.fr-wrapper').height()-29);

                $('.fr-element').height($('.fr-wrapper').height() - 31);
                // $('.fr-wrapper').css('max-height',$('.fr-wrapper').height()-29+'px');
                //   alert(document.location.href);


                if (getUrlVars()["stroka"] != 'ok') {
                    $('.fr-box').height(screen.height - 115);
                } else {
                    $('.fr-box').height(screen.height - 160);
                }
            }

            
            if (editbol) {

                $('.fr-box').css('top', '-23px');
                //       $('.fr-wrapper').height($('.fr-wrapper').height()-72);iziModal-wrap
               // $('.fr-element').height($('.fr-wrapper').height() - 31);

              //  $('.fr-box').height(screen.height - 158);
              
                if (getUrlVars()["stroka"] != 'ok') {
                    $('.fr-box').height(screen.height - 115);
                   // $('.fr-element').click();
                                    
                } else {
                    $('.fr-box').height(screen.height - 180);
                }

                //$('.fr-element').css('min-height','');
                
               // $('.fr-element').height($('.fr-box').height());
               // $('.fr-wrapper').css('overflow','hidden');
                $('.iziModal-wrap').css('overflow', 'hidden');
                //   alert($('.fr-box').height());
                //  $('.fr-wrapper').addClass('myclassfull');
            }

            $('.fr-counter').css('display','none');

            var divs = $('.wseditor'),
                layer = $('#layer');
            divs.css('z-index', 8);
            $(this).css('z-index', 10);
            layer.fadeIn('fast');

          //  $('.fr-element').click();
            //$('.fr-wrapper').css('-ms-overflow-style','none');screen.height
            //  $('.fr-box.fr-fullscreen').css('top','-50px');

        }

        function l() {

            if (o.helpers.isIOS() && o.core.hasFocus()) return o.$el.blur(), setTimeout(f, 250), !1;
            o.$box.toggleClass("fr-fullscreen"), c("body:first").toggleClass("fr-fullscreen"), o.$tb.prependTo(o.$tb.data("parent")), o.$tb.data("sticky-dummy") && o.$tb.after(o.$tb.data("sticky-dummy")), o.opts.height = r, o.opts.heightMax = s, o.opts.zIndex = n, o.size.refresh(), c(o.o_win).scrollTop(t), o.opts.toolbarInline && o.toolbar.showInline(), o.events.trigger("charCounter.update"), o.opts.toolbarSticky && o.opts.toolbarStickyOffset && (o.opts.toolbarBottom ? o.$tb.css("bottom", o.opts.toolbarStickyOffset).data("bottom", o.opts.toolbarStickyOffset) : o.$tb.css("top", o.opts.toolbarStickyOffset).data("top", o.opts.toolbarStickyOffset));
            for (var e = o.$box.parent(); !e.is("body:first");) e.removeClass("fr-fullscreen-wrapper"), e = e.parent();
            o.opts.toolbarContainer && c(o.opts.toolbarContainer).append(o.$tb), c(o.o_win).trigger("scroll"), o.events.trigger("codeView.update");
            document.body.style.overflow = 'visible';
            var qw = $(".fr-element");
            var wq = $(".fr-wrapper");
            mfullscreen = false;
            /*var frtool = $(".fr-toolbar");
        $(frtool).css('position','relative');*/
            /*          var first = getUrlVars()["stroka"];
              if (first){*/
            /*  var fot = $(".fr-wrapper"); 
              $(fot).css('height', '');
            */
            /* $('.fr-wrapper').removeClass('myclassfull');
                         $('.fr-wrapper').css('top','0');
              $('.fr-box.fr-fullscreen').css('top','0');*/
           //   $('.fr-counter').css('display','');
              $('.iziModal-wrap').css('overflow', '');
            if (!editbol) {
                $('.fr-box').height(heigbox);
                $('fr-counter').css('margin-right', '0px !important');
                //$(qw).css('min-height', '');

                $(qw).css('height', $(wq).height());
            } else {
                $('.fr-box').height(heigbox);
            }
            //$(qw).css('-ms-overflow-style', 'none');
            //$(qw).css('overflow', 'auto');
            // alert($(fot).height());
            // $(qw).attr('class','');

        }

        function f() {
            i() ? l() : e(), a(o.$tb.find('.fr-command[data-cmd="fullscreen"]'))
        }

        function a(e) {
            var t = i();
            e.toggleClass("fr-active", t).attr("aria-pressed", t), e.find("> *:not(.fr-sr-only)").replaceWith(t ? o.icon.create("fullscreenCompress") : o.icon.create("fullscreen"))
        }
        return {
            _init: function() {
                if (!o.$wp) return !1;
                o.events.$on(c(o.o_win), "resize", function() {
                    i() && (l(), e())
                }), o.events.on("toolbar.hide", function() {
                    if (i() && o.helpers.isMobile()) return !1
                }), o.events.on("position.refresh", function() {
                    if (o.helpers.isIOS()) return !i()
                }), o.events.on("destroy", function() {
                    i() && l()
                }, !0)
            },
            toggle: f,
            refresh: a,
            isActive: i
        }
    }, c.FE.RegisterCommand("fullscreen", {
        title: "Fullscreen",
        undo: !1,
        focus: !1,
        accessibilityFocus: !0,
        forcedRefresh: !0,
        toggle: !0,
        callback: function() {
            this.fullscreen.toggle();
        },
        refresh: function(e) {
            this.fullscreen.refresh(e)
        },
        plugin: "fullscreen"
    }), c.FE.DefineIcon("fullscreen", {
        NAME: "expand"
    }), c.FE.DefineIcon("fullscreenCompress", {
        NAME: "compress"
    })
});

/*!
 * code_view Plugin
 */


! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t)
    } : n(window.jQuery)
}(function(M) {
    M.extend(M.FE.DEFAULTS, {
        codeMirror: window.CodeMirror,
        codeMirrorOptions: {
            lineNumbers: !0,
            tabMode: "indent",
            indentWithTabs: !0,
            lineWrapping: !0,
            mode: "text/html",
            tabSize: 2
        },
        codeBeautifierOptions: {
            end_with_newline: !0,
            indent_inner_html: !0,
            extra_liners: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl"],
            brace_style: "expand",
            indent_char: "\t",
            indent_size: 1,
            wrap_line_length: 0
        },
        codeViewKeepActiveButtons: ["fullscreen"]
    }), M.FE.PLUGINS.codeView = function(l) {
        var d, c;

        function f() {
            return l.$box.hasClass("fr-code-view")
        }

        function h() {
            return c ? c.getValue() : d.val()
        }

        function u() {
            f() && (c && c.setSize(null, l.opts.height ? l.opts.height : "auto"), l.opts.heightMin || l.opts.height ? l.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", l.opts.heightMin || l.opts.height) : l.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", ""))
        }
        var p, g = !1;

        function m() {
            f() && l.events.trigger("blur")
        }

        function b() {
            f() && g && l.events.trigger("focus")
        }

        function s(e) {
            d || (! function() {
                d = M('<textarea class="fr-code" tabIndex="-1">'), l.$wp.append(d), d.attr("dir", l.opts.direction), l.$box.hasClass("fr-basic") || (p = M('<a data-cmd="html" title="Code View" class="fr-command fr-btn html-switch' + (l.helpers.isMobile() ? "" : " fr-desktop") + '" role="button" tabIndex="-1"><i class="fa fa-code"></i></button>'), l.$box.append(p), l.events.bindClick(l.$box, "a.html-switch", function() {
                    l.events.trigger("commands.before", ["html"]), v(!1), l.events.trigger("commands.after", ["html"])
                }));
                var e = function() {
                    return !f()
                };
                l.events.on("buttons.refresh", e), l.events.on("copy", e, !0), l.events.on("cut", e, !0), l.events.on("paste", e, !0), l.events.on("destroy", A, !0), l.events.on("html.set", function() {
                    f() && v(!0)
                }), l.events.on("codeView.update", u), l.events.on("form.submit", function() {
                    f() && (l.html.set(h()), l.events.trigger("contentChanged", [], !0))
                }, !0)
            }(), !c && l.opts.codeMirror ? ((c = l.opts.codeMirror.fromTextArea(d.get(0), l.opts.codeMirrorOptions)).on("blur", m), c.on("focus", b)) : (l.events.$on(d, "keydown keyup change input", function() {
                l.opts.height ? this.removeAttribute("rows") : (this.rows = 1, 0 === this.value.length ? this.style.height = "auto" : this.style.height = this.scrollHeight + "px")
            }), l.events.$on(d, "blur", m), l.events.$on(d, "focus", b))), l.undo.saveStep(), l.html.cleanEmptyTags(), l.html.cleanWhiteTags(!0), l.core.hasFocus() && (l.core.isEmpty() || (l.selection.save(), l.$el.find('.fr-marker[data-type="true"]:first').replaceWith('<span class="fr-tmp fr-sm">F</span>'), l.$el.find('.fr-marker[data-type="false"]:last').replaceWith('<span class="fr-tmp fr-em">F</span>')));
            var t = l.html.get(!1, !0);
            l.$el.find("span.fr-tmp").remove(), l.$box.toggleClass("fr-code-view", !0);
            var n, r, s = !1;
            if (l.core.hasFocus() && (s = !0, l.events.disableBlur(), l.$el.blur()), t = (t = t.replace(/<span class="fr-tmp fr-sm">F<\/span>/, "FROALA-SM")).replace(/<span class="fr-tmp fr-em">F<\/span>/, "FROALA-EM"), l.codeBeautifier && (t = l.codeBeautifier.run(t, l.opts.codeBeautifierOptions)), c) {
                n = t.indexOf("FROALA-SM"), (r = t.indexOf("FROALA-EM")) < n ? n = r : r -= 9;
                var i = (t = t.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).substring(0, n).length - t.substring(0, n).replace(/\n/g, "").length,
                    o = t.substring(0, r).length - t.substring(0, r).replace(/\n/g, "").length;
                n = t.substring(0, n).length - t.substring(0, t.substring(0, n).lastIndexOf("\n") + 1).length, r = t.substring(0, r).length - t.substring(0, t.substring(0, r).lastIndexOf("\n") + 1).length, c.setSize(null, l.opts.height ? l.opts.height : "auto"), l.opts.heightMin && l.$box.find(".CodeMirror-scroll").css("min-height", l.opts.heightMin), c.setValue(t), g = !s, c.focus(), g = !0, c.setSelection({
                    line: i,
                    ch: n
                }, {
                    line: o,
                    ch: r
                }), c.refresh(), c.clearHistory()
            } else {
                n = t.indexOf("FROALA-SM"), r = t.indexOf("FROALA-EM") - 9, l.opts.heightMin && d.css("min-height", l.opts.heightMin), l.opts.height && d.css("height", l.opts.height), d.val(t.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).trigger("change");
                var a = M(l.o_doc).scrollTop();
                g = !s, d.focus(), g = !0, d.get(0).setSelectionRange(n, r), M(l.o_doc).scrollTop(a)
            }
            l.$tb.find(" > .fr-command, > .fr-btn-wrap > .fr-command").not(e).filter(function() {
                return l.opts.codeViewKeepActiveButtons.indexOf(M(this).data("cmd")) < 0
            }).addClass("fr-disabled").attr("aria-disabled", !0), e.addClass("fr-active").attr("aria-pressed", !0), !l.helpers.isMobile() && l.opts.toolbarInline && l.toolbar.hide()
        }

        function v(e) {
            void 0 === e && (e = !f());
            var t, n, r = l.$tb.find('.fr-command[data-cmd="html"]');
            e ? (l.popups.hideAll(), s(r)) : (l.$box.toggleClass("fr-code-view", !1), t = r, n = h(), l.html.set(n), l.$el.blur(), l.$tb.find(" > .fr-command, > .fr-btn-wrap > .fr-command").not(t).removeClass("fr-disabled").attr("aria-disabled", !1), t.removeClass("fr-active").attr("aria-pressed", !1), l.selection.setAtStart(l.el), l.selection.restore(), l.placeholder.refresh(), l.undo.saveStep())
        }

        function A() {
            f() && v(!1), c && c.toTextArea(), d.val("").removeData().remove(), d = null, p && (p.remove(), p = null)

        }
        return {
            _init: function() {
                if (l.events.on("focus", function() {
                        var e;
                        var $qw = $('.wseditor');
                        $qw.addClass('wseditorshadow');
                        l.opts.toolbarContainer && (e = l.$tb.find('.fr-command[data-cmd="html"]'), f() ? (l.$tb.find(" > .fr-command").not(e).filter(function() {
                            return l.opts.codeViewKeepActiveButtons.indexOf(M(this).data("cmd")) < 0
                        }).addClass("fr-disabled").attr("aria-disabled", !1), e.addClass("fr-active").attr("aria-pressed", !1)) : (l.$tb.find(" > .fr-command").not(e).removeClass("fr-disabled").attr("aria-disabled", !1), e.removeClass("fr-active").attr("aria-pressed", !1)))
                    }), !l.$wp) return !1
            },
            toggle: v,
            isActive: f,
            get: h
        }
    }, M.FE.RegisterCommand("html", {
        title: "Code View",
        undo: !1,
        focus: !1,
        forcedRefresh: !0,
        toggle: !0,
        callback: function() {
            this.codeView.toggle()
        },
        plugin: "codeView"
    }), M.FE.DefineIcon("html", {
        NAME: "code"
    })
});

/*!
 * code_beautifier Plugin
 */

! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t)
    } : n(window.jQuery)
}(function(e) {
    e.FE.PLUGINS.codeBeautifier = function() {
        var e, t, n, i, X = {};

        function k(i, e) {
            var t = {
                    "@page": !0,
                    "@font-face": !0,
                    "@keyframes": !0,
                    "@media": !0,
                    "@supports": !0,
                    "@document": !0
                },
                n = {
                    "@media": !0,
                    "@supports": !0,
                    "@document": !0
                };
            e = e || {}, i = (i = i || "").replace(/\r\n|[\r\u2028\u2029]/g, "\n");
            var r = e.indent_size || 4,
                s = e.indent_char || " ",
                _ = e.selector_separator_newline === undefined || e.selector_separator_newline,
                a = e.end_with_newline !== undefined && e.end_with_newline,
                o = e.newline_between_rules === undefined || e.newline_between_rules,
                l = e.eol ? e.eol : "\n";
            "string" == typeof r && (r = parseInt(r, 10)), e.indent_with_tabs && (s = "\t", r = 1), l = l.replace(/\\r/, "\r").replace(/\\n/, "\n");
            var h, c = /^\s+$/,
                u = -1,
                p = 0;

            function d() {
                return (h = i.charAt(++u)) || ""
            }

            function f(e) {
                var t, n = u;
                return e && E(), t = i.charAt(u + 1) || "", u = n - 1, d(), t
            }

            function T(e) {
                for (var t = u; d();)
                    if ("\\" === h) d();
                    else {
                        if (-1 !== e.indexOf(h)) break;
                        if ("\n" === h) break
                    }
                return i.substring(t, u + 1)
            }

            function E() {
                for (var e = ""; c.test(f());) d(), e += h;
                return e
            }

            function g() {
                var e = "";
                for (h && c.test(h) && (e = h); c.test(d());) e += h;
                return e
            }

            function x(e) {
                var t = u;
                for (e = "/" === f(), d(); d();) {
                    if (!e && "*" === h && "/" === f()) {
                        d();
                        break
                    }
                    if (e && "\n" === h) return i.substring(t, u)
                }
                return i.substring(t, u) + h
            }

            function w(e) {
                return i.substring(u - e.length, u).toLowerCase() === e
            }

            function K() {
                for (var e = 0, t = u + 1; t < i.length; t++) {
                    var n = i.charAt(t);
                    if ("{" === n) return !0;
                    if ("(" === n) e += 1;
                    else if (")" === n) {
                        if (0 == e) return !1;
                        e -= 1
                    } else if (";" === n || "}" === n) return !1
                }
                return !1
            }
            var m = i.match(/^[\t ]*/)[0],
                R = new Array(r + 1).join(s),
                b = 0,
                v = 0;
            for (var S, A, k = {
                    "{": function(e) {
                        k.singleSpace(), y.push(e), k.newLine()
                    },
                    "}": function(e) {
                        k.newLine(), y.push(e), k.newLine()
                    },
                    _lastCharWhitespace: function() {
                        return c.test(y[y.length - 1])
                    },
                    newLine: function(e) {
                        y.length && (e || "\n" === y[y.length - 1] || k.trim(), y.push("\n"), m && y.push(m))
                    },
                    singleSpace: function() {
                        y.length && !k._lastCharWhitespace() && y.push(" ")
                    },
                    preserveSingleSpace: function() {
                        V && k.singleSpace()
                    },
                    trim: function() {
                        for (; k._lastCharWhitespace();) y.pop()
                    }
                }, y = [], O = !1, N = !1, D = !1, C = "", L = "";;) {
                var I = g(),
                    V = "" !== I,
                    P = -1 !== I.indexOf("\n");
                if (L = C, !(C = h)) break;
                if ("/" === h && "*" === f()) {
                    var j = 0 === b;
                    (P || j) && k.newLine(), y.push(x()), k.newLine(), j && k.newLine(!0)
                } else if ("/" === h && "/" === f()) P || "{" === L || k.trim(), k.singleSpace(), y.push(x()), k.newLine();
                else if ("@" === h) {
                    k.preserveSingleSpace(), y.push(h);
                    var B = (void 0, S = u, A = T(": ,;{}()[]/='\""), u = S - 1, d(), A);
                    B.match(/[ :]$/) && (d(), B = T(": ").replace(/\s$/, ""), y.push(B), k.singleSpace()), (B = B.replace(/\s$/, "")) in t && (v += 1, B in n && (D = !0))
                } else "#" === h && "{" === f() ? (k.preserveSingleSpace(), y.push(T("}"))) : "{" === h ? "}" === f(!0) ? (E(), d(), k.singleSpace(), y.push("{}"), k.newLine(), o && 0 === b && k.newLine(!0)) : (b++, m += R, k["{"](h), D ? (D = !1, O = v < b) : O = v <= b) : "}" === h ? (b--, m = m.slice(0, -r), k["}"](h), N = O = !1, v && v--, o && 0 === b && k.newLine(!0)) : ":" === h ? (E(), !O && !D || w("&") || K() ? ":" === f() ? (d(), y.push("::")) : y.push(":") : (N = !0, y.push(":"), k.singleSpace())) : '"' === h || "'" === h ? (k.preserveSingleSpace(), y.push(T(h))) : ";" === h ? (N = !1, y.push(h), k.newLine()) : "(" === h ? w("url") ? (y.push(h), E(), d() && (")" !== h && '"' !== h && "'" !== h ? y.push(T(")")) : u--)) : (p++, k.preserveSingleSpace(), y.push(h), E()) : ")" === h ? (y.push(h), p--) : "," === h ? (y.push(h), E(), _ && !N && p < 1 ? k.newLine() : k.singleSpace()) : ("]" === h || ("[" === h ? k.preserveSingleSpace() : "=" === h ? (E(), h = "=") : k.preserveSingleSpace()), y.push(h))
            }
            var M = "";
            return m && (M += m), M += y.join("").replace(/[\r\n\t ]+$/, ""), a && (M += "\n"), "\n" != l && (M = M.replace(/[\n]/g, l)), M
        }

        function F(e, t) {
            for (var n = 0; n < t.length; n += 1)
                if (t[n] === e) return !0;
            return !1
        }

        function $(e) {
            return e.replace(/^\s+|\s+$/g, "")
        }

        function y(e, t) {
            return new r(e, t).beautify()
        }
        e = X, t = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc", n = new RegExp("[" + t + "]"), i = new RegExp("[" + t + "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f]"), e.newline = /[\n\r\u2028\u2029]/, e.lineBreak = new RegExp("\r\n|" + e.newline.source), e.allLineBreaks = new RegExp(e.lineBreak.source, "g"), e.isIdentifierStart = function(e) {
            return e < 65 ? 36 === e || 64 === e : e < 91 || (e < 97 ? 95 === e : e < 123 || 170 <= e && n.test(String.fromCharCode(e)))
        }, e.isIdentifierChar = function(e) {
            return e < 48 ? 36 === e : e < 58 || !(e < 65) && (e < 91 || (e < 97 ? 95 === e : e < 123 || 170 <= e && i.test(String.fromCharCode(e))))
        };
        var L = {
            BlockStatement: "BlockStatement",
            Statement: "Statement",
            ObjectLiteral: "ObjectLiteral",
            ArrayLiteral: "ArrayLiteral",
            ForInitializer: "ForInitializer",
            Conditional: "Conditional",
            Expression: "Expression"
        };

        function r(i, e) {
            var _, r, s, a, o, l, h, c, u, t, n, p, d, f = [],
                T = "";

            function E(e, t) {
                var n = 0;
                return e && (n = e.indentation_level, !_.just_added_newline() && e.line_indent_level > n && (n = e.line_indent_level)), {
                    mode: t,
                    parent: e,
                    last_text: e ? e.last_text : "",
                    last_word: e ? e.last_word : "",
                    declaration_statement: !1,
                    declaration_assignment: !1,
                    multiline_frame: !1,
                    if_block: !1,
                    else_block: !1,
                    do_block: !1,
                    do_while: !1,
                    in_case_statement: !1,
                    in_case: !1,
                    case_body: !1,
                    indentation_level: n,
                    line_indent_level: e ? e.line_indent_level : n,
                    start_line_index: _.get_line_number(),
                    ternary_depth: 0
                }
            }
            for (p = {
                    TK_START_EXPR: function() {
                        O();
                        var e = L.Expression;
                        if ("[" === a.text) {
                            if ("TK_WORD" === o || ")" === c.last_text) return "TK_RESERVED" === o && F(c.last_text, s.line_starters) && (_.space_before_token = !0), v(e), R(), b(), void(d.space_in_paren && (_.space_before_token = !0));
                            e = L.ArrayLiteral, S(c.mode) && ("[" !== c.last_text && ("," !== c.last_text || "]" !== l && "}" !== l) || d.keep_array_indentation || K())
                        } else "TK_RESERVED" === o && "for" === c.last_text ? e = L.ForInitializer : "TK_RESERVED" === o && F(c.last_text, ["if", "while"]) && (e = L.Conditional);
                        ";" === c.last_text || "TK_START_BLOCK" === o ? K() : "TK_END_EXPR" === o || "TK_START_EXPR" === o || "TK_END_BLOCK" === o || "." === c.last_text ? w(a.wanted_newline) : "TK_RESERVED" === o && "(" === a.text || "TK_WORD" === o || "TK_OPERATOR" === o ? "TK_RESERVED" === o && ("function" === c.last_word || "typeof" === c.last_word) || "*" === c.last_text && "function" === l ? d.space_after_anon_function && (_.space_before_token = !0) : "TK_RESERVED" !== o || !F(c.last_text, s.line_starters) && "catch" !== c.last_text || d.space_before_conditional && (_.space_before_token = !0) : _.space_before_token = !0;
                        "(" === a.text && "TK_RESERVED" === o && "await" === c.last_word && (_.space_before_token = !0);
                        "(" === a.text && ("TK_EQUALS" !== o && "TK_OPERATOR" !== o || y() || w());
                        v(e), R(), d.space_in_paren && (_.space_before_token = !0);
                        b()
                    },
                    TK_END_EXPR: function() {
                        for (; c.mode === L.Statement;) k();
                        c.multiline_frame && w("]" === a.text && S(c.mode) && !d.keep_array_indentation);
                        d.space_in_paren && ("TK_START_EXPR" !== o || d.space_in_empty_paren ? _.space_before_token = !0 : (_.trim(), _.space_before_token = !1));
                        "]" === a.text && d.keep_array_indentation ? (R(), k()) : (k(), R());
                        _.remove_redundant_indentation(u), c.do_while && u.mode === L.Conditional && (u.mode = L.Expression, c.do_block = !1, c.do_while = !1)
                    },
                    TK_START_BLOCK: function() {
                        var e = D(1),
                            t = D(2);
                        t && (":" === t.text && F(e.type, ["TK_STRING", "TK_WORD", "TK_RESERVED"]) || F(e.text, ["get", "set"]) && F(t.type, ["TK_WORD", "TK_RESERVED"])) ? F(l, ["class", "interface"]) ? v(L.BlockStatement) : v(L.ObjectLiteral) : v(L.BlockStatement);
                        var n = !e.comments_before.length && "}" === e.text && "function" === c.last_word && "TK_END_EXPR" === o;
                        "expand" === d.brace_style || "none" === d.brace_style && a.wanted_newline ? "TK_OPERATOR" !== o && (n || "TK_EQUALS" === o || "TK_RESERVED" === o && N(c.last_text) && "else" !== c.last_text) ? _.space_before_token = !0 : K(!1, !0) : "TK_OPERATOR" !== o && "TK_START_EXPR" !== o ? "TK_START_BLOCK" === o ? K() : _.space_before_token = !0 : S(u.mode) && "," === c.last_text && ("}" === l ? _.space_before_token = !0 : K());
                        R(), b()
                    },
                    TK_END_BLOCK: function() {
                        for (; c.mode === L.Statement;) k();
                        var e = "TK_START_BLOCK" === o;
                        "expand" === d.brace_style ? e || K() : e || (S(c.mode) && d.keep_array_indentation ? (d.keep_array_indentation = !1, K(), d.keep_array_indentation = !0) : K());
                        k(), R()
                    },
                    TK_WORD: C,
                    TK_RESERVED: C,
                    TK_SEMICOLON: function() {
                        O() && (_.space_before_token = !1);
                        for (; c.mode === L.Statement && !c.if_block && !c.do_block;) k();
                        R()
                    },
                    TK_STRING: function() {
                        O() ? _.space_before_token = !0 : "TK_RESERVED" === o || "TK_WORD" === o ? _.space_before_token = !0 : "TK_COMMA" === o || "TK_START_EXPR" === o || "TK_EQUALS" === o || "TK_OPERATOR" === o ? y() || w() : K();
                        R()
                    },
                    TK_EQUALS: function() {
                        O();
                        c.declaration_statement && (c.declaration_assignment = !0);
                        _.space_before_token = !0, R(), _.space_before_token = !0
                    },
                    TK_OPERATOR: function() {
                        O();
                        if ("TK_RESERVED" === o && N(c.last_text)) return _.space_before_token = !0, void R();
                        if ("*" === a.text && "TK_DOT" === o) return void R();
                        if (":" === a.text && c.in_case) return c.case_body = !0, b(), R(), K(), void(c.in_case = !1);
                        if ("::" === a.text) return void R();
                        "TK_OPERATOR" === o && w();
                        var e = !0,
                            t = !0;
                        F(a.text, ["--", "++", "!", "~"]) || F(a.text, ["-", "+"]) && (F(o, ["TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS", "TK_OPERATOR"]) || F(c.last_text, s.line_starters) || "," === c.last_text) ? (t = e = !1, !a.wanted_newline || "--" !== a.text && "++" !== a.text || K(!1, !0), ";" === c.last_text && A(c.mode) && (e = !0), "TK_RESERVED" === o ? e = !0 : "TK_END_EXPR" === o ? e = !("]" === c.last_text && ("--" === a.text || "++" === a.text)) : "TK_OPERATOR" === o && (e = F(a.text, ["--", "-", "++", "+"]) && F(c.last_text, ["--", "-", "++", "+"]), F(a.text, ["+", "-"]) && F(c.last_text, ["--", "++"]) && (t = !0)), c.mode !== L.BlockStatement && c.mode !== L.Statement || "{" !== c.last_text && ";" !== c.last_text || K()) : ":" === a.text ? 0 === c.ternary_depth ? e = !1 : c.ternary_depth -= 1 : "?" === a.text ? c.ternary_depth += 1 : "*" === a.text && "TK_RESERVED" === o && "function" === c.last_text && (t = e = !1);
                        _.space_before_token = _.space_before_token || e, R(), _.space_before_token = t
                    },
                    TK_COMMA: function() {
                        if (c.declaration_statement) return A(c.parent.mode) && (c.declaration_assignment = !1), R(), void(c.declaration_assignment ? K(c.declaration_assignment = !1, !0) : (_.space_before_token = !0, d.comma_first && w()));
                        R(), c.mode === L.ObjectLiteral || c.mode === L.Statement && c.parent.mode === L.ObjectLiteral ? (c.mode === L.Statement && k(), K()) : (_.space_before_token = !0, d.comma_first && w())
                    },
                    TK_BLOCK_COMMENT: function() {
                        if (_.raw) return _.add_raw_token(a), void(a.directives && "end" === a.directives.preserve && (d.test_output_raw || (_.raw = !1)));
                        if (a.directives) return K(!1, !0), R(), "start" === a.directives.preserve && (_.raw = !0), void K(!1, !0);
                        if (!X.newline.test(a.text) && !a.wanted_newline) return _.space_before_token = !0, R(), void(_.space_before_token = !0);
                        var e, t = function(e) {
                                e = e.replace(/\x0d/g, "");
                                var t = [],
                                    n = e.indexOf("\n");
                                for (; - 1 !== n;) t.push(e.substring(0, n)), e = e.substring(n + 1), n = e.indexOf("\n");
                                e.length && t.push(e);
                                return t
                            }(a.text),
                            n = !1,
                            i = !1,
                            r = a.whitespace_before,
                            s = r.length;
                        K(!1, !0), 1 < t.length && (! function(e, t) {
                            for (var n = 0; n < e.length; n++) {
                                var i = $(e[n]);
                                if (i.charAt(0) !== t) return !1
                            }
                            return !0
                        }(t.slice(1), "*") ? function(e, t) {
                            for (var n, i = 0, r = e.length; i < r; i++)
                                if ((n = e[i]) && 0 !== n.indexOf(t)) return !1;
                            return !0
                        }(t.slice(1), r) && (i = !0) : n = !0);
                        for (R(t[0]), e = 1; e < t.length; e++) K(!1, !0), n ? R(" " + t[e].replace(/^\s+/g, "")) : i && t[e].length > s ? R(t[e].substring(s)) : _.add_token(t[e]);
                        K(!1, !0)
                    },
                    TK_COMMENT: function() {
                        a.wanted_newline ? K(!1, !0) : _.trim(!0);
                        _.space_before_token = !0, R(), K(!1, !0)
                    },
                    TK_DOT: function() {
                        O();
                        "TK_RESERVED" === o && N(c.last_text) ? _.space_before_token = !0 : w(")" === c.last_text && d.break_chained_methods);
                        R()
                    },
                    TK_UNKNOWN: function() {
                        R(), "\n" === a.text[a.text.length - 1] && K()
                    },
                    TK_EOF: function() {
                        for (; c.mode === L.Statement;) k()
                    }
                }, d = {}, (e = e || {}).braces_on_own_line !== undefined && (d.brace_style = e.braces_on_own_line ? "expand" : "collapse"), d.brace_style = e.brace_style ? e.brace_style : d.brace_style ? d.brace_style : "collapse", "expand-strict" === d.brace_style && (d.brace_style = "expand"), d.indent_size = e.indent_size ? parseInt(e.indent_size, 10) : 4, d.indent_char = e.indent_char ? e.indent_char : " ", d.eol = e.eol ? e.eol : "\n", d.preserve_newlines = e.preserve_newlines === undefined || e.preserve_newlines, d.break_chained_methods = e.break_chained_methods !== undefined && e.break_chained_methods, d.max_preserve_newlines = e.max_preserve_newlines === undefined ? 0 : parseInt(e.max_preserve_newlines, 10), d.space_in_paren = e.space_in_paren !== undefined && e.space_in_paren, d.space_in_empty_paren = e.space_in_empty_paren !== undefined && e.space_in_empty_paren, d.jslint_happy = e.jslint_happy !== undefined && e.jslint_happy, d.space_after_anon_function = e.space_after_anon_function !== undefined && e.space_after_anon_function, d.keep_array_indentation = e.keep_array_indentation !== undefined && e.keep_array_indentation, d.space_before_conditional = e.space_before_conditional === undefined || e.space_before_conditional, d.unescape_strings = e.unescape_strings !== undefined && e.unescape_strings, d.wrap_line_length = e.wrap_line_length === undefined ? 0 : parseInt(e.wrap_line_length, 10), d.e4x = e.e4x !== undefined && e.e4x, d.end_with_newline = e.end_with_newline !== undefined && e.end_with_newline, d.comma_first = e.comma_first !== undefined && e.comma_first, d.test_output_raw = e.test_output_raw !== undefined && e.test_output_raw, d.jslint_happy && (d.space_after_anon_function = !0), e.indent_with_tabs && (d.indent_char = "\t", d.indent_size = 1), d.eol = d.eol.replace(/\\r/, "\r").replace(/\\n/, "\n"), h = ""; 0 < d.indent_size;) h += d.indent_char, d.indent_size -= 1;
            var g = 0;
            if (i && i.length) {
                for (;
                    " " === i.charAt(g) || "\t" === i.charAt(g);) T += i.charAt(g), g += 1;
                i = i.substring(g)
            }

            function x(e) {
                var t = e.newlines;
                if (d.keep_array_indentation && S(c.mode))
                    for (n = 0; n < t; n += 1) K(0 < n);
                else if (d.max_preserve_newlines && t > d.max_preserve_newlines && (t = d.max_preserve_newlines), d.preserve_newlines && 1 < e.newlines) {
                    K();
                    for (var n = 1; n < t; n += 1) K(!0)
                }
                p[(a = e).type]()
            }

            function w(e) {
                if (e = e !== undefined && e, !_.just_added_newline())
                    if (d.preserve_newlines && a.wanted_newline || e) K(!1, !0);
                    else if (d.wrap_line_length) {
                    _.current_line.get_character_count() + a.text.length + (_.space_before_token ? 1 : 0) >= d.wrap_line_length && K(!1, !0)
                }
            }

            function K(e, t) {
                if (!t && ";" !== c.last_text && "," !== c.last_text && "=" !== c.last_text && "TK_OPERATOR" !== o)
                    for (; c.mode === L.Statement && !c.if_block && !c.do_block;) k();
                _.add_new_line(e) && (c.multiline_frame = !0)
            }

            function m() {
                _.just_added_newline() && (d.keep_array_indentation && S(c.mode) && a.wanted_newline ? (_.current_line.push(a.whitespace_before), _.space_before_token = !1) : _.set_indent(c.indentation_level) && (c.line_indent_level = c.indentation_level))
            }

            function R(e) {
                _.raw ? _.add_raw_token(a) : (d.comma_first && "TK_COMMA" === o && _.just_added_newline() && "," === _.previous_line.last() && (_.previous_line.pop(), m(), _.add_token(","), _.space_before_token = !0), e = e || a.text, m(), _.add_token(e))
            }

            function b() {
                c.indentation_level += 1
            }

            function v(e) {
                c ? (t.push(c), u = c) : u = E(null, e), c = E(u, e)
            }

            function S(e) {
                return e === L.ArrayLiteral
            }

            function A(e) {
                return F(e, [L.Expression, L.ForInitializer, L.Conditional])
            }

            function k() {
                0 < t.length && (u = c, c = t.pop(), u.mode === L.Statement && _.remove_redundant_indentation(u))
            }

            function y() {
                return c.parent.mode === L.ObjectLiteral && c.mode === L.Statement && (":" === c.last_text && 0 === c.ternary_depth || "TK_RESERVED" === o && F(c.last_text, ["get", "set"]))
            }

            function O() {
                return !!("TK_RESERVED" === o && F(c.last_text, ["var", "let", "const"]) && "TK_WORD" === a.type || "TK_RESERVED" === o && "do" === c.last_text || "TK_RESERVED" === o && "return" === c.last_text && !a.wanted_newline || "TK_RESERVED" === o && "else" === c.last_text && ("TK_RESERVED" !== a.type || "if" !== a.text) || "TK_END_EXPR" === o && (u.mode === L.ForInitializer || u.mode === L.Conditional) || "TK_WORD" === o && c.mode === L.BlockStatement && !c.in_case && "--" !== a.text && "++" !== a.text && "function" !== l && "TK_WORD" !== a.type && "TK_RESERVED" !== a.type || c.mode === L.ObjectLiteral && (":" === c.last_text && 0 === c.ternary_depth || "TK_RESERVED" === o && F(c.last_text, ["get", "set"]))) && (v(L.Statement), b(), "TK_RESERVED" === o && F(c.last_text, ["var", "let", "const"]) && "TK_WORD" === a.type && (c.declaration_statement = !0), y() || w("TK_RESERVED" === a.type && F(a.text, ["do", "for", "if", "while"])), !0)
            }

            function N(e) {
                return F(e, ["case", "return", "do", "if", "throw", "else"])
            }

            function D(e) {
                var t = r + (e || 0);
                return t < 0 || t >= f.length ? null : f[t]
            }

            function C() {
                ("TK_RESERVED" === a.type && c.mode !== L.ObjectLiteral && F(a.text, ["set", "get"]) && (a.type = "TK_WORD"), "TK_RESERVED" === a.type && c.mode === L.ObjectLiteral) && (":" == D(1).text && (a.type = "TK_WORD"));
                if (O() || !a.wanted_newline || A(c.mode) || "TK_OPERATOR" === o && "--" !== c.last_text && "++" !== c.last_text || "TK_EQUALS" === o || !d.preserve_newlines && "TK_RESERVED" === o && F(c.last_text, ["var", "let", "const", "set", "get"]) || K(), c.do_block && !c.do_while) {
                    if ("TK_RESERVED" === a.type && "while" === a.text) return _.space_before_token = !0, R(), _.space_before_token = !0, void(c.do_while = !0);
                    K(), c.do_block = !1
                }
                if (c.if_block)
                    if (c.else_block || "TK_RESERVED" !== a.type || "else" !== a.text) {
                        for (; c.mode === L.Statement;) k();
                        c.if_block = !1, c.else_block = !1
                    } else c.else_block = !0;
                if ("TK_RESERVED" === a.type && ("case" === a.text || "default" === a.text && c.in_case_statement)) return K(), (c.case_body || d.jslint_happy) && (0 < c.indentation_level && (!c.parent || c.indentation_level > c.parent.indentation_level) && (c.indentation_level -= 1), c.case_body = !1), R(), c.in_case = !0, void(c.in_case_statement = !0);
                if ("TK_RESERVED" === a.type && "function" === a.text && ((F(c.last_text, ["}", ";"]) || _.just_added_newline() && !F(c.last_text, ["[", "{", ":", "=", ","])) && (_.just_added_blankline() || a.comments_before.length || (K(), K(!0))), "TK_RESERVED" === o || "TK_WORD" === o ? "TK_RESERVED" === o && F(c.last_text, ["get", "set", "new", "return", "export", "async"]) ? _.space_before_token = !0 : "TK_RESERVED" === o && "default" === c.last_text && "export" === l ? _.space_before_token = !0 : K() : "TK_OPERATOR" === o || "=" === c.last_text ? _.space_before_token = !0 : (c.multiline_frame || !A(c.mode) && !S(c.mode)) && K()), "TK_COMMA" !== o && "TK_START_EXPR" !== o && "TK_EQUALS" !== o && "TK_OPERATOR" !== o || y() || w(), "TK_RESERVED" === a.type && F(a.text, ["function", "get", "set"])) return R(), void(c.last_word = a.text);
                (n = "NONE", "TK_END_BLOCK" === o ? "TK_RESERVED" === a.type && F(a.text, ["else", "catch", "finally"]) ? "expand" === d.brace_style || "end-expand" === d.brace_style || "none" === d.brace_style && a.wanted_newline ? n = "NEWLINE" : (n = "SPACE", _.space_before_token = !0) : n = "NEWLINE" : "TK_SEMICOLON" === o && c.mode === L.BlockStatement ? n = "NEWLINE" : "TK_SEMICOLON" === o && A(c.mode) ? n = "SPACE" : "TK_STRING" === o ? n = "NEWLINE" : "TK_RESERVED" === o || "TK_WORD" === o || "*" === c.last_text && "function" === l ? n = "SPACE" : "TK_START_BLOCK" === o ? n = "NEWLINE" : "TK_END_EXPR" === o && (_.space_before_token = !0, n = "NEWLINE"), "TK_RESERVED" === a.type && F(a.text, s.line_starters) && ")" !== c.last_text && (n = "else" === c.last_text || "export" === c.last_text ? "SPACE" : "NEWLINE"), "TK_RESERVED" === a.type && F(a.text, ["else", "catch", "finally"])) ? "TK_END_BLOCK" !== o || "expand" === d.brace_style || "end-expand" === d.brace_style || "none" === d.brace_style && a.wanted_newline ? K() : (_.trim(!0), "}" !== _.current_line.last() && K(), _.space_before_token = !0): "NEWLINE" === n ? "TK_RESERVED" === o && N(c.last_text) ? _.space_before_token = !0 : "TK_END_EXPR" !== o ? "TK_START_EXPR" === o && "TK_RESERVED" === a.type && F(a.text, ["var", "let", "const"]) || ":" === c.last_text || ("TK_RESERVED" === a.type && "if" === a.text && "else" === c.last_text ? _.space_before_token = !0 : K()) : "TK_RESERVED" === a.type && F(a.text, s.line_starters) && ")" !== c.last_text && K() : c.multiline_frame && S(c.mode) && "," === c.last_text && "}" === l ? K() : "SPACE" === n && (_.space_before_token = !0);
                R(), c.last_word = a.text, "TK_RESERVED" === a.type && "do" === a.text && (c.do_block = !0), "TK_RESERVED" === a.type && "if" === a.text && (c.if_block = !0)
            }
            o = "TK_START_BLOCK", l = "", (_ = new I(h, T)).raw = d.test_output_raw, t = [], v(L.BlockStatement), this.beautify = function() {
                var e, t;
                for (s = new V(i, d, h), f = s.tokenize(), r = 0; e = D();) {
                    for (var n = 0; n < e.comments_before.length; n++) x(e.comments_before[n]);
                    x(e), l = c.last_text, o = e.type, c.last_text = e.text, r += 1
                }
                return t = _.get_code(), d.end_with_newline && (t += "\n"), "\n" != d.eol && (t = t.replace(/[\n]/g, d.eol)), t
            }
        }

        function s(t) {
            var n = 0,
                i = -1,
                r = [],
                s = !0;
            this.set_indent = function(e) {
                n = t.baseIndentLength + e * t.indent_length, i = e
            }, this.get_character_count = function() {
                return n
            }, this.is_empty = function() {
                return s
            }, this.last = function() {
                return this._empty ? null : r[r.length - 1]
            }, this.push = function(e) {
                r.push(e), n += e.length, s = !1
            }, this.pop = function() {
                var e = null;
                return s || (e = r.pop(), n -= e.length, s = 0 === r.length), e
            }, this.remove_indent = function() {
                0 < i && (i -= 1, n -= t.indent_length)
            }, this.trim = function() {
                for (;
                    " " === this.last();) {
                    r.pop();
                    n -= 1
                }
                s = 0 === r.length
            }, this.toString = function() {
                var e = "";
                return this._empty || (0 <= i && (e = t.indent_cache[i]), e += r.join("")), e
            }
        }

        function I(t, n) {
            n = n || "", this.indent_cache = [n], this.baseIndentLength = n.length, this.indent_length = t.length, this.raw = !1;
            var i = [];
            this.baseIndentString = n, this.indent_string = t, this.previous_line = null, this.current_line = null, this.space_before_token = !1, this.add_outputline = function() {
                this.previous_line = this.current_line, this.current_line = new s(this), i.push(this.current_line)
            }, this.add_outputline(), this.get_line_number = function() {
                return i.length
            }, this.add_new_line = function(e) {
                return (1 !== this.get_line_number() || !this.just_added_newline()) && (!(!e && this.just_added_newline()) && (this.raw || this.add_outputline(), !0))
            }, this.get_code = function() {
                return i.join("\n").replace(/[\r\n\t ]+$/, "")
            }, this.set_indent = function(e) {
                if (1 < i.length) {
                    for (; e >= this.indent_cache.length;) this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
                    return this.current_line.set_indent(e), !0
                }
                return this.current_line.set_indent(0), !1
            }, this.add_raw_token = function(e) {
                for (var t = 0; t < e.newlines; t++) this.add_outputline();
                this.current_line.push(e.whitespace_before), this.current_line.push(e.text), this.space_before_token = !1
            }, this.add_token = function(e) {
                this.add_space_before_token(), this.current_line.push(e)
            }, this.add_space_before_token = function() {
                this.space_before_token && !this.just_added_newline() && this.current_line.push(" "), this.space_before_token = !1
            }, this.remove_redundant_indentation = function(e) {
                if (!e.multiline_frame && e.mode !== L.ForInitializer && e.mode !== L.Conditional)
                    for (var t = e.start_line_index, n = i.length; t < n;) i[t].remove_indent(), t++
            }, this.trim = function(e) {
                for (e = e !== undefined && e, this.current_line.trim(t, n); e && 1 < i.length && this.current_line.is_empty();) i.pop(), this.current_line = i[i.length - 1], this.current_line.trim();
                this.previous_line = 1 < i.length ? i[i.length - 2] : null
            }, this.just_added_newline = function() {
                return this.current_line.is_empty()
            }, this.just_added_blankline = function() {
                return !!this.just_added_newline() && (1 === i.length || i[i.length - 2].is_empty())
            }
        }
        var Q = function(e, t, n, i, r, s) {
            this.type = e, this.text = t, this.comments_before = [], this.newlines = n || 0, this.wanted_newline = 0 < n, this.whitespace_before = i || "", this.parent = null, this.directives = null
        };

        function V(v, S, e) {
            var A = "\n\r\t ".split(""),
                k = /[0-9]/,
                y = /[01234567]/,
                O = /[0123456789abcdefABCDEF]/,
                N = "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>".split(" ");
            this.line_starters = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");
            var D, C, L, I, V, P, j = this.line_starters.concat(["do", "in", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await"]),
                B = /([\s\S]*?)((?:\*\/)|$)/g,
                M = /([^\n\r\u2028\u2029]*)/g,
                U = /\/\* beautify( \w+[:]\w+)+ \*\//g,
                W = / (\w+)[:](\w+)/g,
                z = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g,
                G = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;

            function _() {
                var e, t, n = [];
                if (D = 0, C = "", P <= V) return ["", "TK_EOF"];
                t = I.length ? I[I.length - 1] : new Q("TK_START_BLOCK", "{");
                var i = v.charAt(V);
                for (V += 1; F(i, A);) {
                    if (X.newline.test(i) ? "\n" === i && "\r" === v.charAt(V - 2) || (D += 1, n = []) : n.push(i), P <= V) return ["", "TK_EOF"];
                    i = v.charAt(V), V += 1
                }
                if (n.length && (C = n.join("")), k.test(i)) {
                    var r = !0,
                        s = !0,
                        _ = k;
                    for ("0" === i && V < P && /[Xxo]/.test(v.charAt(V)) ? (s = r = !1, i += v.charAt(V), V += 1, _ = /[o]/.test(v.charAt(V)) ? y : O) : (i = "", V -= 1); V < P && _.test(v.charAt(V));) i += v.charAt(V), V += 1, r && V < P && "." === v.charAt(V) && (i += v.charAt(V), V += 1, r = !1), s && V < P && /[Ee]/.test(v.charAt(V)) && (i += v.charAt(V), (V += 1) < P && /[+-]/.test(v.charAt(V)) && (i += v.charAt(V), V += 1), r = s = !1);
                    return [i, "TK_WORD"]
                }
                if (X.isIdentifierStart(v.charCodeAt(V - 1))) {
                    if (V < P)
                        for (; X.isIdentifierChar(v.charCodeAt(V)) && (i += v.charAt(V), (V += 1) !== P););
                    return "TK_DOT" === t.type || "TK_RESERVED" === t.type && F(t.text, ["set", "get"]) || !F(i, j) ? [i, "TK_WORD"] : "in" === i ? [i, "TK_OPERATOR"] : [i, "TK_RESERVED"]
                }
                if ("(" === i || "[" === i) return [i, "TK_START_EXPR"];
                if (")" === i || "]" === i) return [i, "TK_END_EXPR"];
                if ("{" === i) return [i, "TK_START_BLOCK"];
                if ("}" === i) return [i, "TK_END_BLOCK"];
                if (";" === i) return [i, "TK_SEMICOLON"];
                if ("/" === i) {
                    var a = "";
                    if ("*" === v.charAt(V)) {
                        var o;
                        V += 1, B.lastIndex = V, a = "/*" + (o = B.exec(v))[0], V += o[0].length;
                        var l = function(e) {
                            if (!e.match(U)) return null;
                            var t = {};
                            W.lastIndex = 0;
                            for (var n = W.exec(e); n;) t[n[1]] = n[2], n = W.exec(e);
                            return t
                        }(a);
                        return l && "start" === l.ignore && (z.lastIndex = V, a += (o = z.exec(v))[0], V += o[0].length), [a = a.replace(X.lineBreak, "\n"), "TK_BLOCK_COMMENT", l]
                    }
                    if ("/" === v.charAt(V)) return V += 1, M.lastIndex = V, a = "//" + (o = M.exec(v))[0], V += o[0].length, [a, "TK_COMMENT"]
                }
                if ("`" === i || "'" === i || '"' === i || ("/" === i || S.e4x && "<" === i && v.slice(V - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/)) && ("TK_RESERVED" === t.type && F(t.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || "TK_END_EXPR" === t.type && ")" === t.text && t.parent && "TK_RESERVED" === t.parent.type && F(t.parent.text, ["if", "while", "for"]) || F(t.type, ["TK_COMMENT", "TK_START_EXPR", "TK_START_BLOCK", "TK_END_BLOCK", "TK_OPERATOR", "TK_EQUALS", "TK_EOF", "TK_SEMICOLON", "TK_COMMA"]))) {
                    var h = i,
                        c = !1,
                        u = !1;
                    if (e = i, "/" === h)
                        for (var p = !1; V < P && (c || p || v.charAt(V) !== h) && !X.newline.test(v.charAt(V));) e += v.charAt(V), c ? c = !1 : (c = "\\" === v.charAt(V), "[" === v.charAt(V) ? p = !0 : "]" === v.charAt(V) && (p = !1)), V += 1;
                    else if (S.e4x && "<" === h) {
                        var d = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g,
                            f = v.slice(V - 1),
                            T = d.exec(f);
                        if (T && 0 === T.index) {
                            for (var E = T[2], g = 0; T;) {
                                var x = !!T[1],
                                    w = T[2],
                                    K = !!T[T.length - 1] || "![CDATA[" === w.slice(0, 8);
                                if (w !== E || K || (x ? --g : ++g), g <= 0) break;
                                T = d.exec(f)
                            }
                            var m = T ? T.index + T[0].length : f.length;
                            return f = f.slice(0, m), V += m - 1, [f = f.replace(X.lineBreak, "\n"), "TK_STRING"]
                        }
                    } else
                        for (; V < P && (c || v.charAt(V) !== h && ("`" === h || !X.newline.test(v.charAt(V))));)(c || "`" === h) && X.newline.test(v.charAt(V)) ? ("\r" === v.charAt(V) && "\n" === v.charAt(V + 1) && (V += 1), e += "\n") : e += v.charAt(V), c ? ("x" !== v.charAt(V) && "u" !== v.charAt(V) || (u = !0), c = !1) : c = "\\" === v.charAt(V), V += 1;
                    if (u && S.unescape_strings && (e = function(e) {
                            var t, n = !1,
                                i = "",
                                r = 0,
                                s = "",
                                _ = 0;
                            for (; n || r < e.length;)
                                if (t = e.charAt(r), r++, n) {
                                    if (n = !1, "x" === t) s = e.substr(r, 2), r += 2;
                                    else {
                                        if ("u" !== t) {
                                            i += "\\" + t;
                                            continue
                                        }
                                        s = e.substr(r, 4), r += 4
                                    }
                                    if (!s.match(/^[0123456789abcdefABCDEF]+$/)) return e;
                                    if (0 <= (_ = parseInt(s, 16)) && _ < 32) {
                                        i += "x" === t ? "\\x" + s : "\\u" + s;
                                        continue
                                    }
                                    if (34 === _ || 39 === _ || 92 === _) i += "\\" + String.fromCharCode(_);
                                    else {
                                        if ("x" === t && 126 < _ && _ <= 255) return e;
                                        i += String.fromCharCode(_)
                                    }
                                } else "\\" === t ? n = !0 : i += t;
                            return i
                        }(e)), V < P && v.charAt(V) === h && (e += h, V += 1, "/" === h))
                        for (; V < P && X.isIdentifierStart(v.charCodeAt(V));) e += v.charAt(V), V += 1;
                    return [e, "TK_STRING"]
                }
                if ("#" === i) {
                    if (0 === I.length && "!" === v.charAt(V)) {
                        for (e = i; V < P && "\n" !== i;) e += i = v.charAt(V), V += 1;
                        return [$(e) + "\n", "TK_UNKNOWN"]
                    }
                    var R = "#";
                    if (V < P && k.test(v.charAt(V))) {
                        for (; R += i = v.charAt(V), (V += 1) < P && "#" !== i && "=" !== i;);
                        return "#" === i || ("[" === v.charAt(V) && "]" === v.charAt(V + 1) ? (R += "[]", V += 2) : "{" === v.charAt(V) && "}" === v.charAt(V + 1) && (R += "{}", V += 2)), [R, "TK_WORD"]
                    }
                }
                if ("<" === i && ("?" === v.charAt(V) || "%" === v.charAt(V))) {
                    G.lastIndex = V - 1;
                    var b = G.exec(v);
                    if (b) return i = b[0], V += i.length - 1, [i = i.replace(X.lineBreak, "\n"), "TK_STRING"]
                }
                if ("<" === i && "\x3c!--" === v.substring(V - 1, V + 3)) {
                    for (V += 3, i = "\x3c!--"; !X.newline.test(v.charAt(V)) && V < P;) i += v.charAt(V), V++;
                    return L = !0, [i, "TK_COMMENT"]
                }
                if ("-" === i && L && "--\x3e" === v.substring(V - 1, V + 2)) return L = !1, V += 2, ["--\x3e", "TK_COMMENT"];
                if ("." === i) return [i, "TK_DOT"];
                if (F(i, N)) {
                    for (; V < P && F(i + v.charAt(V), N) && (i += v.charAt(V), !(P <= (V += 1))););
                    return "," === i ? [i, "TK_COMMA"] : "=" === i ? [i, "TK_EQUALS"] : [i, "TK_OPERATOR"]
                }
                return [i, "TK_UNKNOWN"]
            }
            this.tokenize = function() {
                var e, t, n;
                P = v.length, V = 0, L = !1, I = [];
                for (var i = null, r = [], s = []; !t || "TK_EOF" !== t.type;) {
                    for (n = _(), e = new Q(n[1], n[0], D, C);
                        "TK_COMMENT" === e.type || "TK_BLOCK_COMMENT" === e.type || "TK_UNKNOWN" === e.type;) "TK_BLOCK_COMMENT" === e.type && (e.directives = n[2]), s.push(e), n = _(), e = new Q(n[1], n[0], D, C);
                    s.length && (e.comments_before = s, s = []), "TK_START_BLOCK" === e.type || "TK_START_EXPR" === e.type ? (e.parent = t, r.push(i), i = e) : ("TK_END_BLOCK" === e.type || "TK_END_EXPR" === e.type) && i && ("]" === e.text && "[" === i.text || ")" === e.text && "(" === i.text || "}" === e.text && "{" === i.text) && (e.parent = i.parent, i = r.pop()), I.push(e), t = e
                }
                return I
            }
        }
        return {
            run: function(e, t) {
                function _(e) {
                    return e.replace(/\s+$/g, "")
                }
                var n, i, r, T, s, a, E, o, l, g, x, w, h, c;
                for ((t = t || {}).wrap_line_length !== undefined && 0 !== parseInt(t.wrap_line_length, 10) || t.max_char === undefined || 0 === parseInt(t.max_char, 10) || (t.wrap_line_length = t.max_char), i = t.indent_inner_html !== undefined && t.indent_inner_html, r = t.indent_size === undefined ? 4 : parseInt(t.indent_size, 10), T = t.indent_char === undefined ? " " : t.indent_char, a = t.brace_style === undefined ? "collapse" : t.brace_style, s = 0 === parseInt(t.wrap_line_length, 10) ? 32786 : parseInt(t.wrap_line_length || 250, 10), E = t.unformatted || ["a", "span", "img", "bdo", "em", "strong", "dfn", "code", "samp", "kbd", "var", "cite", "abbr", "acronym", "q", "sub", "sup", "tt", "i", "b", "big", "small", "u", "s", "strike", "font", "ins", "del", "address", "pre"], o = t.preserve_newlines === undefined || t.preserve_newlines, l = o ? isNaN(parseInt(t.max_preserve_newlines, 10)) ? 32786 : parseInt(t.max_preserve_newlines, 10) : 0, g = t.indent_handlebars !== undefined && t.indent_handlebars, x = t.wrap_attributes === undefined ? "auto" : t.wrap_attributes, w = t.wrap_attributes_indent_size === undefined ? r : parseInt(t.wrap_attributes_indent_size, 10) || r, h = t.end_with_newline !== undefined && t.end_with_newline, c = Array.isArray(t.extra_liners) ? t.extra_liners.concat() : "string" == typeof t.extra_liners ? t.extra_liners.split(",") : "head,body,/html".split(","), t.indent_with_tabs && (T = "\t", r = 1), (n = new function() {
                        return this.pos = 0, this.token = "", this.current_mode = "CONTENT", this.tags = {
                            parent: "parent1",
                            parentcount: 1,
                            parent1: ""
                        }, this.tag_type = "", this.token_text = this.last_token = this.last_text = this.token_type = "", this.newlines = 0, this.indent_content = i, this.Utils = {
                            whitespace: "\n\r\t ".split(""),
                            single_token: "br,input,link,meta,source,!doctype,basefont,base,area,hr,wbr,param,img,isindex,embed".split(","),
                            extra_liners: c,
                            in_array: function(e, t) {
                                for (var n = 0; n < t.length; n++)
                                    if (e == t[n]) return !0;
                                return !1
                            }
                        }, this.is_whitespace = function(e) {
                            for (; 0 < e.length; e++)
                                if (!this.Utils.in_array(e.charAt(0), this.Utils.whitespace)) return !1;
                            return !0
                        }, this.traverse_whitespace = function() {
                            var e = "";
                            if (e = this.input.charAt(this.pos), this.Utils.in_array(e, this.Utils.whitespace)) {
                                for (this.newlines = 0; this.Utils.in_array(e, this.Utils.whitespace);) o && "\n" == e && this.newlines <= l && (this.newlines += 1), this.pos++, e = this.input.charAt(this.pos);
                                return !0
                            }
                            return !1
                        }, this.space_or_wrap = function(e) {
                            this.line_char_count >= this.wrap_line_length ? (this.print_newline(!1, e), this.print_indentation(e)) : (this.line_char_count++, e.push(" "))
                        }, this.get_content = function() {
                            for (var e = "", t = [];
                                "<" != this.input.charAt(this.pos);) {
                                if (this.pos >= this.input.length) return t.length ? t.join("") : ["", "TK_EOF"];
                                if (this.traverse_whitespace()) this.space_or_wrap(t);
                                else {
                                    if (g) {
                                        var n = this.input.substr(this.pos, 3);
                                        if ("{{#" == n || "{{/" == n) break;
                                        if ("{{!" == n) return [this.get_tag(), "TK_TAG_HANDLEBARS_COMMENT"];
                                        if ("{{" == this.input.substr(this.pos, 2) && "{{else}}" == this.get_tag(!0)) break
                                    }
                                    e = this.input.charAt(this.pos), this.pos++, this.line_char_count++, t.push(e)
                                }
                            }
                            return t.length ? t.join("") : ""
                        }, this.get_contents_to = function(e) {
                            if (this.pos == this.input.length) return ["", "TK_EOF"];
                            var t = "",
                                n = new RegExp("</" + e + "\\s*>", "igm");
                            n.lastIndex = this.pos;
                            var i = n.exec(this.input),
                                r = i ? i.index : this.input.length;
                            return this.pos < r && (t = this.input.substring(this.pos, r), this.pos = r), t
                        }, this.record_tag = function(e) {
                            this.tags[e + "count"] ? this.tags[e + "count"]++ : this.tags[e + "count"] = 1, this.tags[e + this.tags[e + "count"]] = this.indent_level, this.tags[e + this.tags[e + "count"] + "parent"] = this.tags.parent, this.tags.parent = e + this.tags[e + "count"]
                        }, this.retrieve_tag = function(e) {
                            if (this.tags[e + "count"]) {
                                for (var t = this.tags.parent; t && e + this.tags[e + "count"] != t;) t = this.tags[t + "parent"];
                                t && (this.indent_level = this.tags[e + this.tags[e + "count"]], this.tags.parent = this.tags[t + "parent"]), delete this.tags[e + this.tags[e + "count"] + "parent"], delete this.tags[e + this.tags[e + "count"]], 1 == this.tags[e + "count"] ? delete this.tags[e + "count"] : this.tags[e + "count"]--
                            }
                        }, this.indent_to_tag = function(e) {
                            if (this.tags[e + "count"]) {
                                for (var t = this.tags.parent; t && e + this.tags[e + "count"] != t;) t = this.tags[t + "parent"];
                                t && (this.indent_level = this.tags[e + this.tags[e + "count"]])
                            }
                        }, this.get_tag = function(e) {
                            var t, n, i = "",
                                r = [],
                                s = "",
                                _ = !1,
                                a = !0,
                                o = this.pos,
                                l = this.line_char_count;
                            e = e !== undefined && e;
                            do {
                                if (this.pos >= this.input.length) return e && (this.pos = o, this.line_char_count = l), r.length ? r.join("") : ["", "TK_EOF"];
                                if (i = this.input.charAt(this.pos), this.pos++, this.Utils.in_array(i, this.Utils.whitespace)) _ = !0;
                                else {
                                    if ("'" != i && '"' != i || (i += this.get_unformatted(i), _ = !0), "=" == i && (_ = !1), r.length && "=" != r[r.length - 1] && ">" != i && _) {
                                        if (this.space_or_wrap(r), _ = !1, !a && "force" == x && "/" != i) {
                                            this.print_newline(!0, r), this.print_indentation(r);
                                            for (var h = 0; h < w; h++) r.push(T)
                                        }
                                        for (var c = 0; c < r.length; c++)
                                            if (" " == r[c]) {
                                                a = !1;
                                                break
                                            }
                                    }
                                    if (g && "<" == n && i + this.input.charAt(this.pos) == "{{" && (i += this.get_unformatted("}}"), r.length && " " != r[r.length - 1] && "<" != r[r.length - 1] && (i = " " + i), _ = !0), "<" != i || n || (t = this.pos - 1, n = "<"), g && !n && 2 <= r.length && "{" == r[r.length - 1] && "{" == r[r.length - 2] && (t = "#" == i || "/" == i || "!" == i ? this.pos - 3 : this.pos - 2, n = "{"), this.line_char_count++, r.push(i), r[1] && ("!" == r[1] || "?" == r[1] || "%" == r[1])) {
                                        r = [this.get_comment(t)];
                                        break
                                    }
                                    if (g && r[1] && "{" == r[1] && r[2] && "!" == r[2]) {
                                        r = [this.get_comment(t)];
                                        break
                                    }
                                    if (g && "{" == n && 2 < r.length && "}" == r[r.length - 2] && "}" == r[r.length - 1]) break
                                }
                            } while (">" != i);
                            var u, p, d = r.join("");
                            u = -1 != d.indexOf(" ") ? d.indexOf(" ") : "{" == d[0] ? d.indexOf("}") : d.indexOf(">"), p = "<" != d[0] && g ? "#" == d[2] ? 3 : 2 : 1;
                            var f = d.substring(p, u).toLowerCase();
                            return "/" == d.charAt(d.length - 2) || this.Utils.in_array(f, this.Utils.single_token) ? e || (this.tag_type = "SINGLE") : g && "{" == d[0] && "else" == f ? e || (this.indent_to_tag("if"), this.tag_type = "HANDLEBARS_ELSE", this.indent_content = !0, this.traverse_whitespace()) : this.is_unformatted(f, E) ? (s = this.get_unformatted("</" + f + ">", d), r.push(s), this.pos, this.tag_type = "SINGLE") : "script" == f && (-1 == d.search("type") || -1 < d.search("type") && -1 < d.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/)) ? e || (this.record_tag(f), this.tag_type = "SCRIPT") : "style" == f && (-1 == d.search("type") || -1 < d.search("type") && -1 < d.search("text/css")) ? e || (this.record_tag(f), this.tag_type = "STYLE") : "!" == f.charAt(0) ? e || (this.tag_type = "SINGLE", this.traverse_whitespace()) : e || ("/" == f.charAt(0) ? (this.retrieve_tag(f.substring(1)), this.tag_type = "END") : (this.record_tag(f), "html" != f.toLowerCase() && (this.indent_content = !0), this.tag_type = "START"), this.traverse_whitespace() && this.space_or_wrap(r), this.Utils.in_array(f, this.Utils.extra_liners) && (this.print_newline(!1, this.output), this.output.length && "\n" != this.output[this.output.length - 2] && this.print_newline(!0, this.output))), e && (this.pos = o, this.line_char_count = l), r.join("")
                        }, this.get_comment = function(e) {
                            var t = "",
                                n = ">",
                                i = !1;
                            this.pos = e;
                            var r = this.input.charAt(this.pos);
                            for (this.pos++; this.pos <= this.input.length && ((t += r)[t.length - 1] != n[n.length - 1] || -1 == t.indexOf(n));) !i && t.length < 10 && (0 === t.indexOf("<![if") ? (n = "<![endif]>", i = !0) : 0 === t.indexOf("<![cdata[") ? (n = "]]>", i = !0) : 0 === t.indexOf("<![") ? (n = "]>", i = !0) : 0 === t.indexOf("\x3c!--") ? (n = "--\x3e", i = !0) : 0 === t.indexOf("{{!") ? (n = "}}", i = !0) : 0 === t.indexOf("<?") ? (n = "?>", i = !0) : 0 === t.indexOf("<%") && (n = "%>", i = !0)), r = this.input.charAt(this.pos), this.pos++;
                            return t
                        }, this.get_unformatted = function(e, t) {
                            if (t && -1 != t.toLowerCase().indexOf(e)) return "";
                            var n = "",
                                i = "",
                                r = 0,
                                s = !0;
                            do {
                                if (this.pos >= this.input.length) return i;
                                if (n = this.input.charAt(this.pos), this.pos++, this.Utils.in_array(n, this.Utils.whitespace)) {
                                    if (!s) {
                                        this.line_char_count--;
                                        continue
                                    }
                                    if ("\n" == n || "\r" == n) {
                                        i += "\n", this.line_char_count = 0;
                                        continue
                                    }
                                }
                                i += n, this.line_char_count++, s = !0, g && "{" == n && i.length && "{" == i[i.length - 2] && (r = (i += this.get_unformatted("}}")).length)
                            } while (-1 == i.toLowerCase().indexOf(e, r));
                            return i
                        }, this.get_token = function() {
                            var e;
                            if ("TK_TAG_SCRIPT" == this.last_token || "TK_TAG_STYLE" == this.last_token) {
                                var t = this.last_token.substr(7);
                                return "string" != typeof(e = this.get_contents_to(t)) ? e : [e, "TK_" + t]
                            }
                            return "CONTENT" == this.current_mode ? "string" != typeof(e = this.get_content()) ? e : [e, "TK_CONTENT"] : "TAG" == this.current_mode ? "string" != typeof(e = this.get_tag()) ? e : [e, "TK_TAG_" + this.tag_type] : void 0
                        }, this.get_full_indent = function(e) {
                            return (e = this.indent_level + e || 0) < 1 ? "" : new Array(e + 1).join(this.indent_string)
                        }, this.is_unformatted = function(e, t) {
                            if (!this.Utils.in_array(e, t)) return !1;
                            if ("a" != e.toLowerCase() || !this.Utils.in_array("a", t)) return !0;
                            var n = (this.get_tag(!0) || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);
                            return !(n && !this.Utils.in_array(n, t))
                        }, this.printer = function(e, t, n, i, r) {
                            this.input = e || "", this.output = [], this.indent_character = t, this.indent_string = "", this.indent_size = n, this.brace_style = r, this.indent_level = 0, this.wrap_line_length = i;
                            for (var s = this.line_char_count = 0; s < this.indent_size; s++) this.indent_string += this.indent_character;
                            this.print_newline = function(e, t) {
                                this.line_char_count = 0, t && t.length && (e || "\n" != t[t.length - 1]) && ("\n" != t[t.length - 1] && (t[t.length - 1] = _(t[t.length - 1])), t.push("\n"))
                            }, this.print_indentation = function(e) {
                                for (var t = 0; t < this.indent_level; t++) e.push(this.indent_string), this.line_char_count += this.indent_string.length
                            }, this.print_token = function(e) {
                                this.is_whitespace(e) && !this.output.length || ((e || "" !== e) && this.output.length && "\n" == this.output[this.output.length - 1] && (this.print_indentation(this.output), e = e.replace(/^\s+/g, "")), this.print_token_raw(e))
                            }, this.print_token_raw = function(e) {
                                0 < this.newlines && (e = _(e)), e && "" !== e && (1 < e.length && "\n" == e[e.length - 1] ? (this.output.push(e.slice(0, -1)), this.print_newline(!1, this.output)) : this.output.push(e));
                                for (var t = 0; t < this.newlines; t++) this.print_newline(0 < t, this.output);
                                this.newlines = 0
                            }, this.indent = function() {
                                this.indent_level++
                            }, this.unindent = function() {
                                0 < this.indent_level && this.indent_level--
                            }
                        }, this
                    }).printer(e, T, r, s, a);;) {
                    var u = n.get_token();
                    if (n.token_text = u[0], n.token_type = u[1], "TK_EOF" == n.token_type) break;
                    switch (n.token_type) {
                        case "TK_TAG_START":
                            n.print_newline(!1, n.output), n.print_token(n.token_text), n.indent_content && (n.indent(), n.indent_content = !1), n.current_mode = "CONTENT";
                            break;
                        case "TK_TAG_STYLE":
                        case "TK_TAG_SCRIPT":
                            n.print_newline(!1, n.output), n.print_token(n.token_text), n.current_mode = "CONTENT";
                            break;
                        case "TK_TAG_END":
                            if ("TK_CONTENT" == n.last_token && "" === n.last_text) {
                                var p = n.token_text.match(/\w+/)[0],
                                    d = null;
                                n.output.length && (d = n.output[n.output.length - 1].match(/(?:<|{{#)\/?\s*(\w+)/)), (null == d || d[1] != p && !n.Utils.in_array(d[1], E)) && n.print_newline(!1, n.output)
                            }
                            n.print_token(n.token_text), n.current_mode = "CONTENT";
                            break;
                        case "TK_TAG_SINGLE":
                            var f = n.token_text.match(/^\s*<([a-z-]+)/i);
                            f && n.Utils.in_array(f[1], E) || n.print_newline(!1, n.output), n.print_token(n.token_text), n.current_mode = "CONTENT";
                            break;
                        case "TK_TAG_HANDLEBARS_ELSE":
                            n.print_token(n.token_text), n.indent_content && (n.indent(), n.indent_content = !1), n.current_mode = "CONTENT";
                            break;
                        case "TK_TAG_HANDLEBARS_COMMENT":
                        case "TK_CONTENT":
                            n.print_token(n.token_text), n.current_mode = "TAG";
                            break;
                        case "TK_STYLE":
                        case "TK_SCRIPT":
                            if ("" !== n.token_text) {
                                n.print_newline(!1, n.output);
                                var K, m = n.token_text,
                                    R = 1;
                                "TK_SCRIPT" == n.token_type ? K = y : "TK_STYLE" == n.token_type && (K = k), "keep" == t.indent_scripts ? R = 0 : "separate" == t.indent_scripts && (R = -n.indent_level);
                                var b = n.get_full_indent(R);
                                if (K) m = K(m.replace(/^\s*/, b), t);
                                else {
                                    var v = m.match(/^\s*/)[0].match(/[^\n\r]*$/)[0].split(n.indent_string).length - 1,
                                        S = n.get_full_indent(R - v);
                                    m = m.replace(/^\s*/, b).replace(/\r\n|\r|\n/g, "\n" + S).replace(/\s+$/, "")
                                }
                                m && (n.print_token_raw(m), n.print_newline(!0, n.output))
                            }
                            n.current_mode = "TAG";
                            break;
                        default:
                            "" !== n.token_text && n.print_token(n.token_text)
                    }
                    n.last_token = n.token_type, n.last_text = n.token_text
                }
                var A = n.output.join("").replace(/[\r\n\t ]+$/, "");
                return h && (A += "\n"), A
            }
        }
    }
});

/*!
 * paragraph_format Plugin
 */

! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = function(a, e) {
        return e === undefined && (e = "undefined" != typeof window ? require("jquery") : require("jquery")(a)), t(e)
    } : t(window.jQuery)
}(function(g) {
    g.extend(g.FE.DEFAULTS, {
        paragraphFormat: {
            N: "Normal",
            H1: "Heading 1",
            H2: "Heading 2",
            H3: "Heading 3",
            H4: "Heading 4",
            PRE: "Code"
        },
        paragraphFormatSelection: !1,
        paragraphDefaultSelection: "Paragraph Format"
    }), g.FE.PLUGINS.paragraphFormat = function(h) {
        function f(a, e) {
            var t = h.html.defaultTag();
            if (e && e.toLowerCase() != t)
                if (0 < a.find("ul, ol").length) {
                    var r = g("<" + e + ">");
                    a.prepend(r);
                    for (var n = h.node.contents(a.get(0))[0]; n && ["UL", "OL"].indexOf(n.tagName) < 0;) {
                        var o = n.nextSibling;
                        r.append(n), n = o
                    }
                } else a.html("<" + e + ">" + a.html() + "</" + e + ">")
        }
        return {
            apply: function(a) {
                "N" == a && (a = h.html.defaultTag()), h.selection.save(), h.html.wrap(!0, !0, !h.opts.paragraphFormat.BLOCKQUOTE, !0, !0), h.selection.restore();
                var e, t, r, n, o, i, p, l, s = h.selection.blocks();
                h.selection.save(), h.$el.find("pre").attr("skip", !0);
                for (var d = 0; d < s.length; d++)
                    if (s[d].tagName != a && !h.node.isList(s[d])) {
                        var m = g(s[d]);
                        "LI" == s[d].tagName ? f(m, a) : "LI" == s[d].parentNode.tagName && s[d] ? (i = m, p = a, l = h.html.defaultTag(), p && p.toLowerCase() != l || (p = 'div class="fr-temp-div"'), i.replaceWith(g("<" + p + ">").html(i.html()))) : 0 <= ["TD", "TH"].indexOf(s[d].parentNode.tagName) ? (r = m, n = a, o = h.html.defaultTag(), n || (n = 'div class="fr-temp-div"' + (h.node.isEmpty(r.get(0), !0) ? ' data-empty="true"' : "")), n.toLowerCase() == o ? (h.node.isEmpty(r.get(0), !0) || r.append("<br/>"), r.replaceWith(r.html())) : r.replaceWith(g("<" + n + ">").html(r.html()))) : (e = m, (t = a) || (t = 'div class="fr-temp-div"' + (h.node.isEmpty(e.get(0), !0) ? ' data-empty="true"' : "")), e.replaceWith(g("<" + t + " " + h.node.attributes(e.get(0)) + ">").html(e.html()).removeAttr("data-empty")))
                    }
                h.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function() {
                    g(this).prev().append("<br>" + g(this).html()), g(this).remove()
                }), h.$el.find("pre").removeAttr("skip"), h.html.unwrap(), h.selection.restore()
            },
            refreshOnShow: function(a, e) {
                var t = h.selection.blocks();
                if (t.length) {
                    var r = t[0],
                        n = "N",
                        o = h.html.defaultTag();
                    r.tagName.toLowerCase() != o && r != h.el && (n = r.tagName), e.find('.fr-command[data-param1="' + n + '"]').addClass("fr-active").attr("aria-selected", !0)
                } else e.find('.fr-command[data-param1="N"]').addClass("fr-active").attr("aria-selected", !0)
            },
            refresh: function(a) {
                if (h.opts.paragraphFormatSelection) {
                    var e = h.selection.blocks();
                    if (e.length) {
                        var t = e[0],
                            r = "N",
                            n = h.html.defaultTag();
                        t.tagName.toLowerCase() != n && t != h.el && (r = t.tagName), 0 <= ["LI", "TD", "TH"].indexOf(r) && (r = "N"), a.find("> span").text(h.language.translate(h.opts.paragraphFormat[r]))
                    } else a.find("> span").text(h.language.translate(h.opts.paragraphFormat.N))
                }
            }
        }
    }, g.FE.RegisterCommand("paragraphFormat", {
        type: "dropdown",
        displaySelection: function(a) {
            return a.opts.paragraphFormatSelection
        },
        defaultSelection: function(a) {
            return a.language.translate(a.opts.paragraphDefaultSelection)
        },
        displaySelectionWidth: 125,
        html: function() {
            var a = '<ul class="fr-dropdown-list" role="presentation">',
                e = this.opts.paragraphFormat;
            for (var t in e)
                if (e.hasOwnProperty(t)) {
                    var r = this.shortcuts.get("paragraphFormat." + t);
                    r = r ? '<span class="fr-shortcut">' + r + "</span>" : "", a += '<li role="presentation"><' + ("N" == t ? this.html.defaultTag() || "DIV" : t) + ' style="padding: 0 !important; margin: 0 !important;" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="paragraphFormat" data-param1="' + t + '" title="' + this.language.translate(e[t]) + '">' + this.language.translate(e[t]) + "</a></" + ("N" == t ? this.html.defaultTag() || "DIV" : t) + "></li>"
                }
            return a += "</ul>"
        },
        title: "Paragraph Format",
        callback: function(a, e) {
            this.paragraphFormat.apply(e)
        },
        refresh: function(a) {
            this.paragraphFormat.refresh(a)
        },
        refreshOnShow: function(a, e) {
            this.paragraphFormat.refreshOnShow(a, e)
        },
        plugin: "paragraphFormat"
    }), g.FE.DefineIcon("paragraphFormat", {
        NAME: "paragraph"
    })
});

/*!
 * paragraph_style Plugin
 */

! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = function(e, a) {
        return a === undefined && (a = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), t(a)
    } : t(window.jQuery)
}(function(i) {
    i.extend(i.FE.DEFAULTS, {
        paragraphStyles: {
            "fr-text-gray": "Gray",
            "fr-text-bordered": "Bordered",
            "fr-text-spaced": "Spaced",
            "fr-text-uppercase": "Uppercase"
        },
        paragraphMultipleStyles: !0
    }), i.FE.PLUGINS.paragraphStyle = function(o) {
        return {
            _init: function() {},
            apply: function(e, a, t) {
                void 0 === a && (a = o.opts.paragraphStyles), void 0 === t && (t = o.opts.paragraphMultipleStyles);
                var r = "";
                t || ((r = Object.keys(a)).splice(r.indexOf(e), 1), r = r.join(" ")), o.selection.save(), o.html.wrap(!0, !0, !0, !0), o.selection.restore();
                var n = o.selection.blocks();
                o.selection.save();
                for (var s = i(n[0]).hasClass(e), l = 0; l < n.length; l++) i(n[l]).removeClass(r).toggleClass(e, !s), i(n[l]).hasClass("fr-temp-div") && i(n[l]).removeClass("fr-temp-div"), "" === i(n[l]).attr("class") && i(n[l]).removeAttr("class");
                o.html.unwrap(), o.selection.restore()
            },
            refreshOnShow: function(e, a) {
                var t = o.selection.blocks();
                if (t.length) {
                    var r = i(t[0]);
                    a.find(".fr-command").each(function() {
                        var e = i(this).data("param1"),
                            a = r.hasClass(e);
                        i(this).toggleClass("fr-active", a).attr("aria-selected", a)
                    })
                }
            }
        }
    }, i.FE.RegisterCommand("paragraphStyle", {
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                a = this.opts.paragraphStyles;
            for (var t in a) a.hasOwnProperty(t) && (e += '<li role="presentation"><a class="fr-command ' + t + '" tabIndex="-1" role="option" data-cmd="paragraphStyle" data-param1="' + t + '" title="' + this.language.translate(a[t]) + '">' + this.language.translate(a[t]) + "</a></li>");
            return e += "</ul>"
        },
        title: "Paragraph Style",
        callback: function(e, a) {
            this.paragraphStyle.apply(a)
        },
        refreshOnShow: function(e, a) {
            this.paragraphStyle.refreshOnShow(e, a)
        },
        plugin: "paragraphStyle"
    }), i.FE.DefineIcon("paragraphStyle", {
        NAME: "magic"
    })
});

/*!
 * char_counter Plugin
 */

! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t)
    } : n(window.jQuery)
}(function(a) {
    a.extend(a.FE.DEFAULTS, {
        charCounterMax: -1,
        charCounterCount: !0
    }), a.FE.PLUGINS.charCounter = function(n) {
        var r;

        function o() {
            return (n.el.textContent || "").replace(/\u200B/g, "").length
        }

        function e(e) {
            if (n.opts.charCounterMax < 0) return !0;
            if (o() < n.opts.charCounterMax) return !0;
            var t = e.which;
            return !(!n.keys.ctrlKey(e) && n.keys.isCharacter(t) || t === a.FE.KEYCODE.IME) || (e.preventDefault(), e.stopPropagation(), n.events.trigger("charCounter.exceeded"), !1)
        }

        function t(e) {
            return n.opts.charCounterMax < 0 ? e : a("<div>").html(e).text().length + o() <= n.opts.charCounterMax ? e : (n.events.trigger("charCounter.exceeded"), "")
        }

        function u() {
            if (n.opts.charCounterCount) {
                var e = o() + (0 < n.opts.charCounterMax ? "/" + n.opts.charCounterMax : "");
                r.text(e), n.opts.toolbarBottom && r.css("margin-bottom", n.$tb.outerHeight(!0));
                var t = n.$wp.get(0).offsetWidth - n.$wp.get(0).clientWidth;
                0 <= t && ("rtl" == n.opts.direction ? r.css("margin-left", t) : r.css("margin-right", 0))
            }
        }
        return {
            _init: function() {
                return !!n.$wp && !!n.opts.charCounterCount && ((r = a('<span class="fr-counter"></span>')).css("bottom", n.$wp.css("border-bottom-width")), n.$box.append(r), n.events.on("keydown", e, !0), n.events.on("paste.afterCleanup", t), n.events.on("keyup contentChanged input", function() {
                    n.events.trigger("charCounter.update")
                }), n.events.on("charCounter.update", u), n.events.trigger("charCounter.update"), void n.events.on("destroy", function() {
                    a(n.o_win).off("resize.char" + n.id), r.removeData().remove(), r = null
                }))
            },
            count: o
        }
    }
});

/*!
 * colors Plugin
 */

! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = function(o, r) {
        return r === undefined && (r = "undefined" != typeof window ? require("jquery") : require("jquery")(o)), e(r)
    } : e(window.jQuery)
}(function(C) {
    C.extend(C.FE.POPUP_TEMPLATES, {
        "colors.picker": "[_BUTTONS_][_TEXT_COLORS_][_BACKGROUND_COLORS_][_CUSTOM_COLOR_]"
    }), C.extend(C.FE.DEFAULTS, {
        colorsText: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
        colorsBackground: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
        colorsStep: 7,
        colorsHEXInput: !0,
        colorsDefaultTab: "text",
        colorsButtons: ["colorsBack", "|", "-"]
    });
    var c = ["text", "background"];
    C.FE.PLUGINS.colors = function(E) {
        function r() {
            E.popups.hide("colors.picker")
        }

        function s(o) {
            for (var r = "text" == o ? E.opts.colorsText : E.opts.colorsBackground, e = '<div class="fr-color-set fr-' + o + "-color" + (E.opts.colorsDefaultTab == o || "text" != E.opts.colorsDefaultTab && "background" != E.opts.colorsDefaultTab && "text" == o ? " fr-selected-set" : "") + '">', t = 0; t < r.length; t++) 0 !== t && t % E.opts.colorsStep == 0 && (e += "<br>"), "REMOVE" != r[t] ? e += '<span class="fr-command fr-select-color" style="background: ' + r[t] + ';" tabIndex="-1" aria-selected="false" role="button" data-cmd="' + o + 'Color" data-param1="' + r[t] + '"><span class="fr-sr-only">' + E.language.translate("Color") + " " + r[t] + "&nbsp;&nbsp;&nbsp;</span></span>" : e += '<span class="fr-command fr-select-color" data-cmd="' + o + 'Color" tabIndex="-1" role="button" data-param1="REMOVE" title="' + E.language.translate("Clear Formatting") + '">' + E.icon.create("remove") + '<span class="fr-sr-only">' + E.language.translate("Clear Formatting") + "</span></span>";
            return e + "</div>"
        }

        function l(o) {
            var r = E.popups.get("colors.picker"),
                e = r.find(".fr-" + o + "-color .fr-active-item").attr("data-param1"),
                t = r.find(".fr-color-hex-layer input"),
                a = r.find('.fr-colors-tab[data-param1="' + o + '"]');
            t.length && a.hasClass("fr-selected-tab") && t.val(e).trigger("change")
        }

        function t(o) {
            "REMOVE" != o ? E.format.applyStyle("background-color", E.helpers.HEXtoRGB(o)) : E.format.removeStyle("background-color"), r()
        }

        function a(o) {
            "REMOVE" != o ? E.format.applyStyle("color", E.helpers.HEXtoRGB(o)) : E.format.removeStyle("color"), r()
        }
        return {
            showColorsPopup: function() {
                var o = E.$tb.find('.fr-command[data-cmd="color"]'),
                    r = E.popups.get("colors.picker");
                if (r || (r = function() {
                        var o, r = '<div class="fr-buttons fr-colors-buttons">';
                        E.opts.toolbarInline && 0 < E.opts.colorsButtons.length && (r += E.button.buildList(E.opts.colorsButtons)), r += (o = '<div class="fr-colors-tabs fr-group">', o += '<span class="fr-colors-tab ' + ("background" == E.opts.colorsDefaultTab ? "" : "fr-selected-tab ") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" != E.opts.colorsDefaultTab) + '" data-param1="text" data-cmd="colorChangeSet" title="' + E.language.translate("Text") + '">' + E.language.translate("Text") + "</span>", (o += '<span class="fr-colors-tab ' + ("background" == E.opts.colorsDefaultTab ? "fr-selected-tab" : "") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" == E.opts.colorsDefaultTab) + '" data-param1="background" data-cmd="colorChangeSet" title="' + E.language.translate("Background") + '">' + E.language.translate("Background") + "</span>") + "</div></div>");
                        var e = "";
                        E.opts.colorsHEXInput && (e = '<div class="fr-color-hex-layer fr-active fr-layer" id="fr-color-hex-layer-' + E.id + '"><div class="fr-input-line"><input maxlength="7" id="fr-color-hex-layer-text-' + E.id + '" type="text" placeholder="' + E.language.translate("HEX Color") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="customColor" tabIndex="2" role="button">' + E.language.translate("OK") + "</button></div></div>");
                        var b, t = {
                                buttons: r,
                                text_colors: s("text"),
                                background_colors: s("background"),
                                custom_color: e
                            },
                            a = E.popups.create("colors.picker", t);
                        return b = a, E.events.on("popup.tab", function(o) {
                            var r = C(o.currentTarget);
                            if (!E.popups.isVisible("colors.picker") || !r.is("span")) return !0;
                            var e = o.which,
                                t = !0;
                            if (C.FE.KEYCODE.TAB == e) {
                                var a = b.find(".fr-buttons");
                                t = !E.accessibility.focusToolbar(a, !!o.shiftKey)
                            } else if (C.FE.KEYCODE.ARROW_UP == e || C.FE.KEYCODE.ARROW_DOWN == e || C.FE.KEYCODE.ARROW_LEFT == e || C.FE.KEYCODE.ARROW_RIGHT == e) {
                                if (r.is("span.fr-select-color")) {
                                    var s = r.parent().find("span.fr-select-color"),
                                        l = s.index(r),
                                        c = E.opts.colorsStep,
                                        n = Math.floor(s.length / c),
                                        i = l % c,
                                        p = Math.floor(l / c),
                                        u = p * c + i,
                                        d = n * c;
                                    C.FE.KEYCODE.ARROW_UP == e ? u = ((u - c) % d + d) % d : C.FE.KEYCODE.ARROW_DOWN == e ? u = (u + c) % d : C.FE.KEYCODE.ARROW_LEFT == e ? u = ((u - 1) % d + d) % d : C.FE.KEYCODE.ARROW_RIGHT == e && (u = (u + 1) % d);
                                    var f = C(s.get(u));
                                    E.events.disableBlur(), f.focus(), t = !1
                                }
                            } else C.FE.KEYCODE.ENTER == e && (E.button.exec(r), t = !1);
                            return !1 === t && (o.preventDefault(), o.stopPropagation()), t
                        }, !0), a
                    }()), !r.hasClass("fr-active"))
                    if (E.popups.setContainer("colors.picker", E.$tb), c.map(function(o) {
                            ! function(o) {
                                var r, e = E.popups.get("colors.picker"),
                                    t = C(E.selection.element());
                                r = "background" == o ? "background-color" : "color";
                                var a = e.find(".fr-" + o + "-color .fr-select-color");
                                for (a.find(".fr-selected-color").remove(), a.removeClass("fr-active-item"), a.not('[data-param1="REMOVE"]').attr("aria-selected", !1); t.get(0) != E.el;) {
                                    if ("transparent" != t.css(r) && "rgba(0, 0, 0, 0)" != t.css(r)) {
                                        var s = e.find(".fr-" + o + '-color .fr-select-color[data-param1="' + E.helpers.RGBToHex(t.css(r)) + '"]');
                                        s.append('<span class="fr-selected-color" aria-hidden="true">\uf00c</span>'), s.addClass("fr-active-item").attr("aria-selected", !0);
                                        break
                                    }
                                    t = t.parent()
                                }
                                l(o)
                            }(o)
                        }), o.is(":visible")) {
                        var e = o.offset().left + o.outerWidth() / 2,
                            t = o.offset().top + (E.opts.toolbarBottom ? 10 : o.outerHeight() - 10);
                        E.popups.show("colors.picker", e, t, o.outerHeight())
                    } else E.position.forSelection(r), E.popups.show("colors.picker")
            },
            hideColorsPopup: r,
            changeSet: function(o, r) {
                o.hasClass("fr-selected-tab") || (o.siblings().removeClass("fr-selected-tab").attr("aria-pressed", !1), o.addClass("fr-selected-tab").attr("aria-pressed", !0), o.parents(".fr-popup").find(".fr-color-set").removeClass("fr-selected-set"), o.parents(".fr-popup").find(".fr-color-set.fr-" + r + "-color").addClass("fr-selected-set"), l(r)), E.accessibility.focusPopup(o.parents(".fr-popup"))
            },
            background: t,
            customColor: function() {
                var o = E.popups.get("colors.picker"),
                    r = o.find(".fr-color-hex-layer input");
                if (r.length) {
                    var e = r.val();
                    "background" == o.find(".fr-selected-tab").attr("data-param1") ? t(e) : a(e)
                }
            },
            text: a,
            back: function() {
                E.popups.hide("colors.picker"), E.toolbar.showInline()
            }
        }
    }, C.FE.DefineIcon("colors", {
        NAME: "tint"
    }), C.FE.RegisterCommand("color", {
        title: "Colors",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("colors.picker") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("colors.picker")) : this.colors.showColorsPopup()
        },
        plugin: "colors"
    }), C.FE.RegisterCommand("textColor", {
        undo: !0,
        callback: function(o, r) {
            this.colors.text(r)
        }
    }), C.FE.RegisterCommand("backgroundColor", {
        undo: !0,
        callback: function(o, r) {
            this.colors.background(r)
        }
    }), C.FE.RegisterCommand("colorChangeSet", {
        undo: !1,
        focus: !1,
        callback: function(o, r) {
            var e = this.popups.get("colors.picker").find('.fr-command[data-cmd="' + o + '"][data-param1="' + r + '"]');
            this.colors.changeSet(e, r)
        }
    }), C.FE.DefineIcon("colorsBack", {
        NAME: "arrow-left"
    }), C.FE.RegisterCommand("colorsBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.colors.back()
        }
    }), C.FE.RegisterCommand("customColor", {
        title: "OK",
        undo: !0,
        callback: function() {
            this.colors.customColor()
        }
    }), C.FE.DefineIcon("remove", {
        NAME: "eraser"
    })
});

/*!
 * link Plugin
 */

! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t)
    } : n(window.jQuery)
}(function(m) {
    m.extend(m.FE.POPUP_TEMPLATES, {
        "link.edit": "[_BUTTONS_]",
        "link.insert": "[_BUTTONS_][_INPUT_LAYER_]"
    }), m.extend(m.FE.DEFAULTS, {
        linkEditButtons: ["linkOpen", "linkStyle", "linkEdit", "linkRemove"],
        linkInsertButtons: ["linkBack", "|", "linkList"],
        linkAttributes: {},
        linkAutoPrefix: "http://",
        linkStyles: {
            "fr-green": "Green",
            "fr-strong": "Thick"
        },
        linkMultipleStyles: !0,
        linkConvertEmailAddress: !0,
        linkAlwaysBlank: !1,
        linkAlwaysNoFollow: !1,
        linkNoOpener: !0,
        linkNoReferrer: !0,
        linkList: [{
            text: "Froala",
            href: "https://froala.com",
            target: "_blank"
        }, {
            text: "Google",
            href: "https://google.com",
            target: "_blank"
        }, {
            displayText: "Facebook",
            href: "https://facebook.com"
        }],
        linkText: !0
    }), m.FE.PLUGINS.link = function(d) {
        function c() {
            var e = d.image ? d.image.get() : null;
            if (!e && d.$wp) {
                var t = d.selection.ranges(0).commonAncestorContainer;
                try {
                    t && (t.contains && t.contains(d.el) || !d.el.contains(t) || d.el == t) && (t = null)
                } catch (r) {
                    t = null
                }
                if (t && "A" === t.tagName) return t;
                var n = d.selection.element(),
                    i = d.selection.endElement();
                "A" == n.tagName || d.node.isElement(n) || (n = m(n).parentsUntil(d.$el, "a:first").get(0)), "A" == i.tagName || d.node.isElement(i) || (i = m(i).parentsUntil(d.$el, "a:first").get(0));
                try {
                    i && (i.contains && i.contains(d.el) || !d.el.contains(i) || d.el == i) && (i = null)
                } catch (r) {
                    i = null
                }
                try {
                    n && (n.contains && n.contains(d.el) || !d.el.contains(n) || d.el == n) && (n = null)
                } catch (r) {
                    n = null
                }
                return i && i == n && "A" == i.tagName ? (d.browser.msie || d.helpers.isMobile()) && (d.selection.info(n).atEnd || d.selection.info(n).atStart) ? null : n : null
            }
            return "A" == d.el.tagName ? d.el : e && e.get(0).parentNode && "A" == e.get(0).parentNode.tagName ? e.get(0).parentNode : void 0
        }

        function u() {
            var e, t, n, i, r = d.image ? d.image.get() : null,
                l = [];
            if (r) "A" == r.get(0).parentNode.tagName && l.push(r.get(0).parentNode);
            else if (d.win.getSelection) {
                var a = d.win.getSelection();
                if (a.getRangeAt && a.rangeCount) {
                    i = d.doc.createRange();
                    for (var s = 0; s < a.rangeCount; ++s)
                        if ((t = (e = a.getRangeAt(s)).commonAncestorContainer) && 1 != t.nodeType && (t = t.parentNode), t && "a" == t.nodeName.toLowerCase()) l.push(t);
                        else {
                            n = t.getElementsByTagName("a");
                            for (var o = 0; o < n.length; ++o) i.selectNodeContents(n[o]), i.compareBoundaryPoints(e.END_TO_START, e) < 1 && -1 < i.compareBoundaryPoints(e.START_TO_END, e) && l.push(n[o])
                        }
                }
            } else if (d.doc.selection && "Control" != d.doc.selection.type)
                if ("a" == (t = (e = d.doc.selection.createRange()).parentElement()).nodeName.toLowerCase()) l.push(t);
                else {
                    n = t.getElementsByTagName("a"), i = d.doc.body.createTextRange();
                    for (var p = 0; p < n.length; ++p) i.moveToElementText(n[p]), -1 < i.compareEndPoints("StartToEnd", e) && i.compareEndPoints("EndToStart", e) < 1 && l.push(n[p])
                }
            return l
        }

        function k(r) {
            if (d.core.hasFocus()) {
                if (a(), r && "keyup" === r.type && (r.altKey || r.which == m.FE.KEYCODE.ALT)) return !0;
                setTimeout(function() {
                    if (!r || r && (1 == r.which || "mouseup" != r.type)) {
                        var e = c(),
                            t = d.image ? d.image.get() : null;
                        if (e && !t) {
                            if (d.image) {
                                var n = d.node.contents(e);
                                if (1 == n.length && "IMG" == n[0].tagName) {
                                    var i = d.selection.ranges(0);
                                    return 0 === i.startOffset && 0 === i.endOffset ? m(e).before(m.FE.MARKERS) : m(e).after(m.FE.MARKERS), d.selection.restore(), !1
                                }
                            }
                            r && r.stopPropagation(), l(e)
                        }
                    }
                }, d.helpers.isIOS() ? 100 : 0)
            }
        }

        function l(e) {
            var t = d.popups.get("link.edit");
            t || (t = function() {
                var e = "";
                1 <= d.opts.linkEditButtons.length && ("A" == d.el.tagName && 0 <= d.opts.linkEditButtons.indexOf("linkRemove") && d.opts.linkEditButtons.splice(d.opts.linkEditButtons.indexOf("linkRemove"), 1), e = '<div class="fr-buttons">' + d.button.buildList(d.opts.linkEditButtons) + "</div>");
                var t = {
                        buttons: e
                    },
                    n = d.popups.create("link.edit", t);
                d.$wp && d.events.$on(d.$wp, "scroll.link-edit", function() {
                    c() && d.popups.isVisible("link.edit") && l(c())
                });
                return n
            }());
            var n = m(e);
            d.popups.isVisible("link.edit") || d.popups.refresh("link.edit"), d.popups.setContainer("link.edit", d.$sc);
            var i = n.offset().left + m(e).outerWidth() / 2,
                r = n.offset().top + n.outerHeight();
            d.popups.show("link.edit", i, r, n.outerHeight())
        }

        function a() {
            d.popups.hide("link.edit")
        }

        function o() {}

        function p() {
            var e = d.popups.get("link.insert"),
                t = c();
            if (t) {
                var n, i, r = m(t),
                    l = e.find('input.fr-link-attr[type="text"]'),
                    a = e.find('input.fr-link-attr[type="checkbox"]');
                for (n = 0; n < l.length; n++)(i = m(l[n])).val(r.attr(i.attr("name") || ""));
                for (a.prop("checked", !1), n = 0; n < a.length; n++) i = m(a[n]), r.attr(i.attr("name")) == i.data("checked") && i.prop("checked", !0);
                e.find('input.fr-link-attr[type="text"][name="text"]').val(r.text())
            } else e.find('input.fr-link-attr[type="text"]').val(""), e.find('input.fr-link-attr[type="checkbox"]').prop("checked", !1), e.find('input.fr-link-attr[type="text"][name="text"]').val(d.selection.text());
            e.find("input.fr-link-attr").trigger("change"), (d.image ? d.image.get() : null) ? e.find('.fr-link-attr[name="text"]').parent().hide() : e.find('.fr-link-attr[name="text"]').parent().show()
        }

        function s(e) {
            if (e) return d.popups.onRefresh("link.insert", p), d.popups.onHide("link.insert", o), !0;
            var t = "";
            1 <= d.opts.linkInsertButtons.length && (t = '<div class="fr-buttons">' + d.button.buildList(d.opts.linkInsertButtons) + "</div>");
            var n = "",
                i = 0;
            for (var r in n = '<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-' + d.id + '">', n += '<div class="fr-input-line"><input id="fr-link-insert-layer-url-' + d.id + '" name="href" type="text" class="fr-link-attr" placeholder="' + d.language.translate("URL") + '" tabIndex="' + ++i + '"></div>', d.opts.linkText && (n += '<div class="fr-input-line"><input id="fr-link-insert-layer-text-' + d.id + '" name="text" type="text" class="fr-link-attr" placeholder="' + d.language.translate("Text") + '" tabIndex="' + ++i + '"></div>'), d.opts.linkAttributes)
                if (d.opts.linkAttributes.hasOwnProperty(r)) {
                    var l = d.opts.linkAttributes[r];
                    n += '<div class="fr-input-line"><input name="' + r + '" type="text" class="fr-link-attr" placeholder="' + d.language.translate(l) + '" tabIndex="' + ++i + '"></div>'
                }
            d.opts.linkAlwaysBlank || (n += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-' + d.id + '" tabIndex="' + ++i + '"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg></span></span><label for="fr-link-target-' + d.id + '">' + d.language.translate("Open in new tab") + "</label></div>");
            var a = {
                    buttons: t,
                    input_layer: n += '<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="' + ++i + '" type="button">' + d.language.translate("Insert") + "</button></div></div>"
                },
                s = d.popups.create("link.insert", a);
            return d.$wp && d.events.$on(d.$wp, "scroll.link-insert", function() {
                (d.image ? d.image.get() : null) && d.popups.isVisible("link.insert") && h(), d.popups.isVisible("link.insert") && g()
            }), s
        }

        function f(e, t, n) {
            if (void 0 === n && (n = {}), !1 === d.events.trigger("link.beforeInsert", [e, t, n])) return !1;
            var i = d.image ? d.image.get() : null;
            i || "A" == d.el.tagName ? "A" == d.el.tagName && d.$el.focus() : (d.selection.restore(), d.popups.hide("link.insert"));
            var r = e;
            d.opts.linkConvertEmailAddress && d.helpers.isEmail(e) && !/^mailto:.*/i.test(e) && (e = "mailto:" + e);
            if ("" === d.opts.linkAutoPrefix || new RegExp("^(" + m.FE.LinkProtocols.join("|") + "):.", "i").test(e) || /^data:image.*/i.test(e) || /^(https?:|ftps?:|file:|)\/\//i.test(e) || /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e) || ["/", "{", "[", "#", "(", "."].indexOf((e || "")[0]) < 0 && (e = d.opts.linkAutoPrefix + d.helpers.sanitizeURL(e)), e = d.helpers.sanitizeURL(e), d.opts.linkAlwaysBlank && (n.target = "_blank"), d.opts.linkAlwaysNoFollow && (n.rel = "nofollow"), d.helpers.isEmail(r) && (n.target = null, n.rel = null), "_blank" == n.target ? (d.opts.linkNoOpener && (n.rel ? n.rel += " noopener" : n.rel = "noopener"), d.opts.linkNoReferrer && (n.rel ? n.rel += " noreferrer" : n.rel = "noreferrer")) : null == n.target && (n.rel ? n.rel = n.rel.replace(/noopener/, "").replace(/noreferrer/, "") : n.rel = null), t = t || "", e === d.opts.linkAutoPrefix) return d.popups.get("link.insert").find('input[name="href"]').addClass("fr-error"), d.events.trigger("link.bad", [r]), !1;
            var l, a = c();
            if (a) {
                if ((l = m(a)).attr("href", e), 0 < t.length && l.text() != t && !i) {
                    for (var s = l.get(0); 1 === s.childNodes.length && s.childNodes[0].nodeType == Node.ELEMENT_NODE;) s = s.childNodes[0];
                    m(s).text(t)
                }
                i || l.prepend(m.FE.START_MARKER).append(m.FE.END_MARKER), l.attr(n), i || d.selection.restore()
            } else {
                i ? (i.wrap('<a href="' + e + '"></a>'), d.image.hasCaption() && i.parent().append(i.parents(".fr-img-caption").find(".fr-inner"))) : (d.format.remove("a"), d.selection.isCollapsed() ? (t = 0 === t.length ? r : t, d.html.insert('<a href="' + e + '">' + m.FE.START_MARKER + t.replace(/&/g, "&amp;").replace(/</, "&lt;", ">", "&gt;") + m.FE.END_MARKER + "</a>"), d.selection.restore()) : 0 < t.length && t != d.selection.text().replace(/\n/g, "") ? (d.selection.remove(), d.html.insert('<a href="' + e + '">' + m.FE.START_MARKER + t.replace(/&/g, "&amp;") + m.FE.END_MARKER + "</a>"), d.selection.restore()) : (! function() {
                    if (!d.selection.isCollapsed()) {
                        d.selection.save();
                        for (var e = d.$el.find(".fr-marker").addClass("fr-unprocessed").toArray(); e.length;) {
                            var t = m(e.pop());
                            t.removeClass("fr-unprocessed");
                            var n = d.node.deepestParent(t.get(0));
                            if (n) {
                                for (var i = t.get(0), r = "", l = ""; i = i.parentNode, d.node.isBlock(i) || (r += d.node.closeTagString(i), l = d.node.openTagString(i) + l), i != n;);
                                var a = d.node.openTagString(t.get(0)) + t.html() + d.node.closeTagString(t.get(0));
                                t.replaceWith('<span id="fr-break"></span>');
                                var s = n.outerHTML;
                                s = (s = s.replace(/<span id="fr-break"><\/span>/g, r + a + l)).replace(l + r, ""), n.outerHTML = s
                            }
                            e = d.$el.find(".fr-marker.fr-unprocessed").toArray()
                        }
                        d.html.cleanEmptyTags(), d.selection.restore()
                    }
                }(), d.format.apply("a", {
                    href: e
                })));
                for (var o = u(), p = 0; p < o.length; p++)(l = m(o[p])).attr(n), l.removeAttr("_moz_dirty");
                1 == o.length && d.$wp && !i && (m(o[0]).prepend(m.FE.START_MARKER).append(m.FE.END_MARKER), d.selection.restore())
            }
            if (i) {
                var f = d.popups.get("link.insert");
                f && f.find("input:focus").blur(), d.image.edit(i)
            } else k()
        }

        function g() {
            a();
            var e = c();
            if (e) {
                var t = d.popups.get("link.insert");
                t || (t = s()), d.popups.isVisible("link.insert") || (d.popups.refresh("link.insert"), d.selection.save(), d.helpers.isMobile() && (d.events.disableBlur(), d.$el.blur(), d.events.enableBlur())), d.popups.setContainer("link.insert", d.$sc);
                var n = (d.image ? d.image.get() : null) || m(e),
                    i = n.offset().left + n.outerWidth() / 2,
                    r = n.offset().top + n.outerHeight();
                d.popups.show("link.insert", i, r, n.outerHeight())
            }
        }

        function h() {
            var e = d.image ? d.image.getEl() : null;
            if (e) {
                var t = d.popups.get("link.insert");
                d.image.hasCaption() && (e = e.find(".fr-img-wrap")), t || (t = s()), p(), d.popups.setContainer("link.insert", d.$sc);
                var n = e.offset().left + e.outerWidth() / 2,
                    i = e.offset().top + e.outerHeight();
                d.popups.show("link.insert", n, i, e.outerHeight())
            }
        }
        return {
            _init: function() {
                d.events.on("keyup", function(e) {
                    e.which != m.FE.KEYCODE.ESC && k(e)
                }), d.events.on("window.mouseup", k), d.events.$on(d.$el, "click", "a", function(e) {
                    d.edit.isDisabled() && e.preventDefault()
                }), d.helpers.isMobile() && d.events.$on(d.$doc, "selectionchange", k), s(!0), "A" == d.el.tagName && d.$el.addClass("fr-view"), d.events.on("toolbar.esc", function() {

                    if (d.popups.isVisible("link.edit")) return d.events.disableBlur(), d.events.focus(), !1
                }, !0)
            },
            remove: function() {
                var e = c(),
                    t = d.image ? d.image.get() : null;
                if (!1 === d.events.trigger("link.beforeRemove", [e])) return !1;
                t && e ? (t.unwrap(), d.image.edit(t)) : e && (d.selection.save(), m(e).replaceWith(m(e).html()), d.selection.restore(), a())
            },
            showInsertPopup: function() {
                var e = d.$tb.find('.fr-command[data-cmd="insertLink"]'),
                    t = d.popups.get("link.insert");
                if (t || (t = s()), !t.hasClass("fr-active"))
                    if (d.popups.refresh("link.insert"), d.popups.setContainer("link.insert", d.$tb || d.$sc), e.is(":visible")) {
                        var n = e.offset().left + e.outerWidth() / 2,
                            i = e.offset().top + (d.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                        d.popups.show("link.insert", n, i, e.outerHeight())
                    } else d.position.forSelection(t), d.popups.show("link.insert")
            },
            usePredefined: function(e) {
                var t, n, i = d.opts.linkList[e],
                    r = d.popups.get("link.insert"),
                    l = r.find('input.fr-link-attr[type="text"]'),
                    a = r.find('input.fr-link-attr[type="checkbox"]');
                for (n = 0; n < l.length; n++) i[(t = m(l[n])).attr("name")] ? t.val(i[t.attr("name")]) : "text" != t.attr("name") && t.val("");
                for (n = 0; n < a.length; n++)(t = m(a[n])).prop("checked", t.data("checked") == i[t.attr("name")]);
                d.accessibility.focusPopup(r)
            },
            insertCallback: function() {
                var e, t, n = d.popups.get("link.insert"),
                    i = n.find('input.fr-link-attr[type="text"]'),
                    r = n.find('input.fr-link-attr[type="checkbox"]'),
                    l = (i.filter('[name="href"]').val() || "").trim(),
                    a = i.filter('[name="text"]').val(),
                    s = {};
                for (t = 0; t < i.length; t++) e = m(i[t]), ["href", "text"].indexOf(e.attr("name")) < 0 && (s[e.attr("name")] = e.val());
                for (t = 0; t < r.length; t++)(e = m(r[t])).is(":checked") ? s[e.attr("name")] = e.data("checked") : s[e.attr("name")] = e.data("unchecked") || null;
                var o = d.helpers.scrollTop();
                f(l, a, s), m(d.o_win).scrollTop(o)
            },
            insert: f,
            update: g,
            get: c,
            allSelected: u,
            back: function() {
                d.image && d.image.get() ? d.image.back() : (d.events.disableBlur(), d.selection.restore(), d.events.enableBlur(), c() && d.$wp ? (d.selection.restore(), a(), k()) : "A" == d.el.tagName ? (d.$el.focus(), k()) : (d.popups.hide("link.insert"), d.toolbar.showInline()))
            },
            imageLink: h,
            applyStyle: function(e, t, n) {
                void 0 === n && (n = d.opts.linkMultipleStyles), void 0 === t && (t = d.opts.linkStyles);
                var i = c();
                if (!i) return !1;
                if (!n) {
                    var r = Object.keys(t);
                    r.splice(r.indexOf(e), 1), m(i).removeClass(r.join(" "))
                }
                m(i).toggleClass(e), k()
            }
        }
    }, m.FE.DefineIcon("insertLink", {
        NAME: "link"
    }), m.FE.RegisterShortcut(m.FE.KEYCODE.K, "insertLink", null, "K"), m.FE.RegisterCommand("insertLink", {
        title: "Insert Link",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("link.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("link.insert")) : this.link.showInsertPopup()
        },
        plugin: "link"
    }), m.FE.DefineIcon("linkOpen", {
        NAME: "external-link",
        FA5NAME: "external-link-alt"
    }), m.FE.RegisterCommand("linkOpen", {
        title: "Open Link",
        undo: !1,
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
        },
        callback: function() {
            var e = this.link.get();
            e && (-1 !== e.href.indexOf("mailto:") ? this.o_win.open(e.href).close() : this.o_win.open(e.href, "_blank", "noopener"), this.popups.hide("link.edit"))
        },
        plugin: "link"
    }), m.FE.DefineIcon("linkEdit", {
        NAME: "edit"
    }), m.FE.RegisterCommand("linkEdit", {
        title: "Edit Link",
        undo: !1,
        refreshAfterCallback: !1,
        popup: !0,
        callback: function() {
            this.link.update()
        },
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
        },
        plugin: "link"
    }), m.FE.DefineIcon("linkRemove", {
        NAME: "unlink"
    }), m.FE.RegisterCommand("linkRemove", {
        title: "Unlink",
        callback: function() {
            this.link.remove()
        },
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
        },
        plugin: "link"
    }), m.FE.DefineIcon("linkBack", {
        NAME: "arrow-left"
    }), m.FE.RegisterCommand("linkBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.link.back()
        },
        refresh: function(e) {
            var t = this.link.get() && this.doc.hasFocus();
            (this.image ? this.image.get() : null) || t || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
        },
        plugin: "link"
    }), m.FE.DefineIcon("linkList", {
        NAME: "search"
    }), m.FE.RegisterCommand("linkList", {
        title: "Choose Link",
        type: "dropdown",
        focus: !1,
        undo: !1,
        refreshAfterCallback: !1,
        html: function() {
            for (var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.linkList, n = 0; n < t.length; n++) e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="' + n + '">' + (t[n].displayText || t[n].text) + "</a></li>";
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.link.usePredefined(t)
        },
        plugin: "link"
    }), m.FE.RegisterCommand("linkInsert", {
        focus: !1,
        refreshAfterCallback: !1,
        callback: function() {
            this.link.insertCallback()
        },
        refresh: function(e) {
            this.link.get() ? e.text(this.language.translate("Update")) : e.text(this.language.translate("Insert"))
        },
        plugin: "link"
    }), m.FE.DefineIcon("imageLink", {
        NAME: "link"
    }), m.FE.RegisterCommand("imageLink", {
        title: "Insert Link",
        undo: !1,
        focus: !1,
        popup: !0,
        callback: function() {
            this.link.imageLink()
        },
        refresh: function(e) {
            var t;
            this.link.get() ? ((t = e.prev()).hasClass("fr-separator") && t.removeClass("fr-hidden"), e.addClass("fr-hidden")) : ((t = e.prev()).hasClass("fr-separator") && t.addClass("fr-hidden"), e.removeClass("fr-hidden"))
        },
        plugin: "link"
    }), m.FE.DefineIcon("linkStyle", {
        NAME: "magic"
    }), m.FE.RegisterCommand("linkStyle", {
        title: "Style",
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.linkStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="' + n + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.link.applyStyle(t)
        },
        refreshOnShow: function(e, t) {
            var n = this.link.get();
            if (n) {
                var i = m(n);
                t.find(".fr-command").each(function() {
                    var e = m(this).data("param1"),
                        t = i.hasClass(e);
                    m(this).toggleClass("fr-active", t).attr("aria-selected", t)
                })
            }
        },
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
        },
        plugin: "link"
    })
});

/*!
 * image Plugin
 */

! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), a(t)
    } : a(window.jQuery)
}(function(be) {
    be.extend(be.FE.POPUP_TEMPLATES, {
        "image.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]",
        "image.edit": "[_BUTTONS_]",
        "image.alt": "[_BUTTONS_][_ALT_LAYER_]",
        "image.size": "[_BUTTONS_][_SIZE_LAYER_]"
    }), be.extend(be.FE.DEFAULTS, {
        imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
        imageEditButtons: ["imageReplace", "imageAlign", "imageCaption", "imageRemove", "|", "imageLink", "linkOpen", "linkEdit", "linkRemove", "-", "imageDisplay", "imageStyle", "imageAlt", "imageSize"],
        imageAltButtons: ["imageBack", "|"],
        imageSizeButtons: ["imageBack", "|"],
        imageUpload: !0,
        imageUploadURL: null,
        imageCORSProxy: "https://cors-anywhere.froala.com",
        imageUploadRemoteUrls: !0,
        imageUploadParam: "file",
        imageUploadParams: {},
        imageUploadToS3: !1,
        imageUploadMethod: "POST",
        imageMaxSize: 10485760,
        imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "webp"],
        imageResize: !0,
        imageResizeWithPercent: !1,
        imageRoundPercent: !1,
        imageDefaultWidth: 300,
        imageDefaultAlign: "center",
        imageDefaultDisplay: "block",
        imageSplitHTML: !1,
        imageStyles: {
            "fr-rounded": "Rounded",
            "fr-bordered": "Bordered",
            "fr-shadow": "Shadow"
        },
        imageMove: !0,
        imageMultipleStyles: !0,
        imageTextNear: !0,
        imagePaste: !0,
        imagePasteProcess: !1,
        imageMinWidth: 16,
        imageOutputSize: !1,
        imageDefaultMargin: 5,
        imageAddNewLine: !1
    }), be.FE.PLUGINS.image = function(g) {
        var d, l, f, p, o, a, c = "https://i.froala.com/upload",
            t = !1,
            i = 1,
            u = 2,
            m = 3,
            h = 4,
            v = 5,
            b = 6,
            r = {};

        function y() {
            var e = g.popups.get("image.insert").find(".fr-image-by-url-layer input");
            e.val(""), d && e.val(d.attr("src")), e.trigger("change")
        }

        function n() {
            var e = g.popups.get("image.edit");
            if (e || (e = U()), e) {
                var t = he();
                ve() && (t = t.find(".fr-img-wrap")), g.popups.setContainer("image.edit", g.$sc), g.popups.refresh("image.edit");
                var a = t.offset().left + t.outerWidth() / 2,
                    i = t.offset().top + t.outerHeight();
                d.hasClass("fr-uploading") ? $() : g.popups.show("image.edit", a, i, t.outerHeight())
            }
        }

        function w() {
            I()
        }

        function e() {
            for (var e, t, a = "IMG" == g.el.tagName ? [g.el] : g.el.querySelectorAll("img"), i = 0; i < a.length; i++) {
                var r = be(a[i]);
                !g.opts.htmlUntouched && g.opts.useClasses ? ((g.opts.imageDefaultAlign || g.opts.imageDefaultDisplay) && (0 < (t = r).parents(".fr-img-caption").length && (t = t.parents(".fr-img-caption:first")), t.hasClass("fr-dii") || t.hasClass("fr-dib") || (t.addClass("fr-fi" + ge(t)[0]), t.addClass("fr-di" + de(t)[0]), t.css("margin", ""), t.css("float", ""), t.css("display", ""), t.css("z-index", ""), t.css("position", ""), t.css("overflow", ""), t.css("vertical-align", ""))), g.opts.imageTextNear || (0 < r.parents(".fr-img-caption").length ? r.parents(".fr-img-caption:first").removeClass("fr-dii").addClass("fr-dib") : r.removeClass("fr-dii").addClass("fr-dib"))) : g.opts.htmlUntouched || g.opts.useClasses || (g.opts.imageDefaultAlign || g.opts.imageDefaultDisplay) && (0 < (e = r).parents(".fr-img-caption").length && (e = e.parents(".fr-img-caption:first")), pe(e, e.hasClass("fr-dib") ? "block" : e.hasClass("fr-dii") ? "inline" : null, e.hasClass("fr-fil") ? "left" : e.hasClass("fr-fir") ? "right" : ge(e)), e.removeClass("fr-dib fr-dii fr-fir fr-fil")), g.opts.iframe && r.on("load", g.size.syncIframe)
            }
        }

        function E(e) {
            void 0 === e && (e = !0);
            var t, a = Array.prototype.slice.call(g.el.querySelectorAll("img")),
                i = [];
            for (t = 0; t < a.length; t++)
                if (i.push(a[t].getAttribute("src")), be(a[t]).toggleClass("fr-draggable", g.opts.imageMove), "" === a[t].getAttribute("class") && a[t].removeAttribute("class"), "" === a[t].getAttribute("style") && a[t].removeAttribute("style"), a[t].parentNode && a[t].parentNode.parentNode && g.node.hasClass(a[t].parentNode.parentNode, "fr-img-caption")) {
                    var r = a[t].parentNode.parentNode;
                    g.browser.mozilla || r.setAttribute("contenteditable", !1), r.setAttribute("draggable", !1), r.classList.add("fr-draggable");
                    var n = a[t].nextSibling;
                    n && !g.browser.mozilla && n.setAttribute("contenteditable", !0)
                }
            if (o)
                for (t = 0; t < o.length; t++) i.indexOf(o[t].getAttribute("src")) < 0 && g.events.trigger("image.removed", [be(o[t])]);
            if (o && e) {
                var s = [];
                for (t = 0; t < o.length; t++) s.push(o[t].getAttribute("src"));
                for (t = 0; t < a.length; t++) s.indexOf(a[t].getAttribute("src")) < 0 && g.events.trigger("image.loaded", [be(a[t])])
            }
            o = a
        }

        function C() {
            if (l || function() {
                    var e;
                    g.shared.$image_resizer ? (l = g.shared.$image_resizer, p = g.shared.$img_overlay, g.events.on("destroy", function() {
                        l.removeClass("fr-active").appendTo(be("body:first"))
                    }, !0)) : (g.shared.$image_resizer = be('<div class="fr-image-resizer"></div>'), l = g.shared.$image_resizer, g.events.$on(l, "mousedown", function(e) {
                        e.stopPropagation()
                    }, !0), g.opts.imageResize && (l.append(s("nw") + s("ne") + s("sw") + s("se")), g.shared.$img_overlay = be('<div class="fr-image-overlay"></div>'), p = g.shared.$img_overlay, e = l.get(0).ownerDocument, be(e).find("body:first").append(p)));
                    g.events.on("shared.destroy", function() {
                        l.html("").removeData().remove(), l = null, g.opts.imageResize && (p.remove(), p = null)
                    }, !0), g.helpers.isMobile() || g.events.$on(be(g.o_win), "resize", function() {
                        d && !d.hasClass("fr-uploading") ? se(!0) : d && (C(), ce(), $(!1))
                    });
                    if (g.opts.imageResize) {
                        e = l.get(0).ownerDocument, g.events.$on(l, g._mousedown, ".fr-handler", R), g.events.$on(be(e), g._mousemove, S), g.events.$on(be(e.defaultView || e.parentWindow), g._mouseup, x), g.events.$on(p, "mouseleave", x);
                        var i = 1,
                            r = null,
                            n = 0;
                        g.events.on("keydown", function(e) {
                            if (d) {
                                var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                                    a = e.which;
                                (a !== r || 200 < e.timeStamp - n) && (i = 1), (a == be.FE.KEYCODE.EQUALS || g.browser.mozilla && a == be.FE.KEYCODE.FF_EQUALS) && t && !e.altKey ? i = q.call(this, e, 1, 1, i) : (a == be.FE.KEYCODE.HYPHEN || g.browser.mozilla && a == be.FE.KEYCODE.FF_HYPHEN) && t && !e.altKey ? i = q.call(this, e, 2, -1, i) : g.keys.ctrlKey(e) || a != be.FE.KEYCODE.ENTER || (d.before("<br>"), k(d)), r = a, n = e.timeStamp
                            }
                        }, !0), g.events.on("keyup", function() {
                            i = 1
                        })
                    }
                }(), !d) return !1;
            var e = g.$wp || g.$sc;
            e.append(l), l.data("instance", g);
            var t = e.scrollTop() - ("static" != e.css("position") ? e.offset().top : 0),
                a = e.scrollLeft() - ("static" != e.css("position") ? e.offset().left : 0);
            a -= g.helpers.getPX(e.css("border-left-width")), t -= g.helpers.getPX(e.css("border-top-width")), g.$el.is("img") && g.$sc.is("body") && (a = t = 0);
            var i = he();
            ve() && (i = i.find(".fr-img-wrap")), l.css("top", (g.opts.iframe ? i.offset().top : i.offset().top + t) - 1).css("left", (g.opts.iframe ? i.offset().left : i.offset().left + a) - 1).css("width", i.get(0).getBoundingClientRect().width).css("height", i.get(0).getBoundingClientRect().height).addClass("fr-active")
        }

        function s(e) {
            return '<div class="fr-handler fr-h' + e + '"></div>'
        }

        function A(e) {
            ve() ? d.parents(".fr-img-caption").css("width", e) : d.css("width", e)
        }

        function R(e) {
            if (!g.core.sameInstance(l)) return !0;
            if (e.preventDefault(), e.stopPropagation(), g.$el.find("img.fr-error").left) return !1;
            g.undo.canDo() || g.undo.saveStep();
            var t = e.pageX || e.originalEvent.touches[0].pageX;
            if ("mousedown" == e.type) {
                var a = g.$oel.get(0).ownerDocument,
                    i = a.defaultView || a.parentWindow,
                    r = !1;
                try {
                    r = i.location != i.parent.location && !(i.$ && i.$.FE)
                } catch (o) {}
                r && i.frameElement && (t += g.helpers.getPX(be(i.frameElement).offset().left) + i.frameElement.clientLeft)
            }(f = be(this)).data("start-x", t), f.data("start-width", d.width()), f.data("start-height", d.height());
            var n = d.width();
            if (g.opts.imageResizeWithPercent) {
                var s = d.parentsUntil(g.$el, g.html.blockTagsQuery()).get(0) || g.el;
                n = (n / be(s).outerWidth() * 100).toFixed(2) + "%"
            }
            A(n), p.show(), g.popups.hideAll(), fe()
        }

        function S(e) {
            if (!g.core.sameInstance(l)) return !0;
            var t;
            if (f && d) {
                if (e.preventDefault(), g.$el.find("img.fr-error").left) return !1;
                var a = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null);
                if (!a) return !1;
                var i = a - f.data("start-x"),
                    r = f.data("start-width");
                if ((f.hasClass("fr-hnw") || f.hasClass("fr-hsw")) && (i = 0 - i), g.opts.imageResizeWithPercent) {
                    var n = d.parentsUntil(g.$el, g.html.blockTagsQuery()).get(0) || g.el;
                    r = ((r + i) / be(n).outerWidth() * 100).toFixed(2), g.opts.imageRoundPercent && (r = Math.round(r)), A(r + "%"), (t = ve() ? (g.helpers.getPX(d.parents(".fr-img-caption").css("width")) / be(n).outerWidth() * 100).toFixed(2) : (g.helpers.getPX(d.css("width")) / be(n).outerWidth() * 100).toFixed(2)) === r || g.opts.imageRoundPercent || A(t + "%"), d.css("height", "").removeAttr("height")
                } else r + i >= g.opts.imageMinWidth && (A(r + i), t = ve() ? g.helpers.getPX(d.parents(".fr-img-caption").css("width")) : g.helpers.getPX(d.css("width"))), t !== r + i && A(t), ((d.attr("style") || "").match(/(^height:)|(; *height:)/) || d.attr("height")) && (d.css("height", f.data("start-height") * d.width() / f.data("start-width")), d.removeAttr("height"));
                C(), g.events.trigger("image.resize", [me()])
            }
        }

        function x(e) {
            if (!g.core.sameInstance(l)) return !0;
            if (f && d) {
                if (e && e.stopPropagation(), g.$el.find("img.fr-error").left) return !1;
                f = null, p.hide(), C(), n(), g.undo.saveStep(), g.events.trigger("image.resizeEnd", [me()])
            }
        }

        function D(e, t, a) {
            g.edit.on(), d && d.addClass("fr-error"),
                function(e) {
                    $();
                    var t = g.popups.get("image.insert").find(".fr-image-progress-bar-layer");
                    t.addClass("fr-error");
                    var a = t.find("h3");
                    a.text(e), g.events.disableBlur(), a.focus()
                }(r[e] + g.language.translate("Something went wrong. Please try again.")), !d && a && Q(a), g.events.trigger("image.error", [{
                    code: e,
                    message: r[e]
                }, t, a])
        }

        function U(e) {
            if (e) return g.$wp && g.events.$on(g.$wp, "scroll.image-edit", function() {
                d && g.popups.isVisible("image.edit") && (g.events.disableBlur(), n())
            }), !0;
            var t = "";
            if (0 < g.opts.imageEditButtons.length) {
                t += '<div class="fr-buttons">', t += g.button.buildList(g.opts.imageEditButtons);
                var a = {
                    buttons: t += "</div>"
                };
                return g.popups.create("image.edit", a)
            }
            return !1
        }

        function $(e) {
            var t = g.popups.get("image.insert");
            if (t || (t = K()), t.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), t.find(".fr-image-progress-bar-layer").addClass("fr-active"), t.find(".fr-buttons").hide(), d) {
                var a = he();
                g.popups.setContainer("image.insert", g.$sc);
                var i = a.offset().left + a.width() / 2,
                    r = a.offset().top + a.height();
                g.popups.show("image.insert", i, r, a.outerHeight())
            }
            void 0 === e && F(g.language.translate("Uploading"), 0)
        }

        function I(e) {
            var t = g.popups.get("image.insert");
            if (t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-image-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e || g.$el.find("img.fr-error").length)) {
                if (g.events.focus(), g.$el.find("img.fr-error").length && (g.$el.find("img.fr-error").remove(), g.undo.saveStep(), g.undo.run(), g.undo.dropRedo()), !g.$wp && d) {
                    var a = d;
                    se(!0), g.selection.setAfter(a.get(0)), g.selection.restore()
                }
                g.popups.hide("image.insert")
            }
        }

        function F(e, t) {
            var a = g.popups.get("image.insert");
            if (a) {
                var i = a.find(".fr-image-progress-bar-layer");
                i.find("h3").text(e + (t ? " " + t + "%" : "")), i.removeClass("fr-error"), t ? (i.find("div").removeClass("fr-indeterminate"), i.find("div > span").css("width", t + "%")) : i.find("div").addClass("fr-indeterminate")
            }
        }

        function k(e) {
            ne.call(e.get(0))
        }

        function B() {
            var e = be(this);
            g.popups.hide("image.insert"), e.removeClass("fr-uploading"), e.next().is("br") && e.next().remove(), k(e), g.events.trigger("image.loaded", [e])
        }

        function N(s, e, o, l, f) {
            g.edit.off(), F(g.language.translate("Loading image")), e && (s = g.helpers.sanitizeURL(s));
            var t = new Image;
            t.onload = function() {
                var e, t;
                if (l) {
                    g.undo.canDo() || l.hasClass("fr-uploading") || g.undo.saveStep();
                    var a = l.data("fr-old-src");
                    l.data("fr-image-pasted") && (a = null), g.$wp ? ((e = l.clone().removeData("fr-old-src").removeClass("fr-uploading").removeAttr("data-fr-image-pasted")).off("load"), a && l.attr("src", a), l.replaceWith(e)) : e = l;
                    for (var i = e.get(0).attributes, r = 0; r < i.length; r++) {
                        var n = i[r];
                        0 === n.nodeName.indexOf("data-") && e.removeAttr(n.nodeName)
                    }
                    if (void 0 !== o)
                        for (t in o) o.hasOwnProperty(t) && "link" != t && e.attr("data-" + t, o[t]);
                    e.on("load", B), e.attr("src", s), g.edit.on(), E(!1), g.undo.saveStep(), g.events.disableBlur(), g.$el.blur(), g.events.trigger(a ? "image.replaced" : "image.inserted", [e, f])
                } else e = L(s, o, B), E(!1), g.undo.saveStep(), g.events.disableBlur(), g.$el.blur(), g.events.trigger("image.inserted", [e, f])
            }, t.onerror = function() {
                D(i)
            }, $(g.language.translate("Loading image")), t.src = s
        }

        function O(e) {
            F(g.language.translate("Loading image"));
            var t = this.status,
                a = this.response,
                i = this.responseXML,
                r = this.responseText;
            try {
                if (g.opts.imageUploadToS3)
                    if (201 == t) {
                        var n = function(e) {
                            try {
                                var t = be(e).find("Location").text(),
                                    a = be(e).find("Key").text();
                                return !1 === g.events.trigger("image.uploadedToS3", [t, a, e], !0) ? (g.edit.on(), !1) : t
                            } catch (i) {
                                return D(h, e), !1
                            }
                        }(i);
                        n && N(n, !1, [], e, a || i)
                    } else D(h, a || i, e);
                else if (200 <= t && t < 300) {
                    var s = function(e) {
                        try {
                            if (!1 === g.events.trigger("image.uploaded", [e], !0)) return g.edit.on(), !1;
                            var t = JSON.parse(e);
                            return t.link ? t : (D(u, e), !1)
                        } catch (a) {
                            return D(h, e), !1
                        }
                    }(r);
                    s && N(s.link, !1, s, e, a || r)
                } else D(m, a || r, e)
            } catch (o) {
                D(h, a || r, e)
            }
        }

        function P() {
            D(h, this.response || this.responseText || this.responseXML)
        }

        function T(e) {
            if (e.lengthComputable) {
                var t = e.loaded / e.total * 100 | 0;
                F(g.language.translate("Uploading"), t)
            }
        }

        function L(e, t, a) {
            var i, r = "";
            if (t && void 0 !== t)
                for (i in t) t.hasOwnProperty(i) && "link" != i && (r += " data-" + i + '="' + t[i] + '"');
            var n = g.opts.imageDefaultWidth;
            n && "auto" != n && (n = g.opts.imageResizeWithPercent ? "100%" : n + "px");
            var s = be('<img src="' + e + '"' + r + (n ? ' style="width: ' + n + ';"' : "") + ">");
            pe(s, g.opts.imageDefaultDisplay, g.opts.imageDefaultAlign), s.on("load", a), s.on("error", a), g.edit.on(), g.events.focus(!0), g.selection.restore(), g.undo.saveStep(), g.opts.imageSplitHTML ? g.markers.split() : g.markers.insert(), g.html.wrap();
            var o = g.$el.find(".fr-marker");
            return o.length ? (o.parent().is("hr") && o.parent().after(o), g.node.isLastSibling(o) && o.parent().hasClass("fr-deletable") && o.insertAfter(o.parent()), o.replaceWith(s)) : g.$el.append(s), g.selection.clear(), s
        }

        function M() {
            g.edit.on(), I(!0)
        }

        function z(e, t) {
            if (void 0 !== e && 0 < e.length) {
                if (!1 === g.events.trigger("image.beforeUpload", [e, t])) return !1;
                var a, i = e[0];
                if ((null === g.opts.imageUploadURL || g.opts.imageUploadURL == c) && !g.opts.imageUploadToS3) return s = i, o = t || d, (l = new FileReader).onload = function() {
                    var e = l.result;
                    if (l.result.indexOf("svg+xml") < 0) {
                        for (var t = atob(l.result.split(",")[1]), a = [], i = 0; i < t.length; i++) a.push(t.charCodeAt(i));
                        e = window.URL.createObjectURL(new Blob([new Uint8Array(a)], {
                            type: s.type
                        })), g.image.insert(e, !1, null, o)
                    }
                }, $(), l.readAsDataURL(s), !1;
                if (i.name || (i.name = (new Date).getTime() + "." + (i.type || "image/jpeg").replace(/image\//g, "")), i.size > g.opts.imageMaxSize) return D(v), !1;
                if (g.opts.imageAllowedTypes.indexOf(i.type.replace(/image\//g, "")) < 0) return D(b), !1;
                if (g.drag_support.formdata && (a = g.drag_support.formdata ? new FormData : null), a) {
                    var r;
                    if (!1 !== g.opts.imageUploadToS3)
                        for (r in a.append("key", g.opts.imageUploadToS3.keyStart + (new Date).getTime() + "-" + (i.name || "untitled")), a.append("success_action_status", "201"), a.append("X-Requested-With", "xhr"), a.append("Content-Type", i.type), g.opts.imageUploadToS3.params) g.opts.imageUploadToS3.params.hasOwnProperty(r) && a.append(r, g.opts.imageUploadToS3.params[r]);
                    for (r in g.opts.imageUploadParams) g.opts.imageUploadParams.hasOwnProperty(r) && a.append(r, g.opts.imageUploadParams[r]);
                    a.append(g.opts.imageUploadParam, i, i.name);
                    var n = g.opts.imageUploadURL;
                    g.opts.imageUploadToS3 && (n = g.opts.imageUploadToS3.uploadURL ? g.opts.imageUploadToS3.uploadURL : "https://" + g.opts.imageUploadToS3.region + ".amazonaws.com/" + g.opts.imageUploadToS3.bucket),
                        function(t, a, e, r) {
                            function n() {
                                var e = be(this);
                                e.off("load"), e.addClass("fr-uploading"), e.next().is("br") && e.next().remove(), g.placeholder.refresh(), k(e), C(), $(), g.edit.off(), t.onload = function() {
                                    O.call(t, e)
                                }, t.onerror = P, t.upload.onprogress = T, t.onabort = M, e.off("abortUpload").on("abortUpload", function() {
                                    4 != t.readyState && (t.abort(), r ? (r.attr("src", r.data("fr-old-src")), r.removeClass("fr-uploading")) : e.remove(), se(!0))
                                }), t.send(a)
                            }
                            var s = new FileReader;
                            s.onload = function() {
                                var e = s.result;
                                if (s.result.indexOf("svg+xml") < 0) {
                                    for (var t = atob(s.result.split(",")[1]), a = [], i = 0; i < t.length; i++) a.push(t.charCodeAt(i));
                                    e = window.URL.createObjectURL(new Blob([new Uint8Array(a)], {
                                        type: "image/jpeg"
                                    }))
                                }
                                r ? (r.on("load", n), r.one("error", n), g.edit.on(), g.undo.saveStep(), r.data("fr-old-src", r.attr("src")), r.attr("src", e)) : L(e, null, n)
                            }, s.readAsDataURL(e)
                        }(g.core.getXHR(n, g.opts.imageUploadMethod), a, i, t || d)
                }
            }
            var s, o, l
        }

        function _(e) {
            if (e.is("img") && 0 < e.parents(".fr-img-caption").length) return e.parents(".fr-img-caption")
        }

        function W(e) {
            var t = e.originalEvent.dataTransfer;
            if (t && t.files && t.files.length) {
                var a = t.files[0];
                if (a && a.type && -1 !== a.type.indexOf("image") && 0 <= g.opts.imageAllowedTypes.indexOf(a.type.replace(/image\//g, ""))) {
                    if (!g.opts.imageUpload) return e.preventDefault(), e.stopPropagation(), !1;
                    g.markers.remove(), g.markers.insertAtPoint(e.originalEvent), g.$el.find(".fr-marker").replaceWith(be.FE.MARKERS), 0 === g.$el.find(".fr-marker").length && g.selection.setAtEnd(g.el), g.popups.hideAll();
                    var i = g.popups.get("image.insert");
                    i || (i = K()), g.popups.setContainer("image.insert", g.$sc);
                    var r = e.originalEvent.pageX,
                        n = e.originalEvent.pageY;
                    return g.opts.iframe && (n += g.$iframe.offset().top, r += g.$iframe.offset().left), g.popups.show("image.insert", r, n), $(), 0 <= g.opts.imageAllowedTypes.indexOf(a.type.replace(/image\//g, "")) ? (se(!0), z(t.files)) : D(b), e.preventDefault(), e.stopPropagation(), !1
                }
            }
        }

        function K(e) {
            if (e) return g.popups.onRefresh("image.insert", y), g.popups.onHide("image.insert", w), !0;
            var t, a, i = "";
            g.opts.imageUpload || -1 === g.opts.imageInsertButtons.indexOf("imageUpload") || g.opts.imageInsertButtons.splice(g.opts.imageInsertButtons.indexOf("imageUpload"), 1);
            var r = g.button.buildList(g.opts.imageInsertButtons);
            "" !== r && (i = '<div class="fr-buttons">' + r + "</div>");
            var n = g.opts.imageInsertButtons.indexOf("imageUpload"),
                s = g.opts.imageInsertButtons.indexOf("imageByURL"),
                o = "";
            0 <= n && (t = " fr-active", 0 <= s && s < n && (t = ""), o = '<div class="fr-image-upload-layer' + t + ' fr-layer" id="fr-image-upload-layer-' + g.id + '"><strong>' + g.language.translate("Drop image") + "</strong><br>(" + g.language.translate("or click") + ')<div class="fr-form"><input type="file" accept="image/' + g.opts.imageAllowedTypes.join(", image/").toLowerCase() + '" tabIndex="-1" aria-labelledby="fr-image-upload-layer-' + g.id + '" role="button"></div></div>');
            var l = "";
            0 <= s && (t = " fr-active", 0 <= n && n < s && (t = ""), l = '<div class="fr-image-by-url-layer' + t + ' fr-layer" id="fr-image-by-url-layer-' + g.id + '"><div class="fr-input-line"><input id="fr-image-by-url-layer-text-' + g.id + '" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2" role="button">' + g.language.translate("Insert") + "</button></div></div>");
            var f, p = {
                buttons: i,
                upload_layer: o,
                by_url_layer: l,
                progress_bar: '<div class="fr-image-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabIndex="2" role="button">OK</button></div></div>'
            };
            return 1 <= g.opts.imageInsertButtons.length && (a = g.popups.create("image.insert", p)), g.$wp && g.events.$on(g.$wp, "scroll", function() {
                d && g.popups.isVisible("image.insert") && ce()
            }), f = a, g.events.$on(f, "dragover dragenter", ".fr-image-upload-layer", function() {
                return be(this).addClass("fr-drop"), !1
            }, !0), g.events.$on(f, "dragleave dragend", ".fr-image-upload-layer", function() {
                return be(this).removeClass("fr-drop"), !1
            }, !0), g.events.$on(f, "drop", ".fr-image-upload-layer", function(e) {
                e.preventDefault(), e.stopPropagation(), be(this).removeClass("fr-drop");
                var t = e.originalEvent.dataTransfer;
                if (t && t.files) {
                    var a = f.data("instance") || g;
                    a.events.disableBlur(), a.image.upload(t.files), a.events.enableBlur()
                }
            }, !0), g.helpers.isIOS() && g.events.$on(f, "touchstart", '.fr-image-upload-layer input[type="file"]', function() {
                be(this).trigger("click")
            }, !0), g.events.$on(f, "change", '.fr-image-upload-layer input[type="file"]', function() {
                if (this.files) {
                    var e = f.data("instance") || g;
                    e.events.disableBlur(), f.find("input:focus").blur(), e.events.enableBlur(), e.image.upload(this.files, d)
                }
                be(this).val("")
            }, !0), a
        }

        function H() {
            d && g.popups.get("image.alt").find("input").val(d.attr("alt") || "").trigger("change")
        }

        function Y() {
            var e = g.popups.get("image.alt");
            e || (e = X()), I(), g.popups.refresh("image.alt"), g.popups.setContainer("image.alt", g.$sc);
            var t = he();
            ve() && (t = t.find(".fr-img-wrap"));
            var a = t.offset().left + t.outerWidth() / 2,
                i = t.offset().top + t.outerHeight();
            g.popups.show("image.alt", a, i, t.outerHeight())
        }

        function X(e) {
            if (e) return g.popups.onRefresh("image.alt", H), !0;
            var t = {
                    buttons: '<div class="fr-buttons">' + g.button.buildList(g.opts.imageAltButtons) + "</div>",
                    alt_layer: '<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-' + g.id + '"><div class="fr-input-line"><input id="fr-image-alt-layer-text-' + g.id + '" type="text" placeholder="' + g.language.translate("Alternative Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2" role="button">' + g.language.translate("Update") + "</button></div></div>"
                },
                a = g.popups.create("image.alt", t);
            return g.$wp && g.events.$on(g.$wp, "scroll.image-alt", function() {
                d && g.popups.isVisible("image.alt") && Y()
            }), a
        }

        function j() {
            var e = g.popups.get("image.size");
            if (d)
                if (ve()) {
                    var t = d.parent();
                    t.get(0).style.width || (t = d.parent().parent()), e.find('input[name="width"]').val(t.get(0).style.width).trigger("change"), e.find('input[name="height"]').val(t.get(0).style.height).trigger("change")
                } else e.find('input[name="width"]').val(d.get(0).style.width).trigger("change"), e.find('input[name="height"]').val(d.get(0).style.height).trigger("change")
        }

        function G() {
            var e = g.popups.get("image.size");
            e || (e = V()), I(), g.popups.refresh("image.size"), g.popups.setContainer("image.size", g.$sc);
            var t = he();
            ve() && (t = t.find(".fr-img-wrap"));
            var a = t.offset().left + t.outerWidth() / 2,
                i = t.offset().top + t.outerHeight();
            g.popups.show("image.size", a, i, t.outerHeight())
        }

        function V(e) {
            if (e) return g.popups.onRefresh("image.size", j), !0;
            var t = {
                    buttons: '<div class="fr-buttons">' + g.button.buildList(g.opts.imageSizeButtons) + "</div>",
                    size_layer: '<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-' + g.id + '"><div class="fr-image-group"><div class="fr-input-line"><input id="fr-image-size-layer-width-' + g.id + '" type="text" name="width" placeholder="' + g.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-image-size-layer-height' + g.id + '" type="text" name="height" placeholder="' + g.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2" role="button">' + g.language.translate("Update") + "</button></div></div>"
                },
                a = g.popups.create("image.size", t);
            return g.$wp && g.events.$on(g.$wp, "scroll.image-size", function() {
                d && g.popups.isVisible("image.size") && G()
            }), a
        }

        function q(e, t, a, i) {
            return e.pageX = t, R.call(this, e), e.pageX = e.pageX + a * Math.floor(Math.pow(1.1, i)), S.call(this, e), x.call(this, e), ++i
        }

        function Q(e) {
            (e = e || he()) && !1 !== g.events.trigger("image.beforeRemove", [e]) && (g.popups.hideAll(), ue(), se(!0), g.undo.canDo() || g.undo.saveStep(), e.get(0) == g.el ? e.removeAttr("src") : (e.get(0).parentNode && "A" == e.get(0).parentNode.tagName ? (g.selection.setBefore(e.get(0).parentNode) || g.selection.setAfter(e.get(0).parentNode) || e.parent().after(be.FE.MARKERS), be(e.get(0).parentNode).remove()) : (g.selection.setBefore(e.get(0)) || g.selection.setAfter(e.get(0)) || e.after(be.FE.MARKERS), e.remove()), g.html.fillEmptyBlocks(), g.selection.restore()), g.undo.saveStep())
        }

        function J(e) {
            var t = e.which;
            if (d && (t == be.FE.KEYCODE.BACKSPACE || t == be.FE.KEYCODE.DELETE)) return e.preventDefault(), e.stopPropagation(), Q(), !1;
            if (d && t == be.FE.KEYCODE.ESC) {
                var a = d;
                return se(!0), g.selection.setAfter(a.get(0)), g.selection.restore(), e.preventDefault(), !1
            }
            if (d && (t == be.FE.KEYCODE.ARROW_LEFT || t == be.FE.KEYCODE.ARROW_RIGHT)) {
                var i = d.get(0);
                return se(!0), t == be.FE.KEYCODE.ARROW_LEFT ? g.selection.setBefore(i) : g.selection.setAfter(i), g.selection.restore(), e.preventDefault(), !1
            }
            return d && t === be.FE.KEYCODE.TAB ? (e.preventDefault(), e.stopPropagation(), se(!0), !1) : d && t != be.FE.KEYCODE.F10 && !g.keys.isBrowserAction(e) ? (e.preventDefault(), e.stopPropagation(), !1) : void 0
        }

        function Z(e) {
            if (e && "IMG" == e.tagName) {
                if (g.node.hasClass(e, "fr-uploading") || g.node.hasClass(e, "fr-error") ? e.parentNode.removeChild(e) : g.node.hasClass(e, "fr-draggable") && e.classList.remove("fr-draggable"), e.parentNode && e.parentNode.parentNode && g.node.hasClass(e.parentNode.parentNode, "fr-img-caption")) {
                    var t = e.parentNode.parentNode;
                    t.removeAttribute("contenteditable"), t.removeAttribute("draggable"), t.classList.remove("fr-draggable");
                    var a = e.nextSibling;
                    a && a.removeAttribute("contenteditable")
                }
            } else if (e && e.nodeType == Node.ELEMENT_NODE)
                for (var i = e.querySelectorAll("img.fr-uploading, img.fr-error, img.fr-draggable"), r = 0; r < i.length; r++) Z(i[r])
        }

        function ee(e) {
            if (!1 === g.events.trigger("image.beforePasteUpload", [e])) return !1;

            d = be(e), C(), n(), ce(), $(), d.one("load", function() {
                C(), $()
            });
            for (var t = be(e).attr("src").split(","), a = atob(t[1]), i = [], r = 0; r < a.length; r++) i.push(a.charCodeAt(r));
            z([new Blob([new Uint8Array(i)], {
                type: t[0].replace(/data\:/g, "").replace(/;base64/g, "")
            })], d)
        }

        function te() {
            g.opts.imagePaste ? g.$el.find("img[data-fr-image-pasted]").each(function(e, i) {
                if (g.opts.imagePasteProcess) {
                    var t = g.opts.imageDefaultWidth;
                    t && "auto" != t && (t += g.opts.imageResizeWithPercent ? "%" : "px"), be(i).css("width", t).removeClass("fr-dii fr-dib fr-fir fr-fil"), pe(be(i), g.opts.imageDefaultDisplay, g.opts.imageDefaultAlign)
                }
                if (0 === i.src.indexOf("data:")) ee(i)
                else if (0 === i.src.indexOf("blob:") || 0 === i.src.indexOf("http") && g.opts.imageUploadRemoteUrls && g.opts.imageCORSProxy) {
                    var a = new Image;
                    a.crossOrigin = "Anonymous", a.onload = function() {
                        var e, t = g.o_doc.createElement("CANVAS"),
                            a = t.getContext("2d");
                        t.height = this.naturalHeight, t.width = this.naturalWidth, a.drawImage(this, 0, 0), setTimeout(function() {
                            ee(i)
                        }, 0), e = 2e3 < this.naturalWidth || 1500 < this.naturalHeight ? "jpeg" : "png", i.src = t.toDataURL("image/" + e)
                    }, a.src = (0 === i.src.indexOf("blob:") ? "" : g.opts.imageCORSProxy + "/") + i.src
                } else 0 !== i.src.indexOf("http") || 0 === i.src.indexOf("https://mail.google.com/mail") ? (g.selection.save(), be(i).remove(), g.selection.restore()) : be(i).removeAttr("data-fr-image-pasted")
            }) : g.$el.find("img[data-fr-image-pasted]").remove()
        }

        function ae(e) {
            var t = e.target.result,
                a = g.opts.imageDefaultWidth;
            a && "auto" != a && (a += g.opts.imageResizeWithPercent ? "%" : "px"), g.undo.saveStep(), g.html.insert('<img data-fr-image-pasted="true" src="' + t + '"' + (a ? ' style="width: ' + a + ';"' : "") + ">");
            var i = g.$el.find('img[data-fr-image-pasted="true"]');
            i && pe(i, g.opts.imageDefaultDisplay, g.opts.imageDefaultAlign), g.events.trigger("paste.after")
        }

        function ie(e) {
            if (e && e.clipboardData && e.clipboardData.items) {
                var t = null;
                if (e.clipboardData.types && -1 != e.clipboardData.types.indexOf("text/rtf") || e.clipboardData.getData("text/rtf")) t = e.clipboardData.items[0].getAsFile();
                else
                    for (var a = 0; a < e.clipboardData.items.length && !(t = e.clipboardData.items[a].getAsFile()); a++);
                if (t) return i = t, (r = new FileReader).onload = ae, r.readAsDataURL(i), !1
            }
            var i, r
        }

        function re(e) {
            return e = e.replace(/<img /gi, '<img data-fr-image-pasted="true" ')
        }

        function ne(e) {
            if ("false" == be(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
            if (e && "touchend" == e.type && a) return !0;
            if (e && g.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1;
            for (var t = 0; t < be.FE.INSTANCES.length; t++) be.FE.INSTANCES[t] != g && be.FE.INSTANCES[t].events.trigger("image.hideResizer");
            g.toolbar.disable(), e && (e.stopPropagation(), e.preventDefault()), g.helpers.isMobile() && (g.events.disableBlur(), g.$el.blur(), g.events.enableBlur()), g.opts.iframe && g.size.syncIframe(), d = be(this), ue(), C(), n(), g.browser.msie ? (g.popups.areVisible() && g.events.disableBlur(), g.win.getSelection && (g.win.getSelection().removeAllRanges(), g.win.getSelection().addRange(g.doc.createRange()))) : g.selection.clear(), g.helpers.isIOS() && (g.events.disableBlur(), g.$el.blur()), g.button.bulkRefresh(), g.events.trigger("video.hideResizer")
        }

        function se(e) {
            d && (oe || !0 === e) && (g.toolbar.enable(), l.removeClass("fr-active"), g.popups.hide("image.edit"), d = null, fe(), f = null, p && p.hide())
        }
        r[i] = "Image cannot be loaded from the passed link.", r[u] = "No link in upload response.", r[m] = "Error during file upload.", r[h] = "Parsing response failed.", r[v] = "File is too large.", r[b] = "Image file type is invalid.", r[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.";
        var oe = !(r[8] = "Image file is corrupted.");

        function le() {
            oe = !0
        }

        function fe() {
            oe = !1
        }

        function pe(e, t, a) {
            !g.opts.htmlUntouched && g.opts.useClasses ? (e.removeClass("fr-fil fr-fir fr-dib fr-dii"), a && e.addClass("fr-fi" + a[0]), t && e.addClass("fr-di" + t[0])) : "inline" == t ? (e.css({
                display: "inline-block",
                verticalAlign: "bottom",
                margin: g.opts.imageDefaultMargin
            }), "center" == a ? e.css({
                "float": "none",
                marginBottom: "",
                marginTop: "",
                maxWidth: "calc(100% - " + 2 * g.opts.imageDefaultMargin + "px)",
                textAlign: "center"
            }) : "left" == a ? e.css({
                "float": "left",
                marginLeft: 0,
                maxWidth: "calc(100% - " + g.opts.imageDefaultMargin + "px)",
                textAlign: "left"
            }) : e.css({
                "float": "right",
                marginRight: 0,
                maxWidth: "calc(100% - " + g.opts.imageDefaultMargin + "px)",
                textAlign: "right"
            })) : "block" == t && (e.css({
                display: "block",
                "float": "none",
                verticalAlign: "top",
                margin: g.opts.imageDefaultMargin + "px auto",
                textAlign: "center"
            }), "left" == a ? e.css({
                marginLeft: 0,
                textAlign: "left"
            }) : "right" == a && e.css({
                marginRight: 0,
                textAlign: "right"
            }))
        }

        function ge(e) {
            if (void 0 === e && (e = he()), e) {
                if (e.hasClass("fr-fil")) return "left";
                if (e.hasClass("fr-fir")) return "right";
                if (e.hasClass("fr-dib") || e.hasClass("fr-dii")) return "center";
                var t = e.css("float");
                if (e.css("float", "none"), "block" == e.css("display")) {
                    if (e.css("float", ""), e.css("float") != t && e.css("float", t), 0 === parseInt(e.css("margin-left"), 10)) return "left";
                    if (0 === parseInt(e.css("margin-right"), 10)) return "right"
                } else {
                    if (e.css("float", ""), e.css("float") != t && e.css("float", t), "left" == e.css("float")) return "left";
                    if ("right" == e.css("float")) return "right"
                }
            }
            return "center"
        }

        function de(e) {
            void 0 === e && (e = he());
            var t = e.css("float");
            return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), e.css("float") != t && e.css("float", t), "block") : (e.css("float", ""), e.css("float") != t && e.css("float", t), "inline")
        }

        function ce() {
            var e = g.popups.get("image.insert");
            e || (e = K()), g.popups.isVisible("image.insert") || (I(), g.popups.refresh("image.insert"), g.popups.setContainer("image.insert", g.$sc));
            var t = he();
            ve() && (t = t.find(".fr-img-wrap"));
            var a = t.offset().left + t.outerWidth() / 2,
                i = t.offset().top + t.outerHeight();
            g.popups.show("image.insert", a, i, t.outerHeight(!0))
        }

        function ue() {
            if (d) {
                g.events.disableBlur(), g.selection.clear();
                var e = g.doc.createRange();
                e.selectNode(d.get(0)), g.browser.msie && e.collapse(!0), g.selection.get().addRange(e), g.events.enableBlur()
            }
        }

        function me() {
            return d
        }

        function he() {
            return ve() ? d.parents(".fr-img-caption:first") : d
        }

        function ve() {
            return !!d && 0 < d.parents(".fr-img-caption").length
        }
        return {
            _init: function() {
                var i;
                g.events.$on(g.$el, g._mousedown, "IMG" == g.el.tagName ? null : 'img:not([contenteditable="false"])', function(e) {
                    if ("false" == be(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                    g.helpers.isMobile() || g.selection.clear(), t = !0, g.popups.areVisible() && g.events.disableBlur(), g.browser.msie && (g.events.disableBlur(), g.$el.attr("contenteditable", !1)), g.draggable || "touchstart" == e.type || e.preventDefault(), e.stopPropagation()
                }), g.events.$on(g.$el, g._mousedown, ".fr-img-caption .fr-inner", function(e) {
                    g.core.hasFocus() || g.events.focus(), e.stopPropagation()
                }), g.events.$on(g.$el, "paste", ".fr-img-caption .fr-inner", function(e) {
                    g.toolbar.hide(), e.stopPropagation()
                }), g.events.$on(g.$el, g._mouseup, "IMG" == g.el.tagName ? null : 'img:not([contenteditable="false"])', function(e) {
                    if ("false" == be(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                    t && (t = !1, e.stopPropagation(), g.browser.msie && (g.$el.attr("contenteditable", !0), g.events.enableBlur()))
                }), g.events.on("keyup", function(e) {
                    if (e.shiftKey && "" === g.selection.text().replace(/\n/g, "") && g.keys.isArrow(e.which)) {
                        var t = g.selection.element(),
                            a = g.selection.endElement();
                        t && "IMG" == t.tagName ? k(be(t)) : a && "IMG" == a.tagName && k(be(a))
                    }
                }, !0), g.events.on("drop", W), g.events.on("element.beforeDrop", _), g.events.on("mousedown window.mousedown", le), g.events.on("window.touchmove", fe), g.events.on("mouseup window.mouseup", function() {
                    if (d) return se(), !1;
                    fe()
                }), g.events.on("commands.mousedown", function(e) {
                    0 < e.parents(".fr-toolbar").length && se()
                }), g.events.on("image.resizeEnd", function() {
                    g.opts.iframe && g.size.syncIframe()
                }), g.events.on("blur image.hideResizer commands.undo commands.redo element.dropped", function() {
                    se(!(t = !1))
                }), g.events.on("modals.hide", function() {
                    d && (ue(), g.selection.clear())
                }), g.events.on("image.resizeEnd", function() {
                    g.win.getSelection && k(d)
                }), g.opts.imageAddNewLine && g.events.on("image.inserted", function(e) {
                    var t = e.get(0);
                    for (t.nextSibling && "BR" === t.nextSibling.tagName && (t = t.nextSibling); t && !g.node.isElement(t);) t = g.node.isLastSibling(t) ? t.parentNode : null;
                    g.node.isElement(t) && (g.opts.enter === be.FE.ENTER_BR ? e.after("<br>") : be(g.node.blockParent(e.get(0))).after("<" + g.html.defaultTag() + "><br></" + g.html.defaultTag() + ">"))
                }), "IMG" == g.el.tagName && g.$el.addClass("fr-view"), g.events.$on(g.$el, g.helpers.isMobile() && !g.helpers.isWindowsPhone() ? "touchend" : "click", "IMG" == g.el.tagName ? null : 'img:not([contenteditable="false"])', ne), g.helpers.isMobile() && (g.events.$on(g.$el, "touchstart", "IMG" == g.el.tagName ? null : 'img:not([contenteditable="false"])', function() {
                    a = !1
                }), g.events.$on(g.$el, "touchmove", function() {
                    a = !0
                })), g.$wp ? (g.events.on("window.keydown keydown", J, !0), g.events.on("keyup", function(e) {
                    if (d && e.which == be.FE.KEYCODE.ENTER) return !1
                }, !0), g.events.$on(g.$el, "keydown", function() {
                    var e = g.selection.element();
                    e.nodeType === Node.TEXT_NODE && (e = e.parentNode), g.node.hasClass(e, "fr-inner") || (g.node.hasClass(e, "fr-img-caption") || (e = be(e).parents(".fr-img-caption").get(0)), g.node.hasClass(e, "fr-img-caption") && (be(e).after(be.FE.INVISIBLE_SPACE + be.FE.MARKERS), g.selection.restore()))
                })) : g.events.$on(g.$win, "keydown", J), g.events.on("toolbar.esc", function() {
                    if (d) {
                        if (g.$wp) g.events.disableBlur(), g.events.focus();
                        else {
                            var e = d;
                            se(!0), g.selection.setAfter(e.get(0)), g.selection.restore()
                        }
                        return !1
                    }
                }, !0), g.events.on("toolbar.focusEditor", function() {
                    if (d) return !1
                }, !0), g.events.on("window.cut window.copy", function(e) {
                    if (d && g.popups.isVisible("image.edit") && !g.popups.get("image.edit").find(":focus").length) {
                        var t = he();
                        ve() ? (t.before(be.FE.START_MARKER), t.after(be.FE.END_MARKER), g.selection.restore(), g.paste.saveCopiedText(t.get(0).outerHTML, t.text())) : (ue(), g.paste.saveCopiedText(d.get(0).outerHTML, d.attr("alt"))), "copy" == e.type ? setTimeout(function() {
                            k(d)
                        }) : (se(!0), g.undo.saveStep(), setTimeout(function() {
                            g.undo.saveStep()
                        }, 0))
                    }
                }, !0), g.browser.msie && g.events.on("keydown", function(e) {
                    if (!g.selection.isCollapsed() || !d) return !0;
                    var t = e.which;
                    t == be.FE.KEYCODE.C && g.keys.ctrlKey(e) ? g.events.trigger("window.copy") : t == be.FE.KEYCODE.X && g.keys.ctrlKey(e) && g.events.trigger("window.cut")
                }), g.events.$on(be(g.o_win), "keydown", function(e) {
                    var t = e.which;
                    if (d && t == be.FE.KEYCODE.BACKSPACE) return e.preventDefault(), !1
                }), g.events.$on(g.$win, "keydown", function(e) {
                    var t = e.which;
                    d && d.hasClass("fr-uploading") && t == be.FE.KEYCODE.ESC && d.trigger("abortUpload")
                }), g.events.on("destroy", function() {
                    d && d.hasClass("fr-uploading") && d.trigger("abortUpload")
                }), g.events.on("paste.before", ie), g.events.on("paste.beforeCleanup", re), g.events.on("paste.after", te), g.events.on("html.set", e), g.events.on("html.inserted", e), e(), g.events.on("destroy", function() {
                    o = []
                }), g.events.on("html.processGet", Z), g.opts.imageOutputSize && g.events.on("html.beforeGet", function() {
                    i = g.el.querySelectorAll("img");
                    for (var e = 0; e < i.length; e++) {
                        var t = i[e].style.width || be(i[e]).width(),
                            a = i[e].style.height || be(i[e]).height();
                        t && i[e].setAttribute("width", ("" + t).replace(/px/, "")), a && i[e].setAttribute("height", ("" + a).replace(/px/, ""))
                    }
                }), g.opts.iframe && g.events.on("image.loaded", g.size.syncIframe), g.$wp && (E(), g.events.on("contentChanged", E)), g.events.$on(be(g.o_win), "orientationchange.image", function() {
                    setTimeout(function() {
                        d && k(d)
                    }, 100)
                }), U(!0), K(!0), V(!0), X(!0), g.events.on("node.remove", function(e) {
                    if ("IMG" == e.get(0).tagName) return Q(e), !1
                })
            },
            showInsertPopup: function() {
                var e = g.$tb.find('.fr-command[data-cmd="insertImage"]'),
                    t = g.popups.get("image.insert");
                if (t || (t = K()), I(), !t.hasClass("fr-active"))
                    if (g.popups.refresh("image.insert"), g.popups.setContainer("image.insert", g.$tb), e.is(":visible")) {
                        var a = e.offset().left + e.outerWidth() / 2,
                            i = e.offset().top + (g.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
                        g.popups.show("image.insert", a, i, e.outerHeight())
                    } else g.position.forSelection(t), g.popups.show("image.insert")
            },
            showLayer: function(e) {
                var t, a, i = g.popups.get("image.insert");
                if (d || g.opts.toolbarInline) {
                    if (d) {
                        var r = he();
                        ve() && (r = r.find(".fr-img-wrap")), a = r.offset().top + r.outerHeight(), t = r.offset().left + r.outerWidth() / 2
                    }
                } else {
                    var n = g.$tb.find('.fr-command[data-cmd="insertImage"]');
                    t = n.offset().left + n.outerWidth() / 2, a = n.offset().top + (g.opts.toolbarBottom ? 10 : n.outerHeight() - 10)
                }!d && g.opts.toolbarInline && (a = i.offset().top - g.helpers.getPX(i.css("margin-top")), i.hasClass("fr-above") && (a += i.outerHeight())), i.find(".fr-layer").removeClass("fr-active"), i.find(".fr-" + e + "-layer").addClass("fr-active"), g.popups.show("image.insert", t, a, d ? d.outerHeight() : 0), g.accessibility.focusPopup(i)
            },
            refreshUploadButton: function(e) {
                g.popups.get("image.insert").find(".fr-image-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
            },
            refreshByURLButton: function(e) {
                g.popups.get("image.insert").find(".fr-image-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
            },
            upload: z,
            insertByURL: function() {
                var e = g.popups.get("image.insert").find(".fr-image-by-url-layer input");
                if (0 < e.val().length) {
                    $(), F(g.language.translate("Loading image"));
                    var t = e.val().trim();
                    if (g.opts.imageUploadRemoteUrls && g.opts.imageCORSProxy && g.opts.imageUpload) {
                        var a = new XMLHttpRequest;
                        a.onload = function() {
                            200 == this.status ? z([new Blob([this.response], {
                                type: this.response.type || "image/png"
                            })], d) : D(i)
                        }, a.onerror = function() {
                            N(t, !0, [], d)
                        }, a.open("GET", g.opts.imageCORSProxy + "/" + t, !0), a.responseType = "blob", a.send()
                    } else N(t, !0, [], d);
                    e.val(""), e.blur()
                }
            },
            align: function(e) {
                var t = he();
                t.removeClass("fr-fir fr-fil"), !g.opts.htmlUntouched && g.opts.useClasses ? "left" == e ? t.addClass("fr-fil") : "right" == e && t.addClass("fr-fir") : pe(t, de(), e), ue(), C(), n(), g.selection.clear()
            },
            refreshAlign: function(e) {
                d && e.find("> *:first").replaceWith(g.icon.create("image-align-" + ge()))
            },
            refreshAlignOnShow: function(e, t) {
                d && t.find('.fr-command[data-param1="' + ge() + '"]').addClass("fr-active").attr("aria-selected", !0)
            },
            display: function(e) {
                var t = he();
                t.removeClass("fr-dii fr-dib"), !g.opts.htmlUntouched && g.opts.useClasses ? "inline" == e ? t.addClass("fr-dii") : "block" == e && t.addClass("fr-dib") : pe(t, e, ge()), ue(), C(), n(), g.selection.clear()
            },
            refreshDisplayOnShow: function(e, t) {
                d && t.find('.fr-command[data-param1="' + de() + '"]').addClass("fr-active").attr("aria-selected", !0)
            },
            replace: ce,
            back: function() {
                d ? (g.events.disableBlur(), be(".fr-popup input:focus").blur(), k(d)) : (g.events.disableBlur(), g.selection.restore(), g.events.enableBlur(), g.popups.hide("image.insert"), g.toolbar.showInline())
            },
            get: me,
            getEl: he,
            insert: N,
            showProgressBar: $,
            remove: Q,
            hideProgressBar: I,
            applyStyle: function(e, t, a) {
                if (void 0 === t && (t = g.opts.imageStyles), void 0 === a && (a = g.opts.imageMultipleStyles), !d) return !1;
                var i = he();
                if (!a) {
                    var r = Object.keys(t);
                    r.splice(r.indexOf(e), 1), i.removeClass(r.join(" "))
                }
                "object" == typeof t[e] ? (i.removeAttr("style"), i.css(t[e].style)) : i.toggleClass(e), k(d)
            },
            showAltPopup: Y,
            showSizePopup: G,
            setAlt: function(e) {
                if (d) {
                    var t = g.popups.get("image.alt");
                    d.attr("alt", e || t.find("input").val() || ""), t.find("input:focus").blur(), k(d)
                }
            },
            setSize: function(e, t) {
                if (d) {
                    var a = g.popups.get("image.size");
                    e = e || a.find('input[name="width"]').val() || "", t = t || a.find('input[name="height"]').val() || "";
                    var i = /^[\d]+((px)|%)*$/g;
                    d.removeAttr("width").removeAttr("height"), e.match(i) ? d.css("width", e) : d.css("width", ""), t.match(i) ? d.css("height", t) : d.css("height", ""), ve() && (d.parents(".fr-img-caption").removeAttr("width").removeAttr("height"), e.match(i) ? d.parents(".fr-img-caption").css("width", e) : d.parents(".fr-img-caption").css("width", ""), t.match(i) ? d.parents(".fr-img-caption").css("height", t) : d.parents(".fr-img-caption").css("height", "")), a && a.find("input:focus").blur(), k(d)
                }
            },
            toggleCaption: function() {
                var e;
                if (d && !ve()) {
                    var t, a;
                    (e = d).parent().is("a") && (e = d.parent()), e.attr("style") && (a = -1 < (t = e.attr("style").split(":")).indexOf("width") ? t[t.indexOf("width") + 1].replace(";", "") : "");
                    var i = g.opts.imageResizeWithPercent ? (-1 < a.indexOf("px") ? null : a) || "100%" : d.width() + "px";
                    e.wrap("<span " + (g.browser.mozilla ? "" : 'contenteditable="false"') + 'class="fr-img-caption ' + d.attr("class") + '" style="' + (g.opts.useClasses ? "" : e.attr("style")) + '" draggable="false"></span>'), e.wrap('<span class="fr-img-wrap"></span>'), d.after('<span class="fr-inner"' + (g.browser.mozilla ? "" : ' contenteditable="true"') + ">" + be.FE.START_MARKER + g.language.translate("Image Caption") + be.FE.END_MARKER + "</span>"), d.removeAttr("class").removeAttr("style").removeAttr("width"), d.parents(".fr-img-caption").css("width", i), se(!0), g.selection.restore()
                } else e = he(), d.insertAfter(e), d.attr("class", e.attr("class").replace("fr-img-caption", "")).attr("style", e.attr("style")), e.remove(), k(d)
            },
            hasCaption: ve,
            exitEdit: se,
            edit: k
        }
    }, be.FE.DefineIcon("insertImage", {
        NAME: "image"
    }), be.FE.RegisterShortcut(be.FE.KEYCODE.P, "insertImage", null, "P"), be.FE.RegisterCommand("insertImage", {
        title: "Insert Image",
        undo: !1,
        focus: !0,
        refreshAfterCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("image.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("image.insert")) : this.image.showInsertPopup()
        },
        plugin: "image"
    }), be.FE.DefineIcon("imageUpload", {
        NAME: "upload"
    }), be.FE.RegisterCommand("imageUpload", {
        title: "Upload Image",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function() {
            this.image.showLayer("image-upload")
        },
        refresh: function(e) {
            this.image.refreshUploadButton(e)
        }
    }), be.FE.DefineIcon("imageByURL", {
        NAME: "link"
    }), be.FE.RegisterCommand("imageByURL", {
        title: "By URL",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function() {
            this.image.showLayer("image-by-url")
        },
        refresh: function(e) {
            this.image.refreshByURLButton(e)
        }
    }), be.FE.RegisterCommand("imageInsertByURL", {
        title: "Insert Image",
        undo: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.image.insertByURL()
        },
        refresh: function(e) {
            this.image.get() ? e.text(this.language.translate("Replace")) : e.text(this.language.translate("Insert"))
        }
    }), be.FE.DefineIcon("imageDisplay", {
        NAME: "star"
    }), be.FE.RegisterCommand("imageDisplay", {
        title: "Display",
        type: "dropdown",
        options: {
            inline: "Inline",
            block: "Break Text"
        },
        callback: function(e, t) {
            this.image.display(t)
        },
        refresh: function(e) {
            this.opts.imageTextNear || e.addClass("fr-hidden")
        },
        refreshOnShow: function(e, t) {
            this.image.refreshDisplayOnShow(e, t)
        }
    }), be.FE.DefineIcon("image-align", {
        NAME: "align-left"
    }), be.FE.DefineIcon("image-align-left", {
        NAME: "align-left"
    }), be.FE.DefineIcon("image-align-right", {
        NAME: "align-right"
    }), be.FE.DefineIcon("image-align-center", {
        NAME: "align-justify"
    }), be.FE.DefineIcon("imageAlign", {
        NAME: "align-justify"
    }), be.FE.RegisterCommand("imageAlign", {
        type: "dropdown",
        title: "Align",
        options: {
            left: "Align Left",
            center: "None",
            right: "Align Right"
        },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = be.FE.COMMANDS.imageAlign.options;
            for (var a in t) t.hasOwnProperty(a) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="imageAlign" data-param1="' + a + '" title="' + this.language.translate(t[a]) + '">' + this.icon.create("image-align-" + a) + '<span class="fr-sr-only">' + this.language.translate(t[a]) + "</span></a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.image.align(t)
        },
        refresh: function(e) {
            this.image.refreshAlign(e)
        },
        refreshOnShow: function(e, t) {
            this.image.refreshAlignOnShow(e, t)
        }
    }), be.FE.DefineIcon("imageReplace", {
        NAME: "exchange",
        FA5NAME: "exchange-alt"
    }), be.FE.RegisterCommand("imageReplace", {
        title: "Replace",
        undo: !1,
        focus: !1,
        popup: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.image.replace()
        }
    }), be.FE.DefineIcon("imageRemove", {
        NAME: "trash"
    }), be.FE.RegisterCommand("imageRemove", {
        title: "Remove",
        callback: function() {
            this.image.remove()
        }
    }), be.FE.DefineIcon("imageBack", {
        NAME: "arrow-left"
    }), be.FE.RegisterCommand("imageBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function() {
            this.image.back()
        },
        refresh: function(e) {
            this.image.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
        }
    }), be.FE.RegisterCommand("imageDismissError", {
        title: "OK",
        undo: !1,
        callback: function() {
            this.image.hideProgressBar(!0)
        }
    }), be.FE.DefineIcon("imageStyle", {
        NAME: "magic"
    }), be.FE.RegisterCommand("imageStyle", {
        title: "Style",
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.imageStyles;
            for (var a in t)
                if (t.hasOwnProperty(a)) {
                    var i = t[a];
                    "object" == typeof i && (i = i.title), e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="imageStyle" data-param1="' + a + '">' + this.language.translate(i) + "</a></li>"
                }
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.image.applyStyle(t)
        },
        refreshOnShow: function(e, t) {
            var a = this.image.getEl();
            a && t.find(".fr-command").each(function() {
                var e = be(this).data("param1"),
                    t = a.hasClass(e);
                be(this).toggleClass("fr-active", t).attr("aria-selected", t)
            })
        }
    }), be.FE.DefineIcon("imageAlt", {
        NAME: "info"
    }), be.FE.RegisterCommand("imageAlt", {
        undo: !1,
        focus: !1,
        popup: !0,
        title: "Alternative Text",
        callback: function() {
            this.image.showAltPopup()
        }
    }), be.FE.RegisterCommand("imageSetAlt", {
        undo: !0,
        focus: !1,
        title: "Update",
        refreshAfterCallback: !1,
        callback: function() {
            this.image.setAlt()
        }
    }), be.FE.DefineIcon("imageSize", {
        NAME: "arrows-alt"
    }), be.FE.RegisterCommand("imageSize", {
        undo: !1,
        focus: !1,
        popup: !0,
        title: "Change Size",
        callback: function() {
            this.image.showSizePopup()
        }
    }), be.FE.RegisterCommand("imageSetSize", {
        undo: !0,
        focus: !1,
        title: "Update",
        refreshAfterCallback: !1,
        callback: function() {
            this.image.setSize()
        }
    }), be.FE.DefineIcon("imageCaption", {
        NAME: "commenting",
        FA5NAME: "comment-alt"
    }), be.FE.RegisterCommand("imageCaption", {
        undo: !0,
        focus: !1,
        title: "Image Caption",
        refreshAfterCallback: !0,
        callback: function() {
            this.image.toggleCaption()
        },
        refresh: function(e) {
            this.image.get() && e.toggleClass("fr-active", this.image.hasCaption())
        }
    })
});

/*!
 * draggable Plugin
 */

! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t)
    } : n(window.jQuery)
}(function(v) {
    v.extend(v.FE.DEFAULTS, {
        dragInline: !0
    }), v.FE.PLUGINS.draggable = function(f) {
        function e(e) {
            return !(!e.originalEvent || !e.originalEvent.target || e.originalEvent.target.nodeType != Node.TEXT_NODE) || (e.target && "A" == e.target.tagName && 1 == e.target.childNodes.length && "IMG" == e.target.childNodes[0].tagName && (e.target = e.target.childNodes[0]), v(e.target).hasClass("fr-draggable") ? (f.undo.canDo() || f.undo.saveStep(), f.opts.dragInline ? f.$el.attr("contenteditable", !0) : f.$el.attr("contenteditable", !1), f.opts.toolbarInline && f.toolbar.hide(), v(e.target).addClass("fr-dragging"), f.browser.msie || f.browser.edge || f.selection.clear(), void e.originalEvent.dataTransfer.setData("text", "Froala")) : (f.browser.msie || e.preventDefault(), !1))
        }

        function g(e) {
            return !(e && ("HTML" == e.tagName || "BODY" == e.tagName || f.node.isElement(e)))
        }

        function d(e, t, n) {
            f.opts.iframe && (e += f.$iframe.offset().top, t += f.$iframe.offset().left), p.offset().top != e && p.css("top", e), p.offset().left != t && p.css("left", t), p.width() != n && p.css("width", n)
        }

        function t(e) {
            e.originalEvent.dataTransfer.dropEffect = "move", f.opts.dragInline ? function() {
                for (var e = null, t = 0; t < v.FE.INSTANCES.length; t++)
                    if ((e = v.FE.INSTANCES[t].$el.find(".fr-dragging")).length) return e.get(0)
            }() || !f.browser.msie && !f.browser.edge || e.preventDefault() : (e.preventDefault(), function(e) {
                var t = f.doc.elementFromPoint(e.originalEvent.pageX - f.win.pageXOffset, e.originalEvent.pageY - f.win.pageYOffset);
                if (!g(t)) {
                    for (var n = 0, r = t; !g(r) && r == t && 0 < e.originalEvent.pageY - f.win.pageYOffset - n;) n++, r = f.doc.elementFromPoint(e.originalEvent.pageX - f.win.pageXOffset, e.originalEvent.pageY - f.win.pageYOffset - n);
                    (!g(r) || p && 0 === f.$el.find(r).length && r != p.get(0)) && (r = null);
                    for (var a = 0, o = t; !g(o) && o == t && e.originalEvent.pageY - f.win.pageYOffset + a < v(f.doc).height();) a++, o = f.doc.elementFromPoint(e.originalEvent.pageX - f.win.pageXOffset, e.originalEvent.pageY - f.win.pageYOffset + a);
                    (!g(o) || p && 0 === f.$el.find(o).length && o != p.get(0)) && (o = null), t = null == o && r ? r : o && null == r ? o : o && r ? n < a ? r : o : null
                }
                if (v(t).hasClass("fr-drag-helper")) return;
                if (t && !f.node.isBlock(t) && (t = f.node.blockParent(t)), t && 0 <= ["TD", "TH", "TR", "THEAD", "TBODY"].indexOf(t.tagName) && (t = v(t).parents("table").get(0)), t && 0 <= ["LI"].indexOf(t.tagName) && (t = v(t).parents("UL, OL").get(0)), t && !v(t).hasClass("fr-drag-helper")) {
                    var i;
                    p || (v.FE.$draggable_helper || (v.FE.$draggable_helper = v('<div class="fr-drag-helper"></div>')), p = v.FE.$draggable_helper, f.events.on("shared.destroy", function() {
                        p.html("").removeData().remove(), p = null
                    }, !0)), i = e.originalEvent.pageY < v(t).offset().top + v(t).outerHeight() / 2;
                    var l = v(t),
                        s = 0;
                    i || 0 !== l.next().length ? (i || (l = l.next()), "before" == p.data("fr-position") && l.is(p.data("fr-tag")) || (0 < l.prev().length && (s = parseFloat(l.prev().css("margin-bottom")) || 0), s = Math.max(s, parseFloat(l.css("margin-top")) || 0), d(l.offset().top - s / 2 - f.$box.offset().top, l.offset().left - f.win.pageXOffset - f.$box.offset().left, l.width()), p.data("fr-position", "before"))) : "after" == p.data("fr-position") && l.is(p.data("fr-tag")) || (s = parseFloat(l.css("margin-bottom")) || 0, d(l.offset().top + v(t).height() + s / 2 - f.$box.offset().top, l.offset().left - f.win.pageXOffset - f.$box.offset().left, l.width()), p.data("fr-position", "after")), p.data("fr-tag", l), p.addClass("fr-visible"), p.appendTo(f.$box)
                } else p && 0 < f.$box.find(p).length && p.removeClass("fr-visible")
            }(e))
        }

        function n(e) {
            e.originalEvent.dataTransfer.dropEffect = "move", f.opts.dragInline || e.preventDefault()
        }

        function r(e) {
            f.$el.attr("contenteditable", !0);
            var t = f.$el.find(".fr-dragging");
            p && p.hasClass("fr-visible") && f.$box.find(p).length ? a(e) : t.length && (e.preventDefault(), e.stopPropagation()), p && f.$box.find(p).length && p.removeClass("fr-visible"), t.removeClass("fr-dragging")
        }

        function a(e) {
            var t, n;
            "true" !== f.$el.attr("contenteditable") && f.$el.attr("contenteditable", !0);
            for (var r = 0; r < v.FE.INSTANCES.length; r++)
                if ((t = v.FE.INSTANCES[r].$el.find(".fr-dragging")).length) {
                    n = v.FE.INSTANCES[r];
                    break
                }
            if (t.length) {
                if (e.preventDefault(), e.stopPropagation(), p && p.hasClass("fr-visible") && f.$box.find(p).length) p.data("fr-tag")[p.data("fr-position")]('<span class="fr-marker"></span>'), p.removeClass("fr-visible");
                else if (!1 === f.markers.insertAtPoint(e.originalEvent)) return !1;
                if (t.removeClass("fr-dragging"), !1 === (t = f.events.chainTrigger("element.beforeDrop", t))) return !1;
                var a = t;
                if (t.parent().is("A") && 1 == t.parent().get(0).childNodes.length && (a = t.parent()), f.core.isEmpty()) f.events.focus();
                else f.$el.find(".fr-marker").replaceWith(v.FE.MARKERS), f.selection.restore();
                if (n == f || f.undo.canDo() || f.undo.saveStep(), f.core.isEmpty()) f.$el.html(a);
                else {
                    var o = f.markers.insert();
                    0 === a.find(o).length ? v(o).replaceWith(a) : 0 === t.find(o).length && v(o).replaceWith(t), t.after(v.FE.MARKERS), f.selection.restore()
                }
                return f.popups.hideAll(), f.selection.save(), f.$el.find(f.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").not(f.opts.htmlAllowedEmptyTags.join(",")).remove(), f.html.wrap(), f.html.fillEmptyBlocks(), f.selection.restore(), f.undo.saveStep(), f.opts.iframe && f.size.syncIframe(), n != f && (n.popups.hideAll(), n.$el.find(n.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").remove(), n.html.wrap(), n.html.fillEmptyBlocks(), n.undo.saveStep(), n.events.trigger("element.dropped"), n.opts.iframe && n.size.syncIframe()), f.events.trigger("element.dropped", [a]), !1
            }
            p && p.removeClass("fr-visible"), f.undo.canDo() || f.undo.saveStep(), setTimeout(function() {
                f.undo.saveStep()
            }, 0)
        }

        function o(e) {
            if (e && "DIV" == e.tagName && f.node.hasClass(e, "fr-drag-helper")) e.parentNode.removeChild(e);
            else if (e && e.nodeType == Node.ELEMENT_NODE)
                for (var t = e.querySelectorAll("div.fr-drag-helper"), n = 0; n < t.length; n++) t[n].parentNode.removeChild(t[n])
        }
        var p;
        return {
            _init: function() {
                f.opts.enter == v.FE.ENTER_BR && (f.opts.dragInline = !0), f.events.on("dragstart", e, !0), f.events.on("dragover", t, !0), f.events.on("dragenter", n, !0), f.events.on("document.dragend", r, !0), f.events.on("document.drop", r, !0), f.events.on("drop", a, !0), f.events.on("html.processGet", o)
            }
        }
    }
});

/*!
 * word_paste Plugin
 */

! function(r) {
    "function" == typeof define && define.amd ? define(["jquery"], r) : "object" == typeof module && module.exports ? module.exports = function(e, t) {
        return t === undefined && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), r(t)
    } : r(window.jQuery)
}(function(S) {
    S.extend(S.FE.DEFAULTS, {
        wordDeniedTags: [],
        wordDeniedAttrs: [],
        wordAllowedStyleProps: ["font-family", "font-size", "background", "color", "width", "text-align", "vertical-align", "background-color", "padding", "margin", "height", "margin-top", "margin-left", "margin-right", "margin-bottom", "text-decoration", "font-weight", "font-style", "text-indent", "border", "border-.*", "line-height", "list-style-type"],
        wordPasteModal: !0,
        wordPasteKeepFormatting: !0
    }), S.FE.PLUGINS.wordPaste = function(C) {
        var l, i, a = "word_paste";

        function t(e) {
            var t = C.opts.wordAllowedStyleProps;
            e || (C.opts.wordAllowedStyleProps = []), 0 === i.indexOf("<colgroup>") && (i = "<table>" + i + "</table>"), i = function(e, t) {
                0 <= e.indexOf("<html") && (e = e.replace(/[.\s\S\w\W<>]*(<html[^>]*>[.\s\S\w\W<>]*<\/html>)[.\s\S\w\W<>]*/i, "$1"));
                ! function(e) {
                    for (var t = e.split("v:shape"), r = 1; r < t.length; r++) {
                        var i = t[r],
                            n = i.split(' id="')[1];
                        if (n && 1 < n.length) {
                            n = n.split('"')[0];
                            var l = i.split(' o:spid="')[1];
                            l && 1 < l.length && (l = l.split('"')[0], c[n] = l)
                        }
                    }
                }(e);
                var r = (new DOMParser).parseFromString(e, "text/html"),
                    i = r.head,
                    n = r.body,
                    o = function(e) {
                        var t = {},
                            r = e.getElementsByTagName("style");
                        if (r.length) {
                            var i = r[0],
                                n = i.innerHTML.match(/[\S ]+\s+{[\s\S]+?}/gi);
                            if (n)
                                for (var l = 0; l < n.length; l++) {
                                    var a = n[l],
                                        o = a.replace(/([\S ]+\s+){[\s\S]+?}/gi, "$1"),
                                        s = a.replace(/[\S ]+\s+{([\s\S]+?)}/gi, "$1");
                                    o = o.replace(/^[\s]|[\s]$/gm, ""), s = s.replace(/^[\s]|[\s]$/gm, ""), o = o.replace(/\n|\r|\n\r/g, ""), s = s.replace(/\n|\r|\n\r/g, "");
                                    for (var d = o.split(", "), f = 0; f < d.length; f++) t[d[f]] = s
                                }
                        }
                        return t
                    }(i);
                f(n, function(e) {
                    if (e.nodeType == Node.TEXT_NODE && /\n|\u00a0|\r/.test(e.data)) {
                        if (!/\S| /.test(e.data) && !/[\u00a0]+/.test(e.data)) return e.data == S.FE.UNICODE_NBSP ? (e.data = "\u200b", !0) : 1 == e.data.length && 10 == e.data.charCodeAt(0) ? (e.data = " ", !0) : (y(e), !1);
                        e.data = e.data.replace(/\n|\r/gi, " ")
                    }
                    return !0
                }), f(n, function(e) {
                    return e.nodeType != Node.ELEMENT_NODE || "V:IMAGEDATA" != e.tagName && "IMG" != e.tagName || function(e, t) {
                        if (!t) return;
                        var r;
                        if ("IMG" == e.tagName) {
                            var i = e.getAttribute("src");
                            if (!i || -1 == i.indexOf("file://")) return;
                            if (0 === i.indexOf("file://") && C.helpers.isURL(e.getAttribute("alt"))) return e.setAttribute("src", e.getAttribute("alt"));
                            (r = c[e.getAttribute("v:shapes")]) || (r = e.getAttribute("v:shapes"), e.parentNode && e.parentNode.parentNode && 0 <= e.parentNode.parentNode.innerHTML.indexOf("msEquation") && (r = null))
                        } else r = e.parentNode.getAttribute("o:spid");
                        if (e.removeAttribute("height"), !r) return;
                        n = t, p = {}, u(n, "i", "\\shppict"), u(n, "s", "\\shp{");
                        var n;
                        var l = p[r.substring(7)];
                        if (l) {
                            var a = function(e) {
                                    for (var t = e.match(/[0-9a-f]{2}/gi), r = [], i = 0; i < t.length; i++) r.push(String.fromCharCode(parseInt(t[i], 16)));
                                    var n = r.join("");
                                    return btoa(n)
                                }(l.image_hex),
                                o = "data:" + l.image_type + ";base64," + a;
                            "IMG" === e.tagName ? (e.src = o, e.setAttribute("data-fr-image-pasted", !0)) : S(e.parentNode).before('<img data-fr-image-pasted="true" src="' + o + '" style="' + e.parentNode.getAttribute("style") + '">').remove()
                        }
                    }(e, t), !0
                });
                for (var l = n.querySelectorAll("ul > ul, ul > ol, ol > ul, ol > ol"), a = l.length - 1; 0 <= a; a--) l[a].previousElementSibling && "LI" === l[a].previousElementSibling.tagName && l[a].previousElementSibling.appendChild(l[a]);
                f(n, function(t) {
                    if (t.nodeType == Node.TEXT_NODE) return t.data = t.data.replace(/<br>(\n|\r)/gi, "<br>"), !1;
                    if (t.nodeType == Node.ELEMENT_NODE) {
                        if (N(t)) {
                            var r = t.parentNode,
                                i = t.previousSibling,
                                n = function e(t, r, i) {
                                    var n = /[0-9a-zA-Z]./gi;
                                    var l = !1;
                                    var a = t.querySelector('span[style="mso-list:Ignore"]');
                                    var o;
                                    var s;
                                    var d;
                                    var f;
                                    var u;
                                    var g;
                                    var p;
                                    a && (l = l || n.test(a.textContent));
                                    if (1 == l) {
                                        var c = a.textContent.trim().split(".")[0];
                                        "a" == c ? p = "lower-alpha;" : "A" == c ? p = "upper-alpha;" : "1" == c ? p = "decimal;" : "i" == c ? p = "lower-roman;" : "I" == c ? p = "upper-roman;" : "o" == c && (p = "circle;"), p = "list-style-type: " + p, g = "ol"
                                    } else g = "ul";
                                    var h = p ? "<" + g + ' style = "' + p + '">' : "<" + g + ">";
                                    for (; t;) {
                                        if (!N(t)) {
                                            if (t.outerHTML && 0 < t.outerHTML.indexOf("mso-bookmark") && 0 === (t.textContent || "").length) {
                                                t = t.nextElementSibling;
                                                continue
                                            }
                                            break
                                        }
                                        var m = t.getAttribute("style").replace(/\n/gi, "").replace(/.*level([0-9]+?).*/gi, "$1");
                                        if ((i = i || m) < m) u = e(t, r, m), h += u.el.outerHTML, t = u.currentNode;
                                        else {
                                            if (m < i) break;
                                            t.firstElementChild && t.firstElementChild.firstElementChild && t.firstElementChild.firstElementChild.firstChild && (n.lastIndex = 0, s = n.test(t.firstElementChild.firstElementChild.firstChild.data || t.firstElementChild.firstElementChild.firstChild.firstChild && t.firstElementChild.firstElementChild.firstChild.firstChild.data || "")), o && o.firstElementChild && o.firstElementChild.firstElementChild && o.firstElementChild.firstElementChild.firstChild && (n.lastIndex = 0, d = n.test(o.firstElementChild.firstElementChild.firstChild.data || o.firstElementChild.firstElementChild.firstChild.firstChild && o.firstElementChild.firstElementChild.firstChild.firstChild.data || "")), d === undefined || d === s ? (f = A(t, r), h += "<li>" + f + "</li>") : (u = e(t, r, m), h += u.el.outerHTML, t = u.currentNode);
                                            var v = t && t.nextElementSibling;
                                            v && (o = v.previousElementSibling), t && t.parentNode && t.parentNode.removeChild(t), t = v
                                        }
                                    }
                                    h += "</" + g + ">";
                                    var b = document.createElement("div");
                                    b.innerHTML = h;
                                    var E = b.firstElementChild;
                                    return {
                                        el: E,
                                        currentNode: t
                                    }
                                }(t, o).el,
                                l = null;
                            return (l = i ? i.nextSibling : r.firstChild) ? r.insertBefore(n, l) : r.appendChild(n), !1
                        }
                        return "FONT" === t.tagName && o["." + t.getAttribute("class")] && (t = v(t, "span")), g(t, o)
                    }
                    if (t.nodeType == Node.COMMENT_NODE) {
                        if (-1 < t.data.indexOf("[if !supportLineBreakNewLine]"))
                            for (var a = t.nextSibling; a;)(a = t.nextSibling) && y(a), a.data && -1 < a.data.indexOf("[endif]") && (a = null);
                        return y(t), !1
                    }
                    return !0
                }), f(n, function(e) {
                    if (e.nodeType == Node.ELEMENT_NODE) {
                        var t = e.tagName;
                        if (!e.innerHTML && -1 == ["BR", "IMG"].indexOf(t)) {
                            for (var r = e.parentNode; r && (y(e), !(e = r).innerHTML);) r = e.parentNode;
                            return !1
                        }! function(e) {
                            var t = e.getAttribute("style");
                            if (!t) return;
                            (t = T(t)) && ";" != t.slice(-1) && (t += ";");
                            var r = t.match(/(^|\S+?):.+?;{1,1}/gi);
                            if (!r) return;
                            for (var i = {}, n = 0; n < r.length; n++) {
                                var l = r[n],
                                    a = l.split(":");
                                2 == a.length && ("text-align" == a[0] && "SPAN" == e.tagName || (i[a[0]] = a[1]))
                            }
                            var o = "";
                            for (var s in i)
                                if (i.hasOwnProperty(s)) {
                                    if ("font-size" == s && "pt;" == i[s].slice(-3)) {
                                        var d = null;
                                        try {
                                            d = parseFloat(i[s].slice(0, -3), 10)
                                        } catch (f) {}
                                        d && (d = Math.round(1.33 * d), i[s] = d + "px;")
                                    }
                                    o += s + ":" + i[s]
                                }
                            o && e.setAttribute("style", o)
                        }(e)
                    }
                    return !0
                }), f(n, function(e) {
                    if (e && "A" === e.nodeName && "" === e.href) {
                        for (var t = document.createDocumentFragment(); e.firstChild;) t.appendChild(e.firstChild);
                        e.parentNode.replaceChild(t, e)
                    }
                    return !0
                });
                var s = n.outerHTML,
                    d = C.opts.htmlAllowedStyleProps;
                return C.opts.htmlAllowedStyleProps = C.opts.wordAllowedStyleProps, s = C.clean.html(s, C.opts.wordDeniedTags, C.opts.wordDeniedAttrs, !1), C.opts.htmlAllowedStyleProps = d, s
            }(i = i.replace(/<span[\n\r ]*style='mso-spacerun:yes'>([\r\n\u00a0 ]*)<\/span>/g, function(e, t) {
                for (var r = "", i = 0; i++ < t.length;) r += "&nbsp;";
                return r
            }), C.paste.getRtfClipboard());
            var r = C.doc.createElement("DIV");
            r.innerHTML = i, C.html.cleanBlankSpaces(r), i = r.innerHTML, i = (i = C.paste.cleanEmptyTagsAndDivs(i)).replace(/\u200b/g, ""), C.modals.hide(a), C.paste.clean(i, !0, !0), C.opts.wordAllowedStyleProps = t
        }

        function y(e) {
            e.parentNode && e.parentNode.removeChild(e)
        }
        // var inputs = $('.fr-element');
        // alert($('.wseditor').html());

        $(".wseditor").focusout(function() {
            $(".wseditor").removeClass('wseditorshadow');
            // $(".wseditor").css("background","white");
        });
        var divs = $('.wseditor'),
            layer = $('#layer');
        divs.click(function() {
            divs.css('z-index', 8);
            $(this).css('z-index', 10);
            layer.fadeIn('fast');
        });

        layer.click(function() {
            $(this).fadeOut('fast');
        });

        function f(e, t) {
            if (t(e))
                for (var r = e.firstChild; r;) {
                    var i = r,
                        n = r.previousSibling;
                    r = r.nextSibling, f(i, t), i.previousSibling || i.nextSibling || i.parentNode || !r || n == r.previousSibling || !r.parentNode ? i.previousSibling || i.nextSibling || i.parentNode || !r || r.previousSibling || r.nextSibling || r.parentNode || (n ? r = n.nextSibling ? n.nextSibling.nextSibling : null : e.firstChild && (r = e.firstChild.nextSibling)) : r = n ? n.nextSibling : e.firstChild
                }
        }

        function N(e) {
            if (!e.getAttribute("style") || !/mso-list:[\s]*l/gi.test(e.getAttribute("style").replace(/\n/gi, ""))) return !1;
            try {
                if (!e.querySelector('[style="mso-list:Ignore"]')) return !!(e.outerHTML && 0 <= e.outerHTML.indexOf("\x3c!--[if !supportLists]--\x3e"))
            } catch (t) {
                return !1
            }
            return !0
        }

        function A(e, i) {
            var t = e.cloneNode(!0);
            if (-1 != ["H1", "H2", "H3", "H4", "H5", "H6"].indexOf(e.tagName)) {
                var r = document.createElement(e.tagName.toLowerCase());
                r.setAttribute("style", e.getAttribute("style")), r.innerHTML = t.innerHTML, t.innerHTML = r.outerHTML
            }
            f(t, function(e) {
                if (e.nodeType == Node.COMMENT_NODE && (C.browser.msie || C.browser.safari || C.browser.edge)) try {
                    if ("[if !supportLists]" === e.data) {
                        for (e = e.nextSibling; e && e.nodeType !== Node.COMMENT_NODE;) {
                            var t = e.nextSibling;
                            e.parentNode.removeChild(e), e = t
                        }
                        e && e.nodeType == Node.COMMENT_NODE && e.parentNode.removeChild(e)
                    }
                } catch (r) {}
                return e.nodeType == Node.ELEMENT_NODE && ("mso-list:Ignore" == e.getAttribute("style") && e.parentNode.removeChild(e), e.setAttribute("style", function(e) {
                    var r = "",
                        i = e.getAttribute("style");
                    i && ["line-height", "font-family", "font-size", "color", "background"].forEach(function(e) {
                        var t = i.match(new RegExp(e + ":.*;"));
                        t && (r += t[0] + ";")
                    });
                    return r
                }(e)), g(e, i)), !0
            });
            var n = t.innerHTML;
            return n = n.replace(/<!--[\s\S]*?-->/gi, "")
        }

        function v(e, t) {
            for (var r = document.createElement(t), i = 0; i < e.attributes.length; i++) {
                var n = e.attributes[i].name;
                r.setAttribute(n, e.getAttribute(n))
            }
            return r.innerHTML = e.innerHTML, e.parentNode.replaceChild(r, e), r
        }

        function x(e) {
            var t = e.getAttribute("align");
            t && (e.style["text-align"] = t, e.removeAttribute("align"))
        }

        function T(e) {
            return e.replace(/\n|\r|\n\r|&quot;/g, "")
        }

        function w(e, t, r) {
            if (t) {
                var i = e.getAttribute("style");
                i && ";" != i.slice(-1) && (i += ";"), t && ";" != t.slice(-1) && (t += ";"), t = t.replace(/\n/gi, "");
                var n = null;
                n = r ? (i || "") + t : t + (i || ""), e.setAttribute("style", n)
            }
        }
        var p = null;

        function u(e, t, r) {
            for (var i = e.split(r), n = 1; n < i.length; n++) {
                var l = i[n];
                if (1 < (l = l.split("shplid")).length) {
                    l = l[1];
                    for (var a = "", o = 0; o < l.length && "\\" != l[o] && "{" != l[o] && " " != l[o] && "\r" != l[o] && "\n" != l[o];) a += l[o], o++;
                    var s = l.split("bliptag");
                    if (s && s.length < 2) continue;
                    var d = null;
                    if (-1 != s[0].indexOf("pngblip") ? d = "image/png" : -1 != s[0].indexOf("jpegblip") && (d = "image/jpeg"), !d) continue;
                    var f, u = s[1].split("}");
                    if (u && u.length < 2) continue;
                    if (2 < u.length && -1 != u[0].indexOf("blipuid")) f = u[1].split(" ");
                    else {
                        if ((f = u[0].split(" ")) && f.length < 2) continue;
                        f.shift()
                    }
                    var g = f.join("");
                    p[t + a] = {
                        image_hex: g,
                        image_type: d
                    }
                }
            }
        }

        function g(e, t) {
            var r = e.tagName,
                i = r.toLowerCase();
            e.firstElementChild && ("I" == e.firstElementChild.tagName ? v(e.firstElementChild, "em") : "B" == e.firstElementChild.tagName && v(e.firstElementChild, "strong"));
            if (-1 != ["SCRIPT", "APPLET", "EMBED", "NOFRAMES", "NOSCRIPT"].indexOf(r)) return y(e), !1;
            var n = -1,
                l = ["META", "LINK", "XML", "ST1:", "O:", "W:", "FONT"];
            for (n = 0; n < l.length; n++)
                if (-1 != r.indexOf(l[n])) return e.innerHTML && (e.outerHTML = e.innerHTML), y(e), !1;
            if ("TD" != r) {
                var a = e.getAttribute("class") || "MsoNormal";
                if (t && a) {
                    var o = (a = T(a)).split(" ");
                    for (n = 0; n < o.length; n++) {
                        var s = [],
                            d = "." + o[n];
                        s.push(d), d = i + d, s.push(d);
                        for (var f = 0; f < s.length; f++) t[s[f]] && w(e, t[s[f]])
                    }
                    e.removeAttribute("class")
                }
                t && t[i] && w(e, t[i])
            }
            if (-1 != ["P", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"].indexOf(r)) {
                var u = e.getAttribute("class");
                if (u && (t && t[r.toLowerCase() + "." + u] && w(e, t[r.toLowerCase() + "." + u]), -1 != u.toLowerCase().indexOf("mso"))) {
                    var g = T(u);
                    (g = g.replace(/[0-9a-z-_]*mso[0-9a-z-_]*/gi, "")) ? e.setAttribute("class", g): e.removeAttribute("class")
                }
                var p = e.getAttribute("style");
                if (p) {
                    var c = p.match(/text-align:.+?[; "]{1,1}/gi);
                    c && c[c.length - 1].replace(/(text-align:.+?[; "]{1,1})/gi, "$1")
                }
                x(e)
            }
            if ("TR" == r && function(e, t) {
                    C.node.clearAttributes(e);
                    for (var r = e.firstElementChild, i = 0, n = !1, l = null; r;) {
                        r.firstElementChild && -1 != r.firstElementChild.tagName.indexOf("W:") && (r.innerHTML = r.firstElementChild.innerHTML), (l = r.getAttribute("width")) || n || (n = !0), i += parseInt(l, 10), (!r.firstChild || r.firstChild && r.firstChild.data == S.FE.UNICODE_NBSP) && (r.firstChild && y(r.firstChild), r.innerHTML = "<br>");
                        for (var a = r.firstElementChild, o = 1 == r.children.length; a;) "P" != a.tagName || N(a) || o && x(a), a = a.nextElementSibling;
                        if (t) {
                            var s = r.getAttribute("class");
                            if (s) {
                                var d = (s = T(s)).match(/xl[0-9]+/gi);
                                if (d) {
                                    var f = "." + d[0];
                                    t[f] && w(r, t[f])
                                }
                            }
                            t.td && w(r, t.td)
                        }
                        var u = r.getAttribute("style");
                        u && (u = T(u)) && ";" != u.slice(-1) && (u += ";");
                        var g = r.getAttribute("valign");
                        if (!g && u) {
                            var p = u.match(/vertical-align:.+?[; "]{1,1}/gi);
                            p && (g = p[p.length - 1].replace(/vertical-align:(.+?)[; "]{1,1}/gi, "$1"))
                        }
                        var c = null;
                        if (u) {
                            var h = u.match(/text-align:.+?[; "]{1,1}/gi);
                            h && (c = h[h.length - 1].replace(/text-align:(.+?)[; "]{1,1}/gi, "$1")), "general" == c && (c = null)
                        }
                        var m = null;
                        if (u) {
                            var v = u.match(/background:.+?[; "]{1,1}/gi);
                            v && (m = v[v.length - 1].replace(/background:(.+?)[; "]{1,1}/gi, "$1"))
                        }
                        var b = r.getAttribute("colspan"),
                            E = r.getAttribute("rowspan");
                        b && r.setAttribute("colspan", b), E && r.setAttribute("rowspan", E), g && (r.style["vertical-align"] = g), c && (r.style["text-align"] = c), m && (r.style["background-color"] = m), l && r.setAttribute("width", l), r = r.nextElementSibling
                    }
                    for (r = e.firstElementChild; r;) l = r.getAttribute("width"), n ? r.removeAttribute("width") : r.setAttribute("width", 100 * parseInt(l, 10) / i + "%"), r = r.nextElementSibling
                }(e, t), "A" != r || e.attributes.getNamedItem("href") || e.attributes.getNamedItem("name") || !e.innerHTML || (e.outerHTML = e.innerHTML), "A" == r && e.getAttribute("href") && e.querySelector("img")) {
                var h = e.querySelectorAll("span");
                for (n = 0; n < h.length; n++) h[n].innerText || (h[n].outerHTML = h[n].innerHTML)
            }
            if ("TD" != r && "TH" != r || e.innerHTML || (e.innerHTML = "<br>"), "TABLE" == r && (e.style.width = e.style.width), e.getAttribute("lang") && e.removeAttribute("lang"), e.getAttribute("style") && -1 != e.getAttribute("style").toLowerCase().indexOf("mso")) {
                var m = T(e.getAttribute("style"));
                (m = m.replace(/[0-9a-z-_]*mso[0-9a-z-_]*:.+?(;{1,1}|$)/gi, "")) ? e.setAttribute("style", m): e.removeAttribute("style")
            }
            return !0
        }
        var c = {};
        return {
            _init: function() {
                C.events.on("paste.wordPaste", function(e) {
                    return i = e, C.opts.wordPasteModal ? function() {
                        if (!l) {
                            var e = '<h4><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.95 73.23" style="height: 25px; vertical-align: text-bottom; margin-right: 5px; display: inline-block"><defs><style>.a{fill:#2a5699;}.b{fill:#fff;}</style></defs><path class="a" d="M615.15,827.22h5.09V834c9.11.05,18.21-.09,27.32.05a2.93,2.93,0,0,1,3.29,3.25c.14,16.77,0,33.56.09,50.33-.09,1.72.17,3.63-.83,5.15-1.24.89-2.85.78-4.3.84-8.52,0-17,0-25.56,0v6.81h-5.32c-13-2.37-26-4.54-38.94-6.81q0-29.8,0-59.59c13.05-2.28,26.11-4.5,39.17-6.83Z" transform="translate(-575.97 -827.22)"/><path class="b" d="M620.24,836.59h28.1v54.49h-28.1v-6.81h22.14v-3.41H620.24v-4.26h22.14V873.2H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24V846h22.14v-3.41H620.24Zm-26.67,15c1.62-.09,3.24-.16,4.85-.25,1.13,5.75,2.29,11.49,3.52,17.21,1-5.91,2-11.8,3.06-17.7,1.7-.06,3.41-.15,5.1-.26-1.92,8.25-3.61,16.57-5.71,24.77-1.42.74-3.55,0-5.24.09-1.13-5.64-2.45-11.24-3.47-16.9-1,5.5-2.29,10.95-3.43,16.42q-2.45-.13-4.92-.3c-1.41-7.49-3.07-14.93-4.39-22.44l4.38-.18c.88,5.42,1.87,10.82,2.64,16.25,1.2-5.57,2.43-11.14,3.62-16.71Z" transform="translate(-575.97 -827.22)"/></svg> ' + C.language.translate("Word Paste Detected") + "</h4>",
                                t = (n = '<div class="fr-word-paste-modal" style="padding: 20px 20px 10px 20px;">', n += '<p style="text-align: left;">' + C.language.translate("The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?") + "</p>", n += '<div style="text-align: right; margin-top: 50px;"><button class="fr-remove-word fr-command">' + C.language.translate("Clean") + '</button> <button class="fr-keep-word fr-command">' + C.language.translate("Keep") + "</button></div>", n += "</div>"),
                                r = C.modals.create(a, e, t),
                                i = r.$body;
                            l = r.$modal, r.$modal.addClass("fr-middle"), C.events.bindClick(i, "button.fr-remove-word", function() {
                                var e = l.data("instance") || C;
                                e.wordPaste.clean()
                            }), C.events.bindClick(i, "button.fr-keep-word", function() {
                                var e = l.data("instance") || C;
                                e.wordPaste.clean(!0)
                            }), C.events.$on(S(C.o_win), "resize", function() {
                                C.modals.resize(a)
                            })
                        }
                        var n;
                        C.modals.show(a), C.modals.resize(a)
                    }() : t(C.opts.wordPasteKeepFormatting), !1
                })
            },
            clean: t
        }
    }
});

/*!
 * Typograf Plugin Denis Seleznev | https://github.com/typograf/typograf/
 */

/*! Typograf | ? 2017 Denis Seleznev | https://github.com/typograf/typograf/ */
! function(e, t) {
    "function" == typeof define && define.amd ? define("typograf", [], t) : "object" == typeof exports ? module.exports = t() : e.Typograf = t()
}(this, function() {
    "use strict";

    function e(a) {
        this._prefs = "object" == typeof a ? a : {}, this._prefs.locale = e._prepareLocale(this._prefs.locale), this._prefs.live = this._prefs.live || !1, this._safeTags = new t, this._settings = {}, this._enabledRules = {}, this._innerRulesByQueues = {}, this._innerRules = [].concat(this._innerRules), this._innerRules.forEach(function(e) {
            var t = e.queue || "default";
            this._innerRulesByQueues[t] = this._innerRulesByQueues[t] || [], this._innerRulesByQueues[t].push(e)
        }, this), this._rulesByQueues = {}, this._rules = [].concat(this._rules), this._rules.forEach(function(e) {
            var t = e.queue || "default";
            this._prepareRule(e), this._rulesByQueues[t] = this._rulesByQueues[t] || [], this._rulesByQueues[t].push(e)
        }, this), this._prefs.disableRule && this.disableRule(this._prefs.disableRule), this._prefs.enableRule && this.enableRule(this._prefs.enableRule)
    }

    function t() {
        var t = [
            ["\x3c!--", "--\x3e"],
            ["<!ENTITY", ">"],
            ["<!DOCTYPE", ">"],
            ["<\\?xml", "\\?>"],
            ["<!\\[CDATA\\[", "\\]\\]>"]
        ];
        ["code", "kbd", "object", "pre", "samp", "script", "style", "var"].forEach(function(e) {
            t.push(["<" + e + "(\\s[^>]*?)?>", "</" + e + ">"])
        }, this), this._tags = {
            own: [],
            html: t.map(this._prepareRegExp),
            url: [e._reUrl]
        }, this._groups = ["own", "html", "url"], this._reservedGroups = [].concat(this._groups).reverse()
    }
    return e._mix = function(e, t) {
            Object.keys(t).forEach(function(a) {
                e[a] = t[a]
            })
        }, e._mix(e, {
            addRule: function(e) {
                var t = e.name.split("/");
                return e._enabled = !0 !== e.disabled, e._locale = t[0], e._group = t[1], e._name = t[2], this.addLocale(e._locale), this._setIndex(e), this.prototype._rules.push(e), this._sortRules(this.prototype._rules), this
            },
            addInnerRule: function(e) {
                return this.prototype._innerRules.push(e), e._locale = e.name.split("/")[0], this
            },
            deepCopy: function(e) {
                return "object" == typeof e ? JSON.parse(JSON.stringify(e)) : e
            },
            _privateLabel: "\udbff",
            _repeat: function(e, t) {
                for (var a = ""; 1 == (1 & t) && (a += e), 0 !== (t >>>= 1);) e += e;
                return a
            },
            _replace: function(e, t) {
                for (var a = 0; a < t.length; a++) e = e.replace(t[a][0], t[a][1]);
                return e
            },
            _replaceNbsp: function(e) {
                return e.replace(/\u00A0/g, " ")
            },
            _setIndex: function(e) {
                var t = e.index,
                    a = typeof t,
                    n = this.groupIndexes[e._group];
                "undefined" === a ? t = n : "string" === a && (t = n + parseInt(e.index, 10)), e._index = t
            },
            _reUrl: new RegExp("(https?|file|ftp)://([a-zA-Z0-9/+-=%&:_.~?]+[a-zA-Z0-9#+]*)", "g"),
            _sortRules: function(e) {
                e.sort(function(e, t) {
                    return e._index > t._index ? 1 : -1
                })
            }
        }), e.prototype = {
            constructor: e,
            execute: function(t, a) {
                var n = this;
                if (!(t = "" + t)) return "";
                a = a || {};
                var r = {
                    text: t,
                    prefs: e.deepCopy(this._prefs),
                    getData: function(t) {
                        return "char" === t ? this.prefs.locale.map(function(a) {
                            return e.getData(a + "/" + t)
                        }).join("") : e.getData(this.prefs.locale[0] + "/" + t)
                    }
                };
                r.prefs.htmlEntity = a.htmlEntity || this._prefs.htmlEntity || {}, r.prefs.locale = e._prepareLocale(a.locale, this._prefs.locale), r.prefs.lineEnding = a.lineEnding || this._prefs.lineEnding, r.prefs.ruleFilter = a.ruleFilter || this._prefs.ruleFilter;
                var u = r.prefs.locale;
                if (!u.length || !u[0]) throw Error('Not defined the property "locale".');
                if (!e.hasLocale(u[0])) throw Error('"' + u[0] + '" is not supported locale.');
                return r.text = this._removeCR(r.text), r.isHTML = -1 !== r.text.search(/(<\/?[a-z]|<!|&[lg]t;)/i), this._executeRules(r, "start"), this._safeTags.hide(r, function(e, t) {
                    n._executeRules(e, "hide-safe-tags-" + t)
                }), this._executeRules(r, "hide-safe-tags"), e.HtmlEntities.toUtf(r), this._prefs.live && (r.text = e._replaceNbsp(r.text)), this._executeRules(r, "utf"), this._executeRules(r), e.HtmlEntities.restore(r), this._executeRules(r, "html-entities"), this._safeTags.show(r, function(e, t) {
                    n._executeRules(e, "show-safe-tags-" + t)
                }), this._executeRules(r, "end"), this._fixLineEnding(r.text, r.prefs.lineEnding)
            },
            getSetting: function(e, t) {
                return this._settings[e] && this._settings[e][t]
            },
            setSetting: function(e, t, a) {
                return this._settings[e] = this._settings[e] || {}, this._settings[e][t] = a, this
            },
            isEnabledRule: function(e) {
                return this._enabledRules[e]
            },
            isDisabledRule: function(e) {
                return !this._enabledRules[e]
            },
            enableRule: function(e) {
                return this._enable(e, !0)
            },
            disableRule: function(e) {
                return this._enable(e, !1)
            },
            addSafeTag: function(e, t, a) {
                var n = e instanceof RegExp ? e : [e, t, a];
                return this._safeTags.add(n), this
            },
            _executeRules: function(e, t) {
                t = t || "default";
                var a = this._rulesByQueues[t],
                    n = this._innerRulesByQueues[t];
                n && n.forEach(function(t) {
                    this._ruleIterator(e, t)
                }, this), a && a.forEach(function(t) {
                    this._ruleIterator(e, t)
                }, this)
            },
            _ruleIterator: function(e, t) {
                var a = t._locale,
                    n = this._prefs.live;
                if (!(!0 === n && !1 === t.live || !1 === n && !0 === t.live) && ("common" === a || a === e.prefs.locale[0]) && this.isEnabledRule(t.name)) {
                    if (e.prefs.ruleFilter && !e.prefs.ruleFilter(t)) return;
                    this._onBeforeRule && this._onBeforeRule(t.name, e.text, e), e.text = t.handler.call(this, e.text, this._settings[t.name], e), this._onAfterRule && this._onAfterRule(t.name, e.text, e)
                }
            },
            _removeCR: function(e) {
                return e.replace(/\r\n?/g, "\n")
            },
            _fixLineEnding: function(e, t) {
                return "CRLF" === t ? e.replace(/\n/g, "\r\n") : "CR" === t ? e.replace(/\n/g, "\r") : e
            },
            _prepareRule: function(t) {
                var a = t.name,
                    n = typeof t.settings,
                    r = {};
                "object" === n ? r = e.deepCopy(t.settings) : "function" === n && (r = t.settings(t)), this._settings[a] = r, this._enabledRules[a] = t._enabled
            },
            _enable: function(e, t) {
                return Array.isArray(e) ? e.forEach(function(e) {
                    this._enableByMask(e, t)
                }, this) : this._enableByMask(e, t), this
            },
            _enableByMask: function(e, t) {
                var a;
                e && (-1 !== e.search(/\*/) ? (a = new RegExp(e.replace(/\//g, "\\/").replace(/\*/g, ".*")), this._rules.forEach(function(e) {
                    var n = e.name;
                    a.test(n) && (this._enabledRules[n] = t)
                }, this)) : this._enabledRules[e] = t)
            },
            _rules: [],
            _innerRules: [],
            _getRule: function(e) {
                var t = null;
                return this._rules.some(function(a) {
                    return a.name === e && (t = a, !0)
                }), t
            }
        }, e.version = "6.3.1", e._mix(e, {
            getData: function(e) {
                return this._data[e]
            },
            setData: function(e, t) {
                "string" == typeof e ? (this.addLocale(e), this._data[e] = t) : "object" == typeof e && Object.keys(e).forEach(function(t) {
                    this.addLocale(t), this._data[t] = e[t]
                }, this)
            },
            _data: {}
        }), e._mix(e, {
            addLocale: function(e) {
                var t = (e || "").split("/")[0];
                t && "common" !== t && !this.hasLocale(t) && (this._locales.push(t), this._locales.sort())
            },
            getLocales: function() {
                return this._locales
            },
            hasLocale: function(e) {
                return "common" === e || -1 !== this._locales.indexOf(e)
            },
            _prepareLocale: function(e, t) {
                var a = e || t,
                    n = a;
                return Array.isArray(a) || (n = [a]), n
            },
            _locales: []
        }), t.prototype = {
            constructor: t,
            add: function(e) {
                this._tags.own.push(this._prepareRegExp(e))
            },
            show: function(t, a) {
                var n = e._privateLabel,
                    r = new RegExp(n + "tf\\d+" + n, "g"),
                    u = new RegExp(n + "tf\\d"),
                    s = function(e) {
                        return t.safeTags.hidden[t.safeTags.group][e] || e
                    };
                this._reservedGroups.forEach(function(e) {
                    t.safeTags.group = e;
                    for (var n = 0, i = this._tags[e].length; n < i && (t.text = t.text.replace(r, s), -1 !== t.text.search(u)); n++);
                    a(t, e)
                }, this), t.safeTags = null
            },
            hide: function(e, t) {
                e.safeTags = {
                    hidden: {},
                    i: 0
                }, this._groups.forEach(function(t) {
                    e.safeTags.hidden[t] = {}
                }, this), this._groups.forEach(function(a) {
                    this._hide(e, a), t(e, a)
                }, this)
            },
            _hide: function(t, a) {
                var n = function(a) {
                    var n = e._privateLabel + "tf" + t.safeTags.i + e._privateLabel;
                    return t.safeTags.hidden[t.safeTags.group][n] = a, t.safeTags.i++, n
                };
                t.safeTags.group = a, this._tags[a].forEach(function(e) {
                    t.text = t.text.replace(this._prepareRegExp(e), n)
                }, this), "html" === a && t.isHTML && (t.text = t.text.replace(/<\/?[a-z][^]*?>/gi, n).replace(/&lt;\/?[a-z][^]*?&gt;/gi, n).replace(/&[gl]t;/gi, n))
            },
            _prepareRegExp: function(e) {
                var t;
                if (e instanceof RegExp) t = e;
                else {
                    var a = e[0],
                        n = e[1],
                        r = void 0 === e[2] ? "[^]*?" : e[2];
                    t = new RegExp(a + r + n, "gi")
                }
                return t
            }
        }, e.inlineElements = ["a", "abbr", "acronym", "b", "bdo", "big", "br", "button", "cite", "code", "dfn", "em", "i", "img", "input", "kbd", "label", "map", "object", "q", "samp", "script", "select", "small", "span", "strong", "sub", "sup", "textarea", "time", "tt", "var"], e.blockElements = ["address", "article", "aside", "blockquote", "canvas", "dd", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tfoot", "ul", "video"], e.HtmlEntities = {
            init: function() {
                var e = [
                        ["iexcl", 161],
                        ["cent", 162],
                        ["pound", 163],
                        ["curren", 164],
                        ["yen", 165],
                        ["brvbar", 166],
                        ["sect", 167],
                        ["uml", 168],
                        ["copy", 169],
                        ["ordf", 170],
                        ["laquo", 171],
                        ["not", 172],
                        ["reg", 174],
                        ["macr", 175],
                        ["deg", 176],
                        ["plusmn", 177],
                        ["sup2", 178],
                        ["sup3", 179],
                        ["acute", 180],
                        ["micro", 181],
                        ["para", 182],
                        ["middot", 183],
                        ["cedil", 184],
                        ["sup1", 185],
                        ["ordm", 186],
                        ["raquo", 187],
                        ["frac14", 188],
                        ["frac12", 189],
                        ["frac34", 190],
                        ["iquest", 191],
                        ["Agrave", 192],
                        ["Aacute", 193],
                        ["Acirc", 194],
                        ["Atilde", 195],
                        ["Auml", 196],
                        ["Aring", 197],
                        ["AElig", 198],
                        ["Ccedil", 199],
                        ["Egrave", 200],
                        ["Eacute", 201],
                        ["Ecirc", 202],
                        ["Euml", 203],
                        ["Igrave", 204],
                        ["Iacute", 205],
                        ["Icirc", 206],
                        ["Iuml", 207],
                        ["ETH", 208],
                        ["Ntilde", 209],
                        ["Ograve", 210],
                        ["Oacute", 211],
                        ["Ocirc", 212],
                        ["Otilde", 213],
                        ["Ouml", 214],
                        ["times", 215],
                        ["Oslash", 216],
                        ["Ugrave", 217],
                        ["Uacute", 218],
                        ["Ucirc", 219],
                        ["Uuml", 220],
                        ["Yacute", 221],
                        ["THORN", 222],
                        ["szlig", 223],
                        ["agrave", 224],
                        ["aacute", 225],
                        ["acirc", 226],
                        ["atilde", 227],
                        ["auml", 228],
                        ["aring", 229],
                        ["aelig", 230],
                        ["ccedil", 231],
                        ["egrave", 232],
                        ["eacute", 233],
                        ["ecirc", 234],
                        ["euml", 235],
                        ["igrave", 236],
                        ["iacute", 237],
                        ["icirc", 238],
                        ["iuml", 239],
                        ["eth", 240],
                        ["ntilde", 241],
                        ["ograve", 242],
                        ["oacute", 243],
                        ["ocirc", 244],
                        ["otilde", 245],
                        ["ouml", 246],
                        ["divide", 247],
                        ["oslash", 248],
                        ["ugrave", 249],
                        ["uacute", 250],
                        ["ucirc", 251],
                        ["uuml", 252],
                        ["yacute", 253],
                        ["thorn", 254],
                        ["yuml", 255],
                        ["fnof", 402],
                        ["Alpha", 913],
                        ["Beta", 914],
                        ["Gamma", 915],
                        ["Delta", 916],
                        ["Epsilon", 917],
                        ["Zeta", 918],
                        ["Eta", 919],
                        ["Theta", 920],
                        ["Iota", 921],
                        ["Kappa", 922],
                        ["Lambda", 923],
                        ["Mu", 924],
                        ["Nu", 925],
                        ["Xi", 926],
                        ["Omicron", 927],
                        ["Pi", 928],
                        ["Rho", 929],
                        ["Sigma", 931],
                        ["Tau", 932],
                        ["Upsilon", 933],
                        ["Phi", 934],
                        ["Chi", 935],
                        ["Psi", 936],
                        ["Omega", 937],
                        ["alpha", 945],
                        ["beta", 946],
                        ["gamma", 947],
                        ["delta", 948],
                        ["epsilon", 949],
                        ["zeta", 950],
                        ["eta", 951],
                        ["theta", 952],
                        ["iota", 953],
                        ["kappa", 954],
                        ["lambda", 955],
                        ["mu", 956],
                        ["nu", 957],
                        ["xi", 958],
                        ["omicron", 959],
                        ["pi", 960],
                        ["rho", 961],
                        ["sigmaf", 962],
                        ["sigma", 963],
                        ["tau", 964],
                        ["upsilon", 965],
                        ["phi", 966],
                        ["chi", 967],
                        ["psi", 968],
                        ["omega", 969],
                        ["thetasym", 977],
                        ["upsih", 978],
                        ["piv", 982],
                        ["bull", 8226],
                        ["hellip", 8230],
                        ["prime", 8242],
                        ["Prime", 8243],
                        ["oline", 8254],
                        ["frasl", 8260],
                        ["weierp", 8472],
                        ["image", 8465],
                        ["real", 8476],
                        ["trade", 8482],
                        ["alefsym", 8501],
                        ["larr", 8592],
                        ["uarr", 8593],
                        ["rarr", 8594],
                        ["darr", 8595],
                        ["harr", 8596],
                        ["crarr", 8629],
                        ["lArr", 8656],
                        ["uArr", 8657],
                        ["rArr", 8658],
                        ["dArr", 8659],
                        ["hArr", 8660],
                        ["forall", 8704],
                        ["part", 8706],
                        ["exist", 8707],
                        ["empty", 8709],
                        ["nabla", 8711],
                        ["isin", 8712],
                        ["notin", 8713],
                        ["ni", 8715],
                        ["prod", 8719],
                        ["sum", 8721],
                        ["minus", 8722],
                        ["lowast", 8727],
                        ["radic", 8730],
                        ["prop", 8733],
                        ["infin", 8734],
                        ["ang", 8736],
                        ["and", 8743],
                        ["or", 8744],
                        ["cap", 8745],
                        ["cup", 8746],
                        ["int", 8747],
                        ["there4", 8756],
                        ["sim", 8764],
                        ["cong", 8773],
                        ["asymp", 8776],
                        ["ne", 8800],
                        ["equiv", 8801],
                        ["le", 8804],
                        ["ge", 8805],
                        ["sub", 8834],
                        ["sup", 8835],
                        ["nsub", 8836],
                        ["sube", 8838],
                        ["supe", 8839],
                        ["oplus", 8853],
                        ["otimes", 8855],
                        ["perp", 8869],
                        ["sdot", 8901],
                        ["lceil", 8968],
                        ["rceil", 8969],
                        ["lfloor", 8970],
                        ["rfloor", 8971],
                        ["lang", 9001],
                        ["rang", 9002],
                        ["spades", 9824],
                        ["clubs", 9827],
                        ["hearts", 9829],
                        ["diams", 9830],
                        ["loz", 9674],
                        ["OElig", 338],
                        ["oelig", 339],
                        ["Scaron", 352],
                        ["scaron", 353],
                        ["Yuml", 376],
                        ["circ", 710],
                        ["tilde", 732],
                        ["ndash", 8211],
                        ["mdash", 8212],
                        ["lsquo", 8216],
                        ["rsquo", 8217],
                        ["sbquo", 8218],
                        ["ldquo", 8220],
                        ["rdquo", 8221],
                        ["bdquo", 8222],
                        ["dagger", 8224],
                        ["Dagger", 8225],
                        ["permil", 8240],
                        ["lsaquo", 8249],
                        ["rsaquo", 8250],
                        ["euro", 8364],
                        ["NestedGreaterGreater", 8811],
                        ["NestedLessLess", 8810]
                    ],
                    t = [
                        ["nbsp", 160],
                        ["thinsp", 8201],
                        ["ensp", 8194],
                        ["emsp", 8195],
                        ["shy", 173],
                        ["zwnj", 8204],
                        ["zwj", 8205],
                        ["lrm", 8206],
                        ["rlm", 8207]
                    ];
                this._entities = this._prepareEntities([].concat(e, t)), this._entitiesByName = {}, this._entitiesByNameEntity = {}, this._entitiesByDigitEntity = {}, this._entitiesByUtf = {}, this._entities.forEach(function(e) {
                    this._entitiesByName[e.name] = e, this._entitiesByNameEntity[e.nameEntity] = e, this._entitiesByDigitEntity[e.digitEntity] = e, this._entitiesByUtf[e.utf] = e
                }, this), this._invisibleEntities = this._prepareEntities(t)
            },
            toUtf: function(e) {
                -1 !== e.text.search(/&#/) && (e.text = this.decHexToUtf(e.text)), -1 !== e.text.search(/&[a-z]/i) && this._entities.forEach(function(t) {
                    e.text = e.text.replace(t.reName, t.utf)
                })
            },
            decHexToUtf: function(e) {
                return e.replace(/&#(\d{1,6});/gi, function(e, t) {
                    return String.fromCharCode(parseInt(t, 10))
                }).replace(/&#x([\da-f]{1,6});/gi, function(e, t) {
                    return String.fromCharCode(parseInt(t, 16))
                })
            },
            restore: function(e) {
                var t = e.prefs.htmlEntity,
                    a = t.type,
                    n = this._entities;
                "name" !== a && "digit" !== a || ((t.onlyInvisible || t.list) && (n = [], t.onlyInvisible && (n = n.concat(this._invisibleEntities)), t.list && (n = n.concat(this._prepareListParam(t.list)))), e.text = this._restoreEntitiesByIndex(e.text, a + "Entity", n))
            },
            getByUtf: function(e, t) {
                var a = "";
                switch (t) {
                    case "digit":
                        a = this._entitiesByDigitEntity[e];
                        break;
                    case "name":
                        a = this._entitiesByNameEntity[e];
                        break;
                    default:
                        a = e
                }
                return a
            },
            _prepareEntities: function(e) {
                var t = [];
                return e.forEach(function(e) {
                    var a = e[0],
                        n = e[1],
                        r = String.fromCharCode(n),
                        u = {
                            name: a,
                            nameEntity: "&" + a + ";",
                            digitEntity: "&#" + n + ";",
                            utf: r,
                            reName: new RegExp("&" + a + ";", "g"),
                            reUtf: new RegExp(r, "g")
                        };
                    t.push(u)
                }, this), t
            },
            _prepareListParam: function(e) {
                var t = [];
                return e.forEach(function(e) {
                    var a = this._entitiesByName[e];
                    a && t.push(a)
                }, this), t
            },
            _restoreEntitiesByIndex: function(e, t, a) {
                return a.forEach(function(a) {
                    e = e.replace(a.reUtf, a[t])
                }), e
            }
        }, e.HtmlEntities.init(), e.groupIndexes = {
            symbols: 110,
            space: 210,
            dash: 310,
            punctuation: 410,
            nbsp: 510,
            number: 610,
            money: 710,
            date: 810,
            other: 910,
            optalign: 1010,
            typo: 1110,
            html: 1210
        }, e.setData("be/char", "\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u044b\u044c\u044d\u044e\u044f\u0451\u0456\u045e\u0491"), e.setData("be/quote", {
            left: "\xab\u201c",
            right: "\xbb\u201d"
        }), e.setData("bg/char", "\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044c\u044e\u044f"), e.setData("bg/quote", {
            left: "\u201e\u2019",
            right: "\u201c\u2019"
        }), e.setData("ca/char", "abcdefghijlmnopqrstuvxyz\xe0\xe7\xe8\xe9\xed\xef\xf2\xf3\xfa\xfc"), e.setData("ca/quote", {
            left: "\xab\u201c",
            right: "\xbb\u201d"
        }), e.setData("common/char", "a-z"), e.setData("common/dash", "--?|\u2012|\u2013|\u2014"), e.setData("common/quote", '\xab\u2039\xbb\u203a\u201e\u201c\u201f\u201d"'), e.setData("cs/char", "a-z\xe1\xe9\xed\xf3\xfa\xfd\u010d\u010f\u011b\u0148\u0159\u0161\u0165\u016f\u017e"), e.setData("cs/quote", {
            left: "\u201e\u201a",
            right: "\u201c\u2018"
        }), e.setData("da/char", "a-z\xe5\xe6\xf8"), e.setData("da/quote", {
            left: "\xbb\u203a",
            right: "\xab\u2039"
        }), e.setData("de/char", "a-z\xdf\xe4\xf6\xfc"), e.setData("de/quote", {
            left: "\u201e\u201a",
            right: "\u201c\u2018"
        }), e.setData("el/char", "\u0390\u03ac\u03ad\u03ae\u03af\u03b0\u03b1\u03b2\u03b3\u03b4\u03b5\u03b6\u03b7\u03b8\u03b9\u03ba\u03bb\u03bc\u03bd\u03be\u03bf\u03c0\u03c1\u03c2\u03c3\u03c4\u03c5\u03c6\u03c7\u03c8\u03c9\u03ca\u03cb\u03cc\u03cd\u03ce\u03f2\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d"), e.setData("el/quote", {
            left: "\xab\u201c",
            right: "\xbb\u201d"
        }), e.setData("en-GB/char", "a-z"), e.setData("en-GB/quote", {
            left: "\u2018\u201c",
            right: "\u2019\u201d"
        }), e.setData("en-US/char", "a-z"), e.setData("en-US/quote", {
            left: "\u201c\u2018",
            right: "\u201d\u2019"
        }), e.setData("eo/char", "abcdefghijklmnoprstuvz\u0109\u011d\u0125\u0135\u015d\u016d"), e.setData("eo/quote", {
            left: "\u201c\u2018",
            right: "\u201d\u2019"
        }), e.setData("es/char", "a-z\xe1\xe9\xed\xf1\xf3\xfa\xfc"), e.setData("es/quote", {
            left: "\xab\u201c",
            right: "\xbb\u201d"
        }), e.setData("et/char", "abdefghijklmnoprstuvz\xe4\xf5\xf6\xfc\u0161\u017e"), e.setData("et/quote", {
            left: "\u201e\xab",
            right: "\u201c\xbb"
        }), e.setData("fi/char", "abcdefghijklmnopqrstuvy\xf6\xe4\xe5"), e.setData("fi/quote", {
            left: "\u201d\u2019",
            right: "\u201d\u2019"
        }), e.setData("fr/char", "a-z\xe0\xe2\xe7\xe8\xe9\xea\xeb\xee\xef\xf4\xfb\xfc\u0153\xe6"), e.setData("fr/quote", {
            left: "\xab\u2039",
            right: "\xbb\u203a",
            spacing: !0
        }), e.setData("ga/char", "abcdefghilmnoprstuvwxyz\xe1\xe9\xed\xf3\xfa"), e.setData("ga/quote", {
            left: "\u201c\u2018",
            right: "\u201d\u2019"
        }), e.setData("hu/char", "a-z\xe1\xe4\xe9\xed\xf3\xf6\xfa\xfc\u0151\u0171"), e.setData("hu/quote", {
            left: "\u201e\xbb",
            right: "\u201d\xab"
        }), e.setData("it/char", "a-z\xe0\xe9\xe8\xec\xf2\xf9"), e.setData("it/quote", {
            left: "\xab\u201c",
            right: "\xbb\u201d"
        }), e.setData("lv/char", "abcdefghijklmnopqrstuvxz\xe6\u0153"), e.setData("lv/quote", {
            left: "\xab\u201e",
            right: "\xbb\u201c"
        }), e.setData("nl/char", "a-z\xe4\xe7\xe8\xe9\xea\xeb\xee\xef\xf1\xf6\xfb\xfc"), e.setData("nl/quote", {
            left: "\u2018\u201c",
            right: "\u2019\u201d"
        }), e.setData("no/char", "a-z\xe5\xe6\xe8\xe9\xea\xf2\xf3\xf4\xf8"), e.setData("no/quote", {
            left: "\xab\u2019",
            right: "\xbb\u2019"
        }), e.setData("pl/char", "abcdefghijklmnoprstuvwxyz\xf3\u0105\u0107\u0119\u0142\u0144\u015b\u017a\u017c"), e.setData("pl/quote", {
            left: "\u201e\xab",
            right: "\u201d\xbb"
        }), e.setData("ro/char", "abcdefghijklmnoprstuvxz\xee\u0103\u0219\u021b"), e.setData("ro/quote", {
            left: "\u201e\xab",
            right: "\u201d\xbb"
        }), e.setData("ru/char", "\u0430-\u044f\u0451"), e.setData({
            "ru/dashBefore": "(^| |\\n)",
            "ru/dashAfter": "(?=[\xa0 ,.?:!]|$)",
            "ru/dashAfterDe": "(?=[,.?:!]|[\xa0 ][^\u0410-\u042f\u0401]|$)"
        }), e.setData({
            "ru/l": "\u0430-\u044f\u0451a-z",
            "ru/L": "\u0410-\u042f\u0401A-Z"
        }), e.setData({
            "ru/month": "\u044f\u043d\u0432\u0430\u0440\u044c|\u0444\u0435\u0432\u0440\u0430\u043b\u044c|\u043c\u0430\u0440\u0442|\u0430\u043f\u0440\u0435\u043b\u044c|\u043c\u0430\u0439|\u0438\u044e\u043d\u044c|\u0438\u044e\u043b\u044c|\u0430\u0432\u0433\u0443\u0441\u0442|\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c|\u043e\u043a\u0442\u044f\u0431\u0440\u044c|\u043d\u043e\u044f\u0431\u0440\u044c|\u0434\u0435\u043a\u0430\u0431\u0440\u044c",
            "ru/monthGenCase": "\u044f\u043d\u0432\u0430\u0440\u044f|\u0444\u0435\u0432\u0440\u0430\u043b\u044f|\u043c\u0430\u0440\u0442\u0430|\u0430\u043f\u0440\u0435\u043b\u044f|\u043c\u0430\u044f|\u0438\u044e\u043d\u044f|\u0438\u044e\u043b\u044f|\u0430\u0432\u0433\u0443\u0441\u0442\u0430|\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f|\u043e\u043a\u0442\u044f\u0431\u0440\u044f|\u043d\u043e\u044f\u0431\u0440\u044f|\u0434\u0435\u043a\u0430\u0431\u0440\u044f",
            "ru/monthPreCase": "\u044f\u043d\u0432\u0430\u0440\u0435|\u0444\u0435\u0432\u0440\u0430\u043b\u0435|\u043c\u0430\u0440\u0442\u0435|\u0430\u043f\u0440\u0435\u043b\u0435|\u043c\u0430\u0435|\u0438\u044e\u043d\u0435|\u0438\u044e\u043b\u0435|\u0430\u0432\u0433\u0443\u0441\u0442\u0435|\u0441\u0435\u043d\u0442\u044f\u0431\u0440\u0435|\u043e\u043a\u0442\u044f\u0431\u0440\u0435|\u043d\u043e\u044f\u0431\u0440\u0435|\u0434\u0435\u043a\u0430\u0431\u0440\u0435",
            "ru/shortMonth": "\u044f\u043d\u0432|\u0444\u0435\u0432|\u043c\u0430\u0440|\u0430\u043f\u0440|\u043c\u0430[\u0435\u0439\u044f]|\u0438\u044e\u043d|\u0438\u044e\u043b|\u0430\u0432\u0433|\u0441\u0435\u043d|\u043e\u043a\u0442|\u043d\u043e\u044f|\u0434\u0435\u043a"
        }), e.setData("ru/quote", {
            left: "\xab\u201e\u201a",
            right: "\xbb\u201c\u2018",
            removeDuplicateQuotes: !0
        }), e.setData("ru/weekday", "\u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a|\u0432\u0442\u043e\u0440\u043d\u0438\u043a|\u0441\u0440\u0435\u0434\u0430|\u0447\u0435\u0442\u0432\u0435\u0440\u0433|\u043f\u044f\u0442\u043d\u0438\u0446\u0430|\u0441\u0443\u0431\u0431\u043e\u0442\u0430|\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435"), e.setData("sk/char", "abcdefghijklmnoprstuvwxyz\xe1\xe4\xe9\xed\xf3\xf4\xfa\xfd\u010d\u010f\u013e\u0148\u0155\u0161\u0165\u017e"), e.setData("sk/quote", {
            left: "\u201e\u201a",
            right: "\u201c\u2018"
        }), e.setData("sl/char", "a-z\u010d\u0161\u017e"), e.setData("sl/quote", {
            left: "\u201e\u201a",
            right: "\u201c\u2018"
        }), e.setData("sr/char", "abcdefghijklmnoprstuvz\u0107\u010d\u0111\u0161\u017e"), e.setData("sr/quote", {
            left: "\u201e\u2019",
            right: "\u201d\u2019"
        }), e.setData("sv/char", "a-z\xe4\xe5\xe9\xf6"), e.setData("sv/quote", {
            left: "\u201d\u2019",
            right: "\u201d\u2019"
        }), e.setData("tr/char", "abcdefghijklmnoprstuvyz\xe2\xe7\xee\xf6\xfb\xfc\u011f\u0131\u015f"), e.setData("tr/quote", {
            left: "\u201c\u2018",
            right: "\u201d\u2019"
        }), e.setData("uk/char", "\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044c\u044e\u044f\u0454\u0456\u0457\u0491"), e.setData("uk/quote", {
            left: "\xab\u201e",
            right: "\xbb\u201c"
        }), e.addRule({
            name: "common/html/e-mail",
            queue: "end",
            handler: function(e, t, a) {
                return a.isHTML ? e : e.replace(/(^|[\s;(])([\w\-.]{2,})@([\w\-.]{2,})\.([a-z]{2,6})([)\s.,!?]|$)/gi, '$1<a href="mailto:$2@$3.$4">$2@$3.$4</a>$5')
            },
            disabled: !0,
            htmlAttrs: !1
        }), e.addRule({
            name: "common/html/escape",
            index: "+100",
            queue: "end",
            handler: function(e) {
                var t = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#x2F;"
                };
                return e.replace(/[&<>"'/]/g, function(e) {
                    return t[e]
                })
            },
            disabled: !0
        }), e.addRule({
            name: "common/html/nbr",
            index: "+10",
            queue: "end",
            handler: function(e) {
                return e.replace(/([^\n>])\n(?=[^\n])/g, "$1<br/>\n")
            },
            disabled: !0,
            htmlAttrs: !1
        }), e.addRule({
            name: "common/html/p",
            index: "+5",
            queue: "end",
            handler: function(t) {
                var a = new RegExp("<(" + e.blockElements.join("|") + ")[>\\s]"),
                    n = t.split("\n\n");
                return n.forEach(function(e, t, n) {
                    e.trim() && (a.test(e) || (n[t] = e.replace(/^(\s*)/, "$1<p>").replace(/(\s*)$/, "</p>$1")))
                }), n.join("\n\n")
            },
            disabled: !0,
            htmlAttrs: !1
        }), e.addRule({
            name: "common/html/processingAttrs",
            queue: "hide-safe-tags-own",
            handler: function(t, a, n) {
                var r = this,
                    u = new RegExp("(^|\\s)(" + a.attrs.join("|") + ")=(\"[^\"]*?\"|'[^']*?')", "gi"),
                    s = e.deepCopy(n.prefs);
                return s.ruleFilter = function(e) {
                    return !1 !== e.htmlAttrs
                }, t.replace(/(<[-\w]+\s)([^>]+?)(?=>)/g, function(e, t, a) {
                    return t + a.replace(u, function(e, t, a, n) {
                        var u = n[0],
                            i = n[n.length - 1],
                            l = n.slice(1, -1);
                        return t + a + "=" + u + r.execute(l, s) + i
                    })
                })
            },
            settings: {
                attrs: ["title", "placeholder"]
            },
            disabled: !0,
            htmlAttrs: !1
        }), e.addRule({
            name: "common/html/quot",
            queue: "hide-safe-tags",
            handler: function(e) {
                return e.replace(/&quot;/g, '"')
            }
        }), e.addRule({
            name: "common/html/stripTags",
            index: "+99",
            queue: "end",
            handler: function(e) {
                return e.replace(/<[^>]+>/g, "")
            },
            disabled: !0
        }), e.addRule({
            name: "common/html/url",
            queue: "end",
            handler: function(t, a, n) {
                return n.isHTML ? t : t.replace(e._reUrl, function(e, t, a) {
                    a = a.replace(/([^/]+\/?)(\?|#)$/, "$1").replace(/^([^/]+)\/$/, "$1"), "http" === t ? a = a.replace(/^([^/]+)(:80)([^\d]|\/|$)/, "$1$3") : "https" === t && (a = a.replace(/^([^/]+)(:443)([^\d]|\/|$)/, "$1$3"));
                    var n = a,
                        r = t + "://" + a,
                        u = '<a href="' + r + '">';
                    return "http" === t || "https" === t ? (n = n.replace(/^www\./, ""), u + ("http" === t ? n : t + "://" + n) + "</a>") : u + r + "</a>"
                })
            },
            disabled: !0,
            htmlAttrs: !1
        }), e.addRule({
            name: "common/nbsp/afterNumber",
            handler: function(e, t, a) {
                var n = "(^|\\D)(\\d{1,5}) ([" + a.getData("char") + "]{2,})";
                return e.replace(new RegExp(n, "gi"), "$1$2\xa0$3")
            },
            disabled: !0
        }), e.addRule({
            name: "common/nbsp/afterParagraph",
            handler: function(e) {
                return e.replace(/\u00A7[ \u00A0\u2009]?(\d|I|V|X)/g, "\xa7\u202f$1")
            }
        }), e.addRule({
            name: "common/nbsp/afterShortWord",
            handler: function(t, a, n) {
                var r = a.lengthShortWord,
                    u = "(^|[" + (" \xa0(" + e._privateLabel + e.getData("common/quote")) + "])([" + n.getData("char") + "]{1," + r + "}) ",
                    s = new RegExp(u, "gim");
                return t.replace(s, "$1$2\xa0").replace(s, "$1$2\xa0")
            },
            settings: {
                lengthShortWord: 2
            }
        }), e.addRule({
            name: "common/nbsp/beforeShortLastNumber",
            handler: function(e, t, a) {
                var n = a.getData("char"),
                    r = n.toUpperCase(),
                    u = new RegExp("([" + n + r + "]) (?=\\d{1," + t.lengthLastNumber + "}[-+\u2212%'\"" + a.getData("quote").right + "]?([.!?\u2026]( [" + r + "]|$)|$))", "gm");
                return e.replace(u, "$1\xa0")
            },
            live: !1,
            settings: {
                lengthLastNumber: 2
            }
        }), e.addRule({
            name: "common/nbsp/beforeShortLastWord",
            handler: function(e, t, a) {
                var n = a.getData("char"),
                    r = n.toUpperCase(),
                    u = new RegExp("([" + n + "\\d]) ([" + n + r + "]{1," + t.lengthLastWord + "}[.!?\u2026])( [" + r + "]|$)", "g");
                return e.replace(u, "$1\xa0$2$3")
            },
            settings: {
                lengthLastWord: 3
            }
        }), e.addRule({
            name: "common/nbsp/dpi",
            handler: function(e) {
                return e.replace(/(\d) ?(lpi|dpi)(?!\w)/, "$1\xa0$2")
            }
        }),
        function() {
            function t(e, t, a, n) {
                return t + a.replace(/([^\u00A0])\u00A0([^\u00A0])/g, "$1 $2") + n
            }
            e.addRule({
                name: "common/nbsp/nowrap",
                queue: "end",
                handler: function(e) {
                    return e.replace(/(<nowrap>)(.*?)(<\/nowrap>)/g, t).replace(/(<nobr>)(.*?)(<\/nobr>)/g, t)
                }
            })
        }(), e.addRule({
            name: "common/nbsp/replaceNbsp",
            queue: "utf",
            live: !1,
            handler: e._replaceNbsp,
            disabled: !0
        }), e.addRule({
            name: "common/other/delBOM",
            queue: "start",
            index: -1,
            handler: function(e) {
                return 65279 === e.charCodeAt(0) ? e.slice(1) : e
            }
        }), e.addRule({
            name: "common/other/repeatWord",
            handler: function(t, a, n) {
                var r = "[;:,.?! \n" + e.getData("common/quote") + "]",
                    u = new RegExp("(" + r + "|^)([" + n.getData("char") + "]{" + a.min + ",}) \\2(" + r + "|$)", "gi");
                return t.replace(u, "$1$2$3")
            },
            settings: {
                min: 2
            },
            disabled: !0
        }), e.addRule({
            name: "common/number/fraction",
            handler: function(e) {
                return e.replace(/(^|\D)1\/2(\D|$)/g, "$1\xbd$2").replace(/(^|\D)1\/4(\D|$)/g, "$1\xbc$2").replace(/(^|\D)3\/4(\D|$)/g, "$1\xbe$2")
            }
        }), e.addRule({
            name: "common/number/mathSigns",
            handler: function(t) {
                return e._replace(t, [
                    [/!=/g, "\u2260"],
                    [/<=/g, "\u2264"],
                    [/(^|[^=])>=/g, "$1\u2265"],
                    [/<=>/g, "\u21d4"],
                    [/<</g, "\u226a"],
                    [/>>/g, "\u226b"],
                    [/~=/g, "\u2245"],
                    [/(^|[^+])\+-/g, "$1\xb1"]
                ])
            }
        }), e.addRule({
            name: "common/number/times",
            handler: function(e) {
                return e.replace(/(\d)[ \u00A0]?[x\u0445][ \u00A0]?(\d)/g, "$1\xd7$2")
            }
        }), e.addRule({
            name: "common/punctuation/apostrophe",
            handler: function(e, t, a) {
                var n = "([" + a.getData("char") + "])",
                    r = new RegExp(n + "'" + n, "gi");
                return e.replace(r, "$1\u2019$2")
            }
        }), e.addRule({
            name: "common/punctuation/delDoublePunctuation",
            handler: function(e) {
                return e.replace(/(^|[^,]),,(?!,)/g, "$1,").replace(/(^|[^:])::(?!:)/g, "$1:").replace(/(^|[^!?.])\.\.(?!\.)/g, "$1.").replace(/(^|[^;]);;(?!;)/g, "$1;").replace(/(^|[^?])\?\?(?!\?)/g, "$1?")
            }
        }), e.addRule({
            name: "common/punctuation/quote",
            handler: function(e, t, a) {
                var n = t[a.prefs.locale[0]];
                if (!n) return e;
                var r = n.left[0],
                    u = n.right[0],
                    s = n.left[1] || r;
                return e = this._setQuotes(e, n), n.removeDuplicateQuotes && r === s && (e = e.replace(new RegExp(r + r, "g"), r).replace(new RegExp(u + u, "g"), u)), e
            },
            settings: function() {
                var t = {};
                return e.getLocales().forEach(function(a) {
                    t[a] = e.deepCopy(e.getData(a + "/quote"))
                }), t
            }
        }), e._mix(e.prototype, {
            _setQuotes: function(t, a) {
                var n = e._privateLabel,
                    r = a.left[0],
                    u = a.right[0],
                    s = a.left[1] || r,
                    i = "[" + e.getData("common/quote") + "]",
                    l = new RegExp('(^|[ \\t\\n\xa0[(])("{1,3})(?=[^ \\t\\n\xa0])', "gim"),
                    o = new RegExp('([^ \\t\\n\xa0])("{1,3})(?=[!?.:;#*,\u2026)\\s' + n + "]|$)", "gim"),
                    c = new RegExp(i, "g"),
                    d = new RegExp("(" + n + ')"(?=[^ \\t\\n' + n + "]|$)", "gm"),
                    p = 0;
                return a.spacing && (t = this._removeQuoteSpacing(t, a)), t = t.replace(c, function() {
                    return p++, '"'
                }), t = t.replace(l, function(t, a, n) {
                    return a + e._repeat(r, n.length)
                }).replace(o, function(t, a, n) {
                    return a + e._repeat(u, n.length)
                }).replace(d, "$1" + u), r !== s && p % 2 == 0 && (t = this._setInnerQuotes(t, a)), a.spacing && (t = this._setQuoteSpacing(t, a)), t
            },
            _removeQuoteSpacing: function(e, t) {
                for (var a = 0, n = t.left.length; a < n; a++) {
                    var r = t.left[a],
                        u = t.right[a];
                    e = e.replace(new RegExp(r + "([ \u202f\xa0])", "g"), r).replace(new RegExp("([ \u202f\xa0])" + u, "g"), u)
                }
                return e
            },
            _setQuoteSpacing: function(e, t) {
                for (var a = 0, n = t.left.length; a < n; a++) {
                    var r = t.left[a],
                        u = t.right[a];
                    e = e.replace(new RegExp(r + "([^\u202f])", "g"), r + "\u202f$1").replace(new RegExp("([^\u202f])" + u, "g"), "$1\u202f" + u)
                }
                return e
            },
            _setInnerQuotes: function(e, t) {
                for (var a = [], n = [], r = 0; r < t.left.length; r++) a.push(t.left[r]), n.push(t.right[r]);
                for (var u = t.left[0], s = t.right[0], i = new Array(e.length), l = a.length - 1, o = -1, c = 0, d = e.length; c < d; c++) {
                    var p = e[c];
                    p === u ? (++o > l && (o = l), i.push(a[o])) : p === s ? o <= -1 ? (o = 0, i.push(a[o])) : (i.push(n[o]), --o < -1 && (o = -1)) : ('"' === p && (o = -1), i.push(p))
                }
                return i.join("")
            }
        }), e.addRule({
            name: "common/punctuation/quoteLink",
            queue: "show-safe-tags-html",
            index: "+5",
            handler: function(t, a, n) {
                var r = this.getSetting("common/punctuation/quote", n.prefs.locale[0]);
                if (!r) return t;
                var u = e.HtmlEntities,
                    s = u.getByUtf(r.left[0]),
                    i = u.getByUtf(r.right[0]),
                    l = u.getByUtf(r.left[1]),
                    o = u.getByUtf(r.right[1]);
                l = l ? "|" + l : "", o = o ? "|" + o : "";
                var c = new RegExp("(<[aA]\\s[^>]*?>)(" + s + l + ")([^]*?)(" + i + o + ")(</[aA]>)", "g");
                return t.replace(c, "$2$1$3$5$4")
            }
        }), e.addRule({
            name: "common/symbols/arrow",
            handler: function(t) {
                return e._replace(t, [
                    [/(^|[^-])->(?!>)/g, "$1\u2192"],
                    [/(^|[^<])<-(?!-)/g, "$1\u2190"]
                ])
            }
        }), e.addRule({
            name: "common/symbols/cf",
            handler: function(e) {
                var t = new RegExp('(^|[^%])(\\d+)( |\xa0)?(C|F)([\\W \\.,:!\\?"\\]\\)]|$)', "g");
                return e.replace(t, "$1$2\u2009\xb0$4$5")
            }
        }), e.addRule({
            name: "common/symbols/copy",
            handler: function(t) {
                return e._replace(t, [
                    [/\(r\)/gi, "\xae"],
                    [/(copyright )?\((c|\u0441)\)/gi, "\xa9"],
                    [/\(tm\)/gi, "\u2122"]
                ])
            }
        }), e.addRule({
            name: "common/space/afterPunctuation",
            handler: function(t) {
                var a = e._privateLabel,
                    n = new RegExp("(!|;|\\?)([^).!;?\\s[\\])" + a + e.getData("common/quote") + "])", "g"),
                    r = new RegExp('(\\D)(,|:)([^)",:.?\\s\\/\\\\' + a + "])", "g");
                return t.replace(n, "$1 $2").replace(r, "$1$2 $3")
            }
        }), e.addRule({
            name: "common/space/beforeBracket",
            handler: function(e, t, a) {
                var n = new RegExp("([" + a.getData("char") + ".!?,;\u2026)])\\(", "gi");
                return e.replace(n, "$1 (")
            }
        }), e.addRule({
            name: "common/space/bracket",
            handler: function(e) {
                return e.replace(/(\() +/g, "(").replace(/ +\)/g, ")")
            }
        }), e.addRule({
            name: "common/space/delBeforePercent",
            handler: function(e) {
                return e.replace(/(\d)( |\u00A0)(%|\u2030|\u2031)/g, "$1$3")
            }
        }), e.addRule({
            name: "common/space/delBeforePunctuation",
            handler: function(e) {
                return e.replace(/ ([!;,?.:])(?!\))/g, "$1")
            }
        }), e.addRule({
            name: "common/space/delLeadingBlanks",
            handler: function(e) {
                return e.replace(/\n[ \t]+/g, "\n")
            },
            disabled: !0
        }), e.addRule({
            name: "common/space/delRepeatN",
            index: "-1",
            handler: function(e) {
                return e.replace(/\n{3,}/g, "\n\n")
            }
        }), e.addRule({
            name: "common/space/delRepeatSpace",
            index: "-1",
            handler: function(e) {
                return e.replace(/([^\n \t])[ \t]{2,}(?![\n \t])/g, "$1 ")
            }
        }), e.addRule({
            name: "common/space/delTrailingBlanks",
            index: "-3",
            handler: function(e) {
                return e.replace(/[ \t]+\n/g, "\n")
            }
        }), e.addRule({
            name: "common/space/replaceTab",
            index: "-5",
            handler: function(e) {
                return e.replace(/\t/g, "    ")
            }
        }), e.addRule({
            name: "common/space/squareBracket",
            handler: function(e) {
                return e.replace(/(\[) +/g, "[").replace(/ +\]/g, "]")
            }
        }), e.addRule({
            name: "common/space/trimLeft",
            index: "-4",
            handler: String.prototype.trimLeft ? function(e) {
                return e.trimLeft()
            } : function(e) {
                return e.replace(/^[\s\uFEFF\xA0]+/g, "")
            }
        }), e.addRule({
            name: "common/space/trimRight",
            index: "-3",
            live: !1,
            handler: String.prototype.trimRight ? function(e) {
                return e.trimRight()
            } : function(e) {
                return e.replace(/[\s\uFEFF\xA0]+$/g, "")
            }
        }), e.addRule({
            name: "ru/date/fromISO",
            handler: function(e) {
                var t = "(-|\\.|\\/)",
                    a = new RegExp("(^|\\D)(\\d{4})" + t + "(\\d{2})" + t + "(\\d{2})(\\D|$)", "gi"),
                    n = new RegExp("(^|\\D)(\\d{2})(-|\\/)(\\d{2})(-|\\/)(\\d{4})(\\D|$)", "gi");
                return e.replace(a, "$1$6.$4.$2$7").replace(n, "$1$4.$2.$6$7")
            }
        }), e.addRule({
            name: "ru/date/weekday",
            handler: function(t) {
                var a = e.getData("ru/monthGenCase"),
                    n = e.getData("ru/weekday"),
                    r = new RegExp("(\\d)( |\xa0)(" + a + "),( |\xa0)(" + n + ")", "gi");
                return t.replace(r, function() {
                    var e = arguments;
                    return e[1] + e[2] + e[3].toLowerCase() + "," + e[4] + e[5].toLowerCase()
                })
            }
        }), e.addRule({
            name: "ru/dash/centuries",
            handler: function(t, a) {
                var n = "(" + e.getData("common/dash") + ")",
                    r = new RegExp("(X|I|V)[ |\xa0]?" + n + "[ |\xa0]?(X|I|V)", "g");
                return t.replace(r, "$1" + a.dash + "$3")
            },
            settings: {
                dash: "\u2013"
            }
        }), e.addRule({
            name: "ru/dash/daysMonth",
            handler: function(t, a) {
                var n = new RegExp("(^|\\s)([123]?\\d)(" + e.getData("common/dash") + ")([123]?\\d)[ \xa0](" + e.getData("ru/monthGenCase") + ")", "g");
                return t.replace(n, "$1$2" + a.dash + "$4\xa0$5")
            },
            settings: {
                dash: "\u2013"
            }
        }), e.addRule({
            name: "ru/dash/de",
            handler: function(t) {
                var a = new RegExp("([a-\u044f\u0451]+) \u0434\u0435" + e.getData("ru/dashAfterDe"), "g");
                return t.replace(a, "$1-\u0434\u0435")
            },
            disabled: !0
        }), e.addRule({
            name: "ru/dash/decade",
            handler: function(t, a) {
                var n = new RegExp("(^|\\s)(\\d{3}|\\d)0(" + e.getData("common/dash") + ")(\\d{3}|\\d)0(-\u0435[ \xa0])(?=\u0433\\.?[ \xa0]?\u0433|\u0433\u043e\u0434)", "g");
                return t.replace(n, "$1$20" + a.dash + "$40$5")
            },
            settings: {
                dash: "\u2013"
            }
        }), e.addRule({
            name: "ru/dash/directSpeech",
            handler: function(t) {
                var a = e.getData("common/dash"),
                    n = new RegExp('(["\xbb\u2018\u201c,])[ |\xa0]?(' + a + ")[ |\xa0]", "g"),
                    r = new RegExp("(^|" + e._privateLabel + ")(" + a + ")( |\xa0)", "gm"),
                    u = new RegExp("([.\u2026?!])[ \xa0](" + a + ")[ \xa0]", "g");
                return t.replace(n, "$1\xa0\u2014 ").replace(r, "$1\u2014\xa0").replace(u, "$1 \u2014\xa0")
            }
        }), e.addRule({
            name: "ru/dash/izpod",
            handler: function(t) {
                var a = new RegExp(e.getData("ru/dashBefore") + "(\u0418|\u0438)\u0437 \u043f\u043e\u0434" + e.getData("ru/dashAfter"), "g");
                return t.replace(a, "$1$2\u0437-\u043f\u043e\u0434")
            }
        }), e.addRule({
            name: "ru/dash/izza",
            handler: function(t) {
                var a = new RegExp(e.getData("ru/dashBefore") + "(\u0418|\u0438)\u0437 \u0437\u0430" + e.getData("ru/dashAfter"), "g");
                return t.replace(a, "$1$2\u0437-\u0437\u0430")
            }
        }), e.addRule({
            name: "ru/dash/ka",
            handler: function(t) {
                var a = new RegExp("([a-\u044f\u0451]+) \u043a\u0430(\u0441\u044c)?" + e.getData("ru/dashAfter"), "g");
                return t.replace(a, "$1-\u043a\u0430$2")
            }
        }), e.addRule({
            name: "ru/dash/koe",
            handler: function(t) {
                var a = new RegExp(e.getData("ru/dashBefore") + "([\u041a\u043a]\u043e[\u0435\u0439])\\s([\u0430-\u044f\u0451]{3,})" + e.getData("ru/dashAfter"), "g");
                return t.replace(a, "$1$2-$3")
            }
        }), e.addRule({
            name: "ru/dash/main",
            index: "-5",
            handler: function(t) {
                var a = e.getData("common/dash"),
                    n = new RegExp("([ \xa0])(" + a + ")([ \xa0\\n])", "g");
                return t.replace(n, "\xa0\u2014$3")
            }
        }), e.addRule({
            name: "ru/dash/month",
            handler: function(t, a) {
                var n = "(" + e.getData("ru/month") + ")",
                    r = "(" + e.getData("ru/monthPreCase") + ")",
                    u = e.getData("common/dash"),
                    s = new RegExp(n + " ?(" + u + ") ?" + n, "gi"),
                    i = new RegExp(r + " ?(" + u + ") ?" + r, "gi"),
                    l = "$1" + a.dash + "$3";
                return t.replace(s, l).replace(i, l)
            },
            settings: {
                dash: "\u2013"
            }
        }), e.addRule({
            name: "ru/dash/surname",
            handler: function(e) {
                var t = new RegExp("([\u0410-\u042f\u0401][\u0430-\u044f\u0451]+)\\s-([\u0430-\u044f\u0451]{1,3})(?![^\u0430-\u044f\u0451]|$)", "g");
                return e.replace(t, "$1\xa0\u2014$2")
            }
        }), e.addRule({
            name: "ru/dash/taki",
            handler: function(t) {
                var a = new RegExp("(\u0432\u0435\u0440\u043d\u043e|\u0434\u043e\u0432\u043e\u043b\u044c\u043d\u043e|\u043e\u043f\u044f\u0442\u044c|\u043f\u0440\u044f\u043c\u043e|\u0442\u0430\u043a|\u0432\u0441[\u0435\u0451]|\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e|\u043d\u0435\u0443\u0436\u0435\u043b\u0438)\\s(\u0442\u0430\u043a\u0438)" + e.getData("ru/dashAfter"), "g");
                return t.replace(a, "$1-$2")
            }
        }), e.addRule({
            name: "ru/dash/time",
            handler: function(t, a) {
                var n = new RegExp(e.getData("ru/dashBefore") + "(\\d?\\d:[0-5]\\d)" + e.getData("common/dash") + "(\\d?\\d:[0-5]\\d)" + e.getData("ru/dashAfter"), "g");
                return t.replace(n, "$1$2" + a.dash + "$3")
            },
            settings: {
                dash: "\u2013"
            }
        }), e.addRule({
            name: "ru/dash/to",
            handler: function(t) {
                var a = ["\u043e\u0442\u043a\u0443\u0434\u0430", "\u043a\u0443\u0434\u0430", "\u0433\u0434\u0435", "\u043a\u043e\u0433\u0434\u0430", "\u0437\u0430\u0447\u0435\u043c", "\u043f\u043e\u0447\u0435\u043c\u0443", "\u043a\u0430\u043a", "\u043a\u0430\u043a\u043e[\u0435\u0439\u043c]", "\u043a\u0430\u043a\u0430\u044f", "\u043a\u0430\u043a\u0438[\u0435\u043c\u0445]", "\u043a\u0430\u043a\u0438\u043c\u0438", "\u043a\u0430\u043a\u0443\u044e", "\u0447\u0442\u043e", "\u0447\u0435\u0433\u043e", "\u0447\u0435[\u0439\u043c]", "\u0447\u044c\u0438\u043c?", "\u043a\u0442\u043e", "\u043a\u043e\u0433\u043e", "\u043a\u043e\u043c\u0443", "\u043a\u0435\u043c"],
                    n = new RegExp("(" + a.join("|") + ")( | -|- )(\u0442\u043e|\u043b\u0438\u0431\u043e|\u043d\u0438\u0431\u0443\u0434\u044c)" + e.getData("ru/dashAfter"), "gi");
                return t.replace(n, "$1-$3")
            }
        }), e.addRule({
            name: "ru/dash/weekday",
            handler: function(t, a) {
                var n = "(" + e.getData("ru/weekday") + ")",
                    r = new RegExp(n + " ?(" + e.getData("common/dash") + ") ?" + n, "gi");
                return t.replace(r, "$1" + a.dash + "$3")
            },
            settings: {
                dash: "\u2013"
            }
        }), e.addRule({
            name: "ru/dash/years",
            handler: function(t, a) {
                var n = e.getData("common/dash"),
                    r = new RegExp("(\\D|^)(\\d{4})[ \xa0]?(" + n + ")[ \xa0]?(\\d{4})(?=[ \xa0]?\u0433)", "g");
                return t.replace(r, function(e, t, n, r, u) {
                    return parseInt(n, 10) < parseInt(u, 10) ? t + n + a.dash + u : e
                })
            },
            settings: {
                dash: "\u2013"
            }
        }), e.addRule({
            name: "ru/money/currency",
            handler: function(e) {
                var t = new RegExp("(^|[\\D]{2})([$\u20ac\xa5\u04b0\xa3\u20a4\u20bd]) ?([\\d.,]+([ \xa0\u2009\u202f]\\d{3})*)([ \xa0\u2009\u202f]?(\u0442\u044b\u0441\\.|\u043c\u043b\u043d|\u043c\u043b\u0440\u0434|\u0442\u0440\u043b\u043d))?", "gm"),
                    a = new RegExp("(^|[\\D])([\\d.,]+) ?([$\u20ac\xa5\u04b0\xa3\u20a4\u20bd])", "gm");
                return e.replace(t, function(e, t, a, n, r, u, s) {
                    return t + n + (s ? "\xa0" + s : "") + "\xa0" + a
                }).replace(a, "$1$2\xa0$3")
            }
        }), e.addRule({
            name: "ru/money/ruble",
            handler: function(e) {
                var t = "(\\d+)( |\xa0)?(\u0440|\u0440\u0443\u0431)\\.",
                    a = new RegExp("^" + t + "$", "g"),
                    n = new RegExp(t + "(?=[!?,:;])", "g"),
                    r = new RegExp(t + "(?=\\s+[A-\u042f\u0401])", "g");
                return e.replace(a, "$1\xa0\u20bd").replace(n, "$1\xa0\u20bd").replace(r, "$1\xa0\u20bd.")
            },
            disabled: !0
        }), e.addRule({
            name: "ru/nbsp/abbr",
            handler: function(t) {
                function a(e, t, a, n) {
                    return ["\u0440\u0444", "\u0440\u0443", "\u0440\u0443\u0441", "\u043e\u0440\u0433", "\u0443\u043a\u0440", "\u0431\u0433", "\u0441\u0440\u0431"].indexOf(n) > -1 ? e : t + a + ".\xa0" + n + "."
                }
                var n = new RegExp("(^|\\s|" + e._privateLabel + ")([\u0430-\u044f\u0451]{1,3})\\. ?([\u0430-\u044f\u0451]{1,3})\\.", "g");
                return t.replace(n, a).replace(n, a)
            }
        }), e.addRule({
            name: "ru/nbsp/addr",
            handler: function(e) {
                return e.replace(/(\s|^)(\u0434\u043e\u043c|\u0434\.|\u043a\u0432\.|\u043f\u043e\u0434\.|\u043f-\u0434) *(\d+)/gi, "$1$2\xa0$3").replace(/(\s|^)(\u043c\u043a\u0440-\u043d|\u043c\u043a-\u043d|\u043c\u043a\u0440\.|\u043c\u043a\u0440\u043d)\s/gi, "$1$2\xa0").replace(/(\s|^)(\u044d\u0442\.) *(-?\d+)/gi, "$1$2\xa0$3").replace(/(\s|^)(\d+) +\u044d\u0442\u0430\u0436([^\u0430-\u044f\u0451]|$)/gi, "$1$2\xa0\u044d\u0442\u0430\u0436$3").replace(/(\s|^)\u043b\u0438\u0442\u0435\u0440\s([\u0410-\u042f]|$)/gi, "$1\u043b\u0438\u0442\u0435\u0440\xa0$2").replace(/(\s|^)(\u043e\u0431\u043b|\u043a\u0440|\u0441\u0442|\u043f\u043e\u0441|\u0441|\u0434|\u0443\u043b|\u043f\u0435\u0440|\u043f\u0440|\u043f\u0440-\u0442|\u043f\u0440\u043e\u0441\u043f|\u043f\u043b|\u0431\u0443\u043b|\u0431-\u0440|\u043d\u0430\u0431|\u0448|\u0442\u0443\u043f|\u043e\u0444|\u043a\u043e\u043c\u043d?|\u0443\u0447|\u0432\u043b|\u0432\u043b\u0430\u0434|\u0441\u0442\u0440|\u043a\u043e\u0440)\. *([\u0430-\u044f\u0451a-z\d]+)/gi, "$1$2.\xa0$3").replace(/(\D[ \u00A0]|^)\u0433\. ?([\u0410-\u042f\u0401])/gm, "$1\u0433.\xa0$2")
            }
        }), e.addRule({
            name: "ru/nbsp/afterNumberSign",
            handler: function(e) {
                return e.replace(/\u2116[ \u00A0\u2009]?(\d|\u043f\/\u043f)/g, "\u2116\u202f$1")
            }
        }), e.addRule({
            name: "ru/nbsp/beforeParticle",
            index: "+5",
            handler: function(e) {
                var t = new RegExp('([\u0410-\u042f\u0401\u0430-\u044f\u0451]) (\u043b\u0438|\u043b\u044c|\u0436\u0435|\u0436|\u0431\u044b|\u0431)(?=[,;:?!"\u2018\u201c\xbb])', "g"),
                    a = new RegExp("([\u0410-\u042f\u0401\u0430-\u044f\u0451])[ \xa0](\u043b\u0438|\u043b\u044c|\u0436\u0435|\u0436|\u0431\u044b|\u0431)[ \xa0]", "g");
                return e.replace(t, "$1\xa0$2").replace(a, "$1\xa0$2 ")
            }
        }), e.addRule({
            name: "ru/nbsp/centuries",
            handler: function(t) {
                var a = e.getData("common/dash"),
                    n = '(?=[,;:?!"\u2018\u201c\xbb]|$)',
                    r = new RegExp("(^|\\s)([VIX]+)[ \xa0]?\u0432\\.?" + n, "gm"),
                    u = new RegExp("(^|\\s)([VIX]+)(" + a + ")([VIX]+)[ \xa0]?\u0432\\.?([ \xa0]?\u0432\\.?)?" + n, "gm");
                return t.replace(r, "$1$2\xa0\u0432.").replace(u, "$1$2$3$4\xa0\u0432\u0432.")
            }
        }), e.addRule({
            name: "ru/nbsp/dayMonth",
            handler: function(t) {
                var a = new RegExp("(\\d{1,2}) (" + e.getData("ru/shortMonth") + ")", "gi");
                return t.replace(a, "$1\xa0$2")
            }
        }), e.addRule({
            name: "ru/nbsp/groupNumbers",
            handler: function(e) {
                return e.replace(/(^ ?|\D )(\d{1,3}([ \u00A0\u202F\u2009]\d{3})+)(?! ?[\d-])/gm, function(e, t, a) {
                    return t + a.replace(/\s/g, "\u202f")
                })
            }
        }), e.addRule({
            name: "ru/nbsp/initials",
            handler: function(t) {
                var a = e.getData("ru/quote"),
                    n = new RegExp("(^|[\xa0\u202f " + a.left + e._privateLabel + '"])([\u0410-\u042f\u0401])\\.[\xa0\u202f ]?([\u0410-\u042f\u0401])\\.[\xa0\u202f ]?([\u0410-\u042f\u0401][\u0430-\u044f\u0451]+)(?=[\\s.,;:?!"' + a.right + "]|$)", "gm");
                return t.replace(n, "$1$2.\xa0$3.\xa0$4")
            }
        }), e.addRule({
            name: "ru/nbsp/m",
            index: "+5",
            handler: function(t) {
                var a = e._privateLabel,
                    n = new RegExp("(^|[\\s,." + a + "])(\\d+)[ \xa0]?(\u043c\u043c?|\u0441\u043c|\u043a\u043c|\u0434\u043c|\u0433\u043c|mm?|km|cm|dm)([23\xb2\xb3])?([\\s.!?,;" + a + "]|$)", "gm");
                return t.replace(n, function(e, t, a, n, r, u) {
                    return t + a + "\xa0" + n + {
                        2: "\xb2",
                        "\xb2": "\xb2",
                        3: "\xb3",
                        "\xb3": "\xb3",
                        "": ""
                    }[r || ""] + ("\xa0" === u ? " " : u)
                })
            }
        }), e.addRule({
            name: "ru/nbsp/mln",
            handler: function(e) {
                return e.replace(/(\d) ?(\u0442\u044b\u0441|\u043c\u043b\u043d|\u043c\u043b\u0440\u0434|\u0442\u0440\u043b\u043d)(\.|\s|$)/gi, "$1\xa0$2$3")
            }
        }), e.addRule({
            name: "ru/nbsp/ooo",
            handler: function(e) {
                return e.replace(/(^|[^a-\u044f\u0451A-\u042f\u0401])(\u041e\u041e\u041e|\u041e\u0410\u041e|\u0417\u0410\u041e|\u041d\u0418\u0418|\u041f\u0411\u041e\u042e\u041b) /g, "$1$2\xa0")
            }
        }), e.addRule({
            name: "ru/nbsp/page",
            handler: function(t) {
                var a = new RegExp("(^|[)\\s" + e._privateLabel + "])(\u0441\u0442\u0440|\u0433\u043b|\u0440\u0438\u0441|\u0438\u043b\u043b?|\u0441\u0442|\u043f|c)\\. *(\\d+)([\\s.,?!;:]|$)", "gim");
                return t.replace(a, "$1$2.\xa0$3$4")
            }
        }), e.addRule({
            name: "ru/nbsp/ps",
            handler: function(t) {
                var a = new RegExp("(^|\\s|" + e._privateLabel + ")[p\u0437]\\.[ \xa0]?([p\u0437]\\.[ \xa0]?)?[s\u044b]\\.:? ", "gim");
                return t.replace(a, function(e, t, a) {
                    return t + (a ? "P.\xa0P.\xa0S. " : "P.\xa0S. ")
                })
            }
        }), e.addRule({
            name: "ru/nbsp/rubleKopek",
            handler: function(e) {
                return e.replace(/(\d) ?(?=(\u0440\u0443\u0431|\u043a\u043e\u043f)\.)/g, "$1\xa0")
            }
        }), e.addRule({
            name: "ru/nbsp/see",
            handler: function(t) {
                var a = new RegExp("(^|\\s|" + e._privateLabel + "|\\()(\u0441\u043c|\u0438\u043c)\\.[ \xa0]?([\u0430-\u044f\u04510-9a-z]+)([\\s.,?!]|$)", "gi");
                return t.replace(a, function(e, t, a, n, r) {
                    return ("\xa0" === t ? " " : t) + a + ".\xa0" + n + r
                })
            }
        }), e.addRule({
            name: "ru/nbsp/year",
            handler: function(e) {
                return e.replace(/(^|\D)(\d{4}) ?\u0433([ ,;.\n]|$)/g, "$1$2\xa0\u0433$3")
            }
        }), e.addRule({
            name: "ru/nbsp/years",
            index: "+5",
            handler: function(t) {
                var a = e.getData("common/dash"),
                    n = new RegExp("(^|\\D)(\\d{4})(" + a + ')(\\d{4})[ \xa0]?\u0433\\.?([ \xa0]?\u0433\\.)?(?=[,;:?!"\u2018\u201c\xbb\\s]|$)', "gm");
                return t.replace(n, "$1$2$3$4\xa0\u0433\u0433.")
            }
        }), e.addRule({
            name: "ru/number/comma",
            handler: function(e) {
                return e.replace(/(^|\s)(\d+)\.(\d+[\u00A0\u2009\u202F ]*?[%\u2030\xb0\xd7x])/gim, "$1$2,$3")
            }
        }), e.addRule({
            name: "ru/number/ordinals",
            handler: function(e, t, a) {
                var n = new RegExp("(\\d[%\u2030]?)-(\u044b\u0439|\u043e\u0439|\u0430\u044f|\u043e\u0435|\u044b\u0435|\u044b\u043c|\u043e\u043c|\u044b\u0445|\u043e\u0433\u043e|\u043e\u043c\u0443|\u044b\u043c\u0438)(?![" + a.getData("char") + "])", "g");
                return e.replace(n, function(e, t, a) {
                    return t + "-" + {
                        "\u043e\u0439": "\u0439",
                        "\u044b\u0439": "\u0439",
                        "\u0430\u044f": "\u044f",
                        "\u043e\u0435": "\u0435",
                        "\u044b\u0435": "\u0435",
                        "\u044b\u043c": "\u043c",
                        "\u043e\u043c": "\u043c",
                        "\u044b\u0445": "\u0445",
                        "\u043e\u0433\u043e": "\u0433\u043e",
                        "\u043e\u043c\u0443": "\u043c\u0443",
                        "\u044b\u043c\u0438": "\u043c\u0438"
                    }[a]
                })
            }
        }),
        function() {
            var t = ["typograf-oa-lbracket", "typograf-oa-n-lbracket", "typograf-oa-sp-lbracket"],
                a = "ru/optalign/bracket";
            e.addRule({
                name: a,
                handler: function(e) {
                    return e.replace(/( |\u00A0)\(/g, '<span class="typograf-oa-sp-lbracket">$1</span><span class="typograf-oa-lbracket">(</span>').replace(/^\(/gm, '<span class="typograf-oa-n-lbracket">(</span>')
                },
                disabled: !0,
                htmlAttrs: !1
            }).addInnerRule({
                name: a,
                queue: "start",
                handler: function(a) {
                    return e._removeOptAlignTags(a, t)
                }
            }).addInnerRule({
                name: a,
                queue: "end",
                handler: function(a) {
                    return e._removeOptAlignTagsFromTitle(a, t)
                }
            })
        }(),
        function() {
            var t = ["typograf-oa-comma", "typograf-oa-comma-sp"],
                a = "ru/optalign/comma";
            e.addRule({
                name: a,
                handler: function(e, t, a) {
                    var n = new RegExp("([" + a.getData("char") + "\\d\u0301]+), ", "gi");
                    return e.replace(n, '$1<span class="typograf-oa-comma">,</span><span class="typograf-oa-comma-sp"> </span>')
                },
                disabled: !0,
                htmlAttrs: !1
            }).addInnerRule({
                name: a,
                queue: "start",
                handler: function(a) {
                    return e._removeOptAlignTags(a, t)
                }
            }).addInnerRule({
                name: a,
                queue: "end",
                handler: function(a) {
                    return e._removeOptAlignTagsFromTitle(a, t)
                }
            })
        }(), e._removeOptAlignTags = function(e, t) {
            var a = new RegExp('<span class="(' + t.join("|") + ')">([^]*?)</span>', "g");
            return e.replace(a, "$2")
        }, e._removeOptAlignTagsFromTitle = function(t, a) {
            return t.replace(/<title>[^]*?<\/title>/i, function(t) {
                return e._removeOptAlignTags(t, a)
            })
        },
        function() {
            var t = ["typograf-oa-lquote", "typograf-oa-n-lquote", "typograf-oa-sp-lquote"],
                a = "ru/optalign/quote";
            e.addRule({
                name: a,
                handler: function(t) {
                    var a = this.getSetting("common/punctuation/quote", "ru"),
                        n = "([" + a.left[0] + (a.left[1] || "") + "])",
                        r = new RegExp("(^|\n\n|" + e._privateLabel + ")(" + n + ")", "g"),
                        u = new RegExp("([^\n" + e._privateLabel + "])([ \xa0\n])(" + n + ")", "gi");
                    return t.replace(r, '$1<span class="typograf-oa-n-lquote">$2</span>').replace(u, '$1<span class="typograf-oa-sp-lquote">$2</span><span class="typograf-oa-lquote">$3</span>')
                },
                disabled: !0,
                htmlAttrs: !1
            }).addInnerRule({
                name: a,
                queue: "start",
                handler: function(a) {
                    return e._removeOptAlignTags(a, t)
                }
            }).addInnerRule({
                name: a,
                queue: "end",
                handler: function(a) {
                    return e._removeOptAlignTagsFromTitle(a, t)
                }
            })
        }(), e.addRule({
            name: "ru/other/accent",
            handler: function(e) {
                return e.replace(/([\u0430-\u044f\u0451])([\u0410\u0415\u0401\u0418\u041e\u0423\u042b\u042d\u042e\u042f])([^\u0410-\u042f\u0401\w]|$)/g, function(e, t, a, n) {
                    return t + a.toLowerCase() + "\u0301" + n
                })
            },
            disabled: !0
        }),
        function() {
            function t(e) {
                var t, r, c = "",
                    d = e[0];
                if (e.length < 8) return n(e);
                if (e.length > 10)
                    if ("+" === d) {
                        if (e[1] !== s) return e;
                        t = !0, e = e.substr(2)
                    } else "8" === d && (r = !0, e = e.substr(1));
                for (var p = l; p >= o; p--) {
                    var h = +e.substr(0, p);
                    if (i.indexOf(h) > -1) {
                        c = e.substr(0, p), e = e.substr(p);
                        break
                    }
                }
                return c || (c = e.substr(0, u), e = e.substr(u)), (t ? "+" + s + "\xa0" : "") + (r ? "8\xa0" : "") + a(c) + "\xa0" + n(e)
            }

            function a(e) {
                var t = +e,
                    a = e.length,
                    n = [e],
                    r = !1;
                if (a > 3) switch (a) {
                    case 4:
                        n = [e.substr(0, 2), e.substr(2, 2)];
                        break;
                    case 5:
                        n = [e.substr(0, 3), e.substr(3, 3)];
                        break;
                    case 6:
                        n = [e.substr(0, 2), e.substr(2, 2), e.substr(4, 2)]
                } else r = t > 900 && t <= 999 || 495 === t || 499 === t;
                return n = n.join("-"), r ? n : "(" + n + ")"
            }

            function n(e) {
                var t = "";
                return e.length % 2 && (t = e[0], t += e.length <= 5 ? "-" : "", e = e.substr(1, e.length - 1)), t + e.split(/(?=(?:\d\d)+$)/).join("-")
            }

            function r(e) {
                return e.replace(/[^\d+]/g, "")
            }
            var u = 5,
                s = "7",
                i = [],
                l = 8,
                o = 2;
            [4162, 416332, 8512, 851111, 4722, 4725, 391379, 8442, 4732, 4152, 4154451, 4154459, 4154455, 41544513, 8142, 8332, 8612, 8622, 3525, 812, 8342, 8152, 3812, 4862, 3422, 342633, 8112, 9142, 8452, 3432, 3434, 3435, 4812, 3919, 8432, 8439, 3822, 4872, 3412, 3511, 3512, 3022, 4112, 4852, 4855, 3852, 3854, 8182, 818, 90, 3472, 4741, 4764, 4832, 4922, 8172, 8202, 8722, 4932, 493, 3952, 3951, 3953, 411533, 4842, 3842, 3843, 8212, 4942, 3912, 4712, 4742, 8362, 495, 499, 4966, 4964, 4967, 498, 8312, 8313, 3832, 383612, 3532, 8412, 4232, 423370, 423630, 8632, 8642, 8482, 4242, 8672, 8652, 4752, 4822, 482502, 4826300, 3452, 8422, 4212, 3466, 3462, 8712, 8352, "901-934", "936-939", "950-953", 958, "960-969", "977-989", "991-997", 999].forEach(function(e) {
                if ("string" == typeof e)
                    for (var t = e.split("-"), a = +t[0]; a <= +t[1]; a++) i.push(a);
                else i.push(e)
            }), e.addRule({
                name: "ru/other/phone-number",
                live: !1,
                handler: function(a) {
                    var n = e._privateLabel,
                        u = new RegExp("(^|,| |" + n + ")(\\+7[\\d\\(\\) \xa0-]{10,18})(?=,|;|" + n + "|$)", "gm");
                    return a.replace(u, function(e, a, n) {
                        var u = r(n);
                        return 12 === u.length ? a + t(u) : e
                    }).replace(/(^|[^\u0430-\u044f\u0451])(\u0442\.|\u0442\u0435\u043b\.|\u0444\.|\u043c\u043e\u0431\.|\u0444\u0430\u043a\u0441|\u0441\u043e\u0442\u043e\u0432\u044b\u0439|\u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0439|\u0442\u0435\u043b\u0435\u0444\u043e\u043d)(:?\s*?)([+\d(][\d \u00A0\-()]{3,}\d)/gi, function(e, a, n, u, s) {
                        var i = r(s);
                        return i.length >= 5 ? a + n + u + t(i) : e
                    })
                }
            })
        }(), e.addRule({
            name: "ru/space/afterHellip",
            handler: function(e) {
                return e.replace(/([\u0430-\u044f\u0451])(\.\.\.|\u2026)([\u0410-\u042f\u0401])/g, "$1$2 $3").replace(/([?!]\.\.)([\u0430-\u044f\u0451a-z])/gi, "$1 $2")
            }
        }), e.addRule({
            name: "ru/space/year",
            handler: function(e, t, a) {
                var n = new RegExp("(^| |\xa0)(\\d{3,4})(\u0433\u043e\u0434([\u0430\u0443\u0435]|\u043e\u043c)?)([^" + a.getData("char") + "]|$)", "g");
                return e.replace(n, "$1$2 $3$5")
            }
        }), e.addRule({
            name: "ru/symbols/NN",
            handler: function(e) {
                return e.replace(/\u2116\u2116/g, "\u2116")
            }
        }), e.addRule({
            name: "ru/punctuation/ano",
            handler: function(e) {
                var t = new RegExp("([^!?,:;\\-\u2012\u2013\u2014])([ \xa0\\n])(\u0430|\u043d\u043e)(?= |\xa0|\\n)", "g");
                return e.replace(t, "$1,$2$3")
            }
        }), e.addRule({
            name: "ru/punctuation/exclamation",
            live: !1,
            handler: function(e) {
                return e.replace(/(^|[^!])!{2}($|[^!])/gm, "$1!$2").replace(/(^|[^!])!{4}($|[^!])/gm, "$1!!!$2")
            }
        }), e.addRule({
            name: "ru/punctuation/exclamationQuestion",
            index: "+5",
            handler: function(e) {
                var t = new RegExp("(^|[^!])!\\?([^?]|$)", "g");
                return e.replace(t, "$1?!$2")
            }
        }), e.addRule({
            name: "ru/punctuation/hellip",
            handler: function(e) {
                return e.replace(/(^|[^.])\.{3,4}([^.]|$)/g, "$1\u2026$2").replace(/(^|[^.])(\.\.\.|\u2026),/g, "$1\u2026").replace(/(!|\?)(\.\.\.|\u2026)([^.]|$)/g, "$1..$3")
            }
        }),
        function() {
            var t = {
                    A: "\u0410",
                    a: "\u0430",
                    B: "\u0412",
                    E: "\u0415",
                    e: "\u0435",
                    K: "\u041a",
                    M: "\u041c",
                    H: "\u041d",
                    O: "\u041e",
                    o: "\u043e",
                    P: "\u0420",
                    p: "\u0440",
                    C: "\u0421",
                    c: "\u0441",
                    T: "\u0422",
                    y: "\u0443",
                    X: "\u0425",
                    x: "\u0445"
                },
                a = Object.keys(t).join("");
            e.addRule({
                name: "ru/typo/switchingKeyboardLayout",
                handler: function(e) {
                    var n = new RegExp("([" + a + "]{1,3})(?=[\u0410-\u042f\u0401\u0430-\u044f\u0451]+?)", "g");
                    return e.replace(n, function(e, a) {
                        for (var n = "", r = 0; r < a.length; r++) n += t[a[r]];
                        return n
                    })
                }
            })
        }(), e
});


/*!
 * DLE Plugin
 */

/*
 Emoticons Plugin
 Video Plugin
*/

$.FroalaEditor.DefineIconTemplate('dleicons', '<i class="icon-[NAME]" aria-hidden="true"></i>');

(function(c) {
    "function" === typeof define && define.amd ? define(["jquery"], c) : "object" === typeof module && module.exports ? module.exports = function(a, f) {
        void 0 === f && (f = "undefined" !== typeof window ? require("jquery") : require("jquery")(a));
        c(f);
        return f
    } : c(jQuery)
})(function(c) {
    c.extend(c.FE.POPUP_TEMPLATES, {
        emoticons: "[_EMOTICONS_]"
    });
    c.FE.PLUGINS.emoticons = function(a) {
        function f() {
            c.get(a.opts.dle_root + "engine/editor/emotions.php", function(a) {
                c(".dle-emoticon").html(a)
            });
            return '<div class="dle-emoticon"></div>'
        }
        return {
            insert: function(f) {
                a.popups.hide("emoticons");
                a.selection.restore();
                a.html.insert(" " + f + " " + c.FE.MARKERS, !0)
            },
            showEmoticonsPopup: function() {
                var c = a.$tb.find('.fr-command[data-cmd="emoticons"]'),
                    m = a.popups.get("emoticons");
                m || (m = {
                    emoticons: f()
                }, m = a.popups.create("emoticons", m));
                if (!m.hasClass("fr-active")) {
                    a.popups.refresh("emoticons");
                    a.popups.setContainer("emoticons", a.$tb);
                    var m = c.offset().left + c.outerWidth() / 2,
                        w = c.offset().top + (a.opts.toolbarBottom ? 10 : c.outerHeight() - 10);
                    a.popups.show("emoticons", m, w, c.outerHeight())
                }
            },
            hideEmoticonsPopup: function() {
                a.popups.hide("emoticons")
            }
        }
    };
    c.FE.DefineIcon("emoticons", {
        NAME: "dle dle-i-dleicon icon-smile",
        template: 'dleicons'
    });
    c.FE.RegisterCommand("emoticons", {
        title: "Emoticons",
        undo: !1,
        focus: !0,
        popup: !0,
        refreshOnCallback: !0,
        callback: function() {
            this.selection.save();
            this.emoticons.showEmoticonsPopup();
            active_editor = this
        },
        plugin: "emoticons"
    })
});
(function(c) {
    "function" === typeof define && define.amd ? define(["jquery"], c) : "object" === typeof module && module.exports ? module.exports = function(a, f) {
        void 0 === f && (f = "undefined" !== typeof window ? require("jquery") : require("jquery")(a));
        c(f);
        return f
    } : c(jQuery)
})(function(c) {
    c.extend(c.FE.POPUP_TEMPLATES, {
        "video.insert": "[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_]",
        "video.edit": "[_BUTTONS_]",
        "video.size": "[_BUTTONS_][_SIZE_LAYER_]"
    });
    c.extend(c.FE.DEFAULTS, {
        videoInsertButtons: ["videoBack", "|", "videoByURL", "videoEmbed"],
        videoEditButtons: ["videoDisplay", "videoAlign", "videoSize", "videoRemove"],
        videoResize: !0,
        videoSizeButtons: ["videoBack", "|"],
        videoSplitHTML: !1,
        videoTextNear: !0,
        videoDefaultAlign: "center",
        videoDefaultDisplay: "block",
        videoMove: !0
    });
    c.FE.VIDEO_PROVIDERS = [{
        test_regex: /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(?:channels\/[A-z]+\/|groups\/[A-z]+\/videos\/)?(.+)/g,
        url_text: "//player.vimeo.com/video/$1",
        html: '<iframe width="560" height="315" src="{url}" frameborder="0" allowfullscreen></iframe>'
    }, {
        test_regex: /^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?(.+)/g,
        url_text: "//www.dailymotion.com/embed/video/$1",
        html: '<iframe width="560" height="315" src="{url}" frameborder="0" allowfullscreen></iframe>'
    }, {
        test_regex: /^.+(rutube.ru)\/[^_&]+/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g,
        url_text: "//rutube.ru/play/embed/$1",
        html: '<iframe width="560" height="315" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>'
    }, {
        test_regex: /^.+(.swf)/,
        url_regex: "",
        url_text: "",
        html: "[flash=425,264]{url}[/flash]"
    }];
    c.FE.VIDEO_EMBED_REGEX = /^\W*((<iframe.*><\/iframe>)|(<embed.*>)|(<object.*>))\W*$/i;
    c.FE.PLUGINS.video = function(a) {
        function f() {
            var b = a.popups.get("video.insert");
            b.find(".fr-video-by-url-layer input").val("").trigger("change");
            b.find(".fr-video-embed-layer textarea").val("").trigger("change")
        }

        function l() {
            a.popups.get("video.edit") || E();
            a.popups.setContainer("video.edit", c(a.opts.scrollableContainer));
            a.popups.refresh("video.edit");
            var b = d.find("iframe, embed, video"),
                k = b.offset().left + b.outerWidth() / 2,
                p = b.offset().top + b.outerHeight();
            a.popups.show("video.edit", k, p, b.outerHeight())
        }

        function m(b) {
            if (b) return a.popups.onRefresh("video.insert", f), a.popups.onHide("video.insert", w), !0;
            b = "";
            1 < a.opts.videoInsertButtons.length && (b = '<div class="fr-buttons">' + a.button.buildList(a.opts.videoInsertButtons) + "</div>");
            var c = "";
            0 <= a.opts.videoInsertButtons.indexOf("videoByURL") && (c = '<div class="fr-video-by-url-layer fr-layer fr-active" id="fr-video-by-url-layer-' + a.id + '"><div class="fr-input-line"><input type="text" name="url" placeholder="' + a.language.translate("Link to the video") + '" tabIndex="1"></div><div class="fr-input-line"><input type="text" name="descr" placeholder="' + a.language.translate("Description") + '" tabIndex="2"></div><div class="fr-input-line"><input type="text" name="poster" placeholder="' + a.language.translate("Link to the poster") + '" tabIndex="3"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertByURL" tabIndex="4">' + a.language.translate("Insert") + '</button><button type="button" class="fr-command fr-submit" data-cmd="videoInsertToPlaylist" tabIndex="5">' + a.language.translate("Add to Playlist") + "</button></div></div>");
            var d = "";
            0 <= a.opts.videoInsertButtons.indexOf("videoEmbed") && (d = '<div class="fr-video-embed-layer fr-layer" id="fr-video-embed-layer-' + a.id + '"><div class="fr-input-line"><textarea type="text" placeholder="' + a.language.translate("Embedded Code") + '" tabIndex="1" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertEmbed" tabIndex="2">' + a.language.translate("Insert") + "</button></div></div>");
            return a.popups.create("video.insert", {
                buttons: b,
                by_url_layer: c,
                embed_layer: d
            })
        }

        function w() {}

        function u(b) {
            a.events.focus(!0);
            a.selection.restore();
            n = "";
            0 == b.indexOf("[video=") || 0 == b.indexOf("[media=") || 0 == b.indexOf("[flash=") ? a.html.insert(b, !1) : a.html.insert('<span contenteditable="false" draggable="true" class="fr-jiv fr-video fr-dv' + a.opts.videoDefaultDisplay[0] + ("center" != a.opts.videoDefaultAlign ? " fr-fv" + a.opts.videoDefaultAlign[0] : "") + '">' + b + "</span>&nbsp;", !1, a.opts.videoSplitHTML);
            a.popups.hide("video.insert");
            b = a.$el.find(".fr-jiv");
            b.removeClass("fr-jiv");
            b.toggleClass("fr-draggable", a.opts.videoMove);
            a.events.trigger("video.inserted", [b])
        }

        function F(b) {
            if (!a.core.sameInstance(g)) return !0;
            b.preventDefault();
            b.stopPropagation();
            var k = b.pageX || (b.originalEvent.touches ? b.originalEvent.touches[0].pageX : null);
            b = b.pageY || (b.originalEvent.touches ? b.originalEvent.touches[0].pageY : null);
            if (!k || !b) return !1;
            a.undo.canDo() || a.undo.saveStep();
            h = c(this);
            h.data("start-x", k);
            h.data("start-y", b);
            q.show();
            a.popups.hideAll();
            x()
        }

        function G(b) {
            if (!a.core.sameInstance(g)) return !0;
            if (h) {
                b.preventDefault();
                var c = b.pageX || (b.originalEvent.touches ? b.originalEvent.touches[0].pageX : null);
                b = b.pageY || (b.originalEvent.touches ? b.originalEvent.touches[0].pageY : null);
                if (!c || !b) return !1;
                var p = h.data("start-x"),
                    e = h.data("start-y");
                h.data("start-x", c);
                h.data("start-y", b);
                c -= p;
                b -= e;
                var e = d.find("iframe, embed, video"),
                    p = e.width(),
                    f = e.height();
                if (h.hasClass("fr-hnw") || h.hasClass("fr-hsw")) c = 0 - c;
                if (h.hasClass("fr-hnw") || h.hasClass("fr-hne")) b = 0 - b;
                e.css("width", p + c);
                e.css("height", f + b);
                e.removeAttr("width");
                e.removeAttr("height");
                t()
            }
        }

        function z(b) {
            if (!a.core.sameInstance(g)) return !0;
            h && d && (b && b.stopPropagation(), h = null, q.hide(), t(), l(), a.undo.saveStep())
        }

        function v(a) {
            return '<div class="fr-handler fr-h' + a + '"></div>'
        }

        function H() {
            var b;
            a.shared.$video_resizer ? (g = a.shared.$video_resizer, q = a.shared.$vid_overlay, a.events.on("destroy", function() {
                g.removeClass("fr-active").appendTo(c("body"))
            }, !0)) : (a.shared.$video_resizer = c('<div class="fr-video-resizer"></div>'), g = a.shared.$video_resizer, a.events.$on(g, "mousedown", function(a) {
                a.stopPropagation()
            }, !0), a.opts.videoResize && (g.append(v("nw") + v("ne") + v("sw") + v("se")), a.shared.$vid_overlay = c('<div class="fr-video-overlay"></div>'), q = a.shared.$vid_overlay, b = g.get(0).ownerDocument, c(b).find("body").append(q)));
            a.events.on("shared.destroy", function() {
                g.html("").removeData().remove();
                a.opts.videoResize && q.remove()
            }, !0);
            a.helpers.isMobile() || a.events.$on(c(a.o_win), "resize.video", function() {
                r(!0)
            });
            a.opts.videoResize && (b = g.get(0).ownerDocument, a.events.$on(g, a._mousedown, ".fr-handler", F), a.events.$on(c(b), a._mousemove, G), a.events.$on(c(b.defaultView || b.parentWindow), a._mouseup, z), a.events.$on(q, "mouseleave", z))
        }

        function t() {
            g || H();
            (a.$wp || c(a.opts.scrollableContainer)).append(g);
            g.data("instance", a);
            var b = d.find("iframe, embed, video");
            g.css("top", (a.opts.iframe ? b.offset().top - 1 : b.offset().top - a.$wp.offset().top - 1) + a.$wp.scrollTop()).css("left", (a.opts.iframe ? b.offset().left - 1 : b.offset().left - a.$wp.offset().left - 1) + a.$wp.scrollLeft()).css("width", b.outerWidth()).css("height", b.height()).addClass("fr-active")
        }

        function I(b) {
            if (b && "touchend" == b.type && y) return !0;
            b.preventDefault();
            b.stopPropagation();
            if (a.edit.isDisabled()) return !1;
            for (b = 0; b < c.FE.INSTANCES.length; b++) c.FE.INSTANCES[b] != a && c.FE.INSTANCES[b].events.trigger("video.hideResizer");
            a.toolbar.disable();
            a.helpers.isMobile() && (a.events.disableBlur(), a.$el.blur(), a.events.enableBlur());
            d = c(this);
            c(this).addClass("fr-active");
            a.opts.iframe && a.size.syncIframe();
            t();
            l();
            a.selection.clear();
            a.button.bulkRefresh();
            a.events.trigger("image.hideResizer")
        }

        function r(b) {
            d && (a.shared.vid_exit_flag || !0 === b) && (g.removeClass("fr-active"), a.toolbar.enable(), d.removeClass("fr-active"), d = null, x())
        }

        function J() {
            a.shared.vid_exit_flag = !0
        }

        function x() {
            a.shared.vid_exit_flag = !1
        }

        function K() {
            a.events.on("mousedown window.mousedown", J);
            a.events.on("window.touchmove", x);
            a.events.on("mouseup window.mouseup", r);
            a.events.on("commands.mousedown", function(a) {
                0 < a.parents(".fr-toolbar").length && r()
            });
            a.events.on("blur video.hideResizer commands.undo commands.redo element.dropped", function() {
                r(!0)
            })
        }

        function E() {
            var b = "";
            1 < a.opts.videoEditButtons.length && (b = b + '<div class="fr-buttons">' + a.button.buildList(a.opts.videoEditButtons), b += "</div>");
            b = a.popups.create("video.edit", {
                buttons: b
            });
            a.events.$on(a.$wp, "scroll.video-edit", function() {
                d && a.popups.isVisible("video.edit") && l()
            });
            return b
        }

        function L() {
            if (d) {
                var b = a.popups.get("video.size"),
                    c = d.find("iframe, embed, video");
                b.find('input[name="width"]').val(c.get(0).style.width || c.attr("width")).trigger("change");
                b.find('input[name="height"]').val(c.get(0).style.height || c.attr("height")).trigger("change")
            }
        }

        function A() {
            a.popups.get("video.size") || B();
            a.popups.refresh("video.size");
            a.popups.setContainer("video.size", c(a.opts.scrollableContainer));
            var b = d.find("iframe, embed, video"),
                k = b.offset().left + b.width() / 2,
                p = b.offset().top + b.height();
            a.popups.show("video.size", k, p, b.height())
        }

        function B(b) {
            if (b) return a.popups.onRefresh("video.size", L), !0;
            b = "";
            b = '<div class="fr-buttons">' + a.button.buildList(a.opts.videoSizeButtons) + "</div>";
            var c = "",
                c = '<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-' + a.id + '"><div class="fr-video-group"><div class="fr-input-line"><input type="text" name="width" placeholder="' + a.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input type="text" name="height" placeholder="' + a.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoSetSize" tabIndex="2">' + a.language.translate("Update") + "</button></div></div>";
            b = a.popups.create("video.size", {
                buttons: b,
                size_layer: c
            });
            a.events.$on(a.$wp, "scroll", function() {
                d && a.popups.isVisible("video.size") && A()
            });
            return b
        }

        function C() {
            if (d && !1 !== a.events.trigger("video.beforeRemove", [d])) {
                var b = d;
                a.popups.hideAll();
                r(!0);
                a.selection.setBefore(b.get(0)) || a.selection.setAfter(b.get(0));
                b.remove();
                a.selection.restore();
                a.html.fillEmptyBlocks();
                a.events.trigger("video.removed", [b])
            }
        }

        function M(b) {
            if (!b.hasClass("fr-dvi") && !b.hasClass("fr-dvb")) {
                var c = b.css("float");
                b.css("float", "none");
                "block" == b.css("display") ? (b.css("float", c), 0 === parseInt(b.css("margin-left"), 10) && 0 <= (b.attr("style") || "").indexOf("margin-right: auto") ? b.addClass("fr-fvl") : 0 === parseInt(b.css("margin-right"), 10) && 0 <= (b.attr("style") || "").indexOf("margin-left: auto") && b.addClass("fr-fvr"), b.addClass("fr-dvb")) : (b.css("float", c), "left" == b.css("float") ? b.addClass("fr-fvl") : "right" == b.css("float") && b.addClass("fr-fvr"), b.addClass("fr-dvi"));
                b.css("margin", "");
                b.css("float", "");
                b.css("display", "");
                b.css("z-index", "");
                b.css("position", "");
                b.css("overflow", "");
                b.css("vertical-align", "")
            }
            a.opts.videoTextNear || b.removeClass("fr-dvi").addClass("fr-dvb")
        }

        function D() {
            a.$el.find("video").filter(function() {
                return 0 === c(this).parents("span.fr-video").length
            }).wrap('<span class="fr-video" contenteditable="false"></span>');
            a.$el.find("embed, iframe").filter(function() {
                a.browser.safari && this.getAttribute("src") && this.setAttribute("src", this.src);
                if (0 < c(this).parents("span.fr-video").length) return !1;
                for (var b = c(this).attr("src"), k = 0; k < c.FE.VIDEO_PROVIDERS.length; k++)
                    if (c.FE.VIDEO_PROVIDERS[k].test_regex.test(b)) return !0;
                return !1
            }).map(function() {
                return 0 === c(this).parents("object").length ? this : c(this).parents("object").get(0)
            }).wrap('<span class="fr-video" contenteditable="false"></span>');
            for (var b = a.$el.find("span.fr-video"), k = 0; k < b.length; k++) M(c(b[k]));
            b.toggleClass("fr-draggable", a.opts.videoMove)
        }
        var q, h, g, d, n = "",
            y;
        a.shared.vid_exit_flag = !1;
        return {
            _init: function() {
                K();
                a.helpers.isMobile() && (a.events.$on(a.$el, "touchstart", "span.fr-video", function() {
                    y = !1
                }), a.events.$on(a.$el, "touchmove", function() {
                    y = !0
                }));
                a.events.on("html.set", D);
                D();
                a.events.$on(a.$el, "mousedown", "span.fr-video", function(a) {
                    a.stopPropagation()
                });
                a.events.$on(a.$el, "click touchend", "span.fr-video", I);
                a.events.on("keydown", function(b) {
                    var k = b.which;
                    if (d && (k == c.FE.KEYCODE.BACKSPACE || k == c.FE.KEYCODE.DELETE)) return b.preventDefault(), C(), !1;
                    if (d && k == c.FE.KEYCODE.ESC) return r(!0), b.preventDefault(), !1;
                    if (d && !a.keys.ctrlKey(b)) return b.preventDefault(), !1
                }, !0);
                a.events.on("keydown", function() {
                    a.$el.find("span.fr-video:empty").remove()
                });
                m(!0);
                B(!0)
            },
            showInsertPopup: function() {
                var b = a.$tb.find('.fr-command[data-cmd="insertVideo"]'),
                    c = a.popups.get("video.insert");
                c || (c = m());
                if (!c.hasClass("fr-active")) {
                    a.popups.refresh("video.insert");
                    a.popups.setContainer("video.insert", a.$tb);
                    var c = b.offset().left + b.outerWidth() / 2,
                        d = b.offset().top + (a.opts.toolbarBottom ? 10 : b.outerHeight() - 10);
                    a.popups.show("video.insert", c, d, b.outerHeight())
                }
            },
            showLayer: function(b) {
                var c = a.popups.get("video.insert"),
                    f, e;
                d || a.opts.toolbarInline || (e = a.$tb.find('.fr-command[data-cmd="insertVideo"]'), f = e.offset().left + e.outerWidth() / 2, e = e.offset().top + (a.opts.toolbarBottom ? 10 : e.outerHeight() - 10));
                a.opts.toolbarInline && (e = c.offset().top - a.helpers.getPX(c.css("margin-top")), c.hasClass("fr-above") && (e += c.outerHeight()));
                c.find(".fr-layer").removeClass("fr-active");
                c.find(".fr-" + b + "-layer").addClass("fr-active");
                a.popups.show("video.insert", f, e, 0)
            },
            refreshByURLButton: function(b) {
                a.popups.get("video.insert").find(".fr-video-by-url-layer").hasClass("fr-active") && b.addClass("fr-active")
            },
            refreshEmbedButton: function(b) {
                a.popups.get("video.insert").find(".fr-video-embed-layer").hasClass("fr-active") && b.addClass("fr-active")
            },
            insertByURL: function(b) {
                if ("undefined" == typeof b) {
                    var d = a.popups.get("video.insert");
                    b = d.find('.fr-video-by-url-layer input[type="text"][name="url"]').val() || "";
                    var f = d.find('.fr-video-by-url-layer input[type="text"][name="descr"]').val() || "",
                        d = d.find('.fr-video-by-url-layer input[type="text"][name="poster"]').val() || ""
                }
                for (var e = null, g = 0; g < c.FE.VIDEO_PROVIDERS.length; g++) {
                    var h = c.FE.VIDEO_PROVIDERS[g];
                    if (h.test_regex.test(b)) {
                        e = b.replace(h.url_regex, h.url_text);
                        e = h.html.replace(/\{url\}/, e);
                        break
                    }
                }
                if (e) u(e);
                else {
                    e = b;
                    if ("" != d || "" != f) e += "|" + d;
                    "" != f && (e += "|" + f);
                    "" != e ? n += e : "" != n && (n = n.substring(0, n.length - 1));
                    "" != n && u("[video=" + n + "]")
                }
            },
            insertToPlaylist: function() {
                var b = a.popups.get("video.insert"),
                    c = b.find('.fr-video-by-url-layer input[type="text"][name="url"]').val() || "",
                    d = b.find('.fr-video-by-url-layer input[type="text"][name="descr"]').val() || "",
                    e = b.find('.fr-video-by-url-layer input[type="text"][name="poster"]').val() || "";
                if ("" != e || "" != d) c += "|" + e;
                "" != d && (c += "|" + d);
                "" != c && (n += c + ",");
                b.find('.fr-video-by-url-layer input[type="text"][name="url"]').val("");
                b.find('.fr-video-by-url-layer input[type="text"][name="descr"]').val("");
                b.find('.fr-video-by-url-layer input[type="text"][name="poster"]').val("");
                a.selection.save();
            },
            insertEmbed: function(b) {
                "undefined" == typeof b && (b = a.popups.get("video.insert").find(".fr-video-embed-layer textarea").val() || "");
                0 !== b.length && c.FE.VIDEO_EMBED_REGEX.test(b) ? u(b) : a.events.trigger("video.codeError", [b])
            },
            insert: u,
            align: function(a) {
                d.removeClass("fr-fvr fr-fvl");
                "left" == a ? d.addClass("fr-fvl") : "right" == a && d.addClass("fr-fvr");
                t();
                l()
            },
            refreshAlign: function(b) {
                if (!d) return !1;
                d.hasClass("fr-fvl") ? b.find("> *:first").replaceWith(a.icon.create("align-left")) : d.hasClass("fr-fvr") ? b.find("> *:first").replaceWith(a.icon.create("align-right")) : b.find("> *:first").replaceWith(a.icon.create("align-justify"))
            },
            refreshAlignOnShow: function(a, c) {
                var b = "justify";
                d.hasClass("fr-fvl") ? b = "left" : d.hasClass("fr-fvr") && (b = "right");
                c.find('.fr-command[data-param1="' + b + '"]').addClass("fr-active")
            },
            display: function(a) {
                d.removeClass("fr-dvi fr-dvb");
                "inline" == a ? d.addClass("fr-dvi") : "block" == a && d.addClass("fr-dvb");
                t();
                l()
            },
            refreshDisplayOnShow: function(a, c) {
                var b = "block";
                d.hasClass("fr-dvi") && (b = "inline");
                c.find('.fr-command[data-param1="' + b + '"]').addClass("fr-active")
            },
            remove: C,
            showSizePopup: A,
            back: function() {
                d ? d.trigger("click") : (a.events.disableBlur(), a.selection.restore(), a.events.enableBlur(), a.popups.hide("video.insert"), a.toolbar.showInline())
            },
            setSize: function(b, c) {
                if (d) {
                    var f = a.popups.get("video.size"),
                        e = d.find("iframe, embed, video");
                    e.css("width", b || f.find('input[name="width"]').val());
                    e.css("height", c || f.find('input[name="height"]').val());
                    e.get(0).style.width && e.removeAttr("width");
                    e.get(0).style.height && e.removeAttr("height");
                    f.find("input").blur();
                    setTimeout(function() {
                        d.trigger("click")
                    }, a.helpers.isAndroid() ? 50 : 0)
                }
            },
            get: function() {
                return d
            }
        }
    };
    c.FE.RegisterCommand("insertVideo", {
        title: "Insert Video",
        undo: !1,
        focus: !0,
        refreshAfterCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("video.insert") ? (this.$el.find(".fr-marker") && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("video.insert")) : this.video.showInsertPopup()
        },
        plugin: "video"
    });
    c.FE.DefineIcon("insertVideo", {
        NAME: "dle dle-i-dleicon icon-film",
        template: 'dleicons'
    });
    c.FE.DefineIcon("videoByURL", {
        NAME: "link"
    });
    c.FE.RegisterCommand("videoByURL", {
        title: "By URL",
        undo: !1,
        focus: !1,
        callback: function() {
            this.video.showLayer("video-by-url")
        },
        refresh: function(a) {
            this.video.refreshByURLButton(a)
        }
    });
    c.FE.DefineIcon("videoEmbed", {
        NAME: "code"
    });
    c.FE.RegisterCommand("videoEmbed", {
        title: "Embedded Code",
        undo: !1,
        focus: !1,
        callback: function() {
            this.video.showLayer("video-embed")
        },
        refresh: function(a) {
            this.video.refreshEmbedButton(a)
        }
    });
    c.FE.RegisterCommand("videoInsertByURL", {
        undo: !0,
        focus: !0,
        callback: function() {
            this.video.insertByURL()
        }
    });
    c.FE.RegisterCommand("videoInsertToPlaylist", {
        undo: !0,
        focus: !0,
        callback: function() {
            this.video.insertToPlaylist()
        }
    });
    c.FE.RegisterCommand("videoInsertEmbed", {
        undo: !0,
        focus: !0,
        callback: function() {
            this.video.insertEmbed()
        }
    });
    c.FE.DefineIcon("videoDisplay", {
        NAME: "star"
    });
    c.FE.RegisterCommand("videoDisplay", {
        title: "Display",
        type: "dropdown",
        options: {
            inline: "Inline",
            block: "Break Text"
        },
        callback: function(a, c) {
            this.video.display(c)
        },
        refresh: function(a) {
            this.opts.videoTextNear || a.addClass("fr-hidden")
        },
        refreshOnShow: function(a, c) {
            this.video.refreshDisplayOnShow(a, c)
        }
    });
    c.FE.DefineIcon("videoAlign", {
        NAME: "align-center"
    });
    c.FE.RegisterCommand("videoAlign", {
        type: "dropdown",
        title: "Align",
        options: {
            left: "Align Left",
            justify: "None",
            right: "Align Right"
        },
        html: function() {
            var a = '<ul class="fr-dropdown-list">',
                f = c.FE.COMMANDS.videoAlign.options,
                l;
            for (l in f) f.hasOwnProperty(l) && (a += '<li><a class="fr-command fr-title" data-cmd="videoAlign" data-param1="' + l + '" title="' + this.language.translate(f[l]) + '">' + this.icon.create("align-" + l) + "</a></li>");
            return a + "</ul>"
        },
        callback: function(a, c) {
            this.video.align(c)
        },
        refresh: function(a) {
            this.video.refreshAlign(a)
        },
        refreshOnShow: function(a, c) {
            this.video.refreshAlignOnShow(a, c)
        }
    });
    c.FE.DefineIcon("videoRemove", {
        NAME: "trash"
    });
    c.FE.RegisterCommand("videoRemove", {
        title: "Remove",
        callback: function() {
            this.video.remove()
        }
    });
    c.FE.DefineIcon("videoSize", {
        NAME: "arrows-alt"
    });
    c.FE.RegisterCommand("videoSize", {
        undo: !1,
        focus: !1,
        title: "Change Size",
        callback: function() {
            this.video.showSizePopup()
        }
    });
    c.FE.DefineIcon("videoBack", {
        NAME: "arrow-left"
    });
    c.FE.RegisterCommand("videoBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function() {
            this.video.back()
        },
        refresh: function(a) {
            this.video.get() || this.opts.toolbarInline ? (a.removeClass("fr-hidden"), a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"), a.next(".fr-separator").addClass("fr-hidden"))
        }
    });
    c.FE.RegisterCommand("videoSetSize", {
        undo: !0,
        focus: !1,
        callback: function() {
            this.video.setSize()
        }
    })
});

var active_editor = false;


function emojiFromHex(hex) {
    try {

        if (navigator.platform.indexOf('Win') > -1 && hex.match(/^1F1(E[6-9A-F]|F[0-9A-F])/)) {
            return null;
        }

        var decimals = [];
        var hexPoints = hex.split('-');
        for (var p = 0; p < hexPoints.length; p++) {
            decimals.push(parseInt(hexPoints[p], 16));
        }

        return String.fromCodePoint.apply(null, decimals);
    } catch (err) {
        return null;
    }
}

function get_emoji() {
    try {
        return JSON.parse(localStorage.getItem('last_emoji'));
    } catch (e) {
        return null;
    }
}

function set_emoji(value) {
    try {
        localStorage.setItem('last_emoji', JSON.stringify(value));
    } catch (e) {}
}

function in_array(needle, haystack) {
    for (var i = 0, len = haystack.length; i < len; i++) {
        if (haystack[i] == needle) return true;
    }
    return false;
}

function display_editor_last_emoji() {

    var emoji_array = get_emoji();
    var emoji = '';
    var div = '';

    if ($.isArray(emoji_array) && emoji_array.length) {

        div += '<div class="emoji_category"><b>' + text_last_emoji + '</b></div>';

        div += '<div class="emoji_list">';

        for (var i = 0, len = emoji_array.length; i < len; i++) {

            emoji = emojiFromHex(emoji_array[i]);

            if (emoji) {
                div += '<div class="emoji_symbol" data-emoji="' + emoji_array[i] + '"><a onclick="insert_editor_emoji(\'' + emoji + '\', \'' + emoji_array[i] + '\'); return false;">' + emoji + '</a></div>';
            }

        }

        div += '</div>';

        divs = document.getElementsByClassName('last_emoji');

        $('.last_emoji').html(div);


    }

}


function insert_editor_emoji(emoji, code) {
    active_editor.emoticons.insert('<span class="native-emoji">' + emoji + '</span>');

    var emoji_array = get_emoji();

    if ($.isArray(emoji_array)) {

        if (!in_array(code, emoji_array)) {

            if (emoji_array.length > 15) {
                emoji_array.pop();
            }

            emoji_array.unshift(code);

        }

    } else {

        emoji_array = [];
        emoji_array.push(code);

    }

    set_emoji(emoji_array);

    display_editor_last_emoji();

}


(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function(root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    $.FroalaEditor.DEFAULTS.key = 'PD1B4F4E3oA9A7C7A3C2A3I3J2B7C7bPELe1OMFCIe2LUH1IT==';

    $.FE.HTML5Map = {
        'STRONG': 'B',
        'EM': 'I',
        'STRIKE': 'S'
    };

    $.extend($.FE.DEFAULTS, {
        placeholderText: '',
        enter: $.FroalaEditor.ENTER_BR,
        toolbarSticky: false,
        theme: 'gray',

        lineBreakerTags: ['table', 'hr', 'iframe', 'pre', 'dl'],
        linkAlwaysNoFollow: false,
        linkInsertButtons: ['linkBack'],
        linkList: [],
        linkAutoPrefix: '',
        linkStyles: {
            'fr-strong': 'Bold',
            'fr-text-red': 'Red',
            'fr-text-blue': 'Blue',
            'fr-text-green': 'Green'
        },
        linkText: true,
        imageEditButtons: ["imageReplace", "imageAlign", "imageRemove", "|", "imageLink", "linkOpen", "linkEdit", "linkRemove", "-", "imageDisplay", "imageStyle", "imageAlt", "imageSize"],
        imageUploadRemoteUrls: false,
        imageCORSProxy: "",

        paragraphFormat: {
            N: 'Normal',
            H1: 'Heading 1',
            H2: 'Heading 2',
            H3: 'Heading 3',
            H4: 'Heading 4',
            H5: 'Heading 5',
            p: 'Paragraph',
            div: 'Layer',
        },
        paragraphStyles: {
            'fr-text-bordered': 'Bordered',
            'fr-text-spaced': 'Spaced',
            'fr-text-uppercase': 'Uppercase',
            'fr-text-gray': 'Gray',
            'fr-text-red': 'Red',
            'fr-text-blue': 'Blue',
            'fr-text-green': 'Green'
        },
        tableStyles: {
            'fr-solid-borders': 'Solid Borders',
            'fr-dashed-borders': 'Dashed Borders',
            'fr-alternate-rows': 'Alternate Rows'
        },
        tableCellStyles: {
            'fr-red': 'Red',
            'fr-blue': 'Blue',
            'fr-green': 'Green'
        },
        imageStyles: {
            'fr-bordered': 'Borders',
            'fr-rounded': 'Rounded',
            'fr-padded': 'Padded',
            'fr-shadows': 'Shadows',
        },
        codeBeautifierOptions: {
            end_with_newline: true,
            indent_inner_html: true,
            extra_liners: "[]",
            brace_style: 'collapse',
            indent_char: ' ',
            indent_size: 4,
            wrap_line_length: 0
        },
        wordDeniedTags: ['img'],
        wordDeniedAttrs: ['lang', 'class'],
        htmlAllowedTags: ["meta", "a", "abbr", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "noindex", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr", "picture"],
        htmlRemoveTags: ['script', 'style'],
        htmlAllowedAttrs: ['accept', 'accept-charset', 'accesskey', 'action', 'align', 'allowfullscreen', 'allowtransparency', 'alt', 'async', 'autocomplete', 'autofocus', 'autoplay', 'autosave', 'background', 'bgcolor', 'border', 'charset', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'color', 'cols', 'colspan', 'content', 'contenteditable', 'contextmenu', 'controls', 'coords', 'data', 'data-.*', 'datetime', 'default', 'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable', 'dropzone', 'enctype', 'for', 'form', 'formaction', 'frameborder', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'http-equiv', 'icon', 'id', 'ismap', 'itemprop', 'keytype', 'kind', 'label', 'lang', 'language', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'mozallowfullscreen', 'multiple', 'name', 'novalidate', 'open', 'optimum', 'pattern', 'ping', 'placeholder', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'src', 'srcdoc', 'srclang', 'srcset', 'start', 'step', 'summary', 'spellcheck', 'style', 'tabindex', 'target', 'title', 'type', 'translate', 'usemap', 'value', 'valign', 'webkitallowfullscreen', 'width', 'wrap', 'itemtype', 'itemscope']
    });

    $.extend($.FroalaEditor.POPUP_TEMPLATES, {
        "dleleech.popup": '[_CUSTOM_LAYER_]'
    });

    $.extend($.FroalaEditor.POPUP_TEMPLATES, {
        "dleaudio.popup": '[_CUSTOM_LAYER_]'
    });

    $.extend($.FroalaEditor.POPUP_TEMPLATES, {
        "dlemedia.popup": '[_CUSTOM_LAYER_]'
    });

    $.FroalaEditor.PLUGINS.dleleech = function(editor) {
        // Create custom popup.
        function initPopup() {

            var template = {
                buttons: '',
                custom_layer: '<div style="width:300px;margin: 10px;"><div class="fr-input-line"><input name="href" type="text" class="fr-link-attr" placeholder="http://" dir="auto"><label>http://</label></div><div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="dleleechinsert" href="#" type="button">' + editor.language.translate('Insert') + '</button></div></div>'
            };

            // Create popup.
            var $popup = editor.popups.create('dleleech.popup', template);

            return $popup;
        }

        // Show the popup
        function showPopup() {

            editor.selection.save();

            var $popup = editor.popups.get('dleleech.popup');

            if (!$popup) $popup = initPopup();

            editor.popups.setContainer('dleleech.popup', editor.$tb);

            var $btn = editor.$tb.find('.fr-command[data-cmd="dleleech"]');
            var url = editor.selection.text();

            if (0 !== url.indexOf("http://") && 0 !== url.indexOf("https://")) {
                url = '';
            }

            $popup.find('input.fr-link-attr[type="text"][name="href"]').val(url);

            var left = $btn.offset().left + $btn.outerWidth() / 2;
            var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

            // Show the custom popup.
            // The button's outerHeight is required in case the popup needs to be displayed above it.
            editor.popups.show('dleleech.popup', left, top, $btn.outerHeight());
        }

        function insertHTML() {
            var $popup = editor.popups.get('dleleech.popup');
            var url = $popup.find('input.fr-link-attr[type="text"][name="href"]').val();

            editor.popups.hide('dleleech.popup');
            editor.selection.restore();
            var text = editor.selection.text();

            if (url != '') {
                if (text == '') {
                    text = url;
                }
                editor.html.insert('[leech=' + url + ']' + text + '[/leech]');
            }

        }

        // Methods visible outside the plugin.
        return {
            showPopup: showPopup,
            insertHTML: insertHTML
        }
    }

    $.FroalaEditor.PLUGINS.dlemedia = function(editor) {
        // Create custom popup.
        function initPopup() {

            var template = {
                buttons: '',
                custom_layer: '<div style="width:300px;margin: 10px;"><div class="fr-input-line"><input name="href" type="text" class="fr-link-attr" placeholder="http://" dir="auto"><label>http://</label></div><div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="dlemediainsert" href="#" type="button">' + editor.language.translate('Insert') + '</button></div></div>'
            };

            // Create popup.
            var $popup = editor.popups.create('dlemedia.popup', template);

            return $popup;
        }

        // Show the popup
        function showPopup() {

            editor.selection.save();

            var $popup = editor.popups.get('dlemedia.popup');

            if (!$popup) $popup = initPopup();

            editor.popups.setContainer('dlemedia.popup', editor.$tb);

            var $btn = editor.$tb.find('.fr-command[data-cmd="dlemedia"]');
            var url = editor.selection.text();

            if (0 !== url.indexOf("http://") && 0 !== url.indexOf("https://")) {
                url = '';
            }

            $popup.find('input.fr-link-attr[type="text"][name="href"]').val(url);

            var left = $btn.offset().left + $btn.outerWidth() / 2;
            var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

            // Show the custom popup.
            // The button's outerHeight is required in case the popup needs to be displayed above it.
            editor.popups.show('dlemedia.popup', left, top, $btn.outerHeight());
        }

        function insertHTML() {
            var $popup = editor.popups.get('dlemedia.popup');
            var url = $popup.find('input.fr-link-attr[type="text"][name="href"]').val();

            editor.popups.hide('dlemedia.popup');
            editor.selection.restore();

            if (url != '') {
                editor.html.insert('[media=' + url + ']');
            }

        }

        // Methods visible outside the plugin.
        return {
            showPopup: showPopup,
            insertHTML: insertHTML
        }
    }

    $.FroalaEditor.PLUGINS.dleaudio = function(editor) {
        var playlist = '';

        function initPopup() {

            var template = {
                buttons: '',
                custom_layer: '<div style="width:300px;margin: 10px;"><div class="fr-input-line"><input type="text" name="url" class="fr-link-attr" placeholder="' + editor.language.translate('Link to the audio') + '" tabIndex="1"></div><div class="fr-input-line"><input type="text" class="fr-link-attr" name="descr" placeholder="' + editor.language.translate('Description') + '" tabIndex="2"></div><div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="dleaudioinsert" href="#" type="button">' + editor.language.translate('Insert') + '</button><button type="button" class="fr-command fr-submit" data-cmd="audioInsertToPlaylist" tabIndex="5">' + editor.language.translate('Add to Playlist') + '</button></div></div>'
            };

            // Create popup.
            var $popup = editor.popups.create('dleaudio.popup', template);

            return $popup;
        }

        // Show the popup
        function showPopup() {

            editor.selection.save();

            var $popup = editor.popups.get('dleaudio.popup');

            if (!$popup) $popup = initPopup();

            editor.popups.setContainer('dleaudio.popup', editor.$tb);

            var $btn = editor.$tb.find('.fr-command[data-cmd="dleaudio"]');
            var url = editor.selection.text();

            if (0 !== url.indexOf("http://") && 0 !== url.indexOf("https://")) {
                url = '';
            }

            $popup.find('input.fr-link-attr[type="text"][name="url"]').val(url);
            $popup.find('input.fr-link-attr[type="text"][name="descr"]').val('');

            var left = $btn.offset().left + $btn.outerWidth() / 2;
            var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

            // Show the custom popup.
            // The button's outerHeight is required in case the popup needs to be displayed above it.
            editor.popups.show('dleaudio.popup', left, top, $btn.outerHeight());
        }

        function insertHTML() {
            var $popup = editor.popups.get('dleaudio.popup');
            var url = $popup.find('input.fr-link-attr[type="text"][name="url"]').val();
            var descr = $popup.find('input.fr-link-attr[type="text"][name="descr"]').val();

            if (descr != "") {
                url += '|' + descr;
            }

            if (url != "") {
                playlist += url;
            } else if (playlist != "") {
                playlist = playlist.substring(0, playlist.length - 1);
            }

            if (playlist != "") {
                editor.popups.hide('dleaudio.popup');
                editor.selection.restore();
                editor.html.insert('[audio=' + playlist + ']');
                playlist = '';
            }


        }

        function insertToPlaylist() {
            var $popup = editor.popups.get('dleaudio.popup');
            var link = $popup.find('input.fr-link-attr[type="text"][name="url"]').val() || '';
            var descr = $popup.find('input.fr-link-attr[type="text"][name="descr"]').val() || '';

            var videolink = link;

            if (descr != "") {
                videolink += '|' + descr;
            }

            if (videolink != "") {
                playlist += videolink + ',';
            }

            $popup.find('input.fr-link-attr[type="text"][name="url"]').val('');
            $popup.find('input.fr-link-attr[type="text"][name="descr"]').val('');

            editor.selection.save();

        }
        // Methods visible outside the plugin.
        return {
            showPopup: showPopup,
            insertToPlaylist: insertToPlaylist,
            insertHTML: insertHTML
        }
    }

    $.FroalaEditor.RegisterCommand('dleleechinsert', {
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            this.dleleech.insertHTML();
        }
    });


    $.FroalaEditor.DefineIcon('dleleech', {
        NAME: 'dle dle-i-dleicon icon-leech',
        template: 'dleicons'
    });
    $.FroalaEditor.RegisterCommand('dleleech', {
        title: 'Insert protected link',
        icon: 'dleleech',
        undo: false,
        focus: false,
        plugin: 'dleleech',
        refreshAfterCallback: false,
        callback: function() {
            this.dleleech.showPopup();
        }
    });

    $.FroalaEditor.RegisterCommand('dlemediainsert', {
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            this.dlemedia.insertHTML();
        }
    });

    $.FroalaEditor.DefineIcon('dlemedia', {
        NAME: 'dle dle-i-dleicon icon-yt',
        template: 'dleicons'
    });
    $.FroalaEditor.RegisterCommand('dlemedia', {
        title: 'Insert media link',
        icon: 'dlemedia',
        undo: false,
        focus: false,
        plugin: 'dlemedia',
        refreshAfterCallback: false,
        callback: function() {
            this.dlemedia.showPopup();
        }
    });

    $.FroalaEditor.RegisterCommand('dleaudioinsert', {
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            this.dleaudio.insertHTML();
        }
    });
    $.FroalaEditor.RegisterCommand('audioInsertToPlaylist', {
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            this.dleaudio.insertToPlaylist();
        }
    });


    $.FroalaEditor.DefineIcon('dleaudio', {
        NAME: 'dle dle-i-dleicon icon-audio',
        template: 'dleicons'
    });
    $.FroalaEditor.RegisterCommand('dleaudio', {
        title: 'Insert audio',
        icon: 'dleaudio',
        undo: false,
        focus: false,
        plugin: 'dleaudio',
        refreshAfterCallback: false,
        callback: function() {
            this.dleaudio.showPopup();
        }
    });

    var dletp = new Typograf({
        locale: ['ru', 'en-US']
    });

    dletp.disableRule('common/space/afterPunctuation');
    dletp.disableRule('common/space/delBeforePunctuation');

    $.FroalaEditor.DefineIcon('dletypo', {
        NAME: 'dle dle-i-dleicon icon-typo',
        template: 'dleicons'
    });
    $.FroalaEditor.RegisterCommand('dletypo', {
        title: 'Typographical Word Processing',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            this.html.set(dletp.execute(this.html.get()));
        }
    });


    $.FroalaEditor.DefineIcon('dlequote', {
        NAME: 'dle dle-i-dleicon icon-quote',
        template: 'dleicons'
    });
    $.FroalaEditor.RegisterCommand('dlequote', {
        title: 'Insert Quote',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            this.html.insert('<div class="quote">' + this.html.getSelected() + '</div>');
        }
    });

    $.FroalaEditor.DefineIcon('dlehide', {
        NAME: 'dle dle-i-dleicon icon-hide',
        template: 'dleicons'
    });
    $.FroalaEditor.RegisterCommand('dlehide', {
        title: 'Insert hidden text',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            this.html.insert('[hide]' + this.html.getSelected() + '[/hide]');
        }
    });

    $.FroalaEditor.DefineIcon('dlespoiler', {
        NAME: 'dle dle-i-dleicon icon-spoiler',
        template: 'dleicons'
    });
    $.FroalaEditor.RegisterCommand('dlespoiler', {
        title: 'Insert spoiler',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            this.html.insert('[spoiler]' + this.html.getSelected() + '[/spoiler]');
        }
    });

    $.FroalaEditor.DefineIcon('dlecode', {
        NAME: 'file-code-o'
    });
    $.FroalaEditor.RegisterCommand('dlecode', {
        title: 'Insert source code',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            active_editor = this;
            active_editor.selection.save();

            var b = {};

            b[dle_act_lang[3]] = function() {
                $(this).dialog('close');
            };

            b['Ok'] = function() {
                if ($('#dle-promt-text').val().length < 1) {
                    $('#dle-promt-text').addClass('ui-state-error');
                } else {
                    var response = $('#dle-promt-text').val();
                    response = response.replace(/&/gi, "&amp;");
                    response = response.replace(/</gi, "&lt;");
                    response = response.replace(/>/gi, "&gt;");
                    response = response.replace(/"/gi, "&quot;");
                    response = response.replace(/'/gi, "&#039;");
                    response = response.replace(/\t/gi, "&nbsp;&nbsp;&nbsp;&nbsp;");

                    $(this).dialog('close');
                    $('#dlepopup').remove();
                    active_editor.selection.restore();
                    active_editor.undo.saveStep();
                    active_editor.html.insert('<pre class="language-markup"><code>' + response + '</code></pre>', false);
                    active_editor.undo.saveStep();

                }
            };

            $('#dlepopup').remove();

            $('body').append("<div id='dlepopup' title='" + this.language.translate('Insert source code') + "' style='display:none'><br /><textarea name='dle-promt-text' id='dle-promt-text' class='classic' style='width:100%;height:300px;'></textarea></div>");

            $('#dlepopup').dialog({
                autoOpen: true,
                width: 600,
                resizable: false,
                dialogClass: "modalfixed dle-popup-complaint",
                buttons: b
            });

            $('.modalfixed.ui-dialog').css({
                position: "fixed"
            });
            $('#dlepopup').dialog("option", "position", {
                my: "center",
                at: "center",
                of: window
            });


        }
    });

    $.FroalaEditor.DefineIcon('page_dropdown', {
        NAME: 'dle dle-i-dleicon icon-br',
        template: 'dleicons'
    });
    $.FroalaEditor.RegisterCommand('page_dropdown', {
        title: 'Page Navigation',
        type: 'dropdown',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        options: {
            'v1': 'Insert page breaks',
            'v2': 'Insert link to the page'
        },
        callback: function(cmd, val) {
            if (val == 'v1') {
                this.html.insert('{PAGEBREAK}');
            } else {
                this.html.insert('[page=2]' + this.html.getSelected() + '[/page]');
            }

        },

    });

    $.FroalaEditor.DefineIcon('dleupload', {
        NAME: 'dle dle-i-dleicon icon-up',
        template: 'dleicons'
    });
    $.FroalaEditor.RegisterCommand('dleupload', {
        title: 'Uploading files',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            active_editor = this;
            active_editor.selection.save();
            media_upload(this.opts.dle_upload_area, this.opts.dle_upload_user, this.opts.dle_upload_news, '1');
        }
    });


    $.FroalaEditor.DefineIcon('dleimg', {
        NAME: 'image'
    });
    $.FroalaEditor.RegisterCommand('dleimg', {
        title: 'Insert Image',
        focus: true,
        undo: true,
        refreshAfterCallback: true,
        callback: function() {
            active_editor = this;
            active_editor.selection.save();

            var b = {};

            b[dle_act_lang[3]] = function() {
                $(this).dialog('close');
            };

            b['Ok'] = function() {
                if ($("#dle-promt-text").val().length < 1) {
                    $("#dle-promt-text").addClass('ui-state-error');
                } else {

                    var imageurl = $("#dle-promt-text").val();
                    var imagealt = $("#dle-image-alt").val();
                    var imagealign = $("#dleimagealign").val();
                    $(this).dialog("close");
                    $("#dlepopup").remove();

                    var imgoption = "";

                    if (imagealt != "") {

                        imgoption = "|" + imagealt;

                    }

                    if (imagealign != "" && imagealign != "center") {

                        imgoption = imagealign + imgoption;

                    }

                    if (imgoption != "") {

                        imgoption = "=" + imgoption;

                    }
                    active_editor.selection.restore();
                    active_editor.undo.saveStep();
                    if (imagealign == "center") {
                        active_editor.html.insert('<div style="text-align:center;">[img' + imgoption + ']' + imageurl + '[/img]</div>');
                    } else {
                        active_editor.html.insert("[img" + imgoption + "]" + imageurl + "[/img]");
                    }
                    active_editor.undo.saveStep();
                }
            };

            var img_align = this.language.translate('Alignment');
            var img_align_sel = "<select name='dleimagealign' id='dleimagealign' class='ui-widget-content ui-corner-all'><option value=''>" + this.language.translate('Not used') + "</option><option value='left'>" + this.language.translate('Left') + "</option><option value='right'>" + this.language.translate('Right') + "</option><option value='center'>" + this.language.translate('Center') + "</option></select>";

            $('#dlepopup').remove();

            $("body").append("<div id='dlepopup' title='" + this.language.translate('Insert Image') + "' style='display:none'>" + this.language.translate('Image URL') + "<br /><input type='text' name='dle-promt-text' id='dle-promt-text' class='classic' style='width:100%;' value=''/><br /><br />" + this.language.translate('Alternate Text') + "<br /><input type='text' name='dle-image-alt' id='dle-image-alt' class='classic' style='width:100%;' value=''/><br /><br />" + img_align + "&nbsp;" + img_align_sel + "</div>");

            $('#dlepopup').dialog({
                autoOpen: true,
                width: 500,
                resizable: false,
                buttons: b
            });

            $('.modalfixed.ui-dialog').css({
                position: "fixed"
            });
            $('#dlepopup').dialog("option", "position", {
                my: "center",
                at: "center",
                of: window
            });


        }
    });


}));