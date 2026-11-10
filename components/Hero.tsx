import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { heroStats, person } from "@/lib/data";

export default function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[36svh] z-0 flex justify-center lg:bottom-auto lg:top-[11svh]">
        <span className="portfolio-word" data-build="wipe">PORTFOLIO</span>
      </div>
      <div aria-hidden="true" data-build="pop" className="hero-glow" />
      <div data-build="wipe" className="absolute bottom-0 left-1/2 z-10 aspect-[1122/1402] h-[56svh] -translate-x-1/2 lg:h-[92svh]">
        <Image src="/headshot.png" alt="Portrait of Muhammed Abdulla K" fill priority sizes="(min-width:1024px) 40vw, 80vw" className="headshot object-contain object-bottom" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[11] h-32 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative z-20 mx-auto grid w-full max-w-[1500px] flex-1 gap-8 px-5 pb-[58svh] pt-20 sm:px-8 lg:grid-cols-3 lg:items-center lg:px-12 lg:pb-16 lg:pt-24">
        <div>
          <p data-build="type" className="w-fit font-brush text-3xl text-zinc-200 sm:text-4xl">Hello, I’m</p>
          <h1 data-build="type" className="mt-1 font-display text-[clamp(3.2rem,6.2vw,6.2rem)] uppercase leading-[.92] text-white">{person.name}</h1>
          <p data-build="type" className="mt-4 font-mono text-sm text-accent sm:text-base">{person.role}</p>
          <p data-build="type" className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-zinc-400">{person.bio}</p>
          <a href="#work" data-build="pop" className="btn btn-primary mt-7">View work <ArrowDown size={16} /></a>
          <div data-build="pop" className="mt-6 flex w-fit items-center gap-2 text-sm text-zinc-500">
            <MapPin size={14} />
            <span>Based in {person.city}</span>
          </div>
        </div>
        <div className="hidden lg:block" />
        <div className="grid grid-cols-3 gap-4 lg:w-60 lg:grid-cols-1 lg:justify-self-end lg:gap-7">
          {heroStats.map((s) => (
            <div key={s.label} data-build="pop" className="border-l border-zinc-700 pl-4">
              <p className="font-display text-4xl leading-none text-white sm:text-5xl lg:text-6xl">{s.value}</p>
              <p className="mt-1.5 text-xs text-zinc-500 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
