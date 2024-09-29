import * as React from 'react';

import { AppConfigContext, AppConfigContextType } from 'modules';

import { useData } from './hooks';
import { Space } from './components';

export const Main = () => {
  const {
    appConfig,
    space,
    onCreateSpace,
    onChangeSpace,
    onUpdateSpace,
    onDeleteSpace,
    onChangeSelectedSpaceId,
    onChangeNvmPath,
  } = useData();

  const contextValue: AppConfigContextType | undefined = React.useMemo(
    () =>
      appConfig && space
        ? {
            appConfig,
            space,
            onCreateSpace,
            onChangeSpace,
            onUpdateSpace,
            onDeleteSpace,
            onChangeNvmPath,
            onChangeSelectedSpaceId,
          }
        : undefined,
    [
      appConfig,
      space,
      onCreateSpace,
      onChangeSpace,
      onUpdateSpace,
      onDeleteSpace,
      onChangeNvmPath,
      onChangeSelectedSpaceId,
    ],
  );

  if (!contextValue) return null;

  return (
    <AppConfigContext.Provider value={contextValue}>
      <Space />
    </AppConfigContext.Provider>
  );
};
