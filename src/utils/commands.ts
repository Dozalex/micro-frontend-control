import { DependencyName, DependencyVersion, PackageJson } from 'modules';

import { replaceVersionInPackageJson } from './versions';

export const getPackageJsonText = async ({ path }: { path: string }) => {
  try {
    return await window.electronAPI.getFileContent(`${path}/package.json`);
  } catch (err) {
    console.error(`Failed to get package.json by path ${path}`, err);

    throw err;
  }
};

export const getPackageJsonObject = async ({ path }: { path: string }) => {
  try {
    const fileContent = await window.electronAPI.getFileContent(
      `${path}/package.json`,
    );

    return JSON.parse(fileContent) as PackageJson;
  } catch (err) {
    console.error(`Failed to get package.json by path ${path}`, err);

    throw err;
  }
};

export const getProjectPackageFolderNames = async ({
  path,
  packagesFolderName,
}: {
  path: string;
  packagesFolderName: string;
}) => {
  const joinedPath = `${path}/${packagesFolderName}`;

  try {
    return await window.electronAPI.getChildFolderNames(joinedPath);
  } catch (err) {
    console.error(
      `Failed to get project package folder names by path ${joinedPath}`,
      err,
    );

    throw err;
  }
};

export const updatePackageJson = async ({
  path,
  packageJsonText,
}: {
  path: string;
  packageJsonText: string;
}) => {
  try {
    await window.electronAPI.changeFileContent(
      `${path}/package.json`,
      packageJsonText,
    );
  } catch (err) {
    console.error(`Failed to update package.json by path ${path}`, err);

    throw err;
  }
};

/**
 * Method to replace dependency versions for yarn v1+.
 *
 * Returns hasChanges: boolean
 * */
export const replaceDepsInPackageJson = async ({
  path,
  packageJsonText,
  deps,
  depVersions,
}: {
  path: string;
  packageJsonText: string;
  deps: DependencyName[];
  depVersions: Record<DependencyName, DependencyVersion>;
}): Promise<boolean> => {
  let newPackageJsonText = packageJsonText;

  deps.forEach(dep => {
    if (depVersions[dep]) {
      newPackageJsonText = replaceVersionInPackageJson({
        packageJsonText: newPackageJsonText,
        packageName: dep,
        newVersion: depVersions[dep],
      });
    }
  });

  // compare old and new package json
  const hasChanges = packageJsonText !== newPackageJsonText;

  if (hasChanges) {
    await updatePackageJson({ path, packageJsonText: newPackageJsonText });
  }

  return hasChanges;
};

/** check an uncommited changes in a current branch */
export const gitCheckUncommitedChangesInProject = async ({
  path,
}: {
  // the project root path
  path: string;
}) => {
  try {
    await window.electronAPI.runCommand({
      path,
      command: 'git diff --quiet && git diff --cached --quiet',
    });
  } catch (err) {
    console.error(`Failed to check an uncommited changes by path ${path}`, err);

    throw err;
  }
};

/** fetch the latest changes from the remote repository */
export const gitFetch = async ({
  path,
}: {
  // the project root path
  path: string;
}) => {
  try {
    await window.electronAPI.runCommand({
      path,
      command: 'git fetch',
    });
  } catch (err) {
    console.error(`Failed to git fetch by path ${path}`, err);

    throw err;
  }
};

/** get current branch name */
export const gitGetCurrentBranchName = async ({
  path,
}: {
  // the project root path
  path: string;
}) => {
  try {
    return await window.electronAPI.runCommand({
      path,
      command: 'git symbolic-ref --short HEAD',
    });
  } catch (err) {
    console.error(`Failed to get current git branch name by path ${path}`, err);

    throw err;
  }
};

/** create new branch to have last remote changes */
export const gitCheckoutNewBranch = async ({
  path,
  newBranchName,
  remoteBranchName,
}: {
  // the project root path
  path: string;
  newBranchName: string;
  remoteBranchName: string;
}) => {
  try {
    await window.electronAPI.runCommand({
      path,
      command: `git checkout -b ${newBranchName} ${remoteBranchName}`,
    });
  } catch (err) {
    console.error(`Failed to checkout to new branch by path ${path}`, err);

    throw err;
  }
};

/** checkout branch */
export const gitCheckoutBranch = async ({
  path,
  branchName,
}: {
  // the project root path
  path: string;
  branchName: string;
}) => {
  try {
    await window.electronAPI.runCommand({
      path,
      command: `git checkout ${branchName}`,
    });
  } catch (err) {
    console.error(`Failed to checkout to branch by path ${path}`, err);

    throw err;
  }
};

export const gitDeleteBranch = async ({
  path,
  branchName,
}: {
  // the project root path
  path: string;
  branchName: string;
}) => {
  try {
    await window.electronAPI.runCommand({
      path,
      command: `git branch -D ${branchName}`,
    });
  } catch (err) {
    console.error(`Failed to delete the branch by path ${path}`, err);

    throw err;
  }
};

/** install dependencies */
export const installDeps = async ({
  path,
}: {
  // the project root path
  path: string;
}) => {
  try {
    await window.electronAPI.runCommand({
      path,
      command: 'yarn',
    });
  } catch (err) {
    console.error(`Failed to run yarn by path ${path}`, err);

    throw err;
  }
};

/** run lint */
export const runLint = async ({
  path,
}: {
  // the project root path
  path: string;
}) => {
  try {
    await window.electronAPI.runCommand({
      path,
      command: 'yarn lint',
    });
  } catch (err) {
    console.error(`Failed to lint by path ${path}`, err);

    throw err;
  }
};

export const gitCommitChanges = async ({
  path,
  commitMessage,
}: {
  // the project root path
  path: string;
  commitMessage: string;
}) => {
  try {
    await window.electronAPI.runCommand({
      path,
      command: `git commit -am "${commitMessage}"`,
    });
  } catch (err) {
    console.error(`Failed to commit by path ${path}`, err);

    throw err;
  }
};

export const gitPushBranch = async ({
  path,
  newBranchName,
}: {
  // the project root path
  path: string;
  newBranchName: string;
}) => {
  try {
    await window.electronAPI.runCommand({
      path,
      command: `git push origin ${newBranchName}`,
    });
  } catch (err) {
    console.error(`Failed to push branch by path ${path}`, err);

    throw err;
  }
};
