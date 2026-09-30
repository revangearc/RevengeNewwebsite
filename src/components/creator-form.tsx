"use client";

import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { FormEvent, useRef, useState } from "react";
import { creatorApplicationSchema } from "@/lib/validation";
import { trackEvent } from "@/lib/client-events";
import { PrimaryButton } from "./buttons";

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-white/20 bg-[#08070e] px-4 text-base text-white placeholder:text-zinc-400 focus:border-violet-400 focus:outline-none";
const labelClass = "text-sm font-semibold text-zinc-200";

export function CreatorForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const started = useRef(false);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackEvent("creator_form_start");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    const payload = {
      fullName: data.get("fullName"),
      email: data.get("email"),
      phone: data.get("phone"),
      desiredCompensation: data.get("desiredCompensation"),
      instagram: data.get("instagram"),
      tiktok: data.get("tiktok"),
      motivation: data.get("motivation"),
      audienceDescription: data.get("audienceDescription"),
      consent: data.get("consent") === "on",
      consentVersion: "creator-2026-09-29",
      companyWebsite: data.get("companyWebsite"),
      utmSource: params.get("utm_source") ?? "",
    };

    const parsed = creatorApplicationSchema.safeParse(payload);
    if (!parsed.success) {
      const errors = Object.fromEntries(
        parsed.error.issues.map((issue) => [
          String(issue.path[0]),
          issue.message,
        ]),
      );
      setState({
        status: "error",
        message: "Review the highlighted fields and try again.",
        errors,
      });
      requestAnimationFrame(() => {
        const field = form.querySelector<HTMLElement>("[aria-invalid='true']");
        const details = field?.closest("details");
        if (details) details.open = true;
        field?.focus();
      });
      return;
    }

    setState({ status: "submitting" });
    try {
      const response = await fetch("/api/creator-applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok)
        throw new Error(
          result.message || "We could not submit your application.",
        );
      form.reset();
      setState({
        status: "success",
        message:
          result.message ||
          "Your application is in. We’ll review it carefully.",
      });
      trackEvent("creator_submission");
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not submit your application.",
      });
    }
  }

  const errorFor = (field: string) => state.errors?.[field];

  if (state.status === "success") {
    return (
      <div
        className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-7"
        role="status"
      >
        <CheckCircle size={34} weight="fill" className="text-emerald-300" />
        <h2 className="display-text mt-5 text-4xl font-bold uppercase text-white">
          Application received.
        </h2>
        <p className="mt-3 max-w-xl leading-7 text-zinc-300">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      onFocus={markStarted}
      noValidate
      className="grid gap-6"
      aria-describedby="form-status"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Full name"
          name="fullName"
          error={errorFor("fullName")}
          required
          autoComplete="name"
        />
        <Field
          label="Email"
          name="email"
          error={errorFor("email")}
          required
          autoComplete="email"
          type="email"
          spellCheck={false}
        />
        <Field
          label="Instagram (optional)"
          name="instagram"
          error={errorFor("instagram")}
          autoComplete="off"
          spellCheck={false}
          placeholder="@handle or profile link…"
        />
        <Field
          label="TikTok (optional)"
          name="tiktok"
          error={errorFor("tiktok")}
          autoComplete="off"
          spellCheck={false}
          placeholder="@handle or profile link…"
        />
      </div>

      <TextArea
        label="What do you create, and who is it for?"
        name="motivation"
        error={errorFor("motivation")}
        placeholder="One or two sentences about your content, audience, and what you’d make with Revenge Arc"
      />
      <details className="rounded-xl border border-white/15 px-4">
        <summary className="flex min-h-12 cursor-pointer items-center text-sm font-semibold text-violet-200">
          More context (optional)
        </summary>
        <div className="grid gap-5 pb-5">
          <Field
            label="Phone (optional)"
            name="phone"
            error={errorFor("phone")}
            autoComplete="tel"
            type="tel"
          />
          <Field
            label="Compensation preferences (optional)"
            name="desiredCompensation"
            error={errorFor("desiredCompensation")}
            autoComplete="off"
            placeholder="Paid posts, affiliate, or discuss later…"
          />
          <label className={labelClass}>
            Audience details (optional)
            <textarea
              name="audienceDescription"
              className={`${inputClass} min-h-24 py-3`}
              maxLength={2500}
              placeholder="Any extra audience or content context…"
              aria-invalid={Boolean(errorFor("audienceDescription"))}
              aria-describedby={
                errorFor("audienceDescription")
                  ? "audienceDescription-error"
                  : undefined
              }
            />
            {errorFor("audienceDescription") && (
              <span
                id="audienceDescription-error"
                className="mt-2 block text-sm text-rose-300"
              >
                {errorFor("audienceDescription")}
              </span>
            )}
          </label>
        </div>
      </details>

      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label>
          Company website
          <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-zinc-300">
        <input
          name="consent"
          type="checkbox"
          className="mt-1 size-5 accent-violet-500"
          aria-invalid={Boolean(errorFor("consent"))}
          aria-describedby={errorFor("consent") ? "consent-error" : undefined}
        />
        <span>
          I’m 18 or older and consent to using this information to review my
          application. I have read the{" "}
          <a
            href="/privacy"
            className="text-violet-300 underline underline-offset-4"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="/creator-terms"
            className="text-violet-300 underline underline-offset-4"
          >
            Creator Terms
          </a>
          .
        </span>
      </label>
      {errorFor("consent") && (
        <p id="consent-error" className="text-sm text-rose-300">
          {errorFor("consent")}
        </p>
      )}

      <div id="form-status" aria-live="polite">
        {state.status === "error" && (
          <p className="flex items-center gap-2 rounded-xl border border-rose-400/25 bg-rose-400/[0.06] p-4 text-sm text-rose-200">
            <WarningCircle size={19} weight="fill" />
            {state.message}
          </p>
        )}
      </div>
      <PrimaryButton
        type="submit"
        disabled={state.status === "submitting"}
        className="w-full sm:w-fit"
      >
        {state.status === "submitting"
          ? "Sending application…"
          : "Submit application"}
      </PrimaryButton>
      <p className="text-xs leading-6 text-zinc-400">
        You’ll see confirmation here after submitting. We’ll contact you if
        there’s a fit. Applying does not guarantee acceptance or paid work.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  required,
  ...props
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${name}-error`;
  return (
    <label className={labelClass}>
      {label}
      {required && <span className="text-violet-300"> *</span>}
      <input
        {...props}
        className={inputClass}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span
          id={errorId}
          className="mt-2 block text-sm font-normal text-rose-300"
        >
          {error}
        </span>
      )}
    </label>
  );
}

function TextArea({
  label,
  name,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  error?: string;
  placeholder: string;
}) {
  const errorId = `${name}-error`;
  return (
    <label className={labelClass}>
      {label}
      <span className="text-violet-300"> *</span>
      <textarea
        className={`${inputClass} min-h-36 resize-y py-3`}
        name={name}
        required
        autoComplete="off"
        placeholder={`${placeholder}…`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span
          id={errorId}
          className="mt-2 block text-sm font-normal text-rose-300"
        >
          {error}
        </span>
      )}
    </label>
  );
}
