import * as React from 'react';

import { AppConfigContext, DependencyName, DependencyVersion } from 'modules';
import {
  getPackageJsonText,
  getProjectPackageFolderNames,
  gitCheckUncommittedChangesInProject,
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
  uniqueDependencyNames: DependencyName[];
  depVersions: Record<DependencyName, DependencyVersion | undefined>;
  projectsForUpdate: string[];
  setStatusesByProject: React.Dispatch<
    React.SetStateAction<Record<string, string[] | undefined>>
  >;
  setErrorByProject: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
};

export const RunButton = ({
  uniqueDependencyNames,
  depVersions,
  projectsForUpdate,
  setStatusesByProject,
  setErrorByProject,
}: Props) => {
  const {
    space: { packagesFolderName, gitConfig, pipelineConfig },
  } = React.useContext(AppConfigContext);

  const [inProgress, setInProgress] = React.useState(false);

  const onApply = async () => {
    // reset statuses
    setStatusesByProject({});
    setErrorByProject({});

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
    const {
      checkUncommittedChanges,
      makeNewBranch,
      makeCommit,
      makePush,
      makeLint,
      makeInstall,
      deleteNewBranch,
    } = pipelineConfig;

    // loop through each selected project
    await Promise.allSettled(
      projectsForUpdate.map(async path => {
        const changeStatus = (status: string) =>
          setStatusesByProject(prev => {
            const prevStatuses = prev[path] || [];

            return { ...prev, [path]: [...prevStatuses, status] };
          });

        try {
          const currentBranchName = await gitGetCurrentBranchName({ path });

          if (checkUncommittedChanges) {
            changeStatus('changes checking...');
            await gitCheckUncommittedChangesInProject({ path });
          }

          if (makeNewBranch) {
            changeStatus('git fetch...');
            await gitFetch({ path });

            changeStatus('create new branch...');
            await gitCheckoutNewBranch({
              path,
              newBranchName,
              remoteBranchName,
            });
          }

          // to check that some changes have been applied for this project
          let hasChanges = false;

          const packageJsonText = await getPackageJsonText({ path });

          const hasChangesInTheRootPackageJson = await replaceDepsInPackageJson(
            {
              path,
              packageJsonText,
              deps: uniqueDependencyNames,
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
                      deps: uniqueDependencyNames,
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

          if (makeInstall) {
            changeStatus('dependencies installing...');
            await installDeps({ path });
          }

          if (makeLint) {
            changeStatus('lint checking...');
            await runLint({ path });
          }

          if (makeCommit) {
            changeStatus('changes commiting...');
            await gitCommitChanges({ path, commitMessage });

            if (makePush) {
              changeStatus('changes pushing...');
              await gitPushBranch({ path, newBranchName });

              // checkout and remove new branch
              if (makeNewBranch && deleteNewBranch) {
                changeStatus('new branch deletion...');
                await gitCheckoutBranch({
                  path,
                  branchName: currentBranchName,
                });
                await gitDeleteBranch({ path, branchName: newBranchName });
              }
            }
          }

          changeStatus('success');
        } catch (err) {
          console.error(
            `Pipeline has been failed for a project by path ${path}`,
            err,
          );

          changeStatus('error');

          setErrorByProject(prev => ({
            ...prev,
            [path]: (err as Error)?.message || JSON.stringify(err),
          }));
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
