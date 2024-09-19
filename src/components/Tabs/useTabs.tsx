import * as React from 'react';

import { Tabs, TabsProps } from './Tabs';

type Props = {
  tabs: TabsProps['tabs'];
};

export const useTabs = ({ tabs }: Props) => {
  const [activeTabId, setActiveTabId] = React.useState(tabs[0]?.id);

  return {
    activeTabId,
    setActiveTabId,
    tabsComponent: (
      <Tabs activeTabId={activeTabId} tabs={tabs} onChange={setActiveTabId} />
    ),
  };
};
