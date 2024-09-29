import * as React from 'react';

import { AppConfigContext } from 'modules';
import { Button } from 'components/Button';

export const NewProject = () => {
  const {
    space: { projectPaths },
    onUpdateSpace,
  } = React.useContext(AppConfigContext);

  const onAdd = async () => {
    const filePaths = await window.electronAPI.openFolderDialog();
    const path = filePaths[0];

    if (!path) return;

    // check the project to already added
    if (projectPaths.some(project => project === path)) {
      await window.electronAPI.showAlert({
        title: 'Conflict',
        message: 'Project is already added',
        type: 'warning',
      });

      return;
    }

    onUpdateSpace({
      projectPaths: [...projectPaths, path],
    });
  };

  return (
    <div className='mt-5'>
      <Button onClick={onAdd}>Add project</Button>
    </div>
  );
};
