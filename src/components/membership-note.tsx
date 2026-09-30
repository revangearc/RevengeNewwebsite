import { TRIAL_DISCLOSURE } from "@/content/membership";

export function MembershipNote() {
  return (
    <p className="membership-note">
      {TRIAL_DISCLOSURE} Manage or cancel in Apple subscription settings.
      Deleting the app or your account does not cancel billing.
    </p>
  );
}
