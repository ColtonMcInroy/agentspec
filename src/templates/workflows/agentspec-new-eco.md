---
description: Workflow for creating a new Engineering Change Order
auto_execution_mode: 1
---

# Workflow: Create New Engineering Change Order

This workflow guides the creation of a new ECO.

## Prerequisites

- AgentSpec is initialized in the project
- You have read `project.md` and understand the project context

## Steps

### 1. Understand the Request

Ask clarifying questions to understand:
- What needs to be changed or added?
- Why is this change needed?
- What problem does it solve?
- Are there any constraints or requirements?

### 2. Generate ECO Name

Based on the user's input, generate a descriptive ECO name:
- Use kebab-case (e.g., `add-user-authentication`)
- Keep it concise but clear
- Make it unique (check `.agentspec/eco/` for existing ECOs)

### 3. Create ECO Directory

Create the directory structure:
```
.agentspec/eco/{eco-name}/
└── details.md
```

### 4. Draft Details

Create `details.md` with the following structure:

```markdown
# ECO: {Descriptive Title}

## Overview

[Brief description of what this ECO accomplishes]

## Motivation

[Why this change is needed]

## Goals

- [Goal 1]
- [Goal 2]
- [Goal 3]

## Scope

### In Scope
- [What will be changed/added]

### Out of Scope
- [What will NOT be changed/added]

## Affected Components

- [Component 1]
- [Component 2]

## Dependencies

- [Any dependencies on other work or systems]

## Risks and Considerations

- [Potential risks or things to be aware of]

## Success Criteria

- [How we'll know this ECO is complete]
- [What the end state should look like]
```

### 5. Collaborate with User

Present the draft `details.md` to the user and:
- Ask if anything is missing or unclear
- Refine based on their feedback
- Iterate until they're satisfied

### 6. Get Approval

Explicitly ask: "Does this accurately capture what you want to accomplish? Should I proceed with planning?"

### 7. Wait for Approval

**STOP HERE** until the user approves. Do not create `plan.md`, `tests.md`, or spec files yet.

### 8. Inform User of Next Steps

Once approved, inform the user:
"The ECO details are approved. Next, I'll create the implementation plan. Would you like me to proceed with the `agentspec-plan` workflow?"

## Notes

- Keep details focused on WHAT and WHY, not HOW
- Details should be understandable by non-technical stakeholders
- Be specific about scope to prevent scope creep
- If the request is very large, suggest breaking it into multiple ECOs
