import Image from "next/image";
import { hasAdminAuthConfig } from "@/lib/env";
import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  const configured = hasAdminAuthConfig();
  return (
    <div className="grid min-h-svh place-items-center px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-white/15 bg-[#0a0810] p-6 shadow-[0_30px_100px_rgba(0,0,0,.6)] sm:p-8">
        <Image src="/assets/brand/ra-logo-3d.png" alt="Revenge Arc" width={64} height={64} className="h-16 w-16 object-contain" priority />
        <p className="utility-text mt-6 text-[0.65rem] text-violet-300">Private workspace</p>
        <h1 className="display-text mt-2 text-5xl font-bold uppercase text-white">Admin</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">Authorized Revenge Arc owners and administrators only.</p>
        {!configured && <p className="mt-6 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-4 text-sm leading-6 text-amber-100">Local Supabase variables are not configured yet. Add the values from <code>.env.example</code> to enable sign-in.</p>}
        <LoginForm />
      </section>
    </div>
  );
}
