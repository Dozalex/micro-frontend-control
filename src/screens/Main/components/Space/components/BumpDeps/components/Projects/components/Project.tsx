import * as React from 'react';

import {
  DependencyName,
  DependencyVersion,
  PackageJson,
  ProjectPath,
} from 'modules';
import { getPackageJsonObject, getProjectPackageFolderNames } from 'utils';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Divider } from 'components/Divider';
import { Section } from 'components/Section';

import { Dependency, Status } from './components';

type Props = {
  path: string;
  statuses?: string[];
  error?: string;
  deps: DependencyName[];
  packagesFolderName: string;
  projectsForUpdate: ProjectPath[];
  setProjectsForUpdate: React.Dispatch<React.SetStateAction<ProjectPath[]>>;
  depVersions: Record<DependencyName, DependencyVersion | undefined>;
  onDelete: (path: string) => void;
};

export const Project = ({
  path,
  statuses,
  error,
  deps,
  packagesFolderName,
  projectsForUpdate,
  setProjectsForUpdate,
  depVersions: newDepVersions,
  onDelete,
}: Props) => {
  const [packageJsonObject, setPackageJsonObject] = React.useState<
    PackageJson[]
  >([]);

  const [isOpen, setIsOpen] = React.useState(false);

  // get project package.json files to display deps and versions
  const getProjectData = React.useCallback(async () => {
    const newPackageJsonObjects: PackageJson[] = [];

    const rootPackageJson = await getPackageJsonObject({ path });

    newPackageJsonObjects.push(rootPackageJson);

    if (packagesFolderName) {
      let folderNames: string[] = [];

      try {
        folderNames = await getProjectPackageFolderNames({
          path,
          packagesFolderName,
        });
      } catch (err) {
        // It's not required to have the packages folder in the project
        // so error is available
        console.error('Failed to get the project packages', err);
      }

      if (folderNames.length) {
        // check an every package in the project
        await Promise.all(
          folderNames.map(async folderName => {
            const packageJsonPath = `${path}/${packagesFolderName}/${folderName}`;
            const packageJson = await getPackageJsonObject({
              path: packageJsonPath,
            });

            newPackageJsonObjects.push(packageJson);
          }),
        );
      }
    }

    setPackageJsonObject(newPackageJsonObjects);
  }, [path, packagesFolderName]);

  React.useEffect(() => {
    getProjectData();
  }, [getProjectData]);

  return (
    <Section
      title={path}
      headerContent={
        <div className='flex gap-4 items-center'>
          <Status error={error} statuses={statuses} />

          <Checkbox
            label='Update'
            checked={projectsForUpdate.includes(path)}
            onChange={newChecked => {
              if (newChecked) {
                setProjectsForUpdate(prev => [...prev, path]);
              } else {
                setProjectsForUpdate(prev =>
                  prev.filter(project => project !== path),
                );
              }
            }}
          />
        </div>
      }
      onTitleClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <div className='grid gap-5'>
          <div className='flex justify-end'>
            <Button onClick={() => onDelete(path)} variant='warning'>
              Delete
            </Button>
          </div>

          <Divider />

          {packageJsonObject.map(packageJson => {
            const followedDeps = deps.filter(
              dep =>
                !!packageJson.dependencies?.[dep] ||
                !!packageJson.devDependencies?.[dep],
            );

            return (
              <div key={packageJson.name}>
                <p>{packageJson.name}</p>

                <div className='grid gap-2 pl-5 pt-2 text-sm text-gray-400'>
                  {!followedDeps.length && <p>Dependencies not found</p>}

                  {followedDeps.map(dep => (
                    <Dependency
                      key={dep}
                      depName={dep}
                      version={
                        // '!' because it's checked above in filter
                        (packageJson.dependencies?.[dep] ||
                          packageJson.devDependencies?.[dep])!
                      }
                      newVersion={newDepVersions[dep]}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </Section>
  );
};
