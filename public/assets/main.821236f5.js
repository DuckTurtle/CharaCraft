var Ir = Object.defineProperty;
var jt = Object.getOwnPropertySymbols;
var Hr = Object.prototype.hasOwnProperty,
  Vr = Object.prototype.propertyIsEnumerable;
var Ze = (i, e, r) =>
    e in i
      ? Ir(i, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (i[e] = r),
  Xt = (i, e) => {
    for (var r in e || (e = {})) Hr.call(e, r) && Ze(i, r, e[r]);
    if (jt) for (var r of jt(e)) Vr.call(e, r) && Ze(i, r, e[r]);
    return i;
  };
var et = (i, e, r) => (Ze(i, typeof e != "symbol" ? e + "" : e, r), r);
import { W as Ur } from "./dice-box.es.d522c92c.js";
var zr = "/assets/cancel.75f2fea5.svg",
  Gr = "/assets/checkmark.8c804118.svg",
  jr = "/assets/minus.f88bf51d.svg";
class Xr {
  constructor(e) {
    (this.target = document.querySelector(e) || document.body),
      (this.timeout = 500),
      (this.elem = document.createElement("div")),
      (this.elem.className = "displayResults"),
      (this.resultsElem1 = document.createElement("div")),
      (this.resultsElem1.className = "results hidden"),
      (this.resultsElem1.style.transition = `all ${this.timeout}ms`),
      (this.resultsElem2 = document.createElement("div")),
      (this.resultsElem2.className = "results hidden"),
      (this.resultsElem2.style.transition = `all ${this.timeout}ms`),
      this.init();
  }
  async init() {
    this.elem.append(this.resultsElem1),
      this.elem.append(this.resultsElem2),
      this.target.prepend(this.elem),
      this.resultsElem1.addEventListener("click", () => this.clear()),
      this.resultsElem2.addEventListener("click", () => this.clear()),
      (this.even = !1);
  }
  showResults(e) {
    this.clear(this[`resultsElem${this.even ? 1 : 2}`]);
    let r;
    e.rolls && !Array.isArray(e.rolls)
      ? (r = Object.values(e.rolls).map((n) => n))
      : (r = Object.values(this.recursiveSearch(e, "rolls"))
          .map((n) => Object.values(n))
          .flat());
    let o = e.hasOwnProperty("value")
      ? e.value
      : r.reduce((n, c) => n + c.value, 0);
    o = isNaN(o) ? "..." : o;
    let a = "";
    r.forEach((n, c) => {
      let l,
        t = n.die || n.sides || "fate";
      c !== 0 && (a += ", "),
        n.success !== void 0 && n.success !== null
          ? (l = n.success
              ? `<svg class="success"><use href="${Gr}#checkmark"></use></svg>`
              : n.failures > 0
              ? `<svg class="failure"><use href="${zr}#cancel"></use></svg>`
              : `<svg class="null"><use href="${jr}#minus"></use></svg>`)
          : (l = n.hasOwnProperty("value") ? n.value.toString() : "...");
      let p = `d${t}`;
      (n.critical === "success" ||
        (n.hasOwnProperty("value") && t == n.value)) &&
        (p += " crit-success"),
        (n.critical === "failure" ||
          (n.success === null &&
            n.hasOwnProperty("value") &&
            n.value <= 1 &&
            t !== "fate")) &&
          (p += " crit-failure"),
        n.drop && (p += " die-dropped"),
        n.reroll && (p += " die-rerolled"),
        n.explode && (p += " die-exploded"),
        t === "fate" &&
          (n.value === 1 && (p += " crit-success"),
          n.value === -1 && (p += " crit-failure")),
        p !== "" && (l = `<span class='${p.trim()}'>${l}</span>`),
        (a += l);
    }),
      (a += ` = <strong>${o}</strong>`);
    const d = this[`resultsElem${this.even ? 2 : 1}`];
    (d.innerHTML = a),
      clearTimeout(d.hideTimer),
      d.classList.add("showEffect"),
      d.classList.remove("hidden"),
      d.classList.remove("hideEffect"),
      (this.even = !this.even);
  }
  clear(e) {
    const r = e || this[`resultsElem${this.even ? 1 : 2}`];
    r.classList.replace("showEffect", "hideEffect"),
      (this.even = !this.even),
      (r.hideTimer = setTimeout(
        () => r.classList.replace("hideEffect", "hidden"),
        this.timeout
      ));
  }
  recursiveSearch(e, r, o = [], a) {
    const d = o;
    return (
      Object.keys(e).forEach((n) => {
        const c = e[n];
        n === r
          ? (d.push(c), a && typeof a == "function" && a(e))
          : c && typeof c == "object" && this.recursiveSearch(c, r, d, a);
      }),
      d
    );
  }
}
var Yr =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : typeof self != "undefined"
      ? self
      : {},
  or = { exports: {} };
(function (i, e) {
  (function (r, o) {
    i.exports = o();
  })(Yr, () =>
    (() => {
      var r = {
          95: (a, d, n) => {
            Object.defineProperty(d, "__esModule", { value: !0 }),
              (d.DiceRoller = void 0);
            const c = n(51);
            d.DiceRoller = class {
              constructor(l, t = 1e3) {
                (this.randFunction = Math.random),
                  (this.maxRollCount = 1e3),
                  l && (this.randFunction = l),
                  (this.maxRollCount = t);
              }
              parse(l) {
                return c.parse(l);
              }
              roll(l) {
                const t = c.parse(l);
                return this.rollType(t);
              }
              rollValue(l) {
                return this.roll(l).value;
              }
              rollParsed(l) {
                return this.rollType(l);
              }
              rollType(l) {
                let t;
                switch (l.type) {
                  case "diceExpression":
                    t = this.rollDiceExpr(l);
                    break;
                  case "group":
                    t = this.rollGroup(l);
                    break;
                  case "die":
                    t = this.rollDie(l);
                    break;
                  case "expression":
                    t = this.rollExpression(l);
                    break;
                  case "mathfunction":
                    t = this.rollFunction(l);
                    break;
                  case "inline":
                    t = this.rollType(l.expr);
                    break;
                  case "number":
                    t = Object.assign(Object.assign({}, l), {
                      success: null,
                      successes: 0,
                      failures: 0,
                      valid: !0,
                      order: 0,
                    });
                    break;
                  default:
                    throw new Error(`Unable to render ${l.type}`);
                }
                return l.label && (t.label = l.label), t;
              }
              rollDiceExpr(l) {
                const t = this.rollType(l.head),
                  p = [t],
                  m = [],
                  h = l.ops.reduce((y, R, C) => {
                    const E = this.rollType(R.tail);
                    switch (((E.order = C), p.push(E), m.push(R.op), R.op)) {
                      case "+":
                        return y + E.value;
                      case "-":
                        return y - E.value;
                      default:
                        return y;
                    }
                  }, t.value);
                return {
                  dice: p,
                  ops: m,
                  success: null,
                  successes: 0,
                  failures: 0,
                  type: "diceexpressionroll",
                  valid: !0,
                  value: h,
                  order: 0,
                };
              }
              rollGroup(l) {
                let t = l.rolls.map((R, C) =>
                    Object.assign(Object.assign({}, this.rollType(R)), {
                      order: C,
                    })
                  ),
                  p = 0,
                  m = 0,
                  h = !1;
                if (l.mods) {
                  const R = l.mods,
                    C = (E) => (
                      (h = R.some((S) =>
                        ["failure", "success"].includes(S.type)
                      )),
                      (E = R.reduce((S, L) => this.applyGroupMod(S, L), E)),
                      h &&
                        (E = E.map(
                          (S) => (
                            (p += S.successes),
                            (m += S.failures),
                            (S.value = S.successes - S.failures),
                            (S.success = S.value > 0),
                            S
                          )
                        )),
                      E
                    );
                  if (
                    t.length === 1 &&
                    ["die", "diceexpressionroll"].includes(t[0].type)
                  ) {
                    const E = t[0];
                    let S =
                      E.type === "die"
                        ? E.rolls
                        : E.dice
                            .filter((L) => L.type !== "number")
                            .reduce(
                              (L, V) => [
                                ...L,
                                ...(V.type === "die" ? V.rolls : V.dice),
                              ],
                              []
                            );
                    (S = C(S)),
                      (E.value = S.reduce(
                        (L, V) => (V.valid ? L + V.value : L),
                        0
                      ));
                  } else t = C(t);
                }
                const y = t.reduce((R, C) => (C.valid ? R + C.value : R), 0);
                return {
                  dice: t,
                  success: h ? y > 0 : null,
                  successes: p,
                  failures: m,
                  type: "grouproll",
                  valid: !0,
                  value: y,
                  order: 0,
                };
              }
              rollDie(l) {
                const t = this.rollType(l.count);
                if (t.value > this.maxRollCount)
                  throw new Error("Entered number of dice too large.");
                let p, m;
                l.die.type === "fate"
                  ? ((m = {
                      type: "fate",
                      success: null,
                      successes: 0,
                      failures: 0,
                      valid: !1,
                      value: 0,
                      order: 0,
                    }),
                    (p = Array.from({ length: t.value }, (S, L) =>
                      this.generateFateRoll(L)
                    )))
                  : ((m = this.rollType(l.die)),
                    (p = Array.from({ length: t.value }, (S, L) =>
                      this.generateDiceRoll(m.value, L)
                    ))),
                  l.mods &&
                    (p = l.mods.reduce((S, L) => this.applyMod(S, L), p));
                let h = 0,
                  y = 0;
                l.targets &&
                  (p = l.targets
                    .reduce((S, L) => this.applyMod(S, L), p)
                    .map(
                      (S) => (
                        (h += S.successes),
                        (y += S.failures),
                        (S.value = S.successes - S.failures),
                        (S.success = S.value > 0),
                        S
                      )
                    ));
                let R = !1,
                  C = 0;
                if (l.match) {
                  const S = l.match,
                    L = p.reduce(
                      (U, W) => U.set(W.roll, (U.get(W.roll) || 0) + 1),
                      new Map()
                    ),
                    V = new Set(
                      Array.from(L.entries())
                        .filter(([U, W]) => W >= S.min.value)
                        .filter(
                          ([U]) =>
                            !(S.mod && S.expr) ||
                            this.successTest(
                              S.mod,
                              this.rollType(S.expr).value,
                              U
                            )
                        )
                        .map(([U]) => U)
                    );
                  p
                    .filter((U) => V.has(U.roll))
                    .forEach((U) => (U.matched = !0)),
                    S.count && ((R = !0), (C = V.size));
                }
                l.sort && (p = this.applySort(p, l.sort));
                const E = p.reduce((S, L) => (L.valid ? S + L.value : S), 0);
                return {
                  count: t,
                  die: m,
                  rolls: p,
                  success: l.targets ? E > 0 : null,
                  successes: h,
                  failures: y,
                  type: "die",
                  valid: !0,
                  value: R ? C : E,
                  order: 0,
                  matched: R,
                };
              }
              rollExpression(l) {
                const t = this.rollType(l.head),
                  p = [t],
                  m = [],
                  h = l.ops.reduce((y, R) => {
                    const C = this.rollType(R.tail);
                    switch ((p.push(C), m.push(R.op), R.op)) {
                      case "+":
                        return y + C.value;
                      case "-":
                        return y - C.value;
                      case "*":
                        return y * C.value;
                      case "/":
                        return y / C.value;
                      case "%":
                        return y % C.value;
                      case "**":
                        return y ** C.value;
                      default:
                        return y;
                    }
                  }, t.value);
                return {
                  dice: p,
                  ops: m,
                  success: null,
                  successes: 0,
                  failures: 0,
                  type: "expressionroll",
                  valid: !0,
                  value: h,
                  order: 0,
                };
              }
              rollFunction(l) {
                const t = this.rollType(l.expr);
                let p;
                switch (l.op) {
                  case "floor":
                    p = Math.floor(t.value);
                    break;
                  case "ceil":
                    p = Math.ceil(t.value);
                    break;
                  case "round":
                    p = Math.round(t.value);
                    break;
                  case "abs":
                    p = Math.abs(t.value);
                    break;
                  default:
                    p = t.value;
                }
                return {
                  expr: t,
                  op: l.op,
                  success: null,
                  successes: 0,
                  failures: 0,
                  type: "mathfunction",
                  valid: !0,
                  value: p,
                  order: 0,
                };
              }
              applyGroupMod(l, t) {
                return this.getGroupModMethod(t)(l);
              }
              getGroupModMethod(l) {
                const t = (p) => p.value;
                switch (l.type) {
                  case "success":
                    return this.getSuccessMethod(l, t);
                  case "failure":
                    return this.getFailureMethod(l, t);
                  case "keep":
                    return this.getKeepMethod(l, t);
                  case "drop":
                    return this.getDropMethod(l, t);
                  default:
                    throw new Error(`Mod ${l.type} is not recognised`);
                }
              }
              applyMod(l, t) {
                return this.getModMethod(t)(l);
              }
              getModMethod(l) {
                const t = (p) => p.roll;
                switch (l.type) {
                  case "success":
                    return this.getSuccessMethod(l, t);
                  case "failure":
                    return this.getFailureMethod(l, t);
                  case "crit":
                    return this.getCritSuccessMethod(l, t);
                  case "critfail":
                    return this.getCritFailureMethod(l, t);
                  case "keep":
                    return (p) =>
                      this.getKeepMethod(
                        l,
                        t
                      )(p).sort((m, h) => m.order - h.order);
                  case "drop":
                    return (p) =>
                      this.getDropMethod(
                        l,
                        t
                      )(p).sort((m, h) => m.order - h.order);
                  case "explode":
                    return this.getExplodeMethod(l);
                  case "compound":
                    return this.getCompoundMethod(l);
                  case "penetrate":
                    return this.getPenetrateMethod(l);
                  case "reroll":
                    return this.getReRollMethod(l);
                  case "rerollOnce":
                    return this.getReRollOnceMethod(l);
                  default:
                    throw new Error(`Mod ${l.type} is not recognised`);
                }
              }
              applySort(l, t) {
                return (
                  l.sort((p, m) => (t.asc ? p.roll - m.roll : m.roll - p.roll)),
                  l.forEach((p, m) => (p.order = m)),
                  l
                );
              }
              getCritSuccessMethod(l, t) {
                const p = this.rollType(l.expr);
                return (m) =>
                  m.map((h) => {
                    if (!h.valid || h.type !== "roll" || h.success) return h;
                    const y = h;
                    return (
                      this.successTest(l.mod, p.value, t(h))
                        ? (y.critical = "success")
                        : y.critical === "success" && (y.critical = null),
                      h
                    );
                  });
              }
              getCritFailureMethod(l, t) {
                const p = this.rollType(l.expr);
                return (m) =>
                  m.map((h) => {
                    if (!h.valid || h.type !== "roll" || h.success) return h;
                    const y = h;
                    return (
                      this.successTest(l.mod, p.value, t(h))
                        ? (y.critical = "failure")
                        : y.critical === "failure" && (y.critical = null),
                      h
                    );
                  });
              }
              getSuccessMethod(l, t) {
                const p = this.rollType(l.expr);
                return (m) =>
                  m.map(
                    (h) => (
                      h.valid &&
                        this.successTest(l.mod, p.value, t(h)) &&
                        (h.successes += 1),
                      h
                    )
                  );
              }
              getFailureMethod(l, t) {
                const p = this.rollType(l.expr);
                return (m) =>
                  m.map(
                    (h) => (
                      h.valid &&
                        this.successTest(l.mod, p.value, t(h)) &&
                        (h.failures += 1),
                      h
                    )
                  );
              }
              getKeepMethod(l, t) {
                const p = this.rollType(l.expr);
                return (m) => {
                  if (m.length === 0) return m;
                  m = m
                    .sort((E, S) =>
                      l.highlow === "l" ? t(S) - t(E) : t(E) - t(S)
                    )
                    .sort((E, S) => (E.valid ? 1 : 0) - (S.valid ? 1 : 0));
                  const h = Math.max(Math.min(p.value, m.length), 0);
                  let y = 0,
                    R = 0;
                  const C = m.reduce((E, S) => (S.valid ? 1 : 0) + E, 0) - h;
                  for (; R < m.length && y < C; )
                    m[R].valid && ((m[R].valid = !1), (m[R].drop = !0), y++),
                      R++;
                  return m;
                };
              }
              getDropMethod(l, t) {
                const p = this.rollType(l.expr);
                return (m) => {
                  m = m.sort((C, E) =>
                    l.highlow === "h" ? t(E) - t(C) : t(C) - t(E)
                  );
                  const h = Math.max(Math.min(p.value, m.length), 0);
                  let y = 0,
                    R = 0;
                  for (; R < m.length && y < h; )
                    m[R].valid && ((m[R].valid = !1), (m[R].drop = !0), y++),
                      R++;
                  return m;
                };
              }
              getExplodeMethod(l) {
                const t = l.target ? this.rollType(l.target.value) : null;
                return (p) => {
                  const m = t
                    ? (h) => this.successTest(l.target.mod, t.value, h.roll)
                    : (h) =>
                        this.successTest(
                          "=",
                          h.type === "fateroll" ? 1 : h.die,
                          h.roll
                        );
                  if (
                    p[0].type === "roll" &&
                    m({ roll: 1 }) &&
                    m({ roll: p[0].die })
                  )
                    throw new Error("Invalid reroll target");
                  for (let h = 0; h < p.length; h++) {
                    let y = p[h];
                    y.order = h;
                    let R = 0;
                    for (; m(y) && R++ < 1e3; ) {
                      y.explode = !0;
                      const C = this.reRoll(y, ++h);
                      p.splice(h, 0, C), (y = C);
                    }
                  }
                  return p;
                };
              }
              getCompoundMethod(l) {
                const t = l.target ? this.rollType(l.target.value) : null;
                return (p) => {
                  const m = t
                    ? (h) => this.successTest(l.target.mod, t.value, h.roll)
                    : (h) =>
                        this.successTest(
                          "=",
                          h.type === "fateroll" ? 1 : h.die,
                          h.roll
                        );
                  if (
                    p[0].type === "roll" &&
                    m({ roll: 1 }) &&
                    m({ roll: p[0].die })
                  )
                    throw new Error("Invalid reroll target");
                  for (let h = 0; h < p.length; h++) {
                    let y = p[h],
                      R = y.roll,
                      C = 0;
                    for (; m(y) && C++ < 1e3; ) {
                      y.explode = !0;
                      const E = this.reRoll(y, h + 1);
                      (R += E.roll), (y = E);
                    }
                    (p[h].value = R), (p[h].roll = R);
                  }
                  return p;
                };
              }
              getPenetrateMethod(l) {
                const t = l.target ? this.rollType(l.target.value) : null;
                return (p) => {
                  const m = t
                    ? (h) => this.successTest(l.target.mod, t.value, h.roll)
                    : (h) =>
                        this.successTest(
                          "=",
                          h.type === "fateroll" ? 1 : h.die,
                          h.roll
                        );
                  if (
                    t &&
                    p[0].type === "roll" &&
                    m(p[0]) &&
                    this.successTest(l.target.mod, t.value, 1)
                  )
                    throw new Error("Invalid reroll target");
                  for (let h = 0; h < p.length; h++) {
                    let y = p[h];
                    y.order = h;
                    let R = 0;
                    for (; m(y) && R++ < 1e3; ) {
                      y.explode = !0;
                      const C = this.reRoll(y, ++h);
                      (C.value -= 1), p.splice(h, 0, C), (y = C);
                    }
                  }
                  return p;
                };
              }
              getReRollMethod(l) {
                const t = l.target
                  ? this.successTest.bind(
                      null,
                      l.target.mod,
                      this.rollType(l.target.value).value
                    )
                  : this.successTest.bind(null, "=", 1);
                return (p) => {
                  if (p[0].type === "roll" && t(1) && t(p[0].die))
                    throw new Error("Invalid reroll target");
                  for (let m = 0; m < p.length; m++)
                    for (; t(p[m].roll); ) {
                      (p[m].reroll = !0), (p[m].valid = !1);
                      const h = this.reRoll(p[m], m + 1);
                      p.splice(++m, 0, h);
                    }
                  return p;
                };
              }
              getReRollOnceMethod(l) {
                const t = l.target
                  ? this.successTest.bind(
                      null,
                      l.target.mod,
                      this.rollType(l.target.value).value
                    )
                  : this.successTest.bind(null, "=", 1);
                return (p) => {
                  if (p[0].type === "roll" && t(1) && t(p[0].die))
                    throw new Error("Invalid reroll target");
                  for (let m = 0; m < p.length; m++)
                    if (t(p[m].roll)) {
                      (p[m].reroll = !0), (p[m].valid = !1);
                      const h = this.reRoll(p[m], m + 1);
                      p.splice(++m, 0, h);
                    }
                  return p;
                };
              }
              successTest(l, t, p) {
                switch (l) {
                  case ">":
                    return p >= t;
                  case "<":
                    return p <= t;
                  default:
                    return p == t;
                }
              }
              reRoll(l, t) {
                switch (l.type) {
                  case "roll":
                    return this.generateDiceRoll(l.die, t);
                  case "fateroll":
                    return this.generateFateRoll(t);
                  default:
                    throw new Error(`Cannot do a reroll of a ${l.type}.`);
                }
              }
              generateDiceRoll(l, t) {
                const p = parseInt((this.randFunction() * l).toFixed(), 10) + 1;
                return {
                  critical: p === l ? "success" : p === 1 ? "failure" : null,
                  die: l,
                  matched: !1,
                  order: t,
                  roll: p,
                  success: null,
                  successes: 0,
                  failures: 0,
                  type: "roll",
                  valid: !0,
                  value: p,
                };
              }
              generateFateRoll(l) {
                const t = Math.floor(3 * this.randFunction()) - 1;
                return {
                  matched: !1,
                  order: l,
                  roll: t,
                  success: null,
                  successes: 0,
                  failures: 0,
                  type: "fateroll",
                  valid: !0,
                  value: t,
                };
              }
            };
          },
          619: (a, d) => {
            Object.defineProperty(d, "__esModule", { value: !0 }),
              (d.DiscordRollRenderer = void 0),
              (d.DiscordRollRenderer = class {
                render(n) {
                  return this.doRender(n, !0);
                }
                doRender(n, c = !1) {
                  let l = "";
                  switch (n.type) {
                    case "diceexpressionroll":
                      l = this.renderGroupExpr(n);
                      break;
                    case "grouproll":
                      l = this.renderGroup(n);
                      break;
                    case "die":
                      l = this.renderDie(n);
                      break;
                    case "expressionroll":
                      l = this.renderExpression(n);
                      break;
                    case "mathfunction":
                      l = this.renderFunction(n);
                      break;
                    case "roll":
                      return this.renderRoll(n);
                    case "fateroll":
                      return this.renderFateRoll(n);
                    case "number":
                      const t = n.label ? ` (${n.label})` : "";
                      return `${n.value}${t}`;
                    case "fate":
                      return "F";
                    default:
                      throw new Error("Unable to render");
                  }
                  return (
                    n.valid || (l = "~~" + l.replace(/~~/g, "") + "~~"),
                    c
                      ? this.stripBrackets(l)
                      : n.label
                      ? `(${n.label}: ${l})`
                      : l
                  );
                }
                renderGroup(n) {
                  const c = [];
                  for (const l of n.dice) c.push(this.doRender(l));
                  return c.length > 1
                    ? `{ ${c.join(" + ")} } = ${n.value}`
                    : `{ ${this.stripBrackets(c[0])} } = ${n.value}`;
                }
                renderGroupExpr(n) {
                  const c = [];
                  for (const l of n.dice) c.push(this.doRender(l));
                  return c.length > 1
                    ? `(${c.join(" + ")} = ${n.value})`
                    : c[0];
                }
                renderDie(n) {
                  const c = [];
                  for (const p of n.rolls) c.push(this.doRender(p));
                  let l = `${c.join(", ")}`;
                  (["number", "fate"].includes(n.die.type) &&
                    n.count.type === "number") ||
                    (l += `[*Rolling: ${this.doRender(n.count)}d${this.doRender(
                      n.die
                    )}*]`);
                  const t = n.matched
                    ? " Match" + (n.value === 1 ? "" : "es")
                    : "";
                  return (l += ` = ${n.value}${t}`), `(${l})`;
                }
                renderExpression(n) {
                  if (n.dice.length > 1) {
                    const c = [];
                    for (let l = 0; l < n.dice.length - 1; l++)
                      c.push(this.doRender(n.dice[l])), c.push(n.ops[l]);
                    return (
                      c.push(this.doRender(n.dice.slice(-1)[0])),
                      c.push("="),
                      c.push(n.value + ""),
                      `(${c.join(" ")})`
                    );
                  }
                  return n.dice[0].type === "number"
                    ? n.value + ""
                    : this.doRender(n.dice[0]);
                }
                renderFunction(n) {
                  const c = this.doRender(n.expr);
                  return `(${n.op}${this.addBrackets(c)} = ${n.value})`;
                }
                addBrackets(n) {
                  return (
                    n.startsWith("(") || (n = `(${n}`),
                    n.endsWith(")") || (n = `${n})`),
                    n
                  );
                }
                stripBrackets(n) {
                  return (
                    n.startsWith("(") && (n = n.substring(1)),
                    n.endsWith(")") && (n = n.substring(0, n.length - 1)),
                    n
                  );
                }
                renderRoll(n) {
                  let c = `${n.roll}`;
                  return (
                    n.valid
                      ? n.success && n.value === 1
                        ? (c = `**${n.roll}**`)
                        : n.success && n.value === -1
                        ? (c = `*${n.roll}*`)
                        : n.success || n.critical !== "success"
                        ? n.success ||
                          n.critical !== "failure" ||
                          (c = `*${n.roll}*`)
                        : (c = `**${n.roll}**`)
                      : (c = `~~${n.roll}~~`),
                    n.matched && (c = `__${c}__`),
                    c
                  );
                }
                renderFateRoll(n) {
                  const c = n.roll === 0 ? "0" : n.roll > 0 ? "+" : "-";
                  let l = `${n.roll}`;
                  return (
                    n.valid
                      ? n.success && n.value === 1
                        ? (l = `**${c}**`)
                        : n.success && n.value === -1 && (l = `*${c}*`)
                      : (l = `~~${c}~~`),
                    n.matched && (l = `__${l}__`),
                    l
                  );
                }
              });
          },
          607: function (a, d, n) {
            var c =
                (this && this.__createBinding) ||
                (Object.create
                  ? function (t, p, m, h) {
                      h === void 0 && (h = m);
                      var y = Object.getOwnPropertyDescriptor(p, m);
                      (y &&
                        !("get" in y
                          ? !p.__esModule
                          : y.writable || y.configurable)) ||
                        (y = {
                          enumerable: !0,
                          get: function () {
                            return p[m];
                          },
                        }),
                        Object.defineProperty(t, h, y);
                    }
                  : function (t, p, m, h) {
                      h === void 0 && (h = m), (t[h] = p[m]);
                    }),
              l =
                (this && this.__exportStar) ||
                function (t, p) {
                  for (var m in t)
                    m === "default" ||
                      Object.prototype.hasOwnProperty.call(p, m) ||
                      c(p, t, m);
                };
            Object.defineProperty(d, "__esModule", { value: !0 }),
              l(n(95), d),
              l(n(604), d),
              l(n(234), d),
              l(n(619), d),
              l(n(54), d);
          },
          604: (a, d) => {
            Object.defineProperty(d, "__esModule", { value: !0 });
          },
          234: (a, d) => {
            Object.defineProperty(d, "__esModule", { value: !0 });
          },
          54: (a, d) => {
            Object.defineProperty(d, "__esModule", { value: !0 });
          },
          51: (a) => {
            function d(n, c, l, t) {
              (this.message = n),
                (this.expected = c),
                (this.found = l),
                (this.location = t),
                (this.name = "SyntaxError"),
                typeof Error.captureStackTrace == "function" &&
                  Error.captureStackTrace(this, d);
            }
            (function (n, c) {
              function l() {
                this.constructor = n;
              }
              (l.prototype = c.prototype), (n.prototype = new l());
            })(d, Error),
              (d.buildMessage = function (n, c) {
                var l = {
                  literal: function (h) {
                    return '"' + p(h.text) + '"';
                  },
                  class: function (h) {
                    var y,
                      R = "";
                    for (y = 0; y < h.parts.length; y++)
                      R +=
                        h.parts[y] instanceof Array
                          ? m(h.parts[y][0]) + "-" + m(h.parts[y][1])
                          : m(h.parts[y]);
                    return "[" + (h.inverted ? "^" : "") + R + "]";
                  },
                  any: function (h) {
                    return "any character";
                  },
                  end: function (h) {
                    return "end of input";
                  },
                  other: function (h) {
                    return h.description;
                  },
                };
                function t(h) {
                  return h.charCodeAt(0).toString(16).toUpperCase();
                }
                function p(h) {
                  return h
                    .replace(/\\/g, "\\\\")
                    .replace(/"/g, '\\"')
                    .replace(/\0/g, "\\0")
                    .replace(/\t/g, "\\t")
                    .replace(/\n/g, "\\n")
                    .replace(/\r/g, "\\r")
                    .replace(/[\x00-\x0F]/g, function (y) {
                      return "\\x0" + t(y);
                    })
                    .replace(/[\x10-\x1F\x7F-\x9F]/g, function (y) {
                      return "\\x" + t(y);
                    });
                }
                function m(h) {
                  return h
                    .replace(/\\/g, "\\\\")
                    .replace(/\]/g, "\\]")
                    .replace(/\^/g, "\\^")
                    .replace(/-/g, "\\-")
                    .replace(/\0/g, "\\0")
                    .replace(/\t/g, "\\t")
                    .replace(/\n/g, "\\n")
                    .replace(/\r/g, "\\r")
                    .replace(/[\x00-\x0F]/g, function (y) {
                      return "\\x0" + t(y);
                    })
                    .replace(/[\x10-\x1F\x7F-\x9F]/g, function (y) {
                      return "\\x" + t(y);
                    });
                }
                return (
                  "Expected " +
                  (function (h) {
                    var y,
                      R,
                      C,
                      E = new Array(h.length);
                    for (y = 0; y < h.length; y++)
                      E[y] = ((C = h[y]), l[C.type](C));
                    if ((E.sort(), E.length > 0)) {
                      for (y = 1, R = 1; y < E.length; y++)
                        E[y - 1] !== E[y] && ((E[R] = E[y]), R++);
                      E.length = R;
                    }
                    switch (E.length) {
                      case 1:
                        return E[0];
                      case 2:
                        return E[0] + " or " + E[1];
                      default:
                        return (
                          E.slice(0, -1).join(", ") + ", or " + E[E.length - 1]
                        );
                    }
                  })(n) +
                  " but " +
                  (function (h) {
                    return h ? '"' + p(h) + '"' : "end of input";
                  })(c) +
                  " found."
                );
              }),
              (a.exports = {
                SyntaxError: d,
                parse: function (n, c) {
                  c = c !== void 0 ? c : {};
                  var l,
                    t = {},
                    p = { start: Dt },
                    m = Dt,
                    h = { type: "any" },
                    y = F("[[", !1),
                    R = F("]]", !1),
                    C = function (u, f) {
                      return f && (u.label = f), u;
                    },
                    E = ">",
                    S = F(">", !1),
                    L = "<",
                    V = F("<", !1),
                    U = "=",
                    W = F("=", !1),
                    ht = F("f", !1),
                    _r = F("cs", !1),
                    mr = F("cf", !1),
                    gr = F("m", !1),
                    vr = F("t", !1),
                    br = F("k", !1),
                    ft = F("l", !1),
                    pt = F("h", !1),
                    Ne = F("d", !1),
                    yr = F("{", !1),
                    _t = F(",", !1),
                    xr = F("}", !1),
                    ye = "+",
                    xe = F("+", !1),
                    wr = F("s", !1),
                    Cr = F("a", !1),
                    Er = F("!", !1),
                    Ar = F("!!", !1),
                    Rr = F("!p", !1),
                    Sr = F("r", !1),
                    kr = F("ro", !1),
                    Or = F("F", !1),
                    Be = F("%", !1),
                    mt = F("(", !1),
                    gt = F(")", !1),
                    $e = F("-", !1),
                    Ie = function (u, f) {
                      return f.length == 0
                        ? u
                        : {
                            head: u,
                            type: "expression",
                            ops: f.map((_) => ({
                              type: "math",
                              op: _[1],
                              tail: _[3],
                            })),
                          };
                    },
                    vt = F("*", !1),
                    bt = F("/", !1),
                    we = "**",
                    yt = F("**", !1),
                    xt = "floor",
                    Tr = F("floor", !1),
                    wt = "ceil",
                    Fr = F("ceil", !1),
                    Ct = "round",
                    Lr = F("round", !1),
                    Dr = F("abs", !1),
                    Mr = Tt("integer"),
                    Et = /^[0-9]/,
                    At = Ve([["0", "9"]], !1, !1),
                    Pr = F("[", !1),
                    Rt = /^[^\]]/,
                    St = Ve(["]"], !0, !1),
                    Nr = F("]", !1),
                    Br = Tt("whitespace"),
                    kt = /^[ \t\n\r]/,
                    Ot = Ve(
                      [
                        " ",
                        "	",
                        `
`,
                        "\r",
                      ],
                      !1,
                      !1
                    ),
                    s = 0,
                    M = 0,
                    Ce = [{ line: 1, column: 1 }],
                    te = 0,
                    He = [],
                    x = 0;
                  if ("startRule" in c) {
                    if (!(c.startRule in p))
                      throw new Error(
                        `Can't start parsing from rule "` + c.startRule + '".'
                      );
                    m = p[c.startRule];
                  }
                  function F(u, f) {
                    return { type: "literal", text: u, ignoreCase: f };
                  }
                  function Ve(u, f, _) {
                    return {
                      type: "class",
                      parts: u,
                      inverted: f,
                      ignoreCase: _,
                    };
                  }
                  function Tt(u) {
                    return { type: "other", description: u };
                  }
                  function Ft(u) {
                    var f,
                      _ = Ce[u];
                    if (_) return _;
                    for (f = u - 1; !Ce[f]; ) f--;
                    for (
                      _ = { line: (_ = Ce[f]).line, column: _.column };
                      f < u;

                    )
                      n.charCodeAt(f) === 10
                        ? (_.line++, (_.column = 1))
                        : _.column++,
                        f++;
                    return (Ce[u] = _), _;
                  }
                  function Lt(u, f) {
                    var _ = Ft(u),
                      v = Ft(f);
                    return {
                      start: { offset: u, line: _.line, column: _.column },
                      end: { offset: f, line: v.line, column: v.column },
                    };
                  }
                  function w(u) {
                    s < te || (s > te && ((te = s), (He = [])), He.push(u));
                  }
                  function Dt() {
                    var u, f, _, v, k, A;
                    if (((u = s), (f = Ge()) !== t)) {
                      for (
                        _ = [],
                          n.length > s
                            ? ((v = n.charAt(s)), s++)
                            : ((v = t), x === 0 && w(h));
                        v !== t;

                      )
                        _.push(v),
                          n.length > s
                            ? ((v = n.charAt(s)), s++)
                            : ((v = t), x === 0 && w(h));
                      _ !== t
                        ? ((M = u),
                          (A = _),
                          ((k = f).root = !0),
                          A && (k.label = A.join("")),
                          (u = f = k))
                        : ((s = u), (u = t));
                    } else (s = u), (u = t);
                    return u;
                  }
                  function Ee() {
                    var u, f, _;
                    return (
                      (u = s),
                      n.charCodeAt(s) === 62
                        ? ((f = E), s++)
                        : ((f = t), x === 0 && w(S)),
                      f === t &&
                        (n.charCodeAt(s) === 60
                          ? ((f = L), s++)
                          : ((f = t), x === 0 && w(V)),
                        f === t &&
                          (n.charCodeAt(s) === 61
                            ? ((f = U), s++)
                            : ((f = t), x === 0 && w(W)))),
                      f !== t && (_ = re()) !== t
                        ? ((M = u),
                          (u = f = { type: "success", mod: f, expr: _ }))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function Ae() {
                    var u, f, _, v;
                    return (
                      (u = s),
                      n.charCodeAt(s) === 102
                        ? ((f = "f"), s++)
                        : ((f = t), x === 0 && w(ht)),
                      f !== t
                        ? (n.charCodeAt(s) === 62
                            ? ((_ = E), s++)
                            : ((_ = t), x === 0 && w(S)),
                          _ === t &&
                            (n.charCodeAt(s) === 60
                              ? ((_ = L), s++)
                              : ((_ = t), x === 0 && w(V)),
                            _ === t &&
                              (n.charCodeAt(s) === 61
                                ? ((_ = U), s++)
                                : ((_ = t), x === 0 && w(W)))),
                          _ === t && (_ = null),
                          _ !== t && (v = re()) !== t
                            ? ((M = u),
                              (u = f = { type: "failure", mod: _, expr: v }))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function Mt() {
                    var u, f, _, v;
                    return (
                      (u = s),
                      n.substr(s, 2) === "cs"
                        ? ((f = "cs"), (s += 2))
                        : ((f = t), x === 0 && w(_r)),
                      f !== t
                        ? (n.charCodeAt(s) === 62
                            ? ((_ = E), s++)
                            : ((_ = t), x === 0 && w(S)),
                          _ === t &&
                            (n.charCodeAt(s) === 60
                              ? ((_ = L), s++)
                              : ((_ = t), x === 0 && w(V)),
                            _ === t &&
                              (n.charCodeAt(s) === 61
                                ? ((_ = U), s++)
                                : ((_ = t), x === 0 && w(W)))),
                          _ === t && (_ = null),
                          _ !== t && (v = re()) !== t
                            ? ((M = u),
                              (u = f = { type: "crit", mod: _, expr: v }))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function Pt() {
                    var u, f, _, v;
                    return (
                      (u = s),
                      n.substr(s, 2) === "cf"
                        ? ((f = "cf"), (s += 2))
                        : ((f = t), x === 0 && w(mr)),
                      f !== t
                        ? (n.charCodeAt(s) === 62
                            ? ((_ = E), s++)
                            : ((_ = t), x === 0 && w(S)),
                          _ === t &&
                            (n.charCodeAt(s) === 60
                              ? ((_ = L), s++)
                              : ((_ = t), x === 0 && w(V)),
                            _ === t &&
                              (n.charCodeAt(s) === 61
                                ? ((_ = U), s++)
                                : ((_ = t), x === 0 && w(W)))),
                          _ === t && (_ = null),
                          _ !== t && (v = re()) !== t
                            ? ((M = u),
                              (u = f = { type: "critfail", mod: _, expr: v }))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function Re() {
                    var u, f, _, v;
                    return (
                      (u = s),
                      n.charCodeAt(s) === 107
                        ? ((f = "k"), s++)
                        : ((f = t), x === 0 && w(br)),
                      f !== t
                        ? (n.charCodeAt(s) === 108
                            ? ((_ = "l"), s++)
                            : ((_ = t), x === 0 && w(ft)),
                          _ === t &&
                            (n.charCodeAt(s) === 104
                              ? ((_ = "h"), s++)
                              : ((_ = t), x === 0 && w(pt))),
                          _ === t && (_ = null),
                          _ !== t
                            ? ((v = re()) === t && (v = null),
                              v !== t
                                ? ((M = u),
                                  (u = f =
                                    {
                                      type: "keep",
                                      highlow: _,
                                      expr: v || zt,
                                    }))
                                : ((s = u), (u = t)))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function Se() {
                    var u, f, _, v;
                    return (
                      (u = s),
                      n.charCodeAt(s) === 100
                        ? ((f = "d"), s++)
                        : ((f = t), x === 0 && w(Ne)),
                      f !== t
                        ? (n.charCodeAt(s) === 108
                            ? ((_ = "l"), s++)
                            : ((_ = t), x === 0 && w(ft)),
                          _ === t &&
                            (n.charCodeAt(s) === 104
                              ? ((_ = "h"), s++)
                              : ((_ = t), x === 0 && w(pt))),
                          _ === t && (_ = null),
                          _ !== t
                            ? ((v = re()) === t && (v = null),
                              v !== t
                                ? ((M = u),
                                  (u = f =
                                    {
                                      type: "drop",
                                      highlow: _,
                                      expr: v || zt,
                                    }))
                                : ((s = u), (u = t)))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function Ue() {
                    var u, f, _, v, k, A, O, D, T, B;
                    if (((u = s), (f = ze()) !== t)) {
                      for (
                        _ = [],
                          v = s,
                          (k = N()) !== t
                            ? (n.charCodeAt(s) === 43
                                ? ((A = ye), s++)
                                : ((A = t), x === 0 && w(xe)),
                              A !== t && (O = N()) !== t && (D = ze()) !== t
                                ? (v = k = [k, A, O, D])
                                : ((s = v), (v = t)))
                            : ((s = v), (v = t));
                        v !== t;

                      )
                        _.push(v),
                          (v = s),
                          (k = N()) !== t
                            ? (n.charCodeAt(s) === 43
                                ? ((A = ye), s++)
                                : ((A = t), x === 0 && w(xe)),
                              A !== t && (O = N()) !== t && (D = ze()) !== t
                                ? (v = k = [k, A, O, D])
                                : ((s = v), (v = t)))
                            : ((s = v), (v = t));
                      _ !== t
                        ? ((M = u),
                          (T = f),
                          (u = f =
                            (B = _).length == 0
                              ? T
                              : {
                                  head: T,
                                  type: "diceExpression",
                                  ops: B.map((P) => ({
                                    type: "math",
                                    op: P[1],
                                    tail: P[3],
                                  })),
                                }))
                        : ((s = u), (u = t));
                    } else (s = u), (u = t);
                    return u;
                  }
                  function ze() {
                    var u;
                    return (u = Nt()) === t && (u = Ge()), u;
                  }
                  function Nt() {
                    var u, f, _;
                    return (
                      (u = s),
                      (f = (function () {
                        var v, k, A, O, D;
                        if (
                          ((v = s),
                          (k = (function () {
                            var T, B, P, z, $, j;
                            if (
                              ((T = s),
                              (B = (function () {
                                var I, q, G, K;
                                return (
                                  (I = s),
                                  (q = re()) === t && (q = null),
                                  q !== t
                                    ? (n.charCodeAt(s) === 100
                                        ? ((G = "d"), s++)
                                        : ((G = t), x === 0 && w(Ne)),
                                      G !== t
                                        ? ((K = (function () {
                                            var J, X;
                                            return (
                                              (J = s),
                                              n.charCodeAt(s) === 70
                                                ? ((X = "F"), s++)
                                                : ((X = t), x === 0 && w(Or)),
                                              X === t &&
                                                (n.charCodeAt(s) === 102
                                                  ? ((X = "f"), s++)
                                                  : ((X = t),
                                                    x === 0 && w(ht))),
                                              X !== t &&
                                                ((M = J),
                                                (X = { type: "fate" })),
                                              X
                                            );
                                          })()),
                                          K === t &&
                                            ((K = (function () {
                                              var J, X;
                                              return (
                                                (J = s),
                                                n.charCodeAt(s) === 37
                                                  ? ((X = "%"), s++)
                                                  : ((X = t), x === 0 && w(Be)),
                                                X !== t &&
                                                  ((M = J),
                                                  (X = {
                                                    type: "number",
                                                    value: "100",
                                                  })),
                                                X
                                              );
                                            })()),
                                            K === t && (K = re())),
                                          K !== t
                                            ? ((M = I),
                                              (I = q =
                                                {
                                                  die: K,
                                                  count: q || {
                                                    type: "number",
                                                    value: 1,
                                                  },
                                                  type: "die",
                                                }))
                                            : ((s = I), (I = t)))
                                        : ((s = I), (I = t)))
                                    : ((s = I), (I = t)),
                                  I
                                );
                              })()),
                              B !== t)
                            ) {
                              for (
                                P = [],
                                  (z = $t()) === t &&
                                    (z = It()) === t &&
                                    (z = Bt()) === t &&
                                    (z = Vt()) === t &&
                                    (z = Ht());
                                z !== t;

                              )
                                P.push(z),
                                  (z = $t()) === t &&
                                    (z = It()) === t &&
                                    (z = Bt()) === t &&
                                    (z = Vt()) === t &&
                                    (z = Ht());
                              P !== t
                                ? ((M = T),
                                  (j = P),
                                  (($ = B).mods = ($.mods || []).concat(j)),
                                  (T = B = $))
                                : ((s = T), (T = t));
                            } else (s = T), (T = t);
                            return T;
                          })()),
                          k !== t)
                        ) {
                          for (
                            A = [],
                              (O = Se()) === t &&
                                (O = Re()) === t &&
                                (O = Ee()) === t &&
                                (O = Ae()) === t &&
                                (O = Pt()) === t &&
                                (O = Mt());
                            O !== t;

                          )
                            A.push(O),
                              (O = Se()) === t &&
                                (O = Re()) === t &&
                                (O = Ee()) === t &&
                                (O = Ae()) === t &&
                                (O = Pt()) === t &&
                                (O = Mt());
                          A !== t
                            ? ((O = (function () {
                                var T, B, P, z, $;
                                return (
                                  (T = s),
                                  n.charCodeAt(s) === 109
                                    ? ((B = "m"), s++)
                                    : ((B = t), x === 0 && w(gr)),
                                  B !== t
                                    ? (n.charCodeAt(s) === 116
                                        ? ((P = "t"), s++)
                                        : ((P = t), x === 0 && w(vr)),
                                      P === t && (P = null),
                                      P !== t
                                        ? ((z = Ke()) === t && (z = null),
                                          z !== t
                                            ? (($ = (function () {
                                                var j, I, q;
                                                return (
                                                  (j = s),
                                                  n.charCodeAt(s) === 62
                                                    ? ((I = E), s++)
                                                    : ((I = t),
                                                      x === 0 && w(S)),
                                                  I === t &&
                                                    (n.charCodeAt(s) === 60
                                                      ? ((I = L), s++)
                                                      : ((I = t),
                                                        x === 0 && w(V)),
                                                    I === t &&
                                                      (n.charCodeAt(s) === 61
                                                        ? ((I = U), s++)
                                                        : ((I = t),
                                                          x === 0 && w(W)))),
                                                  I !== t && (q = re()) !== t
                                                    ? ((M = j),
                                                      (j = I =
                                                        { mod: I, expr: q }))
                                                    : ((s = j), (j = t)),
                                                  j
                                                );
                                              })()),
                                              $ === t && ($ = null),
                                              $ !== t
                                                ? ((M = T),
                                                  (T = B =
                                                    (function (j, I, q) {
                                                      const G = {
                                                        type: "match",
                                                        min: I || {
                                                          type: "number",
                                                          value: 2,
                                                        },
                                                        count: !!j,
                                                      };
                                                      return (
                                                        q &&
                                                          ((G.mod = q.mod),
                                                          (G.expr = q.expr)),
                                                        G
                                                      );
                                                    })(P, z, $)))
                                                : ((s = T), (T = t)))
                                            : ((s = T), (T = t)))
                                        : ((s = T), (T = t)))
                                    : ((s = T), (T = t)),
                                  T
                                );
                              })()) === t && (O = null),
                              O !== t
                                ? ((D = (function () {
                                    var T, B, P;
                                    return (
                                      (T = s),
                                      n.charCodeAt(s) === 115
                                        ? ((B = "s"), s++)
                                        : ((B = t), x === 0 && w(wr)),
                                      B !== t
                                        ? (n.charCodeAt(s) === 97
                                            ? ((P = "a"), s++)
                                            : ((P = t), x === 0 && w(Cr)),
                                          P === t &&
                                            (n.charCodeAt(s) === 100
                                              ? ((P = "d"), s++)
                                              : ((P = t), x === 0 && w(Ne))),
                                          P === t && (P = null),
                                          P !== t
                                            ? ((M = T),
                                              (T = B =
                                                P == "d"
                                                  ? { type: "sort", asc: !1 }
                                                  : { type: "sort", asc: !0 }))
                                            : ((s = T), (T = t)))
                                        : ((s = T), (T = t)),
                                      T
                                    );
                                  })()),
                                  D === t && (D = null),
                                  D !== t
                                    ? ((M = v),
                                      (v = k =
                                        (function (T, B, P, z) {
                                          const $ = B.filter((j) =>
                                            ["success", "failure"].includes(
                                              j.type
                                            )
                                          );
                                          return (
                                            (B = B.filter(
                                              (j) => !$.includes(j)
                                            )),
                                            (T.mods = (T.mods || []).concat(B)),
                                            $.length > 0 && (T.targets = $),
                                            P && (T.match = P),
                                            z && (T.sort = z),
                                            T
                                          );
                                        })(k, A, O, D)))
                                    : ((s = v), (v = t)))
                                : ((s = v), (v = t)))
                            : ((s = v), (v = t));
                        } else (s = v), (v = t);
                        return v;
                      })()),
                      f !== t && N() !== t
                        ? ((_ = ke()) === t && (_ = null),
                          _ !== t
                            ? ((M = u), (u = f = C(f, _)))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function Bt() {
                    var u, f, _;
                    return (
                      (u = s),
                      n.charCodeAt(s) === 33
                        ? ((f = "!"), s++)
                        : ((f = t), x === 0 && w(Er)),
                      f !== t
                        ? ((_ = he()) === t && (_ = null),
                          _ !== t
                            ? ((M = u),
                              (u = f = { type: "explode", target: _ }))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function $t() {
                    var u, f, _;
                    return (
                      (u = s),
                      n.substr(s, 2) === "!!"
                        ? ((f = "!!"), (s += 2))
                        : ((f = t), x === 0 && w(Ar)),
                      f !== t
                        ? ((_ = he()) === t && (_ = null),
                          _ !== t
                            ? ((M = u),
                              (u = f = { type: "compound", target: _ }))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function It() {
                    var u, f, _;
                    return (
                      (u = s),
                      n.substr(s, 2) === "!p"
                        ? ((f = "!p"), (s += 2))
                        : ((f = t), x === 0 && w(Rr)),
                      f !== t
                        ? ((_ = he()) === t && (_ = null),
                          _ !== t
                            ? ((M = u),
                              (u = f = { type: "penetrate", target: _ }))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function Ht() {
                    var u, f, _;
                    return (
                      (u = s),
                      n.charCodeAt(s) === 114
                        ? ((f = "r"), s++)
                        : ((f = t), x === 0 && w(Sr)),
                      f !== t
                        ? ((_ = he()) === t && (_ = null),
                          _ !== t
                            ? ((M = u),
                              (u = f = { type: "reroll", target: _ || Ut }))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function Vt() {
                    var u, f, _;
                    return (
                      (u = s),
                      n.substr(s, 2) === "ro"
                        ? ((f = "ro"), (s += 2))
                        : ((f = t), x === 0 && w(kr)),
                      f !== t
                        ? ((_ = he()) === t && (_ = null),
                          _ !== t
                            ? ((M = u),
                              (u = f = { type: "rerollOnce", target: _ || Ut }))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function he() {
                    var u, f, _;
                    return (
                      (u = s),
                      n.charCodeAt(s) === 62
                        ? ((f = E), s++)
                        : ((f = t), x === 0 && w(S)),
                      f === t &&
                        (n.charCodeAt(s) === 60
                          ? ((f = L), s++)
                          : ((f = t), x === 0 && w(V)),
                        f === t &&
                          (n.charCodeAt(s) === 61
                            ? ((f = U), s++)
                            : ((f = t), x === 0 && w(W)))),
                      f === t && (f = null),
                      f !== t && (_ = re()) !== t
                        ? ((M = u),
                          (u = f = { type: "target", mod: f, value: _ }))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function re() {
                    var u;
                    return (u = je()) === t && (u = Ke()), u;
                  }
                  function Ge() {
                    var u;
                    return (
                      (u = (function () {
                        var f, _, v, k;
                        return (
                          (f = s),
                          n.substr(s, 2) === "[["
                            ? ((_ = "[["), (s += 2))
                            : ((_ = t), x === 0 && w(y)),
                          _ !== t && (v = Ge()) !== t
                            ? (n.substr(s, 2) === "]]"
                                ? ((k = "]]"), (s += 2))
                                : ((k = t), x === 0 && w(R)),
                              k !== t
                                ? ((M = f),
                                  (f = _ = { type: "inline", expr: v }))
                                : ((s = f), (f = t)))
                            : ((s = f), (f = t)),
                          f
                        );
                      })()) === t &&
                        (u = Xe()) === t &&
                        (u = je()),
                      u
                    );
                  }
                  function je() {
                    var u, f, _, v, k, A, O;
                    return (
                      (u = s),
                      n.charCodeAt(s) === 40
                        ? ((f = "("), s++)
                        : ((f = t), x === 0 && w(mt)),
                      f !== t && (_ = Xe()) !== t
                        ? (n.charCodeAt(s) === 41
                            ? ((v = ")"), s++)
                            : ((v = t), x === 0 && w(gt)),
                          v !== t && N() !== t
                            ? ((k = ke()) === t && (k = null),
                              k !== t
                                ? ((M = u),
                                  (A = _),
                                  (O = k) && (A.label = O),
                                  (u = f = A))
                                : ((s = u), (u = t)))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t)),
                      u
                    );
                  }
                  function Xe() {
                    var u, f, _, v, k, A, O, D;
                    if (((u = s), (f = Ye()) !== t)) {
                      for (
                        _ = [],
                          v = s,
                          (k = N()) !== t
                            ? (n.charCodeAt(s) === 43
                                ? ((A = ye), s++)
                                : ((A = t), x === 0 && w(xe)),
                              A === t &&
                                (n.charCodeAt(s) === 45
                                  ? ((A = "-"), s++)
                                  : ((A = t), x === 0 && w($e))),
                              A !== t && (O = N()) !== t && (D = Ye()) !== t
                                ? (v = k = [k, A, O, D])
                                : ((s = v), (v = t)))
                            : ((s = v), (v = t));
                        v !== t;

                      )
                        _.push(v),
                          (v = s),
                          (k = N()) !== t
                            ? (n.charCodeAt(s) === 43
                                ? ((A = ye), s++)
                                : ((A = t), x === 0 && w(xe)),
                              A === t &&
                                (n.charCodeAt(s) === 45
                                  ? ((A = "-"), s++)
                                  : ((A = t), x === 0 && w($e))),
                              A !== t && (O = N()) !== t && (D = Ye()) !== t
                                ? (v = k = [k, A, O, D])
                                : ((s = v), (v = t)))
                            : ((s = v), (v = t));
                      _ !== t
                        ? ((M = u), (u = f = Ie(f, _)))
                        : ((s = u), (u = t));
                    } else (s = u), (u = t);
                    return u;
                  }
                  function Ye() {
                    var u, f, _, v, k, A, O, D;
                    if (((u = s), (f = We()) !== t)) {
                      for (
                        _ = [],
                          v = s,
                          (k = N()) !== t
                            ? (n.charCodeAt(s) === 42
                                ? ((A = "*"), s++)
                                : ((A = t), x === 0 && w(vt)),
                              A === t &&
                                (n.charCodeAt(s) === 47
                                  ? ((A = "/"), s++)
                                  : ((A = t), x === 0 && w(bt))),
                              A !== t && (O = N()) !== t && (D = We()) !== t
                                ? (v = k = [k, A, O, D])
                                : ((s = v), (v = t)))
                            : ((s = v), (v = t));
                        v !== t;

                      )
                        _.push(v),
                          (v = s),
                          (k = N()) !== t
                            ? (n.charCodeAt(s) === 42
                                ? ((A = "*"), s++)
                                : ((A = t), x === 0 && w(vt)),
                              A === t &&
                                (n.charCodeAt(s) === 47
                                  ? ((A = "/"), s++)
                                  : ((A = t), x === 0 && w(bt))),
                              A !== t && (O = N()) !== t && (D = We()) !== t
                                ? (v = k = [k, A, O, D])
                                : ((s = v), (v = t)))
                            : ((s = v), (v = t));
                      _ !== t
                        ? ((M = u), (u = f = Ie(f, _)))
                        : ((s = u), (u = t));
                    } else (s = u), (u = t);
                    return u;
                  }
                  function We() {
                    var u, f, _, v, k, A, O, D;
                    if (((u = s), (f = qe()) !== t)) {
                      for (
                        _ = [],
                          v = s,
                          (k = N()) !== t
                            ? (n.substr(s, 2) === we
                                ? ((A = we), (s += 2))
                                : ((A = t), x === 0 && w(yt)),
                              A === t &&
                                (n.charCodeAt(s) === 37
                                  ? ((A = "%"), s++)
                                  : ((A = t), x === 0 && w(Be))),
                              A !== t && (O = N()) !== t && (D = qe()) !== t
                                ? (v = k = [k, A, O, D])
                                : ((s = v), (v = t)))
                            : ((s = v), (v = t));
                        v !== t;

                      )
                        _.push(v),
                          (v = s),
                          (k = N()) !== t
                            ? (n.substr(s, 2) === we
                                ? ((A = we), (s += 2))
                                : ((A = t), x === 0 && w(yt)),
                              A === t &&
                                (n.charCodeAt(s) === 37
                                  ? ((A = "%"), s++)
                                  : ((A = t), x === 0 && w(Be))),
                              A !== t && (O = N()) !== t && (D = qe()) !== t
                                ? (v = k = [k, A, O, D])
                                : ((s = v), (v = t)))
                            : ((s = v), (v = t));
                      _ !== t
                        ? ((M = u), (u = f = Ie(f, _)))
                        : ((s = u), (u = t));
                    } else (s = u), (u = t);
                    return u;
                  }
                  function qe() {
                    var u;
                    return (
                      (u = (function () {
                        var f, _, v, k, A;
                        return (
                          (f = s),
                          (_ = (function () {
                            var O;
                            return (
                              n.substr(s, 5) === xt
                                ? ((O = xt), (s += 5))
                                : ((O = t), x === 0 && w(Tr)),
                              O === t &&
                                (n.substr(s, 4) === wt
                                  ? ((O = wt), (s += 4))
                                  : ((O = t), x === 0 && w(Fr)),
                                O === t &&
                                  (n.substr(s, 5) === Ct
                                    ? ((O = Ct), (s += 5))
                                    : ((O = t), x === 0 && w(Lr)),
                                  O === t &&
                                    (n.substr(s, 3) === "abs"
                                      ? ((O = "abs"), (s += 3))
                                      : ((O = t), x === 0 && w(Dr))))),
                              O
                            );
                          })()),
                          _ !== t && N() !== t
                            ? (n.charCodeAt(s) === 40
                                ? ((v = "("), s++)
                                : ((v = t), x === 0 && w(mt)),
                              v !== t &&
                              N() !== t &&
                              (k = Xe()) !== t &&
                              N() !== t
                                ? (n.charCodeAt(s) === 41
                                    ? ((A = ")"), s++)
                                    : ((A = t), x === 0 && w(gt)),
                                  A !== t
                                    ? ((M = f),
                                      (f = _ =
                                        {
                                          type: "mathfunction",
                                          op: _,
                                          expr: k,
                                        }))
                                    : ((s = f), (f = t)))
                                : ((s = f), (f = t)))
                            : ((s = f), (f = t)),
                          f
                        );
                      })()) === t &&
                        (u = (function () {
                          var f, _, v;
                          return (
                            (f = s),
                            (_ = (function () {
                              var k, A, O, D, T, B, P, z;
                              if (
                                ((k = s),
                                (A = (function () {
                                  var $, j, I, q, G, K, J, X, Oe;
                                  if (
                                    (($ = s),
                                    n.charCodeAt(s) === 123
                                      ? ((j = "{"), s++)
                                      : ((j = t), x === 0 && w(yr)),
                                    j !== t)
                                  )
                                    if (N() !== t)
                                      if ((I = Ue()) !== t) {
                                        for (
                                          q = [],
                                            G = s,
                                            (K = N()) !== t
                                              ? (n.charCodeAt(s) === 44
                                                  ? ((J = ","), s++)
                                                  : ((J = t), x === 0 && w(_t)),
                                                J !== t &&
                                                (X = N()) !== t &&
                                                (Oe = Ue()) !== t
                                                  ? (G = K = [K, J, X, Oe])
                                                  : ((s = G), (G = t)))
                                              : ((s = G), (G = t));
                                          G !== t;

                                        )
                                          q.push(G),
                                            (G = s),
                                            (K = N()) !== t
                                              ? (n.charCodeAt(s) === 44
                                                  ? ((J = ","), s++)
                                                  : ((J = t), x === 0 && w(_t)),
                                                J !== t &&
                                                (X = N()) !== t &&
                                                (Oe = Ue()) !== t
                                                  ? (G = K = [K, J, X, Oe])
                                                  : ((s = G), (G = t)))
                                              : ((s = G), (G = t));
                                        q !== t && (G = N()) !== t
                                          ? (n.charCodeAt(s) === 125
                                              ? ((K = "}"), s++)
                                              : ((K = t), x === 0 && w(xr)),
                                            K !== t
                                              ? ((M = $),
                                                ($ = j =
                                                  {
                                                    rolls: [
                                                      I,
                                                      ...q.map(($r) => $r[3]),
                                                    ],
                                                    type: "group",
                                                  }))
                                              : ((s = $), ($ = t)))
                                          : ((s = $), ($ = t));
                                      } else (s = $), ($ = t);
                                    else (s = $), ($ = t);
                                  else (s = $), ($ = t);
                                  return $;
                                })()),
                                A !== t)
                              ) {
                                for (
                                  O = [],
                                    (D = Re()) === t &&
                                      (D = Se()) === t &&
                                      (D = Ee()) === t &&
                                      (D = Ae());
                                  D !== t;

                                )
                                  O.push(D),
                                    (D = Re()) === t &&
                                      (D = Se()) === t &&
                                      (D = Ee()) === t &&
                                      (D = Ae());
                                O !== t && (D = N()) !== t
                                  ? ((T = ke()) === t && (T = null),
                                    T !== t
                                      ? ((M = k),
                                        (B = A),
                                        (z = T),
                                        (P = O).length > 0 &&
                                          (B.mods = (B.mods || []).concat(P)),
                                        z && (B.label = z),
                                        (k = A = B))
                                      : ((s = k), (k = t)))
                                  : ((s = k), (k = t));
                              } else (s = k), (k = t);
                              return k;
                            })()),
                            _ === t && (_ = Nt()) === t && (_ = Ke()),
                            _ !== t && N() !== t
                              ? ((v = ke()) === t && (v = null),
                                v !== t
                                  ? ((M = f), (f = _ = C(_, v)))
                                  : ((s = f), (f = t)))
                              : ((s = f), (f = t)),
                            f
                          );
                        })()) === t &&
                        (u = je()),
                      u
                    );
                  }
                  function Ke() {
                    var u, f, _, v;
                    if (
                      (x++,
                      (u = s),
                      n.charCodeAt(s) === 45
                        ? ((f = "-"), s++)
                        : ((f = t), x === 0 && w($e)),
                      f === t && (f = null),
                      f !== t)
                    ) {
                      if (
                        ((_ = []),
                        Et.test(n.charAt(s))
                          ? ((v = n.charAt(s)), s++)
                          : ((v = t), x === 0 && w(At)),
                        v !== t)
                      )
                        for (; v !== t; )
                          _.push(v),
                            Et.test(n.charAt(s))
                              ? ((v = n.charAt(s)), s++)
                              : ((v = t), x === 0 && w(At));
                      else _ = t;
                      _ !== t
                        ? ((M = u),
                          (u = f =
                            {
                              type: "number",
                              value: parseInt(n.substring(M, s), 10),
                            }))
                        : ((s = u), (u = t));
                    } else (s = u), (u = t);
                    return x--, u === t && ((f = t), x === 0 && w(Mr)), u;
                  }
                  function ke() {
                    var u, f, _, v;
                    if (
                      ((u = s),
                      n.charCodeAt(s) === 91
                        ? ((f = "["), s++)
                        : ((f = t), x === 0 && w(Pr)),
                      f !== t)
                    ) {
                      if (
                        ((_ = []),
                        Rt.test(n.charAt(s))
                          ? ((v = n.charAt(s)), s++)
                          : ((v = t), x === 0 && w(St)),
                        v !== t)
                      )
                        for (; v !== t; )
                          _.push(v),
                            Rt.test(n.charAt(s))
                              ? ((v = n.charAt(s)), s++)
                              : ((v = t), x === 0 && w(St));
                      else _ = t;
                      _ !== t
                        ? (n.charCodeAt(s) === 93
                            ? ((v = "]"), s++)
                            : ((v = t), x === 0 && w(Nr)),
                          v !== t
                            ? ((M = u), (u = f = _.join("")))
                            : ((s = u), (u = t)))
                        : ((s = u), (u = t));
                    } else (s = u), (u = t);
                    return u;
                  }
                  function N() {
                    var u, f;
                    for (
                      x++,
                        u = [],
                        kt.test(n.charAt(s))
                          ? ((f = n.charAt(s)), s++)
                          : ((f = t), x === 0 && w(Ot));
                      f !== t;

                    )
                      u.push(f),
                        kt.test(n.charAt(s))
                          ? ((f = n.charAt(s)), s++)
                          : ((f = t), x === 0 && w(Ot));
                    return x--, u === t && ((f = t), x === 0 && w(Br)), u;
                  }
                  const Ut = {
                      type: "target",
                      mod: "=",
                      value: { type: "number", value: 1 },
                    },
                    zt = { type: "number", value: 1 };
                  if ((l = m()) !== t && s === n.length) return l;
                  throw (
                    (l !== t && s < n.length && w({ type: "end" }),
                    (Je = He),
                    (Qe = te < n.length ? n.charAt(te) : null),
                    (Gt = te < n.length ? Lt(te, te + 1) : Lt(te, te)),
                    new d(d.buildMessage(Je, Qe), Je, Qe, Gt))
                  );
                  var Je, Qe, Gt;
                },
              });
          },
        },
        o = {};
      return (function a(d) {
        var n = o[d];
        if (n !== void 0) return n.exports;
        var c = (o[d] = { exports: {} });
        return r[d].call(c.exports, c, c.exports, a), c.exports;
      })(607);
    })()
  );
})(or);
let tt = 0;
class ar {
  constructor(e = {}) {
    (this.rollsAsFloats = []),
      (this.dieGroups = []),
      (this.parsedNotation = null),
      (this.finalResults = null),
      (this.targetRollsCritSuccess =
        (e == null ? void 0 : e.targetRollsCritSuccess) ||
        (e == null ? void 0 : e.targetRollsCrit) ||
        !1),
      (this.targetRollsCritFailure =
        (e == null ? void 0 : e.targetRollsCritFailure) ||
        (e == null ? void 0 : e.targetRollsCrit) ||
        !1),
      this.initParser();
  }
  initParser() {
    this.rollParser = new or.exports.DiceRoller((e = this.rollsAsFloats) =>
      e.length > 0
        ? e[tt++]
        : (console.warn(
            "No result was passed to the dice-roller-parser. Using fallback Math.random"
          ),
          Math.random())
    );
  }
  parseNotation(e) {
    this.clear(),
      (e = e.replace(/d00/, "d%")),
      (this.parsedNotation = this.rollParser.parse(e));
    const r = (o) => {
      const a = o.die.value || o.die.type;
      this.dieGroups.push({ qty: o.count.value, sides: a, mods: o.mods });
    };
    return (
      this.recursiveSearch(this.parsedNotation, "die", [], r), this.dieGroups
    );
  }
  rollNotation(e) {
    return (
      (this.finalResults = this.rollParser.rollParsed(e)), this.finalResults
    );
  }
  clear() {
    (tt = 0),
      (this.rollsAsFloats = []),
      (this.dieGroups = []),
      (this.parsedNotation = null),
      (this.finalResults = null);
  }
  recursiveSearch(e, r, o = [], a) {
    const d = o;
    return (
      Object.keys(e).forEach((n) => {
        const c = e[n];
        n === r
          ? (d.push(c), a && typeof a == "function" && a(e))
          : c && typeof c == "object" && this.recursiveSearch(c, r, d, a);
      }),
      d
    );
  }
  incrementId(e) {
    e = e.toString();
    let r = e.split(".");
    return r[1] ? (r[1] = parseInt(r[1]) + 1) : (r[1] = 1), r[0] + "." + r[1];
  }
  handleRerolls(e = []) {
    const r = [];
    return (
      e.forEach((o, a) => {
        var d;
        if (((d = o.mods) == null ? void 0 : d.length) > 0) {
          const n = (t, p, m) => {
              switch (p) {
                case ">":
                  return t >= m;
                case "<":
                  return t <= m;
                case "=":
                default:
                  return t == m;
              }
            },
            c = o.rolls.map((t) => t.rollId),
            l = (t) => {
              const p = this.incrementId(t);
              return c.includes(p);
            };
          o.mods.forEach((t) => {
            const p = Xt({}, o.rolls);
            switch (t.type) {
              case "explode":
              case "compound":
                Object.entries(p).forEach(([m, h]) => {
                  var E, S, L;
                  const y = h.sides,
                    R =
                      ((S = (E = t.target) == null ? void 0 : E.value) == null
                        ? void 0
                        : S.value) || y,
                    C = ((L = t.target) == null ? void 0 : L.mod) || ">";
                  n(h.value, C, R) &&
                    !l(h.rollId) &&
                    r.push({
                      groupId: a,
                      rollId: this.incrementId(h.rollId),
                      sides: h.sides,
                      qty: 1,
                    });
                });
                break;
              case "penetrate":
                Object.entries(p).forEach(([m, h]) => {
                  var E, S, L;
                  const y = h.sides,
                    R =
                      ((S = (E = t.target) == null ? void 0 : E.value) == null
                        ? void 0
                        : S.value) || y,
                    C = ((L = t.target) == null ? void 0 : L.mod) || "=";
                  n(h.value, C, R) &&
                    !l(h.rollId) &&
                    r.push({
                      groupId: a,
                      rollId: this.incrementId(h.rollId),
                      sides: h.sides,
                      qty: 1,
                    });
                });
                break;
              case "reroll":
                Object.entries(p).forEach(([m, h]) => {
                  h.sides,
                    n(h.value, t.target.mod, t.target.value.value) &&
                      !l(h.rollId) &&
                      r.push({
                        groupId: a,
                        rollId: this.incrementId(h.rollId),
                        sides: h.sides,
                        qty: 1,
                      });
                });
                break;
              case "rerollOnce":
                Object.entries(p).forEach(([m, h]) => {
                  var C, E;
                  const y =
                      (E = (C = t.target) == null ? void 0 : C.value) == null
                        ? void 0
                        : E.value,
                    R = t.target.mod;
                  n(h.value, R, y) &&
                    !l(h.rollId) &&
                    !h.rollId.toString().includes(".") &&
                    r.push({
                      groupId: a,
                      rollId: this.incrementId(h.rollId),
                      sides: h.sides,
                      qty: 1,
                    });
                });
                break;
            }
          });
        }
      }),
      r
    );
  }
  handleTargetCritSuccess(e = []) {
    e.rolls.forEach((r) => {
      r.successes >= 1 &&
        r.critical === "success" &&
        ((r.successes += 1), (e.value += 1));
    });
  }
  handleTargetCritFailure(e = []) {
    e.rolls.forEach((r) => {
      r.failures >= 1 &&
        r.critical === "failure" &&
        ((r.failures += 1), (e.value -= 1));
    });
  }
  parseFinalResults(e = []) {
    let r = this.recursiveSearch(e, "rolls");
    (r.length ? r : [e]).forEach((d) =>
      Object.entries(d).forEach(([n, c]) => {
        try {
          const l = c.sides;
          l &&
            (l === "fate"
              ? this.rollsAsFloats.push((c.value + 2) * 0.25)
              : this.rollsAsFloats.push((c.value - 1) / l));
        } catch {
          throw (
            (console.error(
              "This object is not a properly formatted roll object.",
              c
            ),
            new Error("Unable to parse final results"))
          );
        }
      })
    );
    const a = this.rollParser.rollParsed(this.parsedNotation);
    return (
      this.targetRollsCritSuccess &&
        a.success !== null &&
        this.handleTargetCritSuccess(a),
      this.targetRollsCritFailure &&
        a.success !== null &&
        this.handleTargetCritFailure(a),
      (this.finalResults = a),
      (tt = 0),
      (this.rollsAsFloats = []),
      a
    );
  }
}
const Te = () => {};
class Wr {
  constructor(e) {
    (this.target = e.target ? document.querySelector(e.target) : document.body),
      (this.elem = document.createRange().createContextualFragment(`
			<div class="adv-roller">
				<form class="adv-roller--form">
					<input class="adv-roller--notation" placeholder="2d20" autocomplete="off" />
					<input class="adv-roller--clear" type="reset" value="Clear" />
				</form>
			</div>
		`)),
      (this.form = this.elem.querySelector(".adv-roller--form")),
      (this.DRP = new ar({
        targetRollsCritSuccess:
          (e == null ? void 0 : e.targetRollsCritSuccess) ||
          (e == null ? void 0 : e.targetRollsCritSuccess) ||
          !1,
        targetRollsCritFailure:
          (e == null ? void 0 : e.targetRollsCritFailure) ||
          (e == null ? void 0 : e.targetRollsCrit) ||
          !1,
        targetRollsCrit: (e == null ? void 0 : e.targetRollsCrit) || !1,
      })),
      (this.onSubmit = (e == null ? void 0 : e.onSubmit) || Te),
      (this.onClear = (e == null ? void 0 : e.onClear) || Te),
      (this.onReroll = (e == null ? void 0 : e.onReroll) || Te),
      (this.onResults = (e == null ? void 0 : e.onResults) || Te),
      this.init();
  }
  init() {
    this.form.addEventListener("submit", this.submitForm.bind(this)),
      this.form.addEventListener("reset", this.clear.bind(this)),
      this.target.prepend(this.elem);
  }
  submitForm(e) {
    e.preventDefault(),
      this.clear(),
      this.onSubmit(this.DRP.parseNotation(this.form.firstElementChild.value));
  }
  clear() {
    this.DRP.clear(), this.onClear && this.onClear();
  }
  handleResults(e) {
    const r = this.DRP.handleRerolls(e);
    if (r.length) return this.onReroll(r), r;
    const o = this.DRP.parsedNotation ? this.DRP.parseFinalResults(e) : e,
      a = new CustomEvent("resultsAvailable", { detail: o });
    return document.dispatchEvent(a), this.onResults(o), o;
  }
}
function qr(i) {
  if (!!i && typeof window != "undefined") {
    var e = document.createElement("style");
    return (
      e.setAttribute("type", "text/css"),
      (e.innerHTML = i),
      document.head.appendChild(e),
      i
    );
  }
}
function ce(i, e) {
  var r = i.__state.conversionName.toString(),
    o = Math.round(i.r),
    a = Math.round(i.g),
    d = Math.round(i.b),
    n = i.a,
    c = Math.round(i.h),
    l = i.s.toFixed(1),
    t = i.v.toFixed(1);
  if (e || r === "THREE_CHAR_HEX" || r === "SIX_CHAR_HEX") {
    for (var p = i.hex.toString(16); p.length < 6; ) p = "0" + p;
    return "#" + p;
  } else {
    if (r === "CSS_RGB") return "rgb(" + o + "," + a + "," + d + ")";
    if (r === "CSS_RGBA")
      return "rgba(" + o + "," + a + "," + d + "," + n + ")";
    if (r === "HEX") return "0x" + i.hex.toString(16);
    if (r === "RGB_ARRAY") return "[" + o + "," + a + "," + d + "]";
    if (r === "RGBA_ARRAY") return "[" + o + "," + a + "," + d + "," + n + "]";
    if (r === "RGB_OBJ") return "{r:" + o + ",g:" + a + ",b:" + d + "}";
    if (r === "RGBA_OBJ")
      return "{r:" + o + ",g:" + a + ",b:" + d + ",a:" + n + "}";
    if (r === "HSV_OBJ") return "{h:" + c + ",s:" + l + ",v:" + t + "}";
    if (r === "HSVA_OBJ")
      return "{h:" + c + ",s:" + l + ",v:" + t + ",a:" + n + "}";
  }
  return "unknown format";
}
var Yt = Array.prototype.forEach,
  fe = Array.prototype.slice,
  b = {
    BREAK: {},
    extend: function (e) {
      return (
        this.each(
          fe.call(arguments, 1),
          function (r) {
            var o = this.isObject(r) ? Object.keys(r) : [];
            o.forEach(
              function (a) {
                this.isUndefined(r[a]) || (e[a] = r[a]);
              }.bind(this)
            );
          },
          this
        ),
        e
      );
    },
    defaults: function (e) {
      return (
        this.each(
          fe.call(arguments, 1),
          function (r) {
            var o = this.isObject(r) ? Object.keys(r) : [];
            o.forEach(
              function (a) {
                this.isUndefined(e[a]) && (e[a] = r[a]);
              }.bind(this)
            );
          },
          this
        ),
        e
      );
    },
    compose: function () {
      var e = fe.call(arguments);
      return function () {
        for (var r = fe.call(arguments), o = e.length - 1; o >= 0; o--)
          r = [e[o].apply(this, r)];
        return r[0];
      };
    },
    each: function (e, r, o) {
      if (!!e) {
        if (Yt && e.forEach && e.forEach === Yt) e.forEach(r, o);
        else if (e.length === e.length + 0) {
          var a = void 0,
            d = void 0;
          for (a = 0, d = e.length; a < d; a++)
            if (a in e && r.call(o, e[a], a) === this.BREAK) return;
        } else for (var n in e) if (r.call(o, e[n], n) === this.BREAK) return;
      }
    },
    defer: function (e) {
      setTimeout(e, 0);
    },
    debounce: function (e, r, o) {
      var a = void 0;
      return function () {
        var d = this,
          n = arguments;
        function c() {
          (a = null), o || e.apply(d, n);
        }
        var l = o || !a;
        clearTimeout(a), (a = setTimeout(c, r)), l && e.apply(d, n);
      };
    },
    toArray: function (e) {
      return e.toArray ? e.toArray() : fe.call(e);
    },
    isUndefined: function (e) {
      return e === void 0;
    },
    isNull: function (e) {
      return e === null;
    },
    isNaN: (function (i) {
      function e(r) {
        return i.apply(this, arguments);
      }
      return (
        (e.toString = function () {
          return i.toString();
        }),
        e
      );
    })(function (i) {
      return isNaN(i);
    }),
    isArray:
      Array.isArray ||
      function (i) {
        return i.constructor === Array;
      },
    isObject: function (e) {
      return e === Object(e);
    },
    isNumber: function (e) {
      return e === e + 0;
    },
    isString: function (e) {
      return e === e + "";
    },
    isBoolean: function (e) {
      return e === !1 || e === !0;
    },
    isFunction: function (e) {
      return e instanceof Function;
    },
  },
  Kr = [
    {
      litmus: b.isString,
      conversions: {
        THREE_CHAR_HEX: {
          read: function (e) {
            var r = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
            return r === null
              ? !1
              : {
                  space: "HEX",
                  hex: parseInt(
                    "0x" +
                      r[1].toString() +
                      r[1].toString() +
                      r[2].toString() +
                      r[2].toString() +
                      r[3].toString() +
                      r[3].toString(),
                    0
                  ),
                };
          },
          write: ce,
        },
        SIX_CHAR_HEX: {
          read: function (e) {
            var r = e.match(/^#([A-F0-9]{6})$/i);
            return r === null
              ? !1
              : { space: "HEX", hex: parseInt("0x" + r[1].toString(), 0) };
          },
          write: ce,
        },
        CSS_RGB: {
          read: function (e) {
            var r = e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);
            return r === null
              ? !1
              : {
                  space: "RGB",
                  r: parseFloat(r[1]),
                  g: parseFloat(r[2]),
                  b: parseFloat(r[3]),
                };
          },
          write: ce,
        },
        CSS_RGBA: {
          read: function (e) {
            var r = e.match(
              /^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/
            );
            return r === null
              ? !1
              : {
                  space: "RGB",
                  r: parseFloat(r[1]),
                  g: parseFloat(r[2]),
                  b: parseFloat(r[3]),
                  a: parseFloat(r[4]),
                };
          },
          write: ce,
        },
      },
    },
    {
      litmus: b.isNumber,
      conversions: {
        HEX: {
          read: function (e) {
            return { space: "HEX", hex: e, conversionName: "HEX" };
          },
          write: function (e) {
            return e.hex;
          },
        },
      },
    },
    {
      litmus: b.isArray,
      conversions: {
        RGB_ARRAY: {
          read: function (e) {
            return e.length !== 3
              ? !1
              : { space: "RGB", r: e[0], g: e[1], b: e[2] };
          },
          write: function (e) {
            return [e.r, e.g, e.b];
          },
        },
        RGBA_ARRAY: {
          read: function (e) {
            return e.length !== 4
              ? !1
              : { space: "RGB", r: e[0], g: e[1], b: e[2], a: e[3] };
          },
          write: function (e) {
            return [e.r, e.g, e.b, e.a];
          },
        },
      },
    },
    {
      litmus: b.isObject,
      conversions: {
        RGBA_OBJ: {
          read: function (e) {
            return b.isNumber(e.r) &&
              b.isNumber(e.g) &&
              b.isNumber(e.b) &&
              b.isNumber(e.a)
              ? { space: "RGB", r: e.r, g: e.g, b: e.b, a: e.a }
              : !1;
          },
          write: function (e) {
            return { r: e.r, g: e.g, b: e.b, a: e.a };
          },
        },
        RGB_OBJ: {
          read: function (e) {
            return b.isNumber(e.r) && b.isNumber(e.g) && b.isNumber(e.b)
              ? { space: "RGB", r: e.r, g: e.g, b: e.b }
              : !1;
          },
          write: function (e) {
            return { r: e.r, g: e.g, b: e.b };
          },
        },
        HSVA_OBJ: {
          read: function (e) {
            return b.isNumber(e.h) &&
              b.isNumber(e.s) &&
              b.isNumber(e.v) &&
              b.isNumber(e.a)
              ? { space: "HSV", h: e.h, s: e.s, v: e.v, a: e.a }
              : !1;
          },
          write: function (e) {
            return { h: e.h, s: e.s, v: e.v, a: e.a };
          },
        },
        HSV_OBJ: {
          read: function (e) {
            return b.isNumber(e.h) && b.isNumber(e.s) && b.isNumber(e.v)
              ? { space: "HSV", h: e.h, s: e.s, v: e.v }
              : !1;
          },
          write: function (e) {
            return { h: e.h, s: e.s, v: e.v };
          },
        },
      },
    },
  ],
  pe = void 0,
  Fe = void 0,
  nt = function () {
    Fe = !1;
    var e = arguments.length > 1 ? b.toArray(arguments) : arguments[0];
    return (
      b.each(Kr, function (r) {
        if (r.litmus(e))
          return (
            b.each(r.conversions, function (o, a) {
              if (((pe = o.read(e)), Fe === !1 && pe !== !1))
                return (
                  (Fe = pe),
                  (pe.conversionName = a),
                  (pe.conversion = o),
                  b.BREAK
                );
            }),
            b.BREAK
          );
      }),
      Fe
    );
  },
  Wt = void 0,
  Me = {
    hsv_to_rgb: function (e, r, o) {
      var a = Math.floor(e / 60) % 6,
        d = e / 60 - Math.floor(e / 60),
        n = o * (1 - r),
        c = o * (1 - d * r),
        l = o * (1 - (1 - d) * r),
        t = [
          [o, l, n],
          [c, o, n],
          [n, o, l],
          [n, c, o],
          [l, n, o],
          [o, n, c],
        ][a];
      return { r: t[0] * 255, g: t[1] * 255, b: t[2] * 255 };
    },
    rgb_to_hsv: function (e, r, o) {
      var a = Math.min(e, r, o),
        d = Math.max(e, r, o),
        n = d - a,
        c = void 0,
        l = void 0;
      if (d !== 0) l = n / d;
      else return { h: NaN, s: 0, v: 0 };
      return (
        e === d
          ? (c = (r - o) / n)
          : r === d
          ? (c = 2 + (o - e) / n)
          : (c = 4 + (e - r) / n),
        (c /= 6),
        c < 0 && (c += 1),
        { h: c * 360, s: l, v: d / 255 }
      );
    },
    rgb_to_hex: function (e, r, o) {
      var a = this.hex_with_component(0, 2, e);
      return (
        (a = this.hex_with_component(a, 1, r)),
        (a = this.hex_with_component(a, 0, o)),
        a
      );
    },
    component_from_hex: function (e, r) {
      return (e >> (r * 8)) & 255;
    },
    hex_with_component: function (e, r, o) {
      return (o << (Wt = r * 8)) | (e & ~(255 << Wt));
    },
  },
  Jr =
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? function (i) {
          return typeof i;
        }
      : function (i) {
          return i &&
            typeof Symbol == "function" &&
            i.constructor === Symbol &&
            i !== Symbol.prototype
            ? "symbol"
            : typeof i;
        },
  Z = function (i, e) {
    if (!(i instanceof e))
      throw new TypeError("Cannot call a class as a function");
  },
  ee = (function () {
    function i(e, r) {
      for (var o = 0; o < r.length; o++) {
        var a = r[o];
        (a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          "value" in a && (a.writable = !0),
          Object.defineProperty(e, a.key, a);
      }
    }
    return function (e, r, o) {
      return r && i(e.prototype, r), o && i(e, o), e;
    };
  })(),
  ie = function i(e, r, o) {
    e === null && (e = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(e, r);
    if (a === void 0) {
      var d = Object.getPrototypeOf(e);
      return d === null ? void 0 : i(d, r, o);
    } else {
      if ("value" in a) return a.value;
      var n = a.get;
      return n === void 0 ? void 0 : n.call(o);
    }
  },
  se = function (i, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof e
      );
    (i.prototype = Object.create(e && e.prototype, {
      constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 },
    })),
      e &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(i, e)
          : (i.__proto__ = e));
  },
  oe = function (i, e) {
    if (!i)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return e && (typeof e == "object" || typeof e == "function") ? e : i;
  },
  Y = (function () {
    function i() {
      if (
        (Z(this, i),
        (this.__state = nt.apply(this, arguments)),
        this.__state === !1)
      )
        throw new Error("Failed to interpret color arguments");
      this.__state.a = this.__state.a || 1;
    }
    return (
      ee(i, [
        {
          key: "toString",
          value: function () {
            return ce(this);
          },
        },
        {
          key: "toHexString",
          value: function () {
            return ce(this, !0);
          },
        },
        {
          key: "toOriginal",
          value: function () {
            return this.__state.conversion.write(this);
          },
        },
      ]),
      i
    );
  })();
function dt(i, e, r) {
  Object.defineProperty(i, e, {
    get: function () {
      return this.__state.space === "RGB"
        ? this.__state[e]
        : (Y.recalculateRGB(this, e, r), this.__state[e]);
    },
    set: function (a) {
      this.__state.space !== "RGB" &&
        (Y.recalculateRGB(this, e, r), (this.__state.space = "RGB")),
        (this.__state[e] = a);
    },
  });
}
function ut(i, e) {
  Object.defineProperty(i, e, {
    get: function () {
      return this.__state.space === "HSV"
        ? this.__state[e]
        : (Y.recalculateHSV(this), this.__state[e]);
    },
    set: function (o) {
      this.__state.space !== "HSV" &&
        (Y.recalculateHSV(this), (this.__state.space = "HSV")),
        (this.__state[e] = o);
    },
  });
}
Y.recalculateRGB = function (i, e, r) {
  if (i.__state.space === "HEX")
    i.__state[e] = Me.component_from_hex(i.__state.hex, r);
  else if (i.__state.space === "HSV")
    b.extend(i.__state, Me.hsv_to_rgb(i.__state.h, i.__state.s, i.__state.v));
  else throw new Error("Corrupted color state");
};
Y.recalculateHSV = function (i) {
  var e = Me.rgb_to_hsv(i.r, i.g, i.b);
  b.extend(i.__state, { s: e.s, v: e.v }),
    b.isNaN(e.h)
      ? b.isUndefined(i.__state.h) && (i.__state.h = 0)
      : (i.__state.h = e.h);
};
Y.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"];
dt(Y.prototype, "r", 2);
dt(Y.prototype, "g", 1);
dt(Y.prototype, "b", 0);
ut(Y.prototype, "h");
ut(Y.prototype, "s");
ut(Y.prototype, "v");
Object.defineProperty(Y.prototype, "a", {
  get: function () {
    return this.__state.a;
  },
  set: function (e) {
    this.__state.a = e;
  },
});
Object.defineProperty(Y.prototype, "hex", {
  get: function () {
    return (
      this.__state.space !== "HEX" &&
        ((this.__state.hex = Me.rgb_to_hex(this.r, this.g, this.b)),
        (this.__state.space = "HEX")),
      this.__state.hex
    );
  },
  set: function (e) {
    (this.__state.space = "HEX"), (this.__state.hex = e);
  },
});
var le = (function () {
    function i(e, r) {
      Z(this, i),
        (this.initialValue = e[r]),
        (this.domElement = document.createElement("div")),
        (this.object = e),
        (this.property = r),
        (this.__onChange = void 0),
        (this.__onFinishChange = void 0);
    }
    return (
      ee(i, [
        {
          key: "onChange",
          value: function (r) {
            return (this.__onChange = r), this;
          },
        },
        {
          key: "onFinishChange",
          value: function (r) {
            return (this.__onFinishChange = r), this;
          },
        },
        {
          key: "setValue",
          value: function (r) {
            return (
              (this.object[this.property] = r),
              this.__onChange && this.__onChange.call(this, r),
              this.updateDisplay(),
              this
            );
          },
        },
        {
          key: "getValue",
          value: function () {
            return this.object[this.property];
          },
        },
        {
          key: "updateDisplay",
          value: function () {
            return this;
          },
        },
        {
          key: "isModified",
          value: function () {
            return this.initialValue !== this.getValue();
          },
        },
      ]),
      i
    );
  })(),
  Qr = {
    HTMLEvents: ["change"],
    MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
    KeyboardEvents: ["keydown"],
  },
  lr = {};
b.each(Qr, function (i, e) {
  b.each(i, function (r) {
    lr[r] = e;
  });
});
var Zr = /(\d+(\.\d+)?)px/;
function ne(i) {
  if (i === "0" || b.isUndefined(i)) return 0;
  var e = i.match(Zr);
  return b.isNull(e) ? 0 : parseFloat(e[1]);
}
var g = {
    makeSelectable: function (e, r) {
      e === void 0 ||
        e.style === void 0 ||
        ((e.onselectstart = r
          ? function () {
              return !1;
            }
          : function () {}),
        (e.style.MozUserSelect = r ? "auto" : "none"),
        (e.style.KhtmlUserSelect = r ? "auto" : "none"),
        (e.unselectable = r ? "on" : "off"));
    },
    makeFullscreen: function (e, r, o) {
      var a = o,
        d = r;
      b.isUndefined(d) && (d = !0),
        b.isUndefined(a) && (a = !0),
        (e.style.position = "absolute"),
        d && ((e.style.left = 0), (e.style.right = 0)),
        a && ((e.style.top = 0), (e.style.bottom = 0));
    },
    fakeEvent: function (e, r, o, a) {
      var d = o || {},
        n = lr[r];
      if (!n) throw new Error("Event type " + r + " not supported.");
      var c = document.createEvent(n);
      switch (n) {
        case "MouseEvents": {
          var l = d.x || d.clientX || 0,
            t = d.y || d.clientY || 0;
          c.initMouseEvent(
            r,
            d.bubbles || !1,
            d.cancelable || !0,
            window,
            d.clickCount || 1,
            0,
            0,
            l,
            t,
            !1,
            !1,
            !1,
            !1,
            0,
            null
          );
          break;
        }
        case "KeyboardEvents": {
          var p = c.initKeyboardEvent || c.initKeyEvent;
          b.defaults(d, {
            cancelable: !0,
            ctrlKey: !1,
            altKey: !1,
            shiftKey: !1,
            metaKey: !1,
            keyCode: void 0,
            charCode: void 0,
          }),
            p(
              r,
              d.bubbles || !1,
              d.cancelable,
              window,
              d.ctrlKey,
              d.altKey,
              d.shiftKey,
              d.metaKey,
              d.keyCode,
              d.charCode
            );
          break;
        }
        default: {
          c.initEvent(r, d.bubbles || !1, d.cancelable || !0);
          break;
        }
      }
      b.defaults(c, a), e.dispatchEvent(c);
    },
    bind: function (e, r, o, a) {
      var d = a || !1;
      return (
        e.addEventListener
          ? e.addEventListener(r, o, d)
          : e.attachEvent && e.attachEvent("on" + r, o),
        g
      );
    },
    unbind: function (e, r, o, a) {
      var d = a || !1;
      return (
        e.removeEventListener
          ? e.removeEventListener(r, o, d)
          : e.detachEvent && e.detachEvent("on" + r, o),
        g
      );
    },
    addClass: function (e, r) {
      if (e.className === void 0) e.className = r;
      else if (e.className !== r) {
        var o = e.className.split(/ +/);
        o.indexOf(r) === -1 &&
          (o.push(r),
          (e.className = o.join(" ").replace(/^\s+/, "").replace(/\s+$/, "")));
      }
      return g;
    },
    removeClass: function (e, r) {
      if (r)
        if (e.className === r) e.removeAttribute("class");
        else {
          var o = e.className.split(/ +/),
            a = o.indexOf(r);
          a !== -1 && (o.splice(a, 1), (e.className = o.join(" ")));
        }
      else e.className = void 0;
      return g;
    },
    hasClass: function (e, r) {
      return (
        new RegExp("(?:^|\\s+)" + r + "(?:\\s+|$)").test(e.className) || !1
      );
    },
    getWidth: function (e) {
      var r = getComputedStyle(e);
      return (
        ne(r["border-left-width"]) +
        ne(r["border-right-width"]) +
        ne(r["padding-left"]) +
        ne(r["padding-right"]) +
        ne(r.width)
      );
    },
    getHeight: function (e) {
      var r = getComputedStyle(e);
      return (
        ne(r["border-top-width"]) +
        ne(r["border-bottom-width"]) +
        ne(r["padding-top"]) +
        ne(r["padding-bottom"]) +
        ne(r.height)
      );
    },
    getOffset: function (e) {
      var r = e,
        o = { left: 0, top: 0 };
      if (r.offsetParent)
        do
          (o.left += r.offsetLeft),
            (o.top += r.offsetTop),
            (r = r.offsetParent);
        while (r);
      return o;
    },
    isActive: function (e) {
      return e === document.activeElement && (e.type || e.href);
    },
  },
  dr = (function (i) {
    se(e, i);
    function e(r, o) {
      Z(this, e);
      var a = oe(
          this,
          (e.__proto__ || Object.getPrototypeOf(e)).call(this, r, o)
        ),
        d = a;
      (a.__prev = a.getValue()),
        (a.__checkbox = document.createElement("input")),
        a.__checkbox.setAttribute("type", "checkbox");
      function n() {
        d.setValue(!d.__prev);
      }
      return (
        g.bind(a.__checkbox, "change", n, !1),
        a.domElement.appendChild(a.__checkbox),
        a.updateDisplay(),
        a
      );
    }
    return (
      ee(e, [
        {
          key: "setValue",
          value: function (o) {
            var a = ie(
              e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
              "setValue",
              this
            ).call(this, o);
            return (
              this.__onFinishChange &&
                this.__onFinishChange.call(this, this.getValue()),
              (this.__prev = this.getValue()),
              a
            );
          },
        },
        {
          key: "updateDisplay",
          value: function () {
            return (
              this.getValue() === !0
                ? (this.__checkbox.setAttribute("checked", "checked"),
                  (this.__checkbox.checked = !0),
                  (this.__prev = !0))
                : ((this.__checkbox.checked = !1), (this.__prev = !1)),
              ie(
                e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                "updateDisplay",
                this
              ).call(this)
            );
          },
        },
      ]),
      e
    );
  })(le),
  en = (function (i) {
    se(e, i);
    function e(r, o, a) {
      Z(this, e);
      var d = oe(
          this,
          (e.__proto__ || Object.getPrototypeOf(e)).call(this, r, o)
        ),
        n = a,
        c = d;
      if (((d.__select = document.createElement("select")), b.isArray(n))) {
        var l = {};
        b.each(n, function (t) {
          l[t] = t;
        }),
          (n = l);
      }
      return (
        b.each(n, function (t, p) {
          var m = document.createElement("option");
          (m.innerHTML = p),
            m.setAttribute("value", t),
            c.__select.appendChild(m);
        }),
        d.updateDisplay(),
        g.bind(d.__select, "change", function () {
          var t = this.options[this.selectedIndex].value;
          c.setValue(t);
        }),
        d.domElement.appendChild(d.__select),
        d
      );
    }
    return (
      ee(e, [
        {
          key: "setValue",
          value: function (o) {
            var a = ie(
              e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
              "setValue",
              this
            ).call(this, o);
            return (
              this.__onFinishChange &&
                this.__onFinishChange.call(this, this.getValue()),
              a
            );
          },
        },
        {
          key: "updateDisplay",
          value: function () {
            return g.isActive(this.__select)
              ? this
              : ((this.__select.value = this.getValue()),
                ie(
                  e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                  "updateDisplay",
                  this
                ).call(this));
          },
        },
      ]),
      e
    );
  })(le),
  tn = (function (i) {
    se(e, i);
    function e(r, o) {
      Z(this, e);
      var a = oe(
          this,
          (e.__proto__ || Object.getPrototypeOf(e)).call(this, r, o)
        ),
        d = a;
      function n() {
        d.setValue(d.__input.value);
      }
      function c() {
        d.__onFinishChange && d.__onFinishChange.call(d, d.getValue());
      }
      return (
        (a.__input = document.createElement("input")),
        a.__input.setAttribute("type", "text"),
        g.bind(a.__input, "keyup", n),
        g.bind(a.__input, "change", n),
        g.bind(a.__input, "blur", c),
        g.bind(a.__input, "keydown", function (l) {
          l.keyCode === 13 && this.blur();
        }),
        a.updateDisplay(),
        a.domElement.appendChild(a.__input),
        a
      );
    }
    return (
      ee(e, [
        {
          key: "updateDisplay",
          value: function () {
            return (
              g.isActive(this.__input) ||
                (this.__input.value = this.getValue()),
              ie(
                e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                "updateDisplay",
                this
              ).call(this)
            );
          },
        },
      ]),
      e
    );
  })(le);
function qt(i) {
  var e = i.toString();
  return e.indexOf(".") > -1 ? e.length - e.indexOf(".") - 1 : 0;
}
var ur = (function (i) {
  se(e, i);
  function e(r, o, a) {
    Z(this, e);
    var d = oe(
        this,
        (e.__proto__ || Object.getPrototypeOf(e)).call(this, r, o)
      ),
      n = a || {};
    return (
      (d.__min = n.min),
      (d.__max = n.max),
      (d.__step = n.step),
      b.isUndefined(d.__step)
        ? d.initialValue === 0
          ? (d.__impliedStep = 1)
          : (d.__impliedStep =
              Math.pow(
                10,
                Math.floor(Math.log(Math.abs(d.initialValue)) / Math.LN10)
              ) / 10)
        : (d.__impliedStep = d.__step),
      (d.__precision = qt(d.__impliedStep)),
      d
    );
  }
  return (
    ee(e, [
      {
        key: "setValue",
        value: function (o) {
          var a = o;
          return (
            this.__min !== void 0 && a < this.__min
              ? (a = this.__min)
              : this.__max !== void 0 && a > this.__max && (a = this.__max),
            this.__step !== void 0 &&
              a % this.__step !== 0 &&
              (a = Math.round(a / this.__step) * this.__step),
            ie(
              e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
              "setValue",
              this
            ).call(this, a)
          );
        },
      },
      {
        key: "min",
        value: function (o) {
          return (this.__min = o), this;
        },
      },
      {
        key: "max",
        value: function (o) {
          return (this.__max = o), this;
        },
      },
      {
        key: "step",
        value: function (o) {
          return (
            (this.__step = o),
            (this.__impliedStep = o),
            (this.__precision = qt(o)),
            this
          );
        },
      },
    ]),
    e
  );
})(le);
function rn(i, e) {
  var r = Math.pow(10, e);
  return Math.round(i * r) / r;
}
var Pe = (function (i) {
  se(e, i);
  function e(r, o, a) {
    Z(this, e);
    var d = oe(
      this,
      (e.__proto__ || Object.getPrototypeOf(e)).call(this, r, o, a)
    );
    d.__truncationSuspended = !1;
    var n = d,
      c = void 0;
    function l() {
      var R = parseFloat(n.__input.value);
      b.isNaN(R) || n.setValue(R);
    }
    function t() {
      n.__onFinishChange && n.__onFinishChange.call(n, n.getValue());
    }
    function p() {
      t();
    }
    function m(R) {
      var C = c - R.clientY;
      n.setValue(n.getValue() + C * n.__impliedStep), (c = R.clientY);
    }
    function h() {
      g.unbind(window, "mousemove", m), g.unbind(window, "mouseup", h), t();
    }
    function y(R) {
      g.bind(window, "mousemove", m),
        g.bind(window, "mouseup", h),
        (c = R.clientY);
    }
    return (
      (d.__input = document.createElement("input")),
      d.__input.setAttribute("type", "text"),
      g.bind(d.__input, "change", l),
      g.bind(d.__input, "blur", p),
      g.bind(d.__input, "mousedown", y),
      g.bind(d.__input, "keydown", function (R) {
        R.keyCode === 13 &&
          ((n.__truncationSuspended = !0),
          this.blur(),
          (n.__truncationSuspended = !1),
          t());
      }),
      d.updateDisplay(),
      d.domElement.appendChild(d.__input),
      d
    );
  }
  return (
    ee(e, [
      {
        key: "updateDisplay",
        value: function () {
          return (
            (this.__input.value = this.__truncationSuspended
              ? this.getValue()
              : rn(this.getValue(), this.__precision)),
            ie(
              e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
              "updateDisplay",
              this
            ).call(this)
          );
        },
      },
    ]),
    e
  );
})(ur);
function Kt(i, e, r, o, a) {
  return o + (a - o) * ((i - e) / (r - e));
}
var it = (function (i) {
    se(e, i);
    function e(r, o, a, d, n) {
      Z(this, e);
      var c = oe(
          this,
          (e.__proto__ || Object.getPrototypeOf(e)).call(this, r, o, {
            min: a,
            max: d,
            step: n,
          })
        ),
        l = c;
      (c.__background = document.createElement("div")),
        (c.__foreground = document.createElement("div")),
        g.bind(c.__background, "mousedown", t),
        g.bind(c.__background, "touchstart", h),
        g.addClass(c.__background, "slider"),
        g.addClass(c.__foreground, "slider-fg");
      function t(C) {
        document.activeElement.blur(),
          g.bind(window, "mousemove", p),
          g.bind(window, "mouseup", m),
          p(C);
      }
      function p(C) {
        C.preventDefault();
        var E = l.__background.getBoundingClientRect();
        return l.setValue(Kt(C.clientX, E.left, E.right, l.__min, l.__max)), !1;
      }
      function m() {
        g.unbind(window, "mousemove", p),
          g.unbind(window, "mouseup", m),
          l.__onFinishChange && l.__onFinishChange.call(l, l.getValue());
      }
      function h(C) {
        C.touches.length === 1 &&
          (g.bind(window, "touchmove", y), g.bind(window, "touchend", R), y(C));
      }
      function y(C) {
        var E = C.touches[0].clientX,
          S = l.__background.getBoundingClientRect();
        l.setValue(Kt(E, S.left, S.right, l.__min, l.__max));
      }
      function R() {
        g.unbind(window, "touchmove", y),
          g.unbind(window, "touchend", R),
          l.__onFinishChange && l.__onFinishChange.call(l, l.getValue());
      }
      return (
        c.updateDisplay(),
        c.__background.appendChild(c.__foreground),
        c.domElement.appendChild(c.__background),
        c
      );
    }
    return (
      ee(e, [
        {
          key: "updateDisplay",
          value: function () {
            var o = (this.getValue() - this.__min) / (this.__max - this.__min);
            return (
              (this.__foreground.style.width = o * 100 + "%"),
              ie(
                e.prototype.__proto__ || Object.getPrototypeOf(e.prototype),
                "updateDisplay",
                this
              ).call(this)
            );
          },
        },
      ]),
      e
    );
  })(ur),
  cr = (function (i) {
    se(e, i);
    function e(r, o, a) {
      Z(this, e);
      var d = oe(
          this,
          (e.__proto__ || Object.getPrototypeOf(e)).call(this, r, o)
        ),
        n = d;
      return (
        (d.__button = document.createElement("div")),
        (d.__button.innerHTML = a === void 0 ? "Fire" : a),
        g.bind(d.__button, "click", function (c) {
          return c.preventDefault(), n.fire(), !1;
        }),
        g.addClass(d.__button, "button"),
        d.domElement.appendChild(d.__button),
        d
      );
    }
    return (
      ee(e, [
        {
          key: "fire",
          value: function () {
            this.__onChange && this.__onChange.call(this),
              this.getValue().call(this.object),
              this.__onFinishChange &&
                this.__onFinishChange.call(this, this.getValue());
          },
        },
      ]),
      e
    );
  })(le),
  st = (function (i) {
    se(e, i);
    function e(r, o) {
      Z(this, e);
      var a = oe(
        this,
        (e.__proto__ || Object.getPrototypeOf(e)).call(this, r, o)
      );
      (a.__color = new Y(a.getValue())), (a.__temp = new Y(0));
      var d = a;
      (a.domElement = document.createElement("div")),
        g.makeSelectable(a.domElement, !1),
        (a.__selector = document.createElement("div")),
        (a.__selector.className = "selector"),
        (a.__saturation_field = document.createElement("div")),
        (a.__saturation_field.className = "saturation-field"),
        (a.__field_knob = document.createElement("div")),
        (a.__field_knob.className = "field-knob"),
        (a.__field_knob_border = "2px solid "),
        (a.__hue_knob = document.createElement("div")),
        (a.__hue_knob.className = "hue-knob"),
        (a.__hue_field = document.createElement("div")),
        (a.__hue_field.className = "hue-field"),
        (a.__input = document.createElement("input")),
        (a.__input.type = "text"),
        (a.__input_textShadow = "0 1px 1px "),
        g.bind(a.__input, "keydown", function (C) {
          C.keyCode === 13 && m.call(this);
        }),
        g.bind(a.__input, "blur", m),
        g.bind(a.__selector, "mousedown", function () {
          g.addClass(this, "drag").bind(window, "mouseup", function () {
            g.removeClass(d.__selector, "drag");
          });
        }),
        g.bind(a.__selector, "touchstart", function () {
          g.addClass(this, "drag").bind(window, "touchend", function () {
            g.removeClass(d.__selector, "drag");
          });
        });
      var n = document.createElement("div");
      b.extend(a.__selector.style, {
        width: "122px",
        height: "102px",
        padding: "3px",
        backgroundColor: "#222",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.3)",
      }),
        b.extend(a.__field_knob.style, {
          position: "absolute",
          width: "12px",
          height: "12px",
          border: a.__field_knob_border + (a.__color.v < 0.5 ? "#fff" : "#000"),
          boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
          borderRadius: "12px",
          zIndex: 1,
        }),
        b.extend(a.__hue_knob.style, {
          position: "absolute",
          width: "15px",
          height: "2px",
          borderRight: "4px solid #fff",
          zIndex: 1,
        }),
        b.extend(a.__saturation_field.style, {
          width: "100px",
          height: "100px",
          border: "1px solid #555",
          marginRight: "3px",
          display: "inline-block",
          cursor: "pointer",
        }),
        b.extend(n.style, {
          width: "100%",
          height: "100%",
          background: "none",
        }),
        Jt(n, "top", "rgba(0,0,0,0)", "#000"),
        b.extend(a.__hue_field.style, {
          width: "15px",
          height: "100px",
          border: "1px solid #555",
          cursor: "ns-resize",
          position: "absolute",
          top: "3px",
          right: "3px",
        }),
        sn(a.__hue_field),
        b.extend(a.__input.style, {
          outline: "none",
          textAlign: "center",
          color: "#fff",
          border: 0,
          fontWeight: "bold",
          textShadow: a.__input_textShadow + "rgba(0,0,0,0.7)",
        }),
        g.bind(a.__saturation_field, "mousedown", c),
        g.bind(a.__saturation_field, "touchstart", c),
        g.bind(a.__field_knob, "mousedown", c),
        g.bind(a.__field_knob, "touchstart", c),
        g.bind(a.__hue_field, "mousedown", l),
        g.bind(a.__hue_field, "touchstart", l);
      function c(C) {
        y(C),
          g.bind(window, "mousemove", y),
          g.bind(window, "touchmove", y),
          g.bind(window, "mouseup", t),
          g.bind(window, "touchend", t);
      }
      function l(C) {
        R(C),
          g.bind(window, "mousemove", R),
          g.bind(window, "touchmove", R),
          g.bind(window, "mouseup", p),
          g.bind(window, "touchend", p);
      }
      function t() {
        g.unbind(window, "mousemove", y),
          g.unbind(window, "touchmove", y),
          g.unbind(window, "mouseup", t),
          g.unbind(window, "touchend", t),
          h();
      }
      function p() {
        g.unbind(window, "mousemove", R),
          g.unbind(window, "touchmove", R),
          g.unbind(window, "mouseup", p),
          g.unbind(window, "touchend", p),
          h();
      }
      function m() {
        var C = nt(this.value);
        C !== !1
          ? ((d.__color.__state = C), d.setValue(d.__color.toOriginal()))
          : (this.value = d.__color.toString());
      }
      function h() {
        d.__onFinishChange &&
          d.__onFinishChange.call(d, d.__color.toOriginal());
      }
      a.__saturation_field.appendChild(n),
        a.__selector.appendChild(a.__field_knob),
        a.__selector.appendChild(a.__saturation_field),
        a.__selector.appendChild(a.__hue_field),
        a.__hue_field.appendChild(a.__hue_knob),
        a.domElement.appendChild(a.__input),
        a.domElement.appendChild(a.__selector),
        a.updateDisplay();
      function y(C) {
        C.type.indexOf("touch") === -1 && C.preventDefault();
        var E = d.__saturation_field.getBoundingClientRect(),
          S = (C.touches && C.touches[0]) || C,
          L = S.clientX,
          V = S.clientY,
          U = (L - E.left) / (E.right - E.left),
          W = 1 - (V - E.top) / (E.bottom - E.top);
        return (
          W > 1 ? (W = 1) : W < 0 && (W = 0),
          U > 1 ? (U = 1) : U < 0 && (U = 0),
          (d.__color.v = W),
          (d.__color.s = U),
          d.setValue(d.__color.toOriginal()),
          !1
        );
      }
      function R(C) {
        C.type.indexOf("touch") === -1 && C.preventDefault();
        var E = d.__hue_field.getBoundingClientRect(),
          S = (C.touches && C.touches[0]) || C,
          L = S.clientY,
          V = 1 - (L - E.top) / (E.bottom - E.top);
        return (
          V > 1 ? (V = 1) : V < 0 && (V = 0),
          (d.__color.h = V * 360),
          d.setValue(d.__color.toOriginal()),
          !1
        );
      }
      return a;
    }
    return (
      ee(e, [
        {
          key: "updateDisplay",
          value: function () {
            var o = nt(this.getValue());
            if (o !== !1) {
              var a = !1;
              b.each(
                Y.COMPONENTS,
                function (c) {
                  if (
                    !b.isUndefined(o[c]) &&
                    !b.isUndefined(this.__color.__state[c]) &&
                    o[c] !== this.__color.__state[c]
                  )
                    return (a = !0), {};
                },
                this
              ),
                a && b.extend(this.__color.__state, o);
            }
            b.extend(this.__temp.__state, this.__color.__state),
              (this.__temp.a = 1);
            var d = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0,
              n = 255 - d;
            b.extend(this.__field_knob.style, {
              marginLeft: 100 * this.__color.s - 7 + "px",
              marginTop: 100 * (1 - this.__color.v) - 7 + "px",
              backgroundColor: this.__temp.toHexString(),
              border:
                this.__field_knob_border + "rgb(" + d + "," + d + "," + d + ")",
            }),
              (this.__hue_knob.style.marginTop =
                (1 - this.__color.h / 360) * 100 + "px"),
              (this.__temp.s = 1),
              (this.__temp.v = 1),
              Jt(
                this.__saturation_field,
                "left",
                "#fff",
                this.__temp.toHexString()
              ),
              (this.__input.value = this.__color.toString()),
              b.extend(this.__input.style, {
                backgroundColor: this.__color.toHexString(),
                color: "rgb(" + d + "," + d + "," + d + ")",
                textShadow:
                  this.__input_textShadow +
                  "rgba(" +
                  n +
                  "," +
                  n +
                  "," +
                  n +
                  ",.7)",
              });
          },
        },
      ]),
      e
    );
  })(le),
  nn = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
function Jt(i, e, r, o) {
  (i.style.background = ""),
    b.each(nn, function (a) {
      i.style.cssText +=
        "background: " +
        a +
        "linear-gradient(" +
        e +
        ", " +
        r +
        " 0%, " +
        o +
        " 100%); ";
    });
}
function sn(i) {
  (i.style.background = ""),
    (i.style.cssText +=
      "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);"),
    (i.style.cssText +=
      "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
    (i.style.cssText +=
      "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
    (i.style.cssText +=
      "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"),
    (i.style.cssText +=
      "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);");
}
var on = {
    load: function (e, r) {
      var o = r || document,
        a = o.createElement("link");
      (a.type = "text/css"),
        (a.rel = "stylesheet"),
        (a.href = e),
        o.getElementsByTagName("head")[0].appendChild(a);
    },
    inject: function (e, r) {
      var o = r || document,
        a = document.createElement("style");
      (a.type = "text/css"), (a.innerHTML = e);
      var d = o.getElementsByTagName("head")[0];
      try {
        d.appendChild(a);
      } catch {}
    },
  },
  an = `<div id="dg-save" class="dg dialogue">

  Here's the new load parameter for your <code>GUI</code>'s constructor:

  <textarea id="dg-new-constructor"></textarea>

  <div id="dg-save-locally">

    <input id="dg-local-storage" type="checkbox"/> Automatically save
    values to <code>localStorage</code> on exit.

    <div id="dg-local-explain">The values saved to <code>localStorage</code> will
      override those passed to <code>dat.GUI</code>'s constructor. This makes it
      easier to work incrementally, but <code>localStorage</code> is fragile,
      and your friends may not see the same values you do.

    </div>

  </div>

</div>`,
  ln = function (e, r) {
    var o = e[r];
    return b.isArray(arguments[2]) || b.isObject(arguments[2])
      ? new en(e, r, arguments[2])
      : b.isNumber(o)
      ? b.isNumber(arguments[2]) && b.isNumber(arguments[3])
        ? b.isNumber(arguments[4])
          ? new it(e, r, arguments[2], arguments[3], arguments[4])
          : new it(e, r, arguments[2], arguments[3])
        : b.isNumber(arguments[4])
        ? new Pe(e, r, {
            min: arguments[2],
            max: arguments[3],
            step: arguments[4],
          })
        : new Pe(e, r, { min: arguments[2], max: arguments[3] })
      : b.isString(o)
      ? new tn(e, r)
      : b.isFunction(o)
      ? new cr(e, r, "")
      : b.isBoolean(o)
      ? new dr(e, r)
      : null;
  };
function dn(i) {
  setTimeout(i, 1e3 / 60);
}
var un =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    dn,
  cn = (function () {
    function i() {
      Z(this, i),
        (this.backgroundElement = document.createElement("div")),
        b.extend(this.backgroundElement.style, {
          backgroundColor: "rgba(0,0,0,0.8)",
          top: 0,
          left: 0,
          display: "none",
          zIndex: "1000",
          opacity: 0,
          WebkitTransition: "opacity 0.2s linear",
          transition: "opacity 0.2s linear",
        }),
        g.makeFullscreen(this.backgroundElement),
        (this.backgroundElement.style.position = "fixed"),
        (this.domElement = document.createElement("div")),
        b.extend(this.domElement.style, {
          position: "fixed",
          display: "none",
          zIndex: "1001",
          opacity: 0,
          WebkitTransition:
            "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
          transition: "transform 0.2s ease-out, opacity 0.2s linear",
        }),
        document.body.appendChild(this.backgroundElement),
        document.body.appendChild(this.domElement);
      var e = this;
      g.bind(this.backgroundElement, "click", function () {
        e.hide();
      });
    }
    return (
      ee(i, [
        {
          key: "show",
          value: function () {
            var r = this;
            (this.backgroundElement.style.display = "block"),
              (this.domElement.style.display = "block"),
              (this.domElement.style.opacity = 0),
              (this.domElement.style.webkitTransform = "scale(1.1)"),
              this.layout(),
              b.defer(function () {
                (r.backgroundElement.style.opacity = 1),
                  (r.domElement.style.opacity = 1),
                  (r.domElement.style.webkitTransform = "scale(1)");
              });
          },
        },
        {
          key: "hide",
          value: function () {
            var r = this,
              o = function a() {
                (r.domElement.style.display = "none"),
                  (r.backgroundElement.style.display = "none"),
                  g.unbind(r.domElement, "webkitTransitionEnd", a),
                  g.unbind(r.domElement, "transitionend", a),
                  g.unbind(r.domElement, "oTransitionEnd", a);
              };
            g.bind(this.domElement, "webkitTransitionEnd", o),
              g.bind(this.domElement, "transitionend", o),
              g.bind(this.domElement, "oTransitionEnd", o),
              (this.backgroundElement.style.opacity = 0),
              (this.domElement.style.opacity = 0),
              (this.domElement.style.webkitTransform = "scale(1.1)");
          },
        },
        {
          key: "layout",
          value: function () {
            (this.domElement.style.left =
              window.innerWidth / 2 - g.getWidth(this.domElement) / 2 + "px"),
              (this.domElement.style.top =
                window.innerHeight / 2 -
                g.getHeight(this.domElement) / 2 +
                "px");
          },
        },
      ]),
      i
    );
  })(),
  hn =
    qr(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);
on.inject(hn);
var Qt = "dg",
  Zt = 72,
  er = 20,
  be = "Default",
  _e = (function () {
    try {
      return !!window.localStorage;
    } catch {
      return !1;
    }
  })(),
  ge = void 0,
  tr = !0,
  de = void 0,
  rt = !1,
  hr = [],
  H = function i(e) {
    var r = this,
      o = e || {};
    (this.domElement = document.createElement("div")),
      (this.__ul = document.createElement("ul")),
      this.domElement.appendChild(this.__ul),
      g.addClass(this.domElement, Qt),
      (this.__folders = {}),
      (this.__controllers = []),
      (this.__rememberedObjects = []),
      (this.__rememberedObjectIndecesToControllers = []),
      (this.__listening = []),
      (o = b.defaults(o, {
        closeOnTop: !1,
        autoPlace: !0,
        width: i.DEFAULT_WIDTH,
      })),
      (o = b.defaults(o, { resizable: o.autoPlace, hideable: o.autoPlace })),
      b.isUndefined(o.load)
        ? (o.load = { preset: be })
        : o.preset && (o.load.preset = o.preset),
      b.isUndefined(o.parent) && o.hideable && hr.push(this),
      (o.resizable = b.isUndefined(o.parent) && o.resizable),
      o.autoPlace && b.isUndefined(o.scrollable) && (o.scrollable = !0);
    var a = _e && localStorage.getItem(ue(this, "isLocal")) === "true",
      d = void 0,
      n = void 0;
    if (
      (Object.defineProperties(this, {
        parent: {
          get: function () {
            return o.parent;
          },
        },
        scrollable: {
          get: function () {
            return o.scrollable;
          },
        },
        autoPlace: {
          get: function () {
            return o.autoPlace;
          },
        },
        closeOnTop: {
          get: function () {
            return o.closeOnTop;
          },
        },
        preset: {
          get: function () {
            return r.parent ? r.getRoot().preset : o.load.preset;
          },
          set: function (h) {
            r.parent ? (r.getRoot().preset = h) : (o.load.preset = h),
              mn(this),
              r.revert();
          },
        },
        width: {
          get: function () {
            return o.width;
          },
          set: function (h) {
            (o.width = h), lt(r, h);
          },
        },
        name: {
          get: function () {
            return o.name;
          },
          set: function (h) {
            (o.name = h), n && (n.innerHTML = o.name);
          },
        },
        closed: {
          get: function () {
            return o.closed;
          },
          set: function (h) {
            (o.closed = h),
              o.closed
                ? g.addClass(r.__ul, i.CLASS_CLOSED)
                : g.removeClass(r.__ul, i.CLASS_CLOSED),
              this.onResize(),
              r.__closeButton &&
                (r.__closeButton.innerHTML = h ? i.TEXT_OPEN : i.TEXT_CLOSED);
          },
        },
        load: {
          get: function () {
            return o.load;
          },
        },
        useLocalStorage: {
          get: function () {
            return a;
          },
          set: function (h) {
            _e &&
              ((a = h),
              h ? g.bind(window, "unload", d) : g.unbind(window, "unload", d),
              localStorage.setItem(ue(r, "isLocal"), h));
          },
        },
      }),
      b.isUndefined(o.parent))
    ) {
      if (
        ((this.closed = o.closed || !1),
        g.addClass(this.domElement, i.CLASS_MAIN),
        g.makeSelectable(this.domElement, !1),
        _e && a)
      ) {
        r.useLocalStorage = !0;
        var c = localStorage.getItem(ue(this, "gui"));
        c && (o.load = JSON.parse(c));
      }
      (this.__closeButton = document.createElement("div")),
        (this.__closeButton.innerHTML = i.TEXT_CLOSED),
        g.addClass(this.__closeButton, i.CLASS_CLOSE_BUTTON),
        o.closeOnTop
          ? (g.addClass(this.__closeButton, i.CLASS_CLOSE_TOP),
            this.domElement.insertBefore(
              this.__closeButton,
              this.domElement.childNodes[0]
            ))
          : (g.addClass(this.__closeButton, i.CLASS_CLOSE_BOTTOM),
            this.domElement.appendChild(this.__closeButton)),
        g.bind(this.__closeButton, "click", function () {
          r.closed = !r.closed;
        });
    } else {
      o.closed === void 0 && (o.closed = !0);
      var l = document.createTextNode(o.name);
      g.addClass(l, "controller-name"), (n = ct(r, l));
      var t = function (h) {
        return h.preventDefault(), (r.closed = !r.closed), !1;
      };
      g.addClass(this.__ul, i.CLASS_CLOSED),
        g.addClass(n, "title"),
        g.bind(n, "click", t),
        o.closed || (this.closed = !1);
    }
    o.autoPlace &&
      (b.isUndefined(o.parent) &&
        (tr &&
          ((de = document.createElement("div")),
          g.addClass(de, Qt),
          g.addClass(de, i.CLASS_AUTO_PLACE_CONTAINER),
          document.body.appendChild(de),
          (tr = !1)),
        de.appendChild(this.domElement),
        g.addClass(this.domElement, i.CLASS_AUTO_PLACE)),
      this.parent || lt(r, o.width)),
      (this.__resizeHandler = function () {
        r.onResizeDebounced();
      }),
      g.bind(window, "resize", this.__resizeHandler),
      g.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler),
      g.bind(this.__ul, "transitionend", this.__resizeHandler),
      g.bind(this.__ul, "oTransitionEnd", this.__resizeHandler),
      this.onResize(),
      o.resizable && _n(this),
      (d = function () {
        _e &&
          localStorage.getItem(ue(r, "isLocal")) === "true" &&
          localStorage.setItem(ue(r, "gui"), JSON.stringify(r.getSaveObject()));
      }),
      (this.saveToLocalStorageIfPossible = d);
    function p() {
      var m = r.getRoot();
      (m.width += 1),
        b.defer(function () {
          m.width -= 1;
        });
    }
    o.parent || p();
  };
H.toggleHide = function () {
  (rt = !rt),
    b.each(hr, function (i) {
      i.domElement.style.display = rt ? "none" : "";
    });
};
H.CLASS_AUTO_PLACE = "a";
H.CLASS_AUTO_PLACE_CONTAINER = "ac";
H.CLASS_MAIN = "main";
H.CLASS_CONTROLLER_ROW = "cr";
H.CLASS_TOO_TALL = "taller-than-window";
H.CLASS_CLOSED = "closed";
H.CLASS_CLOSE_BUTTON = "close-button";
H.CLASS_CLOSE_TOP = "close-top";
H.CLASS_CLOSE_BOTTOM = "close-bottom";
H.CLASS_DRAG = "drag";
H.DEFAULT_WIDTH = 245;
H.TEXT_CLOSED = "Close Controls";
H.TEXT_OPEN = "Open Controls";
H._keydownHandler = function (i) {
  document.activeElement.type !== "text" &&
    (i.which === Zt || i.keyCode === Zt) &&
    H.toggleHide();
};
g.bind(window, "keydown", H._keydownHandler, !1);
b.extend(H.prototype, {
  add: function (e, r) {
    return ve(this, e, r, {
      factoryArgs: Array.prototype.slice.call(arguments, 2),
    });
  },
  addColor: function (e, r) {
    return ve(this, e, r, { color: !0 });
  },
  remove: function (e) {
    this.__ul.removeChild(e.__li),
      this.__controllers.splice(this.__controllers.indexOf(e), 1);
    var r = this;
    b.defer(function () {
      r.onResize();
    });
  },
  destroy: function () {
    if (this.parent)
      throw new Error(
        "Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead."
      );
    this.autoPlace && de.removeChild(this.domElement);
    var e = this;
    b.each(this.__folders, function (r) {
      e.removeFolder(r);
    }),
      g.unbind(window, "keydown", H._keydownHandler, !1),
      rr(this);
  },
  addFolder: function (e) {
    if (this.__folders[e] !== void 0)
      throw new Error(
        'You already have a folder in this GUI by the name "' + e + '"'
      );
    var r = { name: e, parent: this };
    (r.autoPlace = this.autoPlace),
      this.load &&
        this.load.folders &&
        this.load.folders[e] &&
        ((r.closed = this.load.folders[e].closed),
        (r.load = this.load.folders[e]));
    var o = new H(r);
    this.__folders[e] = o;
    var a = ct(this, o.domElement);
    return g.addClass(a, "folder"), o;
  },
  removeFolder: function (e) {
    this.__ul.removeChild(e.domElement.parentElement),
      delete this.__folders[e.name],
      this.load &&
        this.load.folders &&
        this.load.folders[e.name] &&
        delete this.load.folders[e.name],
      rr(e);
    var r = this;
    b.each(e.__folders, function (o) {
      e.removeFolder(o);
    }),
      b.defer(function () {
        r.onResize();
      });
  },
  open: function () {
    this.closed = !1;
  },
  close: function () {
    this.closed = !0;
  },
  hide: function () {
    this.domElement.style.display = "none";
  },
  show: function () {
    this.domElement.style.display = "";
  },
  onResize: function () {
    var e = this.getRoot();
    if (e.scrollable) {
      var r = g.getOffset(e.__ul).top,
        o = 0;
      b.each(e.__ul.childNodes, function (a) {
        (e.autoPlace && a === e.__save_row) || (o += g.getHeight(a));
      }),
        window.innerHeight - r - er < o
          ? (g.addClass(e.domElement, H.CLASS_TOO_TALL),
            (e.__ul.style.height = window.innerHeight - r - er + "px"))
          : (g.removeClass(e.domElement, H.CLASS_TOO_TALL),
            (e.__ul.style.height = "auto"));
    }
    e.__resize_handle &&
      b.defer(function () {
        e.__resize_handle.style.height = e.__ul.offsetHeight + "px";
      }),
      e.__closeButton && (e.__closeButton.style.width = e.width + "px");
  },
  onResizeDebounced: b.debounce(function () {
    this.onResize();
  }, 50),
  remember: function () {
    if (
      (b.isUndefined(ge) && ((ge = new cn()), (ge.domElement.innerHTML = an)),
      this.parent)
    )
      throw new Error("You can only call remember on a top level GUI.");
    var e = this;
    b.each(Array.prototype.slice.call(arguments), function (r) {
      e.__rememberedObjects.length === 0 && pn(e),
        e.__rememberedObjects.indexOf(r) === -1 &&
          e.__rememberedObjects.push(r);
    }),
      this.autoPlace && lt(this, this.width);
  },
  getRoot: function () {
    for (var e = this; e.parent; ) e = e.parent;
    return e;
  },
  getSaveObject: function () {
    var e = this.load;
    return (
      (e.closed = this.closed),
      this.__rememberedObjects.length > 0 &&
        ((e.preset = this.preset),
        e.remembered || (e.remembered = {}),
        (e.remembered[this.preset] = Le(this))),
      (e.folders = {}),
      b.each(this.__folders, function (r, o) {
        e.folders[o] = r.getSaveObject();
      }),
      e
    );
  },
  save: function () {
    this.load.remembered || (this.load.remembered = {}),
      (this.load.remembered[this.preset] = Le(this)),
      ot(this, !1),
      this.saveToLocalStorageIfPossible();
  },
  saveAs: function (e) {
    this.load.remembered ||
      ((this.load.remembered = {}), (this.load.remembered[be] = Le(this, !0))),
      (this.load.remembered[e] = Le(this)),
      (this.preset = e),
      at(this, e, !0),
      this.saveToLocalStorageIfPossible();
  },
  revert: function (e) {
    b.each(
      this.__controllers,
      function (r) {
        this.getRoot().load.remembered
          ? fr(e || this.getRoot(), r)
          : r.setValue(r.initialValue),
          r.__onFinishChange && r.__onFinishChange.call(r, r.getValue());
      },
      this
    ),
      b.each(this.__folders, function (r) {
        r.revert(r);
      }),
      e || ot(this.getRoot(), !1);
  },
  listen: function (e) {
    var r = this.__listening.length === 0;
    this.__listening.push(e), r && pr(this.__listening);
  },
  updateDisplay: function () {
    b.each(this.__controllers, function (e) {
      e.updateDisplay();
    }),
      b.each(this.__folders, function (e) {
        e.updateDisplay();
      });
  },
});
function ct(i, e, r) {
  var o = document.createElement("li");
  return (
    e && o.appendChild(e),
    r ? i.__ul.insertBefore(o, r) : i.__ul.appendChild(o),
    i.onResize(),
    o
  );
}
function rr(i) {
  g.unbind(window, "resize", i.__resizeHandler),
    i.saveToLocalStorageIfPossible &&
      g.unbind(window, "unload", i.saveToLocalStorageIfPossible);
}
function ot(i, e) {
  var r = i.__preset_select[i.__preset_select.selectedIndex];
  e ? (r.innerHTML = r.value + "*") : (r.innerHTML = r.value);
}
function fn(i, e, r) {
  if (
    ((r.__li = e),
    (r.__gui = i),
    b.extend(r, {
      options: function (n) {
        if (arguments.length > 1) {
          var c = r.__li.nextElementSibling;
          return (
            r.remove(),
            ve(i, r.object, r.property, {
              before: c,
              factoryArgs: [b.toArray(arguments)],
            })
          );
        }
        if (b.isArray(n) || b.isObject(n)) {
          var l = r.__li.nextElementSibling;
          return (
            r.remove(),
            ve(i, r.object, r.property, { before: l, factoryArgs: [n] })
          );
        }
      },
      name: function (n) {
        return (r.__li.firstElementChild.firstElementChild.innerHTML = n), r;
      },
      listen: function () {
        return r.__gui.listen(r), r;
      },
      remove: function () {
        return r.__gui.remove(r), r;
      },
    }),
    r instanceof it)
  ) {
    var o = new Pe(r.object, r.property, {
      min: r.__min,
      max: r.__max,
      step: r.__step,
    });
    b.each(
      ["updateDisplay", "onChange", "onFinishChange", "step", "min", "max"],
      function (d) {
        var n = r[d],
          c = o[d];
        r[d] = o[d] = function () {
          var l = Array.prototype.slice.call(arguments);
          return c.apply(o, l), n.apply(r, l);
        };
      }
    ),
      g.addClass(e, "has-slider"),
      r.domElement.insertBefore(o.domElement, r.domElement.firstElementChild);
  } else if (r instanceof Pe) {
    var a = function (n) {
      if (b.isNumber(r.__min) && b.isNumber(r.__max)) {
        var c = r.__li.firstElementChild.firstElementChild.innerHTML,
          l = r.__gui.__listening.indexOf(r) > -1;
        r.remove();
        var t = ve(i, r.object, r.property, {
          before: r.__li.nextElementSibling,
          factoryArgs: [r.__min, r.__max, r.__step],
        });
        return t.name(c), l && t.listen(), t;
      }
      return n;
    };
    (r.min = b.compose(a, r.min)), (r.max = b.compose(a, r.max));
  } else
    r instanceof dr
      ? (g.bind(e, "click", function () {
          g.fakeEvent(r.__checkbox, "click");
        }),
        g.bind(r.__checkbox, "click", function (d) {
          d.stopPropagation();
        }))
      : r instanceof cr
      ? (g.bind(e, "click", function () {
          g.fakeEvent(r.__button, "click");
        }),
        g.bind(e, "mouseover", function () {
          g.addClass(r.__button, "hover");
        }),
        g.bind(e, "mouseout", function () {
          g.removeClass(r.__button, "hover");
        }))
      : r instanceof st &&
        (g.addClass(e, "color"),
        (r.updateDisplay = b.compose(function (d) {
          return (e.style.borderLeftColor = r.__color.toString()), d;
        }, r.updateDisplay)),
        r.updateDisplay());
  r.setValue = b.compose(function (d) {
    return (
      i.getRoot().__preset_select && r.isModified() && ot(i.getRoot(), !0), d
    );
  }, r.setValue);
}
function fr(i, e) {
  var r = i.getRoot(),
    o = r.__rememberedObjects.indexOf(e.object);
  if (o !== -1) {
    var a = r.__rememberedObjectIndecesToControllers[o];
    if (
      (a === void 0 &&
        ((a = {}), (r.__rememberedObjectIndecesToControllers[o] = a)),
      (a[e.property] = e),
      r.load && r.load.remembered)
    ) {
      var d = r.load.remembered,
        n = void 0;
      if (d[i.preset]) n = d[i.preset];
      else if (d[be]) n = d[be];
      else return;
      if (n[o] && n[o][e.property] !== void 0) {
        var c = n[o][e.property];
        (e.initialValue = c), e.setValue(c);
      }
    }
  }
}
function ve(i, e, r, o) {
  if (e[r] === void 0)
    throw new Error('Object "' + e + '" has no property "' + r + '"');
  var a = void 0;
  if (o.color) a = new st(e, r);
  else {
    var d = [e, r].concat(o.factoryArgs);
    a = ln.apply(i, d);
  }
  o.before instanceof le && (o.before = o.before.__li),
    fr(i, a),
    g.addClass(a.domElement, "c");
  var n = document.createElement("span");
  g.addClass(n, "property-name"), (n.innerHTML = a.property);
  var c = document.createElement("div");
  c.appendChild(n), c.appendChild(a.domElement);
  var l = ct(i, c, o.before);
  return (
    g.addClass(l, H.CLASS_CONTROLLER_ROW),
    a instanceof st ? g.addClass(l, "color") : g.addClass(l, Jr(a.getValue())),
    fn(i, l, a),
    i.__controllers.push(a),
    a
  );
}
function ue(i, e) {
  return document.location.href + "." + e;
}
function at(i, e, r) {
  var o = document.createElement("option");
  (o.innerHTML = e),
    (o.value = e),
    i.__preset_select.appendChild(o),
    r && (i.__preset_select.selectedIndex = i.__preset_select.length - 1);
}
function nr(i, e) {
  e.style.display = i.useLocalStorage ? "block" : "none";
}
function pn(i) {
  var e = (i.__save_row = document.createElement("li"));
  g.addClass(i.domElement, "has-save"),
    i.__ul.insertBefore(e, i.__ul.firstChild),
    g.addClass(e, "save-row");
  var r = document.createElement("span");
  (r.innerHTML = "&nbsp;"), g.addClass(r, "button gears");
  var o = document.createElement("span");
  (o.innerHTML = "Save"), g.addClass(o, "button"), g.addClass(o, "save");
  var a = document.createElement("span");
  (a.innerHTML = "New"), g.addClass(a, "button"), g.addClass(a, "save-as");
  var d = document.createElement("span");
  (d.innerHTML = "Revert"), g.addClass(d, "button"), g.addClass(d, "revert");
  var n = (i.__preset_select = document.createElement("select"));
  if (
    (i.load && i.load.remembered
      ? b.each(i.load.remembered, function (m, h) {
          at(i, h, h === i.preset);
        })
      : at(i, be, !1),
    g.bind(n, "change", function () {
      for (var m = 0; m < i.__preset_select.length; m++)
        i.__preset_select[m].innerHTML = i.__preset_select[m].value;
      i.preset = this.value;
    }),
    e.appendChild(n),
    e.appendChild(r),
    e.appendChild(o),
    e.appendChild(a),
    e.appendChild(d),
    _e)
  ) {
    var c = document.getElementById("dg-local-explain"),
      l = document.getElementById("dg-local-storage"),
      t = document.getElementById("dg-save-locally");
    (t.style.display = "block"),
      localStorage.getItem(ue(i, "isLocal")) === "true" &&
        l.setAttribute("checked", "checked"),
      nr(i, c),
      g.bind(l, "change", function () {
        (i.useLocalStorage = !i.useLocalStorage), nr(i, c);
      });
  }
  var p = document.getElementById("dg-new-constructor");
  g.bind(p, "keydown", function (m) {
    m.metaKey && (m.which === 67 || m.keyCode === 67) && ge.hide();
  }),
    g.bind(r, "click", function () {
      (p.innerHTML = JSON.stringify(i.getSaveObject(), void 0, 2)),
        ge.show(),
        p.focus(),
        p.select();
    }),
    g.bind(o, "click", function () {
      i.save();
    }),
    g.bind(a, "click", function () {
      var m = prompt("Enter a new preset name.");
      m && i.saveAs(m);
    }),
    g.bind(d, "click", function () {
      i.revert();
    });
}
function _n(i) {
  var e = void 0;
  (i.__resize_handle = document.createElement("div")),
    b.extend(i.__resize_handle.style, {
      width: "6px",
      marginLeft: "-3px",
      height: "200px",
      cursor: "ew-resize",
      position: "absolute",
    });
  function r(d) {
    return (
      d.preventDefault(),
      (i.width += e - d.clientX),
      i.onResize(),
      (e = d.clientX),
      !1
    );
  }
  function o() {
    g.removeClass(i.__closeButton, H.CLASS_DRAG),
      g.unbind(window, "mousemove", r),
      g.unbind(window, "mouseup", o);
  }
  function a(d) {
    return (
      d.preventDefault(),
      (e = d.clientX),
      g.addClass(i.__closeButton, H.CLASS_DRAG),
      g.bind(window, "mousemove", r),
      g.bind(window, "mouseup", o),
      !1
    );
  }
  g.bind(i.__resize_handle, "mousedown", a),
    g.bind(i.__closeButton, "mousedown", a),
    i.domElement.insertBefore(
      i.__resize_handle,
      i.domElement.firstElementChild
    );
}
function lt(i, e) {
  (i.domElement.style.width = e + "px"),
    i.__save_row && i.autoPlace && (i.__save_row.style.width = e + "px"),
    i.__closeButton && (i.__closeButton.style.width = e + "px");
}
function Le(i, e) {
  var r = {};
  return (
    b.each(i.__rememberedObjects, function (o, a) {
      var d = {},
        n = i.__rememberedObjectIndecesToControllers[a];
      b.each(n, function (c, l) {
        d[l] = e ? c.initialValue : c.getValue();
      }),
        (r[a] = d);
    }),
    r
  );
}
function mn(i) {
  for (var e = 0; e < i.__preset_select.length; e++)
    i.__preset_select[e].value === i.preset &&
      (i.__preset_select.selectedIndex = e);
}
function pr(i) {
  i.length !== 0 &&
    un.call(window, function () {
      pr(i);
    }),
    b.each(i, function (e) {
      e.updateDisplay();
    });
}
var gn = H;
const vn = () => {};
class bn {
  constructor(e) {
    (this.gui = new gn({ autoPlace: !0 })),
      (this.gui.domElement.parentElement.style.zIndex = 2),
      (this.config = {
        enableShadows: !0,
        shadowTransparency: 0.8,
        lightIntensity: 1,
        suspendSimulation: !1,
        delay: 10,
        gravity: 1,
        mass: 1,
        friction: 0.8,
        restitution: 0,
        linearDamping: 0.5,
        angularDamping: 0.4,
        startingHeight: 8,
        settleTimeout: 5e3,
        spinForce: 6,
        throwForce: 5,
        scale: 5,
        themeColor: e.themeColor || "#0974E6",
        theme: e.themes || ["default"],
      }),
      (this.onUpdate = (e == null ? void 0 : e.onUpdate) || vn),
      this.init();
  }
  init() {
    const e = this.gui.addFolder("Physics");
    e
      .add(this.config, "gravity", 0, 10, 1)
      .onChange(this.handleUpdate.bind(this)),
      e
        .add(this.config, "mass", 1, 20, 1)
        .onChange(this.handleUpdate.bind(this)),
      e
        .add(this.config, "friction", 0, 1, 0.1)
        .onChange(this.handleUpdate.bind(this)),
      e
        .add(this.config, "restitution", 0, 1, 0.1)
        .onChange(this.handleUpdate.bind(this)),
      e
        .add(this.config, "linearDamping", 0, 1, 0.1)
        .onChange(this.handleUpdate.bind(this)),
      e
        .add(this.config, "angularDamping", 0, 1, 0.1)
        .onChange(this.handleUpdate.bind(this)),
      e
        .add(this.config, "spinForce", 0, 15, 1)
        .onChange(this.handleUpdate.bind(this)),
      e
        .add(this.config, "throwForce", 0, 15, 1)
        .onChange(this.handleUpdate.bind(this)),
      e
        .add(this.config, "startingHeight", 1, 65, 1)
        .onChange(this.handleUpdate.bind(this)),
      e
        .add(this.config, "settleTimeout", 1e3, 2e4, 1e3)
        .onChange(this.handleUpdate.bind(this)),
      e.open();
    const r = this.gui.addFolder("Rendering");
    r
      .add(this.config, "delay", 10, 500, 10)
      .onChange(this.handleUpdate.bind(this)),
      r
        .add(this.config, "scale", 1, 10, 0.1)
        .onChange(this.handleUpdate.bind(this)),
      (this.themeSelect = r
        .add(this.config, "theme", this.config.theme)
        .onChange(this.handleUpdate.bind(this))),
      (this.themeColorPicker = r
        .addColor(this.config, "themeColor")
        .onChange(this.handleUpdate.bind(this))),
      r
        .add(this.config, "enableShadows")
        .onChange(this.handleUpdate.bind(this)),
      r
        .add(this.config, "shadowTransparency", 0, 1, 0.01)
        .onChange(this.handleUpdate.bind(this)),
      r
        .add(this.config, "lightIntensity", 0, 5, 0.1)
        .onChange(this.handleUpdate.bind(this)),
      r
        .add(this.config, "suspendSimulation")
        .onChange(this.handleUpdate.bind(this)),
      r.open(),
      this.gui.close();
  }
  handleUpdate(e) {
    this.onUpdate(this.config);
  }
}
var ae = "/assets/polyhedral_dice.c7bfffdf.svg";
const De = () => {},
  ir = {
    d4: { count: 0 },
    d6: { count: 0 },
    d8: { count: 0 },
    d10: { count: 0 },
    d12: { count: 0 },
    d20: { count: 0 },
    d100: { count: 0 },
  };
function sr(i) {
  return JSON.parse(JSON.stringify(i));
}
class yn {
  constructor(e) {
    et(this, "notation", sr(ir));
    et(this, "DRP", new ar());
    (this.target = e.target ? document.querySelector(e.target) : document.body),
      (this.elem = this.elem =
        document.createRange().createContextualFragment(`
      <div class="dice-picker">
        <form>
          <div class="dice">
            <button value="d4"><img class="die" src="${ae}#d4_die" alt="d4" /></button>
            <button value="d6"><img class="die" src="${ae}#d6_die" alt="d6" /></button>
            <button value="d8"><img class="die" src="${ae}#d8_die" alt="d8" /></button>
            <button value="d10"><img class="die" src="${ae}#d10_die" alt="d10" /></button>
            <button value="d12"><img class="die" src="${ae}#d12_die" alt="d12" /></button>
            <button value="d20"><img class="die" src="${ae}#d20_die" alt="d20" /></button>
            <button value="d100"><img class="die" src="${ae}#d100_die" alt="d100" /></button>
          </div>
          <div class="output">click or tap dice icons to add to roll</div>
          <div class="action">
            <button type="reset" class="btn btn-outline-warning">Clear</button>
            <button type="submit" class="btn btn-outline-warning">Throw</button>
          </div>
        </form>
      </div>
    `)),
      (this.onSubmit = (e == null ? void 0 : e.onSubmit) || De),
      (this.onClear = (e == null ? void 0 : e.onClear) || De),
      (this.onReroll = (e == null ? void 0 : e.onReroll) || De),
      (this.onResults = (e == null ? void 0 : e.onResults) || De),
      this.init();
  }
  init() {
    this.output = this.elem.querySelector(".output");
    const e = this.elem.querySelector("form");
    this.elem.querySelectorAll(".dice button").forEach((o) =>
      o.addEventListener("click", (a) => {
        a.preventDefault(),
          (this.notation[o.value].count += 1),
          this.updateNotation();
      })
    ),
      e.addEventListener("submit", (o) => {
        o.preventDefault(),
          this.onSubmit(this.DRP.parseNotation(this.output.innerHTML));
      }),
      e.addEventListener("reset", (o) => {
        o.preventDefault(), this.updateNotation(!0);
      }),
      this.target.prepend(this.elem);
  }
  updateNotation(e) {
    let r = "";
    e
      ? (this.clear(), (r = "click or tap dice icons to add to roll"))
      : (r = Object.entries(this.notation).reduce((o, [a, d]) => {
          let n = "";
          return (
            o !== "" && (n = " + "), d.count === 0 ? o : o + n + d.count + a
          );
        }, "")),
      (this.output.innerHTML = r);
  }
  setNotation(e = {}) {
    (this.notation = e), this.updateNotation();
  }
  clear() {
    (this.notation = sr(ir)), this.DRP.clear(), this.onClear();
  }
  handleResults(e) {
    const r = this.DRP.handleRerolls(e);
    if (r.length) return this.onReroll(r), r;
    const o = this.DRP.parsedNotation ? this.DRP.parseFinalResults(e) : e,
      a = new CustomEvent("resultsAvailable", { detail: o });
    return document.dispatchEvent(a), this.onResults(o), o;
  }
}
let xn = "default",
  Q = new Ur(".overlay", {
    assetPath: "/assets/dice-box/",
    theme: xn,
    offscreen: !0,
  }),
  me = !1;
Q.init().then(async (i) => {
  const e = new bn({
    themes: [
      "default",
      "rust",
      "smooth",
      "rock",
      "diceOfRolling",
      "diceOfRolling-fate",
      "blueGreenMetal",
      "gemstone",
      "gemstoneMarble",
      "wooden",
    ],
    themeColor: i.config.themeColor,
    onUpdate: (c) => {
      Q.updateConfig(c);
    },
  });
  e.themeSelect.setValue(i.config.theme),
    (Q.onThemeConfigLoaded = (c) => {
      c.themeColor && e.themeColorPicker.setValue(c.themeColor);
    }),
    (Q.onThemeLoaded = (c) => {
      console.log("callback themeLoaded", c);
    });
  const r = new Xr(".overlay"),
    o = new yn({
      target: "#rollers",
      onSubmit: (c) => {
        o.onClear(), Q.roll(c);
      },
      onClear: () => {
        r.clear(), Q.clear();
      },
      onReroll: (c) => {
        c.forEach((l) => Q.add(l));
      },
      onResults: (c) => {
        r.showResults(c);
      },
    }),
    a = new Wr({
      target: "#rollers",
      targetRollsCrit: !1,
      onSubmit: (c) => {
        Q.roll(c);
      },
      onClear: () => {
        r.clear(), Q.clear();
      },
      onReroll: (c) => {
        Q.add(c);
      },
      onResults: (c) => {
        console.log("results", c), r.showResults(c);
      },
    }),
    d = document.querySelector(".adv-roller"),
    n = document.createRange().createContextualFragment(`
			<div id="rollNotes">
				<div class="footnote">* accepts <em>most</em> roll formats seen on <a href="https://wiki.roll20.net/Dice_Reference#Roll20_Dice_Specification" target="_blank">Roll 20 Dice Specification</a></div>
				<div class="footnote">Rolls for unavailable dice, such as '1d5', will use 'crypto.getRandomValues' fallback to generate truely random numbers</div>
				<div class="footnote">Fate rolls now supported with 'df' such as '6df'</div>
				<div class="footnote">10's die available as 'd%' or 'd00' such as '5d00'</div>
				<button id="closeNotes" data-toggle="false">hide notes</button>
			</div>
		`);
  d.append(n),
    document.getElementById("closeNotes").addEventListener("click", (c) => {
      const l = c.target.dataset.toggle,
        t = document.querySelectorAll(".footnote");
      l === "false"
        ? (t.forEach((p) => (p.style.display = "none")),
          (c.target.innerText = "show notes"),
          (c.target.dataset.toggle = "true"))
        : (t.forEach((p) => (p.style.display = "block")),
          (c.target.innerText = "hide notes"),
          (c.target.dataset.toggle = "false"));
    }),
    (Q.onRollComplete = (c) => {
      me ? a.handleResults(c) : o.handleResults(c);
    }),
    (Q.onRemoveComplete = (c) => {}),
    o.setNotation({
      d4: { count: 2 },
      d6: { count: 2 },
      d8: { count: 2 },
      d10: { count: 2 },
      d12: { count: 2 },
      d20: { count: 2 },
      d100: { count: 1 },
    }),
    wn(),
    Q.roll(["2d4", "2d6", "2d8", "2d10", "2d12", "2d20", "1d100"]);
});
function wn() {
  const i = document.getElementById("toggleRoller"),
    e = document.querySelector(".adv-roller"),
    r = document.querySelector(".dice-picker");
  i.classList.add("btn", "btn-outline-warning");
  me ? e.classList.add("pt-current") : r.classList.add("pt-current"),
    i.addEventListener("click", (o) => {
      o.preventDefault(),
        console.log("toggleRoller!"),
        me
          ? (e.classList.add("pt-rotateCubeBottomOut"),
            e.classList.remove("pt-rotateCubeBottomIn"),
            r.classList.add("pt-current"),
            r.classList.add("pt-rotateCubeBottomIn"),
            r.classList.remove("pt-rotateCubeBottomOut"),
            (me = !1),
            setTimeout(() => e.classList.remove("pt-current"), 600))
          : (e.classList.add("pt-current"),
            e.classList.add("pt-rotateCubeBottomIn"),
            e.classList.remove("pt-rotateCubeBottomOut"),
            r.classList.add("pt-rotateCubeBottomOut"),
            r.classList.remove("pt-rotateCubeBottomIn"),
            (me = !0),
            setTimeout(() => r.classList.remove("pt-current"), 600));
    });
}
