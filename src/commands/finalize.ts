import chalk from 'chalk';
import fs from 'fs-extra';
import { AgentSpecPaths, AGENTSPEC_VERSION } from '../utils/paths.js';
import { copyTemplate, TEMPLATE_FILES } from '../utils/templates.js';

export async function finalizeCommand(): Promise<void> {
  const rootDir = process.cwd();
  const paths = new AgentSpecPaths(rootDir);

  console.log(chalk.bold('\nFinalizing AgentSpec setup...\n'));

  // Check if AgentSpec is initialized
  if (!await fs.pathExists(paths.agentspecDir)) {
    console.error(chalk.red('Error: AgentSpec is not initialized in this directory.'));
    console.log(chalk.gray('Run "agentspec init" first.'));
    process.exit(1);
  }

  // Check if already finalized (production rule exists and no onboarding rules)
  const productionRuleExists = await fs.pathExists(paths.ruleFile('agentspec'));
  const freshOnboardingExists = await fs.pathExists(paths.ruleFile('agentspec-onboarding-fresh'));
  const existingOnboardingExists = await fs.pathExists(paths.ruleFile('agentspec-onboarding-existing'));

  if (productionRuleExists && !freshOnboardingExists && !existingOnboardingExists) {
    console.log(chalk.yellow('⚠ AgentSpec is already finalized.'));
    console.log(chalk.gray('Onboarding files have already been replaced with production files.'));
    console.log();
    return;
  }

  if (!freshOnboardingExists && !existingOnboardingExists) {
    console.error(chalk.red('Error: No onboarding files found.'));
    console.log(chalk.gray('This project may have been initialized with an older version of AgentSpec.'));
    console.log(chalk.gray('Run "agentspec update" to get the latest files.'));
    process.exit(1);
  }

  console.log(chalk.gray('Removing onboarding files...'));

  // Remove onboarding rules
  if (await fs.pathExists(paths.ruleFile('agentspec-onboarding-fresh'))) {
    await fs.remove(paths.ruleFile('agentspec-onboarding-fresh'));
    await fs.remove(paths.windsurfRuleFile('agentspec-onboarding-fresh'));
  }
  if (await fs.pathExists(paths.ruleFile('agentspec-onboarding-existing'))) {
    await fs.remove(paths.ruleFile('agentspec-onboarding-existing'));
    await fs.remove(paths.windsurfRuleFile('agentspec-onboarding-existing'));
  }

  // Remove setup workflows
  const setupWorkflows = [
    'agentspec-setup-fresh-project',
    'agentspec-setup-existing-project',
    'agentspec-finalize-setup'
  ];

  for (const workflow of setupWorkflows) {
    if (await fs.pathExists(paths.workflowFile(workflow))) {
      await fs.remove(paths.workflowFile(workflow));
    }
    if (await fs.pathExists(paths.windsurfWorkflowFile(workflow))) {
      await fs.remove(paths.windsurfWorkflowFile(workflow));
    }
  }

  console.log(chalk.gray('Deploying production files...'));

  // Deploy production rule
  await copyTemplate(TEMPLATE_FILES.RULES_AGENTSPEC, paths.ruleFile('agentspec'));

  // Deploy production workflows
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_NEW_ECO, paths.workflowFile('agentspec-new-eco'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_PLAN, paths.workflowFile('agentspec-plan'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_IMPLEMENT, paths.workflowFile('agentspec-implement'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_TROUBLESHOOT, paths.workflowFile('agentspec-troubleshoot'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_REFACTOR, paths.workflowFile('agentspec-refactor'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_FINISH, paths.workflowFile('agentspec-finish'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_MANAGE_CONTEXT, paths.workflowFile('agentspec-manage-context'));

  console.log(chalk.gray('Syncing to Windsurf directories...'));

  // Sync to Windsurf
  await fs.ensureDir(paths.windsurfRulesDir);
  await fs.ensureDir(paths.windsurfWorkflowsDir);

  await copyTemplate(TEMPLATE_FILES.RULES_AGENTSPEC, paths.windsurfRuleFile('agentspec'));

  await copyTemplate(TEMPLATE_FILES.WORKFLOW_NEW_ECO, paths.windsurfWorkflowFile('agentspec-new-eco'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_PLAN, paths.windsurfWorkflowFile('agentspec-plan'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_IMPLEMENT, paths.windsurfWorkflowFile('agentspec-implement'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_TROUBLESHOOT, paths.windsurfWorkflowFile('agentspec-troubleshoot'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_REFACTOR, paths.windsurfWorkflowFile('agentspec-refactor'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_FINISH, paths.windsurfWorkflowFile('agentspec-finish'));
  await copyTemplate(TEMPLATE_FILES.WORKFLOW_MANAGE_CONTEXT, paths.windsurfWorkflowFile('agentspec-manage-context'));

  console.log();
  console.log(chalk.green('✓ AgentSpec setup finalized!'));
  console.log();
  console.log(chalk.bold('Production mode active:'));
  console.log(chalk.gray('  • Onboarding files removed'));
  console.log(chalk.gray('  • Production AgentSpec rule deployed'));
  console.log(chalk.gray('  • All ECO-based workflows available'));
  console.log(chalk.gray('  • Files synced to Windsurf'));
  console.log();
  console.log(chalk.bold('Next steps:'));
  console.log(chalk.gray('  1. Create your first ECO with the agentspec-new-eco workflow'));
  console.log(chalk.gray('  2. Use agentspec-plan to detail the implementation'));
  console.log(chalk.gray('  3. Use agentspec-implement to build features'));
  console.log();
  console.log(chalk.yellow('All development work should now be organized into Engineering Change Orders.'));
  console.log();
}
