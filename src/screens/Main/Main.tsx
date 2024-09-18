import * as React from 'react';

import { useData } from './hooks';
import { Space } from './components';

export const Main = () => {
  const { space, onChangeSpace } = useData();

  if (!space) return null;

  return <Space space={space} onChangeSpace={onChangeSpace} />;
};
