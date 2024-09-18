import * as React from 'react';

import { SpaceConfig } from 'modules';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { Textarea } from 'components/Textarea';

type Props = {
  gitConfig: SpaceConfig['gitConfig'];
  onChangeGitConfig: (value: SpaceConfig['gitConfig']) => void;
  dependencyConfig: SpaceConfig['dependencyConfig'];
  onChangeDependencyConfig: (value: SpaceConfig['dependencyConfig']) => void;
};

export const GitSettings = ({
  gitConfig,
  dependencyConfig,
  onChangeGitConfig,
  onChangeDependencyConfig,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onChangeLatestDepVersionPath = async () => {
    const filePaths = await window.electronAPI.openFolderDialog();
    const path = filePaths[0];

    if (!path) return;

    onChangeDependencyConfig({
      ...dependencyConfig,
      latestDepVersionPath: path,
    });
  };

  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>Git settings</Button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title='Git settings'>
          <Input
            label='New branch name'
            value={gitConfig.newBranchName}
            onChange={e =>
              onChangeGitConfig({
                ...gitConfig,
                newBranchName: e.target.value,
              })
            }
          />

          <Input
            label='Remote branch name'
            value={gitConfig.remoteBranchName}
            onChange={e =>
              onChangeGitConfig({
                ...gitConfig,
                remoteBranchName: e.target.value,
              })
            }
          />

          <Textarea
            label='Commit message'
            value={gitConfig.commitMessage}
            onChange={e =>
              onChangeGitConfig({
                ...gitConfig,
                commitMessage: e.target.value,
              })
            }
            rows={4}
          />

          <Checkbox
            label='Show latest dependency version'
            checked={dependencyConfig.showLatestDepVersion}
            onChange={checked =>
              onChangeDependencyConfig({
                ...dependencyConfig,
                showLatestDepVersion: checked,
              })
            }
          />

          {dependencyConfig.showLatestDepVersion && (
            <Input
              label='Path to request latest dependency version'
              value={dependencyConfig.latestDepVersionPath}
              onClick={onChangeLatestDepVersionPath}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  onChangeLatestDepVersionPath();
                }
              }}
              readOnly
            />
          )}
        </Modal>
      )}
    </React.Fragment>
  );
};
