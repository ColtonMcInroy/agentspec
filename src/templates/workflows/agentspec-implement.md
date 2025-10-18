---
description: Workflow for implementing an Engineering Change Order
auto_execution_mode: 1
---

# Workflow: Implement Engineering Change Order

This workflow guides the implementation phase of an ECO.

## Prerequisites

- ECO planning is complete (`plan.md`, `tests.md`, and spec files exist)
- User has approved the plan
- You have read all specifications and tests

## Steps

### 1. Review the Plan

Read `.agentspec/eco/{eco-name}/plan.md` and:
- Understand all phases and tasks
- Identify the current phase
- Note any dependencies between tasks

### 2. Work Phase by Phase

For each phase in the plan:

#### 2.1. Read Phase Tasks

Identify all tasks in the current phase.

#### 2.2. Read Relevant Specifications

Before implementing tasks, read the relevant spec files:
- `.agentspec/eco/{eco-name}/{spec-name}/spec.md`
- `.agentspec/eco/{eco-name}/{spec-name}/tests.md`

#### 2.3. Implement Tasks

For each task:

1. **Understand the requirement** from the specification
2. **Implement the change** following the spec
3. **Follow project conventions** from `project.md`
4. **Write clean, maintainable code**
5. **Add appropriate comments** for complex logic
6. **Update the task checkbox** in `plan.md` to `[x]`

#### 2.4. Run Tests

After completing phase tasks:
- Run relevant unit tests
- Run integration tests if applicable
- Verify the tests from the spec's `tests.md`
- Fix any failures before moving to the next phase

#### 2.5. Update Progress

Mark the phase completion task in `plan.md` as done.

### 3. Handle Issues

If you encounter problems:

#### 3.1. Specification Issues

If the spec is unclear or incomplete:
- Document what's unclear
- Propose a solution
- Ask the user for clarification
- Update the spec once clarified

#### 3.2. Technical Blockers

If you hit a technical blocker:
- Document the issue
- Research potential solutions
- Present options to the user
- Update the plan if the approach needs to change

#### 3.3. Scope Changes

If the user requests changes mid-implementation:
- Use the `agentspec-refactor` workflow
- Update relevant specs and plan
- Adjust task checkboxes accordingly

### 4. Integration Phase

When all specification-specific phases are complete:

1. **Integrate components** - Ensure all specs work together
2. **Run integration tests** - Verify cross-component functionality
3. **Check for regressions** - Ensure existing functionality still works
4. **Fix integration issues** - Address any problems that arise

### 5. Testing & Validation Phase

1. **Run all unit tests** - Verify individual components
2. **Run all integration tests** - Verify component interactions
3. **Run end-to-end tests** - Verify complete user scenarios
4. **Manual verification** - Follow steps in `tests.md`
5. **Performance testing** - If specified in tests
6. **Security testing** - If specified in tests

### 6. Documentation Phase

Update documentation:
- **Code comments** - Ensure complex logic is explained
- **API documentation** - If APIs were added/changed
- **README** - If user-facing changes were made
- **Project documentation** - If architecture changed

### 7. Completion Phase

Before marking the ECO complete:

1. **Verify all tasks** in `plan.md` are checked `[x]`
2. **Verify all tests pass** from `tests.md`
3. **Review success criteria** from `details.md`
4. **Run final validation** - Complete check of all functionality

### 8. Present Results

Inform the user:
- Summarize what was implemented
- Highlight any deviations from the original plan
- Note any issues encountered and how they were resolved
- Confirm all tests are passing

### 9. Request User Acceptance

Ask: "The implementation is complete and all tests are passing. Would you like to review the changes, or should I proceed with the `agentspec-finish` workflow?"

## Best Practices

### Code Quality

- Write idiomatic code for the project's language/framework
- Follow existing patterns and conventions
- Keep functions/methods focused and single-purpose
- Use meaningful variable and function names
- Add error handling and validation

### Testing

- Test as you go, don't wait until the end
- Write tests that actually validate requirements
- Include both positive and negative test cases
- Test edge cases and error conditions

### Progress Tracking

- Update task checkboxes immediately after completing tasks
- Keep the plan current if scope changes
- Communicate progress regularly

### Context Preservation

- Update specs if implementation differs from plan
- Document decisions and rationale
- Keep commit messages clear and descriptive (if using version control)

### Collaboration

- Ask questions when uncertain
- Propose solutions when you encounter issues
- Keep the user informed of progress and blockers

## Common Pitfalls to Avoid

- ❌ Implementing without reading the specs
- ❌ Skipping tests until the end
- ❌ Not updating task checkboxes
- ❌ Making changes outside the ECO scope
- ❌ Ignoring project conventions
- ❌ Not handling errors properly
- ❌ Leaving TODO comments without addressing them
- ❌ Breaking existing functionality

## Notes

- Work systematically through the plan
- Don't skip phases or tasks
- Keep changes focused on the ECO goals
- Maintain code quality throughout
- Communicate proactively with the user
