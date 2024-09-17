// path to directory with project
export type ProjectPath = string;

export type DependencyName = string;
export type DependencyVersion = string;

export type PackageJson = {
  name: string;
  version: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};
