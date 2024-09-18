export type DependencyConfig = {
  latestDepVersionPath: string;
  showLatestDepVersion: boolean;
};

export type GitConfig = {
  newBranchName: string;
  remoteBranchName: string;
  commitMessage: string;
};

export type PipelineConfig = {
  makeCommit: boolean;
  makePush: boolean;
};

export type SpaceConfig = {
  id: string;
  name: string;
  dependencyNames: string[];
  dependencyConfig: DependencyConfig;
  gitConfig: GitConfig;
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
};
