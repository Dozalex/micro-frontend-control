import * as React from 'react';

import { DependencyName, DependencyVersion, SpaceConfig } from 'modules';
import { Input } from 'components/Input';
import { Section } from 'components/Section';

import { useSpace } from './hooks';
import { Deps, NewProject, Projects, RunButton, Settings } from './components';

type Props = {
  space: SpaceConfig;
  onCreateSpace: (space: SpaceConfig) => void;
  onChangeSpace: (space: SpaceConfig) => void;
  onDeleteSpace: (spaceId: string) => void;
};

export const Space = ({
  space,
  onCreateSpace,
  onChangeSpace,
  onDeleteSpace,
}: Props) => {
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
    <div className='flex flex-col gap-4 text-white p-4 h-full w-full'>
      <div className='flex justify-end gap-4'>
        <Settings
          space={space}
          onChangePipelineConfig={onChangePipelineConfig}
          onChangeGitConfig={onChangeGitConfig}
          onChangeDependencyConfig={onChangeDependencyConfig}
          onCreateSpace={onCreateSpace}
          onDeleteSpace={onDeleteSpace}
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
