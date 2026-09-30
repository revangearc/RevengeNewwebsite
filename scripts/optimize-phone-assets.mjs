import sharp from "sharp";

// Keep the original captures. These static variants avoid first-request image processing.
for (const name of ["home", "train", "fuel", "adapt", "connect", "prove"]) {
  const stem = `public/assets/app-screens/${name}`;
  for (const width of [360, 640, 853]) {
    const result = await sharp(`${stem}.png`).resize({ width }).webp({ quality: 85 }).toFile(`${stem}-${width}.webp`);
    console.log(`${name} ${width}px: ${Math.round(result.size / 1024)} KB`);
  }
  await sharp(`${stem}.png`).resize({ width: 32 }).webp({ quality: 40 }).toFile(`${stem}-preview.webp`);
}
await sharp("public/assets/brand/ra-logo-3d.png").resize(168, 168, { fit: "inside" }).webp({ quality: 90 }).toFile("public/assets/brand/ra-logo-header.webp");
