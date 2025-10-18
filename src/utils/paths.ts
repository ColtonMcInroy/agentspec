import path from 'path';
import fs from 'fs-extra';

export const AGENTSPEC_DIR = '.agentspec';
export const AGENTSPEC_VERSION = '1.0.0';

export class AgentSpecPaths {
  private rootDir: string;

  constructor(rootDir: string = process.cwd()) {
    this.rootDir = rootDir;
  }

  // Root paths
  get agentspecDir(): string {
    return path.join(this.rootDir, AGENTSPEC_DIR);
  }

  get agentsFile(): string {
    return path.join(this.rootDir, 'AGENTS.md');
  }

  // Core files
  get versionFile(): string {
    return path.join(this.agentspecDir, 'version');
  }

  get projectFile(): string {
    return path.join(this.agentspecDir, 'project.md');
  }

  get instructionsFile(): string {
    return path.join(this.agentspecDir, 'instructions.md');
  }

  // Directories
  get ecoDir(): string {
    return path.join(this.agentspecDir, 'eco');
  }

  get finishedEcoDir(): string {
    return path.join(this.agentspecDir, 'finished-eco');
  }

  get specsDir(): string {
    return path.join(this.agentspecDir, 'specs');
  }

  get rulesDir(): string {
    return path.join(this.agentspecDir, 'rules');
  }

  get workflowsDir(): string {
    return path.join(this.agentspecDir, 'workflows');
  }

  // Windsurf directories
  get windsurfDir(): string {
    return path.join(this.rootDir, '.windsurf');
  }

  get windsurfRulesDir(): string {
    return path.join(this.windsurfDir, 'rules');
  }

  get windsurfWorkflowsDir(): string {
    return path.join(this.windsurfDir, 'workflows');
  }

  // Windsurf paths
  windsurfRuleFile(ruleName: string): string {
    return path.join(this.windsurfRulesDir, `${ruleName}.md`);
  }

  windsurfWorkflowFile(workflowName: string): string {
    return path.join(this.windsurfWorkflowsDir, `${workflowName}.md`);
  }

  // ECO paths
  ecoPath(ecoName: string): string {
    return path.join(this.ecoDir, ecoName);
  }

  ecoDetailsFile(ecoName: string): string {
    return path.join(this.ecoPath(ecoName), 'details.md');
  }

  ecoPlanFile(ecoName: string): string {
    return path.join(this.ecoPath(ecoName), 'plan.md');
  }

  ecoTestsFile(ecoName: string): string {
    return path.join(this.ecoPath(ecoName), 'tests.md');
  }

  ecoSpecDir(ecoName: string, specName: string): string {
    return path.join(this.ecoPath(ecoName), specName);
  }

  ecoSpecFile(ecoName: string, specName: string): string {
    return path.join(this.ecoSpecDir(ecoName, specName), 'spec.md');
  }

  ecoSpecTestsFile(ecoName: string, specName: string): string {
    return path.join(this.ecoSpecDir(ecoName, specName), 'tests.md');
  }

  // Finished ECO paths
  finishedEcoPath(ecoName: string): string {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.finishedEcoDir, `${date}-${ecoName}`);
  }

  // Spec paths
  specDir(specName: string): string {
    return path.join(this.specsDir, specName);
  }

  specFile(specName: string): string {
    return path.join(this.specDir(specName), 'spec.md');
  }

  specTestsFile(specName: string): string {
    return path.join(this.specDir(specName), 'tests.md');
  }

  // Rule paths
  ruleFile(ruleName: string): string {
    return path.join(this.rulesDir, `${ruleName}.md`);
  }

  // Workflow paths
  workflowFile(workflowName: string): string {
    return path.join(this.workflowsDir, `${workflowName}.md`);
  }

  // Validation
  async isInitialized(): Promise<boolean> {
    return await fs.pathExists(this.agentspecDir);
  }

  async ecoExists(ecoName: string): Promise<boolean> {
    return await fs.pathExists(this.ecoPath(ecoName));
  }

  async specExists(specName: string): Promise<boolean> {
    return await fs.pathExists(this.specDir(specName));
  }
}
