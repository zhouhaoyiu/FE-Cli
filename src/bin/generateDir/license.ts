import { readFileSync } from "fs";
import path from "path";

export const licenseNames = ["MIT", "Apache-2.0", "GPL-3.0-only", "BSD-3-Clause", "ISC"] as const;
export function validateLicense(license: string): void {
  if (license && !(licenseNames as readonly string[]).includes(license)) {
    throw new Error(`Unsupported license: ${license}. Choose ${licenseNames.join(", ")}, or omit it.`);
  }
}
export function renderLicense(license: string, author: string): string {
  validateLicense(license);
  if (!license) return "";
  const template = readFileSync(path.join(__dirname, "licenses", `${license}.txt`), "utf8");
  const year = String(new Date().getFullYear());
  const owner = author.trim() || "Project contributors";
  return (
    template
      .replace(/<year>|\[year\]|\[yyyy\]/g, year)
      .replace(/<copyright holders>|<owner>|\[fullname\]|\[name of copyright owner\]/g, () => owner)
      .trimEnd() + "\n"
  );
}
