---
description: Workflow for completing and archiving an Engineering Change Order
auto_execution_mode: 1
---

# Workflow: Finish Engineering Change Order

This workflow guides the completion and archival of an ECO.

## Prerequisites

- All tasks in `plan.md` are checked off `[x]`
- All tests in `tests.md` are passing
- User has accepted the implementation
- You have verified the success criteria from `details.md`

## Steps

### 1. Pre-Finish Verification

Before finishing, verify:

**Plan Completion:**
- [ ] All phases in `plan.md` are complete
- [ ] All tasks are checked `[x]`
- [ ] No tasks are marked as blocked or pending

**Test Validation:**
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All end-to-end tests pass
- [ ] Manual verification completed
- [ ] Performance tests pass (if applicable)

**Success Criteria:**
- [ ] All criteria from `details.md` are met
- [ ] User has confirmed acceptance
- [ ] No known issues or bugs

**Documentation:**
- [ ] Code is properly commented
- [ ] API documentation updated (if applicable)
- [ ] README updated (if applicable)
- [ ] Specs are up-to-date

### 2. Review Specifications

For each spec in `.agentspec/eco/{eco-name}/{spec-name}/`:

1. **Read the spec** - `spec.md`
2. **Verify accuracy** - Does it reflect what was implemented?
3. **Check completeness** - Is anything missing?
4. **Update if needed** - Make final corrections

### 3. Prepare for Merge

For each specification:

#### 3.1. Check if Spec Exists

Look in `.agentspec/specs/{spec-name}/`:
- Does this spec already exist?
- If yes, you'll be merging/updating
- If no, you'll be creating new

#### 3.2. Review Existing Spec (if applicable)

If the spec exists:
1. Read `.agentspec/specs/{spec-name}/spec.md`
2. Identify what will change
3. Identify what will be added
4. Ensure no conflicts

### 4. Merge Specifications

For each specification:

#### 4.1. Merge spec.md

**If spec is new:**
- Copy `.agentspec/eco/{eco-name}/{spec-name}/spec.md`
- To `.agentspec/specs/{spec-name}/spec.md`

**If spec exists:**
- Read both files
- Merge new content into existing spec
- Maintain consistent structure
- Update version/date if tracked
- Add note about what ECO added/changed

Example merge:
```markdown
# Specification: Backend API

<!-- Updated by ECO: add-user-authentication (2024-01-15) -->

## Overview
[Updated overview including new features]

## Components

### Existing Component
[Existing content]

### New Component (Added: add-user-authentication)
[New content from ECO]
```

#### 4.2. Merge tests.md

**If tests are new:**
- Copy `.agentspec/eco/{eco-name}/{spec-name}/tests.md`
- To `.agentspec/specs/{spec-name}/tests.md`

**If tests exist:**
- Read both files
- Add new tests to existing test file
- Update existing tests if they changed
- Maintain test organization
- Mark which ECO added tests

### 5. Migrate Documentation

If the ECO has documentation in `.agentspec/eco/{eco-name}/docs/`:

#### 5.1. Analyze ECO Documentation

Review all files in `.agentspec/eco/{eco-name}/docs/`:
- Design decisions
- Architecture diagrams
- API documentation
- Implementation notes
- Any other ECO-specific documentation

#### 5.2. Update Project Documentation

For each ECO document, determine if it should be integrated into project documentation:

**Update existing docs in `docs/`:**
- Merge relevant content into existing documentation
- Update architecture diagrams
- Add new API endpoints to API docs
- Update design decision records

**Create new docs if needed:**
- New subsystem documentation
- New feature guides
- New architecture documents

**Examples:**
- ECO adds authentication → Update `docs/architecture.md` and `docs/api.md`
- ECO adds new service → Create `docs/services/new-service.md`
- ECO changes database schema → Update `docs/database.md`

#### 5.3. Update Standard Project Files

Update root-level documentation as needed:
- **README.md** - Add new features, update setup instructions
- **CHANGELOG.md** - Add entry for this ECO's changes
- **CONTRIBUTING.md** - Update if development process changed

### 6. Validate Merge

After merging specs and documentation:

