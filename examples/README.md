# AgentSpec Examples

This directory contains example projects demonstrating AgentSpec usage.

## Example 1: Simple Web App

A basic web application showing how to use AgentSpec for a small project.

### Structure

```
simple-web-app/
├── AGENTS.md
└── .agentspec/
    ├── version
    ├── project.md
    ├── instructions.md
    ├── eco/
    │   └── add-homepage/
    │       ├── details.md
    │       ├── plan.md
    │       ├── tests.md
    │       └── frontend/
    │           ├── spec.md
    │           └── tests.md
    ├── specs/
    ├── rules/
    │   └── agentspec.md
    └── workflows/
        └── *.md
```

### Workflow

1. Initialize AgentSpec
2. Create ECO for homepage
3. Plan the implementation
4. Implement the feature
5. Finish and merge

## Example 2: Full Stack Application

A more complex example with frontend, backend, and database components.

### Features Demonstrated

- Multiple specifications per ECO
- Database migrations
- API endpoints
- Frontend components
- Integration testing

## Example 3: Refactoring Project

Shows how to use AgentSpec for refactoring existing code.

### Features Demonstrated

- Using agentspec-refactor workflow
- Updating existing specifications
- Managing technical debt
- Performance improvements

## Running Examples

Each example directory contains:
- `README.md` - Specific instructions
- Initialized AgentSpec structure
- Sample ECOs at various stages

To try an example:

```bash
cd examples/simple-web-app
cat AGENTS.md  # Share with your agent
```

## Creating Your Own

Use these examples as templates:

1. Copy the structure
2. Modify `project.md` for your project
3. Add custom rules as needed
4. Start creating ECOs

## Contributing Examples

Have a great example? Contribute it!

1. Create a new directory in `examples/`
2. Initialize AgentSpec
3. Create sample ECOs
4. Add a README.md
5. Submit a PR
