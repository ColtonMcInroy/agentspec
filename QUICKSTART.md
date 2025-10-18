# AgentSpec Quick Start Guide

Get up and running with AgentSpec in 5 minutes.

## Installation

```bash
npm install -g agentspec
```

## Step 1: Initialize Your Project

Navigate to your project directory and initialize AgentSpec:

```bash
cd my-project
agentspec init
```

AgentSpec will automatically detect your project type:

**For Fresh Projects:**
```
Detected fresh project
✓ AgentSpec initialized in onboarding mode!

Project Type: Fresh Project

Next steps:
1. Work with your agent using the agentspec-setup-fresh-project workflow
2. Collaborate to define your project vision and architecture
3. Complete .agentspec/project.md with project details
4. Run the agentspec-finalize-setup workflow when ready
```

**For Existing Projects:**
```
Detected existing project
✓ AgentSpec initialized in onboarding mode!

Project Type: Existing Project

Next steps:
1. Work with your agent using the agentspec-setup-existing-project workflow
2. Let the agent analyze your existing codebase
3. Review and approve the generated .agentspec/project.md
4. Run the agentspec-finalize-setup workflow when ready
```

## Step 2: Setup Your Project with Your Agent

AgentSpec enters **onboarding mode** to help you establish a solid foundation.

### For Fresh Projects

Tell your agent:

> "Follow the agentspec-setup-fresh-project workflow"

The agent will collaborate with you to:

1. **Define project vision** - What problem does it solve? Who will use it?
2. **Choose technology stack** - Get recommendations based on your requirements
3. **Design architecture** - Plan components, data flow, and structure
4. **Establish standards** - Set code style, testing, and documentation practices
5. **Create project.md** - Document everything for future reference

### For Existing Projects

Tell your agent:

> "Follow the agentspec-setup-existing-project workflow"

The agent will:

1. **Analyze existing documentation** - Read README, docs, comments
2. **Examine configuration** - Identify tech stack from package files
3. **Review code structure** - Understand architecture and patterns
4. **Document current state** - Capture everything in project.md
5. **Identify improvements** - Note areas for future ECOs

## Step 3: Finalize Setup

Once your `project.md` is complete and you're satisfied with it, tell your agent:

> "Follow the agentspec-finalize-setup workflow"

The agent will run `agentspec finalize`, which:

- Removes onboarding files
- Deploys production AgentSpec rules and workflows
- Transitions to ECO-based development mode

You'll see:
```
✓ AgentSpec setup finalized!

Production mode active:
  • Onboarding files removed
  • Production AgentSpec rule deployed
  • All ECO-based workflows available

Next steps:
  1. Create your first ECO with the agentspec-new-eco workflow
  2. Use agentspec-plan to detail the implementation
  3. Use agentspec-implement to build features
```

## Step 4: Share with Your AI Agent

Share the `AGENTS.md` file with your AI agent. You can:

- Copy and paste it into the chat
- Reference it in your IDE
- Include it in your agent's context

## Step 5: Create Your First ECO

Tell your agent:

> "Follow the agentspec-new-eco workflow to add user authentication"

The agent will:

1. Ask clarifying questions about the feature
2. Create an ECO directory
3. Draft the details
4. Collaborate with you to refine it

Example interaction:
```
Agent: I'll help you create an ECO for user authentication. 
       Let me ask a few questions:
       
       1. What authentication method? (JWT, sessions, OAuth, etc.)
       2. What user data needs to be stored?
       3. Any specific security requirements?

You: Use JWT tokens, store email and password hash, 
     require HTTPS in production

Agent: Great! I've created the ECO details. Here's what I have:
       [Shows details.md content]
       
       Does this look good?

You: Yes, looks good!

Agent: Perfect! Should I proceed with planning?
```

## Step 5: Plan the ECO

Tell your agent:

> "Follow the agentspec-plan workflow"

The agent will:

1. Identify affected specifications (frontend, backend, database)
2. Create technical specifications
3. Define tests
4. Create an implementation plan

## Step 6: Implement the ECO

