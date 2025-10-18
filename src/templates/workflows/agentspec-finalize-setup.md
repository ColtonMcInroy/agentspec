---
description: Finalize AgentSpec setup and transition to production mode
auto_execution_mode: 1
---

# Workflow: Finalize AgentSpec Setup

This workflow completes the AgentSpec onboarding process and transitions from setup mode to production ECO-based development.

## Prerequisites

- AgentSpec initialized with onboarding files
- User has completed either `agentspec-setup-fresh-project` or `agentspec-setup-existing-project`
- `.agentspec/project.md` is complete and approved by user
- User is ready to begin ECO-based development

## Steps

### 1. Verify Setup Completion

Confirm that setup is complete:

**Check project.md:**
- [ ] Project overview section complete
- [ ] Technology stack documented
- [ ] Architecture described
- [ ] Project structure defined
- [ ] Development standards established
- [ ] Getting started guide present

**Confirm with User:**
```
Before we finalize the setup, let me confirm:

1. Is project.md complete and accurate?
2. Are you satisfied with the documented architecture and standards?
3. Are you ready to begin ECO-based development?

If yes, I'll run the `agentspec finalize` command to:
- Replace onboarding files with production AgentSpec files
- Enable all ECO-based development workflows
- Prepare the project for structured development

Shall I proceed?
```

### 2. Run Finalize Command

After user confirmation, run the finalize command:

```bash
agentspec finalize
```

This command will:
1. Remove onboarding rule (`agentspec-onboarding-*.md`)
2. Remove setup workflows (`agentspec-setup-*.md`)
3. Deploy production rule (`agentspec.md`)
4. Deploy all production workflows
5. Update AGENTS.md with production instructions
6. Sync all files to `.windsurf/` directories

### 3. Verify Finalization

Check that finalization completed successfully:

**Verify Files Removed:**
- [ ] `.agentspec/rules/agentspec-onboarding-*.md` deleted
- [ ] `.agentspec/workflows/agentspec-setup-*.md` deleted
- [ ] `.agentspec/workflows/agentspec-finalize-setup.md` deleted

**Verify Files Added:**
- [ ] `.agentspec/rules/agentspec.md` exists
- [ ] All production workflows exist:
  - `agentspec-new-eco.md`
  - `agentspec-plan.md`
  - `agentspec-implement.md`
  - `agentspec-troubleshoot.md`
  - `agentspec-refactor.md`
  - `agentspec-finish.md`
  - `agentspec-manage-context.md`

**Verify Windsurf Sync:**
- [ ] `.windsurf/rules/agentspec.md` exists
- [ ] `.windsurf/workflows/*.md` files exist

### 4. Explain Production Mode

Inform the user about what's changed:

```
✅ AgentSpec setup finalized!

You're now in production mode. Here's what changed:

**Onboarding Files Removed:**
- Temporary onboarding rule removed
- Setup workflows removed
- This finalization workflow removed

**Production Files Deployed:**
- Production AgentSpec rule active
- All ECO-based workflows available
- Files synced to Windsurf for IDE integration

**Next Steps:**
You can now use AgentSpec's ECO-based development workflows:

1. **Create your first ECO** - Run `agentspec-new-eco` workflow
2. **Plan the work** - Use `agentspec-plan` to detail the implementation
3. **Implement** - Use `agentspec-implement` to build features
4. **Manage context** - Use `agentspec-manage-context` to add custom rules/workflows

All development work will now be organized into Engineering Change Orders,
providing structure, traceability, and clear documentation.
```

### 5. Suggest First ECO (Optional)

Based on the project type, suggest creating a first ECO:

**For Fresh Projects:**
```
Would you like to create your first ECO to establish the initial project structure?

Suggested ECO: "initial-project-setup"
- Create directory structure
- Set up build configuration
- Initialize testing framework
- Create initial documentation
- Set up CI/CD pipeline

This will give us a structured way to build the project foundation.
```

**For Existing Projects:**
```
Based on the project analysis, would you like to create an ECO for any of these improvements?

Suggested ECOs:
1. "improve-test-coverage" - Add missing tests
2. "update-documentation" - Document undocumented features
3. "refactor-[component]" - Address technical debt
4. "[new-feature]" - Add planned feature

Or you can create a custom ECO for any work you'd like to tackle.
```

### 6. Create First ECO (If User Agrees)

If the user wants to create a first ECO, guide them:

```
Great! Let's create your first ECO. I'll guide you through the 
`agentspec-new-eco` workflow.

What would you like to name this ECO?
(Use kebab-case, e.g., "initial-project-setup" or "add-user-authentication")
```

Then follow the `agentspec-new-eco` workflow to create the ECO.

### 7. Provide Quick Reference

Give the user a quick reference for working with AgentSpec:

```
## Quick Reference

**ECO Workflows:**
- `agentspec-new-eco` - Create a new Engineering Change Order
- `agentspec-plan` - Plan or update an ECO
- `agentspec-implement` - Implement an ECO
- `agentspec-troubleshoot` - Debug and fix issues
- `agentspec-refactor` - Refactor existing code
- `agentspec-finish` - Complete and archive an ECO

**Management:**
- `agentspec-manage-context` - Add custom rules/workflows
- `agentspec update` - Update AgentSpec to latest version

**Key Files:**
- `.agentspec/project.md` - Project context (keep updated)
- `.agentspec/rules/` - Development rules
- `.agentspec/eco/` - Active ECOs
- `.agentspec/specs/` - Current specifications

**Remember:**
- All work should be organized into ECOs
- Read relevant AgentSpec files before starting work
- Follow the workflows for structured development
- Update project.md as the project evolves
```

## Success Criteria

- [ ] Setup completion verified with user
- [ ] `agentspec finalize` command executed successfully
- [ ] Onboarding files removed
- [ ] Production files deployed
- [ ] Files synced to Windsurf
- [ ] User understands production mode
- [ ] User knows how to create ECOs
- [ ] Optional: First ECO created

## What Happens Next

After finalization:

1. **Production Mode Active** - AgentSpec is fully operational
2. **ECO-Based Development** - All work organized into ECOs
3. **Structured Workflows** - Clear processes for all development tasks
4. **Context Management** - Ability to add custom rules/workflows
5. **Continuous Improvement** - Project evolves through well-documented ECOs

The user can now begin systematic, well-documented development using the ECO framework!

## Notes

- This workflow can only be run once per project
- After finalization, the onboarding files cannot be restored (except via `agentspec init` in a new directory)
- The `agentspec finalize` command is safe to run - it only affects AgentSpec files, not project code
- If setup wasn't complete, user can cancel and continue working on project.md before finalizing
