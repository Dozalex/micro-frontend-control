import * as React from 'react';

import { ProjectPath, DependencyName, DependencyVersion } from 'modules';

import { Project } from './components';

type Props = {
  projects: ProjectPath[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectPath[]>>;
  projectsForUpdate: ProjectPath[];
  setProjectsForUpdate: React.Dispatch<React.SetStateAction<ProjectPath[]>>;
  deps: DependencyName[];
  packagesFolderName: string;
  depVersions: Record<DependencyName, DependencyVersion | undefined>;
  statusByProject: Record<string, string | undefined>;
};

export const Projects = ({
  projects,
  deps,
  packagesFolderName,
  setProjectsForUpdate,
  projectsForUpdate,
  depVersions,
  setProjects,
  statusByProject,
}: Props) => {
  const onDelete = (projectPath: string) => {
    setProjects(prev => prev.filter(path => path !== projectPath));
  };

  return (
    <div className='grid gap-3'>
      {projects.map(project => (
        <Project
          key={project}
          path={project}
          deps={deps}
          packagesFolderName={packagesFolderName}
          projectsForUpdate={projectsForUpdate}
          setProjectsForUpdate={setProjectsForUpdate}
          depVersions={depVersions}
          onDelete={onDelete}
          status={statusByProject[project]}
        />
      ))}
    </div>
  );
};
