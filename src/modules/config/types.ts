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
  makeLint: boolean;
  makeCommit: boolean;
  makePush: boolean;
};

export type SpaceConfig = {
  // for migrations
  configVersionNumber: number;
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
