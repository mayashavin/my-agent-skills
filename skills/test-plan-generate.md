---
name: test-plan-generate
description: Generate an automation-first test plan for the given feature with a focus on speed, accessibility, and reliability.
version: 0.1.0
---

# Test Plan Generate Skill

## Purposes

- Generate an automation-first test plan for the given feature with a focus on speed, accessibility, and reliability.

## Input

Required input:
- Feature name
- Feature description
- Requirements / acceptance criteria

Optional:
- Platform
- Existing test coverage
- Known risks
- Tech stack

## Operating mode:

1. Read only the feature description and requirements provided by the user.
2. Generate a concise, risk-based test plan.
3. Prefer representative tests over exhaustive enumeration.
4. Make assumptions explicit.
5. Do not create files or GitHub issues until the user approves the plan.

## Prioritization Rules

- Priority Status: P0 (Critical), P1 (High), P2 (Medium), P3 (Low).
- Prioritize tests based on:
  - customer impact
  - regression likelihood
  - integration complexity
  - accessibility/compliance risk
  - performance sensitivity

## Output Structure

### Test Quadrants (Q1 - Q4)

For each test quadrant, you should provide a list of test scenarios with the following structure:
```markdown
- [Test Scenario Name]
  - **Description**: [Test Scenario Description]
  - **Current Coverage Assumption**: [Missing / Unknown / Partial]
  - **Estimated Time**: [x] hours
  - **Comments**: [Comments]
  - **Test Cases**:

    | Test Case Name | Description | Expected Result | Automation Candidate | Priority | Comments |
    |---------------|---------------|---------------|---------------|---------------|---------------|
    | [Test Case Name] | [Test Case Description] | [Expected Result] | [Yes/No] | [P0/P1/P2/P3] | [Comments] |
```

List 5-10 representative test cases for each test scenario, not exhaustive. Below are quadrants descriptions:
- Q1 - Technical correctness: Unit tests (85% coverage + PR Blocking)
- Q2 - Business behavior: integration tests (critical integration points tested, PR Blocking)
- Q3 - Product confidence:
  - Q3.1: Visual regression tests (PR blocking on differences)
  - Q3.2: Accessibility tests (a11y audit, PR blocking)
  - Q3.3: Localization tests (no hardcoded text, PR blocking)
  - Q3.4: Critical E2E workflows (PR blocking)
- Q4 - System stability: performance tests
  - **Tier 1**: (Blocker for release) UI responsiveness, slow load times, errors, etc.
  - **Tier 2**: (Alerts) screen load time, error rate, etc.
  - **Tier 3**: (Monitoring) page load time, error rate, etc.

### Requirement Mapping

Map the test scenarios to the requirements of the feature.

```markdown
| Requirement | Test Quadrant | Automated? | PR Blocking? |
|-------------|---------------|------------|--------------|
| FR-1: [Requirement Name] | Q3 | ✅ | ✅ |
```

### Definition of Done

- [ ] Q1 - Coverage target: 85% for changed business logic, with meaningful assertions. Do not chase coverage on trivial code.
- [ ] Q3 - Automate stable critical flows. Keep exploratory/product judgment tests manual unless automation provides clear value.
- [ ] Q4 Tier 1 - 100% passed (Green)

### Key Tests (Critical Tests & Executable Specs)

Write 10-15 representative test specifications.

```markdown
[Q1] searchFiltering.spec.ts
  // Test filter by title, description, and tags
  // Assert that the filtered results are correct
```

### Optional Follow-up: GitHub Issues

After user approval, generate a list of GitHub issues for the given representative tests only (20-30 rows maximum, not all tests). Present the issues in a spreadsheet format for confirmation before proceeding to the next step. Ensure each issue is unique and not duplicate.

**Format:**
| Issue | Test | Test Description | Test Suite | Expected Result | Execution Type | Priority Status | 
|-------|------|-----------------|-------------|-----------------|----------------|-----------------|
| #1 | [Q1] searchFiltering.spec.ts | Test filter by title, description, and tags | Unit Test | The filtered results are correct | Manual | Low |

## Rules

- Test Suite: Group tests by the same quadrant.
- Execution Type: Manual or Automated.
- The generated test plan should be based on the feature description and the requirements.
- The generated test plan should be presented for review and approval before proceeding to the next step.
- Once the test plan is approved, and if file write access is available, save to: `docs/features/[feature-name]/test-plan-[feature-name].md`. Otherwise return markdown content.

### Critical Limits

- Write 12–18 representative test specifications.
  - Q1: 3–5
  - Q2: 3–5
  - Q3: 4–6
  - Q4: 2–3
- These tests should be representative of the feature and the most critical tests. User can expand the list if needed.

### Efficiency Rules

- Prefer user-provided context. Only inspect attached files when necessary.
- DO NOT generate excessive tests; only 12–18 representative examples.
- DO NOT generate 100+ issues, only 20-30 key issues.
- DO use templates - standard structure for test plans and issues.
- BE concise and to the point.

### Output Rules

- Target output: 150–300 lines.
- Key tests: 12–18 tests specs.
- Key issues: 20–30 issues.
- Focus: represent the test scenarios, not enumerate all tests.

## Success Criteria

👍 **Good** if:
  - All test quadrants are represented.
  - All instruction sections presented and followed.
  - Output is concise and actionable.

👎 **Bad** if:
  - Missing any critical sections.
  - Arbitrary or excessive output.
  - Output does not follow the rules.
  - Output is not representative of the feature and the most critical tests.
  - Output is not in the correct format.
  - Output is not within the critical limits.
