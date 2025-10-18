# Development Guide

Guide for developers working on AgentSpec.

## Setup

### Prerequisites

- Node.js >= 16.0.0
- npm >= 7.0.0
- TypeScript knowledge
- Familiarity with CLI tools

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd AgentSpec

# Install dependencies
npm install

# Build the project
npm run build
```

### Development Workflow

```bash
# Watch mode for development
npm run dev

# Build for production
npm run build

# Link for local testing
npm link

# Test the CLI
agentspec --help
agentspec init
```

## Project Architecture

### Directory Structure

```
src/
├── cli.ts              # CLI entry point with Commander.js
├── index.ts            # Programmatic API exports
├── commands/           # Command implementations
├── ui/                 # Ink TUI components
├── utils/              # Shared utilities
└── templates/          # Template files
```

### Key Concepts

**Commands** - Each CLI command is a separate module in `src/commands/`
- Handles user input
- Validates state
- Performs operations
- Provides feedback

**Paths** - The `AgentSpecPaths` class manages all file paths
- Centralizes path logic
- Provides validation methods
- Ensures consistency

**Templates** - Markdown files deployed during initialization
- Stored in `src/templates/`
- Copied to user projects
- Can be updated via `agentspec update`

**TUI** - Interactive interface built with Ink
- React components for CLI
- State management with hooks
- Keyboard navigation

## Adding Features

### Adding a New Command

1. **Create command file** in `src/commands/`:

```typescript
// src/commands/mycommand.ts
import chalk from 'chalk';
import { AgentSpecPaths } from '../utils/paths';

export async function myCommand(arg: string): Promise<void> {
  const paths = new AgentSpecPaths();
  
  // Check initialization
  if (!(await paths.isInitialized())) {
    console.error(chalk.red('Error: AgentSpec not initialized'));
    process.exit(1);
  }
  
  // Command logic here
  console.log(chalk.green('Success!'));
}
```

2. **Register in CLI** (`src/cli.ts`):

```typescript
import { myCommand } from './commands/mycommand';

program
  .command('mycommand <arg>')
  .description('Description of my command')
  .action(myCommand);
```

3. **Test the command**:

```bash
npm run build
agentspec mycommand test-arg
```

### Adding a Template

1. **Create template file** in `src/templates/`:

```markdown
<!-- src/templates/my-template.md -->
# My Template

Content here...
```

2. **Add to template constants** (`src/utils/templates.ts`):

```typescript
export const TEMPLATE_FILES = {
  // ... existing templates
  MY_TEMPLATE: 'my-template.md',
};
```

3. **Deploy in init command** (`src/commands/init.ts`):

```typescript
await copyTemplate(
  TEMPLATE_FILES.MY_TEMPLATE, 
  paths.myTemplatePath()
);
```

### Modifying the TUI

The TUI is in `src/ui/AgentSpecTUI.tsx`. It uses Ink (React for CLIs).

**Example: Adding a new view**

```typescript
type View = 'main' | 'ecos' | 'specs' | 'my-view';

// Add state
const [myData, setMyData] = useState<any[]>([]);

// Add effect to load data
useEffect(() => {
  if (view === 'my-view') {
    loadMyData();
  }
}, [view]);

// Add render logic
{view === 'my-view' && (
  <Box flexDirection="column">
    <Text bold>My View</Text>
    {/* Render content */}
  </Box>
)}
```

## Code Style

### TypeScript

- Use strict mode
- Prefer `async/await` over promises
- Use interfaces for complex types
- Export types when needed

### Naming Conventions

- **Files:** kebab-case (`my-file.ts`)
- **Classes:** PascalCase (`AgentSpecPaths`)
- **Functions:** camelCase (`myFunction`)
- **Constants:** UPPER_SNAKE_CASE (`MY_CONSTANT`)

### Error Handling

Always handle errors gracefully:

```typescript
try {
  // Operation
} catch (error) {
  console.error(chalk.red('Error:'), error);
  process.exit(1);
}
```

### User Feedback

Provide clear feedback:

```typescript
console.log(chalk.blue('Processing...'));
console.log(chalk.green('✓ Success!'));
console.log(chalk.yellow('⚠ Warning'));
console.log(chalk.red('✗ Error'));
console.log(chalk.gray('Additional info'));
```

## Testing

### Manual Testing

Create a test directory:

```bash
mkdir test-project
cd test-project
agentspec init
```

Test each command:

```bash
agentspec list
agentspec show test-eco
agentspec validate test-eco
agentspec view
```

### Test Checklist

- [ ] Init creates all directories
- [ ] Init deploys all templates
- [ ] List shows ECOs correctly
- [ ] List --specs shows specs
- [ ] Show displays ECO details
- [ ] Validate checks ECO state
- [ ] Finish merges and archives
- [ ] View TUI works
- [ ] Update updates files
- [ ] Help shows all commands
- [ ] Error messages are clear
- [ ] Colors display correctly

## Debugging

### Enable Debug Output

Add debug logging:

```typescript
if (process.env.DEBUG) {
  console.log('Debug:', value);
}
```

Run with debug:

```bash
DEBUG=1 agentspec init
```

### Common Issues

**Templates not found**
- Check `src/templates/` directory
- Verify build copied templates
- Check template paths in code

**Command not working**
- Rebuild: `npm run build`
- Relink: `npm link`
- Check for TypeScript errors

**TUI not rendering**
- Check Ink version
- Verify React imports
- Test in different terminals

## Building & Publishing

### Build Process

```bash
# Clean build
rm -rf dist/
npm run build

# Verify output
ls dist/
```

### Pre-publish Checklist

- [ ] All tests pass
- [ ] Version updated in package.json
- [ ] CHANGELOG.md updated
- [ ] README.md current
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] Templates included in dist

### Publishing

```bash
# Login to npm
npm login

# Publish
npm publish

# Verify
npm info agentspec
```

## Versioning

Follow semantic versioning:

- **Major (1.0.0):** Breaking changes
- **Minor (0.1.0):** New features
- **Patch (0.0.1):** Bug fixes

Update version:

```bash
npm version patch  # or minor, or major
```

## Documentation

### Keep Updated

When adding features, update:

- `README.md` - User documentation
- `QUICKSTART.md` - If affects quick start
- `CHANGELOG.md` - Version changes
- Code comments - Complex logic
- Template files - If behavior changes

### Writing Documentation

- Be clear and concise
- Include examples
- Show expected output
- Explain why, not just what
- Use proper markdown formatting

## Contributing

### Workflow

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Update documentation
6. Submit PR

### PR Guidelines

- Clear description
- Reference issues
- Include tests
- Update docs
- Follow code style

## Resources

### Dependencies

- [Commander.js](https://github.com/tj/commander.js) - CLI framework
- [Ink](https://github.com/vadimdemedes/ink) - React for CLIs
- [chalk](https://github.com/chalk/chalk) - Terminal colors
- [fs-extra](https://github.com/jprichardson/node-fs-extra) - File system

### Learning

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js CLI Best Practices](https://github.com/lirantal/nodejs-cli-apps-best-practices)
- [Ink Documentation](https://github.com/vadimdemedes/ink#readme)

## Getting Help

- Check existing issues
- Review documentation
- Ask in discussions
- Open new issue

Happy developing! 🚀
