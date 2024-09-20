import { v4 as uuid } from 'uuid';

import { readFile } from 'utils';

import { SPACE_CONFIG_VERSION } from './constants';
import { SpaceConfig, AppConfig } from './types';

/**
 * To create or import space config.
 * * It will include a migrations for a different config versions.
 * */
export const normalizeSpaceConfig = (
  space: Partial<SpaceConfig>,
): SpaceConfig => ({
  configVersionNumber: space.configVersionNumber || SPACE_CONFIG_VERSION,
  id: space.id || uuid(),
  name: space.name || 'New space',
  dependencyConfig: {
    showLatestDepVersion: space.dependencyConfig?.showLatestDepVersion || false,
    latestDepVersionPath: space.dependencyConfig?.latestDepVersionPath || '',
  },
  dependencyNames: space.dependencyNames || [],
  gitConfig: {
    newBranchName: space.gitConfig?.newBranchName || 'fix/bump-deps',
    remoteBranchName: space.gitConfig?.remoteBranchName || 'origin/develop',
    commitMessage: space.gitConfig?.commitMessage || 'fix: bump deps.',
  },
  packagesFolderName: space.packagesFolderName || 'packages',
  pipelineConfig: {
    makeCommit: space.pipelineConfig?.makeCommit || false,
    makeLint: space.pipelineConfig?.makeLint || true,
    makePush: space.pipelineConfig?.makePush || false,
  },
  projectPaths: space.projectPaths || [],
  repositoryUrls: space.repositoryUrls || [],
});

/** To create space config file for the export. */
export const prepareSpaceConfigForExport = (
  space: Partial<SpaceConfig>,
): Partial<SpaceConfig> => ({
  ...space,
  // will be created in normalizeSpaceConfig on import
  id: undefined,
  // unique for every user
  projectPaths: [],
});

export const getAppConfigJsonObject = async ({
  userDataPath,
}: {
  userDataPath: string;
}): Promise<AppConfig> => {
  try {
    const fileContent = await window.electronAPI.readFile(
      `${userDataPath}/app-config.json`,
    );

    return JSON.parse(fileContent) as AppConfig;
  } catch (err) {
    console.error(`Failed to get app-config.json by path ${userDataPath}`, err);

    throw err;
  }
};

export const writeAppConfigFile = async ({
  userDataPath,
  config,
}: {
  userDataPath: string;
  config: AppConfig;
}) => {
  try {
    await window.electronAPI.writeFile(
      `${userDataPath}/app-config.json`,
      JSON.stringify(config),
    );
  } catch (err) {
    console.error(
      `Failed to write app-config.json by path ${userDataPath}`,
      err,
    );

    throw err;
  }
};

export const importSpaceConfig = async ({
  onCreateSpace,
}: {
  onCreateSpace: (space: SpaceConfig) => void;
}) => {
  try {
    const filePaths = await window.electronAPI.openFileDialog({
      filters: [
        {
          name: 'Space config',
          extensions: ['json'],
        },
      ],
    });
    const path = filePaths[0];

    if (!path) return;

    const newConfigText = await readFile({ path });
    const newConfig = JSON.parse(newConfigText) as SpaceConfig;

    onCreateSpace(normalizeSpaceConfig(newConfig));

    if (newConfig.configVersionNumber > SPACE_CONFIG_VERSION) {
      await window.electronAPI.showAlert({
        title: 'The imported config version is higher than the used one.',
        message:
          'Some config data may be missing. For correct operation, it is recommended to get the latest version of the application.',
        type: 'info',
      });
    }
  } catch (e) {
    console.error(e);

    await window.electronAPI.showAlert({
      title: 'Failed to import config',
      message: 'Check the file for errors',
      type: 'warning',
    });
  }
};
