import React from 'react';
import { render } from 'ink';
import { AgentSpecPaths } from '../utils/paths.js';
import { AgentSpecTUI } from '../ui/AgentSpecTUI.js';

export async function viewCommand(): Promise<void> {
  const paths = new AgentSpecPaths();

  // Check if initialized
  if (!(await paths.isInitialized())) {
    console.error('Error: AgentSpec is not initialized in this directory.');
    console.log('Run "agentspec init" first.');
    process.exit(1);
  }

  // Render the TUI
  render(React.createElement(AgentSpecTUI, { paths }));
}
