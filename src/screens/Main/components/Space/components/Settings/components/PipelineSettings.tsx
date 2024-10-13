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

  const {
    checkUncommittedChanges,
    makePush,
    makeLint,
    makeInstall,
    makeCommit,
    makeNewBranch,
    deleteNewBranch,
  } = pipelineConfig;

  return (
    <React.Fragment>
      <div>
        <Checkbox
          label='Check for uncommitted changes'
          checked={checkUncommittedChanges}
          onChange={newChecked =>
            onChange({ checkUncommittedChanges: newChecked })
          }
        />

        <Hint>
          Check for uncommitted changes in the current branch. Returns error if
          changes are found.
          <br />
          <strong>Strongly recommended</strong>.
        </Hint>
      </div>

      <Divider />

      <div>
        <Checkbox
          label='Make a new branch'
          checked={makeNewBranch}
          onChange={newChecked => onChange({ makeNewBranch: newChecked })}
        />

        <Hint>
          Create a new local branch to make changes.
          <br />
          <strong>Strongly recommended</strong>.
        </Hint>
      </div>

      <Divider />

      <div>
        <Checkbox label='Apply new versions' checked readOnly />

        <Hint>
          Apply new versions for any matches in root package.json and{' '}
          <b>packages</b> package.json.
          <br />
          {"Main action. Can't be skipped."}
        </Hint>
      </div>

      <Divider />

      <div>
        <Checkbox
          label='Install the new dependencies'
          checked={makeInstall}
          onChange={newChecked => onChange({ makeInstall: newChecked })}
        />

        <Hint>Install the new versions of dependencies.</Hint>
      </div>

      <Divider />

      <div>
        <Checkbox
          label='Lint changes'
          checked={makeLint}
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
          <strong>Strongly recommended</strong>.
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
          checked={makeCommit}
          onChange={newChecked => onChange({ makeCommit: newChecked })}
        />

        <Hint>
          Commit successfully made changes.
          <br />
          You can set the commit message in the <b>Git</b> tab.
        </Hint>
      </div>

      {makeCommit && (
        <React.Fragment>
          <Divider />

          <div>
            <Checkbox
              label='Make push'
              checked={makePush}
              onChange={newChecked => onChange({ makePush: newChecked })}
            />

            <Hint>
              Push successfully commited changes.
              <br />
              The name of the new remote branch is the same as the name of the
              new local branch name. You can set the branch name in the{' '}
              <b>Git</b> tab.
            </Hint>
          </div>

          {makePush && makeNewBranch && (
            <React.Fragment>
              <Divider />

              <div>
                <Checkbox
                  label='Delete the new branch'
                  checked={deleteNewBranch}
                  onChange={newChecked =>
                    onChange({ deleteNewBranch: newChecked })
                  }
                />

                <Hint>
                  Delete the new local branch after successful push.
                  <br />
                  <strong>Recommended</strong>.
                </Hint>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
