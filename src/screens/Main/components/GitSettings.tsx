import * as React from 'react';

import { GitSettings as GitSettingsType } from 'modules';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { Textarea } from 'components/Textarea';

type Props = {
  gitSettings: GitSettingsType;
  setGitSettings: React.Dispatch<React.SetStateAction<GitSettingsType>>;
};

export const GitSettings = ({ gitSettings, setGitSettings }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onChangeLatestDepVersionPath = async () => {
    const filePaths = await window.electronAPI.openFolderDialog();
    const path = filePaths[0];

    if (!path) return;

    setGitSettings(prev => ({
      ...prev,
      latestDepVersionPath: path,
    }));
  };

  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>Git settings</Button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title='Git settings'>
          <Input
            label='New branch name'
            value={gitSettings.newBranchName}
            onChange={e =>
              setGitSettings(prev => ({
                ...prev,
                newBranchName: e.target.value,
              }))
            }
          />

          <Input
            label='Remote branch name'
            value={gitSettings.remoteBranchName}
            onChange={e =>
              setGitSettings(prev => ({
                ...prev,
                remoteBranchName: e.target.value,
              }))
            }
          />

          <Textarea
            label='Commit message'
            value={gitSettings.commitMessage}
            onChange={e =>
              setGitSettings(prev => ({
                ...prev,
                commitMessage: e.target.value,
              }))
            }
            rows={4}
          />

          <Checkbox
            label='Show latest dependency version'
            checked={!!gitSettings.showLatestDepVersion}
            onChange={checked =>
              setGitSettings(prev => ({
                ...prev,
                showLatestDepVersion: checked,
              }))
            }
          />

          {gitSettings.showLatestDepVersion && (
            <Input
              label='Path to request latest dependency version'
              value={gitSettings.latestDepVersionPath}
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
