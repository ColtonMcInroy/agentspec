# AgentSpec

A tool for enhancing guided agentic development with structured specifications and workflows.

> **⚠️ Development Status:** This project is currently under active development and is recommended for testing purposes only. APIs and workflows may change between versions.

## Overview

AgentSpec solves the problem of context loss and lack of structure in AI-assisted development. Unlike "vibe coding" or basic spec-driven approaches, AgentSpec provides:

- **Structured Engineering Change Orders (ECOs)** - Organize all work into discrete, trackable units
- **Persistent Context** - Maintain project knowledge across conversations
- **Guided Workflows** - Step-by-step processes for planning, implementing, and completing work
- **Specification Management** - Keep technical specs and tests organized and up-to-date
- **Agent Instructions** - Provide clear, consistent guidance to AI agents

## Installation

Install globally via npm:

```bash
npm install -g agentspec
```

## Quick Start

### 1. Initialize AgentSpec in Your Project

```bash
cd your-project
agentspec init
```

AgentSpec automatically detects whether you're working with a fresh or existing project and enters **onboarding mode**.

**Fresh Projects:** Work with your agent using the `agentspec-setup-fresh-project` workflow to define your project vision, choose technologies, and plan architecture.

**Existing Projects:** Work with your agent using the `agentspec-setup-existing-project` workflow to analyze and document your current codebase.

### 2. Complete Setup with Your Agent

Collaborate with your agent to populate `.agentspec/project.md` with comprehensive project details. The agent will guide you through the appropriate setup workflow based on your project type.

### 3. Finalize Setup

Once `project.md` is complete, have your agent run the `agentspec-finalize-setup` workflow, which executes `agentspec finalize` to:

- Remove onboarding files
- Deploy production AgentSpec rules and workflows
- Transition to ECO-based development mode

### 4. Create Your First ECO

Now in production mode, have your agent follow the `agentspec-new-eco` workflow to create your first Engineering Change Order.

## CLI Commands

### `agentspec init`

Initialize AgentSpec in the current directory. Automatically detects project type (fresh or existing) and deploys appropriate onboarding files.

```bash
agentspec init
```

### `agentspec finalize`

Finalize AgentSpec setup and transition from onboarding mode to production mode. Removes onboarding files and deploys production rules and workflows.

```bash
agentspec finalize
```

**Note:** This command is typically run via the `agentspec-finalize-setup` workflow after completing `project.md`.

### `agentspec list`

List active Engineering Change Orders.

```bash
agentspec list
```

List current specifications:

```bash
agentspec list --specs
```

### `agentspec show <eco-name>`

Display the details of an ECO.

```bash
agentspec show add-user-authentication
```

### `agentspec validate <eco-name>`

Validate that an ECO is ready to be finished.

```bash
agentspec validate add-user-authentication
```

### `agentspec finish <eco-name>`

Complete an ECO by merging specifications and archiving.

```bash
agentspec finish add-user-authentication
```

### `agentspec view`

Open an interactive TUI for browsing ECOs and specifications.

```bash
agentspec view
```

Use arrow keys to navigate, Enter to select, ESC to go back, Q to quit.

### `agentspec update`

Update AgentSpec files to the latest version.

```bash
agentspec update
```

## Concepts

### Onboarding Mode

When you first run `agentspec init`, AgentSpec enters **onboarding mode** to help establish a solid project foundation:

**Fresh Projects:**

- Deploys `agentspec-onboarding-fresh.md` rule
- Provides `agentspec-setup-fresh-project` workflow
- Guides you to define project vision, choose technologies, and plan architecture
- Helps establish development standards from the start

**Existing Projects:**

- Deploys `agentspec-onboarding-existing.md` rule
- Provides `agentspec-setup-existing-project` workflow
- Analyzes your codebase, documentation, and configuration
- Documents current state and identifies improvement opportunities

After completing `project.md`, run the `agentspec-finalize-setup` workflow to transition to production mode with full ECO-based development capabilities.

### Engineering Change Orders (ECOs)

An ECO is a discrete unit of work with:

- **Details** (`details.md`) - What needs to be done and why
- **Plan** (`plan.md`) - Phases and tasks with checkboxes
- **Tests** (`tests.md`) - Validation criteria
- **Specifications** - Technical specs for each affected component

### ECO Lifecycle

1. **Creation** - Define what needs to be done
2. **Planning** - Break down into tasks and create specs
3. **Implementation** - Execute the plan
4. **Validation** - Run tests and verify completion
5. **Finishing** - Merge specs and archive the ECO

### Specifications

Specifications are organized by component or subsystem:

- `frontend/` - Frontend application specs
- `backend/` - Backend API specs
- `database/` - Database schema specs
- Custom specs for features or modules

Each spec contains:
- `spec.md` - Technical specification
- `tests.md` - Validation tests

### Workflows

