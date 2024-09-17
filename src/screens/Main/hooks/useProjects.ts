import * as React from 'react';

import { ProjectPath } from 'modules';

const KEY = 'mfc-projectPaths';

const getValue = (): ProjectPath[] => {
  const value = localStorage.getItem(KEY);

  return value ? (JSON.parse(value) as ProjectPath[]) : [];
};

const saveValue = (data: ProjectPath[]) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

/** Followed projects */
export const useProjects = () => {
  const [projects, setProjects] = React.useState(getValue());

  // update ls value
  React.useEffect(() => {
    saveValue(projects);
  }, [projects]);

  return { projects, setProjects };
};
