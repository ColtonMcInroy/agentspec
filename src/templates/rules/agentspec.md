---
trigger: glob
description: Core rules for working with AgentSpec projects
globs: **/*
---

# AgentSpec Rules

These rules must be followed when working with AgentSpec projects.

## Rule 1: Always Read Context First

Before starting any work:
1. Read `AGENTS.md`
2. Read `.agentspec/project.md`
3. Read `.agentspec/instructions.md`
4. Read all files in `.agentspec/rules/`
5. Read the relevant ECO files if working on an ECO

## Rule 2: Work Within the ECO Framework

- All development work must be organized into Engineering Change Orders
- Do not make changes outside of an active ECO
- If no ECO exists for the work, collaborate with the user to create one

## Rule 3: Follow the Approval Process

- Do not create `plan.md`, `tests.md`, or spec files until the user approves `details.md`
- Do not begin implementation until planning is complete
- Get user confirmation before marking an ECO as complete

## Rule 4: Maintain Task Tracking

- Update task checkboxes in `plan.md` as work progresses
- Mark tasks as complete (`[x]`) only when fully implemented and tested
- Keep the plan up-to-date if scope changes

## Rule 5: Write Clear Specifications

- Specifications must be technical and implementable
- Include enough detail that another agent could implement from the spec alone
- Use consistent formatting and structure
- Reference relevant files, functions, and components

## Rule 6: Create Meaningful Tests

- Tests must validate the actual requirements, not just pass
- Include both positive and negative test cases
- Specify expected inputs and outputs
- Make tests reproducible

## Rule 7: Preserve Context

- Update specifications when implementation details change
- Document decisions and rationale in appropriate files
- Keep ECO details focused on the "what" and "why", not the "how"

## Rule 8: Use Descriptive Names

- ECO names should clearly indicate what is being changed
- Spec names should reflect the component or subsystem
- Use kebab-case for directory names (e.g., `user-authentication`)

## Rule 9: One Concern Per ECO

- Each ECO should address a single feature, bug, or improvement
- If work spans multiple concerns, create multiple ECOs
- Link related ECOs in their details files if needed

## Rule 10: Validate Before Finishing

- Run all tests before marking an ECO complete
- Verify all tasks in `plan.md` are checked off
- Ensure specifications are up-to-date
- Confirm with the user that the ECO meets requirements

## Rule 11: Run Commands When Necessary

- Run CLI commands when they are part of a workflow or necessary for the task
- Use safe execution mode (confirm with user) for potentially destructive commands
- Run `agentspec update` after creating or modifying custom rules/workflows to sync to `.windsurf/`
- Run build, test, and validation commands as needed during implementation

## Rule 12: Handle Errors Gracefully

- If you encounter missing files, explain what's missing and why
- If you're unsure about requirements, ask clarifying questions
- If you make a mistake, acknowledge it and correct it

## Rule 13: Complete ECOs Systematically

- When implementing an ECO, work through ALL phases and tasks to completion
- Don't stop after completing just a few tasks - continue until the entire ECO is done
- Complete each phase before moving to the next
- After completing all tasks, run tests and verify the implementation
- Always check with the user for verification before considering an ECO complete
- Don't introduce unrelated changes outside the ECO scope

## Rule 14: Documentation Protocols

**Project-Level Documentation:**
- Keep project root clean with only standard documents: `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`
- Store all other project documentation in `docs/` folder
- Organize documentation logically with clear structure

**ECO-Specific Documentation:**
- Store ECO-specific documentation in `.agentspec/eco/{eco-name}/docs/`
- Include design decisions, architecture diagrams, API documentation, etc.
- Keep ECO docs focused on the specific change

**Documentation Lifecycle:**
- During ECO implementation: Create and update ECO-specific docs in `.agentspec/eco/{eco-name}/docs/`
- When ECO is finished: Analyze ECO docs and update main project documentation in `docs/`
- Extract relevant information that should persist in project documentation
- Archive ECO-specific docs with the finished ECO in `.agentspec/finished-eco/`

## Rule 15: Communicate Progress

- Provide regular updates on what you're doing
- Reference specific files and tasks
- Explain your reasoning for technical decisions

## Rule 16: Respect Project Conventions

- Follow the coding standards defined in `project.md`
- Use the project's existing patterns and structures
- Maintain consistency with existing code
