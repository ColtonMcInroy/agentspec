import chalk from 'chalk';
import { AgentSpecPaths } from '../utils/paths.js';
import fs from 'fs-extra';

interface ValidationIssue {
  type: 'error' | 'warning';
  message: string;
}

export async function validateCommand(ecoName: string): Promise<void> {
  const paths = new AgentSpecPaths();
  const issues: ValidationIssue[] = [];

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

    console.log(chalk.blue(`Validating ECO: ${ecoName}`));
    console.log();

    // Validate required files
    const detailsFile = paths.ecoDetailsFile(ecoName);
    const planFile = paths.ecoPlanFile(ecoName);
    const testsFile = paths.ecoTestsFile(ecoName);

    if (!(await fs.pathExists(detailsFile))) {
      issues.push({ type: 'error', message: 'Missing details.md file' });
    }

    if (!(await fs.pathExists(planFile))) {
      issues.push({ type: 'error', message: 'Missing plan.md file (ECO not planned yet)' });
    } else {
      // Validate plan
      const planContent = await fs.readFile(planFile, 'utf-8');
      const totalTasks = (planContent.match(/- \[[ x]\]/g) || []).length;
      const completedTasks = (planContent.match(/- \[x\]/g) || []).length;

      if (totalTasks === 0) {
        issues.push({ type: 'warning', message: 'Plan has no tasks defined' });
      } else if (completedTasks < totalTasks) {
        issues.push({ 
          type: 'warning', 
          message: `Plan has incomplete tasks (${completedTasks}/${totalTasks} completed)` 
        });
      }
    }

    if (!(await fs.pathExists(testsFile))) {
      issues.push({ type: 'warning', message: 'Missing tests.md file' });
    }

    // Validate specifications
    const ecoPath = paths.ecoPath(ecoName);
    const items = await fs.readdir(ecoPath);
    const specs: string[] = [];

    for (const item of items) {
      const itemPath = `${ecoPath}/${item}`;
      const stat = await fs.stat(itemPath);
      if (stat.isDirectory()) {
        specs.push(item);
      }
    }

    if (specs.length === 0) {
      issues.push({ type: 'error', message: 'No specifications found in ECO' });
    } else {
      console.log(chalk.gray(`Found ${specs.length} specification(s): ${specs.join(', ')}`));
      console.log();

      for (const spec of specs) {
        const specFile = paths.ecoSpecFile(ecoName, spec);
        const specTestsFile = paths.ecoSpecTestsFile(ecoName, spec);

        if (!(await fs.pathExists(specFile))) {
          issues.push({ type: 'error', message: `Specification "${spec}" missing spec.md` });
        } else {
          // Check if spec can be merged
          const specExists = await paths.specExists(spec);
          if (specExists) {
            console.log(chalk.gray(`  • ${spec}: Will be merged with existing spec`));
          } else {
            console.log(chalk.gray(`  • ${spec}: Will be created as new spec`));
          }
        }

        if (!(await fs.pathExists(specTestsFile))) {
          issues.push({ type: 'warning', message: `Specification "${spec}" missing tests.md` });
        }
      }
      console.log();
    }

    // Report results
    const errors = issues.filter(i => i.type === 'error');
    const warnings = issues.filter(i => i.type === 'warning');

    if (errors.length > 0) {
      console.log(chalk.red.bold('Errors:'));
      errors.forEach(issue => console.log(chalk.red(`  ✗ ${issue.message}`)));
      console.log();
    }

    if (warnings.length > 0) {
      console.log(chalk.yellow.bold('Warnings:'));
      warnings.forEach(issue => console.log(chalk.yellow(`  ⚠ ${issue.message}`)));
      console.log();
    }

    if (errors.length === 0 && warnings.length === 0) {
      console.log(chalk.green('✓ ECO is valid and ready to be finished!'));
      console.log();
      console.log(chalk.gray(`Run "agentspec finish ${ecoName}" to complete and archive this ECO.`));
    } else if (errors.length === 0) {
      console.log(chalk.yellow('⚠ ECO has warnings but can be finished.'));
      console.log();
      console.log(chalk.gray(`Run "agentspec finish ${ecoName}" to complete and archive this ECO.`));
    } else {
      console.log(chalk.red('✗ ECO has errors and cannot be finished yet.'));
      console.log(chalk.gray('Fix the errors above before finishing this ECO.'));
      process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red('Error validating ECO:'), error);
    process.exit(1);
  }
}
