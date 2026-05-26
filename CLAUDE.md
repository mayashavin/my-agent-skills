# Ariyu - Agent Skills

A Claude Code plugin providing reusable skills for AI agents.

## Project structure

- `.claude-plugin/` — Plugin manifest and marketplace config
- `skills/` — Skill definitions as `skills/<name>/SKILL.md`
- `src/` — TypeScript utilities for validating and managing skills
- `tests/` — Vitest test suite

## Commands

- `npm run build` — Compile TypeScript
- `npm test` — Run tests
- `npm run validate` — Validate all skill files in `skills/`
- `npm run lint` — Lint source and test files

## Skill format

Each skill is a `SKILL.md` file inside `skills/<skill-name>/` with required frontmatter:

```yaml
---
description: What the skill does
---
```

The body contains the skill instructions in markdown.
