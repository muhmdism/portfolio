import { tools } from "@/lib/data";

const half = Math.ceil(tools.length / 2);
const rows = [tools.slice(0, half), tools.slice(half)];

export default function Stack() {
  return (
    <section id="stack" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <h2 data-build="wipe" className="w-fit font-display text-5xl uppercase leading-none text-white sm:text-7xl">Tools I work with</h2>
      </div>
      <ul className="sr-only">{tools.map((t) => <li key={t}>{t}</li>)}</ul>
      <div data-build="wipe" aria-hidden="true" className="marquee-wrap mt-12 space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="marquee" style={{ animationDuration: i === 0 ? "70s" : "90s" }}>
            {[...row, ...row].map((t, j) => <span key={`${t}-${j}`} className="tool">{t}</span>)}
          </div>
        ))}
      </div>
    </section>
  );
}
