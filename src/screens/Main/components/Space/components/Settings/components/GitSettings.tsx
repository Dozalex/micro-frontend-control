import * as React from 'react';

import { SpaceConfig } from 'modules';
import { Divider } from 'components/Divider';
import { Hint } from 'components/Hint';
import { Input } from 'components/Input';
import { Textarea } from 'components/Textarea';

type Props = {
  gitConfig: SpaceConfig['gitConfig'];
  onChangeGitConfig: (value: SpaceConfig['gitConfig']) => void;
};

export const GitSettings = ({ gitConfig, onChangeGitConfig }: Props) => (
  <React.Fragment>
    <div>
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

      <Hint>
        The name of the new branch within which automated processes will be
        performed.
      </Hint>
    </div>

    <Divider />

    <div>
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

      <Hint>
        The name of the remote branch on which the new branch will be created.
      </Hint>
    </div>

    <Divider />

    <div>
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

      <Hint>The message that will be set for the commit.</Hint>
    </div>
  </React.Fragment>
);
