---
description: Setup workflow for existing projects - analyze and document current state
auto_execution_mode: 1
---

# Workflow: Setup Existing Project

This workflow guides you through analyzing an existing project and creating a comprehensive project.md that captures the current state and prepares for future ECO-based development.

## Prerequisites

- AgentSpec initialized in existing project directory
- Project has existing code and/or documentation
- Onboarding rule active (`agentspec-onboarding-existing.md`)

## Steps

### 1. Analyze Existing Documentation

Start by reading what's already documented:

**Files to Check:**
- `README.md` - Project overview and setup
- `CONTRIBUTING.md` - Development guidelines
- `docs/` folder - Additional documentation
- `CHANGELOG.md` - Project history
- Code comments - Inline documentation

**Extract Information:**
- Project purpose and description
- Key features
- Setup instructions
- Development workflow
- Known issues or limitations

**Note Gaps:**
- What's missing or unclear
- Outdated information
- Undocumented features

### 2. Examine Configuration Files

Identify the technology stack from config files:

**Package/Dependency Files:**
- `package.json` (Node.js)
- `requirements.txt` or `pyproject.toml` (Python)
- `go.mod` (Go)
- `Cargo.toml` (Rust)
- `pom.xml` or `build.gradle` (Java)
- `Gemfile` (Ruby)

**Build Configuration:**
- `webpack.config.js`, `vite.config.js`
- `tsconfig.json`
- `babel.config.js`
- `.eslintrc`, `.prettierrc`
- `Makefile`, `justfile`

**Infrastructure:**
- `Dockerfile`, `docker-compose.yml`
- `.github/workflows/` (GitHub Actions)
- `.gitlab-ci.yml` (GitLab CI)
- `vercel.json`, `netlify.toml`
- Cloud configs (AWS, GCP, Azure)

**Environment:**
- `.env.example`
- Config files in `config/`

**Extract Information:**
- Languages and versions
- Frameworks and major libraries
- Build tools and processes
- Deployment platform
- Development tools (linters, formatters, etc.)

### 3. Analyze Code Structure

Explore the codebase to understand architecture:

**Directory Structure:**
- List all top-level directories
- Identify purpose of each directory
- Note organization patterns
- Find entry points (main files)

**Code Patterns:**
- Identify architectural pattern (MVC, layered, etc.)
- Note module organization
- Observe naming conventions
- Find common patterns

**Key Components:**
- Frontend (if applicable)
- Backend/API
- Database access layer
- Shared utilities
- External integrations

**Data Flow:**
- How requests are handled
- State management approach
- Database interactions
- API communication

**Ask User for Clarification:**
- Unclear architectural decisions
- Purpose of specific directories
- Unusual patterns or structures
- Historical context

### 4. Review Testing Setup

Understand the testing approach:

**Test Files:**
- Location of test files
- Testing frameworks used
- Test organization
- Coverage setup

**Test Types:**
- Unit tests
- Integration tests
- End-to-end tests
- Performance tests

**Test Commands:**
- How to run tests
- Coverage reports
- CI/CD integration

### 5. Document Current State

Create comprehensive project.md based on your analysis:

**Start with Template:**
```markdown
## Project Overview

### Name
[From README or package.json]

### Description
[From README]

### Current Features
- [Feature 1 from docs/code]
- [Feature 2 from docs/code]
- [Feature 3 from docs/code]

### Target Audience
[From README or inferred]

## Technology Stack

### Core Technologies
- **Language**: [Language and version from configs]
- **Framework**: [Primary framework from package files]
- **Database**: [Database from code/configs]

### Key Libraries
[From package files]
- [Library 1] - [Purpose from usage]
- [Library 2] - [Purpose from usage]

### Development Tools
- **Package Manager**: [npm, pip, etc.]
- **Build Tool**: [From configs]
- **Testing**: [From test files]
- **Linting**: [From configs]
- **Formatting**: [From configs]

### Deployment
- **Platform**: [From infrastructure configs]
- **CI/CD**: [From .github/workflows, etc.]

## Architecture

### High-Level Architecture
[Describe based on code structure]

### Components

[For each major component:]
#### [Component Name]
- **Location**: [Directory path]
- **Responsibility**: [What it does]
- **Key Files**: [Important files]

### Data Flow
[Describe how data moves through the system]

### External Integrations
[From code/configs]
- [Service 1] - [Purpose]
- [Service 2] - [Purpose]

## Project Structure

### Directory Organization
```
[Actual directory tree]
```

### File Naming Conventions
[Observed patterns]

### Module Organization
[How code is organized into modules]

## Development Standards

### Code Style
[Observed from codebase and configs]
- **Formatter**: [From configs]
- **Linter**: [From configs]
- **Style Patterns**: [Observed patterns]

### Testing Requirements
[From test files and configs]
- **Test Location**: [Where tests live]
- **Coverage**: [Current coverage if available]
- **Framework**: [Testing framework]

### Documentation Standards
[Observed patterns]
- [Documentation approach]

### Git Workflow
[From .git history and branch structure]
- **Branching**: [Observed pattern]
- **Commits**: [Observed format]

## Current State

### Active Features
[List current capabilities]

### Known Issues
[From issues, TODOs, or user input]

### Recent Changes
[From CHANGELOG or git history]

### Technical Debt
[Areas identified for improvement]

## Getting Started

### Prerequisites
[From README and configs]

### Installation
```bash
[From README]
```

### Development
```bash
[Common commands from package.json, Makefile, etc.]
```

### Common Commands
[From scripts in package.json, Makefile, etc.]

### Troubleshooting
[From README or docs]
```

