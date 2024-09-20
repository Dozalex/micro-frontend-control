import * as React from 'react';

import { SpaceConfig } from 'modules';
import { TabsProps, useTabs } from 'components/Tabs';

import { SPACE_TAB as TAB } from './constants';
import { useSpace } from './hooks';
import { Settings, SpaceSelect, BumpDeps } from './components';

type Props = {
  space: SpaceConfig;
  spaces: SpaceConfig[];
  onCreateSpace: (space: SpaceConfig) => void;
  onChangeSpace: (space: SpaceConfig) => void;
  onDeleteSpace: (spaceId: string) => void;
  onChangeSelectedSpaceId: (spaceId: SpaceConfig['id']) => void;
};

export const Space = ({
  space,
  spaces,
  onCreateSpace,
  onChangeSpace,
  onDeleteSpace,
  onChangeSelectedSpaceId,
}: Props) => {
  const {
    onChangeDependencyConfig,
    onChangeDependencyNames,
    onChangeGitConfig,
    onChangePackagesFolderName,
    onChangePipelineConfig,
    onChangeProjectPaths,
    onChangeSpaceName,
  } = useSpace({ space, onChangeSpace });

  const tabs: TabsProps['tabs'] = [
    {
      id: TAB.bumpDeps,
      title: 'Bump deps',
    },
  ];

  const { activeTabId, tabsComponent } = useTabs({ tabs });

  const content = (() => {
    switch (activeTabId) {
      case TAB.bumpDeps:
        return (
          <BumpDeps
            space={space}
            onChangeDependencyNames={onChangeDependencyNames}
            onChangePackagesFolderName={onChangePackagesFolderName}
            onChangeProjectPaths={onChangeProjectPaths}
          />
        );
      default:
        return null;
    }
  })();

  return (
    <div className='flex flex-col text-white p-4 h-full w-full overflow-hidden'>
      <div className='flex items-center justify-end gap-4'>
        <div className='mr-auto'>
          <SpaceSelect
            space={space}
            spaces={spaces}
            onChangeSelectedSpaceId={onChangeSelectedSpaceId}
            onCreateSpace={onCreateSpace}
          />
        </div>

        <Settings
          space={space}
          onChangePipelineConfig={onChangePipelineConfig}
          onChangeGitConfig={onChangeGitConfig}
          onChangeDependencyConfig={onChangeDependencyConfig}
          onChangeSpaceName={onChangeSpaceName}
          onCreateSpace={onCreateSpace}
          onDeleteSpace={onDeleteSpace}
        />
      </div>

      {tabsComponent}

      {content}
    </div>
  );
};
