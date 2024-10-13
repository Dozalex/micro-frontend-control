import * as React from 'react';
import debounce from 'debounce';

import { ArrowRight } from 'icons';
import { DependencyName, DependencyVersion, ProjectPath } from 'modules';
import { getLatestDependencyVersion } from 'utils';
import { IconButton } from 'components/IconButton';

type Props = {
  latestDepVersionPath: ProjectPath;
  latestVersionRangePrefix?: string;
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
  latestVersionRangePrefix,
  setDepVersions,
}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [latestVersion, setLatestVersion] = React.useState<DependencyVersion>();

  const debounceRequest = React.useMemo(
    () => debounce((f: () => void) => f(), 800),
    [],
  );

  const onApplyLatestVersion = () => {
    setDepVersions(prev => ({
      ...prev,
      [depName]: `${latestVersionRangePrefix}${latestVersion}`,
    }));
  };

  React.useEffect(() => {
    debounceRequest(() => {
      if (depName) {
        setLoading(true);

        getLatestDependencyVersion({ depName, path: latestDepVersionPath })
          .then(setLatestVersion)
          .catch(() => setLatestVersion(undefined))
          .finally(() => setLoading(false));
      } else {
        setLatestVersion(undefined);
      }
    });
  }, [depName, latestDepVersionPath, debounceRequest]);

  return (
    <div className='grid gap-3 grid-cols-[150px_auto] items-center h-full'>
      <p className='text-sm'>
        {loading ? 'Requesting...' : latestVersion || 'Unknown'}
      </p>

      <IconButton
        icon={ArrowRight}
        onClick={onApplyLatestVersion}
        disabled={!depName || !latestVersion}
      />
    </div>
  );
};
