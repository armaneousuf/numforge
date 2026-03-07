function switchTab(n, b) {
  document
    .querySelectorAll(".panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((x) => x.classList.remove("active"));
  document.getElementById("panel-" + n).classList.add("active");
  b.classList.add("active");
}

function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) if (n % i === 0) return false;
  return true;
}
function getF(n) {
  const f = [];
  for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i);
  return f;
}
function getPF(n) {
  const p = [];
  let d = 2;
  while (d * d <= n) {
    while (n % d === 0) {
      p.push(d);
      n /= d;
    }
    d++;
  }
  if (n > 1) p.push(n);
  return p;
}
function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}
function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}
function cF(a, b) {
  const s = new Set(getF(a));
  return getF(b).filter((f) => s.has(f));
}
function vi(v) {
  const n = parseInt(v);
  return !isNaN(n) && n >= 1 && n <= 999999 && n === Math.floor(Number(v));
}

function show(id, cls, html) {
  const e = document.getElementById(id);
  e.className = "rb " + cls;
  e.innerHTML = html;
  e.classList.add("on");
}
function hide(id) {
  const e = document.getElementById(id);
  e.classList.remove("on");
  e.className = "rb";
}

function gcdSteps(a, b) {
  const s = [];
  let x = a,
    y = b;
  while (y) {
    const r = x % y;
    s.push({ a: x, b: y, q: Math.floor(x / y), r });
    x = y;
    y = r;
  }
  return s;
}

/* SINGLE */
function checkSingle() {
  const inp = document.getElementById("single-input"),
    err = document.getElementById("single-err");
  hide("single-res");
  err.classList.remove("on");
  if (!vi(inp.value)) {
    err.classList.add("on");
    return;
  }
  const n = parseInt(inp.value);
  let cls,
    ico,
    title,
    sub,
    exp,
    extra = "";
  if (n === 1) {
    cls = "ry";
    ico = "🌟";
    title = "১ — বিশেষ সংখ্যা";
    sub = "মৌলিক বা যৌগিক নয়";
    exp = `<strong>১</strong> এর মাত্র <strong>১টি গুণনীয়ক</strong>। মৌলিক হতে হলে ঠিক ২টি গুণনীয়ক দরকার।`;
  } else if (isPrime(n)) {
    cls = "ry";
    ico = "⭐";
    title = `${n} — মৌলিক সংখ্যা`;
    sub = "মাত্র ২টি গুণনীয়ক";
    exp = `<strong>${n}</strong> মৌলিক। গুণনীয়ক মাত্র দুটো: <strong>১</strong> ও <strong>${n}</strong>।`;
    extra = `<div class="fsec"><div class="flbl">গুণনীয়কসমূহ</div><div class="chips">${getF(
      n,
    )
      .map((f) => `<span class="chip cy">${f}</span>`)
      .join("")}</div></div>`;
  } else {
    cls = "rv";
    ico = "🧩";
    const factors = getF(n),
      pf = getPF(n);
    title = `${n} — যৌগিক সংখ্যা`;
    sub = `${factors.length}টি গুণনীয়ক`;
    exp = `<strong>${n}</strong> যৌগিক। মৌলিক গুণনীয়ক বিভাজন: <strong>${pf.join(" × ")}</strong>।`;
    extra = `<div class="fsec"><div class="flbl">সব গুণনীয়ক (হলুদ = মৌলিক)</div><div class="chips">${factors.map((f) => `<span class="chip${isPrime(f) ? " cy" : ""}">${f}</span>`).join("")}</div></div>`;
  }
  show(
    "single-res",
    cls,
    `
    <div class="rhead"><div class="rico">${ico}</div><div><div class="rtitle">${title}</div><div class="rsub">${sub}</div></div></div>
    <div class="rdiv"></div><div class="rtext">${exp}</div>${extra}`,
  );
}

