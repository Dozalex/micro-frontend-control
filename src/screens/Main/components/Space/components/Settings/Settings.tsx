import * as React from 'react';

import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { useTabs, TabsProps } from 'components/Tabs';

import { SETTINGS_TAB as TAB } from './constants';
import {
  NodeSettings,
  ConfigFile,
  GitSettings,
  PipelineSettings,
  DependencySettings,
} from './components';

export const Settings = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onCloseModal = React.useCallback(() => setIsOpen(false), []);

  const tabs: TabsProps['tabs'] = [
    {
      id: TAB.node,
      title: 'Node',
    },
    {
      id: TAB.pipeline,
      title: 'Pipeline',
    },
    {
      id: TAB.git,
      title: 'Git',
    },
    {
      id: TAB.dependency,
      title: 'Dependency',
    },
    {
      id: TAB.configFile,
      title: 'Space',
    },
  ];

  const { activeTabId, tabsComponent } = useTabs({ tabs });

  const content = (() => {
    switch (activeTabId) {
      case TAB.node:
        return <NodeSettings />;
      case TAB.git:
        return <GitSettings />;
      case TAB.pipeline:
        return <PipelineSettings />;
      case TAB.dependency:
        return <DependencySettings />;
      case TAB.configFile:
        return <ConfigFile onCloseModal={onCloseModal} />;
      default:
        return null;
    }
  })();

  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>Settings</Button>

      {isOpen && (
        <Modal onClose={onCloseModal} title='Settings' fullHeight noTopPadding>
          {tabsComponent}

          {content}
        </Modal>
      )}
    </React.Fragment>
  );
};
