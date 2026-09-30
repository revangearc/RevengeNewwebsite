import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const lock = JSON.parse(
  await readFile(path.join(root, "package-lock.json"), "utf8"),
);
const sections = [
  "REVENGE ARC WEBSITE — THIRD-PARTY NOTICES",
  "Generated from this website’s package-lock.json. This is the website inventory, not the mobile app or backend inventory. Font licenses are included from their official Google Fonts sources.",
];
let count = 0;
for (const [location, entry] of Object.entries(lock.packages).sort(([a], [b]) =>
  a.localeCompare(b),
)) {
  if (!location || entry.dev || entry.link) continue;
  const directory = path.join(root, location);
  let metadata;
  try {
    metadata = JSON.parse(
      await readFile(path.join(directory, "package.json"), "utf8"),
    );
  } catch {
    if (entry.optional || entry.os || entry.cpu) {
      sections.push(
        `\n${location} ${entry.version}\nPlatform-dependent optional dependency, not installed in this inventory’s build environment. License metadata: ${JSON.stringify(entry.license || "Review required")}. If distributed in another build environment, include that package’s license text.`,
      );
      continue;
    }
    throw new Error(
      `Install the locked dependency before generating notices: ${location}`,
    );
  }
  const licenseFiles = (await readdir(directory)).filter((name) =>
    /^(licen[sc]e|copying|notice|copyright)(\.|$|-)/i.test(name),
  );
  const texts = [];
  for (const name of licenseFiles) {
    try {
      texts.push(
        `${name}\n${await readFile(path.join(directory, name), "utf8")}`,
      );
    } catch {
      /* Ignore directories with these names; do not guess their content. */
    }
  }
  sections.push(
    `\n${"=".repeat(72)}\n${metadata.name || location} ${entry.version}\nLicense metadata: ${JSON.stringify(metadata.license || entry.license || "Not declared; review required")}\n${texts.length ? texts.join("\n\n") : "No top-level license text found. Review upstream license and redistribution requirements."}`,
  );
  count++;
}
for (const family of ["barlowcondensed", "inter", "spacemono"]) {
  const url = `https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Font license unavailable: ${family}`);
  sections.push(
    `\n${"=".repeat(72)}\nFont: ${family}\nSource: ${url}\n${await response.text()}`,
  );
}
await writeFile(
  path.join(root, "public/website-third-party-notices.txt"),
  sections.join("\n\n"),
);
console.log(
  `Generated website notices for ${count} locked production packages and 3 font families. Mobile/native/backend notices still require a separate inventory.`,
);
