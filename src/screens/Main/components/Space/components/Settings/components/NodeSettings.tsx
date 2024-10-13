import * as React from 'react';

import { Reload } from 'icons';
import { AppConfigContext } from 'modules';
import { getNvmPath } from 'utils';
import { Divider } from 'components/Divider';
import { Hint } from 'components/Hint';
import { IconButton } from 'components/IconButton';
import { Input } from 'components/Input';
import { Select } from 'components/Select';
import { Tooltip } from 'components/Tooltip';

export const NodeSettings = () => {
  const { appConfig, space, onChangeNvmPath, onUpdateSpace } =
    React.useContext(AppConfigContext);

  const isWin32 = window.electronAPI.getProcessPlatform() === 'win32';

  const [versionsLoading, setVersionsLoading] = React.useState(true);
  const [versions, setVersions] = React.useState<string[]>([]);

  const onReload = async () => {
    const nvmPath = await getNvmPath();

    if (nvmPath) {
      onChangeNvmPath(nvmPath);
    }
  };

  const { nvmPath } = appConfig;

  const onGetVersions = React.useCallback(() => {
    if (nvmPath) {
      setVersionsLoading(true);

      window.electronAPI
        .getChildFolderNames(`${nvmPath}/versions/node`)
        .then(setVersions)
        .finally(() => {
          setVersionsLoading(false);
        });
    }
  }, [nvmPath]);

  const nodeVersionOptions = React.useMemo(
    () =>
      versions.map(version => ({
        title: version,
        value: version,
      })),
    [versions],
  );

  return (
    <React.Fragment>
      <div>
        <div className='grid grid-cols-[1fr_auto] gap-2 items-end'>
          <Input
            label='NVM path'
            value={nvmPath}
            onChange={e => onChangeNvmPath(e.target.value)}
          />

          {!isWin32 && (
            <Tooltip title='Reset'>
              <div>
                <IconButton
                  icon={Reload}
                  onClick={onReload}
                  className='w-10 h-10'
                />
              </div>
            </Tooltip>
          )}
        </div>

        <Hint>
          E.g. ~/.nvm
          <br />
          Helps to find a Node versions.
          {!isWin32 && (
            <React.Fragment>
              <br />
              It is required to set the correct Node version for a Node
              commands.
              <br />
              Leaving this field blank may cause errors in some versions of Node
              on your system.
            </React.Fragment>
          )}
        </Hint>
      </div>

      <Divider />

      <div>
        <Select<string | undefined>
          value={space.nodeVersion}
          onOpen={onGetVersions}
          onChange={newValue =>
            onUpdateSpace({
              nodeVersion: newValue,
            })
          }
          options={nodeVersionOptions}
          label='Node version'
          loading={versionsLoading}
          minWidth={250}
          notFoundContent='Not found. Check your NVM path.'
          onChangeInput={e =>
            onUpdateSpace({
              nodeVersion: e.target.value,
            })
          }
        />

        <Hint>
          It is required to set the correct node version for a node commands.
          <br />
          Leaving this field blank may cause errors in some versions of node.js
          on your system.
        </Hint>
      </div>
    </React.Fragment>
  );
};