AgentSpec includes workflows for different phases:

**Onboarding Workflows:**

- **agentspec-setup-fresh-project** - Setup a new project from scratch
- **agentspec-setup-existing-project** - Document an existing project
- **agentspec-finalize-setup** - Transition to production mode

**Production Workflows:**

- **agentspec-new-eco** - Create a new ECO
- **agentspec-plan** - Plan an ECO
- **agentspec-implement** - Implement an ECO
- **agentspec-troubleshoot** - Debug issues
- **agentspec-refactor** - Refactor within an ECO
- **agentspec-finish** - Complete an ECO
- **agentspec-manage-context** - Manage custom rules and workflows

## File Structure

```
your-project/
├── AGENTS.md                           # Agent instructions
└── .agentspec/
    ├── version                         # AgentSpec version
    ├── project.md                      # Project context
    ├── instructions.md                 # How to use AgentSpec
    ├── eco/                            # Active ECOs
    │   └── {eco-name}/
    │       ├── details.md              # ECO details
    │       ├── plan.md                 # Implementation plan
    │       ├── tests.md                # Overall tests
    │       └── {spec-name}/            # Specifications
    │           ├── spec.md             # Technical spec
    │           └── tests.md            # Spec tests
    ├── finished-eco/                   # Completed ECOs
    │   └── {YYYY-MM-DD-eco-name}/      # Archived ECOs
    ├── specs/                          # Current specifications
    │   └── {spec-name}/
    │       ├── spec.md                 # Specification
    │       └── tests.md                # Tests
    ├── rules/                          # Development rules
    │   ├── agentspec.md                # AgentSpec rules
    │   └── {custom-rules}.md           # Your custom rules
    └── workflows/                      # Workflow definitions
        ├── agentspec-new-eco.md
        ├── agentspec-plan.md
        ├── agentspec-implement.md
        ├── agentspec-troubleshoot.md
        ├── agentspec-refactor.md
        └── agentspec-finish.md
```

## Working with AI Agents

### Initial Setup

1. Initialize AgentSpec in your project
2. Configure `project.md` with project details
3. Share `AGENTS.md` with your agent
4. The agent will read the necessary context files

### Creating an ECO

Tell your agent: "Follow the agentspec-new-eco workflow to add user authentication"

The agent will:
1. Ask clarifying questions
2. Create an ECO directory
3. Draft `details.md`
4. Collaborate with you to refine it
5. Wait for your approval

### Planning an ECO

After approving details, tell your agent: "Follow the agentspec-plan workflow"

The agent will:
1. Identify affected specifications
2. Create spec directories and files
3. Write technical specifications
4. Define tests
5. Create an implementation plan

### Implementing an ECO

Tell your agent: "Follow the agentspec-implement workflow"

The agent will:
1. Work through the plan phase by phase
2. Update task checkboxes as work completes
3. Run tests after each phase
4. Keep you informed of progress

### Finishing an ECO

When implementation is complete, run:

```bash
agentspec finish eco-name
```

This will:
1. Validate the ECO
2. Merge specifications
3. Archive the ECO
4. Update your project specs

## Best Practices

### For Users

- **Keep ECOs focused** - One feature or fix per ECO
- **Review details carefully** - Ensure clarity before planning
- **Track progress** - Check task completion regularly
- **Validate before finishing** - Run `agentspec validate` first

### For AI Agents

- **Read context first** - Always read `AGENTS.md`, `project.md`, and relevant files
- **Follow workflows** - Use the defined workflows for consistency
- **Update as you go** - Check off tasks in `plan.md` as you complete them
- **Communicate clearly** - Reference specific files and tasks
- **Maintain quality** - Write clear specs and meaningful tests

## Customization

### Adding Custom Rules

Create new rule files in `.agentspec/rules/`:

```bash
touch .agentspec/rules/coding-standards.md
```

Rules are automatically included in the agent's context.

### Adding Custom Workflows

Create new workflow files in `.agentspec/workflows/`:

```bash
touch .agentspec/workflows/custom-workflow.md
```

Reference them by name when working with agents.

## Troubleshooting

### AgentSpec not initialized

**Error:** "AgentSpec is not initialized in this directory"

**Solution:** Run `agentspec init` in your project root

### ECO not found

**Error:** "ECO does not exist"

**Solution:** Run `agentspec list` to see available ECOs

### Validation errors

**Error:** ECO validation fails

**Solution:** 
1. Run `agentspec validate eco-name` to see specific issues
2. Fix the reported errors
3. Validate again before finishing

### Agent loses context

**Solution:**
1. Have the agent read `AGENTS.md`
2. Have the agent read `.agentspec/project.md`
3. Have the agent read the relevant ECO files

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the documentation in `.agentspec/instructions.md`
- Review the workflow files in `.agentspec/workflows/`

## Version

Current version: 1.0.0
