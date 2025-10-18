import chalk from 'chalk';
import { AgentSpecPaths } from '../utils/paths.js';
import fs from 'fs-extra';

export async function showCommand(ecoName: string): Promise<void> {
  const paths = new AgentSpecPaths();

  try {
    // Check if initialized
    if (!(await paths.isInitialized())) {
      console.error(chalk.red('Error: AgentSpec is not initialized in this directory.'));
      console.log(chalk.yellow('Run "agentspec init" first.'));
      process.exit(1);
    }

    // Check if ECO exists
    if (!(await paths.ecoExists(ecoName))) {
      console.error(chalk.red(`Error: ECO "${ecoName}" does not exist.`));
      console.log(chalk.yellow('Run "agentspec list" to see available ECOs.'));
      process.exit(1);
    }

    const detailsFile = paths.ecoDetailsFile(ecoName);
    
    if (!(await fs.pathExists(detailsFile))) {
      console.error(chalk.red(`Error: Details file not found for ECO "${ecoName}".`));
      process.exit(1);
    }

    const details = await fs.readFile(detailsFile, 'utf-8');
    
    console.log(chalk.bold.blue(`ECO: ${ecoName}`));
    console.log(chalk.gray('─'.repeat(60)));
    console.log();
    console.log(details);
    console.log();
    console.log(chalk.gray('─'.repeat(60)));
    
    // Show additional info
    const planFile = paths.ecoPlanFile(ecoName);
    const hasPlan = await fs.pathExists(planFile);
    
    if (hasPlan) {
      const planContent = await fs.readFile(planFile, 'utf-8');
      const totalTasks = (planContent.match(/- \[[ x]\]/g) || []).length;
      const completedTasks = (planContent.match(/- \[x\]/g) || []).length;
      
      console.log(chalk.bold('Status:'), chalk.blue(`${completedTasks}/${totalTasks} tasks completed`));
    } else {
      console.log(chalk.bold('Status:'), chalk.yellow('Planning phase'));
    }
    
    // List specs
    const ecoPath = paths.ecoPath(ecoName);
    const items = await fs.readdir(ecoPath);
    const specs = [];
    
    for (const item of items) {
      const itemPath = `${ecoPath}/${item}`;
      const stat = await fs.stat(itemPath);
      if (stat.isDirectory()) {
        specs.push(item);
      }
    }
    
    if (specs.length > 0) {
      console.log(chalk.bold('Specifications:'), specs.join(', '));
    }
    
    console.log();
  } catch (error) {
    console.error(chalk.red('Error showing ECO:'), error);
    process.exit(1);
  }
}
