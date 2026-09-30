import { SUPPORT_EMAIL } from "./site";
import { TRIAL_DISCLOSURE } from "./membership";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  description: string;
  category: LegalCategory;
  updated: string;
  effective: string;
  version: string;
  reviewNotice: string;
  sections: LegalSection[];
};

export const legalCategoryOrder = [
  "Core service",
  "Data, privacy & AI",
  "Safety & community",
  "Commerce & notices",
] as const;

export type LegalCategory = (typeof legalCategoryOrder)[number];

export const LEGAL_EFFECTIVE_DATE = "September 25, 2026";
export const LEGAL_VERSION =
  "1.2 — owner-confirmed updates; legal review pending";

const reviewNotice =
  "Legal review pending. Business identity, launch jurisdictions, provider settings, and exact retention periods still need confirmation. Owner-confirmed record deletion, reporting, blocking, and trial information have been updated. This is not a statement that all launch requirements are complete.";

const shared = {
  updated: "September 29, 2026",
  effective: LEGAL_EFFECTIVE_DATE,
  version: LEGAL_VERSION,
  reviewNotice,
};

export const legalDocuments: LegalDocument[] = [
  {
    ...shared,
    slug: "terms",
    title: "Terms of Service",
    description:
      "The agreement governing use of Revenge Arc, its website, subscriptions, AI features, and community.",
    category: "Core service",
    sections: [
      {
        heading: "Agreement and operator",
        paragraphs: [
          "These Terms govern access to the Revenge Arc mobile application, website, AI features, content, community areas, and related services (together, the “Services”). By creating an account, purchasing a subscription, or using the Services, you agree to these Terms and the policies linked from the Legal Center.",
          "The legal name, registered address, governing law, and dispute forum of the operating entity must be inserted and approved by licensed counsel before public launch. Nothing in these Terms limits rights that cannot lawfully be waived under applicable consumer law.",
        ],
      },
      {
        heading: "Adults only",
        paragraphs: [
          "The Services are intended only for people who are at least 18 years old. You may not create an account or use the Services if you are under 18. If we reasonably believe an account belongs to a minor, we may restrict or close it and delete associated information as permitted by law.",
        ],
      },
      {
        heading: "Accounts and security",
        bullets: [
          "Provide accurate information and keep it current.",
          "Protect your sign-in credentials and do not share or sell your account.",
          "Tell us promptly if you suspect unauthorized access or misuse.",
          "You are responsible for activity performed through your account unless applicable law provides otherwise.",
        ],
      },
      {
        heading: "Fitness, nutrition, and health",
        paragraphs: [
          "Revenge Arc provides general fitness, nutrition, habit, and educational tools. The Services are not medical care, a medical device, diagnosis, treatment, emergency support, or a substitute for a qualified healthcare professional. Exercise and dietary changes involve risk, and you are responsible for deciding whether an activity is appropriate for you.",
          "Read the Health & Safety Notice before relying on workout, nutrition, body-measurement, or recovery information. Results vary and are never guaranteed.",
        ],
      },
      {
        heading: "AI features",
        paragraphs: [
          "Calorie AI (called CalAI in the app) is Revenge Arc’s meal-estimation feature, not a separate app or an affiliation with another service. It and every other AI-assisted feature can make mistakes and are not 100% accurate. Outputs may be incomplete, fabricated, outdated, misclassified, or unsuitable for you. A confident tone or an earlier correct answer does not prove that a new result is correct.",
          "Review AI outputs before acting on them, verify important nutrition and exercise information using reliable sources, do not treat them as professional advice, and never use the Services for emergencies, diagnosis, treatment, medication, allergy, or other safety-critical decisions. The AI & Data Processing Notice explains feature-specific limitations, information involved, and available choices.",
        ],
      },
      {
        heading: "Acceptable use",
        bullets: [
          "Do not break the law, infringe intellectual-property or privacy rights, or encourage dangerous or unlawful conduct.",
          "Do not harass, threaten, exploit, stalk, impersonate, defraud, spam, scrape, reverse engineer, disrupt, or attempt unauthorized access to the Services or another person’s account.",
          "Do not upload malware, stolen material, sexual exploitation content, doxxing, or content that promotes self-harm, disordered eating, or dangerously misleading health practices.",
          "Follow the Community Guidelines and Content & Enforcement Policy whenever you post, message, report, or interact with others.",
        ],
      },
      {
        heading: "Your content",
        paragraphs: [
          "You retain ownership of content you submit. You give Revenge Arc a non-exclusive, worldwide, royalty-free license to host, store, reproduce, display, transmit, format, and moderate that content only as reasonably needed to operate, secure, and improve the Services in accordance with your settings and applicable law. This license ends when the content is deleted, except for limited copies in backups, legal records, or content shared by others where continued retention is lawful.",
          "You must have the rights and permissions needed for anything you upload, including images, audio, names, and information about other people. Do not upload highly sensitive information you do not want processed or seen by the audience selected in your settings.",
        ],
      },
      {
        heading: "Subscriptions and purchases",
        paragraphs: [
          "Paid iOS subscriptions are processed through Apple. The purchase screen and App Store are the authoritative source for price, billing interval, taxes, trial terms, renewal date, and availability. Subscriptions renew automatically unless cancelled through the Apple account controls within Apple’s required time. Deleting the app or your Revenge Arc account does not by itself cancel an App Store subscription.",
          "The Subscriptions & Refunds Policy explains management, restoration, and refund requests. Mandatory statutory cancellation or refund rights remain unaffected.",
        ],
      },
      {
        heading: "Third-party services",
        paragraphs: [
          "Some features rely on third parties such as Apple, authentication providers, cloud infrastructure, food-data sources, AI providers, and subscription processors. Their separate terms and privacy practices may apply. We are not responsible for third-party services outside our control, but this does not remove responsibilities imposed on us by law.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The Services, software, branding, graphics, and original content supplied by Revenge Arc are owned by or licensed to Revenge Arc and are protected by applicable law. Except for rights expressly granted in these Terms, no rights are transferred to you. Open-source components remain governed by their own licenses.",
        ],
      },
      {
        heading: "Suspension and termination",
        paragraphs: [
          "We may limit, suspend, or terminate access when reasonably necessary to protect users or the Services, investigate suspected violations, comply with law, address nonpayment, or enforce these Terms. Where appropriate and legally required, we may provide notice or an opportunity to appeal. You may stop using the Services and request account deletion at any time, but you must separately cancel active store subscriptions.",
        ],
      },
      {
        heading: "Availability and changes",
        paragraphs: [
          "The Services may change, and beta or planned features may be delayed, modified, or removed. We do not promise uninterrupted or error-free availability. If a material change adversely affects paid service, we will provide any notice or remedy required by law.",
        ],
      },
      {
        heading: "Electronic communications",
        paragraphs: [
          "We may send service messages needed for account security, purchases, policy changes, moderation, support, and requested features. Optional marketing email or push notifications require the choice or permission applicable to that channel and can be disabled through the message, account settings, or device settings. Opting out of marketing does not stop essential service communications.",
          "Revenge Arc does not currently offer promotional SMS. If SMS is introduced, the signup flow, consent language, frequency, carrier-fee notice, STOP and HELP instructions, eligibility, and recordkeeping must be implemented before messages are sent.",
        ],
      },
      {
        heading: "Disclaimers and liability",
        paragraphs: [
          "To the maximum extent permitted by law, the Services are provided on an “as is” and “as available” basis without warranties that are not expressly stated. Revenge Arc does not guarantee fitness outcomes, nutritional outcomes, community conduct, AI accuracy, or uninterrupted access.",
          "Any limitation of liability, exclusion of damages, indemnity, governing-law clause, class-action waiver, or arbitration provision must be tailored to the launch jurisdictions and approved by licensed counsel before it is added. Nothing on this page excludes liability or consumer remedies that cannot legally be excluded.",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          `We may update these Terms when the Services or law changes. The effective date and version will be updated, and additional notice will be provided when required. Questions may be sent to ${SUPPORT_EMAIL}.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How Revenge Arc collects, uses, shares, retains, and protects information across the app and website.",
    category: "Data, privacy & AI",
    sections: [
      {
        heading: "Scope and adults-only service",
        paragraphs: [
          "This policy applies to the Revenge Arc mobile application, website, support, Creator Program, community, and related services. Revenge Arc is for adults 18 and older. We do not knowingly offer accounts to minors. Reports that an account may belong to a minor should be sent to the privacy contact below.",
          "The final operating entity name, business address, privacy contact, initial launch countries, and any required representative details must be confirmed before publication.",
        ],
      },
      {
        heading: "Information you provide",
        bullets: [
          "Account, authentication, profile, age-confirmation, preference, and support details.",
          "Training plans, exercise history, goals, performance, recovery notes, nutrition logs, meal information, body measurements, progress entries, and other wellness-related information you choose to enter.",
          "Prompts, messages, feedback, and contextual information supplied to AI features.",
          "Photos, video, audio, captions, posts, comments, reactions, reports, direct messages, and other community content.",
          "Creator Program applications, including contact details, social profiles, audience information, and application responses.",
          "Purchase status and entitlement information; Apple processes payment-card details and does not provide the full card number to us.",
        ],
      },
      {
        heading: "Information collected through use",
        bullets: [
          "Device, app version, language, time zone, approximate network information, diagnostics, crash, security, and feature-interaction data.",
          "Workout completion, streak, subscription, account, moderation, and support events generated when you use the Services.",
          "Website page path, referrer host, campaign fields, device class, allowlisted event name, and a rotating anonymous daily identifier. Public website analytics do not store raw IP addresses in analytics records.",
          "Step count or active-energy information from Apple Health only when you grant the relevant permission. Revenge Arc should request only the HealthKit types needed for the feature you choose.",
        ],
      },
      {
        heading: "Information from other sources",
        bullets: [
          "Apple or Google sign-in information, according to the permissions and choices you make with those services.",
          "Subscription and entitlement information from Apple and RevenueCat.",
          "Food, nutrition, and barcode information from configured food-data providers, which may include FatSecret or Open Food Facts.",
          "Information another user shares about you, such as a mention, message, report, or uploaded image, subject to their obligations and your available controls.",
        ],
      },
      {
        heading: "How we use information",
        bullets: [
          "Provide accounts, workouts, nutrition tools, progress tracking, social features, messaging, subscriptions, support, and requested AI features.",
          "Personalize plans, recommendations, reminders, and the experience you request.",
          "Authenticate users, prevent fraud and abuse, enforce policies, investigate reports, secure systems, and respond to incidents.",
          "Operate, diagnose, measure, and improve the Services, including privacy-conscious product analytics and quality evaluation.",
          "Process Creator Program applications and communicate about them.",
          "Comply with law, protect rights and safety, resolve disputes, and maintain necessary business records.",
        ],
      },
      {
        heading: "Legal bases where applicable",
        paragraphs: [
          "Depending on your location and the activity, we may process information to perform a contract with you, with your consent, to comply with law, or for legitimate interests such as security, service improvement, and fraud prevention where those interests are not overridden by your rights. Sensitive health or biometric-like information may require explicit consent or another specific legal condition. The final legal-basis map must be validated for each launch jurisdiction before publication.",
        ],
      },
      {
        heading: "AI and automated processing",
        paragraphs: [
          "When you request an AI feature, relevant prompts and limited account, training, nutrition, progress, image, audio, transcript, or conversation context may be sent from Revenge Arc servers to the configured AI provider to generate a response. Do not submit information you do not want used for that request. Cal AI and other AI-assisted outputs are estimates, are not 100% accurate, and should not be the sole basis for health, safety, legal, or similarly significant decisions.",
          "Provider identity, contract terms, data-use controls, retention settings, processing regions, model configuration, and deletion behavior must be confirmed before launch. See the AI & Data Processing Notice for additional details and controls.",
        ],
      },
      {
        heading: "Health and sensitive information",
        paragraphs: [
          "Training, nutrition, body measurement, recovery, image, audio, inferred-health, and Apple Health data can reveal sensitive facts. We use this information only for requested features, security, support, and other disclosed purposes. Apple Health data must not be used for advertising, marketing, or unrelated data mining, and must not be sold. You can control Health permissions in iOS settings.",
          "Revenge Arc does not currently intend to identify people through face geometry, voiceprints, or another biometric identifier. If a future feature creates or uses a biometric identifier or biometric template, it must receive a separate notice and any required written or affirmative consent before collection. See the Consumer Health Data Privacy Notice and Biometric & Media Notice.",
        ],
      },
      {
        heading: "Community visibility",
        paragraphs: [
          "Profile fields and content may be visible to other users according to the feature and selected privacy settings. Posts, comments, reactions, follower relationships, and content shared in public or group areas should be treated as visible to that audience. Direct messages and restricted media are intended for their selected recipients, but no online sharing method can guarantee that recipients will not copy or redistribute content.",
          "In-app reporting and blocking controls are available. Record-deletion controls let you remove eligible information. Visibility defaults, media-access rules, encryption, and deletion propagation still require documented production checks. Blocking does not remove copies someone already saved or shared.",
        ],
      },
      {
        heading: "When information is shared",
        bullets: [
          "With processors that help operate the Services, such as cloud hosting, authentication, storage, AI, subscriptions, push notifications, diagnostics, food data, and support providers, under appropriate contractual restrictions.",
          "With other users and audiences you select when you use community or messaging features.",
          "With professional advisers, auditors, insurers, or transaction counterparties when reasonably necessary and subject to confidentiality protections.",
          "With authorities or others when required by law or reasonably necessary to protect rights, safety, security, and the integrity of the Services.",
          "As part of a merger, financing, acquisition, reorganization, or sale, subject to applicable notice and legal requirements.",
        ],
      },
      {
        heading: "Selling and targeted advertising",
        paragraphs: [
          "Revenge Arc does not currently sell personal information or use health information for targeted advertising. The public website does not currently use advertising pixels or advertising cookies. If these practices change, we will update disclosures and provide legally required choices before the new use begins.",
        ],
      },
      {
        heading: "Communications and notifications",
        paragraphs: [
          "We may use your contact details and device tokens for requested support, account, security, subscription, moderation, legal, reminder, and service notifications. Optional marketing communications are sent only as permitted by law and your choices. Email marketing can be unsubscribed through the message; push notifications can be changed in device settings. Essential account or legal notices may still be delivered.",
        ],
      },
      {
        heading: "Retention",
        paragraphs: [
          "We retain information only for as long as reasonably needed for the purposes described here, including providing the Services, maintaining security, resolving disputes, enforcing agreements, and meeting legal obligations. Retention depends on the data type, account status, sensitivity, operational need, consent, and applicable law.",
          "The website database is configured to delete raw analytics events older than 90 days and privacy-safe daily aggregates older than 24 months. Exact production-app, backup, log, AI-provider, message, media, moderation, billing, and legal-hold schedules must be approved and operationally verified before launch. More detail appears in the Data Retention & Deletion Policy.",
        ],
      },
      {
        heading: "Your rights and choices",
        bullets: [
          "Access, correct, export, or delete eligible information.",
          "Withdraw consent or object to, restrict, or opt out of certain processing where applicable.",
          "Control Apple Health permissions, notifications, community privacy settings, and device-level permissions.",
          "Appeal a rights-request decision or use an authorized agent where local law provides those rights.",
          `Submit a request to ${SUPPORT_EMAIL}. We may reasonably verify identity and authority before acting.`,
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We use administrative, technical, and organizational safeguards intended to protect information, such as access controls, server-side credentials, transport encryption, rate limits, and restricted administrator access. No system is completely secure. The final production security, access, logging, backup, incident-response, and vendor-control evidence must be reviewed before launch.",
        ],
      },
      {
        heading: "International processing",
        paragraphs: [
          "Providers may process information outside your state, province, or country. Where required, we will use an approved transfer mechanism and provide information about relevant safeguards. Actual provider regions and transfer mechanisms must be confirmed before publication.",
        ],
      },
      {
        heading: "US state and other regional notices",
        paragraphs: [
          "Depending on where you live, local privacy or consumer-health laws may provide additional rights and require specific notices about categories, purposes, recipients, consent, appeals, or authorized agents. The final notice set must match the confirmed launch geography and data flows. We will not discriminate against you for exercising a legally protected privacy right.",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          `We may update this policy as the Services or law changes. Material changes will receive additional notice where required. Privacy requests, underage-user reports, and questions may be sent to ${SUPPORT_EMAIL}.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "ai-data-processing",
    title: "AI & Data Processing Notice",
    description:
      "What AI features do, what information they may use, and the limits you should understand.",
    category: "Data, privacy & AI",
    sections: [
      {
        heading: "What this notice covers",
        paragraphs: [
          "This notice supplements the Privacy Policy and Health & Safety Notice. It applies when you ask GymBuddy or another Revenge Arc feature to generate text, plans, classifications, estimates, summaries, speech, or image-informed feedback.",
        ],
      },
      {
        heading: "Possible AI features",
        bullets: [
          "Cal AI: meal-photo interpretation and estimated foods, portions, calories, and macronutrients.",
          "Type & Track: natural-language interpretation of foods, quantities, meals, and nutrition entries.",
          "GymBuddy and related coaching: conversational assistance, workout planning, exercise suggestions, progress summaries, and general coaching.",
          "Voice logging: speech recognition, transcription, and conversion of spoken details into app entries.",
          "Image-, audio-, transcript-, and progress-assisted feedback when you actively select or record that media.",
        ],
      },
      {
        heading: "Information sent for a request",
        paragraphs: [
          "A request may include your prompt plus the minimum relevant profile, goal, workout, nutrition, progress, conversation, image, audio, or transcript context selected by the feature. Authentication tokens and provider credentials should remain on Revenge Arc servers and should not be exposed to the mobile client.",
          "Do not include another person’s private information without permission. Avoid submitting medical records, government identifiers, financial credentials, or other information that is unnecessary for the feature.",
        ],
      },
      {
        heading: "Providers and controls",
        paragraphs: [
          "Revenge Arc currently plans to make AI requests through its server to an external AI provider. The production provider, model, contract, data-processing terms, retention, training or data-use settings, region, subprocessors, and deletion controls must be confirmed before launch and reflected here.",
          "Where consent is required for sensitive data or media, the feature should ask before processing. You can choose not to use optional AI features and may request deletion of eligible source data and account-linked AI records.",
        ],
      },
      {
        heading: "Accuracy and human judgment",
        paragraphs: [
          "Cal AI and all other AI-assisted outputs are probabilistic estimates. They are intended to be useful and may often provide reasonable approximations, but they are not 100% accurate and will never be perfect. They may invent facts, misread media or speech, miss context, rely on incomplete or outdated data, or provide unsuitable exercise or nutrition guidance. Review every output carefully and stop using a recommendation that feels unsafe. AI does not replace a trainer, registered dietitian, therapist, clinician, pharmacist, or emergency service.",
          "Do not treat polished wording, citations generated by AI, a confidence label, repeated answers, or a history of correct outputs as proof of accuracy. Verify information when an error could affect allergies, medical diets, medication, injury, pregnancy, eating-disorder recovery, exercise safety, or another important decision.",
          "Revenge Arc should not use AI output as the sole basis for decisions that create legal or similarly significant effects. Moderation and account-enforcement decisions should include contextual review appropriate to the risk.",
        ],
      },
      {
        heading: "Feature-specific limitations",
        bullets: [
          "Cal AI can be wrong because a photo may hide ingredients, cooking oils, sauces, portion depth, preparation method, brand, recipe, or serving size; lighting, angle, focus, and occlusion can also change the estimate.",
          "Type & Track can misunderstand food names, units, quantities, substitutions, and whether a description refers to one serving or an entire recipe.",
          "Voice logging and transcripts can mishear accents, background noise, brand names, numbers, units, and corrections. Review the text and nutrition entry before saving or relying on it.",
          "GymBuddy can miss injuries, equipment limits, experience level, recovery needs, contraindications, and other context that affects whether an exercise or plan is appropriate.",
          "Workout plans, form cues, progression suggestions, and recovery guidance may not fit your body, environment, equipment, technique, or medical history.",
          "Food databases, barcode records, labels, recipes, and third-party nutrition data can be incomplete, stale, duplicated, or incorrect even when AI is not involved.",
          "Progress analysis may mistake correlation for cause, overlook missing entries, or infer trends that do not reflect your actual health or performance.",
        ],
      },
      {
        heading: "Images, audio, and transcripts",
        paragraphs: [
          "Media may contain faces, voices, surroundings, health indicators, or other sensitive information. Upload only media you have the right to use. Transcripts and media analysis may be inaccurate; an image-based meal, body, movement, or progress estimate is not a medical measurement and must not be treated as one. Production storage, temporary-file, transcript, and provider-retention behavior must be verified before these features launch.",
        ],
      },
      {
        heading: "Safety",
        bullets: [
          "Do not use AI features for emergencies, diagnosis, treatment, medication decisions, or crisis intervention.",
          "Stop exercising and seek appropriate help for severe pain, fainting, chest pain, breathing difficulty, neurological symptoms, or another urgent concern.",
          "Seek qualified help before material changes if you are pregnant, injured, managing a condition or medication, or have a history of an eating disorder.",
          "Report unsafe, discriminatory, or clearly inaccurate output through the support contact below.",
        ],
      },
      {
        heading: "Retention, deletion, and questions",
        paragraphs: [
          `AI-related retention follows the Privacy Policy and Data Retention & Deletion Policy. Provider-side retention and deletion behavior must be contractually and technically confirmed before publication. Questions, objections, and deletion requests may be sent to ${SUPPORT_EMAIL}.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "health-safety",
    title: "Health & Safety Notice",
    description:
      "Important limits and safety information for workouts, nutrition, body metrics, and AI guidance.",
    category: "Safety & community",
    sections: [
      {
        heading: "Not medical care",
        paragraphs: [
          "Revenge Arc provides general fitness, nutrition, habit, and educational information for adults. It does not diagnose, treat, prevent, or cure any condition and is not a medical device or substitute for care from a qualified professional. AI output, food data, visual estimates, wearable data, and calculated metrics can be wrong or incomplete.",
        ],
      },
      {
        heading: "Not an emergency service",
        paragraphs: [
          "Do not use Revenge Arc for emergencies or crisis response. If you may be experiencing an emergency, contact local emergency services now. If you are in immediate danger or considering self-harm, contact local emergency or crisis resources and a trusted person who can stay with you.",
        ],
      },
      {
        heading: "Before changing activity or diet",
        paragraphs: [
          "Consider obtaining professional clearance before beginning or materially changing exercise or nutrition, especially if you are pregnant, under medical care, taking medication, returning after inactivity, managing an injury or chronic condition, or have a history of fainting, cardiovascular concerns, disordered eating, or another relevant risk.",
        ],
      },
      {
        heading: "Exercise safety",
        bullets: [
          "Use appropriate form, equipment, load, supervision, space, hydration, recovery, and progression.",
          "Modify or skip any activity that is unsuitable for your ability, environment, instructions from a professional, or equipment.",
          "Stop for chest pain, severe shortness of breath, fainting, sudden weakness, severe pain, loss of coordination, or other concerning symptoms and seek appropriate help.",
          "Do not attempt an exercise solely because an AI system or another community member suggested it.",
        ],
      },
      {
        heading: "Nutrition and body information",
        paragraphs: [
          "Cal AI, Type & Track, nutrition databases, barcode results, serving sizes, calorie estimates, macronutrients, recipes, and image-based meal estimates may be incomplete or inaccurate. Cal AI is not 100% accurate and cannot reliably see hidden ingredients, oils, sauces, preparation methods, brands, or exact portion sizes from a photo. Check packaging, ingredient lists, measured portions, and qualified professional guidance when accuracy matters.",
          "Do not rely on Revenge Arc to identify allergens, cross-contact, contamination, supplement safety, medication interactions, medical-diet compliance, or a clinically appropriate calorie or nutrient target. If you have an allergy, intolerance, medical diet, pregnancy, condition, or medication concern, verify ingredients and instructions with the manufacturer and an appropriately qualified professional.",
          "Body measurements, body-composition calculations, calorie-burn estimates, target projections, and progress images can be sensitive and imprecise. They should not be interpreted as a diagnosis, medical measurement, or guarantee of health.",
          "If tracking food, weight, or body metrics increases distress or encourages restrictive, purging, compulsive, or otherwise harmful behavior, stop using those features and seek qualified support.",
        ],
      },
      {
        heading: "AI, voice, and visual guidance",
        paragraphs: [
          "Every AI-assisted feature can make mistakes. GymBuddy may generate incorrect or unsuitable guidance; voice tools may mishear words, quantities, or units; and image analysis may misidentify food, portions, movement, equipment, or progress. No AI confidence indicator or prior correct result makes an output certain.",
          "Use your judgment, inspect saved entries, and verify important information. Do not continue an exercise, meal plan, supplement, fast, or restriction because an AI output recommends it when it conflicts with symptoms, product labels, professional advice, or common-sense safety.",
        ],
      },
      {
        heading: "Apple Health and wearable data",
        paragraphs: [
          "Apple Health or wearable information may be delayed, duplicated, incomplete, or affected by device settings. It should not be used as the only source for urgent or clinical decisions. You control permissions in your device settings and may disconnect access at any time.",
        ],
      },
      {
        heading: "No promised results",
        paragraphs: [
          "Fitness, weight, appearance, strength, nutrition, and wellbeing outcomes vary based on many factors. Testimonials, creator statements, before-and-after media, streaks, projections, plans, and community posts are examples or individual experiences, not typical-result claims or promises that you will obtain the same result.",
        ],
      },
      {
        heading: "Questions and reports",
        paragraphs: [
          `Report unsafe guidance or product behavior to ${SUPPORT_EMAIL}. This inbox is not monitored as an emergency service.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "community-guidelines",
    title: "Community Guidelines",
    description:
      "Standards for respectful, lawful, and safety-conscious participation in the Revenge Arc community.",
    category: "Safety & community",
    sections: [
      {
        heading: "Purpose",
        paragraphs: [
          "The Revenge Arc community is intended for adults to share progress, learn, and support one another. Participate honestly, respect boundaries, and challenge ideas without degrading people.",
        ],
      },
      {
        heading: "Safety and dignity",
        bullets: [
          "No credible threats, incitement, stalking, doxxing, targeted harassment, hateful conduct, or celebration of violence.",
          "No sexual exploitation, non-consensual intimate content, grooming, or content involving the sexualization or exploitation of minors.",
          "No encouragement or instruction for self-harm, suicide, eating disorders, dangerous substance use, or reckless training practices.",
          "No humiliating another person’s body, disability, health, identity, or progress.",
        ],
      },
      {
        heading: "Authenticity and lawful conduct",
        bullets: [
          "Do not impersonate people or organizations, fabricate credentials, or deceptively present sponsorships, results, or before-and-after media.",
          "Do not scam, phish, spam, manipulate engagement, coordinate fake activity, sell accounts, or solicit users deceptively.",
          "Do not facilitate illegal transactions or share instructions primarily intended to enable wrongdoing.",
          "Do not post another person’s private information, likeness, private messages, or location without an appropriate right or permission.",
        ],
      },
      {
        heading: "Health and fitness claims",
        bullets: [
          "Do not present dangerous advice or unverified claims as guaranteed, clinical, or universally safe.",
          "Do not encourage users to ignore urgent symptoms, prescribed care, medication instructions, or qualified professional advice.",
          "Clearly disclose relevant qualifications and commercial relationships; do not claim credentials you do not have.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Share only content you created or have permission to use. Respect copyright, trademark, publicity, and other rights. Credit alone does not replace permission.",
        ],
      },
      {
        heading: "Your controls",
        paragraphs: [
          "Use available audience, block, mute, and report tools to manage interactions. Do not evade another person’s block or create accounts to continue unwanted contact. Product controls and visibility defaults must be verified before launch.",
        ],
      },
      {
        heading: "Reporting and enforcement",
        paragraphs: [
          "We may remove or restrict content, limit features, suspend or close accounts, preserve relevant evidence, or refer matters to authorities when reasonably necessary. Severity, context, intent, reach, history, and safety risk may affect the response. Reports do not guarantee a particular outcome, and we may be unable to share confidential details.",
          "Use in-app reporting to flag content or accounts and blocking to restrict interactions. Content filtering is planned for community launch; filtering and the review workflow must be active and tested before community access is released. No filter catches every problem. Where appropriate, users may request review of an enforcement decision through the support contact.",
        ],
      },
      {
        heading: "Urgent situations",
        paragraphs: [
          `Revenge Arc is not an emergency service. Contact local emergency services for immediate danger. For non-emergency policy reports or appeal requests, email ${SUPPORT_EMAIL}.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "content-policy",
    title: "Content & Enforcement Policy",
    description:
      "How content reports, safety reviews, enforcement, appeals, and rights complaints are handled.",
    category: "Safety & community",
    sections: [
      {
        heading: "Scope",
        paragraphs: [
          "This policy applies to profiles, posts, comments, reactions, messages, images, video, audio, links, reports, and other user-submitted material. It works together with the Terms and Community Guidelines.",
        ],
      },
      {
        heading: "How to report",
        paragraphs: [
          `Use the in-app report control for content or accounts, or email ${SUPPORT_EMAIL}. You can block accounts in the app. Identify the content or account, explain the concern, and include relevant links, dates, or screenshots without forwarding unnecessary intimate, graphic, or highly sensitive material. Do not make knowingly false reports.`,
        ],
      },
      {
        heading: "Review factors",
        bullets: [
          "The content itself, surrounding conversation, likely meaning, context, and available evidence.",
          "Severity, immediacy, target, reach, repetition, prior violations, and credible risk to people or the Services.",
          "Whether an exception may apply for education, documentation, counterspeech, newsworthiness, or public interest.",
          "Applicable law, user rights, and whether further information or specialist review is needed.",
        ],
      },
      {
        heading: "Possible actions",
        bullets: [
          "No action, a warning, reduced visibility, feature limits, content removal, temporary suspension, or account closure.",
          "Preserving records needed for safety, appeals, fraud prevention, legal obligations, or dispute handling.",
          "Escalating credible imminent threats, child-safety material, or other legally reportable matters to appropriate authorities or specialist channels.",
          "Applying stronger action for serious or repeated violations, including attempts to evade earlier enforcement.",
        ],
      },
      {
        heading: "Appeals",
        paragraphs: [
          `Where an appeal is available, send it from the account email to ${SUPPORT_EMAIL} and identify the decision. Explain why it should be changed and include relevant context. Appeals do not guarantee reversal. A person not responsible for the original decision should review higher-risk appeals where operationally feasible.`,
        ],
      },
      {
        heading: "Copyright and trademark complaints",
        paragraphs: [
          `A rights holder or authorized representative may send a notice to ${SUPPORT_EMAIL} identifying the protected work, the allegedly infringing material and its location, contact information, a good-faith statement, an accuracy-and-authority statement, and a physical or electronic signature. We may request additional information, remove or restrict material, notify the uploader, accept a legally sufficient counter-notice, and address repeat infringement as required by applicable law.`,
          "The operating entity, service address, designated agent status, and jurisdiction-specific notice-and-counter-notice process must be confirmed by counsel before this is presented as a formal statutory safe-harbor procedure.",
        ],
      },
      {
        heading: "Privacy and evidence",
        paragraphs: [
          "We limit access to report information and retain moderation evidence only as reasonably necessary for review, safety, appeals, legal obligations, and repeat-offender controls. We may not disclose the reporter’s identity to the reported user unless required by law or necessary to address the matter with appropriate safeguards.",
        ],
      },
      {
        heading: "Operational readiness",
        paragraphs: [
          "Published policy must match actual staffing, tooling, escalation, response targets, language coverage, evidence retention, and appeal capability. Those controls must be tested before community features launch.",
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "data-retention-deletion",
    title: "Data Retention & Deletion",
    description:
      "How long information is kept, how deletion works, and what limited exceptions may apply.",
    category: "Data, privacy & AI",
    sections: [
      {
        heading: "Retention approach",
        paragraphs: [
          "Revenge Arc retains information only for as long as reasonably needed for the purpose collected, to provide and secure the Services, meet legal obligations, resolve disputes, and enforce agreements. Retention also depends on sensitivity, account status, user choices, operational needs, consent, and legal requirements.",
        ],
      },
      {
        heading: "Retention categories",
        bullets: [
          "Account and profile data: generally kept while the account is active and for a limited closure period needed for recovery, security, or legal obligations.",
          "Training, nutrition, progress, body, Apple Health, and AI context: kept while needed for requested features and account history, then deleted or de-identified according to user action and the approved schedule.",
          "Community content and messages: kept while available in the service, subject to deletion, recipient copies, moderation evidence, and lawful preservation needs.",
          "Media and temporary processing files: kept only as needed for storage, delivery, moderation, or the requested AI feature; temporary and derivative copies require a verified deletion schedule.",
          "Subscription and transaction records: kept as required for entitlement, accounting, tax, fraud, and dispute obligations; Apple retains its own purchase records.",
          "Support, safety, moderation, and security records: kept according to severity, appeal needs, abuse prevention, and legal obligations.",
          "Creator Program applications: kept while evaluating and administering the program, then deleted or archived under an approved applicant schedule.",
          "Public website analytics: raw events are configured for deletion after 90 days and daily privacy-safe aggregates after 24 months.",
        ],
      },
      {
        heading: "Exact periods before launch",
        paragraphs: [
          "Exact periods for production-app records, provider logs, backups, AI processing, messages, media, support, moderation, billing, security, legal holds, and Creator applications must be confirmed with engineering, vendors, operations, and counsel before publication. Public promises must match technically enforced deletion jobs and vendor contracts.",
        ],
      },
      {
        heading: "Requesting deletion",
        paragraphs: [
          `You can delete your records using the app’s record-deletion controls. For account deletion, other eligible account-linked information, or a Creator Program application, use an available in-app account control or email ${SUPPORT_EMAIL} from the address connected to the account or application. Include enough information to locate the record, but never send a password, authentication code, full payment-card number, or unnecessary health information.`,
          "We may ask for reasonable identity or authority verification. Deleting the app from a device does not delete the account, and deleting a Revenge Arc account does not cancel a subscription billed by Apple.",
        ],
      },
      {
        heading: "What deletion means",
        paragraphs: [
          "Eligible active-system information will be deleted, de-identified, or disconnected from your account. Some copies may remain temporarily in encrypted or access-restricted backups until they are overwritten on the normal schedule. Content shared with others may remain in their copies or in a de-identified form, and some records may be retained when reasonably necessary for security, fraud prevention, safety, legal compliance, disputes, or the exercise or defense of legal claims.",
        ],
      },
      {
        heading: "Health permissions and third parties",
        paragraphs: [
          "Revoking Apple Health permission stops future access but may not automatically delete information already imported into Revenge Arc. Request account-data deletion separately. Apple, Google, and other providers control information in their own systems under their policies; follow their controls for those copies.",
        ],
      },
      {
        heading: "Export, appeals, and authorized agents",
        paragraphs: [
          `Where applicable, you may request an export, use an authorized agent, or appeal a denied request by emailing ${SUPPORT_EMAIL}. We will explain any legally required denial and available appeal path. The final verification method, service targets, export format, and appeal workflow must be approved before launch.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "subscriptions-refunds",
    title: "Subscriptions & Refunds",
    description:
      "How iOS plans, renewals, cancellations, restoration, trials, and refund requests work.",
    category: "Commerce & notices",
    sections: [
      {
        heading: "Plans and pricing",
        paragraphs: [
          "Revenge Arc may offer weekly, monthly, and yearly iOS subscriptions. The in-app purchase screen and Apple App Store are the authoritative source for available plans, currency, price, taxes, billing interval, included features, introductory offers, and trial terms. Website pricing is informational and may differ by region or change before purchase.",
        ],
      },
      {
        heading: "Payment and renewal",
        paragraphs: [
          "Apple charges your Apple Account after purchase confirmation. A subscription automatically renews for the displayed period unless it is cancelled through Apple at least as required by Apple before the renewal date. Apple controls billing and may notify you of price changes or request consent where required.",
        ],
      },
      {
        heading: "Trials and offers",
        paragraphs: [
          TRIAL_DISCLOSURE,
          "The offer applies only when shown on the Apple purchase confirmation screen. A previous trial or subscription may affect eligibility. Offers can vary by plan or region and may change. Check the price and deadline before confirming; deleting records or the app does not stop renewal.",
        ],
      },
      {
        heading: "Cancel or manage",
        bullets: [
          "Open iOS Settings, tap your name, choose Subscriptions, select Revenge Arc, and use Apple’s management controls.",
          "You normally keep access until the end of the paid period after cancellation.",
          "Deleting the app or your Revenge Arc account does not cancel Apple billing.",
          "Cancel through Apple before requesting account deletion if you do not want the subscription to renew.",
        ],
      },
      {
        heading: "Restore purchases",
        paragraphs: [
          "Use the Restore Purchases control in the app while signed in with the Apple Account used for the purchase. Restoration depends on Apple and the subscription entitlement. If access is not restored, contact support with the non-sensitive transaction information needed to investigate; never send a full payment-card number or Apple password.",
        ],
      },
      {
        heading: "Refund requests",
        paragraphs: [
          "Apple controls App Store charges and refund decisions. Request a refund through Apple’s purchase-support process. Revenge Arc cannot promise or directly issue a refund for an Apple-controlled transaction. This does not limit any refund, cancellation, or cooling-off right that applicable law requires.",
        ],
      },
      {
        heading: "Feature or price changes",
        paragraphs: [
          "Subscription features and prices may change. Material changes will receive notice where required. If paid service becomes unavailable, any remedy will follow applicable law and the relevant store rules.",
        ],
      },
      {
        heading: "Support",
        paragraphs: [
          `For entitlement or restoration help, contact ${SUPPORT_EMAIL}. For billing, cancellation, or refund decisions, use Apple’s account and purchase-support tools.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "cookies",
    title: "Cookies & Website Storage",
    description:
      "A plain-language explanation of cookies, local storage, and measurement on this website.",
    category: "Data, privacy & AI",
    sections: [
      {
        heading: "Public website",
        paragraphs: [
          "The public Revenge Arc website currently does not use advertising cookies or analytics cookies. Public measurement uses cookie-free event records with an allowlisted event name, page path, referrer host, campaign fields, device class, and a rotating anonymous daily identifier. Raw IP addresses are not stored in the analytics records.",
        ],
      },
      {
        heading: "Essential administrator cookies",
        paragraphs: [
          "The private administrator area uses essential Supabase authentication cookies to establish and refresh an authorized administrator session. These cookies are needed for requested sign-in and security functionality and are not used for advertising.",
        ],
      },
      {
        heading: "Other browser storage",
        paragraphs: [
          "Browsers may store technical resources in cache and may retain settings controlled by the browser or operating system. The final production site must be scanned for cookies, pixels, software-development kits, local storage, embedded media, and third-party requests before launch.",
        ],
      },
      {
        heading: "Retention",
        paragraphs: [
          "The website database is configured to delete raw analytics events older than 90 days and privacy-safe daily aggregates older than 24 months. Authentication-cookie duration follows the configured Supabase session settings and must be verified before publication.",
        ],
      },
      {
        heading: "Your controls and future changes",
        paragraphs: [
          "You can clear or block cookies through browser settings, although blocking essential administrator cookies prevents administrator sign-in. If non-essential cookies, advertising pixels, or similar tracking are introduced, this policy and any legally required consent or opt-out controls will be updated before the new use begins.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          `Questions about website storage or measurement may be sent to ${SUPPORT_EMAIL}.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "open-source-notices",
    title: "Open-Source Notices",
    description:
      "Attributions and license information for open-source software and assets used by Revenge Arc.",
    category: "Commerce & notices",
    sections: [
      {
        heading: "Open-source software",
        paragraphs: [
          "Revenge Arc uses open-source software. Each component remains subject to its applicable license, copyright notice, attribution, source-offer requirement, and disclaimer. Open-source licenses apply to the relevant component and do not grant rights to Revenge Arc branding, proprietary content, or user data.",
        ],
      },
      {
        heading: "Website components",
        bullets: [
          "Next.js, React, and React DOM.",
          "Supabase JavaScript and server-rendering libraries.",
          "Phosphor Icons for interface iconography.",
          "Motion, Recharts, Zod, Tailwind CSS, TypeScript, and supporting build and test tools.",
        ],
      },
      {
        heading: "Fonts and visual assets",
        paragraphs: [
          "The website loads Barlow Condensed, Inter, and Space Mono through Next.js font tooling. Applicable font licenses and attribution must be preserved. Decorative illustrations were AI-generated according to the owner; that does not guarantee freedom from third-party rights. Generator usage terms, source material, trademarks, and any people or likenesses still need review. App captures and third-party badge artwork have their own rights and usage rules.",
        ],
      },
      {
        heading: "Release notice inventory",
        paragraphs: [
          "A website notice inventory generated from the website’s production dependency lockfile, including transitive packages and the three font licenses, is available at /website-third-party-notices.txt. Package entries without a local license text are flagged for upstream review. This is not a legal certification or a complete mobile-app inventory.",
          "The mobile application, backend, bundled native libraries, source offers, and any remaining redistribution requirements still need a separate release review. The component list above is a summary, not proof that every software license obligation is satisfied.",
        ],
      },
      {
        heading: "Requests and corrections",
        paragraphs: [
          `To request a copy of applicable notices or report a missing attribution, email ${SUPPORT_EMAIL}.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "app-license",
    title: "Apple App License Addendum",
    description:
      "Additional license terms for the Revenge Arc iOS application and Apple App Store distribution.",
    category: "Core service",
    sections: [
      {
        heading: "How this addendum applies",
        paragraphs: [
          "This addendum applies to the Revenge Arc iOS application obtained through Apple’s App Store and supplements the Terms of Service. If Revenge Arc does not provide an approved custom end-user license agreement through App Store Connect, Apple’s then-current Standard Licensed Application End User License Agreement applies to the app. Any final custom agreement must include Apple’s required minimum terms and the completed developer identity and contact information.",
          "If this addendum conflicts with a non-waivable law or an applicable Apple usage rule, that law or rule controls to the extent of the conflict.",
        ],
      },
      {
        heading: "Acknowledgement and license scope",
        paragraphs: [
          "You and Revenge Arc acknowledge that the license agreement for the app is between you and the Revenge Arc operating entity, not Apple. Revenge Arc, not Apple, is responsible for the app and its content, subject to applicable law.",
          "You receive a limited, personal, non-exclusive, non-transferable license to use the app on Apple-branded products you own or control as permitted by the Apple Media Services usage rules, including permitted Family Sharing or volume-purchase use. The app is licensed, not sold. You may not copy, distribute, sublicense, reverse engineer, modify, or create derivative works except where applicable law or an open-source license expressly permits it.",
        ],
      },
      {
        heading: "Maintenance and support",
        paragraphs: [
          `Revenge Arc is responsible for maintenance and support for the app to the extent promised in the Terms or required by law. Apple has no obligation to provide maintenance or support. App questions, complaints, and claims should be sent to ${SUPPORT_EMAIL}. The final operating-entity legal name, street address, and telephone number must be inserted before this addendum is used as a custom EULA.`,
        ],
      },
      {
        heading: "Warranty and refunds",
        paragraphs: [
          "To the extent an applicable warranty cannot lawfully be disclaimed and the app fails to conform to it, you may notify Apple, and Apple may refund the purchase price for the app, if any, as required by Apple’s minimum terms. To the maximum extent permitted by law, Apple has no other warranty obligation for the app. Revenge Arc is responsible for other claims, losses, liabilities, damages, costs, or expenses attributable to a failure to conform to an applicable warranty, subject to the Terms and non-waivable law.",
        ],
      },
      {
        heading: "Product and intellectual-property claims",
        paragraphs: [
          "Revenge Arc, not Apple, is responsible for addressing claims relating to the app or your possession and use of it, including product-liability, legal or regulatory compliance, and consumer-protection claims. If a third party claims that the app or your possession and use of it infringes intellectual-property rights, Revenge Arc, not Apple, is responsible for the investigation, defense, settlement, and discharge of that claim to the extent required by the applicable agreement or law.",
        ],
      },
      {
        heading: "Legal compliance and third-party terms",
        bullets: [
          "You represent that you are not located in a country subject to a United States government embargo or designated by the United States government as supporting terrorism.",
          "You represent that you are not listed on a United States government list of prohibited or restricted parties.",
          "You must comply with applicable third-party terms when using the app, including Apple Media Services, wireless-data, device, HealthKit, and connected-service terms.",
        ],
      },
      {
        heading: "Apple as beneficiary",
        paragraphs: [
          "Apple and its subsidiaries are third-party beneficiaries of this addendum. After you accept it, Apple has the right to enforce the applicable Apple-required provisions against you as a third-party beneficiary.",
          "This draft must not be submitted as a custom App Store EULA until the operating entity, address, telephone number, email, launch regions, and counsel-approved relationship to the Terms are complete.",
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "consumer-health-data",
    title: "Consumer Health Data Privacy Notice",
    description:
      "A focused notice for fitness, nutrition, body, recovery, image, and other consumer health data.",
    category: "Data, privacy & AI",
    sections: [
      {
        heading: "Scope",
        paragraphs: [
          "This notice supplements the Privacy Policy for information that identifies or can reasonably be linked to a consumer and reveals or could be used to infer health status, fitness, nutrition, bodily functions, symptoms, measurements, treatment, medication, reproductive or sexual health, or efforts to seek health-related services. Whether a particular law applies depends on your location, Revenge Arc’s launch scope, and the facts of the processing.",
          "Revenge Arc is a general-wellness service, not a healthcare provider, and should not be assumed to be covered by HIPAA. Other consumer-health, privacy, and breach-notification laws may still apply.",
        ],
      },
      {
        heading: "Categories we may collect",
        bullets: [
          "Workout plans, exercises, performance, activity, steps, active energy, recovery, injuries or limitations you choose to disclose, and related goals.",
          "Foods, meals, recipes, photos, calories, nutrients, dietary preferences, allergies or medical-diet details you choose to disclose, and nutrition goals.",
          "Weight, measurements, progress records, images, voice, transcripts, and information that may reveal or support an inference about health, fitness, or physical condition.",
          "AI prompts, outputs, classifications, and recommendations connected to health, nutrition, exercise, body, or wellbeing information.",
          "Device, feature-use, purchase, support, and security information when it can be linked to a health-related interaction or inference.",
        ],
      },
      {
        heading: "Sources",
        bullets: [
          "You, when you create a profile, enter information, upload media, speak, message, request support, or use a feature.",
          "Your device and Apple Health, only for data types and access you authorize.",
          "Connected services, subscription systems, and food or barcode databases used for a feature you request.",
          "Other users, if they send, mention, tag, report, or upload information involving you, subject to their obligations and your controls.",
          "Inferences produced from your activity, entries, media, prompts, and requested AI analysis.",
        ],
      },
      {
        heading: "Why we collect and use it",
        bullets: [
          "Provide requested workout, nutrition, progress, wellness, reminder, community, support, and account features.",
          "Generate requested AI-assisted estimates, plans, summaries, classifications, and coaching while clearly communicating their limitations.",
          "Save, synchronize, display, export, correct, or delete your information according to your choices.",
          "Secure the Services, prevent abuse, investigate incidents and reports, provide support, comply with law, and defend legal claims.",
          "Improve reliability and usability using approved, minimized, and appropriately protected information. Separate consent must be obtained where required for a new purpose.",
        ],
      },
      {
        heading: "Sharing and processors",
        paragraphs: [
          "Consumer health data may be shared with processors only as needed for the requested feature, such as configured cloud hosting and authentication, AI processing, Apple or HealthKit connectivity, subscription entitlement, push delivery, diagnostics, support, and food-data services. It may also be visible to users you choose to share with, or disclosed when required by law or necessary to protect rights and safety.",
          "The production provider list, specific affiliates, contractual roles, regions, subprocessors, retention, and data-use settings must be verified before launch. Planned or evaluated providers may include Apple, RevenueCat, Google or Firebase services, a configured AI provider, FatSecret, and Open Food Facts; a planned name must not be presented as a current recipient until the production data flow confirms it. Supabase is used for the public website and must not be described as an app-health-data recipient unless the app actually sends that data to it.",
        ],
      },
      {
        heading: "Sale, advertising, and geofencing",
        paragraphs: [
          "Revenge Arc does not currently sell consumer health data and does not use Apple Health data or consumer health data for targeted advertising. We do not use a geofence around a healthcare facility to identify, track, collect data from, or send messages to people about health services. If a material practice changes, required notice and consent must be provided before the new processing begins.",
        ],
      },
      {
        heading: "Consent and withdrawal",
        paragraphs: [
          "Where consent is required, the request should be specific to the data and purpose and separate from unrelated terms. You may decline an optional permission or AI/media feature, revoke device permissions, stop future collection, or withdraw consent where applicable. Withdrawal does not make earlier lawful processing unlawful and may prevent the affected feature from working.",
        ],
      },
      {
        heading: "Your consumer health rights",
        bullets: [
          "Confirm whether covered consumer health data is collected, shared, or sold, and access eligible data.",
          "Request deletion of eligible data, including appropriate notification to processors or other recipients when required.",
          "Withdraw consent for collection or sharing and receive information about relevant recipients where applicable.",
          "Correct or export information and appeal a refusal where applicable law provides those rights.",
          `Submit a request or appeal to ${SUPPORT_EMAIL}. We may verify identity and authority and will not discriminate against you for exercising a protected right.`,
        ],
      },
      {
        heading: "Retention, security, and changes",
        paragraphs: [
          "Consumer health data is retained according to the Data Retention & Deletion Policy and should be protected with safeguards appropriate to its sensitivity. Exact app, backup, provider, media, AI, message, and legal-hold periods must be verified before launch. No security measure eliminates every risk.",
          "The categories, purposes, and recipients in this notice must be updated before collecting, using, or sharing additional consumer health data in a way that requires new notice or consent. Material changes will receive additional notice where required.",
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "regional-privacy",
    title: "Regional Privacy Supplements",
    description:
      "Location-specific privacy rights and disclosures that may apply in the United States, EEA, UK, and other regions.",
    category: "Data, privacy & AI",
    sections: [
      {
        heading: "How these supplements apply",
        paragraphs: [
          "These supplements add to the Privacy Policy and Consumer Health Data Privacy Notice. A section applies only when the cited law covers Revenge Arc’s activity and you are entitled to its protections. Rights, exceptions, verification, timing, and appeals vary by location. The launch countries, states, legal entity, revenue and processing thresholds, and representative obligations must be confirmed before final publication.",
        ],
      },
      {
        heading: "California",
        paragraphs: [
          "If the California Consumer Privacy Act applies, California residents may have rights to know the categories and specific pieces of personal information collected, sources, purposes, categories of recipients, access, correction, deletion, portability, opt out of sale or sharing, limit certain uses of sensitive personal information, and receive equal service without unlawful discrimination. The Privacy Policy describes the current categories, sources, purposes, and recipients.",
          "Revenge Arc does not currently sell personal information or share it for cross-context behavioral advertising. If a covered sale or sharing practice begins, an appropriate opt-out method and recognition of legally required browser preference signals, including Global Privacy Control where applicable, must be implemented before the practice begins. Authorized-agent requests may require proof of authority and identity verification.",
        ],
      },
      {
        heading: "Washington consumer health data",
        paragraphs: [
          "If Washington’s My Health My Data Act applies, a consumer may have rights to confirm collection or sharing of consumer health data, access that data, receive a list of relevant recipients, withdraw consent, request deletion, and appeal a refusal. Separate authorization is required before a covered sale. See the Consumer Health Data Privacy Notice for categories, sources, purposes, sharing, and request instructions.",
        ],
      },
      {
        heading: "Other United States states",
        paragraphs: [
          "Residents of Colorado, Connecticut, Delaware, Iowa, Maryland, Minnesota, Montana, Nebraska, Nevada, New Hampshire, New Jersey, Oregon, Texas, Utah, Virginia, and other states may have some combination of access, correction, deletion, portability, opt-out, sensitive-data consent, authorized-agent, and appeal rights if the relevant law applies. The exact list and wording must be reconciled with launch timing, statutory thresholds, exemptions, and current practices before publication.",
          "Nevada residents may submit a verified request concerning a covered sale as defined by Nevada law even when broader privacy-law thresholds do not apply. Revenge Arc does not currently sell covered information.",
        ],
      },
      {
        heading: "EEA and United Kingdom",
        paragraphs: [
          "If EU or UK data-protection law applies, the final notice must identify the controller, purposes, legal bases, special-category conditions, recipients, retention, international-transfer safeguards, and any required representative or data protection officer. Depending on the processing, rights may include access, correction, deletion, restriction, portability, objection, consent withdrawal, and a complaint to the applicable supervisory authority.",
          "Revenge Arc does not intend to make decisions based solely on automated processing that produce legal or similarly significant effects. Any sensitive health information or biometric identifier requires an applicable legal condition and, where required, explicit consent. Actual provider regions and transfer mechanisms must be confirmed before offering the Services in these markets.",
        ],
      },
      {
        heading: "Canada and other regions",
        paragraphs: [
          "If Revenge Arc launches in Canada or another country with additional privacy rules, the public notice, consent design, access and correction process, cross-border disclosures, complaint route, and local representative requirements must be localized before launch there. Publishing this draft does not by itself mean the Services are offered in every jurisdiction.",
        ],
      },
      {
        heading: "Requests and appeals",
        paragraphs: [
          `Send privacy requests, authorized-agent submissions, and appeals to ${SUPPORT_EMAIL}. Describe the right and account involved without including passwords, authentication codes, full payment-card numbers, or unnecessary health information. We may verify identity, residence, and authority, and will respond within the period required by applicable law.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "biometric-media",
    title: "Biometric & Media Notice",
    description:
      "How photos, video, audio, voice, body imagery, and any future biometric-identification feature should be handled.",
    category: "Data, privacy & AI",
    sections: [
      {
        heading: "Media covered by this notice",
        paragraphs: [
          "This notice applies to photos, progress images, meal images, video, audio, voice recordings, transcripts, and related metadata you choose to upload, capture, send, or analyze. Media may reveal identity, surroundings, location clues, health information, body characteristics, other people, or private belongings. Use a feature only when you are comfortable providing the requested media for the disclosed purpose.",
        ],
      },
      {
        heading: "No current biometric identification",
        paragraphs: [
          "Revenge Arc does not currently intend to use face geometry, voiceprints, fingerprints, retina or iris scans, or another biometric identifier to identify or authenticate people. Ordinary image, voice, movement, or body analysis is not described as biometric identification unless the production system actually creates or compares an identifier or template for identity purposes.",
          "If a future feature collects or uses a biometric identifier or biometric template, Revenge Arc must provide a separate, feature-specific notice; explain the purpose and duration; obtain any required written or affirmative consent before collection; prohibit unauthorized sale or profit; limit disclosure; protect the data; and publish an applicable retention and destruction schedule before the feature launches.",
        ],
      },
      {
        heading: "How media may be used",
        bullets: [
          "Store, display, synchronize, transmit, edit, or delete media as part of the feature and audience you select.",
          "Create requested AI-assisted meal, exercise, progress, caption, transcription, moderation, or support outputs.",
          "Review reported media for safety, policy enforcement, appeals, fraud prevention, legal compliance, and defense of claims.",
          "Diagnose a reported technical problem when you choose to provide media to support.",
        ],
      },
      {
        heading: "Accuracy and sensitive inferences",
        paragraphs: [
          "Image, video, speech, and transcript analysis can be inaccurate. Cal AI may misidentify foods and portions; speech recognition may mishear words or quantities; and visual analysis may misread form, movement, equipment, progress, or body characteristics. Media-derived output is not a medical measurement, identity verification, diagnosis, or guarantee.",
          "Revenge Arc should not infer highly sensitive traits that are unnecessary for the requested feature. Any new inference purpose involving health, identity, emotion, disability, ethnicity, sexuality, or another protected or highly sensitive trait requires separate review, minimization, notice, and consent where required.",
        ],
      },
      {
        heading: "Your permissions and other people",
        paragraphs: [
          "Upload only media you created or have the right and permission to use. Do not secretly record, upload intimate media without consent, or submit another person’s face, voice, health information, private location, or personal information without an appropriate lawful basis and permission. Parents or guardians may not create an account for a minor because the Services are adults only.",
        ],
      },
      {
        heading: "Recording and device controls",
        paragraphs: [
          "Camera and microphone access should occur only after device permission and a deliberate feature action. Revenge Arc does not intend to continuously or secretly record ambient audio or video. You can deny or revoke camera, photo-library, and microphone access in device settings, although the related feature will stop working.",
        ],
      },
      {
        heading: "Sharing, retention, and deletion",
        paragraphs: [
          "Media may be shared with the audience you select and with configured processors needed for storage, delivery, AI processing, transcription, moderation, security, or support. Exact providers, temporary copies, derivatives, regions, access rules, and deletion timing must be verified before launch. Media must not be sold, used for targeted advertising, or used to train a provider’s general model unless separately disclosed and lawfully authorized.",
          `Use in-app controls when available or email ${SUPPORT_EMAIL} to request deletion of eligible media and account-linked derivatives. Recipient copies, moderation evidence, backups, legal holds, and provider systems may require limited exceptions or delayed deletion as described in the Data Retention & Deletion Policy.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "copyright-dmca",
    title: "Copyright & DMCA Policy",
    description:
      "How copyright notices, counter-notices, repeat infringement, and restoration requests are handled.",
    category: "Safety & community",
    sections: [
      {
        heading: "Respect for rights",
        paragraphs: [
          "Users must upload only content they created or are authorized to use. Revenge Arc may remove or restrict material, preserve relevant records, notify the uploader, limit accounts, and address repeated infringement when a credible rights complaint is received. Trademark, publicity, privacy, and other rights complaints may be reviewed under the Content & Enforcement Policy even when the DMCA does not apply.",
        ],
      },
      {
        heading: "Copyright takedown notice",
        paragraphs: [
          `Send a written notice to ${SUPPORT_EMAIL}. For a notice intended to comply with the United States Digital Millennium Copyright Act, include all of the following:`,
        ],
        bullets: [
          "A physical or electronic signature of the copyright owner or a person authorized to act for the owner.",
          "Identification of the copyrighted work, or a representative list if multiple works on the same service are covered.",
          "Identification and location of the material claimed to be infringing, with enough information for us to find it.",
          "Your name, mailing address, telephone number, and email address.",
          "A statement that you have a good-faith belief the disputed use is not authorized by the owner, its agent, or the law.",
          "A statement that the notice is accurate and, under penalty of perjury, that you are the owner or authorized to act for the owner.",
        ],
      },
      {
        heading: "Counter-notice",
        paragraphs: [
          "If your content was removed or disabled because of a copyright notice and you believe that happened through mistake or misidentification, you may send a written counter-notice containing the following:",
        ],
        bullets: [
          "Your physical or electronic signature.",
          "Identification of the removed or disabled material and where it appeared before removal.",
          "A statement under penalty of perjury that you have a good-faith belief the material was removed or disabled because of mistake or misidentification.",
          "Your name, mailing address, and telephone number, plus consent to the jurisdiction of the appropriate United States federal district court and acceptance of service from the original claimant or that person’s agent, as required by law.",
        ],
      },
      {
        heading: "Review and possible restoration",
        paragraphs: [
          "We may forward a valid notice or counter-notice to the affected party. After forwarding a valid counter-notice, material may be restored in the statutory period, generally not fewer than 10 and not more than 14 business days, unless the original claimant tells us that a court action seeking to restrain the alleged infringement has been filed. We may decline restoration for an independent policy violation or legal reason.",
        ],
      },
      {
        heading: "Repeat infringement and misuse",
        paragraphs: [
          "In appropriate circumstances, we may limit or terminate accounts of repeat infringers, considering valid notices, counter-notices, retractions, court outcomes, context, and attempts to evade enforcement. Knowingly making a material misrepresentation in a notice or counter-notice may create liability. Do not submit a complaint merely to silence criticism, competition, or lawful use.",
        ],
      },
      {
        heading: "Designated agent status",
        paragraphs: [
          "The final operating entity must register and maintain a designated agent with the United States Copyright Office and publish the agent’s name or role, physical address, telephone number, and email before claiming DMCA safe-harbor status. Until that registration and public contact block are complete, this page is an intake policy and must not be represented as proof that statutory safe-harbor requirements have been satisfied.",
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "creator-terms",
    title: "Creator & Influencer Terms",
    description:
      "Rules for Creator Program applicants, sponsored content, health claims, compensation, and licensed media.",
    category: "Commerce & notices",
    sections: [
      {
        heading: "Eligibility and acceptance",
        paragraphs: [
          "The Creator Program is for people age 18 or older. An application, invitation, conversation, sample, or access to a creator tool is not a promise of acceptance, payment, exclusivity, employment, minimum work, campaign approval, or continued participation. A campaign-specific agreement or written offer controls over these general terms for that campaign.",
        ],
      },
      {
        heading: "Truthful content and disclosures",
        bullets: [
          "Give honest opinions and do not make a statement you know is false, misleading, unsubstantiated, or inconsistent with your actual experience.",
          "Clearly and conspicuously disclose a material connection, including payment, free access, gifts, commissions, ownership, employment, or another benefit, in a place and format people will notice before acting.",
          "Use platform disclosure tools when available, but do not rely on them when an additional plain-language disclosure is needed.",
          "Do not promise health, weight, appearance, income, or fitness outcomes, fabricate results, or present AI estimates or general-wellness content as medical advice.",
          "Follow the brief, applicable advertising law, platform rules, Community Guidelines, and written correction or removal requests.",
        ],
      },
      {
        heading: "Health, nutrition, and AI claims",
        paragraphs: [
          "Creators may describe real experience but must not claim that Cal AI or another AI feature is 100% accurate, flawless, clinically validated, or guaranteed. Cal AI meal-photo results, nutrition values, workouts, progress analysis, and other AI-assisted outputs are estimates and can be wrong. Claims requiring scientific or clinical support may not be used unless Revenge Arc has supplied approved substantiation and exact approved wording.",
          "Do not encourage unsafe exercise, disordered eating, medication changes, ignored symptoms, or use of Revenge Arc for emergencies, diagnosis, treatment, allergies, or medical diets.",
        ],
      },
      {
        heading: "Rights and permissions",
        paragraphs: [
          "You must own or have written permission for music, footage, photos, artwork, trademarks, locations, testimonials, and every person’s name, image, voice, and likeness in submitted content. You retain ownership of your original content, subject to the license in the applicable campaign agreement. Any license should identify media, territory, duration, editing, paid-ad, whitelisting, archival, and termination rights rather than relying on an unlimited general permission.",
        ],
      },
      {
        heading: "Approval, correction, and removal",
        paragraphs: [
          "Revenge Arc may require review before publication and may request a correction, disclosure, pause, or removal for legal, safety, accuracy, platform, brand, or campaign reasons. Approval does not transfer your responsibility for your own statements or rights clearances. Preserve requested records of published versions, dates, disclosures, audience, and performance for the campaign period.",
        ],
      },
      {
        heading: "Compensation, taxes, and expenses",
        paragraphs: [
          "Compensation, deliverables, timing, approval milestones, expenses, commissions, usage fees, and payment conditions must be stated in a written campaign agreement. Creators are responsible for their taxes and ordinary business expenses unless the agreement says otherwise. Do not purchase fake engagement, use prohibited incentives, or conceal referral activity.",
        ],
      },
      {
        heading: "Confidentiality and relationship",
        paragraphs: [
          "Protect nonpublic product, campaign, financial, user, security, and launch information identified as confidential or reasonably understood to be confidential. Do not disclose personal data or unreleased vulnerabilities. Unless a written agreement says otherwise, creators are independent contractors and may not bind Revenge Arc, speak as an employee, or make commitments on its behalf.",
        ],
      },
      {
        heading: "Suspension, termination, and contact",
        paragraphs: [
          `Revenge Arc may reject, suspend, or end participation for missed deliverables, policy violations, unsafe or deceptive claims, rights issues, fraud, conduct creating material risk, or campaign changes, subject to the written agreement and applicable law. Questions and disclosure approvals may be sent to ${SUPPORT_EMAIL}.`,
        ],
      },
    ],
  },
  {
    ...shared,
    slug: "security",
    title: "Security & Responsible Disclosure",
    description:
      "How to report a security concern and the boundaries for responsible vulnerability research.",
    category: "Safety & community",
    sections: [
      {
        heading: "Report a security concern",
        paragraphs: [
          `Send suspected vulnerabilities, unauthorized access, exposed information, credential abuse, or security incidents to ${SUPPORT_EMAIL} with “Security” in the subject. Include the affected URL or feature, date and time, clear reproduction steps, impact, and supporting screenshots or logs with secrets and unrelated personal information removed. Do not send passwords, authentication codes, private keys, full payment-card numbers, or copied user datasets.`,
        ],
      },
      {
        heading: "Protect people while reporting",
        bullets: [
          "Stop testing when you encounter another person’s data, a secret, destructive behavior, service instability, or a path to material harm.",
          "Do not access, download, alter, retain, or disclose data beyond the minimum needed to describe the issue.",
          "Do not disrupt service, perform denial of service, send spam, use malware, extort, threaten, phish, socially engineer, or test physical security.",
          "Do not test third-party providers, employee accounts, production admin tools, or systems you do not own without their separate written authorization.",
          "Give us a reasonable opportunity to investigate and reduce risk before public disclosure.",
        ],
      },
      {
        heading: "Authorization and safe-harbor limits",
        paragraphs: [
          "This page welcomes good-faith reports but is not blanket authorization to access systems or data. Until Revenge Arc publishes an exact testing scope and safe-harbor commitment approved by security and counsel, limit research to lawful observation and your own accounts and data. If you need testing authorization, request it in writing before testing.",
          "A future program may provide clearer authorized targets, methods, exclusions, disclosure timing, and safe-harbor language. No statement here authorizes conduct prohibited by law or by a third party’s terms.",
        ],
      },
      {
        heading: "What to expect",
        paragraphs: [
          "We aim to acknowledge useful reports, assess severity, request clarification when needed, and communicate when a fix or mitigation is available. Acknowledgement, status, remediation, and disclosure timing depend on severity, reproducibility, affected systems, third parties, and legal obligations; no specific response or fix time is promised by this draft.",
        ],
      },
      {
        heading: "No bounty or confidentiality promise",
        paragraphs: [
          "Revenge Arc does not currently operate a paid bug-bounty program. A report does not create a right to payment, public credit, employment, or access to confidential remediation details. If you want recognition, say how you would like to be identified, but we may withhold details when disclosure would create risk or violate law or another person’s rights.",
        ],
      },
      {
        heading: "User account security",
        bullets: [
          "Use a unique password where a password is offered and protect sign-in links, verification codes, and Apple or Google credentials.",
          "Keep devices and software updated, review active sessions where available, and sign out of shared devices.",
          "Contact support promptly if you suspect account takeover, unexpected billing, or disclosure of private content.",
          "Revenge Arc will never ask you to send a password or authentication code by email.",
        ],
      },
    ],
  },
];

export const legalBySlug = Object.fromEntries(
  legalDocuments.map((document) => [document.slug, document]),
) as Record<string, LegalDocument>;

export const legalDocumentGroups = legalCategoryOrder.map((category) => ({
  category,
  documents: legalDocuments.filter(
    (document) => document.category === category,
  ),
}));
