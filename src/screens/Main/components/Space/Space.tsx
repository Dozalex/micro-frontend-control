import * as React from 'react';

import { TabsProps, useTabs } from 'components/Tabs';

import { SPACE_TAB as TAB } from './constants';
import { Settings, SpaceSelect, BumpDeps } from './components';

export const Space = () => {
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
        return <BumpDeps />;
      default:
        return null;
    }
  })();

  return (
    <div className='flex flex-col text-white p-4 h-full w-full overflow-hidden'>
      <div className='flex items-center justify-end gap-4'>
        <div className='mr-auto'>
          <SpaceSelect />
        </div>

        <Settings />
      </div>

      {tabsComponent}

      {content}
    </div>
  );
};
