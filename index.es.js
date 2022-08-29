var __accessCheck = (obj, member, msg2) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg2);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __2, __3, _options, _client, _document, _hasDisconnected, _lastQueryDocument, _hasDisconnected2, _lastSubscriptionDocument, __4;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = window, e$6 = t$3.ShadowRoot && (void 0 === t$3.ShadyCSS || t$3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$3 = Symbol(), n$4 = /* @__PURE__ */ new WeakMap();
class o$4 {
  constructor(t2, e2, n2) {
    if (this._$cssResult$ = true, n2 !== s$3)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$6 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = n$4.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && n$4.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
}
const r$2 = (t2) => new o$4("string" == typeof t2 ? t2 : t2 + "", void 0, s$3), i$5 = (t2, ...e2) => {
  const n2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, n3) => e3 + ((t3) => {
    if (true === t3._$cssResult$)
      return t3.cssText;
    if ("number" == typeof t3)
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[n3 + 1], t2[0]);
  return new o$4(n2, t2, s$3);
}, S$1 = (s2, n2) => {
  e$6 ? s2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((e2) => {
    const n3 = document.createElement("style"), o2 = t$3.litNonce;
    void 0 !== o2 && n3.setAttribute("nonce", o2), n3.textContent = e2.cssText, s2.appendChild(n3);
  });
}, c$1 = e$6 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r$2(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$5 = window, r$1 = e$5.trustedTypes, h$1 = r$1 ? r$1.emptyScript : "", o$3 = e$5.reactiveElementPolyfillSupport, n$3 = { toAttribute(t2, i) {
  switch (i) {
    case Boolean:
      t2 = t2 ? h$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i) {
  let s2 = t2;
  switch (i) {
    case Boolean:
      s2 = null !== t2;
      break;
    case Number:
      s2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, a$1 = (t2, i) => i !== t2 && (i == i || t2 == t2), l$2 = { attribute: true, type: String, converter: n$3, reflect: false, hasChanged: a$1 };
class d$1 extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t2) {
    var i;
    null !== (i = this.h) && void 0 !== i || (this.h = []), this.h.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i, s2) => {
      const e2 = this._$Ep(s2, i);
      void 0 !== e2 && (this._$Ev.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i = l$2) {
    if (i.state && (i.attribute = false), this.finalize(), this.elementProperties.set(t2, i), !i.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = "symbol" == typeof t2 ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i);
      void 0 !== e2 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i, s2) {
    return { get() {
      return this[i];
    }, set(e2) {
      const r2 = this[t2];
      this[i] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i) {
    const s2 = [];
    if (Array.isArray(i)) {
      const e2 = new Set(i.flat(1 / 0).reverse());
      for (const i2 of e2)
        s2.unshift(c$1(i2));
    } else
      void 0 !== i && s2.push(c$1(i));
    return s2;
  }
  static _$Ep(t2, i) {
    const s2 = i.attribute;
    return false === s2 ? void 0 : "string" == typeof s2 ? s2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  u() {
    var t2;
    this._$E_ = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t2 = this.constructor.h) || void 0 === t2 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i, s2;
    (null !== (i = this._$ES) && void 0 !== i ? i : this._$ES = []).push(t2), void 0 !== this.renderRoot && this.isConnected && (null === (s2 = t2.hostConnected) || void 0 === s2 || s2.call(t2));
  }
  removeController(t2) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t2) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t2, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = null !== (t2 = this.shadowRoot) && void 0 !== t2 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i;
      return null === (i = t3.hostConnected) || void 0 === i ? void 0 : i.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
      var i;
      return null === (i = t3.hostDisconnected) || void 0 === i ? void 0 : i.call(t3);
    });
  }
  attributeChangedCallback(t2, i, s2) {
    this._$AK(t2, s2);
  }
  _$EO(t2, i, s2 = l$2) {
    var e2;
    const r2 = this.constructor._$Ep(t2, s2);
    if (void 0 !== r2 && true === s2.reflect) {
      const h2 = (void 0 !== (null === (e2 = s2.converter) || void 0 === e2 ? void 0 : e2.toAttribute) ? s2.converter : n$3).toAttribute(i, s2.type);
      this._$El = t2, null == h2 ? this.removeAttribute(r2) : this.setAttribute(r2, h2), this._$El = null;
    }
  }
  _$AK(t2, i) {
    var s2;
    const e2 = this.constructor, r2 = e2._$Ev.get(t2);
    if (void 0 !== r2 && this._$El !== r2) {
      const t3 = e2.getPropertyOptions(r2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== (null === (s2 = t3.converter) || void 0 === s2 ? void 0 : s2.fromAttribute) ? t3.converter : n$3;
      this._$El = r2, this[r2] = h2.fromAttribute(i, t3.type), this._$El = null;
    }
  }
  requestUpdate(t2, i, s2) {
    let e2 = true;
    void 0 !== t2 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || a$1)(this[t2], i) ? (this._$AL.has(t2) || this._$AL.set(t2, i), true === s2.reflect && this._$El !== t2 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t3, i2) => this[i2] = t3), this._$Ei = void 0);
    let i = false;
    const s2 = this._$AL;
    try {
      i = this.shouldUpdate(s2), i ? (this.willUpdate(s2), null === (t2 = this._$ES) || void 0 === t2 || t2.forEach((t3) => {
        var i2;
        return null === (i2 = t3.hostUpdate) || void 0 === i2 ? void 0 : i2.call(t3);
      }), this.update(s2)) : this._$Ek();
    } catch (t3) {
      throw i = false, this._$Ek(), t3;
    }
    i && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.forEach((t3) => {
      var i2;
      return null === (i2 = t3.hostUpdated) || void 0 === i2 ? void 0 : i2.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    void 0 !== this._$EC && (this._$EC.forEach((t3, i) => this._$EO(i, this[i], t3)), this._$EC = void 0), this._$Ek();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
d$1.finalized = true, d$1.elementProperties = /* @__PURE__ */ new Map(), d$1.elementStyles = [], d$1.shadowRootOptions = { mode: "open" }, null == o$3 || o$3({ ReactiveElement: d$1 }), (null !== (s$2 = e$5.reactiveElementVersions) && void 0 !== s$2 ? s$2 : e$5.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;
const i$4 = window, s$1 = i$4.trustedTypes, e$4 = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, o$2 = `lit$${(Math.random() + "").slice(9)}$`, n$2 = "?" + o$2, l$1 = `<${n$2}>`, h = document, r = (t2 = "") => h.createComment(t2), d = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, c = (t2) => u(t2) || "function" == typeof (null == t2 ? void 0 : t2[Symbol.iterator]), v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, a = /-->/g, f = />/g, _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), m = /'/g, p = /"/g, $ = /^(?:script|style|textarea|title)$/i, g = (t2) => (i, ...s2) => ({ _$litType$: t2, strings: i, values: s2 }), y = g(1), x = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), T = /* @__PURE__ */ new WeakMap(), A = (t2, i, s2) => {
  var e2, o2;
  const n2 = null !== (e2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== e2 ? e2 : i;
  let l2 = n2._$litPart$;
  if (void 0 === l2) {
    const t3 = null !== (o2 = null == s2 ? void 0 : s2.renderBefore) && void 0 !== o2 ? o2 : null;
    n2._$litPart$ = l2 = new S(i.insertBefore(r(), t3), t3, void 0, null != s2 ? s2 : {});
  }
  return l2._$AI(t2), l2;
}, E = h.createTreeWalker(h, 129, null, false), C = (t2, i) => {
  const s2 = t2.length - 1, n2 = [];
  let h2, r2 = 2 === i ? "<svg>" : "", d2 = v;
  for (let i2 = 0; i2 < s2; i2++) {
    const s3 = t2[i2];
    let e2, u3, c2 = -1, g2 = 0;
    for (; g2 < s3.length && (d2.lastIndex = g2, u3 = d2.exec(s3), null !== u3); )
      g2 = d2.lastIndex, d2 === v ? "!--" === u3[1] ? d2 = a : void 0 !== u3[1] ? d2 = f : void 0 !== u3[2] ? ($.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = _) : void 0 !== u3[3] && (d2 = _) : d2 === _ ? ">" === u3[0] ? (d2 = null != h2 ? h2 : v, c2 = -1) : void 0 === u3[1] ? c2 = -2 : (c2 = d2.lastIndex - u3[2].length, e2 = u3[1], d2 = void 0 === u3[3] ? _ : '"' === u3[3] ? p : m) : d2 === p || d2 === m ? d2 = _ : d2 === a || d2 === f ? d2 = v : (d2 = _, h2 = void 0);
    const y2 = d2 === _ && t2[i2 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === v ? s3 + l$1 : c2 >= 0 ? (n2.push(e2), s3.slice(0, c2) + "$lit$" + s3.slice(c2) + o$2 + y2) : s3 + o$2 + (-2 === c2 ? (n2.push(void 0), i2) : y2);
  }
  const u2 = r2 + (t2[s2] || "<?>") + (2 === i ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== e$4 ? e$4.createHTML(u2) : u2, n2];
};
class P {
  constructor({ strings: t2, _$litType$: i }, e2) {
    let l2;
    this.parts = [];
    let h2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, i);
    if (this.el = P.createElement(v2, e2), E.currentNode = this.el.content, 2 === i) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; null !== (l2 = E.nextNode()) && c2.length < u2; ) {
      if (1 === l2.nodeType) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(o$2)) {
              const s2 = a2[d2++];
              if (t3.push(i2), void 0 !== s2) {
                const t4 = l2.getAttribute(s2.toLowerCase() + "$lit$").split(o$2), i3 = /([.?@])?(.*)/.exec(s2);
                c2.push({ type: 1, index: h2, name: i3[2], strings: t4, ctor: "." === i3[1] ? R : "?" === i3[1] ? H : "@" === i3[1] ? I : M });
              } else
                c2.push({ type: 6, index: h2 });
            }
          for (const i2 of t3)
            l2.removeAttribute(i2);
        }
        if ($.test(l2.tagName)) {
          const t3 = l2.textContent.split(o$2), i2 = t3.length - 1;
          if (i2 > 0) {
            l2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i2; s2++)
              l2.append(t3[s2], r()), E.nextNode(), c2.push({ type: 2, index: ++h2 });
            l2.append(t3[i2], r());
          }
        }
      } else if (8 === l2.nodeType)
        if (l2.data === n$2)
          c2.push({ type: 2, index: h2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = l2.data.indexOf(o$2, t3 + 1)); )
            c2.push({ type: 7, index: h2 }), t3 += o$2.length - 1;
        }
      h2++;
    }
  }
  static createElement(t2, i) {
    const s2 = h.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function V(t2, i, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i === x)
    return i;
  let r2 = void 0 !== e2 ? null === (o2 = s2._$Cl) || void 0 === o2 ? void 0 : o2[e2] : s2._$Cu;
  const u2 = d(i) ? void 0 : i._$litDirective$;
  return (null == r2 ? void 0 : r2.constructor) !== u2 && (null === (n2 = null == r2 ? void 0 : r2._$AO) || void 0 === n2 || n2.call(r2, false), void 0 === u2 ? r2 = void 0 : (r2 = new u2(t2), r2._$AT(t2, s2, e2)), void 0 !== e2 ? (null !== (l2 = (h2 = s2)._$Cl) && void 0 !== l2 ? l2 : h2._$Cl = [])[e2] = r2 : s2._$Cu = r2), void 0 !== r2 && (i = V(t2, r2._$AS(t2, i.values), r2, e2)), i;
}
class N {
  constructor(t2, i) {
    this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t2) {
    var i;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = (null !== (i = null == t2 ? void 0 : t2.creationScope) && void 0 !== i ? i : h).importNode(s2, true);
    E.currentNode = o2;
    let n2 = E.nextNode(), l2 = 0, r2 = 0, d2 = e2[0];
    for (; void 0 !== d2; ) {
      if (l2 === d2.index) {
        let i2;
        2 === d2.type ? i2 = new S(n2, n2.nextSibling, this, t2) : 1 === d2.type ? i2 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : 6 === d2.type && (i2 = new L(n2, this, t2)), this.v.push(i2), d2 = e2[++r2];
      }
      l2 !== (null == d2 ? void 0 : d2.index) && (n2 = E.nextNode(), l2++);
    }
    return o2;
  }
  m(t2) {
    let i = 0;
    for (const s2 of this.v)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i), i += s2.strings.length - 2) : s2._$AI(t2[i])), i++;
  }
}
class S {
  constructor(t2, i, s2, e2) {
    var o2;
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t2, this._$AB = i, this._$AM = s2, this.options = e2, this._$C_ = null === (o2 = null == e2 ? void 0 : e2.isConnected) || void 0 === o2 || o2;
  }
  get _$AU() {
    var t2, i;
    return null !== (i = null === (t2 = this._$AM) || void 0 === t2 ? void 0 : t2._$AU) && void 0 !== i ? i : this._$C_;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t2.nodeType && (t2 = i.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i = this) {
    t2 = V(this, t2, i), d(t2) ? t2 === b || null == t2 || "" === t2 ? (this._$AH !== b && this._$AR(), this._$AH = b) : t2 !== this._$AH && t2 !== x && this.$(t2) : void 0 !== t2._$litType$ ? this.T(t2) : void 0 !== t2.nodeType ? this.k(t2) : c(t2) ? this.O(t2) : this.$(t2);
  }
  S(t2, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i);
  }
  k(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.S(t2));
  }
  $(t2) {
    this._$AH !== b && d(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(h.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i;
    const { values: s2, _$litType$: e2 } = t2, o2 = "number" == typeof e2 ? this._$AC(t2) : (void 0 === e2.el && (e2.el = P.createElement(e2.h, this.options)), e2);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t3 = new N(o2, this), i2 = t3.p(this.options);
      t3.m(s2), this.k(i2), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i = T.get(t2.strings);
    return void 0 === i && T.set(t2.strings, i = new P(t2)), i;
  }
  O(t2) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i.length ? i.push(s2 = new S(this.S(r()), this.S(r()), this, this.options)) : s2 = i[e2], s2._$AI(o2), e2++;
    e2 < i.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i) {
    var s2;
    for (null === (s2 = this._$AP) || void 0 === s2 || s2.call(this, false, true, i); t2 && t2 !== this._$AB; ) {
      const i2 = t2.nextSibling;
      t2.remove(), t2 = i2;
    }
  }
  setConnected(t2) {
    var i;
    void 0 === this._$AM && (this._$C_ = t2, null === (i = this._$AP) || void 0 === i || i.call(this, t2));
  }
}
class M {
  constructor(t2, i, s2, e2, o2) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t2, this.name = i, this._$AM = e2, this.options = o2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = b;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (void 0 === o2)
      t2 = V(this, t2, i, 0), n2 = !d(t2) || t2 !== this._$AH && t2 !== x, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = V(this, e3[s2 + l2], i, l2), h2 === x && (h2 = this._$AH[l2]), n2 || (n2 = !d(h2) || h2 !== this._$AH[l2]), h2 === b ? t2 = b : t2 !== b && (t2 += (null != h2 ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.P(t2);
  }
  P(t2) {
    t2 === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t2 ? t2 : "");
  }
}
class R extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t2) {
    this.element[this.name] = t2 === b ? void 0 : t2;
  }
}
const k = s$1 ? s$1.emptyScript : "";
class H extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t2) {
    t2 && t2 !== b ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
}
class I extends M {
  constructor(t2, i, s2, e2, o2) {
    super(t2, i, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i = this) {
    var s2;
    if ((t2 = null !== (s2 = V(this, t2, i, 0)) && void 0 !== s2 ? s2 : b) === x)
      return;
    const e2 = this._$AH, o2 = t2 === b && e2 !== b || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== b && (e2 === b || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i, s2;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s2 = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s2 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    V(this, t2);
  }
}
const Z = i$4.litHtmlPolyfillSupport;
null == Z || Z(P, S), (null !== (t$2 = i$4.litHtmlVersions) && void 0 !== t$2 ? t$2 : i$4.litHtmlVersions = []).push("2.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o$1;
class s extends d$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i = super.createRenderRoot();
    return null !== (t2 = (e2 = this.renderOptions).renderBefore) && void 0 !== t2 || (e2.renderBefore = i.firstChild), i;
  }
  update(t2) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = A(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), null === (t2 = this._$Do) || void 0 === t2 || t2.setConnected(false);
  }
  render() {
    return x;
  }
}
s.finalized = true, s._$litElement$ = true, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, { LitElement: s });
const n$1 = globalThis.litElementPolyfillSupport;
null == n$1 || n$1({ LitElement: s });
(null !== (o$1 = globalThis.litElementVersions) && void 0 !== o$1 ? o$1 : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$3 = (e2) => (n2) => "function" == typeof n2 ? ((e3, n3) => (customElements.define(e3, n3), n3))(e2, n2) : ((e3, n3) => {
  const { kind: t2, elements: s2 } = n3;
  return { kind: t2, elements: s2, finisher(n4) {
    customElements.define(e3, n4);
  } };
})(e2, n2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$3 = (i, e2) => "method" === e2.kind && e2.descriptor && !("value" in e2.descriptor) ? { ...e2, finisher(n2) {
  n2.createProperty(e2.key, i);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  "function" == typeof e2.initializer && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i);
} };
function e$2(e2) {
  return (n2, t2) => void 0 !== t2 ? ((i, e3, n3) => {
    e3.constructor.createProperty(n3, i);
  })(e2, n2, t2) : i$3(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t$1(t2) {
  return e$2({ ...t2, state: true });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
null != (null === (n = window.HTMLSlotElement) || void 0 === n ? void 0 : n.prototype.assignedElements) ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
var extendStatics = function(d2, b2) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
    d3.__proto__ = b3;
  } || function(d3, b3) {
    for (var p2 in b3)
      if (Object.prototype.hasOwnProperty.call(b3, p2))
        d3[p2] = b3[p2];
  };
  return extendStatics(d2, b2);
};
function __extends$1(d2, b2) {
  if (typeof b2 !== "function" && b2 !== null)
    throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
  extendStatics(d2, b2);
  function __5() {
    this.constructor = d2;
  }
  d2.prototype = b2 === null ? Object.create(b2) : (__5.prototype = b2.prototype, new __5());
}
var __assign$1 = function() {
  __assign$1 = Object.assign || function __assign2(t2) {
    for (var s2, i = 1, n2 = arguments.length; i < n2; i++) {
      s2 = arguments[i];
      for (var p2 in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p2))
          t2[p2] = s2[p2];
    }
    return t2;
  };
  return __assign$1.apply(this, arguments);
};
function __rest(s2, e2) {
  var t2 = {};
  for (var p2 in s2)
    if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
      t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s2); i < p2.length; i++) {
      if (e2.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i]))
        t2[p2[i]] = s2[p2[i]];
    }
  return t2;
}
function __decorate(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r2 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d2 = decorators[i])
        r2 = (c2 < 3 ? d2(r2) : c2 > 3 ? d2(target, key, r2) : d2(target, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
}
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve4) {
      resolve4(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve4, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve4(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _2 = { label: 0, sent: function() {
    if (t2[0] & 1)
      throw t2[1];
    return t2[1];
  }, trys: [], ops: [] }, f2, y2, t2, g2;
  return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
    return this;
  }), g2;
  function verb(n2) {
    return function(v2) {
      return step([n2, v2]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_2)
      try {
        if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
          return t2;
        if (y2 = 0, t2)
          op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _2.label++;
            return { value: op[1], done: false };
          case 5:
            _2.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _2.ops.pop();
            _2.trys.pop();
            continue;
          default:
            if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _2 = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _2.label = op[1];
              break;
            }
            if (op[0] === 6 && _2.label < t2[1]) {
              _2.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _2.label < t2[2]) {
              _2.label = t2[2];
              _2.ops.push(op);
              break;
            }
            if (t2[2])
              _2.ops.pop();
            _2.trys.pop();
            continue;
        }
        op = body.call(thisArg, _2);
      } catch (e2) {
        op = [6, e2];
        y2 = 0;
      } finally {
        f2 = t2 = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from2.length, ar; i < l2; i++) {
      if (ar || !(i in from2)) {
        if (!ar)
          ar = Array.prototype.slice.call(from2, 0, i);
        ar[i] = from2[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
const initialProps = /* @__PURE__ */ new WeakMap();
function getInitialProps(obj) {
  if (!initialProps.has(obj))
    initialProps.set(obj, /* @__PURE__ */ new Map());
  return initialProps.get(obj);
}
function getInitialProp(obj, key) {
  return getInitialProps(obj).get(key);
}
function setInitialProp(obj, key, value) {
  getInitialProps(obj).set(key, value);
}
function defineOnReactiveElement(proto, name, opts) {
  defineOnHTMLElement(proto, name, {
    ...opts,
    onSet(x2, old) {
      var _a2, _b;
      (_b = (_a2 = opts == null ? void 0 : opts.onSet) == null ? void 0 : _a2.call) == null ? void 0 : _b.call(_a2, this, x2, old);
      this.requestUpdate(name, old);
    }
  });
  const Class = proto.constructor;
  Class.createProperty(name, {
    ...Class.getPropertyOptions(name),
    noAccessor: true
  });
}
function defineOnHTMLElement(proto, name, opts) {
  Object.defineProperty(proto, name, {
    configurable: true,
    get() {
      if (opts.path) {
        return !this.controller ? getInitialProp(this, name) : this.controller[opts.path][name];
      } else {
        return !this.controller ? getInitialProp(this, name) : this.controller[name];
      }
    },
    set(value) {
      var _a2;
      if (opts.readonly)
        return;
      const old = this[name];
      if (!this.controller)
        setInitialProp(this, name, value);
      else {
        if (opts.path)
          this.controller[opts.path][name] = value;
        else
          this.controller[name] = value;
        if (opts.onSet)
          opts.onSet.call(this, value, old);
      }
      (_a2 = this.requestUpdate) == null ? void 0 : _a2.call(this, name, old);
    }
  });
}
function isReactiveElement(proto) {
  return typeof proto.constructor.createProperty === "function";
}
function controlled(options = {}) {
  return function(proto, name) {
    if (isReactiveElement(proto))
      defineOnReactiveElement(proto, name, options);
    else
      defineOnHTMLElement(proto, name, options);
  };
}
class ApolloEvent extends CustomEvent {
  constructor(type, options) {
    super(type, {
      ...options,
      bubbles: true,
      composed: true
    });
  }
}
class ApolloElementEvent extends ApolloEvent {
  constructor(type, detail) {
    super(type, {
      detail
    });
  }
}
class ApolloControllerEvent extends ApolloEvent {
  constructor(type) {
    super(type);
  }
}
const _ApolloControllerConnectedEvent = class extends ApolloControllerEvent {
  constructor(controller) {
    super(_ApolloControllerConnectedEvent.type);
    this.controller = controller;
  }
};
let ApolloControllerConnectedEvent = _ApolloControllerConnectedEvent;
__2 = new WeakMap();
__privateAdd(ApolloControllerConnectedEvent, __2, _ApolloControllerConnectedEvent.type = "apollo-controller-connected");
const _ApolloControllerDisconnectedEvent = class extends ApolloControllerEvent {
  constructor(controller) {
    super(_ApolloControllerDisconnectedEvent.type);
    this.controller = controller;
  }
};
let ApolloControllerDisconnectedEvent = _ApolloControllerDisconnectedEvent;
__3 = new WeakMap();
__privateAdd(ApolloControllerDisconnectedEvent, __3, _ApolloControllerDisconnectedEvent.type = "apollo-controller-disconnected");
class ApolloElement extends s {
  constructor() {
    var _a2;
    super(...arguments);
    this.readyToReceiveDocument = false;
    this.client = (_a2 = window.__APOLLO_CLIENT__) != null ? _a2 : null;
    this.document = null;
    this.loading = false;
    this.data = null;
    this.variables = null;
    this.error = null;
    this.errors = [];
  }
  connectedCallback() {
    this.readyToReceiveDocument = true;
    super.connectedCallback();
    this.dispatchEvent(new ApolloElementEvent("apollo-element-connected", this));
  }
  disconnectedCallback() {
    var _a2;
    this.readyToReceiveDocument = false;
    this.dispatchEvent(new ApolloElementEvent("apollo-element-disconnected", this));
    window.dispatchEvent(new ApolloElementEvent("apollo-element-disconnected", this));
    (_a2 = super.disconnectedCallback) == null ? void 0 : _a2.call(this);
  }
}
__decorate([controlled(), t$1()], ApolloElement.prototype, "client", void 0);
__decorate([controlled(), t$1()], ApolloElement.prototype, "document", void 0);
__decorate([controlled({
  path: "options"
}), t$1()], ApolloElement.prototype, "context", void 0);
__decorate([controlled(), e$2({
  reflect: true,
  type: Boolean
})], ApolloElement.prototype, "loading", void 0);
__decorate([controlled(), t$1()], ApolloElement.prototype, "data", void 0);
__decorate([controlled(), t$1()], ApolloElement.prototype, "variables", void 0);
__decorate([controlled(), t$1()], ApolloElement.prototype, "error", void 0);
__decorate([controlled(), t$1()], ApolloElement.prototype, "errors", void 0);
var genericMessage = "Invariant Violation";
var _a$3 = Object.setPrototypeOf, setPrototypeOf = _a$3 === void 0 ? function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
} : _a$3;
var InvariantError = function(_super) {
  __extends$1(InvariantError2, _super);
  function InvariantError2(message) {
    if (message === void 0) {
      message = genericMessage;
    }
    var _this = _super.call(this, typeof message === "number" ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)" : message) || this;
    _this.framesToPop = 1;
    _this.name = genericMessage;
    setPrototypeOf(_this, InvariantError2.prototype);
    return _this;
  }
  return InvariantError2;
}(Error);
function invariant$1(condition, message) {
  if (!condition) {
    throw new InvariantError(message);
  }
}
var verbosityLevels = ["debug", "log", "warn", "error", "silent"];
var verbosityLevel = verbosityLevels.indexOf("log");
function wrapConsoleMethod(name) {
  return function() {
    if (verbosityLevels.indexOf(name) >= verbosityLevel) {
      var method = console[name] || console.log;
      return method.apply(console, arguments);
    }
  };
}
(function(invariant2) {
  invariant2.debug = wrapConsoleMethod("debug");
  invariant2.log = wrapConsoleMethod("log");
  invariant2.warn = wrapConsoleMethod("warn");
  invariant2.error = wrapConsoleMethod("error");
})(invariant$1 || (invariant$1 = {}));
function setVerbosity(level) {
  var old = verbosityLevels[verbosityLevel];
  verbosityLevel = Math.max(0, verbosityLevels.indexOf(level));
  return old;
}
function maybe$1(thunk) {
  try {
    return thunk();
  } catch (_a2) {
  }
}
var global$1 = maybe$1(function() {
  return globalThis;
}) || maybe$1(function() {
  return window;
}) || maybe$1(function() {
  return self;
}) || maybe$1(function() {
  return global;
}) || maybe$1(function() {
  return maybe$1.constructor("return this")();
});
var __ = "__";
var GLOBAL_KEY = [__, __].join("DEV");
function getDEV() {
  try {
    return Boolean(__DEV__);
  } catch (_a2) {
    Object.defineProperty(global$1, GLOBAL_KEY, {
      value: maybe$1(function() {
        return "production";
      }) !== "production",
      enumerable: false,
      configurable: true,
      writable: true
    });
    return global$1[GLOBAL_KEY];
  }
}
var DEV = getDEV();
function maybe(thunk) {
  try {
    return thunk();
  } catch (_2) {
  }
}
var safeGlobal = maybe(function() {
  return globalThis;
}) || maybe(function() {
  return window;
}) || maybe(function() {
  return self;
}) || maybe(function() {
  return global;
}) || maybe(function() {
  return maybe.constructor("return this")();
});
var needToRemove = false;
function install() {
  if (safeGlobal && !maybe(function() {
    return "production";
  }) && !maybe(function() {
    return process;
  })) {
    Object.defineProperty(safeGlobal, "process", {
      value: {
        env: {
          NODE_ENV: "production"
        }
      },
      configurable: true,
      enumerable: false,
      writable: true
    });
    needToRemove = true;
  }
}
install();
function remove() {
  if (needToRemove) {
    delete safeGlobal.process;
    needToRemove = false;
  }
}
var version$1 = "15.8.0";
var versionInfo = Object.freeze({
  major: 15,
  minor: 8,
  patch: 0,
  preReleaseTag: null
});
function isPromise$1(value) {
  return typeof (value === null || value === void 0 ? void 0 : value.then) === "function";
}
function _typeof$3(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$3 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$3 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$3(obj);
}
function isObjectLike(value) {
  return _typeof$3(value) == "object" && value !== null;
}
var SYMBOL_ITERATOR = typeof Symbol === "function" && Symbol.iterator != null ? Symbol.iterator : "@@iterator";
var SYMBOL_ASYNC_ITERATOR = typeof Symbol === "function" && Symbol.asyncIterator != null ? Symbol.asyncIterator : "@@asyncIterator";
var SYMBOL_TO_STRING_TAG = typeof Symbol === "function" && Symbol.toStringTag != null ? Symbol.toStringTag : "@@toStringTag";
function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match;
  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }
  return {
    line,
    column
  };
}
function printLocation(location) {
  return printSourceLocation(location.source, getLocation(location.source, location.start));
}
function printSourceLocation(source, sourceLocation) {
  var firstLineColumnOffset = source.locationOffset.column - 1;
  var body = whitespace(firstLineColumnOffset) + source.body;
  var lineIndex = sourceLocation.line - 1;
  var lineOffset = source.locationOffset.line - 1;
  var lineNum = sourceLocation.line + lineOffset;
  var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  var columnNum = sourceLocation.column + columnOffset;
  var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
  var lines = body.split(/\r\n|[\n\r]/g);
  var locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    var subLineIndex = Math.floor(columnNum / 80);
    var subLineColumnNum = columnNum % 80;
    var subLines = [];
    for (var i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }
    return locationStr + printPrefixedLines([["".concat(lineNum), subLines[0]]].concat(subLines.slice(1, subLineIndex + 1).map(function(subLine) {
      return ["", subLine];
    }), [[" ", whitespace(subLineColumnNum - 1) + "^"], ["", subLines[subLineIndex + 1]]]));
  }
  return locationStr + printPrefixedLines([
    ["".concat(lineNum - 1), lines[lineIndex - 1]],
    ["".concat(lineNum), locationLine],
    ["", whitespace(columnNum - 1) + "^"],
    ["".concat(lineNum + 1), lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  var existingLines = lines.filter(function(_ref) {
    _ref[0];
    var line = _ref[1];
    return line !== void 0;
  });
  var padLen = Math.max.apply(Math, existingLines.map(function(_ref2) {
    var prefix = _ref2[0];
    return prefix.length;
  }));
  return existingLines.map(function(_ref3) {
    var prefix = _ref3[0], line = _ref3[1];
    return leftPad(padLen, prefix) + (line ? " | " + line : " |");
  }).join("\n");
}
function whitespace(len) {
  return Array(len + 1).join(" ");
}
function leftPad(len, str) {
  return whitespace(len - str.length) + str;
}
function _typeof$2(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$2 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$2 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$2(obj);
}
function ownKeys$7(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$7(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$7(Object(source), true).forEach(function(key) {
        _defineProperty$9(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$7(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$9(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$5(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$5(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$5(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$5(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self2);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a2 = [null];
      a2.push.apply(a2, args2);
      var Constructor = Function.bind.apply(Parent2, a2);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o2, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o2, p2);
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
var GraphQLError = /* @__PURE__ */ function(_Error) {
  _inherits(GraphQLError2, _Error);
  var _super = _createSuper(GraphQLError2);
  function GraphQLError2(message, nodes, source, positions, path, originalError, extensions) {
    var _nodeLocations, _nodeLocations2, _nodeLocations3;
    var _this;
    _classCallCheck(this, GraphQLError2);
    _this = _super.call(this, message);
    _this.name = "GraphQLError";
    _this.originalError = originalError !== null && originalError !== void 0 ? originalError : void 0;
    _this.nodes = undefinedIfEmpty(Array.isArray(nodes) ? nodes : nodes ? [nodes] : void 0);
    var nodeLocations = [];
    for (var _i2 = 0, _ref3 = (_this$nodes = _this.nodes) !== null && _this$nodes !== void 0 ? _this$nodes : []; _i2 < _ref3.length; _i2++) {
      var _this$nodes;
      var _ref4 = _ref3[_i2];
      var loc = _ref4.loc;
      if (loc != null) {
        nodeLocations.push(loc);
      }
    }
    nodeLocations = undefinedIfEmpty(nodeLocations);
    _this.source = source !== null && source !== void 0 ? source : (_nodeLocations = nodeLocations) === null || _nodeLocations === void 0 ? void 0 : _nodeLocations[0].source;
    _this.positions = positions !== null && positions !== void 0 ? positions : (_nodeLocations2 = nodeLocations) === null || _nodeLocations2 === void 0 ? void 0 : _nodeLocations2.map(function(loc2) {
      return loc2.start;
    });
    _this.locations = positions && source ? positions.map(function(pos) {
      return getLocation(source, pos);
    }) : (_nodeLocations3 = nodeLocations) === null || _nodeLocations3 === void 0 ? void 0 : _nodeLocations3.map(function(loc2) {
      return getLocation(loc2.source, loc2.start);
    });
    _this.path = path !== null && path !== void 0 ? path : void 0;
    var originalExtensions = originalError === null || originalError === void 0 ? void 0 : originalError.extensions;
    if (extensions == null && isObjectLike(originalExtensions)) {
      _this.extensions = _objectSpread$7({}, originalExtensions);
    } else {
      _this.extensions = extensions !== null && extensions !== void 0 ? extensions : {};
    }
    Object.defineProperties(_assertThisInitialized(_this), {
      message: {
        enumerable: true
      },
      locations: {
        enumerable: _this.locations != null
      },
      path: {
        enumerable: _this.path != null
      },
      extensions: {
        enumerable: _this.extensions != null && Object.keys(_this.extensions).length > 0
      },
      name: {
        enumerable: false
      },
      nodes: {
        enumerable: false
      },
      source: {
        enumerable: false
      },
      positions: {
        enumerable: false
      },
      originalError: {
        enumerable: false
      }
    });
    if (originalError !== null && originalError !== void 0 && originalError.stack) {
      Object.defineProperty(_assertThisInitialized(_this), "stack", {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
      return _possibleConstructorReturn(_this);
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError2);
    } else {
      Object.defineProperty(_assertThisInitialized(_this), "stack", {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }
    return _this;
  }
  _createClass$5(GraphQLError2, [{
    key: "toString",
    value: function toString4() {
      return printError(this);
    }
  }, {
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "Object";
    }
  }]);
  return GraphQLError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function undefinedIfEmpty(array) {
  return array === void 0 || array.length === 0 ? void 0 : array;
}
function printError(error) {
  var output = error.message;
  if (error.nodes) {
    for (var _i4 = 0, _error$nodes2 = error.nodes; _i4 < _error$nodes2.length; _i4++) {
      var node = _error$nodes2[_i4];
      if (node.loc) {
        output += "\n\n" + printLocation(node.loc);
      }
    }
  } else if (error.source && error.locations) {
    for (var _i6 = 0, _error$locations2 = error.locations; _i6 < _error$locations2.length; _i6++) {
      var location = _error$locations2[_i6];
      output += "\n\n" + printSourceLocation(error.source, location);
    }
  }
  return output;
}
function syntaxError(source, position, description) {
  return new GraphQLError("Syntax Error: ".concat(description), void 0, source, [position]);
}
var Kind = Object.freeze({
  NAME: "Name",
  DOCUMENT: "Document",
  OPERATION_DEFINITION: "OperationDefinition",
  VARIABLE_DEFINITION: "VariableDefinition",
  SELECTION_SET: "SelectionSet",
  FIELD: "Field",
  ARGUMENT: "Argument",
  FRAGMENT_SPREAD: "FragmentSpread",
  INLINE_FRAGMENT: "InlineFragment",
  FRAGMENT_DEFINITION: "FragmentDefinition",
  VARIABLE: "Variable",
  INT: "IntValue",
  FLOAT: "FloatValue",
  STRING: "StringValue",
  BOOLEAN: "BooleanValue",
  NULL: "NullValue",
  ENUM: "EnumValue",
  LIST: "ListValue",
  OBJECT: "ObjectValue",
  OBJECT_FIELD: "ObjectField",
  DIRECTIVE: "Directive",
  NAMED_TYPE: "NamedType",
  LIST_TYPE: "ListType",
  NON_NULL_TYPE: "NonNullType",
  SCHEMA_DEFINITION: "SchemaDefinition",
  OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
  SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
  OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
  FIELD_DEFINITION: "FieldDefinition",
  INPUT_VALUE_DEFINITION: "InputValueDefinition",
  INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
  UNION_TYPE_DEFINITION: "UnionTypeDefinition",
  ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
  ENUM_VALUE_DEFINITION: "EnumValueDefinition",
  INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
  DIRECTIVE_DEFINITION: "DirectiveDefinition",
  SCHEMA_EXTENSION: "SchemaExtension",
  SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
  OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
  INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
  UNION_TYPE_EXTENSION: "UnionTypeExtension",
  ENUM_TYPE_EXTENSION: "EnumTypeExtension",
  INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension"
});
function invariant(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message != null ? message : "Unexpected invariant triggered.");
  }
}
var nodejsCustomInspectSymbol = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("nodejs.util.inspect.custom") : void 0;
var nodejsCustomInspectSymbol$1 = nodejsCustomInspectSymbol;
function defineInspect(classObject) {
  var fn = classObject.prototype.toJSON;
  typeof fn === "function" || invariant(0);
  classObject.prototype.inspect = fn;
  if (nodejsCustomInspectSymbol$1) {
    classObject.prototype[nodejsCustomInspectSymbol$1] = fn;
  }
}
var Location = /* @__PURE__ */ function() {
  function Location2(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }
  var _proto = Location2.prototype;
  _proto.toJSON = function toJSON3() {
    return {
      start: this.start,
      end: this.end
    };
  };
  return Location2;
}();
defineInspect(Location);
var Token = /* @__PURE__ */ function() {
  function Token2(kind, start, end, line, column, prev, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = prev;
    this.next = null;
  }
  var _proto2 = Token2.prototype;
  _proto2.toJSON = function toJSON3() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  };
  return Token2;
}();
defineInspect(Token);
function isNode(maybeNode) {
  return maybeNode != null && typeof maybeNode.kind === "string";
}
var TokenKind = Object.freeze({
  SOF: "<SOF>",
  EOF: "<EOF>",
  BANG: "!",
  DOLLAR: "$",
  AMP: "&",
  PAREN_L: "(",
  PAREN_R: ")",
  SPREAD: "...",
  COLON: ":",
  EQUALS: "=",
  AT: "@",
  BRACKET_L: "[",
  BRACKET_R: "]",
  BRACE_L: "{",
  PIPE: "|",
  BRACE_R: "}",
  NAME: "Name",
  INT: "Int",
  FLOAT: "Float",
  STRING: "String",
  BLOCK_STRING: "BlockString",
  COMMENT: "Comment"
});
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (_typeof$1(value)) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? "[function ".concat(value.name, "]") : "[function]";
    case "object":
      if (value === null) {
        return "null";
      }
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (previouslySeenValues.indexOf(value) !== -1) {
    return "[Circular]";
  }
  var seenValues = [].concat(previouslySeenValues, [value]);
  var customInspectFn = getCustomFn(value);
  if (customInspectFn !== void 0) {
    var customValue = customInspectFn.call(value);
    if (customValue !== value) {
      return typeof customValue === "string" ? customValue : formatValue(customValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function formatObject(object, seenValues) {
  var keys = Object.keys(object);
  if (keys.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  var properties = keys.map(function(key) {
    var value = formatValue(object[key], seenValues);
    return key + ": " + value;
  });
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
  var remaining = array.length - len;
  var items = [];
  for (var i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push("... ".concat(remaining, " more items"));
  }
  return "[" + items.join(", ") + "]";
}
function getCustomFn(object) {
  var customInspectFn = object[String(nodejsCustomInspectSymbol$1)];
  if (typeof customInspectFn === "function") {
    return customInspectFn;
  }
  if (typeof object.inspect === "function") {
    return object.inspect;
  }
}
function getObjectTag(object) {
  var tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    var name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}
function devAssert(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}
var instanceOf = function instanceOf2(value, constructor) {
  return value instanceof constructor;
};
function _defineProperties$4(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$4(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$4(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$4(Constructor, staticProps);
  return Constructor;
}
var Source = /* @__PURE__ */ function() {
  function Source2(body) {
    var name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "GraphQL request";
    var locationOffset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      line: 1,
      column: 1
    };
    typeof body === "string" || devAssert(0, "Body must be a string. Received: ".concat(inspect(body), "."));
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || devAssert(0, "line in locationOffset is 1-indexed and must be positive.");
    this.locationOffset.column > 0 || devAssert(0, "column in locationOffset is 1-indexed and must be positive.");
  }
  _createClass$4(Source2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "Source";
    }
  }]);
  return Source2;
}();
function isSource(source) {
  return instanceOf(source, Source);
}
var DirectiveLocation = Object.freeze({
  QUERY: "QUERY",
  MUTATION: "MUTATION",
  SUBSCRIPTION: "SUBSCRIPTION",
  FIELD: "FIELD",
  FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION",
  FRAGMENT_SPREAD: "FRAGMENT_SPREAD",
  INLINE_FRAGMENT: "INLINE_FRAGMENT",
  VARIABLE_DEFINITION: "VARIABLE_DEFINITION",
  SCHEMA: "SCHEMA",
  SCALAR: "SCALAR",
  OBJECT: "OBJECT",
  FIELD_DEFINITION: "FIELD_DEFINITION",
  ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION",
  INTERFACE: "INTERFACE",
  UNION: "UNION",
  ENUM: "ENUM",
  ENUM_VALUE: "ENUM_VALUE",
  INPUT_OBJECT: "INPUT_OBJECT",
  INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION"
});
function dedentBlockStringValue(rawString) {
  var lines = rawString.split(/\r\n|[\n\r]/g);
  var commonIndent = getBlockStringIndentation(rawString);
  if (commonIndent !== 0) {
    for (var i = 1; i < lines.length; i++) {
      lines[i] = lines[i].slice(commonIndent);
    }
  }
  var startLine = 0;
  while (startLine < lines.length && isBlank(lines[startLine])) {
    ++startLine;
  }
  var endLine = lines.length;
  while (endLine > startLine && isBlank(lines[endLine - 1])) {
    --endLine;
  }
  return lines.slice(startLine, endLine).join("\n");
}
function isBlank(str) {
  for (var i = 0; i < str.length; ++i) {
    if (str[i] !== " " && str[i] !== "	") {
      return false;
    }
  }
  return true;
}
function getBlockStringIndentation(value) {
  var _commonIndent;
  var isFirstLine = true;
  var isEmptyLine = true;
  var indent2 = 0;
  var commonIndent = null;
  for (var i = 0; i < value.length; ++i) {
    switch (value.charCodeAt(i)) {
      case 13:
        if (value.charCodeAt(i + 1) === 10) {
          ++i;
        }
      case 10:
        isFirstLine = false;
        isEmptyLine = true;
        indent2 = 0;
        break;
      case 9:
      case 32:
        ++indent2;
        break;
      default:
        if (isEmptyLine && !isFirstLine && (commonIndent === null || indent2 < commonIndent)) {
          commonIndent = indent2;
        }
        isEmptyLine = false;
    }
  }
  return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
}
function printBlockString(value) {
  var indentation = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var preferMultipleLines = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var isSingleLine = value.indexOf("\n") === -1;
  var hasLeadingSpace = value[0] === " " || value[0] === "	";
  var hasTrailingQuote = value[value.length - 1] === '"';
  var hasTrailingSlash = value[value.length - 1] === "\\";
  var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
  var result = "";
  if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
    result += "\n" + indentation;
  }
  result += indentation ? value.replace(/\n/g, "\n" + indentation) : value;
  if (printAsMultipleLines) {
    result += "\n";
  }
  return '"""' + result.replace(/"""/g, '\\"""') + '"""';
}
var Lexer = /* @__PURE__ */ function() {
  function Lexer2(source) {
    var startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0, null);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  var _proto = Lexer2.prototype;
  _proto.advance = function advance() {
    this.lastToken = this.token;
    var token = this.token = this.lookahead();
    return token;
  };
  _proto.lookahead = function lookahead() {
    var token = this.token;
    if (token.kind !== TokenKind.EOF) {
      do {
        var _token$next;
        token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
      } while (token.kind === TokenKind.COMMENT);
    }
    return token;
  };
  return Lexer2;
}();
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function printCharCode(code) {
  return isNaN(code) ? TokenKind.EOF : code < 127 ? JSON.stringify(String.fromCharCode(code)) : '"\\u'.concat(("00" + code.toString(16).toUpperCase()).slice(-4), '"');
}
function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;
  var pos = prev.end;
  while (pos < bodyLength) {
    var code = body.charCodeAt(pos);
    var _line = lexer.line;
    var _col = 1 + pos - lexer.lineStart;
    switch (code) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++pos;
        continue;
      case 10:
        ++pos;
        ++lexer.line;
        lexer.lineStart = pos;
        continue;
      case 13:
        if (body.charCodeAt(pos + 1) === 10) {
          pos += 2;
        } else {
          ++pos;
        }
        ++lexer.line;
        lexer.lineStart = pos;
        continue;
      case 33:
        return new Token(TokenKind.BANG, pos, pos + 1, _line, _col, prev);
      case 35:
        return readComment(source, pos, _line, _col, prev);
      case 36:
        return new Token(TokenKind.DOLLAR, pos, pos + 1, _line, _col, prev);
      case 38:
        return new Token(TokenKind.AMP, pos, pos + 1, _line, _col, prev);
      case 40:
        return new Token(TokenKind.PAREN_L, pos, pos + 1, _line, _col, prev);
      case 41:
        return new Token(TokenKind.PAREN_R, pos, pos + 1, _line, _col, prev);
      case 46:
        if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
          return new Token(TokenKind.SPREAD, pos, pos + 3, _line, _col, prev);
        }
        break;
      case 58:
        return new Token(TokenKind.COLON, pos, pos + 1, _line, _col, prev);
      case 61:
        return new Token(TokenKind.EQUALS, pos, pos + 1, _line, _col, prev);
      case 64:
        return new Token(TokenKind.AT, pos, pos + 1, _line, _col, prev);
      case 91:
        return new Token(TokenKind.BRACKET_L, pos, pos + 1, _line, _col, prev);
      case 93:
        return new Token(TokenKind.BRACKET_R, pos, pos + 1, _line, _col, prev);
      case 123:
        return new Token(TokenKind.BRACE_L, pos, pos + 1, _line, _col, prev);
      case 124:
        return new Token(TokenKind.PIPE, pos, pos + 1, _line, _col, prev);
      case 125:
        return new Token(TokenKind.BRACE_R, pos, pos + 1, _line, _col, prev);
      case 34:
        if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
          return readBlockString(source, pos, _line, _col, prev, lexer);
        }
        return readString(source, pos, _line, _col, prev);
      case 45:
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return readNumber(source, pos, code, _line, _col, prev);
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
      case 75:
      case 76:
      case 77:
      case 78:
      case 79:
      case 80:
      case 81:
      case 82:
      case 83:
      case 84:
      case 85:
      case 86:
      case 87:
      case 88:
      case 89:
      case 90:
      case 95:
      case 97:
      case 98:
      case 99:
      case 100:
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
      case 106:
      case 107:
      case 108:
      case 109:
      case 110:
      case 111:
      case 112:
      case 113:
      case 114:
      case 115:
      case 116:
      case 117:
      case 118:
      case 119:
      case 120:
      case 121:
      case 122:
        return readName(source, pos, _line, _col, prev);
    }
    throw syntaxError(source, pos, unexpectedCharacterMessage(code));
  }
  var line = lexer.line;
  var col = 1 + pos - lexer.lineStart;
  return new Token(TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
}
function unexpectedCharacterMessage(code) {
  if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
    return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
  }
  if (code === 39) {
    return `Unexpected single quote character ('), did you mean to use a double quote (")?`;
  }
  return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
}
function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code;
  var position = start;
  do {
    code = body.charCodeAt(++position);
  } while (!isNaN(code) && (code > 31 || code === 9));
  return new Token(TokenKind.COMMENT, start, position, line, col, prev, body.slice(start + 1, position));
}
function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (code >= 48 && code <= 57) {
      throw syntaxError(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
    }
  } else {
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
  }
  return new Token(isFloat ? TokenKind.FLOAT : TokenKind.INT, start, position, line, col, prev, body.slice(start, position));
}
function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;
  if (code >= 48 && code <= 57) {
    do {
      code = body.charCodeAt(++position);
    } while (code >= 48 && code <= 57);
    return position;
  }
  throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
}
function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = "";
  while (position < body.length && !isNaN(code = body.charCodeAt(position)) && code !== 10 && code !== 13) {
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return new Token(TokenKind.STRING, start, position + 1, line, col, prev, value);
    }
    if (code < 32 && code !== 9) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }
    ++position;
    if (code === 92) {
      value += body.slice(chunkStart, position - 1);
      code = body.charCodeAt(position);
      switch (code) {
        case 34:
          value += '"';
          break;
        case 47:
          value += "/";
          break;
        case 92:
          value += "\\";
          break;
        case 98:
          value += "\b";
          break;
        case 102:
          value += "\f";
          break;
        case 110:
          value += "\n";
          break;
        case 114:
          value += "\r";
          break;
        case 116:
          value += "	";
          break;
        case 117: {
          var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));
          if (charCode < 0) {
            var invalidSequence = body.slice(position + 1, position + 5);
            throw syntaxError(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
          }
          value += String.fromCharCode(charCode);
          position += 4;
          break;
        }
        default:
          throw syntaxError(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
      }
      ++position;
      chunkStart = position;
    }
  }
  throw syntaxError(source, position, "Unterminated string.");
}
function readBlockString(source, start, line, col, prev, lexer) {
  var body = source.body;
  var position = start + 3;
  var chunkStart = position;
  var code = 0;
  var rawValue = "";
  while (position < body.length && !isNaN(code = body.charCodeAt(position))) {
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      rawValue += body.slice(chunkStart, position);
      return new Token(TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, dedentBlockStringValue(rawValue));
    }
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }
    if (code === 10) {
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      if (body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      rawValue += body.slice(chunkStart, position) + '"""';
      position += 4;
      chunkStart = position;
    } else {
      ++position;
    }
  }
  throw syntaxError(source, position, "Unterminated string.");
}
function uniCharCode(a2, b2, c2, d2) {
  return char2hex(a2) << 12 | char2hex(b2) << 8 | char2hex(c2) << 4 | char2hex(d2);
}
function char2hex(a2) {
  return a2 >= 48 && a2 <= 57 ? a2 - 48 : a2 >= 65 && a2 <= 70 ? a2 - 55 : a2 >= 97 && a2 <= 102 ? a2 - 87 : -1;
}
function readName(source, start, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var position = start + 1;
  var code = 0;
  while (position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122)) {
    ++position;
  }
  return new Token(TokenKind.NAME, start, position, line, col, prev, body.slice(start, position));
}
function isNameStart(code) {
  return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
}
function parse(source, options) {
  var parser = new Parser(source, options);
  return parser.parseDocument();
}
function parseValue(source, options) {
  var parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  var value = parser.parseValueLiteral(false);
  parser.expectToken(TokenKind.EOF);
  return value;
}
function parseType(source, options) {
  var parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  var type = parser.parseTypeReference();
  parser.expectToken(TokenKind.EOF);
  return type;
}
var Parser = /* @__PURE__ */ function() {
  function Parser2(source, options) {
    var sourceObj = isSource(source) ? source : new Source(source);
    this._lexer = new Lexer(sourceObj);
    this._options = options;
  }
  var _proto = Parser2.prototype;
  _proto.parseName = function parseName() {
    var token = this.expectToken(TokenKind.NAME);
    return {
      kind: Kind.NAME,
      value: token.value,
      loc: this.loc(token)
    };
  };
  _proto.parseDocument = function parseDocument2() {
    var start = this._lexer.token;
    return {
      kind: Kind.DOCUMENT,
      definitions: this.many(TokenKind.SOF, this.parseDefinition, TokenKind.EOF),
      loc: this.loc(start)
    };
  };
  _proto.parseDefinition = function parseDefinition() {
    if (this.peek(TokenKind.NAME)) {
      switch (this._lexer.token.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "schema":
        case "scalar":
        case "type":
        case "interface":
        case "union":
        case "enum":
        case "input":
        case "directive":
          return this.parseTypeSystemDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    } else if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } else if (this.peekDescription()) {
      return this.parseTypeSystemDefinition();
    }
    throw this.unexpected();
  };
  _proto.parseOperationDefinition = function parseOperationDefinition() {
    var start = this._lexer.token;
    if (this.peek(TokenKind.BRACE_L)) {
      return {
        kind: Kind.OPERATION_DEFINITION,
        operation: "query",
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }
    var operation = this.parseOperationType();
    var name;
    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }
    return {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseOperationType = function parseOperationType() {
    var operationToken = this.expectToken(TokenKind.NAME);
    switch (operationToken.value) {
      case "query":
        return "query";
      case "mutation":
        return "mutation";
      case "subscription":
        return "subscription";
    }
    throw this.unexpected(operationToken);
  };
  _proto.parseVariableDefinitions = function parseVariableDefinitions() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseVariableDefinition, TokenKind.PAREN_R);
  };
  _proto.parseVariableDefinition = function parseVariableDefinition() {
    var start = this._lexer.token;
    return {
      kind: Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseValueLiteral(true) : void 0,
      directives: this.parseDirectives(true),
      loc: this.loc(start)
    };
  };
  _proto.parseVariable = function parseVariable() {
    var start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return {
      kind: Kind.VARIABLE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  };
  _proto.parseSelectionSet = function parseSelectionSet() {
    var start = this._lexer.token;
    return {
      kind: Kind.SELECTION_SET,
      selections: this.many(TokenKind.BRACE_L, this.parseSelection, TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  };
  _proto.parseSelection = function parseSelection() {
    return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
  };
  _proto.parseField = function parseField() {
    var start = this._lexer.token;
    var nameOrAlias = this.parseName();
    var alias;
    var name;
    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }
    return {
      kind: Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0,
      loc: this.loc(start)
    };
  };
  _proto.parseArguments = function parseArguments(isConst) {
    var item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  };
  _proto.parseArgument = function parseArgument() {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(false),
      loc: this.loc(start)
    };
  };
  _proto.parseConstArgument = function parseConstArgument() {
    var start = this._lexer.token;
    return {
      kind: Kind.ARGUMENT,
      name: this.parseName(),
      value: (this.expectToken(TokenKind.COLON), this.parseValueLiteral(true)),
      loc: this.loc(start)
    };
  };
  _proto.parseFragment = function parseFragment() {
    var start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    var hasTypeCondition = this.expectOptionalKeyword("on");
    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
        loc: this.loc(start)
      };
    }
    return {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseFragmentDefinition = function parseFragmentDefinition() {
    var _this$_options;
    var start = this._lexer.token;
    this.expectKeyword("fragment");
    if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
      return {
        kind: Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }
    return {
      kind: Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseFragmentName = function parseFragmentName() {
    if (this._lexer.token.value === "on") {
      throw this.unexpected();
    }
    return this.parseName();
  };
  _proto.parseValueLiteral = function parseValueLiteral(isConst) {
    var token = this._lexer.token;
    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);
      case TokenKind.BRACE_L:
        return this.parseObject(isConst);
      case TokenKind.INT:
        this._lexer.advance();
        return {
          kind: Kind.INT,
          value: token.value,
          loc: this.loc(token)
        };
      case TokenKind.FLOAT:
        this._lexer.advance();
        return {
          kind: Kind.FLOAT,
          value: token.value,
          loc: this.loc(token)
        };
      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();
      case TokenKind.NAME:
        this._lexer.advance();
        switch (token.value) {
          case "true":
            return {
              kind: Kind.BOOLEAN,
              value: true,
              loc: this.loc(token)
            };
          case "false":
            return {
              kind: Kind.BOOLEAN,
              value: false,
              loc: this.loc(token)
            };
          case "null":
            return {
              kind: Kind.NULL,
              loc: this.loc(token)
            };
          default:
            return {
              kind: Kind.ENUM,
              value: token.value,
              loc: this.loc(token)
            };
        }
      case TokenKind.DOLLAR:
        if (!isConst) {
          return this.parseVariable();
        }
        break;
    }
    throw this.unexpected();
  };
  _proto.parseStringLiteral = function parseStringLiteral() {
    var token = this._lexer.token;
    this._lexer.advance();
    return {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING,
      loc: this.loc(token)
    };
  };
  _proto.parseList = function parseList(isConst) {
    var _this = this;
    var start = this._lexer.token;
    var item = function item2() {
      return _this.parseValueLiteral(isConst);
    };
    return {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
      loc: this.loc(start)
    };
  };
  _proto.parseObject = function parseObject(isConst) {
    var _this2 = this;
    var start = this._lexer.token;
    var item = function item2() {
      return _this2.parseObjectField(isConst);
    };
    return {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  };
  _proto.parseObjectField = function parseObjectField(isConst) {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst),
      loc: this.loc(start)
    };
  };
  _proto.parseDirectives = function parseDirectives(isConst) {
    var directives = [];
    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }
    return directives;
  };
  _proto.parseDirective = function parseDirective(isConst) {
    var start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
      loc: this.loc(start)
    };
  };
  _proto.parseTypeReference = function parseTypeReference() {
    var start = this._lexer.token;
    var type;
    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      type = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = {
        kind: Kind.LIST_TYPE,
        type,
        loc: this.loc(start)
      };
    } else {
      type = this.parseNamedType();
    }
    if (this.expectOptionalToken(TokenKind.BANG)) {
      return {
        kind: Kind.NON_NULL_TYPE,
        type,
        loc: this.loc(start)
      };
    }
    return type;
  };
  _proto.parseNamedType = function parseNamedType() {
    var start = this._lexer.token;
    return {
      kind: Kind.NAMED_TYPE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  };
  _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
    var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
    }
    throw this.unexpected(keywordToken);
  };
  _proto.peekDescription = function peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  };
  _proto.parseDescription = function parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  };
  _proto.parseSchemaDefinition = function parseSchemaDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("schema");
    var directives = this.parseDirectives(true);
    var operationTypes = this.many(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    return {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes,
      loc: this.loc(start)
    };
  };
  _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
    var start = this._lexer.token;
    var operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    var type = this.parseNamedType();
    return {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type,
      loc: this.loc(start)
    };
  };
  _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("scalar");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("type");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseFieldsDefinition();
    return {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
    var _this$_options2;
    if (!this.expectOptionalKeyword("implements")) {
      return [];
    }
    if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true) {
      var types2 = [];
      this.expectOptionalToken(TokenKind.AMP);
      do {
        types2.push(this.parseNamedType());
      } while (this.expectOptionalToken(TokenKind.AMP) || this.peek(TokenKind.NAME));
      return types2;
    }
    return this.delimitedMany(TokenKind.AMP, this.parseNamedType);
  };
  _proto.parseFieldsDefinition = function parseFieldsDefinition() {
    var _this$_options3;
    if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(TokenKind.BRACE_L) && this._lexer.lookahead().kind === TokenKind.BRACE_R) {
      this._lexer.advance();
      this._lexer.advance();
      return [];
    }
    return this.optionalMany(TokenKind.BRACE_L, this.parseFieldDefinition, TokenKind.BRACE_R);
  };
  _proto.parseFieldDefinition = function parseFieldDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseArgumentDefs = function parseArgumentDefs() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseInputValueDef, TokenKind.PAREN_R);
  };
  _proto.parseInputValueDef = function parseInputValueDef() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var defaultValue;
    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseValueLiteral(true);
    }
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("interface");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseFieldsDefinition();
    return {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("union");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types2 = this.parseUnionMemberTypes();
    return {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types: types2,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
  };
  _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("enum");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    return {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values,
      loc: this.loc(start)
    };
  };
  _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseEnumValueDefinition, TokenKind.BRACE_R);
  };
  _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("input");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseInputFieldsDefinition();
    return {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseInputValueDef, TokenKind.BRACE_R);
  };
  _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
    var keywordToken = this._lexer.lookahead();
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    }
    throw this.unexpected(keywordToken);
  };
  _proto.parseSchemaExtension = function parseSchemaExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("schema");
    var directives = this.parseDirectives(true);
    var operationTypes = this.optionalMany(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes,
      loc: this.loc(start)
    };
  };
  _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("scalar");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    if (directives.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("type");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields7.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("interface");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields7.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("union");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types2 = this.parseUnionMemberTypes();
    if (directives.length === 0 && types2.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types: types2,
      loc: this.loc(start)
    };
  };
  _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("enum");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values,
      loc: this.loc(start)
    };
  };
  _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("input");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields7 = this.parseInputFieldsDefinition();
    if (directives.length === 0 && fields7.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields: fields7,
      loc: this.loc(start)
    };
  };
  _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("directive");
    this.expectToken(TokenKind.AT);
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    var repeatable = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    var locations = this.parseDirectiveLocations();
    return {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations,
      loc: this.loc(start)
    };
  };
  _proto.parseDirectiveLocations = function parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  };
  _proto.parseDirectiveLocation = function parseDirectiveLocation() {
    var start = this._lexer.token;
    var name = this.parseName();
    if (DirectiveLocation[name.value] !== void 0) {
      return name;
    }
    throw this.unexpected(start);
  };
  _proto.loc = function loc(startToken) {
    var _this$_options4;
    if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
      return new Location(startToken, this._lexer.lastToken, this._lexer.source);
    }
  };
  _proto.peek = function peek(kind) {
    return this._lexer.token.kind === kind;
  };
  _proto.expectToken = function expectToken(kind) {
    var token = this._lexer.token;
    if (token.kind === kind) {
      this._lexer.advance();
      return token;
    }
    throw syntaxError(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
  };
  _proto.expectOptionalToken = function expectOptionalToken(kind) {
    var token = this._lexer.token;
    if (token.kind === kind) {
      this._lexer.advance();
      return token;
    }
    return void 0;
  };
  _proto.expectKeyword = function expectKeyword(value) {
    var token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();
    } else {
      throw syntaxError(this._lexer.source, token.start, 'Expected "'.concat(value, '", found ').concat(getTokenDesc(token), "."));
    }
  };
  _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
    var token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();
      return true;
    }
    return false;
  };
  _proto.unexpected = function unexpected(atToken) {
    var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
  };
  _proto.any = function any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];
    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }
    return nodes;
  };
  _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      var nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));
      return nodes;
    }
    return [];
  };
  _proto.many = function many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));
    return nodes;
  };
  _proto.delimitedMany = function delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    var nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));
    return nodes;
  };
  return Parser2;
}();
function getTokenDesc(token) {
  var value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ' "'.concat(value, '"') : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? '"'.concat(kind, '"') : kind;
}
var QueryDocumentKeys = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: ["name", "variableDefinitions", "directives", "selectionSet"],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: ["description", "name", "type", "defaultValue", "directives"],
  InterfaceTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
};
var BREAK = Object.freeze({});
function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : QueryDocumentKeys;
  var stack = void 0;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = void 0;
  var key = void 0;
  var parent = void 0;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};
          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
            var k2 = _Object$keys2[_i2];
            clone[k2] = node[k2];
          }
          node = clone;
        }
        var editOffset = 0;
        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : void 0;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === void 0) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }
    var result = void 0;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error("Invalid AST Node: ".concat(inspect(node), "."));
      }
      var visitFn = getVisitFn(visitor, node.kind, isLeaving);
      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);
        if (result === BREAK) {
          break;
        }
        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== void 0) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }
    if (result === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path.pop();
    } else {
      var _visitorKeys$node$kin;
      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== void 0);
  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }
  return newRoot;
}
function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);
  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(
            visitors[i],
            node.kind,
            false
          );
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== void 0) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(
            visitors[i],
            node.kind,
            true
          );
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== void 0 && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}
function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === "function") {
      return kindVisitor;
    }
    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === "function") {
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (specificVisitor) {
      if (typeof specificVisitor === "function") {
        return specificVisitor;
      }
      var specificKindVisitor = specificVisitor[kind];
      if (typeof specificKindVisitor === "function") {
        return specificKindVisitor;
      }
    }
  }
}
var find = Array.prototype.find ? function(list, predicate) {
  return Array.prototype.find.call(list, predicate);
} : function(list, predicate) {
  for (var _i2 = 0; _i2 < list.length; _i2++) {
    var value = list[_i2];
    if (predicate(value)) {
      return value;
    }
  }
};
var find$1 = find;
var objectValues = Object.values || function(obj) {
  return Object.keys(obj).map(function(key) {
    return obj[key];
  });
};
var objectValues$1 = objectValues;
function locatedError(rawOriginalError, nodes, path) {
  var _nodes;
  var originalError = rawOriginalError instanceof Error ? rawOriginalError : new Error("Unexpected error value: " + inspect(rawOriginalError));
  if (Array.isArray(originalError.path)) {
    return originalError;
  }
  return new GraphQLError(originalError.message, (_nodes = originalError.nodes) !== null && _nodes !== void 0 ? _nodes : nodes, originalError.source, originalError.positions, path, originalError);
}
var NAME_RX = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
function assertValidName(name) {
  var error = isValidNameError(name);
  if (error) {
    throw error;
  }
  return name;
}
function isValidNameError(name) {
  typeof name === "string" || devAssert(0, "Expected name to be a string.");
  if (name.length > 1 && name[0] === "_" && name[1] === "_") {
    return new GraphQLError('Name "'.concat(name, '" must not begin with "__", which is reserved by GraphQL introspection.'));
  }
  if (!NAME_RX.test(name)) {
    return new GraphQLError('Names must match /^[_a-zA-Z][_a-zA-Z0-9]*$/ but "'.concat(name, '" does not.'));
  }
}
var objectEntries = Object.entries || function(obj) {
  return Object.keys(obj).map(function(key) {
    return [key, obj[key]];
  });
};
var objectEntries$1 = objectEntries;
function keyMap(list, keyFn) {
  return list.reduce(function(map, item) {
    map[keyFn(item)] = item;
    return map;
  }, /* @__PURE__ */ Object.create(null));
}
function mapValue(map, fn) {
  var result = /* @__PURE__ */ Object.create(null);
  for (var _i2 = 0, _objectEntries2 = objectEntries$1(map); _i2 < _objectEntries2.length; _i2++) {
    var _ref2 = _objectEntries2[_i2];
    var _key = _ref2[0];
    var _value = _ref2[1];
    result[_key] = fn(_value, _key);
  }
  return result;
}
function toObjMap(obj) {
  if (Object.getPrototypeOf(obj) === null) {
    return obj;
  }
  var map = /* @__PURE__ */ Object.create(null);
  for (var _i2 = 0, _objectEntries2 = objectEntries$1(obj); _i2 < _objectEntries2.length; _i2++) {
    var _ref2 = _objectEntries2[_i2];
    var key = _ref2[0];
    var value = _ref2[1];
    map[key] = value;
  }
  return map;
}
function keyValMap(list, keyFn, valFn) {
  return list.reduce(function(map, item) {
    map[keyFn(item)] = valFn(item);
    return map;
  }, /* @__PURE__ */ Object.create(null));
}
var MAX_SUGGESTIONS = 5;
function didYouMean(firstArg, secondArg) {
  var _ref = typeof firstArg === "string" ? [firstArg, secondArg] : [void 0, firstArg], subMessage = _ref[0], suggestionsArg = _ref[1];
  var message = " Did you mean ";
  if (subMessage) {
    message += subMessage + " ";
  }
  var suggestions = suggestionsArg.map(function(x2) {
    return '"'.concat(x2, '"');
  });
  switch (suggestions.length) {
    case 0:
      return "";
    case 1:
      return message + suggestions[0] + "?";
    case 2:
      return message + suggestions[0] + " or " + suggestions[1] + "?";
  }
  var selected = suggestions.slice(0, MAX_SUGGESTIONS);
  var lastItem = selected.pop();
  return message + selected.join(", ") + ", or " + lastItem + "?";
}
function identityFunc(x2) {
  return x2;
}
function naturalCompare(aStr, bStr) {
  var aIdx = 0;
  var bIdx = 0;
  while (aIdx < aStr.length && bIdx < bStr.length) {
    var aChar = aStr.charCodeAt(aIdx);
    var bChar = bStr.charCodeAt(bIdx);
    if (isDigit(aChar) && isDigit(bChar)) {
      var aNum = 0;
      do {
        ++aIdx;
        aNum = aNum * 10 + aChar - DIGIT_0;
        aChar = aStr.charCodeAt(aIdx);
      } while (isDigit(aChar) && aNum > 0);
      var bNum = 0;
      do {
        ++bIdx;
        bNum = bNum * 10 + bChar - DIGIT_0;
        bChar = bStr.charCodeAt(bIdx);
      } while (isDigit(bChar) && bNum > 0);
      if (aNum < bNum) {
        return -1;
      }
      if (aNum > bNum) {
        return 1;
      }
    } else {
      if (aChar < bChar) {
        return -1;
      }
      if (aChar > bChar) {
        return 1;
      }
      ++aIdx;
      ++bIdx;
    }
  }
  return aStr.length - bStr.length;
}
var DIGIT_0 = 48;
var DIGIT_9 = 57;
function isDigit(code) {
  return !isNaN(code) && DIGIT_0 <= code && code <= DIGIT_9;
}
function suggestionList(input, options) {
  var optionsByDistance = /* @__PURE__ */ Object.create(null);
  var lexicalDistance = new LexicalDistance(input);
  var threshold = Math.floor(input.length * 0.4) + 1;
  for (var _i2 = 0; _i2 < options.length; _i2++) {
    var option = options[_i2];
    var distance = lexicalDistance.measure(option, threshold);
    if (distance !== void 0) {
      optionsByDistance[option] = distance;
    }
  }
  return Object.keys(optionsByDistance).sort(function(a2, b2) {
    var distanceDiff = optionsByDistance[a2] - optionsByDistance[b2];
    return distanceDiff !== 0 ? distanceDiff : naturalCompare(a2, b2);
  });
}
var LexicalDistance = /* @__PURE__ */ function() {
  function LexicalDistance2(input) {
    this._input = input;
    this._inputLowerCase = input.toLowerCase();
    this._inputArray = stringToArray(this._inputLowerCase);
    this._rows = [new Array(input.length + 1).fill(0), new Array(input.length + 1).fill(0), new Array(input.length + 1).fill(0)];
  }
  var _proto = LexicalDistance2.prototype;
  _proto.measure = function measure(option, threshold) {
    if (this._input === option) {
      return 0;
    }
    var optionLowerCase = option.toLowerCase();
    if (this._inputLowerCase === optionLowerCase) {
      return 1;
    }
    var a2 = stringToArray(optionLowerCase);
    var b2 = this._inputArray;
    if (a2.length < b2.length) {
      var tmp = a2;
      a2 = b2;
      b2 = tmp;
    }
    var aLength = a2.length;
    var bLength = b2.length;
    if (aLength - bLength > threshold) {
      return void 0;
    }
    var rows = this._rows;
    for (var j = 0; j <= bLength; j++) {
      rows[0][j] = j;
    }
    for (var i = 1; i <= aLength; i++) {
      var upRow = rows[(i - 1) % 3];
      var currentRow = rows[i % 3];
      var smallestCell = currentRow[0] = i;
      for (var _j = 1; _j <= bLength; _j++) {
        var cost = a2[i - 1] === b2[_j - 1] ? 0 : 1;
        var currentCell = Math.min(
          upRow[_j] + 1,
          currentRow[_j - 1] + 1,
          upRow[_j - 1] + cost
        );
        if (i > 1 && _j > 1 && a2[i - 1] === b2[_j - 2] && a2[i - 2] === b2[_j - 1]) {
          var doubleDiagonalCell = rows[(i - 2) % 3][_j - 2];
          currentCell = Math.min(currentCell, doubleDiagonalCell + 1);
        }
        if (currentCell < smallestCell) {
          smallestCell = currentCell;
        }
        currentRow[_j] = currentCell;
      }
      if (smallestCell > threshold) {
        return void 0;
      }
    }
    var distance = rows[aLength % 3][bLength];
    return distance <= threshold ? distance : void 0;
  };
  return LexicalDistance2;
}();
function stringToArray(str) {
  var strLength = str.length;
  var array = new Array(strLength);
  for (var i = 0; i < strLength; ++i) {
    array[i] = str.charCodeAt(i);
  }
  return array;
}
function print(ast) {
  return visit(ast, {
    leave: printDocASTReducer
  });
}
var MAX_LINE_LENGTH = 80;
var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return "$" + node.name;
  },
  Document: function Document2(node) {
    return join(node.definitions, "\n\n") + "\n";
  },
  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap$1("(", join(node.variableDefinitions, ", "), ")");
    var directives = join(node.directives, " ");
    var selectionSet = node.selectionSet;
    return !name && !directives && !varDefs && op === "query" ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], " ");
  },
  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable, type = _ref.type, defaultValue = _ref.defaultValue, directives = _ref.directives;
    return variable + ": " + type + wrap$1(" = ", defaultValue) + wrap$1(" ", join(directives, " "));
  },
  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },
  Field: function Field(_ref3) {
    var alias = _ref3.alias, name = _ref3.name, args = _ref3.arguments, directives = _ref3.directives, selectionSet = _ref3.selectionSet;
    var prefix = wrap$1("", alias, ": ") + name;
    var argsLine = prefix + wrap$1("(", join(args, ", "), ")");
    if (argsLine.length > MAX_LINE_LENGTH) {
      argsLine = prefix + wrap$1("(\n", indent(join(args, "\n")), "\n)");
    }
    return join([argsLine, join(directives, " "), selectionSet], " ");
  },
  Argument: function Argument(_ref4) {
    var name = _ref4.name, value = _ref4.value;
    return name + ": " + value;
  },
  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name, directives = _ref5.directives;
    return "..." + name + wrap$1(" ", join(directives, " "));
  },
  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition, directives = _ref6.directives, selectionSet = _ref6.selectionSet;
    return join(["...", wrap$1("on ", typeCondition), join(directives, " "), selectionSet], " ");
  },
  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name, typeCondition = _ref7.typeCondition, variableDefinitions = _ref7.variableDefinitions, directives = _ref7.directives, selectionSet = _ref7.selectionSet;
    return "fragment ".concat(name).concat(wrap$1("(", join(variableDefinitions, ", "), ")"), " ") + "on ".concat(typeCondition, " ").concat(wrap$1("", join(directives, " "), " ")) + selectionSet;
  },
  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value, isBlockString = _ref10.block;
    return isBlockString ? printBlockString(value, key === "description" ? "" : "  ") : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? "true" : "false";
  },
  NullValue: function NullValue() {
    return "null";
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return "[" + join(values, ", ") + "]";
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields7 = _ref14.fields;
    return "{" + join(fields7, ", ") + "}";
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name, value = _ref15.value;
    return name + ": " + value;
  },
  Directive: function Directive(_ref16) {
    var name = _ref16.name, args = _ref16.arguments;
    return "@" + name + wrap$1("(", join(args, ", "), ")");
  },
  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return "[" + type + "]";
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + "!";
  },
  SchemaDefinition: addDescription(function(_ref20) {
    var directives = _ref20.directives, operationTypes = _ref20.operationTypes;
    return join(["schema", join(directives, " "), block(operationTypes)], " ");
  }),
  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation, type = _ref21.type;
    return operation + ": " + type;
  },
  ScalarTypeDefinition: addDescription(function(_ref22) {
    var name = _ref22.name, directives = _ref22.directives;
    return join(["scalar", name, join(directives, " ")], " ");
  }),
  ObjectTypeDefinition: addDescription(function(_ref23) {
    var name = _ref23.name, interfaces = _ref23.interfaces, directives = _ref23.directives, fields7 = _ref23.fields;
    return join(["type", name, wrap$1("implements ", join(interfaces, " & ")), join(directives, " "), block(fields7)], " ");
  }),
  FieldDefinition: addDescription(function(_ref24) {
    var name = _ref24.name, args = _ref24.arguments, type = _ref24.type, directives = _ref24.directives;
    return name + (hasMultilineItems(args) ? wrap$1("(\n", indent(join(args, "\n")), "\n)") : wrap$1("(", join(args, ", "), ")")) + ": " + type + wrap$1(" ", join(directives, " "));
  }),
  InputValueDefinition: addDescription(function(_ref25) {
    var name = _ref25.name, type = _ref25.type, defaultValue = _ref25.defaultValue, directives = _ref25.directives;
    return join([name + ": " + type, wrap$1("= ", defaultValue), join(directives, " ")], " ");
  }),
  InterfaceTypeDefinition: addDescription(function(_ref26) {
    var name = _ref26.name, interfaces = _ref26.interfaces, directives = _ref26.directives, fields7 = _ref26.fields;
    return join(["interface", name, wrap$1("implements ", join(interfaces, " & ")), join(directives, " "), block(fields7)], " ");
  }),
  UnionTypeDefinition: addDescription(function(_ref27) {
    var name = _ref27.name, directives = _ref27.directives, types2 = _ref27.types;
    return join(["union", name, join(directives, " "), types2 && types2.length !== 0 ? "= " + join(types2, " | ") : ""], " ");
  }),
  EnumTypeDefinition: addDescription(function(_ref28) {
    var name = _ref28.name, directives = _ref28.directives, values = _ref28.values;
    return join(["enum", name, join(directives, " "), block(values)], " ");
  }),
  EnumValueDefinition: addDescription(function(_ref29) {
    var name = _ref29.name, directives = _ref29.directives;
    return join([name, join(directives, " ")], " ");
  }),
  InputObjectTypeDefinition: addDescription(function(_ref30) {
    var name = _ref30.name, directives = _ref30.directives, fields7 = _ref30.fields;
    return join(["input", name, join(directives, " "), block(fields7)], " ");
  }),
  DirectiveDefinition: addDescription(function(_ref31) {
    var name = _ref31.name, args = _ref31.arguments, repeatable = _ref31.repeatable, locations = _ref31.locations;
    return "directive @" + name + (hasMultilineItems(args) ? wrap$1("(\n", indent(join(args, "\n")), "\n)") : wrap$1("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ");
  }),
  SchemaExtension: function SchemaExtension(_ref32) {
    var directives = _ref32.directives, operationTypes = _ref32.operationTypes;
    return join(["extend schema", join(directives, " "), block(operationTypes)], " ");
  },
  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
    var name = _ref33.name, directives = _ref33.directives;
    return join(["extend scalar", name, join(directives, " ")], " ");
  },
  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
    var name = _ref34.name, interfaces = _ref34.interfaces, directives = _ref34.directives, fields7 = _ref34.fields;
    return join(["extend type", name, wrap$1("implements ", join(interfaces, " & ")), join(directives, " "), block(fields7)], " ");
  },
  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
    var name = _ref35.name, interfaces = _ref35.interfaces, directives = _ref35.directives, fields7 = _ref35.fields;
    return join(["extend interface", name, wrap$1("implements ", join(interfaces, " & ")), join(directives, " "), block(fields7)], " ");
  },
  UnionTypeExtension: function UnionTypeExtension(_ref36) {
    var name = _ref36.name, directives = _ref36.directives, types2 = _ref36.types;
    return join(["extend union", name, join(directives, " "), types2 && types2.length !== 0 ? "= " + join(types2, " | ") : ""], " ");
  },
  EnumTypeExtension: function EnumTypeExtension(_ref37) {
    var name = _ref37.name, directives = _ref37.directives, values = _ref37.values;
    return join(["extend enum", name, join(directives, " "), block(values)], " ");
  },
  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
    var name = _ref38.name, directives = _ref38.directives, fields7 = _ref38.fields;
    return join(["extend input", name, join(directives, " "), block(fields7)], " ");
  }
};
function addDescription(cb) {
  return function(node) {
    return join([node.description, cb(node)], "\n");
  };
}
function join(maybeArray) {
  var _maybeArray$filter$jo;
  var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function(x2) {
    return x2;
  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap$1("{\n", indent(join(array, "\n")), "\n}");
}
function wrap$1(start, maybeString) {
  var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
}
function indent(str) {
  return wrap$1("  ", str.replace(/\n/g, "\n  "));
}
function isMultiline(str) {
  return str.indexOf("\n") !== -1;
}
function hasMultilineItems(maybeArray) {
  return maybeArray != null && maybeArray.some(isMultiline);
}
function valueFromASTUntyped(valueNode, variables) {
  switch (valueNode.kind) {
    case Kind.NULL:
      return null;
    case Kind.INT:
      return parseInt(valueNode.value, 10);
    case Kind.FLOAT:
      return parseFloat(valueNode.value);
    case Kind.STRING:
    case Kind.ENUM:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.LIST:
      return valueNode.values.map(function(node) {
        return valueFromASTUntyped(node, variables);
      });
    case Kind.OBJECT:
      return keyValMap(valueNode.fields, function(field) {
        return field.name.value;
      }, function(field) {
        return valueFromASTUntyped(field.value, variables);
      });
    case Kind.VARIABLE:
      return variables === null || variables === void 0 ? void 0 : variables[valueNode.name.value];
  }
  invariant(0, "Unexpected value node: " + inspect(valueNode));
}
function _defineProperties$3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$3(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$3(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$3(Constructor, staticProps);
  return Constructor;
}
function isType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type) || isListType(type) || isNonNullType(type);
}
function assertType(type) {
  if (!isType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL type."));
  }
  return type;
}
function isScalarType(type) {
  return instanceOf(type, GraphQLScalarType);
}
function assertScalarType(type) {
  if (!isScalarType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL Scalar type."));
  }
  return type;
}
function isObjectType(type) {
  return instanceOf(type, GraphQLObjectType);
}
function assertObjectType(type) {
  if (!isObjectType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL Object type."));
  }
  return type;
}
function isInterfaceType(type) {
  return instanceOf(type, GraphQLInterfaceType);
}
function assertInterfaceType(type) {
  if (!isInterfaceType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL Interface type."));
  }
  return type;
}
function isUnionType(type) {
  return instanceOf(type, GraphQLUnionType);
}
function assertUnionType(type) {
  if (!isUnionType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL Union type."));
  }
  return type;
}
function isEnumType(type) {
  return instanceOf(type, GraphQLEnumType);
}
function assertEnumType(type) {
  if (!isEnumType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL Enum type."));
  }
  return type;
}
function isInputObjectType(type) {
  return instanceOf(type, GraphQLInputObjectType);
}
function assertInputObjectType(type) {
  if (!isInputObjectType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL Input Object type."));
  }
  return type;
}
function isListType(type) {
  return instanceOf(type, GraphQLList);
}
function assertListType(type) {
  if (!isListType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL List type."));
  }
  return type;
}
function isNonNullType(type) {
  return instanceOf(type, GraphQLNonNull);
}
function assertNonNullType(type) {
  if (!isNonNullType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL Non-Null type."));
  }
  return type;
}
function isInputType(type) {
  return isScalarType(type) || isEnumType(type) || isInputObjectType(type) || isWrappingType(type) && isInputType(type.ofType);
}
function assertInputType(type) {
  if (!isInputType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL input type."));
  }
  return type;
}
function isOutputType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isWrappingType(type) && isOutputType(type.ofType);
}
function assertOutputType(type) {
  if (!isOutputType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL output type."));
  }
  return type;
}
function isLeafType(type) {
  return isScalarType(type) || isEnumType(type);
}
function assertLeafType(type) {
  if (!isLeafType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL leaf type."));
  }
  return type;
}
function isCompositeType(type) {
  return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
}
function assertCompositeType(type) {
  if (!isCompositeType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL composite type."));
  }
  return type;
}
function isAbstractType(type) {
  return isInterfaceType(type) || isUnionType(type);
}
function assertAbstractType(type) {
  if (!isAbstractType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL abstract type."));
  }
  return type;
}
function GraphQLList(ofType) {
  if (this instanceof GraphQLList) {
    this.ofType = assertType(ofType);
  } else {
    return new GraphQLList(ofType);
  }
}
GraphQLList.prototype.toString = function toString() {
  return "[" + String(this.ofType) + "]";
};
GraphQLList.prototype.toJSON = function toJSON() {
  return this.toString();
};
Object.defineProperty(GraphQLList.prototype, SYMBOL_TO_STRING_TAG, {
  get: function get() {
    return "GraphQLList";
  }
});
defineInspect(GraphQLList);
function GraphQLNonNull(ofType) {
  if (this instanceof GraphQLNonNull) {
    this.ofType = assertNullableType(ofType);
  } else {
    return new GraphQLNonNull(ofType);
  }
}
GraphQLNonNull.prototype.toString = function toString2() {
  return String(this.ofType) + "!";
};
GraphQLNonNull.prototype.toJSON = function toJSON2() {
  return this.toString();
};
Object.defineProperty(GraphQLNonNull.prototype, SYMBOL_TO_STRING_TAG, {
  get: function get2() {
    return "GraphQLNonNull";
  }
});
defineInspect(GraphQLNonNull);
function isWrappingType(type) {
  return isListType(type) || isNonNullType(type);
}
function assertWrappingType(type) {
  if (!isWrappingType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL wrapping type."));
  }
  return type;
}
function isNullableType(type) {
  return isType(type) && !isNonNullType(type);
}
function assertNullableType(type) {
  if (!isNullableType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL nullable type."));
  }
  return type;
}
function getNullableType(type) {
  if (type) {
    return isNonNullType(type) ? type.ofType : type;
  }
}
function isNamedType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type);
}
function assertNamedType(type) {
  if (!isNamedType(type)) {
    throw new Error("Expected ".concat(inspect(type), " to be a GraphQL named type."));
  }
  return type;
}
function getNamedType(type) {
  if (type) {
    var unwrappedType = type;
    while (isWrappingType(unwrappedType)) {
      unwrappedType = unwrappedType.ofType;
    }
    return unwrappedType;
  }
}
function resolveThunk(thunk) {
  return typeof thunk === "function" ? thunk() : thunk;
}
function undefineIfEmpty(arr) {
  return arr && arr.length > 0 ? arr : void 0;
}
var GraphQLScalarType = /* @__PURE__ */ function() {
  function GraphQLScalarType2(config) {
    var _config$parseValue, _config$serialize, _config$parseLiteral;
    var parseValue2 = (_config$parseValue = config.parseValue) !== null && _config$parseValue !== void 0 ? _config$parseValue : identityFunc;
    this.name = config.name;
    this.description = config.description;
    this.specifiedByUrl = config.specifiedByUrl;
    this.serialize = (_config$serialize = config.serialize) !== null && _config$serialize !== void 0 ? _config$serialize : identityFunc;
    this.parseValue = parseValue2;
    this.parseLiteral = (_config$parseLiteral = config.parseLiteral) !== null && _config$parseLiteral !== void 0 ? _config$parseLiteral : function(node, variables) {
      return parseValue2(valueFromASTUntyped(node, variables));
    };
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    typeof config.name === "string" || devAssert(0, "Must provide name.");
    config.specifiedByUrl == null || typeof config.specifiedByUrl === "string" || devAssert(0, "".concat(this.name, ' must provide "specifiedByUrl" as a string, ') + "but got: ".concat(inspect(config.specifiedByUrl), "."));
    config.serialize == null || typeof config.serialize === "function" || devAssert(0, "".concat(this.name, ' must provide "serialize" function. If this custom Scalar is also used as an input type, ensure "parseValue" and "parseLiteral" functions are also provided.'));
    if (config.parseLiteral) {
      typeof config.parseValue === "function" && typeof config.parseLiteral === "function" || devAssert(0, "".concat(this.name, ' must provide both "parseValue" and "parseLiteral" functions.'));
    }
  }
  var _proto = GraphQLScalarType2.prototype;
  _proto.toConfig = function toConfig() {
    var _this$extensionASTNod;
    return {
      name: this.name,
      description: this.description,
      specifiedByUrl: this.specifiedByUrl,
      serialize: this.serialize,
      parseValue: this.parseValue,
      parseLiteral: this.parseLiteral,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod = this.extensionASTNodes) !== null && _this$extensionASTNod !== void 0 ? _this$extensionASTNod : []
    };
  };
  _proto.toString = function toString4() {
    return this.name;
  };
  _proto.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass$3(GraphQLScalarType2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLScalarType";
    }
  }]);
  return GraphQLScalarType2;
}();
defineInspect(GraphQLScalarType);
var GraphQLObjectType = /* @__PURE__ */ function() {
  function GraphQLObjectType2(config) {
    this.name = config.name;
    this.description = config.description;
    this.isTypeOf = config.isTypeOf;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    this._fields = defineFieldMap.bind(void 0, config);
    this._interfaces = defineInterfaces.bind(void 0, config);
    typeof config.name === "string" || devAssert(0, "Must provide name.");
    config.isTypeOf == null || typeof config.isTypeOf === "function" || devAssert(0, "".concat(this.name, ' must provide "isTypeOf" as a function, ') + "but got: ".concat(inspect(config.isTypeOf), "."));
  }
  var _proto2 = GraphQLObjectType2.prototype;
  _proto2.getFields = function getFields() {
    if (typeof this._fields === "function") {
      this._fields = this._fields();
    }
    return this._fields;
  };
  _proto2.getInterfaces = function getInterfaces() {
    if (typeof this._interfaces === "function") {
      this._interfaces = this._interfaces();
    }
    return this._interfaces;
  };
  _proto2.toConfig = function toConfig() {
    return {
      name: this.name,
      description: this.description,
      interfaces: this.getInterfaces(),
      fields: fieldsToFieldsConfig(this.getFields()),
      isTypeOf: this.isTypeOf,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes || []
    };
  };
  _proto2.toString = function toString4() {
    return this.name;
  };
  _proto2.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass$3(GraphQLObjectType2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLObjectType";
    }
  }]);
  return GraphQLObjectType2;
}();
defineInspect(GraphQLObjectType);
function defineInterfaces(config) {
  var _resolveThunk;
  var interfaces = (_resolveThunk = resolveThunk(config.interfaces)) !== null && _resolveThunk !== void 0 ? _resolveThunk : [];
  Array.isArray(interfaces) || devAssert(0, "".concat(config.name, " interfaces must be an Array or a function which returns an Array."));
  return interfaces;
}
function defineFieldMap(config) {
  var fieldMap = resolveThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(0, "".concat(config.name, " fields must be an object with field names as keys or a function which returns such an object."));
  return mapValue(fieldMap, function(fieldConfig, fieldName) {
    var _fieldConfig$args;
    isPlainObj(fieldConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, " field config must be an object."));
    !("isDeprecated" in fieldConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, ' should provide "deprecationReason" instead of "isDeprecated".'));
    fieldConfig.resolve == null || typeof fieldConfig.resolve === "function" || devAssert(0, "".concat(config.name, ".").concat(fieldName, " field resolver must be a function if ") + "provided, but got: ".concat(inspect(fieldConfig.resolve), "."));
    var argsConfig = (_fieldConfig$args = fieldConfig.args) !== null && _fieldConfig$args !== void 0 ? _fieldConfig$args : {};
    isPlainObj(argsConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, " args must be an object with argument names as keys."));
    var args = objectEntries$1(argsConfig).map(function(_ref) {
      var argName = _ref[0], argConfig = _ref[1];
      return {
        name: argName,
        description: argConfig.description,
        type: argConfig.type,
        defaultValue: argConfig.defaultValue,
        deprecationReason: argConfig.deprecationReason,
        extensions: argConfig.extensions && toObjMap(argConfig.extensions),
        astNode: argConfig.astNode
      };
    });
    return {
      name: fieldName,
      description: fieldConfig.description,
      type: fieldConfig.type,
      args,
      resolve: fieldConfig.resolve,
      subscribe: fieldConfig.subscribe,
      isDeprecated: fieldConfig.deprecationReason != null,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: fieldConfig.extensions && toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}
function isPlainObj(obj) {
  return isObjectLike(obj) && !Array.isArray(obj);
}
function fieldsToFieldsConfig(fields7) {
  return mapValue(fields7, function(field) {
    return {
      description: field.description,
      type: field.type,
      args: argsToArgsConfig(field.args),
      resolve: field.resolve,
      subscribe: field.subscribe,
      deprecationReason: field.deprecationReason,
      extensions: field.extensions,
      astNode: field.astNode
    };
  });
}
function argsToArgsConfig(args) {
  return keyValMap(args, function(arg) {
    return arg.name;
  }, function(arg) {
    return {
      description: arg.description,
      type: arg.type,
      defaultValue: arg.defaultValue,
      deprecationReason: arg.deprecationReason,
      extensions: arg.extensions,
      astNode: arg.astNode
    };
  });
}
function isRequiredArgument(arg) {
  return isNonNullType(arg.type) && arg.defaultValue === void 0;
}
var GraphQLInterfaceType = /* @__PURE__ */ function() {
  function GraphQLInterfaceType2(config) {
    this.name = config.name;
    this.description = config.description;
    this.resolveType = config.resolveType;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    this._fields = defineFieldMap.bind(void 0, config);
    this._interfaces = defineInterfaces.bind(void 0, config);
    typeof config.name === "string" || devAssert(0, "Must provide name.");
    config.resolveType == null || typeof config.resolveType === "function" || devAssert(0, "".concat(this.name, ' must provide "resolveType" as a function, ') + "but got: ".concat(inspect(config.resolveType), "."));
  }
  var _proto3 = GraphQLInterfaceType2.prototype;
  _proto3.getFields = function getFields() {
    if (typeof this._fields === "function") {
      this._fields = this._fields();
    }
    return this._fields;
  };
  _proto3.getInterfaces = function getInterfaces() {
    if (typeof this._interfaces === "function") {
      this._interfaces = this._interfaces();
    }
    return this._interfaces;
  };
  _proto3.toConfig = function toConfig() {
    var _this$extensionASTNod2;
    return {
      name: this.name,
      description: this.description,
      interfaces: this.getInterfaces(),
      fields: fieldsToFieldsConfig(this.getFields()),
      resolveType: this.resolveType,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod2 = this.extensionASTNodes) !== null && _this$extensionASTNod2 !== void 0 ? _this$extensionASTNod2 : []
    };
  };
  _proto3.toString = function toString4() {
    return this.name;
  };
  _proto3.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass$3(GraphQLInterfaceType2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLInterfaceType";
    }
  }]);
  return GraphQLInterfaceType2;
}();
defineInspect(GraphQLInterfaceType);
var GraphQLUnionType = /* @__PURE__ */ function() {
  function GraphQLUnionType2(config) {
    this.name = config.name;
    this.description = config.description;
    this.resolveType = config.resolveType;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    this._types = defineTypes.bind(void 0, config);
    typeof config.name === "string" || devAssert(0, "Must provide name.");
    config.resolveType == null || typeof config.resolveType === "function" || devAssert(0, "".concat(this.name, ' must provide "resolveType" as a function, ') + "but got: ".concat(inspect(config.resolveType), "."));
  }
  var _proto4 = GraphQLUnionType2.prototype;
  _proto4.getTypes = function getTypes() {
    if (typeof this._types === "function") {
      this._types = this._types();
    }
    return this._types;
  };
  _proto4.toConfig = function toConfig() {
    var _this$extensionASTNod3;
    return {
      name: this.name,
      description: this.description,
      types: this.getTypes(),
      resolveType: this.resolveType,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod3 = this.extensionASTNodes) !== null && _this$extensionASTNod3 !== void 0 ? _this$extensionASTNod3 : []
    };
  };
  _proto4.toString = function toString4() {
    return this.name;
  };
  _proto4.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass$3(GraphQLUnionType2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLUnionType";
    }
  }]);
  return GraphQLUnionType2;
}();
defineInspect(GraphQLUnionType);
function defineTypes(config) {
  var types2 = resolveThunk(config.types);
  Array.isArray(types2) || devAssert(0, "Must provide Array of types or a function which returns such an array for Union ".concat(config.name, "."));
  return types2;
}
var GraphQLEnumType = /* @__PURE__ */ function() {
  function GraphQLEnumType2(config) {
    this.name = config.name;
    this.description = config.description;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    this._values = defineEnumValues(this.name, config.values);
    this._valueLookup = new Map(this._values.map(function(enumValue) {
      return [enumValue.value, enumValue];
    }));
    this._nameLookup = keyMap(this._values, function(value) {
      return value.name;
    });
    typeof config.name === "string" || devAssert(0, "Must provide name.");
  }
  var _proto5 = GraphQLEnumType2.prototype;
  _proto5.getValues = function getValues() {
    return this._values;
  };
  _proto5.getValue = function getValue(name) {
    return this._nameLookup[name];
  };
  _proto5.serialize = function serialize(outputValue) {
    var enumValue = this._valueLookup.get(outputValue);
    if (enumValue === void 0) {
      throw new GraphQLError('Enum "'.concat(this.name, '" cannot represent value: ').concat(inspect(outputValue)));
    }
    return enumValue.name;
  };
  _proto5.parseValue = function parseValue2(inputValue) {
    if (typeof inputValue !== "string") {
      var valueStr = inspect(inputValue);
      throw new GraphQLError('Enum "'.concat(this.name, '" cannot represent non-string value: ').concat(valueStr, ".") + didYouMeanEnumValue(this, valueStr));
    }
    var enumValue = this.getValue(inputValue);
    if (enumValue == null) {
      throw new GraphQLError('Value "'.concat(inputValue, '" does not exist in "').concat(this.name, '" enum.') + didYouMeanEnumValue(this, inputValue));
    }
    return enumValue.value;
  };
  _proto5.parseLiteral = function parseLiteral6(valueNode, _variables) {
    if (valueNode.kind !== Kind.ENUM) {
      var valueStr = print(valueNode);
      throw new GraphQLError('Enum "'.concat(this.name, '" cannot represent non-enum value: ').concat(valueStr, ".") + didYouMeanEnumValue(this, valueStr), valueNode);
    }
    var enumValue = this.getValue(valueNode.value);
    if (enumValue == null) {
      var _valueStr = print(valueNode);
      throw new GraphQLError('Value "'.concat(_valueStr, '" does not exist in "').concat(this.name, '" enum.') + didYouMeanEnumValue(this, _valueStr), valueNode);
    }
    return enumValue.value;
  };
  _proto5.toConfig = function toConfig() {
    var _this$extensionASTNod4;
    var values = keyValMap(this.getValues(), function(value) {
      return value.name;
    }, function(value) {
      return {
        description: value.description,
        value: value.value,
        deprecationReason: value.deprecationReason,
        extensions: value.extensions,
        astNode: value.astNode
      };
    });
    return {
      name: this.name,
      description: this.description,
      values,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod4 = this.extensionASTNodes) !== null && _this$extensionASTNod4 !== void 0 ? _this$extensionASTNod4 : []
    };
  };
  _proto5.toString = function toString4() {
    return this.name;
  };
  _proto5.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass$3(GraphQLEnumType2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLEnumType";
    }
  }]);
  return GraphQLEnumType2;
}();
defineInspect(GraphQLEnumType);
function didYouMeanEnumValue(enumType, unknownValueStr) {
  var allNames = enumType.getValues().map(function(value) {
    return value.name;
  });
  var suggestedValues = suggestionList(unknownValueStr, allNames);
  return didYouMean("the enum value", suggestedValues);
}
function defineEnumValues(typeName, valueMap) {
  isPlainObj(valueMap) || devAssert(0, "".concat(typeName, " values must be an object with value names as keys."));
  return objectEntries$1(valueMap).map(function(_ref2) {
    var valueName = _ref2[0], valueConfig = _ref2[1];
    isPlainObj(valueConfig) || devAssert(0, "".concat(typeName, ".").concat(valueName, ' must refer to an object with a "value" key ') + "representing an internal value but got: ".concat(inspect(valueConfig), "."));
    !("isDeprecated" in valueConfig) || devAssert(0, "".concat(typeName, ".").concat(valueName, ' should provide "deprecationReason" instead of "isDeprecated".'));
    return {
      name: valueName,
      description: valueConfig.description,
      value: valueConfig.value !== void 0 ? valueConfig.value : valueName,
      isDeprecated: valueConfig.deprecationReason != null,
      deprecationReason: valueConfig.deprecationReason,
      extensions: valueConfig.extensions && toObjMap(valueConfig.extensions),
      astNode: valueConfig.astNode
    };
  });
}
var GraphQLInputObjectType = /* @__PURE__ */ function() {
  function GraphQLInputObjectType2(config) {
    this.name = config.name;
    this.description = config.description;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = undefineIfEmpty(config.extensionASTNodes);
    this._fields = defineInputFieldMap.bind(void 0, config);
    typeof config.name === "string" || devAssert(0, "Must provide name.");
  }
  var _proto6 = GraphQLInputObjectType2.prototype;
  _proto6.getFields = function getFields() {
    if (typeof this._fields === "function") {
      this._fields = this._fields();
    }
    return this._fields;
  };
  _proto6.toConfig = function toConfig() {
    var _this$extensionASTNod5;
    var fields7 = mapValue(this.getFields(), function(field) {
      return {
        description: field.description,
        type: field.type,
        defaultValue: field.defaultValue,
        deprecationReason: field.deprecationReason,
        extensions: field.extensions,
        astNode: field.astNode
      };
    });
    return {
      name: this.name,
      description: this.description,
      fields: fields7,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod5 = this.extensionASTNodes) !== null && _this$extensionASTNod5 !== void 0 ? _this$extensionASTNod5 : []
    };
  };
  _proto6.toString = function toString4() {
    return this.name;
  };
  _proto6.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass$3(GraphQLInputObjectType2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLInputObjectType";
    }
  }]);
  return GraphQLInputObjectType2;
}();
defineInspect(GraphQLInputObjectType);
function defineInputFieldMap(config) {
  var fieldMap = resolveThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(0, "".concat(config.name, " fields must be an object with field names as keys or a function which returns such an object."));
  return mapValue(fieldMap, function(fieldConfig, fieldName) {
    !("resolve" in fieldConfig) || devAssert(0, "".concat(config.name, ".").concat(fieldName, " field has a resolve property, but Input Types cannot define resolvers."));
    return {
      name: fieldName,
      description: fieldConfig.description,
      type: fieldConfig.type,
      defaultValue: fieldConfig.defaultValue,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: fieldConfig.extensions && toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}
function isRequiredInputField(field) {
  return isNonNullType(field.type) && field.defaultValue === void 0;
}
function isEqualType(typeA, typeB) {
  if (typeA === typeB) {
    return true;
  }
  if (isNonNullType(typeA) && isNonNullType(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  }
  if (isListType(typeA) && isListType(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  }
  return false;
}
function isTypeSubTypeOf(schema, maybeSubType, superType) {
  if (maybeSubType === superType) {
    return true;
  }
  if (isNonNullType(superType)) {
    if (isNonNullType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isNonNullType(maybeSubType)) {
    return isTypeSubTypeOf(schema, maybeSubType.ofType, superType);
  }
  if (isListType(superType)) {
    if (isListType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isListType(maybeSubType)) {
    return false;
  }
  return isAbstractType(superType) && (isInterfaceType(maybeSubType) || isObjectType(maybeSubType)) && schema.isSubType(superType, maybeSubType);
}
function doTypesOverlap(schema, typeA, typeB) {
  if (typeA === typeB) {
    return true;
  }
  if (isAbstractType(typeA)) {
    if (isAbstractType(typeB)) {
      return schema.getPossibleTypes(typeA).some(function(type) {
        return schema.isSubType(typeB, type);
      });
    }
    return schema.isSubType(typeA, typeB);
  }
  if (isAbstractType(typeB)) {
    return schema.isSubType(typeB, typeA);
  }
  return false;
}
var arrayFrom = Array.from || function(obj, mapFn, thisArg) {
  if (obj == null) {
    throw new TypeError("Array.from requires an array-like object - not null or undefined");
  }
  var iteratorMethod = obj[SYMBOL_ITERATOR];
  if (typeof iteratorMethod === "function") {
    var iterator = iteratorMethod.call(obj);
    var result = [];
    var step;
    for (var i = 0; !(step = iterator.next()).done; ++i) {
      result.push(mapFn.call(thisArg, step.value, i));
      if (i > 9999999) {
        throw new TypeError("Near-infinite iteration.");
      }
    }
    return result;
  }
  var length = obj.length;
  if (typeof length === "number" && length >= 0 && length % 1 === 0) {
    var _result = [];
    for (var _i = 0; _i < length; ++_i) {
      if (Object.prototype.hasOwnProperty.call(obj, _i)) {
        _result.push(mapFn.call(thisArg, obj[_i], _i));
      }
    }
    return _result;
  }
  return [];
};
var arrayFrom$1 = arrayFrom;
var isFinitePolyfill = Number.isFinite || function(value) {
  return typeof value === "number" && isFinite(value);
};
var isFinite$1 = isFinitePolyfill;
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function safeArrayFrom(collection) {
  var mapFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function(item) {
    return item;
  };
  if (collection == null || _typeof(collection) !== "object") {
    return null;
  }
  if (Array.isArray(collection)) {
    return collection.map(mapFn);
  }
  var iteratorMethod = collection[SYMBOL_ITERATOR];
  if (typeof iteratorMethod === "function") {
    var iterator = iteratorMethod.call(collection);
    var result = [];
    var step;
    for (var i = 0; !(step = iterator.next()).done; ++i) {
      result.push(mapFn(step.value, i));
    }
    return result;
  }
  var length = collection.length;
  if (typeof length === "number" && length >= 0 && length % 1 === 0) {
    var _result = [];
    for (var _i = 0; _i < length; ++_i) {
      if (!Object.prototype.hasOwnProperty.call(collection, _i)) {
        return null;
      }
      _result.push(mapFn(collection[String(_i)], _i));
    }
    return _result;
  }
  return null;
}
var isInteger = Number.isInteger || function(value) {
  return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};
var isInteger$1 = isInteger;
var MAX_INT = 2147483647;
var MIN_INT = -2147483648;
function serializeInt(outputValue) {
  var coercedValue = serializeObject(outputValue);
  if (typeof coercedValue === "boolean") {
    return coercedValue ? 1 : 0;
  }
  var num = coercedValue;
  if (typeof coercedValue === "string" && coercedValue !== "") {
    num = Number(coercedValue);
  }
  if (!isInteger$1(num)) {
    throw new GraphQLError("Int cannot represent non-integer value: ".concat(inspect(coercedValue)));
  }
  if (num > MAX_INT || num < MIN_INT) {
    throw new GraphQLError("Int cannot represent non 32-bit signed integer value: " + inspect(coercedValue));
  }
  return num;
}
function coerceInt(inputValue) {
  if (!isInteger$1(inputValue)) {
    throw new GraphQLError("Int cannot represent non-integer value: ".concat(inspect(inputValue)));
  }
  if (inputValue > MAX_INT || inputValue < MIN_INT) {
    throw new GraphQLError("Int cannot represent non 32-bit signed integer value: ".concat(inputValue));
  }
  return inputValue;
}
var GraphQLInt = new GraphQLScalarType({
  name: "Int",
  description: "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.",
  serialize: serializeInt,
  parseValue: coerceInt,
  parseLiteral: function parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.INT) {
      throw new GraphQLError("Int cannot represent non-integer value: ".concat(print(valueNode)), valueNode);
    }
    var num = parseInt(valueNode.value, 10);
    if (num > MAX_INT || num < MIN_INT) {
      throw new GraphQLError("Int cannot represent non 32-bit signed integer value: ".concat(valueNode.value), valueNode);
    }
    return num;
  }
});
function serializeFloat(outputValue) {
  var coercedValue = serializeObject(outputValue);
  if (typeof coercedValue === "boolean") {
    return coercedValue ? 1 : 0;
  }
  var num = coercedValue;
  if (typeof coercedValue === "string" && coercedValue !== "") {
    num = Number(coercedValue);
  }
  if (!isFinite$1(num)) {
    throw new GraphQLError("Float cannot represent non numeric value: ".concat(inspect(coercedValue)));
  }
  return num;
}
function coerceFloat(inputValue) {
  if (!isFinite$1(inputValue)) {
    throw new GraphQLError("Float cannot represent non numeric value: ".concat(inspect(inputValue)));
  }
  return inputValue;
}
var GraphQLFloat = new GraphQLScalarType({
  name: "Float",
  description: "The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).",
  serialize: serializeFloat,
  parseValue: coerceFloat,
  parseLiteral: function parseLiteral2(valueNode) {
    if (valueNode.kind !== Kind.FLOAT && valueNode.kind !== Kind.INT) {
      throw new GraphQLError("Float cannot represent non numeric value: ".concat(print(valueNode)), valueNode);
    }
    return parseFloat(valueNode.value);
  }
});
function serializeObject(outputValue) {
  if (isObjectLike(outputValue)) {
    if (typeof outputValue.valueOf === "function") {
      var valueOfResult = outputValue.valueOf();
      if (!isObjectLike(valueOfResult)) {
        return valueOfResult;
      }
    }
    if (typeof outputValue.toJSON === "function") {
      return outputValue.toJSON();
    }
  }
  return outputValue;
}
function serializeString(outputValue) {
  var coercedValue = serializeObject(outputValue);
  if (typeof coercedValue === "string") {
    return coercedValue;
  }
  if (typeof coercedValue === "boolean") {
    return coercedValue ? "true" : "false";
  }
  if (isFinite$1(coercedValue)) {
    return coercedValue.toString();
  }
  throw new GraphQLError("String cannot represent value: ".concat(inspect(outputValue)));
}
function coerceString(inputValue) {
  if (typeof inputValue !== "string") {
    throw new GraphQLError("String cannot represent a non string value: ".concat(inspect(inputValue)));
  }
  return inputValue;
}
var GraphQLString = new GraphQLScalarType({
  name: "String",
  description: "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
  serialize: serializeString,
  parseValue: coerceString,
  parseLiteral: function parseLiteral3(valueNode) {
    if (valueNode.kind !== Kind.STRING) {
      throw new GraphQLError("String cannot represent a non string value: ".concat(print(valueNode)), valueNode);
    }
    return valueNode.value;
  }
});
function serializeBoolean(outputValue) {
  var coercedValue = serializeObject(outputValue);
  if (typeof coercedValue === "boolean") {
    return coercedValue;
  }
  if (isFinite$1(coercedValue)) {
    return coercedValue !== 0;
  }
  throw new GraphQLError("Boolean cannot represent a non boolean value: ".concat(inspect(coercedValue)));
}
function coerceBoolean(inputValue) {
  if (typeof inputValue !== "boolean") {
    throw new GraphQLError("Boolean cannot represent a non boolean value: ".concat(inspect(inputValue)));
  }
  return inputValue;
}
var GraphQLBoolean = new GraphQLScalarType({
  name: "Boolean",
  description: "The `Boolean` scalar type represents `true` or `false`.",
  serialize: serializeBoolean,
  parseValue: coerceBoolean,
  parseLiteral: function parseLiteral4(valueNode) {
    if (valueNode.kind !== Kind.BOOLEAN) {
      throw new GraphQLError("Boolean cannot represent a non boolean value: ".concat(print(valueNode)), valueNode);
    }
    return valueNode.value;
  }
});
function serializeID(outputValue) {
  var coercedValue = serializeObject(outputValue);
  if (typeof coercedValue === "string") {
    return coercedValue;
  }
  if (isInteger$1(coercedValue)) {
    return String(coercedValue);
  }
  throw new GraphQLError("ID cannot represent value: ".concat(inspect(outputValue)));
}
function coerceID(inputValue) {
  if (typeof inputValue === "string") {
    return inputValue;
  }
  if (isInteger$1(inputValue)) {
    return inputValue.toString();
  }
  throw new GraphQLError("ID cannot represent value: ".concat(inspect(inputValue)));
}
var GraphQLID = new GraphQLScalarType({
  name: "ID",
  description: 'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
  serialize: serializeID,
  parseValue: coerceID,
  parseLiteral: function parseLiteral5(valueNode) {
    if (valueNode.kind !== Kind.STRING && valueNode.kind !== Kind.INT) {
      throw new GraphQLError("ID cannot represent a non-string and non-integer value: " + print(valueNode), valueNode);
    }
    return valueNode.value;
  }
});
var specifiedScalarTypes = Object.freeze([GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean, GraphQLID]);
function isSpecifiedScalarType(type) {
  return specifiedScalarTypes.some(function(_ref) {
    var name = _ref.name;
    return type.name === name;
  });
}
function astFromValue(value, type) {
  if (isNonNullType(type)) {
    var astValue = astFromValue(value, type.ofType);
    if ((astValue === null || astValue === void 0 ? void 0 : astValue.kind) === Kind.NULL) {
      return null;
    }
    return astValue;
  }
  if (value === null) {
    return {
      kind: Kind.NULL
    };
  }
  if (value === void 0) {
    return null;
  }
  if (isListType(type)) {
    var itemType = type.ofType;
    var items = safeArrayFrom(value);
    if (items != null) {
      var valuesNodes = [];
      for (var _i2 = 0; _i2 < items.length; _i2++) {
        var item = items[_i2];
        var itemNode = astFromValue(item, itemType);
        if (itemNode != null) {
          valuesNodes.push(itemNode);
        }
      }
      return {
        kind: Kind.LIST,
        values: valuesNodes
      };
    }
    return astFromValue(value, itemType);
  }
  if (isInputObjectType(type)) {
    if (!isObjectLike(value)) {
      return null;
    }
    var fieldNodes = [];
    for (var _i4 = 0, _objectValues2 = objectValues$1(type.getFields()); _i4 < _objectValues2.length; _i4++) {
      var field = _objectValues2[_i4];
      var fieldValue = astFromValue(value[field.name], field.type);
      if (fieldValue) {
        fieldNodes.push({
          kind: Kind.OBJECT_FIELD,
          name: {
            kind: Kind.NAME,
            value: field.name
          },
          value: fieldValue
        });
      }
    }
    return {
      kind: Kind.OBJECT,
      fields: fieldNodes
    };
  }
  if (isLeafType(type)) {
    var serialized = type.serialize(value);
    if (serialized == null) {
      return null;
    }
    if (typeof serialized === "boolean") {
      return {
        kind: Kind.BOOLEAN,
        value: serialized
      };
    }
    if (typeof serialized === "number" && isFinite$1(serialized)) {
      var stringNum = String(serialized);
      return integerStringRegExp.test(stringNum) ? {
        kind: Kind.INT,
        value: stringNum
      } : {
        kind: Kind.FLOAT,
        value: stringNum
      };
    }
    if (typeof serialized === "string") {
      if (isEnumType(type)) {
        return {
          kind: Kind.ENUM,
          value: serialized
        };
      }
      if (type === GraphQLID && integerStringRegExp.test(serialized)) {
        return {
          kind: Kind.INT,
          value: serialized
        };
      }
      return {
        kind: Kind.STRING,
        value: serialized
      };
    }
    throw new TypeError("Cannot convert value to AST: ".concat(inspect(serialized), "."));
  }
  invariant(0, "Unexpected input type: " + inspect(type));
}
var integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;
var __Schema = new GraphQLObjectType({
  name: "__Schema",
  description: "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
  fields: function fields() {
    return {
      description: {
        type: GraphQLString,
        resolve: function resolve4(schema) {
          return schema.description;
        }
      },
      types: {
        description: "A list of all types supported by this server.",
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Type))),
        resolve: function resolve4(schema) {
          return objectValues$1(schema.getTypeMap());
        }
      },
      queryType: {
        description: "The type that query operations will be rooted at.",
        type: new GraphQLNonNull(__Type),
        resolve: function resolve4(schema) {
          return schema.getQueryType();
        }
      },
      mutationType: {
        description: "If this server supports mutation, the type that mutation operations will be rooted at.",
        type: __Type,
        resolve: function resolve4(schema) {
          return schema.getMutationType();
        }
      },
      subscriptionType: {
        description: "If this server support subscription, the type that subscription operations will be rooted at.",
        type: __Type,
        resolve: function resolve4(schema) {
          return schema.getSubscriptionType();
        }
      },
      directives: {
        description: "A list of all directives supported by this server.",
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Directive))),
        resolve: function resolve4(schema) {
          return schema.getDirectives();
        }
      }
    };
  }
});
var __Directive = new GraphQLObjectType({
  name: "__Directive",
  description: "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
  fields: function fields2() {
    return {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: function resolve4(directive) {
          return directive.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve4(directive) {
          return directive.description;
        }
      },
      isRepeatable: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve4(directive) {
          return directive.isRepeatable;
        }
      },
      locations: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__DirectiveLocation))),
        resolve: function resolve4(directive) {
          return directive.locations;
        }
      },
      args: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__InputValue))),
        args: {
          includeDeprecated: {
            type: GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve4(field, _ref) {
          var includeDeprecated = _ref.includeDeprecated;
          return includeDeprecated ? field.args : field.args.filter(function(arg) {
            return arg.deprecationReason == null;
          });
        }
      }
    };
  }
});
var __DirectiveLocation = new GraphQLEnumType({
  name: "__DirectiveLocation",
  description: "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
  values: {
    QUERY: {
      value: DirectiveLocation.QUERY,
      description: "Location adjacent to a query operation."
    },
    MUTATION: {
      value: DirectiveLocation.MUTATION,
      description: "Location adjacent to a mutation operation."
    },
    SUBSCRIPTION: {
      value: DirectiveLocation.SUBSCRIPTION,
      description: "Location adjacent to a subscription operation."
    },
    FIELD: {
      value: DirectiveLocation.FIELD,
      description: "Location adjacent to a field."
    },
    FRAGMENT_DEFINITION: {
      value: DirectiveLocation.FRAGMENT_DEFINITION,
      description: "Location adjacent to a fragment definition."
    },
    FRAGMENT_SPREAD: {
      value: DirectiveLocation.FRAGMENT_SPREAD,
      description: "Location adjacent to a fragment spread."
    },
    INLINE_FRAGMENT: {
      value: DirectiveLocation.INLINE_FRAGMENT,
      description: "Location adjacent to an inline fragment."
    },
    VARIABLE_DEFINITION: {
      value: DirectiveLocation.VARIABLE_DEFINITION,
      description: "Location adjacent to a variable definition."
    },
    SCHEMA: {
      value: DirectiveLocation.SCHEMA,
      description: "Location adjacent to a schema definition."
    },
    SCALAR: {
      value: DirectiveLocation.SCALAR,
      description: "Location adjacent to a scalar definition."
    },
    OBJECT: {
      value: DirectiveLocation.OBJECT,
      description: "Location adjacent to an object type definition."
    },
    FIELD_DEFINITION: {
      value: DirectiveLocation.FIELD_DEFINITION,
      description: "Location adjacent to a field definition."
    },
    ARGUMENT_DEFINITION: {
      value: DirectiveLocation.ARGUMENT_DEFINITION,
      description: "Location adjacent to an argument definition."
    },
    INTERFACE: {
      value: DirectiveLocation.INTERFACE,
      description: "Location adjacent to an interface definition."
    },
    UNION: {
      value: DirectiveLocation.UNION,
      description: "Location adjacent to a union definition."
    },
    ENUM: {
      value: DirectiveLocation.ENUM,
      description: "Location adjacent to an enum definition."
    },
    ENUM_VALUE: {
      value: DirectiveLocation.ENUM_VALUE,
      description: "Location adjacent to an enum value definition."
    },
    INPUT_OBJECT: {
      value: DirectiveLocation.INPUT_OBJECT,
      description: "Location adjacent to an input object type definition."
    },
    INPUT_FIELD_DEFINITION: {
      value: DirectiveLocation.INPUT_FIELD_DEFINITION,
      description: "Location adjacent to an input object field definition."
    }
  }
});
var __Type = new GraphQLObjectType({
  name: "__Type",
  description: "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
  fields: function fields3() {
    return {
      kind: {
        type: new GraphQLNonNull(__TypeKind),
        resolve: function resolve4(type) {
          if (isScalarType(type)) {
            return TypeKind.SCALAR;
          }
          if (isObjectType(type)) {
            return TypeKind.OBJECT;
          }
          if (isInterfaceType(type)) {
            return TypeKind.INTERFACE;
          }
          if (isUnionType(type)) {
            return TypeKind.UNION;
          }
          if (isEnumType(type)) {
            return TypeKind.ENUM;
          }
          if (isInputObjectType(type)) {
            return TypeKind.INPUT_OBJECT;
          }
          if (isListType(type)) {
            return TypeKind.LIST;
          }
          if (isNonNullType(type)) {
            return TypeKind.NON_NULL;
          }
          invariant(0, 'Unexpected type: "'.concat(inspect(type), '".'));
        }
      },
      name: {
        type: GraphQLString,
        resolve: function resolve4(type) {
          return type.name !== void 0 ? type.name : void 0;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve4(type) {
          return type.description !== void 0 ? type.description : void 0;
        }
      },
      specifiedByUrl: {
        type: GraphQLString,
        resolve: function resolve4(obj) {
          return obj.specifiedByUrl !== void 0 ? obj.specifiedByUrl : void 0;
        }
      },
      fields: {
        type: new GraphQLList(new GraphQLNonNull(__Field)),
        args: {
          includeDeprecated: {
            type: GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve4(type, _ref2) {
          var includeDeprecated = _ref2.includeDeprecated;
          if (isObjectType(type) || isInterfaceType(type)) {
            var fields7 = objectValues$1(type.getFields());
            return includeDeprecated ? fields7 : fields7.filter(function(field) {
              return field.deprecationReason == null;
            });
          }
        }
      },
      interfaces: {
        type: new GraphQLList(new GraphQLNonNull(__Type)),
        resolve: function resolve4(type) {
          if (isObjectType(type) || isInterfaceType(type)) {
            return type.getInterfaces();
          }
        }
      },
      possibleTypes: {
        type: new GraphQLList(new GraphQLNonNull(__Type)),
        resolve: function resolve4(type, _args, _context, _ref3) {
          var schema = _ref3.schema;
          if (isAbstractType(type)) {
            return schema.getPossibleTypes(type);
          }
        }
      },
      enumValues: {
        type: new GraphQLList(new GraphQLNonNull(__EnumValue)),
        args: {
          includeDeprecated: {
            type: GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve4(type, _ref4) {
          var includeDeprecated = _ref4.includeDeprecated;
          if (isEnumType(type)) {
            var values = type.getValues();
            return includeDeprecated ? values : values.filter(function(field) {
              return field.deprecationReason == null;
            });
          }
        }
      },
      inputFields: {
        type: new GraphQLList(new GraphQLNonNull(__InputValue)),
        args: {
          includeDeprecated: {
            type: GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve4(type, _ref5) {
          var includeDeprecated = _ref5.includeDeprecated;
          if (isInputObjectType(type)) {
            var values = objectValues$1(type.getFields());
            return includeDeprecated ? values : values.filter(function(field) {
              return field.deprecationReason == null;
            });
          }
        }
      },
      ofType: {
        type: __Type,
        resolve: function resolve4(type) {
          return type.ofType !== void 0 ? type.ofType : void 0;
        }
      }
    };
  }
});
var __Field = new GraphQLObjectType({
  name: "__Field",
  description: "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
  fields: function fields4() {
    return {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: function resolve4(field) {
          return field.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve4(field) {
          return field.description;
        }
      },
      args: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__InputValue))),
        args: {
          includeDeprecated: {
            type: GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve: function resolve4(field, _ref6) {
          var includeDeprecated = _ref6.includeDeprecated;
          return includeDeprecated ? field.args : field.args.filter(function(arg) {
            return arg.deprecationReason == null;
          });
        }
      },
      type: {
        type: new GraphQLNonNull(__Type),
        resolve: function resolve4(field) {
          return field.type;
        }
      },
      isDeprecated: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve4(field) {
          return field.deprecationReason != null;
        }
      },
      deprecationReason: {
        type: GraphQLString,
        resolve: function resolve4(field) {
          return field.deprecationReason;
        }
      }
    };
  }
});
var __InputValue = new GraphQLObjectType({
  name: "__InputValue",
  description: "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
  fields: function fields5() {
    return {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: function resolve4(inputValue) {
          return inputValue.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve4(inputValue) {
          return inputValue.description;
        }
      },
      type: {
        type: new GraphQLNonNull(__Type),
        resolve: function resolve4(inputValue) {
          return inputValue.type;
        }
      },
      defaultValue: {
        type: GraphQLString,
        description: "A GraphQL-formatted string representing the default value for this input value.",
        resolve: function resolve4(inputValue) {
          var type = inputValue.type, defaultValue = inputValue.defaultValue;
          var valueAST = astFromValue(defaultValue, type);
          return valueAST ? print(valueAST) : null;
        }
      },
      isDeprecated: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve4(field) {
          return field.deprecationReason != null;
        }
      },
      deprecationReason: {
        type: GraphQLString,
        resolve: function resolve4(obj) {
          return obj.deprecationReason;
        }
      }
    };
  }
});
var __EnumValue = new GraphQLObjectType({
  name: "__EnumValue",
  description: "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
  fields: function fields6() {
    return {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: function resolve4(enumValue) {
          return enumValue.name;
        }
      },
      description: {
        type: GraphQLString,
        resolve: function resolve4(enumValue) {
          return enumValue.description;
        }
      },
      isDeprecated: {
        type: new GraphQLNonNull(GraphQLBoolean),
        resolve: function resolve4(enumValue) {
          return enumValue.deprecationReason != null;
        }
      },
      deprecationReason: {
        type: GraphQLString,
        resolve: function resolve4(enumValue) {
          return enumValue.deprecationReason;
        }
      }
    };
  }
});
var TypeKind = Object.freeze({
  SCALAR: "SCALAR",
  OBJECT: "OBJECT",
  INTERFACE: "INTERFACE",
  UNION: "UNION",
  ENUM: "ENUM",
  INPUT_OBJECT: "INPUT_OBJECT",
  LIST: "LIST",
  NON_NULL: "NON_NULL"
});
var __TypeKind = new GraphQLEnumType({
  name: "__TypeKind",
  description: "An enum describing what kind of type a given `__Type` is.",
  values: {
    SCALAR: {
      value: TypeKind.SCALAR,
      description: "Indicates this type is a scalar."
    },
    OBJECT: {
      value: TypeKind.OBJECT,
      description: "Indicates this type is an object. `fields` and `interfaces` are valid fields."
    },
    INTERFACE: {
      value: TypeKind.INTERFACE,
      description: "Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields."
    },
    UNION: {
      value: TypeKind.UNION,
      description: "Indicates this type is a union. `possibleTypes` is a valid field."
    },
    ENUM: {
      value: TypeKind.ENUM,
      description: "Indicates this type is an enum. `enumValues` is a valid field."
    },
    INPUT_OBJECT: {
      value: TypeKind.INPUT_OBJECT,
      description: "Indicates this type is an input object. `inputFields` is a valid field."
    },
    LIST: {
      value: TypeKind.LIST,
      description: "Indicates this type is a list. `ofType` is a valid field."
    },
    NON_NULL: {
      value: TypeKind.NON_NULL,
      description: "Indicates this type is a non-null. `ofType` is a valid field."
    }
  }
});
var SchemaMetaFieldDef = {
  name: "__schema",
  type: new GraphQLNonNull(__Schema),
  description: "Access the current type schema of this server.",
  args: [],
  resolve: function resolve(_source, _args, _context, _ref7) {
    var schema = _ref7.schema;
    return schema;
  },
  isDeprecated: false,
  deprecationReason: void 0,
  extensions: void 0,
  astNode: void 0
};
var TypeMetaFieldDef = {
  name: "__type",
  type: __Type,
  description: "Request the type information of a single type.",
  args: [{
    name: "name",
    description: void 0,
    type: new GraphQLNonNull(GraphQLString),
    defaultValue: void 0,
    deprecationReason: void 0,
    extensions: void 0,
    astNode: void 0
  }],
  resolve: function resolve2(_source, _ref8, _context, _ref9) {
    var name = _ref8.name;
    var schema = _ref9.schema;
    return schema.getType(name);
  },
  isDeprecated: false,
  deprecationReason: void 0,
  extensions: void 0,
  astNode: void 0
};
var TypeNameMetaFieldDef = {
  name: "__typename",
  type: new GraphQLNonNull(GraphQLString),
  description: "The name of the current Object type at runtime.",
  args: [],
  resolve: function resolve3(_source, _args, _context, _ref10) {
    var parentType = _ref10.parentType;
    return parentType.name;
  },
  isDeprecated: false,
  deprecationReason: void 0,
  extensions: void 0,
  astNode: void 0
};
var introspectionTypes = Object.freeze([__Schema, __Directive, __DirectiveLocation, __Type, __Field, __InputValue, __EnumValue, __TypeKind]);
function isIntrospectionType(type) {
  return introspectionTypes.some(function(_ref11) {
    var name = _ref11.name;
    return type.name === name;
  });
}
function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$2(Constructor, staticProps);
  return Constructor;
}
function isDirective(directive) {
  return instanceOf(directive, GraphQLDirective);
}
function assertDirective(directive) {
  if (!isDirective(directive)) {
    throw new Error("Expected ".concat(inspect(directive), " to be a GraphQL directive."));
  }
  return directive;
}
var GraphQLDirective = /* @__PURE__ */ function() {
  function GraphQLDirective2(config) {
    var _config$isRepeatable, _config$args;
    this.name = config.name;
    this.description = config.description;
    this.locations = config.locations;
    this.isRepeatable = (_config$isRepeatable = config.isRepeatable) !== null && _config$isRepeatable !== void 0 ? _config$isRepeatable : false;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    config.name || devAssert(0, "Directive must be named.");
    Array.isArray(config.locations) || devAssert(0, "@".concat(config.name, " locations must be an Array."));
    var args = (_config$args = config.args) !== null && _config$args !== void 0 ? _config$args : {};
    isObjectLike(args) && !Array.isArray(args) || devAssert(0, "@".concat(config.name, " args must be an object with argument names as keys."));
    this.args = objectEntries$1(args).map(function(_ref) {
      var argName = _ref[0], argConfig = _ref[1];
      return {
        name: argName,
        description: argConfig.description,
        type: argConfig.type,
        defaultValue: argConfig.defaultValue,
        deprecationReason: argConfig.deprecationReason,
        extensions: argConfig.extensions && toObjMap(argConfig.extensions),
        astNode: argConfig.astNode
      };
    });
  }
  var _proto = GraphQLDirective2.prototype;
  _proto.toConfig = function toConfig() {
    return {
      name: this.name,
      description: this.description,
      locations: this.locations,
      args: argsToArgsConfig(this.args),
      isRepeatable: this.isRepeatable,
      extensions: this.extensions,
      astNode: this.astNode
    };
  };
  _proto.toString = function toString4() {
    return "@" + this.name;
  };
  _proto.toJSON = function toJSON3() {
    return this.toString();
  };
  _createClass$2(GraphQLDirective2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLDirective";
    }
  }]);
  return GraphQLDirective2;
}();
defineInspect(GraphQLDirective);
var GraphQLIncludeDirective = new GraphQLDirective({
  name: "include",
  description: "Directs the executor to include this field or fragment only when the `if` argument is true.",
  locations: [DirectiveLocation.FIELD, DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
  args: {
    if: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "Included when true."
    }
  }
});
var GraphQLSkipDirective = new GraphQLDirective({
  name: "skip",
  description: "Directs the executor to skip this field or fragment when the `if` argument is true.",
  locations: [DirectiveLocation.FIELD, DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
  args: {
    if: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "Skipped when true."
    }
  }
});
var DEFAULT_DEPRECATION_REASON = "No longer supported";
var GraphQLDeprecatedDirective = new GraphQLDirective({
  name: "deprecated",
  description: "Marks an element of a GraphQL schema as no longer supported.",
  locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.ARGUMENT_DEFINITION, DirectiveLocation.INPUT_FIELD_DEFINITION, DirectiveLocation.ENUM_VALUE],
  args: {
    reason: {
      type: GraphQLString,
      description: "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).",
      defaultValue: DEFAULT_DEPRECATION_REASON
    }
  }
});
var GraphQLSpecifiedByDirective = new GraphQLDirective({
  name: "specifiedBy",
  description: "Exposes a URL that specifies the behaviour of this scalar.",
  locations: [DirectiveLocation.SCALAR],
  args: {
    url: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The URL that specifies the behaviour of this scalar."
    }
  }
});
var specifiedDirectives = Object.freeze([GraphQLIncludeDirective, GraphQLSkipDirective, GraphQLDeprecatedDirective, GraphQLSpecifiedByDirective]);
function isSpecifiedDirective(directive) {
  return specifiedDirectives.some(function(_ref2) {
    var name = _ref2.name;
    return name === directive.name;
  });
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties$1(Constructor, staticProps);
  return Constructor;
}
function isSchema(schema) {
  return instanceOf(schema, GraphQLSchema);
}
function assertSchema(schema) {
  if (!isSchema(schema)) {
    throw new Error("Expected ".concat(inspect(schema), " to be a GraphQL schema."));
  }
  return schema;
}
var GraphQLSchema = /* @__PURE__ */ function() {
  function GraphQLSchema2(config) {
    var _config$directives;
    this.__validationErrors = config.assumeValid === true ? [] : void 0;
    isObjectLike(config) || devAssert(0, "Must provide configuration object.");
    !config.types || Array.isArray(config.types) || devAssert(0, '"types" must be Array if provided but got: '.concat(inspect(config.types), "."));
    !config.directives || Array.isArray(config.directives) || devAssert(0, '"directives" must be Array if provided but got: ' + "".concat(inspect(config.directives), "."));
    this.description = config.description;
    this.extensions = config.extensions && toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = config.extensionASTNodes;
    this._queryType = config.query;
    this._mutationType = config.mutation;
    this._subscriptionType = config.subscription;
    this._directives = (_config$directives = config.directives) !== null && _config$directives !== void 0 ? _config$directives : specifiedDirectives;
    var allReferencedTypes = new Set(config.types);
    if (config.types != null) {
      for (var _i2 = 0, _config$types2 = config.types; _i2 < _config$types2.length; _i2++) {
        var type = _config$types2[_i2];
        allReferencedTypes.delete(type);
        collectReferencedTypes(type, allReferencedTypes);
      }
    }
    if (this._queryType != null) {
      collectReferencedTypes(this._queryType, allReferencedTypes);
    }
    if (this._mutationType != null) {
      collectReferencedTypes(this._mutationType, allReferencedTypes);
    }
    if (this._subscriptionType != null) {
      collectReferencedTypes(this._subscriptionType, allReferencedTypes);
    }
    for (var _i4 = 0, _this$_directives2 = this._directives; _i4 < _this$_directives2.length; _i4++) {
      var directive = _this$_directives2[_i4];
      if (isDirective(directive)) {
        for (var _i6 = 0, _directive$args2 = directive.args; _i6 < _directive$args2.length; _i6++) {
          var arg = _directive$args2[_i6];
          collectReferencedTypes(arg.type, allReferencedTypes);
        }
      }
    }
    collectReferencedTypes(__Schema, allReferencedTypes);
    this._typeMap = /* @__PURE__ */ Object.create(null);
    this._subTypeMap = /* @__PURE__ */ Object.create(null);
    this._implementationsMap = /* @__PURE__ */ Object.create(null);
    for (var _i8 = 0, _arrayFrom2 = arrayFrom$1(allReferencedTypes); _i8 < _arrayFrom2.length; _i8++) {
      var namedType = _arrayFrom2[_i8];
      if (namedType == null) {
        continue;
      }
      var typeName = namedType.name;
      typeName || devAssert(0, "One of the provided types for building the Schema is missing a name.");
      if (this._typeMap[typeName] !== void 0) {
        throw new Error('Schema must contain uniquely named types but contains multiple types named "'.concat(typeName, '".'));
      }
      this._typeMap[typeName] = namedType;
      if (isInterfaceType(namedType)) {
        for (var _i10 = 0, _namedType$getInterfa2 = namedType.getInterfaces(); _i10 < _namedType$getInterfa2.length; _i10++) {
          var iface = _namedType$getInterfa2[_i10];
          if (isInterfaceType(iface)) {
            var implementations = this._implementationsMap[iface.name];
            if (implementations === void 0) {
              implementations = this._implementationsMap[iface.name] = {
                objects: [],
                interfaces: []
              };
            }
            implementations.interfaces.push(namedType);
          }
        }
      } else if (isObjectType(namedType)) {
        for (var _i12 = 0, _namedType$getInterfa4 = namedType.getInterfaces(); _i12 < _namedType$getInterfa4.length; _i12++) {
          var _iface = _namedType$getInterfa4[_i12];
          if (isInterfaceType(_iface)) {
            var _implementations = this._implementationsMap[_iface.name];
            if (_implementations === void 0) {
              _implementations = this._implementationsMap[_iface.name] = {
                objects: [],
                interfaces: []
              };
            }
            _implementations.objects.push(namedType);
          }
        }
      }
    }
  }
  var _proto = GraphQLSchema2.prototype;
  _proto.getQueryType = function getQueryType() {
    return this._queryType;
  };
  _proto.getMutationType = function getMutationType() {
    return this._mutationType;
  };
  _proto.getSubscriptionType = function getSubscriptionType() {
    return this._subscriptionType;
  };
  _proto.getTypeMap = function getTypeMap() {
    return this._typeMap;
  };
  _proto.getType = function getType(name) {
    return this.getTypeMap()[name];
  };
  _proto.getPossibleTypes = function getPossibleTypes(abstractType) {
    return isUnionType(abstractType) ? abstractType.getTypes() : this.getImplementations(abstractType).objects;
  };
  _proto.getImplementations = function getImplementations(interfaceType) {
    var implementations = this._implementationsMap[interfaceType.name];
    return implementations !== null && implementations !== void 0 ? implementations : {
      objects: [],
      interfaces: []
    };
  };
  _proto.isPossibleType = function isPossibleType(abstractType, possibleType) {
    return this.isSubType(abstractType, possibleType);
  };
  _proto.isSubType = function isSubType(abstractType, maybeSubType) {
    var map = this._subTypeMap[abstractType.name];
    if (map === void 0) {
      map = /* @__PURE__ */ Object.create(null);
      if (isUnionType(abstractType)) {
        for (var _i14 = 0, _abstractType$getType2 = abstractType.getTypes(); _i14 < _abstractType$getType2.length; _i14++) {
          var type = _abstractType$getType2[_i14];
          map[type.name] = true;
        }
      } else {
        var implementations = this.getImplementations(abstractType);
        for (var _i16 = 0, _implementations$obje2 = implementations.objects; _i16 < _implementations$obje2.length; _i16++) {
          var _type = _implementations$obje2[_i16];
          map[_type.name] = true;
        }
        for (var _i18 = 0, _implementations$inte2 = implementations.interfaces; _i18 < _implementations$inte2.length; _i18++) {
          var _type2 = _implementations$inte2[_i18];
          map[_type2.name] = true;
        }
      }
      this._subTypeMap[abstractType.name] = map;
    }
    return map[maybeSubType.name] !== void 0;
  };
  _proto.getDirectives = function getDirectives() {
    return this._directives;
  };
  _proto.getDirective = function getDirective(name) {
    return find$1(this.getDirectives(), function(directive) {
      return directive.name === name;
    });
  };
  _proto.toConfig = function toConfig() {
    var _this$extensionASTNod;
    return {
      description: this.description,
      query: this.getQueryType(),
      mutation: this.getMutationType(),
      subscription: this.getSubscriptionType(),
      types: objectValues$1(this.getTypeMap()),
      directives: this.getDirectives().slice(),
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: (_this$extensionASTNod = this.extensionASTNodes) !== null && _this$extensionASTNod !== void 0 ? _this$extensionASTNod : [],
      assumeValid: this.__validationErrors !== void 0
    };
  };
  _createClass$1(GraphQLSchema2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get3() {
      return "GraphQLSchema";
    }
  }]);
  return GraphQLSchema2;
}();
function collectReferencedTypes(type, typeSet) {
  var namedType = getNamedType(type);
  if (!typeSet.has(namedType)) {
    typeSet.add(namedType);
    if (isUnionType(namedType)) {
      for (var _i20 = 0, _namedType$getTypes2 = namedType.getTypes(); _i20 < _namedType$getTypes2.length; _i20++) {
        var memberType = _namedType$getTypes2[_i20];
        collectReferencedTypes(memberType, typeSet);
      }
    } else if (isObjectType(namedType) || isInterfaceType(namedType)) {
      for (var _i22 = 0, _namedType$getInterfa6 = namedType.getInterfaces(); _i22 < _namedType$getInterfa6.length; _i22++) {
        var interfaceType = _namedType$getInterfa6[_i22];
        collectReferencedTypes(interfaceType, typeSet);
      }
      for (var _i24 = 0, _objectValues2 = objectValues$1(namedType.getFields()); _i24 < _objectValues2.length; _i24++) {
        var field = _objectValues2[_i24];
        collectReferencedTypes(field.type, typeSet);
        for (var _i26 = 0, _field$args2 = field.args; _i26 < _field$args2.length; _i26++) {
          var arg = _field$args2[_i26];
          collectReferencedTypes(arg.type, typeSet);
        }
      }
    } else if (isInputObjectType(namedType)) {
      for (var _i28 = 0, _objectValues4 = objectValues$1(namedType.getFields()); _i28 < _objectValues4.length; _i28++) {
        var _field = _objectValues4[_i28];
        collectReferencedTypes(_field.type, typeSet);
      }
    }
  }
  return typeSet;
}
function validateSchema(schema) {
  assertSchema(schema);
  if (schema.__validationErrors) {
    return schema.__validationErrors;
  }
  var context = new SchemaValidationContext(schema);
  validateRootTypes(context);
  validateDirectives(context);
  validateTypes(context);
  var errors = context.getErrors();
  schema.__validationErrors = errors;
  return errors;
}
function assertValidSchema(schema) {
  var errors = validateSchema(schema);
  if (errors.length !== 0) {
    throw new Error(errors.map(function(error) {
      return error.message;
    }).join("\n\n"));
  }
}
var SchemaValidationContext = /* @__PURE__ */ function() {
  function SchemaValidationContext2(schema) {
    this._errors = [];
    this.schema = schema;
  }
  var _proto = SchemaValidationContext2.prototype;
  _proto.reportError = function reportError(message, nodes) {
    var _nodes = Array.isArray(nodes) ? nodes.filter(Boolean) : nodes;
    this.addError(new GraphQLError(message, _nodes));
  };
  _proto.addError = function addError(error) {
    this._errors.push(error);
  };
  _proto.getErrors = function getErrors() {
    return this._errors;
  };
  return SchemaValidationContext2;
}();
function validateRootTypes(context) {
  var schema = context.schema;
  var queryType = schema.getQueryType();
  if (!queryType) {
    context.reportError("Query root type must be provided.", schema.astNode);
  } else if (!isObjectType(queryType)) {
    var _getOperationTypeNode;
    context.reportError("Query root type must be Object type, it cannot be ".concat(inspect(queryType), "."), (_getOperationTypeNode = getOperationTypeNode(schema, "query")) !== null && _getOperationTypeNode !== void 0 ? _getOperationTypeNode : queryType.astNode);
  }
  var mutationType = schema.getMutationType();
  if (mutationType && !isObjectType(mutationType)) {
    var _getOperationTypeNode2;
    context.reportError("Mutation root type must be Object type if provided, it cannot be " + "".concat(inspect(mutationType), "."), (_getOperationTypeNode2 = getOperationTypeNode(schema, "mutation")) !== null && _getOperationTypeNode2 !== void 0 ? _getOperationTypeNode2 : mutationType.astNode);
  }
  var subscriptionType = schema.getSubscriptionType();
  if (subscriptionType && !isObjectType(subscriptionType)) {
    var _getOperationTypeNode3;
    context.reportError("Subscription root type must be Object type if provided, it cannot be " + "".concat(inspect(subscriptionType), "."), (_getOperationTypeNode3 = getOperationTypeNode(schema, "subscription")) !== null && _getOperationTypeNode3 !== void 0 ? _getOperationTypeNode3 : subscriptionType.astNode);
  }
}
function getOperationTypeNode(schema, operation) {
  var operationNodes = getAllSubNodes(schema, function(node2) {
    return node2.operationTypes;
  });
  for (var _i2 = 0; _i2 < operationNodes.length; _i2++) {
    var node = operationNodes[_i2];
    if (node.operation === operation) {
      return node.type;
    }
  }
  return void 0;
}
function validateDirectives(context) {
  for (var _i4 = 0, _context$schema$getDi2 = context.schema.getDirectives(); _i4 < _context$schema$getDi2.length; _i4++) {
    var directive = _context$schema$getDi2[_i4];
    if (!isDirective(directive)) {
      context.reportError("Expected directive but got: ".concat(inspect(directive), "."), directive === null || directive === void 0 ? void 0 : directive.astNode);
      continue;
    }
    validateName(context, directive);
    for (var _i6 = 0, _directive$args2 = directive.args; _i6 < _directive$args2.length; _i6++) {
      var arg = _directive$args2[_i6];
      validateName(context, arg);
      if (!isInputType(arg.type)) {
        context.reportError("The type of @".concat(directive.name, "(").concat(arg.name, ":) must be Input Type ") + "but got: ".concat(inspect(arg.type), "."), arg.astNode);
      }
      if (isRequiredArgument(arg) && arg.deprecationReason != null) {
        var _arg$astNode;
        context.reportError("Required argument @".concat(directive.name, "(").concat(arg.name, ":) cannot be deprecated."), [
          getDeprecatedDirectiveNode(arg.astNode),
          (_arg$astNode = arg.astNode) === null || _arg$astNode === void 0 ? void 0 : _arg$astNode.type
        ]);
      }
    }
  }
}
function validateName(context, node) {
  var error = isValidNameError(node.name);
  if (error) {
    context.addError(locatedError(error, node.astNode));
  }
}
function validateTypes(context) {
  var validateInputObjectCircularRefs = createInputObjectCircularRefsValidator(context);
  var typeMap = context.schema.getTypeMap();
  for (var _i8 = 0, _objectValues2 = objectValues$1(typeMap); _i8 < _objectValues2.length; _i8++) {
    var type = _objectValues2[_i8];
    if (!isNamedType(type)) {
      context.reportError("Expected GraphQL named type but got: ".concat(inspect(type), "."), type.astNode);
      continue;
    }
    if (!isIntrospectionType(type)) {
      validateName(context, type);
    }
    if (isObjectType(type)) {
      validateFields(context, type);
      validateInterfaces(context, type);
    } else if (isInterfaceType(type)) {
      validateFields(context, type);
      validateInterfaces(context, type);
    } else if (isUnionType(type)) {
      validateUnionMembers(context, type);
    } else if (isEnumType(type)) {
      validateEnumValues(context, type);
    } else if (isInputObjectType(type)) {
      validateInputFields(context, type);
      validateInputObjectCircularRefs(type);
    }
  }
}
function validateFields(context, type) {
  var fields7 = objectValues$1(type.getFields());
  if (fields7.length === 0) {
    context.reportError("Type ".concat(type.name, " must define one or more fields."), getAllNodes(type));
  }
  for (var _i10 = 0; _i10 < fields7.length; _i10++) {
    var field = fields7[_i10];
    validateName(context, field);
    if (!isOutputType(field.type)) {
      var _field$astNode;
      context.reportError("The type of ".concat(type.name, ".").concat(field.name, " must be Output Type ") + "but got: ".concat(inspect(field.type), "."), (_field$astNode = field.astNode) === null || _field$astNode === void 0 ? void 0 : _field$astNode.type);
    }
    for (var _i12 = 0, _field$args2 = field.args; _i12 < _field$args2.length; _i12++) {
      var arg = _field$args2[_i12];
      var argName = arg.name;
      validateName(context, arg);
      if (!isInputType(arg.type)) {
        var _arg$astNode2;
        context.reportError("The type of ".concat(type.name, ".").concat(field.name, "(").concat(argName, ":) must be Input ") + "Type but got: ".concat(inspect(arg.type), "."), (_arg$astNode2 = arg.astNode) === null || _arg$astNode2 === void 0 ? void 0 : _arg$astNode2.type);
      }
      if (isRequiredArgument(arg) && arg.deprecationReason != null) {
        var _arg$astNode3;
        context.reportError("Required argument ".concat(type.name, ".").concat(field.name, "(").concat(argName, ":) cannot be deprecated."), [
          getDeprecatedDirectiveNode(arg.astNode),
          (_arg$astNode3 = arg.astNode) === null || _arg$astNode3 === void 0 ? void 0 : _arg$astNode3.type
        ]);
      }
    }
  }
}
function validateInterfaces(context, type) {
  var ifaceTypeNames = /* @__PURE__ */ Object.create(null);
  for (var _i14 = 0, _type$getInterfaces2 = type.getInterfaces(); _i14 < _type$getInterfaces2.length; _i14++) {
    var iface = _type$getInterfaces2[_i14];
    if (!isInterfaceType(iface)) {
      context.reportError("Type ".concat(inspect(type), " must only implement Interface types, ") + "it cannot implement ".concat(inspect(iface), "."), getAllImplementsInterfaceNodes(type, iface));
      continue;
    }
    if (type === iface) {
      context.reportError("Type ".concat(type.name, " cannot implement itself because it would create a circular reference."), getAllImplementsInterfaceNodes(type, iface));
      continue;
    }
    if (ifaceTypeNames[iface.name]) {
      context.reportError("Type ".concat(type.name, " can only implement ").concat(iface.name, " once."), getAllImplementsInterfaceNodes(type, iface));
      continue;
    }
    ifaceTypeNames[iface.name] = true;
    validateTypeImplementsAncestors(context, type, iface);
    validateTypeImplementsInterface(context, type, iface);
  }
}
function validateTypeImplementsInterface(context, type, iface) {
  var typeFieldMap = type.getFields();
  for (var _i16 = 0, _objectValues4 = objectValues$1(iface.getFields()); _i16 < _objectValues4.length; _i16++) {
    var ifaceField = _objectValues4[_i16];
    var fieldName = ifaceField.name;
    var typeField = typeFieldMap[fieldName];
    if (!typeField) {
      context.reportError("Interface field ".concat(iface.name, ".").concat(fieldName, " expected but ").concat(type.name, " does not provide it."), [ifaceField.astNode].concat(getAllNodes(type)));
      continue;
    }
    if (!isTypeSubTypeOf(context.schema, typeField.type, ifaceField.type)) {
      var _ifaceField$astNode, _typeField$astNode;
      context.reportError("Interface field ".concat(iface.name, ".").concat(fieldName, " expects type ") + "".concat(inspect(ifaceField.type), " but ").concat(type.name, ".").concat(fieldName, " ") + "is type ".concat(inspect(typeField.type), "."), [
        (_ifaceField$astNode = ifaceField.astNode) === null || _ifaceField$astNode === void 0 ? void 0 : _ifaceField$astNode.type,
        (_typeField$astNode = typeField.astNode) === null || _typeField$astNode === void 0 ? void 0 : _typeField$astNode.type
      ]);
    }
    var _loop = function _loop3(_i182, _ifaceField$args22) {
      var ifaceArg = _ifaceField$args22[_i182];
      var argName = ifaceArg.name;
      var typeArg = find$1(typeField.args, function(arg) {
        return arg.name === argName;
      });
      if (!typeArg) {
        context.reportError("Interface field argument ".concat(iface.name, ".").concat(fieldName, "(").concat(argName, ":) expected but ").concat(type.name, ".").concat(fieldName, " does not provide it."), [ifaceArg.astNode, typeField.astNode]);
        return "continue";
      }
      if (!isEqualType(ifaceArg.type, typeArg.type)) {
        var _ifaceArg$astNode, _typeArg$astNode;
        context.reportError("Interface field argument ".concat(iface.name, ".").concat(fieldName, "(").concat(argName, ":) ") + "expects type ".concat(inspect(ifaceArg.type), " but ") + "".concat(type.name, ".").concat(fieldName, "(").concat(argName, ":) is type ") + "".concat(inspect(typeArg.type), "."), [
          (_ifaceArg$astNode = ifaceArg.astNode) === null || _ifaceArg$astNode === void 0 ? void 0 : _ifaceArg$astNode.type,
          (_typeArg$astNode = typeArg.astNode) === null || _typeArg$astNode === void 0 ? void 0 : _typeArg$astNode.type
        ]);
      }
    };
    for (var _i18 = 0, _ifaceField$args2 = ifaceField.args; _i18 < _ifaceField$args2.length; _i18++) {
      var _ret = _loop(_i18, _ifaceField$args2);
      if (_ret === "continue")
        continue;
    }
    var _loop2 = function _loop22(_i202, _typeField$args22) {
      var typeArg = _typeField$args22[_i202];
      var argName = typeArg.name;
      var ifaceArg = find$1(ifaceField.args, function(arg) {
        return arg.name === argName;
      });
      if (!ifaceArg && isRequiredArgument(typeArg)) {
        context.reportError("Object field ".concat(type.name, ".").concat(fieldName, " includes required argument ").concat(argName, " that is missing from the Interface field ").concat(iface.name, ".").concat(fieldName, "."), [typeArg.astNode, ifaceField.astNode]);
      }
    };
    for (var _i20 = 0, _typeField$args2 = typeField.args; _i20 < _typeField$args2.length; _i20++) {
      _loop2(_i20, _typeField$args2);
    }
  }
}
function validateTypeImplementsAncestors(context, type, iface) {
  var ifaceInterfaces = type.getInterfaces();
  for (var _i22 = 0, _iface$getInterfaces2 = iface.getInterfaces(); _i22 < _iface$getInterfaces2.length; _i22++) {
    var transitive = _iface$getInterfaces2[_i22];
    if (ifaceInterfaces.indexOf(transitive) === -1) {
      context.reportError(transitive === type ? "Type ".concat(type.name, " cannot implement ").concat(iface.name, " because it would create a circular reference.") : "Type ".concat(type.name, " must implement ").concat(transitive.name, " because it is implemented by ").concat(iface.name, "."), [].concat(getAllImplementsInterfaceNodes(iface, transitive), getAllImplementsInterfaceNodes(type, iface)));
    }
  }
}
function validateUnionMembers(context, union) {
  var memberTypes = union.getTypes();
  if (memberTypes.length === 0) {
    context.reportError("Union type ".concat(union.name, " must define one or more member types."), getAllNodes(union));
  }
  var includedTypeNames = /* @__PURE__ */ Object.create(null);
  for (var _i24 = 0; _i24 < memberTypes.length; _i24++) {
    var memberType = memberTypes[_i24];
    if (includedTypeNames[memberType.name]) {
      context.reportError("Union type ".concat(union.name, " can only include type ").concat(memberType.name, " once."), getUnionMemberTypeNodes(union, memberType.name));
      continue;
    }
    includedTypeNames[memberType.name] = true;
    if (!isObjectType(memberType)) {
      context.reportError("Union type ".concat(union.name, " can only include Object types, ") + "it cannot include ".concat(inspect(memberType), "."), getUnionMemberTypeNodes(union, String(memberType)));
    }
  }
}
function validateEnumValues(context, enumType) {
  var enumValues = enumType.getValues();
  if (enumValues.length === 0) {
    context.reportError("Enum type ".concat(enumType.name, " must define one or more values."), getAllNodes(enumType));
  }
  for (var _i26 = 0; _i26 < enumValues.length; _i26++) {
    var enumValue = enumValues[_i26];
    var valueName = enumValue.name;
    validateName(context, enumValue);
    if (valueName === "true" || valueName === "false" || valueName === "null") {
      context.reportError("Enum type ".concat(enumType.name, " cannot include value: ").concat(valueName, "."), enumValue.astNode);
    }
  }
}
function validateInputFields(context, inputObj) {
  var fields7 = objectValues$1(inputObj.getFields());
  if (fields7.length === 0) {
    context.reportError("Input Object type ".concat(inputObj.name, " must define one or more fields."), getAllNodes(inputObj));
  }
  for (var _i28 = 0; _i28 < fields7.length; _i28++) {
    var field = fields7[_i28];
    validateName(context, field);
    if (!isInputType(field.type)) {
      var _field$astNode2;
      context.reportError("The type of ".concat(inputObj.name, ".").concat(field.name, " must be Input Type ") + "but got: ".concat(inspect(field.type), "."), (_field$astNode2 = field.astNode) === null || _field$astNode2 === void 0 ? void 0 : _field$astNode2.type);
    }
    if (isRequiredInputField(field) && field.deprecationReason != null) {
      var _field$astNode3;
      context.reportError("Required input field ".concat(inputObj.name, ".").concat(field.name, " cannot be deprecated."), [
        getDeprecatedDirectiveNode(field.astNode),
        (_field$astNode3 = field.astNode) === null || _field$astNode3 === void 0 ? void 0 : _field$astNode3.type
      ]);
    }
  }
}
function createInputObjectCircularRefsValidator(context) {
  var visitedTypes = /* @__PURE__ */ Object.create(null);
  var fieldPath = [];
  var fieldPathIndexByTypeName = /* @__PURE__ */ Object.create(null);
  return detectCycleRecursive;
  function detectCycleRecursive(inputObj) {
    if (visitedTypes[inputObj.name]) {
      return;
    }
    visitedTypes[inputObj.name] = true;
    fieldPathIndexByTypeName[inputObj.name] = fieldPath.length;
    var fields7 = objectValues$1(inputObj.getFields());
    for (var _i30 = 0; _i30 < fields7.length; _i30++) {
      var field = fields7[_i30];
      if (isNonNullType(field.type) && isInputObjectType(field.type.ofType)) {
        var fieldType = field.type.ofType;
        var cycleIndex = fieldPathIndexByTypeName[fieldType.name];
        fieldPath.push(field);
        if (cycleIndex === void 0) {
          detectCycleRecursive(fieldType);
        } else {
          var cyclePath = fieldPath.slice(cycleIndex);
          var pathStr = cyclePath.map(function(fieldObj) {
            return fieldObj.name;
          }).join(".");
          context.reportError('Cannot reference Input Object "'.concat(fieldType.name, '" within itself through a series of non-null fields: "').concat(pathStr, '".'), cyclePath.map(function(fieldObj) {
            return fieldObj.astNode;
          }));
        }
        fieldPath.pop();
      }
    }
    fieldPathIndexByTypeName[inputObj.name] = void 0;
  }
}
function getAllNodes(object) {
  var astNode = object.astNode, extensionASTNodes = object.extensionASTNodes;
  return astNode ? extensionASTNodes ? [astNode].concat(extensionASTNodes) : [astNode] : extensionASTNodes !== null && extensionASTNodes !== void 0 ? extensionASTNodes : [];
}
function getAllSubNodes(object, getter) {
  var subNodes = [];
  for (var _i32 = 0, _getAllNodes2 = getAllNodes(object); _i32 < _getAllNodes2.length; _i32++) {
    var _getter;
    var node = _getAllNodes2[_i32];
    subNodes = subNodes.concat((_getter = getter(node)) !== null && _getter !== void 0 ? _getter : []);
  }
  return subNodes;
}
function getAllImplementsInterfaceNodes(type, iface) {
  return getAllSubNodes(type, function(typeNode) {
    return typeNode.interfaces;
  }).filter(function(ifaceNode) {
    return ifaceNode.name.value === iface.name;
  });
}
function getUnionMemberTypeNodes(union, typeName) {
  return getAllSubNodes(union, function(unionNode) {
    return unionNode.types;
  }).filter(function(typeNode) {
    return typeNode.name.value === typeName;
  });
}
function getDeprecatedDirectiveNode(definitionNode) {
  var _definitionNode$direc;
  return definitionNode === null || definitionNode === void 0 ? void 0 : (_definitionNode$direc = definitionNode.directives) === null || _definitionNode$direc === void 0 ? void 0 : _definitionNode$direc.find(function(node) {
    return node.name.value === GraphQLDeprecatedDirective.name;
  });
}
function typeFromAST(schema, typeNode) {
  var innerType;
  if (typeNode.kind === Kind.LIST_TYPE) {
    innerType = typeFromAST(schema, typeNode.type);
    return innerType && new GraphQLList(innerType);
  }
  if (typeNode.kind === Kind.NON_NULL_TYPE) {
    innerType = typeFromAST(schema, typeNode.type);
    return innerType && new GraphQLNonNull(innerType);
  }
  if (typeNode.kind === Kind.NAMED_TYPE) {
    return schema.getType(typeNode.name.value);
  }
  invariant(0, "Unexpected type node: " + inspect(typeNode));
}
var TypeInfo = /* @__PURE__ */ function() {
  function TypeInfo2(schema, getFieldDefFn, initialType) {
    this._schema = schema;
    this._typeStack = [];
    this._parentTypeStack = [];
    this._inputTypeStack = [];
    this._fieldDefStack = [];
    this._defaultValueStack = [];
    this._directive = null;
    this._argument = null;
    this._enumValue = null;
    this._getFieldDef = getFieldDefFn !== null && getFieldDefFn !== void 0 ? getFieldDefFn : getFieldDef$1;
    if (initialType) {
      if (isInputType(initialType)) {
        this._inputTypeStack.push(initialType);
      }
      if (isCompositeType(initialType)) {
        this._parentTypeStack.push(initialType);
      }
      if (isOutputType(initialType)) {
        this._typeStack.push(initialType);
      }
    }
  }
  var _proto = TypeInfo2.prototype;
  _proto.getType = function getType() {
    if (this._typeStack.length > 0) {
      return this._typeStack[this._typeStack.length - 1];
    }
  };
  _proto.getParentType = function getParentType() {
    if (this._parentTypeStack.length > 0) {
      return this._parentTypeStack[this._parentTypeStack.length - 1];
    }
  };
  _proto.getInputType = function getInputType() {
    if (this._inputTypeStack.length > 0) {
      return this._inputTypeStack[this._inputTypeStack.length - 1];
    }
  };
  _proto.getParentInputType = function getParentInputType() {
    if (this._inputTypeStack.length > 1) {
      return this._inputTypeStack[this._inputTypeStack.length - 2];
    }
  };
  _proto.getFieldDef = function getFieldDef2() {
    if (this._fieldDefStack.length > 0) {
      return this._fieldDefStack[this._fieldDefStack.length - 1];
    }
  };
  _proto.getDefaultValue = function getDefaultValue() {
    if (this._defaultValueStack.length > 0) {
      return this._defaultValueStack[this._defaultValueStack.length - 1];
    }
  };
  _proto.getDirective = function getDirective() {
    return this._directive;
  };
  _proto.getArgument = function getArgument() {
    return this._argument;
  };
  _proto.getEnumValue = function getEnumValue() {
    return this._enumValue;
  };
  _proto.enter = function enter(node) {
    var schema = this._schema;
    switch (node.kind) {
      case Kind.SELECTION_SET: {
        var namedType = getNamedType(this.getType());
        this._parentTypeStack.push(isCompositeType(namedType) ? namedType : void 0);
        break;
      }
      case Kind.FIELD: {
        var parentType = this.getParentType();
        var fieldDef;
        var fieldType;
        if (parentType) {
          fieldDef = this._getFieldDef(schema, parentType, node);
          if (fieldDef) {
            fieldType = fieldDef.type;
          }
        }
        this._fieldDefStack.push(fieldDef);
        this._typeStack.push(isOutputType(fieldType) ? fieldType : void 0);
        break;
      }
      case Kind.DIRECTIVE:
        this._directive = schema.getDirective(node.name.value);
        break;
      case Kind.OPERATION_DEFINITION: {
        var type;
        switch (node.operation) {
          case "query":
            type = schema.getQueryType();
            break;
          case "mutation":
            type = schema.getMutationType();
            break;
          case "subscription":
            type = schema.getSubscriptionType();
            break;
        }
        this._typeStack.push(isObjectType(type) ? type : void 0);
        break;
      }
      case Kind.INLINE_FRAGMENT:
      case Kind.FRAGMENT_DEFINITION: {
        var typeConditionAST = node.typeCondition;
        var outputType = typeConditionAST ? typeFromAST(schema, typeConditionAST) : getNamedType(this.getType());
        this._typeStack.push(isOutputType(outputType) ? outputType : void 0);
        break;
      }
      case Kind.VARIABLE_DEFINITION: {
        var inputType = typeFromAST(schema, node.type);
        this._inputTypeStack.push(isInputType(inputType) ? inputType : void 0);
        break;
      }
      case Kind.ARGUMENT: {
        var _this$getDirective;
        var argDef;
        var argType;
        var fieldOrDirective = (_this$getDirective = this.getDirective()) !== null && _this$getDirective !== void 0 ? _this$getDirective : this.getFieldDef();
        if (fieldOrDirective) {
          argDef = find$1(fieldOrDirective.args, function(arg) {
            return arg.name === node.name.value;
          });
          if (argDef) {
            argType = argDef.type;
          }
        }
        this._argument = argDef;
        this._defaultValueStack.push(argDef ? argDef.defaultValue : void 0);
        this._inputTypeStack.push(isInputType(argType) ? argType : void 0);
        break;
      }
      case Kind.LIST: {
        var listType = getNullableType(this.getInputType());
        var itemType = isListType(listType) ? listType.ofType : listType;
        this._defaultValueStack.push(void 0);
        this._inputTypeStack.push(isInputType(itemType) ? itemType : void 0);
        break;
      }
      case Kind.OBJECT_FIELD: {
        var objectType = getNamedType(this.getInputType());
        var inputFieldType;
        var inputField;
        if (isInputObjectType(objectType)) {
          inputField = objectType.getFields()[node.name.value];
          if (inputField) {
            inputFieldType = inputField.type;
          }
        }
        this._defaultValueStack.push(inputField ? inputField.defaultValue : void 0);
        this._inputTypeStack.push(isInputType(inputFieldType) ? inputFieldType : void 0);
        break;
      }
      case Kind.ENUM: {
        var enumType = getNamedType(this.getInputType());
        var enumValue;
        if (isEnumType(enumType)) {
          enumValue = enumType.getValue(node.value);
        }
        this._enumValue = enumValue;
        break;
      }
    }
  };
  _proto.leave = function leave(node) {
    switch (node.kind) {
      case Kind.SELECTION_SET:
        this._parentTypeStack.pop();
        break;
      case Kind.FIELD:
        this._fieldDefStack.pop();
        this._typeStack.pop();
        break;
      case Kind.DIRECTIVE:
        this._directive = null;
        break;
      case Kind.OPERATION_DEFINITION:
      case Kind.INLINE_FRAGMENT:
      case Kind.FRAGMENT_DEFINITION:
        this._typeStack.pop();
        break;
      case Kind.VARIABLE_DEFINITION:
        this._inputTypeStack.pop();
        break;
      case Kind.ARGUMENT:
        this._argument = null;
        this._defaultValueStack.pop();
        this._inputTypeStack.pop();
        break;
      case Kind.LIST:
      case Kind.OBJECT_FIELD:
        this._defaultValueStack.pop();
        this._inputTypeStack.pop();
        break;
      case Kind.ENUM:
        this._enumValue = null;
        break;
    }
  };
  return TypeInfo2;
}();
function getFieldDef$1(schema, parentType, fieldNode) {
  var name = fieldNode.name.value;
  if (name === SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
    return SchemaMetaFieldDef;
  }
  if (name === TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return TypeMetaFieldDef;
  }
  if (name === TypeNameMetaFieldDef.name && isCompositeType(parentType)) {
    return TypeNameMetaFieldDef;
  }
  if (isObjectType(parentType) || isInterfaceType(parentType)) {
    return parentType.getFields()[name];
  }
}
function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter: function enter(node) {
      typeInfo.enter(node);
      var fn = getVisitFn(
        visitor,
        node.kind,
        false
      );
      if (fn) {
        var result = fn.apply(visitor, arguments);
        if (result !== void 0) {
          typeInfo.leave(node);
          if (isNode(result)) {
            typeInfo.enter(result);
          }
        }
        return result;
      }
    },
    leave: function leave(node) {
      var fn = getVisitFn(
        visitor,
        node.kind,
        true
      );
      var result;
      if (fn) {
        result = fn.apply(visitor, arguments);
      }
      typeInfo.leave(node);
      return result;
    }
  };
}
function isDefinitionNode(node) {
  return isExecutableDefinitionNode(node) || isTypeSystemDefinitionNode(node) || isTypeSystemExtensionNode(node);
}
function isExecutableDefinitionNode(node) {
  return node.kind === Kind.OPERATION_DEFINITION || node.kind === Kind.FRAGMENT_DEFINITION;
}
function isSelectionNode(node) {
  return node.kind === Kind.FIELD || node.kind === Kind.FRAGMENT_SPREAD || node.kind === Kind.INLINE_FRAGMENT;
}
function isValueNode(node) {
  return node.kind === Kind.VARIABLE || node.kind === Kind.INT || node.kind === Kind.FLOAT || node.kind === Kind.STRING || node.kind === Kind.BOOLEAN || node.kind === Kind.NULL || node.kind === Kind.ENUM || node.kind === Kind.LIST || node.kind === Kind.OBJECT;
}
function isTypeNode(node) {
  return node.kind === Kind.NAMED_TYPE || node.kind === Kind.LIST_TYPE || node.kind === Kind.NON_NULL_TYPE;
}
function isTypeSystemDefinitionNode(node) {
  return node.kind === Kind.SCHEMA_DEFINITION || isTypeDefinitionNode(node) || node.kind === Kind.DIRECTIVE_DEFINITION;
}
function isTypeDefinitionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_DEFINITION || node.kind === Kind.OBJECT_TYPE_DEFINITION || node.kind === Kind.INTERFACE_TYPE_DEFINITION || node.kind === Kind.UNION_TYPE_DEFINITION || node.kind === Kind.ENUM_TYPE_DEFINITION || node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION;
}
function isTypeSystemExtensionNode(node) {
  return node.kind === Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
}
function isTypeExtensionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_EXTENSION || node.kind === Kind.OBJECT_TYPE_EXTENSION || node.kind === Kind.INTERFACE_TYPE_EXTENSION || node.kind === Kind.UNION_TYPE_EXTENSION || node.kind === Kind.ENUM_TYPE_EXTENSION || node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION;
}
function ExecutableDefinitionsRule(context) {
  return {
    Document: function Document3(node) {
      for (var _i2 = 0, _node$definitions2 = node.definitions; _i2 < _node$definitions2.length; _i2++) {
        var definition = _node$definitions2[_i2];
        if (!isExecutableDefinitionNode(definition)) {
          var defName = definition.kind === Kind.SCHEMA_DEFINITION || definition.kind === Kind.SCHEMA_EXTENSION ? "schema" : '"' + definition.name.value + '"';
          context.reportError(new GraphQLError("The ".concat(defName, " definition is not executable."), definition));
        }
      }
      return false;
    }
  };
}
function UniqueOperationNamesRule(context) {
  var knownOperationNames = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: function OperationDefinition2(node) {
      var operationName = node.name;
      if (operationName) {
        if (knownOperationNames[operationName.value]) {
          context.reportError(new GraphQLError('There can be only one operation named "'.concat(operationName.value, '".'), [knownOperationNames[operationName.value], operationName]));
        } else {
          knownOperationNames[operationName.value] = operationName;
        }
      }
      return false;
    },
    FragmentDefinition: function FragmentDefinition2() {
      return false;
    }
  };
}
function LoneAnonymousOperationRule(context) {
  var operationCount = 0;
  return {
    Document: function Document3(node) {
      operationCount = node.definitions.filter(function(definition) {
        return definition.kind === Kind.OPERATION_DEFINITION;
      }).length;
    },
    OperationDefinition: function OperationDefinition2(node) {
      if (!node.name && operationCount > 1) {
        context.reportError(new GraphQLError("This anonymous operation must be the only defined operation.", node));
      }
    }
  };
}
function SingleFieldSubscriptionsRule(context) {
  return {
    OperationDefinition: function OperationDefinition2(node) {
      if (node.operation === "subscription") {
        if (node.selectionSet.selections.length !== 1) {
          context.reportError(new GraphQLError(node.name ? 'Subscription "'.concat(node.name.value, '" must select only one top level field.') : "Anonymous Subscription must select only one top level field.", node.selectionSet.selections.slice(1)));
        }
      }
    }
  };
}
function KnownTypeNamesRule(context) {
  var schema = context.getSchema();
  var existingTypesMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  var definedTypes = /* @__PURE__ */ Object.create(null);
  for (var _i2 = 0, _context$getDocument$2 = context.getDocument().definitions; _i2 < _context$getDocument$2.length; _i2++) {
    var def = _context$getDocument$2[_i2];
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = true;
    }
  }
  var typeNames = Object.keys(existingTypesMap).concat(Object.keys(definedTypes));
  return {
    NamedType: function NamedType2(node, _1, parent, _2, ancestors) {
      var typeName = node.name.value;
      if (!existingTypesMap[typeName] && !definedTypes[typeName]) {
        var _ancestors$;
        var definitionNode = (_ancestors$ = ancestors[2]) !== null && _ancestors$ !== void 0 ? _ancestors$ : parent;
        var isSDL = definitionNode != null && isSDLNode(definitionNode);
        if (isSDL && isStandardTypeName(typeName)) {
          return;
        }
        var suggestedTypes = suggestionList(typeName, isSDL ? standardTypeNames.concat(typeNames) : typeNames);
        context.reportError(new GraphQLError('Unknown type "'.concat(typeName, '".') + didYouMean(suggestedTypes), node));
      }
    }
  };
}
var standardTypeNames = [].concat(specifiedScalarTypes, introspectionTypes).map(function(type) {
  return type.name;
});
function isStandardTypeName(typeName) {
  return standardTypeNames.indexOf(typeName) !== -1;
}
function isSDLNode(value) {
  return !Array.isArray(value) && (isTypeSystemDefinitionNode(value) || isTypeSystemExtensionNode(value));
}
function FragmentsOnCompositeTypesRule(context) {
  return {
    InlineFragment: function InlineFragment2(node) {
      var typeCondition = node.typeCondition;
      if (typeCondition) {
        var type = typeFromAST(context.getSchema(), typeCondition);
        if (type && !isCompositeType(type)) {
          var typeStr = print(typeCondition);
          context.reportError(new GraphQLError('Fragment cannot condition on non composite type "'.concat(typeStr, '".'), typeCondition));
        }
      }
    },
    FragmentDefinition: function FragmentDefinition2(node) {
      var type = typeFromAST(context.getSchema(), node.typeCondition);
      if (type && !isCompositeType(type)) {
        var typeStr = print(node.typeCondition);
        context.reportError(new GraphQLError('Fragment "'.concat(node.name.value, '" cannot condition on non composite type "').concat(typeStr, '".'), node.typeCondition));
      }
    }
  };
}
function VariablesAreInputTypesRule(context) {
  return {
    VariableDefinition: function VariableDefinition2(node) {
      var type = typeFromAST(context.getSchema(), node.type);
      if (type && !isInputType(type)) {
        var variableName = node.variable.name.value;
        var typeName = print(node.type);
        context.reportError(new GraphQLError('Variable "$'.concat(variableName, '" cannot be non-input type "').concat(typeName, '".'), node.type));
      }
    }
  };
}
function ScalarLeafsRule(context) {
  return {
    Field: function Field2(node) {
      var type = context.getType();
      var selectionSet = node.selectionSet;
      if (type) {
        if (isLeafType(getNamedType(type))) {
          if (selectionSet) {
            var fieldName = node.name.value;
            var typeStr = inspect(type);
            context.reportError(new GraphQLError('Field "'.concat(fieldName, '" must not have a selection since type "').concat(typeStr, '" has no subfields.'), selectionSet));
          }
        } else if (!selectionSet) {
          var _fieldName = node.name.value;
          var _typeStr = inspect(type);
          context.reportError(new GraphQLError('Field "'.concat(_fieldName, '" of type "').concat(_typeStr, '" must have a selection of subfields. Did you mean "').concat(_fieldName, ' { ... }"?'), node));
        }
      }
    }
  };
}
function FieldsOnCorrectTypeRule(context) {
  return {
    Field: function Field2(node) {
      var type = context.getParentType();
      if (type) {
        var fieldDef = context.getFieldDef();
        if (!fieldDef) {
          var schema = context.getSchema();
          var fieldName = node.name.value;
          var suggestion = didYouMean("to use an inline fragment on", getSuggestedTypeNames(schema, type, fieldName));
          if (suggestion === "") {
            suggestion = didYouMean(getSuggestedFieldNames(type, fieldName));
          }
          context.reportError(new GraphQLError('Cannot query field "'.concat(fieldName, '" on type "').concat(type.name, '".') + suggestion, node));
        }
      }
    }
  };
}
function getSuggestedTypeNames(schema, type, fieldName) {
  if (!isAbstractType(type)) {
    return [];
  }
  var suggestedTypes = /* @__PURE__ */ new Set();
  var usageCount = /* @__PURE__ */ Object.create(null);
  for (var _i2 = 0, _schema$getPossibleTy2 = schema.getPossibleTypes(type); _i2 < _schema$getPossibleTy2.length; _i2++) {
    var possibleType = _schema$getPossibleTy2[_i2];
    if (!possibleType.getFields()[fieldName]) {
      continue;
    }
    suggestedTypes.add(possibleType);
    usageCount[possibleType.name] = 1;
    for (var _i4 = 0, _possibleType$getInte2 = possibleType.getInterfaces(); _i4 < _possibleType$getInte2.length; _i4++) {
      var _usageCount$possibleI;
      var possibleInterface = _possibleType$getInte2[_i4];
      if (!possibleInterface.getFields()[fieldName]) {
        continue;
      }
      suggestedTypes.add(possibleInterface);
      usageCount[possibleInterface.name] = ((_usageCount$possibleI = usageCount[possibleInterface.name]) !== null && _usageCount$possibleI !== void 0 ? _usageCount$possibleI : 0) + 1;
    }
  }
  return arrayFrom$1(suggestedTypes).sort(function(typeA, typeB) {
    var usageCountDiff = usageCount[typeB.name] - usageCount[typeA.name];
    if (usageCountDiff !== 0) {
      return usageCountDiff;
    }
    if (isInterfaceType(typeA) && schema.isSubType(typeA, typeB)) {
      return -1;
    }
    if (isInterfaceType(typeB) && schema.isSubType(typeB, typeA)) {
      return 1;
    }
    return naturalCompare(typeA.name, typeB.name);
  }).map(function(x2) {
    return x2.name;
  });
}
function getSuggestedFieldNames(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type)) {
    var possibleFieldNames = Object.keys(type.getFields());
    return suggestionList(fieldName, possibleFieldNames);
  }
  return [];
}
function UniqueFragmentNamesRule(context) {
  var knownFragmentNames = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: function OperationDefinition2() {
      return false;
    },
    FragmentDefinition: function FragmentDefinition2(node) {
      var fragmentName = node.name.value;
      if (knownFragmentNames[fragmentName]) {
        context.reportError(new GraphQLError('There can be only one fragment named "'.concat(fragmentName, '".'), [knownFragmentNames[fragmentName], node.name]));
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }
      return false;
    }
  };
}
function KnownFragmentNamesRule(context) {
  return {
    FragmentSpread: function FragmentSpread2(node) {
      var fragmentName = node.name.value;
      var fragment = context.getFragment(fragmentName);
      if (!fragment) {
        context.reportError(new GraphQLError('Unknown fragment "'.concat(fragmentName, '".'), node.name));
      }
    }
  };
}
function NoUnusedFragmentsRule(context) {
  var operationDefs = [];
  var fragmentDefs = [];
  return {
    OperationDefinition: function OperationDefinition2(node) {
      operationDefs.push(node);
      return false;
    },
    FragmentDefinition: function FragmentDefinition2(node) {
      fragmentDefs.push(node);
      return false;
    },
    Document: {
      leave: function leave() {
        var fragmentNameUsed = /* @__PURE__ */ Object.create(null);
        for (var _i2 = 0; _i2 < operationDefs.length; _i2++) {
          var operation = operationDefs[_i2];
          for (var _i4 = 0, _context$getRecursive2 = context.getRecursivelyReferencedFragments(operation); _i4 < _context$getRecursive2.length; _i4++) {
            var fragment = _context$getRecursive2[_i4];
            fragmentNameUsed[fragment.name.value] = true;
          }
        }
        for (var _i6 = 0; _i6 < fragmentDefs.length; _i6++) {
          var fragmentDef = fragmentDefs[_i6];
          var fragName = fragmentDef.name.value;
          if (fragmentNameUsed[fragName] !== true) {
            context.reportError(new GraphQLError('Fragment "'.concat(fragName, '" is never used.'), fragmentDef));
          }
        }
      }
    }
  };
}
function PossibleFragmentSpreadsRule(context) {
  return {
    InlineFragment: function InlineFragment2(node) {
      var fragType = context.getType();
      var parentType = context.getParentType();
      if (isCompositeType(fragType) && isCompositeType(parentType) && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
        var parentTypeStr = inspect(parentType);
        var fragTypeStr = inspect(fragType);
        context.reportError(new GraphQLError('Fragment cannot be spread here as objects of type "'.concat(parentTypeStr, '" can never be of type "').concat(fragTypeStr, '".'), node));
      }
    },
    FragmentSpread: function FragmentSpread2(node) {
      var fragName = node.name.value;
      var fragType = getFragmentType(context, fragName);
      var parentType = context.getParentType();
      if (fragType && parentType && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
        var parentTypeStr = inspect(parentType);
        var fragTypeStr = inspect(fragType);
        context.reportError(new GraphQLError('Fragment "'.concat(fragName, '" cannot be spread here as objects of type "').concat(parentTypeStr, '" can never be of type "').concat(fragTypeStr, '".'), node));
      }
    }
  };
}
function getFragmentType(context, name) {
  var frag = context.getFragment(name);
  if (frag) {
    var type = typeFromAST(context.getSchema(), frag.typeCondition);
    if (isCompositeType(type)) {
      return type;
    }
  }
}
function NoFragmentCyclesRule(context) {
  var visitedFrags = /* @__PURE__ */ Object.create(null);
  var spreadPath = [];
  var spreadPathIndexByName = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: function OperationDefinition2() {
      return false;
    },
    FragmentDefinition: function FragmentDefinition2(node) {
      detectCycleRecursive(node);
      return false;
    }
  };
  function detectCycleRecursive(fragment) {
    if (visitedFrags[fragment.name.value]) {
      return;
    }
    var fragmentName = fragment.name.value;
    visitedFrags[fragmentName] = true;
    var spreadNodes = context.getFragmentSpreads(fragment.selectionSet);
    if (spreadNodes.length === 0) {
      return;
    }
    spreadPathIndexByName[fragmentName] = spreadPath.length;
    for (var _i2 = 0; _i2 < spreadNodes.length; _i2++) {
      var spreadNode = spreadNodes[_i2];
      var spreadName = spreadNode.name.value;
      var cycleIndex = spreadPathIndexByName[spreadName];
      spreadPath.push(spreadNode);
      if (cycleIndex === void 0) {
        var spreadFragment = context.getFragment(spreadName);
        if (spreadFragment) {
          detectCycleRecursive(spreadFragment);
        }
      } else {
        var cyclePath = spreadPath.slice(cycleIndex);
        var viaPath = cyclePath.slice(0, -1).map(function(s2) {
          return '"' + s2.name.value + '"';
        }).join(", ");
        context.reportError(new GraphQLError('Cannot spread fragment "'.concat(spreadName, '" within itself') + (viaPath !== "" ? " via ".concat(viaPath, ".") : "."), cyclePath));
      }
      spreadPath.pop();
    }
    spreadPathIndexByName[fragmentName] = void 0;
  }
}
function UniqueVariableNamesRule(context) {
  var knownVariableNames = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: function OperationDefinition2() {
      knownVariableNames = /* @__PURE__ */ Object.create(null);
    },
    VariableDefinition: function VariableDefinition2(node) {
      var variableName = node.variable.name.value;
      if (knownVariableNames[variableName]) {
        context.reportError(new GraphQLError('There can be only one variable named "$'.concat(variableName, '".'), [knownVariableNames[variableName], node.variable.name]));
      } else {
        knownVariableNames[variableName] = node.variable.name;
      }
    }
  };
}
function NoUndefinedVariablesRule(context) {
  var variableNameDefined = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: {
      enter: function enter() {
        variableNameDefined = /* @__PURE__ */ Object.create(null);
      },
      leave: function leave(operation) {
        var usages = context.getRecursiveVariableUsages(operation);
        for (var _i2 = 0; _i2 < usages.length; _i2++) {
          var _ref2 = usages[_i2];
          var node = _ref2.node;
          var varName = node.name.value;
          if (variableNameDefined[varName] !== true) {
            context.reportError(new GraphQLError(operation.name ? 'Variable "$'.concat(varName, '" is not defined by operation "').concat(operation.name.value, '".') : 'Variable "$'.concat(varName, '" is not defined.'), [node, operation]));
          }
        }
      }
    },
    VariableDefinition: function VariableDefinition2(node) {
      variableNameDefined[node.variable.name.value] = true;
    }
  };
}
function NoUnusedVariablesRule(context) {
  var variableDefs = [];
  return {
    OperationDefinition: {
      enter: function enter() {
        variableDefs = [];
      },
      leave: function leave(operation) {
        var variableNameUsed = /* @__PURE__ */ Object.create(null);
        var usages = context.getRecursiveVariableUsages(operation);
        for (var _i2 = 0; _i2 < usages.length; _i2++) {
          var _ref2 = usages[_i2];
          var node = _ref2.node;
          variableNameUsed[node.name.value] = true;
        }
        for (var _i4 = 0, _variableDefs2 = variableDefs; _i4 < _variableDefs2.length; _i4++) {
          var variableDef = _variableDefs2[_i4];
          var variableName = variableDef.variable.name.value;
          if (variableNameUsed[variableName] !== true) {
            context.reportError(new GraphQLError(operation.name ? 'Variable "$'.concat(variableName, '" is never used in operation "').concat(operation.name.value, '".') : 'Variable "$'.concat(variableName, '" is never used.'), variableDef));
          }
        }
      }
    },
    VariableDefinition: function VariableDefinition2(def) {
      variableDefs.push(def);
    }
  };
}
function KnownDirectivesRule(context) {
  var locationsMap = /* @__PURE__ */ Object.create(null);
  var schema = context.getSchema();
  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (var _i2 = 0; _i2 < definedDirectives.length; _i2++) {
    var directive = definedDirectives[_i2];
    locationsMap[directive.name] = directive.locations;
  }
  var astDefinitions = context.getDocument().definitions;
  for (var _i4 = 0; _i4 < astDefinitions.length; _i4++) {
    var def = astDefinitions[_i4];
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      locationsMap[def.name.value] = def.locations.map(function(name) {
        return name.value;
      });
    }
  }
  return {
    Directive: function Directive2(node, _key, _parent, _path, ancestors) {
      var name = node.name.value;
      var locations = locationsMap[name];
      if (!locations) {
        context.reportError(new GraphQLError('Unknown directive "@'.concat(name, '".'), node));
        return;
      }
      var candidateLocation = getDirectiveLocationForASTPath(ancestors);
      if (candidateLocation && locations.indexOf(candidateLocation) === -1) {
        context.reportError(new GraphQLError('Directive "@'.concat(name, '" may not be used on ').concat(candidateLocation, "."), node));
      }
    }
  };
}
function getDirectiveLocationForASTPath(ancestors) {
  var appliedTo = ancestors[ancestors.length - 1];
  !Array.isArray(appliedTo) || invariant(0);
  switch (appliedTo.kind) {
    case Kind.OPERATION_DEFINITION:
      return getDirectiveLocationForOperation(appliedTo.operation);
    case Kind.FIELD:
      return DirectiveLocation.FIELD;
    case Kind.FRAGMENT_SPREAD:
      return DirectiveLocation.FRAGMENT_SPREAD;
    case Kind.INLINE_FRAGMENT:
      return DirectiveLocation.INLINE_FRAGMENT;
    case Kind.FRAGMENT_DEFINITION:
      return DirectiveLocation.FRAGMENT_DEFINITION;
    case Kind.VARIABLE_DEFINITION:
      return DirectiveLocation.VARIABLE_DEFINITION;
    case Kind.SCHEMA_DEFINITION:
    case Kind.SCHEMA_EXTENSION:
      return DirectiveLocation.SCHEMA;
    case Kind.SCALAR_TYPE_DEFINITION:
    case Kind.SCALAR_TYPE_EXTENSION:
      return DirectiveLocation.SCALAR;
    case Kind.OBJECT_TYPE_DEFINITION:
    case Kind.OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.OBJECT;
    case Kind.FIELD_DEFINITION:
      return DirectiveLocation.FIELD_DEFINITION;
    case Kind.INTERFACE_TYPE_DEFINITION:
    case Kind.INTERFACE_TYPE_EXTENSION:
      return DirectiveLocation.INTERFACE;
    case Kind.UNION_TYPE_DEFINITION:
    case Kind.UNION_TYPE_EXTENSION:
      return DirectiveLocation.UNION;
    case Kind.ENUM_TYPE_DEFINITION:
    case Kind.ENUM_TYPE_EXTENSION:
      return DirectiveLocation.ENUM;
    case Kind.ENUM_VALUE_DEFINITION:
      return DirectiveLocation.ENUM_VALUE;
    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.INPUT_OBJECT;
    case Kind.INPUT_VALUE_DEFINITION: {
      var parentNode = ancestors[ancestors.length - 3];
      return parentNode.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION ? DirectiveLocation.INPUT_FIELD_DEFINITION : DirectiveLocation.ARGUMENT_DEFINITION;
    }
  }
}
function getDirectiveLocationForOperation(operation) {
  switch (operation) {
    case "query":
      return DirectiveLocation.QUERY;
    case "mutation":
      return DirectiveLocation.MUTATION;
    case "subscription":
      return DirectiveLocation.SUBSCRIPTION;
  }
  invariant(0, "Unexpected operation: " + inspect(operation));
}
function UniqueDirectivesPerLocationRule(context) {
  var uniqueDirectiveMap = /* @__PURE__ */ Object.create(null);
  var schema = context.getSchema();
  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (var _i2 = 0; _i2 < definedDirectives.length; _i2++) {
    var directive = definedDirectives[_i2];
    uniqueDirectiveMap[directive.name] = !directive.isRepeatable;
  }
  var astDefinitions = context.getDocument().definitions;
  for (var _i4 = 0; _i4 < astDefinitions.length; _i4++) {
    var def = astDefinitions[_i4];
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      uniqueDirectiveMap[def.name.value] = !def.repeatable;
    }
  }
  var schemaDirectives = /* @__PURE__ */ Object.create(null);
  var typeDirectivesMap = /* @__PURE__ */ Object.create(null);
  return {
    enter: function enter(node) {
      if (node.directives == null) {
        return;
      }
      var seenDirectives;
      if (node.kind === Kind.SCHEMA_DEFINITION || node.kind === Kind.SCHEMA_EXTENSION) {
        seenDirectives = schemaDirectives;
      } else if (isTypeDefinitionNode(node) || isTypeExtensionNode(node)) {
        var typeName = node.name.value;
        seenDirectives = typeDirectivesMap[typeName];
        if (seenDirectives === void 0) {
          typeDirectivesMap[typeName] = seenDirectives = /* @__PURE__ */ Object.create(null);
        }
      } else {
        seenDirectives = /* @__PURE__ */ Object.create(null);
      }
      for (var _i6 = 0, _node$directives2 = node.directives; _i6 < _node$directives2.length; _i6++) {
        var _directive = _node$directives2[_i6];
        var directiveName = _directive.name.value;
        if (uniqueDirectiveMap[directiveName]) {
          if (seenDirectives[directiveName]) {
            context.reportError(new GraphQLError('The directive "@'.concat(directiveName, '" can only be used once at this location.'), [seenDirectives[directiveName], _directive]));
          } else {
            seenDirectives[directiveName] = _directive;
          }
        }
      }
    }
  };
}
function ownKeys$6(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$6(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$6(Object(source), true).forEach(function(key) {
        _defineProperty$8(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$6(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$8(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function KnownArgumentNamesRule(context) {
  return _objectSpread$6(_objectSpread$6({}, KnownArgumentNamesOnDirectivesRule(context)), {}, {
    Argument: function Argument2(argNode) {
      var argDef = context.getArgument();
      var fieldDef = context.getFieldDef();
      var parentType = context.getParentType();
      if (!argDef && fieldDef && parentType) {
        var argName = argNode.name.value;
        var knownArgsNames = fieldDef.args.map(function(arg) {
          return arg.name;
        });
        var suggestions = suggestionList(argName, knownArgsNames);
        context.reportError(new GraphQLError('Unknown argument "'.concat(argName, '" on field "').concat(parentType.name, ".").concat(fieldDef.name, '".') + didYouMean(suggestions), argNode));
      }
    }
  });
}
function KnownArgumentNamesOnDirectivesRule(context) {
  var directiveArgs = /* @__PURE__ */ Object.create(null);
  var schema = context.getSchema();
  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (var _i2 = 0; _i2 < definedDirectives.length; _i2++) {
    var directive = definedDirectives[_i2];
    directiveArgs[directive.name] = directive.args.map(function(arg) {
      return arg.name;
    });
  }
  var astDefinitions = context.getDocument().definitions;
  for (var _i4 = 0; _i4 < astDefinitions.length; _i4++) {
    var def = astDefinitions[_i4];
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      var argsNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      directiveArgs[def.name.value] = argsNodes.map(function(arg) {
        return arg.name.value;
      });
    }
  }
  return {
    Directive: function Directive2(directiveNode) {
      var directiveName = directiveNode.name.value;
      var knownArgs = directiveArgs[directiveName];
      if (directiveNode.arguments && knownArgs) {
        for (var _i6 = 0, _directiveNode$argume2 = directiveNode.arguments; _i6 < _directiveNode$argume2.length; _i6++) {
          var argNode = _directiveNode$argume2[_i6];
          var argName = argNode.name.value;
          if (knownArgs.indexOf(argName) === -1) {
            var suggestions = suggestionList(argName, knownArgs);
            context.reportError(new GraphQLError('Unknown argument "'.concat(argName, '" on directive "@').concat(directiveName, '".') + didYouMean(suggestions), argNode));
          }
        }
      }
      return false;
    }
  };
}
function UniqueArgumentNamesRule(context) {
  var knownArgNames = /* @__PURE__ */ Object.create(null);
  return {
    Field: function Field2() {
      knownArgNames = /* @__PURE__ */ Object.create(null);
    },
    Directive: function Directive2() {
      knownArgNames = /* @__PURE__ */ Object.create(null);
    },
    Argument: function Argument2(node) {
      var argName = node.name.value;
      if (knownArgNames[argName]) {
        context.reportError(new GraphQLError('There can be only one argument named "'.concat(argName, '".'), [knownArgNames[argName], node.name]));
      } else {
        knownArgNames[argName] = node.name;
      }
      return false;
    }
  };
}
function ValuesOfCorrectTypeRule(context) {
  return {
    ListValue: function ListValue2(node) {
      var type = getNullableType(context.getParentInputType());
      if (!isListType(type)) {
        isValidValueNode(context, node);
        return false;
      }
    },
    ObjectValue: function ObjectValue2(node) {
      var type = getNamedType(context.getInputType());
      if (!isInputObjectType(type)) {
        isValidValueNode(context, node);
        return false;
      }
      var fieldNodeMap = keyMap(node.fields, function(field) {
        return field.name.value;
      });
      for (var _i2 = 0, _objectValues2 = objectValues$1(type.getFields()); _i2 < _objectValues2.length; _i2++) {
        var fieldDef = _objectValues2[_i2];
        var fieldNode = fieldNodeMap[fieldDef.name];
        if (!fieldNode && isRequiredInputField(fieldDef)) {
          var typeStr = inspect(fieldDef.type);
          context.reportError(new GraphQLError('Field "'.concat(type.name, ".").concat(fieldDef.name, '" of required type "').concat(typeStr, '" was not provided.'), node));
        }
      }
    },
    ObjectField: function ObjectField2(node) {
      var parentType = getNamedType(context.getParentInputType());
      var fieldType = context.getInputType();
      if (!fieldType && isInputObjectType(parentType)) {
        var suggestions = suggestionList(node.name.value, Object.keys(parentType.getFields()));
        context.reportError(new GraphQLError('Field "'.concat(node.name.value, '" is not defined by type "').concat(parentType.name, '".') + didYouMean(suggestions), node));
      }
    },
    NullValue: function NullValue2(node) {
      var type = context.getInputType();
      if (isNonNullType(type)) {
        context.reportError(new GraphQLError('Expected value of type "'.concat(inspect(type), '", found ').concat(print(node), "."), node));
      }
    },
    EnumValue: function EnumValue2(node) {
      return isValidValueNode(context, node);
    },
    IntValue: function IntValue2(node) {
      return isValidValueNode(context, node);
    },
    FloatValue: function FloatValue2(node) {
      return isValidValueNode(context, node);
    },
    StringValue: function StringValue2(node) {
      return isValidValueNode(context, node);
    },
    BooleanValue: function BooleanValue2(node) {
      return isValidValueNode(context, node);
    }
  };
}
function isValidValueNode(context, node) {
  var locationType = context.getInputType();
  if (!locationType) {
    return;
  }
  var type = getNamedType(locationType);
  if (!isLeafType(type)) {
    var typeStr = inspect(locationType);
    context.reportError(new GraphQLError('Expected value of type "'.concat(typeStr, '", found ').concat(print(node), "."), node));
    return;
  }
  try {
    var parseResult = type.parseLiteral(
      node,
      void 0
    );
    if (parseResult === void 0) {
      var _typeStr = inspect(locationType);
      context.reportError(new GraphQLError('Expected value of type "'.concat(_typeStr, '", found ').concat(print(node), "."), node));
    }
  } catch (error) {
    var _typeStr2 = inspect(locationType);
    if (error instanceof GraphQLError) {
      context.reportError(error);
    } else {
      context.reportError(new GraphQLError('Expected value of type "'.concat(_typeStr2, '", found ').concat(print(node), "; ") + error.message, node, void 0, void 0, void 0, error));
    }
  }
}
function ownKeys$5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$5(Object(source), true).forEach(function(key) {
        _defineProperty$7(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$5(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$7(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ProvidedRequiredArgumentsRule(context) {
  return _objectSpread$5(_objectSpread$5({}, ProvidedRequiredArgumentsOnDirectivesRule(context)), {}, {
    Field: {
      leave: function leave(fieldNode) {
        var _fieldNode$arguments;
        var fieldDef = context.getFieldDef();
        if (!fieldDef) {
          return false;
        }
        var argNodes = (_fieldNode$arguments = fieldNode.arguments) !== null && _fieldNode$arguments !== void 0 ? _fieldNode$arguments : [];
        var argNodeMap = keyMap(argNodes, function(arg) {
          return arg.name.value;
        });
        for (var _i2 = 0, _fieldDef$args2 = fieldDef.args; _i2 < _fieldDef$args2.length; _i2++) {
          var argDef = _fieldDef$args2[_i2];
          var argNode = argNodeMap[argDef.name];
          if (!argNode && isRequiredArgument(argDef)) {
            var argTypeStr = inspect(argDef.type);
            context.reportError(new GraphQLError('Field "'.concat(fieldDef.name, '" argument "').concat(argDef.name, '" of type "').concat(argTypeStr, '" is required, but it was not provided.'), fieldNode));
          }
        }
      }
    }
  });
}
function ProvidedRequiredArgumentsOnDirectivesRule(context) {
  var requiredArgsMap = /* @__PURE__ */ Object.create(null);
  var schema = context.getSchema();
  var definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (var _i4 = 0; _i4 < definedDirectives.length; _i4++) {
    var directive = definedDirectives[_i4];
    requiredArgsMap[directive.name] = keyMap(directive.args.filter(isRequiredArgument), function(arg) {
      return arg.name;
    });
  }
  var astDefinitions = context.getDocument().definitions;
  for (var _i6 = 0; _i6 < astDefinitions.length; _i6++) {
    var def = astDefinitions[_i6];
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      var argNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      requiredArgsMap[def.name.value] = keyMap(argNodes.filter(isRequiredArgumentNode), function(arg) {
        return arg.name.value;
      });
    }
  }
  return {
    Directive: {
      leave: function leave(directiveNode) {
        var directiveName = directiveNode.name.value;
        var requiredArgs = requiredArgsMap[directiveName];
        if (requiredArgs) {
          var _directiveNode$argume;
          var _argNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== void 0 ? _directiveNode$argume : [];
          var argNodeMap = keyMap(_argNodes, function(arg) {
            return arg.name.value;
          });
          for (var _i8 = 0, _Object$keys2 = Object.keys(requiredArgs); _i8 < _Object$keys2.length; _i8++) {
            var argName = _Object$keys2[_i8];
            if (!argNodeMap[argName]) {
              var argType = requiredArgs[argName].type;
              var argTypeStr = isType(argType) ? inspect(argType) : print(argType);
              context.reportError(new GraphQLError('Directive "@'.concat(directiveName, '" argument "').concat(argName, '" of type "').concat(argTypeStr, '" is required, but it was not provided.'), directiveNode));
            }
          }
        }
      }
    }
  };
}
function isRequiredArgumentNode(arg) {
  return arg.type.kind === Kind.NON_NULL_TYPE && arg.defaultValue == null;
}
function VariablesInAllowedPositionRule(context) {
  var varDefMap = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: {
      enter: function enter() {
        varDefMap = /* @__PURE__ */ Object.create(null);
      },
      leave: function leave(operation) {
        var usages = context.getRecursiveVariableUsages(operation);
        for (var _i2 = 0; _i2 < usages.length; _i2++) {
          var _ref2 = usages[_i2];
          var node = _ref2.node;
          var type = _ref2.type;
          var defaultValue = _ref2.defaultValue;
          var varName = node.name.value;
          var varDef = varDefMap[varName];
          if (varDef && type) {
            var schema = context.getSchema();
            var varType = typeFromAST(schema, varDef.type);
            if (varType && !allowedVariableUsage(schema, varType, varDef.defaultValue, type, defaultValue)) {
              var varTypeStr = inspect(varType);
              var typeStr = inspect(type);
              context.reportError(new GraphQLError('Variable "$'.concat(varName, '" of type "').concat(varTypeStr, '" used in position expecting type "').concat(typeStr, '".'), [varDef, node]));
            }
          }
        }
      }
    },
    VariableDefinition: function VariableDefinition2(node) {
      varDefMap[node.variable.name.value] = node;
    }
  };
}
function allowedVariableUsage(schema, varType, varDefaultValue, locationType, locationDefaultValue) {
  if (isNonNullType(locationType) && !isNonNullType(varType)) {
    var hasNonNullVariableDefaultValue = varDefaultValue != null && varDefaultValue.kind !== Kind.NULL;
    var hasLocationDefaultValue = locationDefaultValue !== void 0;
    if (!hasNonNullVariableDefaultValue && !hasLocationDefaultValue) {
      return false;
    }
    var nullableLocationType = locationType.ofType;
    return isTypeSubTypeOf(schema, varType, nullableLocationType);
  }
  return isTypeSubTypeOf(schema, varType, locationType);
}
function reasonMessage(reason) {
  if (Array.isArray(reason)) {
    return reason.map(function(_ref) {
      var responseName = _ref[0], subReason = _ref[1];
      return 'subfields "'.concat(responseName, '" conflict because ') + reasonMessage(subReason);
    }).join(" and ");
  }
  return reason;
}
function OverlappingFieldsCanBeMergedRule(context) {
  var comparedFragmentPairs = new PairSet();
  var cachedFieldsAndFragmentNames = /* @__PURE__ */ new Map();
  return {
    SelectionSet: function SelectionSet2(selectionSet) {
      var conflicts = findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, context.getParentType(), selectionSet);
      for (var _i2 = 0; _i2 < conflicts.length; _i2++) {
        var _ref3 = conflicts[_i2];
        var _ref2$ = _ref3[0];
        var responseName = _ref2$[0];
        var reason = _ref2$[1];
        var fields1 = _ref3[1];
        var fields22 = _ref3[2];
        var reasonMsg = reasonMessage(reason);
        context.reportError(new GraphQLError('Fields "'.concat(responseName, '" conflict because ').concat(reasonMsg, ". Use different aliases on the fields to fetch both if this was intentional."), fields1.concat(fields22)));
      }
    }
  };
}
function findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentType, selectionSet) {
  var conflicts = [];
  var _getFieldsAndFragment = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet), fieldMap = _getFieldsAndFragment[0], fragmentNames = _getFieldsAndFragment[1];
  collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, fieldMap);
  if (fragmentNames.length !== 0) {
    for (var i = 0; i < fragmentNames.length; i++) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, false, fieldMap, fragmentNames[i]);
      for (var j = i + 1; j < fragmentNames.length; j++) {
        collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, false, fragmentNames[i], fragmentNames[j]);
      }
    }
  }
  return conflicts;
}
function collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentName) {
  var fragment = context.getFragment(fragmentName);
  if (!fragment) {
    return;
  }
  var _getReferencedFieldsA = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment), fieldMap2 = _getReferencedFieldsA[0], fragmentNames2 = _getReferencedFieldsA[1];
  if (fieldMap === fieldMap2) {
    return;
  }
  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fieldMap2);
  for (var i = 0; i < fragmentNames2.length; i++) {
    collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentNames2[i]);
  }
}
function collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentName2) {
  if (fragmentName1 === fragmentName2) {
    return;
  }
  if (comparedFragmentPairs.has(fragmentName1, fragmentName2, areMutuallyExclusive)) {
    return;
  }
  comparedFragmentPairs.add(fragmentName1, fragmentName2, areMutuallyExclusive);
  var fragment1 = context.getFragment(fragmentName1);
  var fragment2 = context.getFragment(fragmentName2);
  if (!fragment1 || !fragment2) {
    return;
  }
  var _getReferencedFieldsA2 = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment1), fieldMap1 = _getReferencedFieldsA2[0], fragmentNames1 = _getReferencedFieldsA2[1];
  var _getReferencedFieldsA3 = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment2), fieldMap2 = _getReferencedFieldsA3[0], fragmentNames2 = _getReferencedFieldsA3[1];
  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fieldMap2);
  for (var j = 0; j < fragmentNames2.length; j++) {
    collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentNames2[j]);
  }
  for (var i = 0; i < fragmentNames1.length; i++) {
    collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentNames1[i], fragmentName2);
  }
}
function findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, parentType1, selectionSet1, parentType2, selectionSet2) {
  var conflicts = [];
  var _getFieldsAndFragment2 = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType1, selectionSet1), fieldMap1 = _getFieldsAndFragment2[0], fragmentNames1 = _getFieldsAndFragment2[1];
  var _getFieldsAndFragment3 = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType2, selectionSet2), fieldMap2 = _getFieldsAndFragment3[0], fragmentNames2 = _getFieldsAndFragment3[1];
  collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fieldMap2);
  if (fragmentNames2.length !== 0) {
    for (var j = 0; j < fragmentNames2.length; j++) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fragmentNames2[j]);
    }
  }
  if (fragmentNames1.length !== 0) {
    for (var i = 0; i < fragmentNames1.length; i++) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap2, fragmentNames1[i]);
    }
  }
  for (var _i3 = 0; _i3 < fragmentNames1.length; _i3++) {
    for (var _j = 0; _j < fragmentNames2.length; _j++) {
      collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentNames1[_i3], fragmentNames2[_j]);
    }
  }
  return conflicts;
}
function collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, fieldMap) {
  for (var _i5 = 0, _objectEntries2 = objectEntries$1(fieldMap); _i5 < _objectEntries2.length; _i5++) {
    var _ref5 = _objectEntries2[_i5];
    var responseName = _ref5[0];
    var fields7 = _ref5[1];
    if (fields7.length > 1) {
      for (var i = 0; i < fields7.length; i++) {
        for (var j = i + 1; j < fields7.length; j++) {
          var conflict = findConflict(
            context,
            cachedFieldsAndFragmentNames,
            comparedFragmentPairs,
            false,
            responseName,
            fields7[i],
            fields7[j]
          );
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, fieldMap1, fieldMap2) {
  for (var _i7 = 0, _Object$keys2 = Object.keys(fieldMap1); _i7 < _Object$keys2.length; _i7++) {
    var responseName = _Object$keys2[_i7];
    var fields22 = fieldMap2[responseName];
    if (fields22) {
      var fields1 = fieldMap1[responseName];
      for (var i = 0; i < fields1.length; i++) {
        for (var j = 0; j < fields22.length; j++) {
          var conflict = findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, fields1[i], fields22[j]);
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, field1, field2) {
  var parentType1 = field1[0], node1 = field1[1], def1 = field1[2];
  var parentType2 = field2[0], node2 = field2[1], def2 = field2[2];
  var areMutuallyExclusive = parentFieldsAreMutuallyExclusive || parentType1 !== parentType2 && isObjectType(parentType1) && isObjectType(parentType2);
  if (!areMutuallyExclusive) {
    var _node1$arguments, _node2$arguments;
    var name1 = node1.name.value;
    var name2 = node2.name.value;
    if (name1 !== name2) {
      return [[responseName, '"'.concat(name1, '" and "').concat(name2, '" are different fields')], [node1], [node2]];
    }
    var args1 = (_node1$arguments = node1.arguments) !== null && _node1$arguments !== void 0 ? _node1$arguments : [];
    var args2 = (_node2$arguments = node2.arguments) !== null && _node2$arguments !== void 0 ? _node2$arguments : [];
    if (!sameArguments(args1, args2)) {
      return [[responseName, "they have differing arguments"], [node1], [node2]];
    }
  }
  var type1 = def1 === null || def1 === void 0 ? void 0 : def1.type;
  var type2 = def2 === null || def2 === void 0 ? void 0 : def2.type;
  if (type1 && type2 && doTypesConflict(type1, type2)) {
    return [[responseName, 'they return conflicting types "'.concat(inspect(type1), '" and "').concat(inspect(type2), '"')], [node1], [node2]];
  }
  var selectionSet1 = node1.selectionSet;
  var selectionSet2 = node2.selectionSet;
  if (selectionSet1 && selectionSet2) {
    var conflicts = findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, getNamedType(type1), selectionSet1, getNamedType(type2), selectionSet2);
    return subfieldConflicts(conflicts, responseName, node1, node2);
  }
}
function sameArguments(arguments1, arguments2) {
  if (arguments1.length !== arguments2.length) {
    return false;
  }
  return arguments1.every(function(argument1) {
    var argument2 = find$1(arguments2, function(argument) {
      return argument.name.value === argument1.name.value;
    });
    if (!argument2) {
      return false;
    }
    return sameValue(argument1.value, argument2.value);
  });
}
function sameValue(value1, value2) {
  return print(value1) === print(value2);
}
function doTypesConflict(type1, type2) {
  if (isListType(type1)) {
    return isListType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isListType(type2)) {
    return true;
  }
  if (isNonNullType(type1)) {
    return isNonNullType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isNonNullType(type2)) {
    return true;
  }
  if (isLeafType(type1) || isLeafType(type2)) {
    return type1 !== type2;
  }
  return false;
}
function getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet) {
  var cached = cachedFieldsAndFragmentNames.get(selectionSet);
  if (!cached) {
    var nodeAndDefs = /* @__PURE__ */ Object.create(null);
    var fragmentNames = /* @__PURE__ */ Object.create(null);
    _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames);
    cached = [nodeAndDefs, Object.keys(fragmentNames)];
    cachedFieldsAndFragmentNames.set(selectionSet, cached);
  }
  return cached;
}
function getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment) {
  var cached = cachedFieldsAndFragmentNames.get(fragment.selectionSet);
  if (cached) {
    return cached;
  }
  var fragmentType = typeFromAST(context.getSchema(), fragment.typeCondition);
  return getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragmentType, fragment.selectionSet);
}
function _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames) {
  for (var _i9 = 0, _selectionSet$selecti2 = selectionSet.selections; _i9 < _selectionSet$selecti2.length; _i9++) {
    var selection = _selectionSet$selecti2[_i9];
    switch (selection.kind) {
      case Kind.FIELD: {
        var fieldName = selection.name.value;
        var fieldDef = void 0;
        if (isObjectType(parentType) || isInterfaceType(parentType)) {
          fieldDef = parentType.getFields()[fieldName];
        }
        var responseName = selection.alias ? selection.alias.value : fieldName;
        if (!nodeAndDefs[responseName]) {
          nodeAndDefs[responseName] = [];
        }
        nodeAndDefs[responseName].push([parentType, selection, fieldDef]);
        break;
      }
      case Kind.FRAGMENT_SPREAD:
        fragmentNames[selection.name.value] = true;
        break;
      case Kind.INLINE_FRAGMENT: {
        var typeCondition = selection.typeCondition;
        var inlineFragmentType = typeCondition ? typeFromAST(context.getSchema(), typeCondition) : parentType;
        _collectFieldsAndFragmentNames(context, inlineFragmentType, selection.selectionSet, nodeAndDefs, fragmentNames);
        break;
      }
    }
  }
}
function subfieldConflicts(conflicts, responseName, node1, node2) {
  if (conflicts.length > 0) {
    return [[responseName, conflicts.map(function(_ref6) {
      var reason = _ref6[0];
      return reason;
    })], conflicts.reduce(function(allFields, _ref7) {
      var fields1 = _ref7[1];
      return allFields.concat(fields1);
    }, [node1]), conflicts.reduce(function(allFields, _ref8) {
      var fields22 = _ref8[2];
      return allFields.concat(fields22);
    }, [node2])];
  }
}
var PairSet = /* @__PURE__ */ function() {
  function PairSet2() {
    this._data = /* @__PURE__ */ Object.create(null);
  }
  var _proto = PairSet2.prototype;
  _proto.has = function has(a2, b2, areMutuallyExclusive) {
    var first = this._data[a2];
    var result = first && first[b2];
    if (result === void 0) {
      return false;
    }
    if (areMutuallyExclusive === false) {
      return result === false;
    }
    return true;
  };
  _proto.add = function add(a2, b2, areMutuallyExclusive) {
    this._pairSetAdd(a2, b2, areMutuallyExclusive);
    this._pairSetAdd(b2, a2, areMutuallyExclusive);
  };
  _proto._pairSetAdd = function _pairSetAdd(a2, b2, areMutuallyExclusive) {
    var map = this._data[a2];
    if (!map) {
      map = /* @__PURE__ */ Object.create(null);
      this._data[a2] = map;
    }
    map[b2] = areMutuallyExclusive;
  };
  return PairSet2;
}();
function UniqueInputFieldNamesRule(context) {
  var knownNameStack = [];
  var knownNames = /* @__PURE__ */ Object.create(null);
  return {
    ObjectValue: {
      enter: function enter() {
        knownNameStack.push(knownNames);
        knownNames = /* @__PURE__ */ Object.create(null);
      },
      leave: function leave() {
        knownNames = knownNameStack.pop();
      }
    },
    ObjectField: function ObjectField2(node) {
      var fieldName = node.name.value;
      if (knownNames[fieldName]) {
        context.reportError(new GraphQLError('There can be only one input field named "'.concat(fieldName, '".'), [knownNames[fieldName], node.name]));
      } else {
        knownNames[fieldName] = node.name;
      }
    }
  };
}
function LoneSchemaDefinitionRule(context) {
  var _ref, _ref2, _oldSchema$astNode;
  var oldSchema = context.getSchema();
  var alreadyDefined = (_ref = (_ref2 = (_oldSchema$astNode = oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.astNode) !== null && _oldSchema$astNode !== void 0 ? _oldSchema$astNode : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getQueryType()) !== null && _ref2 !== void 0 ? _ref2 : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getMutationType()) !== null && _ref !== void 0 ? _ref : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getSubscriptionType();
  var schemaDefinitionsCount = 0;
  return {
    SchemaDefinition: function SchemaDefinition(node) {
      if (alreadyDefined) {
        context.reportError(new GraphQLError("Cannot define a new schema within a schema extension.", node));
        return;
      }
      if (schemaDefinitionsCount > 0) {
        context.reportError(new GraphQLError("Must provide only one schema definition.", node));
      }
      ++schemaDefinitionsCount;
    }
  };
}
function UniqueOperationTypesRule(context) {
  var schema = context.getSchema();
  var definedOperationTypes = /* @__PURE__ */ Object.create(null);
  var existingOperationTypes = schema ? {
    query: schema.getQueryType(),
    mutation: schema.getMutationType(),
    subscription: schema.getSubscriptionType()
  } : {};
  return {
    SchemaDefinition: checkOperationTypes,
    SchemaExtension: checkOperationTypes
  };
  function checkOperationTypes(node) {
    var _node$operationTypes;
    var operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : [];
    for (var _i2 = 0; _i2 < operationTypesNodes.length; _i2++) {
      var operationType = operationTypesNodes[_i2];
      var operation = operationType.operation;
      var alreadyDefinedOperationType = definedOperationTypes[operation];
      if (existingOperationTypes[operation]) {
        context.reportError(new GraphQLError("Type for ".concat(operation, " already defined in the schema. It cannot be redefined."), operationType));
      } else if (alreadyDefinedOperationType) {
        context.reportError(new GraphQLError("There can be only one ".concat(operation, " type in schema."), [alreadyDefinedOperationType, operationType]));
      } else {
        definedOperationTypes[operation] = operationType;
      }
    }
    return false;
  }
}
function UniqueTypeNamesRule(context) {
  var knownTypeNames = /* @__PURE__ */ Object.create(null);
  var schema = context.getSchema();
  return {
    ScalarTypeDefinition: checkTypeName,
    ObjectTypeDefinition: checkTypeName,
    InterfaceTypeDefinition: checkTypeName,
    UnionTypeDefinition: checkTypeName,
    EnumTypeDefinition: checkTypeName,
    InputObjectTypeDefinition: checkTypeName
  };
  function checkTypeName(node) {
    var typeName = node.name.value;
    if (schema !== null && schema !== void 0 && schema.getType(typeName)) {
      context.reportError(new GraphQLError('Type "'.concat(typeName, '" already exists in the schema. It cannot also be defined in this type definition.'), node.name));
      return;
    }
    if (knownTypeNames[typeName]) {
      context.reportError(new GraphQLError('There can be only one type named "'.concat(typeName, '".'), [knownTypeNames[typeName], node.name]));
    } else {
      knownTypeNames[typeName] = node.name;
    }
    return false;
  }
}
function UniqueEnumValueNamesRule(context) {
  var schema = context.getSchema();
  var existingTypeMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  var knownValueNames = /* @__PURE__ */ Object.create(null);
  return {
    EnumTypeDefinition: checkValueUniqueness,
    EnumTypeExtension: checkValueUniqueness
  };
  function checkValueUniqueness(node) {
    var _node$values;
    var typeName = node.name.value;
    if (!knownValueNames[typeName]) {
      knownValueNames[typeName] = /* @__PURE__ */ Object.create(null);
    }
    var valueNodes = (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : [];
    var valueNames = knownValueNames[typeName];
    for (var _i2 = 0; _i2 < valueNodes.length; _i2++) {
      var valueDef = valueNodes[_i2];
      var valueName = valueDef.name.value;
      var existingType = existingTypeMap[typeName];
      if (isEnumType(existingType) && existingType.getValue(valueName)) {
        context.reportError(new GraphQLError('Enum value "'.concat(typeName, ".").concat(valueName, '" already exists in the schema. It cannot also be defined in this type extension.'), valueDef.name));
      } else if (valueNames[valueName]) {
        context.reportError(new GraphQLError('Enum value "'.concat(typeName, ".").concat(valueName, '" can only be defined once.'), [valueNames[valueName], valueDef.name]));
      } else {
        valueNames[valueName] = valueDef.name;
      }
    }
    return false;
  }
}
function UniqueFieldDefinitionNamesRule(context) {
  var schema = context.getSchema();
  var existingTypeMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  var knownFieldNames = /* @__PURE__ */ Object.create(null);
  return {
    InputObjectTypeDefinition: checkFieldUniqueness,
    InputObjectTypeExtension: checkFieldUniqueness,
    InterfaceTypeDefinition: checkFieldUniqueness,
    InterfaceTypeExtension: checkFieldUniqueness,
    ObjectTypeDefinition: checkFieldUniqueness,
    ObjectTypeExtension: checkFieldUniqueness
  };
  function checkFieldUniqueness(node) {
    var _node$fields;
    var typeName = node.name.value;
    if (!knownFieldNames[typeName]) {
      knownFieldNames[typeName] = /* @__PURE__ */ Object.create(null);
    }
    var fieldNodes = (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : [];
    var fieldNames = knownFieldNames[typeName];
    for (var _i2 = 0; _i2 < fieldNodes.length; _i2++) {
      var fieldDef = fieldNodes[_i2];
      var fieldName = fieldDef.name.value;
      if (hasField(existingTypeMap[typeName], fieldName)) {
        context.reportError(new GraphQLError('Field "'.concat(typeName, ".").concat(fieldName, '" already exists in the schema. It cannot also be defined in this type extension.'), fieldDef.name));
      } else if (fieldNames[fieldName]) {
        context.reportError(new GraphQLError('Field "'.concat(typeName, ".").concat(fieldName, '" can only be defined once.'), [fieldNames[fieldName], fieldDef.name]));
      } else {
        fieldNames[fieldName] = fieldDef.name;
      }
    }
    return false;
  }
}
function hasField(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
    return type.getFields()[fieldName] != null;
  }
  return false;
}
function UniqueDirectiveNamesRule(context) {
  var knownDirectiveNames = /* @__PURE__ */ Object.create(null);
  var schema = context.getSchema();
  return {
    DirectiveDefinition: function DirectiveDefinition(node) {
      var directiveName = node.name.value;
      if (schema !== null && schema !== void 0 && schema.getDirective(directiveName)) {
        context.reportError(new GraphQLError('Directive "@'.concat(directiveName, '" already exists in the schema. It cannot be redefined.'), node.name));
        return;
      }
      if (knownDirectiveNames[directiveName]) {
        context.reportError(new GraphQLError('There can be only one directive named "@'.concat(directiveName, '".'), [knownDirectiveNames[directiveName], node.name]));
      } else {
        knownDirectiveNames[directiveName] = node.name;
      }
      return false;
    }
  };
}
var _defKindToExtKind;
function _defineProperty$6(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function PossibleTypeExtensionsRule(context) {
  var schema = context.getSchema();
  var definedTypes = /* @__PURE__ */ Object.create(null);
  for (var _i2 = 0, _context$getDocument$2 = context.getDocument().definitions; _i2 < _context$getDocument$2.length; _i2++) {
    var def = _context$getDocument$2[_i2];
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = def;
    }
  }
  return {
    ScalarTypeExtension: checkExtension,
    ObjectTypeExtension: checkExtension,
    InterfaceTypeExtension: checkExtension,
    UnionTypeExtension: checkExtension,
    EnumTypeExtension: checkExtension,
    InputObjectTypeExtension: checkExtension
  };
  function checkExtension(node) {
    var typeName = node.name.value;
    var defNode = definedTypes[typeName];
    var existingType = schema === null || schema === void 0 ? void 0 : schema.getType(typeName);
    var expectedKind;
    if (defNode) {
      expectedKind = defKindToExtKind[defNode.kind];
    } else if (existingType) {
      expectedKind = typeToExtKind(existingType);
    }
    if (expectedKind) {
      if (expectedKind !== node.kind) {
        var kindStr = extensionKindToTypeName(node.kind);
        context.reportError(new GraphQLError("Cannot extend non-".concat(kindStr, ' type "').concat(typeName, '".'), defNode ? [defNode, node] : node));
      }
    } else {
      var allTypeNames = Object.keys(definedTypes);
      if (schema) {
        allTypeNames = allTypeNames.concat(Object.keys(schema.getTypeMap()));
      }
      var suggestedTypes = suggestionList(typeName, allTypeNames);
      context.reportError(new GraphQLError('Cannot extend type "'.concat(typeName, '" because it is not defined.') + didYouMean(suggestedTypes), node.name));
    }
  }
}
var defKindToExtKind = (_defKindToExtKind = {}, _defineProperty$6(_defKindToExtKind, Kind.SCALAR_TYPE_DEFINITION, Kind.SCALAR_TYPE_EXTENSION), _defineProperty$6(_defKindToExtKind, Kind.OBJECT_TYPE_DEFINITION, Kind.OBJECT_TYPE_EXTENSION), _defineProperty$6(_defKindToExtKind, Kind.INTERFACE_TYPE_DEFINITION, Kind.INTERFACE_TYPE_EXTENSION), _defineProperty$6(_defKindToExtKind, Kind.UNION_TYPE_DEFINITION, Kind.UNION_TYPE_EXTENSION), _defineProperty$6(_defKindToExtKind, Kind.ENUM_TYPE_DEFINITION, Kind.ENUM_TYPE_EXTENSION), _defineProperty$6(_defKindToExtKind, Kind.INPUT_OBJECT_TYPE_DEFINITION, Kind.INPUT_OBJECT_TYPE_EXTENSION), _defKindToExtKind);
function typeToExtKind(type) {
  if (isScalarType(type)) {
    return Kind.SCALAR_TYPE_EXTENSION;
  }
  if (isObjectType(type)) {
    return Kind.OBJECT_TYPE_EXTENSION;
  }
  if (isInterfaceType(type)) {
    return Kind.INTERFACE_TYPE_EXTENSION;
  }
  if (isUnionType(type)) {
    return Kind.UNION_TYPE_EXTENSION;
  }
  if (isEnumType(type)) {
    return Kind.ENUM_TYPE_EXTENSION;
  }
  if (isInputObjectType(type)) {
    return Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
  invariant(0, "Unexpected type: " + inspect(type));
}
function extensionKindToTypeName(kind) {
  switch (kind) {
    case Kind.SCALAR_TYPE_EXTENSION:
      return "scalar";
    case Kind.OBJECT_TYPE_EXTENSION:
      return "object";
    case Kind.INTERFACE_TYPE_EXTENSION:
      return "interface";
    case Kind.UNION_TYPE_EXTENSION:
      return "union";
    case Kind.ENUM_TYPE_EXTENSION:
      return "enum";
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return "input object";
  }
  invariant(0, "Unexpected kind: " + inspect(kind));
}
var specifiedRules = Object.freeze([ExecutableDefinitionsRule, UniqueOperationNamesRule, LoneAnonymousOperationRule, SingleFieldSubscriptionsRule, KnownTypeNamesRule, FragmentsOnCompositeTypesRule, VariablesAreInputTypesRule, ScalarLeafsRule, FieldsOnCorrectTypeRule, UniqueFragmentNamesRule, KnownFragmentNamesRule, NoUnusedFragmentsRule, PossibleFragmentSpreadsRule, NoFragmentCyclesRule, UniqueVariableNamesRule, NoUndefinedVariablesRule, NoUnusedVariablesRule, KnownDirectivesRule, UniqueDirectivesPerLocationRule, KnownArgumentNamesRule, UniqueArgumentNamesRule, ValuesOfCorrectTypeRule, ProvidedRequiredArgumentsRule, VariablesInAllowedPositionRule, OverlappingFieldsCanBeMergedRule, UniqueInputFieldNamesRule]);
var specifiedSDLRules = Object.freeze([LoneSchemaDefinitionRule, UniqueOperationTypesRule, UniqueTypeNamesRule, UniqueEnumValueNamesRule, UniqueFieldDefinitionNamesRule, UniqueDirectiveNamesRule, KnownTypeNamesRule, KnownDirectivesRule, UniqueDirectivesPerLocationRule, PossibleTypeExtensionsRule, KnownArgumentNamesOnDirectivesRule, UniqueArgumentNamesRule, UniqueInputFieldNamesRule, ProvidedRequiredArgumentsOnDirectivesRule]);
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var ASTValidationContext = /* @__PURE__ */ function() {
  function ASTValidationContext2(ast, onError) {
    this._ast = ast;
    this._fragments = void 0;
    this._fragmentSpreads = /* @__PURE__ */ new Map();
    this._recursivelyReferencedFragments = /* @__PURE__ */ new Map();
    this._onError = onError;
  }
  var _proto = ASTValidationContext2.prototype;
  _proto.reportError = function reportError(error) {
    this._onError(error);
  };
  _proto.getDocument = function getDocument() {
    return this._ast;
  };
  _proto.getFragment = function getFragment(name) {
    var fragments = this._fragments;
    if (!fragments) {
      this._fragments = fragments = this.getDocument().definitions.reduce(function(frags, statement) {
        if (statement.kind === Kind.FRAGMENT_DEFINITION) {
          frags[statement.name.value] = statement;
        }
        return frags;
      }, /* @__PURE__ */ Object.create(null));
    }
    return fragments[name];
  };
  _proto.getFragmentSpreads = function getFragmentSpreads(node) {
    var spreads = this._fragmentSpreads.get(node);
    if (!spreads) {
      spreads = [];
      var setsToVisit = [node];
      while (setsToVisit.length !== 0) {
        var set = setsToVisit.pop();
        for (var _i2 = 0, _set$selections2 = set.selections; _i2 < _set$selections2.length; _i2++) {
          var selection = _set$selections2[_i2];
          if (selection.kind === Kind.FRAGMENT_SPREAD) {
            spreads.push(selection);
          } else if (selection.selectionSet) {
            setsToVisit.push(selection.selectionSet);
          }
        }
      }
      this._fragmentSpreads.set(node, spreads);
    }
    return spreads;
  };
  _proto.getRecursivelyReferencedFragments = function getRecursivelyReferencedFragments(operation) {
    var fragments = this._recursivelyReferencedFragments.get(operation);
    if (!fragments) {
      fragments = [];
      var collectedNames = /* @__PURE__ */ Object.create(null);
      var nodesToVisit = [operation.selectionSet];
      while (nodesToVisit.length !== 0) {
        var node = nodesToVisit.pop();
        for (var _i4 = 0, _this$getFragmentSpre2 = this.getFragmentSpreads(node); _i4 < _this$getFragmentSpre2.length; _i4++) {
          var spread = _this$getFragmentSpre2[_i4];
          var fragName = spread.name.value;
          if (collectedNames[fragName] !== true) {
            collectedNames[fragName] = true;
            var fragment = this.getFragment(fragName);
            if (fragment) {
              fragments.push(fragment);
              nodesToVisit.push(fragment.selectionSet);
            }
          }
        }
      }
      this._recursivelyReferencedFragments.set(operation, fragments);
    }
    return fragments;
  };
  return ASTValidationContext2;
}();
var SDLValidationContext = /* @__PURE__ */ function(_ASTValidationContext) {
  _inheritsLoose(SDLValidationContext2, _ASTValidationContext);
  function SDLValidationContext2(ast, schema, onError) {
    var _this;
    _this = _ASTValidationContext.call(this, ast, onError) || this;
    _this._schema = schema;
    return _this;
  }
  var _proto2 = SDLValidationContext2.prototype;
  _proto2.getSchema = function getSchema() {
    return this._schema;
  };
  return SDLValidationContext2;
}(ASTValidationContext);
var ValidationContext = /* @__PURE__ */ function(_ASTValidationContext2) {
  _inheritsLoose(ValidationContext2, _ASTValidationContext2);
  function ValidationContext2(schema, ast, typeInfo, onError) {
    var _this2;
    _this2 = _ASTValidationContext2.call(this, ast, onError) || this;
    _this2._schema = schema;
    _this2._typeInfo = typeInfo;
    _this2._variableUsages = /* @__PURE__ */ new Map();
    _this2._recursiveVariableUsages = /* @__PURE__ */ new Map();
    return _this2;
  }
  var _proto3 = ValidationContext2.prototype;
  _proto3.getSchema = function getSchema() {
    return this._schema;
  };
  _proto3.getVariableUsages = function getVariableUsages(node) {
    var usages = this._variableUsages.get(node);
    if (!usages) {
      var newUsages = [];
      var typeInfo = new TypeInfo(this._schema);
      visit(node, visitWithTypeInfo(typeInfo, {
        VariableDefinition: function VariableDefinition2() {
          return false;
        },
        Variable: function Variable2(variable) {
          newUsages.push({
            node: variable,
            type: typeInfo.getInputType(),
            defaultValue: typeInfo.getDefaultValue()
          });
        }
      }));
      usages = newUsages;
      this._variableUsages.set(node, usages);
    }
    return usages;
  };
  _proto3.getRecursiveVariableUsages = function getRecursiveVariableUsages(operation) {
    var usages = this._recursiveVariableUsages.get(operation);
    if (!usages) {
      usages = this.getVariableUsages(operation);
      for (var _i6 = 0, _this$getRecursivelyR2 = this.getRecursivelyReferencedFragments(operation); _i6 < _this$getRecursivelyR2.length; _i6++) {
        var frag = _this$getRecursivelyR2[_i6];
        usages = usages.concat(this.getVariableUsages(frag));
      }
      this._recursiveVariableUsages.set(operation, usages);
    }
    return usages;
  };
  _proto3.getType = function getType() {
    return this._typeInfo.getType();
  };
  _proto3.getParentType = function getParentType() {
    return this._typeInfo.getParentType();
  };
  _proto3.getInputType = function getInputType() {
    return this._typeInfo.getInputType();
  };
  _proto3.getParentInputType = function getParentInputType() {
    return this._typeInfo.getParentInputType();
  };
  _proto3.getFieldDef = function getFieldDef2() {
    return this._typeInfo.getFieldDef();
  };
  _proto3.getDirective = function getDirective() {
    return this._typeInfo.getDirective();
  };
  _proto3.getArgument = function getArgument() {
    return this._typeInfo.getArgument();
  };
  _proto3.getEnumValue = function getEnumValue() {
    return this._typeInfo.getEnumValue();
  };
  return ValidationContext2;
}(ASTValidationContext);
function validate$1(schema, documentAST) {
  var rules = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : specifiedRules;
  var typeInfo = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : new TypeInfo(schema);
  var options = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
    maxErrors: void 0
  };
  documentAST || devAssert(0, "Must provide document.");
  assertValidSchema(schema);
  var abortObj = Object.freeze({});
  var errors = [];
  var context = new ValidationContext(schema, documentAST, typeInfo, function(error) {
    if (options.maxErrors != null && errors.length >= options.maxErrors) {
      errors.push(new GraphQLError("Too many validation errors, error limit reached. Validation aborted."));
      throw abortObj;
    }
    errors.push(error);
  });
  var visitor = visitInParallel(rules.map(function(rule) {
    return rule(context);
  }));
  try {
    visit(documentAST, visitWithTypeInfo(typeInfo, visitor));
  } catch (e2) {
    if (e2 !== abortObj) {
      throw e2;
    }
  }
  return errors;
}
function validateSDL(documentAST, schemaToExtend) {
  var rules = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : specifiedSDLRules;
  var errors = [];
  var context = new SDLValidationContext(documentAST, schemaToExtend, function(error) {
    errors.push(error);
  });
  var visitors = rules.map(function(rule) {
    return rule(context);
  });
  visit(documentAST, visitInParallel(visitors));
  return errors;
}
function assertValidSDL(documentAST) {
  var errors = validateSDL(documentAST);
  if (errors.length !== 0) {
    throw new Error(errors.map(function(error) {
      return error.message;
    }).join("\n\n"));
  }
}
function assertValidSDLExtension(documentAST, schema) {
  var errors = validateSDL(documentAST, schema);
  if (errors.length !== 0) {
    throw new Error(errors.map(function(error) {
      return error.message;
    }).join("\n\n"));
  }
}
function memoize3(fn) {
  var cache0;
  return function memoized(a1, a2, a3) {
    if (!cache0) {
      cache0 = /* @__PURE__ */ new WeakMap();
    }
    var cache1 = cache0.get(a1);
    var cache2;
    if (cache1) {
      cache2 = cache1.get(a2);
      if (cache2) {
        var cachedValue = cache2.get(a3);
        if (cachedValue !== void 0) {
          return cachedValue;
        }
      }
    } else {
      cache1 = /* @__PURE__ */ new WeakMap();
      cache0.set(a1, cache1);
    }
    if (!cache2) {
      cache2 = /* @__PURE__ */ new WeakMap();
      cache1.set(a2, cache2);
    }
    var newValue = fn(a1, a2, a3);
    cache2.set(a3, newValue);
    return newValue;
  };
}
function promiseReduce(values, callback, initialValue) {
  return values.reduce(function(previous, value) {
    return isPromise$1(previous) ? previous.then(function(resolved) {
      return callback(resolved, value);
    }) : callback(previous, value);
  }, initialValue);
}
function promiseForObject(object) {
  var keys = Object.keys(object);
  var valuesAndPromises = keys.map(function(name) {
    return object[name];
  });
  return Promise.all(valuesAndPromises).then(function(values) {
    return values.reduce(function(resolvedObject, value, i) {
      resolvedObject[keys[i]] = value;
      return resolvedObject;
    }, /* @__PURE__ */ Object.create(null));
  });
}
function addPath(prev, key, typename) {
  return {
    prev,
    key,
    typename
  };
}
function pathToArray(path) {
  var flattened = [];
  var curr = path;
  while (curr) {
    flattened.push(curr.key);
    curr = curr.prev;
  }
  return flattened.reverse();
}
function getOperationRootType(schema, operation) {
  if (operation.operation === "query") {
    var queryType = schema.getQueryType();
    if (!queryType) {
      throw new GraphQLError("Schema does not define the required query root type.", operation);
    }
    return queryType;
  }
  if (operation.operation === "mutation") {
    var mutationType = schema.getMutationType();
    if (!mutationType) {
      throw new GraphQLError("Schema is not configured for mutations.", operation);
    }
    return mutationType;
  }
  if (operation.operation === "subscription") {
    var subscriptionType = schema.getSubscriptionType();
    if (!subscriptionType) {
      throw new GraphQLError("Schema is not configured for subscriptions.", operation);
    }
    return subscriptionType;
  }
  throw new GraphQLError("Can only have query, mutation and subscription operations.", operation);
}
function printPathArray(path) {
  return path.map(function(key) {
    return typeof key === "number" ? "[" + key.toString() + "]" : "." + key;
  }).join("");
}
function valueFromAST(valueNode, type, variables) {
  if (!valueNode) {
    return;
  }
  if (valueNode.kind === Kind.VARIABLE) {
    var variableName = valueNode.name.value;
    if (variables == null || variables[variableName] === void 0) {
      return;
    }
    var variableValue = variables[variableName];
    if (variableValue === null && isNonNullType(type)) {
      return;
    }
    return variableValue;
  }
  if (isNonNullType(type)) {
    if (valueNode.kind === Kind.NULL) {
      return;
    }
    return valueFromAST(valueNode, type.ofType, variables);
  }
  if (valueNode.kind === Kind.NULL) {
    return null;
  }
  if (isListType(type)) {
    var itemType = type.ofType;
    if (valueNode.kind === Kind.LIST) {
      var coercedValues = [];
      for (var _i2 = 0, _valueNode$values2 = valueNode.values; _i2 < _valueNode$values2.length; _i2++) {
        var itemNode = _valueNode$values2[_i2];
        if (isMissingVariable(itemNode, variables)) {
          if (isNonNullType(itemType)) {
            return;
          }
          coercedValues.push(null);
        } else {
          var itemValue = valueFromAST(itemNode, itemType, variables);
          if (itemValue === void 0) {
            return;
          }
          coercedValues.push(itemValue);
        }
      }
      return coercedValues;
    }
    var coercedValue = valueFromAST(valueNode, itemType, variables);
    if (coercedValue === void 0) {
      return;
    }
    return [coercedValue];
  }
  if (isInputObjectType(type)) {
    if (valueNode.kind !== Kind.OBJECT) {
      return;
    }
    var coercedObj = /* @__PURE__ */ Object.create(null);
    var fieldNodes = keyMap(valueNode.fields, function(field2) {
      return field2.name.value;
    });
    for (var _i4 = 0, _objectValues2 = objectValues$1(type.getFields()); _i4 < _objectValues2.length; _i4++) {
      var field = _objectValues2[_i4];
      var fieldNode = fieldNodes[field.name];
      if (!fieldNode || isMissingVariable(fieldNode.value, variables)) {
        if (field.defaultValue !== void 0) {
          coercedObj[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          return;
        }
        continue;
      }
      var fieldValue = valueFromAST(fieldNode.value, field.type, variables);
      if (fieldValue === void 0) {
        return;
      }
      coercedObj[field.name] = fieldValue;
    }
    return coercedObj;
  }
  if (isLeafType(type)) {
    var result;
    try {
      result = type.parseLiteral(valueNode, variables);
    } catch (_error) {
      return;
    }
    if (result === void 0) {
      return;
    }
    return result;
  }
  invariant(0, "Unexpected input type: " + inspect(type));
}
function isMissingVariable(valueNode, variables) {
  return valueNode.kind === Kind.VARIABLE && (variables == null || variables[valueNode.name.value] === void 0);
}
function coerceInputValue(inputValue, type) {
  var onError = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultOnError;
  return coerceInputValueImpl(inputValue, type, onError);
}
function defaultOnError(path, invalidValue, error) {
  var errorPrefix = "Invalid value " + inspect(invalidValue);
  if (path.length > 0) {
    errorPrefix += ' at "value'.concat(printPathArray(path), '"');
  }
  error.message = errorPrefix + ": " + error.message;
  throw error;
}
function coerceInputValueImpl(inputValue, type, onError, path) {
  if (isNonNullType(type)) {
    if (inputValue != null) {
      return coerceInputValueImpl(inputValue, type.ofType, onError, path);
    }
    onError(pathToArray(path), inputValue, new GraphQLError('Expected non-nullable type "'.concat(inspect(type), '" not to be null.')));
    return;
  }
  if (inputValue == null) {
    return null;
  }
  if (isListType(type)) {
    var itemType = type.ofType;
    var coercedList = safeArrayFrom(inputValue, function(itemValue, index) {
      var itemPath = addPath(path, index, void 0);
      return coerceInputValueImpl(itemValue, itemType, onError, itemPath);
    });
    if (coercedList != null) {
      return coercedList;
    }
    return [coerceInputValueImpl(inputValue, itemType, onError, path)];
  }
  if (isInputObjectType(type)) {
    if (!isObjectLike(inputValue)) {
      onError(pathToArray(path), inputValue, new GraphQLError('Expected type "'.concat(type.name, '" to be an object.')));
      return;
    }
    var coercedValue = {};
    var fieldDefs = type.getFields();
    for (var _i2 = 0, _objectValues2 = objectValues$1(fieldDefs); _i2 < _objectValues2.length; _i2++) {
      var field = _objectValues2[_i2];
      var fieldValue = inputValue[field.name];
      if (fieldValue === void 0) {
        if (field.defaultValue !== void 0) {
          coercedValue[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          var typeStr = inspect(field.type);
          onError(pathToArray(path), inputValue, new GraphQLError('Field "'.concat(field.name, '" of required type "').concat(typeStr, '" was not provided.')));
        }
        continue;
      }
      coercedValue[field.name] = coerceInputValueImpl(fieldValue, field.type, onError, addPath(path, field.name, type.name));
    }
    for (var _i4 = 0, _Object$keys2 = Object.keys(inputValue); _i4 < _Object$keys2.length; _i4++) {
      var fieldName = _Object$keys2[_i4];
      if (!fieldDefs[fieldName]) {
        var suggestions = suggestionList(fieldName, Object.keys(type.getFields()));
        onError(pathToArray(path), inputValue, new GraphQLError('Field "'.concat(fieldName, '" is not defined by type "').concat(type.name, '".') + didYouMean(suggestions)));
      }
    }
    return coercedValue;
  }
  if (isLeafType(type)) {
    var parseResult;
    try {
      parseResult = type.parseValue(inputValue);
    } catch (error) {
      if (error instanceof GraphQLError) {
        onError(pathToArray(path), inputValue, error);
      } else {
        onError(pathToArray(path), inputValue, new GraphQLError('Expected type "'.concat(type.name, '". ') + error.message, void 0, void 0, void 0, void 0, error));
      }
      return;
    }
    if (parseResult === void 0) {
      onError(pathToArray(path), inputValue, new GraphQLError('Expected type "'.concat(type.name, '".')));
    }
    return parseResult;
  }
  invariant(0, "Unexpected input type: " + inspect(type));
}
function getVariableValues(schema, varDefNodes, inputs, options) {
  var errors = [];
  var maxErrors = options === null || options === void 0 ? void 0 : options.maxErrors;
  try {
    var coerced = coerceVariableValues(schema, varDefNodes, inputs, function(error) {
      if (maxErrors != null && errors.length >= maxErrors) {
        throw new GraphQLError("Too many errors processing variables, error limit reached. Execution aborted.");
      }
      errors.push(error);
    });
    if (errors.length === 0) {
      return {
        coerced
      };
    }
  } catch (error) {
    errors.push(error);
  }
  return {
    errors
  };
}
function coerceVariableValues(schema, varDefNodes, inputs, onError) {
  var coercedValues = {};
  var _loop = function _loop2(_i22) {
    var varDefNode = varDefNodes[_i22];
    var varName = varDefNode.variable.name.value;
    var varType = typeFromAST(schema, varDefNode.type);
    if (!isInputType(varType)) {
      var varTypeStr = print(varDefNode.type);
      onError(new GraphQLError('Variable "$'.concat(varName, '" expected value of type "').concat(varTypeStr, '" which cannot be used as an input type.'), varDefNode.type));
      return "continue";
    }
    if (!hasOwnProperty$6(inputs, varName)) {
      if (varDefNode.defaultValue) {
        coercedValues[varName] = valueFromAST(varDefNode.defaultValue, varType);
      } else if (isNonNullType(varType)) {
        var _varTypeStr = inspect(varType);
        onError(new GraphQLError('Variable "$'.concat(varName, '" of required type "').concat(_varTypeStr, '" was not provided.'), varDefNode));
      }
      return "continue";
    }
    var value = inputs[varName];
    if (value === null && isNonNullType(varType)) {
      var _varTypeStr2 = inspect(varType);
      onError(new GraphQLError('Variable "$'.concat(varName, '" of non-null type "').concat(_varTypeStr2, '" must not be null.'), varDefNode));
      return "continue";
    }
    coercedValues[varName] = coerceInputValue(value, varType, function(path, invalidValue, error) {
      var prefix = 'Variable "$'.concat(varName, '" got invalid value ') + inspect(invalidValue);
      if (path.length > 0) {
        prefix += ' at "'.concat(varName).concat(printPathArray(path), '"');
      }
      onError(new GraphQLError(prefix + "; " + error.message, varDefNode, void 0, void 0, void 0, error.originalError));
    });
  };
  for (var _i2 = 0; _i2 < varDefNodes.length; _i2++) {
    var _ret = _loop(_i2);
    if (_ret === "continue")
      continue;
  }
  return coercedValues;
}
function getArgumentValues(def, node, variableValues) {
  var _node$arguments;
  var coercedValues = {};
  var argumentNodes = (_node$arguments = node.arguments) !== null && _node$arguments !== void 0 ? _node$arguments : [];
  var argNodeMap = keyMap(argumentNodes, function(arg) {
    return arg.name.value;
  });
  for (var _i4 = 0, _def$args2 = def.args; _i4 < _def$args2.length; _i4++) {
    var argDef = _def$args2[_i4];
    var name = argDef.name;
    var argType = argDef.type;
    var argumentNode = argNodeMap[name];
    if (!argumentNode) {
      if (argDef.defaultValue !== void 0) {
        coercedValues[name] = argDef.defaultValue;
      } else if (isNonNullType(argType)) {
        throw new GraphQLError('Argument "'.concat(name, '" of required type "').concat(inspect(argType), '" ') + "was not provided.", node);
      }
      continue;
    }
    var valueNode = argumentNode.value;
    var isNull = valueNode.kind === Kind.NULL;
    if (valueNode.kind === Kind.VARIABLE) {
      var variableName = valueNode.name.value;
      if (variableValues == null || !hasOwnProperty$6(variableValues, variableName)) {
        if (argDef.defaultValue !== void 0) {
          coercedValues[name] = argDef.defaultValue;
        } else if (isNonNullType(argType)) {
          throw new GraphQLError('Argument "'.concat(name, '" of required type "').concat(inspect(argType), '" ') + 'was provided the variable "$'.concat(variableName, '" which was not provided a runtime value.'), valueNode);
        }
        continue;
      }
      isNull = variableValues[variableName] == null;
    }
    if (isNull && isNonNullType(argType)) {
      throw new GraphQLError('Argument "'.concat(name, '" of non-null type "').concat(inspect(argType), '" ') + "must not be null.", valueNode);
    }
    var coercedValue = valueFromAST(valueNode, argType, variableValues);
    if (coercedValue === void 0) {
      throw new GraphQLError('Argument "'.concat(name, '" has invalid value ').concat(print(valueNode), "."), valueNode);
    }
    coercedValues[name] = coercedValue;
  }
  return coercedValues;
}
function getDirectiveValues(directiveDef, node, variableValues) {
  var directiveNode = node.directives && find$1(node.directives, function(directive) {
    return directive.name.value === directiveDef.name;
  });
  if (directiveNode) {
    return getArgumentValues(directiveDef, directiveNode, variableValues);
  }
}
function hasOwnProperty$6(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function execute$1(argsOrSchema, document2, rootValue, contextValue, variableValues, operationName, fieldResolver, typeResolver) {
  return arguments.length === 1 ? executeImpl(argsOrSchema) : executeImpl({
    schema: argsOrSchema,
    document: document2,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver
  });
}
function executeSync(args) {
  var result = executeImpl(args);
  if (isPromise$1(result)) {
    throw new Error("GraphQL execution failed to complete synchronously.");
  }
  return result;
}
function executeImpl(args) {
  var schema = args.schema, document2 = args.document, rootValue = args.rootValue, contextValue = args.contextValue, variableValues = args.variableValues, operationName = args.operationName, fieldResolver = args.fieldResolver, typeResolver = args.typeResolver;
  assertValidExecutionArguments(schema, document2, variableValues);
  var exeContext = buildExecutionContext(schema, document2, rootValue, contextValue, variableValues, operationName, fieldResolver, typeResolver);
  if (Array.isArray(exeContext)) {
    return {
      errors: exeContext
    };
  }
  var data = executeOperation(exeContext, exeContext.operation, rootValue);
  return buildResponse(exeContext, data);
}
function buildResponse(exeContext, data) {
  if (isPromise$1(data)) {
    return data.then(function(resolved) {
      return buildResponse(exeContext, resolved);
    });
  }
  return exeContext.errors.length === 0 ? {
    data
  } : {
    errors: exeContext.errors,
    data
  };
}
function assertValidExecutionArguments(schema, document2, rawVariableValues) {
  document2 || devAssert(0, "Must provide document.");
  assertValidSchema(schema);
  rawVariableValues == null || isObjectLike(rawVariableValues) || devAssert(0, "Variables must be provided as an Object where each property is a variable value. Perhaps look to see if an unparsed JSON string was provided.");
}
function buildExecutionContext(schema, document2, rootValue, contextValue, rawVariableValues, operationName, fieldResolver, typeResolver) {
  var _definition$name, _operation$variableDe;
  var operation;
  var fragments = /* @__PURE__ */ Object.create(null);
  for (var _i2 = 0, _document$definitions2 = document2.definitions; _i2 < _document$definitions2.length; _i2++) {
    var definition = _document$definitions2[_i2];
    switch (definition.kind) {
      case Kind.OPERATION_DEFINITION:
        if (operationName == null) {
          if (operation !== void 0) {
            return [new GraphQLError("Must provide operation name if query contains multiple operations.")];
          }
          operation = definition;
        } else if (((_definition$name = definition.name) === null || _definition$name === void 0 ? void 0 : _definition$name.value) === operationName) {
          operation = definition;
        }
        break;
      case Kind.FRAGMENT_DEFINITION:
        fragments[definition.name.value] = definition;
        break;
    }
  }
  if (!operation) {
    if (operationName != null) {
      return [new GraphQLError('Unknown operation named "'.concat(operationName, '".'))];
    }
    return [new GraphQLError("Must provide an operation.")];
  }
  var variableDefinitions = (_operation$variableDe = operation.variableDefinitions) !== null && _operation$variableDe !== void 0 ? _operation$variableDe : [];
  var coercedVariableValues = getVariableValues(schema, variableDefinitions, rawVariableValues !== null && rawVariableValues !== void 0 ? rawVariableValues : {}, {
    maxErrors: 50
  });
  if (coercedVariableValues.errors) {
    return coercedVariableValues.errors;
  }
  return {
    schema,
    fragments,
    rootValue,
    contextValue,
    operation,
    variableValues: coercedVariableValues.coerced,
    fieldResolver: fieldResolver !== null && fieldResolver !== void 0 ? fieldResolver : defaultFieldResolver,
    typeResolver: typeResolver !== null && typeResolver !== void 0 ? typeResolver : defaultTypeResolver,
    errors: []
  };
}
function executeOperation(exeContext, operation, rootValue) {
  var type = getOperationRootType(exeContext.schema, operation);
  var fields7 = collectFields(exeContext, type, operation.selectionSet, /* @__PURE__ */ Object.create(null), /* @__PURE__ */ Object.create(null));
  var path = void 0;
  try {
    var result = operation.operation === "mutation" ? executeFieldsSerially(exeContext, type, rootValue, path, fields7) : executeFields(exeContext, type, rootValue, path, fields7);
    if (isPromise$1(result)) {
      return result.then(void 0, function(error) {
        exeContext.errors.push(error);
        return Promise.resolve(null);
      });
    }
    return result;
  } catch (error) {
    exeContext.errors.push(error);
    return null;
  }
}
function executeFieldsSerially(exeContext, parentType, sourceValue, path, fields7) {
  return promiseReduce(Object.keys(fields7), function(results, responseName) {
    var fieldNodes = fields7[responseName];
    var fieldPath = addPath(path, responseName, parentType.name);
    var result = resolveField(exeContext, parentType, sourceValue, fieldNodes, fieldPath);
    if (result === void 0) {
      return results;
    }
    if (isPromise$1(result)) {
      return result.then(function(resolvedResult) {
        results[responseName] = resolvedResult;
        return results;
      });
    }
    results[responseName] = result;
    return results;
  }, /* @__PURE__ */ Object.create(null));
}
function executeFields(exeContext, parentType, sourceValue, path, fields7) {
  var results = /* @__PURE__ */ Object.create(null);
  var containsPromise = false;
  for (var _i4 = 0, _Object$keys2 = Object.keys(fields7); _i4 < _Object$keys2.length; _i4++) {
    var responseName = _Object$keys2[_i4];
    var fieldNodes = fields7[responseName];
    var fieldPath = addPath(path, responseName, parentType.name);
    var result = resolveField(exeContext, parentType, sourceValue, fieldNodes, fieldPath);
    if (result !== void 0) {
      results[responseName] = result;
      if (isPromise$1(result)) {
        containsPromise = true;
      }
    }
  }
  if (!containsPromise) {
    return results;
  }
  return promiseForObject(results);
}
function collectFields(exeContext, runtimeType, selectionSet, fields7, visitedFragmentNames) {
  for (var _i6 = 0, _selectionSet$selecti2 = selectionSet.selections; _i6 < _selectionSet$selecti2.length; _i6++) {
    var selection = _selectionSet$selecti2[_i6];
    switch (selection.kind) {
      case Kind.FIELD: {
        if (!shouldIncludeNode(exeContext, selection)) {
          continue;
        }
        var name = getFieldEntryKey(selection);
        if (!fields7[name]) {
          fields7[name] = [];
        }
        fields7[name].push(selection);
        break;
      }
      case Kind.INLINE_FRAGMENT: {
        if (!shouldIncludeNode(exeContext, selection) || !doesFragmentConditionMatch(exeContext, selection, runtimeType)) {
          continue;
        }
        collectFields(exeContext, runtimeType, selection.selectionSet, fields7, visitedFragmentNames);
        break;
      }
      case Kind.FRAGMENT_SPREAD: {
        var fragName = selection.name.value;
        if (visitedFragmentNames[fragName] || !shouldIncludeNode(exeContext, selection)) {
          continue;
        }
        visitedFragmentNames[fragName] = true;
        var fragment = exeContext.fragments[fragName];
        if (!fragment || !doesFragmentConditionMatch(exeContext, fragment, runtimeType)) {
          continue;
        }
        collectFields(exeContext, runtimeType, fragment.selectionSet, fields7, visitedFragmentNames);
        break;
      }
    }
  }
  return fields7;
}
function shouldIncludeNode(exeContext, node) {
  var skip = getDirectiveValues(GraphQLSkipDirective, node, exeContext.variableValues);
  if ((skip === null || skip === void 0 ? void 0 : skip.if) === true) {
    return false;
  }
  var include = getDirectiveValues(GraphQLIncludeDirective, node, exeContext.variableValues);
  if ((include === null || include === void 0 ? void 0 : include.if) === false) {
    return false;
  }
  return true;
}
function doesFragmentConditionMatch(exeContext, fragment, type) {
  var typeConditionNode = fragment.typeCondition;
  if (!typeConditionNode) {
    return true;
  }
  var conditionalType = typeFromAST(exeContext.schema, typeConditionNode);
  if (conditionalType === type) {
    return true;
  }
  if (isAbstractType(conditionalType)) {
    return exeContext.schema.isSubType(conditionalType, type);
  }
  return false;
}
function getFieldEntryKey(node) {
  return node.alias ? node.alias.value : node.name.value;
}
function resolveField(exeContext, parentType, source, fieldNodes, path) {
  var _fieldDef$resolve;
  var fieldNode = fieldNodes[0];
  var fieldName = fieldNode.name.value;
  var fieldDef = getFieldDef(exeContext.schema, parentType, fieldName);
  if (!fieldDef) {
    return;
  }
  var returnType = fieldDef.type;
  var resolveFn = (_fieldDef$resolve = fieldDef.resolve) !== null && _fieldDef$resolve !== void 0 ? _fieldDef$resolve : exeContext.fieldResolver;
  var info = buildResolveInfo(exeContext, fieldDef, fieldNodes, parentType, path);
  try {
    var args = getArgumentValues(fieldDef, fieldNodes[0], exeContext.variableValues);
    var _contextValue = exeContext.contextValue;
    var result = resolveFn(source, args, _contextValue, info);
    var completed;
    if (isPromise$1(result)) {
      completed = result.then(function(resolved) {
        return completeValue(exeContext, returnType, fieldNodes, info, path, resolved);
      });
    } else {
      completed = completeValue(exeContext, returnType, fieldNodes, info, path, result);
    }
    if (isPromise$1(completed)) {
      return completed.then(void 0, function(rawError) {
        var error2 = locatedError(rawError, fieldNodes, pathToArray(path));
        return handleFieldError(error2, returnType, exeContext);
      });
    }
    return completed;
  } catch (rawError) {
    var error = locatedError(rawError, fieldNodes, pathToArray(path));
    return handleFieldError(error, returnType, exeContext);
  }
}
function buildResolveInfo(exeContext, fieldDef, fieldNodes, parentType, path) {
  return {
    fieldName: fieldDef.name,
    fieldNodes,
    returnType: fieldDef.type,
    parentType,
    path,
    schema: exeContext.schema,
    fragments: exeContext.fragments,
    rootValue: exeContext.rootValue,
    operation: exeContext.operation,
    variableValues: exeContext.variableValues
  };
}
function handleFieldError(error, returnType, exeContext) {
  if (isNonNullType(returnType)) {
    throw error;
  }
  exeContext.errors.push(error);
  return null;
}
function completeValue(exeContext, returnType, fieldNodes, info, path, result) {
  if (result instanceof Error) {
    throw result;
  }
  if (isNonNullType(returnType)) {
    var completed = completeValue(exeContext, returnType.ofType, fieldNodes, info, path, result);
    if (completed === null) {
      throw new Error("Cannot return null for non-nullable field ".concat(info.parentType.name, ".").concat(info.fieldName, "."));
    }
    return completed;
  }
  if (result == null) {
    return null;
  }
  if (isListType(returnType)) {
    return completeListValue(exeContext, returnType, fieldNodes, info, path, result);
  }
  if (isLeafType(returnType)) {
    return completeLeafValue(returnType, result);
  }
  if (isAbstractType(returnType)) {
    return completeAbstractValue(exeContext, returnType, fieldNodes, info, path, result);
  }
  if (isObjectType(returnType)) {
    return completeObjectValue(exeContext, returnType, fieldNodes, info, path, result);
  }
  invariant(0, "Cannot complete value of unexpected output type: " + inspect(returnType));
}
function completeListValue(exeContext, returnType, fieldNodes, info, path, result) {
  var itemType = returnType.ofType;
  var containsPromise = false;
  var completedResults = safeArrayFrom(result, function(item, index) {
    var itemPath = addPath(path, index, void 0);
    try {
      var completedItem;
      if (isPromise$1(item)) {
        completedItem = item.then(function(resolved) {
          return completeValue(exeContext, itemType, fieldNodes, info, itemPath, resolved);
        });
      } else {
        completedItem = completeValue(exeContext, itemType, fieldNodes, info, itemPath, item);
      }
      if (isPromise$1(completedItem)) {
        containsPromise = true;
        return completedItem.then(void 0, function(rawError) {
          var error2 = locatedError(rawError, fieldNodes, pathToArray(itemPath));
          return handleFieldError(error2, itemType, exeContext);
        });
      }
      return completedItem;
    } catch (rawError) {
      var error = locatedError(rawError, fieldNodes, pathToArray(itemPath));
      return handleFieldError(error, itemType, exeContext);
    }
  });
  if (completedResults == null) {
    throw new GraphQLError('Expected Iterable, but did not find one for field "'.concat(info.parentType.name, ".").concat(info.fieldName, '".'));
  }
  return containsPromise ? Promise.all(completedResults) : completedResults;
}
function completeLeafValue(returnType, result) {
  var serializedResult = returnType.serialize(result);
  if (serializedResult === void 0) {
    throw new Error('Expected a value of type "'.concat(inspect(returnType), '" but ') + "received: ".concat(inspect(result)));
  }
  return serializedResult;
}
function completeAbstractValue(exeContext, returnType, fieldNodes, info, path, result) {
  var _returnType$resolveTy;
  var resolveTypeFn = (_returnType$resolveTy = returnType.resolveType) !== null && _returnType$resolveTy !== void 0 ? _returnType$resolveTy : exeContext.typeResolver;
  var contextValue = exeContext.contextValue;
  var runtimeType = resolveTypeFn(result, contextValue, info, returnType);
  if (isPromise$1(runtimeType)) {
    return runtimeType.then(function(resolvedRuntimeType) {
      return completeObjectValue(exeContext, ensureValidRuntimeType(resolvedRuntimeType, exeContext, returnType, fieldNodes, info, result), fieldNodes, info, path, result);
    });
  }
  return completeObjectValue(exeContext, ensureValidRuntimeType(runtimeType, exeContext, returnType, fieldNodes, info, result), fieldNodes, info, path, result);
}
function ensureValidRuntimeType(runtimeTypeOrName, exeContext, returnType, fieldNodes, info, result) {
  if (runtimeTypeOrName == null) {
    throw new GraphQLError('Abstract type "'.concat(returnType.name, '" must resolve to an Object type at runtime for field "').concat(info.parentType.name, ".").concat(info.fieldName, '". Either the "').concat(returnType.name, '" type should provide a "resolveType" function or each possible type should provide an "isTypeOf" function.'), fieldNodes);
  }
  var runtimeTypeName = isNamedType(runtimeTypeOrName) ? runtimeTypeOrName.name : runtimeTypeOrName;
  if (typeof runtimeTypeName !== "string") {
    throw new GraphQLError('Abstract type "'.concat(returnType.name, '" must resolve to an Object type at runtime for field "').concat(info.parentType.name, ".").concat(info.fieldName, '" with ') + "value ".concat(inspect(result), ', received "').concat(inspect(runtimeTypeOrName), '".'));
  }
  var runtimeType = exeContext.schema.getType(runtimeTypeName);
  if (runtimeType == null) {
    throw new GraphQLError('Abstract type "'.concat(returnType.name, '" was resolve to a type "').concat(runtimeTypeName, '" that does not exist inside schema.'), fieldNodes);
  }
  if (!isObjectType(runtimeType)) {
    throw new GraphQLError('Abstract type "'.concat(returnType.name, '" was resolve to a non-object type "').concat(runtimeTypeName, '".'), fieldNodes);
  }
  if (!exeContext.schema.isSubType(returnType, runtimeType)) {
    throw new GraphQLError('Runtime Object type "'.concat(runtimeType.name, '" is not a possible type for "').concat(returnType.name, '".'), fieldNodes);
  }
  return runtimeType;
}
function completeObjectValue(exeContext, returnType, fieldNodes, info, path, result) {
  if (returnType.isTypeOf) {
    var isTypeOf = returnType.isTypeOf(result, exeContext.contextValue, info);
    if (isPromise$1(isTypeOf)) {
      return isTypeOf.then(function(resolvedIsTypeOf) {
        if (!resolvedIsTypeOf) {
          throw invalidReturnTypeError(returnType, result, fieldNodes);
        }
        return collectAndExecuteSubfields(exeContext, returnType, fieldNodes, path, result);
      });
    }
    if (!isTypeOf) {
      throw invalidReturnTypeError(returnType, result, fieldNodes);
    }
  }
  return collectAndExecuteSubfields(exeContext, returnType, fieldNodes, path, result);
}
function invalidReturnTypeError(returnType, result, fieldNodes) {
  return new GraphQLError('Expected value of type "'.concat(returnType.name, '" but got: ').concat(inspect(result), "."), fieldNodes);
}
function collectAndExecuteSubfields(exeContext, returnType, fieldNodes, path, result) {
  var subFieldNodes = collectSubfields(exeContext, returnType, fieldNodes);
  return executeFields(exeContext, returnType, result, path, subFieldNodes);
}
var collectSubfields = memoize3(_collectSubfields);
function _collectSubfields(exeContext, returnType, fieldNodes) {
  var subFieldNodes = /* @__PURE__ */ Object.create(null);
  var visitedFragmentNames = /* @__PURE__ */ Object.create(null);
  for (var _i8 = 0; _i8 < fieldNodes.length; _i8++) {
    var node = fieldNodes[_i8];
    if (node.selectionSet) {
      subFieldNodes = collectFields(exeContext, returnType, node.selectionSet, subFieldNodes, visitedFragmentNames);
    }
  }
  return subFieldNodes;
}
var defaultTypeResolver = function defaultTypeResolver2(value, contextValue, info, abstractType) {
  if (isObjectLike(value) && typeof value.__typename === "string") {
    return value.__typename;
  }
  var possibleTypes = info.schema.getPossibleTypes(abstractType);
  var promisedIsTypeOfResults = [];
  for (var i = 0; i < possibleTypes.length; i++) {
    var type = possibleTypes[i];
    if (type.isTypeOf) {
      var isTypeOfResult = type.isTypeOf(value, contextValue, info);
      if (isPromise$1(isTypeOfResult)) {
        promisedIsTypeOfResults[i] = isTypeOfResult;
      } else if (isTypeOfResult) {
        return type.name;
      }
    }
  }
  if (promisedIsTypeOfResults.length) {
    return Promise.all(promisedIsTypeOfResults).then(function(isTypeOfResults) {
      for (var _i9 = 0; _i9 < isTypeOfResults.length; _i9++) {
        if (isTypeOfResults[_i9]) {
          return possibleTypes[_i9].name;
        }
      }
    });
  }
};
var defaultFieldResolver = function defaultFieldResolver2(source, args, contextValue, info) {
  if (isObjectLike(source) || typeof source === "function") {
    var property = source[info.fieldName];
    if (typeof property === "function") {
      return source[info.fieldName](args, contextValue, info);
    }
    return property;
  }
};
function getFieldDef(schema, parentType, fieldName) {
  if (fieldName === SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
    return SchemaMetaFieldDef;
  } else if (fieldName === TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return TypeMetaFieldDef;
  } else if (fieldName === TypeNameMetaFieldDef.name) {
    return TypeNameMetaFieldDef;
  }
  return parentType.getFields()[fieldName];
}
function graphql$1(argsOrSchema, source, rootValue, contextValue, variableValues, operationName, fieldResolver, typeResolver) {
  var _arguments = arguments;
  return new Promise(function(resolve4) {
    return resolve4(
      _arguments.length === 1 ? graphqlImpl(argsOrSchema) : graphqlImpl({
        schema: argsOrSchema,
        source,
        rootValue,
        contextValue,
        variableValues,
        operationName,
        fieldResolver,
        typeResolver
      })
    );
  });
}
function graphqlSync(argsOrSchema, source, rootValue, contextValue, variableValues, operationName, fieldResolver, typeResolver) {
  var result = arguments.length === 1 ? graphqlImpl(argsOrSchema) : graphqlImpl({
    schema: argsOrSchema,
    source,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver
  });
  if (isPromise$1(result)) {
    throw new Error("GraphQL execution failed to complete synchronously.");
  }
  return result;
}
function graphqlImpl(args) {
  var schema = args.schema, source = args.source, rootValue = args.rootValue, contextValue = args.contextValue, variableValues = args.variableValues, operationName = args.operationName, fieldResolver = args.fieldResolver, typeResolver = args.typeResolver;
  var schemaValidationErrors = validateSchema(schema);
  if (schemaValidationErrors.length > 0) {
    return {
      errors: schemaValidationErrors
    };
  }
  var document2;
  try {
    document2 = parse(source);
  } catch (syntaxError2) {
    return {
      errors: [syntaxError2]
    };
  }
  var validationErrors = validate$1(schema, document2);
  if (validationErrors.length > 0) {
    return {
      errors: validationErrors
    };
  }
  return execute$1({
    schema,
    document: document2,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver
  });
}
function isAsyncIterable(maybeAsyncIterable) {
  return typeof (maybeAsyncIterable === null || maybeAsyncIterable === void 0 ? void 0 : maybeAsyncIterable[SYMBOL_ASYNC_ITERATOR]) === "function";
}
function _defineProperty$5(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function mapAsyncIterator(iterable, callback, rejectCallback) {
  var iteratorMethod = iterable[SYMBOL_ASYNC_ITERATOR];
  var iterator = iteratorMethod.call(iterable);
  var $return;
  var abruptClose;
  if (typeof iterator.return === "function") {
    $return = iterator.return;
    abruptClose = function abruptClose2(error) {
      var rethrow = function rethrow2() {
        return Promise.reject(error);
      };
      return $return.call(iterator).then(rethrow, rethrow);
    };
  }
  function mapResult(result) {
    return result.done ? result : asyncMapValue(result.value, callback).then(iteratorResult, abruptClose);
  }
  var mapReject;
  if (rejectCallback) {
    var reject = rejectCallback;
    mapReject = function mapReject2(error) {
      return asyncMapValue(error, reject).then(iteratorResult, abruptClose);
    };
  }
  return _defineProperty$5({
    next: function next() {
      return iterator.next().then(mapResult, mapReject);
    },
    return: function _return() {
      return $return ? $return.call(iterator).then(mapResult, mapReject) : Promise.resolve({
        value: void 0,
        done: true
      });
    },
    throw: function _throw(error) {
      if (typeof iterator.throw === "function") {
        return iterator.throw(error).then(mapResult, mapReject);
      }
      return Promise.reject(error).catch(abruptClose);
    }
  }, SYMBOL_ASYNC_ITERATOR, function() {
    return this;
  });
}
function asyncMapValue(value, callback) {
  return new Promise(function(resolve4) {
    return resolve4(callback(value));
  });
}
function iteratorResult(value) {
  return {
    value,
    done: false
  };
}
function subscribe(argsOrSchema, document2, rootValue, contextValue, variableValues, operationName, fieldResolver, subscribeFieldResolver) {
  return arguments.length === 1 ? subscribeImpl(argsOrSchema) : subscribeImpl({
    schema: argsOrSchema,
    document: document2,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    subscribeFieldResolver
  });
}
function reportGraphQLError(error) {
  if (error instanceof GraphQLError) {
    return {
      errors: [error]
    };
  }
  throw error;
}
function subscribeImpl(args) {
  var schema = args.schema, document2 = args.document, rootValue = args.rootValue, contextValue = args.contextValue, variableValues = args.variableValues, operationName = args.operationName, fieldResolver = args.fieldResolver, subscribeFieldResolver = args.subscribeFieldResolver;
  var sourcePromise = createSourceEventStream(schema, document2, rootValue, contextValue, variableValues, operationName, subscribeFieldResolver);
  var mapSourceToResponse = function mapSourceToResponse2(payload) {
    return execute$1({
      schema,
      document: document2,
      rootValue: payload,
      contextValue,
      variableValues,
      operationName,
      fieldResolver
    });
  };
  return sourcePromise.then(function(resultOrStream) {
    return isAsyncIterable(resultOrStream) ? mapAsyncIterator(resultOrStream, mapSourceToResponse, reportGraphQLError) : resultOrStream;
  });
}
function createSourceEventStream(schema, document2, rootValue, contextValue, variableValues, operationName, fieldResolver) {
  assertValidExecutionArguments(schema, document2, variableValues);
  return new Promise(function(resolve4) {
    var exeContext = buildExecutionContext(schema, document2, rootValue, contextValue, variableValues, operationName, fieldResolver);
    resolve4(
      Array.isArray(exeContext) ? {
        errors: exeContext
      } : executeSubscription(exeContext)
    );
  }).catch(reportGraphQLError);
}
function executeSubscription(exeContext) {
  var schema = exeContext.schema, operation = exeContext.operation, variableValues = exeContext.variableValues, rootValue = exeContext.rootValue;
  var type = getOperationRootType(schema, operation);
  var fields7 = collectFields(exeContext, type, operation.selectionSet, /* @__PURE__ */ Object.create(null), /* @__PURE__ */ Object.create(null));
  var responseNames = Object.keys(fields7);
  var responseName = responseNames[0];
  var fieldNodes = fields7[responseName];
  var fieldNode = fieldNodes[0];
  var fieldName = fieldNode.name.value;
  var fieldDef = getFieldDef(schema, type, fieldName);
  if (!fieldDef) {
    throw new GraphQLError('The subscription field "'.concat(fieldName, '" is not defined.'), fieldNodes);
  }
  var path = addPath(void 0, responseName, type.name);
  var info = buildResolveInfo(exeContext, fieldDef, fieldNodes, type, path);
  return new Promise(function(resolveResult) {
    var _fieldDef$subscribe;
    var args = getArgumentValues(fieldDef, fieldNodes[0], variableValues);
    var contextValue = exeContext.contextValue;
    var resolveFn = (_fieldDef$subscribe = fieldDef.subscribe) !== null && _fieldDef$subscribe !== void 0 ? _fieldDef$subscribe : exeContext.fieldResolver;
    resolveResult(resolveFn(rootValue, args, contextValue, info));
  }).then(function(eventStream) {
    if (eventStream instanceof Error) {
      throw locatedError(eventStream, fieldNodes, pathToArray(path));
    }
    if (!isAsyncIterable(eventStream)) {
      throw new Error("Subscription field must return Async Iterable. " + "Received: ".concat(inspect(eventStream), "."));
    }
    return eventStream;
  }, function(error) {
    throw locatedError(error, fieldNodes, pathToArray(path));
  });
}
function NoDeprecatedCustomRule(context) {
  return {
    Field: function Field2(node) {
      var fieldDef = context.getFieldDef();
      var deprecationReason = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.deprecationReason;
      if (fieldDef && deprecationReason != null) {
        var parentType = context.getParentType();
        parentType != null || invariant(0);
        context.reportError(new GraphQLError("The field ".concat(parentType.name, ".").concat(fieldDef.name, " is deprecated. ").concat(deprecationReason), node));
      }
    },
    Argument: function Argument2(node) {
      var argDef = context.getArgument();
      var deprecationReason = argDef === null || argDef === void 0 ? void 0 : argDef.deprecationReason;
      if (argDef && deprecationReason != null) {
        var directiveDef = context.getDirective();
        if (directiveDef != null) {
          context.reportError(new GraphQLError('Directive "@'.concat(directiveDef.name, '" argument "').concat(argDef.name, '" is deprecated. ').concat(deprecationReason), node));
        } else {
          var parentType = context.getParentType();
          var fieldDef = context.getFieldDef();
          parentType != null && fieldDef != null || invariant(0);
          context.reportError(new GraphQLError('Field "'.concat(parentType.name, ".").concat(fieldDef.name, '" argument "').concat(argDef.name, '" is deprecated. ').concat(deprecationReason), node));
        }
      }
    },
    ObjectField: function ObjectField2(node) {
      var inputObjectDef = getNamedType(context.getParentInputType());
      if (isInputObjectType(inputObjectDef)) {
        var inputFieldDef = inputObjectDef.getFields()[node.name.value];
        var deprecationReason = inputFieldDef === null || inputFieldDef === void 0 ? void 0 : inputFieldDef.deprecationReason;
        if (deprecationReason != null) {
          context.reportError(new GraphQLError("The input field ".concat(inputObjectDef.name, ".").concat(inputFieldDef.name, " is deprecated. ").concat(deprecationReason), node));
        }
      }
    },
    EnumValue: function EnumValue2(node) {
      var enumValueDef = context.getEnumValue();
      var deprecationReason = enumValueDef === null || enumValueDef === void 0 ? void 0 : enumValueDef.deprecationReason;
      if (enumValueDef && deprecationReason != null) {
        var enumTypeDef = getNamedType(context.getInputType());
        enumTypeDef != null || invariant(0);
        context.reportError(new GraphQLError('The enum value "'.concat(enumTypeDef.name, ".").concat(enumValueDef.name, '" is deprecated. ').concat(deprecationReason), node));
      }
    }
  };
}
function NoSchemaIntrospectionCustomRule(context) {
  return {
    Field: function Field2(node) {
      var type = getNamedType(context.getType());
      if (type && isIntrospectionType(type)) {
        context.reportError(new GraphQLError('GraphQL introspection has been disabled, but the requested query contained the field "'.concat(node.name.value, '".'), node));
      }
    }
  };
}
function formatError(error) {
  var _error$message;
  error || devAssert(0, "Received null or undefined error.");
  var message = (_error$message = error.message) !== null && _error$message !== void 0 ? _error$message : "An unknown error occurred.";
  var locations = error.locations;
  var path = error.path;
  var extensions = error.extensions;
  return extensions && Object.keys(extensions).length > 0 ? {
    message,
    locations,
    path,
    extensions
  } : {
    message,
    locations,
    path
  };
}
function ownKeys$4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$4(Object(source), true).forEach(function(key) {
        _defineProperty$4(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$4(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function getIntrospectionQuery(options) {
  var optionsWithDefault = _objectSpread$4({
    descriptions: true,
    specifiedByUrl: false,
    directiveIsRepeatable: false,
    schemaDescription: false,
    inputValueDeprecation: false
  }, options);
  var descriptions = optionsWithDefault.descriptions ? "description" : "";
  var specifiedByUrl = optionsWithDefault.specifiedByUrl ? "specifiedByUrl" : "";
  var directiveIsRepeatable = optionsWithDefault.directiveIsRepeatable ? "isRepeatable" : "";
  var schemaDescription = optionsWithDefault.schemaDescription ? descriptions : "";
  function inputDeprecation(str) {
    return optionsWithDefault.inputValueDeprecation ? str : "";
  }
  return "\n    query IntrospectionQuery {\n      __schema {\n        ".concat(schemaDescription, "\n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          ").concat(descriptions, "\n          ").concat(directiveIsRepeatable, "\n          locations\n          args").concat(inputDeprecation("(includeDeprecated: true)"), " {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      ").concat(descriptions, "\n      ").concat(specifiedByUrl, "\n      fields(includeDeprecated: true) {\n        name\n        ").concat(descriptions, "\n        args").concat(inputDeprecation("(includeDeprecated: true)"), " {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields").concat(inputDeprecation("(includeDeprecated: true)"), " {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        ").concat(descriptions, "\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      ").concat(descriptions, "\n      type { ...TypeRef }\n      defaultValue\n      ").concat(inputDeprecation("isDeprecated"), "\n      ").concat(inputDeprecation("deprecationReason"), "\n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ");
}
function getOperationAST(documentAST, operationName) {
  var operation = null;
  for (var _i2 = 0, _documentAST$definiti2 = documentAST.definitions; _i2 < _documentAST$definiti2.length; _i2++) {
    var definition = _documentAST$definiti2[_i2];
    if (definition.kind === Kind.OPERATION_DEFINITION) {
      var _definition$name;
      if (operationName == null) {
        if (operation) {
          return null;
        }
        operation = definition;
      } else if (((_definition$name = definition.name) === null || _definition$name === void 0 ? void 0 : _definition$name.value) === operationName) {
        return definition;
      }
    }
  }
  return operation;
}
function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$3(Object(source), true).forEach(function(key) {
        _defineProperty$3(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$3(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function introspectionFromSchema(schema, options) {
  var optionsWithDefaults = _objectSpread$3({
    specifiedByUrl: true,
    directiveIsRepeatable: true,
    schemaDescription: true,
    inputValueDeprecation: true
  }, options);
  var document2 = parse(getIntrospectionQuery(optionsWithDefaults));
  var result = executeSync({
    schema,
    document: document2
  });
  !result.errors && result.data || invariant(0);
  return result.data;
}
function buildClientSchema(introspection, options) {
  isObjectLike(introspection) && isObjectLike(introspection.__schema) || devAssert(0, 'Invalid or incomplete introspection result. Ensure that you are passing "data" property of introspection response and no "errors" was returned alongside: '.concat(inspect(introspection), "."));
  var schemaIntrospection = introspection.__schema;
  var typeMap = keyValMap(schemaIntrospection.types, function(typeIntrospection) {
    return typeIntrospection.name;
  }, function(typeIntrospection) {
    return buildType(typeIntrospection);
  });
  for (var _i2 = 0, _ref2 = [].concat(specifiedScalarTypes, introspectionTypes); _i2 < _ref2.length; _i2++) {
    var stdType = _ref2[_i2];
    if (typeMap[stdType.name]) {
      typeMap[stdType.name] = stdType;
    }
  }
  var queryType = schemaIntrospection.queryType ? getObjectType(schemaIntrospection.queryType) : null;
  var mutationType = schemaIntrospection.mutationType ? getObjectType(schemaIntrospection.mutationType) : null;
  var subscriptionType = schemaIntrospection.subscriptionType ? getObjectType(schemaIntrospection.subscriptionType) : null;
  var directives = schemaIntrospection.directives ? schemaIntrospection.directives.map(buildDirective) : [];
  return new GraphQLSchema({
    description: schemaIntrospection.description,
    query: queryType,
    mutation: mutationType,
    subscription: subscriptionType,
    types: objectValues$1(typeMap),
    directives,
    assumeValid: options === null || options === void 0 ? void 0 : options.assumeValid
  });
  function getType(typeRef) {
    if (typeRef.kind === TypeKind.LIST) {
      var itemRef = typeRef.ofType;
      if (!itemRef) {
        throw new Error("Decorated type deeper than introspection query.");
      }
      return new GraphQLList(getType(itemRef));
    }
    if (typeRef.kind === TypeKind.NON_NULL) {
      var nullableRef = typeRef.ofType;
      if (!nullableRef) {
        throw new Error("Decorated type deeper than introspection query.");
      }
      var nullableType = getType(nullableRef);
      return new GraphQLNonNull(assertNullableType(nullableType));
    }
    return getNamedType2(typeRef);
  }
  function getNamedType2(typeRef) {
    var typeName = typeRef.name;
    if (!typeName) {
      throw new Error("Unknown type reference: ".concat(inspect(typeRef), "."));
    }
    var type = typeMap[typeName];
    if (!type) {
      throw new Error("Invalid or incomplete schema, unknown type: ".concat(typeName, ". Ensure that a full introspection query is used in order to build a client schema."));
    }
    return type;
  }
  function getObjectType(typeRef) {
    return assertObjectType(getNamedType2(typeRef));
  }
  function getInterfaceType(typeRef) {
    return assertInterfaceType(getNamedType2(typeRef));
  }
  function buildType(type) {
    if (type != null && type.name != null && type.kind != null) {
      switch (type.kind) {
        case TypeKind.SCALAR:
          return buildScalarDef(type);
        case TypeKind.OBJECT:
          return buildObjectDef(type);
        case TypeKind.INTERFACE:
          return buildInterfaceDef(type);
        case TypeKind.UNION:
          return buildUnionDef(type);
        case TypeKind.ENUM:
          return buildEnumDef(type);
        case TypeKind.INPUT_OBJECT:
          return buildInputObjectDef(type);
      }
    }
    var typeStr = inspect(type);
    throw new Error("Invalid or incomplete introspection result. Ensure that a full introspection query is used in order to build a client schema: ".concat(typeStr, "."));
  }
  function buildScalarDef(scalarIntrospection) {
    return new GraphQLScalarType({
      name: scalarIntrospection.name,
      description: scalarIntrospection.description,
      specifiedByUrl: scalarIntrospection.specifiedByUrl
    });
  }
  function buildImplementationsList(implementingIntrospection) {
    if (implementingIntrospection.interfaces === null && implementingIntrospection.kind === TypeKind.INTERFACE) {
      return [];
    }
    if (!implementingIntrospection.interfaces) {
      var implementingIntrospectionStr = inspect(implementingIntrospection);
      throw new Error("Introspection result missing interfaces: ".concat(implementingIntrospectionStr, "."));
    }
    return implementingIntrospection.interfaces.map(getInterfaceType);
  }
  function buildObjectDef(objectIntrospection) {
    return new GraphQLObjectType({
      name: objectIntrospection.name,
      description: objectIntrospection.description,
      interfaces: function interfaces() {
        return buildImplementationsList(objectIntrospection);
      },
      fields: function fields7() {
        return buildFieldDefMap(objectIntrospection);
      }
    });
  }
  function buildInterfaceDef(interfaceIntrospection) {
    return new GraphQLInterfaceType({
      name: interfaceIntrospection.name,
      description: interfaceIntrospection.description,
      interfaces: function interfaces() {
        return buildImplementationsList(interfaceIntrospection);
      },
      fields: function fields7() {
        return buildFieldDefMap(interfaceIntrospection);
      }
    });
  }
  function buildUnionDef(unionIntrospection) {
    if (!unionIntrospection.possibleTypes) {
      var unionIntrospectionStr = inspect(unionIntrospection);
      throw new Error("Introspection result missing possibleTypes: ".concat(unionIntrospectionStr, "."));
    }
    return new GraphQLUnionType({
      name: unionIntrospection.name,
      description: unionIntrospection.description,
      types: function types2() {
        return unionIntrospection.possibleTypes.map(getObjectType);
      }
    });
  }
  function buildEnumDef(enumIntrospection) {
    if (!enumIntrospection.enumValues) {
      var enumIntrospectionStr = inspect(enumIntrospection);
      throw new Error("Introspection result missing enumValues: ".concat(enumIntrospectionStr, "."));
    }
    return new GraphQLEnumType({
      name: enumIntrospection.name,
      description: enumIntrospection.description,
      values: keyValMap(enumIntrospection.enumValues, function(valueIntrospection) {
        return valueIntrospection.name;
      }, function(valueIntrospection) {
        return {
          description: valueIntrospection.description,
          deprecationReason: valueIntrospection.deprecationReason
        };
      })
    });
  }
  function buildInputObjectDef(inputObjectIntrospection) {
    if (!inputObjectIntrospection.inputFields) {
      var inputObjectIntrospectionStr = inspect(inputObjectIntrospection);
      throw new Error("Introspection result missing inputFields: ".concat(inputObjectIntrospectionStr, "."));
    }
    return new GraphQLInputObjectType({
      name: inputObjectIntrospection.name,
      description: inputObjectIntrospection.description,
      fields: function fields7() {
        return buildInputValueDefMap(inputObjectIntrospection.inputFields);
      }
    });
  }
  function buildFieldDefMap(typeIntrospection) {
    if (!typeIntrospection.fields) {
      throw new Error("Introspection result missing fields: ".concat(inspect(typeIntrospection), "."));
    }
    return keyValMap(typeIntrospection.fields, function(fieldIntrospection) {
      return fieldIntrospection.name;
    }, buildField);
  }
  function buildField(fieldIntrospection) {
    var type = getType(fieldIntrospection.type);
    if (!isOutputType(type)) {
      var typeStr = inspect(type);
      throw new Error("Introspection must provide output type for fields, but received: ".concat(typeStr, "."));
    }
    if (!fieldIntrospection.args) {
      var fieldIntrospectionStr = inspect(fieldIntrospection);
      throw new Error("Introspection result missing field args: ".concat(fieldIntrospectionStr, "."));
    }
    return {
      description: fieldIntrospection.description,
      deprecationReason: fieldIntrospection.deprecationReason,
      type,
      args: buildInputValueDefMap(fieldIntrospection.args)
    };
  }
  function buildInputValueDefMap(inputValueIntrospections) {
    return keyValMap(inputValueIntrospections, function(inputValue) {
      return inputValue.name;
    }, buildInputValue);
  }
  function buildInputValue(inputValueIntrospection) {
    var type = getType(inputValueIntrospection.type);
    if (!isInputType(type)) {
      var typeStr = inspect(type);
      throw new Error("Introspection must provide input type for arguments, but received: ".concat(typeStr, "."));
    }
    var defaultValue = inputValueIntrospection.defaultValue != null ? valueFromAST(parseValue(inputValueIntrospection.defaultValue), type) : void 0;
    return {
      description: inputValueIntrospection.description,
      type,
      defaultValue,
      deprecationReason: inputValueIntrospection.deprecationReason
    };
  }
  function buildDirective(directiveIntrospection) {
    if (!directiveIntrospection.args) {
      var directiveIntrospectionStr = inspect(directiveIntrospection);
      throw new Error("Introspection result missing directive args: ".concat(directiveIntrospectionStr, "."));
    }
    if (!directiveIntrospection.locations) {
      var _directiveIntrospectionStr = inspect(directiveIntrospection);
      throw new Error("Introspection result missing directive locations: ".concat(_directiveIntrospectionStr, "."));
    }
    return new GraphQLDirective({
      name: directiveIntrospection.name,
      description: directiveIntrospection.description,
      isRepeatable: directiveIntrospection.isRepeatable,
      locations: directiveIntrospection.locations.slice(),
      args: buildInputValueDefMap(directiveIntrospection.args)
    });
  }
}
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$2(Object(source), true).forEach(function(key) {
        _defineProperty$2(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function extendSchema(schema, documentAST, options) {
  assertSchema(schema);
  documentAST != null && documentAST.kind === Kind.DOCUMENT || devAssert(0, "Must provide valid Document AST.");
  if ((options === null || options === void 0 ? void 0 : options.assumeValid) !== true && (options === null || options === void 0 ? void 0 : options.assumeValidSDL) !== true) {
    assertValidSDLExtension(documentAST, schema);
  }
  var schemaConfig = schema.toConfig();
  var extendedConfig = extendSchemaImpl(schemaConfig, documentAST, options);
  return schemaConfig === extendedConfig ? schema : new GraphQLSchema(extendedConfig);
}
function extendSchemaImpl(schemaConfig, documentAST, options) {
  var _schemaDef, _schemaDef$descriptio, _schemaDef2, _options$assumeValid;
  var typeDefs = [];
  var typeExtensionsMap = /* @__PURE__ */ Object.create(null);
  var directiveDefs = [];
  var schemaDef;
  var schemaExtensions = [];
  for (var _i2 = 0, _documentAST$definiti2 = documentAST.definitions; _i2 < _documentAST$definiti2.length; _i2++) {
    var def = _documentAST$definiti2[_i2];
    if (def.kind === Kind.SCHEMA_DEFINITION) {
      schemaDef = def;
    } else if (def.kind === Kind.SCHEMA_EXTENSION) {
      schemaExtensions.push(def);
    } else if (isTypeDefinitionNode(def)) {
      typeDefs.push(def);
    } else if (isTypeExtensionNode(def)) {
      var extendedTypeName = def.name.value;
      var existingTypeExtensions = typeExtensionsMap[extendedTypeName];
      typeExtensionsMap[extendedTypeName] = existingTypeExtensions ? existingTypeExtensions.concat([def]) : [def];
    } else if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      directiveDefs.push(def);
    }
  }
  if (Object.keys(typeExtensionsMap).length === 0 && typeDefs.length === 0 && directiveDefs.length === 0 && schemaExtensions.length === 0 && schemaDef == null) {
    return schemaConfig;
  }
  var typeMap = /* @__PURE__ */ Object.create(null);
  for (var _i4 = 0, _schemaConfig$types2 = schemaConfig.types; _i4 < _schemaConfig$types2.length; _i4++) {
    var existingType = _schemaConfig$types2[_i4];
    typeMap[existingType.name] = extendNamedType(existingType);
  }
  for (var _i6 = 0; _i6 < typeDefs.length; _i6++) {
    var _stdTypeMap$name;
    var typeNode = typeDefs[_i6];
    var name = typeNode.name.value;
    typeMap[name] = (_stdTypeMap$name = stdTypeMap[name]) !== null && _stdTypeMap$name !== void 0 ? _stdTypeMap$name : buildType(typeNode);
  }
  var operationTypes = _objectSpread$2(_objectSpread$2({
    query: schemaConfig.query && replaceNamedType(schemaConfig.query),
    mutation: schemaConfig.mutation && replaceNamedType(schemaConfig.mutation),
    subscription: schemaConfig.subscription && replaceNamedType(schemaConfig.subscription)
  }, schemaDef && getOperationTypes([schemaDef])), getOperationTypes(schemaExtensions));
  return _objectSpread$2(_objectSpread$2({
    description: (_schemaDef = schemaDef) === null || _schemaDef === void 0 ? void 0 : (_schemaDef$descriptio = _schemaDef.description) === null || _schemaDef$descriptio === void 0 ? void 0 : _schemaDef$descriptio.value
  }, operationTypes), {}, {
    types: objectValues$1(typeMap),
    directives: [].concat(schemaConfig.directives.map(replaceDirective), directiveDefs.map(buildDirective)),
    extensions: void 0,
    astNode: (_schemaDef2 = schemaDef) !== null && _schemaDef2 !== void 0 ? _schemaDef2 : schemaConfig.astNode,
    extensionASTNodes: schemaConfig.extensionASTNodes.concat(schemaExtensions),
    assumeValid: (_options$assumeValid = options === null || options === void 0 ? void 0 : options.assumeValid) !== null && _options$assumeValid !== void 0 ? _options$assumeValid : false
  });
  function replaceType(type) {
    if (isListType(type)) {
      return new GraphQLList(replaceType(type.ofType));
    }
    if (isNonNullType(type)) {
      return new GraphQLNonNull(replaceType(type.ofType));
    }
    return replaceNamedType(type);
  }
  function replaceNamedType(type) {
    return typeMap[type.name];
  }
  function replaceDirective(directive) {
    var config = directive.toConfig();
    return new GraphQLDirective(_objectSpread$2(_objectSpread$2({}, config), {}, {
      args: mapValue(config.args, extendArg)
    }));
  }
  function extendNamedType(type) {
    if (isIntrospectionType(type) || isSpecifiedScalarType(type)) {
      return type;
    }
    if (isScalarType(type)) {
      return extendScalarType(type);
    }
    if (isObjectType(type)) {
      return extendObjectType(type);
    }
    if (isInterfaceType(type)) {
      return extendInterfaceType(type);
    }
    if (isUnionType(type)) {
      return extendUnionType(type);
    }
    if (isEnumType(type)) {
      return extendEnumType(type);
    }
    if (isInputObjectType(type)) {
      return extendInputObjectType(type);
    }
    invariant(0, "Unexpected type: " + inspect(type));
  }
  function extendInputObjectType(type) {
    var _typeExtensionsMap$co;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$co = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co !== void 0 ? _typeExtensionsMap$co : [];
    return new GraphQLInputObjectType(_objectSpread$2(_objectSpread$2({}, config), {}, {
      fields: function fields7() {
        return _objectSpread$2(_objectSpread$2({}, mapValue(config.fields, function(field) {
          return _objectSpread$2(_objectSpread$2({}, field), {}, {
            type: replaceType(field.type)
          });
        })), buildInputFieldMap(extensions));
      },
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendEnumType(type) {
    var _typeExtensionsMap$ty;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$ty = typeExtensionsMap[type.name]) !== null && _typeExtensionsMap$ty !== void 0 ? _typeExtensionsMap$ty : [];
    return new GraphQLEnumType(_objectSpread$2(_objectSpread$2({}, config), {}, {
      values: _objectSpread$2(_objectSpread$2({}, config.values), buildEnumValueMap(extensions)),
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendScalarType(type) {
    var _typeExtensionsMap$co2;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$co2 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co2 !== void 0 ? _typeExtensionsMap$co2 : [];
    var specifiedByUrl = config.specifiedByUrl;
    for (var _i8 = 0; _i8 < extensions.length; _i8++) {
      var _getSpecifiedByUrl;
      var extensionNode = extensions[_i8];
      specifiedByUrl = (_getSpecifiedByUrl = getSpecifiedByUrl(extensionNode)) !== null && _getSpecifiedByUrl !== void 0 ? _getSpecifiedByUrl : specifiedByUrl;
    }
    return new GraphQLScalarType(_objectSpread$2(_objectSpread$2({}, config), {}, {
      specifiedByUrl,
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendObjectType(type) {
    var _typeExtensionsMap$co3;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$co3 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co3 !== void 0 ? _typeExtensionsMap$co3 : [];
    return new GraphQLObjectType(_objectSpread$2(_objectSpread$2({}, config), {}, {
      interfaces: function interfaces() {
        return [].concat(type.getInterfaces().map(replaceNamedType), buildInterfaces(extensions));
      },
      fields: function fields7() {
        return _objectSpread$2(_objectSpread$2({}, mapValue(config.fields, extendField)), buildFieldMap(extensions));
      },
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendInterfaceType(type) {
    var _typeExtensionsMap$co4;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$co4 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co4 !== void 0 ? _typeExtensionsMap$co4 : [];
    return new GraphQLInterfaceType(_objectSpread$2(_objectSpread$2({}, config), {}, {
      interfaces: function interfaces() {
        return [].concat(type.getInterfaces().map(replaceNamedType), buildInterfaces(extensions));
      },
      fields: function fields7() {
        return _objectSpread$2(_objectSpread$2({}, mapValue(config.fields, extendField)), buildFieldMap(extensions));
      },
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendUnionType(type) {
    var _typeExtensionsMap$co5;
    var config = type.toConfig();
    var extensions = (_typeExtensionsMap$co5 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co5 !== void 0 ? _typeExtensionsMap$co5 : [];
    return new GraphQLUnionType(_objectSpread$2(_objectSpread$2({}, config), {}, {
      types: function types2() {
        return [].concat(type.getTypes().map(replaceNamedType), buildUnionTypes(extensions));
      },
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    }));
  }
  function extendField(field) {
    return _objectSpread$2(_objectSpread$2({}, field), {}, {
      type: replaceType(field.type),
      args: mapValue(field.args, extendArg)
    });
  }
  function extendArg(arg) {
    return _objectSpread$2(_objectSpread$2({}, arg), {}, {
      type: replaceType(arg.type)
    });
  }
  function getOperationTypes(nodes) {
    var opTypes = {};
    for (var _i10 = 0; _i10 < nodes.length; _i10++) {
      var _node$operationTypes;
      var node = nodes[_i10];
      var operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : [];
      for (var _i12 = 0; _i12 < operationTypesNodes.length; _i12++) {
        var operationType = operationTypesNodes[_i12];
        opTypes[operationType.operation] = getNamedType2(operationType.type);
      }
    }
    return opTypes;
  }
  function getNamedType2(node) {
    var _stdTypeMap$name2;
    var name2 = node.name.value;
    var type = (_stdTypeMap$name2 = stdTypeMap[name2]) !== null && _stdTypeMap$name2 !== void 0 ? _stdTypeMap$name2 : typeMap[name2];
    if (type === void 0) {
      throw new Error('Unknown type: "'.concat(name2, '".'));
    }
    return type;
  }
  function getWrappedType(node) {
    if (node.kind === Kind.LIST_TYPE) {
      return new GraphQLList(getWrappedType(node.type));
    }
    if (node.kind === Kind.NON_NULL_TYPE) {
      return new GraphQLNonNull(getWrappedType(node.type));
    }
    return getNamedType2(node);
  }
  function buildDirective(node) {
    var locations = node.locations.map(function(_ref) {
      var value = _ref.value;
      return value;
    });
    return new GraphQLDirective({
      name: node.name.value,
      description: getDescription(node, options),
      locations,
      isRepeatable: node.repeatable,
      args: buildArgumentMap(node.arguments),
      astNode: node
    });
  }
  function buildFieldMap(nodes) {
    var fieldConfigMap = /* @__PURE__ */ Object.create(null);
    for (var _i14 = 0; _i14 < nodes.length; _i14++) {
      var _node$fields;
      var node = nodes[_i14];
      var nodeFields = (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : [];
      for (var _i16 = 0; _i16 < nodeFields.length; _i16++) {
        var field = nodeFields[_i16];
        fieldConfigMap[field.name.value] = {
          type: getWrappedType(field.type),
          description: getDescription(field, options),
          args: buildArgumentMap(field.arguments),
          deprecationReason: getDeprecationReason(field),
          astNode: field
        };
      }
    }
    return fieldConfigMap;
  }
  function buildArgumentMap(args) {
    var argsNodes = args !== null && args !== void 0 ? args : [];
    var argConfigMap = /* @__PURE__ */ Object.create(null);
    for (var _i18 = 0; _i18 < argsNodes.length; _i18++) {
      var arg = argsNodes[_i18];
      var type = getWrappedType(arg.type);
      argConfigMap[arg.name.value] = {
        type,
        description: getDescription(arg, options),
        defaultValue: valueFromAST(arg.defaultValue, type),
        deprecationReason: getDeprecationReason(arg),
        astNode: arg
      };
    }
    return argConfigMap;
  }
  function buildInputFieldMap(nodes) {
    var inputFieldMap = /* @__PURE__ */ Object.create(null);
    for (var _i20 = 0; _i20 < nodes.length; _i20++) {
      var _node$fields2;
      var node = nodes[_i20];
      var fieldsNodes = (_node$fields2 = node.fields) !== null && _node$fields2 !== void 0 ? _node$fields2 : [];
      for (var _i22 = 0; _i22 < fieldsNodes.length; _i22++) {
        var field = fieldsNodes[_i22];
        var type = getWrappedType(field.type);
        inputFieldMap[field.name.value] = {
          type,
          description: getDescription(field, options),
          defaultValue: valueFromAST(field.defaultValue, type),
          deprecationReason: getDeprecationReason(field),
          astNode: field
        };
      }
    }
    return inputFieldMap;
  }
  function buildEnumValueMap(nodes) {
    var enumValueMap = /* @__PURE__ */ Object.create(null);
    for (var _i24 = 0; _i24 < nodes.length; _i24++) {
      var _node$values;
      var node = nodes[_i24];
      var valuesNodes = (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : [];
      for (var _i26 = 0; _i26 < valuesNodes.length; _i26++) {
        var value = valuesNodes[_i26];
        enumValueMap[value.name.value] = {
          description: getDescription(value, options),
          deprecationReason: getDeprecationReason(value),
          astNode: value
        };
      }
    }
    return enumValueMap;
  }
  function buildInterfaces(nodes) {
    var interfaces = [];
    for (var _i28 = 0; _i28 < nodes.length; _i28++) {
      var _node$interfaces;
      var node = nodes[_i28];
      var interfacesNodes = (_node$interfaces = node.interfaces) !== null && _node$interfaces !== void 0 ? _node$interfaces : [];
      for (var _i30 = 0; _i30 < interfacesNodes.length; _i30++) {
        var type = interfacesNodes[_i30];
        interfaces.push(getNamedType2(type));
      }
    }
    return interfaces;
  }
  function buildUnionTypes(nodes) {
    var types2 = [];
    for (var _i32 = 0; _i32 < nodes.length; _i32++) {
      var _node$types;
      var node = nodes[_i32];
      var typeNodes = (_node$types = node.types) !== null && _node$types !== void 0 ? _node$types : [];
      for (var _i34 = 0; _i34 < typeNodes.length; _i34++) {
        var type = typeNodes[_i34];
        types2.push(getNamedType2(type));
      }
    }
    return types2;
  }
  function buildType(astNode) {
    var _typeExtensionsMap$na;
    var name2 = astNode.name.value;
    var description = getDescription(astNode, options);
    var extensionNodes = (_typeExtensionsMap$na = typeExtensionsMap[name2]) !== null && _typeExtensionsMap$na !== void 0 ? _typeExtensionsMap$na : [];
    switch (astNode.kind) {
      case Kind.OBJECT_TYPE_DEFINITION: {
        var extensionASTNodes = extensionNodes;
        var allNodes = [astNode].concat(extensionASTNodes);
        return new GraphQLObjectType({
          name: name2,
          description,
          interfaces: function interfaces() {
            return buildInterfaces(allNodes);
          },
          fields: function fields7() {
            return buildFieldMap(allNodes);
          },
          astNode,
          extensionASTNodes
        });
      }
      case Kind.INTERFACE_TYPE_DEFINITION: {
        var _extensionASTNodes = extensionNodes;
        var _allNodes = [astNode].concat(_extensionASTNodes);
        return new GraphQLInterfaceType({
          name: name2,
          description,
          interfaces: function interfaces() {
            return buildInterfaces(_allNodes);
          },
          fields: function fields7() {
            return buildFieldMap(_allNodes);
          },
          astNode,
          extensionASTNodes: _extensionASTNodes
        });
      }
      case Kind.ENUM_TYPE_DEFINITION: {
        var _extensionASTNodes2 = extensionNodes;
        var _allNodes2 = [astNode].concat(_extensionASTNodes2);
        return new GraphQLEnumType({
          name: name2,
          description,
          values: buildEnumValueMap(_allNodes2),
          astNode,
          extensionASTNodes: _extensionASTNodes2
        });
      }
      case Kind.UNION_TYPE_DEFINITION: {
        var _extensionASTNodes3 = extensionNodes;
        var _allNodes3 = [astNode].concat(_extensionASTNodes3);
        return new GraphQLUnionType({
          name: name2,
          description,
          types: function types2() {
            return buildUnionTypes(_allNodes3);
          },
          astNode,
          extensionASTNodes: _extensionASTNodes3
        });
      }
      case Kind.SCALAR_TYPE_DEFINITION: {
        var _extensionASTNodes4 = extensionNodes;
        return new GraphQLScalarType({
          name: name2,
          description,
          specifiedByUrl: getSpecifiedByUrl(astNode),
          astNode,
          extensionASTNodes: _extensionASTNodes4
        });
      }
      case Kind.INPUT_OBJECT_TYPE_DEFINITION: {
        var _extensionASTNodes5 = extensionNodes;
        var _allNodes4 = [astNode].concat(_extensionASTNodes5);
        return new GraphQLInputObjectType({
          name: name2,
          description,
          fields: function fields7() {
            return buildInputFieldMap(_allNodes4);
          },
          astNode,
          extensionASTNodes: _extensionASTNodes5
        });
      }
    }
    invariant(0, "Unexpected type definition node: " + inspect(astNode));
  }
}
var stdTypeMap = keyMap(specifiedScalarTypes.concat(introspectionTypes), function(type) {
  return type.name;
});
function getDeprecationReason(node) {
  var deprecated = getDirectiveValues(GraphQLDeprecatedDirective, node);
  return deprecated === null || deprecated === void 0 ? void 0 : deprecated.reason;
}
function getSpecifiedByUrl(node) {
  var specifiedBy = getDirectiveValues(GraphQLSpecifiedByDirective, node);
  return specifiedBy === null || specifiedBy === void 0 ? void 0 : specifiedBy.url;
}
function getDescription(node, options) {
  if (node.description) {
    return node.description.value;
  }
  if ((options === null || options === void 0 ? void 0 : options.commentDescriptions) === true) {
    var rawValue = getLeadingCommentBlock(node);
    if (rawValue !== void 0) {
      return dedentBlockStringValue("\n" + rawValue);
    }
  }
}
function getLeadingCommentBlock(node) {
  var loc = node.loc;
  if (!loc) {
    return;
  }
  var comments = [];
  var token = loc.startToken.prev;
  while (token != null && token.kind === TokenKind.COMMENT && token.next && token.prev && token.line + 1 === token.next.line && token.line !== token.prev.line) {
    var value = String(token.value);
    comments.push(value);
    token = token.prev;
  }
  return comments.length > 0 ? comments.reverse().join("\n") : void 0;
}
function buildASTSchema(documentAST, options) {
  documentAST != null && documentAST.kind === Kind.DOCUMENT || devAssert(0, "Must provide valid Document AST.");
  if ((options === null || options === void 0 ? void 0 : options.assumeValid) !== true && (options === null || options === void 0 ? void 0 : options.assumeValidSDL) !== true) {
    assertValidSDL(documentAST);
  }
  var emptySchemaConfig = {
    description: void 0,
    types: [],
    directives: [],
    extensions: void 0,
    extensionASTNodes: [],
    assumeValid: false
  };
  var config = extendSchemaImpl(emptySchemaConfig, documentAST, options);
  if (config.astNode == null) {
    for (var _i2 = 0, _config$types2 = config.types; _i2 < _config$types2.length; _i2++) {
      var type = _config$types2[_i2];
      switch (type.name) {
        case "Query":
          config.query = type;
          break;
        case "Mutation":
          config.mutation = type;
          break;
        case "Subscription":
          config.subscription = type;
          break;
      }
    }
  }
  var directives = config.directives;
  var _loop = function _loop2(_i42) {
    var stdDirective = specifiedDirectives[_i42];
    if (directives.every(function(directive) {
      return directive.name !== stdDirective.name;
    })) {
      directives.push(stdDirective);
    }
  };
  for (var _i4 = 0; _i4 < specifiedDirectives.length; _i4++) {
    _loop(_i4);
  }
  return new GraphQLSchema(config);
}
function buildSchema(source, options) {
  var document2 = parse(source, {
    noLocation: options === null || options === void 0 ? void 0 : options.noLocation,
    allowLegacySDLEmptyFields: options === null || options === void 0 ? void 0 : options.allowLegacySDLEmptyFields,
    allowLegacySDLImplementsInterfaces: options === null || options === void 0 ? void 0 : options.allowLegacySDLImplementsInterfaces,
    experimentalFragmentVariables: options === null || options === void 0 ? void 0 : options.experimentalFragmentVariables
  });
  return buildASTSchema(document2, {
    commentDescriptions: options === null || options === void 0 ? void 0 : options.commentDescriptions,
    assumeValidSDL: options === null || options === void 0 ? void 0 : options.assumeValidSDL,
    assumeValid: options === null || options === void 0 ? void 0 : options.assumeValid
  });
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function(key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function lexicographicSortSchema(schema) {
  var schemaConfig = schema.toConfig();
  var typeMap = keyValMap(sortByName(schemaConfig.types), function(type) {
    return type.name;
  }, sortNamedType);
  return new GraphQLSchema(_objectSpread$1(_objectSpread$1({}, schemaConfig), {}, {
    types: objectValues$1(typeMap),
    directives: sortByName(schemaConfig.directives).map(sortDirective),
    query: replaceMaybeType(schemaConfig.query),
    mutation: replaceMaybeType(schemaConfig.mutation),
    subscription: replaceMaybeType(schemaConfig.subscription)
  }));
  function replaceType(type) {
    if (isListType(type)) {
      return new GraphQLList(replaceType(type.ofType));
    } else if (isNonNullType(type)) {
      return new GraphQLNonNull(replaceType(type.ofType));
    }
    return replaceNamedType(type);
  }
  function replaceNamedType(type) {
    return typeMap[type.name];
  }
  function replaceMaybeType(maybeType) {
    return maybeType && replaceNamedType(maybeType);
  }
  function sortDirective(directive) {
    var config = directive.toConfig();
    return new GraphQLDirective(_objectSpread$1(_objectSpread$1({}, config), {}, {
      locations: sortBy(config.locations, function(x2) {
        return x2;
      }),
      args: sortArgs(config.args)
    }));
  }
  function sortArgs(args) {
    return sortObjMap(args, function(arg) {
      return _objectSpread$1(_objectSpread$1({}, arg), {}, {
        type: replaceType(arg.type)
      });
    });
  }
  function sortFields(fieldsMap) {
    return sortObjMap(fieldsMap, function(field) {
      return _objectSpread$1(_objectSpread$1({}, field), {}, {
        type: replaceType(field.type),
        args: sortArgs(field.args)
      });
    });
  }
  function sortInputFields(fieldsMap) {
    return sortObjMap(fieldsMap, function(field) {
      return _objectSpread$1(_objectSpread$1({}, field), {}, {
        type: replaceType(field.type)
      });
    });
  }
  function sortTypes(arr) {
    return sortByName(arr).map(replaceNamedType);
  }
  function sortNamedType(type) {
    if (isScalarType(type) || isIntrospectionType(type)) {
      return type;
    }
    if (isObjectType(type)) {
      var config = type.toConfig();
      return new GraphQLObjectType(_objectSpread$1(_objectSpread$1({}, config), {}, {
        interfaces: function interfaces() {
          return sortTypes(config.interfaces);
        },
        fields: function fields7() {
          return sortFields(config.fields);
        }
      }));
    }
    if (isInterfaceType(type)) {
      var _config = type.toConfig();
      return new GraphQLInterfaceType(_objectSpread$1(_objectSpread$1({}, _config), {}, {
        interfaces: function interfaces() {
          return sortTypes(_config.interfaces);
        },
        fields: function fields7() {
          return sortFields(_config.fields);
        }
      }));
    }
    if (isUnionType(type)) {
      var _config2 = type.toConfig();
      return new GraphQLUnionType(_objectSpread$1(_objectSpread$1({}, _config2), {}, {
        types: function types2() {
          return sortTypes(_config2.types);
        }
      }));
    }
    if (isEnumType(type)) {
      var _config3 = type.toConfig();
      return new GraphQLEnumType(_objectSpread$1(_objectSpread$1({}, _config3), {}, {
        values: sortObjMap(_config3.values)
      }));
    }
    if (isInputObjectType(type)) {
      var _config4 = type.toConfig();
      return new GraphQLInputObjectType(_objectSpread$1(_objectSpread$1({}, _config4), {}, {
        fields: function fields7() {
          return sortInputFields(_config4.fields);
        }
      }));
    }
    invariant(0, "Unexpected type: " + inspect(type));
  }
}
function sortObjMap(map, sortValueFn) {
  var sortedMap = /* @__PURE__ */ Object.create(null);
  var sortedKeys = sortBy(Object.keys(map), function(x2) {
    return x2;
  });
  for (var _i2 = 0; _i2 < sortedKeys.length; _i2++) {
    var key = sortedKeys[_i2];
    var value = map[key];
    sortedMap[key] = sortValueFn ? sortValueFn(value) : value;
  }
  return sortedMap;
}
function sortByName(array) {
  return sortBy(array, function(obj) {
    return obj.name;
  });
}
function sortBy(array, mapToKey) {
  return array.slice().sort(function(obj1, obj2) {
    var key1 = mapToKey(obj1);
    var key2 = mapToKey(obj2);
    return naturalCompare(key1, key2);
  });
}
function printSchema(schema, options) {
  return printFilteredSchema(schema, function(n2) {
    return !isSpecifiedDirective(n2);
  }, isDefinedType, options);
}
function printIntrospectionSchema(schema, options) {
  return printFilteredSchema(schema, isSpecifiedDirective, isIntrospectionType, options);
}
function isDefinedType(type) {
  return !isSpecifiedScalarType(type) && !isIntrospectionType(type);
}
function printFilteredSchema(schema, directiveFilter, typeFilter, options) {
  var directives = schema.getDirectives().filter(directiveFilter);
  var types2 = objectValues$1(schema.getTypeMap()).filter(typeFilter);
  return [printSchemaDefinition(schema)].concat(directives.map(function(directive) {
    return printDirective(directive, options);
  }), types2.map(function(type) {
    return printType(type, options);
  })).filter(Boolean).join("\n\n") + "\n";
}
function printSchemaDefinition(schema) {
  if (schema.description == null && isSchemaOfCommonNames(schema)) {
    return;
  }
  var operationTypes = [];
  var queryType = schema.getQueryType();
  if (queryType) {
    operationTypes.push("  query: ".concat(queryType.name));
  }
  var mutationType = schema.getMutationType();
  if (mutationType) {
    operationTypes.push("  mutation: ".concat(mutationType.name));
  }
  var subscriptionType = schema.getSubscriptionType();
  if (subscriptionType) {
    operationTypes.push("  subscription: ".concat(subscriptionType.name));
  }
  return printDescription({}, schema) + "schema {\n".concat(operationTypes.join("\n"), "\n}");
}
function isSchemaOfCommonNames(schema) {
  var queryType = schema.getQueryType();
  if (queryType && queryType.name !== "Query") {
    return false;
  }
  var mutationType = schema.getMutationType();
  if (mutationType && mutationType.name !== "Mutation") {
    return false;
  }
  var subscriptionType = schema.getSubscriptionType();
  if (subscriptionType && subscriptionType.name !== "Subscription") {
    return false;
  }
  return true;
}
function printType(type, options) {
  if (isScalarType(type)) {
    return printScalar(type, options);
  }
  if (isObjectType(type)) {
    return printObject(type, options);
  }
  if (isInterfaceType(type)) {
    return printInterface(type, options);
  }
  if (isUnionType(type)) {
    return printUnion(type, options);
  }
  if (isEnumType(type)) {
    return printEnum(type, options);
  }
  if (isInputObjectType(type)) {
    return printInputObject(type, options);
  }
  invariant(0, "Unexpected type: " + inspect(type));
}
function printScalar(type, options) {
  return printDescription(options, type) + "scalar ".concat(type.name) + printSpecifiedByUrl(type);
}
function printImplementedInterfaces(type) {
  var interfaces = type.getInterfaces();
  return interfaces.length ? " implements " + interfaces.map(function(i) {
    return i.name;
  }).join(" & ") : "";
}
function printObject(type, options) {
  return printDescription(options, type) + "type ".concat(type.name) + printImplementedInterfaces(type) + printFields(options, type);
}
function printInterface(type, options) {
  return printDescription(options, type) + "interface ".concat(type.name) + printImplementedInterfaces(type) + printFields(options, type);
}
function printUnion(type, options) {
  var types2 = type.getTypes();
  var possibleTypes = types2.length ? " = " + types2.join(" | ") : "";
  return printDescription(options, type) + "union " + type.name + possibleTypes;
}
function printEnum(type, options) {
  var values = type.getValues().map(function(value, i) {
    return printDescription(options, value, "  ", !i) + "  " + value.name + printDeprecated(value.deprecationReason);
  });
  return printDescription(options, type) + "enum ".concat(type.name) + printBlock(values);
}
function printInputObject(type, options) {
  var fields7 = objectValues$1(type.getFields()).map(function(f2, i) {
    return printDescription(options, f2, "  ", !i) + "  " + printInputValue(f2);
  });
  return printDescription(options, type) + "input ".concat(type.name) + printBlock(fields7);
}
function printFields(options, type) {
  var fields7 = objectValues$1(type.getFields()).map(function(f2, i) {
    return printDescription(options, f2, "  ", !i) + "  " + f2.name + printArgs(options, f2.args, "  ") + ": " + String(f2.type) + printDeprecated(f2.deprecationReason);
  });
  return printBlock(fields7);
}
function printBlock(items) {
  return items.length !== 0 ? " {\n" + items.join("\n") + "\n}" : "";
}
function printArgs(options, args) {
  var indentation = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  if (args.length === 0) {
    return "";
  }
  if (args.every(function(arg) {
    return !arg.description;
  })) {
    return "(" + args.map(printInputValue).join(", ") + ")";
  }
  return "(\n" + args.map(function(arg, i) {
    return printDescription(options, arg, "  " + indentation, !i) + "  " + indentation + printInputValue(arg);
  }).join("\n") + "\n" + indentation + ")";
}
function printInputValue(arg) {
  var defaultAST = astFromValue(arg.defaultValue, arg.type);
  var argDecl = arg.name + ": " + String(arg.type);
  if (defaultAST) {
    argDecl += " = ".concat(print(defaultAST));
  }
  return argDecl + printDeprecated(arg.deprecationReason);
}
function printDirective(directive, options) {
  return printDescription(options, directive) + "directive @" + directive.name + printArgs(options, directive.args) + (directive.isRepeatable ? " repeatable" : "") + " on " + directive.locations.join(" | ");
}
function printDeprecated(reason) {
  if (reason == null) {
    return "";
  }
  var reasonAST = astFromValue(reason, GraphQLString);
  if (reasonAST && reason !== DEFAULT_DEPRECATION_REASON) {
    return " @deprecated(reason: " + print(reasonAST) + ")";
  }
  return " @deprecated";
}
function printSpecifiedByUrl(scalar) {
  if (scalar.specifiedByUrl == null) {
    return "";
  }
  var url = scalar.specifiedByUrl;
  var urlAST = astFromValue(url, GraphQLString);
  urlAST || invariant(0, "Unexpected null value returned from `astFromValue` for specifiedByUrl");
  return " @specifiedBy(url: " + print(urlAST) + ")";
}
function printDescription(options, def) {
  var indentation = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  var firstInBlock = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
  var description = def.description;
  if (description == null) {
    return "";
  }
  if ((options === null || options === void 0 ? void 0 : options.commentDescriptions) === true) {
    return printDescriptionWithComments(description, indentation, firstInBlock);
  }
  var preferMultipleLines = description.length > 70;
  var blockString = printBlockString(description, "", preferMultipleLines);
  var prefix = indentation && !firstInBlock ? "\n" + indentation : indentation;
  return prefix + blockString.replace(/\n/g, "\n" + indentation) + "\n";
}
function printDescriptionWithComments(description, indentation, firstInBlock) {
  var prefix = indentation && !firstInBlock ? "\n" : "";
  var comment = description.split("\n").map(function(line) {
    return indentation + (line !== "" ? "# " + line : "#");
  }).join("\n");
  return prefix + comment + "\n";
}
function concatAST(documents) {
  var definitions = [];
  for (var _i2 = 0; _i2 < documents.length; _i2++) {
    var doc = documents[_i2];
    definitions = definitions.concat(doc.definitions);
  }
  return {
    kind: "Document",
    definitions
  };
}
function separateOperations(documentAST) {
  var operations = [];
  var depGraph = /* @__PURE__ */ Object.create(null);
  for (var _i2 = 0, _documentAST$definiti2 = documentAST.definitions; _i2 < _documentAST$definiti2.length; _i2++) {
    var definitionNode = _documentAST$definiti2[_i2];
    switch (definitionNode.kind) {
      case Kind.OPERATION_DEFINITION:
        operations.push(definitionNode);
        break;
      case Kind.FRAGMENT_DEFINITION:
        depGraph[definitionNode.name.value] = collectDependencies(definitionNode.selectionSet);
        break;
    }
  }
  var separatedDocumentASTs = /* @__PURE__ */ Object.create(null);
  var _loop = function _loop2(_i42) {
    var operation = operations[_i42];
    var dependencies = /* @__PURE__ */ new Set();
    for (var _i6 = 0, _collectDependencies2 = collectDependencies(operation.selectionSet); _i6 < _collectDependencies2.length; _i6++) {
      var fragmentName = _collectDependencies2[_i6];
      collectTransitiveDependencies(dependencies, depGraph, fragmentName);
    }
    var operationName = operation.name ? operation.name.value : "";
    separatedDocumentASTs[operationName] = {
      kind: Kind.DOCUMENT,
      definitions: documentAST.definitions.filter(function(node) {
        return node === operation || node.kind === Kind.FRAGMENT_DEFINITION && dependencies.has(node.name.value);
      })
    };
  };
  for (var _i4 = 0; _i4 < operations.length; _i4++) {
    _loop(_i4);
  }
  return separatedDocumentASTs;
}
function collectTransitiveDependencies(collected, depGraph, fromName) {
  if (!collected.has(fromName)) {
    collected.add(fromName);
    var immediateDeps = depGraph[fromName];
    if (immediateDeps !== void 0) {
      for (var _i8 = 0; _i8 < immediateDeps.length; _i8++) {
        var toName = immediateDeps[_i8];
        collectTransitiveDependencies(collected, depGraph, toName);
      }
    }
  }
}
function collectDependencies(selectionSet) {
  var dependencies = [];
  visit(selectionSet, {
    FragmentSpread: function FragmentSpread2(node) {
      dependencies.push(node.name.value);
    }
  });
  return dependencies;
}
function stripIgnoredCharacters(source) {
  var sourceObj = isSource(source) ? source : new Source(source);
  var body = sourceObj.body;
  var lexer = new Lexer(sourceObj);
  var strippedBody = "";
  var wasLastAddedTokenNonPunctuator = false;
  while (lexer.advance().kind !== TokenKind.EOF) {
    var currentToken = lexer.token;
    var tokenKind = currentToken.kind;
    var isNonPunctuator = !isPunctuatorTokenKind(currentToken.kind);
    if (wasLastAddedTokenNonPunctuator) {
      if (isNonPunctuator || currentToken.kind === TokenKind.SPREAD) {
        strippedBody += " ";
      }
    }
    var tokenBody = body.slice(currentToken.start, currentToken.end);
    if (tokenKind === TokenKind.BLOCK_STRING) {
      strippedBody += dedentBlockString(tokenBody);
    } else {
      strippedBody += tokenBody;
    }
    wasLastAddedTokenNonPunctuator = isNonPunctuator;
  }
  return strippedBody;
}
function dedentBlockString(blockStr) {
  var rawStr = blockStr.slice(3, -3);
  var body = dedentBlockStringValue(rawStr);
  if (getBlockStringIndentation(body) > 0) {
    body = "\n" + body;
  }
  var lastChar = body[body.length - 1];
  var hasTrailingQuote = lastChar === '"' && body.slice(-4) !== '\\"""';
  if (hasTrailingQuote || lastChar === "\\") {
    body += "\n";
  }
  return '"""' + body + '"""';
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var BreakingChangeType = Object.freeze({
  TYPE_REMOVED: "TYPE_REMOVED",
  TYPE_CHANGED_KIND: "TYPE_CHANGED_KIND",
  TYPE_REMOVED_FROM_UNION: "TYPE_REMOVED_FROM_UNION",
  VALUE_REMOVED_FROM_ENUM: "VALUE_REMOVED_FROM_ENUM",
  REQUIRED_INPUT_FIELD_ADDED: "REQUIRED_INPUT_FIELD_ADDED",
  IMPLEMENTED_INTERFACE_REMOVED: "IMPLEMENTED_INTERFACE_REMOVED",
  FIELD_REMOVED: "FIELD_REMOVED",
  FIELD_CHANGED_KIND: "FIELD_CHANGED_KIND",
  REQUIRED_ARG_ADDED: "REQUIRED_ARG_ADDED",
  ARG_REMOVED: "ARG_REMOVED",
  ARG_CHANGED_KIND: "ARG_CHANGED_KIND",
  DIRECTIVE_REMOVED: "DIRECTIVE_REMOVED",
  DIRECTIVE_ARG_REMOVED: "DIRECTIVE_ARG_REMOVED",
  REQUIRED_DIRECTIVE_ARG_ADDED: "REQUIRED_DIRECTIVE_ARG_ADDED",
  DIRECTIVE_REPEATABLE_REMOVED: "DIRECTIVE_REPEATABLE_REMOVED",
  DIRECTIVE_LOCATION_REMOVED: "DIRECTIVE_LOCATION_REMOVED"
});
var DangerousChangeType = Object.freeze({
  VALUE_ADDED_TO_ENUM: "VALUE_ADDED_TO_ENUM",
  TYPE_ADDED_TO_UNION: "TYPE_ADDED_TO_UNION",
  OPTIONAL_INPUT_FIELD_ADDED: "OPTIONAL_INPUT_FIELD_ADDED",
  OPTIONAL_ARG_ADDED: "OPTIONAL_ARG_ADDED",
  IMPLEMENTED_INTERFACE_ADDED: "IMPLEMENTED_INTERFACE_ADDED",
  ARG_DEFAULT_VALUE_CHANGE: "ARG_DEFAULT_VALUE_CHANGE"
});
function findBreakingChanges(oldSchema, newSchema) {
  var breakingChanges = findSchemaChanges(oldSchema, newSchema).filter(function(change) {
    return change.type in BreakingChangeType;
  });
  return breakingChanges;
}
function findDangerousChanges(oldSchema, newSchema) {
  var dangerousChanges = findSchemaChanges(oldSchema, newSchema).filter(function(change) {
    return change.type in DangerousChangeType;
  });
  return dangerousChanges;
}
function findSchemaChanges(oldSchema, newSchema) {
  return [].concat(findTypeChanges(oldSchema, newSchema), findDirectiveChanges(oldSchema, newSchema));
}
function findDirectiveChanges(oldSchema, newSchema) {
  var schemaChanges = [];
  var directivesDiff = diff(oldSchema.getDirectives(), newSchema.getDirectives());
  for (var _i2 = 0, _directivesDiff$remov2 = directivesDiff.removed; _i2 < _directivesDiff$remov2.length; _i2++) {
    var oldDirective = _directivesDiff$remov2[_i2];
    schemaChanges.push({
      type: BreakingChangeType.DIRECTIVE_REMOVED,
      description: "".concat(oldDirective.name, " was removed.")
    });
  }
  for (var _i4 = 0, _directivesDiff$persi2 = directivesDiff.persisted; _i4 < _directivesDiff$persi2.length; _i4++) {
    var _ref2 = _directivesDiff$persi2[_i4];
    var _oldDirective = _ref2[0];
    var newDirective = _ref2[1];
    var argsDiff = diff(_oldDirective.args, newDirective.args);
    for (var _i6 = 0, _argsDiff$added2 = argsDiff.added; _i6 < _argsDiff$added2.length; _i6++) {
      var newArg = _argsDiff$added2[_i6];
      if (isRequiredArgument(newArg)) {
        schemaChanges.push({
          type: BreakingChangeType.REQUIRED_DIRECTIVE_ARG_ADDED,
          description: "A required arg ".concat(newArg.name, " on directive ").concat(_oldDirective.name, " was added.")
        });
      }
    }
    for (var _i8 = 0, _argsDiff$removed2 = argsDiff.removed; _i8 < _argsDiff$removed2.length; _i8++) {
      var oldArg = _argsDiff$removed2[_i8];
      schemaChanges.push({
        type: BreakingChangeType.DIRECTIVE_ARG_REMOVED,
        description: "".concat(oldArg.name, " was removed from ").concat(_oldDirective.name, ".")
      });
    }
    if (_oldDirective.isRepeatable && !newDirective.isRepeatable) {
      schemaChanges.push({
        type: BreakingChangeType.DIRECTIVE_REPEATABLE_REMOVED,
        description: "Repeatable flag was removed from ".concat(_oldDirective.name, ".")
      });
    }
    for (var _i10 = 0, _oldDirective$locatio2 = _oldDirective.locations; _i10 < _oldDirective$locatio2.length; _i10++) {
      var location = _oldDirective$locatio2[_i10];
      if (newDirective.locations.indexOf(location) === -1) {
        schemaChanges.push({
          type: BreakingChangeType.DIRECTIVE_LOCATION_REMOVED,
          description: "".concat(location, " was removed from ").concat(_oldDirective.name, ".")
        });
      }
    }
  }
  return schemaChanges;
}
function findTypeChanges(oldSchema, newSchema) {
  var schemaChanges = [];
  var typesDiff = diff(objectValues$1(oldSchema.getTypeMap()), objectValues$1(newSchema.getTypeMap()));
  for (var _i12 = 0, _typesDiff$removed2 = typesDiff.removed; _i12 < _typesDiff$removed2.length; _i12++) {
    var oldType = _typesDiff$removed2[_i12];
    schemaChanges.push({
      type: BreakingChangeType.TYPE_REMOVED,
      description: isSpecifiedScalarType(oldType) ? "Standard scalar ".concat(oldType.name, " was removed because it is not referenced anymore.") : "".concat(oldType.name, " was removed.")
    });
  }
  for (var _i14 = 0, _typesDiff$persisted2 = typesDiff.persisted; _i14 < _typesDiff$persisted2.length; _i14++) {
    var _ref4 = _typesDiff$persisted2[_i14];
    var _oldType = _ref4[0];
    var newType = _ref4[1];
    if (isEnumType(_oldType) && isEnumType(newType)) {
      schemaChanges.push.apply(schemaChanges, findEnumTypeChanges(_oldType, newType));
    } else if (isUnionType(_oldType) && isUnionType(newType)) {
      schemaChanges.push.apply(schemaChanges, findUnionTypeChanges(_oldType, newType));
    } else if (isInputObjectType(_oldType) && isInputObjectType(newType)) {
      schemaChanges.push.apply(schemaChanges, findInputObjectTypeChanges(_oldType, newType));
    } else if (isObjectType(_oldType) && isObjectType(newType)) {
      schemaChanges.push.apply(schemaChanges, findFieldChanges(_oldType, newType).concat(findImplementedInterfacesChanges(_oldType, newType)));
    } else if (isInterfaceType(_oldType) && isInterfaceType(newType)) {
      schemaChanges.push.apply(schemaChanges, findFieldChanges(_oldType, newType).concat(findImplementedInterfacesChanges(_oldType, newType)));
    } else if (_oldType.constructor !== newType.constructor) {
      schemaChanges.push({
        type: BreakingChangeType.TYPE_CHANGED_KIND,
        description: "".concat(_oldType.name, " changed from ") + "".concat(typeKindName(_oldType), " to ").concat(typeKindName(newType), ".")
      });
    }
  }
  return schemaChanges;
}
function findInputObjectTypeChanges(oldType, newType) {
  var schemaChanges = [];
  var fieldsDiff = diff(objectValues$1(oldType.getFields()), objectValues$1(newType.getFields()));
  for (var _i16 = 0, _fieldsDiff$added2 = fieldsDiff.added; _i16 < _fieldsDiff$added2.length; _i16++) {
    var newField = _fieldsDiff$added2[_i16];
    if (isRequiredInputField(newField)) {
      schemaChanges.push({
        type: BreakingChangeType.REQUIRED_INPUT_FIELD_ADDED,
        description: "A required field ".concat(newField.name, " on input type ").concat(oldType.name, " was added.")
      });
    } else {
      schemaChanges.push({
        type: DangerousChangeType.OPTIONAL_INPUT_FIELD_ADDED,
        description: "An optional field ".concat(newField.name, " on input type ").concat(oldType.name, " was added.")
      });
    }
  }
  for (var _i18 = 0, _fieldsDiff$removed2 = fieldsDiff.removed; _i18 < _fieldsDiff$removed2.length; _i18++) {
    var oldField = _fieldsDiff$removed2[_i18];
    schemaChanges.push({
      type: BreakingChangeType.FIELD_REMOVED,
      description: "".concat(oldType.name, ".").concat(oldField.name, " was removed.")
    });
  }
  for (var _i20 = 0, _fieldsDiff$persisted2 = fieldsDiff.persisted; _i20 < _fieldsDiff$persisted2.length; _i20++) {
    var _ref6 = _fieldsDiff$persisted2[_i20];
    var _oldField = _ref6[0];
    var _newField = _ref6[1];
    var isSafe = isChangeSafeForInputObjectFieldOrFieldArg(_oldField.type, _newField.type);
    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.FIELD_CHANGED_KIND,
        description: "".concat(oldType.name, ".").concat(_oldField.name, " changed type from ") + "".concat(String(_oldField.type), " to ").concat(String(_newField.type), ".")
      });
    }
  }
  return schemaChanges;
}
function findUnionTypeChanges(oldType, newType) {
  var schemaChanges = [];
  var possibleTypesDiff = diff(oldType.getTypes(), newType.getTypes());
  for (var _i22 = 0, _possibleTypesDiff$ad2 = possibleTypesDiff.added; _i22 < _possibleTypesDiff$ad2.length; _i22++) {
    var newPossibleType = _possibleTypesDiff$ad2[_i22];
    schemaChanges.push({
      type: DangerousChangeType.TYPE_ADDED_TO_UNION,
      description: "".concat(newPossibleType.name, " was added to union type ").concat(oldType.name, ".")
    });
  }
  for (var _i24 = 0, _possibleTypesDiff$re2 = possibleTypesDiff.removed; _i24 < _possibleTypesDiff$re2.length; _i24++) {
    var oldPossibleType = _possibleTypesDiff$re2[_i24];
    schemaChanges.push({
      type: BreakingChangeType.TYPE_REMOVED_FROM_UNION,
      description: "".concat(oldPossibleType.name, " was removed from union type ").concat(oldType.name, ".")
    });
  }
  return schemaChanges;
}
function findEnumTypeChanges(oldType, newType) {
  var schemaChanges = [];
  var valuesDiff = diff(oldType.getValues(), newType.getValues());
  for (var _i26 = 0, _valuesDiff$added2 = valuesDiff.added; _i26 < _valuesDiff$added2.length; _i26++) {
    var newValue = _valuesDiff$added2[_i26];
    schemaChanges.push({
      type: DangerousChangeType.VALUE_ADDED_TO_ENUM,
      description: "".concat(newValue.name, " was added to enum type ").concat(oldType.name, ".")
    });
  }
  for (var _i28 = 0, _valuesDiff$removed2 = valuesDiff.removed; _i28 < _valuesDiff$removed2.length; _i28++) {
    var oldValue = _valuesDiff$removed2[_i28];
    schemaChanges.push({
      type: BreakingChangeType.VALUE_REMOVED_FROM_ENUM,
      description: "".concat(oldValue.name, " was removed from enum type ").concat(oldType.name, ".")
    });
  }
  return schemaChanges;
}
function findImplementedInterfacesChanges(oldType, newType) {
  var schemaChanges = [];
  var interfacesDiff = diff(oldType.getInterfaces(), newType.getInterfaces());
  for (var _i30 = 0, _interfacesDiff$added2 = interfacesDiff.added; _i30 < _interfacesDiff$added2.length; _i30++) {
    var newInterface = _interfacesDiff$added2[_i30];
    schemaChanges.push({
      type: DangerousChangeType.IMPLEMENTED_INTERFACE_ADDED,
      description: "".concat(newInterface.name, " added to interfaces implemented by ").concat(oldType.name, ".")
    });
  }
  for (var _i32 = 0, _interfacesDiff$remov2 = interfacesDiff.removed; _i32 < _interfacesDiff$remov2.length; _i32++) {
    var oldInterface = _interfacesDiff$remov2[_i32];
    schemaChanges.push({
      type: BreakingChangeType.IMPLEMENTED_INTERFACE_REMOVED,
      description: "".concat(oldType.name, " no longer implements interface ").concat(oldInterface.name, ".")
    });
  }
  return schemaChanges;
}
function findFieldChanges(oldType, newType) {
  var schemaChanges = [];
  var fieldsDiff = diff(objectValues$1(oldType.getFields()), objectValues$1(newType.getFields()));
  for (var _i34 = 0, _fieldsDiff$removed4 = fieldsDiff.removed; _i34 < _fieldsDiff$removed4.length; _i34++) {
    var oldField = _fieldsDiff$removed4[_i34];
    schemaChanges.push({
      type: BreakingChangeType.FIELD_REMOVED,
      description: "".concat(oldType.name, ".").concat(oldField.name, " was removed.")
    });
  }
  for (var _i36 = 0, _fieldsDiff$persisted4 = fieldsDiff.persisted; _i36 < _fieldsDiff$persisted4.length; _i36++) {
    var _ref8 = _fieldsDiff$persisted4[_i36];
    var _oldField2 = _ref8[0];
    var newField = _ref8[1];
    schemaChanges.push.apply(schemaChanges, findArgChanges(oldType, _oldField2, newField));
    var isSafe = isChangeSafeForObjectOrInterfaceField(_oldField2.type, newField.type);
    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.FIELD_CHANGED_KIND,
        description: "".concat(oldType.name, ".").concat(_oldField2.name, " changed type from ") + "".concat(String(_oldField2.type), " to ").concat(String(newField.type), ".")
      });
    }
  }
  return schemaChanges;
}
function findArgChanges(oldType, oldField, newField) {
  var schemaChanges = [];
  var argsDiff = diff(oldField.args, newField.args);
  for (var _i38 = 0, _argsDiff$removed4 = argsDiff.removed; _i38 < _argsDiff$removed4.length; _i38++) {
    var oldArg = _argsDiff$removed4[_i38];
    schemaChanges.push({
      type: BreakingChangeType.ARG_REMOVED,
      description: "".concat(oldType.name, ".").concat(oldField.name, " arg ").concat(oldArg.name, " was removed.")
    });
  }
  for (var _i40 = 0, _argsDiff$persisted2 = argsDiff.persisted; _i40 < _argsDiff$persisted2.length; _i40++) {
    var _ref10 = _argsDiff$persisted2[_i40];
    var _oldArg = _ref10[0];
    var newArg = _ref10[1];
    var isSafe = isChangeSafeForInputObjectFieldOrFieldArg(_oldArg.type, newArg.type);
    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.ARG_CHANGED_KIND,
        description: "".concat(oldType.name, ".").concat(oldField.name, " arg ").concat(_oldArg.name, " has changed type from ") + "".concat(String(_oldArg.type), " to ").concat(String(newArg.type), ".")
      });
    } else if (_oldArg.defaultValue !== void 0) {
      if (newArg.defaultValue === void 0) {
        schemaChanges.push({
          type: DangerousChangeType.ARG_DEFAULT_VALUE_CHANGE,
          description: "".concat(oldType.name, ".").concat(oldField.name, " arg ").concat(_oldArg.name, " defaultValue was removed.")
        });
      } else {
        var oldValueStr = stringifyValue(_oldArg.defaultValue, _oldArg.type);
        var newValueStr = stringifyValue(newArg.defaultValue, newArg.type);
        if (oldValueStr !== newValueStr) {
          schemaChanges.push({
            type: DangerousChangeType.ARG_DEFAULT_VALUE_CHANGE,
            description: "".concat(oldType.name, ".").concat(oldField.name, " arg ").concat(_oldArg.name, " has changed defaultValue from ").concat(oldValueStr, " to ").concat(newValueStr, ".")
          });
        }
      }
    }
  }
  for (var _i42 = 0, _argsDiff$added4 = argsDiff.added; _i42 < _argsDiff$added4.length; _i42++) {
    var _newArg = _argsDiff$added4[_i42];
    if (isRequiredArgument(_newArg)) {
      schemaChanges.push({
        type: BreakingChangeType.REQUIRED_ARG_ADDED,
        description: "A required arg ".concat(_newArg.name, " on ").concat(oldType.name, ".").concat(oldField.name, " was added.")
      });
    } else {
      schemaChanges.push({
        type: DangerousChangeType.OPTIONAL_ARG_ADDED,
        description: "An optional arg ".concat(_newArg.name, " on ").concat(oldType.name, ".").concat(oldField.name, " was added.")
      });
    }
  }
  return schemaChanges;
}
function isChangeSafeForObjectOrInterfaceField(oldType, newType) {
  if (isListType(oldType)) {
    return isListType(newType) && isChangeSafeForObjectOrInterfaceField(oldType.ofType, newType.ofType) || isNonNullType(newType) && isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType);
  }
  if (isNonNullType(oldType)) {
    return isNonNullType(newType) && isChangeSafeForObjectOrInterfaceField(oldType.ofType, newType.ofType);
  }
  return isNamedType(newType) && oldType.name === newType.name || isNonNullType(newType) && isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType);
}
function isChangeSafeForInputObjectFieldOrFieldArg(oldType, newType) {
  if (isListType(oldType)) {
    return isListType(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType.ofType);
  }
  if (isNonNullType(oldType)) {
    return isNonNullType(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType.ofType) || !isNonNullType(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType);
  }
  return isNamedType(newType) && oldType.name === newType.name;
}
function typeKindName(type) {
  if (isScalarType(type)) {
    return "a Scalar type";
  }
  if (isObjectType(type)) {
    return "an Object type";
  }
  if (isInterfaceType(type)) {
    return "an Interface type";
  }
  if (isUnionType(type)) {
    return "a Union type";
  }
  if (isEnumType(type)) {
    return "an Enum type";
  }
  if (isInputObjectType(type)) {
    return "an Input type";
  }
  invariant(0, "Unexpected type: " + inspect(type));
}
function stringifyValue(value, type) {
  var ast = astFromValue(value, type);
  ast != null || invariant(0);
  var sortedAST = visit(ast, {
    ObjectValue: function ObjectValue2(objectNode) {
      var fields7 = [].concat(objectNode.fields);
      fields7.sort(function(fieldA, fieldB) {
        return naturalCompare(fieldA.name.value, fieldB.name.value);
      });
      return _objectSpread(_objectSpread({}, objectNode), {}, {
        fields: fields7
      });
    }
  });
  return print(sortedAST);
}
function diff(oldArray, newArray) {
  var added = [];
  var removed = [];
  var persisted = [];
  var oldMap = keyMap(oldArray, function(_ref11) {
    var name = _ref11.name;
    return name;
  });
  var newMap = keyMap(newArray, function(_ref12) {
    var name = _ref12.name;
    return name;
  });
  for (var _i44 = 0; _i44 < oldArray.length; _i44++) {
    var oldItem = oldArray[_i44];
    var newItem = newMap[oldItem.name];
    if (newItem === void 0) {
      removed.push(oldItem);
    } else {
      persisted.push([oldItem, newItem]);
    }
  }
  for (var _i46 = 0; _i46 < newArray.length; _i46++) {
    var _newItem = newArray[_i46];
    if (oldMap[_newItem.name] === void 0) {
      added.push(_newItem);
    }
  }
  return {
    added,
    persisted,
    removed
  };
}
function findDeprecatedUsages(schema, ast) {
  return validate$1(schema, ast, [NoDeprecatedCustomRule]);
}
var graphql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  version: version$1,
  versionInfo,
  graphql: graphql$1,
  graphqlSync,
  GraphQLSchema,
  GraphQLDirective,
  GraphQLScalarType,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  specifiedScalarTypes,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  specifiedDirectives,
  GraphQLIncludeDirective,
  GraphQLSkipDirective,
  GraphQLDeprecatedDirective,
  GraphQLSpecifiedByDirective,
  TypeKind,
  DEFAULT_DEPRECATION_REASON,
  introspectionTypes,
  __Schema,
  __Directive,
  __DirectiveLocation,
  __Type,
  __Field,
  __InputValue,
  __EnumValue,
  __TypeKind,
  SchemaMetaFieldDef,
  TypeMetaFieldDef,
  TypeNameMetaFieldDef,
  isSchema,
  isDirective,
  isType,
  isScalarType,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isEnumType,
  isInputObjectType,
  isListType,
  isNonNullType,
  isInputType,
  isOutputType,
  isLeafType,
  isCompositeType,
  isAbstractType,
  isWrappingType,
  isNullableType,
  isNamedType,
  isRequiredArgument,
  isRequiredInputField,
  isSpecifiedScalarType,
  isIntrospectionType,
  isSpecifiedDirective,
  assertSchema,
  assertDirective,
  assertType,
  assertScalarType,
  assertObjectType,
  assertInterfaceType,
  assertUnionType,
  assertEnumType,
  assertInputObjectType,
  assertListType,
  assertNonNullType,
  assertInputType,
  assertOutputType,
  assertLeafType,
  assertCompositeType,
  assertAbstractType,
  assertWrappingType,
  assertNullableType,
  assertNamedType,
  getNullableType,
  getNamedType,
  validateSchema,
  assertValidSchema,
  Token,
  Source,
  Location,
  getLocation,
  printLocation,
  printSourceLocation,
  Lexer,
  TokenKind,
  parse,
  parseValue,
  parseType,
  print,
  visit,
  visitInParallel,
  getVisitFn,
  BREAK,
  Kind,
  DirectiveLocation,
  isDefinitionNode,
  isExecutableDefinitionNode,
  isSelectionNode,
  isValueNode,
  isTypeNode,
  isTypeSystemDefinitionNode,
  isTypeDefinitionNode,
  isTypeSystemExtensionNode,
  isTypeExtensionNode,
  execute: execute$1,
  executeSync,
  defaultFieldResolver,
  defaultTypeResolver,
  responsePathAsArray: pathToArray,
  getDirectiveValues,
  subscribe,
  createSourceEventStream,
  validate: validate$1,
  ValidationContext,
  specifiedRules,
  ExecutableDefinitionsRule,
  FieldsOnCorrectTypeRule,
  FragmentsOnCompositeTypesRule,
  KnownArgumentNamesRule,
  KnownDirectivesRule,
  KnownFragmentNamesRule,
  KnownTypeNamesRule,
  LoneAnonymousOperationRule,
  NoFragmentCyclesRule,
  NoUndefinedVariablesRule,
  NoUnusedFragmentsRule,
  NoUnusedVariablesRule,
  OverlappingFieldsCanBeMergedRule,
  PossibleFragmentSpreadsRule,
  ProvidedRequiredArgumentsRule,
  ScalarLeafsRule,
  SingleFieldSubscriptionsRule,
  UniqueArgumentNamesRule,
  UniqueDirectivesPerLocationRule,
  UniqueFragmentNamesRule,
  UniqueInputFieldNamesRule,
  UniqueOperationNamesRule,
  UniqueVariableNamesRule,
  ValuesOfCorrectTypeRule,
  VariablesAreInputTypesRule,
  VariablesInAllowedPositionRule,
  LoneSchemaDefinitionRule,
  UniqueOperationTypesRule,
  UniqueTypeNamesRule,
  UniqueEnumValueNamesRule,
  UniqueFieldDefinitionNamesRule,
  UniqueDirectiveNamesRule,
  PossibleTypeExtensionsRule,
  NoDeprecatedCustomRule,
  NoSchemaIntrospectionCustomRule,
  GraphQLError,
  syntaxError,
  locatedError,
  printError,
  formatError,
  getIntrospectionQuery,
  getOperationAST,
  getOperationRootType,
  introspectionFromSchema,
  buildClientSchema,
  buildASTSchema,
  buildSchema,
  getDescription,
  extendSchema,
  lexicographicSortSchema,
  printSchema,
  printType,
  printIntrospectionSchema,
  typeFromAST,
  valueFromAST,
  valueFromASTUntyped,
  astFromValue,
  TypeInfo,
  visitWithTypeInfo,
  coerceInputValue,
  concatAST,
  separateOperations,
  stripIgnoredCharacters,
  isEqualType,
  isTypeSubTypeOf,
  doTypesOverlap,
  assertValidName,
  isValidNameError,
  BreakingChangeType,
  DangerousChangeType,
  findBreakingChanges,
  findDangerousChanges,
  findDeprecatedUsages
}, Symbol.toStringTag, { value: "Module" }));
function removeTemporaryGlobals() {
  return typeof Source === "function" ? remove() : remove();
}
function checkDEV() {
  __DEV__ ? invariant$1("boolean" === typeof DEV, DEV) : invariant$1("boolean" === typeof DEV, 36);
}
removeTemporaryGlobals();
checkDEV();
function shouldInclude(_a2, variables) {
  var directives = _a2.directives;
  if (!directives || !directives.length) {
    return true;
  }
  return getInclusionDirectives(directives).every(function(_a3) {
    var directive = _a3.directive, ifArgument = _a3.ifArgument;
    var evaledValue = false;
    if (ifArgument.value.kind === "Variable") {
      evaledValue = variables && variables[ifArgument.value.name.value];
      __DEV__ ? invariant$1(evaledValue !== void 0, "Invalid variable referenced in @".concat(directive.name.value, " directive.")) : invariant$1(evaledValue !== void 0, 37);
    } else {
      evaledValue = ifArgument.value.value;
    }
    return directive.name.value === "skip" ? !evaledValue : evaledValue;
  });
}
function getDirectiveNames(root) {
  var names = [];
  visit(root, {
    Directive: function(node) {
      names.push(node.name.value);
    }
  });
  return names;
}
function hasDirectives(names, root) {
  return getDirectiveNames(root).some(function(name) {
    return names.indexOf(name) > -1;
  });
}
function hasClientExports(document2) {
  return document2 && hasDirectives(["client"], document2) && hasDirectives(["export"], document2);
}
function isInclusionDirective(_a2) {
  var value = _a2.name.value;
  return value === "skip" || value === "include";
}
function getInclusionDirectives(directives) {
  var result = [];
  if (directives && directives.length) {
    directives.forEach(function(directive) {
      if (!isInclusionDirective(directive))
        return;
      var directiveArguments = directive.arguments;
      var directiveName = directive.name.value;
      __DEV__ ? invariant$1(directiveArguments && directiveArguments.length === 1, "Incorrect number of arguments for the @".concat(directiveName, " directive.")) : invariant$1(directiveArguments && directiveArguments.length === 1, 38);
      var ifArgument = directiveArguments[0];
      __DEV__ ? invariant$1(ifArgument.name && ifArgument.name.value === "if", "Invalid argument for the @".concat(directiveName, " directive.")) : invariant$1(ifArgument.name && ifArgument.name.value === "if", 39);
      var ifValue = ifArgument.value;
      __DEV__ ? invariant$1(ifValue && (ifValue.kind === "Variable" || ifValue.kind === "BooleanValue"), "Argument for the @".concat(directiveName, " directive must be a variable or a boolean value.")) : invariant$1(ifValue && (ifValue.kind === "Variable" || ifValue.kind === "BooleanValue"), 40);
      result.push({ directive, ifArgument });
    });
  }
  return result;
}
function getFragmentQueryDocument(document2, fragmentName) {
  var actualFragmentName = fragmentName;
  var fragments = [];
  document2.definitions.forEach(function(definition) {
    if (definition.kind === "OperationDefinition") {
      throw __DEV__ ? new InvariantError("Found a ".concat(definition.operation, " operation").concat(definition.name ? " named '".concat(definition.name.value, "'") : "", ". ") + "No operations are allowed when using a fragment as a query. Only fragments are allowed.") : new InvariantError(41);
    }
    if (definition.kind === "FragmentDefinition") {
      fragments.push(definition);
    }
  });
  if (typeof actualFragmentName === "undefined") {
    __DEV__ ? invariant$1(fragments.length === 1, "Found ".concat(fragments.length, " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.")) : invariant$1(fragments.length === 1, 42);
    actualFragmentName = fragments[0].name.value;
  }
  var query = __assign$1(__assign$1({}, document2), { definitions: __spreadArray([
    {
      kind: "OperationDefinition",
      operation: "query",
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: {
              kind: "Name",
              value: actualFragmentName
            }
          }
        ]
      }
    }
  ], document2.definitions, true) });
  return query;
}
function createFragmentMap(fragments) {
  if (fragments === void 0) {
    fragments = [];
  }
  var symTable = {};
  fragments.forEach(function(fragment) {
    symTable[fragment.name.value] = fragment;
  });
  return symTable;
}
function getFragmentFromSelection(selection, fragmentMap) {
  switch (selection.kind) {
    case "InlineFragment":
      return selection;
    case "FragmentSpread": {
      var fragment = fragmentMap && fragmentMap[selection.name.value];
      __DEV__ ? invariant$1(fragment, "No fragment named ".concat(selection.name.value, ".")) : invariant$1(fragment, 43);
      return fragment;
    }
    default:
      return null;
  }
}
function isNonNullObject(obj) {
  return obj !== null && typeof obj === "object";
}
function makeReference(id) {
  return { __ref: String(id) };
}
function isReference(obj) {
  return Boolean(obj && typeof obj === "object" && typeof obj.__ref === "string");
}
function isDocumentNode(value) {
  return isNonNullObject(value) && value.kind === "Document" && Array.isArray(value.definitions);
}
function isStringValue(value) {
  return value.kind === "StringValue";
}
function isBooleanValue(value) {
  return value.kind === "BooleanValue";
}
function isIntValue(value) {
  return value.kind === "IntValue";
}
function isFloatValue(value) {
  return value.kind === "FloatValue";
}
function isVariable(value) {
  return value.kind === "Variable";
}
function isObjectValue(value) {
  return value.kind === "ObjectValue";
}
function isListValue(value) {
  return value.kind === "ListValue";
}
function isEnumValue(value) {
  return value.kind === "EnumValue";
}
function isNullValue(value) {
  return value.kind === "NullValue";
}
function valueToObjectRepresentation(argObj, name, value, variables) {
  if (isIntValue(value) || isFloatValue(value)) {
    argObj[name.value] = Number(value.value);
  } else if (isBooleanValue(value) || isStringValue(value)) {
    argObj[name.value] = value.value;
  } else if (isObjectValue(value)) {
    var nestedArgObj_1 = {};
    value.fields.map(function(obj) {
      return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
    });
    argObj[name.value] = nestedArgObj_1;
  } else if (isVariable(value)) {
    var variableValue = (variables || {})[value.name.value];
    argObj[name.value] = variableValue;
  } else if (isListValue(value)) {
    argObj[name.value] = value.values.map(function(listValue) {
      var nestedArgArrayObj = {};
      valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
      return nestedArgArrayObj[name.value];
    });
  } else if (isEnumValue(value)) {
    argObj[name.value] = value.value;
  } else if (isNullValue(value)) {
    argObj[name.value] = null;
  } else {
    throw __DEV__ ? new InvariantError('The inline argument "'.concat(name.value, '" of kind "').concat(value.kind, '"') + "is not supported. Use variables instead of inline arguments to overcome this limitation.") : new InvariantError(52);
  }
}
function storeKeyNameFromField(field, variables) {
  var directivesObj = null;
  if (field.directives) {
    directivesObj = {};
    field.directives.forEach(function(directive) {
      directivesObj[directive.name.value] = {};
      if (directive.arguments) {
        directive.arguments.forEach(function(_a2) {
          var name = _a2.name, value = _a2.value;
          return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
        });
      }
    });
  }
  var argObj = null;
  if (field.arguments && field.arguments.length) {
    argObj = {};
    field.arguments.forEach(function(_a2) {
      var name = _a2.name, value = _a2.value;
      return valueToObjectRepresentation(argObj, name, value, variables);
    });
  }
  return getStoreKeyName(field.name.value, argObj, directivesObj);
}
var KNOWN_DIRECTIVES = [
  "connection",
  "include",
  "skip",
  "client",
  "rest",
  "export"
];
var getStoreKeyName = Object.assign(function(fieldName, args, directives) {
  if (args && directives && directives["connection"] && directives["connection"]["key"]) {
    if (directives["connection"]["filter"] && directives["connection"]["filter"].length > 0) {
      var filterKeys = directives["connection"]["filter"] ? directives["connection"]["filter"] : [];
      filterKeys.sort();
      var filteredArgs_1 = {};
      filterKeys.forEach(function(key) {
        filteredArgs_1[key] = args[key];
      });
      return "".concat(directives["connection"]["key"], "(").concat(stringify$1(filteredArgs_1), ")");
    } else {
      return directives["connection"]["key"];
    }
  }
  var completeFieldName = fieldName;
  if (args) {
    var stringifiedArgs = stringify$1(args);
    completeFieldName += "(".concat(stringifiedArgs, ")");
  }
  if (directives) {
    Object.keys(directives).forEach(function(key) {
      if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
        return;
      if (directives[key] && Object.keys(directives[key]).length) {
        completeFieldName += "@".concat(key, "(").concat(stringify$1(directives[key]), ")");
      } else {
        completeFieldName += "@".concat(key);
      }
    });
  }
  return completeFieldName;
}, {
  setStringify: function(s2) {
    var previous = stringify$1;
    stringify$1 = s2;
    return previous;
  }
});
var stringify$1 = function defaultStringify(value) {
  return JSON.stringify(value, stringifyReplacer);
};
function stringifyReplacer(_key, value) {
  if (isNonNullObject(value) && !Array.isArray(value)) {
    value = Object.keys(value).sort().reduce(function(copy, key) {
      copy[key] = value[key];
      return copy;
    }, {});
  }
  return value;
}
function argumentsObjectFromField(field, variables) {
  if (field.arguments && field.arguments.length) {
    var argObj_1 = {};
    field.arguments.forEach(function(_a2) {
      var name = _a2.name, value = _a2.value;
      return valueToObjectRepresentation(argObj_1, name, value, variables);
    });
    return argObj_1;
  }
  return null;
}
function resultKeyNameFromField(field) {
  return field.alias ? field.alias.value : field.name.value;
}
function getTypenameFromResult(result, selectionSet, fragmentMap) {
  if (typeof result.__typename === "string") {
    return result.__typename;
  }
  for (var _i = 0, _a2 = selectionSet.selections; _i < _a2.length; _i++) {
    var selection = _a2[_i];
    if (isField(selection)) {
      if (selection.name.value === "__typename") {
        return result[resultKeyNameFromField(selection)];
      }
    } else {
      var typename = getTypenameFromResult(result, getFragmentFromSelection(selection, fragmentMap).selectionSet, fragmentMap);
      if (typeof typename === "string") {
        return typename;
      }
    }
  }
}
function isField(selection) {
  return selection.kind === "Field";
}
function isInlineFragment(selection) {
  return selection.kind === "InlineFragment";
}
function checkDocument(doc) {
  __DEV__ ? invariant$1(doc && doc.kind === "Document", 'Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql') : invariant$1(doc && doc.kind === "Document", 44);
  var operations = doc.definitions.filter(function(d2) {
    return d2.kind !== "FragmentDefinition";
  }).map(function(definition) {
    if (definition.kind !== "OperationDefinition") {
      throw __DEV__ ? new InvariantError('Schema type definitions not allowed in queries. Found: "'.concat(definition.kind, '"')) : new InvariantError(45);
    }
    return definition;
  });
  __DEV__ ? invariant$1(operations.length <= 1, "Ambiguous GraphQL document: contains ".concat(operations.length, " operations")) : invariant$1(operations.length <= 1, 46);
  return doc;
}
function getOperationDefinition(doc) {
  checkDocument(doc);
  return doc.definitions.filter(function(definition) {
    return definition.kind === "OperationDefinition";
  })[0];
}
function getOperationName(doc) {
  return doc.definitions.filter(function(definition) {
    return definition.kind === "OperationDefinition" && definition.name;
  }).map(function(x2) {
    return x2.name.value;
  })[0] || null;
}
function getFragmentDefinitions(doc) {
  return doc.definitions.filter(function(definition) {
    return definition.kind === "FragmentDefinition";
  });
}
function getQueryDefinition(doc) {
  var queryDef = getOperationDefinition(doc);
  __DEV__ ? invariant$1(queryDef && queryDef.operation === "query", "Must contain a query definition.") : invariant$1(queryDef && queryDef.operation === "query", 47);
  return queryDef;
}
function getFragmentDefinition(doc) {
  __DEV__ ? invariant$1(doc.kind === "Document", 'Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql') : invariant$1(doc.kind === "Document", 48);
  __DEV__ ? invariant$1(doc.definitions.length <= 1, "Fragment must have exactly one definition.") : invariant$1(doc.definitions.length <= 1, 49);
  var fragmentDef = doc.definitions[0];
  __DEV__ ? invariant$1(fragmentDef.kind === "FragmentDefinition", "Must be a fragment definition.") : invariant$1(fragmentDef.kind === "FragmentDefinition", 50);
  return fragmentDef;
}
function getMainDefinition(queryDoc) {
  checkDocument(queryDoc);
  var fragmentDefinition;
  for (var _i = 0, _a2 = queryDoc.definitions; _i < _a2.length; _i++) {
    var definition = _a2[_i];
    if (definition.kind === "OperationDefinition") {
      var operation = definition.operation;
      if (operation === "query" || operation === "mutation" || operation === "subscription") {
        return definition;
      }
    }
    if (definition.kind === "FragmentDefinition" && !fragmentDefinition) {
      fragmentDefinition = definition;
    }
  }
  if (fragmentDefinition) {
    return fragmentDefinition;
  }
  throw __DEV__ ? new InvariantError("Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.") : new InvariantError(51);
}
function getDefaultValues(definition) {
  var defaultValues = /* @__PURE__ */ Object.create(null);
  var defs = definition && definition.variableDefinitions;
  if (defs && defs.length) {
    defs.forEach(function(def) {
      if (def.defaultValue) {
        valueToObjectRepresentation(defaultValues, def.variable.name, def.defaultValue);
      }
    });
  }
  return defaultValues;
}
function filterInPlace(array, test, context) {
  var target = 0;
  array.forEach(function(elem, i) {
    if (test.call(this, elem, i, array)) {
      array[target++] = elem;
    }
  }, context);
  array.length = target;
  return array;
}
var TYPENAME_FIELD = {
  kind: "Field",
  name: {
    kind: "Name",
    value: "__typename"
  }
};
function isEmpty(op, fragments) {
  return op.selectionSet.selections.every(function(selection) {
    return selection.kind === "FragmentSpread" && isEmpty(fragments[selection.name.value], fragments);
  });
}
function nullIfDocIsEmpty(doc) {
  return isEmpty(getOperationDefinition(doc) || getFragmentDefinition(doc), createFragmentMap(getFragmentDefinitions(doc))) ? null : doc;
}
function getDirectiveMatcher(directives) {
  return function directiveMatcher(directive) {
    return directives.some(function(dir) {
      return dir.name && dir.name === directive.name.value || dir.test && dir.test(directive);
    });
  };
}
function removeDirectivesFromDocument(directives, doc) {
  var variablesInUse = /* @__PURE__ */ Object.create(null);
  var variablesToRemove = [];
  var fragmentSpreadsInUse = /* @__PURE__ */ Object.create(null);
  var fragmentSpreadsToRemove = [];
  var modifiedDoc = nullIfDocIsEmpty(visit(doc, {
    Variable: {
      enter: function(node, _key, parent) {
        if (parent.kind !== "VariableDefinition") {
          variablesInUse[node.name.value] = true;
        }
      }
    },
    Field: {
      enter: function(node) {
        if (directives && node.directives) {
          var shouldRemoveField = directives.some(function(directive) {
            return directive.remove;
          });
          if (shouldRemoveField && node.directives && node.directives.some(getDirectiveMatcher(directives))) {
            if (node.arguments) {
              node.arguments.forEach(function(arg) {
                if (arg.value.kind === "Variable") {
                  variablesToRemove.push({
                    name: arg.value.name.value
                  });
                }
              });
            }
            if (node.selectionSet) {
              getAllFragmentSpreadsFromSelectionSet(node.selectionSet).forEach(function(frag) {
                fragmentSpreadsToRemove.push({
                  name: frag.name.value
                });
              });
            }
            return null;
          }
        }
      }
    },
    FragmentSpread: {
      enter: function(node) {
        fragmentSpreadsInUse[node.name.value] = true;
      }
    },
    Directive: {
      enter: function(node) {
        if (getDirectiveMatcher(directives)(node)) {
          return null;
        }
      }
    }
  }));
  if (modifiedDoc && filterInPlace(variablesToRemove, function(v2) {
    return !!v2.name && !variablesInUse[v2.name];
  }).length) {
    modifiedDoc = removeArgumentsFromDocument(variablesToRemove, modifiedDoc);
  }
  if (modifiedDoc && filterInPlace(fragmentSpreadsToRemove, function(fs) {
    return !!fs.name && !fragmentSpreadsInUse[fs.name];
  }).length) {
    modifiedDoc = removeFragmentSpreadFromDocument(fragmentSpreadsToRemove, modifiedDoc);
  }
  return modifiedDoc;
}
var addTypenameToDocument = Object.assign(function(doc) {
  return visit(doc, {
    SelectionSet: {
      enter: function(node, _key, parent) {
        if (parent && parent.kind === "OperationDefinition") {
          return;
        }
        var selections = node.selections;
        if (!selections) {
          return;
        }
        var skip = selections.some(function(selection) {
          return isField(selection) && (selection.name.value === "__typename" || selection.name.value.lastIndexOf("__", 0) === 0);
        });
        if (skip) {
          return;
        }
        var field = parent;
        if (isField(field) && field.directives && field.directives.some(function(d2) {
          return d2.name.value === "export";
        })) {
          return;
        }
        return __assign$1(__assign$1({}, node), { selections: __spreadArray(__spreadArray([], selections, true), [TYPENAME_FIELD], false) });
      }
    }
  });
}, {
  added: function(field) {
    return field === TYPENAME_FIELD;
  }
});
var connectionRemoveConfig = {
  test: function(directive) {
    var willRemove = directive.name.value === "connection";
    if (willRemove) {
      if (!directive.arguments || !directive.arguments.some(function(arg) {
        return arg.name.value === "key";
      })) {
        __DEV__ && invariant$1.warn("Removing an @connection directive even though it does not have a key. You may want to use the key parameter to specify a store key.");
      }
    }
    return willRemove;
  }
};
function removeConnectionDirectiveFromDocument(doc) {
  return removeDirectivesFromDocument([connectionRemoveConfig], checkDocument(doc));
}
function getArgumentMatcher(config) {
  return function argumentMatcher(argument) {
    return config.some(function(aConfig) {
      return argument.value && argument.value.kind === "Variable" && argument.value.name && (aConfig.name === argument.value.name.value || aConfig.test && aConfig.test(argument));
    });
  };
}
function removeArgumentsFromDocument(config, doc) {
  var argMatcher = getArgumentMatcher(config);
  return nullIfDocIsEmpty(visit(doc, {
    OperationDefinition: {
      enter: function(node) {
        return __assign$1(__assign$1({}, node), { variableDefinitions: node.variableDefinitions ? node.variableDefinitions.filter(function(varDef) {
          return !config.some(function(arg) {
            return arg.name === varDef.variable.name.value;
          });
        }) : [] });
      }
    },
    Field: {
      enter: function(node) {
        var shouldRemoveField = config.some(function(argConfig) {
          return argConfig.remove;
        });
        if (shouldRemoveField) {
          var argMatchCount_1 = 0;
          if (node.arguments) {
            node.arguments.forEach(function(arg) {
              if (argMatcher(arg)) {
                argMatchCount_1 += 1;
              }
            });
          }
          if (argMatchCount_1 === 1) {
            return null;
          }
        }
      }
    },
    Argument: {
      enter: function(node) {
        if (argMatcher(node)) {
          return null;
        }
      }
    }
  }));
}
function removeFragmentSpreadFromDocument(config, doc) {
  function enter(node) {
    if (config.some(function(def) {
      return def.name === node.name.value;
    })) {
      return null;
    }
  }
  return nullIfDocIsEmpty(visit(doc, {
    FragmentSpread: { enter },
    FragmentDefinition: { enter }
  }));
}
function getAllFragmentSpreadsFromSelectionSet(selectionSet) {
  var allFragments = [];
  selectionSet.selections.forEach(function(selection) {
    if ((isField(selection) || isInlineFragment(selection)) && selection.selectionSet) {
      getAllFragmentSpreadsFromSelectionSet(selection.selectionSet).forEach(function(frag) {
        return allFragments.push(frag);
      });
    } else if (selection.kind === "FragmentSpread") {
      allFragments.push(selection);
    }
  });
  return allFragments;
}
function buildQueryFromSelectionSet(document2) {
  var definition = getMainDefinition(document2);
  var definitionOperation = definition.operation;
  if (definitionOperation === "query") {
    return document2;
  }
  var modifiedDoc = visit(document2, {
    OperationDefinition: {
      enter: function(node) {
        return __assign$1(__assign$1({}, node), { operation: "query" });
      }
    }
  });
  return modifiedDoc;
}
function removeClientSetsFromDocument(document2) {
  checkDocument(document2);
  var modifiedDoc = removeDirectivesFromDocument([
    {
      test: function(directive) {
        return directive.name.value === "client";
      },
      remove: true
    }
  ], document2);
  if (modifiedDoc) {
    modifiedDoc = visit(modifiedDoc, {
      FragmentDefinition: {
        enter: function(node) {
          if (node.selectionSet) {
            var isTypenameOnly = node.selectionSet.selections.every(function(selection) {
              return isField(selection) && selection.name.value === "__typename";
            });
            if (isTypenameOnly) {
              return null;
            }
          }
        }
      }
    });
  }
  return modifiedDoc;
}
var hasOwnProperty$5 = Object.prototype.hasOwnProperty;
function mergeDeep() {
  var sources = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }
  return mergeDeepArray(sources);
}
function mergeDeepArray(sources) {
  var target = sources[0] || {};
  var count = sources.length;
  if (count > 1) {
    var merger = new DeepMerger();
    for (var i = 1; i < count; ++i) {
      target = merger.merge(target, sources[i]);
    }
  }
  return target;
}
var defaultReconciler = function(target, source, property) {
  return this.merge(target[property], source[property]);
};
var DeepMerger = function() {
  function DeepMerger2(reconciler) {
    if (reconciler === void 0) {
      reconciler = defaultReconciler;
    }
    this.reconciler = reconciler;
    this.isObject = isNonNullObject;
    this.pastCopies = /* @__PURE__ */ new Set();
  }
  DeepMerger2.prototype.merge = function(target, source) {
    var _this = this;
    var context = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      context[_i - 2] = arguments[_i];
    }
    if (isNonNullObject(source) && isNonNullObject(target)) {
      Object.keys(source).forEach(function(sourceKey) {
        if (hasOwnProperty$5.call(target, sourceKey)) {
          var targetValue = target[sourceKey];
          if (source[sourceKey] !== targetValue) {
            var result = _this.reconciler.apply(_this, __spreadArray([target, source, sourceKey], context, false));
            if (result !== targetValue) {
              target = _this.shallowCopyForMerge(target);
              target[sourceKey] = result;
            }
          }
        } else {
          target = _this.shallowCopyForMerge(target);
          target[sourceKey] = source[sourceKey];
        }
      });
      return target;
    }
    return source;
  };
  DeepMerger2.prototype.shallowCopyForMerge = function(value) {
    if (isNonNullObject(value)) {
      if (!this.pastCopies.has(value)) {
        if (Array.isArray(value)) {
          value = value.slice(0);
        } else {
          value = __assign$1({ __proto__: Object.getPrototypeOf(value) }, value);
        }
        this.pastCopies.add(value);
      }
    }
    return value;
  };
  return DeepMerger2;
}();
function concatPagination(keyArgs) {
  if (keyArgs === void 0) {
    keyArgs = false;
  }
  return {
    keyArgs,
    merge: function(existing, incoming) {
      return existing ? __spreadArray(__spreadArray([], existing, true), incoming, true) : incoming;
    }
  };
}
function offsetLimitPagination(keyArgs) {
  if (keyArgs === void 0) {
    keyArgs = false;
  }
  return {
    keyArgs,
    merge: function(existing, incoming, _a2) {
      var args = _a2.args;
      var merged = existing ? existing.slice(0) : [];
      if (incoming) {
        if (args) {
          var _b = args.offset, offset = _b === void 0 ? 0 : _b;
          for (var i = 0; i < incoming.length; ++i) {
            merged[offset + i] = incoming[i];
          }
        } else {
          merged.push.apply(merged, incoming);
        }
      }
      return merged;
    }
  };
}
function relayStylePagination(keyArgs) {
  if (keyArgs === void 0) {
    keyArgs = false;
  }
  return {
    keyArgs,
    read: function(existing, _a2) {
      var canRead = _a2.canRead, readField = _a2.readField;
      if (!existing)
        return existing;
      var edges = [];
      var firstEdgeCursor = "";
      var lastEdgeCursor = "";
      existing.edges.forEach(function(edge) {
        if (canRead(readField("node", edge))) {
          edges.push(edge);
          if (edge.cursor) {
            firstEdgeCursor = firstEdgeCursor || edge.cursor || "";
            lastEdgeCursor = edge.cursor || lastEdgeCursor;
          }
        }
      });
      var _b = existing.pageInfo || {}, startCursor = _b.startCursor, endCursor = _b.endCursor;
      return __assign$1(__assign$1({}, getExtras(existing)), { edges, pageInfo: __assign$1(__assign$1({}, existing.pageInfo), { startCursor: startCursor || firstEdgeCursor, endCursor: endCursor || lastEdgeCursor }) });
    },
    merge: function(existing, incoming, _a2) {
      var args = _a2.args, isReference2 = _a2.isReference, readField = _a2.readField;
      if (!existing) {
        existing = makeEmptyData();
      }
      if (!incoming) {
        return existing;
      }
      var incomingEdges = incoming.edges ? incoming.edges.map(function(edge) {
        if (isReference2(edge = __assign$1({}, edge))) {
          edge.cursor = readField("cursor", edge);
        }
        return edge;
      }) : [];
      if (incoming.pageInfo) {
        var pageInfo_1 = incoming.pageInfo;
        var startCursor = pageInfo_1.startCursor, endCursor = pageInfo_1.endCursor;
        var firstEdge = incomingEdges[0];
        var lastEdge = incomingEdges[incomingEdges.length - 1];
        if (firstEdge && startCursor) {
          firstEdge.cursor = startCursor;
        }
        if (lastEdge && endCursor) {
          lastEdge.cursor = endCursor;
        }
        var firstCursor = firstEdge && firstEdge.cursor;
        if (firstCursor && !startCursor) {
          incoming = mergeDeep(incoming, {
            pageInfo: {
              startCursor: firstCursor
            }
          });
        }
        var lastCursor = lastEdge && lastEdge.cursor;
        if (lastCursor && !endCursor) {
          incoming = mergeDeep(incoming, {
            pageInfo: {
              endCursor: lastCursor
            }
          });
        }
      }
      var prefix = existing.edges;
      var suffix = [];
      if (args && args.after) {
        var index = prefix.findIndex(function(edge) {
          return edge.cursor === args.after;
        });
        if (index >= 0) {
          prefix = prefix.slice(0, index + 1);
        }
      } else if (args && args.before) {
        var index = prefix.findIndex(function(edge) {
          return edge.cursor === args.before;
        });
        suffix = index < 0 ? prefix : prefix.slice(index);
        prefix = [];
      } else if (incoming.edges) {
        prefix = [];
      }
      var edges = __spreadArray(__spreadArray(__spreadArray([], prefix, true), incomingEdges, true), suffix, true);
      var pageInfo = __assign$1(__assign$1({}, incoming.pageInfo), existing.pageInfo);
      if (incoming.pageInfo) {
        var _b = incoming.pageInfo, hasPreviousPage = _b.hasPreviousPage, hasNextPage = _b.hasNextPage, startCursor = _b.startCursor, endCursor = _b.endCursor, extras2 = __rest(_b, ["hasPreviousPage", "hasNextPage", "startCursor", "endCursor"]);
        Object.assign(pageInfo, extras2);
        if (!prefix.length) {
          if (void 0 !== hasPreviousPage)
            pageInfo.hasPreviousPage = hasPreviousPage;
          if (void 0 !== startCursor)
            pageInfo.startCursor = startCursor;
        }
        if (!suffix.length) {
          if (void 0 !== hasNextPage)
            pageInfo.hasNextPage = hasNextPage;
          if (void 0 !== endCursor)
            pageInfo.endCursor = endCursor;
        }
      }
      return __assign$1(__assign$1(__assign$1({}, getExtras(existing)), getExtras(incoming)), { edges, pageInfo });
    }
  };
}
var getExtras = function(obj) {
  return __rest(obj, notExtras);
};
var notExtras = ["edges", "pageInfo"];
function makeEmptyData() {
  return {
    edges: [],
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: true,
      startCursor: "",
      endCursor: ""
    }
  };
}
function _createForOfIteratorHelperLoose(o2, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o2[Symbol.iterator] || o2["@@iterator"];
  if (it)
    return (it = it.call(o2)).next.bind(it);
  if (Array.isArray(o2) || (it = _unsupportedIterableToArray(o2)) || allowArrayLike && o2 && typeof o2.length === "number") {
    if (it)
      o2 = it;
    var i = 0;
    return function() {
      if (i >= o2.length)
        return { done: true };
      return { done: false, value: o2[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o2, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
var hasSymbols = function() {
  return typeof Symbol === "function";
};
var hasSymbol = function(name) {
  return hasSymbols() && Boolean(Symbol[name]);
};
var getSymbol = function(name) {
  return hasSymbol(name) ? Symbol[name] : "@@" + name;
};
if (hasSymbols() && !hasSymbol("observable")) {
  Symbol.observable = Symbol("observable");
}
var SymbolIterator = getSymbol("iterator");
var SymbolObservable = getSymbol("observable");
var SymbolSpecies = getSymbol("species");
function getMethod(obj, key) {
  var value = obj[key];
  if (value == null)
    return void 0;
  if (typeof value !== "function")
    throw new TypeError(value + " is not a function");
  return value;
}
function getSpecies(obj) {
  var ctor = obj.constructor;
  if (ctor !== void 0) {
    ctor = ctor[SymbolSpecies];
    if (ctor === null) {
      ctor = void 0;
    }
  }
  return ctor !== void 0 ? ctor : Observable;
}
function isObservable(x2) {
  return x2 instanceof Observable;
}
function hostReportError(e2) {
  if (hostReportError.log) {
    hostReportError.log(e2);
  } else {
    setTimeout(function() {
      throw e2;
    });
  }
}
function enqueue(fn) {
  Promise.resolve().then(function() {
    try {
      fn();
    } catch (e2) {
      hostReportError(e2);
    }
  });
}
function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === void 0)
    return;
  subscription._cleanup = void 0;
  if (!cleanup) {
    return;
  }
  try {
    if (typeof cleanup === "function") {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, "unsubscribe");
      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e2) {
    hostReportError(e2);
  }
}
function closeSubscription(subscription) {
  subscription._observer = void 0;
  subscription._queue = void 0;
  subscription._state = "closed";
}
function flushSubscription(subscription) {
  var queue = subscription._queue;
  if (!queue) {
    return;
  }
  subscription._queue = void 0;
  subscription._state = "ready";
  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === "closed")
      break;
  }
}
function notifySubscription(subscription, type, value) {
  subscription._state = "running";
  var observer = subscription._observer;
  try {
    var m2 = getMethod(observer, type);
    switch (type) {
      case "next":
        if (m2)
          m2.call(observer, value);
        break;
      case "error":
        closeSubscription(subscription);
        if (m2)
          m2.call(observer, value);
        else
          throw value;
        break;
      case "complete":
        closeSubscription(subscription);
        if (m2)
          m2.call(observer);
        break;
    }
  } catch (e2) {
    hostReportError(e2);
  }
  if (subscription._state === "closed")
    cleanupSubscription(subscription);
  else if (subscription._state === "running")
    subscription._state = "ready";
}
function onNotify(subscription, type, value) {
  if (subscription._state === "closed")
    return;
  if (subscription._state === "buffering") {
    subscription._queue.push({
      type,
      value
    });
    return;
  }
  if (subscription._state !== "ready") {
    subscription._state = "buffering";
    subscription._queue = [{
      type,
      value
    }];
    enqueue(function() {
      return flushSubscription(subscription);
    });
    return;
  }
  notifySubscription(subscription, type, value);
}
var Subscription = /* @__PURE__ */ function() {
  function Subscription2(observer, subscriber) {
    this._cleanup = void 0;
    this._observer = observer;
    this._queue = void 0;
    this._state = "initializing";
    var subscriptionObserver = new SubscriptionObserver(this);
    try {
      this._cleanup = subscriber.call(void 0, subscriptionObserver);
    } catch (e2) {
      subscriptionObserver.error(e2);
    }
    if (this._state === "initializing")
      this._state = "ready";
  }
  var _proto = Subscription2.prototype;
  _proto.unsubscribe = function unsubscribe() {
    if (this._state !== "closed") {
      closeSubscription(this);
      cleanupSubscription(this);
    }
  };
  _createClass(Subscription2, [{
    key: "closed",
    get: function() {
      return this._state === "closed";
    }
  }]);
  return Subscription2;
}();
var SubscriptionObserver = /* @__PURE__ */ function() {
  function SubscriptionObserver2(subscription) {
    this._subscription = subscription;
  }
  var _proto2 = SubscriptionObserver2.prototype;
  _proto2.next = function next(value) {
    onNotify(this._subscription, "next", value);
  };
  _proto2.error = function error(value) {
    onNotify(this._subscription, "error", value);
  };
  _proto2.complete = function complete() {
    onNotify(this._subscription, "complete");
  };
  _createClass(SubscriptionObserver2, [{
    key: "closed",
    get: function() {
      return this._subscription._state === "closed";
    }
  }]);
  return SubscriptionObserver2;
}();
var Observable = /* @__PURE__ */ function() {
  function Observable2(subscriber) {
    if (!(this instanceof Observable2))
      throw new TypeError("Observable cannot be called as a function");
    if (typeof subscriber !== "function")
      throw new TypeError("Observable initializer must be a function");
    this._subscriber = subscriber;
  }
  var _proto3 = Observable2.prototype;
  _proto3.subscribe = function subscribe2(observer) {
    if (typeof observer !== "object" || observer === null) {
      observer = {
        next: observer,
        error: arguments[1],
        complete: arguments[2]
      };
    }
    return new Subscription(observer, this._subscriber);
  };
  _proto3.forEach = function forEach2(fn) {
    var _this = this;
    return new Promise(function(resolve4, reject) {
      if (typeof fn !== "function") {
        reject(new TypeError(fn + " is not a function"));
        return;
      }
      function done() {
        subscription.unsubscribe();
        resolve4();
      }
      var subscription = _this.subscribe({
        next: function(value) {
          try {
            fn(value, done);
          } catch (e2) {
            reject(e2);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve4
      });
    });
  };
  _proto3.map = function map(fn) {
    var _this2 = this;
    if (typeof fn !== "function")
      throw new TypeError(fn + " is not a function");
    var C2 = getSpecies(this);
    return new C2(function(observer) {
      return _this2.subscribe({
        next: function(value) {
          try {
            value = fn(value);
          } catch (e2) {
            return observer.error(e2);
          }
          observer.next(value);
        },
        error: function(e2) {
          observer.error(e2);
        },
        complete: function() {
          observer.complete();
        }
      });
    });
  };
  _proto3.filter = function filter(fn) {
    var _this3 = this;
    if (typeof fn !== "function")
      throw new TypeError(fn + " is not a function");
    var C2 = getSpecies(this);
    return new C2(function(observer) {
      return _this3.subscribe({
        next: function(value) {
          try {
            if (!fn(value))
              return;
          } catch (e2) {
            return observer.error(e2);
          }
          observer.next(value);
        },
        error: function(e2) {
          observer.error(e2);
        },
        complete: function() {
          observer.complete();
        }
      });
    });
  };
  _proto3.reduce = function reduce(fn) {
    var _this4 = this;
    if (typeof fn !== "function")
      throw new TypeError(fn + " is not a function");
    var C2 = getSpecies(this);
    var hasSeed = arguments.length > 1;
    var hasValue = false;
    var seed = arguments[1];
    var acc = seed;
    return new C2(function(observer) {
      return _this4.subscribe({
        next: function(value) {
          var first = !hasValue;
          hasValue = true;
          if (!first || hasSeed) {
            try {
              acc = fn(acc, value);
            } catch (e2) {
              return observer.error(e2);
            }
          } else {
            acc = value;
          }
        },
        error: function(e2) {
          observer.error(e2);
        },
        complete: function() {
          if (!hasValue && !hasSeed)
            return observer.error(new TypeError("Cannot reduce an empty sequence"));
          observer.next(acc);
          observer.complete();
        }
      });
    });
  };
  _proto3.concat = function concat2() {
    var _this5 = this;
    for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
      sources[_key] = arguments[_key];
    }
    var C2 = getSpecies(this);
    return new C2(function(observer) {
      var subscription;
      var index = 0;
      function startNext(next) {
        subscription = next.subscribe({
          next: function(v2) {
            observer.next(v2);
          },
          error: function(e2) {
            observer.error(e2);
          },
          complete: function() {
            if (index === sources.length) {
              subscription = void 0;
              observer.complete();
            } else {
              startNext(C2.from(sources[index++]));
            }
          }
        });
      }
      startNext(_this5);
      return function() {
        if (subscription) {
          subscription.unsubscribe();
          subscription = void 0;
        }
      };
    });
  };
  _proto3.flatMap = function flatMap(fn) {
    var _this6 = this;
    if (typeof fn !== "function")
      throw new TypeError(fn + " is not a function");
    var C2 = getSpecies(this);
    return new C2(function(observer) {
      var subscriptions = [];
      var outer = _this6.subscribe({
        next: function(value) {
          if (fn) {
            try {
              value = fn(value);
            } catch (e2) {
              return observer.error(e2);
            }
          }
          var inner = C2.from(value).subscribe({
            next: function(value2) {
              observer.next(value2);
            },
            error: function(e2) {
              observer.error(e2);
            },
            complete: function() {
              var i = subscriptions.indexOf(inner);
              if (i >= 0)
                subscriptions.splice(i, 1);
              completeIfDone();
            }
          });
          subscriptions.push(inner);
        },
        error: function(e2) {
          observer.error(e2);
        },
        complete: function() {
          completeIfDone();
        }
      });
      function completeIfDone() {
        if (outer.closed && subscriptions.length === 0)
          observer.complete();
      }
      return function() {
        subscriptions.forEach(function(s2) {
          return s2.unsubscribe();
        });
        outer.unsubscribe();
      };
    });
  };
  _proto3[SymbolObservable] = function() {
    return this;
  };
  Observable2.from = function from2(x2) {
    var C2 = typeof this === "function" ? this : Observable2;
    if (x2 == null)
      throw new TypeError(x2 + " is not an object");
    var method = getMethod(x2, SymbolObservable);
    if (method) {
      var observable = method.call(x2);
      if (Object(observable) !== observable)
        throw new TypeError(observable + " is not an object");
      if (isObservable(observable) && observable.constructor === C2)
        return observable;
      return new C2(function(observer) {
        return observable.subscribe(observer);
      });
    }
    if (hasSymbol("iterator")) {
      method = getMethod(x2, SymbolIterator);
      if (method) {
        return new C2(function(observer) {
          enqueue(function() {
            if (observer.closed)
              return;
            for (var _iterator = _createForOfIteratorHelperLoose(method.call(x2)), _step; !(_step = _iterator()).done; ) {
              var item = _step.value;
              observer.next(item);
              if (observer.closed)
                return;
            }
            observer.complete();
          });
        });
      }
    }
    if (Array.isArray(x2)) {
      return new C2(function(observer) {
        enqueue(function() {
          if (observer.closed)
            return;
          for (var i = 0; i < x2.length; ++i) {
            observer.next(x2[i]);
            if (observer.closed)
              return;
          }
          observer.complete();
        });
      });
    }
    throw new TypeError(x2 + " is not observable");
  };
  Observable2.of = function of() {
    for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      items[_key2] = arguments[_key2];
    }
    var C2 = typeof this === "function" ? this : Observable2;
    return new C2(function(observer) {
      enqueue(function() {
        if (observer.closed)
          return;
        for (var i = 0; i < items.length; ++i) {
          observer.next(items[i]);
          if (observer.closed)
            return;
        }
        observer.complete();
      });
    });
  };
  _createClass(Observable2, null, [{
    key: SymbolSpecies,
    get: function() {
      return this;
    }
  }]);
  return Observable2;
}();
if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol("extensions"), {
    value: {
      symbol: SymbolObservable,
      hostReportError
    },
    configurable: true
  });
}
var toString$1 = Object.prototype.toString;
function cloneDeep(value) {
  return cloneDeepHelper(value);
}
function cloneDeepHelper(val, seen) {
  switch (toString$1.call(val)) {
    case "[object Array]": {
      seen = seen || /* @__PURE__ */ new Map();
      if (seen.has(val))
        return seen.get(val);
      var copy_1 = val.slice(0);
      seen.set(val, copy_1);
      copy_1.forEach(function(child, i) {
        copy_1[i] = cloneDeepHelper(child, seen);
      });
      return copy_1;
    }
    case "[object Object]": {
      seen = seen || /* @__PURE__ */ new Map();
      if (seen.has(val))
        return seen.get(val);
      var copy_2 = Object.create(Object.getPrototypeOf(val));
      seen.set(val, copy_2);
      Object.keys(val).forEach(function(key) {
        copy_2[key] = cloneDeepHelper(val[key], seen);
      });
      return copy_2;
    }
    default:
      return val;
  }
}
function deepFreeze(value) {
  var workSet = /* @__PURE__ */ new Set([value]);
  workSet.forEach(function(obj) {
    if (isNonNullObject(obj) && shallowFreeze(obj) === obj) {
      Object.getOwnPropertyNames(obj).forEach(function(name) {
        if (isNonNullObject(obj[name]))
          workSet.add(obj[name]);
      });
    }
  });
  return value;
}
function shallowFreeze(obj) {
  if (__DEV__ && !Object.isFrozen(obj)) {
    try {
      Object.freeze(obj);
    } catch (e2) {
      if (e2 instanceof TypeError)
        return null;
      throw e2;
    }
  }
  return obj;
}
function maybeDeepFreeze(obj) {
  if (__DEV__) {
    deepFreeze(obj);
  }
  return obj;
}
function iterateObserversSafely(observers, method, argument) {
  var observersWithMethod = [];
  observers.forEach(function(obs) {
    return obs[method] && observersWithMethod.push(obs);
  });
  observersWithMethod.forEach(function(obs) {
    return obs[method](argument);
  });
}
function asyncMap(observable, mapFn, catchFn) {
  return new Observable(function(observer) {
    var next = observer.next, error = observer.error, complete = observer.complete;
    var activeCallbackCount = 0;
    var completed = false;
    var promiseQueue = {
      then: function(callback) {
        return new Promise(function(resolve4) {
          return resolve4(callback());
        });
      }
    };
    function makeCallback(examiner, delegate) {
      if (examiner) {
        return function(arg) {
          ++activeCallbackCount;
          var both = function() {
            return examiner(arg);
          };
          promiseQueue = promiseQueue.then(both, both).then(function(result) {
            --activeCallbackCount;
            next && next.call(observer, result);
            if (completed) {
              handler.complete();
            }
          }, function(error2) {
            --activeCallbackCount;
            throw error2;
          }).catch(function(caught) {
            error && error.call(observer, caught);
          });
        };
      } else {
        return function(arg) {
          return delegate && delegate.call(observer, arg);
        };
      }
    }
    var handler = {
      next: makeCallback(mapFn, next),
      error: makeCallback(catchFn, error),
      complete: function() {
        completed = true;
        if (!activeCallbackCount) {
          complete && complete.call(observer);
        }
      }
    };
    var sub = observable.subscribe(handler);
    return function() {
      return sub.unsubscribe();
    };
  });
}
var canUseWeakMap = typeof WeakMap === "function" && maybe$1(function() {
  return navigator.product;
}) !== "ReactNative";
var canUseWeakSet = typeof WeakSet === "function";
var canUseSymbol = typeof Symbol === "function" && typeof Symbol.for === "function";
var canUseDOM = typeof maybe$1(function() {
  return window.document.createElement;
}) === "function";
var usingJSDOM = maybe$1(function() {
  return navigator.userAgent.indexOf("jsdom") >= 0;
}) || false;
var canUseLayoutEffect = canUseDOM && !usingJSDOM;
function fixObservableSubclass(subclass) {
  function set(key) {
    Object.defineProperty(subclass, key, { value: Observable });
  }
  if (canUseSymbol && Symbol.species) {
    set(Symbol.species);
  }
  set("@@species");
  return subclass;
}
function isPromiseLike(value) {
  return value && typeof value.then === "function";
}
var Concast = function(_super) {
  __extends$1(Concast2, _super);
  function Concast2(sources) {
    var _this = _super.call(this, function(observer) {
      _this.addObserver(observer);
      return function() {
        return _this.removeObserver(observer);
      };
    }) || this;
    _this.observers = /* @__PURE__ */ new Set();
    _this.addCount = 0;
    _this.promise = new Promise(function(resolve4, reject) {
      _this.resolve = resolve4;
      _this.reject = reject;
    });
    _this.handlers = {
      next: function(result) {
        if (_this.sub !== null) {
          _this.latest = ["next", result];
          iterateObserversSafely(_this.observers, "next", result);
        }
      },
      error: function(error) {
        var sub = _this.sub;
        if (sub !== null) {
          if (sub)
            setTimeout(function() {
              return sub.unsubscribe();
            });
          _this.sub = null;
          _this.latest = ["error", error];
          _this.reject(error);
          iterateObserversSafely(_this.observers, "error", error);
        }
      },
      complete: function() {
        var sub = _this.sub;
        if (sub !== null) {
          var value = _this.sources.shift();
          if (!value) {
            if (sub)
              setTimeout(function() {
                return sub.unsubscribe();
              });
            _this.sub = null;
            if (_this.latest && _this.latest[0] === "next") {
              _this.resolve(_this.latest[1]);
            } else {
              _this.resolve();
            }
            iterateObserversSafely(_this.observers, "complete");
          } else if (isPromiseLike(value)) {
            value.then(function(obs) {
              return _this.sub = obs.subscribe(_this.handlers);
            });
          } else {
            _this.sub = value.subscribe(_this.handlers);
          }
        }
      }
    };
    _this.cancel = function(reason) {
      _this.reject(reason);
      _this.sources = [];
      _this.handlers.complete();
    };
    _this.promise.catch(function(_2) {
    });
    if (typeof sources === "function") {
      sources = [new Observable(sources)];
    }
    if (isPromiseLike(sources)) {
      sources.then(function(iterable) {
        return _this.start(iterable);
      }, _this.handlers.error);
    } else {
      _this.start(sources);
    }
    return _this;
  }
  Concast2.prototype.start = function(sources) {
    if (this.sub !== void 0)
      return;
    this.sources = Array.from(sources);
    this.handlers.complete();
  };
  Concast2.prototype.deliverLastMessage = function(observer) {
    if (this.latest) {
      var nextOrError = this.latest[0];
      var method = observer[nextOrError];
      if (method) {
        method.call(observer, this.latest[1]);
      }
      if (this.sub === null && nextOrError === "next" && observer.complete) {
        observer.complete();
      }
    }
  };
  Concast2.prototype.addObserver = function(observer) {
    if (!this.observers.has(observer)) {
      this.deliverLastMessage(observer);
      this.observers.add(observer);
      ++this.addCount;
    }
  };
  Concast2.prototype.removeObserver = function(observer, quietly) {
    if (this.observers.delete(observer) && --this.addCount < 1 && !quietly) {
      this.handlers.complete();
    }
  };
  Concast2.prototype.cleanup = function(callback) {
    var _this = this;
    var called = false;
    var once = function() {
      if (!called) {
        called = true;
        _this.observers.delete(observer);
        callback();
      }
    };
    var observer = {
      next: once,
      error: once,
      complete: once
    };
    var count = this.addCount;
    this.addObserver(observer);
    this.addCount = count;
  };
  return Concast2;
}(Observable);
fixObservableSubclass(Concast);
function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}
function graphQLResultHasError(result) {
  return result.errors && result.errors.length > 0 || false;
}
function compact() {
  var objects = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    objects[_i] = arguments[_i];
  }
  var result = /* @__PURE__ */ Object.create(null);
  objects.forEach(function(obj) {
    if (!obj)
      return;
    Object.keys(obj).forEach(function(key) {
      var value = obj[key];
      if (value !== void 0) {
        result[key] = value;
      }
    });
  });
  return result;
}
var prefixCounts = /* @__PURE__ */ new Map();
function makeUniqueId(prefix) {
  var count = prefixCounts.get(prefix) || 1;
  prefixCounts.set(prefix, count + 1);
  return "".concat(prefix, ":").concat(count, ":").concat(Math.random().toString(36).slice(2));
}
function stringifyForDisplay(value) {
  var undefId = makeUniqueId("stringifyForDisplay");
  return JSON.stringify(value, function(key, value2) {
    return value2 === void 0 ? undefId : value2;
  }).split(JSON.stringify(undefId)).join("<undefined>");
}
function mergeOptions(defaults, options) {
  return compact(defaults, options, options.variables && {
    variables: __assign$1(__assign$1({}, defaults && defaults.variables), options.variables)
  });
}
var utilities = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEV,
  maybe: maybe$1,
  shouldInclude,
  hasDirectives,
  hasClientExports,
  getDirectiveNames,
  getInclusionDirectives,
  createFragmentMap,
  getFragmentQueryDocument,
  getFragmentFromSelection,
  checkDocument,
  getOperationDefinition,
  getOperationName,
  getFragmentDefinitions,
  getQueryDefinition,
  getFragmentDefinition,
  getMainDefinition,
  getDefaultValues,
  makeReference,
  isDocumentNode,
  isReference,
  isField,
  isInlineFragment,
  valueToObjectRepresentation,
  storeKeyNameFromField,
  argumentsObjectFromField,
  resultKeyNameFromField,
  getStoreKeyName,
  getTypenameFromResult,
  addTypenameToDocument,
  buildQueryFromSelectionSet,
  removeDirectivesFromDocument,
  removeConnectionDirectiveFromDocument,
  removeArgumentsFromDocument,
  removeFragmentSpreadFromDocument,
  removeClientSetsFromDocument,
  concatPagination,
  offsetLimitPagination,
  relayStylePagination,
  Observable,
  mergeDeep,
  mergeDeepArray,
  DeepMerger,
  cloneDeep,
  maybeDeepFreeze,
  iterateObserversSafely,
  asyncMap,
  Concast,
  fixObservableSubclass,
  isNonEmptyArray,
  isNonNullObject,
  graphQLResultHasError,
  canUseWeakMap,
  canUseWeakSet,
  canUseSymbol,
  canUseDOM,
  canUseLayoutEffect,
  compact,
  makeUniqueId,
  stringifyForDisplay,
  mergeOptions
}, Symbol.toStringTag, { value: "Module" }));
function fromError(errorValue) {
  return new Observable(function(observer) {
    observer.error(errorValue);
  });
}
function toPromise(observable) {
  var completed = false;
  return new Promise(function(resolve4, reject) {
    observable.subscribe({
      next: function(data) {
        if (completed) {
          __DEV__ && invariant$1.warn("Promise Wrapper does not support multiple results from Observable");
        } else {
          completed = true;
          resolve4(data);
        }
      },
      error: reject
    });
  });
}
function fromPromise(promise) {
  return new Observable(function(observer) {
    promise.then(function(value) {
      observer.next(value);
      observer.complete();
    }).catch(observer.error.bind(observer));
  });
}
var throwServerError = function(response, result, message) {
  var error = new Error(message);
  error.name = "ServerError";
  error.response = response;
  error.statusCode = response.status;
  error.result = result;
  throw error;
};
function validateOperation(operation) {
  var OPERATION_FIELDS = [
    "query",
    "operationName",
    "variables",
    "extensions",
    "context"
  ];
  for (var _i = 0, _a2 = Object.keys(operation); _i < _a2.length; _i++) {
    var key = _a2[_i];
    if (OPERATION_FIELDS.indexOf(key) < 0) {
      throw __DEV__ ? new InvariantError("illegal argument: ".concat(key)) : new InvariantError(24);
    }
  }
  return operation;
}
function createOperation(starting, operation) {
  var context = __assign$1({}, starting);
  var setContext = function(next) {
    if (typeof next === "function") {
      context = __assign$1(__assign$1({}, context), next(context));
    } else {
      context = __assign$1(__assign$1({}, context), next);
    }
  };
  var getContext = function() {
    return __assign$1({}, context);
  };
  Object.defineProperty(operation, "setContext", {
    enumerable: false,
    value: setContext
  });
  Object.defineProperty(operation, "getContext", {
    enumerable: false,
    value: getContext
  });
  return operation;
}
function transformOperation(operation) {
  var transformedOperation = {
    variables: operation.variables || {},
    extensions: operation.extensions || {},
    operationName: operation.operationName,
    query: operation.query
  };
  if (!transformedOperation.operationName) {
    transformedOperation.operationName = typeof transformedOperation.query !== "string" ? getOperationName(transformedOperation.query) || void 0 : "";
  }
  return transformedOperation;
}
function passthrough(op, forward) {
  return forward ? forward(op) : Observable.of();
}
function toLink(handler) {
  return typeof handler === "function" ? new ApolloLink(handler) : handler;
}
function isTerminating(link) {
  return link.request.length <= 1;
}
var LinkError = function(_super) {
  __extends$1(LinkError2, _super);
  function LinkError2(message, link) {
    var _this = _super.call(this, message) || this;
    _this.link = link;
    return _this;
  }
  return LinkError2;
}(Error);
var ApolloLink = function() {
  function ApolloLink2(request) {
    if (request)
      this.request = request;
  }
  ApolloLink2.empty = function() {
    return new ApolloLink2(function() {
      return Observable.of();
    });
  };
  ApolloLink2.from = function(links) {
    if (links.length === 0)
      return ApolloLink2.empty();
    return links.map(toLink).reduce(function(x2, y2) {
      return x2.concat(y2);
    });
  };
  ApolloLink2.split = function(test, left, right) {
    var leftLink = toLink(left);
    var rightLink = toLink(right || new ApolloLink2(passthrough));
    if (isTerminating(leftLink) && isTerminating(rightLink)) {
      return new ApolloLink2(function(operation) {
        return test(operation) ? leftLink.request(operation) || Observable.of() : rightLink.request(operation) || Observable.of();
      });
    } else {
      return new ApolloLink2(function(operation, forward) {
        return test(operation) ? leftLink.request(operation, forward) || Observable.of() : rightLink.request(operation, forward) || Observable.of();
      });
    }
  };
  ApolloLink2.execute = function(link, operation) {
    return link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || Observable.of();
  };
  ApolloLink2.concat = function(first, second) {
    var firstLink = toLink(first);
    if (isTerminating(firstLink)) {
      __DEV__ && invariant$1.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
      return firstLink;
    }
    var nextLink = toLink(second);
    if (isTerminating(nextLink)) {
      return new ApolloLink2(function(operation) {
        return firstLink.request(operation, function(op) {
          return nextLink.request(op) || Observable.of();
        }) || Observable.of();
      });
    } else {
      return new ApolloLink2(function(operation, forward) {
        return firstLink.request(operation, function(op) {
          return nextLink.request(op, forward) || Observable.of();
        }) || Observable.of();
      });
    }
  };
  ApolloLink2.prototype.split = function(test, left, right) {
    return this.concat(ApolloLink2.split(test, left, right || new ApolloLink2(passthrough)));
  };
  ApolloLink2.prototype.concat = function(next) {
    return ApolloLink2.concat(this, next);
  };
  ApolloLink2.prototype.request = function(operation, forward) {
    throw __DEV__ ? new InvariantError("request is not implemented") : new InvariantError(19);
  };
  ApolloLink2.prototype.onError = function(error, observer) {
    if (observer && observer.error) {
      observer.error(error);
      return false;
    }
    throw error;
  };
  ApolloLink2.prototype.setOnError = function(fn) {
    this.onError = fn;
    return this;
  };
  return ApolloLink2;
}();
var empty = ApolloLink.empty;
var from = ApolloLink.from;
var split = ApolloLink.split;
var concat = ApolloLink.concat;
var execute = ApolloLink.execute;
var version = "3.6.9";
var hasOwnProperty$4 = Object.prototype.hasOwnProperty;
function parseAndCheckHttpResponse(operations) {
  return function(response) {
    return response.text().then(function(bodyText) {
      try {
        return JSON.parse(bodyText);
      } catch (err) {
        var parseError = err;
        parseError.name = "ServerParseError";
        parseError.response = response;
        parseError.statusCode = response.status;
        parseError.bodyText = bodyText;
        throw parseError;
      }
    }).then(function(result) {
      if (response.status >= 300) {
        throwServerError(response, result, "Response not successful: Received status code ".concat(response.status));
      }
      if (!Array.isArray(result) && !hasOwnProperty$4.call(result, "data") && !hasOwnProperty$4.call(result, "errors")) {
        throwServerError(response, result, "Server response was missing for query '".concat(Array.isArray(operations) ? operations.map(function(op) {
          return op.operationName;
        }) : operations.operationName, "'."));
      }
      return result;
    });
  };
}
var serializeFetchParameter = function(p2, label) {
  var serialized;
  try {
    serialized = JSON.stringify(p2);
  } catch (e2) {
    var parseError = __DEV__ ? new InvariantError("Network request failed. ".concat(label, " is not serializable: ").concat(e2.message)) : new InvariantError(21);
    parseError.parseError = e2;
    throw parseError;
  }
  return serialized;
};
var defaultHttpOptions = {
  includeQuery: true,
  includeExtensions: false
};
var defaultHeaders = {
  accept: "*/*",
  "content-type": "application/json"
};
var defaultOptions = {
  method: "POST"
};
var fallbackHttpConfig = {
  http: defaultHttpOptions,
  headers: defaultHeaders,
  options: defaultOptions
};
var defaultPrinter = function(ast, printer) {
  return printer(ast);
};
function selectHttpOptionsAndBody(operation, fallbackConfig) {
  var configs = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    configs[_i - 2] = arguments[_i];
  }
  configs.unshift(fallbackConfig);
  return selectHttpOptionsAndBodyInternal.apply(void 0, __spreadArray([
    operation,
    defaultPrinter
  ], configs, false));
}
function selectHttpOptionsAndBodyInternal(operation, printer) {
  var configs = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    configs[_i - 2] = arguments[_i];
  }
  var options = {};
  var http = {};
  configs.forEach(function(config) {
    options = __assign$1(__assign$1(__assign$1({}, options), config.options), { headers: __assign$1(__assign$1({}, options.headers), headersToLowerCase(config.headers)) });
    if (config.credentials) {
      options.credentials = config.credentials;
    }
    http = __assign$1(__assign$1({}, http), config.http);
  });
  var operationName = operation.operationName, extensions = operation.extensions, variables = operation.variables, query = operation.query;
  var body = { operationName, variables };
  if (http.includeExtensions)
    body.extensions = extensions;
  if (http.includeQuery)
    body.query = printer(query, print);
  return {
    options,
    body
  };
}
function headersToLowerCase(headers) {
  if (headers) {
    var normalized_1 = /* @__PURE__ */ Object.create(null);
    Object.keys(Object(headers)).forEach(function(name) {
      normalized_1[name.toLowerCase()] = headers[name];
    });
    return normalized_1;
  }
  return headers;
}
var checkFetcher = function(fetcher) {
  if (!fetcher && typeof fetch === "undefined") {
    throw __DEV__ ? new InvariantError(`
"fetch" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor. For example:

import fetch from 'cross-fetch';
import { ApolloClient, HttpLink } from '@apollo/client';
const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql', fetch })
});
    `) : new InvariantError(20);
  }
};
var createSignalIfSupported = function() {
  if (typeof AbortController === "undefined")
    return { controller: false, signal: false };
  var controller = new AbortController();
  var signal = controller.signal;
  return { controller, signal };
};
var selectURI = function(operation, fallbackURI) {
  var context = operation.getContext();
  var contextURI = context.uri;
  if (contextURI) {
    return contextURI;
  } else if (typeof fallbackURI === "function") {
    return fallbackURI(operation);
  } else {
    return fallbackURI || "/graphql";
  }
};
function rewriteURIForGET(chosenURI, body) {
  var queryParams = [];
  var addQueryParam = function(key, value) {
    queryParams.push("".concat(key, "=").concat(encodeURIComponent(value)));
  };
  if ("query" in body) {
    addQueryParam("query", body.query);
  }
  if (body.operationName) {
    addQueryParam("operationName", body.operationName);
  }
  if (body.variables) {
    var serializedVariables = void 0;
    try {
      serializedVariables = serializeFetchParameter(body.variables, "Variables map");
    } catch (parseError) {
      return { parseError };
    }
    addQueryParam("variables", serializedVariables);
  }
  if (body.extensions) {
    var serializedExtensions = void 0;
    try {
      serializedExtensions = serializeFetchParameter(body.extensions, "Extensions map");
    } catch (parseError) {
      return { parseError };
    }
    addQueryParam("extensions", serializedExtensions);
  }
  var fragment = "", preFragment = chosenURI;
  var fragmentStart = chosenURI.indexOf("#");
  if (fragmentStart !== -1) {
    fragment = chosenURI.substr(fragmentStart);
    preFragment = chosenURI.substr(0, fragmentStart);
  }
  var queryParamsPrefix = preFragment.indexOf("?") === -1 ? "?" : "&";
  var newURI = preFragment + queryParamsPrefix + queryParams.join("&") + fragment;
  return { newURI };
}
var backupFetch = maybe$1(function() {
  return fetch;
});
var createHttpLink$1 = function(linkOptions) {
  if (linkOptions === void 0) {
    linkOptions = {};
  }
  var _a2 = linkOptions.uri, uri = _a2 === void 0 ? "/graphql" : _a2, preferredFetch = linkOptions.fetch, _b = linkOptions.print, print2 = _b === void 0 ? defaultPrinter : _b, includeExtensions = linkOptions.includeExtensions, useGETForQueries = linkOptions.useGETForQueries, _c = linkOptions.includeUnusedVariables, includeUnusedVariables = _c === void 0 ? false : _c, requestOptions = __rest(linkOptions, ["uri", "fetch", "print", "includeExtensions", "useGETForQueries", "includeUnusedVariables"]);
  if (__DEV__) {
    checkFetcher(preferredFetch || backupFetch);
  }
  var linkConfig = {
    http: { includeExtensions },
    options: requestOptions.fetchOptions,
    credentials: requestOptions.credentials,
    headers: requestOptions.headers
  };
  return new ApolloLink(function(operation) {
    var chosenURI = selectURI(operation, uri);
    var context = operation.getContext();
    var clientAwarenessHeaders = {};
    if (context.clientAwareness) {
      var _a3 = context.clientAwareness, name_1 = _a3.name, version2 = _a3.version;
      if (name_1) {
        clientAwarenessHeaders["apollographql-client-name"] = name_1;
      }
      if (version2) {
        clientAwarenessHeaders["apollographql-client-version"] = version2;
      }
    }
    var contextHeaders = __assign$1(__assign$1({}, clientAwarenessHeaders), context.headers);
    var contextConfig = {
      http: context.http,
      options: context.fetchOptions,
      credentials: context.credentials,
      headers: contextHeaders
    };
    var _b2 = selectHttpOptionsAndBodyInternal(operation, print2, fallbackHttpConfig, linkConfig, contextConfig), options = _b2.options, body = _b2.body;
    if (body.variables && !includeUnusedVariables) {
      var unusedNames_1 = new Set(Object.keys(body.variables));
      visit(operation.query, {
        Variable: function(node, _key, parent) {
          if (parent && parent.kind !== "VariableDefinition") {
            unusedNames_1.delete(node.name.value);
          }
        }
      });
      if (unusedNames_1.size) {
        body.variables = __assign$1({}, body.variables);
        unusedNames_1.forEach(function(name) {
          delete body.variables[name];
        });
      }
    }
    var controller;
    if (!options.signal) {
      var _c2 = createSignalIfSupported(), _controller = _c2.controller, signal = _c2.signal;
      controller = _controller;
      if (controller)
        options.signal = signal;
    }
    var definitionIsMutation = function(d2) {
      return d2.kind === "OperationDefinition" && d2.operation === "mutation";
    };
    if (useGETForQueries && !operation.query.definitions.some(definitionIsMutation)) {
      options.method = "GET";
    }
    if (options.method === "GET") {
      var _d = rewriteURIForGET(chosenURI, body), newURI = _d.newURI, parseError = _d.parseError;
      if (parseError) {
        return fromError(parseError);
      }
      chosenURI = newURI;
    } else {
      try {
        options.body = serializeFetchParameter(body, "Payload");
      } catch (parseError2) {
        return fromError(parseError2);
      }
    }
    return new Observable(function(observer) {
      var currentFetch = preferredFetch || maybe$1(function() {
        return fetch;
      }) || backupFetch;
      currentFetch(chosenURI, options).then(function(response) {
        operation.setContext({ response });
        return response;
      }).then(parseAndCheckHttpResponse(operation)).then(function(result) {
        observer.next(result);
        observer.complete();
        return result;
      }).catch(function(err) {
        if (err.name === "AbortError")
          return;
        if (err.result && err.result.errors && err.result.data) {
          observer.next(err.result);
        }
        observer.error(err);
      });
      return function() {
        if (controller)
          controller.abort();
      };
    });
  });
};
var HttpLink = function(_super) {
  __extends$1(HttpLink2, _super);
  function HttpLink2(options) {
    if (options === void 0) {
      options = {};
    }
    var _this = _super.call(this, createHttpLink$1(options).request) || this;
    _this.options = options;
    return _this;
  }
  return HttpLink2;
}(ApolloLink);
var _a$2 = Object.prototype, toString3 = _a$2.toString, hasOwnProperty$3 = _a$2.hasOwnProperty;
var fnToStr = Function.prototype.toString;
var previousComparisons = /* @__PURE__ */ new Map();
function equal(a2, b2) {
  try {
    return check(a2, b2);
  } finally {
    previousComparisons.clear();
  }
}
function check(a2, b2) {
  if (a2 === b2) {
    return true;
  }
  var aTag = toString3.call(a2);
  var bTag = toString3.call(b2);
  if (aTag !== bTag) {
    return false;
  }
  switch (aTag) {
    case "[object Array]":
      if (a2.length !== b2.length)
        return false;
    case "[object Object]": {
      if (previouslyCompared(a2, b2))
        return true;
      var aKeys = definedKeys(a2);
      var bKeys = definedKeys(b2);
      var keyCount = aKeys.length;
      if (keyCount !== bKeys.length)
        return false;
      for (var k2 = 0; k2 < keyCount; ++k2) {
        if (!hasOwnProperty$3.call(b2, aKeys[k2])) {
          return false;
        }
      }
      for (var k2 = 0; k2 < keyCount; ++k2) {
        var key = aKeys[k2];
        if (!check(a2[key], b2[key])) {
          return false;
        }
      }
      return true;
    }
    case "[object Error]":
      return a2.name === b2.name && a2.message === b2.message;
    case "[object Number]":
      if (a2 !== a2)
        return b2 !== b2;
    case "[object Boolean]":
    case "[object Date]":
      return +a2 === +b2;
    case "[object RegExp]":
    case "[object String]":
      return a2 == "".concat(b2);
    case "[object Map]":
    case "[object Set]": {
      if (a2.size !== b2.size)
        return false;
      if (previouslyCompared(a2, b2))
        return true;
      var aIterator = a2.entries();
      var isMap = aTag === "[object Map]";
      while (true) {
        var info = aIterator.next();
        if (info.done)
          break;
        var _a2 = info.value, aKey = _a2[0], aValue = _a2[1];
        if (!b2.has(aKey)) {
          return false;
        }
        if (isMap && !check(aValue, b2.get(aKey))) {
          return false;
        }
      }
      return true;
    }
    case "[object Uint16Array]":
    case "[object Uint8Array]":
    case "[object Uint32Array]":
    case "[object Int32Array]":
    case "[object Int8Array]":
    case "[object Int16Array]":
    case "[object ArrayBuffer]":
      a2 = new Uint8Array(a2);
      b2 = new Uint8Array(b2);
    case "[object DataView]": {
      var len = a2.byteLength;
      if (len === b2.byteLength) {
        while (len-- && a2[len] === b2[len]) {
        }
      }
      return len === -1;
    }
    case "[object AsyncFunction]":
    case "[object GeneratorFunction]":
    case "[object AsyncGeneratorFunction]":
    case "[object Function]": {
      var aCode = fnToStr.call(a2);
      if (aCode !== fnToStr.call(b2)) {
        return false;
      }
      return !endsWith(aCode, nativeCodeSuffix);
    }
  }
  return false;
}
function definedKeys(obj) {
  return Object.keys(obj).filter(isDefinedKey, obj);
}
function isDefinedKey(key) {
  return this[key] !== void 0;
}
var nativeCodeSuffix = "{ [native code] }";
function endsWith(full, suffix) {
  var fromIndex = full.length - suffix.length;
  return fromIndex >= 0 && full.indexOf(suffix, fromIndex) === fromIndex;
}
function previouslyCompared(a2, b2) {
  var bSet = previousComparisons.get(a2);
  if (bSet) {
    if (bSet.has(b2))
      return true;
  } else {
    previousComparisons.set(a2, bSet = /* @__PURE__ */ new Set());
  }
  bSet.add(b2);
  return false;
}
var defaultMakeData = function() {
  return /* @__PURE__ */ Object.create(null);
};
var _a$1 = Array.prototype, forEach = _a$1.forEach, slice = _a$1.slice;
var Trie = function() {
  function Trie2(weakness, makeData) {
    if (weakness === void 0) {
      weakness = true;
    }
    if (makeData === void 0) {
      makeData = defaultMakeData;
    }
    this.weakness = weakness;
    this.makeData = makeData;
  }
  Trie2.prototype.lookup = function() {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      array[_i] = arguments[_i];
    }
    return this.lookupArray(array);
  };
  Trie2.prototype.lookupArray = function(array) {
    var node = this;
    forEach.call(array, function(key) {
      return node = node.getChildTrie(key);
    });
    return node.data || (node.data = this.makeData(slice.call(array)));
  };
  Trie2.prototype.getChildTrie = function(key) {
    var map = this.weakness && isObjRef(key) ? this.weak || (this.weak = /* @__PURE__ */ new WeakMap()) : this.strong || (this.strong = /* @__PURE__ */ new Map());
    var child = map.get(key);
    if (!child)
      map.set(key, child = new Trie2(this.weakness, this.makeData));
    return child;
  };
  return Trie2;
}();
function isObjRef(value) {
  switch (typeof value) {
    case "object":
      if (value === null)
        break;
    case "function":
      return true;
  }
  return false;
}
var currentContext = null;
var MISSING_VALUE = {};
var idCounter = 1;
var makeSlotClass = function() {
  return function() {
    function Slot2() {
      this.id = [
        "slot",
        idCounter++,
        Date.now(),
        Math.random().toString(36).slice(2)
      ].join(":");
    }
    Slot2.prototype.hasValue = function() {
      for (var context_1 = currentContext; context_1; context_1 = context_1.parent) {
        if (this.id in context_1.slots) {
          var value = context_1.slots[this.id];
          if (value === MISSING_VALUE)
            break;
          if (context_1 !== currentContext) {
            currentContext.slots[this.id] = value;
          }
          return true;
        }
      }
      if (currentContext) {
        currentContext.slots[this.id] = MISSING_VALUE;
      }
      return false;
    };
    Slot2.prototype.getValue = function() {
      if (this.hasValue()) {
        return currentContext.slots[this.id];
      }
    };
    Slot2.prototype.withValue = function(value, callback, args, thisArg) {
      var _a2;
      var slots = (_a2 = {
        __proto__: null
      }, _a2[this.id] = value, _a2);
      var parent = currentContext;
      currentContext = { parent, slots };
      try {
        return callback.apply(thisArg, args);
      } finally {
        currentContext = parent;
      }
    };
    Slot2.bind = function(callback) {
      var context = currentContext;
      return function() {
        var saved = currentContext;
        try {
          currentContext = context;
          return callback.apply(this, arguments);
        } finally {
          currentContext = saved;
        }
      };
    };
    Slot2.noContext = function(callback, args, thisArg) {
      if (currentContext) {
        var saved = currentContext;
        try {
          currentContext = null;
          return callback.apply(thisArg, args);
        } finally {
          currentContext = saved;
        }
      } else {
        return callback.apply(thisArg, args);
      }
    };
    return Slot2;
  }();
};
var globalKey = "@wry/context:Slot";
var host = Array;
var Slot = host[globalKey] || function() {
  var Slot2 = makeSlotClass();
  try {
    Object.defineProperty(host, globalKey, {
      value: host[globalKey] = Slot2,
      enumerable: false,
      writable: false,
      configurable: false
    });
  } finally {
    return Slot2;
  }
}();
Slot.bind;
Slot.noContext;
function defaultDispose() {
}
var Cache$1 = function() {
  function Cache2(max, dispose) {
    if (max === void 0) {
      max = Infinity;
    }
    if (dispose === void 0) {
      dispose = defaultDispose;
    }
    this.max = max;
    this.dispose = dispose;
    this.map = /* @__PURE__ */ new Map();
    this.newest = null;
    this.oldest = null;
  }
  Cache2.prototype.has = function(key) {
    return this.map.has(key);
  };
  Cache2.prototype.get = function(key) {
    var node = this.getNode(key);
    return node && node.value;
  };
  Cache2.prototype.getNode = function(key) {
    var node = this.map.get(key);
    if (node && node !== this.newest) {
      var older = node.older, newer = node.newer;
      if (newer) {
        newer.older = older;
      }
      if (older) {
        older.newer = newer;
      }
      node.older = this.newest;
      node.older.newer = node;
      node.newer = null;
      this.newest = node;
      if (node === this.oldest) {
        this.oldest = newer;
      }
    }
    return node;
  };
  Cache2.prototype.set = function(key, value) {
    var node = this.getNode(key);
    if (node) {
      return node.value = value;
    }
    node = {
      key,
      value,
      newer: null,
      older: this.newest
    };
    if (this.newest) {
      this.newest.newer = node;
    }
    this.newest = node;
    this.oldest = this.oldest || node;
    this.map.set(key, node);
    return node.value;
  };
  Cache2.prototype.clean = function() {
    while (this.oldest && this.map.size > this.max) {
      this.delete(this.oldest.key);
    }
  };
  Cache2.prototype.delete = function(key) {
    var node = this.map.get(key);
    if (node) {
      if (node === this.newest) {
        this.newest = node.older;
      }
      if (node === this.oldest) {
        this.oldest = node.newer;
      }
      if (node.newer) {
        node.newer.older = node.older;
      }
      if (node.older) {
        node.older.newer = node.newer;
      }
      this.map.delete(key);
      this.dispose(node.value, key);
      return true;
    }
    return false;
  };
  return Cache2;
}();
var parentEntrySlot = new Slot();
var _a;
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
var toArray = (_a = Array.from, _a === void 0 ? function(collection) {
  var array = [];
  collection.forEach(function(item) {
    return array.push(item);
  });
  return array;
} : _a);
function maybeUnsubscribe(entryOrDep) {
  var unsubscribe = entryOrDep.unsubscribe;
  if (typeof unsubscribe === "function") {
    entryOrDep.unsubscribe = void 0;
    unsubscribe();
  }
}
var emptySetPool = [];
var POOL_TARGET_SIZE = 100;
function assert(condition, optionalMessage) {
  if (!condition) {
    throw new Error(optionalMessage || "assertion failure");
  }
}
function valueIs(a2, b2) {
  var len = a2.length;
  return len > 0 && len === b2.length && a2[len - 1] === b2[len - 1];
}
function valueGet(value) {
  switch (value.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return value[0];
    case 2:
      throw value[1];
  }
}
function valueCopy(value) {
  return value.slice(0);
}
var Entry = function() {
  function Entry2(fn) {
    this.fn = fn;
    this.parents = /* @__PURE__ */ new Set();
    this.childValues = /* @__PURE__ */ new Map();
    this.dirtyChildren = null;
    this.dirty = true;
    this.recomputing = false;
    this.value = [];
    this.deps = null;
    ++Entry2.count;
  }
  Entry2.prototype.peek = function() {
    if (this.value.length === 1 && !mightBeDirty(this)) {
      rememberParent(this);
      return this.value[0];
    }
  };
  Entry2.prototype.recompute = function(args) {
    assert(!this.recomputing, "already recomputing");
    rememberParent(this);
    return mightBeDirty(this) ? reallyRecompute(this, args) : valueGet(this.value);
  };
  Entry2.prototype.setDirty = function() {
    if (this.dirty)
      return;
    this.dirty = true;
    this.value.length = 0;
    reportDirty(this);
    maybeUnsubscribe(this);
  };
  Entry2.prototype.dispose = function() {
    var _this = this;
    this.setDirty();
    forgetChildren(this);
    eachParent(this, function(parent, child) {
      parent.setDirty();
      forgetChild(parent, _this);
    });
  };
  Entry2.prototype.forget = function() {
    this.dispose();
  };
  Entry2.prototype.dependOn = function(dep2) {
    dep2.add(this);
    if (!this.deps) {
      this.deps = emptySetPool.pop() || /* @__PURE__ */ new Set();
    }
    this.deps.add(dep2);
  };
  Entry2.prototype.forgetDeps = function() {
    var _this = this;
    if (this.deps) {
      toArray(this.deps).forEach(function(dep2) {
        return dep2.delete(_this);
      });
      this.deps.clear();
      emptySetPool.push(this.deps);
      this.deps = null;
    }
  };
  Entry2.count = 0;
  return Entry2;
}();
function rememberParent(child) {
  var parent = parentEntrySlot.getValue();
  if (parent) {
    child.parents.add(parent);
    if (!parent.childValues.has(child)) {
      parent.childValues.set(child, []);
    }
    if (mightBeDirty(child)) {
      reportDirtyChild(parent, child);
    } else {
      reportCleanChild(parent, child);
    }
    return parent;
  }
}
function reallyRecompute(entry, args) {
  forgetChildren(entry);
  parentEntrySlot.withValue(entry, recomputeNewValue, [entry, args]);
  if (maybeSubscribe(entry, args)) {
    setClean(entry);
  }
  return valueGet(entry.value);
}
function recomputeNewValue(entry, args) {
  entry.recomputing = true;
  entry.value.length = 0;
  try {
    entry.value[0] = entry.fn.apply(null, args);
  } catch (e2) {
    entry.value[1] = e2;
  }
  entry.recomputing = false;
}
function mightBeDirty(entry) {
  return entry.dirty || !!(entry.dirtyChildren && entry.dirtyChildren.size);
}
function setClean(entry) {
  entry.dirty = false;
  if (mightBeDirty(entry)) {
    return;
  }
  reportClean(entry);
}
function reportDirty(child) {
  eachParent(child, reportDirtyChild);
}
function reportClean(child) {
  eachParent(child, reportCleanChild);
}
function eachParent(child, callback) {
  var parentCount = child.parents.size;
  if (parentCount) {
    var parents = toArray(child.parents);
    for (var i = 0; i < parentCount; ++i) {
      callback(parents[i], child);
    }
  }
}
function reportDirtyChild(parent, child) {
  assert(parent.childValues.has(child));
  assert(mightBeDirty(child));
  var parentWasClean = !mightBeDirty(parent);
  if (!parent.dirtyChildren) {
    parent.dirtyChildren = emptySetPool.pop() || /* @__PURE__ */ new Set();
  } else if (parent.dirtyChildren.has(child)) {
    return;
  }
  parent.dirtyChildren.add(child);
  if (parentWasClean) {
    reportDirty(parent);
  }
}
function reportCleanChild(parent, child) {
  assert(parent.childValues.has(child));
  assert(!mightBeDirty(child));
  var childValue = parent.childValues.get(child);
  if (childValue.length === 0) {
    parent.childValues.set(child, valueCopy(child.value));
  } else if (!valueIs(childValue, child.value)) {
    parent.setDirty();
  }
  removeDirtyChild(parent, child);
  if (mightBeDirty(parent)) {
    return;
  }
  reportClean(parent);
}
function removeDirtyChild(parent, child) {
  var dc = parent.dirtyChildren;
  if (dc) {
    dc.delete(child);
    if (dc.size === 0) {
      if (emptySetPool.length < POOL_TARGET_SIZE) {
        emptySetPool.push(dc);
      }
      parent.dirtyChildren = null;
    }
  }
}
function forgetChildren(parent) {
  if (parent.childValues.size > 0) {
    parent.childValues.forEach(function(_value, child) {
      forgetChild(parent, child);
    });
  }
  parent.forgetDeps();
  assert(parent.dirtyChildren === null);
}
function forgetChild(parent, child) {
  child.parents.delete(parent);
  parent.childValues.delete(child);
  removeDirtyChild(parent, child);
}
function maybeSubscribe(entry, args) {
  if (typeof entry.subscribe === "function") {
    try {
      maybeUnsubscribe(entry);
      entry.unsubscribe = entry.subscribe.apply(null, args);
    } catch (e2) {
      entry.setDirty();
      return false;
    }
  }
  return true;
}
var EntryMethods = {
  setDirty: true,
  dispose: true,
  forget: true
};
function dep(options) {
  var depsByKey = /* @__PURE__ */ new Map();
  var subscribe2 = options && options.subscribe;
  function depend(key) {
    var parent = parentEntrySlot.getValue();
    if (parent) {
      var dep_1 = depsByKey.get(key);
      if (!dep_1) {
        depsByKey.set(key, dep_1 = /* @__PURE__ */ new Set());
      }
      parent.dependOn(dep_1);
      if (typeof subscribe2 === "function") {
        maybeUnsubscribe(dep_1);
        dep_1.unsubscribe = subscribe2(key);
      }
    }
  }
  depend.dirty = function dirty(key, entryMethodName) {
    var dep2 = depsByKey.get(key);
    if (dep2) {
      var m_1 = entryMethodName && hasOwnProperty$2.call(EntryMethods, entryMethodName) ? entryMethodName : "setDirty";
      toArray(dep2).forEach(function(entry) {
        return entry[m_1]();
      });
      depsByKey.delete(key);
      maybeUnsubscribe(dep2);
    }
  };
  return depend;
}
function makeDefaultMakeCacheKeyFunction() {
  var keyTrie = new Trie(typeof WeakMap === "function");
  return function() {
    return keyTrie.lookupArray(arguments);
  };
}
makeDefaultMakeCacheKeyFunction();
var caches = /* @__PURE__ */ new Set();
function wrap(originalFunction, options) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  var cache2 = new Cache$1(options.max || Math.pow(2, 16), function(entry) {
    return entry.dispose();
  });
  var keyArgs = options.keyArgs;
  var makeCacheKey = options.makeCacheKey || makeDefaultMakeCacheKeyFunction();
  var optimistic = function() {
    var key = makeCacheKey.apply(null, keyArgs ? keyArgs.apply(null, arguments) : arguments);
    if (key === void 0) {
      return originalFunction.apply(null, arguments);
    }
    var entry = cache2.get(key);
    if (!entry) {
      cache2.set(key, entry = new Entry(originalFunction));
      entry.subscribe = options.subscribe;
      entry.forget = function() {
        return cache2.delete(key);
      };
    }
    var value = entry.recompute(Array.prototype.slice.call(arguments));
    cache2.set(key, entry);
    caches.add(cache2);
    if (!parentEntrySlot.hasValue()) {
      caches.forEach(function(cache3) {
        return cache3.clean();
      });
      caches.clear();
    }
    return value;
  };
  Object.defineProperty(optimistic, "size", {
    get: function() {
      return cache2["map"].size;
    },
    configurable: false,
    enumerable: false
  });
  function dirtyKey(key) {
    var entry = cache2.get(key);
    if (entry) {
      entry.setDirty();
    }
  }
  optimistic.dirtyKey = dirtyKey;
  optimistic.dirty = function dirty() {
    dirtyKey(makeCacheKey.apply(null, arguments));
  };
  function peekKey(key) {
    var entry = cache2.get(key);
    if (entry) {
      return entry.peek();
    }
  }
  optimistic.peekKey = peekKey;
  optimistic.peek = function peek() {
    return peekKey(makeCacheKey.apply(null, arguments));
  };
  function forgetKey(key) {
    return cache2.delete(key);
  }
  optimistic.forgetKey = forgetKey;
  optimistic.forget = function forget() {
    return forgetKey(makeCacheKey.apply(null, arguments));
  };
  optimistic.makeCacheKey = makeCacheKey;
  optimistic.getKey = keyArgs ? function getKey() {
    return makeCacheKey.apply(null, keyArgs.apply(null, arguments));
  } : makeCacheKey;
  return Object.freeze(optimistic);
}
var ApolloCache = function() {
  function ApolloCache2() {
    this.getFragmentDoc = wrap(getFragmentQueryDocument);
  }
  ApolloCache2.prototype.batch = function(options) {
    var _this = this;
    var optimisticId = typeof options.optimistic === "string" ? options.optimistic : options.optimistic === false ? null : void 0;
    var updateResult;
    this.performTransaction(function() {
      return updateResult = options.update(_this);
    }, optimisticId);
    return updateResult;
  };
  ApolloCache2.prototype.recordOptimisticTransaction = function(transaction, optimisticId) {
    this.performTransaction(transaction, optimisticId);
  };
  ApolloCache2.prototype.transformDocument = function(document2) {
    return document2;
  };
  ApolloCache2.prototype.identify = function(object) {
    return;
  };
  ApolloCache2.prototype.gc = function() {
    return [];
  };
  ApolloCache2.prototype.modify = function(options) {
    return false;
  };
  ApolloCache2.prototype.transformForLink = function(document2) {
    return document2;
  };
  ApolloCache2.prototype.readQuery = function(options, optimistic) {
    if (optimistic === void 0) {
      optimistic = !!options.optimistic;
    }
    return this.read(__assign$1(__assign$1({}, options), { rootId: options.id || "ROOT_QUERY", optimistic }));
  };
  ApolloCache2.prototype.readFragment = function(options, optimistic) {
    if (optimistic === void 0) {
      optimistic = !!options.optimistic;
    }
    return this.read(__assign$1(__assign$1({}, options), { query: this.getFragmentDoc(options.fragment, options.fragmentName), rootId: options.id, optimistic }));
  };
  ApolloCache2.prototype.writeQuery = function(_a2) {
    var id = _a2.id, data = _a2.data, options = __rest(_a2, ["id", "data"]);
    return this.write(Object.assign(options, {
      dataId: id || "ROOT_QUERY",
      result: data
    }));
  };
  ApolloCache2.prototype.writeFragment = function(_a2) {
    var id = _a2.id, data = _a2.data, fragment = _a2.fragment, fragmentName = _a2.fragmentName, options = __rest(_a2, ["id", "data", "fragment", "fragmentName"]);
    return this.write(Object.assign(options, {
      query: this.getFragmentDoc(fragment, fragmentName),
      dataId: id,
      result: data
    }));
  };
  ApolloCache2.prototype.updateQuery = function(options, update) {
    return this.batch({
      update: function(cache2) {
        var value = cache2.readQuery(options);
        var data = update(value);
        if (data === void 0 || data === null)
          return value;
        cache2.writeQuery(__assign$1(__assign$1({}, options), { data }));
        return data;
      }
    });
  };
  ApolloCache2.prototype.updateFragment = function(options, update) {
    return this.batch({
      update: function(cache2) {
        var value = cache2.readFragment(options);
        var data = update(value);
        if (data === void 0 || data === null)
          return value;
        cache2.writeFragment(__assign$1(__assign$1({}, options), { data }));
        return data;
      }
    });
  };
  return ApolloCache2;
}();
var Cache;
(function(Cache2) {
})(Cache || (Cache = {}));
var MissingFieldError = function() {
  function MissingFieldError2(message, path, query, variables) {
    this.message = message;
    this.path = path;
    this.query = query;
    this.variables = variables;
  }
  return MissingFieldError2;
}();
var hasOwn = Object.prototype.hasOwnProperty;
function defaultDataIdFromObject(_a2, context) {
  var __typename = _a2.__typename, id = _a2.id, _id = _a2._id;
  if (typeof __typename === "string") {
    if (context) {
      context.keyObject = id !== void 0 ? { id } : _id !== void 0 ? { _id } : void 0;
    }
    if (id === void 0)
      id = _id;
    if (id !== void 0) {
      return "".concat(__typename, ":").concat(typeof id === "number" || typeof id === "string" ? id : JSON.stringify(id));
    }
  }
}
var defaultConfig = {
  dataIdFromObject: defaultDataIdFromObject,
  addTypename: true,
  resultCaching: true,
  canonizeResults: false
};
function normalizeConfig(config) {
  return compact(defaultConfig, config);
}
function shouldCanonizeResults(config) {
  var value = config.canonizeResults;
  return value === void 0 ? defaultConfig.canonizeResults : value;
}
function getTypenameFromStoreObject(store, objectOrReference) {
  return isReference(objectOrReference) ? store.get(objectOrReference.__ref, "__typename") : objectOrReference && objectOrReference.__typename;
}
var TypeOrFieldNameRegExp = /^[_a-z][_0-9a-z]*/i;
function fieldNameFromStoreName(storeFieldName) {
  var match = storeFieldName.match(TypeOrFieldNameRegExp);
  return match ? match[0] : storeFieldName;
}
function selectionSetMatchesResult(selectionSet, result, variables) {
  if (isNonNullObject(result)) {
    return isArray(result) ? result.every(function(item) {
      return selectionSetMatchesResult(selectionSet, item, variables);
    }) : selectionSet.selections.every(function(field) {
      if (isField(field) && shouldInclude(field, variables)) {
        var key = resultKeyNameFromField(field);
        return hasOwn.call(result, key) && (!field.selectionSet || selectionSetMatchesResult(field.selectionSet, result[key], variables));
      }
      return true;
    });
  }
  return false;
}
function storeValueIsStoreObject(value) {
  return isNonNullObject(value) && !isReference(value) && !isArray(value);
}
function makeProcessedFieldsMerger() {
  return new DeepMerger();
}
var isArray = function(a2) {
  return Array.isArray(a2);
};
var DELETE = /* @__PURE__ */ Object.create(null);
var delModifier = function() {
  return DELETE;
};
var INVALIDATE = /* @__PURE__ */ Object.create(null);
var EntityStore = function() {
  function EntityStore2(policies, group) {
    var _this = this;
    this.policies = policies;
    this.group = group;
    this.data = /* @__PURE__ */ Object.create(null);
    this.rootIds = /* @__PURE__ */ Object.create(null);
    this.refs = /* @__PURE__ */ Object.create(null);
    this.getFieldValue = function(objectOrReference, storeFieldName) {
      return maybeDeepFreeze(isReference(objectOrReference) ? _this.get(objectOrReference.__ref, storeFieldName) : objectOrReference && objectOrReference[storeFieldName]);
    };
    this.canRead = function(objOrRef) {
      return isReference(objOrRef) ? _this.has(objOrRef.__ref) : typeof objOrRef === "object";
    };
    this.toReference = function(objOrIdOrRef, mergeIntoStore) {
      if (typeof objOrIdOrRef === "string") {
        return makeReference(objOrIdOrRef);
      }
      if (isReference(objOrIdOrRef)) {
        return objOrIdOrRef;
      }
      var id = _this.policies.identify(objOrIdOrRef)[0];
      if (id) {
        var ref = makeReference(id);
        if (mergeIntoStore) {
          _this.merge(id, objOrIdOrRef);
        }
        return ref;
      }
    };
  }
  EntityStore2.prototype.toObject = function() {
    return __assign$1({}, this.data);
  };
  EntityStore2.prototype.has = function(dataId) {
    return this.lookup(dataId, true) !== void 0;
  };
  EntityStore2.prototype.get = function(dataId, fieldName) {
    this.group.depend(dataId, fieldName);
    if (hasOwn.call(this.data, dataId)) {
      var storeObject = this.data[dataId];
      if (storeObject && hasOwn.call(storeObject, fieldName)) {
        return storeObject[fieldName];
      }
    }
    if (fieldName === "__typename" && hasOwn.call(this.policies.rootTypenamesById, dataId)) {
      return this.policies.rootTypenamesById[dataId];
    }
    if (this instanceof Layer) {
      return this.parent.get(dataId, fieldName);
    }
  };
  EntityStore2.prototype.lookup = function(dataId, dependOnExistence) {
    if (dependOnExistence)
      this.group.depend(dataId, "__exists");
    if (hasOwn.call(this.data, dataId)) {
      return this.data[dataId];
    }
    if (this instanceof Layer) {
      return this.parent.lookup(dataId, dependOnExistence);
    }
    if (this.policies.rootTypenamesById[dataId]) {
      return /* @__PURE__ */ Object.create(null);
    }
  };
  EntityStore2.prototype.merge = function(older, newer) {
    var _this = this;
    var dataId;
    if (isReference(older))
      older = older.__ref;
    if (isReference(newer))
      newer = newer.__ref;
    var existing = typeof older === "string" ? this.lookup(dataId = older) : older;
    var incoming = typeof newer === "string" ? this.lookup(dataId = newer) : newer;
    if (!incoming)
      return;
    __DEV__ ? invariant$1(typeof dataId === "string", "store.merge expects a string ID") : invariant$1(typeof dataId === "string", 1);
    var merged = new DeepMerger(storeObjectReconciler).merge(existing, incoming);
    this.data[dataId] = merged;
    if (merged !== existing) {
      delete this.refs[dataId];
      if (this.group.caching) {
        var fieldsToDirty_1 = /* @__PURE__ */ Object.create(null);
        if (!existing)
          fieldsToDirty_1.__exists = 1;
        Object.keys(incoming).forEach(function(storeFieldName) {
          if (!existing || existing[storeFieldName] !== merged[storeFieldName]) {
            fieldsToDirty_1[storeFieldName] = 1;
            var fieldName = fieldNameFromStoreName(storeFieldName);
            if (fieldName !== storeFieldName && !_this.policies.hasKeyArgs(merged.__typename, fieldName)) {
              fieldsToDirty_1[fieldName] = 1;
            }
            if (merged[storeFieldName] === void 0 && !(_this instanceof Layer)) {
              delete merged[storeFieldName];
            }
          }
        });
        if (fieldsToDirty_1.__typename && !(existing && existing.__typename) && this.policies.rootTypenamesById[dataId] === merged.__typename) {
          delete fieldsToDirty_1.__typename;
        }
        Object.keys(fieldsToDirty_1).forEach(function(fieldName) {
          return _this.group.dirty(dataId, fieldName);
        });
      }
    }
  };
  EntityStore2.prototype.modify = function(dataId, fields7) {
    var _this = this;
    var storeObject = this.lookup(dataId);
    if (storeObject) {
      var changedFields_1 = /* @__PURE__ */ Object.create(null);
      var needToMerge_1 = false;
      var allDeleted_1 = true;
      var sharedDetails_1 = {
        DELETE,
        INVALIDATE,
        isReference,
        toReference: this.toReference,
        canRead: this.canRead,
        readField: function(fieldNameOrOptions, from2) {
          return _this.policies.readField(typeof fieldNameOrOptions === "string" ? {
            fieldName: fieldNameOrOptions,
            from: from2 || makeReference(dataId)
          } : fieldNameOrOptions, { store: _this });
        }
      };
      Object.keys(storeObject).forEach(function(storeFieldName) {
        var fieldName = fieldNameFromStoreName(storeFieldName);
        var fieldValue = storeObject[storeFieldName];
        if (fieldValue === void 0)
          return;
        var modify = typeof fields7 === "function" ? fields7 : fields7[storeFieldName] || fields7[fieldName];
        if (modify) {
          var newValue = modify === delModifier ? DELETE : modify(maybeDeepFreeze(fieldValue), __assign$1(__assign$1({}, sharedDetails_1), { fieldName, storeFieldName, storage: _this.getStorage(dataId, storeFieldName) }));
          if (newValue === INVALIDATE) {
            _this.group.dirty(dataId, storeFieldName);
          } else {
            if (newValue === DELETE)
              newValue = void 0;
            if (newValue !== fieldValue) {
              changedFields_1[storeFieldName] = newValue;
              needToMerge_1 = true;
              fieldValue = newValue;
            }
          }
        }
        if (fieldValue !== void 0) {
          allDeleted_1 = false;
        }
      });
      if (needToMerge_1) {
        this.merge(dataId, changedFields_1);
        if (allDeleted_1) {
          if (this instanceof Layer) {
            this.data[dataId] = void 0;
          } else {
            delete this.data[dataId];
          }
          this.group.dirty(dataId, "__exists");
        }
        return true;
      }
    }
    return false;
  };
  EntityStore2.prototype.delete = function(dataId, fieldName, args) {
    var _a2;
    var storeObject = this.lookup(dataId);
    if (storeObject) {
      var typename = this.getFieldValue(storeObject, "__typename");
      var storeFieldName = fieldName && args ? this.policies.getStoreFieldName({ typename, fieldName, args }) : fieldName;
      return this.modify(dataId, storeFieldName ? (_a2 = {}, _a2[storeFieldName] = delModifier, _a2) : delModifier);
    }
    return false;
  };
  EntityStore2.prototype.evict = function(options, limit) {
    var evicted = false;
    if (options.id) {
      if (hasOwn.call(this.data, options.id)) {
        evicted = this.delete(options.id, options.fieldName, options.args);
      }
      if (this instanceof Layer && this !== limit) {
        evicted = this.parent.evict(options, limit) || evicted;
      }
      if (options.fieldName || evicted) {
        this.group.dirty(options.id, options.fieldName || "__exists");
      }
    }
    return evicted;
  };
  EntityStore2.prototype.clear = function() {
    this.replace(null);
  };
  EntityStore2.prototype.extract = function() {
    var _this = this;
    var obj = this.toObject();
    var extraRootIds = [];
    this.getRootIdSet().forEach(function(id) {
      if (!hasOwn.call(_this.policies.rootTypenamesById, id)) {
        extraRootIds.push(id);
      }
    });
    if (extraRootIds.length) {
      obj.__META = { extraRootIds: extraRootIds.sort() };
    }
    return obj;
  };
  EntityStore2.prototype.replace = function(newData) {
    var _this = this;
    Object.keys(this.data).forEach(function(dataId) {
      if (!(newData && hasOwn.call(newData, dataId))) {
        _this.delete(dataId);
      }
    });
    if (newData) {
      var __META = newData.__META, rest_1 = __rest(newData, ["__META"]);
      Object.keys(rest_1).forEach(function(dataId) {
        _this.merge(dataId, rest_1[dataId]);
      });
      if (__META) {
        __META.extraRootIds.forEach(this.retain, this);
      }
    }
  };
  EntityStore2.prototype.retain = function(rootId) {
    return this.rootIds[rootId] = (this.rootIds[rootId] || 0) + 1;
  };
  EntityStore2.prototype.release = function(rootId) {
    if (this.rootIds[rootId] > 0) {
      var count = --this.rootIds[rootId];
      if (!count)
        delete this.rootIds[rootId];
      return count;
    }
    return 0;
  };
  EntityStore2.prototype.getRootIdSet = function(ids) {
    if (ids === void 0) {
      ids = /* @__PURE__ */ new Set();
    }
    Object.keys(this.rootIds).forEach(ids.add, ids);
    if (this instanceof Layer) {
      this.parent.getRootIdSet(ids);
    } else {
      Object.keys(this.policies.rootTypenamesById).forEach(ids.add, ids);
    }
    return ids;
  };
  EntityStore2.prototype.gc = function() {
    var _this = this;
    var ids = this.getRootIdSet();
    var snapshot = this.toObject();
    ids.forEach(function(id) {
      if (hasOwn.call(snapshot, id)) {
        Object.keys(_this.findChildRefIds(id)).forEach(ids.add, ids);
        delete snapshot[id];
      }
    });
    var idsToRemove = Object.keys(snapshot);
    if (idsToRemove.length) {
      var root_1 = this;
      while (root_1 instanceof Layer)
        root_1 = root_1.parent;
      idsToRemove.forEach(function(id) {
        return root_1.delete(id);
      });
    }
    return idsToRemove;
  };
  EntityStore2.prototype.findChildRefIds = function(dataId) {
    if (!hasOwn.call(this.refs, dataId)) {
      var found_1 = this.refs[dataId] = /* @__PURE__ */ Object.create(null);
      var root = this.data[dataId];
      if (!root)
        return found_1;
      var workSet_1 = /* @__PURE__ */ new Set([root]);
      workSet_1.forEach(function(obj) {
        if (isReference(obj)) {
          found_1[obj.__ref] = true;
        }
        if (isNonNullObject(obj)) {
          Object.keys(obj).forEach(function(key) {
            var child = obj[key];
            if (isNonNullObject(child)) {
              workSet_1.add(child);
            }
          });
        }
      });
    }
    return this.refs[dataId];
  };
  EntityStore2.prototype.makeCacheKey = function() {
    return this.group.keyMaker.lookupArray(arguments);
  };
  return EntityStore2;
}();
var CacheGroup = function() {
  function CacheGroup2(caching, parent) {
    if (parent === void 0) {
      parent = null;
    }
    this.caching = caching;
    this.parent = parent;
    this.d = null;
    this.resetCaching();
  }
  CacheGroup2.prototype.resetCaching = function() {
    this.d = this.caching ? dep() : null;
    this.keyMaker = new Trie(canUseWeakMap);
  };
  CacheGroup2.prototype.depend = function(dataId, storeFieldName) {
    if (this.d) {
      this.d(makeDepKey(dataId, storeFieldName));
      var fieldName = fieldNameFromStoreName(storeFieldName);
      if (fieldName !== storeFieldName) {
        this.d(makeDepKey(dataId, fieldName));
      }
      if (this.parent) {
        this.parent.depend(dataId, storeFieldName);
      }
    }
  };
  CacheGroup2.prototype.dirty = function(dataId, storeFieldName) {
    if (this.d) {
      this.d.dirty(makeDepKey(dataId, storeFieldName), storeFieldName === "__exists" ? "forget" : "setDirty");
    }
  };
  return CacheGroup2;
}();
function makeDepKey(dataId, storeFieldName) {
  return storeFieldName + "#" + dataId;
}
function maybeDependOnExistenceOfEntity(store, entityId) {
  if (supportsResultCaching(store)) {
    store.group.depend(entityId, "__exists");
  }
}
(function(EntityStore2) {
  var Root = function(_super) {
    __extends$1(Root2, _super);
    function Root2(_a2) {
      var policies = _a2.policies, _b = _a2.resultCaching, resultCaching = _b === void 0 ? true : _b, seed = _a2.seed;
      var _this = _super.call(this, policies, new CacheGroup(resultCaching)) || this;
      _this.stump = new Stump(_this);
      _this.storageTrie = new Trie(canUseWeakMap);
      if (seed)
        _this.replace(seed);
      return _this;
    }
    Root2.prototype.addLayer = function(layerId, replay) {
      return this.stump.addLayer(layerId, replay);
    };
    Root2.prototype.removeLayer = function() {
      return this;
    };
    Root2.prototype.getStorage = function() {
      return this.storageTrie.lookupArray(arguments);
    };
    return Root2;
  }(EntityStore2);
  EntityStore2.Root = Root;
})(EntityStore || (EntityStore = {}));
var Layer = function(_super) {
  __extends$1(Layer2, _super);
  function Layer2(id, parent, replay, group) {
    var _this = _super.call(this, parent.policies, group) || this;
    _this.id = id;
    _this.parent = parent;
    _this.replay = replay;
    _this.group = group;
    replay(_this);
    return _this;
  }
  Layer2.prototype.addLayer = function(layerId, replay) {
    return new Layer2(layerId, this, replay, this.group);
  };
  Layer2.prototype.removeLayer = function(layerId) {
    var _this = this;
    var parent = this.parent.removeLayer(layerId);
    if (layerId === this.id) {
      if (this.group.caching) {
        Object.keys(this.data).forEach(function(dataId) {
          var ownStoreObject = _this.data[dataId];
          var parentStoreObject = parent["lookup"](dataId);
          if (!parentStoreObject) {
            _this.delete(dataId);
          } else if (!ownStoreObject) {
            _this.group.dirty(dataId, "__exists");
            Object.keys(parentStoreObject).forEach(function(storeFieldName) {
              _this.group.dirty(dataId, storeFieldName);
            });
          } else if (ownStoreObject !== parentStoreObject) {
            Object.keys(ownStoreObject).forEach(function(storeFieldName) {
              if (!equal(ownStoreObject[storeFieldName], parentStoreObject[storeFieldName])) {
                _this.group.dirty(dataId, storeFieldName);
              }
            });
          }
        });
      }
      return parent;
    }
    if (parent === this.parent)
      return this;
    return parent.addLayer(this.id, this.replay);
  };
  Layer2.prototype.toObject = function() {
    return __assign$1(__assign$1({}, this.parent.toObject()), this.data);
  };
  Layer2.prototype.findChildRefIds = function(dataId) {
    var fromParent = this.parent.findChildRefIds(dataId);
    return hasOwn.call(this.data, dataId) ? __assign$1(__assign$1({}, fromParent), _super.prototype.findChildRefIds.call(this, dataId)) : fromParent;
  };
  Layer2.prototype.getStorage = function() {
    var p2 = this.parent;
    while (p2.parent)
      p2 = p2.parent;
    return p2.getStorage.apply(p2, arguments);
  };
  return Layer2;
}(EntityStore);
var Stump = function(_super) {
  __extends$1(Stump2, _super);
  function Stump2(root) {
    return _super.call(this, "EntityStore.Stump", root, function() {
    }, new CacheGroup(root.group.caching, root.group)) || this;
  }
  Stump2.prototype.removeLayer = function() {
    return this;
  };
  Stump2.prototype.merge = function() {
    return this.parent.merge.apply(this.parent, arguments);
  };
  return Stump2;
}(Layer);
function storeObjectReconciler(existingObject, incomingObject, property) {
  var existingValue = existingObject[property];
  var incomingValue = incomingObject[property];
  return equal(existingValue, incomingValue) ? existingValue : incomingValue;
}
function supportsResultCaching(store) {
  return !!(store instanceof EntityStore && store.group.caching);
}
function shallowCopy(value) {
  if (isNonNullObject(value)) {
    return isArray(value) ? value.slice(0) : __assign$1({ __proto__: Object.getPrototypeOf(value) }, value);
  }
  return value;
}
var ObjectCanon = function() {
  function ObjectCanon2() {
    this.known = new (canUseWeakSet ? WeakSet : Set)();
    this.pool = new Trie(canUseWeakMap);
    this.passes = /* @__PURE__ */ new WeakMap();
    this.keysByJSON = /* @__PURE__ */ new Map();
    this.empty = this.admit({});
  }
  ObjectCanon2.prototype.isKnown = function(value) {
    return isNonNullObject(value) && this.known.has(value);
  };
  ObjectCanon2.prototype.pass = function(value) {
    if (isNonNullObject(value)) {
      var copy = shallowCopy(value);
      this.passes.set(copy, value);
      return copy;
    }
    return value;
  };
  ObjectCanon2.prototype.admit = function(value) {
    var _this = this;
    if (isNonNullObject(value)) {
      var original = this.passes.get(value);
      if (original)
        return original;
      var proto = Object.getPrototypeOf(value);
      switch (proto) {
        case Array.prototype: {
          if (this.known.has(value))
            return value;
          var array = value.map(this.admit, this);
          var node = this.pool.lookupArray(array);
          if (!node.array) {
            this.known.add(node.array = array);
            if (__DEV__) {
              Object.freeze(array);
            }
          }
          return node.array;
        }
        case null:
        case Object.prototype: {
          if (this.known.has(value))
            return value;
          var proto_1 = Object.getPrototypeOf(value);
          var array_1 = [proto_1];
          var keys = this.sortedKeys(value);
          array_1.push(keys.json);
          var firstValueIndex_1 = array_1.length;
          keys.sorted.forEach(function(key) {
            array_1.push(_this.admit(value[key]));
          });
          var node = this.pool.lookupArray(array_1);
          if (!node.object) {
            var obj_1 = node.object = Object.create(proto_1);
            this.known.add(obj_1);
            keys.sorted.forEach(function(key, i) {
              obj_1[key] = array_1[firstValueIndex_1 + i];
            });
            if (__DEV__) {
              Object.freeze(obj_1);
            }
          }
          return node.object;
        }
      }
    }
    return value;
  };
  ObjectCanon2.prototype.sortedKeys = function(obj) {
    var keys = Object.keys(obj);
    var node = this.pool.lookupArray(keys);
    if (!node.keys) {
      keys.sort();
      var json = JSON.stringify(keys);
      if (!(node.keys = this.keysByJSON.get(json))) {
        this.keysByJSON.set(json, node.keys = { sorted: keys, json });
      }
    }
    return node.keys;
  };
  return ObjectCanon2;
}();
var canonicalStringify = Object.assign(function(value) {
  if (isNonNullObject(value)) {
    if (stringifyCanon === void 0) {
      resetCanonicalStringify();
    }
    var canonical = stringifyCanon.admit(value);
    var json = stringifyCache.get(canonical);
    if (json === void 0) {
      stringifyCache.set(canonical, json = JSON.stringify(canonical));
    }
    return json;
  }
  return JSON.stringify(value);
}, {
  reset: resetCanonicalStringify
});
var stringifyCanon;
var stringifyCache;
function resetCanonicalStringify() {
  stringifyCanon = new ObjectCanon();
  stringifyCache = new (canUseWeakMap ? WeakMap : Map)();
}
function execSelectionSetKeyArgs(options) {
  return [
    options.selectionSet,
    options.objectOrReference,
    options.context,
    options.context.canonizeResults
  ];
}
var StoreReader = function() {
  function StoreReader2(config) {
    var _this = this;
    this.knownResults = new (canUseWeakMap ? WeakMap : Map)();
    this.config = compact(config, {
      addTypename: config.addTypename !== false,
      canonizeResults: shouldCanonizeResults(config)
    });
    this.canon = config.canon || new ObjectCanon();
    this.executeSelectionSet = wrap(function(options) {
      var _a2;
      var canonizeResults = options.context.canonizeResults;
      var peekArgs = execSelectionSetKeyArgs(options);
      peekArgs[3] = !canonizeResults;
      var other = (_a2 = _this.executeSelectionSet).peek.apply(_a2, peekArgs);
      if (other) {
        if (canonizeResults) {
          return __assign$1(__assign$1({}, other), { result: _this.canon.admit(other.result) });
        }
        return other;
      }
      maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
      return _this.execSelectionSetImpl(options);
    }, {
      max: this.config.resultCacheMaxSize,
      keyArgs: execSelectionSetKeyArgs,
      makeCacheKey: function(selectionSet, parent, context, canonizeResults) {
        if (supportsResultCaching(context.store)) {
          return context.store.makeCacheKey(selectionSet, isReference(parent) ? parent.__ref : parent, context.varString, canonizeResults);
        }
      }
    });
    this.executeSubSelectedArray = wrap(function(options) {
      maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
      return _this.execSubSelectedArrayImpl(options);
    }, {
      max: this.config.resultCacheMaxSize,
      makeCacheKey: function(_a2) {
        var field = _a2.field, array = _a2.array, context = _a2.context;
        if (supportsResultCaching(context.store)) {
          return context.store.makeCacheKey(field, array, context.varString);
        }
      }
    });
  }
  StoreReader2.prototype.resetCanon = function() {
    this.canon = new ObjectCanon();
  };
  StoreReader2.prototype.diffQueryAgainstStore = function(_a2) {
    var store = _a2.store, query = _a2.query, _b = _a2.rootId, rootId = _b === void 0 ? "ROOT_QUERY" : _b, variables = _a2.variables, _c = _a2.returnPartialData, returnPartialData = _c === void 0 ? true : _c, _d = _a2.canonizeResults, canonizeResults = _d === void 0 ? this.config.canonizeResults : _d;
    var policies = this.config.cache.policies;
    variables = __assign$1(__assign$1({}, getDefaultValues(getQueryDefinition(query))), variables);
    var rootRef = makeReference(rootId);
    var execResult = this.executeSelectionSet({
      selectionSet: getMainDefinition(query).selectionSet,
      objectOrReference: rootRef,
      enclosingRef: rootRef,
      context: {
        store,
        query,
        policies,
        variables,
        varString: canonicalStringify(variables),
        canonizeResults,
        fragmentMap: createFragmentMap(getFragmentDefinitions(query))
      }
    });
    var missing;
    if (execResult.missing) {
      missing = [new MissingFieldError(firstMissing(execResult.missing), execResult.missing, query, variables)];
      if (!returnPartialData) {
        throw missing[0];
      }
    }
    return {
      result: execResult.result,
      complete: !missing,
      missing
    };
  };
  StoreReader2.prototype.isFresh = function(result, parent, selectionSet, context) {
    if (supportsResultCaching(context.store) && this.knownResults.get(result) === selectionSet) {
      var latest = this.executeSelectionSet.peek(selectionSet, parent, context, this.canon.isKnown(result));
      if (latest && result === latest.result) {
        return true;
      }
    }
    return false;
  };
  StoreReader2.prototype.execSelectionSetImpl = function(_a2) {
    var _this = this;
    var selectionSet = _a2.selectionSet, objectOrReference = _a2.objectOrReference, enclosingRef = _a2.enclosingRef, context = _a2.context;
    if (isReference(objectOrReference) && !context.policies.rootTypenamesById[objectOrReference.__ref] && !context.store.has(objectOrReference.__ref)) {
      return {
        result: this.canon.empty,
        missing: "Dangling reference to missing ".concat(objectOrReference.__ref, " object")
      };
    }
    var variables = context.variables, policies = context.policies, store = context.store;
    var typename = store.getFieldValue(objectOrReference, "__typename");
    var objectsToMerge = [];
    var missing;
    var missingMerger = new DeepMerger();
    if (this.config.addTypename && typeof typename === "string" && !policies.rootIdsByTypename[typename]) {
      objectsToMerge.push({ __typename: typename });
    }
    function handleMissing(result2, resultName) {
      var _a3;
      if (result2.missing) {
        missing = missingMerger.merge(missing, (_a3 = {}, _a3[resultName] = result2.missing, _a3));
      }
      return result2.result;
    }
    var workSet = new Set(selectionSet.selections);
    workSet.forEach(function(selection) {
      var _a3, _b;
      if (!shouldInclude(selection, variables))
        return;
      if (isField(selection)) {
        var fieldValue = policies.readField({
          fieldName: selection.name.value,
          field: selection,
          variables: context.variables,
          from: objectOrReference
        }, context);
        var resultName = resultKeyNameFromField(selection);
        if (fieldValue === void 0) {
          if (!addTypenameToDocument.added(selection)) {
            missing = missingMerger.merge(missing, (_a3 = {}, _a3[resultName] = "Can't find field '".concat(selection.name.value, "' on ").concat(isReference(objectOrReference) ? objectOrReference.__ref + " object" : "object " + JSON.stringify(objectOrReference, null, 2)), _a3));
          }
        } else if (isArray(fieldValue)) {
          fieldValue = handleMissing(_this.executeSubSelectedArray({
            field: selection,
            array: fieldValue,
            enclosingRef,
            context
          }), resultName);
        } else if (!selection.selectionSet) {
          if (context.canonizeResults) {
            fieldValue = _this.canon.pass(fieldValue);
          }
        } else if (fieldValue != null) {
          fieldValue = handleMissing(_this.executeSelectionSet({
            selectionSet: selection.selectionSet,
            objectOrReference: fieldValue,
            enclosingRef: isReference(fieldValue) ? fieldValue : enclosingRef,
            context
          }), resultName);
        }
        if (fieldValue !== void 0) {
          objectsToMerge.push((_b = {}, _b[resultName] = fieldValue, _b));
        }
      } else {
        var fragment = getFragmentFromSelection(selection, context.fragmentMap);
        if (fragment && policies.fragmentMatches(fragment, typename)) {
          fragment.selectionSet.selections.forEach(workSet.add, workSet);
        }
      }
    });
    var result = mergeDeepArray(objectsToMerge);
    var finalResult = { result, missing };
    var frozen = context.canonizeResults ? this.canon.admit(finalResult) : maybeDeepFreeze(finalResult);
    if (frozen.result) {
      this.knownResults.set(frozen.result, selectionSet);
    }
    return frozen;
  };
  StoreReader2.prototype.execSubSelectedArrayImpl = function(_a2) {
    var _this = this;
    var field = _a2.field, array = _a2.array, enclosingRef = _a2.enclosingRef, context = _a2.context;
    var missing;
    var missingMerger = new DeepMerger();
    function handleMissing(childResult, i) {
      var _a3;
      if (childResult.missing) {
        missing = missingMerger.merge(missing, (_a3 = {}, _a3[i] = childResult.missing, _a3));
      }
      return childResult.result;
    }
    if (field.selectionSet) {
      array = array.filter(context.store.canRead);
    }
    array = array.map(function(item, i) {
      if (item === null) {
        return null;
      }
      if (isArray(item)) {
        return handleMissing(_this.executeSubSelectedArray({
          field,
          array: item,
          enclosingRef,
          context
        }), i);
      }
      if (field.selectionSet) {
        return handleMissing(_this.executeSelectionSet({
          selectionSet: field.selectionSet,
          objectOrReference: item,
          enclosingRef: isReference(item) ? item : enclosingRef,
          context
        }), i);
      }
      if (__DEV__) {
        assertSelectionSetForIdValue(context.store, field, item);
      }
      return item;
    });
    return {
      result: context.canonizeResults ? this.canon.admit(array) : array,
      missing
    };
  };
  return StoreReader2;
}();
function firstMissing(tree) {
  try {
    JSON.stringify(tree, function(_2, value) {
      if (typeof value === "string")
        throw value;
      return value;
    });
  } catch (result) {
    return result;
  }
}
function assertSelectionSetForIdValue(store, field, fieldValue) {
  if (!field.selectionSet) {
    var workSet_1 = /* @__PURE__ */ new Set([fieldValue]);
    workSet_1.forEach(function(value) {
      if (isNonNullObject(value)) {
        __DEV__ ? invariant$1(!isReference(value), "Missing selection set for object of type ".concat(getTypenameFromStoreObject(store, value), " returned for query field ").concat(field.name.value)) : invariant$1(!isReference(value), 5);
        Object.values(value).forEach(workSet_1.add, workSet_1);
      }
    });
  }
}
var cacheSlot = new Slot();
var cacheInfoMap = /* @__PURE__ */ new WeakMap();
function getCacheInfo(cache2) {
  var info = cacheInfoMap.get(cache2);
  if (!info) {
    cacheInfoMap.set(cache2, info = {
      vars: /* @__PURE__ */ new Set(),
      dep: dep()
    });
  }
  return info;
}
function forgetCache(cache2) {
  getCacheInfo(cache2).vars.forEach(function(rv) {
    return rv.forgetCache(cache2);
  });
}
function recallCache(cache2) {
  getCacheInfo(cache2).vars.forEach(function(rv) {
    return rv.attachCache(cache2);
  });
}
function makeVar(value) {
  var caches2 = /* @__PURE__ */ new Set();
  var listeners = /* @__PURE__ */ new Set();
  var rv = function(newValue) {
    if (arguments.length > 0) {
      if (value !== newValue) {
        value = newValue;
        caches2.forEach(function(cache3) {
          getCacheInfo(cache3).dep.dirty(rv);
          broadcast(cache3);
        });
        var oldListeners = Array.from(listeners);
        listeners.clear();
        oldListeners.forEach(function(listener) {
          return listener(value);
        });
      }
    } else {
      var cache2 = cacheSlot.getValue();
      if (cache2) {
        attach(cache2);
        getCacheInfo(cache2).dep(rv);
      }
    }
    return value;
  };
  rv.onNextChange = function(listener) {
    listeners.add(listener);
    return function() {
      listeners.delete(listener);
    };
  };
  var attach = rv.attachCache = function(cache2) {
    caches2.add(cache2);
    getCacheInfo(cache2).vars.add(rv);
    return rv;
  };
  rv.forgetCache = function(cache2) {
    return caches2.delete(cache2);
  };
  return rv;
}
function broadcast(cache2) {
  if (cache2.broadcastWatches) {
    cache2.broadcastWatches();
  }
}
var specifierInfoCache = /* @__PURE__ */ Object.create(null);
function lookupSpecifierInfo(spec) {
  var cacheKey = JSON.stringify(spec);
  return specifierInfoCache[cacheKey] || (specifierInfoCache[cacheKey] = /* @__PURE__ */ Object.create(null));
}
function keyFieldsFnFromSpecifier(specifier) {
  var info = lookupSpecifierInfo(specifier);
  return info.keyFieldsFn || (info.keyFieldsFn = function(object, context) {
    var extract = function(from2, key) {
      return context.readField(key, from2);
    };
    var keyObject = context.keyObject = collectSpecifierPaths(specifier, function(schemaKeyPath) {
      var extracted = extractKeyPath(context.storeObject, schemaKeyPath, extract);
      if (extracted === void 0 && object !== context.storeObject && hasOwn.call(object, schemaKeyPath[0])) {
        extracted = extractKeyPath(object, schemaKeyPath, extractKey);
      }
      __DEV__ ? invariant$1(extracted !== void 0, "Missing field '".concat(schemaKeyPath.join("."), "' while extracting keyFields from ").concat(JSON.stringify(object))) : invariant$1(extracted !== void 0, 2);
      return extracted;
    });
    return "".concat(context.typename, ":").concat(JSON.stringify(keyObject));
  });
}
function keyArgsFnFromSpecifier(specifier) {
  var info = lookupSpecifierInfo(specifier);
  return info.keyArgsFn || (info.keyArgsFn = function(args, _a2) {
    var field = _a2.field, variables = _a2.variables, fieldName = _a2.fieldName;
    var collected = collectSpecifierPaths(specifier, function(keyPath) {
      var firstKey = keyPath[0];
      var firstChar = firstKey.charAt(0);
      if (firstChar === "@") {
        if (field && isNonEmptyArray(field.directives)) {
          var directiveName_1 = firstKey.slice(1);
          var d2 = field.directives.find(function(d3) {
            return d3.name.value === directiveName_1;
          });
          var directiveArgs = d2 && argumentsObjectFromField(d2, variables);
          return directiveArgs && extractKeyPath(directiveArgs, keyPath.slice(1));
        }
        return;
      }
      if (firstChar === "$") {
        var variableName = firstKey.slice(1);
        if (variables && hasOwn.call(variables, variableName)) {
          var varKeyPath = keyPath.slice(0);
          varKeyPath[0] = variableName;
          return extractKeyPath(variables, varKeyPath);
        }
        return;
      }
      if (args) {
        return extractKeyPath(args, keyPath);
      }
    });
    var suffix = JSON.stringify(collected);
    if (args || suffix !== "{}") {
      fieldName += ":" + suffix;
    }
    return fieldName;
  });
}
function collectSpecifierPaths(specifier, extractor) {
  var merger = new DeepMerger();
  return getSpecifierPaths(specifier).reduce(function(collected, path) {
    var _a2;
    var toMerge = extractor(path);
    if (toMerge !== void 0) {
      for (var i = path.length - 1; i >= 0; --i) {
        toMerge = (_a2 = {}, _a2[path[i]] = toMerge, _a2);
      }
      collected = merger.merge(collected, toMerge);
    }
    return collected;
  }, /* @__PURE__ */ Object.create(null));
}
function getSpecifierPaths(spec) {
  var info = lookupSpecifierInfo(spec);
  if (!info.paths) {
    var paths_1 = info.paths = [];
    var currentPath_1 = [];
    spec.forEach(function(s2, i) {
      if (isArray(s2)) {
        getSpecifierPaths(s2).forEach(function(p2) {
          return paths_1.push(currentPath_1.concat(p2));
        });
        currentPath_1.length = 0;
      } else {
        currentPath_1.push(s2);
        if (!isArray(spec[i + 1])) {
          paths_1.push(currentPath_1.slice(0));
          currentPath_1.length = 0;
        }
      }
    });
  }
  return info.paths;
}
function extractKey(object, key) {
  return object[key];
}
function extractKeyPath(object, path, extract) {
  extract = extract || extractKey;
  return normalize$2(path.reduce(function reducer(obj, key) {
    return isArray(obj) ? obj.map(function(child) {
      return reducer(child, key);
    }) : obj && extract(obj, key);
  }, object));
}
function normalize$2(value) {
  if (isNonNullObject(value)) {
    if (isArray(value)) {
      return value.map(normalize$2);
    }
    return collectSpecifierPaths(Object.keys(value).sort(), function(path) {
      return extractKeyPath(value, path);
    });
  }
  return value;
}
getStoreKeyName.setStringify(canonicalStringify);
function argsFromFieldSpecifier(spec) {
  return spec.args !== void 0 ? spec.args : spec.field ? argumentsObjectFromField(spec.field, spec.variables) : null;
}
var nullKeyFieldsFn = function() {
  return void 0;
};
var simpleKeyArgsFn = function(_args, context) {
  return context.fieldName;
};
var mergeTrueFn = function(existing, incoming, _a2) {
  var mergeObjects = _a2.mergeObjects;
  return mergeObjects(existing, incoming);
};
var mergeFalseFn = function(_2, incoming) {
  return incoming;
};
var Policies = function() {
  function Policies2(config) {
    this.config = config;
    this.typePolicies = /* @__PURE__ */ Object.create(null);
    this.toBeAdded = /* @__PURE__ */ Object.create(null);
    this.supertypeMap = /* @__PURE__ */ new Map();
    this.fuzzySubtypes = /* @__PURE__ */ new Map();
    this.rootIdsByTypename = /* @__PURE__ */ Object.create(null);
    this.rootTypenamesById = /* @__PURE__ */ Object.create(null);
    this.usingPossibleTypes = false;
    this.config = __assign$1({ dataIdFromObject: defaultDataIdFromObject }, config);
    this.cache = this.config.cache;
    this.setRootTypename("Query");
    this.setRootTypename("Mutation");
    this.setRootTypename("Subscription");
    if (config.possibleTypes) {
      this.addPossibleTypes(config.possibleTypes);
    }
    if (config.typePolicies) {
      this.addTypePolicies(config.typePolicies);
    }
  }
  Policies2.prototype.identify = function(object, partialContext) {
    var _a2;
    var policies = this;
    var typename = partialContext && (partialContext.typename || ((_a2 = partialContext.storeObject) === null || _a2 === void 0 ? void 0 : _a2.__typename)) || object.__typename;
    if (typename === this.rootTypenamesById.ROOT_QUERY) {
      return ["ROOT_QUERY"];
    }
    var storeObject = partialContext && partialContext.storeObject || object;
    var context = __assign$1(__assign$1({}, partialContext), { typename, storeObject, readField: partialContext && partialContext.readField || function() {
      var options = normalizeReadFieldOptions(arguments, storeObject);
      return policies.readField(options, {
        store: policies.cache["data"],
        variables: options.variables
      });
    } });
    var id;
    var policy = typename && this.getTypePolicy(typename);
    var keyFn = policy && policy.keyFn || this.config.dataIdFromObject;
    while (keyFn) {
      var specifierOrId = keyFn(object, context);
      if (isArray(specifierOrId)) {
        keyFn = keyFieldsFnFromSpecifier(specifierOrId);
      } else {
        id = specifierOrId;
        break;
      }
    }
    id = id ? String(id) : void 0;
    return context.keyObject ? [id, context.keyObject] : [id];
  };
  Policies2.prototype.addTypePolicies = function(typePolicies) {
    var _this = this;
    Object.keys(typePolicies).forEach(function(typename) {
      var _a2 = typePolicies[typename], queryType = _a2.queryType, mutationType = _a2.mutationType, subscriptionType = _a2.subscriptionType, incoming = __rest(_a2, ["queryType", "mutationType", "subscriptionType"]);
      if (queryType)
        _this.setRootTypename("Query", typename);
      if (mutationType)
        _this.setRootTypename("Mutation", typename);
      if (subscriptionType)
        _this.setRootTypename("Subscription", typename);
      if (hasOwn.call(_this.toBeAdded, typename)) {
        _this.toBeAdded[typename].push(incoming);
      } else {
        _this.toBeAdded[typename] = [incoming];
      }
    });
  };
  Policies2.prototype.updateTypePolicy = function(typename, incoming) {
    var _this = this;
    var existing = this.getTypePolicy(typename);
    var keyFields = incoming.keyFields, fields7 = incoming.fields;
    function setMerge(existing2, merge) {
      existing2.merge = typeof merge === "function" ? merge : merge === true ? mergeTrueFn : merge === false ? mergeFalseFn : existing2.merge;
    }
    setMerge(existing, incoming.merge);
    existing.keyFn = keyFields === false ? nullKeyFieldsFn : isArray(keyFields) ? keyFieldsFnFromSpecifier(keyFields) : typeof keyFields === "function" ? keyFields : existing.keyFn;
    if (fields7) {
      Object.keys(fields7).forEach(function(fieldName) {
        var existing2 = _this.getFieldPolicy(typename, fieldName, true);
        var incoming2 = fields7[fieldName];
        if (typeof incoming2 === "function") {
          existing2.read = incoming2;
        } else {
          var keyArgs = incoming2.keyArgs, read = incoming2.read, merge = incoming2.merge;
          existing2.keyFn = keyArgs === false ? simpleKeyArgsFn : isArray(keyArgs) ? keyArgsFnFromSpecifier(keyArgs) : typeof keyArgs === "function" ? keyArgs : existing2.keyFn;
          if (typeof read === "function") {
            existing2.read = read;
          }
          setMerge(existing2, merge);
        }
        if (existing2.read && existing2.merge) {
          existing2.keyFn = existing2.keyFn || simpleKeyArgsFn;
        }
      });
    }
  };
  Policies2.prototype.setRootTypename = function(which, typename) {
    if (typename === void 0) {
      typename = which;
    }
    var rootId = "ROOT_" + which.toUpperCase();
    var old = this.rootTypenamesById[rootId];
    if (typename !== old) {
      __DEV__ ? invariant$1(!old || old === which, "Cannot change root ".concat(which, " __typename more than once")) : invariant$1(!old || old === which, 3);
      if (old)
        delete this.rootIdsByTypename[old];
      this.rootIdsByTypename[typename] = rootId;
      this.rootTypenamesById[rootId] = typename;
    }
  };
  Policies2.prototype.addPossibleTypes = function(possibleTypes) {
    var _this = this;
    this.usingPossibleTypes = true;
    Object.keys(possibleTypes).forEach(function(supertype) {
      _this.getSupertypeSet(supertype, true);
      possibleTypes[supertype].forEach(function(subtype) {
        _this.getSupertypeSet(subtype, true).add(supertype);
        var match = subtype.match(TypeOrFieldNameRegExp);
        if (!match || match[0] !== subtype) {
          _this.fuzzySubtypes.set(subtype, new RegExp(subtype));
        }
      });
    });
  };
  Policies2.prototype.getTypePolicy = function(typename) {
    var _this = this;
    if (!hasOwn.call(this.typePolicies, typename)) {
      var policy_1 = this.typePolicies[typename] = /* @__PURE__ */ Object.create(null);
      policy_1.fields = /* @__PURE__ */ Object.create(null);
      var supertypes = this.supertypeMap.get(typename);
      if (supertypes && supertypes.size) {
        supertypes.forEach(function(supertype) {
          var _a2 = _this.getTypePolicy(supertype), fields7 = _a2.fields, rest = __rest(_a2, ["fields"]);
          Object.assign(policy_1, rest);
          Object.assign(policy_1.fields, fields7);
        });
      }
    }
    var inbox = this.toBeAdded[typename];
    if (inbox && inbox.length) {
      inbox.splice(0).forEach(function(policy) {
        _this.updateTypePolicy(typename, policy);
      });
    }
    return this.typePolicies[typename];
  };
  Policies2.prototype.getFieldPolicy = function(typename, fieldName, createIfMissing) {
    if (typename) {
      var fieldPolicies = this.getTypePolicy(typename).fields;
      return fieldPolicies[fieldName] || createIfMissing && (fieldPolicies[fieldName] = /* @__PURE__ */ Object.create(null));
    }
  };
  Policies2.prototype.getSupertypeSet = function(subtype, createIfMissing) {
    var supertypeSet = this.supertypeMap.get(subtype);
    if (!supertypeSet && createIfMissing) {
      this.supertypeMap.set(subtype, supertypeSet = /* @__PURE__ */ new Set());
    }
    return supertypeSet;
  };
  Policies2.prototype.fragmentMatches = function(fragment, typename, result, variables) {
    var _this = this;
    if (!fragment.typeCondition)
      return true;
    if (!typename)
      return false;
    var supertype = fragment.typeCondition.name.value;
    if (typename === supertype)
      return true;
    if (this.usingPossibleTypes && this.supertypeMap.has(supertype)) {
      var typenameSupertypeSet = this.getSupertypeSet(typename, true);
      var workQueue_1 = [typenameSupertypeSet];
      var maybeEnqueue_1 = function(subtype) {
        var supertypeSet2 = _this.getSupertypeSet(subtype, false);
        if (supertypeSet2 && supertypeSet2.size && workQueue_1.indexOf(supertypeSet2) < 0) {
          workQueue_1.push(supertypeSet2);
        }
      };
      var needToCheckFuzzySubtypes = !!(result && this.fuzzySubtypes.size);
      var checkingFuzzySubtypes = false;
      for (var i = 0; i < workQueue_1.length; ++i) {
        var supertypeSet = workQueue_1[i];
        if (supertypeSet.has(supertype)) {
          if (!typenameSupertypeSet.has(supertype)) {
            if (checkingFuzzySubtypes) {
              __DEV__ && invariant$1.warn("Inferring subtype ".concat(typename, " of supertype ").concat(supertype));
            }
            typenameSupertypeSet.add(supertype);
          }
          return true;
        }
        supertypeSet.forEach(maybeEnqueue_1);
        if (needToCheckFuzzySubtypes && i === workQueue_1.length - 1 && selectionSetMatchesResult(fragment.selectionSet, result, variables)) {
          needToCheckFuzzySubtypes = false;
          checkingFuzzySubtypes = true;
          this.fuzzySubtypes.forEach(function(regExp, fuzzyString) {
            var match = typename.match(regExp);
            if (match && match[0] === typename) {
              maybeEnqueue_1(fuzzyString);
            }
          });
        }
      }
    }
    return false;
  };
  Policies2.prototype.hasKeyArgs = function(typename, fieldName) {
    var policy = this.getFieldPolicy(typename, fieldName, false);
    return !!(policy && policy.keyFn);
  };
  Policies2.prototype.getStoreFieldName = function(fieldSpec) {
    var typename = fieldSpec.typename, fieldName = fieldSpec.fieldName;
    var policy = this.getFieldPolicy(typename, fieldName, false);
    var storeFieldName;
    var keyFn = policy && policy.keyFn;
    if (keyFn && typename) {
      var context = {
        typename,
        fieldName,
        field: fieldSpec.field || null,
        variables: fieldSpec.variables
      };
      var args = argsFromFieldSpecifier(fieldSpec);
      while (keyFn) {
        var specifierOrString = keyFn(args, context);
        if (isArray(specifierOrString)) {
          keyFn = keyArgsFnFromSpecifier(specifierOrString);
        } else {
          storeFieldName = specifierOrString || fieldName;
          break;
        }
      }
    }
    if (storeFieldName === void 0) {
      storeFieldName = fieldSpec.field ? storeKeyNameFromField(fieldSpec.field, fieldSpec.variables) : getStoreKeyName(fieldName, argsFromFieldSpecifier(fieldSpec));
    }
    if (storeFieldName === false) {
      return fieldName;
    }
    return fieldName === fieldNameFromStoreName(storeFieldName) ? storeFieldName : fieldName + ":" + storeFieldName;
  };
  Policies2.prototype.readField = function(options, context) {
    var objectOrReference = options.from;
    if (!objectOrReference)
      return;
    var nameOrField = options.field || options.fieldName;
    if (!nameOrField)
      return;
    if (options.typename === void 0) {
      var typename = context.store.getFieldValue(objectOrReference, "__typename");
      if (typename)
        options.typename = typename;
    }
    var storeFieldName = this.getStoreFieldName(options);
    var fieldName = fieldNameFromStoreName(storeFieldName);
    var existing = context.store.getFieldValue(objectOrReference, storeFieldName);
    var policy = this.getFieldPolicy(options.typename, fieldName, false);
    var read = policy && policy.read;
    if (read) {
      var readOptions = makeFieldFunctionOptions(this, objectOrReference, options, context, context.store.getStorage(isReference(objectOrReference) ? objectOrReference.__ref : objectOrReference, storeFieldName));
      return cacheSlot.withValue(this.cache, read, [existing, readOptions]);
    }
    return existing;
  };
  Policies2.prototype.getReadFunction = function(typename, fieldName) {
    var policy = this.getFieldPolicy(typename, fieldName, false);
    return policy && policy.read;
  };
  Policies2.prototype.getMergeFunction = function(parentTypename, fieldName, childTypename) {
    var policy = this.getFieldPolicy(parentTypename, fieldName, false);
    var merge = policy && policy.merge;
    if (!merge && childTypename) {
      policy = this.getTypePolicy(childTypename);
      merge = policy && policy.merge;
    }
    return merge;
  };
  Policies2.prototype.runMergeFunction = function(existing, incoming, _a2, context, storage) {
    var field = _a2.field, typename = _a2.typename, merge = _a2.merge;
    if (merge === mergeTrueFn) {
      return makeMergeObjectsFunction(context.store)(existing, incoming);
    }
    if (merge === mergeFalseFn) {
      return incoming;
    }
    if (context.overwrite) {
      existing = void 0;
    }
    return merge(existing, incoming, makeFieldFunctionOptions(this, void 0, { typename, fieldName: field.name.value, field, variables: context.variables }, context, storage || /* @__PURE__ */ Object.create(null)));
  };
  return Policies2;
}();
function makeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context, storage) {
  var storeFieldName = policies.getStoreFieldName(fieldSpec);
  var fieldName = fieldNameFromStoreName(storeFieldName);
  var variables = fieldSpec.variables || context.variables;
  var _a2 = context.store, toReference = _a2.toReference, canRead = _a2.canRead;
  return {
    args: argsFromFieldSpecifier(fieldSpec),
    field: fieldSpec.field || null,
    fieldName,
    storeFieldName,
    variables,
    isReference,
    toReference,
    storage,
    cache: policies.cache,
    canRead,
    readField: function() {
      return policies.readField(normalizeReadFieldOptions(arguments, objectOrReference, variables), context);
    },
    mergeObjects: makeMergeObjectsFunction(context.store)
  };
}
function normalizeReadFieldOptions(readFieldArgs, objectOrReference, variables) {
  var fieldNameOrOptions = readFieldArgs[0], from2 = readFieldArgs[1], argc = readFieldArgs.length;
  var options;
  if (typeof fieldNameOrOptions === "string") {
    options = {
      fieldName: fieldNameOrOptions,
      from: argc > 1 ? from2 : objectOrReference
    };
  } else {
    options = __assign$1({}, fieldNameOrOptions);
    if (!hasOwn.call(options, "from")) {
      options.from = objectOrReference;
    }
  }
  if (__DEV__ && options.from === void 0) {
    __DEV__ && invariant$1.warn("Undefined 'from' passed to readField with arguments ".concat(stringifyForDisplay(Array.from(readFieldArgs))));
  }
  if (void 0 === options.variables) {
    options.variables = variables;
  }
  return options;
}
function makeMergeObjectsFunction(store) {
  return function mergeObjects(existing, incoming) {
    if (isArray(existing) || isArray(incoming)) {
      throw __DEV__ ? new InvariantError("Cannot automatically merge arrays") : new InvariantError(4);
    }
    if (isNonNullObject(existing) && isNonNullObject(incoming)) {
      var eType = store.getFieldValue(existing, "__typename");
      var iType = store.getFieldValue(incoming, "__typename");
      var typesDiffer = eType && iType && eType !== iType;
      if (typesDiffer) {
        return incoming;
      }
      if (isReference(existing) && storeValueIsStoreObject(incoming)) {
        store.merge(existing.__ref, incoming);
        return existing;
      }
      if (storeValueIsStoreObject(existing) && isReference(incoming)) {
        store.merge(existing, incoming.__ref);
        return incoming;
      }
      if (storeValueIsStoreObject(existing) && storeValueIsStoreObject(incoming)) {
        return __assign$1(__assign$1({}, existing), incoming);
      }
    }
    return incoming;
  };
}
function getContextFlavor(context, clientOnly, deferred) {
  var key = "".concat(clientOnly).concat(deferred);
  var flavored = context.flavors.get(key);
  if (!flavored) {
    context.flavors.set(key, flavored = context.clientOnly === clientOnly && context.deferred === deferred ? context : __assign$1(__assign$1({}, context), { clientOnly, deferred }));
  }
  return flavored;
}
var StoreWriter = function() {
  function StoreWriter2(cache2, reader) {
    this.cache = cache2;
    this.reader = reader;
  }
  StoreWriter2.prototype.writeToStore = function(store, _a2) {
    var _this = this;
    var query = _a2.query, result = _a2.result, dataId = _a2.dataId, variables = _a2.variables, overwrite = _a2.overwrite;
    var operationDefinition = getOperationDefinition(query);
    var merger = makeProcessedFieldsMerger();
    variables = __assign$1(__assign$1({}, getDefaultValues(operationDefinition)), variables);
    var context = {
      store,
      written: /* @__PURE__ */ Object.create(null),
      merge: function(existing, incoming) {
        return merger.merge(existing, incoming);
      },
      variables,
      varString: canonicalStringify(variables),
      fragmentMap: createFragmentMap(getFragmentDefinitions(query)),
      overwrite: !!overwrite,
      incomingById: /* @__PURE__ */ new Map(),
      clientOnly: false,
      deferred: false,
      flavors: /* @__PURE__ */ new Map()
    };
    var ref = this.processSelectionSet({
      result: result || /* @__PURE__ */ Object.create(null),
      dataId,
      selectionSet: operationDefinition.selectionSet,
      mergeTree: { map: /* @__PURE__ */ new Map() },
      context
    });
    if (!isReference(ref)) {
      throw __DEV__ ? new InvariantError("Could not identify object ".concat(JSON.stringify(result))) : new InvariantError(6);
    }
    context.incomingById.forEach(function(_a3, dataId2) {
      var storeObject = _a3.storeObject, mergeTree = _a3.mergeTree, fieldNodeSet = _a3.fieldNodeSet;
      var entityRef = makeReference(dataId2);
      if (mergeTree && mergeTree.map.size) {
        var applied = _this.applyMerges(mergeTree, entityRef, storeObject, context);
        if (isReference(applied)) {
          return;
        }
        storeObject = applied;
      }
      if (__DEV__ && !context.overwrite) {
        var fieldsWithSelectionSets_1 = /* @__PURE__ */ Object.create(null);
        fieldNodeSet.forEach(function(field) {
          if (field.selectionSet) {
            fieldsWithSelectionSets_1[field.name.value] = true;
          }
        });
        var hasSelectionSet_1 = function(storeFieldName) {
          return fieldsWithSelectionSets_1[fieldNameFromStoreName(storeFieldName)] === true;
        };
        var hasMergeFunction_1 = function(storeFieldName) {
          var childTree = mergeTree && mergeTree.map.get(storeFieldName);
          return Boolean(childTree && childTree.info && childTree.info.merge);
        };
        Object.keys(storeObject).forEach(function(storeFieldName) {
          if (hasSelectionSet_1(storeFieldName) && !hasMergeFunction_1(storeFieldName)) {
            warnAboutDataLoss(entityRef, storeObject, storeFieldName, context.store);
          }
        });
      }
      store.merge(dataId2, storeObject);
    });
    store.retain(ref.__ref);
    return ref;
  };
  StoreWriter2.prototype.processSelectionSet = function(_a2) {
    var _this = this;
    var dataId = _a2.dataId, result = _a2.result, selectionSet = _a2.selectionSet, context = _a2.context, mergeTree = _a2.mergeTree;
    var policies = this.cache.policies;
    var incoming = /* @__PURE__ */ Object.create(null);
    var typename = dataId && policies.rootTypenamesById[dataId] || getTypenameFromResult(result, selectionSet, context.fragmentMap) || dataId && context.store.get(dataId, "__typename");
    if ("string" === typeof typename) {
      incoming.__typename = typename;
    }
    var readField = function() {
      var options = normalizeReadFieldOptions(arguments, incoming, context.variables);
      if (isReference(options.from)) {
        var info = context.incomingById.get(options.from.__ref);
        if (info) {
          var result_1 = policies.readField(__assign$1(__assign$1({}, options), { from: info.storeObject }), context);
          if (result_1 !== void 0) {
            return result_1;
          }
        }
      }
      return policies.readField(options, context);
    };
    var fieldNodeSet = /* @__PURE__ */ new Set();
    this.flattenFields(selectionSet, result, context, typename).forEach(function(context2, field) {
      var _a3;
      var resultFieldKey = resultKeyNameFromField(field);
      var value = result[resultFieldKey];
      fieldNodeSet.add(field);
      if (value !== void 0) {
        var storeFieldName = policies.getStoreFieldName({
          typename,
          fieldName: field.name.value,
          field,
          variables: context2.variables
        });
        var childTree = getChildMergeTree(mergeTree, storeFieldName);
        var incomingValue = _this.processFieldValue(value, field, field.selectionSet ? getContextFlavor(context2, false, false) : context2, childTree);
        var childTypename = void 0;
        if (field.selectionSet && (isReference(incomingValue) || storeValueIsStoreObject(incomingValue))) {
          childTypename = readField("__typename", incomingValue);
        }
        var merge = policies.getMergeFunction(typename, field.name.value, childTypename);
        if (merge) {
          childTree.info = {
            field,
            typename,
            merge
          };
        } else {
          maybeRecycleChildMergeTree(mergeTree, storeFieldName);
        }
        incoming = context2.merge(incoming, (_a3 = {}, _a3[storeFieldName] = incomingValue, _a3));
      } else if (__DEV__ && !context2.clientOnly && !context2.deferred && !addTypenameToDocument.added(field) && !policies.getReadFunction(typename, field.name.value)) {
        __DEV__ && invariant$1.error("Missing field '".concat(resultKeyNameFromField(field), "' while writing result ").concat(JSON.stringify(result, null, 2)).substring(0, 1e3));
      }
    });
    try {
      var _b = policies.identify(result, {
        typename,
        selectionSet,
        fragmentMap: context.fragmentMap,
        storeObject: incoming,
        readField
      }), id = _b[0], keyObject = _b[1];
      dataId = dataId || id;
      if (keyObject) {
        incoming = context.merge(incoming, keyObject);
      }
    } catch (e2) {
      if (!dataId)
        throw e2;
    }
    if ("string" === typeof dataId) {
      var dataRef = makeReference(dataId);
      var sets = context.written[dataId] || (context.written[dataId] = []);
      if (sets.indexOf(selectionSet) >= 0)
        return dataRef;
      sets.push(selectionSet);
      if (this.reader && this.reader.isFresh(result, dataRef, selectionSet, context)) {
        return dataRef;
      }
      var previous_1 = context.incomingById.get(dataId);
      if (previous_1) {
        previous_1.storeObject = context.merge(previous_1.storeObject, incoming);
        previous_1.mergeTree = mergeMergeTrees(previous_1.mergeTree, mergeTree);
        fieldNodeSet.forEach(function(field) {
          return previous_1.fieldNodeSet.add(field);
        });
      } else {
        context.incomingById.set(dataId, {
          storeObject: incoming,
          mergeTree: mergeTreeIsEmpty(mergeTree) ? void 0 : mergeTree,
          fieldNodeSet
        });
      }
      return dataRef;
    }
    return incoming;
  };
  StoreWriter2.prototype.processFieldValue = function(value, field, context, mergeTree) {
    var _this = this;
    if (!field.selectionSet || value === null) {
      return __DEV__ ? cloneDeep(value) : value;
    }
    if (isArray(value)) {
      return value.map(function(item, i) {
        var value2 = _this.processFieldValue(item, field, context, getChildMergeTree(mergeTree, i));
        maybeRecycleChildMergeTree(mergeTree, i);
        return value2;
      });
    }
    return this.processSelectionSet({
      result: value,
      selectionSet: field.selectionSet,
      context,
      mergeTree
    });
  };
  StoreWriter2.prototype.flattenFields = function(selectionSet, result, context, typename) {
    if (typename === void 0) {
      typename = getTypenameFromResult(result, selectionSet, context.fragmentMap);
    }
    var fieldMap = /* @__PURE__ */ new Map();
    var policies = this.cache.policies;
    var limitingTrie = new Trie(false);
    (function flatten(selectionSet2, inheritedContext) {
      var visitedNode = limitingTrie.lookup(selectionSet2, inheritedContext.clientOnly, inheritedContext.deferred);
      if (visitedNode.visited)
        return;
      visitedNode.visited = true;
      selectionSet2.selections.forEach(function(selection) {
        if (!shouldInclude(selection, context.variables))
          return;
        var clientOnly = inheritedContext.clientOnly, deferred = inheritedContext.deferred;
        if (!(clientOnly && deferred) && isNonEmptyArray(selection.directives)) {
          selection.directives.forEach(function(dir) {
            var name = dir.name.value;
            if (name === "client")
              clientOnly = true;
            if (name === "defer") {
              var args = argumentsObjectFromField(dir, context.variables);
              if (!args || args.if !== false) {
                deferred = true;
              }
            }
          });
        }
        if (isField(selection)) {
          var existing = fieldMap.get(selection);
          if (existing) {
            clientOnly = clientOnly && existing.clientOnly;
            deferred = deferred && existing.deferred;
          }
          fieldMap.set(selection, getContextFlavor(context, clientOnly, deferred));
        } else {
          var fragment = getFragmentFromSelection(selection, context.fragmentMap);
          if (fragment && policies.fragmentMatches(fragment, typename, result, context.variables)) {
            flatten(fragment.selectionSet, getContextFlavor(context, clientOnly, deferred));
          }
        }
      });
    })(selectionSet, context);
    return fieldMap;
  };
  StoreWriter2.prototype.applyMerges = function(mergeTree, existing, incoming, context, getStorageArgs) {
    var _a2;
    var _this = this;
    if (mergeTree.map.size && !isReference(incoming)) {
      var e_1 = !isArray(incoming) && (isReference(existing) || storeValueIsStoreObject(existing)) ? existing : void 0;
      var i_1 = incoming;
      if (e_1 && !getStorageArgs) {
        getStorageArgs = [isReference(e_1) ? e_1.__ref : e_1];
      }
      var changedFields_1;
      var getValue_1 = function(from2, name) {
        return isArray(from2) ? typeof name === "number" ? from2[name] : void 0 : context.store.getFieldValue(from2, String(name));
      };
      mergeTree.map.forEach(function(childTree, storeFieldName) {
        var eVal = getValue_1(e_1, storeFieldName);
        var iVal = getValue_1(i_1, storeFieldName);
        if (void 0 === iVal)
          return;
        if (getStorageArgs) {
          getStorageArgs.push(storeFieldName);
        }
        var aVal = _this.applyMerges(childTree, eVal, iVal, context, getStorageArgs);
        if (aVal !== iVal) {
          changedFields_1 = changedFields_1 || /* @__PURE__ */ new Map();
          changedFields_1.set(storeFieldName, aVal);
        }
        if (getStorageArgs) {
          invariant$1(getStorageArgs.pop() === storeFieldName);
        }
      });
      if (changedFields_1) {
        incoming = isArray(i_1) ? i_1.slice(0) : __assign$1({}, i_1);
        changedFields_1.forEach(function(value, name) {
          incoming[name] = value;
        });
      }
    }
    if (mergeTree.info) {
      return this.cache.policies.runMergeFunction(existing, incoming, mergeTree.info, context, getStorageArgs && (_a2 = context.store).getStorage.apply(_a2, getStorageArgs));
    }
    return incoming;
  };
  return StoreWriter2;
}();
var emptyMergeTreePool = [];
function getChildMergeTree(_a2, name) {
  var map = _a2.map;
  if (!map.has(name)) {
    map.set(name, emptyMergeTreePool.pop() || { map: /* @__PURE__ */ new Map() });
  }
  return map.get(name);
}
function mergeMergeTrees(left, right) {
  if (left === right || !right || mergeTreeIsEmpty(right))
    return left;
  if (!left || mergeTreeIsEmpty(left))
    return right;
  var info = left.info && right.info ? __assign$1(__assign$1({}, left.info), right.info) : left.info || right.info;
  var needToMergeMaps = left.map.size && right.map.size;
  var map = needToMergeMaps ? /* @__PURE__ */ new Map() : left.map.size ? left.map : right.map;
  var merged = { info, map };
  if (needToMergeMaps) {
    var remainingRightKeys_1 = new Set(right.map.keys());
    left.map.forEach(function(leftTree, key) {
      merged.map.set(key, mergeMergeTrees(leftTree, right.map.get(key)));
      remainingRightKeys_1.delete(key);
    });
    remainingRightKeys_1.forEach(function(key) {
      merged.map.set(key, mergeMergeTrees(right.map.get(key), left.map.get(key)));
    });
  }
  return merged;
}
function mergeTreeIsEmpty(tree) {
  return !tree || !(tree.info || tree.map.size);
}
function maybeRecycleChildMergeTree(_a2, name) {
  var map = _a2.map;
  var childTree = map.get(name);
  if (childTree && mergeTreeIsEmpty(childTree)) {
    emptyMergeTreePool.push(childTree);
    map.delete(name);
  }
}
var warnings = /* @__PURE__ */ new Set();
function warnAboutDataLoss(existingRef, incomingObj, storeFieldName, store) {
  var getChild = function(objOrRef) {
    var child = store.getFieldValue(objOrRef, storeFieldName);
    return typeof child === "object" && child;
  };
  var existing = getChild(existingRef);
  if (!existing)
    return;
  var incoming = getChild(incomingObj);
  if (!incoming)
    return;
  if (isReference(existing))
    return;
  if (equal(existing, incoming))
    return;
  if (Object.keys(existing).every(function(key) {
    return store.getFieldValue(incoming, key) !== void 0;
  })) {
    return;
  }
  var parentType = store.getFieldValue(existingRef, "__typename") || store.getFieldValue(incomingObj, "__typename");
  var fieldName = fieldNameFromStoreName(storeFieldName);
  var typeDotName = "".concat(parentType, ".").concat(fieldName);
  if (warnings.has(typeDotName))
    return;
  warnings.add(typeDotName);
  var childTypenames = [];
  if (!isArray(existing) && !isArray(incoming)) {
    [existing, incoming].forEach(function(child) {
      var typename = store.getFieldValue(child, "__typename");
      if (typeof typename === "string" && !childTypenames.includes(typename)) {
        childTypenames.push(typename);
      }
    });
  }
  __DEV__ && invariant$1.warn("Cache data may be lost when replacing the ".concat(fieldName, " field of a ").concat(parentType, " object.\n\nTo address this problem (which is not a bug in Apollo Client), ").concat(childTypenames.length ? "either ensure all objects of type " + childTypenames.join(" and ") + " have an ID or a custom merge function, or " : "", "define a custom merge function for the ").concat(typeDotName, " field, so InMemoryCache can safely merge these objects:\n\n  existing: ").concat(JSON.stringify(existing).slice(0, 1e3), "\n  incoming: ").concat(JSON.stringify(incoming).slice(0, 1e3), "\n\nFor more information about these options, please refer to the documentation:\n\n  * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers\n  * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects\n"));
}
var InMemoryCache = function(_super) {
  __extends$1(InMemoryCache2, _super);
  function InMemoryCache2(config) {
    if (config === void 0) {
      config = {};
    }
    var _this = _super.call(this) || this;
    _this.watches = /* @__PURE__ */ new Set();
    _this.typenameDocumentCache = /* @__PURE__ */ new Map();
    _this.makeVar = makeVar;
    _this.txCount = 0;
    _this.config = normalizeConfig(config);
    _this.addTypename = !!_this.config.addTypename;
    _this.policies = new Policies({
      cache: _this,
      dataIdFromObject: _this.config.dataIdFromObject,
      possibleTypes: _this.config.possibleTypes,
      typePolicies: _this.config.typePolicies
    });
    _this.init();
    return _this;
  }
  InMemoryCache2.prototype.init = function() {
    var rootStore = this.data = new EntityStore.Root({
      policies: this.policies,
      resultCaching: this.config.resultCaching
    });
    this.optimisticData = rootStore.stump;
    this.resetResultCache();
  };
  InMemoryCache2.prototype.resetResultCache = function(resetResultIdentities) {
    var _this = this;
    var previousReader = this.storeReader;
    this.storeWriter = new StoreWriter(this, this.storeReader = new StoreReader({
      cache: this,
      addTypename: this.addTypename,
      resultCacheMaxSize: this.config.resultCacheMaxSize,
      canonizeResults: shouldCanonizeResults(this.config),
      canon: resetResultIdentities ? void 0 : previousReader && previousReader.canon
    }));
    this.maybeBroadcastWatch = wrap(function(c2, options) {
      return _this.broadcastWatch(c2, options);
    }, {
      max: this.config.resultCacheMaxSize,
      makeCacheKey: function(c2) {
        var store = c2.optimistic ? _this.optimisticData : _this.data;
        if (supportsResultCaching(store)) {
          var optimistic = c2.optimistic, rootId = c2.rootId, variables = c2.variables;
          return store.makeCacheKey(c2.query, c2.callback, canonicalStringify({ optimistic, rootId, variables }));
        }
      }
    });
    (/* @__PURE__ */ new Set([
      this.data.group,
      this.optimisticData.group
    ])).forEach(function(group) {
      return group.resetCaching();
    });
  };
  InMemoryCache2.prototype.restore = function(data) {
    this.init();
    if (data)
      this.data.replace(data);
    return this;
  };
  InMemoryCache2.prototype.extract = function(optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }
    return (optimistic ? this.optimisticData : this.data).extract();
  };
  InMemoryCache2.prototype.read = function(options) {
    var _a2 = options.returnPartialData, returnPartialData = _a2 === void 0 ? false : _a2;
    try {
      return this.storeReader.diffQueryAgainstStore(__assign$1(__assign$1({}, options), { store: options.optimistic ? this.optimisticData : this.data, config: this.config, returnPartialData })).result || null;
    } catch (e2) {
      if (e2 instanceof MissingFieldError) {
        return null;
      }
      throw e2;
    }
  };
  InMemoryCache2.prototype.write = function(options) {
    try {
      ++this.txCount;
      return this.storeWriter.writeToStore(this.data, options);
    } finally {
      if (!--this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  };
  InMemoryCache2.prototype.modify = function(options) {
    if (hasOwn.call(options, "id") && !options.id) {
      return false;
    }
    var store = options.optimistic ? this.optimisticData : this.data;
    try {
      ++this.txCount;
      return store.modify(options.id || "ROOT_QUERY", options.fields);
    } finally {
      if (!--this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  };
  InMemoryCache2.prototype.diff = function(options) {
    return this.storeReader.diffQueryAgainstStore(__assign$1(__assign$1({}, options), { store: options.optimistic ? this.optimisticData : this.data, rootId: options.id || "ROOT_QUERY", config: this.config }));
  };
  InMemoryCache2.prototype.watch = function(watch) {
    var _this = this;
    if (!this.watches.size) {
      recallCache(this);
    }
    this.watches.add(watch);
    if (watch.immediate) {
      this.maybeBroadcastWatch(watch);
    }
    return function() {
      if (_this.watches.delete(watch) && !_this.watches.size) {
        forgetCache(_this);
      }
      _this.maybeBroadcastWatch.forget(watch);
    };
  };
  InMemoryCache2.prototype.gc = function(options) {
    canonicalStringify.reset();
    var ids = this.optimisticData.gc();
    if (options && !this.txCount) {
      if (options.resetResultCache) {
        this.resetResultCache(options.resetResultIdentities);
      } else if (options.resetResultIdentities) {
        this.storeReader.resetCanon();
      }
    }
    return ids;
  };
  InMemoryCache2.prototype.retain = function(rootId, optimistic) {
    return (optimistic ? this.optimisticData : this.data).retain(rootId);
  };
  InMemoryCache2.prototype.release = function(rootId, optimistic) {
    return (optimistic ? this.optimisticData : this.data).release(rootId);
  };
  InMemoryCache2.prototype.identify = function(object) {
    if (isReference(object))
      return object.__ref;
    try {
      return this.policies.identify(object)[0];
    } catch (e2) {
      __DEV__ && invariant$1.warn(e2);
    }
  };
  InMemoryCache2.prototype.evict = function(options) {
    if (!options.id) {
      if (hasOwn.call(options, "id")) {
        return false;
      }
      options = __assign$1(__assign$1({}, options), { id: "ROOT_QUERY" });
    }
    try {
      ++this.txCount;
      return this.optimisticData.evict(options, this.data);
    } finally {
      if (!--this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  };
  InMemoryCache2.prototype.reset = function(options) {
    var _this = this;
    this.init();
    canonicalStringify.reset();
    if (options && options.discardWatches) {
      this.watches.forEach(function(watch) {
        return _this.maybeBroadcastWatch.forget(watch);
      });
      this.watches.clear();
      forgetCache(this);
    } else {
      this.broadcastWatches();
    }
    return Promise.resolve();
  };
  InMemoryCache2.prototype.removeOptimistic = function(idToRemove) {
    var newOptimisticData = this.optimisticData.removeLayer(idToRemove);
    if (newOptimisticData !== this.optimisticData) {
      this.optimisticData = newOptimisticData;
      this.broadcastWatches();
    }
  };
  InMemoryCache2.prototype.batch = function(options) {
    var _this = this;
    var update = options.update, _a2 = options.optimistic, optimistic = _a2 === void 0 ? true : _a2, removeOptimistic = options.removeOptimistic, onWatchUpdated = options.onWatchUpdated;
    var updateResult;
    var perform = function(layer) {
      var _a3 = _this, data = _a3.data, optimisticData = _a3.optimisticData;
      ++_this.txCount;
      if (layer) {
        _this.data = _this.optimisticData = layer;
      }
      try {
        return updateResult = update(_this);
      } finally {
        --_this.txCount;
        _this.data = data;
        _this.optimisticData = optimisticData;
      }
    };
    var alreadyDirty = /* @__PURE__ */ new Set();
    if (onWatchUpdated && !this.txCount) {
      this.broadcastWatches(__assign$1(__assign$1({}, options), { onWatchUpdated: function(watch) {
        alreadyDirty.add(watch);
        return false;
      } }));
    }
    if (typeof optimistic === "string") {
      this.optimisticData = this.optimisticData.addLayer(optimistic, perform);
    } else if (optimistic === false) {
      perform(this.data);
    } else {
      perform();
    }
    if (typeof removeOptimistic === "string") {
      this.optimisticData = this.optimisticData.removeLayer(removeOptimistic);
    }
    if (onWatchUpdated && alreadyDirty.size) {
      this.broadcastWatches(__assign$1(__assign$1({}, options), { onWatchUpdated: function(watch, diff2) {
        var result = onWatchUpdated.call(this, watch, diff2);
        if (result !== false) {
          alreadyDirty.delete(watch);
        }
        return result;
      } }));
      if (alreadyDirty.size) {
        alreadyDirty.forEach(function(watch) {
          return _this.maybeBroadcastWatch.dirty(watch);
        });
      }
    } else {
      this.broadcastWatches(options);
    }
    return updateResult;
  };
  InMemoryCache2.prototype.performTransaction = function(update, optimisticId) {
    return this.batch({
      update,
      optimistic: optimisticId || optimisticId !== null
    });
  };
  InMemoryCache2.prototype.transformDocument = function(document2) {
    if (this.addTypename) {
      var result = this.typenameDocumentCache.get(document2);
      if (!result) {
        result = addTypenameToDocument(document2);
        this.typenameDocumentCache.set(document2, result);
        this.typenameDocumentCache.set(result, result);
      }
      return result;
    }
    return document2;
  };
  InMemoryCache2.prototype.broadcastWatches = function(options) {
    var _this = this;
    if (!this.txCount) {
      this.watches.forEach(function(c2) {
        return _this.maybeBroadcastWatch(c2, options);
      });
    }
  };
  InMemoryCache2.prototype.broadcastWatch = function(c2, options) {
    var lastDiff = c2.lastDiff;
    var diff2 = this.diff(c2);
    if (options) {
      if (c2.optimistic && typeof options.optimistic === "string") {
        diff2.fromOptimisticTransaction = true;
      }
      if (options.onWatchUpdated && options.onWatchUpdated.call(this, c2, diff2, lastDiff) === false) {
        return;
      }
    }
    if (!lastDiff || !equal(lastDiff.result, diff2.result)) {
      c2.callback(c2.lastDiff = diff2, lastDiff);
    }
  };
  return InMemoryCache2;
}(ApolloCache);
var cache = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ApolloCache,
  get Cache() {
    return Cache;
  },
  MissingFieldError,
  isReference,
  makeReference,
  get EntityStore() {
    return EntityStore;
  },
  fieldNameFromStoreName,
  defaultDataIdFromObject,
  InMemoryCache,
  makeVar,
  cacheSlot,
  Policies,
  canonicalStringify
}, Symbol.toStringTag, { value: "Module" }));
function isApolloError(err) {
  return err.hasOwnProperty("graphQLErrors");
}
var generateErrorMessage = function(err) {
  var message = "";
  if (isNonEmptyArray(err.graphQLErrors) || isNonEmptyArray(err.clientErrors)) {
    var errors = (err.graphQLErrors || []).concat(err.clientErrors || []);
    errors.forEach(function(error) {
      var errorMessage = error ? error.message : "Error message not found.";
      message += "".concat(errorMessage, "\n");
    });
  }
  if (err.networkError) {
    message += "".concat(err.networkError.message, "\n");
  }
  message = message.replace(/\n$/, "");
  return message;
};
var ApolloError = function(_super) {
  __extends$1(ApolloError2, _super);
  function ApolloError2(_a2) {
    var graphQLErrors = _a2.graphQLErrors, clientErrors = _a2.clientErrors, networkError = _a2.networkError, errorMessage = _a2.errorMessage, extraInfo = _a2.extraInfo;
    var _this = _super.call(this, errorMessage) || this;
    _this.graphQLErrors = graphQLErrors || [];
    _this.clientErrors = clientErrors || [];
    _this.networkError = networkError || null;
    _this.message = errorMessage || generateErrorMessage(_this);
    _this.extraInfo = extraInfo;
    _this.__proto__ = ApolloError2.prototype;
    return _this;
  }
  return ApolloError2;
}(Error);
var NetworkStatus;
(function(NetworkStatus2) {
  NetworkStatus2[NetworkStatus2["loading"] = 1] = "loading";
  NetworkStatus2[NetworkStatus2["setVariables"] = 2] = "setVariables";
  NetworkStatus2[NetworkStatus2["fetchMore"] = 3] = "fetchMore";
  NetworkStatus2[NetworkStatus2["refetch"] = 4] = "refetch";
  NetworkStatus2[NetworkStatus2["poll"] = 6] = "poll";
  NetworkStatus2[NetworkStatus2["ready"] = 7] = "ready";
  NetworkStatus2[NetworkStatus2["error"] = 8] = "error";
})(NetworkStatus || (NetworkStatus = {}));
function isNetworkRequestInFlight(networkStatus) {
  return networkStatus ? networkStatus < 7 : false;
}
var assign = Object.assign, hasOwnProperty$1 = Object.hasOwnProperty;
var ObservableQuery = function(_super) {
  __extends$1(ObservableQuery2, _super);
  function ObservableQuery2(_a2) {
    var queryManager = _a2.queryManager, queryInfo = _a2.queryInfo, options = _a2.options;
    var _this = _super.call(this, function(observer) {
      try {
        var subObserver = observer._subscription._observer;
        if (subObserver && !subObserver.error) {
          subObserver.error = defaultSubscriptionObserverErrorCallback;
        }
      } catch (_a3) {
      }
      var first = !_this.observers.size;
      _this.observers.add(observer);
      var last = _this.last;
      if (last && last.error) {
        observer.error && observer.error(last.error);
      } else if (last && last.result) {
        observer.next && observer.next(last.result);
      }
      if (first) {
        _this.reobserve().catch(function() {
        });
      }
      return function() {
        if (_this.observers.delete(observer) && !_this.observers.size) {
          _this.tearDownQuery();
        }
      };
    }) || this;
    _this.observers = /* @__PURE__ */ new Set();
    _this.subscriptions = /* @__PURE__ */ new Set();
    _this.queryInfo = queryInfo;
    _this.queryManager = queryManager;
    _this.isTornDown = false;
    var _b = queryManager.defaultOptions.watchQuery, _c = _b === void 0 ? {} : _b, _d = _c.fetchPolicy, defaultFetchPolicy = _d === void 0 ? "cache-first" : _d;
    var _e = options.fetchPolicy, fetchPolicy = _e === void 0 ? defaultFetchPolicy : _e, _f = options.initialFetchPolicy, initialFetchPolicy = _f === void 0 ? fetchPolicy === "standby" ? defaultFetchPolicy : fetchPolicy : _f;
    _this.options = __assign$1(__assign$1({}, options), { initialFetchPolicy, fetchPolicy });
    _this.queryId = queryInfo.queryId || queryManager.generateQueryId();
    var opDef = getOperationDefinition(_this.query);
    _this.queryName = opDef && opDef.name && opDef.name.value;
    return _this;
  }
  Object.defineProperty(ObservableQuery2.prototype, "query", {
    get: function() {
      return this.queryManager.transform(this.options.query).document;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ObservableQuery2.prototype, "variables", {
    get: function() {
      return this.options.variables;
    },
    enumerable: false,
    configurable: true
  });
  ObservableQuery2.prototype.result = function() {
    var _this = this;
    return new Promise(function(resolve4, reject) {
      var observer = {
        next: function(result) {
          resolve4(result);
          _this.observers.delete(observer);
          if (!_this.observers.size) {
            _this.queryManager.removeQuery(_this.queryId);
          }
          setTimeout(function() {
            subscription.unsubscribe();
          }, 0);
        },
        error: reject
      };
      var subscription = _this.subscribe(observer);
    });
  };
  ObservableQuery2.prototype.getCurrentResult = function(saveAsLastResult) {
    if (saveAsLastResult === void 0) {
      saveAsLastResult = true;
    }
    var lastResult = this.getLastResult(true);
    var networkStatus = this.queryInfo.networkStatus || lastResult && lastResult.networkStatus || NetworkStatus.ready;
    var result = __assign$1(__assign$1({}, lastResult), { loading: isNetworkRequestInFlight(networkStatus), networkStatus });
    var _a2 = this.options.fetchPolicy, fetchPolicy = _a2 === void 0 ? "cache-first" : _a2;
    if (fetchPolicy === "network-only" || fetchPolicy === "no-cache" || fetchPolicy === "standby" || this.queryManager.transform(this.options.query).hasForcedResolvers)
      ;
    else {
      var diff2 = this.queryInfo.getDiff();
      if (diff2.complete || this.options.returnPartialData) {
        result.data = diff2.result;
      }
      if (equal(result.data, {})) {
        result.data = void 0;
      }
      if (diff2.complete) {
        delete result.partial;
        if (diff2.complete && result.networkStatus === NetworkStatus.loading && (fetchPolicy === "cache-first" || fetchPolicy === "cache-only")) {
          result.networkStatus = NetworkStatus.ready;
          result.loading = false;
        }
      } else {
        result.partial = true;
      }
      if (__DEV__ && !diff2.complete && !this.options.partialRefetch && !result.loading && !result.data && !result.error) {
        logMissingFieldErrors(diff2.missing);
      }
    }
    if (saveAsLastResult) {
      this.updateLastResult(result);
    }
    return result;
  };
  ObservableQuery2.prototype.isDifferentFromLastResult = function(newResult) {
    return !this.last || !equal(this.last.result, newResult);
  };
  ObservableQuery2.prototype.getLast = function(key, variablesMustMatch) {
    var last = this.last;
    if (last && last[key] && (!variablesMustMatch || equal(last.variables, this.variables))) {
      return last[key];
    }
  };
  ObservableQuery2.prototype.getLastResult = function(variablesMustMatch) {
    return this.getLast("result", variablesMustMatch);
  };
  ObservableQuery2.prototype.getLastError = function(variablesMustMatch) {
    return this.getLast("error", variablesMustMatch);
  };
  ObservableQuery2.prototype.resetLastResults = function() {
    delete this.last;
    this.isTornDown = false;
  };
  ObservableQuery2.prototype.resetQueryStoreErrors = function() {
    this.queryManager.resetErrors(this.queryId);
  };
  ObservableQuery2.prototype.refetch = function(variables) {
    var _a2;
    var reobserveOptions = {
      pollInterval: 0
    };
    var fetchPolicy = this.options.fetchPolicy;
    if (fetchPolicy === "cache-and-network") {
      reobserveOptions.fetchPolicy = fetchPolicy;
    } else if (fetchPolicy === "no-cache") {
      reobserveOptions.fetchPolicy = "no-cache";
    } else {
      reobserveOptions.fetchPolicy = "network-only";
    }
    if (__DEV__ && variables && hasOwnProperty$1.call(variables, "variables")) {
      var queryDef = getQueryDefinition(this.query);
      var vars = queryDef.variableDefinitions;
      if (!vars || !vars.some(function(v2) {
        return v2.variable.name.value === "variables";
      })) {
        __DEV__ && invariant$1.warn("Called refetch(".concat(JSON.stringify(variables), ") for query ").concat(((_a2 = queryDef.name) === null || _a2 === void 0 ? void 0 : _a2.value) || JSON.stringify(queryDef), ", which does not declare a $variables variable.\nDid you mean to call refetch(variables) instead of refetch({ variables })?"));
      }
    }
    if (variables && !equal(this.options.variables, variables)) {
      reobserveOptions.variables = this.options.variables = __assign$1(__assign$1({}, this.options.variables), variables);
    }
    this.queryInfo.resetLastWrite();
    return this.reobserve(reobserveOptions, NetworkStatus.refetch);
  };
  ObservableQuery2.prototype.fetchMore = function(fetchMoreOptions) {
    var _this = this;
    var combinedOptions = __assign$1(__assign$1({}, fetchMoreOptions.query ? fetchMoreOptions : __assign$1(__assign$1(__assign$1(__assign$1({}, this.options), { query: this.query }), fetchMoreOptions), { variables: __assign$1(__assign$1({}, this.options.variables), fetchMoreOptions.variables) })), { fetchPolicy: "no-cache" });
    var qid = this.queryManager.generateQueryId();
    var queryInfo = this.queryInfo;
    var originalNetworkStatus = queryInfo.networkStatus;
    queryInfo.networkStatus = NetworkStatus.fetchMore;
    if (combinedOptions.notifyOnNetworkStatusChange) {
      this.observe();
    }
    var updatedQuerySet = /* @__PURE__ */ new Set();
    return this.queryManager.fetchQuery(qid, combinedOptions, NetworkStatus.fetchMore).then(function(fetchMoreResult) {
      _this.queryManager.removeQuery(qid);
      if (queryInfo.networkStatus === NetworkStatus.fetchMore) {
        queryInfo.networkStatus = originalNetworkStatus;
      }
      _this.queryManager.cache.batch({
        update: function(cache2) {
          var updateQuery = fetchMoreOptions.updateQuery;
          if (updateQuery) {
            cache2.updateQuery({
              query: _this.query,
              variables: _this.variables,
              returnPartialData: true,
              optimistic: false
            }, function(previous) {
              return updateQuery(previous, {
                fetchMoreResult: fetchMoreResult.data,
                variables: combinedOptions.variables
              });
            });
          } else {
            cache2.writeQuery({
              query: combinedOptions.query,
              variables: combinedOptions.variables,
              data: fetchMoreResult.data
            });
          }
        },
        onWatchUpdated: function(watch) {
          updatedQuerySet.add(watch.query);
        }
      });
      return fetchMoreResult;
    }).finally(function() {
      if (!updatedQuerySet.has(_this.query)) {
        reobserveCacheFirst(_this);
      }
    });
  };
  ObservableQuery2.prototype.subscribeToMore = function(options) {
    var _this = this;
    var subscription = this.queryManager.startGraphQLSubscription({
      query: options.document,
      variables: options.variables,
      context: options.context
    }).subscribe({
      next: function(subscriptionData) {
        var updateQuery = options.updateQuery;
        if (updateQuery) {
          _this.updateQuery(function(previous, _a2) {
            var variables = _a2.variables;
            return updateQuery(previous, {
              subscriptionData,
              variables
            });
          });
        }
      },
      error: function(err) {
        if (options.onError) {
          options.onError(err);
          return;
        }
        __DEV__ && invariant$1.error("Unhandled GraphQL subscription error", err);
      }
    });
    this.subscriptions.add(subscription);
    return function() {
      if (_this.subscriptions.delete(subscription)) {
        subscription.unsubscribe();
      }
    };
  };
  ObservableQuery2.prototype.setOptions = function(newOptions) {
    return this.reobserve(newOptions);
  };
  ObservableQuery2.prototype.setVariables = function(variables) {
    if (equal(this.variables, variables)) {
      return this.observers.size ? this.result() : Promise.resolve();
    }
    this.options.variables = variables;
    if (!this.observers.size) {
      return Promise.resolve();
    }
    return this.reobserve({
      fetchPolicy: this.options.initialFetchPolicy,
      variables
    }, NetworkStatus.setVariables);
  };
  ObservableQuery2.prototype.updateQuery = function(mapFn) {
    var queryManager = this.queryManager;
    var result = queryManager.cache.diff({
      query: this.options.query,
      variables: this.variables,
      returnPartialData: true,
      optimistic: false
    }).result;
    var newResult = mapFn(result, {
      variables: this.variables
    });
    if (newResult) {
      queryManager.cache.writeQuery({
        query: this.options.query,
        data: newResult,
        variables: this.variables
      });
      queryManager.broadcastQueries();
    }
  };
  ObservableQuery2.prototype.startPolling = function(pollInterval) {
    this.options.pollInterval = pollInterval;
    this.updatePolling();
  };
  ObservableQuery2.prototype.stopPolling = function() {
    this.options.pollInterval = 0;
    this.updatePolling();
  };
  ObservableQuery2.prototype.applyNextFetchPolicy = function(reason, options) {
    if (options.nextFetchPolicy) {
      var _a2 = options.fetchPolicy, fetchPolicy = _a2 === void 0 ? "cache-first" : _a2, _b = options.initialFetchPolicy, initialFetchPolicy = _b === void 0 ? fetchPolicy : _b;
      if (fetchPolicy === "standby")
        ;
      else if (typeof options.nextFetchPolicy === "function") {
        options.fetchPolicy = options.nextFetchPolicy(fetchPolicy, {
          reason,
          options,
          observable: this,
          initialFetchPolicy
        });
      } else if (reason === "variables-changed") {
        options.fetchPolicy = initialFetchPolicy;
      } else {
        options.fetchPolicy = options.nextFetchPolicy;
      }
    }
    return options.fetchPolicy;
  };
  ObservableQuery2.prototype.fetch = function(options, newNetworkStatus) {
    this.queryManager.setObservableQuery(this);
    return this.queryManager.fetchQueryObservable(this.queryId, options, newNetworkStatus);
  };
  ObservableQuery2.prototype.updatePolling = function() {
    var _this = this;
    if (this.queryManager.ssrMode) {
      return;
    }
    var _a2 = this, pollingInfo = _a2.pollingInfo, pollInterval = _a2.options.pollInterval;
    if (!pollInterval) {
      if (pollingInfo) {
        clearTimeout(pollingInfo.timeout);
        delete this.pollingInfo;
      }
      return;
    }
    if (pollingInfo && pollingInfo.interval === pollInterval) {
      return;
    }
    __DEV__ ? invariant$1(pollInterval, "Attempted to start a polling query without a polling interval.") : invariant$1(pollInterval, 10);
    var info = pollingInfo || (this.pollingInfo = {});
    info.interval = pollInterval;
    var maybeFetch = function() {
      if (_this.pollingInfo) {
        if (!isNetworkRequestInFlight(_this.queryInfo.networkStatus)) {
          _this.reobserve({
            fetchPolicy: "network-only"
          }, NetworkStatus.poll).then(poll, poll);
        } else {
          poll();
        }
      }
    };
    var poll = function() {
      var info2 = _this.pollingInfo;
      if (info2) {
        clearTimeout(info2.timeout);
        info2.timeout = setTimeout(maybeFetch, info2.interval);
      }
    };
    poll();
  };
  ObservableQuery2.prototype.updateLastResult = function(newResult, variables) {
    if (variables === void 0) {
      variables = this.variables;
    }
    this.last = __assign$1(__assign$1({}, this.last), { result: this.queryManager.assumeImmutableResults ? newResult : cloneDeep(newResult), variables });
    if (!isNonEmptyArray(newResult.errors)) {
      delete this.last.error;
    }
    return this.last;
  };
  ObservableQuery2.prototype.reobserve = function(newOptions, newNetworkStatus) {
    var _this = this;
    this.isTornDown = false;
    var useDisposableConcast = newNetworkStatus === NetworkStatus.refetch || newNetworkStatus === NetworkStatus.fetchMore || newNetworkStatus === NetworkStatus.poll;
    var oldVariables = this.options.variables;
    var oldFetchPolicy = this.options.fetchPolicy;
    var mergedOptions = compact(this.options, newOptions || {});
    var options = useDisposableConcast ? mergedOptions : assign(this.options, mergedOptions);
    if (!useDisposableConcast) {
      this.updatePolling();
      if (newOptions && newOptions.variables && !equal(newOptions.variables, oldVariables) && options.fetchPolicy !== "standby" && options.fetchPolicy === oldFetchPolicy) {
        this.applyNextFetchPolicy("variables-changed", options);
        if (newNetworkStatus === void 0) {
          newNetworkStatus = NetworkStatus.setVariables;
        }
      }
    }
    var variables = options.variables && __assign$1({}, options.variables);
    var concast = this.fetch(options, newNetworkStatus);
    var observer = {
      next: function(result) {
        _this.reportResult(result, variables);
      },
      error: function(error) {
        _this.reportError(error, variables);
      }
    };
    if (!useDisposableConcast) {
      if (this.concast && this.observer) {
        this.concast.removeObserver(this.observer);
      }
      this.concast = concast;
      this.observer = observer;
    }
    concast.addObserver(observer);
    return concast.promise;
  };
  ObservableQuery2.prototype.observe = function() {
    this.reportResult(this.getCurrentResult(false), this.variables);
  };
  ObservableQuery2.prototype.reportResult = function(result, variables) {
    var lastError = this.getLastError();
    if (lastError || this.isDifferentFromLastResult(result)) {
      if (lastError || !result.partial || this.options.returnPartialData) {
        this.updateLastResult(result, variables);
      }
      iterateObserversSafely(this.observers, "next", result);
    }
  };
  ObservableQuery2.prototype.reportError = function(error, variables) {
    var errorResult = __assign$1(__assign$1({}, this.getLastResult()), { error, errors: error.graphQLErrors, networkStatus: NetworkStatus.error, loading: false });
    this.updateLastResult(errorResult, variables);
    iterateObserversSafely(this.observers, "error", this.last.error = error);
  };
  ObservableQuery2.prototype.hasObservers = function() {
    return this.observers.size > 0;
  };
  ObservableQuery2.prototype.tearDownQuery = function() {
    if (this.isTornDown)
      return;
    if (this.concast && this.observer) {
      this.concast.removeObserver(this.observer);
      delete this.concast;
      delete this.observer;
    }
    this.stopPolling();
    this.subscriptions.forEach(function(sub) {
      return sub.unsubscribe();
    });
    this.subscriptions.clear();
    this.queryManager.stopQuery(this.queryId);
    this.observers.clear();
    this.isTornDown = true;
  };
  return ObservableQuery2;
}(Observable);
fixObservableSubclass(ObservableQuery);
function reobserveCacheFirst(obsQuery) {
  var _a2 = obsQuery.options, fetchPolicy = _a2.fetchPolicy, nextFetchPolicy = _a2.nextFetchPolicy;
  if (fetchPolicy === "cache-and-network" || fetchPolicy === "network-only") {
    return obsQuery.reobserve({
      fetchPolicy: "cache-first",
      nextFetchPolicy: function() {
        this.nextFetchPolicy = nextFetchPolicy;
        if (typeof nextFetchPolicy === "function") {
          return nextFetchPolicy.apply(this, arguments);
        }
        return fetchPolicy;
      }
    });
  }
  return obsQuery.reobserve();
}
function defaultSubscriptionObserverErrorCallback(error) {
  __DEV__ && invariant$1.error("Unhandled error", error.message, error.stack);
}
function logMissingFieldErrors(missing) {
  if (__DEV__ && missing) {
    __DEV__ && invariant$1.debug("Missing cache result fields: ".concat(JSON.stringify(missing)), missing);
  }
}
var LocalState = function() {
  function LocalState2(_a2) {
    var cache2 = _a2.cache, client2 = _a2.client, resolvers = _a2.resolvers, fragmentMatcher = _a2.fragmentMatcher;
    this.cache = cache2;
    if (client2) {
      this.client = client2;
    }
    if (resolvers) {
      this.addResolvers(resolvers);
    }
    if (fragmentMatcher) {
      this.setFragmentMatcher(fragmentMatcher);
    }
  }
  LocalState2.prototype.addResolvers = function(resolvers) {
    var _this = this;
    this.resolvers = this.resolvers || {};
    if (Array.isArray(resolvers)) {
      resolvers.forEach(function(resolverGroup) {
        _this.resolvers = mergeDeep(_this.resolvers, resolverGroup);
      });
    } else {
      this.resolvers = mergeDeep(this.resolvers, resolvers);
    }
  };
  LocalState2.prototype.setResolvers = function(resolvers) {
    this.resolvers = {};
    this.addResolvers(resolvers);
  };
  LocalState2.prototype.getResolvers = function() {
    return this.resolvers || {};
  };
  LocalState2.prototype.runResolvers = function(_a2) {
    var document2 = _a2.document, remoteResult = _a2.remoteResult, context = _a2.context, variables = _a2.variables, _b = _a2.onlyRunForcedResolvers, onlyRunForcedResolvers = _b === void 0 ? false : _b;
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_c) {
        if (document2) {
          return [2, this.resolveDocument(document2, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function(localResult) {
            return __assign$1(__assign$1({}, remoteResult), { data: localResult.result });
          })];
        }
        return [2, remoteResult];
      });
    });
  };
  LocalState2.prototype.setFragmentMatcher = function(fragmentMatcher) {
    this.fragmentMatcher = fragmentMatcher;
  };
  LocalState2.prototype.getFragmentMatcher = function() {
    return this.fragmentMatcher;
  };
  LocalState2.prototype.clientQuery = function(document2) {
    if (hasDirectives(["client"], document2)) {
      if (this.resolvers) {
        return document2;
      }
    }
    return null;
  };
  LocalState2.prototype.serverQuery = function(document2) {
    return removeClientSetsFromDocument(document2);
  };
  LocalState2.prototype.prepareContext = function(context) {
    var cache2 = this.cache;
    return __assign$1(__assign$1({}, context), { cache: cache2, getCacheKey: function(obj) {
      return cache2.identify(obj);
    } });
  };
  LocalState2.prototype.addExportedVariables = function(document2, variables, context) {
    if (variables === void 0) {
      variables = {};
    }
    if (context === void 0) {
      context = {};
    }
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(_a2) {
        if (document2) {
          return [2, this.resolveDocument(document2, this.buildRootValueFromCache(document2, variables) || {}, this.prepareContext(context), variables).then(function(data) {
            return __assign$1(__assign$1({}, variables), data.exportedVariables);
          })];
        }
        return [2, __assign$1({}, variables)];
      });
    });
  };
  LocalState2.prototype.shouldForceResolvers = function(document2) {
    var forceResolvers = false;
    visit(document2, {
      Directive: {
        enter: function(node) {
          if (node.name.value === "client" && node.arguments) {
            forceResolvers = node.arguments.some(function(arg) {
              return arg.name.value === "always" && arg.value.kind === "BooleanValue" && arg.value.value === true;
            });
            if (forceResolvers) {
              return BREAK;
            }
          }
        }
      }
    });
    return forceResolvers;
  };
  LocalState2.prototype.buildRootValueFromCache = function(document2, variables) {
    return this.cache.diff({
      query: buildQueryFromSelectionSet(document2),
      variables,
      returnPartialData: true,
      optimistic: false
    }).result;
  };
  LocalState2.prototype.resolveDocument = function(document2, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
    if (context === void 0) {
      context = {};
    }
    if (variables === void 0) {
      variables = {};
    }
    if (fragmentMatcher === void 0) {
      fragmentMatcher = function() {
        return true;
      };
    }
    if (onlyRunForcedResolvers === void 0) {
      onlyRunForcedResolvers = false;
    }
    return __awaiter(this, void 0, void 0, function() {
      var mainDefinition, fragments, fragmentMap, definitionOperation, defaultOperationType, _a2, cache2, client2, execContext;
      return __generator(this, function(_b) {
        mainDefinition = getMainDefinition(document2);
        fragments = getFragmentDefinitions(document2);
        fragmentMap = createFragmentMap(fragments);
        definitionOperation = mainDefinition.operation;
        defaultOperationType = definitionOperation ? definitionOperation.charAt(0).toUpperCase() + definitionOperation.slice(1) : "Query";
        _a2 = this, cache2 = _a2.cache, client2 = _a2.client;
        execContext = {
          fragmentMap,
          context: __assign$1(__assign$1({}, context), { cache: cache2, client: client2 }),
          variables,
          fragmentMatcher,
          defaultOperationType,
          exportedVariables: {},
          onlyRunForcedResolvers
        };
        return [2, this.resolveSelectionSet(mainDefinition.selectionSet, rootValue, execContext).then(function(result) {
          return {
            result,
            exportedVariables: execContext.exportedVariables
          };
        })];
      });
    });
  };
  LocalState2.prototype.resolveSelectionSet = function(selectionSet, rootValue, execContext) {
    return __awaiter(this, void 0, void 0, function() {
      var fragmentMap, context, variables, resultsToMerge, execute2;
      var _this = this;
      return __generator(this, function(_a2) {
        fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
        resultsToMerge = [rootValue];
        execute2 = function(selection) {
          return __awaiter(_this, void 0, void 0, function() {
            var fragment, typeCondition;
            return __generator(this, function(_a3) {
              if (!shouldInclude(selection, variables)) {
                return [2];
              }
              if (isField(selection)) {
                return [2, this.resolveField(selection, rootValue, execContext).then(function(fieldResult) {
                  var _a4;
                  if (typeof fieldResult !== "undefined") {
                    resultsToMerge.push((_a4 = {}, _a4[resultKeyNameFromField(selection)] = fieldResult, _a4));
                  }
                })];
              }
              if (isInlineFragment(selection)) {
                fragment = selection;
              } else {
                fragment = fragmentMap[selection.name.value];
                __DEV__ ? invariant$1(fragment, "No fragment named ".concat(selection.name.value)) : invariant$1(fragment, 9);
              }
              if (fragment && fragment.typeCondition) {
                typeCondition = fragment.typeCondition.name.value;
                if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                  return [2, this.resolveSelectionSet(fragment.selectionSet, rootValue, execContext).then(function(fragmentResult) {
                    resultsToMerge.push(fragmentResult);
                  })];
                }
              }
              return [2];
            });
          });
        };
        return [2, Promise.all(selectionSet.selections.map(execute2)).then(function() {
          return mergeDeepArray(resultsToMerge);
        })];
      });
    });
  };
  LocalState2.prototype.resolveField = function(field, rootValue, execContext) {
    return __awaiter(this, void 0, void 0, function() {
      var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve4;
      var _this = this;
      return __generator(this, function(_a2) {
        variables = execContext.variables;
        fieldName = field.name.value;
        aliasedFieldName = resultKeyNameFromField(field);
        aliasUsed = fieldName !== aliasedFieldName;
        defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
        resultPromise = Promise.resolve(defaultResult);
        if (!execContext.onlyRunForcedResolvers || this.shouldForceResolvers(field)) {
          resolverType = rootValue.__typename || execContext.defaultOperationType;
          resolverMap = this.resolvers && this.resolvers[resolverType];
          if (resolverMap) {
            resolve4 = resolverMap[aliasUsed ? fieldName : aliasedFieldName];
            if (resolve4) {
              resultPromise = Promise.resolve(cacheSlot.withValue(this.cache, resolve4, [
                rootValue,
                argumentsObjectFromField(field, variables),
                execContext.context,
                { field, fragmentMap: execContext.fragmentMap }
              ]));
            }
          }
        }
        return [2, resultPromise.then(function(result) {
          if (result === void 0) {
            result = defaultResult;
          }
          if (field.directives) {
            field.directives.forEach(function(directive) {
              if (directive.name.value === "export" && directive.arguments) {
                directive.arguments.forEach(function(arg) {
                  if (arg.name.value === "as" && arg.value.kind === "StringValue") {
                    execContext.exportedVariables[arg.value.value] = result;
                  }
                });
              }
            });
          }
          if (!field.selectionSet) {
            return result;
          }
          if (result == null) {
            return result;
          }
          if (Array.isArray(result)) {
            return _this.resolveSubSelectedArray(field, result, execContext);
          }
          if (field.selectionSet) {
            return _this.resolveSelectionSet(field.selectionSet, result, execContext);
          }
        })];
      });
    });
  };
  LocalState2.prototype.resolveSubSelectedArray = function(field, result, execContext) {
    var _this = this;
    return Promise.all(result.map(function(item) {
      if (item === null) {
        return null;
      }
      if (Array.isArray(item)) {
        return _this.resolveSubSelectedArray(field, item, execContext);
      }
      if (field.selectionSet) {
        return _this.resolveSelectionSet(field.selectionSet, item, execContext);
      }
    }));
  };
  return LocalState2;
}();
var destructiveMethodCounts = new (canUseWeakMap ? WeakMap : Map)();
function wrapDestructiveCacheMethod(cache2, methodName) {
  var original = cache2[methodName];
  if (typeof original === "function") {
    cache2[methodName] = function() {
      destructiveMethodCounts.set(cache2, (destructiveMethodCounts.get(cache2) + 1) % 1e15);
      return original.apply(this, arguments);
    };
  }
}
function cancelNotifyTimeout(info) {
  if (info["notifyTimeout"]) {
    clearTimeout(info["notifyTimeout"]);
    info["notifyTimeout"] = void 0;
  }
}
var QueryInfo = function() {
  function QueryInfo2(queryManager, queryId) {
    if (queryId === void 0) {
      queryId = queryManager.generateQueryId();
    }
    this.queryId = queryId;
    this.listeners = /* @__PURE__ */ new Set();
    this.document = null;
    this.lastRequestId = 1;
    this.subscriptions = /* @__PURE__ */ new Set();
    this.stopped = false;
    this.dirty = false;
    this.observableQuery = null;
    var cache2 = this.cache = queryManager.cache;
    if (!destructiveMethodCounts.has(cache2)) {
      destructiveMethodCounts.set(cache2, 0);
      wrapDestructiveCacheMethod(cache2, "evict");
      wrapDestructiveCacheMethod(cache2, "modify");
      wrapDestructiveCacheMethod(cache2, "reset");
    }
  }
  QueryInfo2.prototype.init = function(query) {
    var networkStatus = query.networkStatus || NetworkStatus.loading;
    if (this.variables && this.networkStatus !== NetworkStatus.loading && !equal(this.variables, query.variables)) {
      networkStatus = NetworkStatus.setVariables;
    }
    if (!equal(query.variables, this.variables)) {
      this.lastDiff = void 0;
    }
    Object.assign(this, {
      document: query.document,
      variables: query.variables,
      networkError: null,
      graphQLErrors: this.graphQLErrors || [],
      networkStatus
    });
    if (query.observableQuery) {
      this.setObservableQuery(query.observableQuery);
    }
    if (query.lastRequestId) {
      this.lastRequestId = query.lastRequestId;
    }
    return this;
  };
  QueryInfo2.prototype.reset = function() {
    cancelNotifyTimeout(this);
    this.lastDiff = void 0;
    this.dirty = false;
  };
  QueryInfo2.prototype.getDiff = function(variables) {
    if (variables === void 0) {
      variables = this.variables;
    }
    var options = this.getDiffOptions(variables);
    if (this.lastDiff && equal(options, this.lastDiff.options)) {
      return this.lastDiff.diff;
    }
    this.updateWatch(this.variables = variables);
    var oq = this.observableQuery;
    if (oq && oq.options.fetchPolicy === "no-cache") {
      return { complete: false };
    }
    var diff2 = this.cache.diff(options);
    this.updateLastDiff(diff2, options);
    return diff2;
  };
  QueryInfo2.prototype.updateLastDiff = function(diff2, options) {
    this.lastDiff = diff2 ? {
      diff: diff2,
      options: options || this.getDiffOptions()
    } : void 0;
  };
  QueryInfo2.prototype.getDiffOptions = function(variables) {
    var _a2;
    if (variables === void 0) {
      variables = this.variables;
    }
    return {
      query: this.document,
      variables,
      returnPartialData: true,
      optimistic: true,
      canonizeResults: (_a2 = this.observableQuery) === null || _a2 === void 0 ? void 0 : _a2.options.canonizeResults
    };
  };
  QueryInfo2.prototype.setDiff = function(diff2) {
    var _this = this;
    var oldDiff = this.lastDiff && this.lastDiff.diff;
    this.updateLastDiff(diff2);
    if (!this.dirty && !equal(oldDiff && oldDiff.result, diff2 && diff2.result)) {
      this.dirty = true;
      if (!this.notifyTimeout) {
        this.notifyTimeout = setTimeout(function() {
          return _this.notify();
        }, 0);
      }
    }
  };
  QueryInfo2.prototype.setObservableQuery = function(oq) {
    var _this = this;
    if (oq === this.observableQuery)
      return;
    if (this.oqListener) {
      this.listeners.delete(this.oqListener);
    }
    this.observableQuery = oq;
    if (oq) {
      oq["queryInfo"] = this;
      this.listeners.add(this.oqListener = function() {
        var diff2 = _this.getDiff();
        if (diff2.fromOptimisticTransaction) {
          oq["observe"]();
        } else {
          reobserveCacheFirst(oq);
        }
      });
    } else {
      delete this.oqListener;
    }
  };
  QueryInfo2.prototype.notify = function() {
    var _this = this;
    cancelNotifyTimeout(this);
    if (this.shouldNotify()) {
      this.listeners.forEach(function(listener) {
        return listener(_this);
      });
    }
    this.dirty = false;
  };
  QueryInfo2.prototype.shouldNotify = function() {
    if (!this.dirty || !this.listeners.size) {
      return false;
    }
    if (isNetworkRequestInFlight(this.networkStatus) && this.observableQuery) {
      var fetchPolicy = this.observableQuery.options.fetchPolicy;
      if (fetchPolicy !== "cache-only" && fetchPolicy !== "cache-and-network") {
        return false;
      }
    }
    return true;
  };
  QueryInfo2.prototype.stop = function() {
    if (!this.stopped) {
      this.stopped = true;
      this.reset();
      this.cancel();
      this.cancel = QueryInfo2.prototype.cancel;
      this.subscriptions.forEach(function(sub) {
        return sub.unsubscribe();
      });
      var oq = this.observableQuery;
      if (oq)
        oq.stopPolling();
    }
  };
  QueryInfo2.prototype.cancel = function() {
  };
  QueryInfo2.prototype.updateWatch = function(variables) {
    var _this = this;
    if (variables === void 0) {
      variables = this.variables;
    }
    var oq = this.observableQuery;
    if (oq && oq.options.fetchPolicy === "no-cache") {
      return;
    }
    var watchOptions = __assign$1(__assign$1({}, this.getDiffOptions(variables)), { watcher: this, callback: function(diff2) {
      return _this.setDiff(diff2);
    } });
    if (!this.lastWatch || !equal(watchOptions, this.lastWatch)) {
      this.cancel();
      this.cancel = this.cache.watch(this.lastWatch = watchOptions);
    }
  };
  QueryInfo2.prototype.resetLastWrite = function() {
    this.lastWrite = void 0;
  };
  QueryInfo2.prototype.shouldWrite = function(result, variables) {
    var lastWrite = this.lastWrite;
    return !(lastWrite && lastWrite.dmCount === destructiveMethodCounts.get(this.cache) && equal(variables, lastWrite.variables) && equal(result.data, lastWrite.result.data));
  };
  QueryInfo2.prototype.markResult = function(result, options, cacheWriteBehavior) {
    var _this = this;
    this.graphQLErrors = isNonEmptyArray(result.errors) ? result.errors : [];
    this.reset();
    if (options.fetchPolicy === "no-cache") {
      this.updateLastDiff({ result: result.data, complete: true }, this.getDiffOptions(options.variables));
    } else if (cacheWriteBehavior !== 0) {
      if (shouldWriteResult(result, options.errorPolicy)) {
        this.cache.performTransaction(function(cache2) {
          if (_this.shouldWrite(result, options.variables)) {
            cache2.writeQuery({
              query: _this.document,
              data: result.data,
              variables: options.variables,
              overwrite: cacheWriteBehavior === 1
            });
            _this.lastWrite = {
              result,
              variables: options.variables,
              dmCount: destructiveMethodCounts.get(_this.cache)
            };
          } else {
            if (_this.lastDiff && _this.lastDiff.diff.complete) {
              result.data = _this.lastDiff.diff.result;
              return;
            }
          }
          var diffOptions = _this.getDiffOptions(options.variables);
          var diff2 = cache2.diff(diffOptions);
          if (!_this.stopped) {
            _this.updateWatch(options.variables);
          }
          _this.updateLastDiff(diff2, diffOptions);
          if (diff2.complete) {
            result.data = diff2.result;
          }
        });
      } else {
        this.lastWrite = void 0;
      }
    }
  };
  QueryInfo2.prototype.markReady = function() {
    this.networkError = null;
    return this.networkStatus = NetworkStatus.ready;
  };
  QueryInfo2.prototype.markError = function(error) {
    this.networkStatus = NetworkStatus.error;
    this.lastWrite = void 0;
    this.reset();
    if (error.graphQLErrors) {
      this.graphQLErrors = error.graphQLErrors;
    }
    if (error.networkError) {
      this.networkError = error.networkError;
    }
    return error;
  };
  return QueryInfo2;
}();
function shouldWriteResult(result, errorPolicy) {
  if (errorPolicy === void 0) {
    errorPolicy = "none";
  }
  var ignoreErrors = errorPolicy === "ignore" || errorPolicy === "all";
  var writeWithErrors = !graphQLResultHasError(result);
  if (!writeWithErrors && ignoreErrors && result.data) {
    writeWithErrors = true;
  }
  return writeWithErrors;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
var QueryManager = function() {
  function QueryManager2(_a2) {
    var cache2 = _a2.cache, link = _a2.link, defaultOptions2 = _a2.defaultOptions, _b = _a2.queryDeduplication, queryDeduplication = _b === void 0 ? false : _b, onBroadcast = _a2.onBroadcast, _c = _a2.ssrMode, ssrMode = _c === void 0 ? false : _c, _d = _a2.clientAwareness, clientAwareness = _d === void 0 ? {} : _d, localState = _a2.localState, assumeImmutableResults = _a2.assumeImmutableResults;
    this.clientAwareness = {};
    this.queries = /* @__PURE__ */ new Map();
    this.fetchCancelFns = /* @__PURE__ */ new Map();
    this.transformCache = new (canUseWeakMap ? WeakMap : Map)();
    this.queryIdCounter = 1;
    this.requestIdCounter = 1;
    this.mutationIdCounter = 1;
    this.inFlightLinkObservables = /* @__PURE__ */ new Map();
    this.cache = cache2;
    this.link = link;
    this.defaultOptions = defaultOptions2 || /* @__PURE__ */ Object.create(null);
    this.queryDeduplication = queryDeduplication;
    this.clientAwareness = clientAwareness;
    this.localState = localState || new LocalState({ cache: cache2 });
    this.ssrMode = ssrMode;
    this.assumeImmutableResults = !!assumeImmutableResults;
    if (this.onBroadcast = onBroadcast) {
      this.mutationStore = /* @__PURE__ */ Object.create(null);
    }
  }
  QueryManager2.prototype.stop = function() {
    var _this = this;
    this.queries.forEach(function(_info, queryId) {
      _this.stopQueryNoBroadcast(queryId);
    });
    this.cancelPendingFetches(__DEV__ ? new InvariantError("QueryManager stopped while query was in flight") : new InvariantError(11));
  };
  QueryManager2.prototype.cancelPendingFetches = function(error) {
    this.fetchCancelFns.forEach(function(cancel) {
      return cancel(error);
    });
    this.fetchCancelFns.clear();
  };
  QueryManager2.prototype.mutate = function(_a2) {
    var _b, _c;
    var mutation = _a2.mutation, variables = _a2.variables, optimisticResponse = _a2.optimisticResponse, updateQueries = _a2.updateQueries, _d = _a2.refetchQueries, refetchQueries = _d === void 0 ? [] : _d, _e = _a2.awaitRefetchQueries, awaitRefetchQueries = _e === void 0 ? false : _e, updateWithProxyFn = _a2.update, onQueryUpdated = _a2.onQueryUpdated, _f = _a2.fetchPolicy, fetchPolicy = _f === void 0 ? ((_b = this.defaultOptions.mutate) === null || _b === void 0 ? void 0 : _b.fetchPolicy) || "network-only" : _f, _g = _a2.errorPolicy, errorPolicy = _g === void 0 ? ((_c = this.defaultOptions.mutate) === null || _c === void 0 ? void 0 : _c.errorPolicy) || "none" : _g, keepRootFields = _a2.keepRootFields, context = _a2.context;
    return __awaiter(this, void 0, void 0, function() {
      var mutationId, mutationStoreValue, self2;
      return __generator(this, function(_h) {
        switch (_h.label) {
          case 0:
            __DEV__ ? invariant$1(mutation, "mutation option is required. You must specify your GraphQL document in the mutation option.") : invariant$1(mutation, 12);
            __DEV__ ? invariant$1(fetchPolicy === "network-only" || fetchPolicy === "no-cache", "Mutations support only 'network-only' or 'no-cache' fetchPolicy strings. The default `network-only` behavior automatically writes mutation results to the cache. Passing `no-cache` skips the cache write.") : invariant$1(fetchPolicy === "network-only" || fetchPolicy === "no-cache", 13);
            mutationId = this.generateMutationId();
            mutation = this.transform(mutation).document;
            variables = this.getVariables(mutation, variables);
            if (!this.transform(mutation).hasClientExports)
              return [3, 2];
            return [4, this.localState.addExportedVariables(mutation, variables, context)];
          case 1:
            variables = _h.sent();
            _h.label = 2;
          case 2:
            mutationStoreValue = this.mutationStore && (this.mutationStore[mutationId] = {
              mutation,
              variables,
              loading: true,
              error: null
            });
            if (optimisticResponse) {
              this.markMutationOptimistic(optimisticResponse, {
                mutationId,
                document: mutation,
                variables,
                fetchPolicy,
                errorPolicy,
                context,
                updateQueries,
                update: updateWithProxyFn,
                keepRootFields
              });
            }
            this.broadcastQueries();
            self2 = this;
            return [2, new Promise(function(resolve4, reject) {
              return asyncMap(self2.getObservableFromLink(mutation, __assign$1(__assign$1({}, context), { optimisticResponse }), variables, false), function(result) {
                if (graphQLResultHasError(result) && errorPolicy === "none") {
                  throw new ApolloError({
                    graphQLErrors: result.errors
                  });
                }
                if (mutationStoreValue) {
                  mutationStoreValue.loading = false;
                  mutationStoreValue.error = null;
                }
                var storeResult = __assign$1({}, result);
                if (typeof refetchQueries === "function") {
                  refetchQueries = refetchQueries(storeResult);
                }
                if (errorPolicy === "ignore" && graphQLResultHasError(storeResult)) {
                  delete storeResult.errors;
                }
                return self2.markMutationResult({
                  mutationId,
                  result: storeResult,
                  document: mutation,
                  variables,
                  fetchPolicy,
                  errorPolicy,
                  context,
                  update: updateWithProxyFn,
                  updateQueries,
                  awaitRefetchQueries,
                  refetchQueries,
                  removeOptimistic: optimisticResponse ? mutationId : void 0,
                  onQueryUpdated,
                  keepRootFields
                });
              }).subscribe({
                next: function(storeResult) {
                  self2.broadcastQueries();
                  resolve4(storeResult);
                },
                error: function(err) {
                  if (mutationStoreValue) {
                    mutationStoreValue.loading = false;
                    mutationStoreValue.error = err;
                  }
                  if (optimisticResponse) {
                    self2.cache.removeOptimistic(mutationId);
                  }
                  self2.broadcastQueries();
                  reject(err instanceof ApolloError ? err : new ApolloError({
                    networkError: err
                  }));
                }
              });
            })];
        }
      });
    });
  };
  QueryManager2.prototype.markMutationResult = function(mutation, cache2) {
    var _this = this;
    if (cache2 === void 0) {
      cache2 = this.cache;
    }
    var result = mutation.result;
    var cacheWrites = [];
    var skipCache = mutation.fetchPolicy === "no-cache";
    if (!skipCache && shouldWriteResult(result, mutation.errorPolicy)) {
      cacheWrites.push({
        result: result.data,
        dataId: "ROOT_MUTATION",
        query: mutation.document,
        variables: mutation.variables
      });
      var updateQueries_1 = mutation.updateQueries;
      if (updateQueries_1) {
        this.queries.forEach(function(_a2, queryId) {
          var observableQuery = _a2.observableQuery;
          var queryName = observableQuery && observableQuery.queryName;
          if (!queryName || !hasOwnProperty.call(updateQueries_1, queryName)) {
            return;
          }
          var updater = updateQueries_1[queryName];
          var _b = _this.queries.get(queryId), document2 = _b.document, variables = _b.variables;
          var _c = cache2.diff({
            query: document2,
            variables,
            returnPartialData: true,
            optimistic: false
          }), currentQueryResult = _c.result, complete = _c.complete;
          if (complete && currentQueryResult) {
            var nextQueryResult = updater(currentQueryResult, {
              mutationResult: result,
              queryName: document2 && getOperationName(document2) || void 0,
              queryVariables: variables
            });
            if (nextQueryResult) {
              cacheWrites.push({
                result: nextQueryResult,
                dataId: "ROOT_QUERY",
                query: document2,
                variables
              });
            }
          }
        });
      }
    }
    if (cacheWrites.length > 0 || mutation.refetchQueries || mutation.update || mutation.onQueryUpdated || mutation.removeOptimistic) {
      var results_1 = [];
      this.refetchQueries({
        updateCache: function(cache3) {
          if (!skipCache) {
            cacheWrites.forEach(function(write) {
              return cache3.write(write);
            });
          }
          var update = mutation.update;
          if (update) {
            if (!skipCache) {
              var diff2 = cache3.diff({
                id: "ROOT_MUTATION",
                query: _this.transform(mutation.document).asQuery,
                variables: mutation.variables,
                optimistic: false,
                returnPartialData: true
              });
              if (diff2.complete) {
                result = __assign$1(__assign$1({}, result), { data: diff2.result });
              }
            }
            update(cache3, result, {
              context: mutation.context,
              variables: mutation.variables
            });
          }
          if (!skipCache && !mutation.keepRootFields) {
            cache3.modify({
              id: "ROOT_MUTATION",
              fields: function(value, _a2) {
                var fieldName = _a2.fieldName, DELETE2 = _a2.DELETE;
                return fieldName === "__typename" ? value : DELETE2;
              }
            });
          }
        },
        include: mutation.refetchQueries,
        optimistic: false,
        removeOptimistic: mutation.removeOptimistic,
        onQueryUpdated: mutation.onQueryUpdated || null
      }).forEach(function(result2) {
        return results_1.push(result2);
      });
      if (mutation.awaitRefetchQueries || mutation.onQueryUpdated) {
        return Promise.all(results_1).then(function() {
          return result;
        });
      }
    }
    return Promise.resolve(result);
  };
  QueryManager2.prototype.markMutationOptimistic = function(optimisticResponse, mutation) {
    var _this = this;
    var data = typeof optimisticResponse === "function" ? optimisticResponse(mutation.variables) : optimisticResponse;
    return this.cache.recordOptimisticTransaction(function(cache2) {
      try {
        _this.markMutationResult(__assign$1(__assign$1({}, mutation), { result: { data } }), cache2);
      } catch (error) {
        __DEV__ && invariant$1.error(error);
      }
    }, mutation.mutationId);
  };
  QueryManager2.prototype.fetchQuery = function(queryId, options, networkStatus) {
    return this.fetchQueryObservable(queryId, options, networkStatus).promise;
  };
  QueryManager2.prototype.getQueryStore = function() {
    var store = /* @__PURE__ */ Object.create(null);
    this.queries.forEach(function(info, queryId) {
      store[queryId] = {
        variables: info.variables,
        networkStatus: info.networkStatus,
        networkError: info.networkError,
        graphQLErrors: info.graphQLErrors
      };
    });
    return store;
  };
  QueryManager2.prototype.resetErrors = function(queryId) {
    var queryInfo = this.queries.get(queryId);
    if (queryInfo) {
      queryInfo.networkError = void 0;
      queryInfo.graphQLErrors = [];
    }
  };
  QueryManager2.prototype.transform = function(document2) {
    var transformCache = this.transformCache;
    if (!transformCache.has(document2)) {
      var transformed = this.cache.transformDocument(document2);
      var forLink = removeConnectionDirectiveFromDocument(this.cache.transformForLink(transformed));
      var clientQuery = this.localState.clientQuery(transformed);
      var serverQuery = forLink && this.localState.serverQuery(forLink);
      var cacheEntry_1 = {
        document: transformed,
        hasClientExports: hasClientExports(transformed),
        hasForcedResolvers: this.localState.shouldForceResolvers(transformed),
        clientQuery,
        serverQuery,
        defaultVars: getDefaultValues(getOperationDefinition(transformed)),
        asQuery: __assign$1(__assign$1({}, transformed), { definitions: transformed.definitions.map(function(def) {
          if (def.kind === "OperationDefinition" && def.operation !== "query") {
            return __assign$1(__assign$1({}, def), { operation: "query" });
          }
          return def;
        }) })
      };
      var add = function(doc) {
        if (doc && !transformCache.has(doc)) {
          transformCache.set(doc, cacheEntry_1);
        }
      };
      add(document2);
      add(transformed);
      add(clientQuery);
      add(serverQuery);
    }
    return transformCache.get(document2);
  };
  QueryManager2.prototype.getVariables = function(document2, variables) {
    return __assign$1(__assign$1({}, this.transform(document2).defaultVars), variables);
  };
  QueryManager2.prototype.watchQuery = function(options) {
    options = __assign$1(__assign$1({}, options), { variables: this.getVariables(options.query, options.variables) });
    if (typeof options.notifyOnNetworkStatusChange === "undefined") {
      options.notifyOnNetworkStatusChange = false;
    }
    var queryInfo = new QueryInfo(this);
    var observable = new ObservableQuery({
      queryManager: this,
      queryInfo,
      options
    });
    this.queries.set(observable.queryId, queryInfo);
    queryInfo.init({
      document: observable.query,
      observableQuery: observable,
      variables: observable.variables
    });
    return observable;
  };
  QueryManager2.prototype.query = function(options, queryId) {
    var _this = this;
    if (queryId === void 0) {
      queryId = this.generateQueryId();
    }
    __DEV__ ? invariant$1(options.query, "query option is required. You must specify your GraphQL document in the query option.") : invariant$1(options.query, 14);
    __DEV__ ? invariant$1(options.query.kind === "Document", 'You must wrap the query string in a "gql" tag.') : invariant$1(options.query.kind === "Document", 15);
    __DEV__ ? invariant$1(!options.returnPartialData, "returnPartialData option only supported on watchQuery.") : invariant$1(!options.returnPartialData, 16);
    __DEV__ ? invariant$1(!options.pollInterval, "pollInterval option only supported on watchQuery.") : invariant$1(!options.pollInterval, 17);
    return this.fetchQuery(queryId, options).finally(function() {
      return _this.stopQuery(queryId);
    });
  };
  QueryManager2.prototype.generateQueryId = function() {
    return String(this.queryIdCounter++);
  };
  QueryManager2.prototype.generateRequestId = function() {
    return this.requestIdCounter++;
  };
  QueryManager2.prototype.generateMutationId = function() {
    return String(this.mutationIdCounter++);
  };
  QueryManager2.prototype.stopQueryInStore = function(queryId) {
    this.stopQueryInStoreNoBroadcast(queryId);
    this.broadcastQueries();
  };
  QueryManager2.prototype.stopQueryInStoreNoBroadcast = function(queryId) {
    var queryInfo = this.queries.get(queryId);
    if (queryInfo)
      queryInfo.stop();
  };
  QueryManager2.prototype.clearStore = function(options) {
    if (options === void 0) {
      options = {
        discardWatches: true
      };
    }
    this.cancelPendingFetches(__DEV__ ? new InvariantError("Store reset while query was in flight (not completed in link chain)") : new InvariantError(18));
    this.queries.forEach(function(queryInfo) {
      if (queryInfo.observableQuery) {
        queryInfo.networkStatus = NetworkStatus.loading;
      } else {
        queryInfo.stop();
      }
    });
    if (this.mutationStore) {
      this.mutationStore = /* @__PURE__ */ Object.create(null);
    }
    return this.cache.reset(options);
  };
  QueryManager2.prototype.getObservableQueries = function(include) {
    var _this = this;
    if (include === void 0) {
      include = "active";
    }
    var queries = /* @__PURE__ */ new Map();
    var queryNamesAndDocs = /* @__PURE__ */ new Map();
    var legacyQueryOptions = /* @__PURE__ */ new Set();
    if (Array.isArray(include)) {
      include.forEach(function(desc) {
        if (typeof desc === "string") {
          queryNamesAndDocs.set(desc, false);
        } else if (isDocumentNode(desc)) {
          queryNamesAndDocs.set(_this.transform(desc).document, false);
        } else if (isNonNullObject(desc) && desc.query) {
          legacyQueryOptions.add(desc);
        }
      });
    }
    this.queries.forEach(function(_a2, queryId) {
      var oq = _a2.observableQuery, document2 = _a2.document;
      if (oq) {
        if (include === "all") {
          queries.set(queryId, oq);
          return;
        }
        var queryName = oq.queryName, fetchPolicy = oq.options.fetchPolicy;
        if (fetchPolicy === "standby" || include === "active" && !oq.hasObservers()) {
          return;
        }
        if (include === "active" || queryName && queryNamesAndDocs.has(queryName) || document2 && queryNamesAndDocs.has(document2)) {
          queries.set(queryId, oq);
          if (queryName)
            queryNamesAndDocs.set(queryName, true);
          if (document2)
            queryNamesAndDocs.set(document2, true);
        }
      }
    });
    if (legacyQueryOptions.size) {
      legacyQueryOptions.forEach(function(options) {
        var queryId = makeUniqueId("legacyOneTimeQuery");
        var queryInfo = _this.getQuery(queryId).init({
          document: options.query,
          variables: options.variables
        });
        var oq = new ObservableQuery({
          queryManager: _this,
          queryInfo,
          options: __assign$1(__assign$1({}, options), { fetchPolicy: "network-only" })
        });
        invariant$1(oq.queryId === queryId);
        queryInfo.setObservableQuery(oq);
        queries.set(queryId, oq);
      });
    }
    if (__DEV__ && queryNamesAndDocs.size) {
      queryNamesAndDocs.forEach(function(included, nameOrDoc) {
        if (!included) {
          __DEV__ && invariant$1.warn("Unknown query ".concat(typeof nameOrDoc === "string" ? "named " : "").concat(JSON.stringify(nameOrDoc, null, 2), " requested in refetchQueries options.include array"));
        }
      });
    }
    return queries;
  };
  QueryManager2.prototype.reFetchObservableQueries = function(includeStandby) {
    var _this = this;
    if (includeStandby === void 0) {
      includeStandby = false;
    }
    var observableQueryPromises = [];
    this.getObservableQueries(includeStandby ? "all" : "active").forEach(function(observableQuery, queryId) {
      var fetchPolicy = observableQuery.options.fetchPolicy;
      observableQuery.resetLastResults();
      if (includeStandby || fetchPolicy !== "standby" && fetchPolicy !== "cache-only") {
        observableQueryPromises.push(observableQuery.refetch());
      }
      _this.getQuery(queryId).setDiff(null);
    });
    this.broadcastQueries();
    return Promise.all(observableQueryPromises);
  };
  QueryManager2.prototype.setObservableQuery = function(observableQuery) {
    this.getQuery(observableQuery.queryId).setObservableQuery(observableQuery);
  };
  QueryManager2.prototype.startGraphQLSubscription = function(_a2) {
    var _this = this;
    var query = _a2.query, fetchPolicy = _a2.fetchPolicy, errorPolicy = _a2.errorPolicy, variables = _a2.variables, _b = _a2.context, context = _b === void 0 ? {} : _b;
    query = this.transform(query).document;
    variables = this.getVariables(query, variables);
    var makeObservable = function(variables2) {
      return _this.getObservableFromLink(query, context, variables2).map(function(result) {
        if (fetchPolicy !== "no-cache") {
          if (shouldWriteResult(result, errorPolicy)) {
            _this.cache.write({
              query,
              result: result.data,
              dataId: "ROOT_SUBSCRIPTION",
              variables: variables2
            });
          }
          _this.broadcastQueries();
        }
        if (graphQLResultHasError(result)) {
          throw new ApolloError({
            graphQLErrors: result.errors
          });
        }
        return result;
      });
    };
    if (this.transform(query).hasClientExports) {
      var observablePromise_1 = this.localState.addExportedVariables(query, variables, context).then(makeObservable);
      return new Observable(function(observer) {
        var sub = null;
        observablePromise_1.then(function(observable) {
          return sub = observable.subscribe(observer);
        }, observer.error);
        return function() {
          return sub && sub.unsubscribe();
        };
      });
    }
    return makeObservable(variables);
  };
  QueryManager2.prototype.stopQuery = function(queryId) {
    this.stopQueryNoBroadcast(queryId);
    this.broadcastQueries();
  };
  QueryManager2.prototype.stopQueryNoBroadcast = function(queryId) {
    this.stopQueryInStoreNoBroadcast(queryId);
    this.removeQuery(queryId);
  };
  QueryManager2.prototype.removeQuery = function(queryId) {
    this.fetchCancelFns.delete(queryId);
    if (this.queries.has(queryId)) {
      this.getQuery(queryId).stop();
      this.queries.delete(queryId);
    }
  };
  QueryManager2.prototype.broadcastQueries = function() {
    if (this.onBroadcast)
      this.onBroadcast();
    this.queries.forEach(function(info) {
      return info.notify();
    });
  };
  QueryManager2.prototype.getLocalState = function() {
    return this.localState;
  };
  QueryManager2.prototype.getObservableFromLink = function(query, context, variables, deduplication) {
    var _this = this;
    var _a2;
    if (deduplication === void 0) {
      deduplication = (_a2 = context === null || context === void 0 ? void 0 : context.queryDeduplication) !== null && _a2 !== void 0 ? _a2 : this.queryDeduplication;
    }
    var observable;
    var serverQuery = this.transform(query).serverQuery;
    if (serverQuery) {
      var _b = this, inFlightLinkObservables_1 = _b.inFlightLinkObservables, link = _b.link;
      var operation = {
        query: serverQuery,
        variables,
        operationName: getOperationName(serverQuery) || void 0,
        context: this.prepareContext(__assign$1(__assign$1({}, context), { forceFetch: !deduplication }))
      };
      context = operation.context;
      if (deduplication) {
        var byVariables_1 = inFlightLinkObservables_1.get(serverQuery) || /* @__PURE__ */ new Map();
        inFlightLinkObservables_1.set(serverQuery, byVariables_1);
        var varJson_1 = canonicalStringify(variables);
        observable = byVariables_1.get(varJson_1);
        if (!observable) {
          var concast = new Concast([
            execute(link, operation)
          ]);
          byVariables_1.set(varJson_1, observable = concast);
          concast.cleanup(function() {
            if (byVariables_1.delete(varJson_1) && byVariables_1.size < 1) {
              inFlightLinkObservables_1.delete(serverQuery);
            }
          });
        }
      } else {
        observable = new Concast([
          execute(link, operation)
        ]);
      }
    } else {
      observable = new Concast([
        Observable.of({ data: {} })
      ]);
      context = this.prepareContext(context);
    }
    var clientQuery = this.transform(query).clientQuery;
    if (clientQuery) {
      observable = asyncMap(observable, function(result) {
        return _this.localState.runResolvers({
          document: clientQuery,
          remoteResult: result,
          context,
          variables
        });
      });
    }
    return observable;
  };
  QueryManager2.prototype.getResultsFromLink = function(queryInfo, cacheWriteBehavior, options) {
    var requestId2 = queryInfo.lastRequestId = this.generateRequestId();
    return asyncMap(this.getObservableFromLink(queryInfo.document, options.context, options.variables), function(result) {
      var hasErrors = isNonEmptyArray(result.errors);
      if (requestId2 >= queryInfo.lastRequestId) {
        if (hasErrors && options.errorPolicy === "none") {
          throw queryInfo.markError(new ApolloError({
            graphQLErrors: result.errors
          }));
        }
        queryInfo.markResult(result, options, cacheWriteBehavior);
        queryInfo.markReady();
      }
      var aqr = {
        data: result.data,
        loading: false,
        networkStatus: NetworkStatus.ready
      };
      if (hasErrors && options.errorPolicy !== "ignore") {
        aqr.errors = result.errors;
        aqr.networkStatus = NetworkStatus.error;
      }
      return aqr;
    }, function(networkError) {
      var error = isApolloError(networkError) ? networkError : new ApolloError({ networkError });
      if (requestId2 >= queryInfo.lastRequestId) {
        queryInfo.markError(error);
      }
      throw error;
    });
  };
  QueryManager2.prototype.fetchQueryObservable = function(queryId, options, networkStatus) {
    var _this = this;
    if (networkStatus === void 0) {
      networkStatus = NetworkStatus.loading;
    }
    var query = this.transform(options.query).document;
    var variables = this.getVariables(query, options.variables);
    var queryInfo = this.getQuery(queryId);
    var defaults = this.defaultOptions.watchQuery;
    var _a2 = options.fetchPolicy, fetchPolicy = _a2 === void 0 ? defaults && defaults.fetchPolicy || "cache-first" : _a2, _b = options.errorPolicy, errorPolicy = _b === void 0 ? defaults && defaults.errorPolicy || "none" : _b, _c = options.returnPartialData, returnPartialData = _c === void 0 ? false : _c, _d = options.notifyOnNetworkStatusChange, notifyOnNetworkStatusChange = _d === void 0 ? false : _d, _e = options.context, context = _e === void 0 ? {} : _e;
    var normalized = Object.assign({}, options, {
      query,
      variables,
      fetchPolicy,
      errorPolicy,
      returnPartialData,
      notifyOnNetworkStatusChange,
      context
    });
    var fromVariables = function(variables2) {
      normalized.variables = variables2;
      var concastSources = _this.fetchQueryByPolicy(queryInfo, normalized, networkStatus);
      if (normalized.fetchPolicy !== "standby" && concastSources.length > 0 && queryInfo.observableQuery) {
        queryInfo.observableQuery["applyNextFetchPolicy"]("after-fetch", options);
      }
      return concastSources;
    };
    var cleanupCancelFn = function() {
      return _this.fetchCancelFns.delete(queryId);
    };
    this.fetchCancelFns.set(queryId, function(reason) {
      cleanupCancelFn();
      setTimeout(function() {
        return concast.cancel(reason);
      });
    });
    var concast = new Concast(this.transform(normalized.query).hasClientExports ? this.localState.addExportedVariables(normalized.query, normalized.variables, normalized.context).then(fromVariables) : fromVariables(normalized.variables));
    concast.promise.then(cleanupCancelFn, cleanupCancelFn);
    return concast;
  };
  QueryManager2.prototype.refetchQueries = function(_a2) {
    var _this = this;
    var updateCache = _a2.updateCache, include = _a2.include, _b = _a2.optimistic, optimistic = _b === void 0 ? false : _b, _c = _a2.removeOptimistic, removeOptimistic = _c === void 0 ? optimistic ? makeUniqueId("refetchQueries") : void 0 : _c, onQueryUpdated = _a2.onQueryUpdated;
    var includedQueriesById = /* @__PURE__ */ new Map();
    if (include) {
      this.getObservableQueries(include).forEach(function(oq, queryId) {
        includedQueriesById.set(queryId, {
          oq,
          lastDiff: _this.getQuery(queryId).getDiff()
        });
      });
    }
    var results = /* @__PURE__ */ new Map();
    if (updateCache) {
      this.cache.batch({
        update: updateCache,
        optimistic: optimistic && removeOptimistic || false,
        removeOptimistic,
        onWatchUpdated: function(watch, diff2, lastDiff) {
          var oq = watch.watcher instanceof QueryInfo && watch.watcher.observableQuery;
          if (oq) {
            if (onQueryUpdated) {
              includedQueriesById.delete(oq.queryId);
              var result = onQueryUpdated(oq, diff2, lastDiff);
              if (result === true) {
                result = oq.refetch();
              }
              if (result !== false) {
                results.set(oq, result);
              }
              return result;
            }
            if (onQueryUpdated !== null) {
              includedQueriesById.set(oq.queryId, { oq, lastDiff, diff: diff2 });
            }
          }
        }
      });
    }
    if (includedQueriesById.size) {
      includedQueriesById.forEach(function(_a3, queryId) {
        var oq = _a3.oq, lastDiff = _a3.lastDiff, diff2 = _a3.diff;
        var result;
        if (onQueryUpdated) {
          if (!diff2) {
            var info = oq["queryInfo"];
            info.reset();
            diff2 = info.getDiff();
          }
          result = onQueryUpdated(oq, diff2, lastDiff);
        }
        if (!onQueryUpdated || result === true) {
          result = oq.refetch();
        }
        if (result !== false) {
          results.set(oq, result);
        }
        if (queryId.indexOf("legacyOneTimeQuery") >= 0) {
          _this.stopQueryNoBroadcast(queryId);
        }
      });
    }
    if (removeOptimistic) {
      this.cache.removeOptimistic(removeOptimistic);
    }
    return results;
  };
  QueryManager2.prototype.fetchQueryByPolicy = function(queryInfo, _a2, networkStatus) {
    var _this = this;
    var query = _a2.query, variables = _a2.variables, fetchPolicy = _a2.fetchPolicy, refetchWritePolicy = _a2.refetchWritePolicy, errorPolicy = _a2.errorPolicy, returnPartialData = _a2.returnPartialData, context = _a2.context, notifyOnNetworkStatusChange = _a2.notifyOnNetworkStatusChange;
    var oldNetworkStatus = queryInfo.networkStatus;
    queryInfo.init({
      document: this.transform(query).document,
      variables,
      networkStatus
    });
    var readCache = function() {
      return queryInfo.getDiff(variables);
    };
    var resultsFromCache = function(diff3, networkStatus2) {
      if (networkStatus2 === void 0) {
        networkStatus2 = queryInfo.networkStatus || NetworkStatus.loading;
      }
      var data = diff3.result;
      if (__DEV__ && !returnPartialData && !equal(data, {})) {
        logMissingFieldErrors(diff3.missing);
      }
      var fromData = function(data2) {
        return Observable.of(__assign$1({ data: data2, loading: isNetworkRequestInFlight(networkStatus2), networkStatus: networkStatus2 }, diff3.complete ? null : { partial: true }));
      };
      if (data && _this.transform(query).hasForcedResolvers) {
        return _this.localState.runResolvers({
          document: query,
          remoteResult: { data },
          context,
          variables,
          onlyRunForcedResolvers: true
        }).then(function(resolved) {
          return fromData(resolved.data || void 0);
        });
      }
      return fromData(data);
    };
    var cacheWriteBehavior = fetchPolicy === "no-cache" ? 0 : networkStatus === NetworkStatus.refetch && refetchWritePolicy !== "merge" ? 1 : 2;
    var resultsFromLink = function() {
      return _this.getResultsFromLink(queryInfo, cacheWriteBehavior, {
        variables,
        context,
        fetchPolicy,
        errorPolicy
      });
    };
    var shouldNotify = notifyOnNetworkStatusChange && typeof oldNetworkStatus === "number" && oldNetworkStatus !== networkStatus && isNetworkRequestInFlight(networkStatus);
    switch (fetchPolicy) {
      default:
      case "cache-first": {
        var diff2 = readCache();
        if (diff2.complete) {
          return [
            resultsFromCache(diff2, queryInfo.markReady())
          ];
        }
        if (returnPartialData || shouldNotify) {
          return [
            resultsFromCache(diff2),
            resultsFromLink()
          ];
        }
        return [
          resultsFromLink()
        ];
      }
      case "cache-and-network": {
        var diff2 = readCache();
        if (diff2.complete || returnPartialData || shouldNotify) {
          return [
            resultsFromCache(diff2),
            resultsFromLink()
          ];
        }
        return [
          resultsFromLink()
        ];
      }
      case "cache-only":
        return [
          resultsFromCache(readCache(), queryInfo.markReady())
        ];
      case "network-only":
        if (shouldNotify) {
          return [
            resultsFromCache(readCache()),
            resultsFromLink()
          ];
        }
        return [resultsFromLink()];
      case "no-cache":
        if (shouldNotify) {
          return [
            resultsFromCache(queryInfo.getDiff()),
            resultsFromLink()
          ];
        }
        return [resultsFromLink()];
      case "standby":
        return [];
    }
  };
  QueryManager2.prototype.getQuery = function(queryId) {
    if (queryId && !this.queries.has(queryId)) {
      this.queries.set(queryId, new QueryInfo(this, queryId));
    }
    return this.queries.get(queryId);
  };
  QueryManager2.prototype.prepareContext = function(context) {
    if (context === void 0) {
      context = {};
    }
    var newContext = this.localState.prepareContext(context);
    return __assign$1(__assign$1({}, newContext), { clientAwareness: this.clientAwareness });
  };
  return QueryManager2;
}();
var hasSuggestedDevtools = false;
var ApolloClient = function() {
  function ApolloClient2(options) {
    var _this = this;
    this.resetStoreCallbacks = [];
    this.clearStoreCallbacks = [];
    var uri = options.uri, credentials = options.credentials, headers = options.headers, cache2 = options.cache, _a2 = options.ssrMode, ssrMode = _a2 === void 0 ? false : _a2, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, _c = options.connectToDevTools, connectToDevTools = _c === void 0 ? typeof window === "object" && !window.__APOLLO_CLIENT__ && __DEV__ : _c, _d = options.queryDeduplication, queryDeduplication = _d === void 0 ? true : _d, defaultOptions2 = options.defaultOptions, _e = options.assumeImmutableResults, assumeImmutableResults = _e === void 0 ? false : _e, resolvers = options.resolvers, typeDefs = options.typeDefs, fragmentMatcher = options.fragmentMatcher, clientAwarenessName = options.name, clientAwarenessVersion = options.version;
    var link = options.link;
    if (!link) {
      link = uri ? new HttpLink({ uri, credentials, headers }) : ApolloLink.empty();
    }
    if (!cache2) {
      throw __DEV__ ? new InvariantError("To initialize Apollo Client, you must specify a 'cache' property in the options object. \nFor more information, please visit: https://go.apollo.dev/c/docs") : new InvariantError(7);
    }
    this.link = link;
    this.cache = cache2;
    this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
    this.queryDeduplication = queryDeduplication;
    this.defaultOptions = defaultOptions2 || /* @__PURE__ */ Object.create(null);
    this.typeDefs = typeDefs;
    if (ssrForceFetchDelay) {
      setTimeout(function() {
        return _this.disableNetworkFetches = false;
      }, ssrForceFetchDelay);
    }
    this.watchQuery = this.watchQuery.bind(this);
    this.query = this.query.bind(this);
    this.mutate = this.mutate.bind(this);
    this.resetStore = this.resetStore.bind(this);
    this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
    if (connectToDevTools && typeof window === "object") {
      window.__APOLLO_CLIENT__ = this;
    }
    if (!hasSuggestedDevtools && __DEV__) {
      hasSuggestedDevtools = true;
      if (typeof window !== "undefined" && window.document && window.top === window.self && !window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) {
        var nav = window.navigator;
        var ua = nav && nav.userAgent;
        var url = void 0;
        if (typeof ua === "string") {
          if (ua.indexOf("Chrome/") > -1) {
            url = "https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm";
          } else if (ua.indexOf("Firefox/") > -1) {
            url = "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/";
          }
        }
        if (url) {
          __DEV__ && invariant$1.log("Download the Apollo DevTools for a better development experience: " + url);
        }
      }
    }
    this.version = version;
    this.localState = new LocalState({
      cache: cache2,
      client: this,
      resolvers,
      fragmentMatcher
    });
    this.queryManager = new QueryManager({
      cache: this.cache,
      link: this.link,
      defaultOptions: this.defaultOptions,
      queryDeduplication,
      ssrMode,
      clientAwareness: {
        name: clientAwarenessName,
        version: clientAwarenessVersion
      },
      localState: this.localState,
      assumeImmutableResults,
      onBroadcast: connectToDevTools ? function() {
        if (_this.devToolsHookCb) {
          _this.devToolsHookCb({
            action: {},
            state: {
              queries: _this.queryManager.getQueryStore(),
              mutations: _this.queryManager.mutationStore || {}
            },
            dataWithOptimisticResults: _this.cache.extract(true)
          });
        }
      } : void 0
    });
  }
  ApolloClient2.prototype.stop = function() {
    this.queryManager.stop();
  };
  ApolloClient2.prototype.watchQuery = function(options) {
    if (this.defaultOptions.watchQuery) {
      options = mergeOptions(this.defaultOptions.watchQuery, options);
    }
    if (this.disableNetworkFetches && (options.fetchPolicy === "network-only" || options.fetchPolicy === "cache-and-network")) {
      options = __assign$1(__assign$1({}, options), { fetchPolicy: "cache-first" });
    }
    return this.queryManager.watchQuery(options);
  };
  ApolloClient2.prototype.query = function(options) {
    if (this.defaultOptions.query) {
      options = mergeOptions(this.defaultOptions.query, options);
    }
    __DEV__ ? invariant$1(options.fetchPolicy !== "cache-and-network", "The cache-and-network fetchPolicy does not work with client.query, because client.query can only return a single result. Please use client.watchQuery to receive multiple results from the cache and the network, or consider using a different fetchPolicy, such as cache-first or network-only.") : invariant$1(options.fetchPolicy !== "cache-and-network", 8);
    if (this.disableNetworkFetches && options.fetchPolicy === "network-only") {
      options = __assign$1(__assign$1({}, options), { fetchPolicy: "cache-first" });
    }
    return this.queryManager.query(options);
  };
  ApolloClient2.prototype.mutate = function(options) {
    if (this.defaultOptions.mutate) {
      options = mergeOptions(this.defaultOptions.mutate, options);
    }
    return this.queryManager.mutate(options);
  };
  ApolloClient2.prototype.subscribe = function(options) {
    return this.queryManager.startGraphQLSubscription(options);
  };
  ApolloClient2.prototype.readQuery = function(options, optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }
    return this.cache.readQuery(options, optimistic);
  };
  ApolloClient2.prototype.readFragment = function(options, optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }
    return this.cache.readFragment(options, optimistic);
  };
  ApolloClient2.prototype.writeQuery = function(options) {
    this.cache.writeQuery(options);
    this.queryManager.broadcastQueries();
  };
  ApolloClient2.prototype.writeFragment = function(options) {
    this.cache.writeFragment(options);
    this.queryManager.broadcastQueries();
  };
  ApolloClient2.prototype.__actionHookForDevTools = function(cb) {
    this.devToolsHookCb = cb;
  };
  ApolloClient2.prototype.__requestRaw = function(payload) {
    return execute(this.link, payload);
  };
  ApolloClient2.prototype.resetStore = function() {
    var _this = this;
    return Promise.resolve().then(function() {
      return _this.queryManager.clearStore({
        discardWatches: false
      });
    }).then(function() {
      return Promise.all(_this.resetStoreCallbacks.map(function(fn) {
        return fn();
      }));
    }).then(function() {
      return _this.reFetchObservableQueries();
    });
  };
  ApolloClient2.prototype.clearStore = function() {
    var _this = this;
    return Promise.resolve().then(function() {
      return _this.queryManager.clearStore({
        discardWatches: true
      });
    }).then(function() {
      return Promise.all(_this.clearStoreCallbacks.map(function(fn) {
        return fn();
      }));
    });
  };
  ApolloClient2.prototype.onResetStore = function(cb) {
    var _this = this;
    this.resetStoreCallbacks.push(cb);
    return function() {
      _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function(c2) {
        return c2 !== cb;
      });
    };
  };
  ApolloClient2.prototype.onClearStore = function(cb) {
    var _this = this;
    this.clearStoreCallbacks.push(cb);
    return function() {
      _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function(c2) {
        return c2 !== cb;
      });
    };
  };
  ApolloClient2.prototype.reFetchObservableQueries = function(includeStandby) {
    return this.queryManager.reFetchObservableQueries(includeStandby);
  };
  ApolloClient2.prototype.refetchQueries = function(options) {
    var map = this.queryManager.refetchQueries(options);
    var queries = [];
    var results = [];
    map.forEach(function(result2, obsQuery) {
      queries.push(obsQuery);
      results.push(result2);
    });
    var result = Promise.all(results);
    result.queries = queries;
    result.results = results;
    result.catch(function(error) {
      __DEV__ && invariant$1.debug("In client.refetchQueries, Promise.all promise rejected with error ".concat(error));
    });
    return result;
  };
  ApolloClient2.prototype.getObservableQueries = function(include) {
    if (include === void 0) {
      include = "active";
    }
    return this.queryManager.getObservableQueries(include);
  };
  ApolloClient2.prototype.extract = function(optimistic) {
    return this.cache.extract(optimistic);
  };
  ApolloClient2.prototype.restore = function(serializedState) {
    return this.cache.restore(serializedState);
  };
  ApolloClient2.prototype.addResolvers = function(resolvers) {
    this.localState.addResolvers(resolvers);
  };
  ApolloClient2.prototype.setResolvers = function(resolvers) {
    this.localState.setResolvers(resolvers);
  };
  ApolloClient2.prototype.getResolvers = function() {
    return this.localState.getResolvers();
  };
  ApolloClient2.prototype.setLocalStateFragmentMatcher = function(fragmentMatcher) {
    this.localState.setFragmentMatcher(fragmentMatcher);
  };
  ApolloClient2.prototype.setLink = function(newLink) {
    this.link = this.queryManager.link = newLink;
  };
  return ApolloClient2;
}();
var docCache = /* @__PURE__ */ new Map();
var fragmentSourceMap = /* @__PURE__ */ new Map();
var printFragmentWarnings = true;
var experimentalFragmentVariables = false;
function normalize$1(string) {
  return string.replace(/[\s,]+/g, " ").trim();
}
function cacheKeyFromLoc(loc) {
  return normalize$1(loc.source.body.substring(loc.start, loc.end));
}
function processFragments(ast) {
  var seenKeys = /* @__PURE__ */ new Set();
  var definitions = [];
  ast.definitions.forEach(function(fragmentDefinition) {
    if (fragmentDefinition.kind === "FragmentDefinition") {
      var fragmentName = fragmentDefinition.name.value;
      var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);
      var sourceKeySet = fragmentSourceMap.get(fragmentName);
      if (sourceKeySet && !sourceKeySet.has(sourceKey)) {
        if (printFragmentWarnings) {
          console.warn("Warning: fragment with name " + fragmentName + " already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
        }
      } else if (!sourceKeySet) {
        fragmentSourceMap.set(fragmentName, sourceKeySet = /* @__PURE__ */ new Set());
      }
      sourceKeySet.add(sourceKey);
      if (!seenKeys.has(sourceKey)) {
        seenKeys.add(sourceKey);
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  });
  return __assign$1(__assign$1({}, ast), { definitions });
}
function stripLoc(doc) {
  var workSet = new Set(doc.definitions);
  workSet.forEach(function(node) {
    if (node.loc)
      delete node.loc;
    Object.keys(node).forEach(function(key) {
      var value = node[key];
      if (value && typeof value === "object") {
        workSet.add(value);
      }
    });
  });
  var loc = doc.loc;
  if (loc) {
    delete loc.startToken;
    delete loc.endToken;
  }
  return doc;
}
function parseDocument(source) {
  var cacheKey = normalize$1(source);
  if (!docCache.has(cacheKey)) {
    var parsed = parse(source, {
      experimentalFragmentVariables,
      allowLegacyFragmentVariables: experimentalFragmentVariables
    });
    if (!parsed || parsed.kind !== "Document") {
      throw new Error("Not a valid GraphQL document.");
    }
    docCache.set(cacheKey, stripLoc(processFragments(parsed)));
  }
  return docCache.get(cacheKey);
}
function gql(literals) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  if (typeof literals === "string") {
    literals = [literals];
  }
  var result = literals[0];
  args.forEach(function(arg, i) {
    if (arg && arg.kind === "Document") {
      result += arg.loc.source.body;
    } else {
      result += arg;
    }
    result += literals[i + 1];
  });
  return parseDocument(result);
}
function resetCaches() {
  docCache.clear();
  fragmentSourceMap.clear();
}
function disableFragmentWarnings() {
  printFragmentWarnings = false;
}
function enableExperimentalFragmentVariables() {
  experimentalFragmentVariables = true;
}
function disableExperimentalFragmentVariables() {
  experimentalFragmentVariables = false;
}
var extras = {
  gql,
  resetCaches,
  disableFragmentWarnings,
  enableExperimentalFragmentVariables,
  disableExperimentalFragmentVariables
};
(function(gql_1) {
  gql_1.gql = extras.gql, gql_1.resetCaches = extras.resetCaches, gql_1.disableFragmentWarnings = extras.disableFragmentWarnings, gql_1.enableExperimentalFragmentVariables = extras.enableExperimentalFragmentVariables, gql_1.disableExperimentalFragmentVariables = extras.disableExperimentalFragmentVariables;
})(gql || (gql = {}));
gql["default"] = gql;
setVerbosity(DEV ? "log" : "silent");
var core = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  setLogVerbosity: setVerbosity,
  ApolloClient,
  mergeOptions,
  ObservableQuery,
  get NetworkStatus() {
    return NetworkStatus;
  },
  isApolloError,
  ApolloError,
  get Cache() {
    return Cache;
  },
  ApolloCache,
  InMemoryCache,
  MissingFieldError,
  defaultDataIdFromObject,
  makeVar,
  fromError,
  toPromise,
  fromPromise,
  throwServerError,
  Observable,
  isReference,
  makeReference,
  get gql() {
    return gql;
  },
  resetCaches,
  disableFragmentWarnings,
  enableExperimentalFragmentVariables,
  disableExperimentalFragmentVariables,
  empty,
  from,
  split,
  concat,
  execute,
  ApolloLink,
  parseAndCheckHttpResponse,
  serializeFetchParameter,
  fallbackHttpConfig,
  defaultPrinter,
  selectHttpOptionsAndBody,
  selectHttpOptionsAndBodyInternal,
  checkFetcher,
  createSignalIfSupported,
  selectURI,
  createHttpLink: createHttpLink$1,
  HttpLink,
  rewriteURIForGET
}, Symbol.toStringTag, { value: "Module" }));
function isValidGql(doc) {
  return !!(doc && typeof doc === "object" && "kind" in doc && "definitions" in doc);
}
class ApolloController {
  constructor(host2, options) {
    __privateAdd(this, _options, void 0);
    __privateAdd(this, _client, void 0);
    __privateAdd(this, _document, void 0);
    var _a2, _b, _c;
    this.host = host2;
    __privateSet(this, _options, {});
    __privateSet(this, _client, null);
    __privateSet(this, _document, null);
    this.called = true;
    this.data = null;
    this.error = null;
    this.errors = [];
    this.loading = false;
    if (host2 instanceof EventTarget)
      this.emitter = host2;
    else if ((options == null ? void 0 : options.hostElement) instanceof EventTarget)
      this.emitter = options.hostElement;
    else
      this.emitter = new EventTarget();
    this.options = options != null ? options : {};
    this.client = (_b = (_a2 = this.options.client) != null ? _a2 : window.__APOLLO_CLIENT__) != null ? _b : null;
    (_c = host2.addController) == null ? void 0 : _c.call(host2, this);
  }
  static o(proto, _2) {
    Object.defineProperty(proto, "options", {
      get() {
        return __privateGet(this, _options);
      },
      set(v2) {
        var _a2;
        __privateSet(this, _options, v2);
        (_a2 = this.optionsChanged) == null ? void 0 : _a2.call(this, v2);
      }
    });
  }
  get client() {
    return __privateGet(this, _client);
  }
  set client(v2) {
    var _a2;
    const client2 = __privateGet(this, _client);
    __privateSet(this, _client, v2);
    (_a2 = this.clientChanged) == null ? void 0 : _a2.call(this, v2);
    this.notify({
      client: client2
    });
  }
  get document() {
    return __privateGet(this, _document);
  }
  set document(document2) {
    var _a2;
    if (document2 === __privateGet(this, _document))
      return;
    else if (!document2)
      __privateSet(this, _document, null);
    else if (!isValidGql(document2)) {
      const name = this.constructor.name.replace(/Apollo(\w+)(Controller|Behavior)/, "$1");
      throw new TypeError(`${name} must be a parsed GraphQL document.`);
    } else {
      __privateSet(this, _document, document2);
      this.notify({
        document: document2
      });
      (_a2 = this.documentChanged) == null ? void 0 : _a2.call(this, document2);
    }
  }
  get variables() {
    var _a2, _b;
    return (_b = (_a2 = this.options) == null ? void 0 : _a2.variables) != null ? _b : null;
  }
  set variables(variables) {
    var _a2;
    if (!variables)
      delete this.options.variables;
    else if (variables === this.options.variables)
      return;
    else
      this.options.variables = variables;
    this.notify({
      variables
    });
    (_a2 = this.variablesChanged) == null ? void 0 : _a2.call(this, variables);
  }
  notify(properties) {
    if (properties && this.host.requestUpdate.length > 0) {
      for (const [key, value] of Object.entries(properties))
        this.host.requestUpdate(key, value);
    } else
      this.host.requestUpdate();
  }
  init(document2) {
    var _a2, _b;
    (_b = this.variables) != null ? _b : this.variables = (_a2 = this.options.variables) != null ? _a2 : null;
    this.document = document2;
  }
  hostConnected() {
    this.emitter.dispatchEvent(new ApolloControllerConnectedEvent(this));
  }
  hostDisconnected() {
    this.emitter.dispatchEvent(new ApolloControllerDisconnectedEvent(this));
    window.dispatchEvent(new ApolloControllerDisconnectedEvent(this));
  }
}
_options = new WeakMap();
_client = new WeakMap();
_document = new WeakMap();
__decorate([ApolloController.o], ApolloController.prototype, "options", void 0);
const configurable = true;
function bound(_2, key, descriptor) {
  if (typeof (descriptor == null ? void 0 : descriptor.value) !== "function")
    throw new TypeError(`Only methods can be decorated with @bound. <${key != null ? key : _2.name}> is not a method!`);
  return {
    configurable,
    get() {
      const value = descriptor.value.bind(this);
      Object.defineProperty(this, key, {
        value,
        configurable,
        writable: true
      });
      return value;
    }
  };
}
class ApolloQueryController extends ApolloController {
  constructor(host2, query, options) {
    super(host2, options);
    __privateAdd(this, _hasDisconnected, void 0);
    __privateAdd(this, _lastQueryDocument, void 0);
    this.networkStatus = NetworkStatus.ready;
    this.partial = false;
    __privateSet(this, _hasDisconnected, false);
    this.init(query != null ? query : null);
  }
  get query() {
    return this.document;
  }
  set query(document2) {
    this.document = document2;
  }
  get canAutoSubscribe() {
    return !!this.client && !!this.document && !this.options.noAutoSubscribe && this.shouldSubscribe();
  }
  hostConnected() {
    super.hostConnected();
    if (__privateGet(this, _hasDisconnected) && this.observableQuery) {
      this.observableQuery.reobserve();
      __privateSet(this, _hasDisconnected, false);
    } else
      this.documentChanged(this.query);
  }
  hostDisconnected() {
    __privateSet(this, _hasDisconnected, true);
    super.hostDisconnected();
  }
  shouldSubscribe(opts) {
    var _a2, _b, _c;
    return (_c = (_b = (_a2 = this.options).shouldSubscribe) == null ? void 0 : _b.call(_a2, opts)) != null ? _c : true;
  }
  canSubscribe(options) {
    var _a2, _b;
    return !((_a2 = this.options.noAutoSubscribe) != null ? _a2 : false) && !!this.client && !!((_b = options == null ? void 0 : options.query) != null ? _b : this.document);
  }
  watchQuery(params) {
    var _a2;
    if (!this.client)
      throw new TypeError("No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/");
    return this.client.watchQuery({
      query: this.query,
      variables: (_a2 = this.variables) != null ? _a2 : void 0,
      context: this.options.context,
      errorPolicy: this.options.errorPolicy,
      fetchPolicy: this.options.fetchPolicy,
      notifyOnNetworkStatusChange: this.options.notifyOnNetworkStatusChange,
      partialRefetch: this.options.partialRefetch,
      pollInterval: this.options.pollInterval,
      returnPartialData: this.options.returnPartialData,
      nextFetchPolicy: this.options.nextFetchPolicy,
      ...params
    });
  }
  nextData(result) {
    var _a2, _b, _c, _d, _e, _f;
    this.emitter.dispatchEvent(new CustomEvent("apollo-query-result", {
      detail: result
    }));
    const {
      data,
      error,
      errors,
      loading: loading2,
      networkStatus,
      partial
    } = this;
    this.data = result.data;
    this.error = (_a2 = result.error) != null ? _a2 : null;
    this.errors = (_b = result.errors) != null ? _b : [];
    this.loading = (_c = result.loading) != null ? _c : false;
    this.networkStatus = result.networkStatus;
    this.partial = (_d = result.partial) != null ? _d : false;
    (_f = (_e = this.options).onData) == null ? void 0 : _f.call(_e, result.data);
    this.notify({
      data,
      error,
      errors,
      loading: loading2,
      networkStatus,
      partial
    });
  }
  nextError(apolloError) {
    var _a2, _b;
    const {
      error,
      loading: loading2
    } = this;
    this.emitter.dispatchEvent(new CustomEvent("apollo-error", {
      detail: apolloError
    }));
    this.error = apolloError;
    this.loading = false;
    (_b = (_a2 = this.options).onError) == null ? void 0 : _b.call(_a2, apolloError);
    this.notify({
      error,
      loading: loading2
    });
  }
  clientChanged() {
    if (this.canSubscribe() && this.shouldSubscribe())
      this.subscribe();
  }
  documentChanged(doc) {
    const query = doc != null ? doc : void 0;
    if (doc === __privateGet(this, _lastQueryDocument))
      return;
    if (this.canSubscribe({
      query
    }) && this.shouldSubscribe({
      query
    }))
      this.subscribe({
        query
      });
  }
  variablesChanged(variables) {
    if (this.observableQuery)
      this.refetch(variables);
    else if (this.canSubscribe({
      variables
    }) && this.shouldSubscribe({
      variables
    }))
      this.subscribe({
        variables
      });
  }
  optionsChanged(options) {
    var _a2, _b;
    (_b = (_a2 = this.observableQuery) == null ? void 0 : _a2.setOptions) == null ? void 0 : _b.call(_a2, options);
  }
  async refetch(variables) {
    if (!this.observableQuery)
      throw new Error("Cannot refetch without an ObservableQuery");
    return this.observableQuery.refetch(variables);
  }
  subscribe(params) {
    var _a2, _b, _c, _d;
    if (this.observableQuery)
      this.observableQuery.stopPolling();
    this.observableQuery = this.watchQuery({
      query: this.query,
      variables: (_a2 = this.variables) != null ? _a2 : void 0,
      context: this.options.context,
      errorPolicy: this.options.errorPolicy,
      fetchPolicy: this.options.fetchPolicy,
      notifyOnNetworkStatusChange: this.options.notifyOnNetworkStatusChange,
      partialRefetch: this.options.partialRefetch,
      pollInterval: this.options.pollInterval,
      refetchWritePolicy: this.options.refetchWritePolicy,
      returnPartialData: this.options.returnPartialData,
      ...params
    });
    __privateSet(this, _lastQueryDocument, (_c = (_b = params == null ? void 0 : params.query) != null ? _b : this.query) != null ? _c : void 0);
    const {
      loading: loading2
    } = this;
    this.loading = true;
    this.notify({
      loading: loading2
    });
    return (_d = this.observableQuery) == null ? void 0 : _d.subscribe({
      next: this.nextData.bind(this),
      error: this.nextError.bind(this)
    });
  }
  subscribeToMore(options) {
    var _a2;
    return (_a2 = this.observableQuery) == null ? void 0 : _a2.subscribeToMore(options);
  }
  async executeQuery(params) {
    try {
      if (!this.client)
        throw new TypeError("No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/");
      const {
        loading: loading2
      } = this;
      this.loading = true;
      this.notify({
        loading: loading2
      });
      const result = await this.client.query({
        query: this.query,
        variables: this.variables,
        context: this.options.context,
        errorPolicy: this.options.errorPolicy,
        fetchPolicy: this.options.fetchPolicy === "cache-and-network" ? void 0 : this.options.fetchPolicy,
        notifyOnNetworkStatusChange: this.options.notifyOnNetworkStatusChange,
        partialRefetch: this.options.partialRefetch,
        returnPartialData: this.options.returnPartialData,
        ...params
      });
      if (result)
        this.nextData(result);
      return result;
    } catch (error) {
      this.nextError(error);
      throw error;
    }
  }
  async fetchMore(params) {
    var _a2, _b, _c;
    const {
      loading: loading2
    } = this;
    this.loading = true;
    this.notify({
      loading: loading2
    });
    const options = {
      query: this.query,
      context: this.options.context,
      variables: (_a2 = this.variables) != null ? _a2 : void 0,
      ...params
    };
    (_b = options.variables) != null ? _b : options.variables = void 0;
    (_c = this.observableQuery) != null ? _c : this.observableQuery = this.watchQuery(options);
    return this.observableQuery.fetchMore(options).then((x2) => {
      const {
        loading: loading3
      } = this;
      this.loading = false;
      this.notify({
        loading: loading3
      });
      return x2;
    });
  }
  startPolling(ms) {
    this.pollingInterval = window.setInterval(() => {
      this.refetch();
    }, ms);
  }
  stopPolling() {
    clearInterval(this.pollingInterval);
  }
}
_hasDisconnected = new WeakMap();
_lastQueryDocument = new WeakMap();
__decorate([bound], ApolloQueryController.prototype, "watchQuery", null);
__decorate([bound], ApolloQueryController.prototype, "refetch", null);
__decorate([bound], ApolloQueryController.prototype, "subscribe", null);
__decorate([bound], ApolloQueryController.prototype, "subscribeToMore", null);
__decorate([bound], ApolloQueryController.prototype, "executeQuery", null);
__decorate([bound], ApolloQueryController.prototype, "fetchMore", null);
__decorate([bound], ApolloQueryController.prototype, "startPolling", null);
__decorate([bound], ApolloQueryController.prototype, "stopPolling", null);
class ApolloQuery extends ApolloElement {
  constructor() {
    super(...arguments);
    this.controller = new ApolloQueryController(this, null, {
      shouldSubscribe: (options) => this.readyToReceiveDocument && this.shouldSubscribe(options),
      onData: (data) => {
        var _a2;
        return (_a2 = this.onData) == null ? void 0 : _a2.call(this, data);
      },
      onError: (error) => {
        var _a2;
        return (_a2 = this.onError) == null ? void 0 : _a2.call(this, error);
      }
    });
    this.canAutoSubscribe = false;
    this.networkStatus = NetworkStatus.ready;
    this.query = null;
    this.partial = false;
    this.noAutoSubscribe = false;
  }
  shouldSubscribe(options) {
    return true;
  }
  get options() {
    return this.controller.options;
  }
  set options(v2) {
    const {
      onData,
      onError,
      shouldSubscribe
    } = this.controller.options;
    this.controller.options = {
      onData,
      onError,
      shouldSubscribe,
      ...v2
    };
  }
  async refetch(variables) {
    return this.controller.refetch(variables);
  }
  subscribe(params) {
    return this.controller.subscribe(params);
  }
  subscribeToMore(options) {
    return this.controller.subscribeToMore(options);
  }
  async executeQuery(params) {
    return this.controller.executeQuery(params);
  }
  async fetchMore(params) {
    return this.controller.fetchMore(params);
  }
  startPolling(ms) {
    return this.controller.startPolling(ms);
  }
  stopPolling() {
    return this.controller.stopPolling();
  }
}
__decorate([controlled({
  readonly: true
}), t$1()], ApolloQuery.prototype, "canAutoSubscribe", void 0);
__decorate([controlled(), t$1()], ApolloQuery.prototype, "networkStatus", void 0);
__decorate([controlled(), t$1()], ApolloQuery.prototype, "query", void 0);
__decorate([controlled(), t$1()], ApolloQuery.prototype, "partial", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  type: Boolean,
  attribute: "partial-refetch"
})], ApolloQuery.prototype, "partialRefetch", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  type: Number,
  attribute: "poll-interval"
})], ApolloQuery.prototype, "pollInterval", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  type: Boolean,
  attribute: "return-partial-data"
})], ApolloQuery.prototype, "returnPartialData", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  type: Boolean,
  attribute: "no-auto-subscribe",
  reflect: true
})], ApolloQuery.prototype, "noAutoSubscribe", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  type: Boolean,
  attribute: "notify-on-network-status-change"
})], ApolloQuery.prototype, "notifyOnNetworkStatusChange", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  attribute: "error-policy"
})], ApolloQuery.prototype, "errorPolicy", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  attribute: "fetch-policy"
})], ApolloQuery.prototype, "fetchPolicy", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  attribute: "next-fetch-policy"
})], ApolloQuery.prototype, "nextFetchPolicy", void 0);
class ApolloMutationController extends ApolloController {
  constructor(host2, mutation, options) {
    super(host2, options);
    this.mostRecentMutationId = 0;
    this.called = false;
    this.init(mutation != null ? mutation : null);
  }
  get mutation() {
    return this.document;
  }
  set mutation(document2) {
    this.document = document2;
  }
  async mutate(params) {
    var _a2, _b;
    if (!this.client)
      throw new TypeError("No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/");
    const mutationId = this.generateMutationId();
    const {
      called = false,
      data,
      error,
      errors,
      loading: loading2
    } = this;
    this.loading = true;
    this.called = true;
    this.error = null;
    this.errors = [];
    this.data = null;
    this.notify({
      called,
      data,
      error,
      errors,
      loading: loading2
    });
    return this.client.mutate({
      mutation: this.mutation,
      awaitRefetchQueries: this.options.awaitRefetchQueries,
      context: this.options.context,
      errorPolicy: this.options.errorPolicy,
      fetchPolicy: this.options.fetchPolicy,
      optimisticResponse: this.options.optimisticResponse,
      refetchQueries: (_a2 = this.options.refetchQueries) != null ? _a2 : void 0,
      update: this.options.update,
      variables: (_b = this.variables) != null ? _b : void 0,
      ...params
    }).then(this.onCompletedMutation.bind(this, mutationId)).catch(this.onMutationError.bind(this, mutationId));
  }
  generateMutationId() {
    this.mostRecentMutationId += 1;
    return this.mostRecentMutationId;
  }
  isMostRecentMutation(mutationId) {
    return this.mostRecentMutationId === mutationId;
  }
  onCompletedMutation(mutationId, response) {
    var _a2, _b, _c, _d;
    const {
      data,
      error,
      errors,
      loading: loading2
    } = this;
    this.emitter.dispatchEvent(new CustomEvent("apollo-mutation-result", {
      detail: response
    }));
    if (this.isMostRecentMutation(mutationId)) {
      this.loading = false;
      if (!this.options.ignoreResults) {
        this.error = null;
        this.data = (_a2 = response.data) != null ? _a2 : null;
        this.errors = (_b = response.errors) != null ? _b : [];
        (_d = (_c = this.options).onCompleted) == null ? void 0 : _d.call(_c, this.data);
      }
      this.notify({
        data,
        error,
        errors,
        loading: loading2
      });
    }
    return response;
  }
  onMutationError(mutationId, apolloError) {
    var _a2, _b;
    this.emitter.dispatchEvent(new CustomEvent("apollo-error", {
      detail: apolloError
    }));
    const {
      data,
      error,
      loading: loading2
    } = this;
    if (this.isMostRecentMutation(mutationId)) {
      this.loading = false;
      this.data = null;
      this.error = apolloError;
    }
    (_b = (_a2 = this.options).onError) == null ? void 0 : _b.call(_a2, apolloError);
    this.notify({
      data,
      error,
      loading: loading2
    });
    throw apolloError;
  }
}
__decorate([bound], ApolloMutationController.prototype, "mutate", null);
class ApolloMutation extends ApolloElement {
  constructor() {
    super(...arguments);
    this.controller = new ApolloMutationController(this, null, {
      onCompleted: (data) => {
        var _a2;
        return (_a2 = this.onCompleted) == null ? void 0 : _a2.call(this, data);
      },
      onError: (error) => {
        var _a2;
        return (_a2 = this.onError) == null ? void 0 : _a2.call(this, error);
      }
    });
    this.called = false;
    this.mutation = null;
    this.ignoreResults = false;
    this.refetchQueries = null;
  }
  mutate(params) {
    var _a2;
    return this.controller.mutate({
      ...params,
      update: (_a2 = params == null ? void 0 : params.update) != null ? _a2 : this.updater
    });
  }
}
__decorate([controlled(), e$2({
  type: Boolean,
  reflect: true
})], ApolloMutation.prototype, "called", void 0);
__decorate([controlled(), t$1()], ApolloMutation.prototype, "mutation", void 0);
__decorate([controlled({
  path: "options"
}), t$1()], ApolloMutation.prototype, "optimisticResponse", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  attribute: "ignore-results",
  type: Boolean
})], ApolloMutation.prototype, "ignoreResults", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  attribute: "await-refetch-queries",
  type: Boolean
})], ApolloMutation.prototype, "awaitRefetchQueries", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  attribute: "error-policy"
})], ApolloMutation.prototype, "errorPolicy", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  attribute: "fetch-policy"
})], ApolloMutation.prototype, "fetchPolicy", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  attribute: "refetch-queries",
  converter: {
    fromAttribute(newVal) {
      return !newVal ? null : newVal.split(",").map((x2) => x2.trim());
    }
  }
})], ApolloMutation.prototype, "refetchQueries", void 0);
class ApolloSubscriptionController extends ApolloController {
  constructor(host2, subscription, options) {
    super(host2, options);
    __privateAdd(this, _hasDisconnected2, void 0);
    __privateAdd(this, _lastSubscriptionDocument, void 0);
    __privateSet(this, _hasDisconnected2, false);
    this.init(subscription != null ? subscription : null);
  }
  get subscription() {
    return this.document;
  }
  set subscription(document2) {
    this.document = document2;
  }
  get canAutoSubscribe() {
    return !!this.client && !this.options.noAutoSubscribe && this.shouldSubscribe();
  }
  hostConnected() {
    super.hostConnected();
    if (__privateGet(this, _hasDisconnected2) && this.observableSubscription)
      this.subscribe();
    else
      this.documentChanged(this.subscription);
  }
  hostDisconnected() {
    this.endSubscription();
    __privateSet(this, _hasDisconnected2, true);
    super.hostDisconnected();
  }
  canSubscribe(options) {
    var _a2;
    return !this.options.noAutoSubscribe && !!this.client && (!this.observable || !!this.options.shouldResubscribe) && !!((_a2 = options == null ? void 0 : options.query) != null ? _a2 : this.subscription);
  }
  initObservable(params) {
    var _a2;
    const {
      shouldResubscribe = this.options.shouldResubscribe,
      client: client2 = this.client,
      skip = this.options.skip,
      ...rest
    } = params != null ? params : {};
    if (!client2)
      throw new TypeError("No Apollo client. See https://apolloelements.dev/guides/getting-started/apollo-client/");
    if (this.observable && !shouldResubscribe || skip)
      return;
    const query = (_a2 = params == null ? void 0 : params.subscription) != null ? _a2 : this.subscription;
    __privateSet(this, _lastSubscriptionDocument, query);
    this.observable = client2.subscribe({
      variables: this.variables,
      context: this.options.context,
      errorPolicy: this.options.errorPolicy,
      fetchPolicy: this.options.fetchPolicy,
      ...rest,
      query
    });
  }
  nextData(result) {
    var _a2, _b, _c, _d, _e;
    const {
      data,
      error,
      errors,
      loading: loading2
    } = this;
    const client2 = this.client;
    const subscriptionData = {
      data: (_a2 = result == null ? void 0 : result.data) != null ? _a2 : null,
      loading: false,
      error: null
    };
    const detail = {
      client: client2,
      subscriptionData
    };
    this.emitter.dispatchEvent(new CustomEvent("apollo-subscription-result", {
      detail
    }));
    this.data = (_b = result == null ? void 0 : result.data) != null ? _b : null;
    this.error = null;
    this.errors = (_c = result == null ? void 0 : result.errors) != null ? _c : [];
    this.loading = false;
    (_e = (_d = this.options).onData) == null ? void 0 : _e.call(_d, detail);
    this.notify({
      data,
      error,
      errors,
      loading: loading2
    });
  }
  nextError(apolloError) {
    var _a2, _b;
    const {
      error,
      loading: loading2
    } = this;
    this.emitter.dispatchEvent(new CustomEvent("apollo-error", {
      detail: apolloError
    }));
    this.error = apolloError;
    this.loading = false;
    (_b = (_a2 = this.options).onError) == null ? void 0 : _b.call(_a2, apolloError);
    this.notify({
      error,
      loading: loading2
    });
  }
  onComplete() {
    var _a2, _b;
    const {
      data,
      error,
      loading: loading2
    } = this;
    (_b = (_a2 = this.options).onComplete) == null ? void 0 : _b.call(_a2);
    this.endSubscription();
    this.notify({
      data,
      error,
      loading: loading2
    });
  }
  endSubscription() {
    if (this.observableSubscription)
      this.observableSubscription.unsubscribe();
  }
  shouldSubscribe(opts) {
    var _a2, _b, _c;
    return (_c = (_b = (_a2 = this.options).shouldSubscribe) == null ? void 0 : _b.call(_a2, opts)) != null ? _c : true;
  }
  clientChanged() {
    if (this.canSubscribe() && this.shouldSubscribe())
      this.subscribe();
  }
  documentChanged(doc) {
    const query = doc != null ? doc : void 0;
    if (doc === __privateGet(this, _lastSubscriptionDocument))
      return;
    this.cancel();
    if (this.canSubscribe({
      query
    }) && this.shouldSubscribe({
      query
    }))
      this.subscribe();
  }
  variablesChanged(variables) {
    this.cancel();
    if (this.canSubscribe({
      variables
    }) && this.shouldSubscribe({
      variables
    }))
      this.subscribe();
  }
  subscribe(params) {
    var _a2, _b;
    this.initObservable(params);
    const shouldResubscribe = (_a2 = params == null ? void 0 : params.shouldResubscribe) != null ? _a2 : this.options.shouldResubscribe;
    if (this.observableSubscription && !shouldResubscribe)
      return;
    const {
      loading: loading2
    } = this;
    this.loading = true;
    this.notify({
      loading: loading2
    });
    this.observableSubscription = (_b = this.observable) == null ? void 0 : _b.subscribe({
      next: this.nextData.bind(this),
      error: this.nextError.bind(this),
      complete: this.onComplete.bind(this)
    });
  }
  cancel() {
    this.endSubscription();
    this.observableSubscription = void 0;
    this.observable = void 0;
  }
}
_hasDisconnected2 = new WeakMap();
_lastSubscriptionDocument = new WeakMap();
__decorate([bound], ApolloSubscriptionController.prototype, "subscribe", null);
__decorate([bound], ApolloSubscriptionController.prototype, "cancel", null);
const _ApolloSubscription = class extends ApolloElement {
  constructor() {
    super(...arguments);
    this.controller = new ApolloSubscriptionController(this, null, {
      shouldSubscribe: (x2) => this.readyToReceiveDocument && this.shouldSubscribe(x2),
      onData: (data) => {
        var _a2;
        return (_a2 = this.onSubscriptionData) == null ? void 0 : _a2.call(this, data);
      },
      onComplete: () => {
        var _a2;
        return (_a2 = this.onSubscriptionComplete) == null ? void 0 : _a2.call(this);
      },
      onError: (error) => {
        var _a2;
        return (_a2 = this.onError) == null ? void 0 : _a2.call(this, error);
      }
    });
    this.subscription = null;
    this.noAutoSubscribe = false;
    this.shouldResubscribe = false;
    this.skip = false;
  }
  get canAutoSubscribe() {
    var _a2, _b;
    return (_b = (_a2 = this.controller) == null ? void 0 : _a2.canAutoSubscribe) != null ? _b : false;
  }
  subscribe(...args) {
    return this.controller.subscribe(...args);
  }
  cancel() {
    return this.controller.cancel();
  }
  shouldSubscribe(options) {
    return true;
  }
};
let ApolloSubscription = _ApolloSubscription;
__4 = new WeakMap();
__privateAdd(ApolloSubscription, __4, _ApolloSubscription.is = "apollo-subscription");
__decorate([controlled(), t$1()], ApolloSubscription.prototype, "subscription", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  type: Boolean,
  attribute: "no-auto-subscribe"
})], ApolloSubscription.prototype, "noAutoSubscribe", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  type: Boolean,
  attribute: "notify-on-network-status-change"
})], ApolloSubscription.prototype, "notifyOnNetworkStatusChange", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  type: Boolean,
  attribute: "should-resubscribe"
})], ApolloSubscription.prototype, "shouldResubscribe", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  type: Boolean,
  attribute: "skip"
})], ApolloSubscription.prototype, "skip", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  attribute: "error-policy"
})], ApolloSubscription.prototype, "errorPolicy", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  attribute: "fetch-policy"
})], ApolloSubscription.prototype, "fetchPolicy", void 0);
__decorate([controlled({
  path: "options"
}), e$2({
  type: Number,
  attribute: "poll-interval"
})], ApolloSubscription.prototype, "pollInterval", void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const isStrTagged = (val) => typeof val !== "string" && "strTag" in val;
const joinStringsAndValues = (strings, values, valueOrder) => {
  let concat2 = strings[0];
  for (let i = 1; i < strings.length; i++) {
    concat2 += values[valueOrder ? valueOrder[i - 1] : i - 1];
    concat2 += strings[i];
  }
  return concat2;
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const defaultMsg = (template) => isStrTagged(template) ? joinStringsAndValues(template.strings, template.values) : template;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const LOCALE_STATUS_EVENT = "lit-localize-status";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class LocalizeController {
  constructor(host2) {
    this.__litLocalizeEventHandler = (event) => {
      if (event.detail.status === "ready") {
        this.host.requestUpdate();
      }
    };
    this.host = host2;
  }
  hostConnected() {
    window.addEventListener(LOCALE_STATUS_EVENT, this.__litLocalizeEventHandler);
  }
  hostDisconnected() {
    window.removeEventListener(LOCALE_STATUS_EVENT, this.__litLocalizeEventHandler);
  }
}
const _updateWhenLocaleChanges = (host2) => host2.addController(new LocalizeController(host2));
const updateWhenLocaleChanges = _updateWhenLocaleChanges;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _localized = () => (classOrDescriptor) => typeof classOrDescriptor === "function" ? legacyLocalized(classOrDescriptor) : standardLocalized(classOrDescriptor);
const localized = _localized;
const standardLocalized = ({ kind, elements }) => {
  return {
    kind,
    elements,
    finisher(clazz) {
      clazz.addInitializer(updateWhenLocaleChanges);
    }
  };
};
const legacyLocalized = (clazz) => {
  clazz.addInitializer(updateWhenLocaleChanges);
  return clazz;
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Deferred {
  constructor() {
    this.settled = false;
    this.promise = new Promise((resolve4, reject) => {
      this._resolve = resolve4;
      this._reject = reject;
    });
  }
  resolve(value) {
    this.settled = true;
    this._resolve(value);
  }
  reject(error) {
    this.settled = true;
    this._reject(error);
  }
}
/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */
const hl = [];
for (let i = 0; i < 256; i++) {
  hl[i] = (i >> 4 & 15).toString(16) + (i & 15).toString(16);
}
function fnv1a64(str) {
  let t0 = 0, v0 = 8997, t1 = 0, v1 = 33826, t2 = 0, v2 = 40164, t3 = 0, v3 = 52210;
  for (let i = 0; i < str.length; i++) {
    v0 ^= str.charCodeAt(i);
    t0 = v0 * 435;
    t1 = v1 * 435;
    t2 = v2 * 435;
    t3 = v3 * 435;
    t2 += v0 << 8;
    t3 += v1 << 8;
    t1 += t0 >>> 16;
    v0 = t0 & 65535;
    t2 += t1 >>> 16;
    v1 = t1 & 65535;
    v3 = t3 + (t2 >>> 16) & 65535;
    v2 = t2 & 65535;
  }
  return hl[v3 >> 8] + hl[v3 & 255] + hl[v2 >> 8] + hl[v2 & 255] + hl[v1 >> 8] + hl[v1 & 255] + hl[v0 >> 8] + hl[v0 & 255];
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const HASH_DELIMITER = "";
const HTML_PREFIX = "h";
const STRING_PREFIX = "s";
function generateMsgId(strings, isHtmlTagged) {
  return (isHtmlTagged ? HTML_PREFIX : STRING_PREFIX) + fnv1a64(typeof strings === "string" ? strings : strings.join(HASH_DELIMITER));
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const expressionOrders = /* @__PURE__ */ new WeakMap();
const hashCache = /* @__PURE__ */ new Map();
function runtimeMsg(templates2, template, options) {
  var _a2;
  if (templates2) {
    const id = (_a2 = options === null || options === void 0 ? void 0 : options.id) !== null && _a2 !== void 0 ? _a2 : generateId(template);
    const localized2 = templates2[id];
    if (localized2) {
      if (typeof localized2 === "string") {
        return localized2;
      } else if ("strTag" in localized2) {
        return joinStringsAndValues(
          localized2.strings,
          template.values,
          localized2.values
        );
      } else {
        let order = expressionOrders.get(localized2);
        if (order === void 0) {
          order = localized2.values;
          expressionOrders.set(localized2, order);
        }
        return {
          ...localized2,
          values: order.map((i) => template.values[i])
        };
      }
    }
  }
  return defaultMsg(template);
}
function generateId(template) {
  const strings = typeof template === "string" ? template : template.strings;
  let id = hashCache.get(strings);
  if (id === void 0) {
    id = generateMsgId(strings, typeof template !== "string" && !("strTag" in template));
    hashCache.set(strings, id);
  }
  return id;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function dispatchStatusEvent(detail) {
  window.dispatchEvent(new CustomEvent(LOCALE_STATUS_EVENT, { detail }));
}
let activeLocale = "";
let loadingLocale;
let sourceLocale$1;
let validLocales;
let loadLocale;
let templates$1;
let loading = new Deferred();
loading.resolve();
let requestId = 0;
const configureLocalization = (config) => {
  _installMsgImplementation((template, options) => runtimeMsg(templates$1, template, options));
  activeLocale = sourceLocale$1 = config.sourceLocale;
  validLocales = new Set(config.targetLocales);
  validLocales.add(config.sourceLocale);
  loadLocale = config.loadLocale;
  return { getLocale: getLocale$1, setLocale: setLocale$1 };
};
const getLocale$1 = () => {
  return activeLocale;
};
const setLocale$1 = (newLocale) => {
  if (newLocale === (loadingLocale !== null && loadingLocale !== void 0 ? loadingLocale : activeLocale)) {
    return loading.promise;
  }
  if (!validLocales || !loadLocale) {
    throw new Error("Internal error");
  }
  if (!validLocales.has(newLocale)) {
    throw new Error("Invalid locale code");
  }
  requestId++;
  const thisRequestId = requestId;
  loadingLocale = newLocale;
  if (loading.settled) {
    loading = new Deferred();
  }
  dispatchStatusEvent({ status: "loading", loadingLocale: newLocale });
  const localePromise = newLocale === sourceLocale$1 ? Promise.resolve({ templates: void 0 }) : loadLocale(newLocale);
  localePromise.then((mod) => {
    if (requestId === thisRequestId) {
      activeLocale = newLocale;
      loadingLocale = void 0;
      templates$1 = mod.templates;
      dispatchStatusEvent({ status: "ready", readyLocale: newLocale });
      loading.resolve();
    }
  }, (err) => {
    if (requestId === thisRequestId) {
      dispatchStatusEvent({
        status: "error",
        errorLocale: newLocale,
        errorMessage: err.toString()
      });
      loading.reject(err);
    }
  });
  return loading.promise;
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let msg = defaultMsg;
let installed = false;
function _installMsgImplementation(impl) {
  if (installed) {
    throw new Error("lit-localize can only be configured once");
  }
  msg = impl;
  installed = true;
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i$2 {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$1 = e$1(class extends i$2 {
  constructor(t$12) {
    var e2;
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "style" !== t$12.name || (null === (e2 = t$12.strings) || void 0 === e2 ? void 0 : e2.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce((e2, r2) => {
      const s2 = t2[r2];
      return null == s2 ? e2 : e2 + `${r2 = r2.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s2};`;
    }, "");
  }
  update(e2, [r2]) {
    const { style: s2 } = e2.element;
    if (void 0 === this.vt) {
      this.vt = /* @__PURE__ */ new Set();
      for (const t2 in r2)
        this.vt.add(t2);
      return this.render(r2);
    }
    this.vt.forEach((t2) => {
      null == r2[t2] && (this.vt.delete(t2), t2.includes("-") ? s2.removeProperty(t2) : s2[t2] = "");
    });
    for (const t2 in r2) {
      const e3 = r2[t2];
      null != e3 && (this.vt.add(t2), t2.includes("-") ? s2.setProperty(t2, e3) : s2[t2] = e3);
    }
    return x;
  }
});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class e extends i$2 {
  constructor(i) {
    if (super(i), this.it = b, i.type !== t.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r2) {
    if (r2 === b || null == r2)
      return this._t = void 0, this.it = r2;
    if (r2 === x)
      return r2;
    if ("string" != typeof r2)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r2 === this.it)
      return this._t;
    this.it = r2;
    const s2 = [r2];
    return s2.raw = s2, this._t = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
  }
}
e.directiveName = "unsafeHTML", e.resultType = 1;
const o = e$1(e);
const bellStyles = i$5`
  .bell {
    cursor: pointer;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
  }

  .bell-counter {
    position: absolute;
    top: 0%;
    left: 55%;
    font-size: 0.55rem;
    border-radius: 45%;
    height: 0.8rem;
    min-width: 0.7rem;
    padding: 0px 1.5px;
    background-color: red;
    color: #FFFFFF;
    text-align: center;
    line-height: 0.8rem;
  }

  .bell-counter:empty {
    display: none;
  }

  .popup {
    position: absolute;
    z-index: 1000;
  }

  .container {
    width: 400px;
    height: 400px;
    font-size: 1rem;
    position: absolute;
    padding-bottom: 20px;
    border-radius: 1%;
    border: 1px solid rgb(0,0,0,0.1);
    background-color: #F6FAFD;
    font-size: 14px;
    line-height: 17px;
    font-weight: 300;
    font-family: Verdana, geneva, sans-serif;
    right: 0;
    text-align: initial;
    margin-right: -12px;
    margin-top: 5px;
  }

  .close {
    display: none;
  }

  .open {
    display: block;
  }

  .header {
    padding: 17px 17px 13px;
    border-bottom: 1px solid #bbb;
    margin: 0px 10px;
  }

  .header-title {
    color: #444C60;
    font-weight: bold;
  }

  .header-link {
    color: rgb(1, 73, 149);
    float: right;
    cursor: pointer;
  }

  .items-list {
    height: 370px;
    position: absolute;
    overflow-y: scroll;
    width: 100%;
  }

  .items-list .item:not(:first-child):before {
    border-top: 1px solid #bbb;
    content: '';
    display: block;
    position: relative;
  }

  .item {
    padding: 0px 18px 12px 18px;
    position: relative;
    cursor: pointer;
  }

  .item:hover {
    background: #f1f4f6;
  }

  .item-text-primary {
    font-size: 14px;
    line-height: 1.2em;
    color: #444C60;
    vertical-align: top;
    padding: 12px 20px 0px 8px;
    min-height: 20px;
  }

  .item-text-secondary {
    padding: 5px 10px 0px 8px;
    color: #757C85;
    font-size: 13px;
  }

  @keyframes pulsing {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 152, 214, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 7px rgba(0, 152, 214, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 152, 214, 0);
    }
  }

  .item-unread {
    position: absolute;
    right: 20px;
    top: 50%;
    width: 5px;
    height: 5px;
    border: 1px solid #0098D6;
    border-radius: 50%;
    transform: scale(1);
    animation: pulsing 2s infinite;
    background: rgba(0, 152, 214, 1);
  }

  .status {
    padding: 30px 10px 10px 10px;
    text-align: center;
    color: #444C60;
  }

  .error {
    padding: 30px 10px 10px 10px;
    text-align: center;
    color: red;
  }

  .loader-container {
    justify-content: center;
    display: flex;
    padding: 2rem 5%;
  }

  .loader {
    position: relative;
    left: -9999px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #0098D6;
    color: #0098D6;
    box-shadow: 9999px 0 0 -5px #0098D6;
    animation: loading 1.5s infinite linear;
    animation-delay: .25s;
  }

  .loader::before, .loader::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #0098D6;
    color: #0098D6;
  }

  .loader::before {
    box-shadow: 9984px 0 0 -5px #0098D6;
    animation: loadingBefore 1.5s infinite linear;
    animation-delay: 0s;
  }

  .loader::after {
    box-shadow: 10014px 0 0 -5px #0098D6;
    animation: loadingAfter 1.5s infinite linear;
    animation-delay: .5s;
  }

  @keyframes loadingBefore {
    0% {
      box-shadow: 9984px 0 0 -5px #0098D6;
    }
    30% {
      box-shadow: 9984px 0 0 2px #0098D6;
    }
    60%,
    100% {
      box-shadow: 9984px 0 0 -5px #0098D6;
    }
  }

  @keyframes loading {
    0% {
      box-shadow: 9999px 0 0 -5px #0098D6;
    }
    30% {
      box-shadow: 9999px 0 0 2px #0098D6;
    }
    60%,
    100% {
      box-shadow: 9999px 0 0 -5px #0098D6;
    }
  }

  @keyframes loadingAfter {
    0% {
      box-shadow: 10014px 0 0 -5px #0098D6;
    }
    30% {
      box-shadow: 10014px 0 0 2px #0098D6;
    }
    60%,
    100% {
      box-shadow: 10014px 0 0 -5px #0098D6;
    }
  }
`;
function isLikeCloseEvent$1(val) {
  return isNonNullObject(val) && "code" in val && "reason" in val;
}
var GraphQLWsLink = function(_super) {
  __extends$1(GraphQLWsLink2, _super);
  function GraphQLWsLink2(client2) {
    var _this = _super.call(this) || this;
    _this.client = client2;
    return _this;
  }
  GraphQLWsLink2.prototype.request = function(operation) {
    var _this = this;
    return new Observable(function(observer) {
      return _this.client.subscribe(__assign$1(__assign$1({}, operation), { query: print(operation.query) }), {
        next: observer.next.bind(observer),
        complete: observer.complete.bind(observer),
        error: function(err) {
          if (err instanceof Error) {
            return observer.error(err);
          }
          if (isLikeCloseEvent$1(err)) {
            return observer.error(new Error("Socket closed with event ".concat(err.code, " ").concat(err.reason || "")));
          }
          return observer.error(new ApolloError({
            graphQLErrors: Array.isArray(err) ? err : [err]
          }));
        }
      });
    });
  };
  return GraphQLWsLink2;
}(ApolloLink);
function extendedTypeof(val) {
  if (val === null) {
    return "null";
  }
  if (Array.isArray(val)) {
    return "array";
  }
  return typeof val;
}
function isObject(val) {
  return extendedTypeof(val) === "object";
}
function areGraphQLErrors(obj) {
  return Array.isArray(obj) && obj.length > 0 && obj.every((ob) => "message" in ob);
}
function limitCloseReason(reason, whenTooLong) {
  return reason.length < 124 ? reason : whenTooLong;
}
const GRAPHQL_TRANSPORT_WS_PROTOCOL = "graphql-transport-ws";
var CloseCode;
(function(CloseCode2) {
  CloseCode2[CloseCode2["InternalServerError"] = 4500] = "InternalServerError";
  CloseCode2[CloseCode2["InternalClientError"] = 4005] = "InternalClientError";
  CloseCode2[CloseCode2["BadRequest"] = 4400] = "BadRequest";
  CloseCode2[CloseCode2["BadResponse"] = 4004] = "BadResponse";
  CloseCode2[CloseCode2["Unauthorized"] = 4401] = "Unauthorized";
  CloseCode2[CloseCode2["Forbidden"] = 4403] = "Forbidden";
  CloseCode2[CloseCode2["SubprotocolNotAcceptable"] = 4406] = "SubprotocolNotAcceptable";
  CloseCode2[CloseCode2["ConnectionInitialisationTimeout"] = 4408] = "ConnectionInitialisationTimeout";
  CloseCode2[CloseCode2["ConnectionAcknowledgementTimeout"] = 4504] = "ConnectionAcknowledgementTimeout";
  CloseCode2[CloseCode2["SubscriberAlreadyExists"] = 4409] = "SubscriberAlreadyExists";
  CloseCode2[CloseCode2["TooManyInitialisationRequests"] = 4429] = "TooManyInitialisationRequests";
})(CloseCode || (CloseCode = {}));
var MessageType;
(function(MessageType2) {
  MessageType2["ConnectionInit"] = "connection_init";
  MessageType2["ConnectionAck"] = "connection_ack";
  MessageType2["Ping"] = "ping";
  MessageType2["Pong"] = "pong";
  MessageType2["Subscribe"] = "subscribe";
  MessageType2["Next"] = "next";
  MessageType2["Error"] = "error";
  MessageType2["Complete"] = "complete";
})(MessageType || (MessageType = {}));
function validateMessage(val) {
  if (!isObject(val)) {
    throw new Error(`Message is expected to be an object, but got ${extendedTypeof(val)}`);
  }
  if (!val.type) {
    throw new Error(`Message is missing the 'type' property`);
  }
  if (typeof val.type !== "string") {
    throw new Error(`Message is expects the 'type' property to be a string, but got ${extendedTypeof(val.type)}`);
  }
  switch (val.type) {
    case MessageType.ConnectionInit:
    case MessageType.ConnectionAck:
    case MessageType.Ping:
    case MessageType.Pong: {
      if ("payload" in val && !isObject(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an object or missing, but got "${val.payload}"`);
      }
      break;
    }
    case MessageType.Subscribe: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      if (!isObject(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(val.payload)}`);
      }
      if (typeof val.payload.query !== "string") {
        throw new Error(`"${val.type}" message payload expects the 'query' property to be a string, but got ${extendedTypeof(val.payload.query)}`);
      }
      if (val.payload.variables != null && !isObject(val.payload.variables)) {
        throw new Error(`"${val.type}" message payload expects the 'variables' property to be a an object or nullish or missing, but got ${extendedTypeof(val.payload.variables)}`);
      }
      if (val.payload.operationName != null && extendedTypeof(val.payload.operationName) !== "string") {
        throw new Error(`"${val.type}" message payload expects the 'operationName' property to be a string or nullish or missing, but got ${extendedTypeof(val.payload.operationName)}`);
      }
      if (val.payload.extensions != null && !isObject(val.payload.extensions)) {
        throw new Error(`"${val.type}" message payload expects the 'extensions' property to be a an object or nullish or missing, but got ${extendedTypeof(val.payload.extensions)}`);
      }
      break;
    }
    case MessageType.Next: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      if (!isObject(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(val.payload)}`);
      }
      break;
    }
    case MessageType.Error: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      if (!areGraphQLErrors(val.payload)) {
        throw new Error(`"${val.type}" message expects the 'payload' property to be an array of GraphQL errors, but got ${JSON.stringify(val.payload)}`);
      }
      break;
    }
    case MessageType.Complete: {
      if (typeof val.id !== "string") {
        throw new Error(`"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(val.id)}`);
      }
      if (!val.id) {
        throw new Error(`"${val.type}" message requires a non-empty 'id' property`);
      }
      break;
    }
    default:
      throw new Error(`Invalid message 'type' property "${val.type}"`);
  }
  return val;
}
function parseMessage(data, reviver) {
  try {
    return validateMessage(data);
  } catch (_a2) {
    if (typeof data !== "string") {
      throw new Error("Only strings are parsable messages");
    }
    const message = JSON.parse(data, reviver);
    return validateMessage(message);
  }
}
function stringifyMessage(msg2, replacer) {
  validateMessage(msg2);
  return JSON.stringify(msg2, replacer);
}
function createClient(options) {
  const {
    url,
    connectionParams,
    lazy = true,
    onNonLazyError = console.error,
    lazyCloseTimeout: lazyCloseTimeoutMs = 0,
    keepAlive = 0,
    disablePong,
    connectionAckWaitTimeout = 0,
    retryAttempts = 5,
    retryWait = async function randomisedExponentialBackoff(retries2) {
      let retryDelay = 1e3;
      for (let i = 0; i < retries2; i++) {
        retryDelay *= 2;
      }
      await new Promise((resolve4) => setTimeout(resolve4, retryDelay + Math.floor(Math.random() * (3e3 - 300) + 300)));
    },
    shouldRetry = isLikeCloseEvent,
    isFatalConnectionProblem,
    on,
    webSocketImpl,
    generateID = function generateUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c2) => {
        const r2 = Math.random() * 16 | 0, v2 = c2 == "x" ? r2 : r2 & 3 | 8;
        return v2.toString(16);
      });
    },
    jsonMessageReplacer: replacer,
    jsonMessageReviver: reviver
  } = options;
  let ws;
  if (webSocketImpl) {
    if (!isWebSocket(webSocketImpl)) {
      throw new Error("Invalid WebSocket implementation provided");
    }
    ws = webSocketImpl;
  } else if (typeof WebSocket !== "undefined") {
    ws = WebSocket;
  } else if (typeof global !== "undefined") {
    ws = global.WebSocket || global.MozWebSocket;
  } else if (typeof window !== "undefined") {
    ws = window.WebSocket || window.MozWebSocket;
  }
  if (!ws)
    throw new Error("WebSocket implementation missing; on Node you can `import WebSocket from 'ws';` and pass `webSocketImpl: WebSocket` to `createClient`");
  const WebSocketImpl = ws;
  const emitter = (() => {
    const message = (() => {
      const listeners2 = {};
      return {
        on(id, listener) {
          listeners2[id] = listener;
          return () => {
            delete listeners2[id];
          };
        },
        emit(message2) {
          var _a2;
          if ("id" in message2)
            (_a2 = listeners2[message2.id]) === null || _a2 === void 0 ? void 0 : _a2.call(listeners2, message2);
        }
      };
    })();
    const listeners = {
      connecting: (on === null || on === void 0 ? void 0 : on.connecting) ? [on.connecting] : [],
      opened: (on === null || on === void 0 ? void 0 : on.opened) ? [on.opened] : [],
      connected: (on === null || on === void 0 ? void 0 : on.connected) ? [on.connected] : [],
      ping: (on === null || on === void 0 ? void 0 : on.ping) ? [on.ping] : [],
      pong: (on === null || on === void 0 ? void 0 : on.pong) ? [on.pong] : [],
      message: (on === null || on === void 0 ? void 0 : on.message) ? [message.emit, on.message] : [message.emit],
      closed: (on === null || on === void 0 ? void 0 : on.closed) ? [on.closed] : [],
      error: (on === null || on === void 0 ? void 0 : on.error) ? [on.error] : []
    };
    return {
      onMessage: message.on,
      on(event, listener) {
        const l2 = listeners[event];
        l2.push(listener);
        return () => {
          l2.splice(l2.indexOf(listener), 1);
        };
      },
      emit(event, ...args) {
        for (const listener of [...listeners[event]]) {
          listener(...args);
        }
      }
    };
  })();
  function errorOrClosed(cb) {
    const listening = [
      emitter.on("error", (err) => {
        listening.forEach((unlisten) => unlisten());
        cb(err);
      }),
      emitter.on("closed", (event) => {
        listening.forEach((unlisten) => unlisten());
        cb(event);
      })
    ];
  }
  let connecting, locks = 0, lazyCloseTimeout, retrying = false, retries = 0, disposed = false;
  async function connect() {
    clearTimeout(lazyCloseTimeout);
    const [socket, throwOnClose] = await (connecting !== null && connecting !== void 0 ? connecting : connecting = new Promise((connected, denied) => (async () => {
      if (retrying) {
        await retryWait(retries);
        if (!locks) {
          connecting = void 0;
          return denied({ code: 1e3, reason: "All Subscriptions Gone" });
        }
        retries++;
      }
      emitter.emit("connecting");
      const socket2 = new WebSocketImpl(typeof url === "function" ? await url() : url, GRAPHQL_TRANSPORT_WS_PROTOCOL);
      let connectionAckTimeout, queuedPing;
      function enqueuePing() {
        if (isFinite(keepAlive) && keepAlive > 0) {
          clearTimeout(queuedPing);
          queuedPing = setTimeout(() => {
            if (socket2.readyState === WebSocketImpl.OPEN) {
              socket2.send(stringifyMessage({ type: MessageType.Ping }));
              emitter.emit("ping", false, void 0);
            }
          }, keepAlive);
        }
      }
      errorOrClosed((errOrEvent) => {
        connecting = void 0;
        clearTimeout(connectionAckTimeout);
        clearTimeout(queuedPing);
        denied(errOrEvent);
        if (isLikeCloseEvent(errOrEvent) && errOrEvent.code === 4499) {
          socket2.close(4499, "Terminated");
          socket2.onerror = null;
          socket2.onclose = null;
        }
      });
      socket2.onerror = (err) => emitter.emit("error", err);
      socket2.onclose = (event) => emitter.emit("closed", event);
      socket2.onopen = async () => {
        try {
          emitter.emit("opened", socket2);
          const payload = typeof connectionParams === "function" ? await connectionParams() : connectionParams;
          if (socket2.readyState !== WebSocketImpl.OPEN)
            return;
          socket2.send(stringifyMessage(payload ? {
            type: MessageType.ConnectionInit,
            payload
          } : {
            type: MessageType.ConnectionInit
          }, replacer));
          if (isFinite(connectionAckWaitTimeout) && connectionAckWaitTimeout > 0) {
            connectionAckTimeout = setTimeout(() => {
              socket2.close(CloseCode.ConnectionAcknowledgementTimeout, "Connection acknowledgement timeout");
            }, connectionAckWaitTimeout);
          }
          enqueuePing();
        } catch (err) {
          emitter.emit("error", err);
          socket2.close(CloseCode.InternalClientError, limitCloseReason(err instanceof Error ? err.message : new Error(err).message, "Internal client error"));
        }
      };
      let acknowledged = false;
      socket2.onmessage = ({ data }) => {
        try {
          const message = parseMessage(data, reviver);
          emitter.emit("message", message);
          if (message.type === "ping" || message.type === "pong") {
            emitter.emit(message.type, true, message.payload);
            if (message.type === "pong") {
              enqueuePing();
            } else if (!disablePong) {
              socket2.send(stringifyMessage(message.payload ? {
                type: MessageType.Pong,
                payload: message.payload
              } : {
                type: MessageType.Pong
              }));
              emitter.emit("pong", false, message.payload);
            }
            return;
          }
          if (acknowledged)
            return;
          if (message.type !== MessageType.ConnectionAck)
            throw new Error(`First message cannot be of type ${message.type}`);
          clearTimeout(connectionAckTimeout);
          acknowledged = true;
          emitter.emit("connected", socket2, message.payload);
          retrying = false;
          retries = 0;
          connected([
            socket2,
            new Promise((_2, reject) => errorOrClosed(reject))
          ]);
        } catch (err) {
          socket2.onmessage = null;
          emitter.emit("error", err);
          socket2.close(CloseCode.BadResponse, limitCloseReason(err instanceof Error ? err.message : new Error(err).message, "Bad response"));
        }
      };
    })()));
    if (socket.readyState === WebSocketImpl.CLOSING)
      await throwOnClose;
    let release = () => {
    };
    const released = new Promise((resolve4) => release = resolve4);
    return [
      socket,
      release,
      Promise.race([
        released.then(() => {
          if (!locks) {
            const complete = () => socket.close(1e3, "Normal Closure");
            if (isFinite(lazyCloseTimeoutMs) && lazyCloseTimeoutMs > 0) {
              lazyCloseTimeout = setTimeout(() => {
                if (socket.readyState === WebSocketImpl.OPEN)
                  complete();
              }, lazyCloseTimeoutMs);
            } else {
              complete();
            }
          }
        }),
        throwOnClose
      ])
    ];
  }
  function shouldRetryConnectOrThrow(errOrCloseEvent) {
    if (isLikeCloseEvent(errOrCloseEvent) && (isFatalInternalCloseCode(errOrCloseEvent.code) || [
      CloseCode.InternalServerError,
      CloseCode.InternalClientError,
      CloseCode.BadRequest,
      CloseCode.BadResponse,
      CloseCode.Unauthorized,
      CloseCode.SubprotocolNotAcceptable,
      CloseCode.SubscriberAlreadyExists,
      CloseCode.TooManyInitialisationRequests
    ].includes(errOrCloseEvent.code)))
      throw errOrCloseEvent;
    if (disposed)
      return false;
    if (isLikeCloseEvent(errOrCloseEvent) && errOrCloseEvent.code === 1e3)
      return locks > 0;
    if (!retryAttempts || retries >= retryAttempts)
      throw errOrCloseEvent;
    if (!shouldRetry(errOrCloseEvent))
      throw errOrCloseEvent;
    if (isFatalConnectionProblem === null || isFatalConnectionProblem === void 0 ? void 0 : isFatalConnectionProblem(errOrCloseEvent))
      throw errOrCloseEvent;
    return retrying = true;
  }
  if (!lazy) {
    (async () => {
      locks++;
      for (; ; ) {
        try {
          const [, , throwOnClose] = await connect();
          await throwOnClose;
        } catch (errOrCloseEvent) {
          try {
            if (!shouldRetryConnectOrThrow(errOrCloseEvent))
              return;
          } catch (errOrCloseEvent2) {
            return onNonLazyError === null || onNonLazyError === void 0 ? void 0 : onNonLazyError(errOrCloseEvent2);
          }
        }
      }
    })();
  }
  return {
    on: emitter.on,
    subscribe(payload, sink) {
      const id = generateID();
      let done = false, errored = false, releaser = () => {
        locks--;
        done = true;
      };
      (async () => {
        locks++;
        for (; ; ) {
          try {
            const [socket, release, waitForReleaseOrThrowOnClose] = await connect();
            if (done)
              return release();
            const unlisten = emitter.onMessage(id, (message) => {
              switch (message.type) {
                case MessageType.Next: {
                  sink.next(message.payload);
                  return;
                }
                case MessageType.Error: {
                  errored = true, done = true;
                  sink.error(message.payload);
                  releaser();
                  return;
                }
                case MessageType.Complete: {
                  done = true;
                  releaser();
                  return;
                }
              }
            });
            socket.send(stringifyMessage({
              id,
              type: MessageType.Subscribe,
              payload
            }, replacer));
            releaser = () => {
              if (!done && socket.readyState === WebSocketImpl.OPEN)
                socket.send(stringifyMessage({
                  id,
                  type: MessageType.Complete
                }, replacer));
              locks--;
              done = true;
              release();
            };
            await waitForReleaseOrThrowOnClose.finally(unlisten);
            return;
          } catch (errOrCloseEvent) {
            if (!shouldRetryConnectOrThrow(errOrCloseEvent))
              return;
          }
        }
      })().then(() => {
        if (!errored)
          sink.complete();
      }).catch((err) => {
        sink.error(err);
      });
      return () => {
        if (!done)
          releaser();
      };
    },
    async dispose() {
      disposed = true;
      if (connecting) {
        const [socket] = await connecting;
        socket.close(1e3, "Normal Closure");
      }
    },
    terminate() {
      if (connecting) {
        emitter.emit("closed", {
          code: 4499,
          reason: "Terminated",
          wasClean: false
        });
      }
    }
  };
}
function isLikeCloseEvent(val) {
  return isObject(val) && "code" in val && "reason" in val;
}
function isFatalInternalCloseCode(code) {
  if ([
    1e3,
    1001,
    1006,
    1005,
    1012,
    1013,
    1013
  ].includes(code))
    return false;
  return code >= 1e3 && code <= 1999;
}
function isWebSocket(val) {
  return typeof val === "function" && "constructor" in val && "CLOSED" in val && "CLOSING" in val && "CONNECTING" in val && "OPEN" in val;
}
const createWsLink = (uri, apiKey, userId2, userHmac) => {
  const url = new URL(uri);
  const protocol = url.hostname.includes("localhost") ? "ws" : "wss";
  const wsUri = `${protocol}://${url.host}${url.pathname}`;
  const connectionParams = userHmac ? { "x-api-key": apiKey, "x-user-id": userId2, "x-user-hmac": userHmac } : { "x-api-key": apiKey, "x-user-id": userId2 };
  return new GraphQLWsLink(
    createClient({
      url: wsUri,
      connectionParams,
      lazy: true
    })
  );
};
const createHttpLink = (uri, apiKey, userId2, userHmac) => userHmac ? new HttpLink({ uri, headers: { "x-api-key": apiKey, "x-user-id": userId2, "x-user-hmac": userHmac } }) : new HttpLink({ uri, headers: { "x-api-key": apiKey, "x-user-id": userId2 } });
const splitLink = (uri, apiKey, userId2, userHmac) => ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  createWsLink(uri, apiKey, userId2, userHmac),
  createHttpLink(uri, apiKey, userId2, userHmac)
);
const client = (uri, apiKey, userId2, userHmac) => new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      allNotifications: {
        keyFields: ["id"]
      }
    }
  }),
  link: splitLink(uri, apiKey, userId2, userHmac),
  ssrForceFetchDelay: 100
});
const getNotifications = gql`
  query getUserNotifications($locale: String!) {
    allNotifications(orderBy: CREATED_AT_DESC) {
      nodes {
        id
        createdAt
        read
        type
        updatedAt
        userId
        actionUrl
        content(locale: $locale)
      }
    }  
  }
`;
const notificationChanged = gql`
  subscription notificationChanged($userId: String!, $locale: String!) {
    notificationsUpdated(userId: $userId) {
      event
      notification {
        id
        createdAt
        read
        type
        updatedAt
        userId
        actionUrl
        content(locale: $locale)
      }
    }
  }
`;
const markAsRead = gql`
  mutation markAsRead($id: UUID!) {
    updateNotificationById(input: {notificationPatch: {read: true}, id: $id}) {
      notification {
        id
      }
    }
  }
`;
const markAllAsRead = gql`
  mutation markAllAsRead {
    markAllNotificationsAsRead {
      updated
    }
  }
`;
const formatDate = (value, locale) => {
  return value ? `${new Date(value).toLocaleDateString(locale || "en", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  })}` : "";
};
const sourceLocale = `en-GB`;
const targetLocales = [
  `nb-NO`,
  `sv-SE`
];
function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case "../generated/locales/nb-NO.ts":
      return import("./nb-NO.js");
    case "../generated/locales/sv-SE.ts":
      return import("./sv-SE.js");
    default:
      return new Promise(function(resolve4, reject) {
        (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
          reject.bind(null, new Error("Unknown variable dynamic import: " + path))
        );
      });
  }
}
const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => __variableDynamicImportRuntime0__(`../generated/locales/${locale}.ts`)
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var a2 = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k2) {
    var d2 = Object.getOwnPropertyDescriptor(n2, k2);
    Object.defineProperty(a2, k2, d2.get ? d2 : {
      enumerable: true,
      get: function() {
        return n2[k2];
      }
    });
  });
  return a2;
}
var dist = {};
var mockClient$1 = {};
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(core);
var require$$1$1 = /* @__PURE__ */ getAugmentedNamespace(cache);
var mockLink = {};
var require$$1 = /* @__PURE__ */ getAugmentedNamespace(graphql);
var require$$2 = /* @__PURE__ */ getAugmentedNamespace(utilities);
var mockSubscription = {};
Object.defineProperty(mockSubscription, "__esModule", { value: true });
mockSubscription.createMockSubscription = mockSubscription.MockSubscription = void 0;
var MockSubscription = function() {
  function MockSubscription2(options) {
    var _a2;
    this.loggingDisabled = (_a2 = options === null || options === void 0 ? void 0 : options.disableLogging) !== null && _a2 !== void 0 ? _a2 : false;
  }
  MockSubscription2.prototype.subscribe = function(observer) {
    if (this.observer && !this.loggingDisabled) {
      console.warn("Warning: mock-apollo-client - Mock subscription was already being used for a previous query. Subsequent calls to next/error/complete will only affect subscriptions to the new query.");
    }
    this.observer = observer;
  };
  Object.defineProperty(MockSubscription2.prototype, "closed", {
    get: function() {
      var _a2, _b;
      return (_b = (_a2 = this.observer) === null || _a2 === void 0 ? void 0 : _a2.closed) !== null && _b !== void 0 ? _b : true;
    },
    enumerable: false,
    configurable: true
  });
  MockSubscription2.prototype.next = function(value) {
    var _a2;
    this.verifyState();
    (_a2 = this.observer) === null || _a2 === void 0 ? void 0 : _a2.next(value);
  };
  MockSubscription2.prototype.error = function(errorValue) {
    var _a2;
    this.verifyState();
    (_a2 = this.observer) === null || _a2 === void 0 ? void 0 : _a2.error(errorValue);
  };
  MockSubscription2.prototype.complete = function() {
    var _a2;
    this.verifyState();
    (_a2 = this.observer) === null || _a2 === void 0 ? void 0 : _a2.complete();
  };
  MockSubscription2.prototype.verifyState = function() {
    if (this.loggingDisabled) {
      return;
    }
    if (!this.observer) {
      console.warn("Warning: mock-apollo-client - Mock subscription has no observer, this will have no effect");
    } else if (this.closed) {
      console.warn("Warning: mock-apollo-client - Mock subscription is closed, this will have no effect");
    }
  };
  return MockSubscription2;
}();
mockSubscription.MockSubscription = MockSubscription;
var createMockSubscription = function(options) {
  return new MockSubscription(options);
};
mockSubscription.createMockSubscription = createMockSubscription;
var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics2 = function(d2, b2) {
    extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
      d3.__proto__ = b3;
    } || function(d3, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d3[p2] = b3[p2];
    };
    return extendStatics2(d2, b2);
  };
  return function(d2, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics2(d2, b2);
    function __5() {
      this.constructor = d2;
    }
    d2.prototype = b2 === null ? Object.create(b2) : (__5.prototype = b2.prototype, new __5());
  };
}();
Object.defineProperty(mockLink, "__esModule", { value: true });
mockLink.MockLink = void 0;
var core_1$1 = require$$0;
var graphql_1 = require$$1;
var utilities_1 = require$$2;
var mockSubscription_1 = mockSubscription;
var MockLink = function(_super) {
  __extends(MockLink2, _super);
  function MockLink2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.requestHandlers = {};
    _this.request = function(operation) {
      var key = requestToKey(operation.query);
      var handler = _this.requestHandlers[key];
      if (!handler) {
        throw new Error("Request handler not defined for query: ".concat((0, graphql_1.print)(operation.query)));
      }
      return new core_1$1.Observable(function(observer) {
        var result = void 0;
        try {
          result = handler(operation.variables);
        } catch (error) {
          var message = error instanceof Error ? error.message : error;
          throw new Error("Unexpected error whilst calling request handler: ".concat(message));
        }
        if (isPromise(result)) {
          result.then(function(result2) {
            observer.next(result2);
            observer.complete();
          }).catch(function(error) {
            observer.error(error);
          });
        } else if (isSubscription(result)) {
          result.subscribe(observer);
        } else {
          throw new Error("Request handler must return a promise or subscription. Received '".concat(typeof result, "'."));
        }
        return function() {
        };
      });
    };
    return _this;
  }
  MockLink2.prototype.setRequestHandler = function(requestQuery, handler) {
    var queryWithoutClientDirectives = (0, utilities_1.removeClientSetsFromDocument)(requestQuery);
    if (queryWithoutClientDirectives === null) {
      console.warn("Warning: mock-apollo-client - The query is entirely client side (using @client directives) so the request handler will not be registered.");
      return;
    }
    var key = requestToKey(queryWithoutClientDirectives);
    if (this.requestHandlers[key]) {
      throw new Error("Request handler already defined for query: ".concat((0, graphql_1.print)(requestQuery)));
    }
    this.requestHandlers[key] = handler;
  };
  return MockLink2;
}(core_1$1.ApolloLink);
mockLink.MockLink = MockLink;
var normalise = function(requestQuery) {
  var stripped = (0, utilities_1.removeConnectionDirectiveFromDocument)(requestQuery);
  stripped = stripped !== null ? stripTypenames(stripped) : null;
  return stripped === null ? requestQuery : stripped;
};
var stripTypenames = function(document2) {
  return (0, graphql_1.visit)(document2, {
    Field: {
      enter: function(node) {
        return node.name.value === "__typename" ? null : void 0;
      }
    }
  });
};
var requestToKey = function(query) {
  var normalised = normalise(query);
  var queryString = query && (0, graphql_1.print)(normalised);
  var requestKey = { query: queryString };
  return JSON.stringify(requestKey);
};
var isPromise = function(maybePromise) {
  return maybePromise && typeof maybePromise.then === "function";
};
var isSubscription = function(maybeSubscription) {
  return maybeSubscription && maybeSubscription instanceof mockSubscription_1.MockSubscription;
};
var __assign = commonjsGlobal && commonjsGlobal.__assign || function() {
  __assign = Object.assign || function(t2) {
    for (var s2, i = 1, n2 = arguments.length; i < n2; i++) {
      s2 = arguments[i];
      for (var p2 in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p2))
          t2[p2] = s2[p2];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(mockClient$1, "__esModule", { value: true });
mockClient$1.createMockClient = void 0;
var core_1 = require$$0;
var cache_1 = require$$1$1;
var mockLink_1 = mockLink;
var createMockClient = function(options) {
  if (options === null || options === void 0 ? void 0 : options.link) {
    throw new Error("Providing link to use is not supported.");
  }
  var mockLink2 = new mockLink_1.MockLink();
  var client2 = new core_1.ApolloClient(__assign(__assign({ cache: new cache_1.InMemoryCache({
    addTypename: false
  }) }, options), { link: mockLink2 }));
  var mockMethods = {
    setRequestHandler: mockLink2.setRequestHandler.bind(mockLink2)
  };
  return Object.assign(client2, mockMethods);
};
mockClient$1.createMockClient = createMockClient;
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    var desc = Object.getOwnPropertyDescriptor(m2, k2);
    if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m2[k2];
      } };
    }
    Object.defineProperty(o2, k22, desc);
  } : function(o2, m2, k2, k22) {
    if (k22 === void 0)
      k22 = k2;
    o2[k22] = m2[k2];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m2, exports2) {
    for (var p2 in m2)
      if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
        __createBinding(exports2, m2, p2);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.createMockSubscription = void 0;
  __exportStar(mockClient$1, exports);
  var mockSubscription_12 = mockSubscription;
  Object.defineProperty(exports, "createMockSubscription", { enumerable: true, get: function() {
    return mockSubscription_12.createMockSubscription;
  } });
})(dist);
var alea$1 = { exports: {} };
(function(module) {
  (function(global2, module2, define) {
    function Alea(seed) {
      var me = this, mash = Mash();
      me.next = function() {
        var t2 = 2091639 * me.s0 + me.c * 23283064365386963e-26;
        me.s0 = me.s1;
        me.s1 = me.s2;
        return me.s2 = t2 - (me.c = t2 | 0);
      };
      me.c = 1;
      me.s0 = mash(" ");
      me.s1 = mash(" ");
      me.s2 = mash(" ");
      me.s0 -= mash(seed);
      if (me.s0 < 0) {
        me.s0 += 1;
      }
      me.s1 -= mash(seed);
      if (me.s1 < 0) {
        me.s1 += 1;
      }
      me.s2 -= mash(seed);
      if (me.s2 < 0) {
        me.s2 += 1;
      }
      mash = null;
    }
    function copy(f2, t2) {
      t2.c = f2.c;
      t2.s0 = f2.s0;
      t2.s1 = f2.s1;
      t2.s2 = f2.s2;
      return t2;
    }
    function impl(seed, opts) {
      var xg = new Alea(seed), state = opts && opts.state, prng2 = xg.next;
      prng2.int32 = function() {
        return xg.next() * 4294967296 | 0;
      };
      prng2.double = function() {
        return prng2() + (prng2() * 2097152 | 0) * 11102230246251565e-32;
      };
      prng2.quick = prng2;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng2.state = function() {
          return copy(xg, {});
        };
      }
      return prng2;
    }
    function Mash() {
      var n2 = 4022871197;
      var mash = function(data) {
        data = String(data);
        for (var i = 0; i < data.length; i++) {
          n2 += data.charCodeAt(i);
          var h2 = 0.02519603282416938 * n2;
          n2 = h2 >>> 0;
          h2 -= n2;
          h2 *= n2;
          n2 = h2 >>> 0;
          h2 -= n2;
          n2 += h2 * 4294967296;
        }
        return (n2 >>> 0) * 23283064365386963e-26;
      };
      return mash;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.alea = impl;
    }
  })(
    commonjsGlobal,
    module,
    false
  );
})(alea$1);
var xor128$1 = { exports: {} };
(function(module) {
  (function(global2, module2, define) {
    function XorGen(seed) {
      var me = this, strseed = "";
      me.x = 0;
      me.y = 0;
      me.z = 0;
      me.w = 0;
      me.next = function() {
        var t2 = me.x ^ me.x << 11;
        me.x = me.y;
        me.y = me.z;
        me.z = me.w;
        return me.w ^= me.w >>> 19 ^ t2 ^ t2 >>> 8;
      };
      if (seed === (seed | 0)) {
        me.x = seed;
      } else {
        strseed += seed;
      }
      for (var k2 = 0; k2 < strseed.length + 64; k2++) {
        me.x ^= strseed.charCodeAt(k2) | 0;
        me.next();
      }
    }
    function copy(f2, t2) {
      t2.x = f2.x;
      t2.y = f2.y;
      t2.z = f2.z;
      t2.w = f2.w;
      return t2;
    }
    function impl(seed, opts) {
      var xg = new XorGen(seed), state = opts && opts.state, prng2 = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng2.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng2.int32 = xg.next;
      prng2.quick = prng2;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng2.state = function() {
          return copy(xg, {});
        };
      }
      return prng2;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.xor128 = impl;
    }
  })(
    commonjsGlobal,
    module,
    false
  );
})(xor128$1);
var xorwow$1 = { exports: {} };
(function(module) {
  (function(global2, module2, define) {
    function XorGen(seed) {
      var me = this, strseed = "";
      me.next = function() {
        var t2 = me.x ^ me.x >>> 2;
        me.x = me.y;
        me.y = me.z;
        me.z = me.w;
        me.w = me.v;
        return (me.d = me.d + 362437 | 0) + (me.v = me.v ^ me.v << 4 ^ (t2 ^ t2 << 1)) | 0;
      };
      me.x = 0;
      me.y = 0;
      me.z = 0;
      me.w = 0;
      me.v = 0;
      if (seed === (seed | 0)) {
        me.x = seed;
      } else {
        strseed += seed;
      }
      for (var k2 = 0; k2 < strseed.length + 64; k2++) {
        me.x ^= strseed.charCodeAt(k2) | 0;
        if (k2 == strseed.length) {
          me.d = me.x << 10 ^ me.x >>> 4;
        }
        me.next();
      }
    }
    function copy(f2, t2) {
      t2.x = f2.x;
      t2.y = f2.y;
      t2.z = f2.z;
      t2.w = f2.w;
      t2.v = f2.v;
      t2.d = f2.d;
      return t2;
    }
    function impl(seed, opts) {
      var xg = new XorGen(seed), state = opts && opts.state, prng2 = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng2.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng2.int32 = xg.next;
      prng2.quick = prng2;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng2.state = function() {
          return copy(xg, {});
        };
      }
      return prng2;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.xorwow = impl;
    }
  })(
    commonjsGlobal,
    module,
    false
  );
})(xorwow$1);
var xorshift7$1 = { exports: {} };
(function(module) {
  (function(global2, module2, define) {
    function XorGen(seed) {
      var me = this;
      me.next = function() {
        var X = me.x, i = me.i, t2, v2;
        t2 = X[i];
        t2 ^= t2 >>> 7;
        v2 = t2 ^ t2 << 24;
        t2 = X[i + 1 & 7];
        v2 ^= t2 ^ t2 >>> 10;
        t2 = X[i + 3 & 7];
        v2 ^= t2 ^ t2 >>> 3;
        t2 = X[i + 4 & 7];
        v2 ^= t2 ^ t2 << 7;
        t2 = X[i + 7 & 7];
        t2 = t2 ^ t2 << 13;
        v2 ^= t2 ^ t2 << 9;
        X[i] = v2;
        me.i = i + 1 & 7;
        return v2;
      };
      function init(me2, seed2) {
        var j, X = [];
        if (seed2 === (seed2 | 0)) {
          X[0] = seed2;
        } else {
          seed2 = "" + seed2;
          for (j = 0; j < seed2.length; ++j) {
            X[j & 7] = X[j & 7] << 15 ^ seed2.charCodeAt(j) + X[j + 1 & 7] << 13;
          }
        }
        while (X.length < 8)
          X.push(0);
        for (j = 0; j < 8 && X[j] === 0; ++j)
          ;
        if (j == 8)
          X[7] = -1;
        else
          X[j];
        me2.x = X;
        me2.i = 0;
        for (j = 256; j > 0; --j) {
          me2.next();
        }
      }
      init(me, seed);
    }
    function copy(f2, t2) {
      t2.x = f2.x.slice();
      t2.i = f2.i;
      return t2;
    }
    function impl(seed, opts) {
      if (seed == null)
        seed = +new Date();
      var xg = new XorGen(seed), state = opts && opts.state, prng2 = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng2.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng2.int32 = xg.next;
      prng2.quick = prng2;
      if (state) {
        if (state.x)
          copy(state, xg);
        prng2.state = function() {
          return copy(xg, {});
        };
      }
      return prng2;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.xorshift7 = impl;
    }
  })(
    commonjsGlobal,
    module,
    false
  );
})(xorshift7$1);
var xor4096$1 = { exports: {} };
(function(module) {
  (function(global2, module2, define) {
    function XorGen(seed) {
      var me = this;
      me.next = function() {
        var w = me.w, X = me.X, i = me.i, t2, v2;
        me.w = w = w + 1640531527 | 0;
        v2 = X[i + 34 & 127];
        t2 = X[i = i + 1 & 127];
        v2 ^= v2 << 13;
        t2 ^= t2 << 17;
        v2 ^= v2 >>> 15;
        t2 ^= t2 >>> 12;
        v2 = X[i] = v2 ^ t2;
        me.i = i;
        return v2 + (w ^ w >>> 16) | 0;
      };
      function init(me2, seed2) {
        var t2, v2, i, j, w, X = [], limit = 128;
        if (seed2 === (seed2 | 0)) {
          v2 = seed2;
          seed2 = null;
        } else {
          seed2 = seed2 + "\0";
          v2 = 0;
          limit = Math.max(limit, seed2.length);
        }
        for (i = 0, j = -32; j < limit; ++j) {
          if (seed2)
            v2 ^= seed2.charCodeAt((j + 32) % seed2.length);
          if (j === 0)
            w = v2;
          v2 ^= v2 << 10;
          v2 ^= v2 >>> 15;
          v2 ^= v2 << 4;
          v2 ^= v2 >>> 13;
          if (j >= 0) {
            w = w + 1640531527 | 0;
            t2 = X[j & 127] ^= v2 + w;
            i = 0 == t2 ? i + 1 : 0;
          }
        }
        if (i >= 128) {
          X[(seed2 && seed2.length || 0) & 127] = -1;
        }
        i = 127;
        for (j = 4 * 128; j > 0; --j) {
          v2 = X[i + 34 & 127];
          t2 = X[i = i + 1 & 127];
          v2 ^= v2 << 13;
          t2 ^= t2 << 17;
          v2 ^= v2 >>> 15;
          t2 ^= t2 >>> 12;
          X[i] = v2 ^ t2;
        }
        me2.w = w;
        me2.X = X;
        me2.i = i;
      }
      init(me, seed);
    }
    function copy(f2, t2) {
      t2.i = f2.i;
      t2.w = f2.w;
      t2.X = f2.X.slice();
      return t2;
    }
    function impl(seed, opts) {
      if (seed == null)
        seed = +new Date();
      var xg = new XorGen(seed), state = opts && opts.state, prng2 = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng2.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng2.int32 = xg.next;
      prng2.quick = prng2;
      if (state) {
        if (state.X)
          copy(state, xg);
        prng2.state = function() {
          return copy(xg, {});
        };
      }
      return prng2;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.xor4096 = impl;
    }
  })(
    commonjsGlobal,
    module,
    false
  );
})(xor4096$1);
var tychei$1 = { exports: {} };
(function(module) {
  (function(global2, module2, define) {
    function XorGen(seed) {
      var me = this, strseed = "";
      me.next = function() {
        var b2 = me.b, c2 = me.c, d2 = me.d, a2 = me.a;
        b2 = b2 << 25 ^ b2 >>> 7 ^ c2;
        c2 = c2 - d2 | 0;
        d2 = d2 << 24 ^ d2 >>> 8 ^ a2;
        a2 = a2 - b2 | 0;
        me.b = b2 = b2 << 20 ^ b2 >>> 12 ^ c2;
        me.c = c2 = c2 - d2 | 0;
        me.d = d2 << 16 ^ c2 >>> 16 ^ a2;
        return me.a = a2 - b2 | 0;
      };
      me.a = 0;
      me.b = 0;
      me.c = 2654435769 | 0;
      me.d = 1367130551;
      if (seed === Math.floor(seed)) {
        me.a = seed / 4294967296 | 0;
        me.b = seed | 0;
      } else {
        strseed += seed;
      }
      for (var k2 = 0; k2 < strseed.length + 20; k2++) {
        me.b ^= strseed.charCodeAt(k2) | 0;
        me.next();
      }
    }
    function copy(f2, t2) {
      t2.a = f2.a;
      t2.b = f2.b;
      t2.c = f2.c;
      t2.d = f2.d;
      return t2;
    }
    function impl(seed, opts) {
      var xg = new XorGen(seed), state = opts && opts.state, prng2 = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng2.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng2.int32 = xg.next;
      prng2.quick = prng2;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng2.state = function() {
          return copy(xg, {});
        };
      }
      return prng2;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else if (define && define.amd) {
      define(function() {
        return impl;
      });
    } else {
      this.tychei = impl;
    }
  })(
    commonjsGlobal,
    module,
    false
  );
})(tychei$1);
var seedrandom$1 = { exports: {} };
(function(module) {
  (function(global2, pool, math) {
    var width = 256, chunks = 6, digits = 52, rngname = "random", startdenom = math.pow(width, chunks), significance = math.pow(2, digits), overflow = significance * 2, mask = width - 1, nodecrypto;
    function seedrandom2(seed, options, callback) {
      var key = [];
      options = options == true ? { entropy: true } : options || {};
      var shortseed = mixkey(flatten(
        options.entropy ? [seed, tostring(pool)] : seed == null ? autoseed() : seed,
        3
      ), key);
      var arc4 = new ARC4(key);
      var prng2 = function() {
        var n2 = arc4.g(chunks), d2 = startdenom, x2 = 0;
        while (n2 < significance) {
          n2 = (n2 + x2) * width;
          d2 *= width;
          x2 = arc4.g(1);
        }
        while (n2 >= overflow) {
          n2 /= 2;
          d2 /= 2;
          x2 >>>= 1;
        }
        return (n2 + x2) / d2;
      };
      prng2.int32 = function() {
        return arc4.g(4) | 0;
      };
      prng2.quick = function() {
        return arc4.g(4) / 4294967296;
      };
      prng2.double = prng2;
      mixkey(tostring(arc4.S), pool);
      return (options.pass || callback || function(prng3, seed2, is_math_call, state) {
        if (state) {
          if (state.S) {
            copy(state, arc4);
          }
          prng3.state = function() {
            return copy(arc4, {});
          };
        }
        if (is_math_call) {
          math[rngname] = prng3;
          return seed2;
        } else
          return prng3;
      })(
        prng2,
        shortseed,
        "global" in options ? options.global : this == math,
        options.state
      );
    }
    function ARC4(key) {
      var t2, keylen = key.length, me = this, i = 0, j = me.i = me.j = 0, s2 = me.S = [];
      if (!keylen) {
        key = [keylen++];
      }
      while (i < width) {
        s2[i] = i++;
      }
      for (i = 0; i < width; i++) {
        s2[i] = s2[j = mask & j + key[i % keylen] + (t2 = s2[i])];
        s2[j] = t2;
      }
      (me.g = function(count) {
        var t3, r2 = 0, i2 = me.i, j2 = me.j, s3 = me.S;
        while (count--) {
          t3 = s3[i2 = mask & i2 + 1];
          r2 = r2 * width + s3[mask & (s3[i2] = s3[j2 = mask & j2 + t3]) + (s3[j2] = t3)];
        }
        me.i = i2;
        me.j = j2;
        return r2;
      })(width);
    }
    function copy(f2, t2) {
      t2.i = f2.i;
      t2.j = f2.j;
      t2.S = f2.S.slice();
      return t2;
    }
    function flatten(obj, depth) {
      var result = [], typ = typeof obj, prop;
      if (depth && typ == "object") {
        for (prop in obj) {
          try {
            result.push(flatten(obj[prop], depth - 1));
          } catch (e2) {
          }
        }
      }
      return result.length ? result : typ == "string" ? obj : obj + "\0";
    }
    function mixkey(seed, key) {
      var stringseed = seed + "", smear, j = 0;
      while (j < stringseed.length) {
        key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
      }
      return tostring(key);
    }
    function autoseed() {
      try {
        var out;
        if (nodecrypto && (out = nodecrypto.randomBytes)) {
          out = out(width);
        } else {
          out = new Uint8Array(width);
          (global2.crypto || global2.msCrypto).getRandomValues(out);
        }
        return tostring(out);
      } catch (e2) {
        var browser = global2.navigator, plugins = browser && browser.plugins;
        return [+new Date(), global2, plugins, global2.screen, tostring(pool)];
      }
    }
    function tostring(a2) {
      return String.fromCharCode.apply(0, a2);
    }
    mixkey(math.random(), pool);
    if (module.exports) {
      module.exports = seedrandom2;
      try {
        nodecrypto = require("crypto");
      } catch (ex) {
      }
    } else {
      math["seed" + rngname] = seedrandom2;
    }
  })(
    typeof self !== "undefined" ? self : commonjsGlobal,
    [],
    Math
  );
})(seedrandom$1);
var alea = alea$1.exports;
var xor128 = xor128$1.exports;
var xorwow = xorwow$1.exports;
var xorshift7 = xorshift7$1.exports;
var xor4096 = xor4096$1.exports;
var tychei = tychei$1.exports;
var sr = seedrandom$1.exports;
sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;
var seedrandom = sr;
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify(rnds);
}
let prng = seedrandom();
function random() {
  return prng();
}
function fake(data, options) {
  const dataSource = Array.isArray(data) ? () => randElement(data) : data;
  if ((options == null ? void 0 : options.length) === void 0) {
    return dataSource(0);
  }
  return Array.from({
    length: options.length
  }, (_2, index) => dataSource(index));
}
function randElement(arr) {
  return arr[Math.floor(random() * arr.length)];
}
function getRandomInRange({
  min = 1,
  max = 9999.99,
  fraction = 0
} = {}) {
  return Number((random() * (max - min) + min).toFixed(fraction));
}
function randBoolean(options) {
  return fake(() => randElement([true, false]), options);
}
function isNil(value) {
  return value === null || typeof value === "undefined";
}
function randNumber(options) {
  const normalized = {
    min: isNil(options == null ? void 0 : options.min) ? 0 : options.min,
    max: isNil(options == null ? void 0 : options.max) ? 999999 : options.max,
    precision: options == null ? void 0 : options.precision,
    fraction: options == null ? void 0 : options.fraction
  };
  return fake(() => {
    if (normalized.min === normalized.max) {
      return normalized.min;
    }
    const num = getRandomInRange(normalized);
    if (normalized.precision !== void 0) {
      return Math.floor(num / normalized.precision) * normalized.precision;
    }
    return num;
  }, options);
}
var data$1R = [
  "markets",
  "solid_backing_strategist",
  "granite",
  "synthesizing_executive_specialist",
  "ecuador",
  "calculate_island",
  "nevada",
  "gloves_manat_delaware",
  "loan_saint",
  "client_server",
  "kroon",
  "investor",
  "dynamic_portal",
  "pixel",
  "concrete",
  "nuevo_avon_market",
  "productize_withdrawal_override",
  "operative_sum_bypassing",
  "visionary_online_account",
  "balboa",
  "sql_connecting",
  "incredible_azure_interface",
  "open_source_netherlands_copying",
  "hack_hard_thailand",
  "berkshire_car_micronesia",
  "pound_program_handmade",
  "implement_nevada",
  "home",
  "agp",
  "berkshire_investment_tasty",
  "licensed_pink_fundamental",
  "concrete_encompassing",
  "holistic",
  "application_saint_infrastructureg",
  "visionary",
  "towels_visionary_ergonomic",
  "scalable_jewelery_sudan",
  "revolutionary",
  "global_fresh_open_source",
  "png_capacitor_quantify",
  "automotive",
  "action_items",
  "soap_unbranded",
  "music_payment_payment",
  "chips_taiwan",
  "payment",
  "intelligent_connecting_account",
  "capacitor_bypass",
  "tools_vatu",
  "interface",
  "e_markets",
  "transmit_borders_input",
  "invoice",
  "ball_orange",
  "morph_magnetic",
  "team_oriented_ivory",
  "concrete_compress",
  "market_hack",
  "wireless_frictionless_chicken",
  "png",
  "turquoise_territories_berkshire",
  "back_end",
  "withdrawal_paradigm_matrix",
  "payment_context_sensitive_wisconsin",
  "unbranded_json_wooden",
  "invoice_sleek_customized",
  "silver_copying",
  "licensed",
  "plug_and_play",
  "cultivate_orchestrator",
  "quantifying_quantify_norway",
  "account_borders_gourde",
  "quantifyg",
  "open_architected_content_based_protocol",
  "administrator",
  "synthesizing",
  "metrics",
  "white_wireless_garden",
  "berkshireg",
  "nepal_view_protocol",
  "calculating_shirt",
  "fuchsia_reintermediate_fish",
  "extend",
  "matrix",
  "peso",
  "superstructure_value_added_redundant",
  "national_world_classv",
  "yellowv",
  "moratorium",
  "views",
  "metal_drive_sports",
  "ports_pink_overriding",
  "borders",
  "supply_chains_client_driven_dynamic",
  "shirt_moratorium_place",
  "calculate",
  "protocol_engineer_azerbaijan",
  "chair_rss",
  "b2b_belarussian",
  "fiji"
];
function randFileName(options) {
  var _options$extension;
  const ext = (_options$extension = options == null ? void 0 : options.extension) != null ? _options$extension : "pdf";
  return fake(() => `${randElement(data$1R)}.${ext}`, options);
}
function randBetweenDate(options) {
  const from2 = new Date(options.from).getTime();
  const to = new Date(options.to).getTime();
  if (from2 >= to) {
    throw new Error("From must be before to");
  }
  const generator = () => {
    return new Date(randNumber({
      min: from2,
      max: to
    }));
  };
  return fake(generator, options);
}
function rand(arr, options) {
  return fake(arr, options);
}
var data$1f = {
  withAccents: {
    male: [
      "Adri\xE1n",
      "\xC6gir",
      "\xC1lvaro",
      "Andr\xE9",
      "Andr\xE9s",
      "\xC1rni",
      "Asbj\xF8rn",
      "Bj\xF6rn",
      "C\xE9sar",
      "Dan\xEDel",
      "Dav\xED\xF0",
      "Em\xEDlio",
      "Fa\xF1ch",
      "Fran\xE7ois",
      "Franti\u0161ek",
      "G\xEDsli",
      "G\xF6tz",
      "Gu\xF0j\xF3n",
      "Gu\xF0mundur",
      "G\xFCnter",
      "Halld\xF3r",
      "Hans-J\xF6rg",
      "Hans-J\xFCrgen",
      "H\xFCseyin",
      "I\xF1aki",
      "J\xE1nos",
      "Jes\xFAs",
      "Ji\u0159\xED",
      "J\xF3hann",
      "J\xF3hannes",
      "Jok\u016Bbas",
      "J\xF3n",
      "Jos\xE9",
      "J\xF6rn",
      "Juli\xE3o",
      "J\xFCrgen",
      "Kristj\xE1n",
      "Ma\xEBl",
      "Magn\xFAs",
      "Math\xE9o",
      "M\xE1ty\xE1s",
      "Micha\u0142",
      "No\xEBl",
      "Nu\xF1ez",
      "\xD3lafur",
      "\xD3scar",
      "\xD8yvind",
      "P\xE1ll",
      "Pawe\u0142",
      "P\xE9tur",
      "Ram\xF3n",
      "Ra\xFAl",
      "Ren\xE9",
      "Ruair\xED",
      "Rub\xE9n",
      "Se\xE1n",
      "S\xE9rgio",
      "Sigur\xF0ur",
      "S\xF6nke",
      "Stef\xE1n",
      "Tom\xE1\u0161",
      "\xDEorsteinn"
    ],
    female: [
      "\xC6del",
      "Agn\xE8s",
      "Al\xEDcia",
      "\xC4nne",
      "Ant\xF3nia",
      "\xC1sta",
      "Au\xF0ur",
      "C\xE4cilia",
      "Chlo\xEB",
      "Cla\xFAdia",
      "D\xF6rte",
      "El\xEDn",
      "El\xEDsabet",
      "Eli\u0161ka",
      "Franti\u0161ka",
      "Gl\xF3ria",
      "Gra\u017Cyna",
      "Gu\xF0bj\xF6rg",
      "Gu\xF0n\xFD",
      "Gu\xF0r\xFAn",
      "Henri\xEBtte",
      "Ingibj\xF6rg",
      "\xCDris",
      "J\xF3hanna",
      "J\xF3na",
      "J\xFAlia",
      "K\xE4te",
      "Katr\xEDn",
      "Kolbr\xFAn",
      "Krist\xEDn",
      "K\u0160the",
      "Let\xEDcia",
      "L\xEDdia",
      "L\xFAcia",
      "Ma\u0142gorzata",
      "Margr\xE9t",
      "Mar\xEDa",
      "M\xF3nica",
      "Nat\xE1lia",
      "\xD3l\xF6f",
      "Patr\xEDcia",
      "Ragnhei\xF0ur",
      "Ren\xE9e",
      "Ru\u017Eena",
      "Si\xE2n",
      "Sigr\xED\xF0ur",
      "Sigr\xFAn",
      "S\xEDlvia",
      "S\xF8rina",
      "V\u011Bra",
      "Virg\xEDnia",
      "Zo\xEB",
      "\xDE\xF3ra",
      "\xDE\xF3runn"
    ]
  },
  withoutAccents: {
    male: [
      "Abdul",
      "Abdullahi",
      "Abubakar",
      "Adam",
      "Adamu",
      "Adiy",
      "Ahmad",
      "Ajay",
      "Akira",
      "Alan",
      "Alberto",
      "Alejandro",
      "Aleksander",
      "Aleksandr",
      "Aleksey",
      "Alex",
      "Alexander",
      "Alexey",
      "Ali",
      "Aliyu",
      "Aminu",
      "Amit",
      "Amiyr",
      "Amiyt",
      "Amnuai",
      "Amphon",
      "Anah",
      "Anan",
      "Andreas",
      "Andrew",
      "Andrey",
      "Andri",
      "Andries",
      "Andrzej",
      "Anil",
      "Anthony",
      "Anton",
      "Antonio",
      "Arnar",
      "Artur",
      "Artyom",
      "Arun",
      "Ashok",
      "Atli",
      "Avraham",
      "Bartosz",
      "Bello",
      "Bernd",
      "Bin",
      "Birgir",
      "Bjarni",
      "Blessing",
      "Bongani",
      "Brian",
      "Bunmi",
      "Carlos",
      "Carol",
      "Chan",
      "Chao",
      "Charles",
      "Charoen",
      "Chen",
      "Cheng",
      "Christian",
      "Christopher",
      "Colin",
      "Daniel",
      "Daniyel",
      "Dariusz",
      "David",
      "Denis",
      "Dennis",
      "Diego",
      "Dieter",
      "Dilip",
      "Dinesh",
      "Dmitriy",
      "Dmitry",
      "Einar",
      "Eliyahu",
      "Emmanuel",
      "Evgeniy",
      "Fernando",
      "Fran",
      "Francis",
      "Francisco",
      "Francisco-Javier",
      "Frank",
      "Franz",
      "Gang",
      "Gareth",
      "Gary",
      "George",
      "Gerhard",
      "Graham",
      "Grzegorz",
      "Gunnar",
      "Guy",
      "Haim",
      "Haiyan",
      "Hans",
      "Hans-Ulrich",
      "Haruna",
      "Hassan",
      "Heike",
      "Heinz",
      "Helgi",
      "Helmut",
      "Hendrik",
      "Herbert",
      "Hideo",
      "Hiromi",
      "Hiroshi",
      "Hong",
      "Horst",
      "Hui",
      "Ian",
      "Ibrahim",
      "Idris",
      "Igor",
      "Ilya",
      "Isa",
      "Isaac",
      "Isah",
      "Ivan",
      "Jabulani",
      "Jacek",
      "Jacobus",
      "Jakub",
      "James",
      "Jan",
      "Janusz",
      "Javier",
      "Jean",
      "Jerzy",
      "Jesus",
      "Jason",
      "Jianguo",
      "Jianhua",
      "Jianjun",
      "Jianping",
      "Jin",
      "Joan",
      "Johan",
      "Johannes",
      "John",
      "Jonathan",
      "Jorge",
      "Jose",
      "Jose-Antonio",
      "Jose-Luis",
      "Jose-Manuel",
      "Jose-Maria",
      "Josef",
      "Joseph",
      "Joyce",
      "Juan",
      "Kabiru",
      "Kai",
      "Kamil",
      "Karen",
      "Karl",
      "Karl-Heinz",
      "Katsumi",
      "Kazuo",
      "Kelvin",
      "Kenji",
      "Kenneth",
      "Kevin",
      "Kiran",
      "Kirill",
      "Kiyoshi",
      "Kjartan",
      "Klaus",
      "Ko",
      "Koichi",
      "Koji",
      "Konstantin",
      "Koshi",
      "Krishna",
      "Kristinn",
      "Krzysztof",
      "Kun",
      "Lakshmi",
      "Lan",
      "Laxmi",
      "Lei",
      "Li",
      "Lihua",
      "Lijun",
      "Lilian",
      "Lin",
      "Ling",
      "Liping",
      "Liyor",
      "Luis",
      "Lukasz",
      "Maciej",
      "Mahmood",
      "Maksim",
      "Manfred",
      "Manoj",
      "Manuel",
      "Marcin",
      "Mardkhay",
      "Marek",
      "Mariusz",
      "Mark",
      "Martin",
      "Masami",
      "Masao",
      "Mateusz",
      "Matt",
      "Matthew",
      "Meiyr",
      "Michael",
      "Michal",
      "Miguel",
      "Miguel-Angel",
      "Mikhail",
      "Min",
      "Ming",
      "Mitsuo",
      "Miykhael",
      "Miykhal",
      "Mo",
      "Mohamed",
      "Mohammad",
      "Mohammed",
      "Mohan",
      "Moses",
      "Moshe",
      "Mpho",
      "Muhammad",
      "Muhammed",
      "Mukesh",
      "Musa",
      "Narong",
      "Nathan",
      "Nicola",
      "Nikita",
      "Nikolay",
      "Ning",
      "Nkosinathi",
      "Noam",
      "Oleg",
      "Omer",
      "Otieno",
      "Pablo",
      "Patrick",
      "Paul",
      "Pavel",
      "Pawel",
      "Pedro",
      "Peng",
      "Peter",
      "Petrus",
      "Philip",
      "Pieter",
      "Ping",
      "Piotr",
      "Prasit",
      "Prasoet",
      "Pricha",
      "Pushpa",
      "Qiang",
      "Qing",
      "Radha",
      "Rafael",
      "Ragnar",
      "Raj",
      "Rajendra",
      "Rajesh",
      "Raju",
      "Rakesh",
      "Ram",
      "Ramesh",
      "Raphael",
      "Rattana",
      "Ravi",
      "Richard",
      "Robert",
      "Roman",
      "Rong",
      "Roy",
      "Ryan",
      "Salisu",
      "Saman",
      "Samran",
      "Samuel",
      "Sani",
      "Sanjay",
      "Santosh",
      "Sam",
      "Sammy",
      "Sawat",
      "Sebastian",
      "Sergey",
      "Sergio",
      "Shankar",
      "Shay",
      "Shigeru",
      "Shimon",
      "Shlomo",
      "Shoji",
      "Sibusiso",
      "Simon",
      "Sipho",
      "Sombat",
      "Sombun",
      "Somchai",
      "Somchit",
      "Somkhit",
      "Somkiat",
      "Sommai",
      "Somnuek",
      "Somphon",
      "Somphong",
      "Somsak",
      "Sri",
      "Stefan",
      "Stephen",
      "Steve",
      "Steven",
      "Suman",
      "Sunday",
      "Sunil",
      "Sunthon",
      "Suresh",
      "Sushila",
      "Suwit",
      "Sveinn",
      "Tadashi",
      "Takashi",
      "Takeshi",
      "Tal",
      "Tebogo",
      "Thabo",
      "Thawi",
      "Themba",
      "Thomas",
      "Thulani",
      "Tomasz",
      "Toshio",
      "Udom",
      "Umar",
      "Uriy",
      "Usman",
      "Uwe",
      "Victor",
      "Vijay",
      "Viktor",
      "Vincent",
      "Vinod",
      "Vladimir",
      "Walter",
      "Wanchai",
      "Waraphon",
      "Wei",
      "Werner",
      "Wichai",
      "Wichian",
      "Willem",
      "William",
      "Winai",
      "Wirat",
      "Wirot",
      "Wojciech",
      "Wolfgang",
      "Xiang",
      "Xiaohong",
      "Xiaoli",
      "Xiaoping",
      "Xiaoyan",
      "Xin",
      "Xolani",
      "Yaakv",
      "Yahaya",
      "Yakubu",
      "Yan",
      "Yasuo",
      "Yhudah",
      "Ying",
      "Yisrael",
      "Yong",
      "Yosef",
      "Yoshie",
      "Yoshimi",
      "Yoshio",
      "Yu",
      "Yue",
      "Yukio",
      "Yun",
      "Yuriy",
      "Yusuf",
      "Yuval",
      "Zbigniew",
      "Zhen",
      "Zhiqiang"
    ],
    female: [
      "Agata",
      "Agnieszka",
      "Aisha",
      "Akira",
      "Aleksandra",
      "Alina",
      "Alyona",
      "Amina",
      "Amnuai",
      "Ana",
      "Ana-Maria",
      "Anah",
      "Anan",
      "Anastasiya",
      "Andrea",
      "Angela",
      "Anita",
      "Ann",
      "Anna",
      "Anong",
      "Antonia",
      "Asha",
      "Barbara",
      "Beata",
      "Berglind",
      "Bin",
      "Birgit",
      "Birna",
      "Blessing",
      "Brigitte",
      "Bunmi",
      "Busisiwe",
      "Carmen",
      "Carol",
      "Caroline",
      "Catherine",
      "Chan",
      "Chanah",
      "Chao",
      "Charoen",
      "Chayah",
      "Chen",
      "Cheng",
      "Christa",
      "Christine",
      "Claire",
      "Claudia",
      "Cristina",
      "Darya",
      "Dolores",
      "Dorota",
      "Edda",
      "Ekaterina",
      "Elena",
      "Elisabeth",
      "Elizabeth",
      "Elke",
      "Emiko",
      "Emma",
      "Erika",
      "Erla",
      "Erna",
      "Ester",
      "Esther",
      "Eunice",
      "Eva",
      "Eugenia",
      "Ewa",
      "Faith",
      "Fatima",
      "Fiona",
      "Fran",
      "Francisca",
      "Fumiko",
      "Galina",
      "Gabra",
      "Gisela",
      "Gita",
      "Grace",
      "Hadiza",
      "Haiyan",
      "Hanna",
      "Haruna",
      "Hauwa",
      "Heike",
      "Helen",
      "Helga",
      "Hildur",
      "Hiroko",
      "Hiromi",
      "Hisako",
      "Hong",
      "Hui",
      "Hulda",
      "Inga",
      "Ingrid",
      "Irina",
      "Isa",
      "Isabel",
      "Isah",
      "Iwona",
      "Jackline",
      "Jan",
      "Jane",
      "Janet",
      "Jean",
      "Jennifer",
      "Jianhua",
      "Jianping",
      "Jin",
      "Joan",
      "Joanna",
      "Johanna",
      "Josefa",
      "Joy",
      "Joyce",
      "Juan",
      "Julie",
      "Justyna",
      "Kai",
      "Kanchana",
      "Karen",
      "Karin",
      "Karolina",
      "Kasia",
      "Katarzyna",
      "Katsumi",
      "Keiko",
      "Kiran",
      "Kiyoko",
      "Kristina",
      "Kseniya",
      "Kun",
      "Lakshmi",
      "Lalita",
      "Lan",
      "Latda",
      "Laura",
      "Laxmi",
      "Leah",
      "Lei",
      "Li",
      "Lihua",
      "Lijun",
      "Lilian",
      "Lilja",
      "Lin",
      "Linda",
      "Lindiwe",
      "Ling",
      "Liping",
      "Lisa",
      "Lucia",
      "Lucy",
      "Lyubov",
      "Lyudmila",
      "Magda",
      "Magdalena",
      "Mali",
      "Manju",
      "Margaret",
      "Maria",
      "Maria-Isabel",
      "Maria-Jose",
      "Maria-Pilar",
      "Marina",
      "Mariya",
      "Marta",
      "Martha",
      "Mary",
      "Maryam",
      "Masako",
      "Masami",
      "Mei",
      "Mercy",
      "Michal",
      "Michiko",
      "Mieko",
      "Min",
      "Mina",
      "Ming",
      "Miriam",
      "Miyoko",
      "Mo",
      "Monika",
      "Mpho",
      "Na",
      "Nadezhda",
      "Nan",
      "Nancy",
      "Natalya",
      "Ngozi",
      "Nicola",
      "Ning",
      "Nittaya",
      "Noam",
      "Nobuko",
      "Nokuthula",
      "Nonhlanhla",
      "Noriko",
      "Nushi",
      "Olga",
      "Omer",
      "Patricia",
      "Paula",
      "Paulina",
      "Peng",
      "Petra",
      "Phonthip",
      "Pilar",
      "Ping",
      "Prani",
      "Purity",
      "Pushpa",
      "Qing",
      "Rachel",
      "Radha",
      "Rattana",
      "Rebecca",
      "Reiko",
      "Rekha",
      "Renate",
      "Rita",
      "Rong",
      "Rosa",
      "Rose",
      "Rut",
      "Ruth",
      "Ryoko",
      "Sabine",
      "Sachiko",
      "Samran",
      "Santosh",
      "Sara",
      "Sarah",
      "Sam",
      "Sammy",
      "Sawat",
      "Shanti",
      "Sharon",
      "Shay",
      "Shizuko",
      "Shoshanah",
      "Sibongile",
      "Sita",
      "Sombat",
      "Sombun",
      "Somchit",
      "Somkhit",
      "Sommai",
      "Somnuek",
      "Somphon",
      "Somphong",
      "Sri",
      "Steinunn",
      "Sukanya",
      "Suman",
      "Sunday",
      "Sunita",
      "Suphaphon",
      "Susan",
      "Susanne",
      "Sushila",
      "Svetlana",
      "Takako",
      "Tamar",
      "Tatyana",
      "Tal",
      "Tebogo",
      "Teruko",
      "Thawi",
      "Tomiko",
      "Toshiko",
      "Unnur",
      "Urai",
      "Urmila",
      "Ursula",
      "Usha",
      "Valentina",
      "Victoria",
      "Wanjiru",
      "Wanphen",
      "Watsana",
      "Wei",
      "Wilai",
      "Xiang",
      "Xiaohong",
      "Xiaoli",
      "Xiaoping",
      "Xiaoyan",
      "Xin",
      "Yael",
      "Yan",
      "Yasuko",
      "Yelena",
      "Yhudiyt",
      "Ying",
      "Yoko",
      "Yong",
      "Yoshie",
      "Yoshiko",
      "Yoshimi",
      "Yu",
      "Yue",
      "Yuko",
      "Yuliya",
      "Yun",
      "Yuval",
      "Zainab",
      "Zandile",
      "Zanele",
      "Zhen"
    ]
  }
};
function randFirstName(options) {
  var _options$withAccents, _options$gender;
  const withAccents = (_options$withAccents = options == null ? void 0 : options.withAccents) != null ? _options$withAccents : false;
  const gender = (_options$gender = options == null ? void 0 : options.gender) != null ? _options$gender : rand(["male", "female"]);
  const locale = options == null ? void 0 : options.locale;
  const names = withAccents ? locale ? locale == null ? void 0 : locale.withAccents[gender] : data$1f.withAccents[gender] : locale ? locale == null ? void 0 : locale.withoutAccents[gender] : data$1f.withoutAccents[gender];
  return fake(names, options);
}
var data$1e = {
  withAccents: [
    "\xC6bel\xF8",
    "\xC6beltoft",
    "\xC1g\xFAstsd\xF3ttir",
    "\xC1g\xFAstsson",
    "\xC1lvarez",
    "\xC1rnad\xF3ttir",
    "\xC1rnason",
    "\xC1sgeirsd\xF3ttir",
    "\xC3shaikh",
    "Bene\u0161",
    "Bene\u0161ov\xE1",
    "Baldursd\xF3ttir",
    "Birgisd\xF3ttir",
    "Bjarnad\xF3ttir",
    "Bj\xF6rnsd\xF3ttir",
    "Bj\xF6rnsson",
    "B\xF6ttcher",
    "\u010Cern\xE1",
    "\u010Cern\xFD",
    "Ch\xE1vez",
    "\xD0eki\u0107",
    "D\xEDaz",
    "\xD0or\xF0i\u0107",
    "Dvo\u0159\xE1k",
    "Dvo\u0159\xE1kov\xE1",
    "Einarsd\xF3ttir",
    "Fern\xE1ndez",
    "Fialov\xE1",
    "F\xF6rster",
    "Fri\xF0riksson",
    "Fr\xF6hlich",
    "Garc\xEDa",
    "G\xEDslad\xF3ttir",
    "G\xEDslason",
    "G\xF6bel",
    "G\xF3mez",
    "Gro\xDF",
    "Gunnarsd\xF3ttir",
    "Gu\xF0j\xF3nsd\xF3ttir",
    "Gu\xF0j\xF3nsson",
    "Gu\xF0mundsd\xF3ttir",
    "Gu\xF0mundsson",
    "G\xFCnther",
    "Halld\xF3rsd\xF3ttir",
    "Halld\xF3rsson",
    "Guti\xE9rrez",
    "Guzm\xE1n",
    "H\xE1jek",
    "Haraldsd\xF3ttir",
    "Har\xF0ard\xF3ttir",
    "Har\xF0arson",
    "Helgad\xF3ttir",
    "Hern\xE1ndez",
    "Hauksd\xF3ttir",
    "Hor\xE1k",
    "Hor\xE1kov\xE1",
    "Jab\u0142o\u0144ski",
    "J\xE4ger",
    "Jasi\u0144ski",
    "Jim\xE9nez",
    "J\xF3hannesd\xF3ttir",
    "J\xF3hannesson",
    "J\xF3hannsd\xF3ttir",
    "J\xF3hannsson",
    "J\xF3nasd\xF3ttir",
    "J\xF3nasson",
    "J\xF3nsd\xF3ttir",
    "J\xF3nsson",
    "Kami\u0144ski",
    "Karlsd\xF3ttir",
    "Kjartansd\xF3ttir",
    "K\xF6hler",
    "K\xF6nig",
    "Koz\u0142owski",
    "Kr\xE1lov\xE1",
    "Krej\u010D\xED",
    "Kristinsd\xF3ttir",
    "Kristj\xE1nsd\xF3ttir",
    "Kristj\xE1nsson",
    "Kr\xFCger",
    "Ku\u010Dera",
    "Ku\u010Derov\xE1",
    "\u0141api\u0144ski",
    "L\xF6ffler",
    "L\xF3pez",
    "\u0141uczak",
    "\u0141ukaszewski",
    "Magn\xFAsd\xF3ttir",
    "Magn\xFAsson",
    "Markov\xE1",
    "Mart\xEDnez",
    "Mei\xDFner",
    "M\xE9ndez",
    "M\xF6ller",
    "M\xFCller",
    "Mu\xF1oz",
    "Nov\xE1k",
    "Nov\xE1kov\xE1",
    "Novotn\xE1",
    "Novotn\xFD",
    "Nu\xF1ez",
    "N\xFA\xF1ez",
    "\xD8deg\xE5rd",
    "\u0150hlschl\xE4gerov\xE1",
    "\xD3lafsd\xF3ttir",
    "\xD3lafsson",
    "\u0150ll\xF6sov\xE1",
    "Olszewski",
    "\u0150ri",
    "\u0150rs\xE9gi-Z\xF6lderd\u0151",
    "\xD3skarsd\xF3ttir",
    "\xD3skarsson",
    "\xD8verg\xE5rd",
    "\u0150zse",
    "P\xE1lsd\xF3ttir",
    "P\xE1lsson",
    "Paw\u0142owski",
    "Pe\xF1a",
    "P\xE9rez",
    "P\xE9tursd\xF3ttir",
    "P\xE9tursson",
    "Pokorn\xE1",
    "Pokorn\xFD",
    "Posp\xED\u0161il",
    "Posp\xED\u0161ilov\xE1",
    "Proch\xE1zka",
    "Proch\xE1zkov\xE1",
    "Ragnarsd\xF3ttir",
    "Ram\xEDrez",
    "R\xEDos",
    "Rodr\xEDguez",
    "S\xE1nchez",
    "Sch\xE4fer",
    "Schr\xF6der",
    "Sch\xFCtz",
    "Sigur\xF0ard\xF3ttir",
    "Sigur\xF0sson",
    "Sigurj\xF3nsd\xF3ttir",
    "Sigurj\xF3nsson",
    "Soko\u0142owski",
    "Stef\xE1nsd\xF3ttir",
    "Stef\xE1nsson",
    "Sveinsd\xF3ttir",
    "Svobodov\xE1",
    "Szczepa\u0144ski",
    "Szyma\u0144ski",
    "Urba\u0144ski",
    "\u016Asas",
    "\u016A\u017Eien",
    "V\xE1squez",
    "Vesel\xE1",
    "Vesel\xFD",
    "Wei\xDF",
    "\u017Bak",
    "\u017D\xE1kov\xE1",
    "Zemanov\xE1",
    "Zieli\u0144ski",
    "\u017Dukauskas",
    "\u017Dukauskien\u0117",
    "\xDE\xF3r\xF0ard\xF3ttir",
    "\xDE\xF3r\xF0arson",
    "\xDEorsteinsd\xF3ttir",
    "\xDEorsteinsson"
  ],
  withoutAccents: [
    "Abdi",
    "Abdullahi",
    "Abe",
    "Abubakar",
    "Achieng",
    "Adamczyk",
    "Adamu",
    "Adan",
    "Adebayo",
    "Adhiambo",
    "Adri",
    "Agbaria",
    "Aguilar",
    "Ahmad",
    "Ahmed",
    "Akinyi",
    "Akpan",
    "Ali",
    "Aliev",
    "Aliyu",
    "Allen",
    "Alonso",
    "Alvarez",
    "Amadi",
    "Aminu",
    "Andreev",
    "Andreeva",
    "Ansari",
    "Anyango",
    "Aoki",
    "Arai",
    "Arnarson",
    "Ashknaziy",
    "Atieno",
    "Attias",
    "Audu",
    "Avraham",
    "Ayutthaya",
    "Azulay",
    "Baba",
    "Bai",
    "Bailey",
    "Baker",
    "Bakker",
    "Bala",
    "Baldursson",
    "Baloyi",
    "Baran",
    "Barasa",
    "Barman",
    "Bauer",
    "Becker",
    "Begam",
    "Begum",
    "Behera",
    "Bekher",
    "Bello",
    "Bennett",
    "Ber",
    "Bevan",
    "Bibi",
    "Birgisson",
    "Biswas",
    "Bitton",
    "Bjarnason",
    "Blanco",
    "Blom",
    "Borkowski",
    "Bos",
    "Botha",
    "Bowen",
    "Braun",
    "Brouwer",
    "Brown",
    "Bunma",
    "Bunmi",
    "Bunsi",
    "Buthelezi",
    "Cai",
    "Cano",
    "Cao",
    "Carter",
    "Castillo",
    "Castro",
    "Cele",
    "Ceng",
    "Chaichana",
    "Chand",
    "Chanthara",
    "Chauke",
    "Chebet",
    "Chen",
    "Cheng",
    "Chepkemoi",
    "Cherinsuk",
    "Cheruiyot",
    "Chided",
    "Chmielewski",
    "Chukwu",
    "Clark",
    "Clarke",
    "Coetzee",
    "Cohen",
    "Collins",
    "Cook",
    "Cooper",
    "Cortes",
    "Cruz",
    "Cui",
    "Czarnecki",
    "Dahan",
    "Dai",
    "Das",
    "Dauda",
    "David",
    "Davies",
    "Davis",
    "Dayan",
    "De-Bruijn",
    "De-Graaf",
    "De-Groot",
    "De-Jong",
    "Dekker",
    "Delgado",
    "Deng",
    "Devi",
    "Diaz",
    "Dijkstra",
    "Ding",
    "Dlamini",
    "Dominguez",
    "Dong",
    "Du-Plessis",
    "Dube",
    "Duda",
    "Dudek",
    "Dumont",
    "Edwards",
    "Egorov",
    "Egorova",
    "Einarsson",
    "Elbaz",
    "Eliyahu",
    "Ellis",
    "Emmanuel",
    "Endo",
    "Espinoza",
    "Esteban",
    "Evans",
    "Eze",
    "Fan",
    "Fang",
    "Feldman",
    "Feng",
    "Fernandez",
    "Fiala",
    "Fischer",
    "Flores",
    "Friedman",
    "Frolova",
    "Fu",
    "Fuchs",
    "Fujii",
    "Fujita",
    "Fukuda",
    "Gaby",
    "Gao",
    "Garba",
    "Garcia",
    "Garrido",
    "Garza",
    "Ghosh",
    "Gil",
    "Golan",
    "Goldstein",
    "Gomez",
    "Gonzales",
    "Gonzalez",
    "Goto",
    "Govender",
    "Grabowski",
    "Green",
    "Greenberg",
    "Griffiths",
    "Gu",
    "Guerrero",
    "Gumede",
    "Gunnarsson",
    "Guo",
    "Gupta",
    "Gutierrez",
    "Hahn",
    "Hall",
    "Han",
    "Haraldsson",
    "Harle",
    "Harle-Cowan",
    "Harris",
    "Harrison",
    "Hartmann",
    "Haruna",
    "Hasegawa",
    "Hashimoto",
    "Hasna",
    "Hassan",
    "Hauksson",
    "Hayashi",
    "He",
    "Helgason",
    "Hen",
    "Hendriks",
    "Herbulot",
    "Hernandez",
    "Herrera",
    "Herrmann",
    "Hill",
    "Hoekstra",
    "Hoffmann",
    "Hofmann",
    "Hongthong",
    "Hopkins",
    "Howells",
    "Hu",
    "Huang",
    "Huber",
    "Hughes",
    "Huisman",
    "Hussein",
    "Ibrahim",
    "Idris",
    "Iglesias",
    "Igwe",
    "Ikeda",
    "Inoue",
    "Isa",
    "Isaac",
    "Isah",
    "Ishii",
    "Ishikawa",
    "Ito",
    "Ivanov",
    "Ivanova",
    "Jabarin",
    "Jackson",
    "Jacobs",
    "Jadhav",
    "Jakubowski",
    "James",
    "Jankowski",
    "Jansen",
    "Janssen",
    "Jaworski",
    "Jenkins",
    "Jia",
    "Jiang",
    "Jimenez",
    "Jin",
    "John",
    "Johnson",
    "Jones",
    "Joseph",
    "Juma",
    "Jung",
    "Kaczmarek",
    "Kaiser",
    "Kamau",
    "Karanja",
    "Kariuki",
    "Karlsson",
    "Kato",
    "Katz",
    "Kaur",
    "Keller",
    "Khan",
    "Khatib",
    "Khatoon",
    "Khatun",
    "Khoury",
    "Khoza",
    "Khumalo",
    "Kibet",
    "Kikuchi",
    "Kim",
    "Kimani",
    "Kimura",
    "King",
    "Kjartansson",
    "Klein",
    "Kobayashi",
    "Koch",
    "Koech",
    "Kok",
    "Kondo",
    "Kongkaeo",
    "Koster",
    "Kovalenko",
    "Kowalczyk",
    "Kowalski",
    "Kozlov",
    "Kozlova",
    "Krause",
    "Krawczyk",
    "Kristinsson",
    "Kubiak",
    "Kucharski",
    "Kuipers",
    "Kumar",
    "Kumari",
    "Kuznetsov",
    "Kuznetsova",
    "Kwiatkowski",
    "Lal",
    "Lang",
    "Langat",
    "Lange",
    "Lavyan",
    "Lawal",
    "Lebedeva",
    "Lee",
    "Lehmann",
    "Levy",
    "Lewandowski",
    "Lewis",
    "Li",
    "Liang",
    "Liao",
    "Lim",
    "Lin",
    "Lis",
    "Liu",
    "Llewellyn",
    "Lloyd",
    "Lopez",
    "Lozano",
    "Lu",
    "Luo",
    "Ma",
    "Maas",
    "Mabaso",
    "Macharia",
    "Maciejewski",
    "Maeda",
    "Magomedov",
    "Mahagna",
    "Mahato",
    "Mahlangu",
    "Mahto",
    "Maier",
    "Maina",
    "Majewski",
    "Makarov",
    "Makarova",
    "Malinowski",
    "Malkah",
    "Maluleke",
    "Mandal",
    "Marciniak",
    "Marek",
    "Marin",
    "Martin",
    "Martinez",
    "Masarweh",
    "Maseko",
    "Mathebula",
    "Matsumoto",
    "Matthews",
    "Mayer",
    "Mazibuko",
    "Mazur",
    "Mazurek",
    "Mbatha",
    "Medina",
    "Meier",
    "Meijer",
    "Mendoza",
    "Meng",
    "Meyer",
    "Mhamid",
    "Mhlongo",
    "Michalak",
    "Michalski",
    "Mikhaylov",
    "Mikhaylova",
    "Mishra",
    "Mitchell",
    "Mizrahi",
    "Mkhize",
    "Mofokeng",
    "Mohamed",
    "Mohammed",
    "Mokoena",
    "Molefe",
    "Molina",
    "Mondal",
    "Moore",
    "Mor",
    "Morales",
    "Moreno",
    "Morgan",
    "Mori",
    "Morozov",
    "Morozova",
    "Morris",
    "Moshe",
    "Mthembu",
    "Mthethwa",
    "Mtshali",
    "Muhammad",
    "Muhammadu",
    "Muhammed",
    "Mulder",
    "Murakami",
    "Musa",
    "Mustapha",
    "Muthoni",
    "Mutua",
    "Mutuku",
    "Mwangi",
    "Naidoo",
    "Nakajima",
    "Nakamura",
    "Nakano",
    "Navarro",
    "Nayak",
    "Ndlovu",
    "Nel",
    "Neumann",
    "Ngcobo",
    "Ngobeni",
    "Ngubane",
    "Nguyen",
    "Ngwenya",
    "Nikitina",
    "Nikolaev",
    "Nikolaeva",
    "Njeri",
    "Njoroge",
    "Njuguna",
    "Nkosi",
    "Novikov",
    "Novikova",
    "Nowak",
    "Nowakowski",
    "Nowicki",
    "Ntuli",
    "Nxumalo",
    "Nyambura",
    "Oakley",
    "Ochieng",
    "Odhiambo",
    "Ogawa",
    "Ohana",
    "Ohayon",
    "Ojo",
    "Okada",
    "Okafor",
    "Okeke",
    "Okon",
    "Okoro",
    "Okoth",
    "Omar",
    "Omer",
    "Omondi",
    "Ono",
    "Onyango",
    "Ortega",
    "Ortiz",
    "Ostrowski",
    "Ota",
    "Otieno",
    "Ouma",
    "Owen",
    "Owino",
    "Pal",
    "Pan",
    "Panya",
    "Paramar",
    "Parker",
    "Parry",
    "Paswan",
    "Patel",
    "Patil",
    "Pavlov",
    "Pavlova",
    "Pawlak",
    "Peeters",
    "Peng",
    "Peretz",
    "Perez",
    "Peter",
    "Peters",
    "Petrov",
    "Petrova",
    "Pfeiffer",
    "Phillips",
    "Photsi",
    "Pietrzak",
    "Pillay",
    "Piotrowski",
    "Popov",
    "Popova",
    "Powell",
    "Prasad",
    "Pretorius",
    "Price",
    "Prieto",
    "Prins",
    "Pritchard",
    "Pugh",
    "Qiu",
    "Rabiu",
    "Radebe",
    "Ragnarsson",
    "Ram",
    "Ramirez",
    "Ramos",
    "Rani",
    "Rathod",
    "Ray",
    "Rees",
    "Ren",
    "Reuben",
    "Reyes",
    "Richards",
    "Richardson",
    "Richter",
    "Rivera",
    "Roberts",
    "Robinson",
    "Rodriguez",
    "Rogers",
    "Romanov",
    "Romanova",
    "Romero",
    "Rosenberg",
    "Rotich",
    "Rowlands",
    "Roy",
    "Rubio",
    "Ruiz",
    "Rungrueang",
    "Rumbelow",
    "Rutkowski",
    "Sadowski",
    "Saeli",
    "Saelim",
    "Saengthong",
    "Saetan",
    "Saetang",
    "Saeueng",
    "Sah",
    "Saha",
    "Sahu",
    "Saidu",
    "Saito",
    "Sakai",
    "Sakamoto",
    "Salazar",
    "Salisu",
    "Samuel",
    "Sanchez",
    "Sangthong",
    "Sani",
    "Santiago",
    "Santos",
    "Sanz",
    "Sarkar",
    "Sasaki",
    "Sato",
    "Sawicki",
    "Schmid",
    "Schmidt",
    "Schmitt",
    "Schmitz",
    "Schneider",
    "Scholz",
    "Schouten",
    "Schulz",
    "Schulze",
    "Schwartz",
    "Schwarz",
    "Scott",
    "Segel",
    "Sekh",
    "Sergeeva",
    "Serrano",
    "Shaikh",
    "Shalom",
    "Shapiro",
    "Sharabi",
    "Sharma",
    "Shaw",
    "Shehu",
    "Shemesh",
    "Shevchenko",
    "Shi",
    "Shimizu",
    "Sibiya",
    "Sichantha",
    "Sikora",
    "Simiyu",
    "Singh",
    "Sisuk",
    "Sithole",
    "Sitwat",
    "Smee",
    "Smirnov",
    "Smirnova",
    "Smit",
    "Smith",
    "Smits",
    "Sokolov",
    "Sokolova",
    "Sombun",
    "Song",
    "Soto",
    "Smoakley",
    "Starr",
    "Stepanov",
    "Stepanova",
    "Su",
    "Suad",
    "Suarez",
    "Suissa",
    "Sukkasem",
    "Sulaiman",
    "Suleiman",
    "Sun",
    "Sunday",
    "Suwan",
    "Suzuki",
    "Sveinsson",
    "Svoboda",
    "Szewczyk",
    "Takahashi",
    "Takeuchi",
    "Tal",
    "Tan",
    "Tanaka",
    "Tang",
    "Taylor",
    "Thakur",
    "Thomas",
    "Thompson",
    "Thongdi",
    "Thongkham",
    "Thongsuk",
    "Tian",
    "Tomaszewski",
    "Torres",
    "Tshabalala",
    "Turner",
    "Udo",
    "Ueda",
    "Umar",
    "Umaru",
    "Usman",
    "Vaknin",
    "Valdez",
    "Van-Beek",
    "Van-Dam",
    "Van-den-Berg",
    "Van-der-Heijden",
    "Van-der-Linden",
    "Van-Dijk",
    "Vargas",
    "Vasilev",
    "Vasileva",
    "Vazquez",
    "Vega",
    "Venter",
    "Verhoeven",
    "Vermeulen",
    "Visser",
    "Volkov",
    "Volkova",
    "Vos",
    "Wafula",
    "Wagner",
    "Wairimu",
    "Walczak",
    "Walker",
    "Walter",
    "Walters",
    "Wambua",
    "Wambui",
    "Wang",
    "Wangui",
    "Wanjala",
    "Wanjiku",
    "Ward",
    "Watanabe",
    "Watkins",
    "Watson",
    "Weber",
    "Wei",
    "Wekesa",
    "Wen",
    "Werner",
    "White",
    "Wieczorek",
    "Wilk",
    "Willems",
    "Williams",
    "Wilson",
    "Witkowski",
    "Wojciechowski",
    "Wolf",
    "Wood",
    "Wright",
    "Wu",
    "Xiao",
    "Xie",
    "Xu",
    "Yaakv",
    "Yadav",
    "Yahaya",
    "Yakovleva",
    "Yakubu",
    "Yamada",
    "Yamaguchi",
    "Yamamoto",
    "Yamashita",
    "Yamazaki",
    "Yan",
    "Yang",
    "Yao",
    "Ye",
    "Yin",
    "Yosef",
    "Yoshida",
    "Young",
    "Yu",
    "Yuan",
    "Yusuf",
    "Zajac",
    "Zakharov",
    "Zakharova",
    "Zalewski",
    "Zawadzki",
    "Zaytseva",
    "Zhang",
    "Zhao",
    "Zheng",
    "Zhong",
    "Zhou",
    "Zhu",
    "Zimmermann",
    "Zoabi",
    "Zulu",
    "Zwane"
  ]
};
function randLastName(options) {
  var _options$withAccents;
  const withAccents = (_options$withAccents = options == null ? void 0 : options.withAccents) != null ? _options$withAccents : randBoolean();
  const names = withAccents ? data$1e["withAccents"] : data$1e["withoutAccents"];
  return fake(names, options);
}
var data$16 = {
  china: [
    "Peking roasted duck",
    "Kung pao chicken",
    "Sweet and sour pork",
    "Hot pot",
    "Dim sum",
    "Dumplings",
    "Ma po tofu",
    "Char siu",
    "Chicken chow mein",
    "Beef chow mein",
    "vegetable chow mein",
    "Chicken fried rice",
    "Beef fried rice",
    "Vegetable fried Rice",
    "Special fried Rice",
    "Sichuan pork",
    "Xiaolongbao",
    "Zhajiangmian",
    "Wonton soup",
    "Sweet and sour pork",
    "Duck spring Rolls",
    "Vegetable spring Rolls",
    "Wonton",
    "Peking duck",
    "Lamb hot pot",
    "Spicy crayfish",
    "Guilin rice noodles",
    "Lanzhou hand-pulled noodles",
    "Steamed crab",
    "Shredded pork with garlic sauce",
    "Red braised pork",
    "Sweet and sour Ribs",
    "Xinjiang",
    "Braised pork with vermicelli"
  ],
  italy: [
    "Butternut squash risotto",
    "Mushroom risotto",
    "Beetroot risotto",
    "Courgette risotto",
    "Pizza",
    "Gnocchi",
    "Spaghetti bolognese",
    "Spaghetti carbonara",
    "Pesto alla Genovese",
    "Beef lasagne",
    "Vegetable lasagne",
    "Gelato",
    "Prosciutto di Parma",
    "Ribollita",
    "Bagna cauda",
    "Polenta",
    "Tortelli and ravioli",
    "Focaccia",
    "Garlic bread",
    "Arancini",
    "Il tartufo",
    "Panzerotto fritto",
    "Fiorentina",
    "Minestrone",
    "Frico",
    "Arrosticini",
    "Olive ascolante",
    "Fritto misto piemontes",
    "Tiramis\xF9"
  ],
  india: [
    "Biryani",
    "Dosa",
    "Tandoori chicken",
    "Samosas",
    "Chaat",
    "Plain naan",
    "Garlic naan",
    "Pilau rice",
    "Steamed rice",
    "Chicken madras",
    "Vegetable madras",
    "Chicken vindaloo",
    "Chicken jalfrezi",
    "Chicken roghan josh",
    "Lamb roghan josh",
    "Beef roghan josh",
    "Butter chicken",
    "Dosa",
    "Gulab jamun",
    "Chicken korma",
    "Mutter paneer",
    "Papadum",
    "Paratha",
    "Raita",
    "Saag paneer",
    "Tandoori chicken",
    "Chicken tikka masala",
    "Pakora",
    "Dal",
    "Chapati",
    "Pasanda",
    "Aloo gobi",
    "Kofta",
    "Chicken makhani",
    "Paneer naan",
    "Chana Aloo Curry"
  ],
  mexico: [
    "Chilaquiles",
    "Pozole",
    "Tacos al pastor",
    "Tostadas",
    "Chiles en nogada",
    "Elote",
    "Enchiladas",
    "Mole",
    "Guacamole",
    "Tamales",
    "Huevos rancheros",
    "Machaca",
    "Discada",
    "Beef Burrito",
    "Chicken Burrito",
    "Pozole de pollo o duajolote",
    "Menudo",
    "Cochinita pibil",
    "Tamale",
    "Quesadilla",
    "Frijoles puercos",
    "Chile en nogada",
    "Esquites",
    "Alegria de amaranto",
    "Pipi\xE1n",
    "Aguachile",
    "Ceviche",
    "Pescado zarandeado",
    "Camarones a la diabla",
    "Birria de chivo",
    "Tlayuda",
    "Guacamole con chapulines",
    "Flautas",
    "Torta Ahogada",
    "Carnitas",
    "Caldo Azteca",
    "Gorditas de Nata"
  ],
  japan: [
    "Sushi",
    "Udon",
    "Tofu",
    "Tempura",
    "Yakitori",
    "Sashimi",
    "Ramen",
    "Donburi",
    "Natto",
    "Oden",
    "Tamagoyaki",
    "Soba",
    "Tonkatsu",
    "Kashipan",
    "Sukiyaki",
    "Miso soup",
    "Okonomiyaki",
    "Mentaiko",
    "Nikujaga",
    "Unagi no kabayaki",
    "Shabu Shabu",
    "Onigiri",
    "Gyoza",
    "Takoyaki",
    "aiseki ryori",
    "Edamame",
    "Yakisoba",
    "Chawanmushi",
    "Wagashi"
  ],
  france: [
    "Foie gras",
    "Hu\xEEtres",
    "Cassoulet",
    "Poulet basquaise",
    "Escargots au beurre persill\xE9",
    "Mouclade charentaise",
    "Galettes bretonnes",
    "Flemish carbonnade",
    "Quiche lorraine",
    "Raclette",
    "Cheese fondue",
    "Beef fondue",
    "Gratin dauphinois",
    "Tartiflette",
    "Bouillabaisse",
    "Ratatouille",
    "Boeuf bourguignon",
    "Blanquette de veau",
    "Pot-au-feu",
    "Coq-au-vin",
    "Hachis parmentier",
    "Steak tartare",
    "Choucroute",
    "Souffl\xE9 au fromage",
    "Cuisses de grenouilles",
    "Soupe \xE0 l\u2019oignon",
    "Baguette",
    "Croissant",
    "French cheeses",
    "Fondant au chocolat",
    "Tarte tatin",
    "Macarons",
    "Cr\xE8me br\xFBl\xE9e",
    "\xCEle flottante",
    "Profiteroles",
    "Pain au chocolat"
  ],
  lebanon: [
    "Kibbeh",
    "Kafta",
    "Kanafeh",
    "Hummus",
    "Rice pilaf",
    "Fattoush",
    "Manakish",
    "Tabbouleh",
    "Sfeeha",
    "Fattoush",
    "Labneh",
    "Muhammara",
    "Lahm bi ajin",
    "Kaak",
    "Chanklich",
    "Mssabaha",
    "Shawarma",
    "Kebbe",
    "Falafel",
    "Halewit el jeben",
    "Namoura",
    "Maamoul",
    "Foul mdammas",
    "Balila",
    "Kawarma",
    "Fattouch"
  ],
  thailand: [
    "Pad kra pao moo",
    "Tom kha gai",
    "Khao Pad",
    "Chicken pad Thai",
    "Vegetable pad Thai",
    "Moo satay",
    "Tom yum goong",
    "Khao niew mamuang",
    "Kai yad sai",
    "Khao soi",
    "Pad see ew",
    "Laab moo",
    "Gaeng panang",
    "Gai pad med ma muang",
    "Som tam",
    "Poh pia tod",
    "Gaeng massaman",
    "Pla kapung nueng manao",
    "Tod mun pla",
    "Gaeng ped",
    "Gaeng garee",
    "Gaeng keow wan",
    "Moo ping",
    "Durian",
    "Sai ooah",
    "Hoy tod",
    "Kuay teow reua",
    "Mu kratha",
    "Kao ka moo",
    "Yam nua"
  ],
  greece: [
    "Moussaka",
    "Papoutsakia",
    "Pastitsio",
    "Souvlaki",
    "Soutzoukakia",
    "Stifado",
    "Tomatokeftedes",
    "Tzatziki",
    "Kolokithokeftedes",
    "Giouvetsi",
    "Choriatiki",
    "Kleftiko",
    "Gemista",
    "Fasolada",
    "Bougatsa",
    "Tiropita",
    "Spanakopita",
    "Feta Cheese with Honey",
    "Horta",
    "Tirokroketes",
    "Briam",
    "Saganaki",
    "Gigantes",
    "Dolmades",
    "Fasolatha",
    "Koulouri",
    "Loukoumades",
    "Gyros",
    "Galaktoboureko",
    "Baklava"
  ],
  turkey: [
    "\u015Ei\u015F kebap",
    "D\xF6ner",
    "K\xF6fte",
    "Pide",
    "Kumpir",
    "Meze",
    "Mant\u0131",
    "Lahmacun",
    "Menemen",
    "\u015Ei\u015F kebap",
    "\u0130skender kebab",
    "Corba",
    "Kuzu tandir",
    "\xC7i\u011F K\xF6fte",
    "Pilav",
    "Yaprak sarma",
    "Dolma",
    "\u0130mam bay\u0131ld\u0131",
    "Borek",
    "Durum",
    "Kumpir",
    "Balik ekmek",
    "Simit",
    "Kunefe",
    "Baklava",
    "Lokum",
    "Halva",
    "Mozzaik pasta",
    "G\xFClla\xE7",
    "Mercimek K\xF6ftesi",
    "Haydari",
    "Tursu suyu",
    "Kahvalti",
    "Kazan dibi",
    "Hunkar begendi",
    "Islak burgers",
    "Salep",
    "Yogurtlu kebab"
  ],
  spain: [
    "Tortilla de patatas",
    "Fabada asturiana",
    "Cal\xE7ots",
    "Boquerones al vinagre",
    "Empanada gallega",
    "Paella",
    "Gazpacho",
    "Gachas",
    "Migas",
    "Bocadillo de calamares",
    "Pulpo a feira",
    "Caldo gallego",
    "Lentejas con chorizo",
    "Cocido madrile\xF1o",
    "Cachopo",
    "Caracoles"
  ],
  venezuela: [
    "Pabell\xF3n criollo",
    "Arepa",
    "Mondongo",
    "Empanadas",
    "Quesillo",
    "Chicha andina",
    "Teque\xF1os",
    "Cachapa",
    "Hallaca",
    "Perico",
    "Pasticho",
    "Mandocas",
    "Caraotas negras",
    "Patacones",
    "Dulce de leche",
    "Pan de Jam\xF3n"
  ],
  chile: [
    "Humitas",
    "Empanadas",
    "Porotos con riendas",
    "Completos",
    "Manjar",
    "Cordero al palo",
    "Pastel de choclo",
    "Mote con huesillos",
    "Sopaipillas",
    "Curanto"
  ],
  argentina: [
    "Milanesas",
    "Empanadas",
    "Pizza fugazeta",
    "Asado",
    "Choripan",
    "Bondiola",
    "Bife de chorizo"
  ],
  colombia: [
    "Bandeja paisa",
    "Chuleta valluna",
    "Sancocho trif\xE1sico",
    "Empanada valluna",
    "Salpicon de frutas",
    "Pastel de garbanzo",
    "Ajiaco",
    "Arepas",
    "Arroz de lisa",
    "Sancocho",
    "Pan de bono",
    "Cuchuco",
    "Oblea",
    "Cazuela de mariscos",
    "Pan de yuca",
    "Bollo Limpio",
    "Almoj\xE1bana",
    "Empanadas",
    "Arroz con Coco",
    "Sopa de mondongo",
    "Cazuela de Mariscos",
    "Arroz con Pollo",
    "Arepa de Huevo",
    "Mote de Queso"
  ],
  ecuador: [
    "Encebollado",
    "Ceviche",
    "Tigrillo",
    "Bolon de verde",
    "Llapingacho",
    "Mote pillo",
    "Locro de papa",
    "Churrasco"
  ],
  peru: [
    "Ceviche",
    "Arroz con pollo",
    "Aji de gallina",
    "Llunca de gallina"
  ],
  "el salvador": [
    "Pupusa",
    "Sopa de patas",
    "Rigua",
    "Flor de izote con huevo",
    "Gallo en chicha"
  ],
  romania: [
    "Sarmale",
    "Mici",
    "Pomana porcului",
    "Ciorb\u0103 de fasole cu ciolan",
    "Ciorb\u0103 de burt\u0103",
    "Ciorb\u0103 r\u0103d\u0103u\u021Bean\u0103",
    "Pl\u0103cint\u0103 cu br\xE2nz\u0103",
    "Ciorb\u0103 de potroace",
    "M\u0103m\u0103lig\u0103 cu br\xE2nz\u0103 \u0219i sm\xE2nt\xE2n\u0103",
    "Tochitur\u0103",
    "Piftie",
    "Iahnie de fasole",
    "Sl\u0103nin\u0103 afumat\u0103",
    "C\xE2rna\u021Bi afuma\u021Bi",
    "Varz\u0103 a la Cluj",
    "Gula\u0219 de cartofi cu afum\u0103tur\u0103",
    "Cozonac de cas\u0103",
    "Ciorb\u0103 ardeleneasc\u0103 de porc",
    "Mucenici moldovene\u0219ti",
    "Salat\u0103 de boeuf",
    "Dovleac copt",
    "Papana\u0219i cu br\xE2nz\u0103 de vac\u0103 \u0219i afine",
    "Drob de miel",
    "P\xE2rjoale moldovene\u0219ti",
    "Zacusc\u0103 de vinete",
    "Zacusc\u0103 de fasole",
    "Turt\u0103 dulce",
    "Cl\u0103titele cu gem",
    "Cl\u0103titele cu br\xE2nza de vac\u0103",
    "Balmo\u0219",
    "Cozonac",
    "Chiftele"
  ]
};
var _Object$keys$1;
(_Object$keys$1 = Object.keys(data$16)) == null ? void 0 : _Object$keys$1.length;
function randFullName(options) {
  const nameOptions = {
    withAccents: options == null ? void 0 : options.withAccents,
    gender: options == null ? void 0 : options.gender
  };
  return fake(() => `${randFirstName(nameOptions)} ${randLastName(nameOptions)}`, options);
}
var data$Y = [
  "Brand",
  "Tactics",
  "Markets",
  "Usability",
  "Operations",
  "Integration",
  "Identity",
  "Marketing",
  "Creative",
  "Response",
  "Branding",
  "Quality",
  "Program",
  "Accounts",
  "Accountability",
  "Interactions",
  "Security",
  "Applications",
  "Configuration",
  "Factors",
  "Paradigm",
  "Division",
  "Group",
  "Data",
  "Directives",
  "Optimization",
  "Web",
  "Functionality",
  "Research",
  "Intranet",
  "Solutions",
  "Mobility",
  "Communications",
  "Metrics",
  "Assurance"
];
function randJobArea(options) {
  return fake(data$Y, options);
}
function randUuid(options) {
  const v4options = {
    random: randNumber({
      min: 0,
      max: 255,
      length: 16
    })
  };
  return fake(() => v4(v4options), options);
}
var data$l = {
  olympic: [
    "Archery",
    "Artistic Gymnastics",
    "Artistic Swimming",
    "Athletics",
    "Badminton",
    "Baseball Softball",
    "Basketball",
    "Beach Volleyball",
    "BMX Freestyle",
    "BMX Racing",
    "Boxing",
    "Kayak Flatwater",
    "Kayak Slalom",
    "Diving",
    "Equestrian",
    "Fencing",
    "Football",
    "Golf",
    "Handball",
    "Hockey",
    "Judo",
    "Karate",
    "Marathon Swimming",
    "Modern Pentathlon",
    "Mountain Bike",
    "Rhythmic Gymnastics",
    "Road Cycling",
    "Rowing",
    "Rugby",
    "Sailing",
    "Shooting",
    "Skateboarding",
    "Sport Climbing",
    "Surfing",
    "Swimming",
    "Table Tennis",
    "Taekwondo",
    "Tennis",
    "Track Cycling",
    "Trampoline",
    "Triathlon",
    "Volleyball",
    "Water Polo",
    "Weightlifting",
    "Wrestling"
  ],
  winterOlympic: [
    "Alpine Skiing",
    "Biathlon",
    "Bobsleigh",
    "Cross-Country Skiing",
    "Curling",
    "Figure Skating",
    "Freestyle Skiing",
    "Ice Hockey",
    "Luge",
    "Nordic Combined",
    "Short Track Speed Skating",
    "Skeleton",
    "Ski Jumping",
    "Snowboard",
    "Speed Skating"
  ],
  outdoor: [
    "Archery",
    "Athletics",
    "Badminton",
    "Baseball",
    "Basketball",
    "Bowling",
    "Boxing",
    "Camping",
    "Canoeing",
    "Climbing",
    "Cricket",
    "Curling",
    "Cycling",
    "Equestrian",
    "Fencing",
    "Football",
    "Golf",
    "Gymnastics",
    "Handball",
    "Hang Gliding",
    "High Jumping",
    "Hockey",
    "Ice Hockey",
    "Judo",
    "Karate",
    "Kite Flying",
    "Monkey Bars",
    "Motorsports",
    "Netball",
    "Rowing",
    "Rugby",
    "Running",
    "Sailing",
    "Skateboarding",
    "Slide",
    "Snow Skiing",
    "Soccer",
    "Street Hockey",
    "Surfing",
    "Swimming",
    "Table Tennis",
    "Tennis",
    "Trekking",
    "Triathlon",
    "Volleyball",
    "Weightlifting",
    "Wrestling"
  ]
};
var _Object$keys;
(_Object$keys = Object.keys(data$l)) == null ? void 0 : _Object$keys.length;
const userId = "beast~mailinator.com@marvel-x-men";
const types = ["folder-created", "file-copied"];
const templates = [
  { type: "folder-created", locale: "en-GB", content: (payload) => `The folder ${payload.folder} was created by ${payload.user}.` },
  { type: "folder-created", locale: "nb-NO", content: (payload) => `Oppf\xF8ringen ${payload.folder} ble opprettet av ${payload.user}.` },
  { type: "folder-created", locale: "sv-SE", content: (payload) => `Posten ${payload.folder} har skapats av ${payload.user}.` },
  { type: "file-copied", locale: "en-GB", content: (payload) => `File ${payload.file} copied from ${payload.folder} by ${payload.user}.` },
  { type: "file-copied", locale: "nb-NO", content: (payload) => `Filen ${payload.file} ble kopiert fra ${payload.folder} av ${payload.user}.` },
  { type: "file-copied", locale: "sv-SE", content: (payload) => `Filen ${payload.file} kopierades fr\xE5n ${payload.folder} av ${payload.user}.` }
];
let notifications = [];
const generateNotifications = (n2, locale) => {
  const notifications2 = [];
  const currentDate = new Date();
  for (let i = 0; i < n2; i++) {
    const type = rand(types);
    const template = templates.find((t2) => t2.locale === locale && t2.type === type);
    const date = i === 0 ? currentDate : randBetweenDate({ from: new Date("08/04/2022"), to: currentDate });
    let payload = {};
    if (type === "file-copied")
      payload = { file: randFileName(), folder: randJobArea(), user: randFullName() };
    if (type === "folder-created")
      payload = { folder: randJobArea(), user: randFullName() };
    notifications2.push({
      id: randUuid(),
      type,
      userId,
      read: false,
      createdAt: date.toString(),
      updatedAt: date.toString(),
      content: template ? template.content(payload) : "",
      actionUrl: i === 0 ? "" : "https://notifir.github.io/widget"
    });
  }
  return notifications2.sort(
    (a2, b2) => new Date(b2.createdAt).valueOf() - new Date(a2.createdAt).valueOf()
  );
};
const getAllNotifications = () => Promise.resolve({ data: { allNotifications: { nodes: notifications } } });
const markNotificationAsRead = (mockSubscription2, id) => {
  const notification = notifications.find((n2) => n2.id === id);
  if (notification) {
    notification.read = true;
    mockSubscription2.next({ data: { notificationsUpdated: { notification, event: "notification_updated" } } });
    return Promise.resolve({ data: { updateNotificationById: { notification: { id } } } });
  }
  return Promise.resolve({ data: {} });
};
const markAllNotificationsAsRead = (mockSubscription2) => {
  const unreadNotifications = notifications.filter((n2) => !n2.read);
  unreadNotifications.forEach((notification) => {
    notification.read = true;
    mockSubscription2.next({ data: { notificationsUpdated: { notification, event: "notification_updated" } } });
  });
  return Promise.resolve({ data: { markAllNotificationsAsRead: { updated: unreadNotifications.length } } });
};
const mockClient = (locale) => {
  const mockClient2 = dist.createMockClient();
  const mockSubscription2 = dist.createMockSubscription();
  mockClient2.setRequestHandler(getNotifications, getAllNotifications);
  mockClient2.setRequestHandler(notificationChanged, () => mockSubscription2);
  mockClient2.setRequestHandler(markAsRead, (variables) => markNotificationAsRead(mockSubscription2, variables.id));
  mockClient2.setRequestHandler(markAllAsRead, () => markAllNotificationsAsRead(mockSubscription2));
  notifications = generateNotifications(6, locale);
  setTimeout(() => {
    const newNotification = generateNotifications(1, locale)[0];
    notifications.unshift(newNotification);
    mockSubscription2.next({ data: { notificationsUpdated: { notification: newNotification, event: "notification_created" } } });
  }, 15e3);
  setTimeout(() => {
    const newNotification = generateNotifications(1, locale)[0];
    notifications.unshift(newNotification);
    mockSubscription2.next({ data: { notificationsUpdated: { notification: newNotification, event: "notification_created" } } });
  }, 23e3);
  return mockClient2;
};
function normalize(value, delimiter = "-") {
  if (!value)
    return void 0;
  const parts = value.replace(/_/g, "-").split("-");
  if (!parts.length || parts.length > 2)
    return void 0;
  const language = parts.shift();
  if (!language)
    return void 0;
  let result = language.toLowerCase();
  if (!parts.length)
    return result;
  const country = parts.pop();
  if (country)
    result += `${delimiter}${country.toUpperCase()}`;
  return result;
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let NotificationBell = class extends ApolloQuery {
  constructor() {
    super();
    this.mock = false;
    this.apiUrl = "";
    this.apiKey = "";
    this.userId = "";
    this.userHmac = "";
    this.styles = {};
    this.messages = {};
    this.locale = "en-GB";
    this._open = false;
    window.addEventListener("click", (event) => {
      if (this._open && event.target !== this)
        this._changeWidgetVisibility();
    });
  }
  _changeWidgetVisibility() {
    this._open = !this._open;
  }
  async _handleItemClick(id, read, actionUrl) {
    if (this.client && !read)
      await this.client.mutate({ mutation: markAsRead, variables: { id } });
    if (actionUrl)
      window.open(actionUrl, "_self");
  }
  async _markAllAsRead(unreadCount) {
    if (this.client && unreadCount > 0)
      return await this.client.mutate({ mutation: markAllAsRead });
    return null;
  }
  headerTemplate(unreadCount) {
    const styles = this.styles;
    const messages = this.messages;
    return y`
      <div class="header" style=${i$1(styles.header || b)}>
        <span class="header-link" style=${i$1(styles.headerLink || b)} @click="${() => this._markAllAsRead(unreadCount)}">
          ${messages.markAllAsRead || msg("Mark all as read", { id: "mark-all-as-read" })}
        </span>
        <span class="header-title" style=${i$1(styles.headerTitle || b)}>${messages.notifications || msg("Notifications", { id: "notifications" })}</span>
      </div>
    `;
  }
  contentTemplate(items) {
    const { loading: loading2, error } = this;
    const styles = this.styles;
    const messages = this.messages;
    if (loading2)
      return y`<div class="loader-container"><div class="loader"></div></div>`;
    if (error)
      return y`<div class="status error">${messages.error || msg("Something went wrong...", { id: "error" })}</div>`;
    if (!error && items.length === 0)
      return y`<div class="status">${messages.empty || msg("You don\u2019t have any notifications...", { id: "empty" })}</div>`;
    return y`
      <div class="items-list" style=${i$1(styles.itemsList || b)}>
        ${items.map((item) => item.content ? this.itemContentTemplate(item) : b)}
      </div>
    `;
  }
  itemContentTemplate(item) {
    const styles = this.styles;
    return y`
      <div class="item" style=${i$1(styles.itemContent || b)} @click="${() => this._handleItemClick(item.id, item.read, item.actionUrl)}">
        ${!item.read ? y`<div class="item-unread"></div>` : b}
        <div class="item-text-primary" style=${i$1(styles.itemTextPrimary || b)}>
          ${y`${o(item.content)}`}
        </div>
        <div class="item-text-secondary" style=${i$1(styles.itemTextSecondary || b)}>
          ${formatDate(item.createdAt, getLocale())}
        </div>
      </div>
    `;
  }
  render() {
    const { data } = this;
    const styles = this.styles;
    const nodes = data && data.allNotifications && data.allNotifications.nodes;
    const items = nodes || [];
    const unreadCount = items.filter((node) => !node.read && node.content).length;
    return y`
      <div>
        <div class="bell" style=${i$1(styles.bell || b)} @click="${this._changeWidgetVisibility}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
          </svg>
          ${unreadCount > 0 ? y`<div class="bell-counter" style=${i$1(styles.bellCounter || b)}>${unreadCount >= 100 ? "99+" : unreadCount}</div>` : b}
        </div>

        <div class="popup" style=${i$1(styles.popup || b)}>
          <div class="container ${this._open ? "open" : "close"}" style=${i$1(styles.container || b)}>
            ${this.headerTemplate(unreadCount)}
            ${this.contentTemplate(items)}
          </div>
        </div>
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.client = this.mock ? mockClient(this.locale) : client(this.apiUrl, this.apiKey, this.userId, this.userHmac);
    this.variables = { locale: this.locale };
    this.query = getNotifications;
    setLocale(this.locale);
  }
  firstUpdated() {
    this.subscribeToMore({
      document: notificationChanged,
      variables: { apiKey: this.apiKey, userId: this.userId, userHmac: this.userHmac, locale: this.locale },
      updateQuery: (prev, { subscriptionData }) => {
        const { notification, event } = subscriptionData.data.notificationsUpdated;
        const { __typename, nodes } = prev.allNotifications;
        if (event === "notification_created")
          return Object.assign({}, prev, { allNotifications: { __typename, nodes: [notification, ...nodes] } });
        const newNotifications = nodes.map((prev2) => prev2.id === notification.id ? notification : prev2);
        return Object.assign({}, prev, { allNotifications: { __typename, nodes: newNotifications } });
      }
    });
  }
};
NotificationBell.styles = bellStyles;
__decorateClass([
  e$2({ type: Boolean })
], NotificationBell.prototype, "mock", 2);
__decorateClass([
  e$2({ type: String })
], NotificationBell.prototype, "apiUrl", 2);
__decorateClass([
  e$2({ type: String })
], NotificationBell.prototype, "apiKey", 2);
__decorateClass([
  e$2({ type: String })
], NotificationBell.prototype, "userId", 2);
__decorateClass([
  e$2({ type: String })
], NotificationBell.prototype, "userHmac", 2);
__decorateClass([
  e$2({ type: Object })
], NotificationBell.prototype, "styles", 2);
__decorateClass([
  e$2({ type: Object })
], NotificationBell.prototype, "messages", 2);
__decorateClass([
  e$2({ converter: (value) => value ? normalize(value) : "en-GB" })
], NotificationBell.prototype, "locale", 2);
__decorateClass([
  t$1()
], NotificationBell.prototype, "_open", 2);
NotificationBell = __decorateClass([
  localized(),
  e$3("notification-bell")
], NotificationBell);
export { NotificationBell };
