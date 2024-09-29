import * as React from 'react';
import debounce from 'debounce';

import {
  getAppConfigJsonObject,
  writeAppConfigFile,
  normalizeSpaceConfig,
  APP_CONFIG_VERSION,
  AppConfig,
  SpaceConfig,
} from 'modules';
import { getUserDataPath, getNvmPath } from 'utils';

const debounceRequest = debounce((f: () => void) => {
  f();
}, 2000);

/** App data */
export const useData = () => {
  const [userDataPath, setUserDataPath] = React.useState<string>();
  const [appConfig, setAppConfig] = React.useState<AppConfig>();

  // init userDataPath to get configs
  React.useEffect(() => {
    if (!userDataPath) {
      getUserDataPath().then(setUserDataPath);
    }
  }, [userDataPath]);

  // get selected space config
  const selectedSpace = React.useMemo(() => {
    if (!appConfig) return undefined;

    return appConfig.lastSpaceId
      ? appConfig.spaces.find(space => space.id === appConfig.lastSpaceId) ||
          appConfig.spaces[0]
      : appConfig.spaces[0];
  }, [appConfig]);

  const onCreateAppConfig = React.useCallback(async () => {
    const isWin32 = window.electronAPI.getProcessPlatform() === 'win32';

    let nvmPath = '';

    // it's possible to determine the NVM path only for Unix-based systems
    if (!isWin32) {
      nvmPath = await getNvmPath();
    }

    const newSpaceConfig = normalizeSpaceConfig({});

    setAppConfig({
      configVersionNumber: APP_CONFIG_VERSION,
      spaces: [newSpaceConfig],
      lastSpaceId: newSpaceConfig.id,
      nvmPath,
    });
  }, []);

  // get app config
  React.useEffect(() => {
    if (!userDataPath) return;

    getAppConfigJsonObject({ userDataPath })
      .then(setAppConfig)
      .catch(() => {
        // app config not found, create the new
        onCreateAppConfig();
      });
  }, [userDataPath, onCreateAppConfig]);

  // create a space config if not exists
  React.useEffect(() => {
    if (appConfig && !appConfig.spaces.length) {
      const newSpaceConfig = normalizeSpaceConfig({});

      setAppConfig(() => ({
        ...appConfig,
        spaces: [newSpaceConfig],
        lastSpaceId: newSpaceConfig.id,
      }));
    }
  }, [appConfig]);

  // update app config file
  React.useEffect(() => {
    // debounce for 2sec
    debounceRequest(() => {
      if (appConfig && userDataPath) {
        writeAppConfigFile({ userDataPath, config: appConfig });
      }
    });
  }, [appConfig, userDataPath]);

  // change selected space
  const onChangeSelectedSpaceId = React.useCallback((spaceId: string) => {
    setAppConfig(prev => {
      if (prev) {
        return {
          ...prev,
          lastSpaceId: spaceId,
        };
      }

      return undefined;
    });
  }, []);

  // Add the new space to appConfig.spaces
  const onCreateSpace = React.useCallback(
    (spaceConfig: SpaceConfig) => {
      setAppConfig(prev => {
        if (prev) {
          return {
            ...prev,
            spaces: [...prev.spaces, spaceConfig],
          };
        }

        return undefined;
      });

      // switch to new space
      onChangeSelectedSpaceId(spaceConfig.id);
    },
    [onChangeSelectedSpaceId],
  );

  // Update the current space in appConfig.spaces
  const onUpdateSpace = React.useCallback(
    (spaceConfig: Partial<SpaceConfig>) => {
      if (!selectedSpace) return;

      setAppConfig(prev => {
        if (prev) {
          const spaceIndex = prev.spaces.findIndex(
            space => space.id === selectedSpace?.id,
          );

          if (spaceIndex === -1) return prev;

          return {
            ...prev,
            spaces: prev.spaces.toSpliced(spaceIndex, 1, {
              ...selectedSpace,
              ...spaceConfig,
            }),
          };
        }

        return undefined;
      });
    },
    [selectedSpace],
  );

  // Change the space in appConfig.spaces
  const onChangeSpace = React.useCallback((spaceConfig: SpaceConfig) => {
    setAppConfig(prev => {
      if (prev) {
        const spaceIndex = prev.spaces.findIndex(
          space => space.id === spaceConfig.id,
        );

        if (spaceIndex === -1) return prev;

        return {
          ...prev,
          spaces: prev.spaces.toSpliced(spaceIndex, 1, spaceConfig),
        };
      }

      return undefined;
    });
  }, []);

  // Delete the space from appConfig.spaces
  const onDeleteSpace = React.useCallback((spaceId: string) => {
    setAppConfig(prev => {
      if (prev) {
        const spaceIndex = prev.spaces.findIndex(space => space.id === spaceId);

        if (spaceIndex === -1) return prev;

        return {
          ...prev,
          spaces: prev.spaces.toSpliced(spaceIndex, 1),
        };
      }

      return undefined;
    });
  }, []);

  // Change appConfig.nvmPath
  const onChangeNvmPath = React.useCallback((nvmPath: string) => {
    setAppConfig(prev => {
      if (prev) {
        return {
          ...prev,
          nvmPath,
        };
      }

      return undefined;
    });
  }, []);

  return {
    appConfig,
    space: selectedSpace,
    onCreateSpace,
    onChangeSpace,
    onUpdateSpace,
    onDeleteSpace,
    onChangeSelectedSpaceId,
    onChangeNvmPath,
  };
};
