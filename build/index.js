!(function () {
	"use strict";
	var e,
		r = {
			227: function () {
				var e = window.wp.blocks,
					r = window.wp.element,
					o = window.wp.i18n,
					t = window.wp.blockEditor,
					n = JSON.parse('{"u2":"create-block/related-posts-slider-block"}');
				(0, e.registerBlockType)(n.u2, {
					edit: function () {
						return (0, r.createElement)(
							"p",
							(0, t.useBlockProps)(),
							(0, o.__)(
								"Related Posts Slider Block – hello from the editor!",
								"related-posts-slider-block"
							)
						);
					},
				});
			},
		},
		o = {};
	function t(e) {
		var n = o[e];
		if (void 0 !== n) return n.exports;
		var i = (o[e] = { exports: {} });
		return r[e](i, i.exports, t), i.exports;
	}
	(t.m = r),
		(e = []),
		(t.O = function (r, o, n, i) {
			if (!o) {
				var l = 1 / 0;
				for (a = 0; a < e.length; a++) {
					(o = e[a][0]), (n = e[a][1]), (i = e[a][2]);
					for (var s = !0, c = 0; c < o.length; c++)
						(!1 & i || l >= i) &&
						Object.keys(t.O).every(function (e) {
							return t.O[e](o[c]);
						})
							? o.splice(c--, 1)
							: ((s = !1), i < l && (l = i));
					if (s) {
						e.splice(a--, 1);
						var u = n();
						void 0 !== u && (r = u);
					}
				}
				return r;
			}
			i = i || 0;
			for (var a = e.length; a > 0 && e[a - 1][2] > i; a--) e[a] = e[a - 1];
			e[a] = [o, n, i];
		}),
		(t.o = function (e, r) {
			return Object.prototype.hasOwnProperty.call(e, r);
		}),
		(function () {
			var e = { 826: 0, 431: 0 };
			t.O.j = function (r) {
				return 0 === e[r];
			};
			var r = function (r, o) {
					var n,
						i,
						l = o[0],
						s = o[1],
						c = o[2],
						u = 0;
					if (
						l.some(function (r) {
							return 0 !== e[r];
						})
					) {
						for (n in s) t.o(s, n) && (t.m[n] = s[n]);
						if (c) var a = c(t);
					}
					for (r && r(o); u < l.length; u++)
						(i = l[u]), t.o(e, i) && e[i] && e[i][0](), (e[i] = 0);
					return t.O(a);
				},
				o = (self.webpackChunkrelated_posts_slider_block =
					self.webpackChunkrelated_posts_slider_block || []);
			o.forEach(r.bind(null, 0)), (o.push = r.bind(null, o.push.bind(o)));
		})();
	var n = t.O(void 0, [431], function () {
		return t(227);
	});
	n = t.O(n);
})();
