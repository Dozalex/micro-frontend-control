import * as React from 'react';

import { DependencyName, DependencyVersion, SpaceConfig } from 'modules';
import { Input } from 'components/Input';
import { Section } from 'components/Section';

import { Deps, NewProject, Projects, RunButton } from './components';

type Props = {
  space: SpaceConfig;
  onChangeDependencyNames: (value: SpaceConfig['dependencyNames']) => void;
  onChangePackagesFolderName: (
    value: SpaceConfig['packagesFolderName'],
  ) => void;
  onChangeProjectPaths: (value: SpaceConfig['projectPaths']) => void;
};

export const BumpDeps = ({
  space,
  onChangeDependencyNames,
  onChangePackagesFolderName,
  onChangeProjectPaths,
}: Props) => {
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
    <div className='flex flex-col gap-4 text-white p-4 min-h-full w-full overflow-auto'>
      <div className='flex items-center justify-end gap-4'>
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
          onChange={e => onChangePackagesFolderName(e.target.value)}
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
