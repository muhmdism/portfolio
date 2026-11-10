export type EngineState = { paused: boolean; agents: boolean; touring: boolean };
export type Engine = {
  getState: () => EngineState;
  subscribe: (fn: () => void) => () => void;
  togglePause: () => void;
  toggleAgents: () => void;
  toggleTour: () => void;
  destroy: () => void;
};

type Mode = "type" | "pop" | "wipe";
type Item = {
  el: HTMLElement; mode: Mode; state: 0 | 1 | 2 | 3; // 0 pending, 1 cursor assigned, 2 revealing, 3 done
  ready: boolean; parent: Item | null; text: string; a: Text | null; b: HTMLSpanElement | null;
};
type Agent = {
  root: HTMLElement; wire: HTMLElement; label: HTMLElement;
  x: number; y: number; fx: number; fy: number;
  item: Item | null; phase: 0 | 1 | 2 | 3; t: number; dur: number; shown: boolean; idleAt: number;
};

const NAMES = ["Scout", "Layout", "Typeset", "Motion", "QA", "Deploy", "Copy", "Lint", "Index", "Render", "Palette", "Review"];
const COLORS = ["#f97316", "#eab308", "#22c55e", "#14b8a6", "#38bdf8", "#ec4899", "#f43f5e", "#a3e635", "#fb923c", "#2dd4bf", "#facc15", "#60a5fa"];
const BOT = `<svg class="bot" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><line x1="8" y1="2" x2="8" y2="4.2" stroke="#09090b" stroke-width="1.3"/><circle class="ant" cx="8" cy="1.8" r="1.5" fill="#ff3b2f"/><rect x="1.5" y="4.2" width="13" height="10" rx="2.6" fill="#09090b"/><circle class="eye" cx="5.7" cy="9" r="1.5" fill="#4ade80"/><circle class="eye" cx="10.3" cy="9" r="1.5" fill="#4ade80"/></svg>`;
const ARROW = `<svg class="arrow" width="18" height="22" viewBox="0 0 18 22" aria-hidden="true"><path d="M1.5 1.5v16l4.4-4.1 3.3 7.2 3-1.4-3.2-7H16z" fill="var(--c)" stroke="#09090b" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const mk = (html: string) => {
  const d = document.createElement("div");
  d.innerHTML = html.trim();
  return d.firstElementChild as HTMLElement;
};

export function createEngine(): Engine {
  const root = document.documentElement;
  let building = root.classList.contains("build-mode");
  const boot = document.getElementById("boot");
  const state: EngineState = { paused: false, agents: building, touring: false };
  const subs = new Set<() => void>();
  const emit = () => subs.forEach((f) => f());

  const items: Item[] = [];
  const map = new Map<HTMLElement, Item>();
  const agents: Agent[] = [];
  const timers: number[] = [];
  const MAX_ACTIVE = 6;
  let clock = 0;
  let last = performance.now();
  let raf = 0;
  let started = !building;
  let rr = 0;
  let lastY = 0;
  let tour: { y0: number; T: number; t0: number } | null = null;
  let tourWait: { settle: number } | null = null;
  let io: IntersectionObserver | null = null;

  /* ---------- item effects ---------- */
  const apply = (it: Item, p: number) => {
    const el = it.el;
    if (it.mode === "type" && it.a && it.b) {
      const n = Math.round(it.text.length * p);
      it.a.data = it.text.slice(0, n);
      it.b.textContent = it.text.slice(n);
    } else if (it.mode === "wipe") {
      el.style.clipPath = `inset(-12% ${((1 - easeOut(p)) * 100).toFixed(2)}% -12% 0)`;
    } else {
      const e = easeOut(p);
      el.style.opacity = String(e);
      el.style.transform = `scale(${(0.92 + 0.08 * e).toFixed(4)})`;
    }
  };
  const reveal = (it: Item) => {
    const el = it.el;
    el.style.clipPath = "";
    el.style.opacity = "";
    el.style.transform = "";
    if (it.mode === "type" && it.a && it.b) {
      it.a.data = it.text;
      it.b.textContent = "";
    }
    el.setAttribute("data-built", "");
    it.state = 3;
  };
  const finish = (it: Item) => {
    if (it.state === 3) return;
    if (it.parent && it.parent.state < 3) finish(it.parent);
    const a = agents.find((x) => x.item === it);
    if (a) {
      a.item = null;
      a.wire.style.opacity = "0";
      a.idleAt = clock;
    }
    reveal(it);
  };
  const finishAll = () => items.forEach(finish);

  /* ---------- agents ---------- */
  const place = (a: Agent) => {
    a.root.style.transform = `translate3d(${a.x.toFixed(1)}px,${a.y.toFixed(1)}px,0)`;
  };
  const showAgent = (a: Agent) => {
    const side = Math.random();
    a.x = side < 0.5 ? Math.random() * innerWidth : innerWidth + 40;
    a.y = side < 0.5 ? -60 : Math.random() * innerHeight;
    a.shown = true;
    place(a);
    a.root.classList.add("on");
  };
  const target = (r: DOMRect) => ({ tx: clamp(r.left, 6, innerWidth - 120), ty: clamp(r.top, 6, innerHeight - 44) });
  const drawWire = (a: Agent, r: DOMRect, p: number) => {
    const s = a.wire.style;
    s.opacity = "1";
    s.transform = `translate3d(${r.left}px,${r.top}px,0)`;
    s.width = `${r.width * p}px`;
    s.height = `${r.height * p}px`;
  };
  const begin = (a: Agent, it: Item) => {
    it.state = 1;
    a.item = it;
    if (!a.shown) showAgent(a);
    const r = it.el.getBoundingClientRect();
    const { tx, ty } = target(r);
    a.phase = 0; a.t = 0; a.fx = a.x; a.fy = a.y;
    a.dur = clamp(320 + Math.hypot(tx - a.x, ty - a.y) * 0.45, 380, 950);
    a.label.textContent = `<${it.el.tagName.toLowerCase()}> ${Math.round(r.width)}×${Math.round(r.height)}`;
    a.wire.style.opacity = "0";
  };
  const assign = () => {
    let busy = agents.filter((a) => a.item).length;
    while (busy < MAX_ACTIVE) {
      const it = items.find((i) => i.state === 0 && i.ready && (!i.parent || i.parent.state >= 2));
      if (!it) return;
      let a: Agent | null = null;
      for (let k = 0; k < agents.length; k++) {
        const c = agents[(rr + k) % agents.length];
        if (!c.item) { a = c; rr = (rr + k + 1) % agents.length; break; }
      }
      if (!a) return;
      begin(a, it);
      busy++;
    }
  };
  const update = (a: Agent, dt: number) => {
    const it = a.item;
    if (!it) {
      if (a.shown && clock - a.idleAt > 1500) { a.shown = false; a.root.classList.remove("on"); }
      return;
    }
    a.t += dt;
    const r = it.el.getBoundingClientRect();
    const { tx, ty } = target(r);
    if (a.phase === 0) {
      const p = ease(clamp(a.t / a.dur, 0, 1));
      a.x = a.fx + (tx - a.fx) * p;
      a.y = a.fy + (ty - a.fy) * p;
      if (a.t >= a.dur) { a.phase = 1; a.t = 0; a.dur = clamp(300 + (r.width + r.height) * 0.3, 340, 800); }
    } else if (a.phase === 1) {
      const p = ease(clamp(a.t / a.dur, 0, 1));
      drawWire(a, r, p);
      a.x = clamp(r.left + r.width * p, 6, innerWidth - 120);
      a.y = clamp(r.top + r.height * p, 6, innerHeight - 44);
      if (a.t >= a.dur) {
        apply(it, 0);
        it.el.setAttribute("data-built", "");
        it.state = 2;
        a.phase = 2; a.t = 0;
        a.dur = it.mode === "type" ? clamp(it.text.length * 16, 350, 1800) : it.mode === "wipe" ? 650 : 380;
      }
    } else if (a.phase === 2) {
      const p = clamp(a.t / a.dur, 0, 1);
      apply(it, p);
      drawWire(a, r, 1);
      a.x = clamp(r.right, 6, innerWidth - 120);
      a.y = clamp(r.bottom, 6, innerHeight - 44);
      if (p >= 1) { reveal(it); a.phase = 3; a.t = 0; a.dur = 240; }
    } else {
      a.wire.style.opacity = String(clamp(1 - a.t / a.dur, 0, 1));
      if (a.t >= a.dur) { a.wire.style.opacity = "0"; a.item = null; a.idleAt = clock; }
    }
    place(a);
  };

  /* ---------- tour ---------- */
  const maxY = () => Math.max(0, root.scrollHeight - innerHeight);
  const stopTour = () => {
    if (!tour && !tourWait) return;
    tour = null; tourWait = null; state.touring = false; emit();
  };
  const beginTour = () => {
    const y1 = maxY();
    if (y1 <= 0) { stopTour(); return; }
    const y0 = scrollY;
    tour = { y0, T: Math.max(6000, ((y1 - y0) / 130) * 1000), t0: clock };
    state.touring = true; lastY = scrollY; emit();
  };
  const stepTour = () => {
    if (!tour) return;
    const t = clamp((clock - tour.t0) / tour.T, 0, 1);
    const A = 0.1, v = 1 / (1 - A);
    const s = t < A ? (v * t * t) / (2 * A) : t > 1 - A ? 1 - (v * (1 - t) * (1 - t)) / (2 * A) : v * (A / 2 + (t - A));
    window.scrollTo(0, tour.y0 + (maxY() - tour.y0) * s);
    lastY = window.scrollY;
    if (t >= 1) stopTour();
  };

  /* ---------- controls ---------- */
  const togglePause = () => {
    state.paused = !state.paused;
    root.classList.toggle("agents-paused", state.paused);
    last = performance.now();
    emit();
  };
  const toggleAgents = () => {
    if (state.agents) {
      try { localStorage.setItem("agents", "off"); } catch {}
      finishAll();
      building = false;
      root.classList.remove("build-mode");
      agents.forEach((a) => { a.root.remove(); a.wire.remove(); });
      agents.length = 0;
      state.agents = false;
      emit();
    } else {
      try { localStorage.setItem("agents", "on"); } catch {}
      const u = new URL(location.href);
      u.searchParams.delete("agents");
      location.href = u.toString();
    }
  };
  const toggleTour = () => {
    if (state.touring) { stopTour(); return; }
    try { sessionStorage.setItem("tour", "1"); } catch {}
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    location.reload();
  };

  /* ---------- setup ---------- */
  if (building) {
    document.querySelectorAll<HTMLElement>("[data-build]").forEach((el) => {
      const it: Item = { el, mode: (el.dataset.build as Mode) || "pop", state: 0, ready: false, parent: null, text: "", a: null, b: null };
      if (it.mode === "type") {
        it.text = el.textContent ?? "";
        el.textContent = "";
        it.a = document.createTextNode("");
        it.b = document.createElement("span");
        it.b.style.visibility = "hidden";
        it.b.textContent = it.text;
        el.append(it.a, it.b);
      }
      items.push(it);
      map.set(el, it);
    });
    items.forEach((it) => {
      let p = it.el.parentElement;
      while (p) { const f = map.get(p); if (f) { it.parent = f; break; } p = p.parentElement; }
    });
    const n = innerWidth < 768 ? 6 : 12;
    for (let i = 0; i < n; i++) {
      const root_ = mk(`<div class="agent" style="--c:${COLORS[i]}">${ARROW}<span class="tag">${BOT}<b>${NAMES[i]}</b></span></div>`);
      const wire = mk(`<div class="wire"><span class="wl"></span><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i></div>`);
      document.body.append(wire, root_);
      agents.push({ root: root_, wire, label: wire.querySelector(".wl") as HTMLElement, x: -80, y: -80, fx: 0, fy: 0, item: null, phase: 0, t: 0, dur: 1, shown: false, idleAt: 0 });
    }
    io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const it = map.get(e.target as HTMLElement);
        if (!it) continue;
        if (e.isIntersecting) it.ready = true;
        else if (e.boundingClientRect.top < 0 && it.state === 0) finish(it);
      }
    }, { rootMargin: "0px 0px -6% 0px" });
    items.forEach((it) => io!.observe(it.el));
    timers.push(window.setTimeout(() => { boot?.classList.add("done"); started = true; }, 1300));
  }

  let tourFlag = false;
  try { tourFlag = sessionStorage.getItem("tour") === "1"; sessionStorage.removeItem("tour"); } catch {}
  if (tourFlag) {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    tourWait = { settle: 0 };
    state.touring = true;
  }

  const heroItems = items.filter((i) => i.el.closest("#hero"));
  const frame = (ts: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(48, ts - last);
    last = ts;
    if (state.paused) return;
    clock += dt;
    if (tourWait && started) {
      if (!building || heroItems.every((i) => i.state === 3)) {
        tourWait.settle += dt;
        if (tourWait.settle > 700) { tourWait = null; beginTour(); }
      }
    }
    if (building && started) { assign(); agents.forEach((a) => update(a, dt)); }
    if (tour) stepTour();
  };
  raf = requestAnimationFrame(frame);

  const onKey = (e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target as HTMLElement | null;
    if (t && (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable)) return;
    const k = e.key.toLowerCase();
    if (k === "escape") stopTour();
    else if (k === "t") toggleTour();
    else if (k === "a") toggleAgents();
    else if (k === "p") togglePause();
    else if ([" ", "arrowdown", "arrowup", "pagedown", "pageup", "home", "end"].includes(k)) stopTour();
  };
  const onUser = () => stopTour();
  const onScroll = () => { if (tour && Math.abs(window.scrollY - lastY) > 8) stopTour(); };
  window.addEventListener("keydown", onKey);
  window.addEventListener("wheel", onUser, { passive: true });
  window.addEventListener("touchstart", onUser, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  return {
    getState: () => state,
    subscribe: (fn) => { subs.add(fn); return () => { subs.delete(fn); }; },
    togglePause, toggleAgents, toggleTour,
    destroy: () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onUser);
      window.removeEventListener("touchstart", onUser);
      window.removeEventListener("scroll", onScroll);
      agents.forEach((a) => { a.root.remove(); a.wire.remove(); });
    },
  };
}
