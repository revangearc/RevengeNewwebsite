import type { Metadata } from "next";
import { CreatorForm } from "@/components/creator-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Creator Program",
  description: "Apply to the Revenge Arc Creator Program.",
  alternates: { canonical: "/creators" },
};

export default function CreatorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Creator Program"
        title={
          <>
            Your content.
            <br />
            <span className="text-violet-300">Our next chapter.</span>
          </>
        }
        description="Show how Revenge Arc fits real life. Make useful demos, share honest progress, and shape what comes next."
        actions={
          <a href="#creator-application" className="download-action">
            Apply to create with us
          </a>
        }
      />
      <section className="content-shell studio-reading grid gap-6 py-10 sm:py-16 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <aside className="hairline-panel relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:sticky lg:top-28">
          <p className="utility-text text-xs text-violet-300">
            A few ways to tell the story
          </p>
          <div className="creator-storyboard">
            <div>
              <span>01</span>A workout, from first set to finish.
            </div>
            <div>
              <span>02</span>A meal log that fits your day.
            </div>
            <div>
              <span>03</span>A small win worth sharing.
            </div>
          </div>
          <h2 className="display-text mt-7 text-4xl font-bold text-white">
            What you can help shape
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-300">
            Selected creators may receive early feature access, product
            resources, and a direct feedback channel. Any paid, gifted, or
            affiliate opportunity is agreed separately in writing—not promised
            by this application.
          </p>
          <ul className="mt-5 grid gap-4 text-sm leading-6 text-zinc-300">
            <li>
              <strong className="text-white">Clarity.</strong> You can explain a
              feature without overpromising it.
            </li>
            <li>
              <strong className="text-white">Consistency.</strong> Your audience
              trusts the work you publish.
            </li>
            <li>
              <strong className="text-white">Feedback.</strong> You listen,
              test, and help improve what comes next.
            </li>
          </ul>
          <p className="mt-6 text-xs leading-6 text-zinc-400">
            You don’t need a huge following. Clear content, a good fit, and
            audience trust matter.
          </p>
        </aside>
        <div
          id="creator-application"
          className="hairline-panel rounded-2xl p-5 sm:p-8 lg:p-10"
        >
          <p className="utility-text text-[0.65rem] text-violet-300">
            Application
          </p>
          <h2 className="display-text mt-3 text-5xl font-bold uppercase text-white">
            Tell us what you create.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
            A short introduction is enough. We review applications and contact
            you directly if there’s a fit. Partnership terms come before any
            agreed work.
          </p>
          <div className="mt-9">
            <CreatorForm />
          </div>
        </div>
      </section>
    </>
  );
}
