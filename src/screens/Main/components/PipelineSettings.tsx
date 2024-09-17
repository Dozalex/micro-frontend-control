import * as React from 'react';

import { PipelineSettings as PipelineSettingsType } from 'modules';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Modal } from 'components/Modal';

type Props = {
  pipelineSettings: PipelineSettingsType;
  setPipelineSettings: React.Dispatch<
    React.SetStateAction<PipelineSettingsType>
  >;
};

export const PipelineSettings = ({
  pipelineSettings: settings,
  setPipelineSettings,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>Pipeline settings</Button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title='Pipeline settings'>
          <Checkbox
            label='Make commit'
            checked={settings.makeCommit}
            onChange={newChecked =>
              setPipelineSettings(prev => ({
                ...prev,
                makeCommit: newChecked,
              }))
            }
          />

          <Checkbox
            label='Make push'
            checked={settings.makePush}
            onChange={newChecked =>
              setPipelineSettings(prev => ({
                ...prev,
                makePush: newChecked,
              }))
            }
          />
        </Modal>
      )}
    </React.Fragment>
  );
};
