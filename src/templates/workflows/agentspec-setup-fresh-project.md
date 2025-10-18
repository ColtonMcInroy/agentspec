---
description: Setup workflow for fresh projects - establish project foundation
auto_execution_mode: 1
---

# Workflow: Setup Fresh Project

This workflow guides you through establishing a new project from scratch. Follow these steps to create a comprehensive project.md that will guide all future development.

## Prerequisites

- AgentSpec initialized in fresh/empty project directory
- User ready to define project vision and requirements
- Onboarding rule active (`agentspec-onboarding-fresh.md`)

## Steps

### 1. Understand the Vision

Collaborate with the user to understand their project idea:

**Questions to Ask:**
- What problem does this project solve?
- Who will use this project?
- What are the key features or capabilities needed?
- What makes this project unique or valuable?
- Are there any similar projects or inspirations?
- What are the success criteria?

**Capture in project.md:**
```markdown
## Project Overview

### Name
[Project Name]

### Description
[Clear, concise description of what the project does]

### Problem Statement
[What problem this solves]

### Target Audience
[Who will use this]

### Key Features
- Feature 1
- Feature 2
- Feature 3

### Success Criteria
- Criterion 1
- Criterion 2
```

### 2. Choose Technology Stack

Help the user select appropriate technologies:

**Considerations:**
- Project requirements and constraints
- User's experience and preferences
- Team expertise (if applicable)
- Performance requirements
- Scalability needs
- Deployment platform
- Community support and ecosystem

**Provide Recommendations:**
- Suggest 2-3 options for each technology decision
- Explain pros and cons
- Recommend a default based on requirements
- Consider modern best practices

**Example Technology Decisions:**
- **Language**: Python, TypeScript, Go, Rust, etc.
- **Framework**: React, Vue, FastAPI, Express, etc.
- **Database**: PostgreSQL, MongoDB, SQLite, etc.
- **Deployment**: Vercel, AWS, Docker, etc.

**Capture in project.md:**
```markdown
## Technology Stack

### Core Technologies
- **Language**: [Language and version]
- **Framework**: [Primary framework]
- **Database**: [Database system]

### Key Libraries
- [Library 1] - [Purpose]
- [Library 2] - [Purpose]

### Development Tools
- **Package Manager**: [npm, pip, cargo, etc.]
- **Build Tool**: [webpack, vite, etc.]
- **Testing**: [jest, pytest, etc.]
- **Linting**: [eslint, pylint, etc.]

### Deployment
- **Platform**: [Vercel, AWS, etc.]
- **CI/CD**: [GitHub Actions, etc.]
```

### 3. Design Architecture

Plan the high-level architecture:

**Architectural Patterns:**
- Monolith vs. Microservices
- Client-Server, MVC, Layered, etc.
- Event-driven, REST API, GraphQL, etc.

**Components to Define:**
- Frontend (if applicable)
- Backend/API
- Database/Storage
- External services
- Authentication/Authorization

**Data Flow:**
- How data moves through the system
- State management approach
- Caching strategy

**Capture in project.md:**
```markdown
## Architecture

### High-Level Architecture
```
[Text-based diagram showing major components and their relationships]
```

### Components

#### Frontend
- **Technology**: [React, Vue, etc.]
- **Responsibility**: [What it does]
- **Key Features**: [Main features]

#### Backend
- **Technology**: [Express, FastAPI, etc.]
- **Responsibility**: [What it does]
- **API Design**: [REST, GraphQL, etc.]

#### Database
- **Technology**: [PostgreSQL, etc.]
- **Schema Design**: [Overview of data model]
- **Access Pattern**: [How data is accessed]

### Data Flow
1. [Step 1 of data flow]
2. [Step 2 of data flow]
3. [Step 3 of data flow]

### External Integrations
- [Service 1] - [Purpose]
- [Service 2] - [Purpose]
```

### 4. Plan Project Structure

Define how the project will be organized:

