/*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */
! function (a, b) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
    if (!a.document) throw new Error("jQuery requires a window with a document");
    return b(a)
  } : b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
  var c = [],
    d = a.document,
    e = c.slice,
    f = c.concat,
    g = c.push,
    h = c.indexOf,
    i = {},
    j = i.toString,
    k = i.hasOwnProperty,
    l = {},
    m = "2.2.4",
    n = function (a, b) {
      return new n.fn.init(a, b)
    },
    o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    p = /^-ms-/,
    q = /-([\da-z])/gi,
    r = function (a, b) {
      return b.toUpperCase()
    };
  n.fn = n.prototype = {
    jquery: m,
    constructor: n,
    selector: "",
    length: 0,
    toArray: function () {
      return e.call(this)
    },
    get: function (a) {
      return null != a ? 0 > a ? this[a + this.length] : this[a] : e.call(this)
    },
    pushStack: function (a) {
      var b = n.merge(this.constructor(), a);
      return b.prevObject = this, b.context = this.context, b
    },
    each: function (a) {
      return n.each(this, a)
    },
    map: function (a) {
      return this.pushStack(n.map(this, function (b, c) {
        return a.call(b, c, b)
      }))
    },
    slice: function () {
      return this.pushStack(e.apply(this, arguments))
    },
    first: function () {
      return this.eq(0)
    },
    last: function () {
      return this.eq(-1)
    },
    eq: function (a) {
      var b = this.length,
        c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
    },
    end: function () {
      return this.prevObject || this.constructor()
    },
    push: g,
    sort: c.sort,
    splice: c.splice
  }, n.extend = n.fn.extend = function () {
    var a, b, c, d, e, f, g = arguments[0] || {},
      h = 1,
      i = arguments.length,
      j = !1;
    for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
      if (null != (a = arguments[h]))
        for (b in a) c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
    return g
  }, n.extend({
    expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function (a) {
      throw new Error(a)
    },
    noop: function () {},
    isFunction: function (a) {
      return "function" === n.type(a)
    },
    isArray: Array.isArray,
    isWindow: function (a) {
      return null != a && a === a.window
    },
    isNumeric: function (a) {
      var b = a && a.toString();
      return !n.isArray(a) && b - parseFloat(b) + 1 >= 0
    },
    isPlainObject: function (a) {
      var b;
      if ("object" !== n.type(a) || a.nodeType || n.isWindow(a)) return !1;
      if (a.constructor && !k.call(a, "constructor") && !k.call(a.constructor.prototype || {}, "isPrototypeOf")) return !1;
      for (b in a);
      return void 0 === b || k.call(a, b)
    },
    isEmptyObject: function (a) {
      var b;
      for (b in a) return !1;
      return !0
    },
    type: function (a) {
      return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? i[j.call(a)] || "object" : typeof a
    },
    globalEval: function (a) {
      var b, c = eval;
      a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = d.createElement("script"), b.text = a, d.head.appendChild(b).parentNode.removeChild(b)) : c(a))
    },
    camelCase: function (a) {
      return a.replace(p, "ms-").replace(q, r)
    },
    nodeName: function (a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
    },
    each: function (a, b) {
      var c, d = 0;
      if (s(a)) {
        for (c = a.length; c > d; d++)
          if (b.call(a[d], d, a[d]) === !1) break
      } else
        for (d in a)
          if (b.call(a[d], d, a[d]) === !1) break;
      return a
    },
    trim: function (a) {
      return null == a ? "" : (a + "").replace(o, "")
    },
    makeArray: function (a, b) {
      var c = b || [];
      return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : g.call(c, a)), c
    },
    inArray: function (a, b, c) {
      return null == b ? -1 : h.call(b, a, c)
    },
    merge: function (a, b) {
      for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
      return a.length = e, a
    },
    grep: function (a, b, c) {
      for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
      return e
    },
    map: function (a, b, c) {
      var d, e, g = 0,
        h = [];
      if (s(a))
        for (d = a.length; d > g; g++) e = b(a[g], g, c), null != e && h.push(e);
      else
        for (g in a) e = b(a[g], g, c), null != e && h.push(e);
      return f.apply([], h)
    },
    guid: 1,
    proxy: function (a, b) {
      var c, d, f;
      return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (d = e.call(arguments, 2), f = function () {
        return a.apply(b || this, d.concat(e.call(arguments)))
      }, f.guid = a.guid = a.guid || n.guid++, f) : void 0
    },
    now: Date.now,
    support: l
  }), "function" == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]), n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
    i["[object " + b + "]"] = b.toLowerCase()
  });

  function s(a) {
    var b = !!a && "length" in a && a.length,
      c = n.type(a);
    return "function" === c || n.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
  }
  var t = function (a) {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date,
      v = a.document,
      w = 0,
      x = 0,
      y = ga(),
      z = ga(),
      A = ga(),
      B = function (a, b) {
        return a === b && (l = !0), 0
      },
      C = 1 << 31,
      D = {}.hasOwnProperty,
      E = [],
      F = E.pop,
      G = E.push,
      H = E.push,
      I = E.slice,
      J = function (a, b) {
        for (var c = 0, d = a.length; d > c; c++)
          if (a[c] === b) return c;
        return -1
      },
      K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      L = "[\\x20\\t\\r\\n\\f]",
      M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      N = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + L + "*\\]",
      O = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + N + ")*)|.*)\\)|)",
      P = new RegExp(L + "+", "g"),
      Q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
      R = new RegExp("^" + L + "*," + L + "*"),
      S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
      T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
      U = new RegExp(O),
      V = new RegExp("^" + M + "$"),
      W = {
        ID: new RegExp("^#(" + M + ")"),
        CLASS: new RegExp("^\\.(" + M + ")"),
        TAG: new RegExp("^(" + M + "|[*])"),
        ATTR: new RegExp("^" + N),
        PSEUDO: new RegExp("^" + O),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + K + ")$", "i"),
        needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
      },
      X = /^(?:input|select|textarea|button)$/i,
      Y = /^h\d$/i,
      Z = /^[^{]+\{\s*\[native \w/,
      $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      _ = /[+~]/,
      aa = /'|\\/g,
      ba = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
      ca = function (a, b, c) {
        var d = "0x" + b - 65536;
        return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
      },
      da = function () {
        m()
      };
    try {
      H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
    } catch (ea) {
      H = {
        apply: E.length ? function (a, b) {
          G.apply(a, I.call(b))
        } : function (a, b) {
          var c = a.length,
            d = 0;
          while (a[c++] = b[d++]);
          a.length = c - 1
        }
      }
    }

    function fa(a, b, d, e) {
      var f, h, j, k, l, o, r, s, w = b && b.ownerDocument,
        x = b ? b.nodeType : 9;
      if (d = d || [], "string" != typeof a || !a || 1 !== x && 9 !== x && 11 !== x) return d;
      if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
        if (11 !== x && (o = $.exec(a)))
          if (f = o[1]) {
            if (9 === x) {
              if (!(j = b.getElementById(f))) return d;
              if (j.id === f) return d.push(j), d
            } else if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d
          } else {
            if (o[2]) return H.apply(d, b.getElementsByTagName(a)), d;
            if ((f = o[3]) && c.getElementsByClassName && b.getElementsByClassName) return H.apply(d, b.getElementsByClassName(f)), d
          } if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
          if (1 !== x) w = b, s = a;
          else if ("object" !== b.nodeName.toLowerCase()) {
            (k = b.getAttribute("id")) ? k = k.replace(aa, "\\$&"): b.setAttribute("id", k = u), r = g(a), h = r.length, l = V.test(k) ? "#" + k : "[id='" + k + "']";
            while (h--) r[h] = l + " " + qa(r[h]);
            s = r.join(","), w = _.test(a) && oa(b.parentNode) || b
          }
          if (s) try {
            return H.apply(d, w.querySelectorAll(s)), d
          } catch (y) {} finally {
            k === u && b.removeAttribute("id")
          }
        }
      }
      return i(a.replace(Q, "$1"), b, d, e)
    }

    function ga() {
      var a = [];

      function b(c, e) {
        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
      }
      return b
    }

    function ha(a) {
      return a[u] = !0, a
    }

    function ia(a) {
      var b = n.createElement("div");
      try {
        return !!a(b)
      } catch (c) {
        return !1
      } finally {
        b.parentNode && b.parentNode.removeChild(b), b = null
      }
    }

    function ja(a, b) {
      var c = a.split("|"),
        e = c.length;
      while (e--) d.attrHandle[c[e]] = b
    }

    function ka(a, b) {
      var c = b && a,
        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
      if (d) return d;
      if (c)
        while (c = c.nextSibling)
          if (c === b) return -1;
      return a ? 1 : -1
    }

    function la(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return "input" === c && b.type === a
      }
    }

    function ma(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a
      }
    }

    function na(a) {
      return ha(function (b) {
        return b = +b, ha(function (c, d) {
          var e, f = a([], c.length, b),
            g = f.length;
          while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
        })
      })
    }

    function oa(a) {
      return a && "undefined" != typeof a.getElementsByTagName && a
    }
    c = fa.support = {}, f = fa.isXML = function (a) {
      var b = a && (a.ownerDocument || a).documentElement;
      return b ? "HTML" !== b.nodeName : !1
    }, m = fa.setDocument = function (a) {
      var b, e, g = a ? a.ownerDocument || a : v;
      return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ia(function (a) {
        return a.className = "i", !a.getAttribute("className")
      }), c.getElementsByTagName = ia(function (a) {
        return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length
      }), c.getElementsByClassName = Z.test(n.getElementsByClassName), c.getById = ia(function (a) {
        return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length
      }), c.getById ? (d.find.ID = function (a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c = b.getElementById(a);
          return c ? [c] : []
        }
      }, d.filter.ID = function (a) {
        var b = a.replace(ba, ca);
        return function (a) {
          return a.getAttribute("id") === b
        }
      }) : (delete d.find.ID, d.filter.ID = function (a) {
        var b = a.replace(ba, ca);
        return function (a) {
          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
          return c && c.value === b
        }
      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
      } : function (a, b) {
        var c, d = [],
          e = 0,
          f = b.getElementsByTagName(a);
        if ("*" === a) {
          while (c = f[e++]) 1 === c.nodeType && d.push(c);
          return d
        }
        return f
      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
        return "undefined" != typeof b.getElementsByClassName && p ? b.getElementsByClassName(a) : void 0
      }, r = [], q = [], (c.qsa = Z.test(n.querySelectorAll)) && (ia(function (a) {
        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
      }), ia(function (a) {
        var b = n.createElement("input");
        b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
      })), (c.matchesSelector = Z.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ia(function (a) {
        c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", O)
      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Z.test(o.compareDocumentPosition), t = b || Z.test(o.contains) ? function (a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
          d = b && b.parentNode;
        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
      } : function (a, b) {
        if (b)
          while (b = b.parentNode)
            if (b === a) return !0;
        return !1
      }, B = b ? function (a, b) {
        if (a === b) return l = !0, 0;
        var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
      } : function (a, b) {
        if (a === b) return l = !0, 0;
        var c, d = 0,
          e = a.parentNode,
          f = b.parentNode,
          g = [a],
          h = [b];
        if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
        if (e === f) return ka(a, b);
        c = a;
        while (c = c.parentNode) g.unshift(c);
        c = b;
        while (c = c.parentNode) h.unshift(c);
        while (g[d] === h[d]) d++;
        return d ? ka(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0
      }, n) : n
    }, fa.matches = function (a, b) {
      return fa(a, null, null, b)
    }, fa.matchesSelector = function (a, b) {
      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(T, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
        var d = s.call(a, b);
        if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
      } catch (e) {}
      return fa(b, n, null, [a]).length > 0
    }, fa.contains = function (a, b) {
      return (a.ownerDocument || a) !== n && m(a), t(a, b)
    }, fa.attr = function (a, b) {
      (a.ownerDocument || a) !== n && m(a);
      var e = d.attrHandle[b.toLowerCase()],
        f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
      return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
    }, fa.error = function (a) {
      throw new Error("Syntax error, unrecognized expression: " + a)
    }, fa.uniqueSort = function (a) {
      var b, d = [],
        e = 0,
        f = 0;
      if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        while (b = a[f++]) b === a[f] && (e = d.push(f));
        while (e--) a.splice(d[e], 1)
      }
      return k = null, a
    }, e = fa.getText = function (a) {
      var b, c = "",
        d = 0,
        f = a.nodeType;
      if (f) {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" == typeof a.textContent) return a.textContent;
          for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
        } else if (3 === f || 4 === f) return a.nodeValue
      } else
        while (b = a[d++]) c += e(b);
      return c
    }, d = fa.selectors = {
      cacheLength: 50,
      createPseudo: ha,
      match: W,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function (a) {
          return a[1] = a[1].replace(ba, ca), a[3] = (a[3] || a[4] || a[5] || "").replace(ba, ca), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
        },
        CHILD: function (a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fa.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fa.error(a[0]), a
        },
        PSEUDO: function (a) {
          var b, c = !a[6] && a[2];
          return W.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && U.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
        }
      },
      filter: {
        TAG: function (a) {
          var b = a.replace(ba, ca).toLowerCase();
          return "*" === a ? function () {
            return !0
          } : function (a) {
            return a.nodeName && a.nodeName.toLowerCase() === b
          }
        },
        CLASS: function (a) {
          var b = y[a + " "];
          return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function (a) {
            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
          })
        },
        ATTR: function (a, b, c) {
          return function (d) {
            var e = fa.attr(d, a);
            return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(P, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
          }
        },
        CHILD: function (a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
            g = "last" !== a.slice(-4),
            h = "of-type" === b;
          return 1 === d && 0 === e ? function (a) {
            return !!a.parentNode
          } : function (b, c, i) {
            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
              q = b.parentNode,
              r = h && b.nodeName.toLowerCase(),
              s = !i && !h,
              t = !1;
            if (q) {
              if (f) {
                while (p) {
                  m = b;
                  while (m = m[p])
                    if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                  o = p = "only" === a && !o && "nextSibling"
                }
                return !0
              }
              if (o = [g ? q.firstChild : q.lastChild], g && s) {
                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];
                while (m = ++n && m && m[p] || (t = n = 0) || o.pop())
                  if (1 === m.nodeType && ++t && m === b) {
                    k[a] = [w, n, t];
                    break
                  }
              } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1)
                while (m = ++n && m && m[p] || (t = n = 0) || o.pop())
                  if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
              return t -= e, t === d || t % d === 0 && t / d >= 0
            }
          }
        },
        PSEUDO: function (a, b) {
          var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fa.error("unsupported pseudo: " + a);
          return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ha(function (a, c) {
            var d, f = e(a, b),
              g = f.length;
            while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
          }) : function (a) {
            return e(a, 0, c)
          }) : e
        }
      },
      pseudos: {
        not: ha(function (a) {
          var b = [],
            c = [],
            d = h(a.replace(Q, "$1"));
          return d[u] ? ha(function (a, b, c, e) {
            var f, g = d(a, null, e, []),
              h = a.length;
            while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
          }) : function (a, e, f) {
            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
          }
        }),
        has: ha(function (a) {
          return function (b) {
            return fa(a, b).length > 0
          }
        }),
        contains: ha(function (a) {
          return a = a.replace(ba, ca),
            function (b) {
              return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
            }
        }),
        lang: ha(function (a) {
          return V.test(a || "") || fa.error("unsupported lang: " + a), a = a.replace(ba, ca).toLowerCase(),
            function (b) {
              var c;
              do
                if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
              return !1
            }
        }),
        target: function (b) {
          var c = a.location && a.location.hash;
          return c && c.slice(1) === b.id
        },
        root: function (a) {
          return a === o
        },
        focus: function (a) {
          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
        },
        enabled: function (a) {
          return a.disabled === !1
        },
        disabled: function (a) {
          return a.disabled === !0
        },
        checked: function (a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && !!a.checked || "option" === b && !!a.selected
        },
        selected: function (a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
        },
        empty: function (a) {
          for (a = a.firstChild; a; a = a.nextSibling)
            if (a.nodeType < 6) return !1;
          return !0
        },
        parent: function (a) {
          return !d.pseudos.empty(a)
        },
        header: function (a) {
          return Y.test(a.nodeName)
        },
        input: function (a) {
          return X.test(a.nodeName)
        },
        button: function (a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && "button" === a.type || "button" === b
        },
        text: function (a) {
          var b;
          return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
        },
        first: na(function () {
          return [0]
        }),
        last: na(function (a, b) {
          return [b - 1]
        }),
        eq: na(function (a, b, c) {
          return [0 > c ? c + b : c]
        }),
        even: na(function (a, b) {
          for (var c = 0; b > c; c += 2) a.push(c);
          return a
        }),
        odd: na(function (a, b) {
          for (var c = 1; b > c; c += 2) a.push(c);
          return a
        }),
        lt: na(function (a, b, c) {
          for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
          return a
        }),
        gt: na(function (a, b, c) {
          for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
          return a
        })
      }
    }, d.pseudos.nth = d.pseudos.eq;
    for (b in {
        radio: !0,
        checkbox: !0,
        file: !0,
        password: !0,
        image: !0
      }) d.pseudos[b] = la(b);
    for (b in {
        submit: !0,
        reset: !0
      }) d.pseudos[b] = ma(b);

    function pa() {}
    pa.prototype = d.filters = d.pseudos, d.setFilters = new pa, g = fa.tokenize = function (a, b) {
      var c, e, f, g, h, i, j, k = z[a + " "];
      if (k) return b ? 0 : k.slice(0);
      h = a, i = [], j = d.preFilter;
      while (h) {
        c && !(e = R.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = S.exec(h)) && (c = e.shift(), f.push({
          value: c,
          type: e[0].replace(Q, " ")
        }), h = h.slice(c.length));
        for (g in d.filter) !(e = W[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
          value: c,
          type: g,
          matches: e
        }), h = h.slice(c.length));
        if (!c) break
      }
      return b ? h.length : h ? fa.error(a) : z(a, i).slice(0)
    };

    function qa(a) {
      for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
      return d
    }

    function ra(a, b, c) {
      var d = b.dir,
        e = c && "parentNode" === d,
        f = x++;
      return b.first ? function (b, c, f) {
        while (b = b[d])
          if (1 === b.nodeType || e) return a(b, c, f)
      } : function (b, c, g) {
        var h, i, j, k = [w, f];
        if (g) {
          while (b = b[d])
            if ((1 === b.nodeType || e) && a(b, c, g)) return !0
        } else
          while (b = b[d])
            if (1 === b.nodeType || e) {
              if (j = b[u] || (b[u] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === w && h[1] === f) return k[2] = h[2];
              if (i[d] = k, k[2] = a(b, c, g)) return !0
            }
      }
    }

    function sa(a) {
      return a.length > 1 ? function (b, c, d) {
        var e = a.length;
        while (e--)
          if (!a[e](b, c, d)) return !1;
        return !0
      } : a[0]
    }

    function ta(a, b, c) {
      for (var d = 0, e = b.length; e > d; d++) fa(a, b[d], c);
      return c
    }

    function ua(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
      return g
    }

    function va(a, b, c, d, e, f) {
      return d && !d[u] && (d = va(d)), e && !e[u] && (e = va(e, f)), ha(function (f, g, h, i) {
        var j, k, l, m = [],
          n = [],
          o = g.length,
          p = f || ta(b || "*", h.nodeType ? [h] : h, []),
          q = !a || !f && b ? p : ua(p, m, a, h, i),
          r = c ? e || (f ? a : o || d) ? [] : g : q;
        if (c && c(q, r, h, i), d) {
          j = ua(r, n), d(j, [], h, i), k = j.length;
          while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
        }
        if (f) {
          if (e || a) {
            if (e) {
              j = [], k = r.length;
              while (k--)(l = r[k]) && j.push(q[k] = l);
              e(null, r = [], j, i)
            }
            k = r.length;
            while (k--)(l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
          }
        } else r = ua(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
      })
    }

    function wa(a) {
      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ra(function (a) {
          return a === b
        }, h, !0), l = ra(function (a) {
          return J(b, a) > -1
        }, h, !0), m = [function (a, c, d) {
          var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
          return b = null, e
        }]; f > i; i++)
        if (c = d.relative[a[i].type]) m = [ra(sa(m), c)];
        else {
          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
            for (e = ++i; f > e; e++)
              if (d.relative[a[e].type]) break;
            return va(i > 1 && sa(m), i > 1 && qa(a.slice(0, i - 1).concat({
              value: " " === a[i - 2].type ? "*" : ""
            })).replace(Q, "$1"), c, e > i && wa(a.slice(i, e)), f > e && wa(a = a.slice(e)), f > e && qa(a))
          }
          m.push(c)
        } return sa(m)
    }

    function xa(a, b) {
      var c = b.length > 0,
        e = a.length > 0,
        f = function (f, g, h, i, k) {
          var l, o, q, r = 0,
            s = "0",
            t = f && [],
            u = [],
            v = j,
            x = f || e && d.find.TAG("*", k),
            y = w += null == v ? 1 : Math.random() || .1,
            z = x.length;
          for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
            if (e && l) {
              o = 0, g || l.ownerDocument === n || (m(l), h = !p);
              while (q = a[o++])
                if (q(l, g || n, h)) {
                  i.push(l);
                  break
                } k && (w = y)
            }
            c && ((l = !q && l) && r--, f && t.push(l))
          }
          if (r += s, c && s !== r) {
            o = 0;
            while (q = b[o++]) q(t, u, g, h);
            if (f) {
              if (r > 0)
                while (s--) t[s] || u[s] || (u[s] = F.call(i));
              u = ua(u)
            }
            H.apply(i, u), k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i)
          }
          return k && (w = y, j = v), t
        };
      return c ? ha(f) : f
    }
    return h = fa.compile = function (a, b) {
      var c, d = [],
        e = [],
        f = A[a + " "];
      if (!f) {
        b || (b = g(a)), c = b.length;
        while (c--) f = wa(b[c]), f[u] ? d.push(f) : e.push(f);
        f = A(a, xa(e, d)), f.selector = a
      }
      return f
    }, i = fa.select = function (a, b, e, f) {
      var i, j, k, l, m, n = "function" == typeof a && a,
        o = !f && g(a = n.selector || a);
      if (e = e || [], 1 === o.length) {
        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
          if (b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0], !b) return e;
          n && (b = b.parentNode), a = a.slice(j.shift().value.length)
        }
        i = W.needsContext.test(a) ? 0 : j.length;
        while (i--) {
          if (k = j[i], d.relative[l = k.type]) break;
          if ((m = d.find[l]) && (f = m(k.matches[0].replace(ba, ca), _.test(j[0].type) && oa(b.parentNode) || b))) {
            if (j.splice(i, 1), a = f.length && qa(j), !a) return H.apply(e, f), e;
            break
          }
        }
      }
      return (n || h(a, o))(f, b, !p, e, !b || _.test(a) && oa(b.parentNode) || b), e
    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ia(function (a) {
      return 1 & a.compareDocumentPosition(n.createElement("div"))
    }), ia(function (a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
    }) || ja("type|href|height|width", function (a, b, c) {
      return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
    }), c.attributes && ia(function (a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
    }) || ja("value", function (a, b, c) {
      return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
    }), ia(function (a) {
      return null == a.getAttribute("disabled")
    }) || ja(K, function (a, b, c) {
      var d;
      return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
    }), fa
  }(a);
  n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.uniqueSort = n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
  var u = function (a, b, c) {
      var d = [],
        e = void 0 !== c;
      while ((a = a[b]) && 9 !== a.nodeType)
        if (1 === a.nodeType) {
          if (e && n(a).is(c)) break;
          d.push(a)
        } return d
    },
    v = function (a, b) {
      for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
      return c
    },
    w = n.expr.match.needsContext,
    x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
    y = /^.[^:#\[\.,]*$/;

  function z(a, b, c) {
    if (n.isFunction(b)) return n.grep(a, function (a, d) {
      return !!b.call(a, d, a) !== c
    });
    if (b.nodeType) return n.grep(a, function (a) {
      return a === b !== c
    });
    if ("string" == typeof b) {
      if (y.test(b)) return n.filter(b, a, c);
      b = n.filter(b, a)
    }
    return n.grep(a, function (a) {
      return h.call(b, a) > -1 !== c
    })
  }
  n.filter = function (a, b, c) {
    var d = b[0];
    return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {
      return 1 === a.nodeType
    }))
  }, n.fn.extend({
    find: function (a) {
      var b, c = this.length,
        d = [],
        e = this;
      if ("string" != typeof a) return this.pushStack(n(a).filter(function () {
        for (b = 0; c > b; b++)
          if (n.contains(e[b], this)) return !0
      }));
      for (b = 0; c > b; b++) n.find(a, e[b], d);
      return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
    },
    filter: function (a) {
      return this.pushStack(z(this, a || [], !1))
    },
    not: function (a) {
      return this.pushStack(z(this, a || [], !0))
    },
    is: function (a) {
      return !!z(this, "string" == typeof a && w.test(a) ? n(a) : a || [], !1).length
    }
  });
  var A, B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    C = n.fn.init = function (a, b, c) {
      var e, f;
      if (!a) return this;
      if (c = c || A, "string" == typeof a) {
        if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : B.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
        if (e[1]) {
          if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), x.test(e[1]) && n.isPlainObject(b))
            for (e in b) n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
          return this
        }
        return f = d.getElementById(e[2]), f && f.parentNode && (this.length = 1, this[0] = f), this.context = d, this.selector = a, this
      }
      return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this))
    };
  C.prototype = n.fn, A = n(d);
  var D = /^(?:parents|prev(?:Until|All))/,
    E = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  n.fn.extend({
    has: function (a) {
      var b = n(a, this),
        c = b.length;
      return this.filter(function () {
        for (var a = 0; c > a; a++)
          if (n.contains(this, b[a])) return !0
      })
    },
    closest: function (a, b) {
      for (var c, d = 0, e = this.length, f = [], g = w.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++)
        for (c = this[d]; c && c !== b; c = c.parentNode)
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
            f.push(c);
            break
          } return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f)
    },
    index: function (a) {
      return a ? "string" == typeof a ? h.call(n(a), this[0]) : h.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function (a, b) {
      return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))))
    },
    addBack: function (a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }
  });

  function F(a, b) {
    while ((a = a[b]) && 1 !== a.nodeType);
    return a
  }
  n.each({
    parent: function (a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null
    },
    parents: function (a) {
      return u(a, "parentNode")
    },
    parentsUntil: function (a, b, c) {
      return u(a, "parentNode", c)
    },
    next: function (a) {
      return F(a, "nextSibling")
    },
    prev: function (a) {
      return F(a, "previousSibling")
    },
    nextAll: function (a) {
      return u(a, "nextSibling")
    },
    prevAll: function (a) {
      return u(a, "previousSibling")
    },
    nextUntil: function (a, b, c) {
      return u(a, "nextSibling", c)
    },
    prevUntil: function (a, b, c) {
      return u(a, "previousSibling", c)
    },
    siblings: function (a) {
      return v((a.parentNode || {}).firstChild, a)
    },
    children: function (a) {
      return v(a.firstChild)
    },
    contents: function (a) {
      return a.contentDocument || n.merge([], a.childNodes)
    }
  }, function (a, b) {
    n.fn[a] = function (c, d) {
      var e = n.map(this, b, c);
      return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (E[a] || n.uniqueSort(e), D.test(a) && e.reverse()), this.pushStack(e)
    }
  });
  var G = /\S+/g;

  function H(a) {
    var b = {};
    return n.each(a.match(G) || [], function (a, c) {
      b[c] = !0
    }), b
  }
  n.Callbacks = function (a) {
    a = "string" == typeof a ? H(a) : n.extend({}, a);
    var b, c, d, e, f = [],
      g = [],
      h = -1,
      i = function () {
        for (e = a.once, d = b = !0; g.length; h = -1) {
          c = g.shift();
          while (++h < f.length) f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1)
        }
        a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
      },
      j = {
        add: function () {
          return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
            n.each(b, function (b, c) {
              n.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== n.type(c) && d(c)
            })
          }(arguments), c && !b && i()), this
        },
        remove: function () {
          return n.each(arguments, function (a, b) {
            var c;
            while ((c = n.inArray(b, f, c)) > -1) f.splice(c, 1), h >= c && h--
          }), this
        },
        has: function (a) {
          return a ? n.inArray(a, f) > -1 : f.length > 0
        },
        empty: function () {
          return f && (f = []), this
        },
        disable: function () {
          return e = g = [], f = c = "", this
        },
        disabled: function () {
          return !f
        },
        lock: function () {
          return e = g = [], c || (f = c = ""), this
        },
        locked: function () {
          return !!e
        },
        fireWith: function (a, c) {
          return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this
        },
        fire: function () {
          return j.fireWith(this, arguments), this
        },
        fired: function () {
          return !!d
        }
      };
    return j
  }, n.extend({
    Deferred: function (a) {
      var b = [
          ["resolve", "done", n.Callbacks("once memory"), "resolved"],
          ["reject", "fail", n.Callbacks("once memory"), "rejected"],
          ["notify", "progress", n.Callbacks("memory")]
        ],
        c = "pending",
        d = {
          state: function () {
            return c
          },
          always: function () {
            return e.done(arguments).fail(arguments), this
          },
          then: function () {
            var a = arguments;
            return n.Deferred(function (c) {
              n.each(b, function (b, f) {
                var g = n.isFunction(a[b]) && a[b];
                e[f[1]](function () {
                  var a = g && g.apply(this, arguments);
                  a && n.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                })
              }), a = null
            }).promise()
          },
          promise: function (a) {
            return null != a ? n.extend(a, d) : d
          }
        },
        e = {};
      return d.pipe = d.then, n.each(b, function (a, f) {
        var g = f[2],
          h = f[3];
        d[f[1]] = g.add, h && g.add(function () {
          c = h
        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
          return e[f[0] + "With"](this === e ? d : this, arguments), this
        }, e[f[0] + "With"] = g.fireWith
      }), d.promise(e), a && a.call(e, e), e
    },
    when: function (a) {
      var b = 0,
        c = e.call(arguments),
        d = c.length,
        f = 1 !== d || a && n.isFunction(a.promise) ? d : 0,
        g = 1 === f ? a : n.Deferred(),
        h = function (a, b, c) {
          return function (d) {
            b[a] = this, c[a] = arguments.length > 1 ? e.call(arguments) : d, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
          }
        },
        i, j, k;
      if (d > 1)
        for (i = new Array(d), j = new Array(d), k = new Array(d); d > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().progress(h(b, j, i)).done(h(b, k, c)).fail(g.reject) : --f;
      return f || g.resolveWith(k, c), g.promise()
    }
  });
  var I;
  n.fn.ready = function (a) {
    return n.ready.promise().done(a), this
  }, n.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function (a) {
      a ? n.readyWait++ : n.ready(!0)
    },
    ready: function (a) {
      (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(d, [n]), n.fn.triggerHandler && (n(d).triggerHandler("ready"), n(d).off("ready"))))
    }
  });

  function J() {
    d.removeEventListener("DOMContentLoaded", J), a.removeEventListener("load", J), n.ready()
  }
  n.ready.promise = function (b) {
    return I || (I = n.Deferred(), "complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(n.ready) : (d.addEventListener("DOMContentLoaded", J), a.addEventListener("load", J))), I.promise(b)
  }, n.ready.promise();
  var K = function (a, b, c, d, e, f, g) {
      var h = 0,
        i = a.length,
        j = null == c;
      if ("object" === n.type(c)) {
        e = !0;
        for (h in c) K(a, b, h, c[h], !0, f, g)
      } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
          return j.call(n(a), c)
        })), b))
        for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    },
    L = function (a) {
      return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    };

  function M() {
    this.expando = n.expando + M.uid++
  }
  M.uid = 1, M.prototype = {
    register: function (a, b) {
      var c = b || {};
      return a.nodeType ? a[this.expando] = c : Object.defineProperty(a, this.expando, {
        value: c,
        writable: !0,
        configurable: !0
      }), a[this.expando]
    },
    cache: function (a) {
      if (!L(a)) return {};
      var b = a[this.expando];
      return b || (b = {}, L(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
        value: b,
        configurable: !0
      }))), b
    },
    set: function (a, b, c) {
      var d, e = this.cache(a);
      if ("string" == typeof b) e[b] = c;
      else
        for (d in b) e[d] = b[d];
      return e
    },
    get: function (a, b) {
      return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][b]
    },
    access: function (a, b, c) {
      var d;
      return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
    },
    remove: function (a, b) {
      var c, d, e, f = a[this.expando];
      if (void 0 !== f) {
        if (void 0 === b) this.register(a);
        else {
          n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in f ? d = [b, e] : (d = e, d = d in f ? [d] : d.match(G) || [])), c = d.length;
          while (c--) delete f[d[c]]
        }(void 0 === b || n.isEmptyObject(f)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
      }
    },
    hasData: function (a) {
      var b = a[this.expando];
      return void 0 !== b && !n.isEmptyObject(b)
    }
  };
  var N = new M,
    O = new M,
    P = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Q = /[A-Z]/g;

  function R(a, b, c) {
    var d;
    if (void 0 === c && 1 === a.nodeType)
      if (d = "data-" + b.replace(Q, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
        try {
          c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : P.test(c) ? n.parseJSON(c) : c;
        } catch (e) {}
        O.set(a, b, c)
      } else c = void 0;
    return c
  }
  n.extend({
    hasData: function (a) {
      return O.hasData(a) || N.hasData(a)
    },
    data: function (a, b, c) {
      return O.access(a, b, c)
    },
    removeData: function (a, b) {
      O.remove(a, b)
    },
    _data: function (a, b, c) {
      return N.access(a, b, c)
    },
    _removeData: function (a, b) {
      N.remove(a, b)
    }
  }), n.fn.extend({
    data: function (a, b) {
      var c, d, e, f = this[0],
        g = f && f.attributes;
      if (void 0 === a) {
        if (this.length && (e = O.get(f), 1 === f.nodeType && !N.get(f, "hasDataAttrs"))) {
          c = g.length;
          while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), R(f, d, e[d])));
          N.set(f, "hasDataAttrs", !0)
        }
        return e
      }
      return "object" == typeof a ? this.each(function () {
        O.set(this, a)
      }) : K(this, function (b) {
        var c, d;
        if (f && void 0 === b) {
          if (c = O.get(f, a) || O.get(f, a.replace(Q, "-$&").toLowerCase()), void 0 !== c) return c;
          if (d = n.camelCase(a), c = O.get(f, d), void 0 !== c) return c;
          if (c = R(f, d, void 0), void 0 !== c) return c
        } else d = n.camelCase(a), this.each(function () {
          var c = O.get(this, d);
          O.set(this, d, b), a.indexOf("-") > -1 && void 0 !== c && O.set(this, a, b)
        })
      }, null, b, arguments.length > 1, null, !0)
    },
    removeData: function (a) {
      return this.each(function () {
        O.remove(this, a)
      })
    }
  }), n.extend({
    queue: function (a, b, c) {
      var d;
      return a ? (b = (b || "fx") + "queue", d = N.get(a, b), c && (!d || n.isArray(c) ? d = N.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0
    },
    dequeue: function (a, b) {
      b = b || "fx";
      var c = n.queue(a, b),
        d = c.length,
        e = c.shift(),
        f = n._queueHooks(a, b),
        g = function () {
          n.dequeue(a, b)
        };
      "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
    },
    _queueHooks: function (a, b) {
      var c = b + "queueHooks";
      return N.get(a, c) || N.access(a, c, {
        empty: n.Callbacks("once memory").add(function () {
          N.remove(a, [b + "queue", c])
        })
      })
    }
  }), n.fn.extend({
    queue: function (a, b) {
      var c = 2;
      return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {
        var c = n.queue(this, a, b);
        n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a)
      })
    },
    dequeue: function (a) {
      return this.each(function () {
        n.dequeue(this, a)
      })
    },
    clearQueue: function (a) {
      return this.queue(a || "fx", [])
    },
    promise: function (a, b) {
      var c, d = 1,
        e = n.Deferred(),
        f = this,
        g = this.length,
        h = function () {
          --d || e.resolveWith(f, [f])
        };
      "string" != typeof a && (b = a, a = void 0), a = a || "fx";
      while (g--) c = N.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
      return h(), e.promise(b)
    }
  });
  var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    T = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
    U = ["Top", "Right", "Bottom", "Left"],
    V = function (a, b) {
      return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
    };

  function W(a, b, c, d) {
    var e, f = 1,
      g = 20,
      h = d ? function () {
        return d.cur()
      } : function () {
        return n.css(a, b, "")
      },
      i = h(),
      j = c && c[3] || (n.cssNumber[b] ? "" : "px"),
      k = (n.cssNumber[b] || "px" !== j && +i) && T.exec(n.css(a, b));
    if (k && k[3] !== j) {
      j = j || k[3], c = c || [], k = +i || 1;
      do f = f || ".5", k /= f, n.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
    }
    return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
  }
  var X = /^(?:checkbox|radio)$/i,
    Y = /<([\w:-]+)/,
    Z = /^$|\/(?:java|ecma)script/i,
    $ = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
  $.optgroup = $.option, $.tbody = $.tfoot = $.colgroup = $.caption = $.thead, $.th = $.td;

  function _(a, b) {
    var c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
    return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c
  }

  function aa(a, b) {
    for (var c = 0, d = a.length; d > c; c++) N.set(a[c], "globalEval", !b || N.get(b[c], "globalEval"))
  }
  var ba = /<|&#?\w+;/;

  function ca(a, b, c, d, e) {
    for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], o = 0, p = a.length; p > o; o++)
      if (f = a[o], f || 0 === f)
        if ("object" === n.type(f)) n.merge(m, f.nodeType ? [f] : f);
        else if (ba.test(f)) {
      g = g || l.appendChild(b.createElement("div")), h = (Y.exec(f) || ["", ""])[1].toLowerCase(), i = $[h] || $._default, g.innerHTML = i[1] + n.htmlPrefilter(f) + i[2], k = i[0];
      while (k--) g = g.lastChild;
      n.merge(m, g.childNodes), g = l.firstChild, g.textContent = ""
    } else m.push(b.createTextNode(f));
    l.textContent = "", o = 0;
    while (f = m[o++])
      if (d && n.inArray(f, d) > -1) e && e.push(f);
      else if (j = n.contains(f.ownerDocument, f), g = _(l.appendChild(f), "script"), j && aa(g), c) {
      k = 0;
      while (f = g[k++]) Z.test(f.type || "") && c.push(f)
    }
    return l
  }! function () {
    var a = d.createDocumentFragment(),
      b = a.appendChild(d.createElement("div")),
      c = d.createElement("input");
    c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), l.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
  }();
  var da = /^key/,
    ea = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    fa = /^([^.]*)(?:\.(.+)|)/;

  function ga() {
    return !0
  }

  function ha() {
    return !1
  }

  function ia() {
    try {
      return d.activeElement
    } catch (a) {}
  }

  function ja(a, b, c, d, e, f) {
    var g, h;
    if ("object" == typeof b) {
      "string" != typeof c && (d = d || c, c = void 0);
      for (h in b) ja(a, h, c, d, b[h], f);
      return a
    }
    if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = ha;
    else if (!e) return a;
    return 1 === f && (g = e, e = function (a) {
      return n().off(a), g.apply(this, arguments)
    }, e.guid = g.guid || (g.guid = n.guid++)), a.each(function () {
      n.event.add(this, b, e, d, c)
    })
  }
  n.event = {
    global: {},
    add: function (a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, o, p, q, r = N.get(a);
      if (r) {
        c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function (b) {
          return "undefined" != typeof n && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0
        }), b = (b || "").match(G) || [""], j = b.length;
        while (j--) h = fa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({
          type: o,
          origType: q,
          data: d,
          handler: c,
          guid: c.guid,
          selector: e,
          needsContext: e && n.expr.match.needsContext.test(e),
          namespace: p.join(".")
        }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0)
      }
    },
    remove: function (a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, o, p, q, r = N.hasData(a) && N.get(a);
      if (r && (i = r.events)) {
        b = (b || "").match(G) || [""], j = b.length;
        while (j--)
          if (h = fa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
            l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;
            while (f--) k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
            g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o])
          } else
            for (o in i) n.event.remove(a, o + b[j], c, d, !0);
        n.isEmptyObject(i) && N.remove(a, "handle events")
      }
    },
    dispatch: function (a) {
      a = n.event.fix(a);
      var b, c, d, f, g, h = [],
        i = e.call(arguments),
        j = (N.get(this, "events") || {})[a.type] || [],
        k = n.event.special[a.type] || {};
      if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
        h = n.event.handlers.call(this, a, j), b = 0;
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          a.currentTarget = f.elem, c = 0;
          while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped()) a.rnamespace && !a.rnamespace.test(g.namespace) || (a.handleObj = g, a.data = g.data, d = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()))
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result
      }
    },
    handlers: function (a, b) {
      var c, d, e, f, g = [],
        h = b.delegateCount,
        i = a.target;
      if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1))
        for (; i !== this; i = i.parentNode || this)
          if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
            for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) > -1 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
            d.length && g.push({
              elem: i,
              handlers: d
            })
          } return h < b.length && g.push({
        elem: this,
        handlers: b.slice(h)
      }), g
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function (a, b) {
        var c, e, f, g = b.button;
        return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || d, e = c.documentElement, f = c.body, a.pageX = b.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), a.which || void 0 === g || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
      }
    },
    fix: function (a) {
      if (a[n.expando]) return a;
      var b, c, e, f = a.type,
        g = a,
        h = this.fixHooks[f];
      h || (this.fixHooks[f] = h = ea.test(f) ? this.mouseHooks : da.test(f) ? this.keyHooks : {}), e = h.props ? this.props.concat(h.props) : this.props, a = new n.Event(g), b = e.length;
      while (b--) c = e[b], a[c] = g[c];
      return a.target || (a.target = d), 3 === a.target.nodeType && (a.target = a.target.parentNode), h.filter ? h.filter(a, g) : a
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function () {
          return this !== ia() && this.focus ? (this.focus(), !1) : void 0
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function () {
          return this === ia() && this.blur ? (this.blur(), !1) : void 0
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function () {
          return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0
        },
        _default: function (a) {
          return n.nodeName(a.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function (a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
        }
      }
    }
  }, n.removeEvent = function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c)
  }, n.Event = function (a, b) {
    return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ga : ha) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void(this[n.expando] = !0)) : new n.Event(a, b)
  }, n.Event.prototype = {
    constructor: n.Event,
    isDefaultPrevented: ha,
    isPropagationStopped: ha,
    isImmediatePropagationStopped: ha,
    isSimulated: !1,
    preventDefault: function () {
      var a = this.originalEvent;
      this.isDefaultPrevented = ga, a && !this.isSimulated && a.preventDefault()
    },
    stopPropagation: function () {
      var a = this.originalEvent;
      this.isPropagationStopped = ga, a && !this.isSimulated && a.stopPropagation()
    },
    stopImmediatePropagation: function () {
      var a = this.originalEvent;
      this.isImmediatePropagationStopped = ga, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation()
    }
  }, n.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (a, b) {
    n.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function (a) {
        var c, d = this,
          e = a.relatedTarget,
          f = a.handleObj;
        return e && (e === d || n.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
      }
    }
  }), n.fn.extend({
    on: function (a, b, c, d) {
      return ja(this, a, b, c, d)
    },
    one: function (a, b, c, d) {
      return ja(this, a, b, c, d, 1)
    },
    off: function (a, b, c) {
      var d, e;
      if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
      if ("object" == typeof a) {
        for (e in a) this.off(e, b, a[e]);
        return this
      }
      return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = ha), this.each(function () {
        n.event.remove(this, a, c, b)
      })
    }
  });
  var ka = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
    la = /<script|<style|<link/i,
    ma = /checked\s*(?:[^=]|=\s*.checked.)/i,
    na = /^true\/(.*)/,
    oa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

  function pa(a, b) {
    return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
  }

  function qa(a) {
    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
  }

  function ra(a) {
    var b = na.exec(a.type);
    return b ? a.type = b[1] : a.removeAttribute("type"), a
  }

  function sa(a, b) {
    var c, d, e, f, g, h, i, j;
    if (1 === b.nodeType) {
      if (N.hasData(a) && (f = N.access(a), g = N.set(b, f), j = f.events)) {
        delete g.handle, g.events = {};
        for (e in j)
          for (c = 0, d = j[e].length; d > c; c++) n.event.add(b, e, j[e][c])
      }
      O.hasData(a) && (h = O.access(a), i = n.extend({}, h), O.set(b, i))
    }
  }

  function ta(a, b) {
    var c = b.nodeName.toLowerCase();
    "input" === c && X.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
  }

  function ua(a, b, c, d) {
    b = f.apply([], b);
    var e, g, h, i, j, k, m = 0,
      o = a.length,
      p = o - 1,
      q = b[0],
      r = n.isFunction(q);
    if (r || o > 1 && "string" == typeof q && !l.checkClone && ma.test(q)) return a.each(function (e) {
      var f = a.eq(e);
      r && (b[0] = q.call(this, e, f.html())), ua(f, b, c, d)
    });
    if (o && (e = ca(b, a[0].ownerDocument, !1, a, d), g = e.firstChild, 1 === e.childNodes.length && (e = g), g || d)) {
      for (h = n.map(_(e, "script"), qa), i = h.length; o > m; m++) j = e, m !== p && (j = n.clone(j, !0, !0), i && n.merge(h, _(j, "script"))), c.call(a[m], j, m);
      if (i)
        for (k = h[h.length - 1].ownerDocument, n.map(h, ra), m = 0; i > m; m++) j = h[m], Z.test(j.type || "") && !N.access(j, "globalEval") && n.contains(k, j) && (j.src ? n._evalUrl && n._evalUrl(j.src) : n.globalEval(j.textContent.replace(oa, "")))
    }
    return a
  }

  function va(a, b, c) {
    for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || n.cleanData(_(d)), d.parentNode && (c && n.contains(d.ownerDocument, d) && aa(_(d, "script")), d.parentNode.removeChild(d));
    return a
  }
  n.extend({
    htmlPrefilter: function (a) {
      return a.replace(ka, "<$1></$2>")
    },
    clone: function (a, b, c) {
      var d, e, f, g, h = a.cloneNode(!0),
        i = n.contains(a.ownerDocument, a);
      if (!(l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
        for (g = _(h), f = _(a), d = 0, e = f.length; e > d; d++) ta(f[d], g[d]);
      if (b)
        if (c)
          for (f = f || _(a), g = g || _(h), d = 0, e = f.length; e > d; d++) sa(f[d], g[d]);
        else sa(a, h);
      return g = _(h, "script"), g.length > 0 && aa(g, !i && _(a, "script")), h
    },
    cleanData: function (a) {
      for (var b, c, d, e = n.event.special, f = 0; void 0 !== (c = a[f]); f++)
        if (L(c)) {
          if (b = c[N.expando]) {
            if (b.events)
              for (d in b.events) e[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
            c[N.expando] = void 0
          }
          c[O.expando] && (c[O.expando] = void 0)
        }
    }
  }), n.fn.extend({
    domManip: ua,
    detach: function (a) {
      return va(this, a, !0)
    },
    remove: function (a) {
      return va(this, a)
    },
    text: function (a) {
      return K(this, function (a) {
        return void 0 === a ? n.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
        })
      }, null, a, arguments.length)
    },
    append: function () {
      return ua(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = pa(this, a);
          b.appendChild(a)
        }
      })
    },
    prepend: function () {
      return ua(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = pa(this, a);
          b.insertBefore(a, b.firstChild)
        }
      })
    },
    before: function () {
      return ua(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this)
      })
    },
    after: function () {
      return ua(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
      })
    },
    empty: function () {
      for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (n.cleanData(_(a, !1)), a.textContent = "");
      return this
    },
    clone: function (a, b) {
      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
        return n.clone(this, a, b)
      })
    },
    html: function (a) {
      return K(this, function (a) {
        var b = this[0] || {},
          c = 0,
          d = this.length;
        if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
        if ("string" == typeof a && !la.test(a) && !$[(Y.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = n.htmlPrefilter(a);
          try {
            for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(_(b, !1)), b.innerHTML = a);
            b = 0
          } catch (e) {}
        }
        b && this.empty().append(a)
      }, null, a, arguments.length)
    },
    replaceWith: function () {
      var a = [];
      return ua(this, arguments, function (b) {
        var c = this.parentNode;
        n.inArray(this, a) < 0 && (n.cleanData(_(this)), c && c.replaceChild(b, this))
      }, a)
    }
  }), n.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (a, b) {
    n.fn[a] = function (a) {
      for (var c, d = [], e = n(a), f = e.length - 1, h = 0; f >= h; h++) c = h === f ? this : this.clone(!0), n(e[h])[b](c), g.apply(d, c.get());
      return this.pushStack(d)
    }
  });
  var wa, xa = {
    HTML: "block",
    BODY: "block"
  };

  function ya(a, b) {
    var c = n(b.createElement(a)).appendTo(b.body),
      d = n.css(c[0], "display");
    return c.detach(), d
  }

  function za(a) {
    var b = d,
      c = xa[a];
    return c || (c = ya(a, b), "none" !== c && c || (wa = (wa || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = wa[0].contentDocument, b.write(), b.close(), c = ya(a, b), wa.detach()), xa[a] = c), c
  }
  var Aa = /^margin/,
    Ba = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
    Ca = function (b) {
      var c = b.ownerDocument.defaultView;
      return c && c.opener || (c = a), c.getComputedStyle(b)
    },
    Da = function (a, b, c, d) {
      var e, f, g = {};
      for (f in b) g[f] = a.style[f], a.style[f] = b[f];
      e = c.apply(a, d || []);
      for (f in b) a.style[f] = g[f];
      return e
    },
    Ea = d.documentElement;
  ! function () {
    var b, c, e, f, g = d.createElement("div"),
      h = d.createElement("div");
    if (h.style) {
      h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", g.appendChild(h);

      function i() {
        h.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", h.innerHTML = "", Ea.appendChild(g);
        var d = a.getComputedStyle(h);
        b = "1%" !== d.top, f = "2px" === d.marginLeft, c = "4px" === d.width, h.style.marginRight = "50%", e = "4px" === d.marginRight, Ea.removeChild(g)
      }
      n.extend(l, {
        pixelPosition: function () {
          return i(), b
        },
        boxSizingReliable: function () {
          return null == c && i(), c
        },
        pixelMarginRight: function () {
          return null == c && i(), e
        },
        reliableMarginLeft: function () {
          return null == c && i(), f
        },
        reliableMarginRight: function () {
          var b, c = h.appendChild(d.createElement("div"));
          return c.style.cssText = h.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", h.style.width = "1px", Ea.appendChild(g), b = !parseFloat(a.getComputedStyle(c).marginRight), Ea.removeChild(g), h.removeChild(c), b
        }
      })
    }
  }();

  function Fa(a, b, c) {
    var d, e, f, g, h = a.style;
    return c = c || Ca(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, "" !== g && void 0 !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), c && !l.pixelMarginRight() && Ba.test(g) && Aa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f), void 0 !== g ? g + "" : g
  }

  function Ga(a, b) {
    return {
      get: function () {
        return a() ? void delete this.get : (this.get = b).apply(this, arguments)
      }
    }
  }
  var Ha = /^(none|table(?!-c[ea]).+)/,
    Ia = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    Ja = {
      letterSpacing: "0",
      fontWeight: "400"
    },
    Ka = ["Webkit", "O", "Moz", "ms"],
    La = d.createElement("div").style;

  function Ma(a) {
    if (a in La) return a;
    var b = a[0].toUpperCase() + a.slice(1),
      c = Ka.length;
    while (c--)
      if (a = Ka[c] + b, a in La) return a
  }

  function Na(a, b, c) {
    var d = T.exec(b);
    return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b
  }

  function Oa(a, b, c, d, e) {
    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + U[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + U[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + U[f] + "Width", !0, e))) : (g += n.css(a, "padding" + U[f], !0, e), "padding" !== c && (g += n.css(a, "border" + U[f] + "Width", !0, e)));
    return g
  }

  function Pa(a, b, c) {
    var d = !0,
      e = "width" === b ? a.offsetWidth : a.offsetHeight,
      f = Ca(a),
      g = "border-box" === n.css(a, "boxSizing", !1, f);
    if (0 >= e || null == e) {
      if (e = Fa(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ba.test(e)) return e;
      d = g && (l.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
    }
    return e + Oa(a, b, c || (g ? "border" : "content"), d, f) + "px"
  }

  function Qa(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = N.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && V(d) && (f[g] = N.access(d, "olddisplay", za(d.nodeName)))) : (e = V(d), "none" === c && e || N.set(d, "olddisplay", e ? c : n.css(d, "display"))));
    for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
    return a
  }
  n.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = Fa(a, "opacity");
            return "" === c ? "1" : c
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": "cssFloat"
    },
    style: function (a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e, f, g, h = n.camelCase(b),
          i = a.style;
        return b = n.cssProps[h] || (n.cssProps[h] = Ma(h) || h), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = T.exec(c)) && e[1] && (c = W(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (n.cssNumber[h] ? "" : "px")), l.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
      }
    },
    css: function (a, b, c, d) {
      var e, f, g, h = n.camelCase(b);
      return b = n.cssProps[h] || (n.cssProps[h] = Ma(h) || h), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Fa(a, b, d)), "normal" === e && b in Ja && (e = Ja[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e
    }
  }), n.each(["height", "width"], function (a, b) {
    n.cssHooks[b] = {
      get: function (a, c, d) {
        return c ? Ha.test(n.css(a, "display")) && 0 === a.offsetWidth ? Da(a, Ia, function () {
          return Pa(a, b, d)
        }) : Pa(a, b, d) : void 0
      },
      set: function (a, c, d) {
        var e, f = d && Ca(a),
          g = d && Oa(a, b, d, "border-box" === n.css(a, "boxSizing", !1, f), f);
        return g && (e = T.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = n.css(a, b)), Na(a, c, g)
      }
    }
  }), n.cssHooks.marginLeft = Ga(l.reliableMarginLeft, function (a, b) {
    return b ? (parseFloat(Fa(a, "marginLeft")) || a.getBoundingClientRect().left - Da(a, {
      marginLeft: 0
    }, function () {
      return a.getBoundingClientRect().left
    })) + "px" : void 0
  }), n.cssHooks.marginRight = Ga(l.reliableMarginRight, function (a, b) {
    return b ? Da(a, {
      display: "inline-block"
    }, Fa, [a, "marginRight"]) : void 0
  }), n.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (a, b) {
    n.cssHooks[a + b] = {
      expand: function (c) {
        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + U[d] + b] = f[d] || f[d - 2] || f[0];
        return e
      }
    }, Aa.test(a) || (n.cssHooks[a + b].set = Na)
  }), n.fn.extend({
    css: function (a, b) {
      return K(this, function (a, b, c) {
        var d, e, f = {},
          g = 0;
        if (n.isArray(b)) {
          for (d = Ca(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);
          return f
        }
        return void 0 !== c ? n.style(a, b, c) : n.css(a, b)
      }, a, b, arguments.length > 1)
    },
    show: function () {
      return Qa(this, !0)
    },
    hide: function () {
      return Qa(this)
    },
    toggle: function (a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
        V(this) ? n(this).show() : n(this).hide()
      })
    }
  });

  function Ra(a, b, c, d, e) {
    return new Ra.prototype.init(a, b, c, d, e)
  }
  n.Tween = Ra, Ra.prototype = {
    constructor: Ra,
    init: function (a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || n.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px")
    },
    cur: function () {
      var a = Ra.propHooks[this.prop];
      return a && a.get ? a.get(this) : Ra.propHooks._default.get(this)
    },
    run: function (a) {
      var b, c = Ra.propHooks[this.prop];
      return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Ra.propHooks._default.set(this), this
    }
  }, Ra.prototype.init.prototype = Ra.prototype, Ra.propHooks = {
    _default: {
      get: function (a) {
        var b;
        return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
      },
      set: function (a) {
        n.fx.step[a.prop] ? n.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop] ? a.elem[a.prop] = a.now : n.style(a.elem, a.prop, a.now + a.unit)
      }
    }
  }, Ra.propHooks.scrollTop = Ra.propHooks.scrollLeft = {
    set: function (a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
    }
  }, n.easing = {
    linear: function (a) {
      return a
    },
    swing: function (a) {
      return .5 - Math.cos(a * Math.PI) / 2
    },
    _default: "swing"
  }, n.fx = Ra.prototype.init, n.fx.step = {};
  var Sa, Ta, Ua = /^(?:toggle|show|hide)$/,
    Va = /queueHooks$/;

  function Wa() {
    return a.setTimeout(function () {
      Sa = void 0
    }), Sa = n.now()
  }

  function Xa(a, b) {
    var c, d = 0,
      e = {
        height: a
      };
    for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = U[d], e["margin" + c] = e["padding" + c] = a;
    return b && (e.opacity = e.width = a), e
  }

  function Ya(a, b, c) {
    for (var d, e = (_a.tweeners[b] || []).concat(_a.tweeners["*"]), f = 0, g = e.length; g > f; f++)
      if (d = e[f].call(c, b, a)) return d
  }

  function Za(a, b, c) {
    var d, e, f, g, h, i, j, k, l = this,
      m = {},
      o = a.style,
      p = a.nodeType && V(a),
      q = N.get(a, "fxshow");
    c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
      h.unqueued || i()
    }), h.unqueued++, l.always(function () {
      l.always(function () {
        h.unqueued--, n.queue(a, "fx").length || h.empty.fire()
      })
    })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? N.get(a, "olddisplay") || za(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function () {
      o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
    }));
    for (d in b)
      if (e = b[d], Ua.exec(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
          if ("show" !== e || !q || void 0 === q[d]) continue;
          p = !0
        }
        m[d] = q && q[d] || n.style(a, d)
      } else j = void 0;
    if (n.isEmptyObject(m)) "inline" === ("none" === j ? za(a.nodeName) : j) && (o.display = j);
    else {
      q ? "hidden" in q && (p = q.hidden) : q = N.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function () {
        n(a).hide()
      }), l.done(function () {
        var b;
        N.remove(a, "fxshow");
        for (b in m) n.style(a, b, m[b])
      });
      for (d in m) g = Ya(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
    }
  }

  function $a(a, b) {
    var c, d, e, f, g;
    for (c in a)
      if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];
        for (c in f) c in a || (a[c] = f[c], b[c] = e)
      } else b[d] = e
  }

  function _a(a, b, c) {
    var d, e, f = 0,
      g = _a.prefilters.length,
      h = n.Deferred().always(function () {
        delete i.elem
      }),
      i = function () {
        if (e) return !1;
        for (var b = Sa || Wa(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
        return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
      },
      j = h.promise({
        elem: a,
        props: n.extend({}, b),
        opts: n.extend(!0, {
          specialEasing: {},
          easing: n.easing._default
        }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: Sa || Wa(),
        duration: c.duration,
        tweens: [],
        createTween: function (b, c) {
          var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
          return j.tweens.push(d), d
        },
        stop: function (b) {
          var c = 0,
            d = b ? j.tweens.length : 0;
          if (e) return this;
          for (e = !0; d > c; c++) j.tweens[c].run(1);
          return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
        }
      }),
      k = j.props;
    for ($a(k, j.opts.specialEasing); g > f; f++)
      if (d = _a.prefilters[f].call(j, a, k, j.opts)) return n.isFunction(d.stop) && (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)), d;
    return n.map(k, Ya, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
      elem: a,
      anim: j,
      queue: j.opts.queue
    })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
  }
  n.Animation = n.extend(_a, {
      tweeners: {
        "*": [function (a, b) {
          var c = this.createTween(a, b);
          return W(c.elem, a, T.exec(b), c), c
        }]
      },
      tweener: function (a, b) {
        n.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(G);
        for (var c, d = 0, e = a.length; e > d; d++) c = a[d], _a.tweeners[c] = _a.tweeners[c] || [], _a.tweeners[c].unshift(b)
      },
      prefilters: [Za],
      prefilter: function (a, b) {
        b ? _a.prefilters.unshift(a) : _a.prefilters.push(a)
      }
    }), n.speed = function (a, b, c) {
      var d = a && "object" == typeof a ? n.extend({}, a) : {
        complete: c || !c && b || n.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !n.isFunction(b) && b
      };
      return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
        n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue)
      }, d
    }, n.fn.extend({
      fadeTo: function (a, b, c, d) {
        return this.filter(V).css("opacity", 0).show().end().animate({
          opacity: b
        }, a, c, d)
      },
      animate: function (a, b, c, d) {
        var e = n.isEmptyObject(a),
          f = n.speed(b, c, d),
          g = function () {
            var b = _a(this, n.extend({}, a), f);
            (e || N.get(this, "finish")) && b.stop(!0)
          };
        return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
      },
      stop: function (a, b, c) {
        var d = function (a) {
          var b = a.stop;
          delete a.stop, b(c)
        };
        return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
          var b = !0,
            e = null != a && a + "queueHooks",
            f = n.timers,
            g = N.get(this);
          if (e) g[e] && g[e].stop && d(g[e]);
          else
            for (e in g) g[e] && g[e].stop && Va.test(e) && d(g[e]);
          for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
          !b && c || n.dequeue(this, a)
        })
      },
      finish: function (a) {
        return a !== !1 && (a = a || "fx"), this.each(function () {
          var b, c = N.get(this),
            d = c[a + "queue"],
            e = c[a + "queueHooks"],
            f = n.timers,
            g = d ? d.length : 0;
          for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
          for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
          delete c.finish
        })
      }
    }), n.each(["toggle", "show", "hide"], function (a, b) {
      var c = n.fn[b];
      n.fn[b] = function (a, d, e) {
        return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Xa(b, !0), a, d, e)
      }
    }), n.each({
      slideDown: Xa("show"),
      slideUp: Xa("hide"),
      slideToggle: Xa("toggle"),
      fadeIn: {
        opacity: "show"
      },
      fadeOut: {
        opacity: "hide"
      },
      fadeToggle: {
        opacity: "toggle"
      }
    }, function (a, b) {
      n.fn[a] = function (a, c, d) {
        return this.animate(b, a, c, d)
      }
    }), n.timers = [], n.fx.tick = function () {
      var a, b = 0,
        c = n.timers;
      for (Sa = n.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
      c.length || n.fx.stop(), Sa = void 0
    }, n.fx.timer = function (a) {
      n.timers.push(a), a() ? n.fx.start() : n.timers.pop()
    }, n.fx.interval = 13, n.fx.start = function () {
      Ta || (Ta = a.setInterval(n.fx.tick, n.fx.interval))
    }, n.fx.stop = function () {
      a.clearInterval(Ta), Ta = null
    }, n.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    }, n.fn.delay = function (b, c) {
      return b = n.fx ? n.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
        var e = a.setTimeout(c, b);
        d.stop = function () {
          a.clearTimeout(e)
        }
      })
    },
    function () {
      var a = d.createElement("input"),
        b = d.createElement("select"),
        c = b.appendChild(d.createElement("option"));
      a.type = "checkbox", l.checkOn = "" !== a.value, l.optSelected = c.selected, b.disabled = !0, l.optDisabled = !c.disabled, a = d.createElement("input"), a.value = "t", a.type = "radio", l.radioValue = "t" === a.value
    }();
  var ab, bb = n.expr.attrHandle;
  n.fn.extend({
    attr: function (a, b) {
      return K(this, n.attr, a, b, arguments.length > 1)
    },
    removeAttr: function (a) {
      return this.each(function () {
        n.removeAttr(this, a)
      })
    }
  }), n.extend({
    attr: function (a, b, c) {
      var d, e, f = a.nodeType;
      if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? ab : void 0)), void 0 !== c ? null === c ? void n.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = n.find.attr(a, b), null == d ? void 0 : d))
    },
    attrHooks: {
      type: {
        set: function (a, b) {
          if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b
          }
        }
      }
    },
    removeAttr: function (a, b) {
      var c, d, e = 0,
        f = b && b.match(G);
      if (f && 1 === a.nodeType)
        while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
    }
  }), ab = {
    set: function (a, b, c) {
      return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c
    }
  }, n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
    var c = bb[b] || n.find.attr;
    bb[b] = function (a, b, d) {
      var e, f;
      return d || (f = bb[b], bb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, bb[b] = f), e
    }
  });
  var cb = /^(?:input|select|textarea|button)$/i,
    db = /^(?:a|area)$/i;
  n.fn.extend({
    prop: function (a, b) {
      return K(this, n.prop, a, b, arguments.length > 1)
    },
    removeProp: function (a) {
      return this.each(function () {
        delete this[n.propFix[a] || a]
      })
    }
  }), n.extend({
    prop: function (a, b, c) {
      var d, e, f = a.nodeType;
      if (3 !== f && 8 !== f && 2 !== f) return 1 === f && n.isXMLDoc(a) || (b = n.propFix[b] || b, e = n.propHooks[b]),
        void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
    },
    propHooks: {
      tabIndex: {
        get: function (a) {
          var b = n.find.attr(a, "tabindex");
          return b ? parseInt(b, 10) : cb.test(a.nodeName) || db.test(a.nodeName) && a.href ? 0 : -1
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }), l.optSelected || (n.propHooks.selected = {
    get: function (a) {
      var b = a.parentNode;
      return b && b.parentNode && b.parentNode.selectedIndex, null
    },
    set: function (a) {
      var b = a.parentNode;
      b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
    }
  }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    n.propFix[this.toLowerCase()] = this
  });
  var eb = /[\t\r\n\f]/g;

  function fb(a) {
    return a.getAttribute && a.getAttribute("class") || ""
  }
  n.fn.extend({
    addClass: function (a) {
      var b, c, d, e, f, g, h, i = 0;
      if (n.isFunction(a)) return this.each(function (b) {
        n(this).addClass(a.call(this, b, fb(this)))
      });
      if ("string" == typeof a && a) {
        b = a.match(G) || [];
        while (c = this[i++])
          if (e = fb(c), d = 1 === c.nodeType && (" " + e + " ").replace(eb, " ")) {
            g = 0;
            while (f = b[g++]) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
            h = n.trim(d), e !== h && c.setAttribute("class", h)
          }
      }
      return this
    },
    removeClass: function (a) {
      var b, c, d, e, f, g, h, i = 0;
      if (n.isFunction(a)) return this.each(function (b) {
        n(this).removeClass(a.call(this, b, fb(this)))
      });
      if (!arguments.length) return this.attr("class", "");
      if ("string" == typeof a && a) {
        b = a.match(G) || [];
        while (c = this[i++])
          if (e = fb(c), d = 1 === c.nodeType && (" " + e + " ").replace(eb, " ")) {
            g = 0;
            while (f = b[g++])
              while (d.indexOf(" " + f + " ") > -1) d = d.replace(" " + f + " ", " ");
            h = n.trim(d), e !== h && c.setAttribute("class", h)
          }
      }
      return this
    },
    toggleClass: function (a, b) {
      var c = typeof a;
      return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : n.isFunction(a) ? this.each(function (c) {
        n(this).toggleClass(a.call(this, c, fb(this), b), b)
      }) : this.each(function () {
        var b, d, e, f;
        if ("string" === c) {
          d = 0, e = n(this), f = a.match(G) || [];
          while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
        } else void 0 !== a && "boolean" !== c || (b = fb(this), b && N.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : N.get(this, "__className__") || ""))
      })
    },
    hasClass: function (a) {
      var b, c, d = 0;
      b = " " + a + " ";
      while (c = this[d++])
        if (1 === c.nodeType && (" " + fb(c) + " ").replace(eb, " ").indexOf(b) > -1) return !0;
      return !1
    }
  });
  var gb = /\r/g,
    hb = /[\x20\t\r\n\f]+/g;
  n.fn.extend({
    val: function (a) {
      var b, c, d, e = this[0]; {
        if (arguments.length) return d = n.isFunction(a), this.each(function (c) {
          var e;
          1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function (a) {
            return null == a ? "" : a + ""
          })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
        });
        if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(gb, "") : null == c ? "" : c)
      }
    }
  }), n.extend({
    valHooks: {
      option: {
        get: function (a) {
          var b = n.find.attr(a, "value");
          return null != b ? b : n.trim(n.text(a)).replace(hb, " ")
        }
      },
      select: {
        get: function (a) {
          for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
            if (c = d[i], (c.selected || i === e) && (l.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !n.nodeName(c.parentNode, "optgroup"))) {
              if (b = n(c).val(), f) return b;
              g.push(b)
            } return g
        },
        set: function (a, b) {
          var c, d, e = a.options,
            f = n.makeArray(b),
            g = e.length;
          while (g--) d = e[g], (d.selected = n.inArray(n.valHooks.option.get(d), f) > -1) && (c = !0);
          return c || (a.selectedIndex = -1), f
        }
      }
    }
  }), n.each(["radio", "checkbox"], function () {
    n.valHooks[this] = {
      set: function (a, b) {
        return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) > -1 : void 0
      }
    }, l.checkOn || (n.valHooks[this].get = function (a) {
      return null === a.getAttribute("value") ? "on" : a.value
    })
  });
  var ib = /^(?:focusinfocus|focusoutblur)$/;
  n.extend(n.event, {
    trigger: function (b, c, e, f) {
      var g, h, i, j, l, m, o, p = [e || d],
        q = k.call(b, "type") ? b.type : b,
        r = k.call(b, "namespace") ? b.namespace.split(".") : [];
      if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !ib.test(q + n.event.triggered) && (q.indexOf(".") > -1 && (r = q.split("."), q = r.shift(), r.sort()), l = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = f ? 2 : 3, b.namespace = r.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, f || !o.trigger || o.trigger.apply(e, c) !== !1)) {
        if (!f && !o.noBubble && !n.isWindow(e)) {
          for (j = o.delegateType || q, ib.test(j + q) || (h = h.parentNode); h; h = h.parentNode) p.push(h), i = h;
          i === (e.ownerDocument || d) && p.push(i.defaultView || i.parentWindow || a)
        }
        g = 0;
        while ((h = p[g++]) && !b.isPropagationStopped()) b.type = g > 1 ? j : o.bindType || q, m = (N.get(h, "events") || {})[b.type] && N.get(h, "handle"), m && m.apply(h, c), m = l && h[l], m && m.apply && L(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault());
        return b.type = q, f || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !L(e) || l && n.isFunction(e[q]) && !n.isWindow(e) && (i = e[l], i && (e[l] = null), n.event.triggered = q, e[q](), n.event.triggered = void 0, i && (e[l] = i)), b.result
      }
    },
    simulate: function (a, b, c) {
      var d = n.extend(new n.Event, c, {
        type: a,
        isSimulated: !0
      });
      n.event.trigger(d, null, b)
    }
  }), n.fn.extend({
    trigger: function (a, b) {
      return this.each(function () {
        n.event.trigger(a, b, this)
      })
    },
    triggerHandler: function (a, b) {
      var c = this[0];
      return c ? n.event.trigger(a, b, c, !0) : void 0
    }
  }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
    n.fn[b] = function (a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
    }
  }), n.fn.extend({
    hover: function (a, b) {
      return this.mouseenter(a).mouseleave(b || a)
    }
  }), l.focusin = "onfocusin" in a, l.focusin || n.each({
    focus: "focusin",
    blur: "focusout"
  }, function (a, b) {
    var c = function (a) {
      n.event.simulate(b, a.target, n.event.fix(a))
    };
    n.event.special[b] = {
      setup: function () {
        var d = this.ownerDocument || this,
          e = N.access(d, b);
        e || d.addEventListener(a, c, !0), N.access(d, b, (e || 0) + 1)
      },
      teardown: function () {
        var d = this.ownerDocument || this,
          e = N.access(d, b) - 1;
        e ? N.access(d, b, e) : (d.removeEventListener(a, c, !0), N.remove(d, b))
      }
    }
  });
  var jb = a.location,
    kb = n.now(),
    lb = /\?/;
  n.parseJSON = function (a) {
    return JSON.parse(a + "")
  }, n.parseXML = function (b) {
    var c;
    if (!b || "string" != typeof b) return null;
    try {
      c = (new a.DOMParser).parseFromString(b, "text/xml")
    } catch (d) {
      c = void 0
    }
    return c && !c.getElementsByTagName("parsererror").length || n.error("Invalid XML: " + b), c
  };
  var mb = /#.*$/,
    nb = /([?&])_=[^&]*/,
    ob = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    pb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    qb = /^(?:GET|HEAD)$/,
    rb = /^\/\//,
    sb = {},
    tb = {},
    ub = "*/".concat("*"),
    vb = d.createElement("a");
  vb.href = jb.href;

  function wb(a) {
    return function (b, c) {
      "string" != typeof b && (c = b, b = "*");
      var d, e = 0,
        f = b.toLowerCase().match(G) || [];
      if (n.isFunction(c))
        while (d = f[e++]) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
    }
  }

  function xb(a, b, c, d) {
    var e = {},
      f = a === tb;

    function g(h) {
      var i;
      return e[h] = !0, n.each(a[h] || [], function (a, h) {
        var j = h(b, c, d);
        return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
      }), i
    }
    return g(b.dataTypes[0]) || !e["*"] && g("*")
  }

  function yb(a, b) {
    var c, d, e = n.ajaxSettings.flatOptions || {};
    for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
    return d && n.extend(!0, a, d), a
  }

  function zb(a, b, c) {
    var d, e, f, g, h = a.contents,
      i = a.dataTypes;
    while ("*" === i[0]) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
    if (d)
      for (e in h)
        if (h[e] && h[e].test(d)) {
          i.unshift(e);
          break
        } if (i[0] in c) f = i[0];
    else {
      for (e in c) {
        if (!i[0] || a.converters[e + " " + i[0]]) {
          f = e;
          break
        }
        g || (g = e)
      }
      f = f || g
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
  }

  function Ab(a, b, c, d) {
    var e, f, g, h, i, j = {},
      k = a.dataTypes.slice();
    if (k[1])
      for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
    f = k.shift();
    while (f)
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
        if ("*" === f) f = i;
        else if ("*" !== i && i !== f) {
      if (g = j[i + " " + f] || j["* " + f], !g)
        for (e in j)
          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
            break
          } if (g !== !0)
        if (g && a["throws"]) b = g(b);
        else try {
          b = g(b)
        } catch (l) {
          return {
            state: "parsererror",
            error: g ? l : "No conversion from " + i + " to " + f
          }
        }
    }
    return {
      state: "success",
      data: b
    }
  }
  n.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: jb.href,
      type: "GET",
      isLocal: pb.test(jb.protocol),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": ub,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": n.parseJSON,
        "text xml": n.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function (a, b) {
      return b ? yb(yb(a, n.ajaxSettings), b) : yb(n.ajaxSettings, a)
    },
    ajaxPrefilter: wb(sb),
    ajaxTransport: wb(tb),
    ajax: function (b, c) {
      "object" == typeof b && (c = b, b = void 0), c = c || {};
      var e, f, g, h, i, j, k, l, m = n.ajaxSetup({}, c),
        o = m.context || m,
        p = m.context && (o.nodeType || o.jquery) ? n(o) : n.event,
        q = n.Deferred(),
        r = n.Callbacks("once memory"),
        s = m.statusCode || {},
        t = {},
        u = {},
        v = 0,
        w = "canceled",
        x = {
          readyState: 0,
          getResponseHeader: function (a) {
            var b;
            if (2 === v) {
              if (!h) {
                h = {};
                while (b = ob.exec(g)) h[b[1].toLowerCase()] = b[2]
              }
              b = h[a.toLowerCase()]
            }
            return null == b ? null : b
          },
          getAllResponseHeaders: function () {
            return 2 === v ? g : null
          },
          setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            return v || (a = u[c] = u[c] || a, t[a] = b), this
          },
          overrideMimeType: function (a) {
            return v || (m.mimeType = a), this
          },
          statusCode: function (a) {
            var b;
            if (a)
              if (2 > v)
                for (b in a) s[b] = [s[b], a[b]];
              else x.always(a[x.status]);
            return this
          },
          abort: function (a) {
            var b = a || w;
            return e && e.abort(b), z(0, b), this
          }
        };
      if (q.promise(x).complete = r.add, x.success = x.done, x.error = x.fail, m.url = ((b || m.url || jb.href) + "").replace(mb, "").replace(rb, jb.protocol + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = n.trim(m.dataType || "*").toLowerCase().match(G) || [""], null == m.crossDomain) {
        j = d.createElement("a");
        try {
          j.href = m.url, j.href = j.href, m.crossDomain = vb.protocol + "//" + vb.host != j.protocol + "//" + j.host
        } catch (y) {
          m.crossDomain = !0
        }
      }
      if (m.data && m.processData && "string" != typeof m.data && (m.data = n.param(m.data, m.traditional)), xb(sb, m, c, x), 2 === v) return x;
      k = n.event && m.global, k && 0 === n.active++ && n.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !qb.test(m.type), f = m.url, m.hasContent || (m.data && (f = m.url += (lb.test(f) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = nb.test(f) ? f.replace(nb, "$1_=" + kb++) : f + (lb.test(f) ? "&" : "?") + "_=" + kb++)), m.ifModified && (n.lastModified[f] && x.setRequestHeader("If-Modified-Since", n.lastModified[f]), n.etag[f] && x.setRequestHeader("If-None-Match", n.etag[f])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", m.contentType), x.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + ub + "; q=0.01" : "") : m.accepts["*"]);
      for (l in m.headers) x.setRequestHeader(l, m.headers[l]);
      if (m.beforeSend && (m.beforeSend.call(o, x, m) === !1 || 2 === v)) return x.abort();
      w = "abort";
      for (l in {
          success: 1,
          error: 1,
          complete: 1
        }) x[l](m[l]);
      if (e = xb(tb, m, c, x)) {
        if (x.readyState = 1, k && p.trigger("ajaxSend", [x, m]), 2 === v) return x;
        m.async && m.timeout > 0 && (i = a.setTimeout(function () {
          x.abort("timeout")
        }, m.timeout));
        try {
          v = 1, e.send(t, z)
        } catch (y) {
          if (!(2 > v)) throw y;
          z(-1, y)
        }
      } else z(-1, "No Transport");

      function z(b, c, d, h) {
        var j, l, t, u, w, y = c;
        2 !== v && (v = 2, i && a.clearTimeout(i), e = void 0, g = h || "", x.readyState = b > 0 ? 4 : 0, j = b >= 200 && 300 > b || 304 === b, d && (u = zb(m, x, d)), u = Ab(m, u, x, j), j ? (m.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (n.lastModified[f] = w), w = x.getResponseHeader("etag"), w && (n.etag[f] = w)), 204 === b || "HEAD" === m.type ? y = "nocontent" : 304 === b ? y = "notmodified" : (y = u.state, l = u.data, t = u.error, j = !t)) : (t = y, !b && y || (y = "error", 0 > b && (b = 0))), x.status = b, x.statusText = (c || y) + "", j ? q.resolveWith(o, [l, y, x]) : q.rejectWith(o, [x, y, t]), x.statusCode(s), s = void 0, k && p.trigger(j ? "ajaxSuccess" : "ajaxError", [x, m, j ? l : t]), r.fireWith(o, [x, y]), k && (p.trigger("ajaxComplete", [x, m]), --n.active || n.event.trigger("ajaxStop")))
      }
      return x
    },
    getJSON: function (a, b, c) {
      return n.get(a, b, c, "json")
    },
    getScript: function (a, b) {
      return n.get(a, void 0, b, "script")
    }
  }), n.each(["get", "post"], function (a, b) {
    n[b] = function (a, c, d, e) {
      return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax(n.extend({
        url: a,
        type: b,
        dataType: e,
        data: c,
        success: d
      }, n.isPlainObject(a) && a))
    }
  }), n._evalUrl = function (a) {
    return n.ajax({
      url: a,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      "throws": !0
    })
  }, n.fn.extend({
    wrapAll: function (a) {
      var b;
      return n.isFunction(a) ? this.each(function (b) {
        n(this).wrapAll(a.call(this, b))
      }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
        var a = this;
        while (a.firstElementChild) a = a.firstElementChild;
        return a
      }).append(this)), this)
    },
    wrapInner: function (a) {
      return n.isFunction(a) ? this.each(function (b) {
        n(this).wrapInner(a.call(this, b))
      }) : this.each(function () {
        var b = n(this),
          c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a)
      })
    },
    wrap: function (a) {
      var b = n.isFunction(a);
      return this.each(function (c) {
        n(this).wrapAll(b ? a.call(this, c) : a)
      })
    },
    unwrap: function () {
      return this.parent().each(function () {
        n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
      }).end()
    }
  }), n.expr.filters.hidden = function (a) {
    return !n.expr.filters.visible(a)
  }, n.expr.filters.visible = function (a) {
    return a.offsetWidth > 0 || a.offsetHeight > 0 || a.getClientRects().length > 0
  };
  var Bb = /%20/g,
    Cb = /\[\]$/,
    Db = /\r?\n/g,
    Eb = /^(?:submit|button|image|reset|file)$/i,
    Fb = /^(?:input|select|textarea|keygen)/i;

  function Gb(a, b, c, d) {
    var e;
    if (n.isArray(b)) n.each(b, function (b, e) {
      c || Cb.test(a) ? d(a, e) : Gb(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
    });
    else if (c || "object" !== n.type(b)) d(a, b);
    else
      for (e in b) Gb(a + "[" + e + "]", b[e], c, d)
  }
  n.param = function (a, b) {
    var c, d = [],
      e = function (a, b) {
        b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
      };
    if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function () {
      e(this.name, this.value)
    });
    else
      for (c in a) Gb(c, a[c], b, e);
    return d.join("&").replace(Bb, "+")
  }, n.fn.extend({
    serialize: function () {
      return n.param(this.serializeArray())
    },
    serializeArray: function () {
      return this.map(function () {
        var a = n.prop(this, "elements");
        return a ? n.makeArray(a) : this
      }).filter(function () {
        var a = this.type;
        return this.name && !n(this).is(":disabled") && Fb.test(this.nodeName) && !Eb.test(a) && (this.checked || !X.test(a))
      }).map(function (a, b) {
        var c = n(this).val();
        return null == c ? null : n.isArray(c) ? n.map(c, function (a) {
          return {
            name: b.name,
            value: a.replace(Db, "\r\n")
          }
        }) : {
          name: b.name,
          value: c.replace(Db, "\r\n")
        }
      }).get()
    }
  }), n.ajaxSettings.xhr = function () {
    try {
      return new a.XMLHttpRequest
    } catch (b) {}
  };
  var Hb = {
      0: 200,
      1223: 204
    },
    Ib = n.ajaxSettings.xhr();
  l.cors = !!Ib && "withCredentials" in Ib, l.ajax = Ib = !!Ib, n.ajaxTransport(function (b) {
    var c, d;
    return l.cors || Ib && !b.crossDomain ? {
      send: function (e, f) {
        var g, h = b.xhr();
        if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields)
          for (g in b.xhrFields) h[g] = b.xhrFields[g];
        b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
        for (g in e) h.setRequestHeader(g, e[g]);
        c = function (a) {
          return function () {
            c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Hb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {
              binary: h.response
            } : {
              text: h.responseText
            }, h.getAllResponseHeaders()))
          }
        }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function () {
          4 === h.readyState && a.setTimeout(function () {
            c && d()
          })
        }, c = c("abort");
        try {
          h.send(b.hasContent && b.data || null)
        } catch (i) {
          if (c) throw i
        }
      },
      abort: function () {
        c && c()
      }
    } : void 0
  }), n.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function (a) {
        return n.globalEval(a), a
      }
    }
  }), n.ajaxPrefilter("script", function (a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
  }), n.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var b, c;
      return {
        send: function (e, f) {
          b = n("<script>").prop({
            charset: a.scriptCharset,
            src: a.url
          }).on("load error", c = function (a) {
            b.remove(), c = null, a && f("error" === a.type ? 404 : 200, a.type)
          }), d.head.appendChild(b[0])
        },
        abort: function () {
          c && c()
        }
      }
    }
  });
  var Jb = [],
    Kb = /(=)\?(?=&|$)|\?\?/;
  n.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var a = Jb.pop() || n.expando + "_" + kb++;
      return this[a] = !0, a
    }
  }), n.ajaxPrefilter("json jsonp", function (b, c, d) {
    var e, f, g, h = b.jsonp !== !1 && (Kb.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Kb.test(b.data) && "data");
    return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Kb, "$1" + e) : b.jsonp !== !1 && (b.url += (lb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
      return g || n.error(e + " was not called"), g[0]
    }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
      g = arguments
    }, d.always(function () {
      void 0 === f ? n(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Jb.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0
    }), "script") : void 0
  }), n.parseHTML = function (a, b, c) {
    if (!a || "string" != typeof a) return null;
    "boolean" == typeof b && (c = b, b = !1), b = b || d;
    var e = x.exec(a),
      f = !c && [];
    return e ? [b.createElement(e[1])] : (e = ca([a], b, f), f && f.length && n(f).remove(), n.merge([], e.childNodes))
  };
  var Lb = n.fn.load;
  n.fn.load = function (a, b, c) {
    if ("string" != typeof a && Lb) return Lb.apply(this, arguments);
    var d, e, f, g = this,
      h = a.indexOf(" ");
    return h > -1 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({
      url: a,
      type: e || "GET",
      dataType: "html",
      data: b
    }).done(function (a) {
      f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a)
    }).always(c && function (a, b) {
      g.each(function () {
        c.apply(this, f || [a.responseText, b, a])
      })
    }), this
  }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
    n.fn[b] = function (a) {
      return this.on(b, a)
    }
  }), n.expr.filters.animated = function (a) {
    return n.grep(n.timers, function (b) {
      return a === b.elem
    }).length
  };

  function Mb(a) {
    return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
  }
  n.offset = {
    setOffset: function (a, b, c) {
      var d, e, f, g, h, i, j, k = n.css(a, "position"),
        l = n(a),
        m = {};
      "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
    }
  }, n.fn.extend({
    offset: function (a) {
      if (arguments.length) return void 0 === a ? this : this.each(function (b) {
        n.offset.setOffset(this, a, b)
      });
      var b, c, d = this[0],
        e = {
          top: 0,
          left: 0
        },
        f = d && d.ownerDocument;
      if (f) return b = f.documentElement, n.contains(b, d) ? (e = d.getBoundingClientRect(), c = Mb(f), {
        top: e.top + c.pageYOffset - b.clientTop,
        left: e.left + c.pageXOffset - b.clientLeft
      }) : e
    },
    position: function () {
      if (this[0]) {
        var a, b, c = this[0],
          d = {
            top: 0,
            left: 0
          };
        return "fixed" === n.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (d = a.offset()), d.top += n.css(a[0], "borderTopWidth", !0), d.left += n.css(a[0], "borderLeftWidth", !0)), {
          top: b.top - d.top - n.css(c, "marginTop", !0),
          left: b.left - d.left - n.css(c, "marginLeft", !0)
        }
      }
    },
    offsetParent: function () {
      return this.map(function () {
        var a = this.offsetParent;
        while (a && "static" === n.css(a, "position")) a = a.offsetParent;
        return a || Ea
      })
    }
  }), n.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (a, b) {
    var c = "pageYOffset" === b;
    n.fn[a] = function (d) {
      return K(this, function (a, d, e) {
        var f = Mb(a);
        return void 0 === e ? f ? f[b] : a[d] : void(f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e)
      }, a, d, arguments.length)
    }
  }), n.each(["top", "left"], function (a, b) {
    n.cssHooks[b] = Ga(l.pixelPosition, function (a, c) {
      return c ? (c = Fa(a, b), Ba.test(c) ? n(a).position()[b] + "px" : c) : void 0
    })
  }), n.each({
    Height: "height",
    Width: "width"
  }, function (a, b) {
    n.each({
      padding: "inner" + a,
      content: b,
      "": "outer" + a
    }, function (c, d) {
      n.fn[d] = function (d, e) {
        var f = arguments.length && (c || "boolean" != typeof d),
          g = c || (d === !0 || e === !0 ? "margin" : "border");
        return K(this, function (b, c, d) {
          var e;
          return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g)
        }, b, f ? d : void 0, f, null)
      }
    })
  }), n.fn.extend({
    bind: function (a, b, c) {
      return this.on(a, null, b, c)
    },
    unbind: function (a, b) {
      return this.off(a, null, b)
    },
    delegate: function (a, b, c, d) {
      return this.on(b, a, c, d)
    },
    undelegate: function (a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
    },
    size: function () {
      return this.length
    }
  }), n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
    return n
  });
  var Nb = a.jQuery,
    Ob = a.$;
  return n.noConflict = function (b) {
    return a.$ === n && (a.$ = Ob), b && a.jQuery === n && (a.jQuery = Nb), n
  }, b || (a.jQuery = a.$ = n), n
});

/*! jQuery UI - v1.9.2 - 2012-11-23
 * http://jqueryui.com
 * Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
  function i(t, n) {
    var r, i, o, u = t.nodeName.toLowerCase();
    return "area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap=#" + i + "]")[0], !!o && s(o))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && s(t)
  }

  function s(t) {
    return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function () {
      return e.css(this, "visibility") === "hidden"
    }).length
  }
  var n = 0,
    r = /^ui-id-\d+$/;
  e.ui = e.ui || {};
  if (e.ui.version) return;
  e.extend(e.ui, {
      version: "1.9.2",
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
      }
    }), e.fn.extend({
      _focus: e.fn.focus,
      focus: function (t, n) {
        return typeof t == "number" ? this.each(function () {
          var r = this;
          setTimeout(function () {
            e(r).focus(), n && n.call(r)
          }, t)
        }) : this._focus.apply(this, arguments)
      },
      scrollParent: function () {
        var t;
        return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function () {
          return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
        }).eq(0) : t = this.parents().filter(function () {
          return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
        }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
      },
      zIndex: function (n) {
        if (n !== t) return this.css("zIndex", n);
        if (this.length) {
          var r = e(this[0]),
            i, s;
          while (r.length && r[0] !== document) {
            i = r.css("position");
            if (i === "absolute" || i === "relative" || i === "fixed") {
              s = parseInt(r.css("zIndex"), 10);
              if (!isNaN(s) && s !== 0) return s
            }
            r = r.parent()
          }
        }
        return 0
      },
      uniqueId: function () {
        return this.each(function () {
          this.id || (this.id = "ui-id-" + ++n)
        })
      },
      removeUniqueId: function () {
        return this.each(function () {
          r.test(this.id) && e(this).removeAttr("id")
        })
      }
    }), e.extend(e.expr[":"], {
      data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
        return function (n) {
          return !!e.data(n, t)
        }
      }) : function (t, n, r) {
        return !!e.data(t, r[3])
      },
      focusable: function (t) {
        return i(t, !isNaN(e.attr(t, "tabindex")))
      },
      tabbable: function (t) {
        var n = e.attr(t, "tabindex"),
          r = isNaN(n);
        return (r || n >= 0) && i(t, !r)
      }
    }), e(function () {
      var t = document.body,
        n = t.appendChild(n = document.createElement("div"));
      n.offsetHeight, e.extend(n.style, {
        minHeight: "100px",
        height: "auto",
        padding: 0,
        borderWidth: 0
      }), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart" in n, t.removeChild(n).style.display = "none"
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (n, r) {
      function u(t, n, r, s) {
        return e.each(i, function () {
          n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
        }), n
      }
      var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
        s = r.toLowerCase(),
        o = {
          innerWidth: e.fn.innerWidth,
          innerHeight: e.fn.innerHeight,
          outerWidth: e.fn.outerWidth,
          outerHeight: e.fn.outerHeight
        };
      e.fn["inner" + r] = function (n) {
        return n === t ? o["inner" + r].call(this) : this.each(function () {
          e(this).css(s, u(this, n) + "px")
        })
      }, e.fn["outer" + r] = function (t, n) {
        return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function () {
          e(this).css(s, u(this, t, !0, n) + "px")
        })
      }
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (t) {
      return function (n) {
        return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
      }
    }(e.fn.removeData)),
    function () {
      var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
      e.ui.ie = t.length ? !0 : !1, e.ui.ie6 = parseFloat(t[1], 10) === 6
    }(), e.fn.extend({
      disableSelection: function () {
        return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
          e.preventDefault()
        })
      },
      enableSelection: function () {
        return this.unbind(".ui-disableSelection")
      }
    }), e.extend(e.ui, {
      plugin: {
        add: function (t, n, r) {
          var i, s = e.ui[t].prototype;
          for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
        },
        call: function (e, t, n) {
          var r, i = e.plugins[t];
          if (!i || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11) return;
          for (r = 0; r < i.length; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n)
        }
      },
      contains: e.contains,
      hasScroll: function (t, n) {
        if (e(t).css("overflow") === "hidden") return !1;
        var r = n && n === "left" ? "scrollLeft" : "scrollTop",
          i = !1;
        return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
      },
      isOverAxis: function (e, t, n) {
        return e > t && e < t + n
      },
      isOver: function (t, n, r, i, s, o) {
        return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
      }
    })
})(jQuery);
(function (e, t) {
  var n = 0,
    r = Array.prototype.slice,
    i = e.cleanData;
  e.cleanData = function (t) {
    for (var n = 0, r;
      (r = t[n]) != null; n++) try {
      e(r).triggerHandler("remove")
    } catch (s) {}
    i(t)
  }, e.widget = function (t, n, r) {
    var i, s, o, u, a = t.split(".")[0];
    t = t.split(".")[1], i = a + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function (t) {
      return !!e.data(t, i)
    }, e[a] = e[a] || {}, s = e[a][t], o = e[a][t] = function (e, t) {
      if (!this._createWidget) return new o(e, t);
      arguments.length && this._createWidget(e, t)
    }, e.extend(o, s, {
      version: r.version,
      _proto: e.extend({}, r),
      _childConstructors: []
    }), u = new n, u.options = e.widget.extend({}, u.options), e.each(r, function (t, i) {
      e.isFunction(i) && (r[t] = function () {
        var e = function () {
            return n.prototype[t].apply(this, arguments)
          },
          r = function (e) {
            return n.prototype[t].apply(this, e)
          };
        return function () {
          var t = this._super,
            n = this._superApply,
            s;
          return this._super = e, this._superApply = r, s = i.apply(this, arguments), this._super = t, this._superApply = n, s
        }
      }())
    }), o.prototype = e.widget.extend(u, {
      widgetEventPrefix: s ? u.widgetEventPrefix : t
    }, r, {
      constructor: o,
      namespace: a,
      widgetName: t,
      widgetBaseClass: i,
      widgetFullName: i
    }), s ? (e.each(s._childConstructors, function (t, n) {
      var r = n.prototype;
      e.widget(r.namespace + "." + r.widgetName, o, n._proto)
    }), delete s._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o)
  }, e.widget.extend = function (n) {
    var i = r.call(arguments, 1),
      s = 0,
      o = i.length,
      u, a;
    for (; s < o; s++)
      for (u in i[s]) a = i[s][u], i[s].hasOwnProperty(u) && a !== t && (e.isPlainObject(a) ? n[u] = e.isPlainObject(n[u]) ? e.widget.extend({}, n[u], a) : e.widget.extend({}, a) : n[u] = a);
    return n
  }, e.widget.bridge = function (n, i) {
    var s = i.prototype.widgetFullName || n;
    e.fn[n] = function (o) {
      var u = typeof o == "string",
        a = r.call(arguments, 1),
        f = this;
      return o = !u && a.length ? e.widget.extend.apply(null, [o].concat(a)) : o, u ? this.each(function () {
        var r, i = e.data(this, s);
        if (!i) return e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'");
        if (!e.isFunction(i[o]) || o.charAt(0) === "_") return e.error("no such method '" + o + "' for " + n + " widget instance");
        r = i[o].apply(i, a);
        if (r !== i && r !== t) return f = r && r.jquery ? f.pushStack(r.get()) : r, !1
      }) : this.each(function () {
        var t = e.data(this, s);
        t ? t.option(o || {})._init() : e.data(this, s, new i(o, this))
      }), f
    }
  }, e.Widget = function () {}, e.Widget._childConstructors = [], e.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {
      disabled: !1,
      create: null
    },
    _createWidget: function (t, r) {
      r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetName, this), e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
        remove: function (e) {
          e.target === r && this.destroy()
        }
      }), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
    },
    _getCreateOptions: e.noop,
    _getCreateEventData: e.noop,
    _create: e.noop,
    _init: e.noop,
    destroy: function () {
      this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
    },
    _destroy: e.noop,
    widget: function () {
      return this.element
    },
    option: function (n, r) {
      var i = n,
        s, o, u;
      if (arguments.length === 0) return e.widget.extend({}, this.options);
      if (typeof n == "string") {
        i = {}, s = n.split("."), n = s.shift();
        if (s.length) {
          o = i[n] = e.widget.extend({}, this.options[n]);
          for (u = 0; u < s.length - 1; u++) o[s[u]] = o[s[u]] || {}, o = o[s[u]];
          n = s.pop();
          if (r === t) return o[n] === t ? null : o[n];
          o[n] = r
        } else {
          if (r === t) return this.options[n] === t ? null : this.options[n];
          i[n] = r
        }
      }
      return this._setOptions(i), this
    },
    _setOptions: function (e) {
      var t;
      for (t in e) this._setOption(t, e[t]);
      return this
    },
    _setOption: function (e, t) {
      return this.options[e] = t, e === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
    },
    enable: function () {
      return this._setOption("disabled", !1)
    },
    disable: function () {
      return this._setOption("disabled", !0)
    },
    _on: function (t, n, r) {
      var i, s = this;
      typeof t != "boolean" && (r = n, n = t, t = !1), r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()), e.each(r, function (r, o) {
        function u() {
          if (!t && (s.options.disabled === !0 || e(this).hasClass("ui-state-disabled"))) return;
          return (typeof o == "string" ? s[o] : o).apply(s, arguments)
        }
        typeof o != "string" && (u.guid = o.guid = o.guid || u.guid || e.guid++);
        var a = r.match(/^(\w+)\s*(.*)$/),
          f = a[1] + s.eventNamespace,
          l = a[2];
        l ? i.delegate(l, f, u) : n.bind(f, u)
      })
    },
    _off: function (e, t) {
      t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
    },
    _delay: function (e, t) {
      function n() {
        return (typeof e == "string" ? r[e] : e).apply(r, arguments)
      }
      var r = this;
      return setTimeout(n, t || 0)
    },
    _hoverable: function (t) {
      this.hoverable = this.hoverable.add(t), this._on(t, {
        mouseenter: function (t) {
          e(t.currentTarget).addClass("ui-state-hover")
        },
        mouseleave: function (t) {
          e(t.currentTarget).removeClass("ui-state-hover")
        }
      })
    },
    _focusable: function (t) {
      this.focusable = this.focusable.add(t), this._on(t, {
        focusin: function (t) {
          e(t.currentTarget).addClass("ui-state-focus")
        },
        focusout: function (t) {
          e(t.currentTarget).removeClass("ui-state-focus")
        }
      })
    },
    _trigger: function (t, n, r) {
      var i, s, o = this.options[t];
      r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
      if (s)
        for (i in s) i in n || (n[i] = s[i]);
      return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
    }
  }, e.each({
    show: "fadeIn",
    hide: "fadeOut"
  }, function (t, n) {
    e.Widget.prototype["_" + t] = function (r, i, s) {
      typeof i == "string" && (i = {
        effect: i
      });
      var o, u = i ? i === !0 || typeof i == "number" ? n : i.effect || n : t;
      i = i || {}, typeof i == "number" && (i = {
        duration: i
      }), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && (e.effects.effect[u] || e.uiBackCompat !== !1 && e.effects[u]) ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function (n) {
        e(this)[t](), s && s.call(r[0]), n()
      })
    }
  }), e.uiBackCompat !== !1 && (e.Widget.prototype._getCreateOptions = function () {
    return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
  })
})(jQuery);
(function (e, t) {
  var n = !1;
  e(document).mouseup(function (e) {
    n = !1
  }), e.widget("ui.mouse", {
    version: "1.9.2",
    options: {
      cancel: "input,textarea,button,select,option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function () {
      var t = this;
      this.element.bind("mousedown." + this.widgetName, function (e) {
        return t._mouseDown(e)
      }).bind("click." + this.widgetName, function (n) {
        if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
      }), this.started = !1
    },
    _mouseDestroy: function () {
      this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    },
    _mouseDown: function (t) {
      if (n) return;
      this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
      var r = this,
        i = t.which === 1,
        s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
      if (!i || s || !this._mouseCapture(t)) return !0;
      this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
        r.mouseDelayMet = !0
      }, this.options.delay));
      if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
        this._mouseStarted = this._mouseStart(t) !== !1;
        if (!this._mouseStarted) return t.preventDefault(), !0
      }
      return !0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
        return r._mouseMove(e)
      }, this._mouseUpDelegate = function (e) {
        return r._mouseUp(e)
      }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
    },
    _mouseMove: function (t) {
      return !e.ui.ie || document.documentMode >= 9 || !!t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
    },
    _mouseUp: function (t) {
      return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
    },
    _mouseDistanceMet: function (e) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
    },
    _mouseDelayMet: function (e) {
      return this.mouseDelayMet
    },
    _mouseStart: function (e) {},
    _mouseDrag: function (e) {},
    _mouseStop: function (e) {},
    _mouseCapture: function (e) {
      return !0
    }
  })
})(jQuery);
(function (e, t) {
  function h(e, t, n) {
    return [parseInt(e[0], 10) * (l.test(e[0]) ? t / 100 : 1), parseInt(e[1], 10) * (l.test(e[1]) ? n / 100 : 1)]
  }

  function p(t, n) {
    return parseInt(e.css(t, n), 10) || 0
  }
  e.ui = e.ui || {};
  var n, r = Math.max,
    i = Math.abs,
    s = Math.round,
    o = /left|center|right/,
    u = /top|center|bottom/,
    a = /[\+\-]\d+%?/,
    f = /^\w+/,
    l = /%$/,
    c = e.fn.position;
  e.position = {
      scrollbarWidth: function () {
        if (n !== t) return n;
        var r, i, s = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
          o = s.children()[0];
        return e("body").append(s), r = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, r === i && (i = s[0].clientWidth), s.remove(), n = r - i
      },
      getScrollInfo: function (t) {
        var n = t.isWindow ? "" : t.element.css("overflow-x"),
          r = t.isWindow ? "" : t.element.css("overflow-y"),
          i = n === "scroll" || n === "auto" && t.width < t.element[0].scrollWidth,
          s = r === "scroll" || r === "auto" && t.height < t.element[0].scrollHeight;
        return {
          width: i ? e.position.scrollbarWidth() : 0,
          height: s ? e.position.scrollbarWidth() : 0
        }
      },
      getWithinInfo: function (t) {
        var n = e(t || window),
          r = e.isWindow(n[0]);
        return {
          element: n,
          isWindow: r,
          offset: n.offset() || {
            left: 0,
            top: 0
          },
          scrollLeft: n.scrollLeft(),
          scrollTop: n.scrollTop(),
          width: r ? n.width() : n.outerWidth(),
          height: r ? n.height() : n.outerHeight()
        }
      }
    }, e.fn.position = function (t) {
      if (!t || !t.of) return c.apply(this, arguments);
      t = e.extend({}, t);
      var n, l, d, v, m, g = e(t.of),
        y = e.position.getWithinInfo(t.within),
        b = e.position.getScrollInfo(y),
        w = g[0],
        E = (t.collision || "flip").split(" "),
        S = {};
      return w.nodeType === 9 ? (l = g.width(), d = g.height(), v = {
        top: 0,
        left: 0
      }) : e.isWindow(w) ? (l = g.width(), d = g.height(), v = {
        top: g.scrollTop(),
        left: g.scrollLeft()
      }) : w.preventDefault ? (t.at = "left top", l = d = 0, v = {
        top: w.pageY,
        left: w.pageX
      }) : (l = g.outerWidth(), d = g.outerHeight(), v = g.offset()), m = e.extend({}, v), e.each(["my", "at"], function () {
        var e = (t[this] || "").split(" "),
          n, r;
        e.length === 1 && (e = o.test(e[0]) ? e.concat(["center"]) : u.test(e[0]) ? ["center"].concat(e) : ["center", "center"]), e[0] = o.test(e[0]) ? e[0] : "center", e[1] = u.test(e[1]) ? e[1] : "center", n = a.exec(e[0]), r = a.exec(e[1]), S[this] = [n ? n[0] : 0, r ? r[0] : 0], t[this] = [f.exec(e[0])[0], f.exec(e[1])[0]]
      }), E.length === 1 && (E[1] = E[0]), t.at[0] === "right" ? m.left += l : t.at[0] === "center" && (m.left += l / 2), t.at[1] === "bottom" ? m.top += d : t.at[1] === "center" && (m.top += d / 2), n = h(S.at, l, d), m.left += n[0], m.top += n[1], this.each(function () {
        var o, u, a = e(this),
          f = a.outerWidth(),
          c = a.outerHeight(),
          w = p(this, "marginLeft"),
          x = p(this, "marginTop"),
          T = f + w + p(this, "marginRight") + b.width,
          N = c + x + p(this, "marginBottom") + b.height,
          C = e.extend({}, m),
          k = h(S.my, a.outerWidth(), a.outerHeight());
        t.my[0] === "right" ? C.left -= f : t.my[0] === "center" && (C.left -= f / 2), t.my[1] === "bottom" ? C.top -= c : t.my[1] === "center" && (C.top -= c / 2), C.left += k[0], C.top += k[1], e.support.offsetFractions || (C.left = s(C.left), C.top = s(C.top)), o = {
          marginLeft: w,
          marginTop: x
        }, e.each(["left", "top"], function (r, i) {
          e.ui.position[E[r]] && e.ui.position[E[r]][i](C, {
            targetWidth: l,
            targetHeight: d,
            elemWidth: f,
            elemHeight: c,
            collisionPosition: o,
            collisionWidth: T,
            collisionHeight: N,
            offset: [n[0] + k[0], n[1] + k[1]],
            my: t.my,
            at: t.at,
            within: y,
            elem: a
          })
        }), e.fn.bgiframe && a.bgiframe(), t.using && (u = function (e) {
          var n = v.left - C.left,
            s = n + l - f,
            o = v.top - C.top,
            u = o + d - c,
            h = {
              target: {
                element: g,
                left: v.left,
                top: v.top,
                width: l,
                height: d
              },
              element: {
                element: a,
                left: C.left,
                top: C.top,
                width: f,
                height: c
              },
              horizontal: s < 0 ? "left" : n > 0 ? "right" : "center",
              vertical: u < 0 ? "top" : o > 0 ? "bottom" : "middle"
            };
          l < f && i(n + s) < l && (h.horizontal = "center"), d < c && i(o + u) < d && (h.vertical = "middle"), r(i(n), i(s)) > r(i(o), i(u)) ? h.important = "horizontal" : h.important = "vertical", t.using.call(this, e, h)
        }), a.offset(e.extend(C, {
          using: u
        }))
      })
    }, e.ui.position = {
      fit: {
        left: function (e, t) {
          var n = t.within,
            i = n.isWindow ? n.scrollLeft : n.offset.left,
            s = n.width,
            o = e.left - t.collisionPosition.marginLeft,
            u = i - o,
            a = o + t.collisionWidth - s - i,
            f;
          t.collisionWidth > s ? u > 0 && a <= 0 ? (f = e.left + u + t.collisionWidth - s - i, e.left += u - f) : a > 0 && u <= 0 ? e.left = i : u > a ? e.left = i + s - t.collisionWidth : e.left = i : u > 0 ? e.left += u : a > 0 ? e.left -= a : e.left = r(e.left - o, e.left)
        },
        top: function (e, t) {
          var n = t.within,
            i = n.isWindow ? n.scrollTop : n.offset.top,
            s = t.within.height,
            o = e.top - t.collisionPosition.marginTop,
            u = i - o,
            a = o + t.collisionHeight - s - i,
            f;
          t.collisionHeight > s ? u > 0 && a <= 0 ? (f = e.top + u + t.collisionHeight - s - i, e.top += u - f) : a > 0 && u <= 0 ? e.top = i : u > a ? e.top = i + s - t.collisionHeight : e.top = i : u > 0 ? e.top += u : a > 0 ? e.top -= a : e.top = r(e.top - o, e.top)
        }
      },
      flip: {
        left: function (e, t) {
          var n = t.within,
            r = n.offset.left + n.scrollLeft,
            s = n.width,
            o = n.isWindow ? n.scrollLeft : n.offset.left,
            u = e.left - t.collisionPosition.marginLeft,
            a = u - o,
            f = u + t.collisionWidth - s - o,
            l = t.my[0] === "left" ? -t.elemWidth : t.my[0] === "right" ? t.elemWidth : 0,
            c = t.at[0] === "left" ? t.targetWidth : t.at[0] === "right" ? -t.targetWidth : 0,
            h = -2 * t.offset[0],
            p, d;
          if (a < 0) {
            p = e.left + l + c + h + t.collisionWidth - s - r;
            if (p < 0 || p < i(a)) e.left += l + c + h
          } else if (f > 0) {
            d = e.left - t.collisionPosition.marginLeft + l + c + h - o;
            if (d > 0 || i(d) < f) e.left += l + c + h
          }
        },
        top: function (e, t) {
          var n = t.within,
            r = n.offset.top + n.scrollTop,
            s = n.height,
            o = n.isWindow ? n.scrollTop : n.offset.top,
            u = e.top - t.collisionPosition.marginTop,
            a = u - o,
            f = u + t.collisionHeight - s - o,
            l = t.my[1] === "top",
            c = l ? -t.elemHeight : t.my[1] === "bottom" ? t.elemHeight : 0,
            h = t.at[1] === "top" ? t.targetHeight : t.at[1] === "bottom" ? -t.targetHeight : 0,
            p = -2 * t.offset[1],
            d, v;
          a < 0 ? (v = e.top + c + h + p + t.collisionHeight - s - r, e.top + c + h + p > a && (v < 0 || v < i(a)) && (e.top += c + h + p)) : f > 0 && (d = e.top - t.collisionPosition.marginTop + c + h + p - o, e.top + c + h + p > f && (d > 0 || i(d) < f) && (e.top += c + h + p))
        }
      },
      flipfit: {
        left: function () {
          e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
        },
        top: function () {
          e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
        }
      }
    },
    function () {
      var t, n, r, i, s, o = document.getElementsByTagName("body")[0],
        u = document.createElement("div");
      t = document.createElement(o ? "div" : "body"), r = {
        visibility: "hidden",
        width: 0,
        height: 0,
        border: 0,
        margin: 0,
        background: "none"
      }, o && e.extend(r, {
        position: "absolute",
        left: "-1000px",
        top: "-1000px"
      });
      for (s in r) t.style[s] = r[s];
      t.appendChild(u), n = o || document.documentElement, n.insertBefore(t, n.firstChild), u.style.cssText = "position: absolute; left: 10.7432222px;", i = e(u).offset().left, e.support.offsetFractions = i > 10 && i < 11, t.innerHTML = "", n.removeChild(t)
    }(), e.uiBackCompat !== !1 && function (e) {
      var n = e.fn.position;
      e.fn.position = function (r) {
        if (!r || !r.offset) return n.call(this, r);
        var i = r.offset.split(" "),
          s = r.at.split(" ");
        return i.length === 1 && (i[1] = i[0]), /^\d/.test(i[0]) && (i[0] = "+" + i[0]), /^\d/.test(i[1]) && (i[1] = "+" + i[1]), s.length === 1 && (/left|center|right/.test(s[0]) ? s[1] = "center" : (s[1] = s[0], s[0] = "center")), n.call(this, e.extend(r, {
          at: s[0] + i[0] + " " + s[1] + i[1],
          offset: t
        }))
      }
    }(jQuery)
})(jQuery);
(function (e, t) {
  e.widget("ui.draggable", e.ui.mouse, {
    version: "1.9.2",
    widgetEventPrefix: "drag",
    options: {
      addClasses: !0,
      appendTo: "parent",
      axis: !1,
      connectToSortable: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      iframeFix: !1,
      opacity: !1,
      refreshPositions: !1,
      revert: !1,
      revertDuration: 500,
      scope: "default",
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: !1,
      snapMode: "both",
      snapTolerance: 20,
      stack: !1,
      zIndex: !1
    },
    _create: function () {
      this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
    },
    _destroy: function () {
      this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
    },
    _mouseCapture: function (t) {
      var n = this.options;
      return this.helper || n.disabled || e(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function () {
        e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
          width: this.offsetWidth + "px",
          height: this.offsetHeight + "px",
          position: "absolute",
          opacity: "0.001",
          zIndex: 1e3
        }).css(e(this).offset()).appendTo("body")
      }), !0) : !1)
    },
    _mouseStart: function (t) {
      var n = this.options;
      return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      }, e.extend(this.offset, {
        click: {
          left: t.pageX - this.offset.left,
          top: t.pageY - this.offset.top
        },
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), n.containment && this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
    },
    _mouseDrag: function (t, n) {
      this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute");
      if (!n) {
        var r = this._uiHash();
        if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
        this.position = r.position
      }
      if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
      if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
      return e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
    },
    _mouseStop: function (t) {
      var n = !1;
      e.ui.ddmanager && !this.options.dropBehaviour && (n = e.ui.ddmanager.drop(this, t)), this.dropped && (n = this.dropped, this.dropped = !1);
      var r = this.element[0],
        i = !1;
      while (r && (r = r.parentNode)) r == document && (i = !0);
      if (!i && this.options.helper === "original") return !1;
      if (this.options.revert == "invalid" && !n || this.options.revert == "valid" && n || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, n)) {
        var s = this;
        e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
          s._trigger("stop", t) !== !1 && s._clear()
        })
      } else this._trigger("stop", t) !== !1 && this._clear();
      return !1
    },
    _mouseUp: function (t) {
      return e("div.ui-draggable-iframeFix").each(function () {
        this.parentNode.removeChild(this)
      }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
    },
    cancel: function () {
      return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
    },
    _getHandle: function (t) {
      var n = !this.options.handle || !e(this.options.handle, this.element).length ? !0 : !1;
      return e(this.options.handle, this.element).find("*").andSelf().each(function () {
        this == t.target && (n = !0)
      }), n
    },
    _createHelper: function (t) {
      var n = this.options,
        r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
      return r.parents("body").length || r.appendTo(n.appendTo == "parent" ? this.element[0].parentNode : n.appendTo), r[0] != this.element[0] && !/(fixed|absolute)/.test(r.css("position")) && r.css("position", "absolute"), r
    },
    _adjustOffsetFromHelper: function (t) {
      typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
        left: +t[0],
        top: +t[1] || 0
      }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
    },
    _getParentOffset: function () {
      this.offsetParent = this.helper.offsetParent();
      var t = this.offsetParent.offset();
      this.cssPosition == "absolute" && this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
      if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.ui.ie) t = {
        top: 0,
        left: 0
      };
      return {
        top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      }
    },
    _getRelativeOffset: function () {
      if (this.cssPosition == "relative") {
        var e = this.element.position();
        return {
          top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
          left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
        }
      }
      return {
        top: 0,
        left: 0
      }
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
      }
    },
    _cacheHelperProportions: function () {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      }
    },
    _setContainment: function () {
      var t = this.options;
      t.containment == "parent" && (t.containment = this.helper[0].parentNode);
      if (t.containment == "document" || t.containment == "window") this.containment = [t.containment == "document" ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t.containment == "document" ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (t.containment == "document" ? 0 : e(window).scrollLeft()) + e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (t.containment == "document" ? 0 : e(window).scrollTop()) + (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
      if (!/^(document|window|parent)$/.test(t.containment) && t.containment.constructor != Array) {
        var n = e(t.containment),
          r = n[0];
        if (!r) return;
        var i = n.offset(),
          s = e(r).css("overflow") != "hidden";
        this.containment = [(parseInt(e(r).css("borderLeftWidth"), 10) || 0) + (parseInt(e(r).css("paddingLeft"), 10) || 0), (parseInt(e(r).css("borderTopWidth"), 10) || 0) + (parseInt(e(r).css("paddingTop"), 10) || 0), (s ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(e(r).css("borderLeftWidth"), 10) || 0) - (parseInt(e(r).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (s ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - (parseInt(e(r).css("borderTopWidth"), 10) || 0) - (parseInt(e(r).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = n
      } else t.containment.constructor == Array && (this.containment = t.containment)
    },
    _convertPositionTo: function (t, n) {
      n || (n = this.position);
      var r = t == "absolute" ? 1 : -1,
        i = this.options,
        s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
        o = /(html|body)/i.test(s[0].tagName);
      return {
        top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r,
        left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r
      }
    },
    _generatePosition: function (t) {
      var n = this.options,
        r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !!e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
        i = /(html|body)/i.test(r[0].tagName),
        s = t.pageX,
        o = t.pageY;
      if (this.originalPosition) {
        var u;
        if (this.containment) {
          if (this.relative_container) {
            var a = this.relative_container.offset();
            u = [this.containment[0] + a.left, this.containment[1] + a.top, this.containment[2] + a.left, this.containment[3] + a.top]
          } else u = this.containment;
          t.pageX - this.offset.click.left < u[0] && (s = u[0] + this.offset.click.left), t.pageY - this.offset.click.top < u[1] && (o = u[1] + this.offset.click.top), t.pageX - this.offset.click.left > u[2] && (s = u[2] + this.offset.click.left), t.pageY - this.offset.click.top > u[3] && (o = u[3] + this.offset.click.top)
        }
        if (n.grid) {
          var f = n.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1] : this.originalPageY;
          o = u ? f - this.offset.click.top < u[1] || f - this.offset.click.top > u[3] ? f - this.offset.click.top < u[1] ? f + n.grid[1] : f - n.grid[1] : f : f;
          var l = n.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0] : this.originalPageX;
          s = u ? l - this.offset.click.left < u[0] || l - this.offset.click.left > u[2] ? l - this.offset.click.left < u[0] ? l + n.grid[0] : l - n.grid[0] : l : l
        }
      }
      return {
        top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
        left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
      }
    },
    _clear: function () {
      this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
    },
    _trigger: function (t, n, r) {
      return r = r || this._uiHash(), e.ui.plugin.call(this, t, [n, r]), t == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, n, r)
    },
    plugins: {},
    _uiHash: function (e) {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      }
    }
  }), e.ui.plugin.add("draggable", "connectToSortable", {
    start: function (t, n) {
      var r = e(this).data("draggable"),
        i = r.options,
        s = e.extend({}, n, {
          item: r.element
        });
      r.sortables = [], e(i.connectToSortable).each(function () {
        var n = e.data(this, "sortable");
        n && !n.options.disabled && (r.sortables.push({
          instance: n,
          shouldRevert: n.options.revert
        }), n.refreshPositions(), n._trigger("activate", t, s))
      })
    },
    stop: function (t, n) {
      var r = e(this).data("draggable"),
        i = e.extend({}, n, {
          item: r.element
        });
      e.each(r.sortables, function () {
        this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper == "original" && this.instance.currentItem.css({
          top: "auto",
          left: "auto"
        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
      })
    },
    drag: function (t, n) {
      var r = e(this).data("draggable"),
        i = this,
        s = function (t) {
          var n = this.offset.click.top,
            r = this.offset.click.left,
            i = this.positionAbs.top,
            s = this.positionAbs.left,
            o = t.height,
            u = t.width,
            a = t.top,
            f = t.left;
          return e.ui.isOver(i + n, s + r, a, f, o, u)
        };
      e.each(r.sortables, function (s) {
        var o = !1,
          u = this;
        this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = !0, e.each(r.sortables, function () {
          return this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this != u && this.instance._intersectsWith(this.instance.containerCache) && e.ui.contains(u.instance.element[0], this.instance.element[0]) && (o = !1), o
        })), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
          return n.helper[0]
        }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
      })
    }
  }), e.ui.plugin.add("draggable", "cursor", {
    start: function (t, n) {
      var r = e("body"),
        i = e(this).data("draggable").options;
      r.css("cursor") && (i._cursor = r.css("cursor")), r.css("cursor", i.cursor)
    },
    stop: function (t, n) {
      var r = e(this).data("draggable").options;
      r._cursor && e("body").css("cursor", r._cursor)
    }
  }), e.ui.plugin.add("draggable", "opacity", {
    start: function (t, n) {
      var r = e(n.helper),
        i = e(this).data("draggable").options;
      r.css("opacity") && (i._opacity = r.css("opacity")), r.css("opacity", i.opacity)
    },
    stop: function (t, n) {
      var r = e(this).data("draggable").options;
      r._opacity && e(n.helper).css("opacity", r._opacity)
    }
  }), e.ui.plugin.add("draggable", "scroll", {
    start: function (t, n) {
      var r = e(this).data("draggable");
      r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML" && (r.overflowOffset = r.scrollParent.offset())
    },
    drag: function (t, n) {
      var r = e(this).data("draggable"),
        i = r.options,
        s = !1;
      if (r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML") {
        if (!i.axis || i.axis != "x") r.overflowOffset.top + r.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - r.overflowOffset.top < i.scrollSensitivity && (r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop - i.scrollSpeed);
        if (!i.axis || i.axis != "y") r.overflowOffset.left + r.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - r.overflowOffset.left < i.scrollSensitivity && (r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft - i.scrollSpeed)
      } else {
        if (!i.axis || i.axis != "x") t.pageY - e(document).scrollTop() < i.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - i.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < i.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + i.scrollSpeed));
        if (!i.axis || i.axis != "y") t.pageX - e(document).scrollLeft() < i.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - i.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < i.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + i.scrollSpeed))
      }
      s !== !1 && e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(r, t)
    }
  }), e.ui.plugin.add("draggable", "snap", {
    start: function (t, n) {
      var r = e(this).data("draggable"),
        i = r.options;
      r.snapElements = [], e(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function () {
        var t = e(this),
          n = t.offset();
        this != r.element[0] && r.snapElements.push({
          item: this,
          width: t.outerWidth(),
          height: t.outerHeight(),
          top: n.top,
          left: n.left
        })
      })
    },
    drag: function (t, n) {
      var r = e(this).data("draggable"),
        i = r.options,
        s = i.snapTolerance,
        o = n.offset.left,
        u = o + r.helperProportions.width,
        a = n.offset.top,
        f = a + r.helperProportions.height;
      for (var l = r.snapElements.length - 1; l >= 0; l--) {
        var c = r.snapElements[l].left,
          h = c + r.snapElements[l].width,
          p = r.snapElements[l].top,
          d = p + r.snapElements[l].height;
        if (!(c - s < o && o < h + s && p - s < a && a < d + s || c - s < o && o < h + s && p - s < f && f < d + s || c - s < u && u < h + s && p - s < a && a < d + s || c - s < u && u < h + s && p - s < f && f < d + s)) {
          r.snapElements[l].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, e.extend(r._uiHash(), {
            snapItem: r.snapElements[l].item
          })), r.snapElements[l].snapping = !1;
          continue
        }
        if (i.snapMode != "inner") {
          var v = Math.abs(p - f) <= s,
            m = Math.abs(d - a) <= s,
            g = Math.abs(c - u) <= s,
            y = Math.abs(h - o) <= s;
          v && (n.position.top = r._convertPositionTo("relative", {
            top: p - r.helperProportions.height,
            left: 0
          }).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {
            top: d,
            left: 0
          }).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {
            top: 0,
            left: c - r.helperProportions.width
          }).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {
            top: 0,
            left: h
          }).left - r.margins.left)
        }
        var b = v || m || g || y;
        if (i.snapMode != "outer") {
          var v = Math.abs(p - a) <= s,
            m = Math.abs(d - f) <= s,
            g = Math.abs(c - o) <= s,
            y = Math.abs(h - u) <= s;
          v && (n.position.top = r._convertPositionTo("relative", {
            top: p,
            left: 0
          }).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {
            top: d - r.helperProportions.height,
            left: 0
          }).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {
            top: 0,
            left: c
          }).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {
            top: 0,
            left: h - r.helperProportions.width
          }).left - r.margins.left)
        }!r.snapElements[l].snapping && (v || m || g || y || b) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, e.extend(r._uiHash(), {
          snapItem: r.snapElements[l].item
        })), r.snapElements[l].snapping = v || m || g || y || b
      }
    }
  }), e.ui.plugin.add("draggable", "stack", {
    start: function (t, n) {
      var r = e(this).data("draggable").options,
        i = e.makeArray(e(r.stack)).sort(function (t, n) {
          return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
        });
      if (!i.length) return;
      var s = parseInt(i[0].style.zIndex) || 0;
      e(i).each(function (e) {
        this.style.zIndex = s + e
      }), this[0].style.zIndex = s + i.length
    }
  }), e.ui.plugin.add("draggable", "zIndex", {
    start: function (t, n) {
      var r = e(n.helper),
        i = e(this).data("draggable").options;
      r.css("zIndex") && (i._zIndex = r.css("zIndex")), r.css("zIndex", i.zIndex)
    },
    stop: function (t, n) {
      var r = e(this).data("draggable").options;
      r._zIndex && e(n.helper).css("zIndex", r._zIndex)
    }
  })
})(jQuery);
(function (e, t) {
  var n, r, i, s, o = "ui-button ui-widget ui-state-default ui-corner-all",
    u = "ui-state-hover ui-state-active ",
    a = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
    f = function () {
      var t = e(this).find(":ui-button");
      setTimeout(function () {
        t.button("refresh")
      }, 1)
    },
    l = function (t) {
      var n = t.name,
        r = t.form,
        i = e([]);
      return n && (r ? i = e(r).find("[name='" + n + "']") : i = e("[name='" + n + "']", t.ownerDocument).filter(function () {
        return !this.form
      })), i
    };
  e.widget("ui.button", {
    version: "1.9.2",
    defaultElement: "<button>",
    options: {
      disabled: null,
      text: !0,
      label: null,
      icons: {
        primary: null,
        secondary: null
      }
    },
    _create: function () {
      this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, f), typeof this.options.disabled != "boolean" ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
      var t = this,
        u = this.options,
        a = this.type === "checkbox" || this.type === "radio",
        c = a ? "" : "ui-state-active",
        h = "ui-state-focus";
      u.label === null && (u.label = this.type === "input" ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(o).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
        if (u.disabled) return;
        this === n && e(this).addClass("ui-state-active")
      }).bind("mouseleave" + this.eventNamespace, function () {
        if (u.disabled) return;
        e(this).removeClass(c)
      }).bind("click" + this.eventNamespace, function (e) {
        u.disabled && (e.preventDefault(), e.stopImmediatePropagation())
      }), this.element.bind("focus" + this.eventNamespace, function () {
        t.buttonElement.addClass(h)
      }).bind("blur" + this.eventNamespace, function () {
        t.buttonElement.removeClass(h)
      }), a && (this.element.bind("change" + this.eventNamespace, function () {
        if (s) return;
        t.refresh()
      }), this.buttonElement.bind("mousedown" + this.eventNamespace, function (e) {
        if (u.disabled) return;
        s = !1, r = e.pageX, i = e.pageY
      }).bind("mouseup" + this.eventNamespace, function (e) {
        if (u.disabled) return;
        if (r !== e.pageX || i !== e.pageY) s = !0
      })), this.type === "checkbox" ? this.buttonElement.bind("click" + this.eventNamespace, function () {
        if (u.disabled || s) return !1;
        e(this).toggleClass("ui-state-active"), t.buttonElement.attr("aria-pressed", t.element[0].checked)
      }) : this.type === "radio" ? this.buttonElement.bind("click" + this.eventNamespace, function () {
        if (u.disabled || s) return !1;
        e(this).addClass("ui-state-active"), t.buttonElement.attr("aria-pressed", "true");
        var n = t.element[0];
        l(n).not(n).map(function () {
          return e(this).button("widget")[0]
        }).removeClass("ui-state-active").attr("aria-pressed", "false")
      }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
        if (u.disabled) return !1;
        e(this).addClass("ui-state-active"), n = this, t.document.one("mouseup", function () {
          n = null
        })
      }).bind("mouseup" + this.eventNamespace, function () {
        if (u.disabled) return !1;
        e(this).removeClass("ui-state-active")
      }).bind("keydown" + this.eventNamespace, function (t) {
        if (u.disabled) return !1;
        (t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active")
      }).bind("keyup" + this.eventNamespace, function () {
        e(this).removeClass("ui-state-active")
      }), this.buttonElement.is("a") && this.buttonElement.keyup(function (t) {
        t.keyCode === e.ui.keyCode.SPACE && e(this).click()
      })), this._setOption("disabled", u.disabled), this._resetButton()
    },
    _determineButtonType: function () {
      var e, t, n;
      this.element.is("[type=checkbox]") ? this.type = "checkbox" : this.element.is("[type=radio]") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button", this.type === "checkbox" || this.type === "radio" ? (e = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = e.find(t), this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(), this.buttonElement = e.filter(t), this.buttonElement.length || (this.buttonElement = e.find(t))), this.element.addClass("ui-helper-hidden-accessible"), n = this.element.is(":checked"), n && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", n)) : this.buttonElement = this.element
    },
    widget: function () {
      return this.buttonElement
    },
    _destroy: function () {
      this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(o + " " + u + " " + a).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
    },
    _setOption: function (e, t) {
      this._super(e, t);
      if (e === "disabled") {
        t ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1);
        return
      }
      this._resetButton()
    },
    refresh: function () {
      var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
      t !== this.options.disabled && this._setOption("disabled", t), this.type === "radio" ? l(this.element[0]).each(function () {
        e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
      }) : this.type === "checkbox" && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
    },
    _resetButton: function () {
      if (this.type === "input") {
        this.options.label && this.element.val(this.options.label);
        return
      }
      var t = this.buttonElement.removeClass(a),
        n = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
        r = this.options.icons,
        i = r.primary && r.secondary,
        s = [];
      r.primary || r.secondary ? (this.options.text && s.push("ui-button-text-icon" + (i ? "s" : r.primary ? "-primary" : "-secondary")), r.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + r.primary + "'></span>"), r.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + r.secondary + "'></span>"), this.options.text || (s.push(i ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", e.trim(n)))) : s.push("ui-button-text-only"), t.addClass(s.join(" "))
    }
  }), e.widget("ui.buttonset", {
    version: "1.9.2",
    options: {
      items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"
    },
    _create: function () {
      this.element.addClass("ui-buttonset")
    },
    _init: function () {
      this.refresh()
    },
    _setOption: function (e, t) {
      e === "disabled" && this.buttons.button("option", e, t), this._super(e, t)
    },
    refresh: function () {
      var t = this.element.css("direction") === "rtl";
      this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
        return e(this).button("widget")[0]
      }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
    },
    _destroy: function () {
      this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
        return e(this).button("widget")[0]
      }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
    }
  })
})(jQuery);
(function (e, t) {
  var n = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
    r = {
      buttons: !0,
      height: !0,
      maxHeight: !0,
      maxWidth: !0,
      minHeight: !0,
      minWidth: !0,
      width: !0
    },
    i = {
      maxHeight: !0,
      maxWidth: !0,
      minHeight: !0,
      minWidth: !0
    };
  e.widget("ui.dialog", {
    version: "1.9.2",
    options: {
      autoOpen: !0,
      buttons: {},
      closeOnEscape: !0,
      closeText: "close",
      dialogClass: "",
      draggable: !0,
      hide: null,
      height: "auto",
      maxHeight: !1,
      maxWidth: !1,
      minHeight: 150,
      minWidth: 150,
      modal: !1,
      position: {
        my: "center",
        at: "center",
        of: window,
        collision: "fit",
        using: function (t) {
          var n = e(this).css(t).offset().top;
          n < 0 && e(this).css("top", t.top - n)
        }
      },
      resizable: !0,
      show: null,
      stack: !0,
      title: "",
      width: 300,
      zIndex: 1e3
    },
    _create: function () {
      this.originalTitle = this.element.attr("title"), typeof this.originalTitle != "string" && (this.originalTitle = ""), this.oldPosition = {
        parent: this.element.parent(),
        index: this.element.parent().children().index(this.element)
      }, this.options.title = this.options.title || this.originalTitle;
      var t = this,
        r = this.options,
        i = r.title || "&#160;",
        s, o, u, a, f;
      s = (this.uiDialog = e("<div>")).addClass(n + r.dialogClass).css({
        display: "none",
        outline: 0,
        zIndex: r.zIndex
      }).attr("tabIndex", -1).keydown(function (n) {
        r.closeOnEscape && !n.isDefaultPrevented() && n.keyCode && n.keyCode === e.ui.keyCode.ESCAPE && (t.close(n), n.preventDefault())
      }).mousedown(function (e) {
        t.moveToTop(!1, e)
      }).appendTo("body"), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(s), o = (this.uiDialogTitlebar = e("<div>")).addClass("ui-dialog-titlebar  ui-widget-header  ui-corner-all  ui-helper-clearfix").bind("mousedown", function () {
        s.focus()
      }).prependTo(s), u = e("<a href='#'></a>").addClass("ui-dialog-titlebar-close  ui-corner-all").attr("role", "button").click(function (e) {
        e.preventDefault(), t.close(e)
      }).appendTo(o), (this.uiDialogTitlebarCloseText = e("<span>")).addClass("ui-icon ui-icon-closethick").text(r.closeText).appendTo(u), a = e("<span>").uniqueId().addClass("ui-dialog-title").html(i).prependTo(o), f = (this.uiDialogButtonPane = e("<div>")).addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), (this.uiButtonSet = e("<div>")).addClass("ui-dialog-buttonset").appendTo(f), s.attr({
        role: "dialog",
        "aria-labelledby": a.attr("id")
      }), o.find("*").add(o).disableSelection(), this._hoverable(u), this._focusable(u), r.draggable && e.fn.draggable && this._makeDraggable(), r.resizable && e.fn.resizable && this._makeResizable(), this._createButtons(r.buttons), this._isOpen = !1, e.fn.bgiframe && s.bgiframe(), this._on(s, {
        keydown: function (t) {
          if (!r.modal || t.keyCode !== e.ui.keyCode.TAB) return;
          var n = e(":tabbable", s),
            i = n.filter(":first"),
            o = n.filter(":last");
          if (t.target === o[0] && !t.shiftKey) return i.focus(1), !1;
          if (t.target === i[0] && t.shiftKey) return o.focus(1), !1
        }
      })
    },
    _init: function () {
      this.options.autoOpen && this.open()
    },
    _destroy: function () {
      var e, t = this.oldPosition;
      this.overlay && this.overlay.destroy(), this.uiDialog.hide(), this.element.removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), e = t.parent.children().eq(t.index), e.length && e[0] !== this.element[0] ? e.before(this.element) : t.parent.append(this.element)
    },
    widget: function () {
      return this.uiDialog
    },
    close: function (t) {
      var n = this,
        r, i;
      if (!this._isOpen) return;
      if (!1 === this._trigger("beforeClose", t)) return;
      return this._isOpen = !1, this.overlay && this.overlay.destroy(), this.options.hide ? this._hide(this.uiDialog, this.options.hide, function () {
        n._trigger("close", t)
      }) : (this.uiDialog.hide(), this._trigger("close", t)), e.ui.dialog.overlay.resize(), this.options.modal && (r = 0, e(".ui-dialog").each(function () {
        this !== n.uiDialog[0] && (i = e(this).css("z-index"), isNaN(i) || (r = Math.max(r, i)))
      }), e.ui.dialog.maxZ = r), this
    },
    isOpen: function () {
      return this._isOpen
    },
    moveToTop: function (t, n) {
      var r = this.options,
        i;
      return r.modal && !t || !r.stack && !r.modal ? this._trigger("focus", n) : (r.zIndex > e.ui.dialog.maxZ && (e.ui.dialog.maxZ = r.zIndex), this.overlay && (e.ui.dialog.maxZ += 1, e.ui.dialog.overlay.maxZ = e.ui.dialog.maxZ, this.overlay.$el.css("z-index", e.ui.dialog.overlay.maxZ)), i = {
        scrollTop: this.element.scrollTop(),
        scrollLeft: this.element.scrollLeft()
      }, e.ui.dialog.maxZ += 1, this.uiDialog.css("z-index", e.ui.dialog.maxZ), this.element.attr(i), this._trigger("focus", n), this)
    },
    open: function () {
      if (this._isOpen) return;
      var t, n = this.options,
        r = this.uiDialog;
      return this._size(), this._position(n.position), r.show(n.show), this.overlay = n.modal ? new e.ui.dialog.overlay(this) : null, this.moveToTop(!0), t = this.element.find(":tabbable"), t.length || (t = this.uiDialogButtonPane.find(":tabbable"), t.length || (t = r)), t.eq(0).focus(), this._isOpen = !0, this._trigger("open"), this
    },
    _createButtons: function (t) {
      var n = this,
        r = !1;
      this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), typeof t == "object" && t !== null && e.each(t, function () {
        return !(r = !0)
      }), r ? (e.each(t, function (t, r) {
        var i, s;
        r = e.isFunction(r) ? {
          click: r,
          text: t
        } : r, r = e.extend({
          type: "button"
        }, r), s = r.click, r.click = function () {
          s.apply(n.element[0], arguments)
        }, i = e("<button></button>", r).appendTo(n.uiButtonSet), e.fn.button && i.button()
      }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog)) : this.uiDialog.removeClass("ui-dialog-buttons")
    },
    _makeDraggable: function () {
      function r(e) {
        return {
          position: e.position,
          offset: e.offset
        }
      }
      var t = this,
        n = this.options;
      this.uiDialog.draggable({
        cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
        handle: ".ui-dialog-titlebar",
        containment: "document",
        start: function (n, i) {
          e(this).addClass("ui-dialog-dragging"), t._trigger("dragStart", n, r(i))
        },
        drag: function (e, n) {
          t._trigger("drag", e, r(n))
        },
        stop: function (i, s) {
          n.position = [s.position.left - t.document.scrollLeft(), s.position.top - t.document.scrollTop()], e(this).removeClass("ui-dialog-dragging"), t._trigger("dragStop", i, r(s)), e.ui.dialog.overlay.resize()
        }
      })
    },
    _makeResizable: function (n) {
      function u(e) {
        return {
          originalPosition: e.originalPosition,
          originalSize: e.originalSize,
          position: e.position,
          size: e.size
        }
      }
      n = n === t ? this.options.resizable : n;
      var r = this,
        i = this.options,
        s = this.uiDialog.css("position"),
        o = typeof n == "string" ? n : "n,e,s,w,se,sw,ne,nw";
      this.uiDialog.resizable({
        cancel: ".ui-dialog-content",
        containment: "document",
        alsoResize: this.element,
        maxWidth: i.maxWidth,
        maxHeight: i.maxHeight,
        minWidth: i.minWidth,
        minHeight: this._minHeight(),
        handles: o,
        start: function (t, n) {
          e(this).addClass("ui-dialog-resizing"), r._trigger("resizeStart", t, u(n))
        },
        resize: function (e, t) {
          r._trigger("resize", e, u(t))
        },
        stop: function (t, n) {
          e(this).removeClass("ui-dialog-resizing"), i.height = e(this).height(), i.width = e(this).width(), r._trigger("resizeStop", t, u(n)), e.ui.dialog.overlay.resize()
        }
      }).css("position", s).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
    },
    _minHeight: function () {
      var e = this.options;
      return e.height === "auto" ? e.minHeight : Math.min(e.minHeight, e.height)
    },
    _position: function (t) {
      var n = [],
        r = [0, 0],
        i;
      if (t) {
        if (typeof t == "string" || typeof t == "object" && "0" in t) n = t.split ? t.split(" ") : [t[0], t[1]], n.length === 1 && (n[1] = n[0]), e.each(["left", "top"], function (e, t) {
          +n[e] === n[e] && (r[e] = n[e], n[e] = t)
        }), t = {
          my: n[0] + (r[0] < 0 ? r[0] : "+" + r[0]) + " " + n[1] + (r[1] < 0 ? r[1] : "+" + r[1]),
          at: n.join(" ")
        };
        t = e.extend({}, e.ui.dialog.prototype.options.position, t)
      } else t = e.ui.dialog.prototype.options.position;
      i = this.uiDialog.is(":visible"), i || this.uiDialog.show(), this.uiDialog.position(t), i || this.uiDialog.hide()
    },
    _setOptions: function (t) {
      var n = this,
        s = {},
        o = !1;
      e.each(t, function (e, t) {
        n._setOption(e, t), e in r && (o = !0), e in i && (s[e] = t)
      }), o && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", s)
    },
    _setOption: function (t, r) {
      var i, s, o = this.uiDialog;
      switch (t) {
        case "buttons":
          this._createButtons(r);
          break;
        case "closeText":
          this.uiDialogTitlebarCloseText.text("" + r);
          break;
        case "dialogClass":
          o.removeClass(this.options.dialogClass).addClass(n + r);
          break;
        case "disabled":
          r ? o.addClass("ui-dialog-disabled") : o.removeClass("ui-dialog-disabled");
          break;
        case "draggable":
          i = o.is(":data(draggable)"), i && !r && o.draggable("destroy"), !i && r && this._makeDraggable();
          break;
        case "position":
          this._position(r);
          break;
        case "resizable":
          s = o.is(":data(resizable)"), s && !r && o.resizable("destroy"), s && typeof r == "string" && o.resizable("option", "handles", r), !s && r !== !1 && this._makeResizable(r);
          break;
        case "title":
          e(".ui-dialog-title", this.uiDialogTitlebar).html("" + (r || "&#160;"))
      }
      this._super(t, r)
    },
    _size: function () {
      var t, n, r, i = this.options,
        s = this.uiDialog.is(":visible");
      this.element.show().css({
        width: "auto",
        minHeight: 0,
        height: 0
      }), i.minWidth > i.width && (i.width = i.minWidth), t = this.uiDialog.css({
        height: "auto",
        width: i.width
      }).outerHeight(), n = Math.max(0, i.minHeight - t), i.height === "auto" ? e.support.minHeight ? this.element.css({
        minHeight: n,
        height: "auto"
      }) : (this.uiDialog.show(), r = this.element.css("height", "auto").height(), s || this.uiDialog.hide(), this.element.height(Math.max(r, n))) : this.element.height(Math.max(i.height - t, 0)), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
    }
  }), e.extend(e.ui.dialog, {
    uuid: 0,
    maxZ: 0,
    getTitleId: function (e) {
      var t = e.attr("id");
      return t || (this.uuid += 1, t = this.uuid), "ui-dialog-title-" + t
    },
    overlay: function (t) {
      this.$el = e.ui.dialog.overlay.create(t)
    }
  }), e.extend(e.ui.dialog.overlay, {
    instances: [],
    oldInstances: [],
    maxZ: 0,
    events: e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (e) {
      return e + ".dialog-overlay"
    }).join(" "),
    create: function (t) {
      this.instances.length === 0 && (setTimeout(function () {
        e.ui.dialog.overlay.instances.length && e(document).bind(e.ui.dialog.overlay.events, function (t) {
          if (e(t.target).zIndex() < e.ui.dialog.overlay.maxZ) return !1
        })
      }, 1), e(window).bind("resize.dialog-overlay", e.ui.dialog.overlay.resize));
      var n = this.oldInstances.pop() || e("<div>").addClass("ui-widget-overlay");
      return e(document).bind("keydown.dialog-overlay", function (r) {
        var i = e.ui.dialog.overlay.instances;
        i.length !== 0 && i[i.length - 1] === n && t.options.closeOnEscape && !r.isDefaultPrevented() && r.keyCode && r.keyCode === e.ui.keyCode.ESCAPE && (t.close(r), r.preventDefault())
      }), n.appendTo(document.body).css({
        width: this.width(),
        height: this.height()
      }), e.fn.bgiframe && n.bgiframe(), this.instances.push(n), n
    },
    destroy: function (t) {
      var n = e.inArray(t, this.instances),
        r = 0;
      n !== -1 && this.oldInstances.push(this.instances.splice(n, 1)[0]), this.instances.length === 0 && e([document, window]).unbind(".dialog-overlay"), t.height(0).width(0).remove(), e.each(this.instances, function () {
        r = Math.max(r, this.css("z-index"))
      }), this.maxZ = r
    },
    height: function () {
      var t, n;
      return e.ui.ie ? (t = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), n = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), t < n ? e(window).height() + "px" : t + "px") : e(document).height() + "px"
    },
    width: function () {
      var t, n;
      return e.ui.ie ? (t = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), n = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), t < n ? e(window).width() + "px" : t + "px") : e(document).width() + "px"
    },
    resize: function () {
      var t = e([]);
      e.each(e.ui.dialog.overlay.instances, function () {
        t = t.add(this)
      }), t.css({
        width: 0,
        height: 0
      }).css({
        width: e.ui.dialog.overlay.width(),
        height: e.ui.dialog.overlay.height()
      })
    }
  }), e.extend(e.ui.dialog.overlay.prototype, {
    destroy: function () {
      e.ui.dialog.overlay.destroy(this.$el)
    }
  })
})(jQuery);
jQuery.effects || function (e, t) {
  var n = e.uiBackCompat !== !1,
    r = "ui-effects-";
  e.effects = {
      effect: {}
    },
    function (t, n) {
      function p(e, t, n) {
        var r = a[t.type] || {};
        return e == null ? n || !t.def ? null : t.def : (e = r.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : r.mod ? (e + r.mod) % r.mod : 0 > e ? 0 : r.max < e ? r.max : e)
      }

      function d(e) {
        var n = o(),
          r = n._rgba = [];
        return e = e.toLowerCase(), h(s, function (t, i) {
          var s, o = i.re.exec(e),
            a = o && i.parse(o),
            f = i.space || "rgba";
          if (a) return s = n[f](a), n[u[f].cache] = s[u[f].cache], r = n._rgba = s._rgba, !1
        }), r.length ? (r.join() === "0,0,0,0" && t.extend(r, c.transparent), n) : c[e]
      }

      function v(e, t, n) {
        return n = (n + 1) % 1, n * 6 < 1 ? e + (t - e) * n * 6 : n * 2 < 1 ? t : n * 3 < 2 ? e + (t - e) * (2 / 3 - n) * 6 : e
      }
      var r = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),
        i = /^([\-+])=\s*(\d+\.?\d*)/,
        s = [{
          re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
          parse: function (e) {
            return [e[1], e[2], e[3], e[4]]
          }
        }, {
          re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
          parse: function (e) {
            return [e[1] * 2.55, e[2] * 2.55, e[3] * 2.55, e[4]]
          }
        }, {
          re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
          parse: function (e) {
            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
          }
        }, {
          re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
          parse: function (e) {
            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
          }
        }, {
          re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
          space: "hsla",
          parse: function (e) {
            return [e[1], e[2] / 100, e[3] / 100, e[4]]
          }
        }],
        o = t.Color = function (e, n, r, i) {
          return new t.Color.fn.parse(e, n, r, i)
        },
        u = {
          rgba: {
            props: {
              red: {
                idx: 0,
                type: "byte"
              },
              green: {
                idx: 1,
                type: "byte"
              },
              blue: {
                idx: 2,
                type: "byte"
              }
            }
          },
          hsla: {
            props: {
              hue: {
                idx: 0,
                type: "degrees"
              },
              saturation: {
                idx: 1,
                type: "percent"
              },
              lightness: {
                idx: 2,
                type: "percent"
              }
            }
          }
        },
        a = {
          "byte": {
            floor: !0,
            max: 255
          },
          percent: {
            max: 1
          },
          degrees: {
            mod: 360,
            floor: !0
          }
        },
        f = o.support = {},
        l = t("<p>")[0],
        c, h = t.each;
      l.style.cssText = "background-color:rgba(1,1,1,.5)", f.rgba = l.style.backgroundColor.indexOf("rgba") > -1, h(u, function (e, t) {
        t.cache = "_" + e, t.props.alpha = {
          idx: 3,
          type: "percent",
          def: 1
        }
      }), o.fn = t.extend(o.prototype, {
        parse: function (r, i, s, a) {
          if (r === n) return this._rgba = [null, null, null, null], this;
          if (r.jquery || r.nodeType) r = t(r).css(i), i = n;
          var f = this,
            l = t.type(r),
            v = this._rgba = [];
          i !== n && (r = [r, i, s, a], l = "array");
          if (l === "string") return this.parse(d(r) || c._default);
          if (l === "array") return h(u.rgba.props, function (e, t) {
            v[t.idx] = p(r[t.idx], t)
          }), this;
          if (l === "object") return r instanceof o ? h(u, function (e, t) {
            r[t.cache] && (f[t.cache] = r[t.cache].slice())
          }) : h(u, function (t, n) {
            var i = n.cache;
            h(n.props, function (e, t) {
              if (!f[i] && n.to) {
                if (e === "alpha" || r[e] == null) return;
                f[i] = n.to(f._rgba)
              }
              f[i][t.idx] = p(r[e], t, !0)
            }), f[i] && e.inArray(null, f[i].slice(0, 3)) < 0 && (f[i][3] = 1, n.from && (f._rgba = n.from(f[i])))
          }), this
        },
        is: function (e) {
          var t = o(e),
            n = !0,
            r = this;
          return h(u, function (e, i) {
            var s, o = t[i.cache];
            return o && (s = r[i.cache] || i.to && i.to(r._rgba) || [], h(i.props, function (e, t) {
              if (o[t.idx] != null) return n = o[t.idx] === s[t.idx], n
            })), n
          }), n
        },
        _space: function () {
          var e = [],
            t = this;
          return h(u, function (n, r) {
            t[r.cache] && e.push(n)
          }), e.pop()
        },
        transition: function (e, t) {
          var n = o(e),
            r = n._space(),
            i = u[r],
            s = this.alpha() === 0 ? o("transparent") : this,
            f = s[i.cache] || i.to(s._rgba),
            l = f.slice();
          return n = n[i.cache], h(i.props, function (e, r) {
            var i = r.idx,
              s = f[i],
              o = n[i],
              u = a[r.type] || {};
            if (o === null) return;
            s === null ? l[i] = o : (u.mod && (o - s > u.mod / 2 ? s += u.mod : s - o > u.mod / 2 && (s -= u.mod)), l[i] = p((o - s) * t + s, r))
          }), this[r](l)
        },
        blend: function (e) {
          if (this._rgba[3] === 1) return this;
          var n = this._rgba.slice(),
            r = n.pop(),
            i = o(e)._rgba;
          return o(t.map(n, function (e, t) {
            return (1 - r) * i[t] + r * e
          }))
        },
        toRgbaString: function () {
          var e = "rgba(",
            n = t.map(this._rgba, function (e, t) {
              return e == null ? t > 2 ? 1 : 0 : e
            });
          return n[3] === 1 && (n.pop(), e = "rgb("), e + n.join() + ")"
        },
        toHslaString: function () {
          var e = "hsla(",
            n = t.map(this.hsla(), function (e, t) {
              return e == null && (e = t > 2 ? 1 : 0), t && t < 3 && (e = Math.round(e * 100) + "%"), e
            });
          return n[3] === 1 && (n.pop(), e = "hsl("), e + n.join() + ")"
        },
        toHexString: function (e) {
          var n = this._rgba.slice(),
            r = n.pop();
          return e && n.push(~~(r * 255)), "#" + t.map(n, function (e) {
            return e = (e || 0).toString(16), e.length === 1 ? "0" + e : e
          }).join("")
        },
        toString: function () {
          return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
        }
      }), o.fn.parse.prototype = o.fn, u.hsla.to = function (e) {
        if (e[0] == null || e[1] == null || e[2] == null) return [null, null, null, e[3]];
        var t = e[0] / 255,
          n = e[1] / 255,
          r = e[2] / 255,
          i = e[3],
          s = Math.max(t, n, r),
          o = Math.min(t, n, r),
          u = s - o,
          a = s + o,
          f = a * .5,
          l, c;
        return o === s ? l = 0 : t === s ? l = 60 * (n - r) / u + 360 : n === s ? l = 60 * (r - t) / u + 120 : l = 60 * (t - n) / u + 240, f === 0 || f === 1 ? c = f : f <= .5 ? c = u / a : c = u / (2 - a), [Math.round(l) % 360, c, f, i == null ? 1 : i]
      }, u.hsla.from = function (e) {
        if (e[0] == null || e[1] == null || e[2] == null) return [null, null, null, e[3]];
        var t = e[0] / 360,
          n = e[1],
          r = e[2],
          i = e[3],
          s = r <= .5 ? r * (1 + n) : r + n - r * n,
          o = 2 * r - s;
        return [Math.round(v(o, s, t + 1 / 3) * 255), Math.round(v(o, s, t) * 255), Math.round(v(o, s, t - 1 / 3) * 255), i]
      }, h(u, function (e, r) {
        var s = r.props,
          u = r.cache,
          a = r.to,
          f = r.from;
        o.fn[e] = function (e) {
          a && !this[u] && (this[u] = a(this._rgba));
          if (e === n) return this[u].slice();
          var r, i = t.type(e),
            l = i === "array" || i === "object" ? e : arguments,
            c = this[u].slice();
          return h(s, function (e, t) {
            var n = l[i === "object" ? e : t.idx];
            n == null && (n = c[t.idx]), c[t.idx] = p(n, t)
          }), f ? (r = o(f(c)), r[u] = c, r) : o(c)
        }, h(s, function (n, r) {
          if (o.fn[n]) return;
          o.fn[n] = function (s) {
            var o = t.type(s),
              u = n === "alpha" ? this._hsla ? "hsla" : "rgba" : e,
              a = this[u](),
              f = a[r.idx],
              l;
            return o === "undefined" ? f : (o === "function" && (s = s.call(this, f), o = t.type(s)), s == null && r.empty ? this : (o === "string" && (l = i.exec(s), l && (s = f + parseFloat(l[2]) * (l[1] === "+" ? 1 : -1))), a[r.idx] = s, this[u](a)))
          }
        })
      }), h(r, function (e, n) {
        t.cssHooks[n] = {
          set: function (e, r) {
            var i, s, u = "";
            if (t.type(r) !== "string" || (i = d(r))) {
              r = o(i || r);
              if (!f.rgba && r._rgba[3] !== 1) {
                s = n === "backgroundColor" ? e.parentNode : e;
                while ((u === "" || u === "transparent") && s && s.style) try {
                  u = t.css(s, "backgroundColor"), s = s.parentNode
                } catch (a) {}
                r = r.blend(u && u !== "transparent" ? u : "_default")
              }
              r = r.toRgbaString()
            }
            try {
              e.style[n] = r
            } catch (l) {}
          }
        }, t.fx.step[n] = function (e) {
          e.colorInit || (e.start = o(e.elem, n), e.end = o(e.end), e.colorInit = !0), t.cssHooks[n].set(e.elem, e.start.transition(e.end, e.pos))
        }
      }), t.cssHooks.borderColor = {
        expand: function (e) {
          var t = {};
          return h(["Top", "Right", "Bottom", "Left"], function (n, r) {
            t["border" + r + "Color"] = e
          }), t
        }
      }, c = t.Color.names = {
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",
        transparent: [null, null, null, 0],
        _default: "#ffffff"
      }
    }(jQuery),
    function () {
      function i() {
        var t = this.ownerDocument.defaultView ? this.ownerDocument.defaultView.getComputedStyle(this, null) : this.currentStyle,
          n = {},
          r, i;
        if (t && t.length && t[0] && t[t[0]]) {
          i = t.length;
          while (i--) r = t[i], typeof t[r] == "string" && (n[e.camelCase(r)] = t[r])
        } else
          for (r in t) typeof t[r] == "string" && (n[r] = t[r]);
        return n
      }

      function s(t, n) {
        var i = {},
          s, o;
        for (s in n) o = n[s], t[s] !== o && !r[s] && (e.fx.step[s] || !isNaN(parseFloat(o))) && (i[s] = o);
        return i
      }
      var n = ["add", "remove", "toggle"],
        r = {
          border: 1,
          borderBottom: 1,
          borderColor: 1,
          borderLeft: 1,
          borderRight: 1,
          borderTop: 1,
          borderWidth: 1,
          margin: 1,
          padding: 1
        };
      e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (t, n) {
        e.fx.step[n] = function (e) {
          if (e.end !== "none" && !e.setAttr || e.pos === 1 && !e.setAttr) jQuery.style(e.elem, n, e.end), e.setAttr = !0
        }
      }), e.effects.animateClass = function (t, r, o, u) {
        var a = e.speed(r, o, u);
        return this.queue(function () {
          var r = e(this),
            o = r.attr("class") || "",
            u, f = a.children ? r.find("*").andSelf() : r;
          f = f.map(function () {
            var t = e(this);
            return {
              el: t,
              start: i.call(this)
            }
          }), u = function () {
            e.each(n, function (e, n) {
              t[n] && r[n + "Class"](t[n])
            })
          }, u(), f = f.map(function () {
            return this.end = i.call(this.el[0]), this.diff = s(this.start, this.end), this
          }), r.attr("class", o), f = f.map(function () {
            var t = this,
              n = e.Deferred(),
              r = jQuery.extend({}, a, {
                queue: !1,
                complete: function () {
                  n.resolve(t)
                }
              });
            return this.el.animate(this.diff, r), n.promise()
          }), e.when.apply(e, f.get()).done(function () {
            u(), e.each(arguments, function () {
              var t = this.el;
              e.each(this.diff, function (e) {
                t.css(e, "")
              })
            }), a.complete.call(r[0])
          })
        })
      }, e.fn.extend({
        _addClass: e.fn.addClass,
        addClass: function (t, n, r, i) {
          return n ? e.effects.animateClass.call(this, {
            add: t
          }, n, r, i) : this._addClass(t)
        },
        _removeClass: e.fn.removeClass,
        removeClass: function (t, n, r, i) {
          return n ? e.effects.animateClass.call(this, {
            remove: t
          }, n, r, i) : this._removeClass(t)
        },
        _toggleClass: e.fn.toggleClass,
        toggleClass: function (n, r, i, s, o) {
          return typeof r == "boolean" || r === t ? i ? e.effects.animateClass.call(this, r ? {
            add: n
          } : {
            remove: n
          }, i, s, o) : this._toggleClass(n, r) : e.effects.animateClass.call(this, {
            toggle: n
          }, r, i, s)
        },
        switchClass: function (t, n, r, i, s) {
          return e.effects.animateClass.call(this, {
            add: n,
            remove: t
          }, r, i, s)
        }
      })
    }(),
    function () {
      function i(t, n, r, i) {
        e.isPlainObject(t) && (n = t, t = t.effect), t = {
          effect: t
        }, n == null && (n = {}), e.isFunction(n) && (i = n, r = null, n = {});
        if (typeof n == "number" || e.fx.speeds[n]) i = r, r = n, n = {};
        return e.isFunction(r) && (i = r, r = null), n && e.extend(t, n), r = r || n.duration, t.duration = e.fx.off ? 0 : typeof r == "number" ? r : r in e.fx.speeds ? e.fx.speeds[r] : e.fx.speeds._default, t.complete = i || n.complete, t
      }

      function s(t) {
        return !t || typeof t == "number" || e.fx.speeds[t] ? !0 : typeof t == "string" && !e.effects.effect[t] ? n && e.effects[t] ? !1 : !0 : !1
      }
      e.extend(e.effects, {
        version: "1.9.2",
        save: function (e, t) {
          for (var n = 0; n < t.length; n++) t[n] !== null && e.data(r + t[n], e[0].style[t[n]])
        },
        restore: function (e, n) {
          var i, s;
          for (s = 0; s < n.length; s++) n[s] !== null && (i = e.data(r + n[s]), i === t && (i = ""), e.css(n[s], i))
        },
        setMode: function (e, t) {
          return t === "toggle" && (t = e.is(":hidden") ? "show" : "hide"), t
        },
        getBaseline: function (e, t) {
          var n, r;
          switch (e[0]) {
            case "top":
              n = 0;
              break;
            case "middle":
              n = .5;
              break;
            case "bottom":
              n = 1;
              break;
            default:
              n = e[0] / t.height
          }
          switch (e[1]) {
            case "left":
              r = 0;
              break;
            case "center":
              r = .5;
              break;
            case "right":
              r = 1;
              break;
            default:
              r = e[1] / t.width
          }
          return {
            x: r,
            y: n
          }
        },
        createWrapper: function (t) {
          if (t.parent().is(".ui-effects-wrapper")) return t.parent();
          var n = {
              width: t.outerWidth(!0),
              height: t.outerHeight(!0),
              "float": t.css("float")
            },
            r = e("<div></div>").addClass("ui-effects-wrapper").css({
              fontSize: "100%",
              background: "transparent",
              border: "none",
              margin: 0,
              padding: 0
            }),
            i = {
              width: t.width(),
              height: t.height()
            },
            s = document.activeElement;
          try {
            s.id
          } catch (o) {
            s = document.body
          }
          return t.wrap(r), (t[0] === s || e.contains(t[0], s)) && e(s).focus(), r = t.parent(), t.css("position") === "static" ? (r.css({
            position: "relative"
          }), t.css({
            position: "relative"
          })) : (e.extend(n, {
            position: t.css("position"),
            zIndex: t.css("z-index")
          }), e.each(["top", "left", "bottom", "right"], function (e, r) {
            n[r] = t.css(r), isNaN(parseInt(n[r], 10)) && (n[r] = "auto")
          }), t.css({
            position: "relative",
            top: 0,
            left: 0,
            right: "auto",
            bottom: "auto"
          })), t.css(i), r.css(n).show()
        },
        removeWrapper: function (t) {
          var n = document.activeElement;
          return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === n || e.contains(t[0], n)) && e(n).focus()), t
        },
        setTransition: function (t, n, r, i) {
          return i = i || {}, e.each(n, function (e, n) {
            var s = t.cssUnit(n);
            s[0] > 0 && (i[n] = s[0] * r + s[1])
          }), i
        }
      }), e.fn.extend({
        effect: function () {
          function a(n) {
            function u() {
              e.isFunction(i) && i.call(r[0]), e.isFunction(n) && n()
            }
            var r = e(this),
              i = t.complete,
              s = t.mode;
            (r.is(":hidden") ? s === "hide" : s === "show") ? u(): o.call(r[0], t, u)
          }
          var t = i.apply(this, arguments),
            r = t.mode,
            s = t.queue,
            o = e.effects.effect[t.effect],
            u = !o && n && e.effects[t.effect];
          return e.fx.off || !o && !u ? r ? this[r](t.duration, t.complete) : this.each(function () {
            t.complete && t.complete.call(this)
          }) : o ? s === !1 ? this.each(a) : this.queue(s || "fx", a) : u.call(this, {
            options: t,
            duration: t.duration,
            callback: t.complete,
            mode: t.mode
          })
        },
        _show: e.fn.show,
        show: function (e) {
          if (s(e)) return this._show.apply(this, arguments);
          var t = i.apply(this, arguments);
          return t.mode = "show", this.effect.call(this, t)
        },
        _hide: e.fn.hide,
        hide: function (e) {
          if (s(e)) return this._hide.apply(this, arguments);
          var t = i.apply(this, arguments);
          return t.mode = "hide", this.effect.call(this, t)
        },
        __toggle: e.fn.toggle,
        toggle: function (t) {
          if (s(t) || typeof t == "boolean" || e.isFunction(t)) return this.__toggle.apply(this, arguments);
          var n = i.apply(this, arguments);
          return n.mode = "toggle", this.effect.call(this, n)
        },
        cssUnit: function (t) {
          var n = this.css(t),
            r = [];
          return e.each(["em", "px", "%", "pt"], function (e, t) {
            n.indexOf(t) > 0 && (r = [parseFloat(n), t])
          }), r
        }
      })
    }(),
    function () {
      var t = {};
      e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, n) {
        t[n] = function (t) {
          return Math.pow(t, e + 2)
        }
      }), e.extend(t, {
        Sine: function (e) {
          return 1 - Math.cos(e * Math.PI / 2)
        },
        Circ: function (e) {
          return 1 - Math.sqrt(1 - e * e)
        },
        Elastic: function (e) {
          return e === 0 || e === 1 ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin(((e - 1) * 80 - 7.5) * Math.PI / 15)
        },
        Back: function (e) {
          return e * e * (3 * e - 2)
        },
        Bounce: function (e) {
          var t, n = 4;
          while (e < ((t = Math.pow(2, --n)) - 1) / 11);
          return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((t * 3 - 2) / 22 - e, 2)
        }
      }), e.each(t, function (t, n) {
        e.easing["easeIn" + t] = n, e.easing["easeOut" + t] = function (e) {
          return 1 - n(1 - e)
        }, e.easing["easeInOut" + t] = function (e) {
          return e < .5 ? n(e * 2) / 2 : 1 - n(e * -2 + 2) / 2
        }
      })
    }()
}(jQuery);
(function (e, t) {
  e.effects.effect.slide = function (t, n) {
    var r = e(this),
      i = ["position", "top", "bottom", "left", "right", "width", "height"],
      s = e.effects.setMode(r, t.mode || "show"),
      o = s === "show",
      u = t.direction || "left",
      a = u === "up" || u === "down" ? "top" : "left",
      f = u === "up" || u === "left",
      l, c = {};
    e.effects.save(r, i), r.show(), l = t.distance || r[a === "top" ? "outerHeight" : "outerWidth"](!0), e.effects.createWrapper(r).css({
      overflow: "hidden"
    }), o && r.css(a, f ? isNaN(l) ? "-" + l : -l : l), c[a] = (o ? f ? "+=" : "-=" : f ? "-=" : "+=") + l, r.animate(c, {
      queue: !1,
      duration: t.duration,
      easing: t.easing,
      complete: function () {
        s === "hide" && r.hide(), e.effects.restore(r, i), e.effects.removeWrapper(r), n()
      }
    })
  }
})(jQuery);
(function (e, t) {
  var n = /up|down|vertical/,
    r = /up|left|vertical|horizontal/;
  e.effects.effect.blind = function (t, i) {
    var s = e(this),
      o = ["position", "top", "bottom", "left", "right", "height", "width"],
      u = e.effects.setMode(s, t.mode || "hide"),
      a = t.direction || "up",
      f = n.test(a),
      l = f ? "height" : "width",
      c = f ? "top" : "left",
      h = r.test(a),
      p = {},
      d = u === "show",
      v, m, g;
    s.parent().is(".ui-effects-wrapper") ? e.effects.save(s.parent(), o) : e.effects.save(s, o), s.show(), v = e.effects.createWrapper(s).css({
      overflow: "hidden"
    }), m = v[l](), g = parseFloat(v.css(c)) || 0, p[l] = d ? m : 0, h || (s.css(f ? "bottom" : "right", 0).css(f ? "top" : "left", "auto").css({
      position: "absolute"
    }), p[c] = d ? g : m + g), d && (v.css(l, 0), h || v.css(c, g + m)), v.animate(p, {
      duration: t.duration,
      easing: t.easing,
      queue: !1,
      complete: function () {
        u === "hide" && s.hide(), e.effects.restore(s, o), e.effects.removeWrapper(s), i()
      }
    })
  }
})(jQuery);
(function (e, t) {
  e.effects.effect.fade = function (t, n) {
    var r = e(this),
      i = e.effects.setMode(r, t.mode || "toggle");
    r.animate({
      opacity: i
    }, {
      queue: !1,
      duration: t.duration,
      easing: t.easing,
      complete: n
    })
  }
})(jQuery);
(function (e, t) {
  e.effects.effect.highlight = function (t, n) {
    var r = e(this),
      i = ["backgroundImage", "backgroundColor", "opacity"],
      s = e.effects.setMode(r, t.mode || "show"),
      o = {
        backgroundColor: r.css("backgroundColor")
      };
    s === "hide" && (o.opacity = 0), e.effects.save(r, i), r.show().css({
      backgroundImage: "none",
      backgroundColor: t.color || "#ffff99"
    }).animate(o, {
      queue: !1,
      duration: t.duration,
      easing: t.easing,
      complete: function () {
        s === "hide" && r.hide(), e.effects.restore(r, i), n()
      }
    })
  }
})(jQuery);
(function (e, t) {
  e.effects.effect.pulsate = function (t, n) {
    var r = e(this),
      i = e.effects.setMode(r, t.mode || "show"),
      s = i === "show",
      o = i === "hide",
      u = s || i === "hide",
      a = (t.times || 5) * 2 + (u ? 1 : 0),
      f = t.duration / a,
      l = 0,
      c = r.queue(),
      h = c.length,
      p;
    if (s || !r.is(":visible")) r.css("opacity", 0).show(), l = 1;
    for (p = 1; p < a; p++) r.animate({
      opacity: l
    }, f, t.easing), l = 1 - l;
    r.animate({
      opacity: l
    }, f, t.easing), r.queue(function () {
      o && r.hide(), n()
    }), h > 1 && c.splice.apply(c, [1, 0].concat(c.splice(h, a + 1))), r.dequeue()
  }
})(jQuery);
(function (e, t) {
  var n = 0;
  e.widget("ui.autocomplete", {
    version: "1.9.2",
    defaultElement: "<input>",
    options: {
      appendTo: "body",
      autoFocus: !1,
      delay: 300,
      minLength: 1,
      position: {
        my: "left top",
        at: "left bottom",
        collision: "none"
      },
      source: null,
      change: null,
      close: null,
      focus: null,
      open: null,
      response: null,
      search: null,
      select: null
    },
    pending: 0,
    _create: function () {
      var t, n, r;
      this.isMultiLine = this._isMultiLine(), this.valueMethod = this.element[this.element.is("input,textarea") ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
        keydown: function (i) {
          if (this.element.prop("readOnly")) {
            t = !0, r = !0, n = !0;
            return
          }
          t = !1, r = !1, n = !1;
          var s = e.ui.keyCode;
          switch (i.keyCode) {
            case s.PAGE_UP:
              t = !0, this._move("previousPage", i);
              break;
            case s.PAGE_DOWN:
              t = !0, this._move("nextPage", i);
              break;
            case s.UP:
              t = !0, this._keyEvent("previous", i);
              break;
            case s.DOWN:
              t = !0, this._keyEvent("next", i);
              break;
            case s.ENTER:
            case s.NUMPAD_ENTER:
              this.menu.active && (t = !0, i.preventDefault(), this.menu.select(i));
              break;
            case s.TAB:
              this.menu.active && this.menu.select(i);
              break;
            case s.ESCAPE:
              this.menu.element.is(":visible") && (this._value(this.term), this.close(i), i.preventDefault());
              break;
            default:
              n = !0, this._searchTimeout(i)
          }
        },
        keypress: function (r) {
          if (t) {
            t = !1, r.preventDefault();
            return
          }
          if (n) return;
          var i = e.ui.keyCode;
          switch (r.keyCode) {
            case i.PAGE_UP:
              this._move("previousPage", r);
              break;
            case i.PAGE_DOWN:
              this._move("nextPage", r);
              break;
            case i.UP:
              this._keyEvent("previous", r);
              break;
            case i.DOWN:
              this._keyEvent("next", r)
          }
        },
        input: function (e) {
          if (r) {
            r = !1, e.preventDefault();
            return
          }
          this._searchTimeout(e)
        },
        focus: function () {
          this.selectedItem = null, this.previous = this._value()
        },
        blur: function (e) {
          if (this.cancelBlur) {
            delete this.cancelBlur;
            return
          }
          clearTimeout(this.searching), this.close(e), this._change(e)
        }
      }), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete").appendTo(this.document.find(this.options.appendTo || "body")[0]).menu({
        input: e(),
        role: null
      }).zIndex(this.element.zIndex() + 1).hide().data("menu"), this._on(this.menu.element, {
        mousedown: function (t) {
          t.preventDefault(), this.cancelBlur = !0, this._delay(function () {
            delete this.cancelBlur
          });
          var n = this.menu.element[0];
          e(t.target).closest(".ui-menu-item").length || this._delay(function () {
            var t = this;
            this.document.one("mousedown", function (r) {
              r.target !== t.element[0] && r.target !== n && !e.contains(n, r.target) && t.close()
            })
          })
        },
        menufocus: function (t, n) {
          if (this.isNewMenu) {
            this.isNewMenu = !1;
            if (t.originalEvent && /^mouse/.test(t.originalEvent.type)) {
              this.menu.blur(), this.document.one("mousemove", function () {
                e(t.target).trigger(t.originalEvent)
              });
              return
            }
          }
          var r = n.item.data("ui-autocomplete-item") || n.item.data("item.autocomplete");
          !1 !== this._trigger("focus", t, {
            item: r
          }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(r.value) : this.liveRegion.text(r.value)
        },
        menuselect: function (e, t) {
          var n = t.item.data("ui-autocomplete-item") || t.item.data("item.autocomplete"),
            r = this.previous;
          this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function () {
            this.previous = r, this.selectedItem = n
          })), !1 !== this._trigger("select", e, {
            item: n
          }) && this._value(n.value), this.term = this._value(), this.close(e), this.selectedItem = n
        }
      }), this.liveRegion = e("<span>", {
        role: "status",
        "aria-live": "polite"
      }).addClass("ui-helper-hidden-accessible").insertAfter(this.element), e.fn.bgiframe && this.menu.element.bgiframe(), this._on(this.window, {
        beforeunload: function () {
          this.element.removeAttr("autocomplete")
        }
      })
    },
    _destroy: function () {
      clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
    },
    _setOption: function (e, t) {
      this._super(e, t), e === "source" && this._initSource(), e === "appendTo" && this.menu.element.appendTo(this.document.find(t || "body")[0]), e === "disabled" && t && this.xhr && this.xhr.abort()
    },
    _isMultiLine: function () {
      return this.element.is("textarea") ? !0 : this.element.is("input") ? !1 : this.element.prop("isContentEditable")
    },
    _initSource: function () {
      var t, n, r = this;
      e.isArray(this.options.source) ? (t = this.options.source, this.source = function (n, r) {
        r(e.ui.autocomplete.filter(t, n.term))
      }) : typeof this.options.source == "string" ? (n = this.options.source, this.source = function (t, i) {
        r.xhr && r.xhr.abort(), r.xhr = e.ajax({
          url: n,
          data: t,
          dataType: "json",
          success: function (e) {
            i(e)
          },
          error: function () {
            i([])
          }
        })
      }) : this.source = this.options.source
    },
    _searchTimeout: function (e) {
      clearTimeout(this.searching), this.searching = this._delay(function () {
        this.term !== this._value() && (this.selectedItem = null, this.search(null, e))
      }, this.options.delay)
    },
    search: function (e, t) {
      e = e != null ? e : this._value(), this.term = this._value();
      if (e.length < this.options.minLength) return this.close(t);
      if (this._trigger("search", t) === !1) return;
      return this._search(e)
    },
    _search: function (e) {
      this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
        term: e
      }, this._response())
    },
    _response: function () {
      var e = this,
        t = ++n;
      return function (r) {
        t === n && e.__response(r), e.pending--, e.pending || e.element.removeClass("ui-autocomplete-loading")
      }
    },
    __response: function (e) {
      e && (e = this._normalize(e)), this._trigger("response", null, {
        content: e
      }), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
    },
    close: function (e) {
      this.cancelSearch = !0, this._close(e)
    },
    _close: function (e) {
      this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
    },
    _change: function (e) {
      this.previous !== this._value() && this._trigger("change", e, {
        item: this.selectedItem
      })
    },
    _normalize: function (t) {
      return t.length && t[0].label && t[0].value ? t : e.map(t, function (t) {
        return typeof t == "string" ? {
          label: t,
          value: t
        } : e.extend({
          label: t.label || t.value,
          value: t.value || t.label
        }, t)
      })
    },
    _suggest: function (t) {
      var n = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
      this._renderMenu(n, t), this.menu.refresh(), n.show(), this._resizeMenu(), n.position(e.extend({
        of: this.element
      }, this.options.position)), this.options.autoFocus && this.menu.next()
    },
    _resizeMenu: function () {
      var e = this.menu.element;
      e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
    },
    _renderMenu: function (t, n) {
      var r = this;
      e.each(n, function (e, n) {
        r._renderItemData(t, n)
      })
    },
    _renderItemData: function (e, t) {
      return this._renderItem(e, t).data("ui-autocomplete-item", t)
    },
    _renderItem: function (t, n) {
      return e("<li>").append(e("<a>").text(n.label)).appendTo(t)
    },
    _move: function (e, t) {
      if (!this.menu.element.is(":visible")) {
        this.search(null, t);
        return
      }
      if (this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e)) {
        this._value(this.term), this.menu.blur();
        return
      }
      this.menu[e](t)
    },
    widget: function () {
      return this.menu.element
    },
    _value: function () {
      return this.valueMethod.apply(this.element, arguments)
    },
    _keyEvent: function (e, t) {
      if (!this.isMultiLine || this.menu.element.is(":visible")) this._move(e, t), t.preventDefault()
    }
  }), e.extend(e.ui.autocomplete, {
    escapeRegex: function (e) {
      return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
    },
    filter: function (t, n) {
      var r = new RegExp(e.ui.autocomplete.escapeRegex(n), "i");
      return e.grep(t, function (e) {
        return r.test(e.label || e.value || e)
      })
    }
  }), e.widget("ui.autocomplete", e.ui.autocomplete, {
    options: {
      messages: {
        noResults: "No search results.",
        results: function (e) {
          return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
        }
      }
    },
    __response: function (e) {
      var t;
      this._superApply(arguments);
      if (this.options.disabled || this.cancelSearch) return;
      e && e.length ? t = this.options.messages.results(e.length) : t = this.options.messages.noResults, this.liveRegion.text(t)
    }
  })
})(jQuery);
(function (e, t) {
  var n = !1;
  e.widget("ui.menu", {
    version: "1.9.2",
    defaultElement: "<ul>",
    delay: 300,
    options: {
      icons: {
        submenu: "ui-icon-carat-1-e"
      },
      menus: "ul",
      position: {
        my: "left top",
        at: "right top"
      },
      role: "menu",
      blur: null,
      focus: null,
      select: null
    },
    _create: function () {
      this.activeMenu = this.element, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
        role: this.options.role,
        tabIndex: 0
      }).bind("click" + this.eventNamespace, e.proxy(function (e) {
        this.options.disabled && e.preventDefault()
      }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
        "mousedown .ui-menu-item > a": function (e) {
          e.preventDefault()
        },
        "click .ui-state-disabled > a": function (e) {
          e.preventDefault()
        },
        "click .ui-menu-item:has(a)": function (t) {
          var r = e(t.target).closest(".ui-menu-item");
          !n && r.not(".ui-state-disabled").length && (n = !0, this.select(t), r.has(".ui-menu").length ? this.expand(t) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && this.active.parents(".ui-menu").length === 1 && clearTimeout(this.timer)))
        },
        "mouseenter .ui-menu-item": function (t) {
          var n = e(t.currentTarget);
          n.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(t, n)
        },
        mouseleave: "collapseAll",
        "mouseleave .ui-menu": "collapseAll",
        focus: function (e, t) {
          var n = this.active || this.element.children(".ui-menu-item").eq(0);
          t || this.focus(e, n)
        },
        blur: function (t) {
          this._delay(function () {
            e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
          })
        },
        keydown: "_keydown"
      }), this.refresh(), this._on(this.document, {
        click: function (t) {
          e(t.target).closest(".ui-menu").length || this.collapseAll(t), n = !1
        }
      })
    },
    _destroy: function () {
      this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
        var t = e(this);
        t.data("ui-menu-submenu-carat") && t.remove()
      }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
    },
    _keydown: function (t) {
      function a(e) {
        return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
      }
      var n, r, i, s, o, u = !0;
      switch (t.keyCode) {
        case e.ui.keyCode.PAGE_UP:
          this.previousPage(t);
          break;
        case e.ui.keyCode.PAGE_DOWN:
          this.nextPage(t);
          break;
        case e.ui.keyCode.HOME:
          this._move("first", "first", t);
          break;
        case e.ui.keyCode.END:
          this._move("last", "last", t);
          break;
        case e.ui.keyCode.UP:
          this.previous(t);
          break;
        case e.ui.keyCode.DOWN:
          this.next(t);
          break;
        case e.ui.keyCode.LEFT:
          this.collapse(t);
          break;
        case e.ui.keyCode.RIGHT:
          this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
          break;
        case e.ui.keyCode.ENTER:
        case e.ui.keyCode.SPACE:
          this._activate(t);
          break;
        case e.ui.keyCode.ESCAPE:
          this.collapse(t);
          break;
        default:
          u = !1, r = this.previousFilter || "", i = String.fromCharCode(t.keyCode), s = !1, clearTimeout(this.filterTimer), i === r ? s = !0 : i = r + i, o = new RegExp("^" + a(i), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function () {
            return o.test(e(this).children("a").text())
          }), n = s && n.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : n, n.length || (i = String.fromCharCode(t.keyCode), o = new RegExp("^" + a(i), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function () {
            return o.test(e(this).children("a").text())
          })), n.length ? (this.focus(t, n), n.length > 1 ? (this.previousFilter = i, this.filterTimer = this._delay(function () {
            delete this.previousFilter
          }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
      }
      u && t.preventDefault()
    },
    _activate: function (e) {
      this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(e) : this.select(e))
    },
    refresh: function () {
      var t, n = this.options.icons.submenu,
        r = this.element.find(this.options.menus);
      r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
        role: this.options.role,
        "aria-hidden": "true",
        "aria-expanded": "false"
      }).each(function () {
        var t = e(this),
          r = t.prev("a"),
          i = e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);
        r.attr("aria-haspopup", "true").prepend(i), t.attr("aria-labelledby", r.attr("id"))
      }), t = r.add(this.element), t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
        tabIndex: -1,
        role: this._itemRole()
      }), t.children(":not(.ui-menu-item)").each(function () {
        var t = e(this);
        /[^\-??\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
      }), t.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
    },
    _itemRole: function () {
      return {
        menu: "menuitem",
        listbox: "option"
      } [this.options.role]
    },
    focus: function (e, t) {
      var n, r;
      this.blur(e, e && e.type === "focus"), this._scrollIntoView(t), this.active = t.first(), r = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", r.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), e && e.type === "keydown" ? this._close() : this.timer = this._delay(function () {
        this._close()
      }, this.delay), n = t.children(".ui-menu"), n.length && /^mouse/.test(e.type) && this._startOpening(n), this.activeMenu = t.parent(), this._trigger("focus", e, {
        item: t
      })
    },
    _scrollIntoView: function (t) {
      var n, r, i, s, o, u;
      this._hasScroll() && (n = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, r = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - n - r, s = this.activeMenu.scrollTop(), o = this.activeMenu.height(), u = t.height(), i < 0 ? this.activeMenu.scrollTop(s + i) : i + u > o && this.activeMenu.scrollTop(s + i - o + u))
    },
    blur: function (e, t) {
      t || clearTimeout(this.timer);
      if (!this.active) return;
      this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {
        item: this.active
      })
    },
    _startOpening: function (e) {
      clearTimeout(this.timer);
      if (e.attr("aria-hidden") !== "true") return;
      this.timer = this._delay(function () {
        this._close(), this._open(e)
      }, this.delay)
    },
    _open: function (t) {
      var n = e.extend({
        of: this.active
      }, this.options.position);
      clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(n)
    },
    collapseAll: function (t, n) {
      clearTimeout(this.timer), this.timer = this._delay(function () {
        var r = n ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
        r.length || (r = this.element), this._close(r), this.blur(t), this.activeMenu = r
      }, this.delay)
    },
    _close: function (e) {
      e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
    },
    collapse: function (e) {
      var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
      t && t.length && (this._close(), this.focus(e, t))
    },
    expand: function (e) {
      var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
      t && t.length && (this._open(t.parent()), this._delay(function () {
        this.focus(e, t)
      }))
    },
    next: function (e) {
      this._move("next", "first", e)
    },
    previous: function (e) {
      this._move("prev", "last", e)
    },
    isFirstItem: function () {
      return this.active && !this.active.prevAll(".ui-menu-item").length
    },
    isLastItem: function () {
      return this.active && !this.active.nextAll(".ui-menu-item").length
    },
    _move: function (e, t, n) {
      var r;
      this.active && (e === "first" || e === "last" ? r = this.active[e === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : r = this.active[e + "All"](".ui-menu-item").eq(0));
      if (!r || !r.length || !this.active) r = this.activeMenu.children(".ui-menu-item")[t]();
      this.focus(n, r)
    },
    nextPage: function (t) {
      var n, r, i;
      if (!this.active) {
        this.next(t);
        return
      }
      if (this.isLastItem()) return;
      this._hasScroll() ? (r = this.active.offset().top, i = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
        return n = e(this), n.offset().top - r - i < 0
      }), this.focus(t, n)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())
    },
    previousPage: function (t) {
      var n, r, i;
      if (!this.active) {
        this.next(t);
        return
      }
      if (this.isFirstItem()) return;
      this._hasScroll() ? (r = this.active.offset().top, i = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
        return n = e(this), n.offset().top - r + i > 0
      }), this.focus(t, n)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first())
    },
    _hasScroll: function () {
      return this.element.outerHeight() < this.element.prop("scrollHeight")
    },
    select: function (t) {
      this.active = this.active || e(t.target).closest(".ui-menu-item");
      var n = {
        item: this.active
      };
      this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, n)
    }
  })
})(jQuery);

/*!
 * jQuery UI Touch Punch 0.2.3
 * Copyright 2011?2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function (c) {
  c.support.touch = "ontouchend" in document;
  if (!c.support.touch) {
    return
  }
  var b = c.ui.mouse.prototype,
    f = b._mouseInit,
    g = b._mouseDestroy,
    e, d, i, h;

  function a(k, l) {
    if (k.originalEvent.touches.length > 1) {
      return
    }
    k.preventDefault();
    var m = k.originalEvent.changedTouches[0],
      j = document.createEvent("MouseEvents");
    j.initMouseEvent(l, true, true, window, 1, m.screenX, m.screenY, m.clientX, m.clientY, false, false, false, false, 0, null);
    k.target.dispatchEvent(j)
  }
  b._touchStart = function (k) {
    var j = this;
    if (i || !j._mouseCapture(k.originalEvent.changedTouches[0])) {
      return
    }
    i = true;
    h = false;
    e = k.originalEvent.touches[0].screenX;
    d = k.originalEvent.touches[0].screenY;
    a(k, "mouseover");
    a(k, "mousemove");
    a(k, "mousedown")
  };
  b._touchMove = function (l) {
    if (!i) {
      return
    }
    var k = l.originalEvent.touches[0].screenX,
      j = l.originalEvent.touches[0].screenY;
    if (e >= k - 2 && e <= k + 2 && d >= j - 2 && d <= j + 2) {
      h = false;
      return
    }
    h = true;
    a(l, "mousemove")
  };
  b._touchEnd = function (j) {
    if (!i) {
      return
    }
    a(j, "mouseup");
    a(j, "mouseout");
    if (!h) {
      a(j, "click")
    }
    i = false
  };
  b._mouseInit = function () {
    var j = this;
    j.element.bind({
      touchstart: c.proxy(j, "_touchStart"),
      touchmove: c.proxy(j, "_touchMove"),
      touchend: c.proxy(j, "_touchEnd")
    });
    f.call(j)
  };
  b._mouseDestroy = function () {
    var j = this;
    j.element.unbind({
      touchstart: c.proxy(j, "_touchStart"),
      touchmove: c.proxy(j, "_touchMove"),
      touchend: c.proxy(j, "_touchEnd")
    });
    g.call(j)
  }
})(jQuery);

(function (jQuery, window, undefined) {
  var matched, browser;
  jQuery.uaMatch = function (ua) {
    ua = ua.toLowerCase();
    var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || (/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || (/(webkit)[ \/]([\w.]+)/.exec(ua) || (/(msie) ([\w.]+)/.exec(ua) || (ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || []))));
    return {
      browser: match[1] || "",
      version: match[2] || "0"
    }
  };
  matched = jQuery.uaMatch(window.navigator.userAgent);
  browser = {};
  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version
  }
  if (browser.chrome || browser.opera && parseFloat(browser.version) > 12.14) browser.webkit = true;
  else if (browser.webkit) browser.safari = true;
  jQuery.browser = browser
})(jQuery, window);

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function (a) {
  "use strict";
  var b = a.fn.jquery.split(" ")[0].split(".");
  if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), + function (a) {
  "use strict";

  function b() {
    var a = document.createElement("bootstrap"),
      b = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend"
      };
    for (var c in b)
      if (void 0 !== a.style[c]) return {
        end: b[c]
      };
    return !1
  }
  a.fn.emulateTransitionEnd = function (b) {
    var c = !1,
      d = this;
    a(this).one("bsTransitionEnd", function () {
      c = !0
    });
    var e = function () {
      c || a(d).trigger(a.support.transition.end)
    };
    return setTimeout(e, b), this
  }, a(function () {
    a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
      bindType: a.support.transition.end,
      delegateType: a.support.transition.end,
      handle: function (b) {
        if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments)
      }
    })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var c = a(this),
        e = c.data("bs.alert");
      e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
    })
  }
  var c = '[data-dismiss="alert"]',
    d = function (b) {
      a(b).on("click", c, this.close)
    };
  d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
    function c() {
      g.detach().trigger("closed.bs.alert").remove()
    }
    var e = a(this),
      f = e.attr("data-target");
    f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));
    var g = a("#" === f ? [] : f);
    b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c())
  };
  var e = a.fn.alert;
  a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
    return a.fn.alert = e, this
  }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.button"),
        f = "object" == typeof b && b;
      e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
    })
  }
  var c = function (b, d) {
    this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
  };
  c.VERSION = "3.3.7", c.DEFAULTS = {
    loadingText: "loading..."
  }, c.prototype.setState = function (b) {
    var c = "disabled",
      d = this.$element,
      e = d.is("input") ? "val" : "html",
      f = d.data();
    b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
      d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1))
    }, this), 0)
  }, c.prototype.toggle = function () {
    var a = !0,
      b = this.$element.closest('[data-toggle="buttons"]');
    if (b.length) {
      var c = this.$element.find("input");
      "radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change")
    } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
  };
  var d = a.fn.button;
  a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
    return a.fn.button = d, this
  }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
    var d = a(c.target).closest(".btn");
    b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"))
  }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
    a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type))
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.carousel"),
        f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
        g = "string" == typeof b ? b : f.slide;
      e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
    })
  }
  var c = function (b, c) {
    this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
  };
  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = {
    interval: 5e3,
    pause: "hover",
    wrap: !0,
    keyboard: !0
  }, c.prototype.keydown = function (a) {
    if (!/input|textarea/i.test(a.target.tagName)) {
      switch (a.which) {
        case 37:
          this.prev();
          break;
        case 39:
          this.next();
          break;
        default:
          return
      }
      a.preventDefault()
    }
  }, c.prototype.cycle = function (b) {
    return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
  }, c.prototype.getItemIndex = function (a) {
    return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
  }, c.prototype.getItemForDirection = function (a, b) {
    var c = this.getItemIndex(b),
      d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;
    if (d && !this.options.wrap) return b;
    var e = "prev" == a ? -1 : 1,
      f = (c + e) % this.$items.length;
    return this.$items.eq(f)
  }, c.prototype.to = function (a) {
    var b = this,
      c = this.getItemIndex(this.$active = this.$element.find(".item.active"));
    if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
      b.to(a)
    }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a))
  }, c.prototype.pause = function (b) {
    return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
  }, c.prototype.next = function () {
    if (!this.sliding) return this.slide("next")
  }, c.prototype.prev = function () {
    if (!this.sliding) return this.slide("prev")
  }, c.prototype.slide = function (b, d) {
    var e = this.$element.find(".item.active"),
      f = d || this.getItemForDirection(b, e),
      g = this.interval,
      h = "next" == b ? "left" : "right",
      i = this;
    if (f.hasClass("active")) return this.sliding = !1;
    var j = f[0],
      k = a.Event("slide.bs.carousel", {
        relatedTarget: j,
        direction: h
      });
    if (this.$element.trigger(k), !k.isDefaultPrevented()) {
      if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
        this.$indicators.find(".active").removeClass("active");
        var l = a(this.$indicators.children()[this.getItemIndex(f)]);
        l && l.addClass("active")
      }
      var m = a.Event("slid.bs.carousel", {
        relatedTarget: j,
        direction: h
      });
      return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
        f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
          i.$element.trigger(m)
        }, 0)
      }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this
    }
  };
  var d = a.fn.carousel;
  a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
    return a.fn.carousel = d, this
  };
  var e = function (c) {
    var d, e = a(this),
      f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
    if (f.hasClass("carousel")) {
      var g = a.extend({}, f.data(), e.data()),
        h = e.attr("data-slide-to");
      h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
    }
  };
  a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
    a('[data-ride="carousel"]').each(function () {
      var c = a(this);
      b.call(c, c.data())
    })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    var c, d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");
    return a(d)
  }

  function c(b) {
    return this.each(function () {
      var c = a(this),
        e = c.data("bs.collapse"),
        f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
      !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]()
    })
  }
  var d = function (b, c) {
    this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
  };
  d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = {
    toggle: !0
  }, d.prototype.dimension = function () {
    var a = this.$element.hasClass("width");
    return a ? "width" : "height"
  }, d.prototype.show = function () {
    if (!this.transitioning && !this.$element.hasClass("in")) {
      var b, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
      if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
        var f = a.Event("show.bs.collapse");
        if (this.$element.trigger(f), !f.isDefaultPrevented()) {
          e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));
          var g = this.dimension();
          this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
          var h = function () {
            this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
          };
          if (!a.support.transition) return h.call(this);
          var i = a.camelCase(["scroll", g].join("-"));
          this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])
        }
      }
    }
  }, d.prototype.hide = function () {
    if (!this.transitioning && this.$element.hasClass("in")) {
      var b = a.Event("hide.bs.collapse");
      if (this.$element.trigger(b), !b.isDefaultPrevented()) {
        var c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
        var e = function () {
          this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
        };
        return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this)
      }
    }
  }, d.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]()
  }, d.prototype.getParent = function () {
    return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
      var e = a(d);
      this.addAriaAndCollapsedClass(b(e), e)
    }, this)).end()
  }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
    var c = a.hasClass("in");
    a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c)
  };
  var e = a.fn.collapse;
  a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
    return a.fn.collapse = e, this
  }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
    var e = a(this);
    e.attr("data-target") || d.preventDefault();
    var f = b(e),
      g = f.data("bs.collapse"),
      h = g ? "toggle" : e.data();
    c.call(f, h)
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    var c = b.attr("data-target");
    c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
    var d = c && a(c);
    return d && d.length ? d : b.parent()
  }

  function c(c) {
    c && 3 === c.which || (a(e).remove(), a(f).each(function () {
      var d = a(this),
        e = b(d),
        f = {
          relatedTarget: this
        };
      e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))))
    }))
  }

  function d(b) {
    return this.each(function () {
      var c = a(this),
        d = c.data("bs.dropdown");
      d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
    })
  }
  var e = ".dropdown-backdrop",
    f = '[data-toggle="dropdown"]',
    g = function (b) {
      a(b).on("click.bs.dropdown", this.toggle)
    };
  g.VERSION = "3.3.7", g.prototype.toggle = function (d) {
    var e = a(this);
    if (!e.is(".disabled, :disabled")) {
      var f = b(e),
        g = f.hasClass("open");
      if (c(), !g) {
        "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);
        var h = {
          relatedTarget: this
        };
        if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
        e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h))
      }
      return !1
    }
  }, g.prototype.keydown = function (c) {
    if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
      var d = a(this);
      if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
        var e = b(d),
          g = e.hasClass("open");
        if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");
        var h = " li:not(.disabled):visible a",
          i = e.find(".dropdown-menu" + h);
        if (i.length) {
          var j = i.index(c.target);
          38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
        }
      }
    }
  };
  var h = a.fn.dropdown;
  a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
    return a.fn.dropdown = h, this
  }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
    a.stopPropagation()
  }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown)
}(jQuery), + function (a) {
  "use strict";

  function b(b, d) {
    return this.each(function () {
      var e = a(this),
        f = e.data("bs.modal"),
        g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
      f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
    })
  }
  var c = function (b, c) {
    this.options = c, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
      this.$element.trigger("loaded.bs.modal")
    }, this))
  };
  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = {
    backdrop: !0,
    keyboard: !0,
    show: !0
  }, c.prototype.toggle = function (a) {
    return this.isShown ? this.hide() : this.show(a)
  }, c.prototype.show = function (b) {
    var d = this,
      e = a.Event("show.bs.modal", {
        relatedTarget: b
      });
    this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
      d.$element.one("mouseup.dismiss.bs.modal", function (b) {
        a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0)
      })
    }), this.backdrop(function () {
      var e = a.support.transition && d.$element.hasClass("fade");
      d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();
      var f = a.Event("shown.bs.modal", {
        relatedTarget: b
      });
      e ? d.$dialog.one("bsTransitionEnd", function () {
        d.$element.trigger("focus").trigger(f)
      }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f)
    }))
  }, c.prototype.hide = function (b) {
    b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal())
  }, c.prototype.enforceFocus = function () {
    a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
      document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
    }, this))
  }, c.prototype.escape = function () {
    this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
      27 == a.which && this.hide()
    }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
  }, c.prototype.resize = function () {
    this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal")
  }, c.prototype.hideModal = function () {
    var a = this;
    this.$element.hide(), this.backdrop(function () {
      a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal")
    })
  }, c.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
  }, c.prototype.backdrop = function (b) {
    var d = this,
      e = this.$element.hasClass("fade") ? "fade" : "";
    if (this.isShown && this.options.backdrop) {
      var f = a.support.transition && e;
      if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
          return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
        }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
      f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b()
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");
      var g = function () {
        d.removeBackdrop(), b && b()
      };
      a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g()
    } else b && b()
  }, c.prototype.handleUpdate = function () {
    this.adjustDialog()
  }, c.prototype.adjustDialog = function () {
    var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
      paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : ""
    })
  }, c.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: "",
      paddingRight: ""
    })
  }, c.prototype.checkScrollbar = function () {
    var a = window.innerWidth;
    if (!a) {
      var b = document.documentElement.getBoundingClientRect();
      a = b.right - Math.abs(b.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar()
  }, c.prototype.setScrollbar = function () {
    var a = parseInt(this.$body.css("padding-right") || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth)
  }, c.prototype.resetScrollbar = function () {
    this.$body.css("padding-right", this.originalBodyPad)
  }, c.prototype.measureScrollbar = function () {
    var a = document.createElement("div");
    a.className = "modal-scrollbar-measure", this.$body.append(a);
    var b = a.offsetWidth - a.clientWidth;
    return this.$body[0].removeChild(a), b
  };
  var d = a.fn.modal;
  a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
    return a.fn.modal = d, this
  }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
    var d = a(this),
      e = d.attr("href"),
      f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
      g = f.data("bs.modal") ? "toggle" : a.extend({
        remote: !/#/.test(e) && e
      }, f.data(), d.data());
    d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
      a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
        d.is(":visible") && d.trigger("focus")
      })
    }), b.call(f, g, this)
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.tooltip"),
        f = "object" == typeof b && b;
      !e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
    })
  }
  var c = function (a, b) {
    this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b)
  };
  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1,
    viewport: {
      selector: "body",
      padding: 0
    }
  }, c.prototype.init = function (b, c, d) {
    if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
        click: !1,
        hover: !1,
        focus: !1
      }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
    for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
      var g = e[f];
      if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
      else if ("manual" != g) {
        var h = "hover" == g ? "mouseenter" : "focusin",
          i = "hover" == g ? "mouseleave" : "focusout";
        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
      }
    }
    this.options.selector ? this._options = a.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle()
  }, c.prototype.getDefaults = function () {
    return c.DEFAULTS
  }, c.prototype.getOptions = function (b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
      show: b.delay,
      hide: b.delay
    }), b
  }, c.prototype.getDelegateOptions = function () {
    var b = {},
      c = this.getDefaults();
    return this._options && a.each(this._options, function (a, d) {
      c[a] != d && (b[a] = d)
    }), b
  }, c.prototype.enter = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void(c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function () {
      "in" == c.hoverState && c.show()
    }, c.options.delay.show)) : c.show())
  }, c.prototype.isInStateTrue = function () {
    for (var a in this.inState)
      if (this.inState[a]) return !0;
    return !1
  }, c.prototype.leave = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
    if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function () {
      "out" == c.hoverState && c.hide()
    }, c.options.delay.hide)) : c.hide()
  }, c.prototype.show = function () {
    var b = a.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(b);
      var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (b.isDefaultPrevented() || !d) return;
      var e = this,
        f = this.tip(),
        g = this.getUID(this.type);
      this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");
      var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
        i = /\s?auto?\s?/i,
        j = i.test(h);
      j && (h = h.replace(i, "") || "top"), f.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
      var k = this.getPosition(),
        l = f[0].offsetWidth,
        m = f[0].offsetHeight;
      if (j) {
        var n = h,
          o = this.getPosition(this.$viewport);
        h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h)
      }
      var p = this.getCalculatedOffset(h, k, l, m);
      this.applyPlacement(p, h);
      var q = function () {
        var a = e.hoverState;
        e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e)
      };
      a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q()
    }
  }, c.prototype.applyPlacement = function (b, c) {
    var d = this.tip(),
      e = d[0].offsetWidth,
      f = d[0].offsetHeight,
      g = parseInt(d.css("margin-top"), 10),
      h = parseInt(d.css("margin-left"), 10);
    isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({
      using: function (a) {
        d.css({
          top: Math.round(a.top),
          left: Math.round(a.left)
        })
      }
    }, b), 0), d.addClass("in");
    var i = d[0].offsetWidth,
      j = d[0].offsetHeight;
    "top" == c && j != f && (b.top = b.top + f - j);
    var k = this.getViewportAdjustedDelta(c, b, i, j);
    k.left ? b.left += k.left : b.top += k.top;
    var l = /top|bottom/.test(c),
      m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
      n = l ? "offsetWidth" : "offsetHeight";
    d.offset(b), this.replaceArrow(m, d[0][n], l)
  }, c.prototype.replaceArrow = function (a, b, c) {
    this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
  }, c.prototype.setContent = function () {
    var a = this.tip(),
      b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
  }, c.prototype.hide = function (b) {
    function d() {
      "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b()
    }
    var e = this,
      f = a(this.$tip),
      g = a.Event("hide.bs." + this.type);
    if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this
  }, c.prototype.fixTitle = function () {
    var a = this.$element;
    (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
  }, c.prototype.hasContent = function () {
    return this.getTitle()
  }, c.prototype.getPosition = function (b) {
    b = b || this.$element;
    var c = b[0],
      d = "BODY" == c.tagName,
      e = c.getBoundingClientRect();
    null == e.width && (e = a.extend({}, e, {
      width: e.right - e.left,
      height: e.bottom - e.top
    }));
    var f = window.SVGElement && c instanceof window.SVGElement,
      g = d ? {
        top: 0,
        left: 0
      } : f ? null : b.offset(),
      h = {
        scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
      },
      i = d ? {
        width: a(window).width(),
        height: a(window).height()
      } : null;
    return a.extend({}, e, h, i, g)
  }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
    return "bottom" == a ? {
      top: b.top + b.height,
      left: b.left + b.width / 2 - c / 2
    } : "top" == a ? {
      top: b.top - d,
      left: b.left + b.width / 2 - c / 2
    } : "left" == a ? {
      top: b.top + b.height / 2 - d / 2,
      left: b.left - c
    } : {
      top: b.top + b.height / 2 - d / 2,
      left: b.left + b.width
    }
  }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
    var e = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return e;
    var f = this.options.viewport && this.options.viewport.padding || 0,
      g = this.getPosition(this.$viewport);
    if (/right|left/.test(a)) {
      var h = b.top - f - g.scroll,
        i = b.top + f - g.scroll + d;
      h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
    } else {
      var j = b.left - f,
        k = b.left + f + c;
      j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
    }
    return e
  }, c.prototype.getTitle = function () {
    var a, b = this.$element,
      c = this.options;
    return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
  }, c.prototype.getUID = function (a) {
    do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
    return a
  }, c.prototype.tip = function () {
    if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    return this.$tip
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
  }, c.prototype.enable = function () {
    this.enabled = !0
  }, c.prototype.disable = function () {
    this.enabled = !1
  }, c.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }, c.prototype.toggle = function (b) {
    var c = this;
    b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
  }, c.prototype.destroy = function () {
    var a = this;
    clearTimeout(this.timeout), this.hide(function () {
      a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null
    })
  };
  var d = a.fn.tooltip;
  a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
    return a.fn.tooltip = d, this
  }
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.popover"),
        f = "object" == typeof b && b;
      !e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
    })
  }
  var c = function (a, b) {
    this.init("popover", a, b)
  };
  if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
  c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
    return c.DEFAULTS
  }, c.prototype.setContent = function () {
    var a = this.tip(),
      b = this.getTitle(),
      c = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
  }, c.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }, c.prototype.getContent = function () {
    var a = this.$element,
      b = this.options;
    return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
  }, c.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow")
  };
  var d = a.fn.popover;
  a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
    return a.fn.popover = d, this
  }
}(jQuery), + function (a) {
  "use strict";

  function b(c, d) {
    this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process()
  }

  function c(c) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.scrollspy"),
        f = "object" == typeof c && c;
      e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
    })
  }
  b.VERSION = "3.3.7", b.DEFAULTS = {
    offset: 10
  }, b.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }, b.prototype.refresh = function () {
    var b = this,
      c = "offset",
      d = 0;
    this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
      var b = a(this),
        e = b.data("target") || b.attr("href"),
        f = /^#./.test(e) && a(e);
      return f && f.length && f.is(":visible") && [
        [f[c]().top + d, e]
      ] || null
    }).sort(function (a, b) {
      return a[0] - b[0]
    }).each(function () {
      b.offsets.push(this[0]), b.targets.push(this[1])
    })
  }, b.prototype.process = function () {
    var a, b = this.$scrollElement.scrollTop() + this.options.offset,
      c = this.getScrollHeight(),
      d = this.options.offset + c - this.$scrollElement.height(),
      e = this.offsets,
      f = this.targets,
      g = this.activeTarget;
    if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
    if (g && b < e[0]) return this.activeTarget = null, this.clear();
    for (a = e.length; a--;) g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a])
  }, b.prototype.activate = function (b) {
    this.activeTarget = b, this.clear();
    var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
      d = a(c).parents("li").addClass("active");
    d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
  }, b.prototype.clear = function () {
    a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
  };
  var d = a.fn.scrollspy;
  a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
    return a.fn.scrollspy = d, this
  }, a(window).on("load.bs.scrollspy.data-api", function () {
    a('[data-spy="scroll"]').each(function () {
      var b = a(this);
      c.call(b, b.data())
    })
  })
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.tab");
      e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
    })
  }
  var c = function (b) {
    this.element = a(b)
  };
  c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
    var b = this.element,
      c = b.closest("ul:not(.dropdown-menu)"),
      d = b.data("target");
    if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
      var e = c.find(".active:last a"),
        f = a.Event("hide.bs.tab", {
          relatedTarget: b[0]
        }),
        g = a.Event("show.bs.tab", {
          relatedTarget: e[0]
        });
      if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
        var h = a(d);
        this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
          e.trigger({
            type: "hidden.bs.tab",
            relatedTarget: b[0]
          }), b.trigger({
            type: "shown.bs.tab",
            relatedTarget: e[0]
          })
        })
      }
    }
  }, c.prototype.activate = function (b, d, e) {
    function f() {
      g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e()
    }
    var g = d.find("> .active"),
      h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);
    g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in")
  };
  var d = a.fn.tab;
  a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
    return a.fn.tab = d, this
  };
  var e = function (c) {
    c.preventDefault(), b.call(a(this), "show")
  };
  a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e)
}(jQuery), + function (a) {
  "use strict";

  function b(b) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.affix"),
        f = "object" == typeof b && b;
      e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
    })
  }
  var c = function (b, d) {
    this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
  };
  c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
    offset: 0,
    target: window
  }, c.prototype.getState = function (a, b, c, d) {
    var e = this.$target.scrollTop(),
      f = this.$element.offset(),
      g = this.$target.height();
    if (null != c && "top" == this.affixed) return e < c && "top";
    if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";
    var h = null == this.affixed,
      i = h ? e : f.top,
      j = h ? g : b;
    return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom"
  }, c.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(c.RESET).addClass("affix");
    var a = this.$target.scrollTop(),
      b = this.$element.offset();
    return this.pinnedOffset = b.top - a
  }, c.prototype.checkPositionWithEventLoop = function () {
    setTimeout(a.proxy(this.checkPosition, this), 1)
  }, c.prototype.checkPosition = function () {
    if (this.$element.is(":visible")) {
      var b = this.$element.height(),
        d = this.options.offset,
        e = d.top,
        f = d.bottom,
        g = Math.max(a(document).height(), a(document.body).height());
      "object" != typeof d && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));
      var h = this.getState(g, b, e, f);
      if (this.affixed != h) {
        null != this.unpin && this.$element.css("top", "");
        var i = "affix" + (h ? "-" + h : ""),
          j = a.Event(i + ".bs.affix");
        if (this.$element.trigger(j), j.isDefaultPrevented()) return;
        this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix")
      }
      "bottom" == h && this.$element.offset({
        top: g - b - f
      })
    }
  };
  var d = a.fn.affix;
  a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
    return a.fn.affix = d, this
  }, a(window).on("load", function () {
    a('[data-spy="affix"]').each(function () {
      var c = a(this),
        d = c.data();
      d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
    })
  })
}(jQuery);

/*!
 * Bootstrap-select v1.12.4 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2017 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
! function (a, b) {
  "function" == typeof define && define.amd ? define(["jquery"], function (a) {
    return b(a)
  }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function (a) {
  ! function (a) {
    "use strict";

    function b(b) {
      var c = [{
        re: /[\xC0-\xC6]/g,
        ch: "A"
      }, {
        re: /[\xE0-\xE6]/g,
        ch: "a"
      }, {
        re: /[\xC8-\xCB]/g,
        ch: "E"
      }, {
        re: /[\xE8-\xEB]/g,
        ch: "e"
      }, {
        re: /[\xCC-\xCF]/g,
        ch: "I"
      }, {
        re: /[\xEC-\xEF]/g,
        ch: "i"
      }, {
        re: /[\xD2-\xD6]/g,
        ch: "O"
      }, {
        re: /[\xF2-\xF6]/g,
        ch: "o"
      }, {
        re: /[\xD9-\xDC]/g,
        ch: "U"
      }, {
        re: /[\xF9-\xFC]/g,
        ch: "u"
      }, {
        re: /[\xC7-\xE7]/g,
        ch: "c"
      }, {
        re: /[\xD1]/g,
        ch: "N"
      }, {
        re: /[\xF1]/g,
        ch: "n"
      }];
      return a.each(c, function () {
        b = b ? b.replace(this.re, this.ch) : ""
      }), b
    }

    function c(b) {
      var c = arguments,
        d = b;
      [].shift.apply(c);
      var e, f = this.each(function () {
        var b = a(this);
        if (b.is("select")) {
          var f = b.data("selectpicker"),
            g = "object" == typeof d && d;
          if (f) {
            if (g)
              for (var h in g) g.hasOwnProperty(h) && (f.options[h] = g[h])
          } else {
            var i = a.extend({}, l.DEFAULTS, a.fn.selectpicker.defaults || {}, b.data(), g);
            i.template = a.extend({}, l.DEFAULTS.template, a.fn.selectpicker.defaults ? a.fn.selectpicker.defaults.template : {}, b.data().template, g.template), b.data("selectpicker", f = new l(this, i))
          }
          "string" == typeof d && (e = f[d] instanceof Function ? f[d].apply(f, c) : f.options[d])
        }
      });
      return "undefined" != typeof e ? e : f
    }
    String.prototype.includes || ! function () {
      var a = {}.toString,
        b = function () {
          try {
            var a = {},
              b = Object.defineProperty,
              c = b(a, a, a) && b
          } catch (a) {}
          return c
        }(),
        c = "".indexOf,
        d = function (b) {
          if (null == this) throw new TypeError;
          var d = String(this);
          if (b && "[object RegExp]" == a.call(b)) throw new TypeError;
          var e = d.length,
            f = String(b),
            g = f.length,
            h = arguments.length > 1 ? arguments[1] : void 0,
            i = h ? Number(h) : 0;
          i != i && (i = 0);
          var j = Math.min(Math.max(i, 0), e);
          return !(g + j > e) && c.call(d, f, i) != -1
        };
      b ? b(String.prototype, "includes", {
        value: d,
        configurable: !0,
        writable: !0
      }) : String.prototype.includes = d
    }(), String.prototype.startsWith || ! function () {
      var a = function () {
          try {
            var a = {},
              b = Object.defineProperty,
              c = b(a, a, a) && b
          } catch (a) {}
          return c
        }(),
        b = {}.toString,
        c = function (a) {
          if (null == this) throw new TypeError;
          var c = String(this);
          if (a && "[object RegExp]" == b.call(a)) throw new TypeError;
          var d = c.length,
            e = String(a),
            f = e.length,
            g = arguments.length > 1 ? arguments[1] : void 0,
            h = g ? Number(g) : 0;
          h != h && (h = 0);
          var i = Math.min(Math.max(h, 0), d);
          if (f + i > d) return !1;
          for (var j = -1; ++j < f;)
            if (c.charCodeAt(i + j) != e.charCodeAt(j)) return !1;
          return !0
        };
      a ? a(String.prototype, "startsWith", {
        value: c,
        configurable: !0,
        writable: !0
      }) : String.prototype.startsWith = c
    }(), Object.keys || (Object.keys = function (a, b, c) {
      c = [];
      for (b in a) c.hasOwnProperty.call(a, b) && c.push(b);
      return c
    });
    var d = {
      useDefault: !1,
      _set: a.valHooks.select.set
    };
    a.valHooks.select.set = function (b, c) {
      return c && !d.useDefault && a(b).data("selected", !0), d._set.apply(this, arguments)
    };
    var e = null,
      f = function () {
        try {
          return new Event("change"), !0
        } catch (a) {
          return !1
        }
      }();
    a.fn.triggerNative = function (a) {
      var b, c = this[0];
      c.dispatchEvent ? (f ? b = new Event(a, {
        bubbles: !0
      }) : (b = document.createEvent("Event"), b.initEvent(a, !0, !1)), c.dispatchEvent(b)) : c.fireEvent ? (b = document.createEventObject(), b.eventType = a, c.fireEvent("on" + a, b)) : this.trigger(a)
    }, a.expr.pseudos.icontains = function (b, c, d) {
      var e = a(b).find("a"),
        f = (e.data("tokens") || e.text()).toString().toUpperCase();
      return f.includes(d[3].toUpperCase())
    }, a.expr.pseudos.ibegins = function (b, c, d) {
      var e = a(b).find("a"),
        f = (e.data("tokens") || e.text()).toString().toUpperCase();
      return f.startsWith(d[3].toUpperCase())
    }, a.expr.pseudos.aicontains = function (b, c, d) {
      var e = a(b).find("a"),
        f = (e.data("tokens") || e.data("normalizedText") || e.text()).toString().toUpperCase();
      return f.includes(d[3].toUpperCase())
    }, a.expr.pseudos.aibegins = function (b, c, d) {
      var e = a(b).find("a"),
        f = (e.data("tokens") || e.data("normalizedText") || e.text()).toString().toUpperCase();
      return f.startsWith(d[3].toUpperCase())
    };
    var g = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      },
      h = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#x27;": "'",
        "&#x60;": "`"
      },
      i = function (a) {
        var b = function (b) {
            return a[b]
          },
          c = "(?:" + Object.keys(a).join("|") + ")",
          d = RegExp(c),
          e = RegExp(c, "g");
        return function (a) {
          return a = null == a ? "" : "" + a, d.test(a) ? a.replace(e, b) : a
        }
      },
      j = i(g),
      k = i(h),
      l = function (b, c) {
        d.useDefault || (a.valHooks.select.set = d._set, d.useDefault = !0), this.$element = a(b), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = c, null === this.options.title && (this.options.title = this.$element.attr("title"));
        var e = this.options.windowPadding;
        "number" == typeof e && (this.options.windowPadding = [e, e, e, e]), this.val = l.prototype.val, this.render = l.prototype.render, this.refresh = l.prototype.refresh, this.setStyle = l.prototype.setStyle, this.selectAll = l.prototype.selectAll, this.deselectAll = l.prototype.deselectAll, this.destroy = l.prototype.destroy, this.remove = l.prototype.remove, this.show = l.prototype.show, this.hide = l.prototype.hide, this.init()
      };
    l.VERSION = "1.12.4", l.DEFAULTS = {
      noneSelectedText: "",
      noneResultsText: "No results matched {0}",
      countSelectedText: function (a, b) {
        return 1 == a ? "{0} item selected" : "{0} items selected"
      },
      maxOptionsText: function (a, b) {
        return [1 == a ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == b ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
      },
      selectAllText: "Select All",
      deselectAllText: "Deselect All",
      doneButton: !1,
      doneButtonText: "Close",
      multipleSeparator: ", ",
      styleBase: "btn",
      style: "btn-default",
      size: "auto",
      title: null,
      selectedTextFormat: "values",
      width: !1,
      container: !1,
      hideDisabled: !1,
      showSubtext: !1,
      showIcon: !0,
      showContent: !0,
      dropupAuto: !0,
      header: !1,
      liveSearch: !1,
      liveSearchPlaceholder: null,
      liveSearchNormalize: !1,
      liveSearchStyle: "contains",
      actionsBox: !1,
      iconBase: "glyphicon",
      tickIcon: "glyphicon-ok",
      showTick: !1,
      template: {
        caret: '<span class="caret"></span>'
      },
      maxOptions: !1,
      mobile: !1,
      selectOnTab: !1,
      dropdownAlignRight: !1,
      windowPadding: 0
    }, l.prototype = {
      constructor: l,
      init: function () {
        var b = this,
          c = this.$element.attr("id");
        this.$element.addClass("bs-select-hidden"), this.liObj = {}, this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement).appendTo(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.$element.removeClass("bs-select-hidden"), this.options.dropdownAlignRight === !0 && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof c && (this.$button.attr("data-id", c), a('label[for="' + c + '"]').click(function (a) {
          a.preventDefault(), b.$button.focus()
        })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
          "hide.bs.dropdown": function (a) {
            b.$menuInner.attr("aria-expanded", !1), b.$element.trigger("hide.bs.select", a)
          },
          "hidden.bs.dropdown": function (a) {
            b.$element.trigger("hidden.bs.select", a)
          },
          "show.bs.dropdown": function (a) {
            b.$menuInner.attr("aria-expanded", !0), b.$element.trigger("show.bs.select", a)
          },
          "shown.bs.dropdown": function (a) {
            b.$element.trigger("shown.bs.select", a)
          }
        }), b.$element[0].hasAttribute("required") && this.$element.on("invalid", function () {
          b.$button.addClass("bs-invalid"), b.$element.on({
            "focus.bs.select": function () {
              b.$button.focus(), b.$element.off("focus.bs.select")
            },
            "shown.bs.select": function () {
              b.$element.val(b.$element.val()).off("shown.bs.select")
            },
            "rendered.bs.select": function () {
              this.validity.valid && b.$button.removeClass("bs-invalid"), b.$element.off("rendered.bs.select")
            }
          }), b.$button.on("blur.bs.select", function () {
            b.$element.focus().blur(), b.$button.off("blur.bs.select")
          })
        }), setTimeout(function () {
          b.$element.trigger("loaded.bs.select")
        })
      },
      createDropdown: function () {
        var b = this.multiple || this.options.showTick ? " show-tick" : "",
          c = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
          d = this.autofocus ? " autofocus" : "",
          e = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
          f = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + j(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search"></div>' : "",
          g = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
          h = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
          i = '<div class="btn-group bootstrap-select' + b + c + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + d + ' role="button"><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open" role="combobox">' + e + f + g + '<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>' + h + "</div></div>";
        return a(i)
      },
      createView: function () {
        var a = this.createDropdown(),
          b = this.createLi();
        return a.find("ul")[0].innerHTML = b, a
      },
      reloadLi: function () {
        var a = this.createLi();
        this.$menuInner[0].innerHTML = a
      },
      createLi: function () {
        var c = this,
          d = [],
          e = 0,
          f = document.createElement("option"),
          g = -1,
          h = function (a, b, c, d) {
            return "<li" + ("undefined" != typeof c && "" !== c ? ' class="' + c + '"' : "") + ("undefined" != typeof b && null !== b ? ' data-original-index="' + b + '"' : "") + ("undefined" != typeof d && null !== d ? 'data-optgroup="' + d + '"' : "") + ">" + a + "</li>"
          },
          i = function (d, e, f, g) {
            return '<a tabindex="0"' + ("undefined" != typeof e ? ' class="' + e + '"' : "") + (f ? ' style="' + f + '"' : "") + (c.options.liveSearchNormalize ? ' data-normalized-text="' + b(j(a(d).html())) + '"' : "") + ("undefined" != typeof g || null !== g ? ' data-tokens="' + g + '"' : "") + ' role="option">' + d + '<span class="' + c.options.iconBase + " " + c.options.tickIcon + ' check-mark"></span></a>'
          };
        if (this.options.title && !this.multiple && (g--, !this.$element.find(".bs-title-option").length)) {
          var k = this.$element[0];
          f.className = "bs-title-option", f.innerHTML = this.options.title, f.value = "", k.insertBefore(f, k.firstChild);
          var l = a(k.options[k.selectedIndex]);
          void 0 === l.attr("selected") && void 0 === this.$element.data("selected") && (f.selected = !0)
        }
        var m = this.$element.find("option");
        return m.each(function (b) {
          var f = a(this);
          if (g++, !f.hasClass("bs-title-option")) {
            var k, l = this.className || "",
              n = j(this.style.cssText),
              o = f.data("content") ? f.data("content") : f.html(),
              p = f.data("tokens") ? f.data("tokens") : null,
              q = "undefined" != typeof f.data("subtext") ? '<small class="text-muted">' + f.data("subtext") + "</small>" : "",
              r = "undefined" != typeof f.data("icon") ? '<span class="' + c.options.iconBase + " " + f.data("icon") + '"></span> ' : "",
              s = f.parent(),
              t = "OPTGROUP" === s[0].tagName,
              u = t && s[0].disabled,
              v = this.disabled || u;
            if ("" !== r && v && (r = "<span>" + r + "</span>"), c.options.hideDisabled && (v && !t || u)) return k = f.data("prevHiddenIndex"), f.next().data("prevHiddenIndex", void 0 !== k ? k : b), void g--;
            if (f.data("content") || (o = r + '<span class="text">' + o + q + "</span>"), t && f.data("divider") !== !0) {
              if (c.options.hideDisabled && v) {
                if (void 0 === s.data("allOptionsDisabled")) {
                  var w = s.children();
                  s.data("allOptionsDisabled", w.filter(":disabled").length === w.length)
                }
                if (s.data("allOptionsDisabled")) return void g--
              }
              var x = " " + s[0].className || "";
              if (0 === f.index()) {
                e += 1;
                var y = s[0].label,
                  z = "undefined" != typeof s.data("subtext") ? '<small class="text-muted">' + s.data("subtext") + "</small>" : "",
                  A = s.data("icon") ? '<span class="' + c.options.iconBase + " " + s.data("icon") + '"></span> ' : "";
                y = A + '<span class="text">' + j(y) + z + "</span>", 0 !== b && d.length > 0 && (g++, d.push(h("", null, "divider", e + "div"))), g++, d.push(h(y, null, "dropdown-header" + x, e))
              }
              if (c.options.hideDisabled && v) return void g--;
              d.push(h(i(o, "opt " + l + x, n, p), b, "", e))
            } else if (f.data("divider") === !0) d.push(h("", b, "divider"));
            else if (f.data("hidden") === !0) k = f.data("prevHiddenIndex"), f.next().data("prevHiddenIndex", void 0 !== k ? k : b), d.push(h(i(o, l, n, p), b, "hidden is-hidden"));
            else {
              var B = this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName;
              if (!B && c.options.hideDisabled && (k = f.data("prevHiddenIndex"), void 0 !== k)) {
                var C = m.eq(k)[0].previousElementSibling;
                C && "OPTGROUP" === C.tagName && !C.disabled && (B = !0)
              }
              B && (g++, d.push(h("", null, "divider", e + "div"))), d.push(h(i(o, l, n, p), b))
            }
            c.liObj[b] = g
          }
        }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), d.join("")
      },
      findLis: function () {
        return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
      },
      render: function (b) {
        var c, d = this,
          e = this.$element.find("option");
        b !== !1 && e.each(function (a) {
          var b = d.findLis().eq(d.liObj[a]);
          d.setDisabled(a, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, b), d.setSelected(a, this.selected, b)
        }), this.togglePlaceholder(), this.tabIndex();
        var f = e.map(function () {
            if (this.selected) {
              if (d.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
              var b, c = a(this),
                e = c.data("icon") && d.options.showIcon ? '<i class="' + d.options.iconBase + " " + c.data("icon") + '"></i> ' : "";
              return b = d.options.showSubtext && c.data("subtext") && !d.multiple ? ' <small class="text-muted">' + c.data("subtext") + "</small>" : "", "undefined" != typeof c.attr("title") ? c.attr("title") : c.data("content") && d.options.showContent ? c.data("content").toString() : e + c.html() + b
            }
          }).toArray(),
          g = this.multiple ? f.join(this.options.multipleSeparator) : f[0];
        if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
          var h = this.options.selectedTextFormat.split(">");
          if (h.length > 1 && f.length > h[1] || 1 == h.length && f.length >= 2) {
            c = this.options.hideDisabled ? ", [disabled]" : "";
            var i = e.not('[data-divider="true"], [data-hidden="true"]' + c).length,
              j = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(f.length, i) : this.options.countSelectedText;
            g = j.replace("{0}", f.length.toString()).replace("{1}", i.toString())
          }
        }
        void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (g = this.options.title), g || (g = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", k(a.trim(g.replace(/<[^>]*>?/g, "")))), this.$button.children(".filter-option").html(g), this.$element.trigger("rendered.bs.select")
      },
      setStyle: function (a, b) {
        this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
        var c = a ? a : this.options.style;
        "add" == b ? this.$button.addClass(c) : "remove" == b ? this.$button.removeClass(c) : (this.$button.removeClass(this.options.style), this.$button.addClass(c))
      },
      liHeight: function (b) {
        if (b || this.options.size !== !1 && !this.sizeInfo) {
          var c = document.createElement("div"),
            d = document.createElement("div"),
            e = document.createElement("ul"),
            f = document.createElement("li"),
            g = document.createElement("li"),
            h = document.createElement("a"),
            i = document.createElement("span"),
            j = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
            k = this.options.liveSearch ? document.createElement("div") : null,
            l = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
            m = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
          if (i.className = "text", c.className = this.$menu[0].parentNode.className + " open", d.className = "dropdown-menu open", e.className = "dropdown-menu inner", f.className = "divider", i.appendChild(document.createTextNode("Inner text")), h.appendChild(i), g.appendChild(h), e.appendChild(g), e.appendChild(f), j && d.appendChild(j), k) {
            var n = document.createElement("input");
            k.className = "bs-searchbox", n.className = "form-control", k.appendChild(n), d.appendChild(k)
          }
          l && d.appendChild(l), d.appendChild(e), m && d.appendChild(m), c.appendChild(d), document.body.appendChild(c);
          var o = h.offsetHeight,
            p = j ? j.offsetHeight : 0,
            q = k ? k.offsetHeight : 0,
            r = l ? l.offsetHeight : 0,
            s = m ? m.offsetHeight : 0,
            t = a(f).outerHeight(!0),
            u = "function" == typeof getComputedStyle && getComputedStyle(d),
            v = u ? null : a(d),
            w = {
              vert: parseInt(u ? u.paddingTop : v.css("paddingTop")) + parseInt(u ? u.paddingBottom : v.css("paddingBottom")) + parseInt(u ? u.borderTopWidth : v.css("borderTopWidth")) + parseInt(u ? u.borderBottomWidth : v.css("borderBottomWidth")),
              horiz: parseInt(u ? u.paddingLeft : v.css("paddingLeft")) + parseInt(u ? u.paddingRight : v.css("paddingRight")) + parseInt(u ? u.borderLeftWidth : v.css("borderLeftWidth")) + parseInt(u ? u.borderRightWidth : v.css("borderRightWidth"))
            },
            x = {
              vert: w.vert + parseInt(u ? u.marginTop : v.css("marginTop")) + parseInt(u ? u.marginBottom : v.css("marginBottom")) + 2,
              horiz: w.horiz + parseInt(u ? u.marginLeft : v.css("marginLeft")) + parseInt(u ? u.marginRight : v.css("marginRight")) + 2
            };
          document.body.removeChild(c), this.sizeInfo = {
            liHeight: o,
            headerHeight: p,
            searchHeight: q,
            actionsHeight: r,
            doneButtonHeight: s,
            dividerHeight: t,
            menuPadding: w,
            menuExtras: x
          }
        }
      },
      setSize: function () {
        if (this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), this.options.size !== !1) {
          var b, c, d, e, f, g, h, i, j = this,
            k = this.$menu,
            l = this.$menuInner,
            m = a(window),
            n = this.$newElement[0].offsetHeight,
            o = this.$newElement[0].offsetWidth,
            p = this.sizeInfo.liHeight,
            q = this.sizeInfo.headerHeight,
            r = this.sizeInfo.searchHeight,
            s = this.sizeInfo.actionsHeight,
            t = this.sizeInfo.doneButtonHeight,
            u = this.sizeInfo.dividerHeight,
            v = this.sizeInfo.menuPadding,
            w = this.sizeInfo.menuExtras,
            x = this.options.hideDisabled ? ".disabled" : "",
            y = function () {
              var b, c = j.$newElement.offset(),
                d = a(j.options.container);
              j.options.container && !d.is("body") ? (b = d.offset(), b.top += parseInt(d.css("borderTopWidth")), b.left += parseInt(d.css("borderLeftWidth"))) : b = {
                top: 0,
                left: 0
              };
              var e = j.options.windowPadding;
              f = c.top - b.top - m.scrollTop(), g = m.height() - f - n - b.top - e[2], h = c.left - b.left - m.scrollLeft(), i = m.width() - h - o - b.left - e[1], f -= e[0], h -= e[3]
            };
          if (y(), "auto" === this.options.size) {
            var z = function () {
              var m, n = function (b, c) {
                  return function (d) {
                    return c ? d.classList ? d.classList.contains(b) : a(d).hasClass(b) : !(d.classList ? d.classList.contains(b) : a(d).hasClass(b))
                  }
                },
                u = j.$menuInner[0].getElementsByTagName("li"),
                x = Array.prototype.filter ? Array.prototype.filter.call(u, n("hidden", !1)) : j.$lis.not(".hidden"),
                z = Array.prototype.filter ? Array.prototype.filter.call(x, n("dropdown-header", !0)) : x.filter(".dropdown-header");
              y(), b = g - w.vert, c = i - w.horiz, j.options.container ? (k.data("height") || k.data("height", k.height()), d = k.data("height"), k.data("width") || k.data("width", k.width()), e = k.data("width")) : (d = k.height(), e = k.width()), j.options.dropupAuto && j.$newElement.toggleClass("dropup", f > g && b - w.vert < d), j.$newElement.hasClass("dropup") && (b = f - w.vert), "auto" === j.options.dropdownAlignRight && k.toggleClass("dropdown-menu-right", h > i && c - w.horiz < e - o), m = x.length + z.length > 3 ? 3 * p + w.vert - 2 : 0, k.css({
                "max-height": b + "px",
                overflow: "hidden",
                "min-height": m + q + r + s + t + "px"
              }), l.css({
                "max-height": b - q - r - s - t - v.vert + "px",
                "overflow-y": "auto",
                "min-height": Math.max(m - v.vert, 0) + "px"
              })
            };
            z(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", z), m.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", z)
          } else if (this.options.size && "auto" != this.options.size && this.$lis.not(x).length > this.options.size) {
            var A = this.$lis.not(".divider").not(x).children().slice(0, this.options.size).last().parent().index(),
              B = this.$lis.slice(0, A + 1).filter(".divider").length;
            b = p * this.options.size + B * u + v.vert, j.options.container ? (k.data("height") || k.data("height", k.height()), d = k.data("height")) : d = k.height(), j.options.dropupAuto && this.$newElement.toggleClass("dropup", f > g && b - w.vert < d), k.css({
              "max-height": b + q + r + s + t + "px",
              overflow: "hidden",
              "min-height": ""
            }), l.css({
              "max-height": b - v.vert + "px",
              "overflow-y": "auto",
              "min-height": ""
            })
          }
        }
      },
      setWidth: function () {
        if ("auto" === this.options.width) {
          this.$menu.css("min-width", "0");
          var a = this.$menu.parent().clone().appendTo("body"),
            b = this.options.container ? this.$newElement.clone().appendTo("body") : a,
            c = a.children(".dropdown-menu").outerWidth(),
            d = b.css("width", "auto").children("button").outerWidth();
          a.remove(), b.remove(), this.$newElement.css("width", Math.max(c, d) + "px")
        } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
        this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
      },
      selectPosition: function () {
        this.$bsContainer = a('<div class="bs-container" />');
        var b, c, d, e = this,
          f = a(this.options.container),
          g = function (a) {
            e.$bsContainer.addClass(a.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", a.hasClass("dropup")), b = a.offset(), f.is("body") ? c = {
              top: 0,
              left: 0
            } : (c = f.offset(), c.top += parseInt(f.css("borderTopWidth")) - f.scrollTop(), c.left += parseInt(f.css("borderLeftWidth")) - f.scrollLeft()), d = a.hasClass("dropup") ? 0 : a[0].offsetHeight, e.$bsContainer.css({
              top: b.top - c.top + d,
              left: b.left - c.left,
              width: a[0].offsetWidth
            })
          };
        this.$button.on("click", function () {
          var b = a(this);
          e.isDisabled() || (g(e.$newElement), e.$bsContainer.appendTo(e.options.container).toggleClass("open", !b.hasClass("open")).append(e.$menu))
        }), a(window).on("resize scroll", function () {
          g(e.$newElement)
        }), this.$element.on("hide.bs.select", function () {
          e.$menu.data("height", e.$menu.height()), e.$bsContainer.detach()
        })
      },
      setSelected: function (a, b, c) {
        c || (this.togglePlaceholder(), c = this.findLis().eq(this.liObj[a])), c.toggleClass("selected", b).find("a").attr("aria-selected", b)
      },
      setDisabled: function (a, b, c) {
        c || (c = this.findLis().eq(this.liObj[a])), b ? c.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1).attr("aria-disabled", !0) : c.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0).attr("aria-disabled", !1)
      },
      isDisabled: function () {
        return this.$element[0].disabled
      },
      checkDisabled: function () {
        var a = this;
        this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1).attr("aria-disabled", !0)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled").attr("aria-disabled", !1)), this.$button.attr("tabindex") != -1 || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function () {
          return !a.isDisabled()
        })
      },
      togglePlaceholder: function () {
        var a = this.$element.val();
        this.$button.toggleClass("bs-placeholder", null === a || "" === a || a.constructor === Array && 0 === a.length)
      },
      tabIndex: function () {
        this.$element.data("tabindex") !== this.$element.attr("tabindex") && this.$element.attr("tabindex") !== -98 && "-98" !== this.$element.attr("tabindex") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex"))), this.$element.attr("tabindex", -98)
      },
      clickListener: function () {
        var b = this,
          c = a(document);
        c.data("spaceSelect", !1), this.$button.on("keyup", function (a) {
          /(32)/.test(a.keyCode.toString(10)) && c.data("spaceSelect") && (a.preventDefault(), c.data("spaceSelect", !1))
        }), this.$button.on("click", function () {
          b.setSize()
        }), this.$element.on("shown.bs.select", function () {
          if (b.options.liveSearch || b.multiple) {
            if (!b.multiple) {
              var a = b.liObj[b.$element[0].selectedIndex];
              if ("number" != typeof a || b.options.size === !1) return;
              var c = b.$lis.eq(a)[0].offsetTop - b.$menuInner[0].offsetTop;
              c = c - b.$menuInner[0].offsetHeight / 2 + b.sizeInfo.liHeight / 2, b.$menuInner[0].scrollTop = c
            }
          } else b.$menuInner.find(".selected a").focus()
        }), this.$menuInner.on("click", "li a", function (c) {
          var d = a(this),
            f = d.parent().data("originalIndex"),
            g = b.$element.val(),
            h = b.$element.prop("selectedIndex"),
            i = !0;
          if (b.multiple && 1 !== b.options.maxOptions && c.stopPropagation(), c.preventDefault(), !b.isDisabled() && !d.parent().hasClass("disabled")) {
            var j = b.$element.find("option"),
              k = j.eq(f),
              l = k.prop("selected"),
              m = k.parent("optgroup"),
              n = b.options.maxOptions,
              o = m.data("maxOptions") || !1;
            if (b.multiple) {
              if (k.prop("selected", !l), b.setSelected(f, !l), d.blur(), n !== !1 || o !== !1) {
                var p = n < j.filter(":selected").length,
                  q = o < m.find("option:selected").length;
                if (n && p || o && q)
                  if (n && 1 == n) j.prop("selected", !1), k.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected"), b.setSelected(f, !0);
                  else if (o && 1 == o) {
                  m.find("option:selected").prop("selected", !1), k.prop("selected", !0);
                  var r = d.parent().data("optgroup");
                  b.$menuInner.find('[data-optgroup="' + r + '"]').removeClass("selected"), b.setSelected(f, !0)
                } else {
                  var s = "string" == typeof b.options.maxOptionsText ? [b.options.maxOptionsText, b.options.maxOptionsText] : b.options.maxOptionsText,
                    t = "function" == typeof s ? s(n, o) : s,
                    u = t[0].replace("{n}", n),
                    v = t[1].replace("{n}", o),
                    w = a('<div class="notify"></div>');
                  t[2] && (u = u.replace("{var}", t[2][n > 1 ? 0 : 1]), v = v.replace("{var}", t[2][o > 1 ? 0 : 1])), k.prop("selected", !1), b.$menu.append(w), n && p && (w.append(a("<div>" + u + "</div>")), i = !1, b.$element.trigger("maxReached.bs.select")), o && q && (w.append(a("<div>" + v + "</div>")), i = !1, b.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function () {
                    b.setSelected(f, !1)
                  }, 10), w.delay(750).fadeOut(300, function () {
                    a(this).remove()
                  })
                }
              }
            } else j.prop("selected", !1), k.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected").find("a").attr("aria-selected", !1), b.setSelected(f, !0);
            !b.multiple || b.multiple && 1 === b.options.maxOptions ? b.$button.focus() : b.options.liveSearch && b.$searchbox.focus(), i && (g != b.$element.val() && b.multiple || h != b.$element.prop("selectedIndex") && !b.multiple) && (e = [f, k.prop("selected"), l], b.$element.triggerNative("change"))
          }
        }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function (c) {
          c.currentTarget == this && (c.preventDefault(), c.stopPropagation(), b.options.liveSearch && !a(c.target).hasClass("close") ? b.$searchbox.focus() : b.$button.focus())
        }), this.$menuInner.on("click", ".divider, .dropdown-header", function (a) {
          a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus()
        }), this.$menu.on("click", ".popover-title .close", function () {
          b.$button.click()
        }), this.$searchbox.on("click", function (a) {
          a.stopPropagation()
        }), this.$menu.on("click", ".actions-btn", function (c) {
          b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus(), c.preventDefault(), c.stopPropagation(), a(this).hasClass("bs-select-all") ? b.selectAll() : b.deselectAll()
        }), this.$element.change(function () {
          b.render(!1), b.$element.trigger("changed.bs.select", e), e = null
        })
      },
      liveSearchListener: function () {
        var c = this,
          d = a('<li class="no-results"></li>');
        this.$button.on("click.dropdown.data-api", function () {
          c.$menuInner.find(".active").removeClass("active"), c.$searchbox.val() && (c.$searchbox.val(""), c.$lis.not(".is-hidden").removeClass("hidden"), d.parent().length && d.remove()), c.multiple || c.$menuInner.find(".selected").addClass("active"), setTimeout(function () {
            c.$searchbox.focus()
          }, 10)
        }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function (a) {
          a.stopPropagation()
        }), this.$searchbox.on("input propertychange", function () {
          if (c.$lis.not(".is-hidden").removeClass("hidden"), c.$lis.filter(".active").removeClass("active"), d.remove(), c.$searchbox.val()) {
            var e, f = c.$lis.not(".is-hidden, .divider, .dropdown-header");
            if (e = c.options.liveSearchNormalize ? f.not(":a" + c._searchStyle() + '("' + b(c.$searchbox.val()) + '")') : f.not(":" + c._searchStyle() + '("' + c.$searchbox.val() + '")'), e.length === f.length) d.html(c.options.noneResultsText.replace("{0}", '"' + j(c.$searchbox.val()) + '"')), c.$menuInner.append(d), c.$lis.addClass("hidden");
            else {
              e.addClass("hidden");
              var g, h = c.$lis.not(".hidden");
              h.each(function (b) {
                var c = a(this);
                c.hasClass("divider") ? void 0 === g ? c.addClass("hidden") : (g && g.addClass("hidden"), g = c) : c.hasClass("dropdown-header") && h.eq(b + 1).data("optgroup") !== c.data("optgroup") ? c.addClass("hidden") : g = null
              }), g && g.addClass("hidden"), f.not(".hidden").first().addClass("active"), c.$menuInner.scrollTop(0)
            }
          }
        })
      },
      _searchStyle: function () {
        var a = {
          begins: "ibegins",
          startsWith: "ibegins"
        };
        return a[this.options.liveSearchStyle] || "icontains"
      },
      val: function (a) {
        return "undefined" != typeof a ? (this.$element.val(a), this.render(), this.$element) : this.$element.val()
      },
      changeAll: function (b) {
        if (this.multiple) {
          "undefined" == typeof b && (b = !0), this.findLis();
          var c = this.$element.find("option"),
            d = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden"),
            e = d.length,
            f = [];
          if (b) {
            if (d.filter(".selected").length === d.length) return
          } else if (0 === d.filter(".selected").length) return;
          d.toggleClass("selected", b);
          for (var g = 0; g < e; g++) {
            var h = d[g].getAttribute("data-original-index");
            f[f.length] = c.eq(h)[0]
          }
          a(f).prop("selected", b), this.render(!1), this.togglePlaceholder(), this.$element.triggerNative("change")
        }
      },
      selectAll: function () {
        return this.changeAll(!0)
      },
      deselectAll: function () {
        return this.changeAll(!1)
      },
      toggle: function (a) {
        a = a || window.event, a && a.stopPropagation(), this.$button.trigger("click")
      },
      keydown: function (b) {
        var c, d, e, f, g = a(this),
          h = g.is("input") ? g.parent().parent() : g.parent(),
          i = h.data("this"),
          j = ":not(.disabled, .hidden, .dropdown-header, .divider)",
          k = {
            32: " ",
            48: "0",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            57: "9",
            59: ";",
            65: "a",
            66: "b",
            67: "c",
            68: "d",
            69: "e",
            70: "f",
            71: "g",
            72: "h",
            73: "i",
            74: "j",
            75: "k",
            76: "l",
            77: "m",
            78: "n",
            79: "o",
            80: "p",
            81: "q",
            82: "r",
            83: "s",
            84: "t",
            85: "u",
            86: "v",
            87: "w",
            88: "x",
            89: "y",
            90: "z",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9"
          };
        if (f = i.$newElement.hasClass("open"), !f && (b.keyCode >= 48 && b.keyCode <= 57 || b.keyCode >= 96 && b.keyCode <= 105 || b.keyCode >= 65 && b.keyCode <= 90)) return i.options.container ? i.$button.trigger("click") : (i.setSize(), i.$menu.parent().addClass("open"), f = !0), void i.$searchbox.focus();
        if (i.options.liveSearch && /(^9$|27)/.test(b.keyCode.toString(10)) && f && (b.preventDefault(), b.stopPropagation(), i.$menuInner.click(), i.$button.focus()), /(38|40)/.test(b.keyCode.toString(10))) {
          if (c = i.$lis.filter(j), !c.length) return;
          d = i.options.liveSearch ? c.index(c.filter(".active")) : c.index(c.find("a").filter(":focus").parent()), e = i.$menuInner.data("prevIndex"), 38 == b.keyCode ? (!i.options.liveSearch && d != e || d == -1 || d--, d < 0 && (d += c.length)) : 40 == b.keyCode && ((i.options.liveSearch || d == e) && d++, d %= c.length), i.$menuInner.data("prevIndex", d), i.options.liveSearch ? (b.preventDefault(), g.hasClass("dropdown-toggle") || (c.removeClass("active").eq(d).addClass("active").children("a").focus(), g.focus())) : c.eq(d).children("a").focus()
        } else if (!g.is("input")) {
          var l, m, n = [];
          c = i.$lis.filter(j), c.each(function (c) {
            a.trim(a(this).children("a").text().toLowerCase()).substring(0, 1) == k[b.keyCode] && n.push(c)
          }), l = a(document).data("keycount"), l++, a(document).data("keycount", l), m = a.trim(a(":focus").text().toLowerCase()).substring(0, 1), m != k[b.keyCode] ? (l = 1, a(document).data("keycount", l)) : l >= n.length && (a(document).data("keycount", 0), l > n.length && (l = 1)), c.eq(n[l - 1]).children("a").focus()
        }
        if ((/(13|32)/.test(b.keyCode.toString(10)) || /(^9$)/.test(b.keyCode.toString(10)) && i.options.selectOnTab) && f) {
          if (/(32)/.test(b.keyCode.toString(10)) || b.preventDefault(), i.options.liveSearch) /(32)/.test(b.keyCode.toString(10)) || (i.$menuInner.find(".active a").click(), g.focus());
          else {
            var o = a(":focus");
            o.click(), o.focus(), b.preventDefault(), a(document).data("spaceSelect", !0)
          }
          a(document).data("keycount", 0)
        }(/(^9$|27)/.test(b.keyCode.toString(10)) && f && (i.multiple || i.options.liveSearch) || /(27)/.test(b.keyCode.toString(10)) && !f) && (i.$menu.parent().removeClass("open"), i.options.container && i.$newElement.removeClass("open"), i.$button.focus())
      },
      mobile: function () {
        this.$element.addClass("mobile-device")
      },
      refresh: function () {
        this.$lis = null, this.liObj = {}, this.reloadLi(), this.render(), this.checkDisabled(), this.liHeight(!0), this.setStyle(),
          this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), this.$element.trigger("refreshed.bs.select")
      },
      hide: function () {
        this.$newElement.hide()
      },
      show: function () {
        this.$newElement.show()
      },
      remove: function () {
        this.$newElement.remove(), this.$element.remove()
      },
      destroy: function () {
        this.$newElement.before(this.$element).remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")
      }
    };
    var m = a.fn.selectpicker;
    a.fn.selectpicker = c, a.fn.selectpicker.Constructor = l, a.fn.selectpicker.noConflict = function () {
      return a.fn.selectpicker = m, this
    }, a(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', l.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function (a) {
      a.stopPropagation()
    }), a(window).on("load.bs.select.data-api", function () {
      a(".selectpicker").each(function () {
        var b = a(this);
        c.call(b, b.data())
      })
    })
  }(a)
});

/* ------------------------------------------------------------------------------
 *  # LegitRipple
 * ---------------------------------------------------------------------------- */

! function (t) {
  t.fn.ripple = function (e) {
    if (this.length > 1) return this.each(function (n, i) {
      t(i).ripple(e)
    });
    if (e = e || {}, this.off(".ripple").data("unbound", !0), e.unbind) return this;
    var n = function () {
      return d && !d.data("unbound")
    };
    this.addClass("legitRipple").removeData("unbound").on("tap.ripple", function (e) {
      n() || (d = t(this), w(e.coords))
    }).on("dragstart.ripple", function (t) {
      g.allowDragging || t.preventDefault()
    }), t(document).on("move.ripple", function (t) {
      n() && b(t.coords)
    }).on("end.ripple", function () {
      n() && y()
    }), t(window).on("scroll.ripple", function (t) {
      n() && y()
    });
    var i, o, a, r, s = function (t) {
        return !!t.type.match(/^touch/)
      },
      l = function (t, e) {
        return s(t) && (t = c(t.originalEvent.touches, e)), [t.pageX, t.pageY]
      },
      c = function (e, n) {
        return t.makeArray(e).filter(function (t, e) {
          return t.identifier == n
        })[0]
      },
      p = 0,
      u = function (t) {
        "touchstart" == t.type && (p = 3), "scroll" == t.type && (p = 0);
        var e = p && !s(t);
        return e && p--, !e
      };
    this.on("mousedown.ripple touchstart.ripple", function (e) {
      u(e) && (i = s(e) ? e.originalEvent.changedTouches[0].identifier : -1, o = t(this), a = t.Event("tap", {
        coords: l(e, i)
      }), ~i ? r = setTimeout(function () {
        o.trigger(a), r = null
      }, g.touchDelay) : o.trigger(a))
    }), t(document).on("mousemove.ripple touchmove.ripple mouseup.ripple touchend.ripple touchcancel.ripple", function (e) {
      var n = e.type.match(/move/);
      r && !n && (clearTimeout(r), r = null, o.trigger(a)), u(e) && (s(e) ? c(e.originalEvent.changedTouches, i) : !~i) && t(this).trigger(n ? t.Event("move", {
        coords: l(e, i)
      }) : "end")
    }).on("contextmenu.ripple", function (t) {
      u(t)
    }).on("touchmove", function () {
      clearTimeout(r), r = null
    });
    var d, f, h, m, g = {},
      v = 0,
      x = function () {
        var n = {
          fixedPos: null,
          get dragging() {
            return !g.fixedPos
          },
          get adaptPos() {
            return g.dragging
          },
          get maxDiameter() {
            return Math.sqrt(Math.pow(h[0], 2) + Math.pow(h[1], 2)) / d.outerWidth() * Math.ceil(g.adaptPos ? 100 : 200) + "%"
          },
          scaleMode: "fixed",
          template: null,
          allowDragging: !1,
          touchDelay: 100,
          callback: null
        };
        t.each(n, function (t, n) {
          g[t] = t in e ? e[t] : n
        })
      },
      w = function (e) {
        h = [d.outerWidth(), d.outerHeight()], x(), m = e, f = t("<span/>").addClass("legitRipple-ripple"), g.template && f.append(("object" == typeof g.template ? g.template : d.children(".legitRipple-template").last()).clone().removeClass("legitRipple-template")).addClass("legitRipple-custom"), f.appendTo(d), D(e, !1);
        var n = f.css("transition-duration").split(","),
          i = [parseFloat(n[0]) + "s"].concat(n.slice(1)).join(",");
        f.css("transition-duration", i).css("width", g.maxDiameter), f.on("transitionend webkitTransitionEnd oTransitionEnd", function () {
          t(this).data("oneEnded") ? t(this).off().remove() : t(this).data("oneEnded", !0)
        })
      },
      b = function (t) {
        var e;
        if (v++, "proportional" === g.scaleMode) {
          var n = Math.pow(v, v / 100 * .6);
          e = n > 40 ? 40 : n
        } else if ("fixed" == g.scaleMode && Math.abs(t[1] - m[1]) > 6) return void y();
        D(t, e)
      },
      y = function () {
        f.css("width", f.css("width")).css("transition", "none").css("transition", "").css("width", f.css("width")).css("width", g.maxDiameter).css("opacity", "0"), d = null, v = 0
      },
      D = function (e, n) {
        var i = [],
          o = g.fixedPos === !0 ? [.5, .5] : [(g.fixedPos ? g.fixedPos[0] : e[0] - d.offset().left) / h[0], (g.fixedPos ? g.fixedPos[1] : e[1] - d.offset().top) / h[1]],
          a = [.5 - o[0], .5 - o[1]],
          r = [100 / parseFloat(g.maxDiameter), 100 / parseFloat(g.maxDiameter) * (h[1] / h[0])],
          s = [a[0] * r[0], a[1] * r[1]],
          l = g.dragging || 0 === v;
        if (l && "inline" == d.css("display")) {
          var c = t("<span/>").text("Hi!").css("font-size", 0).prependTo(d),
            p = c.offset().left;
          c.remove(), i = [e[0] - p + "px", e[1] - d.offset().top + "px"]
        }
        l && f.css("left", i[0] || 100 * o[0] + "%").css("top", i[1] || 100 * o[1] + "%"), f.css("transform", "translate3d(-50%, -50%, 0)" + (g.adaptPos ? "translate3d(" + 100 * s[0] + "%, " + 100 * s[1] + "%, 0)" : "") + (n ? "scale(" + n + ")" : "")), g.callback && g.callback(d, f, o, g.maxDiameter)
      };
    return this
  }, t.ripple = function (e) {
    t.each(e, function (e, n) {
      t(e).ripple(n)
    })
  }, t.ripple.destroy = function () {
    t(".legitRipple").removeClass("legitRipple").add(window).add(document).off(".ripple"), t(".legitRipple-ripple").remove()
  }
}(jQuery);

/* ------------------------------------------------------------------------------
 *  # switchery
 * ---------------------------------------------------------------------------- */
(function () {
  function require(name) {
    var module = require.modules[name];
    if (!module) throw new Error('failed to require "' + name + '"');
    if (!("exports" in module) && typeof module.definition === "function") {
      module.client = module.component = true;
      module.definition.call(this, module.exports = {}, module);
      delete module.definition
    }
    return module.exports
  }
  require.loader = "component";
  require.helper = {};
  require.helper.semVerSort = function (a, b) {
    var aArray = a.version.split(".");
    var bArray = b.version.split(".");
    for (var i = 0; i < aArray.length; ++i) {
      var aInt = parseInt(aArray[i], 10);
      var bInt = parseInt(bArray[i], 10);
      if (aInt === bInt) {
        var aLex = aArray[i].substr(("" + aInt).length);
        var bLex = bArray[i].substr(("" + bInt).length);
        if (aLex === "" && bLex !== "") return 1;
        if (aLex !== "" && bLex === "") return -1;
        if (aLex !== "" && bLex !== "") return aLex > bLex ? 1 : -1;
        continue
      } else if (aInt > bInt) {
        return 1
      } else {
        return -1
      }
    }
    return 0
  };
  require.latest = function (name, returnPath) {
    function showError(name) {
      throw new Error('failed to find latest module of "' + name + '"')
    }
    var versionRegexp = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/;
    var remoteRegexp = /(.*)~(.*)/;
    if (!remoteRegexp.test(name)) showError(name);
    var moduleNames = Object.keys(require.modules);
    var semVerCandidates = [];
    var otherCandidates = [];
    for (var i = 0; i < moduleNames.length; i++) {
      var moduleName = moduleNames[i];
      if (new RegExp(name + "@").test(moduleName)) {
        var version = moduleName.substr(name.length + 1);
        var semVerMatch = versionRegexp.exec(moduleName);
        if (semVerMatch != null) {
          semVerCandidates.push({
            version: version,
            name: moduleName
          })
        } else {
          otherCandidates.push({
            version: version,
            name: moduleName
          })
        }
      }
    }
    if (semVerCandidates.concat(otherCandidates).length === 0) {
      showError(name)
    }
    if (semVerCandidates.length > 0) {
      var module = semVerCandidates.sort(require.helper.semVerSort).pop().name;
      if (returnPath === true) {
        return module
      }
      return require(module)
    }
    var module = otherCandidates.sort(function (a, b) {
      return a.name > b.name
    })[0].name;
    if (returnPath === true) {
      return module
    }
    return require(module)
  };
  require.modules = {};
  require.register = function (name, definition) {
    require.modules[name] = {
      definition: definition
    }
  };
  require.define = function (name, exports) {
    require.modules[name] = {
      exports: exports
    }
  };
  require.register("abpetkov~transitionize@0.0.3", function (exports, module) {
    module.exports = Transitionize;

    function Transitionize(element, props) {
      if (!(this instanceof Transitionize)) return new Transitionize(element, props);
      this.element = element;
      this.props = props || {};
      this.init()
    }
    Transitionize.prototype.isSafari = function () {
      return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)
    };
    Transitionize.prototype.init = function () {
      var transitions = [];
      for (var key in this.props) {
        transitions.push(key + " " + this.props[key])
      }
      this.element.style.transition = transitions.join(", ");
      if (this.isSafari()) this.element.style.webkitTransition = transitions.join(", ")
    }
  });
  require.register("ftlabs~fastclick@v0.6.11", function (exports, module) {
    function FastClick(layer) {
      "use strict";
      var oldOnClick, self = this;
      this.trackingClick = false;
      this.trackingClickStart = 0;
      this.targetElement = null;
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.lastTouchIdentifier = 0;
      this.touchBoundary = 10;
      this.layer = layer;
      if (!layer || !layer.nodeType) {
        throw new TypeError("Layer must be a document node")
      }
      this.onClick = function () {
        return FastClick.prototype.onClick.apply(self, arguments)
      };
      this.onMouse = function () {
        return FastClick.prototype.onMouse.apply(self, arguments)
      };
      this.onTouchStart = function () {
        return FastClick.prototype.onTouchStart.apply(self, arguments)
      };
      this.onTouchMove = function () {
        return FastClick.prototype.onTouchMove.apply(self, arguments)
      };
      this.onTouchEnd = function () {
        return FastClick.prototype.onTouchEnd.apply(self, arguments)
      };
      this.onTouchCancel = function () {
        return FastClick.prototype.onTouchCancel.apply(self, arguments)
      };
      if (FastClick.notNeeded(layer)) {
        return
      }
      if (this.deviceIsAndroid) {
        layer.addEventListener("mouseover", this.onMouse, true);
        layer.addEventListener("mousedown", this.onMouse, true);
        layer.addEventListener("mouseup", this.onMouse, true)
      }
      layer.addEventListener("click", this.onClick, true);
      layer.addEventListener("touchstart", this.onTouchStart, false);
      layer.addEventListener("touchmove", this.onTouchMove, false);
      layer.addEventListener("touchend", this.onTouchEnd, false);
      layer.addEventListener("touchcancel", this.onTouchCancel, false);
      if (!Event.prototype.stopImmediatePropagation) {
        layer.removeEventListener = function (type, callback, capture) {
          var rmv = Node.prototype.removeEventListener;
          if (type === "click") {
            rmv.call(layer, type, callback.hijacked || callback, capture)
          } else {
            rmv.call(layer, type, callback, capture)
          }
        };
        layer.addEventListener = function (type, callback, capture) {
          var adv = Node.prototype.addEventListener;
          if (type === "click") {
            adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
              if (!event.propagationStopped) {
                callback(event)
              }
            }), capture)
          } else {
            adv.call(layer, type, callback, capture)
          }
        }
      }
      if (typeof layer.onclick === "function") {
        oldOnClick = layer.onclick;
        layer.addEventListener("click", function (event) {
          oldOnClick(event)
        }, false);
        layer.onclick = null
      }
    }
    FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0;
    FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
    FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
    FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
    FastClick.prototype.needsClick = function (target) {
      "use strict";
      switch (target.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
          if (target.disabled) {
            return true
          }
          break;
        case "input":
          if (this.deviceIsIOS && target.type === "file" || target.disabled) {
            return true
          }
          break;
        case "label":
        case "video":
          return true
      }
      return /\bneedsclick\b/.test(target.className)
    };
    FastClick.prototype.needsFocus = function (target) {
      "use strict";
      switch (target.nodeName.toLowerCase()) {
        case "textarea":
          return true;
        case "select":
          return !this.deviceIsAndroid;
        case "input":
          switch (target.type) {
            case "button":
            case "checkbox":
            case "file":
            case "image":
            case "radio":
            case "submit":
              return false
          }
          return !target.disabled && !target.readOnly;
        default:
          return /\bneedsfocus\b/.test(target.className)
      }
    };
    FastClick.prototype.sendClick = function (targetElement, event) {
      "use strict";
      var clickEvent, touch;
      if (document.activeElement && document.activeElement !== targetElement) {
        document.activeElement.blur()
      }
      touch = event.changedTouches[0];
      clickEvent = document.createEvent("MouseEvents");
      clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
      clickEvent.forwardedTouchEvent = true;
      targetElement.dispatchEvent(clickEvent)
    };
    FastClick.prototype.determineEventType = function (targetElement) {
      "use strict";
      if (this.deviceIsAndroid && targetElement.tagName.toLowerCase() === "select") {
        return "mousedown"
      }
      return "click"
    };
    FastClick.prototype.focus = function (targetElement) {
      "use strict";
      var length;
      if (this.deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time") {
        length = targetElement.value.length;
        targetElement.setSelectionRange(length, length)
      } else {
        targetElement.focus()
      }
    };
    FastClick.prototype.updateScrollParent = function (targetElement) {
      "use strict";
      var scrollParent, parentElement;
      scrollParent = targetElement.fastClickScrollParent;
      if (!scrollParent || !scrollParent.contains(targetElement)) {
        parentElement = targetElement;
        do {
          if (parentElement.scrollHeight > parentElement.offsetHeight) {
            scrollParent = parentElement;
            targetElement.fastClickScrollParent = parentElement;
            break
          }
          parentElement = parentElement.parentElement
        } while (parentElement)
      }
      if (scrollParent) {
        scrollParent.fastClickLastScrollTop = scrollParent.scrollTop
      }
    };
    FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {
      "use strict";
      if (eventTarget.nodeType === Node.TEXT_NODE) {
        return eventTarget.parentNode
      }
      return eventTarget
    };
    FastClick.prototype.onTouchStart = function (event) {
      "use strict";
      var targetElement, touch, selection;
      if (event.targetTouches.length > 1) {
        return true
      }
      targetElement = this.getTargetElementFromEventTarget(event.target);
      touch = event.targetTouches[0];
      if (this.deviceIsIOS) {
        selection = window.getSelection();
        if (selection.rangeCount && !selection.isCollapsed) {
          return true
        }
        if (!this.deviceIsIOS4) {
          if (touch.identifier === this.lastTouchIdentifier) {
            event.preventDefault();
            return false
          }
          this.lastTouchIdentifier = touch.identifier;
          this.updateScrollParent(targetElement)
        }
      }
      this.trackingClick = true;
      this.trackingClickStart = event.timeStamp;
      this.targetElement = targetElement;
      this.touchStartX = touch.pageX;
      this.touchStartY = touch.pageY;
      if (event.timeStamp - this.lastClickTime < 200) {
        event.preventDefault()
      }
      return true
    };
    FastClick.prototype.touchHasMoved = function (event) {
      "use strict";
      var touch = event.changedTouches[0],
        boundary = this.touchBoundary;
      if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
        return true
      }
      return false
    };
    FastClick.prototype.onTouchMove = function (event) {
      "use strict";
      if (!this.trackingClick) {
        return true
      }
      if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
        this.trackingClick = false;
        this.targetElement = null
      }
      return true
    };
    FastClick.prototype.findControl = function (labelElement) {
      "use strict";
      if (labelElement.control !== undefined) {
        return labelElement.control
      }
      if (labelElement.htmlFor) {
        return document.getElementById(labelElement.htmlFor)
      }
      return labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    };
    FastClick.prototype.onTouchEnd = function (event) {
      "use strict";
      var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
      if (!this.trackingClick) {
        return true
      }
      if (event.timeStamp - this.lastClickTime < 200) {
        this.cancelNextClick = true;
        return true
      }
      this.cancelNextClick = false;
      this.lastClickTime = event.timeStamp;
      trackingClickStart = this.trackingClickStart;
      this.trackingClick = false;
      this.trackingClickStart = 0;
      if (this.deviceIsIOSWithBadTarget) {
        touch = event.changedTouches[0];
        targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
        targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent
      }
      targetTagName = targetElement.tagName.toLowerCase();
      if (targetTagName === "label") {
        forElement = this.findControl(targetElement);
        if (forElement) {
          this.focus(targetElement);
          if (this.deviceIsAndroid) {
            return false
          }
          targetElement = forElement
        }
      } else if (this.needsFocus(targetElement)) {
        if (event.timeStamp - trackingClickStart > 100 || this.deviceIsIOS && window.top !== window && targetTagName === "input") {
          this.targetElement = null;
          return false
        }
        this.focus(targetElement);
        if (!this.deviceIsIOS4 || targetTagName !== "select") {
          this.targetElement = null;
          event.preventDefault()
        }
        return false
      }
      if (this.deviceIsIOS && !this.deviceIsIOS4) {
        scrollParent = targetElement.fastClickScrollParent;
        if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
          return true
        }
      }
      if (!this.needsClick(targetElement)) {
        event.preventDefault();
        this.sendClick(targetElement, event)
      }
      return false
    };
    FastClick.prototype.onTouchCancel = function () {
      "use strict";
      this.trackingClick = false;
      this.targetElement = null
    };
    FastClick.prototype.onMouse = function (event) {
      "use strict";
      if (!this.targetElement) {
        return true
      }
      if (event.forwardedTouchEvent) {
        return true
      }
      if (!event.cancelable) {
        return true
      }
      if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
        if (event.stopImmediatePropagation) {
          event.stopImmediatePropagation()
        } else {
          event.propagationStopped = true
        }
        event.stopPropagation();
        event.preventDefault();
        return false
      }
      return true
    };
    FastClick.prototype.onClick = function (event) {
      "use strict";
      var permitted;
      if (this.trackingClick) {
        this.targetElement = null;
        this.trackingClick = false;
        return true
      }
      if (event.target.type === "submit" && event.detail === 0) {
        return true
      }
      permitted = this.onMouse(event);
      if (!permitted) {
        this.targetElement = null
      }
      return permitted
    };
    FastClick.prototype.destroy = function () {
      "use strict";
      var layer = this.layer;
      if (this.deviceIsAndroid) {
        layer.removeEventListener("mouseover", this.onMouse, true);
        layer.removeEventListener("mousedown", this.onMouse, true);
        layer.removeEventListener("mouseup", this.onMouse, true)
      }
      layer.removeEventListener("click", this.onClick, true);
      layer.removeEventListener("touchstart", this.onTouchStart, false);
      layer.removeEventListener("touchmove", this.onTouchMove, false);
      layer.removeEventListener("touchend", this.onTouchEnd, false);
      layer.removeEventListener("touchcancel", this.onTouchCancel, false)
    };
    FastClick.notNeeded = function (layer) {
      "use strict";
      var metaViewport;
      var chromeVersion;
      if (typeof window.ontouchstart === "undefined") {
        return true
      }
      chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
      if (chromeVersion) {
        if (FastClick.prototype.deviceIsAndroid) {
          metaViewport = document.querySelector("meta[name=viewport]");
          if (metaViewport) {
            if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
              return true
            }
            if (chromeVersion > 31 && window.innerWidth <= window.screen.width) {
              return true
            }
          }
        } else {
          return true
        }
      }
      if (layer.style.msTouchAction === "none") {
        return true
      }
      return false
    };
    FastClick.attach = function (layer) {
      "use strict";
      return new FastClick(layer)
    };
    if (typeof define !== "undefined" && define.amd) {
      define(function () {
        "use strict";
        return FastClick
      })
    } else if (typeof module !== "undefined" && module.exports) {
      module.exports = FastClick.attach;
      module.exports.FastClick = FastClick
    } else {
      window.FastClick = FastClick
    }
  });
  require.register("component~indexof@0.0.3", function (exports, module) {
    module.exports = function (arr, obj) {
      if (arr.indexOf) return arr.indexOf(obj);
      for (var i = 0; i < arr.length; ++i) {
        if (arr[i] === obj) return i
      }
      return -1
    }
  });
  require.register("component~classes@1.2.1", function (exports, module) {
    var index = require("component~indexof@0.0.3");
    var re = /\s+/;
    var toString = Object.prototype.toString;
    module.exports = function (el) {
      return new ClassList(el)
    };

    function ClassList(el) {
      if (!el) throw new Error("A DOM element reference is required");
      this.el = el;
      this.list = el.classList
    }
    ClassList.prototype.add = function (name) {
      if (this.list) {
        this.list.add(name);
        return this
      }
      var arr = this.array();
      var i = index(arr, name);
      if (!~i) arr.push(name);
      this.el.className = arr.join(" ");
      return this
    };
    ClassList.prototype.remove = function (name) {
      if ("[object RegExp]" == toString.call(name)) {
        return this.removeMatching(name)
      }
      if (this.list) {
        this.list.remove(name);
        return this
      }
      var arr = this.array();
      var i = index(arr, name);
      if (~i) arr.splice(i, 1);
      this.el.className = arr.join(" ");
      return this
    };
    ClassList.prototype.removeMatching = function (re) {
      var arr = this.array();
      for (var i = 0; i < arr.length; i++) {
        if (re.test(arr[i])) {
          this.remove(arr[i])
        }
      }
      return this
    };
    ClassList.prototype.toggle = function (name, force) {
      if (this.list) {
        if ("undefined" !== typeof force) {
          if (force !== this.list.toggle(name, force)) {
            this.list.toggle(name)
          }
        } else {
          this.list.toggle(name)
        }
        return this
      }
      if ("undefined" !== typeof force) {
        if (!force) {
          this.remove(name)
        } else {
          this.add(name)
        }
      } else {
        if (this.has(name)) {
          this.remove(name)
        } else {
          this.add(name)
        }
      }
      return this
    };
    ClassList.prototype.array = function () {
      var str = this.el.className.replace(/^\s+|\s+$/g, "");
      var arr = str.split(re);
      if ("" === arr[0]) arr.shift();
      return arr
    };
    ClassList.prototype.has = ClassList.prototype.contains = function (name) {
      return this.list ? this.list.contains(name) : !!~index(this.array(), name)
    }
  });
  require.register("component~event@0.1.4", function (exports, module) {
    var bind = window.addEventListener ? "addEventListener" : "attachEvent",
      unbind = window.removeEventListener ? "removeEventListener" : "detachEvent",
      prefix = bind !== "addEventListener" ? "on" : "";
    exports.bind = function (el, type, fn, capture) {
      el[bind](prefix + type, fn, capture || false);
      return fn
    };
    exports.unbind = function (el, type, fn, capture) {
      el[unbind](prefix + type, fn, capture || false);
      return fn
    }
  });
  require.register("component~query@0.0.3", function (exports, module) {
    function one(selector, el) {
      return el.querySelector(selector)
    }
    exports = module.exports = function (selector, el) {
      el = el || document;
      return one(selector, el)
    };
    exports.all = function (selector, el) {
      el = el || document;
      return el.querySelectorAll(selector)
    };
    exports.engine = function (obj) {
      if (!obj.one) throw new Error(".one callback required");
      if (!obj.all) throw new Error(".all callback required");
      one = obj.one;
      exports.all = obj.all;
      return exports
    }
  });
  require.register("component~matches-selector@0.1.5", function (exports, module) {
    var query = require("component~query@0.0.3");
    var proto = Element.prototype;
    var vendor = proto.matches || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
    module.exports = match;

    function match(el, selector) {
      if (!el || el.nodeType !== 1) return false;
      if (vendor) return vendor.call(el, selector);
      var nodes = query.all(selector, el.parentNode);
      for (var i = 0; i < nodes.length; ++i) {
        if (nodes[i] == el) return true
      }
      return false
    }
  });
  require.register("component~closest@0.1.4", function (exports, module) {
    var matches = require("component~matches-selector@0.1.5");
    module.exports = function (element, selector, checkYoSelf, root) {
      element = checkYoSelf ? {
        parentNode: element
      } : element;
      root = root || document;
      while ((element = element.parentNode) && element !== document) {
        if (matches(element, selector)) return element;
        if (element === root) return
      }
    }
  });
  require.register("component~delegate@0.2.3", function (exports, module) {
    var closest = require("component~closest@0.1.4"),
      event = require("component~event@0.1.4");
    exports.bind = function (el, selector, type, fn, capture) {
      return event.bind(el, type, function (e) {
        var target = e.target || e.srcElement;
        e.delegateTarget = closest(target, selector, true, el);
        if (e.delegateTarget) fn.call(el, e)
      }, capture)
    };
    exports.unbind = function (el, type, fn, capture) {
      event.unbind(el, type, fn, capture)
    }
  });
  require.register("component~events@1.0.9", function (exports, module) {
    var events = require("component~event@0.1.4");
    var delegate = require("component~delegate@0.2.3");
    module.exports = Events;

    function Events(el, obj) {
      if (!(this instanceof Events)) return new Events(el, obj);
      if (!el) throw new Error("element required");
      if (!obj) throw new Error("object required");
      this.el = el;
      this.obj = obj;
      this._events = {}
    }
    Events.prototype.sub = function (event, method, cb) {
      this._events[event] = this._events[event] || {};
      this._events[event][method] = cb
    };
    Events.prototype.bind = function (event, method) {
      var e = parse(event);
      var el = this.el;
      var obj = this.obj;
      var name = e.name;
      var method = method || "on" + name;
      var args = [].slice.call(arguments, 2);

      function cb() {
        var a = [].slice.call(arguments).concat(args);
        obj[method].apply(obj, a)
      }
      if (e.selector) {
        cb = delegate.bind(el, e.selector, name, cb)
      } else {
        events.bind(el, name, cb)
      }
      this.sub(name, method, cb);
      return cb
    };
    Events.prototype.unbind = function (event, method) {
      if (0 == arguments.length) return this.unbindAll();
      if (1 == arguments.length) return this.unbindAllOf(event);
      var bindings = this._events[event];
      if (!bindings) return;
      var cb = bindings[method];
      if (!cb) return;
      events.unbind(this.el, event, cb)
    };
    Events.prototype.unbindAll = function () {
      for (var event in this._events) {
        this.unbindAllOf(event)
      }
    };
    Events.prototype.unbindAllOf = function (event) {
      var bindings = this._events[event];
      if (!bindings) return;
      for (var method in bindings) {
        this.unbind(event, method)
      }
    };

    function parse(event) {
      var parts = event.split(/ +/);
      return {
        name: parts.shift(),
        selector: parts.join(" ")
      }
    }
  });
  require.register("switchery", function (exports, module) {
    var transitionize = require("abpetkov~transitionize@0.0.3"),
      fastclick = require("ftlabs~fastclick@v0.6.11"),
      classes = require("component~classes@1.2.1"),
      events = require("component~events@1.0.9");
    module.exports = Switchery;
    var defaults = {
      color: "#64bd63",
      secondaryColor: "#dfdfdf",
      jackColor: "#fff",
      jackSecondaryColor: null,
      className: "switchery",
      disabled: false,
      disabledOpacity: .5,
      speed: "0.4s",
      size: "default"
    };

    function Switchery(element, options) {
      if (!(this instanceof Switchery)) return new Switchery(element, options);
      this.element = element;
      this.options = options || {};
      for (var i in defaults) {
        if (this.options[i] == null) {
          this.options[i] = defaults[i]
        }
      }
      if (this.element != null && this.element.type == "checkbox") this.init();
      if (this.isDisabled() === true) this.disable()
    }
    Switchery.prototype.hide = function () {
      this.element.style.display = "none"
    };
    Switchery.prototype.show = function () {
      var switcher = this.create();
      this.insertAfter(this.element, switcher)
    };
    Switchery.prototype.create = function () {
      this.switcher = document.createElement("span");
      this.jack = document.createElement("small");
      this.switcher.appendChild(this.jack);
      this.switcher.className = this.options.className;
      this.events = events(this.switcher, this);
      return this.switcher
    };
    Switchery.prototype.insertAfter = function (reference, target) {
      reference.parentNode.insertBefore(target, reference.nextSibling)
    };
    Switchery.prototype.setPosition = function (clicked) {
      var checked = this.isChecked(),
        switcher = this.switcher,
        jack = this.jack;
      if (clicked && checked) checked = false;
      else if (clicked && !checked) checked = true;
      if (checked === true) {
        this.element.checked = true;
        if (window.getComputedStyle) jack.style.left = parseInt(window.getComputedStyle(switcher).width) - parseInt(window.getComputedStyle(jack).width) + "px";
        else jack.style.left = parseInt(switcher.currentStyle["width"]) - parseInt(jack.currentStyle["width"]) + "px";
        if (this.options.color) this.colorize();
        this.setSpeed()
      } else {
        jack.style.left = 0;
        this.element.checked = false;
        this.switcher.style.boxShadow = "inset 0 0 0 0 " + this.options.secondaryColor;
        this.switcher.style.borderColor = this.options.secondaryColor;
        this.switcher.style.backgroundColor = this.options.secondaryColor !== defaults.secondaryColor ? this.options.secondaryColor : "#fff";
        this.jack.style.backgroundColor = this.options.jackSecondaryColor !== this.options.jackColor ? this.options.jackSecondaryColor : this.options.jackColor;
        this.setSpeed()
      }
    };
    Switchery.prototype.setSpeed = function () {
      var switcherProp = {},
        jackProp = {
          "background-color": this.options.speed,
          left: this.options.speed.replace(/[a-z]/, "") / 2 + "s"
        };
      if (this.isChecked()) {
        switcherProp = {
          border: this.options.speed,
          "box-shadow": this.options.speed,
          "background-color": this.options.speed.replace(/[a-z]/, "") * 3 + "s"
        }
      } else {
        switcherProp = {
          border: this.options.speed,
          "box-shadow": this.options.speed
        }
      }
      transitionize(this.switcher, switcherProp);
      transitionize(this.jack, jackProp)
    };
    Switchery.prototype.setSize = function () {
      var small = "switchery-small",
        normal = "switchery-default",
        large = "switchery-large";
      switch (this.options.size) {
        case "small":
          classes(this.switcher).add(small);
          break;
        case "large":
          classes(this.switcher).add(large);
          break;
        default:
          classes(this.switcher).add(normal);
          break
      }
    };
    Switchery.prototype.colorize = function () {
      var switcherHeight = this.switcher.offsetHeight / 2;
      this.switcher.style.backgroundColor = this.options.color;
      this.switcher.style.borderColor = this.options.color;
      this.switcher.style.boxShadow = "inset 0 0 0 " + switcherHeight + "px " + this.options.color;
      this.jack.style.backgroundColor = this.options.jackColor
    };
    Switchery.prototype.handleOnchange = function (state) {
      if (document.dispatchEvent) {
        var event = document.createEvent("HTMLEvents");
        event.initEvent("change", true, true);
        this.element.dispatchEvent(event)
      } else {
        this.element.fireEvent("onchange")
      }
    };
    Switchery.prototype.handleChange = function () {
      var self = this,
        el = this.element;
      if (el.addEventListener) {
        el.addEventListener("change", function () {
          self.setPosition()
        })
      } else {
        el.attachEvent("onchange", function () {
          self.setPosition()
        })
      }
    };
    Switchery.prototype.handleClick = function () {
      var switcher = this.switcher;
      fastclick(switcher);
      this.events.bind("click", "bindClick")
    };
    Switchery.prototype.bindClick = function () {
      var parent = this.element.parentNode.tagName.toLowerCase(),
        labelParent = parent === "label" ? false : true;
      this.setPosition(labelParent);
      this.handleOnchange(this.element.checked)
    };
    Switchery.prototype.markAsSwitched = function () {
      this.element.setAttribute("data-switchery", true)
    };
    Switchery.prototype.markedAsSwitched = function () {
      return this.element.getAttribute("data-switchery")
    };
    Switchery.prototype.init = function () {
      this.hide();
      this.show();
      this.setSize();
      this.setPosition();
      this.markAsSwitched();
      this.handleChange();
      this.handleClick()
    };
    Switchery.prototype.isChecked = function () {
      return this.element.checked
    };
    Switchery.prototype.isDisabled = function () {
      return this.options.disabled || this.element.disabled || this.element.readOnly
    };
    Switchery.prototype.destroy = function () {
      this.events.unbind()
    };
    Switchery.prototype.enable = function () {
      if (!this.options.disabled) return;
      if (this.options.disabled) this.options.disabled = false;
      if (this.element.disabled) this.element.disabled = false;
      if (this.element.readOnly) this.element.readOnly = false;
      this.switcher.style.opacity = 1;
      this.events.bind("click", "bindClick")
    };
    Switchery.prototype.disable = function () {
      if (this.options.disabled) return;
      if (!this.options.disabled) this.options.disabled = true;
      if (!this.element.disabled) this.element.disabled = true;
      if (!this.element.readOnly) this.element.readOnly = true;
      this.switcher.style.opacity = this.options.disabledOpacity;
      this.destroy()
    }
  });
  if (typeof exports == "object") {
    module.exports = require("switchery")
  } else if (typeof define == "function" && define.amd) {
    define("Switchery", [], function () {
      return require("switchery")
    })
  } else {
    (this || window)["Switchery"] = require("switchery")
  }
})();

/* ------------------------------------------------------------------------------
 *  # uniform
 * ---------------------------------------------------------------------------- */

! function (e, t, n) {
  "use strict";

  function s(e) {
    var t = Array.prototype.slice.call(arguments, 1);
    return e.prop ? e.prop.apply(e, t) : e.attr.apply(e, t)
  }

  function a(e, t, n) {
    var s, a;
    for (s in n) n.hasOwnProperty(s) && (a = s.replace(/ |$/g, t.eventNamespace), e.bind(a, n[s]))
  }

  function i(e, t, n) {
    a(e, n, {
      focus: function () {
        t.addClass(n.focusClass)
      },
      blur: function () {
        t.removeClass(n.focusClass), t.removeClass(n.activeClass)
      },
      mouseenter: function () {
        t.addClass(n.hoverClass)
      },
      mouseleave: function () {
        t.removeClass(n.hoverClass), t.removeClass(n.activeClass)
      },
      "mousedown touchbegin": function () {
        e.is(":disabled") || t.addClass(n.activeClass)
      },
      "mouseup touchend": function () {
        t.removeClass(n.activeClass)
      }
    })
  }

  function r(e, t) {
    e.removeClass(t.hoverClass + " " + t.focusClass + " " + t.activeClass)
  }

  function l(e, t, n) {
    n ? e.addClass(t) : e.removeClass(t)
  }

  function u(e, t, n) {
    setTimeout(function () {
      var s = "checked",
        a = t.is(":" + s);
      t.prop ? t.prop(s, a) : a ? t.attr(s, s) : t.removeAttr(s), l(e, n.checkedClass, a)
    }, 1)
  }

  function o(e, t, n) {
    l(e, n.disabledClass, t.is(":disabled"))
  }

  function c(e, t, n) {
    switch (n) {
      case "after":
        return e.after(t), e.next();
      case "before":
        return e.before(t), e.prev();
      case "wrap":
        return e.wrap(t), e.parent()
    }
    return null
  }

  function d(e, n, a) {
    var i, r, l;
    return a || (a = {}), a = t.extend({
      bind: {},
      divClass: null,
      divWrap: "wrap",
      spanClass: null,
      spanHtml: null,
      spanWrap: "wrap"
    }, a), i = t("<div />"), r = t("<span />"), n.autoHide && e.is(":hidden") && "none" === e.css("display") && i.hide(), a.divClass && i.addClass(a.divClass), n.wrapperClass && i.addClass(n.wrapperClass), a.spanClass && r.addClass(a.spanClass), l = s(e, "id"), n.useID && l && s(i, "id", n.idPrefix + "-" + l), a.spanHtml && r.html(a.spanHtml), i = c(e, i, a.divWrap), r = c(e, r, a.spanWrap), o(i, e, n), {
      div: i,
      span: r
    }
  }

  function f(e, n) {
    var s;
    return n.wrapperClass ? (s = t("<span />").addClass(n.wrapperClass), s = c(e, s, "wrap")) : null
  }

  function p() {
    var n, s, a, i;
    return i = "rgb(120,2,153)", s = t('<div style="width:0;height:0;color:' + i + '">'), t("body").append(s), a = s.get(0), n = e.getComputedStyle ? e.getComputedStyle(a, "").color : (a.currentStyle || a.style || {}).color, s.remove(), n.replace(/ /g, "") !== i
  }

  function m(e) {
    return e ? t("<span />").text(e).html() : ""
  }

  function v() {
    return navigator.cpuClass && !navigator.product
  }

  function h() {
    return void 0 !== e.XMLHttpRequest
  }

  function C(e) {
    var t;
    return !!e[0].multiple || (t = s(e, "size"), !(!t || t <= 1))
  }

  function b() {
    return !1
  }

  function y(e, t) {
    var n = "none";
    a(e, t, {
      "selectstart dragstart mousedown": b
    }), e.css({
      MozUserSelect: n,
      msUserSelect: n,
      webkitUserSelect: n,
      userSelect: n
    })
  }

  function w(e, t, n) {
    var s = e.val();
    "" === s ? s = n.fileDefaultHtml : (s = s.split(/[\/\\]+/), s = s[s.length - 1]), t.text(s)
  }

  function g(e, t, n) {
    var s, a;
    for (s = [], e.each(function () {
        var e;
        for (e in t) Object.prototype.hasOwnProperty.call(t, e) && (s.push({
          el: this,
          name: e,
          old: this.style[e]
        }), this.style[e] = t[e])
      }), n(); s.length;) a = s.pop(), a.el.style[a.name] = a.old
  }

  function k(e, t) {
    var n;
    n = e.parents(), n.push(e[0]), n = n.not(":visible"), g(n, {
      visibility: "hidden",
      display: "block",
      position: "absolute"
    }, t)
  }

  function H(e, t) {
    return function () {
      e.unwrap().unwrap().unbind(t.eventNamespace)
    }
  }
  var x = !0,
    A = !1,
    W = [{
      match: function (e) {
        return e.is("a, button, :submit, :reset, input[type='button']")
      },
      apply: function (t, n) {
        var l, u, c, f, p;
        return u = n.submitDefaultHtml, t.is(":reset") && (u = n.resetDefaultHtml), f = t.is("a, button") ? function () {
          return t.html() || u
        } : function () {
          return m(s(t, "value")) || u
        }, c = d(t, n, {
          divClass: n.buttonClass,
          spanHtml: f()
        }), l = c.div, i(t, l, n), p = !1, a(l, n, {
          "click touchend": function () {
            var n, a, i, r;
            return !p && (!t.is(":disabled") && (p = !0, t[0].dispatchEvent ? (n = document.createEvent("MouseEvents"), n.initEvent("click", !0, !0), a = t[0].dispatchEvent(n), t.is("a") && a && (i = s(t, "target"), r = s(t, "href"), i && "_self" !== i ? e.open(r, i) : document.location.href = r)) : t.click(), void(p = !1)))
          }
        }), y(l, n), {
          remove: function () {
            return l.after(t), l.remove(), t.unbind(n.eventNamespace), t
          },
          update: function () {
            r(l, n), o(l, t, n), t.detach(), c.span.html(f()).append(t)
          }
        }
      }
    }, {
      match: function (e) {
        return e.is(":checkbox")
      },
      apply: function (e, t) {
        var n, s, l;
        return n = d(e, t, {
          divClass: t.checkboxClass
        }), s = n.div, l = n.span, i(e, s, t), a(e, t, {
          "click touchend": function () {
            u(l, e, t)
          }
        }), u(l, e, t), {
          remove: H(e, t),
          update: function () {
            r(s, t), l.removeClass(t.checkedClass), u(l, e, t), o(s, e, t)
          }
        }
      }
    }, {
      match: function (e) {
        return e.is(":file")
      },
      apply: function (e, n) {
        function l() {
          w(e, p, n)
        }
        var u, f, p, m, h = "undefined" != typeof e.attr("multiple");
        return u = d(e, n, {
          divClass: n.fileClass,
          spanClass: n.fileButtonClass,
          spanHtml: h ? n.filesButtonHtml : n.fileButtonHtml,
          spanWrap: "after"
        }), f = u.div, m = u.span, p = t("<span />").html(n.fileDefaultHtml), p.addClass(n.filenameClass), p = c(e, p, "after"), s(e, "size") || s(e, "size", f.width() / 10), i(e, f, n), l(), v() ? a(e, n, {
          click: function () {
            e.trigger("change"), setTimeout(l, 0)
          }
        }) : a(e, n, {
          change: l
        }), y(p, n), y(m, n), {
          remove: function () {
            return p.remove(), m.remove(), e.unwrap().unbind(n.eventNamespace)
          },
          update: function () {
            r(f, n), w(e, p, n), o(f, e, n)
          }
        }
      }
    }, {
      match: function (e) {
        if (e.is("input")) {
          var t = (" " + s(e, "type") + " ").toLowerCase(),
            n = " color date datetime datetime-local email month number password search tel text time url week ";
          return n.indexOf(t) >= 0
        }
        return !1
      },
      apply: function (e, t) {
        var n, a;
        return n = s(e, "type"), e.addClass(t.inputClass), a = f(e, t), i(e, e, t), t.inputAddTypeAsClass && e.addClass(n), {
          remove: function () {
            e.removeClass(t.inputClass), t.inputAddTypeAsClass && e.removeClass(n), a && e.unwrap()
          },
          update: b
        }
      }
    }, {
      match: function (e) {
        return e.is(":radio")
      },
      apply: function (e, n) {
        var l, c, f;
        return l = d(e, n, {
          divClass: n.radioClass
        }), c = l.div, f = l.span, i(e, c, n), a(e, n, {
          "click touchend": function () {
            void 0 !== e.attr("name") ? t.uniform.update(t(':radio[name="' + s(e, "name") + '"]')) : t.uniform.update(e)
          }
        }), u(f, e, n), {
          remove: H(e, n),
          update: function () {
            r(c, n), u(f, e, n), o(c, e, n)
          }
        }
      }
    }, {
      match: function (e) {
        return !(!e.is("select") || C(e))
      },
      apply: function (e, n) {
        var s, l, u, c;
        return n.selectAutoWidth && k(e, function () {
          c = e.width()
        }), s = d(e, n, {
          divClass: n.selectClass,
          spanHtml: (e.find(":selected:first") || e.find("option:first")).html(),
          spanWrap: "before"
        }), l = s.div, u = s.span, n.selectAutoWidth ? k(e, function () {
          g(t([u[0], l[0]]), {
            display: "block"
          }, function () {
            var e;
            e = u.outerWidth() - u.width(), l.width(c + e), u.width(c)
          })
        }) : l.addClass("fixedWidth"), i(e, l, n), a(e, n, {
          change: function () {
            u.html(e.find(":selected").html()), l.removeClass(n.activeClass)
          },
          "click touchend": function () {
            var t = e.find(":selected").html();
            u.html() !== t && e.trigger("change")
          },
          keyup: function () {
            u.html(e.find(":selected").html())
          }
        }), y(u, n), {
          remove: function () {
            return u.remove(), e.unwrap().unbind(n.eventNamespace), e
          },
          update: function () {
            n.selectAutoWidth ? (t.uniform.restore(e), e.uniform(n)) : (r(l, n), e[0].selectedIndex = e[0].selectedIndex, u.html(e.find(":selected").html()), o(l, e, n))
          }
        }
      }
    }, {
      match: function (e) {
        return !(!e.is("select") || !C(e))
      },
      apply: function (e, t) {
        var n;
        return e.addClass(t.selectMultiClass), n = f(e, t), i(e, e, t), {
          remove: function () {
            e.removeClass(t.selectMultiClass), n && e.unwrap()
          },
          update: b
        }
      }
    }, {
      match: function (e) {
        return e.is("textarea")
      },
      apply: function (e, t) {
        var n;
        return e.addClass(t.textareaClass), n = f(e, t), i(e, e, t), {
          remove: function () {
            e.removeClass(t.textareaClass), n && e.unwrap()
          },
          update: b
        }
      }
    }];
  v() && !h() && (x = !1), t.uniform = {
    defaults: {
      activeClass: "active",
      autoHide: !0,
      buttonClass: "button",
      checkboxClass: "checker",
      checkedClass: "checked",
      disabledClass: "disabled",
      eventNamespace: ".uniform",
      fileButtonClass: "action",
      fileButtonHtml: "Choose File",
      filesButtonHtml: "Choose Files",
      fileClass: "uploader",
      fileDefaultHtml: "No file selected",
      filenameClass: "filename",
      focusClass: "focus",
      hoverClass: "hover",
      idPrefix: "uniform",
      inputAddTypeAsClass: !0,
      inputClass: "uniform-input",
      radioClass: "radio",
      resetDefaultHtml: "Reset",
      resetSelector: !1,
      selectAutoWidth: !0,
      selectClass: "selector",
      selectMultiClass: "uniform-multiselect",
      submitDefaultHtml: "Submit",
      textareaClass: "uniform",
      useID: !0,
      wrapperClass: null
    },
    elements: []
  }, t.fn.uniform = function (n) {
    var s = this;
    return n = t.extend({}, t.uniform.defaults, n), A || (A = !0, p() && (x = !1)), x ? (n.resetSelector && t(n.resetSelector).mouseup(function () {
      e.setTimeout(function () {
        t.uniform.update(s)
      }, 10)
    }), this.each(function () {
      var e, s, a, i = t(this);
      if (i.data("uniformed")) return void t.uniform.update(i);
      for (e = 0; e < W.length; e += 1)
        if (s = W[e], s.match(i, n)) return a = s.apply(i, n), i.data("uniformed", a), void t.uniform.elements.push(i.get(0))
    })) : this
  }, t.uniform.restore = t.fn.uniform.restore = function (e) {
    e === n && (e = t.uniform.elements), t(e).each(function () {
      var e, n, s = t(this);
      n = s.data("uniformed"), n && (n.remove(), e = t.inArray(this, t.uniform.elements), e >= 0 && t.uniform.elements.splice(e, 1), s.removeData("uniformed"))
    })
  }, t.uniform.update = t.fn.uniform.update = function (e) {
    e === n && (e = t.uniform.elements), t(e).each(function () {
      var e, n = t(this);
      e = n.data("uniformed"), e && e.update(n, e.options)
    })
  }
}(this, jQuery);

/* ------------------------------------------------------------------------------
 *  # jGrowl
 * ---------------------------------------------------------------------------- */

! function (a) {
  a.jGrowl = function (b, c) {
    0 === a("#jGrowl").size() && a('<div id="jGrowl"></div>').addClass(c && c.position ? c.position : a.jGrowl.defaults.position).appendTo("body"), a("#jGrowl").jGrowl(b, c)
  }, a.fn.jGrowl = function (b, c) {
    if (void 0 === c && a.isPlainObject(b) && (c = b, b = c.message), a.isFunction(this.each)) {
      var d = arguments;
      return this.each(function () {
        void 0 === a(this).data("jGrowl.instance") && (a(this).data("jGrowl.instance", a.extend(new a.fn.jGrowl, {
          notifications: [],
          element: null,
          interval: null
        })), a(this).data("jGrowl.instance").startup(this)), a.isFunction(a(this).data("jGrowl.instance")[b]) ? a(this).data("jGrowl.instance")[b].apply(a(this).data("jGrowl.instance"), a.makeArray(d).slice(1)) : a(this).data("jGrowl.instance").create(b, c)
      })
    }
  }, a.extend(a.fn.jGrowl.prototype, {
    defaults: {
      pool: 0,
      header: "",
      group: "",
      sticky: !1,
      position: "top-right",
      glue: "after",
      theme: "default",
      themeState: "highlight",
      corners: "10px",
      check: 250,
      life: 3e3,
      closeDuration: "normal",
      openDuration: "normal",
      easing: "swing",
      closer: !0,
      closeTemplate: "&times;",
      closerTemplate: "<div>[ close all ]</div>",
      log: function () {},
      beforeOpen: function () {},
      afterOpen: function () {},
      open: function () {},
      beforeClose: function () {},
      close: function () {},
      click: function () {},
      animateOpen: {
        opacity: "show"
      },
      animateClose: {
        opacity: "hide"
      }
    },
    notifications: [],
    element: null,
    interval: null,
    create: function (b, c) {
      var d = a.extend({}, this.defaults, c);
      "undefined" != typeof d.speed && (d.openDuration = d.speed, d.closeDuration = d.speed), this.notifications.push({
        message: b,
        options: d
      }), d.log.apply(this.element, [this.element, b, d])
    },
    render: function (b) {
      var c = this,
        d = b.message,
        e = b.options;
      e.themeState = "" === e.themeState ? "" : "ui-state-" + e.themeState;
      var f = a("<div/>").addClass("jGrowl-notification alert " + e.themeState + " ui-corner-all" + (void 0 !== e.group && "" !== e.group ? " " + e.group : "")).append(a("<button/>").addClass("jGrowl-close").html(e.closeTemplate)).append(a("<div/>").addClass("jGrowl-header").html(e.header)).append(a("<div/>").addClass("jGrowl-message").html(d)).data("jGrowl", e).addClass(e.theme).children(".jGrowl-close").bind("click.jGrowl", function () {
        return a(this).parent().trigger("jGrowl.beforeClose"), !1
      }).parent();
      a(f).bind("mouseover.jGrowl", function () {
        a(".jGrowl-notification", c.element).data("jGrowl.pause", !0)
      }).bind("mouseout.jGrowl", function () {
        a(".jGrowl-notification", c.element).data("jGrowl.pause", !1)
      }).bind("jGrowl.beforeOpen", function () {
        e.beforeOpen.apply(f, [f, d, e, c.element]) !== !1 && a(this).trigger("jGrowl.open")
      }).bind("jGrowl.open", function () {
        e.open.apply(f, [f, d, e, c.element]) !== !1 && ("after" == e.glue ? a(".jGrowl-notification:last", c.element).after(f) : a(".jGrowl-notification:first", c.element).before(f), a(this).animate(e.animateOpen, e.openDuration, e.easing, function () {
          a.support.opacity === !1 && this.style.removeAttribute("filter"), null !== a(this).data("jGrowl") && (a(this).data("jGrowl").created = new Date), a(this).trigger("jGrowl.afterOpen")
        }))
      }).bind("jGrowl.afterOpen", function () {
        e.afterOpen.apply(f, [f, d, e, c.element])
      }).bind("click", function () {
        e.click.apply(f, [f.message, e, c.element])
      }).bind("jGrowl.beforeClose", function () {
        e.beforeClose.apply(f, [f, d, e, c.element]) !== !1 && a(this).trigger("jGrowl.close")
      }).bind("jGrowl.close", function () {
        a(this).data("jGrowl.pause", !0), a(this).animate(e.animateClose, e.closeDuration, e.easing, function () {
          a.isFunction(e.close) ? e.close.apply(f, [f, d, e, c.element]) !== !1 && a(this).remove() : a(this).remove()
        })
      }).trigger("jGrowl.beforeOpen"), "" !== e.corners && void 0 !== a.fn.corner && a(f).corner(e.corners), a(".jGrowl-notification:parent", c.element).size() > 1 && 0 === a(".jGrowl-closer", c.element).size() && this.defaults.closer !== !1 && a(this.defaults.closerTemplate).addClass("jGrowl-closer " + this.defaults.themeState + " ui-corner-all").addClass(this.defaults.theme).appendTo(c.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl", function () {
        a(this).siblings().trigger("jGrowl.beforeClose"), a.isFunction(c.defaults.closer) && c.defaults.closer.apply(a(this).parent()[0], [a(this).parent()[0]])
      })
    },
    update: function () {
      a(this.element).find(".jGrowl-notification:parent").each(function () {
        void 0 !== a(this).data("jGrowl") && void 0 !== a(this).data("jGrowl").created && a(this).data("jGrowl").created.getTime() + parseInt(a(this).data("jGrowl").life, 10) < (new Date).getTime() && a(this).data("jGrowl").sticky !== !0 && (void 0 === a(this).data("jGrowl.pause") || a(this).data("jGrowl.pause") !== !0) && a(this).trigger("jGrowl.beforeClose")
      }), this.notifications.length > 0 && (0 === this.defaults.pool || a(this.element).find(".jGrowl-notification:parent").size() < this.defaults.pool) && this.render(this.notifications.shift()), a(this.element).find(".jGrowl-notification:parent").size() < 2 && a(this.element).find(".jGrowl-closer").animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing, function () {
        a(this).remove()
      })
    },
    startup: function (b) {
      this.element = a(b).addClass("jGrowl").append('<div class="jGrowl-notification"></div>'), this.interval = setInterval(function () {
        a(b).data("jGrowl.instance").update()
      }, parseInt(this.defaults.check, 10))
    },
    shutdown: function () {
      a(this.element).removeClass("jGrowl").find(".jGrowl-notification").trigger("jGrowl.close").parent().empty(), clearInterval(this.interval)
    },
    close: function () {
      a(this.element).find(".jGrowl-notification").each(function () {
        a(this).trigger("jGrowl.beforeClose")
      })
    }
  }), a.jGrowl.defaults = a.fn.jGrowl.prototype.defaults
}(jQuery);

/*!
 * bootstrap-tokenfield 0.11.9
 * https://github.com/sliptree/bootstrap-tokenfield
 * Copyright 2013-2014 Sliptree and other contributors; Licensed MIT
 */

! function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = global.window && global.window.$ ? a(global.window.$) : function (b) {
    if (!b.$ && !b.fn) throw new Error("Tokenfield requires a window object with jQuery or a jQuery instance");
    return a(b.$ || b)
  } : a(jQuery)
}(function (a, b) {
  "use strict";
  var c = function (c, d) {
    var e = this;
    this.$element = a(c), this.textDirection = this.$element.css("direction"), this.options = a.extend(!0, {}, a.fn.tokenfield.defaults, {
      tokens: this.$element.val()
    }, this.$element.data(), d), this._delimiters = "string" == typeof this.options.delimiter ? [this.options.delimiter] : this.options.delimiter, this._triggerKeys = a.map(this._delimiters, function (a) {
      return a.charCodeAt(0)
    }), this._firstDelimiter = this._delimiters[0];
    var f = a.inArray(" ", this._delimiters),
      g = a.inArray("-", this._delimiters);
    f >= 0 && (this._delimiters[f] = "\\s"), g >= 0 && (delete this._delimiters[g], this._delimiters.unshift("-"));
    var h = ["\\", "$", "[", "{", "^", ".", "|", "?", "*", "+", "(", ")"];
    a.each(this._delimiters, function (b, c) {
      var d = a.inArray(c, h);
      d >= 0 && (e._delimiters[b] = "\\" + c)
    });
    var i, j = b && "function" == typeof b.getMatchedCSSRules ? b.getMatchedCSSRules(c) : null,
      k = c.style.width,
      l = this.$element.width();
    j && a.each(j, function (a, b) {
      b.style.width && (i = b.style.width)
    });
    var m = "rtl" === a("body").css("direction") ? "right" : "left",
      n = {
        position: this.$element.css("position")
      };
    n[m] = this.$element.css(m), this.$element.data("original-styles", n).data("original-tabindex", this.$element.prop("tabindex")).css("position", "absolute").css(m, "-10000px").prop("tabindex", -1), this.$wrapper = a('<div class="tokenfield form-control" />'), this.$element.hasClass("input-lg") && this.$wrapper.addClass("input-lg"), this.$element.hasClass("input-sm") && this.$wrapper.addClass("input-sm"), "rtl" === this.textDirection && this.$wrapper.addClass("rtl");
    var o = this.$element.prop("id") || (new Date).getTime() + "" + Math.floor(100 * (1 + Math.random()));
    this.$input = a('<input type="text" class="token-input" autocomplete="off" />').appendTo(this.$wrapper).prop("placeholder", this.$element.prop("placeholder")).prop("id", o + "-tokenfield").prop("tabindex", this.$element.data("original-tabindex"));
    var p = a('label[for="' + this.$element.prop("id") + '"]');
    if (p.length && p.prop("for", this.$input.prop("id")), this.$copyHelper = a('<input type="text" />').css("position", "absolute").css(m, "-10000px").prop("tabindex", -1).prependTo(this.$wrapper), k ? this.$wrapper.css("width", k) : i ? this.$wrapper.css("width", i) : this.$element.parents(".form-inline").length && this.$wrapper.width(l), (this.$element.prop("disabled") || this.$element.parents("fieldset[disabled]").length) && this.disable(), this.$mirror = a('<span style="position:absolute; top:-999px; left:0; white-space:pre;"/>'), this.$input.css("min-width", this.options.minWidth + "px"), a.each(["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"], function (a, b) {
        e.$mirror[0].style[b] = e.$input.css(b)
      }), this.$mirror.appendTo("body"), this.$wrapper.insertBefore(this.$element), this.$element.prependTo(this.$wrapper), this.update(), this.setTokens(this.options.tokens, !1, !1), this.listen(), !a.isEmptyObject(this.options.autocomplete)) {
      var q = "rtl" === this.textDirection ? "right" : "left",
        r = a.extend({
          minLength: this.options.showAutocompleteOnFocus ? 0 : null,
          position: {
            my: q + " top",
            at: q + " bottom",
            of: this.$wrapper
          }
        }, this.options.autocomplete);
      this.$input.autocomplete(r)
    }
    if (!a.isEmptyObject(this.options.typeahead)) {
      var s = a.extend({
        minLength: this.options.showAutocompleteOnFocus ? 0 : null
      }, this.options.typeahead);
      this.$input.typeahead(null, s), this.typeahead = !0
    }
    this.$element.trigger("tokenfield:initialize")
  };
  c.prototype = {
    constructor: c,
    createToken: function (b, c) {
      "string" == typeof b && (b = {
        value: b,
        label: b
      }), "undefined" == typeof c && (c = !0);
      var d = this,
        e = a.trim(b.value),
        f = b.label && b.label.length ? a.trim(b.label) : e;
      if (!(!e.length || !f.length || e.length < this.options.minLength || this.options.limit && this.getTokens().length >= this.options.limit)) {
        var g = a.Event("tokenfield:preparetoken");
        if (g.token = {
            value: e,
            label: f
          }, this.$element.trigger(g), g.token) {
          if (e = g.token.value, f = g.token.label, !this.options.allowDuplicates && a.grep(this.getTokens(), function (a) {
              return a.value === e
            }).length) {
            var h = a.Event("tokenfield:preventduplicate");
            h.token = {
              value: e,
              label: f
            }, this.$element.trigger(h);
            var i = this.$wrapper.find('.token[data-value="' + e + '"]').addClass("duplicate");
            return setTimeout(function () {
              i.removeClass("duplicate")
            }, 250), !1
          }
          var j = a('<div class="token" />').attr("data-value", e).append('<span class="token-label" />').append('<a href="#" class="close" tabindex="-1">&times;</a>');
          this.$input.hasClass("tt-input") ? this.$input.parent().before(j) : this.$input.before(j), this.$input.css("width", this.options.minWidth + "px");
          var k = j.find(".token-label"),
            l = j.find(".close");
          this.maxTokenWidth || (this.maxTokenWidth = this.$wrapper.width() - l.outerWidth() - parseInt(l.css("margin-left"), 10) - parseInt(l.css("margin-right"), 10) - parseInt(j.css("border-left-width"), 10) - parseInt(j.css("border-right-width"), 10) - parseInt(j.css("padding-left"), 10) - parseInt(j.css("padding-right"), 10), parseInt(k.css("border-left-width"), 10) - parseInt(k.css("border-right-width"), 10) - parseInt(k.css("padding-left"), 10) - parseInt(k.css("padding-right"), 10), parseInt(k.css("margin-left"), 10) - parseInt(k.css("margin-right"), 10)), k.text(f).css("max-width", this.maxTokenWidth), j.on("mousedown", function () {
            return d.disabled ? !1 : (d.preventDeactivation = !0, void 0)
          }).on("click", function (a) {
            return d.disabled ? !1 : (d.preventDeactivation = !1, a.ctrlKey || a.metaKey ? (a.preventDefault(), d.toggle(j)) : (d.activate(j, a.shiftKey, a.shiftKey), void 0))
          }).on("dblclick", function () {
            return d.disabled || !d.options.allowEditing ? !1 : (d.edit(j), void 0)
          }), l.on("click", a.proxy(this.remove, this));
          var m = a.Event("tokenfield:createtoken");
          m.token = g.token, m.relatedTarget = j.get(0), this.$element.trigger(m);
          var n = a.Event("change");
          return n.initiator = "tokenfield", c && this.$element.val(this.getTokensList()).trigger(n), this.update(), this.$input.get(0)
        }
      }
    },
    setTokens: function (b, c, d) {
      if (b) {
        c || this.$wrapper.find(".token").remove(), "undefined" == typeof d && (d = !0), "string" == typeof b && (b = this._delimiters.length ? b.split(new RegExp("[" + this._delimiters.join("") + "]")) : [b]);
        var e = this;
        return a.each(b, function (a, b) {
          e.createToken(b, d)
        }), this.$element.get(0)
      }
    },
    getTokenData: function (b) {
      var c = b.map(function () {
        var b = a(this);
        return {
          value: b.attr("data-value"),
          label: b.find(".token-label").text()
        }
      }).get();
      return 1 == c.length && (c = c[0]), c
    },
    getTokens: function (b) {
      var c = this,
        d = [],
        e = b ? ".active" : "";
      return this.$wrapper.find(".token" + e).each(function () {
        d.push(c.getTokenData(a(this)))
      }), d
    },
    getTokensList: function (b, c, d) {
      b = b || this._firstDelimiter, c = "undefined" != typeof c && null !== c ? c : this.options.beautify;
      var e = b + (c && " " !== b ? " " : "");
      return a.map(this.getTokens(d), function (a) {
        return a.value
      }).join(e)
    },
    getInput: function () {
      return this.$input.val()
    },
    listen: function () {
      var c = this;
      this.$element.on("change", a.proxy(this.change, this)), this.$wrapper.on("mousedown", a.proxy(this.focusInput, this)), this.$input.on("focus", a.proxy(this.focus, this)).on("blur", a.proxy(this.blur, this)).on("paste", a.proxy(this.paste, this)).on("keydown", a.proxy(this.keydown, this)).on("keypress", a.proxy(this.keypress, this)).on("keyup", a.proxy(this.keyup, this)), this.$copyHelper.on("focus", a.proxy(this.focus, this)).on("blur", a.proxy(this.blur, this)).on("keydown", a.proxy(this.keydown, this)).on("keyup", a.proxy(this.keyup, this)), this.$input.on("keypress", a.proxy(this.update, this)).on("keyup", a.proxy(this.update, this)), this.$input.on("autocompletecreate", function () {
        var b = a(this).data("ui-autocomplete").menu.element,
          d = c.$wrapper.outerWidth() - parseInt(b.css("border-left-width"), 10) - parseInt(b.css("border-right-width"), 10);
        b.css("min-width", d + "px")
      }).on("autocompleteselect", function (a, b) {
        return c.createToken(b.item) && (c.$input.val(""), c.$input.data("edit") && c.unedit(!0)), !1
      }).on("typeahead:selected", function (a, b) {
        c.createToken(b) && (c.$input.typeahead("val", ""), c.$input.data("edit") && c.unedit(!0))
      }).on("typeahead:autocompleted", function () {
        c.createToken(c.$input.val()), c.$input.typeahead("val", ""), c.$input.data("edit") && c.unedit(!0)
      }), a(b).on("resize", a.proxy(this.update, this))
    },
    keydown: function (b) {
      function c(a) {
        if (e.$input.is(document.activeElement)) {
          if (e.$input.val().length > 0) return;
          a += "All";
          var c = e.$input.hasClass("tt-input") ? e.$input.parent()[a](".token:first") : e.$input[a](".token:first");
          if (!c.length) return;
          e.preventInputFocus = !0, e.preventDeactivation = !0, e.activate(c), b.preventDefault()
        } else e[a](b.shiftKey), b.preventDefault()
      }

      function d(c) {
        if (b.shiftKey) {
          if (e.$input.is(document.activeElement)) {
            if (e.$input.val().length > 0) return;
            var d = e.$input.hasClass("tt-input") ? e.$input.parent()[c + "All"](".token:first") : e.$input[c + "All"](".token:first");
            if (!d.length) return;
            e.activate(d)
          }
          var f = "prev" === c ? "next" : "prev",
            g = "prev" === c ? "first" : "last";
          e.firstActiveToken[f + "All"](".token").each(function () {
            e.deactivate(a(this))
          }), e.activate(e.$wrapper.find(".token:" + g), !0, !0), b.preventDefault()
        }
      }
      if (this.focused) {
        var e = this;
        switch (b.keyCode) {
          case 8:
            if (!this.$input.is(document.activeElement)) break;
            this.lastInputValue = this.$input.val();
            break;
          case 37:
            c("rtl" === this.textDirection ? "next" : "prev");
            break;
          case 38:
            d("prev");
            break;
          case 39:
            c("rtl" === this.textDirection ? "prev" : "next");
            break;
          case 40:
            d("next");
            break;
          case 65:
            if (this.$input.val().length > 0 || !b.ctrlKey && !b.metaKey) break;
            this.activateAll(), b.preventDefault();
            break;
          case 9:
          case 13:
            if (this.$input.data("ui-autocomplete") && this.$input.data("ui-autocomplete").menu.element.find("li:has(a.ui-state-focus)").length) break;
            if (this.$input.hasClass("tt-input") && this.$wrapper.find(".tt-cursor").length) break;
            if (this.$input.hasClass("tt-input") && this.$wrapper.find(".tt-hint").val().length) break;
            if (this.$input.is(document.activeElement) && this.$input.val().length || this.$input.data("edit")) return this.createTokensFromInput(b, this.$input.data("edit"));
            if (13 === b.keyCode) {
              if (!this.$copyHelper.is(document.activeElement) || 1 !== this.$wrapper.find(".token.active").length) break;
              if (!e.options.allowEditing) break;
              this.edit(this.$wrapper.find(".token.active"))
            }
        }
        this.lastKeyDown = b.keyCode
      }
    },
    keypress: function (b) {
      return this.lastKeyPressCode = b.keyCode, this.lastKeyPressCharCode = b.charCode, -1 !== a.inArray(b.charCode, this._triggerKeys) && this.$input.is(document.activeElement) ? (this.$input.val() && this.createTokensFromInput(b), !1) : void 0
    },
    keyup: function (a) {
      if (this.preventInputFocus = !1, this.focused) {
        switch (a.keyCode) {
          case 8:
            if (this.$input.is(document.activeElement)) {
              if (this.$input.val().length || this.lastInputValue.length && 8 === this.lastKeyDown) break;
              this.preventDeactivation = !0;
              var b = this.$input.hasClass("tt-input") ? this.$input.parent().prevAll(".token:first") : this.$input.prevAll(".token:first");
              if (!b.length) break;
              this.activate(b)
            } else this.remove(a);
            break;
          case 46:
            this.remove(a, "next")
        }
        this.lastKeyUp = a.keyCode
      }
    },
    focus: function () {
      this.focused = !0, this.$wrapper.addClass("focus"), this.$input.is(document.activeElement) && (this.$wrapper.find(".active").removeClass("active"), this.firstActiveToken = null, this.options.showAutocompleteOnFocus && this.search())
    },
    blur: function (a) {
      this.focused = !1, this.$wrapper.removeClass("focus"), this.preventDeactivation || this.$element.is(document.activeElement) || (this.$wrapper.find(".active").removeClass("active"), this.firstActiveToken = null), !this.preventCreateTokens && (this.$input.data("edit") && !this.$input.is(document.activeElement) || this.options.createTokensOnBlur) && this.createTokensFromInput(a), this.preventDeactivation = !1, this.preventCreateTokens = !1
    },
    paste: function (a) {
      var b = this;
      setTimeout(function () {
        b.createTokensFromInput(a)
      }, 1)
    },
    change: function (a) {
      "tokenfield" !== a.initiator && this.setTokens(this.$element.val())
    },
    createTokensFromInput: function (a, b) {
      if (!(this.$input.val().length < this.options.minLength)) {
        var c = this.getTokensList();
        return this.setTokens(this.$input.val(), !0), c == this.getTokensList() && this.$input.val().length ? !1 : (this.$input.hasClass("tt-input") ? this.$input.typeahead("val", "") : this.$input.val(""), this.$input.data("edit") && this.unedit(b), !1)
      }
    },
    next: function (a) {
      if (a) {
        var b = this.$wrapper.find(".active:first"),
          c = b && this.firstActiveToken ? b.index() < this.firstActiveToken.index() : !1;
        if (c) return this.deactivate(b)
      }
      var d = this.$wrapper.find(".active:last"),
        e = d.nextAll(".token:first");
      return e.length ? (this.activate(e, a), void 0) : (this.$input.focus(), void 0)
    },
    prev: function (a) {
      if (a) {
        var b = this.$wrapper.find(".active:last"),
          c = b && this.firstActiveToken ? b.index() > this.firstActiveToken.index() : !1;
        if (c) return this.deactivate(b)
      }
      var d = this.$wrapper.find(".active:first"),
        e = d.prevAll(".token:first");
      return e.length || (e = this.$wrapper.find(".token:first")), e.length || a ? (this.activate(e, a), void 0) : (this.$input.focus(), void 0)
    },
    activate: function (b, c, d, e) {
      if (b && this.$wrapper.find(".token.active").length !== this.$wrapper.find(".token").length) {
        if ("undefined" == typeof e) var e = !0;
        if (d) var c = !0;
        if (this.$copyHelper.focus(), c || (this.$wrapper.find(".active").removeClass("active"), e ? this.firstActiveToken = b : delete this.firstActiveToken), d && this.firstActiveToken) {
          var f = this.firstActiveToken.index() - 2,
            g = b.index() - 2,
            h = this;
          this.$wrapper.find(".token").slice(Math.min(f, g) + 1, Math.max(f, g)).each(function () {
            h.activate(a(this), !0)
          })
        }
        b.addClass("active"), this.$copyHelper.val(this.getTokensList(null, null, !0)).select()
      }
    },
    activateAll: function () {
      var b = this;
      this.$wrapper.find(".token").each(function (c) {
        b.activate(a(this), 0 !== c, !1, !1)
      })
    },
    deactivate: function (a) {
      a && (a.removeClass("active"), this.$copyHelper.val(this.getTokensList(null, null, !0)).select())
    },
    toggle: function (a) {
      a && (a.toggleClass("active"), this.$copyHelper.val(this.getTokensList(null, null, !0)).select())
    },
    edit: function (b) {
      if (b) {
        var c = b.data("value"),
          d = b.find(".token-label").text(),
          e = a.Event("tokenfield:edittoken");
        if (e.token = {
            value: c,
            label: d
          }, e.relatedTarget = b.get(0), this.$element.trigger(e), e.token) {
          c = e.token.value, d = e.token.label, b.find(".token-label").text(c);
          var f = b.outerWidth(),
            g = this.$input.hasClass("tt-input") ? this.$input.parent() : this.$input;
          b.replaceWith(g), this.preventCreateTokens = !0, this.$input.val(c).select().data("edit", !0).width(f), this.update()
        }
      }
    },
    unedit: function (a) {
      var b = this.$input.hasClass("tt-input") ? this.$input.parent() : this.$input;
      if (b.appendTo(this.$wrapper), this.$input.data("edit", !1), this.$mirror.text(""), this.update(), a) {
        var c = this;
        setTimeout(function () {
          c.$input.focus()
        }, 1)
      }
    },
    remove: function (b, c) {
      if (!this.$input.is(document.activeElement) && !this.disabled) {
        var d = "click" === b.type ? a(b.target).closest(".token") : this.$wrapper.find(".token.active");
        if ("click" !== b.type) {
          if (!c) var c = "prev";
          if (this[c](), "prev" === c) var e = 0 === d.first().prevAll(".token:first").length
        }
        var f = a.Event("tokenfield:removetoken");
        f.token = this.getTokenData(d);
        var g = a.Event("change");
        g.initiator = "tokenfield", d.remove(), this.$element.val(this.getTokensList()).trigger(f).trigger(g), (!this.$wrapper.find(".token").length || "click" === b.type || e) && this.$input.focus(), this.$input.css("width", this.options.minWidth + "px"), this.update(), b.preventDefault(), b.stopPropagation()
      }
    },
    update: function () {
      var a = this.$input.val(),
        b = parseInt(this.$input.css("padding-left"), 10),
        c = parseInt(this.$input.css("padding-right"), 10),
        d = b + c;
      if (this.$input.data("edit")) {
        if (a || (a = this.$input.prop("placeholder")), a === this.$mirror.text()) return;
        this.$mirror.text(a);
        var e = this.$mirror.width() + 10;
        if (e > this.$wrapper.width()) return this.$input.width(this.$wrapper.width());
        this.$input.width(e)
      } else {
        if (this.$input.css("width", this.options.minWidth + "px"), "rtl" === this.textDirection) return this.$input.width(this.$input.offset().left + this.$input.outerWidth() - this.$wrapper.offset().left - parseInt(this.$wrapper.css("padding-left"), 10) - d - 1);
        this.$input.width(this.$wrapper.offset().left + this.$wrapper.width() + parseInt(this.$wrapper.css("padding-left"), 10) - this.$input.offset().left - d)
      }
    },
    focusInput: function (b) {
      if (!a(b.target).closest(".token").length && !a(b.target).closest(".token-input").length) {
        var c = this;
        setTimeout(function () {
          c.$input.focus()
        }, 0)
      }
    },
    search: function () {
      this.$input.data("ui-autocomplete") && this.$input.autocomplete("search")
    },
    disable: function () {
      this.disabled = !0, this.$input.prop("disabled", !0), this.$element.prop("disabled", !0), this.$wrapper.addClass("disabled")
    },
    enable: function () {
      this.disabled = !1, this.$input.prop("disabled", !1), this.$element.prop("disabled", !1), this.$wrapper.removeClass("disabled")
    },
    destroy: function () {
      this.$element.val(this.getTokensList()), this.$element.css(this.$element.data("original-styles")), this.$element.prop("tabindex", this.$element.data("original-tabindex"));
      var b = a('label[for="' + this.$input.prop("id") + '"]');
      b.length && b.prop("for", this.$element.prop("id")), this.$element.insertBefore(this.$wrapper), this.$element.removeData("original-styles"), this.$element.removeData("original-tabindex"), this.$element.removeData("bs.tokenfield"), this.$wrapper.remove();
      var c = this.$element;
      return delete this, c
    }
  };
  var d = a.fn.tokenfield;
  return a.fn.tokenfield = function (b, d) {
    var e, f = [];
    Array.prototype.push.apply(f, arguments);
    var g = this.each(function () {
      var g = a(this),
        h = g.data("bs.tokenfield"),
        i = "object" == typeof b && b;
      "string" == typeof b && h && h[b] ? (f.shift(), e = h[b].apply(h, f)) : h || "string" == typeof b || d || g.data("bs.tokenfield", h = new c(this, i))
    });
    return "undefined" != typeof e ? e : g
  }, a.fn.tokenfield.defaults = {
    minWidth: 60,
    minLength: 0,
    allowDuplicates: !1,
    allowEditing: !0,
    limit: 0,
    autocomplete: {},
    typeahead: {},
    showAutocompleteOnFocus: !1,
    createTokensOnBlur: !1,
    delimiter: ",",
    beautify: !0
  }, a.fn.tokenfield.Constructor = c, a.fn.tokenfield.noConflict = function () {
    return a.fn.tokenfield = d, this
  }, c
});

/**
 * @preserve jQuery DateTimePicker plugin v2.4.1
 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
 * (c) 2014, Chupurnov Valeriy.
 */

(function (b) {
  var x = {
    i18n: {
      ru: {
        months: "\u042f\u043d\u0432\u0430\u0440\u044c \u0424\u0435\u0432\u0440\u0430\u043b\u044c \u041c\u0430\u0440\u0442 \u0410\u043f\u0440\u0435\u043b\u044c \u041c\u0430\u0439 \u0418\u044e\u043d\u044c \u0418\u044e\u043b\u044c \u0410\u0432\u0433\u0443\u0441\u0442 \u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c \u041e\u043a\u0442\u044f\u0431\u0440\u044c \u041d\u043e\u044f\u0431\u0440\u044c \u0414\u0435\u043a\u0430\u0431\u0440\u044c".split(" "),
        dayOfWeek: "\u0412\u0441\u043a \u041f\u043d \u0412\u0442 \u0421\u0440 \u0427\u0442 \u041f\u0442 \u0421\u0431".split(" ")
      },
      en: {
        months: "January February March April May June July August September October November December".split(" "),
        dayOfWeek: "Sun Mon Tue Wed Thu Fri Sat".split(" ")
      }
    },
    value: "",
    lang: "en",
    format: "Y/m/d H:i",
    formatTime: "H:i",
    formatDate: "Y/m/d",
    startDate: !1,
    step: 60,
    monthChangeSpinner: !0,
    closeOnDateSelect: !1,
    closeOnWithoutClick: !0,
    closeOnInputClick: !0,
    timepicker: !0,
    datepicker: !0,
    weeks: !1,
    defaultTime: !1,
    defaultDate: !1,
    minDate: !1,
    maxDate: !1,
    minTime: !1,
    maxTime: !1,
    allowTimes: [],
    opened: !1,
    initTime: !0,
    inline: !1,
    theme: "",
    onSelectDate: function () {},
    onSelectTime: function () {},
    onChangeMonth: function () {},
    onChangeYear: function () {},
    onChangeDateTime: function () {},
    onShow: function () {},
    onClose: function () {},
    onGenerate: function () {},
    withoutCopyright: !0,
    inverseButton: !1,
    hours12: !1,
    next: "xdsoft_next",
    prev: "xdsoft_prev",
    dayOfWeekStart: 0,
    parentID: "body",
    timeHeightInTimePicker: 25,
    timepickerScrollbar: !0,
    todayButton: !0,
    defaultSelect: !0,
    scrollMonth: !0,
    scrollTime: !0,
    scrollInput: !0,
    lazyInit: !1,
    mask: !1,
    validateOnBlur: !0,
    allowBlank: !0,
    yearStart: 1950,
    yearEnd: 2050,
    style: "",
    id: "",
    fixed: !1,
    roundTime: "round",
    className: "",
    weekends: [],
    disabledDates: [],
    yearOffset: 0,
    beforeShowDay: null,
    enterLikeTab: !0
  };
  Array.prototype.indexOf || (Array.prototype.indexOf = function (b, g) {
    var a, n;
    a = g || 0;
    for (n = this.length; a < n; a += 1)
      if (this[a] === b) return a;
    return -1
  });
  Date.prototype.countDaysInMonth = function () {
    return (new Date(this.getFullYear(), this.getMonth() + 1, 0)).getDate()
  };
  b.fn.xdsoftScroller = function (m) {
    return this.each(function () {
      var g = b(this),
        a = function (a) {
          var b = {
            x: 0,
            y: 0
          };
          if ("touchstart" === a.type || "touchmove" === a.type || "touchend" === a.type || "touchcancel" === a.type) a = a.originalEvent.touches[0] || a.originalEvent.changedTouches[0], b.x = a.clientX, b.y = a.clientY;
          else if ("mousedown" === a.type || "mouseup" === a.type || "mousemove" === a.type || "mouseover" === a.type || "mouseout" === a.type || "mouseenter" === a.type || "mouseleave" === a.type) b.x = a.clientX, b.y = a.clientY;
          return b
        },
        n, p, w, y, e, B = 100,
        d = !1,
        K = 0,
        r = 0,
        v = 0,
        I = !1,
        z = 0,
        q = function () {};
      "hide" === m ? g.find(".xdsoft_scrollbar").hide() : (b(this).hasClass("xdsoft_scroller_box") || (n = g.children().eq(0), p = g[0].clientHeight, w = n[0].offsetHeight, y = b('<div class="xdsoft_scrollbar"></div>'), e = b('<div class="xdsoft_scroller"></div>'), y.append(e), g.addClass("xdsoft_scroller_box").append(y), q = function (b) {
        b = a(b).y - K + z;
        0 > b && (b = 0);
        b + e[0].offsetHeight > v && (b = v - e[0].offsetHeight);
        g.trigger("scroll_element.xdsoft_scroller", [B ? b / B : 0])
      }, e.on("touchstart.xdsoft_scroller mousedown.xdsoft_scroller", function (d) {
        p || g.trigger("resize_scroll.xdsoft_scroller", [m]);
        K = a(d).y;
        z = parseInt(e.css("margin-top"), 10);
        v = y[0].offsetHeight;
        "mousedown" === d.type ? (document && b(document.body).addClass("xdsoft_noselect"), b([document.body, window]).on("mouseup.xdsoft_scroller", function D() {
          b([document.body, window]).off("mouseup.xdsoft_scroller", D).off("mousemove.xdsoft_scroller", q).removeClass("xdsoft_noselect")
        }), b(document.body).on("mousemove.xdsoft_scroller", q)) : (I = !0, d.stopPropagation(), d.preventDefault())
      }).on("touchmove", function (a) {
        I && (a.preventDefault(), q(a))
      }).on("touchend touchcancel", function (a) {
        I = !1;
        z = 0
      }), g.on("scroll_element.xdsoft_scroller", function (a, b) {
        p || g.trigger("resize_scroll.xdsoft_scroller", [b, !0]);
        b = 1 < b ? 1 : 0 > b || isNaN(b) ? 0 : b;
        e.css("margin-top", B * b);
        setTimeout(function () {
          n.css("marginTop", -parseInt((n[0].offsetHeight - p) * b, 10))
        }, 10)
      }).on("resize_scroll.xdsoft_scroller", function (a, b, d) {
        var m;
        p = g[0].clientHeight;
        w = n[0].offsetHeight;
        a = p / w;
        m = a * y[0].offsetHeight;
        1 < a ? e.hide() : (e.show(), e.css("height", parseInt(10 < m ? m : 10, 10)), B = y[0].offsetHeight - e[0].offsetHeight, !0 !== d && g.trigger("scroll_element.xdsoft_scroller", [b || Math.abs(parseInt(n.css("marginTop"), 10)) / (w - p)]))
      }), g.on("mousewheel", function (a) {
        var b = Math.abs(parseInt(n.css("marginTop"), 10)),
          b = b - 20 * a.deltaY;
        0 > b && (b = 0);
        g.trigger("scroll_element.xdsoft_scroller", [b / (w - p)]);
        a.stopPropagation();
        return !1
      }), g.on("touchstart", function (b) {
        d = a(b);
        r = Math.abs(parseInt(n.css("marginTop"), 10))
      }), g.on("touchmove", function (b) {
        d && (b.preventDefault(), b = a(b), g.trigger("scroll_element.xdsoft_scroller", [(r - (b.y - d.y)) / (w - p)]))
      }), g.on("touchend touchcancel", function (a) {
        d = !1;
        r = 0
      })), g.trigger("resize_scroll.xdsoft_scroller", [m]))
    })
  };
  b.fn.datetimepicker = function (m) {
    var g = !1,
      a = b.isPlainObject(m) || !m ? b.extend(!0, {}, x, m) : b.extend(!0, {}, x),
      n = 0,
      p, w, y = function (a) {
        a.on("open.xdsoft focusin.xdsoft mousedown.xdsoft", function d(b) {
          a.is(":disabled") || a.data("xdsoft_datetimepicker") || (clearTimeout(n), n = setTimeout(function () {
            a.data("xdsoft_datetimepicker") || p(a);
            a.off("open.xdsoft focusin.xdsoft mousedown.xdsoft", d).trigger("open.xdsoft")
          }, 100))
        })
      };
    p = function (e) {
      function n() {
        var c = !1,
          h;
        a.startDate ? c = f.strToDate(a.startDate) : (c = a.value || (e && e.val && e.val() ? e.val() : "")) ? c = f.strToDateTime(c) : a.defaultDate && (c = f.strToDate(a.defaultDate), a.defaultTime && (h = f.strtotime(a.defaultTime), c.setHours(h.getHours()), c.setMinutes(h.getMinutes())));
        c && f.isValidDate(c) ? d.data("changed", !0) : c = "";
        return c || 0
      }
      var d = b("<div " + (a.id ? 'id="' + a.id + '"' : "") + " " + (a.style ? 'style="' + a.style + '"' : "") + ' class="xdsoft_datetimepicker xdsoft_' + a.theme + " xdsoft_noselect " + (a.weeks ? " xdsoft_showweeks" : "") + a.className + '"></div>'),
        p = b('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
        r = b('<div class="xdsoft_datepicker active"></div>'),
        v = b('<div class="xdsoft_mounthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button><div class="xdsoft_label xdsoft_month"><span></span><i></i></div><div class="xdsoft_label xdsoft_year"><span></span><i></i></div><button type="button" class="xdsoft_next"></button></div>'),
        w = b('<div class="xdsoft_calendar"></div>'),
        z = b('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
        q = z.find(".xdsoft_time_box").eq(0),
        t = b('<div class="xdsoft_time_variant"></div>'),
        y = b('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
        D = b('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
        G = !1,
        x, E, A, H, J = 0,
        f;
      v.find(".xdsoft_month span").after(y);
      v.find(".xdsoft_year span").after(D);
      v.find(".xdsoft_month,.xdsoft_year").on("mousedown.xdsoft", function (a) {
        var h = b(this).find(".xdsoft_select").eq(0),
          d = 0,
          k = 0,
          e = h.is(":visible"),
          C;
        v.find(".xdsoft_select").hide();
        f.currentTime && (d = f.currentTime[b(this).hasClass("xdsoft_month") ? "getMonth" : "getFullYear"]());
        h[e ? "hide" : "show"]();
        e = h.find("div.xdsoft_option");
        for (C = 0; C < e.length && e.eq(C).data("value") !== d; C += 1) k += e[0].offsetHeight;
        h.xdsoftScroller(k / (h.children()[0].offsetHeight - h[0].clientHeight));
        a.stopPropagation();
        return !1
      });
      v.find(".xdsoft_select").xdsoftScroller().on("mousedown.xdsoft", function (a) {
        a.stopPropagation();
        a.preventDefault()
      }).on("mousedown.xdsoft", ".xdsoft_option", function (c) {
        c = f.currentTime.getFullYear();
        if (f && f.currentTime) f.currentTime[b(this).parent().parent().hasClass("xdsoft_monthselect") ? "setMonth" : "setFullYear"](b(this).data("value"));
        b(this).parent().parent().hide();
        d.trigger("xchange.xdsoft");
        a.onChangeMonth && b.isFunction(a.onChangeMonth) && a.onChangeMonth.call(d, f.currentTime, d.data("input"));
        c !== f.currentTime.getFullYear() && b.isFunction(a.onChangeYear) && a.onChangeYear.call(d, f.currentTime, d.data("input"))
      });
      d.setOptions = function (c) {
        a = b.extend(!0, {}, a, c);
        c.allowTimes && b.isArray(c.allowTimes) && c.allowTimes.length && (a.allowTimes = b.extend(!0, [], c.allowTimes));
        c.weekends && b.isArray(c.weekends) && c.weekends.length && (a.weekends = b.extend(!0, [], c.weekends));
        c.disabledDates && b.isArray(c.disabledDates) && c.disabledDates.length && (a.disabledDates = b.extend(!0, [], c.disabledDates));
        !a.open && !a.opened || a.inline || e.trigger("open.xdsoft");
        a.inline && (G = !0, d.addClass("xdsoft_inline"), e.after(d).hide());
        a.inverseButton && (a.next = "xdsoft_prev", a.prev = "xdsoft_next");
        a.datepicker ? r.addClass("active") : r.removeClass("active");
        a.timepicker ? z.addClass("active") : z.removeClass("active");
        a.value && (e && e.val && e.val(a.value), f.setCurrentTime(a.value));
        isNaN(a.dayOfWeekStart) ? a.dayOfWeekStart = 0 : a.dayOfWeekStart = parseInt(a.dayOfWeekStart, 10) % 7;
        a.timepickerScrollbar || q.xdsoftScroller("hide");
        a.minDate && /^-(.*)$/.test(a.minDate) && (a.minDate = f.strToDateTime(a.minDate).dateFormat(a.formatDate));
        a.maxDate && /^\+(.*)$/.test(a.maxDate) && (a.maxDate = f.strToDateTime(a.maxDate).dateFormat(a.formatDate));
        v.find(".xdsoft_today_button").css("visibility", a.todayButton ? "visible" : "hidden");
        if (a.mask) {
          var h = function (a, c) {
              a = "string" === typeof a || a instanceof String ? document.getElementById(a) : a;
              if (!a) return !1;
              if (a.createTextRange) {
                var h = a.createTextRange();
                h.collapse(!0);
                h.moveEnd("character", c);
                h.moveStart("character", c);
                h.select();
                return !0
              }
              return a.setSelectionRange ? (a.setSelectionRange(c, c), !0) : !1
            },
            F = function (a, c) {
              var h = a.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, "\\$1").replace(/_/g, "{digit+}").replace(/([0-9]{1})/g, "{digit$1}").replace(/\{digit([0-9]{1})\}/g, "[0-$1_]{1}").replace(/\{digit[\+]\}/g, "[0-9_]{1}");
              return (new RegExp(h)).test(c)
            };
          e.off("keydown.xdsoft");
          !0 === a.mask && (a.mask = a.format.replace(/Y/g, "9999").replace(/F/g, "9999").replace(/m/g, "19").replace(/d/g, "39").replace(/H/g, "29").replace(/i/g, "59").replace(/s/g, "59"));
          "string" === b.type(a.mask) && (F(a.mask, e.val()) || e.val(a.mask.replace(/[0-9]/g, "_")), e.on("keydown.xdsoft", function (c) {
            var d = this.value,
              f = c.which,
              l, m;
            if (48 <= f && 57 >= f || 96 <= f && 105 >= f || 8 === f || 46 === f) {
              a: {
                try {
                  if (document.selection && document.selection.createRange) {
                    l = document.selection.createRange().getBookmark().charCodeAt(2) - 2;
                    break a
                  }
                  if (this.setSelectionRange) {
                    l = this.selectionStart;
                    break a
                  }
                } catch (n) {
                  l = 0;
                  break a
                }
                l = void 0
              }
              m = 8 !== f && 46 !== f ? String.fromCharCode(96 <= f && 105 >= f ? f - 48 : f) : "_";8 !== f && 46 !== f || !l || (--l, m = "_");
              for (;
                /[^0-9_]/.test(a.mask.substr(l, 1)) && l < a.mask.length && 0 < l;) l += 8 === f || 46 === f ? -1 : 1;d = d.substr(0, l) + m + d.substr(l + 1);
              if ("" === b.trim(d)) d = a.mask.replace(/[0-9]/g, "_");
              else if (l === a.mask.length) return c.preventDefault(),
              !1;
              for (l += 8 === f || 46 === f ? 0 : 1;
                /[^0-9_]/.test(a.mask.substr(l, 1)) && l < a.mask.length && 0 < l;) l += 8 === f || 46 === f ? -1 : 1;F(a.mask, d) ? (this.value = d, h(this, l)) : "" === b.trim(d) ? this.value = a.mask.replace(/[0-9]/g, "_") : e.trigger("error_input.xdsoft")
            }
            else if (-1 !== [65, 67, 86, 90, 89].indexOf(f) && g || -1 !== [27, 38, 40, 37, 39, 116, 17, 9, 13].indexOf(f)) return !0;
            c.preventDefault();
            return !1
          }))
        }
        if (a.validateOnBlur) e.off("blur.xdsoft").on("blur.xdsoft", function () {
          a.allowBlank && !b.trim(b(this).val()).length ? (b(this).val(null), d.data("xdsoft_datetime").empty()) : (Date.parseDate(b(this).val(), a.format) || b(this).val(f.now().dateFormat(a.format)), d.data("xdsoft_datetime").setCurrentTime(b(this).val()));
          d.trigger("changedatetime.xdsoft")
        });
        a.dayOfWeekStartPrev = 0 === a.dayOfWeekStart ? 6 : a.dayOfWeekStart - 1;
        d.trigger("xchange.xdsoft").trigger("afterOpen.xdsoft")
      };
      d.data("options", a).on("mousedown.xdsoft", function (a) {
        a.stopPropagation();
        a.preventDefault();
        D.hide();
        y.hide();
        return !1
      });
      q.append(t);
      q.xdsoftScroller();
      d.on("afterOpen.xdsoft", function () {
        q.xdsoftScroller()
      });
      d.append(r).append(z);
      !0 !== a.withoutCopyright && d.append(p);
      r.append(v).append(w);
      b(a.parentID).append(d);
      f = new function () {
        var c = this;
        c.now = function (h) {
          var b = new Date,
            d;
          !h && a.defaultDate && (d = c.strToDate(a.defaultDate), b.setFullYear(d.getFullYear()), b.setMonth(d.getMonth()), b.setDate(d.getDate()));
          a.yearOffset && b.setFullYear(b.getFullYear() + a.yearOffset);
          !h && a.defaultTime && (h = c.strtotime(a.defaultTime), b.setHours(h.getHours()), b.setMinutes(h.getMinutes()));
          return b
        };
        c.isValidDate = function (a) {
          return "[object Date]" !== Object.prototype.toString.call(a) ? !1 : !isNaN(a.getTime())
        };
        c.setCurrentTime = function (a) {
          c.currentTime = "string" === typeof a ? c.strToDateTime(a) : c.isValidDate(a) ? a : c.now();
          d.trigger("xchange.xdsoft")
        };
        c.empty = function () {
          c.currentTime = null
        };
        c.getCurrentTime = function (a) {
          return c.currentTime
        };
        c.nextMonth =
          function () {
            var h = c.currentTime.getMonth() + 1,
              F;
            12 === h && (c.currentTime.setFullYear(c.currentTime.getFullYear() + 1), h = 0);
            F = c.currentTime.getFullYear();
            c.currentTime.setDate(Math.min((new Date(c.currentTime.getFullYear(), h + 1, 0)).getDate(), c.currentTime.getDate()));
            c.currentTime.setMonth(h);
            a.onChangeMonth && b.isFunction(a.onChangeMonth) && a.onChangeMonth.call(d, f.currentTime, d.data("input"));
            F !== c.currentTime.getFullYear() && b.isFunction(a.onChangeYear) && a.onChangeYear.call(d, f.currentTime, d.data("input"));
            d.trigger("xchange.xdsoft");
            return h
          };
        c.prevMonth = function () {
          var h = c.currentTime.getMonth() - 1; - 1 === h && (c.currentTime.setFullYear(c.currentTime.getFullYear() - 1), h = 11);
          c.currentTime.setDate(Math.min((new Date(c.currentTime.getFullYear(), h + 1, 0)).getDate(), c.currentTime.getDate()));
          c.currentTime.setMonth(h);
          a.onChangeMonth && b.isFunction(a.onChangeMonth) && a.onChangeMonth.call(d, f.currentTime, d.data("input"));
          d.trigger("xchange.xdsoft");
          return h
        };
        c.getWeekOfYear = function (a) {
          var c = new Date(a.getFullYear(), 0, 1);
          return Math.ceil(((a - c) / 864E5 + c.getDay() + 1) / 7)
        };
        c.strToDateTime = function (b) {
          var d = [];
          if (b && b instanceof Date && c.isValidDate(b)) return b;
          (d = /^(\+|\-)(.*)$/.exec(b)) && (d[2] = Date.parseDate(d[2], a.formatDate));
          d && d[2] ? (b = d[2].getTime() - 6E4 * d[2].getTimezoneOffset(), d = new Date(f.now().getTime() + parseInt(d[1] + "1", 10) * b)) : d = b ? Date.parseDate(b, a.format) : c.now();
          c.isValidDate(d) || (d = c.now());
          return d
        };
        c.strToDate = function (b) {
          if (b && b instanceof Date && c.isValidDate(b)) return b;
          b = b ? Date.parseDate(b, a.formatDate) : c.now(!0);
          c.isValidDate(b) || (b = c.now(!0));
          return b
        };
        c.strtotime = function (b) {
          if (b && b instanceof Date && c.isValidDate(b)) return b;
          b = b ? Date.parseDate(b, a.formatTime) : c.now(!0);
          c.isValidDate(b) || (b = c.now(!0));
          return b
        };
        c.str = function () {
          return c.currentTime.dateFormat(a.format)
        };
        c.currentTime = this.now()
      };
      v.find(".xdsoft_today_button").on("mousedown.xdsoft", function () {
        d.data("changed", !0);
        f.setCurrentTime(0);
        d.trigger("afterOpen.xdsoft")
      }).on("dblclick.xdsoft", function () {
        e.val(f.str());
        d.trigger("close.xdsoft")
      });
      v.find(".xdsoft_prev,.xdsoft_next").on("mousedown.xdsoft", function () {
        var c = b(this),
          d = 0,
          e = !1;
        (function L(b) {
          f.currentTime.getMonth();
          c.hasClass(a.next) ? f.nextMonth() : c.hasClass(a.prev) && f.prevMonth();
          a.monthChangeSpinner && (e || (d = setTimeout(L, b || 100)))
        })(500);
        b([document.body, window]).on("mouseup.xdsoft", function C() {
          clearTimeout(d);
          e = !0;
          b([document.body, window]).off("mouseup.xdsoft", C)
        })
      });
      z.find(".xdsoft_prev,.xdsoft_next").on("mousedown.xdsoft", function () {
        var c = b(this),
          d = 0,
          f = !1,
          e = 110;
        (function C(b) {
          var m = q[0].clientHeight,
            g = t[0].offsetHeight,
            n = Math.abs(parseInt(t.css("marginTop"), 10));
          c.hasClass(a.next) && g - m - a.timeHeightInTimePicker >= n ? t.css("marginTop", "-" + (n + a.timeHeightInTimePicker) + "px") : c.hasClass(a.prev) && 0 <= n - a.timeHeightInTimePicker && t.css("marginTop", "-" + (n - a.timeHeightInTimePicker) + "px");
          q.trigger("scroll_element.xdsoft_scroller", [Math.abs(parseInt(t.css("marginTop"), 10) / (g - m))]);
          e = 10 < e ? 10 : e - 10;
          f || (d = setTimeout(C, b || e))
        })(500);
        b([document.body, window]).on("mouseup.xdsoft", function l() {
          clearTimeout(d);
          f = !0;
          b([document.body, window]).off("mouseup.xdsoft", l)
        })
      });
      x = 0;
      d.on("xchange.xdsoft", function (c) {
        clearTimeout(x);
        x = setTimeout(function () {
          var c = "",
            e = new Date(f.currentTime.getFullYear(), f.currentTime.getMonth(), 1, 12, 0, 0),
            k = 0,
            g, n = f.now(),
            l = !1,
            p = !1,
            q, r, z, u = [],
            B, A = !0,
            x = "";
          for (q = ""; e.getDay() !== a.dayOfWeekStart;) e.setDate(e.getDate() - 1);
          c += "<table><thead><tr>";
          a.weeks && (c += "<th></th>");
          for (g = 0; 7 > g; g += 1) c += "<th>" + a.i18n[a.lang].dayOfWeek[(g + a.dayOfWeekStart) % 7] + "</th>";
          c += "</tr></thead><tbody>";
          !1 !== a.maxDate && (l = f.strToDate(a.maxDate), l = new Date(l.getFullYear(), l.getMonth(), l.getDate(), 23, 59, 59, 999));
          !1 !== a.minDate && (p = f.strToDate(a.minDate), p = new Date(p.getFullYear(), p.getMonth(), p.getDate()));
          for (; k < f.currentTime.countDaysInMonth() || e.getDay() !== a.dayOfWeekStart || f.currentTime.getMonth() === e.getMonth();) u = [], k += 1, g = e.getDate(), q = e.getFullYear(), r = e.getMonth(), z = f.getWeekOfYear(e), u.push("xdsoft_date"), B = a.beforeShowDay && b.isFunction(a.beforeShowDay.call) ? a.beforeShowDay.call(d, e) : null, !1 !== l && e > l || !1 !== p && e < p || B && !1 === B[0] ? u.push("xdsoft_disabled") : -1 !== a.disabledDates.indexOf(e.dateFormat(a.formatDate)) && u.push("xdsoft_disabled"), B && "" !== B[1] && u.push(B[1]), f.currentTime.getMonth() !== r && u.push("xdsoft_other_month"), (a.defaultSelect || d.data("changed")) && f.currentTime.dateFormat(a.formatDate) === e.dateFormat(a.formatDate) && u.push("xdsoft_current"), n.dateFormat(a.formatDate) === e.dateFormat(a.formatDate) && u.push("xdsoft_today"), (0 === e.getDay() || 6 === e.getDay() || ~a.weekends.indexOf(e.dateFormat(a.formatDate))) && u.push("xdsoft_weekend"), a.beforeShowDay && b.isFunction(a.beforeShowDay) && u.push(a.beforeShowDay(e)), A && (c += "<tr>", A = !1, a.weeks && (c += "<th>" + z + "</th>")), c += '<td data-date="' + g + '" data-month="' + r + '" data-year="' + q + '" class="xdsoft_date xdsoft_day_of_week' + e.getDay() + " " + u.join(" ") + '"><div>' + g + "</div></td>", e.getDay() === a.dayOfWeekStartPrev && (c += "</tr>", A = !0), e.setDate(g + 1);
          c += "</tbody></table>";
          w.html(c);
          v.find(".xdsoft_label span").eq(0).text(a.i18n[a.lang].months[f.currentTime.getMonth()]);
          v.find(".xdsoft_label span").eq(1).text(f.currentTime.getFullYear());
          r = q = x = "";
          c = function (b, c) {
            var e = f.now();
            e.setHours(b);
            b = parseInt(e.getHours(), 10);
            e.setMinutes(c);
            c = parseInt(e.getMinutes(), 10);
            var h = new Date(f.currentTime);
            h.setHours(b);
            h.setMinutes(c);
            u = [];
            (!1 !== a.minDateTime && a.minDateTime > h || !1 !== a.maxTime && f.strtotime(a.maxTime).getTime() < e.getTime() || !1 !== a.minTime && f.strtotime(a.minTime).getTime() > e.getTime()) && u.push("xdsoft_disabled");
            (a.initTime || a.defaultSelect || d.data("changed")) && parseInt(f.currentTime.getHours(), 10) === parseInt(b, 10) && (59 < a.step || Math[a.roundTime](f.currentTime.getMinutes() / a.step) * a.step === parseInt(c, 10)) && (a.defaultSelect || d.data("changed") ? u.push("xdsoft_current") : a.initTime && u.push("xdsoft_init_time"));
            parseInt(n.getHours(), 10) === parseInt(b, 10) && parseInt(n.getMinutes(), 10) === parseInt(c, 10) && u.push("xdsoft_today");
            x += '<div class="xdsoft_time ' + u.join(" ") + '" data-hour="' + b + '" data-minute="' + c + '">' + e.dateFormat(a.formatTime) + "</div>"
          };
          if (a.allowTimes && b.isArray(a.allowTimes) && a.allowTimes.length)
            for (k = 0; k < a.allowTimes.length; k += 1) q = f.strtotime(a.allowTimes[k]).getHours(), r = f.strtotime(a.allowTimes[k]).getMinutes(), c(q, r);
          else
            for (g = k = 0; k < (a.hours12 ? 12 : 24); k += 1)
              for (g = 0; 60 > g; g += a.step) q = (10 > k ? "0" : "") + k, r = (10 > g ? "0" : "") + g, c(q, r);
          t.html(x);
          m = "";
          k = 0;
          for (k = parseInt(a.yearStart, 10) + a.yearOffset; k <= parseInt(a.yearEnd, 10) + a.yearOffset; k += 1) m += '<div class="xdsoft_option ' + (f.currentTime.getFullYear() === k ? "xdsoft_current" : "") + '" data-value="' + k + '">' + k + "</div>";
          D.children().eq(0).html(m);
          k = 0;
          for (m = ""; 11 >= k; k += 1) m += '<div class="xdsoft_option ' + (f.currentTime.getMonth() === k ? "xdsoft_current" : "") + '" data-value="' + k + '">' + a.i18n[a.lang].months[k] + "</div>";
          y.children().eq(0).html(m);
          b(d).trigger("generate.xdsoft")
        }, 10);
        c.stopPropagation()
      }).on("afterOpen.xdsoft", function () {
        if (a.timepicker) {
          var b, d, e;
          t.find(".xdsoft_current").length ? b = ".xdsoft_current" : t.find(".xdsoft_init_time").length && (b = ".xdsoft_init_time");
          b ? (d = q[0].clientHeight, e = t[0].offsetHeight, b = t.find(b).index() * a.timeHeightInTimePicker + 1, e - d < b && (b = e - d), q.trigger("scroll_element.xdsoft_scroller", [parseInt(b, 10) / (e - d)])) : q.trigger("scroll_element.xdsoft_scroller", [0])
        }
      });
      E = 0;
      w.on("click.xdsoft", "td", function (c) {
        c.stopPropagation();
        E += 1;
        var h = b(this),
          g = f.currentTime;
        if (void 0 === g || null === g) f.currentTime = f.now(), g = f.currentTime;
        if (h.hasClass("xdsoft_disabled")) return !1;
        g.setDate(1);
        g.setFullYear(h.data("year"));
        g.setMonth(h.data("month"));
        g.setDate(h.data("date"));
        d.trigger("select.xdsoft", [g]);
        e.val(f.str());
        (1 < E || !0 === a.closeOnDateSelect || 0 === a.closeOnDateSelect && !a.timepicker) && !a.inline && d.trigger("close.xdsoft");
        a.onSelectDate && b.isFunction(a.onSelectDate) && a.onSelectDate.call(d, f.currentTime, d.data("input"), c);
        d.data("changed", !0);
        d.trigger("xchange.xdsoft");
        d.trigger("changedatetime.xdsoft");
        setTimeout(function () {
          E = 0
        }, 200)
      });
      t.on("click.xdsoft", "div", function (c) {
        c.stopPropagation();
        var e = b(this),
          g = f.currentTime;
        if (void 0 === g || null === g) f.currentTime = f.now(), g = f.currentTime;
        if (e.hasClass("xdsoft_disabled")) return !1;
        g.setHours(e.data("hour"));
        g.setMinutes(e.data("minute"));
        d.trigger("select.xdsoft", [g]);
        d.data("input").val(f.str());
        a.inline || d.trigger("close.xdsoft");
        a.onSelectTime && b.isFunction(a.onSelectTime) && a.onSelectTime.call(d, f.currentTime, d.data("input"), c);
        d.data("changed", !0);
        d.trigger("xchange.xdsoft");
        d.trigger("changedatetime.xdsoft")
      });
      r.on("mousewheel.xdsoft", function (b) {
        if (!a.scrollMonth) return !0;
        0 > b.deltaY ? f.nextMonth() : f.prevMonth();
        return !1
      });
      e.on("mousewheel.xdsoft", function (b) {
        if (!a.scrollInput) return !0;
        if (!a.datepicker && a.timepicker) return A = t.find(".xdsoft_current").length ? t.find(".xdsoft_current").eq(0).index() : 0, 0 <= A + b.deltaY && A + b.deltaY < t.children().length && (A += b.deltaY), t.children().eq(A).length && t.children().eq(A).trigger("mousedown"), !1;
        if (a.datepicker && !a.timepicker) return r.trigger(b, [b.deltaY, b.deltaX, b.deltaY]), e.val && e.val(f.str()), d.trigger("changedatetime.xdsoft"), !1
      });
      d.on("changedatetime.xdsoft", function (c) {
        if (a.onChangeDateTime && b.isFunction(a.onChangeDateTime)) {
          var e = d.data("input");
          a.onChangeDateTime.call(d, f.currentTime, e, c);
          delete a.value;
          e.trigger("change")
        }
      }).on("generate.xdsoft", function () {
        a.onGenerate && b.isFunction(a.onGenerate) && a.onGenerate.call(d, f.currentTime, d.data("input"));
        G && (d.trigger("afterOpen.xdsoft"), G = !1)
      }).on("click.xdsoft", function (a) {
        a.stopPropagation()
      });
      A = 0;
      H = function () {
        var c = d.data("input").offset(),
          e = c.top + d.data("input")[0].offsetHeight - 1,
          f = c.left,
          g = "absolute";
        a.fixed ? (e -= b(window).scrollTop(), f -= b(window).scrollLeft(), g = "fixed") : (e + d[0].offsetHeight > b(window).height() + b(window).scrollTop() && (e = c.top - d[0].offsetHeight + 1), 0 > e && (e = 0), f + d[0].offsetWidth > b(window).width() && (f = b(window).width() - d[0].offsetWidth));
        d.css({
          left: f,
          top: e,
          position: g
        })
      };
      d.on("open.xdsoft", function (c) {
        var e = !0;
        a.onShow && b.isFunction(a.onShow) && (e = a.onShow.call(d, f.currentTime, d.data("input"), c));
        if (!1 !== e && (d.show(), H(), b(window).off("resize.xdsoft", H).on("resize.xdsoft", H), a.closeOnWithoutClick)) b([document.body, window]).on("mousedown.xdsoft", function k() {
          d.trigger("close.xdsoft");
          b([document.body, window]).off("mousedown.xdsoft", k)
        })
      }).on("close.xdsoft", function (c) {
        var e = !0;
        v.find(".xdsoft_month,.xdsoft_year").find(".xdsoft_select").hide();
        a.onClose && b.isFunction(a.onClose) && (e = a.onClose.call(d, f.currentTime, d.data("input"), c));
        !1 === e || a.opened || a.inline || d.hide();
        c.stopPropagation()
      }).on("toggle.xdsoft", function (a) {
        d.is(":visible") ? d.trigger("close.xdsoft") : d.trigger("open.xdsoft")
      }).data("input", e);
      J = 0;
      d.data("xdsoft_datetime", f);
      d.setOptions(a);
      f.setCurrentTime(n());
      e.data("xdsoft_datetimepicker", d).on("open.xdsoft focusin.xdsoft mousedown.xdsoft", function (b) {
        e.is(":disabled") || e.data("xdsoft_datetimepicker").is(":visible") && a.closeOnInputClick || (clearTimeout(J), J = setTimeout(function () {
          e.is(":disabled") || (G = !0, f.setCurrentTime(n()), d.trigger("open.xdsoft"))
        }, 100))
      }).on("keydown.xdsoft", function (c) {
        c = c.which;
        if (-1 !== [13].indexOf(c) && a.enterLikeTab) return c = b("input:visible,textarea:visible"), d.trigger("close.xdsoft"), c.eq(c.index(this) + 1).focus(), !1;
        if (-1 !== [9].indexOf(c)) return d.trigger("close.xdsoft"), !0
      })
    };
    w = function (a) {
      var g = a.data("xdsoft_datetimepicker");
      g && (g.data("xdsoft_datetime", null), g.remove(), a.data("xdsoft_datetimepicker", null).off(".xdsoft"), b(window).off("resize.xdsoft"), b([window, document.body]).off("mousedown.xdsoft"), a.unmousewheel && a.unmousewheel())
    };
    b(document).off("keydown.xdsoftctrl keyup.xdsoftctrl").on("keydown.xdsoftctrl", function (a) {
      17 === a.keyCode && (g = !0)
    }).on("keyup.xdsoftctrl", function (a) {
      17 === a.keyCode && (g = !1)
    });
    return this.each(function () {
      var e = b(this).data("xdsoft_datetimepicker");
      if (e) {
        if ("string" === b.type(m)) switch (m) {
          case "show":
            b(this).select().focus();
            e.trigger("open.xdsoft");
            break;
          case "hide":
            e.trigger("close.xdsoft");
            break;
          case "toggle":
            e.trigger("toggle.xdsoft");
            break;
          case "destroy":
            w(b(this));
            break;
          case "reset":
            (this.value = this.defaultValue) && e.data("xdsoft_datetime").isValidDate(Date.parseDate(this.value, a.format)) || e.data("changed", !1), e.data("xdsoft_datetime").setCurrentTime(this.value)
        } else e.setOptions(m);
        return 0
      }
      "string" !== b.type(m) && (!a.lazyInit || a.open || a.inline ? p(b(this)) : y(b(this)))
    })
  };
  b.fn.datetimepicker.defaults = x
})(jQuery);
(function () {
  ! function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
  }(function (a) {
    function b(b) {
      var g = b || window.event,
        h = i.call(arguments, 1),
        j = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
      if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
        if (1 === g.deltaMode) {
          var q = a.data(this, "mousewheel-line-height");
          j *= q, m *= q, l *= q
        } else if (2 === g.deltaMode) {
          var r = a.data(this, "mousewheel-page-height");
          j *= r, m *= r, l *= r
        }
        if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
          var s = this.getBoundingClientRect();
          o = b.clientX - s.left, p = b.clientY - s.top
        }
        return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
      }
    }

    function c() {
      f = null
    }

    function d(a, b) {
      return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
      h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
      i = Array.prototype.slice;
    if (a.event.fixHooks)
      for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
      version: "3.1.12",
      setup: function () {
        if (this.addEventListener)
          for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
        else this.onmousewheel = b;
        a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
      },
      teardown: function () {
        if (this.removeEventListener)
          for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
        else this.onmousewheel = null;
        a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
      },
      getLineHeight: function (b) {
        var c = a(b),
          d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
        return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
      },
      getPageHeight: function (b) {
        return a(b).height()
      },
      settings: {
        adjustOldDeltas: !0,
        normalizeOffset: !0
      }
    };
    a.fn.extend({
      mousewheel: function (a) {
        return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
      },
      unmousewheel: function (a) {
        return this.unbind("mousewheel", a)
      }
    })
  });
  Date.parseFunctions = {
    count: 0
  };
  Date.parseRegexes = [];
  Date.formatFunctions = {
    count: 0
  };
  Date.prototype.dateFormat = function (b) {
    if (b == "unixtime") {
      return parseInt(this.getTime() / 1000);
    }
    if (Date.formatFunctions[b] == null) {
      Date.createNewFormat(b);
    }
    var a = Date.formatFunctions[b];
    return this[a]();
  };
  Date.createNewFormat = function (format) {
    var funcName = "format" + Date.formatFunctions.count++;
    Date.formatFunctions[format] = funcName;
    var codePrefix = "Date.prototype." + funcName + " = function() {return ";
    var code = "";
    var special = false;
    var ch = "";
    for (var i = 0; i < format.length; ++i) {
      ch = format.charAt(i);
      if (!special && ch == "\\") {
        special = true;
      } else {
        if (special) {
          special = false;
          code += "'" + String.escape(ch) + "' + ";
        } else {
          code += Date.getFormatCode(ch);
        }
      }
    }
    if (code.length == 0) {
      code = "\"\"";
    } else {
      code = code.substring(0, code.length - 3);
    }
    eval(codePrefix + code + ";}");
  };
  Date.getFormatCode = function (a) {
    switch (a) {
      case "d":
        return "String.leftPad(this.getDate(), 2, '0') + ";
      case "D":
        return "Date.dayNames[this.getDay()].substring(0, 3) + ";
      case "j":
        return "this.getDate() + ";
      case "l":
        return "Date.dayNames[this.getDay()] + ";
      case "S":
        return "this.getSuffix() + ";
      case "w":
        return "this.getDay() + ";
      case "z":
        return "this.getDayOfYear() + ";
      case "W":
        return "this.getWeekOfYear() + ";
      case "F":
        return "Date.monthNames[this.getMonth()] + ";
      case "m":
        return "String.leftPad(this.getMonth() + 1, 2, '0') + ";
      case "M":
        return "Date.monthNames[this.getMonth()].substring(0, 3) + ";
      case "n":
        return "(this.getMonth() + 1) + ";
      case "t":
        return "this.getDaysInMonth() + ";
      case "L":
        return "(this.isLeapYear() ? 1 : 0) + ";
      case "Y":
        return "this.getFullYear() + ";
      case "y":
        return "('' + this.getFullYear()).substring(2, 4) + ";
      case "a":
        return "(this.getHours() < 12 ? 'am' : 'pm') + ";
      case "A":
        return "(this.getHours() < 12 ? 'AM' : 'PM') + ";
      case "g":
        return "((this.getHours() %12) ? this.getHours() % 12 : 12) + ";
      case "G":
        return "this.getHours() + ";
      case "h":
        return "String.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";
      case "H":
        return "String.leftPad(this.getHours(), 2, '0') + ";
      case "i":
        return "String.leftPad(this.getMinutes(), 2, '0') + ";
      case "s":
        return "String.leftPad(this.getSeconds(), 2, '0') + ";
      case "O":
        return "this.getGMTOffset() + ";
      case "T":
        return "this.getTimezone() + ";
      case "Z":
        return "(this.getTimezoneOffset() * -60) + ";
      default:
        return "'" + String.escape(a) + "' + ";
    }
  };
  Date.parseDate = function (a, c) {
    if (c == "unixtime") {
      return new Date(!isNaN(parseInt(a)) ? parseInt(a) * 1000 : 0);
    }
    if (Date.parseFunctions[c] == null) {
      Date.createParser(c);
    }
    var b = Date.parseFunctions[c];
    return Date[b](a);
  };
  Date.createParser = function (format) {
    var funcName = "parse" + Date.parseFunctions.count++;
    var regexNum = Date.parseRegexes.length;
    var currentGroup = 1;
    Date.parseFunctions[format] = funcName;
    var code = "Date." + funcName + " = function(input) {\nvar y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, z = -1;\nvar d = new Date();\ny = d.getFullYear();\nm = d.getMonth();\nd = d.getDate();\nvar results = input.match(Date.parseRegexes[" + regexNum + "]);\nif (results && results.length > 0) {";
    var regex = "";
    var special = false;
    var ch = "";
    for (var i = 0; i < format.length; ++i) {
      ch = format.charAt(i);
      if (!special && ch == "\\") {
        special = true;
      } else {
        if (special) {
          special = false;
          regex += String.escape(ch);
        } else {
          obj = Date.formatCodeToRegex(ch, currentGroup);
          currentGroup += obj.g;
          regex += obj.s;
          if (obj.g && obj.c) {
            code += obj.c;
          }
        }
      }
    }
    code += "if (y > 0 && z > 0){\nvar doyDate = new Date(y,0);\ndoyDate.setDate(z);\nm = doyDate.getMonth();\nd = doyDate.getDate();\n}";
    code += "if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n{return new Date(y, m, d, h, i, s);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n{return new Date(y, m, d, h, i);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0)\n{return new Date(y, m, d, h);}\nelse if (y > 0 && m >= 0 && d > 0)\n{return new Date(y, m, d);}\nelse if (y > 0 && m >= 0)\n{return new Date(y, m);}\nelse if (y > 0)\n{return new Date(y);}\n}return null;}";
    Date.parseRegexes[regexNum] = new RegExp("^" + regex + "$");
    eval(code);
  };
  Date.formatCodeToRegex = function (b, a) {
    switch (b) {
      case "D":
        return {
          g: 0,
          c: null,
          s: "(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"
        };
      case "j":
      case "d":
        return {
          g: 1,
          c: "d = parseInt(results[" + a + "], 10);\n",
          s: "(\\d{1,2})"
        };
      case "l":
        return {
          g: 0,
          c: null,
          s: "(?:" + Date.dayNames.join("|") + ")"
        };
      case "S":
        return {
          g: 0,
          c: null,
          s: "(?:st|nd|rd|th)"
        };
      case "w":
        return {
          g: 0,
          c: null,
          s: "\\d"
        };
      case "z":
        return {
          g: 1,
          c: "z = parseInt(results[" + a + "], 10);\n",
          s: "(\\d{1,3})"
        };
      case "W":
        return {
          g: 0,
          c: null,
          s: "(?:\\d{2})"
        };
      case "F":
        return {
          g: 1,
          c: "m = parseInt(Date.monthNumbers[results[" + a + "].substring(0, 3)], 10);\n",
          s: "(" + Date.monthNames.join("|") + ")"
        };
      case "M":
        return {
          g: 1,
          c: "m = parseInt(Date.monthNumbers[results[" + a + "]], 10);\n",
          s: "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"
        };
      case "n":
      case "m":
        return {
          g: 1,
          c: "m = parseInt(results[" + a + "], 10) - 1;\n",
          s: "(\\d{1,2})"
        };
      case "t":
        return {
          g: 0,
          c: null,
          s: "\\d{1,2}"
        };
      case "L":
        return {
          g: 0,
          c: null,
          s: "(?:1|0)"
        };
      case "Y":
        return {
          g: 1,
          c: "y = parseInt(results[" + a + "], 10);\n",
          s: "(\\d{4})"
        };
      case "y":
        return {
          g: 1,
          c: "var ty = parseInt(results[" + a + "], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
          s: "(\\d{1,2})"
        };
      case "a":
        return {
          g: 1,
          c: "if (results[" + a + "] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",
          s: "(am|pm)"
        };
      case "A":
        return {
          g: 1,
          c: "if (results[" + a + "] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",
          s: "(AM|PM)"
        };
      case "g":
      case "G":
      case "h":
      case "H":
        return {
          g: 1,
          c: "h = parseInt(results[" + a + "], 10);\n",
          s: "(\\d{1,2})"
        };
      case "i":
        return {
          g: 1,
          c: "i = parseInt(results[" + a + "], 10);\n",
          s: "(\\d{2})"
        };
      case "s":
        return {
          g: 1,
          c: "s = parseInt(results[" + a + "], 10);\n",
          s: "(\\d{2})"
        };
      case "O":
        return {
          g: 0,
          c: null,
          s: "[+-]\\d{4}"
        };
      case "T":
        return {
          g: 0,
          c: null,
          s: "[A-Z]{3}"
        };
      case "Z":
        return {
          g: 0,
          c: null,
          s: "[+-]\\d{1,5}"
        };
      default:
        return {
          g: 0,
          c: null,
          s: String.escape(b)
        };
    }
  };
  Date.prototype.getTimezone = function () {
    return this.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/, "$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/, "$1$2$3");
  };
  Date.prototype.getGMTOffset = function () {
    return (this.getTimezoneOffset() > 0 ? "-" : "+") + String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset()) / 60), 2, "0") + String.leftPad(Math.abs(this.getTimezoneOffset()) % 60, 2, "0");
  };
  Date.prototype.getDayOfYear = function () {
    var a = 0;
    Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
    for (var b = 0; b < this.getMonth(); ++b) {
      a += Date.daysInMonth[b];
    }
    return a + this.getDate();
  };
  Date.prototype.getWeekOfYear = function () {
    var b = this.getDayOfYear() + (4 - this.getDay());
    var a = new Date(this.getFullYear(), 0, 1);
    var c = (7 - a.getDay() + 4);
    return String.leftPad(Math.ceil((b - c) / 7) + 1, 2, "0");
  };
  Date.prototype.isLeapYear = function () {
    var a = this.getFullYear();
    return ((a & 3) == 0 && (a % 100 || (a % 400 == 0 && a)));
  };
  Date.prototype.getFirstDayOfMonth = function () {
    var a = (this.getDay() - (this.getDate() - 1)) % 7;
    return (a < 0) ? (a + 7) : a;
  };
  Date.prototype.getLastDayOfMonth = function () {
    var a = (this.getDay() + (Date.daysInMonth[this.getMonth()] - this.getDate())) % 7;
    return (a < 0) ? (a + 7) : a;
  };
  Date.prototype.getDaysInMonth = function () {
    Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
    return Date.daysInMonth[this.getMonth()];
  };
  Date.prototype.getSuffix = function () {
    switch (this.getDate()) {
      case 1:
      case 21:
      case 31:
        return "st";
      case 2:
      case 22:
        return "nd";
      case 3:
      case 23:
        return "rd";
      default:
        return "th";
    }
  };
  String.escape = function (a) {
    return a.replace(/('|\\)/g, "\\$1");
  };
  String.leftPad = function (d, b, c) {
    var a = new String(d);
    if (c == null) {
      c = " ";
    }
    while (a.length < b) {
      a = c + a;
    }
    return a;
  };
  Date.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  Date.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  Date.y2kYear = 50;
  Date.monthNumbers = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  };
  Date.patterns = {
    ISO8601LongPattern: "Y-m-d H:i:s",
    ISO8601ShortPattern: "Y-m-d",
    ShortDatePattern: "n/j/Y",
    LongDatePattern: "l, F d, Y",
    FullDateTimePattern: "l, F d, Y g:i:s A",
    MonthDayPattern: "F d",
    ShortTimePattern: "g:i A",
    LongTimePattern: "g:i:s A",
    SortableDateTimePattern: "Y-m-d\\TH:i:s",
    UniversalSortableDateTimePattern: "Y-m-d H:i:sO",
    YearMonthPattern: "F, Y"
  };
}());


/* Chosen v1.7.0 | (c) 2011-2017 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
(function () {
  var a, b, c, d, e, f = function (a, b) {
      return function () {
        return a.apply(b, arguments)
      }
    },
    g = {}.hasOwnProperty,
    h = function (a, b) {
      function c() {
        this.constructor = a
      }
      for (var d in b) g.call(b, d) && (a[d] = b[d]);
      return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
    };
  d = function () {
    function a() {
      this.options_index = 0, this.parsed = []
    }
    return a.prototype.add_node = function (a) {
      return "OPTGROUP" === a.nodeName.toUpperCase() ? this.add_group(a) : this.add_option(a)
    }, a.prototype.add_group = function (a) {
      var b, c, d, e, f, g;
      for (b = this.parsed.length, this.parsed.push({
          array_index: b,
          group: !0,
          label: this.escapeExpression(a.label),
          title: a.title ? a.title : void 0,
          children: 0,
          disabled: a.disabled,
          classes: a.className
        }), f = a.childNodes, g = [], d = 0, e = f.length; e > d; d++) c = f[d], g.push(this.add_option(c, b, a.disabled));
      return g
    }, a.prototype.add_option = function (a, b, c) {
      return "OPTION" === a.nodeName.toUpperCase() ? ("" !== a.text ? (null != b && (this.parsed[b].children += 1), this.parsed.push({
        array_index: this.parsed.length,
        options_index: this.options_index,
        value: a.value,
        text: a.text,
        html: a.innerHTML,
        title: a.title ? a.title : void 0,
        selected: a.selected,
        disabled: c === !0 ? c : a.disabled,
        group_array_index: b,
        group_label: null != b ? this.parsed[b].label : null,
        classes: a.className,
        style: a.style.cssText
      })) : this.parsed.push({
        array_index: this.parsed.length,
        options_index: this.options_index,
        empty: !0
      }), this.options_index += 1) : void 0
    }, a.prototype.escapeExpression = function (a) {
      var b, c;
      return null == a || a === !1 ? "" : /[\&\<\>\"\'\`]/.test(a) ? (b = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
      }, c = /&(?!\w+;)|[\<\>\"\'\`]/g, a.replace(c, function (a) {
        return b[a] || "&amp;"
      })) : a
    }, a
  }(), d.select_to_array = function (a) {
    var b, c, e, f, g;
    for (c = new d, g = a.childNodes, e = 0, f = g.length; f > e; e++) b = g[e], c.add_node(b);
    return c.parsed
  }, b = function () {
    function a(b, c) {
      this.form_field = b, this.options = null != c ? c : {}, this.label_click_handler = f(this.label_click_handler, this), a.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready())
    }
    return a.prototype.set_default_values = function () {
      var a = this;
      return this.click_test_action = function (b) {
        return a.test_active_click(b)
      }, this.activate_action = function (b) {
        return a.activate_field(b)
      }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className), this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0, this.group_search = null != this.options.group_search ? this.options.group_search : !0, this.search_contains = this.options.search_contains || !0, this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete : !0, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options : !0, this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options : !0, this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1, this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY, this.case_sensitive_search = this.options.case_sensitive_search || !1, this.hide_results_on_select = null != this.options.hide_results_on_select ? this.options.hide_results_on_select : !0
    }, a.prototype.set_default_text = function () {
      return this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || a.default_multiple_text : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || a.default_single_text, this.default_text = this.escape_html(this.default_text), this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || a.default_no_result_text
    }, a.prototype.choice_label = function (a) {
      return this.include_group_label_in_selected && null != a.group_label ? "<b class='group-name'>" + a.group_label + "</b>" + a.html : a.html
    }, a.prototype.mouse_enter = function () {
      return this.mouse_on_container = !0
    }, a.prototype.mouse_leave = function () {
      return this.mouse_on_container = !1
    }, a.prototype.input_focus = function (a) {
      var b = this;
      if (this.is_multiple) {
        if (!this.active_field) return setTimeout(function () {
          return b.container_mousedown()
        }, 50)
      } else if (!this.active_field) return this.activate_field()
    }, a.prototype.input_blur = function (a) {
      var b = this;
      return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function () {
        return b.blur_test()
      }, 100))
    }, a.prototype.label_click_handler = function (a) {
      return this.is_multiple ? this.container_mousedown(a) : this.activate_field()
    }, a.prototype.results_option_build = function (a) {
      var b, c, d, e, f, g, h;
      for (b = "", e = 0, h = this.results_data, f = 0, g = h.length; g > f && (c = h[f], d = "", d = c.group ? this.result_add_group(c) : this.result_add_option(c), "" !== d && (e++, b += d), (null != a ? a.first : void 0) && (c.selected && this.is_multiple ? this.choice_build(c) : c.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(c))), !(e >= this.max_shown_results)); f++);
      return b
    }, a.prototype.result_add_option = function (a) {
      var b, c;
      return a.search_match && this.include_option_in_results(a) ? (b = [], a.disabled || a.selected && this.is_multiple || b.push("active-result"), !a.disabled || a.selected && this.is_multiple || b.push("disabled-result"), a.selected && b.push("result-selected"), null != a.group_array_index && b.push("group-option"), "" !== a.classes && b.push(a.classes), c = document.createElement("li"), c.className = b.join(" "), c.style.cssText = a.style, c.setAttribute("data-option-array-index", a.array_index), c.innerHTML = a.search_text, a.title && (c.title = a.title), this.outerHTML(c)) : ""
    }, a.prototype.result_add_group = function (a) {
      var b, c;
      return (a.search_match || a.group_match) && a.active_options > 0 ? (b = [], b.push("group-result"), a.classes && b.push(a.classes), c = document.createElement("li"), c.className = b.join(" "), c.innerHTML = a.search_text, a.title && (c.title = a.title), this.outerHTML(c)) : ""
    }, a.prototype.results_update_field = function () {
      return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing ? this.winnow_results() : void 0
    }, a.prototype.reset_single_select_options = function () {
      var a, b, c, d, e;
      for (d = this.results_data, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a.selected ? e.push(a.selected = !1) : e.push(void 0);
      return e
    }, a.prototype.results_toggle = function () {
      return this.results_showing ? this.results_hide() : this.results_show()
    }, a.prototype.results_search = function (a) {
      return this.results_showing ? this.winnow_results() : this.results_show()
    }, a.prototype.winnow_results = function () {
      var a, b, c, d, e, f, g, h, i, j, k, l;
      for (this.no_results_clear(), e = 0, g = this.get_search_text(), a = g.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), d = this.get_search_regex(a), b = this.get_highlight_regex(a), l = this.results_data, j = 0, k = l.length; k > j; j++) c = l[j], c.search_match = !1, f = null, this.include_option_in_results(c) && (c.group && (c.group_match = !1, c.active_options = 0), null != c.group_array_index && this.results_data[c.group_array_index] && (f = this.results_data[c.group_array_index], 0 === f.active_options && f.search_match && (e += 1), f.active_options += 1), c.search_text = c.group ? c.label : c.html, (!c.group || this.group_search) && (c.search_match = this.search_string_match(c.search_text, d), c.search_match && !c.group && (e += 1), c.search_match ? (g.length && (h = c.search_text.search(b), i = c.search_text.substr(0, h + g.length) + c.search_text.substr(h + g.length), c.search_text = i), null != f && (f.group_match = !0)) : null != c.group_array_index && this.results_data[c.group_array_index].search_match && (c.search_match = !0)));
      return this.result_clear_highlight(), 1 > e && g.length ? (this.update_results_content(""), this.no_results(g)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
    }, a.prototype.get_search_regex = function (a) {
      var b, c;
      return b = this.search_contains ? "" : "^", c = this.case_sensitive_search ? "" : "i", new RegExp(b + a, c)
    }, a.prototype.get_highlight_regex = function (a) {
      var b, c;
      return b = this.search_contains ? "" : "\\b", c = this.case_sensitive_search ? "" : "i", new RegExp(b + a, c)
    }, a.prototype.search_string_match = function (a, b) {
      var c, d, e, f;
      if (b.test(a)) return !0;
      if (this.enable_split_word_search && (a.indexOf(" ") >= 0 || 0 === a.indexOf("[")) && (d = a.replace(/\[|\]/g, "").split(" "), d.length))
        for (e = 0, f = d.length; f > e; e++)
          if (c = d[e], b.test(c)) return !0
    }, a.prototype.choices_count = function () {
      var a, b, c, d;
      if (null != this.selected_option_count) return this.selected_option_count;
      for (this.selected_option_count = 0, d = this.form_field.options, b = 0, c = d.length; c > b; b++) a = d[b], a.selected && (this.selected_option_count += 1);
      return this.selected_option_count
    }, a.prototype.choices_click = function (a) {
      return a.preventDefault(), this.activate_field(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
    }, a.prototype.keydown_checker = function (a) {
      var b, c;
      switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), 8 !== b && this.pending_backstroke && this.clear_backstroke(), b) {
        case 8:
          this.backstroke_length = this.get_search_field_value().length;
          break;
        case 9:
          this.results_showing && !this.is_multiple && this.result_select(a), this.mouse_on_container = !1;
          break;
        case 13:
          this.results_showing && a.preventDefault();
          break;
        case 27:
          this.results_showing && a.preventDefault();
          break;
        case 32:
          this.disable_search && a.preventDefault();
          break;
        case 38:
          a.preventDefault(), this.keyup_arrow();
          break;
        case 40:
          a.preventDefault(), this.keydown_arrow()
      }
    }, a.prototype.keyup_checker = function (a) {
      var b, c;
      switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), b) {
        case 8:
          this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0 ? this.keydown_backstroke() : this.pending_backstroke || (this.result_clear_highlight(), this.results_search());
          break;
        case 13:
          a.preventDefault(), this.results_showing && this.result_select(a);
          break;
        case 27:
          this.results_showing && this.results_hide();
          break;
        case 9:
        case 16:
        case 17:
        case 18:
        case 38:
        case 40:
        case 91:
          break;
        default:
          this.results_search()
      }
    }, a.prototype.clipboard_event_checker = function (a) {
      var b = this;
      if (!this.is_disabled) return setTimeout(function () {
        return b.results_search()
      }, 50)
    }, a.prototype.container_width = function () {
      return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
    }, a.prototype.include_option_in_results = function (a) {
      return this.is_multiple && !this.display_selected_options && a.selected ? !1 : !this.display_disabled_options && a.disabled ? !1 : a.empty ? !1 : !0
    }, a.prototype.search_results_touchstart = function (a) {
      return this.touch_started = !0, this.search_results_mouseover(a)
    }, a.prototype.search_results_touchmove = function (a) {
      return this.touch_started = !1, this.search_results_mouseout(a)
    }, a.prototype.search_results_touchend = function (a) {
      return this.touch_started ? this.search_results_mouseup(a) : void 0
    }, a.prototype.outerHTML = function (a) {
      var b;
      return a.outerHTML ? a.outerHTML : (b = document.createElement("div"), b.appendChild(a), b.innerHTML)
    }, a.prototype.get_single_html = function () {
      return '<a class="chosen-single chosen-default">\n  <span>' + this.default_text + '</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>'
    }, a.prototype.get_multi_html = function () {
      return '<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="' + this.default_text + '" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>'
    }, a.prototype.get_no_results_html = function (a) {
      return '<li class="no-results">\n  ' + this.results_none_found + " <span>" + a + "</span>\n</li>"
    }, a.browser_is_supported = function () {
      return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent) ? !1 : !0
    }, a.default_multiple_text = "Select Some Options", a.default_single_text = "Select an Option", a.default_no_result_text = "No results match", a
  }(), a = jQuery, a.fn.extend({
    chosen: function (d) {
      return b.browser_is_supported() ? this.each(function (b) {
        var e, f;
        return e = a(this), f = e.data("chosen"), "destroy" === d ? void(f instanceof c && f.destroy()) : void(f instanceof c || e.data("chosen", new c(this, d)))
      }) : this
    }
  }), c = function (b) {
    function c() {
      return e = c.__super__.constructor.apply(this, arguments)
    }
    return h(c, b), c.prototype.setup = function () {
      return this.form_field_jq = a(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex
    }, c.prototype.set_up_html = function () {
      var b, c;
      return b = ["chosen-container"], b.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && b.push(this.form_field.className), this.is_rtl && b.push("chosen-rtl"), c = {
        "class": b.join(" "),
        title: this.form_field.title
      }, this.form_field.id.length && (c.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = a("<div />", c), this.container.width(this.container_width()), this.is_multiple ? this.container.html(this.get_multi_html()) : this.container.html(this.get_single_html()), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior()
    }, c.prototype.on_ready = function () {
      return this.form_field_jq.trigger("chosen:ready", {
        chosen: this
      })
    }, c.prototype.register_observers = function () {
      var a = this;
      return this.container.bind("touchstart.chosen", function (b) {
        a.container_mousedown(b)
      }), this.container.bind("touchend.chosen", function (b) {
        a.container_mouseup(b)
      }), this.container.bind("mousedown.chosen", function (b) {
        a.container_mousedown(b)
      }), this.container.bind("mouseup.chosen", function (b) {
        a.container_mouseup(b)
      }), this.container.bind("mouseenter.chosen", function (b) {
        a.mouse_enter(b)
      }), this.container.bind("mouseleave.chosen", function (b) {
        a.mouse_leave(b)
      }), this.search_results.bind("mouseup.chosen", function (b) {
        a.search_results_mouseup(b)
      }), this.search_results.bind("mouseover.chosen", function (b) {
        a.search_results_mouseover(b)
      }), this.search_results.bind("mouseout.chosen", function (b) {
        a.search_results_mouseout(b)
      }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function (b) {
        a.search_results_mousewheel(b)
      }), this.search_results.bind("touchstart.chosen", function (b) {
        a.search_results_touchstart(b)
      }), this.search_results.bind("touchmove.chosen", function (b) {
        a.search_results_touchmove(b)
      }), this.search_results.bind("touchend.chosen", function (b) {
        a.search_results_touchend(b)
      }), this.form_field_jq.bind("chosen:updated.chosen", function (b) {
        a.results_update_field(b)
      }), this.form_field_jq.bind("chosen:activate.chosen", function (b) {
        a.activate_field(b)
      }), this.form_field_jq.bind("chosen:open.chosen", function (b) {
        a.container_mousedown(b)
      }), this.form_field_jq.bind("chosen:close.chosen", function (b) {
        a.close_field(b)
      }), this.search_field.bind("blur.chosen", function (b) {
        a.input_blur(b)
      }), this.search_field.bind("keyup.chosen", function (b) {
        a.keyup_checker(b)
      }), this.search_field.bind("keydown.chosen", function (b) {
        a.keydown_checker(b)
      }), this.search_field.bind("focus.chosen", function (b) {
        a.input_focus(b)
      }), this.search_field.bind("cut.chosen", function (b) {
        a.clipboard_event_checker(b)
      }), this.search_field.bind("paste.chosen", function (b) {
        a.clipboard_event_checker(b)
      }), this.is_multiple ? this.search_choices.bind("click.chosen", function (b) {
        a.choices_click(b)
      }) : this.container.bind("click.chosen", function (a) {
        a.preventDefault()
      })
    }, c.prototype.destroy = function () {
      return a(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.form_field_label.length > 0 && this.form_field_label.unbind("click.chosen"), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
    }, c.prototype.search_field_disabled = function () {
      return this.is_disabled = this.form_field.disabled || this.form_field_jq.parents("fieldset").is(":disabled"), this.container.toggleClass("chosen-disabled", this.is_disabled), this.search_field[0].disabled = this.is_disabled, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_field), this.is_disabled ? this.close_field() : this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_field)
    }, c.prototype.container_mousedown = function (b) {
      var c;
      if (!this.is_disabled) return !b || "mousedown" !== (c = b.type) && "touchstart" !== c || this.results_showing || b.preventDefault(), null != b && a(b.target).hasClass("search-choice-close") ? void 0 : (this.active_field ? this.is_multiple || !b || a(b.target)[0] !== this.selected_item[0] && !a(b.target).parents("a.chosen-single").length || (b.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), a(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
    }, c.prototype.container_mouseup = function (a) {
      return "ABBR" !== a.target.nodeName || this.is_disabled ? void 0 : this.results_reset(a)
    }, c.prototype.search_results_mousewheel = function (a) {
      var b;
      return -a.originalEvent && (b = a.originalEvent.deltaY || -a.originalEvent.wheelDelta || a.originalEvent.detail), null != b ? (a.preventDefault(), "DOMMouseScroll" === a.type && (b = 40 * b), this.search_results.scrollTop(b + this.search_results.scrollTop())) : void 0
    }, c.prototype.blur_test = function (a) {
      return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
    }, c.prototype.close_field = function () {
      return a(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale(), this.search_field.blur()
    }, c.prototype.activate_field = function () {
      return this.is_disabled ? void 0 : (this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus())
    }, c.prototype.test_active_click = function (b) {
      var c;
      return c = a(b.target).closest(".chosen-container"), c.length && this.container[0] === c[0] ? this.active_field = !0 : this.close_field()
    }, c.prototype.results_build = function () {
      return this.parsing = !0, this.selected_option_count = null, this.results_data = d.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({
        first: !0
      })), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
    }, c.prototype.result_do_highlight = function (a) {
      var b, c, d, e, f;
      if (a.length) {
        if (this.result_clear_highlight(), this.result_highlight = a, this.result_highlight.addClass("highlighted"), d = parseInt(this.search_results.css("maxHeight"), 10), f = this.search_results.scrollTop(), e = d + f, c = this.result_highlight.position().top + this.search_results.scrollTop(), b = c + this.result_highlight.outerHeight(), b >= e) return this.search_results.scrollTop(b - d > 0 ? b - d : 0);
        if (f > c) return this.search_results.scrollTop(c)
      }
    }, c.prototype.result_clear_highlight = function () {
      return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
    }, c.prototype.results_show = function () {
      return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
        chosen: this
      }), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.get_search_field_value()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {
        chosen: this
      }))
    }, c.prototype.update_results_content = function (a) {
      return this.search_results.html(a)
    }, c.prototype.results_hide = function () {
      return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {
        chosen: this
      })), this.results_showing = !1
    }, c.prototype.set_tab_index = function (a) {
      var b;
      return this.form_field.tabIndex ? (b = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = b) : void 0
    }, c.prototype.set_label_behavior = function () {
      return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = a("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", this.label_click_handler) : void 0
    }, c.prototype.show_search_field_default = function () {
      return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
    }, c.prototype.search_results_mouseup = function (b) {
      var c;
      return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c.length ? (this.result_highlight = c, this.result_select(b), this.search_field.focus()) : void 0
    }, c.prototype.search_results_mouseover = function (b) {
      var c;
      return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c ? this.result_do_highlight(c) : void 0
    }, c.prototype.search_results_mouseout = function (b) {
      return a(b.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
    }, c.prototype.choice_build = function (b) {
      var c, d, e = this;
      return c = a("<li />", {
        "class": "search-choice"
      }).html("<span>" + this.choice_label(b) + "</span>"), b.disabled ? c.addClass("search-choice-disabled") : (d = a("<a />", {
        "class": "search-choice-close",
        "data-option-array-index": b.array_index
      }), d.bind("click.chosen", function (a) {
        return e.choice_destroy_link_click(a)
      }), c.append(d)), this.search_container.before(c)
    }, c.prototype.choice_destroy_link_click = function (b) {
      return b.preventDefault(), b.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(a(b.target))
    }, c.prototype.choice_destroy = function (a) {
      return this.result_deselect(a[0].getAttribute("data-option-array-index")) ? (this.active_field ? this.search_field.focus() : this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.get_search_field_value().length < 1 && this.results_hide(), a.parents("li").first().remove(), this.search_field_scale()) : void 0
    }, c.prototype.results_reset = function () {
      return this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.trigger_form_field_change(), this.active_field ? this.results_hide() : void 0
    }, c.prototype.results_reset_cleanup = function () {
      return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
    }, c.prototype.result_select = function (a) {
      var b, c;
      return this.result_highlight ? (b = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {
        chosen: this
      }), !1) : (this.is_multiple ? b.removeClass("active-result") : this.reset_single_select_options(), b.addClass("result-selected"), c = this.results_data[b[0].getAttribute("data-option-array-index")], c.selected = !0, this.form_field.options[c.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(c) : this.single_set_selected_text(this.choice_label(c)), (!this.is_multiple || this.hide_results_on_select && !a.metaKey && !a.ctrlKey) && (this.results_hide(), this.show_search_field_default()), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.trigger_form_field_change({
        selected: this.form_field.options[c.options_index].value
      }), this.current_selectedIndex = this.form_field.selectedIndex, a.preventDefault(), this.search_field_scale())) : void 0
    }, c.prototype.single_set_selected_text = function (a) {
      return null == a && (a = this.default_text), a === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").html(a)
    }, c.prototype.result_deselect = function (a) {
      var b;
      return b = this.results_data[a], this.form_field.options[b.options_index].disabled ? !1 : (b.selected = !1, this.form_field.options[b.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.trigger_form_field_change({
        deselected: this.form_field.options[b.options_index].value
      }), this.search_field_scale(), !0)
    }, c.prototype.single_deselect_control_build = function () {
      return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
    }, c.prototype.get_search_field_value = function () {
      return this.search_field.val()
    }, c.prototype.get_search_text = function () {
      return this.escape_html(a.trim(this.get_search_field_value()))
    }, c.prototype.escape_html = function (b) {
      return a("<div/>").text(b).html()
    }, c.prototype.winnow_results_set_highlight = function () {
      var a, b;
      return b = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), a = b.length ? b.first() : this.search_results.find(".active-result").first(), null != a ? this.result_do_highlight(a) : void 0
    }, c.prototype.no_results = function (a) {
      var b;
      return b = this.get_no_results_html(a), this.search_results.append(b), this.form_field_jq.trigger("chosen:no_results", {
        chosen: this
      })
    }, c.prototype.no_results_clear = function () {
      return this.search_results.find(".no-results").remove()
    }, c.prototype.keydown_arrow = function () {
      var a;
      return this.results_showing && this.result_highlight ? (a = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(a) : void 0 : this.results_show()
    }, c.prototype.keyup_arrow = function () {
      var a;
      return this.results_showing || this.is_multiple ? this.result_highlight ? (a = this.result_highlight.prevAll("li.active-result"), a.length ? this.result_do_highlight(a.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
    }, c.prototype.keydown_backstroke = function () {
      var a;
      return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (a = this.search_container.siblings("li.search-choice").last(), a.length && !a.hasClass("search-choice-disabled") ? (this.pending_backstroke = a, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
    }, c.prototype.clear_backstroke = function () {
      return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
    }, c.prototype.search_field_scale = function () {
      var b, c, d, e, f, g, h, i;
      if (this.is_multiple) {
        for (e = {
            position: "absolute",
            left: "-1000px",
            top: "-1000px",
            display: "none",
            whiteSpace: "pre"
          }, f = ["fontSize", "fontStyle", "fontWeight", "fontFamily", "lineHeight", "textTransform", "letterSpacing"], h = 0, i = f.length; i > h; h++) d = f[h], e[d] = this.search_field.css(d);
        return c = a("<div />").css(e), c.text(this.get_search_field_value()), a("body").append(c), g = c.width() + 25, c.remove(), b = this.container.outerWidth(), g = Math.min(b - 10, g), this.search_field.width(g)
      }
    }, c.prototype.trigger_form_field_change = function (a) {
      return this.form_field_jq.trigger("input", a), this.form_field_jq.trigger("change", a)
    }, c
  }(b)
}).call(this);

/*!
 * Nestable jQuery Plugin - Copyright (c) 2012 David Bushell - http://dbushell.com/
 * Dual-licensed under the BSD or MIT licenses
 */
(function (e, g, h, c) {
  var f = "ontouchstart" in g;
  var b = (function () {
    var m = h.createElement("div"),
      n = h.documentElement;
    if (!("pointerEvents" in m.style)) {
      return false
    }
    m.style.pointerEvents = "auto";
    m.style.pointerEvents = "x";
    n.appendChild(m);
    var l = g.getComputedStyle && g.getComputedStyle(m, "").pointerEvents === "auto";
    n.removeChild(m);
    return !!l
  })();
  var k = f ? "touchstart" : "mousedown",
    j = f ? "touchmove" : "mousemove",
    a = f ? "touchend" : "mouseup";
  eCancel = f ? "touchcancel" : "mouseup";
  var d = {
    listNodeName: "ol",
    itemNodeName: "li",
    rootClass: "dd",
    listClass: "dd-list",
    itemClass: "dd-item",
    dragClass: "dd-dragel",
    handleClass: "dd-handle",
    collapsedClass: "dd-collapsed",
    placeClass: "dd-placeholder",
    noDragClass: "dd-nodrag",
    emptyClass: "dd-empty",
    expandBtnHTML: '<button data-action="expand" type="button">Expand</button>',
    collapseBtnHTML: '<button data-action="collapse" type="button">Collapse</button>',
    placeElementDefault: '<div class="dd-placeholder"></div>',
    group: 0,
    maxDepth: 5,
    threshold: 20
  };

  function i(m, l) {
    this.w = e(g);
    this.el = e(m);
    this.options = e.extend({}, d, l);
    this.init()
  }
  i.prototype = {
    init: function () {
      var o = this;
      o.reset();
      o.el.data("nestable-group", this.options.group);
      o.placeEl = $(o.options.placeElementDefault);
      e.each(this.el.find(o.options.itemNodeName), function (p, q) {
        o.setParent(e(q))
      });
      o.el.on("click", "button", function (s) {
        if (o.dragEl || (!f && s.button !== 0)) {
          return
        }
        var r = e(s.currentTarget),
          q = r.data("action"),
          p = r.parent(o.options.itemNodeName);
        if (q === "collapse") {
          o.collapseItem(p)
        }
        if (q === "expand") {
          o.expandItem(p)
        }
      });
      var l = function (q) {
        var p = e(q.target);
        if (!p.hasClass(o.options.handleClass)) {
          if (p.closest("." + o.options.noDragClass).length) {
            return
          }
          p = p.closest("." + o.options.handleClass)
        }
        if (!p.length || o.dragEl || (!f && q.button !== 0) || (f && q.touches.length !== 1)) {
          return
        }
        q.preventDefault();
        o.dragStart(f ? q.touches[0] : q)
      };
      var n = function (p) {
        if (o.dragEl) {
          p.preventDefault();
          o.dragMove(f ? p.touches[0] : p)
        }
      };
      var m = function (p) {
        if (o.dragEl) {
          p.preventDefault();
          o.dragStop(f ? p.touches[0] : p)
        }
      };
      if (f) {
        o.el[0].addEventListener(k, l, false);
        g.addEventListener(j, n, false);
        g.addEventListener(a, m, false);
        g.addEventListener(eCancel, m, false)
      } else {
        o.el.on(k, l);
        o.w.on(j, n);
        o.w.on(a, m)
      }
    },
    serialize: function () {
      var m, n = 0,
        l = this;
      step = function (r, p) {
        var q = [],
          o = r.children(l.options.itemNodeName);
        o.each(function () {
          var s = e(this),
            u = e.extend({}, s.data()),
            t = s.children(l.options.listNodeName);
          if (t.length) {
            u.children = step(t, p + 1)
          }
          q.push(u)
        });
        return q
      };
      m = step(l.el.find(l.options.listNodeName).first(), n);
      return m
    },
    serialise: function () {
      return this.serialize()
    },
    reset: function () {
      this.mouse = {
        offsetX: 0,
        offsetY: 0,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        nowX: 0,
        nowY: 0,
        distX: 0,
        distY: 0,
        dirAx: 0,
        dirX: 0,
        dirY: 0,
        lastDirX: 0,
        lastDirY: 0,
        distAxX: 0,
        distAxY: 0
      };
      this.moving = false;
      this.dragEl = null;
      this.dragRootEl = null;
      this.dragDepth = 0;
      this.hasNewRoot = false;
      this.pointEl = null
    },
    expandItem: function (l) {
      l.removeClass(this.options.collapsedClass);
      l.children('[data-action="expand"]').hide();
      l.children('[data-action="collapse"]').show();
      l.children(this.options.listNodeName).show()
    },
    collapseItem: function (m) {
      var l = m.children(this.options.listNodeName);
      if (l.length) {
        m.addClass(this.options.collapsedClass);
        m.children('[data-action="collapse"]').hide();
        m.children('[data-action="expand"]').show();
        m.children(this.options.listNodeName).hide()
      }
    },
    expandAll: function () {
      var l = this;
      l.el.find(l.options.itemNodeName).each(function () {
        l.expandItem(e(this))
      })
    },
    collapseAll: function () {
      var l = this;
      l.el.find(l.options.itemNodeName).each(function () {
        l.collapseItem(e(this))
      })
    },
    setParent: function (l) {
      if (l.children(this.options.listNodeName).length) {
        l.prepend(e(this.options.expandBtnHTML));
        l.prepend(e(this.options.collapseBtnHTML))
      }
      l.children('[data-action="expand"]').hide()
    },
    unsetParent: function (l) {
      l.removeClass(this.options.collapsedClass);
      l.children("[data-action]").remove();
      l.children(this.options.listNodeName).remove()
    },
    dragStart: function (q) {
      var m = this.mouse,
        p = e(q.target).closest("." + this.options.handleClass),
        o = p.closest(this.options.itemNodeName);
      console.log(p);
      this.placeEl.css("height", o.height());
      m.offsetX = q.offsetX !== c ? q.offsetX : q.pageX - p.offset().left;
      m.offsetY = q.offsetY !== c ? q.offsetY : q.pageY - p.offset().top;
      m.startX = m.lastX = q.pageX;
      m.startY = m.lastY = q.pageY;
      this.dragRootEl = this.el;
      this.dragEl = e(h.createElement(this.options.listNodeName)).addClass(this.options.listClass + " " + this.options.dragClass);
      this.dragEl.css("width", o.width());
      o.after(this.placeEl);
      o[0].parentNode.removeChild(o[0]);
      o.appendTo(this.dragEl);
      e(h.body).append(this.dragEl);
      this.dragEl.css({
        left: q.pageX - m.offsetX,
        top: q.pageY - m.offsetY
      });
      var n, r, l = this.dragEl.find(this.options.itemNodeName);
      for (n = 0; n < l.length; n++) {
        r = e(l[n]).parents(this.options.listNodeName).length;
        if (r > this.dragDepth) {
          this.dragDepth = r
        }
      }
    },
    dragStop: function (m) {
      var l = this.dragEl.children(this.options.itemNodeName).first();
      l[0].parentNode.removeChild(l[0]);
      this.placeEl.replaceWith(l);
      this.dragEl.remove();
      this.el.trigger("change");
      if (this.hasNewRoot) {
        this.dragRootEl.trigger("change")
      }
      this.reset()
    },
    dragMove: function (s) {
      var t, x, n, q, p, m = this.options,
        u = this.mouse;
      this.dragEl.css({
        left: s.pageX - u.offsetX,
        top: s.pageY - u.offsetY
      });
      u.lastX = u.nowX;
      u.lastY = u.nowY;
      u.nowX = s.pageX;
      u.nowY = s.pageY;
      u.distX = u.nowX - u.lastX;
      u.distY = u.nowY - u.lastY;
      u.lastDirX = u.dirX;
      u.lastDirY = u.dirY;
      u.dirX = u.distX === 0 ? 0 : u.distX > 0 ? 1 : -1;
      u.dirY = u.distY === 0 ? 0 : u.distY > 0 ? 1 : -1;
      var l = Math.abs(u.distX) > Math.abs(u.distY) ? 1 : 0;
      if (!u.moving) {
        u.dirAx = l;
        u.moving = true;
        return
      }
      if (u.dirAx !== l) {
        u.distAxX = 0;
        u.distAxY = 0
      } else {
        u.distAxX += Math.abs(u.distX);
        if (u.dirX !== 0 && u.dirX !== u.lastDirX) {
          u.distAxX = 0
        }
        u.distAxY += Math.abs(u.distY);
        if (u.dirY !== 0 && u.dirY !== u.lastDirY) {
          u.distAxY = 0
        }
      }
      u.dirAx = l;
      if (u.dirAx && u.distAxX >= m.threshold) {
        u.distAxX = 0;
        n = this.placeEl.prev(m.itemNodeName);
        if (u.distX > 0 && n.length && !n.hasClass(m.collapsedClass)) {
          t = n.find(m.listNodeName).last();
          p = this.placeEl.parents(m.listNodeName).length;
          if (p + this.dragDepth <= m.maxDepth) {
            if (!t.length) {
              t = e("<" + m.listNodeName + "/>").addClass(m.listClass);
              t.append(this.placeEl);
              n.append(t);
              this.setParent(n)
            } else {
              t = n.children(m.listNodeName).last();
              t.append(this.placeEl)
            }
          }
        }
        if (u.distX < 0) {
          q = this.placeEl.next(m.itemNodeName);
          if (!q.length) {
            x = this.placeEl.parent();
            this.placeEl.closest(m.itemNodeName).after(this.placeEl);
            if (!x.children().length) {
              this.unsetParent(x.parent())
            }
          }
        }
      }
      var o = false;
      if (!b) {
        this.dragEl[0].style.visibility = "hidden"
      }
      this.pointEl = e(h.elementFromPoint(s.pageX - h.body.scrollLeft, s.pageY - (g.pageYOffset || h.documentElement.scrollTop)));
      if (!b) {
        this.dragEl[0].style.visibility = "visible"
      }
      if (this.pointEl.hasClass(m.handleClass)) {
        this.pointEl = this.pointEl.parent(m.itemNodeName)
      }
      if (this.pointEl.hasClass(m.emptyClass)) {
        o = true
      } else {
        if (!this.pointEl.length || !this.pointEl.hasClass(m.itemClass)) {
          return
        }
      }
      var r = this.pointEl.closest("." + m.rootClass),
        w = this.dragRootEl.data("nestable-id") !== r.data("nestable-id");
      if (!u.dirAx || w || o) {
        if (w && m.group !== r.data("nestable-group")) {
          return
        }
        p = this.dragDepth - 1 + this.pointEl.parents(m.listNodeName).length;
        if (p > m.maxDepth) {
          return
        }
        var v = s.pageY < (this.pointEl.offset().top + this.pointEl.height() / 2);
        x = this.placeEl.parent();
        if (o) {
          t = e(h.createElement(m.listNodeName)).addClass(m.listClass);
          t.append(this.placeEl);
          this.pointEl.replaceWith(t)
        } else {
          if (v) {
            this.pointEl.before(this.placeEl)
          } else {
            this.pointEl.after(this.placeEl)
          }
        }
        if (!x.children().length) {
          this.unsetParent(x.parent())
        }
        if (!this.dragRootEl.find(m.itemNodeName).length) {
          this.dragRootEl.append('<div class="' + m.emptyClass + '"/>')
        }
        if (w) {
          this.dragRootEl = r;
          this.hasNewRoot = this.el[0] !== this.dragRootEl[0]
        }
      }
    }
  };
  e.fn.nestable = function (n) {
    var l = this,
      m = this;
    l.each(function () {
      var o = e(this).data("nestable");
      if (!o) {
        e(this).data("nestable", new i(this, n));
        e(this).data("nestable-id", new Date().getTime())
      } else {
        if (typeof n === "string" && typeof o[n] === "function") {
          m = o[n]()
        }
      }
    });
    return m || l
  }
})(window.jQuery || window.Zepto, window, document);

// jQuery File Tree Plugin
jQuery && function (b) {
  b.extend(b.fn, {
    fileTree: function (a, f) {
      a || (a = {});
      if (a.root == undefined) a.root = "/";
      if (a.script == undefined) a.script = "";
      if (a.folderEvent == undefined) a.folderEvent = "click";
      if (a.expandSpeed == undefined) a.expandSpeed = 500;
      if (a.collapseSpeed == undefined) a.collapseSpeed = 500;
      if (a.expandEasing == undefined) a.expandEasing = null;
      if (a.collapseEasing == undefined) a.collapseEasing = null;
      if (a.multiFolder == undefined) a.multiFolder = true;
      if (a.loadMessage == undefined) a.loadMessage = "Loading...";
      b(this).each(function () {
        function d(c, e) {
          b(c).addClass("wait");
          b(".jqueryFileTree.start").remove();
          b.post(a.script, {
            dir: e
          }, function (g) {
            b(c).find(".start").html("");
            b(c).removeClass("wait").append(g);
            a.root == e ? b(c).find("UL:hidden").show() : b(c).find("UL:hidden").slideDown({
              duration: a.expandSpeed,
              easing: a.expandEasing
            });
            h(c)
          })
        }

        function h(c) {
          b(c).find("LI A").bind(a.folderEvent, function () {
            if (b(this).parent().hasClass("directory"))
              if (b(this).parent().hasClass("collapsed")) {
                if (!a.multiFolder) {
                  b(this).parent().parent().find("UL").slideUp({
                    duration: a.collapseSpeed,
                    easing: a.collapseEasing
                  });
                  b(this).parent().parent().find("LI.directory").removeClass("expanded").addClass("collapsed")
                }
                b(this).parent().find("UL").remove();
                d(b(this).parent(), escape(b(this).attr("rel").match(/.*\//)));
                b(this).parent().removeClass("collapsed").addClass("expanded")
              } else {
                b(this).parent().find("UL").slideUp({
                  duration: a.collapseSpeed,
                  easing: a.collapseEasing
                });
                b(this).parent().removeClass("expanded").addClass("collapsed")
              }
            else f(b(this).attr("rel"));
            return false
          });
          a.folderEvent.toLowerCase != "click" && b(c).find("LI A").bind("click", function () {
            return false
          })
        }
        b(this).html('<ul class="jqueryFileTree start"><li class="wait">' + a.loadMessage + "<li></ul>");
        d(b(this), escape(a.root))
      })
    }
  })
}(jQuery);

/*!
 * screenfull
 * v5.0.0 - 2019-09-09
 * (c) Sindre Sorhus; MIT License
 */

! function () {
  "use strict";
  var u = "undefined" != typeof window && void 0 !== window.document ? window.document : {},
    e = "undefined" != typeof module && module.exports,
    t = function () {
      for (var e, n = [
          ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
          ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
          ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
          ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
          ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
        ], l = 0, r = n.length, t = {}; l < r; l++)
        if ((e = n[l]) && e[1] in u) {
          for (l = 0; l < e.length; l++) t[n[0][l]] = e[l];
          return t
        } return !1
    }(),
    r = {
      change: t.fullscreenchange,
      error: t.fullscreenerror
    },
    n = {
      request: function (r) {
        return new Promise(function (e, n) {
          var l = function () {
            this.off("change", l), e()
          }.bind(this);
          this.on("change", l), r = r || u.documentElement, Promise.resolve(r[t.requestFullscreen]()).catch(n)
        }.bind(this))
      },
      exit: function () {
        return new Promise(function (e, n) {
          if (this.isFullscreen) {
            var l = function () {
              this.off("change", l), e()
            }.bind(this);
            this.on("change", l), Promise.resolve(u[t.exitFullscreen]()).catch(n)
          } else e()
        }.bind(this))
      },
      toggle: function (e) {
        return this.isFullscreen ? this.exit() : this.request(e)
      },
      onchange: function (e) {
        this.on("change", e)
      },
      onerror: function (e) {
        this.on("error", e)
      },
      on: function (e, n) {
        var l = r[e];
        l && u.addEventListener(l, n, !1)
      },
      off: function (e, n) {
        var l = r[e];
        l && u.removeEventListener(l, n, !1)
      },
      raw: t
    };
  t ? (Object.defineProperties(n, {
    isFullscreen: {
      get: function () {
        return Boolean(u[t.fullscreenElement])
      }
    },
    element: {
      enumerable: !0,
      get: function () {
        return u[t.fullscreenElement]
      }
    },
    isEnabled: {
      enumerable: !0,
      get: function () {
        return Boolean(u[t.fullscreenEnabled])
      }
    }
  }), e ? module.exports = n : window.screenfull = n) : e ? module.exports = {
    isEnabled: !1
  } : window.screenfull = {
    isEnabled: !1
  }
}();

/* ========================================================== 
 * 
 * bootstrap-maxlength.js v 1.5.7 
 * Copyright 2014 Maurizio Napoleoni @mimonap
 * Licensed under MIT License
 * URL: https://github.com/mimo84/bootstrap-maxlength/blob/master/LICENSE
 *
 * ========================================================== */

! function (a) {
  "use strict";
  a.event.special.destroyed || (a.event.special.destroyed = {
    remove: function (a) {
      a.handler && a.handler()
    }
  }), a.fn.extend({
    maxlength: function (b, c) {
      function d(a) {
        var c = a.val();
        c = b.twoCharLinebreak ? c.replace(/\r(?!\n)|\n(?!\r)/g, "\r\n") : c.replace(new RegExp("\r?\n", "g"), "\n");
        var d = 0;
        return d = b.utf8 ? f(c) : c.length
      }

      function e(a, c) {
        var d = a.val(),
          e = 0;
        b.twoCharLinebreak && (d = d.replace(/\r(?!\n)|\n(?!\r)/g, "\r\n"), "\n" === d.substr(d.length - 1) && d.length % 2 === 1 && (e = 1)), a.val(d.substr(0, c - e))
      }

      function f(a) {
        for (var b = 0, c = 0; c < a.length; c++) {
          var d = a.charCodeAt(c);
          128 > d ? b++ : b += d > 127 && 2048 > d ? 2 : 3
        }
        return b
      }

      function g(a, c, e) {
        var f = !0;
        return !b.alwaysShow && e - d(a) > c && (f = !1), f
      }

      function h(a, b) {
        var c = b - d(a);
        return c
      }

      function i(a, b) {
        b.css({
          display: "block"
        }), a.trigger("maxlength.shown")
      }

      function j(a, b) {
        b.css({
          display: "none"
        }), a.trigger("maxlength.hidden")
      }

      function k(a, c) {
        var d = "";
        return b.message ? d = b.message.replace("%charsTyped%", c).replace("%charsRemaining%", a - c).replace("%charsTotal%", a) : (b.preText && (d += b.preText), d += b.showCharsTyped ? c : a - c, b.showMaxLength && (d += b.separator + a), b.postText && (d += b.postText)), d
      }

      function l(a, c, d, e) {
        e.html(k(d, d - a)), a > 0 ? g(c, b.threshold, d) ? i(c, e.removeClass(b.limitReachedClass).addClass(b.warningClass)) : j(c, e) : i(c, e.removeClass(b.warningClass).addClass(b.limitReachedClass)), b.allowOverMax && (0 > a ? c.addClass("overmax") : c.removeClass("overmax"))
      }

      function m(b) {
        var c = b[0];
        return a.extend({}, "function" == typeof c.getBoundingClientRect ? c.getBoundingClientRect() : {
          width: c.offsetWidth,
          height: c.offsetHeight
        }, b.offset())
      }

      function n(a, c) {
        var d = m(a),
          e = a.outerWidth(),
          f = c.outerWidth(),
          g = c.width(),
          h = c.height();
        switch (b.appendToParent && (d.top -= a.parent().offset().top, d.left -= a.parent().offset().left), b.placement) {
          case "bottom":
            c.css({
              top: d.top + d.height,
              left: d.left + d.width / 2 - g / 2
            });
            break;
          case "top":
            c.css({
              top: d.top - h,
              left: d.left + d.width / 2 - g / 2
            });
            break;
          case "left":
            c.css({
              top: d.top + d.height / 2 - h / 2,
              left: d.left - g
            });
            break;
          case "right":
            c.css({
              top: d.top + d.height / 2 - h / 2,
              left: d.left + d.width
            });
            break;
          case "bottom-right":
            c.css({
              top: d.top + d.height,
              left: d.left + d.width
            });
            break;
          case "top-right":
            c.css({
              top: d.top - h,
              left: d.left + e
            });
            break;
          case "top-left":
            c.css({
              top: d.top - h,
              left: d.left - f
            });
            break;
          case "bottom-left":
            c.css({
              top: d.top + a.outerHeight(),
              left: d.left - f
            });
            break;
          case "centered-right":
            c.css({
              top: d.top + h / 2,
              left: d.left + e - f - 3
            });
            break;
          case "bottom-right-inside":
            c.css({
              top: d.top + d.height,
              left: d.left + d.width - f
            });
            break;
          case "top-right-inside":
            c.css({
              top: d.top - h,
              left: d.left + e - f
            });
            break;
          case "top-left-inside":
            c.css({
              top: d.top - h,
              left: d.left
            });
            break;
          case "bottom-left-inside":
            c.css({
              top: d.top + a.outerHeight(),
              left: d.left
            })
        }
      }

      function o(a) {
        var c = "maxlength";
        return b.allowOverMax && (c = "data-bs-mxl"), a.attr(c) || a.attr("size")
      }
      var p = a("body"),
        q = {
          showOnReady: !1,
          alwaysShow: !1,
          threshold: 10,
          warningClass: "label label-success",
          limitReachedClass: "label label-important label-danger",
          separator: " / ",
          preText: "",
          postText: "",
          showMaxLength: !0,
          placement: "bottom",
          showCharsTyped: !0,
          validate: !1,
          utf8: !1,
          appendToParent: !1,
          twoCharLinebreak: !0,
          allowOverMax: !1
        };
      return a.isFunction(b) && !c && (c = b, b = {}), b = a.extend(q, b), this.each(function () {
        function c() {
          var c = k(d, "0");
          d = o(g), f || (f = a('<span class="bootstrap-maxlength"></span>').css({
            display: "none",
            position: "absolute",
            whiteSpace: "nowrap",
            zIndex: 1099
          }).html(c)), g.is("textarea") && (g.data("maxlenghtsizex", g.outerWidth()), g.data("maxlenghtsizey", g.outerHeight()), g.mouseup(function () {
            (g.outerWidth() !== g.data("maxlenghtsizex") || g.outerHeight() !== g.data("maxlenghtsizey")) && n(g, f), g.data("maxlenghtsizex", g.outerWidth()), g.data("maxlenghtsizey", g.outerHeight())
          })), b.appendToParent ? (g.parent().append(f), g.parent().css("position", "relative")) : p.append(f);
          var e = h(g, o(g));
          l(e, g, d, f), n(g, f)
        }
        var d, f, g = a(this);
        a(window).resize(function () {
          f && n(g, f)
        }), b.allowOverMax && (a(this).attr("data-bs-mxl", a(this).attr("maxlength")), a(this).removeAttr("maxlength")), b.showOnReady ? g.ready(function () {
          c()
        }) : g.focus(function () {
          c()
        }), g.on("maxlength.reposition", function () {
          n(g, f)
        }), g.on("destroyed", function () {
          f && f.remove()
        }), g.on("blur", function () {
          f && !b.showOnReady && f.remove()
        }), g.on("input", function () {
          var a = o(g),
            c = h(g, a),
            i = !0;
          return b.validate && 0 > c ? (e(g, a), i = !1) : l(c, g, d, f), ("bottom-right-inside" === b.placement || "top-right-inside" === b.placement) && n(g, f), i
        })
      })
    }
  })
}(jQuery);

/* ========================================================== 
 * 
 * sessionTimeout
 *
 * ========================================================== */
"use strict";
! function (a) {
  jQuery.sessionTimeout = function (b) {
    function c() {
      i || (a.ajax({
        type: "POST",
        url: h.keepAliveUrl,
        data: h.ajaxData
      }), i = !0, setTimeout(function () {
        i = !1
      }, h.keepAliveInterval))
    }

    function d() {
      clearTimeout(f), h.keepAlive && c(), f = setTimeout(function () {
        "function" != typeof h.onWarn ? a("#sessionTimeout-dialog").modal("show") : h.onWarn("warn"), e()
      }, h.warnAfter)
    }

    function e() {
      clearTimeout(f), f = setTimeout(function () {
        "function" != typeof h.onRedir ? (e("start"), window.location = h.redirUrl) : h.onRedir()
      }, h.redirAfter - h.warnAfter)
    }
    var f, g = {
        heading: "h5",
        title: 'Session timeout notification',
        message: "Your session is about to expire.",
        keepBtnText: "Stay connected",
        keepBtnClass: "btn btn-primary",
        logoutBtnText: "Logout",
        logoutBtnClass: "btn btn-danger",
        keepAliveUrl: "/keep-alive",
        ajaxData: "",
        redirUrl: "/timed-out",
        logoutUrl: "/log-out",
        warnAfter: 9e5,
        redirAfter: 12e5,
        keepAliveInterval: 5e3,
        keepAlive: !0,
        ignoreUserActivity: !1,
        onWarn: !1,
        onRedir: !1
      },
      h = g;
    if (b && (h = a.extend(g, b)), h.warnAfter >= h.redirAfter) return ("undefined" != typeof console || "undefined" != typeof console.error) && console.error('Bootstrap-session-timeout plugin is miss-configured. Option "redirAfter" must be equal or greater than "warnAfter".'), !1;
    "function" != typeof h.onWarn && (a("body").append('<div class="modal fade" id="sessionTimeout-dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><' + h.heading + ' class="modal-title">' + h.title + '</' + h.message + '></div><div class="modal-body">' + h.message + '</div><div class="modal-footer"><button id="sessionTimeout-dialog-keepalive" type="button" class="' + h.keepBtnClass + '" data-dismiss="modal">' + h.keepBtnText + '</button><button id="sessionTimeout-dialog-logout" type="button" class="' + h.logoutBtnClass + '">' + h.logoutBtnText + '</button></div></div></div></div>'), a("#sessionTimeout-dialog-logout").on("click", function () {
      window.location = h.logoutUrl
    }), a("#sessionTimeout-dialog").on("hide.bs.modal", function () {
      d()
    })), h.ignoreUserActivity || a(document).on("keyup mouseup mousemove touchend touchmove", function () {
      d()
    });
    var i = !1;
    d()
  }
}(jQuery);


var dle_theme = '';

function reload() {

  var rndval = new Date().getTime();

  document.getElementById('dle-captcha').innerHTML = '<img src="engine/modules/antibot/antibot.php?rndval=' + rndval + '" style="width: 130px;height: 46px;" alt="" />';

};

function Help(section) {

  if (section == "social") {

    var w = 800;

  } else {

    var w = 570;
  }

  ShowLoading('');

  $.get("?mod=help&section=", {
    section: section
  }, function (data) {

    HideLoading('');

    $("#panel-help-section").remove();

    $("body").append(data);

    $('#panel-help-section').dialog({
      autoOpen: true,
      width: w,
      height: 550,
      resizable: false,
      buttons: {
        "OK": function () {
          $(this).dialog("close");
          $("#panel-help-section").remove();
        }
      }
    });

  });

  return false;


}

function ShowOrHide(d1, d2) {
  if (d2) {

    DoDiv(d1);
    DoDiv(d2);

  } else {

    var item = $("#" + d1);
    if (item.is(":hidden")) {
      item.show('blind', {}, 1000);
    } else {
      item.hide('blind', {}, 1000);
    }

  }
}

function DoDiv(id) {

  if ($("#" + id).is(":hidden")) {

    $("#" + id).show(1);

  } else {

    $("#" + id).hide(1);
  }
}

function ShowLoading(message) {

  if (message) {
    $("#loading-layer").html(message);
  }

  var setX = ($(window).width() - $("#loading-layer").width()) / 2;
  var setY = ($(window).height() - $("#loading-layer").height()) / 2;

  $("#loading-layer").css({
    left: setX + "px",
    top: setY + "px",
    position: 'fixed',
    zIndex: '2099'
  });

  $("#loading-layer").fadeTo('slow', 1.0);

};

function HideLoading(message) {
  $("#loading-layer").fadeOut('slow');
};

function DLEalert(message, title) {

  $("#dlepopup").remove();

  $("body").append("<div id='dlepopup' class='dle-alert' title='" + title + "' style='display:none'>" + message + "</div>");

  $('#dlepopup').dialog({
    autoOpen: true,
    width: 500,
    minHeight: 160,
    resizable: false,
    buttons: {
      "Ok": function () {
        $(this).dialog("close");
        $("#dlepopup").remove();
      }
    }
  });
};

function DLEconfirm(message, title, callback) {

  var b = {};

  b[dle_act_lang[1]] = function () {
    $(this).dialog("close");
    $("#dlepopup").remove();
  };

  b[dle_act_lang[0]] = function () {
    $(this).dialog("close");
    $("#dlepopup").remove();
    if (callback) callback();
  };

  $("#dlepopup").remove();

  $("body").append("<div id='dlepopup' class='dle-confirm' title='" + title + "' style='display:none'>" + message + "</div>");

  $('#dlepopup').dialog({
    autoOpen: true,
    width: 500,
    minHeight: 160,
    resizable: false,
    buttons: b
  });
};

function DLEprompt(message, d, title, callback, allowempty) {

  var b = {};

  b[dle_act_lang[3]] = function () {
    $(this).dialog("close");
  };

  b[dle_act_lang[2]] = function () {
    if (!allowempty && $("#dle-promt-text").val().length < 1) {
      $("#dle-promt-text").addClass('ui-state-error');
    } else {
      var response = $("#dle-promt-text").val()
      $(this).dialog("close");
      $("#dlepopup").remove();
      if (callback) callback(response);
    }
  };

  $("#dlepopup").remove();

  $("body").append("<div id='dlepopup' class='dle-promt' title='" + title + "' style='display:none'>" + message + "<br /><br /><input type='text' name='dle-promt-text' id='dle-promt-text' class='classic' style='width:100%;' value=\"" + d + "\"/></div>");

  $('#dlepopup').dialog({
    autoOpen: true,
    width: 500,
    resizable: false,
    buttons: b
  });

  if (d.length > 0) {
    $("#dle-promt-text").select().focus();
  } else {
    $("#dle-promt-text").focus();
  }
};

function media_upload(area, author, news_id, wysiwyg) {

  var shadow = 'none';

  $('#mediaupload').remove();
  $('body').append("<div id='mediaupload' title='" + dle_act_lang[4] + "' style='display:none'></div>");

  $('#mediaupload').dialog({
    autoOpen: true,
    width: 710,
    resizable: false,
    dialogClass: "modalfixed",
    open: function (event, ui) {
      $("#mediaupload").html("<iframe name='mediauploadframe' id='mediauploadframe' width='100%' height='580' src='engine/ajax/controller.php?mod=upload&area=" + area + "&author=" + author + "&news_id=" + news_id + "&wysiwyg=" + wysiwyg + "&dle_theme=" + dle_theme + "' frameborder='0' marginwidth='0' marginheight='0' allowtransparency='true'></iframe>");
      $(".ui-dialog").draggable("option", "containment", "");
    },
    dragStart: function (event, ui) {
      shadow = $(".modalfixed").css('box-shadow');
      $(".modalfixed").fadeTo(0, 0.7).css('box-shadow', 'none');
      $("#mediaupload").css('visibility', 'hidden');
    },
    dragStop: function (event, ui) {
      $(".modalfixed").fadeTo(0, 1).css('box-shadow', shadow);
      $("#mediaupload").css('visibility', 'visible');
    },
    beforeClose: function (event, ui) {
      $("#mediaupload").html("");
    }
  });

  if ($(window).width() > 830 && $(window).height() > 530) {
    $('.modalfixed.ui-dialog').css({
      position: "fixed"
    });
    $('#mediaupload').dialog("option", "position", {
      my: "center",
      at: "center",
      of: window
    });
  }

  return false;

};

(function () {

  this.Growl = (function () {

    function Growl() {}

    Growl.info = function (options) {
      return $.jGrowl(options.text, {
        header: options.title,
        life: 5000,
        theme: 'alert-styled-left alert-styled-custom alpha-teal text-teal-900'
      });
    };

    Growl.error = function (options) {
      return $.jGrowl(options.text, {
        header: options.title,
        life: 5000,
        theme: 'alert-bordered alert-styled-left alert-danger'
      });
    };

    return Growl;

  })();

}).call(this);

var dle_save_delay = false;

$(function () {

  function containerHeight() {

    try {

      if ($('#addnews').width()) {

        if ($('#addnews').width() < 1250) {
          $('.editor-group label').removeClass('col-md-2').addClass('col-md-12');
          $('.editor-group label + div').removeClass('col-md-10').addClass('col-md-12');
        } else {
          $('.editor-group label').removeClass('col-md-12').addClass('col-md-2');
          $('.editor-group label + div').removeClass('col-md-12').addClass('col-md-10');
        }

      }

      var availableHeight = $(window).height() - $('.page-container').offset().top - $('.navbar-fixed-bottom').outerHeight();

      $('.page-container').attr('style', 'min-height:' + availableHeight + 'px');

    } catch (e) {
      return null;
    }

  }

  function themesave() {

    clearInterval(dle_save_delay);

    dle_save_delay = setInterval(function () {
      do_themesave()
    }, 300);
  }

  function do_themesave() {
    clearInterval(dle_save_delay);

    $.get("engine/ajax/controller.php?mod=adminfunction&action=savetheme&user_hash=" + dle_login_hash, {
      theme: $('body').attr('class')
    }, function (data) {

      if (data.error) {
        DLEalert(data.error, 'info');
      }

    }, "json");


  }

  function get_storage(key) {

    if ($body_class) return null;

    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function set_storage(key, value) {

    try {
      themesave();
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  function del_storage(key, value) {
    try {
      themesave();
      localStorage.removeItem(key);
    } catch (e) {}
  }

  $(".btn:not(.disabled):not(.multiselect.btn-default):not(.bootstrap-select .btn-default):not(.file-drag-handle), .navigation li:not(.disabled) a, .nav > li:not(.disabled) > a, .sidebar-user-material-menu > a, .sidebar-user-material-content > a, .select2-selection--single[class*=bg-], .breadcrumb-elements > li:not(.disabled) > a, .wizard > .actions a, .ui-button:not(.ui-dialog-titlebar-close), .ui-tabs-anchor:not(.ui-state-disabled), .plupload_button:not(.plupload_disabled), .fc-button, .pagination > li:not(.disabled) > a, .pagination > li:not(.disabled) > span, .pager > li:not(.disabled) > a, .pager > li:not(.disabled) > span").ripple({
    dragging: false,
    adaptPos: false,
    scaleMode: false
  });

  $('.sidebar-xs .sidebar-main .navigation > li > a').ripple({
    unbind: true
  });

  $(document).on('click', '.sidebar-control', function () {
    if ($('body').hasClass('sidebar-xs')) {
      $('.sidebar-main .navigation > li > a').ripple({
        unbind: true
      });
    } else {
      $('.sidebar-main .navigation > li > a').ripple({
        unbind: false
      });
    }
  });


  $('.panel-footer').has('> .heading-elements:not(.not-collapsible)').prepend('<a class="heading-elements-toggle"><i class="fa fa-sort"></i></a>');
  $('.page-title, .panel-title').parent().has('> .heading-elements:not(.not-collapsible)').children('.page-title, .panel-title').append('<a class="heading-elements-toggle"><i class="fa fa-sort"></i></a>');

  $('.page-title .heading-elements-toggle, .panel-title .heading-elements-toggle').on('click', function () {
    $(this).parent().parent().toggleClass('has-visible-elements').children('.heading-elements').toggleClass('visible-elements');
  });
  $('.panel-footer .heading-elements-toggle').on('click', function () {
    $(this).parent().toggleClass('has-visible-elements').children('.heading-elements').toggleClass('visible-elements');
  });

  $('.breadcrumb-line').has('.breadcrumb-elements').prepend('<a class="breadcrumb-elements-toggle"><i class="fa fa-sort"></i></a>');

  $('.breadcrumb-elements-toggle').on('click', function () {
    $(this).parent().children('.breadcrumb-elements').toggleClass('visible-elements');
  });

  $('.navigation').find('li.active').parents('li').addClass('curmod');

  $('.dropdown-menu:not(.dropdown-content), .dropdown-menu:not(.dropdown-content) .dropdown-submenu').has('li.active').addClass('active').parents('.navbar-nav .dropdown:not(.language-switch), .navbar-nav .dropup:not(.language-switch)').addClass('active');


  $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
    e.preventDefault();

    $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

    if ($('.navigation-main').hasClass('navigation-accordion')) {
      $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
    }

  });

  $('.sidebar-mobile-main-toggle').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('sidebar-mobile-main');
  });

  $(window).on('resize', function () {
    setTimeout(function () {
      containerHeight();

      if ($(window).width() <= 768) {

        $('body').addClass('sidebar-xs-indicator');

        $('.dropdown-submenu').on('mouseenter', function () {
          $(this).children('.dropdown-menu').addClass('show');
        }).on('mouseleave', function () {
          $(this).children('.dropdown-menu').removeClass('show');
        });
      } else {

        $('body').removeClass('sidebar-xs-indicator');

        $('body').removeClass('sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-detached sidebar-mobile-opposite');

        $('.page-header-content, .panel-heading, .panel-footer').removeClass('has-visible-elements');
        $('.heading-elements').removeClass('visible-elements');

        $('.dropdown-submenu').children('.dropdown-menu').removeClass('show');
      }
    }, 100);
  }).resize();


  $('#full_screen_toggle').on('click', function (e) {
    e.preventDefault();

    if (screenfull.isEnabled) {
      screenfull.toggle();
    }

    var $this = $(this);

    if ($this.children('i').hasClass('fa-expand')) {
      $this.children('i').removeClass('fa-expand');
      $this.children('i').addClass('fa-compress');
    } else if ($this.children('i').hasClass('fa-compress')) {
      $this.children('i').removeClass('fa-compress');
      $this.children('i').addClass('fa-expand');
    }

    containerHeight();
  })

  $(".panel-fullscreen").on('click', function (e) {
    e.preventDefault();

    var $this = $(this);

    if ($this.children('i').hasClass('fa-expand')) {
      $this.children('i').removeClass('fa-expand');
      $this.children('i').addClass('fa-compress');
    } else if ($this.children('i').hasClass('fa-compress')) {
      $this.children('i').removeClass('fa-compress');
      $this.children('i').addClass('fa-expand');
    }

    $(this).closest('.panel').toggleClass('panel-to-fullscreen');

    containerHeight();

  });

  $("#style_switcher_toggle").on('click', function (e) {
    e.preventDefault();

    $('#style_switcher').dialog({
      autoOpen: true,
      width: 350,
      resizable: false,
      buttons: {
        "Ok": function () {
          $(this).dialog("close");
        }
      }
    });
  });

  $('.sidebar-main-toggle').on('click', function (e) {
    e.preventDefault();

    $('body').toggleClass('sidebar-xs');

    if ($body.hasClass('sidebar-xs')) {
      $('#style_sidebar_mini').prop('checked', true);
      set_storage("dle_sidebar_mini", '1');
    } else {
      $('#style_sidebar_mini').prop('checked', false);
      del_storage('dle_sidebar_mini');
    }

    $.uniform.update('#style_sidebar_mini');
    containerHeight();

  });

  var $switcher = $('#style_switcher'),
    $theme_switcher = $('#theme_switcher'),
    $mini_sidebar_toggle = $('#style_sidebar_mini'),
    $boxed_layout_toggle = $('#style_layout_boxed'),
    $input_style_toggle = $('input:radio[name=style_input]'),
    $auto_dark_theme_toggle = $('#auto_dark_theme'),
    $body = $('body'),
    $body_class = $body.attr('class');

  $theme_switcher.children('li').click(function (e) {
    e.preventDefault();
    var $this = $(this);

    dle_theme = $this.attr('data-app-theme');

    $theme_switcher.children('li').removeClass('active_theme');
    $(this).addClass('active_theme');
    $body.removeClass('dle_theme_a dle_theme_b dle_theme_c dle_theme_d dle_theme_e dle_theme_f dle_theme_g dle_theme_h dle_theme_i saved_dle_theme_a saved_dle_theme_b saved_dle_theme_c saved_dle_theme_d saved_dle_theme_e saved_dle_theme_f saved_dle_theme_g saved_dle_theme_h saved_dle_theme_i dle_theme_dark').addClass(dle_theme);

    if (dle_theme == '') {
      del_storage('dle_theme');
    } else {
      set_storage("dle_theme", dle_theme);
    }

    if (dle_theme == 'dle_theme_dark') {
      $('.sidebar').removeClass('sidebar-default');
    } else {
      $('.sidebar').addClass('sidebar-default');
    }

  });

  if ((get_storage("auto_dark_theme") !== null && get_storage("auto_dark_theme") == '1') || $body.hasClass('auto_dark_theme')) {
    $auto_dark_theme_toggle.prop('checked', true);

    if (!$body.hasClass('auto_dark_theme')) {
      $('body').addClass('auto_dark_theme');
    }
  }

  if ((get_storage("dle_sidebar_mini") !== null && get_storage("dle_sidebar_mini") == '1') || $body.hasClass('sidebar-xs')) {
    $mini_sidebar_toggle.prop('checked', true);

    if (!$body.hasClass('sidebar-xs')) {
      $('body').addClass('sidebar-xs');
    }
  }

  if ((get_storage("dle_layout_boxed") !== null && get_storage("dle_layout_boxed") == '1') || $body.hasClass('layout-boxed')) {
    $boxed_layout_toggle.prop('checked', true);

    if (!$body.hasClass('layout-boxed')) {
      $('body').addClass('layout-boxed');
    }
  }

  if ((get_storage("dle_input_style") !== null && get_storage("dle_input_style") == '1') || $body.hasClass('input-classic')) {
    $input_style_toggle.filter('[value=1]').prop('checked', true);

    if (!$body.hasClass('input-classic')) {
      $('body').addClass('input-classic');
    }
  } else {
    $input_style_toggle.filter('[value=0]').prop('checked', true);
  }

  if ($body.hasClass('dle_theme_a') || $body.hasClass('saved_dle_theme_a')) {
    $('li[data-app-theme=dle_theme_a]').addClass('active_theme');
  } else if ($body.hasClass('dle_theme_b') || $body.hasClass('saved_dle_theme_b')) {
    $('li[data-app-theme=dle_theme_b]').addClass('active_theme');
  } else if ($body.hasClass('dle_theme_c') || $body.hasClass('saved_dle_theme_c')) {
    $('li[data-app-theme=dle_theme_c]').addClass('active_theme');
  } else if ($body.hasClass('dle_theme_d') || $body.hasClass('saved_dle_theme_d')) {
    $('li[data-app-theme=dle_theme_d]').addClass('active_theme');
  } else if ($body.hasClass('dle_theme_e') || $body.hasClass('saved_dle_theme_e')) {
    $('li[data-app-theme=dle_theme_e]').addClass('active_theme');
  } else if ($body.hasClass('dle_theme_f') || $body.hasClass('saved_dle_theme_f')) {
    $('li[data-app-theme=dle_theme_f]').addClass('active_theme');
  } else if ($body.hasClass('dle_theme_g') || $body.hasClass('saved_dle_theme_g')) {
    $('li[data-app-theme=dle_theme_g]').addClass('active_theme');
  } else if ($body.hasClass('dle_theme_h') || $body.hasClass('saved_dle_theme_h')) {
    $('li[data-app-theme=dle_theme_h]').addClass('active_theme');
  } else if ($body.hasClass('dle_theme_i') || $body.hasClass('saved_dle_theme_i')) {
    $('li[data-app-theme=dle_theme_i]').addClass('active_theme');
  } else if ($body.hasClass('dle_theme_dark')) {

    if (!$body.hasClass('auto_night_mode')) {
      $('li[data-app-theme=dle_theme_dark]').addClass('active_theme');
    } else {
      $('.app_style_default').addClass('active_theme');
    }

    dle_theme = 'dle_theme_dark';

  } else {

    dle_theme = get_storage("dle_theme");

    if (dle_theme !== null) {

      $theme_switcher.children('li[data-app-theme=' + dle_theme + ']').click();

    } else {
      $('.app_style_default').addClass('active_theme');
    }
  }

  $input_style_toggle.on('change', function () {

    if ($(this).val() == '1') {
      set_storage("dle_input_style", '1');
      $body.addClass('input-classic');
      containerHeight();
    } else {
      del_storage('dle_input_style');
      $body.removeClass('input-classic');
      containerHeight();
    }
  });


  $auto_dark_theme_toggle.on('change', function () {
    if ($(this).is(':checked')) {

      var night_time = {
        '0': {
          'from': 16.2,
          'to': 8.4
        },
        '1': {
          'from': 17.3,
          'to': 7.5
        },
        '2': {
          'from': 18.3,
          'to': 6.4
        },
        '3': {
          'from': 19.3,
          'to': 5.3
        },
        '4': {
          'from': 20.3,
          'to': 4.2
        },
        '5': {
          'from': 21.2,
          'to': 3.5
        },
        '6': {
          'from': 21,
          'to': 4
        },
        '7': {
          'from': 20,
          'to': 5
        },
        '8': {
          'from': 18.5,
          'to': 6
        },
        '9': {
          'from': 17.3,
          'to': 7
        },
        '10': {
          'from': 16.2,
          'to': 8
        },
        '11': {
          'from': 16,
          'to': 8.5
        }
      };

      var date = new Date();

      var m = date.getMonth();
      var minutes = date.getMinutes();

      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      var h = parseFloat(date.getHours() + '.' + minutes);

      if (h >= night_time[m].from || h <= night_time[m].to) {

        $('.sidebar').removeClass('sidebar-default');
        document.body.className = document.body.className.replace(/dle_theme_/g, 'saved_dle_theme_');
        $body.addClass('dle_theme_dark');
        $body.addClass('auto_night_mode');

      }

      set_storage("auto_dark_theme", '1');
      $body.addClass('auto_dark_theme');

      containerHeight();
    } else {

      if ($body.hasClass('auto_night_mode')) {
        $('.sidebar').removeClass('sidebar-default');
        $('.sidebar').addClass('sidebar-default');
        $body.removeClass('dle_theme_dark');
        $body.removeClass('auto_night_mode');
        document.body.className = document.body.className.replace(/saved_dle_theme_/g, 'dle_theme_');
      }

      $body.removeClass('auto_dark_theme');
      del_storage('auto_dark_theme');
      containerHeight();
    }

  });


  $mini_sidebar_toggle.on('change', function () {
    if ($(this).is(':checked')) {
      set_storage("dle_sidebar_mini", '1');
      $body.addClass('sidebar-xs');
      containerHeight();
    } else {
      del_storage('dle_sidebar_mini');
      $body.removeClass('sidebar-xs');
      containerHeight();
    }

  });

  $boxed_layout_toggle.on('change', function () {
    if ($(this).is(':checked')) {
      set_storage("dle_layout_boxed", '1');
      $body.addClass('layout-boxed');
      containerHeight();
    } else {
      del_storage('dle_layout_boxed');
      $body.removeClass('layout-boxed');
      containerHeight();
    }
  });

  containerHeight();

  $(".icheck").uniform({
    radioClass: 'choice',
    wrapperClass: 'border-teal-600 text-teal-800',
    fileDefaultHtml: filedefaulttext,
    fileButtonHtml: filebtntext,
    fileButtonClass: 'btn bg-teal btn-sm btn-raised'
  });

  $.fn.selectpicker.defaults = {
    iconBase: '',
    tickIcon: 'fa fa-check'
  }

  $('select.uniform').selectpicker();

  var switches = Array.prototype.slice.call(document.querySelectorAll('.switch'));
  switches.forEach(function (html) {
    var switchery = new Switchery(html, {
      color: '#4CAF50'
    });
  });

  $('[data-popup="popover"], [data-rel=popover]').popover({
    container: 'body'
  });

  $('[data-popup="tooltip"]').tooltip();

  $('.navigation-main > .navigation-header > i').tooltip({
    placement: 'right',
    container: 'body'
  });

  $('[rel=tooltip], .tip').tooltip({
    container: 'body',
    html: true
  });

  $('.tags').tokenfield({
    createTokensOnBlur: true
  });

  $('[data-rel=calendar]').datetimepicker({
    format: 'Y-m-d H:i:s',
    step: 30,
    closeOnDateSelect: true,
    dayOfWeekStart: 1,
    scrollMonth: false,
    scrollInput: false,
    i18n: cal_language
  });

  $('[data-rel=calendardate]').datetimepicker({
    format: 'Y-m-d',
    closeOnDateSelect: true,
    dayOfWeekStart: 1,
    timepicker: false,
    scrollInput: false,
    scrollMonth: false,
    i18n: cal_language
  });

  $('[data-rel=calendartime]').datetimepicker({
    format: 'H:i',
    closeOnDateSelect: true,
    datepicker: false,
    dayOfWeekStart: 1,
    scrollInput: false,
    scrollMonth: false,
    i18n: cal_language
  });

  $('[data-rel=calendardatetime]').datetimepicker({
    format: 'Y-m-d H:i',
    step: 30,
    closeOnDateSelect: true,
    dayOfWeekStart: 1,
    scrollMonth: false,
    scrollInput: false,
    i18n: cal_language
  });

  $('input[maxlength]').maxlength({
    alwaysShow: true,
    placement: 'bottom-right',
    warningClass: "text-success",
    limitReachedClass: "text-danger",
    validate: true
  });

  $(document).on("shown.bs.dropdown", ".btn-group", function () {

    var $ul = $(this).children(".dropdown-menu");
    var $button = $(this).children(".dropdown-toggle");
    var ulOffset = $ul.offset();

    var spaceUp = (ulOffset.top - $button.height() - $ul.height()) - $(window).scrollTop();

    var spaceDown = $(window).scrollTop() + $(window).height() - (ulOffset.top + $ul.height());

    if (spaceDown < 20 && (spaceUp >= 20 || spaceUp > spaceDown)) {
      $(this).addClass("dropup");
    }

  }).on("hidden.bs.dropdown", ".btn-group", function () {

    $(this).removeClass("dropup");
  });

});
