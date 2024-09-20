import * as React from 'react';

import { SpaceConfig } from 'modules';
import { Divider } from 'components/Divider';
import { Hint } from 'components/Hint';
import { Input } from 'components/Input';

import { DeleteSection, ExportSection, ImportSection } from './components';

type Props = {
  space: SpaceConfig;
  onCreateSpace: (space: SpaceConfig) => void;
  onDeleteSpace: (spaceId: string) => void;
  onCloseModal: () => void;
  onChangeSpaceName: (value: SpaceConfig['name']) => void;
};

export const ConfigFile = ({
  space,
  onCreateSpace,
  onDeleteSpace,
  onCloseModal,
  onChangeSpaceName,
}: Props) => (
  <React.Fragment>
    <div>
      <Input
        label='Space name'
        value={space.name}
        onChange={e => onChangeSpaceName(e.target.value)}
      />

      <Hint>
        Use different space names to differentiate projects from each other.
      </Hint>
    </div>

    <Divider />

    <ImportSection onCreateSpace={onCreateSpace} />

    <Divider />

    <ExportSection space={space} />

    <Divider />

    <DeleteSection
      space={space}
      onDeleteSpace={onDeleteSpace}
      onCloseModal={onCloseModal}
    />
  </React.Fragment>
);
