import * as React from 'react';

import {
  SpaceConfig,
  normalizeSpaceConfig,
  SPACE_CONFIG_VERSION,
} from 'modules';
import { readFile } from 'utils';
import { Button } from 'components/Button';
import { Hint } from 'components/Hint';

type Props = {
  onCreateSpace: (space: SpaceConfig) => void;
};

export const ImportSection = ({ onCreateSpace }: Props) => {
  const onImport = async () => {
    try {
      const filePaths = await window.electronAPI.openFileDialog({
        filters: [
          {
            name: 'Space config',
            extensions: ['json'],
          },
        ],
      });
      const path = filePaths[0];

      if (!path) return;

      const newConfigText = await readFile({ path });
      const newConfig = JSON.parse(newConfigText) as SpaceConfig;

      onCreateSpace(normalizeSpaceConfig(newConfig));

      if (newConfig.configVersionNumber > SPACE_CONFIG_VERSION) {
        await window.electronAPI.showAlert({
          title: 'The imported config version is higher than the used one.',
          message:
            'Some config data may be missing. For correct operation, it is recommended to get the latest version of the application.',
          type: 'info',
        });
      }
    } catch (e) {
      console.error(e);

      await window.electronAPI.showAlert({
        title: 'Failed to import config',
        message: 'Check the file for errors',
        type: 'warning',
      });
    }
  };

  return (
    <div>
      <Button onClick={onImport}>Import space config</Button>

      <Hint>The new space will be added to your space list.</Hint>
    </div>
  );
};
