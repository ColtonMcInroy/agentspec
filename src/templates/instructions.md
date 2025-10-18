# AgentSpec Instructions

## Overview

AgentSpec is a structured approach to agentic development that uses Engineering Change Orders (ECOs) to organize work. This document explains how to interact with AgentSpec files and use the CLI tool.

## File Structure

### Root Level
- **`AGENTS.md`** - README for agents (you should have already read this)
- **`.agentspec/`** - All AgentSpec files live here

### `.agentspec/` Contents
- **`version`** - Current AgentSpec version
- **`project.md`** - Project context and overview
- **`instructions.md`** - This file
- **`eco/`** - Active Engineering Change Orders
- **`finished-eco/`** - Completed ECOs (archived)
- **`specs/`** - Current project specifications
- **`rules/`** - Development rules
- **`workflows/`** - Workflow definitions

## Engineering Change Orders (ECOs)

### ECO Lifecycle

1. **Creation** - User runs `agentspec new-eco` workflow
2. **Planning** - Collaborate with user to create `details.md`
3. **Approval** - User approves details
4. **Specification** - Create `plan.md`, `tests.md`, and spec files
5. **Implementation** - Execute the plan
6. **Validation** - Run tests to verify completion
7. **Completion** - Merge specs and archive ECO

### ECO Structure

```
.agentspec/eco/{eco-name}/
├── details.md              # What and why
├── plan.md                 # Phases and tasks (created after approval)
├── tests.md                # Overall tests (created after approval)
└── {spec-name}/           # One or more specifications
    ├── spec.md            # Technical specification
    └── tests.md           # Specification tests
```

## Working with ECOs

### Reading ECO Files

Always read ECO files in this order:
1. `details.md` - Understand the goal
2. `plan.md` - See the phases and tasks
3. `{spec-name}/spec.md` - Review technical specifications
4. `{spec-name}/tests.md` - Understand validation criteria

### Updating ECO Files

- **During Planning** - Only `details.md` exists; collaborate with user to refine it
- **After Approval** - Create `plan.md`, `tests.md`, and spec directories
- **During Implementation** - Update task checkboxes in `plan.md` as you complete them
- **During Refactoring** - Update relevant spec files to reflect changes

### Task Format

Tasks in `plan.md` must use markdown checkboxes:

```markdown
## Phase 1: Setup
- [ ] Task 1
- [ ] Task 2
- [x] Task 3 (completed)

## Phase 2: Implementation
- [ ] Task 4
```

## Using AgentSpec CLI

The user can run these commands:

- **`agentspec init`** - Initialize AgentSpec in a project
- **`agentspec finish {eco-name}`** - Complete and archive an ECO
- **`agentspec list`** - List active ECOs
- **`agentspec list --specs`** - List current specifications
- **`agentspec view`** - Open interactive TUI
- **`agentspec validate {eco-name}`** - Validate ECO can be merged
- **`agentspec show {eco-name}`** - Display ECO details
- **`agentspec update`** - Update AgentSpec files to latest version

You should NOT run these commands yourself. The user will run them when needed.

## Specifications

### Specification Structure

Specifications live in `.agentspec/specs/{spec-name}/`:
- **`spec.md`** - Technical specification
- **`tests.md`** - Validation tests

### When to Create New Specs vs. Use Existing

- **New Spec** - When working on a new component, feature, or subsystem
- **Existing Spec** - When modifying or extending existing functionality

Common spec names:
- `frontend` - Frontend application
- `backend` - Backend API
- `database` - Database schema
- `infrastructure` - Deployment/infrastructure
- `{feature-name}` - Specific features or modules

## Rules

Rules in `.agentspec/rules/*.md` define development standards and constraints. Always follow these rules:

1. Read all rule files before starting work
2. Apply rules consistently throughout development
3. If rules conflict with user requests, clarify with the user
4. Suggest new rules when patterns emerge

### Creating and Configuring Rules

Rules are synced to `.windsurf/rules/` for IDE integration. Each rule file should have a YAML frontmatter configuration header:

```yaml
---
trigger: [manual | always_on | model_decision | glob]
description: Description of when and how to apply this rule
globs: pattern1, pattern2, pattern3
---
```

