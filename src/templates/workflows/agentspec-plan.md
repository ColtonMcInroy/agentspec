---
description: Workflow for planning an Engineering Change Order
auto_execution_mode: 1
---

# Workflow: Plan Engineering Change Order

This workflow guides the planning phase after ECO details are approved.

## Prerequisites

- ECO `details.md` exists and is approved by the user
- You have read the ECO details thoroughly

## Steps

### 1. Identify Specifications

Determine which specifications this ECO affects:

**Check existing specs** in `.agentspec/specs/`:
- Can this work be added to an existing spec?
- Does it modify existing specifications?

**Create new specs** if:
- This is a new component or subsystem
- The work doesn't fit existing specifications
- It's a distinct feature that should be tracked separately

Common spec names:
- `frontend`, `backend`, `database`, `infrastructure`
- Feature-specific: `user-auth`, `payment-processing`, etc.
- Component-specific: `api-gateway`, `notification-service`, etc.

### 2. Create Spec Directories

For each specification needed:
```
.agentspec/eco/{eco-name}/{spec-name}/
├── spec.md
└── tests.md
```

### 3. Write Specifications

For each `spec.md`, include:

```markdown
# Specification: {Spec Name}

## Overview

[What this specification covers]

## Technical Approach

[High-level technical approach]

## Components

### {Component Name}

**Purpose:** [What it does]

**Implementation:**
- [Detail 1]
- [Detail 2]

**Files to Modify/Create:**
- `path/to/file.ext` - [What changes]

## Data Models

[Any data structures, schemas, or models]

## APIs / Interfaces

[Any APIs, function signatures, or interfaces]

## Configuration

[Any configuration changes needed]

## Dependencies

[Libraries, services, or other dependencies]

## Migration / Upgrade Path

[If applicable, how to migrate existing data/code]

## Security Considerations

[Any security implications]

## Performance Considerations

[Any performance implications]
```

### 4. Write Tests

For each `tests.md`, include:

```markdown
# Tests: {Spec Name}

## Unit Tests

### {Component/Function Name}

**Test:** [What is being tested]
**Input:** [Test input]
**Expected Output:** [Expected result]
**Validation:** [How to verify]

## Integration Tests

### {Integration Scenario}

**Test:** [What integration is being tested]
**Setup:** [Required setup]
**Steps:** [Test steps]
**Expected Result:** [What should happen]

## End-to-End Tests

### {User Scenario}

**Scenario:** [User story or scenario]
**Steps:** [Step-by-step actions]
**Expected Outcome:** [What the user should see/experience]

## Edge Cases

### {Edge Case}

**Scenario:** [Unusual or boundary condition]
**Expected Behavior:** [How system should handle it]

## Performance Tests

[If applicable, performance benchmarks or load tests]

## Security Tests

[If applicable, security validation tests]
```

### 5. Create Overall Tests

Create `.agentspec/eco/{eco-name}/tests.md`:

```markdown
# ECO Tests: {ECO Name}

## Pre-Implementation Checklist

- [ ] All specifications reviewed
- [ ] Dependencies identified
- [ ] Test environment prepared

## Implementation Validation

- [ ] All spec tests pass
- [ ] Integration between specs works
- [ ] No regressions in existing functionality

## Acceptance Criteria

[From details.md success criteria, converted to testable items]

- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Manual Verification Steps

1. [Step 1]
2. [Step 2]

## Rollback Plan

[How to undo changes if something goes wrong]
```

### 6. Create Implementation Plan

Create `.agentspec/eco/{eco-name}/plan.md`:

```markdown
# Implementation Plan: {ECO Name}

## Phase 1: Preparation

- [ ] Review all specifications
- [ ] Set up development environment
- [ ] Create feature branch (if applicable)
- [ ] Identify and document dependencies

## Phase 2: {Spec Name 1}

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3
- [ ] Run {spec-name-1} tests

## Phase 3: {Spec Name 2}

- [ ] Task 1
- [ ] Task 2
- [ ] Run {spec-name-2} tests

## Phase 4: Integration

- [ ] Integrate all specifications
- [ ] Run integration tests
- [ ] Verify no regressions

## Phase 5: Testing & Validation

- [ ] Run all unit tests
- [ ] Run all integration tests
- [ ] Run end-to-end tests
- [ ] Manual verification
- [ ] Performance testing (if applicable)

## Phase 6: Documentation

- [ ] Update relevant documentation
- [ ] Update API documentation (if applicable)
- [ ] Add inline code comments
- [ ] Update README (if applicable)

## Phase 7: Completion

- [ ] All tests passing
- [ ] Code reviewed
- [ ] User acceptance
- [ ] Ready to merge specs
```

### 7. Review with User

Present the plan to the user:
- Summarize the phases and approach
- Highlight any decisions you made
- Ask if they have concerns or want changes

### 8. Get Approval to Implement

Ask: "Does this plan look good? Should I proceed with implementation using the `agentspec-implement` workflow?"

## Notes

- Break work into logical phases
- Each phase should have clear, testable tasks
- Keep tasks granular enough to track progress
- Ensure tests actually validate the requirements
- Specifications should be detailed enough for implementation
- Consider both happy path and edge cases in tests
