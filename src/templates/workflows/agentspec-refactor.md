---
description: Workflow for refactoring within an Engineering Change Order
auto_execution_mode: 1
---

# Workflow: Refactor Engineering Change Order

This workflow guides refactoring work within an active ECO.

## Prerequisites

- An ECO is in the implementation phase
- A need for refactoring has been identified
- You have read the current specs and plan

## When to Use This Workflow

Use this workflow when:
- The implementation approach needs to change
- Requirements have been clarified or modified
- A better solution has been identified
- Technical constraints require a different approach
- Code needs restructuring for maintainability
- Performance improvements are needed

**Do NOT use this for:**
- Simple bug fixes (use `agentspec-troubleshoot`)
- New features (create a new ECO)
- Unrelated improvements (create a new ECO)

## Steps

### 1. Identify What Needs Refactoring

Clearly define:
- **What** needs to change?
- **Why** does it need to change?
- **Scope** - Which specs/components are affected?
- **Impact** - What has already been implemented?

### 2. Assess Impact

Determine the extent of changes:

**Low Impact:**
- Single function or component
- No interface changes
- No test changes needed
- → Proceed with refactor

**Medium Impact:**
- Multiple related components
- Some interface changes
- Tests need updates
- → Update specs and plan, then refactor

**High Impact:**
- Major architectural change
- Many components affected
- Significant test changes
- → Discuss with user first

### 3. Get User Alignment

For medium or high impact refactoring:

Present to the user:
- What you want to refactor and why
- What the new approach will be
- How it affects the timeline
- What benefits it provides

Get approval before proceeding.

### 4. Update Specifications

Modify the affected spec files:

1. **Read current spec** - `.agentspec/eco/{eco-name}/{spec-name}/spec.md`
2. **Identify changes** - What sections need updating?
3. **Update spec** - Reflect the new approach
4. **Mark changes** - Add comments noting what changed and why
5. **Review** - Ensure spec is still clear and complete

Example change notation:
```markdown
## Component: UserService

<!-- REFACTORED: Changed from REST to GraphQL for better flexibility -->

**Purpose:** Handles user data operations via GraphQL

...
```

### 5. Update Tests

Modify the affected test files:

1. **Read current tests** - `.agentspec/eco/{eco-name}/{spec-name}/tests.md`
2. **Identify obsolete tests** - What tests no longer apply?
3. **Identify new tests** - What new tests are needed?
4. **Update tests** - Modify or add test cases
5. **Verify coverage** - Ensure all cases are still covered

### 6. Update Plan

Modify `.agentspec/eco/{eco-name}/plan.md`:

**For completed tasks that need rework:**
- Uncheck the task `[ ]`
- Add a note: `(refactoring required)`

**For new tasks:**
- Add new tasks to the appropriate phase
- Mark them as `[ ]` (not started)

**For obsolete tasks:**
- Mark as `[x]` but add note: `(obsolete after refactor)`

Example:
```markdown
## Phase 2: Backend Implementation

- [x] Create REST endpoints (obsolete after refactor)
- [ ] Create GraphQL schema (refactoring required)
- [ ] Implement GraphQL resolvers (refactoring required)
- [ ] Add GraphQL authentication middleware
```

### 7. Implement Refactoring

Follow a systematic approach:

#### 7.1. Create a Checkpoint

Before making changes:
- Ensure current code is in a stable state
- Note what currently works
- Consider creating a backup or branch

#### 7.2. Refactor Incrementally

Don't change everything at once:
1. Refactor one component at a time
2. Keep tests passing after each change
3. Update task checkboxes as you go
4. Verify functionality after each step

#### 7.3. Maintain Functionality

During refactoring:
- Keep existing functionality working
- Don't introduce new features
- Focus on structural improvements
- Preserve existing behavior

#### 7.4. Update Code

As you refactor:
- Follow project conventions
- Improve code clarity
- Add comments for complex changes
- Remove obsolete code
- Update imports and dependencies

### 8. Verify Refactoring

After refactoring:

1. **Run all tests** - Ensure nothing broke
2. **Test manually** - Verify behavior is preserved
3. **Check performance** - Ensure no degradation
4. **Review code** - Is it clearer and better structured?
5. **Verify specs** - Does implementation match updated specs?

### 9. Update Documentation

Update any affected documentation:
- Code comments
- API documentation
- Architecture diagrams (if applicable)
- README sections

### 10. Report Completion

Inform the user:
- What was refactored
- Why it was refactored
- What the benefits are
- Confirm tests are passing
- Note any timeline impact

## Refactoring Patterns

### Pattern 1: Extract Component

**When:** Code is doing too much
**How:** 
1. Identify cohesive functionality
2. Create new component
3. Move functionality
4. Update callers
5. Update tests

### Pattern 2: Simplify Logic

**When:** Code is complex or hard to understand
**How:**
1. Identify complex sections
2. Break into smaller functions
3. Use meaningful names
4. Add comments
5. Update tests

### Pattern 3: Change Architecture

**When:** Current structure doesn't fit needs
**How:**
1. Design new structure
2. Update specs with new design
3. Migrate incrementally
4. Keep tests passing
5. Remove old structure

### Pattern 4: Improve Performance

**When:** Code is too slow
**How:**
1. Identify bottlenecks
2. Design optimization
3. Implement changes
4. Measure improvement
5. Add performance tests

### Pattern 5: Update Dependencies

**When:** Using outdated or wrong libraries
**How:**
1. Identify replacement
2. Update specs
3. Update imports
4. Migrate usage
5. Test thoroughly

## Best Practices

### Do's

✅ Keep refactoring focused and scoped
✅ Update specs before implementing
✅ Refactor incrementally
✅ Keep tests passing
✅ Improve code clarity
✅ Document why changes were made
✅ Get user approval for major changes

### Don'ts

❌ Add new features during refactoring
❌ Change everything at once
❌ Skip updating specs and tests
❌ Break existing functionality
❌ Refactor without a clear goal
❌ Ignore project conventions
❌ Leave code in a broken state

## Common Refactoring Scenarios

### Scenario: Requirements Changed

1. Update `details.md` with new requirements
2. Update affected specs
3. Update plan with new tasks
4. Implement changes
5. Update tests

### Scenario: Better Approach Discovered

1. Document the new approach
2. Get user approval
3. Update specs
4. Refactor implementation
5. Verify tests pass

### Scenario: Performance Issues

1. Identify bottleneck
2. Design optimization
3. Update spec with approach
4. Implement optimization
5. Add performance tests

### Scenario: Code Complexity

1. Identify complex areas
2. Design simpler structure
3. Update spec if needed
4. Refactor incrementally
5. Verify behavior preserved

## Notes

- Refactoring should improve code without changing behavior
- Always update specs to match implementation
- Keep the user informed of significant changes
- Don't let refactoring expand scope indefinitely
- Sometimes it's better to finish the ECO and create a new one for improvements