**Directory Structure:**
- Logical organization
- Separation of concerns
- Scalability considerations
- Framework conventions

**Naming Conventions:**
- File naming patterns
- Component/module naming
- Variable/function naming

**Capture in project.md:**
```markdown
## Project Structure

### Directory Organization
```
project-root/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── types/          # Type definitions
├── tests/              # Test files
├── docs/               # Documentation
├── .agentspec/         # AgentSpec files
└── README.md
```

### File Naming Conventions
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Tests: `*.test.ts` or `*.spec.ts`

### Module Organization
[Explain how modules/packages are organized]
```

### 5. Establish Development Standards

Define coding and development standards:

**Code Style:**
- Formatting rules
- Linting configuration
- Code organization patterns

**Testing:**
- Testing approach (unit, integration, e2e)
- Coverage requirements
- Testing frameworks

**Documentation:**
- Code comments
- API documentation
- README requirements

**Git Workflow:**
- Branching strategy
- Commit message format
- PR/review process

**Capture in project.md:**
```markdown
## Development Standards

### Code Style
- **Formatter**: [Prettier, Black, etc.]
- **Linter**: [ESLint, Pylint, etc.]
- **Style Guide**: [Airbnb, Google, etc.]

### Testing Requirements
- **Unit Tests**: Required for all business logic
- **Integration Tests**: Required for API endpoints
- **Coverage Target**: 80% minimum
- **Framework**: [Jest, Pytest, etc.]

### Documentation Standards
- All public APIs must be documented
- Complex logic requires inline comments
- README must be kept up-to-date
- Architecture decisions documented in docs/

### Git Workflow
- **Branching**: feature/*, bugfix/*, hotfix/*
- **Commits**: Conventional Commits format
- **PRs**: Require review before merge
- **Main Branch**: Protected, always deployable
```

### 6. Create Getting Started Guide

Provide setup and development instructions:

**Setup Steps:**
- Prerequisites
- Installation
- Configuration
- First run

**Development Workflow:**
- Common commands
- Development server
- Running tests
- Building for production

**Capture in project.md:**
```markdown
## Getting Started

### Prerequisites
- [Tool 1] version X.X
- [Tool 2] version Y.Y

### Installation
```bash
# Clone repository
git clone [repo-url]

# Install dependencies
[package-manager] install

# Configure environment
cp .env.example .env
# Edit .env with your settings
```

### Development
```bash
# Start development server
[command]

# Run tests
[command]

# Build for production
[command]
```

### Common Commands
- `[command]` - [Description]
- `[command]` - [Description]

### Troubleshooting
[Common issues and solutions]
```

### 7. Review and Refine

Review the complete project.md with the user:

1. **Read through together** - Ensure everything makes sense
2. **Verify completeness** - All sections filled out
3. **Check consistency** - No contradictions
4. **Validate decisions** - Technology choices align with goals
5. **Get user approval** - Confirm they're satisfied

### 8. Finalize Setup

Once the user approves project.md, inform them:

```
Your project.md is complete and ready! 

To finalize the setup and begin development, run the 
`agentspec-finalize-setup` workflow. This will:

1. Replace onboarding files with production AgentSpec files
2. Enable ECO-based development workflows
3. Optionally create your first ECO for initial implementation

After finalization, we'll work together using Engineering Change 
Orders to build your project systematically.
```

## Success Criteria

- [ ] Project vision and goals clearly defined
- [ ] Technology stack selected and justified
- [ ] Architecture designed and documented
- [ ] Project structure planned
- [ ] Development standards established
- [ ] Getting started guide complete
- [ ] User has reviewed and approved project.md
- [ ] User ready to run `agentspec-finalize-setup`

## Tips

- **Be thorough but not overwhelming** - Start high-level, add detail as needed
- **Justify recommendations** - Explain why you suggest certain technologies
- **Stay flexible** - Be ready to adjust based on user feedback
- **Think ahead** - Consider how decisions impact future development
- **Document reasoning** - Explain why choices were made
