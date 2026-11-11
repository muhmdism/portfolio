import { ArrowDown, MapPin } from "lucide-react";
import { heroStats, person } from "@/lib/data";

export default function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <span className="portfolio-word" data-build="wipe">PORTFOLIO</span>
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-[1500px] flex-1 flex-col items-center justify-center px-5 pb-10 pt-20 text-center sm:px-8 lg:px-12">
        <p data-build="type" className="w-fit font-brush text-4xl text-zinc-200 sm:text-5xl">Hello, I’m</p>
        <h1 data-build="type" className="mt-2 font-display text-[clamp(3.4rem,10vw,10rem)] uppercase leading-[.92] text-white">{person.name}</h1>
        <p data-build="type" className="mt-5 font-mono text-sm text-accent sm:text-base">{person.role}</p>
        <a href="#work" data-build="pop" className="btn btn-primary mt-8">View work <ArrowDown size={16} /></a>
        <div data-build="pop" className="mt-6 flex w-fit items-center gap-2 text-sm text-zinc-400">
          <MapPin size={14} />
          <span>Based in {person.city}</span>
        </div>
      </div>

      <div className="relative z-20 mx-auto grid w-full max-w-3xl grid-cols-3 gap-4 px-5 pb-28 sm:px-8">
        {heroStats.map((s) => (
          <div key={s.label} data-build="pop" className="border-l border-zinc-700 pl-4">
            <p className="font-display text-4xl leading-none text-white sm:text-5xl">{s.value}</p>
            <p className="mt-1.5 text-xs text-zinc-500 sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}