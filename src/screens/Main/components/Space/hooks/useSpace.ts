import * as React from 'react';

import { SpaceConfig } from 'modules';

type Props = {
  space: SpaceConfig;
  onChangeSpace: (space: SpaceConfig) => void;
};

/** Space data changing handlers */
export const useSpace = ({ space, onChangeSpace }: Props) => {
  const onChangeSpaceName = React.useCallback(
    (newName: SpaceConfig['name']) => {
      onChangeSpace({
        ...space,
        name: newName,
      });
    },
    [space, onChangeSpace],
  );

  const onChangePackagesFolderNameName = React.useCallback(
    (newName: SpaceConfig['packagesFolderName']) => {
      onChangeSpace({
        ...space,
        packagesFolderName: newName,
      });
    },
    [space, onChangeSpace],
  );

  const onChangeDependencyNames = React.useCallback(
    (deps: SpaceConfig['dependencyNames']) => {
      onChangeSpace({
        ...space,
        dependencyNames: deps,
      });
    },
    [space, onChangeSpace],
  );

  const onChangeProjectPaths = React.useCallback(
    (paths: SpaceConfig['projectPaths']) => {
      onChangeSpace({
        ...space,
        projectPaths: paths,
      });
    },
    [space, onChangeSpace],
  );

  const onChangeGitConfig = React.useCallback(
    (config: SpaceConfig['gitConfig']) => {
      onChangeSpace({
        ...space,
        gitConfig: config,
      });
    },
    [space, onChangeSpace],
  );

  const onChangeDependencyConfig = React.useCallback(
    (config: SpaceConfig['dependencyConfig']) => {
      onChangeSpace({
        ...space,
        dependencyConfig: config,
      });
    },
    [space, onChangeSpace],
  );

  const onChangePipelineConfig = React.useCallback(
    (config: SpaceConfig['pipelineConfig']) => {
      onChangeSpace({
        ...space,
        pipelineConfig: config,
      });
    },
    [space, onChangeSpace],
  );

  return {
    onChangeDependencyConfig,
    onChangeDependencyNames,
    onChangeGitConfig,
    onChangePackagesFolderNameName,
    onChangePipelineConfig,
    onChangeProjectPaths,
    onChangeSpaceName,
  };
};
