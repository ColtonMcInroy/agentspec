# Changelog

All notable changes to AgentSpec will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-10-19

### Fixed

- **Dynamic Version Loading** - CLI now loads version number from `package.json` instead of hardcoded value
- `agentspec --version` now correctly displays the current version from package.json

### Changed

- Updated imports in `cli.ts` to use `node:` prefix for built-in modules (fs, url, path) following Node.js best practices

## [1.1.0] - 2025-10-19

### Added

- **Baseline Specification Generation** - Existing project onboarding now includes automatic generation of initial specifications in `.agentspec/specs/`
- New step in `agentspec-setup-existing-project` workflow to create spec files for major components (frontend, backend, database, etc.)
- Comprehensive spec templates with examples for documenting existing systems
- Updated `agentspec-onboarding-existing.md` rule to include spec generation in goals

### Changed

- Enhanced existing project onboarding workflow with detailed spec generation guidance
- Improved documentation for capturing current state of existing projects

### Why This Matters

When integrating AgentSpec into an existing project, it's crucial to have baseline specifications that document the current state. This allows future ECOs to build upon and modify existing specs rather than starting from scratch. Without initial specs, the first ECO would have no context about what currently exists.

## [1.0.0] - 2025-10-18

### Added

- Initial release of AgentSpec
- CLI tool with Commander.js
- `init` command to initialize AgentSpec in projects
- `list` command to list ECOs and specifications
- `show` command to display ECO details
- `validate` command to validate ECOs before finishing
- `finish` command to merge specs and archive ECOs
- `view` command with interactive TUI built with Ink
- `update` command to update AgentSpec files
- Template files for AGENTS.md, project.md, instructions.md
- AgentSpec rules for guided development
- Six workflows: new-eco, plan, implement, troubleshoot, refactor, finish
- ECO (Engineering Change Order) system
- Specification management system
- Comprehensive documentation and README

### Features

- Structured approach to agentic development
- Persistent context across AI conversations
- Task tracking with markdown checkboxes
- Specification versioning and merging
- ECO archival system
- Interactive TUI for browsing ECOs and specs
- Template-based initialization
- Version tracking and updates

## [Unreleased]

### Planned

- Test suite with Jest
- CI/CD pipeline
- Example projects
- Video tutorials
- Integration with popular IDEs
- ECO templates for common patterns
- Specification validation rules
- Export/import ECOs
- ECO dependencies and relationships
- Progress visualization
