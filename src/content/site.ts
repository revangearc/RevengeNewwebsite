import type { Icon } from "@phosphor-icons/react";
import {
  AppleLogo,
  Barbell,
  Brain,
  ChartLineUp,
  ChatCircleDots,
  ForkKnife,
  ShieldCheck,
  Sparkle,
  Trophy,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

export const SITE_NAME = "Revenge Arc";
export const SUPPORT_EMAIL = "revengearchelp@gmail.com";

function appStoreUrl() {
  const configured = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim();
  if (!configured) return null;
  try {
    const url = new URL(configured);
    return url.protocol === "https:" && url.hostname === "apps.apple.com"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export const APP_STORE_URL = appStoreUrl();

export const navItems = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Creators", href: "/creators" },
  { label: "Legal Center", href: "/legal" },
  { label: "FAQ", href: "/faq" },
] as const;

export type Accent = "violet" | "cyan" | "amber" | "rose";

export type Chapter = {
  id: "train" | "fuel" | "adapt" | "connect" | "prove";
  eyebrow: string;
  title: string;
  summary: string;
  details: string[];
  accent: Accent;
  screen: string;
  background: string;
  portraitBackground?: string;
  imageAlt: string;
  screenPosition: "left" | "right";
};

export const chapters: Chapter[] = [
  {
    id: "train",
    eyebrow: "Chapter 01",
    title: "Train",
    summary: "Train with intent. Track every lift.",
    details: [
      "Log sets, reps, and weight",
      "Review workout history",
      "Follow your strength trends",
    ],
    accent: "violet",
    screen: "/assets/app-screens/train.png",
    background: "/assets/scenes/train-landscape.png",
    portraitBackground: "/assets/scenes/train-portrait.png",
    imageAlt:
      "Revenge Arc In Combat workout screen with Dumbbell Bench Press sets",
    screenPosition: "right",
  },
  {
    id: "fuel",
    eyebrow: "Chapter 02",
    title: "Fuel",
    summary: "Eat with purpose. Perform at your best.",
    details: [
      "Macro and calorie tracking",
      "Five fast logging methods",
      "Hydration and micronutrients",
    ],
    accent: "cyan",
    screen: "/assets/app-screens/fuel.png",
    background: "/assets/scenes/fuel-landscape.png",
    portraitBackground: "/assets/scenes/fuel-portrait.png",
    imageAlt:
      "Revenge Arc Nutrition screen with goals, calories, macros, and logging methods",
    screenPosition: "left",
  },
  {
    id: "adapt",
    eyebrow: "Chapter 03",
    title: "Adapt",
    summary: "AI guidance. Personalized for you.",
    details: [
      "Your context is ready",
      "Ask anything",
      "Workout and progress analysis",
    ],
    accent: "violet",
    screen: "/assets/app-screens/adapt.png",
    background: "/assets/scenes/adapt-landscape.png",
    portraitBackground: "/assets/scenes/adapt-portrait.png",
    imageAlt: "GymBuddy AI screen greeting Marlin with four assistance options",
    screenPosition: "right",
  },
  {
    id: "connect",
    eyebrow: "Chapter 04",
    title: "Connect",
    summary: "Stronger together. Share. Learn. Win.",
    details: ["Global gym community", "Share wins", "Learn from others"],
    accent: "cyan",
    screen: "/assets/app-screens/connect.png",
    background: "/assets/scenes/connect-landscape.png",
    portraitBackground: "/assets/scenes/connect-portrait.png",
    imageAlt: "Revenge Arc Arena feed with community workout posts",
    screenPosition: "left",
  },
  {
    id: "prove",
    eyebrow: "Chapter 05",
    title: "Prove",
    summary: "Measure progress. Earn your rank.",
    details: [
      "Weekly momentum score",
      "Goal and habit tracking",
      "Strength trends that compound",
    ],
    accent: "amber",
    screen: "/assets/app-screens/prove.png",
    background: "/assets/scenes/prove-landscape.png",
    portraitBackground: "/assets/scenes/prove-portrait.png",
    imageAlt:
      "Revenge Arc Weekly Report with a momentum score of 91 out of 100",
    screenPosition: "right",
  },
];

export type FeatureGroup = {
  title: string;
  description: string;
  accent: Accent;
  icon: Icon;
  features: Array<{
    name: string;
    description: string;
    badge?: "Beta" | "Coming Soon";
  }>;
};

export const featureGroups: FeatureGroup[] = [
  {
    title: "Train",
    description: "Plan, perform, and understand every session.",
    accent: "violet",
    icon: Barbell,
    features: [
      {
        name: "Workout routines",
        description:
          "Build repeatable training plans around your schedule and goals.",
      },
      {
        name: "In Combat tracking",
        description:
          "Log sets, reps, load, volume, and completion while you train.",
      },
      {
        name: "Exercise guidance",
        description:
          "Use contextual tips and session history to train with intent.",
      },
      {
        name: "Strength trends",
        description: "See volume and performance change over time.",
      },
    ],
  },
  {
    title: "Fuel",
    description: "Turn daily nutrition into useful, visible feedback.",
    accent: "cyan",
    icon: ForkKnife,
    features: [
      {
        name: "MacroDrive",
        description:
          "Adaptive calorie and macro targets connected to your goals.",
        badge: "Beta",
      },
      {
        name: "Food Search",
        description: "Find foods and quickly choose the serving you ate.",
      },
      {
        name: "Calorie AI (CalAI)",
        description:
          "Get a meal-photo estimate, then review the food and portion before saving. Estimates can be wrong.",
      },
      {
        name: "Type & Track",
        description:
          "Describe a meal naturally and convert it into trackable nutrition.",
      },
      {
        name: "Barcode & Voice",
        description: "Scan packaged products or speak your meal out loud.",
      },
      {
        name: "Hydration and nutrients",
        description: "Keep water, macros, and key nutrition signals together.",
      },
    ],
  },
  {
    title: "Adapt",
    description:
      "Get guidance that understands the work you have already done.",
    accent: "violet",
    icon: Brain,
    features: [
      {
        name: "Ask GymBuddy",
        description:
          "Ask questions across training, nutrition, recovery, and progress.",
      },
      {
        name: "Workout Help",
        description:
          "Get assistance with routines, exercise selection, and training decisions.",
      },
      {
        name: "Nutrition Advice",
        description:
          "Turn your current nutrition data into practical next steps.",
      },
      {
        name: "Progress Analysis",
        description:
          "Understand patterns without manually comparing every log.",
      },
    ],
  },
  {
    title: "Connect",
    description: "Grow with people who understand the work.",
    accent: "rose",
    icon: UsersThree,
    features: [
      {
        name: "Global Arena",
        description:
          "Share progress, questions, and training moments with the community.",
      },
      {
        name: "Squads",
        description: "Stay accountable in a smaller circle of people.",
      },
      {
        name: "Creator Program",
        description:
          "Help explain features, inspire progress, and shape the roadmap.",
      },
      {
        name: "Coach Pro",
        description:
          "A future workspace for coaches to guide client routines and progress.",
        badge: "Coming Soon",
      },
    ],
  },
  {
    title: "Prove",
    description: "Make consistency impossible to miss.",
    accent: "amber",
    icon: Trophy,
    features: [
      {
        name: "Weekly Report",
        description:
          "Review workouts, nutrition, habits, goals, and momentum together.",
      },
      {
        name: "Streaks and challenges",
        description:
          "Build momentum through weekly check-ins and focused challenges.",
      },
      {
        name: "Ranks and XP",
        description: "Earn visible proof of the consistency you are building.",
      },
      {
        name: "Progress trackers",
        description: "Follow body, photo, workout, and performance changes.",
      },
    ],
  },
];

export const prices = [
  {
    id: "weekly",
    label: "Weekly",
    price: "$6.99",
    cadence: "per week",
    note: "Flexible access",
    featured: false,
  },
  {
    id: "monthly",
    label: "Monthly",
    price: "$17.99",
    cadence: "per month",
    note: "Most popular",
    featured: false,
  },
  {
    id: "yearly",
    label: "Yearly",
    price: "$149.99",
    cadence: "per year",
    note: "Best value",
    featured: true,
  },
] as const;

export type FaqItem = {
  question: string;
  answer: string;
  category:
    | "Getting started"
    | "Membership"
    | "AI & privacy"
    | "Community & what’s next";
  href?: string;
  linkLabel?: string;
};
export const faqs: FaqItem[] = [
  {
    category: "Getting started",
    question: "What can I do with Revenge Arc?",
    answer:
      "Plan and log workouts, track food and hydration, ask GymBuddy questions, review your progress, and connect in the Arena. Your everyday fitness tools stay together.",
  },
  {
    category: "Membership",
    question: "Is there a free trial?",
    answer:
      "Yes—a 7-day free trial for eligible new subscribers on eligible plans. Check the Apple purchase screen for eligibility, the plan’s renewal price, and the cancellation deadline. Unless cancelled in time, the trial becomes a paid subscription. There is no ongoing free membership.",
    href: "/pricing",
    linkLabel: "Compare membership plans",
  },
  {
    category: "Getting started",
    question: "Can I use it if I’m just getting started?",
    answer:
      "You don’t need a perfect routine to begin. Start with a manageable workout, a meal log, or a small goal. Adjust activity to your abilities and ask a qualified professional when health, injury, or safety needs personal advice.",
  },
  {
    category: "Getting started",
    question: "Which devices are supported?",
    answer:
      "Revenge Arc is launching for iPhone. Check the App Store listing for the exact device and iOS requirements when it is available. Android and Apple Watch support are not available yet.",
  },
  {
    category: "Getting started",
    question: "Do I need a gym?",
    answer:
      "Use workouts and exercises that fit the equipment you have. Food logging, progress tracking, and GymBuddy do not require a gym. The equipment needed depends on the routine you choose.",
  },
  {
    category: "Membership",
    question: "Where do I choose my plan?",
    answer:
      "Choose a weekly, monthly, or yearly subscription inside the iPhone app. Apple handles the purchase. The confirmation screen shows the actual price, currency, offer, and renewal terms before you subscribe.",
  },
  {
    category: "Membership",
    question: "How do I cancel a trial or subscription?",
    answer:
      "Open iPhone Settings, tap your name, then Subscriptions, and choose Revenge Arc. Cancel before Apple’s displayed deadline to avoid the next charge. Deleting the app, records, or account does not cancel your subscription.",
    href: "/subscriptions-refunds",
    linkLabel: "Read cancellation and refund details",
  },
  {
    category: "Membership",
    question: "Can I restore a purchase or request a refund?",
    answer:
      "Use the app’s Restore Purchases option with the Apple Account used to subscribe. Apple reviews refund requests through its Report a Problem service; approval is not guaranteed. Contact support if your access still looks incorrect.",
    href: "/subscriptions-refunds",
    linkLabel: "Purchase support details",
  },
  {
    category: "AI & privacy",
    question: "How accurate are Calorie AI and GymBuddy?",
    answer:
      "Neither is 100% accurate. Meal photos can miss ingredients or portion sizes, and AI advice can be incomplete or wrong. Review estimates before saving and verify important information. Neither feature replaces medical care, a dietitian, or a qualified trainer.",
    href: "/ai-data-processing",
    linkLabel: "Understand AI limitations",
  },
  {
    category: "AI & privacy",
    question: "Can I delete my records?",
    answer:
      "Yes. Use the app’s record-deletion controls or request deletion of eligible account-linked data. Some records may need limited retention for backups, security, disputes, or legal obligations. Deleting records does not cancel Apple billing.",
    href: "/data-retention-deletion",
    linkLabel: "How deletion works",
  },
  {
    category: "AI & privacy",
    question: "What happens to information I share with AI?",
    answer:
      "An AI request can use the question, media, and relevant app context needed for that feature. Don’t include information you don’t want processed. Review the AI notice and permission information before using optional AI tools.",
    href: "/ai-data-processing",
    linkLabel: "Read the AI and data notice",
  },
  {
    category: "Community & what’s next",
    question: "How do I report content or block someone?",
    answer:
      "Use the report and block controls in the app. You can also send a non-emergency safety concern through support. Content filtering is planned for community launch. Reports are reviewed under the community rules and do not guarantee a particular outcome.",
    href: "/community-guidelines",
    linkLabel: "Community rules and support",
  },
  {
    category: "Community & what’s next",
    question: "Are Apple Watch and Coach Pro available?",
    answer:
      "Not yet. Both are coming soon. They are not included as currently available features, and release dates have not been announced.",
  },
  {
    category: "Community & what’s next",
    question: "How can I share an idea or get help?",
    answer:
      "Use our existing support contact for product questions, feature ideas, privacy requests, or application questions. Don’t send passwords, payment-card numbers, or unnecessary health information.",
    href: "/contact",
    linkLabel: "Open support",
  },
];

export const communitySteps = [
  {
    number: "01",
    title: "Request",
    text: "Share what you need.",
    icon: ChatCircleDots,
  },
  {
    number: "02",
    title: "Prioritize",
    text: "We listen, rank, and plan.",
    icon: ChartLineUp,
  },
  {
    number: "03",
    title: "Build",
    text: "We design and develop it.",
    icon: Sparkle,
  },
  {
    number: "04",
    title: "Improve",
    text: "You use it. We make it better.",
    icon: ShieldCheck,
  },
] as const;

export const storePlatforms = [
  { id: "apple", label: "App Store", icon: AppleLogo },
] as const;
