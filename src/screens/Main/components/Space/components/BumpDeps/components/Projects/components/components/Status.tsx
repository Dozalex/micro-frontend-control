import * as React from 'react';

import { Dropdown } from 'components/Dropdown';

type Props = {
  statuses?: string[];
  error?: string;
};

export const Status = ({ statuses, error }: Props) => (
  <Dropdown
    minWidth={250}
    maxWidth={500}
    placement='top-end'
    renderContent={() => (
      <div className='grid gap-1 text-sm text-white px-2 py-1'>
        {(statuses || []).map(status => (
          <p key={status}>- {status}</p>
        ))}
        <p className='text-red-500'>{error}</p>
      </div>
    )}
  >
    <p className='text-sm text-gray-400 cursor-pointer'>
      {statuses ? statuses[statuses.length - 1] : undefined}
    </p>
  </Dropdown>
);
