import { ArrowDownRight, Barbell, ForkKnife, Sparkle, UsersThree, ChartLineUp } from "@phosphor-icons/react/dist/ssr";

const features = [
  { id: "train", title: "Train", text: "Make every rep count", icon: Barbell, color: "text-violet-300" },
  { id: "fuel", title: "Fuel", text: "Find your daily balance", icon: ForkKnife, color: "text-cyan-300" },
  { id: "adapt", title: "Adapt", text: "Meet your GymBuddy", icon: Sparkle, color: "text-violet-300" },
  { id: "connect", title: "Connect", text: "Find your people", icon: UsersThree, color: "text-rose-300" },
  { id: "prove", title: "Prove", text: "See how far you’ve come", icon: ChartLineUp, color: "text-amber-300" },
];

export function FeatureOverview() {
  return (
    <section id="explore" className="border-b border-white/10 bg-[#07060c] py-10 md:py-14">
      <div className="content-shell">
        <p className="utility-text text-[0.62rem] text-violet-300">One app. Your whole arc.</p>
        <div className="mb-7 mt-3 flex items-end justify-between gap-4">
          <h2 className="display-text max-w-xl text-4xl font-bold leading-none text-white md:text-5xl">Find what moves you.</h2>
          <span className="hidden text-sm text-zinc-400 md:block">Explore the experience below</span>
        </div>
        <nav aria-label="Explore app features" className="feature-overview-grid">
          {features.map(({ id, title, text, icon: Icon, color }) => (
            <a key={id} href={`#${id}`} className="feature-overview-link group">
              <Icon size={23} className={`shrink-0 ${color}`} aria-hidden="true" />
              <span className="min-w-0"><span className="block text-sm font-bold text-white">{title}</span><span className="mt-1 block text-xs leading-5 text-zinc-400">{text}</span></span>
              <ArrowDownRight size={16} className="ml-auto shrink-0 text-zinc-500 group-hover:text-white" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
