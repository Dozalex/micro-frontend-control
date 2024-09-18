import * as React from 'react';

import {
  DependencyName,
  DependencyVersion,
  useGitSettings,
  usePipelineSettings,
} from 'modules';
import { Input } from 'components/Input';
import { Section } from 'components/Section';

import { useDeps, useProjects, usePackagesFolderName } from './hooks';
import {
  Deps,
  NewProject,
  Projects,
  RunButton,
  GitSettings,
  PipelineSettings,
} from './components';

export const Main = () => {
  // data from local storage

  const { deps, setDeps } = useDeps();
  const { projects, setProjects } = useProjects();
  const { packagesFolderName, setPackagesFolderName } = usePackagesFolderName();
  const { gitSettings, setGitSettings } = useGitSettings();
  const { pipelineSettings, setPipelineSettings } = usePipelineSettings();

  // local data

  const [projectsForUpdate, setProjectsForUpdate] = React.useState<string[]>(
    [],
  );
  const [depVersions, setDepVersions] = React.useState<
    Record<DependencyName, DependencyVersion | undefined>
  >({});
  const [statusByProject, setStatusByProject] = React.useState<
    Record<string, string | undefined>
  >({});

  // remove duplicates
  const filteredDeps = React.useMemo(() => [...new Set(deps)], [deps]);

  return (
    <div className='flex flex-col gap-4 bg-gray-800 text-white p-4 h-full w-full'>
      <div className='flex justify-end gap-4'>
        <PipelineSettings
          pipelineSettings={pipelineSettings}
          setPipelineSettings={setPipelineSettings}
        />

        <GitSettings
          gitSettings={gitSettings}
          setGitSettings={setGitSettings}
        />

        <RunButton
          deps={filteredDeps}
          packagesFolderName={packagesFolderName}
          projectsForUpdate={projectsForUpdate}
          depVersions={depVersions}
          gitSettings={gitSettings}
          pipelineSettings={pipelineSettings}
          setStatusByProject={setStatusByProject}
        />
      </div>

      <Deps
        deps={deps}
        setDeps={setDeps}
        depVersions={depVersions}
        setDepVersions={setDepVersions}
        gitSettings={gitSettings}
      />

      <Section title='Project settings'>
        <Input
          label='Packages folder name'
          value={packagesFolderName}
          onChange={e => setPackagesFolderName(e.target.value)}
        />
      </Section>

      <NewProject projects={projects} setProjects={setProjects} />

      <Projects
        projects={projects}
        setProjects={setProjects}
        deps={filteredDeps}
        packagesFolderName={packagesFolderName}
        projectsForUpdate={projectsForUpdate}
        setProjectsForUpdate={setProjectsForUpdate}
        depVersions={depVersions}
        statusByProject={statusByProject}
      />
    </div>
  );
};
