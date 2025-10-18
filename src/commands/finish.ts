import chalk from 'chalk';
import { AgentSpecPaths } from '../utils/paths.js';
import fs from 'fs-extra';

export async function finishCommand(ecoName: string): Promise<void> {
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

    console.log(chalk.blue(`Finishing ECO: ${ecoName}`));
    console.log();

    // Validate ECO
    console.log(chalk.gray('Validating ECO...'));
    const validation = await validateEco(paths, ecoName);
    
    if (!validation.valid) {
      console.error(chalk.red('✗ ECO validation failed:'));
      validation.errors.forEach(error => console.log(chalk.red(`  • ${error}`)));
      process.exit(1);
    }

    if (validation.warnings.length > 0) {
      console.log(chalk.yellow('⚠ Warnings:'));
      validation.warnings.forEach(warning => console.log(chalk.yellow(`  • ${warning}`)));
      console.log();
    }

    // Get specifications
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

    // Merge specifications
    console.log(chalk.gray('Merging specifications...'));
    for (const spec of specs) {
      await mergeSpec(paths, ecoName, spec);
      console.log(chalk.green(`  ✓ Merged ${spec}`));
    }

    // Archive ECO
    console.log(chalk.gray('Archiving ECO...'));
    const finishedPath = paths.finishedEcoPath(ecoName);
    await fs.ensureDir(paths.finishedEcoDir);
    await fs.move(ecoPath, finishedPath);

    console.log();
    console.log(chalk.green.bold('✓ ECO finished successfully!'));
    console.log();
    console.log(chalk.bold('Summary:'));
    console.log(chalk.gray(`  • Merged ${specs.length} specification(s)`));
    console.log(chalk.gray(`  • Archived to: ${finishedPath}`));
    console.log();
    console.log(chalk.blue('Run "agentspec list --specs" to see updated specifications.'));
  } catch (error) {
    console.error(chalk.red('Error finishing ECO:'), error);
    process.exit(1);
  }
}

async function validateEco(paths: AgentSpecPaths, ecoName: string): Promise<{
  valid: boolean;
  errors: string[];
  warnings: string[];
}> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required files
  const detailsFile = paths.ecoDetailsFile(ecoName);
  const planFile = paths.ecoPlanFile(ecoName);

  if (!(await fs.pathExists(detailsFile))) {
    errors.push('Missing details.md file');
  }

  if (!(await fs.pathExists(planFile))) {
    errors.push('Missing plan.md file');
  }

  // Check specifications
  const ecoPath = paths.ecoPath(ecoName);
  const items = await fs.readdir(ecoPath);
  let hasSpecs = false;

  for (const item of items) {
    const itemPath = `${ecoPath}/${item}`;
    const stat = await fs.stat(itemPath);
    if (stat.isDirectory()) {
      hasSpecs = true;
      const specFile = paths.ecoSpecFile(ecoName, item);
      if (!(await fs.pathExists(specFile))) {
        errors.push(`Specification "${item}" missing spec.md`);
      }
    }
  }

  if (!hasSpecs) {
    errors.push('No specifications found');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

async function mergeSpec(paths: AgentSpecPaths, ecoName: string, specName: string): Promise<void> {
  const ecoSpecFile = paths.ecoSpecFile(ecoName, specName);
  const ecoTestsFile = paths.ecoSpecTestsFile(ecoName, specName);
  const targetSpecFile = paths.specFile(specName);
  const targetTestsFile = paths.specTestsFile(specName);

  // Ensure target spec directory exists
  await fs.ensureDir(paths.specDir(specName));

  // Merge spec.md
  if (await fs.pathExists(ecoSpecFile)) {
    const ecoSpec = await fs.readFile(ecoSpecFile, 'utf-8');
    
    if (await fs.pathExists(targetSpecFile)) {
      // Merge with existing spec
      const existingSpec = await fs.readFile(targetSpecFile, 'utf-8');
      const date = new Date().toISOString().split('T')[0];
      const mergedSpec = `${existingSpec}\n\n<!-- Updated by ECO: ${ecoName} (${date}) -->\n\n${ecoSpec}`;
      await fs.writeFile(targetSpecFile, mergedSpec, 'utf-8');
    } else {
      // Create new spec
      await fs.writeFile(targetSpecFile, ecoSpec, 'utf-8');
    }
  }

  // Merge tests.md
  if (await fs.pathExists(ecoTestsFile)) {
    const ecoTests = await fs.readFile(ecoTestsFile, 'utf-8');
    
    if (await fs.pathExists(targetTestsFile)) {
      // Merge with existing tests
      const existingTests = await fs.readFile(targetTestsFile, 'utf-8');
      const date = new Date().toISOString().split('T')[0];
      const mergedTests = `${existingTests}\n\n<!-- Updated by ECO: ${ecoName} (${date}) -->\n\n${ecoTests}`;
      await fs.writeFile(targetTestsFile, mergedTests, 'utf-8');
    } else {
      // Create new tests
      await fs.writeFile(targetTestsFile, ecoTests, 'utf-8');
    }
  }
}
