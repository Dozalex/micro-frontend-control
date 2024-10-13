import * as React from 'react';

import { SpaceConfig, normalizeSpaceConfig } from 'modules/index';

type Props = {
  activeSpaceId?: SpaceConfig['id'];
  spaces: SpaceConfig[];
  onCreateSpace: (space: SpaceConfig) => void;
  onChangeSelectedSpaceId: (spaceId: SpaceConfig['id']) => void;
  onImport: () => void;
};

export const SpaceList = ({
  activeSpaceId,
  spaces,
  onCreateSpace,
  onChangeSelectedSpaceId,
  onImport,
}: Props) => (
  <div className='flex flex-col overflow-auto max-h-80'>
    {spaces.map(space => (
      <button
        key={space.id}
        type='button'
        onClick={() => onChangeSelectedSpaceId(space.id)}
        className={`flex p-3 text-sm text-white hover:bg-sky-800 focus:outline-none focus-visible:bg-sky-900 ${space.id === activeSpaceId ? 'bg-sky-700' : ''}`}
      >
        {space.name}
      </button>
    ))}

    <button
      type='button'
      onClick={() => onCreateSpace(normalizeSpaceConfig({}))}
      className='flex p-3 text-sm text-sky-500 hover:text-sky-600 focus:outline-none focus-visible:text-sky-700'
    >
      + create space
    </button>

    <button
      type='button'
      onClick={onImport}
      className='flex p-3 text-sm text-sky-500 hover:text-sky-600 focus:outline-none focus-visible:text-sky-700'
    >
      + import space
    </button>
  </div>
);
