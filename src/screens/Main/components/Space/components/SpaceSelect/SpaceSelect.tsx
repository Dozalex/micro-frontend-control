import * as React from 'react';

import { ChevronDown } from 'icons';
import { AppConfigContext, importSpaceConfig } from 'modules';
import { Dropdown } from 'components/Dropdown';

import { SpaceList } from './components';

export const SpaceSelect = () => {
  const { appConfig, space, onCreateSpace, onChangeSelectedSpaceId } =
    React.useContext(AppConfigContext);

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
          spaces={appConfig.spaces}
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