Tell your agent:

> "Follow the agentspec-implement workflow"

The agent will work through the plan, updating task checkboxes as it goes:

```markdown
## Phase 1: Database Setup
- [x] Create users table
- [x] Add password hashing
- [x] Create migration

## Phase 2: Backend API
- [x] Create auth routes
- [x] Implement JWT generation
- [ ] Add middleware
- [ ] Add validation
```

## Step 7: Track Progress

Check progress anytime:

```bash
agentspec list
```

Output:
```
Active Engineering Change Orders:

• add-user-authentication
  Status: In Progress (5/12 tasks)
  Add JWT-based authentication system
```

View details:
```bash
agentspec show add-user-authentication
```

Or use the interactive TUI:
```bash
agentspec view
```

## Step 8: Validate and Finish

When implementation is complete, validate:

```bash
agentspec validate add-user-authentication
```

If validation passes, finish the ECO:

```bash
agentspec finish add-user-authentication
```

This will:
- Merge specifications into `.agentspec/specs/`
- Archive the ECO to `.agentspec/finished-eco/`
- Update your project specs

## Common Commands

```bash
# Initialize AgentSpec (auto-detects project type)
agentspec init

# Finalize setup (transition to production mode)
agentspec finalize

# List active ECOs
agentspec list

# List specifications
agentspec list --specs

# Show ECO details
agentspec show eco-name

# Validate ECO
agentspec validate eco-name

# Finish ECO
agentspec finish eco-name

# Interactive TUI
agentspec view

# Update AgentSpec
agentspec update

# Help
agentspec --help
```

## Tips for Success

### For Users

1. **Complete onboarding first** - Work with your agent to finalize project.md before starting ECOs
2. **Keep ECOs focused** - One feature or fix per ECO
3. **Review details carefully** - Clear requirements lead to better results
4. **Track progress** - Use `agentspec list` regularly
5. **Validate before finishing** - Catch issues early

### For AI Agents

1. **Read context first** - Always start with AGENTS.md and project.md
2. **Follow workflows** - They provide structure and consistency
3. **Use onboarding mode** - Help users establish solid foundations
4. **Update as you go** - Check off tasks immediately
5. **Communicate clearly** - Reference specific files and tasks

## Example Workflow

Here's a complete example of creating a feature:

```bash
# 1. Initialize (first time only)
agentspec init
# AgentSpec detects project type and enters onboarding mode

# 2. Setup with agent
"Follow agentspec-setup-fresh-project workflow"
# OR "Follow agentspec-setup-existing-project workflow"

# 3. Complete project.md
# Agent helps you define/document your project

# 4. Finalize setup
"Follow agentspec-finalize-setup workflow"
# Transitions to production mode

# 5. Create first ECO
"Follow agentspec-new-eco workflow to add a contact form"

# 6. Collaborate on details
# Agent asks questions, you provide answers

# 7. Approve details
"Yes, proceed with planning"

# 8. Agent creates plan
# Agent follows agentspec-plan workflow

# 9. Implement
"Follow agentspec-implement workflow"

# 10. Track progress
agentspec list

# 11. Validate
agentspec validate add-contact-form

# 12. Finish
agentspec finish add-contact-form

# 13. Verify
agentspec list --specs
```

## Next Steps

- Read the full [README.md](README.md)
- Explore `.agentspec/workflows/` for detailed workflow guides
- Check `.agentspec/instructions.md` for comprehensive documentation
- Add custom rules in `.agentspec/rules/`

## Troubleshooting

**Agent loses context?**
- Have it read `AGENTS.md` again
- Point it to the relevant ECO files

**ECO validation fails?**
- Run `agentspec validate eco-name` to see specific issues
- Fix the reported errors
- Validate again

**Need to change an ECO mid-implementation?**
- Tell your agent: "Follow agentspec-refactor workflow"

## Getting Help

- Check the [README.md](README.md)
- Review workflow files in `.agentspec/workflows/`
- Open an issue on GitHub

Happy coding with AgentSpec! 🚀
