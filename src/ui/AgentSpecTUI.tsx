import React, { useState, useEffect } from 'react';
import { Box, Text, useApp, useInput } from 'ink';
import Spinner from 'ink-spinner';
import SelectInput from 'ink-select-input';
import { AgentSpecPaths } from '../utils/paths.js';
import fs from 'fs-extra';

interface AgentSpecTUIProps {
  paths: AgentSpecPaths;
}

type View = 'main' | 'ecos' | 'specs' | 'eco-detail' | 'spec-detail';

interface ECO {
  name: string;
  status: string;
  tasksCompleted: number;
  tasksTotal: number;
}

interface Spec {
  name: string;
  hasSpec: boolean;
  hasTests: boolean;
}

export const AgentSpecTUI: React.FC<AgentSpecTUIProps> = ({ paths }) => {
  const { exit } = useApp();
  const [view, setView] = useState<View>('main');
  const [loading, setLoading] = useState(false);
  const [ecos, setEcos] = useState<ECO[]>([]);
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [selectedEco, setSelectedEco] = useState<string | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [detailContent, setDetailContent] = useState<string>('');

  useInput((input, key) => {
    if (input === 'q' || (key.escape && view === 'main')) {
      exit();
    } else if (key.escape) {
      setView('main');
      setSelectedEco(null);
      setSelectedSpec(null);
    }
  });

  useEffect(() => {
    if (view === 'ecos') {
      loadEcos();
    } else if (view === 'specs') {
      loadSpecs();
    } else if (view === 'eco-detail' && selectedEco) {
      loadEcoDetail(selectedEco);
    } else if (view === 'spec-detail' && selectedSpec) {
      loadSpecDetail(selectedSpec);
    }
  }, [view, selectedEco, selectedSpec]);

  const loadEcos = async () => {
    setLoading(true);
    try {
      const ecoDir = paths.ecoDir;
      if (!(await fs.pathExists(ecoDir))) {
        setEcos([]);
        setLoading(false);
        return;
      }

      const ecoNames = await fs.readdir(ecoDir);
      const ecoList: ECO[] = [];

      for (const name of ecoNames) {
        const ecoPath = paths.ecoPath(name);
        const stat = await fs.stat(ecoPath);
        if (!stat.isDirectory()) continue;

        const planFile = paths.ecoPlanFile(name);
        let status = 'Planning';
        let tasksCompleted = 0;
        let tasksTotal = 0;

        if (await fs.pathExists(planFile)) {
          const planContent = await fs.readFile(planFile, 'utf-8');
          tasksTotal = (planContent.match(/- \[[ x]\]/g) || []).length;
          tasksCompleted = (planContent.match(/- \[x\]/g) || []).length;

          if (tasksCompleted === tasksTotal && tasksTotal > 0) {
            status = 'Complete';
          } else {
            status = 'In Progress';
          }
        }

        ecoList.push({ name, status, tasksCompleted, tasksTotal });
      }

      setEcos(ecoList);
    } catch (error) {
      console.error('Error loading ECOs:', error);
    }
    setLoading(false);
  };

  const loadSpecs = async () => {
    setLoading(true);
    try {
      const specsDir = paths.specsDir;
      if (!(await fs.pathExists(specsDir))) {
        setSpecs([]);
        setLoading(false);
        return;
      }

      const specNames = await fs.readdir(specsDir);
      const specList: Spec[] = [];

      for (const name of specNames) {
        const specPath = paths.specDir(name);
        const stat = await fs.stat(specPath);
        if (!stat.isDirectory()) continue;

        const hasSpec = await fs.pathExists(paths.specFile(name));
        const hasTests = await fs.pathExists(paths.specTestsFile(name));

        specList.push({ name, hasSpec, hasTests });
      }

      setSpecs(specList);
    } catch (error) {
      console.error('Error loading specs:', error);
    }
    setLoading(false);
  };

  const loadEcoDetail = async (ecoName: string) => {
    setLoading(true);
    try {
      const detailsFile = paths.ecoDetailsFile(ecoName);
      if (await fs.pathExists(detailsFile)) {
        const content = await fs.readFile(detailsFile, 'utf-8');
        setDetailContent(content);
      }
    } catch (error) {
      console.error('Error loading ECO detail:', error);
    }
    setLoading(false);
  };

  const loadSpecDetail = async (specName: string) => {
    setLoading(true);
    try {
      const specFile = paths.specFile(specName);
      if (await fs.pathExists(specFile)) {
        const content = await fs.readFile(specFile, 'utf-8');
        setDetailContent(content);
      }
    } catch (error) {
      console.error('Error loading spec detail:', error);
    }
    setLoading(false);
  };

  const mainMenuItems = [
    { label: 'View ECOs', value: 'ecos' },
    { label: 'View Specifications', value: 'specs' },
    { label: 'Exit', value: 'exit' },
  ];

  const handleMainMenuSelect = (item: { value: string }) => {
    if (item.value === 'exit') {
      exit();
    } else {
      setView(item.value as View);
    }
  };

  const handleEcoSelect = (item: { value: string }) => {
    setSelectedEco(item.value);
    setView('eco-detail');
  };

  const handleSpecSelect = (item: { value: string }) => {
    setSelectedSpec(item.value);
    setView('spec-detail');
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="blue">
          AgentSpec TUI
        </Text>
      </Box>

      {view === 'main' && (
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text>Select an option (use arrow keys, press Enter to select, Q to quit):</Text>
          </Box>
          <SelectInput items={mainMenuItems} onSelect={handleMainMenuSelect} />
        </Box>
      )}

      {view === 'ecos' && (
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text bold>Engineering Change Orders</Text>
            <Text dimColor> (ESC to go back)</Text>
          </Box>
          {loading ? (
            <Box>
              <Text color="blue">
                <Spinner type="dots" />
              </Text>
              <Text> Loading ECOs...</Text>
            </Box>
          ) : ecos.length === 0 ? (
            <Text dimColor>No ECOs found</Text>
          ) : (
            <SelectInput
              items={ecos.map(eco => ({
                label: `${eco.name} - ${eco.status} (${eco.tasksCompleted}/${eco.tasksTotal})`,
                value: eco.name,
              }))}
              onSelect={handleEcoSelect}
            />
          )}
        </Box>
      )}

      {view === 'specs' && (
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text bold>Specifications</Text>
            <Text dimColor> (ESC to go back)</Text>
          </Box>
          {loading ? (
            <Box>
              <Text color="blue">
                <Spinner type="dots" />
              </Text>
              <Text> Loading specifications...</Text>
            </Box>
          ) : specs.length === 0 ? (
            <Text dimColor>No specifications found</Text>
          ) : (
            <SelectInput
              items={specs.map(spec => ({
                label: `${spec.name} - Spec: ${spec.hasSpec ? '✓' : '✗'} Tests: ${spec.hasTests ? '✓' : '✗'}`,
                value: spec.name,
              }))}
              onSelect={handleSpecSelect}
            />
          )}
        </Box>
      )}

      {view === 'eco-detail' && selectedEco && (
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text bold color="blue">
              ECO: {selectedEco}
            </Text>
            <Text dimColor> (ESC to go back)</Text>
          </Box>
          {loading ? (
            <Box>
              <Text color="blue">
                <Spinner type="dots" />
              </Text>
              <Text> Loading details...</Text>
            </Box>
          ) : (
            <Box flexDirection="column">
              <Text>{detailContent}</Text>
            </Box>
          )}
        </Box>
      )}

      {view === 'spec-detail' && selectedSpec && (
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text bold color="blue">
              Specification: {selectedSpec}
            </Text>
            <Text dimColor> (ESC to go back)</Text>
          </Box>
          {loading ? (
            <Box>
              <Text color="blue">
                <Spinner type="dots" />
              </Text>
              <Text> Loading specification...</Text>
            </Box>
          ) : (
            <Box flexDirection="column">
              <Text>{detailContent}</Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
