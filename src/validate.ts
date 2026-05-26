import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, basename, resolve } from "node:path";
import type { Skill, SkillFrontmatter, ValidationResult } from "./types.js";

const REQUIRED_FIELDS: (keyof SkillFrontmatter)[] = ["description"];

function parseFrontmatter(content: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatter: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    frontmatter[key] = value;
  }

  return { frontmatter, body: match[2] };
}

export function validateSkill(filePath: string): ValidationResult {
  const errors: string[] = [];
  const content = readFileSync(filePath, "utf-8");
  const { frontmatter, body } = parseFrontmatter(content);

  for (const field of REQUIRED_FIELDS) {
    if (!frontmatter[field]) {
      errors.push(`Missing required frontmatter field: ${field}`);
    }
  }

  if (!body.trim()) {
    errors.push("Skill body is empty");
  }

  const skillName =
    (frontmatter.name as string) ?? basename(dirname(filePath));

  return {
    valid: errors.length === 0,
    skill: skillName,
    errors,
  };
}

export function validateAllSkills(
  skillsDir: string = resolve("skills")
): ValidationResult[] {
  const entries = readdirSync(skillsDir);
  const results: ValidationResult[] = [];

  for (const entry of entries) {
    const entryPath = join(skillsDir, entry);
    if (statSync(entryPath).isDirectory()) {
      const skillFile = join(entryPath, "SKILL.md");
      try {
        const stat = statSync(skillFile);
        if (!stat.isFile()) {
          results.push({
            valid: false,
            skill: entry,
            errors: [`${join(entry, "SKILL.md")} exists but is not a file`],
          });
          continue;
        }
        results.push(validateSkill(skillFile));
      } catch {
        results.push({
          valid: false,
          skill: entry,
          errors: [`Missing SKILL.md in ${join(skillsDir, entry)}/`],
        });
      }
    }
  }

  return results;
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1])) {
  const results = validateAllSkills();
  let hasErrors = false;

  for (const result of results) {
    if (result.valid) {
      console.log(`  ${result.skill}: valid`);
    } else {
      hasErrors = true;
      console.error(`  ${result.skill}: INVALID`);
      for (const err of result.errors) {
        console.error(`    - ${err}`);
      }
    }
  }

  process.exit(hasErrors ? 1 : 0);
}
