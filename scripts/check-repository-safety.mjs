import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

// A focused publication guard, not a replacement for a full security audit.
// Findings report paths/rules only: never matched credential values.
const staged = process.argv.includes("--staged");
const args = staged
  ? ["diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z"]
  : ["ls-files", "--cached", "--others", "--exclude-standard", "-z"];
const files = execFileSync("git", args, { encoding: "utf8" })
  .split("\0")
  .filter(Boolean)
  .filter((file) => staged || existsSync(file));
const knownValues = [];
const protectedNames = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ANALYTICS_HASH_SECRET",
  "ADMIN_AUTH_EMAIL",
  "ADMIN_EMAIL_ALLOWLIST",
];
const localEnv = existsSync(".env.local")
  ? readFileSync(".env.local", "utf8")
  : "";
for (const name of protectedNames) {
  const line = localEnv
    .split(/\r?\n/)
    .find((line) => line.startsWith(`${name}=`));
  const raw = process.env[name] || line?.slice(name.length + 1) || "";
  const value = raw.trim().replace(/^(["'])(.*)\1$/, "$2");
  if (value.length >= 8) knownValues.push({ name, value });
}
const patterns = [
  ["private-key", /-----BEGIN (?:[A-Z]+ )*PRIVATE KEY-----/],
  [
    "github-token",
    /(?:github_pat_[A-Za-z0-9_]{30,}|gh[pousr]_[A-Za-z0-9]{30,})/,
  ],
  ["supabase-secret", /sb_secret_[A-Za-z0-9_-]{20,}/],
  ["cloud-access-key", /(?:AKIA|ASIA)[A-Z0-9]{16}/],
  ["AI-service-key", /sk-(?:proj-|ant-api\d{2}-)[A-Za-z0-9_-]{20,}/],
  ["credential-in-url", /https?:\/\/[^\s/@:]+:[^\s/@]+@/],
];
const forbidden =
  /(?:^|\/)(?:\.env(?!\.example$)[^/]*|\.netlify|\.next[^/]*|node_modules|\.ssh|\.credentials|secrets|exports|backups|id_rsa|id_ed25519)(?:\/|$)|\.(?:pem|key|p12|pfx|log)$/i;
const findings = [];
let inspected = 0;
for (const file of files) {
  if (forbidden.test(file))
    findings.push({ file, rule: "private-or-generated-file" });
  const bytes = staged
    ? execFileSync("git", ["show", `:${file}`], { maxBuffer: 25 * 1024 * 1024 })
    : readFileSync(file);
  if (bytes.includes(0)) continue;
  inspected++;
  const text = bytes.toString("utf8");
  for (const [rule, pattern] of patterns) {
    if (pattern.test(text)) findings.push({ file, rule });
  }
  for (const { name, value } of knownValues) {
    if (text.includes(value))
      findings.push({ file, rule: `literal-local-value:${name}` });
  }
  for (const match of text.matchAll(
    /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
  )) {
    try {
      const payload = JSON.parse(
        Buffer.from(match[0].split(".")[1], "base64url"),
      );
      if (payload.role === "service_role" || payload.role === "anon") {
        findings.push({ file, rule: "supabase-jwt-literal" });
      }
    } catch {
      // Not a decodable JWT; other token rules still apply.
    }
  }
  if (path.basename(file) === ".env.example") {
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (
        match &&
        match[2] &&
        !(
          match[1] === "NEXT_PUBLIC_SITE_URL" &&
          match[2] === "http://localhost:3000"
        )
      ) {
        findings.push({ file, rule: `populated-example:${match[1]}` });
      }
    }
  }
}
if (findings.length) {
  console.error(JSON.stringify({ status: "blocked", findings }, null, 2));
  process.exitCode = 1;
} else {
  console.log(
    `Repository publication guard passed: ${files.length} files (${inspected} text files). No matching credential findings.`,
  );
}