### 6. Identify Improvement Opportunities

Note areas where AgentSpec can help:

**Potential ECOs:**
- Missing tests
- Undocumented features
- Technical debt
- New features
- Refactoring needs
- Performance improvements
- Security updates

**Capture in project.md:**
```markdown
## Future Improvements

### High Priority
- [Improvement 1]
- [Improvement 2]

### Medium Priority
- [Improvement 3]
- [Improvement 4]

### Low Priority
- [Improvement 5]
```

### 7. Generate Initial Specifications

Create baseline specifications for the existing project in `.agentspec/specs/`:

**Identify Major Components:**

Based on your analysis, identify the major subsystems that need specifications:
- Frontend (if applicable)
- Backend/API
- Database
- Infrastructure
- External integrations
- Other major components

**Create Spec Files:**

For each major component, create a specification directory with `spec.md` and `tests.md`:

**Example: Backend API Spec**

`.agentspec/specs/backend/spec.md`:
```markdown
# Backend API Specification

## Overview
[Description of the backend API from your analysis]

## Technology Stack
- **Framework**: [e.g., Express.js, FastAPI]
- **Language**: [e.g., Node.js, Python]
- **Database**: [e.g., PostgreSQL, MongoDB]

## Architecture
[Current architecture from your analysis]

## API Endpoints

### [Endpoint Category 1]
[Document existing endpoints you found]

#### GET /api/[resource]
- **Purpose**: [What it does]
- **Parameters**: [Query params, path params]
- **Response**: [Response format]
- **Authentication**: [Auth requirements]

[Continue for other endpoints...]

## Data Models
[Document existing data structures]

## Authentication & Authorization
[Current auth approach]

## Error Handling
[Current error handling patterns]

## Performance Considerations
[Any performance patterns observed]

## Known Issues
[Technical debt or issues identified]
```

`.agentspec/specs/backend/tests.md`:
```markdown
# Backend API Tests

## Test Coverage
[Current test coverage if available]

## Test Framework
[Testing framework used]

## Test Categories

### Unit Tests
[Existing unit tests]

### Integration Tests
[Existing integration tests]

### API Tests
[Existing API tests]

## Test Commands
```bash
[How to run tests from package.json or Makefile]
```

## Coverage Requirements
[Current or desired coverage levels]
```

**Create Specs for Each Component:**

Repeat this process for:
- Frontend (if applicable)
- Database schema
- Infrastructure/deployment
- Any other major components

**Keep Specs Factual:**
- Document what currently exists
- Note gaps or missing tests
- Capture current patterns and conventions
- Don't redesign - just document

### 8. Review with User

Go through project.md and generated specs with the user:

**Verify Accuracy:**
- Is the description correct?
- Are all technologies captured?
- Is the architecture accurate?
- Are there missing components?
- Do the specs accurately reflect the current state?

**Clarify Uncertainties:**
- Ask about unclear patterns
- Confirm architectural decisions
- Verify deployment process
- Understand historical context

**Get Approval:**
- User confirms accuracy of project.md
- User confirms specs reflect current state
- User satisfied with completeness
- Ready to move to production mode

### 9. Finalize Setup

Once the user approves project.md, inform them:

```
Your project.md is complete and accurately reflects your project!

To finalize the setup and begin ECO-based development, run the 
`agentspec-finalize-setup` workflow. This will:

1. Replace onboarding files with production AgentSpec files
2. Enable ECO-based development workflows
3. Optionally create your first ECO for planned improvements

After finalization, we'll work together using Engineering Change 
Orders to enhance and maintain your project systematically.
```

## Success Criteria

- [ ] All existing documentation reviewed
- [ ] Technology stack identified from configs
- [ ] Code structure analyzed and understood
- [ ] Testing approach documented
- [ ] Comprehensive project.md created
- [ ] Improvement opportunities identified
- [ ] User has reviewed and confirmed accuracy
- [ ] User ready to run `agentspec-finalize-setup`

## Tips

- **Be thorough** - Examine all aspects of the project
- **Ask questions** - User knows the project best
- **Stay objective** - Document what exists, not what should be
- **Note gaps** - Identify missing documentation or tests
- **Think forward** - Prepare for future ECO-based improvements
- **Respect history** - Understand why things are the way they are
