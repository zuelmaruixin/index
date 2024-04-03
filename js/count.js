!
function(a, n) {
    "function" == typeof define && define.amd ? define(n) : "object" == typeof exports ? module.exports = n(require, exports, module) : a.CountUp = n()
} (this,
function(a, n, t) {
    var e = function(a, n, t, e, i, r) {
        function o(a) {
            a = a.toFixed(l.decimals),
            a += "";
            var n, t, e, i, r, o;
            if (n = a.split("."), t = n[0], e = n.length > 1 ? l.options.decimal + n[1] : "", l.options.useGrouping) {
                for (i = "", r = 0, o = t.length; r < o; ++r) 0 !== r && r % 3 === 0 && (i = l.options.separator + i),
                i = t[o - r - 1] + i;
                t = i
            }
            return l.options.numerals.length && (t = t.replace(/[0-9]/g,
            function(a) {
                return l.options.numerals[ + a]
            }), e = e.replace(/[0-9]/g,
            function(a) {
                return l.options.numerals[ + a]
            })),
            l.options.prefix + t + e + l.options.suffix
        }
        function u(a, n, t, e) {
            return t * ( - Math.pow(2, -10 * a / e) + 1) * 1024 / 1023 + n
        }
        function s(a) {
            return "number" == typeof a && !isNaN(a)
        }
        var l = this;
        if (l.version = function() {
            return "1.9.2"
        },
        l.options = {
            useEasing: !0,
            useGrouping: !0,
            separator: ",",
            decimal: ".",
            easingFn: u,
            formattingFn: o,
            prefix: "",
            suffix: "",
            numerals: []
        },
        r && "object" == typeof r) for (var m in l.options) r.hasOwnProperty(m) && null !== r[m] && (l.options[m] = r[m]);
        "" === l.options.separator ? l.options.useGrouping = !1 : l.options.separator = "" + l.options.separator;
        for (var d = 0,
        c = ["webkit", "moz", "ms", "o"], f = 0; f < c.length && !window.requestAnimationFrame; ++f) window.requestAnimationFrame = window[c[f] + "RequestAnimationFrame"],
        window.cancelAnimationFrame = window[c[f] + "CancelAnimationFrame"] || window[c[f] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(a, n) {
            var t = (new Date).getTime(),
            e = Math.max(0, 16 - (t - d)),
            i = window.setTimeout(function() {
                a(t + e)
            },
            e);
            return d = t + e,
            i
        }),
        window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        }),
        l.initialize = function() {
            return !! l.initialized || (l.error = "", l.d = "string" == typeof a ? document.getElementById(a) : a, l.d ? (l.startVal = Number(n), l.endVal = Number(t), s(l.startVal) && s(l.endVal) ? (l.decimals = Math.max(0, e || 0), l.dec = Math.pow(10, l.decimals), l.duration = 1e3 * Number(i) || 2e3, l.countDown = l.startVal > l.endVal, l.frameVal = l.startVal, l.initialized = !0, !0) : (l.error = "[CountUp] startVal (" + n + ") or endVal (" + t + ") is not a number", !1)) : (l.error = "[CountUp] target is null or undefined", !1))
        },
        l.printValue = function(a) {
            var n = l.options.formattingFn(a);
            "INPUT" === l.d.tagName ? this.d.value = n: "text" === l.d.tagName || "tspan" === l.d.tagName ? this.d.textContent = n: this.d.innerHTML = n
        },
        l.count = function(a) {
            l.startTime || (l.startTime = a),
            l.timestamp = a;
            var n = a - l.startTime;
            l.remaining = l.duration - n,
            l.options.useEasing ? l.countDown ? l.frameVal = l.startVal - l.options.easingFn(n, 0, l.startVal - l.endVal, l.duration) : l.frameVal = l.options.easingFn(n, l.startVal, l.endVal - l.startVal, l.duration) : l.countDown ? l.frameVal = l.startVal - (l.startVal - l.endVal) * (n / l.duration) : l.frameVal = l.startVal + (l.endVal - l.startVal) * (n / l.duration),
            l.countDown ? l.frameVal = l.frameVal < l.endVal ? l.endVal: l.frameVal: l.frameVal = l.frameVal > l.endVal ? l.endVal: l.frameVal,
            l.frameVal = Math.round(l.frameVal * l.dec) / l.dec,
            l.printValue(l.frameVal),
            n < l.duration ? l.rAF = requestAnimationFrame(l.count) : l.callback && l.callback()
        },
        l.start = function(a) {
            l.initialize() && (l.callback = a, l.rAF = requestAnimationFrame(l.count))
        },
        l.pauseResume = function() {
            l.paused ? (l.paused = !1, delete l.startTime, l.duration = l.remaining, l.startVal = l.frameVal, requestAnimationFrame(l.count)) : (l.paused = !0, cancelAnimationFrame(l.rAF))
        },
        l.reset = function() {
            l.paused = !1,
            delete l.startTime,
            l.initialized = !1,
            l.initialize() && (cancelAnimationFrame(l.rAF), l.printValue(l.startVal))
        },
        l.update = function(a) {
            if (l.initialize()) {
                if (a = Number(a), !s(a)) return void(l.error = "[CountUp] update() - new endVal is not a number: " + a);
                l.error = "",
                a !== l.frameVal && (cancelAnimationFrame(l.rAF), l.paused = !1, delete l.startTime, l.startVal = l.frameVal, l.endVal = a, l.countDown = l.startVal > l.endVal, l.rAF = requestAnimationFrame(l.count))
            }
        },
        l.initialize() && l.printValue(l.startVal)
    };
    return e
});