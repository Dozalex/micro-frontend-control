import * as React from 'react';

import { ConfirmModal, ConfirmModalProps } from './ConfirmModal';

type Props = {
  onConfirm: ConfirmModalProps['onConfirm'];
  content: ConfirmModalProps['content'];
};

export const useConfirmModal = ({ onConfirm, content }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onOpen = React.useCallback(() => setIsOpen(true), []);

  return {
    onOpen,
    confirmModal: isOpen ? (
      <ConfirmModal
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
        content={content}
      />
    ) : null,
  };
};
