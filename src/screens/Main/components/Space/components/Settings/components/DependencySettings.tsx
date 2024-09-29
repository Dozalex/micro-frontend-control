import * as React from 'react';

import { AppConfigContext, SpaceConfig } from 'modules';
import { Checkbox } from 'components/Checkbox';
import { Divider } from 'components/Divider';
import { Hint } from 'components/Hint';
import { Input } from 'components/Input';

export const DependencySettings = () => {
  const {
    space: { dependencyConfig },
    onUpdateSpace,
  } = React.useContext(AppConfigContext);

  const onChange = (config: Partial<SpaceConfig['dependencyConfig']>) => {
    onUpdateSpace({
      dependencyConfig: {
        ...dependencyConfig,
        ...config,
      },
    });
  };

  const onChangeLatestDepVersionPath = async () => {
    const filePaths = await window.electronAPI.openFolderDialog();
    const path = filePaths[0];

    if (!path) return;

    onChange({ latestDepVersionPath: path });
  };

  return (
    <React.Fragment>
      <div>
        <Checkbox
          label='Show latest dependency version'
          checked={dependencyConfig.showLatestDepVersion}
          onChange={checked => onChange({ showLatestDepVersion: checked })}
        />

        <Hint>
          Adds display of the latest available version for dependencies.
          <br />
          It helps to select the latest version with one click.
          <br />
          If the version is <strong>Unknown</strong>, check that the dependency
          name and access settings are correct.
        </Hint>
      </div>

      <Divider />

      {dependencyConfig.showLatestDepVersion && (
        <div>
          <Input
            label='Path to request latest dependency version'
            value={dependencyConfig.latestDepVersionPath}
            onClick={onChangeLatestDepVersionPath}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                onChangeLatestDepVersionPath();
              }
            }}
            readOnly
          />

          <Hint>
            The directory from which the latest version request will be
            executed.
            <br />
            It is especially necessary if you have a <strong>
              private
            </strong>{' '}
            registry.
          </Hint>
        </div>
      )}
    </React.Fragment>
  );
};
