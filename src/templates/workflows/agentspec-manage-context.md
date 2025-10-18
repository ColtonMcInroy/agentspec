---
description: Manage custom rules and workflows based on project needs
auto_execution_mode: 1
---

# Workflow: Manage Custom Rules and Workflows

This workflow helps assess and manage custom rules and workflows to optimize the development experience for your specific project.

## Prerequisites

- AgentSpec is initialized in the project
- You have read `project.md` to understand the project scope
- You understand the current project structure and technology stack

## When to Use This Workflow

Use this workflow when:
- Starting a new project to establish custom rules and workflows
- Project scope or architecture has changed significantly
- Development patterns have emerged that should be codified
- Existing custom rules or workflows are outdated or no longer relevant
- Team wants to optimize the development workflow

## Important Notes

- **DO NOT modify** `agentspec.md` rule or `agentspec-*` workflows (these are managed by `agentspec update`)
- **ONLY manage** custom rules and workflows specific to this project
- Create custom files in `.agentspec/rules/` and `.agentspec/workflows/` directories
- After making changes, run `agentspec update` to sync to `.windsurf/` directories

## Steps

### 1. Assess Current Context

Read and analyze:
- `.agentspec/project.md` - Project scope, architecture, tech stack
- `.agentspec/rules/` - All existing rules (note which are custom vs. agentspec.md)
- `.agentspec/workflows/` - All existing workflows (note which are custom vs. agentspec-*)
- Project codebase structure
- Recent development patterns and challenges

### 2. Identify Needs

Collaborate with the user to identify:

**Rules to Create:**
- Technology-specific standards (e.g., React patterns, Python conventions)
- Architecture patterns (e.g., API design, state management)
- Domain-specific constraints (e.g., business logic rules)
- File organization standards
- Testing requirements
- Security considerations

**Workflows to Create:**
- Component/module creation workflows
- Testing workflows
- Deployment workflows
- Database migration workflows
- Code review workflows
- Maintenance workflows

**Rules/Workflows to Update:**
- Outdated patterns that need revision
- Incomplete rules that need more detail
- Workflows that don't match current practices

**Rules/Workflows to Remove:**
- Obsolete rules for removed technologies
- Workflows for deprecated processes
- Duplicate or conflicting rules

### 3. Design Custom Rules

For each custom rule to create or update:

**Choose Appropriate Trigger:**
- `always_on` - For core standards that always apply
- `model_decision` - For context-specific rules (include clear description)
- `glob` - For file-pattern-specific rules (specify glob patterns)
- `manual` - For rules that should be explicitly referenced

**Rule Template:**
```markdown
---
trigger: [manual | always_on | model_decision | glob]
description: Clear description of when and how to apply this rule
globs: pattern1, pattern2  # Only for glob trigger
---

# Rule: [Rule Name]

## Purpose

Explain why this rule exists and what problem it solves.

## When to Apply

Describe the contexts where this rule applies.

## Standards

List specific standards, patterns, or constraints:

1. Standard 1
2. Standard 2
3. Standard 3

## Examples

### Good Example
\`\`\`
[code example following the rule]
\`\`\`

### Bad Example
\`\`\`
[code example violating the rule]
\`\`\`

## Exceptions

List any valid exceptions to this rule.
```

**Example Custom Rules:**
- `frontend-components.md` - React component standards (glob: `src/components/**/*.tsx`)
- `api-design.md` - API endpoint patterns (model_decision)
- `database-schema.md` - Database design rules (glob: `prisma/**/*.prisma, migrations/**/*`)
- `testing-standards.md` - Testing requirements (always_on)

### 4. Design Custom Workflows

For each custom workflow to create or update:

**Choose Execution Mode:**
- `1` (Safe mode) - For workflows that modify code or run commands (recommended)
- `3` (Turbo mode) - Only for safe, repetitive operations

