import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Barbell,
  CheckCircle,
  ForkKnife,
  ShieldCheck,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { PhoneMockup } from "@/components/phone-mockup";
import { StoreBadges } from "@/components/store-badges";
import { DownloadAction } from "@/components/download-action";
import { MembershipNote } from "@/components/membership-note";
import { ProductDemo } from "@/components/product-demo";
import { PricingCards } from "@/components/pricing-cards";
import { FaqList } from "@/components/faq-list";
import { APP_STORE_URL } from "@/content/site";

export function MobileHome() {
  return (
    <>
      <section className="studio-hero" aria-labelledby="home-title">
        <picture className="studio-hero-landscape">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/scenes/hero-portrait-720.avif"
            type="image/avif"
          />
          <source
            srcSet="/assets/scenes/hero-landscape-1920.avif"
            type="image/avif"
          />
          <img
            src="/assets/scenes/hero-landscape-1280.webp"
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
          />
        </picture>
        <div className="content-shell studio-hero-grid">
          <div className="studio-hero-copy" data-download-entry>
            <p className="utility-text text-[.65rem] text-violet-200">
              Your next chapter starts here.
            </p>
            <h1 id="home-title">
              Your workouts.
              <br />
              Your meals.
              <br />
              <span>Your momentum.</span>
            </h1>
            <p className="studio-hero-description">
              Track your training, fuel your day, and find your next step with
              GymBuddy. One app. Your arc.
            </p>
            <p className="trial-pill">
              <CheckCircle size={18} weight="fill" aria-hidden="true" />
              <strong>7-day free trial</strong>
              <span>Eligibility applies</span>
            </p>
            <div className="studio-hero-store">
              <StoreBadges />
            </div>
            <p className="hero-trial-detail">
              {APP_STORE_URL
                ? "For eligible new subscribers on eligible plans. Renews at the price shown in the app unless cancelled."
                : "Trial starts in the app when available. Eligible plans and renewal price are shown before subscribing."}
            </p>
            <a href="#your-day" className="hero-demo-link">
              Take a look inside
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <figure className="studio-hero-phone" data-reveal>
            <PhoneMockup
              src="/assets/app-screens/home.png"
              alt="Actual Revenge Arc home interface showing example progress, goals, and a weekly report"
              priority
            />
            <figcaption>Tap to explore the app · example records</figcaption>
          </figure>
        </div>
        <div
          className="content-shell hero-feature-line"
          aria-label="Inside Revenge Arc"
        >
          {[
            { icon: Barbell, label: "Train" },
            { icon: ForkKnife, label: "Fuel" },
            { icon: Sparkle, label: "Ask" },
            { icon: UsersThree, label: "Connect" },
          ].map(({ icon: Icon, label }) => (
            <span key={label}>
              <Icon size={18} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </section>
      <ProductDemo />
      <section
        id="adapt"
        className="studio-section buddy-section"
        aria-labelledby="buddy-heading"
      >
        <div className="content-shell studio-reading buddy-grid">
          <div className="buddy-art" data-buddy-motion>
            <Image
              src="/assets/brand/buddy-open.webp"
              alt="GymBuddy, Revenge Arc’s friendly AI companion"
              width={977}
              height={1610}
              unoptimized
              loading="lazy"
              className="buddy-avatar"
            />
            <span className="buddy-greeting" data-reveal>Hey. Ready for your next small win?</span>
          </div>
          <div data-reveal>
            <p className="utility-text text-xs text-violet-300">
              Meet GymBuddy
            </p>
            <h2 id="buddy-heading" className="studio-title mt-3">
              Not another blank
              <br />
              <span className="text-violet-300">chat box.</span>
            </h2>
            <p className="studio-intro">
              Your workouts and nutrition give the conversation context. Ask a
              question, review the guidance, and decide what works for you.
            </p>
            <div className="buddy-prompts">
              <span>“Help me plan my next session.”</span>
              <span>“What fits my remaining macros?”</span>
              <span>“What changed this week?”</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-zinc-400">
              AI can make mistakes. Check important information. GymBuddy is not
              medical care.
            </p>
            <Link href="/features#adapt" className="studio-text-link">
              Explore GymBuddy
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section
        id="connect"
        className="studio-section"
        aria-labelledby="community-heading"
      >
        <div className="content-shell studio-reading community-proof-grid">
          <div>
            <p className="utility-text text-xs text-cyan-300">
              The Arena & your progress
            </p>
            <h2 id="community-heading" className="studio-title mt-3">
              You bring the effort.
              <br />
              <span className="text-cyan-300">Make it visible.</span>
            </h2>
            <p className="studio-intro">
              Share a win, ask a question, or find a squad. Then look back at
              the workouts and habits you’ve been building.
            </p>
            <ul className="studio-check-list">
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                Post at your own pace. No perfect week required.
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                Report content and block accounts in the app.
              </li>
              <li>
                <CheckCircle size={20} aria-hidden="true" />
                Review your weekly activity—not a medical score.
              </li>
            </ul>
            <Link href="/features#connect" className="studio-text-link">
              See Arena & progress
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <figure className="community-proof-phone" data-reveal>
            <PhoneMockup
              src="/assets/app-screens/connect.png"
              alt="Revenge Arc Arena interface with illustrative community posts"
            />
            <figcaption>
              Example community screen—not user-count or engagement claims.
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="studio-origin" aria-labelledby="origin-heading">
        <div className="content-shell studio-reading">
          <p className="utility-text text-xs">Why Revenge Arc</p>
          <h2 id="origin-heading">
            You don’t need
            <br />a perfect week.
            <br />
            <span>You need a next step.</span>
          </h2>
          <p>
            Fitness can feel scattered: a workout note here, a food log there, a
            goal you forgot. Revenge Arc brings the everyday pieces together so
            the next useful action is easier to see.
          </p>
          <p className="origin-tagline">
            Built for today. Forged for what’s next.
          </p>
        </div>
      </section>
      <section
        className="studio-section studio-trust"
        aria-labelledby="trust-heading"
      >
        <div className="content-shell studio-reading">
          <p className="utility-text text-xs text-cyan-300">
            Know what you’re choosing
          </p>
          <h2 id="trust-heading" className="studio-title mt-3">
            Useful tools.
            <br />
            <span className="text-zinc-400">Clear boundaries.</span>
          </h2>
          <div className="trust-grid">
            <article data-reveal>
              <ShieldCheck size={25} aria-hidden="true" />
              <h3>Your records. Your choice.</h3>
              <p>
                Delete your records using the app’s controls, or request
                eligible data deletion. Limited legal and backup exceptions are
                explained plainly.
              </p>
              <Link href="/data-retention-deletion">
                Understand deletion
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article data-reveal>
              <Sparkle size={25} aria-hidden="true" />
              <h3>AI helps. You decide.</h3>
              <p>
                Calorie AI and GymBuddy are useful guides—not perfect answers.
                Review estimates before relying on them.
              </p>
              <Link href="/ai-data-processing">
                Know the AI limits
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article data-reveal>
              <UsersThree size={25} aria-hidden="true" />
              <h3>Arena has safety controls.</h3>
              <p>
                Reporting and blocking are available. Content filtering is
                planned for community launch; reviews and enforcement follow the
                guidelines.
              </p>
              <Link href="/community-guidelines">
                Read the community rules
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>
      <section
        id="membership"
        className="studio-section border-t border-white/10"
      >
        <div className="content-shell studio-reading">
          <p className="utility-text text-xs text-amber-300">One membership</p>
          <h2 className="studio-title mt-3">
            Find your rhythm.
            <br />
            <span className="text-amber-300">Try 7 days free.</span>
          </h2>
          <p className="studio-intro">
            Weekly, monthly, or yearly. The same connected tools, with a billing
            pace that fits you.
          </p>
          <div className="mt-7">
            <PricingCards compact />
          </div>
          <MembershipNote />
          <Link href="/pricing" className="studio-text-link">
            Compare plans & billing details
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="studio-section border-t border-white/10">
        <div className="content-shell studio-reading">
          <p className="utility-text text-xs text-violet-300">
            A few quick answers
          </p>
          <h2 className="studio-title mt-3">Before you start.</h2>
          <div className="mt-6">
            <FaqList limit={3} />
          </div>
          <Link href="/faq" className="studio-text-link">
            All questions
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <LaunchSection />
      <section className="studio-section studio-next">
        <div className="content-shell studio-reading">
          <p className="utility-text text-xs text-zinc-400">The next chapter</p>
          <div className="next-grid">
            <article>
              <h2>Apple Watch & Coach Pro</h2>
              <p>
                Coming soon. These features are not part of the current
                available experience.
              </p>
            </article>
            <article>
              <h2>Create with Revenge Arc.</h2>
              <p>
                Make useful content, share feedback, and help explain the app.
              </p>
              <Link href="/creators" className="studio-text-link">
                Explore the creator program
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </article>
          </div>
          <Link href="/contact" className="studio-text-link">
            Have an idea? Share it with us
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

export function LaunchSection() {
  return (
    <section
      id="app-launch"
      className="studio-launch"
      aria-labelledby="launch-heading"
    >
      <div className="content-shell studio-reading">
        <p className="utility-text text-xs text-violet-200">
          Revenge Arc for iPhone
        </p>
        <h2 id="launch-heading">
          Your next chapter.
          <br />
          <span>One app away.</span>
        </h2>
        <p>
          {APP_STORE_URL
            ? "Download Revenge Arc, explore the app, and choose an eligible 7-day trial inside."
            : "The website is live. The App Store link is coming soon—this page will take you straight to the app when it’s available."}
        </p>
        <StoreBadges />
        {APP_STORE_URL ? (
          <DownloadAction placement="closing" />
        ) : (
          <Link href="/features" className="download-action">
            Explore what’s inside
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        )}
        <MembershipNote />
      </div>
    </section>
  );
}
