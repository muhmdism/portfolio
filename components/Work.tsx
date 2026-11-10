import { ArrowUpRight } from "lucide-react";
import { projects, workStats } from "@/lib/data";

const wrap = "mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12";

export default function Work() {
  return (
    <section id="work" className={`${wrap} py-24 lg:py-32`}>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <h2 data-build="wipe" className="w-fit font-display text-5xl uppercase leading-none text-white sm:text-7xl">Work that ships</h2>
          <p data-build="type" className="mt-5 max-w-md text-zinc-400">Three builds across CI/CD automation, autonomous robotics and IoT hardware.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {workStats.map((s) => (
            <div key={s.label} data-build="pop" className="border-l border-zinc-700 pl-4">
              <p className="font-display text-4xl leading-none text-white sm:text-5xl">{s.value}</p>
              <p className="mt-1.5 text-xs text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.title} data-build="pop" className="card flex flex-col p-6 sm:p-7">
            <p data-build="type" className="w-fit font-mono text-xs text-zinc-500">{p.year}</p>
            <h3 data-build="type" className="mt-2 font-display text-3xl uppercase leading-[1.05] text-white">{p.title}</h3>
            <ul className="mt-5 flex flex-1 flex-col gap-3">
              {p.bullets.map((b) => (
                <li key={b} data-build="type" className="bullet">{b}</li>
              ))}
            </ul>
            <div data-build="pop" className="mt-6 flex flex-wrap gap-2">
              {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
            <div data-build="pop" className="mt-6 flex flex-wrap gap-3 border-t border-zinc-800 pt-5">
              {p.links?.live ? (
                <a className="btn btn-ghost btn-sm" href={p.links.live} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14} /></a>
              ) : (
                <button type="button" className="btn btn-ghost btn-sm" disabled title="No live link published">Live demo</button>
              )}
              {p.links?.code ? (
                <a className="btn btn-ghost btn-sm" href={p.links.code} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={14} /></a>
              ) : (
                <button type="button" className="btn btn-ghost btn-sm" disabled title="No code link published">Source code</button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
