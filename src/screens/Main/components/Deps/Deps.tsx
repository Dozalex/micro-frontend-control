import * as React from 'react';

import { Trash } from 'icons';
import { DependencyName, DependencyVersion, GitSettings } from 'modules';
import { Button } from 'components/Button';
import { IconButton } from 'components/IconButton';
import { Input } from 'components/Input';
import { Section } from 'components/Section';
import { TableColumnHeader } from 'components/TableColumnHeader';

import { LatestVersion } from './components';

type Props = {
  gitSettings: GitSettings;
  deps: DependencyName[];
  setDeps: React.Dispatch<React.SetStateAction<DependencyName[]>>;
  depVersions: Record<DependencyName, DependencyVersion | undefined>;
  setDepVersions: React.Dispatch<
    React.SetStateAction<Record<DependencyName, DependencyVersion | undefined>>
  >;
};

export const Deps = ({
  deps,
  setDeps,
  depVersions,
  setDepVersions,
  gitSettings,
}: Props) => {
  const onChangeDep = ({
    index,
    newName,
  }: {
    index: number;
    newName: string;
  }) => {
    setDeps(prev => prev.toSpliced(index, 1, newName));
  };

  const onAdd = () => {
    setDeps(prev => [...prev, '']);
  };

  const onChangeVersion = ({
    dep,
    version,
  }: {
    dep: DependencyName;
    version: DependencyVersion;
  }) => {
    setDepVersions(prev => ({
      ...prev,
      [dep]: version,
    }));
  };

  const onDelete = (index: number) => {
    setDeps(prev => prev.toSpliced(index, 1));
  };

  const latestDepVersionPath =
    gitSettings.showLatestDepVersion && gitSettings.latestDepVersionPath;

  return (
    <Section title='Followed dependencies'>
      <div className='grid gap-3'>
        {deps.length ? (
          <div
            className={`grid gap-4 items-end ${latestDepVersionPath ? 'grid-cols-[1fr_auto_200px_auto]' : 'grid-cols-[1fr_200px_auto]'}`}
          >
            <TableColumnHeader>Dependency name</TableColumnHeader>
            {latestDepVersionPath && (
              <TableColumnHeader>Latest version</TableColumnHeader>
            )}
            <TableColumnHeader>New version</TableColumnHeader>
            <TableColumnHeader />

            {deps.map((dep, index) => (
              <React.Fragment
                // it's required to use index here because the dep name is dynamic
                key={index}
              >
                <Input
                  value={dep}
                  onChange={e =>
                    onChangeDep({ index, newName: e.target.value })
                  }
                />

                {latestDepVersionPath && (
                  <LatestVersion
                    depName={dep}
                    setDepVersions={setDepVersions}
                    latestDepVersionPath={latestDepVersionPath}
                  />
                )}

                <Input
                  value={depVersions[dep]}
                  onChange={e =>
                    onChangeVersion({ dep, version: e.target.value })
                  }
                />

                <IconButton icon={Trash} onClick={() => onDelete(index)} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p className='text-sm text-gray-400'>Dependencies not found</p>
        )}
      </div>

      <div>
        <Button onClick={onAdd}>Add dependency</Button>
      </div>
    </Section>
  );
};
