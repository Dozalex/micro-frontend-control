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
import { getUserDataPath } from 'utils';

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

  // get app config
  React.useEffect(() => {
    if (!userDataPath) return;

    getAppConfigJsonObject({ userDataPath })
      .then(setAppConfig)
      .catch(() => {
        // app config not found, create the new

        const newSpaceConfig = normalizeSpaceConfig({});

        setAppConfig({
          configVersionNumber: APP_CONFIG_VERSION,
          spaces: [newSpaceConfig],
          lastSpaceId: newSpaceConfig.id,
        });
      });
  }, [userDataPath]);

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

  // change space config
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

  // change space config
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

  // change space config
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

  return {
    appConfig,
    space: selectedSpace,
    onCreateSpace,
    onChangeSpace,
    onDeleteSpace,
    onChangeSelectedSpaceId,
  };
};
