"use client";

import { useState } from "react";
import { Barbell, ForkKnife, Sparkle, ChartLineUp, ArrowUpRight } from "@phosphor-icons/react";
import { PhoneMockup } from "../phone-mockup";

const steps = [
  { title: "Put in the work", label: "Train", time: "Your session", icon: Barbell, screen: "train", text: "Log your sets as you go. Your workout becomes part of the bigger picture, not another note to keep track of.", next: "Then, fuel the work you just put in.", href: "#train" },
  { title: "Fuel the rest of your day", label: "Fuel", time: "Your next meal", icon: ForkKnife, screen: "fuel", text: "Log a meal, check your macros, and keep your daily nutrition in view. Small choices add up alongside your training.", next: "Need a little direction? Ask GymBuddy.", href: "#fuel" },
  { title: "Find your next step", label: "Ask", time: "When plans change", icon: Sparkle, screen: "adapt", text: "Bring your questions to GymBuddy. Get guidance with your workout and nutrition context already in the conversation.", next: "Keep showing up. Your progress tells the story.", href: "#adapt" },
  { title: "See the work adding up", label: "Reflect", time: "Your weekly check-in", icon: ChartLineUp, screen: "prove", text: "Review your workouts, habits, and momentum together. Notice what’s working and take that into your next week.", next: "One connected system. A little more momentum.", href: "#prove" },
];

export function DailyArc() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  return (
    <section id="your-day" className="daily-arc section-pause">
      <div className="content-shell">
        <p className="utility-text text-xs text-cyan-300">A day with Revenge Arc</p>
        <h2 className="section-title mt-3">Your day. <span className="text-zinc-400">All connected.</span></h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">From the first set to the bigger picture. Follow the moments that build your arc.</p>
        <div className="day-tabs" role="tablist" aria-label="A day with Revenge Arc">
          {steps.map(({ label, icon: Icon }, index) => <button key={label} type="button" id={`day-tab-${index}`} role="tab" aria-selected={active === index} aria-controls="day-panel" tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)} onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % steps.length;
              else if (event.key === "ArrowLeft") next = (index + steps.length - 1) % steps.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = steps.length - 1;
              else return;
              event.preventDefault(); setActive(next); document.getElementById(`day-tab-${next}`)?.focus();
            }}><Icon size={21} aria-hidden="true" /><span>{label}</span><span className="day-number" aria-hidden="true">0{index + 1}</span></button>)}
        </div>
        <div id="day-panel" className="day-panel" role="tabpanel" aria-labelledby={`day-tab-${active}`}>
          <div className="day-copy"><p className="utility-text text-[.65rem] text-cyan-300">{step.time}</p><h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight md:text-4xl">{step.title}</h3><p className="mt-4 max-w-lg text-base leading-7 text-zinc-300">{step.text}</p><p className="mt-6 border-l-2 border-cyan-300/40 pl-4 text-sm leading-6 text-cyan-100">{step.next}</p><a href={step.href} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white">Explore this feature <ArrowUpRight size={18} aria-hidden="true" /></a></div>
          <div className="day-phone"><PhoneMockup key={step.screen} src={`/assets/app-screens/${step.screen}.png`} alt={`${step.label} screen in Revenge Arc`} /></div>
        </div>
      </div>
    </section>
  );
}
