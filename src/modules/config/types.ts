export type DependencyConfig = {
  latestDepVersionPath: string;
  /** Prefix for applying the latest version of dependency.
   * * ^, ~, >, >=
   * */
  latestVersionRangePrefix?: string;
  showLatestDepVersion: boolean;
};

export type GitConfig = {
  newBranchName: string;
  remoteBranchName: string;
  commitMessage: string;
};

export type PipelineConfig = {
  checkUncommittedChanges: boolean;
  makeNewBranch: boolean;
  makeInstall: boolean;
  makeLint: boolean;
  makeCommit: boolean;
  makePush: boolean;
  deleteNewBranch: boolean;
};

export type SpaceConfig = {
  // for migrations
  configVersionNumber: number;
  id: string;
  name: string;
  dependencyNames: string[];
  dependencyConfig: DependencyConfig;
  gitConfig: GitConfig;
  // node version (e.g. 18.18.0)
  nodeVersion?: string;
  packagesFolderName: string;
  pipelineConfig: PipelineConfig;
  projectPaths: string[];
  repositoryUrls: string[];
};

export type AppConfig = {
  // for migrations
  configVersionNumber: number;
  spaces: SpaceConfig[];
  // last selected space id
  lastSpaceId?: string;
  // path to nvm.sh (e.g. ~/.nvm/nvm.sh)
  nvmPath?: string;
};
