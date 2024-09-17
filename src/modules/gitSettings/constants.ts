import { GitSettings } from './types';

export const DEFAULT_GIT_SETTING: GitSettings = {
  newBranchName: 'fix/bump-deps',
  remoteBranchName: 'origin/develop',
  commitMessage: 'fix: bump deps.',
};
