import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

export async function getTemplate(templatePath: string): Promise<string> {
  const fullPath = path.join(TEMPLATES_DIR, templatePath);
  return await fs.readFile(fullPath, 'utf-8');
}

export async function copyTemplate(templatePath: string, destPath: string): Promise<void> {
  const content = await getTemplate(templatePath);
  await fs.ensureDir(path.dirname(destPath));
  await fs.writeFile(destPath, content, 'utf-8');
}

export const TEMPLATE_FILES = {
  AGENTS: 'AGENTS.md',
  PROJECT: 'project.md',
  INSTRUCTIONS: 'instructions.md',
  RULES_AGENTSPEC: 'rules/agentspec.md',
  RULES_ONBOARDING_FRESH: 'rules/agentspec-onboarding-fresh.md',
  RULES_ONBOARDING_EXISTING: 'rules/agentspec-onboarding-existing.md',
  WORKFLOW_NEW_ECO: 'workflows/agentspec-new-eco.md',
  WORKFLOW_PLAN: 'workflows/agentspec-plan.md',
  WORKFLOW_IMPLEMENT: 'workflows/agentspec-implement.md',
  WORKFLOW_TROUBLESHOOT: 'workflows/agentspec-troubleshoot.md',
  WORKFLOW_REFACTOR: 'workflows/agentspec-refactor.md',
  WORKFLOW_FINISH: 'workflows/agentspec-finish.md',
  WORKFLOW_MANAGE_CONTEXT: 'workflows/agentspec-manage-context.md',
  WORKFLOW_SETUP_FRESH: 'workflows/agentspec-setup-fresh-project.md',
  WORKFLOW_SETUP_EXISTING: 'workflows/agentspec-setup-existing-project.md',
  WORKFLOW_FINALIZE_SETUP: 'workflows/agentspec-finalize-setup.md',
};
