import * as React from 'react';

import { AppConfigContext, DependencyName, DependencyVersion } from 'modules';
import { Input } from 'components/Input';
import { Section } from 'components/Section';

import { Deps, NewProject, Projects, RunButton } from './components';

export const BumpDeps = () => {
  const {
    space: { packagesFolderName, dependencyNames },
    onUpdateSpace,
  } = React.useContext(AppConfigContext);

  // local data

  const [projectsForUpdate, setProjectsForUpdate] = React.useState<string[]>(
    [],
  );
  const [depVersions, setDepVersions] = React.useState<
    Record<DependencyName, DependencyVersion | undefined>
  >({});
  const [statusesByProject, setStatusesByProject] = React.useState<
    Record<string, string[] | undefined>
  >({});
  const [errorByProject, setErrorByProject] = React.useState<
    Record<string, string | undefined>
  >({});

  // remove duplicates
  const filteredDeps = React.useMemo(
    () => [...new Set(dependencyNames)],
    [dependencyNames],
  );

  return (
    <div className='relative flex flex-col gap-4 text-white px-4 h-full w-full overflow-auto'>
      <div className='sticky top-0 flex items-center justify-end gap-4 py-3 bg-gray-800'>
        <RunButton
          uniqueDependencyNames={filteredDeps}
          projectsForUpdate={projectsForUpdate}
          depVersions={depVersions}
          setStatusesByProject={setStatusesByProject}
          setErrorByProject={setErrorByProject}
        />
      </div>

      <Deps depVersions={depVersions} setDepVersions={setDepVersions} />

      <Section title='Project settings'>
        <Input
          label='Packages folder name'
          value={packagesFolderName}
          onChange={e =>
            onUpdateSpace({
              packagesFolderName: e.target.value,
            })
          }
        />
      </Section>

      <NewProject />

      <Projects
        projectsForUpdate={projectsForUpdate}
        setProjectsForUpdate={setProjectsForUpdate}
        depVersions={depVersions}
        statusesByProject={statusesByProject}
        errorByProject={errorByProject}
      />
    </div>
  );
};
