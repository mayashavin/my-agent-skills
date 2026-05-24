---
name: code-review
description: Review code changes for correctness, style, and potential issues
version: 0.1.0
tags: [review, quality]
---

# Code Review

Review the provided code changes and provide feedback on:

1. **Correctness** - Does the code do what it's supposed to do? Are there logic errors, off-by-one bugs, or missing edge cases?
2. **Security** - Are there any security vulnerabilities (injection, XSS, auth issues)?
3. **Performance** - Are there obvious performance problems (N+1 queries, unnecessary allocations, missing indexes)?
4. **Readability** - Is the code clear and maintainable? Are names descriptive?

## Output format

For each finding, report:
- **File and line**: where the issue is
- **Severity**: critical / warning / suggestion
- **Description**: what the problem is and how to fix it

Keep feedback actionable. Don't flag style nitpicks unless they hurt readability.
