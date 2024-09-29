export type RunCommandOptions = {
  path?: string;
  command: string;
  // nvm is required if user has a few node versions on his device
  // or if he needs to change node version for specific project
  nvmPath?: string;
  // if user needs to change node version for specific project
  nodeVersion?: string;
};