1. **Read merged specs** - Do they make sense?
2. **Check for conflicts** - Any contradictions?
3. **Verify completeness** - Is everything included?
4. **Test structure** - Is formatting consistent?
5. **Review documentation** - Is project documentation up-to-date?

The user can run `agentspec validate {eco-name}` to check this automatically.

### 7. Archive ECO

Once specs and documentation are merged:

#### 7.1. Create Archive Directory

Create directory with timestamp:
```
.agentspec/finished-eco/{YYYY}-{MM}-{DD}-{eco-name}/
```

Example: `.agentspec/finished-eco/2024-01-15-add-user-authentication/`

#### 7.2. Move ECO Files

Move the entire ECO directory:
- From: `.agentspec/eco/{eco-name}/`
- To: `.agentspec/finished-eco/{YYYY}-{MM}-{DD}-{eco-name}/`

This preserves the complete history of the ECO, including all documentation in the `docs/` subdirectory.

### 8. Clean Up

After archiving:

1. **Verify ECO is gone** - `.agentspec/eco/{eco-name}/` should not exist
2. **Verify archive exists** - Check finished-eco directory
3. **Verify specs updated** - Check `.agentspec/specs/`
4. **Verify docs updated** - Check `docs/` and root documentation files

### 9. Update Project Context

If significant changes were made:

Update `.agentspec/project.md`:
- Add new components to structure
- Update tech stack if changed
- Note new features or capabilities
- Update any affected sections

### 10. Report Completion

Inform the user:

```markdown
## ECO Completed: {eco-name}

### Summary
[Brief summary of what was accomplished]

### Specifications Updated
- `{spec-name-1}` - [What was added/changed]
- `{spec-name-2}` - [What was added/changed]

### Archive Location
`.agentspec/finished-eco/{YYYY}-{MM}-{DD}-{eco-name}/`

### Next Steps
[Any follow-up work or related ECOs to consider]
```

### 10. Suggest Next Actions

Based on the completed work, suggest:
- Related improvements that could be made
- Technical debt that was identified
- Performance optimizations to consider
- Documentation that could be enhanced

Ask: "Would you like to create a new ECO for any follow-up work?"

## Manual Finish Process

If the user runs `agentspec finish {eco-name}`, the CLI will:
1. Validate the ECO is complete
2. Merge specs automatically
3. Archive the ECO
4. Report results

You should inform the user they can run this command, or you can perform the steps manually.

## Validation Checklist

Before finishing, ensure:

**Code Quality:**
- [ ] Code follows project conventions
- [ ] No TODO or FIXME comments left
- [ ] Error handling is proper
- [ ] Code is well-commented

**Testing:**
- [ ] All tests pass
- [ ] Edge cases are covered
- [ ] No test skips or ignores
- [ ] Manual testing completed

**Documentation:**
- [ ] Specs are accurate
- [ ] Tests are documented
- [ ] Code has inline comments
- [ ] User-facing docs updated

**Integration:**
- [ ] Works with existing code
- [ ] No regressions introduced
- [ ] Dependencies are correct
- [ ] Configuration is proper

**User Acceptance:**
- [ ] User has reviewed changes
- [ ] User confirms requirements met
- [ ] User approves completion

## Common Issues

### Issue: Tests Failing

**Don't finish yet!**
- Use `agentspec-troubleshoot` workflow
- Fix failing tests
- Verify all tests pass
- Then return to finish workflow

### Issue: Tasks Incomplete

**Don't finish yet!**
- Complete remaining tasks
- Update plan as tasks are done
- Verify all checkboxes are `[x]`
- Then return to finish workflow

### Issue: User Not Satisfied

**Don't finish yet!**
- Clarify what's missing
- Update plan with additional tasks
- Implement changes
- Get user acceptance
- Then return to finish workflow

### Issue: Specs Out of Date

**Update before finishing:**
- Review implementation
- Update specs to match
- Ensure accuracy
- Then proceed with finish

## Notes

- Don't rush the finish process
- Ensure everything is truly complete
- Merged specs should be clear and accurate
- Archive preserves the complete ECO history
- Finishing is a one-way operation - make sure it's ready
- The user can always create a new ECO for follow-up work
