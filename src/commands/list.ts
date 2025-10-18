import chalk from 'chalk';
import { AgentSpecPaths } from '../utils/paths.js';
import fs from 'fs-extra';
import path from 'path';

interface ListOptions {
  specs?: boolean;
}

export async function listCommand(options: ListOptions): Promise<void> {
  const paths = new AgentSpecPaths();

  try {
    // Check if initialized
    if (!(await paths.isInitialized())) {
      console.error(chalk.red('Error: AgentSpec is not initialized in this directory.'));
      console.log(chalk.yellow('Run "agentspec init" first.'));
      process.exit(1);
    }

    if (options.specs) {
      await listSpecs(paths);
    } else {
      await listEcos(paths);
    }
  } catch (error) {
    console.error(chalk.red('Error listing:'), error);
    process.exit(1);
  }
}

async function listEcos(paths: AgentSpecPaths): Promise<void> {
  console.log(chalk.bold.blue('Active Engineering Change Orders:'));
  console.log();

  const ecoDir = paths.ecoDir;
  
  if (!(await fs.pathExists(ecoDir))) {
    console.log(chalk.gray('No ECOs found.'));
    return;
  }

  const ecos = await fs.readdir(ecoDir);
  
  if (ecos.length === 0) {
    console.log(chalk.gray('No ECOs found.'));
    return;
  }

  for (const eco of ecos) {
    const ecoPath = paths.ecoPath(eco);
    const stat = await fs.stat(ecoPath);
    
    if (!stat.isDirectory()) continue;

    const detailsFile = paths.ecoDetailsFile(eco);
    const planFile = paths.ecoPlanFile(eco);
    const hasDetails = await fs.pathExists(detailsFile);
    const hasPlan = await fs.pathExists(planFile);

    let status = chalk.yellow('Planning');
    if (hasPlan) {
      const planContent = await fs.readFile(planFile, 'utf-8');
      const totalTasks = (planContent.match(/- \[[ x]\]/g) || []).length;
      const completedTasks = (planContent.match(/- \[x\]/g) || []).length;
      
      if (completedTasks === totalTasks && totalTasks > 0) {
        status = chalk.green(`Complete (${completedTasks}/${totalTasks} tasks)`);
      } else {
        status = chalk.blue(`In Progress (${completedTasks}/${totalTasks} tasks)`);
      }
    }

    console.log(chalk.bold(`• ${eco}`));
    console.log(`  Status: ${status}`);
    
    if (hasDetails) {
      const details = await fs.readFile(detailsFile, 'utf-8');
      const firstLine = details.split('\n').find(line => line.trim() && !line.startsWith('#'));
      if (firstLine) {
        console.log(chalk.gray(`  ${firstLine.substring(0, 80)}${firstLine.length > 80 ? '...' : ''}`));
      }
    }
    
    console.log();
  }
}

async function listSpecs(paths: AgentSpecPaths): Promise<void> {
  console.log(chalk.bold.blue('Current Specifications:'));
  console.log();

  const specsDir = paths.specsDir;
  
  if (!(await fs.pathExists(specsDir))) {
    console.log(chalk.gray('No specifications found.'));
    return;
  }

  const specs = await fs.readdir(specsDir);
  
  if (specs.length === 0) {
    console.log(chalk.gray('No specifications found.'));
    return;
  }

  for (const spec of specs) {
    const specPath = paths.specDir(spec);
    const stat = await fs.stat(specPath);
    
    if (!stat.isDirectory()) continue;

    const specFile = paths.specFile(spec);
    const testsFile = paths.specTestsFile(spec);
    const hasSpec = await fs.pathExists(specFile);
    const hasTests = await fs.pathExists(testsFile);

    console.log(chalk.bold(`• ${spec}`));
    console.log(`  Spec: ${hasSpec ? chalk.green('✓') : chalk.red('✗')}`);
    console.log(`  Tests: ${hasTests ? chalk.green('✓') : chalk.red('✗')}`);
    
    if (hasSpec) {
      const specContent = await fs.readFile(specFile, 'utf-8');
      const overviewMatch = specContent.match(/## Overview\s+([^\n]+)/);
      if (overviewMatch) {
        console.log(chalk.gray(`  ${overviewMatch[1].substring(0, 80)}${overviewMatch[1].length > 80 ? '...' : ''}`));
      }
    }
    
    console.log();
  }
}
