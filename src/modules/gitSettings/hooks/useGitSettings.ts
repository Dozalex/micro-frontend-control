import * as React from 'react';

import { DEFAULT_GIT_SETTING } from '../constants';
import { GitSettings } from '../types';

const KEY = 'mfc-gitSettings';

const getValue = () => {
  const value = localStorage.getItem(KEY);

  return value ? JSON.parse(value) : undefined;
};

const saveValue = (data: GitSettings) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const useGitSettings = () => {
  const [gitSettings, setGitSettings] = React.useState({
    // do spread for a future settings
    ...DEFAULT_GIT_SETTING,
    ...getValue(),
  });

  // update ls value
  React.useEffect(() => {
    saveValue(gitSettings);
  }, [gitSettings]);

  return { gitSettings, setGitSettings };
};
