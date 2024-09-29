import * as React from 'react';

import { AppConfigContext, SpaceConfig } from 'modules';
import { Checkbox } from 'components/Checkbox';
import { Divider } from 'components/Divider';
import { Hint } from 'components/Hint';

export const PipelineSettings = () => {
  const {
    space: { pipelineConfig },
    onUpdateSpace,
  } = React.useContext(AppConfigContext);

  const onChange = (config: Partial<SpaceConfig['pipelineConfig']>) => {
    onUpdateSpace({
      pipelineConfig: {
        ...pipelineConfig,
        ...config,
      },
    });
  };

  return (
    <React.Fragment>
      <div>
        <Checkbox
          label='Lint changes'
          checked={pipelineConfig.makeLint}
          onChange={newChecked => onChange({ makeLint: newChecked })}
        />

        <Hint>
          Run &quot;<strong>lint</strong>&quot; script to find a possible
          problems.
          <br />
          This script should usually includes eslint and typescript checking.
          <br />
          It helps to avoid missing breaking changes.
          <br />
          <strong>Strongly required</strong>.
          <br />
          <br />
          Example of package.json scripts:
          <br />
          <p className='p-2 mt-2 bg-gray-900'>
            {`"lint:ts": "tsc --noEmit",
"lint:eslint": "eslint './**/*.{ts,tsx}' --fix",
"lint": "yarn lint:eslint && yarn lint:ts"`}
          </p>
        </Hint>
      </div>

      <Divider />

      <div>
        <Checkbox
          label='Make commit'
          checked={pipelineConfig.makeCommit}
          onChange={newChecked => onChange({ makeCommit: newChecked })}
        />

        <Hint>
          Commit successfully made changes.
          <br />
          You can set the commit message in the <b>Git</b> tab.
        </Hint>
      </div>

      <Divider />

      <div>
        <Checkbox
          label='Make push'
          checked={pipelineConfig.makePush}
          onChange={newChecked => onChange({ makePush: newChecked })}
        />

        <Hint>
          Push successfully commited changes.
          <br />
          The name of the new remote branch is the same as the name of the new
          local branch name. You can set the branch name in the <b>Git</b> tab.
        </Hint>
      </div>
    </React.Fragment>
  );
};
