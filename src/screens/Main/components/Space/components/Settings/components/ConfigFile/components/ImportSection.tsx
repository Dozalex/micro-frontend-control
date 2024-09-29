import * as React from 'react';

import { importSpaceConfig, AppConfigContext } from 'modules';
import { Button } from 'components/Button';
import { Hint } from 'components/Hint';

export const ImportSection = () => {
  const { onCreateSpace } = React.useContext(AppConfigContext);

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
