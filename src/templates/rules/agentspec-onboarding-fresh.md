---
trigger: always_on
description: Onboarding rule for fresh projects - helps establish project foundation
---

# AgentSpec Onboarding - Fresh Project

**This is a temporary rule active during initial project setup. It will be replaced when you run the `agentspec-finalize-setup` workflow.**

## Your Current Task

You are helping the user establish a new project from scratch. Your goal is to collaborate with them to:

1. Define the project vision and goals
2. Choose the technology stack
3. Plan the initial architecture
4. Establish development standards
5. Create the project structure

## Key Principles for Fresh Projects

### 1. Start with Vision

Before any code:
- Understand what problem the project solves
- Identify the target users/audience
- Define success criteria
- Establish project scope and boundaries

### 2. Technology Decisions

Help the user make informed choices:
- Recommend technologies based on requirements
- Explain trade-offs of different options
- Consider team expertise and project needs
- Think about scalability and maintenance

### 3. Architecture Planning

Design before building:
- Propose architectural patterns
- Identify major components/modules
- Plan data flow and storage
- Consider deployment and infrastructure

### 4. Development Standards

Establish conventions early:
- Code style and formatting
- Testing approach
- Documentation requirements
- Git workflow and branching strategy

## Working with project.md

The `.agentspec/project.md` file is your primary deliverable. It should contain:

### Required Sections

1. **Project Overview**
   - Name and description
   - Problem statement
   - Target audience
   - Key features/capabilities

2. **Technology Stack**
   - Languages and frameworks
   - Key libraries and tools
   - Development environment
   - Deployment platform

3. **Architecture**
   - High-level architecture diagram (text-based)
   - Major components and their responsibilities
   - Data flow and storage strategy
   - External integrations

4. **Project Structure**
   - Directory organization
   - File naming conventions
   - Module/package structure

5. **Development Standards**
   - Code style guidelines
   - Testing requirements
   - Documentation standards
   - Review process

6. **Getting Started**
   - Setup instructions
   - Development workflow
   - Common commands
   - Troubleshooting

## Collaboration Approach

### Ask Questions

Don't assume - ask the user about:
- Their experience level
- Project timeline and constraints
- Specific requirements or preferences
- Existing tools or infrastructure

### Provide Options

When making recommendations:
- Present multiple viable options
- Explain pros and cons
- Recommend a default but allow user choice
- Justify your recommendations

### Iterate

The project.md will evolve:
- Start with high-level vision
- Add detail progressively
- Refine based on user feedback
- Keep it practical and actionable

## Using the Setup Workflow

Follow the `agentspec-setup-fresh-project` workflow to guide the process systematically. This workflow will help you:

1. Gather requirements
2. Make technology decisions
3. Design architecture
4. Plan project structure
5. Establish standards
6. Create initial project.md

## When Setup is Complete

Once the user is satisfied with project.md, they will run the `agentspec-finalize-setup` workflow, which will:

1. Replace this onboarding rule with the production `agentspec.md` rule
2. Deploy production workflows for ECO-based development
3. Optionally create the first ECO for initial implementation
4. Update AGENTS.md with final instructions

After finalization, you'll work within the ECO framework to build the project.

## Important Notes

- **Don't write code yet** - Focus on planning and design
- **Be thorough** - A solid foundation prevents future problems
- **Stay flexible** - Plans can evolve as you learn more
- **Document decisions** - Explain why choices were made
- **Think long-term** - Consider maintainability and scalability