/* COPRIME */
function checkCoprime() {
  const err = document.getElementById("cp-err");
  hide("cp-res");
  err.classList.remove("on");
  const av = document.getElementById("cp-a").value,
    bv = document.getElementById("cp-b").value;
  if (!vi(av) || !vi(bv)) {
    err.classList.add("on");
    return;
  }
  const a = parseInt(av),
    b = parseInt(bv),
    g = gcd(a, b),
    co = g === 1;
  const shared = cF(a, b);
  const tA = isPrime(a) ? "⭐ মৌলিক" : a === 1 ? "বিশেষ" : "🧩 যৌগিক";
  const tB = isPrime(b) ? "⭐ মৌলিক" : b === 1 ? "বিশেষ" : "🧩 যৌগিক";
  const shH =
    !co && shared.length
      ? `<div class="fsec"><div class="flbl">সাধারণ গুণনীয়ক</div><div class="chips">${shared.map((f) => `<span class="chip cr">${f}</span>`).join("")}</div></div>`
      : "";
  show(
    "cp-res",
    co ? "rg" : "rr",
    `
    <div class="rhead"><div class="rico">${co ? "🤝" : "✗"}</div><div><div class="rtitle">${co ? "সহমৌলিক" : "সহমৌলিক নয়"}</div><div class="rsub">গসাগু(${a}, ${b}) = ${g}</div></div></div>
    <div class="gp">
      <div style="text-align:center"><div class="npill">${a}</div><div style="font-size:.7rem;color:var(--text3);margin-top:4px">${tA}</div></div>
      <div class="gbadge">ও<span class="gval">গসাগু = ${g}</span></div>
      <div style="text-align:center"><div class="npill">${b}</div><div style="font-size:.7rem;color:var(--text3);margin-top:4px">${tB}</div></div>
    </div>
    <div class="rdiv"></div>
    <div class="rtext">${co ? `<strong>${a}</strong> ও <strong>${b}</strong> এর একমাত্র সাধারণ গুণনীয়ক <strong>১</strong> — তাই সহমৌলিক।` : `<strong>${g}</strong> উভয়েরই সাধারণ গুণনীয়ক, তাই সহমৌলিক নয়।`}</div>${shH}`,
  );
}

/* GCD */
function checkGCD() {
  const err = document.getElementById("gcd-err");
  hide("gcd-res");
  err.classList.remove("on");
  const av = document.getElementById("gcd-a").value,
    bv = document.getElementById("gcd-b").value;
  if (!vi(av) || !vi(bv)) {
    err.classList.add("on");
    return;
  }
  const a = parseInt(av),
    b = parseInt(bv),
    g = gcd(a, b);
  const steps = gcdSteps(a, b);
  const cols = [
    "var(--cyan)",
    "var(--green)",
    "var(--yellow)",
    "var(--violet)",
    "var(--orange)",
    "var(--rose)",
  ];
  const pfa = getPF(a),
    pfb = getPF(b);
  const stH = steps
    .map(
      (s, i) => `
    <div class="step">
      <div class="snum" style="background:${cols[i % cols.length]};color:#111">${i + 1}</div>
      <div class="stxt">${s.a} = ${s.b} × ${s.q} + <strong style="color:var(--cyan)">${s.r}</strong></div>
    </div>`,
    )
    .join("");
  show(
    "gcd-res",
    "rc",
    `
    <div class="rhead"><div class="rico">🔗</div><div><div class="rtitle">গসাগু(${a}, ${b}) = ${g}</div><div class="rsub">গরিষ্ঠ সাধারণ গুণনীয়ক</div></div></div>
    <div class="bignum" style="color:var(--cyan)">${g}</div>
    <div class="rdiv"></div>
    <div class="rtext" style="margin-bottom:10px"><strong>${a}</strong> = ${pfa.join(" × ")}<br><strong>${b}</strong> = ${pfb.join(" × ")}</div>
    <div class="flbl" style="margin-bottom:6px">ইউক্লিডীয় পদ্ধতি</div>
    <div class="steps">${stH}</div>
    <div class="note nc" style="margin-top:10px">∴ গসাগু = <strong>${g}</strong>${g === 1 ? " — এরা সহমৌলিক।" : ""}</div>`,
  );
}

