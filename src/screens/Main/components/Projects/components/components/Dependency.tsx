import * as React from 'react';

import { DependencyVersion } from 'modules';

type Props = {
  depName: string;
  newVersion: DependencyVersion;
  version: DependencyVersion;
};

export const Dependency = ({ depName, newVersion, version }: Props) => (
  <div className='flex items-center gap-4 text-sm'>
    <p>{depName}</p>
    {' - '}
    <p
      className={
        newVersion
          ? `${newVersion === version ? 'text-green-600' : 'text-red-600'}`
          : ''
      }
    >
      {version}
    </p>
  </div>
);
