# my-agent-skills

A collection of reusable skills for Claude Code agents.

## Getting started

```bash
npm install
npm run build
```

## Usage

### Validate skills

```bash
npm run validate
```

### Run tests

```bash
npm test
```

### Add a new skill

Create a new `.md` file in `skills/` with the following format:

```markdown
---
name: my-skill
description: What the skill does
version: 0.1.0
tags: [optional, tags]
---

# My Skill

Instructions for the agent to follow when this skill is invoked.
```

## API

```typescript
import { validateSkill, validateAllSkills } from "my-agent-skills";

const result = validateSkill("skills/code-review.md");
// { valid: true, skill: "code-review", errors: [] }

const results = validateAllSkills("skills/");
// ValidationResult[]
```
