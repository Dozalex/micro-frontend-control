import * as React from 'react';

import { DEFAULT_PIPELINE_SETTING } from '../constants';
import { PipelineSettings } from '../types';

const KEY = 'mfc-pipelineSettings';

const getValue = () => {
  const value = localStorage.getItem(KEY);

  return value ? JSON.parse(value) : undefined;
};

const saveValue = (data: PipelineSettings) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const usePipelineSettings = () => {
  const [pipelineSettings, setPipelineSettings] = React.useState({
    // do spread for a future settings
    ...DEFAULT_PIPELINE_SETTING,
    ...getValue(),
  });

  // update ls value
  React.useEffect(() => {
    saveValue(pipelineSettings);
  }, [pipelineSettings]);

  return { pipelineSettings, setPipelineSettings };
};
