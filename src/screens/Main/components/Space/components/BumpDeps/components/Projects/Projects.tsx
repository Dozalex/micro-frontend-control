import * as React from 'react';

import {
  ProjectPath,
  DependencyName,
  DependencyVersion,
  AppConfigContext,
} from 'modules';
import { Divider } from 'components/Divider';

import { Project } from './components';

type Props = {
  projectsForUpdate: ProjectPath[];
  setProjectsForUpdate: React.Dispatch<React.SetStateAction<ProjectPath[]>>;
  depVersions: Record<DependencyName, DependencyVersion | undefined>;
  statusesByProject: Record<string, string[] | undefined>;
  errorByProject: Record<string, string | undefined>;
};

export const Projects = ({
  setProjectsForUpdate,
  projectsForUpdate,
  depVersions,
  statusesByProject,
  errorByProject,
}: Props) => {
  const {
    space: { projectPaths, dependencyNames, packagesFolderName },
    onUpdateSpace,
  } = React.useContext(AppConfigContext);

  const onDelete = (projectPath: string) => {
    onUpdateSpace({
      projectPaths: projectPaths.filter(path => path !== projectPath),
    });
  };

  return (
    <div className='grid gap-3'>
      {projectPaths.map(project => (
        <React.Fragment key={project}>
          <Project
            path={project}
            deps={dependencyNames}
            packagesFolderName={packagesFolderName}
            projectsForUpdate={projectsForUpdate}
            setProjectsForUpdate={setProjectsForUpdate}
            depVersions={depVersions}
            onDelete={onDelete}
            statuses={statusesByProject[project]}
            error={errorByProject[project]}
          />

          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
};
