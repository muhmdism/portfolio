"use client";
import { useEffect, useState } from "react";
import { Bot, Pause, Play, Route, Square } from "lucide-react";
import { createEngine, type Engine, type EngineState } from "@/lib/engine";

export default function Dock() {
  const [eng, setEng] = useState<Engine | null>(null);
  const [s, setS] = useState<EngineState>({ paused: false, agents: true, touring: false });

  useEffect(() => {
    let e: Engine | null = null;
    let off: (() => void) | null = null;
    const id = window.setTimeout(() => {
      e = createEngine();
      setS({ ...e.getState() });
      off = e.subscribe(() => setS({ ...e!.getState() }));
      setEng(e);
    }, 0);
    return () => { clearTimeout(id); off?.(); e?.destroy(); };
  }, []);

  return (
    <div role="toolbar" aria-label="Build controls" className="dock">
      <button type="button" className="dock-btn" aria-pressed={s.paused} disabled={!eng || (!s.agents && !s.touring)} onClick={() => eng?.togglePause()} title="Pause (P)">
        {s.paused ? <Play size={15} /> : <Pause size={15} />}
        <span>{s.paused ? "Resume" : "Pause"}</span>
      </button>
      <button type="button" className="dock-btn" aria-pressed={s.agents} disabled={!eng} onClick={() => eng?.toggleAgents()} title="Agents on/off (A)">
        <Bot size={15} />
        <span>Agents {s.agents ? "on" : "off"}</span>
      </button>
      <button type="button" className="dock-btn" aria-pressed={s.touring} disabled={!eng} onClick={() => eng?.toggleTour()} title="Tour (T), Esc to stop">
        {s.touring ? <Square size={14} /> : <Route size={15} />}
        <span>{s.touring ? "Stop" : "Tour"}</span>
      </button>
    </div>
  );
}
