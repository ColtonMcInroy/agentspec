# Contributing to AgentSpec

Thank you for your interest in contributing to AgentSpec!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/agentspec.git`
3. Install dependencies: `npm install`
4. Build the project: `npm run build`

## Development

### Project Structure

```
src/
├── cli.ts              # CLI entry point
├── index.ts            # Programmatic API
├── commands/           # Command implementations
│   ├── init.ts
│   ├── list.ts
│   ├── show.ts
│   ├── validate.ts
│   ├── finish.ts
│   ├── update.ts
│   └── view.ts
├── ui/                 # TUI components
│   └── AgentSpecTUI.tsx
├── utils/              # Utilities
│   ├── paths.ts
│   └── templates.ts
└── templates/          # Template files
    ├── AGENTS.md
    ├── project.md
    ├── instructions.md
    ├── rules/
    │   └── agentspec.md
    └── workflows/
        └── *.md
```

### Building

```bash
npm run build
```

### Testing Locally

After building, you can test the CLI locally:

```bash
node dist/cli.js init
```

Or link it globally:

```bash
npm link
agentspec init
```

## Making Changes

### Adding a New Command

1. Create a new file in `src/commands/`
2. Implement the command function
3. Export it from the file
4. Add it to `src/cli.ts`

### Modifying Templates

Templates are in `src/templates/`. After modifying:

1. Rebuild the project
2. Test with `agentspec init` in a test directory
3. Verify the template is deployed correctly

### Updating the TUI

The TUI is built with Ink (React for CLIs):

1. Edit `src/ui/AgentSpecTUI.tsx`
2. Follow React and Ink best practices
3. Test with `agentspec view`

## Code Style

- Use TypeScript
- Follow existing code style
- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and single-purpose

## Testing

Before submitting a PR:

1. Build the project: `npm run build`
2. Test all commands manually
3. Verify templates are correct
4. Check for TypeScript errors

## Submitting Changes

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit with clear messages
4. Push to your fork
5. Open a Pull Request

### PR Guidelines

- Describe what your PR does
- Reference any related issues
- Include examples if applicable
- Ensure the build passes

## Versioning

AgentSpec follows semantic versioning:

- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features, backwards compatible
- **Patch** (0.0.1): Bug fixes

## Questions?

Open an issue for:
- Bug reports
- Feature requests
- Questions about contributing
- General discussion

Thank you for contributing!