**Trigger Options:**
- **`manual`** - User must manually reference this rule for it to be active
- **`always_on`** - Rule is ALWAYS loaded into the system prompt
- **`model_decision`** - Model reads the description to determine if rule should be loaded
- **`glob`** - Rule is loaded when accessing any content matching the glob patterns

**Configuration Fields:**
- **`trigger`** (required) - One of the trigger options above
- **`description`** (required for `model_decision`) - Description for the agent to determine when to use this rule
- **`globs`** (required for `glob` trigger) - Comma-separated list of glob patterns (e.g., `src/**/*.ts, tests/**/*.test.ts`)

**Example Rule Configurations:**

```yaml
# Always active rule
---
trigger: always_on
description: Core development standards that always apply
---

# Context-aware rule
---
trigger: model_decision
description: Apply when working with database migrations or schema changes
---

# File-pattern rule
---
trigger: glob
description: Frontend component development standards
globs: src/components/**/*.tsx, src/pages/**/*.tsx
---
```

### Custom Rules for Your Project

The `agentspec.md` rule should not be modified except during `agentspec update`. Create additional custom rules for your project:

- **Technology-specific rules** - Standards for React, TypeScript, Python, etc.
- **Architecture rules** - Patterns for your specific architecture
- **Domain rules** - Business logic constraints
- **Team conventions** - Code style, naming, structure

Use the `agentspec-manage-context` workflow to create, update, or remove custom rules as your project evolves.

## Workflows

Workflows in `.agentspec/workflows/*.md` define step-by-step processes. When a user references a workflow:

1. Read the entire workflow file
2. Follow each step in order
3. Collaborate with the user at decision points
4. Update relevant files as specified in the workflow

### Creating and Configuring Workflows

Workflows are synced to `.windsurf/workflows/` for IDE integration. Each workflow file should have a YAML frontmatter configuration header:

```yaml
---
description: Brief description of what this workflow does
auto_execution_mode: [1 | 3]
---
```

**Configuration Fields:**
- **`description`** (required) - Brief description shown to user when choosing a workflow
- **`auto_execution_mode`** (required) - Execution safety level:
  - **`1`** - Safe mode: Confirm with user before running any commands
  - **`3`** - Turbo mode: Run commands without user confirmation

**Example Workflow Configurations:**

```yaml
# Safe mode workflow (recommended for most workflows)
---
description: Create and configure a new React component
auto_execution_mode: 1
---

# Turbo mode workflow (for repetitive, safe operations)
---
description: Run linting and formatting checks
auto_execution_mode: 3
---
```

### Custom Workflows for Your Project

The `agentspec-*` workflows should not be modified except during `agentspec update`. Create additional custom workflows for your project:

- **Setup workflows** - Environment setup, dependency installation
- **Development workflows** - Component creation, API endpoint creation
- **Testing workflows** - Running tests, generating test reports
- **Deployment workflows** - Build, deploy, release processes
- **Maintenance workflows** - Database migrations, cleanup tasks

Use the `agentspec-manage-context` workflow to create, update, or remove custom workflows as your project evolves.

## Best Practices

### Context Management
- Always read relevant AgentSpec files before starting work
- Reference specific ECOs, specs, and rules in your responses
- Keep ECO details focused and actionable

### Collaboration
- Clarify requirements during the planning phase
- Get user approval before moving from planning to implementation
- Provide regular progress updates by referencing task checkboxes

### Quality
- Write specifications that are clear and implementable
- Create tests that validate the actual requirements
- Update documentation as the project evolves

### Organization
- Keep ECOs focused on a single change or feature
- Break large changes into multiple ECOs if needed
- Use descriptive names for ECOs and specs

## Troubleshooting

### If Context is Lost
1. Read `AGENTS.md`
2. Read `.agentspec/project.md`
3. Read active ECO files
4. Read relevant specs

### If Unsure What to Do
1. Ask the user which workflow to follow
2. Ask which ECO to work on
3. Read the ECO details to understand the goal

### If Files are Missing
- The project may not be initialized - user should run `agentspec init`
- The ECO may not be approved yet - only `details.md` exists during planning
- Check if you're looking in the right directory

## Version

This instructions file is for AgentSpec v1.0.0
