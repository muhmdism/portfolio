import { ArrowUpRight, Mail } from "lucide-react";
import { person } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1500px] px-5 pt-24 sm:px-8 lg:px-12 lg:pt-32">
      <h2 data-build="wipe" className="w-fit font-display text-5xl uppercase leading-none text-white sm:text-7xl">Let’s talk</h2>
      <div data-build="pop" className="cta mt-10 p-8 sm:p-14">
        <p data-build="type" className="max-w-3xl font-display text-4xl uppercase leading-[1.02] sm:text-6xl">Open to entry-level Cloud and DevOps roles.</p>
        <p data-build="type" className="mt-5 max-w-xl text-base font-medium">Email is the fastest way to reach me.</p>
        <div data-build="pop" className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${person.email}`} className="btn btn-dark"><Mail size={16} /> Email me</a>
          <a href={person.linkedin} target="_blank" rel="noreferrer" className="btn btn-dark">LinkedIn <ArrowUpRight size={16} /></a>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        <a data-build="pop" href={`mailto:${person.email}`} className="link break-all">{person.email}</a>
        <a data-build="pop" href={person.linkedin} target="_blank" rel="noreferrer" className="link">linkedin.com/in/muhammedabdullakofficial</a>
      </div>
      <footer className="mt-24 flex flex-wrap justify-between gap-2 border-t border-zinc-800 pb-28 pt-6 text-sm text-zinc-500">
        <p data-build="type">© 2026 {person.name}</p>
        <p data-build="type">{person.city}, India</p>
      </footer>
    </section>
  );
}
