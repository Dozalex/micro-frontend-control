import * as React from 'react';

import { useData } from './hooks';
import { Space } from './components';

export const Main = () => {
  const { space, onCreateSpace, onChangeSpace, onDeleteSpace } = useData();

  if (!space) return null;

  return (
    <Space
      space={space}
      onCreateSpace={onCreateSpace}
      onChangeSpace={onChangeSpace}
      onDeleteSpace={onDeleteSpace}
    />
  );
};
