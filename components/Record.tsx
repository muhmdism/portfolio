import { record } from "@/lib/data";

export default function Record() {
  return (
    <section id="record" className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <h2 data-build="wipe" className="w-fit font-display text-5xl uppercase leading-none text-white sm:text-7xl">The record so far</h2>
      <ol className="mt-14 max-w-3xl border-l border-zinc-800 pl-8 sm:pl-12">
        {record.map((r) => (
          <li key={r.title + r.when} data-build="pop" className="relative pb-12 last:pb-0">
            <span aria-hidden="true" className="dot" />
            <p className="font-mono text-xs text-accent">{r.when}</p>
            <h3 className="mt-1.5 font-display text-2xl uppercase leading-tight text-white sm:text-3xl">{r.title}</h3>
            <p className="mt-1 text-sm text-zinc-300">{r.where}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">{r.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
