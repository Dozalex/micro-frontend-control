import * as React from 'react';

import { DependencyName, DependencyVersion, SpaceConfig } from 'modules';
import { Input } from 'components/Input';
import { Section } from 'components/Section';

import { useSpace } from './hooks';
import {
  Deps,
  NewProject,
  Projects,
  RunButton,
  GitSettings,
  PipelineSettings,
} from './components';

type Props = {
  space: SpaceConfig;
  onChangeSpace: (space: SpaceConfig) => void;
};

export const Space = ({ space, onChangeSpace }: Props) => {
  const {
    onChangeDependencyConfig,
    onChangeDependencyNames,
    onChangeGitConfig,
    onChangePackagesFolderNameName,
    onChangePipelineConfig,
    onChangeProjectPaths,
  } = useSpace({ space, onChangeSpace });

  const {
    dependencyNames: deps,
    projectPaths: projects,
    dependencyConfig,
    gitConfig,
    pipelineConfig,
    packagesFolderName,
  } = space;

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
          pipelineConfig={pipelineConfig}
          onChangePipelineConfig={onChangePipelineConfig}
        />

        <GitSettings
          gitConfig={gitConfig}
          onChangeGitConfig={onChangeGitConfig}
          dependencyConfig={dependencyConfig}
          onChangeDependencyConfig={onChangeDependencyConfig}
        />

        <RunButton
          deps={filteredDeps}
          packagesFolderName={packagesFolderName}
          projectsForUpdate={projectsForUpdate}
          depVersions={depVersions}
          gitConfig={gitConfig}
          pipelineConfig={pipelineConfig}
          setStatusByProject={setStatusByProject}
        />
      </div>

      <Deps
        deps={deps}
        onChangeDependencyNames={onChangeDependencyNames}
        depVersions={depVersions}
        setDepVersions={setDepVersions}
        dependencyConfig={dependencyConfig}
      />

      <Section title='Project settings'>
        <Input
          label='Packages folder name'
          value={packagesFolderName}
          onChange={e => onChangePackagesFolderNameName(e.target.value)}
        />
      </Section>

      <NewProject
        projects={projects}
        onChangeProjectPaths={onChangeProjectPaths}
      />

      <Projects
        projects={projects}
        onChangeProjectPaths={onChangeProjectPaths}
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
