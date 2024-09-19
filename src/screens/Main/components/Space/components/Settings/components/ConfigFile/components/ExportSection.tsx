import * as React from 'react';

import { SpaceConfig, prepareSpaceConfigForExport } from 'modules';
import { Button } from 'components/Button';
import { Hint } from 'components/Hint';

type Props = {
  space: SpaceConfig;
};

export const ExportSection = ({ space }: Props) => {
  const onExport = async () => {
    const filePaths = await window.electronAPI.openFolderDialog();
    const path = filePaths[0];

    if (!path) return;

    await window.electronAPI.writeFile(
      `${path}/${space.name || space.id}-space-config.json`,
      JSON.stringify(prepareSpaceConfigForExport(space)),
    );
  };

  return (
    <div>
      <Button onClick={onExport}>Export space config</Button>

      <Hint>Export the space config to share it with your teammates.</Hint>
    </div>
  );
};
