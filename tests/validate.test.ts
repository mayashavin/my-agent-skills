import { describe, it, expect } from "vitest";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { validateSkill, validateAllSkills } from "../src/validate.js";

const TMP_DIR = join(import.meta.dirname, ".tmp-skills");

function writeSkill(name: string, content: string) {
  writeFileSync(join(TMP_DIR, name), content, "utf-8");
}

describe("validateSkill", () => {
  it("accepts a valid skill file", () => {
    const path = join(import.meta.dirname, "..", "skills", "code-review.md");
    const result = validateSkill(path);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects a skill missing required frontmatter", () => {
    mkdirSync(TMP_DIR, { recursive: true });
    writeSkill("bad.md", "---\nname: bad\n---\nSome body content\n");
    const result = validateSkill(join(TMP_DIR, "bad.md"));
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Missing required frontmatter field: description"
    );
    rmSync(TMP_DIR, { recursive: true });
  });

  it("rejects a skill with empty body", () => {
    mkdirSync(TMP_DIR, { recursive: true });
    writeSkill(
      "empty.md",
      "---\nname: empty\ndescription: test\nversion: 0.1.0\n---\n"
    );
    const result = validateSkill(join(TMP_DIR, "empty.md"));
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
});
