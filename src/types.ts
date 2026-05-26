export interface SkillFrontmatter {
  description: string;
  name?: string;
  version?: string;
  tags?: string[];
  author?: string;
}

export interface Skill {
  path: string;
  frontmatter: SkillFrontmatter;
  body: string;
}

export interface ValidationResult {
  valid: boolean;
  skill: string;
  errors: string[];
}