/* LCM */
function checkLCM() {
  const err = document.getElementById("lcm-err");
  hide("lcm-res");
  err.classList.remove("on");
  const av = document.getElementById("lcm-a").value,
    bv = document.getElementById("lcm-b").value;
  if (!vi(av) || !vi(bv)) {
    err.classList.add("on");
    return;
  }
  const a = parseInt(av),
    b = parseInt(bv),
    g = gcd(a, b),
    l = lcm(a, b);
  const mA = [],
    mB = [];
  for (let i = 1; mA.length < 7; i++) mA.push(a * i);
  for (let i = 1; mB.length < 7; i++) mB.push(b * i);
  show(
    "lcm-res",
    "rv",
    `
    <div class="rhead"><div class="rico">📐</div><div><div class="rtitle">লসাগু(${a}, ${b}) = ${l}</div><div class="rsub">লঘিষ্ঠ সাধারণ গুণিতক</div></div></div>
    <div class="bignum" style="color:var(--violet)">${l}</div>
    <div class="rdiv"></div>
    <div class="rtext" style="margin-bottom:10px">সূত্র: (${a} × ${b}) ÷ গসাগু = ${a * b} ÷ ${g} = <strong>${l}</strong></div>
    <div class="flbl" style="margin-bottom:6px">${a} এর গুণিতক</div>
    <div class="chips" style="margin-bottom:10px">${mA.map((m) => `<span class="chip${m === l ? " cv" : ""}">${m}</span>`).join("")}</div>
    <div class="flbl" style="margin-bottom:6px">${b} এর গুণিতক</div>
    <div class="chips">${mB.map((m) => `<span class="chip${m === l ? " cv" : ""}">${m}</span>`).join("")}</div>
    <div class="note nv" style="margin-top:10px">বেগুনি চিপ = সাধারণ গুণিতক। সবচেয়ে ছোটটি = লসাগু <strong>${l}</strong></div>`,
  );
}

/* FRAC SIMPLIFY */
function checkFrac() {
  const err = document.getElementById("frac-err");
  hide("frac-res");
  err.classList.remove("on");
  const nv = document.getElementById("frac-n").value,
    dv = document.getElementById("frac-d").value;
  const n = parseInt(nv),
    d = parseInt(dv);
  if (!nv || !dv || isNaN(n) || isNaN(d) || d === 0) {
    err.classList.add("on");
    return;
  }
  const g = gcd(Math.abs(n), Math.abs(d)),
    sn = n / g,
    sd = d / g;
  const already = g === 1;
  const dec = (n / d).toFixed(6).replace(/\.?0+$/, "");
  const pct = ((n / d) * 100).toFixed(2).replace(/\.?0+$/, "");
  const imp = Math.abs(n) > Math.abs(d) && sd !== 1;
  const mixed = imp
    ? `<br>মিশ্র ভগ্নাংশ: <strong>${Math.floor(Math.abs(sn) / sd)} ${Math.abs(sn) % sd}/${sd}</strong>`
    : "";
  show(
    "frac-res",
    "ro",
    `
    <div class="rhead"><div class="rico">½</div><div><div class="rtitle">${already ? "ইতিমধ্যে সরলতম" : "সরলীকৃত ভগ্নাংশ"}</div><div class="rsub">গসাগু(${Math.abs(n)}, ${Math.abs(d)}) = ${g}</div></div></div>
    <div class="fracrow">
      <div class="fcrd"><div class="fdisp" style="color:var(--text3)"><span class="fn">${n}</span><div class="fl"></div><span class="fd">${d}</span></div><div class="flabel">প্রদত্ত</div></div>
      <div class="farr">→</div>
      <div class="fcrd" style="border-color:rgba(244,137,74,.3)"><div class="fdisp" style="color:var(--orange)"><span class="fn">${sn}</span><div class="fl"></div><span class="fd">${sd}</span></div><div class="flabel" style="color:var(--orange)">সরলতম</div></div>
    </div>
    <div class="rdiv"></div>
    <div class="rtext">${already ? `<strong>${n}/${d}</strong> ইতিমধ্যে সরলতম।` : `উভয়কে গসাগু <strong>${g}</strong> দিয়ে ভাগ: ${n}÷${g}=<strong>${sn}</strong>, ${d}÷${g}=<strong>${sd}</strong>।`}${mixed}<br>দশমিক: <strong>${dec}</strong> &nbsp;|&nbsp; শতকরা: <strong>${pct}%</strong></div>`,
  );
}

