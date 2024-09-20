import * as React from 'react';

import { SpaceConfig } from 'modules/index';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { useTabs, TabsProps } from 'components/Tabs';

import { SETTINGS_TAB as TAB } from './constants';
import {
  ConfigFile,
  GitSettings,
  PipelineSettings,
  DependencySettings,
} from './components';

type Props = {
  space: SpaceConfig;
  onChangeGitConfig: (value: SpaceConfig['gitConfig']) => void;
  onChangeDependencyConfig: (value: SpaceConfig['dependencyConfig']) => void;
  onChangePipelineConfig: (value: SpaceConfig['pipelineConfig']) => void;
  onChangeSpaceName: (value: SpaceConfig['name']) => void;
  onCreateSpace: (space: SpaceConfig) => void;
  onDeleteSpace: (spaceId: string) => void;
};

export const Settings = ({
  space,
  onChangeGitConfig,
  onChangeDependencyConfig,
  onChangePipelineConfig,
  onChangeSpaceName,
  onCreateSpace,
  onDeleteSpace,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { gitConfig, dependencyConfig, pipelineConfig } = space;

  const onCloseModal = React.useCallback(() => setIsOpen(false), []);

  const tabs: TabsProps['tabs'] = [
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
      case TAB.git:
        return (
          <GitSettings
            gitConfig={gitConfig}
            onChangeGitConfig={onChangeGitConfig}
          />
        );
      case TAB.pipeline:
        return (
          <PipelineSettings
            pipelineConfig={pipelineConfig}
            onChangePipelineConfig={onChangePipelineConfig}
          />
        );
      case TAB.dependency:
        return (
          <DependencySettings
            dependencyConfig={dependencyConfig}
            onChangeDependencyConfig={onChangeDependencyConfig}
          />
        );
      case TAB.configFile:
        return (
          <ConfigFile
            space={space}
            onChangeSpaceName={onChangeSpaceName}
            onCreateSpace={onCreateSpace}
            onDeleteSpace={onDeleteSpace}
            onCloseModal={onCloseModal}
          />
        );
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
