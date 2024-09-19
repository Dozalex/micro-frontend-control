import * as React from 'react';

import { SpaceConfig } from 'modules';
import { Divider } from 'components/Divider';

import { DeleteSection, ExportSection, ImportSection } from './components';

type Props = {
  space: SpaceConfig;
  onCreateSpace: (space: SpaceConfig) => void;
  onDeleteSpace: (spaceId: string) => void;
  onCloseModal: () => void;
};

export const ConfigFile = ({
  space,
  onCreateSpace,
  onDeleteSpace,
  onCloseModal,
}: Props) => (
  <React.Fragment>
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
