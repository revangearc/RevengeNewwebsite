import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { chapters, featureGroups } from "@/content/site";
import { PhoneMockup } from "@/components/phone-mockup";
import { ScreenGalleryProvider } from "@/components/screen-gallery";
import { DownloadAction } from "@/components/download-action";
import { MembershipNote } from "@/components/membership-note";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Revenge Arc training, nutrition, AI guidance, community, and progress features.",
  alternates: { canonical: "/features" },
};

const accent = {
  violet: "border-violet-400/25 text-violet-300",
  cyan: "border-cyan-400/25 text-cyan-300",
  amber: "border-amber-400/25 text-amber-300",
  rose: "border-rose-400/25 text-rose-300",
};
const outcomes = [
  {
    title: "Know your next set.",
    text: "Build a routine, log sets as you go, and keep your workout history close.",
    benefits: [
      "Sets, reps, and weight in one place",
      "Routines and strength trends",
    ],
  },
  {
    title: "Fuel the day. Not another spreadsheet.",
    text: "Pick the logging method that fits the moment. Review your calories, macros, and water together.",
    benefits: [
      "Search, photo, barcode, voice, or text",
      "Review AI estimates before saving",
    ],
  },
  {
    title: "Ask GymBuddy. Find a next step.",
    text: "Bring your training, nutrition, and progress questions to a companion with context.",
    benefits: [
      "Workout and nutrition questions",
      "Guidance you review—not medical advice",
    ],
  },
  {
    title: "Find your people in the Arena.",
    text: "Share a small win, learn from others, or stay accountable in a squad.",
    benefits: [
      "Community posts and smaller squads",
      "In-app reporting and blocking",
    ],
  },
  {
    title: "See your consistency adding up.",
    text: "A weekly view of workouts, habits, and progress makes patterns easier to notice.",
    benefits: [
      "Weekly reports and personal trackers",
      "Streaks, challenges, ranks, and XP",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <ScreenGalleryProvider>
      <PageHero
        eyebrow="Inside Revenge Arc"
        title={
          <>
            Less scattered.
            <br />
            <span className="text-violet-300">More connected.</span>
          </>
        }
        description="Your workout, your next meal, a little guidance, and the progress you’re building. See the actual app screens below."
        actions={<DownloadAction placement="features" />}
      />
      <div className="content-shell studio-reading py-10 sm:py-16">
        <nav
          aria-label="Feature shortcuts"
          className="mb-7 flex flex-wrap gap-2"
        >
          {chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-sm text-zinc-200"
            >
              {chapter.title}
            </a>
          ))}
        </nav>
        <div className="grid gap-6">
          {featureGroups.map(
            (
              { title, description, accent: tone, icon: Icon, features },
              index,
            ) => (
              <section
                id={chapters[index].id}
                key={title}
                className="feature-visual-card"
                data-reveal
                aria-labelledby={`feature-${title}`}
              >
                <div>
                  <p
                    className={`utility-text flex items-center gap-2 text-xs ${accent[tone]}`}
                  >
                    <Icon size={21} aria-hidden="true" />
                    {title}
                  </p>
                  <h2 id={`feature-${title}`}>{outcomes[index].title}</h2>
                  <p className="studio-intro">{outcomes[index].text}</p>
                  <ul className="studio-check-list">
                    {outcomes[index].benefits.map((benefit) => (
                      <li key={benefit}>
                        <span aria-hidden="true" className="text-cyan-300">
                          ✓
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <details className="feature-details">
                    <summary>
                      All {title.toLowerCase()} features
                      <span aria-hidden="true">+</span>
                    </summary>
                    <ul>
                      {features.map((feature) => (
                        <li key={feature.name}>
                          <h3>
                            {feature.name}
                            {feature.badge && (
                              <span className="ml-2 rounded-full border border-current px-2 py-1 text-[.6rem] text-amber-200">
                                {feature.badge}
                              </span>
                            )}
                          </h3>
                          <p>{feature.description}</p>
                        </li>
                      ))}
                    </ul>
                  </details>
                  <p className="mt-3 text-xs leading-6 text-zinc-400">
                    {index === 1 || index === 2
                      ? "AI can make mistakes. Verify important information; estimates are not medical advice."
                      : description}
                  </p>
                </div>
                <figure className="feature-phone">
                  <PhoneMockup
                    src={chapters[index].screen}
                    alt={`${chapters[index].imageAlt}. Example records.`}
                  />
                  <figcaption>
                    Actual app interface · example records
                  </figcaption>
                </figure>
              </section>
            ),
          )}
        </div>
      </div>
      <section className="studio-section border-t border-white/10">
        <div className="content-shell studio-reading">
          <h2 className="studio-title">Ready for your next chapter?</h2>
          <p className="studio-intro">
            7-day free trial for eligible new subscribers on eligible plans.
          </p>
          <div className="mt-5">
            <DownloadAction placement="features_end" />
          </div>
          <MembershipNote />
        </div>
      </section>
    </ScreenGalleryProvider>
  );
}
