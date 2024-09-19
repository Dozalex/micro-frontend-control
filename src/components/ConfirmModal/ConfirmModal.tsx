import * as React from 'react';

import { Button } from '../Button';
import { Modal } from '../Modal';

export type ConfirmModalProps = {
  content?: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmModal = ({
  content,
  onConfirm,
  onClose,
}: ConfirmModalProps) => (
  <Modal onClose={onClose} title='Confirm action'>
    {content}

    <div className='flex items-center justify-end gap-2'>
      <Button
        variant='warning'
        onClick={() => {
          onConfirm();
          onClose();
        }}
      >
        Confirm
      </Button>

      <Button variant='secondary' onClick={onClose}>
        Cancel
      </Button>
    </div>
  </Modal>
);
