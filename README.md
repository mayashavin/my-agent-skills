# Ariyu - Agent Skills

A collection of reusable skills for Claude Code agents.

## Installation

### As a Claude Code plugin

```
/plugin marketplace add mayashavin/my-agent-skills
/plugin install ariyu@my-agent-skills
```

Skills are then available as `/ariyu:code-review`, `/ariyu:test-plan-generate`, etc.

### As standalone skills (no prefix)

To use skills without the plugin prefix (e.g., `/test-plan-generate`), copy the skill directory into your project:

```bash
cp -r skills/test-plan-generate .claude/skills/
```

## Available skills

| Skill | Description |
|-------|-------------|
| `code-review` | Review code changes for correctness, style, and potential issues |
| `test-plan-generate` | Generate an automation-first test plan for a given feature |

## Development

### Setup

```bash
npm install
npm run build
```

### Validate skills

```bash
npm run validate
```

### Run tests

```bash
npm test
```

### Add a new skill

Create a new directory in `skills/` with a `SKILL.md` file:

```
skills/my-skill/
└── SKILL.md
```

The `SKILL.md` file requires a `description` in the frontmatter:

```markdown
---
description: What the skill does
---

Instructions for the agent to follow when this skill is invoked.
```

### API

```typescript
import { validateSkill, validateAllSkills } from "ariyu";

const result = validateSkill("skills/code-review/SKILL.md");
// { valid: true, skill: "code-review", errors: [] }

const results = validateAllSkills("skills/");
// ValidationResult[]
```
