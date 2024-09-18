import * as React from 'react';

import { DependencyName, DependencyVersion, SpaceConfig } from 'modules';
import {
  getPackageJsonText,
  getProjectPackageFolderNames,
  gitCheckUncommitedChangesInProject,
  gitCheckoutBranch,
  gitCheckoutNewBranch,
  gitCommitChanges,
  gitDeleteBranch,
  gitFetch,
  gitGetCurrentBranchName,
  gitPushBranch,
  installDeps,
  replaceDepsInPackageJson,
  runLint,
} from 'utils';
import { Button } from 'components/Button';

type Props = {
  deps: DependencyName[];
  depVersions: Record<DependencyName, DependencyVersion | undefined>;
  projectsForUpdate: string[];
  packagesFolderName: string;
  gitConfig: SpaceConfig['gitConfig'];
  pipelineConfig: SpaceConfig['pipelineConfig'];
  setStatusByProject: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
};

export const RunButton = ({
  deps,
  depVersions,
  projectsForUpdate,
  packagesFolderName,
  gitConfig,
  pipelineConfig,
  setStatusByProject,
}: Props) => {
  const [inProgress, setInProgress] = React.useState(false);

  const onApply = async () => {
    // reset statuses
    setStatusByProject({});

    if (!projectsForUpdate.length) {
      await window.electronAPI.showAlert({
        title: 'No projects',
        message: 'Select a projects to update them',
        type: 'warning',
      });

      return;
    }

    if (!Object.values(depVersions).filter(Boolean).length) {
      await window.electronAPI.showAlert({
        title: 'No versions',
        message: 'Fill a dependency versions',
        type: 'warning',
      });

      return;
    }

    setInProgress(true);

    const { commitMessage, newBranchName, remoteBranchName } = gitConfig;
    const { makeCommit, makePush } = pipelineConfig;

    // loop through each selected project
    await Promise.allSettled(
      projectsForUpdate.map(async path => {
        const changeStatus = (status: string) =>
          setStatusByProject(prev => ({ ...prev, [path]: status }));

        try {
          changeStatus('changes checking...');
          await gitCheckUncommitedChangesInProject({ path });

          changeStatus('git fetch...');
          await gitFetch({ path });

          changeStatus('create new branch...');
          const currentBranchName = await gitGetCurrentBranchName({ path });
          await gitCheckoutNewBranch({ path, newBranchName, remoteBranchName });

          // to check that some changes have been applied for this project
          let hasChanges = false;

          const packageJsonText = await getPackageJsonText({ path });

          const hasChangesInTheRootPackageJson = await replaceDepsInPackageJson(
            {
              path,
              packageJsonText,
              deps,
              depVersions,
            },
          );

          if (hasChangesInTheRootPackageJson) {
            hasChanges = true;
          }

          if (packagesFolderName) {
            let folderNames: string[] = [];

            try {
              folderNames = await getProjectPackageFolderNames({
                path,
                packagesFolderName,
              });
            } catch (err) {
              // It's not required to have the packages folder in the project
              // so error is available
              console.error('Failed to get the project packages', err);
            }

            if (folderNames.length) {
              // check an every package in the project
              await Promise.all(
                folderNames.map(async folderName => {
                  const packageJsonPath = `${path}/${packagesFolderName}/${folderName}`;
                  const packageJsonText = await getPackageJsonText({
                    path: packageJsonPath,
                  });

                  const hasChangesInThePackageJson =
                    await replaceDepsInPackageJson({
                      path: packageJsonPath,
                      packageJsonText,
                      deps,
                      depVersions,
                    });

                  if (hasChangesInThePackageJson) {
                    hasChanges = true;
                  }
                }),
              );
            }
          }

          if (!hasChanges) {
            changeStatus('no changes');
            return;
          }

          // all packages json files has been changes here

          changeStatus('dependencies installing...');
          await installDeps({ path });

          changeStatus('lint checking...');
          await runLint({ path });

          if (makeCommit) {
            changeStatus('changes commiting...');
            await gitCommitChanges({ path, commitMessage });

            if (makePush) {
              changeStatus('changes pushing...');
              await gitPushBranch({ path, newBranchName });
              changeStatus('new branch deletion...');
              await gitCheckoutBranch({ path, branchName: currentBranchName });
              await gitDeleteBranch({ path, branchName: newBranchName });
            }
          }

          changeStatus('success');
        } catch (err) {
          console.error(
            `Pipeline has been failed for a project by path ${path}`,
            err,
          );

          changeStatus('error');

          window.electronAPI.showAlert({
            title: 'Pipeline error',
            message: `Pipeline has been failed for a project by path ${path}.\n${err}`,
            type: 'error',
          });
        }
      }),
    );

    setInProgress(false);
  };

  return (
    <Button onClick={onApply} disabled={inProgress}>
      Apply new versions
    </Button>
  );
};