/* FRAC OPS */
function checkFracOp() {
  const err = document.getElementById("fo-err");
  hide("fo-res");
  err.classList.remove("on");
  const n1 = parseInt(document.getElementById("fo-n1").value);
  const d1 = parseInt(document.getElementById("fo-d1").value);
  const n2 = parseInt(document.getElementById("fo-n2").value);
  const d2 = parseInt(document.getElementById("fo-d2").value);
  const op = document.getElementById("fo-op").value;
  if (
    isNaN(n1) ||
    isNaN(d1) ||
    isNaN(n2) ||
    isNaN(d2) ||
    d1 === 0 ||
    d2 === 0 ||
    (op === "/" && n2 === 0)
  ) {
    err.classList.add("on");
    return;
  }
  const opL = { "+": "যোগ", "-": "বিয়োগ", "*": "গুণ", "/": "ভাগ" };
  const opS = { "+": "＋", "-": "－", "*": "✕", "/": "÷" };
  let rn, rd, step;
  if (op === "+") {
    const l = lcm(d1, d2);
    rn = n1 * (l / d1) + n2 * (l / d2);
    rd = l;
    step = `লসাগু(${d1},${d2})=${l} → ${n1 * (l / d1)}/${l} + ${n2 * (l / d2)}/${l}`;
  } else if (op === "-") {
    const l = lcm(d1, d2);
    rn = n1 * (l / d1) - n2 * (l / d2);
    rd = l;
    step = `লসাগু(${d1},${d2})=${l} → ${n1 * (l / d1)}/${l} − ${n2 * (l / d2)}/${l}`;
  } else if (op === "*") {
    rn = n1 * n2;
    rd = d1 * d2;
    step = `${n1}×${n2}=${rn}, ${d1}×${d2}=${rd}`;
  } else {
    rn = n1 * d2;
    rd = d1 * n2;
    step = `${n1}/${d1} × ${d2}/${n2} = ${rn}/${rd}`;
  }
  const g = gcd(Math.abs(rn), Math.abs(rd) || 1),
    sn = rn / g,
    sd = rd / g;
  const dec = rd !== 0 ? (rn / rd).toFixed(6).replace(/\.?0+$/, "") : "∞";
  show(
    "fo-res",
    "ro",
    `
    <div class="rhead"><div class="rico">${opS[op]}</div><div><div class="rtitle">${opL[op]}ের ফলাফল</div><div class="rsub">${n1}/${d1} ${opS[op]} ${n2}/${d2}</div></div></div>
    <div class="fracrow">
      <div class="fcrd"><div class="fdisp" style="color:var(--text3)"><span class="fn">${rn}</span><div class="fl"></div><span class="fd">${rd}</span></div><div class="flabel">প্রাথমিক</div></div>
      <div class="farr">→</div>
      <div class="fcrd" style="border-color:rgba(244,137,74,.3)"><div class="fdisp" style="color:var(--orange)"><span class="fn">${sn}</span><div class="fl"></div><span class="fd">${sd}</span></div><div class="flabel" style="color:var(--orange)">সরলতম</div></div>
    </div>
    <div class="rdiv"></div>
    <div class="rtext">${step}<br>সরলতম: <strong>${sn}/${sd}</strong> &nbsp;|&nbsp; দশমিক: <strong>${dec}</strong></div>`,
  );
}

function onEnt(id, fn) {
  document.getElementById(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") fn();
  });
}
onEnt("single-input", checkSingle);
onEnt("cp-a", checkCoprime);
onEnt("cp-b", checkCoprime);
onEnt("gcd-a", checkGCD);
onEnt("gcd-b", checkGCD);
onEnt("lcm-a", checkLCM);
onEnt("lcm-b", checkLCM);
onEnt("frac-n", checkFrac);
onEnt("frac-d", checkFrac);
onEnt("fo-n1", checkFracOp);
onEnt("fo-d1", checkFracOp);
onEnt("fo-n2", checkFracOp);
onEnt("fo-d2", checkFracOp);
