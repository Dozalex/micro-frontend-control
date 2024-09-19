import * as React from 'react';

import { SpaceConfig } from 'modules';
import { Button } from 'components/Button';
import { useConfirmModal } from 'components/ConfirmModal';
import { Hint } from 'components/Hint';

type Props = {
  space: SpaceConfig;
  onDeleteSpace: (spaceId: string) => void;
  onCloseModal: () => void;
};

export const DeleteSection = ({
  space,
  onDeleteSpace,
  onCloseModal,
}: Props) => {
  const onConfirmDelete = async () => {
    onDeleteSpace(space.id);

    onCloseModal();
  };

  const { confirmModal: confirmDeleteModal, onOpen: onDelete } =
    useConfirmModal({
      onConfirm: onConfirmDelete,
      content: 'Are you sure you want to delete this space?',
    });

  return (
    <React.Fragment>
      <div>
        <Button variant='warning' onClick={onDelete}>
          Delete space
        </Button>

        <Hint>
          This action will delete the current space <strong>permanently</strong>
          .
        </Hint>
      </div>

      {confirmDeleteModal}
    </React.Fragment>
  );
};
