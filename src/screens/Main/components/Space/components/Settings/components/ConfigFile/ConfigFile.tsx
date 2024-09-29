import * as React from 'react';

import { AppConfigContext } from 'modules';
import { Divider } from 'components/Divider';
import { Hint } from 'components/Hint';
import { Input } from 'components/Input';

import { DeleteSection, ExportSection, ImportSection } from './components';

type Props = {
  onCloseModal: () => void;
};

export const ConfigFile = ({ onCloseModal }: Props) => {
  const { space, onUpdateSpace } = React.useContext(AppConfigContext);

  return (
    <React.Fragment>
      <div>
        <Input
          label='Space name'
          value={space.name}
          onChange={e => onUpdateSpace({ name: e.target.value })}
        />

        <Hint>
          Use different space names to differentiate projects from each other.
        </Hint>
      </div>

      <Divider />

      <ImportSection />

      <Divider />

      <ExportSection space={space} />

      <Divider />

      <DeleteSection onCloseModal={onCloseModal} />
    </React.Fragment>
  );
};
