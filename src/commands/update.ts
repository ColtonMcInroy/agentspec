import chalk from 'chalk';
import { AgentSpecPaths, AGENTSPEC_VERSION } from '../utils/paths.js';
import { copyTemplate, TEMPLATE_FILES } from '../utils/templates.js';
import fs from 'fs-extra';

export async function updateCommand(): Promise<void> {
  const paths = new AgentSpecPaths();

  try {
    // Check if initialized
    if (!(await paths.isInitialized())) {
      console.error(chalk.red('Error: AgentSpec is not initialized in this directory.'));
      console.log(chalk.yellow('Run "agentspec init" first.'));
      process.exit(1);
    }

    // Read current version
    const versionFile = paths.versionFile;
    let currentVersion = '0.0.0';
    
    if (await fs.pathExists(versionFile)) {
      currentVersion = (await fs.readFile(versionFile, 'utf-8')).trim();
    }

    console.log(chalk.blue('Updating AgentSpec...'));
    console.log(chalk.gray(`Current version: ${currentVersion}`));
    console.log(chalk.gray(`Latest version: ${AGENTSPEC_VERSION}`));
    console.log();

    if (currentVersion === AGENTSPEC_VERSION) {
      console.log(chalk.green('✓ AgentSpec is already up to date!'));
      return;
    }

    // Update version file
    await fs.writeFile(versionFile, AGENTSPEC_VERSION, 'utf-8');

    // Update instructions
    console.log(chalk.gray('Updating instructions.md...'));
    await copyTemplate(TEMPLATE_FILES.INSTRUCTIONS, paths.instructionsFile);

    // Update rules
    console.log(chalk.gray('Updating rules/agentspec.md...'));
    await copyTemplate(TEMPLATE_FILES.RULES_AGENTSPEC, paths.ruleFile('agentspec'));

    // Update workflows
    console.log(chalk.gray('Updating workflows...'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_NEW_ECO, paths.workflowFile('agentspec-new-eco'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_PLAN, paths.workflowFile('agentspec-plan'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_IMPLEMENT, paths.workflowFile('agentspec-implement'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_TROUBLESHOOT, paths.workflowFile('agentspec-troubleshoot'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_REFACTOR, paths.workflowFile('agentspec-refactor'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_FINISH, paths.workflowFile('agentspec-finish'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_MANAGE_CONTEXT, paths.workflowFile('agentspec-manage-context'));

    // Sync to Windsurf directories
    console.log(chalk.gray('Syncing to Windsurf directories...'));
    await fs.ensureDir(paths.windsurfRulesDir);
    await fs.ensureDir(paths.windsurfWorkflowsDir);
    
    // Update rules in Windsurf
    await copyTemplate(TEMPLATE_FILES.RULES_AGENTSPEC, paths.windsurfRuleFile('agentspec'));
    
    // Update workflows in Windsurf
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_NEW_ECO, paths.windsurfWorkflowFile('agentspec-new-eco'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_PLAN, paths.windsurfWorkflowFile('agentspec-plan'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_IMPLEMENT, paths.windsurfWorkflowFile('agentspec-implement'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_TROUBLESHOOT, paths.windsurfWorkflowFile('agentspec-troubleshoot'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_REFACTOR, paths.windsurfWorkflowFile('agentspec-refactor'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_FINISH, paths.windsurfWorkflowFile('agentspec-finish'));
    await copyTemplate(TEMPLATE_FILES.WORKFLOW_MANAGE_CONTEXT, paths.windsurfWorkflowFile('agentspec-manage-context'));

    console.log();
    console.log(chalk.green(`✓ AgentSpec updated to version ${AGENTSPEC_VERSION}!`));
    console.log();
    console.log(chalk.bold('Updated files:'));
    console.log(chalk.gray('  • .agentspec/version'));
    console.log(chalk.gray('  • .agentspec/instructions.md'));
    console.log(chalk.gray('  • .agentspec/rules/agentspec.md'));
    console.log(chalk.gray('  • .agentspec/workflows/*.md'));
    console.log(chalk.gray('  • .windsurf/rules/agentspec.md'));
    console.log(chalk.gray('  • .windsurf/workflows/*.md'));
    console.log();
    console.log(chalk.yellow('Note: Your custom rules and project.md were not modified.'));
  } catch (error) {
    console.error(chalk.red('Error updating AgentSpec:'), error);
    process.exit(1);
  }
}
