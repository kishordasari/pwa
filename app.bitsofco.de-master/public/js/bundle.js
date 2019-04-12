"use strict";
! function (t) {
	function e(t) {
		if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
		return t.toLowerCase()
	}

	function n(t) {
		return "string" != typeof t && (t = String(t)), t
	}

	function i(t) {
		var e = {
			next: function () {
				var e = t.shift();
				return {
					done: void 0 === e,
					value: e
				}
			}
		};
		return m.iterable && (e[Symbol.iterator] = function () {
			return e
		}), e
	}

	function s(t) {
		this.map = {}, t instanceof s ? t.forEach(function (t, e) {
			this.append(e, t)
		}, this) : t && Object.getOwnPropertyNames(t).forEach(function (e) {
			this.append(e, t[e])
		}, this)
	}

	function r(t) {
		return t.bodyUsed ? Promise.reject(new TypeError("Already read")) : void(t.bodyUsed = !0)
	}

	function o(t) {
		return new Promise(function (e, n) {
			t.onload = function () {
				e(t.result)
			}, t.onerror = function () {
				n(t.error)
			}
		})
	}

	function a(t) {
		var e = new FileReader;
		return e.readAsArrayBuffer(t), o(e)
	}

	function h(t) {
		var e = new FileReader;
		return e.readAsText(t), o(e)
	}

	function u() {
		return this.bodyUsed = !1, this._initBody = function (t) {
			if (this._bodyInit = t, "string" == typeof t) this._bodyText = t;
			else if (m.blob && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t;
			else if (m.formData && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
			else if (m.searchParams && URLSearchParams.prototype.isPrototypeOf(t)) this._bodyText = t.toString();
			else if (t) {
				if (!m.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t)) throw new Error("unsupported BodyInit type")
			} else this._bodyText = "";
			this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : m.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
		}, m.blob ? (this.blob = function () {
			var t = r(this);
			if (t) return t;
			if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
			if (this._bodyFormData) throw new Error("could not read FormData body as blob");
			return Promise.resolve(new Blob([this._bodyText]))
		}, this.arrayBuffer = function () {
			return this.blob().then(a)
		}, this.text = function () {
			var t = r(this);
			if (t) return t;
			if (this._bodyBlob) return h(this._bodyBlob);
			if (this._bodyFormData) throw new Error("could not read FormData body as text");
			return Promise.resolve(this._bodyText)
		}) : this.text = function () {
			var t = r(this);
			return t ? t : Promise.resolve(this._bodyText)
		}, m.formData && (this.formData = function () {
			return this.text().then(d)
		}), this.json = function () {
			return this.text().then(JSON.parse)
		}, this
	}

	function l(t) {
		var e = t.toUpperCase();
		return y.indexOf(e) > -1 ? e : t
	}

	function c(t, e) {
		e = e || {};
		var n = e.body;
		if (c.prototype.isPrototypeOf(t)) {
			if (t.bodyUsed) throw new TypeError("Already read");
			this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new s(t.headers)), this.method = t.method, this.mode = t.mode, n || (n = t._bodyInit, t.bodyUsed = !0)
		} else this.url = t;
		if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new s(e.headers)), this.method = l(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
		this._initBody(n)
	}

	function d(t) {
		var e = new FormData;
		return t.trim().split("&").forEach(function (t) {
			if (t) {
				var n = t.split("="),
					i = n.shift().replace(/\+/g, " "),
					s = n.join("=").replace(/\+/g, " ");
				e.append(decodeURIComponent(i), decodeURIComponent(s))
			}
		}), e
	}

	function p(t) {
		var e = new s,
			n = (t.getAllResponseHeaders() || "").trim().split("\n");
		return n.forEach(function (t) {
			var n = t.trim().split(":"),
				i = n.shift().trim(),
				s = n.join(":").trim();
			e.append(i, s)
		}), e
	}

	function f(t, e) {
		e || (e = {}), this.type = "default", this.status = e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = e.statusText, this.headers = e.headers instanceof s ? e.headers : new s(e.headers), this.url = e.url || "", this._initBody(t)
	}
	if (!t.fetch) {
		var m = {
			searchParams: "URLSearchParams" in t,
			iterable: "Symbol" in t && "iterator" in Symbol,
			blob: "FileReader" in t && "Blob" in t && function () {
				try {
					return new Blob, !0
				} catch (t) {
					return !1
				}
			}(),
			formData: "FormData" in t,
			arrayBuffer: "ArrayBuffer" in t
		};
		s.prototype.append = function (t, i) {
			t = e(t), i = n(i);
			var s = this.map[t];
			s || (s = [], this.map[t] = s), s.push(i)
		}, s.prototype.delete = function (t) {
			delete this.map[e(t)]
		}, s.prototype.get = function (t) {
			var n = this.map[e(t)];
			return n ? n[0] : null
		}, s.prototype.getAll = function (t) {
			return this.map[e(t)] || []
		}, s.prototype.has = function (t) {
			return this.map.hasOwnProperty(e(t))
		}, s.prototype.set = function (t, i) {
			this.map[e(t)] = [n(i)]
		}, s.prototype.forEach = function (t, e) {
			Object.getOwnPropertyNames(this.map).forEach(function (n) {
				this.map[n].forEach(function (i) {
					t.call(e, i, n, this)
				}, this)
			}, this)
		}, s.prototype.keys = function () {
			var t = [];
			return this.forEach(function (e, n) {
				t.push(n)
			}), i(t)
		}, s.prototype.values = function () {
			var t = [];
			return this.forEach(function (e) {
				t.push(e)
			}), i(t)
		}, s.prototype.entries = function () {
			var t = [];
			return this.forEach(function (e, n) {
				t.push([n, e])
			}), i(t)
		}, m.iterable && (s.prototype[Symbol.iterator] = s.prototype.entries);
		var y = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
		c.prototype.clone = function () {
			return new c(this)
		}, u.call(c.prototype), u.call(f.prototype), f.prototype.clone = function () {
			return new f(this._bodyInit, {
				status: this.status,
				statusText: this.statusText,
				headers: new s(this.headers),
				url: this.url
			})
		}, f.error = function () {
			var t = new f(null, {
				status: 0,
				statusText: ""
			});
			return t.type = "error", t
		};
		var g = [301, 302, 303, 307, 308];
		f.redirect = function (t, e) {
			if (g.indexOf(e) === -1) throw new RangeError("Invalid status code");
			return new f(null, {
				status: e,
				headers: {
					location: t
				}
			})
		}, t.Headers = s, t.Request = c, t.Response = f, t.fetch = function (t, e) {
			return new Promise(function (n, i) {
				function s() {
					return "responseURL" in o ? o.responseURL : /^X-Request-URL:/m.test(o.getAllResponseHeaders()) ? o.getResponseHeader("X-Request-URL") : void 0
				}
				var r;
				r = c.prototype.isPrototypeOf(t) && !e ? t : new c(t, e);
				var o = new XMLHttpRequest;
				o.onload = function () {
					var t = {
							status: o.status,
							statusText: o.statusText,
							headers: p(o),
							url: s()
						},
						e = "response" in o ? o.response : o.responseText;
					n(new f(e, t))
				}, o.onerror = function () {
					i(new TypeError("Network request failed"))
				}, o.ontimeout = function () {
					i(new TypeError("Network request failed"))
				}, o.open(r.method, r.url, !0), "include" === r.credentials && (o.withCredentials = !0), "responseType" in o && m.blob && (o.responseType = "blob"), r.headers.forEach(function (t, e) {
					o.setRequestHeader(e, t)
				}), o.send("undefined" == typeof r._bodyInit ? null : r._bodyInit)
			})
		}, t.fetch.polyfill = !0
	}
}("undefined" != typeof self ? self : this), ! function (t, e) {
	"function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : t.Handlebars = t.Handlebars || e()
}(this, function () {
	var t = function () {
			function t(t) {
				this.string = t
			}
			var e;
			return t.prototype.toString = function () {
				return "" + this.string
			}, e = t
		}(),
		e = function (t) {
			function e(t) {
				return h[t]
			}

			function n(t) {
				for (var e = 1; e < arguments.length; e++)
					for (var n in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], n) && (t[n] = arguments[e][n]);
				return t
			}

			function i(t) {
				return t instanceof a ? t.toString() : null == t ? "" : t ? (t = "" + t, l.test(t) ? t.replace(u, e) : t) : t + ""
			}

			function s(t) {
				return !t && 0 !== t || !(!p(t) || 0 !== t.length)
			}

			function r(t, e) {
				return (t ? t + "." : "") + e
			}
			var o = {},
				a = t,
				h = {
					"&": "&amp;",
					"<": "&lt;",
					">": "&gt;",
					'"': "&quot;",
					"'": "&#x27;",
					"`": "&#x60;"
				},
				u = /[&<>"'`]/g,
				l = /[&<>"'`]/;
			o.extend = n;
			var c = Object.prototype.toString;
			o.toString = c;
			var d = function (t) {
				return "function" == typeof t
			};
			d(/x/) && (d = function (t) {
				return "function" == typeof t && "[object Function]" === c.call(t)
			});
			var d;
			o.isFunction = d;
			var p = Array.isArray || function (t) {
				return !(!t || "object" != typeof t) && "[object Array]" === c.call(t)
			};
			return o.isArray = p, o.escapeExpression = i, o.isEmpty = s, o.appendContextPath = r, o
		}(t),
		n = function () {
			function t(t, e) {
				var i;
				e && e.firstLine && (i = e.firstLine, t += " - " + i + ":" + e.firstColumn);
				for (var s = Error.prototype.constructor.call(this, t), r = 0; r < n.length; r++) this[n[r]] = s[n[r]];
				i && (this.lineNumber = i, this.column = e.firstColumn)
			}
			var e, n = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
			return t.prototype = new Error, e = t
		}(),
		i = function (t, e) {
			function n(t, e) {
				this.helpers = t || {}, this.partials = e || {}, i(this)
			}

			function i(t) {
				t.registerHelper("helperMissing", function () {
					if (1 !== arguments.length) throw new o("Missing helper: '" + arguments[arguments.length - 1].name + "'")
				}), t.registerHelper("blockHelperMissing", function (e, n) {
					var i = n.inverse,
						s = n.fn;
					if (e === !0) return s(this);
					if (e === !1 || null == e) return i(this);
					if (l(e)) return e.length > 0 ? (n.ids && (n.ids = [n.name]), t.helpers.each(e, n)) : i(this);
					if (n.data && n.ids) {
						var o = y(n.data);
						o.contextPath = r.appendContextPath(n.data.contextPath, n.name), n = {
							data: o
						}
					}
					return s(e, n)
				}), t.registerHelper("each", function (t, e) {
					if (!e) throw new o("Must pass iterator to #each");
					var n, i, s = e.fn,
						a = e.inverse,
						h = 0,
						u = "";
					if (e.data && e.ids && (i = r.appendContextPath(e.data.contextPath, e.ids[0]) + "."), c(t) && (t = t.call(this)), e.data && (n = y(e.data)), t && "object" == typeof t)
						if (l(t))
							for (var d = t.length; d > h; h++) n && (n.index = h, n.first = 0 === h, n.last = h === t.length - 1, i && (n.contextPath = i + h)), u += s(t[h], {
								data: n
							});
						else
							for (var p in t) t.hasOwnProperty(p) && (n && (n.key = p, n.index = h, n.first = 0 === h, i && (n.contextPath = i + p)), u += s(t[p], {
								data: n
							}), h++);
					return 0 === h && (u = a(this)), u
				}), t.registerHelper("if", function (t, e) {
					return c(t) && (t = t.call(this)), !e.hash.includeZero && !t || r.isEmpty(t) ? e.inverse(this) : e.fn(this)
				}), t.registerHelper("unless", function (e, n) {
					return t.helpers.if.call(this, e, {
						fn: n.inverse,
						inverse: n.fn,
						hash: n.hash
					})
				}), t.registerHelper("with", function (t, e) {
					c(t) && (t = t.call(this));
					var n = e.fn;
					if (r.isEmpty(t)) return e.inverse(this);
					if (e.data && e.ids) {
						var i = y(e.data);
						i.contextPath = r.appendContextPath(e.data.contextPath, e.ids[0]), e = {
							data: i
						}
					}
					return n(t, e)
				}), t.registerHelper("log", function (e, n) {
					var i = n.data && null != n.data.level ? parseInt(n.data.level, 10) : 1;
					t.log(i, e)
				}), t.registerHelper("lookup", function (t, e) {
					return t && t[e]
				})
			}
			var s = {},
				r = t,
				o = e,
				a = "2.0.0-beta.1";
			s.VERSION = a;
			var h = 6;
			s.COMPILER_REVISION = h;
			var u = {
				1: "<= 1.0.rc.2",
				2: "== 1.0.0-rc.3",
				3: "== 1.0.0-rc.4",
				4: "== 1.x.x",
				5: "== 2.0.0-alpha.x",
				6: ">= 2.0.0-beta.1"
			};
			s.REVISION_CHANGES = u;
			var l = r.isArray,
				c = r.isFunction,
				d = r.toString,
				p = "[object Object]";
			s.HandlebarsEnvironment = n, n.prototype = {
				constructor: n,
				logger: f,
				log: m,
				registerHelper: function (t, e) {
					if (d.call(t) === p) {
						if (e) throw new o("Arg not supported with multiple helpers");
						r.extend(this.helpers, t)
					} else this.helpers[t] = e
				},
				unregisterHelper: function (t) {
					delete this.helpers[t]
				},
				registerPartial: function (t, e) {
					d.call(t) === p ? r.extend(this.partials, t) : this.partials[t] = e
				},
				unregisterPartial: function (t) {
					delete this.partials[t]
				}
			};
			var f = {
				methodMap: {
					0: "debug",
					1: "info",
					2: "warn",
					3: "error"
				},
				DEBUG: 0,
				INFO: 1,
				WARN: 2,
				ERROR: 3,
				level: 3,
				log: function (t, e) {
					if (f.level <= t) {
						var n = f.methodMap[t];
						"undefined" != typeof console && console[n] && console[n].call(console, e)
					}
				}
			};
			s.logger = f;
			var m = f.log;
			s.log = m;
			var y = function (t) {
				var e = r.extend({}, t);
				return e._parent = t, e
			};
			return s.createFrame = y, s
		}(e, n),
		s = function (t, e, n) {
			function i(t) {
				var e = t && t[0] || 1,
					n = d;
				if (e !== n) {
					if (n > e) {
						var i = p[n],
							s = p[e];
						throw new c("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + i + ") or downgrade your runtime to an older version (" + s + ").")
					}
					throw new c("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + t[1] + ").")
				}
			}

			function s(t, e) {
				if (!e) throw new c("No environment passed to template");
				if (!t || !t.main) throw new c("Unknown template object: " + typeof t);
				e.VM.checkRevision(t.compiler);
				var n = function (n, i, s, r, o, a, h, u, d) {
						o && (r = l.extend({}, r, o));
						var p = e.VM.invokePartial.call(this, n, s, r, a, h, u, d);
						if (null == p && e.compile) {
							var f = {
								helpers: a,
								partials: h,
								data: u,
								depths: d
							};
							h[s] = e.compile(n, {
								data: void 0 !== u,
								compat: t.compat
							}, e), p = h[s](r, f)
						}
						if (null != p) {
							if (i) {
								for (var m = p.split("\n"), y = 0, g = m.length; g > y && (m[y] || y + 1 !== g); y++) m[y] = i + m[y];
								p = m.join("\n")
							}
							return p
						}
						throw new c("The partial " + s + " could not be compiled when running in runtime-only mode")
					},
					i = {
						lookup: function (t, e) {
							for (var n = t.length, i = 0; n > i; i++)
								if (t[i] && null != t[i][e]) return t[i][e]
						},
						lambda: function (t, e) {
							return "function" == typeof t ? t.call(e) : t
						},
						escapeExpression: l.escapeExpression,
						invokePartial: n,
						fn: function (e) {
							return t[e]
						},
						programs: [],
						program: function (t, e, n) {
							var i = this.programs[t],
								s = this.fn(t);
							return e || n ? i = r(this, t, s, e, n) : i || (i = this.programs[t] = r(this, t, s)), i
						},
						data: function (t, e) {
							for (; t && e--;) t = t._parent;
							return t
						},
						merge: function (t, e) {
							var n = t || e;
							return t && e && t !== e && (n = l.extend({}, e, t)), n
						},
						noop: e.VM.noop,
						compilerInfo: t.compiler
					},
					s = function (e, n) {
						n = n || {};
						var r = n.data;
						s._setup(n), !n.partial && t.useData && (r = h(e, r));
						var o;
						return t.useDepths && (o = n.depths ? [e].concat(n.depths) : [e]), t.main.call(i, e, i.helpers, i.partials, r, o)
					};
				return s.isTop = !0, s._setup = function (n) {
					n.partial ? (i.helpers = n.helpers, i.partials = n.partials) : (i.helpers = i.merge(n.helpers, e.helpers), t.usePartial && (i.partials = i.merge(n.partials, e.partials)))
				}, s._child = function (e, n, s) {
					if (t.useDepths && !s) throw new c("must pass parent depths");
					return r(i, e, t[e], n, s)
				}, s
			}

			function r(t, e, n, i, s) {
				var r = function (e, r) {
					return r = r || {}, n.call(t, e, t.helpers, t.partials, r.data || i, s && [e].concat(s))
				};
				return r.program = e, r.depth = s ? s.length : 0, r
			}

			function o(t, e, n, i, s, r, o) {
				var a = {
					partial: !0,
					helpers: i,
					partials: s,
					data: r,
					depths: o
				};
				if (void 0 === t) throw new c("The partial " + e + " could not be found");
				return t instanceof Function ? t(n, a) : void 0
			}

			function a() {
				return ""
			}

			function h(t, e) {
				return e && "root" in e || (e = e ? f(e) : {}, e.root = t), e
			}
			var u = {},
				l = t,
				c = e,
				d = n.COMPILER_REVISION,
				p = n.REVISION_CHANGES,
				f = n.createFrame;
			return u.checkRevision = i, u.template = s, u.program = r, u.invokePartial = o, u.noop = a, u
		}(e, n, i),
		r = function (t, e, n, i, s) {
			var r, o = t,
				a = e,
				h = n,
				u = i,
				l = s,
				c = function () {
					var t = new o.HandlebarsEnvironment;
					return u.extend(t, o), t.SafeString = a, t.Exception = h, t.Utils = u, t.escapeExpression = u.escapeExpression, t.VM = l, t.template = function (e) {
						return l.template(e, t)
					}, t
				},
				d = c();
			return d.create = c, d.default = d, r = d
		}(i, t, n, e, s),
		o = function (t) {
			function e(t) {
				t = t || {}, this.firstLine = t.first_line, this.firstColumn = t.first_column, this.lastColumn = t.last_column, this.lastLine = t.last_line
			}
			var n, i = t,
				s = {
					ProgramNode: function (t, n, i) {
						e.call(this, i), this.type = "program", this.statements = t, this.strip = n
					},
					MustacheNode: function (t, n, i, r, o) {
						if (e.call(this, o), this.type = "mustache", this.strip = r, null != i && i.charAt) {
							var a = i.charAt(3) || i.charAt(2);
							this.escaped = "{" !== a && "&" !== a
						} else this.escaped = !!i;
						this.sexpr = t instanceof s.SexprNode ? t : new s.SexprNode(t, n), this.id = this.sexpr.id, this.params = this.sexpr.params, this.hash = this.sexpr.hash, this.eligibleHelper = this.sexpr.eligibleHelper, this.isHelper = this.sexpr.isHelper
					},
					SexprNode: function (t, n, i) {
						e.call(this, i), this.type = "sexpr", this.hash = n;
						var s = this.id = t[0],
							r = this.params = t.slice(1);
						this.isHelper = !(!r.length && !n), this.eligibleHelper = this.isHelper || s.isSimple
					},
					PartialNode: function (t, n, i, s, r) {
						e.call(this, r), this.type = "partial", this.partialName = t, this.context = n, this.hash = i, this.strip = s, this.strip.inlineStandalone = !0
					},
					BlockNode: function (t, n, i, s, r) {
						e.call(this, r), this.type = "block", this.mustache = t, this.program = n, this.inverse = i, this.strip = s, i && !n && (this.isInverse = !0)
					},
					RawBlockNode: function (t, n, r, o) {
						if (e.call(this, o), t.sexpr.id.original !== r) throw new i(t.sexpr.id.original + " doesn't match " + r, this);
						n = new s.ContentNode(n, o), this.type = "block", this.mustache = t, this.program = new s.ProgramNode([n], {}, o)
					},
					ContentNode: function (t, n) {
						e.call(this, n), this.type = "content", this.original = this.string = t
					},
					HashNode: function (t, n) {
						e.call(this, n), this.type = "hash", this.pairs = t
					},
					IdNode: function (t, n) {
						e.call(this, n), this.type = "ID";
						for (var s = "", r = [], o = 0, a = "", h = 0, u = t.length; u > h; h++) {
							var l = t[h].part;
							if (s += (t[h].separator || "") + l, ".." === l || "." === l || "this" === l) {
								if (r.length > 0) throw new i("Invalid path: " + s, this);
								".." === l ? (o++, a += "../") : this.isScoped = !0
							} else r.push(l)
						}
						this.original = s, this.parts = r, this.string = r.join("."), this.depth = o, this.idName = a + this.string, this.isSimple = 1 === t.length && !this.isScoped && 0 === o, this.stringModeValue = this.string
					},
					PartialNameNode: function (t, n) {
						e.call(this, n), this.type = "PARTIAL_NAME", this.name = t.original
					},
					DataNode: function (t, n) {
						e.call(this, n), this.type = "DATA", this.id = t, this.stringModeValue = t.stringModeValue, this.idName = "@" + t.stringModeValue
					},
					StringNode: function (t, n) {
						e.call(this, n), this.type = "STRING", this.original = this.string = this.stringModeValue = t
					},
					NumberNode: function (t, n) {
						e.call(this, n), this.type = "NUMBER", this.original = this.number = t, this.stringModeValue = Number(t)
					},
					BooleanNode: function (t, n) {
						e.call(this, n), this.type = "BOOLEAN", this.bool = t, this.stringModeValue = "true" === t
					},
					CommentNode: function (t, n) {
						e.call(this, n), this.type = "comment", this.comment = t, this.strip = {
							inlineStandalone: !0
						}
					}
				};
			return n = s
		}(n),
		a = function () {
			var t, e = function () {
				function t() {
					this.yy = {}
				}
				var e = {
						trace: function () {},
						yy: {},
						symbols_: {
							error: 2,
							root: 3,
							program: 4,
							EOF: 5,
							program_repetition0: 6,
							statement: 7,
							mustache: 8,
							block: 9,
							rawBlock: 10,
							partial: 11,
							CONTENT: 12,
							COMMENT: 13,
							openRawBlock: 14,
							END_RAW_BLOCK: 15,
							OPEN_RAW_BLOCK: 16,
							sexpr: 17,
							CLOSE_RAW_BLOCK: 18,
							openBlock: 19,
							block_option0: 20,
							closeBlock: 21,
							openInverse: 22,
							block_option1: 23,
							OPEN_BLOCK: 24,
							CLOSE: 25,
							OPEN_INVERSE: 26,
							inverseAndProgram: 27,
							INVERSE: 28,
							OPEN_ENDBLOCK: 29,
							path: 30,
							OPEN: 31,
							OPEN_UNESCAPED: 32,
							CLOSE_UNESCAPED: 33,
							OPEN_PARTIAL: 34,
							partialName: 35,
							param: 36,
							partial_option0: 37,
							partial_option1: 38,
							sexpr_repetition0: 39,
							sexpr_option0: 40,
							dataName: 41,
							STRING: 42,
							NUMBER: 43,
							BOOLEAN: 44,
							OPEN_SEXPR: 45,
							CLOSE_SEXPR: 46,
							hash: 47,
							hash_repetition_plus0: 48,
							hashSegment: 49,
							ID: 50,
							EQUALS: 51,
							DATA: 52,
							pathSegments: 53,
							SEP: 54,
							$accept: 0,
							$end: 1
						},
						terminals_: {
							2: "error",
							5: "EOF",
							12: "CONTENT",
							13: "COMMENT",
							15: "END_RAW_BLOCK",
							16: "OPEN_RAW_BLOCK",
							18: "CLOSE_RAW_BLOCK",
							24: "OPEN_BLOCK",
							25: "CLOSE",
							26: "OPEN_INVERSE",
							28: "INVERSE",
							29: "OPEN_ENDBLOCK",
							31: "OPEN",
							32: "OPEN_UNESCAPED",
							33: "CLOSE_UNESCAPED",
							34: "OPEN_PARTIAL",
							42: "STRING",
							43: "NUMBER",
							44: "BOOLEAN",
							45: "OPEN_SEXPR",
							46: "CLOSE_SEXPR",
							50: "ID",
							51: "EQUALS",
							52: "DATA",
							54: "SEP"
						},
						productions_: [0, [3, 2],
							[4, 1],
							[7, 1],
							[7, 1],
							[7, 1],
							[7, 1],
							[7, 1],
							[7, 1],
							[10, 3],
							[14, 3],
							[9, 4],
							[9, 4],
							[19, 3],
							[22, 3],
							[27, 2],
							[21, 3],
							[8, 3],
							[8, 3],
							[11, 5],
							[11, 4],
							[17, 3],
							[17, 1],
							[36, 1],
							[36, 1],
							[36, 1],
							[36, 1],
							[36, 1],
							[36, 3],
							[47, 1],
							[49, 3],
							[35, 1],
							[35, 1],
							[35, 1],
							[41, 2],
							[30, 1],
							[53, 3],
							[53, 1],
							[6, 0],
							[6, 2],
							[20, 0],
							[20, 1],
							[23, 0],
							[23, 1],
							[37, 0],
							[37, 1],
							[38, 0],
							[38, 1],
							[39, 0],
							[39, 2],
							[40, 0],
							[40, 1],
							[48, 1],
							[48, 2]
						],
						performAction: function (t, e, n, i, s, r) {
							var o = r.length - 1;
							switch (s) {
								case 1:
									return i.prepareProgram(r[o - 1].statements, !0), r[o - 1];
								case 2:
									this.$ = new i.ProgramNode(i.prepareProgram(r[o]), {}, this._$);
									break;
								case 3:
									this.$ = r[o];
									break;
								case 4:
									this.$ = r[o];
									break;
								case 5:
									this.$ = r[o];
									break;
								case 6:
									this.$ = r[o];
									break;
								case 7:
									this.$ = new i.ContentNode(r[o], this._$);
									break;
								case 8:
									this.$ = new i.CommentNode(r[o], this._$);
									break;
								case 9:
									this.$ = new i.RawBlockNode(r[o - 2], r[o - 1], r[o], this._$);
									break;
								case 10:
									this.$ = new i.MustacheNode(r[o - 1], null, "", "", this._$);
									break;
								case 11:
									this.$ = i.prepareBlock(r[o - 3], r[o - 2], r[o - 1], r[o], !1, this._$);
									break;
								case 12:
									this.$ = i.prepareBlock(r[o - 3], r[o - 2], r[o - 1], r[o], !0, this._$);
									break;
								case 13:
									this.$ = new i.MustacheNode(r[o - 1], null, r[o - 2], i.stripFlags(r[o - 2], r[o]), this._$);
									break;
								case 14:
									this.$ = new i.MustacheNode(r[o - 1], null, r[o - 2], i.stripFlags(r[o - 2], r[o]), this._$);
									break;
								case 15:
									this.$ = {
										strip: i.stripFlags(r[o - 1], r[o - 1]),
										program: r[o]
									};
									break;
								case 16:
									this.$ = {
										path: r[o - 1],
										strip: i.stripFlags(r[o - 2], r[o])
									};
									break;
								case 17:
									this.$ = new i.MustacheNode(r[o - 1], null, r[o - 2], i.stripFlags(r[o - 2], r[o]), this._$);
									break;
								case 18:
									this.$ = new i.MustacheNode(r[o - 1], null, r[o - 2], i.stripFlags(r[o - 2], r[o]), this._$);
									break;
								case 19:
									this.$ = new i.PartialNode(r[o - 3], r[o - 2], r[o - 1], i.stripFlags(r[o - 4], r[o]), this._$);
									break;
								case 20:
									this.$ = new i.PartialNode(r[o - 2], void 0, r[o - 1], i.stripFlags(r[o - 3], r[o]), this._$);
									break;
								case 21:
									this.$ = new i.SexprNode([r[o - 2]].concat(r[o - 1]), r[o], this._$);
									break;
								case 22:
									this.$ = new i.SexprNode([r[o]], null, this._$);
									break;
								case 23:
									this.$ = r[o];
									break;
								case 24:
									this.$ = new i.StringNode(r[o], this._$);
									break;
								case 25:
									this.$ = new i.NumberNode(r[o], this._$);
									break;
								case 26:
									this.$ = new i.BooleanNode(r[o], this._$);
									break;
								case 27:
									this.$ = r[o];
									break;
								case 28:
									r[o - 1].isHelper = !0, this.$ = r[o - 1];
									break;
								case 29:
									this.$ = new i.HashNode(r[o], this._$);
									break;
								case 30:
									this.$ = [r[o - 2], r[o]];
									break;
								case 31:
									this.$ = new i.PartialNameNode(r[o], this._$);
									break;
								case 32:
									this.$ = new i.PartialNameNode(new i.StringNode(r[o], this._$), this._$);
									break;
								case 33:
									this.$ = new i.PartialNameNode(new i.NumberNode(r[o], this._$));
									break;
								case 34:
									this.$ = new i.DataNode(r[o], this._$);
									break;
								case 35:
									this.$ = new i.IdNode(r[o], this._$);
									break;
								case 36:
									r[o - 2].push({
										part: r[o],
										separator: r[o - 1]
									}), this.$ = r[o - 2];
									break;
								case 37:
									this.$ = [{
										part: r[o]
									}];
									break;
								case 38:
									this.$ = [];
									break;
								case 39:
									r[o - 1].push(r[o]);
									break;
								case 48:
									this.$ = [];
									break;
								case 49:
									r[o - 1].push(r[o]);
									break;
								case 52:
									this.$ = [r[o]];
									break;
								case 53:
									r[o - 1].push(r[o])
							}
						},
						table: [{
							3: 1,
							4: 2,
							5: [2, 38],
							6: 3,
							12: [2, 38],
							13: [2, 38],
							16: [2, 38],
							24: [2, 38],
							26: [2, 38],
							31: [2, 38],
							32: [2, 38],
							34: [2, 38]
						}, {
							1: [3]
						}, {
							5: [1, 4]
						}, {
							5: [2, 2],
							7: 5,
							8: 6,
							9: 7,
							10: 8,
							11: 9,
							12: [1, 10],
							13: [1, 11],
							14: 16,
							16: [1, 20],
							19: 14,
							22: 15,
							24: [1, 18],
							26: [1, 19],
							28: [2, 2],
							29: [2, 2],
							31: [1, 12],
							32: [1, 13],
							34: [1, 17]
						}, {
							1: [2, 1]
						}, {
							5: [2, 39],
							12: [2, 39],
							13: [2, 39],
							16: [2, 39],
							24: [2, 39],
							26: [2, 39],
							28: [2, 39],
							29: [2, 39],
							31: [2, 39],
							32: [2, 39],
							34: [2, 39]
						}, {
							5: [2, 3],
							12: [2, 3],
							13: [2, 3],
							16: [2, 3],
							24: [2, 3],
							26: [2, 3],
							28: [2, 3],
							29: [2, 3],
							31: [2, 3],
							32: [2, 3],
							34: [2, 3]
						}, {
							5: [2, 4],
							12: [2, 4],
							13: [2, 4],
							16: [2, 4],
							24: [2, 4],
							26: [2, 4],
							28: [2, 4],
							29: [2, 4],
							31: [2, 4],
							32: [2, 4],
							34: [2, 4]
						}, {
							5: [2, 5],
							12: [2, 5],
							13: [2, 5],
							16: [2, 5],
							24: [2, 5],
							26: [2, 5],
							28: [2, 5],
							29: [2, 5],
							31: [2, 5],
							32: [2, 5],
							34: [2, 5]
						}, {
							5: [2, 6],
							12: [2, 6],
							13: [2, 6],
							16: [2, 6],
							24: [2, 6],
							26: [2, 6],
							28: [2, 6],
							29: [2, 6],
							31: [2, 6],
							32: [2, 6],
							34: [2, 6]
						}, {
							5: [2, 7],
							12: [2, 7],
							13: [2, 7],
							16: [2, 7],
							24: [2, 7],
							26: [2, 7],
							28: [2, 7],
							29: [2, 7],
							31: [2, 7],
							32: [2, 7],
							34: [2, 7]
						}, {
							5: [2, 8],
							12: [2, 8],
							13: [2, 8],
							16: [2, 8],
							24: [2, 8],
							26: [2, 8],
							28: [2, 8],
							29: [2, 8],
							31: [2, 8],
							32: [2, 8],
							34: [2, 8]
						}, {
							17: 21,
							30: 22,
							41: 23,
							50: [1, 26],
							52: [1, 25],
							53: 24
						}, {
							17: 27,
							30: 22,
							41: 23,
							50: [1, 26],
							52: [1, 25],
							53: 24
						}, {
							4: 28,
							6: 3,
							12: [2, 38],
							13: [2, 38],
							16: [2, 38],
							24: [2, 38],
							26: [2, 38],
							28: [2, 38],
							29: [2, 38],
							31: [2, 38],
							32: [2, 38],
							34: [2, 38]
						}, {
							4: 29,
							6: 3,
							12: [2, 38],
							13: [2, 38],
							16: [2, 38],
							24: [2, 38],
							26: [2, 38],
							28: [2, 38],
							29: [2, 38],
							31: [2, 38],
							32: [2, 38],
							34: [2, 38]
						}, {
							12: [1, 30]
						}, {
							30: 32,
							35: 31,
							42: [1, 33],
							43: [1, 34],
							50: [1, 26],
							53: 24
						}, {
							17: 35,
							30: 22,
							41: 23,
							50: [1, 26],
							52: [1, 25],
							53: 24
						}, {
							17: 36,
							30: 22,
							41: 23,
							50: [1, 26],
							52: [1, 25],
							53: 24
						}, {
							17: 37,
							30: 22,
							41: 23,
							50: [1, 26],
							52: [1, 25],
							53: 24
						}, {
							25: [1, 38]
						}, {
							18: [2, 48],
							25: [2, 48],
							33: [2, 48],
							39: 39,
							42: [2, 48],
							43: [2, 48],
							44: [2, 48],
							45: [2, 48],
							46: [2, 48],
							50: [2, 48],
							52: [2, 48]
						}, {
							18: [2, 22],
							25: [2, 22],
							33: [2, 22],
							46: [2, 22]
						}, {
							18: [2, 35],
							25: [2, 35],
							33: [2, 35],
							42: [2, 35],
							43: [2, 35],
							44: [2, 35],
							45: [2, 35],
							46: [2, 35],
							50: [2, 35],
							52: [2, 35],
							54: [1, 40]
						}, {
							30: 41,
							50: [1, 26],
							53: 24
						}, {
							18: [2, 37],
							25: [2, 37],
							33: [2, 37],
							42: [2, 37],
							43: [2, 37],
							44: [2, 37],
							45: [2, 37],
							46: [2, 37],
							50: [2, 37],
							52: [2, 37],
							54: [2, 37]
						}, {
							33: [1, 42]
						}, {
							20: 43,
							27: 44,
							28: [1, 45],
							29: [2, 40]
						}, {
							23: 46,
							27: 47,
							28: [1, 45],
							29: [2, 42]
						}, {
							15: [1, 48]
						}, {
							25: [2, 46],
							30: 51,
							36: 49,
							38: 50,
							41: 55,
							42: [1, 52],
							43: [1, 53],
							44: [1, 54],
							45: [1, 56],
							47: 57,
							48: 58,
							49: 60,
							50: [1, 59],
							52: [1, 25],
							53: 24
						}, {
							25: [2, 31],
							42: [2, 31],
							43: [2, 31],
							44: [2, 31],
							45: [2, 31],
							50: [2, 31],
							52: [2, 31]
						}, {
							25: [2, 32],
							42: [2, 32],
							43: [2, 32],
							44: [2, 32],
							45: [2, 32],
							50: [2, 32],
							52: [2, 32]
						}, {
							25: [2, 33],
							42: [2, 33],
							43: [2, 33],
							44: [2, 33],
							45: [2, 33],
							50: [2, 33],
							52: [2, 33]
						}, {
							25: [1, 61]
						}, {
							25: [1, 62]
						}, {
							18: [1, 63]
						}, {
							5: [2, 17],
							12: [2, 17],
							13: [2, 17],
							16: [2, 17],
							24: [2, 17],
							26: [2, 17],
							28: [2, 17],
							29: [2, 17],
							31: [2, 17],
							32: [2, 17],
							34: [2, 17]
						}, {
							18: [2, 50],
							25: [2, 50],
							30: 51,
							33: [2, 50],
							36: 65,
							40: 64,
							41: 55,
							42: [1, 52],
							43: [1, 53],
							44: [1, 54],
							45: [1, 56],
							46: [2, 50],
							47: 66,
							48: 58,
							49: 60,
							50: [1, 59],
							52: [1, 25],
							53: 24
						}, {
							50: [1, 67]
						}, {
							18: [2, 34],
							25: [2, 34],
							33: [2, 34],
							42: [2, 34],
							43: [2, 34],
							44: [2, 34],
							45: [2, 34],
							46: [2, 34],
							50: [2, 34],
							52: [2, 34]
						}, {
							5: [2, 18],
							12: [2, 18],
							13: [2, 18],
							16: [2, 18],
							24: [2, 18],
							26: [2, 18],
							28: [2, 18],
							29: [2, 18],
							31: [2, 18],
							32: [2, 18],
							34: [2, 18]
						}, {
							21: 68,
							29: [1, 69]
						}, {
							29: [2, 41]
						}, {
							4: 70,
							6: 3,
							12: [2, 38],
							13: [2, 38],
							16: [2, 38],
							24: [2, 38],
							26: [2, 38],
							29: [2, 38],
							31: [2, 38],
							32: [2, 38],
							34: [2, 38]
						}, {
							21: 71,
							29: [1, 69]
						}, {
							29: [2, 43]
						}, {
							5: [2, 9],
							12: [2, 9],
							13: [2, 9],
							16: [2, 9],
							24: [2, 9],
							26: [2, 9],
							28: [2, 9],
							29: [2, 9],
							31: [2, 9],
							32: [2, 9],
							34: [2, 9]
						}, {
							25: [2, 44],
							37: 72,
							47: 73,
							48: 58,
							49: 60,
							50: [1, 74]
						}, {
							25: [1, 75]
						}, {
							18: [2, 23],
							25: [2, 23],
							33: [2, 23],
							42: [2, 23],
							43: [2, 23],
							44: [2, 23],
							45: [2, 23],
							46: [2, 23],
							50: [2, 23],
							52: [2, 23]
						}, {
							18: [2, 24],
							25: [2, 24],
							33: [2, 24],
							42: [2, 24],
							43: [2, 24],
							44: [2, 24],
							45: [2, 24],
							46: [2, 24],
							50: [2, 24],
							52: [2, 24]
						}, {
							18: [2, 25],
							25: [2, 25],
							33: [2, 25],
							42: [2, 25],
							43: [2, 25],
							44: [2, 25],
							45: [2, 25],
							46: [2, 25],
							50: [2, 25],
							52: [2, 25]
						}, {
							18: [2, 26],
							25: [2, 26],
							33: [2, 26],
							42: [2, 26],
							43: [2, 26],
							44: [2, 26],
							45: [2, 26],
							46: [2, 26],
							50: [2, 26],
							52: [2, 26]
						}, {
							18: [2, 27],
							25: [2, 27],
							33: [2, 27],
							42: [2, 27],
							43: [2, 27],
							44: [2, 27],
							45: [2, 27],
							46: [2, 27],
							50: [2, 27],
							52: [2, 27]
						}, {
							17: 76,
							30: 22,
							41: 23,
							50: [1, 26],
							52: [1, 25],
							53: 24
						}, {
							25: [2, 47]
						}, {
							18: [2, 29],
							25: [2, 29],
							33: [2, 29],
							46: [2, 29],
							49: 77,
							50: [1, 74]
						}, {
							18: [2, 37],
							25: [2, 37],
							33: [2, 37],
							42: [2, 37],
							43: [2, 37],
							44: [2, 37],
							45: [2, 37],
							46: [2, 37],
							50: [2, 37],
							51: [1, 78],
							52: [2, 37],
							54: [2, 37]
						}, {
							18: [2, 52],
							25: [2, 52],
							33: [2, 52],
							46: [2, 52],
							50: [2, 52]
						}, {
							12: [2, 13],
							13: [2, 13],
							16: [2, 13],
							24: [2, 13],
							26: [2, 13],
							28: [2, 13],
							29: [2, 13],
							31: [2, 13],
							32: [2, 13],
							34: [2, 13]
						}, {
							12: [2, 14],
							13: [2, 14],
							16: [2, 14],
							24: [2, 14],
							26: [2, 14],
							28: [2, 14],
							29: [2, 14],
							31: [2, 14],
							32: [2, 14],
							34: [2, 14]
						}, {
							12: [2, 10]
						}, {
							18: [2, 21],
							25: [2, 21],
							33: [2, 21],
							46: [2, 21]
						}, {
							18: [2, 49],
							25: [2, 49],
							33: [2, 49],
							42: [2, 49],
							43: [2, 49],
							44: [2, 49],
							45: [2, 49],
							46: [2, 49],
							50: [2, 49],
							52: [2, 49]
						}, {
							18: [2, 51],
							25: [2, 51],
							33: [2, 51],
							46: [2, 51]
						}, {
							18: [2, 36],
							25: [2, 36],
							33: [2, 36],
							42: [2, 36],
							43: [2, 36],
							44: [2, 36],
							45: [2, 36],
							46: [2, 36],
							50: [2, 36],
							52: [2, 36],
							54: [2, 36]
						}, {
							5: [2, 11],
							12: [2, 11],
							13: [2, 11],
							16: [2, 11],
							24: [2, 11],
							26: [2, 11],
							28: [2, 11],
							29: [2, 11],
							31: [2, 11],
							32: [2, 11],
							34: [2, 11]
						}, {
							30: 79,
							50: [1, 26],
							53: 24
						}, {
							29: [2, 15]
						}, {
							5: [2, 12],
							12: [2, 12],
							13: [2, 12],
							16: [2, 12],
							24: [2, 12],
							26: [2, 12],
							28: [2, 12],
							29: [2, 12],
							31: [2, 12],
							32: [2, 12],
							34: [2, 12]
						}, {
							25: [1, 80]
						}, {
							25: [2, 45]
						}, {
							51: [1, 78]
						}, {
							5: [2, 20],
							12: [2, 20],
							13: [2, 20],
							16: [2, 20],
							24: [2, 20],
							26: [2, 20],
							28: [2, 20],
							29: [2, 20],
							31: [2, 20],
							32: [2, 20],
							34: [2, 20]
						}, {
							46: [1, 81]
						}, {
							18: [2, 53],
							25: [2, 53],
							33: [2, 53],
							46: [2, 53],
							50: [2, 53]
						}, {
							30: 51,
							36: 82,
							41: 55,
							42: [1, 52],
							43: [1, 53],
							44: [1, 54],
							45: [1, 56],
							50: [1, 26],
							52: [1, 25],
							53: 24
						}, {
							25: [1, 83]
						}, {
							5: [2, 19],
							12: [2, 19],
							13: [2, 19],
							16: [2, 19],
							24: [2, 19],
							26: [2, 19],
							28: [2, 19],
							29: [2, 19],
							31: [2, 19],
							32: [2, 19],
							34: [2, 19]
						}, {
							18: [2, 28],
							25: [2, 28],
							33: [2, 28],
							42: [2, 28],
							43: [2, 28],
							44: [2, 28],
							45: [2, 28],
							46: [2, 28],
							50: [2, 28],
							52: [2, 28]
						}, {
							18: [2, 30],
							25: [2, 30],
							33: [2, 30],
							46: [2, 30],
							50: [2, 30]
						}, {
							5: [2, 16],
							12: [2, 16],
							13: [2, 16],
							16: [2, 16],
							24: [2, 16],
							26: [2, 16],
							28: [2, 16],
							29: [2, 16],
							31: [2, 16],
							32: [2, 16],
							34: [2, 16]
						}],
						defaultActions: {
							4: [2, 1],
							44: [2, 41],
							47: [2, 43],
							57: [2, 47],
							63: [2, 10],
							70: [2, 15],
							73: [2, 45]
						},
						parseError: function (t) {
							throw new Error(t)
						},
						parse: function (t) {
							function e() {
								var t;
								return t = n.lexer.lex() || 1, "number" != typeof t && (t = n.symbols_[t] || t), t
							}
							var n = this,
								i = [0],
								s = [null],
								r = [],
								o = this.table,
								a = "",
								h = 0,
								u = 0,
								l = 0;
							this.lexer.setInput(t), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
							var c = this.lexer.yylloc;
							r.push(c);
							var d = this.lexer.options && this.lexer.options.ranges;
							"function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
							for (var p, f, m, y, g, _, v, S, k, w = {};;) {
								if (m = i[i.length - 1], this.defaultActions[m] ? y = this.defaultActions[m] : ((null === p || "undefined" == typeof p) && (p = e()), y = o[m] && o[m][p]), "undefined" == typeof y || !y.length || !y[0]) {
									var b = "";
									if (!l) {
										k = [];
										for (_ in o[m]) this.terminals_[_] && _ > 2 && k.push("'" + this.terminals_[_] + "'");
										b = this.lexer.showPosition ? "Parse error on line " + (h + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + k.join(", ") + ", got '" + (this.terminals_[p] || p) + "'" : "Parse error on line " + (h + 1) + ": Unexpected " + (1 == p ? "end of input" : "'" + (this.terminals_[p] || p) + "'"), this.parseError(b, {
											text: this.lexer.match,
											token: this.terminals_[p] || p,
											line: this.lexer.yylineno,
											loc: c,
											expected: k
										})
									}
								}
								if (y[0] instanceof Array && y.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + m + ", token: " + p);
								switch (y[0]) {
									case 1:
										i.push(p), s.push(this.lexer.yytext), r.push(this.lexer.yylloc), i.push(y[1]), p = null, f ? (p = f, f = null) : (u = this.lexer.yyleng, a = this.lexer.yytext, h = this.lexer.yylineno, c = this.lexer.yylloc, l > 0 && l--);
										break;
									case 2:
										if (v = this.productions_[y[1]][1], w.$ = s[s.length - v], w._$ = {
												first_line: r[r.length - (v || 1)].first_line,
												last_line: r[r.length - 1].last_line,
												first_column: r[r.length - (v || 1)].first_column,
												last_column: r[r.length - 1].last_column
											}, d && (w._$.range = [r[r.length - (v || 1)].range[0], r[r.length - 1].range[1]]), g = this.performAction.call(w, a, u, h, this.yy, y[1], s, r), "undefined" != typeof g) return g;
										v && (i = i.slice(0, -1 * v * 2), s = s.slice(0, -1 * v), r = r.slice(0, -1 * v)), i.push(this.productions_[y[1]][0]), s.push(w.$), r.push(w._$), S = o[i[i.length - 2]][i[i.length - 1]], i.push(S);
										break;
									case 3:
										return !0
								}
							}
							return !0
						}
					},
					n = function () {
						var t = {
							EOF: 1,
							parseError: function (t, e) {
								if (!this.yy.parser) throw new Error(t);
								this.yy.parser.parseError(t, e)
							},
							setInput: function (t) {
								return this._input = t, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
									first_line: 1,
									first_column: 0,
									last_line: 1,
									last_column: 0
								}, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
							},
							input: function () {
								var t = this._input[0];
								this.yytext += t, this.yyleng++, this.offset++, this.match += t, this.matched += t;
								var e = t.match(/(?:\r\n?|\n).*/g);
								return e ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), t
							},
							unput: function (t) {
								var e = t.length,
									n = t.split(/(?:\r\n?|\n)/g);
								this._input = t + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - e - 1), this.offset -= e;
								var i = this.match.split(/(?:\r\n?|\n)/g);
								this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
								var s = this.yylloc.range;
								return this.yylloc = {
									first_line: this.yylloc.first_line,
									last_line: this.yylineno + 1,
									first_column: this.yylloc.first_column,
									last_column: n ? (n.length === i.length ? this.yylloc.first_column : 0) + i[i.length - n.length].length - n[0].length : this.yylloc.first_column - e
								}, this.options.ranges && (this.yylloc.range = [s[0], s[0] + this.yyleng - e]), this
							},
							more: function () {
								return this._more = !0, this
							},
							less: function (t) {
								this.unput(this.match.slice(t))
							},
							pastInput: function () {
								var t = this.matched.substr(0, this.matched.length - this.match.length);
								return (t.length > 20 ? "..." : "") + t.substr(-20).replace(/\n/g, "")
							},
							upcomingInput: function () {
								var t = this.match;
								return t.length < 20 && (t += this._input.substr(0, 20 - t.length)), (t.substr(0, 20) + (t.length > 20 ? "..." : "")).replace(/\n/g, "")
							},
							showPosition: function () {
								var t = this.pastInput(),
									e = new Array(t.length + 1).join("-");
								return t + this.upcomingInput() + "\n" + e + "^"
							},
							next: function () {
								if (this.done) return this.EOF;
								this._input || (this.done = !0);
								var t, e, n, i, s;
								this._more || (this.yytext = "", this.match = "");
								for (var r = this._currentRules(), o = 0; o < r.length && (n = this._input.match(this.rules[r[o]]), !n || e && !(n[0].length > e[0].length) || (e = n, i = o, this.options.flex)); o++);
								return e ? (s = e[0].match(/(?:\r\n?|\n).*/g), s && (this.yylineno += s.length), this.yylloc = {
									first_line: this.yylloc.last_line,
									last_line: this.yylineno + 1,
									first_column: this.yylloc.last_column,
									last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
								}, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], t = this.performAction.call(this, this.yy, this, r[i], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), t ? t : void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
									text: "",
									token: null,
									line: this.yylineno
								})
							},
							lex: function () {
								var t = this.next();
								return "undefined" != typeof t ? t : this.lex()
							},
							begin: function (t) {
								this.conditionStack.push(t)
							},
							popState: function () {
								return this.conditionStack.pop()
							},
							_currentRules: function () {
								return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
							},
							topState: function () {
								return this.conditionStack[this.conditionStack.length - 2]
							},
							pushState: function (t) {
								this.begin(t)
							}
						};
						return t.options = {}, t.performAction = function (t, e, n, i) {
							function s(t, n) {
								return e.yytext = e.yytext.substr(t, e.yyleng - n)
							}
							switch (n) {
								case 0:
									if ("\\\\" === e.yytext.slice(-2) ? (s(0, 1), this.begin("mu")) : "\\" === e.yytext.slice(-1) ? (s(0, 1), this.begin("emu")) : this.begin("mu"), e.yytext) return 12;
									break;
								case 1:
									return 12;
								case 2:
									return this.popState(), 12;
								case 3:
									return e.yytext = e.yytext.substr(5, e.yyleng - 9),
										this.popState(), 15;
								case 4:
									return 12;
								case 5:
									return s(0, 4), this.popState(), 13;
								case 6:
									return 45;
								case 7:
									return 46;
								case 8:
									return 16;
								case 9:
									return this.popState(), this.begin("raw"), 18;
								case 10:
									return 34;
								case 11:
									return 24;
								case 12:
									return 29;
								case 13:
									return this.popState(), 28;
								case 14:
									return this.popState(), 28;
								case 15:
									return 26;
								case 16:
									return 26;
								case 17:
									return 32;
								case 18:
									return 31;
								case 19:
									this.popState(), this.begin("com");
									break;
								case 20:
									return s(3, 5), this.popState(), 13;
								case 21:
									return 31;
								case 22:
									return 51;
								case 23:
									return 50;
								case 24:
									return 50;
								case 25:
									return 54;
								case 26:
									break;
								case 27:
									return this.popState(), 33;
								case 28:
									return this.popState(), 25;
								case 29:
									return e.yytext = s(1, 2).replace(/\\"/g, '"'), 42;
								case 30:
									return e.yytext = s(1, 2).replace(/\\'/g, "'"), 42;
								case 31:
									return 52;
								case 32:
									return 44;
								case 33:
									return 44;
								case 34:
									return 43;
								case 35:
									return 50;
								case 36:
									return e.yytext = s(1, 2), 50;
								case 37:
									return "INVALID";
								case 38:
									return 5
							}
						}, t.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{\/)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/], t.conditions = {
							mu: {
								rules: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
								inclusive: !1
							},
							emu: {
								rules: [2],
								inclusive: !1
							},
							com: {
								rules: [5],
								inclusive: !1
							},
							raw: {
								rules: [3, 4],
								inclusive: !1
							},
							INITIAL: {
								rules: [0, 1, 38],
								inclusive: !0
							}
						}, t
					}();
				return e.lexer = n, t.prototype = e, e.Parser = t, new t
			}();
			return t = e
		}(),
		h = function (t) {
			function e(t, e) {
				return {
					left: "~" === t.charAt(2),
					right: "~" === e.charAt(e.length - 3)
				}
			}

			function n(t, e, n, i, h, l) {
				if (t.sexpr.id.original !== i.path.original) throw new u(t.sexpr.id.original + " doesn't match " + i.path.original, t);
				var c = n && n.program,
					d = {
						left: t.strip.left,
						right: i.strip.right,
						openStandalone: r(e.statements),
						closeStandalone: s((c || e).statements)
					};
				if (t.strip.right && o(e.statements, null, !0), c) {
					var p = n.strip;
					p.left && a(e.statements, null, !0), p.right && o(c.statements, null, !0), i.strip.left && a(c.statements, null, !0), s(e.statements) && r(c.statements) && (a(e.statements), o(c.statements))
				} else i.strip.left && a(e.statements, null, !0);
				return h ? new this.BlockNode(t, c, e, d, l) : new this.BlockNode(t, e, c, d, l)
			}

			function i(t, e) {
				for (var n = 0, i = t.length; i > n; n++) {
					var h = t[n],
						u = h.strip;
					if (u) {
						var l = s(t, n, e, "partial" === h.type),
							c = r(t, n, e),
							d = u.openStandalone && l,
							p = u.closeStandalone && c,
							f = u.inlineStandalone && l && c;
						u.right && o(t, n, !0), u.left && a(t, n, !0), f && (o(t, n), a(t, n) && "partial" === h.type && (h.indent = /([ \t]+$)/.exec(t[n - 1].original) ? RegExp.$1 : "")), d && (o((h.program || h.inverse).statements), a(t, n)), p && (o(t, n), a((h.inverse || h.program).statements))
					}
				}
				return t
			}

			function s(t, e, n) {
				void 0 === e && (e = t.length);
				var i = t[e - 1],
					s = t[e - 2];
				return i ? "content" === i.type ? (s || !n ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(i.original) : void 0 : n
			}

			function r(t, e, n) {
				void 0 === e && (e = -1);
				var i = t[e + 1],
					s = t[e + 2];
				return i ? "content" === i.type ? (s || !n ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(i.original) : void 0 : n
			}

			function o(t, e, n) {
				var i = t[null == e ? 0 : e + 1];
				if (i && "content" === i.type && (n || !i.rightStripped)) {
					var s = i.string;
					i.string = i.string.replace(n ? /^\s+/ : /^[ \t]*\r?\n?/, ""), i.rightStripped = i.string !== s
				}
			}

			function a(t, e, n) {
				var i = t[null == e ? t.length - 1 : e - 1];
				if (i && "content" === i.type && (n || !i.leftStripped)) {
					var s = i.string;
					return i.string = i.string.replace(n ? /\s+$/ : /[ \t]+$/, ""), i.leftStripped = i.string !== s, i.leftStripped
				}
			}
			var h = {},
				u = t;
			return h.stripFlags = e, h.prepareBlock = n, h.prepareProgram = i, h
		}(n),
		u = function (t, e, n, i) {
			function s(t) {
				return t.constructor === a.ProgramNode ? t : (o.yy = l, o.parse(t))
			}
			var r = {},
				o = t,
				a = e,
				h = n,
				u = i.extend;
			r.parser = o;
			var l = {};
			return u(l, h, a), r.parse = s, r
		}(a, o, h, e),
		l = function (t, e) {
			function n() {}

			function i(t, e, n) {
				if (null == t || "string" != typeof t && t.constructor !== n.AST.ProgramNode) throw new a("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + t);
				e = e || {}, "data" in e || (e.data = !0), e.compat && (e.useDepths = !0);
				var i = n.parse(t),
					s = (new n.Compiler).compile(i, e);
				return (new n.JavaScriptCompiler).compile(s, e)
			}

			function s(t, e, n) {
				function i() {
					var i = n.parse(t),
						s = (new n.Compiler).compile(i, e),
						r = (new n.JavaScriptCompiler).compile(s, e, void 0, !0);
					return n.template(r)
				}
				if (null == t || "string" != typeof t && t.constructor !== n.AST.ProgramNode) throw new a("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + t);
				e = e || {}, "data" in e || (e.data = !0), e.compat && (e.useDepths = !0);
				var s, r = function (t, e) {
					return s || (s = i()), s.call(this, t, e)
				};
				return r._setup = function (t) {
					return s || (s = i()), s._setup(t)
				}, r._child = function (t, e, n) {
					return s || (s = i()), s._child(t, e, n)
				}, r
			}

			function r(t, e) {
				if (t === e) return !0;
				if (h(t) && h(e) && t.length === e.length) {
					for (var n = 0; n < t.length; n++)
						if (!r(t[n], e[n])) return !1;
					return !0
				}
			}
			var o = {},
				a = t,
				h = e.isArray,
				u = [].slice;
			return o.Compiler = n, n.prototype = {
				compiler: n,
				equals: function (t) {
					var e = this.opcodes.length;
					if (t.opcodes.length !== e) return !1;
					for (var n = 0; e > n; n++) {
						var i = this.opcodes[n],
							s = t.opcodes[n];
						if (i.opcode !== s.opcode || !r(i.args, s.args)) return !1
					}
					for (e = this.children.length, n = 0; e > n; n++)
						if (!this.children[n].equals(t.children[n])) return !1;
					return !0
				},
				guid: 0,
				compile: function (t, e) {
					this.opcodes = [], this.children = [], this.depths = {
						list: []
					}, this.options = e, this.stringParams = e.stringParams, this.trackIds = e.trackIds;
					var n = this.options.knownHelpers;
					if (this.options.knownHelpers = {
							helperMissing: !0,
							blockHelperMissing: !0,
							each: !0,
							if: !0,
							unless: !0,
							with: !0,
							log: !0,
							lookup: !0
						}, n)
						for (var i in n) this.options.knownHelpers[i] = n[i];
					return this.accept(t)
				},
				accept: function (t) {
					return this[t.type](t)
				},
				program: function (t) {
					for (var e = t.statements, n = 0, i = e.length; i > n; n++) this.accept(e[n]);
					return this.isSimple = 1 === i, this.depths.list = this.depths.list.sort(function (t, e) {
						return t - e
					}), this
				},
				compileProgram: function (t) {
					var e, n = (new this.compiler).compile(t, this.options),
						i = this.guid++;
					this.usePartial = this.usePartial || n.usePartial, this.children[i] = n;
					for (var s = 0, r = n.depths.list.length; r > s; s++) e = n.depths.list[s], 2 > e || this.addDepth(e - 1);
					return i
				},
				block: function (t) {
					var e = t.mustache,
						n = t.program,
						i = t.inverse;
					n && (n = this.compileProgram(n)), i && (i = this.compileProgram(i));
					var s = e.sexpr,
						r = this.classifySexpr(s);
					"helper" === r ? this.helperSexpr(s, n, i) : "simple" === r ? (this.simpleSexpr(s), this.opcode("pushProgram", n), this.opcode("pushProgram", i), this.opcode("emptyHash"), this.opcode("blockValue", s.id.original)) : (this.ambiguousSexpr(s, n, i), this.opcode("pushProgram", n), this.opcode("pushProgram", i), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
				},
				hash: function (t) {
					var e, n, i = t.pairs;
					for (this.opcode("pushHash"), e = 0, n = i.length; n > e; e++) this.pushParam(i[e][1]);
					for (; e--;) this.opcode("assignToHash", i[e][0]);
					this.opcode("popHash")
				},
				partial: function (t) {
					var e = t.partialName;
					this.usePartial = !0, t.hash ? this.accept(t.hash) : this.opcode("push", "undefined"), t.context ? this.accept(t.context) : (this.opcode("getContext", 0), this.opcode("pushContext")), this.opcode("invokePartial", e.name, t.indent || ""), this.opcode("append")
				},
				content: function (t) {
					t.string && this.opcode("appendContent", t.string)
				},
				mustache: function (t) {
					this.sexpr(t.sexpr), t.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
				},
				ambiguousSexpr: function (t, e, n) {
					var i = t.id,
						s = i.parts[0],
						r = null != e || null != n;
					this.opcode("getContext", i.depth), this.opcode("pushProgram", e), this.opcode("pushProgram", n), this.ID(i), this.opcode("invokeAmbiguous", s, r)
				},
				simpleSexpr: function (t) {
					var e = t.id;
					"DATA" === e.type ? this.DATA(e) : e.parts.length ? this.ID(e) : (this.addDepth(e.depth), this.opcode("getContext", e.depth), this.opcode("pushContext")), this.opcode("resolvePossibleLambda")
				},
				helperSexpr: function (t, e, n) {
					var i = this.setupFullMustacheParams(t, e, n),
						s = t.id,
						r = s.parts[0];
					if (this.options.knownHelpers[r]) this.opcode("invokeKnownHelper", i.length, r);
					else {
						if (this.options.knownHelpersOnly) throw new a("You specified knownHelpersOnly, but used the unknown helper " + r, t);
						s.falsy = !0, this.ID(s), this.opcode("invokeHelper", i.length, s.original, s.isSimple)
					}
				},
				sexpr: function (t) {
					var e = this.classifySexpr(t);
					"simple" === e ? this.simpleSexpr(t) : "helper" === e ? this.helperSexpr(t) : this.ambiguousSexpr(t)
				},
				ID: function (t) {
					this.addDepth(t.depth), this.opcode("getContext", t.depth);
					var e = t.parts[0];
					e ? this.opcode("lookupOnContext", t.parts, t.falsy, t.isScoped) : this.opcode("pushContext")
				},
				DATA: function (t) {
					this.options.data = !0, this.opcode("lookupData", t.id.depth, t.id.parts)
				},
				STRING: function (t) {
					this.opcode("pushString", t.string)
				},
				NUMBER: function (t) {
					this.opcode("pushLiteral", t.number)
				},
				BOOLEAN: function (t) {
					this.opcode("pushLiteral", t.bool)
				},
				comment: function () {},
				opcode: function (t) {
					this.opcodes.push({
						opcode: t,
						args: u.call(arguments, 1)
					})
				},
				addDepth: function (t) {
					0 !== t && (this.depths[t] || (this.depths[t] = !0, this.depths.list.push(t)))
				},
				classifySexpr: function (t) {
					var e = t.isHelper,
						n = t.eligibleHelper,
						i = this.options;
					if (n && !e) {
						var s = t.id.parts[0];
						i.knownHelpers[s] ? e = !0 : i.knownHelpersOnly && (n = !1)
					}
					return e ? "helper" : n ? "ambiguous" : "simple"
				},
				pushParams: function (t) {
					for (var e = 0, n = t.length; n > e; e++) this.pushParam(t[e])
				},
				pushParam: function (t) {
					this.stringParams ? (t.depth && this.addDepth(t.depth), this.opcode("getContext", t.depth || 0), this.opcode("pushStringParam", t.stringModeValue, t.type), "sexpr" === t.type && this.sexpr(t)) : (this.trackIds && this.opcode("pushId", t.type, t.idName || t.stringModeValue), this.accept(t))
				},
				setupFullMustacheParams: function (t, e, n) {
					var i = t.params;
					return this.pushParams(i), this.opcode("pushProgram", e), this.opcode("pushProgram", n), t.hash ? this.hash(t.hash) : this.opcode("emptyHash"), i
				}
			}, o.precompile = i, o.compile = s, o
		}(n, e),
		c = function (t, e) {
			function n(t) {
				this.value = t
			}

			function i() {}
			var s, r = t.COMPILER_REVISION,
				o = t.REVISION_CHANGES,
				a = e;
			i.prototype = {
				nameLookup: function (t, e) {
					return i.isValidJavaScriptVariableName(e) ? t + "." + e : t + "['" + e + "']"
				},
				depthedLookup: function (t) {
					return this.aliases.lookup = "this.lookup", 'lookup(depths, "' + t + '")'
				},
				compilerInfo: function () {
					var t = r,
						e = o[t];
					return [t, e]
				},
				appendToBuffer: function (t) {
					return this.environment.isSimple ? "return " + t + ";" : {
						appendToBuffer: !0,
						content: t,
						toString: function () {
							return "buffer += " + t + ";"
						}
					}
				},
				initializeBuffer: function () {
					return this.quotedString("")
				},
				namespace: "Handlebars",
				compile: function (t, e, n, i) {
					this.environment = t, this.options = e, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !i, this.name = this.environment.name, this.isChild = !!n, this.context = n || {
						programs: [],
						environments: []
					}, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = {
						list: []
					}, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.compileChildren(t, e), this.useDepths = this.useDepths || t.depths.list.length || this.options.compat;
					var s, r, o, h = t.opcodes;
					for (r = 0, o = h.length; o > r; r++) s = h[r], this[s.opcode].apply(this, s.args);
					if (this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new a("Compile completed with content left on stack");
					var u = this.createFunctionContext(i);
					if (this.isChild) return u;
					var l = {
							compiler: this.compilerInfo(),
							main: u
						},
						c = this.context.programs;
					for (r = 0, o = c.length; o > r; r++) c[r] && (l[r] = c[r]);
					return this.environment.usePartial && (l.usePartial = !0), this.options.data && (l.useData = !0), this.useDepths && (l.useDepths = !0), this.options.compat && (l.compat = !0), i || (l.compiler = JSON.stringify(l.compiler), l = this.objectLiteral(l)), l
				},
				preamble: function () {
					this.lastContext = 0, this.source = []
				},
				createFunctionContext: function (t) {
					var e = "",
						n = this.stackVars.concat(this.registers.list);
					n.length > 0 && (e += ", " + n.join(", "));
					for (var i in this.aliases) this.aliases.hasOwnProperty(i) && (e += ", " + i + "=" + this.aliases[i]);
					var s = ["depth0", "helpers", "partials", "data"];
					this.useDepths && s.push("depths");
					var r = this.mergeSource(e);
					return t ? (s.push(r), Function.apply(this, s)) : "function(" + s.join(",") + ") {\n  " + r + "}"
				},
				mergeSource: function (t) {
					for (var e, n, i = "", s = !this.forceBuffer, r = 0, o = this.source.length; o > r; r++) {
						var a = this.source[r];
						a.appendToBuffer ? e = e ? e + "\n    + " + a.content : a.content : (e && (i ? i += "buffer += " + e + ";\n  " : (n = !0, i = e + ";\n  "), e = void 0), i += a + "\n  ", this.environment.isSimple || (s = !1))
					}
					return s ? (e || !i) && (i += "return " + (e || '""') + ";\n") : (t += ", buffer = " + (n ? "" : this.initializeBuffer()), i += e ? "return buffer + " + e + ";\n" : "return buffer;\n"), t && (i = "var " + t.substring(2) + (n ? "" : ";\n  ") + i), i
				},
				blockValue: function (t) {
					this.aliases.blockHelperMissing = "helpers.blockHelperMissing";
					var e = [this.contextName(0)];
					this.setupParams(t, 0, e);
					var n = this.popStack();
					e.splice(1, 0, n), this.push("blockHelperMissing.call(" + e.join(", ") + ")")
				},
				ambiguousBlockValue: function () {
					this.aliases.blockHelperMissing = "helpers.blockHelperMissing";
					var t = [this.contextName(0)];
					this.setupParams("", 0, t, !0), this.flushInline();
					var e = this.topStack();
					t.splice(1, 0, e), this.pushSource("if (!" + this.lastHelper + ") { " + e + " = blockHelperMissing.call(" + t.join(", ") + "); }")
				},
				appendContent: function (t) {
					this.pendingContent && (t = this.pendingContent + t), this.pendingContent = t
				},
				append: function () {
					this.flushInline();
					var t = this.popStack();
					this.pushSource("if (" + t + " != null) { " + this.appendToBuffer(t) + " }"), this.environment.isSimple && this.pushSource("else { " + this.appendToBuffer("''") + " }")
				},
				appendEscaped: function () {
					this.aliases.escapeExpression = "this.escapeExpression", this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"))
				},
				getContext: function (t) {
					this.lastContext = t
				},
				pushContext: function () {
					this.pushStackLiteral(this.contextName(this.lastContext))
				},
				lookupOnContext: function (t, e, n) {
					var i = 0,
						s = t.length;
					for (n || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(t[i++])); s > i; i++) this.replaceStack(function (n) {
						var s = this.nameLookup(n, t[i], "context");
						return e ? " && " + s : " != null ? " + s + " : " + n
					})
				},
				lookupData: function (t, e) {
					t ? this.pushStackLiteral("this.data(data, " + t + ")") : this.pushStackLiteral("data");
					for (var n = e.length, i = 0; n > i; i++) this.replaceStack(function (t) {
						return " && " + this.nameLookup(t, e[i], "data")
					})
				},
				resolvePossibleLambda: function () {
					this.aliases.lambda = "this.lambda", this.push("lambda(" + this.popStack() + ", " + this.contextName(0) + ")")
				},
				pushStringParam: function (t, e) {
					this.pushContext(), this.pushString(e), "sexpr" !== e && ("string" == typeof t ? this.pushString(t) : this.pushStackLiteral(t))
				},
				emptyHash: function () {
					this.pushStackLiteral("{}"), this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}"))
				},
				pushHash: function () {
					this.hash && this.hashes.push(this.hash), this.hash = {
						values: [],
						types: [],
						contexts: [],
						ids: []
					}
				},
				popHash: function () {
					var t = this.hash;
					this.hash = this.hashes.pop(), this.trackIds && this.push("{" + t.ids.join(",") + "}"), this.stringParams && (this.push("{" + t.contexts.join(",") + "}"), this.push("{" + t.types.join(",") + "}")), this.push("{\n    " + t.values.join(",\n    ") + "\n  }")
				},
				pushString: function (t) {
					this.pushStackLiteral(this.quotedString(t))
				},
				push: function (t) {
					return this.inlineStack.push(t), t
				},
				pushLiteral: function (t) {
					this.pushStackLiteral(t)
				},
				pushProgram: function (t) {
					null != t ? this.pushStackLiteral(this.programExpression(t)) : this.pushStackLiteral(null)
				},
				invokeHelper: function (t, e, n) {
					this.aliases.helperMissing = "helpers.helperMissing";
					var i = this.popStack(),
						s = this.setupHelper(t, e),
						r = (n ? s.name + " || " : "") + i + " || helperMissing";
					this.push("((" + r + ").call(" + s.callParams + "))")
				},
				invokeKnownHelper: function (t, e) {
					var n = this.setupHelper(t, e);
					this.push(n.name + ".call(" + n.callParams + ")")
				},
				invokeAmbiguous: function (t, e) {
					this.aliases.functionType = '"function"', this.aliases.helperMissing = "helpers.helperMissing", this.useRegister("helper");
					var n = this.popStack();
					this.emptyHash();
					var i = this.setupHelper(0, t, e),
						s = this.lastHelper = this.nameLookup("helpers", t, "helper");
					this.push("((helper = (helper = " + s + " || " + n + ") != null ? helper : helperMissing" + (i.paramsInit ? "),(" + i.paramsInit : "") + "),(typeof helper === functionType ? helper.call(" + i.callParams + ") : helper))")
				},
				invokePartial: function (t, e) {
					var n = [this.nameLookup("partials", t, "partial"), "'" + e + "'", "'" + t + "'", this.popStack(), this.popStack(), "helpers", "partials"];
					this.options.data ? n.push("data") : this.options.compat && n.push("undefined"), this.options.compat && n.push("depths"), this.push("this.invokePartial(" + n.join(", ") + ")")
				},
				assignToHash: function (t) {
					var e, n, i, s = this.popStack();
					this.trackIds && (i = this.popStack()), this.stringParams && (n = this.popStack(), e = this.popStack());
					var r = this.hash;
					e && r.contexts.push("'" + t + "': " + e), n && r.types.push("'" + t + "': " + n), i && r.ids.push("'" + t + "': " + i), r.values.push("'" + t + "': (" + s + ")")
				},
				pushId: function (t, e) {
					"ID" === t || "DATA" === t ? this.pushString(e) : "sexpr" === t ? this.pushStackLiteral("true") : this.pushStackLiteral("null")
				},
				compiler: i,
				compileChildren: function (t, e) {
					for (var n, i, s = t.children, r = 0, o = s.length; o > r; r++) {
						n = s[r], i = new this.compiler;
						var a = this.matchExistingProgram(n);
						null == a ? (this.context.programs.push(""), a = this.context.programs.length, n.index = a, n.name = "program" + a, this.context.programs[a] = i.compile(n, e, this.context, !this.precompile), this.context.environments[a] = n, this.useDepths = this.useDepths || i.useDepths) : (n.index = a, n.name = "program" + a)
					}
				},
				matchExistingProgram: function (t) {
					for (var e = 0, n = this.context.environments.length; n > e; e++) {
						var i = this.context.environments[e];
						if (i && i.equals(t)) return e
					}
				},
				programExpression: function (t) {
					var e = this.environment.children[t],
						n = (e.depths.list, this.useDepths),
						i = [e.index, "data"];
					return n && i.push("depths"), "this.program(" + i.join(", ") + ")"
				},
				useRegister: function (t) {
					this.registers[t] || (this.registers[t] = !0, this.registers.list.push(t))
				},
				pushStackLiteral: function (t) {
					return this.push(new n(t))
				},
				pushSource: function (t) {
					this.pendingContent && (this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))), this.pendingContent = void 0), t && this.source.push(t)
				},
				pushStack: function (t) {
					this.flushInline();
					var e = this.incrStack();
					return this.pushSource(e + " = " + t + ";"), this.compileStack.push(e), e
				},
				replaceStack: function (t) {
					var e, i, s, r = "";
					if (this.isInline(), !this.isInline()) throw new a("replaceStack on non-inline");
					var o = this.popStack(!0);
					if (o instanceof n) r = e = o.value, s = !0;
					else {
						i = !this.stackSlot;
						var h = i ? this.incrStack() : this.topStackName();
						r = "(" + this.push(h) + " = " + o + ")", e = this.topStack()
					}
					var u = t.call(this, e);
					s || this.popStack(), i && this.stackSlot--, this.push("(" + r + u + ")")
				},
				incrStack: function () {
					return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
				},
				topStackName: function () {
					return "stack" + this.stackSlot
				},
				flushInline: function () {
					var t = this.inlineStack;
					if (t.length) {
						this.inlineStack = [];
						for (var e = 0, i = t.length; i > e; e++) {
							var s = t[e];
							s instanceof n ? this.compileStack.push(s) : this.pushStack(s)
						}
					}
				},
				isInline: function () {
					return this.inlineStack.length
				},
				popStack: function (t) {
					var e = this.isInline(),
						i = (e ? this.inlineStack : this.compileStack).pop();
					if (!t && i instanceof n) return i.value;
					if (!e) {
						if (!this.stackSlot) throw new a("Invalid stack pop");
						this.stackSlot--
					}
					return i
				},
				topStack: function () {
					var t = this.isInline() ? this.inlineStack : this.compileStack,
						e = t[t.length - 1];
					return e instanceof n ? e.value : e
				},
				contextName: function (t) {
					return this.useDepths && t ? "depths[" + t + "]" : "depth" + t
				},
				quotedString: function (t) {
					return '"' + t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
				},
				objectLiteral: function (t) {
					var e = [];
					for (var n in t) t.hasOwnProperty(n) && e.push(this.quotedString(n) + ":" + t[n]);
					return "{" + e.join(",") + "}"
				},
				setupHelper: function (t, e, n) {
					var i = [],
						s = this.setupParams(e, t, i, n),
						r = this.nameLookup("helpers", e, "helper");
					return {
						params: i,
						paramsInit: s,
						name: r,
						callParams: [this.contextName(0)].concat(i).join(", ")
					}
				},
				setupOptions: function (t, e, n) {
					var i, s, r, o = {},
						a = [],
						h = [],
						u = [];
					o.name = this.quotedString(t), o.hash = this.popStack(), this.trackIds && (o.hashIds = this.popStack()), this.stringParams && (o.hashTypes = this.popStack(), o.hashContexts = this.popStack()), s = this.popStack(), r = this.popStack(), (r || s) && (r || (r = "this.noop"), s || (s = "this.noop"), o.fn = r, o.inverse = s);
					for (var l = e; l--;) i = this.popStack(), n[l] = i, this.trackIds && (u[l] = this.popStack()), this.stringParams && (h[l] = this.popStack(), a[l] = this.popStack());
					return this.trackIds && (o.ids = "[" + u.join(",") + "]"), this.stringParams && (o.types = "[" + h.join(",") + "]", o.contexts = "[" + a.join(",") + "]"), this.options.data && (o.data = "data"), o
				},
				setupParams: function (t, e, n, i) {
					var s = this.objectLiteral(this.setupOptions(t, e, n));
					return i ? (this.useRegister("options"), n.push("options"), "options=" + s) : (n.push(s), "")
				}
			};
			for (var h = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "), u = i.RESERVED_WORDS = {}, l = 0, c = h.length; c > l; l++) u[h[l]] = !0;
			return i.isValidJavaScriptVariableName = function (t) {
				return !i.RESERVED_WORDS[t] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(t)
			}, s = i
		}(i, n),
		d = function (t, e, n, i, s) {
			var r, o = t,
				a = e,
				h = n.parser,
				u = n.parse,
				l = i.Compiler,
				c = i.compile,
				d = i.precompile,
				p = s,
				f = o.create,
				m = function () {
					var t = f();
					return t.compile = function (e, n) {
						return c(e, n, t)
					}, t.precompile = function (e, n) {
						return d(e, n, t)
					}, t.AST = a, t.Compiler = l, t.JavaScriptCompiler = p, t.Parser = h, t.parse = u, t
				};
			return o = m(), o.create = m, o.default = o, r = o
		}(r, o, u, l, c);
	return d
}), ! function () {
	function t(t) {
		return Array.prototype.slice.call(t)
	}

	function e(t) {
		return new Promise(function (e, n) {
			t.onsuccess = function () {
				e(t.result)
			}, t.onerror = function () {
				n(t.error)
			}
		})
	}

	function n(t, n, i) {
		var s, r = new Promise(function (r, o) {
			s = t[n].apply(t, i), e(s).then(r, o)
		});
		return r.request = s, r
	}

	function i(t, e, i) {
		var s = n(t, e, i);
		return s.then(function (t) {
			return t ? new u(t, s.request) : void 0
		})
	}

	function s(t, e, n) {
		n.forEach(function (n) {
			Object.defineProperty(t.prototype, n, {
				get: function () {
					return this[e][n]
				}
			})
		})
	}

	function r(t, e, i, s) {
		s.forEach(function (s) {
			s in i.prototype && (t.prototype[s] = function () {
				return n(this[e], s, arguments)
			})
		})
	}

	function o(t, e, n, i) {
		i.forEach(function (i) {
			i in n.prototype && (t.prototype[i] = function () {
				return this[e][i].apply(this[e], arguments)
			})
		})
	}

	function a(t, e, n, s) {
		s.forEach(function (s) {
			s in n.prototype && (t.prototype[s] = function () {
				return i(this[e], s, arguments)
			})
		})
	}

	function h(t) {
		this._index = t
	}

	function u(t, e) {
		this._cursor = t, this._request = e
	}

	function l(t) {
		this._store = t
	}

	function c(t) {
		this._tx = t, this.complete = new Promise(function (e, n) {
			t.oncomplete = function () {
				e()
			}, t.onerror = function () {
				n(t.error)
			}
		})
	}

	function d(t, e, n) {
		this._db = t, this.oldVersion = e, this.transaction = new c(n)
	}

	function p(t) {
		this._db = t
	}
	s(h, "_index", ["name", "keyPath", "multiEntry", "unique"]), r(h, "_index", IDBIndex, ["get", "getKey", "getAll", "getAllKeys", "count"]), a(h, "_index", IDBIndex, ["openCursor", "openKeyCursor"]), s(u, "_cursor", ["direction", "key", "primaryKey", "value"]), r(u, "_cursor", IDBCursor, ["update", "delete"]), ["advance", "continue", "continuePrimaryKey"].forEach(function (t) {
		t in IDBCursor.prototype && (u.prototype[t] = function () {
			var n = this,
				i = arguments;
			return Promise.resolve().then(function () {
				return n._cursor[t].apply(n._cursor, i), e(n._request).then(function (t) {
					return t ? new u(t, n._request) : void 0
				})
			})
		})
	}), l.prototype.createIndex = function () {
		return new h(this._store.createIndex.apply(this._store, arguments))
	}, l.prototype.index = function () {
		return new h(this._store.index.apply(this._store, arguments))
	}, s(l, "_store", ["name", "keyPath", "indexNames", "autoIncrement"]), r(l, "_store", IDBObjectStore, ["put", "add", "delete", "clear", "get", "getAll", "getAllKeys", "count"]), a(l, "_store", IDBObjectStore, ["openCursor", "openKeyCursor"]), o(l, "_store", IDBObjectStore, ["deleteIndex"]), c.prototype.objectStore = function () {
		return new l(this._tx.objectStore.apply(this._tx, arguments))
	}, s(c, "_tx", ["objectStoreNames", "mode"]), o(c, "_tx", IDBTransaction, ["abort"]), d.prototype.createObjectStore = function () {
		return new l(this._db.createObjectStore.apply(this._db, arguments))
	}, s(d, "_db", ["name", "version", "objectStoreNames"]), o(d, "_db", IDBDatabase, ["deleteObjectStore", "close"]), p.prototype.transaction = function () {
		return new c(this._db.transaction.apply(this._db, arguments))
	}, s(p, "_db", ["name", "version", "objectStoreNames"]), o(p, "_db", IDBDatabase, ["close"]), ["openCursor", "openKeyCursor"].forEach(function (e) {
		[l, h].forEach(function (n) {
			n.prototype[e.replace("open", "iterate")] = function () {
				var n = t(arguments),
					i = n[n.length - 1],
					s = (this._store || this._index)[e].apply(this._store, n.slice(0, -1));
				s.onsuccess = function () {
					i(s.result)
				}
			}
		})
	}), [h, l].forEach(function (t) {
		t.prototype.getAll || (t.prototype.getAll = function (t, e) {
			var n = this,
				i = [];
			return new Promise(function (s) {
				n.iterateCursor(t, function (t) {
					return t ? (i.push(t.value), void 0 !== e && i.length == e ? void s(i) : void t.continue()) : void s(i)
				})
			})
		})
	});
	var f = {
		open: function (t, e, i) {
			var s = n(indexedDB, "open", [t, e]),
				r = s.request;
			return r.onupgradeneeded = function (t) {
				i && i(new d(r.result, t.oldVersion, r.transaction))
			}, s.then(function (t) {
				return new p(t)
			})
		},
		delete: function (t) {
			return n(indexedDB, "deleteDatabase", [t])
		}
	};
	"undefined" != typeof module ? module.exports = f : self.idb = f
}(), ! function (t, e) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.moment = e()
}(this, function () {
	function t() {
		return oi.apply(null, arguments)
	}

	function e(t) {
		oi = t
	}

	function n(t) {
		return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t)
	}

	function i(t) {
		return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
	}

	function s(t, e) {
		var n, i = [];
		for (n = 0; n < t.length; ++n) i.push(e(t[n], n));
		return i
	}

	function r(t, e) {
		return Object.prototype.hasOwnProperty.call(t, e)
	}

	function o(t, e) {
		for (var n in e) r(e, n) && (t[n] = e[n]);
		return r(e, "toString") && (t.toString = e.toString), r(e, "valueOf") && (t.valueOf = e.valueOf), t
	}

	function a(t, e, n, i) {
		return Rt(t, e, n, i, !0).utc()
	}

	function h() {
		return {
			empty: !1,
			unusedTokens: [],
			unusedInput: [],
			overflow: -2,
			charsLeftOver: 0,
			nullInput: !1,
			invalidMonth: null,
			invalidFormat: !1,
			userInvalidated: !1,
			iso: !1,
			parsedDateParts: [],
			meridiem: null
		}
	}

	function u(t) {
		return null == t._pf && (t._pf = h()), t._pf
	}

	function l(t) {
		if (null == t._isValid) {
			var e = u(t),
				n = ai.call(e.parsedDateParts, function (t) {
					return null != t
				});
			t._isValid = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && n), t._strict && (t._isValid = t._isValid && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour)
		}
		return t._isValid
	}

	function c(t) {
		var e = a(NaN);
		return null != t ? o(u(e), t) : u(e).userInvalidated = !0, e
	}

	function d(t) {
		return void 0 === t
	}

	function p(t, e) {
		var n, i, s;
		if (d(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), d(e._i) || (t._i = e._i), d(e._f) || (t._f = e._f), d(e._l) || (t._l = e._l), d(e._strict) || (t._strict = e._strict), d(e._tzm) || (t._tzm = e._tzm), d(e._isUTC) || (t._isUTC = e._isUTC), d(e._offset) || (t._offset = e._offset), d(e._pf) || (t._pf = u(e)), d(e._locale) || (t._locale = e._locale), hi.length > 0)
			for (n in hi) i = hi[n], s = e[i], d(s) || (t[i] = s);
		return t
	}

	function f(e) {
		p(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), ui === !1 && (ui = !0, t.updateOffset(this), ui = !1)
	}

	function m(t) {
		return t instanceof f || null != t && null != t._isAMomentObject
	}

	function y(t) {
		return 0 > t ? Math.ceil(t) : Math.floor(t)
	}

	function g(t) {
		var e = +t,
			n = 0;
		return 0 !== e && isFinite(e) && (n = y(e)), n
	}

	function _(t, e, n) {
		var i, s = Math.min(t.length, e.length),
			r = Math.abs(t.length - e.length),
			o = 0;
		for (i = 0; s > i; i++)(n && t[i] !== e[i] || !n && g(t[i]) !== g(e[i])) && o++;
		return o + r
	}

	function v(e) {
		t.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
	}

	function S(e, n) {
		var i = !0;
		return o(function () {
			return null != t.deprecationHandler && t.deprecationHandler(null, e), i && (v(e + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack), i = !1), n.apply(this, arguments)
		}, n)
	}

	function k(e, n) {
		null != t.deprecationHandler && t.deprecationHandler(e, n), li[e] || (v(n), li[e] = !0)
	}

	function w(t) {
		return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t)
	}

	function b(t) {
		return "[object Object]" === Object.prototype.toString.call(t)
	}

	function x(t) {
		var e, n;
		for (n in t) e = t[n], w(e) ? this[n] = e : this["_" + n] = e;
		this._config = t, this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
	}

	function D(t, e) {
		var n, i = o({}, t);
		for (n in e) r(e, n) && (b(t[n]) && b(e[n]) ? (i[n] = {}, o(i[n], t[n]), o(i[n], e[n])) : null != e[n] ? i[n] = e[n] : delete i[n]);
		return i
	}

	function P(t) {
		null != t && this.set(t)
	}

	function M(t) {
		return t ? t.toLowerCase().replace("_", "-") : t
	}

	function O(t) {
		for (var e, n, i, s, r = 0; r < t.length;) {
			for (s = M(t[r]).split("-"), e = s.length, n = M(t[r + 1]), n = n ? n.split("-") : null; e > 0;) {
				if (i = E(s.slice(0, e).join("-"))) return i;
				if (n && n.length >= e && _(s, n, !0) >= e - 1) break;
				e--
			}
			r++
		}
		return null
	}

	function E(t) {
		var e = null;
		if (!fi[t] && "undefined" != typeof module && module && module.exports) try {
			e = di._abbr, require("./locale/" + t), Y(e)
		} catch (t) {}
		return fi[t]
	}

	function Y(t, e) {
		var n;
		return t && (n = d(e) ? C(t) : T(t, e), n && (di = n)), di._abbr
	}

	function T(t, e) {
		return null !== e ? (e.abbr = t, null != fi[t] ? (k("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"), e = D(fi[t]._config, e)) : null != e.parentLocale && (null != fi[e.parentLocale] ? e = D(fi[e.parentLocale]._config, e) : k("parentLocaleUndefined", "specified parentLocale is not defined yet")), fi[t] = new P(e), Y(t), fi[t]) : (delete fi[t], null)
	}

	function N(t, e) {
		if (null != e) {
			var n;
			null != fi[t] && (e = D(fi[t]._config, e)), n = new P(e), n.parentLocale = fi[t], fi[t] = n, Y(t)
		} else null != fi[t] && (null != fi[t].parentLocale ? fi[t] = fi[t].parentLocale : null != fi[t] && delete fi[t]);
		return fi[t]
	}

	function C(t) {
		var e;
		if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return di;
		if (!n(t)) {
			if (e = E(t)) return e;
			t = [t]
		}
		return O(t)
	}

	function I() {
		return ci(fi)
	}

	function R(t, e) {
		var n = t.toLowerCase();
		mi[n] = mi[n + "s"] = mi[e] = t
	}

	function H(t) {
		return "string" == typeof t ? mi[t] || mi[t.toLowerCase()] : void 0
	}

	function A(t) {
		var e, n, i = {};
		for (n in t) r(t, n) && (e = H(n), e && (i[e] = t[n]));
		return i
	}

	function L(e, n) {
		return function (i) {
			return null != i ? (U(this, e, i), t.updateOffset(this, n), this) : W(this, e)
		}
	}

	function W(t, e) {
		return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN
	}

	function U(t, e, n) {
		t.isValid() && t._d["set" + (t._isUTC ? "UTC" : "") + e](n)
	}

	function F(t, e) {
		var n;
		if ("object" == typeof t)
			for (n in t) this.set(n, t[n]);
		else if (t = H(t), w(this[t])) return this[t](e);
		return this
	}

	function B(t, e, n) {
		var i = "" + Math.abs(t),
			s = e - i.length,
			r = t >= 0;
		return (r ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + i
	}

	function $(t, e, n, i) {
		var s = i;
		"string" == typeof i && (s = function () {
			return this[i]()
		}), t && (vi[t] = s), e && (vi[e[0]] = function () {
			return B(s.apply(this, arguments), e[1], e[2])
		}), n && (vi[n] = function () {
			return this.localeData().ordinal(s.apply(this, arguments), t)
		})
	}

	function V(t) {
		return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
	}

	function j(t) {
		var e, n, i = t.match(yi);
		for (e = 0, n = i.length; n > e; e++) vi[i[e]] ? i[e] = vi[i[e]] : i[e] = V(i[e]);
		return function (e) {
			var s, r = "";
			for (s = 0; n > s; s++) r += i[s] instanceof Function ? i[s].call(e, t) : i[s];
			return r
		}
	}

	function G(t, e) {
		return t.isValid() ? (e = q(e, t.localeData()), _i[e] = _i[e] || j(e), _i[e](t)) : t.localeData().invalidDate()
	}

	function q(t, e) {
		function n(t) {
			return e.longDateFormat(t) || t
		}
		var i = 5;
		for (gi.lastIndex = 0; i >= 0 && gi.test(t);) t = t.replace(gi, n), gi.lastIndex = 0, i -= 1;
		return t
	}

	function z(t, e, n) {
		Ai[t] = w(e) ? e : function (t, i) {
			return t && n ? n : e
		}
	}

	function Z(t, e) {
		return r(Ai, t) ? Ai[t](e._strict, e._locale) : new RegExp(K(t))
	}

	function K(t) {
		return J(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, n, i, s) {
			return e || n || i || s
		}))
	}

	function J(t) {
		return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
	}

	function X(t, e) {
		var n, i = e;
		for ("string" == typeof t && (t = [t]), "number" == typeof e && (i = function (t, n) {
				n[e] = g(t)
			}), n = 0; n < t.length; n++) Li[t[n]] = i
	}

	function Q(t, e) {
		X(t, function (t, n, i, s) {
			i._w = i._w || {}, e(t, i._w, i, s)
		})
	}

	function tt(t, e, n) {
		null != e && r(Li, t) && Li[t](e, n._a, n, t)
	}

	function et(t, e) {
		return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
	}

	function nt(t, e) {
		return n(this._months) ? this._months[t.month()] : this._months[zi.test(e) ? "format" : "standalone"][t.month()]
	}

	function it(t, e) {
		return n(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[zi.test(e) ? "format" : "standalone"][t.month()]
	}

	function st(t, e, n) {
		var i, s, r, o = t.toLocaleLowerCase();
		if (!this._monthsParse)
			for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], i = 0; 12 > i; ++i) r = a([2e3, i]), this._shortMonthsParse[i] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[i] = this.months(r, "").toLocaleLowerCase();
		return n ? "MMM" === e ? (s = pi.call(this._shortMonthsParse, o), -1 !== s ? s : null) : (s = pi.call(this._longMonthsParse, o), -1 !== s ? s : null) : "MMM" === e ? (s = pi.call(this._shortMonthsParse, o), -1 !== s ? s : (s = pi.call(this._longMonthsParse, o), -1 !== s ? s : null)) : (s = pi.call(this._longMonthsParse, o), -1 !== s ? s : (s = pi.call(this._shortMonthsParse, o), -1 !== s ? s : null))
	}

	function rt(t, e, n) {
		var i, s, r;
		if (this._monthsParseExact) return st.call(this, t, e, n);
		for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; 12 > i; i++) {
			if (s = a([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(s, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(s, "").replace(".", "") + "$", "i")), n || this._monthsParse[i] || (r = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""), this._monthsParse[i] = new RegExp(r.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[i].test(t)) return i;
			if (n && "MMM" === e && this._shortMonthsParse[i].test(t)) return i;
			if (!n && this._monthsParse[i].test(t)) return i
		}
	}

	function ot(t, e) {
		var n;
		if (!t.isValid()) return t;
		if ("string" == typeof e)
			if (/^\d+$/.test(e)) e = g(e);
			else if (e = t.localeData().monthsParse(e), "number" != typeof e) return t;
		return n = Math.min(t.date(), et(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t
	}

	function at(e) {
		return null != e ? (ot(this, e), t.updateOffset(this, !0), this) : W(this, "Month")
	}

	function ht() {
		return et(this.year(), this.month())
	}

	function ut(t) {
		return this._monthsParseExact ? (r(this, "_monthsRegex") || ct.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex
	}

	function lt(t) {
		return this._monthsParseExact ? (r(this, "_monthsRegex") || ct.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex
	}

	function ct() {
		function t(t, e) {
			return e.length - t.length
		}
		var e, n, i = [],
			s = [],
			r = [];
		for (e = 0; 12 > e; e++) n = a([2e3, e]), i.push(this.monthsShort(n, "")), s.push(this.months(n, "")), r.push(this.months(n, "")), r.push(this.monthsShort(n, ""));
		for (i.sort(t), s.sort(t), r.sort(t), e = 0; 12 > e; e++) i[e] = J(i[e]), s[e] = J(s[e]), r[e] = J(r[e]);
		this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i")
	}

	function dt(t) {
		var e, n = t._a;
		return n && -2 === u(t).overflow && (e = n[Ui] < 0 || n[Ui] > 11 ? Ui : n[Fi] < 1 || n[Fi] > et(n[Wi], n[Ui]) ? Fi : n[Bi] < 0 || n[Bi] > 24 || 24 === n[Bi] && (0 !== n[$i] || 0 !== n[Vi] || 0 !== n[ji]) ? Bi : n[$i] < 0 || n[$i] > 59 ? $i : n[Vi] < 0 || n[Vi] > 59 ? Vi : n[ji] < 0 || n[ji] > 999 ? ji : -1, u(t)._overflowDayOfYear && (Wi > e || e > Fi) && (e = Fi), u(t)._overflowWeeks && -1 === e && (e = Gi), u(t)._overflowWeekday && -1 === e && (e = qi), u(t).overflow = e), t
	}

	function pt(t) {
		var e, n, i, s, r, o, a = t._i,
			h = Qi.exec(a) || ts.exec(a);
		if (h) {
			for (u(t).iso = !0, e = 0, n = ns.length; n > e; e++)
				if (ns[e][1].exec(h[1])) {
					s = ns[e][0], i = ns[e][2] !== !1;
					break
				}
			if (null == s) return void(t._isValid = !1);
			if (h[3]) {
				for (e = 0, n = is.length; n > e; e++)
					if (is[e][1].exec(h[3])) {
						r = (h[2] || " ") + is[e][0];
						break
					}
				if (null == r) return void(t._isValid = !1)
			}
			if (!i && null != r) return void(t._isValid = !1);
			if (h[4]) {
				if (!es.exec(h[4])) return void(t._isValid = !1);
				o = "Z"
			}
			t._f = s + (r || "") + (o || ""), Ot(t)
		} else t._isValid = !1
	}

	function ft(e) {
		var n = ss.exec(e._i);
		return null !== n ? void(e._d = new Date(+n[1])) : (pt(e), void(e._isValid === !1 && (delete e._isValid, t.createFromInputFallback(e))))
	}

	function mt(t, e, n, i, s, r, o) {
		var a = new Date(t, e, n, i, s, r, o);
		return 100 > t && t >= 0 && isFinite(a.getFullYear()) && a.setFullYear(t), a
	}

	function yt(t) {
		var e = new Date(Date.UTC.apply(null, arguments));
		return 100 > t && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e
	}

	function gt(t) {
		return _t(t) ? 366 : 365
	}

	function _t(t) {
		return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
	}

	function vt() {
		return _t(this.year())
	}

	function St(t, e, n) {
		var i = 7 + e - n,
			s = (7 + yt(t, 0, i).getUTCDay() - e) % 7;
		return -s + i - 1
	}

	function kt(t, e, n, i, s) {
		var r, o, a = (7 + n - i) % 7,
			h = St(t, i, s),
			u = 1 + 7 * (e - 1) + a + h;
		return 0 >= u ? (r = t - 1, o = gt(r) + u) : u > gt(t) ? (r = t + 1, o = u - gt(t)) : (r = t, o = u), {
			year: r,
			dayOfYear: o
		}
	}

	function wt(t, e, n) {
		var i, s, r = St(t.year(), e, n),
			o = Math.floor((t.dayOfYear() - r - 1) / 7) + 1;
		return 1 > o ? (s = t.year() - 1, i = o + bt(s, e, n)) : o > bt(t.year(), e, n) ? (i = o - bt(t.year(), e, n), s = t.year() + 1) : (s = t.year(), i = o), {
			week: i,
			year: s
		}
	}

	function bt(t, e, n) {
		var i = St(t, e, n),
			s = St(t + 1, e, n);
		return (gt(t) - i + s) / 7
	}

	function xt(t, e, n) {
		return null != t ? t : null != e ? e : n
	}

	function Dt(e) {
		var n = new Date(t.now());
		return e._useUTC ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()] : [n.getFullYear(), n.getMonth(), n.getDate()]
	}

	function Pt(t) {
		var e, n, i, s, r = [];
		if (!t._d) {
			for (i = Dt(t), t._w && null == t._a[Fi] && null == t._a[Ui] && Mt(t), t._dayOfYear && (s = xt(t._a[Wi], i[Wi]), t._dayOfYear > gt(s) && (u(t)._overflowDayOfYear = !0), n = yt(s, 0, t._dayOfYear), t._a[Ui] = n.getUTCMonth(), t._a[Fi] = n.getUTCDate()), e = 0; 3 > e && null == t._a[e]; ++e) t._a[e] = r[e] = i[e];
			for (; 7 > e; e++) t._a[e] = r[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
			24 === t._a[Bi] && 0 === t._a[$i] && 0 === t._a[Vi] && 0 === t._a[ji] && (t._nextDay = !0, t._a[Bi] = 0), t._d = (t._useUTC ? yt : mt).apply(null, r), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[Bi] = 24)
		}
	}

	function Mt(t) {
		var e, n, i, s, r, o, a, h;
		e = t._w, null != e.GG || null != e.W || null != e.E ? (r = 1, o = 4, n = xt(e.GG, t._a[Wi], wt(Ht(), 1, 4).year), i = xt(e.W, 1), s = xt(e.E, 1), (1 > s || s > 7) && (h = !0)) : (r = t._locale._week.dow, o = t._locale._week.doy, n = xt(e.gg, t._a[Wi], wt(Ht(), r, o).year), i = xt(e.w, 1), null != e.d ? (s = e.d, (0 > s || s > 6) && (h = !0)) : null != e.e ? (s = e.e + r, (e.e < 0 || e.e > 6) && (h = !0)) : s = r), 1 > i || i > bt(n, r, o) ? u(t)._overflowWeeks = !0 : null != h ? u(t)._overflowWeekday = !0 : (a = kt(n, i, s, r, o), t._a[Wi] = a.year, t._dayOfYear = a.dayOfYear)
	}

	function Ot(e) {
		if (e._f === t.ISO_8601) return void pt(e);
		e._a = [], u(e).empty = !0;
		var n, i, s, r, o, a = "" + e._i,
			h = a.length,
			l = 0;
		for (s = q(e._f, e._locale).match(yi) || [], n = 0; n < s.length; n++) r = s[n], i = (a.match(Z(r, e)) || [])[0], i && (o = a.substr(0, a.indexOf(i)), o.length > 0 && u(e).unusedInput.push(o), a = a.slice(a.indexOf(i) + i.length), l += i.length), vi[r] ? (i ? u(e).empty = !1 : u(e).unusedTokens.push(r), tt(r, i, e)) : e._strict && !i && u(e).unusedTokens.push(r);
		u(e).charsLeftOver = h - l, a.length > 0 && u(e).unusedInput.push(a), u(e).bigHour === !0 && e._a[Bi] <= 12 && e._a[Bi] > 0 && (u(e).bigHour = void 0), u(e).parsedDateParts = e._a.slice(0), u(e).meridiem = e._meridiem, e._a[Bi] = Et(e._locale, e._a[Bi], e._meridiem), Pt(e), dt(e)
	}

	function Et(t, e, n) {
		var i;
		return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? (i = t.isPM(n), i && 12 > e && (e += 12), i || 12 !== e || (e = 0), e) : e
	}

	function Yt(t) {
		var e, n, i, s, r;
		if (0 === t._f.length) return u(t).invalidFormat = !0, void(t._d = new Date(NaN));
		for (s = 0; s < t._f.length; s++) r = 0, e = p({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[s], Ot(e), l(e) && (r += u(e).charsLeftOver, r += 10 * u(e).unusedTokens.length, u(e).score = r, (null == i || i > r) && (i = r, n = e));
		o(t, n || e)
	}

	function Tt(t) {
		if (!t._d) {
			var e = A(t._i);
			t._a = s([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function (t) {
				return t && parseInt(t, 10)
			}), Pt(t)
		}
	}

	function Nt(t) {
		var e = new f(dt(Ct(t)));
		return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e
	}

	function Ct(t) {
		var e = t._i,
			s = t._f;
		return t._locale = t._locale || C(t._l), null === e || void 0 === s && "" === e ? c({
			nullInput: !0
		}) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), m(e) ? new f(dt(e)) : (n(s) ? Yt(t) : s ? Ot(t) : i(e) ? t._d = e : It(t), l(t) || (t._d = null), t))
	}

	function It(e) {
		var r = e._i;
		void 0 === r ? e._d = new Date(t.now()) : i(r) ? e._d = new Date(r.valueOf()) : "string" == typeof r ? ft(e) : n(r) ? (e._a = s(r.slice(0), function (t) {
			return parseInt(t, 10)
		}), Pt(e)) : "object" == typeof r ? Tt(e) : "number" == typeof r ? e._d = new Date(r) : t.createFromInputFallback(e)
	}

	function Rt(t, e, n, i, s) {
		var r = {};
		return "boolean" == typeof n && (i = n, n = void 0), r._isAMomentObject = !0, r._useUTC = r._isUTC = s, r._l = n, r._i = t, r._f = e, r._strict = i, Nt(r)
	}

	function Ht(t, e, n, i) {
		return Rt(t, e, n, i, !1)
	}

	function At(t, e) {
		var i, s;
		if (1 === e.length && n(e[0]) && (e = e[0]), !e.length) return Ht();
		for (i = e[0], s = 1; s < e.length; ++s)(!e[s].isValid() || e[s][t](i)) && (i = e[s]);
		return i
	}

	function Lt() {
		var t = [].slice.call(arguments, 0);
		return At("isBefore", t)
	}

	function Wt() {
		var t = [].slice.call(arguments, 0);
		return At("isAfter", t)
	}

	function Ut(t) {
		var e = A(t),
			n = e.year || 0,
			i = e.quarter || 0,
			s = e.month || 0,
			r = e.week || 0,
			o = e.day || 0,
			a = e.hour || 0,
			h = e.minute || 0,
			u = e.second || 0,
			l = e.millisecond || 0;
		this._milliseconds = +l + 1e3 * u + 6e4 * h + 1e3 * a * 60 * 60, this._days = +o + 7 * r, this._months = +s + 3 * i + 12 * n, this._data = {}, this._locale = C(), this._bubble()
	}

	function Ft(t) {
		return t instanceof Ut
	}

	function Bt(t, e) {
		$(t, 0, 0, function () {
			var t = this.utcOffset(),
				n = "+";
			return 0 > t && (t = -t, n = "-"), n + B(~~(t / 60), 2) + e + B(~~t % 60, 2)
		})
	}

	function $t(t, e) {
		var n = (e || "").match(t) || [],
			i = n[n.length - 1] || [],
			s = (i + "").match(us) || ["-", 0, 0],
			r = +(60 * s[1]) + g(s[2]);
		return "+" === s[0] ? r : -r
	}

	function Vt(e, n) {
		var s, r;
		return n._isUTC ? (s = n.clone(), r = (m(e) || i(e) ? e.valueOf() : Ht(e).valueOf()) - s.valueOf(), s._d.setTime(s._d.valueOf() + r), t.updateOffset(s, !1), s) : Ht(e).local()
	}

	function jt(t) {
		return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
	}

	function Gt(e, n) {
		var i, s = this._offset || 0;
		return this.isValid() ? null != e ? ("string" == typeof e ? e = $t(Ii, e) : Math.abs(e) < 16 && (e = 60 * e), !this._isUTC && n && (i = jt(this)), this._offset = e, this._isUTC = !0, null != i && this.add(i, "m"), s !== e && (!n || this._changeInProgress ? ue(this, ie(e - s, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, t.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? s : jt(this) : null != e ? this : NaN
	}

	function qt(t, e) {
		return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
	}

	function zt(t) {
		return this.utcOffset(0, t)
	}

	function Zt(t) {
		return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(jt(this), "m")), this
	}

	function Kt() {
		return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset($t(Ci, this._i)), this
	}

	function Jt(t) {
		return !!this.isValid() && (t = t ? Ht(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0)
	}

	function Xt() {
		return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
	}

	function Qt() {
		if (!d(this._isDSTShifted)) return this._isDSTShifted;
		var t = {};
		if (p(t, this), t = Ct(t), t._a) {
			var e = t._isUTC ? a(t._a) : Ht(t._a);
			this._isDSTShifted = this.isValid() && _(t._a, e.toArray()) > 0
		} else this._isDSTShifted = !1;
		return this._isDSTShifted
	}

	function te() {
		return !!this.isValid() && !this._isUTC
	}

	function ee() {
		return !!this.isValid() && this._isUTC
	}

	function ne() {
		return !!this.isValid() && (this._isUTC && 0 === this._offset)
	}

	function ie(t, e) {
		var n, i, s, o = t,
			a = null;
		return Ft(t) ? o = {
			ms: t._milliseconds,
			d: t._days,
			M: t._months
		} : "number" == typeof t ? (o = {}, e ? o[e] = t : o.milliseconds = t) : (a = ls.exec(t)) ? (n = "-" === a[1] ? -1 : 1, o = {
			y: 0,
			d: g(a[Fi]) * n,
			h: g(a[Bi]) * n,
			m: g(a[$i]) * n,
			s: g(a[Vi]) * n,
			ms: g(a[ji]) * n
		}) : (a = cs.exec(t)) ? (n = "-" === a[1] ? -1 : 1, o = {
			y: se(a[2], n),
			M: se(a[3], n),
			w: se(a[4], n),
			d: se(a[5], n),
			h: se(a[6], n),
			m: se(a[7], n),
			s: se(a[8], n)
		}) : null == o ? o = {} : "object" == typeof o && ("from" in o || "to" in o) && (s = oe(Ht(o.from), Ht(o.to)), o = {}, o.ms = s.milliseconds, o.M = s.months), i = new Ut(o), Ft(t) && r(t, "_locale") && (i._locale = t._locale), i
	}

	function se(t, e) {
		var n = t && parseFloat(t.replace(",", "."));
		return (isNaN(n) ? 0 : n) * e
	}

	function re(t, e) {
		var n = {
			milliseconds: 0,
			months: 0
		};
		return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, n.milliseconds = +e - +t.clone().add(n.months, "M"), n
	}

	function oe(t, e) {
		var n;
		return t.isValid() && e.isValid() ? (e = Vt(e, t), t.isBefore(e) ? n = re(t, e) : (n = re(e, t), n.milliseconds = -n.milliseconds, n.months = -n.months), n) : {
			milliseconds: 0,
			months: 0
		}
	}

	function ae(t) {
		return 0 > t ? -1 * Math.round(-1 * t) : Math.round(t)
	}

	function he(t, e) {
		return function (n, i) {
			var s, r;
			return null === i || isNaN(+i) || (k(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."), r = n, n = i, i = r), n = "string" == typeof n ? +n : n, s = ie(n, i), ue(this, s, t), this
		}
	}

	function ue(e, n, i, s) {
		var r = n._milliseconds,
			o = ae(n._days),
			a = ae(n._months);
		e.isValid() && (s = null == s || s, r && e._d.setTime(e._d.valueOf() + r * i), o && U(e, "Date", W(e, "Date") + o * i), a && ot(e, W(e, "Month") + a * i), s && t.updateOffset(e, o || a))
	}

	function le(t, e) {
		var n = t || Ht(),
			i = Vt(n, this).startOf("day"),
			s = this.diff(i, "days", !0),
			r = -6 > s ? "sameElse" : -1 > s ? "lastWeek" : 0 > s ? "lastDay" : 1 > s ? "sameDay" : 2 > s ? "nextDay" : 7 > s ? "nextWeek" : "sameElse",
			o = e && (w(e[r]) ? e[r]() : e[r]);
		return this.format(o || this.localeData().calendar(r, this, Ht(n)))
	}

	function ce() {
		return new f(this)
	}

	function de(t, e) {
		var n = m(t) ? t : Ht(t);
		return !(!this.isValid() || !n.isValid()) && (e = H(d(e) ? "millisecond" : e), "millisecond" === e ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(e).valueOf())
	}

	function pe(t, e) {
		var n = m(t) ? t : Ht(t);
		return !(!this.isValid() || !n.isValid()) && (e = H(d(e) ? "millisecond" : e), "millisecond" === e ? this.valueOf() < n.valueOf() : this.clone().endOf(e).valueOf() < n.valueOf())
	}

	function fe(t, e, n, i) {
		return i = i || "()", ("(" === i[0] ? this.isAfter(t, n) : !this.isBefore(t, n)) && (")" === i[1] ? this.isBefore(e, n) : !this.isAfter(e, n))
	}

	function me(t, e) {
		var n, i = m(t) ? t : Ht(t);
		return !(!this.isValid() || !i.isValid()) && (e = H(e || "millisecond"), "millisecond" === e ? this.valueOf() === i.valueOf() : (n = i.valueOf(), this.clone().startOf(e).valueOf() <= n && n <= this.clone().endOf(e).valueOf()))
	}

	function ye(t, e) {
		return this.isSame(t, e) || this.isAfter(t, e)
	}

	function ge(t, e) {
		return this.isSame(t, e) || this.isBefore(t, e)
	}

	function _e(t, e, n) {
		var i, s, r, o;
		return this.isValid() ? (i = Vt(t, this), i.isValid() ? (s = 6e4 * (i.utcOffset() - this.utcOffset()), e = H(e), "year" === e || "month" === e || "quarter" === e ? (o = ve(this, i), "quarter" === e ? o /= 3 : "year" === e && (o /= 12)) : (r = this - i, o = "second" === e ? r / 1e3 : "minute" === e ? r / 6e4 : "hour" === e ? r / 36e5 : "day" === e ? (r - s) / 864e5 : "week" === e ? (r - s) / 6048e5 : r), n ? o : y(o)) : NaN) : NaN
	}

	function ve(t, e) {
		var n, i, s = 12 * (e.year() - t.year()) + (e.month() - t.month()),
			r = t.clone().add(s, "months");
		return 0 > e - r ? (n = t.clone().add(s - 1, "months"), i = (e - r) / (r - n)) : (n = t.clone().add(s + 1, "months"), i = (e - r) / (n - r)), -(s + i) || 0
	}

	function Se() {
		return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
	}

	function ke() {
		var t = this.clone().utc();
		return 0 < t.year() && t.year() <= 9999 ? w(Date.prototype.toISOString) ? this.toDate().toISOString() : G(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : G(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
	}

	function we(e) {
		e || (e = this.isUtc() ? t.defaultFormatUtc : t.defaultFormat);
		var n = G(this, e);
		return this.localeData().postformat(n)
	}

	function be(t, e) {
		return this.isValid() && (m(t) && t.isValid() || Ht(t).isValid()) ? ie({
			to: this,
			from: t
		}).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
	}

	function xe(t) {
		return this.from(Ht(), t)
	}

	function De(t, e) {
		return this.isValid() && (m(t) && t.isValid() || Ht(t).isValid()) ? ie({
			from: this,
			to: t
		}).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
	}

	function Pe(t) {
		return this.to(Ht(), t)
	}

	function Me(t) {
		var e;
		return void 0 === t ? this._locale._abbr : (e = C(t), null != e && (this._locale = e), this)
	}

	function Oe() {
		return this._locale
	}

	function Ee(t) {
		switch (t = H(t)) {
			case "year":
				this.month(0);
			case "quarter":
			case "month":
				this.date(1);
			case "week":
			case "isoWeek":
			case "day":
			case "date":
				this.hours(0);
			case "hour":
				this.minutes(0);
			case "minute":
				this.seconds(0);
			case "second":
				this.milliseconds(0)
		}
		return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
	}

	function Ye(t) {
		return t = H(t), void 0 === t || "millisecond" === t ? this : ("date" === t && (t = "day"), this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms"))
	}

	function Te() {
		return this._d.valueOf() - 6e4 * (this._offset || 0)
	}

	function Ne() {
		return Math.floor(this.valueOf() / 1e3)
	}

	function Ce() {
		return this._offset ? new Date(this.valueOf()) : this._d
	}

	function Ie() {
		var t = this;
		return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
	}

	function Re() {
		var t = this;
		return {
			years: t.year(),
			months: t.month(),
			date: t.date(),
			hours: t.hours(),
			minutes: t.minutes(),
			seconds: t.seconds(),
			milliseconds: t.milliseconds()
		}
	}

	function He() {
		return this.isValid() ? this.toISOString() : null
	}

	function Ae() {
		return l(this)
	}

	function Le() {
		return o({}, u(this))
	}

	function We() {
		return u(this).overflow
	}

	function Ue() {
		return {
			input: this._i,
			format: this._f,
			locale: this._locale,
			isUTC: this._isUTC,
			strict: this._strict
		}
	}

	function Fe(t, e) {
		$(0, [t, t.length], 0, e)
	}

	function Be(t) {
		return Ge.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
	}

	function $e(t) {
		return Ge.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
	}

	function Ve() {
		return bt(this.year(), 1, 4)
	}

	function je() {
		var t = this.localeData()._week;
		return bt(this.year(), t.dow, t.doy)
	}

	function Ge(t, e, n, i, s) {
		var r;
		return null == t ? wt(this, i, s).year : (r = bt(t, i, s), e > r && (e = r), qe.call(this, t, e, n, i, s))
	}

	function qe(t, e, n, i, s) {
		var r = kt(t, e, n, i, s),
			o = yt(r.year, 0, r.dayOfYear);
		return this.year(o.getUTCFullYear()), this.month(o.getUTCMonth()), this.date(o.getUTCDate()), this
	}

	function ze(t) {
		return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
	}

	function Ze(t) {
		return wt(t, this._week.dow, this._week.doy).week
	}

	function Ke() {
		return this._week.dow
	}

	function Je() {
		return this._week.doy
	}

	function Xe(t) {
		var e = this.localeData().week(this);
		return null == t ? e : this.add(7 * (t - e), "d")
	}

	function Qe(t) {
		var e = wt(this, 1, 4).week;
		return null == t ? e : this.add(7 * (t - e), "d")
	}

	function tn(t, e) {
		return "string" != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t), "number" == typeof t ? t : null) : parseInt(t, 10)
	}

	function en(t, e) {
		return n(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()]
	}

	function nn(t) {
		return this._weekdaysShort[t.day()]
	}

	function sn(t) {
		return this._weekdaysMin[t.day()]
	}

	function rn(t, e, n) {
		var i, s, r, o = t.toLocaleLowerCase();
		if (!this._weekdaysParse)
			for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], i = 0; 7 > i; ++i) r = a([2e3, 1]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[i] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(r, "").toLocaleLowerCase();
		return n ? "dddd" === e ? (s = pi.call(this._weekdaysParse, o), -1 !== s ? s : null) : "ddd" === e ? (s = pi.call(this._shortWeekdaysParse, o), -1 !== s ? s : null) : (s = pi.call(this._minWeekdaysParse, o), -1 !== s ? s : null) : "dddd" === e ? (s = pi.call(this._weekdaysParse, o), -1 !== s ? s : (s = pi.call(this._shortWeekdaysParse, o), -1 !== s ? s : (s = pi.call(this._minWeekdaysParse, o), -1 !== s ? s : null))) : "ddd" === e ? (s = pi.call(this._shortWeekdaysParse, o), -1 !== s ? s : (s = pi.call(this._weekdaysParse, o), -1 !== s ? s : (s = pi.call(this._minWeekdaysParse, o), -1 !== s ? s : null))) : (s = pi.call(this._minWeekdaysParse, o), -1 !== s ? s : (s = pi.call(this._weekdaysParse, o), -1 !== s ? s : (s = pi.call(this._shortWeekdaysParse, o), -1 !== s ? s : null)))
	}

	function on(t, e, n) {
		var i, s, r;
		if (this._weekdaysParseExact) return rn.call(this, t, e, n);
		for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; 7 > i; i++) {
			if (s = a([2e3, 1]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(s, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(s, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(s, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[i] || (r = "^" + this.weekdays(s, "") + "|^" + this.weekdaysShort(s, "") + "|^" + this.weekdaysMin(s, ""), this._weekdaysParse[i] = new RegExp(r.replace(".", ""), "i")), n && "dddd" === e && this._fullWeekdaysParse[i].test(t)) return i;
			if (n && "ddd" === e && this._shortWeekdaysParse[i].test(t)) return i;
			if (n && "dd" === e && this._minWeekdaysParse[i].test(t)) return i;
			if (!n && this._weekdaysParse[i].test(t)) return i
		}
	}

	function an(t) {
		if (!this.isValid()) return null != t ? this : NaN;
		var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
		return null != t ? (t = tn(t, this.localeData()), this.add(t - e, "d")) : e
	}

	function hn(t) {
		if (!this.isValid()) return null != t ? this : NaN;
		var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
		return null == t ? e : this.add(t - e, "d")
	}

	function un(t) {
		return this.isValid() ? null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7) : null != t ? this : NaN
	}

	function ln(t) {
		return this._weekdaysParseExact ? (r(this, "_weekdaysRegex") || pn.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex
	}

	function cn(t) {
		return this._weekdaysParseExact ? (r(this, "_weekdaysRegex") || pn.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex
	}

	function dn(t) {
		return this._weekdaysParseExact ? (r(this, "_weekdaysRegex") || pn.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex
	}

	function pn() {
		function t(t, e) {
			return e.length - t.length
		}
		var e, n, i, s, r, o = [],
			h = [],
			u = [],
			l = [];
		for (e = 0; 7 > e; e++) n = a([2e3, 1]).day(e), i = this.weekdaysMin(n, ""), s = this.weekdaysShort(n, ""), r = this.weekdays(n, ""), o.push(i), h.push(s), u.push(r), l.push(i), l.push(s), l.push(r);
		for (o.sort(t), h.sort(t), u.sort(t), l.sort(t), e = 0; 7 > e; e++) h[e] = J(h[e]), u[e] = J(u[e]), l[e] = J(l[e]);
		this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + o.join("|") + ")", "i")
	}

	function fn(t) {
		var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
		return null == t ? e : this.add(t - e, "d")
	}

	function mn() {
		return this.hours() % 12 || 12
	}

	function yn() {
		return this.hours() || 24
	}

	function gn(t, e) {
		$(t, 0, 0, function () {
			return this.localeData().meridiem(this.hours(), this.minutes(), e)
		})
	}

	function _n(t, e) {
		return e._meridiemParse
	}

	function vn(t) {
		return "p" === (t + "").toLowerCase().charAt(0)
	}

	function Sn(t, e, n) {
		return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
	}

	function kn(t, e) {
		e[ji] = g(1e3 * ("0." + t))
	}

	function wn() {
		return this._isUTC ? "UTC" : ""
	}

	function bn() {
		return this._isUTC ? "Coordinated Universal Time" : ""
	}

	function xn(t) {
		return Ht(1e3 * t)
	}

	function Dn() {
		return Ht.apply(null, arguments).parseZone()
	}

	function Pn(t, e, n) {
		var i = this._calendar[t];
		return w(i) ? i.call(e, n) : i
	}

	function Mn(t) {
		var e = this._longDateFormat[t],
			n = this._longDateFormat[t.toUpperCase()];
		return e || !n ? e : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function (t) {
			return t.slice(1)
		}), this._longDateFormat[t])
	}

	function On() {
		return this._invalidDate
	}

	function En(t) {
		return this._ordinal.replace("%d", t)
	}

	function Yn(t) {
		return t
	}

	function Tn(t, e, n, i) {
		var s = this._relativeTime[n];
		return w(s) ? s(t, e, n, i) : s.replace(/%d/i, t)
	}

	function Nn(t, e) {
		var n = this._relativeTime[t > 0 ? "future" : "past"];
		return w(n) ? n(e) : n.replace(/%s/i, e)
	}

	function Cn(t, e, n, i) {
		var s = C(),
			r = a().set(i, e);
		return s[n](r, t)
	}

	function In(t, e, n) {
		if ("number" == typeof t && (e = t, t = void 0), t = t || "", null != e) return Cn(t, e, n, "month");
		var i, s = [];
		for (i = 0; 12 > i; i++) s[i] = Cn(t, i, n, "month");
		return s
	}

	function Rn(t, e, n, i) {
		"boolean" == typeof t ? ("number" == typeof e && (n = e, e = void 0), e = e || "") : (e = t, n = e, t = !1, "number" == typeof e && (n = e, e = void 0), e = e || "");
		var s = C(),
			r = t ? s._week.dow : 0;
		if (null != n) return Cn(e, (n + r) % 7, i, "day");
		var o, a = [];
		for (o = 0; 7 > o; o++) a[o] = Cn(e, (o + r) % 7, i, "day");
		return a
	}

	function Hn(t, e) {
		return In(t, e, "months")
	}

	function An(t, e) {
		return In(t, e, "monthsShort")
	}

	function Ln(t, e, n) {
		return Rn(t, e, n, "weekdays")
	}

	function Wn(t, e, n) {
		return Rn(t, e, n, "weekdaysShort")
	}

	function Un(t, e, n) {
		return Rn(t, e, n, "weekdaysMin")
	}

	function Fn() {
		var t = this._data;
		return this._milliseconds = Ls(this._milliseconds), this._days = Ls(this._days), this._months = Ls(this._months), t.milliseconds = Ls(t.milliseconds), t.seconds = Ls(t.seconds), t.minutes = Ls(t.minutes), t.hours = Ls(t.hours), t.months = Ls(t.months), t.years = Ls(t.years), this
	}

	function Bn(t, e, n, i) {
		var s = ie(e, n);
		return t._milliseconds += i * s._milliseconds, t._days += i * s._days, t._months += i * s._months, t._bubble()
	}

	function $n(t, e) {
		return Bn(this, t, e, 1)
	}

	function Vn(t, e) {
		return Bn(this, t, e, -1)
	}

	function jn(t) {
		return 0 > t ? Math.floor(t) : Math.ceil(t)
	}

	function Gn() {
		var t, e, n, i, s, r = this._milliseconds,
			o = this._days,
			a = this._months,
			h = this._data;
		return r >= 0 && o >= 0 && a >= 0 || 0 >= r && 0 >= o && 0 >= a || (r += 864e5 * jn(zn(a) + o), o = 0, a = 0), h.milliseconds = r % 1e3, t = y(r / 1e3), h.seconds = t % 60, e = y(t / 60), h.minutes = e % 60, n = y(e / 60), h.hours = n % 24, o += y(n / 24), s = y(qn(o)), a += s, o -= jn(zn(s)), i = y(a / 12), a %= 12, h.days = o, h.months = a, h.years = i, this
	}

	function qn(t) {
		return 4800 * t / 146097
	}

	function zn(t) {
		return 146097 * t / 4800
	}

	function Zn(t) {
		var e, n, i = this._milliseconds;
		if (t = H(t), "month" === t || "year" === t) return e = this._days + i / 864e5, n = this._months + qn(e), "month" === t ? n : n / 12;
		switch (e = this._days + Math.round(zn(this._months)), t) {
			case "week":
				return e / 7 + i / 6048e5;
			case "day":
				return e + i / 864e5;
			case "hour":
				return 24 * e + i / 36e5;
			case "minute":
				return 1440 * e + i / 6e4;
			case "second":
				return 86400 * e + i / 1e3;
			case "millisecond":
				return Math.floor(864e5 * e) + i;
			default:
				throw new Error("Unknown unit " + t)
		}
	}

	function Kn() {
		return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * g(this._months / 12)
	}

	function Jn(t) {
		return function () {
			return this.as(t)
		}
	}

	function Xn(t) {
		return t = H(t), this[t + "s"]()
	}

	function Qn(t) {
		return function () {
			return this._data[t]
		}
	}

	function ti() {
		return y(this.days() / 7)
	}

	function ei(t, e, n, i, s) {
		return s.relativeTime(e || 1, !!n, t, i)
	}

	function ni(t, e, n) {
		var i = ie(t).abs(),
			s = tr(i.as("s")),
			r = tr(i.as("m")),
			o = tr(i.as("h")),
			a = tr(i.as("d")),
			h = tr(i.as("M")),
			u = tr(i.as("y")),
			l = s < er.s && ["s", s] || 1 >= r && ["m"] || r < er.m && ["mm", r] || 1 >= o && ["h"] || o < er.h && ["hh", o] || 1 >= a && ["d"] || a < er.d && ["dd", a] || 1 >= h && ["M"] || h < er.M && ["MM", h] || 1 >= u && ["y"] || ["yy", u];
		return l[2] = e, l[3] = +t > 0, l[4] = n, ei.apply(null, l)
	}

	function ii(t, e) {
		return void 0 !== er[t] && (void 0 === e ? er[t] : (er[t] = e, !0))
	}

	function si(t) {
		var e = this.localeData(),
			n = ni(this, !t, e);
		return t && (n = e.pastFuture(+this, n)), e.postformat(n)
	}

	function ri() {
		var t, e, n, i = nr(this._milliseconds) / 1e3,
			s = nr(this._days),
			r = nr(this._months);
		t = y(i / 60), e = y(t / 60), i %= 60, t %= 60, n = y(r / 12), r %= 12;
		var o = n,
			a = r,
			h = s,
			u = e,
			l = t,
			c = i,
			d = this.asSeconds();
		return d ? (0 > d ? "-" : "") + "P" + (o ? o + "Y" : "") + (a ? a + "M" : "") + (h ? h + "D" : "") + (u || l || c ? "T" : "") + (u ? u + "H" : "") + (l ? l + "M" : "") + (c ? c + "S" : "") : "P0D"
	}
	var oi, ai;
	ai = Array.prototype.some ? Array.prototype.some : function (t) {
		for (var e = Object(this), n = e.length >>> 0, i = 0; n > i; i++)
			if (i in e && t.call(this, e[i], i, e)) return !0;
		return !1
	};
	var hi = t.momentProperties = [],
		ui = !1,
		li = {};
	t.suppressDeprecationWarnings = !1, t.deprecationHandler = null;
	var ci;
	ci = Object.keys ? Object.keys : function (t) {
		var e, n = [];
		for (e in t) r(t, e) && n.push(e);
		return n
	};
	var di, pi, fi = {},
		mi = {},
		yi = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
		gi = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
		_i = {},
		vi = {},
		Si = /\d/,
		ki = /\d\d/,
		wi = /\d{3}/,
		bi = /\d{4}/,
		xi = /[+-]?\d{6}/,
		Di = /\d\d?/,
		Pi = /\d\d\d\d?/,
		Mi = /\d\d\d\d\d\d?/,
		Oi = /\d{1,3}/,
		Ei = /\d{1,4}/,
		Yi = /[+-]?\d{1,6}/,
		Ti = /\d+/,
		Ni = /[+-]?\d+/,
		Ci = /Z|[+-]\d\d:?\d\d/gi,
		Ii = /Z|[+-]\d\d(?::?\d\d)?/gi,
		Ri = /[+-]?\d+(\.\d{1,3})?/,
		Hi = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
		Ai = {},
		Li = {},
		Wi = 0,
		Ui = 1,
		Fi = 2,
		Bi = 3,
		$i = 4,
		Vi = 5,
		ji = 6,
		Gi = 7,
		qi = 8;
	pi = Array.prototype.indexOf ? Array.prototype.indexOf : function (t) {
		var e;
		for (e = 0; e < this.length; ++e)
			if (this[e] === t) return e;
		return -1
	}, $("M", ["MM", 2], "Mo", function () {
		return this.month() + 1
	}), $("MMM", 0, 0, function (t) {
		return this.localeData().monthsShort(this, t)
	}), $("MMMM", 0, 0, function (t) {
		return this.localeData().months(this, t)
	}), R("month", "M"), z("M", Di), z("MM", Di, ki), z("MMM", function (t, e) {
		return e.monthsShortRegex(t)
	}), z("MMMM", function (t, e) {
		return e.monthsRegex(t)
	}), X(["M", "MM"], function (t, e) {
		e[Ui] = g(t) - 1
	}), X(["MMM", "MMMM"], function (t, e, n, i) {
		var s = n._locale.monthsParse(t, i, n._strict);
		null != s ? e[Ui] = s : u(n).invalidMonth = t
	});
	var zi = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
		Zi = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		Ki = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
		Ji = Hi,
		Xi = Hi,
		Qi = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
		ts = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
		es = /Z|[+-]\d\d(?::?\d\d)?/,
		ns = [
			["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
			["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
			["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
			["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
			["YYYY-DDD", /\d{4}-\d{3}/],
			["YYYY-MM", /\d{4}-\d\d/, !1],
			["YYYYYYMMDD", /[+-]\d{10}/],
			["YYYYMMDD", /\d{8}/],
			["GGGG[W]WWE", /\d{4}W\d{3}/],
			["GGGG[W]WW", /\d{4}W\d{2}/, !1],
			["YYYYDDD", /\d{7}/]
		],
		is = [
			["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
			["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
			["HH:mm:ss", /\d\d:\d\d:\d\d/],
			["HH:mm", /\d\d:\d\d/],
			["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
			["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
			["HHmmss", /\d\d\d\d\d\d/],
			["HHmm", /\d\d\d\d/],
			["HH", /\d\d/]
		],
		ss = /^\/?Date\((\-?\d+)/i;
	t.createFromInputFallback = S("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (t) {
		t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
	}), $("Y", 0, 0, function () {
		var t = this.year();
		return 9999 >= t ? "" + t : "+" + t
	}), $(0, ["YY", 2], 0, function () {
		return this.year() % 100
	}), $(0, ["YYYY", 4], 0, "year"), $(0, ["YYYYY", 5], 0, "year"), $(0, ["YYYYYY", 6, !0], 0, "year"), R("year", "y"), z("Y", Ni), z("YY", Di, ki), z("YYYY", Ei, bi), z("YYYYY", Yi, xi), z("YYYYYY", Yi, xi), X(["YYYYY", "YYYYYY"], Wi), X("YYYY", function (e, n) {
		n[Wi] = 2 === e.length ? t.parseTwoDigitYear(e) : g(e)
	}), X("YY", function (e, n) {
		n[Wi] = t.parseTwoDigitYear(e)
	}), X("Y", function (t, e) {
		e[Wi] = parseInt(t, 10)
	}), t.parseTwoDigitYear = function (t) {
		return g(t) + (g(t) > 68 ? 1900 : 2e3)
	};
	var rs = L("FullYear", !0);
	t.ISO_8601 = function () {};
	var os = S("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () {
			var t = Ht.apply(null, arguments);
			return this.isValid() && t.isValid() ? this > t ? this : t : c()
		}),
		as = S("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () {
			var t = Ht.apply(null, arguments);
			return this.isValid() && t.isValid() ? t > this ? this : t : c()
		}),
		hs = function () {
			return Date.now ? Date.now() : +new Date
		};
	Bt("Z", ":"), Bt("ZZ", ""), z("Z", Ii), z("ZZ", Ii), X(["Z", "ZZ"], function (t, e, n) {
		n._useUTC = !0, n._tzm = $t(Ii, t)
	});
	var us = /([\+\-]|\d\d)/gi;
	t.updateOffset = function () {};
	var ls = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,
		cs = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
	ie.fn = Ut.prototype;
	var ds = he(1, "add"),
		ps = he(-1, "subtract");
	t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", t.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
	var fs = S("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
		return void 0 === t ? this.localeData() : this.locale(t)
	});
	$(0, ["gg", 2], 0, function () {
		return this.weekYear() % 100
	}), $(0, ["GG", 2], 0, function () {
		return this.isoWeekYear() % 100
	}), Fe("gggg", "weekYear"), Fe("ggggg", "weekYear"), Fe("GGGG", "isoWeekYear"), Fe("GGGGG", "isoWeekYear"), R("weekYear", "gg"), R("isoWeekYear", "GG"), z("G", Ni), z("g", Ni), z("GG", Di, ki), z("gg", Di, ki), z("GGGG", Ei, bi), z("gggg", Ei, bi), z("GGGGG", Yi, xi), z("ggggg", Yi, xi), Q(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, n, i) {
		e[i.substr(0, 2)] = g(t)
	}), Q(["gg", "GG"], function (e, n, i, s) {
		n[s] = t.parseTwoDigitYear(e)
	}), $("Q", 0, "Qo", "quarter"), R("quarter", "Q"), z("Q", Si), X("Q", function (t, e) {
		e[Ui] = 3 * (g(t) - 1)
	}), $("w", ["ww", 2], "wo", "week"), $("W", ["WW", 2], "Wo", "isoWeek"), R("week", "w"), R("isoWeek", "W"), z("w", Di), z("ww", Di, ki), z("W", Di), z("WW", Di, ki), Q(["w", "ww", "W", "WW"], function (t, e, n, i) {
		e[i.substr(0, 1)] = g(t)
	});
	var ms = {
		dow: 0,
		doy: 6
	};
	$("D", ["DD", 2], "Do", "date"),
		R("date", "D"), z("D", Di), z("DD", Di, ki), z("Do", function (t, e) {
			return t ? e._ordinalParse : e._ordinalParseLenient
		}), X(["D", "DD"], Fi), X("Do", function (t, e) {
			e[Fi] = g(t.match(Di)[0], 10)
		});
	var ys = L("Date", !0);
	$("d", 0, "do", "day"), $("dd", 0, 0, function (t) {
		return this.localeData().weekdaysMin(this, t)
	}), $("ddd", 0, 0, function (t) {
		return this.localeData().weekdaysShort(this, t)
	}), $("dddd", 0, 0, function (t) {
		return this.localeData().weekdays(this, t)
	}), $("e", 0, 0, "weekday"), $("E", 0, 0, "isoWeekday"), R("day", "d"), R("weekday", "e"), R("isoWeekday", "E"), z("d", Di), z("e", Di), z("E", Di), z("dd", function (t, e) {
		return e.weekdaysMinRegex(t)
	}), z("ddd", function (t, e) {
		return e.weekdaysShortRegex(t)
	}), z("dddd", function (t, e) {
		return e.weekdaysRegex(t)
	}), Q(["dd", "ddd", "dddd"], function (t, e, n, i) {
		var s = n._locale.weekdaysParse(t, i, n._strict);
		null != s ? e.d = s : u(n).invalidWeekday = t
	}), Q(["d", "e", "E"], function (t, e, n, i) {
		e[i] = g(t)
	});
	var gs = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		_s = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
		vs = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
		Ss = Hi,
		ks = Hi,
		ws = Hi;
	$("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), R("dayOfYear", "DDD"), z("DDD", Oi), z("DDDD", wi), X(["DDD", "DDDD"], function (t, e, n) {
		n._dayOfYear = g(t)
	}), $("H", ["HH", 2], 0, "hour"), $("h", ["hh", 2], 0, mn), $("k", ["kk", 2], 0, yn), $("hmm", 0, 0, function () {
		return "" + mn.apply(this) + B(this.minutes(), 2)
	}), $("hmmss", 0, 0, function () {
		return "" + mn.apply(this) + B(this.minutes(), 2) + B(this.seconds(), 2)
	}), $("Hmm", 0, 0, function () {
		return "" + this.hours() + B(this.minutes(), 2)
	}), $("Hmmss", 0, 0, function () {
		return "" + this.hours() + B(this.minutes(), 2) + B(this.seconds(), 2)
	}), gn("a", !0), gn("A", !1), R("hour", "h"), z("a", _n), z("A", _n), z("H", Di), z("h", Di), z("HH", Di, ki), z("hh", Di, ki), z("hmm", Pi), z("hmmss", Mi), z("Hmm", Pi), z("Hmmss", Mi), X(["H", "HH"], Bi), X(["a", "A"], function (t, e, n) {
		n._isPm = n._locale.isPM(t), n._meridiem = t
	}), X(["h", "hh"], function (t, e, n) {
		e[Bi] = g(t), u(n).bigHour = !0
	}), X("hmm", function (t, e, n) {
		var i = t.length - 2;
		e[Bi] = g(t.substr(0, i)), e[$i] = g(t.substr(i)), u(n).bigHour = !0
	}), X("hmmss", function (t, e, n) {
		var i = t.length - 4,
			s = t.length - 2;
		e[Bi] = g(t.substr(0, i)), e[$i] = g(t.substr(i, 2)), e[Vi] = g(t.substr(s)), u(n).bigHour = !0
	}), X("Hmm", function (t, e, n) {
		var i = t.length - 2;
		e[Bi] = g(t.substr(0, i)), e[$i] = g(t.substr(i))
	}), X("Hmmss", function (t, e, n) {
		var i = t.length - 4,
			s = t.length - 2;
		e[Bi] = g(t.substr(0, i)), e[$i] = g(t.substr(i, 2)), e[Vi] = g(t.substr(s))
	});
	var bs = /[ap]\.?m?\.?/i,
		xs = L("Hours", !0);
	$("m", ["mm", 2], 0, "minute"), R("minute", "m"), z("m", Di), z("mm", Di, ki), X(["m", "mm"], $i);
	var Ds = L("Minutes", !1);
	$("s", ["ss", 2], 0, "second"), R("second", "s"), z("s", Di), z("ss", Di, ki), X(["s", "ss"], Vi);
	var Ps = L("Seconds", !1);
	$("S", 0, 0, function () {
		return ~~(this.millisecond() / 100)
	}), $(0, ["SS", 2], 0, function () {
		return ~~(this.millisecond() / 10)
	}), $(0, ["SSS", 3], 0, "millisecond"), $(0, ["SSSS", 4], 0, function () {
		return 10 * this.millisecond()
	}), $(0, ["SSSSS", 5], 0, function () {
		return 100 * this.millisecond()
	}), $(0, ["SSSSSS", 6], 0, function () {
		return 1e3 * this.millisecond()
	}), $(0, ["SSSSSSS", 7], 0, function () {
		return 1e4 * this.millisecond()
	}), $(0, ["SSSSSSSS", 8], 0, function () {
		return 1e5 * this.millisecond()
	}), $(0, ["SSSSSSSSS", 9], 0, function () {
		return 1e6 * this.millisecond()
	}), R("millisecond", "ms"), z("S", Oi, Si), z("SS", Oi, ki), z("SSS", Oi, wi);
	var Ms;
	for (Ms = "SSSS"; Ms.length <= 9; Ms += "S") z(Ms, Ti);
	for (Ms = "S"; Ms.length <= 9; Ms += "S") X(Ms, kn);
	var Os = L("Milliseconds", !1);
	$("z", 0, 0, "zoneAbbr"), $("zz", 0, 0, "zoneName");
	var Es = f.prototype;
	Es.add = ds, Es.calendar = le, Es.clone = ce, Es.diff = _e, Es.endOf = Ye, Es.format = we, Es.from = be, Es.fromNow = xe, Es.to = De, Es.toNow = Pe, Es.get = F, Es.invalidAt = We, Es.isAfter = de, Es.isBefore = pe, Es.isBetween = fe, Es.isSame = me, Es.isSameOrAfter = ye, Es.isSameOrBefore = ge, Es.isValid = Ae, Es.lang = fs, Es.locale = Me, Es.localeData = Oe, Es.max = as, Es.min = os, Es.parsingFlags = Le, Es.set = F, Es.startOf = Ee, Es.subtract = ps, Es.toArray = Ie, Es.toObject = Re, Es.toDate = Ce, Es.toISOString = ke, Es.toJSON = He, Es.toString = Se, Es.unix = Ne, Es.valueOf = Te, Es.creationData = Ue, Es.year = rs, Es.isLeapYear = vt, Es.weekYear = Be, Es.isoWeekYear = $e, Es.quarter = Es.quarters = ze, Es.month = at, Es.daysInMonth = ht, Es.week = Es.weeks = Xe, Es.isoWeek = Es.isoWeeks = Qe, Es.weeksInYear = je, Es.isoWeeksInYear = Ve, Es.date = ys, Es.day = Es.days = an, Es.weekday = hn, Es.isoWeekday = un, Es.dayOfYear = fn, Es.hour = Es.hours = xs, Es.minute = Es.minutes = Ds, Es.second = Es.seconds = Ps, Es.millisecond = Es.milliseconds = Os, Es.utcOffset = Gt, Es.utc = zt, Es.local = Zt, Es.parseZone = Kt, Es.hasAlignedHourOffset = Jt, Es.isDST = Xt, Es.isDSTShifted = Qt, Es.isLocal = te, Es.isUtcOffset = ee, Es.isUtc = ne, Es.isUTC = ne, Es.zoneAbbr = wn, Es.zoneName = bn, Es.dates = S("dates accessor is deprecated. Use date instead.", ys), Es.months = S("months accessor is deprecated. Use month instead", at), Es.years = S("years accessor is deprecated. Use year instead", rs), Es.zone = S("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", qt);
	var Ys = Es,
		Ts = {
			sameDay: "[Today at] LT",
			nextDay: "[Tomorrow at] LT",
			nextWeek: "dddd [at] LT",
			lastDay: "[Yesterday at] LT",
			lastWeek: "[Last] dddd [at] LT",
			sameElse: "L"
		},
		Ns = {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY h:mm A",
			LLLL: "dddd, MMMM D, YYYY h:mm A"
		},
		Cs = "Invalid date",
		Is = "%d",
		Rs = /\d{1,2}/,
		Hs = {
			future: "in %s",
			past: "%s ago",
			s: "a few seconds",
			m: "a minute",
			mm: "%d minutes",
			h: "an hour",
			hh: "%d hours",
			d: "a day",
			dd: "%d days",
			M: "a month",
			MM: "%d months",
			y: "a year",
			yy: "%d years"
		},
		As = P.prototype;
	As._calendar = Ts, As.calendar = Pn, As._longDateFormat = Ns, As.longDateFormat = Mn, As._invalidDate = Cs, As.invalidDate = On, As._ordinal = Is, As.ordinal = En, As._ordinalParse = Rs, As.preparse = Yn, As.postformat = Yn, As._relativeTime = Hs, As.relativeTime = Tn, As.pastFuture = Nn, As.set = x, As.months = nt, As._months = Zi, As.monthsShort = it, As._monthsShort = Ki, As.monthsParse = rt, As._monthsRegex = Xi, As.monthsRegex = lt, As._monthsShortRegex = Ji, As.monthsShortRegex = ut, As.week = Ze, As._week = ms, As.firstDayOfYear = Je, As.firstDayOfWeek = Ke, As.weekdays = en, As._weekdays = gs, As.weekdaysMin = sn, As._weekdaysMin = vs, As.weekdaysShort = nn, As._weekdaysShort = _s, As.weekdaysParse = on, As._weekdaysRegex = Ss, As.weekdaysRegex = ln, As._weekdaysShortRegex = ks, As.weekdaysShortRegex = cn, As._weekdaysMinRegex = ws, As.weekdaysMinRegex = dn, As.isPM = vn, As._meridiemParse = bs, As.meridiem = Sn, Y("en", {
		ordinalParse: /\d{1,2}(th|st|nd|rd)/,
		ordinal: function (t) {
			var e = t % 10,
				n = 1 === g(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
			return t + n
		}
	}), t.lang = S("moment.lang is deprecated. Use moment.locale instead.", Y), t.langData = S("moment.langData is deprecated. Use moment.localeData instead.", C);
	var Ls = Math.abs,
		Ws = Jn("ms"),
		Us = Jn("s"),
		Fs = Jn("m"),
		Bs = Jn("h"),
		$s = Jn("d"),
		Vs = Jn("w"),
		js = Jn("M"),
		Gs = Jn("y"),
		qs = Qn("milliseconds"),
		zs = Qn("seconds"),
		Zs = Qn("minutes"),
		Ks = Qn("hours"),
		Js = Qn("days"),
		Xs = Qn("months"),
		Qs = Qn("years"),
		tr = Math.round,
		er = {
			s: 45,
			m: 45,
			h: 22,
			d: 26,
			M: 11
		},
		nr = Math.abs,
		ir = Ut.prototype;
	ir.abs = Fn, ir.add = $n, ir.subtract = Vn, ir.as = Zn, ir.asMilliseconds = Ws, ir.asSeconds = Us, ir.asMinutes = Fs, ir.asHours = Bs, ir.asDays = $s, ir.asWeeks = Vs, ir.asMonths = js, ir.asYears = Gs, ir.valueOf = Kn, ir._bubble = Gn, ir.get = Xn, ir.milliseconds = qs, ir.seconds = zs, ir.minutes = Zs, ir.hours = Ks, ir.days = Js, ir.weeks = ti, ir.months = Xs, ir.years = Qs, ir.humanize = si, ir.toISOString = ri, ir.toString = ri, ir.toJSON = ri, ir.locale = Me, ir.localeData = Oe, ir.toIsoString = S("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", ri), ir.lang = fs, $("X", 0, 0, "unix"), $("x", 0, 0, "valueOf"), z("x", Ni), z("X", Ri), X("X", function (t, e, n) {
		n._d = new Date(1e3 * parseFloat(t, 10))
	}), X("x", function (t, e, n) {
		n._d = new Date(g(t))
	}), t.version = "2.13.0", e(Ht), t.fn = Ys, t.min = Lt, t.max = Wt, t.now = hs, t.utc = a, t.unix = xn, t.months = Hn, t.isDate = i, t.locale = Y, t.invalid = c, t.duration = ie, t.isMoment = m, t.weekdays = Ln, t.parseZone = Dn, t.localeData = C, t.isDuration = Ft, t.monthsShort = An, t.weekdaysMin = Un, t.defineLocale = T, t.updateLocale = N, t.locales = I, t.weekdaysShort = Wn, t.normalizeUnits = H, t.relativeTimeThreshold = ii, t.prototype = Ys;
	var sr = t;
	return sr
});
"use strict";

function Dialog(t, e) {
	this.dialogEl = t, this.overlayEl = e, this.focusedElBeforeOpen;
	var n = this.dialogEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
	this.focusableEls = Array.prototype.slice.call(n), this.firstFocusableEl = this.focusableEls[0], this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1], this.close()
}

function IDB() {
	this._dbPromise = this._setupDB()
}

function NotificationsService(t) {
	this.serviceWorkerReg = t, this.url = "https://bitsofcode-notify.herokuapp.com/users/", this.headers = new Headers, this.headers.append("Content-Type", "application/json")
}

function Toast(t, e) {
	this.toastContainerEl = document.querySelector(".toast-container"), this.toastEl = document.querySelector(".toast"), this._open(t, e)
}
Dialog.prototype.open = function () {
	var t = this;
	this.dialogEl.removeAttribute("aria-hidden"), this.overlayEl.removeAttribute("aria-hidden"), this.focusedElBeforeOpen = document.activeElement, this.dialogEl.addEventListener("keydown", function (e) {
		t._handleKeyDown(e)
	}), this.overlayEl.addEventListener("click", function () {
		t.close()
	}), this.firstFocusableEl.focus()
}, Dialog.prototype.close = function () {
	this.dialogEl.setAttribute("aria-hidden", !0), this.overlayEl.setAttribute("aria-hidden", !0), this.focusedElBeforeOpen && this.focusedElBeforeOpen.focus()
}, Dialog.prototype._handleKeyDown = function (t) {
	function e() {
		document.activeElement === i.firstFocusableEl && (t.preventDefault(), i.lastFocusableEl.focus())
	}

	function n() {
		document.activeElement === i.lastFocusableEl && (t.preventDefault(), i.firstFocusableEl.focus())
	}
	var i = this,
		s = 9,
		r = 27;
	switch (t.keyCode) {
		case s:
			if (1 === i.focusableEls.length) {
				t.preventDefault();
				break
			}
			t.shiftKey ? e() : n();
			break;
		case r:
			i.close()
	}
}, Dialog.prototype.addEventListeners = function (t, e) {
	for (var n = this, i = document.querySelectorAll(t), s = 0; s < i.length; s++) i[s].addEventListener("click", function () {
		n.open()
	});
	for (var r = document.querySelectorAll(e), s = 0; s < r.length; s++) r[s].addEventListener("click", function () {
		n.close()
	})
}, IDB.prototype._setupDB = function () {
	return navigator.serviceWorker ? idb.open("bitsofcode", 1, function (t) {
		var e = t.createObjectStore("Articles", {
			keyPath: "guid"
		});
		e.createIndex("guid", "guid");
		var n = t.createObjectStore("Bookmarks", {
			keyPath: "guid"
		});
		n.createIndex("guid", "guid");
		t.createObjectStore("Settings", {
			keyPath: "setting"
		})
	}) : Promise.reject()
}, IDB.prototype.add = function (t, e) {
	return this._dbPromise.then(function (n) {
		var i = n.transaction(t, "readwrite"),
			s = i.objectStore(t);
		return s.put(e), i.complete
	})
}, IDB.prototype.search = function (t, e, n, i) {
	var s = [];
	return this._dbPromise.then(function (n) {
		var i = n.transaction(t, "readwrite"),
			s = i.objectStore(t);
		if (!e) return s.openCursor();
		var r = s.index(e);
		return r.openCursor()
	}).then(function t(e) {
		if (e) return e.value[n] == i && s.push(e.value), e.continue().then(t)
	}).then(function () {
		return s
	})
}, IDB.prototype.remove = function (t, e, n, i) {
	return this._dbPromise.then(function (n) {
		var i = n.transaction(t, "readwrite"),
			s = i.objectStore(t);
		if (!e) return s.openCursor();
		var r = s.index(e);
		return r.openCursor()
	}).then(function t(e) {
		if (e) return e.value[n] == i && e.delete(), e.continue().then(t)
	}).then(function () {
		return !0
	})
}, IDB.prototype.retrieve = function (t, e, n) {
	return this._dbPromise.then(function (i) {
		var s = i.transaction(t),
			r = s.objectStore(t);
		if (!n) return r.getAll();
		var o = r.index(e);
		return o.getAll(n)
	})
}, NotificationsService.prototype.subscribe = function () {
	var t = this;
	return new Promise(function (e, n) {
		t.serviceWorkerReg.pushManager.subscribe({
			userVisibleOnly: !0
		}).then(function (e) {
			return t._addSubscription(e)
		}).then(function () {
			return e()
		}).catch(function () {
			return n()
		})
	})
}, NotificationsService.prototype.unsubscribe = function () {
	var t = this;
	return new Promise(function (e, n) {
		t.serviceWorkerReg.pushManager.getSubscription().then(function (i) {
			i.unsubscribe().then(function () {
				return t._deleteSubscription(i)
			}).then(function () {
				return e()
			}).catch(function () {
				return n()
			})
		})
	})
}, NotificationsService.prototype._addSubscription = function (t) {
	var e = this;
	return new Promise(function (n, i) {
		var s = t.endpoint.split("gcm/send/")[1],
			r = JSON.stringify({
				uid: s
			}),
			o = {
				method: "POST",
				headers: e.headers,
				body: r
			};
		fetch(e.url, o).then(function (t) {
			console.log(t), t.errors && i(), n()
		}).catch(function () {
			return i()
		})
	})
}, NotificationsService.prototype._deleteSubscription = function (t) {
	var e = this;
	return new Promise(function (n, i) {
		var s = t.endpoint.split("gcm/send/")[1],
			r = {
				method: "DELETE",
				headers: e.headers
			};
		fetch(e.url + s, r).then(function (t) {
			console.log(t), t.errors && i(), n()
		}).catch(function () {
			return i()
		})
	})
}, Toast.prototype._close = function () {
	this.toastContainerEl.classList.remove("open")
}, Toast.prototype._open = function (t, e) {
	this.toastEl.classList.remove("success", "warning", "danger"), this.toastEl.classList.add(t), this.toastContainerEl.classList.add("open"), this.toastEl.innerHTML = "\n        <p>" + e + '</p>\n        <button type="button" aria-label="Close Message" class="close-toast btn-bare"> Close </button>\n    ', this._addEventListeners()
}, Toast.prototype._addEventListeners = function () {
	var t = this;
	document.querySelector(".close-toast").addEventListener("click", function () {
		t._close()
	})
};
this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["templates"] = this["MyApp"]["templates"] || {};
this["MyApp"]["templates"]["excerpt"] = Handlebars.template({
	"1": function (depth0, helpers, partials, data) {
		var stack1, helper, alias1 = helpers.helperMissing,
			alias2 = "function",
			alias3 = this.escapeExpression;

		return "<article class=\"excerpt\">\n    <div class=\"reply new-news\">In other news</div>\n	<div class=\"spinner spinner__header\"><div class=\"bounce1\"></div><div class=\"bounce2\"></div><div class=\"bounce3\"></div></div>	<header class=\"excerpt__header\">\n        <h3 class=\"excerpt__title\">\n            " +
			alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
				"name": "title",
				"hash": {},
				"data": data
			}) : helper))) +
			"\n        </h3>\n    </header>\n\n    <div class=\"reply read-more\">Tell me more</div>     <div class=\"spinner spinner__content\"><div class=\"bounce1\"></div><div class=\"bounce2\"></div><div class=\"bounce3\"></div></div>	<div class=\"excerpt__content\">\n\n      <img class=\"excerpt__image\" src=\"           " +
			alias3(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
				"name": "thumbnail",
				"hash": {},
				"data": data
			}) : helper))) +
			"\">\n    <p>" +
			((stack1 = (helpers.excerpt || (depth0 && depth0.excerpt) || alias1).call(depth0, (depth0 != null ? depth0.description : depth0), {
				"name": "excerpt",
				"hash": {},
				"data": data
			})) != null ? stack1 : "") +
			"\n    </p> <a class=\"excerpt__link\" href=\"           " +
			alias3(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias1), (typeof helper === alias2 ? helper.call(depth0, {
				"name": "link",
				"hash": {},
				"data": data
			}) : helper))) +
			"\" target=\"_blank\"> Read Article &gt; </a>  	</div>\n  </article>\n";
	},
	"2": function (depth0, helpers, partials, data) {
		return " <span class=\"excerpt__meta__category\">" +
			this.escapeExpression(this.lambda(depth0, depth0)) +
			"</span> ";
	},
	"4": function (depth0, helpers, partials, data) {
		return "btn-bookmark--bookmarked";
	},
	"compiler": [6, ">= 2.0.0-beta.1"],
	"main": function (depth0, helpers, partials, data) {
		var stack1;

		return ((stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.items : depth0), {
			"name": "each",
			"hash": {},
			"fn": this.program(1, data, 0),
			"inverse": this.noop,
			"data": data
		})) != null ? stack1 : "");
	},
	"useData": true
});
"use strict";

function _classCallCheck(t, e) {
	if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function goToArticle(t) {
	var e = t.getAttribute("data-guid");
	return sessionStorage.setItem("articleGuid", e), window.location.href.indexOf("localhost") > -1 ? window.location.href = "http://localhost:7200/public/article.html" : window.location.href = "https://app.bitsofco.de/article.html", !1
}

function toggleBookmark(t) {
	function e() {
		t.classList.toggle("btn-bookmark--bookmarked")
	}

	function i() {
		Database.retrieve("Articles", "guid", o).then(function (t) {
			var i = t[0];
			i.isBookmarked = !0, Database.add("Articles", i), Database.add("Bookmarks", i).then(function () {
				return e()
			})
		})
	}

	function n() {
		Database.remove("Bookmarks", !1, "guid", o).then(function () {
			return e()
		})
	}
	var o = t.getAttribute("data-guid");
	Database.retrieve("Bookmarks", "guid", o).then(function (t) {
		return console.log(t), 0 === t.length ? i() : void n()
	})
}

function fetchArticles(t) {
	var e = void 0;
	return fetch(bitsofcode_rss_to_api_url).then(function (t) {
		return t.json()
	}).then(function (t) {
		var e = t.items;
		return e.map(function (t) {
			return new Article(t)
		})
	}).then(function (i) {
		e = i;
		var n = Promise.resolve();
		return t && i.forEach(function (t) {
			return n = n.then(function () {
				return addToDatabase(t)
			})
		}), n
	}).then(function () {
		return e
	})
}

function sortedArticles(t) {
	return t.sort(function (t, e) {
		return new Date(e.pubDate) - new Date(t.pubDate)
	})
}
var bitsofcode_rss_to_api_url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.thebetterindia.com%2Ffeed%2F&api_key=vokzrglqti5knrreqwqy0m0j1qkfawwxue2wsbhr&count=50",
	Database = new IDB,
	myNotificationsService = void 0,
	Article = function t(e) {
		_classCallCheck(this, t), this.title = e.title, this.author = e.author, this.categories = e.categories, this.content = e.content, this.description = e.description, this.guid = e.guid, this.link = e.link, this.pubDate = new Date(e.pubDate).getTime(), this.thumbnail = e.thumbnail, this.isBookmarked = !1
	};
Handlebars.registerHelper("excerpt", function (t, e) {
	var i = t.lastIndexOf("</p>");
	return t = t.slice(0, i) + " " + t.slice(i)
}), Handlebars.registerHelper("moment", function (t, e) {
	var i = t,
		n = moment(i).calendar(null, {
			sameDay: "[Today]",
			lastDay: "[Yesterday]",
			lastWeek: "[Last] dddd",
			sameElse: "MMM Do, YYYY"
		});
	return n
});
var navigation = document.querySelector(".site-nav"),
	lastScrollPosition = 0;
window.onscroll = function () {
	var t = window.scrollY,
		e = lastScrollPosition - t,
		i = e > 10 | e < -10,
		n = t < lastScrollPosition,
		o = t > lastScrollPosition;
	i && (n ? navigation.classList.remove("hidden") : o && navigation.classList.add("hidden")), lastScrollPosition = t
}, "serviceWorker" in navigator && navigator.serviceWorker.register("./service-worker.js").then(function (t) {
	myNotificationsService = new NotificationsService(t)
}).catch(function (t) {
	console.log("Service Worker Failed to Register", t)
});