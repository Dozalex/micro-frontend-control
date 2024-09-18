import * as React from 'react';

import { SpaceConfig } from 'modules';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Modal } from 'components/Modal';

type Props = {
  pipelineConfig: SpaceConfig['pipelineConfig'];
  onChangePipelineConfig: (value: SpaceConfig['pipelineConfig']) => void;
};

export const PipelineSettings = ({
  pipelineConfig: settings,
  onChangePipelineConfig,
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
              onChangePipelineConfig({
                ...settings,
                makeCommit: newChecked,
              })
            }
          />

          <Checkbox
            label='Make push'
            checked={settings.makePush}
            onChange={newChecked =>
              onChangePipelineConfig({
                ...settings,
                makePush: newChecked,
              })
            }
          />
        </Modal>
      )}
    </React.Fragment>
  );
};
