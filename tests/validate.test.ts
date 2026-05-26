import { describe, it, expect } from "vitest";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { validateSkill, validateAllSkills } from "../src/validate.js";

const TMP_DIR = join(import.meta.dirname, ".tmp-skills");

function writePluginSkill(skillName: string, content: string) {
  const dir = join(TMP_DIR, skillName);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "SKILL.md"), content, "utf-8");
}

describe("validateSkill", () => {
  it("accepts a valid skill file", () => {
    const path = join(
      import.meta.dirname,
      "..",
      "skills",
      "code-review",
      "SKILL.md"
    );
    const result = validateSkill(path);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects a skill missing required frontmatter", () => {
    mkdirSync(TMP_DIR, { recursive: true });
    writePluginSkill("bad", "---\nname: bad\n---\nSome body content\n");
    const result = validateSkill(join(TMP_DIR, "bad", "SKILL.md"));
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Missing required frontmatter field: description"
    );
    rmSync(TMP_DIR, { recursive: true });
  });

  it("rejects a skill with empty body", () => {
    mkdirSync(TMP_DIR, { recursive: true });
    writePluginSkill("empty", "---\ndescription: test\n---\n");
    const result = validateSkill(join(TMP_DIR, "empty", "SKILL.md"));
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Skill body is empty");
    rmSync(TMP_DIR, { recursive: true });
  });
});

describe("validateAllSkills", () => {
  it("validates all skills in the skills directory", () => {
    const skillsDir = join(import.meta.dirname, "..", "skills");
    const results = validateAllSkills(skillsDir);
    expect(results.length).toBeGreaterThan(0);
    for (const result of results) {
      expect(result.valid).toBe(true);
    }
  });

  it("reports missing SKILL.md in a skill directory", () => {
    mkdirSync(join(TMP_DIR, "no-skill"), { recursive: true });
    const results = validateAllSkills(TMP_DIR);
    expect(results).toHaveLength(1);
    expect(results[0].valid).toBe(false);
    expect(results[0].errors[0]).toContain("Missing SKILL.md in");
    rmSync(TMP_DIR, { recursive: true });
  });
});
