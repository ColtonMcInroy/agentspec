import chalk from 'chalk';
import { AgentSpecPaths, AGENTSPEC_VERSION } from '../utils/paths.js';
import { copyTemplate, TEMPLATE_FILES } from '../utils/templates.js';
import fs from 'fs-extra';
import path from 'path';

async function detectProjectType(rootDir: string): Promise<'fresh' | 'existing'> {
  // Check for common project indicators
  const indicators = [
    'package.json',
    'requirements.txt',
    'pyproject.toml',
    'go.mod',
    'Cargo.toml',
    'pom.xml',
    'build.gradle',
    'Gemfile',
    'composer.json',
    'src',
    'lib',
    'app',
    'main.py',
    'main.go',
    'main.rs',
    'index.js',
    'index.ts',
  ];

  for (const indicator of indicators) {
    if (await fs.pathExists(path.join(rootDir, indicator))) {
      return 'existing';
    }
  }

  // Check if directory has any significant files (more than just .git, README, etc.)
  const files = await fs.readdir(rootDir);
  const significantFiles = files.filter(f => 
    !f.startsWith('.') && 
    f !== 'README.md' && 
    f !== 'LICENSE' && 
    f !== 'CHANGELOG.md' &&
    f !== 'CONTRIBUTING.md'
  );

  return significantFiles.length > 0 ? 'existing' : 'fresh';
}

export async function initCommand(): Promise<void> {
  const rootDir = process.cwd();
  const paths = new AgentSpecPaths(rootDir);

  try {
    // Check if already initialized
    if (await paths.isInitialized()) {
      console.error(chalk.red('Error: AgentSpec is already initialized in this directory.'));
      console.log(chalk.yellow('The .agentspec directory already exists.'));
      process.exit(1);
    }

    console.log(chalk.blue('Initializing AgentSpec...'));

    // Detect project type
    const projectType = await detectProjectType(rootDir);
    console.log(chalk.gray(`Detected ${projectType} project`));

    // Create directory structure
    console.log(chalk.gray('Creating directory structure...'));
    await fs.ensureDir(paths.agentspecDir);
    await fs.ensureDir(paths.ecoDir);
    await fs.ensureDir(paths.finishedEcoDir);
    await fs.ensureDir(paths.specsDir);
    await fs.ensureDir(paths.rulesDir);
    await fs.ensureDir(paths.workflowsDir);

    // Deploy AGENTS.md
    console.log(chalk.gray('Deploying AGENTS.md...'));
    await copyTemplate(TEMPLATE_FILES.AGENTS, paths.agentsFile);

    // Deploy core files
    console.log(chalk.gray('Deploying core files...'));
    await copyTemplate(TEMPLATE_FILES.PROJECT, paths.projectFile);
    await copyTemplate(TEMPLATE_FILES.INSTRUCTIONS, paths.instructionsFile);

    // Write version file
    await fs.writeFile(paths.versionFile, AGENTSPEC_VERSION, 'utf-8');

    // Deploy onboarding files based on project type
    console.log(chalk.gray('Deploying onboarding files...'));
    if (projectType === 'fresh') {
      await copyTemplate(TEMPLATE_FILES.RULES_ONBOARDING_FRESH, paths.ruleFile('agentspec-onboarding-fresh'));
      await copyTemplate(TEMPLATE_FILES.WORKFLOW_SETUP_FRESH, paths.workflowFile('agentspec-setup-fresh-project'));
    } else {
      await copyTemplate(TEMPLATE_FILES.RULES_ONBOARDING_EXISTING, paths.ruleFile('agentspec-onboarding-existing'));
      await copyTemplate(TEMPLATE_FILES.WORKFLOW_SETUP_EXISTING, paths.workflowFile('agentspec-setup-existing-project'));
    }
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_FINALIZE_SETUP, paths.workflowFile('agentspec-finalize-setup'));

    // Sync to Windsurf directories
    console.log(chalk.gray('Syncing to Windsurf directories...'));
    await fs.ensureDir(paths.windsurfRulesDir);
    await fs.ensureDir(paths.windsurfWorkflowsDir);
    
    // Copy onboarding files to Windsurf
    if (projectType === 'fresh') {
      await copyTemplate(TEMPLATE_FILES.RULES_ONBOARDING_FRESH, paths.windsurfRuleFile('agentspec-onboarding-fresh'));
      await copyTemplate(TEMPLATE_FILES.WORKFLOW_SETUP_FRESH, paths.windsurfWorkflowFile('agentspec-setup-fresh-project'));
    } else {
      await copyTemplate(TEMPLATE_FILES.RULES_ONBOARDING_EXISTING, paths.windsurfRuleFile('agentspec-onboarding-existing'));
      await copyTemplate(TEMPLATE_FILES.WORKFLOW_SETUP_EXISTING, paths.windsurfWorkflowFile('agentspec-setup-existing-project'));
    }
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_FINALIZE_SETUP, paths.windsurfWorkflowFile('agentspec-finalize-setup'));

    console.log();
    console.log(chalk.green('✓ AgentSpec initialized in onboarding mode!'));
    console.log();
    console.log(chalk.bold(`Project Type: ${projectType === 'fresh' ? 'Fresh Project' : 'Existing Project'}`));
    console.log();
    console.log(chalk.bold('Next steps:'));
    if (projectType === 'fresh') {
      console.log(chalk.gray('1. Work with your agent using the agentspec-setup-fresh-project workflow'));
      console.log(chalk.gray('2. Collaborate to define your project vision and architecture'));
      console.log(chalk.gray('3. Complete .agentspec/project.md with project details'));
    } else {
      console.log(chalk.gray('1. Work with your agent using the agentspec-setup-existing-project workflow'));
      console.log(chalk.gray('2. Let the agent analyze your existing codebase'));
      console.log(chalk.gray('3. Review and approve the generated .agentspec/project.md'));
    }
    console.log(chalk.gray('4. Run the agentspec-finalize-setup workflow when ready'));
    console.log();
    console.log(chalk.yellow('After finalization, AgentSpec will transition to production mode for ECO-based development.'));
    console.log();
  } catch (error) {
    console.error(chalk.red('Error initializing AgentSpec:'), error);
    process.exit(1);
  }
}
