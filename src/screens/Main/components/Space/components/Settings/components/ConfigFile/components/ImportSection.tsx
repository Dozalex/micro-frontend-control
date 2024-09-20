import * as React from 'react';

import { SpaceConfig, importSpaceConfig } from 'modules';
import { Button } from 'components/Button';
import { Hint } from 'components/Hint';

type Props = {
  onCreateSpace: (space: SpaceConfig) => void;
};

export const ImportSection = ({ onCreateSpace }: Props) => {
  const onImport = () => {
    importSpaceConfig({ onCreateSpace });
  };

  return (
    <div>
      <Button onClick={onImport}>Import space config</Button>

      <Hint>The new space will be added to your space list.</Hint>
    </div>
  );
};