**Workflow Template:**
```markdown
---
description: Brief description shown to user when choosing workflow
auto_execution_mode: 1  # or 3 for turbo mode
---

# Workflow: [Workflow Name]

Brief description of what this workflow accomplishes.

## Prerequisites

- Prerequisite 1
- Prerequisite 2

## Steps

### 1. Step Name

Detailed instructions for this step.

What to do:
- Action 1
- Action 2

What to create/update:
- File or directory to create/modify

### 2. Step Name

Continue with clear, actionable steps.

### 3. Validation

How to verify the workflow completed successfully:
- Check 1
- Check 2

## Success Criteria

What indicates this workflow completed successfully.
```

**Example Custom Workflows:**
- `create-api-endpoint.md` - Create new API endpoint with tests
- `create-react-component.md` - Create React component with story and tests
- `run-migrations.md` - Run database migrations safely
- `deploy-staging.md` - Deploy to staging environment

### 5. Create/Update Files

For each rule or workflow:

1. **Create the file** in `.agentspec/rules/` or `.agentspec/workflows/`
2. **Verify configuration** - Ensure YAML frontmatter is valid

Example commands:
```bash
# Create custom rule
cat > .agentspec/rules/frontend-components.md << 'EOF'
---
trigger: glob
description: React component development standards
globs: src/components/**/*.tsx, src/pages/**/*.tsx
---
[rule content]
EOF

# Create custom workflow
cat > .agentspec/workflows/create-api-endpoint.md << 'EOF'
---
description: Create a new API endpoint with tests and documentation
auto_execution_mode: 1
---
[workflow content]
EOF
```

**Important:** After creating or updating custom rules/workflows, the user should run `agentspec update` to sync them to `.windsurf/` directories.

### 6. Remove Obsolete Files

For rules or workflows to remove:

1. **Delete from** `.agentspec/rules/` or `.agentspec/workflows/`
2. **Document removal** - Note why it was removed

**Important:** After removing custom rules/workflows, the user should run `agentspec update` to sync the changes to `.windsurf/` directories.

### 7. Document Changes

Update `.agentspec/project.md` if needed to reference new rules or workflows:

```markdown
## Custom Rules

- `frontend-components.md` - React component standards
- `api-design.md` - API endpoint patterns
- `testing-standards.md` - Testing requirements

## Custom Workflows

- `create-api-endpoint` - Create new API endpoints
- `create-react-component` - Create React components
- `run-migrations` - Database migrations
```

### 8. Review with User

Present the changes to the user:

**Created:**
- List new rules and workflows with brief descriptions

**Updated:**
- List modified rules and workflows with what changed

**Removed:**
- List deleted rules and workflows with rationale

Get user approval before proceeding.

### 9. Sync to Windsurf

After user approval, run the sync command:

```bash
agentspec update
```

This will sync all rules and workflows from `.agentspec/` to `.windsurf/` directories, making them available in the IDE.

### 10. Test Integration

Verify the rules and workflows work correctly:

1. **Test rule triggers** - Verify rules load in appropriate contexts
2. **Test workflow execution** - Run through workflows to ensure they work
3. **Check for conflicts** - Ensure no conflicts between rules
4. **Validate YAML** - Ensure all frontmatter is valid

## Success Criteria

- [ ] All custom rules have valid YAML frontmatter configuration
- [ ] All custom workflows have valid YAML frontmatter configuration
- [ ] Custom rules and workflows created in `.agentspec/` directories
- [ ] `agentspec update` command executed to sync to `.windsurf/` directories
- [ ] `agentspec.md` rule and `agentspec-*` workflows remain unmodified
- [ ] User has approved all changes
- [ ] Documentation updated in `project.md` if needed
- [ ] Rules and workflows tested and working correctly

## Maintenance

Run this workflow periodically:
- When starting new major features
- After significant architecture changes
- When development patterns evolve
- Every few months as part of project maintenance

## Tips

- **Start simple** - Create a few essential rules/workflows first
- **Be specific** - Clear, actionable rules are better than vague guidelines
- **Use examples** - Include code examples in rules
- **Test thoroughly** - Verify rules and workflows work as expected
- **Iterate** - Refine based on actual usage and feedback
- **Document rationale** - Explain why rules exist to help future developers
