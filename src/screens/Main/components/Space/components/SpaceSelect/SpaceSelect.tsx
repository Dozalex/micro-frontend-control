import * as React from 'react';

import { ChevronDown } from 'icons';
import { importSpaceConfig, SpaceConfig } from 'modules';
import { Dropdown } from 'components/Dropdown';

import { SpaceList } from './components';

type Props = {
  space: SpaceConfig;
  spaces: SpaceConfig[];
  onCreateSpace: (space: SpaceConfig) => void;
  onChangeSelectedSpaceId: (spaceId: SpaceConfig['id']) => void;
};

export const SpaceSelect = ({
  space,
  spaces,
  onCreateSpace,
  onChangeSelectedSpaceId,
}: Props) => {
  const onImport = () => {
    importSpaceConfig({ onCreateSpace });
  };

  return (
    <Dropdown
      hideOnClick
      placement='bottom-start'
      minWidth={250}
      renderContent={() => (
        <SpaceList
          spaces={spaces}
          activeSpaceId={space.id}
          onCreateSpace={onCreateSpace}
          onChangeSelectedSpaceId={onChangeSelectedSpaceId}
          onImport={onImport}
        />
      )}
    >
      <button
        type='button'
        className='flex items-center gap-2 text-gray-300 hover:text-sky-700 focus:outline-none focus-visible:text-sky-800'
      >
        {space.name}

        <ChevronDown className='w-4 h-4' />
      </button>
    </Dropdown>
  );
};
