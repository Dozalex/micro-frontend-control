import * as React from 'react';

import { useData } from './hooks';
import { Space } from './components';

export const Main = () => {
  const {
    appConfig,
    space,
    onCreateSpace,
    onChangeSpace,
    onDeleteSpace,
    onChangeSelectedSpaceId,
  } = useData();

  if (!appConfig || !space) return null;

  return (
    <Space
      space={space}
      spaces={appConfig.spaces}
      onCreateSpace={onCreateSpace}
      onChangeSpace={onChangeSpace}
      onDeleteSpace={onDeleteSpace}
      onChangeSelectedSpaceId={onChangeSelectedSpaceId}
    />
  );
};
