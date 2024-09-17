import * as React from 'react';

import { Trash } from 'icons';
import { DependencyName, DependencyVersion } from 'modules';
import { Button } from 'components/Button';
import { IconButton } from 'components/IconButton';
import { Input } from 'components/Input';
import { Section } from 'components/Section';

type Props = {
  deps: DependencyName[];
  setDeps: React.Dispatch<React.SetStateAction<DependencyName[]>>;
  depVersions: Record<DependencyName, DependencyVersion>;
  setDepVersions: React.Dispatch<
    React.SetStateAction<Record<DependencyName, DependencyVersion>>
  >;
};

export const Deps = ({ deps, setDeps, depVersions, setDepVersions }: Props) => {
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

  return (
    <Section title='Followed dependencies'>
      <div className='grid gap-3'>
        {!deps.length && (
          <p className='text-sm text-gray-400'>Dependencies not found</p>
        )}

        {deps.map((dep, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr_200px_auto] gap-4 items-end'
          >
            <Input
              value={dep}
              onChange={e => onChangeDep({ index, newName: e.target.value })}
              // table imitation
              label={index === 0 ? 'Dependency name' : undefined}
            />

            <Input
              value={depVersions[dep]}
              onChange={e => onChangeVersion({ dep, version: e.target.value })}
              // table imitation
              label={index === 0 ? 'New version' : undefined}
            />

            <IconButton icon={Trash} onClick={() => onDelete(index)} />
          </div>
        ))}
      </div>

      <div>
        <Button onClick={onAdd}>Add dependency</Button>
      </div>
    </Section>
  );
};
