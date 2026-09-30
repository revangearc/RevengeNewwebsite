"use client";

import { useState } from "react";
import {
  ArrowRight,
  Barbell,
  ChartLineUp,
  ForkKnife,
  Sparkle,
  Check,
} from "@phosphor-icons/react";
import { PhoneMockup } from "./phone-mockup";

const moments = [
  {
    label: "Workout",
    screen: "train",
    icon: Barbell,
    title: "Less remembering. More lifting.",
    text: "Your routine and set history stay together. Log the work while you do it.",
    steps: [
      "Pick your workout",
      "Log sets, reps & weight",
      "See your session add up",
    ],
    example: [
      "Dumbbell bench press",
      "Set 1 · 10 reps · 35 lb",
      "One set logged. Next set ready.",
    ],
    note: "Example workout—not a personalized prescription.",
  },
  {
    label: "Meal",
    screen: "fuel",
    icon: ForkKnife,
    title: "Log the meal. Keep your day in view.",
    text: "Search, scan, type, speak, or use a photo. Review your meal before saving it.",
    steps: [
      "Choose a logging method",
      "Review the food & serving",
      "Save it to your daily log",
    ],
    example: [
      "Photo, barcode, search, voice or text",
      "Check the portion and nutrition estimate",
      "Your calories and macros, together",
    ],
    note: "Calorie AI estimates can be wrong. Check ingredients and portions.",
  },
  {
    label: "GymBuddy",
    screen: "adapt",
    icon: Sparkle,
    title: "A little direction. Right when you need it.",
    text: "Ask a training or nutrition question with your app context in the conversation.",
    steps: [
      "Ask your question",
      "Review the suggestion",
      "Choose your next step",
    ],
    example: [
      "What can I train today?",
      "Review a suggestion alongside your routine",
      "Use your judgment. Adjust for how you feel.",
    ],
    note: "AI guidance is not medical care or a replacement for a qualified professional.",
  },
  {
    label: "Progress",
    screen: "prove",
    icon: ChartLineUp,
    title: "See the work you’ve been putting in.",
    text: "Workouts, nutrition, and habits come together in your weekly report.",
    steps: [
      "Keep logging your days",
      "Open your weekly report",
      "Plan the next small win",
    ],
    example: [
      "Your workout and meal history",
      "Notice patterns—not just a single day",
      "Keep what works. Adjust what doesn’t.",
    ],
    note: "Momentum is an app activity measure, not a medical assessment.",
  },
];

export function ProductDemo() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const moment = moments[active];
  function choose(next: number) {
    setActive(next);
    setStep(0);
  }
  return (
    <section
      id="your-day"
      className="studio-section product-demo"
      aria-labelledby="demo-heading"
    >
      <div className="content-shell studio-reading">
        <p className="utility-text text-xs text-cyan-300">
          Real screens. Everyday moments.
        </p>
        <h2 id="demo-heading" className="studio-title mt-3">
          See how it fits <span className="text-violet-300">your day.</span>
        </h2>
        <p className="studio-intro">
          Tap a moment. Walk through the next useful step.
        </p>
        <div
          className="demo-tabs"
          role="tablist"
          aria-label="Explore app moments"
        >
          {moments.map(({ label, icon: Icon }, index) => (
            <button
              key={label}
              type="button"
              role="tab"
              id={`moment-tab-${index}`}
              aria-selected={index === active}
              aria-controls="moment-panel"
              tabIndex={index === active ? 0 : -1}
              onClick={() => choose(index)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight")
                  next = (index + 1) % moments.length;
                else if (event.key === "ArrowLeft")
                  next = (index + moments.length - 1) % moments.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = moments.length - 1;
                else return;
                event.preventDefault();
                choose(next);
                document.getElementById(`moment-tab-${next}`)?.focus();
              }}
            >
              <Icon size={22} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div
          id="moment-panel"
          role="tabpanel"
          aria-labelledby={`moment-tab-${active}`}
          className="demo-panel"
        >
          <div className="demo-copy">
            <h3>{moment.title}</h3>
            <p className="mt-4 text-base leading-7 text-zinc-300">
              {moment.text}
            </p>
            <ol className="demo-steps" aria-label="Example steps">
              {moment.steps.map((text, index) => (
                <li key={text} className={index === step ? "is-current" : ""}>
                  <span aria-hidden="true">
                    {index < step ? <Check size={16} /> : index + 1}
                  </span>
                  {text}
                </li>
              ))}
            </ol>
            <div className="demo-example" aria-live="polite" aria-atomic="true">
              <p className="utility-text text-[.6rem] text-cyan-300">
                Interactive example · {step + 1} of 3
              </p>
              <p key={`${active}-${step}`} className="demo-example-text">
                {moment.example[step]}
              </p>
              <DemoVisual moment={active} step={step} />
            </div>
            <button
              type="button"
              className="demo-next"
              onClick={() => setStep((step + 1) % 3)}
            >
              {step === 2 ? "Replay example" : "Show next step"}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p className="mt-4 text-xs leading-6 text-zinc-400">
              {moment.note}
            </p>
          </div>
          <figure className="demo-phone">
            <PhoneMockup
              key={moment.screen}
              src={`/assets/app-screens/${moment.screen}.png`}
              alt={`Actual Revenge Arc ${moment.label} interface. Displayed records are example data.`}
            />
            <figcaption>App preview · example records</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function DemoVisual({ moment, step }: { moment: number; step: number }) {
  if (moment === 0)
    return (
      <div className="demo-mini-sets" aria-hidden="true">
        {[1, 2, 3].map((set) => (
          <span key={set} className={set <= step ? "is-logged" : ""}>
            Set {set}
            <strong>{set <= step ? "Logged ✓" : "Ready"}</strong>
          </span>
        ))}
      </div>
    );
  if (moment === 1)
    return (
      <div className="demo-mini-meal" aria-hidden="true">
        <span className={step > 0 ? "is-reviewed" : ""}>
          <ForkKnife size={21} />
          {step === 0 ? "Meal photo" : "Portion reviewed"}
        </span>
        <span className={step === 2 ? "is-reviewed" : ""}>
          {step === 2 ? <Check size={21} /> : <ChartLineUp size={21} />}
          {step === 2 ? "Saved to log" : "Review estimate"}
        </span>
      </div>
    );
  if (moment === 2)
    return (
      <div className="demo-mini-chat" aria-hidden="true">
        <span>You asked</span>
        <span>
          {step === 0
            ? "Context ready"
            : step === 1
              ? "Suggestion to review"
              : "Your next step"}
          <Sparkle size={17} />
        </span>
      </div>
    );
  return (
    <div className="demo-mini-progress" aria-hidden="true">
      {[35, 50, 44, 68, 60, 78, 86].map((height, index) => (
        <span
          key={index}
          style={{ height: `${height}%`, opacity: index <= step * 3 ? 1 : 0.3 }}
        />
      ))}
    </div>
  );
}
