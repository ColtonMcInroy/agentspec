# Agent Instructions

This project uses **AgentSpec** for guided agentic development. AgentSpec helps maintain context and structure throughout the development process.

## Essential Files to Read

Before starting any work, you should read the following files in order:

1. **`.agentspec/project.md`** - Contains high-level project context, structure, and tech stack
2. **`.agentspec/instructions.md`** - Contains detailed instructions on how to use AgentSpec
3. **`.agentspec/rules/*.md`** - Contains rules that must be followed during development

## Working with Engineering Change Orders (ECOs)

All development work should be organized into Engineering Change Orders (ECOs). Each ECO represents a discrete unit of work with:

- **Details** - What needs to be done and why
- **Plan** - Phases and tasks to complete the work
- **Specifications** - Technical specifications for implementation
- **Tests** - Validation criteria for completion

## AgentSpec Workflows

When the user initiates work, they may reference specific workflows:

- **`agentspec-new-eco`** - Creating a new Engineering Change Order
- **`agentspec-plan`** - Planning or updating an ECO
- **`agentspec-implement`** - Implementing an ECO
- **`agentspec-troubleshoot`** - Debugging and fixing issues
- **`agentspec-refactor`** - Refactoring existing ECO work
- **`agentspec-finish`** - Completing and archiving an ECO
- **`agentspec-manage-context`** - Managing custom rules and workflows for the project

Read the corresponding workflow file in `.agentspec/workflows/` when referenced.

**Note:** Custom rules and workflows specific to this project may also exist. Use the `agentspec-manage-context` workflow to create, update, or remove them as the project evolves.

## Key Principles

1. **Maintain Context** - Always reference relevant AgentSpec files to understand project state
2. **Follow Structure** - Work within the ECO framework to keep changes organized
3. **Document Changes** - Update specifications and plans as work progresses
4. **Validate Work** - Use defined tests to ensure quality
5. **Collaborate** - Work with the user to refine details before implementation

## Getting Started

If you're unsure what to do, ask the user which workflow they'd like to follow or what ECO they'd like to work on.
