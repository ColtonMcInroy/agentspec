#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { finishCommand } from './commands/finish.js';
import { listCommand } from './commands/list.js';
import { viewCommand } from './commands/view.js';
import { validateCommand } from './commands/validate.js';
import { showCommand } from './commands/show.js';
import { updateCommand } from './commands/update.js';
import { finalizeCommand } from './commands/finalize.js';

const program = new Command();

program
  .name('agentspec')
  .description('A tool for enhancing guided agentic development with structured specifications and workflows')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize AgentSpec in the current project')
  .action(initCommand);

program
  .command('finish <eco-name>')
  .description('Validate, merge, and archive a completed ECO')
  .action(finishCommand);

program
  .command('list')
  .description('List active ECOs')
  .option('-s, --specs', 'List current specifications instead of ECOs')
  .action(listCommand);

program
  .command('view')
  .description('Open interactive TUI for managing AgentSpec')
  .action(viewCommand);

program
  .command('validate <eco-name>')
  .description('Validate that an ECO can be merged into specifications')
  .action(validateCommand);

program
  .command('show <eco-name>')
  .description('Display the details of an ECO')
  .action(showCommand);

program
  .command('update')
  .description('Update AgentSpec files to the latest version')
  .action(updateCommand);

program
  .command('finalize')
  .description('Finalize AgentSpec setup and transition to production mode')
  .action(finalizeCommand);

program.parse();
