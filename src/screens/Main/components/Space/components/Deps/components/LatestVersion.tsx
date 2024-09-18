import * as React from 'react';
import debounce from 'debounce';

import { ArrowRight } from 'icons';
import { DependencyName, DependencyVersion, ProjectPath } from 'modules';
import { getLastDependencyVersion } from 'utils';
import { IconButton } from 'components/IconButton';

const debounceRequest = debounce((f: () => void) => {
  f();
}, 800);

type Props = {
  latestDepVersionPath: ProjectPath;
  depName: DependencyName;
  setDepVersions: React.Dispatch<
    React.SetStateAction<Record<DependencyName, DependencyVersion | undefined>>
  >;
};

/**
 * Latest dependency version.
 * * The component request latest available version of the dependency and display it.
 * * It's possible to apply latest version to the dependency version field.
 * */
export const LatestVersion = ({
  depName,
  latestDepVersionPath,
  setDepVersions,
}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [latestVersion, setLatestVersion] = React.useState<DependencyVersion>();

  React.useEffect(() => {
    debounceRequest(() => {
      if (depName) {
        setLoading(true);

        getLastDependencyVersion({ depName, path: latestDepVersionPath })
          .then(setLatestVersion)
          .catch(() => setLatestVersion(undefined))
          .finally(() => setLoading(false));
      } else {
        setLatestVersion(undefined);
      }
    });
  }, [depName, latestDepVersionPath]);

  return (
    <div className='grid gap-3 grid-cols-[150px_auto] items-center h-full'>
      <p className='text-sm'>
        {loading ? 'Requesting...' : latestVersion || 'Unknown'}
      </p>

      <IconButton
        icon={ArrowRight}
        onClick={() =>
          setDepVersions(prev => ({ ...prev, [depName]: latestVersion }))
        }
        disabled={!depName || !latestVersion}
      />
    </div>
  );
};
