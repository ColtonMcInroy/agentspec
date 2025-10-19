---
trigger: always_on
description: Onboarding rule for existing projects - helps understand and document current state
---

# AgentSpec Onboarding - Existing Project

**This is a temporary rule active during initial project setup. It will be replaced when you run the `agentspec-finalize-setup` workflow.**

## Your Current Task

You are helping the user integrate AgentSpec into an existing project. Your goal is to:

1. Understand the current project structure and codebase
2. Identify the technology stack and architecture
3. Document existing patterns and conventions
4. Capture the current state in project.md
5. Generate baseline specifications for existing components
6. Prepare for future ECO-based development

## Key Principles for Existing Projects

### 1. Observe Before Changing

Don't modify anything yet:
- Read and understand existing code
- Identify patterns and conventions
- Note architectural decisions
- Understand the current state

### 2. Comprehensive Analysis

Examine all aspects:
- **Codebase** - Languages, frameworks, structure
- **Documentation** - README, docs, comments
- **Configuration** - Build files, env vars, configs
- **Dependencies** - Package files, requirements
- **Tests** - Test files, coverage, approach
- **Infrastructure** - Deployment, CI/CD, hosting

### 3. Respect Existing Patterns

Document what exists:
- Don't impose new patterns yet
- Capture current conventions
- Note both strengths and areas for improvement
- Preserve institutional knowledge

### 4. Identify Gaps

Note what's missing or unclear:
- Undocumented features
- Unclear architecture decisions
- Missing tests or documentation
- Technical debt areas

## Working with project.md

The `.agentspec/project.md` file should accurately reflect the current state:

### Required Sections

1. **Project Overview**
   - What the project does (from README/docs)
   - Current features and capabilities
   - Target users/audience
   - Project history/context (if available)

2. **Technology Stack**
   - Languages and versions (from code/configs)
   - Frameworks and libraries (from package files)
   - Development tools (from configs)
   - Deployment platform (from infrastructure)

3. **Architecture**
   - Current architecture (inferred from code structure)
   - Major components and their roles
   - Data flow and storage
   - External integrations and APIs

4. **Project Structure**
   - Directory organization (from file system)
   - File naming patterns (observed)
   - Module/package structure
   - Key files and their purposes

5. **Development Standards**
   - Code style (observed from codebase)
   - Testing approach (from test files)
   - Documentation patterns (from existing docs)
   - Git workflow (from .git history if available)

6. **Current State**
   - Active features
   - Known issues or technical debt
   - Recent changes or ongoing work
   - Deployment status

7. **Getting Started**
   - Setup instructions (from README)
   - Development workflow
   - Common commands (from package.json, Makefile, etc.)
   - Environment requirements

## Analysis Approach

### 1. Start with Documentation

Read existing docs first:
- README.md
- CONTRIBUTING.md
- docs/ folder
- Code comments
- Commit messages

### 2. Examine Configuration

Check config files:
- package.json, requirements.txt, go.mod, etc.
- Build configs (webpack, vite, etc.)
- CI/CD configs (.github/workflows, .gitlab-ci.yml)
- Environment configs (.env.example)

### 3. Analyze Code Structure

Explore the codebase:
- Entry points (main files)
- Directory organization
- Module dependencies
- Common patterns

### 4. Review Tests

Understand testing:
- Test files and structure
- Testing frameworks
- Coverage approach
- Test patterns

### 5. Check Infrastructure

Look for deployment info:
- Dockerfile, docker-compose.yml
- Deployment scripts
- Cloud configs
- Database schemas

## Collaboration Approach

### Ask Clarifying Questions

The user knows the project best:
- Ask about unclear architectural decisions
- Confirm your understanding of components
- Request context for unusual patterns
- Verify deployment and infrastructure details

### Highlight Findings

Share what you discover:
- Summarize the architecture
- Note interesting patterns
- Identify potential areas for improvement
- Ask about undocumented features

### Be Thorough but Concise

In project.md:
- Capture essential information
- Don't duplicate existing docs
- Link to existing documentation
- Focus on what agents need to know

## Using the Setup Workflow

Follow the `agentspec-setup-existing-project` workflow to guide the analysis systematically. This workflow will help you:

1. Analyze existing documentation
2. Examine the codebase structure
3. Identify technology stack
4. Document architecture
5. Capture development standards
6. Create comprehensive project.md
7. Generate baseline specifications in `.agentspec/specs/`

## When Setup is Complete

Once the user is satisfied with project.md, they will run the `agentspec-finalize-setup` workflow, which will:

1. Replace this onboarding rule with the production `agentspec.md` rule
2. Deploy production workflows for ECO-based development
3. Optionally create the first ECO for planned improvements
4. Update AGENTS.md with final instructions

After finalization, you'll work within the ECO framework to enhance and maintain the project.

## Important Notes

- **Don't modify code** - Only analyze and document
- **Be accurate** - Reflect the actual current state
- **Note uncertainties** - Flag things you're unsure about
- **Respect history** - Understand why things are the way they are
- **Think forward** - Prepare for future ECO-based development
