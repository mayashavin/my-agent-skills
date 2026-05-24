# my-agent-skills

A collection of reusable skills for Claude Code agents.

## Project structure

- `skills/` — Skill definitions as markdown files with YAML frontmatter
- `src/` — TypeScript utilities for validating and managing skills
- `tests/` — Vitest test suite

## Commands

- `npm run build` — Compile TypeScript
- `npm test` — Run tests
- `npm run validate` — Validate all skill files in `skills/`
- `npm run lint` — Lint source and test files

## Skill format

Each skill is a `.md` file in `skills/` with required frontmatter:

```yaml
---
name: skill-name
description: What the skill does
version: 0.1.0
tags: [optional, tags]
---
```

The body contains the skill instructions in markdown.
