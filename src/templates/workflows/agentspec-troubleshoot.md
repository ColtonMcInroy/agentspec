---
description: Workflow for troubleshooting and debugging ECO issues
auto_execution_mode: 1
---

# Workflow: Troubleshoot Engineering Change Order

This workflow guides debugging and fixing issues in an ECO implementation.

## Prerequisites

- An ECO is in the implementation phase
- An issue, bug, or test failure has been identified

## Steps

### 1. Identify the Problem

Gather information about the issue:

**For Test Failures:**
- Which test is failing?
- What is the expected behavior?
- What is the actual behavior?
- What is the error message?

**For Bugs:**
- What is the observed behavior?
- What should happen instead?
- How to reproduce the issue?
- When did it start occurring?

**For Errors:**
- What is the error message?
- What is the stack trace?
- What operation was being performed?
- What are the input conditions?

### 2. Locate the Issue

Determine where the problem is:

1. **Read the relevant spec** - What should be happening?
2. **Review the implementation** - What is actually implemented?
3. **Check recent changes** - What was changed recently?
4. **Identify the component** - Which file/function is involved?

### 3. Reproduce the Issue

Create a minimal reproduction:
- Isolate the failing case
- Identify the minimal input that causes the failure
- Document the exact steps to reproduce

### 4. Analyze the Root Cause

Investigate why the issue is occurring:

**Common Root Causes:**
- Logic error in implementation
- Missing edge case handling
- Incorrect data transformation
- Missing validation
- Race condition or timing issue
- Incorrect API usage
- Missing dependency or import
- Configuration issue
- Misunderstanding of requirements

**Analysis Techniques:**
- Add logging/debug statements
- Check variable values at key points
- Verify assumptions about data
- Review error messages carefully
- Check documentation for APIs/libraries used

### 5. Determine the Fix

Decide on the appropriate solution:

**Fix Types:**

**Type A: Simple Bug Fix**
- Clear logic error
- Missing validation
- Typo or incorrect value
- → Implement fix directly

**Type B: Specification Issue**
- Spec was unclear or incomplete
- Requirements were misunderstood
- Edge case wasn't considered
- → Update spec, then implement fix

**Type C: Design Issue**
- Approach doesn't work for the use case
- Architecture needs adjustment
- → Use `agentspec-refactor` workflow

**Type D: Scope Issue**
- Issue is outside ECO scope
- Requires changes to other components
- → Discuss with user, possibly create new ECO

### 6. Implement the Fix

Based on the fix type:

#### For Type A (Simple Bug Fix):

1. Make the code change
2. Add/update tests to cover the case
3. Verify the fix resolves the issue
4. Check for similar issues elsewhere
5. Update task in `plan.md` if needed

#### For Type B (Specification Issue):

1. Update the relevant spec file
2. Document the edge case or clarification
3. Implement the fix
4. Add tests for the case
5. Verify the fix
6. Update `plan.md` if tasks changed

#### For Type C (Design Issue):

1. Follow `agentspec-refactor` workflow
2. Update specs with new approach
3. Update plan with refactoring tasks
4. Implement changes
5. Verify all tests still pass

#### For Type D (Scope Issue):

1. Document the issue
2. Discuss with user
3. Decide: fix in current ECO or create new ECO
4. Update scope in `details.md` if expanding
5. Update plan with new tasks if needed

### 7. Verify the Fix

Ensure the issue is resolved:

1. **Run the failing test** - Does it pass now?
2. **Run related tests** - Any regressions?
3. **Run all tests** - Everything still working?
4. **Manual verification** - Does it work as expected?
5. **Check edge cases** - Are similar cases handled?

### 8. Document the Fix

Update relevant files:

- **Code comments** - Explain non-obvious fixes
- **Spec files** - If requirements were clarified
- **Test files** - If new test cases were added
- **Plan** - If tasks were added or changed

### 9. Prevent Recurrence

Consider how to prevent similar issues:

- Add validation to catch the issue earlier
- Add tests for the edge case
- Improve error messages
- Update specs to be clearer
- Add documentation or comments

### 10. Report Resolution

Inform the user:
- Describe the issue that was found
- Explain the root cause
- Describe the fix implemented
- Confirm tests are passing
- Note any spec or plan updates

## Debugging Techniques

### Systematic Debugging

1. **Reproduce** - Ensure you can trigger the issue consistently
2. **Isolate** - Narrow down to the smallest failing case
3. **Hypothesize** - Form theories about the cause
4. **Test** - Test each hypothesis
5. **Fix** - Implement the solution
6. **Verify** - Confirm the fix works

### Adding Debug Information

```markdown
Effective debugging additions:
- Console logs at key points
- Assertions to verify assumptions
- Error messages with context
- Logging of input/output values
- Stack traces for errors
```

### Binary Search Debugging

If unsure where the issue is:
1. Check the middle of the process
2. Determine if issue is before or after
3. Repeat until you find the exact location

### Rubber Duck Debugging

Explain the code line-by-line:
- What should each line do?
- What does it actually do?
- Where does it diverge?

## Common Issues and Solutions

### Test Failures

**Symptom:** Test fails but code looks correct
**Check:** 
- Is the test itself correct?
- Are test expectations accurate?
- Is test data valid?

### Null/Undefined Errors

**Symptom:** Null reference or undefined errors
**Check:**
- Is data being passed correctly?
- Are all required fields present?
- Is initialization happening in the right order?

### Logic Errors

**Symptom:** Wrong output for given input
**Check:**
- Are conditions correct? (>, <, ==, etc.)
- Is the algorithm correct?
- Are edge cases handled?

### Integration Issues

**Symptom:** Components don't work together
**Check:**
- Are interfaces compatible?
- Is data format correct?
- Are all dependencies initialized?

### Performance Issues

**Symptom:** Code is slow or times out
**Check:**
- Are there unnecessary loops?
- Is data being fetched efficiently?
- Are there memory leaks?

## Notes

- Fix the root cause, not just the symptom
- Add tests to prevent regression
- Update documentation to reflect fixes
- Don't be afraid to ask for help
- Sometimes the best fix is a refactor
