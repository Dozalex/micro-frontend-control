import * as React from 'react';

import { SpaceConfig } from 'modules';
import { Button } from 'components/Button';

type Props = {
  projects: SpaceConfig['projectPaths'];
  onChangeProjectPaths: (value: SpaceConfig['projectPaths']) => void;
};

export const NewProject = ({ projects, onChangeProjectPaths }: Props) => {
  const onAdd = async () => {
    const filePaths = await window.electronAPI.openFolderDialog();
    const path = filePaths[0];

    if (!path) return;

    // check the project to already added
    if (projects.some(project => project === path)) {
      await window.electronAPI.showAlert({
        title: 'Conflict',
        message: 'Project is already added',
        type: 'warning',
      });

      return;
    }

    onChangeProjectPaths([...projects, path]);
  };

  return (
    <div className='mt-5'>
      <Button onClick={onAdd}>Add project</Button>
    </div>
  );
};
