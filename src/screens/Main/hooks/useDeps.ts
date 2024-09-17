import * as React from 'react';

import { DependencyName } from 'modules';

const KEY = 'mfc-depNames';

const getValue = (): DependencyName[] => {
  const value = localStorage.getItem(KEY);

  return value ? (JSON.parse(value) as DependencyName[]) : [];
};

const saveValue = (data: DependencyName[]) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

/** Followed dependencies */
export const useDeps = () => {
  const [deps, setDeps] = React.useState(getValue());

  // update ls value
  React.useEffect(() => {
    saveValue(deps);
  }, [deps]);

  return { deps, setDeps };
};
