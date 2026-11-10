import { principles, skillGroups } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 data-build="wipe" className="w-fit font-display text-5xl uppercase leading-none text-white sm:text-7xl">About me</h2>
          <p data-build="type" className="mt-6 max-w-md leading-relaxed text-zinc-400">I studied Electronics and Communication Engineering at College of Engineering Vadakara. Along the way I built an ESP32 health monitor, a LiDAR robot on ROS, and traced a broadcast chain during an internship at All India Radio.</p>
          <p data-build="type" className="mt-4 max-w-md leading-relaxed text-zinc-400">Now I’m training in DevOps at Zoople Technologies, Kozhikode: Linux, AWS, Jenkins, GitHub Actions and Docker. I speak English, Hindi, Arabic and Malayalam.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.title} data-build="pop" className="card p-5">
              <h3 className="font-mono text-sm text-white">{g.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-zinc-400">
                {g.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <h3 data-build="type" className="mt-24 w-fit font-display text-3xl uppercase text-white sm:text-4xl">Principles I work by</h3>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p) => (
          <div key={p.title} data-build="pop" className="card p-6">
            <h4 className="font-display text-2xl uppercase leading-tight text-accent">{p.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
